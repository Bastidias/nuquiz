/**
 * POST /api/quiz-sessions/create
 *
 * Create a new quiz session with generated questions
 *
 * Auth: Required (any authenticated user)
 * Body: { content_pack_id: number, question_count: number }
 * Returns: Quiz session with questions
 */

import type { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';
import { withAuth } from '@/lib/auth-middleware';
import { AppError } from '@/lib/errors';
import { createQuizSession } from '@/lib/services/quizSessionService';
import * as contentPacks from '@/db/contentPacks';

// Request validation schema
const CreateQuizSessionSchema = z.object({
  content_pack_id: z.number().int().positive(),
  question_count: z.number().int().min(1).max(50), // Limit to 50 questions
});

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    throw new AppError('Method not allowed', 405);
  }

  const session = (req as any).session;
  if (!session?.user?.id) {
    throw new AppError('Unauthorized', 401);
  }

  const userId = session.user.id;

  // Validate request body
  const parsed = CreateQuizSessionSchema.safeParse(req.body);
  if (!parsed.success) {
    throw new AppError('Invalid request body', 400, {
      errors: parsed.error.issues,
    });
  }

  const { content_pack_id, question_count } = parsed.data;

  // Verify user has access to this content pack
  const hasAccess = await contentPacks.hasAccess(userId, content_pack_id);
  if (!hasAccess) {
    throw new AppError('You do not have access to this content pack', 403);
  }

  // Create quiz session
  const result = await createQuizSession({
    user_id: userId,
    content_pack_id,
    question_count,
  });

  res.status(201).json({
    session_id: result.session.id,
    total_questions: result.session.total_questions,
    started_at: result.session.started_at,
    questions: result.questions.map((q) => ({
      id: q.id,
      question_text: q.question_text,
      question_order: q.question_order,
      options: q.options.map((o) => ({
        id: o.id,
        display_text: o.display_text,
        option_order: o.option_order,
        // Do NOT include is_correct in API response
      })),
    })),
  });
}

export default withAuth(handler);
