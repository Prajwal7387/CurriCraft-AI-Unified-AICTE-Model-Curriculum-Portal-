import mongoose, { Schema, Document } from 'mongoose';
import { RoleName } from '../constants/roles';
import { Permission } from '../constants/permissions';

/**
 * Role document interface.
 */
export interface IRole extends Document {
  _id: mongoose.Types.ObjectId;
  name: RoleName;
  description: string;
  permissions: Permission[];
  isDefault: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const RoleSchema = new Schema<IRole>(
  {
    name: {
      type: String,
      required: [true, 'Role name is required'],
      unique: true,
      enum: Object.values(RoleName),
    },
    description: {
      type: String,
      required: [true, 'Role description is required'],
      trim: true,
    },
    permissions: {
      type: [String],
      enum: Object.values(Permission),
      default: [],
    },
    isDefault: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// ─── Indexes ────────────────────────────────────
RoleSchema.index({ name: 1 });
RoleSchema.index({ isDefault: 1 });

export const Role = mongoose.model<IRole>('Role', RoleSchema);
