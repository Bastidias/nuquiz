# Evidence Handling Chain

**Domain:** 7 — Security Operations &nbsp;|&nbsp; **Pattern:** Ordered &nbsp;|&nbsp; **Tags:** 7.6, 1.6
**Status:** draft (SME review pending)

The five sequential steps for handling digital evidence so that it remains admissible in legal proceedings and supportable in incident-response decisions. NIST SP 800-86 defines a four-phase model (collection, examination, analysis, reporting) that folds identification and preservation into "collection"; CISSP courseware and ISO/IEC 27037 break these out as separate steps, yielding the five-step chain used here. The CISSP exam tests both the *ordering* and the *chain-of-custody* invariant — every step must record who handled the evidence and when.

**Layout convention:** rows are ordered chronologically (Step 1 first, Step 5 last). Columns progress from identifier (Step, Name) to action (Key Activity) to instrumentation (Typical Tools).

| Step | Name | Key Activity | Typical Tools |
|---|---|---|---|
| 1 | Identification | Locate potential digital evidence sources [s2] | Network discovery scan [s2]<br>Asset inventory query [s2] |
| 2 | Collection | Acquire evidence with chain-of-custody record [s1] | Forensic disk imager [s1]<br>Memory acquisition tool [s1] |
| 3 | Preservation | Maintain evidence integrity over time [s2] | Cryptographic hash [s1]<br>Tamper-evident storage [s2] |
| 4 | Analysis | Derive useful information from examined data [s1] | Disk forensics suite [s1]<br>Timeline reconstruction tool [s1] |
| 5 | Presentation | Report findings with supporting evidence [s1] | Written forensic report [s1]<br>Expert witness testimony [s2] |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. No parentheticals in cells.
- **Tags 7.6 and 1.6 retained from stub.** Cross-tagged to (ISC)² 2024 outline §7.6 *Conduct incident management* (incident-response forensic phase) and §1.6 *Contribute to and enforce personnel security policies and procedures* — the latter is partial; the more direct Domain 1 tie is to *evidence collection and handling* under §1.7 *Investigations*. If a future authoring pass refines tags, consider adjusting to `7.6, 1.7`.
- **Why five steps when NIST SP 800-86 lists four.** NIST SP 800-86 collapses identification and preservation into the collection phase: "data related to a specific event is identified, labeled, recorded, and collected, and its integrity is preserved" [s1]. ISO/IEC 27037 separates identification, collection, acquisition, and preservation [s2]. CISSP courseware uses the five-step model because it makes chain-of-custody invariants more testable — each step has its own custodian, its own record, and its own tooling. This Concept follows the five-step model per the stub.
- **Order of volatility (separate Concept).** Step 2 (Collection) must respect the order of volatility — capture the most-volatile data first (CPU registers, RAM, network state) before less-volatile data (disk, archival media). The volatility ordering lives in `volatility-order.md` and is one of the most-tested CISSP forensic facts.
- **Chain of custody is the cross-cutting invariant.** Every transition between steps must be recorded: who took possession, when, what was done. A break in the chain renders the evidence inadmissible. The chain-of-custody record itself is not a step — it is documentation that accumulates *across* all five steps.
- **Presentation vs. reporting.** NIST SP 800-86 calls Step 5 *reporting*; ISO/IEC 27037 and CISSP courseware often call it *presentation* to emphasize the courtroom-exhibit dimension. Either term is acceptable on the exam; this Concept uses *Presentation* per the stub.
- **Gaps marked `[needs source]`:** none — all Facts trace to NIST SP 800-86 or the ISO/IEC 27037 framing.

### Tricky distractors

- **Chain of custody is cross-cutting.** Every step must record handler and time. Wrong-answer pattern: claiming chain of custody is a step itself — it's documentation across all steps.
- **Identification before Collection.** Find the evidence sources before acquiring. Wrong-answer pattern: starting with collection — without identification, you don't know what to collect.
- **Preservation is integrity over time.** Hashing, tamper-evident storage. Wrong-answer pattern: collapsing preservation into collection — they're separate steps.
- **Order of volatility applies during Collection.** RAM before disk. Wrong-answer pattern: applying volatility order to identification or analysis — it's a Step 2 constraint.
- **NIST SP 800-86 has 4 phases; CISSP teaches 5.** Identification and Preservation are split out in CISSP framing. Wrong-answer pattern: insisting on the 4-phase NIST count when the question expects the 5-step CISSP framing.
- **Presentation = courtroom report.** Written report + expert testimony. Wrong-answer pattern: claiming presentation is just internal documentation — it's externally facing.

## Engine demo opportunities

- `? | Name → Preservation` → Step 3
- `Step 2 | Key Activity → ?` → `Acquire evidence with chain-of-custody record`
- `? | Typical Tools → Cryptographic hash` → Step 3 / Preservation
- `Analysis | Typical Tools → ?` → `Disk forensics suite` or `Timeline reconstruction tool`
- Sequence verification: `Step 1 → ? → Step 3` → Step 2 (Collection) — tests Ordered-Pattern progression
- Composite Row profile: Identification across all Columns with `Typical Tools` swapped to `Cryptographic hash` (Preservation's value)

## Sources

- `[s1]`: NIST SP 800-86 *Guide to Integrating Forensic Techniques into Incident Response*, August 2006 — particularly the four-phase forensic process (collection, examination, analysis, reporting) (retrieved 2026-04-25, https://csrc.nist.gov/pubs/sp/800/86/final)
- `[s2]`: ISO/IEC 27037:2012 *Guidelines for identification, collection, acquisition and preservation of digital evidence* (retrieved 2026-04-25, https://www.iso.org/standard/44381.html) — for the explicit identification and preservation steps separated from collection
- `[s3]`: (ISC)² CISSP Certification Exam Outline, effective 2024-04-15, Domain 7 §7.6 *Conduct incident management* and Domain 1 §1.7 *Investigations* (retrieved 2026-04-25, https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline)
