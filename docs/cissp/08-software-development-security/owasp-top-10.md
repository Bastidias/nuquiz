# OWASP Top 10 (2021)

**Domain:** 8 — Software Development Security &nbsp;|&nbsp; **Pattern:** Dimensions &nbsp;|&nbsp; **Tags:** 8.5
**Status:** draft (SME review pending)

The ten most critical web application security risks per OWASP's 2021 ranking [s1]. Heavily tested on CISSP — questions probe both the category names and the canonical mitigation per category. Rows follow the OWASP A01–A10 ordering. The 2021 list reorganized previous editions; key changes from 2017 include the introduction of A04 Insecure Design as a category (rather than a property of other categories), the elevation of A06 Vulnerable Components, and the merge of XSS into A03 Injection.

| Rank | Category | description | example | typical mitigation |
|---|---|---|---|---|
| A01 | Broken Access Control [s1] | Access control rules enforced incorrectly [s1] | Forced browsing to admin URL [s1] | Deny by default<br>Server-side authorization checks |
| A02 | Cryptographic Failures [s1] | Weak or missing cryptography for data protection [s1] | Sensitive data sent over HTTP [s1] | TLS for transit<br>Strong cipher suites<br>Authenticated encryption |
| A03 | Injection [s1] | Untrusted input concatenated into interpreters [s1] | SQL injection<br>Cross-site scripting [s1] | Parameterized queries<br>Input validation<br>Output encoding |
| A04 | Insecure Design [s1] | Missing or ineffective security controls in architecture [s1] | Missing rate limiting on password reset [s1] | Threat modeling<br>Secure design patterns |
| A05 | Security Misconfiguration [s1] | Default or insecure configuration of stack components [s1] | Default admin credentials enabled [s1] | Hardening baselines<br>Automated configuration review |
| A06 | Vulnerable and Outdated Components [s1] | Use of libraries with known vulnerabilities [s1] | Log4Shell exposure 2021 | SCA scanning<br>Dependency pinning<br>Patch management |
| A07 | Identification and Authentication Failures [s1] | Weak authentication or session management [s1] | Credential stuffing succeeds [s1] | MFA<br>Strong password policy<br>Session management |
| A08 | Software and Data Integrity Failures [s1] | Trust assumptions about software updates and data integrity [s1] | Unsigned auto-update mechanism [s1] | Signed releases<br>SBOM<br>Integrity verification |
| A09 | Security Logging and Monitoring Failures [s1] | Insufficient logging or alerting [s1] | Failed logins not recorded [s1] | Centralized logging<br>Alerting on security events |
| A10 | Server-Side Request Forgery [s1] | Server fetches attacker-controlled URLs [s1] | Server fetches internal AWS metadata endpoint [s1] | URL allowlist<br>Network segmentation<br>Disable unused URL schemas |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. **No parentheticals in cells.** OWASP A-numbers (A01-A10) are part of the canonical category identifier.
- **2021 edition is current.** OWASP publishes the Top 10 every 3-4 years. The 2021 edition is the version cited on CISSP exams as of this Concept's authoring date; OWASP has signaled a 2025 edition is in development. SME pass should confirm against the current (ISC)² outline.
- **2017 → 2021 changes worth knowing.**
  - **A04 Insecure Design** was introduced as a new category (in 2017, design flaws were distributed across other categories).
  - **A06 Vulnerable and Outdated Components** rose from A09 in 2017 — a direct response to Log4Shell and the broader supply-chain attention.
  - **A03 Injection** absorbed XSS (which had been A07 in 2017). XSS is now a sub-class of Injection.
  - **A10 Server-Side Request Forgery (SSRF)** was promoted from a community survey item to its own category, reflecting the rise of cloud metadata service attacks.
- **A03 Injection covers more than SQL.** SQL injection is the iconic example, but the category also covers OS command injection, LDAP injection, XPath injection, NoSQL injection, expression-language injection, and XSS. Sibling Concepts `common-injection-types` and `xss-variants` enumerate these.
- **A04 Insecure Design is architectural.** The defining property is that *no amount of secure coding* fixes an insecure design — if the system architecture lacks rate limiting on a password reset endpoint, individual code reviews cannot recover the missing control. Threat modeling during the Design phase (Concept: `threat-modeling-in-sdlc`) is the canonical mitigation.
- **A08 Software and Data Integrity Failures.** Includes auto-update mechanisms that don't verify signatures, deserialization of untrusted data, and CI/CD pipelines that trust unverified plugins. Cross-tagged with the supply-chain Concepts (`software-supply-chain-controls`) for SBOM and signed-release mitigations.
- **OWASP Top 10 is web-app-focused.** Sister projects cover other domains: OWASP API Security Top 10 (separate Concept — `api-security-risks`), OWASP Mobile Top 10, OWASP LLM Top 10. CISSP testing focuses on the canonical web Top 10 unless a question is specifically API-scoped.
- **Out of scope for this Concept:** OWASP ASVS (Application Security Verification Standard — depth requirements per category), OWASP cheat sheets per category, specific CVE examples beyond Log4Shell, the OWASP Top 10 for LLM Applications, OWASP API Security Top 10 (covered in `api-security-risks`).

