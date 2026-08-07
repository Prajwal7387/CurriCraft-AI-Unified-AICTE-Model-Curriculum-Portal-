import rateLimit from 'express-rate-limit';
import { config } from '../config';
import { ApiError } from '../utils/ApiError';
import { HttpStatus } from '../constants';

/**
 * General API rate limiter.
 */
export const apiLimiter = rateLimit({
  windowMs: config.rateLimit.windowMs,
  max: config.rateLimit.maxRequests,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (_req, _res, next) => {
    next(
      new ApiError(
        HttpStatus.TOO_MANY_REQUESTS,
        'Too many requests. Please try again later.'
      )
    );
  },
});

/**
 * Strict rate limiter for auth routes (login, register, etc).
 * 10 requests per 15 minutes per IP.
 */
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (_req, _res, next) => {
    next(
      new ApiError(
        HttpStatus.TOO_MANY_REQUESTS,
        'Too many authentication attempts. Please try again in 15 minutes.'
      )
    );
  },
});

/**
 * Very strict rate limiter for OTP routes.
 * 3 requests per 10 minutes per IP.
 */
export const otpLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 3,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (_req, _res, next) => {
    next(
      new ApiError(
        HttpStatus.TOO_MANY_REQUESTS,
        'Too many OTP requests. Please try again later.'
      )
    );
  },
});
