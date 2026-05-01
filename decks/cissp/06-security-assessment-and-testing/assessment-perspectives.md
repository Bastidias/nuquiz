# Assessment Perspectives

**Domain:** 6 — Security Assessment and Testing &nbsp;|&nbsp; **Pattern:** Dimensions &nbsp;|&nbsp; **Tags:** 6.1
**Status:** draft (SME review pending)

The three perspectives from which a security assessment can be conducted. The discriminator is *who performs the assessment* and *how independent* they are from the assessed system. Internal assessments are inexpensive and frequent but carry the lowest independence; external (third-party) assessments are expensive but provide the highest independence and are required for many regulatory attestations (SOC 2, ISO 27001, PCI DSS QSA assessments). CISSP testing focuses on when each perspective is appropriate.

| Perspective | who performs | scope | independence | typical purpose |
|---|---|---|---|---|
| Internal | Organization's own staff | Defined by management | Low | Continuous improvement |
| External | Outside firm hired by the organization | Defined by contract | High | Independent verification |
| Third-party | Auditor on behalf of a regulator or standard | Defined by the framework | Highest | Compliance attestation |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. **No parentheticals in cells.**
- **The three perspectives are not mutually exclusive.** A mature security program runs all three: internal teams continuously assess, external consultants run periodic deep assessments, and regulator-mandated third-party auditors verify compliance. CISSP testing usually asks "which perspective is appropriate for X" — for example, SOC 2 attestation requires Third-party.
- **External vs Third-party.** The boundary is who *commissions* the assessment.
  - **External:** the organization hires an outside firm. The firm works for and reports to the organization. Common pattern: paying a consultancy for a penetration test.
  - **Third-party:** the assessor works on behalf of a regulator, certifying body, or downstream customer. The firm may be hired by the organization, but its loyalty is contractually to the framework. PCI DSS QSAs (Qualified Security Assessors) and SOC 2 auditors are Third-party in this sense.
- **Independence is the spectrum that matters.** Internal staff have institutional incentives to under-report findings (career risk, project pressure). External consultants are partially independent but are still paid by the organization being assessed. Third-party assessors operating under a framework have the strongest formal independence — their professional license depends on faithful reporting regardless of client preference.
- **Internal assessments are the workhorse.** Vulnerability scans, configuration reviews, and code reviews typically run internally because the cadence (continuous to weekly) is incompatible with external engagement costs. Internal assessments are valid and valuable; they just don't substitute for periodic external verification.
- **Regulatory drivers for Third-party.** PCI DSS Level 1 merchants must engage a QSA annually; ISO 27001 certification requires accredited third-party auditors; SOC 2 reports must be issued by a licensed CPA firm; FedRAMP requires 3PAOs (Third-Party Assessment Organizations).
- **Out of scope for this Concept:** specific certification bodies (PCI Security Standards Council QSA program, ISO 27001 accredited certification bodies, AICPA SOC auditor licensing), cost ranges per engagement, time-to-engagement for external assessors, MSSP retainer models, bug-bounty programs (a hybrid model not classically captured here).

### Tricky distractors

- **External hired by org; Third-party hired by regulator.** Different loyalties. Wrong-answer pattern: equating them — same firm can be External or Third-party depending on engagement.
- **Internal has lowest independence.** Career incentives bias reporting. Wrong-answer pattern: claiming internal is most accurate because they know the system best — system knowledge ≠ independence.
- **Third-party required for regulatory attestation.** PCI QSA, SOC 2, ISO 27001. Wrong-answer pattern: claiming external assessments satisfy regulatory mandate — only third-party does.
- **All three perspectives coexist in mature programs.** Internal continuous + External periodic + Third-party regulatory. Wrong-answer pattern: claiming organizations should pick one.
- **Internal assessments are workhorse.** Vuln scans, config review run internally. Wrong-answer pattern: claiming internal assessments are insufficient — they're valid for many purposes, just not for compliance.
- **Bug bounty is hybrid.** External assessors that aren't formally engaged. Wrong-answer pattern: classifying bug bounty as standard external assessment — it's a different model.

### Values without a direct public citation

| Cell | Notes |
|---|---|
| All rows × independence | Categorical bins | Industry-typical framings; NIST SP 800-115 [s1] discusses internal vs external assessments without bin-rating independence. |
| All rows × typical purpose | Purpose phrasings | Pedagogical summaries; specific purposes vary by engagement scope. |

## Engine demo opportunities

- `Internal | independence → ?` → `Low`
- `Third-party | independence → ?` → `Highest`
- `? | independence → High` → `External`
- `? | who performs → Auditor on behalf of a regulator or standard` → `Third-party`
- `? | typical purpose → Compliance attestation` → `Third-party`
- `External | typical purpose → ?` → `Independent verification`
- Composite Internal Row with `independence` swapped to `Highest` — directly tests the independence axis (internal staff have the lowest independence; third-party assessors have the highest)
- Composite External Row with `typical purpose` swapped to `Compliance attestation` — tests the external-vs-third-party distinction (external is for verification by hiring; third-party is for regulatory attestation)
- Composite Third-party Row with `who performs` swapped to `Organization's own staff` — tests that third-party assessments are by definition not internal

## Sources

- `[s1]`: NIST SP 800-115, "Technical Guide to Information Security Testing and Assessment" — discusses internal vs external assessment perspectives (September 2008, retrieved 2026-04-26, https://csrc.nist.gov/publications/detail/sp/800-115/final)
- `[s2]`: NIST SP 800-53A Rev 5, "Assessing Security and Privacy Controls in Information Systems and Organizations" — assessor independence requirements (January 2022, retrieved 2026-04-26, https://csrc.nist.gov/publications/detail/sp/800-53a/rev-5/final)
