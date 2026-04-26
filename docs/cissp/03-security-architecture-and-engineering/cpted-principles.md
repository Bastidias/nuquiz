# CPTED Principles

**Domain:** 3 — Security Architecture and Engineering &nbsp;|&nbsp; **Pattern:** Dimensions &nbsp;|&nbsp; **Tags:** 3.8
**Status:** draft (SME review pending)

The four core principles of Crime Prevention Through Environmental Design (CPTED). Each pairs a *principle* with *typical implementation* and *intended outcome*. CPTED applies physical-environment design choices to deter crime — the principle that the *built environment* shapes behavior, not just guards and locks. The CISSP exam tests both the matchup between principle and implementation and the broader concept that physical security is layered through design.

| principle | principle definition | typical implementation | intended outcome |
|---|---|---|---|
| Natural surveillance | Position activity so legitimate users can observe surroundings [s1] | Open sightlines and well-lit areas [s1] | Increase perceived risk to offenders [s1] |
| Natural access control | Channel movement to controlled paths [s1] | Landscape and walkway design directing entry [s1] | Limit unauthorized access opportunities [s1] |
| Territorial reinforcement | Communicate ownership through design cues [s1] | Signage, fencing, paving differentiation [s1] | Discourage unauthorized presence [s1] |
| Maintenance | Maintain space to convey active care [s1] | Prompt repair of damage and graffiti removal [s1] | Avoid broken-windows perception [s1] |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. No parentheticals in cells.
- **Tag 3.8 retained from stub.** Maps to (ISC)² 2024 outline §3.8 *Apply security principles to site and facility design*. Sibling Concepts: `site-selection.md`, `perimeter-controls.md`.
- **CPTED origins.** Coined by C. Ray Jeffery in 1971; further developed by Oscar Newman's *Defensible Space* (1972) which introduced "natural surveillance" and "territorial reinforcement" as design principles. ASIS International and U.S. Department of Justice have published implementation guides.
- **Maintenance as the "broken windows" principle.** A poorly-maintained environment signals to offenders that no one cares — that crime will go unnoticed and unpunished. Conversely, a well-maintained environment signals active stewardship and increases the perceived likelihood of detection. The principle predates and informs the famous "broken windows" theory of criminology.
- **Natural surveillance through architectural choices.** Lobby designs that let receptionists see the entry from their workstations, parking lots with line-of-sight from windows of occupied spaces, and outdoor spaces designed to be visible from indoor occupied areas all implement natural surveillance. Vegetation that obscures sightlines undermines it.
- **Natural access control via landscape.** Hedges, fences, signage, and walkway design can channel pedestrians toward intended entry points without requiring guards or barriers. The principle: most people will follow the easiest path. By designing the easy path to be the one you want them to take, you reduce the rate of unintended entries.
- **Territorial reinforcement signals ownership.** Distinct property boundaries, visible signage ("this is private property"), and design cues that contrast public from semi-private from private space all reinforce territorial claim. People are less likely to commit crimes in spaces that visibly belong to someone watching.
- **CPTED is preventive, not detective.** It reduces the *likelihood* of crime by making the environment less conducive. It does not detect or respond to crime in progress — that requires active controls (CCTV, guards, alarms). CPTED works in layers with active controls; it does not replace them.
- **Limitations.** CPTED's effectiveness varies by crime type. It works well against opportunistic crimes (vandalism, theft of opportunity, casual trespass). It works less well against determined or planned crimes (burglary by professionals, targeted attacks) where offenders are not deterred by ambient design cues.
- **Gaps marked `[needs source]`:** none — all Facts trace to ASIS / DOJ CPTED documentation.

## Engine demo opportunities

- `? | typical implementation → Open sightlines and well-lit areas` → Natural surveillance
- `Maintenance | intended outcome → ?` → `Avoid broken-windows perception`
- `? | principle definition → Channel movement to controlled paths` → Natural access control
- `Territorial reinforcement | typical implementation → ?` → `Signage, fencing, paving differentiation`
- `Natural surveillance | intended outcome → ?` with `Limit unauthorized access opportunities` (Natural access control) as a tempting wrong answer
- Composite Row profile: Natural surveillance across all Columns with `intended outcome` swapped to `Avoid broken-windows perception` (Maintenance's value)

## Sources

- `[s1]`: U.S. Department of Justice, Office of Community Oriented Policing Services *Crime Prevention Through Environmental Design (CPTED)* primer (retrieved 2026-04-26, https://www.ojp.gov/). ASIS International *Crime Prevention Through Environmental Design Guideline* (retrieved 2026-04-26, https://www.asisonline.org/publications--resources/standards--guidelines/)
- `[s2]`: (ISC)² CISSP Certification Exam Outline, effective 2024-04-15, Domain 3 §3.8 (retrieved 2026-04-26, https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline)
