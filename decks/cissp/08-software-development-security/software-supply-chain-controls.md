# Software Supply Chain Controls

**Domain:** 8 — Software Development Security &nbsp;|&nbsp; **Pattern:** Dimensions &nbsp;|&nbsp; **Tags:** 8.4
**Status:** draft (SME review pending)

The five supply-chain control families CISSP candidates should distinguish. Paired Concept to `software-supply-chain-risks` — this is the mitigation side of the same axis. Two controls operate at the inventory layer (SBOM, SCA scanning); two at the integrity layer (Dependency pinning, Signed releases); one at the governance layer (Vendor risk assessment). Testing focuses on which control family addresses which risk class.

| Control | what it provides | typical tooling |
|---|---|---|
| SBOM | Machine-readable inventory of software components [s2] | SPDX<br>CycloneDX [s2] |
| SCA scanning | Vulnerability matching against component inventory | Snyk<br>Dependabot<br>Trivy<br>OWASP Dependency-Check |
| Dependency pinning | Locked dependency versions reproducible across builds | package-lock.json<br>go.sum<br>requirements.txt with hashes |
| Signed releases | Cryptographic attestation of artifact origin and integrity [s3] | Sigstore<br>cosign<br>GPG signatures |
| Vendor risk assessment | Documented evaluation of supplier security posture | SIG questionnaires<br>SOC 2 review<br>CAIQ |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. **No parentheticals in cells.** Tool names and standard names are atomic identifiers.
- **SBOM = Software Bill of Materials.** A machine-readable list of every software component included in a build, with version numbers, licenses, and supplier information. NTIA's SBOM Minimum Elements [s2] specifies the required fields. SPDX (ISO/IEC 5962) and CycloneDX are the two dominant SBOM formats; SWID Tags is a third (NIST IR 8060) but less common in practice.
- **SCA scanning consumes the SBOM.** SBOM is the inventory; SCA scanning is the operation that compares the inventory against vulnerability databases (NVD, GHSA, vendor advisories). Without an SBOM, SCA must derive its own inventory from build manifests; with an SBOM, the inventory is authoritative. Many SCA tools generate an SBOM as a side effect.
- **Dependency pinning vs lock files.** "Pinning" means specifying exact versions (`package@1.2.3`) rather than ranges (`package@^1.2`). Lock files (package-lock.json, go.sum, requirements.txt with hashes, Cargo.lock) extend pinning to the full transitive dependency tree, including content hashes that verify the resolved package has not been swapped for a different copy.
- **Signed releases provide integrity, not absolute trust.** A signature proves that the named signer produced the artifact; it does not prove the signer is trustworthy. Sigstore and cosign reduce the friction of signing by tying signatures to OIDC identities (e.g., GitHub Actions workflow identity). SLSA Levels 2-3 build on signed releases to produce verifiable provenance about *how* the artifact was built.
- **Vendor risk assessment is a process, not a tool.** The "typical tooling" column lists assessment frameworks (SIG = Standardized Information Gathering questionnaire by Shared Assessments; CAIQ = Consensus Assessments Initiative Questionnaire by CSA) plus SOC 2 review (covered in `soc-report-types` in D6). The control is a documented evaluation outcome; the questionnaires standardize the inputs.
- **EO 14028 drove SBOM mandate.** Executive Order 14028 (May 2021) required federal software vendors to provide SBOMs and accelerated SLSA / sigstore adoption. NIST SSDF [s1] was strengthened in response. Cited at the framework level rather than per-cell.
- **Out of scope for this Concept:** specific NTIA SBOM Minimum Elements (could be its own sub-Concept), SLSA levels 1-4 detail (could be its own sub-Concept), in-toto attestation framework, package-manager-specific lock-file mechanics, vendor-onboarding workflows, contractual security requirements (DPAs, security addenda).

### Tricky distractors

- **SBOM is inventory; SCA is matching.** Different functions. Wrong-answer pattern: claiming SBOM detects vulnerabilities — SBOM lists components; SCA matches against CVEs.
- **Pinning ≠ Signing.** Pinning fixes versions; signing proves identity. Wrong-answer pattern: collapsing them — they address different supply-chain risks.
- **Signature proves origin, not trustworthiness.** Signed by attacker = signed code, not safe. Wrong-answer pattern: claiming signed artifacts are inherently safe — verification of signer identity is required.
- **SBOM formats: SPDX, CycloneDX.** Both machine-readable. Wrong-answer pattern: confusing them with SCA tools (Snyk, Dependabot) — formats vs scanners.
- **EO 14028 mandates SBOM for federal vendors.** Not voluntary. Wrong-answer pattern: claiming SBOM is best practice but unrequired — federal mandate exists.
- **Vendor risk assessment is governance, not technical.** SIG, CAIQ, SOC 2 review. Wrong-answer pattern: classifying vendor risk assessment as a tool category — it's a process producing evidence.

### Values without a direct public citation

| Cell | Value | Why unsourced |
|---|---|---|
| SCA scanning × all cells | — | NIST SSDF [s1] addresses SCA conceptually but does not enumerate canonical tooling; cell values reflect industry-standard tool set. |
| Dependency pinning × all cells | — | Universally-adopted practice across language ecosystems; specific lock-file names are language-ecosystem standards rather than from a single security source. |
| Vendor risk assessment × all cells | — | Industry-convention framing; CSA CAIQ and Shared Assessments SIG are real frameworks but not cited primary-source here. |

## Engine demo opportunities

- `SBOM | typical tooling → ?` → `SPDX`, `CycloneDX`
- `Signed releases | typical tooling → ?` → `Sigstore`, `cosign`, `GPG signatures`
- `? | typical tooling → SPDX` → `SBOM`
- `? | typical tooling → cosign` → `Signed releases`
- `? | what it provides → Vulnerability matching against component inventory` → `SCA scanning`
- `Dependency pinning | what it provides → ?` → `Locked dependency versions reproducible across builds`
- Composite SBOM Row with `what it provides` swapped to `Cryptographic attestation of artifact origin and integrity` — directly tests the SBOM/signing distinction (SBOM is inventory; signing is integrity)
- Composite SCA scanning Row with `typical tooling` swapped to `SPDX`, `CycloneDX` — tests the inventory-vs-scanning distinction (SPDX/CycloneDX are SBOM formats, not SCA scanners)
- Composite Vendor risk assessment Row with `typical tooling` swapped to `Sigstore`, `cosign` — tests the governance-vs-integrity layer split

## Sources

- `[s1]`: NIST SP 800-218, "Secure Software Development Framework (SSDF) Version 1.1" — Practice PW.4 (Reuse Existing, Well-Secured Software) and PS.3 (Archive and Protect Each Software Release) (February 2022, retrieved 2026-04-25, https://csrc.nist.gov/publications/detail/sp/800-218/final)
- `[s2]`: NTIA, "The Minimum Elements For a Software Bill of Materials (SBOM)" — federal SBOM specification (July 2021, retrieved 2026-04-25, https://www.ntia.gov/files/ntia/publications/sbom_minimum_elements_report.pdf)
- `[s3]`: SLSA (Supply-chain Levels for Software Artifacts) Framework — provenance, build integrity, and signed releases (retrieved 2026-04-25, https://slsa.dev/)
- `[s4]`: Executive Order 14028, "Improving the Nation's Cybersecurity" — federal SBOM and supply-chain mandate (May 2021, retrieved 2026-04-25, https://www.whitehouse.gov/briefing-room/presidential-actions/2021/05/12/executive-order-on-improving-the-nations-cybersecurity/)
