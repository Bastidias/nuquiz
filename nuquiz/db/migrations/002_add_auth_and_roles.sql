-- ==========================================
-- NUQUIZ MVP DATABASE SCHEMA
-- Migration 002: Add Authentication and Role-Based Access Control
-- ==========================================

-- Add authentication and role columns to users table
ALTER TABLE users
ADD COLUMN IF NOT EXISTS password_hash VARCHAR(255),
ADD COLUMN IF NOT EXISTS role VARCHAR(20) DEFAULT 'student' NOT NULL CHECK (role IN ('student', 'admin', 'superadmin')),
ADD COLUMN IF NOT EXISTS email_verified BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS last_login_at TIMESTAMP;

-- Create index for role-based queries
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
CREATE INDEX IF NOT EXISTS idx_users_email_verified ON users(email_verified);

-- Add comments for documentation
COMMENT ON COLUMN users.role IS 'User role: student (takes quizzes), admin (creates content), superadmin (full access)';
COMMENT ON COLUMN users.password_hash IS 'Bcrypt hashed password for credentials-based authentication';
COMMENT ON COLUMN users.email_verified IS 'Whether user has verified their email address';
COMMENT ON COLUMN users.last_login_at IS 'Timestamp of last successful login';

-- Create audit table for authentication events (security)
CREATE TABLE IF NOT EXISTS auth_events (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    event_type VARCHAR(50) NOT NULL CHECK (event_type IN ('login', 'logout', 'failed_login', 'password_change', 'role_change')),
    ip_address INET,
    user_agent TEXT,
    metadata JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_auth_events_user ON auth_events(user_id);
CREATE INDEX IF NOT EXISTS idx_auth_events_type ON auth_events(event_type);
CREATE INDEX IF NOT EXISTS idx_auth_events_created ON auth_events(created_at);

COMMENT ON TABLE auth_events IS 'Audit log for authentication and authorization events';
