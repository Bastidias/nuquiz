# Domain 7: Security Operations

**Weight:** 13% &nbsp;|&nbsp; **Target facts:** ~650 &nbsp;|&nbsp; **Status:** Concept scaffold drafted, SME review pending

The largest sub-objective list (15) and the broadest scope. Many Concepts overlap with other Domains (BC, physical security, investigations) — tag with multiple sub-objectives where appropriate. Heavy on Ordered Concepts (incident response, evidence chain, patch management, change management).

---

## (ISC)² Sub-objectives (verify against current outline)

| # | Sub-objective |
|---|---|
| 7.1 | Understand and comply with investigations |
| 7.2 | Conduct logging and monitoring activities |
| 7.3 | Perform configuration management (CM) |
| 7.4 | Apply foundational security operations concepts |
| 7.5 | Apply resource protection |
| 7.6 | Conduct incident management |
| 7.7 | Operate and maintain detective and preventive measures |
| 7.8 | Implement and support patch and vulnerability management |
| 7.9 | Understand and participate in change management |
| 7.10 | Implement recovery strategies |
| 7.11 | Implement Disaster Recovery (DR) processes |
| 7.12 | Test Disaster Recovery Plans (DRP) |
| 7.13 | Participate in BCP |
| 7.14 | Implement and manage physical security |
| 7.15 | Address personnel safety and security concerns |

---

## Proposed Concepts (SME to confirm and refine)

### 7.1 Investigations
Investigation types and Evidence types Concepts already live in D1 (Sub-obj 1.6). Tag both 1.6 and 7.1 — do not duplicate.

### 7.2 Logging and Monitoring

| Concept | Pattern | Rows | Columns | Tags | Est. facts |
|---|---|---|---|---|---|
| SIEM vs SOAR vs XDR | Dimensions | SIEM, SOAR, XDR | core function, automation level, typical inputs, typical outputs | 7.2 | ~16 |
| Log analysis methods | Dimensions | Manual review, Rule-based correlation, Machine learning, UEBA | strengths, weaknesses, typical use | 7.2 | ~16 |
| Continuous monitoring components | Dimensions | Asset monitoring, Configuration monitoring, Vulnerability monitoring, Threat monitoring | what it watches, alerting trigger | 7.2 | ~12 |

### 7.3 Configuration Management

| Concept | Pattern | Rows | Columns | Tags | Est. facts |
|---|---|---|---|---|---|
| Configuration baselines | Dimensions | Functional, Allocated, Product, Operational | what it defines, when established | 7.3 | ~12 |
| CMDB components | Dimensions | Configuration Item (CI), Relationships, Baselines, Change history | purpose, content | 7.3 | ~12 |

### 7.4 Foundational Concepts

| Concept | Pattern | Rows | Columns | Tags | Est. facts |
|---|---|---|---|---|---|
| Foundational ops controls | Dimensions | Need-to-know, Least privilege, Separation of duties, Job rotation, Mandatory vacation, Dual control, Two-person integrity | purpose, threat mitigated, typical example | 7.4 | ~28 |
| SoD vs Job rotation vs Mandatory vacation | Dimensions | SoD, Job rotation, Mandatory vacation | purpose, threat mitigated, frequency | 7.4 | ~12 |

### 7.5 Resource Protection

| Concept | Pattern | Rows | Columns | Tags | Est. facts |
|---|---|---|---|---|---|
| Asset hardening techniques | Dimensions | Disable unused services, Apply patches, Configure secure defaults, Remove default accounts, Enable logging | rationale, typical CIS benchmark reference | 7.5 | ~20 |
| Anti-malware technologies | Dimensions | Signature-based AV, Heuristic AV, Behavior-based EDR, Sandbox detonation | mechanism, strengths, weakness | 7.5 | ~16 |

### 7.6 Incident Management

| Concept | Pattern | Rows | Columns | Tags | Est. facts |
|---|---|---|---|---|---|
| Incident response phases | Ordered | Phase 1-7 (Preparation, Detection & Analysis, Containment, Eradication, Recovery, Post-incident, Lessons learned) — NIST SP 800-61 | Name, Key Activity, Typical Output | 7.6 | ~28 |
| Containment strategies | Dimensions | Short-term containment, Long-term containment, System backup before eradication | when used, tradeoffs, evidence preservation | 7.6 | ~12 |
| Evidence handling chain | Ordered | Step 1-5 (Identification, Collection, Preservation, Analysis, Presentation) | Name, Key Activity, Typical Tools | 7.6 | ~20 |
| Forensics artifact types | Dimensions | Disk image, Memory dump, Network capture, Log files, Browser history | typical use, volatility, collection method | 7.6 | ~20 |
| Volatility order | Ordered | Order 1-7 (CPU registers, Cache, RAM, Network state, Running processes, Disk, Archived media) | Name, Reason for order, Typical capture tool | 7.6 | ~21 |

### 7.7 Detective and Preventive Measures

