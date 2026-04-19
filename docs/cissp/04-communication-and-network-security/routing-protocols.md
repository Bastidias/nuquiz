# Routing Protocols

**Domain:** 4 — Communication and Network Security &nbsp;|&nbsp; **Pattern:** Dimensions &nbsp;|&nbsp; **Tags:** 4.1, 4.2
**Status:** draft (SME review pending)

The four dynamic routing protocols CISSP candidates are expected to discriminate: RIP, OSPF, BGP, and EIGRP. Testing focuses on the algorithm family (distance vector vs link-state vs path vector vs hybrid), the metric, the scope (interior gateway protocol vs exterior), and the transport/port — each of which is a discriminating Column in this Concept. Static routing and OSPFv3 (IPv6) are out of scope for this Concept.

| Protocol | RFC | type | algorithm | metric | max hop count | scope | transport | port/protocol |
|---|---|---|---|---|---|---|---|---|
| RIP | RFC 2453 [s1] | Distance vector [s1] | Bellman-Ford [s1] | Hop count [s1] | 15 [s1] | Interior | UDP [s1] | UDP 520 [s1] |
| OSPF | RFC 2328 [s2] | Link-state [s2] | Dijkstra [s2] | Cost [s2] | None | Interior | IP [s2] | IP 89 [s2] |
| BGP | RFC 4271 [s3] | Path vector [s3] | Best path selection | AS path length [s3] | None | Exterior [s3] | TCP [s3] | TCP 179 [s3] |
| EIGRP | RFC 7868 [s4] | Hybrid [s4] | DUAL [s4] | Composite [s4] | 100 | Interior [s4] | IP [s4] | IP 88 [s4] |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. **No parentheticals in cells.** RFC numbers and port identifiers are treated as single atomic tokens.
- **Interior vs exterior.** RIP, OSPF, and EIGRP are Interior Gateway Protocols (IGPs) — they distribute routes *within* an autonomous system. BGP is the Exterior Gateway Protocol (EGP) that distributes routes *between* autonomous systems and is the protocol that holds the public Internet's routing table together. BGP can also be run as iBGP inside an AS; that deployment mode is out of scope here.
- **OSPF and EIGRP `transport = IP`.** Neither runs over TCP or UDP. OSPF uses IP protocol 89; EIGRP uses IP protocol 88. RIP is the odd IGP out — it uses UDP 520 because RIPv1/v2 pre-date the convention of putting routing protocols directly on IP.
- **BGP `transport = TCP 179`.** BGP is unusual among routing protocols in that it relies on TCP for reliability, explicit fragmentation, retransmission, and sequencing. RFC 4271 [s3] explicitly cites this design choice as "eliminating the need to implement explicit update fragmentation, retransmission, acknowledgement, and sequencing" within BGP itself.
- **EIGRP `type = Hybrid`.** RFC 7868 [s4] describes EIGRP as "a hybrid dynamic distance-vector and link-state interior gateway routing protocol." CISSP study material sometimes calls EIGRP "advanced distance vector" instead; both framings refer to the same protocol. The cell reflects the RFC's wording.
- **EIGRP `metric = Composite`.** DUAL computes a composite metric from bandwidth, delay, and optionally load and reliability (weighted by operator-configured K-values). The cell lists the category, not the component list, to keep the Fact atomic. The component list belongs to a separate EIGRP-metric Concept if it becomes testable.
- **RIP `max hop count = 15`.** RIP defines 16 as "infinity" (unreachable), making 15 the maximum valid hop count. This is the canonical diameter limit and the reason RIP is unsuitable for large networks.
- **OSPF and BGP `max hop count = None`.** Neither protocol uses hop count as a metric or a loop-prevention tool. OSPF uses LSA sequence numbers and age-based aging; BGP uses AS_PATH to detect loops.
- **Security note.** None of these protocols encrypt their updates by default. RIPv2, OSPFv2, and BGP support message authentication (MD5 for RIPv2/OSPFv2; TCP-AO / MD5 for BGP); EIGRP supports HMAC-SHA. Full routing-security discussion (RPKI, BGPsec, route leaks, route hijacking) belongs in a separate Concept.
- **Out of scope for this Concept:** OSPFv3 (IPv6), RIPng (IPv6), IS-IS, MP-BGP extensions, route redistribution, routing-protocol attack surface (route hijacking, BGP prefix hijacks, RPKI validation). Each warrants its own Concept.

### Values without a direct public citation

| Cell | Value | Why unsourced |
|---|---|---|
| RIP × scope | `Interior` | Universal CISSP teaching; RFC 2453 [s1] does not use the exact term "Interior Gateway Protocol" in the sections located. |
| OSPF × scope | `Interior` | Same — OSPF is the canonical IGP but RFC 2328 [s2] extract did not contain the exact IGP/EGP label. |
| OSPF × max hop count | `None` | Inferred from OSPF using Dijkstra SPF with cost-based metric; RFC 2328 does not define a hop limit. |
| BGP × algorithm | `Best path selection` | RFC 4271 [s3] specifies the BGP decision process as a series of tiebreakers rather than a named algorithm. "Best path selection" is the CISSP-curriculum label. |
| BGP × max hop count | `None` | BGP uses AS_PATH for loop detection rather than a hop limit. Not explicitly stated as "no hop limit" in RFC 4271 extract located. |
| EIGRP × max hop count | `100` | Widely documented as EIGRP's default hop limit (configurable up to 255) but not captured in the RFC 7868 [s4] extract located. |

## Engine demo opportunities

- `RIP | max hop count → ?` → `15`
- `OSPF | algorithm → ?` → `Dijkstra`
- `BGP | port/protocol → ?` → `TCP 179`
- `EIGRP | algorithm → ?` → `DUAL`
- `? | scope → Exterior` → `BGP`
- `? | scope → Interior` → `RIP`, `OSPF`, `EIGRP` — shared-Value select-all
- `? | transport → IP` → `OSPF`, `EIGRP` — shared-Value select-all
- `? | max hop count → None` → `OSPF`, `BGP` — shared-Value select-all
- `? | type → Distance vector` → `RIP`
- `? | metric → Hop count` → `RIP`
- Composite RIP Row with `type` swapped to `Link-state` — directly tests the RIP/OSPF confusion (distance vector vs link-state is the single most common exam mix-up)
- Composite BGP Row with `transport` swapped to `UDP` — tests the BGP-uses-TCP Fact specifically

## Sources

- `[s1]`: RFC 2453, "RIP Version 2" (November 1998, retrieved 2026-04-19, https://datatracker.ietf.org/doc/html/rfc2453)
- `[s2]`: RFC 2328, "OSPF Version 2" (April 1998, retrieved 2026-04-19, https://datatracker.ietf.org/doc/html/rfc2328)
- `[s3]`: RFC 4271, "A Border Gateway Protocol 4 (BGP-4)" (January 2006, retrieved 2026-04-19, https://datatracker.ietf.org/doc/html/rfc4271)
- `[s4]`: RFC 7868, "Cisco's Enhanced Interior Gateway Routing Protocol (EIGRP)" (May 2016, retrieved 2026-04-19, https://datatracker.ietf.org/doc/html/rfc7868)
