# Change Types

**Domain:** 7 — Security Operations &nbsp;|&nbsp; **Pattern:** Dimensions &nbsp;|&nbsp; **Tags:** 7.9
**Status:** draft (SME review pending)

The three ITIL change categories that determine which approval path a change follows. The classification matters because it sets the level of scrutiny: standard changes are pre-approved and bypass the Change Advisory Board (CAB); normal changes require CAB review; emergency changes go to the Emergency CAB (ECAB) on short notice. The most-tested distinction on CISSP is *who approves* and *under what risk posture*.

| change type | approval path | risk profile | typical example |
|---|---|---|---|
| Standard | Pre-approved without per-instance review [s1] | Low risk with predictable outcome [s1] | Password reset [s1]<br>Routine OS patch [s1]<br>Pre-approved configuration tweak [s1] |
| Normal | Change Advisory Board reviews and approves [s1] | Moderate to high impact requiring assessment [s1] | New service deployment [s1]<br>Major infrastructure modification [s1] |
| Emergency | Emergency Change Advisory Board approves on short notice [s1] | High urgency to mitigate immediate threat [s1] | Critical security patch [s1]<br>Recovery from system failure [s1] |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. No parentheticals in cells.
- **Tag 7.9 retained from stub.** Matches (ISC)² 2024 outline §7.9 *Apply change management*.
- **Pre-companion to `change-management-lifecycle.md`.** That Concept describes the seven phases every change passes through; this Concept describes how the *type* of change determines which authority signs off in the Approval phase. Standard changes effectively skip the CAB step in the lifecycle because the approval was granted in advance for the change category as a whole.
- **CCB vs. CAB terminology.** NIST uses *Configuration Control Board* (CCB); ITIL uses *Change Advisory Board* (CAB) and *Emergency CAB* (ECAB). This Concept uses CAB/ECAB because change *types* are an ITIL construct rather than a NIST construct. The sibling lifecycle Concept uses CCB to match its NIST primary source. Either term is acceptable on the exam.
- **Why three rows and not more.** ITIL 4 recognizes exactly three change types (standard, normal, emergency). Some organizations subdivide normal into "minor" and "major"; that is an internal scoping choice rather than an additional ITIL category. Keeping three rows matches the framework as published.
- **Standard ≠ low priority.** Pre-approval is granted because the change *procedure* is well-known and the *outcome* is predictable, not because the change is unimportant. A password reset for the CEO is still a standard change.
- **Gaps marked `[needs source]`:** none.

### Tricky distractors

- **Standard ≠ unimportant.** Pre-approved means procedure is known, not that the change is trivial. Wrong-answer pattern: claiming standard changes don't need approval — they have category-level pre-approval.
- **Emergency uses ECAB.** Compressed timeline, not skipped governance. Wrong-answer pattern: claiming emergency changes bypass approval entirely — ECAB grants expedited approval.
- **Normal changes go to CAB.** Standard CAB review. Wrong-answer pattern: routing normal changes to ECAB — only emergencies go there.
- **CAB ≠ CCB.** ITIL term vs NIST term. Wrong-answer pattern: treating them as different bodies — same role in different vocabularies.
- **Three change types, not more.** ITIL 4 standard. Wrong-answer pattern: adding "minor" or "major" as separate types — those are sub-classifications, not ITIL types.
- **Pre-approval is for the change category, not the instance.** Wrong-answer pattern: claiming each standard change instance is reviewed individually — it's the category that's approved.

## Engine demo opportunities

- `? | approval path → Pre-approved without per-instance review` → Standard
- `Emergency | typical example → ?` → `Critical security patch` or `Recovery from system failure` (either Fact in the cell is valid)
- `? | risk profile → High urgency to mitigate immediate threat` → Emergency
- `Normal | approval path → ?` → `Change Advisory Board reviews and approves`
- Composite Row profile: Standard across all Columns with the `risk profile` cell swapped to `High urgency to mitigate immediate threat` (Emergency's value) — engine should detect the substitution

## Sources

- `[s1]`: ITIL 4 change management practice — change-type definitions for Standard, Normal, and Emergency, with CAB/ECAB approval paths (retrieved 2026-04-25, https://faddom.com/itil-change-management-types-standard-vs-normal-vs-emergency/ and https://www.manageengine.com/products/service-desk/it-change-management/it-change-types.html) — used as published summaries of the ITIL 4 practice
- `[s2]`: (ISC)² CISSP Certification Exam Outline, effective 2024-04-15, Domain 7 §7.9 *Apply change management* (retrieved 2026-04-25, https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline)
