import { RoleName } from './roles';

/**
 * Granular permission strings used for RBAC.
 * Format: resource:action
 */
export enum Permission {
  // Curriculum
  CURRICULUM_CREATE = 'curriculum:create',
  CURRICULUM_READ = 'curriculum:read',
  CURRICULUM_UPDATE = 'curriculum:update',
  CURRICULUM_DELETE = 'curriculum:delete',
  CURRICULUM_APPROVE = 'curriculum:approve',
  CURRICULUM_PUBLISH = 'curriculum:publish',
  CURRICULUM_ARCHIVE = 'curriculum:archive',
  CURRICULUM_REVIEW = 'curriculum:review',

  // Users
  USERS_CREATE = 'users:create',
  USERS_READ = 'users:read',
  USERS_UPDATE = 'users:update',
  USERS_DELETE = 'users:delete',

  // Comments
  COMMENTS_CREATE = 'comments:create',
  COMMENTS_READ = 'comments:read',
  COMMENTS_DELETE = 'comments:delete',

  // Analytics
  ANALYTICS_READ = 'analytics:read',
  ANALYTICS_EXPORT = 'analytics:export',

  // Settings
  SETTINGS_MANAGE = 'settings:manage',

  // Roles
  ROLES_MANAGE = 'roles:manage',

  // Notifications
  NOTIFICATIONS_SEND = 'notifications:send',

  // Branches & Merges
  BRANCH_CREATE = 'branch:create',
  BRANCH_DELETE = 'branch:delete',
  MERGE_REQUEST_CREATE = 'merge_request:create',
  MERGE_REQUEST_APPROVE = 'merge_request:approve',

  // AI Features
  AI_GENERATE = 'ai:generate',
  AI_CONFIGURE = 'ai:configure',

  // Compliance
  COMPLIANCE_RUN = 'compliance:run',
  COMPLIANCE_VIEW = 'compliance:view',
}

/**
 * Permission matrix: maps each role to its allowed permissions.
 */
export const RolePermissions: Record<RoleName, Permission[]> = {
  [RoleName.AICTE_ADMIN]: Object.values(Permission), // Full access

  [RoleName.BUREAU_HEAD]: [
    Permission.CURRICULUM_CREATE,
    Permission.CURRICULUM_READ,
    Permission.CURRICULUM_UPDATE,
    Permission.CURRICULUM_DELETE,
    Permission.CURRICULUM_APPROVE,
    Permission.CURRICULUM_PUBLISH,
    Permission.CURRICULUM_ARCHIVE,
    Permission.CURRICULUM_REVIEW,
    Permission.USERS_CREATE,
    Permission.USERS_READ,
    Permission.USERS_UPDATE,
    Permission.COMMENTS_CREATE,
    Permission.COMMENTS_READ,
    Permission.COMMENTS_DELETE,
    Permission.ANALYTICS_READ,
    Permission.ANALYTICS_EXPORT,
    Permission.NOTIFICATIONS_SEND,
    Permission.BRANCH_CREATE,
    Permission.BRANCH_DELETE,
    Permission.MERGE_REQUEST_CREATE,
    Permission.MERGE_REQUEST_APPROVE,
    Permission.AI_GENERATE,
    Permission.COMPLIANCE_RUN,
    Permission.COMPLIANCE_VIEW,
  ],

  [RoleName.CURRICULUM_EXPERT]: [
    Permission.CURRICULUM_CREATE,
    Permission.CURRICULUM_READ,
    Permission.CURRICULUM_UPDATE,
    Permission.COMMENTS_CREATE,
    Permission.COMMENTS_READ,
    Permission.ANALYTICS_READ,
    Permission.BRANCH_CREATE,
    Permission.MERGE_REQUEST_CREATE,
    Permission.AI_GENERATE,
    Permission.COMPLIANCE_RUN,
    Permission.COMPLIANCE_VIEW,
  ],

  [RoleName.REVIEWER]: [
    Permission.CURRICULUM_READ,
    Permission.CURRICULUM_REVIEW,
    Permission.COMMENTS_CREATE,
    Permission.COMMENTS_READ,
    Permission.ANALYTICS_READ,
    Permission.MERGE_REQUEST_APPROVE,
    Permission.COMPLIANCE_VIEW,
  ],

  [RoleName.PUBLIC_VIEWER]: [
    Permission.CURRICULUM_READ,
    Permission.COMMENTS_READ,
    Permission.COMPLIANCE_VIEW,
  ],
};
