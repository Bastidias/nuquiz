# Industry Standards

**Domain:** 1 — Security and Risk Management &nbsp;|&nbsp; **Pattern:** Dimensions &nbsp;|&nbsp; **Tags:** 1.4
**Status:** draft (SME review pending)

Four high-impact compliance regimes the CISSP exam tests by name. PCI-DSS governs payment-card processing; SOX governs publicly-traded company financial controls; GLBA governs financial institutions' handling of customer information; FISMA governs U.S. federal information systems. Each pairs a *scope* (what it covers) with an *enforcer* (who can sanction non-compliance) and *key requirements* (the high-order obligations).

| standard | scope | enforcer | key requirements |
|---|---|---|---|
| PCI-DSS | Cardholder data environment for payment-card processors [s1] | Payment-card brands via acquiring banks [s1] | Network segmentation [s1]<br>Encryption of cardholder data [s1]<br>Annual assessment [s1] |
| SOX | Publicly-traded U.S. company financial reporting [s2] | SEC and PCAOB [s2] | IT general controls over financial systems [s2]<br>Annual management attestation [s2] |
| GLBA | U.S. financial institutions' nonpublic personal information [s3] | FTC and federal financial regulators [s3] | Safeguards Rule security program [s3]<br>Privacy notice to customers [s3] |
| FISMA | U.S. federal government information systems [s4] | OMB via agency CIOs [s4] | NIST RMF compliance [s4]<br>Annual security assessment [s4] |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. No parentheticals in cells.
- **Tag 1.4 retained from stub.** Maps to (ISC)² 2024 outline §1.4 *Determine compliance and other requirements* (the "other regulatory" sub-objective).
- **PCI-DSS is contractual, not statutory.** It is enforced through the merchant agreement with payment-card brands, not by government regulation. Non-compliance penalties are revocation of card-acceptance privileges plus fines from the brand. This is a CISSP exam favorite — students often assume "regulation" without checking the legal source.
- **SOX vs. GLBA scope.** SOX targets *publicly traded* companies regardless of industry; GLBA targets *financial institutions* regardless of public/private status. A privately-held bank is GLBA but not SOX; a publicly-traded software company is SOX but not GLBA. A publicly-traded bank is both.
- **FISMA leans on NIST.** Federal agencies subject to FISMA must implement security per NIST guidance — the SP 800 series, especially SP 800-53 control catalog and SP 800-37 RMF. This is why NIST publications are so prominent on the CISSP exam: they are the federal compliance baseline.
- **What is intentionally not on this table.** HIPAA (healthcare), GDPR (EU privacy), and CCPA/CPRA (California privacy) are equally important compliance regimes but live in `privacy-laws.md` because they carry a privacy-specific framing. State data-breach notification laws live elsewhere. SOC 2 is an attestation framework rather than a compliance regime; it appears in Domain 6.
- **Compliance is a floor, not a ceiling.** All four standards specify *minimum* requirements. A control program that does only what compliance requires will likely fail audits at the next maturity check; mature programs use compliance as a baseline and exceed it where business risk justifies. CISSP questions sometimes test this — "is compliance enough?" → No, it is the floor.
- **Gaps marked `[needs source]`:** none — all Facts trace to the regulating bodies' published material.

### Tricky distractors

- **PCI-DSS is contractual, not statutory.** Enforced via merchant agreement. Wrong-answer pattern: claiming PCI-DSS is government regulation — it's industry contract.
- **SOX vs GLBA scope.** SOX = public companies (any industry). GLBA = financial institutions (any public status). Wrong-answer pattern: equating them — different scope axes.
- **FISMA mandates NIST RMF.** Federal agencies follow SP 800-53 and SP 800-37. Wrong-answer pattern: claiming FISMA is industry-agnostic — federal-government-only.
- **Compliance is the floor.** Mature programs exceed minimum. Wrong-answer pattern: claiming compliance equals security — meeting only minimum is the bar to clear, not aspire to.
- **HIPAA is privacy-framed.** Lives in `privacy-laws`, not industry standards. Wrong-answer pattern: classifying HIPAA alongside SOX — different framework category.
- **PCI-DSS v4.0 is current.** Replaced v3.2.1 in 2024. Wrong-answer pattern: citing older PCI versions — current is v4.0.

## Engine demo opportunities

- `? | enforcer → SEC and PCAOB` → SOX
- `PCI-DSS | scope → ?` → `Cardholder data environment for payment-card processors`
- `? | key requirements → NIST RMF compliance` → FISMA
- `GLBA | scope → ?` → `U.S. financial institutions' nonpublic personal information`
- `SOX | enforcer → ?` with `OMB via agency CIOs` (FISMA) and `Payment-card brands via acquiring banks` (PCI-DSS) as distractors
- Composite Row profile: PCI-DSS across all Columns with `enforcer` swapped to `OMB via agency CIOs` (FISMA's value)

## Sources

- `[s1]`: PCI Security Standards Council *Payment Card Industry Data Security Standard v4.0* (retrieved 2026-04-26, https://www.pcisecuritystandards.org/document_library/)
- `[s2]`: U.S. Sarbanes-Oxley Act of 2002, Sections 302 and 404 — public company financial reporting controls (retrieved 2026-04-26, https://www.sec.gov/about/laws/soa2002.pdf)
- `[s3]`: U.S. Gramm-Leach-Bliley Act, Title V — Privacy and Safeguards Rules (retrieved 2026-04-26, https://www.ftc.gov/business-guidance/privacy-security/gramm-leach-bliley-act)
- `[s4]`: U.S. Federal Information Security Modernization Act of 2014 — federal information system security requirements (retrieved 2026-04-26, https://www.cisa.gov/topics/cyber-threats-and-advisories/federal-information-security-modernization-act)
- `[s5]`: (ISC)² CISSP Certification Exam Outline, effective 2024-04-15, Domain 1 §1.4 (retrieved 2026-04-26, https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline)
