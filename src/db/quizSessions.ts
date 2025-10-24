/**
 * Quiz Sessions Data Access Layer
 *
 * Handles quiz session creation, question storage, answer tracking, and progress updates.
 * Follows functional programming style - NO MOCKS for testing.
 */

import { query, queryOne, queryMany } from './connection';

// ============================================================================
// Types
// ============================================================================

export interface QuizSession {
  id: number;
  user_id: number;
  content_pack_id: number;
  started_at: Date;
  completed_at: Date | null;
  total_questions: number;
  correct_answers: number;
  score: string | null; // DECIMAL stored as string
}

export interface NewQuizSession {
  user_id: number;
  content_pack_id: number;
  total_questions?: number;
}

export interface Question {
  id: number;
  session_id: number;
  question_text: string;
  question_type: string;
  question_order: number;
  created_at: Date;
  presented_at: Date | null;
  answered_at: Date | null;
  time_spent_seconds: number | null;
}

export interface NewQuestion {
  session_id: number;
  question_text: string;
  question_type: string;
  question_order: number;
}

export interface QuestionKnowledgeSource {
  id: number;
  question_id: number;
  category_id: number | null;
  attribute_id: number | null;
  is_primary: boolean;
}

export interface NewQuestionKnowledgeSource {
  question_id: number;
  category_id?: number | null;
  attribute_id?: number | null;
  is_primary?: boolean;
}

export interface AnswerOption {
  id: number;
  question_id: number;
  option_order: number;
  display_text: string;
  is_correct: boolean;
  was_selected: boolean;
}

export interface NewAnswerOption {
  question_id: number;
  option_order: number;
  display_text: string;
  is_correct: boolean;
  was_selected: boolean;
}

export interface AnswerOptionComponent {
  id: number;
  answer_option_id: number;
  knowledge_id: number;
  component_type: string;
  source_category_id: number | null;
  source_attribute_id: number | null;
}

export interface NewAnswerOptionComponent {
  knowledge_id: number;
  component_type: string;
  source_category_id?: number | null;
  source_attribute_id?: number | null;
}


// ============================================================================
// Quiz Session Functions
// ============================================================================

/**
 * Create a new quiz session
 */
export const createSession = async (data: NewQuizSession): Promise<QuizSession> => {
  const {
    user_id,
    content_pack_id,
    total_questions = 0,
  } = data;

  const result = await queryOne<QuizSession>(
    `INSERT INTO quiz_sessions (user_id, content_pack_id, total_questions)
     VALUES ($1, $2, $3)
     RETURNING *`,
    [user_id, content_pack_id, total_questions]
  );

  if (!result) {
    throw new Error('Failed to create quiz session');
  }

  return result;
};

/**
 * Find a quiz session by ID
 */
export const findSessionById = async (id: number): Promise<QuizSession | null> => {
  return queryOne<QuizSession>(
    'SELECT * FROM quiz_sessions WHERE id = $1',
    [id]
  );
};

/**
 * Complete a quiz session with final score
 */
export const completeSession = async (
  sessionId: number,
  data: { correct_answers: number; score: number }
): Promise<QuizSession> => {
  const result = await queryOne<QuizSession>(
    `UPDATE quiz_sessions
     SET completed_at = CURRENT_TIMESTAMP,
         correct_answers = $2,
         score = $3
     WHERE id = $1
     RETURNING *`,
    [sessionId, data.correct_answers, data.score]
  );

  if (!result) {
    throw new Error(`Quiz session with id ${sessionId} not found`);
  }

  return result;
};

/**
 * Get all sessions for a user
 */
export const getUserSessions = async (userId: number): Promise<QuizSession[]> => {
  return queryMany<QuizSession>(
    `SELECT * FROM quiz_sessions
     WHERE user_id = $1
     ORDER BY started_at DESC`,
    [userId]
  );
};

/**
 * Get user's sessions for a specific content pack
 */
export const getUserPackSessions = async (
  userId: number,
  contentPackId: number
): Promise<QuizSession[]> => {
  return queryMany<QuizSession>(
    `SELECT * FROM quiz_sessions
     WHERE user_id = $1 AND content_pack_id = $2
     ORDER BY started_at DESC`,
    [userId, contentPackId]
  );
};

// ============================================================================
// Question Functions
// ============================================================================

/**
 * Save a question to a quiz session
 */
export const saveQuestion = async (data: NewQuestion): Promise<Question> => {
  const {
    session_id,
    question_text,
    question_type,
    question_order,
  } = data;

  const result = await queryOne<Question>(
    `INSERT INTO questions
     (session_id, question_text, question_type, question_order)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [session_id, question_text, question_type, question_order]
  );

  if (!result) {
    throw new Error('Failed to save question');
  }

  return result;
};

/**
 * Save knowledge source for a question
 */
export const saveQuestionKnowledgeSource = async (
  data: NewQuestionKnowledgeSource
): Promise<QuestionKnowledgeSource> => {
  const {
    question_id,
    category_id = null,
    attribute_id = null,
    is_primary = true,
  } = data;

  const result = await queryOne<QuestionKnowledgeSource>(
    `INSERT INTO question_knowledge_sources
     (question_id, category_id, attribute_id, is_primary)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [question_id, category_id, attribute_id, is_primary]
  );

  if (!result) {
    throw new Error('Failed to save question knowledge source');
  }

  return result;
};

