# Physical Access Controls

**Domain:** 3 — Security Architecture and Engineering &nbsp;|&nbsp; **Pattern:** Dimensions &nbsp;|&nbsp; **Tags:** 3.9, 7.14
**Status:** draft (SME review pending)

The five physical access control mechanisms CISSP courseware tests. Each pairs a *mechanism* with a *typical use* and a known *weakness*. The CISSP exam tests the matchup between the security need and the appropriate control — particularly the principle that physical controls must work in layers (defense in depth) because any single mechanism has known weaknesses.

| control | mechanism | typical use | weakness |
|---|---|---|---|
| Badges | Visible identification carried by personnel [s1] | Personnel identification at access points [s1] | Badge can be lost or copied [s1] |
| Biometrics | Physiological or behavioral identification [s1] | High-security area access [s1] | False acceptance and false rejection rates [s1] |
| Locks | Mechanical or electronic blocking mechanism [s1] | Door and container security [s1] | Lock picking and bypass techniques [s1] |
| Turnstiles | Physical one-person-at-a-time gateway [s2] | Anti-tailgating at facility entry [s2] | Slows authorized traffic at peak times [needs source] |
| Smart cards | Card with embedded cryptographic chip [s1] | Authentication plus optional encryption [s1] | Card loss or chip cloning [s1] |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. No parentheticals in cells.
- **Tags 3.9 and 7.14 retained from stub.** Cross-tagged. Sibling Concepts: `perimeter-controls.md` (the broader perimeter-defense set), `lock-types.md` (lock-row detail), `cpted-principles.md` (environmental design framing).
- **Defense in depth applies layered.** No single physical control is sufficient. Badges identify; biometrics authenticate; locks block; turnstiles enforce one-person-at-a-time; smart cards combine identification, authentication, and cryptographic capability. Mature programs use multiple in combination.
- **Tailgating is the canonical physical-access-control failure.** An authorized person opens the door; an unauthorized person follows them through. Turnstiles, mantraps, and visible-badge requirements are the controls. The CISSP exam often tests tailgating scenarios because it is the most common bypass technique and the human-factor angle is testable.
- **Biometric error rates: FAR vs. FRR.** False Acceptance Rate (FAR / Type 2) accepts unauthorized users; False Rejection Rate (FRR / Type 1) rejects authorized users. The Crossover Error Rate (CER) is the rate at which FAR equals FRR — lower CER means a better biometric system. See `biometric-error-types.md` in Domain 5 for the per-error analysis.
- **Smart cards combine multiple factors.** A smart card carries a private key (something you have) and typically requires a PIN (something you know) — making it inherently multi-factor. PIV (Personal Identity Verification, FIPS 201) is the U.S. federal standard; PKI-backed enterprise deployments follow similar architectures.
- **Mantraps as a turnstile variant.** A mantrap is two doors in series with the second locked until the first closes — only one person can pass at a time, and they are physically constrained while the system verifies identity. Used in high-security facilities (data centers, vaults, classified areas).
- **What is intentionally not on this table.** Security guards (a personnel control), CCTV (detection rather than access control), motion sensors, and access control vestibules are adjacent physical-security controls that could be added in future revisions. The five here cover the most-tested CISSP physical-access-control scope.
- **Gaps marked `[needs source]`:** one Fact — turnstile peak-time weakness. Practitioner consensus.

### Tricky distractors

- **Tailgating is the canonical bypass.** Authorized person enters; unauthorized follows. Wrong-answer pattern: claiming badges alone prevent tailgating — turnstiles, mantraps, or guards do.
- **FAR vs FRR.** FAR (Type 2) = wrong person accepted. FRR (Type 1) = right person rejected. Wrong-answer pattern: confusing the two — high security tunes for low FAR; usability tunes for low FRR.
- **CER is the balance point.** Crossover Error Rate is where FAR = FRR; lower CER = better biometric. Wrong-answer pattern: claiming low CER means low FAR specifically — it means both rates balance low.
- **Smart cards are inherently multi-factor.** Card (have) + PIN (know). Wrong-answer pattern: classifying smart cards as single-factor — the PIN requirement makes them multi-factor.
- **Defense in depth.** No single physical control is sufficient. Wrong-answer pattern: claiming a single mechanism (lock, badge) is enough — high-security needs layers.
- **Mantrap = double-door vestibule.** First door closes before second opens; one person at a time. Wrong-answer pattern: confusing mantrap with turnstile — turnstile blocks one-at-a-time but doesn't physically isolate.

## Engine demo opportunities

- `? | mechanism → Card with embedded cryptographic chip` → Smart cards
- `Biometrics | weakness → ?` → `False acceptance and false rejection rates`
- `? | typical use → Anti-tailgating at facility entry` → Turnstiles
- `Locks | mechanism → ?` → `Mechanical or electronic blocking mechanism`
- `Smart cards | weakness → ?` with `False acceptance and false rejection rates` (Biometrics) and `Lock picking and bypass techniques` (Locks) as distractors
- Composite Row profile: Badges across all Columns with `weakness` swapped to `False acceptance and false rejection rates` (Biometrics' value)

## Sources

- `[s1]`: NIST SP 800-116 Rev. 1 *Guidelines for the Use of PIV Credentials in Facility Access*, June 2018 — physical access control framework (retrieved 2026-04-26, https://csrc.nist.gov/pubs/sp/800/116/r1/final). FIPS 201-3 *Personal Identity Verification (PIV)* of Federal Employees and Contractors for smart card framing (retrieved 2026-04-26, https://csrc.nist.gov/pubs/fips/201-3/final)
- `[s2]`: ASIS International *Protection of Assets: Physical Security* — turnstile and mantrap framing (retrieved 2026-04-26, https://www.asisonline.org/publications--resources/standards--guidelines/)
- `[s3]`: (ISC)² CISSP Certification Exam Outline, effective 2024-04-15, Domain 3 §3.9 and Domain 7 §7.14 (retrieved 2026-04-26, https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline)
