# Teacher: Question Design & Progressions

How a tutor thinks about questioning, mapped to operations on SPO data.

## Glossary

| Term | Definition |
|------|------------|
| **Triple** | The atomic unit of knowledge: `(Subject, Predicate, Object)`. One testable fact. |
| **Subject** | The entity being described (e.g., TCP, Hypoglycemia). |
| **Predicate** | The property or attribute (e.g., Reliability, Mental State). |
| **Object** | A single, atomic value. Never a compound like "Fatigue and Weakness" — that's two Objects, two triples. |
| **Cell** | All Objects for a given S-P pair. A cell contains one or more triples. |
| **Axis** | Which part of the triple is hidden — what the student must supply (S, P, or O). |
| **Scope** | How many triples a question involves: single, cell, paired, subject profile, or cross-subject. |
| **Format** | How the question is delivered: multiple choice, select all, true/false, matching, fill-in-the-blank. |
| **Scaffolding** | How much help the format gives. MC is high scaffolding (answer is visible). Fill-in-the-blank is none. |
| **Distractor** | A wrong answer sourced from real data — an Object from elsewhere in the dataset. |
| **Composite distractor** | An answer option mixing correct and incorrect triples. Mostly right, one or more facts swapped. |
| **Shared Object** | An Object that appears in the same Predicate for both Subjects (e.g., both conditions → Confusion). |
| **Discriminating Object** | An Object that appears for one Subject but not the other within the same Predicate. |

## Core Principle: One Fact, One Row

Every Object in a triple must be atomic — a single, indivisible fact. If a source says "Confusion and Irritability," that's two triples, not one. If a textbook lists "Fatigue, Weakness, Malaise," that's three rows.

This is non-negotiable because the entire question engine depends on it:

- **Distractors:** Each Object can independently serve as a wrong answer elsewhere. "Fatigue" pulled from one cell can be a plausible distractor in another. If it's bundled as "Fatigue and Weakness," you can't use it that way.
- **Partial knowledge:** A student who knows Fatigue but forgot Weakness has a specific, trackable gap. Compound values hide this — they're either fully right or fully wrong with no signal in between.
- **Composability:** Mix-and-match questions (composites) work by swapping individual Objects between cells. Atomic Objects give the system maximum flexibility to compose novel, plausible questions from the same data.
- **Diagnostics:** Performance tracking at the triple level means tracking each Object independently. "Student knows 3 of 4 Autonomic symptoms for Hypoglycemia" is actionable. "Student knows Autonomic symptoms" is not.

The rule: if you can test it separately, it's a separate row.

## Reference Data

### Table 1: TCP vs. UDP

Simple case — one Object per S-P pair.

| Subject | Predicate | Object |
|---------|-----------|--------|
| TCP | Reliability | Guaranteed (Retransmission) |
| UDP | Reliability | Best-effort (No retransmission) |
| TCP | Flow Control | Yes |
| UDP | Flow Control | No |
| TCP | OSI Layer | Transport Layer (Layer 4) |
| UDP | OSI Layer | Transport Layer (Layer 4) |

- **Shared:** OSI Layer (both → Transport Layer)
- **Discriminating:** Reliability, Flow Control

### Table 2: Hypoglycemia vs. Hyperglycemia

Multiple Objects per S-P pair. Every Predicate has a mix of shared and discriminating Objects.

#### Triple list

| Subject | Predicate | Object |
|---------|-----------|--------|
| Hypoglycemia | Energy Level | Fatigue |
| Hypoglycemia | Energy Level | Weakness |
| Hyperglycemia | Energy Level | Fatigue |
| Hyperglycemia | Energy Level | Weakness |
| Hypoglycemia | Mental State | Confusion |
| Hypoglycemia | Mental State | Irritability |
| Hyperglycemia | Mental State | Confusion |
| Hyperglycemia | Mental State | Lethargy |
| Hypoglycemia | Neurological | Blurred Vision |
| Hypoglycemia | Neurological | Headache |
| Hypoglycemia | Neurological | Dizziness |
| Hypoglycemia | Neurological | Seizures |
| Hyperglycemia | Neurological | Blurred Vision |
| Hyperglycemia | Neurological | Headache |
| Hyperglycemia | Neurological | Numbness |
| Hypoglycemia | Autonomic | Tachycardia |
| Hypoglycemia | Autonomic | Sweating |
| Hypoglycemia | Autonomic | Tremor |
| Hypoglycemia | Autonomic | Pallor |
| Hyperglycemia | Autonomic | Tachycardia |
| Hyperglycemia | Autonomic | Extreme Thirst |
| Hyperglycemia | Autonomic | Frequent Urination |
| Hypoglycemia | GI | Nausea |
| Hypoglycemia | GI | Hunger |
| Hyperglycemia | GI | Nausea |
| Hyperglycemia | GI | Abdominal Pain |
| Hyperglycemia | GI | Vomiting |

