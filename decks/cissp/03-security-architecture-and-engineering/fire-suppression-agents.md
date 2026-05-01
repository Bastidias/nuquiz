# Fire Suppression Agents

**Domain:** 3 — Security Architecture and Engineering &nbsp;|&nbsp; **Pattern:** Dimensions &nbsp;|&nbsp; **Tags:** 3.9, 7.14
**Status:** draft (SME review pending)

The six fire-suppression agents CISSP courseware tests. Each pairs *fire classes addressed* with *environmental impact*, *life safety* posture, and *typical environment*. The CISSP exam tests both the matchup between agent and fire class and the broader principle that agent choice depends on the protected asset (water-resistant equipment vs. water-sensitive electronics) and life-safety constraints (CO2 displaces oxygen — dangerous in occupied spaces).

| agent | fire classes addressed | environmental impact | life safety | typical environment |
|---|---|---|---|---|
| Water | Class A [s1] | Low [s1] | Safe for occupants [s1] | General-purpose buildings [s1] |
| Foam | Class A [s1]<br>Class B [s1] | Medium due to runoff [s1] | Safe for occupants [s1] | Fuel storage areas [s1] |
| CO2 | Class B [s1]<br>Class C [s1] | Low direct [s1] | Asphyxiation hazard at extinguishing concentrations [s1] | Unoccupied equipment rooms [s1] |
| FM-200 | Class A [s2]<br>Class B [s2]<br>Class C [s2] | High global warming potential [s2] | Safe at extinguishing concentrations [s2] | Data centers and clean rooms [s2] |
| Novec 1230 | Class A [s2]<br>Class B [s2]<br>Class C [s2] | Low global warming potential [s2] | Safe at extinguishing concentrations [s2] | Data centers and clean rooms [s2] |
| Inert gas | Class A [s3]<br>Class B [s3]<br>Class C [s3] | Negligible [s3] | Safe at extinguishing concentrations [s3] | Data centers and archives [s3] |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. No parentheticals in cells.
- **Tags 3.9 and 7.14 retained from stub.** Cross-tagged. Sibling Concept: `fire-classes.md`.
- **Clean agents are the data-center default.** FM-200 (HFC-227ea), Novec 1230 (FK-5-1-12), and inert gases (IG-541 Inergen, IG-55 Argonite, IG-100 nitrogen) are *clean agents* — they leave no residue, do not damage electronics, and are safe in occupied spaces at extinguishing concentrations. They are the standard choice for protecting data centers, network rooms, and electronics-heavy environments.
- **CO2 is the "do not occupy" agent.** CO2 extinguishes by displacing oxygen — at extinguishing concentrations (~30%+) it is fatal to humans within minutes. CO2 systems require pre-discharge alarms and evacuation procedures. Acceptable for unoccupied equipment rooms; not acceptable for areas where people may be present.
- **FM-200 vs. Novec 1230 environmental tradeoff.** FM-200 has high Global Warming Potential (GWP ~3500); Novec 1230 has very low GWP (~1) and is biodegradable. Many organizations have shifted from FM-200 to Novec 1230 as environmental regulations tighten. Both are functionally equivalent for fire suppression.
- **Inert gases extinguish via oxygen reduction without asphyxiation.** Reduce oxygen from 21% to ~12-15% — enough to suppress fire but still survivable for healthy adults. The transition concentration is the safety design point. Engineering must verify room volume and inert-gas charge are correctly matched.
- **Halon is the deprecated predecessor.** Halon 1301 was the dominant data-center clean agent until the Montreal Protocol (1987) banned it for ozone-depletion. Existing Halon installations are grandfathered; new installations must use Halon replacements (FM-200, Novec 1230, inert gas). Older CISSP study materials may reference Halon; modern exam favors the replacements.
- **Pre-action vs. wet-pipe vs. dry-pipe sprinklers.** Water-based fire suppression in data centers typically uses pre-action systems — pipes are dry until a fire detection occurs, then fill with water but only release if a sprinkler head opens. This reduces the risk of accidental water release damaging equipment. Wet-pipe (always-pressurized) systems are common in offices; dry-pipe in unheated spaces.
- **Gaps marked `[needs source]`:** none — all Facts trace to NFPA 12, 2001, or vendor agent documentation.

### Tricky distractors

- **CO2 is fatal to occupants at extinguishing concentration.** Pre-discharge alarms required. Wrong-answer pattern: deploying CO2 in occupied spaces — only unoccupied equipment rooms.
- **Halon is banned for new installations.** Montreal Protocol 1987. Wrong-answer pattern: recommending Halon for new data centers — banned.
- **Clean agents leave no residue.** FM-200, Novec, inert gas. Wrong-answer pattern: claiming dry chemical is data-center safe — leaves corrosive residue.
- **FM-200 high GWP; Novec 1230 low GWP.** Environmental shift. Wrong-answer pattern: treating them as environmentally equivalent — Novec is replacement choice.
- **Inert gases reduce O2 to 12-15%.** Suppress without asphyxiation. Wrong-answer pattern: claiming inert gas suffocates occupants like CO2 — engineered to be survivable.
- **Pre-action sprinklers for data centers.** Pipes dry until detection. Wrong-answer pattern: using wet-pipe sprinklers in data center — accidental release risk.

## Engine demo opportunities

- `? | typical environment → Unoccupied equipment rooms` → CO2
- `Novec 1230 | environmental impact → ?` → `Low global warming potential`
- `? | life safety → Asphyxiation hazard at extinguishing concentrations` → CO2
- `Foam | fire classes addressed → ?` → `Class A` or `Class B`
- Cross-Row shared-Value detection: `? | typical environment → Data centers and clean rooms` → FM-200, Novec 1230 (Inert gas is "Data centers and archives")
- Composite Row profile: Water across all Columns with `life safety` swapped to `Asphyxiation hazard at extinguishing concentrations` (CO2's value)

## Sources

- `[s1]`: NFPA 12 *Standard on Carbon Dioxide Extinguishing Systems* and NFPA 13 *Standard for the Installation of Sprinkler Systems* (retrieved 2026-04-26, https://www.nfpa.org/)
- `[s2]`: NFPA 2001 *Standard on Clean Agent Fire Extinguishing Systems* — FM-200, Novec 1230, and other halocarbon agents (retrieved 2026-04-26, https://www.nfpa.org/codes-and-standards/all-codes-and-standards/list-of-codes-and-standards/detail?code=2001)
- `[s3]`: NFPA 2001 inert-gas agents (IG-541, IG-55, IG-100) (retrieved 2026-04-26, https://www.nfpa.org/codes-and-standards/all-codes-and-standards/list-of-codes-and-standards/detail?code=2001)
- `[s4]`: (ISC)² CISSP Certification Exam Outline, effective 2024-04-15, Domain 3 §3.9 and Domain 7 §7.14 (retrieved 2026-04-26, https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline)
