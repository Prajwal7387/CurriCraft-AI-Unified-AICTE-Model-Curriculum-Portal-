import { redis } from '../config/redis';
import { config } from '../config';
import { generateOtp } from '../utils/generateOtp';
import { logger } from '../config/logger';

/**
 * OTP service — generates and validates OTPs using Redis for storage.
 * Redis gives us automatic expiry and fast lookups.
 */
export class OtpService {
  private readonly prefix = 'otp:';
  private readonly rateLimitPrefix = 'otp_limit:';
  private readonly maxAttempts = 5;

  /**
   * Generate and store an OTP for a given email.
   * Rate-limited to prevent abuse.
   */
  async generateAndStore(email: string): Promise<string> {
    const rateLimitKey = `${this.rateLimitPrefix}${email}`;
    const attempts = await redis.get(rateLimitKey);

    if (attempts && parseInt(attempts) >= this.maxAttempts) {
      throw new Error('Too many OTP requests. Please try again later.');
    }

    const otp = generateOtp(6);
    const key = `${this.prefix}${email}`;
    const expirySeconds = config.otpExpiryMinutes * 60;

    // Store OTP with TTL
    await redis.set(key, otp, 'EX', expirySeconds);

    // Increment rate limit counter (expires in 1 hour)
    await redis.incr(rateLimitKey);
    await redis.expire(rateLimitKey, 3600);

    logger.debug(`OTP generated for ${email}: ${otp}`);
    return otp;
  }

  /**
   * Verify an OTP for a given email.
   * Deletes the OTP after successful verification (one-time use).
   */
  async verify(email: string, otp: string): Promise<boolean> {
    const key = `${this.prefix}${email}`;
    const storedOtp = await redis.get(key);

    if (!storedOtp) {
      return false; // OTP expired or never generated
    }

    if (storedOtp !== otp) {
      return false; // Invalid OTP
    }

    // Delete OTP after successful verification
    await redis.del(key);

    // Clear rate limit on success
    await redis.del(`${this.rateLimitPrefix}${email}`);

    return true;
  }

  /**
   * Invalidate an OTP (e.g., when resending).
   */
  async invalidate(email: string): Promise<void> {
    await redis.del(`${this.prefix}${email}`);
  }
}

export const otpService = new OtpService();
