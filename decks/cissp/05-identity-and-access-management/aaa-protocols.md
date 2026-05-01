# AAA Protocols

**Domain:** 5 — Identity and Access Management &nbsp;|&nbsp; **Pattern:** Dimensions &nbsp;|&nbsp; **Tags:** 5.6, 4.3
**Status:** draft (SME review pending)

The three AAA (Authentication, Authorization, Accounting) network-access protocols CISSP candidates are expected to discriminate. RADIUS is the oldest and most widely deployed (used in Wi-Fi enterprise, VPN concentrators, ISP dial-up); DIAMETER is its modern successor designed to fix RADIUS limitations; TACACS+ is Cisco's proprietary protocol that splits AAA into separate channels and is dominant in network-device administration. CISSP testing focuses on the encryption-coverage difference (RADIUS encrypts only the password; TACACS+ encrypts the entire payload) and the transport choice (UDP vs TCP).

| Protocol | RFC / Origin | transport | port | encryption scope | typical use |
|---|---|---|---|---|---|
| RADIUS | RFC 2865 [s1] | UDP | 1812 authentication<br>1813 accounting | Password attribute only [s1] | Wi-Fi enterprise<br>VPN concentrator<br>NAC |
| DIAMETER | RFC 6733 [s2] | TCP or SCTP [s2] | 3868 [s2] | Full message via TLS or IPsec [s2] | 3GPP / 4G / 5G networks<br>IMS subscriber authentication |
| TACACS+ | Cisco proprietary documented in RFC 8907 [s3] | TCP | 49 [s3] | Entire packet body [s3] | Network-device administration |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. **No parentheticals in cells.**
- **Acronym expansions.** `AAA` = Authentication, Authorization, Accounting. `RADIUS` = Remote Authentication Dial-In User Service. `DIAMETER` = (the name plays on RADIUS — diameter is twice the radius — but is not a true acronym). `TACACS+` = Terminal Access Controller Access-Control System Plus.
- **RADIUS encryption scope is the headline distinction.** RADIUS encrypts only the User-Password attribute using MD5 — every other attribute (username, NAS-IP, accounting data, authorization parameters) travels in plaintext. TACACS+ encrypts the entire packet body. This is the most-tested CISSP exam discriminator: "Which protocol encrypts the entire authentication exchange?" → TACACS+.
- **RADIUS shared secret.** Both RADIUS and TACACS+ use a pre-shared secret between the NAS (Network Access Server / authenticator) and the AAA server. RADIUS uses the shared secret in MD5 hashing for the password attribute; TACACS+ uses it as a key for body encryption. Compromise of the shared secret breaks confidentiality for all subsequent traffic.
- **DIAMETER is the "next-generation RADIUS."** Designed to fix RADIUS limitations: reliable transport (TCP/SCTP vs UDP), application-layer ack/nack, peer-to-peer architecture (rather than client-server), capability negotiation, full-message protection via TLS/IPsec. Despite the design improvements, RADIUS remains dominant outside the telecom space because of its installed base.
- **DIAMETER is mostly telecom.** Its largest deployment is 3GPP mobile networks (4G LTE, 5G core) where it carries authentication and authorization for subscriber sessions. IMS (IP Multimedia Subsystem) and Mobility Management Entity (MME) interactions use DIAMETER. Outside of telecom, DIAMETER adoption is rare — RADIUS still wins.
- **TACACS+ separates the AAA functions.** Unlike RADIUS (which combines authentication + authorization in one transaction), TACACS+ uses separate channels for authentication, authorization, and accounting. This lets an organization use TACACS+ for command-level authorization on network devices — granting "show interface" but not "configure terminal" to a junior admin. RADIUS cannot do this granularity natively.
- **TACACS+ vs TACACS vs XTACACS.** The original TACACS (RFC 1492, 1993) and Cisco's XTACACS were superseded by TACACS+ in the 1990s. TACACS+ is not backward compatible with TACACS. Modern usage of "TACACS" almost always means TACACS+. RFC 8907 (March 2020) finally standardized TACACS+ at the IETF level.
- **Cross-Concept link.** Sibling Concepts: `aaa-extensions` in D1 (the conceptual AAA framework — Authentication, Authorization, Accounting, Auditing, Identification), `eap-variants` (EAP methods that ride on top of these AAA protocols inside 802.1X), `nac-types` in D4 (NAC architectures using these protocols).
- **Out of scope for this Concept:** specific RADIUS attributes (Vendor-Specific Attributes, RFC 2866 accounting), DIAMETER application-Ids, TACACS+ command authorization details, specific 3GPP / 5G use of DIAMETER, NPS / FreeRADIUS / TACACS+ server implementations.

