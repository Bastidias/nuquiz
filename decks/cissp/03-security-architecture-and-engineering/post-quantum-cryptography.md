# Post-Quantum Cryptography

**Domain:** 3 — Security Architecture and Engineering &nbsp;|&nbsp; **Pattern:** Dimensions &nbsp;|&nbsp; **Tags:** 3.6, 3.7

**Status:** draft (SME review pending)

The four NIST-standardized post-quantum algorithms (FIPS 203, 204, 205, 206) plus the classical algorithms they replace. Each pairs a *mathematical basis* (the hard problem it depends on) with the *function it serves* (key encapsulation or signing) and the *quantum-vulnerable algorithm* it is intended to replace. The CISSP exam tests recognition of the new standards by name and the migration mapping — particularly that ML-KEM replaces RSA/DH key exchange and ML-DSA / SLH-DSA / FN-DSA replace RSA / ECDSA signatures. Sibling Concept `asymmetric-algorithms` covers the classical algorithms that PQC migration is moving away from.

| Algorithm | standard | mathematical basis | function | replaces |
|---|---|---|---|---|
| ML-KEM | FIPS 203 [s1] | Module-Lattice Learning With Errors [s1] | Key encapsulation [s1] | RSA<br>Diffie-Hellman key exchange [s1] |
| ML-DSA | FIPS 204 [s2] | Module-Lattice signatures [s2] | Digital signatures [s2] | RSA signing<br>ECDSA<br>EdDSA [s2] |
| SLH-DSA | FIPS 205 [s3] | Stateless hash-based signatures [s3] | Digital signatures with hash-only security assumption [s3] | Same as ML-DSA but conservative fallback [s3] |
| FN-DSA | FIPS 206 [s4] | NTRU-Lattice signatures [s4] | Compact digital signatures [s4] | Use cases requiring smaller signatures than ML-DSA [s4] |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. **No parentheticals in cells.** Algorithm names use the canonical FIPS spelling.
- **Acronym expansions and history.** `ML-KEM` = Module-Lattice Key Encapsulation Mechanism (was CRYSTALS-Kyber during the NIST PQC competition). `ML-DSA` = Module-Lattice Digital Signature Algorithm (was CRYSTALS-Dilithium). `SLH-DSA` = Stateless Hash-Based Digital Signature Algorithm (was SPHINCS+). `FN-DSA` = FFT over NTRU-Lattice Digital Signature Algorithm (was FALCON). `KEM` = Key Encapsulation Mechanism. `PQC` = Post-Quantum Cryptography. `CRQC` = Cryptographically Relevant Quantum Computer.
- **Why PQC matters now.** Shor's algorithm (1994), running on a sufficiently large quantum computer, factors integers and computes discrete logarithms in polynomial time — breaking RSA, DH, ECC, ECDSA, and ElGamal. A CRQC capable of running Shor at cryptographic scale does not yet exist publicly. The migration urgency comes from "harvest now, decrypt later" — adversaries collecting encrypted traffic today to decrypt when CRQC arrives. Long-retention high-confidentiality data must migrate first.
- **Three distinct mathematical bases.** Module-lattice (ML-KEM, ML-DSA) is a structured-lattice problem chosen for performance. Hash-based (SLH-DSA) relies only on the security of an underlying hash function — the most conservative assumption because it doesn't depend on any new lattice or code-based hardness conjecture. NTRU-lattice (FN-DSA) is also lattice-based but produces smaller signatures than ML-DSA at higher implementation complexity. Diversifying mathematical bases is intentional — if a future cryptanalytic break affects one family, the others remain.
- **Hash-based as conservative fallback.** SLH-DSA's security argument relies only on the underlying hash function being collision-resistant and one-way — properties that have stood for decades and are not threatened by quantum computers (Grover's algorithm only square-roots the search space). The trade-off is signature size and signing performance: SLH-DSA signatures are large (8-50 KB) and slow compared to ML-DSA. CISA and NSA recommend SLH-DSA for high-assurance long-lifetime use cases (firmware signing, root-of-trust artifacts).
- **Classical asymmetric is fully quantum-vulnerable.** RSA, DH, ECC, ECDSA, EdDSA, ElGamal — all rely on integer factorization or discrete logarithm hardness. All are broken by Shor on a CRQC. There is no patch to RSA that resists Shor; migration is the only path.
- **Symmetric cryptography is largely safe.** Grover's algorithm provides quadratic speedup against symmetric search — effectively halving the key length. AES-128 becomes 64-bit-equivalent under Grover (still computationally unreachable in practice); AES-256 becomes 128-bit-equivalent (very secure). Hash functions face the same square-root reduction in collision difficulty (SHA-256 collision difficulty becomes 2^85 instead of 2^128) — still secure but margin narrowed. NIST guidance: continue using AES-256 and SHA-2/SHA-3 with longer outputs; symmetric does not require migration.
- **Hybrid deployment is the transition pattern.** Many systems are deploying *hybrid* key exchange — running classical (ECDHE) and post-quantum (ML-KEM) in parallel, combining both shared secrets via a KDF. If either algorithm is broken (classical to Shor, or PQC to a future cryptanalytic break), the combined key remains secure. CNSA 2.0, NSA's commercial cryptography suite, mandates hybrid PQC for national-security systems by specific deadlines.
- **NIST's migration timeline.** NIST SP 1800-38 (NCCoE migration playbook) outlines the full migration. NSA CNSA 2.0 directives prescribe National Security System deadlines: software/firmware signing by 2025, key establishment and signatures in NSS by 2030, with full transition by 2035. Federal civilian agencies face similar OMB-driven deadlines under M-23-02. Commercial sectors are following the federal lead.
- **Cross-Concept link.** Sibling Concept `asymmetric-algorithms` covers the classical algorithms PQC replaces. `symmetric-algorithms` covers AES under Grover's algorithm. `hash-functions` covers SHA-2/SHA-3 with Grover impact. `key-management-lifecycle` covers the broader key-rotation workflow that PQC migration plugs into. `cryptanalytic-attacks` covers Shor and Grover at the attacker-capability level.
- **Out of scope for this Concept:** specific PQC parameter sets (ML-KEM-512, ML-KEM-768, ML-KEM-1024 security levels and key sizes), QKD (Quantum Key Distribution — a separate quantum-resistant approach using quantum physics, not post-quantum mathematics), CNSA 2.0 deadlines in detail, code-based PQC alternatives that did not standardize (Classic McEliece, BIKE, HQC are NIST Round 4 candidates), HQC-DSA / future signature standards beyond FIPS 206, Hybrid PQC deployment patterns at the protocol level, OQS (Open Quantum Safe) implementation library.

