/**
 * API Tests for POST /api/content-packs/:id/subscribe
 *
 * Following RITEway principles and NO MOCKS philosophy.
 * Tests against real database with real NextAuth JWT sessions.
 */

import { strict as assert } from 'assert';
import { describe, it, afterEach } from '@jest/globals';
import { createMocks } from 'node-mocks-http';
import type { NextApiRequest, NextApiResponse } from 'next';
import handler from '../content-packs/[id]/subscribe';
import * as users from '@/db/users';
import * as contentPacks from '@/db/contentPacks';
import { query } from '@/db/connection';
import { createSessionCookie } from '@/__tests__/helpers/auth-test-helpers';

// Test cleanup
afterEach(async () => {
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

describe('POST /api/content-packs/:id/subscribe', () => {
  // ============================================================================
  // Successful Subscriptions
  // ============================================================================

  it('given valid pack ID and authenticated user, creates subscription', async () => {
    const testUser = await users.create({
      email: 'test@example.com',
      password_hash: 'hash',
    });

    const pack = await contentPacks.create({
      name: 'Medical Terminology',
      description: 'Medical terms',
      created_by: testUser.id,
    });

    const sessionCookie = await createSessionCookie({
      id: testUser.id.toString(),
      email: testUser.email,
      role: testUser.role,
      email_verified: testUser.email_verified,
    });

    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: 'POST',
      query: { id: pack.id.toString() },
      headers: { cookie: sessionCookie },
    });

    await handler(req, res);

    assert.equal(res._getStatusCode(), 201);
    const body = JSON.parse(res._getData());
    assert.equal(body.data.user_id, testUser.id);
    assert.equal(body.data.content_pack_id, pack.id);
    assert.ok(body.data.subscribed_at);
    assert.equal(body.data.expires_at, null);
  });

  it('given subscription, user has access to pack', async () => {
    const testUser = await users.create({
      email: 'test@example.com',
      password_hash: 'hash',
    });

    const pack = await contentPacks.create({
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
      method: 'POST',
      query: { id: pack.id.toString() },
      headers: { cookie: sessionCookie },
    });

    await handler(req, res);

    // Verify user now has access
    const hasAccess = await contentPacks.hasAccess(testUser.id, pack.id);
    assert.equal(hasAccess, true);
  });

  // ============================================================================
  // Error Cases
  // ============================================================================

  it('given duplicate subscription, returns 409', async () => {
    const testUser = await users.create({
      email: 'test@example.com',
      password_hash: 'hash',
    });

    const pack = await contentPacks.create({
      name: 'Test Pack',
      description: 'Test',
      created_by: testUser.id,
    });

    // Create initial subscription
    await contentPacks.subscribe(testUser.id, pack.id);

    const sessionCookie = await createSessionCookie({
      id: testUser.id.toString(),
      email: testUser.email,
      role: testUser.role,
      email_verified: testUser.email_verified,
    });

    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: 'POST',
      query: { id: pack.id.toString() },
      headers: { cookie: sessionCookie },
    });

    await handler(req, res);

    assert.equal(res._getStatusCode(), 409);
    const body = JSON.parse(res._getData());
    assert.ok(body.message.includes('Already subscribed'));
  });

  it('given non-existent pack ID, returns 404', async () => {
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
      query: { id: '99999' },
      headers: { cookie: sessionCookie },
    });

    await handler(req, res);

    assert.equal(res._getStatusCode(), 404);
    const body = JSON.parse(res._getData());
    assert.ok(body.message.includes('Content pack not found'));
  });

  it('given inactive pack, returns 400', async () => {
    const testUser = await users.create({
      email: 'test@example.com',
      password_hash: 'hash',
    });

    const pack = await contentPacks.create({
      name: 'Inactive Pack',
      description: 'Test',
      created_by: testUser.id,
    });

    // Deactivate the pack
    await contentPacks.update(pack.id, { is_active: false });

    const sessionCookie = await createSessionCookie({
      id: testUser.id.toString(),
      email: testUser.email,
      role: testUser.role,
      email_verified: testUser.email_verified,
    });

    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: 'POST',
      query: { id: pack.id.toString() },
      headers: { cookie: sessionCookie },
    });

    await handler(req, res);

    assert.equal(res._getStatusCode(), 400);
    const body = JSON.parse(res._getData());
    assert.ok(body.message.includes('not active'));
  });

  it('given invalid pack ID (not a number), returns 400', async () => {
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
      query: { id: 'invalid' },
      headers: { cookie: sessionCookie },
    });

    await handler(req, res);

    assert.equal(res._getStatusCode(), 400);
    const body = JSON.parse(res._getData());
    assert.ok(body.message.includes('Invalid content pack ID'));
  });

  it('given no authentication, returns 401', async () => {
    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: 'POST',
      query: { id: '1' },
    });

    await handler(req, res);

    assert.equal(res._getStatusCode(), 401);
  });

  it('given GET request, returns 405', async () => {
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
      query: { id: '1' },
      headers: { cookie: sessionCookie },
    });

    await handler(req, res);

    assert.equal(res._getStatusCode(), 405);
  });
});
