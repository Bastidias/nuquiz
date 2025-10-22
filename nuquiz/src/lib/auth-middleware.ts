/**
 * Authentication Middleware Utilities
 *
 * Helper functions for protecting API routes and pages with role-based access control.
 * Following functional programming principles.
 */

import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import type { UserRole } from '../db/types.js';
import { logAuthEvent } from '../db/auth.js';
import { getIpAddress, getUserAgent } from '../db/auth-pure.js';

/**
 * Authenticated request type (immutable extension)
 */
export interface AuthenticatedRequest extends NextApiRequest {
  session: {
    user: {
      id: string;
      email: string;
      role: UserRole;
      email_verified: boolean;
    };
  };
}

/**
 * API Route handler type
 */
type ApiHandler = (req: NextApiRequest, res: NextApiResponse) => Promise<void> | void;

/**
 * Authenticated API Route handler type
 */
type AuthenticatedApiHandler = (
  req: AuthenticatedRequest,
  res: NextApiResponse
) => Promise<void> | void;

/**
 * Get session from Next.js API request
 * Helper to get auth session in API routes
 */
export const getApiSession = async (req: NextApiRequest, res: NextApiResponse) => {
  // Note: In Next.js 13+ with App Router, use auth() from auth.ts instead
  // For Pages Router, we use getServerSession
  return await getServerSession(req, res, {
    // Your NextAuth configuration would go here
    // For now, we'll return null until we wire this up properly
  });
};

/**
 * Protect API route - require authentication
 *
 * Uses immutable composition instead of mutation.
 *
 * @param handler - Authenticated API route handler
 * @returns Wrapped handler that checks authentication
 *
 * @example
 * export default withAuth(async (req, res) => {
 *   // req.session is guaranteed to exist (typed!)
 *   res.json({ userId: req.session.user.id });
 * });
 */
export const withAuth = (handler: AuthenticatedApiHandler): ApiHandler => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getApiSession(req, res);

    if (!session?.user) {
      // Log failed access attempt
      await logAuthEvent({
        event_type: 'failed_login',
        ip_address: getIpAddress(req),
        user_agent: getUserAgent(req),
        metadata: { reason: 'no_session', path: req.url },
      });

      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Create typed request with session
    const authenticatedReq = { ...req, session } as AuthenticatedRequest;

    return handler(authenticatedReq, res);
  };
};

/**
 * Protect API route - require specific role(s)
 *
 * @param roles - Required role or array of roles
 * @param handler - Authenticated API route handler
 * @returns Wrapped handler that checks role
 *
 * @example
 * export default withRole('admin', async (req, res) => {
 *   // User is guaranteed to be an admin
 *   res.json({ message: 'Admin access granted' });
 * });
 *
 * @example
 * export default withRole(['admin', 'superadmin'], async (req, res) => {
 *   // User has admin OR superadmin role
 *   res.json({ message: 'Management access granted' });
 * });
 */
export const withRole = (
  roles: UserRole | UserRole[],
  handler: AuthenticatedApiHandler
): ApiHandler => {
  const allowedRoles = Array.isArray(roles) ? roles : [roles];

  return withAuth(async (req: AuthenticatedRequest, res: NextApiResponse) => {
    // ✅ No type assertion needed - req is properly typed!
    const { session } = req;

    if (!allowedRoles.includes(session.user.role)) {
      // Log unauthorized access attempt
      await logAuthEvent({
        user_id: parseInt(session.user.id),
        event_type: 'failed_login',
        ip_address: getIpAddress(req),
        user_agent: getUserAgent(req),
        metadata: {
          reason: 'insufficient_permissions',
          required_roles: allowedRoles,
          user_role: session.user.role,
          path: req.url,
        },
      });

      return res.status(403).json({
        error: 'Forbidden',
        message: 'Insufficient permissions',
      });
    }

    return handler(req, res);
  });
};

/**
 * Admin-only route protection
 *
 * @param handler - Authenticated API route handler
 * @returns Wrapped handler that requires admin or superadmin role
 *
 * @example
 * export default withAdmin(async (req, res) => {
 *   res.json({ message: 'Admin content' });
 * });
 */
export const withAdmin = (handler: AuthenticatedApiHandler): ApiHandler => {
  return withRole(['admin', 'superadmin'], handler);
};

/**
 * Superadmin-only route protection
 *
 * @param handler - Authenticated API route handler
 * @returns Wrapped handler that requires superadmin role
 *
 * @example
 * export default withSuperAdmin(async (req, res) => {
 *   res.json({ message: 'Superadmin content' });
 * });
 */
export const withSuperAdmin = (handler: AuthenticatedApiHandler): ApiHandler => {
  return withRole('superadmin', handler);
};

/**
 * Check if user can access resource
 * Used for resource-specific permission checks
 *
 * @param userId - User ID from session
 * @param resourceOwnerId - Owner ID of the resource
 * @param allowedRoles - Roles that can access any resource
 * @returns true if user can access
 *
 * @example
 * // Check if user can edit a content pack
 * const canEdit = canAccessResource(
 *   session.user.id,
 *   contentPack.created_by,
 *   ['admin', 'superadmin']
 * );
 */
export const canAccessResource = (
  userId: string,
  resourceOwnerId: number,
  role: UserRole,
  allowedRoles: UserRole[] = ['admin', 'superadmin']
): boolean => {
  // User owns the resource
  if (parseInt(userId) === resourceOwnerId) {
    return true;
  }

  // User has privileged role
  if (allowedRoles.includes(role)) {
    return true;
  }

  return false;
};
