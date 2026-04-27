# OAuth 2.0 Roles

**Domain:** 5 — Identity and Access Management &nbsp;|&nbsp; **Pattern:** Dimensions &nbsp;|&nbsp; **Tags:** 5.3
**Status:** draft (SME review pending)

The four OAuth 2.0 roles defined by RFC 6749 §1.1 [s1]. Paired Concept to `oauth-authorization-code-flow` — this is the "who are the parties" Concept; the flow is "how do they interact." The most-tested distinctions are (1) Resource Owner vs Client (who owns the data vs who requests access to it), and (2) Authorization Server vs Resource Server (who issues tokens vs who accepts them to serve resources — these are logically separate even when co-located).

| Role | category | function | relationship |
|---|---|---|---|
| Resource Owner | Actor | Grants authorization [s1] | Authenticates to Authorization Server |
| Client | Actor | Requests access on behalf of Resource Owner [s1] | Presents tokens to Resource Server |
| Authorization Server | Actor | Issues tokens [s1] | Validates Resource Owner<br>Issues access tokens [s1] |
| Resource Server | Actor | Hosts protected resources [s1] | Validates access tokens<br>Serves resources [s1] |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. **No parentheticals in cells.**
- **Resource Owner is usually the human user.** RFC 6749 [s1] defines Resource Owner as "an entity capable of granting access to a protected resource" — typically the end user owning their data. For Client Credentials grants (machine-to-machine, no user), the Client is acting on its own behalf and there is no distinct Resource Owner.
- **Client is not the user.** "Client" in OAuth is the application (web app, mobile app, CLI tool, backend service) that wants access to resources — not the human sitting behind it. Confusing Client with Resource Owner (or End User) is a persistent exam mistake.
- **Authorization Server vs Resource Server.** These are logically distinct even when the same vendor runs both. The Authorization Server handles user authentication, consent, and token issuance (`/authorize` and `/token` endpoints). The Resource Server hosts the protected API (`/api/*` endpoints) and accepts access tokens presented by Clients. In small deployments they are often the same server process; in large multi-tenant APIs they are separate services (e.g., Auth0 or Okta as Authorization Server, customer's own API as Resource Server).
- **The token is the linkage between AS and RS.** The Authorization Server issues an access token; the Resource Server validates that token (via introspection, JWT signature verification, or an opaque-token validation call) and uses it to authorize the request. The trust between AS and RS is established at federation setup (signing keys, introspection endpoint credentials) — not at request time.
- **User-Agent is not a formal OAuth role.** The browser (or mobile user-agent) relays HTTP redirects between the Client, Authorization Server, and Resource Owner in the Authorization Code flow, but RFC 6749 does not formalize it as a fifth role. Some OAuth 2.1 drafts discuss the user-agent more explicitly for SPA deployments; this Concept follows the RFC 6749 four-role framing.
- **Comparison to SAML.** OAuth 2.0's Authorization Server ≈ SAML's IdP. OAuth's Resource Server ≈ SAML's SP for the protected-resource side (though SAML SPs typically don't separate authorization-server and resource-server concerns because SAML is authentication-focused). OAuth's Client has no direct SAML analog because SAML does not have the "on-behalf-of" delegation concept — SAML authenticates a user session at the SP; OAuth authorizes a third-party client to act on behalf of the user.
- **Out of scope for this Concept:** the Authorization Code flow step-by-step (separate Concept — `oauth-authorization-code-flow`), grant-type matrix (`oauth-grant-types`), token formats (JWT vs opaque), token introspection (RFC 7662), token revocation (RFC 7009), DPoP / mTLS sender-constrained tokens, OIDC-specific role extensions.

### Tricky distractors

- **Client is the application, not the user.** The user is the Resource Owner. Wrong-answer pattern: equating Client with End User — most persistent OAuth confusion.
- **AS issues tokens; RS validates them.** Logically separate even when co-located. Wrong-answer pattern: claiming the Resource Server issues access tokens — only the AS does.
- **Resource Owner grants authorization.** Not the AS. Wrong-answer pattern: claiming the AS grants permission — the AS facilitates and records the grant; the user authorizes.
- **OAuth has 4 formal roles.** User-Agent (browser) is not a formal role. Wrong-answer pattern: listing User-Agent as a fifth OAuth role.
- **AS/RS trust is set up out-of-band.** Signing keys, introspection credentials. Wrong-answer pattern: claiming the trust is established at request time — it's federation-setup.
- **OAuth Client ≠ HTTP client.** OAuth Client is the application registered with the AS. Wrong-answer pattern: equating "OAuth client" with "the browser making HTTP requests."

### Values without a direct public citation

No cell in this table relies on inference beyond what RFC 6749 [s1] §1.1 specifies. The role descriptions are paraphrases of the RFC's role definitions and map cleanly back to the spec.

## Engine demo opportunities

- `Resource Owner | function → ?` → `Grants authorization`
- `Authorization Server | function → ?` → `Issues tokens`
- `Resource Server | function → ?` → `Hosts protected resources`
- `? | function → Grants authorization` → `Resource Owner`
- `? | function → Issues tokens` → `Authorization Server`
- `Client | relationship → ?` → `Presents tokens to Resource Server`
- `? | relationship → Validates access tokens` → `Resource Server` (sub-Fact in multi-Fact cell)
- Composite Client Row with `function` swapped to `Grants authorization` — tests the Client/Resource-Owner confusion (the Client requests access; the Resource Owner grants it)
- Composite Authorization Server Row with `function` swapped to `Hosts protected resources` — tests the AS/RS split (AS issues tokens; RS hosts resources)
- Composite Resource Owner Row with `function` swapped to `Issues tokens` — tests the Resource-Owner/AS confusion

## Sources

- `[s1]`: RFC 6749 §1.1, "The OAuth 2.0 Authorization Framework" — definitions of Resource Owner, Client, Authorization Server, Resource Server (October 2012, retrieved 2026-04-19, https://datatracker.ietf.org/doc/html/rfc6749#section-1.1)
