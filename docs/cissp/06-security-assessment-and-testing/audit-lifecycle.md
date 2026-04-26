# Audit Lifecycle

**Domain:** 6 — Security Assessment and Testing &nbsp;|&nbsp; **Pattern:** Ordered &nbsp;|&nbsp; **Tags:** 6.5
**Status:** draft (SME review pending)

The five-phase lifecycle of a security audit from initial planning through follow-up verification. Each phase produces a deliverable that the next phase consumes — planning sets scope, fieldwork gathers evidence, reporting summarizes findings, remediation closes them, follow-up verifies the closure. CISSP testing focuses on phase ordering and on which artifact each phase produces.

**Layout convention:** rows are phases in sequence from kickoff through closure. Columns are attributes of each phase ordered left → right from least detail (Name) to most detail (Typical Output).

| Phase | Name | Key Activity | Typical Output |
|---|---|---|---|
| 1 | Planning | Define scope<br>Identify stakeholders<br>Risk-rate audit areas | Audit plan<br>Engagement letter |
| 2 | Fieldwork | Gather evidence<br>Test controls<br>Interview personnel | Working papers<br>Evidence inventory |
| 3 | Reporting | Document findings<br>Recommend remediation<br>Issue audit report | Audit report<br>Management response |
| 4 | Remediation | Address findings<br>Implement corrective actions | Closed findings<br>Remediation evidence |
| 5 | Follow-up | Verify remediation<br>Confirm closure | Follow-up report<br>Closure attestation |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. **No parentheticals in cells.**
- **Planning sets the scope contract.** The Planning phase produces an *engagement letter* (for external audits) or an *audit plan* (for internal audits) that specifies what is being audited, against what criteria, by whom, on what timeline, and with what reporting expectations. Skipping or under-investing in Planning is a top driver of audit-disputes — the auditor and the audited disagree about scope after fieldwork has begun.
- **Fieldwork is evidence-gathering.** Auditors collect and test evidence — running scripts, reviewing configurations, sampling logs, interviewing personnel, observing processes. Evidence is documented in *working papers* (the auditor's internal documentation that supports findings). For external audits, working papers are typically retained for 7 years per AICPA standards but are not shared with the audited organization.
- **Reporting includes management response.** The audit report includes both the auditor's findings *and* the audited organization's response — what they agree with, what they dispute, and their planned remediation actions and timeline. Management response is part of the formal audit record because it documents the organization's commitment to remediation.
- **Remediation is the longest phase by clock time.** Reporting takes weeks; Remediation can take months to years for complex findings. Some findings are remediated immediately (configuration changes); others require system rebuilds or process redesigns. Phase 4 closes when the remediation evidence is presented for verification.
- **Follow-up is sometimes skipped.** Many audit programs report findings and stop, leaving remediation verification to the next annual audit cycle. Mature programs run targeted follow-up audits specifically to verify high-risk-finding closure, particularly for regulatory or certification audits where un-closed findings affect attestation status.
- **The lifecycle restarts.** Findings from this year's audit feed next year's Planning phase — known weak areas get more thorough attention; closed findings are re-tested at lower frequency. The cycle is iterative; a mature audit program improves coverage and confidence over multiple cycles.
- **External vs internal lifecycle differences.** External audits typically front-load Planning (engagement letter, scoping decisions, fee negotiation) and have heavier formal Reporting requirements. Internal audits may compress Planning and have more flexibility on Reporting format. The five-phase structure applies to both.
- **Out of scope for this Concept:** specific audit techniques (sampling, analytical procedures, walkthroughs), audit working-paper retention requirements, auditor independence requirements per phase, audit committee charters and oversight, audit software (TeamMate, AuditBoard, Workiva).

### Values without a direct public citation

| Cell | Notes |
|---|---|
| All rows × Typical Output | Output artifact names | Common-practice naming; AICPA standards [s2] specify formal artifacts (engagement letter, audit report) without prescribing the broader output set. |
| Phase 4 × all cells | — | Remediation phase is sometimes attributed to the audited organization rather than the auditor; the cell values reflect the broader audit-program lifecycle. |

## Engine demo opportunities

- `Phase 1 | Name → ?` → `Planning`
- `Phase 3 | Name → ?` → `Reporting`
- `Phase 5 | Name → ?` → `Follow-up`
- `? | Key Activity → Gather evidence` → `Fieldwork` (sub-Fact in multi-Fact cell)
- `? | Typical Output → Audit plan` → `Planning` (sub-Fact in multi-Fact cell)
- `Reporting | Typical Output → ?` → `Audit report`, `Management response`
- Sequence (adjacency): `Phase following (Phase n | Name → Fieldwork) | Name → ?` → `Reporting`
- Sequence (adjacency): `Phase preceding (Phase n | Name → Remediation) | Name → ?` → `Reporting`
- Composite Phase 1 Row with `Key Activity` swapped to `Verify remediation`, `Confirm closure` — directly tests the planning-vs-followup distinction (Planning sets scope; Follow-up verifies closure)
- Composite Phase 3 Row with `Typical Output` swapped to `Working papers`, `Evidence inventory` — tests the reporting-vs-fieldwork output (Reporting produces the audit report; fieldwork produces working papers)

## Sources

- `[s1]`: NIST SP 800-53A Rev 5, "Assessing Security and Privacy Controls in Information Systems and Organizations" — assessment / audit lifecycle framing (January 2022, retrieved 2026-04-26, https://csrc.nist.gov/publications/detail/sp/800-53a/rev-5/final)
- `[s2]`: AICPA, "Statements on Standards for Attestation Engagements (SSAE) 18" — formal audit phases and deliverables (retrieved 2026-04-26, https://us.aicpa.org/research/standards/auditattest/ssae)
- `[s3]`: ISACA, "IT Audit Framework (ITAF)" — IT audit lifecycle reference (retrieved 2026-04-26, https://www.isaca.org/resources/itaf)
