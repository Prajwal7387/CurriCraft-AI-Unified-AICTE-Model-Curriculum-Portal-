import mongoose, { Schema, Document } from 'mongoose';

/**
 * Session document interface.
 * Tracks active user sessions for security auditing and token management.
 */
export interface ISession extends Document {
  _id: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  refreshToken: string;
  ipAddress: string;
  userAgent: string;
  isValid: boolean;
  expiresAt: Date;
  createdAt: Date;
}

const SessionSchema = new Schema<ISession>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    refreshToken: {
      type: String,
      required: true,
    },
    ipAddress: {
      type: String,
      default: '',
    },
    userAgent: {
      type: String,
      default: '',
    },
    isValid: {
      type: Boolean,
      default: true,
    },
    expiresAt: {
      type: Date,
      required: true,
      index: { expireAfterSeconds: 0 }, // TTL index — auto-delete expired sessions
    },
  },
  {
    timestamps: true,
  }
);

// ─── Indexes ────────────────────────────────────
SessionSchema.index({ userId: 1 });
SessionSchema.index({ refreshToken: 1 });
SessionSchema.index({ isValid: 1 });

export const Session = mongoose.model<ISession>('Session', SessionSchema);
