# Authorization Models Comparison

**Domain:** 5 — Identity and Access Management &nbsp;|&nbsp; **Pattern:** Dimensions &nbsp;|&nbsp; **Tags:** 5.4
**Status:** draft (SME review pending)

The three authorization-decision models CISSP candidates are expected to discriminate. The discriminator is *what attributes drive the access decision*: subject-based authorization keys on properties of the requester (role, clearance, group membership); object-based keys on properties of the resource (classification, owner); context-based keys on environmental factors at request time (location, time of day, device posture). Real authorization systems combine all three — the categories are an analytic decomposition, not mutually exclusive deployment options. Sibling Concept `access-control-models` covers the named models (DAC/MAC/RBAC/ABAC/RuBAC); this Concept covers the *axis* along which authorization decisions are reasoned.

| Model | basis for decision | example | scalability |
|---|---|---|---|
| Subject-based | Attributes of the requester | RBAC role assignment<br>Clearance level | Scales with role design quality |
| Object-based | Attributes of the resource | File classification<br>Resource owner ACL | Scales with classification consistency |
| Context-based | Environmental conditions at request time | Time of day<br>Source IP<br>Device posture | Scales with policy expressiveness |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. **No parentheticals in cells.**
- **The three axes correspond to ABAC's attribute categories.** NIST SP 800-162 [s1] defines four ABAC attribute categories: Subject, Object, Operation, Environment. This Concept's three rows collapse Operation into Subject and Object (since "what action is being performed" is implicit in the request) and rename Environment as Context. The mapping is direct: Subject-based = NIST Subject attributes; Object-based = NIST Object attributes; Context-based = NIST Environment attributes.
- **RBAC is subject-based, but not all subject-based authorization is RBAC.** RBAC keys decisions on the subject's *role*; subject-based decisions can also key on clearance level (MAC), group membership (DAC group ACLs), department, location of record, or any other property of the requester. RBAC is one *implementation* of subject-based authorization; clearance-based MAC is another.
- **Object-based authorization without RBAC.** A pure object-based system (rare in practice) would make decisions purely on the resource's properties — classification, owner, sensitivity tags — without reference to who is asking. The closest real-world example is content-driven filtering (a DLP system that blocks any document containing "SECRET" regardless of requester). Most production systems combine subject-based and object-based reasoning (e.g., MAC requires both clearance match *and* classification match).
- **Context-based authorization is the modern growth area.** Conditional access policies in modern IAM (Microsoft Entra ID Conditional Access, Okta Adaptive MFA, Google BeyondCorp) heavily exploit context — denying access from unfamiliar locations, requiring step-up MFA from unmanaged devices, restricting privileged operations to business hours. The cell value `Time of day`, `Source IP`, `Device posture` enumerates the most-tested context attributes.
- **Scalability framing.** All three models scale, but each has a different scaling bottleneck:
  - **Subject-based:** scales as long as role / group design stays clean. Role explosion ("one role per project per environment") destroys subject-based scalability.
  - **Object-based:** scales as long as classification stays consistent. Inconsistent classification produces inconsistent enforcement.
  - **Context-based:** scales with the policy engine's expressiveness. Naive context rules (allow if IP is `10.0.0.0/8`) don't scale; rich policy languages (XACML, OPA Rego) handle complex context.
- **Cross-Concept link.** This Concept's three axes underpin the named models in `access-control-models`: DAC and RBAC are subject-based; MAC is subject-and-object combined; RuBAC is rule/context-based; ABAC is the explicit synthesis of all three. ABAC's defining property is that it makes the three axes simultaneously available to policy authors without needing a per-axis named model.
- **Out of scope for this Concept:** specific named access-control models (sibling Concept `access-control-models`), policy languages (XACML, OPA, Cedar), RBAC role-engineering practices, MAC label hierarchies, conditional-access UX patterns, Zero Trust architecture (which heavily uses context-based authorization).

### Tricky distractors

- **Three axes combine in real systems.** Subject + Object + Context attributes evaluated per decision. Wrong-answer pattern: claiming a system uses only one axis — most production systems compose all three.
- **RBAC is subject-based.** Clearance-based MAC is also subject-based. Wrong-answer pattern: claiming RBAC is the only subject-based model.
- **Context-based is the Zero Trust enabler.** Time of day, location, device posture. Wrong-answer pattern: claiming Zero Trust uses only subject-based decisions — context (especially device posture) is core.
- **ABAC synthesizes all three axes.** Subject + Object + Action + Environment per NIST 800-162. Wrong-answer pattern: classifying ABAC as only context-based.
- **Role explosion breaks subject-based scaling.** "One role per project per env" destroys RBAC. Wrong-answer pattern: claiming RBAC is infinitely scalable — it scales only with disciplined role design.
- **Classification inconsistency breaks object-based.** Same data labeled differently in different systems = inconsistent enforcement. Wrong-answer pattern: assuming classification scales itself.

### Values without a direct public citation

| Cell | Notes |
|---|---|
| All rows × scalability | Scalability framings are CISSP / industry pedagogical synthesis; NIST SP 800-162 [s1] does not directly enumerate scalability properties per axis. |
| All rows × example | Examples are illustrative; real systems combine multiple axes in any given decision. |

## Engine demo opportunities

- `Subject-based | basis for decision → ?` → `Attributes of the requester`
- `Object-based | basis for decision → ?` → `Attributes of the resource`
- `Context-based | basis for decision → ?` → `Environmental conditions at request time`
- `? | basis for decision → Attributes of the requester` → `Subject-based`
- `Context-based | example → ?` → `Time of day`, `Source IP`, `Device posture`
- `? | example → File classification` → `Object-based` (sub-Fact in multi-Fact cell)
- Composite Subject-based Row with `basis for decision` swapped to `Environmental conditions at request time` — directly tests the axis discrimination (subject-based keys on the requester; context-based keys on environment)
- Composite Object-based Row with `example` swapped to `Time of day`, `Source IP` — tests that context attributes are not object attributes
- Composite Context-based Row with `basis for decision` swapped to `Attributes of the resource` — tests context vs object discrimination

## Sources

- `[s1]`: NIST SP 800-162, "Guide to Attribute Based Access Control (ABAC) Definition and Considerations" — Subject, Object, Operation, Environment attribute categories (January 2014, retrieved 2026-04-26, https://csrc.nist.gov/pubs/sp/800/162/upd2/final)
- `[s2]`: NIST SP 800-178, "A Comparison of Attribute Based Access Control (ABAC) Standards for Data Service Applications" — comparative analysis of authorization standards (October 2016, retrieved 2026-04-26, https://nvlpubs.nist.gov/nistpubs/specialpublications/nist.sp.800-178.pdf)
