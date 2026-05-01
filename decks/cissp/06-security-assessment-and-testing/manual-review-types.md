# Manual Review Types

**Domain:** 6 — Security Assessment and Testing &nbsp;|&nbsp; **Pattern:** Dimensions &nbsp;|&nbsp; **Tags:** 6.2
**Status:** draft (SME review pending)

The three manual security-review activities CISSP candidates are expected to discriminate. Each operates on a different artifact (code, requirements, architecture) at a different lifecycle phase. Manual review complements automated scanning — humans catch business-logic flaws, design weaknesses, and contextual issues that pattern-matching tools miss. Sibling Concept `code-review-types` in D8 covers code-review *styles* (peer review, formal inspection, etc.); this Concept covers the higher-level review *targets*.

| Type | input | who performs | output |
|---|---|---|---|
| Code review | Source code changeset | Developer peer<br>Security engineer | Defect list<br>Approve or reject decision |
| Misuse case review | Functional requirements<br>User stories | Security architect<br>Threat modeler | Misuse cases<br>Abuse-case test scenarios |
| Architecture review | Architecture diagrams<br>Data flow diagrams | Security architect<br>Senior engineer | Threat model<br>Mitigation recommendations |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. **No parentheticals in cells.**
- **Code review.** Operates on individual code changes (typically pull requests). Reviewer reads the diff, looks for security issues (input validation, authentication checks, error handling, secrets handling, dependency safety), and approves or requests changes. Modern toolchains pair human review with automated SAST findings — the human focuses on business-logic and design issues that SAST cannot evaluate.
- **Misuse case review.** Operates on functional requirements or user stories. The reviewer asks "how could this be abused?" — for each "as a user, I can..." story, derive corresponding "as an attacker, I can..." misuse cases. Output feeds threat modeling and security test design. Often paired with abuse-case writing during the Requirements phase.
- **Architecture review.** Operates on architecture diagrams, data flow diagrams, and trust boundary descriptions. The reviewer identifies threats per element using STRIDE, assesses existing mitigations, and recommends additional controls. Cross-Concept link: `threat-modeling-in-sdlc` in D8 covers threat modeling as an Aspects Concept.
- **All three are pre-deployment.** Manual reviews happen during Implementation (code review), Requirements (misuse case), and Design (architecture). Post-deployment manual review (incident-response forensics, audit) is structured differently and lives in D7 Concepts.
- **Manual review beats automation for design issues.** SAST cannot identify "this authentication flow has a logic flaw that lets a user with stolen-tokenize-only access perform admin actions." Architecture review and misuse case review catch these design-level issues. Code review catches them at the implementation layer when they manifest.
- **Cross-Concept link.** Sibling Concept `code-review-types` in D8 covers code-review styles: Peer review, Tool-assisted review, Pair programming, Formal inspection. That Concept is about *how* code review is conducted; this Concept is about *what* review targets exist (code vs requirements vs architecture).
- **Out of scope for this Concept:** specific review tooling (Phabricator, Crucible, GitHub PR reviews), review-effectiveness metrics (defect-finding rate, review velocity), pair programming as a review variant, threat modeling methodologies in detail (covered in D1 and D8 sibling Concepts).

### Tricky distractors

- **Three review targets: code, requirements, architecture.** Different artifacts, different phases. Wrong-answer pattern: collapsing them into one — they catch different defect classes.
- **Misuse case review is at Requirements phase.** Pre-design. Wrong-answer pattern: scheduling misuse cases at Implementation — too late, designs already locked.
- **Architecture review is at Design phase.** STRIDE per-element. Wrong-answer pattern: deferring architecture review to Testing — design issues are expensive to fix late.
- **Code review beats SAST for business logic.** Tools miss design-level flaws. Wrong-answer pattern: claiming SAST replaces manual code review — they're complementary.
- **Manual review is pre-deployment.** Post-deployment review is forensics or audit. Wrong-answer pattern: classifying incident review as manual review — different category.
- **Code review style is separate from review target.** Style (peer/formal) vs target (code/req/arch). Wrong-answer pattern: confusing them — different axes.

### Values without a direct public citation

| Cell | Notes |
|---|---|
| All rows × who performs | Role assignments | Industry-typical assignments; specific organizational ownership varies. |
| All rows × output | Output artifacts | Common-practice deliverable names; not from a single primary source. |
| Misuse case review × all cells | — | Misuse case modeling has academic literature (Sindre & Opdahl 2005) but no single canonical CISSP citation; widely-taught concept. |

## Engine demo opportunities

- `Code review | input → ?` → `Source code changeset`
- `Architecture review | input → ?` → `Architecture diagrams`, `Data flow diagrams`
- `Misuse case review | input → ?` → `Functional requirements`, `User stories`
- `? | input → Source code changeset` → `Code review`
- `? | input → Architecture diagrams` → `Architecture review` (sub-Fact in multi-Fact cell)
- `? | output → Threat model` → `Architecture review` (sub-Fact in multi-Fact cell)
- Composite Code review Row with `input` swapped to `Architecture diagrams`, `Data flow diagrams` — directly tests the input-to-review-type pairing (architecture diagrams feed architecture review, not code review)
- Composite Architecture review Row with `output` swapped to `Defect list`, `Approve or reject decision` — tests architecture-vs-code-review output (architecture review produces threat models; code review produces defect lists)
- Composite Misuse case review Row with `input` swapped to `Source code changeset` — tests misuse-case framing (misuse cases come from requirements, not from code)

## Sources

- `[s1]`: NIST SP 800-218, "Secure Software Development Framework (SSDF) Version 1.1" — review practices PW.7 (Review and/or Analyze Human-Readable Code) (February 2022, retrieved 2026-04-26, https://csrc.nist.gov/publications/detail/sp/800-218/final)
- `[s2]`: NIST SP 800-115, "Technical Guide to Information Security Testing and Assessment" — review and analysis techniques (September 2008, retrieved 2026-04-26, https://csrc.nist.gov/publications/detail/sp/800-115/final)
- `[s3]`: OWASP Threat Modeling Cheat Sheet — architecture review and threat modeling guidance (retrieved 2026-04-26, https://cheatsheetseries.owasp.org/cheatsheets/Threat_Modeling_Cheat_Sheet.html)
