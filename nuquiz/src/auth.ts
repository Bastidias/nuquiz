/**
 * NextAuth Configuration
 *
 * Authentication setup with credentials provider and role-based access control.
 * Following functional programming principles.
 */

import NextAuth, { type DefaultSession } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { findByEmail, findById } from './db/users.js';
import { verifyPassword } from './db/auth.js';
import { isEnvAdminCredentials, createEnvAdminUser } from './db/auth-pure.js';
import { credentialsSchema } from './lib/schemas.js';
import type { UserRole } from './db/types.js';

// Extend NextAuth types to include our custom fields
declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      role: UserRole;
      email_verified: boolean;
    } & DefaultSession['user'];
  }

  interface User {
    id: string;
    role: UserRole;
    email_verified: boolean;
  }
}

declare module '@auth/core/jwt' {
  interface JWT {
    id: string;
    role: UserRole;
    email_verified: boolean;
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        // Validate input using Zod
        const result = credentialsSchema.safeParse(credentials);

        if (!result.success) {
          return null;
        }

        const { email, password } = result.data;

        // Check environment admin credentials first
        if (isEnvAdminCredentials(email, password, process.env.ADMIN_EMAIL, process.env.ADMIN_PASSWORD)) {
          return createEnvAdminUser(email);
        }

        // Fall through to database authentication
        const user = await findByEmail(email);

        if (!user || !user.password_hash) {
          return null;
        }

        // Verify password
        const isValid = await verifyPassword(password, user.password_hash);

        if (!isValid) {
          return null;
        }

        // Return user object (will be stored in JWT)
        return {
          id: user.id.toString(),
          email: user.email,
          name: user.username,
          role: user.role,
          email_verified: user.email_verified,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // Initial sign in
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.email_verified = user.email_verified;
      }

      // Skip database refresh for environment admin (no DB record)
      if (token.id === 'env-admin') {
        return token;
      }

      // Refresh user data from database on each request
      // This ensures role changes are reflected immediately
      if (token.id) {
        const dbUser = await findById(parseInt(token.id));
        if (dbUser) {
          token.role = dbUser.role;
          token.email_verified = dbUser.email_verified;
        }
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.email_verified = token.email_verified;
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
    error: '/auth/error',
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
});

/**
 * Get current user session
 * @returns Session object or null
 */
export const getSession = auth;

/**
 * Require authentication
 * Throws error if user is not authenticated
 */
export const requireAuth = async () => {
  const session = await auth();
  if (!session?.user) {
    throw new Error('Unauthorized');
  }
  return session;
};

/**
 * Require specific role(s)
 * Throws error if user doesn't have required role
 */
export const requireRole = async (roles: UserRole | UserRole[]) => {
  const session = await requireAuth();
  const allowedRoles = Array.isArray(roles) ? roles : [roles];

  if (!allowedRoles.includes(session.user.role)) {
    throw new Error('Forbidden: insufficient permissions');
  }

  return session;
};

/**
 * Check if user has role
 * Returns false if not authenticated
 */
export const hasRole = async (role: UserRole): Promise<boolean> => {
  const session = await auth();
  return session?.user?.role === role;
};

/**
 * Check if user has any of the specified roles
 * Returns false if not authenticated
 */
export const hasAnyRole = async (roles: UserRole[]): Promise<boolean> => {
  const session = await auth();
  return session?.user ? roles.includes(session.user.role) : false;
};
