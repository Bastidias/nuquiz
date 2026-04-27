# RAID Levels

**Domain:** 7 — Security Operations &nbsp;|&nbsp; **Pattern:** Dimensions &nbsp;|&nbsp; **Tags:** 7.10
**Status:** draft (SME review pending)

The seven RAID configurations the CISSP exam covers, comparing the structural trade-offs across disk count, fault tolerance, performance, and typical use. RAID is a *fault tolerance* mechanism, not a backup — a RAID array protects against disk hardware failure but not against data deletion, ransomware, or controller failure. The exam tests both the per-level facts and the broader principle that RAID supplements (never replaces) a backup strategy.

| level | minimum disks | fault tolerance | performance | typical use |
|---|---|---|---|---|
| RAID 0 | 2 [s1] | None [s1] | Highest read [s1]<br>Highest write [s1] | Performance with no redundancy required [s1] |
| RAID 1 | 2 [s1] | One disk failure [s1] | High read [s1]<br>Standard write [s1] | Mirrored boot drives [s1] |
| RAID 5 | 3 [s1] | One disk failure [s1] | Standard read [s1]<br>Slow write due to parity [s1] | General-purpose storage [s1] |
| RAID 6 | 4 [s1] | Two disk failures [s1] | Standard read [s1]<br>Slower write than RAID 5 [s1] | Large-capacity arrays [s1] |
| RAID 10 | 4 [s1] | One disk per mirror pair tolerable [s1] | High read [s1]<br>High write [s1] | Database storage [s1] |
| RAID 50 | 6 [s1] | One disk per RAID 5 sub-array tolerable [s1] | Standard read [s1]<br>Better write than RAID 5 [s1] | Large transactional systems [s1] |
| RAID 60 | 8 [s1] | Two disks per RAID 6 sub-array tolerable [s1] | Standard read [s1]<br>Better write than RAID 6 [s1] | Very large arrays needing dual parity [s1] |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. No parentheticals in cells. Read and write performance are split into separate Facts within the performance column because they vary independently across levels.
- **Tag 7.10 retained from stub.** Matches (ISC)² 2024 outline §7.10 *Implement recovery strategies*. RAID is a fault-tolerance mechanism, which is a recovery-strategy primitive.
- **RAID is not backup.** The most-tested CISSP nuance. RAID protects against disk hardware failure (one or two failed drives, depending on level). It does not protect against accidental deletion, malware, ransomware encryption, controller failure, or site loss. A backup strategy (`backup-strategies.md`) is required *in addition to* RAID.
- **Why these seven levels.** RAID 0/1/5/6 are the foundational single-array configurations. RAID 10/50/60 are nested arrays (RAID 1+0, RAID 5+0, RAID 6+0) that combine striping with mirroring or parity sub-arrays. Other levels (2, 3, 4) exist historically but are not deployed today and are not on the exam.
- **RAID 0 is striping only.** Highest performance because reads and writes are parallelized across disks, but any single disk failure loses the whole array. RAID 0 alone is never used for data that matters; it appears in nested levels (RAID 10) where mirroring provides the redundancy.
- **The parity-write penalty.** RAID 5 and RAID 6 must compute parity on every write; this is the read-modify-write penalty. RAID 6 has a steeper penalty than RAID 5 because it computes two parity blocks instead of one. RAID 10 avoids parity entirely (it mirrors), so its write performance is high.
- **RAID 10 fault tolerance is conditional.** "Up to half the disks can fail" — but only if no two failed disks belong to the same mirror pair. The stub's row records this as "one disk per mirror pair tolerable" because that is the worst-case guarantee; the engine can carry the conditional in the Notes layer if needed.
- **Why RAID 50 and RAID 60 even exist.** Pure RAID 5 with very large disks now takes long enough to rebuild that a second disk failure during rebuild is a realistic risk; RAID 6 mitigates this with dual parity. RAID 50 and 60 add striping across multiple parity sub-arrays for very large arrays where rebuild time on a single sub-array is bounded.
- **Gaps marked `[needs source]`:** none — all Facts are RAID-specification mechanics.

### Tricky distractors

- **RAID is not backup.** RAID protects against *disk hardware failure*. It does NOT protect against accidental deletion, ransomware encryption, controller failure, or site loss. Wrong-answer pattern: choosing RAID as a backup substitute. You need both: RAID for hardware-failure resilience AND backups for everything else.
- **RAID 0 has no redundancy.** Highest performance, zero fault tolerance. Wrong-answer pattern: assuming "RAID = redundant" — RAID 0 is striping only, "redundancy" doesn't apply.
- **RAID 5 vs RAID 6.** RAID 5 tolerates *one* disk failure; RAID 6 tolerates *two*. Modern large-disk arrays often use RAID 6 because RAID 5 rebuild time creates a realistic window for a second failure. Wrong-answer pattern: claiming RAID 5 tolerates 2 disks (it doesn't — that's RAID 6).
- **RAID 10 minimum disks.** Four (two mirror pairs striped). Wrong-answer pattern: claiming RAID 10 needs 6 or 8 disks — those are RAID 50 and 60 minimums.
- **Parity write penalty.** RAID 5 has one parity write per data write; RAID 6 has two. RAID 10 has zero (it mirrors instead of computing parity). Wrong-answer pattern: claiming RAID 10 has high write penalty — its write performance is high precisely because no parity is computed.
- **RAID 10 vs RAID 0+1 vs RAID 1+0.** RAID 10 = RAID 1+0 (mirror first, then stripe). RAID 0+1 = stripe first, then mirror. They sound similar but fault tolerance differs. CISSP usually asks RAID 10 / 1+0 — not 0+1.

## Engine demo opportunities

- `? | minimum disks → 2` → RAID 0 or RAID 1 (cross-Row select)
- `RAID 6 | fault tolerance → ?` → `Two disk failures`
- `? | typical use → Database storage` → RAID 10
- `RAID 5 | performance → ?` → `Standard read` or `Slow write due to parity`
- Cross-Row shared-Value detection: `? | performance → Standard read` → RAID 5, RAID 6, RAID 50, RAID 60 (select-all across multiple rows)
- `? | fault tolerance → None` → RAID 0
- Composite Row profile: RAID 1 across all Columns with `fault tolerance` swapped to `Two disk failures` (RAID 6's value)

## Sources

- `[s1]`: SNIA *Common RAID Disk Data Format Specification* and SNIA Dictionary entries for RAID 0, 1, 5, 6, 10, 50, 60 (retrieved 2026-04-25, https://www.snia.org/dictionary)
- `[s2]`: (ISC)² CISSP Certification Exam Outline, effective 2024-04-15, Domain 7 §7.10 *Implement recovery strategies* (retrieved 2026-04-25, https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline)
