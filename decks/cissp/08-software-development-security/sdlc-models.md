# SDLC Models

**Domain:** 8 — Software Development Security &nbsp;|&nbsp; **Pattern:** Dimensions &nbsp;|&nbsp; **Tags:** 8.1
**Status:** draft (SME review pending)

The six SDLC models CISSP candidates are expected to discriminate by iteration style, how security integrates into the lifecycle, and operational characteristics. Waterfall and V-Model are the linear enterprise-era models; Spiral introduced iterative risk-driven development; Agile generalized iteration into short time-boxed sprints; DevOps extended iteration into continuous deployment with ops participation; DevSecOps adds shift-left security to DevOps. Testing focuses on the iteration-style axis and on which models embed security versus bolt it on.

| Model | iteration style | security integration approach | typical phase count | strengths | weaknesses |
|---|---|---|---|---|---|
| Waterfall | Linear | Late | 5 | Clear requirements<br>Good documentation | Inflexible<br>Late defect discovery |
| V-Model | Linear paired | Per-phase testing | 8 | Early test planning<br>Test traceability | Inflexible<br>Late defect discovery |
| Spiral | Iterative | Risk analysis per iteration | Variable | Risk-focused<br>Iterative refinement | Complex<br>Management overhead |
| Agile | Iterative [s1] | Embedded in sprints | Variable | Adaptive<br>Frequent delivery [s1] | Documentation light<br>Scope volatility |
| DevOps | Continuous | Bolt-on | Continuous | Fast delivery<br>Operational feedback | Security afterthought<br>Tooling complexity |
| DevSecOps | Continuous | Shift-left [s2] | Continuous | Security throughout<br>Automated scanning [s2] | Tool sprawl<br>Cultural change required |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. **No parentheticals in cells.** Model-specific deployment details (sprint length in Agile, canary vs blue-green in DevOps) live in sibling Concepts.
- **Linear vs Iterative vs Continuous.** The three canonical iteration styles separate the six models cleanly: Waterfall and V-Model are Linear (one pass from requirements to maintenance); Spiral and Agile are Iterative (repeated passes with refinement); DevOps and DevSecOps are Continuous (no discrete phases — ongoing integration, delivery, and operations). A question asking "which of these is a continuous-delivery model" points to DevOps or DevSecOps specifically.
- **V-Model "Linear paired".** V-Model is structurally linear but pairs each development phase with a corresponding verification/test phase, producing the characteristic V-shape. The `typical phase count = 8` reflects four development/test pairs (Requirements/Acceptance Test, High-level Design/System Test, Low-level Design/Integration Test, Implementation/Unit Test). Some sources diagram 10 phases (adding Maintenance and Operations); treat ±1-2 as source-dependent.
- **Spiral is the risk-driven ancestor of Agile.** Spiral (Boehm 1988) introduced the concept of repeated risk-analysis iterations, each producing a working increment. Agile generalized the iteration idea into short time-boxed sprints without requiring explicit risk analysis. Spiral is rare in modern practice but remains exam-testable as the canonical "iterative risk-driven" model.
- **Agile is an umbrella.** Scrum, Kanban, XP, SAFe are all Agile methodologies sharing the Iterative pattern. The `agile-ceremonies` Concept covers Scrum-specific ceremonies; the `sdlc-models` Concept treats Agile at the model-family level.
- **DevOps without security = "bolt-on."** DevOps as originally formulated emphasized collapsing development and operations silos, not security. Security teams historically reviewed post-deployment or via external audits — hence "bolt-on." DevSecOps explicitly integrates security into the pipeline ("shift-left") via automated SAST/DAST/SCA scanning in CI/CD, policy-as-code, threat modeling during design sprints, etc.
- **Shift-left.** Moving security activities earlier in the lifecycle. Instead of pen testing after release (right-shifted), DevSecOps runs SAST on every commit (maximally left-shifted). Covered at category level here; specific shift-left activities live in `security-activities-by-phase` and `source-code-analysis-types`.
- **Out of scope for this Concept:** specific Agile ceremonies (separate Concept — `agile-ceremonies`), Waterfall phase-by-phase detail (separate Concept — `waterfall-phases`), CI/CD pipeline stages (separate Concept — `ci-cd-pipeline-stages`), security-activity-per-phase mapping (separate Concept — `security-activities-by-phase`), software maturity models (separate Concept — `software-maturity-models`).

### Tricky distractors

