# Reference Monitor Properties

**Domain:** 3 — Security Architecture and Engineering &nbsp;|&nbsp; **Pattern:** Aspects &nbsp;|&nbsp; **Tags:** 3.3
**Status:** draft (SME review pending)

The reference monitor is the abstract concept at the center of every formal access-control system. It is the component that mediates *all* access between subjects and objects per the security policy. Anderson's 1972 report [s1] specified three properties any reference monitor implementation must satisfy. CISSP testing focuses on these three properties — tamper-proof, always-invoked, verifiable — as the canonical requirements.

| Concept | tamper-proof requirement | always-invoked requirement | verifiable requirement | role |
|---|---|---|---|---|
| Reference Monitor | Cannot be modified by unauthorized subjects [s1] | Mediates every access attempt without exception [s1] | Small enough to be subjected to formal verification [s1] | Enforces access-control policy between subjects and objects |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. **No parentheticals in cells.**
- **Anderson's 1972 report.** James P. Anderson's "Computer Security Technology Planning Study" [s1] introduced the reference monitor concept and specified that any practical implementation must be *tamper-proof, always-invoked, and verifiable* — sometimes called the "three NEAT properties" or "three principles." Every modern access-control implementation traces back to this concept.
- **Tamper-proof.** The reference monitor itself must be protected from modification by the subjects whose access it mediates. If a subject can modify the reference monitor, they can rewrite the rules in their favor. In practice, this means the reference monitor lives in privileged kernel space, is signed and integrity-checked at boot, and cannot be overwritten by user-mode code.
- **Always-invoked.** Every access attempt — without exception — must pass through the reference monitor. This is the *complete mediation* principle from Saltzer-Schroeder applied to access-control architecture. If even one access path bypasses the reference monitor, the security policy is unenforceable on that path. This is why monolithic kernels embed the reference monitor at a chokepoint that all syscalls traverse.
- **Verifiable.** The reference monitor must be small and simple enough to allow formal verification. Anderson's framing: a reference monitor that cannot be analyzed for correctness cannot be trusted to enforce policy correctly. This drives the *economy of mechanism* principle (Saltzer-Schroeder) and is why the Trusted Computing Base (TCB) — the hardware and software the reference monitor depends on — should be as minimal as possible.
- **Reference Monitor vs Security Kernel vs TCB.** The Reference Monitor is the *abstract concept* (the policy-enforcement mediator). The Security Kernel is the *concrete implementation* of the reference monitor in code. The Trusted Computing Base (TCB) is the broader set of hardware, firmware, and software components the security kernel depends on for correct operation. CISSP testing distinguishes these three and may ask "which is the implementation of the reference monitor concept" — Security Kernel.
- **Cross-Concept link.** Sibling Concept `secure-design-principles` covers Saltzer-Schroeder principles, several of which underpin reference-monitor properties (complete mediation = always-invoked; economy of mechanism = verifiable). `bell-lapadula-properties` and `biba-properties` are policies the reference monitor enforces.
- **Out of scope for this Concept:** specific Security Kernel implementations (KSOS, GEMSOS, SCOMP), TCSEC's TCB requirements, separation-kernel architectures, microkernel-based reference monitors, formal verification tools (HOL, Coq, Isabelle).

### Values without a direct public citation

No cells in this table rely on inference beyond what Anderson's 1972 report [s1] specifies. The "three properties" framing is canonical CISSP teaching directly from the report.

## Engine demo opportunities

- `Reference Monitor | tamper-proof requirement → ?` → `Cannot be modified by unauthorized subjects`
- `Reference Monitor | always-invoked requirement → ?` → `Mediates every access attempt without exception`
- `Reference Monitor | verifiable requirement → ?` → `Small enough to be subjected to formal verification`
- `Reference Monitor | role → ?` → `Enforces access-control policy between subjects and objects`
- Composite swap: `tamper-proof requirement` changed to `Mediates every access attempt without exception` — directly tests the property pairing (tamper-proof is about protection from modification; always-invoked is about completeness of mediation)
- Cross-Concept distractor: presented with a Saltzer-Schroeder principle, recognize whether it maps to a reference monitor property

## Sources

- `[s1]`: James P. Anderson, "Computer Security Technology Planning Study" (ESD-TR-73-51, October 1972) — original reference monitor concept and the three properties (retrieved 2026-04-26, https://csrc.nist.rip/publications/history/ande72.pdf)
- `[s2]`: U.S. Department of Defense, "Trusted Computer System Evaluation Criteria" (DoD 5200.28-STD, December 1985) — TCSEC ("Orange Book") application of reference monitor concept (retrieved 2026-04-26, https://csrc.nist.gov/csrc/media/publications/conference-paper/1998/10/08/proceedings-of-the-21st-nissc-1998/documents/early-cs-papers/dod85.pdf)
