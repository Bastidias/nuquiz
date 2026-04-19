# Network Attacks

**Domain:** 4 — Communication and Network Security &nbsp;|&nbsp; **Pattern:** Dimensions &nbsp;|&nbsp; **Tags:** 4.2
**Status:** draft (SME review pending)

The seven network-layer attack classes CISSP candidates are expected to discriminate by OSI layer, CIA-triad target, exploited protocol behavior, and primary mitigation. Rows span availability attacks (SYN flood, Smurf), identity forgery (IP spoofing), LAN-scope MITM enablers (ARP poisoning), resolver attacks (DNS cache poisoning), the generic MITM category, and session-layer takeover (session hijacking). Wireless-specific attacks (Evil Twin, deauth, KRACK, WPS, Dragonblood) belong in a separate wireless-attacks Concept.

| Attack | OSI layer | CIA target | exploits | technique | primary mitigation |
|---|---|---|---|---|---|
| SYN flood | Transport [s1] | Availability [s1] | TCP 3-way handshake [s1] | Half-open connection exhaustion [s1] | SYN cookies [s1] |
| Smurf | Network [s5] | Availability [s5] | ICMP echo<br>IP directed broadcast [s5] | Spoofed broadcast amplification [s5] | Disable directed broadcast [s5] |
| IP spoofing | Network | Authentication | IP source address field | Forged source address | Ingress filtering [s4] |
| ARP poisoning | Data Link [s2] | Integrity [s2] | ARP reply trust [s2] | Forged ARP reply [s2] | Dynamic ARP Inspection [s2] |
| DNS cache poisoning | Application [s3] | Integrity [s3] | DNS transaction ID [s3] | Forged response race [s3] | DNSSEC [s3] |
| MITM | Multiple | Confidentiality<br>Integrity | Unauthenticated channel | On-path interception | Mutual authentication |
| Session hijacking | Transport | Authentication | Session tokens | Session takeover | Encrypted session<br>Random sequence numbers |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. **No parentheticals in cells.** CIA-target Values (`Availability`, `Confidentiality`, `Integrity`, `Authentication`) are treated as the four canonical targets — authentication is included alongside the classic triad because CISSP testing regularly frames spoofing and hijacking as authentication-layer attacks, not integrity-layer.
- **SYN flood is the canonical Transport-layer DoS.** The attack works because a TCP server must allocate a Transmission Control Block (TCB) at SYN-ACK time and hold it until the ACK arrives or the timer expires. RFC 4987 [s1] surveys the full mitigation set (ingress filtering, backlog tuning, reduced half-open timeouts, SYN caches, SYN cookies, firewall/proxy front-ends). `SYN cookies` is listed as the primary mitigation because it eliminates the TCB-allocation requirement entirely — the server encodes session state in the SYN-ACK sequence number.
- **Smurf attack is historical but still tested.** The canonical mitigation (`Disable directed broadcast`) was codified in RFC 2644 (BCP 34) in 1999, and modern routers disable directed broadcast forwarding by default. Smurf is retained as a Row because CISSP testing still uses it as the archetype of reflection/amplification DoS.
- **IP spoofing is a technique, not an end.** It is rarely the attack itself — it is an enabler for SYN flood, Smurf, DNS cache poisoning, and several others. The Row is kept because CISSP tests it as a standalone concept, but recognize that "ingress filtering" (BCP 38 / RFC 2827) is the mitigation for the *technique*, independent of which downstream attack uses it.
- **ARP poisoning → MITM.** ARP poisoning is one of the primary MITM enablers on a LAN. The MITM Row is kept separate to capture the *generic* on-path-interception concept; ARP poisoning is kept separate because it has a specific Layer-2 mitigation (Dynamic ARP Inspection tied to DHCP snooping) that the generic MITM Row does not.
- **DNS cache poisoning and the Kaminsky bug.** RFC 4033 / RFC 4034 / RFC 4035 define DNSSEC, which is the only full solution [s3]. Post-Kaminsky resolvers also deploy source-port randomization and 0x20 encoding to raise the guess space from ~2^16 to ~2^32, but these are mitigations for the *spoofing success rate*, not for the underlying lack of response authentication — DNSSEC is.
- **MITM `OSI layer = Multiple`.** MITM is a pattern, not a protocol — it operates at whichever layer the attacker intercepts. Common vectors: Evil Twin and ARP poisoning at Layer 2, BGP hijacking at Layer 3, DNS hijacking at Layer 7, TLS stripping at the application boundary. The cell value `Multiple` captures this honestly; splitting into per-layer sub-Rows would produce seven Concepts collapsed into one and is out of scope here.
- **Session hijacking `OSI layer = Transport`.** The classical CISSP framing is TCP session hijacking — prediction or theft of sequence numbers to take over an established connection. Modern web-session hijacking (cookie theft, session fixation) operates at Layer 7 and is closer in character to an authentication-bypass attack. This Concept reflects the Transport framing; a distinct web-session-attack Concept would cover the Layer-7 variant.
- **Out of scope for this Concept:** wireless attacks (Evil Twin, deauth, KRACK, WPS, Dragonblood), BGP route hijacking, email-layer attacks (phishing, BEC, SPF/DKIM bypass), TLS-specific attacks (downgrade, POODLE, BEAST, Heartbleed), application-layer attacks (XSS, SQLi, CSRF), VoIP-specific attacks (SIP register floods, toll fraud), IoT-specific attacks.

