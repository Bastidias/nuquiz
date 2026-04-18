# OSI Layers

**Domain:** 4 — Communication and Network Security &nbsp;|&nbsp; **Pattern:** Dimensions &nbsp;|&nbsp; **Tags:** 4.1
**Status:** draft (SME review pending)

The seven layers of the OSI reference model. Foundational CISSP knowledge — students must place protocols, devices, and PDUs at the correct layer, and translate to the TCP/IP four-layer model.

| Layer | layer number | PDU | key protocols | key devices | primary function | TCP/IP equivalent |
|---|---|---|---|---|---|---|
| Physical | 1 | Bit | Ethernet physical spec<br>Bluetooth physical<br>USB | Hubs<br>Repeaters<br>Cables<br>NICs | Transmit raw bits over a physical medium | Network Access |
| Data Link | 2 | Frame | Ethernet<br>PPP<br>ARP<br>L2TP | Switches<br>Bridges | Node-to-node delivery<br>MAC addressing<br>Error detection | Network Access |
| Network | 3 | Packet | IPv4<br>IPv6<br>ICMP<br>IPsec<br>IGMP | Routers<br>Layer 3 switches | Routing packets between networks<br>Logical addressing | Internet |
| Transport | 4 | Segment<br>Datagram | TCP<br>UDP<br>SCTP | Stateful firewalls<br>Load balancers | End-to-end communication<br>Reliability<br>Speed | Transport |
| Session | 5 | Data | NetBIOS<br>RPC<br>PPTP<br>SOCKS | (software only) | Establish sessions<br>Maintain sessions<br>Terminate sessions | Application |
| Presentation | 6 | Data | SSL/TLS<br>JPEG<br>MPEG<br>ASCII encoding<br>Unicode encoding | (software only) | Translation<br>Encryption<br>Compression | Application |
| Application | 7 | Data | HTTP<br>HTTPS<br>FTP<br>SMTP<br>DNS<br>SSH<br>Telnet | End-host software | Interface between user applications and the network | Application |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. **No parentheticals in cells.** Several earlier-draft parentheticals — `IP (IPv4, IPv6)`, `Segment (TCP)`, `Datagram (UDP)`, `SSL/TLS (debated placement)`, `Ethernet (MAC)`, `Reliability (TCP)`, `(physical interface)` — have been split out, demoted to context here, or moved to a separate Concept.
- **PDU per layer is heavily tested.** The mnemonic "Bit, Frame, Packet, Segment" covers Layers 1-4; 5-7 are commonly grouped as "Data."
- **Layer 4 PDUs.** Two atomic Facts: `Segment` and `Datagram`. The TCP/UDP attribution that earlier drafts captured as `Segment (TCP)` / `Datagram (UDP)` lives in `tcp-udp-sctp.md` (each protocol has its own Row with header sizes, and the relationship "TCP uses Segments / UDP uses Datagrams" is a cross-Concept Fact best handled by tags or a future relations table — not by parentheticals).
- **SSL/TLS placement is genuinely contested.** Sources variously place it at Layer 4 (because it sits above TCP), Layer 5, or Layer 6. (ISC)² generally accepts Layer 5/6. Documented here at 6. The earlier `(debated placement)` parenthetical was editorial commentary, not a Fact about SSL/TLS — it lives in this Notes section now where it belongs.
- **Data Link `Ethernet`.** Earlier draft said `Ethernet (MAC)` because MAC addressing is the Data Link sub-protocol. MAC is captured separately in the `primary function` cell ("MAC addressing") so the parenthetical was redundant.
- **Network `IP`.** Earlier draft said `IP (IPv4, IPv6)`. Split into `IPv4` and `IPv6` because they're independently testable Facts. The `IP` family name is implicit.
- **TCP/IP equivalent column** lets the engine generate cross-model questions, e.g. `? | TCP/IP equivalent → Network Access` → Physical, Data Link.
- Memorization mnemonics like "Please Do Not Throw Sausage Pizza Away" can live in study notes — not in the Fact data.

## Engine demo opportunities

- `Data Link | key devices → ?` → Switches, Bridges. Distractors from Layer 1 (Hubs, Repeaters) and Layer 3 (Routers).
- `Network | PDU → ?` → Packet. Distractors from adjacent Rows (Frame, Segment).
- `Session | primary function → ?` → Establish sessions / Maintain sessions / Terminate sessions (multi-Fact cell, accept any one in fill-in or all in select-all).
- `? | primary function → MAC addressing` → Data Link.
- Cross-Row sharing: `? | TCP/IP equivalent → Network Access` → Physical, Data Link (two Rows share).
- Cross-Row sharing: `? | TCP/IP equivalent → Application` → Session, Presentation, Application (three Rows share).
