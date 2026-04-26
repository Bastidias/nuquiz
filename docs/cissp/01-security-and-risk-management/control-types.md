# Control Types

**Domain:** 1 — Security and Risk Management &nbsp;|&nbsp; **Pattern:** Dimensions &nbsp;|&nbsp; **Tags:** 1.10
**Status:** draft (SME review pending)

The three control types CISSP courseware uses to classify security controls by *how they are implemented*: administrative (policies and people), technical (hardware and software), and physical (tangible barriers). This is orthogonal to the *category* taxonomy in `control-categories.md` — a single control has both a type (how) and a category (when/why). The CISSP exam tests both axes and the matchup between them.

| type | definition | example | typical owner |
|---|---|---|---|
| Administrative | Policy and procedure controls executed by people [s1] | Security awareness training [s1] | HR or compliance team [needs source] |
| Technical / Logical | Hardware and software controls executed by systems [s1] | Access control list [s1] | IT security team [needs source] |
| Physical | Tangible barrier controls in the built environment [s1] | Door lock [s1] | Facilities or security team [needs source] |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. No parentheticals in cells.
- **Tag 1.10 retained from stub.** Sibling Concept: `control-categories.md` (the orthogonal timing/role taxonomy).
- **Type and category are orthogonal.** A firewall is technical *and* preventive. A security camera is physical *and* deterrent. A policy is administrative *and* directive. Every control has both a type and a category. CISSP questions often present a control and ask the student to classify on one axis or the other.
- **Why "Technical / Logical" is one row.** Some references distinguish technical controls (the implementation) from logical controls (the abstract concept). In CISSP usage they are synonymous; "technical" is the more common term. Logical is the older terminology, retained as an alternate name.
- **Administrative includes more than training.** The administrative category covers policies, standards, procedures, hiring practices, background checks, separation of duties enforcement, and security awareness programs — anything where the *control mechanism is human behavior governed by documented expectation*.
- **Physical includes the obvious and the subtle.** Door locks, fences, security guards, and biometric readers are obvious physical controls. Less obvious: site selection, building hardening (CPTED), HVAC for equipment cooling, fire suppression systems. Anything where the control mechanism is in the built environment counts.
- **Why typical owner matters.** The owner column is not just trivia — it determines who must be involved in implementing or auditing the control. A security audit failure for an administrative control likely needs HR or compliance to remediate; a technical control failure goes to the IT team; a physical control failure goes to facilities. Ownership ambiguity is a common audit finding.
- **Gaps marked `[needs source]`:** three Facts — typical owner for each row. Practitioner consensus but not yet sourced to a primary publication.

## Engine demo opportunities

- `? | example → Door lock` → Physical
- `Technical / Logical | definition → ?` → `Hardware and software controls executed by systems`
- `? | typical owner → IT security team` → Technical / Logical
- `Administrative | example → ?` → `Security awareness training`
- `Physical | typical owner → ?` with `IT security team` (Technical) and `HR or compliance team` (Administrative) as distractors
- Composite Row profile: Technical / Logical across all Columns with `example` swapped to `Door lock` (Physical's value)

## Sources

- `[s1]`: NIST SP 800-12 Rev. 1 *An Introduction to Information Security*, June 2017 — control type framing (administrative, technical, physical) (retrieved 2026-04-26, https://csrc.nist.gov/pubs/sp/800/12/r1/final)
- `[s2]`: (ISC)² CISSP Certification Exam Outline, effective 2024-04-15, Domain 1 (retrieved 2026-04-26, https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline)
