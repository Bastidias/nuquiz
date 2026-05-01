# VLAN Segmentation

**Domain:** 4 — Communication and Network Security &nbsp;|&nbsp; **Pattern:** Dimensions &nbsp;|&nbsp; **Tags:** 4.1, 4.2
**Status:** draft (SME review pending)

The four VLAN concepts CISSP candidates are expected to discriminate. Standard VLAN provides Layer-2 broadcast-domain isolation; trunk vs access ports specify how a switch port handles VLAN tags; native VLAN is the untagged default on a trunk; private VLAN provides additional isolation *within* a VLAN. CISSP testing focuses on the security implications: VLAN hopping attacks (double tagging, switch spoofing), the trunk-port misconfiguration risk, and the isolation guarantee VLANs provide vs do not provide.

| Concept | how it works | typical use | security consideration |
|---|---|---|---|
| Access port | Carries traffic for one VLAN<br>Untags on egress<br>Tags on ingress per port assignment | Connecting end hosts to a single VLAN | Compromise limited to the assigned VLAN |
| Trunk port | Carries traffic for multiple VLANs with 802.1Q tags [s1] | Connecting switches to switches<br>Connecting routers to switches | Misconfigured trunk grants access to all carried VLANs |
| Native VLAN | Untagged default VLAN on a trunk [s1] | Backward compatibility with untagged frames | Attacker can inject untagged frames that ride the native VLAN |
| Private VLAN | Sub-VLANs that isolate hosts from each other within the parent VLAN [s2] | Hotel networks<br>Multi-tenant DMZ<br>Service provider edge | Hosts in same parent VLAN cannot communicate without going through promiscuous port |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. **No parentheticals in cells.**
- **VLAN expansion.** `VLAN` = Virtual Local Area Network. `802.1Q` is the IEEE standard for VLAN tagging that adds a 4-byte tag to the Ethernet frame including a 12-bit VLAN ID (4094 usable VLANs).
- **Access vs trunk port.** An *access* port is configured for a single VLAN — frames arrive untagged from the host, the switch adds the VLAN tag internally, and untags on egress to the host. A *trunk* port carries multiple VLANs simultaneously, each tagged with its 802.1Q VLAN ID. End hosts connect to access ports; switches and routers connect to other switches via trunk ports.
- **Native VLAN — the security gotcha.** On a trunk, one VLAN can be designated the *native* VLAN — frames in that VLAN are sent *untagged* across the trunk. Original purpose: backward compatibility with hub-era equipment that didn't understand 802.1Q tags. Modern best practice: change the native VLAN from the default (VLAN 1) to an unused VLAN, or disable native-VLAN behavior entirely, to prevent VLAN hopping.
- **VLAN hopping attacks.** Two main techniques:
  - **Double tagging:** Attacker on a non-native VLAN crafts a frame with two 802.1Q tags. The first switch strips the outer tag (matching its native VLAN); the second switch sees the inner tag and forwards into the target VLAN. Mitigation: don't use VLAN 1 as native; set native VLAN to an unused isolated VLAN.
  - **Switch spoofing:** Attacker negotiates trunk mode with the switch via DTP (Dynamic Trunking Protocol), then has access to all VLANs on the trunk. Mitigation: disable DTP, manually configure switch-to-switch links as trunks and host-facing ports as access.
- **Private VLAN structure.** Defined in RFC 5517. A *primary* VLAN contains *secondary* VLANs of three types: *isolated* (cannot talk to other isolated ports), *community* (can talk to ports in the same community), and *promiscuous* (can talk to all ports in the parent). Used in hotel guest networks (each room isolated from others but all reaching internet via promiscuous gateway), DMZs (each server isolated from others), service-provider edge.
- **VLANs are not a firewall.** Like NAT, VLANs are a *segmentation* mechanism, not a security control. A misconfigured switch, a VLAN-hopping attack, or a connected router moving traffic between VLANs all defeat VLAN isolation. Use real firewalls or routed access lists between VLANs requiring genuine isolation.
- **Cross-Concept link.** Sibling Concepts: `network-attacks` covers VLAN hopping at attack-class level; `firewall-types` covers the L3 security boundary that VLANs alone don't provide; `nat-types` covers a parallel "is not a firewall" misconception.
- **Out of scope for this Concept:** specific switch CLI configuration, MVRP / GVRP / VTP propagation protocols, voice VLAN configuration, MAC-based VLAN assignment, VXLAN and overlay networks, micro-segmentation via SDN.

### Tricky distractors

- **Native VLAN default.** Default native VLAN on Cisco is VLAN 1. Many "best practice" tests expect the answer to be "change the native VLAN from VLAN 1." Wrong-answer pattern: "leave native VLAN at default."
- **VLAN provides "complete isolation."** False — VLANs provide L2 isolation but routed traffic between VLANs at L3 is unrestricted unless an ACL or firewall blocks it. The exam may ask whether VLANs alone provide isolation; the correct answer is "L2 isolation only."
- **Trunk port vs access port assignment.** Common confusion. Hosts go on access ports, not trunks. A trunk-configured port to a host is a security risk — the host could see all VLANs.
- **Private VLAN vs separate VLAN.** Private VLANs achieve isolation within *one* parent VLAN. Separate VLANs require separate IP subnets and inter-VLAN routing. The use cases differ — private VLAN suits "many isolated hosts on the same subnet" (hotel rooms); separate VLANs suit "many hosts in distinct admin domains."

### Values without a direct public citation

| Cell | Value | Why unsourced |
|---|---|---|
| All rows × typical use | Use-case examples | IEEE 802.1Q [s1] specifies trunk/access mechanics; specific use-case examples reflect industry practice. |

## Engine demo opportunities

- `Access port | how it works → ?` → `Carries traffic for one VLAN`, `Untags on egress`, `Tags on ingress per port assignment`
- `Trunk port | how it works → ?` → `Carries traffic for multiple VLANs with 802.1Q tags`
- `? | how it works → Untagged default VLAN on a trunk` → `Native VLAN`
- `? | typical use → Hotel networks` → `Private VLAN` (sub-Fact in multi-Fact cell)
- `? | security consideration → Compromise limited to the assigned VLAN` → `Access port`
- `? | security consideration → Misconfigured trunk grants access to all carried VLANs` → `Trunk port`
- Composite Access port Row with `how it works` swapped to `Carries traffic for multiple VLANs with 802.1Q tags` — directly tests access-vs-trunk distinction (access is single-VLAN; trunk is multi-VLAN)
- Composite Trunk port Row with `typical use` swapped to `Connecting end hosts to a single VLAN` — tests that hosts go on access ports, not trunks
- Composite Native VLAN Row with `security consideration` swapped to `Compromise limited to the assigned VLAN` — tests the native-VLAN attack surface (it's the *vector* for VLAN hopping, not a containment)

## Sources

- `[s1]`: IEEE 802.1Q-2022, "IEEE Standard for Local and Metropolitan Area Networks — Bridges and Bridged Networks" — VLAN tagging and trunking specification (paywalled; cited as authoritative reference, retrieved 2026-04-26, https://standards.ieee.org/ieee/802.1Q/10323/)
- `[s2]`: RFC 5517, "Cisco Systems' Private VLANs: Scalable Security in a Multi-Client Environment" (February 2010, retrieved 2026-04-26, https://datatracker.ietf.org/doc/html/rfc5517)
- `[s3]`: NIST SP 800-41 Rev 1, "Guidelines on Firewalls and Firewall Policy" — addresses VLAN segmentation as a perimeter design choice (September 2009, retrieved 2026-04-26, https://csrc.nist.gov/publications/detail/sp/800-41/rev-1/final)
