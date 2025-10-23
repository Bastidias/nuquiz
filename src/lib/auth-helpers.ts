/**
 * NextAuth v4 Helper Functions
 *
 * Helper functions for authentication and authorization
 */

import type { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from './nextauth-config';
import type { UserRole } from '../db/types';

/**
 * Get current user session (for API routes)
 * @returns Session object or null
 */
export const getSession = async (req: NextApiRequest, res: NextApiResponse) => {
  return await getServerSession(req, res, authOptions);
};

/**
 * Get current user session (for getServerSideProps)
 * @returns Session object or null
 */
export const getSessionSSR = async (context: GetServerSidePropsContext) => {
  return await getServerSession(context.req, context.res, authOptions);
};

/**
 * Require authentication (for API routes)
 * Throws error if user is not authenticated
 */
export const requireAuth = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession(req, res);
  if (!session?.user) {
    throw new Error('Unauthorized');
  }
  return session;
};

/**
 * Require specific role(s) (for API routes)
 * Throws error if user doesn't have required role
 */
export const requireRole = async (
  req: NextApiRequest,
  res: NextApiResponse,
  roles: UserRole | UserRole[]
) => {
  const session = await requireAuth(req, res);
  const allowedRoles = Array.isArray(roles) ? roles : [roles];

  if (!allowedRoles.includes(session.user.role)) {
    throw new Error('Forbidden: insufficient permissions');
  }

  return session;
};

/**
 * Check if user has role (for API routes)
 * Returns false if not authenticated
 */
export const hasRole = async (
  req: NextApiRequest,
  res: NextApiResponse,
  role: UserRole
): Promise<boolean> => {
  const session = await getSession(req, res);
  return session?.user?.role === role;
};

/**
 * Check if user has any of the specified roles (for API routes)
 * Returns false if not authenticated
 */
export const hasAnyRole = async (
  req: NextApiRequest,
  res: NextApiResponse,
  roles: UserRole[]
): Promise<boolean> => {
  const session = await getSession(req, res);
  return session?.user ? roles.includes(session.user.role) : false;
};
