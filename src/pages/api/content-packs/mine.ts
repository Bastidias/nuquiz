/**
 * GET /api/content-packs/mine
 *
 * Get content packs created by the authenticated admin.
 *
 * @protected (requires admin or superadmin role)
 */

import type { NextApiResponse } from 'next';
import { withAdmin, type AuthenticatedRequest } from '@/lib/auth-middleware';
import { toAppError } from '@/lib/errors';
import { findByCreator } from '@/db/contentPacks';

async function handler(req: AuthenticatedRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Handle env-admin (not in database)
    if (req.session.user.id === 'env-admin') {
      return res.status(200).json({ data: [], count: 0 });
    }

    const userId = parseInt(req.session.user.id);
    const packs = await findByCreator(userId);

    return res.status(200).json({
      data: packs,
      count: packs.length,
    });
  } catch (error) {
    const appError = toAppError(error);
    return res.status(appError.statusCode).json(appError.toJSON());
  }
}

export default withAdmin(handler);
