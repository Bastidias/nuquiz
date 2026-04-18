# NuQuiz — Working in This Repo

This repo is **demo content only**. App code, strategy, roadmap, stories, agent briefs, and the question-design framework were intentionally removed. There is no build, no tests, no implementation in this tree. Don't reintroduce architectural commitments without explicit user approval.

## What's here

```
docs/cissp/             — CISSP demo content authored against the current model
.claude/                — settings only (agents and commands removed)
```

## Conventions when editing demo content

The conventions live inside `docs/cissp/knowledge-map.md`. Read it before editing Concept files. Key points:

- **Hierarchy:** Deck → Topic → Concept → Fact.
- **Atomicity:** each `<br>`-separated item in a cell is one Fact. No "and"-joined compounds, no comma-joined lists.
- **Pattern picker:** Concept files declare a Pattern (Dimensions, Ordered, or Aspects). Pattern is an authoring/presentation choice, not a commitment to how data must be stored.
- **File naming:** kebab-case, short (`cia-triad.md`).

## What this repo deliberately does not contain

- Application code.
- A vision / strategy document.
- A roadmap.
- User stories.
- A question-design framework.
- Architectural commitments (database schema, framework choices, route layouts, storage shape).

If you find yourself wanting to write any of the above, surface the desire to the user first. The minimal-repo posture is intentional — the team is realigning before committing things to writing.
