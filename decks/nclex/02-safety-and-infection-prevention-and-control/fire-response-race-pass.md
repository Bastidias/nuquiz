# Fire Response (RACE / PASS)

**Topic:** 2 — Safety and Infection Prevention and Control &nbsp;|&nbsp; **Pattern:** Ordered &nbsp;|&nbsp; **Tags:** 2.2, IP-CJ
**Status:** draft (SME review pending)

The two paired mnemonics nurses use during a healthcare-facility fire: **RACE** governs the unit-level response (Rescue → Alarm/Activate → Confine/Close → Extinguish/Evacuate), and **PASS** governs handheld-fire-extinguisher operation (Pull → Aim → Squeeze → Sweep). RACE is the supervisory sequence the nurse runs the moment fire or smoke is detected; PASS is invoked only inside RACE step 4, and only when the fire is small, contained, and the nurse has the right extinguisher class. NCSBN's 2026 RN test plan §2.2 (Emergency Response Plan) requires the candidate to "Use clinical decision-making/critical thinking for emergency response plan" and "Participate in emergency planning and response" `[s5]`. Healthcare facilities operate under CMS Conditions of Participation §482.41(b), which mandates compliance with NFPA 101 *Life Safety Code* and "written fire control plans that contain provisions for prompt reporting of fires; extinguishing fires; protection of patients, personnel and guests; evacuation; and cooperation with fire fighting authorities" `[s4]`. The hospital fire-safety paradigm is **defend-in-place**: smoke compartments and horizontal evacuation between compartments are the first line of patient protection, so RACE's "Confine/Close" step (closing doors, isolating smoke compartments) is doing more work than the laypress version of the acronym suggests `[s3]`. This Concept holds two Ordered tables — one per mnemonic — to preserve the canonical sequence integrity of each.

**Layout convention:** two Ordered tables, one per mnemonic. Rows are steps in canonical order, numbered. Columns progress left → right from the mnemonic-letter step name (Step), through what the nurse actually does (Action), to the recurring NCLEX-tested error pattern at that step (Common error). Each `<br>`-separated item is one atomic Fact.

## RACE — Fire response sequence

| # | Step | Action | Common error |
|---|---|---|---|
| 1 | Rescue | Move clients in immediate danger first `[s1, s2]`<br>Prioritize ambulatory clients out of the fire room `[s2]`<br>Use bedsheet drag for non-ambulatory clients `[s2]`<br>Move horizontally to the next smoke compartment first `[s3]` | Pulling the alarm before removing the client from the burning room `[s1]`<br>Attempting vertical evacuation by elevator `[s3]` |
| 2 | Alarm/Activate | Pull the nearest fire-alarm pull station `[s1, s2]`<br>Call the facility emergency code for fire `[s2]`<br>Notify charge nurse `[s4]` | Skipping the alarm to fight the fire alone `[s1, s6]`<br>Assuming someone else has called `[s6]` |
| 3 | Confine/Close | Close the door of the fire room `[s1, s3]`<br>Close doors of adjacent client rooms `[s3]`<br>Close smoke-compartment doors `[s3]`<br>Shut off medical-gas zone valves on order `[s4]` | Leaving doors open during evacuation `[s3]`<br>Failing to isolate the smoke compartment `[s3]` |
| 4 | Extinguish/Evacuate | Use a fire extinguisher only if the fire is small and contained `[s1, s6]`<br>Apply PASS technique `[s1, s2, s6]`<br>Evacuate horizontally to the next smoke compartment if extinguishment is not possible `[s3]`<br>Evacuate vertically only when horizontal refuge is unsafe `[s3]` | Attempting to extinguish a large or spreading fire `[s1, s6]`<br>Patting the flames `[s6]`<br>Using elevators during evacuation `[s3]` |

## PASS — Fire-extinguisher technique

