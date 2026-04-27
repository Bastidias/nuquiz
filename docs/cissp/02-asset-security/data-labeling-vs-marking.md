# Data Labeling vs Marking

**Domain:** 2 — Asset Security &nbsp;|&nbsp; **Pattern:** Dimensions &nbsp;|&nbsp; **Tags:** 2.2
**Status:** draft (SME review pending)

The two terms CISSP courseware distinguishes for indicating an asset's classification. *Labeling* is the *system-managed metadata* that travels with the data; *marking* is the *human-visible designation* applied to the artifact. The most-tested distinction: labels are for systems, markings are for people. Both must be present for a complete classification program.

| term | definition | when applied | who applies | example |
|---|---|---|---|---|
| Labeling | System-managed classification metadata [s1] | At creation or first classification [s1] | Automated by system or applied by data owner [s1] | File-system extended attribute carrying classification [s1] |
| Marking | Human-visible classification designation [s1] | At creation and at every transformation [s1] | Author or printer [s1] | "Confidential" header on every page [s1] |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. No parentheticals in cells.
- **Tag 2.2 retained from stub.** Maps to (ISC)² 2024 outline §2.2. Sibling Concept: `data-classification-handling.md` (where the marking-required cell connects).
- **The distinction is the test favorite.** Labels are *machine-readable* (metadata fields, file attributes, database columns); markings are *human-readable* (visible text on documents, watermarks, classification stamps on covers). A document can be labeled Confidential in its metadata but still need a "CONFIDENTIAL" header marking for human handlers to know.
- **Both must be present.** A label-without-marking fails when the data leaves the system (the human handler does not see the classification). A marking-without-label fails when systems must enforce based on classification (DLP cannot scan visible markings reliably). Mature programs apply both.
- **Marking flows through transformations.** When Confidential data is copied into a new document, printed, screenshotted, or excerpted into an email, the marking should flow with it. This is hard to enforce technically; most failures happen at copy-and-paste boundaries. Some DLP tools force marking inheritance.
- **Labeling automation is the modern goal.** Rather than relying on data owners to label every asset (error-prone, ignored at scale), modern data-classification programs use *content-based labeling* — DLP or AI scans content and applies labels automatically. The data owner reviews and adjusts; the system carries the labels forward.
- **Watermarking is a marking variant.** Visible watermarks (a "DRAFT" or "CONFIDENTIAL — DO NOT DISTRIBUTE" stamp across the document body) are a form of marking. Invisible watermarks (steganographic per-recipient identifiers) are a *traceability* control rather than a classification marking, but the distinction blurs in practice.
- **Gaps marked `[needs source]`:** none — all Facts trace to standard CISSP labeling/marking framing.

### Tricky distractors

- **Labels are for systems; markings are for people.** Single most-tested distinction. Wrong-answer pattern: collapsing them — they're complementary, both required.
- **Marking flows through transformations.** Print, copy-paste, screenshot. Wrong-answer pattern: claiming marking only applies at creation — must persist through transformations.
- **Both required for complete program.** Label without marking fails when human handles; marking without label fails systems. Wrong-answer pattern: choosing one — both are required.
- **Watermark is a marking variant.** Visible "DRAFT" or "CONFIDENTIAL." Wrong-answer pattern: classifying watermarks as labels — they're human-visible markings.
- **Automated labeling is modern goal.** DLP / AI content-based. Wrong-answer pattern: claiming user-applied labels are sufficient at scale — error-prone.
- **Steganographic watermarks ≠ classification marking.** Traceability control. Wrong-answer pattern: collapsing steganographic identifiers with classification markings.

## Engine demo opportunities

- `? | definition → Human-visible classification designation` → Marking
- `Labeling | who applies → ?` → `Automated by system or applied by data owner`
- `? | example → "Confidential" header on every page` → Marking
- `Marking | when applied → ?` → `At creation and at every transformation`
- `Labeling | example → ?` with `"Confidential" header on every page` (Marking) as a tempting wrong answer
- Composite Row profile: Labeling across all Columns with `definition` swapped to `Human-visible classification designation` (Marking's value)

## Sources

- `[s1]`: ISO/IEC 27001:2022 Annex A.5.13 *Labelling of information* — labeling and marking framework (retrieved 2026-04-26, https://www.iso.org/standard/27001). NIST SP 800-53 Rev. 5 control MP-3 *Media Marking* and SC-16 *Transmission of Security and Privacy Attributes* for label/marking distinction (retrieved 2026-04-26, https://csrc.nist.gov/pubs/sp/800/53/r5/upd1/final)
- `[s2]`: (ISC)² CISSP Certification Exam Outline, effective 2024-04-15, Domain 2 §2.2 (retrieved 2026-04-26, https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline)
