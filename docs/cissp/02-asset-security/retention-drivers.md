# Retention Drivers

**Domain:** 2 — Asset Security &nbsp;|&nbsp; **Pattern:** Dimensions &nbsp;|&nbsp; **Tags:** 2.5
**Status:** draft (SME review pending)

The four categories of retention requirement that govern how long an organization must (or may) keep specific data. Legal hold trumps everything else — once invoked, normal retention rules are suspended. Regulatory drivers carry statutory penalties for non-compliance. Operational drivers are internal business needs. Industry-standard drivers come from contracts and certifications. The CISSP exam tests both the per-driver definition and the matchup with examples.

| driver | examples | typical retention period | governing authority |
|---|---|---|---|
| Legal hold | Pending litigation [s1]<br>Active investigation [s1] | Until lifted by counsel [s1] | Internal counsel and court orders [s1] |
| Regulatory | Tax records [s2]<br>HIPAA medical records [s3] | Statute-defined per record type [s2] | Sectoral regulator [s2] |
| Operational | Customer transaction history [s4] | Defined by business need [s4] | Business unit [s4] |
| Industry standard | PCI cardholder data [s5] | Per industry contract or standard [s5] | Industry body or standards organization [s5] |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. No parentheticals in cells.
- **Tag 2.5 retained from stub.** Maps to (ISC)² 2024 outline §2.5. Sibling Concepts: `data-lifecycle-phases.md` (Phase 5 Archive vs. Phase 6 Destroy decision driver), `data-sanitization-methods.md` (the disposal mechanics for what gets destroyed).
- **Legal hold trumps the others.** When counsel invokes a legal hold (anticipated or active litigation, regulatory investigation, government inquiry), normal retention/destruction rules suspend for the relevant data. Spoliation — destruction of data subject to a legal hold — can result in adverse-inference instructions to the jury, sanctions, or contempt charges. Implementing legal-hold capability into the data-lifecycle program is standard CISSP-tested practice.
- **Regulatory periods are statute-defined and varied.** HIPAA: 6 years for documentation of compliance with the Privacy Rule; medical record retention varies by state law (Texas: 7 years; California: 7 years for adults plus 28 years for minors). IRS tax records: 3 years generally, 7 years for some loss claims. SEC: 7 years for broker-dealer records. The CISSP exam may test the principle (statute-defined) rather than the specific periods.
- **Operational drivers can be longer or shorter than regulatory.** A business may want to keep transaction history forever for analytics; that may conflict with a regulatory minimum (must retain N years) or maximum (must destroy after N years to comply with privacy minimization). The longest applicable period wins on retention; the shortest wins on destruction obligations.
- **Industry standards are contractual.** PCI DSS Requirement 3.1: "Keep cardholder data storage to a minimum by implementing data retention and disposal policies." HITRUST, ISO 27001 certification, and SOC 2 audits all impose retention-policy requirements as part of the certification. These are contractually binding through the certification or merchant agreement.
- **Privacy-minimization tension.** GDPR's storage-limitation principle (Article 5(1)(e)) requires that personal data not be kept longer than necessary. This pulls *down* on retention while regulatory and operational drivers may pull *up*. The CISSP-tested principle: retention must be *justified* per data category, not blanket-applied.
- **The retention-and-destruction policy is the artifact.** Mature programs document a policy mapping each data category to its retention period, the driver(s) requiring that period, the destruction method when expired, and the legal-hold suspension procedure. Without this, retention decisions get made ad hoc and the legal/regulatory exposure is uncontrolled.
- **Gaps marked `[needs source]`:** none — all Facts trace to U.S. statute or PCI DSS framing.

## Engine demo opportunities

- `? | typical retention period → Until lifted by counsel` → Legal hold
- `Regulatory | examples → ?` → `Tax records` or `HIPAA medical records`
- `? | governing authority → Sectoral regulator` → Regulatory
- `Operational | typical retention period → ?` → `Defined by business need`
- `Industry standard | governing authority → ?` with `Sectoral regulator` (Regulatory) and `Internal counsel and court orders` (Legal hold) as distractors
- Composite Row profile: Operational across all Columns with `governing authority` swapped to `Internal counsel and court orders` (Legal hold's value)

## Sources

- `[s1]`: U.S. Federal Rules of Civil Procedure Rule 37(e) — sanctions for failure to preserve electronically stored information (retrieved 2026-04-26, https://www.law.cornell.edu/rules/frcp/rule_37)
- `[s2]`: U.S. Internal Revenue Service publication on tax record retention (retrieved 2026-04-26, https://www.irs.gov/businesses/small-businesses-self-employed/how-long-should-i-keep-records)
- `[s3]`: U.S. Health Insurance Portability and Accountability Act, 45 CFR §164.530(j) — six-year retention of HIPAA-related documentation (retrieved 2026-04-26, https://www.hhs.gov/hipaa/for-professionals/privacy/index.html)
- `[s4]`: ISO/IEC 27001:2022 Annex A.5.33 *Protection of records* — retention policy framing (retrieved 2026-04-26, https://www.iso.org/standard/27001)
- `[s5]`: PCI DSS v4.0 Requirement 3.1 — cardholder data retention and disposal policy (retrieved 2026-04-26, https://www.pcisecuritystandards.org/document_library/)
- `[s6]`: (ISC)² CISSP Certification Exam Outline, effective 2024-04-15, Domain 2 §2.5 (retrieved 2026-04-26, https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline)
