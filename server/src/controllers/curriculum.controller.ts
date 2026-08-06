import { Request, Response } from 'express';
import { curriculumService } from '../services/curriculum.service';
import { asyncHandler } from '../utils/asyncHandler';
import { ApiResponse } from '../utils/ApiResponse';
import { HttpStatus } from '../constants';

export class CurriculumController {
  create = asyncHandler(async (req: Request, res: Response) => {
    const item = await curriculumService.createCurriculum(req.body, req.user!._id.toString());
    res.status(HttpStatus.CREATED).json(
      new ApiResponse(HttpStatus.CREATED, 'Curriculum created successfully', item)
    );
  });

  getAll = asyncHandler(async (req: Request, res: Response) => {
    const items = await curriculumService.getAllCurricula(req.query);
    res.status(HttpStatus.OK).json(
      new ApiResponse(HttpStatus.OK, 'Curricula retrieved successfully', items)
    );
  });

  getById = asyncHandler(async (req: Request, res: Response) => {
    const item = await curriculumService.getById(req.params.id);
    res.status(HttpStatus.OK).json(
      new ApiResponse(HttpStatus.OK, 'Curriculum details retrieved', item)
    );
  });

  update = asyncHandler(async (req: Request, res: Response) => {
    const item = await curriculumService.update(req.params.id, req.body, req.user!._id.toString());
    res.status(HttpStatus.OK).json(
      new ApiResponse(HttpStatus.OK, 'Curriculum updated successfully', item)
    );
  });

  updateStatus = asyncHandler(async (req: Request, res: Response) => {
    const item = await curriculumService.updateStatus(req.params.id, req.body.status);
    res.status(HttpStatus.OK).json(
      new ApiResponse(HttpStatus.OK, `Status updated to ${req.body.status}`, item)
    );
  });
}

export const curriculumController = new CurriculumController();
