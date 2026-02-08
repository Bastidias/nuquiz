# NuQuiz

NuQuiz is a deterministic quiz engine built on structured knowledge data. Instead of relying on LLMs to generate questions — which can hallucinate and can't trace errors to specific facts — NuQuiz uses a Subject-Predicate-Object (SPO) data model to produce questions programmatically from authored content.

## Why

LLM-based study tools generate plausible-sounding questions with no guarantee of correctness and no way to pinpoint exactly what a student got wrong. NuQuiz solves both problems:

- **Deterministic:** Every question is derived directly from structured data. No hallucination.
- **Traceable:** Every question element — prompt, correct answer, distractor — links back to the exact triple(s) that sourced it. When a student gets something wrong, you know the precise fact they missed.
- **Diagnostic:** By tracking performance at the triple level, the system identifies specific knowledge gaps, not just "you scored 70% on networking."

## Data Model

### Knowledge Layer: SPO Triples

The atomic unit of knowledge is a **triple**: `(Subject, Predicate, Object)`.

**Each Object is exactly one fact.** If a source says "Fatigue and Weakness," that becomes two triples — one for Fatigue, one for Weakness. Never bundle multiple values into a single Object. This atomicity is what makes the entire system work: every Object can independently serve as a correct answer, a distractor, or a diagnostic signal. Compound values destroy that composability.

A Subject-Predicate pair can have multiple Objects (multiple triples with the same S and P). This naturally produces a matrix view where row headers are Subjects, column headers are Predicates, and each cell holds one or more Objects:

| | Reliability | Flow Control | OSI Layer |
|---|---|---|---|
| **TCP** | Guaranteed (Retransmission) | Yes | Transport Layer (Layer 4) |
| **UDP** | Best-effort (No retransmission) | No | Transport Layer (Layer 4) |

The underlying data is always the triple list — the matrix is a view. The same triples as rows:

| Subject | Predicate | Object |
|---------|-----------|--------|
| TCP | Reliability | Guaranteed (Retransmission) |
| UDP | Reliability | Best-effort (No retransmission) |
| TCP | Flow Control | Yes |
| UDP | Flow Control | No |
| TCP | OSI Layer | Transport Layer (Layer 4) |
| UDP | OSI Layer | Transport Layer (Layer 4) |

Triples that share a Predicate form natural comparison sets. Within a Predicate, some Objects may be shared across Subjects (both TCP and UDP → Transport Layer) and some may be unique to one Subject. The system treats both as first-class knowledge — what's common and what's different are equally important and both generate questions.

### Content Layer: Test Structure

Triples are organized into test content through a hierarchy of sections and topics. **Tags** cross-reference triples across the content structure, so the same triple can appear in multiple contexts (e.g., a "Transport Layer" section and a "Reliability" section).

The content layer defines how quizzes are assembled — which triples to pull, in what order, grouped by what theme. The knowledge layer stays independent and reusable.

## Question Generation

Questions are not written — they are **operations on the data**. A question is defined by:

1. **Query axis** — which part of the triple is hidden (S, P, or O)?
2. **Response format** — multiple choice, select all that apply, fill in the blank, ordering, etc.
3. **Scope** — single triple, multiple triples from the same subject, cross-subject, etc.

A question prompt is simply the visible coordinates: `UDP | Reliability → ?`

### Distractors

Wrong answers are sourced from the data, not invented. Because every Object is atomic (one fact, one row), each Object can independently serve as a distractor:

- Asking for TCP's Reliability? Pull UDP's Reliability value as a distractor.
- Need more options? Pull Objects from adjacent Predicates.
- Testing a multi-Object cell? Pull individual Objects from the other Subject's cell for the same Predicate.

Because distractors come from real data, they're always plausible and domain-appropriate. And because Objects are atomic, the system can mix and match them freely — composing novel answer options from the same underlying triples.

### Traceability

Every element of a generated question — the prompt, the correct answer, each distractor — maps back to specific triple(s). This is a core invariant: if a question exists, you can always follow it back to its source data.

## Business Model

NuQuiz is an author-driven tool. Content is authored per certification exam (NCLEX, CISSP, etc.) and shipped as a standalone app per exam. End users purchase a single app for the test they're studying for.

## Near-Term Goal

Build a demo UI to test and validate question generation from authored triple data. This serves as the proving ground for the data model, question types, and the core generation logic before scaling to full exam content.
