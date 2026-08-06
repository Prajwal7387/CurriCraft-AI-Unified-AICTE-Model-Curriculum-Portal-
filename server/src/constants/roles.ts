/**
 * Role names used throughout the application.
 * Maps to the `name` field in the Role model.
 */
export enum RoleName {
  AICTE_ADMIN = 'AICTE_ADMIN',
  BUREAU_HEAD = 'BUREAU_HEAD',
  CURRICULUM_EXPERT = 'CURRICULUM_EXPERT',
  REVIEWER = 'REVIEWER',
  PUBLIC_VIEWER = 'PUBLIC_VIEWER',
}

/**
 * Human-readable role labels for UI display.
 */
export const RoleLabels: Record<RoleName, string> = {
  [RoleName.AICTE_ADMIN]: 'AICTE Administrator',
  [RoleName.BUREAU_HEAD]: 'Bureau Head',
  [RoleName.CURRICULUM_EXPERT]: 'Curriculum Expert',
  [RoleName.REVIEWER]: 'Reviewer',
  [RoleName.PUBLIC_VIEWER]: 'Public Viewer',
};

/**
 * Role hierarchy for access level comparison.
 * Higher number = higher privilege.
 */
export const RoleHierarchy: Record<RoleName, number> = {
  [RoleName.AICTE_ADMIN]: 100,
  [RoleName.BUREAU_HEAD]: 80,
  [RoleName.CURRICULUM_EXPERT]: 60,
  [RoleName.REVIEWER]: 40,
  [RoleName.PUBLIC_VIEWER]: 10,
};
