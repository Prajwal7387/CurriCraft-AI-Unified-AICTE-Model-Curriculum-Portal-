import mongoose from 'mongoose';
import { User } from '../models/User.model';
import { Role } from '../models/Role.model';
import { RoleName } from '../constants/roles';
import { logger } from '../config/logger';

export const demoAccounts = [
  {
    name: 'Dr. Abhay Jere (AICTE Admin)',
    email: 'admin@curricraft.in',
    password: 'Admin@123456',
    roleName: RoleName.AICTE_ADMIN,
    department: 'AICTE HQ',
    designation: 'Chief Innovation Officer',
    institution: 'AICTE New Delhi',
  },
  {
    name: 'Prof. Anil Sahasrabudhe (Bureau Head)',
    email: 'bureau@curricraft.in',
    password: 'Bureau@123456',
    roleName: RoleName.BUREAU_HEAD,
    department: 'Policy & Academic Bureau',
    designation: 'Bureau Head',
    institution: 'AICTE Headquarters',
  },
  {
    name: 'Dr. Rajesh Sharma (Curriculum Expert)',
    email: 'expert@curricraft.in',
    password: 'Expert@123456',
    roleName: RoleName.CURRICULUM_EXPERT,
    department: 'Computer Science & Engineering',
    designation: 'Senior Professor',
    institution: 'IIT Delhi',
  },
  {
    name: 'Dr. Priya Nair (Peer Reviewer)',
    email: 'reviewer@curricraft.in',
    password: 'Reviewer@123456',
    roleName: RoleName.REVIEWER,
    department: 'Electrical Engineering',
    designation: 'Associate Professor',
    institution: 'IISc Bangalore',
  },
  {
    name: 'Viewer Demo (Public User)',
    email: 'viewer@curricraft.in',
    password: 'Viewer@123456',
    roleName: RoleName.PUBLIC_VIEWER,
    department: 'General Public',
    designation: 'Student / Educator',
    institution: 'Anna University',
  },
];

/**
 * Seed demo users into database for instant login.
 */
export async function seedDemoUsers(): Promise<void> {
  try {
    for (const account of demoAccounts) {
      const role = await Role.findOne({ name: account.roleName });
      if (!role) continue;

      const existingUser = await User.findOne({ email: account.email });
      if (existingUser) {
        existingUser.isEmailVerified = true;
        existingUser.isActive = true;
        existingUser.role = role._id;
        await existingUser.save();
        continue;
      }

      const user = new User({
        name: account.name,
        email: account.email,
        password: account.password,
        role: role._id,
        department: account.department,
        designation: account.designation,
        institution: account.institution,
        isEmailVerified: true,
        isActive: true,
      });

      await user.save();
      logger.info(`✅ Demo user created: ${account.email} (${account.roleName})`);
    }
  } catch (error) {
    logger.error('Failed to seed demo users:', error);
  }
}
