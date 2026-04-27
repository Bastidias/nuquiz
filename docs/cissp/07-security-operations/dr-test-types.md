# DR Test Types

**Domain:** 7 — Security Operations &nbsp;|&nbsp; **Pattern:** Ordered &nbsp;|&nbsp; **Tags:** 7.12
**Status:** draft (SME review pending)

The five disaster recovery / contingency-plan test types from NIST SP 800-84, ordered by increasing disruption to production. Each step up the ladder costs more in effort but yields stronger evidence that the recovery plan actually works. The CISSP exam tests the ordering (which test is heavier than which) and the matchup between test type and what confidence it actually buys.

**Layout convention:** rows are ordered by increasing disruption (Type 1 = least disruptive, Type 5 = most disruptive). Columns progress from identifier (Type, Name) through cost properties (Disruption Level, Effort) to outcome (Confidence Gained).

| Type | Name | Disruption Level | Effort | Confidence Gained |
|---|---|---|---|---|
| 1 | Checklist | None [s1] | Lowest [s1] | Verifies plan documentation completeness [s1] |
| 2 | Walkthrough | None [s1] | Low [s1] | Validates team understanding of roles [s1] |
| 3 | Simulation | None [s1] | Medium [s1] | Tests team response to scenario [s1] |
| 4 | Parallel | None to production [s1] | High [s1] | Verifies alternate site can carry production load [s1] |
| 5 | Full interruption | Production halted [s1] | Highest [s1] | Demonstrates true failover capability [s1] |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. No parentheticals in cells. The repeated `None` Value across Types 1–3 (and "None to production" in Type 4) is intentional — it lets the engine detect shared Disruption-Level Values across multiple Rows and reason about what *does* differentiate them (effort and confidence).
- **Tag 7.12 retained from stub.** Matches (ISC)² 2024 outline §7.12 *Test disaster recovery plans (DRP)*.
- **Why these five types and this ordering.** NIST SP 800-84 identifies tests, tabletop exercises, and functional exercises; CISSP courseware (and NIST SP 800-34 by reference) decomposes these further into the five-type ladder used here. The ladder is the most-tested ordering on the exam: checklist → walkthrough → simulation → parallel → full interruption.
- **Walkthrough vs. tabletop terminology.** NIST SP 800-84 uses *tabletop exercise* for what CISSP courseware often calls a *walkthrough*. They are the same thing — a discussion-based exercise where the team walks through a scenario in a room. This Concept uses *Walkthrough* per the stub; treat *tabletop* as a synonym.
- **Why parallel disrupts only the alternate site.** Parallel testing brings the alternate site online and processes production transactions there *in parallel* with the live site, then compares results. Production keeps running on the primary; the alternate site bears the test load. This is the heaviest test that doesn't risk production.
- **Full interruption is rarely run.** Most organizations stop at parallel because full interruption requires accepting production downtime as the cost of the test. NIST SP 800-34 acknowledges that high-impact systems may require it; in practice it is reserved for new systems pre-launch and for regulated industries with explicit testing mandates.
- **Gaps marked `[needs source]`:** none — all Facts trace to NIST SP 800-84 framing.

### Tricky distractors

- **Walkthrough vs Tabletop.** Same thing — discussion-based exercise. NIST uses *tabletop*; CISSP courseware often uses *walkthrough*. Wrong-answer pattern: treating them as different test types.
- **Parallel vs Full Interruption.** Parallel = alternate site runs *in parallel* with production (no production downtime). Full Interruption = production is *halted* and recovery is exercised end-to-end. Wrong-answer pattern: claiming parallel disrupts production — it doesn't, that's the point.
- **Checklist is the lightest test.** Just verifies that the plan documentation exists and lists all required steps. Doesn't test execution. Wrong-answer pattern: assuming checklist tests anything beyond document completeness.
- **Simulation vs Walkthrough.** Walkthrough = team discusses scenario in a room. Simulation = team executes documented procedures using simulated systems / data. Simulation is heavier than walkthrough but lighter than parallel. Wrong-answer pattern: equating simulation with parallel testing.
- **Test ladder ordering.** Checklist → Walkthrough → Simulation → Parallel → Full Interruption. Wrong-answer pattern: putting full interruption before parallel. Increasing disruption is the ordering principle.
- **Most organizations stop at Parallel.** Full Interruption requires accepting production downtime as test cost. Wrong-answer pattern: assuming all DR programs reach Full Interruption — most don't.

## Engine demo opportunities

- `? | Name → Walkthrough` → Type 2
- `Type 4 | Disruption Level → ?` → `None to production`
- `? | Disruption Level → Production halted` → Type 5 / Full interruption
- `Simulation | Effort → ?` → `Medium`
- Cross-Row shared-Value detection: `? | Disruption Level → None` → Types 1, 2, 3 (select-all across multiple rows)
- Sequence verification: `Type 2 → ? → Type 4` → Type 3 (Simulation) — tests Ordered-Pattern progression
- Composite Row profile: Checklist across all Columns with `Confidence Gained` swapped to `Demonstrates true failover capability` (Full interruption's value)

## Sources

- `[s1]`: NIST SP 800-84 *Guide to Test, Training, and Exercise Programs for IT Plans and Capabilities*, September 2006 (retrieved 2026-04-25, https://csrc.nist.gov/pubs/sp/800/84/final) — primary source for test type definitions
- `[s2]`: NIST SP 800-34 Rev. 1 *Contingency Planning Guide for Federal Information Systems*, May 2010, §3.5 Plan Testing, Training, and Exercises (retrieved 2026-04-25, https://csrc.nist.gov/pubs/sp/800/34/r1/upd1/final)
- `[s3]`: (ISC)² CISSP Certification Exam Outline, effective 2024-04-15, Domain 7 §7.12 *Test disaster recovery plans (DRP)* (retrieved 2026-04-25, https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline)
