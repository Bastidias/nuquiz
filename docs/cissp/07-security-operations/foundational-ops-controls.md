# Foundational Operations Controls

**Domain:** 7 — Security Operations &nbsp;|&nbsp; **Pattern:** Dimensions &nbsp;|&nbsp; **Tags:** 7.4
**Status:** draft (SME review pending)

The seven personnel-and-process controls that operations teams apply to limit insider risk and constrain blast radius from compromised credentials. Need-to-know and least privilege restrict access at the *individual* level; separation of duties, dual control, and two-person integrity require *multiple actors* for sensitive operations; job rotation and mandatory vacation expose *sustained* malfeasance over time. The CISSP exam tests both the definition of each control and which threat it specifically mitigates.

| control | purpose | threat mitigated | typical example |
|---|---|---|---|
| Need-to-know | Restrict access to information required for assigned duties [s2] | Unauthorized disclosure of sensitive information [s2] | Compartmented access to specific project data [s2] |
| Least privilege | Grant minimum authorizations needed to perform function [s1] | Privilege abuse [s1] | Standard user account with no admin rights for daily work [needs source] |
| Separation of duties | Prevent one person from controlling sensitive process end-to-end [s3] | Single-actor fraud [s3] | Payment authorization separated from payment preparation [s3] |
| Job rotation | Detect concealed fraud through periodic role reassignment [s5] | Sustained insider fraud [s5] | Periodic rotation of treasury personnel [needs source] |
| Mandatory vacation | Force absence so peers can detect anomalies [s5] | Concealed ongoing fraud [s5] | Annual two-week leave for finance personnel [needs source] |
| Dual control | Require two staff to complete a sensitive operation [s4] | Single-actor unauthorized action [s4] | Two key holders required to access vault [needs source] |
| Two-person integrity | Require two cleared persons present during sensitive activity [s4] | Insider tampering with sensitive material [s4] | Two-person rule for COMSEC keying material [s4] |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. No parentheticals in cells.
- **Tag 7.4 retained from stub.** Matches (ISC)² 2024 outline §7.4 *Apply foundational security operations concepts*. Some of these controls (need-to-know, least privilege) also appear in Domain 5 (Identity and Access Management); this Concept tags them under §7.4 because the operations-team enforcement angle is the §7.4 framing.
- **Need-to-know vs. least privilege.** Most-confused pair on the exam. Need-to-know restricts *information* access (do you have a legitimate reason to see this data?); least privilege restricts *system permissions* (do you have the minimum rights to do your job?). A clearance plus need-to-know gates access to classified data; least privilege governs operating-system rights once you are in.
- **Separation of duties vs. dual control vs. two-person integrity.** All three require multiple actors, but at different scopes: SoD splits a *workflow* across people across time; dual control requires multiple people to perform *one action* (e.g., simultaneous key turn); TPI requires multiple cleared people to be *present* during sensitive activity (e.g., handling crypto keys). NIST distinguishes static SoD (role conflicts) from dynamic SoD enforced at access time, where the two-person rule lives [s3].
- **Job rotation is detective, not preventive.** Rotation does not stop fraud from starting; it forces fraud to be discovered when the perpetrator is no longer in the role to maintain the cover-up. Same logic for mandatory vacation. Both are paired controls on the exam: JR + MV together produce strong fraud-detection coverage for finance and admin roles.
- **Why "two-person rule" appears in two rows.** The two-person rule is the operational mechanism; *dual control* and *two-person integrity* are two contexts in which it is applied. NIST's TPI definition specifically calls out COMSEC (communications security) keying material [s4] — that is the canonical example. Dual control is the broader business-process variant (vault access, wire transfer authorization).
- **Gaps marked `[needs source]`:** four Facts — typical examples for least privilege, job rotation, mandatory vacation, and dual control. All are textbook examples but not yet sourced to a primary publication in this research pass.

## Engine demo opportunities

- `? | purpose → Restrict access to information required for assigned duties` → Need-to-know
- `Separation of duties | typical example → ?` → `Payment authorization separated from payment preparation`
- `? | threat mitigated → Concealed ongoing fraud` → Mandatory vacation
- `Two-person integrity | typical example → ?` → `Two-person rule for COMSEC keying material`
- `Least privilege | threat mitigated → ?` with `Single-actor fraud` (SoD) and `Insider tampering with sensitive material` (TPI) as distractors
- Composite Row profile: Need-to-know across all Columns with `purpose` swapped to `Force absence so peers can detect anomalies` (Mandatory vacation's value)

## Sources

- `[s1]`: NIST CSRC glossary entry *Least Privilege*, citing NIST SP 800-53 Rev. 5 (retrieved 2026-04-25, https://csrc.nist.gov/glossary/term/least_privilege)
- `[s2]`: NIST CSRC glossary entry *Need-to-Know*, citing CNSSI 4009-2015 from E.O. 13526 (retrieved 2026-04-25, https://csrc.nist.gov/glossary/term/need_to_know)
- `[s3]`: NIST CSRC glossary entry *Separation of Duty*, citing NIST SP 800-192, NIST IR 8539, NISTIR 8403 (retrieved 2026-04-25, https://csrc.nist.gov/glossary/term/Separation_of_Duty)
- `[s4]`: NIST CSRC glossary entry *Two-Person Integrity*, citing CNSSI 4009-2015 (from NSA/CSS Manual 3-16) and NIST IR 8401 (retrieved 2026-04-25, https://csrc.nist.gov/glossary/term/two_person_integrity)
- `[s5]`: CERT/SEI *Best Practices to Mitigate Insider Threats* — job rotation and mandatory vacation as detective controls for sustained insider fraud (retrieved 2026-04-25, https://sei.cmu.edu/blog/separation-of-duties-and-least-privilege-part-15-of-20-cert-best-practices-to-mitigate-insider-threats-series/)
- `[s6]`: (ISC)² CISSP Certification Exam Outline, effective 2024-04-15, Domain 7 §7.4 *Apply foundational security operations concepts* (retrieved 2026-04-25, https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline)
