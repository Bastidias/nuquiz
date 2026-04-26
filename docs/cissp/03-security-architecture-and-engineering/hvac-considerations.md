# Data Center HVAC Considerations

**Domain:** 3 — Security Architecture and Engineering &nbsp;|&nbsp; **Pattern:** Aspects &nbsp;|&nbsp; **Tags:** 3.9
**Status:** draft (SME review pending)

The four HVAC design considerations for data centers, examined from multiple angles in an Aspects table. Temperature, humidity, positive pressure, and redundancy each contribute to availability and reliability of the protected equipment. The CISSP exam tests the matchup between consideration and rationale — particularly that humidity matters for both ESD risk (too low) and condensation risk (too high), and that positive pressure prevents contaminant ingress.

| aspect | content |
|---|---|
| temperature target | 18-27°C per ASHRAE TC 9.9 recommended envelope [s1] |
| humidity target | 40-60% relative humidity per ASHRAE recommendation [s1] |
| positive pressure rationale | Prevent contaminant ingress from surrounding spaces [s1] |
| redundancy | N+1 cooling capacity to tolerate single unit failure [s1] |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. No parentheticals in cells.
- **Tag 3.9 retained from stub.** Maps to (ISC)² 2024 outline §3.9 *Design site and facility security controls*. Sibling Concept: `site-selection.md`.
- **Source: ASHRAE TC 9.9.** Technical Committee 9.9 (Mission Critical Facilities, Data Centers, Technology Spaces) publishes the *Thermal Guidelines for Data Processing Environments* — the industry-standard reference for data-center environmental conditions. CISSP exam uses ASHRAE TC 9.9 ranges.
- **Temperature has shifted upward.** ASHRAE has progressively raised recommended temperature ranges as equipment manufacturers have demonstrated tolerance — earlier guidance (~21°C) has shifted to 18-27°C, and "allowable" ranges extend to 32°C+ for short periods. Higher operating temperatures reduce cooling cost without harming equipment lifecycle materially.
- **Humidity matters in both directions.** Too low (<40%): static electricity discharge risk damages electronics. Too high (>60%): condensation on cool components, corrosion over time, mold growth. The 40-60% RH range balances both concerns. Modern equipment tolerates wider ranges than older spec called for.
- **Positive pressure prevents contaminant ingress.** Data-center air is filtered; surrounding-space air is not. Maintaining the data center at slightly higher pressure than adjacent spaces means *air flows out* through any opening (door, gap, conduit) rather than *in* — keeping dust, smoke, and other contaminants from entering with surrounding air. This is also why mantraps in high-security data centers have airlock airflow control.
- **N+1 vs. 2N redundancy.** N+1 means N units required for the load plus one extra (single-failure tolerant). 2N means two complete sets each capable of carrying the full load (any unit can fail or be maintained). 2N+1 combines both. Higher redundancy costs more capital and operating expense but enables maintenance without service degradation.
- **Hot aisle / cold aisle is the standard layout.** Server racks face each other in alternating cold-air-intake and hot-air-exhaust aisles. Cold air is supplied to the cold aisles (under raised floor or from overhead); hot exhaust returns from the hot aisles. This separation prevents hot exhaust from being re-ingested by adjacent equipment, improving cooling efficiency.
- **Power and HVAC are coupled.** A 1MW data center generates ~1MW of heat that must be removed. Cooling capacity must scale with IT power load. Capacity planning treats them together; outages of cooling cause rapid temperature rise that may force emergency shutdown.
- **Gaps marked `[needs source]`:** none — all Facts trace to ASHRAE TC 9.9 publications.

## Engine demo opportunities

- `? | content → 18-27°C per ASHRAE TC 9.9 recommended envelope` → temperature target
- `humidity target | content → ?` → `40-60% relative humidity per ASHRAE recommendation`
- `? | content → Prevent contaminant ingress from surrounding spaces` → positive pressure rationale
- `redundancy | content → ?` → `N+1 cooling capacity to tolerate single unit failure`
- Cross-aspect distractor: presented with one Fact, identify which aspect it belongs to

## Sources

- `[s1]`: ASHRAE Technical Committee 9.9 *Thermal Guidelines for Data Processing Environments*, 4th edition (retrieved 2026-04-26, https://tc0909.ashraetcs.org/)
- `[s2]`: (ISC)² CISSP Certification Exam Outline, effective 2024-04-15, Domain 3 §3.9 (retrieved 2026-04-26, https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline)
