# Phase 2 — Quiz Session API

## Summary

| ID | Title | Status | Test Coverage |
|----|-------|--------|---------------|
| S06 | Start a quiz session scoped to a hierarchy level | Done | `quiz.test.ts` |
| S07 | Receive deterministically generated questions from Triples | Done | `engine/*.test.ts`, `quiz.test.ts` |
| S08 | Submit answers and record responses | Done | `quiz.test.ts` |

---

## S06 — Start a quiz session scoped to a hierarchy level

**As** a student
**I want to** start a quiz session scoped to a Deck, Topic, or Concept
**So that** I can practice at whatever granularity I choose

### Acceptance Criteria

- [x] A user can start a quiz session by providing a scope level (`concept`, `topic`, or `deck`) and the corresponding ID
- [x] The user must be authenticated
- [x] The user must be the catalog author or have an active subscription to the catalog that contains the target content
- [x] If the target ID does not exist or belongs to a catalog the user cannot access, return 404
- [x] If the scoped content contains fewer triples than needed to generate at least one question, return 422 with a meaningful error
- [x] When scoped to a Concept, questions are generated from all Triples within that Concept
- [x] When scoped to a Topic, Triples are collected from all Concepts within that Topic; each question still respects the Concept boundary for distractor sourcing
- [x] When scoped to a Deck, Triples are collected from all Concepts within all Topics of that Deck; each question still respects the Concept boundary for distractor sourcing
- [x] The response includes a session ID, the scope level, the scoped entity ID, and a list of questions (without correct answers)
- [x] Questions sent to the client do NOT include `correctAnswer` or any data that reveals the answer before submission
- [x] The user can optionally filter by axis (`subject`, `predicate`, `object`) and/or format (`multiple_choice`, `select_all`, `true_false`, `matching`, `fill_blank`)
- [x] The user can provide an optional `seed` for reproducible question ordering (same seed + same content = same questions)
- [x] The session and its generated questions are held server-side so that answer verification happens server-side only

### Test Mapping
- `packages/api/src/__tests__/routes/quiz.test.ts` — `describe("S06: POST /quiz/start")`

---

## S07 — Receive deterministically generated questions from Triples

**As** a student
**I want** questions generated deterministically from Triple data, not pre-authored
**So that** the quiz covers every meaningful comparison within each Concept

### Acceptance Criteria

- [x] Each question is defined by three dimensions: axis (Subject / Predicate / Object hidden), scope (which Triples participate), and format (how the student responds)
- [x] Distractors are always sourced from real data within the same Concept -- never invented, never from outside the Concept boundary
- [x] Primary distractor source: Objects from the same predicate but different SPO subjects within the Concept
- [x] Fallback distractor source: Objects from adjacent predicates within the Concept, used only when same-predicate options are exhausted
- [x] If the Concept cannot supply enough data for a requested format (e.g., matching requires 2+ SPO subjects), that format is skipped rather than generating a degenerate question
- [x] The same seed always produces the same set of questions for the same content (deterministic / reproducible)
- [x] Each question includes a list of `tripleIds` identifying which Triples it tests, so the client can correlate responses to specific facts
- [x] Multiple-choice questions have exactly one correct answer and at least one distractor
- [x] Select-all questions have one or more correct answers and at least one distractor
- [x] True/false questions present a Triple claim that is either correct or has a swapped Object from another SPO subject
- [x] Matching questions pair SPO subjects to Objects for a shared predicate
- [x] Fill-in-the-blank questions present a Triple with the target axis blanked and no answer options
- [x] Questions within a session are shuffled (order controlled by the seed)

### Test Mapping
- Engine unit tests: `packages/api/src/__tests__/engine/*.test.ts` — all `describe("S07: ...")`
- Integration: `packages/api/src/__tests__/routes/quiz.test.ts` — `describe("S06: POST /quiz/start")`

---

## S08 — Submit answers and record responses

**As** a student
**I want to** submit my answer and see what I got right or wrong
**So that** I get immediate feedback and my progress is tracked

### Acceptance Criteria

- [x] A user can submit an answer for a specific question within their session by providing the question index, their selected answer(s), and how long they took (`responseTimeMs`)
- [x] After submission, the response reveals: the correct answer, whether the student was correct, and which Triple IDs the question tested
- [x] The response also includes the axis and format of the question, so the client can render appropriate feedback
- [x] A `quiz_responses` row is persisted with: `userId`, `conceptId` (the Concept boundary the question operated within), `axis`, `format`, `correct` (overall verdict: 1 or 0), and `responseTimeMs`
- [x] A `response_triples` row is persisted for each Triple the question tested, recording per-triple correctness (1 = correct, 0 = incorrect)
- [x] The same question within a session cannot be answered twice; re-submission returns 409 Conflict
- [x] Only the session owner can submit answers to their session
- [x] Submitting an answer for a question index that does not exist returns 404
- [x] Submitting an answer to an expired or nonexistent session returns 404
- [x] Response time is recorded in milliseconds for future SM-2 spaced repetition integration (Phase 3)

### Test Mapping
- `packages/api/src/__tests__/routes/quiz.test.ts` — `describe("S08: POST /quiz/:sessionId/respond")`

---

## Open Questions

| Question | Context | Decision |
|----------|---------|----------|
| Should sessions expire after a timeout? | Sessions hold generated questions server-side. Without expiry, they accumulate indefinitely. | Recommend: sessions expire after 1 hour of inactivity. Not blocking for MVP -- can store in-memory initially and revisit persistence in Phase 3. |
| How many questions per session? | A Concept may produce dozens of possible questions across all axis/format combinations. | Recommend: configurable `limit` parameter (default 10). Engine generates up to `limit` questions, mixing formats for variety. |
| Should Deck/Topic scope return questions from ALL child Concepts or sample? | A Deck with many Concepts could produce hundreds of questions. | Recommend: sample across child Concepts proportionally (at least 1 question per Concept, up to the session limit). Details left to implementation. |
