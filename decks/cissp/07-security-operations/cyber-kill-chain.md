# Cyber Kill Chain

**Domain:** 7 — Security Operations &nbsp;|&nbsp; **Pattern:** Ordered &nbsp;|&nbsp; **Tags:** 7.6, 1.11

**Status:** draft (SME review pending)

The seven sequential phases of Lockheed Martin's Cyber Kill Chain [s1] — a defender-oriented model that decomposes a successful intrusion into the steps an attacker must complete to achieve their objective. Each phase represents a *defender opportunity* — disrupting the chain at any step prevents downstream impact. The CISSP exam tests both the phase ordering and the matchup between attacker activity and the canonical defensive control at that phase. Sibling Concept `threat-intelligence-types` covers the tactical-intel that maps onto these phases via MITRE ATT&CK.

**Layout convention:** rows are ordered chronologically (Phase 1 = earliest, Phase 7 = final). Columns progress from identifier (Phase, Name) through attacker action to defensive opportunity.

| Phase | Name | attacker activity | defender opportunity |
|---|---|---|---|
| 1 | Reconnaissance | Research target<br>Identify employees<br>Map external attack surface [s1] | OSINT monitoring<br>Attack-surface management [s1] |
| 2 | Weaponization | Pair exploit with deliverable payload [s1] | Exploit-detection signatures<br>Threat intelligence on emerging payloads [s1] |
| 3 | Delivery | Transmit weaponized payload to target [s1] | Email security<br>Web filtering<br>USB control [s1] |
| 4 | Exploitation | Trigger vulnerability to execute attacker code [s1] | Patch management<br>Application allowlisting<br>Endpoint protection [s1] |
| 5 | Installation | Install persistent access mechanism [s1] | Endpoint detection and response<br>File integrity monitoring [s1] |
| 6 | Command and Control | Establish communication channel back to attacker [s1] | DNS filtering<br>Egress filtering<br>Network detection [s1] |
| 7 | Actions on Objectives | Achieve attacker goal of data theft or destruction [s1] | Data loss prevention<br>Encryption at rest<br>Privileged access controls [s1] |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. **No parentheticals in cells.** Acronym expansions live in this section.
- **Acronym expansions.** `OSINT` = Open-Source Intelligence. `EDR` = Endpoint Detection and Response. `DLP` = Data Loss Prevention. `C2` = Command and Control. `TTP` = Tactics, Techniques, and Procedures.
- **Origin.** The Cyber Kill Chain was published by Lockheed Martin researchers Hutchins, Cloppert, and Amin in 2011 [s1]. It was the first widely-adopted intrusion-decomposition model and shaped a generation of detection and response programs. CISSP testing treats it as the canonical kill-chain framework even as alternatives have emerged.
- **Defender's leverage is asymmetric — break any link.** The attacker must succeed at every phase to achieve their objective. The defender only has to disrupt one phase to prevent the outcome. This is the principle behind layered defense: redundant controls at multiple phases mean a single control failure does not result in compromise.
- **Reconnaissance is harder to disrupt than later phases.** The attacker is operating outside the target's environment — collecting public information, scanning external infrastructure, social-engineering employees. Defensive controls (OSINT monitoring, attack-surface management) reduce visibility but rarely eliminate it. The chain becomes more disruptable as the attacker moves into the target environment.
- **Weaponization is also outside-the-environment.** Pairing an exploit with a delivery wrapper happens on the attacker's side. Detection signatures developed from threat intelligence (someone *else* observed the weapon and fingerprinted it) are the primary defender opportunity here. This is one of the rationales for threat-intel sharing programs.
- **C2 is the choke point most defenders prioritize.** Once the attacker has installed access, they need to communicate with it to extract value. Egress filtering, DNS-over-HTTPS interception, certificate pinning enforcement, and beacon-pattern detection all target the C2 phase. Modern adversaries use legitimate cloud services (Slack, Discord, GitHub Issues) to evade naive C2 detection.
- **Actions on Objectives covers both data theft and destruction.** Original Lockheed paper named this phase "Actions on Objectives" as a generalization — the goal could be exfiltration, ransomware, sabotage, or persistent strategic foothold. CISSP framing aligns with this generality.
- **Alternative kill-chain frameworks.** The Unified Kill Chain (Pols, 2017) extends Lockheed's seven phases to 18 across initial foothold, network propagation, and action. MITRE ATT&CK maps adversary TTPs across 14 tactics that loosely correspond to kill-chain phases but with finer granularity. The Diamond Model of Intrusion Analysis (Caltagirone, Pendergast, Betz) takes a different approach — an analyst's framework rather than a phase chain. CISSP testing primarily uses Lockheed's seven-phase model.
- **Cross-Concept link.** Sibling Concept `incident-response-phases` covers the IR process that triggers when the kill chain is detected mid-execution. `threat-intelligence-types` covers the tactical-intel that informs detection at each phase. `mitre-attack-tactics` (if added in future) would be the per-phase TTP mapping. `stride-categories` in D1 covers Microsoft's threat taxonomy as an alternative angle.
- **Out of scope for this Concept:** specific MITRE ATT&CK technique mappings per phase, Unified Kill Chain detail, Diamond Model formalization, kill-chain-specific threat hunting playbooks, ransomware-specific kill chains (which compress into "actions on objectives"), specific C2 frameworks (Cobalt Strike, Sliver, Mythic).

