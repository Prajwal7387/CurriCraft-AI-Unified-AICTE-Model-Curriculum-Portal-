/**
 * Standardized API response envelope.
 * Ensures consistent JSON structure across all endpoints.
 */
export class ApiResponse<T = any> {
  public readonly success: boolean;
  public readonly statusCode: number;
  public readonly message: string;
  public readonly data: T | null;
  public readonly meta?: Record<string, any>;

  constructor(
    statusCode: number,
    message: string,
    data: T | null = null,
    meta?: Record<string, any>
  ) {
    this.success = statusCode < 400;
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
    this.meta = meta;
  }

  /**
   * Convenience factory for paginated responses.
   */
  static paginated<T>(
    statusCode: number,
    message: string,
    data: T[],
    page: number,
    limit: number,
    total: number
  ): ApiResponse<T[]> {
    return new ApiResponse(statusCode, message, data, {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      hasNextPage: page * limit < total,
      hasPrevPage: page > 1,
    });
  }
}
