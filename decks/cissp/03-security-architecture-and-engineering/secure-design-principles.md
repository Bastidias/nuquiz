# Secure Design Principles

**Domain:** 3 — Security Architecture and Engineering &nbsp;|&nbsp; **Pattern:** Dimensions &nbsp;|&nbsp; **Tags:** 3.1
**Status:** draft (SME review pending)

The eight Saltzer-Schroeder secure design principles [s1] CISSP candidates are expected to recognize. These principles, articulated in 1975, remain the foundational design vocabulary for security architecture. The CISSP exam tests both per-principle definitions and the matchup between principle and the threat it addresses.

| Principle | definition | threat mitigated | example |
|---|---|---|---|
| Defense in depth | Layer multiple controls so failure of one does not cause compromise | Single-control failure | Firewall plus IDS plus host hardening |
| Least privilege | Grant minimum access required for function | Privilege abuse and lateral movement | Service account with read-only DB access |
| Fail-safe defaults | Default to deny when authorization is uncertain | Misconfiguration leading to unintended access | Firewall default-deny rule |
| Separation of duties | Split sensitive operations across multiple actors | Single-actor fraud | Two-person approval for wire transfer |
| Complete mediation | Verify authorization on every access | Cached-permission bypass | Re-check ACL on each file open |
| Open design | Security should not depend on design secrecy | Reverse engineering revealing design flaws | Public algorithm with secret key |
| Psychological acceptability | Security mechanisms should be easy to use correctly | User workarounds bypassing controls | Single sign-on instead of many passwords |
| Economy of mechanism | Keep design simple and small | Hidden flaws in complex code | Minimal kernel implementation |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. **No parentheticals in cells.**
- **Saltzer and Schroeder 1975 is the canonical source.** "The Protection of Information in Computer Systems" [s1] articulated these principles for secure system design. They have remained valid because they describe properties of *good design* independent of specific technology — they apply equally to 1970s mainframes and modern cloud-native architectures.
- **Defense in depth is the most-tested principle.** Layered controls so that compromise of any single control does not produce overall compromise. The classic example: perimeter firewall + network IDS + host hardening + endpoint EDR + application authentication. An attacker who bypasses the firewall still faces the IDS, the host hardening, etc.
- **Least privilege drives modern access control.** Sibling D5 Concept `access-control-models` covers RBAC/ABAC implementation; this principle is the *why*. Subjects should have only the access they need to perform their function — and only for the time they need it (just-in-time access).
- **Fail-safe defaults = default deny.** When the authorization decision is uncertain, default to denying access rather than granting. Firewalls default-deny inbound traffic; the application opens specific ports rather than blocking specific ones. The opposite policy (default-allow) is brittle — every new threat requires an explicit deny.
- **Open design is the cryptographic principle.** Kerckhoffs's principle (a system's security should depend only on the secrecy of the key, not the secrecy of the algorithm) is a specific application of open design. Modern cryptography is publicly designed, peer-reviewed, and standardized — security through obscurity has a poor track record.
- **Complete mediation defeats permission caching.** Every access attempt must be authorization-checked, not relying on cached results from previous checks. UNIX file permissions check on `open()` but not on subsequent reads — a fast file descriptor lookup violates complete mediation. Capability-based systems address this more rigorously.
- **Psychological acceptability addresses the human factor.** Security mechanisms that require excessive effort or counterintuitive behavior get worked around. SSO is a classic application — fewer passwords means users are less likely to write them down or reuse them. The principle pushes designers to *make the secure path the easy path*.
- **Economy of mechanism = small TCB.** The Trusted Computing Base should be as small and as simple as possible because complexity hides defects. Microkernels embody this principle (small kernel + isolated services); monolithic kernels do not. Sibling Concept `reference-monitor` covers TCB minimality requirements.
- **Out of scope for this Concept:** specific architecture patterns (Zero Trust, microservices), historical antecedents to Saltzer-Schroeder (Department of Defense Orange Book), modern reformulations (Zero Trust principles, cloud-native security tenets), the eighth principle "Least common mechanism" (sometimes counted as a ninth — covered in some sources, omitted here for stub fidelity).

### Tricky distractors

- **Open design ≠ open source.** The principle is that security should not depend on design secrecy. Wrong-answer pattern: equating open design with open-source code — the principle predates open-source by decades.
- **Fail-safe defaults = default deny.** When uncertain, deny. Wrong-answer pattern: claiming fail-safe means continued operation despite faults — that's fault tolerance, a different concept.
- **Complete mediation = check every access.** No cached authorization. Wrong-answer pattern: claiming "checked once at login" satisfies complete mediation — it doesn't.
- **Economy of mechanism = simplicity.** Small TCB, minimal code. Wrong-answer pattern: confusing economy of mechanism with cost minimization — it's about complexity, not budget.
- **Psychological acceptability addresses humans.** Make secure path the easy path. Wrong-answer pattern: claiming this principle is about user training — it's about design that doesn't fight users.
- **Saltzer-Schroeder principles are 1975-vintage.** They predate modern computing. Wrong-answer pattern: attributing them to recent NIST or Zero Trust framings — they're foundational and old.

### Values without a direct public citation

| Cell | Notes |
|---|---|
| All rows × example | Examples are illustrative; Saltzer-Schroeder [s1] articulates principles without prescribing examples. |

## Engine demo opportunities

- `Defense in depth | example → ?` → `Firewall plus IDS plus host hardening`
- `Least privilege | threat mitigated → ?` → `Privilege abuse and lateral movement`
- `Fail-safe defaults | example → ?` → `Firewall default-deny rule`
- `? | definition → Verify authorization on every access` → `Complete mediation`
- `? | definition → Security should not depend on design secrecy` → `Open design`
- `? | threat mitigated → User workarounds bypassing controls` → `Psychological acceptability`
- Composite Defense in depth Row with `definition` swapped to `Default to deny when authorization is uncertain` — directly tests the defense-in-depth vs fail-safe-defaults distinction
- Composite Open design Row with `example` swapped to `Two-person approval for wire transfer` — tests open-design vs separation-of-duties (open design is about algorithm publication; SoD is about splitting actions)
- Composite Economy of mechanism Row with `definition` swapped to `Layer multiple controls so failure of one does not cause compromise` — tests simplicity vs layering (these are complementary but distinct principles)

## Sources

- `[s1]`: Jerome H. Saltzer and Michael D. Schroeder, "The Protection of Information in Computer Systems," Proceedings of the IEEE 63 (9): 1278-1308 (September 1975, retrieved 2026-04-26, https://www.cs.virginia.edu/~evans/cs551/saltzer/)
- `[s2]`: NIST SP 800-160 Volume 1 Rev 1, "Engineering Trustworthy Secure Systems" — modern systems-engineering application of these principles (November 2022, retrieved 2026-04-26, https://csrc.nist.gov/publications/detail/sp/800-160/vol-1-rev-1/final)