### Tricky distractors

- **Defender breaks one link to disrupt entire chain.** Asymmetric advantage. Wrong-answer pattern: claiming defender must defend at every phase — only one disruption is needed.
- **Reconnaissance is hardest to disrupt.** Outside attacker's environment. Wrong-answer pattern: claiming recon is the easiest defense point — easy to detect maybe, hard to actually prevent.
- **Phase ordering.** Recon → Weapon → Delivery → Exploit → Install → C2 → Objectives. Wrong-answer pattern: putting Installation before Exploitation — exploit is what enables installation.
- **C2 is post-installation.** After persistence is established. Wrong-answer pattern: putting C2 before Installation — without installed access, there's nothing to command.
- **Lockheed's model has 7 phases.** Not 5, not 9. Wrong-answer pattern: counting phases incorrectly — exam tests the count.
- **Unified Kill Chain ≠ Lockheed Kill Chain.** Different models. Wrong-answer pattern: applying Unified's 18 phases when question asks about Lockheed.

### Values without a direct public citation

| Cell | Value | Why unsourced |
|---|---|---|
| All rows × defender opportunity | Specific defensive controls | The original Lockheed paper [s1] frames the defender-opportunity concept; specific control mappings ("DNS filtering for C2", "DLP for actions on objectives") are pedagogical synthesis from defender-program literature, not direct quotations from Lockheed. |
| All rows × attacker activity | Activity descriptions | Paraphrases of Lockheed's [s1] phase descriptions; CISSP-curriculum summaries rather than verbatim quotes. |

## Engine demo opportunities

- `Phase 1 | Name → ?` → `Reconnaissance`
- `Phase 7 | Name → ?` → `Actions on Objectives`
- `? | Name → Weaponization` → `Phase 2`
- `? | Name → Command and Control` → `Phase 6`
- `Phase 4 | attacker activity → ?` → `Trigger vulnerability to execute attacker code`
- `? | attacker activity → Establish communication channel back to attacker` → `Phase 6`
- `Phase 6 | defender opportunity → ?` → `DNS filtering`, `Egress filtering`, `Network detection`
- `? | defender opportunity → Email security` → `Phase 3` (sub-Fact in multi-Fact cell)
- Sequence verification: `Phase 3 → ? → Phase 5` → Phase 4 (Exploitation) — tests Ordered-Pattern progression
- Sequence verification: `Phase 5 → ? → Phase 7` → Phase 6 (Command and Control)
- Composite Phase 5 Row with `Name` swapped to `Command and Control` — directly tests phase ordering (Installation precedes C2)
- Composite Phase 1 Row with `defender opportunity` swapped to `Data loss prevention` — tests phase-to-control pairing (DLP belongs at Actions on Objectives, not Reconnaissance)
- Composite Phase 4 Row with `attacker activity` swapped to `Install persistent access mechanism` — tests Exploitation-vs-Installation distinction (exploit triggers code; install establishes persistence)

## Sources

- `[s1]`: Hutchins, Cloppert, and Amin, "Intelligence-Driven Computer Network Defense Informed by Analysis of Adversary Campaigns and Intrusion Kill Chains," Lockheed Martin Corporation, 2011 — original Cyber Kill Chain publication (retrieved 2026-04-30, https://www.lockheedmartin.com/content/dam/lockheed-martin/rms/documents/cyber/LM-White-Paper-Intel-Driven-Defense.pdf)
- `[s2]`: Lockheed Martin, "The Cyber Kill Chain" overview page (retrieved 2026-04-30, https://www.lockheedmartin.com/en-us/capabilities/cyber/cyber-kill-chain.html)
- `[s3]`: Paul Pols, "The Unified Kill Chain" (Cyber Security Academy, 2017) — alternative 18-phase model for cross-reference (retrieved 2026-04-30, https://www.unifiedkillchain.com/)
- `[s4]`: MITRE ATT&CK Framework — TTP-level mapping that aligns with kill-chain phases (retrieved 2026-04-30, https://attack.mitre.org/)
- `[s5]`: (ISC)² CISSP Certification Exam Outline, effective 2024-04-15, Domain 7 §7.6 *Conduct incident management* and Domain 1 §1.11 *Apply Supply Chain Risk Management (SCRM) concepts* (retrieved 2026-04-30, https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline)
