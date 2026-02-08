# NuQuiz Ubiquitous Language — Glossary

> **Canonical reference for all agent prompts.**
> Every term below is the ONLY acceptable term. If you catch yourself
> or another agent using a synonym not listed here, correct it immediately.
>
> Source of truth for the data model: `docs/data-model.md`

---

## Knowledge Context

| Term | Definition |
|------|-----------|
| **Catalog** | Purchasable product unit (e.g., "NCLEX-RN 2026", "CISSP 2024"). Top-level container. Content is owned by the Catalog, not by individual users. |
| **Deck** | Content grouping within a Catalog (e.g., one per exam domain). NOT called "Subject" — that term is reserved for SPO subjects. |
| **Topic** | Organizational grouping within a Deck. |
| **Concept** | **The comparison boundary.** All SPO subjects within a Concept are comparable for question generation. This is the aggregate root for the question engine. |
| **Triple** | Atomic SPO fact: one subject, one predicate, one object. NOT called "Fact." No statement column, no fields JSON, no difficulty column. |
| **SPO Subject** | The entity a Triple describes (e.g., "TCP", "Warfarin"). A text column on the `triples` table. NOT the same as "Deck." |
| **Predicate** | The attribute being described (e.g., "Reliability", "Antidote"). A text column on the `triples` table. |
| **Object** | The value of the predicate for the given subject (e.g., "Guaranteed", "Vitamin K"). A text column on the `triples` table. |
| **Cell** | The intersection of one SPO subject and one predicate within a Concept. Contains exactly one Object. |
| **Tag** | Content-only label scoped to a Catalog (e.g., "definition", "process"). Used for content organization in Phase 1, NOT for question generation. |

## Question Generation Context (Phase 2+)

| Term | Definition |
|------|-----------|
| **Axis** | Which part of the triple the question hides: Subject (S-axis), Predicate (P-axis), or Object (O-axis). |
| **Scope** | How many SPO subjects participate: single-subject, paired comparison, or full-concept. |
| **Format** | How the student responds: multiple-choice, true/false, free-recall, matching, grid-fill, etc. |
| **Distractor** | An incorrect but plausible answer choice. Always sourced from real data — same predicate, different SPO subject within the Concept. |
| **Composite Distractor** | A distractor built by combining values from different predicates (e.g., mixing TCP's reliability with UDP's ordering). |
| **Shared Object** | An Object that appears for multiple SPO subjects within the same Concept and predicate. Computed at query time, never stored. |
| **Discriminating Object** | An Object that differs between SPO subjects for the same predicate. Computed at query time, never stored. |
| **Scaffolding** | Progressive disclosure of context to lower difficulty (e.g., showing the predicate name reduces a free-recall question to cued recall). |

## Learning Context (Phase 3+)

| Term | Definition |
|------|-----------|
| **Review Card** | One per user + triple. Tracks SM-2 spaced repetition state (ease factor, interval, repetition count). |
| **Mastery** | Derived metric: percentage of triples a student has mastered within a hierarchy level. Computed, never stored. |
| **Quality** | SM-2 input (0–5) derived from correctness + response time. Determines how the review card's interval changes. |

## Authoring Context

| Term | Definition |
|------|-----------|
| **Import** | Bulk-loading triples via JSON. Payload is nested: deck > topics[] > concepts[] > triples[]. |
| **Dry Run** | Import validation mode (`?dryRun=true`). Returns preview counts and validation errors without persisting data. |

---

## What Triples Do NOT Have

These are common misconceptions. Triple rows contain ONLY: `id`, `concept_id`, `subject`, `predicate`, `object`, `sort_order`, `created_at`, `updated_at`.

| Misconception | Reality |
|---------------|---------|
| ~~difficulty column~~ | Difficulty is a property of a *question*, determined by axis + scope + format + distractor source at generation time. |
| ~~statement column~~ | No canonical sentence. The SPO columns ARE the content. |
| ~~fields JSON column~~ | No key-value blob. Subject, predicate, and object are separate text columns. |
| ~~entity tables for subjects/predicates~~ | Deferred to Phase 2 Builder UI. Currently plain text columns. |
| ~~stored shared/discriminating flags~~ | Computed at query time from triple data within the Concept boundary. |
| ~~triple_relations table~~ | Deferred. Metadata, not used by question engine. |

---

## DDD Pattern Mapping

> Maps NuQuiz terms to Domain-Driven Design tactical patterns.
> Other agent prompts reference this section — do not duplicate these definitions elsewhere.

### Bounded Contexts

| Context | Scope | Key Aggregates |
|---------|-------|----------------|
| **Knowledge** (authoring) | Catalog hierarchy, CRUD, import, tags | Catalog Aggregate |
| **Quiz** (generation) | Question strategies, session orchestration, distractor sourcing | Concept Aggregate |
| **Learning** (tracking) | Review cards, SM-2, mastery rollup, daily queue | ReviewCard (Phase 3) |

Contexts communicate through shared identifiers (triple IDs, concept IDs) but do NOT share internal logic.

### Aggregates and Aggregate Roots

| Aggregate | Root | Boundary | Invariant |
|-----------|------|----------|-----------|
| **Catalog** | Catalog | All content in a Catalog (Decks, Topics, Concepts, Triples) | Only `created_by` can modify; cascade delete |
| **Concept** | Concept | All Triples and SPO subjects within the Concept | All SPO subjects comparable; engine never crosses boundary |
| **ReviewCard** (Phase 3) | ReviewCard | One per user + triple | SM-2 state is authoritative |

### Entities vs Value Objects

| Classification | Examples |
|----------------|----------|
| **Entities** (have identity) | Catalog, Deck, Topic, Concept, Triple, Tag, User, ReviewCard |
| **Value Objects** (identity-less, interchangeable) | SPO text components, axis/scope/format dimensions, SM-2 parameters |

### Domain Services vs Application Services

| Type | Examples | Rule |
|------|----------|------|
| **Domain Service** | Question generation, mastery rollup, import validation | Pure, no DB access, testable in isolation |
| **Application Service** | Route handlers (fetch → domain service → persist) | Matches the existing functional pipeline pattern |
| **Anti-Corruption Layer** | Import endpoint, future AI ingestion | Translates external data into domain objects |
