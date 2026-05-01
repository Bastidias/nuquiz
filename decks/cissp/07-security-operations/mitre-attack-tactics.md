# MITRE ATT&CK Enterprise Tactics

**Domain:** 7 — Security Operations &nbsp;|&nbsp; **Pattern:** Ordered &nbsp;|&nbsp; **Tags:** 7.2, 7.6

**Status:** draft (SME review pending)

The fourteen Enterprise tactics in MITRE ATT&CK [s1] — adversary goals organized into a kill-chain-like progression. Each tactic is the *why* behind a set of techniques; ATT&CK technique IDs map to the tactic they support. CISSP testing rewards being able to recognize tactic names, place them in approximate order, and match them to representative attacker activities. Sibling Concept `cyber-kill-chain` covers Lockheed's seven-phase model; ATT&CK extends it with finer granularity and explicit pre-compromise tactics.

**Layout convention:** rows are presented in the canonical Enterprise-matrix order shown on attack.mitre.org [s1]. Real intrusions iterate across tactics rather than walking strictly top-to-bottom — Privilege Escalation may follow Discovery, Collection may precede Lateral Movement — but the row order matches the framework's standard presentation.

| Tactic | ID | adversary goal | example technique |
|---|---|---|---|
| Reconnaissance | TA0043 | Gather information to plan operations [s1] | Active Scanning [s1] |
| Resource Development | TA0042 | Establish resources to support operations [s1] | Acquire Infrastructure [s1] |
| Initial Access | TA0001 | Get into the network [s1] | Phishing [s1] |
| Execution | TA0002 | Run adversary-controlled code [s1] | Command and Scripting Interpreter [s1] |
| Persistence | TA0003 | Maintain foothold across reboots [s1] | Scheduled Task<br>Boot or Logon Autostart Execution [s1] |
| Privilege Escalation | TA0004 | Gain higher-level permissions [s1] | Exploitation for Privilege Escalation [s1] |
| Defense Evasion | TA0005 | Avoid being detected [s1] | Obfuscated Files or Information [s1] |
| Credential Access | TA0006 | Steal account names and passwords [s1] | OS Credential Dumping [s1] |
| Discovery | TA0007 | Map the environment [s1] | Account Discovery<br>Network Service Discovery [s1] |
| Lateral Movement | TA0008 | Move through the environment [s1] | Remote Services<br>Pass the Hash [s1] |
| Collection | TA0009 | Gather data of interest [s1] | Data from Local System [s1] |
| Command and Control | TA0011 | Communicate with compromised systems [s1] | Application Layer Protocol [s1] |
| Exfiltration | TA0010 | Steal data out of the environment [s1] | Exfiltration Over C2 Channel [s1] |
| Impact | TA0040 | Manipulate, interrupt, or destroy [s1] | Data Encrypted for Impact<br>Service Stop [s1] |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. **No parentheticals in cells.** Tactic IDs (`TA0043`) and technique names use the canonical ATT&CK spelling.
- **Acronym expansions.** `TA` = Tactic identifier prefix in ATT&CK. `T` = Technique identifier prefix. `TTP` = Tactics, Techniques, and Procedures. `IoC` = Indicator of Compromise.
- **Tactics vs Techniques vs Sub-techniques.** A *tactic* is the adversary's goal (the *why*). A *technique* is how they achieve it (the *how*). A *sub-technique* is a specific variation of a technique. Example: Tactic = Credential Access (TA0006); Technique = OS Credential Dumping (T1003); Sub-technique = LSASS Memory (T1003.001). CISSP testing usually operates at the tactic level; the technique level appears in advanced detection-engineering contexts.
- **Pre-compromise tactics extend the kill chain.** Lockheed's Kill Chain starts at Reconnaissance and ends at Actions on Objectives. ATT&CK's Reconnaissance and Resource Development tactics formalize the pre-compromise portion (information gathering, infrastructure setup) that the original kill chain treated as a single phase. Initial Access onward maps closely to Lockheed's Delivery → Exploitation → Installation phases.
- **Order is canonical, not strict.** ATT&CK's matrix presents tactics left-to-right in the order shown above. Real intrusions are non-linear — adversaries may run Discovery and Lateral Movement repeatedly, may skip Privilege Escalation if they landed with sufficient privileges, may run Collection before Lateral Movement. The matrix order is for navigation, not a phase prescription.
- **Impact is intentionally last.** Whether the impact is destructive (ransomware, wiper), denial-of-service, or fraud-driven, ATT&CK groups all final-stage destructive outcomes under Impact. Encrypting files for ransom is `Data Encrypted for Impact (T1486)`; service disruption is `Service Stop (T1489)`. Exfiltration is treated as a separate tactic because data theft happens *during* an operation, not necessarily at the end.
- **Defense Evasion is cross-cutting.** Many techniques span tactics — disabling AV serves Defense Evasion, but the same action may also support Initial Access, Persistence, or Privilege Escalation. ATT&CK sometimes lists a technique under multiple tactics. The framework prioritizes "what was the adversary's goal at this moment" over "which category does this action belong to."
- **Mobile and ICS matrices exist.** ATT&CK Enterprise covers Windows, macOS, Linux, cloud (Azure AD, Office 365, AWS, GCP, Google Workspace), and containers. Separate matrices exist for Mobile (iOS, Android) and ICS (industrial control systems). CISSP testing primarily references Enterprise; the existence of the other matrices may be tested at recognition level.
- **Cross-Concept link.** Sibling Concept `cyber-kill-chain` covers Lockheed's seven-phase model — coarser-grained but the conceptual ancestor. `threat-intelligence-types` covers tactical-intel TTPs that map onto ATT&CK technique IDs. `incident-response-phases` covers the IR process that detections built on ATT&CK feed into. `siem-soar-xdr` covers the platforms where ATT&CK-mapped detection content is operationalized.
- **Out of scope for this Concept:** specific technique IDs (T-numbers) and sub-techniques per tactic, ATT&CK Mobile and ICS matrices, ATT&CK Navigator visualization, MITRE D3FEND defensive countermeasure framework, ATT&CK Evaluations vendor results, ATT&CK Workbench customization, ATT&CK update cadence (yearly major versions plus interim updates).