27 triples. Same data, viewed as a matrix:

#### Matrix view

|  | Energy Level | Mental State | Neurological | Autonomic | GI |
|---|---|---|---|---|---|
| **Hypoglycemia** | Fatigue, Weakness | Confusion, Irritability | Blurred Vision, Headache, Dizziness, Seizures | Tachycardia, Sweating, Tremor, Pallor | Nausea, Hunger |
| **Hyperglycemia** | Fatigue, Weakness | Confusion, Lethargy | Blurred Vision, Headache, Numbness | Tachycardia, Extreme Thirst, Frequent Urination | Nausea, Abdominal Pain, Vomiting |

Row headers are Subjects, column headers are Predicates, each cell holds one or more Objects. The triple list is the source of truth — the matrix is a view for human readability.

#### Shared vs. discriminating per Predicate

| Predicate | Shared Objects | Hypo Only | Hyper Only |
|-----------|---------------|-----------|------------|
| Energy Level | Fatigue, Weakness | — | — |
| Mental State | Confusion | Irritability | Lethargy |
| Neurological | Blurred Vision, Headache | Dizziness, Seizures | Numbness |
| Autonomic | Tachycardia | Sweating, Tremor, Pallor | Extreme Thirst, Frequent Urination |
| GI | Nausea | Hunger | Abdominal Pain, Vomiting |

The spectrum matters. Energy Level is fully shared — no discriminating Objects at all. A student who cites Fatigue to distinguish hypo from hyper is wrong, and the system knows it. Autonomic is mostly discriminating with one shared Object (Tachycardia). Every Predicate sits somewhere on this spectrum, and that position determines what questions it can generate.

### Table 3: Security Models

Four Subjects. Cross-cutting sharing — no two models are twins across all Predicates. Atomicity splits "No Read Up / No Write Down" into separate rows.

#### Triple list

| Subject | Predicate | Object |
|---------|-----------|--------|
| Bell-LaPadula | Primary Goal | Confidentiality |
| Biba | Primary Goal | Integrity |
| Clark-Wilson | Primary Goal | Integrity |
| Brewer-Nash | Primary Goal | Confidentiality |
| Bell-LaPadula | Main Mechanism | No Read Up |
| Bell-LaPadula | Main Mechanism | No Write Down |
| Biba | Main Mechanism | No Read Down |
| Biba | Main Mechanism | No Write Up |
| Clark-Wilson | Main Mechanism | Well-formed Transactions |
| Brewer-Nash | Main Mechanism | Conflict of Interest (COI) Categories |
| Bell-LaPadula | Core Concept | Prevents leaking secrets |
| Biba | Core Concept | Prevents data corruption |
| Clark-Wilson | Core Concept | Separation of Duties |
| Brewer-Nash | Core Concept | Prevents insider trading |
| Bell-LaPadula | System Type | Multi-level Security (MAC) |
| Biba | System Type | Multi-level Security (MAC) |
| Clark-Wilson | System Type | Commercial Environment |
| Brewer-Nash | System Type | Commercial Environment |

18 triples. Same data as a matrix:

#### Matrix view

|  | Primary Goal | Main Mechanism | Core Concept | System Type |
|---|---|---|---|---|
| **Bell-LaPadula** | Confidentiality | No Read Up, No Write Down | Prevents leaking secrets | Multi-level Security (MAC) |
| **Biba** | Integrity | No Read Down, No Write Up | Prevents data corruption | Multi-level Security (MAC) |
| **Clark-Wilson** | Integrity | Well-formed Transactions | Separation of Duties | Commercial Environment |
| **Brewer-Nash** | Confidentiality | Conflict of Interest (COI) Categories | Prevents insider trading | Commercial Environment |

#### Sharing pattern

With 4 Subjects, sharing isn't binary — it's pairwise. Two Subjects can share on one Predicate and differ on another.

