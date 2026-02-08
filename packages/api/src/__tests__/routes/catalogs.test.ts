import { createTestDb, closeTestDb, type TestDb } from "../helpers/db.js";
import { createUser, createCatalog, createDeck, resetFixtureCounter } from "../helpers/fixtures.js";
import { createTestApp, jsonRequest } from "../helpers/app.js";
import * as schema from "../../db/schema.js";
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

describe("GET /catalogs", () => {
  test("returns empty list when no catalogs exist", async () => {
    const res = await jsonRequest(app, "GET", "/catalogs");
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.catalogs).toEqual([]);
  });

  test("returns only the authenticated user's catalogs", async () => {
    await jsonRequest(app, "POST", "/catalogs", {
      title: "My Catalog",
      description: null,
    });
    const otherUser = createUser(db);
    const otherApp = createTestApp(db, otherUser.id);
    await jsonRequest(otherApp, "POST", "/catalogs", {
      title: "Other Catalog",
      description: null,
    });

    const res = await jsonRequest(app, "GET", "/catalogs");
    const body = await res.json();

    expect(body.catalogs).toHaveLength(1);
    expect(body.catalogs[0].title).toBe("My Catalog");
  });
});

describe("POST /catalogs", () => {
  test("creates a catalog and returns 201", async () => {
    const res = await jsonRequest(app, "POST", "/catalogs", {
      title: "Nursing 101",
      description: "Nursing fundamentals",
    });
    expect(res.status).toBe(201);
    const body = await res.json();
    expect(body.catalog.title).toBe("Nursing 101");
    expect(body.catalog.description).toBe("Nursing fundamentals");
    expect(body.catalog.createdBy).toBe(userId);
  });

  test("returns 400 for missing title", async () => {
    const res = await jsonRequest(app, "POST", "/catalogs", {
      description: "No title",
    });
    expect(res.status).toBe(400);
  });

  test("returns 400 for empty title", async () => {
    const res = await jsonRequest(app, "POST", "/catalogs", {
      title: "",
      description: null,
    });
    expect(res.status).toBe(400);
  });
});

describe("GET /catalogs/:id", () => {
  test("returns a catalog by id", async () => {
    const createRes = await jsonRequest(app, "POST", "/catalogs", {
      title: "Bio",
      description: null,
    });
    const { catalog } = await createRes.json();

    const res = await jsonRequest(app, "GET", `/catalogs/${catalog.id}`);
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.catalog.title).toBe("Bio");
  });

  test("returns 404 for non-existent catalog", async () => {
    const res = await jsonRequest(app, "GET", "/catalogs/nonexistent");
    expect(res.status).toBe(404);
  });

  test("returns 404 for another user's catalog", async () => {
    const otherUser = createUser(db);
    const otherApp = createTestApp(db, otherUser.id);
    const createRes = await jsonRequest(otherApp, "POST", "/catalogs", {
      title: "Private",
      description: null,
    });
    const { catalog } = await createRes.json();

    const res = await jsonRequest(app, "GET", `/catalogs/${catalog.id}`);
    expect(res.status).toBe(404);
  });
});

describe("PUT /catalogs/:id", () => {
  test("updates catalog title", async () => {
    const createRes = await jsonRequest(app, "POST", "/catalogs", {
      title: "Old Title",
      description: null,
    });
    const { catalog } = await createRes.json();

    const res = await jsonRequest(app, "PUT", `/catalogs/${catalog.id}`, {
      title: "New Title",
    });
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.catalog.title).toBe("New Title");
  });

  test("returns 404 for non-existent catalog", async () => {
    const res = await jsonRequest(app, "PUT", "/catalogs/nonexistent", {
      title: "X",
    });
    expect(res.status).toBe(404);
  });

  test("returns 404 for another user's catalog", async () => {
    const otherUser = createUser(db);
    const otherCatalog = createCatalog(db, { createdBy: otherUser.id });

    const res = await jsonRequest(app, "PUT", `/catalogs/${otherCatalog.id}`, {
      title: "Hacked",
    });
    expect(res.status).toBe(404);
  });
});

describe("DELETE /catalogs/:id", () => {
  test("deletes catalog and cascades to children", async () => {
    const createRes = await jsonRequest(app, "POST", "/catalogs", {
      title: "To Delete",
      description: null,
    });
    const { catalog } = await createRes.json();

    // Add a deck under the catalog
    createDeck(db, { catalogId: catalog.id, title: "Child Deck" });

    const res = await jsonRequest(app, "DELETE", `/catalogs/${catalog.id}`);
    expect(res.status).toBe(200);

    const getRes = await jsonRequest(app, "GET", `/catalogs/${catalog.id}`);
    expect(getRes.status).toBe(404);

    // Verify cascade
    const decks = db.select().from(schema.decks).all();
    expect(decks).toHaveLength(0);
  });

  test("returns 404 for non-existent catalog", async () => {
    const res = await jsonRequest(app, "DELETE", "/catalogs/nonexistent");
    expect(res.status).toBe(404);
  });

  test("returns 404 for another user's catalog", async () => {
    const otherUser = createUser(db);
    const otherCatalog = createCatalog(db, { createdBy: otherUser.id });

    const res = await jsonRequest(app, "DELETE", `/catalogs/${otherCatalog.id}`);
    expect(res.status).toBe(404);
  });
});
