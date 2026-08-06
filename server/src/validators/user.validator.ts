import { z } from 'zod';

/**
 * Zod schemas for user-related request validation.
 */

export const updateProfileSchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(2, 'Name must be at least 2 characters')
      .max(100, 'Name cannot exceed 100 characters')
      .trim()
      .optional(),
    department: z.string().trim().optional(),
    designation: z.string().trim().optional(),
    institution: z.string().trim().optional(),
    phone: z
      .string()
      .regex(/^[+]?[\d\s-]{10,15}$/, 'Please provide a valid phone number')
      .optional(),
    avatar: z.string().url('Avatar must be a valid URL').optional(),
  }),
});

export const userListQuerySchema = z.object({
  query: z.object({
    page: z.coerce.number().int().positive().default(1),
    limit: z.coerce.number().int().positive().max(100).default(20),
    search: z.string().trim().optional(),
    role: z.string().trim().optional(),
    isActive: z.coerce.boolean().optional(),
    sort: z.string().trim().default('createdAt'),
    order: z.enum(['asc', 'desc']).default('desc'),
  }),
});
