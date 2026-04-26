# NIDS vs HIDS

**Domain:** 7 — Security Operations &nbsp;|&nbsp; **Pattern:** Dimensions &nbsp;|&nbsp; **Tags:** 7.7
**Status:** draft (SME review pending)

The two intrusion-detection deployment topologies plus the hybrid that combines them. Network-based IDS (NIDS) sees packets on the wire; host-based IDS (HIDS) sees process and file activity inside one machine. Each has structural blind spots — NIDS cannot see encrypted payloads or local-only activity; HIDS only sees hosts where an agent is installed. The CISSP exam tests both the placement distinction and the matchup between deployment type and threat visibility.

| type | placement | what it sees | blind spots |
|---|---|---|---|
| NIDS | Inline on network segment [s1]<br>Mirrored via SPAN port [s1] | Network packet contents [s1]<br>Network protocol behavior [s1] | Encrypted traffic payloads [s1]<br>Activity local to a host [s1] |
| HIDS | Software agent on host [s1] | Host process activity [s1]<br>Host file integrity [s1] | Activity on hosts without an agent [s1]<br>Network-level reconnaissance [s1] |
| Hybrid | Network sensor placement [s1]<br>Host agent placement [s1] | Network events [s1]<br>Host events [s1] | Coverage depends on weakest leg [needs source] |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. No parentheticals in cells. The repeated structural shape (NIDS placement and HIDS placement appear as separate Facts in the Hybrid row) is intentional — it makes the "Hybrid is the union" relationship explicit and lets the engine reason about cross-row composition.
- **Tag 7.7 retained from stub.** Matches (ISC)² 2024 outline §7.7 *Operate and maintain detective and preventative measures*. Sibling Concepts: `ids-ips-types.md` (detection methodology, orthogonal to deployment), `siem-soar-xdr.md` (the platforms that ingest these data sources).
- **NIDS placement: inline vs. SPAN.** Inline placement (the sensor is in the data path) lets a NIDS act as an IPS — it can drop traffic. SPAN/mirror placement (the sensor receives a copy of traffic from a switch port) is detection-only because the original packet has already been forwarded. Most production deployments use a mix — inline at perimeter chokepoints, SPAN inside the network for analysis without latency.
- **The encryption blind spot is the test favorite.** TLS 1.3 and ubiquitous HTTPS mean NIDS sees less than it used to — packet headers are visible (5-tuple, SNI, certificate metadata) but payloads are opaque without TLS interception. This is why HIDS / EDR (host-side observation) has grown in importance: it sees the plaintext after decryption on the host. The matchup question on the exam: "What detects malicious activity inside encrypted traffic?" → HIDS (or EDR), not NIDS.
- **HIDS coverage gap.** HIDS only protects hosts that have an agent installed. Unmanaged devices, IoT, contractor laptops, and any system the agent does not support are invisible to HIDS. This is also why CIS Control 1 (asset inventory) is a prerequisite for effective HIDS — you cannot deploy agents to assets you do not know about.
- **Hybrid is the realistic answer.** Most enterprise deployments are hybrid in practice: NIDS at network egress and east-west chokepoints, HIDS/EDR on managed endpoints. The exam may present a scenario that explicitly requires both — e.g., detecting both lateral movement (network signal) and post-compromise persistence (host signal).
- **Gaps marked `[needs source]`:** one Fact — Hybrid's "Coverage depends on weakest leg" blind spot. Practitioner consensus but not yet sourced to a primary publication.

## Engine demo opportunities

- `? | what it sees → Network packet contents` → NIDS
- `HIDS | blind spots → ?` → `Activity on hosts without an agent` or `Network-level reconnaissance`
- `? | placement → Software agent on host` → HIDS
- `NIDS | blind spots → ?` with `Activity on hosts without an agent` (HIDS) as a tempting wrong answer
- Cross-Row composition: Hybrid's `placement` cell carries both NIDS and HIDS placement Values — engine can reason about Hybrid as union of NIDS and HIDS rows
- Composite Row profile: NIDS across all Columns with `what it sees` swapped to `Host process activity` (HIDS's value)

## Sources

- `[s1]`: NIST SP 800-94 *Guide to Intrusion Detection and Prevention Systems (IDPS)*, February 2007 — particularly §5 Network-Based IDPS and §7 Host-Based IDPS deployment characteristics (retrieved 2026-04-25, https://csrc.nist.gov/pubs/sp/800/94/final)
- `[s2]`: NIST CSRC glossary entry *Network Intrusion Detection System* (retrieved 2026-04-25, https://csrc.nist.gov/glossary/term/Network_Intrusion_Detection_System)
- `[s3]`: (ISC)² CISSP Certification Exam Outline, effective 2024-04-15, Domain 7 §7.7 *Operate and maintain detective and preventative measures* (retrieved 2026-04-25, https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline)
