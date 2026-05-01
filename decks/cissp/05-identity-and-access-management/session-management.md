# Session Management Controls

**Domain:** 5 — Identity and Access Management &nbsp;|&nbsp; **Pattern:** Dimensions &nbsp;|&nbsp; **Tags:** 5.6, 5.2

**Status:** draft (SME review pending)

The six session-management controls CISSP candidates are expected to discriminate. Authentication establishes *who* the user is at login; session management maintains the authenticated state across subsequent requests. Each control addresses a distinct session-attack vector — predictable session IDs enable hijacking, missing timeouts enable abandoned-session takeover, missing cookie attributes enable XSS-based theft, missing regeneration enables fixation, and so on. The CISSP exam tests both the per-control mechanism and the matchup with the attack each defends against.

| Control | mechanism | attack mitigated | OWASP reference |
|---|---|---|---|
| Session ID entropy | Generate session identifier from cryptographic random source [s1] | Session prediction<br>Session brute force [s1] | OWASP Session Management Cheat Sheet [s1] |
| Idle timeout | Invalidate session after period of inactivity [s1] | Abandoned-session takeover<br>Walk-up attacks on unattended workstations | OWASP Session Management Cheat Sheet [s1] |
| Absolute timeout | Invalidate session after fixed maximum duration regardless of activity [s1] | Long-running session compromise<br>Stolen session reuse over time | OWASP Session Management Cheat Sheet [s1] |
| Cookie security attributes | Set Secure flag<br>Set HttpOnly flag<br>Set SameSite attribute [s1] | Cookie theft via cleartext transmission<br>Cookie theft via XSS<br>CSRF via cross-site cookie inclusion [s1] | OWASP Session Management Cheat Sheet [s1] |
| Session regeneration | Issue new session identifier on authentication state change [s1] | Session fixation [s1] | OWASP Session Management Cheat Sheet [s1] |
| Concurrent session control | Limit or detect simultaneous active sessions per account | Undetected account compromise<br>Shared-credential abuse | OWASP Session Management Cheat Sheet [s1] |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. **No parentheticals in cells.** Cookie attribute names and protocol terms are atomic identifiers.
- **Acronym expansions.** `XSS` = Cross-Site Scripting. `CSRF` = Cross-Site Request Forgery. `SAML` = Security Assertion Markup Language. `JWT` = JSON Web Token. `IdP` = Identity Provider.
- **Session management is post-authentication.** Authentication answers "is this the right user" at one moment. Session management answers "is this still the same authenticated user" across many subsequent requests. The two disciplines have different threat models — auth attacks target credentials; session attacks target the authenticated state.
- **Session ID entropy.** OWASP recommends at least 64 bits of entropy from a cryptographically secure random number generator [s1]. Session IDs derived from sequential counters, timestamps, or weak PRNGs are predictable — an attacker can guess valid IDs and impersonate other users. The session ID *is* the authentication credential after login; it must be treated with the same care as a password.
- **Idle vs absolute timeout — both are required.** Idle timeout limits the window of opportunity for walk-up attacks (user steps away, attacker takes over). Absolute timeout limits the window for any compromised session, even one continuously used by the legitimate user. NIST SP 800-63B [s2] recommends both: an idle timeout (often 15-30 minutes for general use, shorter for sensitive operations) and an absolute timeout (often 12-24 hours).
- **Cookie security attributes — three matter.** `Secure` prevents the cookie from being sent over plaintext HTTP — essential for any session cookie because HTTP transmission exposes the session ID to network observers. `HttpOnly` prevents JavaScript from reading the cookie — defeats XSS-based session theft. `SameSite` (Strict, Lax, or None) controls whether the cookie is sent on cross-site requests — defeats CSRF by withholding the cookie when the request originates from another site.
- **Session regeneration defeats fixation.** In a session fixation attack, the attacker plants a known session ID on the victim (e.g., via a crafted login URL); the victim authenticates, and the session ID becomes authenticated. The attacker then uses the same ID to impersonate the victim. Mitigation: at every privilege change (login, role assumption, admin elevation), discard the old session ID and issue a fresh one.
- **Concurrent session control.** Some applications enforce a single active session per account (banking, government); detecting a second active session may indicate account compromise. Less restrictive applications allow multiple sessions but log them for auditing. Sibling Concept `account-management-metrics` in D6 covers anomaly detection on session activity.
- **Logout must invalidate server-side state.** A common implementation flaw: client-side "logout" that deletes the cookie locally but does not invalidate the session on the server. Until server-side invalidation, the session ID still works if captured. CISSP framing: logout is a *server-side* operation that destroys the session record; the cookie deletion is a side effect.
- **Session tokens vs. JWTs.** Traditional session management uses an opaque session ID with state stored on the server. JWT-based "stateless" sessions encode user state in the token itself. The trade-offs: opaque IDs can be revoked by deleting server state; JWTs cannot be revoked before expiry without an additional revocation list, undermining the stateless property. CISSP testing rarely goes this deep; the high-level distinction is enough.
- **Cross-Concept link.** Sibling `oauth-authorization-code-flow` covers the OAuth-specific session lifecycle (authorization code → access token → refresh token); session management at the application layer is downstream of the federation flow. `password-attacks` covers attacks on the credential side; this Concept covers attacks on the session-state side.
- **Out of scope for this Concept:** specific session-storage backends (Redis, Memcached, database), session replication for high-availability deployments, OAuth token-binding and DPoP, mTLS client-certificate session binding, mobile-app session lifecycle (which combines web sessions with platform-specific token storage), single-sign-on (SSO) session propagation across applications.

