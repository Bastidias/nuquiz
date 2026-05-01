# Penetration Test Phases

**Domain:** 6 — Security Assessment and Testing &nbsp;|&nbsp; **Pattern:** Ordered &nbsp;|&nbsp; **Tags:** 6.2
**Status:** draft (SME review pending)

The five phases NIST SP 800-115 [s1] defines for a penetration test. Ordered because the phases proceed in sequence — discovery output drives attack, attack output drives reporting, reporting drives remediation, and remediation testing closes the loop. Some texts use a 7-phase model (PTES) that splits Discovery into Reconnaissance + Vulnerability Analysis and adds a Pre-engagement phase; CISSP uses the NIST 5-phase model.

**Layout convention:** rows are phases in sequence from initial scoping through verified remediation. Columns are attributes of each phase ordered left → right from least detail (Name) to most detail (Typical Output).

| Phase | Name | Key Activity | Typical Output |
|---|---|---|---|
| 1 | Planning | Define scope<br>Set rules of engagement<br>Obtain written authorization [s1] | Statement of work<br>Rules of engagement document |
| 2 | Discovery | Reconnaissance<br>Vulnerability identification [s1] | Target inventory<br>Vulnerability list |
| 3 | Attack | Exploit identified vulnerabilities<br>Escalate privileges<br>Pivot through environment [s1] | Proven attack chains<br>Captured evidence |
| 4 | Reporting | Document findings<br>Rank by severity<br>Recommend remediation [s1] | Pen test report<br>Executive summary |
| 5 | Remediation testing | Verify fixes<br>Confirm closure | Remediation verification report |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. **No parentheticals in cells.**
- **Authorization is the most important Phase 1 deliverable.** Without written authorization (a "Get Out of Jail Free" letter from the system owner), the penetration test is legally indistinguishable from unauthorized hacking. Rules of Engagement (RoE) document scope, timing, target lists, prohibited actions, and emergency contacts. Pen tests that begin before the RoE is signed are professional malpractice.
- **Discovery is largely passive.** Reconnaissance phase activities — DNS enumeration, OSINT collection, port scanning, banner grabbing — are conducted with minimal target interaction. Vulnerability identification (active scanning) is the boundary where Discovery becomes potentially disruptive. Many authorities split Discovery into a reconnaissance sub-phase and an enumeration sub-phase.
- **Attack is the only phase that exploits.** The most-tested CISSP framing: vulnerability scans (covered in `assessment-types`) stop after Discovery; penetration tests proceed to Attack. The act of exploitation — actually triggering a vulnerability to gain access — is what distinguishes a pen test from a vulnerability scan.
- **Privilege escalation and pivoting.** Real pen tests rarely stop at first foothold. Escalation (gaining higher privileges on a compromised system) and pivoting (using a compromised system to attack adjacent systems) demonstrate realistic attack chains. The Reporting phase organizes these into demonstrated attack paths against business-critical assets.
- **Reporting drives remediation.** The pen test report ranks findings by severity, often using CVSS or a custom risk score, and recommends remediation actions. Executive summary translates technical findings into business risk for non-technical readers. Quality of reporting often determines whether remediation actually happens.
- **Remediation testing closes the loop.** A retest after remediation verifies that fixes actually work — and that they didn't introduce new vulnerabilities. PCI DSS and other regulations sometimes require formal remediation testing for high-severity findings.
- **PTES is the alternative model.** The Penetration Testing Execution Standard splits this into seven phases: Pre-engagement, Intelligence Gathering, Threat Modeling, Vulnerability Analysis, Exploitation, Post-Exploitation, Reporting. CISSP uses NIST 5-phase; SME pass should confirm against current exam outline if PTES becomes the dominant framing.
- **Out of scope for this Concept:** pen test perspectives (sibling Concept `pen-test-perspectives` — black/grey/white box), specific tooling (Metasploit, Burp Suite, Cobalt Strike, Mimikatz), red-team-specific phases beyond pen test (C2 infrastructure setup, long-term persistence), purple-team exercises, breach-and-attack simulation (BAS) platforms.

### Tricky distractors

- **Authorization is non-negotiable.** Without RoE and written approval, pen test = unauthorized access. Wrong-answer pattern: starting Discovery before signed authorization — that's a legal problem.
- **Pen test exploits; vuln scan doesn't.** The exploitation step (Phase 3) is the dividing line. Wrong-answer pattern: claiming vulnerability scans are pen tests — they stop after Discovery.
- **Discovery includes both passive and active.** Reconnaissance is passive; vulnerability ID is active. Wrong-answer pattern: claiming Discovery is purely passive — active scanning is part of it.
- **Privilege escalation is in Attack phase.** Not a separate phase. Wrong-answer pattern: classifying escalation/pivoting as Reporting — they're attack-phase activities.
- **Reporting ranks findings by severity.** Often CVSS or custom risk score. Wrong-answer pattern: claiming reports just list findings — ranking and remediation guidance are required.
- **Remediation testing verifies fixes.** Re-test after remediation. Wrong-answer pattern: claiming pen tests end at Reporting — Phase 5 closes the loop.

### Values without a direct public citation

| Cell | Notes |
|---|---|
| Phase 5 × all cells | NIST SP 800-115 [s1] discusses post-test remediation but the explicit fifth-phase framing is from CISSP study materials and PTES; not directly quoted from NIST. |
| Phase 4 × Typical Output | `Pen test report`, `Executive summary` are common-practice deliverables, not direct NIST quotes. |

## Engine demo opportunities

- `Phase 1 | Name → ?` → `Planning`
- `Phase 3 | Name → ?` → `Attack`
- `Phase 5 | Name → ?` → `Remediation testing`
- `Phase 1 | Key Activity → ?` → `Define scope`, `Set rules of engagement`, `Obtain written authorization`
- `? | Name → Discovery` → `Phase 2`
- `? | Key Activity → Exploit identified vulnerabilities` → `Phase 3` (sub-Fact in multi-Fact cell)
- `? | Typical Output → Pen test report` → `Phase 4` (sub-Fact in multi-Fact cell)
- Sequence (adjacency): `Phase following (Phase n | Name → Discovery) | Name → ?` → `Attack`
- Sequence (adjacency): `Phase preceding (Phase n | Name → Reporting) | Name → ?` → `Attack`
- Composite Phase 1 Row with `Key Activity` swapped to `Exploit identified vulnerabilities` — directly tests the planning-vs-attack boundary (Planning sets up scope and authorization; Attack exploits)
- Composite Phase 2 Row with `Typical Output` swapped to `Proven attack chains`, `Captured evidence` — tests the discovery-vs-attack distinction (Discovery enumerates; Attack exploits and captures evidence)
- Composite Phase 4 Row with `Name` swapped to `Discovery` — tests phase ordering (Reporting comes after Attack, not at Discovery)

## Sources

- `[s1]`: NIST SP 800-115, "Technical Guide to Information Security Testing and Assessment" §5.2 Penetration Testing (September 2008, retrieved 2026-04-26, https://csrc.nist.gov/publications/detail/sp/800-115/final)
- `[s2]`: PTES (Penetration Testing Execution Standard) — alternative 7-phase model for cross-reference (retrieved 2026-04-26, http://www.pentest-standard.org/)
