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

// ─── Catalog Fixtures ────────────────────────────────────────────────────────

export interface CreateCatalogOptions {
  id?: string;
  createdBy: string;
  title?: string;
  description?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export function createCatalog(db: TestDb, options: CreateCatalogOptions) {
  const id = options.id ?? nextId();
  const now = new Date().toISOString();
  const catalog = {
    id,
    createdBy: options.createdBy,
    title: options.title ?? `Test Catalog ${id}`,
    description: options.description ?? null,
    createdAt: options.createdAt ?? now,
    updatedAt: options.updatedAt ?? now,
  };
  db.insert(schema.catalogs).values(catalog).run();
  return catalog;
}

// ─── Subscription Fixtures ───────────────────────────────────────────────────

export interface CreateSubscriptionOptions {
  id?: string;
  userId: string;
  catalogId: string;
  createdAt?: string;
}

export function createSubscription(db: TestDb, options: CreateSubscriptionOptions) {
  const id = options.id ?? nextId();
  const now = new Date().toISOString();
  const subscription = {
    id,
    userId: options.userId,
    catalogId: options.catalogId,
    createdAt: options.createdAt ?? now,
  };
  db.insert(schema.subscriptions).values(subscription).run();
  return subscription;
}

// ─── Deck Fixtures ──────────────────────────────────────────────────────────

export interface CreateDeckOptions {
  id?: string;
  catalogId: string;
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
    catalogId: options.catalogId,
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
  catalogId: string;
  name?: string;
  createdAt?: string;
}

export function createTag(db: TestDb, options: CreateTagOptions) {
  const id = options.id ?? nextId();
  const now = new Date().toISOString();
  const tag = {
    id,
    catalogId: options.catalogId,
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

// ─── Quiz Response Fixtures ──────────────────────────────────────────────────

export interface CreateQuizResponseOptions {
  id?: string;
  userId: string;
  conceptId: string;
  axis?: "subject" | "predicate" | "object";
  format?: "multiple_choice" | "select_all" | "true_false" | "matching" | "fill_blank";
  correct?: number;
  responseTimeMs?: number;
  createdAt?: string;
}

export function createQuizResponse(db: TestDb, options: CreateQuizResponseOptions) {
  const id = options.id ?? nextId();
  const now = new Date().toISOString();
  const response = {
    id,
    userId: options.userId,
    conceptId: options.conceptId,
    axis: options.axis ?? "subject",
    format: options.format ?? "multiple_choice",
    correct: options.correct ?? 1,
    responseTimeMs: options.responseTimeMs ?? 1500,
    createdAt: options.createdAt ?? now,
  };
  db.insert(schema.quizResponses).values(response).run();
  return response;
}

// ─── Response Triple Fixtures ───────────────────────────────────────────────

export interface CreateResponseTripleOptions {
  id?: string;
  responseId: string;
  tripleId: string;
  correct?: number;
}

export function createResponseTriple(db: TestDb, options: CreateResponseTripleOptions) {
  const id = options.id ?? nextId();
  const responseTriple = {
    id,
    responseId: options.responseId,
    tripleId: options.tripleId,
    correct: options.correct ?? 1,
  };
  db.insert(schema.responseTriples).values(responseTriple).run();
  return responseTriple;
}

// ─── Review Card Fixtures ────────────────────────────────────────────────────

export interface CreateReviewCardOptions {
  id?: string;
  userId: string;
  tripleId: string;
  easeFactor?: number;
  intervalDays?: number;
  repetitionCount?: number;
  lastQuality?: number;
  nextReviewAt?: string;
  createdAt?: string;
  updatedAt?: string;
}

export function createReviewCard(db: TestDb, options: CreateReviewCardOptions) {
  const id = options.id ?? nextId();
  const now = new Date().toISOString();
  const reviewCard = {
    id,
    userId: options.userId,
    tripleId: options.tripleId,
    easeFactor: options.easeFactor ?? 2.5,
    intervalDays: options.intervalDays ?? 0,
    repetitionCount: options.repetitionCount ?? 0,
    lastQuality: options.lastQuality ?? 3,
    nextReviewAt: options.nextReviewAt ?? now,
    createdAt: options.createdAt ?? now,
    updatedAt: options.updatedAt ?? now,
  };
  db.insert(schema.reviewCards).values(reviewCard).run();
  return reviewCard;
}

// ─── Full Hierarchy Helpers ──────────────────────────────────────────────────

/**
 * Creates a complete catalog -> deck -> topic -> concept -> triple hierarchy.
 * Useful for tests that need a full tree without caring about specifics.
 */
export function createFullHierarchy(db: TestDb, userId: string) {
  const catalog = createCatalog(db, { createdBy: userId, title: "Test Catalog" });
  const deck = createDeck(db, { catalogId: catalog.id, title: "Biology" });
  const topic = createTopic(db, { deckId: deck.id, title: "Cell Biology" });
  const concept = createConcept(db, { topicId: topic.id, title: "Cell Membrane" });
  const triple = createTriple(db, {
    conceptId: concept.id,
    subject: "Cell membrane",
    predicate: "is composed of",
    object: "phospholipid bilayer",
  });
  return { catalog, deck, topic, concept, triple };
}
