# Report Stakeholders

**Domain:** 6 — Security Assessment and Testing &nbsp;|&nbsp; **Pattern:** Dimensions &nbsp;|&nbsp; **Tags:** 6.4
**Status:** draft (SME review pending)

The four primary stakeholder audiences for security assessment reports. Each audience needs different *content emphasis* (what to include), *format* (how to present it), and *frequency* (how often to deliver). One report rarely serves all four audiences well; mature programs produce role-tailored views from the same underlying findings. The CISSP exam tests the matchup between audience and the appropriate report style — a 100-page technical pen test report does not work as an executive briefing.

| Stakeholder | content emphasis | format | frequency |
|---|---|---|---|
| Executive | Business impact and strategic risk | One-page summary<br>Dashboard | Quarterly |
| Technical | Specific findings and remediation steps | Detailed report with reproduction steps | Per assessment |
| Auditor | Control evidence aligned to framework | Structured documentation per control | Annually for SOC 2<br>Triggered by audit |
| Customer | Compliance posture summary | Attestation letter<br>SOC 3 or sanitized SOC 2 | Annually |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. **No parentheticals in cells.**
- **Executive content emphasis is risk and impact.** Executives have limited time and need decisions, not data. They want to know "are we more or less exposed than last quarter?" and "where do we need to invest?" Specific CVE counts and CVSS scores are less useful than aggregate trend lines and prioritized risk areas. The format follows: dashboards, one-page summaries, board-deck slides.
- **Technical reports include reproduction.** Technical stakeholders (developers, engineers, IT operations) need to fix what was found. They need exact reproduction steps, payload examples, affected versions, and recommended fixes. The technical report's quality is measured by whether the recipient can act on it without further questions.
- **Auditor reports map findings to a control framework.** Auditors test whether controls operate effectively against a framework (SOC 2 TSC, ISO 27001 Annex A, NIST CSF, etc.). They need evidence formatted around control objectives — sometimes the same finding appears under multiple controls. Auditor reports are structured documentation with traceable evidence chains, not narrative reports.
- **Customer reports are public-friendly attestations.** Customers (especially in B2B contexts) want assurance that their vendor is secure. They get an attestation letter (the SOC 2 cover letter), a sanitized SOC 2 report under NDA, or a SOC 3 (publicly distributable). Customers rarely get the underlying technical findings.
- **Frequency varies.** Technical reports are produced per assessment — every pen test, every vulnerability scan, every code review generates a report. Executive reporting is recurring (quarterly is common). Auditor reporting is annual or triggered by audit cycles. Customer reporting follows the attestation cycle (typically annual SOC 2 reports).
- **Cross-Concept link.** Sibling Concept `assessment-types` covers what kinds of assessments produce these reports. Sibling `soc-report-types` covers the specific SOC 1/2/3 report distinctions cited in the customer row.
- **Out of scope for this Concept:** specific report-template structures, dashboard tooling, executive-briefing best practices, audit-evidence-collection workflows, vendor risk questionnaires (SIG, CAIQ), bug bounty hall-of-fame disclosure formats.

### Tricky distractors

- **One report doesn't serve all audiences.** Role-tailored views needed. Wrong-answer pattern: producing single comprehensive report for all stakeholders — gets ignored.
- **Executives want decisions, not data.** Trend lines and risk areas. Wrong-answer pattern: presenting CVE counts to executives — they need business impact framing.
- **Technical reports must enable fix.** Reproduction steps. Wrong-answer pattern: claiming vague descriptions are sufficient for technical audience — they need actionable detail.
- **Customer reports are sanitized.** SOC 3 publicly, SOC 2 under NDA. Wrong-answer pattern: sharing detailed findings with customers — they get attestations.
- **Auditor reports map to controls.** Framework-aligned. Wrong-answer pattern: presenting auditor reports as narrative — they're structured per-control evidence.
- **Frequency varies by audience.** Per-assessment, quarterly, annual, attestation-cycle. Wrong-answer pattern: applying one cadence to all audiences.

### Values without a direct public citation

| Cell | Notes |
|---|---|
| All rows | Industry-typical reporting patterns; no single primary public source enumerates this taxonomy. NIST SP 800-115 [s1] addresses reporting at a high level. |

## Engine demo opportunities

- `Executive | content emphasis → ?` → `Business impact and strategic risk`
- `Technical | format → ?` → `Detailed report with reproduction steps`
- `Customer | format → ?` → `Attestation letter`, `SOC 3 or sanitized SOC 2`
- `? | content emphasis → Control evidence aligned to framework` → `Auditor`
- `? | content emphasis → Compliance posture summary` → `Customer`
- `Auditor | frequency → ?` → `Annually for SOC 2`, `Triggered by audit`
- Composite Executive Row with `format` swapped to `Detailed report with reproduction steps` — directly tests the audience-to-format pairing (executives get summaries; technical stakeholders get detail)
- Composite Customer Row with `content emphasis` swapped to `Specific findings and remediation steps` — tests the customer-vs-technical distinction (customers get attestations, not detailed findings)
- Composite Auditor Row with `frequency` swapped to `Per assessment` — tests audit cadence (auditor reports are annual / triggered, not per-assessment)

## Sources

- `[s1]`: NIST SP 800-115, "Technical Guide to Information Security Testing and Assessment" — reporting guidance (September 2008, retrieved 2026-04-26, https://csrc.nist.gov/publications/detail/sp/800-115/final)
- `[s2]`: AICPA, "SOC for Service Organizations" — SOC 2 / SOC 3 report stakeholder framing (retrieved 2026-04-26, https://www.aicpa-cima.com/topic/audit-assurance/audit-and-assurance-greater-than-soc-2)
