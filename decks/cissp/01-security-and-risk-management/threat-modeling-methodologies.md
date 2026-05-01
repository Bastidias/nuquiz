# Threat Modeling Methodologies

**Domain:** 1 — Security and Risk Management &nbsp;|&nbsp; **Pattern:** Dimensions &nbsp;|&nbsp; **Tags:** 1.11
**Status:** draft (SME review pending)

Six threat-modeling methodologies CISSP courseware tests by name. STRIDE is the developer-favored taxonomy; PASTA is the risk-driven attacker-simulation approach; DREAD is a deprecated risk-scoring schema; VAST scales threat modeling for agile/DevOps; TRIKE is risk-based with stakeholder focus; Attack Trees represent attacks as graphs. The exam tests both the per-methodology focus and the matchup between methodology and the situation it best fits.

| methodology | focus | steps / structure | output | when used |
|---|---|---|---|---|
| STRIDE | Six categories of software threats [s1] | Decompose system [s1]<br>Identify threats per category [s1]<br>Mitigate or accept [s1] | Threat list categorized by STRIDE letter [s1] | Software design and code review [s1] |
| PASTA | Risk-centric attacker simulation [s2] | Seven stages from objectives to risk reduction [s2] | Risk-prioritized attack scenarios [s2] | Enterprise application threat modeling [s2] |
| DREAD | Risk scoring across five attributes [s3] | Score Damage [s3]<br>Score Reproducibility [s3]<br>Score Exploitability [s3]<br>Score Affected users [s3]<br>Score Discoverability [s3] | Numeric risk score per threat [s3] | Quick triage of identified threats [s3] |
| VAST | Process-and-application threat modeling at scale [s4] | Operational and application threat models [s4] | Scalable threat model in development workflow [s4] | Agile and DevOps threat modeling [s4] |
| TRIKE | Risk-based stakeholder-driven analysis [s5] | Define acceptable risk per stakeholder [s5]<br>Model threats against requirements [s5] | Stakeholder-validated risk model [s5] | Custom risk-acceptance frameworks [s5] |
| Attack Trees | Graph representation of attack paths [s6] | Goal at root [s6]<br>Sub-attacks as branches [s6]<br>Leaf nodes as concrete actions [s6] | Tree of attack paths to goal [s6] | Visualizing complex attack scenarios [s6] |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. No parentheticals in cells.
- **Tag 1.11 retained from stub.** Maps to (ISC)² 2024 outline §1.11 *Apply Supply Chain Risk Management (SCRM) concepts* — partial fit; threat modeling more naturally lives in §1.10 (risk management) or Domain 8 (software development security). Sibling Concept: `stride-categories.md` (the STRIDE taxonomy as a focused Concept).
- **STRIDE is the most commonly used.** Microsoft Threat Modeling Tool implements STRIDE; most security training programs teach STRIDE first. Its strength is simplicity — six categories anyone can remember (Spoofing, Tampering, Repudiation, Information disclosure, Denial of service, Elevation of privilege).
- **DREAD has been deprecated by its inventor.** Microsoft (which created DREAD) no longer recommends it for new threat modeling because the scoring is too subjective — different reviewers produce different scores for the same threat. It is still on the CISSP exam as a name to recognize and as a cautionary tale about over-quantification.
- **PASTA is the most rigorous and the heaviest.** PASTA's seven stages (Define objectives → Define technical scope → Decompose application → Analyze threats → Vulnerability and weakness analysis → Attack modeling → Risk and impact analysis) produce defensible enterprise-grade threat models. The cost is time — PASTA exercises take days to weeks per application.
- **VAST is the only methodology built for scale.** VAST's value proposition is integrating threat modeling into agile and DevOps workflows so that threat models update with code changes rather than becoming stale documents. The methodology is implemented primarily through tooling (ThreatModeler product).
- **TRIKE is the academic outlier.** TRIKE produces a *defensive* risk model rather than an *offensive* threat model — what risks are stakeholders willing to accept, and which controls satisfy them? Less commonly used in industry; appears on the exam for completeness.
- **Attack Trees are notation, not a complete methodology.** Originally proposed by Bruce Schneier, attack trees are a way to *represent* threats; they pair well with STRIDE (which provides the threats to put in the tree). Use them when the analysis benefits from a visual representation of attack paths.
- **What is intentionally not on this table.** OCTAVE (more risk framework than threat modeling — see `risk-frameworks.md`), CVSS (vulnerability scoring, not threat modeling), and LINDDUN (privacy threat modeling, the parallel to STRIDE) could be added in future revisions.
- **Gaps marked `[needs source]`:** none — all Facts trace to the published methodology documentation.

