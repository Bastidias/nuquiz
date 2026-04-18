# Domain 3: Security Architecture and Engineering

**Weight:** 13% &nbsp;|&nbsp; **Target facts:** ~650 &nbsp;|&nbsp; **Status:** Concept scaffold drafted, SME review pending

This is the **crypto and security models** domain. Heavy on Dimensions Concepts (algorithm comparisons, security model comparisons) and a few Ordered Concepts (certificate lifecycle, digital signature flow).

---

## (ISC)² Sub-objectives (verify against current outline)

| # | Sub-objective |
|---|---|
| 3.1 | Research, implement, and manage engineering processes using secure design principles |
| 3.2 | Understand the fundamental concepts of security models |
| 3.3 | Select controls based upon systems security requirements |
| 3.4 | Understand security capabilities of information systems |
| 3.5 | Assess and mitigate vulnerabilities of security architectures, designs, and solution elements |
| 3.6 | Select and determine cryptographic solutions |
| 3.7 | Understand methods of cryptanalytic attacks |
| 3.8 | Apply security principles to site and facility design |
| 3.9 | Design site and facility security controls |

---

## Proposed Concepts (SME to confirm and refine)

### 3.1 Secure Design Principles

| Concept | Pattern | Rows | Columns | Tags | Est. facts |
|---|---|---|---|---|---|
| Secure design principles | Dimensions | Defense in depth, Least privilege, Fail-safe defaults, Separation of duties, Complete mediation, Open design, Psychological acceptability, Economy of mechanism | definition, threat mitigated, example | 3.1 | ~32 |
| Threat modeling outputs vs inputs | Dimensions | Inputs, Outputs | examples, who provides, format | 3.1, 1.11 | ~6 |

### 3.2 Security Models

| Concept | Pattern | Rows | Columns | Tags | Est. facts |
|---|---|---|---|---|---|
| Confidentiality models | Dimensions | Bell-LaPadula, Lattice, Take-Grant | focus, key rules, "no read up" / "no write down" properties, weakness | 3.2 | ~16 |
| Bell-LaPadula properties | Aspects | Bell-LaPadula | simple security property, *-property (star), strong tranquility, weak tranquility | 3.2 | ~8 |
| Integrity models | Dimensions | Biba, Clark-Wilson, Lipner | focus, key rules, properties, weakness | 3.2 | ~16 |
| Biba properties | Aspects | Biba | simple integrity property, *-integrity property (star), invocation property | 3.2 | ~6 |
| Brewer-Nash (Chinese Wall) | Aspects | Brewer-Nash | purpose, key rule, conflict-of-interest example, application domain | 3.2 | ~5 |
| Other access models | Dimensions | Graham-Denning, HRU, Noninterference | focus, key concept, example | 3.2 | ~12 |

### 3.3 Controls Selection

| Concept | Pattern | Rows | Columns | Tags | Est. facts |
|---|---|---|---|---|---|
| Trusted Computing components | Dimensions | TPM, HSM, Secure Enclave (SGX/TrustZone) | purpose, what it stores, typical use case, attack surface | 3.3 | ~16 |
| Reference monitor properties | Aspects | Reference Monitor | tamper-proof requirement, always-invoked requirement, verifiable requirement, role | 3.3 | ~6 |

### 3.4 System Capabilities

| Concept | Pattern | Rows | Columns | Tags | Est. facts |
|---|---|---|---|---|---|
| Common Criteria EALs | Ordered | EAL1-7 (in increasing assurance) | Name, Assurance Level, Typical use, Effort | 3.4 | ~28 |
| Memory protection mechanisms | Dimensions | ASLR, DEP/NX, Canaries, Pointer authentication | mechanism, attack mitigated, performance cost | 3.4 | ~16 |

### 3.5 Architecture Vulnerabilities

| Concept | Pattern | Rows | Columns | Tags | Est. facts |
|---|---|---|---|---|---|
| Common architecture vulnerabilities | Dimensions | Buffer overflow, Race condition, TOCTOU, Covert channel, Side channel, Confused deputy | mechanism, exploitation example, mitigation | 3.5 | ~24 |
| Covert channel types | Dimensions | Storage covert channel, Timing covert channel | mechanism, example, detection difficulty | 3.5 | ~8 |

### 3.6 Cryptography

