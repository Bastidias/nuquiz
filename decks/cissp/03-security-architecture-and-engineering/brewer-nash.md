# Brewer-Nash (Chinese Wall)

**Domain:** 3 — Security Architecture and Engineering &nbsp;|&nbsp; **Pattern:** Aspects &nbsp;|&nbsp; **Tags:** 3.2
**Status:** draft (SME review pending)

The Brewer-Nash model (also called Chinese Wall) addresses *conflict-of-interest* — preventing a subject from accessing data that creates a conflict with data they have already accessed. Unlike Bell-LaPadula and Biba, which apply static rules, Brewer-Nash is *history-based*: a subject's permissions change based on what they have previously read. The CISSP exam tests this dynamic-policy nature as the discriminating feature.

| aspect | content |
|---|---|
| purpose | Prevent conflict-of-interest data access [s1] |
| key rule | Once subject reads object in conflict-of-interest class, subject cannot read other objects in same class [s1] |
| conflict-of-interest example | Consultant accesses one bank's data; system blocks access to competing bank's data [s1] |
| application domain | Financial-services and consulting environments [s1] |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. No parentheticals in cells.
- **Tag 3.2 retained from stub.** Maps to (ISC)² 2024 outline §3.2. Sibling Concepts: `bell-lapadula-properties.md`, `biba-properties.md`, `confidentiality-models.md`.
- **History-based policy is the discriminating feature.** BLP and Biba apply rules based on *who the subject is* and *what the object's classification is*. Brewer-Nash adds a third dimension: *what has the subject previously accessed*. This makes Brewer-Nash a *dynamic* model — a subject's permissions change as their access history grows.
- **The "Chinese Wall" metaphor.** Originally describing the ethical wall in financial-services firms — investment banking and brokerage divisions of the same firm cannot share customer information because doing so would create insider-trading conflicts. The Brewer-Nash model formalizes this — once you have looked at one client in a conflict-of-interest class, you cannot look at competing clients.
- **Conflict-of-interest classes.** Brewer-Nash organizes objects into datasets, datasets into companies, and companies into conflict-of-interest (CoI) classes. Banks form one CoI class; oil companies form another; etc. The rule applies *within* a CoI class — once you read one bank, the other banks in the class become inaccessible to you.
- **Where Brewer-Nash applies in practice.** Consulting firms (auditing partner cannot also do tax for a competitor), investment banks (deal team cannot share with research analysts), law firms (representing one party in a dispute prevents representing the other). These are *administrative* implementations; technical implementations (in software) are rarer but exist in some financial-data platforms.
- **Why the "wall" gets harder to maintain at scale.** As organizations grow and serve overlapping markets, perfect Brewer-Nash compliance becomes operationally difficult — every new client engagement narrows the firm's future business. Practical implementations use the model as a guide rather than a hard technical enforcement.
- **Renaming controversy.** The original "Chinese Wall" name has been criticized as culturally insensitive. The model is increasingly called "Brewer-Nash" or "ethical wall" in current literature. CISSP exam materials use both terms.
- **Gaps marked `[needs source]`:** none — all Facts trace to the original Brewer-Nash paper.

### Tricky distractors

- **Brewer-Nash is history-based.** Dynamic policy. Wrong-answer pattern: claiming Brewer-Nash applies static labels — it adapts based on prior access.
- **Conflict-of-interest, not classification.** Different model goal. Wrong-answer pattern: confusing Brewer-Nash with Bell-LaPadula — BLP enforces classification; BN prevents conflict.
- **Chinese Wall = Brewer-Nash.** Same model, different names. Wrong-answer pattern: treating them as different — current literature increasingly favors Brewer-Nash.
- **Applies within CoI classes.** Once you read Bank A, Banks B/C/D in same class are blocked. Wrong-answer pattern: claiming Brewer-Nash blocks all data access after first read — only conflict-class siblings.
- **Financial services and consulting are canonical domains.** Investment banks, audit firms. Wrong-answer pattern: applying Brewer-Nash to military classified systems — that's BLP territory.
- **Often administrative, not technical.** Implementation in policy more than software. Wrong-answer pattern: assuming all Brewer-Nash deployments are software-enforced — many are policy-and-training.

## Engine demo opportunities

- `? | content → Prevent conflict-of-interest data access` → purpose
- `key rule | content → ?` → the canonical dynamic-policy statement
- `? | content → Financial-services and consulting environments` → application domain
- Cross-Concept distractor: presented with a Bell-LaPadula or Biba statement, recognize it does not belong to Brewer-Nash

## Sources

- `[s1]`: D. Brewer and M. Nash *The Chinese Wall Security Policy*, IEEE Symposium on Security and Privacy, 1989 — original Brewer-Nash formalization (retrieved 2026-04-26, sourced via published security-models literature)
- `[s2]`: (ISC)² CISSP Certification Exam Outline, effective 2024-04-15, Domain 3 §3.2 (retrieved 2026-04-26, https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline)
