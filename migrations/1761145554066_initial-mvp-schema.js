/**
 * Initial MVP Schema Migration
 * Creates the 11 core tables for Nuquiz MVP
 */

/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
export const shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const up = (pgm) => {
  // ==========================================
  // CORE TABLES
  // ==========================================

  // Users table
  pgm.createTable('users', {
    id: 'id',
    email: {
      type: 'varchar(255)',
      notNull: true,
      unique: true,
    },
    username: {
      type: 'varchar(100)',
      unique: true,
    },
    created_at: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
    updated_at: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
  });

  // Content packs (collections of knowledge)
  pgm.createTable('content_packs', {
    id: 'id',
    name: {
      type: 'varchar(255)',
      notNull: true,
    },
    description: 'text',
    is_active: {
      type: 'boolean',
      default: true,
    },
    created_by: {
      type: 'integer',
      references: 'users(id)',
    },
    created_at: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
    updated_at: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
  });

  // User subscriptions to content packs
  pgm.createTable('user_pack_subscriptions', {
    id: 'id',
    user_id: {
      type: 'integer',
      notNull: true,
      references: 'users(id)',
      onDelete: 'CASCADE',
    },
    content_pack_id: {
      type: 'integer',
      notNull: true,
      references: 'content_packs(id)',
      onDelete: 'CASCADE',
    },
    subscribed_at: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
    expires_at: 'timestamp', // NULL for permanent access
    is_active: {
      type: 'boolean',
      default: true,
    },
  });

  pgm.addConstraint('user_pack_subscriptions', 'unique_user_pack', {
    unique: ['user_id', 'content_pack_id'],
  });

  // ==========================================
  // KNOWLEDGE HIERARCHY
  // ==========================================

  // Single knowledge table with self-referential hierarchy
  pgm.createTable('knowledge', {
    id: 'id',
    parent_id: {
      type: 'integer',
      references: 'knowledge(id)',
      onDelete: 'CASCADE',
    },
    name: {
      type: 'varchar(255)',
      notNull: true,
    },
    label: {
      type: 'varchar(255)',
      notNull: true,
    },
    type: {
      type: 'varchar(20)',
      notNull: true,
      check: "type IN ('topic', 'category', 'attribute', 'fact')",
    },
    content_pack_id: {
      type: 'integer',
      notNull: true,
      references: 'content_packs(id)',
      onDelete: 'CASCADE',
    },
    order_index: {
      type: 'integer',
      default: 0,
    },
    created_at: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
    updated_at: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
  });

  pgm.createIndex('knowledge', 'parent_id');
  pgm.createIndex('knowledge', 'type');
  pgm.createIndex('knowledge', 'content_pack_id');

  // ==========================================
  // QUIZ SESSION MANAGEMENT
  // ==========================================

  // Quiz sessions (each attempt)
  pgm.createTable('quiz_sessions', {
    id: 'id',
    user_id: {
      type: 'integer',
      notNull: true,
      references: 'users(id)',
      onDelete: 'CASCADE',
    },
    content_pack_id: {
      type: 'integer',
      references: 'content_packs(id)',
    },
    started_at: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
    completed_at: 'timestamp',
    total_questions: {
      type: 'integer',
      default: 0,
    },
    correct_answers: {
      type: 'integer',
      default: 0,
    },
    score: 'decimal(5,2)', // percentage score
  });

  pgm.createIndex('quiz_sessions', 'user_id');
  pgm.createIndex('quiz_sessions', 'content_pack_id');

  // ==========================================
  // QUESTION & ANSWER TRACKING
  // ==========================================

  // Questions generated/asked in a session
  pgm.createTable('questions', {
    id: 'id',
    session_id: {
      type: 'integer',
      notNull: true,
      references: 'quiz_sessions(id)',
      onDelete: 'CASCADE',
    },
    question_text: {
      type: 'text',
      notNull: true,
    },
    question_type: {
      type: 'varchar(50)',
      default: 'multiple_select',
    },
    question_order: {
      type: 'integer',
      notNull: true,
    },
    created_at: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
    presented_at: 'timestamp',
    answered_at: 'timestamp',
    time_spent_seconds: 'integer',
  });

  pgm.createIndex('questions', 'session_id');

  // Maps which knowledge paths were used to generate this question
  pgm.createTable('question_knowledge_sources', {
    id: 'id',
    question_id: {
      type: 'integer',
      notNull: true,
      references: 'questions(id)',
      onDelete: 'CASCADE',
    },
    category_id: {
      type: 'integer',
      references: 'knowledge(id)',
    },
    attribute_id: {
      type: 'integer',
      references: 'knowledge(id)',
    },
    is_primary: {
      type: 'boolean',
      default: true,
    },
  });

  pgm.createIndex('question_knowledge_sources', 'question_id');

  // ==========================================
  // ANSWER OPTIONS & COMPOSITION
  // ==========================================

  // Answer options presented for each question
  pgm.createTable('answer_options', {
    id: 'id',
    question_id: {
      type: 'integer',
      notNull: true,
      references: 'questions(id)',
      onDelete: 'CASCADE',
    },
    option_order: {
      type: 'integer',
      notNull: true,
    },
    display_text: {
      type: 'text',
      notNull: true,
    },
    is_correct: {
      type: 'boolean',
      notNull: true,
    },
    was_selected: {
      type: 'boolean',
      default: false,
    },
  });

  pgm.createIndex('answer_options', 'question_id');

  // Maps answer options to their knowledge components (KEY INNOVATION)
  pgm.createTable('answer_option_components', {
    id: 'id',
    answer_option_id: {
      type: 'integer',
      notNull: true,
      references: 'answer_options(id)',
      onDelete: 'CASCADE',
    },
    knowledge_id: {
      type: 'integer',
      notNull: true,
      references: 'knowledge(id)',
    },
    component_type: {
      type: 'varchar(20)',
      notNull: true,
      check: "component_type IN ('fact', 'category', 'attribute')",
    },
    source_category_id: {
      type: 'integer',
      references: 'knowledge(id)',
    },
    source_attribute_id: {
      type: 'integer',
      references: 'knowledge(id)',
    },
  });

  pgm.createIndex('answer_option_components', 'answer_option_id');
  pgm.createIndex('answer_option_components', 'knowledge_id');

  // ==========================================
  // USER PROGRESS & ANALYTICS
  // ==========================================

  // Track user performance on specific knowledge nodes
  pgm.createTable('user_knowledge_progress', {
    id: 'id',
    user_id: {
      type: 'integer',
      notNull: true,
      references: 'users(id)',
      onDelete: 'CASCADE',
    },
    knowledge_id: {
      type: 'integer',
      notNull: true,
      references: 'knowledge(id)',
      onDelete: 'CASCADE',
    },
    knowledge_type: {
      type: 'varchar(20)',
      notNull: true,
    },
    times_tested: {
      type: 'integer',
      default: 0,
    },
    times_correct: {
      type: 'integer',
      default: 0,
    },
    times_incorrect: {
      type: 'integer',
      default: 0,
    },
    last_tested_at: 'timestamp',
    mastery_score: 'decimal(5,2)', // 0-100
    consecutive_correct: {
      type: 'integer',
      default: 0,
    },
    consecutive_incorrect: {
      type: 'integer',
      default: 0,
    },
    updated_at: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
  });

  pgm.addConstraint('user_knowledge_progress', 'unique_user_knowledge', {
    unique: ['user_id', 'knowledge_id'],
  });

  pgm.createIndex('user_knowledge_progress', 'user_id');
  pgm.createIndex('user_knowledge_progress', ['user_id', 'mastery_score']);

  // Flexible event logging for future analytics (JSONB for flexibility)
  pgm.createTable('analytics_events', {
    id: 'id',
    user_id: {
      type: 'integer',
      references: 'users(id)',
      onDelete: 'CASCADE',
    },
    session_id: {
      type: 'integer',
      references: 'quiz_sessions(id)',
      onDelete: 'CASCADE',
    },
    event_type: {
      type: 'varchar(100)',
      notNull: true,
    },
    event_data: 'jsonb',
    created_at: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
  });

  pgm.createIndex('analytics_events', 'user_id');
  pgm.createIndex('analytics_events', 'session_id');
  pgm.createIndex('analytics_events', 'event_type');
  pgm.createIndex('analytics_events', 'event_data', { method: 'gin' }); // GIN index for JSONB queries
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
  // Drop tables in reverse order to respect foreign key constraints
  pgm.dropTable('analytics_events');
  pgm.dropTable('user_knowledge_progress');
  pgm.dropTable('answer_option_components');
  pgm.dropTable('answer_options');
  pgm.dropTable('question_knowledge_sources');
  pgm.dropTable('questions');
  pgm.dropTable('quiz_sessions');
  pgm.dropTable('knowledge');
  pgm.dropTable('user_pack_subscriptions');
  pgm.dropTable('content_packs');
  pgm.dropTable('users');
};
