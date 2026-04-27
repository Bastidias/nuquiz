# Waterfall Phases

**Domain:** 8 — Software Development Security &nbsp;|&nbsp; **Pattern:** Ordered &nbsp;|&nbsp; **Tags:** 8.1
**Status:** draft (SME review pending)

The five-phase simplified Waterfall model. Royce 1970 [s1] originally sketched seven phases including a feedback loop; CISSP testing uses the canonical five-phase simplification (Requirements → Design → Implementation → Verification → Maintenance). Paired Concept to `sdlc-models` — this is the phase-level detail; the model-level comparison is in the sibling Concept. Questions typically probe phase ordering, the linear-only flow (no iteration back to earlier phases), and which phase produces which artifact.

**Layout convention:** rows are phases in sequence from initial requirements capture through long-term maintenance. Columns are attributes of each phase ordered left → right from least detail (Name) to most detail (Typical Output).

| Phase | Name | Key Activity | Typical Output |
|---|---|---|---|
| 1 | Requirements | Gather functional requirements<br>Gather non-functional requirements | Requirements specification |
| 2 | Design | Create architecture<br>Create detailed design | Design document<br>Architecture diagram |
| 3 | Implementation | Write code<br>Unit test | Source code<br>Unit test results |
| 4 | Verification | Integration test<br>System test<br>Acceptance test | Test results<br>Defect reports |
| 5 | Maintenance | Fix defects<br>Deploy patches | Patches<br>Updated documentation |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. **No parentheticals in cells.** Compound activities (e.g., "gather and document requirements") are split into separate Facts.
- **Royce's original seven phases.** [s1] diagrammed Waterfall with System Requirements, Software Requirements, Analysis, Program Design, Coding, Testing, Operations. Modern CISSP simplifications collapse System and Software Requirements into "Requirements," merge Analysis and Program Design into "Design," and fold Coding into "Implementation." The five-phase table reflects the simplification; it is not a misreading of Royce.
- **Royce argued against the linear-only flow.** A persistent mis-citation in software engineering culture: Royce's 1970 paper actually recommended iteration and explicitly called the linear approach "risky and invites failure." The "Waterfall" model as taught (linear, no iteration) is the straw-man version Royce was critiquing — not the process he advocated. Worth flagging on the exam only if a question invokes Royce by name; CISSP otherwise tests the idealized linear form.
- **Phase 3 includes Unit test.** Unit testing is part of implementation (the developer who writes code also writes unit tests). Integration, system, and acceptance tests are Phase 4 because they test *across* units and against requirements rather than code-level correctness. This split is one of the more testable phase-boundary distinctions.
- **No feedback loop in pure Waterfall.** Defects discovered in Phase 4 ideally do *not* cycle back to earlier phases; in practice they always do, which is why Waterfall is criticized. CISSP testing uses the idealized no-loop version.
- **Verification vs Validation.** Verification ("are we building the thing right?") is Phase 4's primary concern. Validation ("are we building the right thing?") spans the lifecycle and is arguably best served by Agile-style stakeholder review. Not split into separate Columns here; covered in a sibling V-V Concept if it becomes testable.
- **Maintenance dominates total lifecycle cost.** Industry rule-of-thumb: 60-80% of total software cost is incurred in Phase 5 (maintenance, operations, updates). Out of scope as a cell value because it's not a phase activity; worth flagging for exam-context.
- **Out of scope for this Concept:** V-Model phase detail (separate Concept — `waterfall-phases` covers the linear Waterfall only; V-Model adds test-pair structure), Spiral iterations, Agile sprints, SDLC-security-activity mapping (separate Concept — `security-activities-by-phase`), CI/CD pipeline stages.

### Tricky distractors

- **Unit test is Phase 3; Integration/System/Acceptance are Phase 4.** Different testing boundaries. Wrong-answer pattern: putting all testing in Phase 4 — unit testing belongs with implementation.
- **Waterfall is linear; no feedback loop.** As taught. Wrong-answer pattern: claiming Waterfall iterates back to earlier phases — that's a critique that prompts other models.
- **Royce argued against pure linear flow.** Persistent mis-citation. Wrong-answer pattern: invoking Royce as the originator of the strict linear Waterfall — he criticized that approach.
- **Maintenance dominates lifecycle cost.** 60-80% of total. Wrong-answer pattern: assuming development cost dominates — operational/maintenance cost is much larger over the system lifetime.
- **Verification vs Validation.** Verification = building right; Validation = building right thing. Wrong-answer pattern: collapsing them — they answer different questions.
- **Phase order: Requirements → Design → Implementation → Verification → Maintenance.** Wrong-answer pattern: putting Verification before Implementation — testing requires built code.

### Values without a direct public citation

| Cell | Notes |
|---|---|
| All cells | Royce 1970 [s1] provides the historical model; modern cell values reflect the ISO/IEC/IEEE 12207 and NIST SP 800-160 [s2] framings of software lifecycle processes without being direct quotations. "Unit test in Phase 3" vs "Integration/System/Acceptance in Phase 4" is CISSP-pedagogical consensus; the precise phase-boundary for testing varies by source (some place all testing in Phase 4). |

## Engine demo opportunities

- `Phase 1 | Name → ?` → `Requirements`
- `Phase 3 | Name → ?` → `Implementation`
- `Phase 5 | Name → ?` → `Maintenance`
- `Phase 2 | Typical Output → ?` → `Design document`, `Architecture diagram`
- `? | Name → Verification` → `Phase 4`
- `? | Key Activity → Write code` → `Phase 3`
- `? | Key Activity → Integration test` → `Phase 4` (sub-Fact in multi-Fact cell)
- `? | Typical Output → Requirements specification` → `Phase 1`
- Sequence (adjacency): `Phase following (Phase n | Name → Requirements) | Name → ?` → `Design`
- Sequence (adjacency): `Phase following (Phase n | Name → Implementation) | Name → ?` → `Verification`
- Composite Phase 1 Row with `Typical Output` swapped to `Source code` — directly tests the phase/artifact pairing (source code comes from Phase 3, not Phase 1)
- Composite Phase 3 Row with `Key Activity` swapped to `Integration test` — tests the unit/integration testing boundary (unit testing is Phase 3, integration testing is Phase 4)
- Composite Phase 5 Row with `Name` swapped to `Verification` — tests final-phase recognition (Maintenance follows Verification; Verification is not the last phase)

## Sources

- `[s1]`: Winston W. Royce, "Managing the Development of Large Software Systems," Proceedings of IEEE WESCON 26 (August 1970), pp. 1-9 — original Waterfall paper (retrieved 2026-04-19, https://www.praxisframework.org/files/royce1970.pdf)
- `[s2]`: NIST SP 800-160 Volume 1 Rev 1, "Engineering Trustworthy Secure Systems" — modern SDLC engineering reference (November 2022, retrieved 2026-04-19, https://csrc.nist.gov/publications/detail/sp/800-160/vol-1-rev-1/final)
- `[s3]`: ISO/IEC/IEEE 12207:2017, "Systems and software engineering — Software life cycle processes" — international standard defining lifecycle phases and activities (paywalled; cited as authoritative reference only, retrieved 2026-04-19, https://www.iso.org/standard/63712.html)
