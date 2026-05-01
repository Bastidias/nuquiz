# Backup Strategies

**Domain:** 7 — Security Operations &nbsp;|&nbsp; **Pattern:** Dimensions &nbsp;|&nbsp; **Tags:** 7.10
**Status:** draft (SME review pending)

Six backup approaches that differ in *what* they capture each cycle, *how long* a restore takes, *how much* storage they consume, and *where* they fit operationally. The core CISSP distinctions are full vs. incremental vs. differential (data-set scope) and traditional backups vs. snapshot/mirroring/CDP (capture mechanism). The trade-off triangle — capture window, restore time, storage cost — is the most-tested aspect.

| backup type | data captured | restore time | storage cost | typical use |
|---|---|---|---|---|
| Full | All data regardless of change [s4] | Single restore step [s4] | Highest per cycle [s4] | Periodic baseline [s1] |
| Incremental | Changes since last backup of any type [s4] | Full plus chain of incrementals [s4] | Lowest per cycle [s4] | Frequent intermediate backups [s4] |
| Differential | Changes since last full backup [s4] | Full plus most recent differential [s4] | Grows daily until next full [s4] | Balance of restore speed and storage [s4] |
| Snapshot | Point-in-time pointer to data state [s3] | Near-instant rollback [s3] | Low when changed blocks are few [s3] | VM rollback [s3]<br>Block-storage rollback [s3] | 
| Mirroring | Real-time copy of data [s3] | Failover to mirror [s3] | Equal to source [s3] | High availability [s3] |
| Continuous data protection | Every data change [s3] | Restore to any point in time [s3] | High due to continuous journal [s3] | Low-RPO transactional systems [needs source] |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. No parentheticals in cells.
- **Row name shortened from stub.** Stub said `Continuous data protection (CDP)`. Dropped the `(CDP)` parenthetical from the row name to keep the row label clean; the abbreviation `CDP` is documented here.
- **Tag 7.10 retained from stub.** The (ISC)² 2024 outline §7.10 *Implement recovery strategies* is the natural home for backup mechanics. Cross-tag candidates: 7.13 *Implement Business Continuity (BC) plans* (because backup strategy is a BC input).
- **Why snapshot ≠ full backup.** A snapshot is metadata: it records the state of data at a point in time, often via copy-on-write, so the original blocks are preserved as they change. It is *not* a separate copy of the data unless explicitly cloned. This is why snapshots are cheap to take and fast to roll back, but a snapshot alone does not protect against media failure — the underlying storage is the same. Pair with replication or true backup for full protection.
- **Why mirroring is on this table even though it is more "high availability" than "backup."** Mirroring (RAID-1 or storage-array replication) gives a real-time copy that can be promoted on failure. Many CISSP question banks list mirroring as a backup strategy; SNIA explicitly distinguishes mirroring from CDP because mirroring protects only the most recent copy and cannot recover from logical corruption (the corruption mirrors). Worth knowing both the inclusion and the caveat.
- **CDP vs. near-CDP.** True CDP captures every write (per SNIA's definition); near-CDP takes frequent snapshots (every few minutes) and presents a recovery timeline. Exam writers often blur these; if a question says "restore to any point in time," that is true CDP.
- **What is intentionally not on this table.** 3-2-1 backup rule, immutable/air-gapped backups for ransomware, backup encryption (CP-9(8) in NIST SP 800-53 [s2]), and offsite rotation policies are operational considerations layered *on top of* the type choice. They belong in their own Concepts.
- **Gaps marked `[needs source]`.** One Fact: "Low-RPO transactional systems" as the typical use for CDP. Widely accepted but not yet sourced to a primary publication in this research pass.

### Tricky distractors

- **Incremental vs Differential restore.** Incremental restore = full + ALL incrementals since. Differential restore = full + LATEST differential only. Wrong-answer pattern: claiming Incremental restores are faster than Differential — they're slower because of the chain.
- **Differential storage grows daily.** Each differential captures more data than the prior one (it's cumulative since last full). Wrong-answer pattern: claiming Differential is constant-size daily — only Incremental is.
- **Snapshot is not a backup.** A snapshot is a pointer to data state on the same media. Wrong-answer pattern: relying on snapshots alone for media-failure protection — pair with replication.
- **Mirroring does not protect against logical corruption.** Ransomware encrypting the source mirrors to the target instantly. Wrong-answer pattern: treating mirroring as ransomware-proof — it isn't.
- **CDP vs near-CDP.** True CDP captures every write. Near-CDP uses frequent snapshots. Wrong-answer pattern: calling 5-minute snapshot intervals "CDP" — exam usually means true CDP.
- **Full backup overwrites archive bit; Incremental clears it; Differential does not.** This is the operational mechanism that distinguishes them. Wrong-answer pattern: confusing which type clears archive bits — Full and Incremental do, Differential leaves them set.

## Engine demo opportunities

- `? | data captured → All data regardless of change` → Full
- `? | data captured → Every data change` → Continuous data protection
- `Incremental | restore time → ?` with `Single restore step` (Full) and `Failover to mirror` (Mirroring) as distractors
- `Differential | data captured → ?` → `Changes since last full backup`
- `? | typical use → High availability` → Mirroring
- Composite Row profile: Full across all Columns with the `restore time` cell swapped to `Failover to mirror` (Mirroring's value) — engine should detect the substitution

## Sources

- `[s1]`: NIST SP 800-34 Rev. 1 *Contingency Planning Guide for Federal Information Systems*, May 2010 (retrieved 2026-04-25, https://csrc.nist.gov/pubs/sp/800/34/r1/upd1/final) — backup policy framing
- `[s2]`: NIST SP 800-53 Rev. 5, control CP-9 *System Backup* (retrieved 2026-04-25, https://csf.tools/reference/nist-sp-800-53/r5/cp/cp-9/)
- `[s3]`: SNIA *Continuous Data Protection (CDP)* and snapshot/mirroring concepts, summarized via SNIA Dictionary references (retrieved 2026-04-25, https://www.snia.org/) — primary SNIA whitepaper PDF inaccessible at retrieval; definitions cross-checked against TechTarget summary
- `[s4]`: TechTarget *Types of backup explained: Incremental vs. differential vs. full* (retrieved 2026-04-25, https://www.techtarget.com/searchdatabackup/feature/Full-incremental-or-differential-How-to-choose-the-correct-backup-type)
- `[s5]`: (ISC)² CISSP Certification Exam Outline, effective 2024-04-15, Domain 7 §7.10 *Implement recovery strategies* (retrieved 2026-04-25, https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline)
