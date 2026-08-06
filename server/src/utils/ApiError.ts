import { HttpStatusCode } from '../constants/httpStatus';

/**
 * Custom API Error class.
 * Extends the native Error with statusCode, isOperational flag, and error array.
 * Operational errors are expected (validation, auth, etc).
 * Non-operational errors are bugs that should trigger alerts.
 */
export class ApiError extends Error {
  public readonly statusCode: HttpStatusCode;
  public readonly isOperational: boolean;
  public readonly errors: any[];

  constructor(
    statusCode: HttpStatusCode,
    message: string,
    errors: any[] = [],
    isOperational = true,
    stack = ''
  ) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.errors = errors;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }

    // Maintains proper prototype chain
    Object.setPrototypeOf(this, ApiError.prototype);
  }
}
