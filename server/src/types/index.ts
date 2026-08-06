import { RoleName } from '../constants/roles';
import { Permission } from '../constants/permissions';

/**
 * JWT access token payload.
 */
export interface JwtPayload {
  userId: string;
  email: string;
  role: RoleName;
  permissions: Permission[];
  sessionId: string;
}

/**
 * JWT refresh token payload.
 */
export interface JwtRefreshPayload {
  userId: string;
  sessionId: string;
  tokenVersion: number;
}

/**
 * Pagination query parameters.
 */
export interface PaginationQuery {
  page: number;
  limit: number;
  sort?: string;
  order?: 'asc' | 'desc';
}

/**
 * Paginated result shape.
 */
export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
