/**
 * Users Pure Functions (NO SIDE EFFECTS)
 *
 * Pure business logic for user management.
 * These functions contain NO database operations and can be tested without I/O.
 *
 * ✅ Fast to test (~1ms each)
 * ✅ Easy to reason about
 * ✅ Composable and reusable
 */

import type { User } from './types.js';

/**
 * Build dynamic UPDATE query from partial user data
 *
 * PURE FUNCTION - No side effects, just builds query string and params
 *
 * @param id - User ID
 * @param data - Partial user data to update
 * @returns Query object with SQL string and parameters
 *
 * @example
 * const query = buildUpdateQuery(1, { email: 'new@example.com' });
 * // { sql: 'UPDATE users SET email = $1, updated_at = ... WHERE id = $2',
 * //   params: ['new@example.com', 1] }
 */
export const buildUpdateQuery = (
  id: number,
  data: Partial<Omit<User, 'id' | 'created_at' | 'updated_at'>>
): { sql: string; params: any[] } => {
  const updates = Object.entries(data)
    .filter(([_, value]) => value !== undefined)
    .map(([key, value], index) => ({
      field: `${key} = $${index + 1}`,
      value,
    }));

  if (updates.length === 0) {
    throw new Error('No fields to update');
  }

  const fields = [
    ...updates.map(u => u.field),
    `updated_at = CURRENT_TIMESTAMP`,
  ];

  const values = [...updates.map(u => u.value), id];

  return {
    sql: `UPDATE users SET ${fields.join(', ')} WHERE id = $${updates.length + 1} RETURNING *`,
    params: values,
  };
};

/**
 * Validate email format
 *
 * PURE FUNCTION
 *
 * @param email - Email string to validate
 * @returns Normalized email or null if invalid
 */
export const validateEmail = (email: unknown): string | null => {
  if (typeof email !== 'string') return null;

  const trimmed = email.trim().toLowerCase();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return emailRegex.test(trimmed) ? trimmed : null;
};

/**
 * Validate username format
 *
 * PURE FUNCTION
 *
 * @param username - Username string to validate
 * @returns Trimmed username or null if invalid
 */
export const validateUsername = (username: unknown): string | null => {
  if (typeof username !== 'string') return null;

  const trimmed = username.trim();

  // Username must be 3-50 characters, alphanumeric + underscore/hyphen
  if (trimmed.length < 3 || trimmed.length > 50) return null;
  if (!/^[a-zA-Z0-9_-]+$/.test(trimmed)) return null;

  return trimmed;
};
