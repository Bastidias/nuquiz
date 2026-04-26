# Common Injection Types

**Domain:** 8 — Software Development Security &nbsp;|&nbsp; **Pattern:** Dimensions &nbsp;|&nbsp; **Tags:** 8.5
**Status:** draft (SME review pending)

The six injection-attack classes CISSP candidates should distinguish — all collapse under OWASP A03 Injection in the 2021 Top 10. The shared mechanism: untrusted user input concatenated into an interpreter context such that it changes the structure of the executed command. The discriminating axis is *which interpreter* the injection targets — SQL, NoSQL, OS shell, LDAP, XPath, or browser HTML/JS for XSS. CISSP testing focuses on injection-class identification from a payload snippet and on the mitigation pairing.

| Type | mechanism | example payload | mitigation |
|---|---|---|---|
| SQL injection | User input concatenated into SQL query string [s1] | ' OR 1=1 -- | Parameterized queries [s1]<br>Prepared statements<br>Stored procedures |
| NoSQL injection | User input concatenated into NoSQL operator object | { "$ne": null } | Input validation<br>Schema enforcement<br>Type checking |
| OS command injection | User input concatenated into shell command | ; rm -rf / | Avoid shell invocation<br>Argument arrays<br>Input allowlist |
| LDAP injection | User input concatenated into LDAP filter | *)(uid=*))(|(uid=* | Parameterized LDAP API<br>Input encoding |
| XPath injection | User input concatenated into XPath expression | ' or '1'='1 | Parameterized XPath<br>Input validation |
| XSS | User input rendered into browser DOM as code [s2] | <script>alert(1)</script> | Output encoding [s2]<br>Content Security Policy<br>HTTPOnly cookies |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. **No parentheticals in cells.** Example payloads are copied verbatim and treated as atomic strings.
- **Acronym expansions.** `SQL` = Structured Query Language. `NoSQL` = Not Only SQL (any non-relational database — MongoDB, CouchDB, Cassandra, Redis, etc.). `LDAP` = Lightweight Directory Access Protocol. `XPath` = XML Path Language. `XSS` = Cross-Site Scripting.
- **Universal mitigation pattern.** All six injection classes share the same architectural defense: *separate code from data*. Parameterized queries, prepared statements, argument arrays, and parameterized LDAP/XPath APIs all instantiate this principle — user input is bound as data and never parsed as syntax. Where the language doesn't offer a parameterized API (raw shell invocation), the mitigation becomes "avoid the unsafe interpreter altogether."
- **Input validation is necessary but not sufficient.** Allowlist input validation (rejecting anything that doesn't match an expected pattern) reduces the attack surface but doesn't replace parameterization. CISSP framing: validation is a hardening measure; parameterization is the actual fix.
- **XSS is a special case.** XSS targets the *browser* as the interpreter rather than a server-side parser. Mitigation requires *output encoding* (escaping HTML/JS/URL special characters at the point of rendering), not input validation alone. Sibling Concept `xss-variants` covers reflected / stored / DOM-based XSS distinctions.
- **NoSQL injection isn't gone — it's different.** NoSQL databases don't have SQL's specific syntax, but they do have query operators that can be smuggled in via JSON parsing. The MongoDB `{"username": {"$ne": null}}` example matches any record where username is not null — bypassing authentication that compares username to a string.
- **OS command injection is the highest-impact.** A successful OS command injection typically gives the attacker arbitrary code execution on the server with the privileges of the application user — frequently leading to full system compromise. Avoiding shell invocation entirely (e.g., using `subprocess` with an argument array rather than `shell=True` in Python) is the canonical defense.
- **Out of scope for this Concept:** XSS variants in detail (separate Concept — `xss-variants`), CSRF (a different attack class), SSRF (covered in `owasp-top-10` A10), template injection (Server-Side Template Injection — increasingly common but not yet on most exam outlines), header injection, deserialization attacks (covered indirectly in `owasp-top-10` A08), prototype pollution.

### Values without a direct public citation

| Cell | Value | Why unsourced |
|---|---|---|
| NoSQL injection × all cells | — | OWASP cheat sheet covers SQL injection in detail [s1]; NoSQL injection has its own cheat sheet but was not directly fetched primary-source in this research pass. |
| OS command injection × all cells | — | OWASP Command Injection cheat sheet exists but not directly fetched per cell. |
| LDAP injection × all cells | — | OWASP LDAP Injection prevention cheat sheet exists but not fetched per cell. |
| XPath injection × all cells | — | OWASP XPath Injection cheat sheet exists but not fetched per cell. |

## Engine demo opportunities

- `SQL injection | example payload → ?` → `' OR 1=1 --`
- `XSS | example payload → ?` → `<script>alert(1)</script>`
- `OS command injection | example payload → ?` → `; rm -rf /`
- `? | mitigation → Parameterized queries` → `SQL injection` (sub-Fact in multi-Fact cell)
- `? | mitigation → Output encoding` → `XSS` (sub-Fact in multi-Fact cell)
- `? | mitigation → Content Security Policy` → `XSS` (sub-Fact in multi-Fact cell)
- `? | mechanism → User input rendered into browser DOM as code` → `XSS`
- Composite SQL injection Row with `mitigation` swapped to `Output encoding`, `Content Security Policy` — directly tests the type-to-mitigation pairing (parameterized queries fix SQLi; output encoding fixes XSS)
- Composite XSS Row with `mechanism` swapped to `User input concatenated into shell command` — tests the interpreter-context awareness (XSS targets the browser; OS command injection targets the shell)
- Composite OS command injection Row with `example payload` swapped to `' OR 1=1 --` — tests payload-to-class pairing (the OR-1-equals-1 pattern is SQLi, not OS command)

## Sources

- `[s1]`: OWASP, "SQL Injection Prevention Cheat Sheet" — parameterized queries as the canonical SQLi mitigation (retrieved 2026-04-25, https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html)
- `[s2]`: OWASP, "Cross Site Scripting Prevention Cheat Sheet" — output encoding rules per HTML context (retrieved 2026-04-25, https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html)
- `[s3]`: OWASP, "Injection Prevention Cheat Sheet" — generic injection guidance covering NoSQL, OS command, LDAP, XPath (retrieved 2026-04-25, https://cheatsheetseries.owasp.org/cheatsheets/Injection_Prevention_Cheat_Sheet.html)
