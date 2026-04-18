# OSI Layers

**Domain:** 4 — Communication and Network Security &nbsp;|&nbsp; **Predicate style:** Dimensions &nbsp;|&nbsp; **Tags:** 4.1
**Status:** draft (SME review pending)

The seven layers of the OSI reference model. Foundational CISSP knowledge — students must place protocols, devices, and PDUs at the correct layer, and translate to the TCP/IP four-layer model.

| Subject | layer number | PDU | key protocols | key devices | primary function | TCP/IP equivalent |
|---|---|---|---|---|---|---|
| Physical | 1 | Bit | Ethernet physical spec<br>Bluetooth physical<br>USB | Hubs<br>Repeaters<br>Cables<br>NICs (physical interface) | Transmit raw bits over a physical medium | Network Access |
| Data Link | 2 | Frame | Ethernet (MAC)<br>PPP<br>ARP<br>L2TP | Switches<br>Bridges | Node-to-node delivery; MAC addressing and error detection | Network Access |
| Network | 3 | Packet | IP (IPv4, IPv6)<br>ICMP<br>IPsec<br>IGMP | Routers<br>Layer 3 switches | Routing packets between networks; logical (IP) addressing | Internet |
| Transport | 4 | Segment (TCP)<br>Datagram (UDP) | TCP<br>UDP<br>SCTP | Stateful firewalls<br>Load balancers | End-to-end communication; reliability (TCP) or speed (UDP) | Transport |
| Session | 5 | Data | NetBIOS<br>RPC<br>PPTP<br>SOCKS | (software only) | Establish, maintain, and terminate sessions between applications | Application |
| Presentation | 6 | Data | SSL/TLS (debated placement)<br>JPEG<br>MPEG<br>ASCII / Unicode encoding | (software only) | Translation, encryption, and compression between application and session layers | Application |
| Application | 7 | Data | HTTP / HTTPS<br>FTP<br>SMTP<br>DNS<br>SSH<br>Telnet | End-host software | Interface between user applications and the network | Application |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic fact. The "key protocols" and "key devices" cells are intentionally lists — the engine can pull individual items as distractors ("Which layer hosts ARP?" → distractors from other layers' protocol lists).
- **PDU per layer is heavily tested.** The mnemonic "Bit, Frame, Packet, Segment" covers Layers 1-4; 5-7 are commonly grouped as "Data."
- **SSL/TLS placement is genuinely contested.** Sources variously place it at Layer 4 (because it sits above TCP), Layer 5, or Layer 6. (ISC)² generally accepts Layer 5/6. Documented here at 6 with a note; flag in the Concept's notes that this is a known ambiguity students may encounter.
- **TCP/IP equivalent column** lets the engine generate cross-model questions ("Which OSI layers map to TCP/IP's Network Access?" → Physical and Data Link).
- Engine demo opportunities:
  - "Which device operates at Layer 2?" → Switches/Bridges; distractors from Layer 1 (hubs, repeaters) and Layer 3 (routers)
  - "What is the PDU at the Network layer?" → Packet; distractors from adjacent layers (Frame, Segment)
  - "Which layer handles MAC addressing?" → Data Link; classic axis-flipping question
- Memorization mnemonics like "Please Do Not Throw Sausage Pizza Away" can live in study notes — not in the triple data.
