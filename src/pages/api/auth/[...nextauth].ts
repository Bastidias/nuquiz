/**
 * NextAuth v4 API Route Handler
 *
 * Catch-all route for NextAuth.js authentication endpoints.
 * Handles sign in, sign out, callbacks, etc.
 */

import NextAuth from 'next-auth';
import { authOptions } from '../../../lib/nextauth-config';

export default NextAuth(authOptions);
