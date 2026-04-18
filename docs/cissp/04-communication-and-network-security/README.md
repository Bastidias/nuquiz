# Domain 4: Communication and Network Security

**Weight:** 13% &nbsp;|&nbsp; **Target triples:** ~650 &nbsp;|&nbsp; **Status:** Concept scaffold pending; 4 demo Concepts drafted

---

## Why this Domain is our engine-demo target

D4 exercises all three Predicate styles in a single domain, so it's the best place to prove the engine across question types:

| Pattern | Example Concepts | Demonstrates |
|---|---|---|
| Dimensions (compare-contrast) | TCP vs UDP vs SCTP | Same-predicate distractor sourcing, discriminating-Object questions |
| Dimensions (wide) | OSI Layers | Many-row comparison, "which layer" axis-hiding |
| Positions with depth rows | TCP 3-way handshake, TLS handshake | Sequence recall, progressive-mastery depth |

---

## (ISC)² Sub-objectives (verify)

| # | Sub-objective |
|---|---|
| 4.1 | Apply secure design principles in network architectures |
| 4.2 | Secure network components |
| 4.3 | Implement secure communication channels according to design |

---

## Drafted Concepts (demo set)

- [`tcp-udp-sctp.md`](tcp-udp-sctp.md) — Transport protocols compared (Dimensions)
- [`osi-layers.md`](osi-layers.md) — 7-layer OSI model (Dimensions)
- [`tcp-handshake.md`](tcp-handshake.md) — 3-way connection establishment (Positions + depth)
- [`tls-handshake.md`](tls-handshake.md) — TLS 1.2 handshake flow (Positions + depth)

## Proposed additional Concepts (not yet drafted)

- Routing protocols (RIP, OSPF, BGP, EIGRP) — Dimensions
- Firewall types (packet filter, stateful, proxy, NGFW, WAF) — Dimensions
- VPN protocols (IPsec, SSL/TLS, L2TP, PPTP, WireGuard) — Dimensions
- Wireless standards (WEP, WPA, WPA2, WPA3) — Dimensions, with associated attacks as a separate Concept
- Wireless attacks (Evil twin, Deauth, KRACK, WPS attacks) — Dimensions
- Network attacks (DoS/DDoS flavors, spoofing, MITM, session hijacking, ARP poisoning, DNS poisoning) — Dimensions
- Email authentication (SPF, DKIM, DMARC) — Dimensions (all three related, often confused)
- IPsec modes and components (Transport vs Tunnel, AH vs ESP, IKE phases) — Positions + Dimensions
- DNS query flow — Positions with depth rows
- Kerberos authentication flow — Positions with depth rows (also relevant to D5 IAM — tag both)

Est. total for D4: ~22-26 Concepts × ~25 triples avg = ~600 triples. Target met.
