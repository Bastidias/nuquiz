import { Hono } from "hono";
import { eq, and } from "drizzle-orm";
import {
  createDeckSchema,
  updateDeckSchema,
  createTopicSchema,
  updateTopicSchema,
  createConceptSchema,
  updateConceptSchema,
  createTripleSchema,
  updateTripleSchema,
} from "@nuquiz/shared";
import * as schema from "../db/schema.js";
import type { AppEnv, DbInstance } from "../env.js";

const decks = new Hono<AppEnv>();

// ── Helper: verify ownership through hierarchy ─────────────────

function getOwnedDeck(db: DbInstance, deckId: string, userId: string) {
  const [deck] = db
    .select()
    .from(schema.decks)
    .where(and(eq(schema.decks.id, deckId), eq(schema.decks.userId, userId)))
    .limit(1)
    .all();
  return deck ?? null;
}

function getOwnedTopic(db: DbInstance, topicId: string, userId: string) {
  const [row] = db
    .select({ topic: schema.topics, deck: schema.decks })
    .from(schema.topics)
    .innerJoin(schema.decks, eq(schema.topics.deckId, schema.decks.id))
    .where(
      and(eq(schema.topics.id, topicId), eq(schema.decks.userId, userId))
    )
    .limit(1)
    .all();
  return row ?? null;
}

function getOwnedConcept(db: DbInstance, conceptId: string, userId: string) {
  const [row] = db
    .select({ concept: schema.concepts })
    .from(schema.concepts)
    .innerJoin(schema.topics, eq(schema.concepts.topicId, schema.topics.id))
    .innerJoin(schema.decks, eq(schema.topics.deckId, schema.decks.id))
    .where(
      and(eq(schema.concepts.id, conceptId), eq(schema.decks.userId, userId))
    )
    .limit(1)
    .all();
  return row ?? null;
}

function getOwnedTriple(db: DbInstance, tripleId: string, userId: string) {
  const [row] = db
    .select({ triple: schema.triples })
    .from(schema.triples)
    .innerJoin(schema.concepts, eq(schema.triples.conceptId, schema.concepts.id))
    .innerJoin(schema.topics, eq(schema.concepts.topicId, schema.topics.id))
    .innerJoin(schema.decks, eq(schema.topics.deckId, schema.decks.id))
    .where(
      and(eq(schema.triples.id, tripleId), eq(schema.decks.userId, userId))
    )
    .limit(1)
    .all();
  return row ?? null;
}

// ── Decks CRUD ─────────────────────────────────────────────────

decks.get("/decks", (c) => {
  const db = c.get("db");
  const userId = c.get("userId");
  const userDecks = db
    .select()
    .from(schema.decks)
    .where(eq(schema.decks.userId, userId))
    .orderBy(schema.decks.sortOrder)
    .all();
  return c.json({ decks: userDecks });
});

decks.post("/decks", async (c) => {
  const db = c.get("db");
  const userId = c.get("userId");
  const body = await c.req.json();
  const parsed = createDeckSchema.safeParse(body);
  if (!parsed.success) {
    return c.json({ error: parsed.error.flatten().fieldErrors }, 400);
  }

  const now = new Date().toISOString();
  const id = crypto.randomUUID();
  db.insert(schema.decks).values({
    id,
    userId,
    title: parsed.data.title,
    description: parsed.data.description,
    sortOrder: parsed.data.sortOrder,
    createdAt: now,
    updatedAt: now,
  }).run();

  const [deck] = db
    .select()
    .from(schema.decks)
    .where(eq(schema.decks.id, id))
    .all();
  return c.json({ deck }, 201);
});

decks.get("/decks/:id", (c) => {
  const db = c.get("db");
  const userId = c.get("userId");
  const deck = getOwnedDeck(db, c.req.param("id"), userId);
  if (!deck) {
    return c.json({ error: "Deck not found" }, 404);
  }

  const deckTopics = db
    .select()
    .from(schema.topics)
    .where(eq(schema.topics.deckId, deck.id))
    .orderBy(schema.topics.sortOrder)
    .all();

  return c.json({ ...deck, topics: deckTopics });
});

