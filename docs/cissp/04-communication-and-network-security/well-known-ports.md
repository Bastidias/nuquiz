# Well-Known Ports

**Domain:** 4 — Communication and Network Security &nbsp;|&nbsp; **Pattern:** Dimensions &nbsp;|&nbsp; **Tags:** 4.1, 4.3
**Status:** draft (SME review pending)

The 25 most-tested service-to-port pairings on CISSP. The IANA-registered well-known port range is 0–1023; CISSP exams routinely test the standard mappings for protocols students should recognize on sight. This Concept exists primarily as a reference table — questions like "which port is LDAP" expect a numeric answer, and the engine should be able to test both directions (port → protocol, protocol → port).

| Service | port | transport | secure variant | secure port |
|---|---|---|---|---|
| FTP control | 21 | TCP | FTPS<br>SFTP | 990<br>22 |
| SSH | 22 | TCP | None — already secure | — |
| Telnet | 23 | TCP | SSH | 22 |
| SMTP | 25 | TCP | SMTPS<br>SMTP STARTTLS | 465<br>587 |
| DNS | 53 | UDP and TCP | DoT<br>DoH<br>DoQ | 853<br>443<br>853 |
| DHCP server | 67 | UDP | None | — |
| DHCP client | 68 | UDP | None | — |
| TFTP | 69 | UDP | None — discouraged | — |
| HTTP | 80 | TCP | HTTPS | 443 |
| Kerberos | 88 | TCP and UDP | None — already authenticated | — |
| POP3 | 110 | TCP | POP3S | 995 |
| NNTP | 119 | TCP | NNTPS | 563 |
| NTP | 123 | UDP | NTS | 4460 |
| NetBIOS Name | 137 | UDP | None | — |
| NetBIOS Datagram | 138 | UDP | None | — |
| NetBIOS Session | 139 | TCP | None | — |
| IMAP | 143 | TCP | IMAPS | 993 |
| SNMP | 161 | UDP | SNMP v3 with auth/priv | 161 |
| SNMP Trap | 162 | UDP | SNMP v3 with auth/priv | 162 |
| LDAP | 389 | TCP | LDAPS | 636 |
| HTTPS | 443 | TCP | — | — |
| SMB | 445 | TCP | SMB 3 with encryption | 445 |
| Syslog | 514 | UDP | TLS-syslog | 6514 |
| RDP | 3389 | TCP | RDP with TLS | 3389 |
| MS-SQL | 1433 | TCP | MS-SQL with TLS | 1433 |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. **No parentheticals in cells.** Port numbers are atomic identifiers; transport protocol pairings (`TCP and UDP`) are listed in atomic form when both apply.
- **IANA port-number ranges.** Well-known ports: 0–1023 (assigned by IANA, typically requires root/admin to bind). Registered ports: 1024–49151 (registered with IANA). Dynamic / ephemeral ports: 49152–65535 (unrestricted, typically for client-side ephemeral source ports).
- **Most-tested pairings.** HTTP/80, HTTPS/443, SSH/22, Telnet/23, FTP/21, SMTP/25, DNS/53, DHCP/67-68, NTP/123, LDAP/389, LDAPS/636, RDP/3389, SMB/445 — these are the highest-yield numbers. Memorizing the full table is preferable for the exam.
- **DNS uses both UDP and TCP.** UDP/53 for normal queries; TCP/53 for zone transfers (AXFR/IXFR) and any response over 512 bytes (or 1232 with EDNS(0)). Most CISSP questions accept "UDP 53" but "UDP and TCP 53" is the technically complete answer. Sibling Concept `dns-query-flow` covers the protocol semantics.
- **SMTP submission ports.** SMTP/25 is for server-to-server delivery. SMTP submission has historically been 587 (with STARTTLS) and 465 (originally SMTPS, deprecated by RFC 3207, then re-blessed by RFC 8314 for implicit-TLS submission). RFC 8314 recommends 465 with implicit TLS as the modern default for client submission.
- **SMB 445 vs older NetBIOS-over-TCP 139.** Modern SMB uses port 445 directly (CIFS over TCP). Older deployments used SMB encapsulated in NetBIOS over TCP/UDP (137-139). Most modern environments have NetBIOS disabled.
- **FTP control 21 vs data 20.** FTP separates control (port 21, persistent connection) and data (port 20 in active mode, ephemeral in passive mode). The cell lists 21 because control is what initiates the session; passive-mode FTP uses ephemeral data ports negotiated dynamically.
- **SFTP is not Secure FTP.** SFTP (port 22) is the SSH File Transfer Protocol — a subsystem of SSH. FTPS (ports 990 / 989 control / data) is FTP over TLS. SFTP and FTPS are different protocols despite similar names. Sibling Concept `vpn-protocols` covers SSH transport.
- **Database ports — registered, not well-known.** MS-SQL (1433), MySQL (3306), PostgreSQL (5432), Oracle (1521), MongoDB (27017), Redis (6379) are *registered* ports above 1024, not well-known. Often tested but technically not in the 0–1023 range.
- **Recent additions.** DoT (DNS over TLS) on 853, DoH (DNS over HTTPS) on 443, DoQ (DNS over QUIC) on 853 over UDP, NTS (Network Time Security) on 4460 — these are the post-2018 secure variants that increasingly appear on exams.

