/**
 * NextAuth API Route Handler
 *
 * Catch-all route for NextAuth.js authentication endpoints.
 * Handles sign in, sign out, callbacks, etc.
 */

import type { NextApiRequest, NextApiResponse } from 'next';
import { handlers } from '../../../auth';

// NextAuth v5 uses GET and POST handlers
const { GET, POST } = handlers;

// Pages Router requires a default export
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    return GET(req as any, res as any);
  }
  if (req.method === 'POST') {
    return POST(req as any, res as any);
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
