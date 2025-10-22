/**
 * Pure Authentication Functions
 *
 * All functions are pure (no side effects, no I/O).
 * These handle auth-related business logic and data transformations.
 *
 * Following Eric Elliott's functional programming principles.
 */

import type { AuthEventType, NewAuthEvent, UserRole } from './types.js';

// ============================================================================
// Environment Admin Credentials
// ============================================================================

/**
 * Check if credentials match environment admin credentials
 *
 * Pure function - compares provided credentials against expected values.
 * Used to allow .env-based admin login without database.
 *
 * @param email - Email to check
 * @param password - Password to check
 * @param adminEmail - Admin email from environment
 * @param adminPassword - Admin password from environment
 * @returns true if credentials match admin, false otherwise
 *
 * @example
 * const isAdmin = isEnvAdminCredentials(
 *   'admin@nuquiz.com',
 *   'secret123',
 *   process.env.ADMIN_EMAIL,
 *   process.env.ADMIN_PASSWORD
 * );
 * // true if matches
 */
export const isEnvAdminCredentials = (
  email: string,
  password: string,
  adminEmail: string | undefined,
  adminPassword: string | undefined
): boolean => {
  if (!adminEmail || !adminPassword) {
    return false;
  }

  // Case-insensitive email comparison
  const emailMatches = email.toLowerCase() === adminEmail.toLowerCase();
  // Exact password comparison
  const passwordMatches = password === adminPassword;

  return emailMatches && passwordMatches;
};

/**
 * Create admin user object for .env-based admin login
 *
 * Pure function - constructs user object with admin/superadmin role.
 *
 * @param email - Admin email
 * @param role - Role to assign (default: superadmin)
 * @returns User object for session
 *
 * @example
 * const adminUser = createEnvAdminUser('admin@nuquiz.com');
 * // { id: 'env-admin', email: 'admin@nuquiz.com', role: 'superadmin', ... }
 */
export const createEnvAdminUser = (
  email: string,
  role: UserRole = 'superadmin'
): {
  id: string;
  email: string;
  name: string | null;
  role: UserRole;
  email_verified: boolean;
} => {
  return {
    id: 'env-admin', // Special ID to indicate this is not a DB user
    email,
    name: 'Environment Admin',
    role,
    email_verified: true, // Env admin is always verified
  };
};

// ============================================================================
// Auth Event Building
// ============================================================================

/**
 * Build authentication event data object
 *
 * @param eventType - Type of auth event
 * @param userId - Optional user ID
 * @param ipAddress - Optional IP address
 * @param userAgent - Optional user agent string
 * @param metadata - Optional metadata object
 * @returns Authentication event data
 *
 * @example
 * const eventData = buildAuthEvent(
 *   'login',
 *   123,
 *   '192.168.1.1',
 *   'Mozilla/5.0...',
 *   { method: 'credentials' }
 * );
 * // { event_type: 'login', user_id: 123, ... }
 */
export const buildAuthEvent = (
  eventType: AuthEventType,
  userId?: number,
  ipAddress?: string,
  userAgent?: string,
  metadata?: Record<string, unknown>
): NewAuthEvent => {
  return {
    event_type: eventType,
    user_id: userId,
    ip_address: ipAddress,
    user_agent: userAgent,
    metadata,
  };
};

/**
 * Build failed login event data
 *
 * @param reason - Reason for failure
 * @param email - Email used in attempt
 * @param ipAddress - IP address
 * @param userAgent - User agent
 * @returns Authentication event data
 *
 * @example
 * const eventData = buildFailedLoginEvent(
 *   'invalid_credentials',
 *   'user@example.com',
 *   '192.168.1.1',
 *   'Mozilla/5.0...'
 * );
 */
export const buildFailedLoginEvent = (
  reason: string,
  email?: string,
  ipAddress?: string,
  userAgent?: string
): NewAuthEvent => {
  return buildAuthEvent('failed_login', undefined, ipAddress, userAgent, {
    reason,
    ...(email && { email }),
  });
};

/**
 * Build successful login event data
 *
 * @param userId - User ID
 * @param ipAddress - IP address
 * @param userAgent - User agent
 * @returns Authentication event data
 *
 * @example
 * const eventData = buildSuccessfulLoginEvent(123, '192.168.1.1', 'Mozilla/5.0...');
 */
export const buildSuccessfulLoginEvent = (
  userId: number,
  ipAddress?: string,
  userAgent?: string
): NewAuthEvent => {
  return buildAuthEvent('login', userId, ipAddress, userAgent);
};

/**
 * Build logout event data
 *
 * @param userId - User ID
 * @param ipAddress - IP address
 * @param userAgent - User agent
 * @returns Authentication event data
 *
 * @example
 * const eventData = buildLogoutEvent(123, '192.168.1.1', 'Mozilla/5.0...');
 */
export const buildLogoutEvent = (
  userId: number,
  ipAddress?: string,
  userAgent?: string
): NewAuthEvent => {
  return buildAuthEvent('logout', userId, ipAddress, userAgent);
};

