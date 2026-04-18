import { sqliteTable, text, integer, real, uniqueIndex, index } from "drizzle-orm/sqlite-core";

// ── Auth ───────────────────────────────────────────────────────

export const users = sqliteTable("users", {
  id: text("id").primaryKey(),
  email: text("email").notNull().unique(),
  name: text("name").notNull(),
  avatarUrl: text("avatar_url"),
  provider: text("provider", { enum: ["google", "github", "apple"] }).notNull(),
  providerId: text("provider_id").notNull(),
  createdAt: text("created_at").notNull(),
  updatedAt: text("updated_at").notNull(),
});

export const sessions = sqliteTable("sessions", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expiresAt: text("expires_at").notNull(),
});

// ── Catalogs & Subscriptions ────────────────────────────────────

export const catalogs = sqliteTable(
  "catalogs",
  {
    id: text("id").primaryKey(),
    createdBy: text("created_by")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    title: text("title").notNull(),
    description: text("description"),
    createdAt: text("created_at").notNull(),
    updatedAt: text("updated_at").notNull(),
  },
  (table) => [index("idx_catalogs_created_by").on(table.createdBy)]
);

export const subscriptions = sqliteTable(
  "subscriptions",
  {
    id: text("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    catalogId: text("catalog_id")
      .notNull()
      .references(() => catalogs.id, { onDelete: "cascade" }),
    createdAt: text("created_at").notNull(),
  },
  (table) => [
    uniqueIndex("idx_subscriptions_user_catalog").on(table.userId, table.catalogId),
    index("idx_subscriptions_catalog_id").on(table.catalogId),
  ]
);

// ── Knowledge Hierarchy: Deck > Topic > Concept > Triple ──────

export const decks = sqliteTable(
  "decks",
  {
    id: text("id").primaryKey(),
    catalogId: text("catalog_id")
      .notNull()
      .references(() => catalogs.id, { onDelete: "cascade" }),
    title: text("title").notNull(),
    description: text("description"),
    sortOrder: integer("sort_order").notNull().default(0),
    createdAt: text("created_at").notNull(),
    updatedAt: text("updated_at").notNull(),
  },
  (table) => [index("idx_decks_catalog_id").on(table.catalogId)]
);

export const topics = sqliteTable(
  "topics",
  {
    id: text("id").primaryKey(),
    deckId: text("deck_id")
      .notNull()
      .references(() => decks.id, { onDelete: "cascade" }),
    title: text("title").notNull(),
    description: text("description"),
    sortOrder: integer("sort_order").notNull().default(0),
    createdAt: text("created_at").notNull(),
    updatedAt: text("updated_at").notNull(),
  },
  (table) => [index("idx_topics_deck_id").on(table.deckId)]
);

export const concepts = sqliteTable(
  "concepts",
  {
    id: text("id").primaryKey(),
    topicId: text("topic_id")
      .notNull()
      .references(() => topics.id, { onDelete: "cascade" }),
    title: text("title").notNull(),
    description: text("description"),
    sortOrder: integer("sort_order").notNull().default(0),
    createdAt: text("created_at").notNull(),
    updatedAt: text("updated_at").notNull(),
  },
  (table) => [index("idx_concepts_topic_id").on(table.topicId)]
);

export const triples = sqliteTable(
  "triples",
  {
    id: text("id").primaryKey(),
    conceptId: text("concept_id")
      .notNull()
      .references(() => concepts.id, { onDelete: "cascade" }),
    subject: text("subject").notNull(),
    predicate: text("predicate").notNull(),
    object: text("object").notNull(),
    sortOrder: integer("sort_order").notNull().default(0),
    createdAt: text("created_at").notNull(),
    updatedAt: text("updated_at").notNull(),
  },
  (table) => [
    index("idx_triples_concept_id").on(table.conceptId),
    index("idx_triples_subject_predicate").on(table.conceptId, table.subject, table.predicate),
    index("idx_triples_predicate").on(table.conceptId, table.predicate),
  ]
);

// ── Tags (many-to-many on triples, scoped to catalog) ────────

export const tags = sqliteTable(
  "tags",
  {
    id: text("id").primaryKey(),
    catalogId: text("catalog_id")
      .notNull()
      .references(() => catalogs.id, { onDelete: "cascade" }),
    name: text("name").notNull(),
    createdAt: text("created_at").notNull(),
  },
  (table) => [uniqueIndex("idx_tags_catalog_name").on(table.catalogId, table.name)]
);

export const tripleTags = sqliteTable(
  "triple_tags",
  {
    tripleId: text("triple_id")
      .notNull()
      .references(() => triples.id, { onDelete: "cascade" }),
    tagId: text("tag_id")
      .notNull()
      .references(() => tags.id, { onDelete: "cascade" }),
  },
  (table) => [
    uniqueIndex("idx_triple_tags_pk").on(table.tripleId, table.tagId),
    index("idx_triple_tags_tag_id").on(table.tagId),
  ]
);

// ── Quiz Responses ──────────────────────────────────────────────

export const quizResponses = sqliteTable(
  "quiz_responses",
  {
    id: text("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    conceptId: text("concept_id")
      .notNull()
      .references(() => concepts.id, { onDelete: "cascade" }),
    axis: text("axis", { enum: ["subject", "predicate", "object"] }).notNull(),
    format: text("format", {
      enum: ["multiple_choice", "select_all", "true_false", "matching", "fill_blank"],
    }).notNull(),
    correct: integer("correct").notNull(),
    responseTimeMs: integer("response_time_ms").notNull(),
    createdAt: text("created_at").notNull(),
  },
  (table) => [
    index("idx_quiz_responses_user_concept").on(table.userId, table.conceptId),
    index("idx_quiz_responses_user_created").on(table.userId, table.createdAt),
  ]
);

export const responseTriples = sqliteTable(
  "response_triples",
  {
    id: text("id").primaryKey(),
    responseId: text("response_id")
      .notNull()
      .references(() => quizResponses.id, { onDelete: "cascade" }),
    tripleId: text("triple_id")
      .notNull()
      .references(() => triples.id, { onDelete: "cascade" }),
    correct: integer("correct").notNull(),
  },
  (table) => [index("idx_response_triples_response_id").on(table.responseId)]
);

// ── Review Cards (SM-2 spaced repetition state) ──────────────

export const reviewCards = sqliteTable(
  "review_cards",
  {
    id: text("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    tripleId: text("triple_id")
      .notNull()
      .references(() => triples.id, { onDelete: "cascade" }),
    easeFactor: real("ease_factor").notNull().default(2.5),
    intervalDays: integer("interval_days").notNull().default(0),
    repetitionCount: integer("repetition_count").notNull().default(0),
    lastQuality: integer("last_quality").notNull(),
    nextReviewAt: text("next_review_at").notNull(),
    createdAt: text("created_at").notNull(),
    updatedAt: text("updated_at").notNull(),
  },
  (table) => [
    uniqueIndex("idx_review_cards_user_triple").on(table.userId, table.tripleId),
    index("idx_review_cards_user_next_review").on(table.userId, table.nextReviewAt),
    index("idx_review_cards_user_ease").on(table.userId, table.easeFactor),
  ]
);
