# Federation Protocols

**Domain:** 5 — Identity and Access Management &nbsp;|&nbsp; **Pattern:** Dimensions &nbsp;|&nbsp; **Tags:** 5.3
**Status:** draft (SME review pending)

The four federated-identity protocols CISSP expects candidates to discriminate. SAML 2.0 and WS-Federation are the XML-based enterprise-era protocols (SAML dominates today, WS-Fed is increasingly legacy). OAuth 2.0 and OIDC are the JSON/HTTP-native protocols for modern web, mobile, and API ecosystems — OAuth provides *authorization* (delegated API access), OIDC layers *authentication* on top of OAuth via the ID Token. Per-protocol flows (SAML SSO flow, OAuth authorization code flow) are separate Ordered Concepts.

| Protocol | primary purpose | message format | token type | specification body | typical use |
|---|---|---|---|---|---|
| SAML 2.0 | Authentication<br>Authorization | XML | SAML assertion | OASIS | Enterprise SSO |
| OAuth 2.0 | Authorization [s1] | JSON [s1] | Access token [s1] | IETF [s1] | API access delegation |
| OIDC | Authentication [s2] | JSON [s2] | ID token<br>JWT [s2] | OpenID Foundation [s2] | Modern web and mobile SSO |
| WS-Federation | Authentication<br>Authorization | XML | SAML assertion | OASIS | Microsoft ecosystem SSO |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. **No parentheticals in cells.** Protocol version numbers (`SAML 2.0`, `OAuth 2.0`) are treated as atomic identifiers.
- **Authentication vs authorization is the single most-tested discriminator.** OAuth 2.0 alone does *not* authenticate the user — it authorizes a client application to access a resource on behalf of a resource owner. OIDC exists precisely to add authentication on top, with the ID Token as the canonical proof-of-authentication artifact. SAML and WS-Federation do both in a single assertion. A question asking "which of these is purely an authorization protocol" has exactly one correct answer: OAuth 2.0.
- **OIDC is built on OAuth 2.0.** OIDC is not a replacement for OAuth — it is a thin authentication layer that reuses OAuth's authorization code flow and adds an ID Token. In CISSP framing, OAuth answers "*can* this client access this resource?" and OIDC answers "*who* is the user whose session is driving this access?"
- **Token types.** SAML and WS-Federation carry SAML assertions (SAML 1.1 or 2.0; WS-Fed is token-type-agnostic but SAML assertions are dominant). OAuth 2.0 access tokens are opaque by spec — they can be JWTs or bearer strings. OIDC ID Tokens are *always* JWTs. A question asking "which federation protocol always uses JWT" points to OIDC.
- **Message format.** SAML 2.0 and WS-Fed use XML, which is verbose and requires XML parsing libraries on the client side. OAuth 2.0 and OIDC use JSON (over HTTP), which is lightweight and native to modern web/mobile runtimes. This is a significant driver of OIDC's adoption over SAML in API-first, mobile, and SPA contexts.
- **Specification body.** OASIS maintains SAML 2.0 and WS-Federation. IETF publishes OAuth 2.0 as RFC 6749 [s1] (with companion RFCs for bearer tokens, JWT, PKCE, etc.). OpenID Foundation maintains OIDC Core 1.0 [s2]. CISSP testing occasionally asks the standards-body pairing.
- **WS-Federation status.** Widely deployed historically in Microsoft-centric environments (ADFS used WS-Fed as a primary protocol) but being superseded by SAML 2.0 and OIDC. Microsoft Entra ID and modern Azure AD federations default to SAML or OIDC over WS-Fed. The Concept retains WS-Fed as a Row because CISSP still tests the four-protocol comparison, but SME review might fold WS-Fed into a Note if future exam outlines drop it.
- **OAuth 2.0 "authentication" anti-pattern.** Many early implementations (Facebook Connect, pre-OIDC Google Sign-In) used OAuth 2.0 access tokens as authentication tokens, which is cryptographically unsound — possession of an access token proves the *client* has authorization, not that the *user* is present. OIDC was standardized precisely to fix this. If an exam question frames OAuth 2.0 as an authentication protocol, it is framing it incorrectly; the correct framing is OAuth-for-authorization + OIDC-for-authentication.
- **Federation vs identity management.** All four protocols federate identity across security domains — the IdP authenticates the user once, and the SP (relying party) trusts the assertion. Identity provisioning across domains (SCIM, JIT provisioning) is a separate concern and out of scope here.
- **Out of scope for this Concept:** specific SAML flow (separate Ordered Concept — `saml-sso-flow`), OAuth authorization code flow (separate Concept — `oauth-authorization-code-flow`), OIDC-specific flows, OAuth grant types (separate Concept — `oauth-grant-types`), SAML actor roles (separate Concept — `saml-actors`), trust-relationship models (hub-and-spoke, mesh, transitive), federation attacks (assertion forgery, token replay, golden SAML).

