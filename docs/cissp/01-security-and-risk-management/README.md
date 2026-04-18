# Domain 1: Security and Risk Management

**Weight:** 16% &nbsp;|&nbsp; **Target triples:** ~800 &nbsp;|&nbsp; **Status:** Concept list drafted, SME review pending

---

## (ISC)² Sub-objectives (verify against current outline)

| # | Sub-objective |
|---|---|
| 1.1 | Understand, adhere to, and promote professional ethics |
| 1.2 | Understand and apply security concepts |
| 1.3 | Evaluate and apply security governance principles |
| 1.4 | Determine compliance and other requirements |
| 1.5 | Understand legal and regulatory issues that pertain to information security in a holistic context |
| 1.6 | Understand requirements for investigation types |
| 1.7 | Develop, document, and implement security policy, standards, procedures, and guidelines |
| 1.8 | Identify, analyze, and prioritize Business Continuity (BC) requirements |
| 1.9 | Contribute to and enforce personnel security policies and procedures |
| 1.10 | Understand and apply risk management concepts |
| 1.11 | Understand and apply threat modeling concepts and methodologies |
| 1.12 | Apply Supply Chain Risk Management (SCRM) concepts |
| 1.13 | Establish and maintain a security awareness, education, and training program |

---

## Proposed Concepts

Starter set (~28 Concepts). Each will become a file in this folder.

### 1.1 Ethics
| Concept | Pattern | Rows | Columns | Tags | Est. facts |
|---|---|---|---|---|---|
| (ISC)² Code of Ethics canons | Ordered | Canon 1-4 (priority order) | Text, Intent, Example violation | 1.1 | ~12 |

### 1.2 Security Concepts
| Concept | Pattern | Rows | Columns | Tags | Est. facts |
|---|---|---|---|---|---|
| CIA Triad components | Dimensions | Confidentiality, Integrity, Availability | definition, common threats, common controls, example | 1.2 | ~12 |
| AAA and extensions | Dimensions | Authentication, Authorization, Accounting, Auditing, Identification | definition, mechanism, example | 1.2 | ~15 |
| Security concept frameworks | Dimensions | CIA, DAD, IAAA, Parkerian Hexad | components, focus, when used | 1.2 | ~12 |

### 1.3 Governance
| Concept | Pattern | Rows | Columns | Tags | Est. facts |
|---|---|---|---|---|---|
| Governance roles | Dimensions | Board, Senior Mgmt, Data Owner, Data Custodian, System Owner, User, Auditor | responsibilities, accountability, reports to | 1.3 | ~21 |
| Governance documents | Dimensions | Policy, Standard, Procedure, Guideline, Baseline | definition, required?, example, who writes | 1.3, 1.7 | ~20 |

### 1.4 Compliance
| Concept | Pattern | Rows | Columns | Tags | Est. facts |
|---|---|---|---|---|---|
| Privacy laws | Dimensions | GDPR, CCPA, HIPAA, PIPEDA, LGPD | jurisdiction, scope, key rights, penalties, enforcement | 1.4, 1.5 | ~25 |
| Industry standards | Dimensions | PCI-DSS, SOX, GLBA, FISMA | scope, enforcer, key requirements | 1.4 | ~12 |

### 1.5 Legal Issues
| Concept | Pattern | Rows | Columns | Tags | Est. facts |
|---|---|---|---|---|---|
| IP protections | Dimensions | Copyright, Trademark, Patent, Trade Secret | what it protects, duration, registration required?, example | 1.5 | ~16 |
| Computer crime categories | Dimensions | Military/intel, Business, Financial, Terrorist, Grudge, Fun/thrill | motivation, typical target, example | 1.5 | ~18 |

### 1.6 Investigation Types
| Concept | Pattern | Rows | Columns | Tags | Est. facts |
|---|---|---|---|---|---|
| Investigation types | Dimensions | Administrative, Criminal, Civil, Regulatory, Industry | burden of proof, who conducts, outcome, evidence rules | 1.6 | ~20 |
| Evidence types | Dimensions | Real, Documentary, Testimonial, Demonstrative, Hearsay | definition, admissibility, example | 1.6 | ~15 |

### 1.7 Policy Documents
Covered in 1.3 "Governance documents" — tag both.

### 1.8 Business Continuity
| Concept | Pattern | Rows | Columns | Tags | Est. facts |
|---|---|---|---|---|---|
| BCP phases | Ordered | Phase 1-7 (NIST SP 800-34) | Name, Key Activity, Typical Output | 1.8 | ~21 |
| BIA components | Dimensions | Critical functions, MTD, RTO, RPO, WRT, MTBF | definition, what it measures, relation to others, example | 1.8 | ~24 |
| Recovery site types | Dimensions | Hot, Warm, Cold, Mobile, Cloud, Reciprocal | cost, setup time, resources ready, typical RTO | 1.8 | ~24 |

