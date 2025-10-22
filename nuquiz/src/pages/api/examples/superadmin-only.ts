/**
 * Example: Superadmin-Only API Route
 *
 * Requires superadmin role.
 * Only superadmins can access system-wide management.
 */

import type { NextApiRequest, NextApiResponse } from 'next';
import { withSuperAdmin } from '../../../lib/auth-middleware';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = (req as any).session;

  return res.status(200).json({
    message: 'Superadmin content accessed successfully',
    user: {
      id: session.user.id,
      email: session.user.email,
      role: session.user.role,
    },
    superadminFeatures: [
      'Manage all users',
      'Assign admin roles',
      'System configuration',
      'View audit logs',
    ],
  });
};

export default withSuperAdmin(handler);
