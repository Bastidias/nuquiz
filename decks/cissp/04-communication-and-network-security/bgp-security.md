# BGP Security Controls

**Domain:** 4 — Communication and Network Security &nbsp;|&nbsp; **Pattern:** Dimensions &nbsp;|&nbsp; **Tags:** 4.1, 4.2

**Status:** draft (SME review pending)

The five BGP security controls CISSP candidates are expected to discriminate. Border Gateway Protocol is the public Internet's routing protocol — and its security model was inadequate by design. BGP trusts whatever neighbors announce, which historically allowed route hijacks (a network announces prefixes it doesn't own) and route leaks (a network propagates routes it shouldn't). The five controls below address the major weaknesses. Sibling Concept `routing-protocols` covers BGP at the protocol level alongside RIP/OSPF/EIGRP.

| Control | what it protects | mechanism | deployment status |
|---|---|---|---|
| RPKI Route Origin Authorization | Origin prefix hijacking [s1] | Cryptographically signed mapping of prefix to authorized origin AS [s1] | Widely deployed by major networks [s1] |
| BGPsec | Path forgery and segment substitution [s2] | Cryptographic signing of each AS in the path attribute [s2] | Limited deployment due to operational cost [s2] |
| Prefix filtering | Inadvertent or malicious propagation of customer prefixes [s3] | Inbound and outbound filter lists per peering session [s3] | Universal best practice at peering edges [s3] |
| TCP Authentication Option | BGP session integrity and DoS [s4] | Per-segment HMAC on TCP session between peers [s4] | Deployed for sensitive peerings<br>Less common than older MD5 option [s4] |
| MANRS | Industry-norm baseline for routing security | Voluntary commitment to filtering, anti-spoofing, coordination, and validation [s5] | Adopted by 700+ networks worldwide [s5] |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. **No parentheticals in cells.** Acronym expansions live in this section.
- **Acronym expansions.** `BGP` = Border Gateway Protocol. `RPKI` = Resource Public Key Infrastructure. `ROA` = Route Origin Authorization. `RIR` = Regional Internet Registry. `AS` = Autonomous System. `ASN` = Autonomous System Number. `TCP-AO` = TCP Authentication Option. `MANRS` = Mutually Agreed Norms for Routing Security. `RPKI-ROV` = RPKI Route Origin Validation.
- **BGP's structural weakness.** RFC 4271 specifies BGP without authentication of route announcements. A misconfigured or malicious AS can announce any prefix, and neighbors will believe it absent additional controls. The 2008 YouTube outage (Pakistan Telecom announced YouTube's prefix), the 2018 Amazon Route 53 attack (route hijack to redirect cryptocurrency wallets), and ongoing route leaks demonstrate the operational impact. Modern BGP security adds external trust anchors and cryptographic checks on top of the base protocol.
- **RPKI is the dominant deployed control.** Resource Public Key Infrastructure ties IP prefix ownership to the originating AS via X.509 certificates issued by the five RIRs. A *Route Origin Authorization* (ROA) is a signed statement: "AS X is authorized to originate prefix Y/Z." Routers performing *Route Origin Validation* (RPKI-ROV) check incoming announcements against ROAs and drop or de-prefer invalid ones. Major networks (Cloudflare, Google, AWS, most Tier-1 transit providers) have deployed RPKI-ROV; Cloudflare's "Is BGP safe yet?" tracker measures industry adoption.
- **RPKI authenticates origin only, not path.** RPKI-ROV verifies that the origin AS in an announcement is authorized for the prefix. It does *not* verify the AS path leading to that origin — an attacker who forges an announcement claiming "I'm one hop from the legitimate origin" can pass RPKI-ROV. BGPsec was designed to close this gap.
- **BGPsec extends signing to the full path.** RFC 8205 specifies BGPsec — each AS along the path signs the announcement, producing a cryptographically verifiable chain. BGPsec deployment is limited by operational cost: every router must perform signature verification at line rate, and signature size adds to BGP UPDATE message volume. Most production networks deploy RPKI-ROV but not BGPsec; ASPA (RFC 9774) is an emerging path-validation approach with lower overhead.
- **Prefix filtering is the universal baseline.** Whatever cryptographic controls are deployed, networks should still filter inbound BGP announcements based on what they expect from each peer (typically restricted to that peer's customer cone) and filter outbound based on what should leave their AS (typically only their own prefixes plus customer prefixes for transit relationships). Prefix filtering catches misconfigurations and mistakes that RPKI alone wouldn't.
- **TCP-AO replaces TCP MD5.** RFC 5925 specifies TCP Authentication Option as the modern session-integrity mechanism for BGP, replacing the older RFC 2385 TCP MD5 Signature Option. TCP-AO uses HMAC-SHA-1/256 instead of MD5, supports key rotation without session reset, and is the recommendation for new deployments. Many existing BGP sessions still use TCP MD5 for backward compatibility.
- **MANRS sets the operational norm.** Mutually Agreed Norms for Routing Security is an Internet Society initiative. Participating networks commit to four actions: prevent propagation of incorrect routing information (filter), prevent traffic with spoofed source addresses (BCP 38), facilitate global operational communication, and enable global validation of routing information (RPKI). MANRS is voluntary but increasingly required by transit-provider contracts and reciprocal-peering agreements.
- **Cross-Concept link.** Sibling Concept `routing-protocols` covers BGP alongside RIP/OSPF/EIGRP. `network-attacks` covers spoofing-related attacks that BCP 38 addresses (related to MANRS action 2). `ddos-attack-types` covers reflection attacks that source-address validation prevents. `ddos-attack-types` also references RTBH and BGP Flowspec as DDoS mitigation primitives that depend on secured BGP sessions.
- **Out of scope for this Concept:** BGP protocol mechanics in detail (RFC 4271), RTBH and Flowspec, ASPA (Autonomous System Provider Authorization, RFC 9774 — successor to BGPsec for path validation), Internet routing registry data quality, BGP confederation security, MPLS / segment routing security, RIPE NCC / ARIN / APNIC / LACNIC / AFRINIC RPKI service operations, Path Origin Validation versus Path Validation distinction in detail.

### Tricky distractors

- **RPKI authenticates origin, not path.** Single most-tested BGP-security distinction. Wrong-answer pattern: claiming RPKI prevents all hijacks — an attacker claiming to be one hop from the legitimate origin passes RPKI but BGPsec catches it.
- **BGPsec adds path signing.** Cryptographic chain along AS path. Wrong-answer pattern: equating BGPsec with RPKI — RPKI is origin only; BGPsec is path.
- **Prefix filtering is universal baseline.** Even with cryptographic controls. Wrong-answer pattern: claiming RPKI deployment removes the need for prefix filters — opposite, both are required.
- **TCP-AO replaces TCP MD5.** RFC 5925 over RFC 2385. Wrong-answer pattern: recommending TCP MD5 for new deployments — TCP-AO is the modern choice.
- **BGPsec deployment is limited.** RPKI is widely deployed; BGPsec is not. Wrong-answer pattern: claiming both are equivalently deployed — BGPsec's operational cost has held back adoption.
- **MANRS is voluntary.** Industry norms initiative. Wrong-answer pattern: claiming MANRS is a regulatory requirement — it's not, but transit providers increasingly require participation.

### Values without a direct public citation

| Cell | Value | Why unsourced |
|---|---|---|
| Prefix filtering × all cells | Phrasings | RFC 7454 [s3] discusses BGP operational security including filtering; specific cell phrasings are pedagogical summaries. |
| MANRS × all cells | — | MANRS is documented at manrs.org [s5]; specific cell phrasings reflect synthesis of MANRS commitment categories. |
| All rows × deployment status | Adoption descriptors | Industry-typical adoption framings; specific deployment percentages vary by source and date. |

## Engine demo opportunities

- `RPKI Route Origin Authorization | what it protects → ?` → `Origin prefix hijacking`
- `BGPsec | what it protects → ?` → `Path forgery and segment substitution`
- `? | what it protects → Origin prefix hijacking` → `RPKI Route Origin Authorization`
- `? | mechanism → Cryptographically signed mapping of prefix to authorized origin AS` → `RPKI Route Origin Authorization`
- `? | mechanism → Cryptographic signing of each AS in the path attribute` → `BGPsec`
- `? | mechanism → Per-segment HMAC on TCP session between peers` → `TCP Authentication Option`
- `Prefix filtering | mechanism → ?` → `Inbound and outbound filter lists per peering session`
- `MANRS | mechanism → ?` → `Voluntary commitment to filtering, anti-spoofing, coordination, and validation`
- Composite RPKI Route Origin Authorization Row with `what it protects` swapped to `Path forgery and segment substitution` (BGPsec's value) — directly tests the RPKI-vs-BGPsec distinction (RPKI is origin only; BGPsec is path)
- Composite BGPsec Row with `deployment status` swapped to `Widely deployed by major networks` (RPKI's status) — tests the deployment-reality distinction (RPKI is widespread; BGPsec is limited)
- Composite TCP Authentication Option Row with `mechanism` swapped to `Cryptographically signed mapping of prefix to authorized origin AS` (RPKI's value) — tests session-integrity vs origin-validation (TCP-AO protects the session; RPKI authenticates the announcement)

## Sources

- `[s1]`: RFC 6480, "An Infrastructure to Support Secure Internet Routing" — RPKI architecture (February 2012, retrieved 2026-04-30, https://datatracker.ietf.org/doc/html/rfc6480). RFC 6481, "A Profile for Resource Certificate Repository Structure" (February 2012, retrieved 2026-04-30, https://datatracker.ietf.org/doc/html/rfc6481). NIST SP 1800-14, "Protecting the Integrity of Internet Routing: Border Gateway Protocol (BGP) Route Origin Validation" (June 2019, retrieved 2026-04-30, https://csrc.nist.gov/pubs/sp/1800/14/final)
- `[s2]`: RFC 8205, "BGPsec Protocol Specification" — path-validation extension (September 2017, retrieved 2026-04-30, https://datatracker.ietf.org/doc/html/rfc8205)
- `[s3]`: RFC 7454, "BGP Operations and Security" — BCP 194 with prefix-filtering guidance (February 2015, retrieved 2026-04-30, https://datatracker.ietf.org/doc/html/rfc7454)
- `[s4]`: RFC 5925, "The TCP Authentication Option" — TCP-AO replacement for TCP MD5 (June 2010, retrieved 2026-04-30, https://datatracker.ietf.org/doc/html/rfc5925). RFC 2385 lineage for TCP MD5 historical context.
- `[s5]`: Internet Society, "Mutually Agreed Norms for Routing Security (MANRS)" — voluntary routing-security commitment program (retrieved 2026-04-30, https://www.manrs.org/)
- `[s6]`: (ISC)² CISSP Certification Exam Outline, effective 2024-04-15, Domain 4 §4.1 *Apply secure design principles in network architectures* and §4.2 *Secure network components* (retrieved 2026-04-30, https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline)
