import { Request, Response } from 'express';
import { versionService } from '../services/version.service';
import { asyncHandler } from '../utils/asyncHandler';
import { ApiResponse } from '../utils/ApiResponse';
import { HttpStatus } from '../constants';

export class VersionController {
  createBranch = asyncHandler(async (req: Request, res: Response) => {
    const branch = await versionService.createBranch(
      req.body.curriculumId,
      req.body.name,
      req.user!._id.toString()
    );
    res.status(HttpStatus.CREATED).json(
      new ApiResponse(HttpStatus.CREATED, 'Branch created successfully', branch)
    );
  });

  getBranches = asyncHandler(async (req: Request, res: Response) => {
    const branches = await versionService.getBranches(req.params.curriculumId);
    res.status(HttpStatus.OK).json(
      new ApiResponse(HttpStatus.OK, 'Branches retrieved', branches)
    );
  });

  getCommits = asyncHandler(async (req: Request, res: Response) => {
    const commits = await versionService.getCommits(
      req.params.curriculumId,
      (req.query.branch as string) || 'main'
    );
    res.status(HttpStatus.OK).json(
      new ApiResponse(HttpStatus.OK, 'Commit history retrieved', commits)
    );
  });

  createCommit = asyncHandler(async (req: Request, res: Response) => {
    const commit = await versionService.createCommit(
      req.body.curriculumId,
      req.body.branchName,
      req.body.message,
      req.user!._id.toString(),
      req.body.tag
    );
    res.status(HttpStatus.CREATED).json(
      new ApiResponse(HttpStatus.CREATED, 'Commit recorded', commit)
    );
  });

  createMergeRequest = asyncHandler(async (req: Request, res: Response) => {
    const mr = await versionService.createMergeRequest(
      req.body.curriculumId,
      req.body.title,
      req.body.description,
      req.body.sourceBranch,
      req.body.targetBranch || 'main',
      req.user!._id.toString()
    );
    res.status(HttpStatus.CREATED).json(
      new ApiResponse(HttpStatus.CREATED, 'Merge request created', mr)
    );
  });

  getMergeRequests = asyncHandler(async (req: Request, res: Response) => {
    const mrs = await versionService.getMergeRequests(req.params.curriculumId);
    res.status(HttpStatus.OK).json(
      new ApiResponse(HttpStatus.OK, 'Merge requests retrieved', mrs)
    );
  });

  mergeRequest = asyncHandler(async (req: Request, res: Response) => {
    const mr = await versionService.mergeRequest(req.params.mrId, req.user!._id.toString());
    res.status(HttpStatus.OK).json(
      new ApiResponse(HttpStatus.OK, 'Merge request approved and merged', mr)
    );
  });

  rollback = asyncHandler(async (req: Request, res: Response) => {
    const restored = await versionService.rollbackToCommit(
      req.body.curriculumId,
      req.body.commitHash
    );
    res.status(HttpStatus.OK).json(
      new ApiResponse(HttpStatus.OK, 'Rolled back to commit snapshot', restored)
    );
  });
}

export const versionController = new VersionController();
