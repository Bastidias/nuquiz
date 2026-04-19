# SAML SSO Flow

**Domain:** 5 — Identity and Access Management &nbsp;|&nbsp; **Pattern:** Ordered &nbsp;|&nbsp; **Tags:** 5.3, 5.6
**Status:** draft (SME review pending)

The seven-step SP-initiated SAML 2.0 Web Browser SSO flow — the workhorse of enterprise federated authentication. Classic CISSP flow question. The flow uses the user's browser as a courier between the Service Provider (SP) and Identity Provider (IdP); messages are carried in HTTP redirects (for the request) and HTTP form POSTs (for the assertion response). IdP-initiated SSO is a simpler three-step variant and is covered in Notes rather than as a separate Concept.

**Layout convention:** rows are steps in sequence, from the user's initial resource request through the SP session establishment. Columns are attributes of each step ordered left → right from least detail (Name) to most detail (Purpose).

| Step | Name | Direction | Content | Purpose |
|---|---|---|---|---|
| 1 | Access attempt | User → SP | Resource URL | Request protected resource |
| 2 | Redirect to IdP | SP → User | SAMLRequest<br>RelayState [s1] | Redirect to IdP for authentication |
| 3 | SSO request at IdP | User → IdP | SAMLRequest<br>RelayState [s1] | Present SSO request to IdP |
| 4 | IdP authentication | User ↔ IdP | Credentials | Authenticate user locally at IdP |
| 5 | Assertion response | IdP → User | SAMLResponse<br>Assertion<br>RelayState [s1] | Return signed assertion to browser |
| 6 | Assertion POST to SP | User → SP | SAMLResponse<br>Assertion<br>RelayState [s1] | Deliver assertion to SP |
| 7 | Session established | SP → User | Session cookie<br>Resource | Grant access to resource |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. **No parentheticals in cells.** SAML artifact names (`SAMLRequest`, `SAMLResponse`, `Assertion`, `RelayState`) are treated as atomic tokens using the SAML 2.0 Core spelling [s1].
- **SP-initiated vs IdP-initiated SSO.** This Concept covers the SP-initiated flow (the user starts at the SP, gets redirected to the IdP). IdP-initiated SSO is simpler: the user starts at the IdP, authenticates, picks an SP from a portal, and the IdP sends a SAMLResponse directly to the SP (no SAMLRequest phase). IdP-initiated is vulnerable to unsolicited-response attacks because the SP has no SAMLRequest to correlate the response against — SP-initiated SAML is the more secure default.
- **Browser is the courier.** The user's browser is not merely a participant; it *is* the transport between SP and IdP in SAML. There is no direct SP→IdP back-channel in a pure SAML SSO flow (unlike OAuth, where Step 4 is back-channel). This is why SAML bindings are defined around HTTP Redirect (for small requests) and HTTP POST (for large assertions that would exceed URL length limits).
- **RelayState carries SP state across the round trip.** The SP generates `RelayState` in Step 2 (typically the original resource URL the user was trying to access), echoes it through the IdP in Steps 3 and 5, and uses it in Step 6/7 to redirect the user to the originally-requested resource after session establishment. `RelayState` is the SAML analog of OAuth's `state` parameter — both a usability feature and a CSRF/replay defense.
- **The Assertion is signed by the IdP.** The SAML Assertion embedded in the Step 5 SAMLResponse is an XML-DSIG-signed document issued by the IdP. The SP verifies the signature using the IdP's public key (obtained out-of-band via metadata exchange at federation setup). This is the cryptographic root of trust for the entire flow — a tampered or unsigned assertion is rejected.
- **Step 4 is opaque to SAML.** SAML does not specify *how* the IdP authenticates the user — it could be password + MFA, Kerberos, smart card, FIDO2, federated chain to another IdP, or anything else. All SAML requires is that the IdP produce a signed assertion attesting to the authentication event. This is why SAML is sometimes described as federation *plumbing* rather than authentication itself.
- **Assertion delivery via HTTP POST Binding.** The Step 5 SAMLResponse is returned to the user's browser as an HTML form that immediately POSTs to the SP's Assertion Consumer Service (ACS) URL. The form auto-submits via JavaScript (or requires one click if JS is disabled). The POST binding is used because SAML assertions routinely exceed the size limits of the HTTP Redirect binding.
- **Out of scope for this Concept:** SAML actor roles (separate Concept — `saml-actors`), IdP-initiated flow step-by-step, Single Logout (SLO) flow, SAML attribute queries, federation metadata exchange format, SAML-over-HTTP-Artifact binding, SAML-to-OAuth token exchange (RFC 7522).

### Values without a direct public citation

| Cell | Value | Why unsourced |
|---|---|---|
| Step 1 × all cells | — | The pre-SAML access attempt is an HTTP GET with no SAML artifact; described descriptively rather than quoted from OASIS SAML 2.0 Core [s1]. |
| Step 4 × all cells | — | The local authentication event at the IdP is deliberately outside SAML's scope. Cell values describe the event generically. |
| Step 7 × all cells | — | Session establishment is an implementation-specific SP behavior (cookie, JWT, server-side session) and is not specified by SAML 2.0. |

## Engine demo opportunities

- `Step 2 | Direction → ?` → `SP → User`
- `Step 5 | Direction → ?` → `IdP → User`
- `Step 6 | Direction → ?` → `User → SP`
- `? | Direction → User → SP` → `Step 1`, `Step 6` — shared-Value select-all
- `? | Content → SAMLRequest` → `Step 2`, `Step 3` — shared-Value select-all (the request makes two hops via the browser)
- `? | Content → SAMLResponse` → `Step 5`, `Step 6` — shared-Value select-all (the response also makes two hops)
- `? | Content → RelayState` → `Step 2`, `Step 3`, `Step 5`, `Step 6` — shared-Value select-all across four steps
- `Step 5 | Content → ?` → `SAMLResponse`, `Assertion`, `RelayState`
- Sequence (adjacency): `Step following (Step n | Name → Redirect to IdP) | Name → ?` → `SSO request at IdP`
- Sequence (adjacency): `Step following (Step n | Name → IdP authentication) | Name → ?` → `Assertion response`
- Composite Step 6 Row with `Direction` swapped to `IdP → SP` — directly tests the no-direct-backchannel property (the SP receives the assertion via the browser POST, not from the IdP directly)
- Composite Step 5 Row with `Content` swapped to `SAMLRequest` — tests the request/response symmetry (Steps 2-3 carry the request; Steps 5-6 carry the response)
- Composite Step 2 Row with `Direction` swapped to `SP → IdP` — tests the browser-as-courier point (SP does not talk to IdP directly in SAML SSO)

## Sources

- `[s1]`: OASIS SAML 2.0 Core, "Assertions and Protocols for the OASIS Security Assertion Markup Language (SAML) V2.0" (March 2005, retrieved 2026-04-19, https://docs.oasis-open.org/security/saml/v2.0/saml-core-2.0-os.pdf)
- `[s2]`: OASIS SAML 2.0 Bindings, "Bindings for the OASIS Security Assertion Markup Language (SAML) V2.0" — HTTP Redirect and HTTP POST binding details (March 2005, retrieved 2026-04-19, https://docs.oasis-open.org/security/saml/v2.0/saml-bindings-2.0-os.pdf)
- `[s3]`: OASIS SAML 2.0 Profiles, "Profiles for the OASIS Security Assertion Markup Language (SAML) V2.0" — Web Browser SSO Profile (March 2005, retrieved 2026-04-19, https://docs.oasis-open.org/security/saml/v2.0/saml-profiles-2.0-os.pdf)
