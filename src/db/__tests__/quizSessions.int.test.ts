/**
 * Quiz Sessions Database Integration Tests
 * Following RITEway principles - NO MOCKS
 */

import {
  createSession,
  findSessionById,
  completeSession,
  saveQuestion,
  saveQuestionKnowledgeSource,
  saveAnswerOption,
  saveAnswerOptionComponents,
  markOptionSelected,
  getSessionSelectedOptions,
  getSessionQuestions,
} from '../quizSessions';
import * as users from '../users';
import * as contentPacks from '../contentPacks';
import * as knowledge from '../knowledge';
import { query } from '../connection';

describe('Quiz Sessions Database Layer', () => {
  let testUser: any;
  let testPack: any;
  let testCategory: any;
  let testAttribute: any;
  let testFact1: any;
  let testFact2: any;

  beforeEach(async () => {
    // Create test user
    testUser = await users.create({
      email: `quiztest-${Date.now()}@test.com`,
      password_hash: 'hash',
      role: 'student',
    });

    // Create content pack
    testPack = await contentPacks.create({
      name: 'Test Pack',
      description: 'Test Description',
      created_by: testUser.id,
    });

    // Create knowledge hierarchy for testing
    const topic = await knowledge.create({
      name: 'test-topic',
      label: 'Test Topic',
      type: 'topic',
      content_pack_id: testPack.id,
    });

    testCategory = await knowledge.create({
      parent_id: topic.id,
      name: 'test-category',
      label: 'Test Category',
      type: 'category',
      content_pack_id: testPack.id,
    });

    testAttribute = await knowledge.create({
      parent_id: testCategory.id,
      name: 'test-attribute',
      label: 'Test Attribute',
      type: 'attribute',
      content_pack_id: testPack.id,
    });

    testFact1 = await knowledge.create({
      parent_id: testAttribute.id,
      name: 'fact-1',
      label: 'Fact 1',
      type: 'fact',
      content_pack_id: testPack.id,
    });

    testFact2 = await knowledge.create({
      parent_id: testAttribute.id,
      name: 'fact-2',
      label: 'Fact 2',
      type: 'fact',
      content_pack_id: testPack.id,
    });
  });

  describe('createSession()', () => {
    it('creates a new quiz session with correct data', async () => {
      const session = await createSession({
        user_id: testUser.id,
        content_pack_id: testPack.id,
        total_questions: 10,
      });

      expect(session).toEqual(
        expect.objectContaining({
          id: expect.any(Number),
          user_id: testUser.id,
          content_pack_id: testPack.id,
          total_questions: 10,
          correct_answers: 0,
          score: null,
          started_at: expect.any(Date),
          completed_at: null,
        })
      );
    });

    it('defaults total_questions to 0 if not provided', async () => {
      const session = await createSession({
        user_id: testUser.id,
        content_pack_id: testPack.id,
      });

      expect(session.total_questions).toBe(0);
    });
  });

  describe('findSessionById()', () => {
    it('returns the session when it exists', async () => {
      const created = await createSession({
        user_id: testUser.id,
        content_pack_id: testPack.id,
        total_questions: 5,
      });

      const found = await findSessionById(created.id);

      expect(found).toEqual(
        expect.objectContaining({
          id: created.id,
          user_id: testUser.id,
          content_pack_id: testPack.id,
        })
      );
    });

    it('returns null when session does not exist', async () => {
      const found = await findSessionById(99999);
      expect(found).toBeNull();
    });
  });

  describe('completeSession()', () => {
    it('marks session as completed with score', async () => {
      const session = await createSession({
        user_id: testUser.id,
        content_pack_id: testPack.id,
        total_questions: 10,
      });

      const completed = await completeSession(session.id, {
        correct_answers: 7,
        score: 70.0,
      });

      expect(completed).toEqual(
        expect.objectContaining({
          id: session.id,
          correct_answers: 7,
          score: '70.00',
          completed_at: expect.any(Date),
        })
      );
    });
  });

  describe('saveQuestion()', () => {
    it('saves a question to the session', async () => {
      const session = await createSession({
        user_id: testUser.id,
        content_pack_id: testPack.id,
      });

      const question = await saveQuestion({
        session_id: session.id,
        question_text: 'select all | Test Category | Test Attribute',
        question_type: 'multiple_select',
        question_order: 1,
      });

      expect(question).toEqual(
        expect.objectContaining({
          id: expect.any(Number),
          session_id: session.id,
          question_text: 'select all | Test Category | Test Attribute',
          question_type: 'multiple_select',
          question_order: 1,
          created_at: expect.any(Date),
          presented_at: null,
          answered_at: null,
        })
      );
    });
  });

  describe('saveQuestionKnowledgeSource()', () => {
    it('saves knowledge source for a question', async () => {
      const session = await createSession({
        user_id: testUser.id,
        content_pack_id: testPack.id,
      });

      const question = await saveQuestion({
        session_id: session.id,
        question_text: 'Test',
        question_type: 'multiple_select',
        question_order: 1,
      });

      const source = await saveQuestionKnowledgeSource({
        question_id: question.id,
        category_id: testCategory.id,
        attribute_id: testAttribute.id,
        is_primary: true,
      });

      expect(source).toEqual(
        expect.objectContaining({
          id: expect.any(Number),
          question_id: question.id,
          category_id: testCategory.id,
          attribute_id: testAttribute.id,
          is_primary: true,
        })
      );
    });
  });

  describe('saveAnswerOption()', () => {
    it('saves an answer option for a question', async () => {
      const session = await createSession({
        user_id: testUser.id,
        content_pack_id: testPack.id,
      });

      const question = await saveQuestion({
        session_id: session.id,
        question_text: 'Test question',
        question_type: 'multiple_select',
        question_order: 1,
      });

      const option = await saveAnswerOption({
        question_id: question.id,
        option_order: 1,
        display_text: 'Fact 1, Fact 2',
        is_correct: true,
        was_selected: false,
      });

      expect(option).toEqual(
        expect.objectContaining({
          id: expect.any(Number),
          question_id: question.id,
          option_order: 1,
          display_text: 'Fact 1, Fact 2',
          is_correct: true,
          was_selected: false,
        })
      );
    });
  });

  describe('saveAnswerOptionComponents()', () => {
    it('saves component mappings for an answer option', async () => {
      const session = await createSession({
        user_id: testUser.id,
        content_pack_id: testPack.id,
      });

      const question = await saveQuestion({
        session_id: session.id,
        question_text: 'Test question',
        question_type: 'multiple_select',
        question_order: 1,
      });

      const option = await saveAnswerOption({
        question_id: question.id,
        option_order: 1,
        display_text: 'Fact 1, Fact 2',
        is_correct: true,
        was_selected: false,
      });

      await saveAnswerOptionComponents(option.id, [
        {
          knowledge_id: testFact1.id,
          component_type: 'fact',
          source_category_id: testCategory.id,
          source_attribute_id: testAttribute.id,
        },
        {
          knowledge_id: testFact2.id,
          component_type: 'fact',
          source_category_id: testCategory.id,
          source_attribute_id: testAttribute.id,
        },
      ]);

      // Verify components were saved
      const components = await query(
        'SELECT * FROM answer_option_components WHERE answer_option_id = $1',
        [option.id]
      );

      expect(components.rows).toHaveLength(2);
      expect(components.rows[0]).toEqual(
        expect.objectContaining({
          answer_option_id: option.id,
          knowledge_id: testFact1.id,
          component_type: 'fact',
        })
      );
    });
  });

  describe('markOptionSelected()', () => {
    it('marks an answer option as selected', async () => {
      const session = await createSession({
        user_id: testUser.id,
        content_pack_id: testPack.id,
      });

      const question = await saveQuestion({
        session_id: session.id,
        question_text: 'Test',
        question_type: 'multiple_select',
        question_order: 1,
      });

      const option = await saveAnswerOption({
        question_id: question.id,
        option_order: 1,
        display_text: 'Test',
        is_correct: true,
        was_selected: false,
      });

      const updated = await markOptionSelected(option.id, true);

      expect(updated).toEqual(
        expect.objectContaining({
          id: option.id,
          was_selected: true,
        })
      );
    });
  });

  describe('getSessionSelectedOptions()', () => {
    it('retrieves all selected options for a session', async () => {
      const session = await createSession({
        user_id: testUser.id,
        content_pack_id: testPack.id,
      });

      const question = await saveQuestion({
        session_id: session.id,
        question_text: 'Test',
        question_type: 'multiple_select',
        question_order: 1,
      });

      const option1 = await saveAnswerOption({
        question_id: question.id,
        option_order: 1,
        display_text: 'Option 1',
        is_correct: true,
        was_selected: false,
      });

      const option2 = await saveAnswerOption({
        question_id: question.id,
        option_order: 2,
        display_text: 'Option 2',
        is_correct: false,
        was_selected: false,
      });

      // Mark options as selected
      await markOptionSelected(option1.id, true);
      await markOptionSelected(option2.id, true);

      const selectedOptions = await getSessionSelectedOptions(session.id);

      expect(selectedOptions).toHaveLength(2);
      expect(selectedOptions[0].id).toBe(option1.id);
      expect(selectedOptions[1].id).toBe(option2.id);
    });
  });

  describe('getSessionQuestions()', () => {
    it('retrieves all questions for a session in order', async () => {
      const session = await createSession({
        user_id: testUser.id,
        content_pack_id: testPack.id,
      });

      await saveQuestion({
        session_id: session.id,
        question_text: 'Question 1',
        question_type: 'multiple_select',
        question_order: 1,
      });

      await saveQuestion({
        session_id: session.id,
        question_text: 'Question 2',
        question_type: 'multiple_select',
        question_order: 2,
      });

      const questions = await getSessionQuestions(session.id);

      expect(questions).toHaveLength(2);
      expect(questions[0].question_text).toBe('Question 1');
      expect(questions[1].question_text).toBe('Question 2');
    });
  });
});
