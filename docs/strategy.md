# NuQuiz Strategy

> Living document. Last synthesis: 2026-04-18.
> Captures founder bets and team briefings as the project moves from solo build to startup.

---

## Vision

NuQuiz is a **deterministic certification study platform** that generates questions programmatically from author-curated knowledge tables — atomic facts arranged in rows (comparable items) and columns (comparison dimensions). Unlike LLM-based study tools, every question is provably correct by construction and traces to the exact facts it tests. This enables per-fact diagnostics ("you missed *this specific fact*"), not just aggregate scores. The first product is a premium CISSP study app, with a ladder into other security certifications.

---

## Core Invariants (Non-Negotiable)

If we violate these, we are building something else. Separated by role so the team understands what we promise users versus how we deliver it — the mechanism can evolve, the promise cannot.

### Promise (what we sell)

1. **Correctness by construction.** Every question is provably correct. No LLM output is trusted in the student-facing runtime.
2. **Full traceability.** Every prompt, correct answer, and distractor maps back to specific source fact(s). This is the diagnostic moat.
3. **Per-fact diagnostics.** Progress and gaps are tracked at the atomic fact level, not the topic level. "You missed X" is the unit of truth.

### Mechanism (how we deliver — currently, but evolvable)

4. **Atomic tabular data.** Knowledge is stored in tables: rows are comparable items, columns are comparison dimensions, cells hold atomic facts. The load-bearing property is *atomicity* — one fact per addressable unit. (Internally cells can be serialized as Subject-Predicate-Object triples; that's a storage shape, not a vision point. Authors and the engine work in tables.)
5. **Programmatic generation from data.** Questions are operations on the table, not authored content and not LLM-generated at runtime. Hide a row label, a column header, or a cell value to produce a question; pull distractors from other cells in the same column. This is what makes both correctness-by-construction and per-fact diagnostics possible.

### Posture (how we treat the user)

6. **Respect the user.** Professional adults. No loss-aversion streak nagging, no cartoon pressure, no gamification that mistrusts user agency.

---

## Scope — What NuQuiz Teaches

NuQuiz generates questions from any knowledge that fits a table — atomic cells organized into rows and columns. The **column pattern** is flexible, which widens the engine well beyond simple compare-and-contrast:

| Pattern | Layout | Content it fits | Question types unlocked |
|---|---|---|---|
| **Dimensions** | Rows = entities, columns = attributes | Comparable entities (TCP/UDP/SCTP, drug classes, threat types) | Compare-and-contrast, shared vs. discriminating |
| **Ordered** | Rows = steps in sequence, columns = step attributes (left → right increasing detail) | Sequential or hierarchical processes (handshakes, BCP phases, IR steps) | Sequence recall, step-attribute recall, cross-procedure comparison |
| **Aspects** | One row, columns = facets | Single concept with multiple facets (definition, purpose, example, exception) | Definition recall, exception-finding |

Authors pick the Predicate style that fits the content — usually via Builder UI templates ("Compare-contrast table", "Procedural with depth", "Procedural with positions", "Concept with aspects"). The engine doesn't care which style was chosen; it operates on the table.

### What still resists the engine

Narrative or causal knowledge where the *relationships between facts* are the thing being tested ("TLS replaced SSL *because* POODLE exposed weaknesses") requires first-class fact-to-fact relations — currently metadata only, deferred. For CISSP and NCLEX this is a rounding error; most causal content decomposes into fact-pairs where knowing both is sufficient.

### Positioning statement

> NuQuiz teaches any knowledge that fits a table: compare-and-contrast, sequential, hierarchical, multi-level. If you can organize it into rows and columns with atomic cells, we generate every possible question from it — deterministically, traceably, and diagnostically.

This is the engine's natural scope. Scope claimed honestly is a positioning asset: narrow enough to execute, wide enough to cover 95%+ of certification content.

---

## Resolved Bets

### 1. LLM stance
Deterministic engine in production. LLMs allowed **only** in authoring tooling (prose → triple extraction, candidate distractors, phrasing drafts) with human review before data enters the system. No AI required to use the app.

### 2. Market & vertical
- **Beachhead:** CISSP — premium buyer, iOS-heavy, corporate reimbursement, founder has domain.
- **Ladder:** Security certifications (CCSP, CISM, CISA, Security+, CySA+, OSCP). Same buyer, same platform, same pitch.
- **Later:** NCLEX (founder has domain) and broader certification market after the security playbook is proven.

### 3. Business model
- **Distribution:** Apple App Store — native iOS / iPad / Mac app per exam.
- **Pricing:** One-time purchase (starting point $49.99), optional Pro IAP unlock (starting point $29.99) for advanced features. No subscription.
- **Free tier:** Web demo with a partial deck for discovery and marketing.
- **B2B / institutional:** Deferred to v2+. Take inbound only.

### 4. Architecture posture
- Deterministic engine stays server-side for v1 (matches current Hono/SQLite implementation). Hybrid generation (server-generated batches, offline client playback, progress sync) is the v2 end state for native mobile.
- Backend is the single source of truth. Multiple clients (web demo + native apps) consume one API. Not a strict BFF — one well-designed API until real client divergence warrants splitting.
- Accounts required (Sign in with Apple primary; OAuth on web) for cross-device progress sync.

### 5. Content strategy
- **v1 author:** Founder. No contractors needed for CISSP.
- **Pipeline:** AI-assisted extraction from legal sources (vendor-published exam outlines, open educational resources, founder-written prose, public domain) → founder review → validated triples.
- **Legal posture:** Never reproduce exam questions. Facts are not copyrightable; selection and arrangement can be. Avoid AI extraction from copyrighted textbooks as the primary source.
- **Content bar for CISSP v1:** ~5,000 quality triples across 8 domains. Below this, users churn and the app dies.

### 6. Engagement philosophy
Drop absolute streaks. Use a three-layer motivation stack:

1. **Exam Readiness** — simulated pass-probability score (primary metric)
2. **Weekly Rhythm** — e.g., "4 of 5 days this week" target, self-healing Sundays
3. **Mastery Growth** — domain radar chart, weak-area reduction over time

All gain-framed. Notifications are respectful ("2 more days to your weekly goal"), never threatening ("don't lose your streak").

### 7. Positioning
"The professional's study tool," not "Duolingo for cert prep." Serious, respectful, diagnostic. The UI and tone decision is load-bearing — CISSP candidates judge this in the first 30 seconds.

---

## Open Questions (team input welcome)

| Area | Question | Lean |
|---|---|---|
| Pricing specifics | $49.99 one-time + $29.99 Pro IAP — right structure? | Yes for v1; revisit after 100 sales |
| Free tier scope | How much of the content is free? Full Domain 1, or sampling across all 8? | Full Domain 1 (feels complete, earns trust) |
| Auth model | Sign in with Apple only, or also email/OAuth? | Sign in with Apple on iOS; Google/email on web |
| Builder UI timing | Build before bulk CISSP content, or in parallel? | **Before.** Promoted to Phase 2.5. Authoring speed gates content scale. |
| SM-2 vs FSRS | Which spaced-repetition algorithm? | FSRS — SM-2 is 1985, FSRS measurably better; no reason to use legacy |
| Hierarchy depth | Keep Deck > Topic > Concept > Triple? | Keep for now. Concept as comparison boundary is load-bearing. |
| Session expiry | In-memory quiz sessions — persist? TTL? | TTL + Redis/SQLite persistence before launch. In-memory is a dev-only shortcut. |
| Web demo permanence | Full product later, or always a trial surface? | Trial surface only. Don't split focus. |

---

## 90-Day Plan (High-Level)

| Weeks | Focus |
|---|---|
| 1-2 | Team onboarding. This doc reviewed + amended. Phase 3 stories written. |
| 2-6 | Phase 3 engine work: FSRS, mastery rollup, review queue, readiness score |
| 4-8 | Builder UI (Phase 2.5) — authoring tool for founder-driven content work |
| 6-12 | CISSP content authoring (founder, AI-assisted, reviewed). Target: 5,000 triples. |
| 10-14 | iOS client scaffold (SwiftUI, talks to existing API) |
| 14+ | Closed beta — 30 CISSP candidates from founder's network |

Dates are ranges because content and client work run partially in parallel. Founder owns content timeline; team owns engine + Builder UI + iOS timelines.

---

## Founder Bets vs. Team Input

**Founder-owned (decided, expensive to change):**
- Vision, core invariants, market/vertical, business shape, engagement philosophy, positioning, brand tone.

**Team-owned with founder sign-off:**
- Technical architecture details (engine partitioning, session strategy, auth specifics)
- UX patterns and question flow
- Builder UI design
- Specific library/framework choices
- Release engineering and App Store submission

**Explicitly deferred — do not commit without founder decision:**
- Android, Windows platform expansion
- B2B / institutional sales motion
- NCLEX v2 launch
- Any LLM inference in the student-facing runtime (even "optional")

---

## Definition of "v1 Ships"

- iOS app live on the App Store for CISSP
- ≥5,000 validated triples across 8 CBK domains
- Readiness score, domain mastery radar, weekly rhythm goal, weak-area drilling all functional
- Deterministic question generation validated in closed beta (30 users)
- Week-1 retention ≥50%, week-4 retention ≥30% in beta (revisit after signal)
- Free web demo of Domain 1 live
- No LLM in the student-facing runtime
