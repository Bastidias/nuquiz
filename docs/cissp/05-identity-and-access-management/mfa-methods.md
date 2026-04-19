# MFA Methods

**Domain:** 5 — Identity and Access Management &nbsp;|&nbsp; **Pattern:** Dimensions &nbsp;|&nbsp; **Tags:** 5.2, 5.6
**Status:** draft (SME review pending)

The six second-factor authentication methods CISSP candidates are expected to discriminate. All six sit in the Possession factor category — the discriminating axes are (1) form factor, (2) whether the method is *phishing-resistant* (a cryptographic binding to origin prevents look-alike-domain credential capture), and (3) the characteristic weakness of each method. The phishing-resistance column is the single most important modern discriminator: FIDO2 and smart cards are phishing-resistant; TOTP, HOTP, SMS, and push are not.

| Method | form factor | standard | phishing-resistant | key weakness | security strength |
|---|---|---|---|---|---|
| TOTP | Software app | RFC 6238 [s2] | No | Phishable<br>Shared secret at setup | Medium |
| HOTP | Hardware counter device | RFC 4226 [s3] | No | Phishable<br>Counter desync | Medium |
| SMS OTP | Phone SMS | None | No | SIM swapping<br>SMS interception | Low |
| Push notification | Mobile app | Vendor-specific | No | MFA fatigue<br>Phishable | Medium |
| FIDO2 security key | Hardware key | FIDO2<br>WebAuthn [s4] | Yes [s4] | Loss<br>Cost | High |
| Smart card | Physical card | FIPS 201 | Yes | Reader required<br>Loss | High |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. **No parentheticals in cells.** Standards are listed by their canonical identifier (`RFC 6238`, `FIPS 201`, `FIDO2 / WebAuthn`).
- **All six methods are Possession-factor.** The discriminator between these methods is not which factor *category* they belong to but *how strong* they are within the Possession category. CISSP testing still sometimes asks "which factor category is TOTP" — the answer is always Possession, regardless of whether the TOTP app is on a phone or a dedicated token.
- **Phishing-resistance is the single most important modern axis.** TOTP, HOTP, SMS, and push can all be *relayed* in real time by an attacker running a reverse proxy between the user and the legitimate site (Evilginx is the canonical tool). FIDO2/WebAuthn and smart cards defeat this because the cryptographic challenge-response is bound to the *origin* the browser is visiting — a look-alike domain produces a different origin and the authenticator refuses to sign. NIST SP 800-63B AAL3 specifically requires phishing-resistant authenticators.
- **TOTP vs HOTP.** TOTP (RFC 6238 [s2]) uses the current time as the moving factor. HOTP (RFC 4226 [s3]) uses a counter incremented on each use. TOTP is dominant in software authenticators (Google Authenticator, Authy, Microsoft Authenticator); HOTP is more common in legacy hardware tokens. Both share the underlying HMAC-SHA1 construction; TOTP is essentially HOTP with the counter replaced by a time window. Neither is phishing-resistant because both are 6-digit codes typed into a form that could be a phishing site.
- **SMS OTP is the weakest practical MFA.** SIM swapping (socially engineering the mobile carrier into porting the victim's number to the attacker's SIM) and SS7 signaling attacks on the cellular network both compromise SMS OTP without touching the victim's device. NIST SP 800-63B explicitly *restricts* SMS as an out-of-band authenticator. It is still widely deployed because the rollout friction is near-zero, but CISSP increasingly asks candidates to recognize it as insufficient.
- **Push fatigue is a real attack.** Attackers trigger repeated push notifications to a victim until the victim taps "Approve" to stop the pings. This is the 2022 Uber breach pattern. Mitigations include number-matching (user must type a digit shown on the login page into the push app — a downgrade toward OTP-style verification) and, more effectively, migration to phishing-resistant authenticators.
- **FIDO2 / WebAuthn.** FIDO2 is the umbrella for two specifications: WebAuthn (W3C browser API [s4]) and CTAP (Client to Authenticator Protocol, between browser and security key). Together they enable public-key authentication bound to the origin. Passkeys are FIDO2 credentials synced across devices via a cloud service; the protocol is the same.
- **Smart cards and PIV/CAC.** FIPS 201 defines the PIV (Personal Identity Verification) card used across US federal government. DoD's CAC (Common Access Card) is built on the same FIPS 201 baseline. Smart cards authenticate via TLS client certificates or PKI — phishing-resistant by the same origin-binding logic as FIDO2.
- **Out of scope for this Concept:** specific TOTP parameters (RFC 6238 recommends 30-second windows, 6-digit codes, HMAC-SHA1), authenticator-assurance levels (AAL1/2/3 in NIST SP 800-63B), the WebAuthn ceremony itself (registration vs authentication flow — could be a separate Ordered Concept), attestation formats, passkey-vs-security-key distinctions, mobile device management and enrollment.

