# Domain 8: Software Development Security

**Weight:** 10% &nbsp;|&nbsp; **Target facts:** ~500 &nbsp;|&nbsp; **Status:** Concept scaffold drafted, SME review pending

Mostly Dimensions Concepts (SDLC model comparison, vulnerability comparison, testing tool comparison) plus a few Ordered Concepts (CI/CD pipeline phases, SDLC phases).

---

## (ISC)² Sub-objectives (verify against current outline)

| # | Sub-objective |
|---|---|
| 8.1 | Understand and integrate security in the Software Development Life Cycle (SDLC) |
| 8.2 | Identify and apply security controls in software development ecosystems |
| 8.3 | Assess the effectiveness of software security |
| 8.4 | Assess security impact of acquired software |
| 8.5 | Define and apply secure coding guidelines and standards |

---

## Proposed Concepts (SME to confirm and refine)

### 8.1 SDLC Security Integration

| Concept | Pattern | Rows | Columns | Tags | Est. facts |
|---|---|---|---|---|---|
| SDLC models | Dimensions | Waterfall, V-Model, Spiral, Agile, DevOps, DevSecOps | iteration style, security integration approach, typical phase count, strengths, weaknesses | 8.1 | ~30 |
| Waterfall phases | Ordered | Phase 1-6 (Requirements, Design, Implementation, Verification, Maintenance) | Name, Key Activity, Typical Output | 8.1 | ~18 |
| Agile ceremonies | Dimensions | Sprint planning, Daily standup, Sprint review, Retrospective, Backlog refinement | purpose, frequency, output | 8.1 | ~20 |
| Security activities by SDLC phase | Dimensions | Requirements, Design, Implementation, Testing, Deployment, Operations | typical security activity, owner, output | 8.1 | ~24 |
| Threat modeling in SDLC | Aspects | Threat modeling lifecycle | when in SDLC, inputs, methodology choice (STRIDE/PASTA/DREAD), outputs | 8.1, 1.11 | ~10 |

### 8.2 Development Ecosystem Controls

| Concept | Pattern | Rows | Columns | Tags | Est. facts |
|---|---|---|---|---|---|
| Software maturity models | Dimensions | CMMI, SAMM (OWASP), BSIMM | scope, level structure, typical use, public benchmarks | 8.2 | ~16 |
| CMMI maturity levels | Ordered | Level 1-5 (Initial, Managed, Defined, Quantitatively Managed, Optimizing) | Name, Characteristic, Typical Practice | 8.2 | ~15 |
| Source code analysis types | Dimensions | SAST, DAST, IAST, RASP, SCA, Secrets scanning | when run, what it detects, false-positive rate, integration point | 8.2 | ~30 |
| CI/CD pipeline stages | Ordered | Stage 1-7 (Commit, Build, Test, Security scan, Package, Deploy, Verify) | Name, Key Activity, Typical Tools | 8.2 | ~21 |
| Repository security controls | Dimensions | Branch protection, Required reviewers, Signed commits, Secrets scanning, Dependency review | mechanism, threat mitigated | 8.2 | ~15 |

### 8.3 Software Security Effectiveness

| Concept | Pattern | Rows | Columns | Tags | Est. facts |
|---|---|---|---|---|---|
| Software security metrics | Dimensions | Defect density, Mean time to remediate (MTTR), Vulnerability backlog, Code coverage, Security test coverage | what it measures, target value, leading or lagging | 8.3 | ~20 |
| Code review types | Dimensions | Peer review, Tool-assisted review, Pair programming, Formal inspection | depth, time cost, defect-finding rate | 8.3 | ~16 |
| Audit log requirements | Dimensions | Authentication events, Authorization changes, Data access, Configuration changes, Errors | what to capture, retention, sensitivity | 8.3 | ~20 |

### 8.4 Acquired Software

| Concept | Pattern | Rows | Columns | Tags | Est. facts |
|---|---|---|---|---|---|
| Software supply chain risks | Dimensions | Compromised dependency, Malicious package, Typosquatting, Backdoored binary, Vendor breach | mechanism, real-world example, mitigation | 8.4 | ~20 |
| Software supply chain controls | Dimensions | SBOM, SCA scanning, Dependency pinning, Signed releases, Vendor risk assessment | what it provides, typical tooling | 8.4 | ~15 |
| Open source license types | Dimensions | GPL, LGPL, MIT, Apache 2.0, BSD, Proprietary | copyleft strength, commercial use, derivative-work rules | 8.4 | ~24 |

### 8.5 Secure Coding

| Concept | Pattern | Rows | Columns | Tags | Est. facts |
|---|---|---|---|---|---|
| OWASP Top 10 (2021) | Dimensions | A01 Broken Access Control, A02 Cryptographic Failures, A03 Injection, A04 Insecure Design, A05 Security Misconfiguration, A06 Vulnerable Components, A07 ID & Authn Failures, A08 Software & Data Integrity Failures, A09 Logging Failures, A10 SSRF | description, example, typical mitigation | 8.5 | ~40 |
| Common injection types | Dimensions | SQL injection, NoSQL injection, OS command injection, LDAP injection, XPath injection, XSS (reflected/stored/DOM) | mechanism, example payload, mitigation | 8.5 | ~28 |
| XSS variants | Dimensions | Reflected, Stored, DOM-based | trigger, persistence, mitigation | 8.5 | ~12 |
| Database security concepts | Dimensions | ACID, Inference, Aggregation, Polyinstantiation, View-based access | what it protects against, typical use | 8.5 | ~20 |
| API security risks (OWASP API Top 10) | Dimensions | BOLA, Broken authn, BOPLA, Resource consumption, BFLA, Server-side request forgery, Misconfiguration | description, mitigation | 8.5 | ~21 |
| Common coding vulnerabilities | Dimensions | Buffer overflow, Race condition, Integer overflow, Format string, Use-after-free, NULL pointer dereference | mechanism, language commonly affected, mitigation | 8.5 | ~24 |

---

## Domain 8 Totals

- **Concepts:** ~21
- **Estimated facts:** ~470-510 (matches target)

---

## SME Review Checklist

- [ ] Sub-objective numbering matches current (ISC)² outline
- [ ] OWASP Top 10 — confirm 2021 version vs newer if (ISC)² updated
- [ ] OWASP API Top 10 — current version is 2023; confirm coverage
- [ ] DevSecOps emphasis — increasing in current (ISC)² outline
- [ ] CI/CD coverage depth — 7-stage model is one option; some texts use 5
- [ ] Patterns appropriate
- [ ] Fact count estimates realistic

---

## Concept Files (to be created)

```
sdlc-models.md                        waterfall-phases.md
agile-ceremonies.md                   security-activities-by-phase.md
threat-modeling-in-sdlc.md            software-maturity-models.md
cmmi-maturity-levels.md               source-code-analysis-types.md
ci-cd-pipeline-stages.md              repository-security-controls.md
software-security-metrics.md          code-review-types.md
audit-log-requirements.md             software-supply-chain-risks.md
software-supply-chain-controls.md     open-source-license-types.md
owasp-top-10.md                       common-injection-types.md
xss-variants.md                       database-security-concepts.md
api-security-risks.md                 common-coding-vulnerabilities.md
```
