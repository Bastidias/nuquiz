# Test-Bank Parity Plan

Working plan to close the gap between the current 186-Concept set (~60–70% test-bank breadth) and commercial CISSP test-bank coverage. Status: planning — to be executed in passes per domain.

---

## Phase A — Methodology (one-time setup)

- **A1. Tricky-distractor template.** Add a `## Tricky distractors` subsection to the Concept file format, listing 3–5 commonly-confused exam pairings per Concept (e.g., for BLP: "no-write-down vs Biba's no-write-up — same shape, opposite meaning").
- **A2. Specific values pass.** Where the current cell value is a categorical bin (`Low / Medium / High`), audit whether the exam tests specifics. If yes, replace with the concrete value (e.g., "PCI DSS quarterly vulnerability scan", "CVSS 7.0–8.9 = High", "RIP max hop = 15").
- **A3. Scenario walk Aspects template.** Define a structure for multi-Concept scenario walks: 5–7 Step rows across the same Aspects table, each Step naming the Concept it draws from.

## Phase B — New Concepts per Domain (gap fill)

Each domain audited against the 2024 (ISC)² outline at the sub-sub-objective level. Estimate **5–15 new Concepts per domain**.

### D1 — Security & Risk Management (proposed additions)
1. **Computer crime laws** — CFAA, ECPA, CCPA criminal provisions, COPPA, FERPA, GLBA Safeguards Rule, EU Cybercrime Directive. (Distinct from `computer-crime-categories` which is attacker-motivation taxonomy.)
2. **Import/export controls** — ITAR, EAR, Wassenaar Arrangement, BIS commerce controls. Heavily tested in legal sub-objective.
3. **Privacy-by-design principles** — Cavoukian's 7 foundational principles plus modern PETs.
4. **International privacy frameworks** — Council of Europe Convention 108, APEC Privacy Framework, OECD Privacy Guidelines, Safe Harbor / Privacy Shield / DPF history.
5. **NIST SP 800-61 IR phases** — formal IR framework as a D1-tagged Ordered Concept (cross-tag with D7).
6. **BIA process steps** — the *process* of conducting a BIA, separate from `bia-components` which lists the metrics.
7. **CSF functions** — NIST Cybersecurity Framework's Identify/Protect/Detect/Respond/Recover/Govern at the function level.

### D4 — Communication & Network Security (proposed additions)
1. **IPv4 vs IPv6** — address space, header format, NAT requirement, security features (IPsec mandatory in v6, deprecated header options).
2. **NAT types** — static, dynamic, PAT/NAPT, twice-NAT.
3. **VLAN segmentation** — 802.1Q tagging, native vs trunk, VLAN hopping attacks, private VLANs.
4. **NAC types** — pre-admission (802.1X) vs post-admission, agent-based vs agentless, MAC authentication bypass.
5. **VoIP security** — SIP, RTP, SRTP, ZRTP, common VoIP attacks (toll fraud, eavesdropping, SPIT).
6. **Cellular generations** — 3G/4G/5G security architectures, IMSI catchers, 5G enhancements.
7. **IoT protocols** — Zigbee, Z-Wave, BLE, LoRaWAN, MQTT — security model per protocol.
8. **SDN and network virtualization** — control-plane / data-plane split, OpenFlow, NFV, security implications.
9. **Well-known port reference** — top 30 well-known port numbers as a Dimensions Concept.
10. **CDN security** — edge caching, WAF, DDoS scrubbing, origin protection.
11. **Zero Trust networking** — Beyond Corp, ZTA principles, micro-segmentation.

## Phase C — Depth Pass on Existing Concepts

- **C1. Replace pedagogical bins with specifics** where exam tests specifics. Audit the "Values without a direct public citation" tables — convert as many `[needs source]`-equivalent cells as possible to traced values.
- **C2. Upgrade source provenance.** Replace WebSearch-summary citations with direct primary-source reads where the source is publicly available (NIST SP HTML pages, RFCs).
- **C3. Add `## Tricky distractors` per Concept.**

## Phase D — Scenario-Based Concepts

Add 10–20 multi-step scenario walks. Each composes 3–5 base Concepts. Examples:
- **Phishing-to-ransomware-to-recovery** — walks `password-attacks` → `mfa-methods` → `incident-response-phases` → `containment-strategies` → `backup-strategies` → `dr-test-types`.
- **Insider-threat exfiltration** — walks `personnel-controls` → `account-types` → `account-review-activities` → `siem-soar-xdr` → `evidence-handling-chain`.
- **Cloud breach with cross-border data** — walks `cloud-data-residency-models` → `data-sovereignty` → `incident-response-phases` → `privacy-laws` → `evidence-types`.

## Phase E — Cross-Reference Audit

- **E1. Spot-check against published commercial-bank tables of contents** (Sybex 10th ed, Wiley All-in-One, Boson ExSim). Identify systemic blind spots not captured by the (ISC)² outline alone.
- **E2. Iterate Phases B–D** as gaps emerge.

---

## Execution order (current pass)

Starting with **D1 and D4**:

1. D1: Author `computer-crime-laws.md` (Phase B1)
2. D4: Author `ipv4-vs-ipv6.md` (Phase B1)
3. D1: Author `import-export-controls.md`
4. D4: Author `nat-types.md`
5. D4: Author `vlan-segmentation.md`
6. D1: Author `privacy-by-design.md`
7. D4: Author `well-known-ports.md`
8. ... (continue per priority)

Tricky-distractor pass (Phase A1 + C3) and scenario walks (Phase D) deferred until per-domain new-Concept set is complete.
