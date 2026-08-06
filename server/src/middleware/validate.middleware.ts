import { Request, Response, NextFunction } from 'express';
import { AnyZodObject, ZodError } from 'zod';
import { ApiError } from '../utils/ApiError';
import { HttpStatus } from '../constants';

/**
 * Validation middleware factory.
 * Takes a Zod schema and validates req.body, req.query, and/or req.params.
 * Returns 422 with detailed error messages on validation failure.
 */
export const validate = (schema: AnyZodObject) => {
  return async (req: Request, _res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages = error.errors.map((err) => ({
          field: err.path.join('.'),
          message: err.message,
        }));

        next(
          new ApiError(
            HttpStatus.UNPROCESSABLE_ENTITY,
            'Validation failed',
            errorMessages
          )
        );
      } else {
        next(error);
      }
    }
  };
};
