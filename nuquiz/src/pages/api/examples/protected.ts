/**
 * Example: Protected API Route
 *
 * Requires authentication but no specific role.
 * Any logged-in user can access this endpoint.
 */

import type { NextApiRequest, NextApiResponse } from 'next';
import { withAuth } from '../../../lib/auth-middleware';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = (req as any).session;

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
