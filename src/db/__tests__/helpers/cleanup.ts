/**
 * Test Cleanup Utilities (NO MOCKS - Real Database Cleanup)
 *
 * Utilities for cleaning up test data from the test database.
 * Functional approach - pure functions that operate on real data.
 */

import { query, closeAll } from '../../connection';

/**
 * Truncate all tables in the database (CASCADE to handle foreign keys)
 * WARNING: This deletes ALL data - only use in tests!
 */
export const truncateAllTables = async (): Promise<void> => {
  await query(`
    TRUNCATE TABLE
      analytics_events,
      user_knowledge_progress,
      answer_option_components,
      answer_options,
      question_knowledge_sources,
      questions,
      quiz_sessions,
      knowledge,
      user_pack_subscriptions,
      content_packs,
      users
    RESTART IDENTITY CASCADE
  `);
};

/**
 * Delete all users (cascades to related data)
 */
export const deleteAllUsers = async (): Promise<void> => {
  await query('DELETE FROM users');
};

/**
 * Delete all content packs (cascades to related data)
 */
export const deleteAllContentPacks = async (): Promise<void> => {
  await query('DELETE FROM content_packs');
};

/**
 * Delete all knowledge nodes (cascades to related data)
 */
export const deleteAllKnowledge = async (): Promise<void> => {
  await query('DELETE FROM knowledge');
};

/**
 * Delete all quiz sessions (cascades to related data)
 */
export const deleteAllQuizSessions = async (): Promise<void> => {
  await query('DELETE FROM quiz_sessions');
};

/**
 * Delete all analytics events
 */
export const deleteAllAnalyticsEvents = async (): Promise<void> => {
  await query('DELETE FROM analytics_events');
};

/**
 * Delete a specific user by ID (cascades)
 */
export const deleteUserById = async (id: number): Promise<void> => {
  await query('DELETE FROM users WHERE id = $1', [id]);
};

/**
 * Delete a specific content pack by ID (cascades)
 */
export const deleteContentPackById = async (id: number): Promise<void> => {
  await query('DELETE FROM content_packs WHERE id = $1', [id]);
};

/**
 * Get count of records in a table
 */
export const getTableCount = async (tableName: string): Promise<number> => {
  const result = await query<{ count: string }>(
    `SELECT COUNT(*) as count FROM ${tableName}`
  );
  return parseInt(result.rows[0].count, 10);
};

/**
 * Verify database is empty (useful for test setup)
 */
export const verifyDatabaseEmpty = async (): Promise<boolean> => {
  const tables = [
    'users',
    'content_packs',
    'knowledge',
    'quiz_sessions',
    'analytics_events',
  ];

  for (const table of tables) {
    const count = await getTableCount(table);
    if (count > 0) {
      console.warn(`Warning: Table ${table} has ${count} records`);
      return false;
    }
  }

  return true;
};

/**
 * Close all database connections
 * Should be called in afterAll hooks
 */
export const closeConnections = async (): Promise<void> => {
  await closeAll();
};

/**
 * Standard test lifecycle helpers
 */
export const testLifecycle = {
  /**
   * Setup before all tests in a suite
   */
  beforeAll: async () => {
    // Ensure we're in test environment
    if (process.env.NODE_ENV !== 'test') {
      throw new Error('Test lifecycle can only run in NODE_ENV=test');
    }

    // Clean database before starting
    await truncateAllTables();
  },

  /**
   * Cleanup after each test
   */
  afterEach: async () => {
    await truncateAllTables();
  },

  /**
   * Cleanup after all tests in a suite
   */
  afterAll: async () => {
    await truncateAllTables();
    await closeConnections();
  },
};