/**
 * Build password change event data
 *
 * @param userId - User ID
 * @param ipAddress - IP address
 * @param userAgent - User agent
 * @returns Authentication event data
 *
 * @example
 * const eventData = buildPasswordChangeEvent(123, '192.168.1.1', 'Mozilla/5.0...');
 */
export const buildPasswordChangeEvent = (
  userId: number,
  ipAddress?: string,
  userAgent?: string
): NewAuthEvent => {
  return buildAuthEvent('password_change', userId, ipAddress, userAgent);
};

/**
 * Build role change event data
 *
 * @param userId - User ID
 * @param oldRole - Previous role
 * @param newRole - New role
 * @param changedBy - ID of user who made the change
 * @param ipAddress - IP address
 * @param userAgent - User agent
 * @returns Authentication event data
 *
 * @example
 * const eventData = buildRoleChangeEvent(123, 'student', 'admin', 1, '192.168.1.1', 'Mozilla/5.0...');
 */
export const buildRoleChangeEvent = (
  userId: number,
  oldRole: string,
  newRole: string,
  changedBy: number,
  ipAddress?: string,
  userAgent?: string
): NewAuthEvent => {
  return buildAuthEvent('role_change', userId, ipAddress, userAgent, {
    old_role: oldRole,
    new_role: newRole,
    changed_by: changedBy,
  });
};

// ============================================================================
// Rate Limiting Logic
// ============================================================================

/**
 * Calculate time window for rate limiting
 *
 * @param windowMinutes - Window size in minutes
 * @returns Date object representing start of window
 *
 * @example
 * const windowStart = getRateLimitWindow(15);
 * // Date 15 minutes ago
 */
export const getRateLimitWindow = (windowMinutes: number): Date => {
  return new Date(Date.now() - windowMinutes * 60 * 1000);
};

/**
 * Check if account should be locked based on failed login count
 *
 * @param failedAttempts - Number of failed login attempts
 * @param threshold - Maximum allowed attempts (default: 5)
 * @returns true if account should be locked
 *
 * @example
 * const shouldLock = shouldLockAccount(5, 5);
 * // true
 *
 * @example
 * const shouldLock = shouldLockAccount(3, 5);
 * // false
 */
export const shouldLockAccount = (
  failedAttempts: number,
  threshold: number = 5
): boolean => {
  return failedAttempts >= threshold;
};

/**
 * Calculate retry-after seconds based on failed attempts
 *
 * Uses exponential backoff: 2^attempts seconds, capped at maxSeconds.
 *
 * @param failedAttempts - Number of failed attempts
 * @param baseSeconds - Base seconds for calculation (default: 60)
 * @param maxSeconds - Maximum retry-after value (default: 3600 = 1 hour)
 * @returns Number of seconds to wait before retry
 *
 * @example
 * const retryAfter = calculateRetryAfter(3);
 * // 480 (2^3 * 60 = 8 minutes)
 *
 * @example
 * const retryAfter = calculateRetryAfter(10);
 * // 3600 (capped at max)
 */
export const calculateRetryAfter = (
  failedAttempts: number,
  baseSeconds: number = 60,
  maxSeconds: number = 3600
): number => {
  const exponentialBackoff = Math.pow(2, failedAttempts) * baseSeconds;
  return Math.min(exponentialBackoff, maxSeconds);
};

/**
 * Check if user should be rate limited
 *
 * @param failedAttempts - Number of failed attempts in window
 * @param threshold - Rate limit threshold (default: 5)
 * @returns true if rate limited
 *
 * @example
 * const isLimited = isRateLimited(6, 5);
 * // true
 */
export const isRateLimited = (
  failedAttempts: number,
  threshold: number = 5
): boolean => {
  return failedAttempts >= threshold;
};

// ============================================================================
// Request Metadata Extraction
// ============================================================================

/**
 * Extract IP address from request headers
 *
 * Checks x-forwarded-for header first (for proxies), then falls back to socket address.
 *
 * @param headers - Request headers object
 * @param socketAddress - Socket remote address
 * @returns IP address or undefined
 *
 * @example
 * const ip = extractIpAddress(
 *   { 'x-forwarded-for': '192.168.1.1, 10.0.0.1' },
 *   '127.0.0.1'
 * );
 * // '192.168.1.1'
 */
export const extractIpAddress = (
  headers: Record<string, string | string[] | undefined>,
  socketAddress?: string
): string | undefined => {
  // Try x-forwarded-for header (set by proxies)
  const forwarded = headers['x-forwarded-for'];
  if (typeof forwarded === 'string') {
    // Take first IP if multiple
    const firstIp = forwarded.split(',')[0].trim();
    if (firstIp) return firstIp;
  }

  // Fall back to socket address
  return socketAddress;
};

/**
 * Extract user agent from request headers
 *
 * @param headers - Request headers object
 * @returns User agent string or undefined
 *
 * @example
 * const userAgent = extractUserAgent({ 'user-agent': 'Mozilla/5.0...' });
 * // 'Mozilla/5.0...'
 */
