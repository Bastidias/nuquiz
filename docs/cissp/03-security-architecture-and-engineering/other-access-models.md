# Other Access Models

**Domain:** 3 — Security Architecture and Engineering &nbsp;|&nbsp; **Pattern:** Dimensions &nbsp;|&nbsp; **Tags:** 3.2
**Status:** draft (SME review pending)

The three additional access-control models CISSP candidates may encounter beyond Bell-LaPadula, Biba, Clark-Wilson, and Brewer-Nash. Graham-Denning defines fundamental access-control primitives. HRU (Harrison-Ruzzo-Ullman) extends Graham-Denning and proves the safety problem is undecidable in general. Noninterference (Goguen-Meseguer) is an information-flow model rather than an access-control model — it specifies that high-classification subjects' actions should be undetectable to low-classification subjects.

| Model | focus | key concept | example |
|---|---|---|---|
| Graham-Denning | Fundamental access-control primitives | Eight primitive operations on subjects, objects, rights | Create object<br>Delete object<br>Grant right |
| HRU | Safety analysis of access control matrices | Safety problem is undecidable in general | Determining whether a right could leak in arbitrary system |
| Noninterference | Information-flow protection | High-classification actions must not affect low-classification observations | Top Secret subject's keystrokes cannot be timed by Confidential subject |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. **No parentheticals in cells.**
- **Graham-Denning eight primitives.** The model defines eight fundamental operations: create object, create subject, delete object, delete subject, read access right, grant access right, transfer access right, delete access right. Any access-control system can be analyzed in terms of these primitives. Modern systems (Unix, Windows, role-based systems) implement specific subsets and constraints.
- **HRU's safety theorem.** Harrison, Ruzzo, and Ullman extended Graham-Denning to a more general access-control framework and proved that the *safety problem* (can a particular right ever leak to a subject who shouldn't have it?) is undecidable in general — no algorithm can answer it for arbitrary systems. This is a famous theoretical result with practical implications: security analyses can only be done for *constrained* systems where decidability is preserved.
- **Noninterference is about information flow, not access.** A subject "interferes" with another if its actions affect what the other can observe. Noninterference policies require that high-classification subjects' actions be invisible to low-classification subjects — including via *covert channels* (timing, resource availability, cache state). Noninterference is much stronger than Bell-LaPadula because it covers indirect information flow that BLP's read/write rules don't catch.
- **Sibling Concept link.** `covert-channel-types` covers the storage / timing covert channels that violate noninterference. Noninterference is the formal model that tells you why covert channels matter — they break the property.
- **Why these aren't on the main confidentiality / integrity Concepts.** Bell-LaPadula, Biba, Clark-Wilson, and Brewer-Nash are widely deployed CISSP-canonical models. Graham-Denning, HRU, and Noninterference are more theoretical — they show up in academic security literature and in formal-verification contexts but are rarely directly implemented as access-control mechanisms in production systems.
- **CISSP exam coverage.** These models appear less frequently than the four core ones but may be asked at the *recognition* level — "which of these is an access-right propagation analysis model" → Graham-Denning or HRU. "Which model addresses covert channels" → Noninterference.
- **Out of scope for this Concept:** Goguen-Meseguer formal definition, Sutherland's information flow model, security policy verification techniques, formal-methods application to access control, type-based information flow (e.g., Jif language).

### Tricky distractors

- **HRU safety problem is undecidable.** Famous theoretical result. Wrong-answer pattern: claiming safety can be algorithmically determined for arbitrary systems — only constrained systems are decidable.
- **Noninterference is information-flow, not access control.** Different policy class. Wrong-answer pattern: classifying noninterference alongside BLP/Biba — different abstraction.
- **Noninterference catches covert channels.** Stronger than BLP. Wrong-answer pattern: claiming BLP rules cover all info flow — covert channels evade BLP but violate noninterference.
- **Graham-Denning has 8 primitives.** Foundational ops. Wrong-answer pattern: confusing primitive count or scope.
- **HRU extends Graham-Denning.** Builds on it. Wrong-answer pattern: claiming HRU is independent — directly extends Graham-Denning's framework.
- **These models are theoretical.** Less common in production than BLP/Biba. Wrong-answer pattern: claiming Graham-Denning is widely deployed — it informs formal analysis, not implementation.

### Values without a direct public citation

| Cell | Notes |
|---|---|
| All rows × example | Examples are illustrative; primary papers describe the models without canonical exam-ready examples. |

## Engine demo opportunities

- `Graham-Denning | focus → ?` → `Fundamental access-control primitives`
- `HRU | key concept → ?` → `Safety problem is undecidable in general`
- `Noninterference | focus → ?` → `Information-flow protection`
- `? | key concept → Eight primitive operations on subjects, objects, rights` → `Graham-Denning`
- `? | key concept → High-classification actions must not affect low-classification observations` → `Noninterference`
- Composite Graham-Denning Row with `key concept` swapped to `Safety problem is undecidable in general` — directly tests the Graham-Denning vs HRU distinction (Graham-Denning defines primitives; HRU proves safety undecidability)
- Composite HRU Row with `focus` swapped to `Information-flow protection` — tests the HRU-vs-Noninterference distinction (HRU is access-matrix safety; Noninterference is information-flow policy)
- Composite Noninterference Row with `key concept` swapped to `Eight primitive operations on subjects, objects, rights` — tests the noninterference-vs-Graham-Denning distinction

## Sources

- `[s1]`: G. Scott Graham and Peter J. Denning, "Protection — Principles and Practice," AFIPS Spring Joint Computer Conference (1972) — original Graham-Denning model (retrieved 2026-04-26, https://denninginstitute.com/pjd/PUBS/Protection.pdf)
- `[s2]`: Michael A. Harrison, Walter L. Ruzzo, and Jeffrey D. Ullman, "Protection in Operating Systems," Communications of the ACM 19 (8): 461-471 (August 1976) — HRU safety theorem (retrieved 2026-04-26, https://dl.acm.org/doi/10.1145/360303.360333)
- `[s3]`: Joseph A. Goguen and José Meseguer, "Security Policies and Security Models," Proceedings of the 1982 IEEE Symposium on Security and Privacy — original noninterference paper (retrieved 2026-04-26, https://ieeexplore.ieee.org/document/6234468)
