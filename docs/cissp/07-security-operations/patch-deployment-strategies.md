# Patch Deployment Strategies

**Domain:** 7 — Security Operations &nbsp;|&nbsp; **Pattern:** Dimensions &nbsp;|&nbsp; **Tags:** 7.8
**Status:** draft (SME review pending)

The four ways to push a patch across an enterprise fleet, ordered roughly by aggressiveness. Phased rollout and pilot group are the conservative defaults — small initial blast radius, validation gates between waves. Canary applies the same idea at a finer grain (a tiny percentage as a continuous bellwether). Big bang trades blast-radius safety for speed, used when the alternative (an unpatched zero-day in production) is worse than the deployment risk. The CISSP exam tests both the strategy-to-scenario matchup and the rollback-cost trade-off.

| strategy | risk profile | when used | rollback complexity |
|---|---|---|---|
| Phased rollout | Low risk per phase [s1] | Standard production patching [s1] | Halt next phase if issue found [s1] |
| Pilot group | Low risk to broader fleet [s1] | First production exposure of a new patch [s1] | Roll back only pilot group [needs source] |
| Canary | Very low risk by sample size [s2] | Continuous-deployment environments [s2] | Auto-rollback on canary failure signal [s2] |
| Big bang | High risk across entire fleet [needs source] | Critical zero-day demanding immediate coverage [needs source] | Full-fleet rollback required [needs source] |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. No parentheticals in cells.
- **Tag 7.8 retained from stub.** Matches (ISC)² 2024 outline §7.8 *Implement and support patch and vulnerability management*. Sibling Concept: `patch-management-lifecycle.md` (the process this strategy plugs into).
- **Phased rollout vs. pilot group.** Both are conservative. The distinction: phased rollout is a *multi-wave* deployment across the whole fleet (wave 1 of 5, wave 2 of 5, etc.); pilot group is a *single early wave* of representative systems used to surface issues before broader deployment. A pilot group precedes a phased rollout in many enterprise programs — first run the pilot, then roll out in phases.
- **Canary is pilot group at higher cadence.** Canary deployments come from the continuous-deployment world: a small fraction of production traffic (5%, 10%) is routed to the new version, observed for failure signals, and either promoted or auto-rolled-back within minutes. The CISSP exam may use "canary" interchangeably with "pilot group" but the test of nuance is the *automation level* — canary is automated, pilot is typically manual review.
- **Big bang is the contested row.** Most security guidance discourages big-bang deployment because the rollback cost is catastrophic if the patch breaks production. But for actively exploited zero-days, the calculus inverts: a 24-hour delay to run a phased rollout may cost more than the patch's deployment risk. NIST SP 800-40 Rev. 4 frames this as a risk-based decision — there is no universal answer, only a documented analysis.
- **Rollback complexity is what the trade-off costs you.** Phased and canary rollouts give you cheap, scoped rollback (revert only the affected wave). Big bang rollback is full-fleet. The bigger the deployment, the worse the rollback cost — that is the structural trade-off this Concept teaches.
- **What is intentionally not on this table.** Blue/green deployment, ring deployment, and rolling deployment are alternative strategies that overlap with these four. They could be added as additional rows in a future revision; the four here cover the most-tested CISSP framings.
- **Gaps marked `[needs source]`:** four Facts — pilot group rollback specifics, all three big-bang Facts. Big-bang strategy is rarely *advocated* by primary publications; it is acknowledged as an operational reality, which makes it harder to source than the conservative alternatives.

## Engine demo opportunities

- `? | when used → Continuous-deployment environments` → Canary
- `Big bang | rollback complexity → ?` → `Full-fleet rollback required`
- `? | risk profile → Very low risk by sample size` → Canary
- `Phased rollout | when used → ?` → `Standard production patching`
- `Pilot group | rollback complexity → ?` with `Full-fleet rollback required` (Big bang) and `Auto-rollback on canary failure signal` (Canary) as distractors
- Composite Row profile: Phased rollout across all Columns with `risk profile` swapped to `High risk across entire fleet` (Big bang's value)

## Sources

- `[s1]`: NIST SP 800-40 Rev. 4 *Guide to Enterprise Patch Management Planning: Preventive Maintenance for Technology*, April 2022 (retrieved 2026-04-25, https://csrc.nist.gov/pubs/sp/800/40/r4/final) — phased deployment guidance
- `[s2]`: Continuous-deployment / canary release literature — practitioner consensus (retrieved 2026-04-25, https://martinfowler.com/bliki/CanaryRelease.html) — for canary-specific automation framing not covered explicitly in NIST
- `[s3]`: (ISC)² CISSP Certification Exam Outline, effective 2024-04-15, Domain 7 §7.8 *Implement and support patch and vulnerability management* (retrieved 2026-04-25, https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline)
