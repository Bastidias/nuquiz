# Digital Signature Process

**Domain:** 3 — Security Architecture and Engineering &nbsp;|&nbsp; **Pattern:** Ordered &nbsp;|&nbsp; **Tags:** 3.6
**Status:** draft (SME review pending)

The five sequential steps that produce and verify a digital signature. Steps 1-2 are signing (sender side); steps 3-5 are verification (recipient side). The CISSP exam tests both the ordering and the matchup between step and the cryptographic primitive used — particularly that the *hash* is signed, not the message itself, for performance and security reasons.

**Layout convention:** rows are ordered chronologically across both signing and verification (Step 1 first, Step 5 last). Columns progress from identifier (Step, Name) to direction (signing or verification side) to mechanism.

| Step | Name | Direction | Mechanism |
|---|---|---|---|
| 1 | Hash message | Signer side [s1] | Apply cryptographic hash function to message [s1] |
| 2 | Encrypt hash with private key | Signer side [s1] | Apply asymmetric signing operation to message digest [s1] |
| 3 | Send message and signature | Transmission [s1] | Transmit message alongside signature [s1] |
| 4 | Recipient hashes message | Verifier side [s1] | Apply same hash function to received message [s1] |
| 5 | Verify signature using public key | Verifier side [s1] | Apply asymmetric verify operation comparing decrypted hash with computed hash [s1] |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. No parentheticals in cells.
- **Tag 3.6 retained from stub.** Maps to (ISC)² 2024 outline §3.6. Sibling Concepts: `asymmetric-algorithms.md` (the algorithms that sign), `hash-functions.md` (the hashes that get signed), `pki-components.md` (the infrastructure that supplies public keys).
- **Why the hash is signed, not the message.** Asymmetric operations are slow — signing a multi-megabyte message directly would be impractical. A hash compresses the message to a fixed small size (e.g., 256 bits for SHA-256), and the signature is computed on that. The collision-resistance of the hash function ensures that the signature binds to the original message: if you cannot produce another message with the same hash, then the signed hash uniquely commits to your message.
- **"Encrypt with private key" is loose terminology.** RSA signing happens to be implemented as encryption-with-private-key in the original PKCS#1 v1.5 mode (and decryption-with-public-key for verification). For DSA, ECDSA, EdDSA, the signing operation is *not* encryption in any meaningful sense — it is a distinct mathematical operation. The "encrypt hash with private key" framing is a CISSP simplification; technically more accurate is "apply signing operation."
- **The recipient does two things in Step 5.** Decrypt the signature using the sender's public key (recovering the original hash); compute the hash of the received message; compare the two hashes. If they match, the signature is valid: the message was not tampered with and was signed by the holder of the corresponding private key.
- **Properties provided.** Authentication (only the holder of the private key could have signed), integrity (any modification to the message changes its hash and breaks verification), non-repudiation (the signer cannot later deny signing because no one else has the private key). Confidentiality is *not* provided — the message itself is not encrypted by signing.
- **Combining signing and encryption.** When confidentiality and authentication both matter, the message is typically signed *and* encrypted. There are subtle ordering questions (sign-then-encrypt vs. encrypt-then-sign) — modern guidance is encrypt-then-MAC for symmetric AEAD, and sign-then-encrypt with care for the asymmetric case. The CISSP exam may not test these subtleties.
- **What is intentionally not on this table.** Detached vs. attached signatures (whether the signature accompanies the message or is sent separately), signature formats (PKCS#7, JWS, COSE), countersignatures, and post-quantum signature schemes (ML-DSA, SLH-DSA in FIPS 204/205) could be added in future revisions.
- **Gaps marked `[needs source]`:** none — all Facts trace to FIPS 186-5 / RFC 8032 framing.

## Engine demo opportunities

- `? | Name → Encrypt hash with private key` → Step 2
- `Step 4 | Mechanism → ?` → `Apply same hash function to received message`
- `? | Direction → Verifier side` → Steps 4 and 5 (cross-Row select)
- `Step 1 | Mechanism → ?` → `Apply cryptographic hash function to message`
- Sequence verification: `Step 1 → ? → Step 3` → Step 2 (Encrypt hash)
- Composite Row profile: Step 1 across all Columns with `Direction` swapped to `Verifier side` (Steps 4-5 value)

## Sources

- `[s1]`: NIST FIPS 186-5 *Digital Signature Standard (DSS)*, February 2023 — RSA, ECDSA, EdDSA signing and verification process (retrieved 2026-04-26, https://csrc.nist.gov/pubs/fips/186-5/final). RFC 8032 *Edwards-Curve Digital Signature Algorithm (EdDSA)* (retrieved 2026-04-26, https://www.rfc-editor.org/rfc/rfc8032)
- `[s2]`: (ISC)² CISSP Certification Exam Outline, effective 2024-04-15, Domain 3 §3.6 (retrieved 2026-04-26, https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline)
