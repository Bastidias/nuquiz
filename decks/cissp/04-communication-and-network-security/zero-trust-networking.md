# Zero Trust Networking

**Domain:** 4 — Communication and Network Security &nbsp;|&nbsp; **Pattern:** Dimensions &nbsp;|&nbsp; **Tags:** 4.1
**Status:** draft (SME review pending)

The seven tenets of Zero Trust Architecture as enumerated in NIST SP 800-207 §2.1 [s1]. Zero Trust shifts security from a network-location trust model to a per-request, identity-and-context-driven authorization model. CISSP testing focuses on naming the tenets, distinguishing them from the legacy perimeter model, and recognizing their typical implementation surfaces.

| Tenet | tenet number | what it requires | traditional perimeter contrast | typical implementation surface |
|---|---|---|---|---|
| All data sources and computing services are considered resources | 1 [s1] | Treat every asset as a protected resource [s1] | Trusted internal LAN versus untrusted external network | Resource inventory<br>Asset registry |
| All communication is secured regardless of network location | 2 [s1] | Encrypt and authenticate every session [s1] | Cleartext on internal network | Mutual TLS<br>End-to-end encryption |
| Access to individual enterprise resources is granted on a per-session basis | 3 [s1] | Authorize each session independently [s1] | Persistent VPN tunnel grants broad access | Per-session token<br>Short-lived credential |
| Access to resources is determined by dynamic policy | 4 [s1] | Evaluate identity, device posture, and behavioral attributes per request [s1] | Static ACL keyed to source IP | Policy Engine<br>Attribute-based access control |
| The enterprise monitors and measures the integrity and security posture of all owned and associated assets | 5 [s1] | Continuously assess device and asset state [s1] | One-time admission check at network join | Continuous Diagnostics and Mitigation system<br>Endpoint posture telemetry |
| All resource authentication and authorization are dynamic and strictly enforced before access is allowed | 6 [s1] | Re-authenticate and re-authorize on a continuous cycle [s1] | Single sign-on grants long-lived session | Continuous authentication<br>Step-up authentication |
| The enterprise collects as much information as possible about the current state of assets, network infrastructure and communications | 7 [s1] | Aggregate telemetry to refine policy over time [s1] | Limited logging at the perimeter | SIEM<br>Network and system activity logs |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. **No parentheticals in cells.** Any context stripped from cells lives below.
- **Tenets are exam-priority.** CISSP items often supply a tenet number and ask for the tenet text, or supply tenet text and ask for the implementing technology. The Row labels are the verbatim tenets from NIST SP 800-207 §2.1 [s1] — do not paraphrase them in question generation.
- **Per-session versus per-request.** Tenet 3 [s1] says "per-session." Some CISSP material (and CISA's Maturity Model [s2]) uses "per-request" or "least-privilege per-request" language. They describe the same behavior at different granularities; NIST SP 800-207's wording is the authoritative one for this Concept.
- **Dynamic policy inputs.** Tenet 4 [s1] is implemented by the Policy Engine, which evaluates a "trust algorithm" over identity, device posture, location, time, and behavioral signals. This is the locus where ABAC and risk-based authentication live in a ZTA deployment.
- **CDM links Tenet 5 to Tenet 7.** The Continuous Diagnostics and Mitigation system feeds asset posture data (Tenet 5) into the broader telemetry pool the enterprise reasons over (Tenet 7). They are distinct tenets but share infrastructure.
- **ZTA logical components (out of scope for the Rows but exam-relevant).** NIST SP 800-207 §3.1 [s1] decomposes the Policy Decision Point into a Policy Engine (PE) that decides and a Policy Administrator (PA) that establishes or severs sessions; the Policy Enforcement Point (PEP) sits on the data path and enforces the PA's commands. Supporting components include the CDM system, industry compliance system, threat intelligence feeds, network and system activity logs, data access policies, enterprise PKI, ID management, and SIEM. A separate Concept covering these components could be authored as `zero-trust-components.md`.
- **Out of scope for this Concept:** ZTA deployment models (device-agent/gateway, enclave-gateway, resource portal, application sandboxing — NIST SP 800-207 §3.2), trust algorithm variants (criteria-based versus score-based — §3.3), threats to ZTA (§4 of [s1]), and CISA Zero Trust Maturity Model pillars [s2].

### Tricky distractors

- **Zero Trust does not mean "trust nothing ever."** It means "do not grant trust based on network location, and verify every access request." A frequent distractor frames Zero Trust as eliminating authentication credentials or refusing all access — wrong. Zero Trust *requires* strong authentication; it just refuses to grant trust based on being inside a network perimeter [s1].
- **Perimeter security versus ZTA.** Perimeter security assumes the inside is trusted and defends the boundary; ZTA assumes no implicit trust on either side and authorizes per-session [s1]. A distractor may describe ZTA as "an enhanced perimeter" or "a stronger firewall" — both are wrong; ZTA is a *replacement* model, not a hardening of the perimeter model.
- **ZTA versus SASE.** Secure Access Service Edge (SASE) is a Gartner-coined service-delivery architecture (2019) that *bundles* SD-WAN with security services including ZTNA, SWG, CASB, and FWaaS [s3]. SASE is a delivery model that uses Zero Trust principles for its access component; ZTA is the access-control philosophy itself. SASE without ZTNA is not Zero Trust; ZTA without SASE is fine.
- **BeyondCorp is not the framework.** BeyondCorp is Google's *specific implementation* of zero-trust principles, predating NIST SP 800-207 [s4]. CISSP candidates who learned ZTA from BeyondCorp papers may answer with BeyondCorp-specific components (e.g., Access Proxy, Trust Inferer) when asked about NIST SP 800-207 components — wrong. The framework asked about is NIST's; BeyondCorp is one realization.
- **CISA Maturity Model pillars are not the seven tenets.** CISA Zero Trust Maturity Model 2.0 [s2] organizes ZTA into five pillars (Identity, Devices, Networks, Applications and Workloads, Data) plus three cross-cutting capabilities. A distractor may list the five pillars and label them "the seven tenets" — wrong; the tenets and pillars are different decompositions.

### Values without a direct public citation

The following cell values are inferred from CISSP study material and vendor documentation rather than a traced public source. They reflect widely-accepted mappings but should be validated by an SME.

| Cell | Value | Why unsourced |
|---|---|---|
| All seven rows × traditional perimeter contrast | varies | NIST SP 800-207 [s1] motivates Zero Trust by contrasting with perimeter security generally but does not pair each tenet with a specific perimeter-model counterpart. Pairings reflect CISSP teaching. |
| All seven rows × typical implementation surface | varies | NIST SP 800-207 [s1] §3.1 lists logical components but does not map each tenet to a specific product category. Pairings reflect vendor and CISSP literature. |
| Tenet 3 × `Per-session token`, `Short-lived credential` | both | Implementation examples; NIST does not prescribe a token mechanism for tenet 3. |
| Tenet 6 × `Continuous authentication`, `Step-up authentication` | both | NIST [s1] requires dynamic enforcement but does not name continuous-auth or step-up-auth as the canonical mechanisms. |

## Engine demo opportunities

- `Tenet 1 | what it requires → ?` → `Treat every asset as a protected resource`
- `? | tenet number → 3` → `All data sources and computing services are considered resources` is wrong; correct row is `Access to individual enterprise resources is granted on a per-session basis`
- `? | typical implementation surface → SIEM` → `All the enterprise collects as much information as possible about the current state of assets, network infrastructure and communications` (Tenet 7)
- `? | typical implementation surface → Policy Engine` → Tenet 4 — directly tests the dynamic-policy / Policy-Engine pairing
- `Tenet 5 | typical implementation surface → ?` → `Continuous Diagnostics and Mitigation system`, `Endpoint posture telemetry` — multi-Fact cell
- Composite Tenet 2 Row with `what it requires` swapped to `Authorize each session independently` — directly tests Tenet 2 versus Tenet 3 (encryption-everywhere vs per-session-authorization)
- Composite Tenet 6 Row with `typical implementation surface` swapped to `SIEM`, `Network and system activity logs` — tests Tenet 6 (continuous authentication) versus Tenet 7 (telemetry collection)
- `? | tenet number → ?` ordering puzzle: shuffle the seven Rows and prompt the student to restore tenet-number order — exercises the Concept's natural sequence even though Pattern is Dimensions

## Sources

- `[s1]`: NIST SP 800-207, "Zero Trust Architecture" §2.1 Tenets of Zero Trust and §3.1 Logical Components of ZTA (August 2020, retrieved 2026-04-26, https://csrc.nist.gov/pubs/sp/800/207/final)
- `[s2]`: CISA, "Zero Trust Maturity Model Version 2.0" (April 2023, retrieved 2026-04-26, https://www.cisa.gov/sites/default/files/2023-04/zero_trust_maturity_model_v2_508.pdf)
- `[s3]`: Gartner, SASE definition (2019) — referenced via Zscaler, "SASE vs. Zero Trust: What's the Difference?" (retrieved 2026-04-26, https://www.zscaler.com/blogs/product-insights/sase-vs-zero-trust-what-s-difference)
- `[s4]`: Google Cloud, "BeyondCorp: A New Approach to Enterprise Security" (retrieved 2026-04-26, https://cloud.google.com/beyondcorp)
