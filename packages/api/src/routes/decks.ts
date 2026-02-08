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
import { db, schema } from "../db/index.js";
import { requireAuth, type AuthEnv } from "../middleware/auth.js";

const decks = new Hono<AuthEnv>();

decks.use("/*", requireAuth);

// ── Helper: verify ownership through hierarchy ─────────────────

async function getOwnedDeck(deckId: string, userId: string) {
  const [deck] = await db
    .select()
    .from(schema.decks)
    .where(and(eq(schema.decks.id, deckId), eq(schema.decks.userId, userId)))
    .limit(1);
  return deck ?? null;
}

async function getOwnedTopic(topicId: string, userId: string) {
  const [row] = await db
    .select({ topic: schema.topics, deck: schema.decks })
    .from(schema.topics)
    .innerJoin(schema.decks, eq(schema.topics.deckId, schema.decks.id))
    .where(
      and(eq(schema.topics.id, topicId), eq(schema.decks.userId, userId))
    )
    .limit(1);
  return row ?? null;
}

async function getOwnedConcept(conceptId: string, userId: string) {
  const [row] = await db
    .select({ concept: schema.concepts })
    .from(schema.concepts)
    .innerJoin(schema.topics, eq(schema.concepts.topicId, schema.topics.id))
    .innerJoin(schema.decks, eq(schema.topics.deckId, schema.decks.id))
    .where(
      and(eq(schema.concepts.id, conceptId), eq(schema.decks.userId, userId))
    )
    .limit(1);
  return row ?? null;
}

async function getOwnedTriple(tripleId: string, userId: string) {
  const [row] = await db
    .select({ triple: schema.triples })
    .from(schema.triples)
    .innerJoin(schema.concepts, eq(schema.triples.conceptId, schema.concepts.id))
    .innerJoin(schema.topics, eq(schema.concepts.topicId, schema.topics.id))
    .innerJoin(schema.decks, eq(schema.topics.deckId, schema.decks.id))
    .where(
      and(eq(schema.triples.id, tripleId), eq(schema.decks.userId, userId))
    )
    .limit(1);
  return row ?? null;
}

// ── Decks CRUD ─────────────────────────────────────────────────

decks.get("/decks", async (c) => {
  const userId = c.get("userId");
  const userDecks = await db
    .select()
    .from(schema.decks)
    .where(eq(schema.decks.userId, userId))
    .orderBy(schema.decks.sortOrder);
  return c.json({ decks: userDecks });
});

decks.post("/decks", async (c) => {
  const userId = c.get("userId");
  const body = await c.req.json();
  const parsed = createDeckSchema.safeParse(body);
  if (!parsed.success) {
    return c.json({ error: parsed.error.flatten().fieldErrors }, 400);
  }

  const now = new Date().toISOString();
  const id = crypto.randomUUID();
  await db.insert(schema.decks).values({
    id,
    userId,
    title: parsed.data.title,
    description: parsed.data.description,
    sortOrder: parsed.data.sortOrder,
    createdAt: now,
    updatedAt: now,
  });

  const [deck] = await db
    .select()
    .from(schema.decks)
    .where(eq(schema.decks.id, id));
  return c.json({ deck }, 201);
});

decks.get("/decks/:id", async (c) => {
  const userId = c.get("userId");
  const deck = await getOwnedDeck(c.req.param("id"), userId);
  if (!deck) {
    return c.json({ error: "Deck not found" }, 404);
  }

  const deckTopics = await db
    .select()
    .from(schema.topics)
    .where(eq(schema.topics.deckId, deck.id))
    .orderBy(schema.topics.sortOrder);

  return c.json({ ...deck, topics: deckTopics });
});

decks.put("/decks/:id", async (c) => {
  const userId = c.get("userId");
  const deck = await getOwnedDeck(c.req.param("id"), userId);
  if (!deck) {
    return c.json({ error: "Deck not found" }, 404);
  }

  const body = await c.req.json();
  const parsed = updateDeckSchema.safeParse(body);
  if (!parsed.success) {
    return c.json({ error: parsed.error.flatten().fieldErrors }, 400);
  }

  const now = new Date().toISOString();
  await db
    .update(schema.decks)
    .set({ ...parsed.data, updatedAt: now })
    .where(eq(schema.decks.id, deck.id));

  const [updated] = await db
    .select()
    .from(schema.decks)
    .where(eq(schema.decks.id, deck.id));
  return c.json({ deck: updated });
});

