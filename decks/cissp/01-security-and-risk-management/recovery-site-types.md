# Recovery Site Types

**Domain:** 1 — Security and Risk Management &nbsp;|&nbsp; **Pattern:** Dimensions &nbsp;|&nbsp; **Tags:** 1.8, 7.10
**Status:** draft (SME review pending)

The six alternate-site options NIST SP 800-34 and standard CISSP teaching cover for relocating IT operations after a disruption. Rows are the canonical site types in roughly cost-ascending order (Cold, Warm, Hot, Mobile, Cloud, Reciprocal). Columns progress from cost (planning input), through setup time and resources ready (operational state), to typical RTO (recovery output).

| Site | cost | setup time | resources ready | typical RTO |
|---|---|---|---|---|
| Cold | Low [s2] | Days to weeks | Space<br>Power<br>HVAC<br>Connectivity [s2] | Weeks [s1] |
| Warm | Medium [s2] | Hours to one day [s1] | Hardware<br>Software<br>Connectivity [s2] | 24 to 48 hours [s1] |
| Hot | High [s2] | Minutes | Full systems<br>Near-real-time data [s1, s2] | Under 1 hour [s1] |
| Mobile | Medium | Days | Trailer<br>Computer equipment<br>HVAC [s1] | Days |
| Cloud | Variable [s2] | Minutes [s2] | Virtualized infrastructure<br>Automated failover [s2] | Minutes to hours [s2] |
| Reciprocal | Low [s2] | Hours | Partner's facilities [s1, s2] | Hours to days |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. No parentheticals in cells.
- **Cost values are bins, not dollar figures.** `Low` / `Medium` / `High` / `Variable` are atomic categorical values; the engine matches on bin equality. CISSP pedagogy ranks Reciprocal cheapest, then Cold, then Warm, then Mobile, then Hot, with Cloud variable. Cold and Reciprocal both bin to `Low` here — that is a legitimate shared Value, not an authoring error.
- **Setup time vs typical RTO are distinct columns.** Setup time = duration from "decide to activate" to "site is operational." RTO = duration from disruption to business operations resumed (which includes setup *plus* data restoration *plus* user cutover). Hot site setup is `Minutes` because it is already running; RTO is `Under 1 hour` because data sync and switchover still take time.
- **Hot site `resources ready` includes near-real-time data.** NIST SP 800-34 [s1] describes hot sites as having "all necessary hardware and critical applications data mirrored in real time." Wikipedia [s2] uses "real-time synchronization." Both are captured in the cell as `Near-real-time data` (compressing "real-time" and "near-real-time" into one Fact since CISSP testing does not differentiate).
- **Mobile site is a trailer.** NIST SP 800-34 describes mobile sites as "towable trailers that contain racks of computer equipment, as well as HVAC, fire suppression and physical security." Useful when the disruption is geographically localized and the primary facility is intact but isolated (e.g., flood, hazmat).
- **Cloud as a recovery site is post-NIST-SP-800-34.** SP 800-34 Rev 1 was published in 2010; cloud recovery sites are now standard CISSP teaching but are not in the original NIST publication. Citations here come from Wikipedia [s2], which covers virtualized failover. An updated NIST publication or an industry source (FedRAMP, AWS DR whitepapers, ISO 22301) would strengthen this row.
- **Reciprocal agreement is also called Mutual Aid Agreement.** Two organizations agree to host each other in a disaster. Cheapest option but rarely tested in production — capacity planning at the partner site, security/compliance overlap, and divergent infrastructure all reduce reliability.
- **Out of scope:** Mirrored / Redundant site (an exact production duplicate; sometimes treated as a hot-site variant, sometimes as its own category). The stub declares 6 rows; adding a 7th row for Mirrored is an SME decision.

### Tricky distractors

