# Chain of Infection

**Topic:** 2 — Safety and Infection Prevention and Control &nbsp;|&nbsp; **Pattern:** Ordered &nbsp;|&nbsp; **Tags:** 2.9, IP-CJ
**Status:** draft (SME review pending)

The chain of infection is the canonical CDC framework that decomposes how an infectious disease propagates from source to host into six sequential links. Each link is independently interruptible — break any one and transmission stops — which is why infection-prevention teaching is organized around it. NCLEX-RN tests this under sub-objective 2.9 (Standard Precautions / Transmission-Based Precautions / Surgical Asepsis), most often as "which intervention breaks the chain at link X" item formats.

**Layout convention:** rows are the six links in the published CDC sequence (Pathogen → Reservoir → Portal of exit → Mode of transmission → Portal of entry → Susceptible host). Columns progress left → right from the link's definition through a concrete example to the nursing interventions that interrupt the chain at that link. Each `<br>`-separated item is one atomic Fact.

| # | Link | Definition | Example | Break-the-chain intervention |
|---|---|---|---|---|
| 1 | Pathogen | Infectious agent capable of causing disease [s1, s2] | Bacteria [s2]<br>Viruses [s2]<br>Fungi [s2]<br>Parasites [s2] | Administer antimicrobial therapy [s3]<br>Administer antiviral therapy [s3]<br>Administer antifungal therapy [s3]<br>Sterilize reusable instruments [s3]<br>Disinfect contaminated surfaces [s3] |
| 2 | Reservoir | Habitat in which the infectious agent normally resides [s1] | Humans [s1]<br>Animals [s1]<br>Soil [s1]<br>Water [s1]<br>Environmental surfaces [s2] | Disinfect environmental surfaces [s3]<br>Sterilize equipment [s3]<br>Treat infected hosts [s3]<br>Identify asymptomatic carriers [s1]<br>Control animal vectors [s1]<br>Manage water systems [s3] |
| 3 | Portal of exit | Path by which a pathogen leaves its host [s1] | Respiratory tract [s1]<br>Gastrointestinal tract [s1]<br>Genitourinary tract [s1]<br>Skin lesions [s1]<br>Blood [s1]<br>Conjunctival secretions [s1]<br>Placental crossing [s1] | Cover coughs with tissue [s3]<br>Cover sneezes with tissue [s3]<br>Apply source-control mask on infectious patient [s3]<br>Cover open wounds with dressings [s3]<br>Contain body fluids in closed systems [s3]<br>Dispose of contaminated linens in biohazard bags [s3] |
| 4 | Mode of transmission | How the pathogen travels from reservoir to a new host [s1, s2] | Direct contact [s1]<br>Droplet spread [s1]<br>Airborne particles [s2]<br>Vehicle-borne transmission [s1]<br>Vector-borne transmission [s1]<br>Fomite contact [s2] | Perform hand hygiene [s3, s4]<br>Apply Standard Precautions [s3]<br>Apply Transmission-Based Precautions [s3]<br>Disinfect shared equipment between patients [s3]<br>Treat water supplies [s1]<br>Control vector populations [s1]<br>Cohort patients with the same pathogen [s3] |
| 5 | Portal of entry | Opening through which the pathogen enters a susceptible host [s2] | Mouth [s2]<br>Eyes [s2]<br>Respiratory tract [s2]<br>Urinary tract [s2]<br>Surgical incisions [s2]<br>Open wounds [s2]<br>Non-intact skin [s2] | Maintain surgical asepsis during invasive procedures [s3]<br>Apply sterile dressings to wounds [s3]<br>Provide indwelling catheter care [s4]<br>Remove invasive lines as early as clinically possible [s4]<br>Wear PPE covering mucous membranes [s3]<br>Maintain skin integrity [s4] |
| 6 | Susceptible host | Person at risk for infection because host defenses are reduced [s2, s3] | Older adult patients [s3]<br>Patients with diabetes [s3]<br>Patients with cancer [s3]<br>Organ transplant recipients [s3]<br>Patients with indwelling urinary catheters [s3]<br>Patients with surgical incisions [s3] | Administer vaccinations [s1]<br>Optimize nutrition [s2]<br>Treat underlying comorbidities [s3]<br>Place immunocompromised patients on protective precautions [s3]<br>Promote adequate sleep [s2]<br>Reduce host stress [s2]<br>Remove invasive devices when no longer indicated [s4] |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. No parentheticals in cells.
- **Six-link vs other counts.** Some pedagogical sources teach a five-link or seven-link chain. The six-link sequence above matches the CDC Principles of Epidemiology framework `[s1]` and the CDC NIOSH healthcare-worker chain-of-infection module `[s2]`. NCLEX-RN aligns with the six-link CDC convention. Concept retains all six rows.
- **Pathogen vs Reservoir distinction.** The pathogen is the agent itself (the bacterium, virus, fungus, parasite). The reservoir is where it lives between hosts (a person, animal, soil, water, surface). A patient with active TB is both a host AND a human reservoir for *M. tuberculosis*; the pathogen is the organism, not the patient.
- **Portal of exit vs Portal of entry symmetry.** They are often the same anatomic site (respiratory → respiratory for influenza, fecal → oral for *C. difficile*) but not required to be (blood from a needlestick exits one host's blood and enters another host's broken skin). Tested via case-stem questions where the student must identify which link a given intervention targets.
- **Mode of transmission category list.** CDC distinguishes direct (contact, droplet) from indirect (airborne, vehicle, vector, fomite). This Concept lists each as a separate Fact in the Example cell to keep them independently testable. The deeper precautions taxonomy (Standard / Contact / Droplet / Airborne) lives in sibling Concept `isolation-precaution-types.md` (2.9).
- **Hand hygiene placement.** Hand hygiene appears in the Mode-of-transmission row's intervention cell because hand-mediated contact transfer is a transmission step, not a host-defense step. Sibling Concept `hand-hygiene-five-moments.md` (2.9) covers WHO 5-moments and method selection; this Concept stays at the chain-link level.
- **PPE placement.** Concept assigns PPE to Portal of entry (respirator/eye protection blocks entry into mucous membranes) and to Mode of transmission (gloves/gowns interrupt contact transfer). PPE donning/doffing sequence is sibling Concept `ppe-donning-doffing-sequence.md` (2.9).
- **Vaccination placement.** Vaccination is a Susceptible-host intervention because it modifies host immunity. Herd-immunity framing `[s1]` reinforces this — the protected majority shields the susceptible minority by reducing the chance the pathogen reaches a susceptible host.
- **Sterilization vs disinfection.** Sterilization (kills all microorganisms, including spores) belongs to Pathogen and reusable-instrument reservoirs. Disinfection (kills most pathogens but not all spores) belongs to environmental Reservoir. Distinction lives in sibling `surgical-vs-medical-asepsis.md` (2.9).
- **Synthesis-by-direct-derivation.** Several Break-the-chain intervention cells restate principles the source describes in narrative form into the active-voice nursing action a Test Plan §2.9 item would test (e.g., source `[s3]` describes "perform hand hygiene" as a CDC core practice → cell Fact: "Perform hand hygiene"). These are sourced cells with mechanical wording transformation.

