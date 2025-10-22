/**
 * ContentPacks & Subscriptions DAL - Integration Tests (NO MOCKS)
 *
 * These tests run against a REAL PostgreSQL database (test instance on port 5433).
 * All operations are verified by querying the database directly.
 *
 * Philosophy: NO MOCKS. Test the real thing.
 */

import { query } from '../connection.js';
import { testLifecycle } from './helpers/cleanup.js';
import * as users from '../users.js';
import * as contentPacks from '../contentPacks.js';
import type { User, ContentPack, UserPackSubscription } from '../types.js';

describe('ContentPacks & Subscriptions DAL - Integration Tests (NO MOCKS)', () => {
  let testUser1: User;
  let testUser2: User;

  // Clean database before all tests, after each test, and after all tests
  beforeAll(async () => {
    await testLifecycle.beforeAll();

    // Create test users for subscription tests
    testUser1 = await users.create({
      email: 'user1@contentpack.test',
      username: 'packuser1',
    });

    testUser2 = await users.create({
      email: 'user2@contentpack.test',
      username: 'packuser2',
    });
  });

  afterEach(async () => {
    // Clean up ONLY content packs and subscriptions after each test
    // Keep users for the entire test suite
    await query('DELETE FROM user_pack_subscriptions');
    await query('DELETE FROM content_packs');
  });

  afterAll(async () => {
    // Clean up everything at the end
    await testLifecycle.afterAll();
  });

  // ============================================================================
  // Content Pack CRUD Operations
  // ============================================================================

  describe('Content Pack Creation', () => {
    it('should create a content pack', async () => {
      const pack = await contentPacks.create({
        name: 'Medical Terminology',
        description: 'Common medical terms and definitions',
        created_by: testUser1.id,
      });

      expect(pack.id).toBeDefined();
      expect(pack.name).toBe('Medical Terminology');
      expect(pack.description).toBe('Common medical terms and definitions');
      expect(pack.created_by).toBe(testUser1.id);
      expect(pack.is_active).toBe(true); // Default value
      expect(pack.created_at).toBeInstanceOf(Date);

      // PROOF: Verify in database
      const dbResult = await query<ContentPack>(
        'SELECT * FROM content_packs WHERE id = $1',
        [pack.id]
      );
      expect(dbResult.rows).toHaveLength(1);
      expect(dbResult.rows[0].name).toBe('Medical Terminology');
    });

    it('should create an inactive content pack', async () => {
      const pack = await contentPacks.create({
        name: 'Draft Pack',
        description: 'Not yet published',
        created_by: testUser1.id,
        is_active: false,
      });

      expect(pack.is_active).toBe(false);

      // PROOF: Verify in database
      const dbResult = await query<ContentPack>(
        'SELECT is_active FROM content_packs WHERE id = $1',
        [pack.id]
      );
      expect(dbResult.rows[0].is_active).toBe(false);
    });

    it('should REJECT content pack with non-existent creator', async () => {
      await expect(
        contentPacks.create({
          name: 'Invalid Pack',
          description: 'Created by non-existent user',
          created_by: 999999,
        })
      ).rejects.toThrow();
    });
  });

  describe('Content Pack Queries', () => {
    let activePack: ContentPack;
    let inactivePack: ContentPack;

    beforeEach(async () => {
      activePack = await contentPacks.create({
        name: 'Active Pack',
        description: 'This one is active',
        created_by: testUser1.id,
        is_active: true,
      });

      inactivePack = await contentPacks.create({
        name: 'Inactive Pack',
        description: 'This one is inactive',
        created_by: testUser1.id,
        is_active: false,
      });
    });

    it('should find content pack by ID', async () => {
      const found = await contentPacks.findById(activePack.id);

      expect(found).not.toBeNull();
      expect(found!.id).toBe(activePack.id);
      expect(found!.name).toBe('Active Pack');
    });

    it('should return null for non-existent pack ID', async () => {
      const found = await contentPacks.findById(999999);

      expect(found).toBeNull();
    });

    it('should find only active content packs', async () => {
      const active = await contentPacks.findActive();

      expect(active.length).toBeGreaterThan(0);
      expect(active.find(p => p.id === activePack.id)).toBeDefined();
      expect(active.find(p => p.id === inactivePack.id)).toBeUndefined();
    });

    it('should find all content packs (active and inactive)', async () => {
      const all = await contentPacks.findAll();

      expect(all.length).toBeGreaterThanOrEqual(2);
      expect(all.find(p => p.id === activePack.id)).toBeDefined();
      expect(all.find(p => p.id === inactivePack.id)).toBeDefined();
    });

    it('should find packs by creator', async () => {
      const user1Packs = await contentPacks.findByCreator(testUser1.id);
      const user2Packs = await contentPacks.findByCreator(testUser2.id);

      expect(user1Packs.length).toBeGreaterThanOrEqual(2);
      expect(user2Packs.length).toBe(0);
    });
  });

  describe('Content Pack Updates', () => {
    let pack: ContentPack;

    beforeEach(async () => {
      pack = await contentPacks.create({
        name: 'Original Name',
        description: 'Original Description',
        created_by: testUser1.id,
      });
    });

    it('should update pack name', async () => {
      const updated = await contentPacks.update(pack.id, {
        name: 'Updated Name',
      });

      expect(updated.name).toBe('Updated Name');
      expect(updated.description).toBe('Original Description'); // Unchanged

      // PROOF: Verify in database
      const dbResult = await query<ContentPack>(
        'SELECT name FROM content_packs WHERE id = $1',
        [pack.id]
      );
      expect(dbResult.rows[0].name).toBe('Updated Name');
    });

    it('should update pack description', async () => {
      const updated = await contentPacks.update(pack.id, {
        description: 'New Description',
      });

      expect(updated.description).toBe('New Description');
    });

    it('should update is_active status', async () => {
      const updated = await contentPacks.update(pack.id, {
        is_active: false,
      });

      expect(updated.is_active).toBe(false);
    });

    it('should REJECT update for non-existent pack', async () => {
      await expect(
        contentPacks.update(999999, { name: 'New Name' })
      ).rejects.toThrow(/not found/);
    });

    it('should REJECT update with no fields', async () => {
      await expect(contentPacks.update(pack.id, {})).rejects.toThrow(
        /No fields to update/
      );
    });
  });

  describe('Content Pack Deletion', () => {
    it('should delete a content pack', async () => {
      const pack = await contentPacks.create({
        name: 'Delete Me',
        description: 'Will be deleted',
        created_by: testUser1.id,
      });

      await contentPacks.remove(pack.id);

      // PROOF: Verify pack no longer exists
      const found = await contentPacks.findById(pack.id);
      expect(found).toBeNull();
    });

    it('should CASCADE delete subscriptions when pack is deleted', async () => {
      const pack = await contentPacks.create({
        name: 'Pack with Subs',
        description: 'Has subscriptions',
        created_by: testUser1.id,
      });

      // Create subscription
      await contentPacks.subscribe(testUser1.id, pack.id);

      // Verify subscription exists
      const subBefore = await query<UserPackSubscription>(
        'SELECT * FROM user_pack_subscriptions WHERE content_pack_id = $1',
        [pack.id]
      );
      expect(subBefore.rows).toHaveLength(1);

      // Delete pack
      await contentPacks.remove(pack.id);

      // PROOF: Verify subscription was deleted via CASCADE
      const subAfter = await query<UserPackSubscription>(
        'SELECT * FROM user_pack_subscriptions WHERE content_pack_id = $1',
        [pack.id]
      );
      expect(subAfter.rows).toHaveLength(0);
    });

    it('should REJECT delete for non-existent pack', async () => {
      await expect(contentPacks.remove(999999)).rejects.toThrow(/not found/);
    });
  });

  // ============================================================================
  // Subscription Operations
  // ============================================================================

  describe('User Subscriptions', () => {
    let pack: ContentPack;

    beforeEach(async () => {
      pack = await contentPacks.create({
        name: 'Test Pack',
        description: 'For subscription tests',
        created_by: testUser1.id,
      });
    });

    it('should subscribe user to pack', async () => {
      const sub = await contentPacks.subscribe(testUser1.id, pack.id);

      expect(sub.id).toBeDefined();
      expect(sub.user_id).toBe(testUser1.id);
      expect(sub.content_pack_id).toBe(pack.id);
      expect(sub.expires_at).toBeNull(); // Lifetime by default

      // PROOF: Verify in database
      const dbResult = await query<UserPackSubscription>(
        'SELECT * FROM user_pack_subscriptions WHERE id = $1',
        [sub.id]
      );
      expect(dbResult.rows).toHaveLength(1);
      expect(dbResult.rows[0].user_id).toBe(testUser1.id);
    });

    it('should subscribe with expiration date', async () => {
      const expiresAt = new Date('2025-12-31');
      const sub = await contentPacks.subscribe(testUser1.id, pack.id, expiresAt);

      expect(sub.expires_at).toBeInstanceOf(Date);
      expect(sub.expires_at!.toISOString().substring(0, 10)).toBe('2025-12-31');
    });

    it('should REJECT duplicate subscription', async () => {
      await contentPacks.subscribe(testUser1.id, pack.id);

      // Try to subscribe again
      await expect(
        contentPacks.subscribe(testUser1.id, pack.id)
      ).rejects.toThrow();

      // PROOF: Verify only one subscription exists
      const dbResult = await query<UserPackSubscription>(
        'SELECT * FROM user_pack_subscriptions WHERE user_id = $1 AND content_pack_id = $2',
        [testUser1.id, pack.id]
      );
      expect(dbResult.rows).toHaveLength(1);
    });

    it('should unsubscribe user from pack', async () => {
      await contentPacks.subscribe(testUser1.id, pack.id);

      await contentPacks.unsubscribe(testUser1.id, pack.id);

      // PROOF: Verify subscription deleted
      const sub = await contentPacks.getSubscription(testUser1.id, pack.id);
      expect(sub).toBeNull();
    });

    it('should REJECT unsubscribe for non-existent subscription', async () => {
      await expect(
        contentPacks.unsubscribe(testUser1.id, pack.id)
      ).rejects.toThrow(/not found/);
    });
  });

  // ============================================================================
  // Access Control
  // ============================================================================

  describe('Access Control', () => {
    let pack: ContentPack;

    beforeEach(async () => {
      pack = await contentPacks.create({
        name: 'Protected Pack',
        description: 'Requires subscription',
        created_by: testUser1.id,
      });
    });

    it('should check user has access with active subscription', async () => {
      await contentPacks.subscribe(testUser1.id, pack.id);

      const hasAccess = await contentPacks.hasAccess(testUser1.id, pack.id);

      expect(hasAccess).toBe(true);
    });

    it('should check user has NO access without subscription', async () => {
      const hasAccess = await contentPacks.hasAccess(testUser2.id, pack.id);

      expect(hasAccess).toBe(false);
    });

    it('should DENY access for expired subscription', async () => {
      // Create subscription that expired yesterday
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);

      await contentPacks.subscribe(testUser1.id, pack.id, yesterday);

      const hasAccess = await contentPacks.hasAccess(testUser1.id, pack.id);

      expect(hasAccess).toBe(false);
    });

    it('should ALLOW access for future expiration', async () => {
      // Create subscription that expires tomorrow
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);

      await contentPacks.subscribe(testUser1.id, pack.id, tomorrow);

      const hasAccess = await contentPacks.hasAccess(testUser1.id, pack.id);

      expect(hasAccess).toBe(true);
    });

    it('should DENY access for inactive pack', async () => {
      // Subscribe user to pack
      await contentPacks.subscribe(testUser1.id, pack.id);

      // Deactivate the pack
      await contentPacks.update(pack.id, { is_active: false });

      const hasAccess = await contentPacks.hasAccess(testUser1.id, pack.id);

      expect(hasAccess).toBe(false);
    });

    it('should get all user packs (only active with valid subscriptions)', async () => {
      const pack1 = await contentPacks.create({
        name: 'Pack 1',
        description: 'Active pack',
        created_by: testUser1.id,
      });

      const pack2 = await contentPacks.create({
        name: 'Pack 2',
        description: 'Inactive pack',
        created_by: testUser1.id,
        is_active: false,
      });

      const pack3 = await contentPacks.create({
        name: 'Pack 3',
        description: 'Expired subscription',
        created_by: testUser1.id,
      });

      // Subscribe to all three
      await contentPacks.subscribe(testUser1.id, pack1.id); // Lifetime
      await contentPacks.subscribe(testUser1.id, pack2.id); // Lifetime (but pack inactive)

      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      await contentPacks.subscribe(testUser1.id, pack3.id, yesterday); // Expired

      // Get user's packs
      const userPacks = await contentPacks.getUserPacks(testUser1.id);

      // Should only return pack1 (active pack with valid subscription)
      expect(userPacks.length).toBe(1);
      expect(userPacks[0].id).toBe(pack1.id);
    });
  });

  // ============================================================================
  // Subscription Management
  // ============================================================================

  describe('Subscription Management', () => {
    let pack: ContentPack;

    beforeEach(async () => {
      pack = await contentPacks.create({
        name: 'Managed Pack',
        description: 'For management tests',
        created_by: testUser1.id,
      });
    });

    it('should get subscription details', async () => {
      const created = await contentPacks.subscribe(testUser1.id, pack.id);

      const sub = await contentPacks.getSubscription(testUser1.id, pack.id);

      expect(sub).not.toBeNull();
      expect(sub!.id).toBe(created.id);
      expect(sub!.user_id).toBe(testUser1.id);
      expect(sub!.content_pack_id).toBe(pack.id);
    });

    it('should return null for non-existent subscription', async () => {
      const sub = await contentPacks.getSubscription(testUser2.id, pack.id);

      expect(sub).toBeNull();
    });

    it('should extend subscription', async () => {
      const initialExpiry = new Date('2025-06-30');
      await contentPacks.subscribe(testUser1.id, pack.id, initialExpiry);

      const newExpiry = new Date('2025-12-31');
      const extended = await contentPacks.extendSubscription(
        testUser1.id,
        pack.id,
        newExpiry
      );

      expect(extended.expires_at).toBeInstanceOf(Date);
      expect(extended.expires_at!.toISOString().substring(0, 10)).toBe('2025-12-31');

      // PROOF: Verify in database
      const dbResult = await query<UserPackSubscription>(
        'SELECT expires_at FROM user_pack_subscriptions WHERE user_id = $1 AND content_pack_id = $2',
        [testUser1.id, pack.id]
      );
      expect(new Date(dbResult.rows[0].expires_at!).toISOString().substring(0, 10)).toBe('2025-12-31');
    });

    it('should get pack subscribers', async () => {
      await contentPacks.subscribe(testUser1.id, pack.id);
      await contentPacks.subscribe(testUser2.id, pack.id);

      const subscribers = await contentPacks.getSubscribers(pack.id);

      expect(subscribers.length).toBe(2);
      expect(subscribers).toContain(testUser1.id);
      expect(subscribers).toContain(testUser2.id);
    });

    it('should count subscriptions', async () => {
      await contentPacks.subscribe(testUser1.id, pack.id);
      await contentPacks.subscribe(testUser2.id, pack.id);

      const count = await contentPacks.countSubscriptions(pack.id);

      expect(count).toBe(2);
    });

    it('should NOT count expired subscriptions', async () => {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);

      await contentPacks.subscribe(testUser1.id, pack.id, yesterday);

      const count = await contentPacks.countSubscriptions(pack.id);

      expect(count).toBe(0);
    });
  });
});
