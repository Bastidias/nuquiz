# Sample Quiz — Demo Walkthrough

> A 12-screen walk-through to show the team what comes out of the engine. Every prompt is a deterministic coordinate (`Row | Column → ?`); every option is literal cell text from `docs/cissp/`. No LLM in the loop. Worked content sources cited per question.

The sequence is deliberately varied so the team sees the range. Watch for the **Diagnostic Moment** screens between questions — those are the differentiator.

---

## Q1 — Hide Value (MC, easy distractors)

**Source:** `tcp-udp-sctp.md`

> `TCP | reliability → ?`
> - a) Reliable ✓
> - b) Unreliable *(UDP's Value — same Column, different Row)*
> - c) Partially ordered *(value from `ordering` Column — different Column entirely)*
> - d) Connection-oriented *(value from `connection type` Column)*

**What's shown:** Standard MC. The correct answer is the literal cell text — `Reliable` — exactly what's in the table. The earlier table draft had `Reliable (retransmission of lost segments)` here; that parenthetical hid the fact that TCP and SCTP share this Value. It's been split out (see `tcp-udp-sctp.md` Notes).

---

## Q2 — Shared-Value Reveal (Select All)

**Source:** `tcp-udp-sctp.md`

> `? | reliability → Reliable` (select all that apply)
> - ☑ TCP
> - ☐ UDP
> - ☑ SCTP

**What's shown:** This question only exists because the table now exposes that TCP and SCTP share the Value `Reliable`. With the earlier draft (TCP cell = `Reliable (retransmission of lost segments)`, SCTP cell = `Reliable`), the engine couldn't see the sharing — `Reliable (retransmission of lost segments)` and `Reliable` are different strings. Stripping the parenthetical and moving "retransmission of lost segments" to a separate context (see Notes in `tcp-udp-sctp.md`) makes cross-Row shared-Value questions like this one possible.

*This is the single most concrete demonstration of why the parenthetical rule matters: a whole class of questions appears or disappears depending on whether shared Values are exposed.*

---

## Q3 — Hide Row (MC)

**Source:** `osi-layers.md`

> `? | layer number → 4`
> - a) Network
> - b) Transport ✓
> - c) Session
> - d) Data Link

**What's shown:** Hide-Row tests the inverse direction — given a value, name the entity. Distractors are adjacent rows on the layer-number axis.

---

## Q4 — Cell Recall (Select All, one Fact per option)

**Source:** `bcp-phases.md`, Phase 5

> `Phase 5 | Key Activity → ?` *(select all that apply)*
> - ☑ Document procedures
> - ☑ Document roles
> - ☑ Document responsibilities
> - ☐ Define planning scope *(Phase 1, distractor)*
> - ☐ Determine controls that reduce disruption *(Phase 3, distractor)*

**What's shown:** Multi-Fact cell, atomized. Missing one of the three correct items reveals a *specific* gap (e.g., "knows two activities of Phase 5, missed Document responsibilities"). Compound storage would lose this signal.

---

## Q5 — Same Cell, Composite MC (chunked answer)

**Source:** `bcp-phases.md`, Phase 5

> `Phase 5 | Key Activity → ?`
> - a) Document procedures, Document roles, Document responsibilities ✓
> - b) Document procedures, Determine controls, Document responsibilities ✗
> - c) Document procedures, Document roles, Schedule plan reviews ✗
> - d) Identify critical systems, Define roles, Document responsibilities ✗

**What's shown:** Same Facts as Q4, packed into bundled MC options. Each distractor swaps exactly one Fact with a Fact from elsewhere in the table. Hard because the student must verify *every* item in the option.

*Q4 and Q5 are the same data — different chunking. The engine picks the chunk size based on the student's mastery of the cell.*

---

## Q6 — Sequence Recall (Ordered Concept)

**Source:** `tls-handshake.md`

> Order these by Step number:
> - Change Cipher Spec
> - Client Hello
> - Finished
> - Key Exchange
> - Server Hello + Certificate
>
> *Correct order: Client Hello → Server Hello + Certificate → Key Exchange → Change Cipher Spec → Finished*

