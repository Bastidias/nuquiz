# Common Criteria EALs

**Domain:** 3 — Security Architecture and Engineering &nbsp;|&nbsp; **Pattern:** Ordered &nbsp;|&nbsp; **Tags:** 3.4
**Status:** draft (SME review pending)

The seven Evaluation Assurance Levels (EALs) defined in ISO/IEC 15408 (Common Criteria), ordered from EAL1 (least assurance) to EAL7 (highest). Each pairs an *assurance level* descriptor with *typical use* and *effort* required. The CISSP exam tests both the ordering and the matchup between EAL and the type of product or environment it suits — particularly the principle that higher EAL means more rigorous *evaluation*, not necessarily a more secure product.

**Layout convention:** rows are ordered by increasing assurance (EAL1 = lowest, EAL7 = highest). Columns progress from identifier (EAL, Name) to characteristic (Assurance Level) to operational implications (Typical use, Effort).

| EAL | Name | Assurance Level | Typical use | Effort |
|---|---|---|---|---|
| 1 | Functionally tested | Lowest assurance [s1] | Confidence requirement is minimal [s1] | Lowest [s1] |
| 2 | Structurally tested | Low assurance with developer cooperation [s1] | Low to moderate confidence requirement [s1] | Low [s1] |
| 3 | Methodically tested and checked | Moderate assurance with positive design analysis [s1] | Moderate confidence requirement [s1] | Moderate [s1] |
| 4 | Methodically designed, tested, and reviewed | Moderate-to-high assurance with rigorous methodology [s1] | Most commercial security products [s1] | Moderate-to-high [s1] |
| 5 | Semi-formally designed and tested | High assurance with semi-formal design [s1] | Specialized security products [s1] | High [s1] |
| 6 | Semi-formally verified design and tested | Very high assurance with verified design [s1] | High-risk environments [s1] | Very high [s1] |
| 7 | Formally verified design and tested | Highest assurance with formal verification [s1] | Extremely high-risk environments [s1] | Highest [s1] |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. No parentheticals in cells.
- **Tag 3.4 retained from stub.** Maps to (ISC)² 2024 outline §3.4 *Understand security capabilities of information systems*.
- **EAL is about *evaluation rigor*, not product security.** The most-tested CISSP nuance. A product certified at EAL4 is not necessarily more secure than a product certified at EAL2 — EAL4 means the evaluation was *more thorough*, not that the product is *more secure*. A secure product with no evaluation is not certified at any EAL.
- **EAL4 is the practical commercial ceiling.** Most commercial products that bother with Common Criteria evaluation aim for EAL4 because it is the highest level achievable without invasive design changes. Higher EALs (5-7) require formal-methods design and verification, which is rare outside specialized security products and government applications.
- **EAL7 requires formal verification.** EAL7 demands mathematical proof of correctness for the security functions. Few commercial products attempt this; it is reserved for specialized cryptographic modules, high-assurance separation kernels (e.g., Green Hills INTEGRITY-178B), and similar high-stakes environments.
- **The Common Criteria Recognition Arrangement (CCRA).** Member nations (28+ countries as of 2024) mutually recognize each other's CC evaluations up to EAL2 plus specific Augmentation. Higher levels may require re-evaluation by the importing country. Recognition cap was lowered from EAL4 to EAL2 in 2014 to reduce evaluation burden.
- **Protection Profiles vs. EALs.** A Protection Profile (PP) defines security requirements for a class of product (e.g., firewalls, mobile devices). Modern CC evaluations have largely shifted from raw EALs to PP conformance — a product is evaluated against a specific PP, with the PP defining the assurance requirements. EAL ratings are still given but are interpreted in PP context.
- **Common Criteria has known limitations.** Critics note that CC evaluation evaluates *a specific configuration of a product against a specific Protection Profile* — a product certified at EAL4 in one configuration may not be at EAL4 in a different one. Evaluation is also point-in-time; subsequent product changes invalidate the certification. Despite these limits, CC remains the international standard.
- **Gaps marked `[needs source]`:** none — all Facts trace to ISO/IEC 15408 or CCRA documentation.

## Engine demo opportunities

- `? | Name → Methodically designed, tested, and reviewed` → EAL 4
- `EAL 7 | Assurance Level → ?` → `Highest assurance with formal verification`
- `? | Typical use → Most commercial security products` → EAL 4
- `EAL 1 | Effort → ?` → `Lowest`
- Sequence verification: `EAL 3 → ? → EAL 5` → EAL 4 — tests Ordered-Pattern progression
- Cross-Row shared-Value detection: `? | Effort → Moderate` → EAL 3 only (EAL 4 is Moderate-to-high)
- Composite Row profile: EAL 1 across all Columns with `Effort` swapped to `Highest` (EAL 7's value)

## Sources

- `[s1]`: ISO/IEC 15408 *Common Criteria for Information Technology Security Evaluation* — particularly Part 3 *Security Assurance Requirements* defining EAL 1-7 (retrieved 2026-04-26, https://www.commoncriteriaportal.org/cc/index.cfm)
- `[s2]`: Common Criteria Recognition Arrangement (CCRA) — international mutual-recognition framework (retrieved 2026-04-26, https://www.commoncriteriaportal.org/ccra/)
- `[s3]`: (ISC)² CISSP Certification Exam Outline, effective 2024-04-15, Domain 3 §3.4 (retrieved 2026-04-26, https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline)
