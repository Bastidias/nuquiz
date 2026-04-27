# Assessment Types

**Domain:** 6 — Security Assessment and Testing &nbsp;|&nbsp; **Pattern:** Dimensions &nbsp;|&nbsp; **Tags:** 6.1
**Status:** draft (SME review pending)

The seven canonical security assessment types CISSP candidates are expected to discriminate. The discriminating axes are *objective* (what question the assessment answers), *depth* (how invasive the testing is), *frequency* (how often the assessment runs), and *output* (what artifact the assessment produces). The most-tested distinction is vulnerability scan vs penetration test — both look for vulnerabilities but differ profoundly in depth and output.

| Assessment | objective | depth | frequency | output |
|---|---|---|---|---|
| Vulnerability scan | Identify known vulnerabilities | Surface-level signature match | Continuous to weekly | Vulnerability report with CVSS scores |
| Penetration test | Demonstrate exploitable risk | Deep manual exploitation | Annually to per-release | Pen test report with proven attack chains |
| Audit | Verify control compliance | Evidence sampling against framework | Annually to quarterly | Audit report with findings and remediation |
| Code review | Find security defects in source | Line-by-line analysis | Per pull request to per-release | Defect list with severity |
| Configuration review | Verify system hardening | Configuration comparison against baseline | Quarterly to annually | Compliance gap report |
| Compliance assessment | Verify regulatory adherence | Documentation and control sampling | Annually | Compliance attestation |
| Risk assessment | Quantify or qualify organizational risk | Asset and threat analysis | Annually | Risk register with prioritization |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. **No parentheticals in cells.**
- **Vulnerability scan vs Penetration test — the headline distinction.**
  - **Vulnerability scan** uses an automated tool (Nessus, Qualys, Rapid7) to fingerprint exposed services and match them against a vulnerability database. Output is breadth-oriented: hundreds or thousands of findings with CVSS scores. Cannot prove exploitation; reports many false positives.
  - **Penetration test** uses human testers to attempt actual exploitation. Output is depth-oriented: a smaller number of *proven* attack chains, often demonstrating realistic compromise paths. Catches business-logic vulnerabilities and chained exploits that automated scanners miss.
  - **Test framing:** "which assessment proves a vulnerability is exploitable?" → Penetration test. "Which assessment runs continuously?" → Vulnerability scan.
- **Audit vs Compliance assessment.** Audits are broader — they verify *control effectiveness* against a framework (SOC 2, ISO 27001, NIST CSF). Compliance assessments are narrower — they verify *regulatory adherence* against specific laws (HIPAA, GDPR, PCI DSS). All compliance assessments are audits; not all audits are compliance assessments.
- **Code review.** Manual code-review activity (vs the automated source-code-analysis covered in `source-code-analysis-types`). Sibling Concept `manual-review-types` covers the styles of manual review (peer, formal inspection, etc.).
- **Configuration review.** Compares running-system configuration against a hardening baseline (CIS Benchmarks, DISA STIGs). Distinct from vulnerability scanning because the focus is *misconfiguration* (e.g., default credentials, unnecessary services enabled, weak cipher suites) rather than known-CVE-vulnerable software versions.
- **Risk assessment is the highest-level activity.** Outputs feed into the risk register and the security strategy. Inputs typically include results from the other six assessment types — risk assessment synthesizes them into prioritized organizational risks. Sibling Concept `risk-frameworks` in D1 covers the methodologies (NIST RMF, ISO 27005, OCTAVE, FAIR).
- **Frequency is regulation-driven for the audit / compliance rows.** PCI DSS requires quarterly vulnerability scans and annual penetration tests; SOX requires annual control audits; HIPAA requires periodic risk assessments. Cell values reflect dominant patterns; specific organizations align to applicable regulations.
- **Out of scope for this Concept:** assessment perspectives (sibling Concept `assessment-perspectives` — internal vs external vs third-party), pen test execution phases (sibling Concept `penetration-test-phases`), pen test perspectives (sibling Concept `pen-test-perspectives` — black/grey/white box), CVSS scoring (sibling Concept `vulnerability-severity-scoring`), specific tools per assessment type.

### Tricky distractors

- **Vuln scan identifies; pen test exploits.** Headline distinction. Wrong-answer pattern: collapsing them — pen test goes deeper than scan.
- **Audit vs Compliance assessment.** Audits verify control effectiveness against framework. Compliance verifies regulatory adherence. Wrong-answer pattern: equating them — every compliance assessment is an audit, but not every audit is compliance.
- **Vuln scan runs continuously; pen test annually.** Different cadences. Wrong-answer pattern: claiming pen tests run continuously — they're depth activities.
- **Code review vs SAST.** Code review can be manual or automated. SAST is the automated subset. Wrong-answer pattern: collapsing them — manual code review catches business logic; SAST catches patterns.
- **Risk assessment synthesizes other assessments.** It's the apex, not a peer. Wrong-answer pattern: treating risk assessment as same-level as vuln scans — risk assessment consumes their outputs.
- **Configuration review checks misconfiguration; vuln scan checks known-CVE.** Different focus. Wrong-answer pattern: collapsing them — CIS baseline check ≠ Nessus scan.

### Values without a direct public citation

| Cell | Notes |
|---|---|
| All rows × frequency | Cadences | Industry-typical and regulation-driven; specific durations vary by applicable regulation. |
| All rows × output | Output artifacts | Common-practice naming; no normative source enumerates per-assessment output. |
| All rows × objective | Objective phrasings | NIST SP 800-115 [s1] discusses assessment categories conceptually; the cell phrasings are pedagogical summaries. |

## Engine demo opportunities

- `Vulnerability scan | objective → ?` → `Identify known vulnerabilities`
- `Penetration test | objective → ?` → `Demonstrate exploitable risk`
- `? | depth → Deep manual exploitation` → `Penetration test`
- `? | depth → Surface-level signature match` → `Vulnerability scan`
- `? | output → Risk register with prioritization` → `Risk assessment`
- `? | objective → Verify control compliance` → `Audit`
- `? | objective → Verify regulatory adherence` → `Compliance assessment`
- Composite Vulnerability scan Row with `objective` swapped to `Demonstrate exploitable risk` — directly tests the scan-vs-pentest distinction (scans identify; pentests demonstrate)
- Composite Penetration test Row with `frequency` swapped to `Continuous to weekly` — tests pentest cadence (annual / per-release, not continuous)
- Composite Risk assessment Row with `output` swapped to `Vulnerability report with CVSS scores` — tests risk-assessment output (risk register, not vulnerability list)

## Sources

- `[s1]`: NIST SP 800-115, "Technical Guide to Information Security Testing and Assessment" (September 2008, retrieved 2026-04-26, https://csrc.nist.gov/publications/detail/sp/800-115/final)
- `[s2]`: NIST SP 800-30 Rev 1, "Guide for Conducting Risk Assessments" — risk-assessment methodology (September 2012, retrieved 2026-04-26, https://csrc.nist.gov/publications/detail/sp/800-30/rev-1/final)
- `[s3]`: NIST SP 800-53A Rev 5, "Assessing Security and Privacy Controls in Information Systems and Organizations" — control-assessment guidance (January 2022, retrieved 2026-04-26, https://csrc.nist.gov/publications/detail/sp/800-53a/rev-5/final)
