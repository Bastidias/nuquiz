# Authentication System Comparison

**Domain:** 5 — Identity and Access Management &nbsp;|&nbsp; **Pattern:** Dimensions &nbsp;|&nbsp; **Tags:** 5.6
**Status:** draft (SME review pending)

Top-level comparison of the five authentication systems CISSP regularly groups together: Kerberos, SAML 2.0, OAuth 2.0, OIDC, FIDO2. Synthesizes the detail already captured in the per-system Concepts (`kerberos-flow`, `kerberos-components`, `federation-protocols`, `oauth-grant-types`, `oauth-authorization-code-flow`, `saml-sso-flow`, `mfa-methods`) into a single cross-system view. Useful for the common "which system would you use for X" style question.

| System | purpose | message format | federation support | typical environment | artifact |
|---|---|---|---|---|---|
| Kerberos | Authentication | Binary ASN.1 | Cross-realm trust | Intranet Active Directory | Ticket |
| SAML 2.0 | Authentication<br>Authorization | XML | Native | Enterprise web SSO | SAML assertion |
| OAuth 2.0 | Authorization | JSON | Cross-domain delegation | API access | Access token |
| OIDC | Authentication | JSON | Native | Modern web and mobile SSO | ID token |
| FIDO2 | Authentication | CBOR<br>JSON | None | Passwordless or MFA | WebAuthn assertion |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. **No parentheticals in cells.** Protocol names and version numbers are atomic.
- **Purpose — the single most-tested discriminator.** Kerberos, OIDC, and FIDO2 are *authentication* protocols (they answer "who is the user"). OAuth 2.0 is strictly *authorization* (it answers "can this client access this resource"). SAML 2.0 does both. This mapping is exam-canonical and recurs across Concepts; keep it straight.
- **Message format maps to deployment era.** Binary ASN.1 (Kerberos) and XML (SAML) are pre-2010 enterprise-era formats. JSON (OAuth, OIDC) and CBOR (FIDO2 CTAP) are post-2010 web/mobile-native formats. The message-format column is a rough proxy for "modern vs enterprise" deployment fit.
- **Federation support.** SAML and OIDC are *natively* federated — the protocol exists specifically to carry authentication across security domains. Kerberos federates via explicit cross-realm trust between KDCs but is primarily an intranet protocol. OAuth federates authorization delegation across domains (the authorization server need not be in the same domain as the resource server). FIDO2 is *not* a federation protocol — it authenticates a user to a single relying party with cryptographic origin binding; federation on top of FIDO2 is typically done via OIDC or SAML wrapping a FIDO2 authentication event.
- **Typical environment.** Kerberos is the canonical intranet / Active Directory authentication system. SAML dominates enterprise web SSO (Fortune 500, government). OAuth is the canonical API delegation protocol (Google APIs, AWS APIs, social logins underneath OIDC). OIDC is the modern replacement for SAML in API-first / mobile-first organizations. FIDO2 is the authenticator layer — it sits *below* OIDC or SAML rather than competing with them, providing the phishing-resistant strong-authentication primitive.
- **Artifact column.** Each row's artifact is what a successful authentication/authorization event produces. Kerberos produces tickets (TGT initially, service tickets per target). SAML produces signed XML assertions. OAuth produces opaque or JWT access tokens. OIDC produces JWT ID tokens (and access tokens if scoped for API access). FIDO2 produces a signed WebAuthn assertion (a CBOR-encoded attestation of a challenge-response).
- **FIDO2 as a building block, not a replacement.** CISSP exam framings that pit FIDO2 against SAML or OIDC miss the typical deployment: FIDO2 is the *authenticator* a user presents at the IdP during a SAML or OIDC flow — replacing passwords and legacy MFA methods. The federation layer above is still SAML or OIDC; FIDO2 is what makes Step 4 of a SAML flow or the IdP authentication inside an OIDC flow phishing-resistant.
- **Out of scope for this Concept:** WS-Federation (covered in `federation-protocols`), LDAP as an authentication protocol (strictly speaking a directory protocol used *for* authentication, not a protocol itself), RADIUS / TACACS+ / DIAMETER (network access authentication, belongs in a separate network-access Concept), Shibboleth (SAML profile), ADFS (Microsoft SAML/WS-Fed implementation).

