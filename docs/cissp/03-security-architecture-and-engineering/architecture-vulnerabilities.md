# Architecture Vulnerabilities

**Domain:** 3 — Security Architecture and Engineering &nbsp;|&nbsp; **Pattern:** Dimensions &nbsp;|&nbsp; **Tags:** 3.5
**Status:** draft (SME review pending)

The six classic architectural vulnerability classes CISSP courseware tests. Each pairs a *mechanism* (what goes wrong at the architecture level) with an *exploitation example* and a *mitigation*. The CISSP exam tests the matchup between vulnerability class and the appropriate architectural defense — particularly that some vulnerabilities (covert channels, side channels) cannot be patched at the application level and require lower-stack countermeasures.

| vulnerability | mechanism | exploitation example | mitigation |
|---|---|---|---|
| Buffer overflow | Write past allocated memory bounds [s1] | Smashing the stack to overwrite return address [s1] | Bounds checking [s1]<br>Stack canaries [s1]<br>ASLR [s1] |
| Race condition | Timing-dependent unintended behavior [s1] | Two threads modifying shared state without synchronization [s1] | Locking primitives [s1]<br>Atomic operations [s1] |
| TOCTOU | Time-of-check vs time-of-use gap [s2] | Check file permissions then operate on substituted file [s2] | Atomic check-and-use operations [s2]<br>File-handle reuse [s2] |
| Covert channel | Unintended communication path between subjects [s3] | Process timing varied to signal data to observer [s3] | Information-flow analysis [s3]<br>Resource isolation [s3] |
| Side channel | Information leak via implementation detail [s4] | Power-consumption analysis revealing key bits [s4] | Constant-time implementations [s4]<br>Power-line filtering [s4] |
| Confused deputy | Privileged process tricked into acting on behalf of less-privileged caller [s5] | CSRF tricking authenticated browser into making request [s5] | Capability-based authorization [s5]<br>Per-request authorization [s5] |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. No parentheticals in cells.
- **Tag 3.5 retained from stub.** Maps to (ISC)² 2024 outline §3.5 *Assess and mitigate vulnerabilities of security architectures, designs, and solution elements*. Sibling Concepts: `covert-channel-types.md`, `side-channel-attacks.md`.
- **Buffer overflow is the textbook architectural vulnerability.** Stack-based and heap-based variants both arise from missing bounds checking. Modern mitigations (ASLR, DEP/NX, stack canaries, bounds-checked languages) raise the bar but do not eliminate the class.
- **Race condition vs. TOCTOU.** All TOCTOU bugs are race conditions, but not all race conditions are TOCTOU. TOCTOU specifically describes the pattern: check a condition, then use the result of the check; an attacker exploits the gap between check and use to substitute something. General race conditions involve any unsynchronized concurrent access.
- **Covert channel vs. side channel.** Both leak information through unintended paths. The distinction: covert channels are *intentional* (a malicious sender modulates the channel); side channels are *unintentional* (the implementation accidentally reveals information). Covert channels are about *deliberate exfiltration*; side channels are about *information disclosure through measurement*.
- **Confused deputy is the canonical authorization-architecture vulnerability.** A privileged process (the "deputy") performs operations on behalf of callers. If it relies on its own authority rather than the caller's, attackers trick it into doing things the caller could not do directly. CSRF in web browsers is the most common modern instance — the browser deputizes for the user but does not check origin.
- **Why these and not others.** This Concept covers *architectural* vulnerabilities — bugs that arise from how components interact, not from individual coding errors. Specific code-level vulnerabilities (SQL injection, XSS, command injection) live in Domain 8 Concepts. The line is fuzzy; some authorities classify SQL injection as architectural (untrusted-data injection across a trust boundary).
- **Gaps marked `[needs source]`:** none — all Facts trace to standard secure-architecture references.

## Engine demo opportunities

- `? | mechanism → Time-of-check vs time-of-use gap` → TOCTOU
- `Buffer overflow | mitigation → ?` → any of `Bounds checking`, `Stack canaries`, `ASLR`
- `? | exploitation example → CSRF tricking authenticated browser into making request` → Confused deputy
- `Side channel | mitigation → ?` → `Constant-time implementations` or `Power-line filtering`
- Cross-Row distractor: `Covert channel | mechanism → ?` with `Information leak via implementation detail` (Side channel) as a tempting wrong answer
- Composite Row profile: Buffer overflow across all Columns with `mitigation` swapped to `Capability-based authorization` (Confused deputy's value)

## Sources

- `[s1]`: NIST SP 800-160 Vol. 1 Rev. 1 *Engineering Trustworthy Secure Systems*, November 2022 — buffer-overflow and race-condition framing (retrieved 2026-04-26, https://csrc.nist.gov/pubs/sp/800/160/v1/r1/final)
- `[s2]`: M. Bishop and M. Dilger *Checking for Race Conditions in File Accesses*, USENIX Computing Systems, 1996 — TOCTOU original framing (retrieved 2026-04-26, sourced via published security-literature summaries)
- `[s3]`: NSA *A Guide to Understanding Covert Channel Analysis of Trusted Systems* (TCSEC Light Pink Book), November 1993 (retrieved 2026-04-26, sourced via NSA published documentation)
- `[s4]`: P. Kocher *Timing Attacks on Implementations of Diffie-Hellman, RSA, DSS, and Other Systems*, CRYPTO 1996 — original side-channel framing (retrieved 2026-04-26, sourced via published cryptography literature)
- `[s5]`: N. Hardy *The Confused Deputy*, ACM Operating Systems Review, 1988 — original confused-deputy formalization (retrieved 2026-04-26, sourced via published security-literature summaries)
- `[s6]`: (ISC)² CISSP Certification Exam Outline, effective 2024-04-15, Domain 3 §3.5 (retrieved 2026-04-26, https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline)
