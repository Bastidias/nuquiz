# NuQuiz

A deterministic certification study platform. First product: a premium CISSP study app.

> **This repo is the minimal team-onboarding tree.** Application code, strategy, roadmap, and stories were stripped so the team can align before re-committing things to writing. What remains is the **demo content** being authored against.

## What's here

```
docs/
  landscape.md                  — Background: engine scope, verticals, CISSP-vs-NCLEX tradeoffs, skews
  cissp/                        — Demo content: CISSP knowledge map + per-domain Concepts
    knowledge-map.md            — Top-level scaffold, atomicity rules, Pattern picker
    01-…-08-… /                 — One folder per CBK domain
  demo/                         — What the engine can do (for the team)
    capabilities.md             — Capabilities tour with inline worked examples
    sample-quiz.md              — 12-screen sample quiz storyboard
CLAUDE.md                       — Conventions for working in this repo
```

## Start here

- [`docs/landscape.md`](docs/landscape.md) — background on what the engine teaches, which verticals fit, and the CISSP-vs-NCLEX tradeoffs. Read if you want the strategic context first.
- [`docs/demo/sample-quiz.md`](docs/demo/sample-quiz.md) — 12-screen walk-through built from real demo content. Shows what makes the engine different.
- [`docs/demo/capabilities.md`](docs/demo/capabilities.md) — the longer tour: chunking, ordering, adaptive distractors, misconception surfacing, structural reasoning.
- [`decks/cissp/knowledge-map.md`](decks/cissp/knowledge-map.md) — how content is organized and the rules authors follow.
- [`decks/cissp/01-security-and-risk-management/README.md`](decks/cissp/01-security-and-risk-management/README.md) — most-developed domain so far.
- [`decks/cissp/04-communication-and-network-security/README.md`](decks/cissp/04-communication-and-network-security/README.md) — Concept examples covering all three Patterns.
