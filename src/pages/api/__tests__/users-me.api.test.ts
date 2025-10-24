/**
 * API Tests for GET /api/users/me
 *
 * Following RITEway principles and NO MOCKS philosophy.
 * Tests against real database with real NextAuth JWT sessions.
 */

import { strict as assert } from 'assert';
import { describe, it, afterEach } from '@jest/globals';
import { createMocks } from 'node-mocks-http';
import type { NextApiRequest, NextApiResponse } from 'next';
import handler from '../users/me';
import * as users from '@/db/users';
import { query } from '@/db/connection';
import { createSessionCookie } from '@/__tests__/helpers/auth-test-helpers';

// Test cleanup
afterEach(async () => {
  await query('DELETE FROM answer_option_components');
  await query('DELETE FROM answer_options');
  await query('DELETE FROM question_knowledge_sources');
  await query('DELETE FROM questions');
  await query('DELETE FROM quiz_sessions');
  await query('DELETE FROM users');
});

describe('GET /api/users/me', () => {
  // ============================================================================
  // Successful Requests
  // ============================================================================

  it('given authenticated database user, returns user profile', async () => {
    const testUser = await users.create({
      email: 'test@example.com',
      username: 'testuser',
      password_hash: 'hash',
      role: 'student',
    });

    const sessionCookie = await createSessionCookie({
      id: testUser.id.toString(),
      email: testUser.email,
      role: testUser.role,
      email_verified: testUser.email_verified,
    });

    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: 'GET',
      headers: { cookie: sessionCookie },
    });

    await handler(req, res);

    assert.equal(res._getStatusCode(), 200);
    const body = JSON.parse(res._getData());
    assert.equal(body.data.id, testUser.id);
    assert.equal(body.data.email, 'test@example.com');
    assert.equal(body.data.username, 'testuser');
    assert.equal(body.data.role, 'student');
    assert.equal(body.data.email_verified, false);
    assert.ok(body.data.created_at);
    assert.ok(body.data.updated_at);
    assert.equal(body.data.password_hash, undefined);
  });

  it('given authenticated admin user, returns admin profile', async () => {
    const adminUser = await users.create({
      email: 'admin@example.com',
      password_hash: 'hash',
      role: 'admin',
    });

    const sessionCookie = await createSessionCookie({
      id: adminUser.id.toString(),
      email: adminUser.email,
      role: adminUser.role,
      email_verified: adminUser.email_verified,
    });

    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: 'GET',
      headers: { cookie: sessionCookie },
    });

    await handler(req, res);

    assert.equal(res._getStatusCode(), 200);
    const body = JSON.parse(res._getData());
    assert.equal(body.data.role, 'admin');
    assert.equal(body.data.username, null);
  });

  it('given env-admin user, returns special env-admin profile', async () => {
    const sessionCookie = await createSessionCookie({
      id: 'env-admin',
      email: 'admin@env.com',
      role: 'superadmin',
      email_verified: true,
    });

    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: 'GET',
      headers: { cookie: sessionCookie },
    });

    await handler(req, res);

    assert.equal(res._getStatusCode(), 200);
    const body = JSON.parse(res._getData());
    assert.equal(body.data.id, 'env-admin');
    assert.equal(body.data.email, 'admin@env.com');
    assert.equal(body.data.username, 'Environment Admin');
    assert.equal(body.data.role, 'superadmin');
    assert.equal(body.data.email_verified, true);
  });

  it('given user with null username, returns null username', async () => {
    const testUser = await users.create({
      email: 'noname@example.com',
      password_hash: 'hash',
    });

    const sessionCookie = await createSessionCookie({
      id: testUser.id.toString(),
      email: testUser.email,
      role: testUser.role,
      email_verified: testUser.email_verified,
    });

    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: 'GET',
      headers: { cookie: sessionCookie },
    });

    await handler(req, res);

    assert.equal(res._getStatusCode(), 200);
    const body = JSON.parse(res._getData());
    assert.equal(body.data.username, null);
  });

  // ============================================================================
  // Authentication Errors
  // ============================================================================

  it('given no session, returns 401', async () => {
    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: 'GET',
    });

    await handler(req, res);

    assert.equal(res._getStatusCode(), 401);
    const body = JSON.parse(res._getData());
    assert.equal(body.error, 'Unauthorized');
  });

  it('given invalid session token, returns 401', async () => {
    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: 'GET',
      headers: { cookie: 'next-auth.session-token=invalid-token-123' },
    });

    await handler(req, res);

    assert.equal(res._getStatusCode(), 401);
  });

  // ============================================================================
  // User Not Found
  // ============================================================================

  it('given session for non-existent user, returns 404', async () => {
    const sessionCookie = await createSessionCookie({
      id: '999999',
      email: 'ghost@example.com',
      role: 'student',
      email_verified: false,
    });

    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: 'GET',
      headers: { cookie: sessionCookie },
    });

    await handler(req, res);

    assert.equal(res._getStatusCode(), 404);
    const body = JSON.parse(res._getData());
    assert.ok(body.message.includes('User not found'));
  });

  // ============================================================================
  // Method Validation
  // ============================================================================

  it('given POST request, returns 405', async () => {
    const testUser = await users.create({
      email: 'test@example.com',
      password_hash: 'hash',
    });

    const sessionCookie = await createSessionCookie({
      id: testUser.id.toString(),
      email: testUser.email,
      role: testUser.role,
      email_verified: testUser.email_verified,
    });

    const { req, res} = createMocks<NextApiRequest, NextApiResponse>({
      method: 'POST',
      headers: { cookie: sessionCookie },
    });

    await handler(req, res);

    assert.equal(res._getStatusCode(), 405);
    const body = JSON.parse(res._getData());
    assert.equal(body.error, 'Method not allowed');
  });

  it('given PUT request, returns 405', async () => {
    const testUser = await users.create({
      email: 'test@example.com',
      password_hash: 'hash',
    });

    const sessionCookie = await createSessionCookie({
      id: testUser.id.toString(),
      email: testUser.email,
      role: testUser.role,
      email_verified: testUser.email_verified,
    });

    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: 'PUT',
      headers: { cookie: sessionCookie },
    });

    await handler(req, res);

    assert.equal(res._getStatusCode(), 405);
  });

  it('given DELETE request, returns 405', async () => {
    const testUser = await users.create({
      email: 'test@example.com',
      password_hash: 'hash',
    });

    const sessionCookie = await createSessionCookie({
      id: testUser.id.toString(),
      email: testUser.email,
      role: testUser.role,
      email_verified: testUser.email_verified,
    });

    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: 'DELETE',
      headers: { cookie: sessionCookie },
    });

    await handler(req, res);

    assert.equal(res._getStatusCode(), 405);
  });

  // ============================================================================
  // Security
  // ============================================================================

  it('given any user, does not return password_hash', async () => {
    const testUser = await users.create({
      email: 'test@example.com',
      password_hash: 'super-secret-hash',
    });

    const sessionCookie = await createSessionCookie({
      id: testUser.id.toString(),
      email: testUser.email,
      role: testUser.role,
      email_verified: testUser.email_verified,
    });

    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: 'GET',
      headers: { cookie: sessionCookie },
    });

    await handler(req, res);

    const body = JSON.parse(res._getData());
    const responseString = JSON.stringify(body);

    assert.ok(!responseString.includes('password_hash'));
    assert.ok(!responseString.includes('super-secret-hash'));
  });
});
