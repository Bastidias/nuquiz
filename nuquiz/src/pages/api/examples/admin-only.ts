/**
 * Example: Admin-Only API Route
 *
 * Requires admin or superadmin role.
 * Students cannot access this endpoint.
 */

import type { NextApiRequest, NextApiResponse } from 'next';
import { withAdmin } from '../../../lib/auth-middleware';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = (req as any).session;

  return res.status(200).json({
    message: 'Admin content accessed successfully',
    user: {
      id: session.user.id,
      email: session.user.email,
      role: session.user.role,
    },
    adminFeatures: [
      'Create content packs',
      'Manage subscriptions',
      'View user analytics',
    ],
  });
};

export default withAdmin(handler);