**What's shown:** Only Ordered tables can produce this. The "step" Column carries the order; the engine just shuffles the row labels and asks for the original sequence.

---

## Q7 — Adjacency (Hide Value, sequence-derived)

**Source:** `tcp-handshake.md`

> Anchor: `Step 2 | Name → SYN-ACK`
> Prompt: `Step 3 | Name → ?`
> - a) ACK ✓
> - b) FIN
> - c) SYN
> - d) RST

**What's shown:** Composes "Hide Value" with sequence math. The anchor binds the student to a specific Step, then the question asks for the adjacent Step's `Name`. (a) is correct; (b) and (d) are real TCP flags from related Concepts (could come from `tcp-teardown.md` once it exists); (c) is the *previous* Step's `Name` — a near-miss for students who lose track of direction.

---

## Q8 — Discrimination (Cross-Row, Select All)

**Source:** `tcp-udp-sctp.md`

> `? | flow control → Yes` (select all that apply)
> - ☑ TCP
> - ☐ UDP
> - ☑ SCTP

**What's shown:** Cross-Row scope, single Column. Atomized Values per Row mean the engine can compute "which Rows have this Value" at query time. The options *are* the Rows themselves — pulled deterministically, no English. This is a second instance of shared-Value detection (the first was Q2). The fact that TCP and SCTP both share `Yes` here only became visible after the parenthetical fix that stripped `(sliding window)` out of TCP's cell.

---

## Q9 — Misattribution True/False

**Source:** `osi-layers.md`

> `Transport | key devices → Routers` — True or False?
> *Correct: False. Real Fact: `Network | key devices → Routers`.*

**What's shown:** Engine constructs the false statement by taking a real Fact (`Network | key devices → Routers`) and pinning it to the wrong Row. No fabrication; just data displaced.

---

## ⚡ Diagnostic Moment 1 — After Q9

The student picked **True** for Q9.

> ✗ Incorrect.
> Picked: `True`
> Real Fact: `Routers` belongs to `Network | key devices`, not `Transport | key devices`.
> Correct Fact: `Transport | key devices → Stateful firewalls, Load balancers`.
>
> ⚠ Confusion pair: `Routers ↔ Stateful firewalls`. Swap count: 2. Adding both Facts to review queue, paired.

**What's shown:** Per-Fact response history at work. The "2nd time" count is real. The pairing of the two Facts in the queue is misconception-aware scheduling — only possible because each Fact has a stable ID and every wrong answer is itself a Fact with an ID. The feedback text uses the same coordinate grammar as the prompts (`Row | Column → Value`) — no English description of the data is generated.

---

## Q10 — Adaptive Distractor (using student's prior mistake)

**Source:** `osi-layers.md`. Student previously confused `Switches` with `Routers` (per Diagnostic Moment 1 and an earlier session).

> `Network | key devices → ?`
> - a) Switches *(student's prior wrong answer for this prompt — guaranteed in the option set)*
> - b) Routers ✓
> - c) Hubs
> - d) Stateful firewalls *(another Fact they've previously misplaced)*

**What's shown:** The engine guarantees the student's past wrong answer appears as an option. They cannot pattern-match — they must actually distinguish. This is the loop closing: their own mistake becomes the test.

---

## Q11 — Predict the Row (Structural Reasoning)

**Source:** `osi-layers.md`

> Identify the missing Row.
>
> | ?? | layer number | PDU | key protocols | key devices |
> |---|---|---|---|---|
> | ?? | 2 | Frame | Ethernet, PPP, ARP, L2TP | Switches, Bridges |
>
> Equivalent coordinate set (same question, expanded form): `?? | layer number → 2`, `?? | PDU → Frame`, `?? | key protocols → Ethernet, PPP, ARP, L2TP`, `?? | key devices → Switches, Bridges`.
>
> - a) Physical
> - b) Data Link ✓
> - c) Network
> - d) Session

**What's shown:** Hide-Row, but with the *whole row* visible (instead of just one Column + Value). Tests whether the student understands the table's structure, not just one cell.

---

## Q12 — Composite (Row Profile MC, multi-cell verification)

**Source:** `tcp-udp-sctp.md`, the TCP Row.