| Predicate | Sharing Pattern |
|-----------|----------------|
| Primary Goal | {Bell-LaPadula, Brewer-Nash} → Confidentiality, {Biba, Clark-Wilson} → Integrity |
| Main Mechanism | All unique (BLP and Biba have multi-Object cells, but no shared Objects) |
| Core Concept | All unique |
| System Type | {Bell-LaPadula, Biba} → MAC, {Clark-Wilson, Brewer-Nash} → Commercial |

The cross-cutting is the key insight: Bell-LaPadula shares Primary Goal with Brewer-Nash but System Type with Biba. A student who learns "BLP and Biba go together" (because they're both MAC) will get confused when they're on opposite sides of the Confidentiality/Integrity split. The data model captures this naturally — the system can generate questions that exploit exactly this cross-cutting confusion.

#### Atomicity in action

"No Read Up / No Write Down" from the source becomes two triples. This matters because:

- **No Read Up** and **No Read Down** are near-identical strings belonging to different Subjects (BLP vs Biba). They're perfect distractors for each other. If bundled, you lose this.
- A student might remember "No Read Up" but forget "No Write Down." That's a trackable gap — they know half the mechanism.
- True/False: "Biba includes No Write Down" — False, that's Bell-LaPadula. Only works if the rules are separate rows.

---

## Sample Questions

Each example shows the question as the student sees it, then explains what happened — which triples were selected, what axis was hidden, and how distractors were sourced.

---

### 1. Single Triple — Hide Object (MC)

> **TCP | Reliability → ?**
> - a) Best-effort (No retransmission)
> - b) Guaranteed (Retransmission) ✓
> - c) No
> - d) Transport Layer (Layer 4)

**What happened:**
- **Triples used:** `TCP | Reliability → Guaranteed (Retransmission)`
- **Axis:** Object hidden. Student sees Subject + Predicate.
- **Scope:** Single triple.
- **Format:** Multiple choice — high scaffolding, answer is on screen.
- **Distractors:** (a) is `UDP | Reliability` — same Predicate, different Subject, most plausible. (c) is `UDP | Flow Control` — different Predicate, less plausible. (d) is `TCP | OSI Layer` — different Predicate, same Subject.

---

### 2. Single Triple — Hide Subject (MC)

> **? | Reliability → Best-effort (No retransmission)**
> - a) TCP
> - b) UDP ✓

**What happened:**
- **Triples used:** `UDP | Reliability → Best-effort (No retransmission)`
- **Axis:** Subject hidden. Student sees Predicate + Object.
- **Scope:** Single triple.
- **Format:** Multiple choice.
- **Distractors:** (a) is TCP — the other Subject that shares this Predicate. Plausible because both are protocols.
- **Why harder:** Student must search by value, not by name. Tests whether they actually distinguish the two subjects or just memorized one.

---

### 3. Single Triple — Hide Predicate (MC)

> **TCP | ? → Yes**
> - a) Reliability
> - b) Flow Control ✓
> - c) OSI Layer

**What happened:**
- **Triples used:** `TCP | Flow Control → Yes`
- **Axis:** Predicate hidden. Student sees Subject + Object.
- **Scope:** Single triple.
- **Format:** Multiple choice.
- **Distractors:** Other Predicates for the same Subject. Student must know which property maps to "Yes."
- **Why harder:** Tests structural knowledge — not just values, but how the knowledge is organized.

---

### 4. Single Triple — Fill in the Blank

> **Hypoglycemia | GI → _________** (name one)
> Answer: Nausea *or* Hunger

**What happened:**
- **Triples used:** `Hypoglycemia | GI → Nausea`, `Hypoglycemia | GI → Hunger`
- **Axis:** Object hidden.
- **Scope:** Single triple (accept any one Object from the cell).
- **Format:** Fill in the blank — no scaffolding, pure recall.
- **Note:** The cell has two Objects. Accepting any one is the easiest version. Requiring all is harder (see #13).

---

### 5. Paired Comparison (MC)

> **TCP | Reliability → ?**
> **UDP | Reliability → ?**
>
> - a) TCP: Guaranteed / UDP: Guaranteed
> - b) TCP: Guaranteed / UDP: Best-effort ✓
> - c) TCP: Best-effort / UDP: Guaranteed
> - d) TCP: Best-effort / UDP: Best-effort

