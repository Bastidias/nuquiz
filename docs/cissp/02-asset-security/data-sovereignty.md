# Data Sovereignty

**Domain:** 2 — Asset Security &nbsp;|&nbsp; **Pattern:** Aspects &nbsp;|&nbsp; **Tags:** 2.6
**Status:** draft (SME review pending)

The principle that data is subject to the laws of the jurisdiction in which it physically resides. This Concept renders sovereignty as an Aspects table because it is a single legal concept examined from multiple angles: what it *means*, what *drives it*, *examples of conflict*, and how organizations *mitigate* it. The CISSP exam tests both the basic definition and the cross-jurisdiction conflicts (especially U.S. CLOUD Act vs. EU GDPR).

| aspect | content |
|---|---|
| what it means | Data physically located in a jurisdiction is subject to that jurisdiction's laws [s1]<br>Sovereignty applies independent of citizenship of data subject [s1]<br>Sovereignty applies independent of organizational nationality [s1] |
| key drivers | National privacy laws (GDPR, LGPD) [s1]<br>National security laws (CLOUD Act, surveillance authorities) [s2]<br>Sectoral regulations (banking, health) [s1] |
| conflict examples | EU subject data on U.S.-operated cloud subject to U.S. CLOUD Act vs. GDPR [s2]<br>Chinese law requiring data localization vs. multinational operations [s1] |
| mitigation | Sovereign cloud deployment in subject's jurisdiction [s2]<br>Standard Contractual Clauses for cross-border transfers [s1]<br>Encryption with customer-controlled keys [s2] |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. No parentheticals in cells.
- **Tag 2.6 retained from stub.** Maps to (ISC)² 2024 outline §2.6 *Determine data security controls and compliance requirements*. Sibling Concept: `cloud-data-residency-models.md` (the deployment-model angle).
- **Why Aspects pattern.** Sovereignty is a single legal concept, not a set of types. The Aspects table examines it from four angles. A Dimensions table would imply each row is a *kind* of sovereignty, which is wrong — sovereignty has flavors only insofar as different jurisdictions enact different sovereignty rules.
- **The CLOUD Act / GDPR conflict is the test favorite.** The U.S. CLOUD Act (2018) authorizes U.S. courts to compel U.S.-based cloud providers to produce data they hold *regardless of where it is stored*. GDPR prohibits transfer of EU subject data to jurisdictions without adequate protection without specific safeguards (Schrems II). The conflict: a U.S. court could compel a U.S. provider to disclose EU-subject data stored in EU data centers, breaching GDPR. Sovereign cloud is the structural mitigation.
- **Sovereignty is independent of subject citizenship.** A Spanish citizen's data stored in a U.S. data center is subject to U.S. law (CLOUD Act, surveillance authorities) even though the subject is Spanish. The flip side: a U.S. citizen's data stored in an EU data center is subject to EU law (GDPR). Citizenship determines *some* legal relationships; physical location determines others.
- **Standard Contractual Clauses (SCCs) are the GDPR cross-border mechanism.** When EU data must be transferred outside the EEA, GDPR requires either an adequacy decision (designating the destination as having equivalent protection) or specific safeguards. SCCs are template contracts that the EU has approved for cross-border transfers. They are widely used but not bulletproof — Schrems II found SCCs alone insufficient when the destination's surveillance laws conflict with GDPR.
- **Customer-controlled encryption keys are the technical mitigation.** If data is encrypted with keys the cloud provider does not have access to (HYOK / BYOK / HSM-held keys), then a legal demand to the provider yields ciphertext rather than plaintext. This shifts the legal burden — the demanding authority must compel the customer instead. Not a complete solution but a meaningful protection layer.
- **Data localization laws are an emerging sovereignty extension.** China, Russia, India, and several other jurisdictions have laws requiring certain data categories to be *stored* within the jurisdiction. This is sovereignty enforcement at the architecture level — the host country claims jurisdiction *and* requires that data not leave.
- **Gaps marked `[needs source]`:** none — all Facts trace to GDPR, CLOUD Act, or published Schrems II analysis.

## Engine demo opportunities

- `? | content → Data physically located in a jurisdiction is subject to that jurisdiction's laws` → what it means aspect
- `key drivers | content → ?` → any of the listed driver categories
- `? | content → Sovereign cloud deployment in subject's jurisdiction` → mitigation aspect
- `conflict examples | content → ?` → cross-Concept linkage to legal-conflict scenarios
- Cross-aspect distractor: presented with one Fact, identify which aspect it belongs to (engine tests boundary judgment)

## Sources

- `[s1]`: EU General Data Protection Regulation, Articles 44-49 (international transfers) and Recital 23 (territorial scope) (retrieved 2026-04-26, https://eur-lex.europa.eu/eli/reg/2016/679/oj)
- `[s2]`: U.S. Clarifying Lawful Overseas Use of Data Act (CLOUD Act), 18 U.S.C. §2713 — extraterritorial law-enforcement reach over U.S. providers (retrieved 2026-04-26, https://www.justice.gov/opa/pr/promoting-public-safety-privacy-and-rule-law-around-world-purpose-and-impact-cloud-act). Schrems II decision (Case C-311/18, July 2020) — invalidated Privacy Shield and constrained SCC use (retrieved 2026-04-26, https://curia.europa.eu/juris/document/document.jsf?docid=228677)
- `[s3]`: (ISC)² CISSP Certification Exam Outline, effective 2024-04-15, Domain 2 §2.6 (retrieved 2026-04-26, https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline)