- **Cold site has no equipment.** Just space, power, HVAC, connectivity. Wrong-answer pattern: claiming cold sites have hardware ready — that's warm.
- **Warm site has hardware but stale data.** Hardware and software ready, but data must be loaded. Wrong-answer pattern: claiming warm sites are real-time replicated — that's hot.
- **Hot site costs the most, recovers fastest.** Cost-RTO is inversely related across the ladder. Wrong-answer pattern: thinking you can have fast recovery cheaply.
- **Reciprocal agreement is cheap but unreliable.** Partner capacity, compliance overlap, and infrastructure mismatch make it weak in practice. Wrong-answer pattern: recommending reciprocal for high-availability needs.
- **Setup time ≠ RTO.** Setup is "site operational"; RTO includes setup + data restore + cutover. Wrong-answer pattern: equating the two — hot site setup is minutes but RTO is under 1 hour.
- **Mobile site is a physical trailer.** Towable, hardware-equipped. Wrong-answer pattern: confusing mobile with cloud — mobile is hardware-on-wheels.

### Source provenance caveat

Direct read of the NIST SP 800-34 Rev 1 PDF was not performed. Cell values cited as `[s1]` were drawn from a ScienceDirect topic page that summarizes NIST SP 800-34 with quoted phrasing; the URL is recorded in the registry but the source document was not independently parsed. This matches the provenance limitation noted in `decks/cissp/knowledge-map.md` § Source Provenance for D4 and D5 Concepts. SME pass should fetch and verify against the NIST PDF directly.

### Values without a direct public citation

| Cell | Value | Why unsourced |
|---|---|---|
| Cold × setup time | `Days to weeks` | CISSP pedagogical consensus. Sources describe cold-site recovery in weeks but do not give a setup-time value distinct from RTO. |
| Hot × setup time | `Minutes` | CISSP pedagogical consensus. Sources describe hot-site RTO ("less than an hour") but not a separate setup-time figure; "Minutes" reflects that the site is already running. |
| Mobile × cost | `Medium` | CISSP pedagogical consensus. Neither cited source bins mobile-site cost. |
| Mobile × setup time | `Days` | CISSP pedagogical consensus. Trailer transport, connection, and provisioning typically take days; not directly quoted. |
| Mobile × typical RTO | `Days` | CISSP pedagogical consensus. Not directly quoted. |
| Reciprocal × setup time | `Hours` | CISSP pedagogical consensus. Sources describe the agreement structure but not setup-time. |
| Reciprocal × typical RTO | `Hours to days` | CISSP pedagogical consensus. Not directly quoted. |

## Engine demo opportunities

- `Cold | typical RTO → ?` → `Weeks`
- `Hot | typical RTO → ?` → `Under 1 hour`
- `Warm | typical RTO → ?` → `24 to 48 hours`
- `? | cost → Low` → `Cold`, `Reciprocal` — shared-Value select-all
- `? | cost → High` → `Hot`
- `? | setup time → Minutes` → `Hot`, `Cloud` — shared-Value select-all
- `Cold | resources ready → ?` → `Space<br>Power<br>HVAC<br>Connectivity`
- `? | resources ready → Trailer` → `Mobile`
- Composite Cold Row with `typical RTO` swapped to `Under 1 hour` — tests the cost ↔ RTO inverse relationship (cheap site cannot have fast RTO)
- Composite Hot Row with `cost` swapped to `Low` — same inverse-relationship test from the other end
- Composite Reciprocal Row with `resources ready` swapped to `Trailer<br>Computer equipment<br>HVAC` — tests the Reciprocal ↔ Mobile distinction (both are non-traditional sites but Mobile is physical equipment, Reciprocal is a contractual relationship)

## Sources

- `[s1]`: ScienceDirect, "Contingency Planning Guide" topic page summarizing NIST SP 800-34 Rev 1 (retrieved 2026-04-25, https://www.sciencedirect.com/topics/computer-science/contingency-planning-guide). Secondary aggregator; direct NIST SP 800-34 PDF was not read in this authoring pass.
- `[s2]`: Wikipedia, "Backup site" (retrieved 2026-04-25, https://en.wikipedia.org/wiki/Backup_site)
