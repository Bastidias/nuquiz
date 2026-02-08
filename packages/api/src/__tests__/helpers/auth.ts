/**
 * Auth test helpers.
 *
 * These utilities create mock auth contexts for integration tests.
 * The approach avoids mocking the auth middleware internals — instead
 * we create real users and sessions in the test database, then
 * include the session cookie in test requests.
 */

import type { TestDb } from "./db.js";
import {
  createAuthenticatedUser,
  createSession,
  type CreateUserOptions,
} from "./fixtures.js";

export interface TestAuthContext {
  userId: string;
  sessionId: string;
  /** Cookie header value to include in requests, e.g. "session=abc123" */
  cookieHeader: string;
}

/**
 * Creates a user + session in the test DB and returns auth context
 * that can be used in request headers.
 */
export function setupAuth(
  db: TestDb,
  userOptions: CreateUserOptions = {}
): TestAuthContext {
  const { user, session } = createAuthenticatedUser(db, userOptions);
  return {
    userId: user.id,
    sessionId: session.id,
    cookieHeader: `session=${session.id}`,
  };
}

/**
 * Creates an expired session for testing auth rejection.
 */
export function setupExpiredAuth(
  db: TestDb,
  userOptions: CreateUserOptions = {}
): TestAuthContext {
  const { user } = createAuthenticatedUser(db, userOptions);
  // Create a separate session with an expired timestamp
  const expiredSession = createSession(db, {
    userId: user.id,
    expiresAt: new Date(Date.now() - 1000).toISOString(),
  });
  return {
    userId: user.id,
    sessionId: expiredSession.id,
    cookieHeader: `session=${expiredSession.id}`,
  };
}
