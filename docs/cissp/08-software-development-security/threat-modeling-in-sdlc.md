# Threat Modeling in SDLC

**Domain:** 8 — Software Development Security &nbsp;|&nbsp; **Pattern:** Aspects &nbsp;|&nbsp; **Tags:** 8.1, 1.11
**Status:** draft (SME review pending)

Threat modeling is the Design-phase security activity that identifies, enumerates, and prioritizes threats against a system. Aspects pattern because this Concept captures the lifecycle-level facets of threat modeling as a *practice*, not a comparison across methodologies. The methodology-comparison Concept is `threat-modeling-methodologies` in Domain 1; the STRIDE-specific Concept is `stride-categories` in Domain 1. This Concept answers "where does threat modeling fit in the SDLC, what feeds it, what comes out of it, and which methodology do I pick."

| Concept | when in SDLC | inputs | methodology choice | outputs |
|---|---|---|---|---|
| Threat modeling | Design phase<br>Ongoing refinement [s1] | Architecture diagrams<br>Data flow diagrams<br>Asset inventory<br>Security requirements [s1] | STRIDE [s2]<br>PASTA<br>DREAD<br>Attack trees<br>VAST | Threat list<br>Mitigation plan<br>Residual risk ranking [s1] |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. **No parentheticals in cells.** Methodology names (STRIDE, PASTA, DREAD, VAST) are treated as atomic identifiers.
- **Design-phase placement.** Threat modeling is conventionally performed during the Design phase because threats are most efficiently addressed via architectural changes (add authentication here, separate trust boundaries there) rather than via last-mile code changes. Running threat modeling during Implementation or Testing catches only the threats that survived Design — a much smaller and more expensive set.
- **Ongoing refinement.** Modern Agile / DevSecOps practice runs lightweight threat-modeling sessions continuously — per-sprint for new features, per-architecture-change for platform evolution. The `Ongoing refinement` cell value captures this; it is additive to the Design-phase anchor, not a replacement.
- **Inputs.** Effective threat modeling requires the four input Facts listed: a current architecture diagram (what exists), data flow diagrams (how data moves), an asset inventory (what is worth protecting), and security requirements (what is in scope). Missing any one input weakens the exercise — running STRIDE on a DFD without an asset inventory, for example, produces threats without a way to prioritize them.
- **Methodology choice.** The Concept lists five methodologies at the name level; detailed comparison (focus, structure, strengths, when used) lives in `threat-modeling-methodologies` (Domain 1). STRIDE is the dominant CISSP-tested methodology and is the only one cited primary-source here [s2]; the other four are pedagogical and sourced in the sibling Concept.
- **STRIDE is a classification model, not a process.** STRIDE classifies what can go wrong (Spoofing, Tampering, Repudiation, Information disclosure, Denial of service, Elevation of privilege). It is not a step-by-step methodology. Microsoft pairs STRIDE with a process (diagram → identify trust boundaries → enumerate threats per element → rank → mitigate); the process is often implicit in CISSP discussion but is not STRIDE itself.
- **Outputs drive later phases.** The threat list becomes backlog items for Implementation; the mitigation plan becomes security requirements for Testing (how do we verify these mitigations?); the residual risk ranking feeds Deployment-gate decisions (is the remaining risk acceptable?).
- **Threat modeling vs risk assessment.** Threat modeling is system-specific and architecture-anchored; risk assessment is organization-wide and control-anchored. Both produce ranked risks; the difference is scope. NIST SP 800-30 [s3] covers risk assessment at the org level; `risk-treatment` in Domain 1 covers the risk-response menu.
- **Out of scope for this Concept:** methodology-by-methodology comparison (see `threat-modeling-methodologies` in D1), STRIDE's six categories in detail (see `stride-categories` in D1), data flow diagram conventions, trust boundary notation, threat-modeling tools (Microsoft Threat Modeling Tool, IriusRisk, OWASP Threat Dragon), attack trees formally, DREAD scoring mechanics.

### Tricky distractors

- **Threat modeling is Design phase.** Architectural fix beats code-level patching. Wrong-answer pattern: scheduling threat modeling at Testing — catches only what survived Design.
- **Threat modeling ≠ Risk assessment.** System-specific architecture-anchored vs organization-wide control-anchored. Wrong-answer pattern: collapsing them — different scope and inputs.
- **STRIDE classifies; doesn't dictate process.** Six categories of threat. Wrong-answer pattern: claiming STRIDE prescribes the threat-modeling steps — Microsoft pairs it with a process; STRIDE itself is taxonomy.
- **Threat modeling needs four inputs.** Architecture, DFD, asset inventory, security requirements. Wrong-answer pattern: running threat modeling without asset inventory — produces unranked threats.
- **Outputs drive later phases.** Threat list → Implementation backlog; Mitigation plan → Testing requirements. Wrong-answer pattern: treating threat modeling as standalone — it integrates with downstream phases.
- **Lightweight ongoing models for agile.** Per-sprint refinement, not just upfront. Wrong-answer pattern: claiming threat modeling is one-time at Design — modern practice is continuous.

### Values without a direct public citation

| Cell | Notes |
|---|---|
| methodology choice | PASTA, DREAD, Attack trees, VAST are named from industry convention; OWASP and other public sources cover them but this Concept does not cite each one primary-source (the sibling `threat-modeling-methodologies` Concept is the right place for per-methodology citations). STRIDE is cited [s2]. |

## Engine demo opportunities

- `Threat modeling | when in SDLC → ?` → `Design phase`, `Ongoing refinement`
- `Threat modeling | inputs → ?` → `Architecture diagrams`, `Data flow diagrams`, `Asset inventory`, `Security requirements`
- `Threat modeling | methodology choice → ?` → `STRIDE`, `PASTA`, `DREAD`, `Attack trees`, `VAST`
- `Threat modeling | outputs → ?` → `Threat list`, `Mitigation plan`, `Residual risk ranking`
- `? | methodology choice → STRIDE` → `Threat modeling` (only Row in Aspects pattern)
- Composite swap: `when in SDLC` changed to `Testing phase` — directly tests the Design-phase anchor (threat modeling is Design-phase, catching threats in Testing is too late)
- Cross-Concept adjacency: for each methodology Fact in the `methodology choice` cell, there is a dedicated Concept (`threat-modeling-methodologies` for the comparison, `stride-categories` for STRIDE's six letters) — the engine can hop from this Aspects cell to the sibling Dimensions Concept

## Sources

- `[s1]`: OWASP, "Threat Modeling Cheat Sheet" — canonical public guidance for threat modeling as an SDLC practice (retrieved 2026-04-19, https://cheatsheetseries.owasp.org/cheatsheets/Threat_Modeling_Cheat_Sheet.html)
- `[s2]`: Microsoft Learn, "Threats — Microsoft Threat Modeling Tool" — STRIDE reference (updated 2026-03-04, retrieved 2026-04-19, https://learn.microsoft.com/en-us/azure/security/develop/threat-modeling-tool-threats)
- `[s3]`: NIST SP 800-154, "Guide to Data-Centric System Threat Modeling" (draft) — NIST-authored threat-modeling guidance; draft status noted (retrieved 2026-04-19, https://csrc.nist.gov/publications/detail/sp/800-154/draft)
