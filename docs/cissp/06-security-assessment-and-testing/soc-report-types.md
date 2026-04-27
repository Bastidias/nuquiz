# SOC Report Types

**Domain:** 6 — Security Assessment and Testing &nbsp;|&nbsp; **Pattern:** Dimensions &nbsp;|&nbsp; **Tags:** 6.5, 1.12
**Status:** draft (SME review pending)

The four AICPA SOC reports CISSP candidates are expected to discriminate. Each pairs *scope* (what controls are evaluated), *audience* (who the report is meant for), *period covered* (point-in-time vs over-period), and *typical use* (when an organization commissions or requests this report). Cross-tagged with D1.12 because SOC reports are also third-party-assessment artifacts; sibling Concept `third-party-assessment-artifacts` in D1 covers the same content from the supply-chain-risk angle.

| Report | scope | audience | period covered | typical use |
|---|---|---|---|---|
| SOC 1 | Financial-reporting controls at a service organization | Customer's financial auditors | Type I point in time<br>Type II over period | Customer is publicly traded and uses the service |
| SOC 2 Type I | Trust Services Criteria controls | Customer security and procurement teams | Point in time | Initial vendor evaluation |
| SOC 2 Type II | Trust Services Criteria controls | Customer security and procurement teams | Over period of 6 to 12 months | Ongoing vendor assurance |
| SOC 3 | Trust Services Criteria controls | General public | Over period | Public marketing of compliance posture |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. **No parentheticals in cells.**
- **AICPA System and Organization Controls.** The SOC framework was developed by the American Institute of Certified Public Accountants (AICPA) to attest to controls at service organizations. Reports are issued by licensed CPA firms following the AICPA SSAE 18 standard (formerly SAS 70).
- **SOC 1 covers ICFR.** Internal Control over Financial Reporting. SOC 1 reports address controls at the service organization that affect *customer's* financial statements — written for the customer's external financial auditors as part of SOX-compliance audits. SOC 1 does not address security comprehensively.
- **SOC 2 covers Trust Services Criteria.** Sibling Concept `soc2-trust-service-criteria` covers the five TSCs: Security (always required), Availability, Processing Integrity, Confidentiality, Privacy. SOC 2 reports address controls relevant to one or more TSCs as scoped by the service organization.
- **Type I vs Type II — the most-tested distinction.**
  - **Type I:** controls were *designed* appropriately *as of a specific date*. Snapshot in time.
  - **Type II:** controls were *designed and operated effectively* over a *period of time* (typically 6-12 months). Includes Type I conclusions plus operational testing of evidence over the period.
  - Type II is significantly more rigorous and is what most enterprise customers require for renewal. Type I is acceptable for first-time evaluation when the service organization hasn't been operating long enough to provide a Type II.
- **SOC 3 is the public-distribution version.** SOC 3 reports include the auditor's opinion and management's assertion but redact the detailed findings and test results that appear in SOC 2. They are designed to be distributed publicly (websites, marketing materials) without exposing sensitive control-testing detail. Some service organizations publish SOC 3 publicly and provide SOC 2 only under NDA.
- **SOC 1 also has Type I and Type II variants.** The cell collapses this for consistency with the stub structure; sibling Concept `third-party-assessment-artifacts` in D1 splits SOC 1 into a single row but the Type I / Type II variants apply equivalently.
- **Cross-Concept link.** Sibling Concepts: `soc2-trust-service-criteria` (the five TSCs scoped by SOC 2 / SOC 3), `audit-types` (the broader audit taxonomy that includes SOC reports as third-party audit outputs), `third-party-assessment-artifacts` in D1 (the supply-chain-risk angle on the same SOC reports plus ISO 27001 certification).
- **Out of scope for this Concept:** SAS 70 (the predecessor to SSAE 18), SOC for Cybersecurity (an emerging variant), SOC for Supply Chain, ISAE 3402 (the international parallel to SOC 1), specific TSC requirements per criterion, SOC report bridge letters between report periods.

### Tricky distractors

- **Type I vs Type II.** Type I = point in time (design only). Type II = 6-12 months (design + operating effectiveness). Wrong-answer pattern: claiming Type I is sufficient for ongoing assurance — Type II is required.
- **SOC 1 ≠ SOC 2.** SOC 1 = financial reporting controls (ICFR). SOC 2 = Trust Services Criteria. Wrong-answer pattern: using SOC 1 for security assessment — wrong scope.
- **SOC 3 is for public distribution.** SOC 2 typically under NDA. Wrong-answer pattern: marketing SOC 2 reports publicly — they contain testing detail; SOC 3 is the public-distribution variant.
- **SOC 2 has 5 Trust Services Criteria.** Security is always required; the others are optional scope. Wrong-answer pattern: claiming all five are mandatory in every SOC 2.
- **SOC 2 Type II requires period observation.** Auditor observes over months. Wrong-answer pattern: claiming Type II can be completed in a day — minimum periods apply.
- **SOC reports are third-party (independence).** Issued by licensed CPA firm. Wrong-answer pattern: claiming an organization can self-issue SOC reports — they cannot.

### Values without a direct public citation

| Cell | Notes |
|---|---|
| All rows × typical use | Use-case phrasings | Industry-typical use cases; AICPA SOC framework documentation [s1] addresses report types without prescribing per-type "typical use." |

## Engine demo opportunities

- `SOC 1 | scope → ?` → `Financial-reporting controls at a service organization`
- `SOC 2 Type II | period covered → ?` → `Over period of 6 to 12 months`
- `SOC 2 Type I | period covered → ?` → `Point in time`
- `SOC 3 | audience → ?` → `General public`
- `? | audience → General public` → `SOC 3`
- `? | audience → Customer's financial auditors` → `SOC 1`
- `? | typical use → Public marketing of compliance posture` → `SOC 3`
- Composite SOC 2 Type I Row with `period covered` swapped to `Over period of 6 to 12 months` — directly tests the Type I vs Type II distinction (Type I is point-in-time; Type II is over-period)
- Composite SOC 1 Row with `audience` swapped to `General public` — tests the SOC 1 vs SOC 3 distinction (SOC 1 is for financial auditors; SOC 3 is public)
- Composite SOC 3 Row with `audience` swapped to `Customer security and procurement teams` — tests the SOC 2 vs SOC 3 distinction (SOC 2 is detailed and under NDA; SOC 3 is summary and public)

## Sources

- `[s1]`: AICPA, "SOC for Service Organizations: Information for Service Organizations" — SOC 1 / SOC 2 / SOC 3 framework definitions (retrieved 2026-04-26, https://www.aicpa-cima.com/topic/audit-assurance/audit-and-assurance-greater-than-soc-2)
- `[s2]`: AICPA, "Statement on Standards for Attestation Engagements (SSAE) 18" — the underlying attestation standard (retrieved 2026-04-26, https://us.aicpa.org/research/standards/auditattest/ssae)
