/**
 * Pure Validation Functions
 *
 * All validators are pure functions with NO side effects.
 * They return validated data or null for invalid inputs.
 *
 * Following Eric Elliott's functional programming principles:
 * - No mutations
 * - No I/O
 * - Same input → same output
 * - Explicit return types
 *
 * Use these in API routes, auth flows, and anywhere input validation is needed.
 */

import type { UserRole } from '../db/types.js';

// ============================================================================
// Type Definitions
// ============================================================================

export interface ValidatedEmail {
  email: string;
  normalized: string;
}

export interface ValidatedPassword {
  password: string;
  strength: 'weak' | 'medium' | 'strong';
  issues: string[];
}

export interface ValidatedUsername {
  username: string;
  normalized: string;
}

export interface ValidatedCredentials {
  email: ValidatedEmail;
  password: ValidatedPassword;
}

// ============================================================================
// Email Validation
// ============================================================================

/**
 * Validate and normalize email address
 *
 * Rules:
 * - Must be a string
 * - Must match basic email regex
 * - Normalized to lowercase and trimmed
 *
 * @param email - Email address to validate
 * @returns Validated email object or null if invalid
 *
 * @example
 * const result = validateEmail('  User@Example.COM  ');
 * // { email: '  User@Example.COM  ', normalized: 'user@example.com' }
 *
 * @example
 * const result = validateEmail('not-an-email');
 * // null
 */
export const validateEmail = (email: unknown): ValidatedEmail | null => {
  if (typeof email !== 'string') return null;

  const trimmed = email.trim();
  if (trimmed.length === 0) return null;

  // Basic email regex (not RFC 5322 compliant, but good enough for MVP)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(trimmed)) return null;

  const normalized = trimmed.toLowerCase();

  return {
    email: trimmed,
    normalized,
  };
};

// ============================================================================
// Password Validation
// ============================================================================

/**
 * Validate password strength
 *
 * Rules:
 * - Must be a string
 * - Minimum 8 characters
 * - Strength based on:
 *   - Length (8-11 = weak, 12-15 = medium, 16+ = strong)
 *   - Uppercase letters
 *   - Lowercase letters
 *   - Numbers
 *   - Special characters
 *
 * @param password - Password to validate
 * @returns Validated password object or null if invalid
 *
 * @example
 * const result = validatePassword('password123');
 * // { password: 'password123', strength: 'weak', issues: ['No uppercase letters', ...] }
 *
 * @example
 * const result = validatePassword('MySecureP@ssw0rd2024');
 * // { password: '...', strength: 'strong', issues: [] }
 */
export const validatePassword = (password: unknown): ValidatedPassword | null => {
  if (typeof password !== 'string') return null;

  const minLength = 8;
  if (password.length < minLength) return null;

  const issues: string[] = [];
  let strengthScore = 0;

  // Length scoring
  if (password.length >= 16) {
    strengthScore += 2;
  } else if (password.length >= 12) {
    strengthScore += 1;
  }

  // Character variety scoring
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  if (hasUppercase) strengthScore += 1;
  else issues.push('No uppercase letters');

  if (hasLowercase) strengthScore += 1;
  else issues.push('No lowercase letters');

  if (hasNumbers) strengthScore += 1;
  else issues.push('No numbers');

  if (hasSpecialChars) strengthScore += 1;
  else issues.push('No special characters');

  // Determine strength
  let strength: 'weak' | 'medium' | 'strong';
  if (strengthScore >= 5) {
    strength = 'strong';
  } else if (strengthScore >= 3) {
    strength = 'medium';
  } else {
    strength = 'weak';
  }

  return {
    password,
    strength,
    issues,
  };
};

/**
 * Check if password meets minimum security requirements
 *
 * Requirements:
 * - At least 8 characters
 * - At least one uppercase letter
 * - At least one lowercase letter
 * - At least one number
 *
 * @param password - Password to check
 * @returns true if meets requirements, false otherwise
 *
 * @example
 * const isValid = meetsPasswordRequirements('Password123');
 * // true
 */
export const meetsPasswordRequirements = (password: unknown): boolean => {
  const validated = validatePassword(password);
  if (!validated) return false;

  // Must have at least uppercase, lowercase, and numbers
  const requiredIssues = ['No special characters']; // Special chars optional
  const criticalIssues = validated.issues.filter(
    (issue) => !requiredIssues.includes(issue)
  );

  return criticalIssues.length === 0;
};

