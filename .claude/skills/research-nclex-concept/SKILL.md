---
name: research-nclex-concept
description: Research and author ONE NCLEX Concept (one .md file under docs/nclex/) from public nursing sources, with per-Cell citations, format-lint pass, and exam-coverage review. Branches into edit mode if the Concept already exists. Use when the user asks to research, draft, author, expand, refresh-citations, or restructure an NCLEX Concept. Do NOT use for non-NCLEX content, for batch authoring multiple Concepts at once, or for editing the knowledge-map / tag-registry / Topic README files.
---

# Research an NCLEX Concept

Research-and-author skill for filling out NCLEX demo content one Concept at a time. Operates against the rules in `docs/nclex/knowledge-map.md` (atomicity, no parens-masking-shared-Values, deterministic prompt notation), the Pattern picker (Dimensions / Ordered / Aspects), and the Tag registry in `docs/nclex/tags.md`.

This is a sibling of `research-cissp-concept` — same workflow shape, different exam, different source allowlist. Universal authoring rules (atomicity, prompt notation, parens-safety) live in each Deck's knowledge-map; if the two skills drift on those rules over time, they will be factored out to a shared file.

## Foundational decisions baked in

These were settled during skill design and should not be re-litigated mid-flow without explicit user instruction:

| # | Decision | Choice |
|---|---|---|
| 1 | Scope per invocation | One Concept (one .md file) |
| 2 | Source strategy | Hybrid: skill fetches public defaults from the allowlist, user can paste extras. **Never extract from copyrighted material the user did not paste.** |
| 3 | Citation granularity | Per-Cell, escalate to per-Fact when a cell's Facts come from different sources |
| 4 | Pattern + columns | Skill proposes from initial research; user confirms before cell-filling |
| 5 | Validation behavior | Flag and pause with proposed fix; do not auto-fix silently |
| 6 | Review composition | Format auto-gates first (mechanical); then citation + exam fit surfaced together as one review pass |
| 7 | Citation format | Numbered source IDs in cells (`[s1]`, `[s2]`); full registry at file bottom |
| 8 | Existing-file handling | Detect existing → ask which mode (overwrite / add column / add row / re-cite / restructure) |
| 9 | Source insufficiency | Draft what's covered; mark gaps with `[needs source]`; coverage report flags how much is unsourced |
| 10 | Tag handling | Every Tag a Concept carries must be a valid sub-objective ID for its Topic OR registered in `docs/nclex/tags.md`. Unknown Tags fail the format gate. |

## Source allowlist (defaults)

The skill may WebFetch from these by default:

