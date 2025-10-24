/**
 * POST /api/content-packs/create
 *
 * Create a new content pack (admin only).
 *
 * @protected (requires admin or superadmin role)
 */

import type { NextApiResponse } from 'next';
import { withAdmin, type AuthenticatedRequest } from '@/lib/auth-middleware';
import { AppError, toAppError } from '@/lib/errors';
import { create } from '@/db/contentPacks';

async function handler(req: AuthenticatedRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, description } = req.body;

    if (!name || typeof name !== 'string' || name.trim().length < 3) {
      throw new AppError('Name must be at least 3 characters', 400);
    }

    // Handle env-admin (not in database)
    if (req.session.user.id === 'env-admin') {
      throw new AppError('Environment admin cannot create content packs. Please create a real admin user.', 403);
    }

    const userId = parseInt(req.session.user.id);

    if (isNaN(userId)) {
      throw new AppError('Invalid user ID', 400);
    }

    const pack = await create({
      name: name.trim(),
      description: description?.trim() || null,
      created_by: userId,
    });

    return res.status(201).json({ data: pack });
  } catch (error) {
    const appError = toAppError(error);
    return res.status(appError.statusCode).json(appError.toJSON());
  }
}

export default withAdmin(handler);
