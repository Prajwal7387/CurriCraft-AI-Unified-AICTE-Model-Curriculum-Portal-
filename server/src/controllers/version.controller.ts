import { Request, Response } from 'express';
import { versionService } from '../services/version.service';
import { ApiResponse } from '../utils/ApiResponse';
import { HttpStatus } from '../constants/httpStatus';
import { asyncHandler } from '../utils/asyncHandler';

export class VersionController {
  getBranches = asyncHandler(async (req: Request, res: Response) => {
    const branches = await versionService.getBranches(req.params.curriculumId as string);
    res.status(HttpStatus.OK).json(
      new ApiResponse(HttpStatus.OK, 'Branches retrieved', branches)
    );
  });

  createBranch = asyncHandler(async (req: Request, res: Response) => {
    const branch = await versionService.createBranch(
      req.params.curriculumId as string,
      req.body.name,
      req.body.fromBranch || 'main'
    );
    res.status(HttpStatus.CREATED).json(
      new ApiResponse(HttpStatus.CREATED, 'Branch created successfully', branch)
    );
  });

  getCommits = asyncHandler(async (req: Request, res: Response) => {
    const commits = await versionService.getCommits(
      req.params.curriculumId as string,
      (req.query.branch as string) || 'main'
    );
    res.status(HttpStatus.OK).json(
      new ApiResponse(HttpStatus.OK, 'Commit history retrieved', commits)
    );
  });

  createCommit = asyncHandler(async (req: Request, res: Response) => {
    const commit = await versionService.createCommit(
      req.body.curriculumId,
      req.body.message,
      req.user!._id.toString(),
      req.body.branchName,
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
    const mrs = await versionService.getMergeRequests(req.params.curriculumId as string);
    res.status(HttpStatus.OK).json(
      new ApiResponse(HttpStatus.OK, 'Merge requests retrieved', mrs)
    );
  });

  mergeRequest = asyncHandler(async (req: Request, res: Response) => {
    const mr = await versionService.mergeRequest(
      req.params.mrId as string,
      req.user!._id.toString()
    );
    res.status(HttpStatus.OK).json(
      new ApiResponse(HttpStatus.OK, 'Merge request approved and merged', mr)
    );
  });

  rollback = asyncHandler(async (req: Request, res: Response) => {
    const result = await versionService.rollback(
      req.body.curriculumId,
      req.body.commitHash,
      req.user!._id.toString()
    );
    res.status(HttpStatus.OK).json(
      new ApiResponse(HttpStatus.OK, 'Curriculum state rolled back', result)
    );
  });
}

export const versionController = new VersionController();
