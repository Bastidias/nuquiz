/**
 * Transaction Helpers for Testing
 *
 * Provides transaction-based test isolation without manual cleanup.
 * Tests run inside transactions that automatically rollback.
 *
 * Benefits:
 * - ✅ No manual cleanup needed
 * - ✅ Complete isolation
 * - ✅ Fast (rollback is instant)
 * - ✅ Can run tests in parallel
 */

import { getPool } from '../../connection';
import type { PoolClient } from 'pg';

/**
 * Run test function inside a transaction that automatically rolls back
 *
 * All database operations inside the callback happen within a transaction.
 * The transaction is automatically rolled back after the test completes,
 * ensuring complete isolation with no manual cleanup.
 *
 * @param testFn - Async test function to run in transaction
 * @returns Promise resolving to test function result
 *
 * @example
 * it('given valid email, create() persists user', async () => {
 *   await withTransaction(async () => {
 *     const user = await users.create({ email: 'test@example.com' });
 *     const found = await users.findByEmail('test@example.com');
 *     assert.equal(found?.id, user.id);
 *     // ✅ No cleanup needed - transaction rolls back automatically
 *   });
 * });
 */
export const withTransaction = async <T>(
  testFn: () => Promise<T>
): Promise<T> => {
  const client = await getPool().connect();

  try {
    await client.query('BEGIN');

    const result = await testFn();

    // Always rollback - even on success
    await client.query('ROLLBACK');

    return result;
  } catch (error) {
    // Rollback on error too
    try {
      await client.query('ROLLBACK');
    } catch (rollbackError) {
      // Ignore rollback errors
    }
    throw error;
  } finally {
    client.release();
  }
};

/**
 * Get a database client with an active transaction
 *
 * Use this when you need direct access to the client (advanced use case).
 * Don't forget to rollback and release!
 *
 * @returns Promise resolving to client with active transaction
 *
 * @example
 * it('given...', async () => {
 *   const client = await getTransactionClient();
 *   try {
 *     // Use client...
 *     await client.query('INSERT INTO...');
 *   } finally {
 *     await client.query('ROLLBACK');
 *     client.release();
 *   }
 * });
 */
export const getTransactionClient = async (): Promise<PoolClient> => {
  const client = await getPool().connect();
  await client.query('BEGIN');
  return client;
};

/**
 * Create isolated test fixture with automatic cleanup
 *
 * Combines fixture creation with transaction isolation.
 * The fixture is created inside a transaction that rolls back after the test.
 *
 * @param createFixture - Function that creates test data
 * @param testFn - Test function that receives the fixture
 * @returns Promise resolving to test function result
 *
 * @example
 * it('given valid subscription, hasAccess() returns true', async () => {
 *   await withFixture(
 *     async () => {
 *       const user = await users.create({ email: generateEmail() });
 *       const pack = await contentPacks.create({ name: 'Test', created_by: user.id });
 *       await contentPacks.subscribe(user.id, pack.id);
 *       return { user, pack };
 *     },
 *     async ({ user, pack }) => {
 *       const result = await contentPacks.hasAccess(user.id, pack.id);
 *       assert.equal(result, true);
 *     }
 *   );
 * });
 */
export const withFixture = async <F, T>(
  createFixture: () => Promise<F>,
  testFn: (fixture: F) => Promise<T>
): Promise<T> => {
  return withTransaction(async () => {
    const fixture = await createFixture();
    return testFn(fixture);
  });
};