### Tricky distractors

- **Idle vs Absolute timeout.** Both required. Idle = inactivity-based; Absolute = fixed maximum regardless of activity. Wrong-answer pattern: claiming idle timeout alone is sufficient — a continuously-used compromised session never trips idle.
- **Logout is server-side.** Cookie deletion alone is insufficient. Wrong-answer pattern: claiming client-side logout suffices — captured session ID still works against server.
- **HttpOnly defeats XSS-based cookie theft, not all XSS.** XSS can still attack the page in other ways. Wrong-answer pattern: claiming HttpOnly prevents XSS — it only prevents JavaScript from reading the cookie.
- **Secure attribute requires HTTPS.** Cookie won't be sent on HTTP at all. Wrong-answer pattern: claiming Secure flag works on HTTP sites — it's specifically for TLS-protected sites.
- **Session fixation is defeated by regeneration.** Issue new session ID on auth state change. Wrong-answer pattern: claiming session fixation is the same as session hijacking — fixation plants a known ID; hijacking captures one.
- **Session ID needs cryptographic randomness.** Sequential or timestamp-based IDs are predictable. Wrong-answer pattern: claiming any unique value works — must be unguessable, not just unique.

### Values without a direct public citation

| Cell | Value | Why unsourced |
|---|---|---|
| Idle timeout × attack mitigated | `Abandoned-session takeover`, `Walk-up attacks on unattended workstations` | Practitioner consensus framing of the threat; OWASP Cheat Sheet [s1] discusses the timeout mechanism without using these specific attack labels. |
| Absolute timeout × attack mitigated | `Long-running session compromise`, `Stolen session reuse over time` | Same — practitioner framing. |
| Concurrent session control × all cells | — | OWASP and NIST address concurrent sessions in passing; no canonical primary publication enumerates the controls in this exact framing. Cell values reflect industry practice. |

## Engine demo opportunities

- `Session ID entropy | mechanism → ?` → `Generate session identifier from cryptographic random source`
- `Cookie security attributes | mechanism → ?` → `Set Secure flag`, `Set HttpOnly flag`, `Set SameSite attribute`
- `? | attack mitigated → Session fixation` → `Session regeneration`
- `? | attack mitigated → Session prediction` → `Session ID entropy` (sub-Fact in multi-Fact cell)
- `Idle timeout | mechanism → ?` → `Invalidate session after period of inactivity`
- `Absolute timeout | mechanism → ?` → `Invalidate session after fixed maximum duration regardless of activity`
- `? | mechanism → Issue new session identifier on authentication state change` → `Session regeneration`
- `? | attack mitigated → Cookie theft via XSS` → `Cookie security attributes` (sub-Fact pointing at HttpOnly)
- Composite Idle timeout Row with `mechanism` swapped to `Invalidate session after fixed maximum duration regardless of activity` — directly tests the idle-vs-absolute distinction (idle = inactivity-based; absolute = fixed-duration-based)
- Composite Cookie security attributes Row with `mechanism` removing `Set HttpOnly flag` — tests that HttpOnly is the XSS-cookie-theft defense; without it, the row no longer covers that attack
- Composite Session regeneration Row with `attack mitigated` swapped to `Session prediction` — tests session-fixation-vs-prediction (regeneration defeats fixation; entropy defeats prediction)

## Sources

- `[s1]`: OWASP, "Session Management Cheat Sheet" — session ID entropy, timeout, cookie attributes, session regeneration guidance (retrieved 2026-04-26, https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html)
- `[s2]`: NIST SP 800-63B, "Digital Identity Guidelines: Authentication and Lifecycle Management" — session management requirements at AAL1/2/3, including reauthentication and session timeouts (June 2017, retrieved 2026-04-26, https://pages.nist.gov/800-63-3/sp800-63b.html)
- `[s3]`: (ISC)² CISSP Certification Exam Outline, effective 2024-04-15, Domain 5 §5.6 *Implement authentication systems* and §5.2 *Design identification and authentication strategy* (retrieved 2026-04-26, https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline)
- `[s4]`: RFC 6265, "HTTP State Management Mechanism" — cookie attribute specification including Secure, HttpOnly, SameSite (April 2011 with SameSite added via RFC 6265bis, retrieved 2026-04-26, https://datatracker.ietf.org/doc/html/rfc6265)