decks.delete("/decks/:id", async (c) => {
  const userId = c.get("userId");
  const deck = await getOwnedDeck(c.req.param("id"), userId);
  if (!deck) {
    return c.json({ error: "Deck not found" }, 404);
  }

  await db.delete(schema.decks).where(eq(schema.decks.id, deck.id));
  return c.json({ ok: true });
});

// ── Topics CRUD (nested under decks) ───────────────────────────

decks.get("/decks/:deckId/topics", async (c) => {
  const userId = c.get("userId");
  const deck = await getOwnedDeck(c.req.param("deckId"), userId);
  if (!deck) {
    return c.json({ error: "Deck not found" }, 404);
  }

  const topicList = await db
    .select()
    .from(schema.topics)
    .where(eq(schema.topics.deckId, deck.id))
    .orderBy(schema.topics.sortOrder);
  return c.json({ topics: topicList });
});

decks.post("/decks/:deckId/topics", async (c) => {
  const userId = c.get("userId");
  const deck = await getOwnedDeck(c.req.param("deckId"), userId);
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
  await db.insert(schema.topics).values({
    id,
    deckId: deck.id,
    title: parsed.data.title,
    description: parsed.data.description,
    sortOrder: parsed.data.sortOrder,
    createdAt: now,
    updatedAt: now,
  });

  const [topic] = await db
    .select()
    .from(schema.topics)
    .where(eq(schema.topics.id, id));
  return c.json({ topic }, 201);
});

decks.get("/decks/:deckId/topics/:topicId", async (c) => {
  const userId = c.get("userId");
  const row = await getOwnedTopic(c.req.param("topicId"), userId);
  if (!row) {
    return c.json({ error: "Topic not found" }, 404);
  }

  const conceptList = await db
    .select()
    .from(schema.concepts)
    .where(eq(schema.concepts.topicId, row.topic.id))
    .orderBy(schema.concepts.sortOrder);

  return c.json({ ...row.topic, concepts: conceptList });
});

decks.put("/decks/:deckId/topics/:topicId", async (c) => {
  const userId = c.get("userId");
  const row = await getOwnedTopic(c.req.param("topicId"), userId);
  if (!row) {
    return c.json({ error: "Topic not found" }, 404);
  }

  const body = await c.req.json();
  const parsed = updateTopicSchema.safeParse(body);
  if (!parsed.success) {
    return c.json({ error: parsed.error.flatten().fieldErrors }, 400);
  }

  const now = new Date().toISOString();
  await db
    .update(schema.topics)
    .set({ ...parsed.data, updatedAt: now })
    .where(eq(schema.topics.id, row.topic.id));

  const [updated] = await db
    .select()
    .from(schema.topics)
    .where(eq(schema.topics.id, row.topic.id));
  return c.json({ topic: updated });
});

decks.delete("/decks/:deckId/topics/:topicId", async (c) => {
  const userId = c.get("userId");
  const row = await getOwnedTopic(c.req.param("topicId"), userId);
  if (!row) {
    return c.json({ error: "Topic not found" }, 404);
  }

  await db.delete(schema.topics).where(eq(schema.topics.id, row.topic.id));
  return c.json({ ok: true });
});

// ── Concepts CRUD (nested under topics) ────────────────────────

decks.get("/decks/:deckId/topics/:topicId/concepts", async (c) => {
  const userId = c.get("userId");
  const row = await getOwnedTopic(c.req.param("topicId"), userId);
  if (!row) {
    return c.json({ error: "Topic not found" }, 404);
  }

  const conceptList = await db
    .select()
    .from(schema.concepts)
    .where(eq(schema.concepts.topicId, row.topic.id))
    .orderBy(schema.concepts.sortOrder);
  return c.json({ concepts: conceptList });
});

decks.post("/decks/:deckId/topics/:topicId/concepts", async (c) => {
  const userId = c.get("userId");
  const row = await getOwnedTopic(c.req.param("topicId"), userId);
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
  await db.insert(schema.concepts).values({
    id,
    topicId: row.topic.id,
    title: parsed.data.title,
    description: parsed.data.description,
    sortOrder: parsed.data.sortOrder,
    createdAt: now,
    updatedAt: now,
  });

  const [concept] = await db
    .select()
    .from(schema.concepts)
    .where(eq(schema.concepts.id, id));
  return c.json({ concept }, 201);
});

