import { describe, beforeEach, afterEach, test, expect } from '@jest/globals';
import { query } from '@/db/connection';
import { generateQuestion } from '../question-generator';

describe('Question Generator', () => {
  let testUserId: number;
  let testContentPackId: number;
  let testTopicId: number;
  let leftCategoryId: number;
  let rightCategoryId: number;
  let symptomsAttrId: number;
  let causesAttrId: number;
  let pulmonaryEdemaId: number;
  let dyspneaId: number;
  let peripheralEdemaId: number;
  let hypertensionId: number;

  beforeEach(async () => {
    // Create a test user first (unique email to avoid conflicts)
    const uniqueEmail = `testadmin${Date.now()}@test.com`;
    const userResult = await query(
      `INSERT INTO users (email, password_hash, role)
       VALUES ($1, '$2b$12$QvJLDpolv0SqEravUDu0jelXO6bGAQgi3wVzPDgUqqJtax.yEAelK', 'admin')
       RETURNING id`,
      [uniqueEmail]
    );
    testUserId = userResult.rows[0].id;

    // Create a test content pack
    const packResult = await query(
      `INSERT INTO content_packs (name, description, is_active, created_by)
       VALUES ('Test CHF Pack', 'Test content pack for question generation', true, $1)
       RETURNING id`,
      [testUserId]
    );
    testContentPackId = packResult.rows[0].id;

    // Create test knowledge hierarchy
    // Topic: CHF
    const topicResult = await query(
      `INSERT INTO knowledge (type, name, label, parent_id, content_pack_id)
       VALUES ('topic', 'chf', 'Congestive Heart Failure', NULL, $1)
       RETURNING id`,
      [testContentPackId]
    );
    testTopicId = topicResult.rows[0].id;

    // Categories: Left-sided, Right-sided
    const leftResult = await query(
      `INSERT INTO knowledge (type, name, label, parent_id, content_pack_id)
       VALUES ('category', 'left_sided_chf', 'Left-sided CHF', $1, $2)
       RETURNING id`,
      [testTopicId, testContentPackId]
    );
    leftCategoryId = leftResult.rows[0].id;

    const rightResult = await query(
      `INSERT INTO knowledge (type, name, label, parent_id, content_pack_id)
       VALUES ('category', 'right_sided_chf', 'Right-sided CHF', $1, $2)
       RETURNING id`,
      [testTopicId, testContentPackId]
    );
    rightCategoryId = rightResult.rows[0].id;

    // Attributes: Symptoms, Causes
    const symptomsResult = await query(
      `INSERT INTO knowledge (type, name, label, parent_id, content_pack_id)
       VALUES ('attribute', 'symptoms', 'Symptoms', $1, $2)
       RETURNING id`,
      [leftCategoryId, testContentPackId]
    );
    symptomsAttrId = symptomsResult.rows[0].id;

    const causesResult = await query(
      `INSERT INTO knowledge (type, name, label, parent_id, content_pack_id)
       VALUES ('attribute', 'causes', 'Causes', $1, $2)
       RETURNING id`,
      [leftCategoryId, testContentPackId]
    );
    causesAttrId = causesResult.rows[0].id;

    // Facts under left-sided symptoms
    const pulmonaryResult = await query(
      `INSERT INTO knowledge (type, name, label, parent_id, content_pack_id)
       VALUES ('fact', 'pulmonary_edema', 'Pulmonary edema', $1, $2)
       RETURNING id`,
      [symptomsAttrId, testContentPackId]
    );
    pulmonaryEdemaId = pulmonaryResult.rows[0].id;

    const dyspneaResult = await query(
      `INSERT INTO knowledge (type, name, label, parent_id, content_pack_id)
       VALUES ('fact', 'dyspnea', 'Dyspnea', $1, $2)
       RETURNING id`,
      [symptomsAttrId, testContentPackId]
    );
    dyspneaId = dyspneaResult.rows[0].id;

    // Facts under left-sided causes
    const hypertensionResult = await query(
      `INSERT INTO knowledge (type, name, label, parent_id, content_pack_id)
       VALUES ('fact', 'hypertension', 'Hypertension', $1, $2)
       RETURNING id`,
      [causesAttrId, testContentPackId]
    );
    hypertensionId = hypertensionResult.rows[0].id;

    // Right-sided symptoms
    const rightSymptomsResult = await query(
      `INSERT INTO knowledge (type, name, label, parent_id, content_pack_id)
       VALUES ('attribute', 'symptoms', 'Symptoms', $1, $2)
       RETURNING id`,
      [rightCategoryId, testContentPackId]
    );

    const peripheralResult = await query(
      `INSERT INTO knowledge (type, name, label, parent_id, content_pack_id)
       VALUES ('fact', 'peripheral_edema', 'Peripheral edema', $1, $2)
       RETURNING id`,
      [rightSymptomsResult.rows[0].id, testContentPackId]
    );
    peripheralEdemaId = peripheralResult.rows[0].id;
  });

  afterEach(async () => {
    // Clean up test data in correct order (CASCADE will delete all knowledge nodes)
    await query('DELETE FROM content_packs WHERE id = $1', [testContentPackId]);
    await query('DELETE FROM users WHERE id = $1', [testUserId]);
  });

  describe('Downward Questions (category | attribute → facts)', () => {
    test('generates correct prompt format: "select all | {category} | {attribute}"', async () => {
      const questionData = {
        direction: 'downward' as const,
        category: { id: leftCategoryId, label: 'Left-sided CHF' },
        attribute: { id: symptomsAttrId, label: 'Symptoms' },
        correctFacts: [
          { id: pulmonaryEdemaId, label: 'Pulmonary edema' },
          { id: dyspneaId, label: 'Dyspnea' },
        ],
        distractorPool: [
          { id: peripheralEdemaId, label: 'Peripheral edema' },
          { id: hypertensionId, label: 'Hypertension' },
        ],
        numDistractors: 2,
      };

      const question = generateQuestion(questionData, 12345);

      expect(question.prompt).toBe('select all | Left-sided CHF | Symptoms');
      expect(question.category_id).toBe(leftCategoryId);
      expect(question.attribute_id).toBe(symptomsAttrId);
      expect(question.fact_id).toBeNull();
    });

    test('includes all correct facts in at least one answer option', async () => {
      const questionData = {
        direction: 'downward' as const,
        category: { id: leftCategoryId, label: 'Left-sided CHF' },
        attribute: { id: symptomsAttrId, label: 'Symptoms' },
        correctFacts: [
          { id: pulmonaryEdemaId, label: 'Pulmonary edema' },
          { id: dyspneaId, label: 'Dyspnea' },
        ],
        distractorPool: [
          { id: peripheralEdemaId, label: 'Peripheral edema' },
          { id: hypertensionId, label: 'Hypertension' },
        ],
        numDistractors: 2,
      };

      const question = generateQuestion(questionData, 12345);

      // Collect all fact IDs from answer options
      const allFactIds = new Set<number>();
      question.answerOptions.forEach((option) => {
        option.components.forEach((factId) => allFactIds.add(factId));
      });

      expect(allFactIds).toContain(pulmonaryEdemaId);
      expect(allFactIds).toContain(dyspneaId);
    });

    test('has no duplicate facts within a single answer option', async () => {
      const questionData = {
        direction: 'downward' as const,
        category: { id: leftCategoryId, label: 'Left-sided CHF' },
        attribute: { id: symptomsAttrId, label: 'Symptoms' },
        correctFacts: [
          { id: pulmonaryEdemaId, label: 'Pulmonary edema' },
          { id: dyspneaId, label: 'Dyspnea' },
        ],
        distractorPool: [
          { id: peripheralEdemaId, label: 'Peripheral edema' },
          { id: hypertensionId, label: 'Hypertension' },
        ],
        numDistractors: 2,
      };

      const question = generateQuestion(questionData, 12345);

      question.answerOptions.forEach((option) => {
        const uniqueFacts = new Set(option.components);
        expect(uniqueFacts.size).toBe(option.components.length);
      });
    });

    test('pulls distractors from expected pool only', async () => {
      const questionData = {
        direction: 'downward' as const,
        category: { id: leftCategoryId, label: 'Left-sided CHF' },
        attribute: { id: symptomsAttrId, label: 'Symptoms' },
        correctFacts: [
          { id: pulmonaryEdemaId, label: 'Pulmonary edema' },
          { id: dyspneaId, label: 'Dyspnea' },
        ],
        distractorPool: [
          { id: peripheralEdemaId, label: 'Peripheral edema' },
          { id: hypertensionId, label: 'Hypertension' },
        ],
        numDistractors: 2,
      };

      const question = generateQuestion(questionData, 12345);

      const allFactIds = new Set<number>();
      question.answerOptions.forEach((option) => {
        option.components.forEach((factId) => allFactIds.add(factId));
      });

      // All facts should be from correct facts or distractor pool
      const allowedIds = new Set([
        pulmonaryEdemaId,
        dyspneaId,
        peripheralEdemaId,
        hypertensionId,
      ]);

      allFactIds.forEach((factId) => {
        expect(allowedIds).toContain(factId);
      });
    });

    test('marks options with only correct facts as is_correct: true', async () => {
      const questionData = {
        direction: 'downward' as const,
        category: { id: leftCategoryId, label: 'Left-sided CHF' },
        attribute: { id: symptomsAttrId, label: 'Symptoms' },
        correctFacts: [
          { id: pulmonaryEdemaId, label: 'Pulmonary edema' },
          { id: dyspneaId, label: 'Dyspnea' },
        ],
        distractorPool: [
          { id: peripheralEdemaId, label: 'Peripheral edema' },
          { id: hypertensionId, label: 'Hypertension' },
        ],
        numDistractors: 2,
      };

      const question = generateQuestion(questionData, 12345);

      const correctFactIds = new Set([pulmonaryEdemaId, dyspneaId]);

      question.answerOptions.forEach((option) => {
        const allCorrect = option.components.every((factId) =>
          correctFactIds.has(factId)
        );
        expect(option.is_correct).toBe(allCorrect);
      });
    });

    test('is deterministic - same seed produces same question', async () => {
      const questionData = {
        direction: 'downward' as const,
        category: { id: leftCategoryId, label: 'Left-sided CHF' },
        attribute: { id: symptomsAttrId, label: 'Symptoms' },
        correctFacts: [
          { id: pulmonaryEdemaId, label: 'Pulmonary edema' },
          { id: dyspneaId, label: 'Dyspnea' },
        ],
        distractorPool: [
          { id: peripheralEdemaId, label: 'Peripheral edema' },
          { id: hypertensionId, label: 'Hypertension' },
        ],
        numDistractors: 2,
      };

      const question1 = generateQuestion(questionData, 99999);
      const question2 = generateQuestion(questionData, 99999);

      expect(question1.prompt).toBe(question2.prompt);
      expect(question1.answerOptions).toEqual(question2.answerOptions);
    });
  });

  describe('Upward Questions (attribute | fact → categories)', () => {
    test('generates correct prompt format: "select all | {attribute} | {fact}"', async () => {
      const questionData = {
        direction: 'upward' as const,
        attribute: { id: symptomsAttrId, label: 'Symptoms' },
        fact: { id: pulmonaryEdemaId, label: 'Pulmonary edema' },
        correctCategories: [{ id: leftCategoryId, label: 'Left-sided CHF' }],
        distractorPool: [{ id: rightCategoryId, label: 'Right-sided CHF' }],
        numDistractors: 1,
      };

      const question = generateQuestion(questionData, 12345);

      expect(question.prompt).toBe('select all | Symptoms | Pulmonary edema');
      expect(question.category_id).toBeNull();
      expect(question.attribute_id).toBe(symptomsAttrId);
      expect(question.fact_id).toBe(pulmonaryEdemaId);
    });

    test('includes all correct categories in at least one answer option', async () => {
      const questionData = {
        direction: 'upward' as const,
        attribute: { id: symptomsAttrId, label: 'Symptoms' },
        fact: { id: pulmonaryEdemaId, label: 'Pulmonary edema' },
        correctCategories: [{ id: leftCategoryId, label: 'Left-sided CHF' }],
        distractorPool: [{ id: rightCategoryId, label: 'Right-sided CHF' }],
        numDistractors: 1,
      };

      const question = generateQuestion(questionData, 12345);

      const allCategoryIds = new Set<number>();
      question.answerOptions.forEach((option) => {
        option.components.forEach((catId) => allCategoryIds.add(catId));
      });

      expect(allCategoryIds).toContain(leftCategoryId);
    });
  });

  describe('Adaptive Distractor Strategy', () => {
    test('adds confusing facts to all distractors when provided', async () => {
      const confusingFactId = hypertensionId;

      const questionData = {
        direction: 'downward' as const,
        category: { id: leftCategoryId, label: 'Left-sided CHF' },
        attribute: { id: symptomsAttrId, label: 'Symptoms' },
        correctFacts: [
          { id: pulmonaryEdemaId, label: 'Pulmonary edema' },
          { id: dyspneaId, label: 'Dyspnea' },
        ],
        distractorPool: [{ id: peripheralEdemaId, label: 'Peripheral edema' }],
        confusingFacts: [{ id: confusingFactId, label: 'Hypertension' }],
        numDistractors: 2,
      };

      const question = generateQuestion(questionData, 12345);

      // Find distractor options (those that include wrong facts)
      const distractorOptions = question.answerOptions.filter(
        (opt) => !opt.is_correct
      );

      // All distractor options should include the confusing fact
      distractorOptions.forEach((option) => {
        expect(option.components).toContain(confusingFactId);
      });
    });
  });
});