**What happened:**
- **Triples used:** `TCP | Reliability → Guaranteed`, `UDP | Reliability → Best-effort`
- **Axis:** Both Objects hidden.
- **Scope:** Paired — two triples sharing a Predicate, different Subjects.
- **Format:** Multiple choice with paired answers.
- **Distractors:** Permutations of the two real Objects. (a) and (d) test if the student thinks they're the same. (c) tests if they have them swapped.
- **Why a tutor does this:** After the student can answer each triple individually, test whether they can hold both in mind and contrast them.

---

### 6. Cell Recall — Complete (Select All That Apply)

> **Hypoglycemia | Neurological → ?** (Select all)
> - ☑ Blurred Vision
> - ☑ Headache
> - ☐ Numbness
> - ☑ Dizziness
> - ☑ Seizures
> - ☐ Extreme Thirst

**What happened:**
- **Triples used:** All 4 Hypoglycemia | Neurological triples.
- **Axis:** Objects hidden. Student must recall the full cell.
- **Scope:** Full cell — all Objects for one S-P pair.
- **Format:** Select all that apply.
- **Distractors:** (c) Numbness is `Hyperglycemia | Neurological` — same Predicate, other Subject. Most plausible because it's a real neurological symptom. (f) Extreme Thirst is `Hyperglycemia | Autonomic` — different Predicate, less plausible but still in-domain.
- **Why this is harder than single triple:** Student must recall *all four* Objects, not just one. Missing Seizures but getting the other three reveals a specific gap.

---

### 7. Cell Recall — Shared vs. Unique (Select All That Apply)

> **Hypoglycemia | Autonomic → ?** (Select ONLY the symptoms unique to Hypoglycemia)
> - ☐ Tachycardia
> - ☑ Sweating
> - ☑ Tremor
> - ☑ Pallor
> - ☐ Extreme Thirst

**What happened:**
- **Triples used:** All Autonomic triples for both Subjects.
- **Axis:** Student filters Objects within a cell — not just "what belongs here" but "what belongs here *and not there*."
- **Scope:** Cross-subject within one Predicate.
- **Format:** Select all that apply.
- **Traps:** (a) Tachycardia is a real Hypoglycemia | Autonomic Object — but it's shared, so it's wrong for this question. (e) Extreme Thirst is Hyperglycemia-only, also wrong. The student must know both cells to answer correctly.

---

### 8. Cross-Cell Comparison — Matching

> **? | Mental State → ?**
> Which symptoms belong to which condition? (Some may belong to both)
>
> | Object | Hypoglycemia | Hyperglycemia |
> |--------|:---:|:---:|
> | Confusion | ✓ | ✓ |
> | Irritability | ✓ | |
> | Lethargy | | ✓ |

**What happened:**
- **Triples used:** All 4 Mental State triples.
- **Axis:** Student assigns each Object to one or both Subjects.
- **Scope:** Cross-subject, one Predicate, all Objects.
- **Format:** Matrix matching — student fills a grid.
- **Why this works:** Confusion is shared. If the student only checks one column for Confusion, they've revealed a gap. Irritability and Lethargy are discriminating — swapping them is the classic mistake.

---

### 9. Subject Profile (Select All That Apply)

> **TCP | ? → ?** (Select all that are correct)
> - ☑ Reliability → Guaranteed (Retransmission)
> - ☑ Flow Control → Yes
> - ☐ Reliability → Best-effort (No retransmission)
> - ☑ OSI Layer → Transport Layer (Layer 4)

**What happened:**
- **Triples used:** All 3 TCP triples, plus `UDP | Reliability` as a wrong option.
- **Axis:** Student evaluates complete triples as true or false for this Subject.
- **Scope:** Subject profile — all Predicates for one Subject.
- **Format:** Select all that apply — medium scaffolding. Can't use elimination; must evaluate each independently.
- **Distractor:** Option (c) is UDP's Reliability value presented as TCP's. It's the most plausible wrong answer because it's from the same Predicate.
- **Diagnostic value:** If the student gets 3/4 right, you know *exactly* which triple is weak.

---

### 10. Commonality — Which Objects Are Shared (Select All That Apply)

> **Hypoglycemia, Hyperglycemia | GI → ?** (Select the symptoms present in BOTH)
> - ☑ Nausea
> - ☐ Hunger
> - ☐ Abdominal Pain
> - ☐ Vomiting

