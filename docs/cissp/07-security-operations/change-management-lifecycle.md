# Change Management Lifecycle

**Domain:** 7 — Security Operations &nbsp;|&nbsp; **Pattern:** Ordered &nbsp;|&nbsp; **Tags:** 7.9
**Status:** draft (SME review pending)

The seven sequential phases a change passes through from request to closure. The lifecycle exists to ensure that changes are reviewed for security and operational impact before being applied and that an auditable record exists after. NIST SP 800-53 CM-3 defines the underlying control activities; ITIL/ITSM practice provides the seven-phase decomposition the exam tends to test.

**Layout convention:** rows are ordered chronologically (Phase 1 first, Phase 7 last). Columns progress from identifier (Phase, Name) to action (Key Activity) to deliverable (Typical Output).

| Phase | Name | Key Activity | Typical Output |
|---|---|---|---|
| 1 | Request | Submit formal Request for Change [s3] | Documented change request [s3] |
| 2 | Review | Assess security impact [s1]<br>Assess business impact [s3]<br>Assess resource requirements [s3] | Impact assessment record [s1] |
| 3 | Approval | Configuration Control Board issues decision on change [s1] | Documented approval decision [s1] |
| 4 | Schedule | Set implementation window [s3]<br>Notify affected stakeholders [s3] | Change schedule entry [s3] |
| 5 | Implement | Apply approved change to system [s1] | Implementation log [s1] |
| 6 | Verify | Monitor change behavior [s1]<br>Confirm intended outcome [s3] | Verification report [s3] |
| 7 | Close | Retain change records [s1] | Closed change ticket [s3] |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. No parentheticals in cells. The phase-name "Approval" describes the *phase*, while "Documented approval decision" is the deliverable — same root word, distinct Facts.
- **Tag 7.9 retained from stub.** Matches (ISC)² 2024 outline §7.9 *Apply change management*.
- **Where the seven phases come from.** NIST SP 800-53 CM-3 defines seven numbered control activities for configuration change control [s1]; ITIL/ITSM practice decomposes the change management lifecycle into a roughly parallel sequence (Request → Review → Approval → Implement → Closure) [s3]. The seven phases here align loosely with both: Phases 1-3 cover NIST CM-3 step 2 (review and approve); Phase 4 sits between approval and implementation; Phase 5 is CM-3 step 4 (implement); Phase 6 is CM-3 step 6 (monitor and review); Phase 7 is CM-3 steps 3/5 (document and retain).
- **CCB vs. CAB.** NIST uses *Configuration Control Board* (CCB) [s2]; ITIL uses *Change Advisory Board* (CAB). They serve the same function — the body that approves changes. Exam writers may use either term; treat them as synonyms for question-answering. This Concept uses CCB to match NIST primary terminology.
- **What is intentionally not on this table.** Change types (standard, normal, emergency) live in the sibling Concept `change-types.md`. The CCB itself (composition, charter) belongs in a CCB Concept if added later. Rollback procedures and post-implementation review templates are operational details, not lifecycle phases.
- **Why "Verify" is its own phase rather than folded into Implement.** Verification confirms the change achieved its intended outcome and produced no unintended side effects. Treating it as a separate phase forces an explicit go/no-go gate before closure and matches NIST CM-3's separation of "implement approved changes" (step 4) from "monitor and review activities" (step 6).
- **Gaps marked `[needs source]`:** none — every Fact traces to NIST CM-3, NIST SP 800-128, or ITIL practice summaries.

## Engine demo opportunities

- `? | Name → Approval` → Phase 3
- `Phase 5 | Key Activity → ?` → `Apply approved change to system`
- `? | Typical Output → Impact assessment record` → Phase 2
- `Phase 2 | Key Activity → ?` → `Assess security impact`, `Assess business impact`, or `Assess resource requirements` (any of the three Facts in the cell is valid)
- Sequence verification: `Phase 3 → ? → Phase 5` → Phase 4 (Schedule) — tests ordered-Pattern progression
- Composite Row profile: Phase 3 across all Columns with the `Typical Output` cell swapped to `Closed change ticket` (Phase 7's value) — engine should detect the substitution

## Sources

- `[s1]`: NIST SP 800-53 Rev. 5, control CM-3 *Configuration Change Control*, steps 1-7 (retrieved 2026-04-25, https://csf.tools/reference/nist-sp-800-53/r5/cm/cm-3/)
- `[s2]`: NIST SP 800-128 *Guide for Security-Focused Configuration Management of Information Systems*, August 2011, §3 SecCM Phases and CCB role (retrieved 2026-04-25, https://csrc.nist.gov/pubs/sp/800/128/upd1/final)
- `[s3]`: ITIL/ITSM change management lifecycle as documented in the IT Process Wiki and Splunk ITSM reference (retrieved 2026-04-25, https://wiki.en.it-processmaps.com/index.php/Change_Management) — used for phase-decomposition framing where NIST CM-3 is silent on stages such as Request, Schedule, Verify, Close
- `[s4]`: (ISC)² CISSP Certification Exam Outline, effective 2024-04-15, Domain 7 §7.9 *Apply change management* (retrieved 2026-04-25, https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline)
