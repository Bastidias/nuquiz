# (ISC)² Code of Ethics Canons

**Domain:** 1 — Security and Risk Management &nbsp;|&nbsp; **Pattern:** Ordered &nbsp;|&nbsp; **Tags:** 1.1
**Status:** draft (SME review pending)

The four canons of the (ISC)² Code of Ethics, in their official preference order. CISSP candidates must agree to abide by them. Tested for verbatim recognition, intent, and conflict resolution (when canons appear to compete, the *lower-numbered* canon takes priority — that's why this is an Ordered Concept, not Dimensions).

**Layout convention:** rows are canons in priority order. Columns are attributes of each canon, left → right from authoritative quote (Text) to plain-language meaning (Intent) to concrete failure mode (Example violation).

| Canon | Text | Intent | Example violation |
|---|---|---|---|
| 1 | Protect society, the common good, necessary public trust and confidence, and the infrastructure | Public welfare comes first when interests conflict | Knowingly leaving a critical safety system vulnerable to coerce a client |
| 2 | Act honorably, honestly, justly, responsibly, and legally | Personal conduct must be above reproach | Misrepresenting credentials on a security assessment report |
| 3 | Provide diligent and competent service to principals | Skill and effort are owed to those who depend on you | Charging for a vulnerability assessment without performing one |
| 4 | Advance and protect the profession | The reputation of the field is each member's responsibility | Publicly disparaging the profession or fellow CISSPs without basis |

## Notes

- **Cell convention:** each cell holds one atomic fact. The Text column contains verbatim canon wording from (ISC)² — the "and" inside is part of the official text and is exempt from atomization (treat as a quoted identifier).
- **Canon order matters.** When two canons appear to conflict, the lower-numbered canon takes priority. Society (Canon 1) outranks personal honor (Canon 2), which outranks duty to a client (Canon 3), which outranks profession (Canon 4). Classic exam scenario question.
- **Verbatim wording is testable.** Some questions present a canon and ask which one it is, or test specific phrasing.
- One of the smallest Concepts in the deck (~12 facts) — fully fleshable. Use as a benchmark for what "complete" looks like at the small end.
- Consider an additional Concept: **Canon conflict resolution scenarios** — paired situations where two canons collide and the student must pick the higher-priority obligation.
- Engine demo opportunities:
  - `Canon 2 | Intent → ?` → Personal conduct must be above reproach.
  - `? | Intent → Public welfare comes first when interests conflict` → Canon 1.
  - `Canon 3 | Example violation → ?` → Charging for a vulnerability assessment without performing one.
  - Conflict resolution (sequence-derived): `min(Canon n where Canon n ∈ {Canon 1, Canon 2})` → Canon 1. The lower-numbered canon wins; this is a structural Fact carried by the Row order.

### Tricky distractors

- **Canon ordering is priority, not chronology.** Lower-numbered canons outrank higher-numbered ones in conflicts. Wrong-answer pattern: treating the canons as equal weight or alphabetizing them.
- **Society outranks principals.** Canon 1 (society) > Canon 3 (principals/clients). Wrong-answer pattern: choosing client confidentiality over public safety — society wins.
- **Honor outranks client duty.** Canon 2 > Canon 3. Wrong-answer pattern: claiming you must follow a client's unethical instruction to fulfill duty — Canon 2 prevails.
- **Profession is last.** Canon 4 (profession) yields to all three earlier canons. Wrong-answer pattern: protecting the profession's reputation by hiding facts that affect public safety.
- **Verbatim wording is testable.** Exam may quote a canon and ask which number. Wrong-answer pattern: paraphrasing canon text — recognize the official wording.
- **Code applies to CISSPs even outside (ISC)² work.** Personal conduct under Canon 2 covers off-the-clock behavior. Wrong-answer pattern: claiming the code only applies during paid engagements.
