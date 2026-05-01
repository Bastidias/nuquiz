# Biba Properties

**Domain:** 3 — Security Architecture and Engineering &nbsp;|&nbsp; **Pattern:** Aspects &nbsp;|&nbsp; **Tags:** 3.2
**Status:** draft (SME review pending)

The three properties that define the Biba integrity model. Biba is Bell-LaPadula's *integrity* counterpart — its rules prevent low-integrity data from contaminating high-integrity data. The CISSP exam tests both the simple integrity property ("no read down") and the *-integrity property ("no write up") — the inverse of BLP's confidentiality rules.

| aspect | content |
|---|---|
| simple integrity property | Subject cannot read object at lower integrity [s1] |
| *-integrity property (star property) | Subject cannot write object at higher integrity [s1] |
| invocation property | Subject cannot invoke higher-integrity subject [s1] |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. No parentheticals in cells.
- **Tag 3.2 retained from stub.** Maps to (ISC)² 2024 outline §3.2. Sibling Concepts: `bell-lapadula-properties.md` (the confidentiality-side parallel), `integrity-models.md` (the broader integrity-model set).
- **"No read down, no write up."** This mnemonic is the inverse of Bell-LaPadula's "no read up, no write down." Biba prevents low-integrity data from polluting high-integrity data — a high-integrity subject cannot read a low-integrity object (the read might contaminate the subject's reasoning) and cannot write to a higher-integrity object (the write would degrade the higher object's integrity).
- **Why Biba is the inverse of BLP.** Confidentiality and integrity have *opposite* directions of risk. Confidentiality risk is *upward leakage* (high-classified info reaching low-classified contexts). Integrity risk is *downward contamination* (low-integrity data corrupting high-integrity contexts). The same flow direction means different things for the two properties.
- **The invocation property.** Subjects cannot call (invoke) operations of higher-integrity subjects. This prevents a low-integrity subject from triggering high-integrity operations indirectly. Less famous than the simple-integrity and *-integrity properties; rarely tested but worth knowing.
- **Biba is integrity-only.** Like BLP for confidentiality, Biba does not address the other property. A Biba-conformant system could leak information freely as long as integrity is preserved — that is a confidentiality failure that Biba cannot detect. Real systems combine Biba and BLP (or equivalents) when both properties matter.
- **Most software-engineering integrity controls are loosely Biba-aligned.** Code signing (signed code is high-integrity, unsigned is low-integrity, the OS won't load unsigned code = no read down), trusted-package repositories, and CI/CD pipelines that reject untrusted dependencies all implement Biba-style logic without naming it.
- **Trusted Solaris implemented both BLP and Biba.** The trusted variants of Solaris (and Trusted SELinux) enforced both confidentiality and integrity labels on every subject and object. Most modern OSes do not — they typically use DAC and capability-based controls instead.
- **Gaps marked `[needs source]`:** none — all Facts trace to the original Biba paper.

### Tricky distractors

- **Biba is the inverse of BLP.** "No read down, no write up" — opposite directions of BLP's "no read up, no write down." Wrong-answer pattern: applying BLP rules to Biba (or vice versa). The polarity inverts because confidentiality and integrity have opposite risk directions.
- **No write up — counterintuitive.** A high-integrity subject cannot write to a *higher*-integrity object. Wrong-answer pattern: claiming Biba prevents writing *down* — that's BLP. Biba's concern is contamination flowing upward.
- **Biba is integrity-only.** Doesn't address confidentiality. Wrong-answer pattern: claiming Biba protects all CIA properties.
- **Invocation property.** Often forgotten. Subjects cannot *invoke* (call) higher-integrity subjects. Wrong-answer pattern: only knowing simple-integrity and *-integrity. The invocation property is the third Biba property.
- **Biba in production.** Widely used implicitly — code signing, signed package repositories, CI/CD trusted-dependency policies all implement Biba-style logic. Wrong-answer pattern: claiming Biba is "only theoretical."

## Engine demo opportunities

- `? | content → Subject cannot write object at higher integrity` → *-integrity property
- `simple integrity property | content → ?` → `Subject cannot read object at lower integrity`
- `? | content → Subject cannot invoke higher-integrity subject` → invocation property
- Cross-Concept distractor: presented with a Bell-LaPadula property statement, recognize it does not belong to Biba

## Sources

- `[s1]`: K. J. Biba *Integrity Considerations for Secure Computer Systems*, MITRE Technical Report ESD-TR-76-372, April 1977 — original Biba integrity model (retrieved 2026-04-26, sourced via published security-models literature)
- `[s2]`: (ISC)² CISSP Certification Exam Outline, effective 2024-04-15, Domain 3 §3.2 (retrieved 2026-04-26, https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline)