### Tricky distractors

- **Tactics ≠ Techniques.** Tactic = goal. Technique = method. Wrong-answer pattern: confusing them — "Phishing" is a technique under Initial Access tactic; "Initial Access" is the tactic.
- **Reconnaissance is in the matrix.** ATT&CK's first tactic. Wrong-answer pattern: claiming ATT&CK starts at Initial Access — Reconnaissance and Resource Development precede it as pre-compromise tactics.
- **Real intrusions are non-linear.** Tactics are not sequential phases. Wrong-answer pattern: claiming Lateral Movement always follows Privilege Escalation — they may iterate or occur in different order.
- **Impact is the destructive tactic.** Final-stage outcome. Wrong-answer pattern: classifying ransomware encryption as Exfiltration — encryption-for-ransom is Impact (T1486), not Exfil.
- **Exfiltration ≠ Impact.** Data theft vs disruption/destruction. Wrong-answer pattern: collapsing them — they're separate tactics for separate adversary goals.
- **ATT&CK has 14 Enterprise tactics.** Not 12, not 16. Wrong-answer pattern: counting tactics incorrectly — exam tests the count.

### Values without a direct public citation

| Cell | Value | Why unsourced |
|---|---|---|
| (none) | — | All tactic names, IDs, goals, and example techniques sourced directly from MITRE ATT&CK Enterprise Matrix [s1]. |

## Engine demo opportunities

- `Reconnaissance | ID → ?` → `TA0043`
- `Initial Access | ID → ?` → `TA0001`
- `Impact | ID → ?` → `TA0040`
- `? | ID → TA0006` → `Credential Access`
- `? | ID → TA0011` → `Command and Control`
- `Persistence | example technique → ?` → `Scheduled Task`, `Boot or Logon Autostart Execution`
- `? | adversary goal → Steal account names and passwords` → `Credential Access`
- `? | adversary goal → Avoid being detected` → `Defense Evasion`
- `? | adversary goal → Map the environment` → `Discovery`
- `Exfiltration | example technique → ?` → `Exfiltration Over C2 Channel`
- Sequence (matrix order): `Tactic following (Tactic | Name → Initial Access) | Name → ?` → `Execution`
- Sequence (matrix order): `Tactic following (Tactic | Name → Lateral Movement) | Name → ?` → `Collection`
- Composite Impact Row with `adversary goal` swapped to `Steal data out of the environment` (Exfiltration's value) — directly tests the Impact-vs-Exfiltration distinction (Impact is destructive; Exfiltration is theft)
- Composite Initial Access Row with `example technique` swapped to `OS Credential Dumping` (Credential Access's value) — tests technique-to-tactic mapping (credential dumping is Credential Access, not Initial Access)
- Composite Reconnaissance Row with `ID` swapped to `TA0001` (Initial Access's ID) — tests tactic-ID memorization

## Sources

- `[s1]`: MITRE ATT&CK Enterprise Matrix v15+ — fourteen-tactic taxonomy with adversary goals and example techniques (retrieved 2026-04-30, https://attack.mitre.org/matrices/enterprise/)
- `[s2]`: MITRE ATT&CK, "Tactics" landing page — canonical descriptions of each tactic's adversary goal (retrieved 2026-04-30, https://attack.mitre.org/tactics/enterprise/)
- `[s3]`: MITRE ATT&CK White Paper, "MITRE ATT&CK: Design and Philosophy" by Strom et al. (March 2020 revision, retrieved 2026-04-30, https://attack.mitre.org/docs/ATTACK_Design_and_Philosophy_March_2020.pdf)
- `[s4]`: (ISC)² CISSP Certification Exam Outline, effective 2024-04-15, Domain 7 §7.2 *Conduct logging and monitoring activities* and §7.6 *Conduct incident management* (retrieved 2026-04-30, https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline)
