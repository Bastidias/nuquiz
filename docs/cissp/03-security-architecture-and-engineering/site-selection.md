# Site Selection Criteria

**Domain:** 3 — Security Architecture and Engineering &nbsp;|&nbsp; **Pattern:** Aspects &nbsp;|&nbsp; **Tags:** 3.8
**Status:** draft (SME review pending)

The five facets that drive site-selection decisions for facilities housing information systems. Site selection occurs early in facility planning because reversing a poor site choice is expensive — better to evaluate before construction. CISSP testing focuses on the five-axis evaluation.

| Concept | natural disaster risk | crime rate | utility availability | physical access | political stability |
|---|---|---|---|---|---|
| Site selection | Earthquake zones<br>Flood plains<br>Hurricane corridors<br>Wildfire zones | Local violent crime statistics<br>Property crime statistics<br>Trends over time | Reliable power<br>Diverse fiber routes<br>Water<br>Multiple power feeds | Distance from major highways<br>Distance from airports<br>Public-transit access<br>Neighbor proximity | Government stability<br>Civil unrest history<br>Regulatory predictability |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. **No parentheticals in cells.**
- **Site selection is one decision examined from five angles.** The Aspects pattern reflects this — a single concept (site selection) with multiple facets to evaluate. Each facet has its own data sources and risk-rating method.
- **Natural disaster risk drives BIA outputs.** A site in a flood plain or earthquake zone has a higher BIA-projected outage frequency. Sibling Concepts: `recovery-site-types` in D1 (where alternate sites should *not* be co-located in the same disaster zone), `bcp-phases` in D1 (BIA as input to BCP).
- **Crime rate drives physical-security cost.** A site in a high-crime area requires more physical perimeter controls, more guards, more security technology. The total cost of operating a facility includes the physical-security overhead — high-crime locations cost more long-term even if the land is cheaper.
- **Utility availability drives operational reliability.** Data centers in particular need *reliable* power (multiple feeders from different substations), *diverse* network connectivity (multiple fiber providers entering from different directions), and water (for cooling). Sites with single-source utilities are operationally fragile.
- **Physical access matters two ways.** *Authorized* access (employees, deliveries, emergency responders) needs to be efficient — a site too remote from highways or airports is operationally expensive. *Unauthorized* access risk (lone-wolf attackers, vehicle bombs) can be reduced by setbacks, bollards, controlled approach lanes — but the underlying site geography matters too.
- **Political stability matters for international sites.** Government instability, civil unrest, and unpredictable regulation all create operational risk. Some organizations specifically avoid certain countries; sovereign-cloud and regulatory-residency requirements (covered in `cloud-data-residency-models` in D2) tie site choices to political-stability considerations.
- **CPTED principles apply at the site level.** Sibling Concept `cpted-principles` covers the four CPTED axes (natural surveillance, natural access control, territorial reinforcement, maintenance). Site selection decisions about visibility, fencing, lighting, and approach paths all derive from CPTED analysis.
- **Out of scope for this Concept:** specific risk-quantification methodologies, cost-benefit analysis frameworks for site selection, real-estate market analysis, ESG factors, climate-change projection for long-term site planning, sovereign-cloud-driven international site selection.

### Values without a direct public citation

| Cell | Notes |
|---|---|
| All cells | Industry-typical site-selection considerations. Specific risk-rating sources (USGS for earthquakes, FEMA for floodplains, FBI UCR for crime) exist but are not enumerated per cell. |

## Engine demo opportunities

- `Site selection | natural disaster risk → ?` → `Earthquake zones`, `Flood plains`, `Hurricane corridors`, `Wildfire zones`
- `Site selection | utility availability → ?` → `Reliable power`, `Diverse fiber routes`, `Water`, `Multiple power feeds`
- `Site selection | political stability → ?` → `Government stability`, `Civil unrest history`, `Regulatory predictability`
- `? | content → Earthquake zones` → `natural disaster risk` aspect
- `? | content → Government stability` → `political stability` aspect
- Composite swap: `crime rate` cell content swapped to political-stability content — tests aspect-content pairing

## Sources

- `[s1]`: NIST SP 800-100, "Information Security Handbook: A Guide for Managers" — site-selection considerations within the broader information-security program (October 2006, retrieved 2026-04-26, https://csrc.nist.gov/publications/detail/sp/800-100/final)
- `[s2]`: ASHRAE TC 9.9, "Data Center Power Equipment Thermal Guidelines and Best Practices" — utility-and-environmental considerations for data centers (retrieved 2026-04-26, https://tc0909.ashraetcs.org/)
