/**
 * Example: Superadmin-Only API Route
 *
 * Requires superadmin role.
 * Only superadmins can access system-wide management.
 */

import type { NextApiResponse } from 'next';
import { withSuperAdmin, type AuthenticatedRequest } from '../../../lib/auth-middleware';

const handler = async (req: AuthenticatedRequest, res: NextApiResponse) => {
  // ✅ No type assertion needed - req.session is properly typed!
  const { session } = req;

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