// ============================================================================
// Username Validation
// ============================================================================

/**
 * Validate and normalize username
 *
 * Rules:
 * - Must be a string
 * - 3-50 characters
 * - Alphanumeric, underscores, and hyphens only
 * - Trimmed
 *
 * @param username - Username to validate
 * @returns Validated username object or null if invalid
 *
 * @example
 * const result = validateUsername('  john_doe-123  ');
 * // { username: 'john_doe-123', normalized: 'john_doe-123' }
 *
 * @example
 * const result = validateUsername('ab'); // Too short
 * // null
 */
export const validateUsername = (username: unknown): ValidatedUsername | null => {
  if (typeof username !== 'string') return null;

  const trimmed = username.trim();
  const minLength = 3;
  const maxLength = 50;

  if (trimmed.length < minLength || trimmed.length > maxLength) {
    return null;
  }

  // Only alphanumeric, underscores, and hyphens
  const usernameRegex = /^[a-zA-Z0-9_-]+$/;
  if (!usernameRegex.test(trimmed)) return null;

  return {
    username: trimmed,
    normalized: trimmed,
  };
};

// ============================================================================
// Role Validation
// ============================================================================

const VALID_ROLES: UserRole[] = ['student', 'admin', 'superadmin'];

/**
 * Validate user role
 *
 * @param role - Role to validate
 * @returns Valid role or null
 *
 * @example
 * const result = validateRole('admin');
 * // 'admin'
 *
 * @example
 * const result = validateRole('hacker');
 * // null
 */
export const validateRole = (role: unknown): UserRole | null => {
  if (typeof role !== 'string') return null;
  if (VALID_ROLES.includes(role as UserRole)) {
    return role as UserRole;
  }
  return null;
};

/**
 * Check if role is valid
 *
 * @param role - Role to check
 * @returns true if valid, false otherwise
 *
 * @example
 * const isValid = isValidRole('student');
 * // true
 */
export const isValidRole = (role: unknown): role is UserRole => {
  return validateRole(role) !== null;
};

/**
 * Check if role has admin privileges
 *
 * @param role - Role to check
 * @returns true if admin or superadmin, false otherwise
 *
 * @example
 * const isAdmin = hasAdminPrivileges('admin');
 * // true
 */
export const hasAdminPrivileges = (role: UserRole): boolean => {
  return role === 'admin' || role === 'superadmin';
};

/**
 * Check if role has superadmin privileges
 *
 * @param role - Role to check
 * @returns true if superadmin, false otherwise
 *
 * @example
 * const isSuperAdmin = hasSuperAdminPrivileges('superadmin');
 * // true
 */
export const hasSuperAdminPrivileges = (role: UserRole): boolean => {
  return role === 'superadmin';
};

// ============================================================================
// Credentials Validation
// ============================================================================

/**
 * Validate login credentials (email + password)
 *
 * @param email - Email address
 * @param password - Password
 * @returns Validated credentials or null if either is invalid
 *
 * @example
 * const result = validateCredentials('user@example.com', 'Password123');
 * // { email: {...}, password: {...} }
 *
 * @example
 * const result = validateCredentials('invalid-email', 'pw');
 * // null
 */
export const validateCredentials = (
  email: unknown,
  password: unknown
): ValidatedCredentials | null => {
  const validatedEmail = validateEmail(email);
  const validatedPassword = validatePassword(password);

  if (!validatedEmail || !validatedPassword) {
    return null;
  }

  return {
    email: validatedEmail,
    password: validatedPassword,
  };
};

/**
 * Validate registration data (email + password + optional username)
 *
 * @param email - Email address
 * @param password - Password
 * @param username - Optional username
 * @returns Validated data or null if invalid
 *
 * @example
 * const result = validateRegistration('user@example.com', 'Password123', 'johndoe');
 * // { email: {...}, password: {...}, username: {...} }
 */
