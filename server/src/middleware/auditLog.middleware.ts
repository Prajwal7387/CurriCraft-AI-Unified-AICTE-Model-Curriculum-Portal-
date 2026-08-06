import { Request, Response, NextFunction } from 'express';
import { auditService } from '../services/audit.service';

/**
 * Audit log middleware.
 * Automatically logs all mutating API requests (POST, PUT, PATCH, DELETE).
 * Attaches after authentication middleware so req.user is available.
 */
export const auditLogMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  // Only log mutating requests
  const mutatingMethods = ['POST', 'PUT', 'PATCH', 'DELETE'];
  if (!mutatingMethods.includes(req.method)) {
    return next();
  }

  // Log after response is sent
  res.on('finish', () => {
    if (req.user) {
      auditService.log({
        userId: req.user._id.toString(),
        action: `${req.method} ${req.route?.path || req.path}`,
        resource: req.baseUrl.split('/').pop() || 'unknown',
        ipAddress: req.ip || req.socket.remoteAddress || '',
        userAgent: req.get('user-agent') || '',
        statusCode: res.statusCode,
        method: req.method,
        path: req.originalUrl,
      });
    }
  });

  next();
};
