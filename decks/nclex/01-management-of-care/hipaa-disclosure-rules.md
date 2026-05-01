# HIPAA Disclosure Rules

**Topic:** 1 — Management of Care &nbsp;|&nbsp; **Pattern:** Dimensions &nbsp;|&nbsp; **Tags:** 1.8, 1.14, IP-CD
**Status:** draft (SME review pending)

The seven HIPAA disclosure contexts most often tested on NCLEX. Rows are disclosure categories drawn from the HIPAA Privacy Rule's structure (45 CFR Part 164 Subpart E); columns are the decision attributes a nurse must apply at the point of disclosure. "Treatment, Payment, Operations" (TPO) is canonical HIPAA terminology — kept as three distinct Rows because each has a different operational footprint in nursing practice even though the rule groups them together for authorization purposes. The "Family member by default" Row captures the §164.510 informal-permission pathway: HIPAA permits limited disclosure to family without written authorization when the patient has the opportunity to agree, acquiesce, or object.

| Disclosure context | authorization required? | minimum-necessary applies? | example |
|---|---|---|---|
| Treatment | No [s2, s3] | No [needs source] | Sharing chart with consulting specialist [s3]<br>Reporting handoff to receiving nurse [s3] |
| Payment | No [s2, s3] | Yes [needs source] | Submitting claim to insurer [s3]<br>Verifying coverage with payer [s3] |
| Operations | No [s2, s3] | Yes [needs source] | Internal quality-improvement audit [s3]<br>Staff training on de-identified records [s3] |
| Public-health reporting | No [s2, s3] | Yes [needs source] | Reporting communicable disease to public health authority [s2, s3]<br>Reporting suspected child abuse [s3] |
| Court order | No [s2, s3] | Yes [needs source] | Releasing records under court-issued subpoena [s3]<br>Responding to judicial proceeding order [s2] |
| Client written authorization | Yes [s3] | Yes [needs source] | Releasing records to employer at client request [s3]<br>Sharing records with life-insurance underwriter [s3] |
| Family member by default | No [s2] | Yes [needs source] | Telling spouse at bedside about pain-medication schedule with client acquiescence [s2]<br>Discussing care with adult child the client identifies as involved [s2] |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. No parentheticals in cells.
- **Why TPO is split into three Rows.** HIPAA groups Treatment, Payment, and Health Care Operations as a single authorization category in 45 CFR 164.506, but each context has different nursing examples and different minimum-necessary application (treatment is exempt from minimum-necessary; payment and operations are subject to it). Splitting exposes the shared `No` authorization Value across all three Rows while preserving the divergent `minimum-necessary applies?` Values.
- **"Family member by default" is the §164.510 pathway.** Per CDC PHLP: "An entity can obtain informal permission by asking the individual outright, or by circumstances that clearly give the individual the opportunity to agree, acquiesce, or object" [s2]. This is the default mechanism for routine bedside conversations with family — it does NOT require a signed authorization, but it does require that the client have the opportunity to object and not have done so. If the client is incapacitated, a separate provision (professional judgment that disclosure is in the client's best interest) applies.
- **Court order vs subpoena.** The Privacy Rule treats a court-issued order differently from an attorney-issued subpoena — a court order alone permits disclosure, while a subpoena typically requires either client notice or a qualified protective order before disclosure. NCLEX tests this distinction at the level of "court order = permitted disclosure," consistent with [s2]'s grouping of "Judicial and administrative proceedings" under the 12 national priority purposes.
- **Mandatory reporting overlaps Row 4.** Suspected child abuse, elder abuse, and certain communicable diseases are covered both by HIPAA's "public health activities" and "victims of abuse" national-priority purposes [s2] AND by state mandatory-reporting laws. Sibling Concept `mandatory-reporting-categories.md` (Tag 1.14) covers the reporter/timeframe/recipient details; this Concept stays at the HIPAA-permission level.
- **Out of scope.** This Concept does NOT cover: the §164.512 sub-permissions for research, organ donation, deceased persons, or workers' compensation (12 national priority purposes total per [s2]); the 30-day patient access response timeframe (covered under client rights, Tag 1.5); or HIPAA Security Rule technical safeguards (covered under EHR documentation, Tag 1.13).

### Tricky distractors

- **Treatment vs Operations.** A new nurse may classify quality-improvement chart audits as "treatment" because they involve clinical records. They are Operations, not Treatment — and Operations is subject to minimum-necessary while Treatment is not. Wrong-answer pattern: applying the treatment-exemption logic to QI audits.
- **Court order vs subpoena vs request.** A subpoena from an attorney is NOT the same as a court order from a judge. A court order permits disclosure; a subpoena alone generally requires additional safeguards. Wrong-answer pattern: releasing records to any document with a court-looking letterhead.
- **Family at bedside.** Some students assume any family disclosure requires written authorization. It does not — the §164.510 acquiescence pathway permits disclosure when the client is present and does not object. Wrong-answer pattern: refusing to discuss care with a spouse the client has invited into the room.
- **"Need to know" vs minimum-necessary.** Treatment disclosures are exempt from minimum-necessary so a consulting specialist can review the full chart. Wrong-answer pattern: redacting a chart before sending to a consultant.
- **Public health reporting authorization.** Communicable-disease reporting does NOT require client authorization or even client notification before reporting. Wrong-answer pattern: refusing to report a positive TB result until the client signs a release.

### Values without a direct public citation

| Cell | Value | Why unsourced |
|---|---|---|
| Treatment × minimum-necessary applies? | No | 45 CFR 164.502(b)(2) exempts treatment disclosures from the minimum-necessary standard. The CFR text was not directly retrievable from ecfr.gov during authoring (the site returned a CAPTCHA wall through 2026-04-26); the rule is universally documented in HIPAA secondary sources but was not quoted from a primary public source on the allowlist. SME should confirm against the CFR. |
| Payment × minimum-necessary applies? | Yes | 45 CFR 164.502(b)(1) applies minimum-necessary to most disclosures, with treatment and several other categories enumerated as exempt in (b)(2); payment is NOT enumerated as exempt and therefore is subject. Same source-access caveat as above. |
| Operations × minimum-necessary applies? | Yes | Same rationale as payment — operations are not in the (b)(2) exemption list, so minimum-necessary applies. |
| Public-health reporting × minimum-necessary applies? | Yes | Public-health disclosures under §164.512(b) are subject to minimum-necessary; the (b)(2) exemption list does not include public health. Same source-access caveat. |
| Court order × minimum-necessary applies? | Yes | Judicial-proceeding disclosures under §164.512(e) are subject to minimum-necessary; not in the (b)(2) exemption list. Same source-access caveat. |
| Client written authorization × minimum-necessary applies? | Yes | 45 CFR 164.502(b)(2)(iii) exempts disclosures made pursuant to an authorization under §164.508 from the minimum-necessary standard — meaning when the client signs an authorization, the entity may disclose what the authorization specifies even if more than minimum-necessary. SME should review: the cell currently reads "Yes" reflecting common pedagogical framing (the entity should still scope to what the authorization names), but the regulatory exemption is on point. Same source-access caveat. |
| Family member by default × minimum-necessary applies? | Yes | §164.510 disclosures default to information directly relevant to the family member's involvement in the client's care or payment for care — this functions as a minimum-necessary equivalent at the cell level. Same source-access caveat. |

## Engine demo opportunities

- `Treatment | authorization required? → ?` → No
- `Client written authorization | authorization required? → ?` → Yes
- `? | authorization required? → No` → Treatment, Payment, Operations, Public-health reporting, Court order, Family member by default (cross-Row select-all, shared-Value detection)
- `? | authorization required? → Yes` → Client written authorization (single-Row select)
- `Public-health reporting | example → ?` → Reporting communicable disease to public health authority, Reporting suspected child abuse (multi-Fact cell)
- `? | minimum-necessary applies? → No` → Treatment (single-Row select once SME confirms the per-cell values)
- Composite Row profile: Operations across all Columns, with the `minimum-necessary applies?` cell swapped to `No` (a Treatment Value) — tests the Treatment-exemption distinction.

## Sources

- `[s1]`: NCSBN NCLEX-RN Test Plan, effective April 1, 2026 through March 31, 2029, §1.8 Confidentiality / Information Security and §1.14 Legal Rights and Responsibilities (retrieved 2026-04-26, https://www.ncsbn.org/publications/2026-nclex-rn-test-plan)
- `[s2]`: CDC Public Health Law Program, "Health Insurance Portability and Accountability Act of 1996 (HIPAA)" — permitted uses and disclosures, 12 national priority purposes, opportunity to agree/acquiesce/object (retrieved 2026-04-26, https://www.cdc.gov/phlp/php/resources/health-insurance-portability-and-accountability-act-of-1996-hipaa.html)
- `[s3]`: NIH/NLM NCBI Bookshelf, StatPearls, "Health Insurance Portability and Accountability Act" — Privacy Rule sections on TPO, written authorization, public health, court orders, family disclosure, minimum-necessary (retrieved 2026-04-26, https://www.ncbi.nlm.nih.gov/books/NBK500019/)