decks.get(
  "/decks/:deckId/topics/:topicId/concepts/:conceptId",
  async (c) => {
    const userId = c.get("userId");
    const row = await getOwnedConcept(c.req.param("conceptId"), userId);
    if (!row) {
      return c.json({ error: "Concept not found" }, 404);
    }

    const tripleList = await db
      .select()
      .from(schema.triples)
      .where(eq(schema.triples.conceptId, row.concept.id))
      .orderBy(schema.triples.sortOrder);
    return c.json({ ...row.concept, triples: tripleList });
  }
);

decks.put(
  "/decks/:deckId/topics/:topicId/concepts/:conceptId",
  async (c) => {
    const userId = c.get("userId");
    const row = await getOwnedConcept(c.req.param("conceptId"), userId);
    if (!row) {
      return c.json({ error: "Concept not found" }, 404);
    }

    const body = await c.req.json();
    const parsed = updateConceptSchema.safeParse(body);
    if (!parsed.success) {
      return c.json({ error: parsed.error.flatten().fieldErrors }, 400);
    }

    const now = new Date().toISOString();
    await db
      .update(schema.concepts)
      .set({ ...parsed.data, updatedAt: now })
      .where(eq(schema.concepts.id, row.concept.id));

    const [updated] = await db
      .select()
      .from(schema.concepts)
      .where(eq(schema.concepts.id, row.concept.id));
    return c.json({ concept: updated });
  }
);

decks.delete(
  "/decks/:deckId/topics/:topicId/concepts/:conceptId",
  async (c) => {
    const userId = c.get("userId");
    const row = await getOwnedConcept(c.req.param("conceptId"), userId);
    if (!row) {
      return c.json({ error: "Concept not found" }, 404);
    }

    await db
      .delete(schema.concepts)
      .where(eq(schema.concepts.id, row.concept.id));
    return c.json({ ok: true });
  }
);

// ── Triples CRUD (nested under concepts) ───────────────────────

decks.get(
  "/decks/:deckId/topics/:topicId/concepts/:conceptId/triples",
  async (c) => {
    const userId = c.get("userId");
    const row = await getOwnedConcept(c.req.param("conceptId"), userId);
    if (!row) {
      return c.json({ error: "Concept not found" }, 404);
    }

    const tripleList = await db
      .select()
      .from(schema.triples)
      .where(eq(schema.triples.conceptId, row.concept.id))
      .orderBy(schema.triples.sortOrder);
    return c.json({ triples: tripleList });
  }
);

decks.post(
  "/decks/:deckId/topics/:topicId/concepts/:conceptId/triples",
  async (c) => {
    const userId = c.get("userId");
    const row = await getOwnedConcept(c.req.param("conceptId"), userId);
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
    await db.insert(schema.triples).values({
      id,
      conceptId: row.concept.id,
      userId,
      subject: parsed.data.subject,
      predicate: parsed.data.predicate,
      object: parsed.data.object,
      sortOrder: parsed.data.sortOrder,
      createdAt: now,
      updatedAt: now,
    });

    const [triple] = await db
      .select()
      .from(schema.triples)
      .where(eq(schema.triples.id, id));
    return c.json({ triple }, 201);
  }
);

decks.put(
  "/decks/:deckId/topics/:topicId/concepts/:conceptId/triples/:tripleId",
  async (c) => {
    const userId = c.get("userId");
    const row = await getOwnedTriple(c.req.param("tripleId"), userId);
    if (!row) {
      return c.json({ error: "Triple not found" }, 404);
    }

    const body = await c.req.json();
    const parsed = updateTripleSchema.safeParse(body);
    if (!parsed.success) {
      return c.json({ error: parsed.error.flatten().fieldErrors }, 400);
    }

    const now = new Date().toISOString();
    await db
      .update(schema.triples)
      .set({ ...parsed.data, updatedAt: now })
      .where(eq(schema.triples.id, row.triple.id));

    const [updated] = await db
      .select()
      .from(schema.triples)
      .where(eq(schema.triples.id, row.triple.id));
    return c.json({ triple: updated });
  }
);

decks.delete(
  "/decks/:deckId/topics/:topicId/concepts/:conceptId/triples/:tripleId",
  async (c) => {
    const userId = c.get("userId");
    const row = await getOwnedTriple(c.req.param("tripleId"), userId);
    if (!row) {
      return c.json({ error: "Triple not found" }, 404);
    }

    await db
      .delete(schema.triples)
      .where(eq(schema.triples.id, row.triple.id));
    return c.json({ ok: true });
  }
);

export default decks;
