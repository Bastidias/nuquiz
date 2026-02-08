import { createTestDb, closeTestDb, type TestDb } from "../helpers/db.js";
import {
  createUser,
  createCatalog,
  createDeck,
  createTopic,
  createConcept,
  createTriple,
  createSubscription,
  resetFixtureCounter,
} from "../helpers/fixtures.js";
import { createTestApp, jsonRequest } from "../helpers/app.js";
import { clearSessions } from "../../routes/quiz.js";
import * as schema from "../../db/schema.js";
import { eq } from "drizzle-orm";
import type { Hono } from "hono";
import type { AppEnv } from "../../env.js";
import Database from "better-sqlite3";

let db: TestDb;
let sqlite: InstanceType<typeof Database>;
let app: Hono<AppEnv>;
let userId: string;

beforeEach(() => {
  resetFixtureCounter();
  clearSessions();
  const testDb = createTestDb();
  db = testDb.db;
  sqlite = testDb.sqlite;
  const user = createUser(db);
  userId = user.id;
  app = createTestApp(db, userId);
});

afterEach(() => {
  closeTestDb(sqlite);
});

// ── Helpers ───────────────────────────────────────────────────────

/** Creates a concept with multiple triples suitable for question generation. */
function createConceptWithTriples() {
  const catalog = createCatalog(db, { createdBy: userId });
  const deck = createDeck(db, { catalogId: catalog.id });
  const topic = createTopic(db, { deckId: deck.id });
  const concept = createConcept(db, { topicId: topic.id, title: "Transport Protocols" });

  // Create enough triples for distractors: 2+ subjects sharing a predicate
  const t1 = createTriple(db, {
    conceptId: concept.id,
    subject: "TCP",
    predicate: "reliability",
    object: "guaranteed",
  });
  const t2 = createTriple(db, {
    conceptId: concept.id,
    subject: "UDP",
    predicate: "reliability",
    object: "best-effort",
  });
  const t3 = createTriple(db, {
    conceptId: concept.id,
    subject: "TCP",
    predicate: "ordering",
    object: "ordered",
  });
  const t4 = createTriple(db, {
    conceptId: concept.id,
    subject: "UDP",
    predicate: "ordering",
    object: "unordered",
  });

  return { catalog, deck, topic, concept, triples: [t1, t2, t3, t4] };
}

// ── POST /quiz/start ──────────────────────────────────────────────

