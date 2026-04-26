# SoD vs Job Rotation vs Mandatory Vacation

**Domain:** 7 — Security Operations &nbsp;|&nbsp; **Pattern:** Dimensions &nbsp;|&nbsp; **Tags:** 7.4
**Status:** draft (SME review pending)

The three personnel-controls trio that together address fraud and insider-threat risk. SoD is *structural and continuous* — it enforces a permanent split between roles. Job rotation and mandatory vacation are *temporal and periodic* — they create gaps in role tenure during which concealed fraud surfaces because the perpetrator is no longer in position to maintain the cover. The CISSP exam tests both the individual definitions and the *combination* — SoD alone is preventive, the other two are detective, and a complete program runs all three.

| control | purpose | threat mitigated | frequency |
|---|---|---|---|
| SoD | Prevent one person from controlling sensitive process end-to-end [s1] | Single-actor fraud [s1] | Continuous structural enforcement [needs source] |
| Job rotation | Detect concealed fraud via role reassignment [s2] | Sustained insider fraud [s2] | Periodic role rotation [s2] |
| Mandatory vacation | Force absence so peers can detect anomalies [s2] | Concealed ongoing fraud [s2] | Annual or quarterly mandatory leave [s2] |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. No parentheticals in cells.
- **Tag 7.4 retained from stub.** Matches (ISC)² 2024 outline §7.4 *Apply foundational security operations concepts*.
- **Relationship to `foundational-ops-controls.md`.** That sibling Concept covers the broader seven-control set (need-to-know, least privilege, SoD, job rotation, mandatory vacation, dual control, two-person integrity). This Concept zooms in on the fraud-detection trio specifically because the *frequency* dimension distinguishes them in a way the broader Concept does not. The three-row focused view exists for question-bank composability — exam writers frequently test these three together.
- **SoD is preventive; the other two are detective.** This is the test-favorite framing. SoD prevents a single person from being able to commit fraud in the first place (controls the *opportunity*). Job rotation and mandatory vacation do not prevent fraud at all — they ensure that ongoing fraud is *exposed* when the perpetrator can no longer sustain the cover. A complete program needs both prevention and detection.
- **Why SoD's frequency is "continuous structural enforcement."** SoD lives in the role definitions and access control lists; it is enforced every time access is checked, not on a schedule. The other two controls have explicit cadences (rotation interval, vacation requirement) because they involve temporary change-of-state.
- **Job rotation works because the new role-holder reviews the predecessor's open work.** The mechanism is not the rotation itself but the *handoff* — the incoming person reviews ledgers, accounts, and exceptions and surfaces what looks wrong. If the handoff is perfunctory, the control fails. CISSP questions sometimes hinge on this nuance.
- **Mandatory vacation cadence.** Two consecutive weeks is the most-cited minimum because it forces enough time for normal monthly cycles (reconciliations, statements) to expose anomalies. Shorter mandatory periods are less effective; longer is fine but operationally costly.
- **Gaps marked `[needs source]`:** one Fact — SoD's "Continuous structural enforcement" frequency descriptor. Practitioner consensus but not directly cited to a primary publication.

## Engine demo opportunities

- `? | purpose → Force absence so peers can detect anomalies` → Mandatory vacation
- `SoD | threat mitigated → ?` → `Single-actor fraud`
- `? | frequency → Periodic role rotation` → Job rotation
- `Mandatory vacation | frequency → ?` → `Annual or quarterly mandatory leave`
- `Job rotation | purpose → ?` with `Force absence so peers can detect anomalies` (Mandatory vacation) and `Prevent one person from controlling sensitive process end-to-end` (SoD) as distractors
- Composite Row profile: SoD across all Columns with `frequency` swapped to `Annual or quarterly mandatory leave` (Mandatory vacation's value)

## Sources

- `[s1]`: NIST CSRC glossary entry *Separation of Duty*, citing NIST SP 800-192, NIST IR 8539, NISTIR 8403 (retrieved 2026-04-25, https://csrc.nist.gov/glossary/term/Separation_of_Duty)
- `[s2]`: CERT/SEI *Best Practices to Mitigate Insider Threats* — job rotation and mandatory vacation as detective fraud controls (retrieved 2026-04-25, https://sei.cmu.edu/blog/separation-of-duties-and-least-privilege-part-15-of-20-cert-best-practices-to-mitigate-insider-threats-series/)
- `[s3]`: (ISC)² CISSP Certification Exam Outline, effective 2024-04-15, Domain 7 §7.4 *Apply foundational security operations concepts* (retrieved 2026-04-25, https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline)
