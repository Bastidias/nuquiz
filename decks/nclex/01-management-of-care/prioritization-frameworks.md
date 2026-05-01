# Prioritization Frameworks

**Topic:** 1 — Management of Care &nbsp;|&nbsp; **Pattern:** Dimensions &nbsp;|&nbsp; **Tags:** 1.10, IP-CJ
**Status:** draft (SME review pending)

The meta-Concept for sub-objective 1.10 (Establishing Priorities). Rows are the six prioritization frameworks an NCLEX-RN candidate is expected to apply when picking which client, problem, or task to address first. Columns are shared attributes — what each framework prioritizes, when the nurse picks that framework over the others, and the typical exam cue that signals which framework the question is testing. This Concept stays meta — the procedural detail of any one framework lives in its own Concept (e.g., the ABCDE primary survey is captured in `abc-priority-application.md`; ED triage acuity in `triage-esi-levels.md`).

| Framework | what's prioritized | when used | typical exam cue |
|---|---|---|---|
| ABCs | Airway before Breathing before Circulation [s1, s5]<br>Life-sustaining physiologic functions [s2] | Suspected or actual life threat [s2]<br>Emergency or unstable client [s2]<br>Multiple clients with at least one in acute distress [s2] | Stem names a client with airway, breathing, or circulation compromise [s2]<br>Stem describes respiratory distress, chest pain, or signs of inadequate perfusion [s2]<br>Question asks which client to assess first in an emergency [s2] |
| Maslow's hierarchy | Physiological needs before safety needs [s2, s3]<br>Lower pyramid levels before higher levels [s3]<br>Safety and security before love, esteem, self-actualization [s2, s3] | Multiple competing needs across different need categories [s2]<br>No single client is in immediate life threat [s2]<br>Distinguishing physiologic from psychosocial priority [s3] | Stem offers options that span physiologic, safety, and psychosocial domains [s2]<br>Stem pairs a physiologic complaint with an emotional or social request [s2]<br>Question asks which need to address first across categories [s2] |
| Acute vs chronic | Acute conditions before chronic conditions [s2, s4]<br>Sudden-onset uncompensated problems before stable long-standing problems [s2, s4] | Comparing similar symptoms across clients with different disease trajectories [s2]<br>Triaging assessments across an assignment [s2]<br>Distinguishing new findings from baseline [s2] | Stem contrasts a sudden-onset complaint with a long-standing one [s2]<br>Stem labels one finding new or worsening and another stable or chronic [s2]<br>Question asks which client to see first when both report the same symptom [s2] |
| Stable vs unstable | Unstable clients before stable clients [s2, s6]<br>Clients with changing vital signs before clients with predictable status [s6]<br>Unpredictable responses before predictable outcomes [s6] | Assigning or delegating across multiple clients [s6]<br>Deciding which client the RN keeps versus delegates to LPN or AP [s6]<br>Recognizing early deterioration on a general unit [s7] | Stem labels one client stable and another unstable [s6]<br>Stem describes new abnormal vital signs or change from baseline [s7]<br>Question asks which task to delegate or which client to reassign [s6] |
| Actual vs potential | Actual problems before potential problems by default [s4, s8]<br>Risk problems first when vulnerability and consequence are high [s4, s8]<br>Existing signs and symptoms before risk factors alone [s4] | Comparing nursing diagnoses during care planning [s4, s8]<br>Weighing a current problem against a high-consequence at-risk problem [s4, s8]<br>Choosing among NANDA-I diagnoses for a single client [s4, s8] | Stem lists nursing diagnoses with at least one labeled risk for [s4, s8]<br>Stem pairs an existing problem with a high-consequence at-risk problem [s4, s8]<br>Question asks which nursing diagnosis is priority [s4, s8] |
| Safety / risk-of-harm | Conditions placing the client at significant safety risk [s2]<br>Imminent injury risk before non-urgent care [s2]<br>Safety needs before higher Maslow tiers when no life threat is present [s2, s3] | Fall, suicide, elopement, or seclusion risk in scope [s2]<br>Environmental hazard or unsafe assignment in scope [s2]<br>Risk of injury supersedes a competing actual problem [s2, s4] | Stem describes a client who is confused, sedated, suicidal, or attempting to ambulate unassisted [s2]<br>Stem describes an unsafe environment or unsafe staffing [s2]<br>Question asks which action prevents harm first [s2] |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. No parentheticals in cells.
- **Row-label "vs" exemption.** Four Row labels read as paired-framework names (`Acute vs chronic`, `Stable vs unstable`, `Actual vs potential`, plus the ABCs ordered triple). These are canonical names used in nursing pedagogy and the cited prioritization sources [s2, s4]; splitting them into separate Rows would invent four Concepts that don't exist as standalone frameworks. The canonical-name exemption in `knowledge-map.md` § Atomicity covers this case ("Names and identifiers are exempt"). The `vs` is the framework name, not a within-cell compound.
- **Slash exemption for Safety / risk-of-harm.** The Row label uses `/` to indicate that "safety" and "risk-of-harm" are synonyms for the same framework as taught across nursing prioritization references [s2]. Same canonical-name exemption.
- **Meta-Concept relationship.** This Concept is the meta-framework that tells the candidate WHICH framework to apply. The procedural detail of each framework lives in its own Concept:
  - ABCDE sequence and per-step interventions: `abc-priority-application.md` (T1, 1.10).
  - ED triage acuity assignment: `triage-esi-levels.md` (T1, 1.10) once authored.
  - Delegation by stability: `delegable-vs-non-delegable-tasks.md` (T1, 1.3) and `scope-of-practice-by-role.md` (T1, 1.3) carry the operational detail of stable / unstable in delegation decisions.
  - Maslow physiologic-need detail and CURE hierarchy: covered in StatPearls / NCBI Nursing Management chapter 2 [s2] referenced here at the meta level only.
