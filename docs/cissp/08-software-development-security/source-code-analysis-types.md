# Source Code Analysis Types

**Domain:** 8 — Software Development Security &nbsp;|&nbsp; **Pattern:** Dimensions &nbsp;|&nbsp; **Tags:** 8.2, 6.2
**Status:** draft (SME review pending)

The six application-security analysis tool categories CISSP candidates are expected to discriminate. Two analyze code without executing it (SAST, SCA, Secrets scanning); two analyze a running application (DAST, IAST); one runs in production (RASP). The most-tested discriminator is *when* each tool runs in the SDLC and *what kind of artifact* it analyzes (source code vs running app vs runtime telemetry). Cross-tagged with D6.2 because these are both software-security analysis tools (D8) and security-control testing techniques (D6).

| Type | when run | what it detects | false-positive rate | integration point |
|---|---|---|---|---|
| SAST | Implementation phase<br>Pre-commit<br>CI build [s1] | Source-code vulnerabilities<br>Insecure patterns [s1] | High | IDE<br>CI pipeline<br>Pre-commit hook |
| DAST | Testing phase<br>Pre-production [s2] | Runtime vulnerabilities<br>Configuration flaws [s2] | Low | QA environment<br>Staging environment |
| IAST | Testing phase [s2] | Code paths executed during testing [s2] | Low | Application runtime instrumentation |
| RASP | Production [s2] | Active attacks<br>Anomalous behavior [s2] | Low | Application runtime |
| SCA | Implementation phase<br>CI build [s1] | Vulnerable dependencies<br>License violations [s1] | Low | Build pipeline<br>Repository |
| Secrets scanning | Pre-commit<br>CI build [s1] | Hard-coded credentials<br>API keys<br>Tokens [s1] | Medium | Pre-commit hook<br>Repository |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. **No parentheticals in cells.** Acronym expansions live in this section.
- **Acronym expansions.** `SAST` = Static Application Security Testing. `DAST` = Dynamic Application Security Testing. `IAST` = Interactive Application Security Testing. `RASP` = Runtime Application Self-Protection. `SCA` = Software Composition Analysis.
- **Static vs dynamic — the primary axis.** SAST, SCA, and Secrets scanning are *static* — they analyze code or build artifacts without executing the application. DAST and IAST are *dynamic* — they analyze a running application. RASP is also dynamic but operates in production rather than test. A question asking "which tool requires the application to be running" excludes SAST/SCA/Secrets.
- **SAST high false-positive rate.** SAST analyzes code paths abstractly; many flagged paths are actually unreachable in practice (dead code, sanitizers SAST cannot recognize, framework-level mitigations SAST does not understand). Industry rule of thumb is 30-50% false-positive rates on un-tuned SAST. DAST has lower FP rates because it tests *actual* application behavior — if DAST exploits an injection point, the vulnerability is real.
- **IAST = SAST + DAST instrumentation.** IAST runs an instrumentation agent inside the application during testing; the agent observes code execution while DAST-style external testing exercises the application. The combination yields code-path coverage with low false-positives but requires the application to be tested by another tool (typically DAST or QA test suite) to drive execution.
- **RASP is a production control, not a testing tool.** RASP detects and blocks attacks at runtime by instrumenting the application itself — it sees attempted exploitation against live traffic and responds inline. Closer in operational character to a WAF than to SAST/DAST. Included in this Concept because it is part of the same application-security-instrumentation toolset, but it is *not* a vulnerability-discovery tool.
- **SCA finds vulnerable libraries, not your code.** SCA matches dependencies (npm, PyPI, Maven, NuGet packages) against vulnerability databases (NVD, GitHub Advisory Database). A SCA pass that flags a CVE in `lodash@4.17.20` is correct; SCA does not analyze the project's own source code. Cross-Concept link: SCA addresses the supply-chain risks in `software-supply-chain-risks`.
- **Secrets scanning catches "did we commit a key by mistake."** Hard-coded credentials in source repositories are a top breach vector. Secrets scanning looks for high-entropy strings, known credential patterns (AWS access key prefixes `AKIA`, GitHub PATs starting `ghp_`, etc.), and matches against secret lists. Run pre-commit to prevent leaks; run on existing repository history to find leaks already present.
- **Out of scope for this Concept:** specific SAST tools (Semgrep, SonarQube, CodeQL, Checkmarx), DAST tools (OWASP ZAP, Burp Suite, Nuclei), IAST tools (Contrast Security), RASP tools, SCA tools (Snyk, Dependabot, Trivy), the OWASP Top 10 vulnerabilities themselves (separate Concept — `owasp-top-10`), software-testing taxonomy at the unit/integration/system level (separate Concept — `test-execution-types` in D6).

### Values without a direct public citation

| Cell | Value | Why unsourced |
|---|---|---|
| All rows × false-positive rate | `High`, `Low`, `Medium` | Qualitative ratings reflecting industry practitioner consensus; no quantitative single-source benchmark cited. |
| All rows × integration point | — | Tool-deployment patterns are industry convention; OWASP DevSecOps guidance [s1] discusses placement in pipelines but does not enumerate canonical integration points per tool category. |

## Engine demo opportunities

- `SAST | when run → ?` → `Implementation phase`, `Pre-commit`, `CI build`
- `DAST | when run → ?` → `Testing phase`, `Pre-production`
- `RASP | when run → ?` → `Production`
- `? | when run → Production` → `RASP`
- `? | when run → Pre-commit` → `SAST`, `Secrets scanning` — shared-Fact across multi-Fact cells
- `? | what it detects → Vulnerable dependencies` → `SCA`
- `? | what it detects → Hard-coded credentials` → `Secrets scanning`
- `? | false-positive rate → High` → `SAST`
- `? | false-positive rate → Low` → `DAST`, `IAST`, `RASP`, `SCA` — shared-Value select-all
- Composite SAST Row with `when run` swapped to `Production` — directly tests the static / production split (SAST is implementation-time, RASP is production)
- Composite DAST Row with `false-positive rate` swapped to `High` — tests the SAST/DAST FP polarity (SAST has high FPs; DAST has low because it tests actual exploitation)
- Composite SCA Row with `what it detects` swapped to `Source-code vulnerabilities` — tests the SCA scope (dependencies, not first-party code)

## Sources

- `[s1]`: NIST SP 800-218, "Secure Software Development Framework (SSDF) Version 1.1" — Practice PW.7 (Review and/or Analyze Human-Readable Code) and PW.8 (Test Executable Code) framings (February 2022, retrieved 2026-04-25, https://csrc.nist.gov/publications/detail/sp/800-218/final)
- `[s2]`: OWASP, "Source Code Analysis Tools" community page (retrieved 2026-04-25, https://owasp.org/www-community/Source_Code_Analysis_Tools)
- `[s3]`: OWASP DevSecOps Guideline — pipeline integration of SAST / DAST / SCA / IAST / RASP (retrieved 2026-04-25, https://owasp.org/www-project-devsecops-guideline/)
