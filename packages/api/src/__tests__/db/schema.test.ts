import { eq } from "drizzle-orm";
import { createTestDb, closeTestDb, type TestDb } from "../helpers/db.js";
import {
  createUser,
  createCatalog,
  createSubscription,
  createDeck,
  createTopic,
  createConcept,
  createTriple,
  createTag,
  tagTriple,
  createFullHierarchy,
  resetFixtureCounter,
} from "../helpers/fixtures.js";
import * as schema from "../../db/schema.js";
import Database from "better-sqlite3";

let db: TestDb;
let sqlite: InstanceType<typeof Database>;

beforeEach(() => {
  resetFixtureCounter();
  const testDb = createTestDb();
  db = testDb.db;
  sqlite = testDb.sqlite;
});

afterEach(() => {
  closeTestDb(sqlite);
});

// ── Foreign Key Constraints ─────────────────────────────────────

describe("foreign key constraints", () => {
  test("catalog requires a valid created_by", () => {
    expect(() => {
      sqlite
        .prepare(
          "INSERT INTO catalogs (id, created_by, title, created_at, updated_at) VALUES ('c1', 'nonexistent', 'Test', '2024-01-01', '2024-01-01')"
        )
        .run();
    }).toThrow();
  });

  test("deck requires a valid catalog_id", () => {
    expect(() => {
      sqlite
        .prepare(
          "INSERT INTO decks (id, catalog_id, title, sort_order, created_at, updated_at) VALUES ('d1', 'nonexistent', 'Test', 0, '2024-01-01', '2024-01-01')"
        )
        .run();
    }).toThrow();
  });

  test("topic requires a valid deck_id", () => {
    expect(() => {
      sqlite
        .prepare(
          "INSERT INTO topics (id, deck_id, title, sort_order, created_at, updated_at) VALUES ('t1', 'nonexistent', 'Test', 0, '2024-01-01', '2024-01-01')"
        )
        .run();
    }).toThrow();
  });

  test("concept requires a valid topic_id", () => {
    expect(() => {
      sqlite
        .prepare(
          "INSERT INTO concepts (id, topic_id, title, sort_order, created_at, updated_at) VALUES ('c1', 'nonexistent', 'Test', 0, '2024-01-01', '2024-01-01')"
        )
        .run();
    }).toThrow();
  });

  test("triple requires a valid concept_id", () => {
    expect(() => {
      sqlite
        .prepare(
          "INSERT INTO triples (id, concept_id, subject, predicate, object, sort_order, created_at, updated_at) VALUES ('t1', 'nonexistent', 'A', 'is', 'B', 0, '2024-01-01', '2024-01-01')"
        )
        .run();
    }).toThrow();
  });

  test("tag requires a valid catalog_id", () => {
    expect(() => {
      sqlite
        .prepare(
          "INSERT INTO tags (id, catalog_id, name, created_at) VALUES ('tag1', 'nonexistent', 'test', '2024-01-01')"
        )
        .run();
    }).toThrow();
  });

  test("subscription requires a valid user_id", () => {
    const user = createUser(db);
    const catalog = createCatalog(db, { createdBy: user.id });
    expect(() => {
      sqlite
        .prepare("INSERT INTO subscriptions (id, user_id, catalog_id, created_at) VALUES ('s1', 'nonexistent', ?, '2024-01-01')")
        .run(catalog.id);
    }).toThrow();
  });

  test("subscription requires a valid catalog_id", () => {
    const user = createUser(db);
    expect(() => {
      sqlite
        .prepare("INSERT INTO subscriptions (id, user_id, catalog_id, created_at) VALUES ('s1', ?, 'nonexistent', '2024-01-01')")
        .run(user.id);
    }).toThrow();
  });

  test("triple_tags requires a valid triple_id", () => {
    const user = createUser(db);
    const catalog = createCatalog(db, { createdBy: user.id });
    const tag = createTag(db, { catalogId: catalog.id });
    expect(() => {
      sqlite
        .prepare("INSERT INTO triple_tags (triple_id, tag_id) VALUES ('nonexistent', ?)")
        .run(tag.id);
    }).toThrow();
  });

  test("triple_tags requires a valid tag_id", () => {
    const user = createUser(db);
    const { triple } = createFullHierarchy(db, user.id);
    expect(() => {
      sqlite
        .prepare("INSERT INTO triple_tags (triple_id, tag_id) VALUES (?, 'nonexistent')")
        .run(triple.id);
    }).toThrow();
  });
});

// ── Cascade Deletes ─────────────────────────────────────────────