| # | Step | Action | Common error |
|---|---|---|---|
| 1 | Pull | Pull the safety pin from the extinguisher handle `[s1, s2, s6]` | Squeezing the handle before pulling the pin `[s6]` |
| 2 | Aim | Aim the nozzle at the base of the fire `[s1, s2, s6]` | Aiming at the flames instead of the fuel source `[s6]` |
| 3 | Squeeze | Squeeze the handle to discharge the agent `[s1, s2, s6]` | Releasing the handle between bursts `[s6]` |
| 4 | Sweep | Sweep the nozzle side to side across the base `[s1, s2, s6]` | Holding the stream on one spot `[s6]`<br>Backing away before the fire is fully out `[s6]` |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. No parentheticals in cells.
- **Two tables, one Concept — structural choice.** RACE and PASS are two distinct mnemonics covering two distinct procedures. The README spec lists them as one Concept; the chosen structure is two Ordered tables under H3 headers in one file. This keeps each mnemonic's canonical sequence intact (each starts at step 1) and reflects how nursing students learn them — paired-but-distinct procedures, with PASS invoked inside RACE step 4. Alternative structures considered and rejected: (b) a `mnemonic` Column collapsing both into 8 Rows would break the "step 1 is the first step" invariant for each mnemonic and pollute step-number recall items; (c) two separate files would lose the pedagogical pairing.
- **Slash-row-name convention.** Three RACE rows use slash labels: `Alarm/Activate`, `Confine/Close`, `Extinguish/Evacuate`. These are canonical-name slash exemptions per knowledge-map atomicity rules — different primary sources publish the mnemonic with different second words (NFPA / AHRQ-style PMC source uses *Activate / Contain / Evacuate* `[s3]`; StatPearls uses *Alarm / Confine / Extinguish* `[s1]`; ECRI/AORN literature uses *Alert / Contain / Extinguish* or *Evacuate* `[s2, s6]`). The slash preserves recognition of whichever variant a candidate has memorized without smuggling a separate Fact.
- **Defend-in-place paradigm.** Hospital fire response prioritizes compartmentalization over building evacuation. NFPA 101 *Health Care Occupancies* requires smoke barriers dividing each floor into compartments; the standard expectation is **horizontal evacuation** to the adjacent compartment, with **vertical evacuation** (to a lower floor) only when horizontal refuge becomes unsafe `[s3, s4]`. The Confine/Close step is the keystone of this paradigm — closing doors maintains the smoke barrier the building was engineered around.
- **Cross-Concept link — `hospital-emergency-codes.md` (sibling).** RACE step 2 (Alarm/Activate) includes calling the facility's fire code. The specific code color (Code Red is the predominant US convention) and who responds is covered in `hospital-emergency-codes.md`. This Concept names *that the code is called*; the sibling names *which code and who responds*.
- **Cross-Concept link — `disaster-triage-start-jumpstart.md` (sibling).** Both Concepts live under §2.2 Emergency Response Plan. Fire response is a single-event facility-internal response; disaster triage is for mass-casualty events. They share the IP-CJ Tag and §2.2 Tag but cover different scenarios.
- **Synthesis-by-direct-derivation disclosure.** "Common error" cells are derived from positive-action source statements by mechanical inversion (source: "extinguish only if fire is small and contained" → cell: "Attempting to extinguish a large or spreading fire") plus the explicit "patting the flames" warning in `[s6]`. These are sourced cells with a transformation, not unsourced Facts.
- **Out of scope.** Fire-extinguisher classes (A/B/C/D/K) and which class to use on which fire type live in a separate Concept (`fire-extinguisher-classes.md`, not yet authored) — a sibling Aspects/Dimensions Concept pairs with this one. Fire-drill frequency, fire-watch protocol when sprinklers are down >10 hours `[s4]`, and oxygen-zone-valve shut-off authorization are outside §2.2's NCLEX scope and belong in environment-of-care / facilities Concepts if SME wants depth.

### Tricky distractors

- **Rescue vs Alarm sequencing.** Wrong-answer pattern: pulling the fire alarm before removing the client. RACE is intentionally Rescue-first because in a healthcare setting the unique risk is non-ambulatory clients in the room of origin — pulling the alarm first delays their rescue by seconds that matter. NCLEX items frequently test this ordering against the laypress instinct of "alarm first."
- **Confine/Close vs Extinguish/Evacuate.** Wrong-answer pattern: skipping Close in favor of Evacuate. Closing the door buys minutes of compartment integrity and is non-negotiable even when extinguishment is not attempted; the door close happens before evacuation begins.
- **PASS Pull vs Aim.** Wrong-answer pattern: aiming at the flames rather than the base of the fire. The flames are the visible product; the fuel at the base is what sustains combustion. Sweeping across the base is what extinguishes; sweeping across the flame tips wastes agent.
- **Horizontal vs vertical evacuation.** Wrong-answer pattern: choosing stairs/elevators first. Hospital fire-safety design assumes horizontal smoke-compartment refuge as the primary destination; vertical evacuation is escalation, not default. Elevators during fire are the paradigmatic wrong answer.
- **RACE Extinguish vs PASS Pull.** Wrong-answer pattern: invoking PASS before confirming RACE conditions are met. PASS is invoked inside RACE step 4 only after Rescue, Alarm, and Confine are complete and only if the fire is small and contained.

### Values without a direct public citation

| Cell | Value | Why unsourced |
|---|---|---|
| RACE 1 Rescue × Action: `Use bedsheet drag for non-ambulatory clients` | `Use bedsheet drag for non-ambulatory clients` | Standard nursing-pedagogy framing of horizontal-rescue technique for non-ambulatory clients during fire. StatPearls `[s1]` and the PMC emergency-preparedness piece `[s3]` reference rescuing immobilized clients but do not enumerate specific rescue maneuvers; the bedsheet/blanket drag is the conventional taught technique. No canonical NCSBN/NFPA primary source for the specific maneuver name. |
| RACE 3 Confine/Close × Action: `Shut off medical-gas zone valves on order` | `Shut off medical-gas zone valves on order` | NFPA 99 *Health Care Facilities Code* governs medical-gas zone valves and authorizes shut-off only on order of a designated person; the action is widely taught as a fire-response confine measure but is bounded by facility policy and authorization, not unilateral nurse action. Cited to CMS §482.41 / NFPA framing `[s4]` indirectly; specific authorization rules are facility-policy variance. |
| RACE 2 Alarm/Activate × Common error: `Assuming someone else has called` | `Assuming someone else has called` | Bystander-effect framing — widely taught in nursing emergency-response curricula and present in `[s6]` as a general safety message; not a quoted NCSBN/NFPA Fact. |

