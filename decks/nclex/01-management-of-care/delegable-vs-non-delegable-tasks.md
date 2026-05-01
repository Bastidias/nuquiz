# Delegable vs Non-Delegable Tasks

**Topic:** 1 — Management of Care &nbsp;|&nbsp; **Pattern:** Dimensions &nbsp;|&nbsp; **Tags:** 1.3, IP-CJ
**Status:** draft (SME review pending)

The eight tasks most often compared on NCLEX-RN delegation items, judged for which role MAY legally perform each task. Rows are tasks (with a `client status` qualifier on `Vital signs` to distinguish stable from unstable patients); columns are the three delegatee roles RN / LPN/VN / UAP/AP plus the `client status` qualifier. Cell values record delegation authority — `Yes` (within role scope), `No` (outside role scope or vetoed by patient instability), `With limits` (state-dependent or scope-dependent). Authority derives from the NCSBN-ANA 2019 *National Guidelines for Nursing Delegation* and is tested on NCLEX-RN under sub-objective 1.3.

The `client status` Column splits what would otherwise be two parenthetically-disambiguated `Vital signs` Rows (`Vital signs (stable client)` vs `Vital signs (unstable client)`) into Rows that share the same task label but differ on a separate attribute. Without the split, the engine could not detect that both Rows share `task = Vital signs`; with the split, the parens-safety rule is satisfied and the shared task value is engine-visible.

| Task | client status | RN | LPN/VN | UAP/AP |
|---|---|---|---|---|
| Vital signs | Stable | Yes [s1] | Yes [s1] | Yes [s1] |
| Vital signs | Unstable | Yes [s1] | No [s1] | No [s1] |
| Initial assessment | N/A | Yes [s1] | No [s1] | No [s1] |
| Reinforce teaching | N/A | Yes [needs source] | Yes [needs source] | No [s1] |
| Initial teaching | N/A | Yes [s1] | No [s1] | No [s1] |
| Bed bath | N/A | Yes [needs source] | Yes [needs source] | Yes [needs source] |
| Sterile dressing change | N/A | Yes [needs source] | Yes [needs source] | No [s1] |
| Blood admin | N/A | Yes [needs source] | With limits [needs source] | No [s1] |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. No parentheticals in cells. The `client status` Column carries the qualifier that would otherwise have lived in parens after `Vital signs` — splitting it out makes the shared-Row-label visible to the engine and complies with the parens-safety rule in `knowledge-map.md`.
- **Why the `client status` split.** The Topic 1 README originally listed `Vital signs (stable client)` and `Vital signs (unstable client)` as separate Rows. Stripping the parentheticals from the Column would expose `Vital signs` and `Vital signs` as identical Row labels — load-bearing parens. The fix is to lift `client status` into its own Column (`Stable` / `Unstable` / `N/A`), rename both Rows to `Vital signs`, and let the engine detect the shared task across two scope-distinct Rows. The remaining six tasks carry `client status = N/A` because the NCSBN-published delegation principle does not change with patient stability for those tasks (e.g., initial assessment is RN-only regardless of stability; UAP cannot do sterile dressings regardless of stability).
- **Delegation authority semantics.** A `Yes` in this Concept means "the role MAY perform this task per NCSBN delegation principles and customary scope." A `No` means "the role MAY NOT perform this task — either because the task falls outside the role's authorized scope, or because patient instability vetoes the delegation under NCSBN's Right Circumstance principle [s1]." A `With limits` means scope is state-dependent or facility-dependent.
- **NCSBN's hard rule on instability.** NCSBN-ANA 2019 NGND states that "the health condition of the patient must be stable" for delegation to occur [s1]. Once a patient becomes unstable, vital signs (and any other monitoring task) revert to the licensed nurse — UAP and LPN/VN cannot continue delegated assessment of an unstable patient. The RN remains responsible for assessment and intervention.
- **Initial assessment is RN-only.** NCSBN-ANA 2019 NGND specifies that "the licensed nurse cannot delegate nursing judgment or any activity that will involve nursing judgment or critical decision making" [s1]. Initial / comprehensive assessment requires nursing judgment and is therefore non-delegable. LPN/VN may collect data and contribute to ongoing assessment, but the initial assessment is the RN's responsibility.
- **Initial vs reinforce teaching.** NCSBN-ANA 2019 NGND treats teaching that requires nursing judgment (initial patient education, evaluation of learning) as non-delegable [s1]. Reinforcement of previously-taught content is widely treated in nursing pedagogy as within LPN/VN scope, but the NCSBN NGND text itself does not enumerate task-by-role authority for teaching reinforcement — that distinction is state-determined and pedagogy-derived. Marked `[needs source]` for the LPN/VN reinforce-teaching cell.
- **Blood administration.** Whether LPN/VNs may administer blood products is **state-determined** — some state nursing practice acts permit it under specific facility protocols (e.g., monitoring an established transfusion after RN initiates), others restrict it entirely. NCSBN NGND does not address this directly. Marked `With limits` and `[needs source]` accordingly. Sibling `scope-of-practice-by-role.md` should capture the state-variable detail.
- **Out of scope.** This Concept asks "which role MAY perform task X". Sibling `scope-of-practice-by-role.md` (1.3) takes the inverse cut — Rows are roles, Columns are capabilities — and is the canonical source for what each role CAN perform in general. Sibling `five-rights-of-delegation.md` (1.3) covers the decision frame the licensed nurse runs through *before* delegating. Together the three Concepts cover §1.3 from three orthogonal angles.
- **Accountability does not transfer.** Per NCSBN NGND, the licensed nurse retains accountability for the delegated activity even after delegation; the delegatee is responsible for the activity itself [s1]. A `Yes` in this Concept does not transfer accountability — it only authorizes performance.
- **NCLEX-RN exam-fit.** NCSBN's 2026 NCLEX-RN Test Plan §1.3 (Assignment, Delegation and Supervision) lists "delegate and supervise care provided by others (e.g., LPN/VN, assistive personnel, other RNs)" and "evaluate delegated tasks to ensure correct completion of activity" as activity statements [s2]. The task-by-role table here is the canonical reference frame for those activity statements.

