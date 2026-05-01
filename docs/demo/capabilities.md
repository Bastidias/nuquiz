# What This Engine Can Do — Capabilities Tour

> A walking tour of what becomes possible when knowledge is stored as atomic CellFacts in well-formed tables, every CellFact has a stable identity, and every wrong answer the student picks is a real CellFact from elsewhere in the dataset. Each capability below is paired with a worked example using actual demo content from `decks/cissp/`. Engine vocabulary (`Concept`, `TableName`, `Pattern`, `RowHeader`, `ColumnHeader`, `Cell`, `CellFact`) is defined in `docs/glossary.md`.

## Status (2026-04-30) — v1 scope

- **§§1–6, §8 in v1 scope. §7 (pedagogical moves) out of v1. §9 (author-side flex) is v2** — authoring tooling lands after the quiz surface (`pre-team-discussion.md` Decisions).
- **Adaptivity (§4):** student response history is **on.** Adaptive distractors, confusion-pair tracking (§5), and history-dependent modes (Spaced / Cram / Random Walk in §8) all enabled.
- **Question shapes (§§1, 2, 6):** all in scope. Build priority: **MC → SATA → Ordering → T/F → Comparison.** "Comparison" = MC/SATA variation on *shared* / *not-in* queries (e.g., "Which protocols share `Reliable`?"). Structural reasoning (§6 — outlier / missing-Row / equivalence) in scope; ranking relative to the above TBD.
- **Modes (§8):** all six on the table; lead modes will be tuned during build.
- **Misconception feedback (§5):** deterministic only — coordinate grammar, no LLM-written prose. All four variants in: trace, confusion-pair count + paired re-test, confusion graph shown to student, phantom-fact flag.
- **Distractor pool (§3):** **same-Column other Rows only.** Cross-Column "clearly not a device" distractors are out. Difficulty is modulated by student response history (favor previously-confused CellFacts to dial up, less-confused Rows to dial down). Near-string distractors **out** of v1.
- **Pedagogical moves (§7): OUT of v1.** No progressive hints, no confidence elicitation, no easier-version-on-failure, no hot-streak suspend.
- **Still open:** ranking of structural reasoning (§6) within the build priority list.

## The substrate (read this first)

Three properties carry everything that follows:

1. **Atomicity.** Each cell value is one independently addressable CellFact. No "and"-joined compounds. (`decks/cissp/knowledge-map.md` § Atomicity Rules.)
2. **Traceability.** Every question's prompt, correct answer, and distractor maps back to specific CellFact IDs.
3. **Per-CellFact response history.** We know which CellFacts each student saw, got right, got wrong, and *which CellFact they confused it with*.

**Deterministic naming, no LLMs.** Every prompt is a coordinate (`Row | Column → ?` style). Every answer option is literal cell text — never paraphrased. The engine joins, splits, and selects CellFacts; it never *writes*. This is the correctness-by-construction invariant. Examples in this doc use that exact notation.

---

## 1. Chunking — one fact per option, or many

The same cell of data can yield two very different question shapes, just by changing how CellFacts are bundled into answer options.

**Demo source:** `decks/cissp/01-security-and-risk-management/bcp-phases.md`, Phase 5 (Develop ISCP) → Key Activity cell holds three CellFacts: `Document procedures`, `Document roles`, `Document responsibilities`.

**Shape A — one CellFact per option (Select All):**
> `Phase 5 | Key Activity → ?`
> - ☑ Document procedures
> - ☑ Document roles
> - ☑ Document responsibilities
> - ☐ Determine controls that reduce disruption *(Phase 3, distractor)*
> - ☐ Schedule plan reviews *(Phase 7, distractor)*

**Shape B — chunked into a single MC option:**
> `Phase 5 | Key Activity → ?`
> - a) Document procedures, Document roles, Document responsibilities ✓
> - b) Document procedures, Determine controls, Document responsibilities ✗ *(one CellFact swapped from Phase 3)*
> - c) Document procedures, Document roles, Schedule plan reviews ✗ *(one CellFact swapped from Phase 7)*
> - d) Identify critical systems, Define roles, Document responsibilities ✗ *(two CellFacts swapped — Phase 2 and Phase 1)*

