# Data Roles

**Domain:** 2 — Asset Security &nbsp;|&nbsp; **Pattern:** Dimensions &nbsp;|&nbsp; **Tags:** 2.2
**Status:** draft (SME review pending)

The six roles that participate in the lifecycle of data assets. Owner, Custodian, Steward, and User are the CISSP-traditional internal roles; Controller and Processor are the GDPR-introduced roles that govern who has decision-making authority over personal data and who acts on the controller's behalf. The CISSP exam tests both the per-role definition and the matchups: Owner vs. Custodian (accountable vs. responsible), Controller vs. Processor (decides vs. executes).

| role | responsibilities | accountability | typical example |
|---|---|---|---|
| Owner | Classify data and define access requirements [s1] | Accountable for the data's protection [s1] | Department head whose function generates the data [s1] |
| Custodian | Implement controls per Owner direction [s1]<br>Maintain technical backup and integrity [s1] | Responsible for technical execution [s1] | IT operations team [s1] |
| Steward | Maintain data quality and meaning [s1] | Responsible for data fitness for purpose [s1] | Subject-matter expert in business unit [s1] |
| User | Access data per assigned permissions [s1] | Responsible for own use of data [s1] | Employee accessing customer records to do their job [s1] |
| Controller | Determine purposes and means of processing personal data [s2] | Accountable to data subjects and regulators under GDPR [s2] | Company collecting customer data [s2] |
| Processor | Process personal data on behalf of the Controller [s2] | Accountable to Controller under processor agreement [s2] | Cloud service operating the storage [s2] |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. No parentheticals in cells.
- **Tag 2.2 retained from stub.** Maps to (ISC)² 2024 outline §2.2. Sibling Concept: `governance-roles.md` in Domain 1 (the broader governance role set).
- **Owner vs. Custodian.** This is the same distinction tested in Domain 1's `governance-roles.md` — Owner is *accountable* (cannot delegate); Custodian is *responsible* (executes under Owner direction). Owner classifies and authorizes; Custodian implements technically.
- **Steward is the data-quality role.** Stewards focus on whether the data is *fit for its intended use* — accurate, complete, timely, consistent. They are typically subject-matter experts in the business function (a finance Steward for financial data, a clinical Steward for patient data). Stewards may not own the data but they govern its fitness.
- **Controller vs. Processor is GDPR terminology.** GDPR introduced these legal roles for personal data. The Controller decides *what* data is processed *for what purposes* and *by what means*. The Processor acts *only on documented instructions from the Controller*. Cloud providers, payroll vendors, and analytics platforms are typically Processors of their customers' Controller-status data.
- **The Controller-Processor relationship requires a contract.** GDPR Article 28 mandates a formal agreement (Data Processing Agreement / DPA) specifying processing scope, security measures, subprocessor handling, and data-subject rights support. A Processor that processes outside the documented instructions becomes a Controller for that processing — and assumes Controller-level accountability.
- **A single organization plays multiple roles for different datasets.** A company is the Owner *and* Controller of its customer data, the Custodian of data its parent corporation entrusted to it, and a Processor of data its customers handed it for processing. Roles are dataset-specific, not org-specific.
- **Joint Controllers and sub-processors.** GDPR also recognizes joint controllers (two organizations jointly determining purposes/means) and sub-processors (a Processor's vendors). This Concept simplifies; an authoritative GDPR analysis would address all five.
- **Gaps marked `[needs source]`:** none — all Facts trace to NIST role framing or GDPR text.

## Engine demo opportunities

- `? | responsibilities → Determine purposes and means of processing personal data` → Controller
- `Custodian | typical example → ?` → `IT operations team`
- `? | accountability → Accountable to data subjects and regulators under GDPR` → Controller
- `Steward | responsibilities → ?` → `Maintain data quality and meaning`
- `Processor | accountability → ?` with `Accountable to data subjects and regulators under GDPR` (Controller) as a tempting wrong answer
- Cross-Row distractor: `Owner | typical example → ?` with `IT operations team` (Custodian) as the most-tested wrong answer
- Composite Row profile: Owner across all Columns with `responsibilities` swapped to `Process personal data on behalf of the Controller` (Processor's value)

## Sources

- `[s1]`: NIST SP 800-37 Rev. 2 — Information Owner / Steward, System Owner, and supporting role framing (retrieved 2026-04-26, https://csrc.nist.gov/pubs/sp/800/37/r2/final). Cross-referenced against CISSP CBK data-role enumeration.
- `[s2]`: EU General Data Protection Regulation, Articles 4(7) (Controller), 4(8) (Processor), and 28 (Processor agreements) (retrieved 2026-04-26, https://eur-lex.europa.eu/eli/reg/2016/679/oj)
- `[s3]`: (ISC)² CISSP Certification Exam Outline, effective 2024-04-15, Domain 2 §2.2 (retrieved 2026-04-26, https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline)