| Concept | Pattern | Rows | Columns | Tags | Est. facts |
|---|---|---|---|---|---|
| IDS/IPS types | Dimensions | Signature-based, Anomaly-based, Heuristic, Stateful protocol analysis | detection method, strengths, weakness | 7.7 | ~16 |
| Network IDS vs Host IDS | Dimensions | NIDS, HIDS, Hybrid | placement, what it sees, blind spots | 7.7 | ~12 |
| Honeypot types | Dimensions | Low-interaction, High-interaction, Honeynet, Honeytoken | depth of deception, attacker engagement, risk | 7.7 | ~16 |

### 7.8 Patch and Vulnerability Management

| Concept | Pattern | Rows | Columns | Tags | Est. facts |
|---|---|---|---|---|---|
| Patch management lifecycle | Ordered | Phase 1-6 (Identification, Evaluation, Testing, Approval, Deployment, Verification) | Name, Key Activity, Typical Output | 7.8 | ~18 |
| Patch deployment strategies | Dimensions | Phased rollout, Pilot group, Canary, Big bang | risk profile, when used, rollback complexity | 7.8 | ~16 |

### 7.9 Change Management

| Concept | Pattern | Rows | Columns | Tags | Est. facts |
|---|---|---|---|---|---|
| Change management lifecycle | Ordered | Phase 1-7 (Request, Review, Approval, Schedule, Implement, Verify, Close) | Name, Key Activity, Typical Output | 7.9 | ~21 |
| Change types | Dimensions | Standard, Normal, Emergency | approval path, risk profile, typical example | 7.9 | ~12 |

### 7.10-7.13 Recovery, DR, BC

Recovery site types (hot/warm/cold/mobile/cloud) already in D1 (Sub-obj 1.8). Tag both 1.8 and 7.10. BCP phases already in D1 (Sub-obj 1.8). Tag both.

| Concept | Pattern | Rows | Columns | Tags | Est. facts |
|---|---|---|---|---|---|
| Backup strategies | Dimensions | Full, Incremental, Differential, Snapshot, Mirroring, Continuous data protection (CDP) | data captured, restore time, storage cost, typical use | 7.10 | ~24 |
| RAID levels | Dimensions | RAID 0, 1, 5, 6, 10, 50, 60 | minimum disks, fault tolerance, performance, typical use | 7.10 | ~28 |
| DR test types | Ordered | Type 1-5 (Checklist/Read-through, Walkthrough/Tabletop, Simulation, Parallel, Full interruption) | Name, Disruption Level, Effort, Confidence Gained | 7.12 | ~20 |
| Recovery objectives | Dimensions | RTO, RPO, MTD, MTTR, MTBF, WRT | what it measures, unit, who sets target | 7.10, 1.8 | ~24 |

### 7.14 Physical Security
Physical perimeter controls, access controls, lock types, fire classes, fire suppression already live in D3 (Sub-obj 3.9). Tag both 3.9 and 7.14.

### 7.15 Personnel Safety

| Concept | Pattern | Rows | Columns | Tags | Est. facts |
|---|---|---|---|---|---|
| Personnel safety controls | Dimensions | Travel security, Duress signals, Emergency communication, Active shooter response | trigger, expected response, training | 7.15 | ~16 |
| Travel security risks | Dimensions | Espionage, Theft, Health emergencies, Geopolitical instability | typical control, pre-travel briefing | 7.15 | ~12 |

---

## Domain 7 Totals

- **Concepts:** ~24 (plus tagged-shared with D1 and D3)
- **Estimated facts:** ~480-540 (own); +shared facts from tagged Concepts
- Tagging-shared: investigation types, evidence types, BCP phases, recovery site types, physical controls, fire classes, fire suppression — these reuse facts from D1 and D3 without duplicating

---

## SME Review Checklist

- [ ] Sub-objective numbering matches current (ISC)² outline
- [ ] Tagging strategy correct for shared Concepts (D1 ↔ D7, D3 ↔ D7)
- [ ] IR phase model — 7-step NIST SP 800-61 vs 6-step or 4-step simplifications
- [ ] DR test types — confirm 5-type model vs different naming
- [ ] RAID coverage — include 50/60 or just 0/1/5/6/10?
- [ ] Patterns appropriate
- [ ] Fact count estimates realistic

---

## Concept Files (to be created)

```
siem-soar-xdr.md                      log-analysis-methods.md
continuous-monitoring.md              configuration-baselines.md
cmdb-components.md                    foundational-ops-controls.md
sod-vs-rotation-vs-vacation.md        asset-hardening.md
anti-malware-technologies.md          incident-response-phases.md
containment-strategies.md             evidence-handling-chain.md
forensics-artifact-types.md           volatility-order.md
ids-ips-types.md                      nids-vs-hids.md
honeypot-types.md                     patch-management-lifecycle.md
patch-deployment-strategies.md        change-management-lifecycle.md
change-types.md                       backup-strategies.md
raid-levels.md                        dr-test-types.md
recovery-objectives.md                personnel-safety-controls.md
travel-security-risks.md
```
