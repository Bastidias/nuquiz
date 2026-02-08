# NuQuiz Data Model — Canonical Reference

> **This is the single source of truth for the NuQuiz data model.**
> All schema, route, and test implementations MUST conform to this document.
> If code contradicts this document, the code is wrong.

---

## Full Hierarchy

```
Catalog > Deck > Topic > Concept > Triple
```

| Level | DB Table | Parent FK | Purpose |
|-------|----------|-----------|---------|
| **Catalog** | `catalogs` | `created_by` → `users` | Purchasable product unit. One per standardized test (e.g., "NCLEX-RN", "CISSP 2024"). |
| **Deck** | `decks` | `catalog_id` → `catalogs` | Content grouping within a catalog (e.g., one per exam domain or subcategory). |
| **Topic** | `topics` | `deck_id` → `decks` | Organizational grouping within a deck (e.g., "Security Models", "Anticoagulant Therapy"). |
| **Concept** | `concepts` | `topic_id` → `topics` | **The comparison boundary.** All SPO subjects within a concept are comparable for question generation. |
| **Triple** | `triples` | `concept_id` → `concepts` | Atomic SPO fact: one subject, one predicate, one object. |

### Content ownership model

- **Content is shared, read-only.** Catalogs are authored by content creators. All subscribers read from the same Decks, Topics, Concepts, and Triples. Author updates propagate instantly.
- **All content lives in a Catalog.** There are no personal/user-owned Decks outside of a Catalog.
- **Progress is per-user.** Each student has their own mastery state tracked per-triple via `quiz_responses` / `response_triples`.
- **Subscriptions gate access.** Users subscribe to a Catalog to access its content.

### Why 5 levels?

**Catalog** is the product boundary — it maps to a purchasable subscription. Without it, there's no way to group Decks into a product or gate access.

