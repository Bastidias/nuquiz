# IP Protections

**Domain:** 1 — Security and Risk Management &nbsp;|&nbsp; **Pattern:** Dimensions &nbsp;|&nbsp; **Tags:** 1.5
**Status:** draft (SME review pending)

The four primary intellectual-property protection regimes the CISSP exam covers. Each protects a different *kind* of asset (creative expression, brand identity, invention, business secret), runs for a different *duration*, and has different *registration requirements*. The exam tests both the matchup between asset and protection mechanism and the duration/registration trivia (especially the patent-vs-copyright duration distinction).

| protection | what it protects | duration | registration required? | example |
|---|---|---|---|---|
| Copyright | Original works of authorship fixed in tangible form [s1] | Life of author plus 70 years [s1] | No, but registration required to sue for infringement [s1] | Software source code [s1] |
| Trademark | Words, symbols, and designs identifying source of goods or services [s2] | Indefinite if continuously used and renewed [s2] | No, but registration provides federal protection [s2] | Brand logo [s2] |
| Patent | Novel and useful inventions [s3] | 20 years from filing for utility patents [s3] | Yes [s3] | Cryptographic algorithm implementation [s3] |
| Trade Secret | Information with economic value derived from secrecy [s4] | Indefinite as long as secrecy maintained [s4] | No [s4] | Source-code obfuscation algorithm [s4] |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. No parentheticals in cells.
- **Tag 1.5 retained from stub.** Maps to (ISC)² 2024 outline §1.5 — intellectual property requirements as part of legal/regulatory obligations.
- **Copyright vs. patent vs. trade secret for software.** Software can be protected by all three simultaneously, with different scope: copyright protects the *expression* (the specific code); patent protects the *invention* (a novel algorithm); trade secret protects the *non-public details* (build internals, customer data structures). Most commercial software stacks use copyright + trade secret; patents apply to specific innovations.
- **Trademark protects brand identity, not products.** A trademark protects the *mark* (the brand name, logo, slogan) — not the product itself. Apple has a trademark on "Apple" and the apple logo for computers, not on the design of MacBooks (that is industrial design, related but distinct).
- **Trade secret protection ends the moment the secret is public.** Unlike copyright/patent/trademark, which are *registered* rights, trade secret protection exists only because the information is *not known*. Reverse engineering a product to discover the trade secret is generally legal; theft of the trade secret (industrial espionage) is not. This is the test-favorite trade-secret nuance.
- **Patent duration started counting at filing, not grant.** Utility patents in the U.S. last 20 years from the *filing* date, not the grant date. The patent-prosecution process (back-and-forth with the patent office) can take years, eating into the 20-year term. This is a CISSP exam-favorite trivia point.
- **Copyright duration depends on authorship.** "Life of author plus 70 years" applies to individual works. Works made for hire (corporate authorship) last 95 years from publication or 120 years from creation, whichever is shorter. The Concept's row simplifies; the corporate-authorship case is widely tested.
- **What is intentionally not on this table.** Industrial design rights, geographical indications (GIs), publicity rights, and moral rights are additional IP regimes that exist in some jurisdictions. The four here cover the most-tested CISSP scope. International treaties (Berne Convention, Madrid Protocol, PCT) governing cross-border IP are separate.
- **Gaps marked `[needs source]`:** none — all Facts trace to U.S. IP statute and USPTO/Copyright Office guidance.

### Tricky distractors

- **Patent = 20 years from filing.** Not from grant. Wrong-answer pattern: counting 20 years from grant date — prosecution time eats into the term.
- **Copyright = life + 70 (individual).** Works for hire are 95 from publication / 120 from creation, whichever is shorter. Wrong-answer pattern: applying life+70 to corporate-authored works.
- **Trade secret protection ends with disclosure.** Once public, gone. Wrong-answer pattern: claiming trade secret survives accidental disclosure — legal theft remedies survive but the secrecy basis is lost.
- **Reverse engineering is generally legal.** It does not violate trade-secret law unless paired with NDA breach or theft. Wrong-answer pattern: claiming reverse engineering is trade-secret theft.
- **Trademark protects brand identity, not products.** "Apple" name, not MacBook design. Wrong-answer pattern: confusing trademark with industrial design or trade dress.
- **Software can use multiple IP regimes simultaneously.** Copyright (expression) + patent (invention) + trade secret (internals). Wrong-answer pattern: claiming software must pick one regime — most commercial stacks layer all three.

## Engine demo opportunities

- `? | duration → 20 years from filing for utility patents` → Patent
- `Trade Secret | registration required? → ?` → `No`
- `? | what it protects → Original works of authorship fixed in tangible form` → Copyright
- `Trademark | duration → ?` → `Indefinite if continuously used and renewed`
- Cross-Row distractor: `Copyright | registration required? → ?` with `Yes` (Patent) as a tempting wrong answer (copyright registration is not strictly required for protection, only to sue)
- `? | example → Brand logo` → Trademark
- Composite Row profile: Copyright across all Columns with `duration` swapped to `20 years from filing for utility patents` (Patent's value)

## Sources

- `[s1]`: U.S. Copyright Act of 1976 (17 U.S.C.) and U.S. Copyright Office guidance (retrieved 2026-04-26, https://www.copyright.gov/title17/)
- `[s2]`: Lanham Act (15 U.S.C.) and USPTO trademark registration guidance (retrieved 2026-04-26, https://www.uspto.gov/trademarks)
- `[s3]`: U.S. Patent Act (35 U.S.C.) and USPTO patent application guidance (retrieved 2026-04-26, https://www.uspto.gov/patents)
- `[s4]`: Defend Trade Secrets Act of 2016 (18 U.S.C. §1836) and Uniform Trade Secrets Act (UTSA) — federal and state trade-secret protection (retrieved 2026-04-26, https://www.law.cornell.edu/uscode/text/18/1836)
- `[s5]`: (ISC)² CISSP Certification Exam Outline, effective 2024-04-15, Domain 1 §1.5 (retrieved 2026-04-26, https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline)
