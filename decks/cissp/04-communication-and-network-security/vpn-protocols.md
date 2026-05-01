# VPN Protocols

**Domain:** 4 — Communication and Network Security &nbsp;|&nbsp; **Pattern:** Dimensions &nbsp;|&nbsp; **Tags:** 4.3
**Status:** draft (SME review pending)

CISSP testing distinguishes VPN protocols by the OSI layer they tunnel at, what cryptography they use, how they authenticate peers, and whether they are current or deprecated. The six Rows below cover the canonical CISSP set: the two NIST-documented VPN families (IPsec, SSL/TLS) plus OpenVPN, L2TP, PPTP, and WireGuard. PPTP and L2TP-alone are retained specifically to exercise the engine's ability to surface deprecated / insecure Rows as distractors and to demonstrate same-Column Value recurrence ("which of these uses AES").

| Protocol | OSI layer | encryption | authentication | key exchange | transport | default port | security posture |
|---|---|---|---|---|---|---|---|
| IPsec | Network [s1] | AES [s1] | Pre-shared key<br>Digital certificate [s1] | IKE [s1] | IP [s1] | UDP 500<br>UDP 4500 [s1] | Current [s1] |
| SSL/TLS VPN | Application [s2] | AES [s2] | Digital certificate<br>Password [s2] | TLS handshake [s2] | TCP [s2] | TCP 443 [s2] | Current [s2] |
| OpenVPN | Application [s5] | AES [s5] | Digital certificate<br>Pre-shared key<br>Password [s5] | TLS handshake [s5] | UDP<br>TCP [s5] | UDP 1194<br>TCP 1194 [s5] | Current [s5] |
| L2TP | Data Link [s4] | None [s4] | None [s4] | None [s4] | UDP [s4] | UDP 1701 [s4] | Requires IPsec [s4] |
| PPTP | Data Link [s3] | MPPE<br>RC4 [s3] | MS-CHAPv2 | None | TCP<br>GRE [s3] | TCP 1723 [s3] | Deprecated |
| WireGuard | Network [s6] | ChaCha20-Poly1305 [s6] | Curve25519 public key [s6] | Noise IK [s6] | UDP [s6] | UDP 51820 [s6] | Current [s6] |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. **No parentheticals in cells.** Port notation (`UDP 500`, `TCP 443`) is treated as a single atomic identifier — the IANA-registered transport+port tuple — not two Facts.
- **IPsec `transport = IP`.** IPsec rides directly on IP, not TCP/UDP: ESP is IP protocol 50, AH is IP protocol 51. The `UDP 500 / UDP 4500` ports apply specifically to IKE and NAT-Traversal, which is why they appear under `default port` rather than `transport`.
- **IPsec encryption.** NIST SP 800-77 Rev 1 [s1] specifies AES as the current recommendation; 3DES was permitted in the 2005 edition and has since been deprecated. If the Concept grows to need historical ciphers, add a separate Row or a historical-ciphers Concept — do not smuggle "AES (3DES deprecated)" into a single cell.
- **SSL/TLS VPN OSI layer.** TLS itself straddles L5/L6/L7 depending on whose model you use. SSL/TLS VPN *products* are deployed above TCP as application-layer remote-access tunnels, which is the CISSP framing reflected here. Primary NIST SSL VPN guidance [s2] does not pin an OSI number.
- **OpenVPN OSI layer.** OpenVPN documentation [s5] describes it as providing "OSI layer 2 or 3 secure network extension using the industry standard SSL/TLS protocol" — that phrasing refers to the *tunneled* traffic, not OpenVPN itself. OpenVPN the protocol runs in user space over TLS, so it is treated here as an application-layer VPN, matching the SSL/TLS VPN row.
- **L2TP "None" across crypto Columns.** RFC 3931 [s4] explicitly states L2TP "does not provide confidentiality or strong authentication by itself." Deployed L2TP is almost always L2TP/IPsec, which inherits IPsec's encryption, authentication, and key exchange. The `security posture = Requires IPsec` cell captures this dependency.
- **PPTP deprecation.** The Bruce Schneier & Mudge cryptanalysis (1998) and the Moxie Marlinspike / David Hulton `chapcrack` demonstration at DEF CON 20 (2012) established that MS-CHAPv2 is crackable offline, and Microsoft announced deprecation of PPTP and L2TP in Windows Server in October 2024. PPTP is retained in the table specifically to serve as a distractor Row — the engine can use it to exercise "which of these protocols is deprecated" questioning.
- **WireGuard authentication.** The cell lists `Curve25519 public key` because peers authenticate each other via pre-exchanged static Curve25519 public keys — there is no certificate authority, no PSK field, no username/password. This is the single defining difference from IPsec's IKE-negotiated auth set.
- **Out of scope for this Concept:** SSH tunneling (separate Concept candidate), SSTP (Microsoft-specific, rarely tested), legacy PPP auth protocols (PAP, CHAP — covered by authentication-protocols Concept), IPsec mode details (Transport vs Tunnel, AH vs ESP, IKEv1 vs IKEv2 — warrants its own Concept per the Domain 4 README).

### Tricky distractors

