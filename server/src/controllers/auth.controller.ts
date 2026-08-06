import { Request, Response } from 'express';
import { authService } from '../services/auth.service';
import { asyncHandler } from '../utils/asyncHandler';
import { ApiResponse } from '../utils/ApiResponse';
import { HttpStatus } from '../constants';

/**
 * Auth controller — handles HTTP request/response for auth endpoints.
 * Delegates business logic to AuthService.
 */
export class AuthController {
  /**
   * POST /api/v1/auth/register
   */
  register = asyncHandler(async (req: Request, res: Response) => {
    const user = await authService.register(
      req.body,
      req.ip || '',
      req.get('user-agent') || ''
    );

    res.status(HttpStatus.CREATED).json(
      new ApiResponse(
        HttpStatus.CREATED,
        'Registration successful. Please check your email for verification OTP.',
        { user: user.toSafeObject ? user.toSafeObject() : user }
      )
    );
  });

  /**
   * POST /api/v1/auth/verify-email
   */
  verifyEmail = asyncHandler(async (req: Request, res: Response) => {
    await authService.verifyEmail(req.body);

    res.status(HttpStatus.OK).json(
      new ApiResponse(HttpStatus.OK, 'Email verified successfully')
    );
  });

  /**
   * POST /api/v1/auth/resend-otp
   */
  resendOtp = asyncHandler(async (req: Request, res: Response) => {
    await authService.resendVerificationOtp(req.body.email);

    res.status(HttpStatus.OK).json(
      new ApiResponse(HttpStatus.OK, 'Verification OTP sent to your email')
    );
  });

  /**
   * POST /api/v1/auth/login
   */
  login = asyncHandler(async (req: Request, res: Response) => {
    const result = await authService.login(
      req.body,
      req.ip || '',
      req.get('user-agent') || ''
    );

    // Set refresh token in httpOnly cookie
    res.cookie('refreshToken', result.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      path: '/api/v1/auth',
    });

    res.status(HttpStatus.OK).json(
      new ApiResponse(HttpStatus.OK, 'Login successful', {
        accessToken: result.accessToken,
        refreshToken: result.refreshToken,
        expiresIn: result.expiresIn,
        user: result.user.toSafeObject ? result.user.toSafeObject() : result.user,
      })
    );
  });

  /**
   * POST /api/v1/auth/refresh-token
   */
  refreshToken = asyncHandler(async (req: Request, res: Response) => {
    // Try cookie first, then body
    const refreshToken =
      req.cookies?.refreshToken || req.body.refreshToken;

    if (!refreshToken) {
      res.status(HttpStatus.BAD_REQUEST).json(
        new ApiResponse(HttpStatus.BAD_REQUEST, 'Refresh token is required')
      );
      return;
    }

    const tokens = await authService.refreshToken(
      refreshToken,
      req.ip || '',
      req.get('user-agent') || ''
    );

    // Update cookie
    res.cookie('refreshToken', tokens.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: '/api/v1/auth',
    });

    res.status(HttpStatus.OK).json(
      new ApiResponse(HttpStatus.OK, 'Token refreshed successfully', tokens)
    );
  });

  /**
   * POST /api/v1/auth/forgot-password
   */
  forgotPassword = asyncHandler(async (req: Request, res: Response) => {
    await authService.forgotPassword(req.body);

    // Always return success to avoid email enumeration
    res.status(HttpStatus.OK).json(
      new ApiResponse(
        HttpStatus.OK,
        'If an account with that email exists, a password reset OTP has been sent'
      )
    );
  });

  /**
   * POST /api/v1/auth/reset-password
   */
  resetPassword = asyncHandler(async (req: Request, res: Response) => {
    await authService.resetPassword(
      req.body,
      req.ip || '',
      req.get('user-agent') || ''
    );

    // Clear refresh token cookie
    res.clearCookie('refreshToken', { path: '/api/v1/auth' });

    res.status(HttpStatus.OK).json(
      new ApiResponse(
        HttpStatus.OK,
        'Password reset successful. Please login with your new password.'
      )
    );
  });

  /**
   * POST /api/v1/auth/logout
   */
  logout = asyncHandler(async (req: Request, res: Response) => {
    if (req.user && req.sessionId) {
      await authService.logout(
        req.sessionId,
        req.user._id.toString(),
        req.ip || '',
        req.get('user-agent') || ''
      );
    }

    res.clearCookie('refreshToken', { path: '/api/v1/auth' });

    res.status(HttpStatus.OK).json(
      new ApiResponse(HttpStatus.OK, 'Logged out successfully')
    );
  });
}

export const authController = new AuthController();
