# IPv4 vs IPv6

**Domain:** 4 — Communication and Network Security &nbsp;|&nbsp; **Pattern:** Dimensions &nbsp;|&nbsp; **Tags:** 4.1
**Status:** draft (SME review pending)

The two Internet Protocol versions in production deployment. CISSP testing focuses on the address-space difference (32-bit vs 128-bit), header structure changes (IPv6 simplifies the header), the disappearance of broadcast in favor of multicast, and the security model differences (IPsec was originally mandatory in IPv6 — that mandate has since been relaxed but the integration is tighter than in v4). Most enterprise networks still run dual-stack; pure IPv6 deployments are growing but not dominant.

| Property | IPv4 | IPv6 |
|---|---|---|
| address length | 32 bits [s1] | 128 bits [s2] |
| header size | 20 to 60 bytes [s1] | Fixed 40 bytes [s2] |
| address notation | Dotted decimal [s1] | Colon-separated hexadecimal with double-colon zero compression [s2] |
| broadcast support | Yes | No — replaced by multicast and anycast [s2] |
| address autoconfiguration | DHCP only | DHCPv6 or SLAAC [s2] |
| fragmentation | Routers can fragment | End hosts only [s2] |
| IPsec integration | Optional add-on | Originally mandatory, now recommended [s2] |
| NAT requirement | Standard practice for address conservation | Not required given large address space |
| header checksum | Yes [s1] | No — relies on layer-4 [s2] |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. **No parentheticals in cells.**
- **Address space.** IPv4: 2^32 ≈ 4.3 billion addresses (largely depleted). IPv6: 2^128 ≈ 3.4 × 10^38 addresses — essentially unlimited for foreseeable use. The address-space exhaustion is what drove IPv6 adoption pressure.
- **IPv6 header is fixed 40 bytes vs IPv4's variable 20–60.** IPv6 moves IPv4's optional header fields into separate *extension headers* chained off the main header. Routers no longer need to parse variable-length headers for forwarding — performance benefit. Security implication: extension-header processing has been a source of bypass attacks.
- **Address notation.** IPv4 dotted-decimal: `192.168.1.1`. IPv6 colon-hex: `2001:0db8:0000:0000:0000:ff00:0042:8329`. With zero-compression: `2001:db8::ff00:42:8329`. Double-colon `::` represents one or more groups of zeros, may appear once per address.
- **No broadcast in IPv6.** IPv4 uses broadcast (255.255.255.255 or directed broadcast like 192.168.1.255) for one-to-all delivery. IPv6 eliminates broadcast — uses *multicast* (one-to-many group) and *anycast* (one-to-nearest) instead. Smurf attacks (ICMP echo to broadcast) are structurally impossible in IPv6.
- **Address autoconfiguration.** IPv4 needs DHCP for automatic addressing. IPv6 supports DHCPv6 *and* Stateless Address Autoconfiguration (SLAAC) — hosts derive their own address from the prefix advertised by the router plus their interface identifier. SLAAC is convenient but generates privacy concerns (interface identifier may be a stable hardware-derived value). RFC 4941 specifies privacy extensions to randomize SLAAC addresses.
- **Fragmentation.** IPv4: any router along the path can fragment a packet that exceeds the next link's MTU. IPv6: only the *originating host* fragments — routers drop oversize packets and signal back via ICMPv6 "Packet Too Big". This forces hosts to do Path MTU Discovery and reduces router processing burden.
- **IPsec integration.** IPv6 originally mandated IPsec implementation in every compliant stack (RFC 2460). RFC 6434 relaxed this — IPsec is now "should implement" rather than "must implement." Practical deployments still treat IPsec as optional in IPv6, the same as IPv4. The "IPsec is mandatory in IPv6" claim is a CISSP-tested historical fact.
- **NAT and IPv6.** IPv6's address abundance was supposed to eliminate NAT. In practice, some organizations still deploy NAT66 or NPTv6 for policy reasons (topology hiding, multi-homing). NAT is *not required* but *can be deployed*. The CISSP-tested point: NAT was a workaround for IPv4 address scarcity.
- **No header checksum in IPv6.** IPv4 has a checksum field in every header that routers must recompute on each hop. IPv6 removes it — relies on layer-2 (Ethernet FCS) and layer-4 (TCP/UDP checksums) for integrity. Performance benefit; minor robustness concession.
- **Dual-stack is the dominant deployment.** Most enterprise networks run both protocols simultaneously (IPv4 for legacy and external compatibility, IPv6 for newer infrastructure). Tunneling protocols (6to4, Teredo, ISATAP, NAT64/DNS64) bridge between v4-only and v6-only segments during transition.
- **Security gotchas in dual-stack.** Unintended IPv6 reachability — a host with IPv6 enabled but no IPv6 firewall rules may be reachable via IPv6 even if the IPv4 firewall is correctly configured. Modern host firewalls treat both protocols equivalently; legacy ones may not.

