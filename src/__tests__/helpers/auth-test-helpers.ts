/**
 * Authentication Test Helpers
 *
 * NO MOCKS approach - generates real NextAuth JWT session tokens for testing.
 * Uses the actual NextAuth JWT encoding, not mocks.
 */

import { encode } from 'next-auth/jwt';
import type { UserRole } from '@/db/types';

export interface TestUser {
  id: string;
  email: string;
  role: UserRole;
  email_verified?: boolean;
}

/**
 * Create a valid NextAuth session token for testing
 *
 * This uses the real NextAuth JWT encoder - NO MOCKS!
 *
 * @param user - User data to encode in the token
 * @returns JWT token string that NextAuth will accept
 */
export const createTestSessionToken = async (user: TestUser): Promise<string> => {
  const secret = process.env.NEXTAUTH_SECRET || 'development-secret-change-in-production';

  const token = await encode({
    token: {
      id: user.id,
      email: user.email,
      role: user.role,
      email_verified: user.email_verified ?? false,
      sub: user.id, // NextAuth requires 'sub' claim
    },
    secret,
    maxAge: 30 * 24 * 60 * 60, // 30 days
  });

  return token;
};

/**
 * Get the NextAuth session cookie name
 *
 * NextAuth v4 uses different cookie names based on secure/http
 */
export const getSessionCookieName = (): string => {
  // In test environment, we use http (not https), so cookie name is different
  const useSecureCookies = process.env.NEXTAUTH_URL?.startsWith('https://') ?? false;
  const cookiePrefix = useSecureCookies ? '__Secure-' : '';
  return `${cookiePrefix}next-auth.session-token`;
};

/**
 * Create session cookie header for tests
 *
 * @param user - User to create session for
 * @returns Cookie header string
 */
export const createSessionCookie = async (user: TestUser): Promise<string> => {
  const token = await createTestSessionToken(user);
  const cookieName = getSessionCookieName();
  return `${cookieName}=${token}`;
};
