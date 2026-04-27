# KPI vs KRI vs KCI

**Domain:** 6 — Security Assessment and Testing &nbsp;|&nbsp; **Pattern:** Dimensions &nbsp;|&nbsp; **Tags:** 6.3
**Status:** draft (SME review pending)

The three indicator types CISSP candidates are expected to discriminate. KPIs measure how well an organization is achieving security goals; KRIs measure whether risk is increasing or decreasing; KCIs measure whether controls are operating as designed. The discriminator is *what question each indicator answers*. KPIs answer "are we succeeding?"; KRIs answer "is risk rising?"; KCIs answer "are controls working?". All three feed into the security program's measurement system; none substitutes for the others.

| Indicator | what it measures | leading or lagging | typical use |
|---|---|---|---|
| KPI | Security program performance against goals | Lagging | Executive reporting<br>Goal achievement |
| KRI | Risk levels over time | Leading | Early-warning of rising risk |
| KCI | Control operation effectiveness | Lagging | Audit and assurance |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. **No parentheticals in cells.**
- **Acronym expansions.** `KPI` = Key Performance Indicator. `KRI` = Key Risk Indicator. `KCI` = Key Control Indicator.
- **The three roles are complementary.**
  - **KPIs** look backward at how well the security program met its targets — patches deployed, training completion rate, incidents resolved within SLA.
  - **KRIs** look forward at risk trends — increase in phishing reports, growth in vulnerable third-party dependencies, rising failed-login attempts.
  - **KCIs** look at the present at whether controls are operating — SIEM uptime, vulnerability scanner coverage, MFA enrollment percentage.
- **Leading vs lagging.** KPIs are lagging by design — they measure what already happened. KCIs are mostly lagging — control failures are detected after they occur, but some control monitoring (real-time SIEM coverage gaps, expired certificates approaching expiration) functions as leading. KRIs are explicitly leading — they exist to surface rising risk *before* it materializes as an incident.
- **Threshold-based alerting.** Indicators are typically tracked with thresholds (green / yellow / red bands). Exceeding a threshold triggers escalation. KRIs in particular are tuned so that "yellow" precedes the risk materializing — giving the organization time to act.
- **Examples by indicator type.**
  - **KPIs:** Mean time to detect, mean time to respond, percentage of systems patched within SLA, training completion rate, audit-finding remediation rate.
  - **KRIs:** Number of critical vulnerabilities open, percentage of users with weak passwords, third-party-vendor risk score, malware-detection volume trend.
  - **KCIs:** Backup success rate, SIEM rule coverage percentage, MFA enrollment percentage, vulnerability scanner coverage, certificate-expiration buffer.
- **Cross-Concept link.** Sibling Concept `software-security-metrics` in D8 covers software-specific metrics with similar leading-vs-lagging framing. Account-management metrics (`account-management-metrics`) and backup-verification metrics (`backup-verification-metrics`) are domain-specific instances of KCIs.
- **Out of scope for this Concept:** specific metric design (SMART criteria, GQM — Goal Question Metric), balanced scorecard frameworks, OKRs (Objectives and Key Results) as an alternative to KPIs, FAIR-style quantitative risk metrics (covered in `risk-frameworks` in D1), executive dashboard visualization design.

### Tricky distractors

- **KPI = performance; KRI = risk; KCI = control.** Three different questions. Wrong-answer pattern: collapsing them — each answers a different management question.
- **KRI is leading; KPI/KCI are lagging.** KRI is the only canonical leading indicator in this set. Wrong-answer pattern: claiming KPIs are leading because they measure trends — they measure past performance.
- **Threshold-based alerting drives indicator usage.** Green/yellow/red bands. Wrong-answer pattern: claiming indicators have binary state — bands enable graduated escalation.
- **All three feed the security program.** Complementary, not substitutes. Wrong-answer pattern: claiming KRIs replace KPIs — they answer different questions.
- **KCIs are mostly lagging.** Some monitoring approaches leading. Wrong-answer pattern: classifying KCIs as fully leading — most are detective.
- **Patch deployment rate is KPI; vuln backlog is KRI.** Performance vs risk. Wrong-answer pattern: confusing them — same data viewed through different lenses.

### Values without a direct public citation

| Cell | Notes |
|---|---|
| All rows × leading or lagging | Categorical bins | Industry-typical bins; ISACA and similar professional bodies discuss the distinction without bin-rating per indicator type. |
| All rows × typical use | Phrasings | Pedagogical summaries of indicator deployment patterns. |

## Engine demo opportunities

- `KPI | leading or lagging → ?` → `Lagging`
- `KRI | leading or lagging → ?` → `Leading`
- `KCI | leading or lagging → ?` → `Lagging`
- `? | what it measures → Risk levels over time` → `KRI`
- `? | what it measures → Control operation effectiveness` → `KCI`
- `? | leading or lagging → Leading` → `KRI`
- `? | leading or lagging → Lagging` → `KPI`, `KCI` — shared-Value select-all
- `KRI | typical use → ?` → `Early-warning of rising risk`
- Composite KPI Row with `leading or lagging` swapped to `Leading` — directly tests the leading/lagging axis (KPIs measure past performance, not future risk)
- Composite KRI Row with `what it measures` swapped to `Security program performance against goals` — tests the KPI-vs-KRI distinction (KPIs measure goal achievement; KRIs measure risk)
- Composite KCI Row with `leading or lagging` swapped to `Leading` — tests the KCI framing (KCIs are mostly lagging — they detect failure after it occurs)

## Sources

- `[s1]`: NIST SP 800-55 Rev 2, "Performance Measurement Guide for Information Security" — security measurement concepts including leading and lagging indicators (December 2024, retrieved 2026-04-26, https://csrc.nist.gov/publications/detail/sp/800-55/rev-2/final)
- `[s2]`: ISACA, "Glossary" — KPI / KRI definitions (retrieved 2026-04-26, https://www.isaca.org/resources/glossary)
- `[s3]`: ISACA Risk IT Framework — KRI design and use guidance (retrieved 2026-04-26, https://www.isaca.org/resources/risk-it-framework)