### Tricky distractors

- **STRIDE letters.** Spoofing, Tampering, Repudiation, Information disclosure, Denial of service, Elevation of privilege. Wrong-answer pattern: substituting "Disclosure" alone or omitting Repudiation — six specific categories.
- **DREAD is deprecated.** Microsoft no longer recommends it; subjective scoring is unreliable. Wrong-answer pattern: recommending DREAD for new threat models — recognize it but don't reach for it.
- **PASTA is risk-driven, not category-driven.** Seven stages, attacker simulation. Wrong-answer pattern: confusing PASTA with STRIDE — STRIDE classifies, PASTA simulates.
- **VAST is for scale.** Built for agile/DevOps integration. Wrong-answer pattern: choosing VAST for one-off application reviews — VAST shines when threat models must update with code.
- **Attack Trees are a representation, not a full methodology.** They visualize attack paths; they don't tell you what threats to put in. Wrong-answer pattern: treating Attack Trees as an alternative to STRIDE — they pair with STRIDE.
- **TRIKE is defensive/stakeholder-focused.** Asks what risks stakeholders accept. Wrong-answer pattern: treating TRIKE as offensive attacker simulation — that's PASTA.

## Engine demo opportunities

- `? | focus → Six categories of software threats` → STRIDE
- `PASTA | output → ?` → `Risk-prioritized attack scenarios`
- `? | when used → Quick triage of identified threats` → DREAD
- `Attack Trees | structure → ?` → any of `Goal at root`, `Sub-attacks as branches`, `Leaf nodes as concrete actions`
- `VAST | when used → ?` → `Agile and DevOps threat modeling`
- Composite Row profile: STRIDE across all Columns with `output` swapped to `Numeric risk score per threat` (DREAD's value)

## Sources

- `[s1]`: Microsoft *STRIDE* threat modeling — Spoofing, Tampering, Repudiation, Information disclosure, Denial of service, Elevation of privilege (retrieved 2026-04-26, https://learn.microsoft.com/en-us/azure/security/develop/threat-modeling-tool-threats)
- `[s2]`: Tony UcedaVélez and Marco Morana *Risk Centric Threat Modeling: Process for Attack Simulation and Threat Analysis (PASTA)*, 2015 (retrieved 2026-04-26, sourced via published OWASP and academic summaries)
- `[s3]`: Microsoft *DREAD* threat-risk scoring (deprecated by inventor) (retrieved 2026-04-26, sourced via published security-literature summaries)
- `[s4]`: ThreatModeler *Visual, Agile, and Simple Threat (VAST)* methodology (retrieved 2026-04-26, https://threatmodeler.com)
- `[s5]`: TRIKE *Risk-based threat modeling* (retrieved 2026-04-26, sourced via OWASP and academic threat-modeling summaries)
- `[s6]`: Bruce Schneier *Attack Trees* (Dr. Dobb's Journal, December 1999) — graph notation for attack paths (retrieved 2026-04-26, https://www.schneier.com/academic/archives/1999/12/attack_trees.html)
- `[s7]`: (ISC)² CISSP Certification Exam Outline, effective 2024-04-15, Domain 1 §1.11 (retrieved 2026-04-26, https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline)
