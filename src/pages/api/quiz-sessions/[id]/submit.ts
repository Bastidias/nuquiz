/**
 * POST /api/quiz-sessions/[id]/submit
 *
 * Submit a quiz session with user's selected answers
 *
 * Auth: Required (session owner only)
 * Body: { selected_option_ids: number[] }
 * Returns: Quiz results with score
 */

import type { NextApiRequest, NextApiResponse } from 'next';
import { withAuth } from '@/lib/auth-middleware';
import { AppError } from '@/lib/errors';
import { submitQuizSession } from '@/lib/services/quizSessionService';
import { sessionIdSchema, submitQuizSessionSchema } from '@/lib/schemas';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    throw new AppError('Method not allowed', 405);
  }

  const session = (req as any).session;
  if (!session?.user?.id) {
    throw new AppError('Unauthorized', 401);
  }

  const userId = session.user.id;

  // Validate session ID with Zod
  const parsedId = sessionIdSchema.safeParse(req.query.id);
  if (!parsedId.success) {
    throw new AppError('Invalid session ID', 400);
  }
  const sessionId = parsedId.data;

  // Validate request body
  const parsed = submitQuizSessionSchema.safeParse(req.body);
  if (!parsed.success) {
    throw new AppError('Invalid request body', 400, {
      errors: parsed.error.issues,
    });
  }

  const { selected_option_ids } = parsed.data;

  // Submit quiz session
  const result = await submitQuizSession({
    session_id: sessionId,
    user_id: userId,
    selected_option_ids,
  });

  res.status(200).json({
    session_id: result.session.id,
    total_questions: result.total_questions,
    correct_answers: result.correct_answers,
    score: result.score,
    completed_at: result.session.completed_at,
  });
}

export default withAuth(handler);