- **Waterfall vs V-Model.** Both are linear; V-Model adds paired test phases. Wrong-answer pattern: claiming V-Model is iterative because of its V-shape — the V is structural pairing, not iteration.
- **Agile vs DevOps.** Agile = iterative sprints. DevOps = continuous delivery + ops integration. Wrong-answer pattern: treating them as synonyms — Agile can exist without DevOps and DevOps practices apply across iteration styles.
- **DevOps vs DevSecOps.** DevSecOps adds shift-left security; DevOps alone does not. Wrong-answer pattern: claiming DevOps inherently includes security — only DevSecOps does, hence the *Sec*.
- **Shift-left meaning.** Moving security activities *earlier* in the lifecycle (design, commit time). Wrong-answer pattern: claiming shift-left means moving security to the *left* organizationally (e.g., to the security team) — it's about timing, not org chart.
- **Spiral is risk-driven, not just iterative.** Each Spiral loop has explicit risk analysis. Wrong-answer pattern: equating Spiral and Agile — Agile drops the explicit risk-analysis gate.
- **Linear models discover defects late.** Waterfall and V-Model find issues in test or after release. Wrong-answer pattern: claiming Waterfall provides early defect discovery — it doesn't, that's a key driver toward Agile/DevSecOps.

### Values without a direct public citation

Most cells in this table reflect widely-accepted CISSP pedagogical framing rather than single traced citations. The foundational model papers (Royce 1970 for Waterfall, Boehm 1988 for Spiral, the Agile Manifesto for Agile, the DevOps Handbook for DevOps, DHS / DISA guidance for DevSecOps) are known authorities but were not fetched primary-source during this research pass. An SME validating this Concept should cross-check against each model's originating source.

| Column | Models affected | Notes |
|---|---|---|
| iteration style | Waterfall, V-Model, Spiral, DevOps | CISSP-pedagogical categorization. Agile is sourced via [s1]; DevSecOps via [s2]. |
| security integration approach | Waterfall, V-Model, Spiral, Agile, DevOps | "Late," "Per-phase testing," "Risk analysis per iteration," "Embedded in sprints," "Bolt-on" — pedagogical summaries, not direct quotes. DevSecOps "Shift-left" sourced via [s2]. |
| typical phase count | All models | Model-dependent; V-Model count varies 8-10 across sources; Continuous / Variable are category labels, not quantities. |
| strengths / weaknesses | All models | CISSP / industry consensus framings rather than quotations from the originating model papers. |

## Engine demo opportunities

- `Waterfall | iteration style → ?` → `Linear`
- `Agile | iteration style → ?` → `Iterative`
- `DevSecOps | security integration approach → ?` → `Shift-left`
- `? | iteration style → Iterative` → `Spiral`, `Agile` — shared-Value select-all
- `? | iteration style → Continuous` → `DevOps`, `DevSecOps` — shared-Value select-all
- `? | typical phase count → Variable` → `Spiral`, `Agile` — shared-Value select-all
- `? | typical phase count → Continuous` → `DevOps`, `DevSecOps` — shared-Value select-all
- `? | weaknesses → Inflexible` → `Waterfall`, `V-Model` — shared-Fact in multi-Fact cells
- `? | security integration approach → Late` → `Waterfall`
- `? | security integration approach → Shift-left` → `DevSecOps`
- Composite DevOps Row with `security integration approach` swapped to `Shift-left` — directly tests the DevOps / DevSecOps distinction (shift-left is what makes DevSecOps *Sec*)
- Composite Waterfall Row with `iteration style` swapped to `Iterative` — tests the linear-vs-iterative boundary (Waterfall is defining-ly linear)
- Composite Agile Row with `typical phase count` swapped to `5` — tests that Agile has no fixed phase count (it's sprint-cycled, not phase-counted)

## Sources

- `[s1]`: Agile Manifesto, "Manifesto for Agile Software Development" (2001, retrieved 2026-04-19, https://agilemanifesto.org/)
- `[s2]`: NIST SP 800-218, "Secure Software Development Framework (SSDF) Version 1.1" — general reference for secure-SDLC integration across modern iteration styles (February 2022, retrieved 2026-04-19, https://csrc.nist.gov/publications/detail/sp/800-218/final)
- `[s3]`: NIST SP 800-160 Volume 1 Rev 1, "Engineering Trustworthy Secure Systems" — general SDLC engineering reference (November 2022, retrieved 2026-04-19, https://csrc.nist.gov/publications/detail/sp/800-160/vol-1-rev-1/final)
