# Governance Roles

**Domain:** 1 — Security and Risk Management &nbsp;|&nbsp; **Pattern:** Dimensions &nbsp;|&nbsp; **Tags:** 1.3
**Status:** draft (SME review pending)

The seven roles that participate in an information security governance program, with the *responsibilities* each carries, the *accountability* boundary, and the *reporting line*. The CISSP exam tests both the per-role definition and the most-confused pairs: Data Owner vs. Data Custodian (who decides the classification vs. who implements the controls), and Senior Management vs. Board (who runs the program vs. who oversees it).

| role | responsibilities | accountability | reports to |
|---|---|---|---|
| Board | Oversee enterprise risk posture [s1] | Ultimately accountable to shareholders and regulators [s1] | Shareholders and regulators [s1] |
| Senior Management | Approve security strategy [s1]<br>Resource the security program [s1] | Accountable for security outcomes to the Board [s1] | Board [s1] |
| Data Owner | Classify data [s1]<br>Define access requirements [s1] | Accountable for the data's protection [s1] | Senior Management [s1] |
| Data Custodian | Implement controls per Data Owner direction [s1]<br>Maintain technical backup and recovery [s1] | Responsible for technical execution [s1] | Data Owner via service-level commitments [needs source] |
| System Owner | Authorize system to operate [s1]<br>Accept residual risk [s1] | Accountable for system-level security posture [s1] | Senior Management [s1] |
| User | Follow security policy and procedures [s1] | Responsible for own actions [s1] | Manager and Data Owner via policy [s1] |
| Auditor | Independent assessment of control effectiveness [s1] | Accountable for assessment objectivity [s1] | Audit committee or external client [s1] |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. No parentheticals in cells.
- **Tag 1.3 retained from stub.** Maps to (ISC)² 2024 outline §1.3 *Determine compliance and other requirements* and the broader §1 governance scope.
- **Data Owner vs. Data Custodian.** The most-tested distinction. Data Owner is *accountable* for the data — they classify it, decide who needs access, and own the consequences if it leaks. Data Custodian is *responsible* for the technical implementation — they configure access controls, run backups, maintain integrity. The owner cannot delegate accountability; the custodian executes under owner direction.
- **Accountability ≠ responsibility.** Accountability cannot be delegated; responsibility can. The Board is *accountable* for security to shareholders even though it delegates *responsibility* for execution to senior management. Senior management is *accountable* for security to the Board even though it delegates *responsibility* to operational teams. RACI matrices formalize this distinction; CISSP courseware tests it heavily.
- **System Owner vs. Data Owner.** A System Owner is responsible for the *system as a whole* (the application, the infrastructure stack); a Data Owner is responsible for *specific data* the system processes. One system may host data from multiple Data Owners, all of whom must approve their data residing on that system.
- **System Owner and the Authorization to Operate (ATO).** In NIST RMF terms, the System Owner (sometimes called the Authorizing Official) signs the ATO accepting residual risk. This is the moment risk becomes *owned* — before ATO it is theoretical; after ATO it is the System Owner's to manage.
- **Auditor independence is structural.** An internal auditor cannot report to the people they audit — they typically report to an audit committee of the Board, not to executive management, to preserve independence. External auditors report to their own client (often the Board) and have stricter independence requirements.
- **The User role is small but pivotal.** Users are responsible for their own compliance with policy. Many breaches trace back to a user clicking a phish, sharing a password, or bypassing a control. Security awareness training (`training-program-phases.md`) is the program by which users are equipped to fulfill the User role responsibilities.
- **Gaps marked `[needs source]`:** one Fact — Data Custodian's "reports to" entry. Practitioner consensus but the formal reporting line varies by org structure.

### Tricky distractors

- **Data Owner vs Data Custodian.** Owner classifies and decides access (accountability). Custodian implements controls (responsibility). Wrong-answer pattern: claiming the custodian decides classification — that's the owner's job.
- **Accountability cannot be delegated.** Responsibility can. Wrong-answer pattern: claiming a Data Owner can delegate accountability by hiring a custodian — only execution can be delegated.
- **Senior Management vs Board.** Senior Management runs the program; Board oversees. Wrong-answer pattern: claiming the Board approves day-to-day security strategy — it sets risk appetite; senior management approves strategy.
- **System Owner vs Data Owner.** System Owner owns the system; Data Owner owns the data residing on it. Wrong-answer pattern: collapsing them — one system may host data from multiple Data Owners.
- **Authorizing Official signs the ATO.** Often the System Owner; accepts residual risk on behalf of the organization. Wrong-answer pattern: claiming the auditor signs the ATO — auditors assess, they don't authorize.
- **Auditor reports outside the audited line.** Internal auditor → audit committee, not to executives. Wrong-answer pattern: claiming the auditor reports to the CISO — that breaks independence.

## Engine demo opportunities

- `? | responsibilities → Classify data` → Data Owner
- `Senior Management | reports to → ?` → `Board`
- `? | accountability → Accountable for assessment objectivity` → Auditor
- `Data Custodian | responsibilities → ?` → `Implement controls per Data Owner direction` or `Maintain technical backup and recovery`
- Cross-Row distractor: `Data Owner | responsibilities → ?` with `Implement controls per Data Owner direction` (Data Custodian) as a tempting wrong answer
- Composite Row profile: System Owner across all Columns with `responsibilities` swapped to `Independent assessment of control effectiveness` (Auditor's value)

## Sources

- `[s1]`: NIST SP 800-37 Rev. 2 *Risk Management Framework for Information Systems and Organizations*, December 2018 — role definitions including System Owner, Authorizing Official, Information Owner/Steward (retrieved 2026-04-26, https://csrc.nist.gov/pubs/sp/800/37/r2/final). Cross-referenced against CISSP CBK governance-role enumeration.
- `[s2]`: (ISC)² CISSP Certification Exam Outline, effective 2024-04-15, Domain 1 §1.3 (retrieved 2026-04-26, https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline)
