# Personnel Safety Controls

**Domain:** 7 — Security Operations &nbsp;|&nbsp; **Pattern:** Dimensions &nbsp;|&nbsp; **Tags:** 7.15
**Status:** draft (SME review pending)

The four life-safety controls that operations teams maintain to protect personnel from physical-world threats: travel exposure, personal duress, mass-notification events, and active-shooter scenarios. Each pairs a *trigger condition* with an *expected response* and a *training requirement*. The CISSP exam tests the matchup between scenario and control type — particularly the distinction between covert duress signals and audible mass notification.

| control | trigger | expected response | training |
|---|---|---|---|
| Travel security | International travel by staff [needs source] | Pre-trip risk briefing [needs source]<br>Encrypted travel devices [needs source] | Pre-departure security briefing [needs source] |
| Duress signals | Personal threat requiring covert assistance [s3] | Silent alert to monitoring center [s3] | Duress-code or panic-button drill [s3] |
| Emergency communication | Building emergency event [s1] | Mass notification to all personnel [s1] | Annual emergency notification drill [s1] |
| Active shooter response | Active shooter on premises [s2] | Evacuate if safe path exists [s2]<br>Hide if evacuation not possible [s2]<br>Fight only as last resort [s2] | DHS Run-Hide-Fight training [s2] |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. No parentheticals in cells. The active-shooter response is decomposed into three sequential Facts (Run, Hide, Fight) because each is a distinct decision point with distinct preconditions — collapsing them would mask the ordering the DHS framework prescribes.
- **Tag 7.15 retained from stub.** Matches (ISC)² 2024 outline §7.15 *Address personnel safety and security concerns*. Sibling Concept: `travel-security-risks.md` (which expands the Travel-security row with specific risk categories).
- **Duress vs. panic buttons.** Both summon help, but they differ in *signaling mode*. Duress is silent — the attacker doesn't know help has been called. Panic is audible — the alarm itself is part of the deterrent. Banks use duress (silent because the robber is in the room); building fire alarms are panic-style (audible because evacuation is the goal). Most CISSP questions on this row hinge on the silent-vs-audible distinction.
- **Mass notification is regulated.** OSHA 29 CFR 1910.165 sets minimum requirements for employee alarm systems [s1] — perceptible above ambient noise, distinctive for each emergency type, regularly tested. The annual-drill requirement is the test-favorite Fact.
- **DHS Run-Hide-Fight is the canonical framework.** Run-Hide-Fight (formally promulgated by DHS/CISA and the FBI) is the exam-default active-shooter response framework. The ordering is hierarchical, not parallel — Run is the preferred response; Hide only if Run is impossible; Fight only if both Run and Hide have failed.
- **Travel security is the under-sourced row.** The travel-security control category covers a wide range of practices (encrypted devices, burner phones, pre-trip threat briefings, secure communication channels, embassy contact registration). The four Facts in this row sample the most-tested ones; specific risks live in `travel-security-risks.md`.
- **What is intentionally not on this table.** Workplace violence prevention (broader than active shooter), executive protection, and pandemic / health-emergency response are adjacent personnel-safety concerns that could be added as additional rows in a future revision. The four here cover the most-tested CISSP scope.
- **Gaps marked `[needs source]`:** four Facts — the entire travel-security row's contents. Travel security is widely practiced but its specifics live in vendor and government internal guidance rather than NIST-style primary publications, so authoritative sourcing is harder.

## Engine demo opportunities

- `? | trigger → Active shooter on premises` → Active shooter response
- `Duress signals | expected response → ?` → `Silent alert to monitoring center`
- `? | training → DHS Run-Hide-Fight training` → Active shooter response
- `Emergency communication | trigger → ?` → `Building emergency event`
- `Active shooter response | expected response → ?` → `Evacuate if safe path exists`, `Hide if evacuation not possible`, or `Fight only as last resort` (cell carries three valid Values)
- Cross-Row distractor: `Duress signals | training → ?` with `DHS Run-Hide-Fight training` (Active shooter) and `Annual emergency notification drill` (Emergency communication) as distractors

## Sources

- `[s1]`: OSHA *29 CFR 1910.165 — Employee Alarm Systems* (retrieved 2026-04-25, https://www.osha.gov/laws-regs/regulations/standardnumber/1910/1910.165)
- `[s2]`: DHS / CISA *Active Shooter: How to Respond* — the Run-Hide-Fight framework (retrieved 2026-04-25, https://www.cisa.gov/topics/physical-security/active-shooter-preparedness)
- `[s3]`: Duress / panic button practitioner references — workplace-safety vendor consensus (retrieved 2026-04-25, https://www.roarforgood.com/blog/duress-buttons-and-panic-buttons/)
- `[s4]`: (ISC)² CISSP Certification Exam Outline, effective 2024-04-15, Domain 7 §7.15 *Address personnel safety and security concerns* (retrieved 2026-04-25, https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline)
