import { z } from "zod";

// ── Deck (top-level container) ──────────────────────────────

export const deckSchema = z.object({
  id: z.string(),
  userId: z.string(),
  title: z.string().min(1).max(200),
  description: z.string().max(1000).nullable(),
  sortOrder: z.number().int().min(0),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export type Deck = z.infer<typeof deckSchema>;

export const createDeckSchema = deckSchema.pick({
  title: true,
  description: true,
  sortOrder: true,
});

export type CreateDeck = z.infer<typeof createDeckSchema>;

export const updateDeckSchema = createDeckSchema.partial();

export type UpdateDeck = z.infer<typeof updateDeckSchema>;

// ── Topic (child of Deck) ───────────────────────────────────

export const topicSchema = z.object({
  id: z.string(),
  deckId: z.string(),
  title: z.string().min(1).max(200),
  description: z.string().max(1000).nullable(),
  sortOrder: z.number().int().min(0),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export type Topic = z.infer<typeof topicSchema>;

export const createTopicSchema = topicSchema.pick({
  title: true,
  description: true,
  sortOrder: true,
});

export type CreateTopic = z.infer<typeof createTopicSchema>;

export const updateTopicSchema = createTopicSchema.partial();

export type UpdateTopic = z.infer<typeof updateTopicSchema>;

// ── Concept (child of Topic) ───────────────────────────────

export const conceptSchema = z.object({
  id: z.string(),
  topicId: z.string(),
  title: z.string().min(1).max(200),
  description: z.string().max(1000).nullable(),
  sortOrder: z.number().int().min(0),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export type Concept = z.infer<typeof conceptSchema>;

export const createConceptSchema = conceptSchema.pick({
  title: true,
  description: true,
  sortOrder: true,
});

export type CreateConcept = z.infer<typeof createConceptSchema>;

export const updateConceptSchema = createConceptSchema.partial();

export type UpdateConcept = z.infer<typeof updateConceptSchema>;

// ── Triple (SPO atomic fact, child of Concept) ──────────────

export const tripleSchema = z.object({
  id: z.string(),
  conceptId: z.string(),
  userId: z.string(),
  subject: z.string().min(1).max(500),
  predicate: z.string().min(1).max(500),
  object: z.string().min(1).max(500),
  sortOrder: z.number().int().min(0),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export type Triple = z.infer<typeof tripleSchema>;

export const createTripleSchema = tripleSchema.pick({
  subject: true,
  predicate: true,
  object: true,
  sortOrder: true,
});

export type CreateTriple = z.infer<typeof createTripleSchema>;

export const updateTripleSchema = createTripleSchema.partial();

export type UpdateTriple = z.infer<typeof updateTripleSchema>;

// ── Tag (many-to-many on triples) ───────────────────────────

export const tagSchema = z.object({
  id: z.string(),
  userId: z.string(),
  name: z.string().min(1).max(100),
  createdAt: z.string().datetime(),
});

export type Tag = z.infer<typeof tagSchema>;

export const createTagSchema = tagSchema.pick({
  name: true,
});

export type CreateTag = z.infer<typeof createTagSchema>;

export const tripleTagSchema = z.object({
  tripleId: z.string(),
  tagId: z.string(),
});

export type TripleTag = z.infer<typeof tripleTagSchema>;

// ── Triple with tags (response shape) ───────────────────────

export const tripleWithTagsSchema = tripleSchema.extend({
  tags: z.array(z.string()),
});

export type TripleWithTags = z.infer<typeof tripleWithTagsSchema>;

// ── Import schema (structured JSON import) ──────────────────

export const importTripleSchema = z.object({
  subject: z.string().min(1).max(500),
  predicate: z.string().min(1).max(500),
  object: z.string().min(1).max(500),
  tags: z.array(z.string().min(1).max(100)).optional(),
});

export const importConceptSchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().max(1000).nullable().optional(),
  triples: z.array(importTripleSchema).min(1),
});

export const importTopicSchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().max(1000).nullable().optional(),
  concepts: z.array(importConceptSchema).min(1),
});

export const importDeckSchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().max(1000).nullable().optional(),
  topics: z.array(importTopicSchema).min(1),
});

export type ImportTriple = z.infer<typeof importTripleSchema>;
export type ImportConcept = z.infer<typeof importConceptSchema>;
export type ImportTopic = z.infer<typeof importTopicSchema>;
export type ImportDeck = z.infer<typeof importDeckSchema>;

// ── Import response ─────────────────────────────────────────

export const importResultSchema = z.object({
  deckId: z.string(),
  topicsCreated: z.number().int(),
  conceptsCreated: z.number().int(),
  triplesCreated: z.number().int(),
  tagsCreated: z.number().int(),
});

export type ImportResult = z.infer<typeof importResultSchema>;

export const importValidationErrorSchema = z.object({
  path: z.string(),
  message: z.string(),
});

export type ImportValidationError = z.infer<typeof importValidationErrorSchema>;

export const importDryRunResultSchema = z.object({
  valid: z.boolean(),
  errors: z.array(importValidationErrorSchema),
  summary: importResultSchema.partial().optional(),
});

export type ImportDryRunResult = z.infer<typeof importDryRunResultSchema>;
