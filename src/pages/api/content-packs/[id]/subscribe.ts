/**
 * POST /api/content-packs/:id/subscribe
 *
 * Subscribe the authenticated user to a content pack.
 *
 * @protected (requires authentication)
 */

import type { NextApiResponse } from 'next';
import { withAuth, type AuthenticatedRequest } from '@/lib/auth-middleware';
import { AppError, toAppError } from '@/lib/errors';
import { findById, subscribe, getSubscription } from '@/db/contentPacks';

async function handler(req: AuthenticatedRequest, res: NextApiResponse) {
  // Method check
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Extract pack ID from query
    const { id } = req.query;

    if (!id || typeof id !== 'string') {
      throw new AppError('Invalid content pack ID', 400);
    }

    const packId = parseInt(id, 10);

    if (isNaN(packId)) {
      throw new AppError('Invalid content pack ID', 400);
    }

    // Fetch content pack
    const pack = await findById(packId);

    if (!pack) {
      throw new AppError('Content pack not found', 404);
    }

    if (!pack.is_active) {
      throw new AppError('Content pack is not active', 400);
    }

    // Check if user is already subscribed
    const userId = parseInt(req.session.user.id);
    const existingSubscription = await getSubscription(userId, packId);

    if (existingSubscription) {
      throw new AppError('Already subscribed to this content pack', 409);
    }

    // Create subscription (lifetime access - expires_at = null)
    const subscription = await subscribe(userId, packId, null);

    return res.status(201).json({
      data: {
        id: subscription.id,
        user_id: subscription.user_id,
        content_pack_id: subscription.content_pack_id,
        subscribed_at: subscription.subscribed_at,
        expires_at: subscription.expires_at,
      },
    });
  } catch (error) {
    const appError = toAppError(error);
    return res.status(appError.statusCode).json(appError.toJSON());
  }
}

export default withAuth(handler);
