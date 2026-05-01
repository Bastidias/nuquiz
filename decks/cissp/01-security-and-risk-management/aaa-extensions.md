# AAA and Extensions

**Domain:** 1 — Security and Risk Management &nbsp;|&nbsp; **Pattern:** Dimensions &nbsp;|&nbsp; **Tags:** 1.2
**Status:** draft (SME review pending)

The five access-control primitives — Identification, Authentication, Authorization, Accounting, and Auditing — that together form what RFC AAA documents call *AAA*. The original AAA (Authentication, Authorization, Accounting) is the network-authentication framework codified in RADIUS and DIAMETER. CISSP courseware extends it forward to Identification (the subject *claims* an identity before authentication) and back to Auditing (the *review* of the accounting records). The exam tests both the per-component definition and the ordering Identification → Authentication → Authorization → Accounting → Auditing.

| component | definition | mechanism | example |
|---|---|---|---|
| Identification | Claim of identity by a subject [s1] | Username [s1]<br>Subject identifier [s1] | Entering a username at login [s1] |
| Authentication | Verification of claimed identity [s2] | Password [s2]<br>Cryptographic key [s2]<br>Biometric sample [s2] | Entering password at login [s2] |
| Authorization | Granting access rights to authenticated subject [s2] | Access control list [s2]<br>Role-based policy [s2] | RBAC role assignment [s2] |
| Accounting | Recording subject actions and resource usage [s4] | Session log entry [s4]<br>Audit log record [s4] | RADIUS accounting record [s4] |
| Auditing | Independent review of accounting records [s2] | Log analysis [s2]<br>Compliance review [s2] | SOC 2 audit [needs source] |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. No parentheticals in cells.
- **Tag 1.2 retained from stub.** Maps to (ISC)² 2024 outline §1.2 *Understand and apply security concepts*. AAA touches Domain 5 (Identity and Access Management) heavily; the Domain 1 framing here is the *conceptual* one. Implementation specifics (Kerberos, OAuth, SAML, MFA) live in Domain 5 Concepts.
- **Identification ≠ Authentication.** This is the most-tested distinction. Identification is the *claim* ("I am Alice"); authentication is the *proof* ("Here is my password / key / biometric"). Identification must precede authentication — you cannot verify what was not first claimed.
- **Why "AAA" became "AAAA" or "IAAAA".** Original RFC AAA (RADIUS/DIAMETER framework) covered three: Authentication, Authorization, Accounting. CISSP courseware adds Identification (since AAA is meaningless without a claimed identity) and Auditing (since accounting data needs review to be useful). Some references also add a sixth: Non-repudiation. The five-component Concept here matches the most-tested CISSP framing.
- **Accounting vs. Auditing.** Accounting *records* what happened. Auditing *examines* the records to detect anomalies, verify compliance, or support investigations. They are sequential: accounting must happen first; auditing operates on the accounting output. The most common CISSP wrong-answer scenario: claiming "audit logs" prevent fraud (they only support detection after the fact).
- **AAA at the network layer.** RADIUS (RFC 2865) and DIAMETER (RFC 6733) implement AAA for network access — when a user dials in, connects to a VPN, or joins a Wi-Fi network. The "Accounting" component in those protocols is what feeds telecom billing systems and forensic timelines. RADIUS accounting records [s4] are the canonical example.
- **Gaps marked `[needs source]`:** one Fact — "SOC 2 audit" as the canonical Auditing example. SOC 2 is widely understood but the example tying it to the auditing primitive is not yet sourced to a primary publication.

### Tricky distractors

- **Identification ≠ Authentication.** Claim vs proof. Wrong-answer pattern: collapsing them — single most-tested AAA distinction.
- **Accounting records; Auditing reviews.** Sequential. Wrong-answer pattern: claiming audit prevents fraud — it detects after the fact.
- **AAA = Authentication/Authorization/Accounting (RFC).** CISSP extends to IAAAA. Wrong-answer pattern: insisting on three-letter AAA when CISSP framing uses five.
- **Authorization happens after authentication.** Order matters. Wrong-answer pattern: granting authorization without authentication — undefined behavior.
- **Auditing requires Accounting data.** Without records, no audit. Wrong-answer pattern: claiming you can audit without accounting logs — there's nothing to review.
- **Non-repudiation is sometimes added as 6th.** Some references include it. Wrong-answer pattern: claiming non-repudiation is universally part of AAA — varies by source.

## Engine demo opportunities

- `? | definition → Claim of identity by a subject` → Identification
- `Authentication | mechanism → ?` → `Password`, `Cryptographic key`, or `Biometric sample`
- `? | example → RADIUS accounting record` → Accounting
- `Authorization | definition → ?` → `Granting access rights to authenticated subject`
- Sequence verification: given a list of unordered components, recover the AAA ordering Identification → Authentication → Authorization → Accounting → Auditing
- Composite Row profile: Authentication across all Columns with `definition` swapped to `Recording subject actions and resource usage` (Accounting's value)

## Sources

- `[s1]`: NIST SP 800-63A *Digital Identity Guidelines: Enrollment and Identity Proofing*, June 2017 (retrieved 2026-04-26, https://csrc.nist.gov/pubs/sp/800/63/a/final)
- `[s2]`: NIST SP 800-63B *Digital Identity Guidelines: Authentication and Lifecycle Management*, June 2017 (retrieved 2026-04-26, https://csrc.nist.gov/pubs/sp/800/63/b/final)
- `[s3]`: NIST SP 800-63C *Digital Identity Guidelines: Federation and Assertions*, June 2017 (retrieved 2026-04-26, https://csrc.nist.gov/pubs/sp/800/63/c/final)
- `[s4]`: RFC 2865 *Remote Authentication Dial In User Service (RADIUS)*, June 2000, and RFC 6733 *Diameter Base Protocol*, October 2012 — for AAA framework framing and accounting record semantics (retrieved 2026-04-26, https://www.rfc-editor.org/rfc/rfc2865 and https://www.rfc-editor.org/rfc/rfc6733)
- `[s5]`: (ISC)² CISSP Certification Exam Outline, effective 2024-04-15, Domain 1 §1.2 *Understand and apply security concepts* (retrieved 2026-04-26, https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline)
