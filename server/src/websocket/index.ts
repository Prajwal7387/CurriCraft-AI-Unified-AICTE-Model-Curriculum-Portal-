import { Server as HttpServer } from 'http';
import { Server as SocketIOServer, Socket } from 'socket.io';
import { config } from '../config';
import { logger } from '../config/logger';

/**
 * WebSocket server initialization.
 * Phase 1: Basic connection handling and presence.
 * Phase 2: Real-time collaboration, cursors, notifications.
 */
export const initializeWebSocket = (httpServer: HttpServer): SocketIOServer => {
  const io = new SocketIOServer(httpServer, {
    cors: {
      origin: config.clientUrl,
      methods: ['GET', 'POST'],
      credentials: true,
    },
    pingTimeout: 60000,
    pingInterval: 25000,
  });

  // Connection handler
  io.on('connection', (socket: Socket) => {
    logger.info(`🔌 WebSocket connected: ${socket.id}`);

    // Join user's personal room (for notifications)
    socket.on('join:user', (userId: string) => {
      socket.join(`user:${userId}`);
      logger.debug(`User ${userId} joined personal room`);
    });

    // Presence tracking
    socket.on('presence:online', (userId: string) => {
      socket.broadcast.emit('presence:update', {
        userId,
        status: 'online',
        timestamp: new Date(),
      });
    });

    // Disconnect handler
    socket.on('disconnect', (reason: string) => {
      logger.info(`🔌 WebSocket disconnected: ${socket.id} (${reason})`);
    });

    // Error handler
    socket.on('error', (error: Error) => {
      logger.error(`WebSocket error on ${socket.id}:`, error);
    });
  });

  logger.info('✅ WebSocket server initialized');
  return io;
};
