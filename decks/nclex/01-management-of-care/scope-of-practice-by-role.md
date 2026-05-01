# Scope of Practice by Role

**Topic:** 1 — Management of Care &nbsp;|&nbsp; **Pattern:** Dimensions &nbsp;|&nbsp; **Tags:** 1.3, IP-CJ
**Status:** draft (SME review pending)

Comparison of nursing-team roles by which core activities they may perform. NCLEX-RN sub-objective 1.3 (Assignment, Delegation and Supervision) tests the candidate's ability to match tasks to role competency. The framework is anchored in the NCSBN-ANA 2019 *National Guidelines for Nursing Delegation*: nursing judgment and critical decision making cannot be delegated, so activities that require initial clinical judgment (initial assessment, initial teaching, evaluation of unstable patients) stay with the RN. Specific task allowances for LPN/VN and AP roles are determined by each state/jurisdiction's Nurse Practice Act and the employing facility's policies; the values below reflect the predominant US pattern that NCLEX-RN items test. Where a value depends on state-NPA convention beyond what NCSBN enumerates, it is marked in the unsourced-values table.

**Layout convention:** rows are roles ordered RN (broadest scope) → LPN/VN → UAP/AP (narrowest direct-care scope) → Charge RN (RN with assignment authority) → Student nurse (scope bounded by instructor + facility agreement). Columns are five high-yield activity questions. Each cell answers the column question for that row. Each `<br>`-separated item is one atomic Fact.

