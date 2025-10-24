/**
 * Quiz Session Service
 *
 * Business logic for quiz session creation and management.
 * Integrates the quiz engine with the database layer.
 */

import * as quizSessions from '../../db/quizSessions';
import * as knowledge from '../../db/knowledge';
import { generateQuestion } from '../quiz/question-generator';
import type { QuestionData, KnowledgeNode } from '../quiz/types';

// ============================================================================
// Types
// ============================================================================

export interface CreateQuizSessionInput {
  user_id: number;
  content_pack_id: number;
  question_count: number;
  selection_strategy?: 'untested' | 'review' | 'struggling' | 'targeted';
}

export interface QuizSessionWithQuestions {
  session: quizSessions.QuizSession;
  questions: Array<{
    id: number;
    question_text: string;
    question_type: string;
    question_order: number;
    options: Array<{
      id: number;
      option_order: number;
      display_text: string;
      is_correct: boolean;
    }>;
  }>;
}

// ============================================================================
// Session Creation
// ============================================================================

/**
 * Create a new quiz session with generated questions
 *
 * This function:
 * 1. Creates a quiz session
 * 2. Fetches knowledge from the content pack
 * 3. Generates questions using the quiz engine
 * 4. Saves questions and answer options to the database
 *
 * @param input - Quiz session creation parameters
 * @returns Created session with questions
 */
export const createQuizSession = async (
  input: CreateQuizSessionInput
): Promise<QuizSessionWithQuestions> => {
  const { user_id, content_pack_id, question_count } = input;

  // Step 1: Create quiz session
  const session = await quizSessions.createSession({
    user_id,
    content_pack_id,
    total_questions: question_count,
  });

  // Step 2: Fetch knowledge nodes from content pack
  const knowledgeNodes = await knowledge.findByContentPack(content_pack_id);

  // Step 3: Find category/attribute pairs for question generation
  const categories = knowledgeNodes.filter((n) => n.type === 'category');
  const attributes = knowledgeNodes.filter((n) => n.type === 'attribute');
  const facts = knowledgeNodes.filter((n) => n.type === 'fact');

  // Simple strategy: Generate downward questions for each category+attribute pair
  const questionPairs: Array<{ category: any; attribute: any }> = [];

  for (const category of categories) {
    const categoryAttributes = attributes.filter((a) => a.parent_id === category.id);

    for (const attribute of categoryAttributes) {
      questionPairs.push({ category, attribute });
    }
  }

  if (questionPairs.length === 0) {
    throw new Error('No valid category/attribute pairs found for question generation');
  }

  // Step 4: Filter to only pairs that have facts (FIX: ensures correct question count)
  const validPairs = questionPairs.filter(pair => {
    const pairFacts = facts.filter(f => f.parent_id === pair.attribute.id);
    return pairFacts.length > 0;
  });

  if (validPairs.length === 0) {
    throw new Error('No category/attribute pairs with facts found for question generation');
  }

  // Generate and save questions
  const questions: QuizSessionWithQuestions['questions'] = [];
  const questionsToGenerate = Math.min(question_count, validPairs.length);

  for (let i = 0; i < questionsToGenerate; i++) {
    const pair = validPairs[i % validPairs.length];
    const { category, attribute } = pair;

    // Find correct facts (children of this attribute)
    const correctFacts = facts.filter((f) => f.parent_id === attribute.id);

    // Find distractor facts (facts from sibling attributes or same category)
    const siblingAttributes = attributes.filter(
      (a) => a.parent_id === category.id && a.id !== attribute.id
    );
    const distractorPool = facts.filter((f) =>
      siblingAttributes.some((a) => a.id === f.parent_id)
    );

    // Build question data
    const questionData: QuestionData = {
      direction: 'downward',
      category: { id: category.id, label: category.label },
      attribute: { id: attribute.id, label: attribute.label },
      correctFacts: correctFacts.map((f) => ({ id: f.id, label: f.label })),
      distractorPool: distractorPool.map((f) => ({ id: f.id, label: f.label })),
      numDistractors: 4,
    };

    // Generate question using quiz engine (deterministic with seed)
    const seed = session.id * 1000 + i; // Unique seed per question
    const generatedQuestion = generateQuestion(questionData, seed);

    // Save question to database
    const savedQuestion = await quizSessions.saveQuestion({
      session_id: session.id,
      question_text: generatedQuestion.prompt,
      question_type: 'multiple_select',
      question_order: i + 1,
    });

    // Save knowledge source
    await quizSessions.saveQuestionKnowledgeSource({
      question_id: savedQuestion.id,
      category_id: category.id,
      attribute_id: attribute.id,
      is_primary: true,
    });

    // Save answer options
    const savedOptions = [];
    for (const answerOption of generatedQuestion.answerOptions) {
      const savedOption = await quizSessions.saveAnswerOption({
        question_id: savedQuestion.id,
        option_order: answerOption.display_order,
        display_text: answerOption.option_text,
        is_correct: answerOption.is_correct,
        was_selected: false,
      });

      // Save answer option components
      await quizSessions.saveAnswerOptionComponents(
        savedOption.id,
        answerOption.components.map((componentId) => ({
          knowledge_id: componentId,
          component_type: 'fact',
          source_category_id: category.id,
          source_attribute_id: attribute.id,
        }))
      );

      savedOptions.push({
        id: savedOption.id,
        option_order: savedOption.option_order,
        display_text: savedOption.display_text,
        is_correct: savedOption.is_correct,
      });
    }

    questions.push({
      id: savedQuestion.id,
      question_text: savedQuestion.question_text,
      question_type: savedQuestion.question_type,
      question_order: savedQuestion.question_order,
      options: savedOptions,
    });
  }

  return {
    session,
    questions,
  };
};

