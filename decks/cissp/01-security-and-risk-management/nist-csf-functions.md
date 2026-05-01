# NIST CSF Functions

**Domain:** 1 — Security and Risk Management &nbsp;|&nbsp; **Pattern:** Dimensions &nbsp;|&nbsp; **Tags:** 1.2, 1.10
**Status:** draft (SME review pending)

The six top-level Functions of the NIST Cybersecurity Framework (CSF) 2.0, released February 26, 2024 [s2]. CSF 2.0 organizes the cybersecurity-risk lifecycle into Functions → Categories → Subcategories. The version-defining change vs. CSF 1.1 is the addition of **Govern** as a sixth Function alongside the original five (Identify, Protect, Detect, Respond, Recover) [s1][s2]. CISSP testing focuses on what each Function is *for*, the named Categories under each, and the Govern-vs-Identify boundary that trips up candidates studying older 1.x material.

| Function | focus | named Categories | example outcomes |
|---|---|---|---|
| Govern | Establish cybersecurity risk-management strategy [s1]<br>Establish cybersecurity expectations [s1]<br>Establish cybersecurity policy [s1] | Organizational Context [s1]<br>Risk Management Strategy [s1]<br>Roles, Responsibilities, and Authorities [s1]<br>Policy [s1]<br>Oversight [s1]<br>Cybersecurity Supply Chain Risk Management [s1] | Risk-management strategy is approved [s1]<br>Cybersecurity roles are assigned [s1]<br>Supply-chain risk requirements are established [s1] |
| Identify | Understand current cybersecurity risks [s1] | Asset Management [s1]<br>Risk Assessment [s1]<br>Improvement [s1] | Hardware inventory is maintained [s3]<br>Software inventory is maintained [s3]<br>Risks to the organization are identified [s1] |
| Protect | Use safeguards to manage cybersecurity risks [s1] | Identity Management, Authentication, and Access Control [s4]<br>Awareness and Training [s4]<br>Data Security [s4]<br>Platform Security [s4]<br>Technology Infrastructure Resilience [s4] | Authorized users are authenticated [s4]<br>Personnel receive cybersecurity training [s4]<br>Data confidentiality is protected [s4] |
| Detect | Find possible cybersecurity attacks [s1]<br>Analyze possible cybersecurity attacks [s1] | Continuous Monitoring [s5]<br>Adverse Event Analysis [s5] | Networks are monitored for adverse events [s5]<br>Indicators of compromise are analyzed [s5] |
| Respond | Take actions on a detected incident [s1] | Incident Management [s6]<br>Incident Analysis [s6]<br>Incident Response Reporting and Communication [s6]<br>Incident Mitigation [s6] | Incident is triaged [s6]<br>Root cause is documented [s6]<br>Stakeholders are notified [s6]<br>Incident is contained [s6] |
| Recover | Restore assets affected by an incident [s1]<br>Restore operations affected by an incident [s1] | Incident Recovery Plan Execution [s7]<br>Incident Recovery Communication [s7] | Recovery plan is executed [s7]<br>Restoration assets are verified [s7]<br>Recovery progress is communicated [s7] |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. **No parentheticals in cells.** Function and Category identifiers (GV, ID, PR, DE, RS, RC, GV.OC, etc.) live in this Notes section, not in cells, to avoid masking shared Values.
- **Function identifiers.** `GV` = Govern. `ID` = Identify. `PR` = Protect. `DE` = Detect. `RS` = Respond. `RC` = Recover.
- **Govern Category identifiers.** `GV.OC` = Organizational Context. `GV.RM` = Risk Management Strategy. `GV.RR` = Roles, Responsibilities, and Authorities. `GV.PO` = Policy. `GV.OV` = Oversight. `GV.SC` = Cybersecurity Supply Chain Risk Management.
- **Identify Category identifiers.** `ID.AM` = Asset Management. `ID.RA` = Risk Assessment. `ID.IM` = Improvement. (CSF 1.1's Business Environment, Governance, and Risk Management Strategy moved into Govern; ID.IM is new in 2.0, absorbing the old Improvements subcategories scattered across other Functions.)
- **Protect Category identifiers.** `PR.AA` = Identity Management, Authentication, and Access Control. `PR.AT` = Awareness and Training. `PR.DS` = Data Security. `PR.PS` = Platform Security. `PR.IR` = Technology Infrastructure Resilience. (CSF 1.1's PR.IP Information Protection Processes and Procedures, PR.MA Maintenance, and PR.PT Protective Technology were reorganized into PR.PS and PR.IR in 2.0.)
- **Detect Category identifiers.** `DE.CM` = Continuous Monitoring. `DE.AE` = Adverse Event Analysis. (CSF 1.1's DE.DP Detection Processes was absorbed into Govern and Improve.)
- **Respond Category identifiers.** `RS.MA` = Incident Management. `RS.AN` = Incident Analysis. `RS.CO` = Incident Response Reporting and Communication. `RS.MI` = Incident Mitigation.
- **Recover Category identifiers.** `RC.RP` = Incident Recovery Plan Execution. `RC.CO` = Incident Recovery Communication.
- **Govern is the headline change in CSF 2.0.** NIST released CSF 2.0 on February 26, 2024 [s2], 10 years after CSF 1.0 (February 2014) and 6 years after CSF 1.1 (April 2018). Govern was elevated from a Category under Identify (ID.GV in CSF 1.1) to its own top-level Function, reflecting the framework's repositioning toward enterprise risk management rather than purely technical safeguards [s2].
- **Govern wraps the other five Functions.** NIST visualizes Govern as a ring around the original five-Function wheel — every other Function operates within the strategy, policy, roles, and oversight that Govern establishes [s1]. This is the conceptual model CISSP tests.
- **CSF 2.0 expanded scope beyond critical infrastructure.** CSF 1.x was scoped to critical infrastructure operators; CSF 2.0 explicitly applies to organizations of any size or sector [s2].
- **Cybersecurity Supply Chain Risk Management (GV.SC) is a notable elevation.** In CSF 1.1, supply-chain risk was a sub-area of Identify (ID.SC). CSF 2.0 moves it into Govern as GV.SC, signaling that supply-chain risk decisions are governance-level, not asset-level [s1].
- **The Function definitions are the high-yield exam material.** Memorize the one-line purpose for each: Govern = establish strategy/expectations/policy; Identify = understand risks; Protect = use safeguards; Detect = find/analyze attacks; Respond = take action on incidents; Recover = restore assets/operations [s1]. CISSP question stems frequently quote these or close paraphrases.
- **Functions are not a sequence.** CSF documentation is explicit that the Functions operate concurrently and continuously — Detect doesn't wait for Protect to "finish." Candidates conditioned by sequential frameworks (incident response phases, BCP phases) sometimes treat the Functions as ordered. They aren't.
- **Out of scope for this Concept:** the 100+ Subcategories under each Category, CSF Implementation Tiers (Tier 1 Partial through Tier 4 Adaptive), CSF Profiles (Current Profile vs. Target Profile), and the relationship to NIST RMF / SP 800-37 / SP 800-53. Each warrants its own Concept.

### Tricky distractors

- **CSF 2.0 has six Functions; CSF 1.x had five.** Pre-2.0 study material lists only Identify, Protect, Detect, Respond, Recover. If a question says "the five Functions of the NIST Cybersecurity Framework," the question is referencing CSF 1.x — Govern was added in February 2024 [s2]. Trust the version the stem cites.
- **Govern vs. Identify.** Both relate to organizational understanding. Govern is *strategy, policy, roles, and oversight* (top-down decisions); Identify is *current risks, assets, and improvement opportunities* (bottom-up inventory and assessment). Where supply-chain risk lives moved between the two: CSF 1.1 placed it in Identify (ID.SC); CSF 2.0 placed it in Govern (GV.SC) [s1].
- **Respond vs. Recover.** Respond is *during the incident* (triage, contain, communicate, mitigate). Recover is *after containment* (restore systems, resume operations, post-incident communication). Stakeholder communication appears in both — incident-status communication during the event is RS.CO; recovery-progress communication during restoration is RC.CO.
- **PR.AA combines three CSF 1.1 categories.** CSF 1.1 had separate PR.AC Access Control, PR.IP for some identity processes, and PR.MA. CSF 2.0's PR.AA merges Identity Management, Authentication, and Access Control into one Category. Candidates studying old material may look for PR.AC and not find it.
- **Detect ≠ SOC tooling alone.** DE.CM Continuous Monitoring is broader than SIEM/log monitoring — it covers personnel activity, physical environment, and external service-provider activity. Candidates who equate Detect with "the SOC's job" will miss DE.AE Adverse Event Analysis questions about correlating signals across sources.

### Values without a direct public citation

| Cell | Value | Why unsourced |
|---|---|---|
| Identify × example outcomes | `Risks to the organization are identified` | Paraphrase of the Identify Function purpose [s1] rather than a quoted ID.RA Subcategory outcome. Replace with a specific ID.RA-NN Subcategory text in SME pass. |
| Protect × example outcomes | `Authorized users are authenticated`, `Personnel receive cybersecurity training`, `Data confidentiality is protected` | Paraphrases of PR.AA, PR.AT, PR.DS Category intent rather than quoted Subcategory text. |
| Detect × example outcomes | `Indicators of compromise are analyzed` | Paraphrase of DE.AE Category intent. |
| Respond × example outcomes | `Incident is triaged`, `Root cause is documented`, `Stakeholders are notified`, `Incident is contained` | Paraphrases of RS.MA / RS.AN / RS.CO / RS.MI Category intent rather than quoted Subcategory text. |
| Recover × example outcomes | `Recovery plan is executed`, `Restoration assets are verified`, `Recovery progress is communicated` | Drawn from the SP 800-61r3 / RC.RP / RC.CO Subcategories surfaced in [s7]; phrased to fit the cell. SME should replace with the exact Subcategory text from CSF 2.0 Appendix A. |

## Engine demo opportunities

- `Govern | focus → ?` → `Establish cybersecurity risk-management strategy`, `Establish cybersecurity expectations`, `Establish cybersecurity policy` (multi-Fact cell)
- `Identify | focus → ?` → `Understand current cybersecurity risks`
- `Protect | focus → ?` → `Use safeguards to manage cybersecurity risks`
- `? | focus → Use safeguards to manage cybersecurity risks` → `Protect`
- `? | named Categories → Cybersecurity Supply Chain Risk Management` → `Govern` — directly tests the GV.SC vs. ID.SC migration
- `? | named Categories → Asset Management` → `Identify`
- `? | named Categories → Continuous Monitoring` → `Detect`
- `? | named Categories → Incident Recovery Plan Execution` → `Recover`
- `Respond | named Categories → ?` → `Incident Management`, `Incident Analysis`, `Incident Response Reporting and Communication`, `Incident Mitigation` (multi-Fact cell)
- Composite Govern Row with `focus` swapped to `Understand current cybersecurity risks` — directly tests Govern-vs-Identify boundary
- Composite Respond Row with `named Categories` swapped to `Incident Recovery Plan Execution` — tests Respond-vs-Recover boundary
- Composite Identify Row with `named Categories` swapped to `Cybersecurity Supply Chain Risk Management` — tests CSF 1.1 vs CSF 2.0 placement of supply-chain risk

## Sources

- `[s1]`: NIST Cybersecurity Framework (CSF) 2.0, NIST CSWP 29 — defines the six Functions and their Categories (February 26, 2024, retrieved 2026-04-26, https://nvlpubs.nist.gov/nistpubs/CSWP/NIST.CSWP.29.pdf)
- `[s2]`: NIST press release "NIST Releases Version 2.0 of Landmark Cybersecurity Framework" — confirms release date and addition of Govern as the sixth Function (February 26, 2024, retrieved 2026-04-26, https://www.nist.gov/news-events/news/2024/02/nist-releases-version-20-landmark-cybersecurity-framework)
- `[s3]`: NIST CSF 2.0 reference for the Identify Function — ID.AM Asset Management Subcategory text including hardware and software inventory (retrieved 2026-04-26, https://csf.tools/reference/nist-cybersecurity-framework/v2-0/id/id-am/)
- `[s4]`: NIST CSF 2.0 Protect (PR) Function reference — PR.AA, PR.AT, PR.DS, PR.PS, PR.IR Categories (retrieved 2026-04-26, https://csf.tools/reference/nist-cybersecurity-framework/v2-0/)
- `[s5]`: NIST CSF 2.0 Detect (DE) Function reference — DE.CM Continuous Monitoring and DE.AE Adverse Event Analysis Categories (retrieved 2026-04-26, https://csf.tools/reference/nist-cybersecurity-framework/v2-0/)
- `[s6]`: NIST SP 800-61 Rev. 3, "Incident Response Recommendations and Considerations for Cybersecurity Risk Management: A CSF 2.0 Community Profile" — RS.MA, RS.AN, RS.CO, RS.MI Category alignment (retrieved 2026-04-26, https://csrc.nist.gov/pubs/sp/800/61/r3/final)
- `[s7]`: NIST CSF 2.0 Recover (RC) Function reference — RC.RP Incident Recovery Plan Execution and RC.CO Incident Recovery Communication Subcategory text (retrieved 2026-04-26, https://csf.tools/reference/nist-cybersecurity-framework/v2-0/)
