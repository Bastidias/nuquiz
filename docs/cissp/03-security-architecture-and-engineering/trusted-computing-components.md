# Trusted Computing Components

**Domain:** 3 — Security Architecture and Engineering &nbsp;|&nbsp; **Pattern:** Dimensions &nbsp;|&nbsp; **Tags:** 3.3
**Status:** draft (SME review pending)

The three hardware-rooted trusted-computing components CISSP candidates are expected to discriminate. TPM is the platform-level root-of-trust component embedded in commodity computers; HSM is a higher-assurance dedicated cryptographic device used for key management at scale; Secure Enclaves provide CPU-level isolation for sensitive code and data. Each pairs with what it stores and the typical use case it addresses.

| Component | purpose | what it stores | typical use case | attack surface |
|---|---|---|---|---|
| TPM | Platform-level root of trust [s1] | Platform configuration registers<br>Endorsement keys<br>Storage root keys [s1] | BitLocker disk encryption<br>Boot integrity attestation | Physical bus probing<br>Cold boot key extraction |
| HSM | High-assurance dedicated cryptographic device [s2] | Key management material<br>Cryptographic keys with hardware-backed access control | Certificate authority signing<br>Payment HSM transaction signing | Side-channel attacks on FIPS 140 boundary |
| Secure Enclave | CPU-level isolated execution environment [s3] | Code and data isolated from host OS<br>Sealed secrets | Confidential computing<br>DRM key handling | Enclave software vulnerabilities<br>Microarchitectural side channels |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. **No parentheticals in cells.**
- **Acronym expansions.** `TPM` = Trusted Platform Module. `HSM` = Hardware Security Module. SGX = Intel Software Guard Extensions. SEV = AMD Secure Encrypted Virtualization. TrustZone = ARM TrustZone.
- **TPM is platform-resident.** A TPM 2.0 chip is on the motherboard of nearly every modern enterprise PC. It implements a small fixed set of cryptographic operations (RSA, ECC, SHA-256), holds keys that never leave the chip, and provides Platform Configuration Registers (PCRs) for measuring boot state. Use cases: BitLocker disk encryption (TPM holds the volume key), measured boot, attestation.
- **HSM is high-assurance dedicated hardware.** Distinct from TPM by FIPS 140 assurance level and operational scale. HSMs are typically rack-mounted or USB-form-factor devices certified at FIPS 140-2/140-3 Level 3 or higher (TPMs are usually Level 1 or 2). Used by CAs (signing certificates), payment networks (PIN block encryption, transaction signing), and key management systems for cryptographic root keys.
- **Secure Enclaves are CPU-level isolation.** Different from TPM/HSM because they execute *code*, not just store keys. Intel SGX enclaves, AMD SEV-protected VMs, ARM TrustZone secure-world processes — all provide hardware-isolated execution where code and data are protected from the host OS, hypervisor, and other tenants.
- **Use-case discrimination.** TPM = platform integrity (BitLocker, boot, attestation). HSM = high-volume crypto operations (CA signing, payment processing). Secure Enclave = confidential computing of arbitrary application code (DRM, secure ML inference, confidential cloud workloads).
- **Attack surface differs.** TPM attacks include physical bus probing (capturing data on the LPC/SPI bus between CPU and TPM) and cold-boot attacks. HSM attacks are typically side-channel on the FIPS 140 boundary (timing, power, EM analysis) — physical attacks are typically defeated by tamper-response. Secure Enclave attacks have included Foreshadow, Plundervolt, ÆPIC Leak, and other microarchitectural side channels — software-level enclave isolation is robust against most threats but not against transient-execution attacks.
- **Cross-Concept link.** Sibling Concept `side-channel-attacks` covers the side-channel attack categories that affect HSMs and enclaves. `pki-components` covers HSM use in CA contexts.
- **Out of scope for this Concept:** TPM 1.2 vs 2.0 specification differences, FIPS 140-2 / 140-3 Level distinctions, specific HSM products (Thales, Utimaco, AWS CloudHSM, Azure Key Vault HSM), specific enclave products (Intel SGX evolution, AMD SEV-SNP, ARM CCA), confidential computing consortium specifications, sealing-key derivation and attestation protocols.

### Values without a direct public citation

| Cell | Notes |
|---|---|
| All rows × attack surface | Phrasings | Industry-typical attack categorizations; specific attacks are documented in published research but not single-source-citable. |

## Engine demo opportunities

- `TPM | typical use case → ?` → `BitLocker disk encryption`, `Boot integrity attestation`
- `HSM | typical use case → ?` → `Certificate authority signing`, `Payment HSM transaction signing`
- `Secure Enclave | typical use case → ?` → `Confidential computing`, `DRM key handling`
- `? | what it stores → Platform configuration registers` → `TPM` (sub-Fact in multi-Fact cell)
- `? | typical use case → BitLocker disk encryption` → `TPM` (sub-Fact in multi-Fact cell)
- `? | purpose → CPU-level isolated execution environment` → `Secure Enclave`
- Composite TPM Row with `purpose` swapped to `High-assurance dedicated cryptographic device` — directly tests TPM-vs-HSM distinction (TPM is platform-embedded; HSM is high-assurance dedicated)
- Composite HSM Row with `typical use case` swapped to `Confidential computing`, `DRM key handling` — tests HSM vs Secure Enclave (HSM is for crypto operations on stored keys; enclave is for protecting executing code)
- Composite Secure Enclave Row with `what it stores` swapped to `Endorsement keys` — tests TPM-specific key types (endorsement keys are TPM-specific)

## Sources

- `[s1]`: Trusted Computing Group, "TPM 2.0 Library Specification" (current as of retrieval, retrieved 2026-04-26, https://trustedcomputinggroup.org/resource/tpm-library-specification/)
- `[s2]`: NIST FIPS 140-3, "Security Requirements for Cryptographic Modules" — HSM certification framework (March 2019, retrieved 2026-04-26, https://csrc.nist.gov/publications/detail/fips/140/3/final)
- `[s3]`: Confidential Computing Consortium, "Confidential Computing: Hardware-Based Trusted Execution for Applications and Data" (retrieved 2026-04-26, https://confidentialcomputing.io/wp-content/uploads/sites/85/2022/01/CCC-A-Technical-Analysis-of-Confidential-Computing-v1.3_unlocked.pdf)