### Values without a direct public citation

| Cell | Value | Why unsourced |
|---|---|---|
| All rows × security strength | `Low` / `Medium` / `High` | Qualitative rating drawn from NIST SP 800-63B assurance-level guidance and industry consensus. Not a quantitative metric from a single source. |
| All rows × key weakness | — | Attack classes (SIM swapping, MFA fatigue, phishing, counter desync) are widely documented individually; no single canonical per-method weakness list located in this research pass. |
| Smart card × standard | `FIPS 201` | FIPS 201 is the PIV standard; CAC and commercial smart cards may follow variants. Cited at the category level rather than per implementation. |
| Push notification × standard | `Vendor-specific` | No RFC or widely-adopted standard for push-based MFA; each vendor (Duo, Okta Verify, Microsoft Authenticator, Google) implements its own protocol. |

## Engine demo opportunities

- `FIDO2 security key | phishing-resistant → ?` → `Yes`
- `SMS OTP | phishing-resistant → ?` → `No`
- `? | phishing-resistant → Yes` → `FIDO2 security key`, `Smart card` — shared-Value select-all
- `? | phishing-resistant → No` → `TOTP`, `HOTP`, `SMS OTP`, `Push notification` — shared-Value select-all
- `? | security strength → High` → `FIDO2 security key`, `Smart card` — shared-Value select-all
- `TOTP | standard → ?` → `RFC 6238`
- `HOTP | standard → ?` → `RFC 4226`
- `FIDO2 security key | standard → ?` → `FIDO2`, `WebAuthn`
- `? | key weakness → SIM swapping` → `SMS OTP`
- `? | key weakness → MFA fatigue` → `Push notification`
- Composite TOTP Row with `phishing-resistant` swapped to `Yes` — directly tests the non-resistant-to-resistant distinction (TOTP is *not* phishing-resistant; OTP codes can be relayed in real time)
- Composite SMS OTP Row with `security strength` swapped to `High` — tests the canonical SMS-is-weak framing
- Composite FIDO2 security key Row with `standard` swapped to `RFC 6238` — tests the standard pairing (FIDO2 is not an RFC at the WebAuthn level; it is a W3C and FIDO Alliance specification)

## Sources

- `[s1]`: NIST SP 800-63B, "Digital Identity Guidelines: Authentication and Lifecycle Management" — general MFA reference (June 2017, retrieved 2026-04-19, https://pages.nist.gov/800-63-3/sp800-63b.html)
- `[s2]`: RFC 6238, "TOTP: Time-Based One-Time Password Algorithm" (May 2011, retrieved 2026-04-19, https://datatracker.ietf.org/doc/html/rfc6238)
- `[s3]`: RFC 4226, "HOTP: An HMAC-Based One-Time Password Algorithm" (December 2005, retrieved 2026-04-19, https://datatracker.ietf.org/doc/html/rfc4226)
- `[s4]`: W3C Web Authentication (WebAuthn) Level 2 and FIDO Alliance FIDO2 specifications (retrieved 2026-04-19, https://www.w3.org/TR/webauthn-2/ and https://fidoalliance.org/fido2/)
- `[s5]`: NIST FIPS 201-3, "Personal Identity Verification (PIV) of Federal Employees and Contractors" — smart card reference (January 2022, retrieved 2026-04-19, https://csrc.nist.gov/publications/detail/fips/201/3/final)