### Values without a direct public citation

| Cell | Value | Why unsourced |
|---|---|---|
| IP spoofing × OSI layer | `Network` | IP source-address forgery clearly operates at Layer 3; no single canonical citation located. |
| IP spoofing × CIA target | `Authentication` | Spoofing attacks identity/authenticity; CISSP framing. The C/I/A triad formally omits authentication — reflected here by using `Authentication` as a fourth target when appropriate. |
| IP spoofing × exploits | `IP source address field` | Universal CISSP teaching; the exploited field is the IP header's source-address field, but not captured as a discrete quotation in the sources located. |
| IP spoofing × technique | `Forged source address` | Paraphrase; no single cited quotation. |
| MITM × all cells | — | MITM is a generic attack pattern, not a single protocol attack. Cell values represent CISSP-pedagogical consensus on the category. |
| Session hijacking × all cells | — | Row values reflect classical CISSP TCP-session-hijacking framing (Bellovin 1989 sequence-number prediction lineage). No single canonical public citation located in this research pass. |

## Engine demo opportunities

- `SYN flood | CIA target → ?` → `Availability`
- `? | CIA target → Availability` → `SYN flood`, `Smurf` — shared-Value select-all
- `? | CIA target → Integrity` → `ARP poisoning`, `DNS cache poisoning` — shared-Value select-all
- `? | CIA target → Authentication` → `IP spoofing`, `Session hijacking` — shared-Value select-all
- `? | OSI layer → Network` → `Smurf`, `IP spoofing` — shared-Value select-all
- `ARP poisoning | primary mitigation → ?` → `Dynamic ARP Inspection`
- `DNS cache poisoning | primary mitigation → ?` → `DNSSEC`
- `SYN flood | primary mitigation → ?` → `SYN cookies`
- `? | exploits → TCP 3-way handshake` → `SYN flood`
- Composite SYN flood Row with `primary mitigation` swapped to `DNSSEC` — tests mitigation/attack pairing (DNSSEC does not mitigate a TCP-layer attack)
- Composite Smurf Row with `exploits` swapped to `TCP 3-way handshake` — tests the Smurf-vs-SYN-flood distinction (both target Availability but exploit different protocols)
- Composite ARP poisoning Row with `OSI layer` swapped to `Network` — tests the Layer-2-vs-Layer-3 discriminator for ARP

## Sources

- `[s1]`: RFC 4987, "TCP SYN Flooding Attacks and Common Mitigations" (August 2007, retrieved 2026-04-19, https://datatracker.ietf.org/doc/html/rfc4987)
- `[s2]`: MITRE ATT&CK, Technique T1557.002 "Adversary-in-the-Middle: ARP Cache Poisoning" (retrieved 2026-04-19, https://attack.mitre.org/techniques/T1557/002/)
- `[s3]`: ISC Knowledge Base, "CVE-2008-1447: DNS Cache Poisoning Issue (Kaminsky bug)" (retrieved 2026-04-19, https://kb.isc.org/docs/aa-00924)
- `[s4]`: RFC 2827 (BCP 38), "Network Ingress Filtering: Defeating Denial of Service Attacks which employ IP Source Address Spoofing" (May 2000, retrieved 2026-04-19, https://datatracker.ietf.org/doc/html/rfc2827)
- `[s5]`: Cloudflare Learning Center, "Smurf DDoS attack" (retrieved 2026-04-19, https://www.cloudflare.com/learning/ddos/smurf-ddos-attack/)
