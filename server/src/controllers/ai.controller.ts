import { Request, Response } from 'express';
import { aiService } from '../services/ai.service';
import { nepService } from '../services/nep.service';
import { asyncHandler } from '../utils/asyncHandler';
import { ApiResponse } from '../utils/ApiResponse';
import { HttpStatus } from '../constants';

export class AiController {
  generateSyllabus = asyncHandler(async (req: Request, res: Response) => {
    const result = await aiService.generateSyllabus(req.body);
    res.status(HttpStatus.OK).json(
      new ApiResponse(HttpStatus.OK, 'Syllabus generated successfully', result)
    );
  });

  rewriteContent = asyncHandler(async (req: Request, res: Response) => {
    const result = await aiService.rewriteContent(req.body.content, req.body.tone);
    res.status(HttpStatus.OK).json(
      new ApiResponse(HttpStatus.OK, 'Content rewritten', { rewrittenContent: result })
    );
  });
}

export class NepController {
  runAudit = asyncHandler(async (req: Request, res: Response) => {
    const report = await nepService.runAudit(req.body);
    res.status(HttpStatus.OK).json(
      new ApiResponse(HttpStatus.OK, 'NEP 2020 Compliance Audit Complete', report)
    );
  });
}

export const aiController = new AiController();
export const nepController = new NepController();
