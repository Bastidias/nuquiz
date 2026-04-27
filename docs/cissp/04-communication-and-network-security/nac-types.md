# NAC Types

**Domain:** 4 — Communication and Network Security &nbsp;|&nbsp; **Pattern:** Dimensions &nbsp;|&nbsp; **Tags:** 4.2
**Status:** draft (SME review pending)

Network Access Control (NAC) variants CISSP candidates should distinguish along three orthogonal axes: **when** access is enforced (before vs after admission), **how** posture is assessed (agent on the endpoint vs network-side scanning), and **what mechanism** authenticates the endpoint (full 802.1X supplicant vs MAC-address-only fallback). NIST SP 800-46 Rev 2 recommends NAC at the network entry point to verify endpoint security posture before allowing internal-network access [s2]. IEEE 802.1X-2020 specifies the port-based authentication framework — supplicant, authenticator, authentication server — that most pre-admission NAC deployments use [s1]. The five Rows below are the canonical CISSP taxonomy; they overlap on purpose (a single deployment can be pre-admission + agent-based + 802.1X-based).

| Type | when enforced | mechanism | strengths | weaknesses | typical deployment |
|---|---|---|---|---|---|
| Pre-admission NAC | Before network access granted [s3] | 802.1X authentication<br>Posture check at connection [s1][s3] | Blocks non-compliant devices at the edge [s3] | No visibility after admission [s3] | Enterprise wired ports<br>Enterprise WLAN |
| Post-admission NAC | After network access granted [s3] | Continuous monitoring<br>Re-authorization at zone boundaries [s3] | Detects lateral movement [s3] | Compromised device already on network [s3] | Segmented internal networks |
| Agent-based | Before network access granted<br>Continuous after admission [s4] | Software agent on endpoint [s4] | Deep posture visibility [s4]<br>Real-time monitoring [s4] | Agent install and maintenance overhead [s4]<br>Limited to supported OSes [s4] | Managed corporate endpoints |
| Agentless | Before network access granted [s4] | Network-side scanning<br>Passive monitoring [s4] | No endpoint software required [s4]<br>Covers IoT and unmanaged devices [s4] | Shallower posture detail [s4] | BYOD<br>IoT segments<br>Guest networks |
| MAB | Before network access granted [s5] | MAC address checked against RADIUS allowlist [s5] | Admits non-supplicant devices [s5] | MAC addresses easily spoofed [s5] | Printers<br>IP phones<br>IoT endpoints [s5] |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. **No parentheticals in cells.** Acronym expansions and context live below.
- **Acronym expansions.** `NAC` = Network Access Control. `MAB` = MAC Authentication Bypass. `802.1X` = IEEE port-based network access control standard. `EAP` = Extensible Authentication Protocol. `EAPOL` = EAP over LAN. `RADIUS` = Remote Authentication Dial-In User Service.
- **The five Rows are not mutually exclusive.** A typical enterprise deployment is pre-admission + agent-based on managed laptops, agentless on the BYOD/IoT VLAN, MAB for printers, and post-admission monitoring across all zones. The CISSP exam tests whether you can distinguish the dimensions, not pick one Row over the others.
- **802.1X has three parties.** Supplicant (the endpoint), authenticator (the switch or AP), and authentication server (typically RADIUS). The authenticator port stays in "unauthorized" state — passing only EAPOL traffic — until the authentication server returns an accept decision [s1]. This is the canonical pre-admission mechanism.
- **Pre-admission vs post-admission are complementary, not alternatives.** Pre-admission blocks non-compliant devices at the edge; post-admission detects lateral movement after the device is on the network. Defense-in-depth deployments run both [s3].
- **Agent-based NAC uses 802.1X-supplicant agents on managed endpoints** (corporate laptops with Windows, macOS, Linux). The agent supplies posture information (patch level, AV signature, disk encryption) along with credentials. Agentless NAC instead profiles the device by its network behavior — DHCP fingerprint, HTTP user-agent, MAC OUI — and applies policy without endpoint cooperation [s4].
- **MAB is the 802.1X fallback for non-supplicant devices.** A printer, IP phone, or sensor cannot run an 802.1X supplicant. After the switch sends three EAPOL identity requests over ~90 seconds with no response, it falls back to MAB: it captures the device's MAC and queries RADIUS for an allowlist match [s5]. Returns the same RADIUS Access-Accept / Reject as 802.1X.
- **MAB is weak.** MAC addresses are visible in unencrypted Layer-2 traffic and trivial to spoof. CISSP framing: MAB is an admission accommodation, not an authentication mechanism. It should be paired with port-level controls (limit which VLAN MAB-authenticated devices reach, restrict to known device types via DHCP fingerprinting) [s5].
- **NAC vs firewall.** NAC controls *whether a device joins the network*; a firewall controls *which traffic flows once on the network*. A device that fails NAC posture check is denied a network address (or placed on a remediation VLAN); a device that passes NAC then has its traffic policed by firewalls and ACLs.
- **NIST 800-46 Rev 2 recommends NAC for telework / BYOD.** The guidance: place BYOD and third-party devices on a separate network, verify posture at the entry point, and treat the BYOD network as a low-trust zone [s2]. Sibling Concepts: `firewall-types` covers traffic-flow control after admission; `vpn-protocols` covers tunneled-remote-access posture checks.
- **Cross-Concept link.** `firewall-types` (post-admission traffic control), `wireless-standards` (802.1X over 802.11 wireless), `authentication-factors` (the credentials that 802.1X transports inside EAP).