### Tricky distractors

- **Reservoir vs Portal of exit.** A patient coughing TB into the air — the lungs are the reservoir; the respiratory tract is the portal of exit. Wrong-answer pattern: marking "lungs" as the portal of exit when the question asks for the link a surgical mask interrupts (mask is source control over the portal of exit, not the reservoir).
- **Mode of transmission vs Portal of entry.** Hand hygiene interrupts transmission (the journey); a surgical dressing protects the portal of entry (the destination). Wrong-answer pattern: choosing hand hygiene as a portal-of-entry intervention.
- **Vaccination as host vs pathogen intervention.** Vaccines do not kill the pathogen circulating in the environment — they make the host non-susceptible. The chain-link target is Susceptible host. Wrong-answer pattern: choosing Pathogen.
- **Removing a urinary catheter as which link?** Two correct answers depending on framing — the catheter is the Portal of entry (lumen → bladder), and removing it eliminates that portal. Some sources also frame it as reducing host susceptibility (the catheter is the host-side risk factor). NCLEX accepts the Portal-of-entry framing as primary.
- **Cohorting patients.** Cohorting (placing patients with the same pathogen in the same room) interrupts Mode of transmission, not Reservoir — the reservoirs (the patients) still exist; the intervention prevents pathogen movement to non-cohort hosts.

### Values without a direct public citation

