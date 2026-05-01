# Disaster Types

**Domain:** 1 — Security and Risk Management &nbsp;|&nbsp; **Pattern:** Dimensions &nbsp;|&nbsp; **Tags:** 1.8

**Status:** draft (SME review pending)

The five disaster categories CISSP candidates are expected to discriminate when classifying threats for BCP and disaster-recovery planning. Each pairs a *category* with *example events*, the *typical recovery requirement*, and characteristic *defensive controls*. The CISSP exam tests both the categorization and the principle that BIA and contingency planning must consider all five — natural-only planning leaves the organization exposed to insider threat, intentional attacks, and slow-onset technical failures. Sibling Concepts `bcp-phases`, `bia-components`, and `recovery-site-types` cover the planning process this Concept feeds into.

| Category | example events | typical recovery requirement | characteristic mitigation |
|---|---|---|---|
| Natural | Earthquakes<br>Hurricanes<br>Floods<br>Wildfires [s1] | Geographic site separation [s1] | Geographic redundancy<br>Site selection avoiding hazard zones [s1] |
| Human-caused intentional | Cyberattacks<br>Sabotage<br>Terrorism<br>Insider threat [s1] | Detection and containment | Layered security controls<br>Insider-threat program [s1] |
| Human-caused accidental | Power outages from third-party error<br>Construction accidents<br>Operator error | Operational redundancy [s1] | Procedural controls<br>Training<br>Change management [s1] |
| Technical | Hardware failure<br>Software defects<br>Network outage [s1] | High availability infrastructure | Redundant components<br>Patching<br>Monitoring [s1] |
| Environmental | Building utility failure<br>HVAC failure<br>Fire suppression discharge | Facility-level controls [s1] | Backup power<br>Environmental monitoring [s1] |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. **No parentheticals in cells.**
- **Acronym expansions.** `BCP` = Business Continuity Planning. `DR` = Disaster Recovery. `BIA` = Business Impact Analysis. `RTO` = Recovery Time Objective. `RPO` = Recovery Point Objective. `MTBF` = Mean Time Between Failures. `HVAC` = Heating, Ventilation, and Air Conditioning. `UPS` = Uninterruptible Power Supply.
- **Five categories, one taxonomy.** NIST SP 800-34 [s1] groups disasters by causation: natural, human-caused, and technical/environmental. CISSP courseware further splits human-caused into intentional and accidental and breaks environmental out from technical. The five-row table here matches the most-tested CISSP framing; some sources collapse to three or four rows.
- **Natural disasters drive geographic separation.** Recovery sites in the same earthquake zone, flood plain, or hurricane corridor as the primary site fail together. Sibling Concept `recovery-site-types` covers hot/warm/cold site selection; this Concept emphasizes that natural-disaster planning *requires* the alternate site to be in a different geographic risk zone — typically hundreds of miles away.
- **Intentional human-caused is the cyberattack category.** Ransomware, DDoS, advanced-persistent-threat campaigns, sabotage by hostile insiders, terrorism affecting facilities. The defensive posture is layered security controls plus the BCP / IR processes that run when those controls fail. CISSP framing places cyberattacks here in the disaster taxonomy even though they're treated separately in incident-response framing.
- **Accidental human-caused often produces the largest outages.** The 2021 Fastly outage (single misconfigured customer config), the 2017 AWS S3 outage (ops-team typo), the 2022 Atlassian outage (deletion script affecting wrong tenants) — operator-error incidents routinely cause more downtime than malicious attacks. Mitigation is procedural: change management, separation of duties, peer review, gradual deployment, robust rollback.
- **Technical disasters are the bread-and-butter.** Hardware fails, software has bugs, networks have outages. Engineering for high availability — redundant components, automated failover, health monitoring — addresses the routine technical disaster. MTBF informs how much redundancy is enough.
- **Environmental disasters are facility-level.** Loss of power (long enough to drain UPS), HVAC failure (overheating data center), water leak from above, fire suppression discharge that damages equipment, dust contamination. Mitigation: redundant utility feeds, generator backup, environmental sensors, tested fire suppression that doesn't damage electronics (clean agents — see `fire-suppression-agents`).
- **Pandemic is a special category.** COVID-19 demonstrated that pandemics affect personnel availability without affecting facilities or technology. Many pre-2020 BCP plans had no provision for "everyone works from home for two years." Pandemic now appears in many BCP frameworks as either a sub-category of natural disasters or its own category. Not represented as a separate row here for stub-fidelity; SME pass might add it.
- **Cross-Concept link.** Sibling Concept `bia-components` covers MTD/RTO/RPO derived from BIA. `bcp-phases` covers the seven-phase BCP lifecycle. `recovery-site-types` covers alternate-site options. `dr-test-types` covers exercise types validating recovery plans. `containment-strategies` and `incident-response-phases` cover the IR side that overlaps with intentional human-caused disasters.
- **Out of scope for this Concept:** specific BCP frameworks (ISO 22301, NIST SP 800-34, BCI Good Practice Guidelines), pandemic-specific planning frameworks, geographic-risk databases (FEMA flood maps, USGS earthquake maps), insurance frameworks for disaster recovery, climate-change projection for long-term BCP, supply-chain resilience as adjacent topic.

