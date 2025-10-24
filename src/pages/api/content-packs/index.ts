/**
 * GET /api/content-packs
 *
 * Get list of all active content packs.
 *
 * @protected (requires authentication)
 */

import type { NextApiResponse } from 'next';
import { withAuth, type AuthenticatedRequest } from '@/lib/auth-middleware';
import { AppError, toAppError } from '@/lib/errors';
import { findActive } from '@/db/contentPacks';

async function handler(req: AuthenticatedRequest, res: NextApiResponse) {
  // Method check
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Fetch all active content packs
    const contentPacks = await findActive();

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
