/**
 * NextAuth v4 Configuration
 *
 * Authentication setup with credentials provider and role-based access control.
 */

import type { NextAuthOptions, User, Session } from 'next-auth';
import type { JWT } from 'next-auth/jwt';
import CredentialsProvider from 'next-auth/providers/credentials';
import { findByEmail, findById } from '../db/users';
import { verifyPassword } from '../db/auth';
import { isEnvAdminCredentials, createEnvAdminUser } from '../db/auth-pure';
import { credentialsSchema } from './schemas';
import type { UserRole } from '../db/types';

// Extend NextAuth types to include our custom fields
declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      role: UserRole;
      email_verified: boolean;
      email?: string | null;
      name?: string | null;
      image?: string | null;
    };
  }

  interface User {
    id: string;
    role: UserRole;
    email_verified: boolean;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    role: UserRole;
    email_verified: boolean;
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials): Promise<User | null> {
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
    async jwt({ token, user }: { token: JWT; user?: User }): Promise<JWT> {
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
    async session({ session, token }: { session: Session; token: JWT }): Promise<Session> {
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
  secret: process.env.NEXTAUTH_SECRET || 'development-secret-change-in-production',
};
