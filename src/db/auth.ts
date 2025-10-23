/**
 * Authentication Data Access Layer
 *
 * Handles authentication-related database operations:
 * - Password hashing and verification
 * - Authentication event logging
 * - Last login tracking
 *
 * Following functional programming style (Eric Elliott approach).
 */

import bcrypt from 'bcryptjs';
import { query, queryOne } from './connection';
import type { AuthEvent, NewAuthEvent, User } from './types';

// ==========================================
// PASSWORD MANAGEMENT
// ==========================================

/**
 * Hash a plain-text password using bcrypt
 *
 * @param password - Plain-text password
 * @returns Promise resolving to hashed password
 */
export const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 12; // Higher is more secure but slower
  return bcrypt.hash(password, saltRounds);
};

/**
 * Verify a plain-text password against a hash
 *
 * @param password - Plain-text password
 * @param hash - Bcrypt hash
 * @returns Promise resolving to true if password matches
 */
export const verifyPassword = async (
  password: string,
  hash: string
): Promise<boolean> => {
  return bcrypt.compare(password, hash);
};

// ==========================================
// AUTHENTICATION EVENTS
// ==========================================

/**
 * Log an authentication event
 *
 * @param data - Authentication event data
 * @returns Promise resolving to created event
 */
export const logAuthEvent = async (data: NewAuthEvent): Promise<AuthEvent> => {
  const result = await queryOne<AuthEvent>(
    `INSERT INTO auth_events (user_id, event_type, ip_address, user_agent, metadata)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
    [
      data.user_id || null,
      data.event_type,
      data.ip_address || null,
      data.user_agent || null,
      data.metadata ? JSON.stringify(data.metadata) : null,
    ]
  );

  if (!result) {
    throw new Error('Failed to log authentication event');
  }

  return result;
};

/**
 * Get authentication events for a user
 *
 * @param userId - User ID
 * @param limit - Maximum number of events to return (default: 100)
 * @returns Promise resolving to array of events
 */
export const getUserAuthEvents = async (
  userId: number,
  limit: number = 100
): Promise<AuthEvent[]> => {
  const result = await query<AuthEvent>(
    `SELECT * FROM auth_events
     WHERE user_id = $1
     ORDER BY created_at DESC
     LIMIT $2`,
    [userId, limit]
  );

  return result.rows;
};

/**
 * Get recent failed login attempts for a user
 * Used for rate limiting and security monitoring
 *
 * @param userId - User ID
 * @param since - Time window to check (default: last hour)
 * @returns Promise resolving to count of failed attempts
 */
export const getRecentFailedLogins = async (
  userId: number,
  since: Date = new Date(Date.now() - 60 * 60 * 1000) // 1 hour ago
): Promise<number> => {
  const result = await queryOne<{ count: string }>(
    `SELECT COUNT(*) as count FROM auth_events
     WHERE user_id = $1
       AND event_type = 'failed_login'
       AND created_at > $2`,
    [userId, since]
  );

  return result ? parseInt(result.count, 10) : 0;
};

// ==========================================
// LOGIN TRACKING
// ==========================================

/**
 * Update last login timestamp for a user
 *
 * @param userId - User ID
 * @returns Promise resolving to updated user
 */
export const updateLastLogin = async (userId: number): Promise<User> => {
  const result = await queryOne<User>(
    `UPDATE users
     SET last_login_at = CURRENT_TIMESTAMP,
         updated_at = CURRENT_TIMESTAMP
     WHERE id = $1
     RETURNING *`,
    [userId]
  );

  if (!result) {
    throw new Error(`User with ID ${userId} not found`);
  }

  return result;
};

// ==========================================
// VERIFICATION
// ==========================================

/**
 * Mark user email as verified
 *
 * @param userId - User ID
 * @returns Promise resolving to updated user
 */
export const verifyUserEmail = async (userId: number): Promise<User> => {
  const result = await queryOne<User>(
    `UPDATE users
     SET email_verified = true,
         updated_at = CURRENT_TIMESTAMP
     WHERE id = $1
     RETURNING *`,
    [userId]
  );

  if (!result) {
    throw new Error(`User with ID ${userId} not found`);
  }

  return result;
};