- **CURE hierarchy intentionally not added as a Row.** The CURE acronym (Critical, Urgent, Routine, Extras) is taught alongside Maslow in [s2] but is not in the README §1.10 spec for this Concept. Authoring it as an unproposed seventh Row would extend scope. Flagged for SME — if added later, it is a Dimensions Row (not a separate Concept) since it is a categorization scheme, not a sequence.
- **Ordering ambiguity between frameworks.** NCLEX questions are answerable because exactly one framework dominates per stem; in practice frameworks layer (an unstable client with a head injury is unstable AND ABC-relevant). The exam cue column is the discriminator — the stem's wording signals which framework the item-writer is testing. This is itself a nursing-pedagogy convention; flagged as the rationale for the `typical exam cue` column existing.
- **Synthesis-by-direct-derivation.** The `typical exam cue` cells restate the trigger conditions from [s2] and [s4] in the form a question stem would surface them (e.g., source: "compare acute and chronic conditions" → cue: "Stem contrasts a sudden-onset complaint with a long-standing one"). Sourced cells with mechanical wording transformation, not pedagogical inference.

### Tricky distractors

- **ABCs vs Maslow.** ABCs is a special case of Maslow's physiological-needs tier — when a life threat is present, ABCs supersedes everything else, even safety. When no life threat is present, Maslow governs. Wrong-answer pattern: applying Maslow to a client with airway compromise instead of going straight to ABCs.
- **Actual vs potential vs safety.** Default is actual before potential. The exception is when a potential problem carries severe-injury consequences (e.g., fall risk in a client who is confused and ambulating); then the at-risk problem can supersede a less-acute actual problem. Wrong-answer pattern: rigidly choosing actual over a high-consequence risk diagnosis when the safety/risk-of-harm framework should override.
- **Stable vs unstable in delegation.** Stable client + routine task → AP can perform; unstable client + same task → RN keeps it [s6]. Wrong-answer pattern: assigning vitals on an unstable post-op client to AP because vitals are usually delegable.
- **Acute vs chronic in pain.** Acute pain in a chronic-pain client is still acute — sudden new pain in a client with chronic osteoarthritis is treated as acute (could be MI, fracture, perforation). Wrong-answer pattern: dismissing new severe pain as "chronic pain baseline."
- **Unexpected vs expected findings.** Expected findings that match the diagnosis trajectory (fever in pneumonia) get less priority than unexpected findings inconsistent with the trajectory (fever in a fracture client) [s2]. Often layered onto the stable/unstable framework on the exam.

### Values without a direct public citation

