# Termination Types

**Domain:** 1 — Security and Risk Management &nbsp;|&nbsp; **Pattern:** Dimensions &nbsp;|&nbsp; **Tags:** 1.9
**Status:** draft (SME review pending)

The five employee-departure scenarios CISSP courseware distinguishes by *security posture* (how much insider-threat risk the departure presents). Voluntary departures and retirements typically allow standard offboarding; involuntary friendly departures (layoffs, performance-based exits with notice) need somewhat tighter timing; involuntary hostile departures need *immediate* access revocation before the conversation. The CISSP exam tests the matchup between termination scenario and access-revocation timing.

| termination | security posture | access revocation timing | exit interview? |
|---|---|---|---|
| Voluntary | Low risk if departure is amicable [s1] | Revoke at end of last day [s1] | Yes [s1] |
| Involuntary friendly | Moderate risk requiring controlled timing [s1] | Revoke at announcement [s1] | Yes [s1] |
| Involuntary hostile | High risk of retaliation [s1] | Revoke before notification conversation [s1] | Optional and highly controlled [s1] |
| Retirement | Low risk by definition of friendly departure [s1] | Revoke at end of last day [s1] | Yes [s1] |
| Layoff | Moderate risk if widely communicated [s1] | Revoke at notification [s1] | Yes [s1] |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. No parentheticals in cells.
- **Tag 1.9 retained from stub.** Maps to (ISC)² 2024 outline §1.9 *Contribute to and enforce personnel security policies and procedures*. Sibling Concepts: `onboarding-offboarding.md` (the lifecycle), `personnel-controls.md` (the broader control set).
- **The hostile-termination ordering is the test favorite.** Access must be revoked *before* the person is told they are terminated. Once they know, the window to retaliate (delete data, exfiltrate IP, plant logic bombs, deface systems) opens. The conversation happens with HR and security present, the laptop and badge are collected on the spot, and the person is escorted out. This is the worst-case but best-known scenario.
- **Friendly involuntary still needs controlled timing.** A performance-based termination delivered amicably with severance is still involuntary — the person is not choosing to leave. They may be cooperative on the day of, but the access revocation should happen at notification rather than days later. The coordination between HR and IT to revoke access at the moment HR speaks with the employee is a tested CISSP scenario.
- **Voluntary departures still leave risk.** A two-week notice period is enough time to exfiltrate data quietly, plant timed payloads, or document confidential information. Many organizations escort voluntary leavers out at notice (rather than letting them work their two weeks) for sensitive roles. Standard practice for non-sensitive roles is to keep working access during notice and revoke at end of last day.
- **Layoffs are a special hostile-friendly hybrid.** Layoffs are involuntary (the person did not choose to leave) but are usually *not* targeted at the individual (it is a budgetary decision). The risk is moderate because morale impact across the surviving workforce can also generate insider-threat exposure — disgruntled survivors. Layoffs require both individual access revocation and broader morale management.
- **Retirement is the friendliest case.** Long-tenured retirees often have deep system knowledge and relationships. The risk is low *during* the departure (they want to leave on good terms) but knowledge transfer is critical — the institutional knowledge they carry needs to be captured before they walk out.
- **Why "exit interview optional and controlled" for hostile.** Hostile-termination exit interviews carry liability risk (the person may say things that get used in lawsuits) and security risk (the person may try to extract information about the investigation). Some organizations skip them; those that do them have HR + legal present and follow a strict script.
- **Gaps marked `[needs source]`:** none — all Facts trace to standard CISSP personnel-security framing.

### Tricky distractors

- **Hostile termination: revoke before conversation.** The most-tested CISSP nuance. Wrong-answer pattern: claiming notification should come first as professional courtesy — retaliation window opens.
- **Voluntary departure has risk too.** Two-week notice = window for data theft. Wrong-answer pattern: claiming voluntary departures need no security controls — sensitive roles often see escort-out.
- **Layoffs are hybrid risk.** Individual + surviving workforce morale risk. Wrong-answer pattern: treating layoffs like routine voluntary departures — broader morale impact matters.
- **Retirement is friendly but knowledge-heavy.** Knowledge transfer is critical risk. Wrong-answer pattern: claiming retirements need no special handling — institutional knowledge walks out.
- **Hostile exit interview is optional.** Liability and security risk. Wrong-answer pattern: requiring hostile exit interviews — most organizations skip with legal present if conducted.
- **Friendly involuntary still requires controlled timing.** Revoke at notification. Wrong-answer pattern: collapsing all involuntary into "hostile" — performance terminations with severance are friendly involuntary.

## Engine demo opportunities

- `? | access revocation timing → Revoke before notification conversation` → Involuntary hostile
- `Layoff | security posture → ?` → `Moderate risk if widely communicated`
- `? | exit interview? → Optional and highly controlled` → Involuntary hostile
- `Voluntary | access revocation timing → ?` → `Revoke at end of last day`
- Cross-Row shared-Value detection: `? | access revocation timing → Revoke at end of last day` → Voluntary, Retirement
- Cross-Row shared-Value detection: `? | exit interview? → Yes` → all rows except Involuntary hostile
- Composite Row profile: Voluntary across all Columns with `access revocation timing` swapped to `Revoke before notification conversation` (Involuntary hostile's value)

## Sources

- `[s1]`: NIST SP 800-53 Rev. 5, control PS-4 *Personnel Termination* — termination procedures including access revocation timing (retrieved 2026-04-26, https://csrc.nist.gov/pubs/sp/800/53/r5/upd1/final). CISSP courseware termination-type framing cross-referenced.
- `[s2]`: (ISC)² CISSP Certification Exam Outline, effective 2024-04-15, Domain 1 §1.9 (retrieved 2026-04-26, https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline)
