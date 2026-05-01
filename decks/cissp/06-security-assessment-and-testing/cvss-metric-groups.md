# CVSS Metric Groups

**Domain:** 6 — Security Assessment and Testing &nbsp;|&nbsp; **Pattern:** Dimensions &nbsp;|&nbsp; **Tags:** 6.4
**Status:** draft (SME review pending)

The three metric groups in CVSS v3.1 [s1]. Base captures the intrinsic characteristics of a vulnerability that don't change over time or across environments; Temporal captures characteristics that *do* change over time as threat intelligence evolves; Environmental captures characteristics specific to the deploying organization. Most published CVSS scores (in NVD, vendor advisories) include only the Base score because that is the only group everyone can compute identically; Temporal and Environmental scores require the consuming organization's context.

| Group | what it captures | mutability |
|---|---|---|
| Base | Intrinsic vulnerability characteristics [s1] | Constant over time |
| Temporal | Characteristics that change as threat landscape evolves [s1] | Changes over time |
| Environmental | Organization-specific impact [s1] | Varies by deployment |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. **No parentheticals in cells.**
- **CVSS v3.1 metric structure.**
  - **Base group:** Attack Vector, Attack Complexity, Privileges Required, User Interaction, Scope, Confidentiality Impact, Integrity Impact, Availability Impact. These describe the vulnerability itself and do not change with time or environment.
  - **Temporal group:** Exploit Code Maturity, Remediation Level, Report Confidence. These reflect what is known about the vulnerability at a point in time — exploit code may not exist yet (low maturity), then proof-of-concept emerges (medium), then weaponized exploits circulate (high). Temporal scores fall as patches become available.
  - **Environmental group:** Modified Base metrics (re-evaluated for the specific environment), Confidentiality / Integrity / Availability Requirements. These reflect what the asset means to the organization — an availability vulnerability on a critical revenue system carries higher environmental score than the same vulnerability on a development system.
- **Most published scores are Base only.** NVD, vendor advisories, and CVSS calculators publish Base scores because Temporal and Environmental scoring requires context the publisher doesn't have. Mature security programs compute their own Environmental scores to prioritize remediation against organizational risk.
- **CVSS v4.0 renamed and restructured.** v4.0 (2023) merges Base and Threat (the new name for Temporal) into a single CVSS-BT score, adds Environmental as CVSS-BTE, and introduces Supplemental metrics (Safety, Automatable, Recovery, etc.). The three-group concept persists but the names and groupings differ. CISSP testing as of this Concept's authoring still uses v3.x terminology.
- **Mutability is the discriminator.** The cell column captures *whether* the score changes, not *how often*. Base never changes (it describes the vulnerability itself); Temporal changes as exploit/patch status evolves; Environmental changes as the organization's deployment changes.
- **Cross-Concept link.** Sibling Concept `vulnerability-severity-scoring` covers the score-to-severity-bin mapping. CVSS Base produces the score that bins into Critical / High / Medium / Low / None.
- **Out of scope for this Concept:** specific Base metric definitions (Attack Vector values, Attack Complexity scoring), CVSS calculator usage, v4.0 metric details, EPSS supplementing CVSS, CVSS-vs-SSVC framework comparisons.

### Tricky distractors

- **Base is constant; Temporal changes; Environmental varies by deployment.** Wrong-answer pattern: claiming Base changes when patches release — patches affect Temporal (Remediation Level), not Base.
- **Most published scores are Base only.** NVD doesn't know your environment. Wrong-answer pattern: relying on NVD Base score for prioritization without computing Environmental.
- **CVSS v4.0 renamed Temporal to Threat.** And added Supplemental metrics. Wrong-answer pattern: applying v3.1 metric names to v4.0 questions.
- **Environmental incorporates org-specific CIA requirements.** A CIA hit on a critical asset weights heavier than the same hit on a dev system. Wrong-answer pattern: claiming Environmental is one fixed score for the vuln — it varies per asset within the same org.
- **Temporal scores generally decrease over time.** As patches become available, Remediation Level lowers the Temporal score. Wrong-answer pattern: claiming Temporal scores increase over time — they typically fall.
- **Base captures intrinsic vuln properties.** Attack Vector, Privileges Required, etc. Wrong-answer pattern: putting environment-specific data into Base — those go in Environmental.

### Values without a direct public citation

No cell relies on inference beyond what the FIRST CVSS specification [s1] specifies. The mutability framings are paraphrases of the spec rather than direct quotations.

## Engine demo opportunities

- `Base | mutability → ?` → `Constant over time`
- `Temporal | mutability → ?` → `Changes over time`
- `Environmental | mutability → ?` → `Varies by deployment`
- `? | mutability → Constant over time` → `Base`
- `? | what it captures → Organization-specific impact` → `Environmental`
- `? | what it captures → Intrinsic vulnerability characteristics` → `Base`
- Composite Base Row with `mutability` swapped to `Changes over time` — directly tests the Base-vs-Temporal distinction (Base is constant; Temporal evolves with threat landscape)
- Composite Environmental Row with `what it captures` swapped to `Intrinsic vulnerability characteristics` — tests the Environmental-vs-Base distinction (Environmental is org-specific; Base is intrinsic)
- Composite Temporal Row with `mutability` swapped to `Varies by deployment` — tests the Temporal-vs-Environmental distinction (Temporal varies with time; Environmental varies with deployment)

## Sources

- `[s1]`: FIRST, "Common Vulnerability Scoring System v3.1: Specification Document" — three metric groups (Base, Temporal, Environmental) (June 2019, retrieved 2026-04-26, https://www.first.org/cvss/v3.1/specification-document)
- `[s2]`: FIRST, "Common Vulnerability Scoring System v4.0" — restructured metric groups (Base, Threat, Environmental, Supplemental) (November 2023, retrieved 2026-04-26, https://www.first.org/cvss/v4.0/specification-document)
