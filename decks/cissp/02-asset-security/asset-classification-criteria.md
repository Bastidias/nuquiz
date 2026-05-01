# Asset Classification Criteria

**Domain:** 2 — Asset Security &nbsp;|&nbsp; **Pattern:** Aspects &nbsp;|&nbsp; **Tags:** 2.1
**Status:** draft (SME review pending)

The classification process by which an organization assigns a sensitivity label to an asset. The Concept renders this as a single-column-per-aspect Aspects table because the classification process is one activity examined from multiple angles: what *inputs* feed it, what *value drivers* raise the classification, what *sensitivity factors* compound the value, and what *output* the process produces. The CISSP exam tests the matchup between asset characteristics and the appropriate classification label.

| aspect | content |
|---|---|
| inputs considered | Asset business purpose [s1]<br>Data subject rights [s2]<br>Regulatory obligations [s2]<br>Threat exposure [s1] |
| value drivers | Revenue impact if compromised [s1]<br>Reputation impact if disclosed [s1]<br>Operational dependency [s1] |
| sensitivity factors | Personal information present [s2]<br>Trade-secret content [s1]<br>Regulatory protected category [s2]<br>Aggregation effect [s1] |
| output | Classification label assigned to asset [s1]<br>Handling requirements per label [s1] |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. No parentheticals in cells.
- **Tag 2.1 retained from stub.** Maps to (ISC)² 2024 outline §2.1 *Identify and classify information and assets*. Sibling Concepts: `commercial-classification-levels.md`, `government-classification-levels.md` (the labels that get assigned), `data-classification-handling.md` (what happens after labeling).
- **Why Aspects pattern.** Asset classification is a single decision process, not a set of parallel options. The aspects table examines the process from four angles. A Dimensions table would imply each row is a *type* of classification, which is wrong — the rows here are *facets of one process*.
- **The aggregation effect is the test favorite.** Many individual data items at low sensitivity (e.g., a single name, an address, a phone number) become highly sensitive when aggregated into a profile. This is why a database containing all three for millions of people is classified at much higher sensitivity than the individual fields would suggest. The classification process must consider the *combined* asset, not just its components.
- **Regulatory protected categories raise classification automatically.** PII, PHI, cardholder data, and other regulator-defined categories carry specific protection requirements. An asset containing any of these inherits the regulatory floor regardless of business value — even a single record is subject to HIPAA / GDPR / PCI obligations.
- **Operational dependency is often underweighted.** The CIA triad (confidentiality, integrity, availability) all matter for classification, but most organizations weight confidentiality heavily and underweight availability. A system whose downtime breaks revenue-critical processes deserves high classification on the availability axis even if its data is not sensitive.
- **Classification is binding once assigned.** The output is not just a label; it is a *handling commitment* — the organization is now obligated to apply the controls defined for that label (encryption, access restrictions, retention rules, destruction methods). This is why the classification *process* matters: assigning a high classification has cost, but under-classifying creates risk.
- **Re-classification triggers.** Classifications expire when the underlying value drivers change — financial information becomes public after earnings release; trade secrets enter public domain through patent filings; product-launch information becomes public on launch day. Classification programs need re-classification triggers, not just initial classification.
- **Gaps marked `[needs source]`:** none — all Facts trace to NIST SP 800-60 or ISO 27001 classification framing.

### Tricky distractors

- **Aggregation raises classification.** Individually low-sensitivity items (name, address, phone) become high-sensitivity when combined. Wrong-answer pattern: classifying based on individual fields — the aggregated asset is what matters.
- **Regulatory categories enforce a floor.** PII, PHI, PCI categories inherit obligations regardless of business value. Wrong-answer pattern: claiming low business value can override regulatory category — it can't.
- **Classification binds the organization to controls.** Once assigned, the label commits handling, encryption, retention. Wrong-answer pattern: treating classification as advisory — it triggers required controls.
- **Re-classification triggers exist.** Earnings release makes financials public; patent filings disclose secrets. Wrong-answer pattern: assuming classification is permanent — value drivers change and labels must follow.
- **Owner classifies, not custodian.** Data Owner has accountability for the label. Wrong-answer pattern: claiming IT or security teams classify — they advise; the data owner decides.
- **CIA triad all factor in.** Availability and integrity matter alongside confidentiality. Wrong-answer pattern: classifying solely on confidentiality — operational dependency drives availability classification.

## Engine demo opportunities

- `? | content → Classification label assigned to asset` → output aspect
- `inputs considered | content → ?` → any of `Asset business purpose`, `Data subject rights`, `Regulatory obligations`, `Threat exposure`
- `? | content → Aggregation effect` → sensitivity factors aspect
- `value drivers | content → ?` → `Revenue impact if compromised`, `Reputation impact if disclosed`, or `Operational dependency`
- Cross-aspect distractor: presented with one Fact, identify which aspect it belongs to (since multiple Facts could plausibly fit multiple aspects, the engine tests boundary judgment)

## Sources

- `[s1]`: NIST SP 800-60 Vol. 1 Rev. 1 *Guide for Mapping Types of Information and Information Systems to Security Categories*, August 2008 (retrieved 2026-04-26, https://csrc.nist.gov/pubs/sp/800/60/v1r1/final)
- `[s2]`: ISO/IEC 27001:2022 Annex A.5.12 *Classification of information* and EU GDPR Article 9 (special categories of personal data) (retrieved 2026-04-26, https://www.iso.org/standard/27001 and https://eur-lex.europa.eu/eli/reg/2016/679/oj)
- `[s3]`: (ISC)² CISSP Certification Exam Outline, effective 2024-04-15, Domain 2 §2.1 (retrieved 2026-04-26, https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline)
