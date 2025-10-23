/**
 * Knowledge DAL Integration Tests
 *
 * NO MOCKS - These tests run against REAL PostgreSQL test database
 * Testing hierarchy validation, CRUD operations, and recursive queries
 */

import { describe, it, expect, beforeAll, afterEach, afterAll } from '@jest/globals';
import * as knowledge from '../knowledge';
import { testLifecycle, buildContentPack, buildUser, generateEmail, generateUsername } from './helpers/index';
import { query } from '../connection';

describe('Knowledge DAL - Integration Tests (NO MOCKS)', () => {
  let contentPackId: number;
  let userId: number;

  beforeAll(async () => {
    await testLifecycle.beforeAll();

    // Create a user and content pack for testing (using unique generators to avoid conflicts)
    const user = await query(
      'INSERT INTO users (email, username) VALUES ($1, $2) RETURNING *',
      [generateEmail('knowledge-test'), generateUsername('knowledge-test')]
    );
    userId = user.rows[0].id;

    const pack = buildContentPack({ created_by: userId });
    const packResult = await query(
      'INSERT INTO content_packs (name, description, created_by) VALUES ($1, $2, $3) RETURNING *',
      [pack.name, pack.description, pack.created_by]
    );
    contentPackId = packResult.rows[0].id;
  });

  afterEach(async () => {
    // Clean up ONLY knowledge nodes after each test
    // Keep user and content_pack for the entire test suite
    await query('DELETE FROM knowledge');
  });

  afterAll(async () => {
    // Clean up everything at the end
    await testLifecycle.afterAll();
  });

  describe('Hierarchy Validation (ENFORCED BY DATABASE)', () => {
    it('should create a topic at root level', async () => {
      const topic = await knowledge.create({
        name: 'cardiology',
        label: 'Cardiology',
        type: 'topic',
        content_pack_id: contentPackId,
      });

      expect(topic.id).toBeDefined();
      expect(topic.type).toBe('topic');
      expect(topic.parent_id).toBeNull();
      expect(topic.name).toBe('cardiology');

      // PROOF: Verify data exists in REAL database
      const dbResult = await query('SELECT * FROM knowledge WHERE id = $1', [topic.id]);
      expect(dbResult.rows).toHaveLength(1);
      expect(dbResult.rows[0].name).toBe('cardiology');
    });

    it('should create nested topics', async () => {
      const parentTopic = await knowledge.create({
        name: 'medicine',
        label: 'Medicine',
        type: 'topic',
        content_pack_id: contentPackId,
      });

      const childTopic = await knowledge.create({
        name: 'cardiology',
        label: 'Cardiology',
        type: 'topic',
        content_pack_id: contentPackId,
        parent_id: parentTopic.id,
      });

      expect(childTopic.parent_id).toBe(parentTopic.id);

      // PROOF: Verify relationship in REAL database
      const children = await query('SELECT * FROM knowledge WHERE parent_id = $1', [
        parentTopic.id,
      ]);
      expect(children.rows).toHaveLength(1);
      expect(children.rows[0].name).toBe('cardiology');
    });

    it('should create category under topic (valid hierarchy)', async () => {
      const topic = await knowledge.create({
        name: 'heart_failure',
        label: 'Heart Failure',
        type: 'topic',
        content_pack_id: contentPackId,
      });

      const category = await knowledge.create({
        name: 'left_sided',
        label: 'Left-sided Heart Failure',
        type: 'category',
        content_pack_id: contentPackId,
        parent_id: topic.id,
      });

      expect(category.parent_id).toBe(topic.id);
      expect(category.type).toBe('category');

      // PROOF: Verify in database
      const dbCategory = await query('SELECT * FROM knowledge WHERE id = $1', [category.id]);
      expect(dbCategory.rows[0].type).toBe('category');
      expect(dbCategory.rows[0].parent_id).toBe(topic.id);
    });

    it('should REJECT category without topic parent', async () => {
      await expect(
        knowledge.create({
          name: 'orphan_category',
          label: 'Orphan Category',
          type: 'category',
          content_pack_id: contentPackId,
        })
      ).rejects.toThrow(/Cannot add category as child of root/);

      // PROOF: Verify nothing was inserted into database
      const count = await query('SELECT COUNT(*) FROM knowledge WHERE name = $1', [
        'orphan_category',
      ]);
      expect(count.rows[0].count).toBe('0');
    });

    it('should create full hierarchy: topic → category → attribute → fact', async () => {
      const topic = await knowledge.create({
        name: 'chf',
        label: 'Congestive Heart Failure',
        type: 'topic',
        content_pack_id: contentPackId,
      });

      const category = await knowledge.create({
        name: 'left_sided',
        label: 'Left-sided',
        type: 'category',
        content_pack_id: contentPackId,
        parent_id: topic.id,
      });

      const attribute = await knowledge.create({
        name: 'symptoms',
        label: 'Symptoms',
        type: 'attribute',
        content_pack_id: contentPackId,
        parent_id: category.id,
      });

      const fact = await knowledge.create({
        name: 'pulmonary_edema',
        label: 'Pulmonary edema',
        type: 'fact',
        content_pack_id: contentPackId,
        parent_id: attribute.id,
      });

      // PROOF: Verify entire hierarchy in database
      const hierarchy = await query(
        `WITH RECURSIVE tree AS (
          SELECT * FROM knowledge WHERE id = $1
          UNION ALL
          SELECT k.* FROM knowledge k
          INNER JOIN tree t ON k.parent_id = t.id
        )
        SELECT * FROM tree ORDER BY id`,
        [topic.id]
      );

      expect(hierarchy.rows).toHaveLength(4);
      expect(hierarchy.rows.map(r => r.type)).toEqual([
        'topic',
        'category',
        'attribute',
        'fact',
      ]);
    });

    it('should REJECT attribute under topic (invalid hierarchy)', async () => {
      const topic = await knowledge.create({
        name: 'cardiology',
        label: 'Cardiology',
        type: 'topic',
        content_pack_id: contentPackId,
      });

      await expect(
        knowledge.create({
          name: 'symptoms',
          label: 'Symptoms',
          type: 'attribute',
          content_pack_id: contentPackId,
          parent_id: topic.id,
        })
      ).rejects.toThrow(/Cannot add attribute as child of topic/);
    });
  });

  describe('Query Functions (REAL DATABASE QUERIES)', () => {
    it('should find knowledge by ID', async () => {
      const created = await knowledge.create({
        name: 'test_topic',
        label: 'Test Topic',
        type: 'topic',
        content_pack_id: contentPackId,
      });

      const found = await knowledge.findById(created.id);

      expect(found).not.toBeNull();
      expect(found?.id).toBe(created.id);
      expect(found?.name).toBe('test_topic');
    });

    it('should find all knowledge of a specific type', async () => {
      await knowledge.create({
        name: 'topic1',
        label: 'Topic 1',
        type: 'topic',
        content_pack_id: contentPackId,
      });

      await knowledge.create({
        name: 'topic2',
        label: 'Topic 2',
        type: 'topic',
        content_pack_id: contentPackId,
      });

      const topics = await knowledge.findByType('topic');

      expect(topics.length).toBeGreaterThanOrEqual(2);
      expect(topics.every(t => t.type === 'topic')).toBe(true);

      // PROOF: Verify count in database
      const dbCount = await query("SELECT COUNT(*) FROM knowledge WHERE type = 'topic'");
      expect(parseInt(dbCount.rows[0].count)).toBe(topics.length);
    });

    it('should find all children of a parent node', async () => {
      const parent = await knowledge.create({
        name: 'parent_topic',
        label: 'Parent Topic',
        type: 'topic',
        content_pack_id: contentPackId,
      });

      await knowledge.create({
        name: 'child1',
        label: 'Child 1',
        type: 'topic',
        content_pack_id: contentPackId,
        parent_id: parent.id,
      });

      await knowledge.create({
        name: 'child2',
        label: 'Child 2',
        type: 'category',
        content_pack_id: contentPackId,
        parent_id: parent.id,
      });

      const children = await knowledge.findChildren(parent.id);

      expect(children).toHaveLength(2);
      expect(children.every(c => c.parent_id === parent.id)).toBe(true);
    });

    it('should find facts by category + attribute path (QUIZ GENERATION)', async () => {
      // Create full hierarchy
      const topic = await knowledge.create({
        name: 'chf',
        label: 'CHF',
        type: 'topic',
        content_pack_id: contentPackId,
      });

      const category = await knowledge.create({
        name: 'left_sided',
        label: 'Left-sided',
        type: 'category',
        content_pack_id: contentPackId,
        parent_id: topic.id,
      });

      const attribute = await knowledge.create({
        name: 'symptoms',
        label: 'Symptoms',
        type: 'attribute',
        content_pack_id: contentPackId,
        parent_id: category.id,
      });

      const fact1 = await knowledge.create({
        name: 'pulmonary_edema',
        label: 'Pulmonary edema',
        type: 'fact',
        content_pack_id: contentPackId,
        parent_id: attribute.id,
      });

      const fact2 = await knowledge.create({
        name: 'dyspnea',
        label: 'Dyspnea',
        type: 'fact',
        content_pack_id: contentPackId,
        parent_id: attribute.id,
      });

      // Query facts using category + attribute (THIS IS HOW QUIZ QUESTIONS ARE GENERATED)
      const facts = await knowledge.findFactsForCategoryAttribute(category.id, attribute.id);

      expect(facts).toHaveLength(2);
      expect(facts.map(f => f.name).sort()).toEqual(['dyspnea', 'pulmonary_edema']);

      // PROOF: This is the data that would be used for "Select all symptoms of left-sided HF"
      console.log('Quiz Question Data:', {
        category: category.label,
        attribute: attribute.label,
        correctAnswers: facts.map(f => f.label),
      });
    });

    it('should build path notation for quiz questions', async () => {
      const topic = await knowledge.create({
        name: 'chf',
        label: 'CHF',
        type: 'topic',
        content_pack_id: contentPackId,
      });

      const category = await knowledge.create({
        name: 'left_sided',
        label: 'Left-sided',
        type: 'category',
        content_pack_id: contentPackId,
        parent_id: topic.id,
      });

      const attribute = await knowledge.create({
        name: 'symptoms',
        label: 'Symptoms',
        type: 'attribute',
        content_pack_id: contentPackId,
        parent_id: category.id,
      });

      const path = await knowledge.buildPath(attribute.id);

      expect(path).toBe('left_sided | symptoms');
    });

    it('should get entire subtree recursively', async () => {
      const topic = await knowledge.create({
        name: 'root',
        label: 'Root',
        type: 'topic',
        content_pack_id: contentPackId,
      });

      const category = await knowledge.create({
        name: 'cat',
        label: 'Category',
        type: 'category',
        content_pack_id: contentPackId,
        parent_id: topic.id,
      });

      const attribute = await knowledge.create({
        name: 'attr',
        label: 'Attribute',
        type: 'attribute',
        content_pack_id: contentPackId,
        parent_id: category.id,
      });

      await knowledge.create({
        name: 'fact',
        label: 'Fact',
        type: 'fact',
        content_pack_id: contentPackId,
        parent_id: attribute.id,
      });

      const subtree = await knowledge.getSubtree(topic.id);

      expect(subtree).toHaveLength(4);
      expect(subtree[0].id).toBe(topic.id);
    });
  });

  describe('Mutation Functions (REAL DATABASE WRITES)', () => {
    it('should update a knowledge node', async () => {
      const created = await knowledge.create({
        name: 'original',
        label: 'Original Label',
        type: 'topic',
        content_pack_id: contentPackId,
      });

      const updated = await knowledge.update(created.id, {
        label: 'Updated Label',
      });

      expect(updated.label).toBe('Updated Label');
      expect(updated.name).toBe('original');

      // PROOF: Verify in database
      const dbResult = await query('SELECT * FROM knowledge WHERE id = $1', [created.id]);
      expect(dbResult.rows[0].label).toBe('Updated Label');
    });

    it('should delete a knowledge node (CASCADE)', async () => {
      const parent = await knowledge.create({
        name: 'parent',
        label: 'Parent',
        type: 'topic',
        content_pack_id: contentPackId,
      });

      const child = await knowledge.create({
        name: 'child',
        label: 'Child',
        type: 'topic',
        content_pack_id: contentPackId,
        parent_id: parent.id,
      });

      await knowledge.remove(parent.id);

      // PROOF: Both parent and child should be deleted (CASCADE)
      const parentCheck = await knowledge.findById(parent.id);
      const childCheck = await knowledge.findById(child.id);

      expect(parentCheck).toBeNull();
      expect(childCheck).toBeNull();

      // Double-check in database
      const count = await query('SELECT COUNT(*) FROM knowledge WHERE id IN ($1, $2)', [
        parent.id,
        child.id,
      ]);
      expect(count.rows[0].count).toBe('0');
    });

    it('should reorder children', async () => {
      const parent = await knowledge.create({
        name: 'parent',
        label: 'Parent',
        type: 'topic',
        content_pack_id: contentPackId,
      });

      const child1 = await knowledge.create({
        name: 'child1',
        label: 'Child 1',
        type: 'topic',
        content_pack_id: contentPackId,
        parent_id: parent.id,
        order_index: 0,
      });

      const child2 = await knowledge.create({
        name: 'child2',
        label: 'Child 2',
        type: 'topic',
        content_pack_id: contentPackId,
        parent_id: parent.id,
        order_index: 1,
      });

      // Reverse order
      await knowledge.reorderChildren(parent.id, [child2.id, child1.id]);

      // Verify new order in database
      const children = await query(
        'SELECT * FROM knowledge WHERE parent_id = $1 ORDER BY order_index',
        [parent.id]
      );

      expect(children.rows[0].id).toBe(child2.id);
      expect(children.rows[1].id).toBe(child1.id);
    });
  });

  describe('Aggregate Queries (REAL DATABASE ANALYTICS)', () => {
    it('should count knowledge nodes by type', async () => {
      await knowledge.create({
        name: 'topic1',
        label: 'Topic 1',
        type: 'topic',
        content_pack_id: contentPackId,
      });

      await knowledge.create({
        name: 'topic2',
        label: 'Topic 2',
        type: 'topic',
        content_pack_id: contentPackId,
      });

      const counts = await knowledge.countByType(contentPackId);

      expect(counts.topic).toBe(2);
      expect(counts.category).toBe(0);
      expect(counts.attribute).toBe(0);
      expect(counts.fact).toBe(0);

      // PROOF: Verify with direct database query
      const dbCount = await query(
        'SELECT COUNT(*) FROM knowledge WHERE content_pack_id = $1 AND type = $2',
        [contentPackId, 'topic']
      );
      expect(parseInt(dbCount.rows[0].count)).toBe(counts.topic);
    });
  });
});
