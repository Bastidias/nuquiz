/**
 * API Tests for POST /api/users/register
 *
 * Following RITEway principles and NO MOCKS philosophy.
 * Tests against real database.
 */

import { strict as assert } from 'assert';
import { describe, it, afterEach } from '@jest/globals';
import { createMocks } from 'node-mocks-http';
import type { NextApiRequest, NextApiResponse } from 'next';
import handler from '../users/register';
import * as users from '@/db/users';
import { query } from '@/db/connection';

// Test cleanup
afterEach(async () => {
  await query('DELETE FROM answer_option_components');
  await query('DELETE FROM answer_options');
  await query('DELETE FROM question_knowledge_sources');
  await query('DELETE FROM questions');
  await query('DELETE FROM quiz_sessions');
  await query('DELETE FROM users');
});

describe('POST /api/users/register', () => {
  // ============================================================================
  // Successful Registration
  // ============================================================================

  it('given valid email and password, creates user with student role', async () => {
    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: 'POST',
      body: {
        email: 'test@example.com',
        password: 'SecurePass123!',
      },
    });

    await handler(req, res);

    assert.equal(res._getStatusCode(), 201);
    const body = JSON.parse(res._getData());
    assert.ok(body.data.user.id);
    assert.equal(body.data.user.email, 'test@example.com');
    assert.equal(body.data.user.role, 'student');

    // Verify in database
    const dbUser = await users.findByEmail('test@example.com');
    assert.ok(dbUser);
    assert.equal(dbUser.email, 'test@example.com');
    assert.equal(dbUser.role, 'student');
    assert.ok(dbUser.password_hash);
  });

  it('given email and username, creates user with both', async () => {
    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: 'POST',
      body: {
        email: 'test@example.com',
        username: 'testuser',
        password: 'SecurePass123!',
      },
    });

    await handler(req, res);

    assert.equal(res._getStatusCode(), 201);
    const body = JSON.parse(res._getData());
    assert.equal(body.data.user.username, 'testuser');

    // Verify in database
    const dbUser = await users.findByUsername('testuser');
    assert.ok(dbUser);
    assert.equal(dbUser.email, 'test@example.com');
  });

  it('given weak password, creates user but returns warning', async () => {
    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: 'POST',
      body: {
        email: 'test@example.com',
        password: 'password',
      },
    });

    await handler(req, res);

    assert.equal(res._getStatusCode(), 201);
    const body = JSON.parse(res._getData());
    assert.ok(body.passwordWarning);
    assert.ok(body.passwordWarning.warning.includes('Password strength'));
  });

  // ============================================================================
  // Validation Errors
  // ============================================================================

  it('given invalid email, returns 400', async () => {
    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: 'POST',
      body: {
        email: 'not-an-email',
        password: 'SecurePass123!',
      },
    });

    await handler(req, res);

    assert.equal(res._getStatusCode(), 400);
    const body = JSON.parse(res._getData());
    assert.equal(body.message, 'Invalid input');
  });

  it('given password too short, returns 400', async () => {
    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: 'POST',
      body: {
        email: 'test@example.com',
        password: 'short',
      },
    });

    await handler(req, res);

    assert.equal(res._getStatusCode(), 400);
    const body = JSON.parse(res._getData());
    assert.equal(body.message, 'Invalid input');
  });

  it('given missing email, returns 400', async () => {
    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: 'POST',
      body: {
        password: 'SecurePass123!',
      },
    });

    await handler(req, res);

    assert.equal(res._getStatusCode(), 400);
  });

  it('given missing password, returns 400', async () => {
    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: 'POST',
      body: {
        email: 'test@example.com',
      },
    });

    await handler(req, res);

    assert.equal(res._getStatusCode(), 400);
  });

  // ============================================================================
  // Duplicate Prevention
  // ============================================================================

  it('given duplicate email, returns 409', async () => {
    // Create user first
    await users.create({
      email: 'test@example.com',
      password_hash: 'hash',
    });

    // Try to register with same email
    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: 'POST',
      body: {
        email: 'test@example.com',
        password: 'SecurePass123!',
      },
    });

    await handler(req, res);

    assert.equal(res._getStatusCode(), 409);
    const body = JSON.parse(res._getData());
    assert.ok(body.message.includes('Email already registered'));
  });

  it('given duplicate username, returns 409', async () => {
    // Create user first
    await users.create({
      email: 'user1@example.com',
      username: 'testuser',
      password_hash: 'hash',
    });

    // Try to register with same username
    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: 'POST',
      body: {
        email: 'user2@example.com',
        username: 'testuser',
        password: 'SecurePass123!',
      },
    });

    await handler(req, res);

    assert.equal(res._getStatusCode(), 409);
    const body = JSON.parse(res._getData());
    assert.ok(body.message.includes('Username already taken'));
  });

  it('given duplicate email with different case, returns 409', async () => {
    await users.create({
      email: 'test@example.com',
      password_hash: 'hash',
    });

    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: 'POST',
      body: {
        email: 'TEST@EXAMPLE.COM',
        password: 'SecurePass123!',
      },
    });

    await handler(req, res);

    assert.equal(res._getStatusCode(), 409);
  });

  // ============================================================================
  // Method Validation
  // ============================================================================

  it('given GET request, returns 405', async () => {
    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: 'GET',
    });

    await handler(req, res);

    assert.equal(res._getStatusCode(), 405);
    const body = JSON.parse(res._getData());
    assert.equal(body.error, 'Method not allowed');
  });

  // ============================================================================
  // Security
  // ============================================================================

  it('given password, does not return password in response', async () => {
    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: 'POST',
      body: {
        email: 'test@example.com',
        password: 'SecurePass123!',
      },
    });

    await handler(req, res);

    const body = JSON.parse(res._getData());
    assert.equal(body.data.user.password, undefined);
    assert.equal(body.data.user.password_hash, undefined);
  });

  it('given password, stores bcrypt hash in database', async () => {
    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: 'POST',
      body: {
        email: 'test@example.com',
        password: 'SecurePass123!',
      },
    });

    await handler(req, res);

    const dbUser = await users.findByEmail('test@example.com');
    assert.ok(dbUser?.password_hash);
    assert.ok(dbUser.password_hash.startsWith('$2'));
    assert.notEqual(dbUser.password_hash, 'SecurePass123!');
  });
});
