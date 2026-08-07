import mongoose from 'mongoose';
import { Role } from '../models/Role.model';
import { RoleName } from '../constants/roles';
import { RolePermissions } from '../constants/permissions';
import { logger } from '../config/logger';

/**
 * Role descriptions for each role type.
 */
const roleDescriptions: Record<RoleName, string> = {
  [RoleName.AICTE_ADMIN]:
    'Full system administrator with unrestricted access to all features, user management, and system configuration.',
  [RoleName.BUREAU_HEAD]:
    'Head of an AICTE bureau with authority to approve, publish, and manage curriculum and experts.',
  [RoleName.CURRICULUM_EXPERT]:
    'Subject matter expert who creates, edits, and submits curriculum for review.',
  [RoleName.REVIEWER]:
    'Reviews submitted curriculum, provides comments, and approves or requests changes.',
  [RoleName.PUBLIC_VIEWER]:
    'Public user who can view published curriculum and download resources.',
};

/**
 * Seed roles on server startup if they don't exist yet.
 * Non-destructive: only creates missing roles, doesn't update existing ones.
 */
export async function seedRolesOnStartup(): Promise<void> {
  try {
    if (mongoose.connection.readyState !== 1) {
      logger.warn('⚠️ MongoDB not connected; skipping role startup seeding.');
      return;
    }
    const existingCount = await Role.countDocuments();

    if (existingCount >= Object.values(RoleName).length) {
      logger.info('✅ Roles already seeded');
      return;
    }

    for (const roleName of Object.values(RoleName)) {
      const exists = await Role.findOne({ name: roleName });
      if (exists) continue;

      await Role.create({
        name: roleName,
        description: roleDescriptions[roleName],
        permissions: RolePermissions[roleName] || [],
        isDefault: roleName === RoleName.PUBLIC_VIEWER,
      });

      logger.info(`✅ Role created: ${roleName}`);
    }

    logger.info('🎉 Roles seeded on startup');

    // Seed Demo Accounts for instant login testing
    const { seedDemoUsers } = await import('./demoUsers.seed');
    await seedDemoUsers();
  } catch (error) {
    logger.error('Failed to seed roles on startup:', error);
    // Don't throw — let server continue even if seeding fails
  }
}
