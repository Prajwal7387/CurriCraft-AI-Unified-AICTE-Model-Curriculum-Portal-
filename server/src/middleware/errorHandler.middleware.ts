import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../utils/ApiError';
import { logger } from '../config/logger';
import { config } from '../config';

/**
 * Global error handler middleware.
 * Catches all errors and returns a standardized JSON response.
 * In development, includes stack traces for debugging.
 */
export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  _next: NextFunction
): void => {
  let error = err;

  // Log the error
  if (error instanceof ApiError) {
    if (error.statusCode >= 500) {
      logger.error(`[${req.method}] ${req.path} - ${error.message}`, {
        stack: error.stack,
        statusCode: error.statusCode,
      });
    } else {
      logger.warn(`[${req.method}] ${req.path} - ${error.message}`, {
        statusCode: error.statusCode,
      });
    }
  } else {
    logger.error(`[${req.method}] ${req.path} - Unhandled Error:`, {
      message: error.message,
      stack: error.stack,
    });
  }

  // Determine status code and message
  const statusCode =
    error instanceof ApiError ? error.statusCode : 500;

  const message =
    error instanceof ApiError
      ? error.message
      : 'An unexpected error occurred';

  const errors =
    error instanceof ApiError ? error.errors : [];

  // Build response
  const response: Record<string, any> = {
    success: false,
    statusCode,
    message,
    ...(errors.length > 0 && { errors }),
    ...(config.nodeEnv === 'development' && {
      stack: error.stack,
    }),
  };

  res.status(statusCode).json(response);
};

/**
 * 404 handler — catches unmatched routes.
 */
export const notFoundHandler = (
  req: Request,
  _res: Response,
  next: NextFunction
): void => {
  next(
    new ApiError(404, `Route not found: ${req.method} ${req.originalUrl}`)
  );
};
