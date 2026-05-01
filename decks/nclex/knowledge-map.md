# NCLEX Knowledge Map (Index)

> Top-level scaffold for NCLEX content. Per-Topic details live in each Topic folder.
> **Source:** NCSBN NCLEX-RN Test Plan, effective April 1, 2026 through March 31, 2029. Retrieved 2026-04-26 from https://www.ncsbn.org/publications/2026-nclex-rn-test-plan (publication landing) and https://www.nclex.com/files/2026_RN_Test%20Plan_English-F.pdf (PDF). Verify against current publication before SME pass.

---

## Folder Structure → NuQuiz Hierarchy

```
decks/nclex/                                              (Deck: "NCLEX-RN")
  knowledge-map.md                                       (this file)
  01-management-of-care/                                 (Topic: Client Needs sub-category)
    README.md                                            (sub-category overview, Concept index)
    <concept>.md                                         (Concept)
    ...
  02-safety-and-infection-prevention-and-control/        (Topic)
  03-health-promotion-and-maintenance/                   (Topic)
  04-psychosocial-integrity/                             (Topic)
  05-basic-care-and-comfort/                             (Topic)
  06-pharmacological-and-parenteral-therapies/           (Topic)
  07-reduction-of-risk-potential/                        (Topic)
  08-physiological-adaptation/                           (Topic)
```

Mapping:
- `decks/nclex/` = **Deck**
- Each Client Needs sub-category folder = **Topic**
- Each `.md` file inside a Topic folder = **Concept**
- Each cell in a Concept's table holds one or more atomic **Facts** (multi-item cells use `<br>` to separate)

The four NCSBN top-level Client Needs **categories** (Safe and Effective Care Environment, Health Promotion and Maintenance, Psychosocial Integrity, Physiological Integrity) are not their own folders. Two of them (Safe and Effective Care Environment, Physiological Integrity) split into multiple sub-categories; the other two are themselves both category and sole sub-category. Folders correspond to the eight sub-categories — the level the test plan attaches percentages to. Whether a "Category" should also exist as a UI grouping is an Open Question below.

---

## Hierarchy Mapping (terms)

| NCLEX term | NuQuiz term | File/folder | Expected count |
|---|---|---|---|
| Exam | Deck | `decks/nclex/` | 1 |
| Client Needs sub-category | Topic | numbered subfolder | 8 |
| Sub-objective (Related Content statement) | Tag (referenced in files) | — | TBD per Topic |
| Comparable group | Concept | individual `.md` file | ~200-300 (estimate) |
| Fact | Fact | atomic item in a table cell | ~5,000 (target, mirrors CISSP) |

Sub-objectives do not map 1:1 to Concepts. The NCSBN "Related Content" bullets under each sub-category are an outline of testable content; a Concept is our comparison boundary. Tag Concepts with the Related Content items they cover so coverage can be audited against the official test plan.

---

## Client Needs Weights & Fact Allocation

Weight ranges below are the NCSBN-published percentage range of test items per sub-category for the 2026 NCLEX-RN Test Plan. Target Fact counts use the **midpoint** of each range, applied to a ~5,000-fact total (matching the CISSP allocation scale).

| # | Category | Sub-category (Topic) | Folder | Weight | Midpoint | Target facts |
|---|---|---|---|---|---|---|
| 1 | Safe and Effective Care Environment | Management of Care | `01-management-of-care/` | 15–21% | 18% | ~900 |
| 2 | Safe and Effective Care Environment | Safety and Infection Prevention and Control | `02-safety-and-infection-prevention-and-control/` | 10–16% | 13% | ~650 |
| 3 | Health Promotion and Maintenance | Health Promotion and Maintenance | `03-health-promotion-and-maintenance/` | 6–12% | 9% | ~450 |
| 4 | Psychosocial Integrity | Psychosocial Integrity | `04-psychosocial-integrity/` | 6–12% | 9% | ~450 |
| 5 | Physiological Integrity | Basic Care and Comfort | `05-basic-care-and-comfort/` | 6–12% | 9% | ~450 |
| 6 | Physiological Integrity | Pharmacological and Parenteral Therapies | `06-pharmacological-and-parenteral-therapies/` | 13–19% | 16% | ~800 |
| 7 | Physiological Integrity | Reduction of Risk Potential | `07-reduction-of-risk-potential/` | 9–15% | 12% | ~600 |
| 8 | Physiological Integrity | Physiological Adaptation | `08-physiological-adaptation/` | 11–17% | 14% | ~700 |
| | | **Total** | | **76–104%** (range) | **100%** | **~5,000** |

