import { userRepository } from '../repositories/user.repository';
import { ApiError } from '../utils/ApiError';
import { HttpStatus } from '../constants';
import { UpdateProfileDto, UserListQueryDto } from '../dtos/user.dto';
import { IUser } from '../models';
import { logger } from '../config/logger';

/**
 * User service — handles profile and user management operations.
 */
export class UserService {
  /**
   * Get user by ID with populated role.
   */
  async getUserById(userId: string): Promise<IUser> {
    const user = await userRepository.findByIdWithRole(userId);
    if (!user) {
      throw new ApiError(HttpStatus.NOT_FOUND, 'User not found');
    }
    return user;
  }

  /**
   * Update user profile.
   */
  async updateProfile(userId: string, dto: UpdateProfileDto): Promise<IUser> {
    const user = await userRepository.updateById(userId, dto);
    if (!user) {
      throw new ApiError(HttpStatus.NOT_FOUND, 'User not found');
    }

    const updatedUser = await userRepository.findByIdWithRole(userId);
    logger.info(`Profile updated for user: ${userId}`);
    return updatedUser!;
  }

  /**
   * List users with search, filters, and pagination (admin only).
   */
  async listUsers(query: UserListQueryDto): Promise<{
    users: IUser[];
    total: number;
    page: number;
    limit: number;
  }> {
    const page = query.page || 1;
    const limit = query.limit || 20;
    const sort = query.sort || 'createdAt';
    const order = query.order || 'desc';

    const filters: Record<string, any> = {};
    if (query.role) filters.role = query.role;
    if (query.isActive !== undefined) filters.isActive = query.isActive;

    const { users, total } = await userRepository.searchUsers(
      query.search || '',
      filters,
      page,
      limit,
      sort,
      order
    );

    return { users, total, page, limit };
  }

  /**
   * Deactivate a user (admin only).
   */
  async deactivateUser(userId: string): Promise<IUser> {
    const user = await userRepository.updateById(userId, { isActive: false });
    if (!user) {
      throw new ApiError(HttpStatus.NOT_FOUND, 'User not found');
    }

    logger.info(`User deactivated: ${userId}`);
    return user;
  }

  /**
   * Activate a user (admin only).
   */
  async activateUser(userId: string): Promise<IUser> {
    const user = await userRepository.updateById(userId, { isActive: true });
    if (!user) {
      throw new ApiError(HttpStatus.NOT_FOUND, 'User not found');
    }

    logger.info(`User activated: ${userId}`);
    return user;
  }
}

export const userService = new UserService();