| Cell | Value | Why unsourced |
|---|---|---|
| Reservoir × Break-the-chain intervention — "Identify asymptomatic carriers" | Carrier identification | `[s1]` describes asymptomatic, incubatory, convalescent, and chronic carrier types in the reservoir context, but does not state "identify carriers" as an intervention sentence; the action is mechanical entailment from the carrier-typology text. |
| Susceptible host × Break-the-chain intervention — "Promote adequate sleep" / "Reduce host stress" | Host resilience promotion | `[s2]` lists immune function and overall health as susceptibility factors; the specific framing of sleep promotion and stress reduction as host-resilience interventions is widely-taught nursing pedagogy without a single canonical CDC sentence. |
| Pathogen × Break-the-chain intervention — "Sterilize reusable instruments" | Sterilization placement under Pathogen | Sterilization could equally be filed under Reservoir (instruments as fomite reservoirs); placing it under Pathogen reflects the destruction-of-agent intent. Pedagogical placement, not a quoted CDC sentence. |

## Engine demo opportunities

- `2 | Link → ?` → Reservoir.
- `? | Link → Portal of exit` → 3.
- `4 | Definition → ?` → How the pathogen travels from reservoir to a new host.
- `6 | Example → ?` → Older adult patients / Patients with diabetes / Patients with cancer / Organ transplant recipients / Patients with indwelling urinary catheters / Patients with surgical incisions (multi-Fact cell, select-all).
- `? | Break-the-chain intervention → Administer vaccinations` → 6 (Susceptible host).
- `? | Break-the-chain intervention → Cover coughs and sneezes` → 3 (Portal of exit).
- `? | Break-the-chain intervention → Perform hand hygiene` → 4 (Mode of transmission).
- `? | Break-the-chain intervention → Maintain surgical asepsis during invasive procedures` → 5 (Portal of entry).
- Sequence (adjacency): `Link (n+1 where Link n | Link → Reservoir) | Link → ?` → Portal of exit.
- Composite Row profile: Mode of transmission across all Columns with one cell swapped to a Portal-of-entry Value as distractor (e.g., Break-the-chain cell replaced with "Maintain surgical asepsis during invasive procedures").

## Sources

- `[s1]`: CDC, *Principles of Epidemiology in Public Health Practice* (Self-Study Course SS1978), 3rd ed., Lesson 1 Section 10 "Chain of Infection." Authoritative CDC primary source defining the six-link framework, reservoir typology (human / animal / environmental), portal-of-exit/entry pairings, and direct vs indirect mode-of-transmission taxonomy. Retrieved 2026-04-26 from https://archive.cdc.gov/www_cdc_gov/csels/dsepd/ss1978/lesson1/section10.html
- `[s2]`: CDC NIOSH, *Safety Culture in Healthcare — Module 2: Chain of Infection Components.* Healthcare-worker-facing operational restatement of the chain links with examples (microorganism types, reservoir surfaces, portal-of-entry openings, susceptibility factors). Retrieved 2026-04-26 from https://www.cdc.gov/niosh/learning/safetyculturehc/module-2/3.html
- `[s3]`: CDC, *Infection Control Basics* and *Core Infection Prevention and Control Practices for Safe Healthcare Delivery in All Settings.* Source for break-the-chain interventions: hand hygiene, Standard Precautions, Transmission-Based Precautions, environmental cleaning, source-control masking, surgical asepsis, susceptible-population framing. Retrieved 2026-04-26 from https://www.cdc.gov/infection-control/about/index.html and https://www.cdc.gov/infection-control/hcp/core-practices/index.html
- `[s4]`: AHRQ, *Healthcare-Associated Infections Program* and *PSNet Healthcare-associated Infections primer.* Source for invasive-device removal, hand hygiene as cornerstone HAI-prevention practice, indwelling-catheter care, and the link between device days and host susceptibility in HAI prevention bundles. Retrieved 2026-04-26 from https://www.ahrq.gov/hai/index.html and https://psnet.ahrq.gov/primer/health-care-associated-infections
- `[s5]`: NCSBN, *2026 NCLEX-RN Test Plan*, effective April 1, 2026 – March 31, 2029, §2.9 Standard Precautions / Transmission-Based Precautions / Surgical Asepsis (Safety and Infection Prevention and Control). Establishes exam scope; not cited per cell because it sets the testable boundary rather than supplying content. Retrieved 2026-04-26 from https://www.ncsbn.org/publications/2026-nclex-rn-test-plan and https://www.nclex.com/files/2026_RN_Test%20Plan_English-F.pdf
