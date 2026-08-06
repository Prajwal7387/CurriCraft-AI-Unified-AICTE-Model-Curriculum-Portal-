import mongoose, { Schema, Document } from 'mongoose';

export interface IBranch extends Document {
  _id: mongoose.Types.ObjectId;
  curriculumId: mongoose.Types.ObjectId;
  name: string;
  creator: mongoose.Types.ObjectId;
  isMain: boolean;
  parentBranch?: string;
  headCommit?: string;
  createdAt: Date;
  updatedAt: Date;
}

const BranchSchema = new Schema<IBranch>(
  {
    curriculumId: { type: Schema.Types.ObjectId, ref: 'Curriculum', required: true },
    name: { type: String, required: true, trim: true },
    creator: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    isMain: { type: Boolean, default: false },
    parentBranch: { type: String, default: 'main' },
    headCommit: { type: String },
  },
  { timestamps: true }
);

BranchSchema.index({ curriculumId: 1, name: 1 }, { unique: true });

export const Branch = mongoose.model<IBranch>('Branch', BranchSchema);