The chunk size is a dial. N=1 gives Select All. N=cell-size gives composite MC. Anything in between is a "select N of M" variant. Same data, a sliding scale of difficulty — the engine picks the dial position based on what the student has already mastered.

---

## 2. Ordering — and the dimensions that come with it

Ordered Concepts (rows = steps in sequence) unlock question types that don't exist for Dimensions tables.

**Demo source:** `decks/cissp/04-communication-and-network-security/tls-handshake.md`, 5 ordered steps.

**Variant A — sequence recall:**
> Order the following by Step number:
> - Change Cipher Spec
> - Client Hello
> - Finished
> - Key Exchange
> - Server Hello + Certificate
> *Correct order: Client Hello, Server Hello + Certificate, Key Exchange, Change Cipher Spec, Finished*

**Variant B — adjacency:**
> Anchor: `Step n | Name → Change Cipher Spec`. Prompt: `Step (n+1) | Name → ?`
> - a) Finished ✓
> - b) Key Exchange *(previous Step — direction error)*
> - c) Server Hello + Certificate *(further-previous Step)*

**Variant C — partial order (bin partition):**
> Pivot: `Step n | Name → Key Exchange`. Bin each Step by step number relative to `n`.
> - Client Hello → `step < n`
> - Server Hello + Certificate → `step < n`
> - Change Cipher Spec → `step > n`
> - Finished → `step > n`

**Variant D — cross-procedure ordering.** Two Ordered Concepts compared (TCP handshake vs TLS handshake) — which TLS Step coincides with which TCP Step. Generated as paired coordinates: `tls:Step n | step ↔ tcp:Step m | step`. No prose.

The engine's notion of order is just the integer in the first column. Every ordered question type is built on that one CellFact.

---

## 3. Distractor mining — way past "same column"

Default distractor source is "same Column, different Row" (most plausible, hardest to eliminate). But the engine has more levers:

**Demo source:** `decks/cissp/04-communication-and-network-security/osi-layers.md`, Layer 3 (Network) → key devices: `Routers`, `Layer 3 switches`.

| Distractor type | Picks for a `Network | key devices` question | Difficulty |
|---|---|---|
| Cross-Column, same Row | `IPv4`, `Packet`, `Routing packets between networks` | Easy (clearly not a device) |
| Same-Column, adjacent Row | `Switches`, `Bridges` (Layer 2), `Hubs`, `Repeaters` (Layer 1) | Hard (real devices, wrong layer) |
| Same-Column, far Row | `End-host software` (Layer 7) | Medium |
| Near-string distractors | `Layer 3 switches` vs `Switches` (Layer 2) — one word apart | Hardest |

The engine can pick from any of these pools. Difficulty is tunable per student, per question, without authoring more content.

---

## 4. Adaptive distractors — use the student's own confusion

This is the one only possible because every wrong answer is itself a CellFact with an ID.

**Demo source:** `decks/cissp/04-communication-and-network-security/tcp-udp-sctp.md`. Student previously answered `TCP | ordering → ?` and picked `Unordered` — UDP's Value, CellFact ID `tcp-udp-sctp:UDP:ordering`.

**Next encounter:** the engine generates `TCP | ordering → ?` again, and *guarantees* `Unordered` is in the option set. Plus `Partially ordered` (SCTP's Value — the third Row in the same Column, which they haven't yet been tested on). The student is forced to actually distinguish among three real Values, not pattern-match. *(Note: this only works on Columns where the Rows have distinct Values. On a Column like `reliability` where TCP and SCTP both = `Reliable`, the engine knows that's a shared Value — see Section 6 — and won't generate it as a distractor against TCP.)*

**Cohort variant:** if the student is a new user with no history, the engine substitutes "CellFacts most commonly chosen as distractors by other students for this prompt" — crowd-sourced difficulty calibration.

