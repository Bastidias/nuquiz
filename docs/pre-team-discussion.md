# Pre-Team Discussion

> Questions to align on together before we build. **Questions, not answers.** Current repo posture (`CLAUDE.md`) is demo content only — no code, no architecture.

## 1. Who & what

- Who's the target student, and what do they say about us after two weeks?
- What counts as a shippable v1 — how many Concepts, which modes, which domains?
- Free / paid / freemium?

## 2. Engine scope

- Which capabilities from `docs/demo/capabilities.md` are v1 vs later? (Adaptive distractors, confusion pairs, cohort stats — name the cut.)
- Is the engine a library the app calls, or a standalone service? Do we prototype it before the app?

## 3. Data shape

**Non-negotiable — every atomic Fact has a stable, durable ID.** The text is not the ID, position is not the ID, and a cell with three Facts has three IDs. Given an ID we can resolve back to Concept / Row / Column / source citation; given a coordinate we can enumerate its Facts. Typos fix in place, reorders preserve history. Every differentiator in `docs/demo/capabilities.md` — per-Fact history, confusion pairs, guaranteed distractors, cell-completion targeting — is a corollary of this. Lose it and the product is a nicer Anki.

Rules out: delimited strings re-split at read time, text-derived (hashed) IDs, LLM-paraphrased Facts surfaced as if they were the original. The fork below must satisfy the above.

- How is content stored — table-native (Rows × Columns × cells, matching the author view), SPO triples (one row per atomic Fact), a graph, or a hybrid? This shapes the DB, API, authoring UI, and how the engine's operators (`Row | Column → Value`) get implemented.
- What else is storable content vs computed at query time? (Knowledge-map already says shared/discriminating values are query-time; anything else on that list?)
- What response data do we keep per student, for how long, and at what granularity (per Fact, per prompt, per session)?

## 4. Content

- Who authors Concepts, and how does "draft → live" work?
- Is SME review a blocking gate or async?
- Markdown-forever, or does a Builder UI come later?

## 5. How we work

- AI-assisted dev: what's checked in (prompts, skills, agent configs), what's personal?
- What's the review lens for catching plausible-but-wrong LLM output?
- What kind of decision deserves a written record, and where does it live?

## 6. Success & kill

- What does "it's working" look like at 6 weeks?
- What signal makes us pivot? Stop?
