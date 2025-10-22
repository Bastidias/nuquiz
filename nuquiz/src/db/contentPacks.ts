/**
 * Content Packs & Subscriptions Data Access Layer (DAL)
 *
 * Functional-style data access for content pack management and user subscriptions.
 * All functions are pure (input → output) with no side effects beyond database operations.
 *
 * NO MOCKS - Designed for integration testing against real PostgreSQL database.
 */

import { query, queryOne, queryMany } from './connection.js';
import type { ContentPack, NewContentPack, UserPackSubscription } from './types.js';

// ============================================================================
// Content Pack Query Functions
// ============================================================================

/**
 * Find a content pack by ID
 *
 * @param id - Content pack ID
 * @returns ContentPack object or null if not found
 *
 * @example
 * const pack = await contentPacks.findById(1);
 * if (pack) {
 *   console.log(pack.name);
 * }
 */
export const findById = async (id: number): Promise<ContentPack | null> => {
  return queryOne<ContentPack>(
    'SELECT * FROM content_packs WHERE id = $1',
    [id]
  );
};

/**
 * Find all active content packs
 *
 * @returns Array of active content packs (is_active = true)
 *
 * @example
 * const activePacks = await contentPacks.findActive();
 * console.log(`Found ${activePacks.length} active packs`);
 */
export const findActive = async (): Promise<ContentPack[]> => {
  return queryMany<ContentPack>(
    'SELECT * FROM content_packs WHERE is_active = true ORDER BY name'
  );
};

/**
 * Find all content packs (active and inactive)
 *
 * @returns Array of all content packs
 *
 * @example
 * const allPacks = await contentPacks.findAll();
 */
export const findAll = async (): Promise<ContentPack[]> => {
  return queryMany<ContentPack>(
    'SELECT * FROM content_packs ORDER BY name'
  );
};

/**
 * Find content packs created by a specific user
 *
 * @param userId - User ID of the creator
 * @returns Array of content packs created by the user
 *
 * @example
 * const myPacks = await contentPacks.findByCreator(userId);
 */
export const findByCreator = async (userId: number): Promise<ContentPack[]> => {
  return queryMany<ContentPack>(
    'SELECT * FROM content_packs WHERE created_by = $1 ORDER BY created_at DESC',
    [userId]
  );
};

// ============================================================================
// Content Pack Mutation Functions
// ============================================================================

/**
 * Create a new content pack
 *
 * @param data - Content pack data
 * @returns Newly created content pack
 *
 * @example
 * const pack = await contentPacks.create({
 *   name: 'Medical Terminology',
 *   description: 'Common medical terms',
 *   created_by: userId
 * });
 */
