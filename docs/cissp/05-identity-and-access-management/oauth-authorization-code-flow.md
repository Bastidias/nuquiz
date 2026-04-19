# OAuth Authorization Code Flow

**Domain:** 5 — Identity and Access Management &nbsp;|&nbsp; **Pattern:** Ordered &nbsp;|&nbsp; **Tags:** 5.3, 5.6
**Status:** draft (SME review pending)

The six-step OAuth 2.0 Authorization Code grant flow as defined in RFC 6749 §4.1 [s1]. The most-tested OAuth flow on CISSP and the flow on which OIDC, PKCE, and most real-world federated-identity deployments are built. Key discriminators: the separation between front-channel (steps 1–3 via browser redirects) and back-channel (steps 4–5 server-to-server), and the fact that the authorization *code* is a short-lived artifact distinct from the access *token* it is exchanged for.

**Layout convention:** rows are steps in sequence from the client initiating the flow to the client using the resulting access token. Columns are attributes of each step ordered left → right from least detail (Name) to most detail (Purpose).

| Step | Name | Direction | Content | Purpose |
|---|---|---|---|---|
| 1 | Authorization Request | User Agent → Auth Server | client_id<br>redirect_uri<br>scope<br>state<br>response_type [s1] | Initiate authorization [s1] |
| 2 | User Consent | User → Auth Server | Approval decision [s1] | Authorize the client [s1] |
| 3 | Authorization Code | Auth Server → Client | code<br>state [s1] | Deliver one-time code [s1] |
| 4 | Token Request | Client → Auth Server | code<br>client_id<br>client_secret<br>redirect_uri<br>grant_type [s1] | Exchange code for token [s1] |
| 5 | Token Response | Auth Server → Client | access_token<br>token_type<br>expires_in<br>refresh_token [s1] | Deliver access token [s1] |
| 6 | Resource Request | Client → Resource Server | access_token [s1] | Access protected resource [s1] |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. **No parentheticals in cells.** OAuth parameter names (`client_id`, `redirect_uri`, `response_type`, etc.) are treated as atomic tokens and use the RFC 6749 spelling.
- **Front-channel vs back-channel.** Steps 1–3 happen via the user's browser (the "user agent") — the user is redirected to the authorization server, authenticates and consents, and is redirected back with an authorization code in the URL. Steps 4–5 happen *directly* between the client's backend and the authorization server, with no browser involvement. This is the single most important architectural property of the flow — the short-lived authorization code is the only artifact exposed in browser URLs, and it is useless without the client secret presented in Step 4.
- **Why Step 4 requires a client secret.** The authorization code by itself is not a bearer credential — it must be presented alongside the `client_id` and `client_secret` (or with PKCE's `code_verifier` for public clients, per RFC 7636). This is what prevents an attacker who intercepts the authorization code from exchanging it for tokens: they also need the client secret, which the confidential client keeps on its backend.
- **The `state` parameter is a CSRF token.** The client generates a random `state` in Step 1, the authorization server echoes it back in Step 3, and the client verifies the echo matches what it generated. Without `state`, an attacker could forge an authorization response against a logged-in user. This is a required security parameter even though RFC 6749 marks it `RECOMMENDED` rather than `REQUIRED`; OAuth 2.0 Security BCP and OAuth 2.1 make it effectively mandatory.
- **Redirect URI must match registered value.** The `redirect_uri` in Step 1 must match a URI the client registered out-of-band with the authorization server. An authorization server that doesn't enforce this is vulnerable to open-redirect attacks that leak authorization codes to attacker-controlled hosts.
- **Step 5 returns both an access token and a refresh token.** The access token is short-lived (typically minutes to an hour). The refresh token is long-lived and used in a separate Refresh Token grant flow (not covered in this Concept) to obtain new access tokens without user re-consent. Refresh tokens are only issued to confidential clients by default.
- **PKCE changes Step 1, Step 4, and nothing else.** With PKCE, Step 1 adds `code_challenge` and `code_challenge_method`, and Step 4 replaces `client_secret` with `code_verifier`. The overall six-step flow is otherwise identical. That is why PKCE is an *extension* to Authorization Code, not a separate grant type.
- **OIDC layers on top.** When the `scope` in Step 1 includes `openid`, the authorization server is signaling an OIDC flow. Step 5 then also returns an `id_token` (a signed JWT) alongside the access token. The six-step structure is unchanged; OIDC adds the identity-assertion artifact.
- **Out of scope for this Concept:** Refresh Token grant (separate Concept if promoted from Notes), PKCE step-level detail (captured in `oauth-grant-types` and its own future Concept), OIDC-specific variants (`hybrid flow`, `response_type=code id_token`), OAuth actors and roles (separate Concept — `oauth-roles`), token introspection and revocation, token-binding and DPoP, consent UX.

### Values without a direct public citation

No cell in this table relies on inference beyond what RFC 6749 [s1] §4.1 specifies. Purpose-column values ("Initiate authorization," "Deliver one-time code," "Access protected resource") are one-line summaries of the RFC's step-by-step prose rather than direct quotations, but map cleanly to the §4.1 sub-sections.

## Engine demo opportunities

- `Step 3 | Name → ?` → `Authorization Code`
- `Step 5 | Name → ?` → `Token Response`
- `Step 4 | Direction → ?` → `Client → Auth Server`
- `Step 1 | Content → ?` → `client_id`, `redirect_uri`, `scope`, `state`, `response_type` (multi-Fact cell)
- `Step 5 | Content → ?` → `access_token`, `token_type`, `expires_in`, `refresh_token`
- `? | Direction → Client → Auth Server` → `Step 4` (the token exchange is the only client-to-auth-server direct call)
- `? | Content → code` → `Step 3` (as delivered), `Step 4` (as presented) — shared-Fact across multi-Fact cells
- Sequence (adjacency): `Step following (Step n | Name → Authorization Code) | Name → ?` → `Token Request`
- Sequence (adjacency): `Step following (Step n | Name → Token Response) | Name → ?` → `Resource Request`
- Composite Step 4 Row with `Direction` swapped to `User Agent → Auth Server` — directly tests the front-channel vs back-channel distinction (Step 4 is back-channel, not via browser)
- Composite Step 3 Row with `Content` swapped to `access_token` — tests the code-vs-token discrimination (Step 3 delivers the code, not the token)
- Composite Step 1 Row with `Content` including `client_secret` — tests that the client secret is never in the front-channel redirect (only in Step 4 back-channel)

## Sources

- `[s1]`: RFC 6749, "The OAuth 2.0 Authorization Framework" §4.1 Authorization Code Grant (October 2012, retrieved 2026-04-19, https://datatracker.ietf.org/doc/html/rfc6749#section-4.1)
- `[s2]`: RFC 7636, "Proof Key for Code Exchange by OAuth Public Clients" — PKCE variant of this flow (September 2015, retrieved 2026-04-19, https://datatracker.ietf.org/doc/html/rfc7636)
- `[s3]`: OAuth 2.0 Security Best Current Practice (in-progress BCP) — security-hardening guidance for this flow (retrieved 2026-04-19, https://datatracker.ietf.org/doc/html/draft-ietf-oauth-security-topics)
