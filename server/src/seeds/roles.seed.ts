import mongoose from 'mongoose';
import { config } from '../config';
import { Role } from '../models/Role.model';
import { RoleName } from '../constants/roles';
import { RolePermissions, Permission } from '../constants/permissions';
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
 * Seed all roles with their permissions.
 * Upserts to avoid duplicates — safe to run multiple times.
 */
async function seedRoles(): Promise<void> {
  try {
    await mongoose.connect(config.mongodbUri);
    logger.info('Connected to MongoDB for seeding');

    for (const roleName of Object.values(RoleName)) {
      const permissions = RolePermissions[roleName] || [];
      const isDefault = roleName === RoleName.PUBLIC_VIEWER;

      await Role.findOneAndUpdate(
        { name: roleName },
        {
          name: roleName,
          description: roleDescriptions[roleName],
          permissions,
          isDefault,
        },
        { upsert: true, new: true }
      );

      logger.info(`✅ Role seeded: ${roleName} (${permissions.length} permissions)`);
    }

    logger.info('🎉 All roles seeded successfully');
    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    logger.error('❌ Role seeding failed:', error);
    await mongoose.disconnect();
    process.exit(1);
  }
}

// Run if called directly
seedRoles();

export { seedRoles };
