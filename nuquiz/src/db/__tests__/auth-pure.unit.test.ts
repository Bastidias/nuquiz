/**
 * Unit Tests for auth-pure.ts
 *
 * Pure function tests - NO I/O, NO database.
 * Fast, isolated, following RITEway principles.
 */

import { strict as assert } from 'assert';
import { describe, it } from '@jest/globals';
import {
  buildAuthEvent,
  buildFailedLoginEvent,
  buildSuccessfulLoginEvent,
  buildLogoutEvent,
  buildPasswordChangeEvent,
  buildRoleChangeEvent,
  getRateLimitWindow,
  shouldLockAccount,
  calculateRetryAfter,
  isRateLimited,
  extractIpAddress,
  extractUserAgent,
  extractRequestMetadata,
  isSessionExpired,
  calculateSessionExpiry,
  calculatePasswordStrength,
  getPasswordStrengthLabel,
  getAuthFailureReason,
} from '../auth-pure.js';

// ============================================================================
// buildAuthEvent()
// ============================================================================

describe('buildAuthEvent()', () => {
  it('given all parameters, returns complete event object', () => {
    const result = buildAuthEvent(
      'login',
      123,
      '192.168.1.1',
      'Mozilla/5.0',
      { foo: 'bar' }
    );

    assert.equal(result.event_type, 'login');
    assert.equal(result.user_id, 123);
    assert.equal(result.ip_address, '192.168.1.1');
    assert.equal(result.user_agent, 'Mozilla/5.0');
    assert.deepEqual(result.metadata, { foo: 'bar' });
  });

  it('given only event type, returns event with undefined fields', () => {
    const result = buildAuthEvent('logout');

    assert.equal(result.event_type, 'logout');
    assert.equal(result.user_id, undefined);
    assert.equal(result.ip_address, undefined);
    assert.equal(result.user_agent, undefined);
    assert.equal(result.metadata, undefined);
  });

  it('given partial parameters, returns event with provided fields', () => {
    const result = buildAuthEvent('login', 123);

    assert.equal(result.event_type, 'login');
    assert.equal(result.user_id, 123);
    assert.equal(result.ip_address, undefined);
  });
});

describe('buildFailedLoginEvent()', () => {
  it('given reason and email, returns failed login event', () => {
    const result = buildFailedLoginEvent(
      'invalid_credentials',
      'user@example.com',
      '192.168.1.1',
      'Mozilla/5.0'
    );

    assert.equal(result.event_type, 'failed_login');
    assert.equal(result.metadata?.reason, 'invalid_credentials');
    assert.equal(result.metadata?.email, 'user@example.com');
    assert.equal(result.ip_address, '192.168.1.1');
  });

  it('given reason only, returns event without email', () => {
    const result = buildFailedLoginEvent('rate_limited');

    assert.equal(result.event_type, 'failed_login');
    assert.equal(result.metadata?.reason, 'rate_limited');
    assert.equal(result.metadata?.email, undefined);
  });
});

describe('buildSuccessfulLoginEvent()', () => {
  it('given user ID and request info, returns login event', () => {
    const result = buildSuccessfulLoginEvent(123, '192.168.1.1', 'Mozilla/5.0');

    assert.equal(result.event_type, 'login');
    assert.equal(result.user_id, 123);
    assert.equal(result.ip_address, '192.168.1.1');
    assert.equal(result.user_agent, 'Mozilla/5.0');
  });

  it('given only user ID, returns event with undefined request info', () => {
    const result = buildSuccessfulLoginEvent(123);

    assert.equal(result.event_type, 'login');
    assert.equal(result.user_id, 123);
    assert.equal(result.ip_address, undefined);
  });
});

describe('buildLogoutEvent()', () => {
  it('given user ID, returns logout event', () => {
    const result = buildLogoutEvent(123, '192.168.1.1', 'Mozilla/5.0');

    assert.equal(result.event_type, 'logout');
    assert.equal(result.user_id, 123);
    assert.equal(result.ip_address, '192.168.1.1');
  });
});

describe('buildPasswordChangeEvent()', () => {
  it('given user ID, returns password change event', () => {
    const result = buildPasswordChangeEvent(123, '192.168.1.1', 'Mozilla/5.0');

    assert.equal(result.event_type, 'password_change');
    assert.equal(result.user_id, 123);
  });
});

describe('buildRoleChangeEvent()', () => {
  it('given role change details, returns event with metadata', () => {
    const result = buildRoleChangeEvent(
      123,
      'student',
      'admin',
      1,
      '192.168.1.1',
      'Mozilla/5.0'
    );

    assert.equal(result.event_type, 'role_change');
    assert.equal(result.user_id, 123);
    assert.equal(result.metadata?.old_role, 'student');
    assert.equal(result.metadata?.new_role, 'admin');
    assert.equal(result.metadata?.changed_by, 1);
  });
});

// ============================================================================
// Rate Limiting Functions
// ============================================================================

