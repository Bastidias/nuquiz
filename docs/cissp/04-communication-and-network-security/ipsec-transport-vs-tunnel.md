# IPsec Transport vs Tunnel Mode

**Domain:** 4 — Communication and Network Security &nbsp;|&nbsp; **Pattern:** Dimensions &nbsp;|&nbsp; **Tags:** 4.2, 4.3
**Status:** draft (SME review pending)

The two IPsec encapsulation modes. Transport mode protects only the payload and preserves the original IP header, so the packet is still routable by its original addresses — used between endpoints that each speak IPsec natively. Tunnel mode encapsulates the *entire* original IP packet inside a new outer IP packet, so the original addresses are hidden — used when a security gateway applies IPsec on behalf of hosts behind it, as in site-to-site VPNs. CISSP testing usually frames the distinction as "which mode adds a new IP header" or "which mode is used for site-to-site VPN."

| Mode | typical endpoints | ESP encrypts | outer IP header | original IP header | typical use case |
|---|---|---|---|---|---|
| Transport | Host-to-host [s1] | Payload only [s1] | Original IP header [s1] | Retained [s1] | End-to-end host security |
| Tunnel | Gateway-to-gateway<br>Gateway-to-host [s1] | Original IP packet [s1] | New IP header [s1] | Encapsulated [s1] | Site-to-site VPN |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. **No parentheticals in cells.**
- **The one-line summary.** Transport mode protects *what is inside* the IP packet. Tunnel mode wraps the entire IP packet inside another IP packet. Any exam question that distinguishes the two can be answered from this single point.
- **Tunnel mode is mandatory for gateways.** RFC 4301 specifies that Tunnel mode is *required* when at least one of the IPsec peers is a security gateway applying IPsec on behalf of another host, because the gateway must make the packet routable toward the other gateway. Transport mode cannot support this topology — the original IP header's destination would be the far-end host, not the far-end gateway, and the packet would be undecryptable at the gateway.
- **Transport mode and NAT.** Because Transport mode preserves the original IP header, a NAT device between the two IPsec peers rewrites the header — which breaks AH entirely (AH ICV covers the outer header) and breaks ESP's assumption that the addresses are what the two peers negotiated. NAT-Traversal (NAT-T, UDP 4500) resolves this for ESP; AH in Transport mode through NAT is effectively undeployable.
- **Tunnel mode and address hiding.** The outer IP header's addresses are the gateway-to-gateway pair; the inner (original) addresses are encrypted inside the ESP payload. This is what lets a site-to-site VPN hide the internal topology of both sides from anyone watching the WAN link between the two gateways.
- **Mode is chosen per SA, not per peer.** An IPsec implementation can have one SA in Transport mode and another in Tunnel mode with the same peer — the modes describe how a *particular* Security Association encapsulates, not a global property of the IPsec relationship.
- **Out of scope for this Concept:** AH vs ESP (separate Concept — `ipsec-ah-vs-esp`), IKE phases and SA establishment (separate Concept), transport-adjacency vs iterated-tunneling bundle topologies, BITS (Bump-in-the-Stack) and BITW (Bump-in-the-Wire) implementations.

### Values without a direct public citation

| Cell | Value | Why unsourced |
|---|---|---|
| Transport × typical use case | `End-to-end host security` | Paraphrase of the host-to-host deployment framing; RFC 4301 describes the topology but does not use this exact wording. |
| Tunnel × typical use case | `Site-to-site VPN` | Universal CISSP framing and industry convention; RFC 4301 describes the mechanism without branding the use case. |

## Engine demo opportunities

- `Tunnel | outer IP header → ?` → `New IP header`
- `Transport | outer IP header → ?` → `Original IP header`
- `? | ESP encrypts → Original IP packet` → `Tunnel`
- `? | ESP encrypts → Payload only` → `Transport`
- `? | typical endpoints → Host-to-host` → `Transport`
- `? | typical use case → Site-to-site VPN` → `Tunnel`
- Composite Transport Row with `outer IP header` swapped to `New IP header` — directly tests the "which mode adds a new header" discriminator
- Composite Tunnel Row with `typical endpoints` swapped to `Host-to-host` — tests the mandatory-Tunnel-for-gateway point

## Sources

- `[s1]`: RFC 4301, "Security Architecture for the Internet Protocol" (December 2005, retrieved 2026-04-19, https://datatracker.ietf.org/doc/html/rfc4301)
- `[s2]`: NIST SP 800-77 Revision 1, "Guide to IPsec VPNs" — general IPsec reference (June 2020, retrieved 2026-04-19, https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-77r1.pdf)
