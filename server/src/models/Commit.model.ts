import mongoose, { Schema, Document } from 'mongoose';

export interface ICommit extends Document {
  _id: mongoose.Types.ObjectId;
  curriculumId: mongoose.Types.ObjectId;
  branchName: string;
  hash: string;
  message: string;
  author: mongoose.Types.ObjectId;
  snapshot: Record<string, any>;
  tag?: string;
  createdAt: Date;
}

const CommitSchema = new Schema<ICommit>(
  {
    curriculumId: { type: Schema.Types.ObjectId, ref: 'Curriculum', required: true },
    branchName: { type: String, required: true },
    hash: { type: String, required: true, unique: true },
    message: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    snapshot: { type: Schema.Types.Mixed, required: true },
    tag: { type: String },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

CommitSchema.index({ curriculumId: 1, branchName: 1 });
CommitSchema.index({ hash: 1 });

export const Commit = mongoose.model<ICommit>('Commit', CommitSchema);