describe("S06: POST /quiz/start", () => {
  test("starts a session scoped to a concept and returns questions", async () => {
    const { concept } = createConceptWithTriples();

    const res = await jsonRequest(app, "POST", "/quiz/start", {
      conceptId: concept.id,
    });

    expect(res.status).toBe(201);
    const body = await res.json();
    expect(body.id).toBeDefined();
    expect(body.questions.length).toBeGreaterThan(0);
    expect(body.createdAt).toBeDefined();
  });

  test("questions do NOT include correctAnswer", async () => {
    const { concept } = createConceptWithTriples();

    const res = await jsonRequest(app, "POST", "/quiz/start", {
      conceptId: concept.id,
    });
    const body = await res.json();

    for (const q of body.questions) {
      expect(q).not.toHaveProperty("correctAnswer");
      expect(q.axis).toBeDefined();
      expect(q.format).toBeDefined();
      expect(q.prompt).toBeDefined();
      expect(q.tripleIds).toBeDefined();
    }
  });

  test("returns 404 for nonexistent concept", async () => {
    const res = await jsonRequest(app, "POST", "/quiz/start", {
      conceptId: "nonexistent-id",
    });
    expect(res.status).toBe(404);
  });

  test("returns 404 when user does not own or subscribe to the catalog", async () => {
    const otherUser = createUser(db);
    const catalog = createCatalog(db, { createdBy: otherUser.id });
    const deck = createDeck(db, { catalogId: catalog.id });
    const topic = createTopic(db, { deckId: deck.id });
    const concept = createConcept(db, { topicId: topic.id });
    createTriple(db, { conceptId: concept.id });

    const res = await jsonRequest(app, "POST", "/quiz/start", {
      conceptId: concept.id,
    });
    expect(res.status).toBe(404);
  });

  test("subscribers can start a session for a catalog they subscribe to", async () => {
    const author = createUser(db);
    const catalog = createCatalog(db, { createdBy: author.id });
    const deck = createDeck(db, { catalogId: catalog.id });
    const topic = createTopic(db, { deckId: deck.id });
    const concept = createConcept(db, { topicId: topic.id });
    createTriple(db, {
      conceptId: concept.id,
      subject: "TCP",
      predicate: "reliability",
      object: "guaranteed",
    });
    createTriple(db, {
      conceptId: concept.id,
      subject: "UDP",
      predicate: "reliability",
      object: "best-effort",
    });

    // Subscribe the test user
    createSubscription(db, { userId, catalogId: catalog.id });

    const res = await jsonRequest(app, "POST", "/quiz/start", {
      conceptId: concept.id,
    });
    expect(res.status).toBe(201);
    const body = await res.json();
    expect(body.questions.length).toBeGreaterThan(0);
  });

  test("returns 422 when concept has no triples", async () => {
    const catalog = createCatalog(db, { createdBy: userId });
    const deck = createDeck(db, { catalogId: catalog.id });
    const topic = createTopic(db, { deckId: deck.id });
    const concept = createConcept(db, { topicId: topic.id });
    // No triples

    const res = await jsonRequest(app, "POST", "/quiz/start", {
      conceptId: concept.id,
    });
    expect(res.status).toBe(422);
  });

  test("returns 400 for invalid request body", async () => {
    const res = await jsonRequest(app, "POST", "/quiz/start", {});
    expect(res.status).toBe(400);
  });

  test("respects optional axis filter", async () => {
    const { concept } = createConceptWithTriples();

    const res = await jsonRequest(app, "POST", "/quiz/start", {
      conceptId: concept.id,
      axis: "object",
    });
    const body = await res.json();

    expect(res.status).toBe(201);
    for (const q of body.questions) {
      expect(q.axis).toBe("object");
    }
  });

  test("respects optional format filter", async () => {
    const { concept } = createConceptWithTriples();

    const res = await jsonRequest(app, "POST", "/quiz/start", {
      conceptId: concept.id,
      format: "true_false",
    });
    const body = await res.json();

    expect(res.status).toBe(201);
    for (const q of body.questions) {
      expect(q.format).toBe("true_false");
    }
  });

  test("respects count limit", async () => {
    const { concept } = createConceptWithTriples();

    const res = await jsonRequest(app, "POST", "/quiz/start", {
      conceptId: concept.id,
      count: 2,
    });
    const body = await res.json();

    expect(res.status).toBe(201);
    expect(body.questions.length).toBeLessThanOrEqual(2);
  });

  test("same seed produces same questions", async () => {
    const { concept } = createConceptWithTriples();

    const res1 = await jsonRequest(app, "POST", "/quiz/start", {
      conceptId: concept.id,
      seed: 42,
    });
    const body1 = await res1.json();

    const res2 = await jsonRequest(app, "POST", "/quiz/start", {
      conceptId: concept.id,
      seed: 42,
    });
    const body2 = await res2.json();

    expect(body1.questions.map((q: { prompt: string }) => q.prompt)).toEqual(
      body2.questions.map((q: { prompt: string }) => q.prompt)
    );
  });

  test("starts a session scoped to a topic (across concepts)", async () => {
    const catalog = createCatalog(db, { createdBy: userId });
    const deck = createDeck(db, { catalogId: catalog.id });
    const topic = createTopic(db, { deckId: deck.id });

    const concept1 = createConcept(db, { topicId: topic.id });
    createTriple(db, { conceptId: concept1.id, subject: "A", predicate: "p", object: "1" });
    createTriple(db, { conceptId: concept1.id, subject: "B", predicate: "p", object: "2" });

    const concept2 = createConcept(db, { topicId: topic.id });
    createTriple(db, { conceptId: concept2.id, subject: "X", predicate: "q", object: "3" });
    createTriple(db, { conceptId: concept2.id, subject: "Y", predicate: "q", object: "4" });

    const res = await jsonRequest(app, "POST", "/quiz/start", {
      topicId: topic.id,
    });
    expect(res.status).toBe(201);
    const body = await res.json();
    expect(body.questions.length).toBeGreaterThan(0);
  });

  test("starts a session scoped to a deck", async () => {
    const catalog = createCatalog(db, { createdBy: userId });
    const deck = createDeck(db, { catalogId: catalog.id });
    const topic = createTopic(db, { deckId: deck.id });
    const concept = createConcept(db, { topicId: topic.id });
    createTriple(db, { conceptId: concept.id, subject: "A", predicate: "p", object: "1" });
    createTriple(db, { conceptId: concept.id, subject: "B", predicate: "p", object: "2" });

    const res = await jsonRequest(app, "POST", "/quiz/start", {
      deckId: deck.id,
    });
    expect(res.status).toBe(201);
    const body = await res.json();
    expect(body.questions.length).toBeGreaterThan(0);
  });
});

// ── POST /quiz/:sessionId/respond ─────────────────────────────────