### Tricky distractors

- **Telnet vs SSH.** Telnet/23 is unencrypted; SSH/22 is the secure replacement. Wrong-answer pattern: claiming Telnet is secure or that SSH uses port 23.
- **HTTP vs HTTPS port pairing.** HTTP/80 / HTTPS/443. Common wrong-answer pattern: swapping the two (HTTP/443, HTTPS/80) or pairing HTTPS with port 8443 (which is a non-standard alternate).
- **DNS UDP vs TCP.** Wrong-answer pattern: "DNS is UDP only." DNS uses *both* — UDP for most queries, TCP for zone transfers and large responses.
- **SMB port.** Modern SMB is 445. Older NetBIOS-over-TCP SMB used 139. Wrong-answer pattern: claiming SMB only uses 139 or only uses 445; both have been correct historically.
- **POP3 vs IMAP.** POP3/110, IMAP/143. POP3S/995, IMAPS/993. Easy to swap on the exam.
- **Kerberos.** Kerberos uses 88 (TCP and UDP). Wrong-answer pattern: 464 (which is `kpasswd` — Kerberos password-change) or 749 (Kerberos admin).

### Values without a direct public citation

No cells in this table rely on inference beyond what IANA service-name and port-number registry [s1] specifies. Cell values reflect the IANA registry as of retrieval date.

## Engine demo opportunities

- `HTTPS | port → ?` → `443`
- `SSH | port → ?` → `22`
- `LDAP | port → ?` → `389`
- `LDAPS | port → ?` (or via secure-port column) → `636`
- `RDP | port → ?` → `3389`
- `? | port → 53` → `DNS`
- `? | port → 80` → `HTTP`
- `? | port → 443` → `HTTPS`
- `? | port → 22` → `SSH`
- `Telnet | secure variant → ?` → `SSH`
- `HTTP | secure variant → ?` → `HTTPS`
- `? | secure port → 636` → `LDAP` (LDAPS is the secure variant)
- Composite Telnet Row with `port` swapped to `22` — directly tests the Telnet/SSH port distinction (Telnet is 23; SSH is 22)
- Composite SSH Row with `port` swapped to `23` — tests the inverse
- Composite LDAP Row with `port` swapped to `636` — tests LDAP/LDAPS distinction (LDAP is 389; LDAPS is 636)
- Composite SMTP Row with `transport` swapped to `UDP` — tests that SMTP is TCP (mail delivery requires reliability)

## Sources

- `[s1]`: IANA Service Name and Transport Protocol Port Number Registry — authoritative port assignments (retrieved 2026-04-26, https://www.iana.org/assignments/service-names-port-numbers/service-names-port-numbers.xhtml)
- `[s2]`: RFC 6335, "Internet Assigned Numbers Authority (IANA) Procedures for the Management of the Service Name and Transport Protocol Port Number Registry" — port-range definitions (August 2011, retrieved 2026-04-26, https://datatracker.ietf.org/doc/html/rfc6335)
- `[s3]`: RFC 8314, "Cleartext Considered Obsolete: Use of Transport Layer Security (TLS) for Email Submission and Access" — modern SMTP/IMAP/POP3 secure-port guidance (January 2018, retrieved 2026-04-26, https://datatracker.ietf.org/doc/html/rfc8314)
