import { Request, Response } from 'express';
import { userService } from '../services/user.service';
import { asyncHandler } from '../utils/asyncHandler';
import { ApiResponse } from '../utils/ApiResponse';
import { HttpStatus } from '../constants';

/**
 * User controller — handles profile and user management HTTP endpoints.
 */
export class UserController {
  /**
   * GET /api/v1/users/me
   */
  getProfile = asyncHandler(async (req: Request, res: Response) => {
    const user = await userService.getUserById(req.user!._id.toString());

    res.status(HttpStatus.OK).json(
      new ApiResponse(HttpStatus.OK, 'Profile retrieved successfully', {
        user: user.toSafeObject ? user.toSafeObject() : user,
      })
    );
  });

  /**
   * PATCH /api/v1/users/me
   */
  updateProfile = asyncHandler(async (req: Request, res: Response) => {
    const user = await userService.updateProfile(
      req.user!._id.toString(),
      req.body
    );

    res.status(HttpStatus.OK).json(
      new ApiResponse(HttpStatus.OK, 'Profile updated successfully', {
        user: user.toSafeObject ? user.toSafeObject() : user,
      })
    );
  });

  /**
   * GET /api/v1/users
   */
  listUsers = asyncHandler(async (req: Request, res: Response) => {
    const result = await userService.listUsers(req.query as any);

    res.status(HttpStatus.OK).json(
      ApiResponse.paginated(
        HttpStatus.OK,
        'Users retrieved successfully',
        result.users.map((u) => (u.toSafeObject ? u.toSafeObject() : u)),
        result.page,
        result.limit,
        result.total
      )
    );
  });

  /**
   * PATCH /api/v1/users/:id/deactivate
   */
  deactivateUser = asyncHandler(async (req: Request, res: Response) => {
    const user = await userService.deactivateUser(req.params.id);

    res.status(HttpStatus.OK).json(
      new ApiResponse(HttpStatus.OK, 'User deactivated successfully', {
        user: user.toSafeObject ? user.toSafeObject() : user,
      })
    );
  });

  /**
   * PATCH /api/v1/users/:id/activate
   */
  activateUser = asyncHandler(async (req: Request, res: Response) => {
    const user = await userService.activateUser(req.params.id);

    res.status(HttpStatus.OK).json(
      new ApiResponse(HttpStatus.OK, 'User activated successfully', {
        user: user.toSafeObject ? user.toSafeObject() : user,
      })
    );
  });
}

export const userController = new UserController();
