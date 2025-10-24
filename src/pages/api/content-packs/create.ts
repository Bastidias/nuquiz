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
import { createContentPackSchema } from '@/lib/schemas';

async function handler(req: AuthenticatedRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Validate request body
    const result = createContentPackSchema.safeParse(req.body);

    if (!result.success) {
      throw new AppError('Invalid input', 400, { errors: result.error.issues });
    }

    const { name, description } = result.data;

    // Handle env-admin (not in database)
    if (req.session.user.id === 'env-admin') {
      throw new AppError('Environment admin cannot create content packs. Please create a real admin user.', 403);
    }

    const userId = parseInt(req.session.user.id);

    if (isNaN(userId)) {
      throw new AppError('Invalid user ID', 400);
    }

    const pack = await create({
      name,
      description: description || null,
      created_by: userId,
    });

    return res.status(201).json({ data: pack });
  } catch (error) {
    const appError = toAppError(error);
    return res.status(appError.statusCode).json(appError.toJSON());
  }
}

export default withAdmin(handler);