describe('getRateLimitWindow()', () => {
  it('given 15 minutes, returns date 15 minutes ago', () => {
    const now = Date.now();
    const result = getRateLimitWindow(15);
    const expectedTime = now - 15 * 60 * 1000;

    // Allow 1 second tolerance for test execution time
    assert.ok(Math.abs(result.getTime() - expectedTime) < 1000);
  });

  it('given 60 minutes, returns date 1 hour ago', () => {
    const now = Date.now();
    const result = getRateLimitWindow(60);
    const expectedTime = now - 60 * 60 * 1000;

    assert.ok(Math.abs(result.getTime() - expectedTime) < 1000);
  });

  it('given 0 minutes, returns current time', () => {
    const now = Date.now();
    const result = getRateLimitWindow(0);

    assert.ok(Math.abs(result.getTime() - now) < 1000);
  });
});

describe('shouldLockAccount()', () => {
  it('given 5 attempts with threshold 5, returns true', () => {
    const result = shouldLockAccount(5, 5);

    assert.equal(result, true);
  });

  it('given 6 attempts with threshold 5, returns true', () => {
    const result = shouldLockAccount(6, 5);

    assert.equal(result, true);
  });

  it('given 4 attempts with threshold 5, returns false', () => {
    const result = shouldLockAccount(4, 5);

    assert.equal(result, false);
  });

  it('given 5 attempts with default threshold, returns true', () => {
    const result = shouldLockAccount(5);

    assert.equal(result, true);
  });

  it('given 0 attempts, returns false', () => {
    const result = shouldLockAccount(0);

    assert.equal(result, false);
  });
});

describe('calculateRetryAfter()', () => {
  it('given 1 attempt, returns base seconds * 2', () => {
    const result = calculateRetryAfter(1, 60);

    assert.equal(result, 120); // 2^1 * 60
  });

  it('given 3 attempts, returns exponential backoff', () => {
    const result = calculateRetryAfter(3, 60);

    assert.equal(result, 480); // 2^3 * 60 = 8 * 60
  });

  it('given 10 attempts, returns capped at max', () => {
    const result = calculateRetryAfter(10, 60, 3600);

    assert.equal(result, 3600); // Capped at 1 hour
  });

  it('given 0 attempts, returns base seconds', () => {
    const result = calculateRetryAfter(0, 60);

    assert.equal(result, 60); // 2^0 * 60
  });
});

describe('isRateLimited()', () => {
  it('given 5 attempts with threshold 5, returns true', () => {
    const result = isRateLimited(5, 5);

    assert.equal(result, true);
  });

  it('given 4 attempts with threshold 5, returns false', () => {
    const result = isRateLimited(4, 5);

    assert.equal(result, false);
  });

  it('given 6 attempts with threshold 5, returns true', () => {
    const result = isRateLimited(6, 5);

    assert.equal(result, true);
  });
});

// ============================================================================
// Request Metadata Extraction
// ============================================================================

describe('extractIpAddress()', () => {
  it('given x-forwarded-for header, returns first IP', () => {
    const headers = {
      'x-forwarded-for': '192.168.1.1, 10.0.0.1',
    };
    const result = extractIpAddress(headers);

    assert.equal(result, '192.168.1.1');
  });

  it('given x-forwarded-for with single IP, returns it', () => {
    const headers = {
      'x-forwarded-for': '192.168.1.1',
    };
    const result = extractIpAddress(headers);

    assert.equal(result, '192.168.1.1');
  });

  it('given no x-forwarded-for, returns socket address', () => {
    const headers = {};
    const result = extractIpAddress(headers, '127.0.0.1');

    assert.equal(result, '127.0.0.1');
  });

  it('given no headers and no socket, returns undefined', () => {
    const headers = {};
    const result = extractIpAddress(headers);

    assert.equal(result, undefined);
  });

  it('given x-forwarded-for as array, returns undefined', () => {
    const headers = {
      'x-forwarded-for': ['192.168.1.1'] as any,
    };
    const result = extractIpAddress(headers);

    assert.equal(result, undefined);
  });
});

describe('extractUserAgent()', () => {
  it('given user-agent header, returns it', () => {
    const headers = {
      'user-agent': 'Mozilla/5.0',
    };
    const result = extractUserAgent(headers);

    assert.equal(result, 'Mozilla/5.0');
  });

  it('given no user-agent header, returns undefined', () => {
    const headers = {};
    const result = extractUserAgent(headers);

    assert.equal(result, undefined);
  });

  it('given user-agent as array, returns undefined', () => {
    const headers = {
      'user-agent': ['Mozilla/5.0'] as any,
    };
    const result = extractUserAgent(headers);

    assert.equal(result, undefined);
  });
});

describe('extractRequestMetadata()', () => {
  it('given headers with IP and user agent, returns both', () => {
    const headers = {
      'x-forwarded-for': '192.168.1.1',
      'user-agent': 'Mozilla/5.0',
    };
    const result = extractRequestMetadata(headers);

    assert.equal(result.ip, '192.168.1.1');
    assert.equal(result.userAgent, 'Mozilla/5.0');
  });

  it('given empty headers, returns object with undefined values', () => {
    const headers = {};
    const result = extractRequestMetadata(headers);

    assert.equal(result.ip, undefined);
    assert.equal(result.userAgent, undefined);
  });
});

