# Risk Frameworks

**Domain:** 1 — Security and Risk Management &nbsp;|&nbsp; **Pattern:** Dimensions &nbsp;|&nbsp; **Tags:** 1.10
**Status:** draft (SME review pending)

Five risk-management frameworks the CISSP exam tests by name. NIST RMF is the U.S. federal standard; ISO 27005 is the international standard; OCTAVE is the operational/asset-centric academic framework; FAIR is the quantitative-financial framework; TARA is the threat-and-asset-centric automotive/supply-chain framework. Each pairs a *focus* (the angle it takes), a phase decomposition, *strengths*, and a *typical adopter* (the constituency that uses it most).

| framework | focus | phases | strengths | typical adopter |
|---|---|---|---|---|
| NIST RMF | System-level security authorization [s1] | Categorize, Select, Implement, Assess, Authorize, Monitor [s1] | Federal-compliance alignment [s1] | U.S. federal agencies and contractors [s1] |
| ISO 27005 | Enterprise information security risk [s2] | Context, Assessment, Treatment, Acceptance, Communication, Monitoring [s2] | International recognition [s2] | Multinational enterprises [s2] |
| OCTAVE | Asset-centric organizational risk [s3] | Build asset profile [s3]<br>Identify infrastructure vulnerabilities [s3]<br>Develop strategy and plans [s3] | Self-directed organizational analysis [s3] | Academic and government adopters [s3] |
| FAIR | Quantitative loss exposure analysis [s4] | Identify scenario [s4]<br>Estimate loss event frequency [s4]<br>Estimate loss magnitude [s4]<br>Compute risk [s4] | Defensible monetary risk numbers [s4] | Financial-services risk teams [s4] |
| TARA | Threat-and-asset-centric supply-chain risk [s5] | Identify threats [s5]<br>Assess assets [s5]<br>Determine treatments [s5] | Cyber-physical and supply-chain coverage [s5] | Automotive and OT industries [s5] |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. No parentheticals in cells. The phase column carries multi-Fact cells where the framework has named phases — engine should accept any phase Fact as a valid match.
- **Tag 1.10 retained from stub.** Maps to (ISC)² 2024 outline §1.10. Sibling Concept: `qual-vs-quant-analysis.md` (FAIR is the canonical quantitative framework).
- **NIST RMF is six steps in NIST SP 800-37 Rev. 2.** Categorize → Select → Implement → Assess → Authorize → Monitor. The CISSP exam tests this ordering directly. Earlier RMF versions (Rev. 1) had a slightly different sequence; current is six.
- **OCTAVE has variants.** OCTAVE-S (small organizations), OCTAVE Allegro (streamlined), and original OCTAVE differ in phase count (three to eight phases) and depth. The three-phase decomposition here matches Allegro's framing and the most-tested CISSP version.
- **FAIR is loss-event-centric, not control-centric.** FAIR (Factor Analysis of Information Risk, from the Open Group / FAIR Institute) frames risk as a function of loss-event frequency and loss magnitude, with a structured taxonomy below each. It produces probabilistic monetary risk numbers, which is why financial-services risk teams adopt it — the output speaks the language of CFOs and boards.
- **TARA is the youngest of the five.** TARA (Threat Assessment & Remediation Analysis, from MITRE; also Threat Analysis and Risk Assessment in automotive ISO/SAE 21434) is the most-cited cyber-physical-systems risk framework. Its rise on the exam reflects the growing importance of supply-chain and OT security.
- **Why frameworks coexist rather than compete.** Many large organizations run multiple — NIST RMF for federal-facing systems, ISO 27005 for international ops, FAIR for board-level risk reporting, OCTAVE-style asset analysis for in-depth program reviews. The choice is *fit-for-purpose* rather than mutually exclusive. The CISSP exam may test the matchup between organizational context and most-appropriate framework.
- **What is intentionally not on this table.** ISO 31000 (general enterprise risk management, not security-specific), COSO ERM (financial-controls framework), and COBIT (IT governance with risk module) are adjacent frameworks that touch security risk but are not primarily *security* risk frameworks.
- **Gaps marked `[needs source]`:** none — all Facts trace to the published framework documentation.

### Tricky distractors

- **NIST RMF six-step order.** Categorize → Select → Implement → Assess → Authorize → Monitor. Wrong-answer pattern: putting Authorize before Assess — Authorize comes after Assess and before Monitor.
- **FAIR is quantitative; OCTAVE is qualitative/asset-centric.** Wrong-answer pattern: claiming OCTAVE produces dollar risk figures — that's FAIR.
- **NIST RMF authorizes systems.** RMF is system-level. ISO 27005 is enterprise-level. Wrong-answer pattern: applying RMF to enterprise risk reporting — the unit of analysis is the system.
- **TARA covers OT and supply chain.** Most-cited cyber-physical risk framework. Wrong-answer pattern: confusing TARA (threat/asset risk) with TVRA, OCTAVE, or other acronyms.
- **ISO 27005 ≠ ISO 27001.** 27001 is the ISMS standard; 27005 is its risk-management companion. Wrong-answer pattern: treating them as interchangeable.
- **Multiple frameworks coexist.** Most large organizations run NIST + ISO + FAIR side by side. Wrong-answer pattern: claiming an organization should pick one framework — fit-for-purpose, not exclusive.

## Engine demo opportunities

- `? | focus → Quantitative loss exposure analysis` → FAIR
- `NIST RMF | phases → ?` → any of `Categorize`, `Select`, `Implement`, `Assess`, `Authorize`, `Monitor`
- `? | typical adopter → Automotive and OT industries` → TARA
- `ISO 27005 | focus → ?` → `Enterprise information security risk`
- `OCTAVE | strengths → ?` → `Self-directed organizational analysis`
- `FAIR | typical adopter → ?` with `U.S. federal agencies and contractors` (NIST RMF) and `Multinational enterprises` (ISO 27005) as distractors
- Composite Row profile: NIST RMF across all Columns with `focus` swapped to `Quantitative loss exposure analysis` (FAIR's value)

## Sources

- `[s1]`: NIST SP 800-37 Rev. 2 *Risk Management Framework for Information Systems and Organizations*, December 2018 (retrieved 2026-04-26, https://csrc.nist.gov/pubs/sp/800/37/r2/final)
- `[s2]`: ISO/IEC 27005:2022 *Information security, cybersecurity and privacy protection — Guidance on managing information security risks* (retrieved 2026-04-26, https://www.iso.org/standard/80585.html)
- `[s3]`: OCTAVE *Operationally Critical Threat, Asset, and Vulnerability Evaluation* — CMU SEI publications (retrieved 2026-04-26, https://www.sei.cmu.edu/our-work/risk-management/)
- `[s4]`: FAIR Institute / The Open Group *Factor Analysis of Information Risk* (retrieved 2026-04-26, https://www.fairinstitute.org/)
- `[s5]`: MITRE *Threat Assessment & Remediation Analysis (TARA)* and ISO/SAE 21434 *Road vehicles — Cybersecurity engineering* (retrieved 2026-04-26, https://www.mitre.org/our-impact/intellectual-property/threat-assessment-remediation-analysis-tara)
- `[s6]`: (ISC)² CISSP Certification Exam Outline, effective 2024-04-15, Domain 1 §1.10 (retrieved 2026-04-26, https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline)
