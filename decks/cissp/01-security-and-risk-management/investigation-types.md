# Investigation Types

**Domain:** 1 — Security and Risk Management &nbsp;|&nbsp; **Pattern:** Dimensions &nbsp;|&nbsp; **Tags:** 1.6, 7.1
**Status:** draft (SME review pending)

The five investigation types CISSP courseware distinguishes by *legal forum* and *standard of proof*. Administrative investigations stay inside the organization; criminal investigations involve law enforcement and require the highest proof standard; civil investigations are between private parties at a lower standard; regulatory investigations involve a government agency; industry investigations are private contractual disputes within a sector. The exam tests both the matchup between investigation type and burden of proof and the implications for evidence handling.

| type | burden of proof | who conducts | outcome | evidence rules |
|---|---|---|---|---|
| Administrative | Preponderance of policy violation [needs source] | Internal HR or security [s1] | Internal discipline up to termination [s1] | Internal evidence standards [needs source] |
| Criminal | Beyond a reasonable doubt [s2] | Law enforcement [s2] | Fines or imprisonment [s2] | Strict chain of custody and Rules of Evidence [s2] |
| Civil | Preponderance of the evidence [s2] | Private parties' attorneys [s2] | Monetary damages or injunctive relief [s2] | Rules of Evidence with discovery process [s2] |
| Regulatory | Defined by regulating statute [s2] | Government regulator [s2] | Regulatory fines or revoked authorization [s2] | Statute-defined evidence standards [s2] |
| Industry | Defined by industry contract [needs source] | Industry body or contract counterparty [needs source] | Loss of certification or contract penalties [needs source] | Contract-defined evidence standards [needs source] |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. No parentheticals in cells.
- **Tags 1.6 and 7.1 retained from stub.** Cross-tagged. Sibling Concepts: `evidence-types.md`, `evidence-handling-chain.md` (in Domain 7).
- **The burden-of-proof ladder.** Criminal is the highest — beyond a reasonable doubt (≈99%). Civil is much lower — preponderance of the evidence (>50%). Administrative is even lower — internal policy violation, often "more likely than not." Regulatory varies by statute. The CISSP exam tests this ordering directly.
- **Evidence handling implications.** Evidence collected for an internal administrative investigation may *not* meet criminal-court admissibility standards. If the organization later decides to pursue criminal prosecution, evidence collected to administrative standards may be inadmissible. The most-tested CISSP scenario: when in doubt about future legal action, collect evidence to the strictest standard (criminal-grade chain of custody) from the start.
- **Why "industry" is its own row.** Industry investigations are contractual rather than statutory — PCI Council audits, FINRA reviews of broker-dealers, ICANN domain disputes, etc. They have their own evidence standards defined by the contract or industry rules and can result in loss of certification or contract termination but not criminal sanction or regulatory fines.
- **A single incident can trigger multiple investigations.** A data breach may involve administrative (HR action against the responsible employee), criminal (law enforcement against the attacker), civil (lawsuit by affected customers), and regulatory (FTC, state AG) investigations simultaneously. Evidence collection must serve all four standards from the outset.
- **Discovery is a civil process.** In civil litigation, both parties are entitled to *discovery* — formal access to each other's relevant documents and evidence. eDiscovery (electronic discovery) is the digital-evidence variant and has its own legal-and-technical specialty (FRCP Rule 34, EDRM model). Criminal investigations have parallel mechanisms (subpoena, warrant) but with different scope and judicial oversight.
- **Right against self-incrimination applies in criminal only.** A subject of a criminal investigation has Fifth Amendment protection (in the U.S.) against being compelled to testify against themselves. This protection does *not* apply to administrative investigations against employees — refusal to cooperate with an internal investigation can be grounds for termination.
- **Gaps marked `[needs source]`:** four Facts — administrative burden of proof, administrative evidence rules, all three industry-row cells. Internal policies vary by organization; industry standards vary by industry, making generalization harder than for the legally-defined categories.

### Tricky distractors

- **Burden-of-proof ladder.** Criminal (beyond reasonable doubt) > Civil (preponderance) > Administrative (more likely than not). Wrong-answer pattern: applying criminal standards to civil cases — civil only requires >50%.
- **Collect to highest standard you might need.** If criminal prosecution is possible, use criminal-grade chain of custody from the start. Wrong-answer pattern: starting with administrative-only evidence and switching later — earlier evidence may be inadmissible.
- **Self-incrimination doesn't apply in administrative.** Employees can be compelled to cooperate or face termination. Fifth Amendment is criminal-only. Wrong-answer pattern: extending criminal protections to internal investigations.
- **One incident = multiple investigations.** Breach may trigger administrative, criminal, civil, and regulatory simultaneously. Wrong-answer pattern: assuming investigations are mutually exclusive.
- **Discovery is civil; subpoena/warrant is criminal.** Different procedural mechanisms. Wrong-answer pattern: claiming discovery applies to criminal cases — criminal uses subpoena and warrant under judicial oversight.
- **Industry investigations are contractual.** PCI, FINRA, ICANN — penalties are loss of certification or contract penalties, not jail or government fines. Wrong-answer pattern: confusing industry penalties with regulatory fines.

## Engine demo opportunities

- `? | burden of proof → Beyond a reasonable doubt` → Criminal
- `Civil | who conducts → ?` → `Private parties' attorneys`
- `? | outcome → Fines or imprisonment` → Criminal
- `Regulatory | outcome → ?` → `Regulatory fines or revoked authorization`
- `Administrative | outcome → ?` with `Fines or imprisonment` (Criminal) and `Monetary damages or injunctive relief` (Civil) as distractors
- Composite Row profile: Civil across all Columns with `burden of proof` swapped to `Beyond a reasonable doubt` (Criminal's value)

## Sources

- `[s1]`: CISSP CBK administrative-investigation framing — internal HR and security investigation practice (retrieved 2026-04-26, sourced via published CISSP study guide summaries)
- `[s2]`: U.S. Federal Rules of Evidence and Federal Rules of Civil Procedure — criminal-vs-civil burden of proof and evidence standards (retrieved 2026-04-26, https://www.law.cornell.edu/rules/fre and https://www.law.cornell.edu/rules/frcp)
- `[s3]`: (ISC)² CISSP Certification Exam Outline, effective 2024-04-15, Domain 1 §1.6 and Domain 7 §7.1 (retrieved 2026-04-26, https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline)