decks.put("/decks/:id", async (c) => {
  const db = c.get("db");
  const userId = c.get("userId");
  const deck = getOwnedDeck(db, c.req.param("id"), userId);
  if (!deck) {
    return c.json({ error: "Deck not found" }, 404);
  }

  const body = await c.req.json();
  const parsed = updateDeckSchema.safeParse(body);
  if (!parsed.success) {
    return c.json({ error: parsed.error.flatten().fieldErrors }, 400);
  }

  const now = new Date().toISOString();
  db.update(schema.decks)
    .set({ ...parsed.data, updatedAt: now })
    .where(eq(schema.decks.id, deck.id))
    .run();

  const [updated] = db
    .select()
    .from(schema.decks)
    .where(eq(schema.decks.id, deck.id))
    .all();
  return c.json({ deck: updated });
});

decks.delete("/decks/:id", (c) => {
  const db = c.get("db");
  const userId = c.get("userId");
  const deck = getOwnedDeck(db, c.req.param("id"), userId);
  if (!deck) {
    return c.json({ error: "Deck not found" }, 404);
  }

  db.delete(schema.decks).where(eq(schema.decks.id, deck.id)).run();
  return c.json({ ok: true });
});

// ── Topics CRUD (nested under decks) ───────────────────────────

decks.get("/decks/:deckId/topics", (c) => {
  const db = c.get("db");
  const userId = c.get("userId");
  const deck = getOwnedDeck(db, c.req.param("deckId"), userId);
  if (!deck) {
    return c.json({ error: "Deck not found" }, 404);
  }

  const topicList = db
    .select()
    .from(schema.topics)
    .where(eq(schema.topics.deckId, deck.id))
    .orderBy(schema.topics.sortOrder)
    .all();
  return c.json({ topics: topicList });
});

decks.post("/decks/:deckId/topics", async (c) => {
  const db = c.get("db");
  const userId = c.get("userId");
  const deck = getOwnedDeck(db, c.req.param("deckId"), userId);
  if (!deck) {
    return c.json({ error: "Deck not found" }, 404);
  }

  const body = await c.req.json();
  const parsed = createTopicSchema.safeParse(body);
  if (!parsed.success) {
    return c.json({ error: parsed.error.flatten().fieldErrors }, 400);
  }

  const now = new Date().toISOString();
  const id = crypto.randomUUID();
  db.insert(schema.topics).values({
    id,
    deckId: deck.id,
    title: parsed.data.title,
    description: parsed.data.description,
    sortOrder: parsed.data.sortOrder,
    createdAt: now,
    updatedAt: now,
  }).run();

  const [topic] = db
    .select()
    .from(schema.topics)
    .where(eq(schema.topics.id, id))
    .all();
  return c.json({ topic }, 201);
});

decks.get("/decks/:deckId/topics/:topicId", (c) => {
  const db = c.get("db");
  const userId = c.get("userId");
  const row = getOwnedTopic(db, c.req.param("topicId"), userId);
  if (!row) {
    return c.json({ error: "Topic not found" }, 404);
  }

  const conceptList = db
    .select()
    .from(schema.concepts)
    .where(eq(schema.concepts.topicId, row.topic.id))
    .orderBy(schema.concepts.sortOrder)
    .all();

  return c.json({ ...row.topic, concepts: conceptList });
});