**What happened:**
- **Triples used:** All 5 GI triples across both Subjects.
- **Axis:** Student identifies which Objects within one Predicate are shared.
- **Scope:** Cross-subject, one Predicate.
- **Format:** Select all that apply.
- **Why this is different from old-style commonality:** Previously with collapsed data, entire Predicates were either shared or not. Now, *within* a Predicate, some Objects are shared (Nausea) and some aren't (Hunger is hypo-only, Abdominal Pain and Vomiting are hyper-only). The question gets more granular.

---

### 11. Commonality — Which Predicates Have Overlap (Select All That Apply)

> **Hypoglycemia, Hyperglycemia | ? → (any shared Objects)**
> Which categories have at least one symptom in common?
> - ☑ Energy Level
> - ☑ Mental State
> - ☑ Neurological
> - ☑ Autonomic
> - ☑ GI

**What happened:**
- **Triples used:** All 27 Glycemia triples.
- **Axis:** Student identifies Predicates with overlap.
- **Scope:** Cross-subject, all Predicates.
- **Format:** Select all that apply.
- **The trick:** All five are correct — every Predicate has at least one shared Object. Energy Level is *entirely* shared (Fatigue and Weakness appear in both). A student who thinks "Autonomic is different between hypo and hyper" is partially right (most Objects differ) but misses Tachycardia.

---

### 12. Discrimination (Select All That Apply)

> **TCP | ? → (unique vs. UDP)**
> Which properties differ between TCP and UDP?
> - ☑ Reliability
> - ☑ Flow Control
> - ☐ OSI Layer

**What happened:**
- **Triples used:** All 6 TCP/UDP triples. System compared Objects per Predicate across Subjects.
- **Axis:** Student identifies discriminating Predicates.
- **Scope:** Cross-subject discrimination.
- **Format:** Select all that apply.
- **Distractor:** OSI Layer is the trap — it's shared, but a student who hasn't internalized the commonality will check it.

---

### 13. Full Cell Recall — Fill in the Blank

> **Hypoglycemia | Autonomic → _________, _________, _________, _________**
> Answer: Tachycardia, Sweating, Tremor, Pallor

**What happened:**
- **Triples used:** All 4 `Hypoglycemia | Autonomic` triples.
- **Axis:** All Objects hidden.
- **Scope:** Full cell.
- **Format:** Fill in the blank — no scaffolding, no options. Student must recall every Object in the cell.
- **Why this is hard:** Four items with no cues. Missing one reveals a specific gap. A tutor uses this only after the student has passed the same cell in Select All format.

---

### 14. True/False — Swapped Object

> **UDP | Flow Control → Yes** — True or false?
> Answer: False. (UDP | Flow Control → No)

**What happened:**
- **Triples used:** `UDP | Flow Control → No` (the real triple), with the Object swapped from `TCP | Flow Control → Yes`.
- **Axis:** None hidden — a complete triple is presented, but the Object is wrong.
- **Scope:** Single triple, cross-referenced against another Subject.
- **Format:** True/False — low scaffolding. Student must recall the correct value to catch the lie.

---

### 15. True/False — Misattributed Object (Multi-Object Cell)

> **Hyperglycemia | Neurological → Dizziness** — True or false?
> Answer: False. (Dizziness is Hypoglycemia | Neurological, not Hyperglycemia)

**What happened:**
- **Triples used:** `Hypoglycemia | Neurological → Dizziness` (the real triple). Presented under the wrong Subject.
- **Axis:** None hidden — the Object is real data but assigned to the wrong Subject.
- **Scope:** Cross-subject within one Predicate.
- **Format:** True/False.
- **Why this is tricky with multi-Object cells:** Both Subjects share Blurred Vision and Headache under Neurological. The student might reason "they share a lot of neurological symptoms, so Dizziness probably applies too." The shared Objects create a false sense of overlap.

---

### 16. Composite Distractor — Mix and Match (MC)

> **TCP | ? → ?** (Select the fully correct description)
> - a) Reliability: Guaranteed, Flow Control: Yes, OSI Layer: Application Layer ✗
> - b) Reliability: Guaranteed, Flow Control: No, OSI Layer: Transport Layer ✗
> - c) Reliability: Guaranteed, Flow Control: Yes, OSI Layer: Transport Layer ✓
> - d) Reliability: Best-effort, Flow Control: Yes, OSI Layer: Transport Layer ✗

