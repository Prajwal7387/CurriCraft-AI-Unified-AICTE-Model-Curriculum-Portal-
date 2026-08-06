import { Router } from 'express';
import { authController } from '../controllers/auth.controller';
import { validate } from '../middleware/validate.middleware';
import { authenticate } from '../middleware/auth.middleware';
import { authLimiter, otpLimiter } from '../middleware/rateLimiter.middleware';
import {
  registerSchema,
  loginSchema,
  verifyEmailSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  refreshTokenSchema,
} from '../validators/auth.validator';

const router = Router();

/**
 * @route   POST /api/v1/auth/register
 * @desc    Register a new user
 * @access  Public
 */
router.post(
  '/register',
  authLimiter,
  validate(registerSchema),
  authController.register
);

/**
 * @route   POST /api/v1/auth/verify-email
 * @desc    Verify email with OTP
 * @access  Public
 */
router.post(
  '/verify-email',
  otpLimiter,
  validate(verifyEmailSchema),
  authController.verifyEmail
);

/**
 * @route   POST /api/v1/auth/resend-otp
 * @desc    Resend verification OTP
 * @access  Public
 */
router.post(
  '/resend-otp',
  otpLimiter,
  validate(forgotPasswordSchema), // Same schema — just email
  authController.resendOtp
);

/**
 * @route   POST /api/v1/auth/login
 * @desc    Login with email and password
 * @access  Public
 */
router.post(
  '/login',
  authLimiter,
  validate(loginSchema),
  authController.login
);

/**
 * @route   POST /api/v1/auth/refresh-token
 * @desc    Refresh access token
 * @access  Public (requires valid refresh token)
 */
router.post(
  '/refresh-token',
  validate(refreshTokenSchema),
  authController.refreshToken
);

/**
 * @route   POST /api/v1/auth/forgot-password
 * @desc    Request password reset OTP
 * @access  Public
 */
router.post(
  '/forgot-password',
  otpLimiter,
  validate(forgotPasswordSchema),
  authController.forgotPassword
);

/**
 * @route   POST /api/v1/auth/reset-password
 * @desc    Reset password with OTP
 * @access  Public
 */
router.post(
  '/reset-password',
  otpLimiter,
  validate(resetPasswordSchema),
  authController.resetPassword
);

/**
 * @route   POST /api/v1/auth/logout
 * @desc    Logout and invalidate session
 * @access  Private
 */
router.post('/logout', authenticate, authController.logout);

export default router;
