/**
 * POST /api/users/register
 *
 * Create a new user account.
 *
 * @public (no auth required)
 */

import type { NextApiRequest, NextApiResponse } from 'next';
import { registerSchema } from '@/lib/schemas';
import { AppError, toAppError } from '@/lib/errors';
import * as users from '@/db/users';
import { hashPassword } from '@/db/auth';
import { checkPasswordStrength } from '@/db/auth-pure';
import { signIn } from 'next-auth/react';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Method check
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // 1. Validate input
    const result = registerSchema.safeParse(req.body);

    if (!result.success) {
      throw new AppError('Invalid input', 400, {
        errors: result.error.issues,
      });
    }

    const { email, username, password } = result.data;

    // 2. Check password strength with zxcvbn
    const strength = checkPasswordStrength(password);

    // Return warning if weak, but allow registration (user choice)
    const passwordWarning =
      strength.score < 3
        ? {
            warning: `Password strength: ${strength.strength}`,
            suggestions: strength.feedback.suggestions,
          }
        : null;

    // 3. Check if email already exists
    const existingUser = await users.findByEmail(email);
    if (existingUser) {
      throw new AppError('Email already registered', 409, {
        field: 'email',
      });
    }

    // 4. Check if username already exists (if provided)
    if (username) {
      const existingUsername = await users.findByUsername(username);
      if (existingUsername) {
        throw new AppError('Username already taken', 409, {
          field: 'username',
        });
      }
    }

    // 5. Hash password
    const password_hash = await hashPassword(password);

    // 6. Create user (default role: student)
    const newUser = await users.create({
      email,
      username: username || null,
      password_hash,
      role: 'student',
    });

    // 7. Return success (user will be auto-logged in from frontend)
    return res.status(201).json({
      data: {
        user: {
          id: newUser.id,
          email: newUser.email,
          username: newUser.username,
          role: newUser.role,
        },
      },
      message: 'Account created successfully',
      ...(passwordWarning && { passwordWarning }),
    });
  } catch (error) {
    // Error handling
    const appError = toAppError(error);
    return res.status(appError.statusCode).json(appError.toJSON());
  }
}