| Role | Can assess? | Can teach? | Can administer PO meds? | Can administer IV push? | Can perform sterile procedure? |
|---|---|---|---|---|---|
| RN | Yes [s1]<br>Performs initial assessment [s1]<br>Performs ongoing assessment [s1] | Yes [s1]<br>Performs initial teaching [s1]<br>Evaluates teaching effectiveness [s1] | Yes [s1] | Yes [needs source] | Yes [s1] |
| LPN/VN | Yes with limits [s1]<br>Collects focused data [s1]<br>Cannot perform initial assessment [s1] | Yes with limits [s1]<br>Reinforces RN teaching [needs source]<br>Cannot perform initial teaching [s1] | Yes [needs source] | No [needs source] | Yes [needs source] |
| UAP/AP | No [s1]<br>Reports observations to the RN [s1]<br>Measures vital signs on stable patients [s1] | No [s1] | No [needs source] | No [s1] | No [needs source] |
| Charge RN | Yes [s1]<br>Assigns patients to nursing-team members [s1]<br>Supervises delegated activities [s1] | Yes [s1] | Yes [s1] | Yes [needs source] | Yes [s1] |
| Student nurse | Yes with limits [needs source]<br>Performs assessment under instructor supervision [needs source] | Yes with limits [needs source]<br>Teaches under instructor supervision [needs source] | Yes with limits [needs source]<br>Administers under instructor supervision [needs source] | Yes with limits [needs source]<br>Administers under instructor supervision [needs source] | Yes with limits [needs source]<br>Performs under instructor supervision [needs source] |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. No parentheticals in cells.
- **Cell values are tri-state.** `Yes`, `No`, and `Yes with limits` are the canonical cell values. When a role's answer is `Yes with limits`, the row carries an additional Fact line that names the limiting condition (e.g., `Reinforces RN teaching`, `Performs assessment under instructor supervision`). This keeps cells atomic while preserving the limit information the engine needs to distinguish full-scope from constrained-scope answers.
- **Canonical-name exemption: LPN/VN and UAP/AP.** These slashed forms are state-nomenclature variants of the same role: LPN (Licensed Practical Nurse, used in 49 states) and LVN/VN (Licensed Vocational Nurse, used in California and Texas) are the same license; UAP (Unlicensed Assistive Personnel — the 2026 NCLEX-RN Test Plan terminology `[s2]`) and AP (Assistive Personnel — the 2019 NGND terminology `[s1]`) refer to the same delegatee category. The slash is not a comma-list — both sides denote one role with the same scope. Treated as a single Row each, exempt from the comma-list atomization rule (same exemption that applies to NCSBN's "Right directions and communication" published heading).
- **Why initial assessment is RN-only.** NCSBN: "The licensed nurse cannot delegate nursing judgment or any activity that will involve nursing judgment or critical decision making" `[s1]`. Initial assessment requires synthesis of cues into a clinical picture — judgment by definition. Reassessment of a patient whose status has changed is also judgment-bearing. LPN/VN data collection (vital signs, focused symptom queries on a stable patient) is permitted in many state NPAs but is not "assessment" in the NCSBN sense — it is data collection that the RN then synthesizes.
- **Why initial teaching is RN-only.** Teaching that requires assessment of learning needs and evaluation of comprehension is a nursing-process activity (Assessment → Diagnosis → Plan → Implementation → Evaluation, with teaching as Implementation that depends on the prior steps). The LPN/VN may reinforce teaching the RN has initiated using the established teaching plan; this is widely-tested NCLEX-RN content but is state-NPA-driven rather than enumerated in NCSBN's NGND. AP do not teach.
- **Charge RN scope.** Charge RN is an RN with additional assignment-and-supervision authority for a unit/shift; the column answers do not change vs. RN. The distinguishing functions live in additional Facts in the assess/teach cells (assigning patients, supervising delegated activities). For task-by-task delegation rules see sibling Concept `delegable-vs-non-delegable-tasks.md`; for the decision frame the Charge RN applies see sibling `five-rights-of-delegation.md`.
- **Student nurse scope.** A pre-licensure student nurse acts under the dual authority of (a) the supervising clinical instructor and (b) the facility's student-nurse agreement, which together set the ceiling on what activities the student may perform. Beyond this principle, specifics vary by program, state board of nursing, and clinical site — every student-nurse cell carries `Yes with limits` plus the limit Fact `under instructor supervision`. Items the student has not yet been validated on remain off-scope even with supervision.
- **NCSBN does not enumerate task-by-role.** The 2019 NGND establishes the *framework* (judgment-bearing activities cannot be delegated, LPN/VN scope is as state allows, AP perform supportive roles in their basic-program tasks) but does not publish a "RN-can-do-IV-push, LPN-cannot" table. Concrete role-by-task rules come from each state's Nurse Practice Act, board of nursing rules, and facility policy. Cells whose values reflect the predominant US convention without a single canonical NCSBN/CMS/Joint Commission citation are listed below in the unsourced-values table.
- **Delegation vs assignment vs handoff.** NCSBN distinguishes (a) **delegation** — transferring a nursing activity *outside* the delegatee's traditional role and basic responsibilities, requiring extra competency validation `[s1]`; (b) **assignment** — routine activities *within* the delegatee's authorized scope `[s1]`; (c) **handoff** — transfer of patient-care responsibility between licensed providers, RN-to-RN or LPN-to-LPN, which is governed by handoff frames not delegation frames `[s1]`. The cell values in this table answer the assignment question (is this activity within the role's authorized scope?), not a delegation question.
- **Cross-Concept links.** Sibling `five-rights-of-delegation.md` (1.3) covers the per-decision checklist a nurse runs before transferring an activity. Sibling `delegable-vs-non-delegable-tasks.md` (1.3) covers the orthogonal axis — task-by-role rather than role-by-activity-class. Sibling `interdisciplinary-team-members.md` (1.6) covers non-nursing roles (RT, PT, SW, pharmacist) outside this Concept's nursing-team scope.

### Tricky distractors

- **Data collection (LPN/VN) vs assessment (RN).** Wrong-answer pattern: framing LPN/VN vital-signs collection as "assessment." LPN/VN collects data; the RN synthesizes that data into an assessment. NCLEX-RN items often test the discriminator by stating an LPN/VN "performed an assessment" — the candidate should recognize the term mismatch.
- **Reinforcing teaching (LPN/VN) vs initial teaching (RN).** Wrong-answer pattern: an item where the RN delegates "teaching the new diabetic about insulin" to the LPN/VN. Initial teaching cannot be delegated; reinforcement of an already-established teaching plan can. The discriminator is whether the teaching plan exists yet.
- **Stable vs unstable patient for AP-collected vital signs.** AP may measure and report vital signs on stable patients. Wrong-answer pattern: an item delegating vital signs on a post-op or actively-changing patient — the patient's instability vetoes delegation regardless of the AP's competency for the technical task. This is Right circumstance from the Five Rights.
- **Charge RN as a role vs a function.** Wrong-answer pattern: treating "Charge RN" as a higher license level. It is an RN performing additional assignment/supervision functions; the underlying scope of practice is identical to RN.
- **Student nurse "under supervision" is not unlimited.** Wrong-answer pattern: assuming a student nurse can perform any nursing activity simply because an instructor is present. The student's scope is bounded by what the program has validated the student on AND what the facility's student-nurse agreement permits — both filters apply.

### Values without a direct public citation

| Cell | Value | Why unsourced |
|---|---|---|
| RN × can administer IV push | Yes | Predominant US convention; not enumerated in NCSBN NGND or 2026 Test Plan §1.3. State-NPA-determined. |
| LPN/VN × can administer PO meds | Yes | Predominant US convention; permitted in most state NPAs. NCSBN does not enumerate. |
| LPN/VN × can administer IV push | No | Predominant US convention; many state NPAs prohibit LPN/VN IV push, though some allow with certification. NCSBN does not enumerate. |
| LPN/VN × can perform sterile procedure | Yes | Predominant US convention for routine sterile dressing changes and Foley insertion in stable patients; state NPAs vary. NCSBN does not enumerate. |
| LPN/VN × reinforces RN teaching | Yes with limits | NCLEX-RN pedagogy holds LPN/VN reinforces (not initiates) teaching; framing not directly enumerated in NCSBN NGND or Test Plan §1.3. |
| UAP/AP × can administer PO meds | No | NGND `[s1]` states medication administration is outside AP basic-program scope, but specific PO-medication exclusion is not enumerated; certified medication aides (CMAs) are an exception in some states (the NGND now includes them under AP — see definition `[s1]`). The cell answers the typical NCLEX-RN scenario where AP does not give medications. |
| UAP/AP × can perform sterile procedure | No | Sterile technique is not part of AP basic educational program per NGND framing `[s1]`, but explicit task exclusion is not enumerated. State-NPA and facility-policy-determined. |
| Charge RN × can administer IV push | Yes | Inherits RN scope; same gap as RN × can administer IV push. |
| Student nurse (all five cells) | Yes with limits — under instructor supervision | Student-nurse scope is set by the program, the state board of nursing, and the facility's student-nurse agreement. No single NCSBN canonical statement covers it; the "under instructor supervision" limit is universal pedagogical convention. |

## Engine demo opportunities

- `RN | can assess? → ?` → Yes / Performs initial assessment / Performs ongoing assessment (multi-Fact cell, select-all).
- `LPN/VN | can assess? → ?` → Yes with limits / Collects focused data / Cannot perform initial assessment (multi-Fact cell, select-all).
- `UAP/AP | can teach? → ?` → No.
- `? | can perform sterile procedure → No` → UAP/AP.
- `? | can administer IV push → Yes` → RN, Charge RN.
- Composite Row profile: LPN/VN across all five Columns, with one cell swapped to a UAP/AP Value as distractor (e.g., LPN/VN × can teach? changed to `No` — distractor lifted from UAP/AP row).
- Cross-Row scope: `? | can assess? → Yes` → RN, Charge RN (filters all rows whose Column 1 cell carries the unconstrained `Yes` value).

## Sources

- `[s1]`: NCSBN & ANA, *National Guidelines for Nursing Delegation*, Joint Statement, effective 2019-04-29 (replaces 2010 NCSBN-ANA Joint Statement on Delegation). Definitions section (p. 2: Assignment, Delegatee, Assistive Personnel) and delegation-principles section (p. 3: "The licensed nurse cannot delegate nursing judgment or any activity that will involve nursing judgment or critical decision making"). Retrieved 2026-04-26 from https://www.ncsbn.org/public-files/NGND-PosPaper_06.pdf
- `[s2]`: NCSBN, *2026 NCLEX-RN Test Plan*, effective April 1, 2026 – March 31, 2029, §1.3 Assignment, Delegation and Supervision (Management of Care, Safe and Effective Care Environment); UAP definition in NCLEX Terminology section. Retrieved 2026-04-26 from https://www.ncsbn.org/publications/2026-nclex-rn-test-plan and https://www.nclex.com/files/2026_RN_Test%20Plan_English-F.pdf
