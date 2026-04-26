# Training Program Phases

**Domain:** 1 — Security and Risk Management &nbsp;|&nbsp; **Pattern:** Ordered &nbsp;|&nbsp; **Tags:** 1.13
**Status:** draft (SME review pending)

The four sequential phases of a security awareness and training program lifecycle, per NIST SP 800-50. Each phase produces a deliverable that the next phase depends on. The CISSP exam tests both the ordering and the matchup between phase and deliverable — particularly that *evaluate* (Phase 4) feeds back into *design* (Phase 1) for the next program iteration.

**Layout convention:** rows are ordered chronologically (Phase 1 first, Phase 4 last). Columns progress from identifier (Phase, Name) to action (Key Activity) to deliverable (Typical Output).

| Phase | Name | Key Activity | Typical Output |
|---|---|---|---|
| 1 | Design | Define program scope and objectives [s1] | Approved program plan [s1] |
| 2 | Develop | Build training content per audience [s1] | Training modules and assessments [s1] |
| 3 | Implement | Deliver training to identified audiences [s1] | Completed training records [s1] |
| 4 | Evaluate | Measure program effectiveness [s1] | Evaluation report [s1]<br>Recommendations for next cycle [s1] |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. No parentheticals in cells.
- **Tag 1.13 retained from stub.** Maps to (ISC)² 2024 outline §1.13. Sibling Concept: `training-audiences.md` (who Phase 2 develops content for).
- **NIST SP 800-50 codifies the lifecycle.** *Building an Information Technology Security Awareness and Training Program* (2003) defines the four-phase model used in this Concept. The phases align with general training-development frameworks (ADDIE, Kirkpatrick) but use security-specific language.
- **Design comes first because content depends on objectives.** A common failure mode is jumping to Phase 2 (develop content) without Phase 1 (define what the program should accomplish). The result is content that fills hours but does not move the needle on measurable security behaviors. Phase 1's "Approved program plan" is the contract that anchors the rest.
- **Develop is per-audience.** Phase 2 builds different content for the audiences enumerated in `training-audiences.md` — general user content differs from developer content differs from executive briefings. A program that produces only one body of content is failing Phase 2.
- **Evaluate is more than a survey.** Effectiveness measurement should include *completion* (did people finish?), *learning* (did they pass assessments?), *behavior* (did phishing-click rates drop? did privileged-user policy violations decrease?), and *outcomes* (did security incidents tied to training-addressable causes decrease?). The four levels match Kirkpatrick's training-evaluation model.
- **The cycle restarts with the evaluate output.** Phase 4's "Recommendations for next cycle" Fact is what makes the lifecycle cyclical — the next year's Design phase incorporates lessons from this year's Evaluate phase. Programs that fail to close this loop become stale and lose effectiveness.
- **Phishing simulations are part of evaluate, not implement.** Running a phishing simulation is *measurement* (how many click?) — Phase 4 territory. The followup education when someone clicks is delivery — Phase 3. Don't confuse the simulation itself with the training.
- **Gaps marked `[needs source]`:** none — all Facts trace to NIST SP 800-50 framing.

## Engine demo opportunities

- `? | Name → Develop` → Phase 2
- `Phase 4 | Key Activity → ?` → `Measure program effectiveness`
- `? | Typical Output → Approved program plan` → Phase 1 / Design
- `Implement | Typical Output → ?` → `Completed training records`
- Sequence verification: `Phase 1 → ? → Phase 3` → Phase 2 (Develop)
- Composite Row profile: Design across all Columns with `Typical Output` swapped to `Evaluation report` (Phase 4's value)

## Sources

- `[s1]`: NIST SP 800-50 *Building an Information Technology Security Awareness and Training Program*, October 2003 — four-phase program lifecycle (retrieved 2026-04-26, https://csrc.nist.gov/pubs/sp/800/50/final)
- `[s2]`: (ISC)² CISSP Certification Exam Outline, effective 2024-04-15, Domain 1 §1.13 (retrieved 2026-04-26, https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline)
