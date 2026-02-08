import { createTestDb, closeTestDb, type TestDb } from "../helpers/db.js";
import { createUser, createCatalog, resetFixtureCounter } from "../helpers/fixtures.js";
import { createTestApp, jsonRequest } from "../helpers/app.js";
import type { Hono } from "hono";
import type { AppEnv } from "../../env.js";
import Database from "better-sqlite3";

let db: TestDb;
let sqlite: InstanceType<typeof Database>;
let app: Hono<AppEnv>;
let userId: string;
let catalogId: string;

beforeEach(() => {
  resetFixtureCounter();
  const testDb = createTestDb();
  db = testDb.db;
  sqlite = testDb.sqlite;
  const user = createUser(db);
  userId = user.id;
  const catalog = createCatalog(db, { createdBy: userId, title: "Test Catalog" });
  catalogId = catalog.id;
  app = createTestApp(db, userId);
});

afterEach(() => {
  closeTestDb(sqlite);
});

// Helper to build catalog-scoped URLs
const decksUrl = (catalogId: string) => `/catalogs/${catalogId}/decks`;
const deckUrl = (catalogId: string, deckId: string) =>
  `/catalogs/${catalogId}/decks/${deckId}`;
const topicsUrl = (catalogId: string, deckId: string) =>
  `/catalogs/${catalogId}/decks/${deckId}/topics`;
const topicUrl = (catalogId: string, deckId: string, topicId: string) =>
  `/catalogs/${catalogId}/decks/${deckId}/topics/${topicId}`;
const conceptsUrl = (catalogId: string, deckId: string, topicId: string) =>
  `/catalogs/${catalogId}/decks/${deckId}/topics/${topicId}/concepts`;
const conceptUrl = (catalogId: string, deckId: string, topicId: string, conceptId: string) =>
  `/catalogs/${catalogId}/decks/${deckId}/topics/${topicId}/concepts/${conceptId}`;
const triplesUrl = (catalogId: string, deckId: string, topicId: string, conceptId: string) =>
  `/catalogs/${catalogId}/decks/${deckId}/topics/${topicId}/concepts/${conceptId}/triples`;
const tripleUrl = (catalogId: string, deckId: string, topicId: string, conceptId: string, tripleId: string) =>
  `/catalogs/${catalogId}/decks/${deckId}/topics/${topicId}/concepts/${conceptId}/triples/${tripleId}`;

// ── Decks CRUD ──────────────────────────────────────────────────

describe("S01: GET /catalogs/:catalogId/decks", () => {
  test("returns empty list when no decks exist", async () => {
    const res = await jsonRequest(app, "GET", decksUrl(catalogId));
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.decks).toEqual([]);
  });

  test("S05: returns only the authenticated user's decks", async () => {
    // Arrange — create decks for our user and another user
    await jsonRequest(app, "POST", decksUrl(catalogId), {
      title: "My Deck",
      description: null,
      sortOrder: 0,
    });
    const otherUser = createUser(db);
    const otherCatalog = createCatalog(db, { createdBy: otherUser.id });
    const otherApp = createTestApp(db, otherUser.id);
    await jsonRequest(otherApp, "POST", decksUrl(otherCatalog.id), {
      title: "Other Deck",
      description: null,
      sortOrder: 0,
    });

    // Act
    const res = await jsonRequest(app, "GET", decksUrl(catalogId));
    const body = await res.json();

    // Assert
    expect(body.decks).toHaveLength(1);
    expect(body.decks[0].title).toBe("My Deck");
  });
});

