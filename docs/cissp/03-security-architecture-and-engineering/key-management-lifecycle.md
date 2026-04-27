# Key Management Lifecycle

**Domain:** 3 — Security Architecture and Engineering &nbsp;|&nbsp; **Pattern:** Ordered &nbsp;|&nbsp; **Tags:** 3.6
**Status:** draft (SME review pending)

The seven sequential phases a cryptographic key passes through from generation to destruction, per NIST SP 800-57. Each phase has distinct *key activities* and requires distinct *typical controls*. The CISSP exam tests both the phase ordering and the matchup between phase and the security property each phase must preserve — particularly that key generation requires high-entropy randomness and that key destruction must be verifiable.

**Layout convention:** rows are ordered chronologically (Phase 1 first, Phase 7 last). Columns progress from identifier (Phase, Name) to action (Key Activity) to controls (Typical Controls).

| Phase | Name | Key Activity | Typical Controls |
|---|---|---|---|
| 1 | Generation | Generate key using approved random source [s1] | Hardware random number generator [s1]<br>Approved DRBG [s1] |
| 2 | Distribution | Deliver key to authorized parties [s1] | Key wrapping [s1]<br>Out-of-band delivery [s1] |
| 3 | Storage | Maintain key in protected state [s1] | Hardware Security Module [s1]<br>Encrypted key store [s1] |
| 4 | Use | Apply key to cryptographic operations [s1] | Per-operation authentication [s1]<br>Operation logging [s1] |
| 5 | Rotation | Replace key on schedule before compromise [s1] | Automated rotation policy [s1]<br>Key version tracking [s1] |
| 6 | Revocation | Invalidate compromised or expired key [s1] | Revocation list publication [s1]<br>Cached key purge [s1] |
| 7 | Destruction | Permanently remove key from all storage [s1] | Cryptographic erasure [s1]<br>Destruction certificate [s1] |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. No parentheticals in cells.
- **Tag 3.6 retained from stub.** Maps to (ISC)² 2024 outline §3.6. Sibling Concepts: `pki-components.md`, `certificate-lifecycle.md`.
- **Source: NIST SP 800-57 Parts 1-3.** Part 1 covers general key-management framing; Part 2 best practices for federal agencies; Part 3 application-specific guidance. The seven-phase decomposition here aligns with Part 1's lifecycle model.
- **Generation entropy is critical.** A weak random source at generation produces a key an attacker can guess. NIST SP 800-90A specifies approved Deterministic Random Bit Generators (DRBGs); SP 800-90B covers entropy sources. Hardware random number generators (HRNGs) on modern CPUs (RDRAND, RDSEED) are widely used. Software RNGs (e.g., /dev/urandom) are acceptable when seeded from sufficient entropy.
- **Distribution is the historically-vulnerable phase.** Sending a symmetric key in cleartext exposes it. Key wrapping (encrypting the key with a key-encryption key for transport) and out-of-band delivery (different channel for key vs. ciphertext) address this. PKI / asymmetric crypto solves the distribution problem at scale by allowing public-key encryption to wrap session keys.
- **HSMs are the storage gold standard.** Hardware Security Modules (HSMs) store keys in tamper-resistant hardware that never exposes the key in cleartext outside the HSM boundary. FIPS 140-3 certifies HSMs at security levels 1-4 (4 is highest). Cloud HSMs (AWS CloudHSM, Azure Dedicated HSM, GCP Cloud HSM) extend this to cloud environments.
- **Rotation timing is risk-based.** Short rotation periods limit the value of a compromised key (attacker has shorter window). Long rotation periods reduce operational cost. NIST SP 800-57 provides recommended cryptoperiods per key type — symmetric keys rotate annually or sooner; CA root keys rotate decades or never (with strict storage).
- **Revocation requires distribution to relying parties.** Once a key is revoked, every party that might use it must learn quickly. This is why CRL/OCSP exist for certificates — they distribute revocation status. For symmetric keys, revocation is easier (just stop using the key) but requires informing all key holders.
- **Destruction = cryptographic erasure or physical destruction.** For software-stored keys: overwrite the memory holding the key (cryptographic erasure). For HSM-stored keys: zeroize the HSM key slot (the HSM provides this command). For paper-stored keys (rare, archival): physical destruction. Failure to destroy creates persistent risk — the key remains recoverable.
- **Gaps marked `[needs source]`:** none — all Facts trace to NIST SP 800-57 framing.

### Tricky distractors

- **Generation requires high entropy.** Weak RNG produces guessable keys. Wrong-answer pattern: claiming `rand()` is sufficient — approved DRBG or HRNG required.
- **Distribution is the historic weakness.** Symmetric key transport over insecure channel was the problem PKI solved. Wrong-answer pattern: claiming key generation is the hardest phase — distribution at scale was harder before asymmetric crypto.
- **HSM stores keys in hardware.** Tamper-resistant; key never leaves cleartext. Wrong-answer pattern: claiming HSM is just encrypted storage — it's hardware-bound and tamper-resistant.
- **Rotation ≠ Revocation.** Rotation = scheduled replacement. Revocation = unscheduled invalidation. Wrong-answer pattern: collapsing them.
- **Destruction must be verifiable.** Certificate of destruction. Wrong-answer pattern: claiming "we deleted the key file" without proof — destruction without documentation is just deletion.
- **Cryptoperiod varies by key type.** Symmetric keys rotate annually; CA roots rotate decades. Wrong-answer pattern: applying one cryptoperiod to all keys.

## Engine demo opportunities

- `? | Name → Rotation` → Phase 5
- `Phase 6 | Key Activity → ?` → `Invalidate compromised or expired key`
- `? | Typical Controls → Hardware Security Module` → Phase 3 / Storage
- `Generation | Typical Controls → ?` → `Hardware random number generator` or `Approved DRBG`
- Sequence verification: `Phase 4 → ? → Phase 6` → Phase 5 (Rotation)
- Composite Row profile: Generation across all Columns with `Typical Controls` swapped to `Cryptographic erasure` (Destruction's value)

## Sources

- `[s1]`: NIST SP 800-57 Part 1 Rev. 5 *Recommendation for Key Management: Part 1 — General*, May 2020 (retrieved 2026-04-26, https://csrc.nist.gov/pubs/sp/800/57/pt1/r5/final). NIST SP 800-90A Rev. 1 for DRBG framing (retrieved 2026-04-26, https://csrc.nist.gov/pubs/sp/800/90/a/r1/final)
- `[s2]`: (ISC)² CISSP Certification Exam Outline, effective 2024-04-15, Domain 3 §3.6 (retrieved 2026-04-26, https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline)
