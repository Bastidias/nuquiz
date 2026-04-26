# Log Analysis Methods

**Domain:** 7 — Security Operations &nbsp;|&nbsp; **Pattern:** Dimensions &nbsp;|&nbsp; **Tags:** 7.2
**Status:** draft (SME review pending)

The four approaches to deriving security signal from collected logs, ordered by increasing automation: manual review, rule-based correlation (the SIEM mainstay), machine learning, and User and Entity Behavior Analytics (UEBA). Each catches a different class of threat — rules handle known attack patterns, ML handles rare/emerging ones, UEBA handles insider and account-takeover risks. The CISSP exam tests the matchup between method and threat class more than the underlying technologies.

| method | strengths | weaknesses | typical use |
|---|---|---|---|
| Manual review | Catches contextual nuance human analysts notice [needs source] | Does not scale to enterprise log volumes [s1] | Targeted forensic review [needs source] |
| Rule-based correlation | Reliable detection of known attack patterns [s2] | Misses novel attack patterns [s2] | Production SIEM detection [s2] |
| Machine learning | Detects rare or emerging patterns across telemetry [s2] | Requires training data and tuning [needs source] | Threat hunting on unknowns [s2] |
| UEBA | Detects insider risk through behavioral deviation [s2] | Requires baseline of normal user behavior [s2] | Account-takeover detection [s2] |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. No parentheticals in cells.
- **Tag 7.2 retained from stub.** Matches (ISC)² 2024 outline §7.2 *Conduct logging and monitoring activities*. Sibling Concepts: `siem-soar-xdr.md` (the platforms that host these methods), `continuous-monitoring.md` (what gets monitored).
- **Why these four rows.** The progression captures a real capability ladder: manual review is the baseline (always available, doesn't scale); rule-based correlation is what most SIEMs do; ML augments rules with statistical pattern detection; UEBA specializes ML for behavioral analysis of user and entity activity. Other categorizations are possible (e.g., adding signature-based detection as a row, or splitting ML into supervised vs. unsupervised) but the four-row decomposition matches the most-tested CISSP framing.
- **Rule-based vs. ML is not exclusive.** Modern SIEMs run both: rules catch known patterns at low FP rate, ML augments with statistical detection of rare patterns. The most-effective production deployments combine both. The CISSP exam may test scenarios where one fails and the other catches — the matchup matters.
- **UEBA is ML applied to a specific data shape.** UEBA is technically a specialization of ML for behavioral telemetry (login times, access patterns, data movement per user/entity). It deserves its own row because it has a distinct test footprint on the exam: questions about insider threat or account takeover usually want "UEBA" as the answer, not generic "machine learning."
- **Manual review still matters.** Not every log analysis can be automated. Targeted forensic review during incident response (Phase 2 of `incident-response-phases.md`) is often manual because the analyst is hunting for specific indicators in a small evidence set. The weakness is scale, not capability.
- **What is intentionally not on this table.** Log collection, log normalization, log retention, and log integrity protection (e.g., write-once storage, hash chains) are upstream of analysis and live elsewhere. Visualization and dashboarding are downstream. This Concept is about *deriving signal from logs that already exist*.
- **Gaps marked `[needs source]`:** three Facts — manual review's strength, manual review's typical use, and ML's "requires training data and tuning" weakness. All are widely accepted but not yet sourced to a primary publication in this research pass.

## Engine demo opportunities

- `? | strengths → Detects insider risk through behavioral deviation` → UEBA
- `Rule-based correlation | weaknesses → ?` → `Misses novel attack patterns`
- `? | typical use → Production SIEM detection` → Rule-based correlation
- `Machine learning | strengths → ?` → `Detects rare or emerging patterns across telemetry`
- `UEBA | weaknesses → ?` with `Misses novel attack patterns` (Rule-based) and `Requires training data and tuning` (ML) as distractors
- Composite Row profile: Manual review across all Columns with `typical use` swapped to `Account-takeover detection` (UEBA's value)

## Sources

- `[s1]`: NIST SP 800-92 *Guide to Computer Security Log Management*, September 2006 — log management infrastructure functions including event correlation and analysis (retrieved 2026-04-25, https://csrc.nist.gov/pubs/sp/800/92/final). Note: SP 800-92 Rev. 1 is in draft.
- `[s2]`: Vectra *UEBA explained* and ManageEngine *Anomaly detection in cybersecurity* — for rule-based vs. ML vs. UEBA capability framing (retrieved 2026-04-25, https://www.vectra.ai/topics/user-and-entity-behavior-analytics-ueba and https://www.manageengine.com/log-management/cyber-security/what-is-anomaly-detection-in-cybersecurity.html)
- `[s3]`: (ISC)² CISSP Certification Exam Outline, effective 2024-04-15, Domain 7 §7.2 *Conduct logging and monitoring activities* (retrieved 2026-04-25, https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline)
