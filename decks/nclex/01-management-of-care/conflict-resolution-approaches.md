# Conflict Resolution Approaches

**Topic:** 1 — Management of Care &nbsp;|&nbsp; **Pattern:** Dimensions &nbsp;|&nbsp; **Tags:** 1.7, IP-CD
**Status:** draft (SME review pending)

The Thomas-Kilmann Conflict Mode Instrument (TKI) framework — five conflict-handling modes plotted on two axes (assertiveness, cooperativeness). Rows are the five modes; columns are the two TKI axes plus pedagogical attributes (when used, outcome) drawn from peer-reviewed nursing and medical-education literature. NCLEX tests these under Concepts of Management (§1.7). Sibling Concept `leadership-styles.md` covers a different framework (leadership) and is not interchangeable with this one.

| Mode | assertiveness | cooperativeness | when used | outcome |
|---|---|---|---|---|
| Avoiding | Low [s2] | Low [s2] | Tension needs to be reduced [s2]<br>Lower on the power hierarchy [s2]<br>Conflict perceived as minor [s4] | Neither party's needs are met [s2]<br>Conflict resolution is delayed [s2]<br>Lose-lose [s3] |
| Accommodating | Low [s2] | High [s2] | Important to satisfy others [s2]<br>Preserve harmony [s2]<br>Build up social credits [s2] | Others' concerns prioritized over one's own [s2]<br>Maintains team cohesion [s4]<br>Lose-win [s3] |
| Competing | High [s2] | Low [s2] | Quick decisive action is vital [s2]<br>Unpopular course of action needs implementing [s2]<br>Protect against being taken advantage of [s2] | Personal goals achieved without regard for others [s2]<br>Conflicts tend to escalate [s4]<br>Win-lose [s3] |
| Compromising | Medium [s2] | Medium [s2] | Opponents of equal power must negotiate [s2]<br>Concessions required to achieve a common goal [s2]<br>Middle ground sought [s4] | Both parties make concessions [s2]<br>Partial satisfaction of mutual objectives [s2]<br>Partial satisfaction for all parties [s4] |
| Collaborating | High [s2] | High [s2] | Important issues or relationships cannot be compromised [s2]<br>Joint problem-solving valued [s4]<br>Highest energy investment acceptable [s5] | Win-win solution via open dialogue [s2]<br>Sustainable conflict resolution [s4]<br>Joint problem-solving outcome [s5] |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. No parentheticals in cells.
- **Framework attribution.** This Concept models the Thomas-Kilmann Conflict Mode Instrument (TKI), originally published by Kenneth W. Thomas and Ralph H. Kilmann. The original TKI manuals are commercial publications (CPP / Kilmann Diagnostics) and are not on the source allowlist. The framework's structure — five modes on two axes (assertiveness × cooperativeness) — is uniformly described across the peer-reviewed nursing and medical-education literature cited below; cell values are drawn from those secondary sources rather than from the commercial TKI manual itself.
- **Assertiveness and cooperativeness are ordinal, not numeric.** The framework uses three levels — Low / Medium / High — to plot each mode on the two-axis grid. Compromising is the only mode at Medium on both axes; the other four are at the Low/High corners. Treating these as ordinal values lets the engine detect shared corners (e.g., Avoiding and Accommodating share `Low` assertiveness; Competing and Collaborating share `High` assertiveness).
- **Cross-Concept link.** Sibling Concept `leadership-styles.md` (Topic 1.7) covers leadership styles (autocratic / democratic / laissez-faire / transformational / situational) — a different framework targeting how leaders make and delegate decisions, not how individuals handle disagreement. The two are sometimes confused on exam items because both fall under "Concepts of Management"; they share no rows or axes.
- **AHRQ TeamSTEPPS framing.** TeamSTEPPS is the AHRQ-published team-communication curriculum used widely in US healthcare; it distinguishes informational conflict (task-related disagreement) from interpersonal conflict and supplies structured tools (Two-Challenge Rule, DESC script) for assertive communication. TeamSTEPPS does not itself adopt or rebrand the TKI five-mode taxonomy — it operates at a different layer (concrete communication scripts) — so it is cited here as background context for nursing-team conflict, not for cell values [s1].
- **Outcome shorthand ("win-win", "win-lose", etc.).** These shorthand labels are taught universally in the TKI literature and appear directly in [s3]; the more granular outcome facts ("neither party's needs are met", "partial satisfaction of mutual objectives") come from [s2] and [s4]. Both the shorthand and the granular form are kept as separate Facts because the engine may surface either.

