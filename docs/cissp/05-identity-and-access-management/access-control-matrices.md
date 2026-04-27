# Access Control Matrices vs ACLs vs Capability Lists

**Domain:** 5 — Identity and Access Management &nbsp;|&nbsp; **Pattern:** Dimensions &nbsp;|&nbsp; **Tags:** 5.1
**Status:** draft (SME review pending)

The three foundational data structures for representing subject-to-object permissions in access control. The conceptual master is the *access control matrix* — subjects in rows, objects in columns, permissions in cells. ACLs and capability lists are projections of that matrix: ACLs slice column-wise (one list per object enumerating allowed subjects); capability lists slice row-wise (one list per subject enumerating accessible objects). CISSP testing focuses on the row-vs-column projection — given a description, identify whether it is ACL-style or capability-style.

| Structure | structure | indexed by | typical use | weakness |
|---|---|---|---|---|
| Access control matrix | 2D table of subjects × objects | Both subject and object | Conceptual reference model | Sparse and impractical to store at scale |
| ACL | List per object enumerating subject permissions | Object | File system permissions<br>Network firewall rules | Hard to revoke a subject across all objects |
| Capability list | List per subject enumerating object permissions | Subject | Capability-based OS<br>Token-based authorization | Hard to revoke an object across all subjects |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. **No parentheticals in cells.**
- **The matrix is the reference model.** Lampson 1971 introduced the access control matrix as the canonical representation of authorization state — every cell `(subject, object)` records the permissions that subject has on that object. It is rarely stored directly because most cells are empty (subjects don't have access to most objects); ACLs and capability lists are the practical projections that drop the empty cells.
- **ACL = column projection.** An ACL is "for this object, who has what permission?" Stored alongside the object. Unix file permissions (`rwx` triples for owner/group/world) are a coarse ACL; full ACLs (POSIX ACLs, NTFS ACLs, AWS S3 bucket policies) enumerate per-subject permissions. Network firewall rules are also ACL-style — "for this destination, which sources are allowed."
- **Capability list = row projection.** A capability list is "for this subject, which objects can be accessed and how?" Stored alongside the subject (or in a token the subject holds). OAuth access tokens with embedded scopes are capability-style — the token tells you what the bearer can do without needing to consult a server-side ACL. Capability-based operating systems (Hydra, KeyKOS, modern microkernels with capability primitives) make this the primary access-control representation.
- **Revocation asymmetry — the canonical exam discriminator.**
  - **ACLs:** easy to revoke a subject from a specific object (edit the ACL on that object); hard to revoke a subject across *all* objects (must visit every object's ACL).
  - **Capability lists:** easy to revoke a subject's access entirely (revoke the capability token); hard to revoke a specific object across all subjects (must find every subject holding a capability for it).
- **OAuth scopes vs RBAC roles vs ACLs.** Modern systems mix all three. RBAC roles are coarse-grained authorization at the role level; OAuth scopes are capability-style tokens granting specific actions; ACLs are object-level enforcement when granular control is needed. CISSP framing uses the matrix/ACL/capability distinction at the conceptual level; production systems blend them.
- **Out of scope for this Concept:** specific ACL formats (POSIX, NTFS, S3 IAM policies), capability-based OS specifics, OAuth scope design, RBAC role hierarchies (covered in D5 `access-control-models`), Bell-LaPadula matrix interpretation, take-grant model.

### Tricky distractors

- **ACL = column-indexed; Capability = row-indexed.** ACL stored with object; capability stored with subject. Wrong-answer pattern: confusing the projection direction.
- **Revocation asymmetry.** ACL: easy to revoke per-object; hard to revoke across all objects. Capability: easy to revoke subject entirely; hard to revoke a specific object across all subjects. Wrong-answer pattern: claiming both have the same revocation properties.
- **OAuth tokens are capabilities.** Token-bearer can act per scopes; no per-request lookup. Wrong-answer pattern: claiming OAuth tokens are ACLs — they're capability-style.
- **Unix permissions are ACL-like.** `rwx` triples per file. Wrong-answer pattern: classifying Unix permissions as a capability list — they're stored with the object (file).
- **Matrix is reference model, not storage.** Most cells empty; impractical to store directly. Wrong-answer pattern: claiming production systems literally store the matrix — they store its projections.
- **Network firewall rules are ACL-style.** Per-destination subject-allow lists. Wrong-answer pattern: classifying firewall rules as capabilities — they're object-indexed.

### Values without a direct public citation

| Cell | Value | Why unsourced |
|---|---|---|
| All rows × structure | Structure descriptions | Computer-science textbook framings (Lampson 1971, Saltzer & Schroeder 1975); not directly fetched primary-source in this research pass. |
| All rows × typical use | Use-case lists | Industry-typical examples; widely taught but not from a single primary source. |
| All rows × weakness | Weakness descriptions | Standard CISSP teaching of the revocation asymmetry; pedagogical synthesis. |

## Engine demo opportunities

- `ACL | indexed by → ?` → `Object`
- `Capability list | indexed by → ?` → `Subject`
- `Access control matrix | indexed by → ?` → `Both subject and object`
- `? | indexed by → Object` → `ACL`
- `? | indexed by → Subject` → `Capability list`
- `ACL | weakness → ?` → `Hard to revoke a subject across all objects`
- `Capability list | weakness → ?` → `Hard to revoke an object across all subjects`
- `? | typical use → File system permissions` → `ACL` (sub-Fact in multi-Fact cell)
- Composite ACL Row with `indexed by` swapped to `Subject` — directly tests the ACL/capability projection direction (ACLs are object-indexed; capabilities are subject-indexed)
- Composite Capability list Row with `weakness` swapped to `Hard to revoke a subject across all objects` — tests the revocation asymmetry (capabilities ease subject revocation; ACLs ease object-level revocation)
- Composite Access control matrix Row with `typical use` swapped to `File system permissions` — tests that the full matrix is a *reference model*, not a deployment pattern (ACLs are how file systems actually represent it)

## Sources

- `[s1]`: NIST SP 800-162, "Guide to Attribute Based Access Control (ABAC) Definition and Considerations" — frames ACLs and RBAC as projections of the broader access decision space, related to the matrix model (January 2014, retrieved 2026-04-26, https://csrc.nist.gov/pubs/sp/800/162/upd2/final)
- `[s2]`: Butler Lampson, "Protection," Proceedings of the 5th Princeton Conference on Information Sciences and Systems (March 1971) — original access control matrix formulation (retrieved 2026-04-26, https://www.microsoft.com/en-us/research/publication/protection/)
