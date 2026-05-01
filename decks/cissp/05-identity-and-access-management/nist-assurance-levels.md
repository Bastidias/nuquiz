# NIST 800-63 Assurance Levels

**Domain:** 5 — Identity and Access Management &nbsp;|&nbsp; **Pattern:** Dimensions &nbsp;|&nbsp; **Tags:** 5.2, 5.6
**Status:** draft (SME review pending)

The three assurance-level scales NIST SP 800-63 [s1] defines for digital identity. IAL (Identity Assurance Level) measures *how confidently the identity-proofing process establishes that an applicant is who they claim to be*. AAL (Authenticator Assurance Level) measures *how confidently the authentication event proves the claimant possesses an authenticator bound to that identity*. FAL (Federation Assurance Level) measures *how confidently a federation assertion can be trusted*. CISSP testing focuses on the three-level structure within each scale and on the matchup between use case and required level.

| Scale | what it measures | level 1 | level 2 | level 3 |
|---|---|---|---|---|
| IAL | Identity-proofing rigor [s1] | Self-asserted identity [s1] | Remote or in-person evidence with verification [s1] | In-person presentation with verified evidence [s1] |
| AAL | Authentication strength [s2] | Single-factor authentication [s2] | Multi-factor authentication with approved authenticators [s2] | MFA with hardware-based authenticator and verifier impersonation resistance [s2] |
| FAL | Federation assertion strength [s3] | Bearer assertion [s3] | Bearer assertion with strong audience restriction [s3] | Holder-of-key assertion bound to subscriber's cryptographic key [s3] |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. **No parentheticals in cells.**
- **Acronym expansions.** `IAL` = Identity Assurance Level. `AAL` = Authenticator Assurance Level. `FAL` = Federation Assurance Level. NIST SP 800-63 splits across three documents: 800-63A (enrollment/identity proofing), 800-63B (authentication and lifecycle), 800-63C (federation and assertions).
- **The three scales combine independently.** A high-stakes federal application might require IAL3 + AAL2 + FAL2 — strong identity proofing, strong but not hardware-bound authentication, and federation assertions with audience restriction. The combination is task-specific; high IAL does not automatically require high AAL or vice versa.
- **IAL covers identity proofing.** Did the registration process actually establish the claimant's real-world identity? IAL1 accepts self-assertion (no proofing). IAL2 requires evidence (driver's license, passport) with verification. IAL3 requires in-person presentation with verified evidence. Government high-trust workflows typically require IAL2 or IAL3.
- **AAL covers authentication strength.** When the user logs in, how strong is the authentication evidence? AAL1 accepts single-factor (password alone). AAL2 requires MFA with NIST-approved authenticators. AAL3 requires hardware-based authenticators with verifier impersonation resistance (FIDO2 security keys, smart cards). Phishing-resistant MFA is required at AAL3.
- **FAL covers federation assertion trust.** When the IdP sends a federation assertion to the SP, how strongly can the SP trust it? FAL1 accepts bearer assertions (whoever holds the assertion can use it). FAL2 adds audience-restriction protections. FAL3 requires *holder-of-key* assertions — the bearer must prove possession of a cryptographic key bound to the assertion. SAML and OIDC support all three FALs at the protocol level; deployments choose based on threat model.
- **NIST SP 800-63-4 is a substantial revision.** The current published version (800-63-3) was finalized 2017; SP 800-63-4 went through public draft cycles in 2023-2024 and is the future. SP 800-63-4 introduces "syncable authenticators" (passkeys) at AAL2 and modifies several IAL/AAL definitions. CISSP testing as of this Concept's authoring still uses the SP 800-63-3 framework.
- **Phishing-resistance is required at AAL3.** Any AAL3 authenticator must be phishing-resistant (FIDO2 / WebAuthn, smart cards). Sibling Concept `mfa-methods` covers the methods that qualify; only FIDO2 and smart cards are phishing-resistant per NIST framing.
- **Cross-Concept link.** Sibling Concepts: `authentication-factors` (the factor categories underlying AAL), `mfa-methods` (the specific authenticators per AAL), `federation-protocols` (the protocols supporting FAL).
- **Out of scope for this Concept:** specific identity-proofing evidence types per IAL, biometric thresholds at each AAL, FIDO2 attestation requirements, NIST SP 800-63-4 revisions.

