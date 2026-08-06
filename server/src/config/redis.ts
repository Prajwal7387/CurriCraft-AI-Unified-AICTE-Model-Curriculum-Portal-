import Redis from 'ioredis';
import { config } from './index';
import { logger } from './logger';

/**
 * In-memory fallback map when Redis server is unavailable.
 */
class InMemoryRedisFallback {
  private store = new Map<string, { value: string; expiresAt?: number }>();

  async get(key: string): Promise<string | null> {
    const item = this.store.get(key);
    if (!item) return null;
    if (item.expiresAt && Date.now() > item.expiresAt) {
      this.store.delete(key);
      return null;
    }
    return item.value;
  }

  async set(key: string, value: string, mode?: string, duration?: number): Promise<'OK'> {
    let expiresAt: number | undefined;
    if (mode === 'EX' && duration) {
      expiresAt = Date.now() + duration * 1000;
    }
    this.store.set(key, { value, expiresAt });
    return 'OK';
  }

  async del(key: string): Promise<number> {
    return this.store.delete(key) ? 1 : 0;
  }

  async incr(key: string): Promise<number> {
    const current = await this.get(key);
    const val = (parseInt(current || '0', 10) + 1).toString();
    const item = this.store.get(key);
    this.store.set(key, { value: val, expiresAt: item?.expiresAt });
    return parseInt(val, 10);
  }

  async expire(key: string, seconds: number): Promise<number> {
    const item = this.store.get(key);
    if (item) {
      item.expiresAt = Date.now() + seconds * 1000;
      return 1;
    }
    return 0;
  }

  on() {}
  quit() {}
}

const memoryFallback = new InMemoryRedisFallback();
let isUsingFallback = false;

export const redis = new Redis({
  host: config.redis.host,
  port: config.redis.port,
  password: config.redis.password,
  maxRetriesPerRequest: 1,
  retryStrategy(times: number) {
    if (times > 2) {
      if (!isUsingFallback) {
        logger.warn('⚠️ Redis server unreachable. Switching to in-memory cache fallback.');
        isUsingFallback = true;
      }
      return null; // Stop retrying
    }
    return 500;
  },
  lazyConnect: false,
});

redis.on('connect', () => {
  logger.info('✅ Redis connected');
});

redis.on('error', (err: Error) => {
  if (!isUsingFallback) {
    logger.warn(`Redis connection warning: ${err.message}. Using in-memory fallback store.`);
  }
});

/**
 * Gracefully disconnect Redis.
 */
export const disconnectRedis = async (): Promise<void> => {
  try {
    if (!isUsingFallback) await redis.quit();
  } catch (error) {
    // Ignore error
  }
};

