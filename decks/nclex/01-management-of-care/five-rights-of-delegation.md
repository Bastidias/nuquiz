# Five Rights of Delegation

**Topic:** 1 — Management of Care &nbsp;|&nbsp; **Pattern:** Ordered &nbsp;|&nbsp; **Tags:** 1.3
**Status:** draft (SME review pending)

The NCSBN/ANA-published five-step checklist a licensed nurse runs through before transferring a nursing activity to a delegatee. Codified in the 2019 NCSBN-ANA Joint Statement *National Guidelines for Nursing Delegation*, which replaced the 2010 Joint Statement on Delegation. NCLEX-RN tests this primarily under sub-objective 1.3 (Assignment, Delegation and Supervision); the Five Rights are the canonical decision frame for delegation items on the exam.

**Layout convention:** rows are the five Rights in NCSBN-published order. Columns progress left → right from terse identifier (Name) through the decision question the nurse asks at that step (Question the nurse asks) to the consequence of skipping that step (Failure mode if skipped). Each `<br>`-separated item is one atomic Fact.

| # | Name | Question the nurse asks | Failure mode if skipped |
|---|---|---|---|
| 1 | Right task | Is the activity within the delegatee's job description? [s1]<br>Is the activity in the facility's written policies and procedures? [s1] | Task exceeds delegatee's authorized scope [s1]<br>Task lacks facility competency training [s1] |
| 2 | Right circumstance | Is the patient's condition stable? [s1] | Delegating care of an unstable patient [s1]<br>Delegation continues after patient deteriorates [s1] |
| 3 | Right person | Does the delegatee have the skills to perform the activity? [s1]<br>Does the delegatee have the knowledge to perform the activity? [s1] | Delegatee lacks validated competency [s1]<br>Delegatee not trained for the activity [s1] |
| 4 | Right directions and communication | Were specific instructions given? [s1]<br>Was the data to be collected specified? [s1]<br>Was the method for collecting the data specified? [s1]<br>Was the time frame for reporting results specified? [s1]<br>Did the delegatee accept the delegated activity? [s1] | Delegatee acts on assumed instructions [s1]<br>Delegatee modifies the activity without consulting the nurse [s1]<br>Two-way communication absent [s1] |
| 5 | Right supervision and evaluation | Did the nurse monitor the delegated activity? [s1]<br>Did the nurse follow up after completion? [s1]<br>Were patient outcomes evaluated? [s1] | Nurse unavailable to intervene [s1]<br>Activity completed but outcome not evaluated [s1]<br>Documentation of the activity is missing [s1] |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. No parentheticals in cells.
- **Row names retain "and" / slash forms** because NCSBN publishes them that way. "Right directions and communication" and "Right supervision and evaluation" are NCSBN's exact 2019 NGND headings; they are canonical names, exempt from the "no compound" atomization rule (same exemption that applies to NIST SP 800-34's "Plan testing, training, and exercises" in the CISSP corpus). The Topic 1 README short-form `Right direction/communication` collapses NCSBN's "directions and communication" into a slash; the source-faithful form used here is the published one.
- **Question phrasing.** The "Question the nurse asks" cells are direct restatements of the NCSBN-defined scope of each Right (e.g., NCSBN states "The health condition of the patient must be stable" → the nurse-facing question becomes "Is the patient's condition stable?"). The principle is sourced; the question form is authoring synthesis directly entailed by the source. Cited to `[s1]` because the substantive content is the NCSBN definition; the wording is decision-frame restatement.
- **Failure mode framing.** Failure modes are derived from the NCSBN source text by inversion of each Right's positive definition (e.g., NCSBN: "The licensed nurse should be ready and available to intervene as necessary" → failure: "Nurse unavailable to intervene"). The source explicitly defines the scope of each Right; absence of those elements is the failure mode by construction. Where a failure mode required interpretation beyond direct inversion, it landed in the unsourced-values table below.
- **NCSBN authorship lineage.** The Five Rights were originally articulated in NCSBN's 1995 *Delegation Decision-Making Process* and 1996 *Delegation: Concepts and Decision-Making Process* annual-meeting publications, then re-adopted in the 2019 NGND Joint Statement (the canonical current source). Cite the 2019 NGND for present-day exam content.
- **Five vs Six vs Seven Rights.** Some nursing-pedagogy sources extend the list to a "Sixth Right" (Right evaluation, separated from supervision) or a "Seventh Right" (Right documentation, or Right feedback). NCSBN publishes Five and folds evaluation into Right #5. Concept stays with NCSBN's Five. Documentation is captured inside Right #5's failure modes ("Documentation of the activity is missing") rather than as its own Row.
- **Delegation vs assignment vs handoff.** NCSBN distinguishes (a) **delegation** — transferring a nursing activity that is *outside* the delegatee's traditional role and basic responsibilities, requiring extra competency validation; (b) **assignment** — routine activities *within* the delegatee's authorized scope; (c) **handoff** — transfer of patient-care responsibility between licensed providers (RN-to-RN). The Five Rights apply to delegation specifically. Sibling Concept `scope-of-practice-by-role.md` covers assignment-vs-delegation Row-by-role; sibling `delegable-vs-non-delegable-tasks.md` covers task-by-role.
- **What cannot be delegated.** NCSBN: nursing judgment, clinical reasoning, and critical decision making cannot be delegated, regardless of the Five Rights checklist. Out of scope here — captured in `delegable-vs-non-delegable-tasks.md`.
- **Cross-Concept links.** Sibling `scope-of-practice-by-role.md` (1.3) covers RN/LPN/AP scope. Sibling `delegable-vs-non-delegable-tasks.md` (1.3) covers task-by-role assignment. Sibling `sbar-handoff-structure.md` (1.6) covers the handoff frame, which NCSBN explicitly distinguishes from delegation.

