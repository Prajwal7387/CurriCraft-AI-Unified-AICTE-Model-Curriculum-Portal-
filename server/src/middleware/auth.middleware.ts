import { Request, Response, NextFunction } from 'express';
import { tokenService } from '../services/token.service';
import { userRepository } from '../repositories/user.repository';
import { ApiError } from '../utils/ApiError';
import { HttpStatus } from '../constants';
import { IRole } from '../models';

/**
 * Authentication middleware.
 * Extracts JWT from Authorization header, verifies it,
 * and attaches the user (with populated role) to req.user.
 */
export const authenticate = async (
  req: Request,
  _res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // Extract token from header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new ApiError(HttpStatus.UNAUTHORIZED, 'Access token is required');
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      throw new ApiError(HttpStatus.UNAUTHORIZED, 'Access token is required');
    }

    // Verify token
    const payload = tokenService.verifyAccessToken(token);

    // Fetch user with role
    const user = await userRepository.findByIdWithRole(payload.userId);
    if (!user) {
      throw new ApiError(HttpStatus.UNAUTHORIZED, 'User not found');
    }

    if (!user.isActive) {
      throw new ApiError(HttpStatus.FORBIDDEN, 'Account has been deactivated');
    }

    // Attach user and session to request
    req.user = user as any;
    req.sessionId = payload.sessionId;

    next();
  } catch (error: any) {
    if (error instanceof ApiError) {
      next(error);
    } else if (error.name === 'JsonWebTokenError') {
      next(new ApiError(HttpStatus.UNAUTHORIZED, 'Invalid access token'));
    } else if (error.name === 'TokenExpiredError') {
      next(new ApiError(HttpStatus.UNAUTHORIZED, 'Access token expired'));
    } else {
      next(new ApiError(HttpStatus.UNAUTHORIZED, 'Authentication failed'));
    }
  }
};

/**
 * Optional authentication — doesn't throw if no token present.
 * Useful for routes that have different behavior for authenticated vs anonymous users.
 */
export const optionalAuth = async (
  req: Request,
  _res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return next();
    }

    const token = authHeader.split(' ')[1];
    if (!token) return next();

    const payload = tokenService.verifyAccessToken(token);
    const user = await userRepository.findByIdWithRole(payload.userId);

    if (user && user.isActive) {
      req.user = user as any;
      req.sessionId = payload.sessionId;
    }

    next();
  } catch {
    // Silently continue without auth
    next();
  }
};