## Engine demo opportunities

- `R | RACE Step → ?` → Rescue.
- `? | RACE Step → Confine/Close` → 3.
- `Pull | PASS Action → ?` → Pull the safety pin from the extinguisher handle.
- `Aim | PASS Common error → ?` → Aiming at the flames instead of the fuel source.
- `RACE 4 Extinguish/Evacuate | Action → ?` → Use a fire extinguisher only if the fire is small and contained / Apply PASS technique / Evacuate horizontally to the next smoke compartment if extinguishment is not possible / Evacuate vertically only when horizontal refuge is unsafe (multi-Fact cell, select-all).
- `? | RACE Common error → Pulling the alarm before removing the client from the burning room` → 1 (Rescue).
- `? | PASS Action → Sweep the nozzle side to side across the base` → 4 (Sweep).
- Sequence (RACE adjacency): `RACE Step (n+1 where Step n | RACE Step → Alarm/Activate) | RACE Step → ?` → Confine/Close.
- Sequence (PASS adjacency): `PASS Step (n+1 where Step n | PASS Step → Squeeze) | PASS Step → ?` → Sweep.
- Composite Row profile: RACE step #3 (Confine/Close) across all Columns, with the Action cell swapped to a step #4 Value (e.g., "Apply PASS technique" placed under Confine/Close) as distractor.

## Sources

- `[s1]`: NIH/NLM StatPearls, *OSHA Fire Safety* (NBK580481), §RACE acronym (Rescue, Alarm, Confine, Extinguish — healthcare prioritization of patient rescue), §PASS acronym (Pull, Aim, Squeeze, Sweep), §OSHA fire-safety standards 29 CFR 1910 subparts E/H/L/Q. Retrieved 2026-04-26 from https://www.ncbi.nlm.nih.gov/books/NBK580481/
- `[s2]`: NIH/NLM PMC, *Prevention and Management of Operating Room Fire: An Interprofessional Operating Room Team Simulation Case* (PMC7012309), §RACE algorithm in OR fire response (Rescue / Alert/Alarm / Contain / Extinguish or Evacuate), §PASS technique (pull pin / aim nozzle / squeeze handle / sweep nozzle back and forth over fire), §contained vs uncontained fire distinction. Retrieved 2026-04-26 from https://pmc.ncbi.nlm.nih.gov/articles/PMC7012309/
- `[s3]`: NIH/NLM PMC, *Emergency Preparedness — Planning and Management* (PMC7152024), §RACE acronym (Rescue / Activate / Contain / Evacuate-Extinguish), §smoke-compartment unit concept and progressively larger defensive barriers, §horizontal evacuation between smoke-protected compartments as adequate first step, §vertical evacuation only if necessary, §general prohibition on elevator use during fires, §Joint Commission / CMS / Life Safety Code as governing bodies. Retrieved 2026-04-26 from https://pmc.ncbi.nlm.nih.gov/articles/PMC7152024/
- `[s4]`: Cornell Legal Information Institute, *42 CFR §482.41 — Condition of participation: Physical environment*, current text — §(b) Life Safety from Fire requirements: NFPA 101 *Life Safety Code* and Tentative Interim Amendments TIA 12-1/12-2/12-3/12-4 compliance; written fire control plans (prompt reporting, extinguishing, protection of patients/personnel/guests, evacuation, cooperation with fire-fighting authorities); written evidence of regular inspection by State or local fire control agencies; sprinkler-system fire-watch requirement when out of service >10 hours. Retrieved 2026-04-26 from https://www.law.cornell.edu/cfr/text/42/482.41
- `[s5]`: NCSBN, *2026 NCLEX-RN Test Plan*, effective April 1, 2026 – March 31, 2029, §Safety and Infection Prevention and Control / Emergency Response Plan — activity statements: "Determine which client(s) to recommend for discharge in a disaster situation", "Identify nursing roles in disaster planning", "Use clinical decision-making/critical thinking for emergency response plan", "Participate in emergency planning and response", "Participate in disaster planning activities/drills". Retrieved 2026-04-26 from https://www.ncsbn.org/publications/2026-nclex-rn-test-plan and https://www.nclex.com/files/2026_RN_Test%20Plan_English-F.pdf
- `[s6]`: NIH/NLM PMC, *Operating Room Fire Safety* (PMC3096161), §RACE acronym applicability and limitations (rescue / alarm / confine / extinguish), §PASS technique (pull pin / aim / squeeze / sweep), §explicit anti-pattern warning ("Patting a fire will only encourage the flames to spread"), §extinguishment limited to small/contained fires. Retrieved 2026-04-26 from https://pmc.ncbi.nlm.nih.gov/articles/PMC3096161/
