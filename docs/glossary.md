# Glossary

Canonical engine and authoring vocabulary for NuQuiz. Code, type definitions, schemas, and authoring tooling use the names defined here. Student-facing copy uses different vocabulary — see §Pedagogical layer.

## Terms

**Deck** — the top-level collection. One per exam (CISSP, NCLEX-RN).

**Topic** — a subdivision of a Deck. Maps to the source-of-truth taxonomy (CISSP "Domain," NCLEX "Client Need Category").

**Concept** — one comparable group. One file, one table, one Pattern. The unit of authoring.

**TableName** — the H1 heading of a Concept. A categorical label for what the Concept describes ("Transport Protocols," "TCP 3-Way Handshake," "Confidentiality").

**Pattern** — the shape contract: `Dimensions | Ordered | Aspects`. Determines how rows are interpreted and how the engine renders them pedagogically.
- *Dimensions* — rows are entities being compared on shared attributes.
- *Ordered* — rows are steps in sequence; columns progress from terse identifier to deeper detail.
- *Aspects* — single row with multiple facets; the row is the concept itself.

**RowHeader** — a label string identifying one row (`TCP`, `Step 2`, `Confidentiality`). Indexes one Cell per ColumnHeader.

**ColumnHeader** — a label string identifying one column (`reliability`, `Name`, `definition`). Indexes one Cell per RowHeader.

**Cell** — the (RowHeader, ColumnHeader) intersection slot. Holds 1..m CellFacts.

**CellFact** — one atomic, independently addressable assertion. The smallest unit the engine grades, addresses, or distracts on. Every CellFact has a stable, durable ID that survives text edits, reorders, and surrounding changes (the **CellFact-ID invariant**; see `pre-team-discussion.md` §3).

A Cell with three `<br>`-separated items contains three CellFacts. The 1..m cardinality is structural; the markdown `<br>` is the authoring surface for the list, not the model.

---

## Cardinalities

```
Deck        1..n  Topic
Topic       1..n  Concept
Concept     1     TableName
Concept     1     Pattern
Concept     1..n  RowHeader
Concept     1..n  ColumnHeader
Concept     n×m   Cell          (RowHeader × ColumnHeader)
Cell        1..m  CellFact
```

---

## Worked example

`decks/cissp/04-communication-and-network-security/tcp-udp-sctp.md`:

- **TableName:** `TCP vs UDP vs SCTP`
- **Pattern:** Dimensions
- **RowHeaders (3):** `TCP`, `UDP`, `SCTP`
- **ColumnHeaders (11):** `connection type`, `reliability`, `ordering`, …
- **Cells:** 33 (3 × 11)
- **CellFacts:** more than 33 — the `typical use cases` Cell for TCP holds 4 CellFacts (`Web (HTTP, HTTPS)`, `Email (SMTP, IMAP)`, `File transfer (FTP, SFTP)`, `Remote access (SSH)`)

The CellFact at `(TCP, reliability) → Reliable` is one assertion. The same string `Reliable` also appears at `(SCTP, reliability)` — a different CellFact with its own ID, even though the text is identical.

---

## Pedagogical layer

Students never see the engine names. The UI substitutes:

- **RowHeader** → the label itself (`TCP`) or a Pattern-derived noun (`Step 2`, `Phase 1`)
- **ColumnHeader** → the label itself (`reliability`)
- **TableName** → the categorical noun (`transport protocol`, `BCP phase`) for collective sentences ("Other protocols you've mastered: UDP")
- **CellFact** → the value text directly

Engine vocabulary lives in code, schemas, and authoring tools. Pedagogical vocabulary is rendered at the UI boundary via Pattern + TableName + label substitution.

---

## Renamed from older docs

`decks/cissp/knowledge-map.md` and `decks/nclex/knowledge-map.md` predate this glossary and use an earlier vocabulary; they will be reconciled when authoring work in those verticals resumes.

| Older term | Current term |
|---|---|
| Row | RowHeader (label) + Row (collection, implicit) |
| Column | ColumnHeader (label) + Column (collection, implicit) |
| Fact | CellFact |
| Cell, Concept, Pattern, Deck, Topic | unchanged |
| (no name) | TableName (now first-class) |

---

## Why literal names

The engine, authoring, and pedagogical layers serve different audiences and won't share one vocabulary. Earlier attempts to find clever single-word names that worked at all three layers stalled for years. This glossary settles the engine + authoring layer with literal, structural names; pedagogical rendering happens at the UI boundary.

---

## Out of scope

Vertical-specific concepts (CISSP "sub-objective," NCLEX "Client Need," per-Concept `Tags` and `Status`, citation `[sN]` markers) are defined in their respective vertical's `knowledge-map.md`, not here.
