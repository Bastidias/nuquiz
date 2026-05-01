# Software Testing Types

**Domain:** 6 — Security Assessment and Testing &nbsp;|&nbsp; **Pattern:** Dimensions &nbsp;|&nbsp; **Tags:** 6.2, 8.2
**Status:** draft (SME review pending)

The seven security-relevant software testing methods CISSP candidates are expected to discriminate. Five overlap with `source-code-analysis-types` in D8 (SAST, DAST, IAST, RASP, SCA); two are testing-specific (Fuzz, Mutation). The discriminator is *what kind of artifact each method analyzes* and *when in the SDLC each runs*. Cross-tagged with D8.2 because these are both security-control testing techniques (D6) and software analysis tools (D8).

| Type | what it analyzes | when in SDLC | strengths |
|---|---|---|---|
| SAST | Source code without execution | Implementation phase | Catches issues before code runs<br>Identifies coding patterns |
| DAST | Running application via external requests | Testing phase | Catches runtime and configuration issues<br>Low false-positive rate |
| IAST | Running application via internal instrumentation | Testing phase | Combines source-level visibility with runtime accuracy |
| RASP | Live production application traffic | Production | Detects active attacks inline<br>Blocks exploitation |
| SCA | Project dependency manifest | Implementation phase | Catches vulnerable dependencies<br>License compliance |
| Fuzz | Application response to malformed input | Testing phase | Discovers unexpected crash conditions<br>Effective for parser bugs |
| Mutation | Test suite quality via injected code mutations | Testing phase | Measures test-suite effectiveness<br>Identifies untested paths |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. **No parentheticals in cells.** Acronym expansions (SAST, DAST, IAST, RASP, SCA) live in the sibling D8 Concept.
- **Cross-Concept link.** Sibling Concept `source-code-analysis-types` in D8 covers SAST/DAST/IAST/RASP/SCA with deeper integration-point detail. This Concept emphasizes the testing-method angle and adds Fuzz and Mutation testing which the D8 Concept doesn't cover.
- **Fuzz testing — automated input mutation.** Fuzz testing feeds malformed, unexpected, or random input to an application and observes whether it crashes, hangs, or produces incorrect output. Highly effective at finding parser bugs, buffer overflows, and unhandled-exception code paths. Modern fuzzers (AFL, libFuzzer, Hongfuzz) use coverage-guided fuzzing — they evolve inputs to maximize code coverage. Google's OSS-Fuzz program has found tens of thousands of bugs in major open source projects.
- **Mutation testing — testing the tests.** Mutation testing programmatically introduces small changes ("mutations") into the application code — flipping operators, removing conditions, swapping return values — and runs the existing test suite against each mutated version. If the test suite still passes despite the mutation, the mutation is a "survivor" indicating untested behavior. Mutation testing measures test-suite effectiveness rather than finding application bugs directly.
- **IAST = SAST + DAST instrumentation.** IAST runs an instrumentation agent inside the application during testing; the agent observes code execution while DAST-style external testing exercises the application. The combination yields code-path coverage with low false-positives but requires the application to be tested by another tool (typically DAST or QA test suite) to drive execution.
- **RASP is a production control, not a testing tool.** RASP detects and blocks attacks at runtime by instrumenting the application itself. Included in this Concept because it shares technical lineage with IAST, but its purpose is detection and blocking, not vulnerability discovery.
- **SDLC placement matters.** SAST and SCA run during Implementation (continuous integration). DAST, IAST, Fuzz, and Mutation run during Testing. RASP runs in Production. The cell values use this canonical placement; shift-left programs may run several earlier (DAST in CI, fuzz on every commit).
- **Out of scope for this Concept:** specific tooling per type, fuzz-corpus design, mutation-test scoring (mutation score, killed mutants), property-based testing (closer to fuzz than mutation), symbolic execution, formal-methods verification.

### Tricky distractors

- **Mutation testing tests the tests.** Not the application. Wrong-answer pattern: claiming mutation testing finds application bugs — it measures test-suite effectiveness.
- **Fuzz finds parser/crash bugs.** Malformed input. Wrong-answer pattern: claiming fuzz testing replaces functional testing — it specifically targets edge-case crashes.
- **SAST static; DAST dynamic.** Different observation points. Wrong-answer pattern: confusing them — SAST examines code without running; DAST runs the app.
- **RASP is production runtime defense.** Not testing. Wrong-answer pattern: classifying RASP alongside SAST/DAST as discovery tool — RASP defends.
- **IAST runs during testing.** Combines SAST + DAST. Wrong-answer pattern: claiming IAST runs in production — that's RASP.
- **SCA finds vulnerable dependencies.** Not first-party code issues. Wrong-answer pattern: claiming SCA detects coding errors — different scope.

### Values without a direct public citation

| Cell | Notes |
|---|---|
| All rows × strengths | Phrasings | NIST SP 800-218 [s1] groups testing practices but does not enumerate per-tool strengths in this exact phrasing; cell values are pedagogical summaries. |
| Fuzz × all cells | — | OWASP Fuzzing Cheat Sheet covers fuzz testing; not directly fetched primary-source per cell. |
| Mutation × all cells | — | Mutation testing has academic literature (Pittsburgh / Y. Jia 2011 survey) but no single canonical CISSP citation; widely-taught concept. |

## Engine demo opportunities

- `SAST | when in SDLC → ?` → `Implementation phase`
- `RASP | when in SDLC → ?` → `Production`
- `Fuzz | what it analyzes → ?` → `Application response to malformed input`
- `Mutation | what it analyzes → ?` → `Test suite quality via injected code mutations`
- `? | when in SDLC → Testing phase` → `DAST`, `IAST`, `Fuzz`, `Mutation` — shared-Value select-all
- `? | when in SDLC → Implementation phase` → `SAST`, `SCA` — shared-Value select-all
- `? | what it analyzes → Project dependency manifest` → `SCA`
- Composite SAST Row with `when in SDLC` swapped to `Production` — directly tests the SAST/RASP boundary (SAST is implementation-phase; RASP is production)
- Composite Mutation Row with `what it analyzes` swapped to `Source code without execution` — tests the mutation-vs-SAST distinction (mutation tests the test suite; SAST tests the code)
- Composite Fuzz Row with `strengths` swapped to `License compliance` — tests fuzz-vs-SCA distinction (fuzz finds crash conditions; SCA finds license issues)

## Sources

- `[s1]`: NIST SP 800-218, "Secure Software Development Framework (SSDF) Version 1.1" — secure-development testing practices PW.7 and PW.8 (February 2022, retrieved 2026-04-26, https://csrc.nist.gov/publications/detail/sp/800-218/final)
- `[s2]`: NIST SP 800-115, "Technical Guide to Information Security Testing and Assessment" — testing technique categories (September 2008, retrieved 2026-04-26, https://csrc.nist.gov/publications/detail/sp/800-115/final)
- `[s3]`: OWASP, "Fuzzing" community page — fuzz testing concepts and tools (retrieved 2026-04-26, https://owasp.org/www-community/Fuzzing)
