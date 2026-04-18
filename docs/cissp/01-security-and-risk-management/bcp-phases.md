# BCP Phases (NIST SP 800-34)

**Domain:** 1 — Security and Risk Management &nbsp;|&nbsp; **Pattern:** Ordered &nbsp;|&nbsp; **Tags:** 1.8
**Status:** draft (SME review pending)

The seven-phase Business Continuity Planning process from NIST SP 800-34. Each phase has a name, an activity that defines what happens, and a deliverable that comes out the other side.

**Layout convention:** rows are phases in sequence. Columns are attributes of each phase, left → right from terse identifier (Name) through process (Key Activity) to artifact (Typical Output). Each `<br>`-separated item is one atomic fact.

| Phase | Name | Key Activity | Typical Output |
|---|---|---|---|
| 1 | Develop policy statement | Define planning scope<br>Define roles<br>Define resources | BCP policy document |
| 2 | Conduct BIA | Identify critical systems<br>Assess disruption impact | BIA report |
| 3 | Identify preventive controls | Determine controls that reduce disruption | Preventive control list |
| 4 | Create contingency strategies | Map RTOs to recovery options | Recovery strategy decisions |
| 5 | Develop ISCP | Document procedures<br>Document roles<br>Document responsibilities | Written contingency plan |
| 6 | Plan testing, training, and exercises | Validate plan via test exercises | Test reports<br>Lessons learned document |
| 7 | Plan maintenance | Schedule plan reviews<br>Schedule plan updates | Maintenance schedule<br>Version-controlled plan |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic fact. No compound "and"-joined facts.
- **Phase 6 Name retains "and"** because the official NIST SP 800-34 phase title is "Plan Testing, Training, and Exercises." Names and identifiers are exempt from atomization (see knowledge-map.md).
- This is the **NIST SP 800-34** seven-phase model. Some textbooks teach a four-phase simplification (Initiate, Develop, Implement, Maintain) and ISO 22301 frames it differently. Add as separate Concepts if we want to test cross-methodology comparison.
- Common exam trap: confusing **BCP** (the planning process) with **BIA** (a single phase output) or **DRP** (the IT-centric subset). Worth a separate disambiguation Concept.
- DR test types in Phase 6 (tabletop, walkthrough, parallel, full-interruption) deserve their own Concept under Domain 7 (Security Operations).
- Engine demo opportunities:
  - `Phase 4 | Name → ?` → Create contingency strategies.
  - `? | Typical Output → BIA report` → Phase 2.
  - `Phase 5 | Key Activity → ?` → Document procedures / Document roles / Document responsibilities (multi-Fact cell).
  - Sequence (adjacency): `Phase (n+1 where Phase n | Name → Conduct BIA) | Name → ?` → Identify preventive controls.
