# Software Security Metrics

**Domain:** 8 — Software Development Security &nbsp;|&nbsp; **Pattern:** Dimensions &nbsp;|&nbsp; **Tags:** 8.3
**Status:** draft (SME review pending)

The five software security metrics most often cited in CISSP frameworks. Three are *lagging* indicators that measure outcomes already produced (defect density, MTTR, vulnerability backlog); two are *leading* indicators that predict future security posture (code coverage, security test coverage). The leading-vs-lagging axis is the most-tested discriminator — a question asking "which of these is a leading indicator" excludes the three outcome metrics.

| Metric | what it measures | target value | leading or lagging |
|---|---|---|---|
| Defect density | Defects per KLOC | Below 1 per KLOC for production | Lagging |
| MTTR | Time from vulnerability disclosure to patch deployment | Under 30 days for high<br>Under 7 days for critical | Lagging |
| Vulnerability backlog | Open unfixed vulnerabilities count | Zero critical<br>SLA-bound for others | Lagging |
| Code coverage | Percentage of code exercised by tests | Above 80 percent | Leading |
| Security test coverage | Percentage of security requirements tested | 100 percent | Leading |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. **No parentheticals in cells.** Comparison operators (`Below`, `Under`, `Above`) replace `<` / `>` symbols when they could be confused with HTML tags or markdown rendering.
- **Acronym expansions.** `MTTR` = Mean Time To Remediate (sometimes Mean Time To Repair in operations contexts; in security contexts, "Remediate" is canonical). `KLOC` = thousands of lines of code.
- **Leading vs lagging.** Lagging metrics measure what has *already happened* — defects shipped, vulnerabilities open, time to patch. They tell you about past security posture but cannot prevent the next defect. Leading metrics measure inputs to future outcomes — test coverage tells you whether your test suite *can* catch defects, not whether it has. A leading metric improving suggests the lagging metrics will improve later; the inverse is rarely true.
- **Defect density baseline.** "Below 1 defect per KLOC for production" is a widely-cited industry benchmark for mature production code; some sources cite 0.5 or 0.1 as more aggressive targets. The Concept records the pedagogically common value.
- **MTTR critical / high split.** The cell records the dominant SLA pattern (critical < 7 days, high < 30 days). Specific organizations and regulators (PCI DSS, HIPAA, FedRAMP) impose their own SLAs; treat the cell values as guidance, not as a single normative source.
- **Code coverage 80 percent is a heuristic.** No source mandates 80 percent; it is a pedagogical and practitioner default. The actually important quality is *what* the tests cover (security paths, edge cases) rather than raw line coverage. A 95-percent-coverage suite that never tests authorization is worse than a 60-percent suite that does.
- **Security test coverage 100 percent target.** Unlike code coverage, security test coverage *should* be 100 percent — every defined security requirement should have at least one verifying test. Anything less means a security requirement exists that no test verifies, which is a known risk.
- **Out of scope for this Concept:** specific vulnerability-tracking tooling (Jira, GitHub Security Advisories), CVSS scoring (separate Concept — `vulnerability-severity-scoring` in D6), CVE / CWE references, FAIR / quantitative risk modeling, vendor-specific SLA frameworks, OKRs or balanced-scorecard frameworks for security programs.

### Values without a direct public citation

| Cell | Value | Why unsourced |
|---|---|---|
| All rows × target value | Multiple | Industry-pedagogical benchmarks; no single normative public source mandates these specific numeric targets. NIST SP 800-55 [s1] discusses security measurement broadly without prescribing per-metric thresholds. |
| Defect density × what it measures | `Defects per KLOC` | Standard software-engineering measure but not pinned to a specific NIST or ISO citation in this research pass. |
| Code coverage × leading or lagging | `Leading` | Industry framing — coverage predicts test effectiveness rather than measuring outcomes. Not a direct quotation from a primary source. |

## Engine demo opportunities

- `Code coverage | leading or lagging → ?` → `Leading`
- `Defect density | leading or lagging → ?` → `Lagging`
- `? | leading or lagging → Leading` → `Code coverage`, `Security test coverage` — shared-Value select-all
- `? | leading or lagging → Lagging` → `Defect density`, `MTTR`, `Vulnerability backlog` — shared-Value select-all
- `MTTR | what it measures → ?` → `Time from vulnerability disclosure to patch deployment`
- `Security test coverage | target value → ?` → `100 percent`
- Composite Defect density Row with `leading or lagging` swapped to `Leading` — directly tests the leading/lagging dichotomy (defect density measures past defects, not future risk)
- Composite Code coverage Row with `leading or lagging` swapped to `Lagging` — same test from the other direction (coverage predicts; it does not record outcomes)
- Composite MTTR Row with `target value` swapped to `100 percent` — tests that MTTR is a duration (days), not a percentage

## Sources

- `[s1]`: NIST SP 800-55 Rev 2, "Performance Measurement Guide for Information Security" — security measurement concepts including leading and lagging indicators (December 2024, retrieved 2026-04-25, https://csrc.nist.gov/publications/detail/sp/800-55/rev-2/final)
- `[s2]`: NIST SP 800-218, "Secure Software Development Framework (SSDF) Version 1.1" — secure-development practice measurement (February 2022, retrieved 2026-04-25, https://csrc.nist.gov/publications/detail/sp/800-218/final)
- `[s3]`: OWASP, "OWASP Application Security Verification Standard (ASVS)" — security requirement framework that drives security-test-coverage measurement (retrieved 2026-04-25, https://owasp.org/www-project-application-security-verification-standard/)
