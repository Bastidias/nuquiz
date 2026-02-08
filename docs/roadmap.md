# NuQuiz Roadmap

## What's Built

### Authentication (Complete)
- Google OAuth login/logout via Arctic
- Session management with HTTP-only cookies (30-day expiry)
- `GET /auth/me` returns current user
- User upsert on login (create or update)
- User-scoped data access enforced via `requireAuth` middleware

### Basic Quiz CRUD (Complete -- to be replaced)
- Create/list/get quizzes scoped to authenticated user
- Add questions to quizzes (static, manually authored)
- Zod validation on all inputs (`createQuizSchema`, `createQuestionSchema`)

The current quiz/question model is a placeholder. It stores pre-written questions with fixed choices and a `correctIndex`. This will be replaced by the SPO-based knowledge hierarchy and deterministic question generation engine. No migration path needed -- the existing tables will be dropped when the knowledge hierarchy ships.

### Infrastructure (Complete)
- pnpm monorepo with `shared`, `api`, `web` packages
- Hono API on Node.js with Drizzle ORM + SQLite
- Security middleware (CORS, CSRF, secure headers)
- Shared Zod schemas imported by both API and web
- Dependency injection for testable routes (db instance injected via Hono context)
- Jest test suite with in-memory SQLite (27 integration tests passing)

---

## Phase 1: Knowledge Hierarchy -- COMPLETE

> **Stories:** [docs/stories/phase-1-knowledge.md](stories/phase-1-knowledge.md)
> **Data model:** [docs/data-model.md](data-model.md)

**Goal:** A content author can create a Deck, organize structured SPO data into Topics > Concepts > Triples, and import/edit Triples. All content is user-scoped.

### Stories

| ID | Title | Status | Test Coverage |
|----|-------|--------|---------------|
| S01 | Create Deck with hierarchy (Deck > Topic > Concept > Triple) | Done | `decks.test.ts` |
| S02 | Import structured content via JSON | Done | `import.test.ts` |
| S03 | Validate import before committing (dry run) | Done | `import.test.ts` (dry-run) |
| S04 | Edit Triples after creation (partial updates) | Done | `decks.test.ts` (PUT triples) |
| S05 | Content is private to author | Done | `decks.test.ts` (auth/ownership) |

### What was delivered

- **Hierarchy CRUD**: Full create/read/update/delete for Decks, Topics, Concepts, and Triples with nested REST routes
- **Atomic SPO columns**: Each Triple has separate `subject`, `predicate`, `object` text columns -- no JSON blobs, no compound values
- **JSON import**: `POST /import` accepts nested payload (deck > topics[] > concepts[] > triples[]) and creates the full hierarchy in one request
- **Dry-run validation**: `POST /import?dryRun=true` returns preview counts and validation errors without persisting data
- **Tag support**: Tags resolved via get-or-create with user-scoped uniqueness; many-to-many association with Triples
- **Ownership enforcement**: All hierarchy endpoints filter by authenticated user; another user's resources return 404
- **Cascade deletes**: Deleting a Deck cascades to all children (Topics, Concepts, Triples)
- **Shared Zod schemas**: Type-safe contracts in `packages/shared/src/schemas/knowledge.ts` covering all CRUD and import operations

### Phase 1 migration notes for Phase 2

The Phase 1 implementation uses a simplified ownership model to get the hierarchy working:

- **No Catalog layer yet.** Decks are owned directly by users (`decks.userId`) rather than nested under Catalogs. Phase 2 will introduce the `catalogs` table and re-parent Decks under Catalogs, with `catalogs.created_by` as the ownership root.
- **Tags are user-scoped, not catalog-scoped.** When Catalogs are introduced, tag uniqueness will shift from `(userId, name)` to `(catalogId, name)`.
- **`userId` still exists on triples.** The canonical data model says content ownership lives at the Catalog level, not the Triple level. This column will be dropped when Catalogs are added.

These are not bugs -- they are intentional Phase 1 simplifications documented here so Phase 2 migration is planned.

---

## Phase 2: Question Generation Engine -- COMPLETE

> **Stories:** [docs/stories/phase-2-quiz-session.md](stories/phase-2-quiz-session.md)

**Goal:** Questions are generated deterministically from Triple data. No pre-authored questions.

### Stories

| ID | Title | Status | Test Coverage |
|----|-------|--------|---------------|
| S06 | Start a quiz session scoped to a hierarchy level | Done | `quiz.test.ts` |
| S07 | Receive deterministically generated questions from Triples | Done | `engine/*.test.ts`, `quiz.test.ts` |
| S08 | Submit answers and record responses | Done | `quiz.test.ts` |

### What was delivered

- **Catalog layer**: `catalogs` table with `created_by` ownership; `subscriptions` table for read-only access; Decks re-parented under Catalogs
- **Engine domain functions** (pure, no DB access):
  - `groupByPredicate` -- groups Triples by predicate within a Concept
  - `classifyObjects` -- computes shared vs discriminating Objects at query time
  - `sourceDistractors` -- same-predicate first, adjacent-predicate fallback
  - `assembleQuestion` -- builds a Question for any axis/format combination
  - `orchestrate` -- generates a full set of questions from Triples with seeded RNG
- **Question formats**: multiple-choice, select-all, true/false, matching, fill-in-the-blank
- **Quiz session API**:
  - `POST /quiz/start` -- start a session scoped to a Concept, Topic, or Deck; returns questions without correct answers
  - `POST /quiz/:sessionId/respond` -- submit an answer, get immediate feedback with correct answer revealed
  - In-memory session store holds generated questions server-side (answers never leaked before submission)
  - Authorization: catalog author or subscriber can start sessions
- **Per-triple response tracking**: `quiz_responses` and `response_triples` tables persist every answer with axis, format, correctness, and response time
- **Shared Zod schemas**: `questionSchema`, `clientQuestionSchema`, `startQuizSessionSchema`, `submitQuizResponseSchema`, `quizResponseResultSchema` in `packages/shared`
- **Deterministic generation**: Same seed + same content = same questions (reproducible via seeded PRNG)
- **202 tests passing** (180 engine unit tests + 22 quiz integration tests)

---

## Phase 3: Learning Tracking (Preview)

**Goal:** Track student mastery per-Triple and surface weak areas.

- SM-2 spaced repetition per user-Triple pair (Review Cards)
- Quality derivation from correctness + response time (no self-rating)
- Hierarchical mastery rollup (Concept / Topic / Deck percentages)
- Weak area identification (low-mastery clusters)
- Daily review queue (due cards + new cards, interleaved)

**User Stories:** #8 (immediate feedback), #9 (mastery at every level), #10 (daily review queue), #11 (weak areas)

---

## Phase 4: Adaptive Progression (Preview)

**Goal:** The system behaves like a tutor -- selecting what to test next based on demonstrated mastery.

- Independent progression along axis, scope, and format dimensions
- Trigger-based moves (miss a Triple -> drill it; master MC -> promote to fill-in-the-blank)
- Distractor difficulty tuning (cross-predicate vs. same-predicate)
- Composite distractor generation for advanced students

**User Stories:** #6, #7 (refined -- adaptive quiz sessions)

---

## Current Status

- **Phase:** Phase 2 COMPLETE. Phase 3 next.
- **Completed:** Phase 1 (S01-S05) + Phase 2 (S06-S08) with 202 tests passing
- **Next up:** Phase 3 -- SM-2 spaced repetition, mastery rollup, review queue
- **Open questions:** Entity tables for SPO subjects/predicates (deferred to Builder UI), `triple_relations` table (deferred, metadata only), session expiry strategy (in-memory store for now)
