import { userRepository } from '../repositories/user.repository';
import { roleRepository } from '../repositories/role.repository';
import { sessionRepository } from '../repositories/session.repository';
import { tokenService } from './token.service';
import { emailService } from './email.service';
import { otpService } from './otp.service';
import { auditService } from './audit.service';
import { ApiError } from '../utils/ApiError';
import { HttpStatus, RoleName } from '../constants';
import { RolePermissions, Permission } from '../constants/permissions';
import {
  RegisterDto,
  LoginDto,
  VerifyEmailDto,
  ForgotPasswordDto,
  ResetPasswordDto,
  AuthTokensDto,
  GoogleAuthDto,
} from '../dtos/auth.dto';
import { IUser } from '../models';
import { logger } from '../config/logger';

/**
 * Auth service — orchestrates registration, login, verification,
 * password reset, token refresh, Google OAuth, and logout.
 */
export class AuthService {
  /**
   * Register a new user.
   * 1. Check if email already exists
   * 2. Get default role (PUBLIC_VIEWER)
   * 3. Create user
   * 4. Generate OTP
   * 5. Send verification email
   */
  async register(dto: RegisterDto, ipAddress: string, userAgent: string): Promise<IUser> {
    // Check existing user
    const existingUser = await userRepository.findByEmailWithRole(dto.email);
    if (existingUser) {
      throw new ApiError(HttpStatus.CONFLICT, 'An account with this email already exists');
    }

    // Get requested or default role
    let assignedRole;
    if (dto.role) {
      assignedRole = await roleRepository.findByName(dto.role as RoleName);
      if (!assignedRole) {
        throw new ApiError(HttpStatus.BAD_REQUEST, `Invalid role: ${dto.role}`);
      }
    } else {
      assignedRole = await roleRepository.findByName(RoleName.PUBLIC_VIEWER);
      if (!assignedRole) {
        assignedRole = await roleRepository.getDefaultRole();
      }
    }
    
    if (!assignedRole) {
      throw new ApiError(
        HttpStatus.INTERNAL_SERVER_ERROR,
        'Default role not found. Please run the seed script.'
      );
    }

    // Create user
    const user = await userRepository.create({
      name: dto.name,
      email: dto.email,
      password: dto.password,
      department: dto.department,
      designation: dto.designation,
      institution: dto.institution,
      phone: dto.phone,
      role: assignedRole._id,
      isEmailVerified: true, // OTP bypassed
      isActive: true,
    } as any);

    // Send welcome email immediately (bypassing OTP)
    try {
      await emailService.sendWelcomeEmail(dto.email, dto.name);
    } catch (err) {
      logger.warn(`Failed to send welcome email to ${dto.email}: ${err}`);
    }

    // Audit log
    await auditService.log({
      userId: user._id.toString(),
      action: 'REGISTER',
      resource: 'User',
      resourceId: user._id.toString(),
      ipAddress,
      userAgent,
    });

    logger.info(`New user registered: ${dto.email}`);

    // Return user with populated role
    const populatedUser = await userRepository.findByIdWithRole(user._id.toString());
    return populatedUser!;
  }

  /**
   * Verify email with OTP.
   */
  async verifyEmail(dto: VerifyEmailDto): Promise<void> {
    const isValid = await otpService.verify(dto.email, dto.otp);
    if (!isValid) {
      throw new ApiError(HttpStatus.BAD_REQUEST, 'Invalid or expired OTP');
    }

    const user = await userRepository.findByEmailWithRole(dto.email);
    if (!user) {
      throw new ApiError(HttpStatus.NOT_FOUND, 'User not found');
    }

    if (user.isEmailVerified) {
      throw new ApiError(HttpStatus.BAD_REQUEST, 'Email is already verified');
    }

    await userRepository.updateById(user._id.toString(), {
      isEmailVerified: true,
    });

    // Send welcome email
    await emailService.sendWelcomeEmail(dto.email, user.name);

    logger.info(`Email verified for: ${dto.email}`);
  }

  /**
   * Resend verification OTP.
   */
  async resendVerificationOtp(email: string): Promise<void> {
    const user = await userRepository.findByEmailWithRole(email);
    if (!user) {
      throw new ApiError(HttpStatus.NOT_FOUND, 'User not found');
    }

    if (user.isEmailVerified) {
      throw new ApiError(HttpStatus.BAD_REQUEST, 'Email is already verified');
    }

    const otp = await otpService.generateAndStore(email);
    await emailService.sendVerificationOtp(email, user.name, otp);

    logger.info(`Verification OTP resent to: ${email}`);
  }

