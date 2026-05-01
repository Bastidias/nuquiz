# Web Application Firewall Types

**Domain:** 4 — Communication and Network Security &nbsp;|&nbsp; **Pattern:** Dimensions &nbsp;|&nbsp; **Tags:** 4.2

**Status:** draft (SME review pending)

The four web application firewall (WAF) deployment types CISSP candidates are expected to discriminate. WAFs operate at OSI Layer 7, inspecting HTTP/HTTPS traffic for application-layer attacks (SQL injection, XSS, command injection, OWASP Top 10 patterns) — the layer where traditional firewalls (Layer 3-4 packet filters) and IPS systems are blind. The CISSP exam tests both the per-deployment characteristics and the matchup with the architectural scenario. Sibling Concept `firewall-types` covers Layer 3-4 firewalls; `common-injection-types` in D8 covers the attack classes WAFs detect.

| Type | inspection point | typical use | strengths | weaknesses |
|---|---|---|---|---|
| Network appliance | On-premises inline before web servers [s1] | Enterprise data center protecting many applications [s1] | High throughput<br>Low added latency [s1] | Hardware capital cost<br>Datacenter-only coverage [s1] |
| Cloud-based | Provider-operated edge between users and origin [s2] | Internet-facing applications behind CDN [s2] | Rapid signature updates<br>DDoS mitigation included [s2] | Requires DNS pointing at provider<br>TLS termination at provider [s2] |
| Host-based | Module within the web server process [s3] | Single application with custom rule needs [s3] | Application-specific rule tuning<br>No additional network hop [s3] | CPU consumed on web server<br>Per-host operational overhead [s3] |
| Reverse proxy | Standalone proxy in front of origin servers [s1] | Targeted protection of specific applications [s1] | Application-aware rule sets<br>Centralized TLS termination [s1] | Single point of failure if not redundant<br>Network reconfiguration required [s1] |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. **No parentheticals in cells.** Acronym expansions and product names live in this section.
- **Acronym expansions.** `WAF` = Web Application Firewall. `OWASP` = Open Worldwide Application Security Project. `CRS` = Core Rule Set (the OWASP-maintained ruleset for ModSecurity-compatible WAFs). `CDN` = Content Delivery Network. `RASP` = Runtime Application Self-Protection.
- **Layer-7 inspection is the WAF's reason for existing.** Network firewalls (Layer 3-4) decide based on IP and port — they cannot see SQL injection in an HTTP body or XSS in a URL parameter. WAFs parse HTTP, decode parameters, normalize encodings, and apply rules at the application level. PCI DSS Requirement 6.4.2 (formerly 6.6) specifically requires WAF deployment in front of public-facing web applications handling cardholder data.
- **Negative vs positive security models.** Most WAFs default to a *negative* (deny-known-bad) model — signatures match attack patterns and block. A *positive* (allow-known-good) model defines explicitly what valid requests look like and rejects everything else. Positive models offer stronger protection but require detailed application knowledge and break with every legitimate UI change. Hybrid is common.
- **Cloud-based WAFs dominate internet-facing.** Cloudflare, AWS WAF, Azure WAF, Akamai, Imperva — provider-operated WAFs at the CDN edge. They scale automatically, get rapid signature updates from threat intelligence across the customer base, and bundle DDoS protection. The trade-off: customer DNS must point at the provider's edge, and TLS terminates there (the provider sees plaintext) — which raises sovereignty and trust questions for sensitive workloads.
- **Network-appliance WAFs survive on-premises.** F5 BIG-IP ASM, Imperva on-prem, Fortinet FortiWeb — hardware or virtual appliances inline in the data center. Used when traffic must stay on-premises for regulatory reasons, when extreme throughput is required, or when integration with existing network infrastructure outweighs cloud-WAF flexibility.
- **Host-based WAFs are application-tuned.** ModSecurity (now CRS-driven, originally Apache module, now also nginx) runs inside the web server process. Maximum visibility into the application but consumes server CPU and requires per-host configuration management. Best for single high-value applications where per-application tuning pays back the operational overhead.
- **Reverse-proxy WAFs sit between the network appliance and host-based.** A standalone proxy fronts one or more applications. Easier to scale than host-based, more application-specific than network-appliance. Many enterprises run this pattern with nginx + ModSecurity or HAProxy + custom rules.
- **WAF ≠ RASP.** Sibling Concept `source-code-analysis-types` in D8 covers RASP. WAF inspects requests *before* they reach the application; RASP runs *inside* the application and inspects requests in context. RASP can see post-decryption parameters and post-deserialization values that a WAF cannot. WAF and RASP are complementary, not alternatives.
- **OWASP CRS is the open-source rule baseline.** The OWASP Core Rule Set provides ~250 rules covering the OWASP Top 10 attack classes and is the default baseline for ModSecurity, Coraza, and similar WAFs. Cloud WAFs run their own proprietary rule sets but often expose CRS as a configurable layer.
- **Cross-Concept link.** Sibling `firewall-types` in D4 covers Layer 3-4 firewalls. `common-injection-types` in D8 covers the SQLi/XSS/LDAP injection attacks WAFs detect. `xss-variants` in D8 covers reflected/stored/DOM XSS — WAFs catch reflected and some stored, but not DOM XSS (server doesn't see the payload). `cdn-security` covers the broader CDN context that cloud WAFs operate within.
- **Out of scope for this Concept:** specific WAF products (Cloudflare, AWS WAF, F5 BIG-IP ASM, Imperva, Fortinet FortiWeb, Akamai, Fastly, ModSecurity, Coraza), specific OWASP CRS rules, ML-based WAF tuning, WAF bypass techniques (encoding tricks, parameter pollution, fragmentation), API gateways with WAF features, bot management as adjacent capability.

### Tricky distractors

- **WAF is Layer 7; firewall is Layer 3-4.** Different layers, different attacks. Wrong-answer pattern: claiming a firewall detects SQL injection — only a WAF (or IPS with HTTP-aware signatures) does.
- **Cloud-based WAF requires DNS redirection.** Customer points DNS at provider edge. Wrong-answer pattern: claiming cloud WAF works without DNS change — it doesn't, traffic must route through the provider.
- **WAF terminates TLS.** Provider sees plaintext. Wrong-answer pattern: claiming WAF inspects encrypted traffic without TLS termination — it must terminate to inspect.
- **WAF ≠ RASP.** Pre-app vs in-app. Wrong-answer pattern: equating them — RASP sees post-decryption context WAF can't.
- **PCI DSS requires WAF for cardholder web apps.** Requirement 6.4.2. Wrong-answer pattern: claiming WAF is optional for PCI scope — it's mandatory.
- **WAF doesn't catch DOM XSS.** Server-side payload visibility issue. Wrong-answer pattern: claiming WAF catches all XSS variants — DOM XSS evades because payload never reaches server.

### Values without a direct public citation

| Cell | Value | Why unsourced |
|---|---|---|
| All rows × strengths and weaknesses | Phrasings | Industry-typical product-category trade-offs; no single primary publication enumerates per-deployment strengths/weaknesses with this exact phrasing. |
| All rows × typical use | Use-case phrasings | Pedagogical summaries from vendor and OWASP documentation; not from a single primary source. |

## Engine demo opportunities

- `Network appliance | inspection point → ?` → `On-premises inline before web servers`
- `Cloud-based | inspection point → ?` → `Provider-operated edge between users and origin`
- `? | inspection point → Module within the web server process` → `Host-based`
- `Reverse proxy | inspection point → ?` → `Standalone proxy in front of origin servers`
- `Cloud-based | strengths → ?` → `Rapid signature updates`, `DDoS mitigation included`
- `? | strengths → Application-specific rule tuning`, `No additional network hop` → `Host-based`
- `Network appliance | weaknesses → ?` → `Hardware capital cost`, `Datacenter-only coverage`
- `? | typical use → Internet-facing applications behind CDN` → `Cloud-based`
- Composite Network appliance Row with `inspection point` swapped to `Provider-operated edge between users and origin` (Cloud-based's value) — directly tests the on-prem vs cloud deployment distinction
- Composite Cloud-based Row with `weaknesses` swapped to `Hardware capital cost`, `Datacenter-only coverage` — tests cloud-vs-appliance trade-off (cloud's weakness is DNS dependency, not capital cost)
- Composite Host-based Row with `inspection point` swapped to `Standalone proxy in front of origin servers` — tests host-vs-reverse-proxy distinction (host-based is in the web server process; reverse proxy is a separate process)

## Sources

- `[s1]`: NIST SP 800-95, "Guide to Secure Web Services" — web-service security including application-layer firewall positioning (August 2007, retrieved 2026-04-30, https://csrc.nist.gov/publications/detail/sp/800-95/final). PCI DSS v4.0 Requirement 6.4.2 — public-facing web application protection (retrieved 2026-04-30, https://www.pcisecuritystandards.org/document_library/)
- `[s2]`: OWASP, "Web Application Firewall" community page — deployment models and operating principles (retrieved 2026-04-30, https://owasp.org/www-community/Web_Application_Firewall). OWASP Core Rule Set (CRS) project — open-source WAF rule baseline (retrieved 2026-04-30, https://coreruleset.org/)
- `[s3]`: ModSecurity / Coraza documentation — host-based WAF reference implementation (retrieved 2026-04-30, https://github.com/SpiderLabs/ModSecurity and https://coraza.io/)
- `[s4]`: (ISC)² CISSP Certification Exam Outline, effective 2024-04-15, Domain 4 §4.2 *Secure network components* (retrieved 2026-04-30, https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline)
