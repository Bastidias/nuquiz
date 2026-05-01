# DDoS Attack Types

**Domain:** 4 — Communication and Network Security &nbsp;|&nbsp; **Pattern:** Dimensions &nbsp;|&nbsp; **Tags:** 4.2

**Status:** draft (SME review pending)

The four DDoS attack categories CISSP candidates are expected to discriminate. Each pairs a *target layer* (what resource is exhausted) with an *example attack*, *typical scale*, and *primary mitigation*. The CISSP exam tests both the per-category mechanism and the matchup with the appropriate defense — particularly that volumetric attacks require upstream scrubbing while application-layer attacks require Layer-7 inspection. Sibling Concept `network-attacks` covers single-source DoS classes (SYN flood, Smurf); this Concept covers the *distributed* multi-source variants and amplification.

| Category | target layer | example attack | typical scale | primary mitigation |
|---|---|---|---|---|
| Volumetric | Network bandwidth [s1] | UDP flood<br>ICMP flood [s1] | Multi-gigabit to terabit per second [s1] | Upstream scrubbing service<br>Anycast distribution [s1] |
| Protocol | Network and transport state tables [s1] | SYN flood<br>Ping of Death<br>Fragmented packet flood [s1] | Hundreds of thousands of packets per second [s1] | SYN cookies<br>Stateful firewall<br>Rate limiting [s1] |
| Application-layer | Application server resources [s1] | HTTP flood<br>Slowloris<br>Slow POST [s1] | Lower bandwidth but high request volume [s1] | WAF<br>Rate limiting<br>Connection timeout tuning [s1] |
| Reflection and amplification | Bandwidth via third-party reflectors [s2] | DNS amplification<br>NTP amplification<br>memcached amplification [s2] | Hundreds of gigabits per second from amplification factor [s2] | Source-address validation BCP 38<br>Disable open reflectors<br>Upstream scrubbing [s2] |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. **No parentheticals in cells.** Acronym expansions live in this section.
- **Acronym expansions.** `DDoS` = Distributed Denial of Service. `BCP` = Best Current Practice (IETF). `BGP` = Border Gateway Protocol. `RTBH` = Remotely Triggered Black Hole. `Tbps` = Terabits per second. `pps` = packets per second. `RPS` = Requests per second. `WAF` = Web Application Firewall.
- **Volumetric vs Protocol vs Application — three different exhaustion targets.** Volumetric attacks saturate the *network pipe* — the customer's upstream link is full of attacker traffic so legitimate traffic cannot get in. Protocol attacks consume *state-table* resources on firewalls, load balancers, or servers (half-open TCP connections, fragmentation reassembly buffers). Application-layer attacks consume *server CPU, memory, or thread pool* by sending technically-valid but expensive requests. The mitigation matches the layer attacked.
- **Volumetric requires upstream mitigation.** Once the customer's link is saturated, mitigation downstream cannot help — the bottleneck is *before* the customer. Cloud-based scrubbing services (Cloudflare Magic Transit, AWS Shield Advanced, Akamai Prolexic) accept BGP routing announcements that divert traffic through their high-capacity scrubbing centers, drop the attack, and forward legitimate traffic. Anycast distribution spreads traffic across many edges, raising the bar for saturation.
- **Reflection and amplification deserve their own row.** A reflection attack uses spoofed source addresses to make legitimate servers reply to the *victim*. Amplification adds a multiplier — a small request triggers a much larger response (DNS request 60 bytes → response 4 KB; memcached query has reported amplification factors of 50,000x+). The 1.7 Tbps GitHub attack of 2018 used memcached amplification. Mitigation is dual: defenders enforce BCP 38 source-address validation on egress, and operators of services that can be reflectors close them off (rate limit DNS responses to non-customers, disable memcached UDP listener).
- **Slowloris is the canonical low-bandwidth application DoS.** Open many TCP connections to a web server, send an incomplete HTTP request, hold the connections by sending periodic single-byte continuation. The server's connection pool fills with these slow-attacker connections; legitimate users can't get through. Bandwidth is trivial; the attack works because traditional volumetric defenses see nothing wrong. Mitigation: connection timeout tuning, request-deadline enforcement, WAF inspection, reverse-proxy buffering.
- **DDoS often combines layers.** A modern attack may launch a volumetric flood to saturate the link, *and* an application-layer flood targeting login endpoints, *and* a reflection amplification to overwhelm scrubbing. Defenders need defenses at multiple layers; cloud DDoS providers offer combined "always-on" or "on-demand" mitigation across all four categories.
- **Distinguishing DoS from DDoS.** A *DoS* attack uses a single source. A *DDoS* attack uses many sources (typically a botnet or an open-amplifier set) — making source-IP-based blocking ineffective. Modern attacks are nearly always distributed; "DoS" as a single-source attack is rare outside lab and small-target scenarios.
- **Cross-Concept link.** Sibling Concept `network-attacks` covers single-source SYN flood and Smurf. `ipv4-vs-ipv6` covers Smurf-prevention via directed-broadcast disabling. `wireless-attacks` covers deauth flooding (a Layer-2 DoS variant). `firewall-types` and `web-application-firewall-types` cover the inline defenses. `cdn-security` covers the upstream defenses cloud DDoS services provide.
- **Out of scope for this Concept:** specific scrubbing providers and Magic-Transit / GRE / BGP routing details, RTBH (Remotely Triggered Black Hole) routing, BGP Flowspec, RPKI for source-address validation, IoT botnet operation in detail (Mirai variant lineage), DDoS extortion patterns, ransom DDoS (RDoS), cryptocurrency-mining-as-DDoS-cover.

