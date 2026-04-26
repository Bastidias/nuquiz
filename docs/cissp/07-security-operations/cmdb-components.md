# CMDB Components

**Domain:** 7 — Security Operations &nbsp;|&nbsp; **Pattern:** Dimensions &nbsp;|&nbsp; **Tags:** 7.3
**Status:** draft (SME review pending)

The four core data structures inside a Configuration Management Database (CMDB). Each plays a distinct role: CIs identify *what is managed*, relationships record *how items connect*, baselines record *what good looks like*, and change history records *what has happened*. The CISSP exam tests whether you can match a CMDB capability (e.g., "supports impact analysis for a proposed change") to the underlying component (relationships).

| component | purpose | content |
|---|---|---|
| Configuration Item | Represent a single managed asset [s1] | Asset identifier [s1]<br>Asset attributes [s3] |
| Relationships | Map dependencies between CIs [s3] | Source CI reference [s3]<br>Target CI reference [s3]<br>Relationship descriptor [s3] |
| Baselines | Capture approved configuration state [s2] | Baseline configuration snapshot [s2]<br>Baseline effective date [needs source] |
| Change history | Audit trail for changes to CIs [s3] | Change record per CI [s3]<br>Timestamp of change [s3] |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. No parentheticals in cells. The row name `Configuration Item` was shortened from the stub's `Configuration Item (CI)` to keep parens out of row labels; the abbreviation `CI` is used in column cells where standard.
- **Tag 7.3 retained from stub.** Matches (ISC)² 2024 outline §7.3 *Perform configuration management* and is consistent with sibling Concepts `configuration-baselines.md` and `asset-hardening.md` in this folder.
- **CI scope is broad on purpose.** Per ITIL, a CI can be hardware, software, networks, buildings, people, supplies, or documentation [s3]. The NIST definition is narrower — "item or aggregation of hardware, software, or both" [s1] — because NIST SP 800-128's lens is information-system configuration management. Both framings appear on the exam; the broader ITIL definition is the more common one.
- **Why relationships matter for security.** Relationships enable impact analysis: "if I change this database server, what applications break?" That is the CMDB's value-add over a flat asset inventory and is the most common CISSP test angle for this Concept.
- **Baseline ≠ snapshot of current state.** A baseline is the *approved* configuration, not whatever is running right now. Drift detection works by comparing the running state against the baseline. NIST SP 800-53 CM-2 [s2] codifies the requirement to "develop, document, and maintain under configuration control, a current baseline configuration of the system."
- **Change history vs. the change-management lifecycle.** The lifecycle (`change-management-lifecycle.md`) is the *process* a change passes through; the change history in the CMDB is the *record* left behind once the change closes. The lifecycle's Phase 7 (Close) writes into the CMDB's change history.
- **Gaps marked `[needs source]`:** one Fact — "Baseline effective date" as a content element. Standard CMDB practice but not yet sourced to a primary publication.

## Engine demo opportunities

- `? | purpose → Map dependencies between CIs` → Relationships
- `Configuration Item | content → ?` → `Asset identifier` or `Asset attributes`
- `? | content → Source CI reference` → Relationships
- `Baselines | purpose → ?` → `Capture approved configuration state`
- Composite Row profile: Change history across all Columns with the `purpose` cell swapped to `Capture approved configuration state` (Baselines' value)

## Sources

- `[s1]`: NIST CSRC glossary entry *Configuration Item*, citing NIST SP 800-128, SP 800-37 Rev. 2, SP 800-53 Rev. 5, SP 800-160v1r1 (retrieved 2026-04-25, https://csrc.nist.gov/glossary/term/configuration_item)
- `[s2]`: NIST SP 800-53 Rev. 5, control CM-2 *Baseline Configuration* (retrieved 2026-04-25, https://csf.tools/reference/nist-sp-800-53/r5/cm/cm-2/)
- `[s3]`: CMDB definition and structure per ITIL practice — composite of Atlassian, Red Hat, and Wikipedia summaries (retrieved 2026-04-25, https://www.atlassian.com/itsm/it-asset-management/cmdb and https://en.wikipedia.org/wiki/Configuration_management_database)
- `[s4]`: (ISC)² CISSP Certification Exam Outline, effective 2024-04-15, Domain 7 §7.3 *Perform configuration management* (retrieved 2026-04-25, https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline)
