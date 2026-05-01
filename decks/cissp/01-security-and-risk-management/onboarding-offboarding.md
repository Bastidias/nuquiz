# Onboarding / Offboarding Phases

**Domain:** 1 — Security and Risk Management &nbsp;|&nbsp; **Pattern:** Ordered &nbsp;|&nbsp; **Tags:** 1.9
**Status:** draft (SME review pending)

The six sequential phases of the personnel security lifecycle. Onboarding (Phases 1-3) brings a new person into the organization with the right access and accountability commitments; offboarding (Phases 4-6) removes them cleanly when they leave. The CISSP exam tests both the ordering and the matchup between phase and the security artifact it produces — particularly the offboarding sequence (revoke access *before* the conversation, not after).

**Layout convention:** rows are ordered chronologically across the employee lifecycle (Phase 1 = first onboarding step, Phase 6 = last offboarding step). Columns progress from identifier (Phase, Name) to action (Key Activity) to deliverable (Typical Output).

| Phase | Name | Key Activity | Typical Output |
|---|---|---|---|
| 1 | Background screening | Verify candidate identity and history [s1] | Cleared candidate record [s1] |
| 2 | Onboarding paperwork | Sign NDA and Acceptable Use Policy [s1] | Signed agreements [s1] |
| 3 | Provisioning | Grant least-privilege accounts and access [s1] | Active accounts and badge [s1] |
| 4 | Access changes during tenure | Adjust access on role change [s1] | Updated access record [s1] |
| 5 | Access revocation at termination | Disable accounts before separation conversation [s1] | Disabled accounts [s1]<br>Recovered assets [s1] |
| 6 | Exit interview and offboarding | Confirm asset return and obligations [s1] | Signed exit acknowledgment [s1] |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. No parentheticals in cells.
- **Tag 1.9 retained from stub.** Maps to (ISC)² 2024 outline §1.9 *Contribute to and enforce personnel security policies and procedures*.
- **Phase 5 ordering is the test favorite.** Access revocation should *precede* the termination conversation — not follow it. A terminated employee notified before access is revoked has a window to retaliate (delete data, exfiltrate IP, plant logic bombs). The exception is friendly departures with notice (resignation), where less aggressive timing is acceptable. Hostile-termination scenarios on the CISSP exam expect "revoke first, then notify."
- **Phase 4 is ongoing, not a single event.** The "access changes during tenure" phase covers role changes, project rotations, promotions, and any event that should change someone's access. The most common access-creep failure is forgetting to *remove* old access when adding new — a person who has changed roles three times often retains the union of all four access sets if Phase 4 is sloppy.
- **Background screening is not just a hiring formality.** It is a liability shield (negligent hiring claims), a fraud-prevention control (catches false credentials), and an insider-threat control (catches concerning history). Depth varies by role — the screening for a financial-system administrator is heavier than for a contractor doing one-week onsite work.
- **NDA timing matters.** NDAs should be signed *before* the candidate gains access to confidential information, not after. This is why Phase 2 (paperwork) precedes Phase 3 (provisioning) — the legal commitment must exist before the access exists.
- **Offboarding includes more than account disablement.** Asset return (laptop, phone, badge, hardware tokens), credential rotation (any shared secrets the person knew), and SaaS account audit (third-party services where the person had access) are all part of offboarding. Phase 5's "Recovered assets" Fact captures this.
- **Why "Exit interview" is its own phase.** Exit interviews surface insider risk (departing employee may disclose security concerns they were uncomfortable raising before), reinforce ongoing obligations (NDA still applies after departure), and document final acknowledgments. Many organizations skip Phase 6 and lose this signal.
- **Gaps marked `[needs source]`:** none — all Facts trace to standard CISSP personnel-lifecycle framing.

### Tricky distractors

- **Revoke access before notification (hostile termination).** Don't give the soon-to-be-terminated employee a heads-up window. Wrong-answer pattern: claiming the employee should be told first as courtesy — that creates retaliation risk.
- **NDA precedes access.** Phase 2 before Phase 3. Wrong-answer pattern: granting access then asking for NDA signature — too late for legal protection.
- **Access creep happens without active revocation.** Adding new access without removing old. Wrong-answer pattern: claiming role changes automatically clean up old access — they don't unless explicitly designed to.
- **Offboarding includes asset return and credential rotation.** Not just account disable. Wrong-answer pattern: classifying asset return as separate from offboarding — it's part of Phase 5/6.
- **Exit interview captures insider risk signals.** Departing employees disclose concerns. Wrong-answer pattern: skipping exit interviews — loses signal and final acknowledgments.
- **Background check is liability shield.** Negligent hiring claims defended by documented screening. Wrong-answer pattern: treating background check as just due diligence — it has specific legal value.

## Engine demo opportunities

- `? | Name → Provisioning` → Phase 3
- `Phase 5 | Key Activity → ?` → `Disable accounts before separation conversation`
- `? | Typical Output → Cleared candidate record` → Phase 1 / Background screening
- `Onboarding paperwork | Typical Output → ?` → `Signed agreements`
- Sequence verification: `Phase 2 → ? → Phase 4` → Phase 3 (Provisioning) — tests Ordered-Pattern progression
- Composite Row profile: Phase 1 across all Columns with `Key Activity` swapped to `Disable accounts before separation conversation` (Phase 5's value)

## Sources

- `[s1]`: NIST SP 800-53 Rev. 5, control family PS *Personnel Security* — particularly PS-3 (Personnel Screening), PS-4 (Personnel Termination), PS-5 (Personnel Transfer), PS-6 (Access Agreements) (retrieved 2026-04-26, https://csrc.nist.gov/pubs/sp/800/53/r5/upd1/final). Cross-referenced against CISSP CBK personnel-lifecycle enumeration.
- `[s2]`: (ISC)² CISSP Certification Exam Outline, effective 2024-04-15, Domain 1 §1.9 (retrieved 2026-04-26, https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline)
