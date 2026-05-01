# Cloud Shared Responsibility Model

**Domain:** 3 — Security Architecture and Engineering &nbsp;|&nbsp; **Pattern:** Aspects &nbsp;|&nbsp; **Tags:** 3.5

**Status:** draft (SME review pending)

The Shared Responsibility Model is the contract framework dividing security obligations between cloud service provider (CSP) and cloud service customer (CSC). Sibling Concept `cloud-service-models` covers the IaaS / PaaS / SaaS / FaaS axis (where the *boundary* sits per model); this Concept covers the *invariants* — the functions that stay with the customer or stay with the provider regardless of model, the principles behind the split, and the common framing failures. CISSP testing rewards both axes — knowing which boundary each model sets *and* knowing what never transfers across the boundary.

| aspect | content |
|---|---|
| principle | Provider responsible for security *of* the cloud<br>Customer responsible for security *in* the cloud [s1] |
| always-customer responsibilities | Data classification [s2]<br>Access control configuration [s2]<br>Identity governance [s2]<br>Regulatory compliance for processed data [s2]<br>Customer-side incident response [s2] |
| always-provider responsibilities | Physical security of data centers [s2]<br>Hypervisor security [s2]<br>Underlying network infrastructure [s2]<br>Hardware patching [s2] |
| shifting boundary | OS patching [s2]<br>Middleware security [s2]<br>Runtime patching [s2]<br>Application patching [s2] |
| typical misconception | Cloud means provider owns all security responsibility [needs source] |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. **No parentheticals in cells.** Acronym expansions live in this section.
- **Acronym expansions.** `CSP` = Cloud Service Provider. `CSC` = Cloud Service Customer. `SRM` = Shared Responsibility Model. `SLA` = Service Level Agreement. `MSA` = Master Services Agreement.
- **"Of vs In" is the canonical AWS phrasing.** AWS popularized the formulation: provider is responsible for security *of* the cloud (the underlying infrastructure that runs cloud services); customer is responsible for security *in* the cloud (everything the customer puts on top — data, configuration, code, access). Microsoft and Google use slightly different phrasings but the principle is the same. CISSP framing aligns with the AWS form.
- **Data and access never transfer.** Across IaaS, PaaS, SaaS, and FaaS, the customer remains responsible for: classifying their own data, configuring who has access to it, governing identities and credentials within the customer-controlled identity store (or the federated provider IDP), meeting regulatory obligations for the data (GDPR controllership, HIPAA covered-entity status, PCI scope), and responding to incidents that affect customer data. "Cloud" does not transfer GDPR controllership.
- **Provider-side invariants.** The provider always owns physical data center security (badge access, environmental controls, power), hypervisor and host-OS security (the layer below customer workloads), the underlying network fabric (provider backbone, region-to-region links), and hardware refresh/patching. Customer compromise does not extend to these layers (in normal operation); provider compromise potentially affects all customers.
- **The shifting boundary is the IaaS/PaaS/SaaS/FaaS axis.** OS patching is customer responsibility in IaaS, provider in PaaS/SaaS/FaaS. Middleware patching is customer in IaaS, provider in PaaS+. Application patching is customer in IaaS/PaaS, provider in SaaS+. Sibling Concept `cloud-service-models` enumerates the per-model split.
- **Common misconception: "the provider patches everything."** Customers routinely under-invest in cloud security on the assumption that the provider handles it. Misconfigured S3 buckets, exposed Kubernetes API servers, public Cosmos DB instances, and over-permissive IAM policies are customer-side failures the provider cannot fix because they're configuration choices the customer made. Industry incident data consistently shows customer misconfiguration as the dominant cloud-breach root cause.
- **Compliance is not transferable.** A customer subject to PCI DSS retains PCI scope when they put cardholder data in a cloud. The CSP may be a "service provider" under PCI DSS terminology and provide an Attestation of Compliance (AoC), but the customer is still the merchant on the hook for their own scope. GDPR is similar — Controller obligations stay with the customer; the CSP is a Processor under Article 28 and obligations are split via the Data Processing Agreement.
- **CASB and SSPM extend customer-side enforcement.** Cloud Access Security Brokers (CASB) inspect cloud-traffic and enforce policy at egress. SaaS Security Posture Management (SSPM) tools audit SaaS configuration against security baselines. Both exist because SaaS shared-responsibility leaves data governance with the customer but the application controls with the provider — CASB and SSPM bridge that gap from the customer side.
- **Cross-Concept link.** Sibling Concept `cloud-service-models` covers the per-model boundary detail. `cloud-data-residency-models` covers public/private/community/hybrid/sovereign deployment models. `data-sovereignty` covers the legal-jurisdiction layer. `data-roles` in D2 covers Controller-vs-Processor allocation that maps onto SRM.
- **Out of scope for this Concept:** specific CSP responsibility matrices (AWS Shared Responsibility Model page, Azure shared-responsibility infographic, Google shared-responsibility paper), Cloud Security Alliance Cloud Controls Matrix per-control allocation, FedRAMP control inheritance model, hyperscaler-specific terminology variants, multi-cloud responsibility-stitching across providers, MSP-managed cloud where a third party operates customer responsibilities under contract.

