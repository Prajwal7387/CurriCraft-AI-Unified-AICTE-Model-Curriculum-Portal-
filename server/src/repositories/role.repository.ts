import { Role, IRole } from '../models';
import { BaseRepository } from './base.repository';
import { RoleName } from '../constants/roles';

/**
 * Role repository for managing RBAC roles.
 */
export class RoleRepository extends BaseRepository<IRole> {
  constructor() {
    super(Role);
  }

  /**
   * Find a role by its name enum value.
   */
  async findByName(name: RoleName): Promise<IRole | null> {
    return this.model.findOne({ name }).exec();
  }

  /**
   * Get the default role (PUBLIC_VIEWER).
   */
  async getDefaultRole(): Promise<IRole | null> {
    return this.model.findOne({ isDefault: true }).exec();
  }

  /**
   * Get all roles.
   */
  async getAllRoles(): Promise<IRole[]> {
    return this.model.find().sort({ name: 1 }).exec();
  }
}

export const roleRepository = new RoleRepository();
