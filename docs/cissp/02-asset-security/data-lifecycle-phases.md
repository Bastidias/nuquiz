# Data Lifecycle Phases

**Domain:** 2 — Asset Security &nbsp;|&nbsp; **Pattern:** Ordered &nbsp;|&nbsp; **Tags:** 2.4
**Status:** draft (SME review pending)

The six sequential phases data passes through across its lifecycle, from creation to destruction. Each phase has distinct *key activities* and requires distinct *typical controls*. The CISSP exam tests both the ordering and the matchup between phase and control set — particularly that destruction is its own phase, not just an offboarding afterthought.

**Layout convention:** rows are ordered chronologically (Phase 1 first, Phase 6 last). Columns progress from identifier (Phase, Name) to action (Key Activity) to controls (Typical Controls).

| Phase | Name | Key Activity | Typical Controls |
|---|---|---|---|
| 1 | Create | Generate or acquire data [s1] | Classification at creation [s1]<br>Data owner assignment [s1] |
| 2 | Store | Persist data to storage [s1] | Encryption at rest [s1]<br>Access controls [s1] |
| 3 | Use | Access and process data [s1] | Authentication and authorization [s1]<br>Audit logging [s1] |
| 4 | Share | Transmit data to other parties [s1] | Encryption in transit [s1]<br>Recipient verification [s1] |
| 5 | Archive | Move data to long-term retention [s1] | Tiered-storage encryption [s1]<br>Retention metadata [s1] |
| 6 | Destroy | Permanently remove data [s1] | Sanitization per NIST 800-88 [s2]<br>Destruction certificate [s2] |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. No parentheticals in cells.
- **Tag 2.4 retained from stub.** Maps to (ISC)² 2024 outline §2.4 *Manage data lifecycle*. Sibling Concepts: `data-classification-handling.md` (the per-phase control specifics by classification), `data-sanitization-methods.md` (destruction-phase detail), `retention-drivers.md` (archive-vs-destroy decision drivers).
- **The six-phase model is the most-tested CISSP framing.** Some references collapse this to four (Create / Store / Use / Destroy) or expand to seven (adding Backup as separate from Archive). Six matches the most common exam framing — Create → Store → Use → Share → Archive → Destroy.
- **Share is a distinct phase, not part of Use.** Use covers internal access and processing; Share covers transmission outside the system or organization. The control set differs — Use needs strong authentication; Share needs strong recipient verification. Treating them as one phase obscures the transmission-specific controls.
- **Archive differs from Backup.** Backup is for *recovery* — copies maintained alongside production data, typically rotated and overwritten. Archive is for *retention* — moving data out of active use to long-term storage, typically for compliance or historical reference. Backup belongs to operations (`backup-strategies.md`); archive belongs to data lifecycle management.
- **Destroy is a positive action, not absence.** Many programs fail because they treat destruction as "we deleted it." NIST SP 800-88 specifies that *deletion is not destruction* — file-system delete leaves data recoverable. Destruction requires sanitization (clearing, purging, or physical destruction) and produces a *destruction certificate* documenting that the destruction happened.
- **Retention drives the Archive→Destroy transition.** Data does not move from Archive to Destroy automatically. A retention policy specifies *how long* each data type must be retained (legal hold, regulatory requirement, business need); when the retention period expires, the data should be destroyed. Failing to destroy expired data is a privacy and legal-risk problem (GDPR storage-limitation principle, e-discovery scope).
- **Lifecycle controls compound, not replace.** A piece of data in the Use phase still needs the Storage controls — encryption at rest does not turn off because the data is in active use. The phases describe the *primary* activity; controls from earlier phases continue to apply.
- **Gaps marked `[needs source]`:** none — all Facts trace to NIST SP 800-88 or standard data-lifecycle framing.

### Tricky distractors

- **Six-phase order.** Create → Store → Use → Share → Archive → Destroy. Wrong-answer pattern: putting Share before Use, or placing Archive after Destroy.
- **Archive ≠ Backup.** Archive is for retention; Backup is for recovery. Wrong-answer pattern: collapsing the two — backup data is rotated and overwritten; archive data is preserved long-term.
- **Destroy is a positive action.** Deletion ≠ destruction. NIST 800-88 sanitization is required. Wrong-answer pattern: claiming file-system delete satisfies destroy phase — undelete tools recover it.
- **Retention drives Archive→Destroy.** Expired data must be destroyed; failing to destroy is a privacy/legal risk. Wrong-answer pattern: claiming organizations should keep data forever for safety — GDPR storage-limitation principle requires destruction.
- **Controls compound across phases.** Encryption at rest persists during Use. Wrong-answer pattern: claiming controls from earlier phases turn off as data moves to later phases.
- **Share is distinct from Use.** Internal access (Use) vs external transmission (Share). Wrong-answer pattern: collapsing them — the controls differ (recipient verification for Share).

## Engine demo opportunities

- `? | Name → Archive` → Phase 5
- `Phase 6 | Key Activity → ?` → `Permanently remove data`
- `? | Typical Controls → Encryption in transit` → Phase 4 / Share
- `Use | Typical Controls → ?` → `Authentication and authorization` or `Audit logging`
- Sequence verification: `Phase 3 → ? → Phase 5` → Phase 4 (Share)
- Cross-Row distractor: `Phase 6 | Typical Controls → ?` with `Encryption at rest` (Phase 2) as a tempting wrong answer (encryption is *for* live data; destruction *removes* data)
- Composite Row profile: Create across all Columns with `Typical Controls` swapped to `Sanitization per NIST 800-88` (Destroy's value)

## Sources

- `[s1]`: ISO/IEC 27001:2022 Annex A.5.12-A.5.14 *Classification, Labelling, Information Transfer* — data lifecycle control framing (retrieved 2026-04-26, https://www.iso.org/standard/27001)
- `[s2]`: NIST SP 800-88 Rev. 1 *Guidelines for Media Sanitization*, December 2014 (retrieved 2026-04-26, https://csrc.nist.gov/pubs/sp/800/88/r1/final)
- `[s3]`: (ISC)² CISSP Certification Exam Outline, effective 2024-04-15, Domain 2 §2.4 (retrieved 2026-04-26, https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline)