export const create = async (data: NewContentPack): Promise<ContentPack> => {
  const { name, description, created_by } = data;

  const result = await queryOne<ContentPack>(
    `INSERT INTO content_packs (name, description, created_by, is_active)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [name, description, created_by, true]
  );

  if (!result) {
    throw new Error('Failed to create content pack');
  }

  return result;
};

/**
 * Update a content pack
 *
 * @param id - Content pack ID
 * @param data - Partial content pack data to update
 * @returns Updated content pack
 *
 * @example
 * const updated = await contentPacks.update(1, { name: 'New Name' });
 */
export const update = async (
  id: number,
  data: Partial<Omit<ContentPack, 'id' | 'created_by' | 'created_at' | 'updated_at'>>
): Promise<ContentPack> => {
  const fields: string[] = [];
  const values: any[] = [];
  let paramIndex = 1;

  if (data.name !== undefined) {
    fields.push(`name = $${paramIndex++}`);
    values.push(data.name);
  }

  if (data.description !== undefined) {
    fields.push(`description = $${paramIndex++}`);
    values.push(data.description);
  }

  if (data.is_active !== undefined) {
    fields.push(`is_active = $${paramIndex++}`);
    values.push(data.is_active);
  }

  if (fields.length === 0) {
    throw new Error('No fields to update');
  }

  fields.push(`updated_at = CURRENT_TIMESTAMP`);
  values.push(id);

  const result = await queryOne<ContentPack>(
    `UPDATE content_packs
     SET ${fields.join(', ')}
     WHERE id = $${paramIndex}
     RETURNING *`,
    values
  );

  if (!result) {
    throw new Error(`Content pack with id ${id} not found`);
  }

  return result;
};

/**
 * Delete a content pack (and all related data via CASCADE)
 *
 * @param id - Content pack ID
 *
 * @example
 * await contentPacks.remove(1);
 */
export const remove = async (id: number): Promise<void> => {
  const result = await query(
    'DELETE FROM content_packs WHERE id = $1 RETURNING id',
    [id]
  );

  if (result.rowCount === 0) {
    throw new Error(`Content pack with id ${id} not found`);
  }
};

// ============================================================================
// Subscription Functions
// ============================================================================

/**
 * Subscribe a user to a content pack
 *
 * @param userId - User ID
 * @param packId - Content pack ID
 * @param expiresAt - Optional expiration date (null = lifetime access)
 * @returns Subscription object
 * @throws Error if subscription already exists
 *
 * @example
 * const sub = await contentPacks.subscribe(userId, packId);
 * console.log(`Subscribed until: ${sub.expires_at || 'lifetime'}`);
 */
export const subscribe = async (
  userId: number,
  packId: number,
  expiresAt: Date | null = null
): Promise<UserPackSubscription> => {
  const result = await queryOne<UserPackSubscription>(
    `INSERT INTO user_pack_subscriptions (user_id, content_pack_id, expires_at)
     VALUES ($1, $2, $3)
     RETURNING *`,
    [userId, packId, expiresAt]
  );

  if (!result) {
    throw new Error('Failed to create subscription');
  }

  return result;
};

/**
 * Unsubscribe a user from a content pack
 *
 * @param userId - User ID
 * @param packId - Content pack ID
 *
 * @example
 * await contentPacks.unsubscribe(userId, packId);
 */
export const unsubscribe = async (userId: number, packId: number): Promise<void> => {
  const result = await query(
    'DELETE FROM user_pack_subscriptions WHERE user_id = $1 AND content_pack_id = $2 RETURNING id',
    [userId, packId]
  );

  if (result.rowCount === 0) {
    throw new Error(`Subscription not found for user ${userId} and pack ${packId}`);
  }
};

/**
 * Get all content packs a user has access to
 * (Only returns non-expired subscriptions)
 *
 * @param userId - User ID
 * @returns Array of content packs the user can access
 *
 * @example
 * const myPacks = await contentPacks.getUserPacks(userId);
 * console.log(`You have access to ${myPacks.length} packs`);
 */
export const getUserPacks = async (userId: number): Promise<ContentPack[]> => {
  return queryMany<ContentPack>(
    `SELECT cp.* FROM content_packs cp
     INNER JOIN user_pack_subscriptions ups ON cp.id = ups.content_pack_id
     WHERE ups.user_id = $1
       AND cp.is_active = true
       AND (ups.expires_at IS NULL OR ups.expires_at > CURRENT_TIMESTAMP)
     ORDER BY cp.name`,
    [userId]
  );
};

/**
 * Get user's subscription details for a specific pack
 *
 * @param userId - User ID
 * @param packId - Content pack ID
 * @returns Subscription object or null if not subscribed
 *
 * @example
 * const sub = await contentPacks.getSubscription(userId, packId);
 * if (sub && sub.expires_at) {
 *   console.log(`Expires on: ${sub.expires_at}`);
 * }
 */
export const getSubscription = async (
  userId: number,
  packId: number
): Promise<UserPackSubscription | null> => {
  return queryOne<UserPackSubscription>(
    `SELECT * FROM user_pack_subscriptions
     WHERE user_id = $1 AND content_pack_id = $2`,
    [userId, packId]
  );
};

/**
 * Check if a user has access to a specific content pack
 * (Checks for active subscription that hasn't expired)
 *
 * @param userId - User ID
 * @param packId - Content pack ID
 * @returns true if user has access, false otherwise
 *
 * @example
 * const canAccess = await contentPacks.hasAccess(userId, packId);
 * if (canAccess) {
 *   // Show quiz questions
 * } else {
 *   // Show paywall
 * }
 */
export const hasAccess = async (userId: number, packId: number): Promise<boolean> => {
  const result = await queryOne<{ has_access: boolean }>(
    `SELECT EXISTS (
       SELECT 1 FROM user_pack_subscriptions ups
       INNER JOIN content_packs cp ON ups.content_pack_id = cp.id
       WHERE ups.user_id = $1
         AND ups.content_pack_id = $2
         AND cp.is_active = true
         AND (ups.expires_at IS NULL OR ups.expires_at > CURRENT_TIMESTAMP)
     ) as has_access`,
    [userId, packId]
  );

  return result?.has_access || false;
};

/**
 * Get all users subscribed to a content pack
 *
 * @param packId - Content pack ID
 * @returns Array of user IDs subscribed to the pack
 *
 * @example
 * const subscribers = await contentPacks.getSubscribers(packId);
 * console.log(`${subscribers.length} users subscribed`);
 */
export const getSubscribers = async (packId: number): Promise<number[]> => {
  const result = await queryMany<{ user_id: number }>(
    `SELECT DISTINCT user_id FROM user_pack_subscriptions
     WHERE content_pack_id = $1
       AND (expires_at IS NULL OR expires_at > CURRENT_TIMESTAMP)`,
    [packId]
  );

  return result.map(row => row.user_id);
};

/**
 * Count total subscriptions for a content pack
 *
 * @param packId - Content pack ID
 * @returns Number of active subscriptions
 *
 * @example
 * const count = await contentPacks.countSubscriptions(packId);
 */
export const countSubscriptions = async (packId: number): Promise<number> => {
  const result = await queryOne<{ count: string }>(
    `SELECT COUNT(*) as count FROM user_pack_subscriptions
     WHERE content_pack_id = $1
       AND (expires_at IS NULL OR expires_at > CURRENT_TIMESTAMP)`,
    [packId]
  );

  return result ? parseInt(result.count, 10) : 0;
};

/**
 * Extend a subscription's expiration date
 *
 * @param userId - User ID
 * @param packId - Content pack ID
 * @param newExpiresAt - New expiration date
 * @returns Updated subscription
 *
 * @example
 * const extendedTo = new Date('2025-12-31');
 * const sub = await contentPacks.extendSubscription(userId, packId, extendedTo);
 */
export const extendSubscription = async (
  userId: number,
  packId: number,
  newExpiresAt: Date | null
): Promise<UserPackSubscription> => {
  const result = await queryOne<UserPackSubscription>(
    `UPDATE user_pack_subscriptions
     SET expires_at = $3
     WHERE user_id = $1 AND content_pack_id = $2
     RETURNING *`,
    [userId, packId, newExpiresAt]
  );

  if (!result) {
    throw new Error(`Subscription not found for user ${userId} and pack ${packId}`);
  }

  return result;
};
