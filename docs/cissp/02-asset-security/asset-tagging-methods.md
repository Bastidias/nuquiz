# Asset Tagging Methods

**Domain:** 2 — Asset Security &nbsp;|&nbsp; **Pattern:** Dimensions &nbsp;|&nbsp; **Tags:** 2.3
**Status:** draft (SME review pending)

The four mechanisms used to associate identity metadata with physical or logical assets so that an inventory can be maintained accurately. Each pairs a *mechanism* with *accuracy*, *cost*, and a *typical use* fit. The CISSP exam tests both the matchup between mechanism and use case (e.g., physical tags for asset-tracking audits vs. network discovery for IT-managed devices) and the accuracy/cost trade-offs.

| method | mechanism | accuracy | cost | typical use |
|---|---|---|---|---|
| Physical tag | Adhesive label with asset ID [s1] | High when scanned [s1] | Low per tag [s1] | Manual inventory and capital tracking [s1] |
| RFID | Radio-frequency identifier embedded in tag [s1] | High in bulk scans [s1] | Medium [s1] | Warehouse and high-volume asset tracking [s1] |
| Software agent | Endpoint software reports asset metadata [s2] | High on managed endpoints [s2] | Medium per endpoint [s2] | IT-managed device inventory [s2] |
| Network discovery | Active or passive network probing [s2] | Medium and depends on network coverage [s2] | Low after initial deployment [s2] | Initial asset discovery and unmanaged-device detection [s2] |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. No parentheticals in cells.
- **Tag 2.3 retained from stub.** Maps to (ISC)² 2024 outline §2.3 *Provision information and assets securely*.
- **Why four methods rather than one canonical answer.** No single method covers every asset class. Physical tags handle non-networked assets (furniture, hardware in storage). RFID handles bulk movement (data-center inventory). Software agents handle running endpoints (laptops, servers). Network discovery handles unmanaged or unknown devices. Mature programs use multiple methods to cover the asset population.
- **The unmanaged-device gap.** Software agents only see assets where the agent is installed; network discovery only sees assets that touch the network. The gap — assets that have neither — is where many breaches start. The CISSP exam tests the principle that asset coverage is a precondition for security; an unmanaged asset cannot be patched, monitored, or protected.
- **Active vs. passive network discovery.** Active discovery sends probes (ping sweeps, port scans, ARP scans) and is more thorough but generates noise and may trip IDS/IPS. Passive discovery watches existing traffic for signs of devices and is quieter but limited to assets that communicate. CIS Control 1 prescribes both.
- **Software agent accuracy depends on agent reach.** "High on managed endpoints" — high if the agent is installed; nothing if it is not. The dependency on management coverage is why software agents pair with network discovery: discovery finds the unmanaged devices, then management onboards them and the agent takes over.
- **RFID's practical scope.** RFID is most cost-effective at scale (thousands of assets moving through a small number of choke points). Data-center asset tracking, library books, retail inventory, supply-chain logistics. Low-volume or static-environment use cases get more value from physical tags or software agents.
- **What is intentionally not on this table.** Bluetooth/BLE beacons (an emerging method overlapping with RFID), API-based cloud-asset discovery (specific to cloud environments — could be its own row), and serial-number harvesting from purchase records (capital-asset trail). The four here cover the most-tested CISSP scope.
- **Gaps marked `[needs source]`:** none — all Facts trace to CIS Controls or asset-management framing.

## Engine demo opportunities

- `? | mechanism → Endpoint software reports asset metadata` → Software agent
- `RFID | typical use → ?` → `Warehouse and high-volume asset tracking`
- `? | accuracy → Medium and depends on network coverage` → Network discovery
- `Physical tag | cost → ?` → `Low per tag`
- `Network discovery | typical use → ?` with `Manual inventory and capital tracking` (Physical tag) and `IT-managed device inventory` (Software agent) as distractors
- Cross-Row shared-Value detection: `? | accuracy → High` → Physical tag, RFID, Software agent (cross-row select-all)
- Composite Row profile: Physical tag across all Columns with `cost` swapped to `Medium` (RFID's or Software agent's value)

## Sources

- `[s1]`: ISO/IEC 19762:2016 *Information technology — Automatic identification and data capture (AIDC) techniques — Harmonized vocabulary* — RFID and barcode tagging definitions (retrieved 2026-04-26, https://www.iso.org/standard/63231.html)
- `[s2]`: CIS Critical Security Controls v8.1, Control 1 *Inventory and Control of Enterprise Assets* — active/passive discovery and agent-based inventory (retrieved 2026-04-26, https://www.cisecurity.org/controls/inventory-and-control-of-enterprise-assets)
- `[s3]`: (ISC)² CISSP Certification Exam Outline, effective 2024-04-15, Domain 2 §2.3 (retrieved 2026-04-26, https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline)
