# Access Control Models

**Domain:** 5 — Identity and Access Management &nbsp;|&nbsp; **Pattern:** Dimensions &nbsp;|&nbsp; **Tags:** 5.4
**Status:** draft (SME review pending)

The five canonical access control models CISSP candidates are expected to discriminate: DAC (owner-directed), MAC (policy-directed by classification), RBAC (permission assignment by role), ABAC (policy evaluation over attributes), and RuBAC (rule evaluation independent of identity). Testing focuses on *who decides access*, *what the decision is based on*, and the archetypal deployment (commercial OS → DAC, classified / Bell-LaPadula → MAC, enterprise apps → RBAC, firewalls → RuBAC, federated / cross-org → ABAC).

| Model | who decides | basis for decision | granularity | typical use | key weakness |
|---|---|---|---|---|---|
| DAC | Data owner | Identity [s1] | Per-object ACL | Commercial file systems | Owner can transfer rights |
| MAC | System policy | Security label | Clearance to classification match | Classified environments | Inflexible<br>Complex administration |
| RBAC | Administrator | Role [s1] | Role-to-permission mapping | Enterprise applications | Role explosion<br>Static role assignments |
| ABAC | Policy engine [s1] | Attributes [s1] | Boolean attribute policy [s1] | Federated access<br>Cross-organization access | Policy complexity<br>Attribute infrastructure required |
| RuBAC | Rule set | Rules | Rule match | Firewalls<br>Network ACLs | Rule explosion |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. **No parentheticals in cells.** Examples stripped from cells (Windows/Unix for DAC, Bell-LaPadula for MAC) live in the Notes below.
- **NIST SP 800-162 framing.** The ABAC Guide [s1] treats ACLs and RBAC as "special cases of ABAC in terms of the attributes used" — ACLs use the identity attribute and RBAC uses the role attribute, while ABAC generalizes to arbitrary attribute sets with Boolean policy evaluation. This unifying view is increasingly reflected on the exam.
- **DAC deployment examples.** Unix file permissions (`rwx` per owner/group/world) and Windows NTFS ACLs are the canonical DAC systems. The key property is that the *owner* of an object decides who else can access it — which is also the security weakness, because an owner with malicious intent (or compromised credentials) can re-share any object arbitrarily.
- **MAC deployment examples.** Bell-LaPadula and Biba are the classical MAC models (Bell-LaPadula for confidentiality, Biba for integrity). SELinux and AppArmor implement MAC on Linux; classified government systems (SIPRNet, JWICS) are the canonical MAC deployments. The key property is that the *system* (not the user) enforces access based on subject clearance and object classification — users cannot override the policy.
- **RBAC hierarchy.** NIST's RBAC reference model (INCITS 359) defines four levels: Flat RBAC (users assigned to roles, roles assigned permissions), Hierarchical RBAC (roles inherit from other roles), Constrained RBAC (separation-of-duties constraints), and Symmetric RBAC (permission review). CISSP rarely tests the four-level hierarchy; the core concept is "permissions attach to roles, users get roles."
- **ABAC's four attribute categories.** NIST SP 800-162 [s1] organizes ABAC attributes into: Subject attributes (user role, clearance, department), Object attributes (classification, owner, type), Operation attributes (read, write, delete), and Environment attributes (time of day, location, IP address). The key distinguisher from RBAC is that ABAC can express "allow read if subject.clearance ≥ object.classification AND environment.time in business hours" without pre-defining a role for every attribute combination.
- **RuBAC vs ABAC.** RuBAC decisions are based on rules independent of identity — the classical example is a firewall allowing TCP 443 outbound regardless of which user originated the connection. ABAC decisions are based on attributes that typically include identity attributes (role, clearance, department). In modern literature the distinction is blurring (policy engines in XACML can express both), but CISSP continues to treat them as distinct models.
- **"Who decides access."** This column captures the locus of the access decision — the actor who sets the policy that a given request is evaluated against. It is not "who enforces access" (the reference monitor is always the enforcement point in every model).
- **Out of scope for this Concept:** Bell-LaPadula and Biba specifics (deserves its own Concept — `bell-lapadula-biba.md`), Clark-Wilson and Brewer-Nash, reference monitor internals, TCB and security kernel, TCSEC / Common Criteria assurance levels, XACML and OAuth scopes as policy-expression languages.

### Values without a direct public citation

Most cells in this table are drawn from standard CISSP pedagogical framing rather than a traced public citation. NIST SP 800-162 [s1] directly sources the ABAC cells and the identity/role attribute-basis cells for DAC and RBAC, but the remaining cells — who-decides, typical-use, key-weakness — reflect widely-accepted CISSP teaching without a single authoritative quote located in this research pass. These should be validated by an SME or backed with primary references (TCSEC "Orange Book" for MAC/DAC, INCITS 359 for RBAC) before the Concept is treated as reference-grade.

| Column | Models affected | Notes |
|---|---|---|
| who decides | DAC, MAC, RBAC, RuBAC | NIST SP 800-162 discusses the mechanisms but does not frame the comparison as "who decides." |
| granularity | DAC, MAC, RBAC, RuBAC | CISSP-pedagogical summary of each model's decision granularity. |
| typical use | All five | Industry convention. Bell-LaPadula/classified for MAC, Windows/Unix for DAC, enterprise applications for RBAC, firewalls/ACLs for RuBAC, federated for ABAC. |
| key weakness | All five | Canonical CISSP study-guide framings. Role explosion, rule explosion, MAC inflexibility are widely taught but no single canonical NIST citation located. |

## Engine demo opportunities

- `DAC | who decides → ?` → `Data owner`
- `MAC | who decides → ?` → `System policy`
- `ABAC | basis for decision → ?` → `Attributes`
- `RBAC | basis for decision → ?` → `Role`
- `RuBAC | typical use → ?` → `Firewalls`, `Network ACLs`
- `? | key weakness → Role explosion` → `RBAC`
- `? | key weakness → Rule explosion` → `RuBAC` — tests the RBAC/RuBAC confusion directly (both have "-explosion" weaknesses)
- `? | typical use → Classified environments` → `MAC`
- Composite DAC Row with `who decides` swapped to `System policy` — tests the DAC/MAC polarity (DAC = owner-decides; MAC = system-decides, owner cannot override)
- Composite ABAC Row with `basis for decision` swapped to `Role` — tests the RBAC/ABAC confusion (RBAC uses roles; ABAC uses arbitrary attributes of which role is one)
- Composite MAC Row with `key weakness` swapped to `Role explosion` — tests that "role explosion" is an RBAC weakness specifically

## Sources

- `[s1]`: NIST SP 800-162, "Guide to Attribute Based Access Control (ABAC) Definition and Considerations" (January 2014, updated August 2019, retrieved 2026-04-19, https://csrc.nist.gov/pubs/sp/800/162/upd2/final)
- `[s2]`: NIST SP 800-53 Rev 5, "Security and Privacy Controls for Information Systems and Organizations" — AC (Access Control) control family, general reference (September 2020 baseline, retrieved 2026-04-19, https://csrc.nist.gov/publications/detail/sp/800-53/rev-5/final)
- `[s3]`: NIST SP 800-178, "A Comparison of Attribute Based Access Control (ABAC) Standards for Data Service Applications" — secondary ABAC reference (October 2016, retrieved 2026-04-19, https://nvlpubs.nist.gov/nistpubs/specialpublications/nist.sp.800-178.pdf)