The 76–104% range total is expected — NCSBN publishes per-sub-category ranges that bracket the actual proportion; the midpoints sum to 100%. Fact targets are ceilings tied to exam weight, not quotas. If a Concept has 12 meaningful facts, don't pad it.

---

## Atomicity Rules (CORE)

Every fact must be independently learnable, distractable, and gradable. The engine treats each `<br>`-separated item in a cell as one fact. To preserve atomicity:

- **No "and"-joined compound facts.** "Assess airway, breathing, and circulation" is three facts, not one. Split with `<br>`.
- **No comma-joined lists in cells.** Same reason — split with `<br>`.
- **Terse over verbose.** "Auscultate lung fields" beats "The nurse should auscultate the patient's lung fields bilaterally."
- **Parentheticals are dangerous.** They mask sharing across Rows and smuggle separate Facts into cells. **Default to no parentheticals.** The narrow exceptions are listed below — if you're not sure, keep it out and put context in Notes.
- **Names and identifiers are exempt.** Proper names that contain commas or "and" stay whole when that's how they appear in NCSBN/clinical source language.

If a cell would naturally be a paragraph, the Concept is at the wrong level of granularity — split the row or revisit the column choice.

### Why this matters

A compound fact ("Assess airway, breathing, and circulation") tested as one multiple-choice option grades as a single right/wrong. A student who knows "airway" and "breathing" but not "circulation" gets the same wrong answer as someone who knows nothing. That's bad diagnostics. Splitting into three facts lets the engine identify the specific gap — which is the entire point of NuQuiz.

### Parenthetical safety check

Authors regularly want to write things like `Hypertension (>140/90)`, `NPO (no food or water)`, or `Fall risk (elderly, sedated)` in a cell. **Almost all of these break atomicity.** Run this check before keeping any parenthetical in a cell:

1. **Strip every parenthetical from the Column.** If any two cells in the same Column become identical, the parenthetical was load-bearing for sharing — *the engine can no longer detect that those Rows share a Value*. **Fix:** move the parenthetical contents into a separate Column.
   - Example: `Elevated (>140/90)` (HTN stage 2) and `Elevated (>130/80)` (HTN stage 1) — the parenthetical hides that both Rows share `BP status = Elevated`. Split into a `BP status` Column and a `threshold` Column.

2. **Does the parenthetical name a separate attribute?** If yes, it belongs in its own Column.
   - Example: `Acute (sudden onset)` smuggles `onset speed` into `acuity`. Split.

3. **Does the parenthetical contain a comma-list?** If yes, those are sub-Facts. Split with `<br>` or move to a separate Column.
   - Example: `Antibiotics (penicillins, cephalosporins)` is two drug-class Facts bundled with a parent label. Use `Penicillins<br>Cephalosporins`.

4. **Is the parenthetical editorial / meta?** If yes, it doesn't belong in a Fact — move to Notes.
   - Example: `IM injection (some sources say SubQ)` — that's editor commentary about classification, not a Fact about IM injection itself. Notes.

**The narrow allowed cases:**

- **Inseparable canonical names.** A drug or syndrome whose proper name contains a parenthetical or comma in NCSBN/USP/medical source language — keep as published. Test: would a textbook print this without the parens? If no, keep.
- **Abbreviation introduction unique to one Row.** `Patient-controlled analgesia (PCA)` introduces an abbreviation unique to this Row. Borderline. Prefer moving the abbreviation to Notes or splitting into a `name` and `abbreviation` column.

The default is no parenthetical. The cost of stripping context is a Notes entry. The cost of leaving a bad parenthetical is the engine missing a shared Value forever.

### Beyond cell-level: column-header qualifiers and Aspects exceptions

These two patterns look like parens violations but aren't — they are structural choices that the cell-level rules above don't apply to.

