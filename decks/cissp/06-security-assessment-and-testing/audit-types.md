# Audit Types

**Domain:** 6 — Security Assessment and Testing &nbsp;|&nbsp; **Pattern:** Dimensions &nbsp;|&nbsp; **Tags:** 6.5
**Status:** draft (SME review pending)

The four audit categories CISSP candidates are expected to discriminate. The discriminating axis is *who performs the audit* and *what level of independence they have*. Internal audits are conducted by the organization's own staff and have the lowest independence; external audits are conducted by hired outside firms; third-party audits are conducted on behalf of a regulator or standard; regulatory audits are conducted directly by a government regulator. The independence ladder maps directly to evidentiary weight — regulatory and third-party audits carry the most authority.

| Audit | who performs | independence | typical output |
|---|---|---|---|
| Internal | Organization's own audit team | Low | Internal audit report with management response |
| External | Outside firm hired by the organization | High | External audit report with findings |
| Third-party | Auditor on behalf of regulator or standard | Highest | Attestation report or certification |
| Regulatory | Government regulator | Highest | Regulatory finding<br>Possible enforcement action |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. **No parentheticals in cells.**
- **Internal audit independence is structural.** Internal auditors must report to the audit committee of the Board, not to executive management, to preserve their independence from the people they audit. Even with this structural separation, they are still organization employees — their independence is lower than external assessors.
- **External vs Third-party audits.** Sibling Concept `assessment-perspectives` covers the same External / Third-party distinction in the assessment context. Same boundary applies to audits:
  - **External:** the organization hires a firm; the firm reports back to the organization.
  - **Third-party:** the firm is acting on behalf of a regulator, certifying body, or downstream framework. SOC 2 auditors and PCI QSAs are Third-party in this sense — even though the audited organization pays the bill.
- **Regulatory audits are the most coercive.** When the FTC, OCR (HIPAA), state AG, or other government regulator opens an audit, the organization cannot decline. Regulatory audits typically follow a complaint, a breach disclosure, or a periodic compliance review. Output is not just findings — it can include consent decrees, fines, and required remediation under regulator supervision.
- **Findings carry different weight by audit type.**
  - **Internal:** management can dispute and may delay remediation.
  - **External:** typically advisory but contractually binding for findings the organization commissioned the audit to surface.
  - **Third-party:** failure to remediate can mean loss of certification (SOC 2 qualified opinion, ISO 27001 certificate withheld) or vendor de-listing.
  - **Regulatory:** failure to remediate can mean enforcement action — fines, consent decrees, license revocation.
- **Same-firm conflicts.** A firm cannot serve as both External auditor (hired by client) and Third-party auditor (attesting on behalf of a framework) for the same client without independence concerns. Sarbanes-Oxley specifically addressed this by limiting non-audit services that financial-statement auditors can provide. Similar restrictions apply to SOC 2 auditors providing remediation consulting.
- **Out of scope for this Concept:** specific audit firms and certifications, audit committee charters and Board-reporting structures, conflict-of-interest rules, audit professional certifications (CPA, CISA, CIA), audit techniques (sampling, analytical procedures, walkthroughs).

### Tricky distractors

- **Internal auditor reports to audit committee.** Not to executives. Wrong-answer pattern: claiming internal auditor reports to CISO or CFO — that breaks independence.
- **Third-party ≠ External.** External: hired by org for own use. Third-party: hired by org but attesting on behalf of regulator/framework. Wrong-answer pattern: equating SOC 2 auditor (third-party) with external consultant (external).
- **Regulatory audits are coercive.** Cannot decline. Wrong-answer pattern: claiming organizations can refuse regulatory audits — they can't without consequences.
- **Independence ladder.** Internal < External < Third-party = Regulatory. Wrong-answer pattern: claiming external is more independent than third-party — third-party has higher independence because of framework-driven scope.
- **SOC 2 auditor cannot also be remediation consultant.** Independence rule. Wrong-answer pattern: claiming the same firm can do both — independence rules forbid it.
- **Internal findings can be disputed.** Management response is part of the report. External and especially regulatory findings are harder to dispute. Wrong-answer pattern: treating all audit findings equally binding.

### Values without a direct public citation

| Cell | Notes |
|---|---|
| All rows × independence | Categorical bins | Industry-typical bins; specific independence requirements are codified in audit standards (SAS, ISA, AICPA) without bin-rating. |
| All rows × typical output | Output artifact names | Common-practice naming; varies by audit type and applicable framework. |

## Engine demo opportunities

- `Internal | independence → ?` → `Low`
- `Regulatory | independence → ?` → `Highest`
- `Third-party | independence → ?` → `Highest`
- `? | independence → High` → `External`
- `? | who performs → Government regulator` → `Regulatory`
- `? | typical output → Possible enforcement action` → `Regulatory` (sub-Fact in multi-Fact cell)
- `External | typical output → ?` → `External audit report with findings`
- Composite Internal Row with `independence` swapped to `Highest` — directly tests the independence axis (internal auditors have lowest independence; third-party / regulatory have the highest)
- Composite External Row with `typical output` swapped to `Possible enforcement action` — tests external-vs-regulatory distinction (external auditors produce reports; only regulators bring enforcement)
- Composite Regulatory Row with `who performs` swapped to `Outside firm hired by the organization` — tests that regulatory audits are by government regulators, not by hired firms

## Sources

- `[s1]`: NIST SP 800-53A Rev 5, "Assessing Security and Privacy Controls in Information Systems and Organizations" — assessor independence requirements (January 2022, retrieved 2026-04-26, https://csrc.nist.gov/publications/detail/sp/800-53a/rev-5/final)
- `[s2]`: AICPA Auditing Standards Board — generally accepted auditing standards including independence requirements (retrieved 2026-04-26, https://us.aicpa.org/research/standards/auditattest)
