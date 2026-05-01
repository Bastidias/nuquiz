# Authentication Factors

**Domain:** 5 — Identity and Access Management &nbsp;|&nbsp; **Pattern:** Dimensions &nbsp;|&nbsp; **Tags:** 5.2
**Status:** draft (SME review pending)

The five authentication-factor categories CISSP expects candidates to discriminate. The three classical factors (Knowledge / Possession / Inherence) underpin every "multi-factor authentication" definition; the two modern additions (Behavior, Location) are widely taught and increasingly tested. Multi-factor authentication is defined as combining factors from *different categories* — two passwords is still single-factor; a password plus a hardware token is two-factor. Note that NIST SP 800-63B [s1] frames authentication around *authenticator types* (memorized secret, cryptographic device, biometric) rather than the CISSP-pedagogical *factor categories*; the categories here are the exam framing.

| Factor | common phrase | example | strengths | typical attacks |
|---|---|---|---|---|
| Knowledge | Something you know | Password<br>PIN<br>Passphrase [s1] | Easy to deploy<br>No hardware required | Brute force<br>Phishing<br>Keylogging<br>Shoulder surfing |
| Possession | Something you have | Hardware token<br>Smart card<br>Mobile device [s1] | Hard to clone | Theft<br>SIM swapping<br>Relay attack |
| Inherence | Something you are | Fingerprint<br>Iris<br>Face [s1] | Cannot be forgotten<br>Hard to transfer | Spoofing<br>Replay<br>Template theft |
| Behavior | Something you do | Keystroke dynamics<br>Mouse movement<br>Signature dynamics | Continuous authentication possible | Behavioral profiling<br>Replay |
| Location | Somewhere you are | GPS coordinates<br>IP geolocation<br>Network topology | Passive | GPS spoofing<br>VPN masking |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. **No parentheticals in cells.** The CISSP-pedagogical phrasing ("something you know") goes in the `common phrase` column; it is not a parenthetical on the Factor name.
- **NIST SP 800-63B framing vs CISSP framing.** [s1] defines nine *authenticator types* (memorized secret, look-up secret, out-of-band, single-factor OTP, multi-factor OTP, single-factor cryptographic software, single-factor cryptographic device, multi-factor cryptographic software, multi-factor cryptographic device). These map across the CISSP factor categories — a FIDO2 security key is a multi-factor cryptographic *device* in NIST terms but a Possession factor in CISSP terms. CISSP testing uses the factor-category framing; NIST uses the authenticator-type framing. Both are correct; they're orthogonal vocabularies.
- **Biometrics are not authenticators by themselves in NIST SP 800-63B.** [s1] states biometrics "must always be strongly bound to a physical authenticator and are considered an activation factor for that authenticator." CISSP accepts Inherence as a standalone factor category, which is a notable divergence from NIST's stricter position.
- **MFA = multiple *categories*, not multiple instances.** Two passwords is single-factor because both are Knowledge. A password + a hardware token is two-factor (Knowledge + Possession). A password + a PIN on a hardware token (where PIN unlocks the token) is still two-factor, with the PIN acting as the activation-factor for the device per NIST's framing.
- **Behavior vs Inherence.** Inherence is a *static* physiological trait (fingerprint ridge pattern). Behavior is a *dynamic* pattern of how the user performs an action (typing rhythm, mouse micromovements). CISSP study material sometimes collapses them under "something you are," but the exam increasingly distinguishes them, particularly around continuous-authentication contexts.
- **Location as a factor is contested.** Location is informational and trivially spoofed (GPS spoofing, VPN, proxy). Whether it qualifies as an *authentication* factor or only as *risk signal* for adaptive authentication is debated. CISSP includes it as a fifth factor; many security practitioners treat it as a sub-signal of a broader adaptive/continuous authentication policy.
- **Out of scope for this Concept:** specific biometric modalities and error rates (separate Concepts — `biometric-modalities`, `biometric-error-types`), AAL1 / AAL2 / AAL3 NIST assurance levels, FIDO2 / WebAuthn protocol details, password-policy specifics (rotation, complexity, length), passwordless authentication flows.

