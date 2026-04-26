# Anonymization vs Pseudonymization vs Tokenization

**Domain:** 2 — Asset Security &nbsp;|&nbsp; **Pattern:** Dimensions &nbsp;|&nbsp; **Tags:** 2.4
**Status:** draft (SME review pending)

The three privacy-preserving data transformation techniques CISSP courseware tests. Each pairs a *definition* with a *reversibility* property, a *regulatory treatment* under GDPR-style privacy law, and a typical *example*. The most-tested distinction: anonymization is *irreversible* and removes data from privacy-law scope; pseudonymization is *reversible* and remains in scope. Tokenization is a specific pseudonymization technique used heavily in payment-card processing.

| technique | definition | reversibility | regulatory treatment | example |
|---|---|---|---|---|
| Anonymization | Irreversible removal of identifiers from data [s1] | Irreversible by design [s1] | Outside GDPR scope when truly anonymous [s1] | Aggregated census statistics [s1] |
| Pseudonymization | Replace identifiers with reversible substitutes [s1] | Reversible with separately stored mapping [s1] | Still personal data under GDPR [s1] | Replace name with internal subject ID [s1] |
| Tokenization | Replace sensitive value with unrelated token [s2] | Reversible only via token vault [s2] | PCI scope reduction when implemented properly [s2] | Replace card number with payment token [s2] |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. No parentheticals in cells.
- **Tag 2.4 retained from stub.** Maps to (ISC)² 2024 outline §2.4 *Manage data lifecycle* (privacy-preserving transformation as a lifecycle stage).
- **The reversibility distinction is the test favorite.** Anonymization must be *irreversible* — re-identification cannot be possible even with auxiliary data. If re-identification is possible (linking pseudonymized data to other records), it is not anonymization regardless of what it is called. GDPR Recital 26 is explicit about this.
- **Pseudonymization is a security control, not a privacy exemption.** GDPR explicitly recognizes pseudonymization as a security and data-minimization measure, but pseudonymized data *remains* personal data subject to all GDPR obligations. The benefit is risk reduction, not regulatory exemption.
- **Tokenization vs. encryption.** Both replace sensitive data with another value. The distinction: encryption produces ciphertext that *contains* the original via a key; tokenization produces a token that has *no mathematical relationship* to the original — recovery requires lookup in a vault. Tokenization is therefore robust against algorithmic compromise; encryption is robust against vault compromise (until the key leaks). Different security properties.
- **Why tokenization reduces PCI scope.** PCI DSS scope is defined by where cardholder data lives. If a merchant tokenizes immediately on card capture and the token vault is operated by the payment processor (not the merchant), the merchant's systems never store cardholder data and fall out of most PCI requirements. This is the dominant reason for tokenization adoption.
- **True anonymization is harder than it looks.** AOL's 2006 search-data release and the Netflix Prize re-identification (Narayanan and Shmatikov, 2008) both demonstrated that "anonymized" data can often be re-identified by linking to publicly available auxiliary data. Modern guidance (k-anonymity, l-diversity, differential privacy) addresses this with mathematical bounds.
- **Differential privacy (intentionally not a row).** Differential privacy is a mathematical framework that adds calibrated noise to data outputs to bound re-identification risk. It is the strongest known anonymization approach but applies primarily to *queries against datasets* rather than to dataset publication. Could be a future row or its own Concept.
- **Gaps marked `[needs source]`:** none — all Facts trace to GDPR text or PCI DSS framing.

## Engine demo opportunities

- `? | reversibility → Irreversible by design` → Anonymization
- `Pseudonymization | regulatory treatment → ?` → `Still personal data under GDPR`
- `? | example → Replace card number with payment token` → Tokenization
- `Tokenization | reversibility → ?` → `Reversible only via token vault`
- `Anonymization | regulatory treatment → ?` with `Still personal data under GDPR` (Pseudonymization) and `PCI scope reduction when implemented properly` (Tokenization) as distractors
- Composite Row profile: Anonymization across all Columns with `reversibility` swapped to `Reversible with separately stored mapping` (Pseudonymization's value)

## Sources

- `[s1]`: EU General Data Protection Regulation, Article 4(5) (definition of pseudonymization), Recital 26 (anonymous data outside scope), Recital 28 (pseudonymization as security measure) (retrieved 2026-04-26, https://eur-lex.europa.eu/eli/reg/2016/679/oj)
- `[s2]`: PCI Security Standards Council *Information Supplement: PCI DSS Tokenization Guidelines* (retrieved 2026-04-26, https://www.pcisecuritystandards.org/document_library/)
- `[s3]`: (ISC)² CISSP Certification Exam Outline, effective 2024-04-15, Domain 2 §2.4 (retrieved 2026-04-26, https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline)
