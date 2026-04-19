# Firewall Types

**Domain:** 4 — Communication and Network Security &nbsp;|&nbsp; **Pattern:** Dimensions &nbsp;|&nbsp; **Tags:** 4.2
**Status:** draft (SME review pending)

NIST defines a firewall as a device or program that controls the flow of network traffic between networks or hosts that employ differing security postures [s2]. CISSP testing distinguishes firewall types by the OSI layer they inspect at, whether they track connection state, and what portion of the traffic they can examine. The six Rows below are the canonical CISSP taxonomy: four classical types from NIST SP 800-41 Rev 1 [s1], plus two modern categories (NGFW, WAF) that post-date that publication and are sourced separately.

| Type | OSI layer(s) | stateful | inspection scope | layer-7 protocols covered | performance impact | typical deployment |
|---|---|---|---|---|---|---|
| Packet filter | Network<br>Transport [s1] | No [s1] | Packet headers [s1] | None [s1] | Low | Perimeter<br>Router ACLs |
| Stateful inspection | Network<br>Transport [s1] | Yes [s1] | Packet headers<br>Connection state [s1] | None [s1] | Moderate | Perimeter<br>Internal segmentation |
| Circuit-level gateway | Session | Yes [s1] | Connection handshakes [s1] | None [s1] | Low | SOCKS proxy |
| Application proxy | Application [s1] | Yes [s1] | Full packet payload [s1] | Per-protocol [s1] | High | DMZ<br>Per-protocol proxy |
| NGFW | Network<br>Transport<br>Application [s4] | Yes [s4] | Packet headers<br>Connection state<br>Deep packet inspection [s4] | Any [s4] | High | Perimeter<br>Internal segmentation |
| WAF | Application [s3] | Yes | HTTP request payload<br>HTTP response payload [s3] | HTTP<br>HTTPS [s3] | Moderate | Reverse proxy<br>In front of web applications [s3] |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. **No parentheticals in cells.** Any context stripped from cells lives below.
- **Packet filter OSI layer.** NIST SP 800-41 Rev 1 says packet filters "operate at Layer 3 (Network) of the OSI model" [s1], but the same section describes them providing "access control functionality for host addresses and communication sessions" — i.e., filtering by TCP/UDP port, which is Layer 4. CISSP curriculum treats packet filters as inspecting both Network and Transport layers, which is what the cell reflects.
- **Application proxy `stateful = Yes` is inferred.** NIST does not use the word "stateful" for application proxies, but describes them performing "the TCP handshake with the source system" and examining "an entire packet rather than just network addresses and ports" [s1] — both of which require per-connection state.
- **NGFW post-dates NIST SP 800-41 Rev 1 (2009).** The term was coined by Gartner. The cell values come from Gartner's definition via [s4]: "deep-packet inspection firewalls that move beyond port/protocol inspection and blocking to add application-level inspection and intrusion prevention."
- **WAF layer-7 coverage.** OWASP's language is "HTTP applications" [s3]; HTTPS is included in the cell because WAFs typically terminate TLS to inspect the HTTP payload. If sticking strictly to the OWASP wording, drop HTTPS.
- **Out of scope for this Concept:** host-based / personal firewalls (covered in NIST SP 800-41 Rev 1 §2.2), kernel vs application-level enforcement, firewall placement architectures (screened subnet, dual-homed host, DMZ variants). These warrant their own Concepts.

### Values without a direct public citation

The following cell values are drawn from standard CISSP study material rather than a traced public source. They reflect widely-accepted taxonomy but should be validated by an SME or replaced with a sourced value before the Concept is treated as reference-grade.

| Cell | Value | Why unsourced |
|---|---|---|
| Circuit-level gateway × OSI layer(s) | `Session` | NIST [s1] does not assign an OSI layer to circuit-level gateways; CISSP curriculum places them at Layer 5. |
| Circuit-level gateway × typical deployment | `SOCKS proxy` | NIST [s1] does not name a canonical deployment; SOCKS is the textbook example. |
| WAF × stateful | `Yes` | OWASP [s3] does not directly state statefulness; real WAF products vary. Set to `Yes` because HTTP rule evaluation in practice requires session/request tracking. |
| All six rows × performance impact | `Low` / `Moderate` / `High` | No authoritative public source located. Values reflect standard CISSP teaching (packet filter = fast, proxy = slow). |
| Packet filter × typical deployment | `Perimeter`, `Router ACLs` | CISSP lore; not in the located NIST sections. |
| Stateful inspection × typical deployment | `Perimeter`, `Internal segmentation` | CISSP lore. |
| Application proxy × typical deployment | `DMZ`, `Per-protocol proxy` | CISSP lore. |
| NGFW × typical deployment | `Perimeter`, `Internal segmentation` | Vendor literature but no single canonical public source located. |

## Engine demo opportunities

- `Packet filter | stateful → ?` → `No`
- `? | stateful → No` → `Packet filter`
- `? | stateful → Yes` → `Stateful inspection`, `Circuit-level gateway`, `Application proxy`, `NGFW`, `WAF` — shared-Value select-all
- `? | performance impact → Low` → `Packet filter`, `Circuit-level gateway` — shared-Value select-all
- `? | typical deployment → Perimeter` → `Packet filter`, `Stateful inspection`, `NGFW` — shared-Value select-all across multi-Fact cells
- `? | layer-7 protocols covered → None` → `Packet filter`, `Stateful inspection`, `Circuit-level gateway` — shared-Value select-all
- `Application proxy | OSI layer(s) → ?` → `Application`
- `NGFW | inspection scope → ?` → `Packet headers`, `Connection state`, `Deep packet inspection` (multi-Fact cell)
- `WAF | layer-7 protocols covered → ?` → `HTTP`, `HTTPS`
- `? | inspection scope → Packet headers` → `Packet filter` (sole-Fact cell) vs `Stateful inspection` and `NGFW` (multi-Fact cells containing the same Fact) — exercises engine handling of shared Facts across differently-shaped cells

## Sources

- `[s1]`: NIST SP 800-41 Rev 1, "Guidelines on Firewalls and Firewall Policy" §2.1 Firewall Technologies (September 2009, retrieved 2026-04-19, https://csrc.nist.gov/pubs/sp/800/41/r1/final)
- `[s2]`: NIST CSRC Glossary, term "firewall", definition sourced from NIST SP 800-41 Rev 1 (retrieved 2026-04-19, https://csrc.nist.gov/glossary/term/firewall)
- `[s3]`: OWASP Foundation, "Web Application Firewall" community page (retrieved 2026-04-19, https://owasp.org/www-community/Web_Application_Firewall)
- `[s4]`: Cloudflare Learning Center, "What is a next-generation firewall (NGFW)?" — includes Gartner's NGFW definition (retrieved 2026-04-19, https://www.cloudflare.com/learning/security/what-is-next-generation-firewall-ngfw/)
