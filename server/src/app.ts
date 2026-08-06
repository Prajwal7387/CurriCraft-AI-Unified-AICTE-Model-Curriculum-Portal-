import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import hpp from 'hpp';
import { corsOptions } from './config/cors';
import { apiLimiter } from './middleware/rateLimiter.middleware';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.middleware';
import { auditLogMiddleware } from './middleware/auditLog.middleware';
import routes from './routes';
import { config } from './config';

/**
 * Express application factory.
 * Sets up all middleware and mounts routes.
 */
const createApp = (): express.Application => {
  const app = express();

  // ─── Security Middleware ──────────────────────────
  app.use(helmet({
    contentSecurityPolicy: config.nodeEnv === 'production',
    crossOriginEmbedderPolicy: false,
  }));
  app.use(cors(corsOptions));
  app.use(hpp()); // Prevent HTTP parameter pollution

  // ─── Body Parsing ────────────────────────────────
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));
  app.use(cookieParser());

  // ─── Compression ─────────────────────────────────
  app.use(compression());

  // ─── Logging ─────────────────────────────────────
  if (config.nodeEnv !== 'test') {
    app.use(morgan(config.nodeEnv === 'production' ? 'combined' : 'dev'));
  }

  // ─── Rate Limiting ───────────────────────────────
  app.use('/api/', apiLimiter);

  // ─── Audit Logging ───────────────────────────────
  app.use(auditLogMiddleware);

  // ─── API Routes ──────────────────────────────────
  app.use(`/api/${config.apiVersion}`, routes);

  // ─── Error Handling ──────────────────────────────
  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
};

export default createApp;
