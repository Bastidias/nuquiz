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

---

## Phase 1: Knowledge Hierarchy

**Goal:** A content author can create a Subject, organize structured SPO data into Topics and Concepts, and import/edit Facts. All content is user-scoped.

### Deliverables

| Deliverable | User Story | Status |
|---|---|---|
| **Subjects table + CRUD** | #1: Author creates a Subject and organizes it into Topics > Concepts > Facts | Not started |
| **Topics table + CRUD** | #1: Same -- Topics are children of Subjects | Not started |
| **Concepts table + CRUD** | #1: Same -- Concepts are children of Topics | Not started |
| **Facts (triples) table + CRUD** | #1, #4: Author creates/edits atomic SPO triples within Concepts | Not started |
| **JSON/YAML import endpoint** | #2, #3: Author imports structured content and validates before committing | Not started |
| **Import validation (dry-run)** | #3: Author validates import data before committing | Not started |
| **User-scoped data isolation** | #5: Author's subjects are private -- query filters enforce userId | Not started |
| **Shared Zod schemas for hierarchy** | All: Type-safe contracts between API and web | Not started |

### Acceptance Criteria (Phase 1 "Done")

1. A user can create a Subject with a title, and see it listed when they fetch their subjects. The subject is scoped to them and invisible to other users.
2. A user can create Topics within a Subject, Concepts within a Topic, and Facts (SPO triples) within a Concept -- forming a full hierarchy.
3. A user can edit a Fact's statement (subject, predicate, object), tags, and difficulty after creation.
4. A user can upload a JSON file matching the import schema and see the hierarchy created from it.
5. A user can run a dry-run import that returns validation results without persisting anything.
6. Each Object in a triple is exactly one atomic fact -- the schema enforces this by accepting a single string, not arrays or compound values.
7. All hierarchy endpoints return 404 for resources belonging to other users.

### Key Data Model Decisions (Pending)

- Hierarchy: Subject > Topic > Concept > Fact (triple)
- Facts store `subject`, `predicate`, `object` as separate columns (not JSON blobs)
- Tags on facts as a many-to-many relation
- Difficulty stored per-fact for future adaptive progression

---

## Phase 2: Question Generation Engine (Preview)

**Goal:** Questions are generated deterministically from SPO data. No pre-authored questions.

- Question engine operating on three dimensions: Axis (hide S/P/O), Scope (single/cell/paired/profile/cross-subject), Format (MC/select-all/matching/T-F/fill-in-the-blank)
- Distractor sourcing from same-predicate and adjacent-predicate data
- Shared vs. discriminating Object tracking per predicate
- Quiz session API: start session scoped to any hierarchy level, receive generated questions

**User Stories:** #6 (start a quiz session), #7 (deterministic questions from facts)

---

## Phase 3: Learning Tracking (Preview)

**Goal:** Track student mastery per-triple and surface weak areas.

- SM-2 spaced repetition per user-triple pair
- Quality derivation from correctness + response time (no self-rating)
- Hierarchical mastery rollup (concept/topic/subject percentages)
- Weak area identification (low-mastery clusters)
- Daily review queue (due cards + new cards, interleaved)

**User Stories:** #8 (immediate feedback), #9 (mastery at every level), #10 (daily review queue), #11 (weak areas)

---

## Phase 4: Adaptive Progression (Preview)

**Goal:** The system behaves like a tutor -- selecting what to test next based on demonstrated mastery.

- Independent progression along axis, scope, and format dimensions
- Trigger-based moves (miss a triple -> drill it; master MC -> promote to fill-in-the-blank)
- Distractor difficulty tuning (cross-predicate vs. same-predicate)
- Composite distractor generation for advanced students

**User Stories:** #6, #7 (refined -- adaptive quiz sessions)

---

## Current Status

- **Phase:** Pre-Phase 1
- **In Progress:** Knowledge hierarchy DB schema design, shared Zod schemas
- **Blocking:** Schema design must complete before CRUD routes and import endpoint
- **Next Up:** Implement Drizzle schema + migrations, then subjects CRUD + import
