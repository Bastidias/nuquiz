# Lock Types

**Domain:** 3 — Security Architecture and Engineering &nbsp;|&nbsp; **Pattern:** Dimensions &nbsp;|&nbsp; **Tags:** 3.9, 7.14
**Status:** draft (SME review pending)

The five lock categories CISSP courseware tests. Each pairs a *mechanism* with *security strength* and *typical use*. The CISSP exam tests both the matchup between lock type and use case and the relative-strength comparisons — particularly that smart and biometric locks add electronic security on top of (not instead of) the underlying physical mechanism.

| lock | mechanism | security strength | typical use |
|---|---|---|---|
| Warded | Mechanical wards block incorrect keys [s1] | Lowest [s1] | Low-security gates [s1] |
| Pin tumbler | Pins of varying lengths align with cuts on key [s1] | Moderate [s1] | Standard residential and commercial doors [s1] |
| Combination | Numeric or symbol sequence opens lock [s1] | Variable by mechanism quality [s1] | Lockers and safes [s1] |
| Smart lock | Electronic authentication unlocks mechanical bolt [s1] | Variable by electronic strength [s1] | Modern access-controlled doors [s1] |
| Biometric | Biometric authentication unlocks mechanism [s1] | Variable by biometric quality [s1] | High-security area access [s1] |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. No parentheticals in cells.
- **Tags 3.9 and 7.14 retained from stub.** Cross-tagged. Sibling Concept: `access-controls.md`.
- **Warded locks are antique.** The wards (internal blocking ridges) prevent the wrong key from rotating, but a "skeleton key" (a key with most of the wards' blocking removed) defeats most warded locks. They are seldom deployed for security purposes today; you might see them on garden gates or decorative furniture.
- **Pin tumbler is the common door lock.** The vast majority of door locks are pin tumbler (Yale invented the modern version). Quality varies enormously — high-security pin tumbler locks (Medeco, Mul-T-Lock, ASSA Abloy) resist picking and bumping; low-cost residential locks succumb to either in seconds. The mechanism is the same; the engineering is what differentiates security strength.
- **Combination locks span quality extremes.** Cheap padlocks with simple combination wheels can be defeated by feel in under a minute. High-security combination locks (Sargent and Greenleaf 8077AD, used on government safes) are mechanically engineered to resist manipulation for hours. The "variable by mechanism quality" in this Concept reflects this enormous range.
- **Smart locks add electronic authentication on top of mechanical.** A smart lock typically uses electronic authentication (NFC, Bluetooth, keypad, app) to control whether the mechanical bolt retracts. The mechanical mechanism is still there; if power fails, most smart locks have a physical-key fallback. Smart-lock vulnerabilities tend to be in the *electronic* side (replay attacks, weak crypto) rather than the mechanical.
- **Biometric locks share the same architecture.** A biometric lock uses fingerprint, palm vein, or face recognition to authenticate; on success, it actuates the mechanical mechanism. The biometric quality (FAR/FRR — see `biometric-error-types.md`) determines the security strength. Like smart locks, biometric locks usually have a fallback (PIN, physical key) for when the biometric reader fails.
- **Master-keying is a security trade-off.** A master key opens all locks in a system; sub-keys open only specific locks. Useful for property managers, hotels, etc., but creates a single high-value target — the master key compromises every lock in the system. Many lock systems offer Maison-keying (multiple keys open one lock) as a related capability.
- **Bumping and picking attacks.** Lock bumping (using a specially-cut "bump key" to defeat pin tumblers in seconds) became widely publicized circa 2005. High-security pin tumbler locks add anti-bumping pins, telescoping pins, sidebar mechanisms, etc., to resist. Lock picking is older and slower but works on most cheap pin tumbler locks.
- **Gaps marked `[needs source]`:** none — all Facts trace to ASIS physical-security and lock-industry standards.

### Tricky distractors

- **Smart locks add electronic; mechanical still present.** Bolt is mechanical. Wrong-answer pattern: claiming smart locks have no physical mechanism — they layer electronic auth on mechanical actuation.
- **Bumping defeats most pin tumblers.** Specialty bump key. Wrong-answer pattern: claiming pin tumbler is high-security — only high-security variants resist bumping.
- **Master keys create concentrated risk.** Single point of compromise. Wrong-answer pattern: claiming master keying improves security — convenience trade-off.
- **Biometric quality determines strength.** FAR/FRR. Wrong-answer pattern: claiming all biometric locks are equally strong — varies by biometric tech.
- **Warded locks are antique.** Skeleton keys defeat them. Wrong-answer pattern: deploying warded locks for security — they're decorative.
- **Combination locks span quality extremes.** Cheap padlocks vs S&G safes. Wrong-answer pattern: assuming combination locks are uniformly weak or strong — quality varies enormously.

## Engine demo opportunities

- `? | mechanism → Pins of varying lengths align with cuts on key` → Pin tumbler
- `Combination | typical use → ?` → `Lockers and safes`
- `? | security strength → Lowest` → Warded
- `Smart lock | mechanism → ?` → `Electronic authentication unlocks mechanical bolt`
- `Biometric | typical use → ?` with `Standard residential and commercial doors` (Pin tumbler) as a tempting wrong answer
- Composite Row profile: Warded across all Columns with `typical use` swapped to `High-security area access` (Biometric's value)

## Sources

- `[s1]`: ASIS International *Protection of Assets: Physical Security* — lock-type framework (retrieved 2026-04-26, https://www.asisonline.org/publications--resources/standards--guidelines/). UL 437 *Standard for Key Locks* for security-strength rating context (retrieved 2026-04-26, https://www.ul.com/)
- `[s2]`: (ISC)² CISSP Certification Exam Outline, effective 2024-04-15, Domain 3 §3.9 and Domain 7 §7.14 (retrieved 2026-04-26, https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline)