**Concept** is the question engine boundary — it tells the engine which SPO subjects are comparable. Without it, the engine would need to guess whether "TCP vs Hypoglycemia" is a valid comparison (it isn't).

The three middle levels (Deck, Topic, Concept) organize content for both authoring and studying:

- **Deck** scopes content to a domain or exam section.
- **Topic** organizes content for browsing and study session selection.
- **Concept** defines which SPO subjects participate in cross-subject questions, paired comparisons, and distractor sourcing.

### Naming decisions

| Term | NOT | Why |
|------|-----|-----|
| **Catalog** | ~~Exam~~, ~~Course~~ | Generic — works for certification exams and other content types. |
| **Deck** | ~~Subject~~ | "Subject" collides with the SPO subject field on triples. |
| **Triple** | ~~Fact~~ | "Triple" is the standard term for SPO data. |

These names are used consistently in: Drizzle schema, Zod schemas, API routes, test files, and all documentation.

---

## Tables

### `catalogs`

| Column | Type | Constraints |
|--------|------|------------|
| `id` | TEXT | PK |
| `created_by` | TEXT | NOT NULL, FK → users (the content author) |
| `title` | TEXT | NOT NULL |
| `description` | TEXT | nullable |
| `created_at` | TEXT | NOT NULL (ISO 8601) |
| `updated_at` | TEXT | NOT NULL (ISO 8601) |

### `subscriptions`

| Column | Type | Constraints |
|--------|------|------------|
| `id` | TEXT | PK |
| `user_id` | TEXT | NOT NULL, FK → users |
| `catalog_id` | TEXT | NOT NULL, FK → catalogs |
| `status` | TEXT | NOT NULL ("active", "expired", "cancelled") |
| `subscribed_at` | TEXT | NOT NULL (ISO 8601) |
| `expires_at` | TEXT | nullable (null = no expiry) |

**Indexes:** UNIQUE on `(user_id, catalog_id)`

### `decks`

| Column | Type | Constraints |
|--------|------|------------|
| `id` | TEXT | PK |
| `catalog_id` | TEXT | NOT NULL, FK → catalogs, ON DELETE CASCADE |
| `title` | TEXT | NOT NULL |
| `description` | TEXT | nullable |
| `sort_order` | INTEGER | NOT NULL, default 0 |
| `created_at` | TEXT | NOT NULL (ISO 8601) |
| `updated_at` | TEXT | NOT NULL (ISO 8601) |

**Indexes:** `idx_decks_catalog_id` on `(catalog_id)`

### `topics`

| Column | Type | Constraints |
|--------|------|------------|
| `id` | TEXT | PK |
| `deck_id` | TEXT | NOT NULL, FK → decks, ON DELETE CASCADE |
| `title` | TEXT | NOT NULL |
| `description` | TEXT | nullable |
| `sort_order` | INTEGER | NOT NULL, default 0 |
| `created_at` | TEXT | NOT NULL (ISO 8601) |
| `updated_at` | TEXT | NOT NULL (ISO 8601) |

**Indexes:** `idx_topics_deck_id` on `(deck_id)`

### `concepts`

| Column | Type | Constraints |
|--------|------|------------|
| `id` | TEXT | PK |
| `topic_id` | TEXT | NOT NULL, FK → topics, ON DELETE CASCADE |
| `title` | TEXT | NOT NULL |
| `description` | TEXT | nullable |
| `sort_order` | INTEGER | NOT NULL, default 0 |
| `created_at` | TEXT | NOT NULL (ISO 8601) |
| `updated_at` | TEXT | NOT NULL (ISO 8601) |

**Indexes:** `idx_concepts_topic_id` on `(topic_id)`

### `triples`

| Column | Type | Constraints |
|--------|------|------------|
| `id` | TEXT | PK |
| `concept_id` | TEXT | NOT NULL, FK → concepts, ON DELETE CASCADE |
| `subject` | TEXT | NOT NULL (SPO subject, e.g., "TCP") |
| `predicate` | TEXT | NOT NULL (SPO predicate, e.g., "Reliability") |
| `object` | TEXT | NOT NULL (SPO object, e.g., "Guaranteed (Retransmission)") |
| `sort_order` | INTEGER | NOT NULL, default 0 |
| `created_at` | TEXT | NOT NULL (ISO 8601) |
| `updated_at` | TEXT | NOT NULL (ISO 8601) |

**Indexes:**
- `idx_triples_concept_id` on `(concept_id)`
- `idx_triples_subject_predicate` on `(concept_id, subject, predicate)` — cell queries
- `idx_triples_predicate` on `(concept_id, predicate)` — cross-subject queries

**Note:** `user_id` was removed from triples. Content is owned by the Catalog, not by individual users. Authorship is tracked at the Catalog level via `created_by`.

### `tags`

| Column | Type | Constraints |
|--------|------|------------|
| `id` | TEXT | PK |
| `catalog_id` | TEXT | NOT NULL, FK → catalogs, ON DELETE CASCADE |
| `name` | TEXT | NOT NULL |
| `created_at` | TEXT | NOT NULL (ISO 8601) |

**Indexes:** `idx_tags_catalog_name` UNIQUE on `(catalog_id, name)`

**Note:** Tags are scoped to a Catalog (not to a user), since content is shared.

### `triple_tags`

| Column | Type | Constraints |
|--------|------|------------|
| `triple_id` | TEXT | NOT NULL, FK → triples, ON DELETE CASCADE |
| `tag_id` | TEXT | NOT NULL, FK → tags, ON DELETE CASCADE |

**Indexes:**
- `idx_triple_tags_pk` UNIQUE on `(triple_id, tag_id)`
- `idx_triple_tags_tag_id` on `(tag_id)`

---

## Cascade behavior

All content foreign keys use `ON DELETE CASCADE`. Deleting a Catalog removes all its Decks, Topics, Concepts, Triples, Tags, and tag associations.

Deleting a user who is a content author cascades to their Catalogs. Deleting a subscribing user removes their subscriptions and progress data but does not affect shared content.

---

## Quiz responses (Phase 2/3)

Every student answer is recorded as a `quiz_response` with per-triple detail in `response_triples`.

### `quiz_responses` (Phase 2/3)

| Column | Type | Constraints |
|--------|------|------------|
| `id` | TEXT | PK |
| `user_id` | TEXT | NOT NULL, FK → users |
| `concept_id` | TEXT | NOT NULL, FK → concepts (the comparison boundary used) |
| `axis` | TEXT | NOT NULL ("subject", "predicate", or "object") |
| `scope` | TEXT | NOT NULL ("single", "cell", "paired", "profile", "cross-subject") |
| `format` | TEXT | NOT NULL ("mc", "sata", "matching", "true-false", "fill-in-the-blank") |
| `correct` | INTEGER | NOT NULL (boolean: 1 = fully correct, 0 = any error) |
| `response_time_ms` | INTEGER | NOT NULL |
| `created_at` | TEXT | NOT NULL (ISO 8601) |

**Indexes:** `idx_quiz_responses_user_concept` on `(user_id, concept_id)`, `idx_quiz_responses_user_created` on `(user_id, created_at)`

The `correct` column is the overall verdict. Per-triple breakdown lives in `response_triples`.

### `response_triples` (Phase 2/3)

16 of 24 question types test multiple triples per question. This join table enables per-triple mastery updates.

| Column | Type | Constraints |
|--------|------|------------|
| `id` | TEXT | PK |
| `response_id` | TEXT | NOT NULL, FK → quiz_responses |
| `triple_id` | TEXT | NOT NULL, FK → triples |
| `role` | TEXT | NOT NULL ("target" or "distractor") |
| `selected` | INTEGER | nullable (boolean: 1 = student selected/checked, 0 = student did not select. null for formats where selection doesn't apply, e.g., fill-in-the-blank.) |
| `correct` | INTEGER | nullable (boolean: 1 = student was correct about this triple, 0 = student was wrong. null for distractors not selected.) |

**Indexes:** `idx_response_triples_response` on `(response_id)`, `idx_response_triples_triple` on `(triple_id)`

### How responses map to question formats

**MC (single answer):** One target triple. `selected=1, correct=1` if right, `selected=1, correct=0` if wrong. Distractors not recorded (student didn't interact with individual triples).

**SATA (select all that apply):** Multiple targets + distractors, each with `selected` indicating what the student checked. Example — student selects 3 of 4 correct items and 1 distractor:
- Target A: `selected=1, correct=1` (correctly selected)
- Target B: `selected=1, correct=1` (correctly selected)
- Target C: `selected=0, correct=0` (missed — should have selected)
- Target D: `selected=1, correct=1` (correctly selected)
- Distractor E: `selected=1, correct=0` (wrongly selected)
- Distractor F: `selected=0, correct=null` (correctly avoided — no mastery impact)

**Composite MC (bundled options):** Each target triple in the chosen composite gets a correctness signal. Example — student picks an option where Flow Control is wrong but the rest is right:
- Target (Reliability): `selected=1, correct=1`
- Target (Flow Control): `selected=1, correct=0` (the composite had the wrong value)
- Target (OSI Layer): `selected=1, correct=1`

**True/False:** One target triple presented with a claim. `selected=1` (student said True) or `selected=0` (student said False). `correct=1` if they were right.

**Fill-in-the-blank:** One or more target triples. `selected=null` (not a selection format). `correct=1` if the student's text matched, `correct=0` if not.

**Matching (grid):** Each cell in the grid is a target triple. `selected=null`. `correct=1` if placed correctly, `correct=0` if not.

### Mastery update rules

Only `target` triples with a non-null `correct` value trigger SM-2 updates. `correct=1` is a positive signal, `correct=0` is negative. Distractors are recorded for analytics (e.g., "students frequently confuse Dizziness with Hyperglycemia") but do not affect SM-2 scores.

---

## What is NOT in the schema

| Omission | Reason |
|----------|--------|
| **No difficulty column** on triples | Difficulty is a property of a *question*, not a fact. Determined by axis, scope, format, and distractor source at generation time. |
| **No entity tables** for SPO subjects/predicates | Deferred to Phase 2 Builder UI. Currently, subjects and predicates are plain text columns. |
| **No `triple_relations` table** | Metadata, not used by question engine. Deferred. |
| **Shared/discriminating objects not stored** | Computed at query time from triple data. A shared object is one that appears for multiple SPO subjects within the same concept and predicate. |
| **No recursive/arbitrary-depth nesting** | Validated against CISSP (8 domains), Security+ (5 domains), and NCLEX-RN (8 subcategories). All fit within 5 fixed levels. No exam required deeper nesting. |

---

## Example: How exam content maps to the hierarchy

### CISSP

```
Catalog: "CISSP 2024"
  ├─ Deck: "Security Architecture and Engineering" (Domain 3, 13%)
  │    ├─ Topic: "Security Models"
  │    │    └─ Concept: "Bell-LaPadula vs Biba vs Clark-Wilson vs Brewer-Nash"
  │    │         ├─ Triple: Bell-LaPadula | Primary Goal | Confidentiality
  │    │         ├─ Triple: Biba | Primary Goal | Integrity
  │    │         ├─ Triple: Bell-LaPadula | Main Mechanism | No Read Up
  │    │         ├─ Triple: Biba | Main Mechanism | No Read Down
  │    │         └─ ...
  │    ├─ Topic: "Cryptographic Solutions"
  │    │    ├─ Concept: "Symmetric vs Asymmetric Encryption"
  │    │    │    ├─ Triple: Symmetric | Key Count | Single shared key
  │    │    │    ├─ Triple: Asymmetric | Key Count | Key pair (public + private)
  │    │    │    └─ ...
  │    │    └─ Concept: "Block Ciphers (AES vs DES vs 3DES)"
  │    │         ├─ Triple: AES | Block Size | 128 bits
  │    │         ├─ Triple: DES | Block Size | 64 bits
  │    │         └─ ...
  │    └─ Topic: "Secure Design Principles"
  │         └─ Concept: "Defense in Depth vs Zero Trust"
  │              └─ ...
  ├─ Deck: "Identity and Access Management" (Domain 5, 13%)
  │    ├─ Topic: "Authorization Mechanisms"
  │    │    └─ Concept: "Access Control Models (DAC vs MAC vs RBAC vs ABAC)"
  │    │         ├─ Triple: DAC | Access Decision | Resource owner's discretion
  │    │         ├─ Triple: MAC | Access Decision | Security labels assigned by admin
  │    │         ├─ Triple: RBAC | Access Decision | User's assigned role
  │    │         └─ ...
  │    └─ ...
  └─ ... (6 more Decks, one per remaining domain)
```

### NCLEX-RN

```
Catalog: "NCLEX-RN 2026"
  ├─ Deck: "Pharmacological and Parenteral Therapies" (12–18%)
  │    ├─ Topic: "Anticoagulant Therapy"
  │    │    ├─ Concept: "Warfarin vs Heparin"
  │    │    │    ├─ Triple: Warfarin | Lab to Monitor | INR
  │    │    │    ├─ Triple: Heparin | Lab to Monitor | aPTT
  │    │    │    ├─ Triple: Warfarin | Antidote | Vitamin K
  │    │    │    ├─ Triple: Heparin | Antidote | Protamine sulfate
  │    │    │    ├─ Triple: Warfarin | Onset | Slow (3–5 days)
  │    │    │    ├─ Triple: Heparin | Onset | Rapid (minutes IV)
  │    │    │    └─ ...
  │    │    └─ Concept: "Enoxaparin vs Unfractionated Heparin"
  │    │         └─ ...
  │    ├─ Topic: "IV Therapy"
  │    │    ├─ Concept: "IV Solution Tonicity (Isotonic vs Hypotonic vs Hypertonic)"
  │    │    │    ├─ Triple: 0.9% NaCl | Tonicity | Isotonic
  │    │    │    ├─ Triple: 0.45% NaCl | Tonicity | Hypotonic
  │    │    │    ├─ Triple: 3% NaCl | Tonicity | Hypertonic
  │    │    │    └─ ...
  │    │    └─ Concept: "IV Complications (Infiltration vs Phlebitis vs Extravasation)"
  │    │         └─ ...
  │    └─ Topic: "Blood Products"
  │         └─ Concept: "Transfusion Reactions"
  │              └─ ...
  ├─ Deck: "Physiological Adaptation" (11–17%)
  │    ├─ Topic: "Cardiovascular Disorders"
  │    │    ├─ Concept: "Left-Sided vs Right-Sided Heart Failure"
  │    │    │    ├─ Triple: Left-Sided HF | Affects | Pulmonary circulation
  │    │    │    ├─ Triple: Right-Sided HF | Affects | Systemic circulation
  │    │    │    └─ ...
  │    │    └─ Concept: "Angina Types (Stable vs Unstable vs Variant)"
  │    │         └─ ...
  │    └─ Topic: "Fluid and Electrolyte Imbalances"
  │         ├─ Concept: "Hypokalemia vs Hyperkalemia"
  │         │    ├─ Triple: Hypokalemia | Serum Level | Below 3.5 mEq/L
  │         │    ├─ Triple: Hyperkalemia | Serum Level | Above 5.0 mEq/L
  │         │    └─ ...
  │         └─ Concept: "Hyponatremia vs Hypernatremia"
  │              └─ ...
  └─ ... (6 more Decks, one per remaining subcategory)
```

### Subscription and progress

```
Subscriptions:
  student_456 → "NCLEX-RN 2026" (active, expires 2026-12-01)
  student_789 → "CISSP 2024" (active, no expiry)

Progress (per-user, per-triple):
  student_456 → Warfarin | Antidote | Vitamin K → mastered (SM-2: ease 2.5, interval 30d)
  student_456 → Heparin | Antidote | Protamine  → learning (SM-2: ease 1.8, interval 3d)
  student_789 → AES | Block Size | 128 bits     → not started
```

---

## API routes

All content routes require authentication. Content authoring routes require the user to be the Catalog's `created_by`. Study routes require an active subscription.

```
# Catalog management (author)
GET    /catalogs
POST   /catalogs
GET    /catalogs/:catalogId
PUT    /catalogs/:catalogId
DELETE /catalogs/:catalogId

# Subscriptions (student)
POST   /catalogs/:catalogId/subscribe
DELETE /catalogs/:catalogId/subscribe
GET    /me/subscriptions

# Content hierarchy (author — nested under catalog)
GET    /catalogs/:catalogId/decks
POST   /catalogs/:catalogId/decks
GET    /catalogs/:catalogId/decks/:deckId
PUT    /catalogs/:catalogId/decks/:deckId
DELETE /catalogs/:catalogId/decks/:deckId

GET    /catalogs/:catalogId/decks/:deckId/topics
POST   /catalogs/:catalogId/decks/:deckId/topics
GET    /catalogs/:catalogId/decks/:deckId/topics/:topicId
PUT    /catalogs/:catalogId/decks/:deckId/topics/:topicId
DELETE /catalogs/:catalogId/decks/:deckId/topics/:topicId

GET    /catalogs/:catalogId/decks/:deckId/topics/:topicId/concepts
POST   /catalogs/:catalogId/decks/:deckId/topics/:topicId/concepts
GET    /catalogs/:catalogId/decks/:deckId/topics/:topicId/concepts/:conceptId
PUT    /catalogs/:catalogId/decks/:deckId/topics/:topicId/concepts/:conceptId
DELETE /catalogs/:catalogId/decks/:deckId/topics/:topicId/concepts/:conceptId

GET    /catalogs/:catalogId/decks/:deckId/topics/:topicId/concepts/:conceptId/triples
POST   /catalogs/:catalogId/decks/:deckId/topics/:topicId/concepts/:conceptId/triples
PUT    /catalogs/:catalogId/decks/:deckId/topics/:topicId/concepts/:conceptId/triples/:tripleId
DELETE /catalogs/:catalogId/decks/:deckId/topics/:topicId/concepts/:conceptId/triples/:tripleId

# Import (author)
POST   /catalogs/:catalogId/import
POST   /catalogs/:catalogId/import?dryRun=true
```

Authorization is verified via:
- **Author routes:** User must be the Catalog's `created_by`, verified via JOIN chain from catalog → deck → topic → concept → triple.
- **Study routes:** User must have an active subscription to the Catalog.

---

## Zod schemas (packages/shared)

| Schema | Used for |
|--------|----------|
| `catalogSchema` / `createCatalogSchema` / `updateCatalogSchema` | Catalog CRUD |
| `subscriptionSchema` | Subscription management |
| `deckSchema` / `createDeckSchema` / `updateDeckSchema` | Deck CRUD |
| `topicSchema` / `createTopicSchema` / `updateTopicSchema` | Topic CRUD |
| `conceptSchema` / `createConceptSchema` / `updateConceptSchema` | Concept CRUD |
| `tripleSchema` / `createTripleSchema` / `updateTripleSchema` | Triple CRUD |
| `tagSchema` / `createTagSchema` | Tag management |
| `tripleTagSchema` | Tag associations |
| `importDeckSchema` | JSON import (nested: deck > topics[] > concepts[] > triples[]) |
| `importResultSchema` / `importDryRunResultSchema` | Import responses |
| `quizResponseSchema` / `createQuizResponseSchema` | Quiz response recording (Phase 2) |
| `responseTripleSchema` | Per-triple detail within a response (Phase 2) |

All schemas live in `packages/shared/src/schemas/knowledge.ts` and are re-exported from `packages/shared/src/index.ts`.

---

## Implementation files

| File | Contents |
|------|----------|
| `packages/api/src/db/schema.ts` | Drizzle table definitions (the DB source of truth) |
| `packages/shared/src/schemas/knowledge.ts` | Zod schemas (the validation source of truth) |
| `packages/shared/src/index.ts` | Public exports from shared package |
| `packages/api/src/env.ts` | `AppEnv` and `DbInstance` types for dependency injection |
| `packages/api/src/routes/decks.ts` | Hierarchy CRUD routes |
| `packages/api/src/routes/import.ts` | Import endpoint |
| `packages/api/src/index.ts` | App entrypoint, db injection middleware |