describe("S01: POST /catalogs/:catalogId/decks", () => {
  test("creates a deck and returns 201", async () => {
    const res = await jsonRequest(app, "POST", decksUrl(catalogId), {
      title: "Biology 101",
      description: "Intro to biology",
      sortOrder: 0,
    });
    expect(res.status).toBe(201);
    const body = await res.json();
    expect(body.deck.title).toBe("Biology 101");
    expect(body.deck.description).toBe("Intro to biology");
    expect(body.deck.catalogId).toBe(catalogId);
  });

  test("returns 400 for invalid body", async () => {
    const res = await jsonRequest(app, "POST", decksUrl(catalogId), {
      description: "Missing title",
      sortOrder: 0,
    });
    expect(res.status).toBe(400);
  });

  test("returns 400 for empty title", async () => {
    const res = await jsonRequest(app, "POST", decksUrl(catalogId), {
      title: "",
      description: null,
      sortOrder: 0,
    });
    expect(res.status).toBe(400);
  });

  test("returns 404 for non-existent catalog", async () => {
    const res = await jsonRequest(app, "POST", decksUrl("nonexistent"), {
      title: "No Catalog",
      description: null,
      sortOrder: 0,
    });
    expect(res.status).toBe(404);
  });
});

describe("S01: GET /catalogs/:catalogId/decks/:id", () => {
  test("returns deck with topics", async () => {
    // Arrange
    const createRes = await jsonRequest(app, "POST", decksUrl(catalogId), {
      title: "Bio",
      description: null,
      sortOrder: 0,
    });
    const { deck } = await createRes.json();

    await jsonRequest(app, "POST", topicsUrl(catalogId, deck.id), {
      title: "Cell Bio",
      description: null,
      sortOrder: 0,
    });

    // Act
    const res = await jsonRequest(app, "GET", deckUrl(catalogId, deck.id));
    const body = await res.json();

    // Assert
    expect(res.status).toBe(200);
    expect(body.title).toBe("Bio");
    expect(body.topics).toHaveLength(1);
    expect(body.topics[0].title).toBe("Cell Bio");
  });

  test("returns 404 for non-existent deck", async () => {
    const res = await jsonRequest(app, "GET", deckUrl(catalogId, "nonexistent"));
    expect(res.status).toBe(404);
  });

  test("S05: returns 404 for another user's deck", async () => {
    // Arrange — create deck as another user
    const otherUser = createUser(db);
    const otherCatalog = createCatalog(db, { createdBy: otherUser.id });
    const otherApp = createTestApp(db, otherUser.id);
    const createRes = await jsonRequest(otherApp, "POST", decksUrl(otherCatalog.id), {
      title: "Private",
      description: null,
      sortOrder: 0,
    });
    const { deck } = await createRes.json();

    // Act — try to access as our user (wrong catalog)
    const res = await jsonRequest(app, "GET", deckUrl(catalogId, deck.id));
    expect(res.status).toBe(404);
  });
});

describe("S01: PUT /catalogs/:catalogId/decks/:id", () => {
  test("updates deck title", async () => {
    const createRes = await jsonRequest(app, "POST", decksUrl(catalogId), {
      title: "Old Title",
      description: null,
      sortOrder: 0,
    });
    const { deck } = await createRes.json();

    const res = await jsonRequest(app, "PUT", deckUrl(catalogId, deck.id), {
      title: "New Title",
    });
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.deck.title).toBe("New Title");
  });

  test("returns 404 for non-existent deck", async () => {
    const res = await jsonRequest(app, "PUT", deckUrl(catalogId, "nonexistent"), {
      title: "X",
    });
    expect(res.status).toBe(404);
  });
});

describe("S01: DELETE /catalogs/:catalogId/decks/:id", () => {
  test("deletes deck and its children", async () => {
    const createRes = await jsonRequest(app, "POST", decksUrl(catalogId), {
      title: "To Delete",
      description: null,
      sortOrder: 0,
    });
    const { deck } = await createRes.json();

    const res = await jsonRequest(app, "DELETE", deckUrl(catalogId, deck.id));
    expect(res.status).toBe(200);

    const getRes = await jsonRequest(app, "GET", deckUrl(catalogId, deck.id));
    expect(getRes.status).toBe(404);
  });
});

// ── Topics CRUD ─────────────────────────────────────────────────

