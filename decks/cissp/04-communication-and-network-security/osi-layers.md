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

### Tricky distractors

- **PDU naming.** Bit (L1), Frame (L2), Packet (L3), Segment / Datagram (L4), Data (L5-7). Wrong-answer pattern: calling a Layer-3 unit a "frame" or Layer-4 a "packet." The Frame ↔ Packet distinction is a high-yield exam item.
- **Routers vs Switches.** Routers operate at Layer 3 (Network — IP addresses); Switches operate at Layer 2 (Data Link — MAC addresses). Layer-3 switches exist (do both) but the vanilla "switch" is L2. Wrong-answer pattern: claiming routers operate at Layer 2.
- **SSL/TLS layer placement.** Officially debated. Most CISSP sources place TLS at L5 (Session) or L6 (Presentation). Some place it at L4 because it sits above TCP. The exam-favored answer is usually L5/L6 — be aware the question may accept multiple. Wrong-answer pattern: insisting on a single layer assignment.
- **TCP/IP four-layer model mapping.** Network Access = OSI Physical + Data Link. Application = OSI Session + Presentation + Application. Wrong-answer pattern: 1:1 mapping between models — they aren't 1:1.
- **Hubs vs Switches.** Hubs (L1) broadcast to all ports. Switches (L2) forward based on MAC address. Wrong-answer pattern: calling a switch a "Layer 1 device" because it has physical ports.
- **Encapsulation direction.** Data flows down the stack on the sender (L7 → L1) and up on the receiver (L1 → L7). Wrong-answer pattern: thinking encapsulation goes "up" the stack on send.

## Engine demo opportunities

- `Data Link | key devices → ?` → Switches, Bridges. Distractors from Layer 1 (Hubs, Repeaters) and Layer 3 (Routers).
- `Network | PDU → ?` → Packet. Distractors from adjacent Rows (Frame, Segment).
- `Session | primary function → ?` → Establish sessions / Maintain sessions / Terminate sessions (multi-Fact cell, accept any one in fill-in or all in select-all).
- `? | primary function → MAC addressing` → Data Link.
- Cross-Row sharing: `? | TCP/IP equivalent → Network Access` → Physical, Data Link (two Rows share).
- Cross-Row sharing: `? | TCP/IP equivalent → Application` → Session, Presentation, Application (three Rows share).
