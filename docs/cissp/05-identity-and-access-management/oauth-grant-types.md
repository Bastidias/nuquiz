# OAuth 2.0 Grant Types

**Domain:** 5 — Identity and Access Management &nbsp;|&nbsp; **Pattern:** Dimensions &nbsp;|&nbsp; **Tags:** 5.3
**Status:** draft (SME review pending)

The six OAuth 2.0 grant types CISSP candidates should discriminate. RFC 6749 [s1] defines four (Authorization Code, Implicit, Client Credentials, Resource Owner Password); RFC 7636 [s2] adds PKCE as an extension to Authorization Code for public clients; RFC 8628 [s3] adds the Device Authorization grant. Two of the four original grants (Implicit and Resource Owner Password) are now deprecated per the OAuth 2.0 Security Best Current Practice and the OAuth 2.1 consolidation effort — a detail CISSP increasingly tests.

| Grant type | RFC | client type | when used | security profile | status |
|---|---|---|---|---|---|
| Authorization Code | RFC 6749 [s1] | Confidential [s1] | Server-side web apps [s1] | High | Current |
| Implicit | RFC 6749 [s1] | Public [s1] | Browser-based JavaScript apps [s1] | Low | Deprecated [s4] |
| Client Credentials | RFC 6749 [s1] | Confidential [s1] | Machine-to-machine [s1] | High | Current |
| Resource Owner Password | RFC 6749 [s1] | Confidential [s1] | Legacy credential collection | Low | Deprecated [s4] |
| Device Code | RFC 8628 [s3] | Public [s3] | Input-constrained devices [s3] | Medium | Current |
| Authorization Code with PKCE | RFC 7636 [s2] | Public [s2] | Mobile apps<br>SPAs [s2] | High | Current |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. **No parentheticals in cells.** RFC numbers and grant-type names are treated as atomic identifiers; the "with PKCE" qualifier in the last row is part of the canonical grant name.
- **Confidential vs public clients.** A *confidential* client can securely store a client secret (server-side web app with a backend). A *public* client cannot (browser SPA, mobile app, device with limited storage) — the client secret would be extractable from the distributed code or device. This distinction drives grant-type selection: confidential clients can use the classic Authorization Code grant with a secret; public clients must use Authorization Code with PKCE (or, historically, Implicit or Device Code).
- **PKCE is not a separate grant type in the RFC sense — but CISSP treats it as one.** RFC 7636 [s2] defines PKCE as an *extension* to the Authorization Code grant, not a new grant type. CISSP study materials and modern OAuth guidance (OAuth 2.1) treat "Authorization Code with PKCE" as the distinct recommended flow for public clients, so the Concept represents it as its own Row. Writing `code_verifier` / `code_challenge` prevents an attacker who intercepts the authorization code from exchanging it for tokens.
- **Why Implicit is deprecated.** The access token was returned directly in the redirect URL fragment, exposing it to browser history, referer headers, and intermediaries. Authorization Code + PKCE delivers the same "public client with no server" ergonomics without exposing tokens in URLs, so Implicit has no remaining justification. The OAuth 2.0 Security Best Current Practice [s4] recommends against Implicit entirely; OAuth 2.1 removes it.
- **Why Resource Owner Password is deprecated.** The user hands their username and password to the client application, which then exchanges them at the token endpoint. This *defeats the central OAuth design goal* — OAuth exists so users don't have to share passwords with third-party clients. ROPC is retained only for legacy migration scenarios. OAuth 2.1 removes it.
- **Device Code solves a specific problem.** Smart TVs, CLI tools, IoT devices without a good keyboard or browser — the device polls the authorization server while the user authenticates on a *separate* device (phone/laptop) by entering a short verification code. Not a general-purpose grant; only appropriate when a browser-based flow on the device itself is impractical.
- **Client Credentials has no user.** The client authenticates as itself (no resource owner involved). Used for backend-to-backend API access (service accounts, scheduled jobs, internal service meshes). CISSP framing: "machine-to-machine" or "server-to-server."
- **OAuth 2.1 consolidates the recommended set.** Draft OAuth 2.1 keeps Authorization Code (with PKCE mandatory), Client Credentials, Device Code, and Refresh Token. Implicit and Resource Owner Password are removed. CISSP testing that tracks current best practice aligns with this consolidation.
- **Out of scope for this Concept:** the Authorization Code flow step-by-step (separate Ordered Concept — `oauth-authorization-code-flow`), Refresh Token grant (typically paired with Authorization Code; not a standalone end-user grant), token introspection (RFC 7662), token revocation (RFC 7009), OAuth roles and actors (separate Concept — `oauth-roles`), DPoP and mTLS sender-constrained tokens, OIDC-specific flows.