decks.put("/decks/:deckId/topics/:topicId", async (c) => {
  const db = c.get("db");
  const userId = c.get("userId");
  const row = getOwnedTopic(db, c.req.param("topicId"), userId);
  if (!row) {
    return c.json({ error: "Topic not found" }, 404);
  }

  const body = await c.req.json();
  const parsed = updateTopicSchema.safeParse(body);
  if (!parsed.success) {
    return c.json({ error: parsed.error.flatten().fieldErrors }, 400);
  }

  const now = new Date().toISOString();
  db.update(schema.topics)
    .set({ ...parsed.data, updatedAt: now })
    .where(eq(schema.topics.id, row.topic.id))
    .run();

  const [updated] = db
    .select()
    .from(schema.topics)
    .where(eq(schema.topics.id, row.topic.id))
    .all();
  return c.json({ topic: updated });
});

decks.delete("/decks/:deckId/topics/:topicId", (c) => {
  const db = c.get("db");
  const userId = c.get("userId");
  const row = getOwnedTopic(db, c.req.param("topicId"), userId);
  if (!row) {
    return c.json({ error: "Topic not found" }, 404);
  }

  db.delete(schema.topics).where(eq(schema.topics.id, row.topic.id)).run();
  return c.json({ ok: true });
});

// ── Concepts CRUD (nested under topics) ────────────────────────

decks.get("/decks/:deckId/topics/:topicId/concepts", (c) => {
  const db = c.get("db");
  const userId = c.get("userId");
  const row = getOwnedTopic(db, c.req.param("topicId"), userId);
  if (!row) {
    return c.json({ error: "Topic not found" }, 404);
  }

  const conceptList = db
    .select()
    .from(schema.concepts)
    .where(eq(schema.concepts.topicId, row.topic.id))
    .orderBy(schema.concepts.sortOrder)
    .all();
  return c.json({ concepts: conceptList });
});

decks.post("/decks/:deckId/topics/:topicId/concepts", async (c) => {
  const db = c.get("db");
  const userId = c.get("userId");
  const row = getOwnedTopic(db, c.req.param("topicId"), userId);
  if (!row) {
    return c.json({ error: "Topic not found" }, 404);
  }

  const body = await c.req.json();
  const parsed = createConceptSchema.safeParse(body);
  if (!parsed.success) {
    return c.json({ error: parsed.error.flatten().fieldErrors }, 400);
  }

  const now = new Date().toISOString();
  const id = crypto.randomUUID();
  db.insert(schema.concepts).values({
    id,
    topicId: row.topic.id,
    title: parsed.data.title,
    description: parsed.data.description,
    sortOrder: parsed.data.sortOrder,
    createdAt: now,
    updatedAt: now,
  }).run();

  const [concept] = db
    .select()
    .from(schema.concepts)
    .where(eq(schema.concepts.id, id))
    .all();
  return c.json({ concept }, 201);
});

decks.get(
  "/decks/:deckId/topics/:topicId/concepts/:conceptId",
  (c) => {
    const db = c.get("db");
    const userId = c.get("userId");
    const row = getOwnedConcept(db, c.req.param("conceptId"), userId);
    if (!row) {
      return c.json({ error: "Concept not found" }, 404);
    }

    const tripleList = db
      .select()
      .from(schema.triples)
      .where(eq(schema.triples.conceptId, row.concept.id))
      .orderBy(schema.triples.sortOrder)
      .all();
    return c.json({ ...row.concept, triples: tripleList });
  }
);

decks.put(
  "/decks/:deckId/topics/:topicId/concepts/:conceptId",
  async (c) => {
    const db = c.get("db");
    const userId = c.get("userId");
    const row = getOwnedConcept(db, c.req.param("conceptId"), userId);
    if (!row) {
      return c.json({ error: "Concept not found" }, 404);
    }

    const body = await c.req.json();
    const parsed = updateConceptSchema.safeParse(body);
    if (!parsed.success) {
      return c.json({ error: parsed.error.flatten().fieldErrors }, 400);
    }

    const now = new Date().toISOString();
    db.update(schema.concepts)
      .set({ ...parsed.data, updatedAt: now })
      .where(eq(schema.concepts.id, row.concept.id))
      .run();

    const [updated] = db
      .select()
      .from(schema.concepts)
      .where(eq(schema.concepts.id, row.concept.id))
      .all();
    return c.json({ concept: updated });
  }
);