- **Column-header qualifiers.** Parentheticals in **column headers** — `tonicity (in bag)` and `tonicity (in body)`, or CISSP's `min header size` and `max header size` — scope the Column rather than smuggle Facts into a cell. Use when a single-attribute Column needs to split into scope-distinct versions because Row values differ by scope. Example: D5W tonicity is `Isotonic` in the IV bag but becomes `Hypotonic` after metabolism. Representing as one Column collapses two distinct Facts into one cell; representing as two scoped Columns exposes shared values across Rows (3 Rows share `Isotonic` in-bag; 4 Rows share `Hypotonic` in-body) that the engine can detect.
- **Single-Row Aspects exception.** When a Concept has Pattern: Aspects (single Row), splitting a scope qualifier into its own Column would create a Column carrying only one cell — defeating the purpose. In this case the qualifier may stay with the cell as a parenthetical, OR move to Notes. Choose whichever preserves atomicity for the surrounding Facts in that cell. This exception applies ONLY to Aspects — Dimensions and Ordered Concepts have multiple Rows and should split into a separate Column.

---

## Deterministic Prompt & Answer Notation

The engine never generates English to describe a question. Prompts and answer options are constructed mechanically from cell data plus a small grammar of operators. **No English question words** ("What", "Which", "How", "Where", "Identify the…", etc.) appear in a generated prompt — those are descriptive language, and descriptive language is exactly what we promised we wouldn't put in the runtime.

### The grammar

| Symbol | Meaning |
|---|---|
| `Row | Column → Value` | A complete Fact |
| `?` | The hidden side of the Fact (the thing the student supplies) |
| `,` (between Rows) | Cross-Row scope (e.g., `? | priority → High` selects all matching Rows) |
| `→ ?` | Hide the Value |
| `Row | ?` | Hide the Column |
| `? | Column` | Hide the Row |

Every student-facing prompt is one of these forms. Answer options are literal cell text — never paraphrased.

### Universal UI scaffolding is not generated text

These phrases are part of the app, not the engine, and may appear around prompts:

- "Select all that apply"
- "True or false?"
- "Order these"
- "Match the items"
- "Identify the missing Row" (puzzle-mode instruction)

UI scaffolding is the same for every question of that format. It's not generated *about* the data — it's app chrome. The line: if the sentence describes the specific data being tested, it's generated content and must be coordinate. If it's the same instruction for every question of this format, it's UI.

### Engine demo opportunities in Concept files

When listing engine demo opportunities at the bottom of a Concept file, write them as coordinates, not as English questions. Bad: "What is the priority assessment for ABCs?" Good: `ABC | first step → ?` → Airway.

This keeps the demo notes honest — they show what the engine actually produces.

---

## Concept Authoring Pattern

Each Concept is one `.md` file in its Topic folder. Required fields:

- **Concept name** — the comparable group (file H1 heading)
- **Pattern** — Dimensions | Ordered | Aspects (see picker below)
- **Tags** — Related Content / sub-objective references, Integrated Process tags, and any cross-cutting Tags (e.g., `dc-*` drug classes). Full registry of valid Tags lives in `decks/nclex/tags.md` — add new Tags there before using them in a Concept file.
- **Status** — draft / SME-reviewed / complete
- **Layout convention** — one-line note about how rows and columns are organized for this Concept
- **The table itself** — rows × columns of atomic facts (multi-fact cells use `<br>`)
- **Notes** — author notes, tricky distinctions, exam pointers, engine demo opportunities

### Pattern picker

- **Dimensions** — comparable entities × shared attributes. **Rows** are entities (e.g., Type 1 vs Type 2 diabetes; loop vs thiazide vs K-sparing diuretics). **Columns** are attributes (mechanism, side effects, contraindications). Most common pattern. Generates compare-and-contrast and shared-vs-discriminating questions.

- **Ordered** — sequential or hierarchical content where order matters. **Rows are steps in order.** **Columns are attributes of each step**, with optional left → right progression from terse identifier (Name) to deeper detail (Mechanism, Purpose). Examples: nursing process steps, chain of infection, stages of grief, IV insertion procedure. Generates sequence recall, step-attribute recall, cross-procedure comparison.

- **Aspects** — single concept × multiple facets. **One row** (the concept itself); **columns** are facets (definition, indication, contraindication, example). Use when there's no comparison and no sequence — just one thing to elaborate on. Generates definition recall, exception-finding.

(Mirrors CISSP: depth-progression is expressed as left → right column ordering within an Ordered or Dimensions Concept, not as a separate pattern.)

---

## Cross-Cutting Notes

