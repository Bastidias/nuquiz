# Containment Strategies

**Domain:** 7 — Security Operations &nbsp;|&nbsp; **Pattern:** Dimensions &nbsp;|&nbsp; **Tags:** 7.6
**Status:** draft (SME review pending)

Three containment-phase activities from NIST SP 800-61 incident response. Short-term containment limits immediate damage; long-term containment provides a stable holding pattern while engineering builds a clean replacement; system backup before eradication captures evidence and recovery state before the response team destroys the compromised configuration. The CISSP exam tests the *trade-off* between containment speed and evidence preservation — moving too fast destroys forensic artifacts, moving too slow allows damage to spread.

| strategy | when used | tradeoffs | evidence preservation |
|---|---|---|---|
| Short-term containment | Immediately upon incident detection [s1] | Speed prioritized over thoroughness [s1]<br>May trigger destructive malware payloads [s1] | Preserves volatile evidence if isolation is fast [s2] |
| Long-term containment | After short-term measures stabilize the incident [s1] | Slower but more thorough [s1]<br>Allows engineering time for clean rebuild [s1] | Allows capture of full disk images before eradication [s2] |
| System backup before eradication | Before any eradication action [s1] | Adds time to recovery [needs source]<br>Required for forensic preservation [s2] | Captures full system state for later analysis [s2] |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. No parentheticals in cells.
- **Tag 7.6 retained from stub.** Matches (ISC)² 2024 outline §7.6 *Conduct incident management*. Sibling Concept: `incident-response-phases.md`.
- **The NIST SP 800-61 containment-strategy criteria.** NIST SP 800-61 Rev. 2 §3.3.1 lists six criteria the IR team weighs when selecting a containment approach: potential damage, evidence preservation needs, service availability impact, time/resources to implement, strategy effectiveness, and solution duration [s1]. This Concept's three rows describe *strategies*, not the *criteria*; if a future Concept needs the criteria themselves, they would be a separate Concept (e.g., `containment-criteria.md`).
- **Why "system backup before eradication" is a row even though it sits between containment and eradication.** NIST SP 800-61 treats it as a containment-phase prerequisite to eradication: "hosts should be backed up before they are eradicated and recovered" [s1]. The stub author included it because a CISSP question asking "which containment-phase activity preserves the most forensic evidence" expects it as an answer. Treating it as a row keeps it addressable.
- **The destructive-payload risk.** The most-tested CISSP nuance: some malware monitors for containment actions (process termination, network isolation, sandbox detection) and triggers destructive payloads in response. Short-term containment can therefore cause *more* damage, not less. The IR team must weigh this risk against the cost of letting the attack continue.
- **Delayed containment (intentionally not a row).** NIST SP 800-61 also describes a "delayed containment" strategy in which the attacker is allowed to continue activity under heavy monitoring, typically to gather threat intelligence or identify scope. Out of scope for this Concept's three-row decomposition; could be a fourth row in a future revision.
- **Evidence preservation links to chain of custody.** The three Facts in the evidence-preservation column are the *inputs* to the chain-of-custody process documented in `evidence-handling-chain.md`. NIST SP 800-86 is the primary forensic-handling reference [s2].
- **Gaps marked `[needs source]`:** one Fact — "Adds time to recovery" as a tradeoff for system backup. Widely accepted but not yet sourced to a primary publication in this research pass.

## Engine demo opportunities

- `? | when used → Immediately upon incident detection` → Short-term containment
- `Long-term containment | tradeoffs → ?` → `Slower but more thorough` or `Allows engineering time for clean rebuild`
- `? | evidence preservation → Captures full system state for later analysis` → System backup before eradication
- `Short-term containment | tradeoffs → ?` with `Slower but more thorough` (Long-term) and `Required for forensic preservation` (Backup) as distractors
- Composite Row profile: Short-term containment across all Columns with `evidence preservation` swapped to `Allows capture of full disk images before eradication` (Long-term's value)

## Sources

- `[s1]`: NIST SP 800-61 Rev. 2 *Computer Security Incident Handling Guide*, August 2012, §3.3 Containment, Eradication, and Recovery — particularly §3.3.1 *Choosing a Containment Strategy* (retrieved 2026-04-25, https://csrc.nist.gov/pubs/sp/800/61/r2/final) — characterizations cited via NIST-derived practitioner summaries (Saylor Academy, klogix, Compliance 360) since direct PDF extraction was unavailable
- `[s2]`: NIST SP 800-86 *Guide to Integrating Forensic Techniques into Incident Response*, August 2006 (retrieved 2026-04-25, https://csrc.nist.gov/pubs/sp/800/86/final) — for evidence-preservation framing
- `[s3]`: (ISC)² CISSP Certification Exam Outline, effective 2024-04-15, Domain 7 §7.6 *Conduct incident management* (retrieved 2026-04-25, https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline)