### 1.9 Personnel Security
| Concept | Pattern | Rows | Columns | Tags | Est. facts |
|---|---|---|---|---|---|
| Personnel controls | Dimensions | Background check, NDA, SoD, Job rotation, Mandatory vacation, Least privilege, Need to know | purpose, when applied, threat mitigated | 1.9 | ~21 |
| Onboarding/offboarding phases | Ordered | Phase 1-N (in sequence) | TBD step attributes | 1.9 | ~10 |
| Termination types | Dimensions | Voluntary, Involuntary friendly, Involuntary hostile, Retirement, Layoff | security posture, access revocation timing, exit interview? | 1.9 | ~15 |

### 1.10 Risk Management
| Concept | Pattern | Rows | Columns | Tags | Est. facts |
|---|---|---|---|---|---|
| Risk treatment options | Dimensions | Accept, Avoid, Transfer, Mitigate | definition, when chosen, example, residual risk | 1.10 | ~16 |
| Quantitative risk formulas | Dimensions | AV, EF, SLE, ARO, ALE, Safeguard value | formula, what it measures, example calculation | 1.10 | ~18 |
| Qualitative vs Quantitative analysis | Dimensions | Qualitative, Quantitative, Hybrid | output, required data, strengths, weaknesses, when used | 1.10 | ~15 |
| Risk frameworks | Dimensions | NIST RMF, ISO 27005, OCTAVE, FAIR, TARA | focus, phases, strengths, typical adopter | 1.10 | ~20 |
| Control categories | Dimensions | Directive, Deterrent, Preventive, Detective, Corrective, Recovery, Compensating | definition, timing, example | 1.10 | ~21 |
| Control types | Dimensions | Administrative, Technical/Logical, Physical | definition, example, typical owner | 1.10 | ~9 |

### 1.11 Threat Modeling
| Concept | Pattern | Rows | Columns | Tags | Est. facts |
|---|---|---|---|---|---|
| Threat modeling methodologies | Dimensions | STRIDE, PASTA, DREAD, VAST, TRIKE, Attack Trees | focus, steps/structure, output, when used | 1.11 | ~24 |
| STRIDE categories | Dimensions | Spoofing, Tampering, Repudiation, Info disclosure, DoS, Elevation | property violated, example attack, typical mitigation | 1.11 | ~18 |

### 1.12 Supply Chain Risk (SCRM)
| Concept | Pattern | Rows | Columns | Tags | Est. facts |
|---|---|---|---|---|---|
| Supply chain risks | Dimensions | Counterfeit, Tampering, Insertion, Vendor lock-in, Subcontractor breach | description, mitigation, real-world example | 1.12 | ~15 |
| Third-party assessment artifacts | Dimensions | SOC 1, SOC 2 Type I, SOC 2 Type II, SOC 3, ISO 27001 cert | scope, audience, assertion, when required | 1.12 | ~20 |

### 1.13 Security Awareness Training
| Concept | Pattern | Rows | Columns | Tags | Est. facts |
|---|---|---|---|---|---|
| Training audiences | Dimensions | General user, Privileged user, Executive, Developer, Incident responder | content focus, frequency, delivery method | 1.13 | ~15 |
| Training program phases | Ordered | Phase 1-N (in sequence) | TBD step attributes | 1.13 | ~8 |

---

## Domain 1 Totals

- **Concepts:** ~28
- **Estimated facts:** ~750-800 (matches target)

---

## SME Review Checklist

- [ ] Sub-objective numbering matches current (ISC)² outline
- [ ] Concept list complete — what's missing?
- [ ] Concept list trimmable — what's noise?
- [ ] Predicate styles appropriate per Concept
- [ ] Subjects and Predicates lists correct (within each Concept)
- [ ] Fact count estimates realistic

---

## Concept Files (to be created)

One `.md` per Concept once the list is confirmed. Proposed filenames:

```
code-of-ethics-canons.md              governance-roles.md
cia-triad.md                          governance-documents.md
aaa-extensions.md                     privacy-laws.md
security-concept-frameworks.md        industry-standards.md
ip-protections.md                     computer-crime-categories.md
investigation-types.md                evidence-types.md
bcp-phases.md                         bia-components.md
recovery-site-types.md                personnel-controls.md
onboarding-offboarding.md             termination-types.md
risk-treatment.md                     quantitative-risk-formulas.md
qual-vs-quant-analysis.md             risk-frameworks.md
control-categories.md                 control-types.md
threat-modeling-methodologies.md      stride-categories.md
supply-chain-risks.md                 third-party-assessment-artifacts.md
training-audiences.md                 training-program-phases.md
```
