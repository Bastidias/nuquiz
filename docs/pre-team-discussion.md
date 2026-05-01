# Pre-Team Discussion

> Open questions to align on together before we build. Decisions locked so far live at the top; remaining questions follow.

## Decisions locked (2026-04-30)

- **Stack.** Vercel / Next.js + Supabase as server-only data-access layer, with a backend-for-frontend pattern. The client never holds Supabase credentials or uses supabase-js. Sub-decisions still open: BFF surface (Route Handlers vs Server Actions vs separate Node service), auth provider, migrations tool, BFF ↔ client contract.
- **Target student.** Professional-certification candidates. The two demo content sets in repo (CISSP, NCLEX) are representative.
- **Authoring / conceptual model.** Table-native (Rows × Columns × cells), matching the author view in `docs/cissp/knowledge-map.md`. **Physical storage shape** (table rows / SPO triples / graph / hybrid) is deferred to a future data architect — see `docs/data-shapes.md`. **Storage shape will evolve over time** — design for migration, not lock-in. The CellFact-ID invariant is the bridge that survives shape changes.
- **v1 surface.** The quiz-taking experience, **CISSP vertical only**. NCLEX deferred to "later." Authoring (Builder UI, draft-to-live workflow, SME review) is v2; v1 content gets in via markdown / direct file editing, same as current demo content.
- **Engine architecture.** Engine is a **standalone API service** (not a library). Multiple clients call it: web (Next.js with a BFF inside the Next app), iOS native (timing TBD). The engine owns the Supabase connection. Engine hosting platform vs. co-location with Next.js still open.
- **v1 engine capabilities (see `docs/demo/capabilities.md` Status).** Student response history is **on** (drives adaptive distractors, confusion-pair tracking, history-dependent modes). Question shapes: §§1, 2, 6 of `capabilities.md` all in scope, build priority MC → SATA → Ordering → T/F → Comparison (Comparison = MC/SATA variant on *shared* / *not-in* queries). All six modes (§8) in scope; lead modes tuned in build. Misconception feedback (§5) is deterministic-only — coordinate grammar, no LLM-written prose; all four §5 variants in (trace, confusion-pair count, confusion graph, phantom-fact flag). Distractors come from same-Column other Rows only (no cross-Column "obviously wrong" pool, no near-string special case); difficulty modulated by student history. Pedagogical moves (§7) **out** of v1. Authoring-side flex (§9) is v2.

## 1. Who & what

- After two weeks, what does the student say about us?
- How many CISSP Concepts ship in v1? (vertical and modes are settled — CISSP, all six modes)
- Is iOS native part of v1, or planned-for-later?
- Free / paid / freemium?

## 2. Engine scope

- Capability cuts settled — see Decisions / `docs/demo/capabilities.md` Status.
- Engine = standalone API service (settled). **Open: do we prototype the engine against fixtures before building the surface?**

## 3. Data shape

**Non-negotiable — every atomic CellFact has a stable, durable ID.** The text is not the ID, position is not the ID, and a Cell with three CellFacts has three IDs. Given an ID we can resolve back to Concept / RowHeader / ColumnHeader / source citation; given a coordinate we can enumerate its CellFacts. Typos fix in place, reorders preserve history. Every differentiator in `docs/demo/capabilities.md` — per-CellFact history, confusion pairs, guaranteed distractors, cell-completion targeting — is a corollary of this. Lose it and the product is a nicer Anki. (Engine vocabulary defined in `docs/glossary.md`.)

Rules out: delimited strings re-split at read time, text-derived (hashed) IDs, LLM-paraphrased CellFacts surfaced as if they were the original. Whatever physical shape the data architect picks must satisfy the above.

The remaining sub-questions — storable vs computed at query time, response-data retention/granularity — are **deferred to discovery during build**, consistent with the "data shape will evolve" stance in Decisions. Initial defaults emerge from what the engine and modes actually need; we'll adjust as we measure.

## 4. How we work

- AI-assisted dev: what's checked in (prompts, skills, agent configs), what's personal?
- What's the review lens for catching plausible-but-wrong LLM output?
- What kind of decision deserves a written record, and where does it live?

## 5. Success & kill

*Deferred pre-team — revisit once a v1 surface exists to evaluate against.*

- What does "it's working" look like at 6 weeks?
- What signal makes us pivot? Stop?
