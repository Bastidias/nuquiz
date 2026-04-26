# Configuration Baselines

**Domain:** 7 — Security Operations &nbsp;|&nbsp; **Pattern:** Dimensions &nbsp;|&nbsp; **Tags:** 7.3
**Status:** draft (SME review pending)

The four configuration baselines defined by EIA-649 (the consensus systems-engineering standard for configuration management) plus the operational baseline used in security operations. Each baseline is a *formally approved snapshot* of a system's attributes at a specific point in its lifecycle. The CISSP exam tests both the lifecycle ordering (functional → allocated → product → operational) and the distinction between approved baseline and current running state — drift detection compares the latter against the former.

| baseline | what it defines | when established |
|---|---|---|
| Functional | System performance characteristics [s1]<br>System functional characteristics [s1]<br>Interface characteristics [s1] | After requirements approval [s1] |
| Allocated | Functional characteristics for each system element [s1]<br>Interface characteristics for each system element [s1] | After preliminary design allocation [s1] |
| Product | As-built configuration of the CI [s1]<br>Approved technical documentation [s1] | After production verification [s1] |
| Operational | Current running production configuration [s3]<br>Security configuration snapshot [s3] | After deployment to production [s3] |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. No parentheticals in cells.
- **Tag 7.3 retained from stub.** Matches (ISC)² 2024 outline §7.3 *Perform configuration management*. Sibling Concepts in this folder (`cmdb-components.md`, `asset-hardening.md`) use the same tag.
- **Where the four-baseline taxonomy comes from.** EIA-649 (Configuration Management Standard) defines the functional, allocated, and product baselines as the three *evolving* technical baselines a system passes through during development [s1]. The operational baseline is the fifth in some taxonomies — it represents the production-running state and is what configuration management governs *after* deployment. NIST SP 800-128 anchors the operational baseline conceptually [s2].
- **Baselines progress; they do not coexist as alternatives.** Functional precedes allocated precedes product precedes operational. A row's "when established" cell encodes the lifecycle ordering — engine should be able to construct sequence questions even though the Pattern is Dimensions rather than Ordered.
- **Approved baseline ≠ current state.** This is the most-tested CISSP nuance. The operational baseline is the *approved* production configuration; the current running state is whatever drift has accumulated since. Configuration management closes that gap via change control (`change-management-lifecycle.md`).
- **Why not "developmental" or "release" baselines.** Some references include developmental, release, or maintenance baselines. These are subdivisions or alternative taxonomies; EIA-649's three plus the operational baseline cover the CISSP scope without proliferating rows.
- **Gaps marked `[needs source]`:** none — all Facts trace to EIA-649 (via SEBoK summary), NIST SecCM framing, or CISSP study guidance.

## Engine demo opportunities

- `? | when established → After requirements approval` → Functional
- `Product | what it defines → ?` → `As-built configuration of the CI` or `Approved technical documentation`
- `? | what it defines → Security configuration snapshot` → Operational
- `Allocated | when established → ?` → `After preliminary design allocation`
- Sequence question (despite Dimensions Pattern): order rows by `when established` to recover lifecycle progression Functional → Allocated → Product → Operational
- Composite Row profile: Functional across all Columns with the `when established` cell swapped to `After production verification` (Product's value)

## Sources

- `[s1]`: EIA-649 *National Consensus Standard for Configuration Management* — definitions of functional, allocated, and product baselines (retrieved 2026-04-25, https://sebokwiki.org/wiki/Configuration_Baselines and https://www.dau.edu/acquipedia-article/functional-baseline) — used as published summaries of the standard
- `[s2]`: NIST SP 800-128 *Guide for Security-Focused Configuration Management of Information Systems*, August 2011 (retrieved 2026-04-25, https://csrc.nist.gov/pubs/sp/800/128/upd1/final) — anchors the operational-baseline concept in security context
- `[s3]`: (ISC)² *Importance of Security Control Baselines* / *Keeping Configuration Management Simple* practitioner articles (retrieved 2026-04-25, https://www.isc2.org/Insights/2021/10/Importance-of-Security-Control-Baselines) — for the operational-baseline framing as it appears on the CISSP exam
- `[s4]`: (ISC)² CISSP Certification Exam Outline, effective 2024-04-15, Domain 7 §7.3 *Perform configuration management* (retrieved 2026-04-25, https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline)