> Prompt: `TCP | * → ?` (Row profile across all Columns; select the option that matches every cell)
> - a) connection type: **Connection-oriented**, handshake style: **3-way handshake**, reliability: **Reliable**, ordering: **Ordered**, flow control: **Yes**, congestion control: **Yes**, max header size: **20 bytes** ✗
> - b) connection type: **Connection-oriented**, handshake style: **3-way handshake**, reliability: **Reliable**, ordering: **Ordered**, flow control: **Yes**, congestion control: **Yes**, max header size: **60 bytes** ✓
> - c) connection type: **Connectionless**, handshake style: **3-way handshake**, reliability: **Reliable**, ordering: **Ordered**, flow control: **Yes**, congestion control: **Yes**, max header size: **60 bytes** ✗
> - d) connection type: **Connection-oriented**, handshake style: **4-way handshake**, reliability: **Reliable**, ordering: **Partially ordered**, flow control: **Yes**, congestion control: **Yes**, max header size: **60 bytes** ✗

**What's shown:** Composite MC across the full Row profile. (a) swaps `max header size` to TCP's *minimum* (sneaky, same Row, wrong cell). (c) swaps `connection type` to UDP's value. (d) swaps `handshake style` and `ordering` to SCTP's values. Each option is *mostly right* — the student must verify every cell.

Notice what's NOT a distractor here: `Reliable`, `Yes` (flow control), and `Yes` (congestion control) appear in every option as TCP's correct values, and they're also SCTP's correct values. The engine knows these are shared and won't generate them as distractors against TCP — there'd be no signal. This too is downstream of the parenthetical fix: pre-fix, TCP's `Reliable (retransmission...)` and SCTP's `Reliable` were treated as different strings, and the engine would happily generate a useless "swap" between them.

---

## ⚡ Diagnostic Moment 2 — End of Session

> **Session summary**
>
> | Concept | Mastered Facts | Struggling Facts | Confusion Pairs |
> |---|---|---|---|
> | TCP/UDP/SCTP | 9 / 11 cells | `TCP \| max header size`, `SCTP \| ordering` | — |
> | OSI Layers | 4 / 7 Rows fully mastered | `Network \| key devices`, `Transport \| key devices` | `Routers ↔ Switches` *(3 swaps)*, `Routers ↔ Stateful firewalls` *(2 swaps)* |
> | TLS Handshake | sequence: 5/5 ✓ | — | — |
> | BCP Phases | `Phase 5 \| Key Activity`: 2 of 3 Facts (missing `Document responsibilities`) | — | — |
>
> **Next session queue:** `Routers ↔ Switches` (confusion-pair drill), `BCP Phase 5 \| Key Activity → Document responsibilities` (single-Fact targeted re-test), one fresh Concept from Domain 4.

**What's shown:** The diagnostic moat. Not a percentage. Specific Facts, specific confusions, a concrete next-session plan — all derived mechanically from per-Fact response history. Nothing here required an LLM. Nothing here required pre-authored remediation content. The data structure carries the diagnostic.

---

## Behind the Loop — Q9 → DM1 → state writes → Q10

The forward tour showed what the engine *produces*. This section inverts: take the Q9 → Q10 loop and trace every rendered element and every state write back to either a Fact ID, fixed app chrome, or a read/write against a student-state table. If the data model holds, nothing sits between those categories — no generated text, no paraphrase, no per-question authored remediation.

### Stage 1 — Q9 rendered

T/F is a hide-Value prompt where the Value shown is a real Fact from elsewhere in the table, pinned to the wrong Row. The engine reads one Fact, then picks a second coordinate where that Fact's text does *not* belong.

```
Transport | key devices → Routers — True or False?
```

| Element | Type | Origin |
|---|---|---|
| `Transport \| key devices` | Prompt coord | Target coord `(osi-layers, Transport, key_devices)` rendered via `{row} \| {column}` |
| `Routers` | Fact (literal cell text) | `osi-layers:Network:key_devices` — pulled as a *displaced* Value; real coord retained for grading |
| `→ Routers — True or False?` | Chrome template | T/F format: prepend `→ Value`, append `— True or False?` |

### Stage 2 — student submits `True`

Grading is a single equality check. There's no free text to parse, so no classifier in the loop.

