# Data Classification × Handling

**Domain:** 2 — Asset Security &nbsp;|&nbsp; **Pattern:** Dimensions &nbsp;|&nbsp; **Tags:** 2.2
**Status:** draft (SME review pending)

The handling-requirements matrix that maps each commercial classification level to the controls required for marking, encryption, transmission, storage, and disposal. Where `commercial-classification-levels.md` defines the *labels*, this Concept defines what each label *requires operationally*. The CISSP exam tests both the per-cell matchups and the principle that handling rules must escalate as classification rises.

| level | marking required | encryption required | transmission rules | storage rules | disposal |
|---|---|---|---|---|---|
| Public | None [s1] | None [s1] | No restriction [s1] | No restriction [s1] | Standard recycling [s1] |
| Sensitive | Internal marking [s1] | Optional [s1] | Internal channels only [s1] | Access controls applied [s1] | Standard secure disposal [s1] |
| Private | Private marking [s1] | Required at rest and in transit [s1] | Encrypted channels only [s1] | Encrypted storage with access logging [s1] | Sanitization per NIST 800-88 [s2] |
| Confidential | Confidential marking [s1] | Required at rest and in transit [s1] | Encrypted channels with sender verification [s1] | Encrypted storage with strict need-to-know [s1] | Cryptographic erasure or physical destruction [s2] |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. No parentheticals in cells. Repeated `Required at rest and in transit` Value across Private and Confidential rows enables shared-Value detection.
- **Tag 2.2 retained from stub.** Maps to (ISC)² 2024 outline §2.2 *Establish information and asset handling requirements*. Sibling Concepts: `commercial-classification-levels.md` (the labels), `data-sanitization-methods.md` (disposal detail).
- **Encryption-in-transit-and-at-rest is the test favorite.** The CISSP exam expects "both" for any classification level above Sensitive. Encryption only at rest leaves data exposed during transmission; encryption only in transit leaves data exposed on storage media. The full pair is the baseline for Private and Confidential.
- **The escalation pattern.** Each requirement column escalates monotonically as classification rises. Public has no requirements; Sensitive adds organizational marking and access controls; Private adds encryption and access logging; Confidential adds need-to-know enforcement and the strongest disposal methods. The escalation is intentional and tested.
- **Sender verification at the Confidential tier.** Encrypted transmission alone is not enough at Confidential — the recipient must verify *who sent* the data (digital signature, sender authentication). This guards against impersonation attacks that would otherwise leverage the encrypted channel.
- **Disposal is part of handling.** A common CISSP wrong-answer scenario: classifying data correctly during creation/use but failing at disposal. Confidential data on a decommissioned drive is still Confidential — physical destruction or cryptographic erasure is required, not standard recycling.
- **Why this Concept exists separately from `commercial-classification-levels.md`.** Two Concepts let the engine ask different question types. `commercial-classification-levels.md` asks *what data goes in this label*; this Concept asks *what handling does this label require*. Same labels, different lookup direction.
- **Gaps marked `[needs source]`:** none — all Facts trace to NIST SP 800-88 / ISO 27001 handling framing.

### Tricky distractors

- **Encryption at rest AND in transit.** Both for Private/Confidential. Wrong-answer pattern: claiming one is sufficient — exposes data during the other state.
- **Disposal is part of handling.** Confidential data on decommissioned drive is still Confidential. Wrong-answer pattern: skipping disposal in handling discussion — most-tested CISSP wrong-answer scenario.
- **Confidential requires sender verification.** Beyond encryption alone. Wrong-answer pattern: claiming encrypted channel alone protects Confidential — recipient must authenticate sender.
- **Handling escalates with classification.** Monotonically. Wrong-answer pattern: claiming handling rules can be flat — escalation is intentional.
- **Public still needs integrity.** No confidentiality controls but integrity matters. Wrong-answer pattern: claiming Public data has zero requirements — defacement matters.
- **Sanitization ≠ deletion.** NIST 800-88 sanitization for Private+. Wrong-answer pattern: claiming `delete` satisfies disposal — must sanitize per classification.

## Engine demo opportunities

- `? | encryption required → Required at rest and in transit` → Private or Confidential (cross-Row select)
- `Sensitive | transmission rules → ?` → `Internal channels only`
- `? | disposal → Cryptographic erasure or physical destruction` → Confidential
- `Public | marking required → ?` → `None`
- `Private | storage rules → ?` with `No restriction` (Public) and `Encrypted storage with strict need-to-know` (Confidential) as distractors
- Cross-Row shared-Value detection: `? | encryption required → None` → Public only
- Composite Row profile: Sensitive across all Columns with `disposal` swapped to `Cryptographic erasure or physical destruction` (Confidential's value)

## Sources

- `[s1]`: ISO/IEC 27001:2022 Annex A.5.13 *Labelling of information* and Annex A.5.10 *Acceptable use of information and other associated assets* (retrieved 2026-04-26, https://www.iso.org/standard/27001)
- `[s2]`: NIST SP 800-88 Rev. 1 *Guidelines for Media Sanitization*, December 2014 (retrieved 2026-04-26, https://csrc.nist.gov/pubs/sp/800/88/r1/final)
- `[s3]`: (ISC)² CISSP Certification Exam Outline, effective 2024-04-15, Domain 2 §2.2 (retrieved 2026-04-26, https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline)