- **Integrated Processes as Tags, not Topics.** NCSBN's six 2026 Integrated Processes — **Clinical Judgment**, **Nursing Process**, **Caring**, **Communication and Documentation**, **Culture and Spirituality**, **Teaching/Learning** — apply across all eight Client Needs sub-categories. They are not exam content categories with their own percentage; they are practice frames that the Client Needs items are written through. Treat each as a Tag a Concept can carry, alongside the sub-category Tag. Lean: the engine should be able to filter "all Concepts tagged `clinical-judgment`" to surface NGN-style cases regardless of sub-category. (Confirm with SME during Phase 2.)
- **NCSBN Clinical Judgment Measurement Model (NCJMM).** The 2026 plan fully embeds NCJMM across item types. NCJMM's six cognitive operations (Recognize Cues, Analyze Cues, Prioritize Hypotheses, Generate Solutions, Take Actions, Evaluate Outcomes) may justify a dedicated cross-cutting Concept and/or NGN-case tag scheme. Open Question.
- **Cross-Topic Concepts.** Some facts live naturally in multiple Topics (e.g., medication safety spans Safety and Pharmacological). Tag with all relevant sub-objective and Integrated Process Tags; keep the Concept file in the Topic it fits most naturally.
- **Concept file naming.** kebab-case, short (`abc-priority.md`, not `airway-breathing-circulation-priority-assessment.md`).
- **Concept names in content** should match NCSBN / standard clinical language for buyer familiarity. Plain-language clarifications go in the Notes section.

---

## Open Questions for the User / SME

1. **RN vs PN.** This skeleton targets NCLEX-**RN** (2026 plan, 8 sub-categories with the weights above). NCLEX-PN has the same four Client Needs categories but a different sub-category breakdown under Safe and Effective Care Environment ("Coordinated Care" instead of "Management of Care") and different weight ranges. If PN is in scope, it's a separate Deck, not a re-skin.
2. **Does a top-level Client Needs Category map to anything in our hierarchy?** Options: (a) pure UI grouping above Topic, no folder; (b) a synthetic Tag carried by every Concept; (c) ignore — Topic is the only level that matters. Lean: (a) or (b).
3. **Integrated Processes as Tags vs Topics.** Confirmed lean above is Tags. Worth re-validating with the first nursing SME — they may want a discoverable surface for, e.g., "all the Communication and Documentation Concepts."
4. **NCJMM cognitive operations.** Should the six NCJMM steps (Recognize Cues … Evaluate Outcomes) be (a) their own Concept under Management of Care, (b) a cross-cutting Tag scheme orthogonal to Integrated Processes, or (c) treated as engine-side question-style metadata rather than content? Affects how NGN cases are modeled.
5. **NGN unscored item types.** The 2026 plan continues NGN items (bowtie, trend, matrix-multiple-choice, drag-and-drop cloze, highlight, etc.). These are item formats, not content. Open: do they show up in Concept files at all, or only in a separate "question-format inventory"?
6. **Concept granularity target.** The ~200-300 Concept estimate is borrowed from CISSP. Nursing content is broader and more case-based; the actual number could be higher. Will firm up after Topic 1 and Topic 6 (the two heaviest) are scoped.
7. **Concept names.** NCSBN exact phrasing vs. plain-language. Lean: NCSBN exact in Concept tables, plain-language clarifications in Notes (matches CISSP).
8. **Source allowlist for nursing content.** CISSP draws from NIST/RFC/(ISC)² primary sources. Nursing equivalents (NCSBN, FDA drug labels, CDC guidelines, USPSTF, AHA/ACLS, peer-reviewed nursing journals) need to be enumerated before bulk authoring — the research skill's allowlist will need to be widened or a sibling skill created.

---

## Status

- [x] Top-level scaffold (this file)
- [x] Eight Topic folders created
- [x] Per-Topic placeholder README in each folder
- [ ] User/SME review of Topic list, weights, and Open Questions
- [ ] Per-Topic README populated with sub-objectives (NCSBN Related Content) and proposed Concept lists
- [ ] First demo Concept authored (likely under Topic 1 or Topic 6)
- [ ] Source allowlist for nursing research finalized (Open Question 8)
- [ ] Atomicity rules pressure-tested against the first nursing Concept (the CISSP examples may need nursing-specific siblings)
