# Software Maturity Models

**Domain:** 8 — Software Development Security &nbsp;|&nbsp; **Pattern:** Dimensions &nbsp;|&nbsp; **Tags:** 8.2
**Status:** draft (SME review pending)

The three software maturity models CISSP candidates should discriminate. CMMI is the broad software-engineering maturity model used heavily in government contracting; OWASP SAMM is the application-security-specific prescriptive model; BSIMM is the application-security-specific *descriptive* model — it documents what real organizations actually do rather than prescribing what they should do. The prescriptive vs descriptive axis is the most distinctive discriminator on the exam: BSIMM is the only descriptive entry in the set.

| Model | scope | level structure | prescriptive vs descriptive | typical use | public benchmarks |
|---|---|---|---|---|---|
| CMMI | Software engineering processes [s1] | 5 levels [s1] | Prescriptive | Government contracting<br>Large enterprises | Appraisal results private |
| OWASP SAMM | Application security [s2] | 4 levels [s2] | Prescriptive [s2] | Application security programs | SAMM benchmark initiative |
| BSIMM | Application security [s3] | 3 levels per activity [s3] | Descriptive [s3] | Industry comparison | BSIMM annual report [s3] |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. **No parentheticals in cells.** Model name expansions (CMMI = Capability Maturity Model Integration; SAMM = Software Assurance Maturity Model; BSIMM = Building Security In Maturity Model) live in this section.
- **Acronym expansions.** `CMMI` = Capability Maturity Model Integration (now CMMI v3.0, maintained by ISACA after acquiring the CMMI Institute). `SAMM` = Software Assurance Maturity Model (OWASP, currently v2). `BSIMM` = Building Security In Maturity Model (originally Cigital, now Synopsys-owned, currently BSIMM15).
- **Prescriptive vs descriptive — the defining discriminator.** CMMI and OWASP SAMM tell you what activities to perform at each maturity level (a prescriptive recipe). BSIMM observes what activities member organizations *actually* perform and reports the distribution; an organization compares its own activities against the BSIMM observations to see where it falls in the industry distribution. This descriptive framing is what makes BSIMM unique — it cannot tell you what *should* be done, only what is being done.
- **CMMI level structure.** Five maturity levels: Initial → Managed → Defined → Quantitatively Managed → Optimizing. Sibling Concept `cmmi-maturity-levels` covers the per-level detail. CMMI v3.0 (released 2023) renamed and restructured some practice areas but kept the five-level scale.
- **OWASP SAMM level structure.** Four maturity levels (0 through 3) across five business functions (Governance, Design, Implementation, Verification, Operations) — 15 security practices total. Each practice has Level 0 ("starting point") through Level 3 ("comprehensive coverage"). The flat 4-level scale is what the cell records.
- **BSIMM level structure.** Each documented activity is tagged Level 1, 2, or 3 — Level 1 activities are observed in most participating firms, Level 2 in about half, Level 3 in a minority. There is no per-organization aggregate "BSIMM level"; instead, an organization sees which Level-1/2/3 activities it performs and where its distribution lies relative to peers.
- **OWASP SAMM aligns by SDLC phase.** The five SAMM business functions map roughly to SDLC phases (Design/Verification/Operations are explicit). This is why `security-activities-by-phase` cites SAMM as a primary reference for the per-phase activity catalogue.
- **CMMI is not security-specific.** CMMI emerged from software-engineering process maturity, not application security. CMMI Level 5 says nothing about whether secure-coding practices are followed; it says the organization's *process* is statistically optimized. CMMI + SAMM is a common pairing for organizations that need both engineering-process maturity and security maturity.
- **Out of scope for this Concept:** CMMI level-by-level detail (separate Concept — `cmmi-maturity-levels`), SAMM business-function detail, BSIMM activity catalogue (~120 activities), ISO/IEC 33000 series (CMMI's ISO equivalent), software-process improvement programs (PSP, TSP).

### Tricky distractors

- **BSIMM is descriptive; SAMM/CMMI are prescriptive.** Most distinctive feature. Wrong-answer pattern: claiming BSIMM tells you what to do — it observes what others do.
- **CMMI is not security-specific.** Process maturity, not security maturity. Wrong-answer pattern: claiming CMMI Level 5 implies secure software — process optimization ≠ security.
- **CMMI = 5 levels; SAMM = 4 levels; BSIMM = 3 levels per activity.** Wrong-answer pattern: claiming all use the same level structure.
- **SAMM has 5 business functions, not 5 levels.** Common confusion. Wrong-answer pattern: claiming SAMM uses 5 maturity levels — it uses 4 levels across 5 business functions.
- **BSIMM levels are per-activity, not per-organization.** No aggregate BSIMM score. Wrong-answer pattern: claiming an org has a "BSIMM level" — they have a distribution of Level 1/2/3 activities.
- **CMMI + SAMM is a common pairing.** Engineering maturity + security maturity. Wrong-answer pattern: claiming organizations must pick one model — they layer.

### Values without a direct public citation

| Cell | Value | Why unsourced |
|---|---|---|
| CMMI × prescriptive vs descriptive | `Prescriptive` | Universal industry framing; CMMI v3.0 documentation [s1] does not use the prescriptive/descriptive vocabulary explicitly. |
| CMMI × typical use | `Government contracting`, `Large enterprises` | Industry-convention framing; CMMI v3.0 documentation does not name canonical use cases. |
| CMMI × public benchmarks | `Appraisal results private` | CMMI appraisals (Maturity Level certifications) are organization-private; no public benchmark dataset published by ISACA. |
| OWASP SAMM × typical use | `Application security programs` | Pedagogical summary; SAMM v2 documentation [s2] lists target audience in broader terms. |
| BSIMM × typical use | `Industry comparison` | The defining use-case but not a direct quote from the BSIMM annual report. |

## Engine demo opportunities

- `CMMI | level structure → ?` → `5 levels`
- `OWASP SAMM | level structure → ?` → `4 levels`
- `BSIMM | level structure → ?` → `3 levels per activity`
- `BSIMM | prescriptive vs descriptive → ?` → `Descriptive`
- `? | prescriptive vs descriptive → Prescriptive` → `CMMI`, `OWASP SAMM` — shared-Value select-all
- `? | scope → Application security` → `OWASP SAMM`, `BSIMM` — shared-Value select-all
- `? | scope → Software engineering processes` → `CMMI`
- `? | public benchmarks → BSIMM annual report` → `BSIMM`
- Composite BSIMM Row with `prescriptive vs descriptive` swapped to `Prescriptive` — directly tests the descriptive nature of BSIMM (the single most distinctive Fact about the model)
- Composite CMMI Row with `scope` swapped to `Application security` — tests CMMI's broad scope (process maturity, not security specifically)
- Composite OWASP SAMM Row with `level structure` swapped to `5 levels` — tests SAMM's 4-level scale against CMMI's 5-level scale

## Sources

- `[s1]`: CMMI Institute (now ISACA), "CMMI Model" v3.0 — Capability Maturity Model Integration documentation (retrieved 2026-04-25, https://cmmiinstitute.com/cmmi)
- `[s2]`: OWASP, "Software Assurance Maturity Model (SAMM)" v2 — five business functions, four maturity levels (retrieved 2026-04-25, https://owaspsamm.org/)
- `[s3]`: Synopsys (now Black Duck), "Building Security In Maturity Model (BSIMM15)" — descriptive software security maturity report (retrieved 2026-04-25, https://www.bsimm.com/)
