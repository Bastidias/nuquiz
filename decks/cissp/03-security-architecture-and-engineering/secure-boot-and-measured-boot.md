# Secure Boot and Measured Boot

**Domain:** 3 — Security Architecture and Engineering &nbsp;|&nbsp; **Pattern:** Dimensions &nbsp;|&nbsp; **Tags:** 3.3, 3.4

**Status:** draft (SME review pending)

The four boot-integrity mechanisms CISSP candidates are expected to discriminate. Each pairs an *enforcement model* with the *integrity-violation detection* it provides and the *trust dependency* it relies on. Secure Boot blocks unsigned components at load time; Measured Boot records hash measurements without blocking; Trusted Boot combines the two; Verified Boot is the mobile-platform variant. Sibling Concept `trusted-computing-components` covers the TPM that Measured Boot stores measurements in.

| Mechanism | enforcement model | what it detects | trust dependency |
|---|---|---|---|
| Secure Boot | Block load of unsigned bootloader and kernel components [s1] | Unauthorized boot components<br>Unsigned bootkits [s1] | Platform Key plus Key Exchange Key in firmware [s1] |
| Measured Boot | Record hash of each boot stage to TPM Platform Configuration Registers [s2] | Any change to boot chain after baseline measurement [s2] | TPM with PCR storage [s2] |
| Trusted Boot | Combine Secure Boot enforcement with Measured Boot recording [s2] | Unauthorized loads at signature check<br>Configuration drift via PCR comparison [s2] | UEFI Secure Boot keys plus TPM [s2] |
| Verified Boot | Cryptographically verify each stage against expected hash chain on mobile platforms [s3] | Tampering with boot partitions on Android or iOS [s3] | Hardware-fused root of trust on device [s3] |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. **No parentheticals in cells.** Acronym expansions live in this section.
- **Acronym expansions.** `UEFI` = Unified Extensible Firmware Interface. `TPM` = Trusted Platform Module. `PCR` = Platform Configuration Register. `PK` = Platform Key. `KEK` = Key Exchange Key. `db` = signature database. `dbx` = signature blocklist. `IMA` = Integrity Measurement Architecture (Linux). `dm-verity` = device-mapper verity (Linux/Android). `AVB` = Android Verified Boot.
- **Secure Boot is enforcement; Measured Boot is observation.** This is the canonical CISSP exam distinction. Secure Boot *prevents* unauthorized code from loading by checking signatures against a trust database in firmware (db) and refusing to load anything unsigned or signed by a revoked key (dbx). Measured Boot *records* a hash of every boot component to TPM PCRs but does not block — it produces an audit trail that a remote attestation server compares against expected values. Many platforms run both.
- **Secure Boot key hierarchy.** UEFI Secure Boot stores three key sets in firmware: Platform Key (the root, owned by the platform vendor or organization), Key Exchange Keys (authorize updates to the signature database), and the signature database itself (db = allowed, dbx = forbidden). Microsoft signs Windows bootloaders with a key in db on most consumer platforms; many distributions sign their own bootloaders with shim certificates that chain to a Microsoft-signed shim. Replacing the PK lets an organization control its own boot trust chain.
- **Measured Boot uses TPM PCRs.** PCRs are extend-only registers — you cannot write a value, only "extend" them via `PCR_new = SHA(PCR_old || measurement)`. This means the final PCR value cryptographically commits to the entire sequence of measurements; tampering with one stage changes every subsequent PCR value. PCR 0-7 typically hold firmware/UEFI measurements; PCR 8+ hold OS-loader and kernel measurements. The full PCR set is the *attestation quote* a remote server validates.
- **Trusted Boot is the mature default.** Modern Windows (BitLocker requires it on PCR-bound configurations), modern enterprise Linux (with Secure Boot + IMA + remote attestation), and high-assurance platforms run both Secure Boot enforcement and Measured Boot recording. The *combined* protection: known-bad components are blocked, and any other change is detected via attestation.
- **Verified Boot is the mobile-platform variant.** Android Verified Boot (AVB 2.0) and Apple's secure-boot chain on iOS use hardware-fused root-of-trust keys to verify each boot stage against expected hashes stored in signed metadata. Tampering with the boot partition results in a verification failure that either refuses to boot or warns the user prominently. AVB also includes anti-rollback protection — a device cannot revert to a known-vulnerable previous OS version.
- **Anti-rollback is the defense against firmware downgrade attacks.** Without it, an attacker (or sophisticated malware) could downgrade firmware to a known-vulnerable version. UEFI dbx (the forbidden-signature list) and AVB rollback indices both implement anti-rollback. The dbx is what gets updated when CVE-2020-10713 (BootHole) class vulnerabilities are remediated — the vulnerable shim signature is added to dbx.
- **Remote attestation completes the picture.** Measured Boot's PCR values mean nothing without somewhere to send them and validate against expected baselines. TPM's `Quote` operation produces a signed attestation of PCR contents that a remote attestation server (Microsoft Azure Attestation, AWS Nitro Attestation, Google Titan, or self-hosted) compares against allowed configurations. This is the basis for measured-launch environments (Intel TXT, AMD SVM/SEV) and confidential-computing TEE attestation.
- **Cross-Concept link.** Sibling Concept `trusted-computing-components` covers TPM, HSM, and Secure Enclave. `architecture-vulnerabilities` covers buffer overflows and rootkits — bootkits specifically — that Secure Boot defeats. `mobile-device-security` covers Verified Boot in the mobile-deployment context. `key-management-lifecycle` covers the broader key-rotation workflow that includes Secure Boot keys.
- **Out of scope for this Concept:** specific UEFI Secure Boot configuration (PK enrollment, MOK, shim, SBAT), specific TPM Quote / attestation protocols (TCG attestation, IETF RATS), DRTM (Dynamic Root of Trust Measurement) via Intel TXT or AMD SVM, Apple Secure Enclave specifics, BootHole and other Secure Boot CVEs in detail, kernel-runtime integrity (IMA, dm-verity, kernel lockdown), confidential-computing TEE attestation specifics.

