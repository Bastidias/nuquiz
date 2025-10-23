/**
 * Example: Protected API Route
 *
 * Requires authentication but no specific role.
 * Any logged-in user can access this endpoint.
 */

import type { NextApiResponse } from 'next';
import { withAuth, type AuthenticatedRequest } from '../../../lib/auth-middleware';

const handler = async (req: AuthenticatedRequest, res: NextApiResponse) => {
  // ✅ No type assertion needed - req.session is properly typed!
  const { session } = req;

  return res.status(200).json({
    message: 'Protected content accessed successfully',
    user: {
      id: session.user.id,
      email: session.user.email,
      role: session.user.role,
    },
  });
};

export default withAuth(handler);
