import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcryptjs';

/**
 * Refresh token sub-document interface.
 */
export interface IRefreshToken {
  token: string;
  expiresAt: Date;
  createdAt: Date;
}

/**
 * User document interface.
 */
export interface IUser extends Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  email: string;
  password?: string;
  avatar?: string;
  role: mongoose.Types.ObjectId;
  googleId?: string;
  isEmailVerified: boolean;
  otp?: string;
  otpExpiry?: Date;
  department?: string;
  designation?: string;
  institution?: string;
  phone?: string;
  refreshTokens: IRefreshToken[];
  lastLogin?: Date;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;

  // Instance methods
  comparePassword(candidatePassword: string): Promise<boolean>;
  toSafeObject(): Partial<IUser>;
}

const RefreshTokenSchema = new Schema<IRefreshToken>(
  {
    token: { type: String, required: true },
    expiresAt: { type: Date, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { _id: false }
);

const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters'],
      maxlength: [100, 'Name cannot exceed 100 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email'],
    },
    password: {
      type: String,
      minlength: [8, 'Password must be at least 8 characters'],
      select: false, // Don't include in queries by default
    },
    avatar: {
      type: String,
      default: '',
    },
    role: {
      type: Schema.Types.ObjectId,
      ref: 'Role',
      required: [true, 'Role is required'],
    },
    googleId: {
      type: String,
      unique: true,
      sparse: true, // Allow multiple null values
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    otp: {
      type: String,
      select: false,
    },
    otpExpiry: {
      type: Date,
      select: false,
    },
    department: {
      type: String,
      trim: true,
    },
    designation: {
      type: String,
      trim: true,
    },
    institution: {
      type: String,
      trim: true,
    },
    phone: {
      type: String,
      trim: true,
      match: [/^[+]?[\d\s-]{10,15}$/, 'Please provide a valid phone number'],
    },
    refreshTokens: {
      type: [RefreshTokenSchema],
      default: [],
      select: false,
    },
    lastLogin: {
      type: Date,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// ─── Indexes ────────────────────────────────────
UserSchema.index({ email: 1 });
UserSchema.index({ role: 1 });
UserSchema.index({ isActive: 1 });
UserSchema.index({ googleId: 1 });
UserSchema.index({ createdAt: -1 });

// ─── Pre-save: Hash password ────────────────────
UserSchema.pre<IUser>('save', async function (next) {
  if (!this.isModified('password') || !this.password) return next();

  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error: any) {
    next(error);
  }
});

// ─── Instance Methods ───────────────────────────

/**
 * Compare candidate password with hashed password.
 */
UserSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  if (!this.password) return false;
  return bcrypt.compare(candidatePassword, this.password);
};

/**
 * Return a safe user object (no sensitive fields).
 */
UserSchema.methods.toSafeObject = function (): Partial<IUser> {
  const obj = this.toObject();
  delete obj.password;
  delete obj.otp;
  delete obj.otpExpiry;
  delete obj.refreshTokens;
  delete obj.__v;
  return obj;
};

export const User = mongoose.model<IUser>('User', UserSchema);