### Tricky distractors

- **Secure Boot blocks; Measured Boot records.** Most-tested distinction. Wrong-answer pattern: collapsing them — Secure Boot is enforcement; Measured Boot is observation. Both can run simultaneously.
- **Measured Boot needs a TPM.** PCRs live in the TPM. Wrong-answer pattern: claiming Measured Boot works without TPM hardware — it depends on TPM PCR storage.
- **PCRs are extend-only.** Cannot directly write values. Wrong-answer pattern: claiming software can set arbitrary PCR values to spoof measurements — extend operations are cumulative.
- **Trusted Boot ≠ Trusted Platform Module.** Trusted Boot is the combined Secure+Measured approach. TPM is the hardware module. Wrong-answer pattern: confusing them — TPM is a *component* used by Trusted Boot.
- **Anti-rollback prevents downgrade.** dbx and rollback indices. Wrong-answer pattern: claiming Secure Boot alone prevents firmware downgrade — base Secure Boot doesn't unless anti-rollback is enforced.
- **Remote attestation is required for Measured Boot to have value.** Without it, PCR values aren't checked. Wrong-answer pattern: claiming Measured Boot detects tampering on its own — detection requires comparison against expected values somewhere.

### Values without a direct public citation

| Cell | Value | Why unsourced |
|---|---|---|
| Trusted Boot × all cells | — | "Trusted Boot" is the industry term for Secure+Measured combination, used in Microsoft and TCG documentation but without a single canonical primary specification. Cell values reflect industry-standard combination framing. |
| Verified Boot × all cells | — | Android Verified Boot specifications [s3] cover the mechanism on Android; iOS secure-boot is documented in Apple Platform Security Guide. Cell values reflect cross-platform synthesis rather than single-source quotation. |

## Engine demo opportunities

- `Secure Boot | enforcement model → ?` → `Block load of unsigned bootloader and kernel components`
- `Measured Boot | enforcement model → ?` → `Record hash of each boot stage to TPM Platform Configuration Registers`
- `? | enforcement model → Block load of unsigned bootloader and kernel components` → `Secure Boot`
- `? | what it detects → Any change to boot chain after baseline measurement` → `Measured Boot`
- `? | trust dependency → TPM with PCR storage` → `Measured Boot`
- `? | trust dependency → Platform Key plus Key Exchange Key in firmware` → `Secure Boot`
- `Trusted Boot | enforcement model → ?` → `Combine Secure Boot enforcement with Measured Boot recording`
- `Verified Boot | trust dependency → ?` → `Hardware-fused root of trust on device`
- Composite Secure Boot Row with `enforcement model` swapped to `Record hash of each boot stage to TPM Platform Configuration Registers` (Measured Boot's value) — directly tests the enforcement-vs-recording distinction
- Composite Measured Boot Row with `trust dependency` swapped to `Platform Key plus Key Exchange Key in firmware` (Secure Boot's value) — tests the dependency distinction (Measured needs TPM; Secure needs UEFI keys)
- Composite Verified Boot Row with `what it detects` swapped to `Unauthorized boot components`, `Unsigned bootkits` — tests Verified Boot scope (it's mobile-platform-specific tampering, not just signed-component check)

## Sources

- `[s1]`: UEFI Forum, "Unified Extensible Firmware Interface (UEFI) Specification" — Secure Boot signature verification and key hierarchy (retrieved 2026-04-30, https://uefi.org/specifications). NIST SP 800-147B, "BIOS Protection Guidelines for Servers" — Secure Boot guidance for enterprise platforms (August 2014, retrieved 2026-04-30, https://csrc.nist.gov/publications/detail/sp/800-147/b/final)
- `[s2]`: NIST SP 800-155, "BIOS Integrity Measurement Guidelines" (Draft) — Measured Boot and TPM PCR usage (December 2011, retrieved 2026-04-30, https://csrc.nist.gov/publications/detail/sp/800-155/draft). Trusted Computing Group, "TPM 2.0 Library Specification" — PCR semantics and Quote operation (retrieved 2026-04-30, https://trustedcomputinggroup.org/resource/tpm-library-specification/)
- `[s3]`: Android Open Source Project, "Verified Boot" (AVB 2.0) — mobile verified-boot reference implementation (retrieved 2026-04-30, https://source.android.com/docs/security/features/verifiedboot). Apple, "Platform Security Guide" — iOS secure-boot chain (retrieved 2026-04-30, https://support.apple.com/guide/security/welcome/web)
- `[s4]`: (ISC)² CISSP Certification Exam Outline, effective 2024-04-15, Domain 3 §3.3 *Implement system security through the application of security capabilities* and §3.4 *Understand security capabilities of information systems* (retrieved 2026-04-30, https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline)
