# Common Coding Vulnerabilities

**Domain:** 8 — Software Development Security &nbsp;|&nbsp; **Pattern:** Dimensions &nbsp;|&nbsp; **Tags:** 8.5
**Status:** draft (SME review pending)

The six low-level coding-error classes that appear repeatedly on the CWE Top 25 [s1] and on CISSP exams. All six share a common root cause — language semantics that don't enforce safety at the type or memory level — which is why memory-safe languages (Rust, Go, Java, C#, Python) eliminate most of them by construction. C and C++ remain the dominant affected languages because the standard libraries permit (and historically encouraged) the unsafe patterns.

| Vulnerability | mechanism | language commonly affected | mitigation |
|---|---|---|---|
| Buffer overflow | Write past allocated buffer bounds [s1] | C<br>C++ | Bounds checking<br>Stack canaries<br>Safe string functions |
| Race condition | Time-of-check-to-time-of-use gap allows interleaved access [s1] | Concurrent code in any language | Atomic operations<br>Locks<br>Avoid TOCTOU patterns |
| Integer overflow | Arithmetic result exceeds type range and wraps or truncates [s1] | C<br>C++<br>Java | Range checks before arithmetic<br>Use checked arithmetic libraries |
| Format string | User input passed as format specifier to printf-family function [s1] | C<br>C++ | Always pass user input as argument, never as format string |
| Use-after-free | Dereference pointer to freed memory [s1] | C<br>C++ | Set pointer to null after free<br>Use smart pointers<br>Memory-safe languages |
| NULL pointer dereference | Dereference pointer that is NULL [s1] | C<br>C++<br>Java | Null checks before dereference<br>Optional or Maybe types in modern languages |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. **No parentheticals in cells.** Language names (`C`, `C++`, `Java`) are atomic identifiers; CWE numbers and language acronyms live in this section.
- **CWE mapping.** Buffer overflow → CWE-787 (Out-of-bounds Write) and CWE-125 (Out-of-bounds Read). Race condition → CWE-362 (Concurrent Execution using Shared Resource with Improper Synchronization) and CWE-367 (TOCTOU). Integer overflow → CWE-190 (Integer Overflow or Wraparound). Format string → CWE-134 (Use of Externally-Controlled Format String). Use-after-free → CWE-416. NULL pointer dereference → CWE-476.
- **Memory safety eliminates four of the six.** Buffer overflow, format string, use-after-free, and NULL pointer dereference are eliminated (or hard to express) in memory-safe languages with managed runtimes (Java, C#, Python, JavaScript) or compile-time-checked safety (Rust). Integer overflow and race condition can occur in any language because they are about arithmetic semantics and concurrency, not memory.
- **Race condition is the only language-agnostic vulnerability.** TOCTOU (Time-of-check to time-of-use) and other concurrency bugs occur whenever two threads / processes access shared state without synchronization. The cell `language commonly affected` reads `Concurrent code in any language` to capture this.
- **Integer overflow in Java.** Java's primitive integer types (`int`, `long`) wrap silently on overflow without raising exceptions, just like C. Java applications are not immune to integer-overflow vulnerabilities just because Java is memory-safe.
- **Format string vulnerabilities are nearly extinct.** Modern C/C++ codebases use `-Wformat-security` compiler warnings that flag any `printf(user_input)` pattern. New code rarely contains format-string vulnerabilities; legacy code remains vulnerable.
- **Stack canaries are a buffer-overflow mitigation, not a fix.** A canary is a known value placed between the stack frame and the return address; the function-epilogue check detects if a buffer overflow has overwritten the return address. Canaries don't prevent overflows — they detect them and abort. ASLR, DEP/NX, and CFI provide complementary mitigations.
- **Out of scope for this Concept:** specific CVE examples, exploit techniques (ROP, JOP, heap spraying), CFI (Control Flow Integrity), shadow stacks, sandboxing technologies (seccomp, gVisor), language-level safe-by-default features beyond the mitigation column, fuzz testing tools, AddressSanitizer / UndefinedBehaviorSanitizer.

### Tricky distractors

- **Memory-safe languages eliminate buffer overflow, UAF, format string, NULL deref.** Wrong-answer pattern: claiming Java is immune to all six — race conditions and integer overflow still apply.
- **Integer overflow in Java wraps silently.** Java is memory-safe but not arithmetic-safe. Wrong-answer pattern: claiming Java is immune to integer overflow — wraparound happens silently.
- **Race condition is language-agnostic.** Concurrency bug, not a memory bug. Wrong-answer pattern: claiming race conditions only affect C/C++ — they affect any concurrent code.
- **Stack canaries detect, don't prevent.** Detection + abort, not prevention. Wrong-answer pattern: claiming canaries prevent buffer overflows — they detect overwrites and crash.
- **Format string = printf(user_input).** Specifically the format specifier position. Wrong-answer pattern: claiming any printf usage is vulnerable — only when user input is the format string.
- **Use-after-free can be exploited for code execution.** Not just a stability bug. Wrong-answer pattern: classifying UAF as low-severity — it's frequently RCE-grade.

### Values without a direct public citation

| Cell | Value | Why unsourced |
|---|---|---|
| All rows × language commonly affected | Language lists | CWE entries [s1] are language-agnostic by design; the language-commonly-affected framing is CISSP-pedagogical synthesis from CWE descriptions plus industry observation. |
| All rows × mitigation | Mitigation lists | Paraphrased from CWE prevention guidance and OWASP Secure Coding practices [s2]; not direct quotes. |

## Engine demo opportunities

- `Buffer overflow | language commonly affected → ?` → `C`, `C++`
- `Race condition | language commonly affected → ?` → `Concurrent code in any language`
- `? | mechanism → Dereference pointer to freed memory` → `Use-after-free`
- `? | mechanism → User input passed as format specifier to printf-family function` → `Format string`
- `Use-after-free | mitigation → ?` → `Set pointer to null after free`, `Use smart pointers`, `Memory-safe languages`
- `? | mitigation → Stack canaries` → `Buffer overflow` (sub-Fact in multi-Fact cell)
- Composite Buffer overflow Row with `language commonly affected` swapped to `Concurrent code in any language` — directly tests the memory-safety axis (buffer overflow is C/C++-specific; race condition is language-agnostic)
- Composite Race condition Row with `mechanism` swapped to `Write past allocated buffer bounds` — tests mechanism-to-class pairing (buffer overflow is bounds-related; race condition is timing-related)
- Composite NULL pointer dereference Row with `mitigation` swapped to `Stack canaries` — tests that stack canaries defend against buffer overflow specifically, not against null dereference

## Sources

- `[s1]`: MITRE, "2024 CWE Top 25 Most Dangerous Software Weaknesses" — canonical ranked list of CWE identifiers for memory and concurrency errors (retrieved 2026-04-25, https://cwe.mitre.org/top25/)
- `[s2]`: OWASP Secure Coding Practices Quick Reference Guide — language-agnostic mitigation guidance (retrieved 2026-04-25, https://owasp.org/www-project-secure-coding-practices-quick-reference-guide/)
- `[s3]`: NIST SP 800-218, "Secure Software Development Framework (SSDF) Version 1.1" — Practice PW.5 (Create Source Code by Adhering to Secure Coding Practices) (February 2022, retrieved 2026-04-25, https://csrc.nist.gov/publications/detail/sp/800-218/final)
