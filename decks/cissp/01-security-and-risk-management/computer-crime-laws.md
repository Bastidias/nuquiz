# Computer Crime Laws

**Domain:** 1 — Security and Risk Management &nbsp;|&nbsp; **Pattern:** Dimensions &nbsp;|&nbsp; **Tags:** 1.5
**Status:** draft (SME review pending)

The seven U.S. and EU computer-crime statutes CISSP candidates are expected to recognize by name. Distinct from the sibling `computer-crime-categories` Concept (which covers attacker *motivation* taxonomy) — this Concept covers the *legal frameworks* under which computer crimes are prosecuted. CISSP testing focuses on which law covers which kind of conduct: CFAA for unauthorized access, ECPA for interception, COPPA for children's data, FERPA for educational records, etc.

| Law | jurisdiction | scope | typical conduct prosecuted | penalty range |
|---|---|---|---|---|
| CFAA | United States | Unauthorized access to protected computers [s1] | Hacking<br>Insider exceeding authorized access<br>Trafficking in passwords | Up to 10 years per count<br>Up to 20 years for repeat or aggravated |
| ECPA | United States | Interception and disclosure of electronic communications [s2] | Wiretapping<br>Email interception<br>Stored communications access | Up to 5 years per violation |
| COPPA | United States | Online collection of personal info from children under 13 [s3] | Collecting child PII without parental consent | Up to USD 50,120 per violation as of 2024 |
| FERPA | United States | Disclosure of student educational records [s4] | Unauthorized disclosure by educational institution | Loss of federal funding |
| HIPAA criminal provisions | United States | Knowing wrongful disclosure of PHI [s5] | Insider disclosure of medical records | Up to 10 years for malicious or commercial-gain disclosure |
| EU Cybercrime Directive | European Union | Unauthorized system access<br>Data interference<br>System interference [s6] | Hacking<br>DDoS<br>Tools-for-cybercrime trafficking | Member-state-defined; minimum 2-year max for serious offenses |
| Council of Europe Convention on Cybercrime | International (Budapest Convention) | Mutual legal assistance for cybercrime investigation [s7] | Cross-border evidence gathering<br>Extradition cooperation | Framework treaty — penalties set by ratifying countries |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. **No parentheticals in cells.**
- **Acronym expansions.** `CFAA` = Computer Fraud and Abuse Act. `ECPA` = Electronic Communications Privacy Act. `COPPA` = Children's Online Privacy Protection Act. `FERPA` = Family Educational Rights and Privacy Act. `HIPAA` = Health Insurance Portability and Accountability Act. `PHI` = Protected Health Information.
- **CFAA is the workhorse of US computer crime prosecution.** Originally enacted 1986, amended multiple times. Covers unauthorized access *and* "exceeding authorized access" (Van Buren v. US 2021 narrowed this — accessing files for unauthorized purposes is no longer CFAA if you had general access). The most heavily-tested computer-crime law on CISSP.
- **CFAA "protected computer" definition is broad.** Includes any computer used in interstate commerce — which post-internet is essentially every networked computer. Federal jurisdiction follows.
- **ECPA = Title I (Wiretap Act) + Title II (Stored Communications Act) + Title III (Pen Register).** Title I covers real-time interception; Title II covers stored communications (email at rest); Title III covers traffic analysis (call records, not contents). The three-title structure is testable.
- **COPPA enforcement is by FTC.** Covers operators of websites or online services *directed at* children under 13, *or* that have *actual knowledge* they collect info from children under 13. The 2024 USD 50,120 per-violation max reflects FTC inflation adjustments; updated periodically.
- **FERPA is enforcement-by-funding-loss, not direct fines.** No FERPA criminal penalty — the consequence is the educational institution loses federal funding. This makes FERPA a *compliance* statute more than a criminal one. CISSP exam tests the distinction.
- **HIPAA has both civil and criminal sides.** Civil penalties apply per the HIPAA Privacy Rule and Security Rule (covered in `privacy-laws` and `industry-standards`). Criminal provisions in 42 USC §1320d-6 cover *knowing wrongful disclosure* — this is the CISSP-tested criminal HIPAA angle.
- **EU Cybercrime Directive (2013/40/EU) sets minimum standards.** EU member states must criminalize the listed conduct with minimum penalty floors; specific implementation varies. Replaced the earlier 2005 Council Framework Decision.
- **Budapest Convention is international cooperation, not substantive law.** Council of Europe Convention on Cybercrime (2001) is a treaty for cross-border investigation cooperation — mutual legal assistance, evidence preservation, extradition. Doesn't create new crimes; helps prosecute existing ones across borders. Ratified by 60+ countries including the US.
- **Cross-Concept link.** Sibling Concept `computer-crime-categories` covers attacker motivations (military, financial, terrorist, etc.) — a different taxonomy. `privacy-laws` covers the privacy-regulation regimes (GDPR, CCPA, HIPAA Privacy Rule). `industry-standards` covers compliance frameworks (PCI DSS, SOX, GLBA, FISMA).
- **Out of scope for this Concept:** specific case law (Van Buren, Riley v. California, Carpenter v. US), state computer-crime laws, US export-control statutes (covered in sibling `import-export-controls`), DMCA anti-circumvention, the Computer Misuse Act (UK), specific China / Russia / India cybercrime laws.

