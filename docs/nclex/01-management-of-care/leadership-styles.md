# Leadership Styles

**Topic:** 1 — Management of Care &nbsp;|&nbsp; **Pattern:** Dimensions &nbsp;|&nbsp; **Tags:** 1.7, IP-CD
**Status:** draft (SME review pending)

The five leadership styles most commonly compared on NCLEX under "Concepts of Management." Rows are styles; columns are shared attributes drawn from peer-reviewed nursing literature (PMC) and the Lewin/Lippitt/White 1939 framework that anchors the three classical styles. Transformational leadership is treated as a Bass-derived style widely studied in nursing; situational leadership is the Hersey/Blanchard model. Row labels with slash (`Authoritarian/Autocratic`, `Democratic/Participative`) are canonical synonym pairs in the source literature and remain whole as a canonical-name exemption to atomicity.

| Style | decision locus | when effective | typical drawback | example scenario |
|---|---|---|---|---|
| Authoritarian/Autocratic | Leader alone [s2][s4] | Emergency situation requiring rapid decision [s4]<br>Crisis with no time for input [s2] | Staff opinions disregarded [s4]<br>Blame-focused culture [s4]<br>Productivity drops when leader leaves the room [s1] | Code blue resuscitation directed by team leader [s1][s4] |
| Democratic/Participative | Leader and group together [s1] | Routine unit decisions where buy-in matters [s1]<br>Quality-improvement projects [s1] | Slower decision-making than autocratic [s1]<br>Not suited to emergencies [s1] | Staff meeting to revise unit policy with input from nurses [s1] |
| Laissez-faire | Group without leader input [s1][s3] | Highly experienced and self-directed team [s1] | Negative correlation with nurse job satisfaction [s3]<br>Staff lack guidance [s3]<br>Lowest productivity of the three classical styles [s1] | Charge nurse absent from the unit and not delegating [s1][s3] |
| Transformational | Leader and team co-create vision [s5][s6] | Standard hospital environment for retention and engagement [s5]<br>Mentoring novice nurses [s6] | Demanding style requiring time investment [s5]<br>May underperform versus transactional in high-pressure critical care [s5]<br>Managers overestimate own use [s6] | Nurse manager articulates unit vision and develops staff individually [s5][s6] |
| Situational | Leader adapts based on follower readiness [s7] | Mixed-experience team with varying skill levels [s7]<br>Onboarding new nurses alongside experienced staff [s7] | Diagnosis can be biased by leader's subjective judgment [s7]<br>Frequent style changes erode team trust [s7] | Charge nurse uses directive style for new graduate and delegating style for experienced RN on the same shift [s7] |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. No parentheticals in cells.
- **Row-label slash exemption.** `Authoritarian/Autocratic` and `Democratic/Participative` are canonical synonym pairs in the Lewin/Lippitt/White 1939 source language and subsequent nursing literature. They are kept whole as a canonical-name exemption to the atomicity rule (knowledge-map § Atomicity, "Names and identifiers are exempt").
- **Example-scenario column is synthesis-by-direct-derivation.** Each `example scenario` cell describes a clinical or unit situation that is a direct mechanical derivation from the cited source's characterization of the style — e.g., Lewin/Lippitt/White's autocratic style was described as the leader holding "all decision power and essentially dictates what the group should do" [s1], and the example scenario "Code blue resuscitation directed by team leader" is a direct application of that characterization to a nursing context. The scenarios are not verbatim from any single source but follow mechanically from the sourced style framework. SME may rephrase.
- **Lewin/Lippitt/White anchor.** The first three styles (Authoritarian/Autocratic, Democratic/Participative, Laissez-faire) are the original 1939 framework [s1]; the productivity findings (autocratic 70% with leader / 29% without; democratic 50% / 46%; laissez-faire 33%) appear as published context for the "typical drawback" cell on Authoritarian/Autocratic and Laissez-faire.
- **Transformational vs transactional.** Transactional leadership is a fourth Bass-derived style (rewards / corrective action [s2]) commonly contrasted with transformational. It is excluded from this Concept's Rows because the T1 README §1.7 spec lists five styles and does not include transactional. If SME wants it added later, propose `add row` mode.
- **Passive-avoidant.** Sometimes treated as distinct from laissez-faire in the Bass full-range model [s2]. Excluded here — collapsed into Laissez-faire per the canonical-synonym pattern, which is how nursing pedagogy and the Lewin framework treat absent leadership.
- **AONL Nurse Leader Core Competencies.** AONL publishes a competency framework (Leader Within anchoring Business Skills, Communication and Relationship Building, Knowledge of the Health Care Environment, Professionalism, Leadership) [s8]. AONL frames competencies, not the five-style typology, so it does not anchor cell-level Facts here; cited as professional-organization context for nurse-leader scope.

### Tricky distractors

- **Autocratic vs transformational in emergencies.** Autocratic is correct for code/crisis where rapid single-leader decisions are required [s4]. Wrong-answer pattern: choosing transformational for a code because it is "the best" style — transformational underperforms in high-pressure critical-care moments [s5].
- **Democratic vs laissez-faire.** Both involve staff input, but democratic has the leader actively guiding while laissez-faire has the leader absent. Wrong-answer pattern: labeling a hands-off charge nurse as "democratic."
- **Laissez-faire and job satisfaction.** Laissez-faire shows negative correlation with nurse job satisfaction in all studies reviewed [s3]. Wrong-answer pattern: assuming "freedom = satisfaction."
- **Situational vs no style.** Situational is intentional adaptation based on follower readiness diagnosis [s7]; it is not "switching randomly." Wrong-answer pattern: characterizing inconsistent management as situational.

