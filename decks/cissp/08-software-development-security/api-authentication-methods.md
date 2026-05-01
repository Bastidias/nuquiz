# API Authentication Methods

**Domain:** 8 — Software Development Security &nbsp;|&nbsp; **Pattern:** Dimensions &nbsp;|&nbsp; **Tags:** 8.5

**Status:** draft (SME review pending)

The six API authentication methods CISSP candidates are expected to discriminate. Each pairs a *credential type* with the *transport requirement*, the *strengths* it provides, and known *weaknesses*. The CISSP exam tests both the per-method profile and the matchup with deployment scenario — particularly that API keys are simple but coarse-grained, OAuth Bearer tokens are revocable but server-validated, JWTs are stateless but harder to revoke, and mTLS provides the strongest peer authentication at the highest operational cost. Sibling Concept `api-security-risks` covers OWASP API Top 10 risks; this Concept covers the auth-mechanism layer.

| Method | credential type | transport requirement | strengths | weaknesses |
|---|---|---|---|---|
| API key | Static shared secret [s1] | TLS required to prevent interception | Simple to implement<br>No state in API server [s1] | No expiry by default<br>Coarse-grained per-key authorization<br>Revocation requires key rotation [s1] |
| HTTP Basic | Username and password in Authorization header [s2] | TLS required because credentials are base64-encoded not encrypted [s2] | Universally supported<br>Simple troubleshooting | Credentials sent on every request<br>No native MFA support<br>Limited audit granularity |
| OAuth 2.0 Bearer Token | Server-issued opaque or signed access token [s3] | TLS required [s3] | Token revocable via authorization server<br>Scoped permissions [s3] | Token introspection adds latency<br>Token theft enables impersonation [s3] |
| JWT | Self-contained signed token with claims [s4] | TLS required to prevent token theft [s4] | Stateless validation<br>Embedded claims reduce database lookups [s4] | Revocation requires denylist or short expiry<br>Algorithm-confusion attacks if implementation flawed [s4] |
| mTLS | X.509 client certificate [s5] | TLS with client-certificate authentication [s5] | Cryptographic peer authentication<br>No bearer token to steal [s5] | Certificate-lifecycle operational overhead<br>Per-host certificate provisioning [s5] |
| HMAC request signing | Per-request signature using shared secret [s6] | TLS recommended but not strictly required because requests are cryptographically signed [s6] | Replay-resistant when nonce or timestamp included<br>Secret never traverses the wire [s6] | Implementation complexity<br>Clock-skew issues with timestamp validation [s6] |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. **No parentheticals in cells.** Acronym expansions live in this section.
- **Acronym expansions.** `JWT` = JSON Web Token. `mTLS` = mutual Transport Layer Security. `HMAC` = Hash-based Message Authentication Code. `Sigv4` = AWS Signature Version 4 (the canonical HMAC-request-signing pattern). `BCP` = Best Current Practice. `RFC` = Request for Comments (IETF).
- **Bearer token vs HMAC signing.** A *bearer token* is anything that grants access by mere possession — OAuth access tokens, JWTs, API keys all qualify. Possession of the token = ability to use it. *HMAC request signing* is different: each request carries a signature computed from the request content plus a shared secret; the secret never travels. Stealing one signed request doesn't let the attacker forge another. AWS Sigv4 and HTTP Signatures (draft) implement this pattern.
- **JWT pitfalls.** RFC 7519 defines JWT structure (header.payload.signature) and RFC 7515 defines JSON Web Signature. Common implementation bugs include accepting `alg=none` (unsigned tokens), confusing the symmetric `HS256` and asymmetric `RS256` algorithms (algorithm-confusion attack), using weak signing keys, embedding sensitive data in the JWT payload (which is base64-encoded, not encrypted, so anyone can read it). OWASP JWT Cheat Sheet covers the full mitigation list.
- **JWT revocation problem.** Stateless validation is JWT's main selling point — the API can verify the signature without consulting a server. But revocation requires consulting state: a denylist of revoked tokens before expiry, or short token lifetimes (15 minutes is common) so a stolen token expires soon enough that the revocation window doesn't matter. Refresh tokens (handled separately, with server-side state) do allow revocation but add complexity.
- **mTLS for service-to-service.** Internal microservice meshes (Istio, Linkerd) increasingly use mTLS for every internal call — the service mesh handles certificate issuance and rotation transparently. mTLS is also mandated by some financial APIs (Open Banking, FAPI) and high-assurance B2B integrations. The operational overhead drops significantly when a service mesh or PKI automation handles the certificate lifecycle.
- **API keys are still everywhere.** Despite their weaknesses, API keys remain the dominant authentication for backend services, internal APIs, and developer-friendly third-party APIs (Stripe, Twilio, OpenAI). Mitigations include: scoped keys (read-only vs read-write), per-environment keys (dev/stage/prod), automatic rotation, and detection of leaked keys via secret-scanning of public repositories (GitHub Secret Scanning will alert and revoke automatically for participating providers).
- **OAuth scopes drive granular authorization.** OAuth Bearer tokens carry *scopes* — strings like `read:users`, `write:invoices`, `admin:*` — that limit what the token can do. The authorization server attaches scopes at token issuance based on the user's consent and the client's request. Sibling Concept `oauth-grant-types` covers the grant flows; `oauth-roles` covers the actor model.
- **Cross-Concept link.** Sibling Concept `oauth-roles` and `oauth-authorization-code-flow` cover the OAuth ecosystem in detail. `federation-protocols` covers SAML / OAuth / OIDC at the federation level. `api-security-risks` covers OWASP API Top 10. `mfa-methods` in D5 covers MFA which can layer on top of any of these methods (especially OAuth and JWT). `tls-handshake` in D4 covers TLS that all but HMAC signing depend on.
- **Out of scope for this Concept:** specific JWT libraries and language-specific implementation pitfalls, JWE (JSON Web Encryption) for confidential JWTs, DPoP (Demonstrating Proof of Possession) for sender-constrained tokens, OAuth 2.1 changes, FAPI / Open Banking specific profiles, certificate-bound access tokens (RFC 8705 mTLS for OAuth), HTTP Message Signatures (RFC 9421) successor to HMAC signing.

