# Privacy by Design Principles

**Domain:** 1 — Security and Risk Management &nbsp;|&nbsp; **Pattern:** Dimensions &nbsp;|&nbsp; **Tags:** 1.4
**Status:** draft (SME review pending)

The seven foundational principles of Privacy by Design (PbD) articulated by Ann Cavoukian, former Information and Privacy Commissioner of Ontario [s1]. PbD is referenced explicitly in GDPR Article 25 ("Data protection by design and by default") and is the architectural framework underpinning most modern privacy regulation. CISSP testing focuses on the per-principle definitions and on the matchup between principle and design pattern.

| Principle | core idea | typical implementation |
|---|---|---|
| Proactive not reactive | Anticipate and prevent privacy invasions before they occur | Threat modeling for privacy<br>Privacy impact assessments before launch |
| Privacy as the default setting | No user action required to obtain privacy | Opt-in for data sharing<br>Minimum data collection by default |
| Privacy embedded into design | Privacy is integral to the system architecture | Privacy requirements in design specifications |
| Full functionality positive-sum | Privacy and other interests both achievable | Differential privacy enabling analytics with privacy preserved |
| End-to-end security | Privacy throughout data lifecycle from collection to destruction | Encryption at rest and in transit<br>Sanitization at disposal |
| Visibility and transparency | Practices and policies open to verification | Privacy notices<br>Audit logs accessible to data subjects |
| Respect for user privacy | User-centric design putting individual interests first | Granular user controls<br>Easy access to user's own data |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. **No parentheticals in cells.**
- **Cavoukian's seven principles.** Ann Cavoukian articulated PbD in the 1990s; the principles were formally adopted as an international standard by the 32nd International Conference of Data Protection and Privacy Commissioners in 2010. They remain the foundational vocabulary for privacy engineering.
- **GDPR Article 25 codifies PbD.** "Data protection by design and by default" is GDPR Article 25, which makes PbD a *legal requirement* for organizations subject to GDPR. The two parts: data protection *by design* (architecturally) and *by default* (most-private settings out of the box).
- **Proactive vs reactive.** The first principle is the philosophical anchor — privacy must be designed *into* systems, not *added on after* an incident. Modern Privacy Impact Assessments (PIAs) and Data Protection Impact Assessments (DPIAs under GDPR) operationalize this principle.
- **Privacy as the default — the GDPR opt-in / opt-out distinction.** The principle says systems should require *no* user action to be private. GDPR codifies this as opt-in consent for many data uses — the user must affirmatively choose to share, not opt out of sharing.
- **End-to-end security overlaps CIA but is privacy-specific.** Privacy lifecycle covers collection, processing, storage, sharing, retention, disposal — each step needs protection. Sibling Concept `data-lifecycle-phases` in D2 covers the lifecycle; this principle requires *privacy-aware* controls at each phase.
- **Full functionality positive-sum.** Argues against the false trade-off between privacy and other goals (security, business value, user experience). Modern privacy-enhancing technologies (PETs) — differential privacy, federated learning, homomorphic encryption — are the technical answer to this principle.
- **Visibility and transparency — accountability.** GDPR's accountability principle (Article 5(2)) requires controllers to demonstrate compliance. Translates technically to audit logs, privacy notices, data-subject access mechanisms, breach-notification procedures.
- **Respect for user privacy — user-centric.** Granular controls (which categories of data sharing the user opts into), data portability (export your data), right to erasure, right to access. Most modern privacy regulations operationalize this principle.
- **PETs — Privacy Enhancing Technologies.** Differential privacy, k-anonymity, l-diversity, t-closeness, federated learning, secure multi-party computation, homomorphic encryption, zero-knowledge proofs. Each addresses specific PbD principles. Out of scope for individual cells but worth knowing as the technical menu.
- **Cross-Concept link.** Sibling Concepts: `privacy-laws` (the regulations that codify PbD), `anonymization-vs-pseudonymization` in D2 (PETs implementations), `data-lifecycle-phases` in D2 (the lifecycle PbD applies across).
- **Out of scope for this Concept:** specific PIA/DPIA methodologies, specific PET implementations, ISO 27701 (privacy information management system extension to ISO 27001), NIST Privacy Framework v1.0, Federal Trade Commission Section 5 enforcement of privacy promises.

### Tricky distractors

- **PbD vs Privacy Impact Assessment.** PbD is the *architectural philosophy*; PIA is one *operational tool* for implementing it. The exam may conflate them — correct answer: PIA is part of "Proactive not reactive."
- **GDPR Article 25 wording.** The article says "data protection by design *and* by default." Both parts. Wrong-answer pattern: "GDPR requires only privacy by design, not by default."
- **"Positive-sum" as a security trade-off.** The Full Functionality principle explicitly rejects the framing of privacy *vs* security. Wrong-answer pattern: claiming privacy and security are inherently in tension. Correct: PbD argues they are achievable together via PETs.
- **Privacy by Default vs Privacy by Design.** Sometimes presented as separate principles. Cavoukian's framework calls "Privacy as the default setting" a *single* principle within the seven; GDPR Article 25 splits them into "by design" and "by default" requirements.

### Values without a direct public citation

| Cell | Value | Why unsourced |
|---|---|---|
| All rows × typical implementation | Implementation examples | Cavoukian's framework [s1] articulates principles without prescribing specific implementations; cell values are pedagogical examples. |

## Engine demo opportunities

- `Proactive not reactive | core idea → ?` → `Anticipate and prevent privacy invasions before they occur`
- `Privacy as the default setting | core idea → ?` → `No user action required to obtain privacy`
- `End-to-end security | typical implementation → ?` → `Encryption at rest and in transit`, `Sanitization at disposal`
- `? | core idea → Privacy and other interests both achievable` → `Full functionality positive-sum`
- `? | core idea → Practices and policies open to verification` → `Visibility and transparency`
- Composite Proactive not reactive Row with `core idea` swapped to `User-centric design putting individual interests first` — directly tests the proactive-vs-respect distinction (proactive is preventive; respect is user-centric)
- Composite Privacy as the default setting Row with `typical implementation` swapped to `Encryption at rest and in transit`, `Sanitization at disposal` — tests defaults-vs-security distinction (defaults are about settings; end-to-end security is about controls)
- Composite Visibility and transparency Row with `core idea` swapped to `Privacy is integral to the system architecture` — tests transparency-vs-embedded distinction

## Sources

- `[s1]`: Ann Cavoukian, "Privacy by Design: The 7 Foundational Principles" (revised August 2009, retrieved 2026-04-26, https://www.ipc.on.ca/wp-content/uploads/Resources/7foundationalprinciples.pdf)
- `[s2]`: EU General Data Protection Regulation, Article 25 "Data protection by design and by default" (retrieved 2026-04-26, https://eur-lex.europa.eu/eli/reg/2016/679/oj)
- `[s3]`: NIST Privacy Framework v1.0 — operational framework drawing on PbD principles (January 2020, retrieved 2026-04-26, https://www.nist.gov/privacy-framework)
