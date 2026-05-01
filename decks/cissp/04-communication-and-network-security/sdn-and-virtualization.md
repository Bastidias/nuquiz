# SDN and Network Virtualization

**Domain:** 4 — Communication and Network Security &nbsp;|&nbsp; **Pattern:** Dimensions &nbsp;|&nbsp; **Tags:** 4.1
**Status:** draft (SME review pending)

The CISSP exam now tests modern network abstraction concepts beyond classical L2/L3 segmentation. The four Rows are the canonical examples: Software-Defined Networking (SDN) decouples the control plane from the data plane [s1]; Network Functions Virtualization (NFV) virtualizes network functions onto commodity compute [s2]; VXLAN provides a Layer-2-over-Layer-3 overlay encapsulation [s3]; and 5G Network Slicing partitions a shared physical network into logically isolated end-to-end slices [s4]. Service Mesh is included as a fifth Row because CISSP candidates increasingly see microservice-era east-west traffic control alongside SDN [s5]. Columns compare what each technology does, where the control vs data plane sits, the dominant security concern, typical deployment, and the canonical standard or tooling.

| Technology | function | control vs data plane | security implication | typical use | key standard or tooling |
|---|---|---|---|---|---|
| SDN | Decouples control plane from data plane [s1]<br>Centralizes forwarding decisions in a controller [s1] | Control plane in centralized controller [s1]<br>Data plane in OpenFlow switches [s1] | Controller compromise yields network-wide control [s6]<br>Southbound channel man-in-the-middle if TLS not enforced [s6] | Data center fabrics<br>Campus networks<br>Carrier transport | OpenFlow [s1] |
| NFV | Virtualizes network functions onto commodity compute [s2]<br>Decouples network function from proprietary hardware [s2] | Per-VNF control plane<br>Per-VNF data plane | Hypervisor compromise affects all hosted VNFs [s7]<br>VNF-to-VNF lateral movement on shared infrastructure [s7] | Telecom core<br>Virtual firewalls<br>Virtual load balancers | ETSI GS NFV 002 [s2] |
| VXLAN | Encapsulates Layer-2 frames in UDP for Layer-3 transport [s3]<br>Extends Layer-2 segments across routed networks [s3] | Data plane only | No native authentication of encapsulated frames [s3]<br>Tenant separation depends on VNI integrity [s3] | Multi-tenant data centers<br>Cloud overlay networks<br>Stretched Layer-2 across pods | RFC 7348 [s3] |
| 5G Network Slicing | Partitions one physical network into multiple logical end-to-end networks [s4] | Per-slice control plane functions [s4]<br>Shared or dedicated user plane per slice [s4] | Slice isolation depends on configuration [s4]<br>S-NSSAI transmitted only after NAS security established [s4] | Mobile carrier multi-tenancy<br>Industrial IoT<br>Automotive V2X | 3GPP TS 23.501 [s4] |
| Service Mesh | Manages east-west traffic between microservices [s5]<br>Adds sidecar proxy to each workload [s5] | Control plane in mesh controller [s5]<br>Data plane in sidecar proxies [s5] | mTLS terminates inside sidecar<br>Sidecar compromise exposes workload identity [s5] | Kubernetes microservices<br>Zero-trust workload identity<br>East-west observability | Istio with Envoy [s5] |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. **No parentheticals in cells.** Any context stripped from cells lives below.
- **Acronym expansions.** SDN = Software-Defined Networking. NFV = Network Functions Virtualization. VXLAN = Virtual eXtensible Local Area Network. VNI = VXLAN Network Identifier (24-bit, ~16M segments). VNF = Virtualized Network Function. NFVI = NFV Infrastructure. MANO = Management and Orchestration. NSSAI = Network Slice Selection Assistance Information. S-NSSAI = Single-NSSAI. NAS = Non-Access Stratum (3GPP signaling). mTLS = mutual TLS.
- **SDN architecture layering.** ONF defines three layers — application, control, infrastructure — connected by northbound (controller-to-application) and southbound (controller-to-switch) interfaces [s1]. OpenFlow is the canonical southbound protocol [s1]. The architecture's defining property is that forwarding state is computed centrally and pushed to dumb forwarders, instead of each switch running its own routing/spanning-tree logic.
- **NFV vs SDN — frequently conflated.** They are orthogonal concepts that often deploy together. SDN abstracts the control plane of network forwarding; NFV virtualizes network *functions* (firewalls, routers, load balancers) onto commodity x86 hardware [s2]. You can have SDN without NFV (an OpenFlow fabric of physical switches) and NFV without SDN (a virtual firewall VM running with traditional networking).
- **ETSI NFV functional blocks.** VNF (the virtualized function), NFVI (compute/storage/network substrate), and MANO with three sub-blocks: NFVO (orchestrator), VNFM (VNF manager), VIM (virtualized infrastructure manager) [s2].
- **VXLAN frame format.** Outer Ethernet + outer IP + outer UDP (default port 4789) + 8-byte VXLAN header containing the 24-bit VNI + inner Ethernet frame [s3]. Compared to 802.1Q's 12-bit VLAN ID (~4094 segments), VXLAN's 24-bit VNI yields ~16M segments — addresses the multi-tenant data center scaling problem.
- **VXLAN security gap.** RFC 7348 has no built-in confidentiality, integrity, or authentication. A spoofed VXLAN packet with a forged VNI can land in another tenant's overlay. Operators rely on the underlay being trusted, on IPsec or MACsec, or on newer overlays (Geneve with extensions) for cryptographic protection.
- **Network slice identifiers.** A 5G slice is identified by an S-NSSAI = SST (Slice/Service Type) + optional SD (Slice Differentiator) [s4]. The set of S-NSSAIs allowed for a UE is the NSSAI. SST values are standardized for common use cases (eMBB, URLLC, MIoT, V2X). 3GPP requires the S-NSSAI to be transmitted only after NAS security is established to avoid leaking which slice (and thus which use case / tenant) a UE is using [s4].
- **Service mesh — why it sits adjacent to SDN here.** Both separate a control plane from a data plane: SDN moves forwarding decisions out of switches; a service mesh moves L7 policy out of application code into sidecar proxies [s5]. Both face the same control-plane-as-target risk. Difference: SDN operates at L2/L3 across a network fabric; a service mesh operates at L7 between containers within a cluster. The exam may probe whether candidates recognize them as different layers solving analogous decoupling problems.
- **NIST SP 800-125B context.** The publication addresses *secure virtual network configuration* for hosting VMs — virtual switches, isolated management networks, traffic monitoring [s7]. It is the most-cited NIST source for the hypervisor/VNF security implications in the table, but it predates much of the modern NFV deployment pattern; the cell values are SME-validated extrapolations of its principles to the NFV context.
- **Cross-Concept link.** Sibling Concepts: `vlan-segmentation` covers traditional L2 segmentation that overlays such as VXLAN replaced at scale; `firewall-types` covers the L3/L7 controls that NFV most often virtualizes; future `cloud-network-models` could cover VPC/overlay specifics in AWS/Azure/GCP.
- **Out of scope for this Concept:** specific OpenFlow message types, OpenDaylight/ONOS controller internals, Geneve and NVGRE alternatives to VXLAN, full 3GPP 5G core architecture, ambient mesh vs sidecar mesh modes, eBPF-based meshes (Cilium), specific Kubernetes CNI plugins.

