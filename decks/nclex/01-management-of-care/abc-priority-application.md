# ABC Priority Application

**Topic:** 1 — Management of Care &nbsp;|&nbsp; **Pattern:** Ordered &nbsp;|&nbsp; **Tags:** 1.10, IP-CJ
**Status:** draft (SME review pending)

The ABCDE primary survey is the canonical sequence the nurse uses to identify and treat life threats in any clinical emergency. Each letter names a physiologic system that, if compromised, kills the patient on a faster timeline than the next letter — so each step must be assessed and corrected before moving to the next. NCLEX-RN tests this under sub-objective 1.10 (Establishing Priorities) as the dominant prioritization framework for emergent or unstable clients.

**Layout convention:** rows are the five primary-survey steps in the published ABCDE order. Columns progress left → right from the rationale for the step's position (Why first) through the rapid bedside check (Quick assessment) to the emergency action when that system is compromised (Intervention if compromised). Each `<br>`-separated item is one atomic Fact.

| # | Step | Why first | Quick assessment | Intervention if compromised |
|---|---|---|---|---|
| 1 | Airway | Airway obstruction is a leading cause of preventable trauma death [s3]<br>Without a patent airway, oxygen cannot reach the lungs [s1] | Ask the patient to speak [s1, s3]<br>Listen for stridor [s1]<br>Listen for snoring [s1]<br>Look for paradoxical chest wall motion [s1] | Head-tilt chin-lift [s1]<br>Jaw thrust if cervical spine injury suspected [s3]<br>Suction blood or vomit [s1]<br>Insert oropharyngeal or nasopharyngeal airway [s1]<br>Endotracheal intubation [s1, s3]<br>Cricothyroidotomy if intubation fails [s3] |
| 2 | Breathing | Respiratory failure is among the top causes of trauma mortality [s3]<br>Tension pneumothorax is rapidly fatal [s3]<br>An open airway does not guarantee adequate ventilation [s1] | Count respiratory rate [s1]<br>Inspect chest wall symmetry [s1, s3]<br>Auscultate lung fields [s1, s3]<br>Check pulse oximetry [s1]<br>Inspect for tracheal deviation [s3]<br>Inspect for accessory muscle use [s1] | Apply high-flow oxygen [s1]<br>Bag-mask ventilation [s1, s2]<br>Needle decompression for tension pneumothorax [s1, s3]<br>Three-sided occlusive dressing for open chest wound [s3]<br>Positive-pressure ventilation for flail chest [s3] |
| 3 | Circulation | Hemorrhage is the most common cause of shock in trauma [s3]<br>Cardiac arrest produces death within minutes without restored circulation [s2]<br>Tissue oxygenation requires perfusion in addition to ventilation [s1] | Palpate pulse rate [s1]<br>Assess capillary refill [s1, s3]<br>Inspect skin color [s1, s3]<br>Measure blood pressure [s1, s2]<br>Attach ECG monitor [s2]<br>Inspect for visible hemorrhage [s3] | Direct pressure on visible bleeding [s1, s3]<br>Tourniquet for extremity hemorrhage [s3]<br>Establish IV access [s1, s2]<br>Infuse isotonic crystalloid [s1, s3]<br>Transfuse blood products [s3]<br>Defibrillate shockable rhythm [s2]<br>Initiate chest compressions for pulselessness [s2] |
| 4 | Disability | Decreased level of consciousness signals potential airway compromise [s3]<br>Hypoglycemia and stroke require time-critical reversal [s1]<br>Neurologic deterioration guides definitive airway decisions [s3] | Apply AVPU scale [s1]<br>Calculate Glasgow Coma Scale [s1, s3]<br>Check pupil size and reactivity [s1, s3]<br>Inspect limb movement for lateralizing signs [s1, s3]<br>Measure blood glucose [s1] | Place in recovery position [s1]<br>Establish definitive airway if GCS is 8 or less [s3]<br>Administer dextrose for hypoglycemia [s1]<br>Summon airway-qualified personnel [s1] |
| 5 | Exposure | Hidden injuries cannot be treated until visualized [s3]<br>Hypothermia worsens coagulopathy in trauma [s3]<br>Skin findings reveal etiology of undifferentiated illness [s1] | Remove all clothing [s1, s3]<br>Inspect entire body surface [s1, s3]<br>Measure core temperature [s1]<br>Inspect for rashes [s1]<br>Inspect for needle marks [s1]<br>Inspect for trauma not previously seen [s3] | Cover with warm blankets after inspection [s3]<br>Use warmed IV fluids [s3]<br>Treat identified cause [s1]<br>Maintain dignity by exposing only what is being inspected [s1] |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. No parentheticals in cells.
- **ABCDE vs ABC.** Some nursing-pedagogy sources teach a 3-step ABC mnemonic. The canonical primary survey published by AHA, ATLS, and the peer-reviewed ABCDE literature is five steps; Disability and Exposure are part of the primary survey, not a separate "secondary survey." NCLEX-RN tests the full ABCDE sequence for emergencies and trauma. The Concept retains all five Rows.
- **Continuous reassessment.** The ABCDE source explicitly directs the clinician to "assess and treat continuously and simultaneously" — if a downstream step reveals a problem the upstream step missed (e.g., decreased consciousness from hypoxia), return to the earliest compromised step before proceeding. This is a cross-Row authoring note, not a per-Row Fact, and is why the Pattern is Ordered with reassessment behavior rather than strict-once-only progression.
- **Cervical-spine immobilization** rides with Airway in the trauma context (jaw thrust over head-tilt to avoid neck flexion) but is itself a Circulation/Disability concern in spinal injury. Captured as the jaw-thrust Fact in Airway interventions; spinal-cord injury detail is out of scope here and lives in `spinal-cord-injury-syndromes` (T8) once authored.
- **AVPU vs GCS.** AVPU is the rapid-screen tool for the Disability step ("A" alert ≈ GCS 14–15; "V" verbal ≈ GCS 11–13; "P" pain ≈ GCS 6–10; "U" unresponsive ≈ GCS 3–5). GCS is the formal score. Both are listed as Quick assessment Facts in Row 4; the AVPU/GCS correspondence is exam-relevant and lives in the tricky-distractors subsection below rather than as a per-cell Fact.
- **Question-form synthesis.** Quick-assessment cells are direct restatements of the source's described maneuvers (e.g., source: "evaluate capillary refill time" → Fact: "Assess capillary refill"). These are sourced cells with mechanical wording transformation, not pedagogical inference.
- **Why-first synthesis.** The "Why first" column states the rationale each source gives (explicitly or by direct entailment) for that step's position in the sequence. Cited where the source states the rationale outright (e.g., `[s3]` "Hemorrhage is the most common cause of shock in trauma"). Where a rationale is the standard pedagogical framing without a single canonical sentence in the sourced text, it lands in the unsourced-values table below.
- **AHA ACLS provider manuals are paywalled.** Citations to AHA `[s2]` use the open-access Circulation journal "Part 3: Adult Basic and Advanced Life Support" (2020 Guidelines), which is the canonical scientific source the provider manuals are derived from.
- **Cross-Concept links.** Sibling `prioritization-frameworks.md` (1.10) is the meta-Concept of WHICH framework to use (ABCs vs Maslow vs acute-vs-chronic vs stable-vs-unstable). This Concept stays focused on the ABCDE sequence itself. Sibling `triage-esi-levels.md` (1.10) covers ED triage acuity assignment, which uses ABCDE findings as inputs.

