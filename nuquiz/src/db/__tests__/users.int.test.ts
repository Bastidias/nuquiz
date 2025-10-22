/**
 * Users DAL - Integration Tests (NO MOCKS)
 *
 * These tests run against a REAL PostgreSQL database (test instance on port 5433).
 * All operations are verified by querying the database directly.
 *
 * Philosophy: NO MOCKS. Test the real thing.
 */

import { query } from '../connection.js';
import { testLifecycle } from './helpers/cleanup.js';
import * as users from '../users.js';
import type { User } from '../types.js';

describe('Users DAL - Integration Tests (NO MOCKS)', () => {
  // Clean database before all tests, after each test, and after all tests
  beforeAll(testLifecycle.beforeAll);
  afterEach(testLifecycle.afterEach);
  afterAll(testLifecycle.afterAll);

  // ============================================================================
  // Create Operations
  // ============================================================================

  describe('Create User', () => {
    it('should create a user with email and username', async () => {
      const newUser = await users.create({
        email: 'test@example.com',
        username: 'testuser',
      });

      // Assertions on returned object
      expect(newUser.id).toBeDefined();
      expect(newUser.email).toBe('test@example.com');
      expect(newUser.username).toBe('testuser');
      expect(newUser.created_at).toBeInstanceOf(Date);
      expect(newUser.updated_at).toBeInstanceOf(Date);

      // PROOF: Verify data exists in REAL database
      const dbResult = await query<User>(
        'SELECT * FROM users WHERE id = $1',
        [newUser.id]
      );
      expect(dbResult.rows).toHaveLength(1);
      expect(dbResult.rows[0].email).toBe('test@example.com');
      expect(dbResult.rows[0].username).toBe('testuser');

      console.log('✓ Created user in REAL database:', {
        id: newUser.id,
        email: newUser.email,
        username: newUser.username,
      });
    });

    it('should create a user with only email (username null)', async () => {
      const newUser = await users.create({
        email: 'emailonly@example.com',
      });

      expect(newUser.id).toBeDefined();
      expect(newUser.email).toBe('emailonly@example.com');
      expect(newUser.username).toBeNull();

      // PROOF: Verify in database
      const dbResult = await query<User>(
        'SELECT * FROM users WHERE id = $1',
        [newUser.id]
      );
      expect(dbResult.rows[0].username).toBeNull();
    });

    it('should REJECT duplicate email (database constraint)', async () => {
      // Create first user
      await users.create({
        email: 'duplicate@example.com',
        username: 'user1',
      });

      // Attempt to create second user with same email
      await expect(
        users.create({
          email: 'duplicate@example.com',
          username: 'user2',
        })
      ).rejects.toThrow();

      // PROOF: Verify only one user exists in database
      const dbResult = await query<User>(
        'SELECT * FROM users WHERE email = $1',
        ['duplicate@example.com']
      );
      expect(dbResult.rows).toHaveLength(1);
      expect(dbResult.rows[0].username).toBe('user1');
    });

    it('should REJECT duplicate username (database constraint)', async () => {
      // Create first user
      await users.create({
        email: 'user1@example.com',
        username: 'duplicateusername',
      });

      // Attempt to create second user with same username
      await expect(
        users.create({
          email: 'user2@example.com',
          username: 'duplicateusername',
        })
      ).rejects.toThrow();

      // PROOF: Verify only one user with that username exists
      const dbResult = await query<User>(
        'SELECT * FROM users WHERE username = $1',
        ['duplicateusername']
      );
      expect(dbResult.rows).toHaveLength(1);
      expect(dbResult.rows[0].email).toBe('user1@example.com');
    });

    it('should allow multiple users with null username', async () => {
      // NULL usernames should be allowed for multiple users
      const user1 = await users.create({
        email: 'user1@example.com',
      });

      const user2 = await users.create({
        email: 'user2@example.com',
      });

      expect(user1.username).toBeNull();
      expect(user2.username).toBeNull();
      expect(user1.id).not.toBe(user2.id);

      // PROOF: Verify both exist in database
      const dbResult = await query<User>(
        'SELECT * FROM users WHERE username IS NULL ORDER BY id'
      );
      expect(dbResult.rows.length).toBeGreaterThanOrEqual(2);
    });
  });

  // ============================================================================
  // Read Operations
  // ============================================================================

  describe('Find User', () => {
    let testUser: User;

    beforeEach(async () => {
      // Create a test user for read operations
      testUser = await users.create({
        email: 'findme@example.com',
        username: 'findmeuser',
      });
    });

    it('should find user by ID', async () => {
      const found = await users.findById(testUser.id);

      expect(found).not.toBeNull();
      expect(found!.id).toBe(testUser.id);
      expect(found!.email).toBe('findme@example.com');
      expect(found!.username).toBe('findmeuser');
    });

    it('should return null for non-existent user ID', async () => {
      const found = await users.findById(999999);

      expect(found).toBeNull();
    });

    it('should find user by email (case-insensitive)', async () => {
      // Test various case combinations
      const found1 = await users.findByEmail('findme@example.com');
      const found2 = await users.findByEmail('FINDME@EXAMPLE.COM');
      const found3 = await users.findByEmail('FindMe@Example.Com');

      expect(found1).not.toBeNull();
      expect(found2).not.toBeNull();
      expect(found3).not.toBeNull();
      expect(found1!.id).toBe(testUser.id);
      expect(found2!.id).toBe(testUser.id);
      expect(found3!.id).toBe(testUser.id);
    });

    it('should return null for non-existent email', async () => {
      const found = await users.findByEmail('doesnotexist@example.com');

      expect(found).toBeNull();
    });

    it('should find user by username (case-insensitive)', async () => {
      const found1 = await users.findByUsername('findmeuser');
      const found2 = await users.findByUsername('FINDMEUSER');
      const found3 = await users.findByUsername('FindMeUser');

      expect(found1).not.toBeNull();
      expect(found2).not.toBeNull();
      expect(found3).not.toBeNull();
      expect(found1!.id).toBe(testUser.id);
      expect(found2!.id).toBe(testUser.id);
      expect(found3!.id).toBe(testUser.id);
    });

    it('should return null for non-existent username', async () => {
      const found = await users.findByUsername('doesnotexist');

      expect(found).toBeNull();
    });
  });

  // ============================================================================
  // Update Operations
  // ============================================================================

  describe('Update User', () => {
    let testUser: User;

    beforeEach(async () => {
      testUser = await users.create({
        email: 'original@example.com',
        username: 'originaluser',
      });
    });

    it('should update email', async () => {
      const updated = await users.update(testUser.id, {
        email: 'newemail@example.com',
      });

      expect(updated.id).toBe(testUser.id);
      expect(updated.email).toBe('newemail@example.com');
      expect(updated.username).toBe('originaluser'); // Unchanged

      // PROOF: Verify in database
      const dbResult = await query<User>(
        'SELECT * FROM users WHERE id = $1',
        [testUser.id]
      );
      expect(dbResult.rows[0].email).toBe('newemail@example.com');
    });

    it('should update username', async () => {
      const updated = await users.update(testUser.id, {
        username: 'newusername',
      });

      expect(updated.id).toBe(testUser.id);
      expect(updated.email).toBe('original@example.com'); // Unchanged
      expect(updated.username).toBe('newusername');

      // PROOF: Verify in database
      const dbResult = await query<User>(
        'SELECT * FROM users WHERE id = $1',
        [testUser.id]
      );
      expect(dbResult.rows[0].username).toBe('newusername');
    });

    it('should update both email and username', async () => {
      const updated = await users.update(testUser.id, {
        email: 'both@example.com',
        username: 'bothupdated',
      });

      expect(updated.email).toBe('both@example.com');
      expect(updated.username).toBe('bothupdated');

      // PROOF: Verify in database
      const dbResult = await query<User>(
        'SELECT * FROM users WHERE id = $1',
        [testUser.id]
      );
      expect(dbResult.rows[0].email).toBe('both@example.com');
      expect(dbResult.rows[0].username).toBe('bothupdated');
    });

    it('should update updated_at timestamp', async () => {
      const originalUpdatedAt = testUser.updated_at;

      // Wait a tiny bit to ensure timestamp changes
      await new Promise((resolve) => setTimeout(resolve, 10));

      const updated = await users.update(testUser.id, {
        username: 'timestamptest',
      });

      expect(updated.updated_at.getTime()).toBeGreaterThan(
        originalUpdatedAt.getTime()
      );

      // PROOF: Verify timestamp changed in database
      const dbResult = await query<User>(
        'SELECT updated_at FROM users WHERE id = $1',
        [testUser.id]
      );
      expect(new Date(dbResult.rows[0].updated_at).getTime()).toBeGreaterThan(
        originalUpdatedAt.getTime()
      );
    });

    it('should REJECT update with duplicate email', async () => {
      // Create another user
      await users.create({
        email: 'taken@example.com',
        username: 'takenuser',
      });

      // Try to update testUser to use the taken email
      await expect(
        users.update(testUser.id, {
          email: 'taken@example.com',
        })
      ).rejects.toThrow();

      // PROOF: Verify original email unchanged in database
      const dbResult = await query<User>(
        'SELECT email FROM users WHERE id = $1',
        [testUser.id]
      );
      expect(dbResult.rows[0].email).toBe('original@example.com');
    });

    it('should REJECT update for non-existent user', async () => {
      await expect(
        users.update(999999, {
          email: 'new@example.com',
        })
      ).rejects.toThrow(/not found/);
    });

    it('should REJECT update with no fields', async () => {
      await expect(users.update(testUser.id, {})).rejects.toThrow(
        /No fields to update/
      );
    });
  });

  // ============================================================================
  // Delete Operations
  // ============================================================================

  describe('Delete User', () => {
    it('should delete a user', async () => {
      const user = await users.create({
        email: 'deleteme@example.com',
        username: 'deletemeuser',
      });

      await users.remove(user.id);

      // PROOF: Verify user no longer exists in database
      const dbResult = await query<User>(
        'SELECT * FROM users WHERE id = $1',
        [user.id]
      );
      expect(dbResult.rows).toHaveLength(0);

      // Also verify with DAL function
      const found = await users.findById(user.id);
      expect(found).toBeNull();
    });

    it('should REJECT delete for non-existent user', async () => {
      await expect(users.remove(999999)).rejects.toThrow(/not found/);
    });
  });

  // ============================================================================
  // Aggregate/Utility Functions
  // ============================================================================

  describe('Utility Functions', () => {
    beforeEach(async () => {
      // Create a few test users
      await users.create({ email: 'user1@example.com', username: 'user1' });
      await users.create({ email: 'user2@example.com', username: 'user2' });
      await users.create({ email: 'user3@example.com' }); // No username
    });

    it('should count total users', async () => {
      const total = await users.count();

      expect(total).toBe(3);

      // PROOF: Verify count in database
      const dbResult = await query<{ count: string }>(
        'SELECT COUNT(*) as count FROM users'
      );
      expect(parseInt(dbResult.rows[0].count, 10)).toBe(3);
    });

    it('should check if email exists', async () => {
      const exists1 = await users.emailExists('user1@example.com');
      const exists2 = await users.emailExists('USER1@EXAMPLE.COM'); // Case insensitive
      const exists3 = await users.emailExists('nonexistent@example.com');

      expect(exists1).toBe(true);
      expect(exists2).toBe(true);
      expect(exists3).toBe(false);
    });

    it('should check if username exists', async () => {
      const exists1 = await users.usernameExists('user1');
      const exists2 = await users.usernameExists('USER1'); // Case insensitive
      const exists3 = await users.usernameExists('nonexistent');

      expect(exists1).toBe(true);
      expect(exists2).toBe(true);
      expect(exists3).toBe(false);
    });
  });

  // ============================================================================
  // Edge Cases
  // ============================================================================

  describe('Edge Cases', () => {
    it('should handle special characters in email', async () => {
      const user = await users.create({
        email: 'test+tag@example.com',
        username: 'specialemail',
      });

      expect(user.email).toBe('test+tag@example.com');

      const found = await users.findByEmail('test+tag@example.com');
      expect(found).not.toBeNull();
      expect(found!.id).toBe(user.id);
    });

    it('should handle special characters in username', async () => {
      const user = await users.create({
        email: 'special@example.com',
        username: 'user_name-123',
      });

      expect(user.username).toBe('user_name-123');

      const found = await users.findByUsername('user_name-123');
      expect(found).not.toBeNull();
      expect(found!.id).toBe(user.id);
    });

    it('should handle very long email addresses', async () => {
      const longEmail =
        'averylongemailaddressthatshouldstillwork@anextremelylong.domain.name.com';
      const user = await users.create({
        email: longEmail,
      });

      expect(user.email).toBe(longEmail);
    });
  });
});