### Tricky distractors

- **SDN vs NFV.** The most-tested confusion. SDN = decouples *control plane from data plane* of forwarding. NFV = decouples *network function from proprietary hardware*. Wrong-answer pattern: "SDN virtualizes firewalls and load balancers" (that's NFV) or "NFV centralizes the control plane" (that's SDN). They are complementary, not synonyms.
- **VXLAN vs VLAN.** VLAN is 12-bit (4094 usable segments) at L2, defined in IEEE 802.1Q. VXLAN is 24-bit (~16M segments) and runs *over* L3 via UDP encapsulation [s3]. Wrong-answer pattern: "VXLAN is just a longer VLAN tag" — it is not; VXLAN is an overlay, VLAN is a frame tag. Wrong-answer pattern: "VXLAN provides cryptographic tenant isolation" — RFC 7348 provides none; isolation depends on the underlay or external IPsec.
- **SDN control-plane attacks.** The defining SDN security risk is the centralized controller [s6]. Wrong-answer patterns: "SDN is more secure because the data plane is isolated" (the data plane is only as trusted as the controller telling it what to do); "OpenFlow is encrypted by default" (TLS is optional in OpenFlow up to 1.3.0 [s6], so southbound MITM is a real risk). Distinct from classical network attacks: a single controller compromise replaces hundreds of individual device compromises.
- **Service mesh vs SDN.** Both have a control plane and data plane, but they operate at different layers and on different traffic. SDN = L2/L3 across the network fabric, between hosts. Service mesh = L7 inside the cluster, between application services [s5]. Wrong-answer pattern: "Service mesh is SDN for microservices" — superficially evocative, technically wrong; the protocols, policies, and threat models differ.
- **Network slicing as "VLANs for 5G."** False. Slices are full end-to-end logical networks including dedicated control-plane network functions, not just frame tags. Wrong-answer pattern: "Network slicing separates traffic with VLAN tags." Slicing isolation is enforced at the 5G core (per-slice AMF/SMF/UPF selection) and identified by S-NSSAI [s4].

### Values without a direct public citation

