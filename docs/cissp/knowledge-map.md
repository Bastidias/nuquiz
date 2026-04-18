# CISSP Knowledge Map (Index)

> Top-level scaffold for CISSP content. Per-domain details live in each domain folder.
> **Source:** (ISC)² CISSP Exam Outline (2024-effective). Verify against current outline.

---

## Folder Structure → NuQuiz Hierarchy

```
docs/cissp/                                     (Deck: "CISSP")
  knowledge-map.md                              (this file)
  01-security-and-risk-management/              (Topic: Domain 1)
    README.md                                   (domain overview, Concept index)
    cia-triad.md                                (Concept)
    risk-treatment.md                           (Concept)
    ...
  02-asset-security/                            (Topic: Domain 2)
  ...
  08-software-development-security/             (Topic: Domain 8)
```

Mapping:
- `docs/cissp/` = **Deck**
- Each domain folder = **Topic**
- Each `.md` file inside a domain folder = **Concept**
- Each cell in a Concept's table holds one or more atomic **Facts** (multi-item cells use `<br>` to separate)

---

## Hierarchy Mapping (terms)

| CISSP term | NuQuiz term | File/folder | Expected count |
|---|---|---|---|
| Exam | Deck | `docs/cissp/` | 1 |
| Domain | Topic | numbered subfolder | 8 |
| Sub-objective | Tag (referenced in files) | — | ~70-80 |
| Comparable group | Concept | individual `.md` file | ~200-300 |
| Fact | Fact | atomic item in a table cell | ~5,000 |

Sub-objectives do not map 1:1 to Concepts. A sub-objective is an (ISC)² outline bucket; a Concept is our comparison boundary. Tag Concepts with the sub-objectives they cover so coverage can be audited against the official outline.

---

## Domain Weights & Fact Allocation

| # | Domain | Folder | Weight | Target facts |
|---|---|---|---|---|
| 1 | Security and Risk Management | `01-security-and-risk-management/` | 16% | ~800 |
| 2 | Asset Security | `02-asset-security/` | 10% | ~500 |
| 3 | Security Architecture and Engineering | `03-security-architecture-and-engineering/` | 13% | ~650 |
| 4 | Communication and Network Security | `04-communication-and-network-security/` | 13% | ~650 |
| 5 | Identity and Access Management | `05-identity-and-access-management/` | 13% | ~650 |
| 6 | Security Assessment and Testing | `06-security-assessment-and-testing/` | 12% | ~600 |
| 7 | Security Operations | `07-security-operations/` | 13% | ~650 |
| 8 | Software Development Security | `08-software-development-security/` | 10% | ~500 |
| | **Total** | | **100%** | **~5,000** |

Fact targets are ceilings tied to exam weight, not quotas. If a Concept has 12 meaningful facts, don't pad it.

---

## Atomicity Rules (CORE)

Every fact must be independently learnable, distractable, and gradable. The engine treats each `<br>`-separated item in a cell as one fact. To preserve atomicity:

- **No "and"-joined compound facts.** "Define scope, roles, and resources" is three facts, not one. Split with `<br>`.
- **No comma-joined lists in cells.** Same reason — split with `<br>`.
- **Terse over verbose.** "Connection established" beats "The connection is now established between client and server."
- **Parenthetical clarifications are OK.** "Yes (sliding window)" or "Hashing (SHA-256, SHA-3)" — the parenthetical scopes a single fact.
- **Names and identifiers are exempt.** "(ISC)² Code of Ethics" stays as one identifier even though it contains "of"; "Plan testing, training, and exercises" is the official NIST 800-34 phase name and stays whole.

If a cell would naturally be a paragraph, the Concept is at the wrong level of granularity — split the row or revisit the column choice.

### Why this matters

A compound fact ("Define scope, roles, and resources") tested as one multiple-choice option grades as a single right/wrong. A student who knows "scope" and "roles" but not "resources" gets the same wrong answer as someone who knows nothing. That's bad diagnostics. Splitting into three facts lets the engine identify the specific gap — which is the entire point of NuQuiz.

---

## Concept Authoring Pattern

Each Concept is one `.md` file in its domain folder. Required fields:

- **Concept name** — the comparable group (file H1 heading)
- **Pattern** — Dimensions | Ordered | Aspects (see picker below)
- **Tags** — sub-objective references, e.g., `1.10`, `1.11`
- **Status** — draft / SME-reviewed / complete
- **Layout convention** — one-line note about how rows and columns are organized for this Concept
- **The table itself** — rows × columns of atomic facts (multi-fact cells use `<br>`)
- **Notes** — author notes, tricky distinctions, exam pointers, engine demo opportunities

### Pattern picker

- **Dimensions** — comparable entities × shared attributes. **Rows** are entities (TCP, UDP, SCTP). **Columns** are attributes (reliability, ordering, header size). Most common pattern for CISSP. Generates compare-and-contrast and shared-vs-discriminating questions.

- **Ordered** — sequential or hierarchical content where order matters. **Rows are steps in order.** **Columns are attributes of each step**, with optional left → right progression from terse identifier (Name) to deeper detail (Mechanism, Purpose). Examples: TCP handshake, BCP phases, Kerberos flow. Generates sequence recall, step-attribute recall, cross-procedure comparison.

- **Aspects** — single concept × multiple facets. **One row** (the concept itself); **columns** are facets (definition, purpose, example, exception). Use when there's no comparison and no sequence — just one thing to elaborate on. Generates definition recall, exception-finding.

(The earlier "Depth" pattern is collapsed: depth-progression is now expressed as left → right column ordering within an Ordered or Dimensions Concept, not as a separate pattern.)

---

## Cross-Cutting Notes

- **Cross-domain Concepts.** Some facts live in multiple domains (e.g., BC in D1 and D7). Tag with all relevant sub-objectives; keep the Concept file in the domain it fits most naturally.
- **Concept file naming.** kebab-case, short (`cia-triad.md`, not `cia-triad-components-and-key-definitions.md`).
- **Concept names in content** should match (ISC)² language for buyer familiarity. Plain-language clarifications go in the Notes section.

---

## Open Questions for the SME

1. **Domain naming in UI.** "Domain" (CISSP term, buyer-familiar) vs "Topic" (NuQuiz term, consistent with engine). Lean: "Domain" in student-facing UI, "Topic" internally.
2. **Concept granularity.** Is ~200-300 Concepts across CISSP the right resolution? Will become clearer as Domain 1 fills in.
3. **Cross-domain Concepts.** Always tag-based, never duplicate? Pending confirmation.
4. **Concept names.** (ISC)² exact phrasing vs. plain-language in the UI. Lean: (ISC)² exact.

---

## Status

- [x] Top-level scaffold (this file)
- [x] Atomicity rules formalized
- [x] Pattern model corrected (Ordered uses rows-as-steps; Depth collapsed into column ordering)
- [x] Domain 1 Concept breakdown (see [`01-security-and-risk-management/README.md`](01-security-and-risk-management/README.md))
- [x] Domain 4 demo Concepts drafted (see [`04-communication-and-network-security/README.md`](04-communication-and-network-security/README.md))
- [ ] Domains 2-3, 5-8 Concept breakdowns (sub-objectives stubbed only; SME to confirm/expand)
- [ ] Authoring guide with full Concept file template
- [ ] Terminology pass on remaining files (some still use "Predicate style" header instead of "Pattern")
- [ ] Atomization audit on Dimensions Concepts (some "and" survivors in cia-triad, risk-treatment, osi-layers)
