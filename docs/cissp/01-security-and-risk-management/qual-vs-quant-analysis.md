# Qualitative vs Quantitative Analysis

**Domain:** 1 — Security and Risk Management &nbsp;|&nbsp; **Pattern:** Dimensions &nbsp;|&nbsp; **Tags:** 1.10
**Status:** draft (SME review pending)

The two pure approaches to risk analysis plus the hybrid that combines them. Qualitative analysis describes risk in *categorical* terms (high / medium / low); quantitative analysis describes it in *numeric* terms (expected dollar loss). Hybrid uses one approach to triage and the other for deep analysis where it matters. The CISSP exam tests both the categorical distinctions and the matchup between situation and method.

| approach | output | required data | strengths | weaknesses | when used |
|---|---|---|---|---|---|
| Qualitative | High/Medium/Low ratings [s1] | Subjective expert judgment [s1] | Fast to execute [s1] | Subjective ratings hard to compare across reviewers [s1] | Initial triage [s1] |
| Quantitative | Annual expected loss in monetary terms [s1] | Asset value [s1]<br>Loss probability [s1]<br>Loss magnitude [s1] | Comparable across assets and decisions [s1] | Requires data that may not exist [s1] | Investment justification [s1] |
| Hybrid | Qualitative triage with quantitative deep-dive [s1] | Both subjective and numeric inputs [s1] | Pragmatic balance [s1] | Process complexity [needs source] | Mature risk programs [needs source] |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. No parentheticals in cells.
- **Tag 1.10 retained from stub.** Maps to (ISC)² 2024 outline §1.10 *Apply risk-based management concepts*. Sibling Concept: `quantitative-risk-formulas.md` (the SLE/ARO/ALE math the quantitative row depends on).
- **Why hybrid is the practical reality.** Pure qualitative leaves money decisions ungrounded; pure quantitative requires data that often does not exist for novel or rare events. Mature risk programs use qualitative triage (catalogue all risks at H/M/L) and reserve quantitative analysis for the top-tier risks where investment justification requires defensible numbers.
- **Subjectivity is the qualitative weakness.** Two reviewers given the same scenario can rate it differently because there is no objective rubric. Modern qualitative methods reduce this by using anchored rating scales (e.g., "high = >$1M loss potential") — but at that point the method has crossed into hybrid.
- **Quantitative requires probability *and* magnitude.** ALE = ARO × SLE. The Annualized Rate of Occurrence (ARO) is how often the loss happens per year (probability dimension); the Single Loss Expectancy (SLE) is what one occurrence costs (magnitude dimension). Both inputs are required; both are typically uncertain.
- **The hardest input to quantitative analysis is rare-event ARO.** A breach that happens once every five years has ARO = 0.2; a breach that has never happened in this organization but is plausible has ARO = ? — the analyst must pick a number based on industry data, expert judgment, or threat-intelligence base rates. This is where quantitative analysis can be misleading: the numbers look precise but rest on subjective assumptions.
- **Both approaches feed the same downstream decisions.** Risk treatment choices (mitigate / accept / transfer / avoid — see `risk-treatment.md`) are made based on the analysis output, regardless of method. The choice of method affects *how confidently* the decision is made, not *what* decisions are available.
- **Gaps marked `[needs source]`:** two Facts — hybrid weaknesses and "when used" framing. Practitioner consensus but not yet sourced to a primary publication.

## Engine demo opportunities

- `? | output → Annual expected loss in monetary terms` → Quantitative
- `Qualitative | required data → ?` → `Subjective expert judgment`
- `? | when used → Initial triage` → Qualitative
- `Quantitative | weaknesses → ?` → `Requires data that may not exist`
- `Hybrid | output → ?` with `High/Medium/Low ratings` (Qualitative) and `Annual expected loss in monetary terms` (Quantitative) as distractors
- Composite Row profile: Qualitative across all Columns with `output` swapped to `Annual expected loss in monetary terms` (Quantitative's value)

## Sources

- `[s1]`: NIST SP 800-30 Rev. 1 *Guide for Conducting Risk Assessments*, September 2012 — particularly §3.1 risk assessment approaches (qualitative, quantitative, semi-quantitative) (retrieved 2026-04-26, https://csrc.nist.gov/pubs/sp/800/30/r1/final)
- `[s2]`: (ISC)² CISSP Certification Exam Outline, effective 2024-04-15, Domain 1 §1.10 *Apply risk-based management concepts* (retrieved 2026-04-26, https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline)
