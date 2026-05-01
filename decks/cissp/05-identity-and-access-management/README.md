# Domain 5: Identity and Access Management

**Weight:** 13% &nbsp;|&nbsp; **Target facts:** ~650 &nbsp;|&nbsp; **Status:** Concept scaffold drafted, SME review pending

Heavy on protocol comparisons (Kerberos, SAML, OAuth, OIDC) and Ordered flow Concepts (Kerberos handshake, SAML SSO, OAuth grant flows).

---

## (ISC)² Sub-objectives (verify against current outline)

| # | Sub-objective |
|---|---|
| 5.1 | Control physical and logical access to assets |
| 5.2 | Manage identification and authentication of people, devices, and services |
| 5.3 | Federated identity with a third-party service |
| 5.4 | Implement and manage authorization mechanisms |
| 5.5 | Manage the identity and access provisioning lifecycle |
| 5.6 | Implement authentication systems |

---

## Proposed Concepts (SME to confirm and refine)

### 5.1 Access Control Foundations

| Concept | Pattern | Rows | Columns | Tags | Est. facts |
|---|---|---|---|---|---|
| Logical vs physical access controls | Dimensions | Logical, Physical, Administrative | mechanism, example, typical owner | 5.1 | ~12 |
| Access control matrices vs ACLs vs capability lists | Dimensions | Matrix, ACL, Capability list | structure, indexed by, typical use, weakness | 5.1 | ~16 |

### 5.2 Identification and Authentication

| Concept | Pattern | Rows | Columns | Tags | Est. facts |
|---|---|---|---|---|---|
| Authentication factors | Dimensions | Knowledge (something you know), Possession (have), Inherence (are), Behavior (do), Location (where) | example, strengths, typical attacks | 5.2 | ~20 |
| Biometric error types | Dimensions | FRR (Type 1), FAR (Type 2), CER, enrollment time, throughput time | definition, what it measures, target value | 5.2 | ~15 |
| Biometric modalities | Dimensions | Fingerprint, Iris, Retina, Voice, Face, Hand geometry, Behavioral | accuracy, intrusiveness, cost, typical attack | 5.2 | ~28 |
| Password attacks | Dimensions | Brute force, Dictionary, Rainbow table, Credential stuffing, Spraying, Phishing | mechanism, mitigation | 5.2 | ~18 |
| MFA methods | Dimensions | TOTP/HOTP, Push notification, SMS code, Hardware token (FIDO2/WebAuthn), Smart card | factor type, security strength, weakness | 5.2 | ~25 |

### 5.3 Federated Identity

| Concept | Pattern | Rows | Columns | Tags | Est. facts |
|---|---|---|---|---|---|
| Federation protocols | Dimensions | SAML 2.0, OAuth 2.0, OIDC, WS-Federation | purpose, message format, typical use, key actors | 5.3 | ~24 |
| SAML actors | Dimensions | IdP, SP, Subject, Assertion | role, what they produce or consume | 5.3 | ~12 |
| OAuth 2.0 roles | Dimensions | Resource Owner, Client, Authorization Server, Resource Server | role, what they provide | 5.3 | ~12 |
| OAuth grant types | Dimensions | Authorization code, Implicit (deprecated), Client credentials, Resource owner password (deprecated), Device code, PKCE | when used, security profile, status | 5.3 | ~24 |

### 5.4 Authorization

| Concept | Pattern | Rows | Columns | Tags | Est. facts |
|---|---|---|---|---|---|
| Access control models | Dimensions | DAC, MAC, RBAC, ABAC, RuBAC | who decides access, granularity, typical use, strength, weakness | 5.4 | ~30 |
| MAC label types | Dimensions | Unclassified, Confidential, Secret, Top Secret | data sensitivity, clearance required | 5.4 | ~8 |
| Authorization models comparison | Dimensions | Subject-based, Object-based, Context-based | basis for decision, example, scalability | 5.4 | ~12 |

### 5.5 Identity Lifecycle

| Concept | Pattern | Rows | Columns | Tags | Est. facts |
|---|---|---|---|---|---|
| Identity lifecycle phases | Ordered | Phase 1-5 (Provisioning, Authentication, Access management, Review, Deprovisioning) | Name, Key Activity, Typical Tools | 5.5 | ~20 |
| Account types | Dimensions | User, Privileged, Service, Shared, Guest, External | typical permissions, audit frequency, risk profile | 5.5 | ~24 |
| Account review activities | Dimensions | Access certification, Privilege review, Dormant account audit, SoD review | frequency, who performs, output | 5.5 | ~16 |

### 5.6 Authentication Systems

| Concept | Pattern | Rows | Columns | Tags | Est. facts |
|---|---|---|---|---|---|
| Kerberos components | Dimensions | KDC, AS, TGS, TGT, Service Ticket, Realm, Principal | role, what it issues or holds | 5.6 | ~21 |
| Kerberos authentication flow | Ordered | Step 1-6 (AS-REQ, AS-REP with TGT, TGS-REQ, TGS-REP with Service Ticket, AP-REQ, AP-REP) | Name, Direction, Content, Purpose | 5.6 | ~24 |
| SAML SSO flow | Ordered | Step 1-7 (User → SP, SP redirect to IdP, IdP authenticates, IdP issues assertion, Assertion to SP, SP creates session, Resource access) | Name, Direction, Content | 5.6 | ~21 |
| OAuth authorization code flow | Ordered | Step 1-6 (Authz request, User consent, Authz code, Token exchange, Access token, Resource access) | Name, Direction, Content | 5.6 | ~18 |
| Authentication system comparison | Dimensions | Kerberos, SAML, OAuth, OIDC, FIDO2 | purpose, message format, federation support, typical environment | 5.6 | ~20 |

---

## Domain 5 Totals

- **Concepts:** ~22
- **Estimated facts:** ~430-470
- **Gap to target:** ~180. Expand by adding more flow detail (Kerberos error cases, OAuth flow variants), more biometric specifics, deeper RBAC vs ABAC comparison.

---

## SME Review Checklist

- [ ] Sub-objective numbering matches current (ISC)² outline
- [ ] Federation protocol coverage current (OIDC inclusion, SAML version)
- [ ] OAuth grant types — should we include all 6 or just commonly-tested 3?
- [ ] Kerberos: confirm 6-step model vs 5-step textbook simplification
- [ ] FIDO2/WebAuthn coverage — increasing in (ISC)² emphasis post-2024
- [ ] Patterns appropriate
- [ ] Fact count estimates realistic

---

## Concept Files (to be created)

```
logical-vs-physical-controls.md        access-control-matrices.md
authentication-factors.md              biometric-error-types.md
biometric-modalities.md                password-attacks.md
mfa-methods.md                         federation-protocols.md
saml-actors.md                         oauth-roles.md
oauth-grant-types.md                   access-control-models.md
mac-label-types.md                     authorization-models.md
identity-lifecycle-phases.md           account-types.md
account-review-activities.md           kerberos-components.md
kerberos-authentication-flow.md        saml-sso-flow.md
oauth-authorization-code-flow.md       authentication-system-comparison.md
```
