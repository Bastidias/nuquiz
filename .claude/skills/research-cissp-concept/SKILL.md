---
name: research-cissp-concept
description: Research and author ONE CISSP Concept (one .md file under decks/cissp/) from public sources, with per-Cell citations, format-lint pass, and exam-coverage review. Branches into edit mode if the Concept already exists. Use when the user asks to research, draft, author, expand, refresh-citations, or restructure a CISSP Concept. Do NOT use for non-CISSP content, for batch authoring multiple Concepts at once, or for editing the knowledge-map / demo / strategy files.
---

# Research a CISSP Concept

Research-and-author skill for filling out CISSP demo content one Concept at a time. Operates against the rules in `decks/cissp/knowledge-map.md` (atomicity, no parens-masking-shared-Values, deterministic prompt notation) and the Pattern picker (Dimensions / Ordered / Aspects).

## Foundational decisions baked in

These were settled during skill design and should not be re-litigated mid-flow without explicit user instruction:

| # | Decision | Choice |
|---|---|---|
| 1 | Scope per invocation | One Concept (one .md file) |
| 2 | Source strategy | Hybrid: skill fetches public defaults, user can paste extras. **Never extract from copyrighted material the user did not paste.** |
| 3 | Citation granularity | Per-Cell, escalate to per-Fact when a cell's Facts come from different sources |
| 4 | Pattern + columns | Skill proposes from initial research; user confirms before cell-filling |
| 5 | Validation behavior | Flag and pause with proposed fix; do not auto-fix silently |
| 6 | Review composition | Format auto-gates first (mechanical); then citation + exam fit surfaced together as one review pass |
| 7 | Citation format | Numbered source IDs in cells (`[s1]`, `[s2]`); full registry at file bottom |
| 8 | Existing-file handling | Detect existing → ask which mode (overwrite / add column / add row / re-cite / restructure) |
| 9 | Source insufficiency | Draft what's covered; mark gaps with `[needs source]`; coverage report flags how much is unsourced |

## Source allowlist (defaults)

The skill may WebFetch from these by default:

- **(ISC)² Exam Outline (current effective version)** — authoritative scope. Used to map sub-objective tags and check exam fit.
- **NIST publications** (csrc.nist.gov, especially SP 800-series and FIPS) — primary source for many CISSP topics (BCP, risk, crypto, controls).
- **RFC Editor** (rfc-editor.org) — networking protocols.
- **OWASP** (owasp.org) — application security.
- **MITRE** (mitre.org, attack.mitre.org) — threat / attack taxonomies.
- **CIS** (cisecurity.org) — controls and benchmarks.
- **ENISA** (enisa.europa.eu) — EU security guidance, useful for some Domain 1 sub-objectives.
- **Vendor blogs and educational pages** — case-by-case. Prefer authoritative vendors (Cisco, Cloudflare, AWS Security) over individual bloggers. Always cite version + retrieval date.

The skill **must not** WebFetch from sites that publish copyrighted exam-prep material (e.g., paid CISSP study guides, leaked question banks). If the user pastes a copyrighted excerpt, that's the user's choice — the skill cites it but does not seek out more from the same source on its own.

## Workflow (5 phases)

### Phase 1 — Identify

Inputs (from user invocation):
- **Required:** Concept name in plain English (e.g., "BCP Phases", "Symmetric Algorithms", "TLS 1.2 Handshake").
- **Optional:** Sub-objective ID (e.g., `1.8`), suggested Pattern, suggested columns, pasted source material.

Skill derives:
- **Domain folder:** map Concept to one of `01-…` through `08-…` based on (ISC)² outline. If ambiguous, ask.
- **File path:** `decks/cissp/<domain-folder>/<concept-name-kebab>.md`.
- **Existing-file check:** does the file already exist?
  - **Yes** → branch to Phase 2a (existing-file mode).
  - **No** → proceed to Phase 2b (new-Concept).

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

Initial research pass. Fetch the (ISC)² outline section for the relevant sub-objective. Fetch 2–4 source candidates from the allowlist that look most relevant. Read enough to determine:

- **Pattern:** Dimensions / Ordered / Aspects (use the picker in `knowledge-map.md`).
- **Suggested columns:** 4–8 columns for a typical Concept. Lean toward the columns the source structure suggests.
- **Source list:** the public sources you intend to draw from for cell-filling.

Surface to user:

> Proposed structure for `<Concept>`:
> - **Pattern:** Ordered (rationale: source presents 7 sequential phases per NIST SP 800-34 §3)
> - **Suggested columns:** Phase | Name | Key Activity | Typical Output
> - **Sub-objective tag:** 1.8
> - **Sources to use:** [s1] NIST SP 800-34 R1 (csrc.nist.gov), [s2] (ISC)² Exam Outline 2024 §1.8
>
> Confirm / adjust / abort?

Wait for user response. Apply adjustments. Do not proceed until confirmed.

### Phase 3 — Cell-fill draft

For each (Row, Column) cell in the proposed structure, do the following in order:

1. **Identify the Facts** for this cell from the source material.
2. **Atomize.** Each `<br>`-separated item is one Fact. Apply the rules in `knowledge-map.md` § Atomicity: no "and"-joined compounds, no comma-joined lists, no parentheticals (run the parenthetical safety check on every cell value before writing).
3. **Cite.** Attach `[sN]` to the cell. If the cell's Facts come from different sources, escalate to per-Fact citations: `Fact A [s1]<br>Fact B [s2]<br>Fact C [s1]`.
4. **Mark gaps.** If sources don't cover this cell adequately, write `[needs source]` instead of inferring or guessing. Track these for the coverage report.

