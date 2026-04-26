# Confidentiality Models

**Domain:** 3 — Security Architecture and Engineering &nbsp;|&nbsp; **Pattern:** Dimensions &nbsp;|&nbsp; **Tags:** 3.2
**Status:** draft (SME review pending)

The three formal confidentiality models CISSP candidates are expected to discriminate. Bell-LaPadula is the classical military-confidentiality model with mandatory access control via labeled subjects and objects. Lattice-Based Access Control generalizes Bell-LaPadula to arbitrary partial orders of security labels. Take-Grant is a graph-based model that examines how access rights can propagate through a system over time. CISSP testing focuses on Bell-LaPadula's no-read-up / no-write-down rules.

| Model | focus | key rules | properties | weakness |
|---|---|---|---|---|
| Bell-LaPadula | Confidentiality of classified information | No read up<br>No write down [s1] | Simple security property<br>Star property<br>Tranquility property [s1] | Does not address integrity |
| Lattice-Based | Generalized confidentiality with partial-order labels | Subject can read object only if subject's label dominates object's label [s2] | Reflexive<br>Antisymmetric<br>Transitive [s2] | Complex to implement at scale |
| Take-Grant | Access-right propagation analysis | Take rule<br>Grant rule<br>Create rule<br>Remove rule [s3] | Decidable propagation analysis [s3] | Theoretical rather than deployable |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. **No parentheticals in cells.**
- **Bell-LaPadula is the canonical CISSP model.** Sibling Concept `bell-lapadula-properties` covers its specific properties in detail. The two core rules are "no read up" (subjects cannot read data classified above their clearance) and "no write down" (subjects cannot write data classified below their clearance, to prevent declassification leakage).
- **No write down is the counterintuitive rule.** Most students grasp no-read-up immediately. No-write-down is harder — why can't a Top Secret cleared user write to a Confidential document? Because that user might (intentionally or not) include Top Secret information in the Confidential write, declassifying it improperly. The rule prevents this by forbidding any write to lower-classified destinations.
- **Lattice-based generalizes Bell-LaPadula.** A lattice is a partial order with join (least upper bound) and meet (greatest lower bound) operations on every pair of elements. Security labels form a lattice when they have hierarchical levels (Confidential ≤ Secret ≤ Top Secret) plus categories (compartments like SCI, SAP). Lattice-based access control specifies that access requires the subject's label to *dominate* the object's label in the lattice ordering.
- **Take-Grant is theoretical, not implementational.** Take-Grant is used to *analyze* whether access rights can propagate to an unauthorized subject through a sequence of operations. Decidable in polynomial time for the canonical model. Practical operating systems do not implement Take-Grant directly; they implement DAC, MAC, or RBAC and use Take-Grant analysis to prove safety properties.
- **Tranquility property.** Bell-LaPadula assumes labels do not change during system operation (strong tranquility) or change only in ways that preserve security (weak tranquility). If labels can change arbitrarily, the no-read-up / no-write-down rules cannot guarantee confidentiality. Real systems usually assume strong tranquility for the duration of a session.
- **What this Concept does *not* cover.** Sibling Concept `integrity-models` covers Biba, Clark-Wilson, and Lipner. Concept `brewer-nash` covers the Chinese Wall model. Concept `other-access-models` covers Graham-Denning, HRU, Noninterference. The three confidentiality models here are CISSP-canonical; the broader set lives in sibling Concepts.
- **Out of scope for this Concept:** Bell-LaPadula state-machine formal definition, the BLP system model (subjects, objects, levels, categories), categorization vs hierarchical classification, multi-level security (MLS) implementations, real-world MLS systems (Trusted Solaris, SELinux MLS).

### Values without a direct public citation

| Cell | Notes |
|---|---|
| All rows × weakness | Phrasings | Industry-typical critiques; not directly quoted from primary model papers. |

## Engine demo opportunities

- `Bell-LaPadula | key rules → ?` → `No read up`, `No write down`
- `Bell-LaPadula | weakness → ?` → `Does not address integrity`
- `Lattice-Based | properties → ?` → `Reflexive`, `Antisymmetric`, `Transitive`
- `? | key rules → No read up` → `Bell-LaPadula` (sub-Fact in multi-Fact cell)
- `? | focus → Access-right propagation analysis` → `Take-Grant`
- `Take-Grant | key rules → ?` → `Take rule`, `Grant rule`, `Create rule`, `Remove rule`
- Composite Bell-LaPadula Row with `focus` swapped to `Access-right propagation analysis` — directly tests the BLP-vs-Take-Grant distinction (BLP is confidentiality enforcement; Take-Grant is propagation analysis)
- Composite Lattice-Based Row with `key rules` swapped to `No read up`, `No write down` — tests that lattice-based generalizes BLP (BLP is a special case where the lattice is a total order)
- Composite Bell-LaPadula Row with `weakness` swapped to `Theoretical rather than deployable` — tests that BLP is widely deployed (its weakness is integrity, not deployability)

## Sources

- `[s1]`: D. E. Bell and L. J. LaPadula, "Secure Computer Systems: Mathematical Foundations" (MITRE Technical Report 2547, March 1973) and "Secure Computer System: Unified Exposition and Multics Interpretation" (1976) — original BLP papers (retrieved 2026-04-26, https://csrc.nist.rip/publications/history/bell76.pdf)
- `[s2]`: Ravi Sandhu, "Lattice-Based Access Control Models," IEEE Computer 26 (11): 9-19 (November 1993, retrieved 2026-04-26, https://profsandhu.com/journals/computer/i93lattice%28org%29.pdf)
- `[s3]`: A. K. Jones, R. J. Lipton, and L. Snyder, "A Linear Time Algorithm for Deciding Security," Proceedings of the 17th IEEE Symposium on Foundations of Computer Science (1976) — original Take-Grant analysis (retrieved 2026-04-26, https://ieeexplore.ieee.org/document/4567855)
