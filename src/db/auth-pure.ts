/**
 * Pure Authentication Functions
 *
 * Simple, pragmatic helpers for auth logic.
 * Uses battle-tested libraries (zxcvbn) instead of reinventing wheels.
 */

import type { UserRole } from './types';
import zxcvbn from 'zxcvbn';

// ============================================================================
// Environment Admin Credentials
// ============================================================================

/**
 * Check if credentials match environment admin credentials
 */
export const isEnvAdminCredentials = (
  email: string,
  password: string,
  adminEmail: string | undefined,
  adminPassword: string | undefined
): boolean => {
  if (!adminEmail || !adminPassword) return false;
  return (
    email.toLowerCase() === adminEmail.toLowerCase() &&
    password === adminPassword
  );
};

/**
 * Create admin user object for .env-based admin login
 */
export const createEnvAdminUser = (
  email: string,
  role: UserRole = 'superadmin'
) => ({
  id: 'env-admin',
  email,
  name: 'Environment Admin',
  role,
  email_verified: true,
});

// ============================================================================
// Password Strength (using zxcvbn)
// ============================================================================

/**
 * Calculate password strength using Dropbox's zxcvbn library
 *
 * @returns Score 0-4 and feedback
 */
export const checkPasswordStrength = (password: string) => {
  const result = zxcvbn(password);
  return {
    score: result.score, // 0-4
    strength: ['very weak', 'weak', 'fair', 'strong', 'very strong'][result.score] as
      'very weak' | 'weak' | 'fair' | 'strong' | 'very strong',
    feedback: result.feedback,
    crackTime: result.crack_times_display.offline_slow_hashing_1e4_per_second,
  };
};

// ============================================================================
// Rate Limiting
// ============================================================================

/**
 * Calculate exponential backoff for rate limiting
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
 * Check if account should be locked based on failed attempts
 */
export const shouldLockAccount = (
  failedAttempts: number,
  threshold: number = 5
): boolean => failedAttempts >= threshold;

// ============================================================================
// Request Helpers
// ============================================================================

/**
 * Extract IP address from request (handles proxies)
 */
export const getIpAddress = (req: {
  headers: Record<string, string | string[] | undefined>;
  socket?: { remoteAddress?: string };
}): string | undefined => {
  const forwarded = req.headers['x-forwarded-for'];
  if (typeof forwarded === 'string') {
    return forwarded.split(',')[0]?.trim();
  }
  return req.socket?.remoteAddress;
};

/**
 * Extract user agent from request
 */
export const getUserAgent = (req: {
  headers: Record<string, string | string[] | undefined>;
}): string | undefined => {
  const ua = req.headers['user-agent'];
  return typeof ua === 'string' ? ua : undefined;
};

// ============================================================================
// Session Validation
// ============================================================================

/**
 * Check if session is expired
 */
export const isSessionExpired = (
  sessionCreatedAt: Date,
  maxAgeSeconds: number = 30 * 24 * 60 * 60 // 30 days
): boolean => {
  const sessionAge = Date.now() - sessionCreatedAt.getTime();
  return sessionAge > maxAgeSeconds * 1000;
};
