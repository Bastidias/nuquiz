# BIA Components

**Domain:** 1 — Security and Risk Management &nbsp;|&nbsp; **Pattern:** Dimensions &nbsp;|&nbsp; **Tags:** 1.8
**Status:** draft (SME review pending)

The six outputs and metrics CISSP candidates are expected to discriminate when a Business Impact Analysis identifies recovery requirements for an information system. One row is the BIA's primary output (Critical functions); four are recovery-objective metrics (MTD, RTO, RPO, WRT) tied together by the identity `MTD = RTO + WRT`; one is a reliability statistic (MTBF) that is independent of the recovery objectives but commonly tested alongside them. Columns progress from definition (what the component is), through what it measures, to its relation to other rows, and finally a representative example value.

| Component | definition | what it measures | relation to others | example |
|---|---|---|---|---|
| Critical functions | Business activities whose disruption causes unacceptable consequences [s1] | Operational priority for recovery | Inputs to recovery objectives [s1] | Customer order processing |
| MTD | Maximum time a function can be unavailable before unacceptable consequences [s1] | Total tolerable outage duration [s1] | MTD = RTO + WRT [s3] | 24 hours |
| RTO | Acceptable time to restore the function after disruption [s1] | Technical recovery duration [s1] | RTO ≤ MTD [s3] | 8 hours |
| RPO | Acceptable latency of data that will not be recovered [s1] | Acceptable data-loss window [s1] | Drives backup frequency | 1 hour |
| WRT | Time to verify integrity after technical restoration [s3] | Business resumption duration [s3] | WRT = MTD − RTO [s3] | 16 hours |
| MTBF | Predicted elapsed time between inherent failures of a system [s2] | System reliability [s2] | Independent of recovery objectives | 116 hours [s2] |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. No parentheticals in cells.
- **MTD has multiple names.** Wikipedia [s1] lists Maximum Tolerable Period of Disruption (MTPoD), Maximum Tolerable Downtime (MTD), Maximum Tolerable Outage (MTO), and Maximum Acceptable Outage (MAO) as equivalent terms. CISSP testing uses MTD most often. The other terms appear in ISO 22301 and BCM Institute material.
- **The MTD identity.** `MTD = RTO + WRT` is the canonical CISSP relationship. Technical recovery (RTO) restores systems and data; work recovery (WRT) verifies integrity, restarts processes, and brings the business back online. The example values chain: RTO = 8 hours + WRT = 16 hours = MTD = 24 hours.
- **RTO ≤ MTD as a constraint.** Nothing prevents an organization from setting RTO equal to MTD, which would leave no time for WRT. In practice RTO is set strictly less than MTD so that WRT has room to operate. The exam-correct answer to "what is the relationship between RTO and MTD" is `RTO ≤ MTD` (or equivalently, `RTO + WRT ≤ MTD`).
- **RPO is independent of MTD/RTO/WRT.** RPO is a *data-loss* tolerance, not a *time-to-restore* tolerance. RPO drives backup frequency: a 1-hour RPO means at least hourly backups, regardless of how long it takes to restore them. CISSP exams routinely test the RPO-vs-RTO distinction.
- **MTBF is reliability, not recovery.** MTBF measures the expected uptime *between* failures of a repairable system. It is an input to availability calculations and procurement decisions, not to the recovery plan. MTBF and MTTR (Mean Time To Repair) together yield availability: `Availability = MTBF / (MTBF + MTTR)`.
- **MTBF example is unrepresentative.** The cited Wikipedia worked example yields 116 hours for three lab systems failing at 100/120/130 hours. Production hardware MTBFs are typically tens of thousands of hours (a 50,000-hour disk MTBF is common). The cell uses the Wikipedia figure to keep the citation direct; SME pass should consider swapping for a representative production value.
- **BIA is not the BCP.** The BIA is one input to the Business Continuity Plan. It identifies critical functions and quantifies their recovery requirements; the BCP then specifies how those requirements are met (recovery sites, runbooks, communications, training). This Concept covers BIA outputs only; recovery-site selection lives in `recovery-site-types`.
- **Out of scope:** MTTR, MTTF (non-repairable systems), SDO (Service Delivery Objective), MAD (Maximum Acceptable Data loss — a synonym for RPO in some texts), availability percentages (`five 9s`), and the BCP itself.

### Values without a direct public citation

| Cell | Value | Why unsourced |
|---|---|---|
| Critical functions × what it measures | `Operational priority for recovery` | Paraphrase of the BIA's role; not a single-sentence quote. |
| Critical functions × example | `Customer order processing` | Illustrative example; CISSP-pedagogical. |
| MTD × example | `24 hours` | Illustrative value chosen to satisfy `MTD = RTO + WRT` with the row examples. |
| RTO × example | `8 hours` | Illustrative; chosen to satisfy the chain. |
| RPO × relation to others | `Drives backup frequency` | Universal CISSP teaching; not directly quoted in the cited source. |
| RPO × example | `1 hour` | Illustrative; CISSP-pedagogical. |
| WRT × example | `16 hours` | Derived from `MTD − RTO` to make the chain self-consistent. |
| MTBF × relation to others | `Independent of recovery objectives` | Pedagogical framing; the cited MTBF article does not relate MTBF to recovery objectives. |

## Engine demo opportunities

- `MTD | relation to others → ?` → `MTD = RTO + WRT`
- `WRT | relation to others → ?` → `WRT = MTD − RTO`
- `RTO | example → ?` → `8 hours`
- `? | definition → Acceptable latency of data that will not be recovered` → `RPO`
- `? | what it measures → System reliability` → `MTBF`
- `? | what it measures → Total tolerable outage duration` → `MTD`
- Composite RTO Row with `relation to others` swapped to `Independent of recovery objectives` — tests that RTO is a recovery objective, not a reliability statistic
- Composite RPO Row with `definition` swapped to `Acceptable time to restore the function after disruption` — tests the RPO-vs-RTO distinction (data-loss window vs restoration time)
- Composite MTBF Row with `relation to others` swapped to `MTD = RTO + WRT` — tests that MTBF stands apart from the recovery-objective family

## Sources

- `[s1]`: Wikipedia, "Business continuity planning" (retrieved 2026-04-25, https://en.wikipedia.org/wiki/Business_continuity_planning). Source for BIA definition, the MTD/MTPoD/MTO/MAO synonym list, and the prose definitions of RTO and RPO.
- `[s2]`: Wikipedia, "Mean time between failures" (retrieved 2026-04-25, https://en.wikipedia.org/wiki/Mean_time_between_failures). Source for the MTBF definition and the worked-calculation example (116 hours).
- `[s3]`: Multiple-source search aggregation on Work Recovery Time (retrieved 2026-04-25), referencing Tandem (https://tandem.app/blog/what-is-the-difference-between-rpo-rto-mtd), Jotelulu (https://jotelulu.com/en-gb/blog/disaster-recovery-rpo-rto-wrt-mtd/), and Default Reasoning (https://defaultreasoning.com/2013/12/10/rpo-rto-wrt-mtd/). Source for the `MTD = RTO + WRT` formula and the WRT prose definition.
