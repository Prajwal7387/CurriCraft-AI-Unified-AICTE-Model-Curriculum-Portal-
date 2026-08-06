import { Branch, IBranch } from '../models/Branch.model';
import { Commit, ICommit } from '../models/Commit.model';
import { MergeRequest, IMergeRequest } from '../models/MergeRequest.model';
import { Curriculum } from '../models/Curriculum.model';
import { ApiError } from '../utils/ApiError';
import { HttpStatus } from '../constants';
import crypto from 'crypto';

export class VersionService {
  /**
   * Create new branch.
   */
  async createBranch(curriculumId: string, branchName: string, userId: string): Promise<IBranch> {
    const exists = await Branch.findOne({ curriculumId, name: branchName });
    if (exists) {
      throw new ApiError(HttpStatus.CONFLICT, `Branch '${branchName}' already exists`);
    }

    const branch = await Branch.create({
      curriculumId,
      name: branchName,
      creator: userId,
      isMain: false,
    });

    return branch;
  }

  /**
   * List all branches for a curriculum.
   */
  async getBranches(curriculumId: string): Promise<IBranch[]> {
    return Branch.find({ curriculumId }).populate('creator', 'name').exec();
  }

  /**
   * Get commit log history for a branch.
   */
  async getCommits(curriculumId: string, branchName: string = 'main'): Promise<ICommit[]> {
    return Commit.find({ curriculumId, branchName })
      .populate('author', 'name email')
      .sort({ createdAt: -1 })
      .exec();
  }

  /**
   * Create a manual commit / checkpoint.
   */
  async createCommit(
    curriculumId: string,
    branchName: string,
    message: string,
    userId: string,
    tag?: string
  ): Promise<ICommit> {
    const curr = await Curriculum.findById(curriculumId);
    if (!curr) throw new ApiError(HttpStatus.NOT_FOUND, 'Curriculum not found');

    const hash = crypto.randomBytes(12).toString('hex');
    const commit = await Commit.create({
      curriculumId,
      branchName,
      hash,
      message,
      author: userId,
      snapshot: curr.toObject(),
      tag,
    });

    return commit;
  }

  /**
   * Create Merge Request (Pull Request).
   */
  async createMergeRequest(
    curriculumId: string,
    title: string,
    description: string,
    sourceBranch: string,
    targetBranch: string,
    authorId: string
  ): Promise<IMergeRequest> {
    const mr = await MergeRequest.create({
      curriculumId,
      title,
      description,
      sourceBranch,
      targetBranch,
      author: authorId,
      status: 'OPEN',
    });

    return mr;
  }

  /**
   * Get Merge Requests for a curriculum.
   */
  async getMergeRequests(curriculumId: string): Promise<IMergeRequest[]> {
    return MergeRequest.find({ curriculumId })
      .populate('author', 'name email')
      .populate('reviewers', 'name email')
      .sort({ createdAt: -1 })
      .exec();
  }

  /**
   * Approve & Merge Merge Request.
   */
  async mergeRequest(mrId: string, userId: string): Promise<IMergeRequest> {
    const mr = await MergeRequest.findById(mrId);
    if (!mr) throw new ApiError(HttpStatus.NOT_FOUND, 'Merge request not found');

    mr.status = 'MERGED';
    mr.mergedBy = userId as any;
    mr.mergedAt = new Date();
    await mr.save();

    // Log merge commit
    const hash = crypto.randomBytes(12).toString('hex');
    const curr = await Curriculum.findById(mr.curriculumId);
    if (curr) {
      await Commit.create({
        curriculumId: curr._id,
        branchName: mr.targetBranch,
        hash,
        message: `Merge branch '${mr.sourceBranch}' into '${mr.targetBranch}'`,
        author: userId,
        snapshot: curr.toObject(),
      });
    }

    return mr;
  }

  /**
   * Rollback curriculum to a specific commit snapshot.
   */
  async rollbackToCommit(curriculumId: string, commitHash: string): Promise<any> {
    const commit = await Commit.findOne({ curriculumId, hash: commitHash });
    if (!commit) throw new ApiError(HttpStatus.NOT_FOUND, 'Commit hash not found');

    const snapshot = commit.snapshot;
    delete snapshot._id;
    delete snapshot.createdAt;
    delete snapshot.updatedAt;

    const restored = await Curriculum.findByIdAndUpdate(curriculumId, snapshot, { new: true });
    return restored;
  }
}

export const versionService = new VersionService();
