import jwt from 'jsonwebtoken';
import { config } from '../config';
import { JwtPayload, JwtRefreshPayload } from '../types';
import { RoleName } from '../constants/roles';
import { Permission } from '../constants/permissions';

/**
 * Token service — handles JWT signing and verification.
 * Separates token concerns from auth business logic.
 */
export class TokenService {
  /**
   * Generate an access token (short-lived).
   */
  generateAccessToken(payload: JwtPayload): string {
    return jwt.sign(payload, config.jwt.accessSecret, {
      expiresIn: config.jwt.accessExpiry,
      issuer: 'curricraft-api',
      audience: 'curricraft-client',
    } as jwt.SignOptions);
  }

  /**
   * Generate a refresh token (long-lived).
   */
  generateRefreshToken(payload: JwtRefreshPayload): string {
    return jwt.sign(payload, config.jwt.refreshSecret, {
      expiresIn: config.jwt.refreshExpiry,
      issuer: 'curricraft-api',
      audience: 'curricraft-client',
    } as jwt.SignOptions);
  }

  /**
   * Generate both tokens at once.
   */
  generateTokenPair(
    userId: string,
    email: string,
    role: RoleName,
    permissions: Permission[],
    sessionId: string
  ): { accessToken: string; refreshToken: string } {
    const accessToken = this.generateAccessToken({
      userId,
      email,
      role,
      permissions,
      sessionId,
    });

    const refreshToken = this.generateRefreshToken({
      userId,
      sessionId,
      tokenVersion: Date.now(),
    });

    return { accessToken, refreshToken };
  }

  /**
   * Verify and decode an access token.
   */
  verifyAccessToken(token: string): JwtPayload {
    return jwt.verify(token, config.jwt.accessSecret, {
      issuer: 'curricraft-api',
      audience: 'curricraft-client',
    }) as JwtPayload;
  }

  /**
   * Verify and decode a refresh token.
   */
  verifyRefreshToken(token: string): JwtRefreshPayload {
    return jwt.verify(token, config.jwt.refreshSecret, {
      issuer: 'curricraft-api',
      audience: 'curricraft-client',
    }) as JwtRefreshPayload;
  }

  /**
   * Decode a token without verification (for debugging/logging).
   */
  decodeToken(token: string): jwt.JwtPayload | null {
    return jwt.decode(token) as jwt.JwtPayload | null;
  }

  /**
   * Parse the refresh expiry string to milliseconds.
   */
  getRefreshExpiryMs(): number {
    const expiry = config.jwt.refreshExpiry;
    const match = expiry.match(/^(\d+)([smhd])$/);
    if (!match) return 7 * 24 * 60 * 60 * 1000; // Default 7 days

    const value = parseInt(match[1]);
    const unit = match[2];

    const multipliers: Record<string, number> = {
      s: 1000,
      m: 60 * 1000,
      h: 60 * 60 * 1000,
      d: 24 * 60 * 60 * 1000,
    };

    return value * (multipliers[unit] || multipliers.d);
  }
}

export const tokenService = new TokenService();