### Tricky distractors

- **CFAA vs ECPA.** CFAA is *access* (unauthorized entry into a system); ECPA is *interception* (capturing communications in transit or at rest). A scenario about an attacker reading another user's email *could* be either depending on whether the attacker accessed the mailbox (CFAA) or sniffed the traffic (ECPA Title I).
- **COPPA vs GDPR child provisions.** COPPA = US, under 13, parental consent before collection. GDPR Article 8 = EU, default age 16 (member states can lower to 13), parental consent required for "information society services."
- **FERPA vs HIPAA for student health records.** Student health records held by a school's health service are typically *FERPA* records (educational records), not HIPAA. School-affiliated hospitals that bill Medicare may dual-track. Tested distinction.
- **HIPAA criminal vs civil.** Civil penalties — administrative, fines per violation category, no jail. Criminal penalties — knowing wrongful disclosure, includes prison terms. The CISSP exam may ask "which has criminal provisions" and the answer for HIPAA depends on the conduct.

### Values without a direct public citation

| Cell | Value | Why unsourced |
|---|---|---|
| All rows × penalty range | Specific durations and dollar amounts | Penalty values are statute-specific and update frequently; cell values reflect dominant ranges as of the retrieval date but specific charges may carry different penalties. |

## Engine demo opportunities

- `CFAA | jurisdiction → ?` → `United States`
- `EU Cybercrime Directive | jurisdiction → ?` → `European Union`
- `? | scope → Online collection of personal info from children under 13` → `COPPA`
- `? | scope → Disclosure of student educational records` → `FERPA`
- `? | typical conduct prosecuted → Hacking` → `CFAA` (sub-Fact in multi-Fact cell), `EU Cybercrime Directive` (sub-Fact)
- `Council of Europe Convention on Cybercrime | jurisdiction → ?` → `International (Budapest Convention)`
- Composite CFAA Row with `scope` swapped to `Online collection of personal info from children under 13` — directly tests CFAA-vs-COPPA distinction (CFAA is unauthorized access; COPPA is child-data collection)
- Composite ECPA Row with `typical conduct prosecuted` swapped to `Unauthorized disclosure by educational institution` — tests ECPA-vs-FERPA distinction
- Composite COPPA Row with `penalty range` swapped to `Up to 10 years per count` — tests that COPPA is civil-only with FTC fines, not criminal jail terms

## Sources

- `[s1]`: Computer Fraud and Abuse Act, 18 U.S.C. §1030 (retrieved 2026-04-26, https://www.law.cornell.edu/uscode/text/18/1030)
- `[s2]`: Electronic Communications Privacy Act, 18 U.S.C. §§2510-2523 (retrieved 2026-04-26, https://www.law.cornell.edu/uscode/text/18/part-I/chapter-119)
- `[s3]`: Children's Online Privacy Protection Act, 15 U.S.C. §6501 et seq. (retrieved 2026-04-26, https://www.ftc.gov/legal-library/browse/rules/childrens-online-privacy-protection-rule-coppa)
- `[s4]`: Family Educational Rights and Privacy Act, 20 U.S.C. §1232g (retrieved 2026-04-26, https://www2.ed.gov/policy/gen/guid/fpco/ferpa/index.html)
- `[s5]`: HIPAA criminal provisions, 42 U.S.C. §1320d-6 (retrieved 2026-04-26, https://www.law.cornell.edu/uscode/text/42/1320d-6)
- `[s6]`: Directive 2013/40/EU of the European Parliament and of the Council on attacks against information systems (retrieved 2026-04-26, https://eur-lex.europa.eu/eli/dir/2013/40/oj)
- `[s7]`: Council of Europe Convention on Cybercrime (Budapest Convention), ETS No. 185 (November 2001, retrieved 2026-04-26, https://www.coe.int/en/web/conventions/full-list?module=treaty-detail&treatynum=185)
