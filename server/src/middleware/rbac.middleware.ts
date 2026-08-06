import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../utils/ApiError';
import { HttpStatus } from '../constants';
import { Permission } from '../constants/permissions';
import { RoleName, RoleHierarchy } from '../constants/roles';
import { IRole } from '../models';

/**
 * Role-Based Access Control middleware.
 * Checks if the authenticated user has the required permissions or role.
 */

/**
 * Require specific permissions. User must have ALL listed permissions.
 */
export const requirePermissions = (...permissions: Permission[]) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(new ApiError(HttpStatus.UNAUTHORIZED, 'Authentication required'));
    }

    const role = req.user.role as IRole;
    const userPermissions = role.permissions as string[];

    const hasAllPermissions = permissions.every((p) =>
      userPermissions.includes(p)
    );

    if (!hasAllPermissions) {
      return next(
        new ApiError(
          HttpStatus.FORBIDDEN,
          'You do not have permission to perform this action'
        )
      );
    }

    next();
  };
};

/**
 * Require any of the listed permissions (OR logic).
 */
export const requireAnyPermission = (...permissions: Permission[]) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(new ApiError(HttpStatus.UNAUTHORIZED, 'Authentication required'));
    }

    const role = req.user.role as IRole;
    const userPermissions = role.permissions as string[];

    const hasAnyPermission = permissions.some((p) =>
      userPermissions.includes(p)
    );

    if (!hasAnyPermission) {
      return next(
        new ApiError(
          HttpStatus.FORBIDDEN,
          'You do not have permission to perform this action'
        )
      );
    }

    next();
  };
};

/**
 * Require specific roles. User must have one of the listed roles.
 */
export const requireRoles = (...roles: RoleName[]) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(new ApiError(HttpStatus.UNAUTHORIZED, 'Authentication required'));
    }

    const role = req.user.role as IRole;
    const userRoleName = role.name as RoleName;

    if (!roles.includes(userRoleName)) {
      return next(
        new ApiError(
          HttpStatus.FORBIDDEN,
          'Your role does not have access to this resource'
        )
      );
    }

    next();
  };
};

/**
 * Require minimum role level based on hierarchy.
 */
export const requireMinRole = (minRole: RoleName) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(new ApiError(HttpStatus.UNAUTHORIZED, 'Authentication required'));
    }

    const role = req.user.role as IRole;
    const userRoleName = role.name as RoleName;
    const userLevel = RoleHierarchy[userRoleName] || 0;
    const requiredLevel = RoleHierarchy[minRole] || 0;

    if (userLevel < requiredLevel) {
      return next(
        new ApiError(
          HttpStatus.FORBIDDEN,
          'Insufficient role level for this operation'
        )
      );
    }

    next();
  };
};