| Cell | Value | Why unsourced |
|---|---|---|
| NFV × control vs data plane | `Per-VNF control plane`, `Per-VNF data plane` | ETSI [s2] defines VNFs as virtualized functions but does not assign per-VNF planes in those words; the cell reflects standard CISSP teaching that each VNF carries its own planes inside the VM. |
| Service Mesh × security implication | `mTLS terminates inside sidecar` | Istio docs describe mTLS via sidecar [s5]; the security-implication framing is industry consensus, not a single primary citation. |
| All Rows × typical use | Use-case examples | Use-case lists reflect industry practice rather than a single authoritative public source. |
| SDN × typical use | `Data center fabrics`, `Campus networks`, `Carrier transport` | ONF [s1] does not enumerate a canonical deployment list; values reflect CISSP teaching. |
| NFV × typical use | `Telecom core`, `Virtual firewalls`, `Virtual load balancers` | ETSI [s2] focuses on architecture; specific functions reflect industry deployment patterns. |
| 5G Network Slicing × typical use | `Industrial IoT`, `Automotive V2X` | 3GPP defines SST values for these use classes [s4]; concrete use-case names are paraphrased. |

## Engine demo opportunities

- `SDN | function → ?` → `Decouples control plane from data plane`, `Centralizes forwarding decisions in a controller` (multi-Fact cell)
- `? | function → Decouples control plane from data plane` → `SDN`
- `NFV | function → ?` → `Virtualizes network functions onto commodity compute`, `Decouples network function from proprietary hardware`
- `VXLAN | key standard or tooling → ?` → `RFC 7348`
- `? | key standard or tooling → OpenFlow` → `SDN`
- `? | key standard or tooling → 3GPP TS 23.501` → `5G Network Slicing`
- `? | control vs data plane → Data plane only` → `VXLAN` (sole-Row distinguishing answer — VXLAN is an encapsulation, not a control architecture)
- `Service Mesh | function → ?` → `Manages east-west traffic between microservices`, `Adds sidecar proxy to each workload`
- Composite SDN Row with `function` swapped to `Encapsulates Layer-2 frames in UDP for Layer-3 transport` — directly tests SDN-vs-VXLAN distinction (SDN is a control-plane abstraction; VXLAN is an encapsulation format)
- Composite NFV Row with `function` swapped to `Decouples control plane from data plane` — directly tests the SDN-vs-NFV confusion
- `? | security implication → Controller compromise yields network-wide control` → `SDN` — exam-fit centralized-controller risk
- `? | security implication → No native authentication of encapsulated frames` → `VXLAN` — exam-fit overlay security gap

## Sources

- `[s1]`: Open Networking Foundation, "SDN Architecture" TR-502 v1.0 — defines control/data plane separation, controller, northbound/southbound interfaces, OpenFlow as southbound protocol (June 2014, retrieved 2026-04-26, https://opennetworking.org/wp-content/uploads/2013/02/TR_SDN_ARCH_1.0_06062014.pdf)
- `[s2]`: ETSI GS NFV 002 V1.2.1, "Network Functions Virtualisation (NFV); Architectural Framework" — defines VNF, NFVI, MANO and reference points (December 2014, retrieved 2026-04-26, https://www.etsi.org/deliver/etsi_gs/NFV/001_099/002/01.02.01_60/gs_NFV002v010201p.pdf)
- `[s3]`: RFC 7348, "Virtual eXtensible Local Area Network (VXLAN): A Framework for Overlaying Virtualized Layer 2 Networks over Layer 3 Networks" — 24-bit VNI, UDP port 4789, encapsulation format (August 2014, retrieved 2026-04-26, https://datatracker.ietf.org/doc/html/rfc7348)
- `[s4]`: 3GPP TS 23.501, "System architecture for the 5G System (5GS)" §5.15 Network Slicing — S-NSSAI, SST/SD, slice security and NAS-protected transmission (retrieved 2026-04-26, https://www.3gpp.org/technologies/slicing-security)
- `[s5]`: Istio Project / CNCF, "The Istio service mesh" architecture documentation — Envoy sidecar data plane, Istiod control plane, mTLS issuance (retrieved 2026-04-26, https://istio.io/latest/docs/ops/deployment/architecture/)
- `[s6]`: MDPI Electronics, "An Overview of SDN Issues — A Case Study and Performance Evaluation of a Secure OpenFlow Protocol Implementation" — southbound MITM risk, optional TLS in OpenFlow up to 1.3.0, controller hijack threat model (retrieved 2026-04-26, https://www.mdpi.com/2079-9292/14/16/3244)
- `[s7]`: NIST SP 800-125B, "Secure Virtual Network Configuration for Virtual Machine (VM) Protection" — virtual network segmentation, traffic control, hypervisor configuration recommendations underpinning NFV security implications (March 2016, retrieved 2026-04-26, https://csrc.nist.gov/pubs/sp/800/125/b/final)
