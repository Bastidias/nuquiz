/**
 * Unit Tests for users-pure.ts
 *
 * Pure function tests - NO database access.
 * Fast, isolated, and following RITEway principles.
 */

import { strict as assert } from 'assert';
import { describe, it } from '@jest/globals';
import {
  buildUpdateQuery,
  validateEmail,
  validateUsername,
} from '../users-pure.js';

// ============================================================================
// buildUpdateQuery()
// ============================================================================

describe('buildUpdateQuery()', () => {
  it('given single field, returns correct SQL and params', () => {
    const result = buildUpdateQuery(1, { email: 'new@example.com' });

    assert.equal(
      result.sql,
      'UPDATE users SET email = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *'
    );
    assert.deepEqual(result.params, ['new@example.com', 1]);
  });

  it('given multiple fields, returns correct SQL with all fields', () => {
    const result = buildUpdateQuery(1, {
      email: 'new@example.com',
      username: 'newusername',
      role: 'admin',
    });

    assert.equal(
      result.sql,
      'UPDATE users SET email = $1, username = $2, role = $3, updated_at = CURRENT_TIMESTAMP WHERE id = $4 RETURNING *'
    );
    assert.deepEqual(result.params, ['new@example.com', 'newusername', 'admin', 1]);
  });

  it('given undefined values, filters them out', () => {
    const result = buildUpdateQuery(1, {
      email: 'new@example.com',
      username: undefined,
      role: 'admin',
    });

    assert.equal(
      result.sql,
      'UPDATE users SET email = $1, role = $2, updated_at = CURRENT_TIMESTAMP WHERE id = $3 RETURNING *'
    );
    assert.deepEqual(result.params, ['new@example.com', 'admin', 1]);
  });

  it('given no fields to update, throws error', () => {
    assert.throws(
      () => buildUpdateQuery(1, {}),
      /No fields to update/
    );
  });

  it('given only undefined fields, throws error', () => {
    assert.throws(
      () => buildUpdateQuery(1, { username: undefined, email: undefined }),
      /No fields to update/
    );
  });

  it('given null values, includes them in update', () => {
    const result = buildUpdateQuery(1, {
      username: null as any,
      email: 'test@example.com',
    });

    assert.equal(
      result.sql,
      'UPDATE users SET username = $1, email = $2, updated_at = CURRENT_TIMESTAMP WHERE id = $3 RETURNING *'
    );
    assert.deepEqual(result.params, [null, 'test@example.com', 1]);
  });

  it('given email_verified boolean, includes it correctly', () => {
    const result = buildUpdateQuery(1, {
      email_verified: true,
    });

    assert.equal(
      result.sql,
      'UPDATE users SET email_verified = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *'
    );
    assert.deepEqual(result.params, [true, 1]);
  });

  it('given different user ID, uses correct ID in query', () => {
    const result = buildUpdateQuery(999, { role: 'superadmin' });

    assert.equal(
      result.sql,
      'UPDATE users SET role = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *'
    );
    assert.deepEqual(result.params, ['superadmin', 999]);
  });
});

// ============================================================================
// validateEmail()
// ============================================================================

describe('validateEmail()', () => {
  it('given valid email, returns normalized email', () => {
    const result = validateEmail('user@example.com');

    assert.equal(result, 'user@example.com');
  });

  it('given email with uppercase, returns lowercase', () => {
    const result = validateEmail('User@Example.COM');

    assert.equal(result, 'user@example.com');
  });

  it('given email with whitespace, returns trimmed and lowercased', () => {
    const result = validateEmail('  User@Example.COM  ');

    assert.equal(result, 'user@example.com');
  });

  it('given invalid email (no @), returns null', () => {
    const result = validateEmail('notanemail');

    assert.equal(result, null);
  });

  it('given invalid email (no domain), returns null', () => {
    const result = validateEmail('user@');

    assert.equal(result, null);
  });

  it('given invalid email (no TLD), returns null', () => {
    const result = validateEmail('user@domain');

    assert.equal(result, null);
  });

  it('given empty string, returns null', () => {
    const result = validateEmail('');

    assert.equal(result, null);
  });

  it('given whitespace only, returns null', () => {
    const result = validateEmail('   ');

    assert.equal(result, null);
  });

  it('given non-string (number), returns null', () => {
    const result = validateEmail(123 as any);

    assert.equal(result, null);
  });

  it('given non-string (null), returns null', () => {
    const result = validateEmail(null as any);

    assert.equal(result, null);
  });

  it('given non-string (undefined), returns null', () => {
    const result = validateEmail(undefined as any);

    assert.equal(result, null);
  });

  it('given non-string (object), returns null', () => {
    const result = validateEmail({} as any);

    assert.equal(result, null);
  });
});

// ============================================================================
// validateUsername()
// ============================================================================

describe('validateUsername()', () => {
  it('given valid username, returns normalized username', () => {
    const result = validateUsername('john_doe');

    assert.equal(result, 'john_doe');
  });

  it('given username with hyphens, returns it', () => {
    const result = validateUsername('john-doe-123');

    assert.equal(result, 'john-doe-123');
  });

  it('given username with underscores, returns it', () => {
    const result = validateUsername('john_doe_123');

    assert.equal(result, 'john_doe_123');
  });

  it('given username with whitespace, returns trimmed', () => {
    const result = validateUsername('  johndoe  ');

    assert.equal(result, 'johndoe');
  });

  it('given username too short (2 chars), returns null', () => {
    const result = validateUsername('ab');

    assert.equal(result, null);
  });

  it('given username exactly 3 chars, returns it', () => {
    const result = validateUsername('abc');

    assert.equal(result, 'abc');
  });

  it('given username exactly 50 chars, returns it', () => {
    const username = 'a'.repeat(50);
    const result = validateUsername(username);

    assert.equal(result, username);
  });

  it('given username too long (51 chars), returns null', () => {
    const username = 'a'.repeat(51);
    const result = validateUsername(username);

    assert.equal(result, null);
  });

  it('given username with spaces, returns null', () => {
    const result = validateUsername('john doe');

    assert.equal(result, null);
  });

  it('given username with special chars, returns null', () => {
    const result = validateUsername('john@doe');

    assert.equal(result, null);
  });

  it('given username with emoji, returns null', () => {
    const result = validateUsername('john😀');

    assert.equal(result, null);
  });

  it('given empty string, returns null', () => {
    const result = validateUsername('');

    assert.equal(result, null);
  });

  it('given whitespace only, returns null', () => {
    const result = validateUsername('   ');

    assert.equal(result, null);
  });

  it('given non-string (number), returns null', () => {
    const result = validateUsername(123 as any);

    assert.equal(result, null);
  });

  it('given non-string (null), returns null', () => {
    const result = validateUsername(null as any);

    assert.equal(result, null);
  });

  it('given non-string (undefined), returns null', () => {
    const result = validateUsername(undefined as any);

    assert.equal(result, null);
  });
});
