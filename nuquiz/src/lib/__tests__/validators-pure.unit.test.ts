/**
 * Unit Tests for validators-pure.ts
 *
 * Pure function tests - NO I/O, NO database.
 * Fast, isolated, following RITEway principles.
 */

import { strict as assert } from 'assert';
import { describe, it } from '@jest/globals';
import {
  validateEmail,
  validatePassword,
  meetsPasswordRequirements,
  validateUsername,
  validateRole,
  isValidRole,
  hasAdminPrivileges,
  hasSuperAdminPrivileges,
  validateCredentials,
  validateRegistration,
  isValidSessionUser,
  validateAuthEventType,
  validateIpAddress,
  sanitizeString,
  sanitizeMetadata,
} from '../validators-pure.js';

// ============================================================================
// validateEmail()
// ============================================================================

describe('validateEmail()', () => {
  it('given valid email, returns validated object', () => {
    const result = validateEmail('user@example.com');

    assert.ok(result);
    assert.equal(result.email, 'user@example.com');
    assert.equal(result.normalized, 'user@example.com');
  });

  it('given uppercase email, returns normalized lowercase', () => {
    const result = validateEmail('User@Example.COM');

    assert.ok(result);
    assert.equal(result.normalized, 'user@example.com');
  });

  it('given email with whitespace, returns trimmed and normalized', () => {
    const result = validateEmail('  User@Example.COM  ');

    assert.ok(result);
    assert.equal(result.email, 'User@Example.COM');
    assert.equal(result.normalized, 'user@example.com');
  });

  it('given invalid email (no @), returns null', () => {
    const result = validateEmail('notanemail');

    assert.equal(result, null);
  });

  it('given empty string, returns null', () => {
    const result = validateEmail('');

    assert.equal(result, null);
  });

  it('given non-string, returns null', () => {
    const result = validateEmail(123 as any);

    assert.equal(result, null);
  });
});

// ============================================================================
// validatePassword()
// ============================================================================

describe('validatePassword()', () => {
  it('given strong password, returns strong strength', () => {
    const result = validatePassword('MySecure!P@ssw0rd2024');

    assert.ok(result);
    assert.equal(result.strength, 'strong');
    assert.equal(result.issues.length, 0);
  });

  it('given weak password (lowercase only), returns weak strength with issues', () => {
    const result = validatePassword('password');

    assert.ok(result);
    assert.equal(result.strength, 'weak');
    assert.ok(result.issues.includes('No uppercase letters'));
    assert.ok(result.issues.includes('No numbers'));
    assert.ok(result.issues.includes('No special characters'));
  });

  it('given medium password, returns medium strength', () => {
    const result = validatePassword('Password123');

    assert.ok(result);
    assert.equal(result.strength, 'medium');
    assert.ok(result.issues.includes('No special characters'));
  });

  it('given password too short (7 chars), returns null', () => {
    const result = validatePassword('Pass1!');

    assert.equal(result, null);
  });

  it('given password exactly 8 chars, validates it', () => {
    const result = validatePassword('Pass123!');

    assert.ok(result);
  });

  it('given long password (16+ chars), gets strength bonus', () => {
    const result = validatePassword('PasswordWithManyCharacters123!');

    assert.ok(result);
    assert.equal(result.strength, 'strong');
  });

  it('given non-string, returns null', () => {
    const result = validatePassword(12345678 as any);

    assert.equal(result, null);
  });
});

describe('meetsPasswordRequirements()', () => {
  it('given password with uppercase, lowercase, and number, returns true', () => {
    const result = meetsPasswordRequirements('Password123');

    assert.equal(result, true);
  });

  it('given password without uppercase, returns false', () => {
    const result = meetsPasswordRequirements('password123');

    assert.equal(result, false);
  });

  it('given password without lowercase, returns false', () => {
    const result = meetsPasswordRequirements('PASSWORD123');

    assert.equal(result, false);
  });

  it('given password without numbers, returns false', () => {
    const result = meetsPasswordRequirements('PasswordOnly');

    assert.equal(result, false);
  });

  it('given password with special chars but all requirements, returns true', () => {
    const result = meetsPasswordRequirements('Password123!');

    assert.equal(result, true);
  });

  it('given too short password, returns false', () => {
    const result = meetsPasswordRequirements('Pass1');

    assert.equal(result, false);
  });
});

// ============================================================================
// validateUsername()
// ============================================================================