### Tricky distractors

- **Encryption scope.** Wrong-answer pattern: claiming "RADIUS encrypts the entire packet." False — RADIUS encrypts only the User-Password attribute. TACACS+ encrypts the entire body. This is the single most-tested distinction.
- **Transport.** Wrong-answer pattern: claiming "TACACS+ uses UDP" or "RADIUS uses TCP." Both are inverted. RADIUS = UDP; TACACS+ = TCP. DIAMETER = TCP or SCTP.
- **Port numbers.** RADIUS authentication is now 1812 (legacy 1645 also still seen); accounting is 1813 (legacy 1646). TACACS+ is 49. DIAMETER is 3868. Common wrong-answer patterns swap these.
- **AAA function granularity.** Wrong-answer pattern: claiming "RADIUS supports per-command authorization." It doesn't natively. TACACS+ does. This is what makes TACACS+ the dominant choice for network-device administration.

### Values without a direct public citation

| Cell | Notes |
|---|---|
| All rows × typical use | Use-case lists | Industry-typical deployment patterns; not from a single primary source. |

## Engine demo opportunities

- `RADIUS | encryption scope → ?` → `Password attribute only`
- `TACACS+ | encryption scope → ?` → `Entire packet body`
- `RADIUS | transport → ?` → `UDP`
- `TACACS+ | transport → ?` → `TCP`
- `DIAMETER | transport → ?` → `TCP or SCTP`
- `RADIUS | port → ?` → `1812 authentication`, `1813 accounting`
- `TACACS+ | port → ?` → `49`
- `DIAMETER | port → ?` → `3868`
- `? | encryption scope → Entire packet body` → `TACACS+`
- `? | typical use → Network-device administration` → `TACACS+`
- `? | typical use → 3GPP / 4G / 5G networks` → `DIAMETER` (sub-Fact in multi-Fact cell)
- Composite RADIUS Row with `encryption scope` swapped to `Entire packet body` — directly tests the headline encryption-scope distinction (RADIUS = password only; TACACS+ = full body)
- Composite RADIUS Row with `transport` swapped to `TCP` — tests transport pairing (RADIUS is UDP; TACACS+ is TCP)
- Composite TACACS+ Row with `port` swapped to `1812 authentication`, `1813 accounting` — tests port-to-protocol pairing (TACACS+ is 49; RADIUS is 1812/1813)

## Sources

- `[s1]`: RFC 2865, "Remote Authentication Dial In User Service (RADIUS)" (June 2000, retrieved 2026-04-26, https://datatracker.ietf.org/doc/html/rfc2865)
- `[s2]`: RFC 6733, "Diameter Base Protocol" (October 2012, retrieved 2026-04-26, https://datatracker.ietf.org/doc/html/rfc6733)
- `[s3]`: RFC 8907, "The Terminal Access Controller Access-Control System Plus (TACACS+) Protocol" (September 2020, retrieved 2026-04-26, https://datatracker.ietf.org/doc/html/rfc8907)
- `[s4]`: RFC 2866, "RADIUS Accounting" (June 2000, retrieved 2026-04-26, https://datatracker.ietf.org/doc/html/rfc2866)