  /**
   * Login with email and password.
   * Returns JWT access + refresh tokens.
   */
  async login(
    dto: LoginDto,
    ipAddress: string,
    userAgent: string
  ): Promise<AuthTokensDto & { user: IUser }> {
    // Find user with password field
    const user = await userRepository.findByEmailWithPassword(dto.email);
    if (!user) {
      throw new ApiError(HttpStatus.UNAUTHORIZED, 'Invalid email or password');
    }

    // Check if active
    if (!user.isActive) {
      throw new ApiError(HttpStatus.FORBIDDEN, 'Your account has been deactivated');
    }

    // Check if email is verified
    if (!user.isEmailVerified) {
      throw new ApiError(
        HttpStatus.FORBIDDEN,
        'Please verify your email before logging in'
      );
    }

    // Verify password
    const isPasswordValid = await user.comparePassword(dto.password);
    if (!isPasswordValid) {
      throw new ApiError(HttpStatus.UNAUTHORIZED, 'Invalid email or password');
    }

    // Get role with permissions
    const role = user.role as any;
    const roleName = role.name as RoleName;
    const permissions = RolePermissions[roleName] || [];

    // Create session first to get the real Mongoose-generated _id
    const refreshExpiry = new Date(Date.now() + tokenService.getRefreshExpiryMs());
    const session = await sessionRepository.createSession({
      userId: user._id.toString(),
      refreshToken: 'pending',
      ipAddress,
      userAgent,
      expiresAt: refreshExpiry,
    } as any);

    const sessionId = session._id.toString();

    // Generate token pair using the actual session ID from DB
    const tokens = tokenService.generateTokenPair(
      user._id.toString(),
      user.email,
      roleName,
      permissions,
      sessionId
    );

    // Update session with the actual refresh token
    await sessionRepository.updateRefreshToken(sessionId, tokens.refreshToken);

    // Update last login
    await userRepository.updateById(user._id.toString(), {
      lastLogin: new Date(),
    });

    // Audit log
    await auditService.log({
      userId: user._id.toString(),
      action: 'LOGIN',
      resource: 'Session',
      resourceId: sessionId,
      ipAddress,
      userAgent,
    });

    logger.info(`User logged in: ${dto.email}`);

    // Return safe user object
    const safeUser = await userRepository.findByIdWithRole(user._id.toString());

    return {
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      expiresIn: '15m',
      user: safeUser!,
    };
  }

  /**
   * Refresh access token using a valid refresh token.
   * Implements token rotation: old refresh token is invalidated.
   */
  async refreshToken(
    refreshToken: string,
    ipAddress: string,
    userAgent: string
  ): Promise<AuthTokensDto> {
    // Verify the refresh token
    let payload;
    try {
      payload = tokenService.verifyRefreshToken(refreshToken);
    } catch {
      throw new ApiError(HttpStatus.UNAUTHORIZED, 'Invalid or expired refresh token');
    }

    // Find the session
    const session = await sessionRepository.findValidSession(refreshToken);
    if (!session) {
      // Possible token reuse attack — invalidate all user sessions
      logger.warn(`Possible token reuse attack for user: ${payload.userId}`);
      await sessionRepository.invalidateAllUserSessions(payload.userId);
      throw new ApiError(
        HttpStatus.UNAUTHORIZED,
        'Session expired. Please login again.'
      );
    }

    // Get user with role
    const user = await userRepository.findByIdWithRole(payload.userId);
    if (!user || !user.isActive) {
      await sessionRepository.invalidateSession(session._id.toString());
      throw new ApiError(HttpStatus.UNAUTHORIZED, 'User not found or inactive');
    }

    const role = user.role as any;
    const roleName = role.name as RoleName;
    const permissions = RolePermissions[roleName] || [];

    // Invalidate old session
    await sessionRepository.invalidateSession(session._id.toString());

    // Create new session first to get real Mongoose-generated _id
    const refreshExpiry = new Date(Date.now() + tokenService.getRefreshExpiryMs());
    const newSession = await sessionRepository.createSession({
      userId: user._id.toString(),
      refreshToken: 'pending',
      ipAddress,
      userAgent,
      expiresAt: refreshExpiry,
    } as any);

    const newSessionId = newSession._id.toString();

    // Generate new token pair using actual session ID
    const tokens = tokenService.generateTokenPair(
      user._id.toString(),
      user.email,
      roleName,
      permissions,
      newSessionId
    );

    // Update session with the actual refresh token
    await sessionRepository.updateRefreshToken(newSessionId, tokens.refreshToken);

    return {
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      expiresIn: '15m',
    };
  }