describe('validateUsername()', () => {
  it('given valid username, returns validated object', () => {
    const result = validateUsername('john_doe');

    assert.ok(result);
    assert.equal(result.username, 'john_doe');
    assert.equal(result.normalized, 'john_doe');
  });

  it('given username with hyphens, validates it', () => {
    const result = validateUsername('john-doe-123');

    assert.ok(result);
  });

  it('given username with whitespace, returns trimmed', () => {
    const result = validateUsername('  johndoe  ');

    assert.ok(result);
    assert.equal(result.normalized, 'johndoe');
  });

  it('given username too short (2 chars), returns null', () => {
    const result = validateUsername('ab');

    assert.equal(result, null);
  });

  it('given username too long (51 chars), returns null', () => {
    const result = validateUsername('a'.repeat(51));

    assert.equal(result, null);
  });

  it('given username with special chars, returns null', () => {
    const result = validateUsername('john@doe');

    assert.equal(result, null);
  });

  it('given non-string, returns null', () => {
    const result = validateUsername(123 as any);

    assert.equal(result, null);
  });
});

// ============================================================================
// validateRole()
// ============================================================================

describe('validateRole()', () => {
  it('given student role, returns it', () => {
    const result = validateRole('student');

    assert.equal(result, 'student');
  });

  it('given admin role, returns it', () => {
    const result = validateRole('admin');

    assert.equal(result, 'admin');
  });

  it('given superadmin role, returns it', () => {
    const result = validateRole('superadmin');

    assert.equal(result, 'superadmin');
  });

  it('given invalid role, returns null', () => {
    const result = validateRole('hacker');

    assert.equal(result, null);
  });

  it('given non-string, returns null', () => {
    const result = validateRole(123 as any);

    assert.equal(result, null);
  });
});

describe('isValidRole()', () => {
  it('given valid role, returns true', () => {
    const result = isValidRole('student');

    assert.equal(result, true);
  });

  it('given invalid role, returns false', () => {
    const result = isValidRole('invalid');

    assert.equal(result, false);
  });
});

describe('hasAdminPrivileges()', () => {
  it('given admin role, returns true', () => {
    const result = hasAdminPrivileges('admin');

    assert.equal(result, true);
  });

  it('given superadmin role, returns true', () => {
    const result = hasAdminPrivileges('superadmin');

    assert.equal(result, true);
  });

  it('given student role, returns false', () => {
    const result = hasAdminPrivileges('student');

    assert.equal(result, false);
  });
});

describe('hasSuperAdminPrivileges()', () => {
  it('given superadmin role, returns true', () => {
    const result = hasSuperAdminPrivileges('superadmin');

    assert.equal(result, true);
  });

  it('given admin role, returns false', () => {
    const result = hasSuperAdminPrivileges('admin');

    assert.equal(result, false);
  });

  it('given student role, returns false', () => {
    const result = hasSuperAdminPrivileges('student');

    assert.equal(result, false);
  });
});

// ============================================================================
// validateCredentials()
// ============================================================================

describe('validateCredentials()', () => {
  it('given valid email and password, returns validated credentials', () => {
    const result = validateCredentials('user@example.com', 'Password123');

    assert.ok(result);
    assert.equal(result.email.normalized, 'user@example.com');
    assert.equal(result.password.password, 'Password123');
  });

  it('given invalid email, returns null', () => {
    const result = validateCredentials('not-an-email', 'Password123');

    assert.equal(result, null);
  });

  it('given invalid password, returns null', () => {
    const result = validateCredentials('user@example.com', 'short');

    assert.equal(result, null);
  });

  it('given both invalid, returns null', () => {
    const result = validateCredentials('not-an-email', 'short');

    assert.equal(result, null);
  });
});

// ============================================================================
// validateRegistration()
// ============================================================================

describe('validateRegistration()', () => {
  it('given valid email and password, returns validated data', () => {
    const result = validateRegistration('user@example.com', 'Password123');

    assert.ok(result);
    assert.equal(result.email.normalized, 'user@example.com');
    assert.equal(result.password.password, 'Password123');
    assert.equal(result.username, null);
  });

  it('given valid email, password, and username, returns all validated', () => {
    const result = validateRegistration('user@example.com', 'Password123', 'johndoe');

    assert.ok(result);
    assert.ok(result.username);
    assert.equal(result.username.normalized, 'johndoe');
  });

  it('given weak password, returns null', () => {
    const result = validateRegistration('user@example.com', 'password');

    assert.equal(result, null);
  });

  it('given invalid username, returns null', () => {
    const result = validateRegistration('user@example.com', 'Password123', 'ab');

    assert.equal(result, null);
  });

  it('given invalid email, returns null', () => {
    const result = validateRegistration('not-an-email', 'Password123');

    assert.equal(result, null);
  });
});

