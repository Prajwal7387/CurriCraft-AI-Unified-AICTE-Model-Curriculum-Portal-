import { Session, ISession } from '../models';
import { BaseRepository } from './base.repository';

/**
 * Session repository for managing user sessions and refresh tokens.
 */
export class SessionRepository extends BaseRepository<ISession> {
  constructor() {
    super(Session);
  }

  /**
   * Create a new session.
   */
  async createSession(data: {
    userId: string;
    refreshToken: string;
    ipAddress: string;
    userAgent: string;
    expiresAt: Date;
  }): Promise<ISession> {
    return this.create(data as any);
  }

  /**
   * Find a valid session by refresh token.
   */
  async findValidSession(refreshToken: string): Promise<ISession | null> {
    return this.model
      .findOne({
        refreshToken,
        isValid: true,
        expiresAt: { $gt: new Date() },
      })
      .exec();
  }

  /**
   * Invalidate a session (on logout or token rotation).
   */
  async invalidateSession(sessionId: string): Promise<void> {
    await this.model
      .findByIdAndUpdate(sessionId, { isValid: false })
      .exec();
  }

  /**
   * Invalidate all sessions for a user (logout all devices).
   */
  async invalidateAllUserSessions(userId: string): Promise<void> {
    await this.model
      .updateMany({ userId, isValid: true }, { isValid: false })
      .exec();
  }

  /**
   * Get active session count for a user.
   */
  async getActiveSessionCount(userId: string): Promise<number> {
    return this.model
      .countDocuments({
        userId,
        isValid: true,
        expiresAt: { $gt: new Date() },
      })
      .exec();
  }

  /**
   * Update the refresh token on a session.
   * Used when creating sessions with a placeholder token before JWT generation.
   */
  async updateRefreshToken(sessionId: string, refreshToken: string): Promise<void> {
    await this.model
      .findByIdAndUpdate(sessionId, { refreshToken })
      .exec();
  }
}

export const sessionRepository = new SessionRepository();
