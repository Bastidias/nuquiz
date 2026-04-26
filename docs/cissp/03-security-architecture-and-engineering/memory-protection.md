# Memory Protection Mechanisms

**Domain:** 3 — Security Architecture and Engineering &nbsp;|&nbsp; **Pattern:** Dimensions &nbsp;|&nbsp; **Tags:** 3.4
**Status:** draft (SME review pending)

The four hardware-and-OS memory protection mechanisms CISSP candidates are expected to discriminate. ASLR randomizes memory layout to defeat exploits relying on fixed addresses. DEP/NX marks data pages as non-executable to prevent code injection. Stack canaries detect buffer overflows that overwrite return addresses. Pointer authentication cryptographically signs pointers to detect tampering. Each defends against a different exploitation primitive, so modern systems deploy them in combination.

| Mechanism | mechanism | attack mitigated | performance cost |
|---|---|---|---|
| ASLR | Randomize memory addresses for code, libraries, stack, heap [s1] | Return-to-libc<br>ROP gadget chains relying on fixed addresses | Low |
| DEP / NX | Mark data pages as non-executable [s2] | Stack-based shellcode execution<br>Heap-spray code injection | Negligible |
| Stack canaries | Place known value before return address; verify before return [s3] | Stack buffer overflow overwriting return address | Low |
| Pointer authentication | Cryptographic signature on pointers [s4] | Pointer tampering<br>Return-address spoofing | Low |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. **No parentheticals in cells.**
- **Acronym expansions.** `ASLR` = Address Space Layout Randomization. `DEP` = Data Execution Prevention (Microsoft term). `NX` = No Execute (CPU bit name). `PAC` = Pointer Authentication Code (ARMv8.3 feature, used colloquially as "pointer authentication").
- **Defense in depth, not silver bullet.** No single mechanism stops all memory-corruption exploits. Modern attacks chain primitives — leak an address (defeat ASLR), use ROP (defeat DEP), avoid stack overflows (defeat canaries). Combining all four raises the cost of exploitation significantly without eliminating it.
- **ASLR strength depends on entropy.** A typical 64-bit ASLR implementation has 28-32 bits of entropy on the heap and stack, more on libraries. Brute-forcing requires probing many addresses; mitigations like crash-counting prevent unlimited probing. 32-bit systems have much less entropy — ASLR is meaningfully weaker on 32-bit platforms.
- **DEP/NX requires the W^X principle.** Memory pages are *either* writable *or* executable, not both ("W xor X"). Code pages are read-execute; data pages (stack, heap) are read-write but not executable. Bypassed by ROP (Return-Oriented Programming) which doesn't need to inject new code — instead it chains existing code gadgets ending in `ret` instructions.
- **Stack canaries vs heap protection.** Canaries protect *stack* return addresses specifically. Heap-based buffer overflows (overwriting heap metadata, double-free) are not detected by canaries — they require separate heap-protection mechanisms (heap guard pages, allocation pattern checks, hardened allocators).
- **Pointer authentication is a recent addition.** ARMv8.3 (Apple A12 onward, mid-2018) introduced PAC. The CPU embeds a cryptographic MAC into unused upper bits of pointer values; before pointer use, the CPU verifies the MAC. Modifying the pointer (e.g., via buffer overflow) corrupts the MAC and the verification fails. Effective against return-address spoofing and pointer-tampering attacks.
- **Cross-Concept link.** Sibling Concept `architecture-vulnerabilities` covers buffer overflow, race conditions, and confused-deputy issues — these mechanisms mitigate buffer overflow specifically. `common-coding-vulnerabilities` in D8 covers the language-level coding errors that produce memory-corruption bugs.
- **Out of scope for this Concept:** specific ASLR implementation entropy values, kASLR (kernel ASLR), CFI (Control Flow Integrity) and CET (Control-flow Enforcement Technology), shadow stacks, MTE (Memory Tagging Extension), hardened allocators, BLISS / IBM PowerPC-specific protections.

### Values without a direct public citation

| Cell | Notes |
|---|---|
| All rows × performance cost | Categorical bins | Industry-typical performance impact ratings; vary with workload and implementation. |

## Engine demo opportunities

- `ASLR | mechanism → ?` → `Randomize memory addresses for code, libraries, stack, heap`
- `DEP / NX | mechanism → ?` → `Mark data pages as non-executable`
- `Stack canaries | mechanism → ?` → `Place known value before return address; verify before return`
- `? | attack mitigated → Stack buffer overflow overwriting return address` → `Stack canaries`
- `? | attack mitigated → Stack-based shellcode execution` → `DEP / NX` (sub-Fact in multi-Fact cell)
- `Pointer authentication | mechanism → ?` → `Cryptographic signature on pointers`
- Composite ASLR Row with `attack mitigated` swapped to `Stack buffer overflow overwriting return address` — directly tests the mechanism-attack pairing (ASLR defends against fixed-address exploits; canaries defend against overflow)
- Composite Stack canaries Row with `mechanism` swapped to `Mark data pages as non-executable` — tests canaries vs DEP (canaries detect overflows by checking sentinel value; DEP marks data non-executable)
- Composite DEP / NX Row with `attack mitigated` swapped to `ROP gadget chains relying on fixed addresses` — tests the DEP-vs-ASLR distinction (DEP doesn't defend against ROP since ROP uses existing code)

## Sources

- `[s1]`: PaX Team, "Address Space Layout Randomization" (March 2003) — original ASLR design (retrieved 2026-04-26, https://pax.grsecurity.net/docs/aslr.txt)
- `[s2]`: Microsoft Learn, "Data Execution Prevention" — DEP architecture (retrieved 2026-04-26, https://learn.microsoft.com/en-us/windows/win32/memory/data-execution-prevention)
- `[s3]`: Crispin Cowan et al., "StackGuard: Automatic Adaptive Detection and Prevention of Buffer-Overflow Attacks," USENIX Security 1998 — original stack canary design (retrieved 2026-04-26, https://www.usenix.org/legacy/publications/library/proceedings/sec98/full_papers/cowan/cowan.pdf)
- `[s4]`: Arm, "Pointer Authentication on ARMv8.3" specification (retrieved 2026-04-26, https://developer.arm.com/documentation/107708/0100/Introduction-to-pointer-authentication-on-Arm-architecture)