describe("cascade deletes", () => {
  test("deleting a user cascades to their catalogs", () => {
    const user = createUser(db);
    createCatalog(db, { createdBy: user.id });
    createCatalog(db, { createdBy: user.id });

    db.delete(schema.users).where(eq(schema.users.id, user.id)).run();

    const remaining = db.select().from(schema.catalogs).all();
    expect(remaining).toHaveLength(0);
  });

  test("deleting a catalog cascades to its decks", () => {
    const user = createUser(db);
    const catalog = createCatalog(db, { createdBy: user.id });
    createDeck(db, { catalogId: catalog.id });
    createDeck(db, { catalogId: catalog.id });

    db.delete(schema.catalogs).where(eq(schema.catalogs.id, catalog.id)).run();

    const remaining = db.select().from(schema.decks).all();
    expect(remaining).toHaveLength(0);
  });

  test("deleting a catalog cascades to its subscriptions", () => {
    const user = createUser(db);
    const catalog = createCatalog(db, { createdBy: user.id });
    createSubscription(db, { userId: user.id, catalogId: catalog.id });

    db.delete(schema.catalogs).where(eq(schema.catalogs.id, catalog.id)).run();

    const remaining = db.select().from(schema.subscriptions).all();
    expect(remaining).toHaveLength(0);
  });

  test("deleting a deck cascades to its topics", () => {
    const user = createUser(db);
    const catalog = createCatalog(db, { createdBy: user.id });
    const deck = createDeck(db, { catalogId: catalog.id });
    createTopic(db, { deckId: deck.id });
    createTopic(db, { deckId: deck.id });

    db.delete(schema.decks).where(eq(schema.decks.id, deck.id)).run();

    const remaining = db.select().from(schema.topics).all();
    expect(remaining).toHaveLength(0);
  });

  test("deleting a topic cascades to its concepts", () => {
    const user = createUser(db);
    const catalog = createCatalog(db, { createdBy: user.id });
    const deck = createDeck(db, { catalogId: catalog.id });
    const topic = createTopic(db, { deckId: deck.id });
    createConcept(db, { topicId: topic.id });

    db.delete(schema.topics).where(eq(schema.topics.id, topic.id)).run();

    const remaining = db.select().from(schema.concepts).all();
    expect(remaining).toHaveLength(0);
  });

  test("deleting a concept cascades to its triples", () => {
    const user = createUser(db);
    const catalog = createCatalog(db, { createdBy: user.id });
    const deck = createDeck(db, { catalogId: catalog.id });
    const topic = createTopic(db, { deckId: deck.id });
    const concept = createConcept(db, { topicId: topic.id });
    createTriple(db, { conceptId: concept.id });
    createTriple(db, { conceptId: concept.id });

    db.delete(schema.concepts).where(eq(schema.concepts.id, concept.id)).run();

    const remaining = db.select().from(schema.triples).all();
    expect(remaining).toHaveLength(0);
  });

  test("deleting a catalog cascades through entire hierarchy to triples", () => {
    const user = createUser(db);
    const { catalog } = createFullHierarchy(db, user.id);

    db.delete(schema.catalogs).where(eq(schema.catalogs.id, catalog.id)).run();

    expect(db.select().from(schema.decks).all()).toHaveLength(0);
    expect(db.select().from(schema.topics).all()).toHaveLength(0);
    expect(db.select().from(schema.concepts).all()).toHaveLength(0);
    expect(db.select().from(schema.triples).all()).toHaveLength(0);
  });

  test("deleting a triple cascades to its triple_tags", () => {
    const user = createUser(db);
    const { catalog, triple } = createFullHierarchy(db, user.id);
    const tag = createTag(db, { catalogId: catalog.id, name: "important" });
    tagTriple(db, triple.id, tag.id);

    db.delete(schema.triples).where(eq(schema.triples.id, triple.id)).run();

    const remaining = db.select().from(schema.tripleTags).all();
    expect(remaining).toHaveLength(0);
  });

  test("deleting a tag cascades to its triple_tags", () => {
    const user = createUser(db);
    const { catalog, triple } = createFullHierarchy(db, user.id);
    const tag = createTag(db, { catalogId: catalog.id, name: "important" });
    tagTriple(db, triple.id, tag.id);

    db.delete(schema.tags).where(eq(schema.tags.id, tag.id)).run();

    const remaining = db.select().from(schema.tripleTags).all();
    expect(remaining).toHaveLength(0);
  });

  test("deleting a catalog cascades to its tags", () => {
    const user = createUser(db);
    const catalog = createCatalog(db, { createdBy: user.id });
    createTag(db, { catalogId: catalog.id, name: "tag1" });
    createTag(db, { catalogId: catalog.id, name: "tag2" });

    db.delete(schema.catalogs).where(eq(schema.catalogs.id, catalog.id)).run();

    const remaining = db.select().from(schema.tags).all();
    expect(remaining).toHaveLength(0);
  });

  test("deleting one user does not affect another user's data", () => {
    const user1 = createUser(db, { id: "user1" });
    const user2 = createUser(db, { id: "user2" });
    createFullHierarchy(db, user1.id);
    createFullHierarchy(db, user2.id);

    db.delete(schema.users).where(eq(schema.users.id, user1.id)).run();

    const decks = db.select().from(schema.decks).all();
    expect(decks).toHaveLength(1);
  });
});