### Tricky distractors

- **Pre-admission vs post-admission.** Wrong-answer pattern: claiming pre-admission NAC continues to monitor the device after access is granted. Correct: pre-admission stops at the connection event; ongoing monitoring is post-admission's job [s3]. Defense-in-depth uses both.
- **802.1X vs MAB.** Wrong-answer pattern: treating MAB as "802.1X for non-supplicant devices." MAB is the *fallback* that activates after 802.1X fails (no EAPOL response from the endpoint); it bypasses 802.1X entirely and authenticates by MAC address only [s5]. CISSP framing: 802.1X = EAP-based authentication; MAB = MAC-allowlist admission.
- **MAB security.** Wrong-answer pattern: claiming MAB provides authentication comparable to 802.1X. Correct: MAB authenticates only the MAC address, which is broadcast in cleartext and spoofable; it is an accommodation for legacy devices, not a security control [s5].
- **Agent-based vs agentless coverage.** Wrong-answer pattern: agent-based NAC covers all device types. Correct: agent-based requires a supported OS and an installable agent — IoT sensors, printers, and unmanaged devices typically need agentless or MAB [s4].
- **NAC as a firewall replacement.** Wrong-answer pattern: NAC eliminates the need for firewalls. Correct: NAC controls admission; firewalls control traffic flow after admission. They are complementary controls.

### Values without a direct public citation

| Cell | Value | Why unsourced |
|---|---|---|
| Pre-admission NAC × typical deployment | `Enterprise wired ports`, `Enterprise WLAN` | IEEE 802.1X-2020 [s1] specifies the protocol but does not enumerate deployment scenarios. CISSP-typical framing. |
| Post-admission NAC × typical deployment | `Segmented internal networks` | Vendor literature [s3] frames post-admission as zone-boundary enforcement; no single canonical public source. |
| Agent-based × typical deployment | `Managed corporate endpoints` | Industry-typical. [s4] discusses agent vs agentless trade-offs without naming canonical deployments. |
| Agentless × typical deployment | `BYOD`, `IoT segments`, `Guest networks` | NIST SP 800-46 Rev 2 [s2] recommends separate networks for BYOD and third-party devices but does not specifically prescribe agentless NAC for them. CISSP-typical mapping. |

## Engine demo opportunities

- `Pre-admission NAC | when enforced → ?` → `Before network access granted`
- `Post-admission NAC | when enforced → ?` → `After network access granted`
- `MAB | mechanism → ?` → `MAC address checked against RADIUS allowlist`
- `? | when enforced → Before network access granted` → `Pre-admission NAC`, `Agent-based`, `Agentless`, `MAB` — shared-Value select-all
- `? | mechanism → Software agent on endpoint` → `Agent-based`
- `? | weaknesses → MAC addresses easily spoofed` → `MAB`
- `Agent-based | strengths → ?` → `Deep posture visibility`, `Real-time monitoring` (multi-Fact cell)
- `Agentless | strengths → ?` → `No endpoint software required`, `Covers IoT and unmanaged devices` (multi-Fact cell)
- `? | typical deployment → Printers` → `MAB` (sole-Fact within a multi-Fact cell)
- Composite Pre-admission Row with `when enforced` swapped to `After network access granted` — directly tests pre-vs-post timing
- Composite MAB Row with `mechanism` swapped to `802.1X authentication` — tests that MAB *bypasses* 802.1X rather than implementing it
- Composite Agent-based Row with `weaknesses` swapped to `Shallower posture detail` — tests that the agent-vs-agentless trade-off is depth (agent) vs reach (agentless)

## Sources

- `[s1]`: IEEE 802.1X-2020, "IEEE Standard for Local and Metropolitan Area Networks—Port-Based Network Access Control" (February 2020, retrieved 2026-04-26, https://standards.ieee.org/ieee/802.1X/7345/)
- `[s2]`: NIST SP 800-46 Rev 2, "Guide to Enterprise Telework, Remote Access, and Bring Your Own Device (BYOD) Security" — NAC posture-check recommendations for telework and BYOD networks (July 2016, retrieved 2026-04-26, https://csrc.nist.gov/pubs/sp/800/46/r2/final)
- `[s3]`: Fortinet Cyberglossary, "What Is Network Access Control (NAC)?" — pre-admission vs post-admission framing (retrieved 2026-04-26, https://www.fortinet.com/resources/cyberglossary/what-is-network-access-control)
- `[s4]`: Portnox Blog, "Agent vs Agentless: Navigating Security Posture Assessments" — agent-based vs agentless trade-offs (retrieved 2026-04-26, https://www.portnox.com/blog/application-security/agent-vs-agentless/)
- `[s5]`: Portnox Cybersecurity 101, "Examining MAC Authentication Bypass (MAB)" — MAB mechanism, fallback timing, and security limitations (retrieved 2026-04-26, https://www.portnox.com/cybersecurity-101/authentication/mac-authentication-bypass/)
