# Backup Verification Metrics

**Domain:** 6 — Security Assessment and Testing &nbsp;|&nbsp; **Pattern:** Dimensions &nbsp;|&nbsp; **Tags:** 6.3
**Status:** draft (SME review pending)

The four metrics CISSP candidates are expected to track for backup-and-recovery program effectiveness. Two measure the *backup* operation (success rate, restore test frequency); two measure compliance against business *recovery objectives* (RPO compliance, RTO compliance). The discriminator is what each metric proves — that backups *ran*, that backups can be *restored*, that backups capture the *required data window*, and that recovery completes in the *required timeframe*. A backup program that hits 99.9% success but has never been restore-tested has not proven recoverability — only that backup jobs completed.

| Metric | how measured | target |
|---|---|---|
| Backup success rate | Percentage of scheduled backups completed without error | Above 99 percent |
| Restore test frequency | Cadence of full restore drills | At least quarterly |
| RPO compliance | Percentage of backups within RPO of last protected event | 100 percent |
| RTO compliance | Percentage of recovery exercises completing within RTO | 100 percent |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. **No parentheticals in cells.** Comparison operators (`Above`, `At least`) replace `>` / `≥` symbols.
- **Backup success rate alone is misleading.** A backup that "succeeded" means the backup job ran and reported completion — not that the backup is *recoverable*. Real backup verification requires periodically restoring backups and validating data integrity. Programs that track only success rate routinely discover during real incidents that their backups are corrupt, encrypted with lost keys, or missing critical data.
- **Restore test frequency is the under-measured metric.** Industry practice ranges from "never" (most common) to "quarterly" (mature programs) to "continuous" (chaos-engineering DR). Quarterly is the canonical CISSP target; HIPAA and similar regulations require periodic testing without specifying cadence. Sibling Concept `dr-test-types` in D7 covers the testing-method spectrum.
- **RPO compliance — measured at the data layer.** RPO (Recovery Point Objective) is the maximum acceptable data loss measured in time. RPO compliance means the most recent backup is within that time window. A 1-hour RPO requires backups at least every hour; daily backups violate a 1-hour RPO regardless of success rate. Cross-Concept link: `bia-components` in D1 covers the RPO definition.
- **RTO compliance — measured at the recovery exercise.** RTO (Recovery Time Objective) is the maximum acceptable recovery duration. RTO compliance is measured by exercising the recovery (restore from backup, bring up systems, validate data) and timing the result against RTO. Programs without recovery exercises cannot measure RTO compliance — they only have an *aspirational* RTO.
- **Both compliance metrics target 100 percent.** RPO and RTO are absolute — a recovery that exceeds either is by definition non-compliant. The metric measures *the percentage of measurement instances* that hit the target, not the average. A program that hits RTO 4 out of 5 times has 80% compliance, which is failing.
- **Cross-Concept link.** Sibling Concept `recovery-objectives` in D7 (and `bia-components` in D1) covers the RTO/RPO definitions. Sibling `backup-strategies` in D7 covers the backup-method options. This Concept covers measurement of all three.
- **Out of scope for this Concept:** specific backup software, RPO / RTO numeric targets per data type, 3-2-1 backup rule, immutable / air-gapped backup techniques, ransomware-resilient backup architectures, BIA-derived recovery prioritization, vendor-lock issues with backup storage.

### Values without a direct public citation

| Cell | Notes |
|---|---|
| Backup success rate × target | `Above 99 percent` | Industry-typical SLA target; specific durations vary by criticality. |
| Restore test frequency × target | `At least quarterly` | Industry-typical cadence; specific regulations may require different cadences. |
| RPO / RTO × target | `100 percent` | Compliance is binary; any breach is non-compliance. |

## Engine demo opportunities

- `Backup success rate | how measured → ?` → `Percentage of scheduled backups completed without error`
- `Restore test frequency | target → ?` → `At least quarterly`
- `RPO compliance | target → ?` → `100 percent`
- `? | how measured → Percentage of recovery exercises completing within RTO` → `RTO compliance`
- `? | target → 100 percent` → `RPO compliance`, `RTO compliance` — shared-Value select-all
- `? | how measured → Cadence of full restore drills` → `Restore test frequency`
- Composite Backup success rate Row with `target` swapped to `100 percent` — directly tests the success-rate vs compliance distinction (success rate is a >99% target; RPO/RTO compliance is binary 100%)
- Composite Restore test frequency Row with `how measured` swapped to `Percentage of scheduled backups completed without error` — tests metric-to-method pairing (frequency is a cadence; success rate is a percentage)
- Composite RPO compliance Row with `how measured` swapped to `Percentage of recovery exercises completing within RTO` — tests RPO vs RTO measurement (RPO is data-window; RTO is duration)

## Sources

- `[s1]`: NIST SP 800-34 Rev 1, "Contingency Planning Guide for Federal Information Systems" — recovery objectives, backup verification, and exercise requirements (May 2010, retrieved 2026-04-26, https://csrc.nist.gov/publications/detail/sp/800-34/rev-1/final)
- `[s2]`: NIST SP 800-53 Rev 5, "Security and Privacy Controls for Information Systems and Organizations" — CP (Contingency Planning) control family (September 2020 baseline, retrieved 2026-04-26, https://csrc.nist.gov/publications/detail/sp/800-53/rev-5/final)
