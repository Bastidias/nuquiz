/**
 * NextAuth API Route Handler
 *
 * Catch-all route for NextAuth.js authentication endpoints.
 * Handles sign in, sign out, callbacks, etc.
 */

import { handlers } from '../../../auth';

export const { GET, POST } = handlers;
