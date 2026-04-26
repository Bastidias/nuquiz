# API Security Risks (OWASP API Top 10)

**Domain:** 8 — Software Development Security &nbsp;|&nbsp; **Pattern:** Dimensions &nbsp;|&nbsp; **Tags:** 8.5
**Status:** draft (SME review pending)

The seven canonical API-specific risk categories from the OWASP API Security Top 10 [s1]. The OWASP API list is distinct from the OWASP Top 10 (web application) because APIs expose object-level and function-level access in ways that web pages do not — three of the rows here (BOLA, BOPLA, BFLA) are object-level / property-level / function-level authorization failures that the web-app Top 10 doesn't separately enumerate. CISSP testing increasingly probes API-specific risks alongside the web-app Top 10.

| Risk | description | mitigation |
|---|---|---|
| BOLA | Authorization bypass at the object level — fetching another user's record by ID [s1] | Per-request object-level authorization checks<br>Random unguessable IDs |
| Broken authentication | Authentication mechanism flawed or absent [s1] | Strong authentication<br>Token validation<br>MFA |
| BOPLA | Authorization bypass at the property level — modifying fields the user shouldn't access [s1] | Field-level authorization<br>Input schema validation<br>Mass-assignment protection |
| Unrestricted resource consumption | API allows resource-exhausting requests [s1] | Rate limiting<br>Pagination<br>Resource quotas |
| BFLA | Authorization bypass at the function level — calling admin endpoints as regular user [s1] | Per-function authorization checks<br>Role-based endpoint segregation |
| SSRF | Server fetches attacker-controlled URLs [s1] | URL allowlist<br>Network segmentation<br>Disable unused URL schemas |
| Misconfiguration | Insecure default or missing security configuration [s1] | Hardening baselines<br>Automated configuration review |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. **No parentheticals in cells.**
- **Acronym expansions.** `BOLA` = Broken Object-Level Authorization (API1:2023). `BOPLA` = Broken Object Property-Level Authorization (API3:2023). `BFLA` = Broken Function-Level Authorization (API5:2023). `SSRF` = Server-Side Request Forgery (API7:2023).
- **OWASP API Top 10 2023 has 10 entries; this Concept covers 7.** The full 2023 list is API1 BOLA, API2 Broken Authentication, API3 BOPLA, API4 Unrestricted Resource Consumption, API5 BFLA, API6 Unrestricted Access to Sensitive Business Flows, API7 SSRF, API8 Security Misconfiguration, API9 Improper Inventory Management, API10 Unsafe Consumption of APIs. The Concept stub specified seven rows; API6, API9, API10 are omitted — SME should decide whether to expand.
- **Authorization granularity is the API Top 10's defining theme.** Three categories address authorization at progressively finer granularity: BFLA (function-level: can this user call this endpoint?), BOLA (object-level: can this user access this specific record?), BOPLA (property-level: can this user modify this specific field?). The web-app OWASP Top 10 collapses all three under A01 Broken Access Control; the API Top 10 separates them because real API codebases fail at each level differently.
- **BOLA is the most common API vulnerability.** Endpoints that look up a record by ID without verifying that the requesting user owns the record. Trivially exploitable by changing an ID parameter in the URL. Mitigated by enforcing per-request authorization at the data-access layer, not just at the route layer.
- **BOPLA is the modern term for "mass assignment" in OWASP framing.** A user with permission to update some properties of a record sends a request that updates *additional* properties they shouldn't have access to (e.g., setting `is_admin=true`). The API auto-binds the request body to the model object and saves it without filtering. Schema validation that allowlists modifiable fields is the canonical defense.
- **Unrestricted resource consumption replaces "Lack of resources & rate limiting" from 2019.** Broadened from rate-limiting alone to include any resource-exhausting request — large query results, complex GraphQL queries, expensive regex evaluations.
- **SSRF appears in both the web Top 10 (A10) and API Top 10 (API7).** Same vulnerability class, just emphasized again because APIs frequently make outbound calls to URLs derived from request input. Mitigation is identical.
- **Out of scope for this Concept:** API6 Unrestricted Access to Sensitive Business Flows, API9 Improper Inventory Management, API10 Unsafe Consumption of APIs (the three rows omitted from the seven-row stub), GraphQL-specific risks, gRPC and WebSocket risks, JWT-specific attacks, API gateway / WAF rule design.

### Values without a direct public citation

No cell relies on inference beyond what the OWASP API Security Top 10 [s1] specifies. Mitigation lists are paraphrased from the OWASP per-category guidance rather than directly quoted; the canonical defenses are from [s1].

## Engine demo opportunities

- `BOLA | mitigation → ?` → `Per-request object-level authorization checks`, `Random unguessable IDs`
- `SSRF | mitigation → ?` → `URL allowlist`, `Network segmentation`, `Disable unused URL schemas`
- `? | description → Authorization bypass at the object level — fetching another user's record by ID` → `BOLA`
- `? | description → Authorization bypass at the function level — calling admin endpoints as regular user` → `BFLA`
- `? | description → Authorization bypass at the property level — modifying fields the user shouldn't access` → `BOPLA`
- `? | mitigation → Rate limiting` → `Unrestricted resource consumption`
- Composite BOLA Row with `description` swapped to `Authorization bypass at the function level — calling admin endpoints as regular user` — directly tests the BOLA / BFLA distinction (object-level vs function-level)
- Composite BOPLA Row with `mitigation` swapped to `Rate limiting`, `Pagination` — tests the property-vs-resource axis (mass-assignment is a schema problem, not a rate-limiting problem)
- Composite Misconfiguration Row with `description` swapped to `Server fetches attacker-controlled URLs` — tests the SSRF/Misconfig distinction (SSRF is an outbound-fetch vulnerability; Misconfig is an inbound-defaults vulnerability)

## Sources

- `[s1]`: OWASP, "OWASP API Security Top 10 — 2023" (retrieved 2026-04-25, https://owasp.org/API-Security/editions/2023/en/0x00-introduction/)
- `[s2]`: OWASP API Security Project (umbrella project page) (retrieved 2026-04-25, https://owasp.org/www-project-api-security/)
- `[s3]`: OWASP, "OWASP Top 10:2021" — for cross-reference between API and web-app Top 10s, particularly SSRF (A10 / API7) (retrieved 2026-04-25, https://owasp.org/Top10/)
