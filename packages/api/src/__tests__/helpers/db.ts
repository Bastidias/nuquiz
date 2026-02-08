import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import { sql } from "drizzle-orm";
import * as schema from "../../db/schema.js";

export type TestDb = ReturnType<typeof drizzle<typeof schema>>;

/**
 * Creates a fresh in-memory SQLite database with all tables.
 * Each test should call this to get an isolated database instance.
 */
export function createTestDb(): { db: TestDb; sqlite: InstanceType<typeof Database> } {
  const sqlite = new Database(":memory:");
  sqlite.pragma("journal_mode = WAL");
  sqlite.pragma("foreign_keys = ON");

  const db = drizzle(sqlite, { schema });

  // Create tables matching the Drizzle schema
  sqlite.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      email TEXT NOT NULL UNIQUE,
      name TEXT NOT NULL,
      avatar_url TEXT,
      provider TEXT NOT NULL CHECK(provider IN ('google', 'github', 'apple')),
      provider_id TEXT NOT NULL,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS sessions (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      expires_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS catalogs (
      id TEXT PRIMARY KEY,
      created_by TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      title TEXT NOT NULL,
      description TEXT,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );
    CREATE INDEX IF NOT EXISTS idx_catalogs_created_by ON catalogs(created_by);

    CREATE TABLE IF NOT EXISTS subscriptions (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      catalog_id TEXT NOT NULL REFERENCES catalogs(id) ON DELETE CASCADE,
      created_at TEXT NOT NULL
    );
    CREATE UNIQUE INDEX IF NOT EXISTS idx_subscriptions_user_catalog ON subscriptions(user_id, catalog_id);
    CREATE INDEX IF NOT EXISTS idx_subscriptions_catalog_id ON subscriptions(catalog_id);

    CREATE TABLE IF NOT EXISTS decks (
      id TEXT PRIMARY KEY,
      catalog_id TEXT NOT NULL REFERENCES catalogs(id) ON DELETE CASCADE,
      title TEXT NOT NULL,
      description TEXT,
      sort_order INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );
    CREATE INDEX IF NOT EXISTS idx_decks_catalog_id ON decks(catalog_id);

    CREATE TABLE IF NOT EXISTS topics (
      id TEXT PRIMARY KEY,
      deck_id TEXT NOT NULL REFERENCES decks(id) ON DELETE CASCADE,
      title TEXT NOT NULL,
      description TEXT,
      sort_order INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );
    CREATE INDEX IF NOT EXISTS idx_topics_deck_id ON topics(deck_id);

    CREATE TABLE IF NOT EXISTS concepts (
      id TEXT PRIMARY KEY,
      topic_id TEXT NOT NULL REFERENCES topics(id) ON DELETE CASCADE,
      title TEXT NOT NULL,
      description TEXT,
      sort_order INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );
    CREATE INDEX IF NOT EXISTS idx_concepts_topic_id ON concepts(topic_id);

    CREATE TABLE IF NOT EXISTS triples (
      id TEXT PRIMARY KEY,
      concept_id TEXT NOT NULL REFERENCES concepts(id) ON DELETE CASCADE,
      subject TEXT NOT NULL,
      predicate TEXT NOT NULL,
      object TEXT NOT NULL,
      sort_order INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );
    CREATE INDEX IF NOT EXISTS idx_triples_concept_id ON triples(concept_id);
    CREATE INDEX IF NOT EXISTS idx_triples_subject_predicate ON triples(concept_id, subject, predicate);
    CREATE INDEX IF NOT EXISTS idx_triples_predicate ON triples(concept_id, predicate);

    CREATE TABLE IF NOT EXISTS tags (
      id TEXT PRIMARY KEY,
      catalog_id TEXT NOT NULL REFERENCES catalogs(id) ON DELETE CASCADE,
      name TEXT NOT NULL,
      created_at TEXT NOT NULL
    );
    CREATE UNIQUE INDEX IF NOT EXISTS idx_tags_catalog_name ON tags(catalog_id, name);

    CREATE TABLE IF NOT EXISTS triple_tags (
      triple_id TEXT NOT NULL REFERENCES triples(id) ON DELETE CASCADE,
      tag_id TEXT NOT NULL REFERENCES tags(id) ON DELETE CASCADE
    );
    CREATE UNIQUE INDEX IF NOT EXISTS idx_triple_tags_pk ON triple_tags(triple_id, tag_id);
    CREATE INDEX IF NOT EXISTS idx_triple_tags_tag_id ON triple_tags(tag_id);

    CREATE TABLE IF NOT EXISTS quiz_responses (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      concept_id TEXT NOT NULL REFERENCES concepts(id) ON DELETE CASCADE,
      axis TEXT NOT NULL CHECK(axis IN ('subject', 'predicate', 'object')),
      format TEXT NOT NULL CHECK(format IN ('multiple_choice', 'select_all', 'true_false', 'matching', 'fill_blank')),
      correct INTEGER NOT NULL,
      response_time_ms INTEGER NOT NULL,
      created_at TEXT NOT NULL
    );
    CREATE INDEX IF NOT EXISTS idx_quiz_responses_user_concept ON quiz_responses(user_id, concept_id);
    CREATE INDEX IF NOT EXISTS idx_quiz_responses_user_created ON quiz_responses(user_id, created_at);

    CREATE TABLE IF NOT EXISTS response_triples (
      id TEXT PRIMARY KEY,
      response_id TEXT NOT NULL REFERENCES quiz_responses(id) ON DELETE CASCADE,
      triple_id TEXT NOT NULL REFERENCES triples(id) ON DELETE CASCADE,
      correct INTEGER NOT NULL
    );
    CREATE INDEX IF NOT EXISTS idx_response_triples_response_id ON response_triples(response_id);
  `);

  return { db, sqlite };
}

/**
 * Tears down the test database, closing the connection.
 */
export function closeTestDb(sqlite: InstanceType<typeof Database>): void {
  sqlite.close();
}

/**
 * Clears all data from all tables while preserving structure.
 * Useful between tests if sharing a database instance within a describe block.
 */
export function clearTestDb(db: TestDb): void {
  db.run(sql`DELETE FROM response_triples`);
  db.run(sql`DELETE FROM quiz_responses`);
  db.run(sql`DELETE FROM triple_tags`);
  db.run(sql`DELETE FROM tags`);
  db.run(sql`DELETE FROM triples`);
  db.run(sql`DELETE FROM concepts`);
  db.run(sql`DELETE FROM topics`);
  db.run(sql`DELETE FROM decks`);
  db.run(sql`DELETE FROM subscriptions`);
  db.run(sql`DELETE FROM catalogs`);
  db.run(sql`DELETE FROM sessions`);
  db.run(sql`DELETE FROM users`);
}
