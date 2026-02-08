import { createTestDb, closeTestDb, type TestDb } from "../helpers/db.js";
import { createUser, resetFixtureCounter } from "../helpers/fixtures.js";
import { createTestApp, jsonRequest } from "../helpers/app.js";
import type { Hono } from "hono";
import type { AppEnv } from "../../env.js";
import Database from "better-sqlite3";

let db: TestDb;
let sqlite: InstanceType<typeof Database>;
let app: Hono<AppEnv>;
let userId: string;

beforeEach(() => {
  resetFixtureCounter();
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

// ── Decks CRUD ──────────────────────────────────────────────────

describe("GET /decks", () => {
  test("returns empty list when no decks exist", async () => {
    const res = await jsonRequest(app, "GET", "/decks");
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.decks).toEqual([]);
  });

  test("returns only the authenticated user's decks", async () => {
    // Arrange — create decks for our user and another user
    await jsonRequest(app, "POST", "/decks", {
      title: "My Deck",
      description: null,
      sortOrder: 0,
    });
    const otherUser = createUser(db);
    const otherApp = createTestApp(db, otherUser.id);
    await jsonRequest(otherApp, "POST", "/decks", {
      title: "Other Deck",
      description: null,
      sortOrder: 0,
    });

    // Act
    const res = await jsonRequest(app, "GET", "/decks");
    const body = await res.json();

    // Assert
    expect(body.decks).toHaveLength(1);
    expect(body.decks[0].title).toBe("My Deck");
  });
});

describe("POST /decks", () => {
  test("creates a deck and returns 201", async () => {
    const res = await jsonRequest(app, "POST", "/decks", {
      title: "Biology 101",
      description: "Intro to biology",
      sortOrder: 0,
    });
    expect(res.status).toBe(201);
    const body = await res.json();
    expect(body.deck.title).toBe("Biology 101");
    expect(body.deck.description).toBe("Intro to biology");
    expect(body.deck.userId).toBe(userId);
  });

  test("returns 400 for invalid body", async () => {
    const res = await jsonRequest(app, "POST", "/decks", {
      description: "Missing title",
      sortOrder: 0,
    });
    expect(res.status).toBe(400);
  });

  test("returns 400 for empty title", async () => {
    const res = await jsonRequest(app, "POST", "/decks", {
      title: "",
      description: null,
      sortOrder: 0,
    });
    expect(res.status).toBe(400);
  });
});

describe("GET /decks/:id", () => {
  test("returns deck with topics", async () => {
    // Arrange
    const createRes = await jsonRequest(app, "POST", "/decks", {
      title: "Bio",
      description: null,
      sortOrder: 0,
    });
    const { deck } = await createRes.json();

    await jsonRequest(app, "POST", `/decks/${deck.id}/topics`, {
      title: "Cell Bio",
      description: null,
      sortOrder: 0,
    });

    // Act
    const res = await jsonRequest(app, "GET", `/decks/${deck.id}`);
    const body = await res.json();

    // Assert
    expect(res.status).toBe(200);
    expect(body.title).toBe("Bio");
    expect(body.topics).toHaveLength(1);
    expect(body.topics[0].title).toBe("Cell Bio");
  });

  test("returns 404 for non-existent deck", async () => {
    const res = await jsonRequest(app, "GET", "/decks/nonexistent");
    expect(res.status).toBe(404);
  });

  test("returns 404 for another user's deck", async () => {
    // Arrange — create deck as another user
    const otherUser = createUser(db);
    const otherApp = createTestApp(db, otherUser.id);
    const createRes = await jsonRequest(otherApp, "POST", "/decks", {
      title: "Private",
      description: null,
      sortOrder: 0,
    });
    const { deck } = await createRes.json();

    // Act — try to access as our user
    const res = await jsonRequest(app, "GET", `/decks/${deck.id}`);
    expect(res.status).toBe(404);
  });
});

describe("PUT /decks/:id", () => {
  test("updates deck title", async () => {
    const createRes = await jsonRequest(app, "POST", "/decks", {
      title: "Old Title",
      description: null,
      sortOrder: 0,
    });
    const { deck } = await createRes.json();

    const res = await jsonRequest(app, "PUT", `/decks/${deck.id}`, {
      title: "New Title",
    });
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.deck.title).toBe("New Title");
  });

  test("returns 404 for non-existent deck", async () => {
    const res = await jsonRequest(app, "PUT", "/decks/nonexistent", {
      title: "X",
    });
    expect(res.status).toBe(404);
  });
});

describe("DELETE /decks/:id", () => {
  test("deletes deck and its children", async () => {
    const createRes = await jsonRequest(app, "POST", "/decks", {
      title: "To Delete",
      description: null,
      sortOrder: 0,
    });
    const { deck } = await createRes.json();

    const res = await jsonRequest(app, "DELETE", `/decks/${deck.id}`);
    expect(res.status).toBe(200);

    const getRes = await jsonRequest(app, "GET", `/decks/${deck.id}`);
    expect(getRes.status).toBe(404);
  });
});

// ── Topics CRUD ─────────────────────────────────────────────────

