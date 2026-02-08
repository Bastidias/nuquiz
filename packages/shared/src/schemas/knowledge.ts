import { z } from "zod";

// ── Catalog (top-level ownership container) ─────────────────

export const catalogSchema = z.object({
  id: z.string(),
  createdBy: z.string(),
  title: z.string().min(1).max(200),
  description: z.string().max(1000).nullable(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export type Catalog = z.infer<typeof catalogSchema>;

export const createCatalogSchema = catalogSchema.pick({
  title: true,
  description: true,
});

export type CreateCatalog = z.infer<typeof createCatalogSchema>;

export const updateCatalogSchema = createCatalogSchema.partial();

export type UpdateCatalog = z.infer<typeof updateCatalogSchema>;

// ── Subscription (user subscribes to a catalog) ─────────────

export const subscriptionSchema = z.object({
  id: z.string(),
  userId: z.string(),
  catalogId: z.string(),
  createdAt: z.string().datetime(),
});

export type Subscription = z.infer<typeof subscriptionSchema>;

// ── Deck (child of Catalog) ─────────────────────────────────

export const deckSchema = z.object({
  id: z.string(),
  catalogId: z.string(),
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

// ── Tag (many-to-many on triples, scoped to catalog) ────────

export const tagSchema = z.object({
  id: z.string(),
  catalogId: z.string(),
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

// ── Quiz Engine Enums ───────────────────────────────────────────

export const axisEnum = z.enum(["subject", "predicate", "object"]);
export type AxisEnum = z.infer<typeof axisEnum>;

export const scopeEnum = z.enum(["single", "cell", "paired", "subject_profile", "cross_subject"]);
export type ScopeEnum = z.infer<typeof scopeEnum>;

export const formatEnum = z.enum(["multiple_choice", "select_all", "true_false", "matching", "fill_blank"]);
export type FormatEnum = z.infer<typeof formatEnum>;

// ── Quiz Response Schemas ───────────────────────────────────────

export const quizResponseSchema = z.object({
  id: z.string(),
  userId: z.string(),
  conceptId: z.string(),
  axis: axisEnum,
  format: formatEnum,
  correct: z.boolean(),
  responseTimeMs: z.number().int().min(0),
  createdAt: z.string().datetime(),
});

export type QuizResponse = z.infer<typeof quizResponseSchema>;

export const responseTripleSchema = z.object({
  id: z.string(),
  responseId: z.string(),
  tripleId: z.string(),
  correct: z.boolean(),
});

export type ResponseTriple = z.infer<typeof responseTripleSchema>;

// ── Quiz Session Schemas ────────────────────────────────────────

export const questionOptionSchema = z.object({
  text: z.string(),
  correct: z.boolean(),
});

export type QuestionOption = z.infer<typeof questionOptionSchema>;

export const questionSchema = z.object({
  axis: axisEnum,
  scope: scopeEnum,
  format: formatEnum,
  prompt: z.string(),
  options: z.array(questionOptionSchema),
  correctAnswer: z.string(),
  tripleIds: z.array(z.string()),
});

export type Question = z.infer<typeof questionSchema>;

export const clientQuestionSchema = questionSchema.omit({ correctAnswer: true });

export type ClientQuestion = z.infer<typeof clientQuestionSchema>;

export const startQuizSessionSchema = z
  .object({
    deckId: z.string().optional(),
    topicId: z.string().optional(),
    conceptId: z.string().optional(),
    axis: axisEnum.optional(),
    format: formatEnum.optional(),
    seed: z.number().int().optional(),
    count: z.number().int().min(1).max(50).optional(),
  })
  .refine(
    (data) =>
      [data.deckId, data.topicId, data.conceptId].filter(Boolean).length === 1,
    {
      message: "Exactly one of deckId, topicId, or conceptId must be provided",
    }
  );

export type StartQuizSession = z.infer<typeof startQuizSessionSchema>;

export const quizSessionSchema = z.object({
  id: z.string(),
  conceptId: z.string(),
  questions: z.array(clientQuestionSchema),
  createdAt: z.string().datetime(),
});

export type QuizSession = z.infer<typeof quizSessionSchema>;

export const submitQuizResponseSchema = z.object({
  questionIndex: z.number().int().min(0),
  selectedAnswer: z.string(),
  responseTimeMs: z.number().int().min(0),
});

export type SubmitQuizResponse = z.infer<typeof submitQuizResponseSchema>;

export const quizResponseResultSchema = z.object({
  correct: z.boolean(),
  correctAnswer: z.string(),
  tripleIds: z.array(z.string()),
  axis: axisEnum,
  format: formatEnum,
});

export type QuizResponseResult = z.infer<typeof quizResponseResultSchema>;
