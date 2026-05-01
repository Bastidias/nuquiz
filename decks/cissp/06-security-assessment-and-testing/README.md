# Domain 6: Security Assessment and Testing

**Weight:** 12% &nbsp;|&nbsp; **Target facts:** ~600 &nbsp;|&nbsp; **Status:** Concept scaffold drafted, SME review pending

Mostly Dimensions Concepts (test type comparisons, SOC report types, KPI/KRI/KCI distinctions) plus a few Ordered Concepts (pen test phases, audit lifecycle).

---

## (ISC)² Sub-objectives (verify against current outline)

| # | Sub-objective |
|---|---|
| 6.1 | Design and validate assessment, test, and audit strategies |
| 6.2 | Conduct security control testing |
| 6.3 | Collect security process data |
| 6.4 | Analyze test output and generate report |
| 6.5 | Conduct or facilitate security audits |

---

## Proposed Concepts (SME to confirm and refine)

### 6.1 Assessment Strategies

| Concept | Pattern | Rows | Columns | Tags | Est. facts |
|---|---|---|---|---|---|
| Assessment types | Dimensions | Vulnerability scan, Penetration test, Audit, Code review, Configuration review, Compliance assessment, Risk assessment | objective, depth, frequency, output | 6.1 | ~28 |
| Assessment perspectives | Dimensions | Internal, External, Third-party | who performs, scope, independence, typical purpose | 6.1 | ~12 |

### 6.2 Security Control Testing

| Concept | Pattern | Rows | Columns | Tags | Est. facts |
|---|---|---|---|---|---|
| Penetration test phases | Ordered | Step 1-5 (Planning, Discovery, Attack, Reporting, Remediation testing) | Name, Key Activity, Typical Output | 6.2 | ~20 |
| Pen test perspectives | Dimensions | Black box, Gray box, White box | knowledge given, simulates, cost, time | 6.2 | ~16 |
| Vulnerability scan types | Dimensions | Network scan, Web app scan, Authenticated scan, Unauthenticated scan, Compliance scan | what it tests, depth, typical false-positive rate | 6.2 | ~20 |
| Software testing types | Dimensions | Static (SAST), Dynamic (DAST), Interactive (IAST), Runtime (RASP), Composition (SCA), Fuzz, Mutation | what it analyzes, when in SDLC, strengths | 6.2 | ~28 |
| Manual review types | Dimensions | Code review, Misuse case review, Architecture review | input, who performs, output | 6.2 | ~12 |
| Test execution types | Dimensions | Unit, Integration, System, Acceptance, Regression, Smoke | scope, who runs, when | 6.2 | ~24 |

### 6.3 Process Data

| Concept | Pattern | Rows | Columns | Tags | Est. facts |
|---|---|---|---|---|---|
| KPI vs KRI vs KCI | Dimensions | KPI, KRI, KCI | what it measures, leading or lagging, typical use | 6.3 | ~12 |
| Log types | Dimensions | Authentication, System, Application, Network, Database, Security event | typical content, retention driver, sensitivity | 6.3 | ~24 |
| Account management metrics | Dimensions | Account creation rate, Dormant account count, Privilege escalation events, Failed authn attempts | what it indicates, alerting threshold | 6.3 | ~12 |
| Backup verification metrics | Dimensions | Backup success rate, Restore test frequency, RPO compliance, RTO compliance | how measured, target | 6.3 | ~12 |

### 6.4 Test Output Analysis

| Concept | Pattern | Rows | Columns | Tags | Est. facts |
|---|---|---|---|---|---|
| Vulnerability severity scoring | Dimensions | CVSS Critical, High, Medium, Low, Info | score range, response timeline, typical remediation | 6.4 | ~20 |
| CVSS metric groups | Dimensions | Base, Temporal, Environmental | what it captures, mutability | 6.4 | ~9 |
| Report stakeholders | Dimensions | Executive, Technical, Auditor, Customer | content emphasis, format, frequency | 6.4 | ~16 |

### 6.5 Audits

| Concept | Pattern | Rows | Columns | Tags | Est. facts |
|---|---|---|---|---|---|
| Audit types | Dimensions | Internal, External, Third-party, Regulatory | who performs, independence, typical output | 6.5 | ~16 |
| SOC report types | Dimensions | SOC 1, SOC 2 Type I, SOC 2 Type II, SOC 3 | scope, audience, period covered, typical use | 6.5 | ~20 |
| SOC 2 Trust Service Criteria | Dimensions | Security, Availability, Processing Integrity, Confidentiality, Privacy | what it covers, mandatory? | 6.5 | ~10 |
| Audit lifecycle | Ordered | Phase 1-5 (Planning, Fieldwork, Reporting, Remediation, Follow-up) | Name, Key Activity, Typical Output | 6.5 | ~15 |

---

## Domain 6 Totals

- **Concepts:** ~19
- **Estimated facts:** ~370-410
- **Gap to target:** ~200. Expand with deeper testing technique facts, more CVSS dimensions, audit-specific evidence types.

---

## SME Review Checklist

- [ ] Sub-objective numbering matches current (ISC)² outline
- [ ] CVSS version — confirm v3.1 vs v4.0 treatment in current exam
- [ ] SOC report depth — Type I vs Type II distinction is exam-classic
- [ ] Pen test phase model — 5-step is common; some sources teach 7-step
- [ ] Software testing types — keep as one Concept or split SAST/DAST/etc into separate?
- [ ] Patterns appropriate
- [ ] Fact count estimates realistic

---

## Concept Files (to be created)

```
assessment-types.md                   assessment-perspectives.md
penetration-test-phases.md            pen-test-perspectives.md
vulnerability-scan-types.md           software-testing-types.md
manual-review-types.md                test-execution-types.md
kpi-vs-kri-vs-kci.md                  log-types.md
account-management-metrics.md         backup-verification-metrics.md
vulnerability-severity-scoring.md     cvss-metric-groups.md
report-stakeholders.md                audit-types.md
soc-report-types.md                   soc2-trust-service-criteria.md
audit-lifecycle.md
```