### Tricky distractors

- **Volumetric needs upstream mitigation.** Customer's link is the bottleneck. Wrong-answer pattern: claiming on-premises firewall mitigates volumetric DDoS — by the time traffic reaches the firewall, the link is already saturated.
- **Application-layer is low-bandwidth.** Slowloris and HTTP flood don't saturate pipes. Wrong-answer pattern: claiming application-layer DDoS requires high bandwidth — opposite, the cleverness is doing damage with little.
- **Reflection requires source-address spoofing.** BCP 38 (RFC 2827) prevents it at egress. Wrong-answer pattern: claiming reflection works without spoofing — without a forged source, the response goes back to the attacker, not the victim.
- **Amplification factor matters.** Memcached UDP can amplify 50,000x; DNS amplifies ~50x. Wrong-answer pattern: claiming all reflection attacks have similar amplification — they vary by orders of magnitude.
- **DDoS uses many sources; DoS uses one.** Wrong-answer pattern: collapsing them — DDoS specifically defeats source-IP-based blocking.
- **WAF is application-layer DDoS defense.** Layer-7 inspection. Wrong-answer pattern: claiming WAF mitigates volumetric — WAF can't help when the link is already saturated.

### Values without a direct public citation

| Cell | Value | Why unsourced |
|---|---|---|
| All rows × typical scale | Bandwidth and packet-rate framings | Industry-typical scale ranges; specific values vary by attack and observed incident. NIST SP 800-61 [s1] discusses DDoS conceptually without prescribing per-category scale. |
| All rows × example attack | Specific attack names | NIST SP 800-61 [s1] addresses DoS at the framework level; attack-specific names (Slowloris, memcached amplification, NTP amplification) reflect industry threat-intelligence reporting rather than a single primary publication. |

## Engine demo opportunities

- `Volumetric | example attack → ?` → `UDP flood`, `ICMP flood`
- `Protocol | example attack → ?` → `SYN flood`, `Ping of Death`, `Fragmented packet flood`
- `Application-layer | example attack → ?` → `HTTP flood`, `Slowloris`, `Slow POST`
- `Reflection and amplification | example attack → ?` → `DNS amplification`, `NTP amplification`, `memcached amplification`
- `? | target layer → Network bandwidth` → `Volumetric`
- `? | target layer → Application server resources` → `Application-layer`
- `? | primary mitigation → SYN cookies` → `Protocol` (sub-Fact in multi-Fact cell)
- `? | primary mitigation → Source-address validation BCP 38` → `Reflection and amplification`
- `? | typical scale → Lower bandwidth but high request volume` → `Application-layer`
- Composite Volumetric Row with `target layer` swapped to `Application server resources` (Application-layer's value) — directly tests target-layer distinction (volumetric saturates pipe; app-layer exhausts server)
- Composite Application-layer Row with `primary mitigation` swapped to `Upstream scrubbing service`, `Anycast distribution` (Volumetric's value) — tests mitigation-to-attack pairing (upstream scrubbing helps volumetric, not app-layer)
- Composite Protocol Row with `example attack` swapped to `Slowloris` (Application-layer's value) — tests attack-to-category pairing (Slowloris is application-layer, not protocol)

## Sources

- `[s1]`: NIST SP 800-61 Rev 2, "Computer Security Incident Handling Guide" — DDoS attack framework and incident response (August 2012, retrieved 2026-04-30, https://csrc.nist.gov/publications/detail/sp/800-61/rev-2/final). RFC 4732, "Internet Denial-of-Service Considerations" — IETF taxonomy of DoS classes (December 2006, retrieved 2026-04-30, https://datatracker.ietf.org/doc/html/rfc4732)
- `[s2]`: RFC 2827 / BCP 38, "Network Ingress Filtering: Defeating Denial of Service Attacks which employ IP Source Address Spoofing" — source-address validation as reflection-attack mitigation (May 2000, retrieved 2026-04-30, https://datatracker.ietf.org/doc/html/rfc2827). CISA, "Understanding Denial-of-Service Attacks" — DDoS variant taxonomy (retrieved 2026-04-30, https://www.cisa.gov/news-events/news/understanding-denial-service-attacks)
- `[s3]`: (ISC)² CISSP Certification Exam Outline, effective 2024-04-15, Domain 4 §4.2 *Secure network components* (retrieved 2026-04-30, https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline)
