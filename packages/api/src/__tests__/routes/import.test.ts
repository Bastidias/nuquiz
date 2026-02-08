import { createTestDb, closeTestDb, type TestDb } from "../helpers/db.js";
import { createUser, resetFixtureCounter } from "../helpers/fixtures.js";
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

const validImport = {
  title: "Biology",
  description: "Intro to biology",
  topics: [
    {
      title: "Cell Biology",
      concepts: [
        {
          title: "Cell Membrane",
          triples: [
            {
              subject: "Cell membrane",
              predicate: "is composed of",
              object: "phospholipid bilayer",
            },
            {
              subject: "Cell membrane",
              predicate: "function",
              object: "selective permeability",
            },
          ],
        },
        {
          title: "Organelles",
          triples: [
            {
              subject: "Mitochondria",
              predicate: "produces",
              object: "ATP",
            },
          ],
        },
      ],
    },
    {
      title: "Genetics",
      concepts: [
        {
          title: "DNA Structure",
          triples: [
            {
              subject: "DNA",
              predicate: "is composed of",
              object: "nucleotides",
            },
          ],
        },
      ],
    },
  ],
};

describe("POST /import", () => {
  test("imports a full deck hierarchy and returns 201", async () => {
    const res = await jsonRequest(app, "POST", "/import", validImport);
    expect(res.status).toBe(201);
    const body = await res.json();

    expect(body.deckId).toBeDefined();
    expect(body.topicsCreated).toBe(2);
    expect(body.conceptsCreated).toBe(3);
    expect(body.triplesCreated).toBe(4);
    expect(body.tagsCreated).toBe(0);
  });

  test("creates all entities in the database", async () => {
    await jsonRequest(app, "POST", "/import", validImport);

    const decks = db.select().from(schema.decks).all();
    const topics = db.select().from(schema.topics).all();
    const concepts = db.select().from(schema.concepts).all();
    const triples = db.select().from(schema.triples).all();

    expect(decks).toHaveLength(1);
    expect(decks[0].title).toBe("Biology");
    expect(topics).toHaveLength(2);
    expect(concepts).toHaveLength(3);
    expect(triples).toHaveLength(4);
  });

  test("imports with tags and creates tag associations", async () => {
    const importWithTags = {
      title: "Chemistry",
      topics: [
        {
          title: "Elements",
          concepts: [
            {
              title: "Hydrogen",
              triples: [
                {
                  subject: "Hydrogen",
                  predicate: "has atomic number",
                  object: "1",
                  tags: ["elements", "basics"],
                },
                {
                  subject: "Hydrogen",
                  predicate: "has symbol",
                  object: "H",
                  tags: ["elements"],
                },
              ],
            },
          ],
        },
      ],
    };

    const res = await jsonRequest(app, "POST", "/import", importWithTags);
    expect(res.status).toBe(201);
    const body = await res.json();
    expect(body.tagsCreated).toBe(2); // "elements" and "basics"

    const tags = db.select().from(schema.tags).all();
    expect(tags).toHaveLength(2);

    const tripleTags = db.select().from(schema.tripleTags).all();
    expect(tripleTags).toHaveLength(3); // 2 tags on first triple, 1 on second
  });

  test("dry run validates without persisting", async () => {
    const res = await jsonRequest(app, "POST", "/import?dryRun=true", validImport);
    expect(res.status).toBe(200);
    const body = await res.json();

    expect(body.valid).toBe(true);
    expect(body.errors).toEqual([]);
    expect(body.summary.topicsCreated).toBe(2);
    expect(body.summary.conceptsCreated).toBe(3);
    expect(body.summary.triplesCreated).toBe(4);

    // Verify nothing was persisted
    const decks = db.select().from(schema.decks).all();
    expect(decks).toHaveLength(0);
  });

  test("dry run reports validation errors", async () => {
    const invalidImport = {
      title: "Bad",
      topics: [
        {
          title: "Topic",
          concepts: [
            {
              title: "Concept",
              triples: [
                {
                  subject: "   ",
                  predicate: "is",
                  object: "B",
                },
              ],
            },
          ],
        },
      ],
    };

    const res = await jsonRequest(app, "POST", "/import?dryRun=true", invalidImport);
    const body = await res.json();

    expect(body.valid).toBe(false);
    expect(body.errors).toHaveLength(1);
    expect(body.errors[0].path).toContain("subject");
  });

  test("rejects invalid schema (empty topics)", async () => {
    const res = await jsonRequest(app, "POST", "/import", {
      title: "Empty",
      topics: [],
    });
    expect(res.status).toBe(400);
  });

  test("rejects whitespace-only SPO fields", async () => {
    const badImport = {
      title: "Bad",
      topics: [
        {
          title: "Topic",
          concepts: [
            {
              title: "Concept",
              triples: [
                {
                  subject: "  ",
                  predicate: "  ",
                  object: "  ",
                },
              ],
            },
          ],
        },
      ],
    };

    const res = await jsonRequest(app, "POST", "/import", badImport);
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.errors).toHaveLength(3);
  });

  test("assigns sortOrder based on position", async () => {
    await jsonRequest(app, "POST", "/import", validImport);

    const topics = db.select().from(schema.topics).all();
    const sortOrders = topics.map((t) => t.sortOrder).sort();
    expect(sortOrders).toEqual([0, 1]);

    const triples = db.select().from(schema.triples).all();
    // Cell Membrane concept has 2 triples (sortOrder 0, 1)
    const cellMembraneTriples = triples.filter(
      (t) => t.subject === "Cell membrane"
    );
    expect(cellMembraneTriples.map((t) => t.sortOrder).sort()).toEqual([0, 1]);
  });
});