- **PPTP is deprecated.** MS-CHAPv2 is broken; Microsoft removed PPTP from Windows Server in October 2024. Wrong-answer pattern: choosing PPTP for any modern deployment.
- **L2TP alone has no encryption.** L2TP is a tunneling protocol; encryption requires pairing with IPsec (L2TP/IPsec). Wrong-answer pattern: claiming L2TP encrypts traffic by itself.
- **IPsec OSI layer.** Network (Layer 3) — IPsec runs directly on IP, not over TCP/UDP. The IKE control channel uses UDP 500/4500, but ESP and AH are IP protocols 50/51. Wrong-answer pattern: placing IPsec at Layer 4.
- **WireGuard cipher.** ChaCha20-Poly1305 (AEAD); Curve25519 for key agreement; Noise IK handshake. Wrong-answer pattern: claiming WireGuard uses RSA or AES — it uses Curve25519 and ChaCha20.
- **OpenVPN OSI layer.** Application layer (runs over TLS, user-space). Wrong-answer pattern: placing OpenVPN at Layer 3 — it tunnels L2/L3 traffic but the protocol itself is L7.
- **SSL/TLS VPN port.** TCP 443 (same as HTTPS). Wrong-answer pattern: assuming SSL VPN uses a different port — it specifically uses 443 to traverse firewalls.

### Values without a direct public citation

These cell values are drawn from standard CISSP study material or from inference rather than a traced public source. They reflect widely-accepted taxonomy but should be validated by an SME or replaced with a sourced value before the Concept is treated as reference-grade.

| Cell | Value | Why unsourced |
|---|---|---|
| SSL/TLS VPN × OSI layer | `Application` | NIST SP 800-113 [s2] does not pin an OSI layer. CISSP curriculum treats SSL VPN as application-layer; TLS itself is often drawn at L5–L6. |
| OpenVPN × OSI layer | `Application` | OpenVPN docs [s5] describe the *tunneled* payload layer, not OpenVPN itself. Placement above TLS in user space is the operative CISSP framing. |
| WireGuard × OSI layer | `Network` | The WireGuard whitepaper [s6] describes it as a Layer 3 tunnel interface but does not assign an OSI layer number explicitly. |
| PPTP × authentication | `MS-CHAPv2` | RFC 2637 [s3] specifies MS-CHAP generally; MS-CHAPv2 is the commonly-deployed variant called out in practitioner and vulnerability literature but not pinned in the base RFC. |
| PPTP × key exchange | `None` | RFC 2637 does not define a separate key exchange; session keys are derived from the MS-CHAP authentication exchange. Written as `None` to match how CISSP study material describes it. |
| PPTP × security posture | `Deprecated` | Widely accepted based on Schneier/Mudge 1998, `chapcrack` 2012, and Microsoft's 2024 deprecation announcement. No single canonical NIST citation located. |

## Engine demo opportunities

- `PPTP | security posture → ?` → `Deprecated`
- `? | security posture → Current` → `IPsec`, `SSL/TLS VPN`, `OpenVPN`, `WireGuard` — shared-Value select-all
- `WireGuard | encryption → ?` → `ChaCha20-Poly1305`
- `IPsec | key exchange → ?` → `IKE`
- `? | encryption → AES` → `IPsec`, `SSL/TLS VPN`, `OpenVPN` — shared-Value select-all
- `? | OSI layer → Data Link` → `L2TP`, `PPTP` — shared-Value select-all
- `? | OSI layer → Network` → `IPsec`, `WireGuard` — shared-Value select-all
- `? | key exchange → TLS handshake` → `SSL/TLS VPN`, `OpenVPN`
- `? | default port → UDP 1194` → `OpenVPN`
- `? | transport → UDP` → `L2TP`, `WireGuard` (sole-Fact cells) and `IPsec`, `OpenVPN` (multi-Fact cells containing `UDP`) — exercises engine handling of shared Facts across differently-shaped cells. Note IPsec's `transport` cell is `IP`, so IPsec is excluded here; UDP appears only under its `default port` cell.
- Composite Row profile: PPTP across all Columns with one cell swapped to a WireGuard Value — tests deprecation recognition against modern protocol swap

## Sources

- `[s1]`: NIST SP 800-77 Revision 1, "Guide to IPsec VPNs" (June 2020, retrieved 2026-04-19, https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-77r1.pdf)
- `[s2]`: NIST SP 800-113, "Guide to SSL VPNs" (July 2008, retrieved 2026-04-19, https://nvlpubs.nist.gov/nistpubs/Legacy/SP/nistspecialpublication800-113.pdf)
- `[s3]`: RFC 2637, "Point-to-Point Tunneling Protocol (PPTP)" (July 1999, retrieved 2026-04-19, https://datatracker.ietf.org/doc/html/rfc2637)
- `[s4]`: RFC 3931, "Layer Two Tunneling Protocol - Version 3 (L2TPv3)" (March 2005, retrieved 2026-04-19, https://datatracker.ietf.org/doc/html/rfc3931)
- `[s5]`: OpenVPN Community Resources, "OpenVPN Cryptographic Layer" and "OpenVPN Protocol" (retrieved 2026-04-19, https://openvpn.net/community-resources/openvpn-cryptographic-layer/ and https://openvpn.net/community-resources/openvpn-protocol/)
- `[s6]`: Jason A. Donenfeld, "WireGuard: Next Generation Kernel Network Tunnel" whitepaper (retrieved 2026-04-19, https://www.wireguard.com/papers/wireguard.pdf)
