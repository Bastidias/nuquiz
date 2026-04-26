# Asymmetric Algorithms

**Domain:** 3 — Security Architecture and Engineering &nbsp;|&nbsp; **Pattern:** Dimensions &nbsp;|&nbsp; **Tags:** 3.6
**Status:** draft (SME review pending)

The five asymmetric algorithms CISSP courseware tests by name. Each pairs a *mathematical basis* (the hard problem the security depends on) with *typical key size*, *use cases*, and current *status* (recommended, deprecated, or quantum-vulnerable). The CISSP exam tests both the matchup between algorithm and use case (encryption vs. signing vs. key exchange) and the post-quantum migration urgency for RSA, ECC, and DH.

| algorithm | mathematical basis | typical key size | use cases | status |
|---|---|---|---|---|
| RSA | Integer factorization difficulty [s1] | 2048-3072 bits [s1] | Encryption [s1]<br>Digital signatures [s1]<br>Key exchange [s1] | Deprecated for new deployments per NIST PQC migration [s2] |
| DSA | Discrete logarithm in finite field [s1] | 2048-3072 bits [s1] | Digital signatures [s1] | Deprecated for new use after FIPS 186-5 [s1] |
| ECC | Discrete logarithm on elliptic curves [s1] | 256-384 bits [s1] | Digital signatures [s1]<br>Key exchange [s1] | Quantum-vulnerable [s2] |
| ElGamal | Discrete logarithm in finite field [s3] | 2048-3072 bits [s3] | Encryption [s3] | Rarely used in modern systems [needs source] |
| Diffie-Hellman | Discrete logarithm in finite field [s4] | 2048-3072 bits [s4] | Key exchange only [s4] | Quantum-vulnerable [s2] |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. No parentheticals in cells.
- **Tag 3.6 retained from stub.** Maps to (ISC)² 2024 outline §3.6 *Select and determine cryptographic solutions*. Sibling Concepts: `symmetric-algorithms.md`, `symmetric-vs-asymmetric.md`.
- **Post-quantum migration is the major recent change.** All five algorithms here rely on hard problems that Shor's algorithm solves in polynomial time on a sufficiently large quantum computer. NIST has published PQC standards (ML-KEM, ML-DSA, SLH-DSA in FIPS 203/204/205, August 2024) and is now deprecating RSA and ECC for new deployments. The CISSP exam may test this transition as a current event.
- **RSA is multi-purpose; DH is single-purpose.** RSA can do encryption, signing, and key exchange. Diffie-Hellman is *only* a key-exchange protocol — it has no signing or encryption mode. This is the most-tested CISSP asymmetric-algorithm distinction.
- **ECC's key-size advantage.** ECC achieves equivalent security to RSA at much smaller key sizes — 256-bit ECC is roughly equivalent to 3072-bit RSA. Smaller keys mean smaller signatures, faster computation, and lower bandwidth. ECC dominated mobile and IoT until post-quantum concerns emerged.
- **DSA was the U.S. government signature standard until FIPS 186-5.** FIPS 186-5 (February 2023) deprecated DSA in favor of ECDSA and EdDSA. New federal deployments should not use DSA; existing deployments should plan migration. The CISSP exam may not yet reflect this fully.
- **ElGamal exists as a foundation for newer schemes.** ElGamal encryption is rarely deployed directly but underlies several newer cryptographic schemes (e.g., parts of Cramer-Shoup). Worth knowing the name and basis but seldom tested in operational scenarios.
- **Quantum vulnerability does not mean immediate break.** A cryptographically-relevant quantum computer (CRQC) does not yet exist. The migration urgency comes from "harvest now, decrypt later" attacks — adversaries collecting encrypted data today to decrypt when CRQC arrives. High-confidentiality data (long retention, high sensitivity) should migrate first.
- **Gaps marked `[needs source]`:** one Fact — ElGamal modern usage. Practitioner consensus that ElGamal is rarely deployed but specific publications confirming this are not standard.

## Engine demo opportunities

- `? | mathematical basis → Integer factorization difficulty` → RSA
- `ECC | typical key size → ?` → `256-384 bits`
- `? | use cases → Key exchange only` → Diffie-Hellman
- `DSA | use cases → ?` → `Digital signatures`
- Cross-Row distractor: `Diffie-Hellman | use cases → ?` with `Encryption` (RSA / ElGamal) as a tempting wrong answer (DH is key-exchange-only)
- Cross-Row shared-Value detection: `? | mathematical basis → Discrete logarithm in finite field` → DSA, ElGamal, Diffie-Hellman
- Composite Row profile: RSA across all Columns with `mathematical basis` swapped to `Discrete logarithm on elliptic curves` (ECC's value)

## Sources

- `[s1]`: NIST FIPS 186-5 *Digital Signature Standard (DSS)*, February 2023 — RSA, ECDSA, EdDSA signature algorithms (retrieved 2026-04-26, https://csrc.nist.gov/pubs/fips/186-5/final)
- `[s2]`: NIST PQC Project — FIPS 203 ML-KEM, FIPS 204 ML-DSA, FIPS 205 SLH-DSA, August 2024 (retrieved 2026-04-26, https://csrc.nist.gov/projects/post-quantum-cryptography)
- `[s3]`: T. ElGamal *A Public Key Cryptosystem and a Signature Scheme Based on Discrete Logarithms*, IEEE Transactions on Information Theory, 1985 (retrieved 2026-04-26, sourced via published cryptography references)
- `[s4]`: NIST SP 800-56A Rev. 3 *Recommendation for Pair-Wise Key-Establishment Schemes Using Discrete Logarithm Cryptography*, April 2018 — Diffie-Hellman key establishment (retrieved 2026-04-26, https://csrc.nist.gov/pubs/sp/800/56/a/r3/final)
- `[s5]`: (ISC)² CISSP Certification Exam Outline, effective 2024-04-15, Domain 3 §3.6 (retrieved 2026-04-26, https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline)