### Tricky distractors

- **API key has no expiry by default.** Until rotated. Wrong-answer pattern: claiming API keys self-expire — they don't unless the issuer enforces it.
- **JWT is signed, not encrypted by default.** Payload is base64 readable. Wrong-answer pattern: claiming JWT keeps payload confidential — only JWE does.
- **JWT revocation is hard.** Stateless = no central authority to invalidate. Wrong-answer pattern: claiming JWTs revoke instantly like opaque tokens — requires denylist or short expiry.
- **HTTP Basic uses base64, not encryption.** TLS is mandatory. Wrong-answer pattern: claiming Basic auth provides cryptographic protection — it's encoding, not encryption.
- **Bearer token = anyone holding it.** Possession-based. Wrong-answer pattern: claiming OAuth Bearer tokens are bound to a specific caller — they aren't unless DPoP or mTLS-bound.
- **HMAC signing keeps secret off the wire.** Per-request signature instead. Wrong-answer pattern: claiming HMAC sends the secret in headers — only the signature derived from it.
- **mTLS is peer authentication, not just transport.** Identity comes from cert. Wrong-answer pattern: equating mTLS with regular TLS — mTLS authenticates *both* sides.

### Values without a direct public citation

| Cell | Value | Why unsourced |
|---|---|---|
| HTTP Basic × all cells | — | RFC 7617 [s2] specifies the format; specific strengths/weaknesses framings are practitioner consensus from OWASP and security-design literature rather than direct quotations. |
| HMAC request signing × all cells | — | Industry-standard pattern (AWS Sigv4, HTTP Signatures draft) but no single primary specification covers all four cell columns with the exact framing used here. |
| All rows × strengths and weaknesses | Phrasings | OWASP API Security guidance covers these at the pattern level; specific cell phrasings are pedagogical summaries. |

## Engine demo opportunities

- `API key | credential type → ?` → `Static shared secret`
- `JWT | credential type → ?` → `Self-contained signed token with claims`
- `mTLS | credential type → ?` → `X.509 client certificate`
- `? | credential type → Server-issued opaque or signed access token` → `OAuth 2.0 Bearer Token`
- `? | strengths → Stateless validation`, `Embedded claims reduce database lookups` → `JWT`
- `? | weaknesses → Revocation requires denylist or short expiry` → `JWT` (sub-Fact in multi-Fact cell)
- `? | weaknesses → No expiry by default` → `API key` (sub-Fact in multi-Fact cell)
- `mTLS | strengths → ?` → `Cryptographic peer authentication`, `No bearer token to steal`
- `HMAC request signing | strengths → ?` → `Replay-resistant when nonce or timestamp included`, `Secret never traverses the wire`
- Composite API key Row with `weaknesses` swapped to `Algorithm-confusion attacks if implementation flawed` (JWT's value) — directly tests API-key-vs-JWT distinction (algorithm confusion is JWT-specific; API keys have different weaknesses)
- Composite JWT Row with `strengths` swapped to `Cryptographic peer authentication`, `No bearer token to steal` (mTLS's value) — tests the JWT-vs-mTLS distinction (JWT is bearer; mTLS is peer-cert)
- Composite OAuth 2.0 Bearer Token Row with `credential type` swapped to `X.509 client certificate` (mTLS's value) — tests bearer-vs-certificate authentication

## Sources

- `[s1]`: OWASP, "REST Security Cheat Sheet" — API key authentication and storage guidance (retrieved 2026-04-30, https://cheatsheetseries.owasp.org/cheatsheets/REST_Security_Cheat_Sheet.html)
- `[s2]`: RFC 7617, "The 'Basic' HTTP Authentication Scheme" (September 2015, retrieved 2026-04-30, https://datatracker.ietf.org/doc/html/rfc7617)
- `[s3]`: RFC 6750, "The OAuth 2.0 Authorization Framework: Bearer Token Usage" (October 2012, retrieved 2026-04-30, https://datatracker.ietf.org/doc/html/rfc6750)
- `[s4]`: RFC 7519, "JSON Web Token (JWT)" (May 2015, retrieved 2026-04-30, https://datatracker.ietf.org/doc/html/rfc7519). OWASP, "JSON Web Token Cheat Sheet for Java" — implementation pitfalls (retrieved 2026-04-30, https://cheatsheetseries.owasp.org/cheatsheets/JSON_Web_Token_for_Java_Cheat_Sheet.html)
- `[s5]`: RFC 8705, "OAuth 2.0 Mutual-TLS Client Authentication and Certificate-Bound Access Tokens" (February 2020, retrieved 2026-04-30, https://datatracker.ietf.org/doc/html/rfc8705)
- `[s6]`: AWS, "Signature Version 4 signing process" — canonical HMAC request-signing reference (retrieved 2026-04-30, https://docs.aws.amazon.com/general/latest/gr/signature-version-4.html). RFC 9421, "HTTP Message Signatures" — successor standardized HMAC-style signing (February 2024, retrieved 2026-04-30, https://datatracker.ietf.org/doc/html/rfc9421)
- `[s7]`: (ISC)² CISSP Certification Exam Outline, effective 2024-04-15, Domain 8 §8.5 *Define and apply secure coding guidelines and standards* (retrieved 2026-04-30, https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline)
