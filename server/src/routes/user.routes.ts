import { Router } from 'express';
import { userController } from '../controllers/user.controller';
import { authenticate } from '../middleware/auth.middleware';
import { requireRoles, requirePermissions } from '../middleware/rbac.middleware';
import { validate } from '../middleware/validate.middleware';
import { updateProfileSchema, userListQuerySchema } from '../validators/user.validator';
import { RoleName, Permission } from '../constants';

const router = Router();

// All user routes require authentication
router.use(authenticate);

/**
 * @route   GET /api/v1/users/me
 * @desc    Get current user profile
 * @access  Private
 */
router.get('/me', userController.getProfile);

/**
 * @route   PATCH /api/v1/users/me
 * @desc    Update current user profile
 * @access  Private
 */
router.patch(
  '/me',
  validate(updateProfileSchema),
  userController.updateProfile
);

/**
 * @route   GET /api/v1/users
 * @desc    List all users (admin only)
 * @access  Private (AICTE_ADMIN, BUREAU_HEAD)
 */
router.get(
  '/',
  requirePermissions(Permission.USERS_READ),
  validate(userListQuerySchema),
  userController.listUsers
);

/**
 * @route   PATCH /api/v1/users/:id/deactivate
 * @desc    Deactivate a user (admin only)
 * @access  Private (AICTE_ADMIN)
 */
router.patch(
  '/:id/deactivate',
  requireRoles(RoleName.AICTE_ADMIN),
  userController.deactivateUser
);

/**
 * @route   PATCH /api/v1/users/:id/activate
 * @desc    Activate a user (admin only)
 * @access  Private (AICTE_ADMIN)
 */
router.patch(
  '/:id/activate',
  requireRoles(RoleName.AICTE_ADMIN),
  userController.activateUser
);

export default router;
