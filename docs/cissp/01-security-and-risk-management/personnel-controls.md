# Personnel Controls

**Domain:** 1 — Security and Risk Management &nbsp;|&nbsp; **Pattern:** Dimensions &nbsp;|&nbsp; **Tags:** 1.9
**Status:** draft (SME review pending)

The seven personnel-security controls that span hiring through ongoing employment. Background checks and NDAs apply at hiring; SoD and least privilege/need-to-know apply at access-grant time; job rotation and mandatory vacation apply during tenure as detective controls. The CISSP exam tests both the per-control definition and the matchup with the threat each is intended to mitigate.

| control | purpose | when applied | threat mitigated |
|---|---|---|---|
| Background check | Verify candidate's identity and history before hire [s1] | Pre-hire [s1] | Hire of person with disqualifying history [s1] |
| NDA | Bind person to confidentiality obligation [s1] | Pre-access [s1] | Disclosure of confidential information [s1] |
| SoD | Prevent one person from controlling sensitive process end-to-end [s2] | Continuous structural enforcement [s2] | Single-actor fraud [s2] |
| Job rotation | Detect concealed fraud through role reassignment [s3] | Periodic during tenure [s3] | Sustained insider fraud [s3] |
| Mandatory vacation | Force absence so peers can detect anomalies [s3] | Periodic during tenure [s3] | Concealed ongoing fraud [s3] |
| Least privilege | Grant minimum authorizations needed to perform function [s4] | Continuous during access [s4] | Privilege abuse [s4] |
| Need to know | Restrict access to information required for assigned duties [s5] | Continuous during access [s5] | Unauthorized disclosure of sensitive information [s5] |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. No parentheticals in cells. The repeated `Continuous` and `Periodic` Values across multiple rows let the engine surface the temporal-pattern grouping.
- **Tag 1.9 retained from stub.** Maps to (ISC)² 2024 outline §1.9 *Contribute to and enforce personnel security policies and procedures*. Cross-Concept overlap: `foundational-ops-controls.md` and `sod-vs-rotation-vs-vacation.md` in Domain 7 cover the three fraud-detection trio at the operations-team angle.
- **Why this Concept duplicates parts of Domain 7.** Domain 1's framing is *governance and policy* — what the personnel security program should require. Domain 7's framing is *operations* — how those requirements get executed day-to-day. Same controls, different lens. The Domain 1 row set adds background checks and NDAs (governance-side controls); the Domain 7 row set adds dual control and two-person integrity (operations-side controls).
- **Pre-hire vs. pre-access vs. continuous.** Background checks happen before hire; NDAs are signed before access (which may be the same day as hire or weeks later for contractors). SoD, least privilege, and need-to-know are *structural* — they govern every access request continuously. Job rotation and mandatory vacation operate periodically over the long term.
- **Background check depth scales with role sensitivity.** Standard pre-employment screening (criminal record, employment verification, reference check, education verification) covers most roles. Sensitive roles add credit checks (financial-fraud risk), drug screening, polygraph (rare; high-clearance government roles), and ongoing periodic re-screening. The exam may test the principle that the depth must be commensurate with the risk.
- **NDA survives termination.** The confidentiality obligation in the NDA continues after employment ends (often perpetually for trade secrets, finite period for general confidential info). This is why exit interviews remind the departing person of the still-active obligation — it preserves the legal claim.
- **Gaps marked `[needs source]`:** none — all Facts trace to standard NIST or CISSP personnel-control framing.

## Engine demo opportunities

- `? | when applied → Pre-hire` → Background check
- `Mandatory vacation | threat mitigated → ?` → `Concealed ongoing fraud`
- `? | purpose → Bind person to confidentiality obligation` → NDA
- `Need to know | threat mitigated → ?` → `Unauthorized disclosure of sensitive information`
- Cross-Row shared-Value detection: `? | when applied → Continuous during access` → Least privilege, Need to know
- `? | when applied → Periodic during tenure` → Job rotation, Mandatory vacation
- Composite Row profile: NDA across all Columns with `when applied` swapped to `Periodic during tenure` (Job rotation's value)

## Sources

- `[s1]`: NIST SP 800-53 Rev. 5, control family PS *Personnel Security* — PS-3 Personnel Screening, PS-6 Access Agreements (retrieved 2026-04-26, https://csrc.nist.gov/pubs/sp/800/53/r5/upd1/final)
- `[s2]`: NIST CSRC glossary entry *Separation of Duty*, citing NIST SP 800-192, NIST IR 8539, NISTIR 8403 (retrieved 2026-04-26, https://csrc.nist.gov/glossary/term/Separation_of_Duty)
- `[s3]`: CERT/SEI *Best Practices to Mitigate Insider Threats* (retrieved 2026-04-26, https://sei.cmu.edu/blog/separation-of-duties-and-least-privilege-part-15-of-20-cert-best-practices-to-mitigate-insider-threats-series/)
- `[s4]`: NIST CSRC glossary entry *Least Privilege*, citing NIST SP 800-53 Rev. 5 (retrieved 2026-04-26, https://csrc.nist.gov/glossary/term/least_privilege)
- `[s5]`: NIST CSRC glossary entry *Need-to-Know*, citing CNSSI 4009-2015 from E.O. 13526 (retrieved 2026-04-26, https://csrc.nist.gov/glossary/term/need_to_know)
- `[s6]`: (ISC)² CISSP Certification Exam Outline, effective 2024-04-15, Domain 1 §1.9 (retrieved 2026-04-26, https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline)