| Concept | Pattern | Rows | Columns | Tags | Est. facts |
|---|---|---|---|---|---|
| Symmetric algorithms | Dimensions | DES, 3DES, AES, Blowfish, Twofish, RC4 | key size, block size, status (deprecated/current), typical use | 3.6 | ~30 |
| Asymmetric algorithms | Dimensions | RSA, DSA, ECC, ElGamal, Diffie-Hellman | mathematical basis, typical key size, use cases, status | 3.6 | ~24 |
| Hash functions | Dimensions | MD5, SHA-1, SHA-256, SHA-3, RIPEMD-160 | output size, status (deprecated/current), known weakness | 3.6 | ~20 |
| MAC functions | Dimensions | HMAC, CMAC, GMAC, Poly1305 | construction, typical use, key dependency | 3.6 | ~16 |
| Cipher modes of operation | Dimensions | ECB, CBC, CFB, OFB, CTR, GCM, CCM | parallelizable?, IV requirement, authentication, weakness | 3.6 | ~28 |
| Symmetric vs asymmetric | Dimensions | Symmetric, Asymmetric, Hybrid | speed, key distribution, typical use, key count for N parties | 3.6 | ~16 |
| PKI components | Dimensions | CA, RA, CRL, OCSP, Certificate, Key escrow | role, who runs it, typical interaction | 3.6 | ~24 |
| Certificate lifecycle | Ordered | Phase 1-6 (Request, Validate, Issue, Use, Revoke, Expire/Renew) | Name, Key Activity, Typical Output | 3.6 | ~18 |
| Digital signature process | Ordered | Step 1-5 (Hash message, Encrypt hash with private key, Send message + signature, Recipient hashes message, Recipient decrypts signature with public key, Compare hashes) | Name, Direction, Mechanism | 3.6 | ~18 |
| Key management lifecycle | Ordered | Phase 1-7 (Generation, Distribution, Storage, Use, Rotation, Revocation, Destruction) | Name, Key Activity, Typical Controls | 3.6 | ~21 |

### 3.7 Cryptanalytic Attacks

| Concept | Pattern | Rows | Columns | Tags | Est. facts |
|---|---|---|---|---|---|
| Cryptanalytic attacks | Dimensions | Brute force, Frequency analysis, Known plaintext, Chosen plaintext, Chosen ciphertext, Birthday, Rainbow tables, Side-channel, Replay, MITM, Dictionary, Related-key | attack mechanism, target, mitigation | 3.7 | ~36 |
| Side-channel attack types | Dimensions | Timing, Power, EM, Acoustic, Fault injection, Cache | physical signal exploited, target, mitigation | 3.7 | ~18 |

### 3.8 Site Design

| Concept | Pattern | Rows | Columns | Tags | Est. facts |
|---|---|---|---|---|---|
| CPTED principles | Dimensions | Natural surveillance, Natural access control, Territorial reinforcement, Maintenance | principle, typical implementation, intended outcome | 3.8 | ~12 |
| Site selection criteria | Aspects | Site selection | natural disaster risk, crime rate, utility availability, physical access, political stability | 3.8 | ~10 |

### 3.9 Site and Facility Controls

| Concept | Pattern | Rows | Columns | Tags | Est. facts |
|---|---|---|---|---|---|
| Physical perimeter controls | Dimensions | Fences, Walls, Lighting, Bollards, Gates, Mantraps | purpose, deterrent or preventive, typical placement | 3.9 | ~18 |
| Physical access controls | Dimensions | Badges, Biometrics, Locks, Turnstiles, Smart cards | mechanism, typical use, weakness | 3.9 | ~20 |
| Lock types | Dimensions | Warded, Pin tumbler, Combination, Smart lock, Biometric | mechanism, security strength, typical use | 3.9 | ~15 |
| Fire classes | Dimensions | Class A, Class B, Class C, Class D, Class K | fuel type, example, appropriate suppression | 3.9 | ~20 |
| Fire suppression agents | Dimensions | Water, Foam, CO2, FM-200, Novec 1230, Inert gas | fire classes addressed, environmental impact, life safety, typical environment | 3.9 | ~24 |
| HVAC considerations | Aspects | Data center HVAC | temperature target, humidity target, positive pressure rationale, redundancy | 3.9 | ~8 |
| Detection systems | Dimensions | Motion detector, IDS (physical), CCTV, Tamper sensor | mechanism, typical placement, alerting | 3.9 | ~16 |

---

## Domain 3 Totals

- **Concepts:** ~33
- **Estimated facts:** ~620-680 (matches target)
- This domain is heavy because crypto compares produce wide tables with many attributes.

---

## SME Review Checklist

- [ ] Sub-objective numbering matches current (ISC)² outline
- [ ] Algorithm lists current (e.g., should we include Kyber/Dilithium for post-quantum?)
- [ ] Security model coverage adequate (Bell-LaPadula, Biba, Clark-Wilson, Brewer-Nash are guaranteed; others are nice-to-have)
- [ ] EAL coverage at right depth (some prep covers all 7, others focus on EAL2/EAL4 commercial relevance)
- [ ] Cipher modes — should we cover all 7 or focus on commonly-tested CBC/GCM/CTR?
- [ ] Patterns appropriate
- [ ] Fact count estimates realistic

---

## Concept Files (to be created)

```
secure-design-principles.md            confidentiality-models.md
bell-lapadula-properties.md            integrity-models.md
biba-properties.md                     brewer-nash.md
other-access-models.md                 trusted-computing-components.md
reference-monitor.md                   common-criteria-eals.md
memory-protection.md                   architecture-vulnerabilities.md
covert-channel-types.md                symmetric-algorithms.md
asymmetric-algorithms.md               hash-functions.md
mac-functions.md                       cipher-modes.md
symmetric-vs-asymmetric.md             pki-components.md
certificate-lifecycle.md               digital-signature-process.md
key-management-lifecycle.md            cryptanalytic-attacks.md
side-channel-attacks.md                cpted-principles.md
site-selection.md                      perimeter-controls.md
access-controls.md                     lock-types.md
fire-classes.md                        fire-suppression-agents.md
hvac-considerations.md                 detection-systems.md
```
