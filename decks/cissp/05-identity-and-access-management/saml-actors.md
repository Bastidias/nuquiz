# SAML Actors

**Domain:** 5 — Identity and Access Management &nbsp;|&nbsp; **Pattern:** Dimensions &nbsp;|&nbsp; **Tags:** 5.3
**Status:** draft (SME review pending)

The four SAML roles CISSP expects candidates to name and distinguish. Three are actors (IdP, SP, Subject); the fourth (Assertion) is the artifact that passes between them. Paired Concept to `saml-sso-flow` — this is the "nouns" Concept; the flow is the "verbs". The most-tested item is the IdP/SP direction of the assertion (IdP issues, SP consumes), which is the opposite of the authentication request direction (SP issues the request, IdP consumes it).

| Name | category | role | relationship |
|---|---|---|---|
| IdP | Actor | Authenticator [s1] | Issues assertions [s1] |
| SP | Actor | Resource guardian | Consumes assertions [s1] |
| Subject | Actor | Named identity [s1] | Authenticates to IdP |
| Assertion | Artifact | Authentication attestation [s1] | Issued by IdP<br>Consumed by SP |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. **No parentheticals in cells.** Acronym expansions (`IdP` = Identity Provider, `SP` = Service Provider) go in this section.
- **Acronyms.** `IdP` = Identity Provider (sometimes `IDP` in SAML spec text). `SP` = Service Provider (sometimes called *Relying Party* in OIDC / WS-Fed contexts). `Subject` is the SAML spec term for the authenticated entity (typically a user).
- **Direction of the request vs the assertion.** In SP-initiated SSO, the SP produces a `SAMLRequest` (authentication request) and the IdP consumes it. The IdP then produces a `SAMLResponse` containing an `Assertion`, and the SP consumes that. So the SP is both a producer (of the request) and a consumer (of the assertion) within one flow — this is one of the most commonly-confused exam points.
- **Assertion is the trust root.** The Assertion is a signed XML element that carries the IdP's attestation — "I authenticated this Subject at this time via this method, and here are the attributes I'm willing to share." The SP trusts the Assertion because it trusts the IdP's signing key, which was exchanged out-of-band during federation setup (metadata exchange).
- **Relying Party = SP.** OIDC and WS-Federation call the assertion consumer the *Relying Party*. SAML calls it the *Service Provider*. Both refer to the same role — the application that trusts the IdP's authentication result and grants access based on it.
- **Assertion structure.** A SAML Assertion contains: a Subject element (who), AuthnStatement (how / when authenticated), optional AttributeStatement (user attributes), optional AuthzDecisionStatement (rarely used — most SAML deployments make authorization decisions at the SP after receiving attributes, not via AuthzDecisionStatement). Covered here at category level; the XML schema specifics are out of scope.
- **Out of scope for this Concept:** the SAML SSO flow step-by-step (separate Concept — `saml-sso-flow`), assertion signing/encryption mechanics, SAML metadata format, name identifier formats (transient, persistent, emailAddress, X.509), session index and logout, IdP-discovery (where-are-you-from) protocols.

### Tricky distractors

- **IdP issues; SP consumes.** The Assertion flows from IdP to SP. Wrong-answer pattern: claiming the SP issues assertions — only the IdP does.
- **SP issues the AuthnRequest.** Authentication request direction is opposite of assertion direction. Wrong-answer pattern: claiming the IdP initiates the request — in SP-initiated SSO, the SP does.
- **Relying Party = SP.** OIDC and WS-Fed call it Relying Party; SAML calls it Service Provider. Wrong-answer pattern: treating Relying Party and Service Provider as different roles.
- **Subject is the user (typically).** The Subject is the authenticated entity in the assertion. Wrong-answer pattern: confusing Subject with Service Provider — Subject is who, SP is where they're going.
- **Assertion is an artifact, not an actor.** The Assertion is the signed XML token, not a participant. Wrong-answer pattern: listing Assertion alongside IdP/SP/Subject as a fourth actor.
- **Trust comes from IdP signing key.** SP validates the assertion via the IdP's signing certificate exchanged during federation setup. Wrong-answer pattern: claiming SAML trust derives from TLS — TLS protects transport; assertion signature is the cryptographic root of trust.

### Values without a direct public citation

| Cell | Value | Why unsourced |
|---|---|---|
| SP × role | `Resource guardian` | CISSP pedagogical framing; OASIS SAML 2.0 Core [s1] describes the SP as the "consumer" of assertions without summarizing its role as "resource guardian." |

## Engine demo opportunities

- `IdP | relationship → ?` → `Issues assertions`
- `SP | relationship → ?` → `Consumes assertions`
- `Assertion | category → ?` → `Artifact`
- `? | category → Actor` → `IdP`, `SP`, `Subject` — shared-Value select-all
- `? | role → Authenticator` → `IdP`
- `? | relationship → Issues assertions` → `IdP`
- Composite SP Row with `relationship` swapped to `Issues assertions` — directly tests the IdP/SP direction (IdP issues; SP consumes)
- Composite Assertion Row with `category` swapped to `Actor` — tests the actor-vs-artifact distinction (Assertion is an artifact, not an actor)
- Composite IdP Row with `role` swapped to `Resource guardian` — tests the role-swap confusion (IdP authenticates; SP guards resources)

## Sources

- `[s1]`: OASIS SAML 2.0 Core, "Assertions and Protocols for the OASIS Security Assertion Markup Language (SAML) V2.0" — defines Subject, Assertion, AuthnStatement (March 2005, retrieved 2026-04-19, https://docs.oasis-open.org/security/saml/v2.0/saml-core-2.0-os.pdf)
- `[s2]`: OASIS SAML 2.0 Glossary, "Glossary for the OASIS Security Assertion Markup Language (SAML) V2.0" — defines Identity Provider, Service Provider (March 2005, retrieved 2026-04-19, https://docs.oasis-open.org/security/saml/v2.0/saml-glossary-2.0-os.pdf)