decks.delete(
  "/decks/:deckId/topics/:topicId/concepts/:conceptId",
  (c) => {
    const db = c.get("db");
    const userId = c.get("userId");
    const row = getOwnedConcept(db, c.req.param("conceptId"), userId);
    if (!row) {
      return c.json({ error: "Concept not found" }, 404);
    }

    db.delete(schema.concepts)
      .where(eq(schema.concepts.id, row.concept.id))
      .run();
    return c.json({ ok: true });
  }
);

// ── Triples CRUD (nested under concepts) ───────────────────────

decks.get(
  "/decks/:deckId/topics/:topicId/concepts/:conceptId/triples",
  (c) => {
    const db = c.get("db");
    const userId = c.get("userId");
    const row = getOwnedConcept(db, c.req.param("conceptId"), userId);
    if (!row) {
      return c.json({ error: "Concept not found" }, 404);
    }

    const tripleList = db
      .select()
      .from(schema.triples)
      .where(eq(schema.triples.conceptId, row.concept.id))
      .orderBy(schema.triples.sortOrder)
      .all();
    return c.json({ triples: tripleList });
  }
);

decks.post(
  "/decks/:deckId/topics/:topicId/concepts/:conceptId/triples",
  async (c) => {
    const db = c.get("db");
    const userId = c.get("userId");
    const row = getOwnedConcept(db, c.req.param("conceptId"), userId);
    if (!row) {
      return c.json({ error: "Concept not found" }, 404);
    }

    const body = await c.req.json();
    const parsed = createTripleSchema.safeParse(body);
    if (!parsed.success) {
      return c.json({ error: parsed.error.flatten().fieldErrors }, 400);
    }

    const now = new Date().toISOString();
    const id = crypto.randomUUID();
    db.insert(schema.triples).values({
      id,
      conceptId: row.concept.id,
      userId,
      subject: parsed.data.subject,
      predicate: parsed.data.predicate,
      object: parsed.data.object,
      sortOrder: parsed.data.sortOrder,
      createdAt: now,
      updatedAt: now,
    }).run();

    const [triple] = db
      .select()
      .from(schema.triples)
      .where(eq(schema.triples.id, id))
      .all();
    return c.json({ triple }, 201);
  }
);

decks.put(
  "/decks/:deckId/topics/:topicId/concepts/:conceptId/triples/:tripleId",
  async (c) => {
    const db = c.get("db");
    const userId = c.get("userId");
    const row = getOwnedTriple(db, c.req.param("tripleId"), userId);
    if (!row) {
      return c.json({ error: "Triple not found" }, 404);
    }

    const body = await c.req.json();
    const parsed = updateTripleSchema.safeParse(body);
    if (!parsed.success) {
      return c.json({ error: parsed.error.flatten().fieldErrors }, 400);
    }

    const now = new Date().toISOString();
    db.update(schema.triples)
      .set({ ...parsed.data, updatedAt: now })
      .where(eq(schema.triples.id, row.triple.id))
      .run();

    const [updated] = db
      .select()
      .from(schema.triples)
      .where(eq(schema.triples.id, row.triple.id))
      .all();
    return c.json({ triple: updated });
  }
);

decks.delete(
  "/decks/:deckId/topics/:topicId/concepts/:conceptId/triples/:tripleId",
  (c) => {
    const db = c.get("db");
    const userId = c.get("userId");
    const row = getOwnedTriple(db, c.req.param("tripleId"), userId);
    if (!row) {
      return c.json({ error: "Triple not found" }, 404);
    }

    db.delete(schema.triples)
      .where(eq(schema.triples.id, row.triple.id))
      .run();
    return c.json({ ok: true });
  }
);

export default decks;
