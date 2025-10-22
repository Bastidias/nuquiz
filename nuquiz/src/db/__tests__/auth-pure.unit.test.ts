/**
 * Unit Tests for auth-pure.ts
 *
 * Pure function tests - NO I/O, NO database.
 * Fast, isolated, following RITEway principles.
 */

import { strict as assert } from 'assert';
import { describe, it } from '@jest/globals';
import {
  isEnvAdminCredentials,
  createEnvAdminUser,
  checkPasswordStrength,
  calculateRetryAfter,
  shouldLockAccount,
  getIpAddress,
  getUserAgent,
  isSessionExpired,
} from '../auth-pure.js';

// ============================================================================
// isEnvAdminCredentials()
// ============================================================================

describe('isEnvAdminCredentials()', () => {
  it('given matching email and password, returns true', () => {
    const result = isEnvAdminCredentials(
      'admin@nuquiz.local',
      'admin123',
      'admin@nuquiz.local',
      'admin123'
    );

    assert.equal(result, true);
  });

  it('given case-insensitive email match, returns true', () => {
    const result = isEnvAdminCredentials(
      'ADMIN@nuquiz.local',
      'admin123',
      'admin@nuquiz.local',
      'admin123'
    );

    assert.equal(result, true);
  });

  it('given wrong email, returns false', () => {
    const result = isEnvAdminCredentials(
      'user@example.com',
      'admin123',
      'admin@nuquiz.local',
      'admin123'
    );

    assert.equal(result, false);
  });

  it('given wrong password, returns false', () => {
    const result = isEnvAdminCredentials(
      'admin@nuquiz.local',
      'wrongpassword',
      'admin@nuquiz.local',
      'admin123'
    );

    assert.equal(result, false);
  });

  it('given undefined adminEmail, returns false', () => {
    const result = isEnvAdminCredentials(
      'admin@nuquiz.local',
      'admin123',
      undefined,
      'admin123'
    );

    assert.equal(result, false);
  });

  it('given undefined adminPassword, returns false', () => {
    const result = isEnvAdminCredentials(
      'admin@nuquiz.local',
      'admin123',
      'admin@nuquiz.local',
      undefined
    );

    assert.equal(result, false);
  });
});

describe('createEnvAdminUser()', () => {
  it('given email, returns admin user with superadmin role', () => {
    const result = createEnvAdminUser('admin@nuquiz.local');

    assert.equal(result.id, 'env-admin');
    assert.equal(result.email, 'admin@nuquiz.local');
    assert.equal(result.name, 'Environment Admin');
    assert.equal(result.role, 'superadmin');
    assert.equal(result.email_verified, true);
  });

  it('given email and admin role, returns admin user with admin role', () => {
    const result = createEnvAdminUser('admin@nuquiz.local', 'admin');

    assert.equal(result.id, 'env-admin');
    assert.equal(result.email, 'admin@nuquiz.local');
    assert.equal(result.role, 'admin');
    assert.equal(result.email_verified, true);
  });
});

// ============================================================================
// checkPasswordStrength() - using zxcvbn
// ============================================================================

describe('checkPasswordStrength()', () => {
  it('given weak password, returns low score', () => {
    const result = checkPasswordStrength('password');

    assert.ok(result.score <= 2);
    assert.ok(['very weak', 'weak', 'fair'].includes(result.strength));
  });

  it('given strong password, returns high score', () => {
    const result = checkPasswordStrength('MySecureP@ssw0rd2024!');

    assert.ok(result.score >= 3);
    assert.ok(['strong', 'very strong'].includes(result.strength));
  });

  it('given very weak password, returns score 0', () => {
    const result = checkPasswordStrength('123456');

    assert.equal(result.score, 0);
    assert.equal(result.strength, 'very weak');
  });
});

// ============================================================================
// Rate Limiting
// ============================================================================

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
});

describe('shouldLockAccount()', () => {
  it('given 5 attempts with threshold 5, returns true', () => {
    const result = shouldLockAccount(5, 5);

    assert.equal(result, true);
  });

  it('given 4 attempts with threshold 5, returns false', () => {
    const result = shouldLockAccount(4, 5);

    assert.equal(result, false);
  });

  it('given 6 attempts with threshold 5, returns true', () => {
    const result = shouldLockAccount(6, 5);

    assert.equal(result, true);
  });
});

// ============================================================================
// Request Helpers
// ============================================================================

describe('getIpAddress()', () => {
  it('given x-forwarded-for header, returns first IP', () => {
    const req = {
      headers: {
        'x-forwarded-for': '192.168.1.1, 10.0.0.1',
      },
    };
    const result = getIpAddress(req);

    assert.equal(result, '192.168.1.1');
  });

  it('given no x-forwarded-for, returns socket address', () => {
    const req = {
      headers: {},
      socket: { remoteAddress: '127.0.0.1' },
    };
    const result = getIpAddress(req);

    assert.equal(result, '127.0.0.1');
  });

  it('given no headers and no socket, returns undefined', () => {
    const req = {
      headers: {},
    };
    const result = getIpAddress(req);

    assert.equal(result, undefined);
  });
});

describe('getUserAgent()', () => {
  it('given user-agent header, returns it', () => {
    const req = {
      headers: {
        'user-agent': 'Mozilla/5.0',
      },
    };
    const result = getUserAgent(req);

    assert.equal(result, 'Mozilla/5.0');
  });

  it('given no user-agent header, returns undefined', () => {
    const req = {
      headers: {},
    };
    const result = getUserAgent(req);

    assert.equal(result, undefined);
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

  it('given current time, returns false', () => {
    const now = new Date();
    const result = isSessionExpired(now);

    assert.equal(result, false);
  });
});
