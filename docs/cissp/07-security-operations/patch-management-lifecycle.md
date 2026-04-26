# Patch Management Lifecycle

**Domain:** 7 — Security Operations &nbsp;|&nbsp; **Pattern:** Ordered &nbsp;|&nbsp; **Tags:** 7.8
**Status:** draft (SME review pending)

The six sequential phases a security patch passes through from discovery to verification. NIST SP 800-40 Rev. 4 frames patch management as preventive maintenance with a defined lifecycle; this Concept renders that lifecycle as six numbered phases. The CISSP exam tests both the phase ordering and the deliverable each phase produces — a missing test phase, for example, is the canonical wrong-answer scenario.

**Layout convention:** rows are ordered chronologically (Phase 1 first, Phase 6 last). Columns progress from identifier (Phase, Name) to action (Key Activity) to deliverable (Typical Output).

| Phase | Name | Key Activity | Typical Output |
|---|---|---|---|
| 1 | Identification | Discover newly available patches [s1]<br>Inventory affected assets [s1] | List of applicable patches [s1] |
| 2 | Evaluation | Assess vulnerability criticality [s1]<br>Assess patch impact [s1] | Patch prioritization [s1] |
| 3 | Testing | Validate patch in non-production environment [s1] | Test results report [s1] |
| 4 | Approval | Change Control Board reviews patch [s1] | Approved deployment plan [s1] |
| 5 | Deployment | Apply patch to production using chosen strategy [s1] | Deployed patches [s1] |
| 6 | Verification | Confirm patch installation success [s1]<br>Confirm vulnerability remediation [s1] | Verification report [s1] |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. No parentheticals in cells.
- **Tag 7.8 retained from stub.** Matches (ISC)² 2024 outline §7.8 *Implement and support patch and vulnerability management*. Sibling Concept: `patch-deployment-strategies.md` (the Phase 5 deployment-strategy choice).
- **Identification has two halves.** Discovery of *what patches exist* (vendor advisories, CVE feeds, scanner output) and inventory of *what assets are affected* (CMDB query, agent reporting). Both must succeed before Phase 2 can prioritize. Asset inventory accuracy is the silent dependency that often breaks patch management programs — see `cmdb-components.md`.
- **Testing is the most-skipped phase.** The most common CISSP wrong-answer scenario: deploying a critical patch to production without testing because of urgency. NIST SP 800-40 acknowledges that emergency patches may compress or skip Phase 3, but mandates explicit risk acceptance when this happens [s1]. Skipping Phase 3 silently is a finding.
- **Approval ties to change management.** Phase 4 (Approval) integrates with the change-management lifecycle (`change-management-lifecycle.md`). For routine patches, the CCB approval may be a standard-change blanket pre-approval (see `change-types.md`); for emergency patches, the Emergency CAB invokes the emergency-change path.
- **Deployment phase choice expands into the deployment strategies Concept.** Phase 5 (Deployment) is where the strategy choice (phased rollout, pilot group, canary, big bang) lives. The lifecycle says *deploy*; the strategies Concept says *how*.
- **Verification is forward-looking, not retrospective.** Verification confirms two things: (1) the patch actually installed (didn't fail silently); (2) the underlying vulnerability is no longer exploitable (re-scan with vulnerability scanner). Both are required — install confirmation alone does not prove remediation if the patch was incomplete or applied to the wrong component.
- **Why six phases, not seven or five.** NIST SP 800-40 Rev. 4 frames patch management around four broad activities (preparation, planning, deployment, verification). Six-phase decomposition adds Identification and Evaluation as separate phases (since prioritization is a distinct deliverable from inventory) and separates Testing from Approval (since approval depends on test outcomes). This matches the most-tested CISSP framing.
- **Gaps marked `[needs source]`:** none — all Facts trace to NIST SP 800-40 Rev. 4 framing.

## Engine demo opportunities

- `? | Name → Testing` → Phase 3
- `Phase 5 | Key Activity → ?` → `Apply patch to production using chosen strategy`
- `? | Typical Output → Patch prioritization` → Phase 2 / Evaluation
- `Verification | Key Activity → ?` → `Confirm patch installation success` or `Confirm vulnerability remediation`
- Sequence verification: `Phase 2 → ? → Phase 4` → Phase 3 (Testing) — tests Ordered-Pattern progression
- Composite Row profile: Identification across all Columns with `Typical Output` swapped to `Verification report` (Phase 6's value)

## Sources

- `[s1]`: NIST SP 800-40 Rev. 4 *Guide to Enterprise Patch Management Planning: Preventive Maintenance for Technology*, April 2022 (retrieved 2026-04-25, https://csrc.nist.gov/pubs/sp/800/40/r4/final)
- `[s2]`: (ISC)² CISSP Certification Exam Outline, effective 2024-04-15, Domain 7 §7.8 *Implement and support patch and vulnerability management* (retrieved 2026-04-25, https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline)