### Tricky distractors

- **Provider does NOT own data security.** Customer always owns. Wrong-answer pattern: claiming "the cloud provider is responsible for our data" — the customer Controller is responsible.
- **Compliance follows the data, not the infrastructure.** Customer keeps regulatory obligations. Wrong-answer pattern: claiming SaaS subscription transfers PCI obligations to the SaaS provider — the customer remains the merchant.
- **"Of" vs "In" matters.** Provider = security of the cloud. Customer = security in the cloud. Wrong-answer pattern: collapsing the two — they're complementary halves of one model.
- **Misconfiguration is the customer's responsibility.** Provider can't fix customer-side IAM mistakes. Wrong-answer pattern: blaming the provider for an exposed S3 bucket — bucket policy is customer-configured.
- **Identity governance stays with customer.** Even in SaaS. Wrong-answer pattern: claiming SaaS provider manages user provisioning — provider provides the API, customer manages who gets access.
- **CASB/SSPM exist because SRM leaves gaps.** Customer-side enforcement of SaaS data policy. Wrong-answer pattern: claiming SaaS-only environments have no need for additional controls — CASB/SSPM exist precisely to address SaaS visibility gaps.

### Values without a direct public citation

| Cell | Value | Why unsourced |
|---|---|---|
| typical misconception | `Cloud means provider owns all security responsibility` | Industry-consensus framing of the most common SRM misunderstanding; not directly quoted from a NIST or CSP primary publication. |

## Engine demo opportunities

- `? | content → Data classification` → `always-customer responsibilities` (sub-Fact in multi-Fact cell)
- `? | content → Physical security of data centers` → `always-provider responsibilities` (sub-Fact in multi-Fact cell)
- `? | content → OS patching` → `shifting boundary`
- `principle | content → ?` → `Provider responsible for security of the cloud`, `Customer responsible for security in the cloud`
- `always-customer responsibilities | content → ?` → `Data classification`, `Access control configuration`, `Identity governance`, `Regulatory compliance for processed data`, `Customer-side incident response`
- `always-provider responsibilities | content → ?` → `Physical security of data centers`, `Hypervisor security`, `Underlying network infrastructure`, `Hardware patching`
- Composite swap: `always-customer responsibilities` content swapped to `Hypervisor security` — directly tests the customer-vs-provider invariant (hypervisor is always provider; customer never owns hypervisor)
- Composite swap: `always-provider responsibilities` content swapped to `Data classification` — tests the inverse (data classification is always customer; never transfers)
- Composite swap: `principle` content swapped to `Provider responsible for security in the cloud`, `Customer responsible for security of the cloud` — tests the "of vs in" canonical formulation polarity

## Sources

- `[s1]`: AWS, "Shared Responsibility Model" — canonical "security of the cloud / security in the cloud" formulation (retrieved 2026-04-30, https://aws.amazon.com/compliance/shared-responsibility-model/). Microsoft, "Shared responsibility in the cloud" (retrieved 2026-04-30, https://learn.microsoft.com/en-us/azure/security/fundamentals/shared-responsibility). Google Cloud, "Shared responsibilities and shared fate on Google Cloud" (retrieved 2026-04-30, https://cloud.google.com/architecture/framework/security/shared-responsibility-shared-fate)
- `[s2]`: NIST SP 500-292, "NIST Cloud Computing Reference Architecture" — actor and responsibility allocation between CSP and CSC (September 2011, retrieved 2026-04-30, https://www.nist.gov/publications/nist-cloud-computing-reference-architecture). Cloud Security Alliance, "Cloud Controls Matrix v4" — per-control responsibility allocation (retrieved 2026-04-30, https://cloudsecurityalliance.org/research/cloud-controls-matrix/)
- `[s3]`: (ISC)² CISSP Certification Exam Outline, effective 2024-04-15, Domain 3 §3.5 *Assess and mitigate the vulnerabilities of security architectures, designs, and solution elements* (retrieved 2026-04-30, https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline)
