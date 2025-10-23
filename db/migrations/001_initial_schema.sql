-- ==========================================
-- NUQUIZ MVP DATABASE SCHEMA
-- Migration 001: Initial Schema
-- ==========================================

-- CORE TABLES
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    username VARCHAR(100) UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE IF NOT EXISTS content_packs (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    is_active BOOLEAN DEFAULT true,
    created_by INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE IF NOT EXISTS user_pack_subscriptions (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    content_pack_id INTEGER NOT NULL REFERENCES content_packs(id) ON DELETE CASCADE,
    subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    expires_at TIMESTAMP,
    is_active BOOLEAN DEFAULT true,
    UNIQUE(user_id, content_pack_id)
);

-- KNOWLEDGE HIERARCHY
CREATE TABLE IF NOT EXISTS knowledge (
    id SERIAL PRIMARY KEY,
    parent_id INTEGER REFERENCES knowledge(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    label VARCHAR(255) NOT NULL,
    type VARCHAR(20) NOT NULL CHECK (type IN ('topic', 'category', 'attribute', 'fact')),
    content_pack_id INTEGER NOT NULL REFERENCES content_packs(id) ON DELETE CASCADE,
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_knowledge_parent ON knowledge(parent_id);
CREATE INDEX IF NOT EXISTS idx_knowledge_type ON knowledge(type);
CREATE INDEX IF NOT EXISTS idx_knowledge_pack ON knowledge(content_pack_id);

-- QUIZ SESSION MANAGEMENT
CREATE TABLE IF NOT EXISTS quiz_sessions (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    content_pack_id INTEGER REFERENCES content_packs(id),
    started_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    completed_at TIMESTAMP,
    total_questions INTEGER DEFAULT 0,
    correct_answers INTEGER DEFAULT 0,
    score DECIMAL(5,2)
);

CREATE INDEX IF NOT EXISTS idx_sessions_user ON quiz_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_sessions_pack ON quiz_sessions(content_pack_id);

-- QUESTIONS & ANSWERS
CREATE TABLE IF NOT EXISTS questions (
    id SERIAL PRIMARY KEY,
    session_id INTEGER NOT NULL REFERENCES quiz_sessions(id) ON DELETE CASCADE,
    question_text TEXT NOT NULL,
    question_type VARCHAR(50) DEFAULT 'multiple_select',
    question_order INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    presented_at TIMESTAMP,
    answered_at TIMESTAMP,
    time_spent_seconds INTEGER
);

CREATE INDEX IF NOT EXISTS idx_questions_session ON questions(session_id);

CREATE TABLE IF NOT EXISTS question_knowledge_sources (
    id SERIAL PRIMARY KEY,
    question_id INTEGER NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
    category_id INTEGER REFERENCES knowledge(id),
    attribute_id INTEGER REFERENCES knowledge(id),
    is_primary BOOLEAN DEFAULT true
);

CREATE INDEX IF NOT EXISTS idx_qks_question ON question_knowledge_sources(question_id);

CREATE TABLE IF NOT EXISTS answer_options (
    id SERIAL PRIMARY KEY,
    question_id INTEGER NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
    option_order INTEGER NOT NULL,
    display_text TEXT NOT NULL,
    is_correct BOOLEAN NOT NULL,
    was_selected BOOLEAN DEFAULT false
);

CREATE INDEX IF NOT EXISTS idx_options_question ON answer_options(question_id);

-- KEY INNOVATION: Answer option components
CREATE TABLE IF NOT EXISTS answer_option_components (
    id SERIAL PRIMARY KEY,
    answer_option_id INTEGER NOT NULL REFERENCES answer_options(id) ON DELETE CASCADE,
    knowledge_id INTEGER NOT NULL REFERENCES knowledge(id),
    component_type VARCHAR(20) NOT NULL CHECK (component_type IN ('fact', 'category', 'attribute')),
    source_category_id INTEGER REFERENCES knowledge(id),
    source_attribute_id INTEGER REFERENCES knowledge(id)
);

CREATE INDEX IF NOT EXISTS idx_aoc_option ON answer_option_components(answer_option_id);
CREATE INDEX IF NOT EXISTS idx_aoc_knowledge ON answer_option_components(knowledge_id);

-- PROGRESS & ANALYTICS
CREATE TABLE IF NOT EXISTS user_knowledge_progress (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    knowledge_id INTEGER NOT NULL REFERENCES knowledge(id) ON DELETE CASCADE,
    knowledge_type VARCHAR(20) NOT NULL,
    times_tested INTEGER DEFAULT 0,
    times_correct INTEGER DEFAULT 0,
    times_incorrect INTEGER DEFAULT 0,
    last_tested_at TIMESTAMP,
    mastery_score DECIMAL(5,2),
    consecutive_correct INTEGER DEFAULT 0,
    consecutive_incorrect INTEGER DEFAULT 0,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    UNIQUE(user_id, knowledge_id)
);

CREATE INDEX IF NOT EXISTS idx_progress_user ON user_knowledge_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_progress_mastery ON user_knowledge_progress(user_id, mastery_score);

-- Flexible event logging with JSONB
CREATE TABLE IF NOT EXISTS analytics_events (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    session_id INTEGER REFERENCES quiz_sessions(id) ON DELETE CASCADE,
    event_type VARCHAR(100) NOT NULL,
    event_data JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_events_user ON analytics_events(user_id);
CREATE INDEX IF NOT EXISTS idx_events_session ON analytics_events(session_id);
CREATE INDEX IF NOT EXISTS idx_events_type ON analytics_events(event_type);
CREATE INDEX IF NOT EXISTS idx_events_data ON analytics_events USING gin(event_data);
