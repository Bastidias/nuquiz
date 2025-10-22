/**
 * Users Table Data Access Layer (DAL)
 *
 * Functional-style data access for user management.
 * All functions are pure (input → output) with no side effects beyond database operations.
 *
 * NO MOCKS - Designed for integration testing against real PostgreSQL database.
 */

import { query, queryOne } from './connection.js';
import type { User, NewUser, UserRole } from './types.js';

// ============================================================================
// Query Functions
// ============================================================================

/**
 * Find a user by ID
 *
 * @param id - User ID
 * @returns User object or null if not found
 *
 * @example
 * const user = await users.findById(1);
 * if (user) {
 *   console.log(user.email);
 * }
 */
export const findById = async (id: number): Promise<User | null> => {
  return queryOne<User>(
    'SELECT * FROM users WHERE id = $1',
    [id]
  );
};

/**
 * Find a user by email address
 *
 * @param email - Email address (case-insensitive)
 * @returns User object or null if not found
 *
 * @example
 * const user = await users.findByEmail('admin@nuquiz.com');
 * if (!user) {
 *   console.log('User not found');
 * }
 */
export const findByEmail = async (email: string): Promise<User | null> => {
  return queryOne<User>(
    'SELECT * FROM users WHERE LOWER(email) = LOWER($1)',
    [email]
  );
};

/**
 * Find a user by username
 *
 * @param username - Username (case-insensitive)
 * @returns User object or null if not found
 *
 * @example
 * const user = await users.findByUsername('jdoe');
 */
export const findByUsername = async (username: string): Promise<User | null> => {
  return queryOne<User>(
    'SELECT * FROM users WHERE LOWER(username) = LOWER($1)',
    [username]
  );
};

// ============================================================================
// Mutation Functions
// ============================================================================

/**
 * Create a new user
 *
 * @param data - User data (email required, username, password_hash, and role optional)
 * @returns Newly created user object
 * @throws Error if email already exists (database constraint violation)
 *
 * @example
 * const newUser = await users.create({
 *   email: 'user@example.com',
 *   username: 'jdoe',
 *   password_hash: await hashPassword('secret'),
 *   role: 'student'
 * });
 * console.log(`Created user with ID: ${newUser.id}`);
 */
