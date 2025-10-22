-- Nuquiz MVP Data Model
-- Simplified version focused on core functionality
-- Future-proof design that allows for analytics expansion

-- ==========================================
-- CORE TABLES
-- ==========================================

-- Users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    username VARCHAR(100) UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Content packs (collections of knowledge)
CREATE TABLE content_packs (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    is_active BOOLEAN DEFAULT true,
    created_by INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- User subscriptions to content packs
CREATE TABLE user_pack_subscriptions (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    content_pack_id INTEGER REFERENCES content_packs(id) ON DELETE CASCADE,
    subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP, -- NULL for permanent access
    is_active BOOLEAN DEFAULT true,
    UNIQUE(user_id, content_pack_id)
);

-- ==========================================
-- KNOWLEDGE HIERARCHY
-- ==========================================

-- Single knowledge table with self-referential hierarchy
CREATE TABLE knowledge (
    id SERIAL PRIMARY KEY,
    parent_id INTEGER REFERENCES knowledge(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL, -- system identifier (e.g., "left_sided")
    label VARCHAR(255) NOT NULL, -- display name (e.g., "Left-sided Heart Failure")
    type VARCHAR(20) NOT NULL CHECK (type IN ('topic', 'category', 'attribute', 'fact')),
    content_pack_id INTEGER REFERENCES content_packs(id) ON DELETE CASCADE,
    order_index INTEGER DEFAULT 0, -- for consistent display ordering
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- Indexes for performance
    INDEX idx_knowledge_parent (parent_id),
    INDEX idx_knowledge_type (type),
    INDEX idx_knowledge_pack (content_pack_id)
);

-- ==========================================
-- QUIZ SESSION MANAGEMENT
-- ==========================================

-- Quiz sessions (each attempt)
CREATE TABLE quiz_sessions (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    content_pack_id INTEGER REFERENCES content_packs(id),
    started_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP,
    total_questions INTEGER DEFAULT 0,
    correct_answers INTEGER DEFAULT 0,
    score DECIMAL(5,2), -- percentage score
    session_metadata JSONB, -- Flexible field for future analytics
    
    INDEX idx_sessions_user (user_id),
    INDEX idx_sessions_pack (content_pack_id),
    INDEX idx_sessions_started (started_at)
);

-- ==========================================
-- QUESTION & ANSWER TRACKING
-- ==========================================

-- Questions generated/asked in a session
CREATE TABLE questions (
    id SERIAL PRIMARY KEY,
    session_id INTEGER REFERENCES quiz_sessions(id) ON DELETE CASCADE,
    question_text TEXT NOT NULL, -- e.g., "Select all symptoms of left-sided heart failure"
    question_type VARCHAR(50) DEFAULT 'multiple_select', -- multiple_select, single_select, etc.
    question_order INTEGER NOT NULL, -- order within the session
    
    -- Knowledge being tested (denormalized for faster queries)
    category_id INTEGER REFERENCES knowledge(id), -- primary category being tested
    attribute_id INTEGER REFERENCES knowledge(id), -- primary attribute being tested
    
    -- Timing (keep it simple for MVP)
    presented_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    answered_at TIMESTAMP,
    
    INDEX idx_questions_session (session_id),
    INDEX idx_questions_category (category_id),
    INDEX idx_questions_attribute (attribute_id)
);

-- Answer options presented for each question
CREATE TABLE answer_options (
    id SERIAL PRIMARY KEY,
    question_id INTEGER REFERENCES questions(id) ON DELETE CASCADE,
    option_order INTEGER NOT NULL, -- display order
    display_text TEXT NOT NULL, -- what the user sees
    is_correct BOOLEAN NOT NULL,
    was_selected BOOLEAN DEFAULT false,
    
    INDEX idx_options_question (question_id)
);

-- ==========================================
-- THE KEY INNOVATION: ANSWER COMPOSITION
-- ==========================================

-- Maps answer options to their knowledge components
-- This is what makes your system special - tracking complex answers
CREATE TABLE answer_option_components (
    id SERIAL PRIMARY KEY,
    answer_option_id INTEGER REFERENCES answer_options(id) ON DELETE CASCADE,
    knowledge_id INTEGER REFERENCES knowledge(id), -- the fact/category/attribute
    component_type VARCHAR(20) CHECK (component_type IN ('fact', 'category', 'attribute')),
    
    -- Track source for analysis (simplified from original)
    source_path TEXT, -- e.g., "cardiology|heart_failure|left_sided|symptoms"
    
    INDEX idx_aoc_option (answer_option_id),
    INDEX idx_aoc_knowledge (knowledge_id)
);

-- ==========================================
-- SIMPLE PROGRESS TRACKING
-- ==========================================

-- Track user performance on knowledge nodes
CREATE TABLE user_knowledge_progress (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    knowledge_id INTEGER REFERENCES knowledge(id) ON DELETE CASCADE,
    knowledge_type VARCHAR(20) NOT NULL, -- denormalized for faster queries
    
    -- Simple metrics for MVP
    times_tested INTEGER DEFAULT 0,
    times_correct INTEGER DEFAULT 0,
    last_tested_at TIMESTAMP,
    
    -- Simple mastery calculation (correct/tested * 100)
    mastery_percentage INTEGER DEFAULT 0,
    
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    UNIQUE(user_id, knowledge_id),
    INDEX idx_progress_user (user_id),
    INDEX idx_progress_knowledge (knowledge_id),
    INDEX idx_progress_mastery (user_id, mastery_percentage)
);

-- ==========================================
-- UNIFIED ANALYTICS EVENT LOG
-- ==========================================

-- Single flexible table for all analytics events
-- This replaces all the complex analytics tables for MVP
CREATE TABLE analytics_events (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    session_id INTEGER REFERENCES quiz_sessions(id),
    question_id INTEGER REFERENCES questions(id),
    
    -- Event details
    event_type VARCHAR(50) NOT NULL, -- 'question_answered', 'session_completed', 'confusion_detected', etc.
    event_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- Flexible data storage for different event types
    event_data JSONB NOT NULL,
    /* Examples:
       For 'question_answered': {
           "correct": true,
           "time_seconds": 45,
           "selected_options": [1, 3, 5],
           "correct_options": [1, 5],
           "knowledge_tested": [101, 102, 103]
       }
       For 'confusion_detected': {
           "correct_knowledge_id": 101,
           "confused_with_id": 102,
           "category_pair": ["left_sided", "right_sided"]
       }
    */
    
    INDEX idx_analytics_user (user_id),
    INDEX idx_analytics_session (session_id),
    INDEX idx_analytics_type (event_type),
    INDEX idx_analytics_timestamp (event_timestamp),
    INDEX idx_analytics_data (event_data) -- GIN index for JSONB queries
);

-- ==========================================
-- BASIC VIEWS FOR MVP
-- ==========================================

-- User's current mastery by content pack
CREATE VIEW user_pack_mastery AS
SELECT 
    ups.user_id,
    ups.content_pack_id,
    cp.name as pack_name,
    COUNT(DISTINCT ukp.knowledge_id) as nodes_attempted,
    AVG(ukp.mastery_percentage) as overall_mastery,
    MAX(ukp.last_tested_at) as last_activity
FROM user_pack_subscriptions ups
JOIN content_packs cp ON ups.content_pack_id = cp.id
LEFT JOIN knowledge k ON k.content_pack_id = cp.id
LEFT JOIN user_knowledge_progress ukp ON ukp.knowledge_id = k.id AND ukp.user_id = ups.user_id
WHERE ups.is_active = true
GROUP BY ups.user_id, ups.content_pack_id, cp.name;

-- Recent quiz performance
CREATE VIEW recent_quiz_performance AS
SELECT 
    qs.user_id,
    qs.content_pack_id,
    DATE(qs.started_at) as quiz_date,
    COUNT(*) as quizzes_taken,
    AVG(qs.score) as avg_score,
    SUM(qs.total_questions) as total_questions_answered
FROM quiz_sessions qs
WHERE qs.started_at > CURRENT_DATE - INTERVAL '30 days'
GROUP BY qs.user_id, qs.content_pack_id, DATE(qs.started_at);

-- ==========================================
-- MIGRATION NOTES FOR V2
-- ==========================================

/*
After collecting data for 30-60 days, analyze analytics_events to determine:

1. ADAPTIVE DIFFICULTY: 
   - Query patterns in event_data to find optimal difficulty progressions
   - Then create user_adaptive_state table

2. CONFUSION PATTERNS:
   - Mine confusion_detected events to build category_confusion_matrix
   - Identify which categories are most commonly confused

3. QUESTION EFFECTIVENESS:
   - Analyze question_answered events to find discrimination indices
   - Build question_effectiveness table with aggregated metrics

4. PREREQUISITES:
   - Use sequential performance data to discover learning dependencies
   - Create discovered_prerequisites table

5. SPACED REPETITION:
   - Analyze retention patterns from last_tested_at data
   - Implement proper spaced repetition algorithms

The analytics_events table captures everything needed for these future features
without committing to a specific schema before understanding real usage patterns.
*/

-- ==========================================
-- EXAMPLE QUERIES FOR MVP
-- ==========================================

/*
-- Record a question being answered
INSERT INTO analytics_events (user_id, session_id, question_id, event_type, event_data)
VALUES (
    1, 10, 100, 'question_answered',
    '{
        "correct": false,
        "time_seconds": 45,
        "selected_options": [1, 2],
        "correct_options": [2, 3],
        "knowledge_tested": [101, 102, 103],
        "confusion": {"selected": "left_sided", "correct": "right_sided"}
    }'::jsonb
);

-- Get user's weak areas
SELECT 
    k.label,
    ukp.mastery_percentage,
    ukp.times_tested,
    ukp.times_correct
FROM user_knowledge_progress ukp
JOIN knowledge k ON ukp.knowledge_id = k.id
WHERE ukp.user_id = ?
    AND ukp.mastery_percentage < 60
    AND ukp.times_tested >= 3
ORDER BY ukp.mastery_percentage ASC;

-- Find commonly missed questions (from analytics events)
SELECT 
    q.question_text,
    COUNT(*) as times_asked,
    SUM((ae.event_data->>'correct')::boolean::int) as times_correct,
    AVG((ae.event_data->>'time_seconds')::int) as avg_time
FROM analytics_events ae
JOIN questions q ON ae.question_id = q.id
WHERE ae.event_type = 'question_answered'
GROUP BY q.id, q.question_text
HAVING COUNT(*) > 10
ORDER BY (SUM((ae.event_data->>'correct')::boolean::int)::float / COUNT(*)) ASC;
*/