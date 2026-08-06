import mongoose from 'mongoose';
import { config } from './index';
import { logger } from './logger';

/**
 * Connect to MongoDB with in-memory fallback for local dev without Docker/MongoDB installed.
 */
export const connectDatabase = async (): Promise<void> => {
  try {
    mongoose.set('strictQuery', true);

    // Try connecting to primary URI with short timeout first
    const conn = await mongoose.connect(config.mongodbUri, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 2000,
      socketTimeoutMS: 45000,
    });

    logger.info(`✅ MongoDB connected: ${conn.connection.host}:${conn.connection.port}/${conn.connection.name}`);
  } catch (error) {
    logger.warn('⚠️ Local MongoDB not found. Attempting MongoMemoryServer...');
    try {
      const { MongoMemoryServer } = await import('mongodb-memory-server');
      const mongoServer = await MongoMemoryServer.create();
      const mongoUri = mongoServer.getUri();
      
      await mongoose.connect(mongoUri);
      logger.info(`✅ In-Memory MongoDB connected: ${mongoUri}`);
    } catch (memError) {
      logger.warn('⚠️ In-Memory MongoDB binary unavailable. Running in Mock DB mode for instant preview.');
    }
  }

  // Connection event listeners
  mongoose.connection.on('error', (err) => {
    logger.error('MongoDB connection error:', err);
  });

  mongoose.connection.on('disconnected', () => {
    logger.warn('MongoDB disconnected.');
  });
};

/**
 * Gracefully disconnect from MongoDB.
 */
export const disconnectDatabase = async (): Promise<void> => {
  try {
    await mongoose.connection.close();
    logger.info('MongoDB connection closed gracefully');
  } catch (error) {
    logger.error('Error closing MongoDB connection:', error);
  }
};