// ============================================================================
// isValidSessionUser()
// ============================================================================

describe('isValidSessionUser()', () => {
  it('given valid session user, returns true', () => {
    const sessionUser = {
      id: '123',
      email: 'user@example.com',
      role: 'student',
      email_verified: true,
    };
    const result = isValidSessionUser(sessionUser);

    assert.equal(result, true);
  });

  it('given missing id, returns false', () => {
    const sessionUser = {
      email: 'user@example.com',
      role: 'student',
      email_verified: true,
    };
    const result = isValidSessionUser(sessionUser);

    assert.equal(result, false);
  });

  it('given invalid role, returns false', () => {
    const sessionUser = {
      id: '123',
      email: 'user@example.com',
      role: 'hacker',
      email_verified: true,
    };
    const result = isValidSessionUser(sessionUser);

    assert.equal(result, false);
  });

  it('given non-object, returns false', () => {
    const result = isValidSessionUser('not an object');

    assert.equal(result, false);
  });

  it('given null, returns false', () => {
    const result = isValidSessionUser(null);

    assert.equal(result, false);
  });
});

// ============================================================================
// validateAuthEventType()
// ============================================================================

describe('validateAuthEventType()', () => {
  it('given login event type, returns it', () => {
    const result = validateAuthEventType('login');

    assert.equal(result, 'login');
  });

  it('given logout event type, returns it', () => {
    const result = validateAuthEventType('logout');

    assert.equal(result, 'logout');
  });

  it('given failed_login event type, returns it', () => {
    const result = validateAuthEventType('failed_login');

    assert.equal(result, 'failed_login');
  });

  it('given invalid event type, returns null', () => {
    const result = validateAuthEventType('invalid_event');

    assert.equal(result, null);
  });

  it('given non-string, returns null', () => {
    const result = validateAuthEventType(123 as any);

    assert.equal(result, null);
  });
});

// ============================================================================
// validateIpAddress()
// ============================================================================

describe('validateIpAddress()', () => {
  it('given valid IPv4, returns it', () => {
    const result = validateIpAddress('192.168.1.1');

    assert.equal(result, '192.168.1.1');
  });

  it('given valid IPv6, returns it', () => {
    const result = validateIpAddress('2001:0db8:85a3:0000:0000:8a2e:0370:7334');

    assert.equal(result, '2001:0db8:85a3:0000:0000:8a2e:0370:7334');
  });

  it('given invalid IP, returns null', () => {
    const result = validateIpAddress('not-an-ip');

    assert.equal(result, null);
  });

  it('given non-string, returns null', () => {
    const result = validateIpAddress(123 as any);

    assert.equal(result, null);
  });
});

// ============================================================================
// sanitizeString()
// ============================================================================

describe('sanitizeString()', () => {
  it('given string with whitespace, returns trimmed', () => {
    const result = sanitizeString('  hello  ');

    assert.equal(result, 'hello');
  });

  it('given string with null bytes, removes them', () => {
    const result = sanitizeString('hello\0world');

    assert.equal(result, 'helloworld');
  });

  it('given string with both, removes null bytes and trims', () => {
    const result = sanitizeString('  hello\0world  ');

    assert.equal(result, 'helloworld');
  });

  it('given non-string, returns null', () => {
    const result = sanitizeString(123 as any);

    assert.equal(result, null);
  });
});

// ============================================================================
// sanitizeMetadata()
// ============================================================================

describe('sanitizeMetadata()', () => {
  it('given object with undefined values, removes them', () => {
    const result = sanitizeMetadata({
      foo: 'bar',
      baz: undefined,
      qux: 'quux',
    });

    assert.deepEqual(result, {
      foo: 'bar',
      qux: 'quux',
    });
  });

  it('given object with null bytes in strings, removes them', () => {
    const result = sanitizeMetadata({
      foo: 'hello\0world',
    });

    assert.equal(result.foo, 'helloworld');
  });

  it('given non-object, returns empty object', () => {
    const result = sanitizeMetadata('not an object');

    assert.deepEqual(result, {});
  });

  it('given null, returns empty object', () => {
    const result = sanitizeMetadata(null);

    assert.deepEqual(result, {});
  });

  it('given object with mixed types, preserves non-string values', () => {
    const result = sanitizeMetadata({
      string: 'hello',
      number: 123,
      boolean: true,
      array: [1, 2, 3],
    });

    assert.deepEqual(result, {
      string: 'hello',
      number: 123,
      boolean: true,
      array: [1, 2, 3],
    });
  });
});