### Tricky distractors

- **MFA requires multiple categories, not multiple instances.** Two passwords = still single-factor. Wrong-answer pattern: claiming password + PIN is two-factor — both are Knowledge.
- **Smart card + PIN = two-factor.** Card (have) + PIN (know). Wrong-answer pattern: classifying smart card as single-factor — the PIN activation requirement adds Knowledge.
- **Biometric replay is a real attack.** Captured fingerprint or face image can be replayed. Liveness detection mitigates. Wrong-answer pattern: claiming biometrics defeat replay — they don't without liveness checks.
- **Behavior is dynamic; Inherence is static.** Typing rhythm vs fingerprint pattern. Wrong-answer pattern: lumping them — exam may distinguish for continuous authentication.
- **Location is contested as a factor.** Trivially spoofed via GPS spoof or VPN. Wrong-answer pattern: treating location as authentication-grade — many practitioners treat it as adaptive risk signal only.
- **NIST treats biometrics as activation factors only.** SP 800-63B says biometrics must bind to a physical authenticator. Wrong-answer pattern: applying NIST treatment when CISSP question uses CISSP factor framing — both are correct in their context.

### Values without a direct public citation

Most cell values in this table are drawn from standard CISSP pedagogical framing rather than NIST SP 800-63B [s1], which organizes authentication differently (by authenticator type, not factor category). The `example` column maps cleanly to [s1] authenticator types for Knowledge/Possession/Inherence; the `strengths` and `typical attacks` columns reflect CISSP pedagogical consensus.

| Column | Factors affected | Notes |
|---|---|---|
| common phrase | All five | "Something you know / have / are / do / know where" is universal CISSP teaching but not NIST terminology. |
| strengths | All five | Widely-taught CISSP framings; no single canonical public source located. |
| typical attacks | All five | Attack names are canonical (SIM swapping, template theft, relay attack, GPS spoofing) but this Concept does not trace each to its primary citation. A separate `password-attacks` Concept will source the Knowledge-factor attacks; dedicated biometric-attack and hardware-token-attack Concepts could do the same for the other factor columns. |
| Behavior × all cells | — | Behavior-as-factor is a CISSP extension to the classical three-factor model. No NIST 800-63B endorsement located for Behavior as a standalone factor category. |
| Location × all cells | — | Location-as-factor is a CISSP extension and remains contested in the wider literature. |

## Engine demo opportunities

- `Knowledge | common phrase → ?` → `Something you know`
- `Inherence | common phrase → ?` → `Something you are`
- `? | example → Password` → `Knowledge`
- `? | example → Fingerprint` → `Inherence`
- `? | typical attacks → Phishing` → `Knowledge`
- `? | typical attacks → Replay` → `Inherence`, `Behavior` — shared-Fact across two multi-Fact cells
- `Possession | typical attacks → ?` → `Theft`, `SIM swapping`, `Relay attack`
- Composite Knowledge Row with `example` swapped to `Fingerprint` — directly tests the factor/example pairing (fingerprint is Inherence, not Knowledge)
- Composite Possession Row with `typical attacks` swapped to include `Phishing` — tests that Phishing is primarily a Knowledge-factor attack (it attacks the credential, not the device)
- Cross-Concept opportunity: `? | common phrase → Something you know` → `Knowledge`; then `? | example → PIN` — tests that PIN is a Knowledge factor even when used to unlock a Possession factor (Activation Factor framing from Notes above)

## Sources

- `[s1]`: NIST SP 800-63B, "Digital Identity Guidelines: Authentication and Lifecycle Management" (June 2017, retrieved 2026-04-19, https://pages.nist.gov/800-63-3/sp800-63b.html)
- `[s2]`: NIST SP 800-63B-4 (draft/revision), "Digital Identity Guidelines: Authentication and Authenticator Management" — current revision of [s1] (retrieved 2026-04-19, https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-63B-4.pdf)