  /**
   * Forgot password — send OTP to email.
   */
  async forgotPassword(dto: ForgotPasswordDto): Promise<void> {
    const user = await userRepository.findByEmailWithRole(dto.email);
    if (!user) {
      // Don't reveal if email exists — always return success
      logger.warn(`Forgot password requested for non-existent email: ${dto.email}`);
      return;
    }

    const otp = await otpService.generateAndStore(dto.email);
    await emailService.sendPasswordResetOtp(dto.email, user.name, otp);

    logger.info(`Password reset OTP sent to: ${dto.email}`);
  }

  /**
   * Reset password with OTP.
   */
  async resetPassword(
    dto: ResetPasswordDto,
    ipAddress: string,
    userAgent: string
  ): Promise<void> {
    // Verify OTP
    const isValid = await otpService.verify(dto.email, dto.otp);
    if (!isValid) {
      throw new ApiError(HttpStatus.BAD_REQUEST, 'Invalid or expired OTP');
    }

    const user = await userRepository.findByEmailWithPassword(dto.email);
    if (!user) {
      throw new ApiError(HttpStatus.NOT_FOUND, 'User not found');
    }

    // Update password (pre-save hook will hash it)
    user.password = dto.newPassword;
    await user.save();

    // Invalidate all existing sessions (force re-login)
    await sessionRepository.invalidateAllUserSessions(user._id.toString());

    // Audit log
    await auditService.log({
      userId: user._id.toString(),
      action: 'RESET_PASSWORD',
      resource: 'User',
      resourceId: user._id.toString(),
      ipAddress,
      userAgent,
    });

    logger.info(`Password reset for: ${dto.email}`);
  }

  /**
   * Handle Google OAuth login/registration.
   */
  async googleAuth(
    dto: GoogleAuthDto,
    ipAddress: string,
    userAgent: string
  ): Promise<AuthTokensDto & { user: IUser }> {
    // Check if user exists with this Google ID
    let user = await userRepository.findByGoogleId(dto.googleId);

    if (!user) {
      // Check if email already registered (link accounts)
      user = await userRepository.findByEmailWithRole(dto.email);

      if (user) {
        // Link Google account to existing user
        await userRepository.updateById(user._id.toString(), {
          googleId: dto.googleId,
          isEmailVerified: true,
          avatar: dto.avatar || user.avatar,
        });
        user = await userRepository.findByIdWithRole(user._id.toString());
      } else {
        // Create new user
        let defaultRole = await roleRepository.findByName(RoleName.PUBLIC_VIEWER);
        if (!defaultRole) defaultRole = await roleRepository.getDefaultRole();

        user = await userRepository.create({
          name: dto.name,
          email: dto.email,
          googleId: dto.googleId,
          avatar: dto.avatar,
          role: defaultRole!._id,
          isEmailVerified: true,
          isActive: true,
        } as any);

        user = await userRepository.findByIdWithRole(user._id.toString());

        // Send welcome email
        await emailService.sendWelcomeEmail(dto.email, dto.name);
      }
    }

    if (!user) {
      throw new ApiError(HttpStatus.INTERNAL_SERVER_ERROR, 'Failed to create user');
    }

    if (!user.isActive) {
      throw new ApiError(HttpStatus.FORBIDDEN, 'Your account has been deactivated');
    }

    const role = user.role as any;
    const roleName = role.name as RoleName;
    const permissions = RolePermissions[roleName] || [];

    // Create session first to get real Mongoose-generated _id
    const refreshExpiry = new Date(Date.now() + tokenService.getRefreshExpiryMs());
    const session = await sessionRepository.createSession({
      userId: user._id.toString(),
      refreshToken: 'pending',
      ipAddress,
      userAgent,
      expiresAt: refreshExpiry,
    } as any);

    const sessionId = session._id.toString();

    const tokens = tokenService.generateTokenPair(
      user._id.toString(),
      user.email,
      roleName,
      permissions,
      sessionId
    );

    // Update session with the actual refresh token
    await sessionRepository.updateRefreshToken(sessionId, tokens.refreshToken);

    await userRepository.updateById(user._id.toString(), {
      lastLogin: new Date(),
    });

    await auditService.log({
      userId: user._id.toString(),
      action: 'GOOGLE_LOGIN',
      resource: 'Session',
      resourceId: session._id.toString(),
      ipAddress,
      userAgent,
    });

    return {
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      expiresIn: '15m',
      user: user,
    };
  }

  /**
   * Logout — invalidate session.
   */
  async logout(
    sessionId: string,
    userId: string,
    ipAddress: string,
    userAgent: string
  ): Promise<void> {
    await sessionRepository.invalidateSession(sessionId);

    await auditService.log({
      userId,
      action: 'LOGOUT',
      resource: 'Session',
      resourceId: sessionId,
      ipAddress,
      userAgent,
    });

    logger.info(`User logged out: ${userId}`);
  }
}

export const authService = new AuthService();
