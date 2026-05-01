# Recovery Objectives

**Domain:** 7 — Security Operations &nbsp;|&nbsp; **Pattern:** Dimensions &nbsp;|&nbsp; **Tags:** 7.10, 1.8
**Status:** draft (SME review pending)

The six time-based metrics that quantify what "recovery" means for a business process. RTO and RPO are the two most-tested on the CISSP exam — RTO bounds *how long* you can be down; RPO bounds *how much data* you can lose. MTD is the upper limit (RTO + WRT must fit within MTD); MTTR and MTBF are operational reliability metrics that feed BIA assumptions. The exam tests both the definitions and the unit/owner assignments.

| metric | what it measures | unit | who sets target |
|---|---|---|---|
| RTO | Maximum acceptable downtime after disruption [s1] | Hours [s1] | Business process owner [s1] |
| RPO | Maximum acceptable data loss measured backward from disruption [s1] | Hours [s1] | Business process owner [s1] |
| MTD | Maximum tolerable downtime before mission impact [s1] | Hours [s1] | Business process owner [s1] |
| MTTR | Average time to restore service after failure [s1] | Hours [s1] | Operations team [needs source] |
| MTBF | Average time between failures of a component [s1] | Hours [s1] | Hardware vendor [needs source] |
| WRT | Time to verify and validate after technical recovery [needs source] | Hours [needs source] | Operations team [needs source] |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. No parentheticals in cells. The repeated `Hours` value in the unit column across all rows is intentional — all six metrics are measured in time, with hours as the conventional unit (some organizations use minutes for low-RPO systems).
- **Tags 7.10 and 1.8 retained from stub.** Cross-tagged to (ISC)² 2024 outline §7.10 *Implement recovery strategies* (Domain 7 framing) and §1.8 *Apply Business Continuity (BC) requirements* (Domain 1 framing). Cross-Concept overlap: `bia-components.md` in Domain 1.
- **The RTO + WRT ≤ MTD invariant.** RTO is the time to get the *technical* systems back online; WRT (Work Recovery Time) is the time after that to verify, validate, and reintegrate so the business process is *actually usable*. The sum of the two must fit within the MTD ceiling — otherwise the disruption has crossed into mission impact even though IT thinks recovery succeeded. This is the test-favorite relationship on the exam.
- **RPO measures backward, RTO measures forward.** RPO is "from the moment of disruption, how far back in time do we accept data loss?" — driven by backup frequency. RTO is "from the moment of disruption, how long until services are back?" — driven by recovery procedures. Confusing the two directions is the most common CISSP wrong-answer mistake.
- **Who sets RTO/RPO/MTD: the business, not IT.** All three are *business* metrics derived from the BIA (Business Impact Analysis). IT executes against them but does not define them. The business process owner sets the targets based on revenue impact, regulatory requirements, and customer-facing commitments. IT may push back on feasibility but cannot unilaterally adjust.
- **MTTR vs. MTBF distinguish reliability from recoverability.** MTBF is a *hardware* statistic — the average uptime between failures of a component (disk, server, switch). MTTR is an *operations* statistic — the average time to restore after a failure occurs. Both are inputs to availability calculations: Availability = MTBF / (MTBF + MTTR).
- **Why WRT is on this table even though it is less famous.** Without WRT, the RTO + WRT ≤ MTD invariant cannot be expressed. CISSP courseware sometimes folds WRT into RTO (treating "recovered" as "validated and online") but the exam-favored framing keeps them separate so the math is testable.
- **What is intentionally not on this table.** Maximum Acceptable Outage (MAO) is a near-synonym for MTD used in some references; left out to avoid a near-duplicate row. Recovery Service Level (RSL) — the percentage of normal capacity restored — is sometimes added; could be a future row.
- **Gaps marked `[needs source]`:** four Facts — MTTR/MTBF target-setter, all three WRT cells. WRT especially is loosely defined across CISSP references; sourcing to NIST or ISO would strengthen the row.

### Tricky distractors

- **RPO measures backward, RTO measures forward.** RPO = how far back in time can we accept data loss (drives backup frequency). RTO = how long until services are back (drives recovery procedures). Wrong-answer pattern: confusing the directions. The most common CISSP wrong-answer mistake.
- **RTO + WRT ≤ MTD.** Technical recovery (RTO) plus work recovery / validation (WRT) must fit within Maximum Tolerable Downtime. Wrong-answer pattern: equating RTO with MTD — they're related but distinct.
- **RTO/RPO/MTD are business metrics.** Set by business process owners during BIA. IT executes against them but doesn't define them. Wrong-answer pattern: claiming "IT sets RTO based on infrastructure capability" — that's backward.
- **MTBF vs MTTR.** MTBF = Mean Time Between Failures (uptime statistic; hardware reliability). MTTR = Mean Time To Repair / Restore (recovery duration). Both feed availability calculation: A = MTBF / (MTBF + MTTR). Wrong-answer pattern: confusing the two — MTBF is *between failures* not *during failure*.
- **MTD is a ceiling, not a target.** MTD is the *limit* beyond which the disruption causes mission failure. Organizations target RTO+WRT well *below* MTD, not at it. Wrong-answer pattern: setting RTO equal to MTD (no margin for WRT).
- **Hardware MTBF.** A 50,000-hour MTBF disk is typical. Wrong-answer pattern: thinking "MTBF" means individual disk lifetime — it's a statistical average across a population.

## Engine demo opportunities

- `? | what it measures → Maximum acceptable data loss measured backward from disruption` → RPO
- `MTD | who sets target → ?` → `Business process owner`
- `? | who sets target → Hardware vendor` → MTBF
- `RTO | what it measures → ?` → `Maximum acceptable downtime after disruption`
- Cross-Row shared-Value detection: `? | unit → Hours` → all six metrics (select-all across all rows)
- Cross-Row shared-Value detection: `? | who sets target → Business process owner` → RTO, RPO, MTD
- Composite Row profile: RTO across all Columns with `who sets target` swapped to `Hardware vendor` (MTBF's value)

## Sources

- `[s1]`: NIST SP 800-34 Rev. 1 *Contingency Planning Guide for Federal Information Systems*, May 2010 — particularly §3.2 BIA defining RTO, RPO, MTD (retrieved 2026-04-25, https://csrc.nist.gov/pubs/sp/800/34/r1/upd1/final)
- `[s2]`: (ISC)² CISSP Certification Exam Outline, effective 2024-04-15, Domain 7 §7.10 *Implement recovery strategies* and Domain 1 §1.8 *Apply Business Continuity (BC) requirements* (retrieved 2026-04-25, https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline)
