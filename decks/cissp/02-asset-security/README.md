# Domain 2: Asset Security

**Weight:** 10% &nbsp;|&nbsp; **Target facts:** ~500 &nbsp;|&nbsp; **Status:** Concept scaffold drafted, SME review pending

---

## (ISC)² Sub-objectives (verify against current outline)

| # | Sub-objective |
|---|---|
| 2.1 | Identify and classify information and assets |
| 2.2 | Establish information and asset handling requirements |
| 2.3 | Provision resources securely |
| 2.4 | Manage data lifecycle |
| 2.5 | Ensure appropriate asset retention |
| 2.6 | Determine data security controls and compliance requirements |

---

## Proposed Concepts (SME to confirm and refine)

### 2.1 Classification

| Concept | Pattern | Rows | Columns | Tags | Est. facts |
|---|---|---|---|---|---|
| Commercial classification levels | Dimensions | Public, Sensitive, Private, Confidential | definition, example data, handling requirements, marking | 2.1 | ~20 |
| Government classification levels | Dimensions | Unclassified, CUI, Confidential, Secret, Top Secret | definition, example data, clearance required, handling, marking | 2.1 | ~30 |
| Asset classification criteria | Aspects | Classification process | inputs considered, value drivers, sensitivity factors, output | 2.1 | ~10 |

### 2.2 Handling Requirements

| Concept | Pattern | Rows | Columns | Tags | Est. facts |
|---|---|---|---|---|---|
| Data roles | Dimensions | Owner, Custodian, Steward, User, Controller, Processor | responsibilities, accountability, typical example | 2.2 | ~24 |
| Data classification × handling | Dimensions | Public, Sensitive, Private, Confidential | marking required, encryption required, transmission rules, storage rules, disposal | 2.2 | ~25 |
| Data labeling vs marking | Dimensions | Labeling, Marking | definition, when applied, who applies, example | 2.2 | ~10 |

### 2.3 Provisioning

| Concept | Pattern | Rows | Columns | Tags | Est. facts |
|---|---|---|---|---|---|
| Asset inventory components | Dimensions | Hardware inventory, Software inventory, Configuration items, CMDB | purpose, what it tracks, audit role | 2.3 | ~12 |
| Asset tagging methods | Dimensions | Physical tag, RFID, Software agent, Network discovery | mechanism, accuracy, cost, typical use | 2.3 | ~16 |

### 2.4 Data Lifecycle

| Concept | Pattern | Rows | Columns | Tags | Est. facts |
|---|---|---|---|---|---|
| Data lifecycle phases | Ordered | Phase 1-6 (Create, Store, Use, Share, Archive, Destroy) | Name, Key Activity, Typical Controls | 2.4 | ~24 |
| Data states | Dimensions | At rest, In transit, In use | typical controls, encryption methods, threats, example | 2.4 | ~16 |
| Anonymization vs pseudonymization vs tokenization | Dimensions | Anonymization, Pseudonymization, Tokenization | definition, reversibility, regulatory treatment, example | 2.4 | ~16 |

### 2.5 Retention and Sanitization

| Concept | Pattern | Rows | Columns | Tags | Est. facts |
|---|---|---|---|---|---|
| Retention drivers | Dimensions | Legal hold, Regulatory, Operational, Industry standard | examples, typical retention period, governing authority | 2.5 | ~16 |
| Data sanitization methods | Dimensions | Clearing, Purging, Destruction, Cryptographic erasure | definition, when used, residual risk, reversibility | 2.5 | ~16 |
| Media destruction techniques | Dimensions | Degaussing, Shredding, Pulverizing, Incineration, Disintegration | applicable media, residual risk, verification, environmental impact | 2.5 | ~20 |

### 2.6 Controls and Compliance

| Concept | Pattern | Rows | Columns | Tags | Est. facts |
|---|---|---|---|---|---|
| DRM / IRM components | Dimensions | License management, Persistent protection, Auditing, Policy enforcement | definition, typical use case, weakness | 2.6 | ~12 |
| Data sovereignty considerations | Aspects | Data Sovereignty | what it means, key drivers, conflict examples, mitigation | 2.6 | ~10 |
| Cloud data residency models | Dimensions | Public cloud, Private cloud, Sovereign cloud, On-premises | data location guarantees, regulatory fit, cost, control | 2.6 | ~16 |

---

## Domain 2 Totals

- **Concepts:** ~17
- **Estimated facts:** ~270-300
- **Gap to target:** ~200 facts. Expand by adding more cells to existing Concepts (more example data per classification level, more threat/control facts per data state) and by adding sub-Concepts (e.g., specific marking conventions, classification authority roles).

---

## SME Review Checklist

- [ ] Sub-objective numbering matches current (ISC)² outline
- [ ] Concept list complete — what's missing?
- [ ] Concept list trimmable — what's noise?
- [ ] Patterns appropriate (Dimensions vs Ordered vs Aspects)
- [ ] Row and Column lists correct (within each Concept)
- [ ] Fact count estimates realistic
- [ ] Government classification levels: confirm CUI placement and current (ISC)² treatment

---

## Concept Files (to be created)

```
commercial-classification-levels.md           government-classification-levels.md
asset-classification-criteria.md              data-roles.md
data-classification-handling.md               data-labeling-vs-marking.md
asset-inventory-components.md                 asset-tagging-methods.md
data-lifecycle-phases.md                      data-states.md
anonymization-vs-pseudonymization.md          retention-drivers.md
data-sanitization-methods.md                  media-destruction-techniques.md
drm-irm-components.md                         data-sovereignty.md
cloud-data-residency-models.md
```
