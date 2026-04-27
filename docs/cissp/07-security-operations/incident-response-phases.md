# Incident Response Phases

**Domain:** 7 — Security Operations &nbsp;|&nbsp; **Pattern:** Ordered &nbsp;|&nbsp; **Tags:** 7.6
**Status:** draft (SME review pending)

The seven sequential phases of incident response as expanded from NIST SP 800-61's four-phase model. NIST SP 800-61 Rev. 2 collapses Containment, Eradication, and Recovery into a single phase and Post-Incident Activity into one closing phase; CISSP courseware separates these out for testability, yielding seven phases. The exam tests both the phase ordering and the deliverable each phase produces.

**Layout convention:** rows are ordered chronologically (Phase 1 first, Phase 7 last). Columns progress from identifier (Phase, Name) to action (Key Activity) to deliverable (Typical Output).

| Phase | Name | Key Activity | Typical Output |
|---|---|---|---|
| 1 | Preparation | Establish IR capability [s1]<br>Equip IR team with tooling [s1] | IR plan [s1]<br>IR toolkit [s1] |
| 2 | Detection & Analysis | Identify potential incident [s1]<br>Characterize incident scope [s1] | Incident classification [s1] |
| 3 | Containment | Limit scope of ongoing damage [s1] | Isolated affected systems [s1] |
| 4 | Eradication | Remove threat from environment [s1] | Cleaned systems [s1]<br>Removed malicious artifacts [s1] |
| 5 | Recovery | Restore systems to production [s1] | Validated production systems [s1] |
| 6 | Post-incident | Document incident details [s1] | Incident report [s1] |
| 7 | Lessons learned | Identify improvements to capability [s1] | Updated IR plan [s1]<br>Updated IR processes [s1] |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. No parentheticals in cells. The phase-name column carries the phase title; the deliverable column lists what the phase produces. Both reference the same incident but at different abstraction levels.
- **Tag 7.6 retained from stub.** Matches (ISC)² 2024 outline §7.6 *Conduct incident management*. Sibling Concepts: `containment-strategies.md` (Phase 3 detail), `evidence-handling-chain.md` (Phase 2 forensic process), `forensics-artifact-types.md` (Phase 2 data sources).
- **Why seven phases when NIST SP 800-61 Rev. 2 lists four.** NIST SP 800-61 Rev. 2's four phases are: Preparation; Detection and Analysis; Containment, Eradication, and Recovery; Post-Incident Activity [s1]. CISSP courseware breaks the third into three (Containment/Eradication/Recovery) and the fourth into two (Post-incident/Lessons learned), yielding seven. NIST SP 800-61 Rev. 3 (draft) restructures these phases further but the seven-phase decomposition remains the most-tested CISSP framing.
- **Post-incident vs. Lessons learned.** Some references collapse these into one. The stub author separated them because the *artifact* differs: Post-incident produces an incident report (descriptive — what happened); Lessons learned produces an updated IR plan and process (corrective — what we will do differently). Treating them as separate phases keeps the deliverable distinction testable.
- **Containment subdivides further.** Phase 3 (Containment) has its own sub-strategies (short-term, long-term, system backup before eradication) documented in `containment-strategies.md`. The CISSP exam may quiz on either layer.
- **Detection & Analysis is where the forensic process anchors.** The forensic evidence-handling chain (`evidence-handling-chain.md`) executes during Phase 2 and continues through Phase 4. Order of volatility (`volatility-order.md`) governs which evidence to collect first within Phase 2's Collection step.
- **Preparation is the only phase that runs continuously.** Phases 2-7 execute per-incident; Phase 1 is ongoing — the IR plan, runbooks, training, and tooling must already exist when an incident occurs. The most common CISSP wrong-answer scenario: trying to *prepare* during an active incident.
- **Gaps marked `[needs source]`:** none — all Facts trace to NIST SP 800-61 framing.

### Tricky distractors

- **Containment vs Eradication.** Containment limits damage spread (isolate the affected system). Eradication removes the threat (clean the malware, kill the persistence). Wrong-answer pattern: conflating them — they're sequential, not synonymous.
- **Eradication vs Recovery.** Eradication cleans the threat; Recovery restores service. Wrong-answer pattern: thinking restoration completes IR. Lessons-learned (Phase 7) closes the loop; without it the next incident reuses the same gaps.
- **NIST 4-phase vs CISSP 7-phase.** NIST SP 800-61 Rev 2 lists *four* phases (Preparation, Detection & Analysis, Containment/Eradication/Recovery as one, Post-Incident Activity). CISSP courseware decomposes into *seven*. Wrong-answer pattern: insisting on one count. Either is acceptable depending on the framework cited.
- **Preparation is continuous.** Phase 1 doesn't happen "during an incident" — it must already exist. Wrong-answer pattern: choosing "Prepare the IR team" when an incident is already underway.
- **Detection requires baseline.** Anomaly detection needs a baseline of normal. Wrong-answer pattern: starting baseline collection during Phase 2 — too late; that's a Phase 1 deliverable.
- **Lessons learned vs Post-incident.** Some references collapse these into one. CISSP courseware separates because the artifacts differ: post-incident produces the report (descriptive); lessons learned updates the IR plan (corrective).

## Engine demo opportunities

- `? | Name → Eradication` → Phase 4
- `Phase 2 | Key Activity → ?` → `Identify potential incident` or `Characterize incident scope`
- `? | Typical Output → Incident report` → Phase 6 / Post-incident
- `Recovery | Typical Output → ?` → `Validated production systems`
- Sequence verification: `Phase 3 → ? → Phase 5` → Phase 4 (Eradication)
- Cross-Row distractor: `Phase 7 | Typical Output → ?` with `Incident report` (Phase 6) as a tempting wrong answer
- Composite Row profile: Preparation across all Columns with `Typical Output` swapped to `Updated IR plan` (Phase 7's value)

## Sources

- `[s1]`: NIST SP 800-61 Rev. 2 *Computer Security Incident Handling Guide*, August 2012 — four-phase IR lifecycle (Preparation; Detection and Analysis; Containment, Eradication, and Recovery; Post-Incident Activity) (retrieved 2026-04-25, https://csrc.nist.gov/pubs/sp/800/61/r2/final). Seven-phase decomposition per CISSP courseware framing.
- `[s2]`: NIST SP 800-61 Rev. 3 (revised IR framework) — for cross-checking that the seven-phase model remains valid against the latest NIST guidance (retrieved 2026-04-25, https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-61r3.pdf)
- `[s3]`: (ISC)² CISSP Certification Exam Outline, effective 2024-04-15, Domain 7 §7.6 *Conduct incident management* (retrieved 2026-04-25, https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline)