**What happened:**
- **Triples used:** All 3 TCP triples for the correct answer. Each distractor takes the correct set and swaps exactly one Object.
- **Axis:** All Objects presented — student verifies the complete profile.
- **Scope:** Subject profile — all triples for one Subject.
- **Format:** MC, but each option is a *bundle* of triples.
- **Distractor construction:** (a) swaps OSI Layer to a wrong value. (b) swaps Flow Control to UDP's value. (d) swaps Reliability to UDP's value. Each is *mostly right* — only one fact is wrong.
- **Why this is the hardest MC variant:** The student can't just recognize one correct fact. They must verify every triple in the bundle.

---

### 17. Composite Distractor — Multi-Object Cell (MC)

> **Hypoglycemia | Autonomic → ?** (Select the fully correct set)
> - a) Tachycardia, Sweating, Tremor, Pallor ✓
> - b) Tachycardia, Sweating, Tremor, Extreme Thirst ✗
> - c) Tachycardia, Extreme Thirst, Frequent Urination, Pallor ✗
> - d) Tachycardia, Sweating, Frequent Urination, Pallor ✗

**What happened:**
- **Triples used:** All 4 `Hypoglycemia | Autonomic` triples for the correct answer. Distractors swap in Objects from `Hyperglycemia | Autonomic`.
- **Distractor construction:** Every option starts with Tachycardia (shared, so always correct — doesn't help the student eliminate). (b) swaps Pallor → Extreme Thirst. (c) swaps Sweating and Tremor → Extreme Thirst and Frequent Urination. (d) swaps Tremor → Frequent Urination.
- **Why shared Objects make this harder:** Tachycardia appears in every option because it's shared. The student can't use it as a signal. They must evaluate the discriminating Objects — Sweating, Tremor, Pallor vs. Extreme Thirst, Frequent Urination.

---

### 18. Cross-Predicate Composite — Medical (MC)

> **Hypoglycemia | ? → ?** (Select the fully correct row across all Predicates)
> - a) Energy Level: Fatigue + Weakness, Mental State: Confusion + Irritability, Neurological: Blurred Vision + Headache + Dizziness + Seizures, Autonomic: Tachycardia + Sweating + Tremor + Pallor, GI: Nausea + Hunger ✓
> - b) Energy Level: Fatigue + Weakness, Mental State: Confusion + Irritability, Neurological: Blurred Vision + Headache + Dizziness + Seizures, Autonomic: Tachycardia + Sweating + Tremor + Pallor, GI: Nausea + Abdominal Pain ✗
> - c) Energy Level: Fatigue + Weakness, Mental State: Confusion + Lethargy, Neurological: Blurred Vision + Headache + Dizziness + Seizures, Autonomic: Tachycardia + Sweating + Tremor + Pallor, GI: Nausea + Hunger ✗
> - d) Energy Level: Fatigue + Weakness, Mental State: Confusion + Irritability, Neurological: Blurred Vision + Headache + Numbness + Seizures, Autonomic: Tachycardia + Sweating + Tremor + Pallor, GI: Nausea + Hunger ✗

**What happened:**
- **Triples used:** All 13 Hypoglycemia triples for the correct answer. Each distractor swaps one discriminating Object from one cell with a Hyperglycemia Object.
- **Distractor construction:** (b) swaps GI: Hunger → Abdominal Pain. (c) swaps Mental State: Irritability → Lethargy. (d) swaps Neurological: Dizziness → Numbness. Each is one Object wrong across the entire Subject profile.
- **Note on Energy Level:** It's identical in every option because it's fully shared — both conditions have Fatigue and Weakness. It can't be used to create a distractor here. The system knows this and only swaps Objects from Predicates that have discriminating values.
- **Why this is the hardest question type:** Student must verify 5 cells × multiple Objects each. One wrong item buried in a wall of correct ones. This is the "final exam" question — only works after the student has mastered individual cells.

---

### 19. Hide Subject — 4 Options (MC)

> **? | Primary Goal → Confidentiality**
> - a) Bell-LaPadula ✓
> - b) Biba
> - c) Clark-Wilson
> - d) Brewer-Nash ✓

**What happened:**
- **Triples used:** All 4 Primary Goal triples.
- **Axis:** Subject hidden.
- **Scope:** Single Predicate, all Subjects.
- **Format:** Multiple choice — but with 4 Subjects, this becomes "select all that apply" naturally, because *two* Subjects share this Object.
- **Why 4 Subjects changes things:** With 2 Subjects, Hide Subject is binary — it's always one or the other. With 4, the student might know Bell-LaPadula → Confidentiality but forget Brewer-Nash also → Confidentiality. The shared Object spans Subjects the student might not mentally group together.

