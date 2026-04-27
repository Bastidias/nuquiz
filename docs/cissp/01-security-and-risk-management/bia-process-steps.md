# BIA Process Steps (NIST SP 800-34)

**Domain:** 1 — Security and Risk Management &nbsp;|&nbsp; **Pattern:** Ordered &nbsp;|&nbsp; **Tags:** 1.8
**Status:** draft (SME review pending)

The three-step Business Impact Analysis process from NIST SP 800-34 Rev 1 §3.2. Each step has a name, the activity an analyst performs, and the artifact that comes out the other side. This Concept covers the *process* (what the analyst does in what order); recovery-objective metrics (MTD, RTO, RPO, WRT, MTBF) live in `bia-components.md` as outputs of Step 1.

**Layout convention:** rows are steps in sequence from scoping the analysis to handing off prioritized recovery guidance. Columns are attributes of each step, left → right from terse identifier (Name) through process (Key Activity) to artifact (Typical Output). Each `<br>`-separated item is one atomic Fact.

| Step | Name | Key Activity | Typical Output |
|---|---|---|---|
| 1 | Determine Mission/Business Processes and Recovery Criticality | Identify supported mission processes [s1]<br>Characterize outage impact categories [s1]<br>Estimate tolerable downtime [s1] | Process criticality list [s1]<br>MTD values [s1]<br>Impact categories [s1] |
| 2 | Identify Resource Requirements | Inventory resources needed to resume each process [s1]<br>Map interdependencies [s1] | Resource requirements list [s1]<br>Interdependency map [s1] |
| 3 | Identify Recovery Priorities for System Resources | Link resources to critical processes [s1]<br>Sequence recovery order [s1] | Prioritized recovery list [s1]<br>Recovery sequence [s1] |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. No parentheticals in cells. Step Names are the official NIST SP 800-34 Rev 1 §3.2 headings and are treated as inseparable canonical names per the parens-safety carve-out for proper names.
- **Three steps, not seven.** This is the most common exam confusion. NIST SP 800-34 Rev 1 §3.2 specifies exactly **three** BIA steps. The seven phases tested in `bcp-phases.md` are the **BCP** lifecycle, in which "Conduct BIA" is itself Phase 2. Do not confuse the BCP phases with the BIA steps.
- **Step 1 produces the metrics, not the BIA itself.** MTD, RTO, RPO, and WRT are *outputs* of Step 1 — see `bia-components.md` for the comparison of those metrics. Step 1 does not produce the recovery plan; it produces the inputs the BCP will later consume. This is the second-most-common exam confusion.
- **Resource requirements (Step 2) are not controls.** Step 2 inventories the facilities, personnel, equipment, software, data, and external dependencies each critical process needs to run. It does not select controls. Control selection happens in BCP Phase 3 ("Identify preventive controls") and beyond.
- **Recovery priorities (Step 3) sequence resources, not threats.** The output of Step 3 is the order in which system resources should be brought back online — not a ranking of threats. Threat ranking belongs to Risk Assessment, not BIA.
- **BIA vs Risk Assessment.** A BIA asks *what happens if a process is unavailable, and how fast must it come back?* A Risk Assessment asks *what threats and vulnerabilities exist, and what is the likelihood × impact?* BIA is impact-only and assumes disruption; Risk Assessment evaluates the probability of disruption. The two analyses inform each other but are distinct artifacts.
- **NIST is one of several models.** ISO 22301 / ISO/TS 22317, the BCI Good Practice Guidelines, and DRII Professional Practices each frame BIA with more granular steps (commonly: scoping → data collection → impact analysis → recovery requirements → reporting). The CISSP exam canonically tests the NIST three-step model. A separate Concept could be authored to compare cross-methodology BIA framings if SME review prioritizes it.
- **Step 1 has the most sub-activities.** Some textbooks expand Step 1 into separate sub-steps (process identification, impact characterization, MTD determination). NIST keeps these inside Step 1; this Concept follows NIST. The Key Activity column lists the three Step-1 sub-activities as atomic Facts.
- **Out of scope for this Concept:** the BCP lifecycle (in `bcp-phases.md`), the recovery-objective metrics MTD / RTO / RPO / WRT / MTBF (in `bia-components.md`), recovery-site selection (in `recovery-site-types.md`), DR test types (tabletop / walkthrough / parallel / full-interruption — Domain 7), and Risk Assessment methodology (separate Concept under 1.10).

### Tricky distractors

