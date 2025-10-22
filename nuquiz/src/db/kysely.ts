/**
 * Kysely Database Setup
 *
 * Type-safe SQL query builder - replaces manual SQL string building.
 * Prevents SQL injection and provides TypeScript autocomplete.
 */

import { Kysely, PostgresDialect } from 'kysely';
import { Pool } from 'pg';
import type { UserRole, KnowledgeType, AuthEventType } from './types.js';

// ============================================================================
// Database Schema Types
// ============================================================================

export interface Database {
  users: UsersTable;
  knowledge: KnowledgeTable;
  content_packs: ContentPacksTable;
  user_pack_subscriptions: UserPackSubscriptionsTable;
  quiz_sessions: QuizSessionsTable;
  questions: QuestionsTable;
  answer_options: AnswerOptionsTable;
  answer_option_components: AnswerOptionComponentsTable;
  user_knowledge_progress: UserKnowledgeProgressTable;
  analytics_events: AnalyticsEventsTable;
  auth_events: AuthEventsTable;
}

export interface UsersTable {
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

export interface KnowledgeTable {
  id: number;
  parent_id: number | null;
  type: KnowledgeType;
  label: string;
  description: string | null;
  created_at: Date;
}

export interface ContentPacksTable {
  id: number;
  name: string;
  description: string | null;
  is_active: boolean;
  created_by: number;
  created_at: Date;
  updated_at: Date;
}

export interface UserPackSubscriptionsTable {
  id: number;
  user_id: number;
  content_pack_id: number;
  subscribed_at: Date;
  expires_at: Date | null;
}

export interface QuizSessionsTable {
  id: number;
  user_id: number;
  content_pack_id: number;
  started_at: Date;
  completed_at: Date | null;
  score: number | null;
}

export interface QuestionsTable {
  id: number;
  quiz_session_id: number;
  category_id: number;
  attribute_id: number;
  question_text: string;
  created_at: Date;
}

export interface AnswerOptionsTable {
  id: number;
  question_id: number;
  option_text: string;
  is_correct: boolean;
  created_at: Date;
}

export interface AnswerOptionComponentsTable {
  id: number;
  answer_option_id: number;
  knowledge_id: number;
}

export interface UserKnowledgeProgressTable {
  id: number;
  user_id: number;
  knowledge_id: number;
  mastery_percentage: number;
  last_reviewed_at: Date | null;
  created_at: Date;
  updated_at: Date;
}

export interface AnalyticsEventsTable {
  id: number;
  user_id: number | null;
  event_type: string;
  event_data: unknown; // JSONB
  created_at: Date;
}

export interface AuthEventsTable {
  id: number;
  user_id: number | null;
  event_type: AuthEventType;
  ip_address: string | null;
  user_agent: string | null;
  metadata: unknown | null; // JSONB
  created_at: Date;
}

// ============================================================================
// Create Database Instance
// ============================================================================

let db: Kysely<Database> | null = null;

export function createDb(connectionString?: string): Kysely<Database> {
  const pool = new Pool({
    connectionString: connectionString || process.env.DATABASE_URL,
  });

  return new Kysely<Database>({
    dialect: new PostgresDialect({ pool }),
  });
}

export function getDb(): Kysely<Database> {
  if (!db) {
    db = createDb();
  }
  return db;
}

// For testing - create separate instance with test database
export function getTestDb(): Kysely<Database> {
  return createDb(process.env.TEST_DATABASE_URL);
}

// Close database connection (for cleanup)
export async function closeDb(database: Kysely<Database>) {
  await database.destroy();
}
