# Side-Channel Attack Types

**Domain:** 3 — Security Architecture and Engineering &nbsp;|&nbsp; **Pattern:** Dimensions &nbsp;|&nbsp; **Tags:** 3.7
**Status:** draft (SME review pending)

The six side-channel attack categories CISSP candidates are expected to discriminate. Each exploits a different physical signal that a cryptographic implementation accidentally reveals — timing variation, power consumption, electromagnetic emission, acoustic emission, fault injection response, or microarchitectural cache state. Side channels attack the *implementation*, not the algorithm — a perfectly secure algorithm can be broken if its implementation leaks signals.

| Type | physical signal exploited | target | mitigation |
|---|---|---|---|
| Timing | Operation execution time variation | Software cryptographic implementations | Constant-time implementations |
| Power | Power consumption variation | Smart cards<br>HSMs<br>Embedded crypto | Power-line filtering<br>Masked implementations |
| EM | Electromagnetic emanations | Smart cards<br>HSMs<br>RF-emitting devices | Shielding (Faraday cage)<br>Tempest-rated equipment |
| Acoustic | CPU coil-whine and acoustic emanations | Servers and laptops within audio range | Acoustic isolation<br>Background noise |
| Fault injection | Glitched voltage / clock / temperature inducing computation errors | Smart cards<br>Embedded systems | Glitch detection sensors<br>Redundant computation |
| Cache | CPU cache state changes between processes | Co-tenant VMs<br>Shared-CPU environments | Cache partitioning<br>Constant-time implementations |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. **No parentheticals in cells.**
- **Side channel vs covert channel.** Sibling Concept `covert-channel-types` covers the distinction. Side channels are *unintentional* implementation leakage — the implementation accidentally reveals secret state through measurable side effects. Covert channels are *intentional* — a malicious sender deliberately modulates a shared resource to exfiltrate data.
- **Timing attacks — Kocher 1996.** Paul Kocher's original timing-attack paper showed that RSA, DSA, and Diffie-Hellman implementations leak key bits through computation-time variation. Modern implementations use *constant-time* code — the same number of CPU cycles regardless of secret data — to defeat timing channels. Sibling D8 Concepts cover the implementation-level mitigations.
- **Power analysis — DPA and SPA.** Simple Power Analysis (SPA) reads the power trace directly to identify cryptographic operations. Differential Power Analysis (DPA) statistically analyzes many traces to extract key bits. Effective against smart cards (where power is measurable on the contact pads) and HSMs (where power is measurable on the supply rails). Mitigation: constant-power implementations, masked computations, power-line decoupling.
- **EM analysis — TEMPEST is the historical name.** US TEMPEST program (1950s onward) studied EM emanations from communications and computing equipment. Van Eck phreaking (1985) demonstrated reading CRT monitor contents from radiated EM. Modern EM attacks target smart cards and HSMs at close range. Mitigation: shielded enclosures (Faraday cages), TEMPEST-rated equipment with EM-leakage limits, distance.
- **Acoustic attacks.** Genkin, Shamir, Tromer (2014) demonstrated extracting RSA keys from a target laptop by recording the high-frequency acoustic emanations of CPU coil-whine during decryption. Required a sensitive microphone within meters. More a curiosity than a major threat for most environments but illustrates the principle.
- **Fault injection — voltage glitching, clock manipulation, temperature.** Forcing a target system to misbehave (skip an instruction, flip a bit) by applying transient voltage drops, clock spikes, or temperature swings. Smart cards are common targets — fault injection during signature operations can leak key bits. Mitigation: glitch detection sensors that abort operations on detected glitches; redundant computation that detects mismatches.
- **Cache side channels — Spectre / Meltdown / Foreshadow lineage.** Modern cache-based attacks (Flush+Reload, Prime+Probe, Spectre v1/v2, Meltdown, Foreshadow, MDS) exploit microarchitectural state in CPU caches that persists between processes or VMs. Even with no shared memory, two processes on the same CPU can communicate or leak data via cache-state observation. The most operationally impactful side-channel class because it affects every modern CPU.
- **Out of scope for this Concept:** specific Spectre / Meltdown variants (worth their own Concept), Rowhammer (DRAM-based, related but distinct), photonic side channels, ML-based side-channel analysis, side-channel attacks on post-quantum algorithms.

### Values without a direct public citation

| Cell | Notes |
|---|---|
| All rows × mitigation | Phrasings | Industry-typical countermeasure descriptions; specific implementations vary by attack and target. |
| Acoustic × all cells | — | Genkin-Shamir-Tromer 2014 paper covers acoustic key extraction; cell values reflect that research at a high level. |

## Engine demo opportunities

- `Timing | physical signal exploited → ?` → `Operation execution time variation`
- `Power | physical signal exploited → ?` → `Power consumption variation`
- `Cache | physical signal exploited → ?` → `CPU cache state changes between processes`
- `? | physical signal exploited → Electromagnetic emanations` → `EM`
- `? | mitigation → Constant-time implementations` → `Timing`, `Cache` — shared-Value select-all
- `? | target → Smart cards` → `Power`, `EM`, `Fault injection` (sub-Fact in multi-Fact cells)
- Composite Timing Row with `physical signal exploited` swapped to `Power consumption variation` — directly tests the timing-vs-power distinction
- Composite Cache Row with `mitigation` swapped to `Shielding (Faraday cage)` — tests cache-vs-EM mitigation pairing
- Composite Acoustic Row with `target` swapped to `Co-tenant VMs` — tests acoustic-vs-cache target distinction (acoustic targets physically nearby devices; cache attacks target shared-CPU tenants)

## Sources

- `[s1]`: Paul C. Kocher, "Timing Attacks on Implementations of Diffie-Hellman, RSA, DSS, and Other Systems," CRYPTO 1996 — original timing-attack paper (retrieved 2026-04-26, https://www.rambus.com/cryptography/timing-attack/)
- `[s2]`: Paul Kocher, Joshua Jaffe, Benjamin Jun, "Differential Power Analysis," CRYPTO 1999 — original DPA paper (retrieved 2026-04-26, https://www.paulkocher.com/doc/DifferentialPowerAnalysis.pdf)
- `[s3]`: NIST SP 800-90B, "Recommendation for the Entropy Sources Used for Random Bit Generation" — references side-channel concerns in entropy sources (January 2018, retrieved 2026-04-26, https://csrc.nist.gov/publications/detail/sp/800-90b/final)
- `[s4]`: Spectre and Meltdown disclosure papers (January 2018) — microarchitectural side channels in modern CPUs (retrieved 2026-04-26, https://meltdownattack.com/)
