# Database Security Concepts

**Domain:** 8 — Software Development Security &nbsp;|&nbsp; **Pattern:** Dimensions &nbsp;|&nbsp; **Tags:** 8.5
**Status:** draft (SME review pending)

The five database-security concepts most often tested on CISSP. Two are confidentiality concerns (Inference, Aggregation); two are mechanisms that protect against them or against access-control violations (Polyinstantiation, View-based access); one is the foundational transaction-property set (ACID). The discriminator between Inference and Aggregation is subtle and exam-classic — both are "deriving sensitive information from non-sensitive sources" but Inference uses *logical reasoning* across data points while Aggregation uses *the volume of data* to construct a sensitive picture.

| Concept | what it protects against | typical use |
|---|---|---|
| ACID | Transaction integrity violations | Reliable transaction processing |
| Inference | Deduction of classified data from unclassified facts | Restrict query patterns<br>Cell suppression |
| Aggregation | Sensitive picture from many low-sensitivity records | Limit result-set size<br>Audit query patterns |
| Polyinstantiation | Inference via classification labels | Maintain different views of the same record per clearance level |
| View-based access | Unauthorized column or row access | Define limited views per role |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. **No parentheticals in cells.**
- **ACID expansion.** `ACID` = Atomicity, Consistency, Isolation, Durability. Atomicity: a transaction either fully completes or has no effect. Consistency: a transaction moves the database from one valid state to another. Isolation: concurrent transactions do not see each other's intermediate states. Durability: committed transactions survive failures. CISSP testing sometimes asks the four-letter expansion directly.
- **Inference vs Aggregation — the canonical exam-classic distinction.** Both produce sensitive information from non-sensitive sources, but the mechanism differs.
  - **Inference** uses *logical reasoning* — knowing that employee X works in Department A and Department A's payroll budget is published can let an attacker infer X's salary range without ever querying salary data. Mitigated by *cell suppression* (refusing to answer queries that would enable inference) and by *query-pattern restrictions*.
  - **Aggregation** uses *volume* — querying a thousand non-sensitive records and combining them produces a sensitive dataset that no individual record contained. Mitigated by *result-set size limits* and by *audit of query patterns* that aggregate broadly.
- **Polyinstantiation is multilevel-secure-database specific.** In an MLS database, Bob (Confidential clearance) sees record `(Project = Oak)` while Alice (Top Secret) sees `(Project = Strawberry)` for the same primary-key row — the database stores both versions, one per classification level. This prevents Bob from inferring (via constraint violation) that a higher-classification record exists. Polyinstantiation is rare outside government MLS systems; CISSP tests it as the canonical "MLS confidentiality preservation via duplicate records" concept.
- **View-based access uses SQL views as security boundaries.** A database view that selects only the rows and columns a particular role should access becomes the access-control boundary — the role queries the view, not the base table. Common pattern for restricting PII or financial data exposure to specific user roles.
- **ACID belongs in this Concept because integrity is a security property.** ACID is more familiar from database-engineering literature than from security literature, but the integrity-related properties (Atomicity, Consistency, Durability) directly map to CISSP integrity concerns. CISSP exams use ACID primarily as a recognition test of the acronym and its four parts.
- **Out of scope for this Concept:** specific MLS database products (Oracle Label Security, Trusted Solaris), database encryption (TDE — Transparent Data Encryption), database firewalls, query throttling for DoS protection, BASE (the NoSQL-tradeoff acronym opposing ACID), CAP theorem (distributed-systems tradeoff), specific SQL injection mitigations (covered in `common-injection-types`).

### Values without a direct public citation

| Cell | Value | Why unsourced |
|---|---|---|
| All rows | Cell descriptions | CISSP-pedagogical framings; database-security taxonomy is widely taught but not codified in a single primary public source. NIST SP 800-53 covers data protection broadly without using these specific terminology distinctions. |

## Engine demo opportunities

- `ACID | typical use → ?` → `Reliable transaction processing`
- `Inference | typical use → ?` → `Restrict query patterns`, `Cell suppression`
- `Aggregation | typical use → ?` → `Limit result-set size`, `Audit query patterns`
- `Polyinstantiation | typical use → ?` → `Maintain different views of the same record per clearance level`
- `? | what it protects against → Deduction of classified data from unclassified facts` → `Inference`
- `? | what it protects against → Sensitive picture from many low-sensitivity records` → `Aggregation`
- Composite Inference Row with `what it protects against` swapped to `Sensitive picture from many low-sensitivity records` — directly tests the Inference vs Aggregation distinction (logical reasoning vs volume-based combination)
- Composite Polyinstantiation Row with `what it protects against` swapped to `Transaction integrity violations` — tests that Polyinstantiation is a confidentiality mechanism, not an integrity one
- Composite ACID Row with `what it protects against` swapped to `Deduction of classified data from unclassified facts` — tests that ACID is about integrity, not inference

## Sources

- `[s1]`: NIST SP 800-53 Rev 5, "Security and Privacy Controls for Information Systems and Organizations" — SC (System and Communications Protection) and AC (Access Control) families touch on inference / aggregation concerns (September 2020 baseline, retrieved 2026-04-25, https://csrc.nist.gov/publications/detail/sp/800-53/rev-5/final)
- `[s2]`: ISO/IEC 9075-1:2016, "Information technology — Database languages — SQL" — ACID transaction properties (paywalled; cited as authoritative reference, retrieved 2026-04-25, https://www.iso.org/standard/63555.html)
