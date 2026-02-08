import type { TestDb } from "./db.js";
import * as schema from "../../db/schema.js";

let counter = 0;

function nextId(): string {
  counter++;
  return `test-${counter.toString().padStart(6, "0")}`;
}

/**
 * Reset the ID counter. Call in beforeEach if you need deterministic IDs.
 */
export function resetFixtureCounter(): void {
  counter = 0;
}

// ─── User Fixtures ───────────────────────────────────────────────────────────

export interface CreateUserOptions {
  id?: string;
  email?: string;
  name?: string;
  avatarUrl?: string | null;
  provider?: "google" | "github" | "apple";
  providerId?: string;
  createdAt?: string;
  updatedAt?: string;
}

export function createUser(db: TestDb, options: CreateUserOptions = {}) {
  const id = options.id ?? nextId();
  const now = new Date().toISOString();
  const user = {
    id,
    email: options.email ?? `${id}@test.nuquiz.dev`,
    name: options.name ?? `Test User ${id}`,
    avatarUrl: options.avatarUrl ?? null,
    provider: options.provider ?? ("github" as const),
    providerId: options.providerId ?? `provider-${id}`,
    createdAt: options.createdAt ?? now,
    updatedAt: options.updatedAt ?? now,
  };
  db.insert(schema.users).values(user).run();
  return user;
}

// ─── Session Fixtures ────────────────────────────────────────────────────────

export interface CreateSessionOptions {
  id?: string;
  userId: string;
  expiresAt?: string;
}

export function createSession(db: TestDb, options: CreateSessionOptions) {
  const id = options.id ?? nextId();
  const session = {
    id,
    userId: options.userId,
    expiresAt:
      options.expiresAt ??
      new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
  };
  db.insert(schema.sessions).values(session).run();
  return session;
}

/**
 * Creates a user and an active session for them. Returns both.
 * Convenient for tests that need an authenticated user context.
 */
export function createAuthenticatedUser(
  db: TestDb,
  userOptions: CreateUserOptions = {}
) {
  const user = createUser(db, userOptions);
  const session = createSession(db, { userId: user.id });
  return { user, session };
}

// ─── Deck Fixtures ──────────────────────────────────────────────────────────

export interface CreateDeckOptions {
  id?: string;
  userId: string;
  title?: string;
  description?: string | null;
  sortOrder?: number;
  createdAt?: string;
  updatedAt?: string;
}

export function createDeck(db: TestDb, options: CreateDeckOptions) {
  const id = options.id ?? nextId();
  const now = new Date().toISOString();
  const deck = {
    id,
    userId: options.userId,
    title: options.title ?? `Test Deck ${id}`,
    description: options.description ?? null,
    sortOrder: options.sortOrder ?? 0,
    createdAt: options.createdAt ?? now,
    updatedAt: options.updatedAt ?? now,
  };
  db.insert(schema.decks).values(deck).run();
  return deck;
}

// ─── Topic Fixtures ──────────────────────────────────────────────────────────

export interface CreateTopicOptions {
  id?: string;
  deckId: string;
  title?: string;
  description?: string | null;
  sortOrder?: number;
  createdAt?: string;
  updatedAt?: string;
}

export function createTopic(db: TestDb, options: CreateTopicOptions) {
  const id = options.id ?? nextId();
  const now = new Date().toISOString();
  const topic = {
    id,
    deckId: options.deckId,
    title: options.title ?? `Test Topic ${id}`,
    description: options.description ?? null,
    sortOrder: options.sortOrder ?? 0,
    createdAt: options.createdAt ?? now,
    updatedAt: options.updatedAt ?? now,
  };
  db.insert(schema.topics).values(topic).run();
  return topic;
}

// ─── Concept Fixtures ────────────────────────────────────────────────────────

export interface CreateConceptOptions {
  id?: string;
  topicId: string;
  title?: string;
  description?: string | null;
  sortOrder?: number;
  createdAt?: string;
  updatedAt?: string;
}

export function createConcept(db: TestDb, options: CreateConceptOptions) {
  const id = options.id ?? nextId();
  const now = new Date().toISOString();
  const concept = {
    id,
    topicId: options.topicId,
    title: options.title ?? `Test Concept ${id}`,
    description: options.description ?? null,
    sortOrder: options.sortOrder ?? 0,
    createdAt: options.createdAt ?? now,
    updatedAt: options.updatedAt ?? now,
  };
  db.insert(schema.concepts).values(concept).run();
  return concept;
}

// ─── Triple Fixtures ─────────────────────────────────────────────────────────

export interface CreateTripleOptions {
  id?: string;
  conceptId: string;
  userId: string;
  subject?: string;
  predicate?: string;
  object?: string;
  sortOrder?: number;
  createdAt?: string;
  updatedAt?: string;
}

export function createTriple(db: TestDb, options: CreateTripleOptions) {
  const id = options.id ?? nextId();
  const now = new Date().toISOString();
  const triple = {
    id,
    conceptId: options.conceptId,
    userId: options.userId,
    subject: options.subject ?? "TCP",
    predicate: options.predicate ?? "provides",
    object: options.object ?? "reliable delivery",
    sortOrder: options.sortOrder ?? 0,
    createdAt: options.createdAt ?? now,
    updatedAt: options.updatedAt ?? now,
  };
  db.insert(schema.triples).values(triple).run();
  return triple;
}

// ─── Tag Fixtures ────────────────────────────────────────────────────────────

export interface CreateTagOptions {
  id?: string;
  userId: string;
  name?: string;
  createdAt?: string;
}

export function createTag(db: TestDb, options: CreateTagOptions) {
  const id = options.id ?? nextId();
  const now = new Date().toISOString();
  const tag = {
    id,
    userId: options.userId,
    name: options.name ?? `tag-${id}`,
    createdAt: options.createdAt ?? now,
  };
  db.insert(schema.tags).values(tag).run();
  return tag;
}

// ─── Triple-Tag Association ──────────────────────────────────────────────────

export function tagTriple(db: TestDb, tripleId: string, tagId: string) {
  db.insert(schema.tripleTags).values({ tripleId, tagId }).run();
}

// ─── Full Hierarchy Helpers ──────────────────────────────────────────────────

/**
 * Creates a complete deck -> topic -> concept -> triple hierarchy.
 * Useful for tests that need a full tree without caring about specifics.
 */
export function createFullHierarchy(db: TestDb, userId: string) {
  const deck = createDeck(db, { userId, title: "Biology" });
  const topic = createTopic(db, { deckId: deck.id, title: "Cell Biology" });
  const concept = createConcept(db, { topicId: topic.id, title: "Cell Membrane" });
  const triple = createTriple(db, {
    conceptId: concept.id,
    userId,
    subject: "Cell membrane",
    predicate: "is composed of",
    object: "phospholipid bilayer",
  });
  return { deck, topic, concept, triple };
}