---

### 20. Negation (MC)

> **Bell-LaPadula | Main Mechanism → ?** (Select the one that does NOT belong)
> - a) No Read Up
> - b) No Write Down
> - c) No Read Down ✓
> - d) No Write Up ✓

**What happened:**
- **Triples used:** `Bell-LaPadula | Main Mechanism → No Read Up`, `Bell-LaPadula | Main Mechanism → No Write Down`, plus Biba's mechanism triples as distractors.
- **Axis:** Inverted — student identifies what does NOT belong rather than what does.
- **Scope:** Cell + cross-subject.
- **Format:** "Select the ones that do NOT apply."
- **Why negation is hard here:** "No Read Down" and "No Write Up" are Biba's rules. They're nearly identical strings to BLP's "No Read Up" and "No Write Down" — the difference is one word. Atomicity is what makes this question possible. If the mechanisms were bundled as compound values, you couldn't isolate the individual rules to test confusion between them.
- **The teacher's intent:** Students constantly swap BLP and Biba rules. This question targets that exact confusion point.

---

### 21. Cross-Cutting Discrimination (Matching)

> Match each model to its correct pairing across BOTH Predicates:
>
> | Model | Primary Goal | System Type |
> |-------|:---:|:---:|
> | Bell-LaPadula | ? | ? |
> | Biba | ? | ? |
> | Clark-Wilson | ? | ? |
> | Brewer-Nash | ? | ? |
>
> Options: Confidentiality, Integrity, Multi-level Security (MAC), Commercial Environment

**What happened:**
- **Triples used:** All 8 triples across Primary Goal and System Type.
- **Axis:** Objects hidden for two Predicates simultaneously.
- **Scope:** All Subjects, multiple Predicates.
- **Format:** Matrix matching — student fills a 4×2 grid.
- **Why this only works with 4+ Subjects:** With 2 Subjects, the student can answer one and deduce the other. With 4, each cell is independent. The cross-cutting pattern is the trap: BLP pairs with Brewer-Nash on Goal but with Biba on System Type. A student who mentally groups "BLP + Biba = same" will get Goal wrong. A student who groups "BLP + Brewer-Nash = same" will get System Type wrong.
- **The teacher's intent:** Force the student to abandon simple groupings. No two models are twins across all Predicates.

---

### 22. Scenario — Reverse Lookup from Description (MC)

> A financial institution needs to ensure that analysts working on Company A's merger cannot access data from Company B, which is a competitor of Company A.
>
> **? | Core Concept → ?**
> Which security model applies?
> - a) Bell-LaPadula
> - b) Biba
> - c) Clark-Wilson
> - d) Brewer-Nash ✓

**What happened:**
- **Triples used:** `Brewer-Nash | Core Concept → Prevents insider trading`
- **Axis:** Subject hidden. The scenario describes an Object in natural language; the student must identify the Subject.
- **Scope:** Single triple, but the prompt is a scenario rather than a coordinate.
- **Format:** Multiple choice.
- **What's different:** The question doesn't say "Prevents insider trading" directly — it describes a situation that maps to that concept. The student must translate the scenario back to the underlying triple.
- **The teacher's intent:** Tests application, not just recall. The student who memorized "Brewer-Nash prevents insider trading" must recognize that scenario *is* insider trading prevention.
- **Distractor logic:** (a) Bell-LaPadula is the strongest distractor — it's also about Confidentiality (same Primary Goal). A student who only knows the Goal level will be stuck between (a) and (d). They need Core Concept to disambiguate.

---

### 23. Scenario — Multiple Clues Narrowing (MC)

> An organization operates in a multi-level classified environment. They need to ensure that a user with "Secret" clearance cannot read "Top Secret" documents.
>
> **? | System Type → Multi-level Security (MAC), ? | Core Concept → ?**
> Which security model applies?
> - a) Bell-LaPadula ✓
> - b) Biba
> - c) Clark-Wilson
> - d) Brewer-Nash

