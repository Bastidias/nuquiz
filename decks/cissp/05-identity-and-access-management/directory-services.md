# Directory Services

**Domain:** 5 — Identity and Access Management &nbsp;|&nbsp; **Pattern:** Dimensions &nbsp;|&nbsp; **Tags:** 5.5, 5.6

**Status:** draft (SME review pending)

The five directory-service technologies CISSP candidates are expected to discriminate. Directories are hierarchical databases optimized for read-heavy identity lookups — accounts, groups, machines, certificates, and security policies. LDAP is the dominant protocol; Active Directory is the dominant implementation; X.500 is the OSI-stack ancestor that defined the data model; NIS and NIS+ are the legacy Unix predecessors. The CISSP exam tests both the protocol-to-port pairings and the LDAP-vs-AD distinction (LDAP is a protocol; AD is a product that uses LDAP plus Kerberos plus DNS plus SMB).

| Service | underlying standard | port | authentication | typical use |
|---|---|---|---|---|
| LDAP | RFC 4511 [s1] | TCP 389 [s1] | Simple bind<br>SASL bind [s1] | Cross-platform identity directory [s1] |
| LDAPS | LDAP over TLS [s2] | TCP 636 [s2] | Simple bind over TLS<br>SASL bind over TLS [s2] | LDAP requiring confidentiality |
| Active Directory | LDAP plus Kerberos plus DNS plus SMB [s3] | TCP 389<br>TCP 636<br>TCP 88<br>TCP 445 [s3] | Kerberos<br>NTLM<br>LDAP bind [s3] | Windows enterprise environments [s3] |
| X.500 | ITU-T X.500 series [s4] | TCP and OSI stack | DAP authentication [s4] | OSI-era directory and PKI directory model [s4] |
| NIS | Sun Yellow Pages [s5] | UDP 111 portmapper [s5] | Cleartext password lookup [s5] | Legacy Unix account directory [s5] |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. **No parentheticals in cells.** Acronym expansions live in this section.
- **Acronym expansions.** `LDAP` = Lightweight Directory Access Protocol. `LDAPS` = LDAP over TLS (sometimes called LDAP-over-SSL historically). `AD` = Active Directory. `DAP` = Directory Access Protocol (the X.500 native protocol). `NIS` = Network Information Service (originally Yellow Pages, renamed for trademark reasons). `NIS+` = NIS Plus (Sun's NIS successor with stronger security; also legacy). `SASL` = Simple Authentication and Security Layer. `NTLM` = NT LAN Manager. `DN` = Distinguished Name. `RDN` = Relative Distinguished Name.
- **LDAP is "lightweight" because it skipped the OSI stack.** X.500 / DAP was designed to run over the full OSI protocol stack (rare in practice). LDAP stripped that down to TCP/IP and simplified the operations — the "lightweight" name distinguishes it from DAP. Modern LDAP (RFC 4510 series) is the dominant directory protocol; X.500-native DAP is essentially extinct outside academic and PKI-historical contexts.
- **LDAP DN structure.** Distinguished Names are hierarchical, written from leaf to root: `cn=Alice Smith,ou=Engineering,dc=example,dc=com`. The leftmost component is the Relative Distinguished Name (RDN); the full DN is the unique identifier within the directory. This naming convention is inherited from X.500. CISSP exam may test the DN format directly.
- **LDAP operations.** RFC 4511 defines: Bind (authenticate), Unbind (close session), Search (query), Compare (test attribute value), Modify, Add, Delete, ModifyDN (rename or move), and Extended (vendor extensions). Bind and Search are the most-used operations and the most exam-tested.
- **Simple bind vs SASL bind.** Simple bind sends the DN and password (cleartext unless wrapped in TLS — which is why LDAPS or StartTLS is essential). SASL bind supports stronger authentication mechanisms (DIGEST-MD5, GSSAPI for Kerberos, EXTERNAL for client certificates). Production LDAP deployments use either LDAPS+simple bind or SASL/GSSAPI.
- **LDAPS vs StartTLS.** LDAPS opens an already-TLS-wrapped connection on port 636 (separate-port TLS). StartTLS opens a plaintext LDAP connection on port 389 and upgrades it to TLS via the StartTLS extended operation. Functionally equivalent for confidentiality; LDAPS is more common in legacy deployments, StartTLS is preferred per RFC 4513 and Microsoft's modern guidance.
- **Active Directory is more than LDAP.** AD uses LDAP (port 389/636) for directory queries, Kerberos (port 88) for authentication, DNS (port 53) for service location, and SMB (port 445) for file/printer access and Group Policy distribution. CISSP framing: AD is a *product* that uses LDAP; LDAP is a *protocol* that AD implements.
- **NIS is insecure by design.** Cleartext password hashes are exported to any host that can reach the NIS server; account lookups are unauthenticated. NIS+ added authentication and authorization but adoption was limited. Both are legacy and should not be deployed today; LDAP (with Kerberos for authentication) replaced them in modern Unix environments.
- **Cross-Concept link.** Sibling Concept `kerberos-flow` covers Kerberos as the authentication protocol AD uses. `kerberos-components` covers the AD-relevant Kerberos terminology (KDC, AS, TGS, TGT, service ticket). `authentication-system-comparison` covers Kerberos / SAML / OAuth / OIDC / FIDO2 as authentication systems independent of the directory.
- **Out of scope for this Concept:** specific LDAP schema (objectClass, attribute syntax), AD-specific objects (User, Computer, Group, OU, GPO), Group Policy mechanics, AD trust models (forest, domain, external, shortcut, realm), AD replication topology, FSMO roles, NIS+ specifics (rarely tested), Novell eDirectory, OpenDirectory (Apple), Azure Active Directory / Microsoft Entra ID (covered indirectly in `federation-protocols`), LDAP injection attacks (covered in `common-injection-types` in D8).

### Tricky distractors

- **LDAP is a protocol; AD is a product.** AD implements LDAP and adds Kerberos, DNS, SMB. Wrong-answer pattern: equating LDAP with AD — LDAP is one component of AD.
- **LDAP port 389; LDAPS port 636.** Two separate ports. Wrong-answer pattern: swapping them or claiming LDAP is encrypted by default — port 389 is cleartext.
- **LDAPS vs StartTLS.** Different mechanisms for the same goal. LDAPS = TLS from connection start on port 636. StartTLS = plaintext LDAP on 389 upgraded to TLS. Wrong-answer pattern: claiming they're the same protocol — different ports and connection patterns.
- **Simple bind sends password.** Cleartext unless TLS-wrapped. Wrong-answer pattern: claiming simple bind is secure on its own — must be wrapped in TLS.
- **NIS is cleartext and insecure.** Legacy. Wrong-answer pattern: recommending NIS for new Unix deployments — replaced by LDAP+Kerberos.
- **DN is leaf-to-root.** `cn=Alice,ou=Eng,dc=example,dc=com` reads from most specific to least. Wrong-answer pattern: claiming DN reads root-first — it's the opposite.
- **X.500 is the parent standard.** LDAP is a simplified subset. Wrong-answer pattern: claiming X.500 is newer than LDAP — X.500 (1988) predates LDAP (1993).

### Values without a direct public citation

| Cell | Value | Why unsourced |
|---|---|---|
| LDAPS × authentication | `Simple bind over TLS`, `SASL bind over TLS` | Same mechanisms as LDAP but TLS-wrapped; not separately enumerated in a primary specification — it's LDAP authentication run over a TLS-protected channel. |
| LDAPS × typical use | `LDAP requiring confidentiality` | Practitioner framing; RFC 2830 (StartTLS) and historical LDAPS practice cover the mechanism without naming a specific use case. |
| Active Directory × all cells | Composite values | AD is a Microsoft product; specifications are spread across MS-ADTS, MS-KILE, and other Microsoft Open Specifications documents [s3]. Cell values reflect industry-standard summaries rather than direct quotations from a single primary source. |
| X.500 × port | `TCP and OSI stack` | X.500 was originally designed for the OSI protocol stack; in practice the rare modern deployments use TCP. No single canonical port — reflects the original specification's stack-agnostic design. |
| X.500 × typical use | `OSI-era directory and PKI directory model` | Pedagogical framing; X.500 is rarely deployed natively today, but its data model underlies LDAP and X.509 (PKI certificates). |
| NIS × all cells | Specifications are vendor-specific | Sun's NIS / Yellow Pages was never standardized in an RFC; cell values reflect widely-documented operational behavior of the legacy protocol. |

## Engine demo opportunities

- `LDAP | port → ?` → `TCP 389`
- `LDAPS | port → ?` → `TCP 636`
- `Active Directory | port → ?` → `TCP 389`, `TCP 636`, `TCP 88`, `TCP 445`
- `? | port → TCP 389` → `LDAP`, `Active Directory` — shared-Value select-all
- `? | port → TCP 88` → `Active Directory` (sub-Fact in multi-Fact cell, distinguishes via Kerberos port)
- `? | underlying standard → RFC 4511` → `LDAP`
- `? | underlying standard → ITU-T X.500 series` → `X.500`
- `LDAP | authentication → ?` → `Simple bind`, `SASL bind`
- `Active Directory | authentication → ?` → `Kerberos`, `NTLM`, `LDAP bind`
- `? | typical use → Legacy Unix account directory` → `NIS`
- Composite LDAP Row with `port` swapped to `TCP 636` — directly tests the LDAP/LDAPS port distinction (389 vs 636)
- Composite LDAPS Row with `underlying standard` swapped to `LDAP plus Kerberos plus DNS plus SMB` — tests LDAPS vs AD distinction (LDAPS is just TLS-wrapped LDAP; AD is a multi-protocol product)
- Composite NIS Row with `authentication` swapped to `Kerberos` — tests NIS framing (NIS uses cleartext lookup; Kerberos is a separate authentication system)

## Sources

- `[s1]`: RFC 4511, "Lightweight Directory Access Protocol (LDAP): The Protocol" — defines LDAP operations and bind methods (June 2006, retrieved 2026-04-26, https://datatracker.ietf.org/doc/html/rfc4511)
- `[s2]`: RFC 4513, "Lightweight Directory Access Protocol (LDAP): Authentication Methods and Security Mechanisms" — TLS-based confidentiality and authentication including LDAPS guidance (June 2006, retrieved 2026-04-26, https://datatracker.ietf.org/doc/html/rfc4513). RFC 2830, "Lightweight Directory Access Protocol (v3): Extension for Transport Layer Security" — StartTLS extended operation (May 2000, retrieved 2026-04-26, https://datatracker.ietf.org/doc/html/rfc2830)
- `[s3]`: Microsoft Open Specifications [MS-ADTS], "Active Directory Technical Specification" — AD protocol surface including LDAP, Kerberos, DNS integration (retrieved 2026-04-26, https://learn.microsoft.com/en-us/openspecs/windows_protocols/ms-adts/d2435927-0999-4c62-8c6d-13ba31a52e1a)
- `[s4]`: ITU-T X.500-series Recommendations, "Information technology — Open Systems Interconnection — The Directory" — original X.500 directory model (retrieved 2026-04-26, https://www.itu.int/rec/T-REC-X.500/en)
- `[s5]`: Sun Microsystems / IBM AIX documentation on NIS (Network Information Service / Yellow Pages) — operational behavior of the legacy protocol (retrieved 2026-04-26, https://www.ibm.com/docs/en/aix/7.3?topic=services-network-information-service-nis)
- `[s6]`: (ISC)² CISSP Certification Exam Outline, effective 2024-04-15, Domain 5 §5.5 *Manage the identity and access provisioning lifecycle* and §5.6 *Implement authentication systems* (retrieved 2026-04-26, https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline)
