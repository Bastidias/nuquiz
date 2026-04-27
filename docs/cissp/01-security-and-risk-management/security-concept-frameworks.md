# Security Concept Frameworks

**Domain:** 1 — Security and Risk Management &nbsp;|&nbsp; **Pattern:** Dimensions &nbsp;|&nbsp; **Tags:** 1.2
**Status:** draft (SME review pending)

Four conceptual frameworks the CISSP exam uses to teach the foundational security properties. CIA is the canonical triad (Confidentiality, Integrity, Availability); DAD is its inverse (Disclosure, Alteration, Destruction) — the threats CIA defends against; IAAA is the access-control framework (Identification, Authentication, Authorization, Accounting); Parkerian Hexad extends CIA with three additional properties (Possession, Authenticity, Utility). The exam tests both the per-framework definition and the matchup between framework and the situation it best models.

| framework | components | focus | when used |
|---|---|---|---|
| CIA | Confidentiality [s1]<br>Integrity [s1]<br>Availability [s1] | Three foundational security properties [s1] | Default reference for security-property analysis [s1] |
| DAD | Disclosure [s2]<br>Alteration [s2]<br>Destruction [s2] | Threats that violate CIA [s2] | Threat-modeling and risk discussion [s2] |
| IAAA | Identification [s3]<br>Authentication [s3]<br>Authorization [s3]<br>Accounting [s3] | Access-control sequence [s3] | Access-management design [s3] |
| Parkerian Hexad | Confidentiality [s4]<br>Integrity [s4]<br>Availability [s4]<br>Possession [s4]<br>Authenticity [s4]<br>Utility [s4] | Six security properties extending CIA [s4] | Cases where CIA misses a key property [s4] |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. No parentheticals in cells. The components column carries multi-Fact cells because each framework's components are *its definition*.
- **Tag 1.2 retained from stub.** Maps to (ISC)² 2024 outline §1.2. Sibling Concept: `cia-triad.md` (CIA itself as a focused Concept), `aaa-extensions.md` (IAAA at the access-control angle).
- **CIA is the default; everything else is an extension.** Confidentiality (data not disclosed to unauthorized parties), Integrity (data not altered without authorization), Availability (data and systems accessible when needed). Almost every CISSP question can be analyzed through the CIA lens; the alternative frameworks exist for cases where CIA is insufficient.
- **DAD is "CIA from the threat side."** Disclosure violates Confidentiality; Alteration violates Integrity; Destruction violates Availability. Useful for threat-modeling because it forces you to think in the attacker's frame — "what does a successful attack look like?" — which shifts the analysis from "what could go wrong?" to "what would the attacker do?"
- **IAAA was originally AAA.** RADIUS/DIAMETER's original AAA (Authentication, Authorization, Accounting) was extended in CISSP courseware to add Identification at the front (you must claim an identity before authenticating it). Some references add Auditing at the back. See `aaa-extensions.md` for the five-component decomposition.
- **The Parkerian Hexad's three additions.** Possession (control of an asset distinct from access to its content — losing a USB drive of encrypted data violates possession even though confidentiality holds), Authenticity (the data is what it claims to be — distinct from integrity, which is about *unmodified*), Utility (the data is *useful*, not just *intact* — encrypted data with a lost key has integrity but no utility). Donn Parker proposed this in 1998 to address gaps in CIA.
- **When does each framework win?** CIA is the default for security-property analysis. DAD is best when discussing risk and threats. IAAA is best for access-control design. Parkerian Hexad shines for edge cases — physical asset loss, supply-chain spoofing, ransomware where data is intact-but-unusable.
- **Other frameworks (intentionally not on this table).** STRIDE (in `stride-categories.md` for threat modeling), DREAD (risk scoring; deprecated), SABSA (enterprise security architecture), TOGAF (enterprise architecture). These operate at different levels of abstraction than the four security-property frameworks here.
- **Gaps marked `[needs source]`:** none — all Facts are CISSP-canonical.

### Tricky distractors

- **CIA vs DAD.** CIA = properties to protect. DAD = threats that violate. Wrong-answer pattern: collapsing them — they're complementary perspectives.
- **Parkerian Hexad adds Possession, Authenticity, Utility.** Parker 1998 extension. Wrong-answer pattern: claiming the Hexad has three components — it's six (CIA plus three).
- **Possession ≠ Confidentiality.** Lost encrypted USB violates Possession but not Confidentiality. Wrong-answer pattern: collapsing them — Parker specifically separated these.
- **Authenticity ≠ Integrity.** Authenticity is "what it claims to be"; integrity is "unmodified". Wrong-answer pattern: equating them — supply-chain spoofing violates authenticity even with intact data.
- **Utility ≠ Availability.** Encrypted data with lost key has integrity and availability but no utility. Wrong-answer pattern: claiming utility is just availability under another name — it's distinct.
- **STRIDE is threat modeling, not a security-property framework.** Different level of abstraction. Wrong-answer pattern: listing STRIDE alongside CIA/DAD/IAAA — different category.

## Engine demo opportunities

- `? | components → Disclosure` → DAD
- `Parkerian Hexad | components → ?` → any of the six properties (CIA + Possession + Authenticity + Utility)
- `? | focus → Three foundational security properties` → CIA
- `IAAA | focus → ?` → `Access-control sequence`
- Cross-Row shared-Value detection: `? | components → Confidentiality` → CIA, Parkerian Hexad
- Composite Row profile: CIA across all Columns with `components` augmented with `Possession` (Parkerian Hexad's value) — engine should detect the substitution

## Sources

- `[s1]`: NIST SP 800-12 Rev. 1 *An Introduction to Information Security* — CIA triad definition (retrieved 2026-04-26, https://csrc.nist.gov/pubs/sp/800/12/r1/final)
- `[s2]`: CISSP CBK — DAD as the inverse-of-CIA threat framing (retrieved 2026-04-26, sourced via published CISSP study guide summaries)
- `[s3]`: NIST SP 800-63 Digital Identity Guidelines series and RFC 2865 RADIUS — IAAA / AAA framing (retrieved 2026-04-26, https://csrc.nist.gov/pubs/sp/800/63 and https://www.rfc-editor.org/rfc/rfc2865)
- `[s4]`: Donn Parker *Fighting Computer Crime* (1998) — Parkerian Hexad introducing Possession, Authenticity, Utility extensions to CIA (retrieved 2026-04-26, sourced via published security-literature summaries)
- `[s5]`: (ISC)² CISSP Certification Exam Outline, effective 2024-04-15, Domain 1 §1.2 (retrieved 2026-04-26, https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline)