describe("POST /decks/:deckId/topics", () => {
  test("creates a topic under a deck", async () => {
    const deckRes = await jsonRequest(app, "POST", "/decks", {
      title: "Bio",
      description: null,
      sortOrder: 0,
    });
    const { deck } = await deckRes.json();

    const res = await jsonRequest(app, "POST", `/decks/${deck.id}/topics`, {
      title: "Cell Biology",
      description: "Study of cells",
      sortOrder: 0,
    });
    expect(res.status).toBe(201);
    const body = await res.json();
    expect(body.topic.title).toBe("Cell Biology");
    expect(body.topic.deckId).toBe(deck.id);
  });

  test("returns 404 for non-existent deck", async () => {
    const res = await jsonRequest(app, "POST", "/decks/nonexistent/topics", {
      title: "Topic",
      description: null,
      sortOrder: 0,
    });
    expect(res.status).toBe(404);
  });
});

// ── Concepts CRUD ───────────────────────────────────────────────

describe("POST /decks/:deckId/topics/:topicId/concepts", () => {
  test("creates a concept under a topic", async () => {
    // Arrange
    const deckRes = await jsonRequest(app, "POST", "/decks", {
      title: "Bio",
      description: null,
      sortOrder: 0,
    });
    const { deck } = await deckRes.json();
    const topicRes = await jsonRequest(app, "POST", `/decks/${deck.id}/topics`, {
      title: "Cell Bio",
      description: null,
      sortOrder: 0,
    });
    const { topic } = await topicRes.json();

    // Act
    const res = await jsonRequest(
      app,
      "POST",
      `/decks/${deck.id}/topics/${topic.id}/concepts`,
      { title: "Cell Membrane", description: null, sortOrder: 0 }
    );

    // Assert
    expect(res.status).toBe(201);
    const body = await res.json();
    expect(body.concept.title).toBe("Cell Membrane");
    expect(body.concept.topicId).toBe(topic.id);
  });
});

// ── Triples CRUD ────────────────────────────────────────────────

describe("Triples CRUD", () => {
  let deckId: string;
  let topicId: string;
  let conceptId: string;

  beforeEach(async () => {
    const deckRes = await jsonRequest(app, "POST", "/decks", {
      title: "Bio",
      description: null,
      sortOrder: 0,
    });
    deckId = (await deckRes.json()).deck.id;

    const topicRes = await jsonRequest(app, "POST", `/decks/${deckId}/topics`, {
      title: "Cell Bio",
      description: null,
      sortOrder: 0,
    });
    topicId = (await topicRes.json()).topic.id;

    const conceptRes = await jsonRequest(
      app,
      "POST",
      `/decks/${deckId}/topics/${topicId}/concepts`,
      { title: "Cell Membrane", description: null, sortOrder: 0 }
    );
    conceptId = (await conceptRes.json()).concept.id;
  });

  const tripleUrl = () =>
    `/decks/${deckId}/topics/${topicId}/concepts/${conceptId}/triples`;

  test("POST creates a triple", async () => {
    const res = await jsonRequest(app, "POST", tripleUrl(), {
      subject: "Cell membrane",
      predicate: "is composed of",
      object: "phospholipid bilayer",
      sortOrder: 0,
    });
    expect(res.status).toBe(201);
    const body = await res.json();
    expect(body.triple.subject).toBe("Cell membrane");
    expect(body.triple.predicate).toBe("is composed of");
    expect(body.triple.object).toBe("phospholipid bilayer");
  });

  test("GET lists triples for a concept", async () => {
    await jsonRequest(app, "POST", tripleUrl(), {
      subject: "Cell membrane",
      predicate: "is composed of",
      object: "phospholipid bilayer",
      sortOrder: 0,
    });
    await jsonRequest(app, "POST", tripleUrl(), {
      subject: "Cell membrane",
      predicate: "function",
      object: "selective permeability",
      sortOrder: 1,
    });

    const res = await jsonRequest(app, "GET", tripleUrl());
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.triples).toHaveLength(2);
  });

  test("PUT updates a triple", async () => {
    const createRes = await jsonRequest(app, "POST", tripleUrl(), {
      subject: "Cell membrane",
      predicate: "is composed of",
      object: "lipids",
      sortOrder: 0,
    });
    const { triple } = await createRes.json();

    const res = await jsonRequest(
      app,
      "PUT",
      `${tripleUrl()}/${triple.id}`,
      { object: "phospholipid bilayer" }
    );
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.triple.object).toBe("phospholipid bilayer");
  });

  test("DELETE removes a triple", async () => {
    const createRes = await jsonRequest(app, "POST", tripleUrl(), {
      subject: "Cell membrane",
      predicate: "is composed of",
      object: "phospholipid bilayer",
      sortOrder: 0,
    });
    const { triple } = await createRes.json();

    const res = await jsonRequest(app, "DELETE", `${tripleUrl()}/${triple.id}`);
    expect(res.status).toBe(200);

    const listRes = await jsonRequest(app, "GET", tripleUrl());
    const body = await listRes.json();
    expect(body.triples).toHaveLength(0);
  });

  test("POST returns 400 for missing subject", async () => {
    const res = await jsonRequest(app, "POST", tripleUrl(), {
      predicate: "is",
      object: "something",
      sortOrder: 0,
    });
    expect(res.status).toBe(400);
  });
});
