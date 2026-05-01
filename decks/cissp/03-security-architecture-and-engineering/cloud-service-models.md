# Cloud Service Models

**Domain:** 3 — Security Architecture and Engineering &nbsp;|&nbsp; **Pattern:** Dimensions &nbsp;|&nbsp; **Tags:** 3.5

**Status:** draft (SME review pending)

The four cloud service models defined by NIST SP 800-145 [s1] plus FaaS, the post-NIST serverless model that dominates modern cloud-native deployments. Each pairs *what the customer manages* with *what the provider manages* — the Shared Responsibility Model boundary that determines who owns each control. The CISSP exam tests both the per-model definition and the responsibility-boundary matchup, particularly that the customer's responsibility shrinks (and the provider's grows) as you move from IaaS toward SaaS.

| Model | what provider manages | what customer manages | typical example | customer responsibility |
|---|---|---|---|---|
| IaaS | Physical infrastructure<br>Virtualization<br>Networking [s1] | OS<br>Middleware<br>Runtime<br>Data<br>Applications [s1] | Virtual machines on AWS EC2 [s2] | Highest customer responsibility short of on-premises [s2] |
| PaaS | Physical infrastructure<br>Virtualization<br>OS<br>Middleware<br>Runtime [s1] | Data<br>Applications [s1] | Application platform such as AWS Elastic Beanstalk [s2] | Application and data security [s2] |
| SaaS | Physical infrastructure<br>Virtualization<br>OS<br>Middleware<br>Runtime<br>Application [s1] | Data<br>User access configuration [s1] | Web-delivered application such as Salesforce [s2] | Data classification and access management [s2] |
| FaaS | Physical infrastructure<br>Virtualization<br>OS<br>Runtime<br>Application platform | Function code<br>Function configuration<br>Data | Event-triggered function such as AWS Lambda | Function code and event-source security |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. **No parentheticals in cells.** Acronym expansions live in this section.
- **Acronym expansions.** `IaaS` = Infrastructure as a Service. `PaaS` = Platform as a Service. `SaaS` = Software as a Service. `FaaS` = Function as a Service (also called serverless). `CSP` = Cloud Service Provider. `CSC` = Cloud Service Customer. `SLA` = Service Level Agreement. `MSA` = Master Services Agreement. `MTM` = Multi-Tenancy Model.
- **Shared Responsibility Model is the test favorite.** As you move from IaaS toward SaaS, customer responsibility shrinks and provider responsibility grows. IaaS customers patch the OS; PaaS customers don't. PaaS customers patch the runtime; SaaS customers don't. SaaS customers configure user access; the provider runs the application. The boundary moves; the shared-responsibility *principle* (someone is always responsible) does not.
- **The data-and-access-control responsibility never transfers.** Across all four models, the customer remains responsible for: data classification, who has access, what data is uploaded, regulatory compliance for the data, and incident response for data-related events. Even in SaaS, "the cloud provider has my data" does not transfer regulatory responsibility — GDPR controllership stays with the customer (see `data-roles` in D2 for Controller vs Processor).
- **NIST SP 800-145 defined three; FaaS came later.** The 2011 NIST publication codified IaaS, PaaS, and SaaS as the three cloud service models. FaaS / serverless emerged with AWS Lambda (2014) and is now widely treated as a fourth model. CISSP testing as of 2024 includes FaaS at recognition level; the original three remain the dominant exam framing.
- **NIST cloud deployment models are separate.** Public, private, community, hybrid (and in current practice, sovereign) are *deployment* models — covered in `cloud-data-residency-models` in D2. *Service* models (this Concept) are about what's delivered; *deployment* models are about who operates it and where.
- **CASB sits between customer and SaaS.** Cloud Access Security Brokers extend customer security controls (DLP, access governance, threat detection) into SaaS environments where the customer otherwise has limited control. CASB exists because the SaaS shared-responsibility model leaves data governance with the customer but the application controls with the provider.
- **Multi-tenancy is the structural risk.** All four models share infrastructure across tenants. Provider compromise potentially exposes all tenants; tenant-isolation flaws (the "noisy neighbor" pattern in storage, networking, or compute) can enable cross-tenant attacks. Confidential computing (TEEs, see `trusted-computing-components`) addresses some of this for high-sensitivity workloads.
- **Cross-Concept link.** Sibling Concept `cloud-data-residency-models` in D2 covers public/private/community/hybrid/sovereign deployment models. `data-sovereignty` covers the legal-jurisdiction dimension. `trusted-computing-components` covers the TEE/HSM controls used for high-sensitivity cloud workloads.
- **Out of scope for this Concept:** specific cloud provider products (AWS / Azure / GCP service catalogs), CSA Cloud Controls Matrix (CCM), FedRAMP authorization levels, cloud-specific compliance (PCI in the cloud, HITRUST in the cloud), edge / fog computing, container orchestration security (Kubernetes RBAC, pod security), CSP API security, cloud workload protection platforms (CWPP).

