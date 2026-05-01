# Cipher Modes of Operation

**Domain:** 3 — Security Architecture and Engineering &nbsp;|&nbsp; **Pattern:** Dimensions &nbsp;|&nbsp; **Tags:** 3.6
**Status:** draft (SME review pending)

The seven block-cipher modes of operation defined in NIST SP 800-38 series. Each pairs *parallelizability* (does encryption parallelize across blocks?), *IV requirement*, *authentication* (does the mode include authenticated encryption?), and a known *weakness*. The CISSP exam tests both the matchup between mode and use case and the weaknesses — particularly ECB's pattern-preservation flaw and the AEAD modes (GCM, CCM) that combine encryption with integrity.

| mode | parallelizable? | IV requirement | authentication | weakness |
|---|---|---|---|---|
| ECB | Encryption parallelizable [s1] | None [s1] | None [s1] | Identical plaintext blocks produce identical ciphertext [s1] |
| CBC | Encryption sequential [s1] | Random IV required [s1] | None [s1] | Padding oracle attacks if poorly implemented [s1] |
| CFB | Encryption sequential [s1] | Unique IV required [s1] | None [s1] | Sequential operation prevents parallelization [s1] |
| OFB | Encryption sequential [s1] | Unique IV required [s1] | None [s1] | Bit-flip attacks possible without authentication [s1] |
| CTR | Encryption parallelizable [s1] | Unique counter required [s1] | None [s1] | Counter reuse breaks confidentiality [s1] |
| GCM | Encryption parallelizable [s2] | Unique IV required [s2] | Built-in authentication tag [s2] | IV reuse catastrophically breaks security [s2] |
| CCM | Encryption sequential [s3] | Unique nonce required [s3] | Built-in authentication tag [s3] | Two-pass design prevents parallelization [s3] |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. No parentheticals in cells.
- **Tag 3.6 retained from stub.** Maps to (ISC)² 2024 outline §3.6. Sibling Concepts: `symmetric-algorithms.md`, `mac-functions.md`.
- **ECB is the "do not use" mode.** Identical plaintext blocks produce identical ciphertext blocks, preserving plaintext patterns visible in the ciphertext (the classic "ECB penguin" image illustrates this). Acceptable only for single-block encryption (e.g., key wrapping) where patterns cannot manifest.
- **AEAD modes (GCM, CCM) are the modern recommendation.** Authenticated Encryption with Associated Data combines encryption *and* authentication in a single algorithm. This eliminates entire classes of bugs (encrypt-then-MAC vs. MAC-then-encrypt errors, padding oracle attacks). GCM is the most common (TLS 1.3 mandates AEAD); CCM is used in IoT and 802.11i WPA2.
- **IV reuse is the operational landmine.** Stream-cipher modes (CTR, GCM, OFB) all require unique IVs per encryption with the same key. Reusing an IV reveals the XOR of the two plaintexts (catastrophic for confidentiality). For GCM specifically, IV reuse also breaks authentication (forgery attacks become possible). Most cryptography failures in practice trace to IV/nonce reuse.
- **CBC vs. CTR for non-AEAD use.** When AEAD is unavailable, CTR is generally preferred over CBC because (a) CTR parallelizes; (b) CBC's chained dependency means a single bit error propagates to subsequent blocks; (c) CBC is vulnerable to padding-oracle attacks if padding validation is sloppy (POODLE, BEAST, Lucky-13). Use CTR with a separate MAC for non-AEAD authenticated encryption.
- **Decryption parallelizability differs from encryption.** CBC encryption is sequential; CBC *decryption* parallelizes (each ciphertext block can be decrypted independently and XORed with the previous). Most modes have asymmetric parallelizability for encryption vs. decryption. The Concept's column simplifies to encryption-direction parallelizability per the most common usage.
- **CTR is essentially a stream cipher built from a block cipher.** CTR mode generates a keystream by encrypting successive counter values; XOR with plaintext yields ciphertext. This is what makes CTR parallelizable (each counter is independent) and why counter reuse is so destructive (reusing the counter means reusing the keystream).
- **What is intentionally not on this table.** XTS (used for disk encryption), CMAC (a MAC mode), KW/KWP (key-wrapping modes), and the newer SIV (Synthetic IV — nonce-misuse-resistant AEAD) are additional modes that could be added in future revisions.
- **Gaps marked `[needs source]`:** none — all Facts trace to NIST SP 800-38 series.

### Tricky distractors

- **ECB preserves plaintext patterns.** Identical plaintext blocks → identical ciphertext blocks. Wrong-answer pattern: choosing ECB for any non-trivial workload — the ECB penguin image is the canonical illustration of why this fails.
- **GCM and CCM are AEAD; CBC and CTR alone are not.** Wrong-answer pattern: claiming CBC provides authentication — it provides confidentiality only and requires a separate MAC.
- **IV reuse breaks GCM catastrophically.** Reusing a GCM nonce with the same key reveals the authentication subkey, allowing ciphertext forgery — far worse than the confidentiality break in CTR. Wrong-answer pattern: treating IV reuse as merely a confidentiality issue in GCM.
- **CTR is parallelizable; CBC is not.** CTR encrypts independent counter values; CBC chains each block to the previous ciphertext. Wrong-answer pattern: claiming CBC parallelizes encryption — only its decryption parallelizes.
- **Padding oracle attacks affect CBC.** POODLE, Lucky-13, BEAST all exploit padding-validation leaks in CBC. Wrong-answer pattern: claiming GCM is vulnerable to padding oracles — GCM uses no padding (it's a stream-style mode).
- **Stream-mode vs block-mode terminology.** ECB and CBC are block-modes (encrypt full blocks). CTR, OFB, CFB, GCM behave like stream ciphers (XOR keystream with plaintext). Wrong-answer pattern: claiming all block-cipher modes process plaintext in fixed blocks — stream-style modes don't.

## Engine demo opportunities

- `? | weakness → Identical plaintext blocks produce identical ciphertext` → ECB
- `GCM | authentication → ?` → `Built-in authentication tag`
- `? | parallelizable? → Encryption parallelizable` → ECB, CTR, GCM (cross-Row select)
- `CBC | weakness → ?` → `Padding oracle attacks if poorly implemented`
- Cross-Row shared-Value detection: `? | authentication → None` → ECB, CBC, CFB, OFB, CTR
- Cross-Row shared-Value detection: `? | authentication → Built-in authentication tag` → GCM, CCM
- Composite Row profile: ECB across all Columns with `weakness` swapped to `IV reuse catastrophically breaks security` (GCM's value)

## Sources

- `[s1]`: NIST SP 800-38A *Recommendation for Block Cipher Modes of Operation: Methods and Techniques*, December 2001 — ECB, CBC, CFB, OFB, CTR (retrieved 2026-04-26, https://csrc.nist.gov/pubs/sp/800/38/a/final)
- `[s2]`: NIST SP 800-38D *Recommendation for Block Cipher Modes of Operation: Galois/Counter Mode (GCM) and GMAC*, November 2007 (retrieved 2026-04-26, https://csrc.nist.gov/pubs/sp/800/38/d/final)
- `[s3]`: NIST SP 800-38C *Recommendation for Block Cipher Modes of Operation: The CCM Mode for Authentication and Confidentiality*, May 2004 (retrieved 2026-04-26, https://csrc.nist.gov/pubs/sp/800/38/c/final)
- `[s4]`: (ISC)² CISSP Certification Exam Outline, effective 2024-04-15, Domain 3 §3.6 (retrieved 2026-04-26, https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline)
