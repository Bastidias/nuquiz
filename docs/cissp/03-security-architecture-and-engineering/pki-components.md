# PKI Components

**Domain:** 3 — Security Architecture and Engineering &nbsp;|&nbsp; **Pattern:** Dimensions &nbsp;|&nbsp; **Tags:** 3.6
**Status:** draft (SME review pending)

The six core components of a Public Key Infrastructure (PKI). The CA issues certificates; the RA verifies certificate-request identities and offloads work from the CA; certificates are the artifacts that bind public keys to identities; CRLs and OCSP are the two revocation-checking mechanisms; key escrow is the optional mechanism for storing copies of private keys for recovery. CISSP testing focuses on the CA-vs-RA distinction and the CRL-vs-OCSP comparison.

| Component | role | who runs it | typical interaction |
|---|---|---|---|
| CA | Issues and signs digital certificates | Certificate Authority operator | Receives validated requests from RA<br>Issues signed certificates<br>Maintains revocation list |
| RA | Verifies certificate-request identity | Registration Authority operator | Validates subscriber identity<br>Forwards approved requests to CA |
| CRL | Lists revoked certificates | CA publishes; relying parties retrieve | Periodically downloaded by clients<br>Cached locally with expiration |
| OCSP | Real-time certificate revocation status | OCSP responder operated by CA | Client queries responder per certificate<br>Receives signed status response |
| Certificate | Binds public key to identity via CA signature | Issued by CA | Presented during TLS handshake<br>Validated against trusted CA roots |
| Key escrow | Stores copy of private key for recovery | Escrow agent or HSM operator | Deposits key copy at issuance<br>Recovers key on authorized request |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. **No parentheticals in cells.** Acronym expansions live in this section.
- **Acronym expansions.** `CA` = Certificate Authority. `RA` = Registration Authority. `CRL` = Certificate Revocation List. `OCSP` = Online Certificate Status Protocol. `PKI` = Public Key Infrastructure.
- **CA vs RA.** The Certificate Authority is the trust anchor — its signature on a certificate is what makes the certificate trustworthy. The Registration Authority is the identity-verification function — it confirms that a certificate request comes from the claimed entity before the CA signs the certificate. The CA must trust the RA's identity verification; the RA does not have signing authority. In small deployments, one organization runs both; in large public CAs, RA functions are often delegated to resellers or partners.
- **CRL vs OCSP.** Both answer "is this certificate revoked?" but with different mechanics.
  - **CRL:** A signed list of revoked certificate serial numbers, published by the CA at a known URL. Clients download the CRL periodically and check certificates against it locally. Pro: scales well (one download serves many checks). Con: stale data between updates.
  - **OCSP:** A real-time query protocol — client sends a certificate serial to an OCSP responder and gets back a signed status (good / revoked / unknown). Pro: fresh data per query. Con: privacy leakage (responder learns which sites the client is visiting), responder availability dependency.
  - **OCSP stapling** is a hybrid: the server periodically queries OCSP itself and "staples" the signed response into TLS handshakes, removing the client's need to query and the privacy leak.
- **Certificate is the artifact, not a service.** A certificate is a signed data structure (X.509 format) binding a public key to identity attributes (subject name, validity period, key usage flags). The cell value reflects that certificates are *issued* by CAs and *consumed* by relying parties — they are not themselves a service or process.
- **Key escrow is policy-driven, not always present.** Some PKI deployments include key escrow (storing copies of subscribers' private keys) for recovery purposes — particularly for encryption keys where loss means data loss. Public web PKI does not use key escrow because subscribers control their own private keys. Government and enterprise PKI may use escrow for encryption keys but not for signing keys (signing keys with copies break non-repudiation).
- **Cross-Concept link.** Sibling Concepts: `certificate-lifecycle` (the Ordered Concept covering certificate Request → Validate → Issue → Use → Revoke → Renew), `digital-signature-process` (the cryptographic mechanics of CA signing).
- **Out of scope for this Concept:** specific X.509 v3 extensions, specific CA hierarchies (root CA, intermediate CA, cross-certification, bridge CA), Certificate Transparency, ACME protocol, CT logs, public-key-pinning (now deprecated), trust-store management.

### Values without a direct public citation

| Cell | Notes |
|---|---|
| All rows × typical interaction | Phrasings | Industry-typical interaction patterns; RFC 5280 [s1] specifies CA / CRL semantics, RFC 6960 [s2] specifies OCSP, but cell phrasings are pedagogical summaries. |

## Engine demo opportunities

- `CA | role → ?` → `Issues and signs digital certificates`
- `RA | role → ?` → `Verifies certificate-request identity`
- `CRL | role → ?` → `Lists revoked certificates`
- `OCSP | role → ?` → `Real-time certificate revocation status`
- `? | role → Lists revoked certificates` → `CRL`
- `? | role → Real-time certificate revocation status` → `OCSP`
- `? | role → Stores copy of private key for recovery` → `Key escrow`
- Composite CA Row with `role` swapped to `Verifies certificate-request identity` — directly tests CA-vs-RA distinction (CA signs; RA verifies)
- Composite CRL Row with `role` swapped to `Real-time certificate revocation status` — tests CRL-vs-OCSP distinction (CRL is a downloaded list; OCSP is real-time query)
- Composite Key escrow Row with `role` swapped to `Issues and signs digital certificates` — tests key-escrow placement (escrow stores keys; CA signs certificates)

## Sources

- `[s1]`: RFC 5280, "Internet X.509 Public Key Infrastructure Certificate and Certificate Revocation List (CRL) Profile" (May 2008, retrieved 2026-04-26, https://datatracker.ietf.org/doc/html/rfc5280)
- `[s2]`: RFC 6960, "X.509 Internet Public Key Infrastructure Online Certificate Status Protocol — OCSP" (June 2013, retrieved 2026-04-26, https://datatracker.ietf.org/doc/html/rfc6960)
- `[s3]`: NIST SP 800-32, "Introduction to Public Key Technology and the Federal PKI Infrastructure" (February 2001, retrieved 2026-04-26, https://csrc.nist.gov/publications/detail/sp/800-32/final)