### Tricky distractors

- **Vital signs on an unstable patient.** Wrong-answer pattern: "The UAP can take vitals on this patient who is being titrated on a vasoactive drip — UAP routinely takes vitals." Wrong — instability vetoes the delegation per NCSBN Right Circumstance [s1], regardless of the UAP's vital-signs competency.
- **Initial vs ongoing assessment.** Wrong-answer pattern: "The LPN/VN performed the assessment on admission." Wrong — the RN performs initial assessment; the LPN/VN may contribute data and perform focused reassessment but cannot complete the initial comprehensive assessment.
- **Initial vs reinforce teaching.** Wrong-answer pattern: "The LPN/VN provided initial diabetes self-management education." Wrong — initial teaching requires nursing-judgment evaluation of learning needs, which is RN-only. The LPN/VN may reinforce previously-taught content.
- **Sterile dressing change vs clean dressing change.** Wrong-answer pattern: "The UAP performed the sterile dressing change." Wrong — sterile technique is outside UAP scope. UAP may perform clean dressing changes per facility policy. This Concept rows `Sterile dressing change` only.
- **Blood admin and the LPN/VN.** Wrong-answer pattern: assuming LPN/VN scope on blood administration is uniform nationally. State-variable; the safest exam answer is "RN initiates and performs first-15-minutes monitoring; LPN/VN may continue monitoring per facility protocol where state law permits."
- **Bed bath as a teaching opportunity.** Wrong-answer pattern: "The UAP completed the bed bath and provided skin-care teaching." Wrong — bath itself is delegable; the teaching is not. Decompose the activity before grading the answer.

### Values without a direct public citation

| Cell | Value | Why unsourced |
|---|---|---|
| Reinforce teaching × RN | Yes | Within RN full scope by construction; NCSBN NGND does not enumerate teaching-by-role specifically. Fact is uncontested in nursing pedagogy but lacks a direct NCSBN-published per-role claim. |
| Reinforce teaching × LPN/VN | Yes | Standard nursing-pedagogy framing — LPN/VN may reinforce previously-taught content. NCSBN NGND distinguishes "activities involving nursing judgment" (non-delegable) from routine reinforcement, but does not list teaching reinforcement as an explicit example. State scope of practice varies. |
| Bed bath × RN | Yes | RN may always perform a bed bath; not enumerated per-role in NCSBN NGND. Trivially within scope; included for table completeness. |
| Bed bath × LPN/VN | Yes | Standard nursing-pedagogy framing. Not enumerated per-role in NCSBN NGND. |
| Bed bath × UAP/AP | Yes | Standard nursing-pedagogy framing — bed bath is the canonical NCLEX-tested example of a UAP-appropriate activity (routine, predictable, low-risk, no nursing judgment required). NCSBN NGND describes the criteria but does not list the task. |
| Sterile dressing change × RN | Yes | Within RN scope; not enumerated per-role in NCSBN NGND. |
| Sterile dressing change × LPN/VN | Yes | LPN/VN scope generally permits sterile technique per state nursing practice acts; pedagogy-consensus. NCSBN NGND silent on this specific task. |
| Blood admin × RN | Yes | RN initiates blood administration; uncontested in nursing practice but not enumerated in NCSBN NGND. |
| Blood admin × LPN/VN | With limits | State-determined — some states permit LPN/VN to monitor an in-progress transfusion under specific protocols; others prohibit any LPN/VN involvement. NCSBN NGND does not address this. |

## Engine demo opportunities

- `Vital signs | Stable | UAP/AP → ?` → Yes
- `Vital signs | Unstable | UAP/AP → ?` → No
- `Initial assessment | N/A | LPN/VN → ?` → No
- `? | client status = Unstable | UAP/AP → No` → Vital signs (the Row whose UAP cell flips between Stable and Unstable)
- `? | LPN/VN → No` → Vital signs (Unstable), Initial assessment, Initial teaching (cross-Row select-all, shared `No` value)
- `? | UAP/AP → No` → Vital signs (Unstable), Initial assessment, Reinforce teaching, Initial teaching, Sterile dressing change, Blood admin (cross-Row select-all)
- Composite Row profile: `Vital signs | Stable` across all role Columns, with the UAP cell swapped to `No` (the unstable-patient Value) — tests the Right Circumstance principle.
- Composite Row profile: `Reinforce teaching` across all role Columns, with the LPN/VN cell swapped to `No` (the initial-teaching Value) — tests the initial-vs-reinforce distinction.

## Sources

- `[s1]`: NCSBN & ANA, *National Guidelines for Nursing Delegation*, Joint Statement, effective 2019-04-29. Principles of delegation, criteria for delegatable activities, patient-stability requirement, non-delegable activities (nursing judgment, initial assessment, evaluation of teaching). Retrieved 2026-04-26 from https://www.ncsbn.org/public-files/NGND-PosPaper_06.pdf
- `[s2]`: NCSBN, *2026 NCLEX-RN Test Plan*, effective April 1, 2026 – March 31, 2029, §1.3 Assignment, Delegation and Supervision (Management of Care, Safe and Effective Care Environment). Retrieved 2026-04-26 from https://www.ncsbn.org/publications/2026-nclex-rn-test-plan and https://www.nclex.com/files/2026_RN_Test%20Plan_English-F.pdf