### Tricky distractors

- **OAuth is authorization-only.** OIDC adds authentication. Wrong-answer pattern: claiming OAuth signs users in.
- **FIDO2 is not federation.** It authenticates to a single relying party. Wrong-answer pattern: claiming FIDO2 federates identity — SAML/OIDC sit on top of FIDO2.
- **Kerberos is intranet.** AD environments. Wrong-answer pattern: choosing Kerberos for cross-domain federation in modern web — SAML/OIDC dominate that space.
- **JSON era ≠ XML era.** SAML uses XML; OAuth/OIDC use JSON. Wrong-answer pattern: claiming SAML uses JSON — XML is its native format.
- **FIDO2 is below SAML/OIDC.** Authenticator at the IdP, not a federation alternative. Wrong-answer pattern: pitting FIDO2 against SAML/OIDC — they layer.
- **Tokens, tickets, assertions differ by protocol.** Kerberos = ticket; SAML = assertion; OAuth = access token; OIDC = ID token; FIDO2 = WebAuthn assertion. Wrong-answer pattern: substituting "token" universally — protocol-specific terminology.

### Values without a direct public citation

All cells in this Concept are synthesis — the per-cell facts are sourced in the dedicated per-system Concepts (`kerberos-flow`, `kerberos-components`, `federation-protocols`, `oauth-grant-types`, `saml-sso-flow`, `mfa-methods`). This Concept's purpose is to surface the cross-system comparison; citations trace through the underlying Concepts rather than being re-cited per cell. An SME validating this Concept should confirm the per-cell Facts against the primary sources in those sibling Concepts (RFC 4120, RFC 6749, RFC 7296, OASIS SAML 2.0 Core, OIDC Core 1.0, W3C WebAuthn L2).

## Engine demo opportunities

- `Kerberos | purpose → ?` → `Authentication`
- `OAuth 2.0 | purpose → ?` → `Authorization`
- `OIDC | purpose → ?` → `Authentication`
- `SAML 2.0 | purpose → ?` → `Authentication`, `Authorization`
- `? | purpose → Authentication` → `Kerberos`, `SAML 2.0`, `OIDC`, `FIDO2` — shared-Value select-all across multi-Fact cells
- `? | purpose → Authorization` → `SAML 2.0`, `OAuth 2.0` — shared-Value select-all
- `? | message format → JSON` → `OAuth 2.0`, `OIDC`, `FIDO2` (sub-Fact in multi-Fact cell)
- `? | message format → XML` → `SAML 2.0`
- `? | federation support → Native` → `SAML 2.0`, `OIDC` — shared-Value select-all
- `FIDO2 | artifact → ?` → `WebAuthn assertion`
- Composite OAuth 2.0 Row with `purpose` swapped to `Authentication` — directly tests the canonical "OAuth is not authentication" point
- Composite Kerberos Row with `typical environment` swapped to `API access` — tests the Kerberos-is-intranet framing
- Composite FIDO2 Row with `federation support` swapped to `Native` — tests that FIDO2 is a local-auth authenticator, not a federation protocol

## Sources

- See per-system Concepts for primary source citations:
  - `kerberos-flow.md` and `kerberos-components.md` → RFC 4120
  - `federation-protocols.md` → OASIS SAML 2.0 Core, RFC 6749, OIDC Core 1.0
  - `oauth-grant-types.md` and `oauth-authorization-code-flow.md` → RFC 6749, RFC 7636, RFC 8628
  - `saml-sso-flow.md` → OASIS SAML 2.0 Core / Bindings / Profiles
  - `mfa-methods.md` → W3C WebAuthn Level 2, FIDO Alliance FIDO2 specifications
