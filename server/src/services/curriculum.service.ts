import { Curriculum, ICurriculum } from '../models/Curriculum.model';
import { Branch } from '../models/Branch.model';
import { Commit } from '../models/Commit.model';
import { ApiError } from '../utils/ApiError';
import { HttpStatus } from '../constants';
import crypto from 'crypto';

export class CurriculumService {
  /**
   * Create new curriculum model document.
   */
  async createCurriculum(data: Partial<ICurriculum>, authorId: string): Promise<ICurriculum> {
    const codeExists = await Curriculum.findOne({ code: data.code });
    if (codeExists) {
      throw new ApiError(HttpStatus.CONFLICT, `Curriculum with code ${data.code} already exists`);
    }

    const curriculum = await Curriculum.create({
      ...data,
      author: authorId,
      status: 'DRAFT',
      activeBranch: 'main',
    });

    // Create main branch
    await Branch.create({
      curriculumId: curriculum._id,
      name: 'main',
      creator: authorId,
      isMain: true,
    });

    // Initial commit
    const commitHash = crypto.randomBytes(12).toString('hex');
    await Commit.create({
      curriculumId: curriculum._id,
      branchName: 'main',
      hash: commitHash,
      message: 'Initial commit — Curriculum Created',
      author: authorId,
      snapshot: curriculum.toObject(),
    });

    return curriculum;
  }

  /**
   * Get all curricula with search and filter.
   */
  async getAllCurricula(query: any = {}) {
    const filter: any = {};
    if (query.search) {
      filter.$or = [
        { title: { $regex: query.search, $options: 'i' } },
        { code: { $regex: query.search, $options: 'i' } },
        { department: { $regex: query.search, $options: 'i' } },
      ];
    }
    if (query.status) filter.status = query.status;
    if (query.degree) filter.degree = query.degree;

    const items = await Curriculum.find(filter)
      .populate('author', 'name email institution')
      .sort({ updatedAt: -1 })
      .exec();

    return items;
  }

  /**
   * Get single curriculum by ID.
   */
  async getById(id: string): Promise<ICurriculum> {
    const item = await Curriculum.findById(id)
      .populate('author', 'name email institution')
      .populate('reviewers', 'name email designation')
      .exec();

    if (!item) {
      throw new ApiError(HttpStatus.NOT_FOUND, 'Curriculum not found');
    }
    return item;
  }

  /**
   * Update curriculum document.
   */
  async update(id: string, updateData: Partial<ICurriculum>, userId: string): Promise<ICurriculum> {
    const item = await Curriculum.findByIdAndUpdate(id, updateData, { new: true })
      .populate('author', 'name email')
      .exec();

    if (!item) {
      throw new ApiError(HttpStatus.NOT_FOUND, 'Curriculum not found');
    }

    // Auto commit change
    const commitHash = crypto.randomBytes(12).toString('hex');
    await Commit.create({
      curriculumId: item._id,
      branchName: item.activeBranch || 'main',
      hash: commitHash,
      message: `Updated curriculum content: ${item.title}`,
      author: userId,
      snapshot: item.toObject(),
    });

    return item;
  }

  /**
   * Change governance status (Draft → Review → Approved → Published).
   */
  async updateStatus(id: string, status: string): Promise<ICurriculum> {
    const item = await Curriculum.findByIdAndUpdate(id, { status }, { new: true });
    if (!item) {
      throw new ApiError(HttpStatus.NOT_FOUND, 'Curriculum not found');
    }
    return item;
  }
}

export const curriculumService = new CurriculumService();
