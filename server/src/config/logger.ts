import winston from 'winston';
import { config } from './index';

const { combine, timestamp, printf, colorize, errors, json } = winston.format;

/**
 * Custom log format for development — colorized, readable.
 */
const devFormat = combine(
  colorize({ all: true }),
  timestamp({ format: 'HH:mm:ss' }),
  errors({ stack: true }),
  printf(({ timestamp, level, message, stack, ...meta }) => {
    const metaStr = Object.keys(meta).length ? `\n${JSON.stringify(meta, null, 2)}` : '';
    return `${timestamp} [${level}]: ${stack || message}${metaStr}`;
  })
);

/**
 * Structured JSON format for production — machine-parseable.
 */
const prodFormat = combine(
  timestamp(),
  errors({ stack: true }),
  json()
);

/**
 * Winston logger instance.
 * - Development: colorized console output
 * - Production: JSON format with file transport
 */
export const logger = winston.createLogger({
  level: config.logLevel,
  format: config.nodeEnv === 'production' ? prodFormat : devFormat,
  defaultMeta: { service: 'curricraft-api' },
  transports: [
    new winston.transports.Console(),
    ...(config.nodeEnv === 'production'
      ? [
          new winston.transports.File({
            filename: 'logs/error.log',
            level: 'error',
            maxsize: 5242880, // 5MB
            maxFiles: 5,
          }),
          new winston.transports.File({
            filename: 'logs/combined.log',
            maxsize: 5242880,
            maxFiles: 5,
          }),
        ]
      : []),
  ],
  exitOnError: false,
});
