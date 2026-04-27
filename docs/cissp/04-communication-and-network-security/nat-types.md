# NAT Types

**Domain:** 4 — Communication and Network Security &nbsp;|&nbsp; **Pattern:** Dimensions &nbsp;|&nbsp; **Tags:** 4.1
**Status:** draft (SME review pending)

The four Network Address Translation variants CISSP candidates should distinguish. Static NAT maps one private address to one public address one-to-one; dynamic NAT maps from a pool; PAT (the most common — also called NAPT or "NAT overload") shares a single public address across many private hosts using port distinction; twice-NAT translates both source and destination simultaneously. CISSP testing focuses on the PAT model that consumer routers use and on the security side-effects of NAT (defense-in-depth benefit, IPsec / end-to-end protocol break).

| Type | mapping | typical use | port translation |
|---|---|---|---|
| Static NAT | One private address to one public address fixed | Servers reachable from internet | None |
| Dynamic NAT | Private addresses to pool of public addresses on demand | Limited public IP pool with many internal hosts | None |
| PAT | Many private addresses to one public address with port distinction | Home and small-office router default | Yes — port number distinguishes flows |
| Twice-NAT | Both source and destination simultaneously translated | Overlapping address space between two networks | Yes if PAT applied |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. **No parentheticals in cells.**
- **Acronym expansions.** `NAT` = Network Address Translation. `PAT` = Port Address Translation, also called `NAPT` (Network Address and Port Translation) or "NAT overload." `RFC 1918` defines the private IPv4 address ranges that NAT typically translates.
- **PAT is what consumer routers do.** The Linksys / Netgear / TP-Link router in a typical home translates dozens of devices behind a single ISP-assigned public IP using PAT. Distinct flows from different internal hosts use different ephemeral source ports on the public side; the NAT table maps `(public IP : public port)` to `(private IP : private port)` for return traffic.
- **Static NAT for inbound services.** A web server at private `192.168.1.10` reachable as public `203.0.113.5` is static-NAT. The mapping is permanent and bidirectional — external clients can initiate connections to the public IP and reach the server.
- **Dynamic NAT for outbound only.** Dynamic NAT pulls from a pool of public addresses for outbound connections. Without port translation, the pool size limits concurrent flows. Mostly historical now — superseded by PAT for address-conservation use cases.
- **Twice-NAT (NAT-NAT) for overlapping spaces.** When two networks merge after acquisition and both use `10.0.0.0/8`, neither side can route to the other directly. Twice-NAT translates *both* addresses (source from network A becomes a non-conflicting address; destination is the pre-translated address before the merge). Specialized use case.
- **NAT and IPsec.** NAT breaks IPsec AH (the AH ICV covers the IP header, which NAT modifies — invalidating the ICV). NAT-Traversal (NAT-T, RFC 3948) wraps IPsec ESP in UDP 4500 to survive NAT. AH cannot survive NAT regardless. Sibling Concepts: `ipsec-ah-vs-esp` covers AH/ESP details.
- **NAT is not a firewall.** Common misconception. NAT prevents *unsolicited inbound connections* by default because the NAT table has no return mapping for an outside-initiated flow — but this is a side-effect, not a security feature. A misconfigured NAT table or a compromised internal host can produce unrestricted inbound; relying on NAT for security is brittle. Use a real firewall.
- **NAT and end-to-end principle.** NAT breaks the IP "end-to-end" addressing assumption — the public IP in a packet is not the actual host's address. Some protocols (FTP, SIP, H.323) embed addresses in payload and require Application Layer Gateway (ALG) support in the NAT to rewrite. Increases NAT complexity.
- **IPv6 and NAT.** IPv6's address abundance was supposed to eliminate NAT (no scarcity to compensate for). In practice, some networks deploy NAT66 / NPTv6 for topology-hiding or multi-homing — both *not required* and *discouraged* by IPv6 design philosophy. Sibling Concept `ipv4-vs-ipv6` covers this.
- **CGN — Carrier-Grade NAT.** ISPs running out of IPv4 deploy CGN (large-scale NAT at the ISP edge). This places customers behind two layers of NAT (home router + ISP CGN) and breaks port-forwarding, gaming, peer-to-peer applications. RFC 6598 reserves `100.64.0.0/10` for CGN.
- **Cross-Concept link.** `ipv4-vs-ipv6` covers IPv6's reduced NAT requirement. `firewall-types` covers the security control that NAT is sometimes mistaken for. `vpn-protocols` covers how VPN traversal interacts with NAT.

### Tricky distractors

- **NAT vs PAT terminology.** "NAT" is sometimes used loosely to mean any translation; "PAT" specifies port-based sharing. The exam may use "NAT" to mean PAT in casual usage. When asked specifically about port translation, the answer is PAT / NAPT.
- **NAT as security control.** Wrong-answer pattern: claiming NAT *is* a firewall or *provides* security. NAT has a side-effect of blocking some inbound connections; it is not a security control. Correct answer: NAT is an address-translation mechanism; security must come from a firewall.
- **NAT and IPsec.** Wrong-answer pattern: "NAT works fine with all IPsec." Correct: NAT breaks AH; ESP requires NAT-T to survive NAT. AH+NAT is structurally incompatible.

### Values without a direct public citation

| Cell | Value | Why unsourced |
|---|---|---|
| All rows × typical use | Use-case examples | RFC 3022 / RFC 4787 specify NAT mechanics; specific use-case framing is industry-typical. |

## Engine demo opportunities

- `Static NAT | mapping → ?` → `One private address to one public address fixed`
- `PAT | mapping → ?` → `Many private addresses to one public address with port distinction`
- `Twice-NAT | typical use → ?` → `Overlapping address space between two networks`
- `? | mapping → One private address to one public address fixed` → `Static NAT`
- `? | port translation → Yes — port number distinguishes flows` → `PAT`
- `? | typical use → Home and small-office router default` → `PAT`
- Composite Static NAT Row with `mapping` swapped to `Many private addresses to one public address with port distinction` — directly tests static-vs-PAT distinction (static is fixed 1:1; PAT is many-to-one with port multiplexing)
- Composite PAT Row with `port translation` swapped to `None` — tests that PAT *is defined by* port translation (without port translation it would be dynamic NAT)
- Composite Twice-NAT Row with `typical use` swapped to `Servers reachable from internet` — tests twice-NAT specificity (overlapping address space, not server publishing)

## Sources

- `[s1]`: RFC 3022, "Traditional IP Network Address Translator (Traditional NAT)" — the foundational NAT specification (January 2001, retrieved 2026-04-26, https://datatracker.ietf.org/doc/html/rfc3022)
- `[s2]`: RFC 4787, "Network Address Translation (NAT) Behavioral Requirements for Unicast UDP" (January 2007, retrieved 2026-04-26, https://datatracker.ietf.org/doc/html/rfc4787)
- `[s3]`: RFC 1918, "Address Allocation for Private Internets" — RFC 1918 private address ranges that NAT translates (February 1996, retrieved 2026-04-26, https://datatracker.ietf.org/doc/html/rfc1918)
- `[s4]`: RFC 6598, "IANA-Reserved IPv4 Prefix for Shared Address Space" — Carrier-Grade NAT shared range (April 2012, retrieved 2026-04-26, https://datatracker.ietf.org/doc/html/rfc6598)