### Tricky distractors

- **Implicit is deprecated.** OAuth 2.0 Security Best Current Practice and OAuth 2.1 explicitly remove Implicit. Wrong-answer pattern: recommending Implicit for SPAs — use Authorization Code with PKCE instead.
- **Resource Owner Password is deprecated.** ROPC defeats the OAuth design goal of avoiding password sharing with third-party clients. Wrong-answer pattern: claiming ROPC is fine for "trusted" clients — not recommended for new deployments.
- **Client Credentials has no user.** Used for machine-to-machine; the client authenticates as itself. Wrong-answer pattern: claiming Client Credentials authenticates a user.
- **PKCE is for public clients.** Authorization Code with PKCE is for SPAs and mobile apps that can't keep a secret. Confidential clients can use bare Authorization Code with client_secret. Wrong-answer pattern: claiming PKCE is mandatory for confidential clients — it isn't, though OAuth 2.1 recommends it everywhere.
- **OAuth is not authentication.** OAuth 2.0 is authorization (delegated API access). OIDC adds authentication via the ID Token. Wrong-answer pattern: treating OAuth alone as an authentication protocol.
- **Device Code requires a second device.** The user authenticates on a *separate* device with a browser. Wrong-answer pattern: claiming Device Code works on any device without a browser, regardless of whether the user has another device.

### Values without a direct public citation

| Cell | Value | Why unsourced |
|---|---|---|
| All rows × security profile | `High` / `Medium` / `Low` | Qualitative rating drawn from the OAuth 2.0 Security Best Current Practice [s4] recommendations and common security-review guidance. Not a quantitative metric from a single source. |
| Authorization Code × status = `Current` | — | Plain RFC 6749 [s1] Authorization Code without PKCE is not *deprecated* but is also not the *recommended* flow for public clients. "Current" reflects that it remains the correct flow for confidential clients. |
| Resource Owner Password × client type | `Confidential` | RFC 6749 [s1] says ROPC is "suitable in cases where the resource owner has a trust relationship with the client, such as the device operating system or a highly privileged application" — which implies a confidential client, but the RFC does not pin this as a requirement in so many words. |
| Resource Owner Password × when used | `Legacy credential collection` | Paraphrase; RFC 6749 characterizes the use case but does not use "legacy" terminology (which has become the post-hoc framing as the grant was deprecated). |

## Engine demo opportunities

- `Authorization Code | RFC → ?` → `RFC 6749`
- `Device Code | RFC → ?` → `RFC 8628`
- `Authorization Code with PKCE | RFC → ?` → `RFC 7636`
- `? | status → Deprecated` → `Implicit`, `Resource Owner Password` — shared-Value select-all
- `? | status → Current` → `Authorization Code`, `Client Credentials`, `Device Code`, `Authorization Code with PKCE` — shared-Value select-all
- `? | client type → Public` → `Implicit`, `Device Code`, `Authorization Code with PKCE` — shared-Value select-all
- `? | client type → Confidential` → `Authorization Code`, `Client Credentials`, `Resource Owner Password` — shared-Value select-all
- `Client Credentials | when used → ?` → `Machine-to-machine`
- Composite Implicit Row with `status` swapped to `Current` — directly tests the Implicit-is-deprecated Fact
- Composite Authorization Code with PKCE Row with `client type` swapped to `Confidential` — tests that PKCE is for public clients specifically (confidential clients can use bare Authorization Code)
- Composite Resource Owner Password Row with `status` swapped to `Current` — tests the ROPC deprecation

## Sources

- `[s1]`: RFC 6749, "The OAuth 2.0 Authorization Framework" — defines Authorization Code, Implicit, Resource Owner Password, and Client Credentials grants (October 2012, retrieved 2026-04-19, https://datatracker.ietf.org/doc/html/rfc6749)
- `[s2]`: RFC 7636, "Proof Key for Code Exchange by OAuth Public Clients" — PKCE (September 2015, retrieved 2026-04-19, https://datatracker.ietf.org/doc/html/rfc7636)
- `[s3]`: RFC 8628, "OAuth 2.0 Device Authorization Grant" (August 2019, retrieved 2026-04-19, https://datatracker.ietf.org/doc/html/rfc8628)
- `[s4]`: IETF Draft, "OAuth 2.0 Security Best Current Practice" — deprecates Implicit and Resource Owner Password (in-progress BCP; retrieved 2026-04-19, https://datatracker.ietf.org/doc/html/draft-ietf-oauth-security-topics)
