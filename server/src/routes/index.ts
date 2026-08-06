import { Router, Request, Response } from 'express';
import authRoutes from './auth.routes';
import userRoutes from './user.routes';
import curriculumRoutes from './curriculum.routes';
import versionRoutes from './version.routes';
import aiRoutes from './ai.routes';
import { ApiResponse } from '../utils/ApiResponse';
import { HttpStatus } from '../constants';

const router = Router();

/**
 * Health check endpoint.
 */
router.get('/health', (_req: Request, res: Response) => {
  res.status(HttpStatus.OK).json(
    new ApiResponse(HttpStatus.OK, 'CurriCraft AI API is running', {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || 'development',
    })
  );
});

/**
 * Mount route modules.
 */
router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/curricula', curriculumRoutes);
router.use('/version-control', versionRoutes);
router.use('/ai', aiRoutes);

export default router;
