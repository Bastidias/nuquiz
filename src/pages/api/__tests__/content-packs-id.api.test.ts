/**
 * API Tests for GET /api/content-packs/:id
 *
 * Following RITEway principles and NO MOCKS philosophy.
 * Tests against real database with real NextAuth JWT sessions.
 */

import { strict as assert } from 'assert';
import { describe, it, afterEach } from '@jest/globals';
import { createMocks } from 'node-mocks-http';
import type { NextApiRequest, NextApiResponse } from 'next';
import handler from '../content-packs/[id]/index';
import * as users from '@/db/users';
import * as contentPacks from '@/db/contentPacks';
import { query } from '@/db/connection';
import { createSessionCookie } from '@/__tests__/helpers/auth-test-helpers';

// Test cleanup
afterEach(async () => {
  await query('DELETE FROM user_pack_subscriptions');
  await query('DELETE FROM content_packs');
  await query('DELETE FROM users');
});

describe('GET /api/content-packs/:id', () => {
  // ============================================================================
  // Successful Requests
  // ============================================================================

  it('given valid pack ID, returns pack details', async () => {
    const testUser = await users.create({
      email: 'test@example.com',
      password_hash: 'hash',
    });

    const pack = await contentPacks.create({
      name: 'Medical Terminology',
      description: 'Medical terms and definitions',
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
      query: { id: pack.id.toString() },
      headers: { cookie: sessionCookie },
    });

    await handler(req, res);

    assert.equal(res._getStatusCode(), 200);
    const body = JSON.parse(res._getData());
    assert.equal(body.data.id, pack.id);
    assert.equal(body.data.name, 'Medical Terminology');
    assert.equal(body.data.description, 'Medical terms and definitions');
    assert.equal(body.data.is_active, true);
    assert.ok(body.data.created_at);
    assert.ok(body.data.updated_at);
    assert.equal(body.data.subscriber_count, 0);
    assert.equal(body.data.user_has_access, false);
  });

  it('given pack user has not subscribed to, returns user_has_access false', async () => {
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
      method: 'GET',
      query: { id: pack.id.toString() },
      headers: { cookie: sessionCookie },
    });

    await handler(req, res);

    const body = JSON.parse(res._getData());
    assert.equal(body.data.user_has_access, false);
  });

  it('given pack user has subscribed to, returns user_has_access true', async () => {
    const testUser = await users.create({
      email: 'test@example.com',
      password_hash: 'hash',
    });

    const pack = await contentPacks.create({
      name: 'Test Pack',
      description: 'Test',
      created_by: testUser.id,
    });

    await contentPacks.subscribe(testUser.id, pack.id);

    const sessionCookie = await createSessionCookie({
      id: testUser.id.toString(),
      email: testUser.email,
      role: testUser.role,
      email_verified: testUser.email_verified,
    });

    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: 'GET',
      query: { id: pack.id.toString() },
      headers: { cookie: sessionCookie },
    });

    await handler(req, res);

    const body = JSON.parse(res._getData());
    assert.equal(body.data.user_has_access, true);
  });

  it('given pack with multiple subscribers, returns correct subscriber count', async () => {
    const user1 = await users.create({
      email: 'user1@example.com',
      password_hash: 'hash',
    });

    const user2 = await users.create({
      email: 'user2@example.com',
      password_hash: 'hash',
    });

    const user3 = await users.create({
      email: 'user3@example.com',
      password_hash: 'hash',
    });

    const pack = await contentPacks.create({
      name: 'Popular Pack',
      description: 'Many subscribers',
      created_by: user1.id,
    });

    await contentPacks.subscribe(user1.id, pack.id);
    await contentPacks.subscribe(user2.id, pack.id);
    await contentPacks.subscribe(user3.id, pack.id);

    const sessionCookie = await createSessionCookie({
      id: user1.id.toString(),
      email: user1.email,
      role: user1.role,
      email_verified: user1.email_verified,
    });

    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: 'GET',
      query: { id: pack.id.toString() },
      headers: { cookie: sessionCookie },
    });

    await handler(req, res);

    const body = JSON.parse(res._getData());
    assert.equal(body.data.subscriber_count, 3);
  });

  it('given inactive pack, still returns pack data', async () => {
    const testUser = await users.create({
      email: 'test@example.com',
      password_hash: 'hash',
    });

    const pack = await contentPacks.create({
      name: 'Inactive Pack',
      description: 'This is inactive',
      created_by: testUser.id,
    });

    await contentPacks.update(pack.id, { is_active: false });

    const sessionCookie = await createSessionCookie({
      id: testUser.id.toString(),
      email: testUser.email,
      role: testUser.role,
      email_verified: testUser.email_verified,
    });

    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: 'GET',
      query: { id: pack.id.toString() },
      headers: { cookie: sessionCookie },
    });

    await handler(req, res);

    assert.equal(res._getStatusCode(), 200);
    const body = JSON.parse(res._getData());
    assert.equal(body.data.is_active, false);
  });

  // ============================================================================
  // Errors
  // ============================================================================

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
      method: 'GET',
      query: { id: '999999' },
      headers: { cookie: sessionCookie },
    });

    await handler(req, res);

    assert.equal(res._getStatusCode(), 404);
    const body = JSON.parse(res._getData());
    assert.ok(body.message.includes('Content pack not found'));
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
      method: 'GET',
      query: { id: 'not-a-number' },
      headers: { cookie: sessionCookie },
    });

    await handler(req, res);

    assert.equal(res._getStatusCode(), 400);
    const body = JSON.parse(res._getData());
    assert.ok(body.message.includes('Invalid content pack ID'));
  });

  it('given missing pack ID, returns 400', async () => {
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
      query: {},
      headers: { cookie: sessionCookie },
    });

    await handler(req, res);

    assert.equal(res._getStatusCode(), 400);
  });

  // ============================================================================
  // Authentication
  // ============================================================================

  it('given no session, returns 401', async () => {
    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: 'GET',
      query: { id: '1' },
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
      query: { id: '1' },
      headers: { cookie: sessionCookie },
    });

    await handler(req, res);

    assert.equal(res._getStatusCode(), 405);
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
      query: { id: '1' },
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
      query: { id: '1' },
      headers: { cookie: sessionCookie },
    });

    await handler(req, res);

    assert.equal(res._getStatusCode(), 405);
  });
});
