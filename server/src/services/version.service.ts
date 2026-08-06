import { Branch, IBranch } from '../models/Branch.model';
import { Commit, ICommit } from '../models/Commit.model';
import { MergeRequest, IMergeRequest } from '../models/MergeRequest.model';
import { ApiError } from '../utils/ApiError';
import { HttpStatus } from '../constants';
import crypto from 'crypto';

export class VersionService {
  async getBranches(curriculumId: string): Promise<IBranch[]> {
    return Branch.find({ curriculumId }).sort({ createdAt: -1 }).exec();
  }

  async createBranch(curriculumId: string, name: string, fromBranch = 'main'): Promise<IBranch> {
    const exists = await Branch.findOne({ curriculumId, name });
    if (exists) {
      throw new ApiError(HttpStatus.CONFLICT, `Branch ${name} already exists`);
    }

    return Branch.create({
      curriculumId,
      name,
      fromBranch,
    });
  }

  async getCommits(curriculumId: string, branchName = 'main'): Promise<ICommit[]> {
    return Commit.find({ curriculumId, branchName }).sort({ createdAt: -1 }).exec();
  }

  async createCommit(
    curriculumId: string,
    message: string,
    authorId: string,
    branchName = 'main',
    tag?: string
  ): Promise<ICommit> {
    const hash = crypto.randomBytes(12).toString('hex');
    return Commit.create({
      curriculumId,
      branchName,
      hash,
      message,
      author: authorId,
      tag,
    });
  }

  async createMergeRequest(
    curriculumId: string,
    title: string,
    description: string,
    sourceBranch: string,
    targetBranch: string,
    authorId: string
  ): Promise<IMergeRequest> {
    return MergeRequest.create({
      curriculumId,
      title,
      description,
      sourceBranch,
      targetBranch,
      author: authorId,
      status: 'OPEN',
    });
  }

  async getMergeRequests(curriculumId: string): Promise<IMergeRequest[]> {
    return MergeRequest.find({ curriculumId })
      .populate('author', 'name email')
      .populate('reviewers', 'name email')
      .sort({ createdAt: -1 })
      .exec();
  }

  async mergeRequest(mrId: string, userId: string): Promise<IMergeRequest> {
    const mr = await MergeRequest.findById(mrId);
    if (!mr) throw new ApiError(HttpStatus.NOT_FOUND, 'Merge request not found');

    mr.status = 'MERGED';
    mr.mergedBy = userId as any;
    mr.mergedAt = new Date();
    await mr.save();
    return mr;
  }

  async rollback(curriculumId: string, commitHash: string, userId: string): Promise<any> {
    const commit = await Commit.findOne({ curriculumId, hash: commitHash });
    if (!commit) throw new ApiError(HttpStatus.NOT_FOUND, 'Commit not found');
    return { curriculumId, commitHash, status: 'ROLLED_BACK', executedBy: userId };
  }
}

export const versionService = new VersionService();