### Tricky distractors

- **Airway vs Breathing.** A patient who is talking has a patent airway by definition — but adequate phonation does not prove adequate ventilation. Wrong-answer pattern: marking Airway compromised because the patient is breathing rapidly. The rapid breathing is a Breathing finding; the airway is open as long as voice is clear.
- **Circulation in cardiac-arrest sequence (CAB) vs ABCDE in non-arrest emergencies.** AHA's 2010-and-later BLS sequence for unresponsive pulseless adult is C-A-B (compressions before airway). ABCDE applies to the responsive or post-arrest patient and to trauma. Wrong-answer pattern: starting compressions on a patient with a pulse, or delaying compressions in confirmed arrest to perform airway maneuvers.
- **AVPU "P" vs "U".** A patient who responds to pain (P) still has some neurologic function; an unresponsive (U) patient has none. Both have decreased gag reflex and may need airway protection. Wrong-answer pattern: treating "P" as fully unresponsive, or treating "U" as needing only observation.
- **Disability before Exposure.** Some learners reverse D and E. The neurologic check happens before full undressing because GCS ≤ 8 changes airway management; exposure is for inspecting injuries not yet visible.
- **Exposure does not mean leaving the patient cold.** The intervention is "remove clothing then re-cover with warm blankets." Wrong-answer pattern: choosing to leave the patient exposed for ongoing assessment.

