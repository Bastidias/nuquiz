/**
 * GET /api/content-packs/:id
 *
 * Get details for a specific content pack.
 *
 * @protected (requires authentication)
 */

import type { NextApiResponse } from 'next';
import { withAuth, type AuthenticatedRequest } from '@/lib/auth-middleware';
import { AppError, toAppError } from '@/lib/errors';
import { findById, hasAccess, countSubscriptions } from '@/db/contentPacks';
import { contentPackIdSchema } from '@/lib/schemas';

async function handler(req: AuthenticatedRequest, res: NextApiResponse) {
  // Method check
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Validate pack ID from URL
    const idResult = contentPackIdSchema.safeParse(req.query.id);

    if (!idResult.success) {
      throw new AppError('Invalid content pack ID', 400);
    }

    const packId = idResult.data;

    // Fetch content pack
    const pack = await findById(packId);

    if (!pack) {
      throw new AppError('Content pack not found', 404);
    }

    // Check if user has access to this pack
    const userId = parseInt(req.session.user.id);
    const userHasAccess = await hasAccess(userId, packId);

    // Get subscription count
    const subscriberCount = await countSubscriptions(packId);

    return res.status(200).json({
      data: {
        id: pack.id,
        name: pack.name,
        description: pack.description,
        is_active: pack.is_active,
        created_at: pack.created_at,
        updated_at: pack.updated_at,
        subscriber_count: subscriberCount,
        user_has_access: userHasAccess,
      },
    });
  } catch (error) {
    const appError = toAppError(error);
    return res.status(appError.statusCode).json(appError.toJSON());
  }
}

export default withAuth(handler);