- **BIA process steps vs BIA outputs (MTD/RTO/RPO).** "MTD" is not a step; it is a metric produced inside Step 1. Distractor pairings will mislabel a metric as a step or vice versa.
- **BIA vs BCP.** The BIA is a single phase (Phase 2) of the seven-phase BCP. Distractors will swap the BIA three-step list with the BCP seven-phase list.
- **BIA vs DRP.** The DRP (Disaster Recovery Plan) is the IT-centric subset of the BCP that operationalizes recovery for technology assets. The BIA feeds both BCP and DRP but is distinct from each.
- **BIA vs Risk Assessment.** Risk Assessment evaluates likelihood × impact across a threat catalog. BIA evaluates impact only and assumes the disruption has occurred. Confusing the two is a perennial CISSP trap.
- **Step 2 (resource requirements) vs BCP Phase 3 (preventive controls).** Step 2 lists what each process needs to operate; Phase 3 selects controls that reduce the chance of disruption. Distractors will swap these.

### Values without a direct public citation

| Cell | Value | Why unsourced |
|---|---|---|
| (none) | — | Every cell traces directly to NIST SP 800-34 Rev 1 §3.2 [s1]. |

## Engine demo opportunities

- `Step 2 | Name → ?` → `Identify Resource Requirements`
- `? | Name → Identify Recovery Priorities for System Resources` → `Step 3`
- `? | Typical Output → MTD values` → `Step 1`
- `? | Typical Output → Resource requirements list` → `Step 2`
- `Step 1 | Key Activity → ?` → `Identify supported mission processes` / `Characterize outage impact categories` / `Estimate tolerable downtime` (multi-Fact cell)
- `Step 1 | Typical Output → ?` → `Process criticality list` / `MTD values` / `Impact categories` (multi-Fact cell)
- Sequence (adjacency): `Step following (Step n | Name → Determine Mission/Business Processes and Recovery Criticality) | Name → ?` → `Identify Resource Requirements`
- Sequence (adjacency): `Step following (Step n | Name → Identify Resource Requirements) | Name → ?` → `Identify Recovery Priorities for System Resources`
- Sequence (preceding): `Step preceding (Step n | Name → Identify Recovery Priorities for System Resources) | Name → ?` → `Identify Resource Requirements`
- Composite Step profile: Step 3 with `Typical Output` swapped to `MTD values` — tests that MTD is a Step 1 output, not a Step 3 output (the canonical step-vs-output trap)
- Composite Step profile: Step 2 with `Key Activity` swapped to `Sequence recovery order` — tests resource-inventory vs recovery-sequencing distinction
- Cross-Concept disambiguation: Step 1 (this Concept) vs Phase 2 "Conduct BIA" (`bcp-phases.md`) — the BIA is one phase of BCP and itself contains three steps; questions can probe whether students recognize the nested structure.

## Sources

- `[s1]`: NIST SP 800-34 Rev 1, "Contingency Planning Guide for Federal Information Systems," §3.2 "Conduct Business Impact Analysis (BIA)" (May 2010, updated November 2010, retrieved 2026-04-26, https://csrc.nist.gov/pubs/sp/800/34/r1/upd1/final). The three-step BIA structure (Step 1: Determine Mission/Business Processes and Recovery Criticality; Step 2: Identify Resource Requirements; Step 3: Identify Recovery Priorities for System Resources), the Step 1 sub-activities, and the Step 1/2/3 outputs are drawn from this section. Note: per the project's source-provenance status (see `knowledge-map.md`), the NIST PDF was not parsed directly because PDF extraction was unavailable in the environment; cell values were drafted against WebSearch summaries and the NIST CSRC publication landing page, then cross-checked against the NIST BIA Template (https://csrc.nist.gov/files/pubs/sp/800/34/r1/upd1/final/docs/sp800-34-rev1_bia_template.docx) which restates the three-step structure verbatim. SME pass should fetch the PDF directly to confirm exact wording.
- `[s2]`: NIST SP 800-34 Rev 1 BIA Template (Word document, retrieved 2026-04-26, https://csrc.nist.gov/files/pubs/sp/800/34/r1/upd1/final/docs/sp800-34-rev1_bia_template.docx). Cross-reference for the three-step structure and the Step 1 sub-activities (process identification, outage impact characterization, downtime estimation). Not cited in cells because it duplicates [s1]; listed for SME audit trail.
- `[s3]`: ISO 22301:2019, "Security and resilience — Business continuity management systems — Requirements" (retrieved 2026-04-26, https://www.iso.org/standard/75106.html). Referenced in Notes as the alternative methodology framing (scoping → data collection → impact analysis → recovery requirements → reporting). Not cited in cells because this Concept follows the NIST three-step model exclusively.
