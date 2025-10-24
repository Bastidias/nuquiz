/**
 * API Tests for GET /api/users/me/subscriptions
 *
 * Following RITEway principles and NO MOCKS philosophy.
 * Tests against real database with real NextAuth JWT sessions.
 */

import { strict as assert } from 'assert';
import { describe, it, afterEach } from '@jest/globals';
import { createMocks } from 'node-mocks-http';
import type { NextApiRequest, NextApiResponse } from 'next';
import handler from '../users/me/subscriptions';
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

describe('GET /api/users/me/subscriptions', () => {
  // ============================================================================
  // Successful Requests
  // ============================================================================

  it('given user with no subscriptions, returns empty array', async () => {
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
    assert.deepEqual(body.data, []);
    assert.equal(body.count, 0);
  });

  it('given user with one subscription, returns that pack', async () => {
    const testUser = await users.create({
      email: 'test@example.com',
      password_hash: 'hash',
    });

    const pack = await contentPacks.create({
      name: 'Medical Terminology',
      description: 'Medical terms',
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
      headers: { cookie: sessionCookie },
    });

    await handler(req, res);

    assert.equal(res._getStatusCode(), 200);
    const body = JSON.parse(res._getData());
    assert.equal(body.data.length, 1);
    assert.equal(body.count, 1);
    assert.equal(body.data[0].id, pack.id);
    assert.equal(body.data[0].name, 'Medical Terminology');
  });

  it('given user with multiple subscriptions, returns all packs', async () => {
    const testUser = await users.create({
      email: 'test@example.com',
      password_hash: 'hash',
    });

    const pack1 = await contentPacks.create({
      name: 'Pack 1',
      description: 'First pack',
      created_by: testUser.id,
    });

    const pack2 = await contentPacks.create({
      name: 'Pack 2',
      description: 'Second pack',
      created_by: testUser.id,
    });

    const pack3 = await contentPacks.create({
      name: 'Pack 3',
      description: 'Third pack',
      created_by: testUser.id,
    });

    await contentPacks.subscribe(testUser.id, pack1.id);
    await contentPacks.subscribe(testUser.id, pack2.id);
    await contentPacks.subscribe(testUser.id, pack3.id);

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
    assert.equal(body.data.length, 3);
    assert.equal(body.count, 3);
  });

  it('given user subscribed to inactive pack, does not return it', async () => {
    const testUser = await users.create({
      email: 'test@example.com',
      password_hash: 'hash',
    });

    const activePack = await contentPacks.create({
      name: 'Active Pack',
      description: 'Active',
      created_by: testUser.id,
    });

    const inactivePack = await contentPacks.create({
      name: 'Inactive Pack',
      description: 'Inactive',
      created_by: testUser.id,
    });

    await contentPacks.update(inactivePack.id, { is_active: false });

    await contentPacks.subscribe(testUser.id, activePack.id);
    await contentPacks.subscribe(testUser.id, inactivePack.id);

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
    assert.equal(body.data.length, 1);
    assert.equal(body.data[0].name, 'Active Pack');
  });

  it('given env-admin user, returns empty array', async () => {
    const sessionCookie = await createSessionCookie({
      id: 'env-admin',
      email: 'admin@example.com',
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
    assert.deepEqual(body.data, []);
    assert.equal(body.count, 0);
  });

  // ============================================================================
  // Error Cases
  // ============================================================================

  it('given no authentication, returns 401', async () => {
    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: 'GET',
    });

    await handler(req, res);

    assert.equal(res._getStatusCode(), 401);
  });

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
});