### Tricky distractors

- **Five categories cover most disasters.** Natural, intentional, accidental, technical, environmental. Wrong-answer pattern: planning only for natural and technical — leaves intentional and human-error gaps.
- **Recovery site geographic separation matters for natural disasters.** Same flood plain = both sites flood. Wrong-answer pattern: putting primary and DR sites in the same metro region — earthquake or hurricane fails both.
- **Operator error is human-caused accidental.** Major outage source. Wrong-answer pattern: lumping operator error with malicious insider — different intent, different mitigation.
- **Pandemic affects personnel, not facilities.** Different planning model. Wrong-answer pattern: applying physical-disaster recovery plans to pandemic — the buildings are fine; the people can't come in.
- **Cyberattack is a disaster category.** Intentional human-caused. Wrong-answer pattern: claiming cyber events are not disasters — modern BCP frameworks include them.
- **All five categories require BIA consideration.** Comprehensive planning. Wrong-answer pattern: claiming BIA only addresses natural disasters — must cover the full taxonomy.

### Values without a direct public citation

| Cell | Value | Why unsourced |
|---|---|---|
| All rows × example events | Specific event lists | NIST SP 800-34 [s1] addresses categories conceptually; specific examples are pedagogical summaries from FEMA and CISA disaster-planning resources rather than direct quotations per cell. |
| All rows × characteristic mitigation | Mitigation phrasings | Industry-typical control mappings; not enumerated per-category in primary publications with this exact framing. |
| Human-caused accidental × all cells | — | NIST SP 800-34 [s1] groups accidental and intentional together as "human-caused"; the split into separate rows reflects CISSP-curriculum framing rather than NIST primary structure. |
| Environmental × all cells | — | NIST SP 800-34 [s1] groups environmental with technical; the split into separate rows reflects CISSP-curriculum framing. |

## Engine demo opportunities

- `Natural | example events → ?` → `Earthquakes`, `Hurricanes`, `Floods`, `Wildfires`
- `? | example events → Cyberattacks` → `Human-caused intentional` (sub-Fact in multi-Fact cell)
- `? | example events → Operator error` → `Human-caused accidental` (sub-Fact in multi-Fact cell)
- `Technical | example events → ?` → `Hardware failure`, `Software defects`, `Network outage`
- `Environmental | example events → ?` → `Building utility failure`, `HVAC failure`, `Fire suppression discharge`
- `? | typical recovery requirement → Geographic site separation` → `Natural`
- `? | characteristic mitigation → Insider-threat program` → `Human-caused intentional` (sub-Fact in multi-Fact cell)
- `? | characteristic mitigation → Backup power` → `Environmental` (sub-Fact in multi-Fact cell)
- Composite Natural Row with `example events` swapped to `Cyberattacks`, `Sabotage`, `Terrorism`, `Insider threat` — directly tests the natural-vs-intentional category boundary
- Composite Technical Row with `typical recovery requirement` swapped to `Geographic site separation` (Natural's value) — tests recovery-strategy pairing (geographic separation addresses natural; high availability addresses technical)
- Composite Human-caused intentional Row with `example events` swapped to `Hardware failure`, `Software defects` (Technical's value) — tests intent vs cause (hardware failure is technical, not intentional human action)

## Sources

- `[s1]`: NIST SP 800-34 Rev 1, "Contingency Planning Guide for Federal Information Systems" — disaster categorization and contingency planning framework (May 2010, retrieved 2026-04-30, https://csrc.nist.gov/publications/detail/sp/800-34/rev-1/final)
- `[s2]`: ISO 22301:2019, "Security and resilience — Business continuity management systems — Requirements" — international BCP standard with threat-and-disaster framing (retrieved 2026-04-30, https://www.iso.org/standard/75106.html)
- `[s3]`: FEMA, "National Risk Index" and disaster-categorization resources (retrieved 2026-04-30, https://www.fema.gov/flood-maps/products-tools/national-risk-index)
- `[s4]`: (ISC)² CISSP Certification Exam Outline, effective 2024-04-15, Domain 1 §1.8 *Develop, document, and implement security policy, standards, procedures, and guidelines* (retrieved 2026-04-30, https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline)
