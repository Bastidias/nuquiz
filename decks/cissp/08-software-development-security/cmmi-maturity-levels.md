# CMMI Maturity Levels

**Domain:** 8 — Software Development Security &nbsp;|&nbsp; **Pattern:** Ordered &nbsp;|&nbsp; **Tags:** 8.2
**Status:** draft (SME review pending)

The five staged maturity levels of CMMI [s1]. Ordered because the levels are a strict progression — an organization assessed at Level 3 must satisfy all Level 2 requirements first. Sibling Concept to `software-maturity-models`. CISSP testing typically asks the level-name pairing (Level 3 = Defined, Level 5 = Optimizing) and the boundary characteristics (where statistical management starts, where continuous improvement begins).

**Layout convention:** rows are levels in increasing maturity order. Columns are attributes of each level ordered left → right from least detail (Name) to most detail (Typical Practice).

| Level | Name | Characteristic | Typical Practice |
|---|---|---|---|
| 1 | Initial [s1] | Ad hoc<br>Unpredictable [s1] | Heroic effort<br>Reactive firefighting |
| 2 | Managed [s1] | Project-level discipline [s1] | Requirements management<br>Project planning<br>Configuration management [s1] |
| 3 | Defined [s1] | Organization-wide standard processes [s1] | Process tailoring from organizational standards<br>Training program [s1] |
| 4 | Quantitatively Managed [s1] | Statistically controlled [s1] | Quantitative process performance<br>Statistical management [s1] |
| 5 | Optimizing [s1] | Continuous improvement [s1] | Causal analysis<br>Process innovation [s1] |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. **No parentheticals in cells.** CMMI level names use the canonical CMMI v3.0 spelling.
- **Staged representation.** This Concept reflects the CMMI staged representation (a single overall maturity level for the organization). CMMI also defines a continuous representation that scores individual capability areas independently; CISSP testing focuses on the staged 1-5 level set.
- **Level 1 is not "no process" — it is "no consistent process."** Every organization has *some* process; Level 1 means the process is ad hoc, person-dependent, and not reliably repeatable. Outputs depend on individual heroics rather than organizational capability.
- **Level 2 vs Level 3 — project vs organization.** Level 2 ("Managed") requires that *individual projects* follow defined practices; Level 3 ("Defined") requires that the *organization* has standard processes that projects tailor from. The level boundary is "is process discipline a project-level achievement or an organization-level baseline."
- **Level 4 introduces statistics.** Quantitatively Managed means the organization measures process performance with statistical rigor — control charts, performance baselines, prediction models. Without quantitative data, an organization can be at most Level 3.
- **Level 5 requires Level 4.** Optimizing means using the Level-4 quantitative data to drive continuous process improvement (causal analysis of defects, controlled experiments with new techniques). An organization cannot reach Level 5 without first reaching Level 4 — there is no "intuitive optimization" path.
- **CMMI v3.0 (2023) restructuring.** CMMI v3.0 reorganized Practice Areas (the lower-level groupings within each level) but kept the five maturity levels intact. Level numbers and names in this Concept hold across CMMI v1.3, v2.0, and v3.0.
- **Out of scope for this Concept:** CMMI Practice Areas (Engineering, Project Management, etc.), CMMI v3.0 vs v2.0 vs v1.3 specific changes, the continuous representation, CMMI for Services (CMMI-SVC) and CMMI for Acquisition (CMMI-ACQ), ISO/IEC 33000 (the ISO equivalent), individual appraisal methods (SCAMPI, SCAMPI Lite).

### Tricky distractors

- **Level names.** 1=Initial, 2=Managed, 3=Defined, 4=Quantitatively Managed, 5=Optimizing. Wrong-answer pattern: swapping names with levels — exact pairing is testable.
- **Level 2 = project-level; Level 3 = organization-level.** Discipline scope. Wrong-answer pattern: collapsing them — boundary between project-only and organization-wide is the L2/L3 distinction.
- **Level 4 introduces statistics.** Quantitative measurement. Wrong-answer pattern: claiming Level 3 includes statistical management — that's Level 4's defining feature.
- **Level 5 requires Level 4.** Optimizing builds on quantitative data. Wrong-answer pattern: claiming you can leap to Level 5 without Level 4 — strict progression.
- **Level 1 is "ad hoc," not "no process."** Every org has process. Wrong-answer pattern: claiming Level 1 means no process exists — it means inconsistent.
- **Staged vs Continuous representation.** Staged = one overall level. Continuous = per-area scoring. Wrong-answer pattern: assuming all CMMI use Staged — both representations exist; CISSP focuses on Staged.

### Values without a direct public citation

| Cell | Value | Why unsourced |
|---|---|---|
| Level 1 × Typical Practice | `Heroic effort`, `Reactive firefighting` | Industry-pedagogical descriptions of Level 1 organizational behavior; not direct CMMI Institute [s1] phrasing. |
| Level 4 × Typical Practice | `Quantitative process performance`, `Statistical management` | Paraphrases CMMI Practice Area names; no single direct quote captured. |
| Level 5 × Typical Practice | `Causal analysis`, `Process innovation` | Paraphrases CMMI v3.0 Causal Analysis and Resolution practice; no direct quote captured. |

## Engine demo opportunities

- `Level 3 | Name → ?` → `Defined`
- `Level 5 | Name → ?` → `Optimizing`
- `? | Name → Initial` → `Level 1`
- `? | Name → Quantitatively Managed` → `Level 4`
- `Level 4 | Characteristic → ?` → `Statistically controlled`
- `? | Characteristic → Continuous improvement` → `Level 5`
- Sequence (adjacency): `Level following (Level n | Name → Defined) | Name → ?` → `Quantitatively Managed`
- Sequence (adjacency): `Level preceding (Level n | Name → Optimizing) | Name → ?` → `Quantitatively Managed`
- Composite Level 3 Row with `Name` swapped to `Optimizing` — directly tests the level-name pairing (Defined is Level 3; Optimizing is Level 5)
- Composite Level 4 Row with `Characteristic` swapped to `Continuous improvement` — tests the L4/L5 boundary (statistical management vs continuous improvement)
- Composite Level 5 Row with `Characteristic` swapped to `Ad hoc` — tests the maturity polarity (Level 5 is the *most* mature; Initial is Level 1)

## Sources

- `[s1]`: CMMI Institute (now ISACA), "CMMI Model" v3.0 — five maturity levels and per-level practice areas (retrieved 2026-04-25, https://cmmiinstitute.com/cmmi)
- `[s2]`: ISACA, "CMMI V3.0 — Released April 2023" announcement and overview (retrieved 2026-04-25, https://www.isaca.org/credentialing/cmmi)
