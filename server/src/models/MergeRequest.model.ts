import mongoose, { Schema, Document } from 'mongoose';

export interface IMergeRequest extends Document {
  _id: mongoose.Types.ObjectId;
  curriculumId: mongoose.Types.ObjectId;
  title: string;
  description: string;
  sourceBranch: string;
  targetBranch: string;
  author: mongoose.Types.ObjectId;
  reviewers: mongoose.Types.ObjectId[];
  status: 'OPEN' | 'APPROVED' | 'CHANGES_REQUESTED' | 'MERGED' | 'CLOSED';
  mergedBy?: mongoose.Types.ObjectId;
  mergedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const MergeRequestSchema = new Schema<IMergeRequest>(
  {
    curriculumId: { type: Schema.Types.ObjectId, ref: 'Curriculum', required: true },
    title: { type: String, required: true },
    description: { type: String, default: '' },
    sourceBranch: { type: String, required: true },
    targetBranch: { type: String, required: true, default: 'main' },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    reviewers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    status: {
      type: String,
      enum: ['OPEN', 'APPROVED', 'CHANGES_REQUESTED', 'MERGED', 'CLOSED'],
      default: 'OPEN',
    },
    mergedBy: { type: Schema.Types.ObjectId, ref: 'User' },
    mergedAt: { type: Date },
  },
  { timestamps: true }
);

export const MergeRequest = mongoose.model<IMergeRequest>('MergeRequest', MergeRequestSchema);
