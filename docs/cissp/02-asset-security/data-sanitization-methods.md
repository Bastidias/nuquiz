# Data Sanitization Methods

**Domain:** 2 — Asset Security &nbsp;|&nbsp; **Pattern:** Dimensions &nbsp;|&nbsp; **Tags:** 2.5
**Status:** draft (SME review pending)

The four sanitization methods NIST SP 800-88 Rev. 1 defines for media disposal. Clearing protects against keyboard-attack recovery; purging protects against laboratory-attack recovery; destruction renders the media unusable; cryptographic erasure relies on key destruction to render encrypted data unrecoverable. The CISSP exam tests both the per-method definition and the matchup with the appropriate threat model and reuse intent.

| method | definition | when used | residual risk | reversibility |
|---|---|---|---|---|
| Clearing | Logical sanitization protecting against simple recovery [s1] | Media reuse within organization [s1] | Vulnerable to advanced laboratory recovery [s1] | Irreversible to keyboard recovery [s1] |
| Purging | Logical or physical sanitization protecting against laboratory recovery [s1] | Media reuse outside organization [s1] | Negligible if performed correctly [s1] | Irreversible [s1] |
| Destruction | Physical destruction of media [s1] | Media end-of-life or unrecoverable damage [s1] | None when complete [s1] | Irreversible by definition [s1] |
| Cryptographic erasure | Destruction of encryption key rendering data unrecoverable [s1] | Encrypted media disposal [s1] | Vulnerable if key was previously exposed [s1] | Irreversible if key destruction is verified [s1] |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. No parentheticals in cells.
- **Tag 2.5 retained from stub.** Maps to (ISC)² 2024 outline §2.5 *Ensure appropriate asset retention*. Sibling Concept: `media-destruction-techniques.md` (the destruction-row physical methods).
- **Source: NIST SP 800-88 Rev. 1.** This is the canonical standard for media sanitization. The CISSP exam expects familiarity with the three NIST 800-88 categories (Clear, Purge, Destroy) plus the modern addition of Cryptographic Erasure (CE) for encrypted media.
- **The threat-model ladder.** Clear protects against keyboard recovery (file-recovery tools). Purge protects against laboratory recovery (forensic equipment, scanning electron microscopes, exotic techniques). Destruction protects against everything because the media no longer exists. The right method depends on the *threat model* the disposal must defend against.
- **Reuse intent drives method choice.** Media that will be reused inside the organization (one classification level, trusted environment) needs Clear. Media that will be reused outside the organization (donation, resale, transfer to lower-trust environment) needs Purge. Media at end-of-life with no reuse intent gets Destroyed.
- **Cryptographic erasure is the modern shortcut.** If the data was encrypted with a strong algorithm and key, destroying the key is functionally equivalent to destroying the data — without it, the ciphertext is unrecoverable. CE is fast (destroy a key vs. wipe a 10TB drive) and works for cloud storage where physical destruction is impossible. The catch: if the key was ever exposed (backup, copy, key escrow), CE no longer protects.
- **The "Destruction" row applies to physical media.** Methods include shredding, crushing, melting, incineration, degaussing (for magnetic media — does not work on SSD/flash). NIST 800-88 specifies acceptable techniques per media type. See `media-destruction-techniques.md` for the per-media specifics.
- **Documentation matters.** Sanitization is not just an action — it produces a *certificate of destruction* documenting what was sanitized, by whom, when, by what method. This is the audit artifact that proves compliance with retention/disposal policies.
- **Gaps marked `[needs source]`:** none — all Facts trace to NIST SP 800-88 Rev. 1.

### Tricky distractors

- **Clear vs Purge.** Clear defeats keyboard recovery (file-undelete tools). Purge defeats laboratory recovery (forensic equipment). Wrong-answer pattern: claiming Clear is sufficient for media leaving the organization — Purge or Destroy is required.
- **Cryptographic erasure relies on key destruction.** If the key was ever copied/escrowed/exposed, CE doesn't protect. Wrong-answer pattern: claiming CE is always equivalent to physical destruction.
- **Degaussing doesn't work on SSDs.** Magnetic methods don't affect flash memory. Wrong-answer pattern: applying degauss to all media types — magnetic-only.
- **Destroying a working drive is wasteful but always safe.** Destruction is the safe-default when classification is high. Wrong-answer pattern: claiming destruction is always overkill — for top-secret data it's required.
- **Reuse intent drives method.** Inside organization → Clear. Outside org → Purge. End-of-life → Destroy. Wrong-answer pattern: defaulting to Destroy for routine reuse — wasteful.
- **Certificate of destruction is the audit artifact.** Sanitization without documentation can't prove compliance. Wrong-answer pattern: claiming the action alone satisfies retention policy — paperwork is part of the control.

## Engine demo opportunities

- `? | when used → Encrypted media disposal` → Cryptographic erasure
- `Clearing | residual risk → ?` → `Vulnerable to advanced laboratory recovery`
- `? | when used → Media reuse outside organization` → Purging
- `Destruction | residual risk → ?` → `None when complete`
- `Cryptographic erasure | residual risk → ?` with `Vulnerable to advanced laboratory recovery` (Clearing) as a tempting wrong answer
- Composite Row profile: Clearing across all Columns with `when used` swapped to `Media end-of-life or unrecoverable damage` (Destruction's value)

## Sources

- `[s1]`: NIST SP 800-88 Rev. 1 *Guidelines for Media Sanitization*, December 2014 (retrieved 2026-04-26, https://csrc.nist.gov/pubs/sp/800/88/r1/final)
- `[s2]`: (ISC)² CISSP Certification Exam Outline, effective 2024-04-15, Domain 2 §2.5 (retrieved 2026-04-26, https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline)
