# Supply Chain Risks

**Domain:** 1 — Security and Risk Management &nbsp;|&nbsp; **Pattern:** Dimensions &nbsp;|&nbsp; **Tags:** 1.12
**Status:** draft (SME review pending)

The five supply-chain risk categories the CISSP exam tests by name. Each pairs a *description* of the threat with a *mitigation* and a *real-world example*. The exam tests both the categorization and the matchup between mitigation and risk type — particularly the SBOM and provenance requirements that emerged after Executive Order 14028.

| risk | description | mitigation | real-world example |
|---|---|---|---|
| Counterfeit | Substandard component sold as genuine [s1] | Authorized distributor sourcing [s1] | Counterfeit Cisco network gear [s1] |
| Tampering | Unauthorized modification during shipment [s1] | Tamper-evident packaging and seals [s1] | Hardware implant during shipping interception [needs source] |
| Insertion | Malicious code or component inserted at vendor [s1] | Software Bill of Materials and signed builds [s1] | SolarWinds SUNBURST supply-chain compromise [s1] |
| Vendor lock-in | Dependence on vendor with no exit path [s2] | Multi-vendor strategy [s2]<br>Documented exit plan [s2] | Cloud-provider lock-in [s2] |
| Subcontractor breach | Compromise of vendor's vendor [s1] | Flow-down security requirements in contracts [s1] | Vendor's payroll subcontractor breached [needs source] |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. No parentheticals in cells.
- **Tag 1.12 retained from stub.** Maps to (ISC)² 2024 outline §1.12 *Apply supply chain risk management (SCRM) concepts*. Sibling Concept: `third-party-assessment-artifacts.md` (the audit reports that flow out of SCRM programs).
- **NIST SP 800-161 Rev. 1 is the SCRM reference.** It frames supply-chain risk in terms similar to these five rows and prescribes the SCRM program structure. Executive Order 14028 (May 2021) further mandated SBOM (Software Bill of Materials) and provenance attestation for federal software acquisitions; this is the legal driver behind the Insertion-row mitigation.
- **Counterfeit is hardware-leaning; insertion is software-leaning.** Counterfeit Cisco / Juniper / Intel parts entering enterprise networks via grey-market distributors is the classic counterfeit risk. Insertion is more often software — a malicious update planted in a legitimate vendor's build pipeline (SolarWinds 2020) — but applies to hardware too (e.g., SuperMicro motherboard reports, contested but illustrative).
- **Vendor lock-in is risk, not malice.** Lock-in is not adversarial; it is a structural risk that the vendor *could* raise prices, change terms, or fail without leaving the customer with an exit path. Treat it as a business-continuity input — what is your recovery plan if this vendor goes away?
- **Subcontractor breach is the fourth-party problem.** Your vendor's security may be acceptable, but their vendor's may not be. Many compliance regimes (PCI, HIPAA business associate, GDPR processor-of-processor) flow down requirements explicitly to address this. The mitigation is contractual: every contract with a vendor must require equivalent flow-down to that vendor's subcontractors.
- **SBOM emerged as the insertion-risk control of record.** A Software Bill of Materials lists every component (open-source dependency, third-party library, vendor-bundled software) included in a deliverable. SBOMs make insertion attacks more detectable because the customer can compare what was promised against what was delivered. Federal acquisitions increasingly require SBOM as a precondition.
- **What is intentionally not on this table.** Geographic/geopolitical risks (e.g., source-country bans), single-source dependencies (broader than vendor lock-in), and end-of-life/end-of-support risks are SCRM-adjacent topics. They could be added as additional rows in a future revision.
- **Gaps marked `[needs source]`:** two Facts — specific real-world examples for tampering and subcontractor breach. The categories are well-sourced; the specific high-profile examples are sometimes contested in attribution.

## Engine demo opportunities

- `? | description → Malicious code or component inserted at vendor` → Insertion
- `Vendor lock-in | mitigation → ?` → `Multi-vendor strategy` or `Documented exit plan`
- `? | real-world example → SolarWinds SUNBURST supply-chain compromise` → Insertion
- `Counterfeit | mitigation → ?` → `Authorized distributor sourcing`
- `Subcontractor breach | description → ?` with `Substandard component sold as genuine` (Counterfeit) and `Unauthorized modification during shipment` (Tampering) as distractors
- Composite Row profile: Counterfeit across all Columns with `mitigation` swapped to `Software Bill of Materials and signed builds` (Insertion's value)

## Sources

- `[s1]`: NIST SP 800-161 Rev. 1 *Cybersecurity Supply Chain Risk Management Practices for Systems and Organizations*, May 2022 (retrieved 2026-04-26, https://csrc.nist.gov/pubs/sp/800/161/r1/final)
- `[s2]`: U.S. Executive Order 14028 *Improving the Nation's Cybersecurity*, May 2021 — SBOM and software supply chain provisions (retrieved 2026-04-26, https://www.cisa.gov/topics/cybersecurity-best-practices/executive-order-improving-nations-cybersecurity)
- `[s3]`: (ISC)² CISSP Certification Exam Outline, effective 2024-04-15, Domain 1 §1.12 (retrieved 2026-04-26, https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline)
