import http from 'http';
import createApp from './app';
import { config } from './config';
import { connectDatabase, disconnectDatabase } from './config/database';
import { disconnectRedis } from './config/redis';
import { initializeWebSocket } from './websocket';
import { logger } from './config/logger';
import { seedRolesOnStartup } from './seeds/startupSeed';

/**
 * Server entry point.
 * 1. Connect to MongoDB
 * 2. Seed default roles if needed
 * 3. Create Express app
 * 4. Create HTTP server
 * 5. Initialize WebSocket
 * 6. Start listening
 */
const startServer = async (): Promise<void> => {
  try {
    // Connect to MongoDB
    await connectDatabase();

    // Seed default roles on first startup
    await seedRolesOnStartup();

    // Create Express app and HTTP server
    const app = createApp();
    const httpServer = http.createServer(app);

    // Initialize WebSocket server
    const io = initializeWebSocket(httpServer);

    // Make io accessible to routes (for emitting events)
    app.set('io', io);

    // Start listening
    httpServer.listen(config.port, () => {
      logger.info(`
╔══════════════════════════════════════════════════════╗
║                                                      ║
║    🚀 CurriCraft AI Server                           ║
║                                                      ║
║    Environment: ${config.nodeEnv.padEnd(37)}║
║    Port:        ${String(config.port).padEnd(37)}║
║    API:         /api/${config.apiVersion.padEnd(33)}║
║    WebSocket:   Connected                            ║
║                                                      ║
╚══════════════════════════════════════════════════════╝
      `);
    });

    // Graceful shutdown handlers
    const shutdown = async (signal: string) => {
      logger.info(`\n${signal} received. Starting graceful shutdown...`);

      httpServer.close(async () => {
        logger.info('HTTP server closed');
        await disconnectDatabase();
        await disconnectRedis();
        logger.info('All connections closed. Exiting...');
        process.exit(0);
      });

      // Force exit after 10 seconds
      setTimeout(() => {
        logger.error('Forced shutdown after timeout');
        process.exit(1);
      }, 10000);
    };

    process.on('SIGTERM', () => shutdown('SIGTERM'));
    process.on('SIGINT', () => shutdown('SIGINT'));

    // Unhandled rejection handler
    process.on('unhandledRejection', (reason: any) => {
      logger.error('Unhandled Rejection:', reason);
    });

    // Uncaught exception handler
    process.on('uncaughtException', (error: Error) => {
      logger.error('Uncaught Exception:', error);
      process.exit(1);
    });
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
