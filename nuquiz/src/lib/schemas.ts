/**
 * Validation Schemas using Zod
 *
 * Replaces custom validators with industry-standard Zod library.
 * Simple, type-safe, composable, and battle-tested.
 */

import { z } from 'zod';

// ============================================================================
// Basic Schemas
// ============================================================================

export const emailSchema = z
  .string()
  .email('Invalid email format')
  .toLowerCase()
  .trim();

export const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
  .regex(/\d/, 'Password must contain at least one number');

export const usernameSchema = z
  .string()
  .min(3, 'Username must be at least 3 characters')
  .max(50, 'Username must be at most 50 characters')
  .regex(/^[a-zA-Z0-9_-]+$/, 'Username can only contain letters, numbers, underscores, and hyphens')
  .trim();

export const roleSchema = z.enum(['student', 'admin', 'superadmin']);

// ============================================================================
// Composite Schemas
// ============================================================================

export const credentialsSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, 'Password is required'), // Don't validate strength on login
});

export const registerSchema = z.object({
  email: emailSchema,
  password: passwordSchema, // Validate strength on registration
  username: usernameSchema.optional(),
});

export const updateUserSchema = z.object({
  email: emailSchema.optional(),
  username: usernameSchema.optional(),
  role: roleSchema.optional(),
  email_verified: z.boolean().optional(),
});

// ============================================================================
// Type Inference
// ============================================================================

export type Credentials = z.infer<typeof credentialsSchema>;
export type RegisterData = z.infer<typeof registerSchema>;
export type UpdateUserData = z.infer<typeof updateUserSchema>;
export type UserRole = z.infer<typeof roleSchema>;
