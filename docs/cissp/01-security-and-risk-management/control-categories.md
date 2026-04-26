# Control Categories

**Domain:** 1 — Security and Risk Management &nbsp;|&nbsp; **Pattern:** Dimensions &nbsp;|&nbsp; **Tags:** 1.10
**Status:** draft (SME review pending)

The seven control categories CISSP courseware uses to classify security controls by *what role they play in the timeline of an incident*. Some controls operate before an incident (directive, deterrent, preventive); some during or after (detective); some after (corrective, recovery); and one (compensating) substitutes for a missing or impractical primary control. The CISSP exam tests the matchup between control category and incident-timeline role — the most-confused pair is corrective vs. recovery.

| category | definition | timing | example |
|---|---|---|---|
| Directive | Mandate required behavior or process [s1] | Before incident [s1] | Acceptable Use Policy [s1] |
| Deterrent | Discourage attack attempts [s1] | Before incident [s1] | Visible security camera [s1] |
| Preventive | Stop incident from occurring [s1] | Before incident [s1] | Firewall rule [s1] |
| Detective | Identify incident in progress or after [s1] | During or after incident [s1] | IDS alert [s1] |
| Corrective | Remediate the cause after incident [s1] | After incident [s1] | Patch a vulnerability [s1] |
| Recovery | Restore systems and operations to normal [s1] | After incident [s1] | Backup restoration [s1] |
| Compensating | Substitute for a primary control that is missing or impractical [s1] | Variable [s1] | Manual review when automation unavailable [s1] |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. No parentheticals in cells. The repeated `Before incident` Value across Directive/Deterrent/Preventive enables shared-Value detection across rows.
- **Tag 1.10 retained from stub.** Maps to (ISC)² 2024 outline §1.10 *Establish and maintain a security awareness, education, and training program* — partial fit; the more direct sub-objective is §1.4 *Determine compliance and other requirements* or §1.11. Sibling Concept: `control-types.md` (administrative/technical/physical implementation taxonomy, orthogonal to category).
- **Corrective vs. Recovery.** This is the test-favorite distinction. Corrective fixes the *cause* (e.g., patches the exploited vulnerability so it cannot be reused); recovery restores the *systems* (e.g., restores from backup, brings services online). A complete post-incident response runs both: you cannot just restore service and leave the vulnerability unpatched, and you cannot just patch and leave service down.
- **Deterrent vs. Preventive.** Deterrent works by *discouraging* — the attacker sees the control and chooses a different target. Preventive works by *stopping* — the control technically blocks the attempt regardless of attacker intent. A visible security camera is deterrent (someone might still try); a locked door is preventive (it blocks the attempt itself).
- **Compensating is special.** It is not a *kind* of control in the sense the others are; it is a *role* a control can play when the primary control is absent or impractical. PCI DSS, for example, allows compensating controls to substitute for required ones if the substitute provides equivalent protection. Its timing is "variable" because it depends on what it is compensating for.
- **Directive is the doctrinal layer.** Policies, standards, procedures, and guidelines are all directive controls — they tell people what to do. They produce no technical enforcement on their own; their value is in establishing the *expectation* that compliance is mandatory and non-compliance has consequences.
- **A single mechanism can play multiple categories.** A camera is deterrent (visible) AND detective (records evidence) AND corrective evidence (supports prosecution). The category depends on *which role you are asking about*, not on the mechanism itself.
- **Gaps marked `[needs source]`:** none — all Facts are CISSP-canonical control-category framings.

## Engine demo opportunities

- `? | timing → Before incident` → Directive, Deterrent, or Preventive (cross-Row select-all)
- `Recovery | example → ?` → `Backup restoration`
- `? | definition → Substitute for a primary control that is missing or impractical` → Compensating
- `Detective | timing → ?` → `During or after incident`
- `Corrective | example → ?` with `Backup restoration` (Recovery) as a tempting wrong answer
- Composite Row profile: Preventive across all Columns with `timing` swapped to `After incident` (Corrective/Recovery's value)

## Sources

- `[s1]`: NIST SP 800-12 Rev. 1 *An Introduction to Information Security*, June 2017 — control category framing (retrieved 2026-04-26, https://csrc.nist.gov/pubs/sp/800/12/r1/final). Cross-referenced against ISACA / CISSP CBK control-category enumeration.
- `[s2]`: (ISC)² CISSP Certification Exam Outline, effective 2024-04-15, Domain 1 (retrieved 2026-04-26, https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline)