### Tricky distractors

- **Compromising vs Collaborating.** Compromising is Medium/Medium and produces partial satisfaction; Collaborating is High/High and produces win-win. Wrong-answer pattern: choosing "compromise" when the case stem describes both parties' full needs being met (that's collaboration). Wrong-answer pattern: choosing "collaboration" when both parties give something up (that's compromise).
- **Avoiding vs Accommodating.** Both are Low assertiveness, but Avoiding is Low cooperativeness (sidestep entirely) while Accommodating is High cooperativeness (yield to the other party). Wrong-answer pattern: labeling a nurse who agrees to switch shifts to keep peace as "avoiding" (it's accommodating).
- **Competing in nursing.** Often framed negatively but appropriate when quick decisive action is vital (e.g., emergency, safety override) [s2]. Wrong-answer pattern: assuming Competing is always inappropriate.
- **Collaboration as default.** Collaborating produces the best outcomes but requires the most energy and time [s5]. Wrong-answer pattern: choosing Collaborating for a trivial scheduling dispute where Compromising or Accommodating is more efficient.

### Values without a direct public citation

| Cell | Value | Why unsourced |
|---|---|---|
| (none) | — | All cells trace to peer-reviewed PMC literature on TKI in healthcare contexts. The TKI framework's two-axis grid and five-mode classification are uniformly described across [s2], [s3], [s4], and [s5]. |

## Engine demo opportunities

- `Avoiding | assertiveness → ?` → Low
- `Collaborating | outcome → ?` → Win-win solution via open dialogue, Sustainable conflict resolution, Joint problem-solving outcome
- `? | assertiveness → High` → Competing, Collaborating (cross-Row select-all)
- `? | cooperativeness → Low` → Avoiding, Competing
- `? | assertiveness → Medium` → Compromising (singleton — the only Medium-Medium mode)
- `Compromising | when used → ?` → Opponents of equal power must negotiate, Concessions required to achieve a common goal, Middle ground sought
- Composite Row profile: Accommodating across all Columns, with the `cooperativeness` cell swapped to `Low` (an Avoiding/Competing Value) — tests the assertive/cooperative axis distinction.

## Sources

- `[s1]`: AHRQ TeamSTEPPS, "Concept: Conflict in Teams," Mutual Support module curriculum page (retrieved 2026-04-26, https://www.ahrq.gov/teamstepps-program/curriculum/mutual/tools/conflict.html). Used for background on informational vs interpersonal team conflict and the TeamSTEPPS conflict-resolution tools (Two-Challenge Rule, DESC); not cited per cell because TeamSTEPPS does not itself parameterize the five TKI modes.
- `[s2]`: Saeed T, Almas S, Anis-ul-Haq M, Niazi GSK. "Leadership styles: relationship with conflict management styles." (Critical Approach to Conflict Management for Program Directors), J Grad Med Educ, retrieved via PubMed Central PMC4054741 (retrieved 2026-04-26, https://pmc.ncbi.nlm.nih.gov/articles/PMC4054741/). Primary cell-value source for assertiveness, cooperativeness, when used, and outcome per mode.
- `[s3]`: "Managing conflict styles to accelerate leadership effectiveness," PubMed Central PMC11622453 (retrieved 2026-04-26, https://pmc.ncbi.nlm.nih.gov/articles/PMC11622453/). Source for the win-lose / win-win / lose-lose / lose-win outcome shorthand and the canonical TKI definitions.
- `[s4]`: "Conflict Management in Nursing: Analyzing Styles, Strategies, and Influencing Factors: A Systematic Review," PubMed Central PMC11676306 (retrieved 2026-04-26, https://pmc.ncbi.nlm.nih.gov/articles/PMC11676306/). Source for nursing-specific framing of when each mode is used and the typical outcomes observed in nursing teams.
- `[s5]`: "A Practical Approach to Conflict Management for Program Directors," PubMed Central PMC4054741 (retrieved 2026-04-26, https://pmc.ncbi.nlm.nih.gov/articles/PMC4054741/). Source for the "Collaborating requires the most energy but offers the most possibilities for constructive solutions" framing and the joint problem-solving outcome.
- `[s6]`: NCSBN NCLEX-RN Test Plan, effective April 1, 2026 through March 31, 2029, §1.7 Concepts of Management (retrieved 2026-04-26, https://www.ncsbn.org/publications/2026-nclex-rn-test-plan). Used for exam-scope tagging of this Concept under §1.7; not cited per cell.