```
picked         = True
target_values  = lookup(target = (osi-layers, Transport, key_devices))   // → {Stateful firewalls, Load balancers}
asserted_value = "Routers"                                               // from osi-layers:Network:key_devices
is_correct     = (asserted_value ∈ target_values) == picked              // False == True → WRONG
```

Three Fact IDs are now in scope for what comes next: the target coord, the displaced Fact (`Routers`), and the target's correct Facts (`Stateful firewalls`, `Load balancers`).

### Stage 3 — DM1 rendered

Every line is either fixed chrome or a template filled from the Fact IDs collected in Stage 2. Nothing in this screen is free prose about the data.

| Line | Type | Origin |
|---|---|---|
| `✗ Incorrect.` | Chrome | Fixed on wrong answers |
| `Picked: True` | Chrome echo | Student input |
| `Real Fact: Routers belongs to Network \| key devices, not Transport \| key devices.` | Template | `{displaced.text} belongs to {displaced.coord}, not {target.coord}` |
| `Correct Fact: Transport \| key devices → Stateful firewalls, Load balancers.` | Coord render | `{target.coord} → {values}` — literal cell text joined by `,` |
| `⚠ Confusion pair: Routers ↔ Stateful firewalls.` | Template | `{displaced.text} ↔ {first_correct.text}` |
| `Swap count: 2.` | Counter | Post-Stage-4 read of `confusion_graph[pair]` |
| `Adding both Facts to review queue, paired.` | Chrome | Fixed description of the queue write |

### Stage 4 — state writes

Submitting Q9 commits three writes. These are the *only* inputs that distinguish this student's future Q10 from a default one — no per-question remediation text is authored or stored anywhere.

```
response_history.append({
  coord:          (osi-layers, Transport, key_devices),
  picked:         True,
  displaced_fact: osi-layers:Network:key_devices,          // what the prompt asserted
  correct_facts:  {osi-layers:Transport:key_devices:*},
  result:         WRONG,
})

confusion_graph.increment(
  pair = (osi-layers:Network:key_devices,                  // Routers
          osi-layers:Transport:key_devices:Stateful_firewalls)   // first correct at target
)  // 1 → 2

review_queue.add_paired(
  osi-layers:Network:key_devices,
  osi-layers:Transport:key_devices:Stateful_firewalls,
)
```

### Stage 5 — Q10, the receipt

Q10 (`Network | key devices → ?`) arrives later in the session. Its option set is the closure of the loop: Stage-4 writes dictate which Facts get pinned.

```
Network | key devices → ?
( ) Switches
( ) Routers
( ) Hubs
( ) Stateful firewalls
```

| Option | Fact ID | Set by |
|---|---|---|
| `Switches` | `osi-layers:Data_Link:key_devices` | History policy — student's past wrong pick for this coord (earlier session) |
| `Routers` | `osi-layers:Network:key_devices` | Correct answer |
| `Hubs` | `osi-layers:Physical:key_devices` | Column filler — same Column, far Row, under-tested |
| `Stateful firewalls` | `osi-layers:Transport:key_devices` | **Confusion-graph policy — pinned because Stage 4 incremented `(Routers, Stateful firewalls)` to ≥ 2** |

The bolded row is the closure. Q9 → DM1 → state write → Q10-pin is a mechanical chain: if any link required generated text, per-question authored content, or a stored string that couldn't be resolved back to a Fact ID, the chain would break. That's what `pre-team-discussion.md §3` means by "the text is not the ID, position is not the ID" — the reverse trace is the test for whether the data shape is good enough.

---

## What this demo does NOT show (and why)

- **Scenario-framed questions in natural language.** Possible eventually, but every word would either be authored or LLM-generated — both violate the deterministic-naming invariant for v1. Coordinate prompts only.
- **"Why was your answer wrong?" prose.** Diagnostic moments use the structured `you picked X | X is the answer for Y | the correct answer is Z` template. Mechanical, not generated.
- **Hint generation.** Hint content is just "reveal one Column of the answer Row" — pulled from data, not written.

Every screen in this walkthrough was built from cell data + a fixed grammar of join operators. That's the bar.
