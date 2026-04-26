# Cloud Data Residency Models

**Domain:** 2 — Asset Security &nbsp;|&nbsp; **Pattern:** Dimensions &nbsp;|&nbsp; **Tags:** 2.6
**Status:** draft (SME review pending)

The four deployment models for data residency, from public cloud (lowest control, highest scale) to on-premises (highest control, lowest scale). Each pairs *data location guarantees* with *regulatory fit*, *cost*, and *control*. The CISSP exam tests both the categorization and the regulatory matchup — particularly when GDPR's Schrems II decision pushes EU-resident data toward sovereign-cloud or on-premises deployments.

| model | data location guarantees | regulatory fit | cost | control |
|---|---|---|---|---|
| Public cloud | Provider chooses region from contract options [s1] | Acceptable for most non-regulated workloads [s1] | Lowest at scale [s1] | Limited to provider-exposed controls [s1] |
| Private cloud | Single-tenant infrastructure with dedicated location [s1] | Acceptable for moderately regulated workloads [s1] | High due to dedication [s1] | Customer controls infrastructure [s1] |
| Sovereign cloud | Provider operated by national entity within national borders [s2] | Required for some EU public-sector workloads [s2] | Highest of cloud options [s2] | Customer controls plus national jurisdiction [s2] |
| On-premises | Customer operates in customer-owned facility [s1] | Acceptable for highest-sensitivity workloads [s1] | Highest capital cost [s1] | Full customer control [s1] |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. No parentheticals in cells.
- **Tag 2.6 retained from stub.** Maps to (ISC)² 2024 outline §2.6 *Determine data security controls and compliance requirements*. Sibling Concept: `data-sovereignty.md` (the legal-sovereignty angle).
- **Public cloud data location is contractual, not physical.** Public clouds let customers select region for storage but the provider still operates the underlying infrastructure. Some workloads (e.g., training ML models) may temporarily route data through other regions for processing. Read the SLA carefully.
- **Sovereign cloud is the GDPR-Schrems-II response.** After the Schrems II ruling (2020) invalidated the EU-US Privacy Shield, EU public-sector and regulated workloads needed deployment options where the cloud operator was *legally* immune to extra-EU government-data-access requests. Sovereign cloud (e.g., AWS European Sovereign Cloud, Microsoft Cloud for Sovereignty, Google Cloud Sovereign Solutions) emerged as the answer — operated by EU entities, staffed by EU-resident personnel, located in EU data centers, and isolated from non-EU corporate operations.
- **Private cloud is not a synonym for on-premises.** Private cloud means single-tenant infrastructure but the operator may be a third party. A private cloud hosted in a colocation facility operated by a managed-service provider is still private cloud (single tenant) but not on-premises (customer doesn't operate the facility).
- **Cost rises as control rises.** The trade-off ladder: public cloud delivers lowest unit cost via shared infrastructure; private cloud trades cost for tenancy isolation; sovereign cloud trades more cost for jurisdictional guarantees; on-premises trades the most cost for full control. Most large organizations run all four for different workloads.
- **The cloud responsibility-shift.** Across the four models, the boundary of customer responsibility shifts. Public cloud: provider responsible for infrastructure, customer responsible for application/data. On-premises: customer responsible for everything. Sovereign and private cloud sit between. The Shared Responsibility Model documents the boundaries; the customer's compliance posture depends on understanding them.
- **What is intentionally not on this table.** Hybrid cloud, multicloud, and community cloud are deployment topologies that combine the four base models; they could be added in a future revision. Edge / fog computing is a deployment-architecture model with data-residency implications but lives in network architecture rather than asset security.
- **Gaps marked `[needs source]`:** none — all Facts trace to NIST cloud computing definitions and EU sovereign-cloud guidance.

## Engine demo opportunities

- `? | data location guarantees → Provider chooses region from contract options` → Public cloud
- `Sovereign cloud | regulatory fit → ?` → `Required for some EU public-sector workloads`
- `? | control → Full customer control` → On-premises
- `Private cloud | cost → ?` → `High due to dedication`
- `Public cloud | regulatory fit → ?` with `Required for some EU public-sector workloads` (Sovereign) and `Acceptable for highest-sensitivity workloads` (On-premises) as distractors
- Composite Row profile: Public cloud across all Columns with `control` swapped to `Full customer control` (On-premises' value)

## Sources

- `[s1]`: NIST SP 800-145 *The NIST Definition of Cloud Computing*, September 2011 — public, private, community, hybrid deployment models (retrieved 2026-04-26, https://csrc.nist.gov/pubs/sp/800/145/final)
- `[s2]`: ENISA / EU Commission *Sovereign cloud* requirements emerging from Schrems II (Case C-311/18) (retrieved 2026-04-26, https://www.enisa.europa.eu/topics/cloud-and-big-data)
- `[s3]`: (ISC)² CISSP Certification Exam Outline, effective 2024-04-15, Domain 2 §2.6 (retrieved 2026-04-26, https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline)
