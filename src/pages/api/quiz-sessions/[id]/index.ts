/**
 * GET /api/quiz-sessions/[id]
 *
 * Get a quiz session with its questions and options
 *
 * Auth: Required (session owner only)
 * Returns: Quiz session with questions
 */

import type { NextApiRequest, NextApiResponse } from 'next';
import { withAuth } from '@/lib/auth-middleware';
import { AppError } from '@/lib/errors';
import { getQuizSession } from '@/lib/services/quizSessionService';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    throw new AppError('Method not allowed', 405);
  }

  const session = (req as any).session;
  if (!session?.user?.id) {
    throw new AppError('Unauthorized', 401);
  }

  const userId = session.user.id;
  const sessionId = parseInt(req.query.id as string, 10);

  if (isNaN(sessionId)) {
    throw new AppError('Invalid session ID', 400);
  }

  // Get quiz session (service will verify ownership)
  const result = await getQuizSession(sessionId, userId);

  res.status(200).json({
    session_id: result.session.id,
    content_pack_id: result.session.content_pack_id,
    total_questions: result.session.total_questions,
    started_at: result.session.started_at,
    completed_at: result.session.completed_at,
    score: result.session.score,
    correct_answers: result.session.correct_answers,
    questions: result.questions.map((q) => ({
      id: q.id,
      question_text: q.question_text,
      question_order: q.question_order,
      options: q.options.map((o) => ({
        id: o.id,
        display_text: o.display_text,
        option_order: o.option_order,
        // Include is_correct only if session is completed
        ...(result.session.completed_at && { is_correct: o.is_correct }),
      })),
    })),
  });
}

export default withAuth(handler);