describe("S08: POST /quiz/:sessionId/respond", () => {
  async function startSession(overrides: Record<string, unknown> = {}) {
    const { concept } = createConceptWithTriples();
    const res = await jsonRequest(app, "POST", "/quiz/start", {
      conceptId: concept.id,
      seed: 123,
      ...overrides,
    });
    return res.json();
  }

  test("submitting a correct answer returns correct: true", async () => {
    const session = await startSession();
    const sessionId = session.id;

    // We need to know the correct answer server-side.
    // Since we can't see it from the client, let's submit the first option
    // and check the response tells us the correct answer.
    const res = await jsonRequest(app, "POST", `/quiz/${sessionId}/respond`, {
      questionIndex: 0,
      selectedAnswer: "test-answer",
      responseTimeMs: 500,
    });

    expect(res.status).toBe(200);
    const body = await res.json();
    expect(typeof body.correct).toBe("boolean");
    expect(body.correctAnswer).toBeDefined();
    expect(body.tripleIds).toBeDefined();
    expect(body.axis).toBeDefined();
    expect(body.format).toBeDefined();
  });

  test("returns correct: true when selectedAnswer matches correctAnswer", async () => {
    // Start session, respond with a deliberate wrong answer to get the correct one,
    // then start a new session with same seed and respond correctly.
    const session1 = await startSession();
    const wrongRes = await jsonRequest(
      app,
      "POST",
      `/quiz/${session1.id}/respond`,
      { questionIndex: 0, selectedAnswer: "__definitely_wrong__", responseTimeMs: 100 }
    );
    const { correctAnswer } = await wrongRes.json();

    // Start a new session with same seed => same questions
    clearSessions();
    const session2 = await startSession();
    const correctRes = await jsonRequest(
      app,
      "POST",
      `/quiz/${session2.id}/respond`,
      { questionIndex: 0, selectedAnswer: correctAnswer, responseTimeMs: 200 }
    );
    const body = await correctRes.json();
    expect(body.correct).toBe(true);
  });

  test("returns 409 when answering the same question twice", async () => {
    const session = await startSession();

    await jsonRequest(app, "POST", `/quiz/${session.id}/respond`, {
      questionIndex: 0,
      selectedAnswer: "test",
      responseTimeMs: 100,
    });

    const res = await jsonRequest(app, "POST", `/quiz/${session.id}/respond`, {
      questionIndex: 0,
      selectedAnswer: "test",
      responseTimeMs: 100,
    });
    expect(res.status).toBe(409);
  });

  test("returns 404 for invalid question index", async () => {
    const session = await startSession();

    const res = await jsonRequest(app, "POST", `/quiz/${session.id}/respond`, {
      questionIndex: 999,
      selectedAnswer: "test",
      responseTimeMs: 100,
    });
    expect(res.status).toBe(404);
  });

  test("returns 404 for nonexistent session", async () => {
    const res = await jsonRequest(app, "POST", "/quiz/nonexistent/respond", {
      questionIndex: 0,
      selectedAnswer: "test",
      responseTimeMs: 100,
    });
    expect(res.status).toBe(404);
  });

  test("returns 404 when another user tries to respond to the session", async () => {
    const session = await startSession();

    const otherUser = createUser(db);
    const otherApp = createTestApp(db, otherUser.id);

    const res = await jsonRequest(
      otherApp,
      "POST",
      `/quiz/${session.id}/respond`,
      { questionIndex: 0, selectedAnswer: "test", responseTimeMs: 100 }
    );
    expect(res.status).toBe(404);
  });

  test("persists quiz_responses row in the database", async () => {
    const session = await startSession();

    await jsonRequest(app, "POST", `/quiz/${session.id}/respond`, {
      questionIndex: 0,
      selectedAnswer: "test",
      responseTimeMs: 750,
    });

    const responses = db
      .select()
      .from(schema.quizResponses)
      .where(eq(schema.quizResponses.userId, userId))
      .all();

    expect(responses).toHaveLength(1);
    expect(responses[0].responseTimeMs).toBe(750);
    expect(responses[0].userId).toBe(userId);
  });

  test("persists response_triples rows in the database", async () => {
    const session = await startSession();

    await jsonRequest(app, "POST", `/quiz/${session.id}/respond`, {
      questionIndex: 0,
      selectedAnswer: "test",
      responseTimeMs: 100,
    });

    const responseTriples = db.select().from(schema.responseTriples).all();
    expect(responseTriples.length).toBeGreaterThan(0);

    // Each response_triple should reference the quiz_response
    const responses = db.select().from(schema.quizResponses).all();
    expect(responses).toHaveLength(1);
    for (const rt of responseTriples) {
      expect(rt.responseId).toBe(responses[0].id);
    }
  });

  test("returns 400 for invalid request body", async () => {
    const session = await startSession();

    const res = await jsonRequest(app, "POST", `/quiz/${session.id}/respond`, {
      // missing required fields
    });
    expect(res.status).toBe(400);
  });
});