// ── Unique Constraints ──────────────────────────────────────────

describe("unique constraints", () => {
  test("user email must be unique", () => {
    createUser(db, { email: "same@test.com" });
    expect(() => {
      createUser(db, { email: "same@test.com" });
    }).toThrow();
  });

  test("tag name must be unique per catalog", () => {
    const user = createUser(db);
    const catalog = createCatalog(db, { createdBy: user.id });
    createTag(db, { catalogId: catalog.id, name: "biology" });
    expect(() => {
      createTag(db, { catalogId: catalog.id, name: "biology" });
    }).toThrow();
  });

  test("different catalogs can have tags with the same name", () => {
    const user = createUser(db);
    const catalog1 = createCatalog(db, { createdBy: user.id, title: "Cat 1" });
    const catalog2 = createCatalog(db, { createdBy: user.id, title: "Cat 2" });
    createTag(db, { catalogId: catalog1.id, name: "biology" });
    createTag(db, { catalogId: catalog2.id, name: "biology" });

    const allTags = db.select().from(schema.tags).all();
    expect(allTags).toHaveLength(2);
  });

  test("subscription user+catalog must be unique", () => {
    const user = createUser(db);
    const catalog = createCatalog(db, { createdBy: user.id });
    createSubscription(db, { userId: user.id, catalogId: catalog.id });
    expect(() => {
      createSubscription(db, { userId: user.id, catalogId: catalog.id });
    }).toThrow();
  });

  test("triple_tags combination must be unique", () => {
    const user = createUser(db);
    const { catalog, triple } = createFullHierarchy(db, user.id);
    const tag = createTag(db, { catalogId: catalog.id, name: "test" });
    tagTriple(db, triple.id, tag.id);
    expect(() => {
      tagTriple(db, triple.id, tag.id);
    }).toThrow();
  });
});

// ── NOT NULL Constraints ────────────────────────────────────────

describe("NOT NULL constraints", () => {
  test("deck title cannot be null", () => {
    const user = createUser(db);
    const catalog = createCatalog(db, { createdBy: user.id });
    expect(() => {
      sqlite
        .prepare(
          "INSERT INTO decks (id, catalog_id, title, sort_order, created_at, updated_at) VALUES ('d1', ?, NULL, 0, '2024-01-01', '2024-01-01')"
        )
        .run(catalog.id);
    }).toThrow();
  });

  test("triple subject field cannot be null", () => {
    const user = createUser(db);
    const { concept } = createFullHierarchy(db, user.id);
    expect(() => {
      sqlite
        .prepare(
          "INSERT INTO triples (id, concept_id, subject, predicate, object, sort_order, created_at, updated_at) VALUES ('t99', ?, NULL, 'is', 'B', 0, '2024-01-01', '2024-01-01')"
        )
        .run(concept.id);
    }).toThrow();
  });

  test("triple predicate field cannot be null", () => {
    const user = createUser(db);
    const { concept } = createFullHierarchy(db, user.id);
    expect(() => {
      sqlite
        .prepare(
          "INSERT INTO triples (id, concept_id, subject, predicate, object, sort_order, created_at, updated_at) VALUES ('t99', ?, 'A', NULL, 'B', 0, '2024-01-01', '2024-01-01')"
        )
        .run(concept.id);
    }).toThrow();
  });

  test("triple object field cannot be null", () => {
    const user = createUser(db);
    const { concept } = createFullHierarchy(db, user.id);
    expect(() => {
      sqlite
        .prepare(
          "INSERT INTO triples (id, concept_id, subject, predicate, object, sort_order, created_at, updated_at) VALUES ('t99', ?, 'A', 'is', NULL, 0, '2024-01-01', '2024-01-01')"
        )
        .run(concept.id);
    }).toThrow();
  });

  test("description can be null (optional field)", () => {
    const user = createUser(db);
    const catalog = createCatalog(db, { createdBy: user.id });
    sqlite
      .prepare(
        "INSERT INTO decks (id, catalog_id, title, description, sort_order, created_at, updated_at) VALUES ('d99', ?, 'Test', NULL, 0, '2024-01-01', '2024-01-01')"
      )
      .run(catalog.id);

    const decks = db.select().from(schema.decks).where(eq(schema.decks.id, "d99")).all();
    expect(decks).toHaveLength(1);
    expect(decks[0].description).toBeNull();
  });
});
