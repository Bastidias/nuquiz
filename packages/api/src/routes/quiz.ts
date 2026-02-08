import { Hono } from "hono";
import { eq, and } from "drizzle-orm";
import {
  startQuizSessionSchema,
  submitQuizResponseSchema,
} from "@nuquiz/shared";
import * as schema from "../db/schema.js";
import type { AppEnv, DbInstance } from "../env.js";
import { orchestrate } from "../domain/engine/index.js";
import type { Question, QuizTriple } from "../domain/engine/index.js";

// ── In-memory session store ───────────────────────────────────────

interface StoredSession {
  id: string;
  userId: string;
  questions: Question[];
  questionConceptIds: string[];
  answered: Set<number>;
  createdAt: string;
}

const sessions = new Map<string, StoredSession>();

// Export for testing — allows tests to clear sessions between runs
export function clearSessions(): void {
  sessions.clear();
}

// ── Helpers ───────────────────────────────────────────────────────

function canAccessCatalog(
  db: DbInstance,
  catalogId: string,
  userId: string
): boolean {
  // Author check
  const [catalog] = db
    .select({ id: schema.catalogs.id })
    .from(schema.catalogs)
    .where(
      and(eq(schema.catalogs.id, catalogId), eq(schema.catalogs.createdBy, userId))
    )
    .limit(1)
    .all();
  if (catalog) return true;

  // Subscriber check
  const [sub] = db
    .select({ id: schema.subscriptions.id })
    .from(schema.subscriptions)
    .where(
      and(
        eq(schema.subscriptions.catalogId, catalogId),
        eq(schema.subscriptions.userId, userId)
      )
    )
    .limit(1)
    .all();
  return !!sub;
}

function findCatalogIdForConcept(db: DbInstance, conceptId: string): string | null {
  const [row] = db
    .select({ catalogId: schema.decks.catalogId })
    .from(schema.concepts)
    .innerJoin(schema.topics, eq(schema.concepts.topicId, schema.topics.id))
    .innerJoin(schema.decks, eq(schema.topics.deckId, schema.decks.id))
    .where(eq(schema.concepts.id, conceptId))
    .limit(1)
    .all();
  return row?.catalogId ?? null;
}

function findCatalogIdForTopic(db: DbInstance, topicId: string): string | null {
  const [row] = db
    .select({ catalogId: schema.decks.catalogId })
    .from(schema.topics)
    .innerJoin(schema.decks, eq(schema.topics.deckId, schema.decks.id))
    .where(eq(schema.topics.id, topicId))
    .limit(1)
    .all();
  return row?.catalogId ?? null;
}

function findCatalogIdForDeck(db: DbInstance, deckId: string): string | null {
  const [row] = db
    .select({ catalogId: schema.decks.catalogId })
    .from(schema.decks)
    .where(eq(schema.decks.id, deckId))
    .limit(1)
    .all();
  return row?.catalogId ?? null;
}

/** Fetch triples for a single concept. */
function fetchTriplesForConcept(db: DbInstance, conceptId: string): QuizTriple[] {
  return db
    .select({
      id: schema.triples.id,
      subject: schema.triples.subject,
      predicate: schema.triples.predicate,
      object: schema.triples.object,
    })
    .from(schema.triples)
    .where(eq(schema.triples.conceptId, conceptId))
    .all();
}

/** Fetch all concept IDs for a topic. */
function fetchConceptIdsForTopic(db: DbInstance, topicId: string): string[] {
  return db
    .select({ id: schema.concepts.id })
    .from(schema.concepts)
    .where(eq(schema.concepts.topicId, topicId))
    .all()
    .map((r) => r.id);
}

/** Fetch all concept IDs for a deck (across all topics). */
function fetchConceptIdsForDeck(db: DbInstance, deckId: string): string[] {
  return db
    .select({ id: schema.concepts.id })
    .from(schema.concepts)
    .innerJoin(schema.topics, eq(schema.concepts.topicId, schema.topics.id))
    .where(eq(schema.topics.deckId, deckId))
    .all()
    .map((r) => r.id);
}

// ── Quiz Routes ───────────────────────────────────────────────────

const quiz = new Hono<AppEnv>();

