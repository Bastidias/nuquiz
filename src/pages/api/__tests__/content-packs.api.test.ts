/**
 * API Tests for GET /api/content-packs
 *
 * Following RITEway principles and NO MOCKS philosophy.
 * Tests against real database with real NextAuth JWT sessions.
 */

import { strict as assert } from 'assert';
import { describe, it, afterEach } from '@jest/globals';
import { createMocks } from 'node-mocks-http';
import type { NextApiRequest, NextApiResponse } from 'next';
import handler from '../content-packs/index';
import * as users from '@/db/users';
import * as contentPacks from '@/db/contentPacks';
import { query } from '@/db/connection';
import { createSessionCookie } from '@/__tests__/helpers/auth-test-helpers';

// Test cleanup
afterEach(async () => {
  // Delete in order to respect foreign keys
  await query('DELETE FROM answer_option_components');
  await query('DELETE FROM answer_options');
  await query('DELETE FROM question_knowledge_sources');
  await query('DELETE FROM questions');
  await query('DELETE FROM quiz_sessions');
  await query('DELETE FROM user_pack_subscriptions');
  await query('DELETE FROM knowledge');
  await query('DELETE FROM content_packs');
  await query('DELETE FROM users');
});

describe('GET /api/content-packs', () => {
  // ============================================================================
  // Successful Requests
  // ============================================================================

  it('given no content packs, returns empty array', async () => {
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
      method: 'GET',
      headers: { cookie: sessionCookie },
    });

    await handler(req, res);

    assert.equal(res._getStatusCode(), 200);
    const body = JSON.parse(res._getData());
    assert.equal(body.data.length, 0);
    assert.equal(body.count, 0);
  });

  it('given active content packs, returns all active packs', async () => {
    const testUser = await users.create({
      email: 'test@example.com',
      password_hash: 'hash',
    });

    await contentPacks.create({
      name: 'Medical Terminology',
      description: 'Medical terms',
      created_by: testUser.id,
    });

    await contentPacks.create({
      name: 'Computer Science',
      description: 'CS fundamentals',
      created_by: testUser.id,
    });

    await contentPacks.create({
      name: 'History',
      description: 'World history',
      created_by: testUser.id,
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
    assert.equal(body.count, 3);
    assert.equal(body.data.length, 3);

    const packNames = body.data.map((p: any) => p.name).sort();
    assert.deepEqual(packNames, ['Computer Science', 'History', 'Medical Terminology']);

    body.data.forEach((pack: any) => {
      assert.ok(pack.id);
      assert.ok(pack.name);
      assert.ok(pack.description);
      assert.equal(pack.is_active, true);
      assert.ok(pack.created_at);
      assert.ok(pack.updated_at);
    });
  });

  it('given mix of active and inactive packs, returns only active packs', async () => {
    const testUser = await users.create({
      email: 'test@example.com',
      password_hash: 'hash',
    });

    await contentPacks.create({
      name: 'Active Pack',
      description: 'This one is active',
      created_by: testUser.id,
    });

    const inactivePack = await contentPacks.create({
      name: 'Inactive Pack',
      description: 'This one is inactive',
      created_by: testUser.id,
    });

    await contentPacks.update(inactivePack.id, { is_active: false });

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
    assert.equal(body.count, 1);
    assert.equal(body.data.length, 1);
    assert.equal(body.data[0].name, 'Active Pack');
  });

  it('given content packs, returns alphabetically sorted by name', async () => {
    const testUser = await users.create({
      email: 'test@example.com',
      password_hash: 'hash',
    });

    await contentPacks.create({
      name: 'Zebra Pack',
      description: 'Last alphabetically',
      created_by: testUser.id,
    });

    await contentPacks.create({
      name: 'Alpha Pack',
      description: 'First alphabetically',
      created_by: testUser.id,
    });

    await contentPacks.create({
      name: 'Middle Pack',
      description: 'In the middle',
      created_by: testUser.id,
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
    const packNames = body.data.map((p: any) => p.name);
    assert.deepEqual(packNames, ['Alpha Pack', 'Middle Pack', 'Zebra Pack']);
  });

  it('given content packs, does not return created_by field', async () => {
    const testUser = await users.create({
      email: 'test@example.com',
      password_hash: 'hash',
    });

    await contentPacks.create({
      name: 'Test Pack',
      description: 'Test',
      created_by: testUser.id,
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
    assert.equal(body.data[0].created_by, undefined);
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

    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
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
});
