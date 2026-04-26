# Agile Ceremonies

**Domain:** 8 — Software Development Security &nbsp;|&nbsp; **Pattern:** Dimensions &nbsp;|&nbsp; **Tags:** 8.1
**Status:** draft (SME review pending)

The five Scrum ceremonies CISSP candidates are expected to recognize — four formal events from the Scrum Guide [s1] plus Backlog Refinement, which is universally practiced but technically an ongoing activity rather than a formal event. Testing focuses on the cadence (which ceremony is daily vs per-sprint), the purpose (planning vs synchronizing vs reviewing vs reflecting), and the timebox. The sibling `sdlc-models` Concept covers Agile at the model-family level; this Concept covers Scrum's ceremony catalogue specifically.

| Ceremony | purpose | frequency | typical duration | typical attendees | output |
|---|---|---|---|---|---|
| Sprint planning | Define sprint backlog [s1] | Start of sprint [s1] | Up to 8 hours [s1] | Scrum team [s1] | Sprint backlog<br>Sprint goal [s1] |
| Daily standup | Synchronize team progress [s1] | Daily [s1] | 15 minutes [s1] | Developers [s1] | Updated plan<br>Impediments identified |
| Sprint review | Demonstrate completed work [s1] | End of sprint [s1] | Up to 4 hours [s1] | Scrum team<br>Stakeholders [s1] | Stakeholder feedback<br>Updated product backlog |
| Retrospective | Reflect on process [s1] | End of sprint [s1] | Up to 3 hours [s1] | Scrum team [s1] | Process improvements |
| Backlog refinement | Clarify upcoming items | Ongoing | Up to 10 percent of sprint capacity | Product Owner<br>Developers | Refined backlog items |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. **No parentheticals in cells.** Scrum role names (`Product Owner`, `Scrum Master`, `Developers`) are treated as atomic identifiers per the Scrum Guide [s1].
- **"Daily standup" vs "Daily Scrum".** The Scrum Guide [s1] calls this event "Daily Scrum." Industry practice calls it "standup" because participants traditionally stand to keep it short. Both refer to the same ceremony; CISSP testing uses both terms interchangeably.
- **Scrum team composition.** The Scrum Team consists of one Product Owner, one Scrum Master, and Developers (the 2020 Scrum Guide dropped the term "Development Team" and simplified to "Developers"). When a cell lists "Scrum team" as attendees, it means all three roles; cells listing specific roles (e.g., "Developers" for Daily Standup) reflect Scrum Guide rules about who the event is *for*, even if other roles may observe.
- **Timeboxes are maximums.** All Scrum Guide durations are stated as "at most N hours" — shorter is fine; longer violates the framework. The cell values reflect the Scrum Guide maxima for a one-month (4-week) sprint; shorter sprints get proportionally shorter ceremonies (e.g., 4 hours of Sprint Planning for a 2-week sprint).
- **Backlog Refinement is not a formal Scrum event.** [s1] treats Product Backlog refinement as "an ongoing activity to add detail, estimates, and order to items" — not a bounded event with a fixed cadence or attendee list. The cell values reflect common practice (10 percent of sprint capacity; Product Owner + Developers) rather than normative Scrum Guide language. Included as a Row because CISSP testing and practitioner literature both treat it alongside the four formal events.
- **Kanban has no ceremonies.** Pure Kanban (a different Agile methodology) lacks Scrum's time-boxed events; flow is continuous. This Concept is Scrum-specific; "Agile ceremonies" at the CISSP level generally means "Scrum events" because Scrum dominates the practitioner landscape. If exam framing becomes more methodology-generic, an SME could split into per-methodology Concepts.
- **Out of scope for this Concept:** SAFe ceremonies (ART PI Planning, Scrum of Scrums), Kanban cadences (replenishment, delivery), XP practices (pair programming, CI), security-specific Agile ceremonies (threat-modeling standups, secure-code review gates), Scrum role definitions (covered implicitly in the attendees column), Definition of Done / Definition of Ready artifacts.

### Values without a direct public citation

| Cell | Value | Why unsourced |
|---|---|---|
| Daily standup × output | `Updated plan`, `Impediments identified` | Scrum Guide [s1] describes Daily Scrum purpose without pinning specific outputs; these are common-practice phrasings. |
| Sprint review × output | `Stakeholder feedback`, `Updated product backlog` | Same framing — [s1] describes the event; practitioner literature names the outputs. |
| Retrospective × output | `Process improvements` | [s1] describes the event as producing "improvements to be enacted in the next Sprint"; the cell summarizes. |
| Backlog refinement × all cells | — | Not a formal event in the Scrum Guide [s1]; cell values reflect industry convention (Agile Alliance glossary, practitioner texts such as "Essential Scrum"). |

## Engine demo opportunities

- `Daily standup | typical duration → ?` → `15 minutes`
- `Sprint planning | frequency → ?` → `Start of sprint`
- `Retrospective | purpose → ?` → `Reflect on process`
- `? | frequency → End of sprint` → `Sprint review`, `Retrospective` — shared-Value select-all
- `? | frequency → Daily` → `Daily standup`
- `? | typical attendees → Developers` → `Daily standup` (sole-Fact cell), `Backlog refinement` (sub-Fact in multi-Fact cell) — shared-Fact across differently-shaped cells
- `? | purpose → Synchronize team progress` → `Daily standup`
- `Sprint review | typical duration → ?` → `Up to 4 hours`
- Composite Daily standup Row with `typical duration` swapped to `Up to 8 hours` — directly tests the 15-minute timebox (Sprint Planning has the 8-hour maximum, not Daily)
- Composite Retrospective Row with `frequency` swapped to `Daily` — tests cadence recognition (Retro is per-sprint, not daily)
- Composite Sprint planning Row with `purpose` swapped to `Demonstrate completed work` — tests the planning / review distinction (planning sets direction; review shows results)

## Sources

- `[s1]`: Ken Schwaber and Jeff Sutherland, "The Scrum Guide" (November 2020) — canonical specification of Scrum events, roles, and artifacts (retrieved 2026-04-19, https://scrumguides.org/scrum-guide.html)
- `[s2]`: Agile Manifesto, "Manifesto for Agile Software Development" (2001) — foundational Agile reference (retrieved 2026-04-19, https://agilemanifesto.org/)
- `[s3]`: Agile Alliance Glossary — general reference for Agile practices not codified in the Scrum Guide (Backlog Refinement, definitions) (retrieved 2026-04-19, https://www.agilealliance.org/agile101/agile-glossary/)