// ============================================================================
// Session Validation
// ============================================================================

describe('isSessionExpired()', () => {
  it('given old session beyond max age, returns true', () => {
    const oldDate = new Date(Date.now() - 31 * 24 * 60 * 60 * 1000); // 31 days ago
    const result = isSessionExpired(oldDate, 30 * 24 * 60 * 60); // 30 day max

    assert.equal(result, true);
  });

  it('given recent session within max age, returns false', () => {
    const recentDate = new Date(Date.now() - 1 * 24 * 60 * 60 * 1000); // 1 day ago
    const result = isSessionExpired(recentDate, 30 * 24 * 60 * 60); // 30 day max

    assert.equal(result, false);
  });

  it('given session exactly at max age, returns false', () => {
    const exactDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000); // Exactly 30 days
    const result = isSessionExpired(exactDate, 30 * 24 * 60 * 60);

    assert.equal(result, false);
  });

  it('given current time, returns false', () => {
    const now = new Date();
    const result = isSessionExpired(now);

    assert.equal(result, false);
  });
});

describe('calculateSessionExpiry()', () => {
  it('given creation time, returns time plus max age', () => {
    const createdAt = new Date('2024-01-01T00:00:00Z');
    const maxAge = 30 * 24 * 60 * 60; // 30 days
    const result = calculateSessionExpiry(createdAt, maxAge);

    const expected = new Date('2024-01-31T00:00:00Z');
    assert.equal(result.getTime(), expected.getTime());
  });

  it('given current time with default max age, returns 30 days from now', () => {
    const now = new Date();
    const result = calculateSessionExpiry(now);

    const expected = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
    // Allow 1 second tolerance
    assert.ok(Math.abs(result.getTime() - expected.getTime()) < 1000);
  });
});

// ============================================================================
// Password Strength
// ============================================================================

describe('calculatePasswordStrength()', () => {
  it('given weak password (lowercase only), returns low score', () => {
    const result = calculatePasswordStrength('password');

    assert.ok(result < 50);
  });

  it('given medium password (mixed case + numbers), returns medium score', () => {
    const result = calculatePasswordStrength('Password123');

    assert.ok(result >= 50 && result < 75);
  });

  it('given strong password (all char types + long), returns high score', () => {
    const result = calculatePasswordStrength('MySecure!P@ssw0rd2024');

    assert.ok(result >= 75);
  });

  it('given very short password (8 chars), gets minimal length score', () => {
    const result = calculatePasswordStrength('Pass123!');

    assert.ok(result > 0);
  });

  it('given very long password (30+ chars), gets maximum length score', () => {
    const result = calculatePasswordStrength('A'.repeat(30) + 'a1!');

    assert.ok(result === 100);
  });
});

describe('getPasswordStrengthLabel()', () => {
  it('given score 85, returns strong', () => {
    const result = getPasswordStrengthLabel(85);

    assert.equal(result, 'strong');
  });

  it('given score 75, returns strong', () => {
    const result = getPasswordStrengthLabel(75);

    assert.equal(result, 'strong');
  });

  it('given score 60, returns medium', () => {
    const result = getPasswordStrengthLabel(60);

    assert.equal(result, 'medium');
  });

  it('given score 50, returns medium', () => {
    const result = getPasswordStrengthLabel(50);

    assert.equal(result, 'medium');
  });

  it('given score 40, returns weak', () => {
    const result = getPasswordStrengthLabel(40);

    assert.equal(result, 'weak');
  });

  it('given score 0, returns weak', () => {
    const result = getPasswordStrengthLabel(0);

    assert.equal(result, 'weak');
  });
});

// ============================================================================
// Auth Error Reasons
// ============================================================================

describe('getAuthFailureReason()', () => {
  it('given "User not found" error, returns invalid_credentials', () => {
    const result = getAuthFailureReason('User not found');

    assert.equal(result, 'invalid_credentials');
  });

  it('given "Invalid password" error, returns invalid_credentials', () => {
    const result = getAuthFailureReason('Invalid password');

    assert.equal(result, 'invalid_credentials');
  });

  it('given "Account locked" error, returns account_locked', () => {
    const result = getAuthFailureReason('Account locked');

    assert.equal(result, 'account_locked');
  });

  it('given "Email not verified" error, returns email_not_verified', () => {
    const result = getAuthFailureReason('Email not verified');

    assert.equal(result, 'email_not_verified');
  });

  it('given "Session expired" error, returns session_expired', () => {
    const result = getAuthFailureReason('Session expired');

    assert.equal(result, 'session_expired');
  });

  it('given Error object, extracts message', () => {
    const error = new Error('User not found');
    const result = getAuthFailureReason(error);

    assert.equal(result, 'invalid_credentials');
  });

  it('given unknown error, returns unknown', () => {
    const result = getAuthFailureReason('Something went wrong');

    assert.equal(result, 'unknown');
  });
});