### Tricky distractors

- **AAL vs IAL.** AAL is *authentication* (login event); IAL is *identity proofing* (registration / enrollment). Wrong-answer pattern: confusing AAL with IAL when a question describes initial-account-setup rigor (that's IAL).
- **AAL3 phishing-resistance.** Wrong-answer pattern: claiming TOTP qualifies for AAL3. TOTP is AAL2-eligible but not AAL3 because it is not phishing-resistant. Only FIDO2, smart cards, and equivalent hardware-bound MFA qualify at AAL3.
- **FAL bearer vs holder-of-key.** Bearer assertions are FAL1/FAL2; holder-of-key is FAL3. Wrong-answer pattern: claiming all SAML assertions are bearer (most are; FAL3 SAML uses subject-confirmation `holder-of-key` method, which is rare).
- **IAL1 self-asserted identity.** Wrong-answer pattern: claiming IAL1 still requires some proofing. IAL1 is *no* identity proofing — the user simply asserts who they are.

### Values without a direct public citation

| Cell | Notes |
|---|---|
| All cells | NIST SP 800-63A/B/C [s1, s2, s3] specify these levels; cell values are paraphrases of the level definitions rather than direct quotes. The framework descriptions are accurate; specific quoted text would require direct PDF reads of each NIST publication. |

## Engine demo opportunities

- `IAL | level 1 → ?` → `Self-asserted identity`
- `IAL | level 3 → ?` → `In-person presentation with verified evidence`
- `AAL | level 1 → ?` → `Single-factor authentication`
- `AAL | level 2 → ?` → `Multi-factor authentication with approved authenticators`
- `AAL | level 3 → ?` → `MFA with hardware-based authenticator and verifier impersonation resistance`
- `FAL | level 3 → ?` → `Holder-of-key assertion bound to subscriber's cryptographic key`
- `? | what it measures → Identity-proofing rigor` → `IAL`
- `? | what it measures → Authentication strength` → `AAL`
- `? | what it measures → Federation assertion strength` → `FAL`
- Composite IAL Row with `level 1` swapped to `Single-factor authentication` — directly tests the IAL-vs-AAL distinction (IAL is identity proofing; AAL is authentication strength)
- Composite AAL Row with `what it measures` swapped to `Identity-proofing rigor` — tests inverse of the above
- Composite FAL Row with `level 3` swapped to `Single-factor authentication` — tests FAL-vs-AAL distinction (FAL is about federation assertions; AAL is about authentication factors)

## Sources

- `[s1]`: NIST SP 800-63A, "Digital Identity Guidelines: Enrollment and Identity Proofing" — IAL definitions (June 2017, retrieved 2026-04-26, https://pages.nist.gov/800-63-3/sp800-63a.html)
- `[s2]`: NIST SP 800-63B, "Digital Identity Guidelines: Authentication and Lifecycle Management" — AAL definitions and authenticator types per level (June 2017, retrieved 2026-04-26, https://pages.nist.gov/800-63-3/sp800-63b.html)
- `[s3]`: NIST SP 800-63C, "Digital Identity Guidelines: Federation and Assertions" — FAL definitions (June 2017, retrieved 2026-04-26, https://pages.nist.gov/800-63-3/sp800-63c.html)
- `[s4]`: NIST SP 800-63-4 (revision in progress), "Digital Identity Guidelines" — current revision adding syncable authenticators / passkey support at AAL2 (retrieved 2026-04-26, https://pages.nist.gov/800-63-4/)