### Values without a direct public citation

| Cell | Value | Why unsourced |
|---|---|---|
| Disability × Why first | Hypoglycemia and stroke require time-critical reversal | The PMC ABCDE source `[s1]` lists glucose check as part of D and recovery position / glucose as the intervention; the rationale phrased as "time-critical reversal" is standard nursing-pedagogy framing without a single canonical sentence in the cited text. Mechanical entailment from the cited intervention. |
| Exposure × Why first | Skin findings reveal etiology of undifferentiated illness | `[s1]` lists rashes / needle marks as exposure findings; the rationale that skin findings reveal underlying etiology is pedagogical framing of why those findings matter, not a quoted sentence in the source. |

## Engine demo opportunities

- `2 | Step → ?` → Breathing.
- `? | Step → Disability` → 4.
- `3 | Quick assessment → ?` → Palpate pulse rate / Assess capillary refill / Inspect skin color / Measure blood pressure / Attach ECG monitor / Inspect for visible hemorrhage (multi-Fact cell, select-all).
- `5 | Intervention if compromised → ?` → Cover with warm blankets after inspection / Use warmed IV fluids / Treat identified cause / Maintain dignity by exposing only what is being inspected (multi-Fact cell, select-all).
- `? | Quick assessment → Apply AVPU scale` → 4 (Disability).
- `? | Intervention if compromised → Defibrillate shockable rhythm` → 3 (Circulation).
- Sequence (adjacency): `Step (n+1 where Step n | Step → Airway) | Step → ?` → Breathing.
- Composite Row profile: Disability across all Columns with one cell swapped to a Circulation Value as distractor (e.g., Quick-assessment cell replaced with "Palpate pulse rate").

## Sources

- `[s1]`: Thim T, Krarup NHV, Grove EL, Rohde CV, Løfgren B. *Initial assessment and treatment with the Airway, Breathing, Circulation, Disability, Exposure (ABCDE) approach.* Int J Gen Med. 2012;5:117–121. Open-access peer-reviewed primary description of the ABCDE approach. Retrieved 2026-04-26 from https://pmc.ncbi.nlm.nih.gov/articles/PMC3273374/
- `[s2]`: Panchal AR, Bartos JA, Cabañas JG, et al. *Part 3: Adult Basic and Advanced Life Support: 2020 American Heart Association Guidelines for Cardiopulmonary Resuscitation and Emergency Cardiovascular Care.* Circulation. 2020;142(suppl 2):S366–S468. Primary-assessment ABCDE section, team-based resuscitation systematic approach. Retrieved 2026-04-26 from https://www.ahajournals.org/doi/10.1161/CIR.0000000000000916
- `[s3]`: Galvagno SM, Nahmias JT, Young DA. *Trauma Primary Survey.* StatPearls (NCBI Bookshelf). Open-access peer-reviewed reference for the ATLS-style ABCDE trauma primary survey, hosted by NIH/NLM. Retrieved 2026-04-26 from https://www.ncbi.nlm.nih.gov/books/NBK430800/
- `[s4]`: NCSBN, *2026 NCLEX-RN Test Plan*, effective April 1, 2026 – March 31, 2029, §1.10 Establishing Priorities (Management of Care, Safe and Effective Care Environment). Retrieved 2026-04-26 from https://www.ncsbn.org/publications/2026-nclex-rn-test-plan and https://www.nclex.com/files/2026_RN_Test%20Plan_English-F.pdf