**Inverse-difficulty variant:** the student has correctly answered 2 of the 3 CellFacts in `Phase 5 | Key Activity` across past sessions (`Document procedures` ✓, `Document roles` ✓) but never `Document responsibilities`. The engine generates a fill-in for `Phase 5 | Key Activity → ?` and *only accepts* `Document responsibilities` — the gap CellFact. Cell-completion mode targets the missing CellFact directly.

---

## 5. Misconception surfacing — "you missed *this specific* CellFact"

Wrong-answer feedback isn't a generic "incorrect." It's a trace.

**Demo source:** `decks/cissp/04-communication-and-network-security/osi-layers.md`. Student answers `Network | PDU → ?` and picks `Frame`.

**Engine response:**
> ✗ Incorrect.
> Picked: `Frame`
> Real CellFact: `Frame` belongs to `Data Link | PDU`, not `Network | PDU`.
> Correct CellFact: `Network | PDU → Packet`.
>
> ⚠ Confusion pair: `Frame ↔ Packet`. Swap count: 3. Adding both CellFacts to review queue, paired.

The "3" count is per-CellFact response history at work. The pairing in the review queue is misconception-aware spaced repetition — those two specific CellFacts will be co-tested until the student stops swapping them. The feedback uses the same coordinate grammar as the prompts (`Row | Column → Value`) — no English description of the data is ever generated.

**Confusion graph (per student):**
```
Frame ↔ Packet           (3 swaps)
Switches ↔ Routers       (2 swaps)
SYN-ACK ↔ ACK            (2 swaps)
```
The graph is itself diagnostic content — show it to the student as "confusion pairs" and they can self-audit.

**Phantom-fact detection:** if the student's most-picked wrong answers include strings that don't exist in *any* CellFact in the dataset (their brain invented them), the engine flags it. That's a different failure mode from confusion — it's "no model at all," and the move is to drop back to easier scaffolding, not to drill.

---

## 6. Structural reasoning — questions about the table itself

Atomic, addressable CellFacts mean we can ask questions about the table's *shape*, not just its contents.

**Demo source:** `decks/cissp/04-communication-and-network-security/osi-layers.md`.

**Variant A — find the outlier:**
> Pick the CellFact from a different Column than the others. (UI: "Outlier mode.")
> - a) IPv4 *(`Network | key protocols`)*
> - b) IPsec *(`Network | key protocols`)*
> - c) ICMP *(`Network | key protocols`)*
> - d) Routers *(`Network | key devices`)* ← outlier
>
> *Engine pulls 3 CellFacts from one Column + 1 CellFact from a different Column (same Row). Student identifies the cross-Column one. Tests Column literacy.*