| Cell | Value | Why unsourced |
|---|---|---|
| (none) | — | All cell values trace to [s1]–[s8]. |

## Engine demo opportunities

- `ABCs | what's prioritized → ?` → Airway before Breathing before Circulation / Life-sustaining physiologic functions (multi-Fact cell).
- `? | what's prioritized → Physiological needs before safety needs` → Maslow's hierarchy.
- `Stable vs unstable | when used → ?` → Assigning or delegating across multiple clients / Deciding which client the RN keeps versus delegates to LPN or AP / Recognizing early deterioration on a general unit (multi-Fact cell, select-all).
- `? | typical exam cue → Stem labels one client stable and another unstable` → Stable vs unstable.
- `Actual vs potential | what's prioritized → ?` → Actual problems before potential problems by default / Risk problems first when vulnerability and consequence are high / Existing signs and symptoms before risk factors alone.
- `? | when used → Suspected or actual life threat` → ABCs.
- Composite Row profile: Maslow's hierarchy across all Columns with `when used` swapped to an ABCs Value (e.g., "Suspected or actual life threat") — tests the framework-discrimination skill the Concept exists to drill.

## Sources

- `[s1]`: NCSBN, *2026 NCLEX-RN Test Plan*, effective April 1, 2026 – March 31, 2029, §1.10 Establishing Priorities (Management of Care, Safe and Effective Care Environment). Retrieved 2026-04-26 from https://www.ncsbn.org/publications/2026-nclex-rn-test-plan and https://www.nclex.com/files/2026_RN_Test%20Plan_English-F.pdf
- `[s2]`: Ernstmeyer K, Christman E, eds. *Nursing Management and Professional Concepts*, "Prioritization" chapter. Open Resources for Nursing / NCBI Bookshelf NBK610461. Open-access peer-reviewed nursing reference. Retrieved 2026-04-26 from https://www.ncbi.nlm.nih.gov/books/NBK610461/
- `[s3]`: Toney-Butler TJ, Thayer JM. *Nursing Process.* StatPearls (NCBI Bookshelf NBK499937). Open-access. Maslow application to nursing planning and prioritization. Retrieved 2026-04-26 from https://www.ncbi.nlm.nih.gov/books/NBK499937/
- `[s4]`: Ernstmeyer K, Christman E, eds. *Nursing Fundamentals*, "Nursing Process" chapter (NBK591807). Open Resources for Nursing / NCBI Bookshelf. Care-planning prioritization including actual versus risk diagnoses. Retrieved 2026-04-26 from https://www.ncbi.nlm.nih.gov/books/NBK591807/
- `[s5]`: Thim T, Krarup NHV, Grove EL, Rohde CV, Løfgren B. *Initial assessment and treatment with the Airway, Breathing, Circulation, Disability, Exposure (ABCDE) approach.* Int J Gen Med. 2012;5:117–121. Open-access peer-reviewed primary description of the ABCDE approach. Retrieved 2026-04-26 from https://pmc.ncbi.nlm.nih.gov/articles/PMC3273374/
- `[s6]`: Ernstmeyer K, Christman E, eds. *Nursing Management and Professional Concepts*, "Delegation and Supervision" chapter (NBK598382). Open Resources for Nursing / NCBI Bookshelf. Right Circumstance and stable-versus-unstable delegation criteria. Retrieved 2026-04-26 from https://www.ncbi.nlm.nih.gov/books/NBK598382/
- `[s7]`: Mok WQ, Wang W, Liaw SY. *Indicators of clinical deterioration in adult general ward patients from nurses' perspectives: a mixed-methods systematic review.* PMC. Open-access peer-reviewed evidence on stability change as an early-warning trigger for nurse-led prioritization. Retrieved 2026-04-26 from https://pmc.ncbi.nlm.nih.gov/articles/PMC11600595/
- `[s8]`: Herdman TH, Kamitsuru S, Lopes CT, eds. *NANDA International Nursing Diagnoses: Definitions and Classification* — risk diagnosis definition as represented in NCBI Bookshelf NBK591814 (Sample NANDA-I Diagnoses). Open-access bookshelf rendering. Retrieved 2026-04-26 from https://www.ncbi.nlm.nih.gov/books/NBK591814/
