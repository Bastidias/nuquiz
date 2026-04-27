# CDN Security

**Domain:** 4 — Communication and Network Security &nbsp;|&nbsp; **Pattern:** Dimensions &nbsp;|&nbsp; **Tags:** 4.1, 4.3
**Status:** draft (SME review pending)

A Content Delivery Network is a distributed network of edge servers that caches and proxies content close to end users [s1]. Beyond performance, modern CDNs bundle a stack of security functions positioned in front of the origin: edge caching, an integrated Web Application Firewall, DDoS scrubbing, origin protection, and TLS termination. CISA classifies CDNs as a "first line of defense" between agency workloads and the internet because every request traverses the edge before reaching the origin [s2]. CISSP testing distinguishes which CDN function addresses which threat, where each function executes (edge vs origin), and where the function's coverage stops. The five Rows below are the canonical CDN security capabilities; the related general-purpose WAF entry sits in the sibling Concept `firewall-types`.

| Function | threat addressed | OSI layer | enforcement point | typical implementation | key limitation |
|---|---|---|---|---|---|
| Edge caching | Origin overload [s1] | Application | Edge | PoP cache of static content [s1] | Cacheable content only [s1] |
| Integrated WAF | OWASP Top 10 [s4] | Application | Edge | Reverse proxy rule engine [s4] | Tuning per application [s4] |
| DDoS scrubbing | Volumetric flood<br>Application-layer flood [s2] | Network<br>Transport<br>Application [s2] | Edge | Distributed traffic absorption [s2] | Origin IP must stay hidden [s2] |
| Origin protection | Direct-to-origin attack [s3] | Network | Origin | Allowlist of CDN IP ranges<br>Origin authentication tokens [s3] | DNS history can leak origin IP [s3] |
| TLS termination | Eavesdropping<br>Tampering [s3] | Session | Edge | Edge certificate<br>Origin re-encryption [s3] | Plaintext visible at edge [s3] |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. **No parentheticals in cells.**
- **Pattern choice.** Dimensions with five Rows produces the cleanest shared-Value detection: multiple functions enforce at the `Edge`, multiple operate at the `Application` layer, and DDoS scrubbing legitimately spans three OSI layers — exposing the multi-Fact-cell shape the engine should exercise.
- **Edge vs origin enforcement.** Four of the five functions execute at the edge (the CDN's PoPs); only origin protection executes at the origin (allowlists, authentication). The dichotomy is itself a CISSP testing point — students confuse "the CDN handles it" with "the origin handles it."
- **Edge caching is a security capability, not just a performance one.** Caching reduces requests reaching the origin, which limits what an attacker can target [s1]. Azure's CDN guidance frames the application not having to "service requests for the content that is hosted in the CDN" as a load-reduction effect [s1] — that load reduction *is* the origin-protection benefit during a flood.
- **Integrated WAF is not the same as a standalone WAF.** The sibling Concept `firewall-types` has a `WAF` Row covering the general WAF category. The CDN-integrated WAF here is the same technology deployed as a managed reverse-proxy at the CDN edge, with rule packs maintained by the CDN provider (commonly aligned to the OWASP Top 10 [s4]). Distinct sources of risk: a self-managed WAF in front of an origin protects only that origin; a CDN-integrated WAF inspects traffic for every customer behind that edge.
- **DDoS scrubbing scope.** The CDN's distributed PoP footprint absorbs volumetric Layer 3/4 floods (UDP, TCP SYN) by spreading traffic across many edges [s2]. Layer 7 application-floods (HTTP request floods, slow-POST) are filtered with rate-limiting, behavioral heuristics, and challenge-response [s2]. CISA explicitly recommends always-on CDN posture rather than on-demand activation because reactive activation leaks origin during the window before failover [s2].
- **Origin protection is only as good as origin-IP secrecy.** If an attacker discovers the origin IP — via DNS history (passive enumeration of pre-CDN A records), email headers, certificate transparency logs naming the origin, or a misconfigured subdomain pointing direct-to-origin — the attacker can bypass the CDN entirely [s3]. CDN-IP allowlists at the origin firewall and origin-authentication tokens (mTLS, signed headers, shared secrets) close that bypass [s3].
- **TLS termination implications.** When the CDN terminates TLS at the edge, the CDN sees plaintext — this is what enables WAF inspection of HTTP payloads. The architecture trades end-to-end encryption for edge-layer visibility. Most production deployments re-encrypt edge → origin (sometimes called "full" or "strict" TLS) so plaintext exists only inside CDN PoPs, but the CDN provider remains in the trust boundary regardless. A CDN compromise or insider threat at the CDN provider has plaintext access during termination.
- **Certificate management at scale.** TLS termination at the edge means the CDN holds (or proxies) the customer's certificate. Major CDNs offer managed certificates (auto-issued, auto-renewed) and customer-uploaded certificates; certificate revocation across thousands of edge nodes is a CDN-operated concern, not the customer's.
- **Federal guidance positions CDN as primary DDoS mitigation.** CISA's Capacity Enhancement Guide on DDoS recommends federal civilian agencies use CDNs for high-value internet-facing assets and notes CDN mitigations "provide the highest degree of protections" compared to non-CDN approaches [s2]. This is the closest thing to a NIST/CISA endorsement of CDN-as-security-infrastructure on the exam.
- **CDN as single point of failure.** Azure's CDN best-practice document calls out resilience: "The CDN is a potential single point of failure for an application" [s1]. A CDN outage takes the protected site offline even if the origin is healthy — an availability tradeoff the security architecture has to acknowledge.
- **Out of scope for this Concept:** specific CDN providers and their feature differentials, bot-management products as a separate category, edge compute / serverless functions at the edge, multi-CDN architectures, image and video optimization, CDN log-export and SIEM integration, GDPR/data-residency implications of edge caching, signed-URL and tokenized-content access control.

### Tricky distractors

- **CDN vs WAF.** A CDN can include a WAF, but they are distinct capabilities. A WAF is the rule-engine that inspects HTTP payloads; a CDN is the distributed proxy network. Many CDNs ship with an integrated WAF, but you can deploy a WAF without a CDN (in front of a single origin) and you can deploy a CDN without a WAF (just caching). Exam confusion: "the CDN blocked the SQL injection" — strictly, the CDN's *integrated WAF* blocked it.
- **Edge caching vs origin protection.** Both reduce origin load, but they are different controls. Edge caching reduces *legitimate* request volume reaching the origin by serving hits from PoPs. Origin protection blocks *direct-to-origin* requests at the origin firewall, regardless of whether the CDN had cached anything. Edge caching alone does not stop an attacker who has discovered the origin IP — they simply bypass the CDN.
- **TLS termination at the edge ≠ end-to-end encryption.** A common misconception is "the CDN uses HTTPS, so my traffic is end-to-end encrypted." The CDN decrypts at the edge to inspect the payload. End-to-end encryption from client to origin is incompatible with WAF inspection at the CDN — you choose one or the other. Most deployments accept edge inspection as the cost of CDN security features.
- **DDoS scrubbing scope is layered.** CDN DDoS scrubbing is excellent at volumetric L3/L4 floods (the CDN's bandwidth dwarfs the origin's) and good at L7 application-floods (rate limits, behavioral analysis). It is *not* a generic stateful firewall and does not replace network-layer ACLs at the origin or upstream BGP-level mitigations like RTBH or Flowspec [s2]. A sophisticated low-and-slow attack or a protocol-specific exploit may pass through.
- **Origin IP leaks defeat the whole stack.** If the origin IP is discoverable, every CDN-edge defense (WAF, DDoS scrubbing, TLS-edge inspection) can be bypassed by sending traffic directly to the origin's public IP. This is the failure mode that makes origin protection (the one origin-side function in the table) load-bearing for everything else.

### Values without a direct public citation

| Cell | Value | Why unsourced |
|---|---|---|
| Edge caching × OSI layer | `Application` | Caching operates on application-layer objects (HTTP responses); not assigned an OSI layer in [s1]. |
| Integrated WAF × OSI layer | `Application` | WAFs operate at L7 by definition; consistent with the WAF row in `firewall-types`. |
| Origin protection × OSI layer | `Network` | IP allowlists are L3 ACLs. Origin authentication (mTLS, tokens) operates higher in the stack — the cell reflects the dominant L3 mechanism. |
| TLS termination × OSI layer | `Session` | Conventional CISSP placement of TLS at the Session layer. Engineering literature places TLS between L4 and L7. |
| Edge caching × key limitation | `Cacheable content only` | Paraphrase of [s1]; dynamic and per-user content cannot be cached without explicit cache-key engineering. |
| Origin protection × typical implementation | `Allowlist of CDN IP ranges`, `Origin authentication tokens` | [s3] enumerates these techniques in vendor-neutral form; no single primary publication consolidates them. |
| TLS termination × key limitation | `Plaintext visible at edge` | Architectural fact — the CDN sees plaintext during termination by definition. Not a quote from a primary source. |
| All `enforcement point` cells | `Edge` / `Origin` | Categorical labels reflecting where each function executes; no public source enumerates them in this taxonomy. |

## Engine demo opportunities

- `Edge caching | threat addressed → ?` → `Origin overload`
- `Integrated WAF | threat addressed → ?` → `OWASP Top 10`
- `DDoS scrubbing | threat addressed → ?` → `Volumetric flood`, `Application-layer flood` (multi-Fact cell)
- `TLS termination | threat addressed → ?` → `Eavesdropping`, `Tampering` (multi-Fact cell)
- `? | enforcement point → Edge` → `Edge caching`, `Integrated WAF`, `DDoS scrubbing`, `TLS termination` — shared-Value select-all
- `? | enforcement point → Origin` → `Origin protection` — sole-Row select
- `? | OSI layer → Application` → `Edge caching`, `Integrated WAF`, `DDoS scrubbing` — shared-Value across single-Fact and multi-Fact cells
- `Origin protection | typical implementation → ?` → `Allowlist of CDN IP ranges`, `Origin authentication tokens` (multi-Fact cell)
- `? | key limitation → Tuning per application` → `Integrated WAF`
- `? | key limitation → Origin IP must stay hidden` → `DDoS scrubbing`
- `? | key limitation → DNS history can leak origin IP` → `Origin protection`
- Composite swap: `DDoS scrubbing` Row with `enforcement point` swapped to `Origin` — tests the edge-vs-origin distinction directly (the most common architectural confusion)
- Composite swap: `Edge caching` Row with `threat addressed` swapped to `OWASP Top 10` — tests the caching-vs-WAF role confusion

## Sources

- `[s1]`: Microsoft Learn, Azure Architecture Center, "CDN guidance" — CDN deployment, caching, security, and resilience considerations (updated 2025-06-13, retrieved 2026-04-26, https://learn.microsoft.com/en-us/azure/architecture/best-practices/cdn)
- `[s2]`: CISA / FBI / MS-ISAC, "Understanding and Responding to Distributed Denial-Of-Service Attacks" (joint guidance, updated March 2024) and CISA "Capacity Enhancement Guide: Additional DDoS Guidance for Federal Agencies" — CDN as primary DDoS mitigation, always-on posture, volumetric vs application-layer scrubbing scope (retrieved 2026-04-26, https://www.cisa.gov/news-events/alerts/2024/03/21/cisa-fbi-and-ms-isac-release-update-joint-guidance-distributed-denial-service-techniques)
- `[s3]`: Fastly, "What is a CDN?" — vendor-neutral CDN security framing covering TLS/SSL at edge, origin protection via filtering, and WAF integration (retrieved 2026-04-26, https://www.fastly.com/learning/what-is-a-cdn)
- `[s4]`: OWASP Foundation, "Web Application Firewall" community page — WAF deployed as reverse proxy, rule sets targeting XSS, SQL injection, and other application-layer threats; ongoing tuning required (retrieved 2026-04-26, https://owasp.org/www-community/Web_Application_Firewall)