quiz.post("/quiz/start", async (c) => {
  const db = c.get("db");
  const userId = c.get("userId");
  const body = await c.req.json();
  const parsed = startQuizSessionSchema.safeParse(body);
  if (!parsed.success) {
    return c.json({ error: parsed.error.flatten().fieldErrors }, 400);
  }

  const { conceptId, topicId, deckId, axis, format, seed, count } = parsed.data;

  // Determine which concept(s) to generate from and verify access
  let conceptIds: string[];
  let catalogId: string | null;

  if (conceptId) {
    catalogId = findCatalogIdForConcept(db, conceptId);
    if (!catalogId) return c.json({ error: "Not found" }, 404);
    conceptIds = [conceptId];
  } else if (topicId) {
    catalogId = findCatalogIdForTopic(db, topicId);
    if (!catalogId) return c.json({ error: "Not found" }, 404);
    conceptIds = fetchConceptIdsForTopic(db, topicId);
  } else if (deckId) {
    catalogId = findCatalogIdForDeck(db, deckId);
    if (!catalogId) return c.json({ error: "Not found" }, 404);
    conceptIds = fetchConceptIdsForDeck(db, deckId);
  } else {
    return c.json({ error: "One of conceptId, topicId, or deckId is required" }, 400);
  }

  if (!canAccessCatalog(db, catalogId, userId)) {
    return c.json({ error: "Not found" }, 404);
  }

  if (conceptIds.length === 0) {
    return c.json({ error: "No concepts found in the specified scope" }, 422);
  }

  // Generate questions per concept (respecting concept boundary)
  const allQuestions: Array<{ question: Question; conceptId: string }> = [];

  for (const cid of conceptIds) {
    const triples = fetchTriplesForConcept(db, cid);
    if (triples.length === 0) continue;

    const questions = orchestrate({
      triples,
      axis,
      format,
      seed,
      count: count ? Math.ceil(count / conceptIds.length) : undefined,
    });
    for (const q of questions) {
      allQuestions.push({ question: q, conceptId: cid });
    }
  }

  if (allQuestions.length === 0) {
    return c.json({ error: "Not enough triples to generate questions" }, 422);
  }

  // Trim to requested count if specified
  const finalEntries = count ? allQuestions.slice(0, count) : allQuestions;

  // Create session
  const sessionId = crypto.randomUUID();
  const now = new Date().toISOString();
  const session: StoredSession = {
    id: sessionId,
    userId,
    questions: finalEntries.map((e) => e.question),
    questionConceptIds: finalEntries.map((e) => e.conceptId),
    answered: new Set(),
    createdAt: now,
  };
  sessions.set(sessionId, session);

  // Return questions WITHOUT correctAnswer
  const clientQuestions = session.questions.map((q) => ({
    axis: q.axis,
    scope: q.scope,
    format: q.format,
    prompt: q.prompt,
    options: q.options,
    tripleIds: q.tripleIds,
  }));

  return c.json(
    {
      id: sessionId,
      questions: clientQuestions,
      createdAt: now,
    },
    201
  );
});

quiz.post("/quiz/:sessionId/respond", async (c) => {
  const db = c.get("db");
  const userId = c.get("userId");
  const sessionId = c.req.param("sessionId");

  const session = sessions.get(sessionId);
  if (!session || session.userId !== userId) {
    return c.json({ error: "Session not found" }, 404);
  }

  const body = await c.req.json();
  const parsed = submitQuizResponseSchema.safeParse(body);
  if (!parsed.success) {
    return c.json({ error: parsed.error.flatten().fieldErrors }, 400);
  }

  const { questionIndex, selectedAnswer, responseTimeMs } = parsed.data;

  if (questionIndex < 0 || questionIndex >= session.questions.length) {
    return c.json({ error: "Question not found" }, 404);
  }

  if (session.answered.has(questionIndex)) {
    return c.json({ error: "Question already answered" }, 409);
  }

  const question = session.questions[questionIndex];
  const correct = selectedAnswer === question.correctAnswer;

  // Mark as answered
  session.answered.add(questionIndex);

  // Persist quiz_responses with the correct concept for this question
  const responseId = crypto.randomUUID();
  const now = new Date().toISOString();
  const questionConceptId = session.questionConceptIds[questionIndex];
  db.insert(schema.quizResponses)
    .values({
      id: responseId,
      userId,
      conceptId: questionConceptId,
      axis: question.axis,
      format: question.format,
      correct: correct ? 1 : 0,
      responseTimeMs,
      createdAt: now,
    })
    .run();

  // Persist response_triples
  for (const tripleId of question.tripleIds) {
    db.insert(schema.responseTriples)
      .values({
        id: crypto.randomUUID(),
        responseId,
        tripleId,
        correct: correct ? 1 : 0,
      })
      .run();
  }

  return c.json({
    correct,
    correctAnswer: question.correctAnswer,
    tripleIds: question.tripleIds,
    axis: question.axis,
    format: question.format,
  });
});

export default quiz;