- **NCSBN** (ncsbn.org, nclex.com) — current NCLEX-RN Test Plan, Joint Statements (Delegation, Restraint, etc.), NCJMM publications. Authoritative for exam scope and Tag mapping.
- **FDA DailyMed** (dailymed.nlm.nih.gov) — official drug labels (prescribing information). Primary source for pharmacology Concepts: indications, contraindications, adverse effects, dosing, monitoring.
- **CDC** (cdc.gov) — infection control, isolation precautions, immunization schedules, transmission routes, outbreak guidance.
- **USPSTF** (uspreventiveservicestaskforce.org) — preventive screening recommendations and grades.
- **AHA / AACN / ACLS / NRP / PALS** — clinical guidelines for resuscitation, critical care, neonatal/pediatric care. Cite specific guideline year and section.
- **NIH / NLM / PubMed Central** (ncbi.nlm.nih.gov, pubmed.ncbi.nlm.nih.gov) — peer-reviewed primary literature; prefer open-access full text.
- **Cochrane Library** (cochranelibrary.com) — systematic reviews; open-access entries only.
- **WHO** (who.int) — global guidelines (e.g., WHO analgesic ladder) where US sources are silent or for international standards.
- **AHRQ** (ahrq.gov) — evidence-based practice center reports, Patient Safety Network (PSNet) primers, Common Formats / CANDOR materials. Closes pedagogical gaps that NCSBN/FDA labels don't cover (e.g., incident-report best practice, patient-safety taxonomy).
- **Joint Commission and CMS** (jointcommission.org public-facing standards pages, cms.gov, ecfr.gov for 42 CFR) — accreditation standards, sentinel-event policy, Conditions of Participation, federal regulations. Cite specific standard / CFR section + retrieval date.
- **Nursing-discipline professional organizations** — published clinical practice guidelines preferred over position statements. Acceptable: AACN (critical care nursing), ENA (emergency), ONS (oncology), AANN (neuroscience), AWHONN (women's health / neonatal), NANN (neonatal), AONL (nursing leadership). Cite version + retrieval date.

The skill **must not** WebFetch from sites that publish copyrighted exam-prep material:
- **Excluded:** Saunders, Kaplan, Hesi, ATI, UWorld, Picmonic, Lippincott / Wolters Kluwer titles, Elsevier titles (Mosby, Saunders), question banks (free or paid), individual study-blog content.

If the user pastes a copyrighted excerpt, that's the user's choice — the skill cites it but does not seek out more from the same source on its own.

## Workflow (5 phases)

### Phase 1 — Identify

Inputs (from user invocation):
- **Required:** Concept name in plain English (e.g., "Five Rights of Delegation", "IV Solution Tonicity", "Insulin Types").
- **Optional:** Sub-objective ID (e.g., `1.3`, `6.7`), suggested Pattern, suggested columns, pasted source material.

Skill derives:
- **Topic folder:** map Concept to one of `01-…` through `08-…` based on the proposed Concept lists in each Topic README. If ambiguous, ask.
- **File path:** `docs/nclex/<topic-folder>/<concept-name-kebab>.md`.
- **Existing-file check:** does the file already exist?
  - **Yes** → branch to Phase 2a (existing-file mode).
  - **No** → proceed to Phase 2b (new-Concept).

Read `docs/nclex/knowledge-map.md` and `docs/nclex/tags.md` once at the start so atomicity rules and the Tag registry are in working memory.

### Phase 2a — Existing-file branch

Read the existing file. Surface its current state (Pattern, Columns, Row count, citation completeness). Ask user:

> The Concept `<name>` already exists at `<path>`. Choose mode:
> - **(1) overwrite** — discard current content, draft fresh
> - **(2) add column** — propose a new column from research, fill its cells
> - **(3) add row** — propose a new row, fill its cells
> - **(4) re-cite** — leave content alone, fill in missing citations from public sources
> - **(5) restructure** — apply current `knowledge-map.md` lint rules (e.g., parens-safety sweep) to the existing content

Once the user picks, run the corresponding sub-flow. Each sub-flow ends in Phase 4 (validation) and Phase 5 (write). Sub-flows preserve as much existing content as possible — never silently rewrite cells the user already authored.

### Phase 2b — Pattern + columns proposal (new Concept)

Initial research pass. Read the Topic README for the relevant sub-objective. Fetch 2–4 source candidates from the allowlist that look most relevant. Read enough to determine:

- **Pattern:** Dimensions / Ordered / Aspects (use the picker in `knowledge-map.md`).
- **Suggested columns:** 4–8 columns for a typical Concept. Lean toward the columns the source structure suggests AND the columns proposed in the Topic README's Concept table (the README is the prior agreement; deviate only with explicit reason).
- **Source list:** the public sources you intend to draw from for cell-filling.
- **Tags:** sub-objective ID, any Integrated Process Tags (`IP-*`), any cross-cutting Tags (`dc-*`, `sys-*`, `state-variance`, `3-cross-aging`, etc.) from the Tag registry.
- **Tag flexibility.** The Topic README's Tag set is a proposal, not a contract. If the Concept's content is fundamentally about a process named in `IP-*` (a documentation artifact → `IP-CD`; a clinical-judgment framework → `IP-CJ`; a teaching artifact → `IP-TL`), the skill MAY add the relevant Tag beyond the README spec. Same applies to other registered cross-cutting Tags when the content warrants. Document the addition in Notes. Unknown / unregistered Tags still fail the format gate per decision 10 — only registered Tags may be added.

Surface to user:

> Proposed structure for `<Concept>`:
> - **Pattern:** Dimensions (rationale: source presents 7 IV solutions × shared attributes per FDA DailyMed labels)
> - **Suggested columns:** Solution | tonicity | fluid shift direction | indication | contraindication | monitoring
> - **Tags:** 6.7, IP-CJ
> - **Sources to use:** [s1] FDA DailyMed Sodium Chloride 0.9% label, [s2] FDA DailyMed Lactated Ringer's label, [s3] CDC Infusion Therapy guidance, [s4] NCSBN NCLEX-RN Test Plan 2026 §6.7
>
> Confirm / adjust / abort?

Wait for user response. Apply adjustments. Do not proceed until confirmed.

### Phase 3 — Cell-fill draft

For each (Row, Column) cell in the proposed structure, do the following in order:

1. **Identify the Facts** for this cell from the source material.
2. **Atomize.** Each `<br>`-separated item is one Fact. Apply the rules in `knowledge-map.md` § Atomicity: no "and"-joined compounds, no comma-joined lists, no parentheticals (run the parenthetical safety check on every cell value before writing).
3. **Cite.**
   - Attach `[sN]` to the cell. If the cell's Facts come from different sources, escalate to per-Fact citations: `Fact A [s1]<br>Fact B [s2]<br>Fact C [s1]`.
   - **Synthesis-by-direct-derivation.** If a cell's content is a mechanical inversion or restatement of a principle stated in a sourced text (e.g., source: "patient must be stable"; cell: "Is the patient's condition stable?"), cite the source AND add a Notes bullet disclosing the transformation. Do NOT mark these `[needs source]` and do NOT list them in the unsourced-values table — those are reserved for cells with no traceable primary source. Mechanical synthesis is a sourced cell with a transformation note.
4. **Mark gaps.** If sources don't cover this cell adequately, write `[needs source]` instead of inferring or guessing. Track these for the coverage report.

Maintain the citation registry in memory; it will be written at file bottom in Phase 5.

### Phase 4 — Validation

#### Phase 4a — Format auto-gate (mechanical)

Run all lints from `knowledge-map.md`:

- Atomicity (no "and", no comma-lists, no parens — apply the parenthetical safety check)
- Pattern declared in metadata line
- Topic ID and sub-objective Tags declared
- All Tags valid (every Tag must be a sub-objective ID matching the Topic's README, OR registered in `docs/nclex/tags.md`)
- Status field present
- Layout convention noted (especially for Ordered)
- Engine demo opportunities use coordinate notation (no English question words)
- File name kebab-case and short

If any lint fails, **flag and pause**. Surface the violation with a proposed fix:

> Lint: `Elevated (>140/90)` at row HTN stage 2, column BP status triggers parenthetical-safety rule 1 — stripping the parenthetical exposes a shared Value with HTN stage 1's row (`Elevated (>130/80)` → `Elevated`).
> Proposed: split into a `BP status` column (`Elevated` / `Elevated`) and a `threshold` column (`>140/90` / `>130/80`). The shared `Elevated` value becomes engine-detectable. Apply / adjust / skip?

Tag-registry lint example:

> Lint: Tag `dc-statins` used in row Atorvastatin is not in `docs/nclex/tags.md`. Either (a) add it to the registry now, or (b) remove from the Concept. Tags must be registered before use.

Do not advance to Phase 4b until format passes. Format is qualitatively different from content reviews — a malformed Concept can't be evaluated for content.

#### Phase 4b — Combined content review (citation + exam fit)

Once format passes, surface a single combined report:

> **Content review for `<Concept>`:**
>
> **Citation coverage:** N of M cells fully traced. K cells have `[needs source]` markers (gap list below).
>
> **Per-cell citation map:**
> | Cell | Sources | Confidence |
> |---|---|---|
> | 0.9% NS × tonicity | [s1] | High (direct from FDA label "Description") |
> | LR × indication | [s2, s3] | High (label + CDC concur) |
> | 3% NS × monitoring | [needs source] | Gap — DailyMed label silent on neuro-checks frequency |
>
> **Exam fit (vs NCSBN Related Content §6.7 and Topic 6 README):**
> - Sub-objectives covered: 6.7 ✓
> - Cross-Tags applied: IP-CJ ✓
> - Topic README columns matched: Solution | tonicity | fluid shift direction | indication | contraindication | monitoring ✓
> - Rows covered vs README proposal: 7 proposed, 7 in table ✓
>
> **Gaps to resolve:**
> 1. 3% NS × monitoring — paste source or accept gap (will land in unsourced-values table)
> 2. — none other
>
> Address any/all, then re-run validation; or approve as-is.

User addresses gaps by pasting sources, accepting marked gaps, or scope-adjusting. Re-run Phase 4 after edits until user approves.

### Phase 5 — Write

On approval:

1. Write the file to `docs/nclex/<topic-folder>/<concept-name-kebab>.md`.
2. Include the citation registry at the bottom (Sources section, format below).
3. Include a Notes section. Lead with a `**Cell convention:**` bullet (this is the convention across the existing Concept set).
4. If any cells carry `[needs source]` markers OR rely on pedagogical-consensus framing with no traced primary citation, convert those inline gaps into a `### Values without a direct public citation` table inside Notes (columns: Cell | Value | Why unsourced). This is the canonical SME-review punch list — it must be present whenever the draft has unsourced cells, even if only one. If every cell is fully cited, include the table with a `(none)` row so the all-cited status is visible.
5. **Do NOT** stage or commit. The user owns git operations — they may want to bundle multiple Concepts into one commit.
6. Surface a one-line summary: "Wrote `docs/nclex/06-…/iv-solution-tonicity.md` (7 rows × 6 columns, 4 sources cited, 1 cell in the unsourced-values table)."

## Reference: Concept file format

Until NCLEX has reference Concepts of its own, model after `docs/cissp/04-communication-and-network-security/tcp-udp-sctp.md` and the format below. The metadata line uses **Topic** (NuQuiz term for NCLEX sub-categories) instead of CISSP's **Domain**. Required sections:

```markdown
# <Concept Name>

**Topic:** <N> — <Sub-category Name> &nbsp;|&nbsp; **Pattern:** <Dimensions|Ordered|Aspects> &nbsp;|&nbsp; **Tags:** <sub-objective IDs, IP-* tags, cross-cutting tags>
**Status:** draft (SME review pending)

<1-paragraph rationale: what this Concept is and why it's NCLEX-relevant.>

<For Ordered: include a "Layout convention" line describing row order and column progression.>

| <Header row> |
|---|---|---|---|
| <data rows with [sN] citation tags> |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. No parentheticals in cells.
- <Any context stripped from cells per the parens rules (mechanism details, abbreviations, editorial notes).>
- <Common exam confusions; cross-Concept link bullets to siblings ("Sibling Concept X covers Y; this one focuses on Z"); out-of-scope bullet listing items deliberately excluded.>

### Tricky distractors

(Optional H3 subsection. Use when the Concept has well-known confusion pairings the engine can probe via composite-row swaps. Skip if there are none.)

- **<Confusion A> vs <Confusion B>.** <How they're commonly confused and what disambiguates them.>

### Values without a direct public citation

(Required whenever any cell carries `[needs source]` in the draft, OR any cell value reflects nursing-pedagogy-consensus framing without a traced primary source. If every cell is fully cited, include the table with a single `(none)` row so the all-cited status is visible.)

| Cell | Value | Why unsourced |
|---|---|---|
| <Row × Column> | <cell value> | <reason — e.g., "widely-taught nursing pedagogy, no canonical NCSBN/FDA/CDC source for the specific framing"> |

## Engine demo opportunities

- `<Row> | <Column> → ?` → <Value>. <Optional: distractor sourcing notes.>
- (etc. — coordinate notation only, no English question words)

## Sources

- `[s1]`: NCSBN NCLEX-RN Test Plan 2026 §6.7 (retrieved YYYY-MM-DD, https://www.ncsbn.org/publications/2026-nclex-rn-test-plan)
- `[s2]`: FDA DailyMed Sodium Chloride 0.9% Injection USP, current label revision (retrieved YYYY-MM-DD, https://dailymed.nlm.nih.gov/...)
- `[s3]`: CDC Infusion Therapy Standards (retrieved YYYY-MM-DD, https://www.cdc.gov/...)
- `[s4]`: <author/publisher, version, section, retrieval date, URL or DOI>
```

Every registry entry must include: source identifier (publication + version + year), section/page locator (specific span), retrieval date, and a stable URL or DOI when available. **Retrieval date is mandatory** for any web source.

## What this skill does not do

- **Multiple Concepts at once.** Out of scope. Invoke the skill N times.
- **Edit the knowledge-map, tag registry, or Topic README files.** Out of scope. The skill MAY read them, but never modifies them. (If a new cross-cutting Tag is needed, the skill flags it during Phase 4a and asks the user to register it in `tags.md` before continuing.)
- **LLM-generated question text.** The engine builds prompts mechanically; this skill does not generate sample questions in English. Engine demo opportunities are written as coordinates only.
- **Auto-commit.** User owns git.
- **Source extraction from copyrighted material the user did not paste.** Hard rule. The skill stays on the public-sources allowlist (NCSBN, FDA DailyMed, CDC, USPSTF, AHA/AACN/ACLS/NRP, NIH/PubMed, Cochrane, WHO, professional-org clinical guidelines) and explicitly excludes Saunders / Kaplan / Hesi / ATI / UWorld / Lippincott / Elsevier / Picmonic / question banks.
- **Clinical advice.** Concept content is for exam preparation. The skill does not generate or validate clinical decision-making for actual patient care.

## Open settings (user can override per-invocation)

- **Source allowlist:** add or remove sources for this invocation.
- **Sub-objective tag:** override the skill's inferred tag.
- **Topic folder:** override if the Concept naturally crosses Topics.
- **Pattern:** if the user has a strong opinion, declare at invocation and skip the proposal step.