### Tricky distractors

- **Customer always owns data classification and access.** Even in SaaS. Wrong-answer pattern: claiming the cloud provider becomes responsible for data security in SaaS — the customer (Controller) retains data responsibility per GDPR; provider (Processor) acts on instructions.
- **IaaS = highest customer responsibility (other than on-premises).** Customer patches OS upward. Wrong-answer pattern: claiming PaaS or SaaS gives the customer more responsibility — opposite direction.
- **PaaS customer doesn't patch the OS.** Provider responsibility. Wrong-answer pattern: applying IaaS responsibility model to PaaS.
- **SaaS customer doesn't patch the application.** Provider patches; customer configures. Wrong-answer pattern: claiming SaaS customer responsibility includes app patching.
- **Service model ≠ Deployment model.** Service = IaaS/PaaS/SaaS/FaaS (what's delivered). Deployment = public/private/community/hybrid (who operates). Wrong-answer pattern: confusing the two axes — they're orthogonal.
- **FaaS is post-NIST.** Not in NIST SP 800-145. Wrong-answer pattern: citing NIST SP 800-145 for FaaS — it pre-dates serverless adoption.

### Values without a direct public citation

| Cell | Value | Why unsourced |
|---|---|---|
| FaaS × all cells | — | NIST SP 800-145 [s1] predates FaaS adoption. Cell values reflect industry-consensus shared-responsibility framing for serverless from cloud-provider documentation (AWS, Azure, GCP) without a single authoritative primary source. |
| All rows × typical example | Specific products | Cloud-provider product names; not from a primary specification. Reflect well-known examples in industry documentation. |
| All rows × customer responsibility | Summary phrasings | NIST and CSA cover responsibility split conceptually; cell values are pedagogical summaries, not direct quotations. |

## Engine demo opportunities

- `IaaS | what provider manages → ?` → `Physical infrastructure`, `Virtualization`, `Networking`
- `SaaS | what provider manages → ?` → `Physical infrastructure`, `Virtualization`, `OS`, `Middleware`, `Runtime`, `Application`
- `IaaS | what customer manages → ?` → `OS`, `Middleware`, `Runtime`, `Data`, `Applications`
- `SaaS | what customer manages → ?` → `Data`, `User access configuration`
- `? | typical example → Virtual machines on AWS EC2` → `IaaS`
- `? | typical example → Web-delivered application such as Salesforce` → `SaaS`
- `? | typical example → Event-triggered function such as AWS Lambda` → `FaaS`
- `? | what customer manages → Function code` → `FaaS` (sub-Fact in multi-Fact cell)
- Composite IaaS Row with `what customer manages` swapped to `Data`, `User access configuration` (SaaS's value) — directly tests the responsibility-shrink pattern (IaaS customer manages OS upward; SaaS customer manages only data/access)
- Composite SaaS Row with `what provider manages` swapped to `Physical infrastructure`, `Virtualization`, `Networking` (IaaS's value) — tests the inverse (SaaS provider manages everything except data/access; IaaS provider only manages infrastructure)
- Composite PaaS Row with `what customer manages` swapped to `OS`, `Middleware`, `Runtime`, `Data`, `Applications` (IaaS's value) — tests PaaS-vs-IaaS boundary (PaaS customer doesn't manage OS or middleware; IaaS customer does)

## Sources

- `[s1]`: NIST SP 800-145, "The NIST Definition of Cloud Computing" — IaaS, PaaS, SaaS service models and shared responsibility framing (September 2011, retrieved 2026-04-26, https://csrc.nist.gov/publications/detail/sp/800-145/final)
- `[s2]`: NIST SP 500-292, "NIST Cloud Computing Reference Architecture" — actor and responsibility model elaboration (September 2011, retrieved 2026-04-26, https://www.nist.gov/publications/nist-cloud-computing-reference-architecture)
- `[s3]`: Cloud Security Alliance, "Cloud Controls Matrix v4" — provider/customer control responsibility allocation by cloud service model (retrieved 2026-04-26, https://cloudsecurityalliance.org/research/cloud-controls-matrix/)
- `[s4]`: (ISC)² CISSP Certification Exam Outline, effective 2024-04-15, Domain 3 §3.5 *Assess and mitigate the vulnerabilities of security architectures, designs, and solution elements* (retrieved 2026-04-26, https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline)
