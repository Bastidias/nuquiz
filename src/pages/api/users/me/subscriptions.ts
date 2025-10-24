/**
 * GET /api/users/me/subscriptions
 *
 * Get all content packs the authenticated user has subscribed to.
 *
 * @protected (requires authentication)
 */

import type { NextApiResponse } from 'next';
import { withAuth, type AuthenticatedRequest } from '@/lib/auth-middleware';
import { AppError, toAppError } from '@/lib/errors';
import { getUserPacks } from '@/db/contentPacks';

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
        data: [],
        count: 0,
      });
    }

    // Fetch user's subscribed content packs
    const userId = parseInt(session.user.id);
    const contentPacks = await getUserPacks(userId);

    return res.status(200).json({
      data: contentPacks.map(pack => ({
        id: pack.id,
        name: pack.name,
        description: pack.description,
        is_active: pack.is_active,
        created_at: pack.created_at,
        updated_at: pack.updated_at,
      })),
      count: contentPacks.length,
    });
  } catch (error) {
    const appError = toAppError(error);
    return res.status(appError.statusCode).json(appError.toJSON());
  }
}

export default withAuth(handler);
