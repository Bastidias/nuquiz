/**
 * Database Types (Backend Only - DO NOT share with frontend)
 *
 * Type definitions for database models.
 * Following principle: strict separation between FE and BE types.
 */

// ==========================================
// CORE TYPES
// ==========================================

export type UserRole = 'student' | 'admin' | 'superadmin';

export interface User {
  id: number;
  email: string;
  username: string | null;
  password_hash: string | null;
  role: UserRole;
  email_verified: boolean;
  last_login_at: Date | null;
  created_at: Date;
  updated_at: Date;
}

export interface NewUser {
  email: string;
  username?: string;
  password_hash?: string;
  role?: UserRole;
}

export type AuthEventType = 'login' | 'logout' | 'failed_login' | 'password_change' | 'role_change';

export interface AuthEvent {
  id: number;
  user_id: number | null;
  event_type: AuthEventType;
  ip_address: string | null;
  user_agent: string | null;
  metadata: Record<string, any> | null;
  created_at: Date;
}

export interface NewAuthEvent {
  user_id?: number;
  event_type: AuthEventType;
  ip_address?: string;
  user_agent?: string;
  metadata?: Record<string, any>;
}

export interface ContentPack {
  id: number;
  name: string;
  description: string | null;
  is_active: boolean;
  created_by: number | null;
  created_at: Date;
  updated_at: Date;
}

export interface NewContentPack {
  name: string;
  description?: string;
  created_by?: number;
  is_active?: boolean;
}

export interface UserPackSubscription {
  id: number;
  user_id: number;
  content_pack_id: number;
  subscribed_at: Date;
  expires_at: Date | null;
  is_active: boolean;
}

export interface NewSubscription {
  user_id: number;
  content_pack_id: number;
  expires_at?: Date;
}

// ==========================================
// KNOWLEDGE HIERARCHY
// ==========================================

export type KnowledgeType = 'topic' | 'category' | 'attribute' | 'fact';

export interface Knowledge {
  id: number;
  parent_id: number | null;
  name: string;
  label: string;
  type: KnowledgeType;
  content_pack_id: number;
  order_index: number;
  created_at: Date;
  updated_at: Date;
}

export interface NewKnowledge {
  parent_id?: number | null;
  name: string;
  label: string;
  type: KnowledgeType;
  content_pack_id: number;
  order_index?: number;
}

// ==========================================
// QUIZ SESSION
// ==========================================

export interface QuizSession {
  id: number;
  user_id: number;
  content_pack_id: number | null;
  started_at: Date;
  completed_at: Date | null;
  total_questions: number;
  correct_answers: number;
  score: number | null;
}

export interface NewQuizSession {
  user_id: number;
  content_pack_id?: number;
}

// ==========================================
// QUESTIONS & ANSWERS
// ==========================================

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
  question_type?: string;
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
  category_id?: number;
  attribute_id?: number;
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
}

export type ComponentType = 'fact' | 'category' | 'attribute';

export interface AnswerOptionComponent {
  id: number;
  answer_option_id: number;
  knowledge_id: number;
  component_type: ComponentType;
  source_category_id: number | null;
  source_attribute_id: number | null;
}

export interface NewAnswerOptionComponent {
  answer_option_id: number;
  knowledge_id: number;
  component_type: ComponentType;
  source_category_id?: number;
  source_attribute_id?: number;
}

// ==========================================
// PROGRESS & ANALYTICS
// ==========================================

export interface UserKnowledgeProgress {
  id: number;
  user_id: number;
  knowledge_id: number;
  knowledge_type: string;
  times_tested: number;
  times_correct: number;
  times_incorrect: number;
  last_tested_at: Date | null;
  mastery_score: number | null;
  consecutive_correct: number;
  consecutive_incorrect: number;
  updated_at: Date;
}

export interface NewUserKnowledgeProgress {
  user_id: number;
  knowledge_id: number;
  knowledge_type: string;
}

export interface AnalyticsEvent {
  id: number;
  user_id: number | null;
  session_id: number | null;
  event_type: string;
  event_data: Record<string, any> | null;
  created_at: Date;
}

export interface NewAnalyticsEvent {
  user_id?: number;
  session_id?: number;
  event_type: string;
  event_data?: Record<string, any>;
}

// ==========================================
// UTILITY TYPES
// ==========================================

/**
 * Helper type for partial updates
 */
export type PartialUpdate<T> = Partial<Omit<T, 'id' | 'created_at' | 'updated_at'>>;

/**
 * Query filter type
 */
export interface QueryFilter {
  [key: string]: any;
}

/**
 * Pagination options
 */
export interface PaginationOptions {
  limit?: number;
  offset?: number;
}

/**
 * Sort options
 */
export interface SortOptions {
  field: string;
  direction: 'ASC' | 'DESC';
}