### Tricky distractors

- **Symmetric is not quantum-vulnerable.** Grover halves effective key strength; doesn't break. Wrong-answer pattern: claiming AES needs PQC migration — AES-256 remains secure under Grover.
- **All classical asymmetric is broken by Shor.** RSA, DH, ECC, ECDSA, EdDSA. Wrong-answer pattern: claiming ECC is quantum-resistant because of smaller key size — Shor breaks ECC just like RSA.
- **ML-KEM is for key exchange; ML-DSA is for signing.** Different functions. Wrong-answer pattern: collapsing them — they're distinct algorithms for distinct use cases.
- **Hash-based (SLH-DSA) is the conservative fallback.** Relies only on hash properties. Wrong-answer pattern: claiming all PQC algorithms have equivalent security assumptions — they don't, hash-based has the strongest argument.
- **Harvest-now-decrypt-later is the urgency.** Even pre-CRQC. Wrong-answer pattern: deferring PQC migration until CRQC exists — long-retention data must migrate now.
- **PQC ≠ QKD.** Post-Quantum Cryptography uses classical computers running quantum-resistant math. Quantum Key Distribution uses physical quantum effects. Wrong-answer pattern: confusing them — different technologies, different deployment models.

### Values without a direct public citation

| Cell | Value | Why unsourced |
|---|---|---|
| FN-DSA × all cells | — | FIPS 206 finalization is recent (2024-2025); cell values reflect NIST PQC project documentation [s4] which may be supplanted by FIPS 206 final text. SME pass should verify against the released FIPS 206 once the section locators are stable. |
| All rows × replaces | Mapping phrasings | NIST PQC documentation describes the mapping at the framework level; specific replacement-target phrasings are pedagogical summaries. |

## Engine demo opportunities

- `ML-KEM | function → ?` → `Key encapsulation`
- `ML-DSA | function → ?` → `Digital signatures`
- `? | function → Key encapsulation` → `ML-KEM`
- `? | mathematical basis → Stateless hash-based signatures` → `SLH-DSA`
- `? | standard → FIPS 203` → `ML-KEM`
- `? | standard → FIPS 204` → `ML-DSA`
- `? | standard → FIPS 205` → `SLH-DSA`
- `ML-KEM | replaces → ?` → `RSA`, `Diffie-Hellman key exchange`
- `ML-DSA | replaces → ?` → `RSA signing`, `ECDSA`, `EdDSA`
- `? | replaces → Same as ML-DSA but conservative fallback` → `SLH-DSA`
- Composite ML-KEM Row with `function` swapped to `Digital signatures` (ML-DSA's value) — directly tests the KEM-vs-DSA function distinction
- Composite SLH-DSA Row with `mathematical basis` swapped to `Module-Lattice Learning With Errors` (ML-KEM's value) — tests the lattice-vs-hash basis distinction
- Composite ML-DSA Row with `replaces` swapped to `RSA`, `Diffie-Hellman key exchange` (ML-KEM's replaces value) — tests signature vs key-exchange replacement (DH replacement is ML-KEM, not ML-DSA)

## Sources

- `[s1]`: NIST FIPS 203, "Module-Lattice-Based Key-Encapsulation Mechanism Standard" — ML-KEM specification (August 2024, retrieved 2026-04-30, https://csrc.nist.gov/pubs/fips/203/final)
- `[s2]`: NIST FIPS 204, "Module-Lattice-Based Digital Signature Standard" — ML-DSA specification (August 2024, retrieved 2026-04-30, https://csrc.nist.gov/pubs/fips/204/final)
- `[s3]`: NIST FIPS 205, "Stateless Hash-Based Digital Signature Standard" — SLH-DSA specification (August 2024, retrieved 2026-04-30, https://csrc.nist.gov/pubs/fips/205/final)
- `[s4]`: NIST PQC Project, "FIPS 206 — FALCON / FN-DSA" finalization (2024-2025, retrieved 2026-04-30, https://csrc.nist.gov/projects/post-quantum-cryptography). NIST PQC project landing page for migration guidance and parameter sets.
- `[s5]`: NSA, "Commercial National Security Algorithm Suite 2.0 (CNSA 2.0)" — National Security System PQC migration timeline and required algorithms (retrieved 2026-04-30, https://media.defense.gov/2022/Sep/07/2003071836/-1/-1/0/CSA_CNSA_2.0_ALGORITHMS_.PDF)
- `[s6]`: (ISC)² CISSP Certification Exam Outline, effective 2024-04-15, Domain 3 §3.6 *Select and determine cryptographic solutions* and §3.7 *Understand methods of cryptanalytic attacks* (retrieved 2026-04-30, https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline)
