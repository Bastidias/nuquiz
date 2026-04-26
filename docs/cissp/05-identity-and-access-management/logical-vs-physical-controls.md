# Logical vs Physical Controls

**Domain:** 5 — Identity and Access Management &nbsp;|&nbsp; **Pattern:** Dimensions &nbsp;|&nbsp; **Tags:** 5.1
**Status:** draft (SME review pending)

The three control-implementation categories CISSP candidates are expected to discriminate. Logical controls operate on data and systems via software (passwords, ACLs, encryption); Physical controls operate on people and equipment in the physical world (locks, fences, biometrics at doors); Administrative controls operate on people and processes via policy (background checks, training, separation of duties). The three categories are *not* mutually exclusive at the goal level — a single security objective often deploys all three (e.g., "protect the data center" = administrative policy + physical access controls + logical access logs).

| Type | mechanism | example | typical owner |
|---|---|---|---|
| Logical | Software-enforced rules on data and systems | ACLs<br>Passwords<br>Encryption | IT security team |
| Physical | Hardware and barriers in the physical world | Door locks<br>Fences<br>Mantraps | Facilities security |
| Administrative | Policies and procedures applied to people | Background checks<br>Training<br>Separation of duties | Security governance |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. **No parentheticals in cells.**
- **Three categories vs three orthogonal axes.** This Concept categorizes controls by *implementation mechanism* (software, hardware, policy). A separate axis — *control function* (preventive, detective, corrective, etc.) — is covered in the D1 Concept `control-categories`. Both axes apply to every control: a password is Logical (mechanism) and Preventive (function); a CCTV is Physical (mechanism) and Detective (function); an audit log review is Administrative (mechanism) and Detective (function). CISSP testing often combines the two axes ("which is a physical preventive control" — a fence; "which is an administrative detective control" — an audit).
- **Logical = "technical" in some texts.** ISC2 and NIST literature mostly use "technical" controls; CISSP study materials use "logical" interchangeably. Both refer to software-enforced controls on systems and data. This Concept uses "Logical" to match the D1 sibling Concept `control-types` row name.
- **Administrative controls are policy in action.** Background checks, security training programs, mandatory vacations, separation-of-duties enforcement, change-control approvals — all are administrative because they operate on people and processes through documented policy rather than through technology or barriers. The owner is typically Security Governance or HR-Security partnership rather than IT or Facilities.
- **Physical controls overlap with Logical at biometric readers.** A biometric door reader is Physical (it gates access to a room) but uses Logical components (a fingerprint matcher, a database). CISSP treats it as Physical because the *purpose* is physical access. The door is the boundary; the matcher is implementation detail.
- **Owner column is typical-case.** Real organizations may centralize all controls under a single CISO function or distribute them across IT, Facilities, HR, and Compliance. The cell values reflect the modal assignment in mid-to-large enterprises.
- **Out of scope for this Concept:** control-function classification (covered in D1 `control-categories`), specific compensating-control framings (often used by PCI DSS), CIA-aligned classification (controls aimed at confidentiality vs integrity vs availability), NIST control families (AC, AU, IA, etc. — covered indirectly throughout the IAM domain).

### Values without a direct public citation

| Cell | Value | Why unsourced |
|---|---|---|
| All rows × typical owner | Owner descriptions | Industry-typical assignments; no normative public source mandates these specific ownership patterns. |
| All rows × example | Example lists | CISSP-pedagogical examples; widely taught but not from a single primary source. |

## Engine demo opportunities

- `Logical | example → ?` → `ACLs`, `Passwords`, `Encryption`
- `Physical | example → ?` → `Door locks`, `Fences`, `Mantraps`
- `Administrative | example → ?` → `Background checks`, `Training`, `Separation of duties`
- `? | mechanism → Software-enforced rules on data and systems` → `Logical`
- `? | mechanism → Policies and procedures applied to people` → `Administrative`
- `? | example → ACLs` → `Logical` (sub-Fact in multi-Fact cell)
- `? | example → Background checks` → `Administrative` (sub-Fact in multi-Fact cell)
- Composite Logical Row with `mechanism` swapped to `Hardware and barriers in the physical world` — directly tests the Logical/Physical distinction (Logical operates on data; Physical operates on the physical world)
- Composite Administrative Row with `example` swapped to `Door locks`, `Fences` — tests the policy-vs-barrier distinction (Administrative is policy; Physical is barrier)
- Composite Physical Row with `example` swapped to `ACLs`, `Encryption` — tests that ACLs/encryption are Logical, not Physical

## Sources

- `[s1]`: NIST SP 800-53 Rev 5, "Security and Privacy Controls for Information Systems and Organizations" — control families implicitly aligned to the technical/operational/management split (September 2020 baseline, retrieved 2026-04-26, https://csrc.nist.gov/publications/detail/sp/800-53/rev-5/final)
- `[s2]`: NIST CSRC Glossary — definitions of "technical control," "physical control," "management/administrative control" (retrieved 2026-04-26, https://csrc.nist.gov/glossary)
