# Software Supply Chain Risks

**Domain:** 8 — Software Development Security &nbsp;|&nbsp; **Pattern:** Dimensions &nbsp;|&nbsp; **Tags:** 8.4
**Status:** draft (SME review pending)

The five software-supply-chain attack classes CISSP candidates should distinguish. Each row pairs an attack mechanism with a representative real-world example and the canonical mitigation family. Cross-Concept link: `software-supply-chain-controls` covers the mitigation layer in detail. CISSP testing focuses on the mechanism-to-mitigation pairing — for example, "what defends against typosquatting" expects an answer like internal registry mirroring or strict package allowlists.

| Risk | mechanism | real-world example | mitigation |
|---|---|---|---|
| Compromised dependency | Legitimate package release pipeline or maintainer account compromised | SolarWinds Orion 2020 [s2] | SBOM<br>Dependency pinning<br>Signed releases |
| Malicious package | Attacker publishes package with embedded malicious code | event-stream npm hijack 2018 | SCA scanning<br>Dependency review<br>Trusted registries |
| Typosquatting | Package name similar to popular legitimate package | PyPI typosquats of requests library | Strict package-name allowlists<br>Internal registry mirroring |
| Backdoored binary | Malicious code injected into compiled binary or installer | XZ Utils backdoor 2024 | Reproducible builds<br>Binary signing<br>Provenance attestations [s3] |
| Vendor breach | Upstream vendor systems compromised affecting their products | Kaseya VSA 2021<br>3CX 2023 | Vendor risk assessment<br>Tiered trust model |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. **No parentheticals in cells.** Year suffixes on incident names are part of the canonical incident identifier.
- **MITRE ATT&CK Supply Chain Compromise.** Technique T1195 [s4] groups compromised dependency, malicious package, and backdoored binary under a single ATT&CK identifier with three sub-techniques (T1195.001 Software Dependencies and Development Tools, T1195.002 Software Supply Chain, T1195.003 Hardware Supply Chain). The five-row split in this Concept reflects CISSP's pedagogical taxonomy rather than the ATT&CK structure.
- **Compromised dependency vs malicious package.** Compromised dependency assumes the package was *legitimate* before being subverted (maintainer account hijacked, build pipeline breached); malicious package assumes the package was *created with malicious intent*. Mitigations differ — dependency pinning helps with both, but signed releases catch maintainer-account compromise specifically while internal registry mirroring catches malicious-package introduction.
- **Typosquatting blends with malicious package.** Typosquatting is typically a *delivery vector* for malicious packages — the typosquat is malicious by definition. The Concept treats it as a separate risk because the mitigation (name-spelling controls, allowlists) is distinct from generic malicious-package defenses.
- **Backdoored binary covers Ken Thompson's "Reflections on Trusting Trust" scenario.** A binary you compile yourself can still be backdoored if the compiler is compromised. The XZ Utils 2024 incident is closer to this pattern than to a typical npm-package compromise — the malicious code was inserted into the upstream tarball during build by a long-term maintainer impersonator. Reproducible builds and provenance attestations (SLSA Level 3+) are the strongest defense.
- **Vendor breach is broader than software supply chain.** Includes managed-service compromises (Kaseya VSA, SolarWinds Orion update infrastructure), cloud-provider breaches, contractor breaches affecting client data, and SaaS-vendor compromises. The cell focuses on the software-supply-chain subset; broader vendor risk is covered in `supply-chain-risks` in D1.
- **Executive Order 14028 (May 2021).** US federal directive that drove SBOM adoption and the SLSA framework as supply-chain controls. Not cited primary-source per cell because the EO is policy framing rather than per-risk technical guidance; SBOM and SLSA are referenced via [s3].
- **Out of scope for this Concept:** hardware supply chain attacks (counterfeit chips, implants — covered in `supply-chain-risks` in D1), open-source license risks (separate Concept — `open-source-license-types`), CI/CD pipeline integrity attacks (covered in `repository-security-controls` and `ci-cd-pipeline-stages`), insider-threat attacks against trusted maintainers, social engineering of code reviewers.

### Values without a direct public citation

| Cell | Value | Why unsourced |
|---|---|---|
| All rows × mechanism | Mechanism descriptions | Industry framing; NIST SSDF [s1] addresses supply-chain risks broadly without enumerating these specific mechanism descriptions. |
| Malicious package × real-world example | `event-stream npm hijack 2018` | Widely-documented incident; not cited primary-source via the original disclosure or post-mortem in this research pass. |
| Typosquatting × real-world example | `PyPI typosquats of requests library` | Recurring pattern documented in PyPI security advisories; specific incident not cited. |
| Vendor breach × real-world example | `Kaseya VSA 2021`, `3CX 2023` | Major incidents with public reporting; CISA advisories exist but not cited per-cell here. |

## Engine demo opportunities

- `Compromised dependency | real-world example → ?` → `SolarWinds Orion 2020`
- `Backdoored binary | real-world example → ?` → `XZ Utils backdoor 2024`
- `? | mitigation → SBOM` → `Compromised dependency` (sub-Fact in multi-Fact cell)
- `? | mitigation → Reproducible builds` → `Backdoored binary` (sub-Fact in multi-Fact cell)
- `? | real-world example → SolarWinds Orion 2020` → `Compromised dependency`
- `Typosquatting | mitigation → ?` → `Strict package-name allowlists`, `Internal registry mirroring`
- Composite Compromised dependency Row with `mitigation` swapped to `Strict package-name allowlists` — directly tests the risk-to-mitigation pairing (allowlists defend against typosquatting; SBOM and pinning defend against dependency compromise)
- Composite Vendor breach Row with `real-world example` swapped to `XZ Utils backdoor 2024` — tests the incident-to-class assignment (XZ is a backdoored binary, not a vendor breach)
- Composite Typosquatting Row with `mechanism` swapped to `Upstream vendor systems compromised affecting their products` — tests the mechanism distinction (typosquatting is a name-similarity attack, not a vendor breach)

## Sources

- `[s1]`: NIST SP 800-218, "Secure Software Development Framework (SSDF) Version 1.1" — supply-chain practices in PS.3 (Archive and Protect Each Software Release) and PW.4 (Reuse Existing, Well-Secured Software) (February 2022, retrieved 2026-04-25, https://csrc.nist.gov/publications/detail/sp/800-218/final)
- `[s2]`: CISA, "SolarWinds Orion Code Compromise" advisory and post-incident guidance (retrieved 2026-04-25, https://www.cisa.gov/news-events/news/solarwinds-orion-code-compromise)
- `[s3]`: SLSA (Supply-chain Levels for Software Artifacts) Framework — provenance and build integrity requirements (retrieved 2026-04-25, https://slsa.dev/)
- `[s4]`: MITRE ATT&CK, Technique T1195 "Supply Chain Compromise" — three sub-techniques (retrieved 2026-04-25, https://attack.mitre.org/techniques/T1195/)
