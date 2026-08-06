/**
 * Data Transfer Objects for user operations.
 */

export interface UpdateProfileDto {
  name?: string;
  department?: string;
  designation?: string;
  institution?: string;
  phone?: string;
  avatar?: string;
}

export interface UserResponseDto {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: {
    id: string;
    name: string;
    permissions: string[];
  };
  department?: string;
  designation?: string;
  institution?: string;
  phone?: string;
  isEmailVerified: boolean;
  isActive: boolean;
  lastLogin?: Date;
  createdAt: Date;
}

export interface UserListQueryDto {
  page?: number;
  limit?: number;
  search?: string;
  role?: string;
  isActive?: boolean;
  sort?: string;
  order?: 'asc' | 'desc';
}
