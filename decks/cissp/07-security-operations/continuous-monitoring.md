# Continuous Monitoring Components

**Domain:** 7 — Security Operations &nbsp;|&nbsp; **Pattern:** Dimensions &nbsp;|&nbsp; **Tags:** 7.2
**Status:** draft (SME review pending)

The four data streams an Information Security Continuous Monitoring (ISCM) program watches per NIST SP 800-137: assets (what we have), configurations (how it's set up), vulnerabilities (what's exploitable), and threats (what's coming for it). Each stream has a distinct *alerting trigger* — the condition that converts passive monitoring into an actionable signal. The CISSP exam tests the matchup between monitoring stream and alerting trigger more than the underlying technologies.

| component | what it watches | alerting trigger |
|---|---|---|
| Asset monitoring | Inventory of enterprise hardware assets [s1]<br>Inventory of enterprise software assets [s1] | Unauthorized asset detected on network [s2] |
| Configuration monitoring | Configuration state vs approved baseline [s1] | Configuration drift from baseline [s3] |
| Vulnerability monitoring | Known vulnerabilities present on assets [s1] | Newly disclosed vulnerability matches deployed asset [s4] |
| Threat monitoring | Threat intelligence relevant to assets [s1]<br>Active threat indicators in environment [s1] | Threat indicator matches observed activity [needs source] |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. No parentheticals in cells.
- **Tag 7.2 retained from stub.** Matches (ISC)² 2024 outline §7.2 *Conduct logging and monitoring activities*.
- **Where the four components come from.** NIST SP 800-137 frames ISCM as providing "visibility into organizational assets, awareness of threats and vulnerabilities, and visibility into the effectiveness of deployed security controls" [s1]. The stub author decomposed this into four parallel monitoring streams. Configuration monitoring corresponds to NIST's "control effectiveness" framing because configurations are the most testable proxy for control posture.
- **Why the alerting triggers cite CIS Controls instead of NIST.** NIST SP 800-137 sets the *conceptual* framework for ISCM but does not prescribe specific alert conditions. CIS Controls v8.1 operationalizes each monitoring stream into concrete safeguards with detection criteria — Control 1 (asset detection), Control 4 (configuration drift), Control 7 (vulnerability matching). The two frameworks are complementary, not competing.
- **What is intentionally not on this table.** Log management and SIEM tooling are sibling Concepts (`log-analysis-methods.md`, `siem-soar-xdr.md`); this Concept is about *what is monitored*, not *how the data is processed*. User behavior analytics and metric/KPI dashboards are downstream uses of these four streams rather than separate streams.
- **Configuration drift is the test-favorite.** Drift detection — comparing current state against the approved baseline (`configuration-baselines.md`) — is the most-cited operational use of continuous monitoring on the CISSP exam. Tie this row mentally to the operational baseline row in the baselines Concept.
- **Gaps marked `[needs source]`:** one Fact — "Threat indicator matches observed activity" as the alerting trigger for threat monitoring. Standard SIEM/threat-intel practice but not yet sourced to a primary publication in this research pass.

### Tricky distractors

- **ISCM is continuous, not periodic.** NIST SP 800-137 framing. Wrong-answer pattern: claiming continuous monitoring means "more frequent assessments" — it's continuous data collection.
- **Drift detection compares against baseline.** Operational baseline is the reference. Wrong-answer pattern: claiming drift detection compares to current state of peer systems — it's against approved baseline.
- **Asset monitoring catches unauthorized devices.** New unknown asset = alert. Wrong-answer pattern: claiming asset monitoring is just inventory — the monitoring is for change, not just enumeration.
- **Vulnerability monitoring matches CVEs to assets.** Continuous match. Wrong-answer pattern: claiming vulnerability monitoring is just running scans periodically — continuous correlation against feed updates.
- **Threat monitoring uses threat intel feeds.** External + internal correlation. Wrong-answer pattern: claiming threat monitoring is purely reactive — it's intel-driven and proactive.
- **Four streams are independent but related.** Each has its own alert trigger. Wrong-answer pattern: collapsing all monitoring into one stream — different data sources, different triggers.

## Engine demo opportunities

- `? | alerting trigger → Configuration drift from baseline` → Configuration monitoring
- `Asset monitoring | what it watches → ?` → `Inventory of enterprise hardware assets` or `Inventory of enterprise software assets`
- `? | what it watches → Known vulnerabilities present on assets` → Vulnerability monitoring
- `Threat monitoring | alerting trigger → ?` with `Configuration drift from baseline` (Configuration) and `Unauthorized asset detected on network` (Asset) as distractors
- Composite Row profile: Asset monitoring across all Columns with `alerting trigger` swapped to `Newly disclosed vulnerability matches deployed asset` (Vulnerability's value)

## Sources

- `[s1]`: NIST SP 800-137 *Information Security Continuous Monitoring (ISCM) for Federal Information Systems and Organizations*, September 2011 (retrieved 2026-04-25, https://csrc.nist.gov/pubs/sp/800/137/final)
- `[s2]`: CIS Critical Security Controls v8.1, Control 1 *Inventory and Control of Enterprise Assets* (retrieved 2026-04-25, https://www.cisecurity.org/controls/inventory-and-control-of-enterprise-assets)
- `[s3]`: CIS Critical Security Controls v8.1, Control 4 *Secure Configuration of Enterprise Assets and Software* (retrieved 2026-04-25, https://www.cisecurity.org/controls/secure-configuration-of-enterprise-assets-and-software)
- `[s4]`: CIS Critical Security Controls v8.1, Control 7 *Continuous Vulnerability Management* (retrieved 2026-04-25, https://www.cisecurity.org/controls/continuous-vulnerability-management)
- `[s5]`: (ISC)² CISSP Certification Exam Outline, effective 2024-04-15, Domain 7 §7.2 *Conduct logging and monitoring activities* (retrieved 2026-04-25, https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline)
