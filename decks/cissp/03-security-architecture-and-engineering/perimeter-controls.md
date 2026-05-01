# Physical Perimeter Controls

**Domain:** 3 — Security Architecture and Engineering &nbsp;|&nbsp; **Pattern:** Dimensions &nbsp;|&nbsp; **Tags:** 3.9, 7.14
**Status:** draft (SME review pending)

The six physical perimeter controls CISSP courseware tests. Each pairs a *purpose* with whether the control is primarily *deterrent* (psychological deterrence) or *preventive* (physical blocking) and a *typical placement*. The CISSP exam tests both the matchup between control and threat scenario and the principle that perimeter security must work in layered defense.

| control | purpose | deterrent or preventive | typical placement |
|---|---|---|---|
| Fences | Define property boundary [s1] | Both deterrent and preventive [s1] | Property perimeter [s1] |
| Walls | Block visual and physical access [s1] | Preventive [s1] | Building perimeter [s1] |
| Lighting | Illuminate area for visibility [s1] | Deterrent [s1] | Exterior approaches and entry points [s1] |
| Bollards | Block vehicle approach to building [s1] | Preventive [s1] | Building entrances and pedestrian areas [s1] |
| Gates | Control entry to perimeter zone [s1] | Preventive when staffed [s1] | Property entry points [s1] |
| Mantraps | Allow only one person at a time through controlled entry [s1] | Preventive [s1] | High-security building entries [s1] |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. No parentheticals in cells.
- **Tags 3.9 and 7.14 retained from stub.** Cross-tagged. Sibling Concepts: `access-controls.md`, `cpted-principles.md`.
- **Defense in depth applies to physical perimeter.** Outer perimeter (fence) → outer building access (walls + gates + lighting) → inner access (mantraps) → asset access (locks + biometric). Each layer adds delay and detection opportunity. An attacker bypassing one layer faces the next.
- **Fence height and design.** Standard chain-link fences (3-4 ft) are property markers, not security barriers. Security fencing (6-8 ft) deters casual intrusion. High-security fencing (8 ft + barbed wire / razor wire / electrified) prevents climbing. Anti-climb design (rolled tops, K-rated for crash, bollard integration) for highest security.
- **Bollards have crash ratings.** Bollards (vertical posts) prevent vehicle-borne attacks (vehicle-ramming, car bombs). K-rated bollards are tested for vehicle impact resistance — K4 (15,000 lbs at 30 mph), K8 (30 mph), K12 (50 mph). High-value targets (embassies, federal buildings, executive residences) use K12.
- **Lighting is detective + deterrent.** Well-lit areas are easier for guards/CCTV to monitor (detection) and present perceived risk to intruders (deterrence). Lighting placement affects effectiveness — overhead area lighting + perimeter lighting + entrance lighting + parking-area lighting work in combination. Lighting alone is not a strong control but enables others.
- **Mantraps enforce one-person-at-a-time entry.** Two doors in series; second locked until first closes. Some implementations include weight sensors to detect tailgating attempts. Mantraps with biometric authentication on the inner door are common in data centers and high-security facilities.
- **Gates are deterrent until staffed.** An unstaffed gate is a barrier that can be evaded (climbed, driven around). Staffed gates with guard verification are preventive. Many sites use a hybrid: unstaffed during business hours (relying on access cards), staffed after hours.
- **What is intentionally not on this table.** CCTV (covered in `detection-systems.md`), security guards (a personnel control rather than physical), motion sensors, glass-break detectors. The six here cover the most-tested CISSP physical-perimeter scope.
- **Gaps marked `[needs source]`:** none — all Facts trace to ASIS physical-security framing.

### Tricky distractors

- **Lighting is deterrent, not preventive.** Doesn't physically stop. Wrong-answer pattern: classifying lighting as preventive — it enables detection and deters but doesn't block.
- **Fences are deterrent + preventive.** Combination depends on height/design. Wrong-answer pattern: claiming any fence is preventive — chain-link is deterrent only.
- **Bollards are vehicle-specific.** K-rated for impact. Wrong-answer pattern: applying bollards to pedestrian crowd control — they target vehicle threats.
- **Unstaffed gate is just a barrier.** Becomes preventive only when staffed. Wrong-answer pattern: claiming gates are always preventive — staffing matters.
- **Mantrap = one person at a time.** Two doors in series. Wrong-answer pattern: confusing mantrap with turnstile — mantrap physically isolates; turnstile blocks one-at-a-time but doesn't isolate.
- **Defense in depth: layered perimeter.** Fence → building → inner access. Wrong-answer pattern: claiming any single perimeter control is sufficient — must layer.

## Engine demo opportunities

- `? | purpose → Block vehicle approach to building` → Bollards
- `Lighting | deterrent or preventive → ?` → `Deterrent`
- `? | typical placement → High-security building entries` → Mantraps
- `Fences | typical placement → ?` → `Property perimeter`
- Cross-Row shared-Value detection: `? | deterrent or preventive → Preventive` → Walls, Bollards, Mantraps (Gates is conditional)
- Composite Row profile: Lighting across all Columns with `deterrent or preventive` swapped to `Preventive` (Walls/Bollards/Mantraps' value)

## Sources

- `[s1]`: ASIS International *Protection of Assets: Physical Security* — perimeter-control framework (retrieved 2026-04-26, https://www.asisonline.org/publications--resources/standards--guidelines/)
- `[s2]`: (ISC)² CISSP Certification Exam Outline, effective 2024-04-15, Domain 3 §3.9 and Domain 7 §7.14 (retrieved 2026-04-26, https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline)