**Variant B — identify the missing Row:**
> Identify the missing Row. (UI: "Row inference mode.")
>
> | ?? | 1 | Bit | Ethernet physical spec, Bluetooth physical, USB | Hubs, Repeaters, Cables, NICs |
>
> Equivalent coordinate set: `?? | layer number → 1`, `?? | PDU → Bit`, `?? | key protocols → Ethernet physical spec, ...`, `?? | key devices → Hubs, ...`
> *Correct: Physical.*
> *(Engine hides the Row label; reveals the rest of the Row. Student infers from the table's structure.)*

**Variant C — same CellFact, different prompt shape:**
> Equivalence check (UI: "Are these the same CellFact?"):
> Q1: `Data Link | PDU → ?` (correct: Frame)
> Q2: `? | PDU → Frame` (correct: Data Link)
> Q3: `Frame ∈ ? | PDU` (correct: Data Link)
>
> *All three resolve to the same CellFact `(osi-layers, Data Link, PDU, Frame)`. Tests whether the student grasps the CellFact, not the prompt shape.*

---

## 7. Pedagogical moves — only possible with traced CellFacts

**Progressive hints.** Stuck on `? | key devices → Switches`? Hint reveals one cell from the answer Row at a time:
- Hint 1: `? | PDU → Frame` *(narrows from 7 Rows to 1 — Data Link.)*
- Hint 2: `? | layer number → 2` *(would also narrow to 1, but unnecessary after Hint 1.)*

Each hint is itself a coordinate CellFact pulled from the answer Row. No English description, no LLM. Costs a hint point.

**Confidence elicitation.** Before grading, ask "how confident?" 1-5. Confidently wrong (rated 5, answer wrong) goes to the top of the review queue with extra weight. Tentatively right (rated 1, answer right) gets re-tested soon — they got lucky.

**Easier-version-on-failure.** Miss `Network | key devices → ?` with all-Column distractors? Engine retries the *same CellFact* with cross-Column distractors (easier pool). Then once the student gets it, ramps back up. Today's wrong becomes tomorrow's easy correct.

**Hot streak surrender.** Student has nailed `Physical | PDU → Bit` five different ways (MC, fill-in, T/F, hide row, hide column). Engine suspends the CellFact from active rotation. Spaced repetition reintroduces it weeks later — long enough to test retention, short enough that a real loss is recoverable.

---

## 8. Modes — same engine, different shape of session

| Mode | What the engine does |
|------|----------------------|
| **Drill** | One Concept, all its CellFacts, every axis/format combination. Used when the student is targeting a specific area. |
| **Boss** | Composite questions across the row profile, hardest difficulty (`thing | ? → ?` over a full row). One Concept, but only the top of the difficulty ladder. |
| **Spaced** | The daily review queue. Due CellFacts (re-test scheduled) interleaved with new CellFacts (never seen). |
| **Mock Exam** | Domain-weighted random sampling matching the official exam format (CISSP: 100-150 questions, weighted across 8 domains). |
| **Random Walk** | Engine picks the next question based on what would be most diagnostic *right now* — CellFacts with the largest uncertainty in the model. |
| **Cram** | Every CellFact the student has ever missed, ordered by recency × failure count. The night-before-the-exam mode. |

Modes are configuration over the same generator — the engine doesn't have separate code paths per mode, just different CellFact-selection policies.

---

## 9. Authoring-side flex (what authors see)

Atomic + traceable doesn't just help students. It gives authors live feedback as they write.

- **"This Concept can generate N distinct questions."** Live counter as you author. A 3-row × 4-column Dimensions Concept with single-CellFact cells: ~36 distinct questions. Add multi-CellFact cells, you're well into the hundreds. Authors immediately know if a Concept is too thin.

- **Distractor coverage report.** "Every CellFact in this Concept has been used as a distractor at least M times across the dataset." Identifies dead CellFacts that nothing tests *against*.

- **Atomicity linter.** Author types `Define scope, roles, and resources` into a cell? Engine flags before save: "Comma-list / 'and'-joined CellFacts detected. Split into 3 with `<br>`?" Must be enforced at author time — expensive to re-atomize later.

- **Parenthetical safety check.** Author types `Reliable (retransmission of lost segments)` into TCP's `reliability` cell, but SCTP's `reliability` already says `Reliable`? Engine flags: "Stripping the parenthetical exposes a shared Value with SCTP's Row. The engine cannot detect this sharing as written. Move `(retransmission of lost segments)` to Notes or split into a new Column." This is the linter that would have caught the original `tcp-udp-sctp.md` bug.

- **Sharing analysis.** Engine shows per-Column the shared/discriminating spectrum (see `knowledge-map.md`). Author sees instantly that `OSI layer` for TCP/UDP/SCTP is fully shared (`Transport`), and that `reliability` after the parenthetical fix is shared between TCP and SCTP — useful information for distractor planning and for spotting accidental sharing.

---

## What's deliberately not in this list

LLM-generated phrasing for questions or distractors. Scenario-style prompts written in natural language. Anything where the engine "decides what to say." Every prompt and option in this doc was constructible mechanically from cell data plus a small grammar of join operators (`|`, `,`, `→`, `?`). That's the whole point — the moment we let an LLM write the question text, we lose correctness-by-construction.
