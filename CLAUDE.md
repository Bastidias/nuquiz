# NuQuiz — Working in This Repo

This repo is **demo content only**. App code, strategy, roadmap, stories, and agent briefs were intentionally removed. There is no build, no tests, no implementation in this tree. Don't reintroduce architectural commitments without explicit user approval.

## What's here

```
decks/cissp/                                         — CISSP demo content
.claude/skills/research-cissp-concept/SKILL.md      — Skill: research and author one CISSP Concept from public sources
.claude/                                            — settings (agents and commands removed)
```

## Skills

- **`research-cissp-concept`** — invoke when authoring, expanding, re-citing, or restructuring a CISSP Concept. One Concept per invocation. Hybrid public-source research with per-Cell citations, lint-gated format, and combined citation + exam-fit review. See `.claude/skills/research-cissp-concept/SKILL.md` for the full workflow.

## Conventions when editing demo content

The conventions live inside `decks/cissp/knowledge-map.md`. Read it before editing Concept files. Key points:

- **Hierarchy:** Deck → Topic → Concept → Fact.
- **Atomicity:** each `<br>`-separated item in a cell is one Fact. No "and"-joined compounds, no comma-joined lists.
- **Pattern picker:** Concept files declare a Pattern (Dimensions, Ordered, or Aspects). Pattern is an authoring/presentation choice, not a commitment to how data must be stored.
- **File naming:** kebab-case, short (`cia-triad.md`).

## What this repo deliberately does not contain

- Application code.
- A commitment-laden strategy document. (A landscape / tradeoffs doc at `docs/landscape.md` is in scope — background thinking, no roadmap, no commitments.)
- A roadmap.
- User stories.
- A question-design framework.
- Architectural commitments (database schema, framework choices, route layouts, storage shape).

If you find yourself wanting to write any of the above, surface the desire to the user first. The minimal-repo posture is intentional — the team is realigning before committing things to writing.
