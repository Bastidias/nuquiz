# Phase 1 — Knowledge Hierarchy

## Summary

| ID | Title | Status | Test Coverage |
|----|-------|--------|---------------|
| S01 | Create deck with hierarchy | Done | decks.test.ts |
| S02 | Import structured content | Done | import.test.ts |
| S03 | Validate import before committing | Done | import.test.ts (dry-run) |
| S04 | Edit triples after creation | Done | decks.test.ts (PUT triples) |
| S05 | Content is private to author | Done | decks.test.ts (auth/ownership) |

---

## S01 — Create deck with hierarchy

**As** a content author
**I want to** create a Deck and organize it into Topics > Concepts > Triples
**So that** I can structure knowledge for quiz generation

### Acceptance Criteria
- [x] POST /catalogs/:catalogId/decks creates a deck within the author's catalog
- [x] Nested CRUD: topics under decks, concepts under topics, triples under concepts
- [x] Each triple has subject, predicate, and object text columns (atomic SPO)
- [x] Deleting a deck cascades to all children (topics, concepts, triples)
- [x] Another user cannot see or modify my catalog's decks

### Test Mapping
- `packages/api/src/__tests__/routes/decks.test.ts` — CRUD + cascade + auth

---

## S02 — Import structured content

**As** a content author
**I want to** import structured content via JSON
**So that** I can bulk-load triples instead of creating them one by one

### Acceptance Criteria
- [x] POST /catalogs/:catalogId/import accepts a JSON payload with nested deck > topics > concepts > triples
- [x] Import creates all hierarchy levels in a single transaction
- [x] Tags are resolved via get-or-create with catalog-scoped uniqueness
- [x] Import is idempotent — re-importing the same data does not create duplicates (by title matching)

### Test Mapping
- `packages/api/src/__tests__/routes/import.test.ts` — full import + tag handling

---

## S03 — Validate import before committing

**As** a content author
**I want to** dry-run my import to see what would be created
**So that** I can catch errors before committing data

### Acceptance Criteria
- [x] POST /catalogs/:catalogId/import?dryRun=true validates the payload and returns a preview
- [x] Dry run returns counts of decks, topics, concepts, and triples that would be created
- [x] Dry run does NOT persist any data
- [x] Validation errors are returned with enough detail to fix the input

### Test Mapping
- `packages/api/src/__tests__/routes/import.test.ts` — dry-run mode tests

---

## S04 — Edit triples after creation

**As** a content author
**I want to** edit a triple's subject, predicate, or object after creation
**So that** I can correct mistakes and refine my content

### Acceptance Criteria
- [x] PUT /catalogs/:catalogId/decks/:deckId/.../triples/:tripleId updates the triple
- [x] Partial updates supported (can update just the object without resending subject/predicate)
- [x] Only the catalog author can edit triples
- [x] Updated triple reflects changes immediately in subsequent GET requests

### Test Mapping
- `packages/api/src/__tests__/routes/decks.test.ts` — PUT triple tests

---

## S05 — Content is private to author

**As** a content author
**I want** my catalogs and their content to be private to me
**So that** my work is protected until I choose to share it

### Acceptance Criteria
- [x] GET /catalogs returns only catalogs where created_by matches the authenticated user
- [x] Another user cannot GET, PUT, or DELETE my catalog's decks, topics, concepts, or triples
- [x] Authorization is enforced via JOIN chain (catalog.created_by = userId)
- [x] Subscribers can read content but not modify it (future — not yet implemented)

### Test Mapping
- `packages/api/src/__tests__/routes/decks.test.ts` — ownership/auth tests
