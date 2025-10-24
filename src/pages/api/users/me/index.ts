/**
 * GET /api/users/me
 *
 * Get current authenticated user's profile information.
 *
 * @protected (requires authentication)
 */

import type { NextApiResponse } from 'next';
import { withAuth, type AuthenticatedRequest } from '@/lib/auth-middleware';
import { AppError, toAppError } from '@/lib/errors';
import { findById } from '@/db/users';

async function handler(req: AuthenticatedRequest, res: NextApiResponse) {
  // Method check
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { session } = req;

    // Handle env-admin user (doesn't exist in database)
    if (session.user.id === 'env-admin') {
      return res.status(200).json({
        data: {
          id: 'env-admin',
          email: session.user.email,
          username: 'Environment Admin',
          role: session.user.role,
          email_verified: session.user.email_verified,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          last_login_at: null,
        },
      });
    }

    // Fetch user from database
    const userId = parseInt(session.user.id);
    const user = await findById(userId);

    if (!user) {
      throw new AppError('User not found', 404);
    }

    // Return user profile (exclude password_hash)
    return res.status(200).json({
      data: {
        id: user.id,
        email: user.email,
        username: user.username,
        role: user.role,
        email_verified: user.email_verified,
        created_at: user.created_at,
        updated_at: user.updated_at,
        last_login_at: user.last_login_at,
      },
    });
  } catch (error) {
    const appError = toAppError(error);
    return res.status(appError.statusCode).json(appError.toJSON());
  }
}

export default withAuth(handler);