**What happened:**
- **Triples used:** `Bell-LaPadula | System Type → Multi-level Security (MAC)`, `Bell-LaPadula | Core Concept → Prevents leaking secrets`
- **Axis:** Subject hidden. Two clues from different Predicates.
- **Scope:** Cross-predicate — the scenario maps to triples from two different Predicates, and the student must find the Subject that satisfies both.
- **Format:** Multiple choice.
- **Why multiple clues matter:** "Multi-level Security" alone matches both BLP *and* Biba. "Prevents reading above your level" alone could be confused with Biba's "No Read Down." The student needs *both* clues to land on BLP with confidence. The scenario naturally provides multiple Predicates' worth of information, just like real exam questions do.
- **Distractor difficulty:** (b) Biba is the hardest distractor — it shares System Type (MAC) with BLP. (c) and (d) are easier to eliminate (Commercial Environment). A tutor who wants an easier version drops Biba from the options.

---

### 24. Distractor Difficulty — Same Question, Two Levels (MC)

**Easier version:**

> **Bell-LaPadula | Core Concept → ?**
> - a) Prevents leaking secrets ✓
> - b) Well-formed Transactions
> - c) Separation of Duties
> - d) Conflict of Interest (COI) Categories

**Harder version:**

> **Bell-LaPadula | Core Concept → ?**
> - a) Prevents leaking secrets ✓
> - b) Prevents data corruption
> - c) Prevents insider trading
> - d) Separation of Duties

**What happened:**
- **Same triple tested:** `Bell-LaPadula | Core Concept → Prevents leaking secrets`
- **Easier distractors:** (b), (c), (d) are from Core Concept but obviously unrelated to confidentiality. A student who vaguely knows "BLP is about secrets" can eliminate all three.
- **Harder distractors:** (b) "Prevents data corruption" and (c) "Prevents insider trading" are both plausible if you know BLP is a *security* model but can't recall its specific concern. All distractors come from the same Predicate, and they all sound like security goals.
- **The control knob:** Distractor plausibility is tunable. Same-Predicate distractors from related Subjects are the hardest. Cross-Predicate distractors or distractors from unrelated Subjects are easier. With 4 Subjects, the system has more options to tune this gradient.

---

## Progression Logic

A tutor doesn't march through these linearly. They make moves based on what the student reveals.

| Move | Trigger | Action |
|------|---------|--------|
| **Narrow on weakness** | Student misses a specific triple | Drill that triple across varied formats |
| **Escalate on strength** | Student masters individual triples for a Predicate | Promote to cell recall, then paired comparison |
| **Probe the edges** | High accuracy in MC format | Re-test same triples as fill-in-the-blank |
| **Test overlap** | Student aces discriminating Objects | Ask about shared Objects — do they know what's common? |
| **Test within-cell discrimination** | Student knows the cell exists | Ask which Objects in the cell are shared vs. unique |
| **Introduce confusion** | Student is confident | Present misattributed Objects as True/False |
| **Composite stress test** | Student passes cell recall and comparison | Present mix-and-match composites |
| **Negate** | Student passes positive recall | Ask what does NOT belong — invert the task |
| **Apply** | Student masters recall across formats | Present scenarios that describe triples in natural language |
| **Cross-cut** | Student groups Subjects into pairs | Test across Predicates where the pairs break (e.g., BLP+Biba on System Type but BLP+Brewer-Nash on Primary Goal) |
| **Tune distractors** | Student finds MC too easy | Swap cross-Predicate distractors for same-Predicate ones |

## Difficulty Matrix

Axis, scope, and format are independent dimensions. A tutor moves along each one separately.

| Dimension | Easier → Harder |
|-----------|----------------|
| **Axis** | Hide Object → Hide Subject → Hide Predicate |
| **Scope** | Single triple → Cell recall → Paired comparison → Subject profile → Commonality / Discrimination |
| **Format** | Multiple choice → Select all / Matching → True/False → Fill in the blank |
| **Polarity** | Positive ("which IS") → Negative ("which is NOT") |
| **Framing** | Coordinate (`S \| P → ?`) → Scenario (natural language description) |
| **Distractor source** | Cross-Predicate (easy to eliminate) → Same-Predicate, different Subject (plausible) → Near-identical strings across Subjects (e.g., No Read Up vs No Read Down) |
| **Subject count** | 2 Subjects (binary) → 4+ Subjects (cross-cutting sharing, no deduction by elimination) |

You can combine any dimension independently. An easy axis (hide Object) with a hard format (fill-in-the-blank) is a different challenge than a hard scope (discrimination) with an easy format (multiple choice). Adding scenario framing or negation polarity increases difficulty without changing the underlying data operation. Tuning distractor source separately from everything else lets you make the "same" question significantly harder. This gives fine-grained control over difficulty without authoring separate question banks.