### Tricky distractors

- **OAuth is not authentication.** OAuth 2.0 is authorization-only. OIDC layers authentication on top. Wrong-answer pattern: claiming "OAuth signs users in." OAuth grants delegated API access; OIDC tells the SP who the user is.
- **OAuth vs SAML version timing.** SAML 2.0 (2005) predates OAuth 2.0 (2012). Wrong-answer pattern: claiming SAML is "newer" because of the "2.0" suffix — they share a version number but SAML is older.
- **OIDC vs OAuth.** OIDC is built *on* OAuth 2.0 — it adds an ID Token (JWT). OIDC reuses OAuth's authorization code flow. Wrong-answer pattern: treating them as competing protocols.
- **WS-Federation status.** Microsoft-centric, increasingly legacy. Wrong-answer pattern: choosing WS-Fed for new deployments — almost never recommended now.
- **Token type per protocol.** SAML = SAML assertion (XML). OAuth = access token (often opaque). OIDC = ID token (always JWT). Wrong-answer pattern: claiming "all federation protocols use JWT" — only OIDC is JWT-required.
- **IdP / SP terminology.** SAML uses *Identity Provider* and *Service Provider*. OIDC uses *OpenID Provider* and *Relying Party*. Wrong-answer pattern: thinking SAML and OIDC use different concepts — they use different *names* for the same roles.

### Values without a direct public citation

| Cell | Value | Why unsourced |
|---|---|---|
| SAML 2.0 × all cells | — | Sourcing would cite OASIS SAML 2.0 Core specifications. No direct fetch performed in this research pass; cell values reflect widely-accepted federation-protocol comparisons. |
| WS-Federation × all cells | — | Similar — OASIS WS-Federation specification not directly fetched. Cell values reflect CISSP-pedagogical framing and industry consensus. |
| OAuth 2.0 × typical use | `API access delegation` | RFC 6749 [s1] describes the protocol purpose but does not name "API access delegation" as the canonical use case — that wording is pedagogical. |
| OIDC × typical use | `Modern web and mobile SSO` | OIDC spec [s2] describes capabilities, not canonical deployments. |

## Engine demo opportunities

- `OAuth 2.0 | primary purpose → ?` → `Authorization`
- `OIDC | primary purpose → ?` → `Authentication`
- `? | primary purpose → Authorization` → `SAML 2.0`, `OAuth 2.0`, `WS-Federation` — shared-Value select-all across multi-Fact and single-Fact cells
- `? | message format → XML` → `SAML 2.0`, `WS-Federation` — shared-Value select-all
- `? | message format → JSON` → `OAuth 2.0`, `OIDC` — shared-Value select-all
- `? | token type → SAML assertion` → `SAML 2.0`, `WS-Federation`
- `? | specification body → OASIS` → `SAML 2.0`, `WS-Federation`
- `OIDC | token type → ?` → `ID token`, `JWT`
- Composite OAuth 2.0 Row with `primary purpose` swapped to `Authentication` — directly tests the canonical OAuth-is-not-authentication point
- Composite SAML 2.0 Row with `message format` swapped to `JSON` — tests the XML/JSON polarity (SAML is XML; JSON is the OAuth/OIDC side)
- Composite OIDC Row with `token type` swapped to `SAML assertion` — tests the OIDC-uses-JWT specifically

## Sources

- `[s1]`: RFC 6749, "The OAuth 2.0 Authorization Framework" (October 2012, retrieved 2026-04-19, https://datatracker.ietf.org/doc/html/rfc6749)
- `[s2]`: OpenID Connect Core 1.0, incorporating errata set 2 — OpenID Foundation specification (retrieved 2026-04-19, https://openid.net/specs/openid-connect-core-1_0.html)
- `[s3]`: OASIS SAML 2.0 Core, "Assertions and Protocols for the OASIS Security Assertion Markup Language (SAML) V2.0" (March 2005, retrieved 2026-04-19, https://docs.oasis-open.org/security/saml/v2.0/saml-core-2.0-os.pdf)
- `[s4]`: OASIS WS-Federation 1.2, "Web Services Federation Language" (May 2009, retrieved 2026-04-19, http://docs.oasis-open.org/wsfed/federation/v1.2/ws-federation.html)
- `[s5]`: NIST SP 800-63C, "Digital Identity Guidelines: Federation and Assertions" — general federation reference (June 2017, retrieved 2026-04-19, https://pages.nist.gov/800-63-3/sp800-63c.html)
