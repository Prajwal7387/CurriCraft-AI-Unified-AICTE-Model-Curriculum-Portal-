import { User, IUser } from '../models';
import { BaseRepository } from './base.repository';

/**
 * User repository with auth-specific query methods.
 */
export class UserRepository extends BaseRepository<IUser> {
  constructor() {
    super(User);
  }

  /**
   * Find a user by email, including the password field for authentication.
   */
  async findByEmailWithPassword(email: string): Promise<IUser | null> {
    return this.model
      .findOne({ email })
      .select('+password +otp +otpExpiry +refreshTokens')
      .populate('role')
      .exec();
  }

  /**
   * Find a user by email with role populated.
   */
  async findByEmailWithRole(email: string): Promise<IUser | null> {
    return this.model
      .findOne({ email })
      .populate('role')
      .exec();
  }

  /**
   * Find a user by ID with role populated.
   */
  async findByIdWithRole(id: string): Promise<IUser | null> {
    return this.model
      .findById(id)
      .populate('role')
      .exec();
  }

  /**
   * Find a user by Google ID.
   */
  async findByGoogleId(googleId: string): Promise<IUser | null> {
    return this.model
      .findOne({ googleId })
      .populate('role')
      .exec();
  }

  /**
   * Find user with OTP fields for verification.
   */
  async findByEmailWithOtp(email: string): Promise<IUser | null> {
    return this.model
      .findOne({ email })
      .select('+otp +otpExpiry')
      .populate('role')
      .exec();
  }

  /**
   * Set OTP for a user.
   */
  async setOtp(
    userId: string,
    otp: string,
    otpExpiry: Date
  ): Promise<IUser | null> {
    return this.model
      .findByIdAndUpdate(
        userId,
        { otp, otpExpiry },
        { new: true }
      )
      .exec();
  }

  /**
   * Clear OTP fields after verification.
   */
  async clearOtp(userId: string): Promise<void> {
    await this.model
      .findByIdAndUpdate(userId, {
        $unset: { otp: 1, otpExpiry: 1 },
      })
      .exec();
  }

  /**
   * Add a refresh token to the user's token array.
   */
  async addRefreshToken(
    userId: string,
    token: string,
    expiresAt: Date
  ): Promise<void> {
    await this.model
      .findByIdAndUpdate(userId, {
        $push: {
          refreshTokens: { token, expiresAt, createdAt: new Date() },
        },
      })
      .exec();
  }

  /**
   * Remove a specific refresh token from the user's array.
   */
  async removeRefreshToken(userId: string, token: string): Promise<void> {
    await this.model
      .findByIdAndUpdate(userId, {
        $pull: { refreshTokens: { token } },
      })
      .exec();
  }

  /**
   * Remove all refresh tokens for a user (logout all devices).
   */
  async removeAllRefreshTokens(userId: string): Promise<void> {
    await this.model
      .findByIdAndUpdate(userId, {
        $set: { refreshTokens: [] },
      })
      .exec();
  }

  /**
   * Search users with pagination.
   */
  async searchUsers(
    search: string,
    filters: Record<string, any>,
    page: number,
    limit: number,
    sort: string,
    order: 'asc' | 'desc'
  ): Promise<{ users: IUser[]; total: number }> {
    const query: Record<string, any> = { ...filters };

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { institution: { $regex: search, $options: 'i' } },
      ];
    }

    const [users, total] = await Promise.all([
      this.model
        .find(query)
        .populate('role')
        .sort({ [sort]: order === 'asc' ? 1 : -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .exec(),
      this.model.countDocuments(query).exec(),
    ]);

    return { users, total };
  }
}

export const userRepository = new UserRepository();