### Tricky distractors

- **Right circumstance vs Right task.** Wrong-answer pattern: justifying delegation with "the AP is trained for vital signs" when the patient is unstable. Right person/Right task may pass while Right circumstance fails — instability vetoes the delegation regardless of delegatee competency.
- **Right person ≠ available person.** The "Right person" is the one with validated competency, not the one who is free. Wrong-answer pattern: delegating to whichever AP is on shift without checking competency for the specific activity.
- **Two-way communication.** "Right directions and communication" requires the delegatee to ask clarifying questions and accept the delegation. Wrong-answer pattern: nurse states the task and walks away — that's one-way and fails Right #4.
- **Supervision is during, evaluation is after.** Right #5 covers both — monitoring during the activity AND follow-up after completion. Wrong-answer pattern: collapsing the two into "the nurse evaluates afterward" — supervision is real-time availability to intervene.
- **Delegation does not transfer accountability.** The licensed nurse retains overall accountability for the patient even after a Right-Five-checked delegation; the delegatee is responsible for the delegated activity itself. Wrong-answer pattern: "Once delegated, the AP is accountable for the patient's outcome." Wrong — accountability stays with the licensed nurse.

### Values without a direct public citation

| Cell | Value | Why unsourced |
|---|---|---|
| (none) | — | Every cell traces to NCSBN 2019 NGND `[s1]`. The 2026 NCLEX-RN Test Plan `[s2]` is cited at the registry level for exam scope but not per-cell, since the test plan does not enumerate the Five Rights — it references the delegation construct that NCSBN-ANA publish in `[s1]`. |

## Engine demo opportunities

- `2 | Name → ?` → Right circumstance.
- `? | Name → Right person` → 3.
- `4 | Question the nurse asks → ?` → Were specific instructions given? / Was the data to be collected specified? / Was the method for collecting the data specified? / Was the time frame for reporting results specified? / Did the delegatee accept the delegated activity? (multi-Fact cell, select-all)
- `5 | Failure mode if skipped → ?` → Nurse unavailable to intervene / Activity completed but outcome not evaluated / Documentation of the activity is missing (multi-Fact cell, select-all)
- `? | Failure mode if skipped → Delegatee lacks validated competency` → 3 (Right person).
- Sequence (adjacency): `Right (n+1 where Right n | Name → Right circumstance) | Name → ?` → Right person.
- Composite Row profile: Right #4 across all Columns, with one cell swapped to a Right #5 Value as distractor.

## Sources

- `[s1]`: NCSBN & ANA, *National Guidelines for Nursing Delegation*, Joint Statement, effective 2019-04-29 (replaces 2010 NCSBN-ANA Joint Statement on Delegation). Five Rights of Delegation section, p. 4. Originally sourced from NCSBN 1995 *Delegation Decision-Making Process* and 1996 *Delegation: Concepts and Decision-Making Process*. Retrieved 2026-04-26 from https://www.ncsbn.org/public-files/NGND-PosPaper_06.pdf
- `[s2]`: NCSBN, *2026 NCLEX-RN Test Plan*, effective April 1, 2026 – March 31, 2029, §1.3 Assignment, Delegation and Supervision (Management of Care, Safe and Effective Care Environment). Retrieved 2026-04-26 from https://www.ncsbn.org/publications/2026-nclex-rn-test-plan and https://www.nclex.com/files/2026_RN_Test%20Plan_English-F.pdf
