import { eq } from "drizzle-orm";
import { createTestDb, closeTestDb, type TestDb } from "../helpers/db.js";
import {
  createUser,
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
  test("deck requires a valid user_id", () => {
    expect(() => {
      sqlite
        .prepare(
          "INSERT INTO decks (id, user_id, title, sort_order, created_at, updated_at) VALUES ('d1', 'nonexistent', 'Test', 0, '2024-01-01', '2024-01-01')"
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
    const user = createUser(db);
    expect(() => {
      sqlite
        .prepare(
          "INSERT INTO triples (id, concept_id, user_id, subject, predicate, object, sort_order, created_at, updated_at) VALUES ('t1', 'nonexistent', ?, 'A', 'is', 'B', 0, '2024-01-01', '2024-01-01')"
        )
        .run(user.id);
    }).toThrow();
  });

  test("triple requires a valid user_id", () => {
    const user = createUser(db);
    const { concept } = createFullHierarchy(db, user.id);
    expect(() => {
      sqlite
        .prepare(
          "INSERT INTO triples (id, concept_id, user_id, subject, predicate, object, sort_order, created_at, updated_at) VALUES ('tr2', ?, 'nonexistent', 'A', 'is', 'B', 0, '2024-01-01', '2024-01-01')"
        )
        .run(concept.id);
    }).toThrow();
  });

  test("tag requires a valid user_id", () => {
    expect(() => {
      sqlite
        .prepare(
          "INSERT INTO tags (id, user_id, name, created_at) VALUES ('tag1', 'nonexistent', 'test', '2024-01-01')"
        )
        .run();
    }).toThrow();
  });

  test("triple_tags requires a valid triple_id", () => {
    const user = createUser(db);
    const tag = createTag(db, { userId: user.id });
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
  test("deleting a user cascades to their decks", () => {
    // Arrange
    const user = createUser(db);
    createDeck(db, { userId: user.id });
    createDeck(db, { userId: user.id });

    // Act
    db.delete(schema.users).where(eq(schema.users.id, user.id)).run();

    // Assert
    const remaining = db.select().from(schema.decks).all();
    expect(remaining).toHaveLength(0);
  });

  test("deleting a deck cascades to its topics", () => {
    // Arrange
    const user = createUser(db);
    const deck = createDeck(db, { userId: user.id });
    createTopic(db, { deckId: deck.id });
    createTopic(db, { deckId: deck.id });

    // Act
    db.delete(schema.decks).where(eq(schema.decks.id, deck.id)).run();

    // Assert
    const remaining = db.select().from(schema.topics).all();
    expect(remaining).toHaveLength(0);
  });

  test("deleting a topic cascades to its concepts", () => {
    // Arrange
    const user = createUser(db);
    const deck = createDeck(db, { userId: user.id });
    const topic = createTopic(db, { deckId: deck.id });
    createConcept(db, { topicId: topic.id });

    // Act
    db.delete(schema.topics).where(eq(schema.topics.id, topic.id)).run();

    // Assert
    const remaining = db.select().from(schema.concepts).all();
    expect(remaining).toHaveLength(0);
  });

  test("deleting a concept cascades to its triples", () => {
    // Arrange
    const user = createUser(db);
    const deck = createDeck(db, { userId: user.id });
    const topic = createTopic(db, { deckId: deck.id });
    const concept = createConcept(db, { topicId: topic.id });
    createTriple(db, { conceptId: concept.id, userId: user.id });
    createTriple(db, { conceptId: concept.id, userId: user.id });

    // Act
    db.delete(schema.concepts).where(eq(schema.concepts.id, concept.id)).run();

    // Assert
    const remaining = db.select().from(schema.triples).all();
    expect(remaining).toHaveLength(0);
  });

  test("deleting a deck cascades through entire hierarchy to triples", () => {
    // Arrange — full tree: deck -> topic -> concept -> triple
    const user = createUser(db);
    const { deck } = createFullHierarchy(db, user.id);

    // Act
    db.delete(schema.decks).where(eq(schema.decks.id, deck.id)).run();

    // Assert — everything under the deck should be gone
    expect(db.select().from(schema.topics).all()).toHaveLength(0);
    expect(db.select().from(schema.concepts).all()).toHaveLength(0);
    expect(db.select().from(schema.triples).all()).toHaveLength(0);
  });

  test("deleting a triple cascades to its triple_tags", () => {
    // Arrange
    const user = createUser(db);
    const { triple } = createFullHierarchy(db, user.id);
    const tag = createTag(db, { userId: user.id, name: "important" });
    tagTriple(db, triple.id, tag.id);

    // Act
    db.delete(schema.triples).where(eq(schema.triples.id, triple.id)).run();

    // Assert
    const remaining = db.select().from(schema.tripleTags).all();
    expect(remaining).toHaveLength(0);
  });

  test("deleting a tag cascades to its triple_tags", () => {
    // Arrange
    const user = createUser(db);
    const { triple } = createFullHierarchy(db, user.id);
    const tag = createTag(db, { userId: user.id, name: "important" });
    tagTriple(db, triple.id, tag.id);

    // Act
    db.delete(schema.tags).where(eq(schema.tags.id, tag.id)).run();

    // Assert
    const remaining = db.select().from(schema.tripleTags).all();
    expect(remaining).toHaveLength(0);
  });

  test("deleting a user cascades to their tags", () => {
    // Arrange
    const user = createUser(db);
    createTag(db, { userId: user.id, name: "tag1" });
    createTag(db, { userId: user.id, name: "tag2" });

    // Act
    db.delete(schema.users).where(eq(schema.users.id, user.id)).run();

    // Assert
    const remaining = db.select().from(schema.tags).all();
    expect(remaining).toHaveLength(0);
  });

  test("deleting one user does not affect another user's data", () => {
    // Arrange
    const user1 = createUser(db, { id: "user1" });
    const user2 = createUser(db, { id: "user2" });
    createFullHierarchy(db, user1.id);
    createFullHierarchy(db, user2.id);

    // Act — delete user1 only
    db.delete(schema.users).where(eq(schema.users.id, user1.id)).run();

    // Assert — user2's data is intact
    const decks = db.select().from(schema.decks).all();
    expect(decks).toHaveLength(1);
    expect(decks[0].userId).toBe(user2.id);
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

  test("tag name must be unique per user", () => {
    const user = createUser(db);
    createTag(db, { userId: user.id, name: "biology" });
    expect(() => {
      createTag(db, { userId: user.id, name: "biology" });
    }).toThrow();
  });

  test("different users can have tags with the same name", () => {
    const user1 = createUser(db, { id: "u1" });
    const user2 = createUser(db, { id: "u2" });
    createTag(db, { userId: user1.id, name: "biology" });
    // Should not throw
    createTag(db, { userId: user2.id, name: "biology" });

    const allTags = db.select().from(schema.tags).all();
    expect(allTags).toHaveLength(2);
  });

  test("triple_tags combination must be unique", () => {
    const user = createUser(db);
    const { triple } = createFullHierarchy(db, user.id);
    const tag = createTag(db, { userId: user.id, name: "test" });
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
    expect(() => {
      sqlite
        .prepare(
          "INSERT INTO decks (id, user_id, title, sort_order, created_at, updated_at) VALUES ('d1', ?, NULL, 0, '2024-01-01', '2024-01-01')"
        )
        .run(user.id);
    }).toThrow();
  });

  test("triple subject field cannot be null", () => {
    const user = createUser(db);
    const { concept } = createFullHierarchy(db, user.id);
    expect(() => {
      sqlite
        .prepare(
          "INSERT INTO triples (id, concept_id, user_id, subject, predicate, object, sort_order, created_at, updated_at) VALUES ('t99', ?, ?, NULL, 'is', 'B', 0, '2024-01-01', '2024-01-01')"
        )
        .run(concept.id, user.id);
    }).toThrow();
  });

  test("triple predicate field cannot be null", () => {
    const user = createUser(db);
    const { concept } = createFullHierarchy(db, user.id);
    expect(() => {
      sqlite
        .prepare(
          "INSERT INTO triples (id, concept_id, user_id, subject, predicate, object, sort_order, created_at, updated_at) VALUES ('t99', ?, ?, 'A', NULL, 'B', 0, '2024-01-01', '2024-01-01')"
        )
        .run(concept.id, user.id);
    }).toThrow();
  });

  test("triple object field cannot be null", () => {
    const user = createUser(db);
    const { concept } = createFullHierarchy(db, user.id);
    expect(() => {
      sqlite
        .prepare(
          "INSERT INTO triples (id, concept_id, user_id, subject, predicate, object, sort_order, created_at, updated_at) VALUES ('t99', ?, ?, 'A', 'is', NULL, 0, '2024-01-01', '2024-01-01')"
        )
        .run(concept.id, user.id);
    }).toThrow();
  });

  test("description can be null (optional field)", () => {
    const user = createUser(db);
    // Should not throw
    sqlite
      .prepare(
        "INSERT INTO decks (id, user_id, title, description, sort_order, created_at, updated_at) VALUES ('d99', ?, 'Test', NULL, 0, '2024-01-01', '2024-01-01')"
      )
      .run(user.id);

    const decks = db.select().from(schema.decks).where(eq(schema.decks.id, "d99")).all();
    expect(decks).toHaveLength(1);
    expect(decks[0].description).toBeNull();
  });
});
