# Third-Party Assessment Artifacts

**Domain:** 1 — Security and Risk Management &nbsp;|&nbsp; **Pattern:** Dimensions &nbsp;|&nbsp; **Tags:** 1.12
**Status:** draft (SME review pending)

The five third-party security assessment artifacts CISSP courseware tests by name. SOC reports come in three flavors with different scopes and audiences; ISO 27001 certificates are a separate international-standard attestation. Each pairs a *scope* with an *audience* (who the report is meant for), an *assertion* (what the auditor is attesting to), and *when required* (when an organization typically demands one).

| artifact | scope | audience | assertion | when required |
|---|---|---|---|---|
| SOC 1 | Financial-reporting controls at a service organization [s1] | Customer's financial auditors [s1] | Controls relevant to financial reporting [s1] | Customer is publicly traded and uses the service [s1] |
| SOC 2 Type I | Trust Services Criteria controls at a point in time [s1] | Customer security and procurement teams [s1] | Controls designed appropriately as of date [s1] | Customer initial vendor evaluation [s1] |
| SOC 2 Type II | Trust Services Criteria controls over a period [s1] | Customer security and procurement teams [s1] | Controls designed and operating effectively over period [s1] | Customer ongoing vendor assurance [s1] |
| SOC 3 | Trust Services Criteria summary [s1] | General public [s1] | Controls overview without detailed testing [s1] | Public marketing of compliance posture [s1] |
| ISO 27001 certificate | Information Security Management System scope [s2] | Customers and regulators globally [s2] | ISMS conforms to ISO 27001 requirements [s2] | International customer assurance [s2] |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. No parentheticals in cells.
- **Tags 1.12 retained from stub.** Maps to (ISC)² 2024 outline §1.12. Sibling Concept: `industry-standards.md` (the regulatory backdrop), `supply-chain-risks.md` (the SCRM context that drives demand for these artifacts).
- **SOC Type I vs. Type II.** Type I attests that controls were *designed* appropriately at a specific point in time. Type II attests that controls were *designed and operated effectively* over a period (typically 6-12 months). Type II is significantly more rigorous and is what most large customers require for renewal. Type I is acceptable for initial evaluation.
- **SOC 1 vs. SOC 2.** SOC 1 covers controls relevant to *financial reporting* — written for the customer's financial auditors as part of SOX compliance. SOC 2 covers controls relevant to the *Trust Services Criteria* (security, availability, processing integrity, confidentiality, privacy) — written for the customer's security and procurement teams. They serve different audiences and different purposes.
- **SOC 3 is for marketing.** SOC 3 is essentially a SOC 2 with the detailed test results redacted, suitable for public distribution. It tells the market "we have a SOC 2 report" without revealing the specific findings. Many organizations publish SOC 3 on their website and provide SOC 2 only under NDA.
- **ISO 27001 is a certification, not a report.** SOC 2 produces a *report* containing detailed findings; ISO 27001 produces a *certificate* indicating conformance. Two different attestation models. ISO 27001 also requires periodic re-certification (typically every three years with surveillance audits in between); SOC 2 reports cover specific time periods and are typically issued annually.
- **The Trust Services Criteria.** SOC 2 reports cover one or more of: Security (always), Availability, Processing Integrity, Confidentiality, Privacy. The customer specifies which criteria they want evaluated. Most reports cover Security plus one or two additional criteria.
- **What is intentionally not on this table.** SOC 2+, FedRAMP authorization, HITRUST CSF certification, PCI DSS Attestation of Compliance (AOC), and StateRAMP are additional attestation artifacts that overlap with SOC 2 / ISO 27001 in some sectors. The five here cover the most-tested CISSP scope.
- **Gaps marked `[needs source]`:** none — all Facts trace to AICPA SOC framework or ISO 27001 standard documentation.

## Engine demo opportunities

- `? | audience → General public` → SOC 3
- `SOC 2 Type II | assertion → ?` → `Controls designed and operating effectively over period`
- `? | scope → Information Security Management System scope` → ISO 27001 certificate
- `SOC 1 | when required → ?` → `Customer is publicly traded and uses the service`
- `SOC 2 Type I | assertion → ?` with `Controls designed and operating effectively over period` (Type II) as a tempting wrong answer
- Cross-Row shared-Value detection: `? | audience → Customer security and procurement teams` → SOC 2 Type I, SOC 2 Type II
- Composite Row profile: SOC 1 across all Columns with `audience` swapped to `General public` (SOC 3's value)

## Sources

- `[s1]`: AICPA *SOC for Service Organizations* — SOC 1, SOC 2, and SOC 3 framework definitions (retrieved 2026-04-26, https://www.aicpa-cima.com/topic/audit-assurance/audit-and-assurance-greater-than-soc-2)
- `[s2]`: ISO/IEC 27001:2022 *Information security, cybersecurity and privacy protection — Information security management systems — Requirements* (retrieved 2026-04-26, https://www.iso.org/standard/27001)
- `[s3]`: (ISC)² CISSP Certification Exam Outline, effective 2024-04-15, Domain 1 §1.12 (retrieved 2026-04-26, https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline)
