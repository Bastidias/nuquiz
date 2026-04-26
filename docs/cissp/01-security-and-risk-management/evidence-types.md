# Evidence Types

**Domain:** 1 — Security and Risk Management &nbsp;|&nbsp; **Pattern:** Dimensions &nbsp;|&nbsp; **Tags:** 1.6, 7.1
**Status:** draft (SME review pending)

The five evidence categories U.S. legal practice (and CISSP courseware) recognizes when classifying material introduced in court or administrative proceedings. Each has a different *admissibility* profile — direct objects (real evidence) carry stronger weight than reproduced documents or witness recollections. The CISSP exam tests both the categorization and the admissibility nuance, particularly the hearsay-rule exceptions for business records.

| type | definition | admissibility | example |
|---|---|---|---|
| Real | Tangible physical object directly involved in incident [s1] | Highly admissible if chain of custody intact [s1] | Seized hard drive [s1] |
| Documentary | Written or recorded material containing relevant content [s1] | Admissible if authenticated as accurate [s1] | Email message [s1]<br>Server log file [s1] |
| Testimonial | First-person witness statement under oath [s1] | Admissible if witness is competent [s1] | Sworn deposition [s1] |
| Demonstrative | Visual aid that illustrates evidence [s1] | Admissible to clarify other evidence [s1] | Network diagram in court exhibit [s1] |
| Hearsay | Out-of-court statement offered to prove the truth of its content [s1] | Generally inadmissible with documented exceptions [s1] | Verbal report of what someone else said [s1] |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. No parentheticals in cells.
- **Tags 1.6 and 7.1 retained from stub.** Cross-tagged to (ISC)² 2024 outline §1.6 (legal/regulatory) and §7.1 (investigations). Sibling Concept: `evidence-handling-chain.md` in Domain 7 (the procedural side).
- **The hearsay rule and its exceptions matter for log files.** Server logs, audit trails, and computer-generated records would technically be hearsay (the computer is "saying" something out of court). U.S. Federal Rules of Evidence Rule 803(6) — the *business records exception* — admits them if (a) the record was made in the regular course of business, (b) at or near the time of the event, (c) by someone with knowledge, (d) and the record-keeping is the regular practice. This is the test-favorite legal nuance for digital forensics.
- **Real evidence requires intact chain of custody.** Any break in the custody record can render real evidence inadmissible regardless of its probative value. The chain-of-custody discipline documented in `evidence-handling-chain.md` exists to preserve admissibility.
- **Documentary vs. Demonstrative.** Documentary evidence carries content that is itself probative (an email proving a contract). Demonstrative evidence is a representation that helps the trier of fact understand other evidence (a chart summarizing log activity). Demonstrative evidence is admissible to *clarify*, not to prove on its own.
- **Testimonial evidence is what witnesses *did or saw*, not what they *concluded*.** Expert witnesses are an exception — they are permitted to offer professional opinions within their area of expertise. The IR analyst testifying about findings from forensic analysis falls into this category.
- **Best evidence rule.** When the contents of a document are at issue, the *original* document must be produced if available. Copies are admissible only if the original is unavailable for justifiable reason. This is why forensic disk imaging produces bit-for-bit copies *and* preserves the original drive — both serve different evidentiary needs.
- **Gaps marked `[needs source]`:** none — all Facts trace to U.S. Federal Rules of Evidence framing as documented in CISSP courseware.

## Engine demo opportunities

- `? | definition → Tangible physical object directly involved in incident` → Real
- `Documentary | example → ?` → `Email message` or `Server log file`
- `? | admissibility → Generally inadmissible with documented exceptions` → Hearsay
- `Testimonial | definition → ?` → `First-person witness statement under oath`
- `Demonstrative | admissibility → ?` with `Highly admissible if chain of custody intact` (Real) and `Generally inadmissible with documented exceptions` (Hearsay) as distractors
- Composite Row profile: Real across all Columns with `admissibility` swapped to `Generally inadmissible with documented exceptions` (Hearsay's value)

## Sources

- `[s1]`: U.S. Federal Rules of Evidence — particularly Rule 401 (relevance), Rule 801 (hearsay definition), Rule 803(6) (business records exception), Rule 1001-1004 (best evidence rule) — as summarized in CISSP courseware (retrieved 2026-04-26, https://www.law.cornell.edu/rules/fre)
- `[s2]`: (ISC)² CISSP Certification Exam Outline, effective 2024-04-15, Domain 1 §1.6 *Understand legal and regulatory issues* and Domain 7 §7.1 *Understand and comply with investigations* (retrieved 2026-04-26, https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline)