### Tricky distractors

- **"IPsec is mandatory in IPv6."** This was true in the original 1998 IPv6 spec (RFC 2460) but was relaxed in RFC 6434 (2011). The exam may test either version; safest answer to "is IPsec mandatory in IPv6" depends on whether the question references the historical or current spec. Both options are likely on the exam.
- **Broadcast in IPv6.** A common wrong answer is "IPv6 still supports broadcast." False — broadcast is gone, replaced by multicast and anycast.
- **Header size.** IPv6 header is 40 bytes *fixed* (larger than IPv4's *minimum* 20 bytes, smaller than IPv4's *maximum* 60 bytes). Wrong-answer pattern: "IPv6 has a smaller header than IPv4."
- **Address space numerics.** IPv4 = 2^32 ≈ 4.3 billion. IPv6 = 2^128 ≈ 3.4 × 10^38. Wrong-answer pattern: 2^64 (which is the IPv6 *interface identifier* portion, not the full address).

### Values without a direct public citation

| Cell | Value | Why unsourced |
|---|---|---|
| IPv4 × NAT requirement | `Standard practice for address conservation` | Industry framing; RFC 1918 / RFC 3022 cover NAT mechanics without describing it as "standard." |
| IPv6 × NAT requirement | `Not required given large address space` | Same — practice-driven framing rather than RFC quotation. |

## Engine demo opportunities

- `IPv4 | address length → ?` → `32 bits`
- `IPv6 | address length → ?` → `128 bits`
- `IPv4 | header size → ?` → `20 to 60 bytes`
- `IPv6 | header size → ?` → `Fixed 40 bytes`
- `? | broadcast support → No — replaced by multicast and anycast` → `IPv6`
- `? | address autoconfiguration → DHCPv6 or SLAAC` → `IPv6`
- `? | fragmentation → End hosts only` → `IPv6`
- `IPv4 | header checksum → ?` → `Yes`
- `IPv6 | header checksum → ?` → `No — relies on layer-4`
- Composite IPv4 Row with `address length` swapped to `128 bits` — directly tests the address-length distinction (IPv4 is 32; IPv6 is 128)
- Composite IPv6 Row with `broadcast support` swapped to `Yes` — tests the broadcast elimination point (IPv6 has no broadcast)
- Composite IPv6 Row with `IPsec integration` swapped to `Optional add-on` — tests the historical "mandatory in IPv6" Fact (originally mandatory; now recommended)

## Sources

- `[s1]`: RFC 791, "Internet Protocol" — IPv4 specification (September 1981, retrieved 2026-04-26, https://datatracker.ietf.org/doc/html/rfc791)
- `[s2]`: RFC 8200, "Internet Protocol, Version 6 (IPv6) Specification" — current IPv6 specification (July 2017, retrieved 2026-04-26, https://datatracker.ietf.org/doc/html/rfc8200)
- `[s3]`: RFC 6434, "IPv6 Node Requirements" — relaxes IPsec mandatory implementation requirement (December 2011, retrieved 2026-04-26, https://datatracker.ietf.org/doc/html/rfc6434)
- `[s4]`: RFC 4941, "Privacy Extensions for Stateless Address Autoconfiguration in IPv6" — SLAAC privacy extensions (September 2007, retrieved 2026-04-26, https://datatracker.ietf.org/doc/html/rfc4941)