export const extractUserAgent = (
  headers: Record<string, string | string[] | undefined>
): string | undefined => {
  const userAgent = headers['user-agent'];
  return typeof userAgent === 'string' ? userAgent : undefined;
};

/**
 * Extract request metadata for auth events
 *
 * @param headers - Request headers object
 * @param socketAddress - Socket remote address
 * @returns Object with ip and userAgent
 *
 * @example
 * const metadata = extractRequestMetadata(
 *   { 'user-agent': 'Mozilla/5.0...', 'x-forwarded-for': '192.168.1.1' },
 *   '127.0.0.1'
 * );
 * // { ip: '192.168.1.1', userAgent: 'Mozilla/5.0...' }
 */
export const extractRequestMetadata = (
  headers: Record<string, string | string[] | undefined>,
  socketAddress?: string
): { ip?: string; userAgent?: string } => {
  return {
    ip: extractIpAddress(headers, socketAddress),
    userAgent: extractUserAgent(headers),
  };
};

// ============================================================================
// Session Validation
// ============================================================================

/**
 * Check if session is expired
 *
 * @param sessionCreatedAt - When session was created
 * @param maxAgeSeconds - Maximum session age in seconds (default: 30 days)
 * @returns true if expired
 *
 * @example
 * const isExpired = isSessionExpired(new Date('2024-01-01'), 86400);
 * // true (if more than 1 day old)
 */
export const isSessionExpired = (
  sessionCreatedAt: Date,
  maxAgeSeconds: number = 30 * 24 * 60 * 60 // 30 days
): boolean => {
  const now = Date.now();
  const sessionAge = now - sessionCreatedAt.getTime();
  return sessionAge > maxAgeSeconds * 1000;
};

/**
 * Calculate session expiry date
 *
 * @param createdAt - When session was created
 * @param maxAgeSeconds - Maximum session age in seconds (default: 30 days)
 * @returns Expiry date
 *
 * @example
 * const expiresAt = calculateSessionExpiry(new Date());
 * // Date 30 days from now
 */
export const calculateSessionExpiry = (
  createdAt: Date,
  maxAgeSeconds: number = 30 * 24 * 60 * 60 // 30 days
): Date => {
  return new Date(createdAt.getTime() + maxAgeSeconds * 1000);
};

// ============================================================================
// Password Strength Scoring
// ============================================================================

/**
 * Calculate password strength score (0-100)
 *
 * Scoring criteria:
 * - Length (up to 40 points)
 * - Uppercase letters (15 points)
 * - Lowercase letters (15 points)
 * - Numbers (15 points)
 * - Special characters (15 points)
 *
 * @param password - Password to score
 * @returns Score from 0-100
 *
 * @example
 * const score = calculatePasswordStrength('password');
 * // 28 (weak)
 *
 * @example
 * const score = calculatePasswordStrength('MySecure!P@ssw0rd2024');
 * // 100 (strong)
 */
export const calculatePasswordStrength = (password: string): number => {
  let score = 0;

  // Length scoring (up to 40 points)
  // 8 chars = 8 points, each additional char = 2 points, max 40
  if (password.length >= 8) {
    score += Math.min(40, 8 + (password.length - 8) * 2);
  }

  // Uppercase letters (15 points)
  if (/[A-Z]/.test(password)) score += 15;

  // Lowercase letters (15 points)
  if (/[a-z]/.test(password)) score += 15;

  // Numbers (15 points)
  if (/\d/.test(password)) score += 15;

  // Special characters (15 points)
  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score += 15;

  return Math.min(100, score);
};

/**
 * Get password strength label from score
 *
 * @param score - Password strength score (0-100)
 * @returns Strength label
 *
 * @example
 * const label = getPasswordStrengthLabel(85);
 * // 'strong'
 */
export const getPasswordStrengthLabel = (
  score: number
): 'weak' | 'medium' | 'strong' => {
  if (score >= 75) return 'strong';
  if (score >= 50) return 'medium';
  return 'weak';
};

// ============================================================================
// Auth Error Reasons
// ============================================================================

/**
 * Determine auth failure reason from error
 *
 * Maps common auth errors to user-friendly reasons.
 *
 * @param error - Error object or message
 * @returns Reason string
 *
 * @example
 * const reason = getAuthFailureReason('User not found');
 * // 'invalid_credentials'
 */
export const getAuthFailureReason = (error: Error | string): string => {
  const message = typeof error === 'string' ? error : error.message;
  const lowerMessage = message.toLowerCase();

  // Check more specific patterns first to avoid false matches
  if (lowerMessage.includes('not found')) return 'invalid_credentials';
  if (lowerMessage.includes('password')) return 'invalid_credentials';
  if (lowerMessage.includes('locked')) return 'account_locked';
  if (lowerMessage.includes('verified')) return 'email_not_verified';
  if (lowerMessage.includes('expired')) return 'session_expired';
  if (lowerMessage.includes('rate limit')) return 'rate_limited';
  if (lowerMessage.includes('email')) return 'invalid_email';

  return 'unknown';
};
