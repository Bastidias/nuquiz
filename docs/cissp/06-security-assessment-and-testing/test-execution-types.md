# Test Execution Types

**Domain:** 6 — Security Assessment and Testing &nbsp;|&nbsp; **Pattern:** Dimensions &nbsp;|&nbsp; **Tags:** 6.2
**Status:** draft (SME review pending)

The six test execution types CISSP candidates are expected to discriminate. The discriminator is *what scope of system the test exercises* and *who is responsible for running it*. Unit / Integration / System / Acceptance is the classical V-Model test ladder going from smallest scope to largest. Regression and Smoke are cross-cutting test categories run alongside the ladder to verify continued correctness after changes. Security testing fits within this taxonomy — security tests can be unit-level (input validation), integration-level (auth flow), system-level (penetration test), or acceptance-level (compliance attestation).

| Type | scope | who runs | when |
|---|---|---|---|
| Unit | Single function or class | Developer | During implementation |
| Integration | Multiple components together | Developer<br>QA engineer | After unit tests pass |
| System | End-to-end application | QA engineer | Before release |
| Acceptance | System against business requirements | Business stakeholder | Before production deployment |
| Regression | Previously-passing tests after change | QA engineer<br>CI pipeline | Per build |
| Smoke | Minimal critical-path verification | CI pipeline | After deployment |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. **No parentheticals in cells.**
- **The V-Model test ladder.** Unit → Integration → System → Acceptance corresponds to the V-Model's right-hand side, with each level paired to a development phase on the left. Unit tests verify implementation; integration tests verify low-level design; system tests verify high-level design; acceptance tests verify requirements. Each level catches a different class of defect; running all four catches the most.
- **Unit tests are developer-owned.** They should be fast, deterministic, and run on every code change. The developer who writes the code writes the unit tests; they are part of the implementation work, not a separate QA phase. CI pipelines run unit tests on every commit.
- **Integration vs System.** Integration tests verify that *paired components* work together (function A calls function B; service X talks to database Y). System tests verify that the *complete application* behaves correctly end-to-end. Integration tests can be partial (just two components); system tests are inclusive (everything together).
- **Acceptance is business-driven.** Unlike unit/integration/system tests which verify *technical correctness*, acceptance tests verify *business requirements*. UAT (User Acceptance Testing) is typically run by the business stakeholders who specified the requirements. Failure in UAT means the system works correctly but doesn't meet business needs.
- **Regression vs Smoke — both are cross-cutting.**
  - **Regression:** runs the full set of previously-passing tests after a change to detect newly-introduced defects in previously-working functionality. Heavier than smoke; typically the full unit + integration suite.
  - **Smoke:** runs a minimal subset of critical-path tests after deployment to verify "does the smoke pour out of it" — that the system is fundamentally functional, not whether it's defect-free. Smoke tests are fast (seconds to minutes); regression suites can run hours.
- **Security tests at every level.** Input-validation tests at Unit; authentication-flow tests at Integration; full pen testing at System; compliance attestation at Acceptance. Modern security programs embed security tests across all four levels rather than concentrating them at a single phase. Sibling Concept `software-testing-types` covers the security-specific testing methods (SAST, DAST, IAST, etc.).
- **Out of scope for this Concept:** specific testing frameworks (JUnit, pytest, Jest, Selenium, Cypress), test-driven development (TDD) and behavior-driven development (BDD) practices, exploratory testing, mutation testing (covered in `software-testing-types`), performance testing, chaos engineering.

### Values without a direct public citation

| Cell | Notes |
|---|---|
| All rows | This is a software-engineering taxonomy that pre-dates CISSP and is widely taught in QA literature (ISTQB syllabus, IEEE 829). Cell values reflect industry-standard definitions; no single CISSP-aligned primary public source enumerates this exact six-row split. |

## Engine demo opportunities

- `Unit | scope → ?` → `Single function or class`
- `System | scope → ?` → `End-to-end application`
- `Smoke | when → ?` → `After deployment`
- `Regression | when → ?` → `Per build`
- `Acceptance | who runs → ?` → `Business stakeholder`
- `? | scope → Multiple components together` → `Integration`
- `? | scope → Previously-passing tests after change` → `Regression`
- `? | who runs → CI pipeline` → `Regression` (sub-Fact in multi-Fact cell), `Smoke`
- Composite Unit Row with `who runs` swapped to `Business stakeholder` — directly tests the unit-vs-acceptance ownership distinction (developers run unit tests; business stakeholders run UAT)
- Composite Smoke Row with `scope` swapped to `End-to-end application` — tests the smoke vs system distinction (smoke is critical-path only; system is end-to-end)
- Composite Regression Row with `when` swapped to `During implementation` — tests regression timing (regression runs per build, not during initial implementation)

## Sources

- `[s1]`: ISTQB Foundation Level Syllabus — Test Levels and Test Types (retrieved 2026-04-26, https://www.istqb.org/certifications/certified-tester-foundation-level)
- `[s2]`: IEEE Std 829-2008, "IEEE Standard for Software and System Test Documentation" — test-level taxonomy (paywalled; cited as authoritative reference, retrieved 2026-04-26, https://standards.ieee.org/ieee/829/4308/)
- `[s3]`: NIST SP 800-115, "Technical Guide to Information Security Testing and Assessment" — security testing within the broader testing taxonomy (September 2008, retrieved 2026-04-26, https://csrc.nist.gov/publications/detail/sp/800-115/final)