### Values without a direct public citation

| Cell | Value | Why unsourced |
|---|---|---|
| Authoritarian/Autocratic × example scenario | Code blue resuscitation directed by team leader | Synthesis-by-direct-derivation from [s1][s4] (autocratic style + emergency-effectiveness pairing). No primary source names "code blue" as the canonical example; it is the standard nursing-pedagogy application of autocratic-in-emergency. SME may rephrase. |
| Democratic/Participative × example scenario | Staff meeting to revise unit policy with input from nurses | Synthesis-by-direct-derivation from [s1] (group decision-making characterization). No primary source names this specific scenario. |
| Laissez-faire × example scenario | Charge nurse absent from the unit and not delegating | Synthesis-by-direct-derivation from [s1][s3] (absence-of-leadership characterization). No primary source names the charge-nurse absence scenario specifically. |
| Transformational × example scenario | Nurse manager articulates unit vision and develops staff individually | Synthesis-by-direct-derivation from [s5][s6] (vision + individual consideration components). |
| Situational × example scenario | Charge nurse uses directive style for new graduate and delegating style for experienced RN on the same shift | Synthesis-by-direct-derivation from [s7] (M1/M2/M3 readiness-level diagnosis applied to a nursing shift). |

## Engine demo opportunities

- `Authoritarian/Autocratic | when effective → ?` → Emergency situation requiring rapid decision, Crisis with no time for input
- `Laissez-faire | typical drawback → ?` → Negative correlation with nurse job satisfaction, Staff lack guidance, Lowest productivity of the three classical styles
- `? | decision locus → Leader alone` → Authoritarian/Autocratic
- `? | when effective → Mixed-experience team with varying skill levels` → Situational
- `Transformational | typical drawback → ?` → Demanding style requiring time investment, May underperform versus transactional in high-pressure critical care, Managers overestimate own use
- Composite Row profile: Democratic/Participative across all Columns, with the `decision locus` cell swapped to `Leader alone` (an Authoritarian Value) — tests style discrimination on the defining attribute.

## Sources

- `[s1]`: Billig JS. The Lewin, Lippitt and White study of leadership and "social climates" revisited. Group, 1994 (PubMed entry, retrieved 2026-04-26, https://pubmed.ncbi.nlm.nih.gov/8181895/). Anchors the three classical styles (autocratic, democratic, laissez-faire) and group productivity findings.
- `[s2]`: Ystaas LMK et al. Leadership styles and transformational leadership skills among nurse leaders in Qatar, a cross-sectional study. PMC10170951 (retrieved 2026-04-26, https://pmc.ncbi.nlm.nih.gov/articles/PMC10170951/). Used for autocratic decision-making characterization and full-range model context.
- `[s3]`: Specchia ML et al. Leadership Styles and Nurses' Job Satisfaction. Results of a Systematic Review. PMC7915070 (retrieved 2026-04-26, https://pmc.ncbi.nlm.nih.gov/articles/PMC7915070/). Used for laissez-faire negative-correlation finding and full-range style definitions.
- `[s4]`: Sfantou DF et al. Importance of Leadership Style towards Quality of Care Measures in Healthcare Settings: A Systematic Review. PMC5746707 (retrieved 2026-04-26, https://pmc.ncbi.nlm.nih.gov/articles/PMC5746707/). Used for autocratic-in-emergency framing and drawback language.
- `[s5]`: Boamah SA et al. The Impact of Transformational Leadership Style on Nurses' Job Satisfaction: An Integrative Review. PMC10483966 (retrieved 2026-04-26, https://pmc.ncbi.nlm.nih.gov/articles/PMC10483966/). Used for transformational decision locus, effectiveness, and drawback in critical care.
- `[s6]`: Transformational Leadership and Nursing Retention: An Integrative Review. PMC11283332 (retrieved 2026-04-26, https://pmc.ncbi.nlm.nih.gov/articles/PMC11283332/). Used for the five components of transformational leadership and the manager-overestimation finding.
- `[s7]`: Situational leadership theory in nursing management: a scoping review. PMC11660562 (retrieved 2026-04-26, https://pmc.ncbi.nlm.nih.gov/articles/PMC11660562/). Used for Hersey/Blanchard situational definition, M1/M2/M3 readiness-level diagnosis, and drawbacks.
- `[s8]`: AONL Nurse Leader Core Competencies (retrieved 2026-04-26, https://www.aonl.org/resources/nurse-leader-competencies). Professional-organization framework for nurse-leader scope; cited in Notes only, not at cell level.
- `[s9]`: NCSBN NCLEX-RN Test Plan, effective April 1, 2026 through March 31, 2029, §1.7 Concepts of Management (retrieved 2026-04-26, https://www.ncsbn.org/publications/2026-nclex-rn-test-plan). Tag-mapping anchor for sub-objective 1.7.