export const validateRegistration = (
  email: unknown,
  password: unknown,
  username?: unknown
): {
  email: ValidatedEmail;
  password: ValidatedPassword;
  username: ValidatedUsername | null;
} | null => {
  const validatedEmail = validateEmail(email);
  const validatedPassword = validatePassword(password);

  if (!validatedEmail || !validatedPassword) {
    return null;
  }

  // Password must meet minimum requirements for registration
  if (!meetsPasswordRequirements(password)) {
    return null;
  }

  // Username is optional, but if provided, must be valid
  let validatedUsername: ValidatedUsername | null = null;
  if (username !== undefined && username !== null) {
    validatedUsername = validateUsername(username);
    if (!validatedUsername) {
      return null; // Invalid username provided
    }
  }

  return {
    email: validatedEmail,
    password: validatedPassword,
    username: validatedUsername,
  };
};

// ============================================================================
// Session Validation
// ============================================================================

/**
 * Validate session user object structure
 *
 * Ensures session.user has required fields and correct types.
 *
 * @param sessionUser - Session user object to validate
 * @returns true if valid, false otherwise
 *
 * @example
 * const isValid = isValidSessionUser({
 *   id: '123',
 *   email: 'user@example.com',
 *   role: 'student',
 *   email_verified: true
 * });
 * // true
 */
export const isValidSessionUser = (sessionUser: unknown): boolean => {
  if (typeof sessionUser !== 'object' || sessionUser === null) {
    return false;
  }

  const user = sessionUser as Record<string, unknown>;

  // Check required fields
  if (typeof user.id !== 'string') return false;
  if (typeof user.email !== 'string') return false;
  if (typeof user.email_verified !== 'boolean') return false;

  // Validate role
  if (!isValidRole(user.role)) return false;

  return true;
};

// ============================================================================
// Auth Event Validation
// ============================================================================

const VALID_AUTH_EVENT_TYPES = [
  'login',
  'logout',
  'failed_login',
  'password_change',
  'role_change',
] as const;

type AuthEventType = (typeof VALID_AUTH_EVENT_TYPES)[number];

/**
 * Validate auth event type
 *
 * @param eventType - Event type to validate
 * @returns Valid event type or null
 *
 * @example
 * const result = validateAuthEventType('login');
 * // 'login'
 */
export const validateAuthEventType = (eventType: unknown): AuthEventType | null => {
  if (typeof eventType !== 'string') return null;
  if (VALID_AUTH_EVENT_TYPES.includes(eventType as AuthEventType)) {
    return eventType as AuthEventType;
  }
  return null;
};

/**
 * Validate IP address format
 *
 * Supports IPv4 and IPv6 (basic validation).
 *
 * @param ip - IP address to validate
 * @returns Valid IP or null
 *
 * @example
 * const result = validateIpAddress('192.168.1.1');
 * // '192.168.1.1'
 */
export const validateIpAddress = (ip: unknown): string | null => {
  if (typeof ip !== 'string') return null;

  // IPv4 regex (basic)
  const ipv4Regex = /^(\d{1,3}\.){3}\d{1,3}$/;
  // IPv6 regex (basic)
  const ipv6Regex = /^([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/;

  if (ipv4Regex.test(ip) || ipv6Regex.test(ip)) {
    return ip;
  }

  return null;
};

// ============================================================================
// Sanitization Helpers
// ============================================================================

/**
 * Sanitize string input (trim and remove null bytes)
 *
 * @param input - Input to sanitize
 * @returns Sanitized string or null if invalid
 *
 * @example
 * const result = sanitizeString('  hello\0world  ');
 * // 'helloworld'
 */
export const sanitizeString = (input: unknown): string | null => {
  if (typeof input !== 'string') return null;
  // Remove null bytes and trim
  return input.replace(/\0/g, '').trim();
};

/**
 * Sanitize JSON metadata object
 *
 * Ensures object can be safely stored in JSONB column.
 * Removes undefined values and converts to plain object.
 *
 * @param metadata - Metadata object to sanitize
 * @returns Sanitized object or empty object if invalid
 *
 * @example
 * const result = sanitizeMetadata({ foo: 'bar', baz: undefined });
 * // { foo: 'bar' }
 */
export const sanitizeMetadata = (metadata: unknown): Record<string, unknown> => {
  if (typeof metadata !== 'object' || metadata === null) {
    return {};
  }

  const sanitized: Record<string, unknown> = {};
  const obj = metadata as Record<string, unknown>;

  for (const [key, value] of Object.entries(obj)) {
    // Skip undefined values
    if (value === undefined) continue;

    // Sanitize string values
    if (typeof value === 'string') {
      sanitized[key] = sanitizeString(value);
    } else {
      sanitized[key] = value;
    }
  }

  return sanitized;
};