Maintain the citation registry in memory; it will be written at file bottom in Phase 5.

### Phase 4 — Validation

#### Phase 4a — Format auto-gate (mechanical)

Run all lints from `knowledge-map.md`:

- Atomicity (no "and", no comma-lists, no parens — apply the parenthetical safety check)
- Pattern declared in frontmatter
- Sub-objective Tags declared
- Status field present
- Layout convention noted (especially for Ordered)
- Engine demo opportunities use coordinate notation (no English question words)
- File name kebab-case and short

If any lint fails, **flag and pause**. Surface the violation with a proposed fix:

> Lint: `Reliable (retransmission of lost segments)` at row TCP, column reliability triggers parenthetical-safety rule 1 — stripping the parenthetical exposes a shared Value with SCTP's row.
> Proposed: split into a `reliability` column (`Reliable` / `Unreliable`) and a `reliability mechanism` column (`Retransmission of lost segments` / `None`). Apply / adjust / skip?

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
> | TCP × reliability | [s1] | High (direct quote from RFC 793 §1.5) |
> | UDP × typical use cases | [s2, s3] | High (multiple sources agree) |
> | SCTP × max header size | [needs source] | Gap — public sources say "12 bytes minimum" but max not specified |
>
> **Exam fit (vs ISC² outline §1.8):**
> - Sub-objectives covered: 1.8.1, 1.8.2 ✓
> - Sub-objectives missing: 1.8.3 (alternative recovery sites)
> - Depth check: NIST §3.4.5 covers 7 phases; all 7 represented in table ✓
>
> **Gaps to resolve:**
> 1. SCTP max header size — paste source or accept gap
> 2. Sub-objective 1.8.3 not covered — out of scope for this Concept, or add a row?
>
> Address any/all, then re-run validation; or approve as-is.

User addresses gaps by pasting sources, accepting marked gaps, or scope-adjusting. Re-run Phase 4 after edits until user approves.

### Phase 5 — Write

On approval:

1. Write the file to `decks/cissp/<domain-folder>/<concept-name-kebab>.md`.
2. Include the citation registry at the bottom (Sources section, format below).
3. Include a Notes section if any context was stripped from cells (mechanism details, abbreviations) per the parens rules. Lead with a `**Cell convention:**` bullet (this is the convention across the existing Concept set).
4. If any cells carry `[needs source]` markers OR rely on pedagogical-consensus framing with no traced primary citation, convert those inline gaps into a `### Values without a direct public citation` table inside Notes (columns: Cell | Value | Why unsourced). This is the canonical SME-review punch list — it must be present whenever the draft has unsourced cells, even if only one. If every cell is fully cited, include the table with a `(none)` row so the all-cited status is visible.
5. **Do NOT** stage or commit. The user owns git operations — they may want to bundle multiple Concepts into one commit.
6. Surface a one-line summary: "Wrote `decks/cissp/01-…/bcp-phases.md` (7 rows × 4 columns, 8 sources cited, 2 cells in the unsourced-values table)."

## Reference: Concept file format

Match the format of existing Concepts in `decks/cissp/04-communication-and-network-security/`. Required sections:

```markdown
# <Concept Name>

**Domain:** <N> — <Domain Name> &nbsp;|&nbsp; **Pattern:** <Dimensions|Ordered|Aspects> &nbsp;|&nbsp; **Tags:** <sub-objective IDs>
**Status:** draft (SME review pending)

<1-paragraph rationale: what this Concept is and why it's CISSP-relevant.>

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

(Required whenever any cell carries `[needs source]` in the draft, OR any cell value reflects pedagogical-consensus framing without a traced primary source. If every cell is fully cited, include the table with a single `(none)` row so the all-cited status is visible.)

| Cell | Value | Why unsourced |
|---|---|---|
| <Row × Column> | <cell value> | <reason — e.g., "widely-documented industry pattern, no canonical RFC/NIST reference"> |

## Engine demo opportunities

- `<Row> | <Column> → ?` → <Value>. <Optional: distractor sourcing notes.>
- (etc. — coordinate notation only, no English question words)

## Sources

- `[s1]`: NIST SP 800-34 R1 §3.4.5 (retrieved 2026-04-19, https://csrc.nist.gov/publications/detail/sp/800-34/rev-1/final)
- `[s2]`: (ISC)² CISSP Exam Outline 2024 §1.8 (retrieved 2026-04-19, https://www.isc2.org/...)
- `[s3]`: <author/publisher, version, section, retrieval date, URL or DOI>
```

Every registry entry must include: source identifier (publication + version + year), section/page locator (specific span), retrieval date, and a stable URL or DOI when available. **Retrieval date is mandatory** for any web source.

## What this skill does not do

- **Multiple Concepts at once.** Out of scope. Invoke the skill N times.
- **Edit the knowledge-map, demo files, or other non-Concept docs.** Out of scope.
- **LLM-generated question text.** The engine builds prompts mechanically; this skill does not generate sample questions in English. Engine demo opportunities are written as coordinates only.
- **Auto-commit.** User owns git.
- **Source extraction from copyrighted material the user did not paste.** Hard rule. The skill stays on the public-sources allowlist unless the user explicitly drops in a copyrighted excerpt.

## Open settings (user can override per-invocation)

- **Source allowlist:** add or remove sources for this invocation.
- **Sub-objective tag:** override the skill's inferred tag.
- **Domain folder:** override if the Concept naturally crosses domains.
- **Pattern:** if the user has a strong opinion, declare at invocation and skip the proposal step.
