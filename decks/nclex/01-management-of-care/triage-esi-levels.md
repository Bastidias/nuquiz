# Triage Levels (ESI 5-tier)

**Topic:** 1 — Management of Care &nbsp;|&nbsp; **Pattern:** Ordered &nbsp;|&nbsp; **Tags:** 1.10
**Status:** draft (SME review pending)

The Emergency Severity Index (ESI) is a five-level emergency department triage algorithm developed by Richard Wuerz and David Eitel, maintained and published by the Agency for Healthcare Research and Quality (AHRQ). The current version is ESI v4 (2012 *Implementation Handbook*). ESI sorts arriving ED patients first by acuity (Levels 1 and 2 — immediate or high-risk) and then, for stable patients, by predicted resource consumption (Levels 3–5: many, one, or none). NCLEX-RN tests ESI under sub-objective 1.10 (Establishing Priorities) as the canonical US ED triage scheme.

**Layout convention:** rows are the five ESI levels in published order from most to least acute (Level 1 → Level 5). Columns progress left → right from triage decision (Time to provider) through algorithm input (Resource use) to clinical illustration (Example presentation). Each `<br>`-separated item is one atomic Fact.

| # | Level | Time to provider | Resource use | Example presentation |
|---|---|---|---|---|
| 1 | Resuscitation | Immediate [s1] | Many resources typically required [s1] | Cardiac arrest [s1]<br>Intubated trauma patient [s1]<br>Apnea [s1]<br>Severe respiratory distress [s1]<br>Unresponsive [s1] |
| 2 | Emergent | Within 10 minutes [s1] | Many resources typically required [s1] | Chest pain suspicious for ACS [s1]<br>Stroke symptoms within treatment window [s1]<br>Active suicidal ideation [s1]<br>New confusion or lethargy [s1]<br>Severe pain rated 7 of 10 or higher [s1] |
| 3 | Urgent | As soon as possible [s1]<br>Within 30 minutes [needs source] | Two or more resources predicted [s1] | Abdominal pain with normal vital signs [s1]<br>Laceration requiring sutures and imaging [s1]<br>Fever in an immunocompetent adult [s1] |
| 4 | Less urgent | As soon as possible [s1]<br>Within 60 minutes [needs source] | One resource predicted [s1] | Simple laceration requiring sutures only [s1]<br>Urinary tract infection symptoms requiring urinalysis [s1] |
| 5 | Non-urgent | As soon as possible [s1]<br>Within 120 minutes [needs source] | No resources predicted [s1] | Medication refill request [s1]<br>Suture removal [s1]<br>Minor cold symptoms [s1] |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. No parentheticals in cells.
- **AHRQ ESI v4 is the canonical source.** The *ESI Implementation Handbook, 2012 Edition* is published by AHRQ (Publication No. 12-0014) and is the reference used by US EDs and tested on NCLEX-RN. Version 5 has been in development; until AHRQ publishes a successor, v4 is current.
- **What "resources" means in ESI.** AHRQ defines a resource as a hospital service, test, or procedure that requires staff time and is *outside* the basic ED exam — labs, ECG, imaging (X-ray, CT, MRI, US), IV fluids, IV/IM/nebulized medications, specialty consults, simple procedures (laceration repair, Foley placement), complex procedures (conscious sedation). PO meds, prescription refills, simple wound dressings, crutches, tetanus immunizations, and point-of-care testing are *not* resources. Counted as one resource regardless of how many of that type are ordered (e.g., CBC + BMP + LFTs = one "lab" resource).
- **Time to provider — what is and isn't AHRQ-published.** AHRQ ESI v4 explicitly specifies "immediate" for Level 1 and "within 10 minutes" for Level 2; for Levels 3–5 the v4 handbook says patients should be seen "as soon as possible" without specifying minute thresholds, because resource-based levels assume the patient is stable. The "within 30 / 60 / 120 minute" thresholds for Levels 3–5 are widely-taught nursing-pedagogy convention (often citing ENA triage practice) but are not directly AHRQ-published. They are kept as Facts in the cells with `[needs source]` markers and enumerated below — the SME pass should either trace these to a primary citation (ENA *Emergency Nursing Triage* manual, hospital triage protocols) or remove them.
- **ESI decision points (algorithm flow).** AHRQ ESI v4 uses four sequential decision points: (A) does the patient require immediate life-saving intervention? → Level 1; (B) is this a high-risk situation, or is the patient confused/lethargic/disoriented, or in severe pain/distress? → Level 2; (C) how many resources are predicted? → ≥2 → Level 3, 1 → Level 4, 0 → Level 5; (D) for Level 3 candidates, are vital signs in the danger zone for age? → consider upgrade to Level 2. The decision-point flow is process content; this Concept covers the resulting Levels.
- **High-risk situation (Level 2 trigger).** AHRQ ESI v4 lists examples that constitute high-risk: chest pain consistent with ACS, signs of stroke, sepsis criteria, active suicidal ideation, new neurologic findings, severe pain (≥7/10), immunocompromised host with fever. Used by triage nurse clinical judgment, not as a checklist.
- **Pediatric vital-sign danger zone.** AHRQ ESI v4 publishes age-specific HR/RR thresholds (e.g., HR >180 or RR >50 for infants) that move a Level 3 candidate to Level 2. Out of scope for this Concept (sibling pediatric vitals Concept will carry).
- **Cross-Concept links.** Sibling `prioritization-frameworks.md` (1.10) covers ABCs / Maslow / acute-vs-chronic / stable-vs-unstable as the broader prioritization toolkit; this Concept narrows to the ED-triage specific scheme. Sibling `abc-priority-application.md` (1.10) covers the airway-breathing-circulation primary survey, which sits *inside* an ESI Level 1/2 disposition.
- **ESI vs other triage schemes.** ESI is the dominant US ED scheme. Alternates exist — Canadian Triage and Acuity Scale (CTAS), Manchester Triage System (MTS), Australasian Triage Scale (ATS) — and use similar 5-tier structures with different acuity criteria and time targets. NCLEX tests ESI; sibling triage schemes are out of scope here.