describe("S01: POST .../topics", () => {
  test("creates a topic under a deck", async () => {
    const deckRes = await jsonRequest(app, "POST", decksUrl(catalogId), {
      title: "Bio",
      description: null,
      sortOrder: 0,
    });
    const { deck } = await deckRes.json();

    const res = await jsonRequest(app, "POST", topicsUrl(catalogId, deck.id), {
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
    const res = await jsonRequest(app, "POST", topicsUrl(catalogId, "nonexistent"), {
      title: "Topic",
      description: null,
      sortOrder: 0,
    });
    expect(res.status).toBe(404);
  });
});

// ── Concepts CRUD ───────────────────────────────────────────────

describe("S01: POST .../concepts", () => {
  test("creates a concept under a topic", async () => {
    // Arrange
    const deckRes = await jsonRequest(app, "POST", decksUrl(catalogId), {
      title: "Bio",
      description: null,
      sortOrder: 0,
    });
    const { deck } = await deckRes.json();
    const topicRes = await jsonRequest(app, "POST", topicsUrl(catalogId, deck.id), {
      title: "Cell Bio",
      description: null,
      sortOrder: 0,
    });
    const { topic } = await topicRes.json();

    // Act
    const res = await jsonRequest(
      app,
      "POST",
      conceptsUrl(catalogId, deck.id, topic.id),
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

describe("S01: Triples CRUD", () => {
  let deckId: string;
  let topicId: string;
  let conceptId: string;

  beforeEach(async () => {
    const deckRes = await jsonRequest(app, "POST", decksUrl(catalogId), {
      title: "Bio",
      description: null,
      sortOrder: 0,
    });
    deckId = (await deckRes.json()).deck.id;

    const topicRes = await jsonRequest(app, "POST", topicsUrl(catalogId, deckId), {
      title: "Cell Bio",
      description: null,
      sortOrder: 0,
    });
    topicId = (await topicRes.json()).topic.id;

    const conceptRes = await jsonRequest(
      app,
      "POST",
      conceptsUrl(catalogId, deckId, topicId),
      { title: "Cell Membrane", description: null, sortOrder: 0 }
    );
    conceptId = (await conceptRes.json()).concept.id;
  });

  const tUrl = () => triplesUrl(catalogId, deckId, topicId, conceptId);

  test("POST creates a triple", async () => {
    const res = await jsonRequest(app, "POST", tUrl(), {
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
    await jsonRequest(app, "POST", tUrl(), {
      subject: "Cell membrane",
      predicate: "is composed of",
      object: "phospholipid bilayer",
      sortOrder: 0,
    });
    await jsonRequest(app, "POST", tUrl(), {
      subject: "Cell membrane",
      predicate: "function",
      object: "selective permeability",
      sortOrder: 1,
    });

    const res = await jsonRequest(app, "GET", tUrl());
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.triples).toHaveLength(2);
  });

  test("S04: PUT updates a triple", async () => {
    const createRes = await jsonRequest(app, "POST", tUrl(), {
      subject: "Cell membrane",
      predicate: "is composed of",
      object: "lipids",
      sortOrder: 0,
    });
    const { triple } = await createRes.json();

    const res = await jsonRequest(
      app,
      "PUT",
      tripleUrl(catalogId, deckId, topicId, conceptId, triple.id),
      { object: "phospholipid bilayer" }
    );
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.triple.object).toBe("phospholipid bilayer");
  });

  test("DELETE removes a triple", async () => {
    const createRes = await jsonRequest(app, "POST", tUrl(), {
      subject: "Cell membrane",
      predicate: "is composed of",
      object: "phospholipid bilayer",
      sortOrder: 0,
    });
    const { triple } = await createRes.json();

    const res = await jsonRequest(
      app,
      "DELETE",
      tripleUrl(catalogId, deckId, topicId, conceptId, triple.id)
    );
    expect(res.status).toBe(200);

    const listRes = await jsonRequest(app, "GET", tUrl());
    const body = await listRes.json();
    expect(body.triples).toHaveLength(0);
  });

  test("POST returns 400 for missing subject", async () => {
    const res = await jsonRequest(app, "POST", tUrl(), {
      predicate: "is",
      object: "something",
      sortOrder: 0,
    });
    expect(res.status).toBe(400);
  });
});
