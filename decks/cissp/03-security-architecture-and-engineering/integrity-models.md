# Integrity Models

**Domain:** 3 — Security Architecture and Engineering &nbsp;|&nbsp; **Pattern:** Dimensions &nbsp;|&nbsp; **Tags:** 3.2
**Status:** draft (SME review pending)

The three formal integrity models CISSP candidates are expected to discriminate. Biba is the integrity counterpart to Bell-LaPadula. Clark-Wilson is the commercial-integrity model with well-formed transactions and separation of duties. Lipner combines Bell-LaPadula and Biba for systems that need both confidentiality and integrity. CISSP testing focuses on Biba's no-read-down / no-write-up rules and Clark-Wilson's transaction-based integrity.

| Model | focus | key rules | properties | weakness |
|---|---|---|---|---|
| Biba | Integrity of classified information | No read down<br>No write up [s1] | Simple integrity property<br>Star integrity property<br>Invocation property [s1] | Does not address confidentiality |
| Clark-Wilson | Commercial integrity through well-formed transactions | Subjects access data only via certified transformation procedures [s2] | Constrained Data Items<br>Transformation Procedures<br>Integrity Verification Procedures<br>Separation of Duties [s2] | Complex implementation |
| Lipner | Combined confidentiality and integrity | Bell-LaPadula plus Biba labels per object [s3] | Both confidentiality and integrity labels on subjects and objects [s3] | Significant labeling overhead |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. **No parentheticals in cells.**
- **Biba is BLP inverted.** Same model structure as Bell-LaPadula but with the read/write rules reversed because integrity protection has the opposite directionality. Sibling Concept `biba-properties` covers Biba's specific properties in detail.
- **Clark-Wilson uses transformation procedures, not direct access.** In CW, subjects do not directly read or write data items — they invoke *Transformation Procedures* (TPs) that operate on *Constrained Data Items* (CDIs). The TPs are certified to preserve integrity invariants. *Integrity Verification Procedures* (IVPs) periodically check that CDIs remain in valid states. This is the architectural pattern behind ATM systems, financial software, and other integrity-critical commercial environments.
- **Clark-Wilson is the commercial-integrity model.** Bell-LaPadula was designed for military classified-information systems; Biba addressed the integrity gap but used the same MAC label structure. Clark-Wilson stepped away from labels entirely and modeled integrity as *transaction correctness* — an approach better suited to commercial systems where data integrity matters but confidentiality classifications don't apply.
- **Lipner combines BLP and Biba.** Lipner showed how to use both Bell-LaPadula (for confidentiality) and Biba (for integrity) labels on every subject and object in a single system. The cost is significant labeling overhead — every subject and object has two label sets to maintain — but the result is a system enforcing both properties simultaneously.
- **Cross-Concept link.** Sibling Concept `biba-properties` covers Biba's three properties; sibling `confidentiality-models` covers Bell-LaPadula and the broader confidentiality model set. This Concept rolls up all three integrity models for cross-comparison.
- **Out of scope for this Concept:** Goguen-Meseguer (noninterference, covered in `other-access-models`), Sutherland's information flow model, formal verification of Clark-Wilson certifications, real-world implementation patterns of integrity models.

### Tricky distractors

- **Biba vs Bell-LaPadula directionality.** BLP: no read up, no write down (confidentiality). Biba: no read down, no write up (integrity). Wrong-answer pattern: applying BLP rules to Biba — they're inverted.
- **Clark-Wilson uses TPs, not direct access.** Subjects → TPs → CDIs. Wrong-answer pattern: claiming subjects directly read/write CDIs in CW — they invoke certified procedures.
- **Clark-Wilson is commercial; Biba is classified.** CW models commercial integrity via transactions; Biba uses MAC labels like BLP. Wrong-answer pattern: confusing model lineage — Biba is military-style, CW is commercial-style.
- **Lipner combines BLP + Biba.** Both label sets on every subject/object. Wrong-answer pattern: claiming Lipner is a third independent model — it composes the other two.
- **Biba doesn't address confidentiality.** It's integrity-only. Wrong-answer pattern: claiming Biba protects secret data confidentiality — it protects against unauthorized modification, not unauthorized read.
- **Separation of Duties is core to Clark-Wilson.** No single user can complete a sensitive transaction. Wrong-answer pattern: omitting SoD when listing CW properties.

### Values without a direct public citation

| Cell | Notes |
|---|---|
| All rows × weakness | Phrasings | Industry-typical critiques; not directly quoted from primary model papers. |

## Engine demo opportunities

- `Biba | key rules → ?` → `No read down`, `No write up`
- `Clark-Wilson | properties → ?` → `Constrained Data Items`, `Transformation Procedures`, `Integrity Verification Procedures`, `Separation of Duties`
- `Lipner | focus → ?` → `Combined confidentiality and integrity`
- `? | key rules → No read down` → `Biba` (sub-Fact in multi-Fact cell)
- `? | focus → Commercial integrity through well-formed transactions` → `Clark-Wilson`
- Composite Biba Row with `key rules` swapped to `No read up`, `No write down` — directly tests the Biba-vs-BLP polarity (BLP is no-read-up; Biba is no-read-down)
- Composite Clark-Wilson Row with `weakness` swapped to `Does not address confidentiality` — tests model-specific weaknesses (CW's complexity is its weakness, not the lack-of-confidentiality that Biba shares with BLP)
- Composite Lipner Row with `focus` swapped to `Integrity of classified information` — tests Lipner-vs-Biba (Lipner combines both; Biba is integrity-only)

## Sources

- `[s1]`: Kenneth J. Biba, "Integrity Considerations for Secure Computer Systems" (MITRE Technical Report MTR-3153, April 1977) — original Biba integrity model (retrieved 2026-04-26, https://csrc.nist.rip/publications/history/biba75.pdf)
- `[s2]`: David D. Clark and David R. Wilson, "A Comparison of Commercial and Military Computer Security Policies," Proceedings of the 1987 IEEE Symposium on Security and Privacy — original Clark-Wilson model (retrieved 2026-04-26, https://ieeexplore.ieee.org/document/6234890)
- `[s3]`: Steven B. Lipner, "Non-Discretionary Controls for Commercial Applications," Proceedings of the 1982 IEEE Symposium on Security and Privacy (retrieved 2026-04-26, https://ieeexplore.ieee.org/document/6234795)