### Tricky distractors

- **Level 1 vs Level 2.** Level 1 requires *immediate* life-saving intervention (intubation, defibrillation, vasopressors). Level 2 is high-risk or severe distress but does not require an intervention in the next minute. Wrong-answer pattern: classifying acute MI with stable vitals as Level 1 — ACS without immediate hemodynamic collapse is Level 2.
- **Level 2 by pain alone.** Severe pain rated ≥7/10 *can* drive a Level 2 assignment, but the AHRQ algorithm allows triage-nurse discretion — not every 7/10 pain is Level 2. Wrong-answer pattern: treating "pain ≥7/10" as a hard rule.
- **Level 3 vs Level 4 hinges on resource count, not severity.** A patient with abdominal pain expected to need labs, CT, and IV fluids (≥2 resources) is Level 3 even if they look comfortable. A patient with a simple laceration needing only sutures (1 resource) is Level 4 even if visibly distressed. Wrong-answer pattern: assigning Level by appearance instead of predicted resources.
- **Level 5 ≠ "fast track."** Fast-track is a disposition decision, not an ESI level. Level 5 patients typically need no ED resources; they may be redirected, but the level itself is an acuity classification.
- **ESI levels are not staff-to-patient ratios or wait-time guarantees.** ESI predicts acuity and resource need; actual wait time depends on department capacity. Wrong-answer pattern: "Level 3 means 30-minute wait" stated as a contractual time rather than a target.

### Values without a direct public citation

| Cell | Value | Why unsourced |
|---|---|---|
| Level 3 × Time to provider | Within 30 minutes | AHRQ ESI v4 specifies "as soon as possible" for Levels 3–5; the 30-minute threshold is widely-taught nursing pedagogy / ENA triage practice convention, not directly AHRQ-published. Trace to ENA *Emergency Nursing Triage* manual or remove during SME pass. |
| Level 4 × Time to provider | Within 60 minutes | Same as above — pedagogical convention, not AHRQ-published. |
| Level 5 × Time to provider | Within 120 minutes | Same as above — pedagogical convention, not AHRQ-published. |

## Engine demo opportunities

- `1 | Time to provider → ?` → Immediate.
- `? | Time to provider → Within 10 minutes` → 2.
- `3 | Resource use → ?` → Two or more resources predicted.
- `? | Resource use → One resource predicted` → 4.
- `5 | Example presentation → ?` → Medication refill request / Suture removal / Minor cold symptoms (multi-Fact cell, select-all).
- `? | Example presentation → Cardiac arrest` → 1.
- Sequence (adjacency): `Level (n+1 where Level n | Level → Resuscitation) | Level → ?` → Emergent.
- Composite Row profile: Level 2 across all Columns, with Resource use cell swapped to a Level 5 Value as distractor.

## Sources

- `[s1]`: Gilboy N, Tanabe P, Travers D, Rosenau AM. *Emergency Severity Index (ESI): A Triage Tool for Emergency Department Care, Version 4. Implementation Handbook, 2012 Edition.* AHRQ Publication No. 12-0014. Rockville, MD: Agency for Healthcare Research and Quality; November 2011. Chapters 2 (algorithm), 3 (Levels 1 and 2 acuity), 4 (Levels 3–5 resource prediction), and Appendix A (ESI examples). Retrieved 2026-04-26 from https://www.ahrq.gov/patient-safety/settings/emergency-dept/esi.html
- `[s2]`: NCSBN, *2026 NCLEX-RN Test Plan*, effective April 1, 2026 – March 31, 2029, §1.10 Establishing Priorities (Management of Care, Safe and Effective Care Environment). Retrieved 2026-04-26 from https://www.ncsbn.org/publications/2026-nclex-rn-test-plan and https://www.nclex.com/files/2026_RN_Test%20Plan_English-F.pdf
- `[s3]`: Emergency Nurses Association. *Emergency Nursing Triage* educational resources and position statements. Cited at registry level for ED-triage practice context; not used per-cell in this Concept. Retrieved 2026-04-26 from https://www.ena.org