// ============================================================================
// Session Retrieval
// ============================================================================

/**
 * Get a quiz session with its questions and options
 * (Used when user is taking the quiz)
 *
 * @param sessionId - Quiz session ID
 * @param userId - User ID (for authorization)
 * @returns Session with questions and options
 */
export const getQuizSession = async (
  sessionId: number,
  userId: number
): Promise<QuizSessionWithQuestions> => {
  // Get session
  const session = await quizSessions.findSessionById(sessionId);

  if (!session) {
    throw new Error('Quiz session not found');
  }

  // Verify user owns this session
  if (session.user_id !== userId) {
    throw new Error('Unauthorized: You do not own this quiz session');
  }

  // Get questions
  const dbQuestions = await quizSessions.getSessionQuestions(sessionId);

  // Get options for each question
  const questions: QuizSessionWithQuestions['questions'] = [];

  for (const q of dbQuestions) {
    const options = await quizSessions.getQuestionOptions(q.id);

    questions.push({
      id: q.id,
      question_text: q.question_text,
      question_type: q.question_type,
      question_order: q.question_order,
      options: options.map((o) => ({
        id: o.id,
        option_order: o.option_order,
        display_text: o.display_text,
        is_correct: o.is_correct, // Include for now, can hide in API layer if needed
      })),
    });
  }

  return {
    session,
    questions,
  };
};

// ============================================================================
// Session Submission
// ============================================================================

export interface SubmitQuizSessionInput {
  session_id: number;
  user_id: number;
  selected_option_ids: number[]; // All selected option IDs across all questions
}

export interface QuizSubmissionResult {
  session: quizSessions.QuizSession;
  total_questions: number;
  correct_answers: number;
  score: number;
}

/**
 * Submit a quiz session with user's selected answers
 *
 * This function:
 * 1. Marks selected options as `was_selected = true`
 * 2. Calculates score
 * 3. Marks session as completed
 *
 * @param input - Submission data
 * @returns Submission result with score
 */
export const submitQuizSession = async (
  input: SubmitQuizSessionInput
): Promise<QuizSubmissionResult> => {
  const { session_id, user_id, selected_option_ids } = input;

  // Get session
  const session = await quizSessions.findSessionById(session_id);

  if (!session) {
    throw new Error('Quiz session not found');
  }

  // Verify user owns this session
  if (session.user_id !== user_id) {
    throw new Error('Unauthorized: You do not own this quiz session');
  }

  // Verify session not already completed
  if (session.completed_at) {
    throw new Error('Quiz session already completed');
  }

  // SECURITY: Validate all submitted option IDs belong to this session
  const validOptionIds = await quizSessions.getSessionOptionIds(session_id);
  const invalidOptions = selected_option_ids.filter(id => !validOptionIds.has(id));

  if (invalidOptions.length > 0) {
    throw new Error(`Invalid option IDs: ${invalidOptions.join(', ')} - these options do not belong to this quiz session`);
  }

  // Mark all selected options
  for (const optionId of selected_option_ids) {
    await quizSessions.markOptionSelected(optionId, true);
  }

  // Get all questions and options to calculate score
  const questions = await quizSessions.getSessionQuestions(session_id);
  let correctQuestions = 0;

  for (const question of questions) {
    const options = await quizSessions.getQuestionOptions(question.id);
    const correctOptions = options.filter((o) => o.is_correct);
    const selectedOptions = options.filter((o) => o.was_selected);

    // Question is correct if ALL correct options are selected AND NO incorrect options are selected
    const correctIds = new Set(correctOptions.map((o) => o.id));
    const selectedIds = new Set(selectedOptions.map((o) => o.id));

    const isCorrect =
      correctIds.size === selectedIds.size &&
      [...correctIds].every((id) => selectedIds.has(id));

    if (isCorrect) {
      correctQuestions++;
    }
  }

  const totalQuestions = questions.length;
  const score = totalQuestions > 0 ? (correctQuestions / totalQuestions) * 100 : 0;

  // Complete session
  const completedSession = await quizSessions.completeSession(session_id, {
    correct_answers: correctQuestions,
    score,
  });

  return {
    session: completedSession,
    total_questions: totalQuestions,
    correct_answers: correctQuestions,
    score,
  };
};
