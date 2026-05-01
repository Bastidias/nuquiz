---
name: decisions
description: Append one decision record as a standalone file in a `decisions/` folder, capturing what was decided, why, and the consequence. Project-level by default (`docs/decisions/`); per-skill if the decision is scoped to one skill (`.claude/skills/<name>/decisions/`). Use when the user says "record a decision", "log this", "ADR this", or after a meaningful design choice has been settled. Do NOT use for status updates, task tracking, or things derivable from `git log`.
---

# Record a Decision

A history-capture skill. One file per invocation. Adds a new file to a `decisions/` folder — no pin/supersede logic, no numbering, no ceremony beyond a date-prefixed filename.

Premise: planning is better than PLANS. The skill prompts you to articulate the reasoning so future-you (or future-Claude) can reconstruct the decision without re-reading the whole conversation.

## Foundational decisions baked in

| # | Decision | Choice |
|---|---|---|
| 1 | Scope per invocation | One file |
| 2 | Storage shape | One file per decision in a `decisions/` folder |
| 3 | Project-level path | `docs/decisions/` |
| 4 | Per-skill path | `.claude/skills/<skill-name>/decisions/` |
| 5 | File naming | `YYYY-MM-DD-kebab-case-title.md` (date prefix sorts chronologically) |
| 6 | Entry shape | Title heading + date line + Why + Consequence |

## Workflow

### Phase 1 — Scope

Ask if not obvious from context:

> Is this a **project-level** decision or scoped to a specific **skill**?

- Project-level → `docs/decisions/`
- Skill-level → `.claude/skills/<name>/decisions/`

Create the folder if it doesn't exist (just write the first file into it).

### Phase 2 — Capture

Walk the user through three fields. Don't accept thin answers — the point is to articulate reasoning that's hard to reconstruct from the code.

- **Title** — short noun phrase. Names the decision, not the outcome's mechanism. ("Wipe the GitHub remote and restart from minimal" not "force-push main".)
- **Why** — what motivated it. What alternatives were rejected. What problem it solves. If the user can only answer "it felt right," push back once: "what would have gone wrong otherwise?"
- **Consequence** — what this constrains going forward, or what it makes possible. Concrete: "lint must reject X", "future Concept files must Y", "we no longer support Z."

### Phase 3 — Write the file

Use today's date (UTC date is fine). Filename is `YYYY-MM-DD-<title-slug>.md` where the slug is the title lowercased, kebab-cased, and trimmed of filler words (no "the", "a", "and"). Keep slugs short — 3 to 6 words.

File contents:

```
# Title

**Date:** YYYY-MM-DD

**Why:** ...

**Consequence:** ...
```

Do not modify earlier files — the folder is append-only. If a decision is genuinely superseded later, write a new file referencing the prior filename in its **Why** section; do not edit or delete the old file.

Stop. Do not commit unless the user asks.

## Duplicate check

Before writing, list the existing files in the target folder. If a recent entry covers the same decision, do not write a duplicate — confirm with the user whether they want to refine the existing one (edit in place) or capture a distinct sub-decision (new file with a sharper title).

## What NOT to record

- Status updates, progress notes, "merged PR #42"
- Anything derivable from `git log`, `git blame`, or current code shape
- Decisions still in flux — those are conversation context, not history
- Routine choices ("named the file kebab-case") that follow an existing convention

## When in doubt

If the user is mid-thought and the decision feels half-formed, say so and offer to wait. A bad entry is worse than no entry — it pollutes the history with confident-sounding noise.
