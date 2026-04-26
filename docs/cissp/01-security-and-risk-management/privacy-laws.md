# Privacy Laws

**Domain:** 1 — Security and Risk Management &nbsp;|&nbsp; **Pattern:** Dimensions &nbsp;|&nbsp; **Tags:** 1.4, 1.5
**Status:** draft (SME review pending)

Five privacy regulations the CISSP exam most often tests by name. GDPR is the EU template; CCPA is the U.S. state-level template (specifically California); HIPAA governs U.S. healthcare data; PIPEDA governs Canadian commercial activity; LGPD is Brazil's GDPR-aligned regime. Each pairs a *jurisdiction* with a *scope*, *key rights granted to data subjects*, *penalties* for non-compliance, and *enforcement* authority.

| law | jurisdiction | scope | key rights | penalties | enforcement |
|---|---|---|---|---|---|
| GDPR | European Union [s1] | Personal data of EU data subjects [s1] | Right to access [s1]<br>Right to erasure [s1]<br>Right to portability [s1] | Up to 4% of global annual turnover [s1] | EU Data Protection Authorities [s1] |
| CCPA | California [s2] | Personal information of California residents [s2] | Right to know [s2]<br>Right to delete [s2]<br>Right to opt out of sale [s2] | Up to USD 7,500 per intentional violation [s2] | California Privacy Protection Agency [s2] |
| HIPAA | United States [s3] | Protected Health Information held by covered entities [s3] | Right to access health records [s3]<br>Right to request correction [s3] | Up to USD 1.5 million per violation category per year [s3] | HHS Office for Civil Rights [s3] |
| PIPEDA | Canada [s4] | Personal information collected in commercial activity [s4] | Right to access [s4]<br>Right to challenge accuracy [s4] | Up to CAD 100,000 per violation [s4] | Office of the Privacy Commissioner of Canada [s4] |
| LGPD | Brazil [s5] | Personal data of individuals in Brazil [s5] | Right to access [s5]<br>Right to deletion [s5]<br>Right to portability [s5] | Up to 2% of Brazil revenue per violation [s5] | Autoridade Nacional de Proteção de Dados [s5] |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. No parentheticals in cells.
- **Tags 1.4 and 1.5 retained from stub.** Cross-tagged. Sibling Concept: `industry-standards.md` (compliance regimes that are not primarily privacy-focused).
- **GDPR is the model.** GDPR's framing — broad scope based on data subject location, strong subject rights, severe percentage-of-revenue penalties, designated supervisory authority — has been imitated by LGPD (almost identically), Brazil's regime, and partially by U.S. state laws (CCPA, CPRA, Colorado, Virginia, etc.). The CISSP exam treats GDPR as the reference framework against which others are compared.
- **CCPA was extended by CPRA.** CCPA (effective 2020) was substantially extended by CPRA (effective 2023), creating the California Privacy Protection Agency and adding rights such as correction and limit on use of sensitive personal information. This Concept rolls them together as "CCPA" per common usage; an authoritative answer would say "CCPA as amended by CPRA."
- **HIPAA is sectoral, not horizontal.** Most modern privacy laws apply to *all* personal data; HIPAA applies only to *protected health information* (PHI) held by *covered entities* (providers, plans, clearinghouses) and their business associates. A fitness tracker company that is not a covered entity is generally not subject to HIPAA even though it collects health data — that data may instead be subject to FTC Act §5, state privacy laws, or other sector laws.
- **Penalties are structured very differently.** GDPR caps at 4% of *global* annual turnover — uniquely punishing for large multinationals. CCPA is per-violation with intentional-violation premiums. HIPAA is tiered by category (annual cap per category). PIPEDA was historically weak (CAD 100,000 max); recent updates (CPPA bill) propose much higher penalties. LGPD caps at 2% of *Brazil* revenue (much narrower base than GDPR).
- **Enforcement varies by structure.** GDPR has *one* DPA per member state with a lead supervisory authority for cross-border cases. CCPA enforcement was originally by the California Attorney General and shifted to the dedicated CPPA in 2023. HIPAA enforcement is OCR with FBI involvement for criminal cases. PIPEDA enforcement is the federal Privacy Commissioner with limited direct sanction power historically.
- **What is intentionally not on this table.** State data-breach notification laws (all 50 U.S. states have some form), CPRA-derived state laws (Virginia, Colorado, Connecticut, Utah, Delaware, etc.), China's PIPL, and India's DPDP Act are equally important but not on the test as named regulations as frequently as the five here. Could be added in future revisions.
- **Gaps marked `[needs source]`:** none — all Facts trace to the published regulatory text or supervisory-authority guidance.

## Engine demo opportunities

- `? | jurisdiction → European Union` → GDPR
- `HIPAA | scope → ?` → `Protected Health Information held by covered entities`
- `? | enforcement → California Privacy Protection Agency` → CCPA
- `LGPD | jurisdiction → ?` → `Brazil`
- `GDPR | penalties → ?` with `Up to USD 1.5 million per violation category per year` (HIPAA) and `Up to CAD 100,000 per violation` (PIPEDA) as distractors
- Cross-Row shared-Value detection: `? | key rights → Right to access` → GDPR, HIPAA, PIPEDA, LGPD (most rows; only CCPA uses different terminology)
- Composite Row profile: HIPAA across all Columns with `enforcement` swapped to `Office of the Privacy Commissioner of Canada` (PIPEDA's value)

## Sources

- `[s1]`: EU General Data Protection Regulation (Regulation (EU) 2016/679), effective 2018-05-25 (retrieved 2026-04-26, https://eur-lex.europa.eu/eli/reg/2016/679/oj)
- `[s2]`: California Consumer Privacy Act (Cal. Civ. Code §1798.100 et seq.) as amended by California Privacy Rights Act (CPRA) (retrieved 2026-04-26, https://oag.ca.gov/privacy/ccpa)
- `[s3]`: U.S. Health Insurance Portability and Accountability Act of 1996, particularly the Privacy Rule (45 CFR Part 164) (retrieved 2026-04-26, https://www.hhs.gov/hipaa/for-professionals/privacy/index.html)
- `[s4]`: Personal Information Protection and Electronic Documents Act (S.C. 2000, c. 5) — Canadian federal commercial-sector privacy law (retrieved 2026-04-26, https://www.priv.gc.ca/en/privacy-topics/privacy-laws-in-canada/the-personal-information-protection-and-electronic-documents-act-pipeda/)
- `[s5]`: Lei Geral de Proteção de Dados Pessoais (Lei nº 13.709/2018) — Brazil's general personal data protection law (retrieved 2026-04-26, https://www.gov.br/anpd/pt-br)
- `[s6]`: (ISC)² CISSP Certification Exam Outline, effective 2024-04-15, Domain 1 §1.4 and §1.5 (retrieved 2026-04-26, https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline)