/**
 * Get all questions for a session (ordered)
 */
export const getSessionQuestions = async (sessionId: number): Promise<Question[]> => {
  return queryMany<Question>(
    `SELECT * FROM questions
     WHERE session_id = $1
     ORDER BY question_order`,
    [sessionId]
  );
};

/**
 * Find question by ID
 */
export const findQuestionById = async (id: number): Promise<Question | null> => {
  return queryOne<Question>(
    'SELECT * FROM questions WHERE id = $1',
    [id]
  );
};

/**
 * Mark question as answered
 */
export const markQuestionAnswered = async (questionId: number): Promise<Question> => {
  const result = await queryOne<Question>(
    `UPDATE questions
     SET answered_at = CURRENT_TIMESTAMP
     WHERE id = $1
     RETURNING *`,
    [questionId]
  );

  if (!result) {
    throw new Error(`Question with id ${questionId} not found`);
  }

  return result;
};

// ============================================================================
// Answer Option Functions
// ============================================================================

/**
 * Save an answer option for a question
 */
export const saveAnswerOption = async (data: NewAnswerOption): Promise<AnswerOption> => {
  const {
    question_id,
    option_order,
    display_text,
    is_correct,
    was_selected,
  } = data;

  const result = await queryOne<AnswerOption>(
    `INSERT INTO answer_options
     (question_id, option_order, display_text, is_correct, was_selected)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
    [question_id, option_order, display_text, is_correct, was_selected]
  );

  if (!result) {
    throw new Error('Failed to save answer option');
  }

  return result;
};

/**
 * Get all answer options for a question
 */
export const getQuestionOptions = async (questionId: number): Promise<AnswerOption[]> => {
  return queryMany<AnswerOption>(
    `SELECT * FROM answer_options
     WHERE question_id = $1
     ORDER BY option_order`,
    [questionId]
  );
};

/**
 * Get all valid answer option IDs for a quiz session
 * Used for validating submitted answers belong to the session
 */
export const getSessionOptionIds = async (sessionId: number): Promise<Set<number>> => {
  const options = await queryMany<{id: number}>(
    `SELECT ao.id
     FROM answer_options ao
     INNER JOIN questions q ON ao.question_id = q.id
     WHERE q.session_id = $1`,
    [sessionId]
  );

  return new Set(options.map(o => o.id));
};

/**
 * Update answer option selection status
 */
export const markOptionSelected = async (
  optionId: number,
  wasSelected: boolean
): Promise<AnswerOption> => {
  const result = await queryOne<AnswerOption>(
    `UPDATE answer_options
     SET was_selected = $2
     WHERE id = $1
     RETURNING *`,
    [optionId, wasSelected]
  );

  if (!result) {
    throw new Error(`Answer option with id ${optionId} not found`);
  }

  return result;
};

// ============================================================================
// Answer Option Component Functions
// ============================================================================

/**
 * Save component mappings for an answer option
 */
export const saveAnswerOptionComponents = async (
  optionId: number,
  components: NewAnswerOptionComponent[]
): Promise<void> => {
  if (components.length === 0) {
    return;
  }

  // Build batch insert query
  const values: any[] = [];
  const placeholders: string[] = [];
  let paramIndex = 1;

  components.forEach((comp) => {
    placeholders.push(`($${paramIndex}, $${paramIndex + 1}, $${paramIndex + 2}, $${paramIndex + 3}, $${paramIndex + 4})`);
    values.push(
      optionId,
      comp.knowledge_id,
      comp.component_type,
      comp.source_category_id ?? null,
      comp.source_attribute_id ?? null
    );
    paramIndex += 5;
  });

  await query(
    `INSERT INTO answer_option_components
     (answer_option_id, knowledge_id, component_type, source_category_id, source_attribute_id)
     VALUES ${placeholders.join(', ')}`,
    values
  );
};

/**
 * Get all components for an answer option
 */
export const getOptionComponents = async (
  optionId: number
): Promise<AnswerOptionComponent[]> => {
  return queryMany<AnswerOptionComponent>(
    `SELECT * FROM answer_option_components
     WHERE answer_option_id = $1`,
    [optionId]
  );
};

// ============================================================================
// Helper Functions for Quiz Flow
// ============================================================================

/**
 * Get all selected answer options for a session
 * (Uses was_selected field on answer_options)
 */
export const getSessionSelectedOptions = async (sessionId: number): Promise<AnswerOption[]> => {
  return queryMany<AnswerOption>(
    `SELECT ao.*
     FROM answer_options ao
     INNER JOIN questions q ON ao.question_id = q.id
     WHERE q.session_id = $1 AND ao.was_selected = true
     ORDER BY q.question_order, ao.option_order`,
    [sessionId]
  );
};