export const create = async (data: NewUser): Promise<User> => {
  const { email, username, password_hash, role } = data;

  const result = await queryOne<User>(
    `INSERT INTO users (email, username, password_hash, role)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [email, username || null, password_hash || null, role || 'student']
  );

  if (!result) {
    throw new Error('Failed to create user');
  }

  return result;
};

/**
 * Update an existing user
 *
 * @param id - User ID
 * @param data - Partial user data to update
 * @returns Updated user object
 * @throws Error if user not found or email/username already taken
 *
 * @example
 * const updated = await users.update(1, { username: 'johndoe', role: 'admin' });
 * console.log(`Username updated to: ${updated.username}`);
 */
export const update = async (
  id: number,
  data: Partial<Omit<User, 'id' | 'created_at' | 'updated_at'>>
): Promise<User> => {
  const fields: string[] = [];
  const values: any[] = [];
  let paramIndex = 1;

  // Build dynamic UPDATE query based on provided fields
  if (data.email !== undefined) {
    fields.push(`email = $${paramIndex++}`);
    values.push(data.email);
  }

  if (data.username !== undefined) {
    fields.push(`username = $${paramIndex++}`);
    values.push(data.username);
  }

  if (data.password_hash !== undefined) {
    fields.push(`password_hash = $${paramIndex++}`);
    values.push(data.password_hash);
  }

  if (data.role !== undefined) {
    fields.push(`role = $${paramIndex++}`);
    values.push(data.role);
  }

  if (data.email_verified !== undefined) {
    fields.push(`email_verified = $${paramIndex++}`);
    values.push(data.email_verified);
  }

  if (fields.length === 0) {
    throw new Error('No fields to update');
  }

  // Add updated_at timestamp
  fields.push(`updated_at = CURRENT_TIMESTAMP`);

  // Add WHERE clause parameter
  values.push(id);

  const result = await queryOne<User>(
    `UPDATE users
     SET ${fields.join(', ')}
     WHERE id = $${paramIndex}
     RETURNING *`,
    values
  );

  if (!result) {
    throw new Error(`User with id ${id} not found`);
  }

  return result;
};

/**
 * Delete a user
 *
 * @param id - User ID
 * @throws Error if user not found
 *
 * @example
 * await users.remove(1);
 * console.log('User deleted');
 */
export const remove = async (id: number): Promise<void> => {
  const result = await query(
    'DELETE FROM users WHERE id = $1 RETURNING id',
    [id]
  );

  if (result.rowCount === 0) {
    throw new Error(`User with id ${id} not found`);
  }
};

// ============================================================================
// Aggregate/Utility Functions
// ============================================================================

/**
 * Count total users
 *
 * @returns Total number of users in database
 *
 * @example
 * const total = await users.count();
 * console.log(`Total users: ${total}`);
 */
export const count = async (): Promise<number> => {
  const result = await queryOne<{ count: string }>(
    'SELECT COUNT(*) as count FROM users'
  );

  return result ? parseInt(result.count, 10) : 0;
};

/**
 * Check if email is already taken
 *
 * @param email - Email address to check
 * @returns true if email exists, false otherwise
 *
 * @example
 * const taken = await users.emailExists('test@example.com');
 * if (taken) {
 *   console.log('Email already registered');
 * }
 */
export const emailExists = async (email: string): Promise<boolean> => {
  const user = await findByEmail(email);
  return user !== null;
};

/**
 * Check if username is already taken
 *
 * @param username - Username to check
 * @returns true if username exists, false otherwise
 *
 * @example
 * const taken = await users.usernameExists('johndoe');
 * if (taken) {
 *   console.log('Username already taken');
 * }
 */
export const usernameExists = async (username: string): Promise<boolean> => {
  const user = await findByUsername(username);
  return user !== null;
};

// ============================================================================
// Role-Based Access Control (RBAC) Functions
// ============================================================================

/**
 * Find users by role
 *
 * @param role - User role to filter by
 * @returns Array of users with the specified role
 *
 * @example
 * const admins = await users.findByRole('admin');
 * console.log(`Found ${admins.length} admins`);
 */
export const findByRole = async (role: UserRole): Promise<User[]> => {
  const result = await query<User>(
    'SELECT * FROM users WHERE role = $1 ORDER BY created_at DESC',
    [role]
  );

  return result.rows;
};

/**
 * Update user role
 *
 * @param id - User ID
 * @param role - New role
 * @returns Updated user object
 * @throws Error if user not found
 *
 * @example
 * const user = await users.updateRole(1, 'admin');
 * console.log(`User role updated to: ${user.role}`);
 */
export const updateRole = async (id: number, role: UserRole): Promise<User> => {
  return update(id, { role });
};

/**
 * Check if user has a specific role
 *
 * @param userId - User ID
 * @param role - Role to check
 * @returns true if user has the role, false otherwise
 *
 * @example
 * const isAdmin = await users.hasRole(1, 'admin');
 * if (isAdmin) {
 *   console.log('User is an admin');
 * }
 */
export const hasRole = async (userId: number, role: UserRole): Promise<boolean> => {
  const user = await findById(userId);
  return user?.role === role;
};

/**
 * Check if user has any of the specified roles
 *
 * @param userId - User ID
 * @param roles - Array of roles to check
 * @returns true if user has any of the roles, false otherwise
 *
 * @example
 * const canManageContent = await users.hasAnyRole(1, ['admin', 'superadmin']);
 * if (canManageContent) {
 *   console.log('User can manage content');
 * }
 */
export const hasAnyRole = async (userId: number, roles: UserRole[]): Promise<boolean> => {
  const user = await findById(userId);
  return user ? roles.includes(user.role) : false;
};

/**
 * Count users by role
 *
 * @param role - Role to count
 * @returns Number of users with the specified role
 *
 * @example
 * const studentCount = await users.countByRole('student');
 * console.log(`Total students: ${studentCount}`);
 */
export const countByRole = async (role: UserRole): Promise<number> => {
  const result = await queryOne<{ count: string }>(
    'SELECT COUNT(*) as count FROM users WHERE role = $1',
    [role]
  );

  return result ? parseInt(result.count, 10) : 0;
};