### Tricky distractors

- **A01 Broken Access Control.** Currently #1. Was #5 in 2017. The 2021 promotion reflects how often access-control flaws still appear. Wrong-answer pattern: associating "Broken Access Control" with authentication — it's *authorization* (after authentication, what can the user do).
- **A03 absorbed XSS.** XSS was its own category (A07) in 2017; in 2021 it's a sub-class of A03 Injection. Wrong-answer pattern: looking for "XSS" as a separate Top-10 entry in 2021 — it isn't.
- **A04 Insecure Design is architectural.** No amount of *secure coding* fixes a missing rate limit or absent threat model. Wrong-answer pattern: treating A04 as a coding issue when it's a design issue.
- **A06 Vulnerable Components.** This is the dependency / SBOM category. Log4Shell exposure is the canonical example. Wrong-answer pattern: confusing A06 with A02 Cryptographic Failures (which is about *using* weak crypto, not vulnerable libraries that happen to do crypto).
- **A07 vs A01.** A07 Authentication Failures = login mechanism is flawed. A01 Broken Access Control = authentication worked but authorization is wrong. Wrong-answer pattern: choosing A07 for an authorization scenario.
- **A10 SSRF.** Server-Side Request Forgery: the *server* fetches an attacker-controlled URL. Cloud metadata service attacks use this. Wrong-answer pattern: confusing SSRF with CSRF — CSRF is *client-side* (browser fooled into making a request); SSRF is *server-side*.

### Values without a direct public citation

| Cell | Value | Why unsourced |
|---|---|---|
| All rows × typical mitigation | Mitigation lists | OWASP Top 10 [s1] describes mitigations qualitatively per category; the cell values summarize. The category-specific OWASP Cheat Sheets [s2] are the primary mitigation references for each category. |
| A06 × example | `Log4Shell exposure 2021` | Real incident widely cited but not from a primary OWASP source. |
| A09 × example | `Failed logins not recorded` | Industry-typical example; not a direct OWASP quote. |

## Engine demo opportunities

- `A03 | Category → ?` → `Injection`
- `A04 | Category → ?` → `Insecure Design`
- `A10 | Category → ?` → `Server-Side Request Forgery`
- `? | Category → Broken Access Control` → `A01`
- `? | Category → Cryptographic Failures` → `A02`
- `Injection | typical mitigation → ?` → `Parameterized queries`, `Input validation`, `Output encoding`
- `? | typical mitigation → MFA` → `A07` (sub-Fact in multi-Fact cell)
- `? | typical mitigation → Threat modeling` → `A04` (sub-Fact in multi-Fact cell)
- `? | example → SQL injection` → `A03` (sub-Fact in multi-Fact cell)
- Sequence (rank ordering): `Rank following (Rank n | Category → Injection) | Category → ?` → `Insecure Design`
- Composite A03 Row with `typical mitigation` swapped to `Threat modeling`, `Secure design patterns` — directly tests the category-mitigation pairing (Injection is mitigated by parameterized queries; Insecure Design is mitigated by threat modeling)
- Composite A07 Row with `Category` swapped to `Server-Side Request Forgery` — tests the rank/category pairing (SSRF is A10; A07 is auth failures)
- Composite A06 Row with `example` swapped to `SQL injection` — tests the example-category alignment (Log4Shell is A06; SQLi is A03)

## Sources

- `[s1]`: OWASP, "OWASP Top 10:2021" — canonical category list with descriptions and example weaknesses (retrieved 2026-04-25, https://owasp.org/Top10/)
- `[s2]`: OWASP Cheat Sheet Series — per-category remediation guidance (retrieved 2026-04-25, https://cheatsheetseries.owasp.org/)
- `[s3]`: OWASP Application Security Verification Standard (ASVS) v4 — verification requirements aligned to Top 10 categories (retrieved 2026-04-25, https://owasp.org/www-project-application-security-verification-standard/)
