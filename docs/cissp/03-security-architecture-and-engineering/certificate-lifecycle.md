# Certificate Lifecycle

**Domain:** 3 — Security Architecture and Engineering &nbsp;|&nbsp; **Pattern:** Ordered &nbsp;|&nbsp; **Tags:** 3.6
**Status:** draft (SME review pending)

The six sequential phases an X.509 digital certificate passes through from initial request to expiration or renewal. Each phase produces a deliverable that the next phase depends on. The CISSP exam tests both the ordering and the matchup between phase and deliverable — particularly that revocation is a distinct phase invoked when keys compromise or contracts terminate, not the same as expiration.

**Layout convention:** rows are ordered chronologically (Phase 1 first, Phase 6 last). Columns progress from identifier (Phase, Name) to action (Key Activity) to deliverable (Typical Output).

| Phase | Name | Key Activity | Typical Output |
|---|---|---|---|
| 1 | Request | Subject generates key pair and submits CSR [s1] | Certificate Signing Request [s1] |
| 2 | Validate | RA verifies subject identity per CA policy [s1] | Validated identity record [s1] |
| 3 | Issue | CA signs certificate binding identity to public key [s1] | Signed X.509 certificate [s1] |
| 4 | Use | Subject deploys certificate for authentication or encryption [s1] | Active certificate in service [s1] |
| 5 | Revoke | CA invalidates certificate before expiration if needed [s1] | CRL entry or OCSP response [s1] |
| 6 | Expire / Renew | Certificate reaches notAfter date [s1] | Renewal certificate or expiration [s1] |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. No parentheticals in cells.
- **Tag 3.6 retained from stub.** Maps to (ISC)² 2024 outline §3.6. Sibling Concept: `pki-components.md` (the actors and infrastructure that operate this lifecycle).
- **Source: RFC 5280 and CA/Browser Forum Baseline Requirements.** RFC 5280 specifies the X.509 PKI profile; CA/B Forum BR governs publicly-trusted CA practices. Both shape the lifecycle this Concept models.
- **Phase 1 — the subject keeps the private key.** A common misconception: that the CA generates the keypair. In practice, the subject generates their own private key and submits only the *Certificate Signing Request* (CSR) containing the public key and identity claims. The CA never sees the private key, which is critical for non-repudiation.
- **Phase 2 — RA vs CA roles.** The Registration Authority (RA) verifies identity per the CA's policy; the Certification Authority (CA) signs the certificate. The two roles are sometimes the same organization (smaller CAs) and sometimes separate (large enterprise PKI). The RA's identity validation is what establishes trust.
- **Phase 5 vs. Phase 6 — revocation vs. expiration.** Both end the certificate's validity. Revocation happens *before* the planned expiration date because something invalidated the certificate (key compromise, role change, contract termination). Expiration happens at the planned `notAfter` date. The CISSP exam tests this distinction directly.
- **CRL vs. OCSP — two revocation-distribution mechanisms.** Certificate Revocation Lists (CRLs) are signed lists the CA periodically publishes; clients download and check. Online Certificate Status Protocol (OCSP) lets clients query the CA's responder for a specific certificate's status in real time. OCSP stapling lets the server present an OCSP response itself, removing the per-client query. Newer mechanisms (CRLite, short-lived certificates) are emerging.
- **The renewal-vs-rekey distinction.** A *renewal* extends the validity of an existing keypair with a new certificate. A *rekey* (technically a different operation) generates a new keypair and gets a new certificate for it. Renewal is operationally lighter; rekey is recommended periodically because long-lived keys accumulate compromise risk.
- **Short-lived certificates are an emerging pattern.** Let's Encrypt (90-day) and ACME-based automation have made it practical to issue certificates with very short validity, eliminating the need for revocation infrastructure (an attacker can use a compromised certificate only for hours, not years). This shifts the lifecycle: Phase 5 (Revoke) becomes less relevant; Phase 6 (Renew) becomes more frequent.
- **Gaps marked `[needs source]`:** none — all Facts trace to RFC 5280 or CA/B Forum guidance.

## Engine demo opportunities

- `? | Name → Validate` → Phase 2
- `Phase 5 | Key Activity → ?` → `CA invalidates certificate before expiration if needed`
- `? | Typical Output → Certificate Signing Request` → Phase 1 / Request
- `Issue | Typical Output → ?` → `Signed X.509 certificate`
- Sequence verification: `Phase 2 → ? → Phase 4` → Phase 3 (Issue)
- Composite Row profile: Request across all Columns with `Typical Output` swapped to `CRL entry or OCSP response` (Phase 5's value)

## Sources

- `[s1]`: RFC 5280 *Internet X.509 Public Key Infrastructure Certificate and Certificate Revocation List (CRL) Profile*, May 2008 (retrieved 2026-04-26, https://www.rfc-editor.org/rfc/rfc5280)
- `[s2]`: CA/Browser Forum *Baseline Requirements for the Issuance and Management of Publicly-Trusted Certificates* (retrieved 2026-04-26, https://cabforum.org/baseline-requirements-documents/)
- `[s3]`: (ISC)² CISSP Certification Exam Outline, effective 2024-04-15, Domain 3 §3.6 (retrieved 2026-04-26, https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline)
