# SIEM vs SOAR vs XDR

**Domain:** 7 — Security Operations &nbsp;|&nbsp; **Pattern:** Dimensions &nbsp;|&nbsp; **Tags:** 7.2
**Status:** draft (SME review pending)

The three security-operations platforms organizations layer to move from raw log data to executed response. SIEM ingests logs and produces alerts; SOAR ingests alerts and produces executed response actions; XDR is a vertically-integrated alternative that handles both detection and response within a single vendor's data plane. The CISSP exam tests the matchup between platform and primary capability — particularly the SIEM/SOAR pipeline and the SIEM-vs-XDR overlap.

| platform | core function | automation level | typical inputs | typical outputs |
|---|---|---|---|---|
| SIEM | Aggregate and analyze security event data [s1] | Detection automated; response manual [s1] | Log data from heterogeneous sources [s1] | Alerts for analyst triage [s1] |
| SOAR | Orchestrate automated incident response [s1] | Response automated via playbooks [s1] | Alerts from SIEM and XDR [s1] | Executed response actions [s1] |
| XDR | Correlate detection across endpoint, network, cloud [s1] | Detection and initial response automated [s1] | Telemetry from native security stack [s1] | Correlated incidents [s1]<br>Automated containment actions [s1] |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. No parentheticals in cells.
- **Tag 7.2 retained from stub.** Matches (ISC)² 2024 outline §7.2 *Conduct logging and monitoring activities*. Sibling Concepts: `log-analysis-methods.md` (the analytical methods these platforms host), `continuous-monitoring.md` (the streams they monitor).
- **SIEM and SOAR are a pipeline.** SIEM aggregates logs from many sources, applies correlation rules, and emits alerts. SOAR ingests those alerts and runs playbook automation to triage and respond. Together they form a detection-and-remediation pipeline; alone, each is incomplete (SIEM without SOAR generates more alerts than analysts can chase; SOAR without SIEM has no detection input).
- **XDR overlaps both.** XDR collapses the SIEM-detection layer and parts of the SOAR-response layer into a single vendor stack. The trade-off: XDR is faster to deploy and tighter in correlation across that vendor's products, but it cannot ingest arbitrary log sources the way SIEM can. Most large enterprises run *both* — XDR for the integrated vendor data plane and SIEM as the catch-all for everything else.
- **The vendor-lock dimension.** XDR's strength is its tight integration; the corresponding weakness is that you have committed to one vendor's telemetry definitions and detection logic. SIEM's strength is data-source agnostic; the weakness is that integrating heterogeneous sources is operationally heavy. The exam may present this trade-off as the discriminator.
- **What is intentionally not on this table.** EDR (Endpoint Detection and Response) is the host-side feed that XDR consumes; it lives in the anti-malware Concept (`anti-malware-technologies.md`) as a row. NDR (Network Detection and Response) and MDR (Managed Detection and Response) are adjacent acronyms; could be added as rows in a future revision but are less heavily tested.
- **Automation level is a spectrum, not a binary.** All three platforms automate something — what differs is *what* and *how much*. SIEM automates alerting; SOAR automates response; XDR automates the pipeline between them. The "Detection automated; response manual" Fact for SIEM captures the common production reality, not a hard limit (modern SIEMs do orchestrate basic responses; SOAR does it better).
- **Gaps marked `[needs source]`:** none — all Facts trace to Gartner definitions via published practitioner summaries.

### Tricky distractors

- **SIEM detects; SOAR responds.** Pipeline: SIEM → alert → SOAR → action. Wrong-answer pattern: claiming SIEM auto-responds to incidents — modern SIEMs do basic orchestration but SOAR is the canonical response platform.
- **XDR collapses both into one vendor stack.** Tight integration, vendor lock-in. Wrong-answer pattern: claiming XDR replaces SIEM entirely — XDR can't ingest arbitrary log sources.
- **EDR ≠ XDR.** EDR is endpoint-only; XDR is cross-domain. Wrong-answer pattern: equating them — XDR includes EDR plus network and cloud.
- **SOAR uses playbooks.** Pre-defined response automation. Wrong-answer pattern: claiming SOAR makes ad-hoc decisions — it executes scripted playbooks.
- **SIEM is data-source agnostic.** Strength and weakness — universal but operationally heavy. Wrong-answer pattern: claiming SIEM only ingests one vendor's telemetry — SIEM's premise is heterogeneous ingestion.
- **Most enterprises run all three.** XDR for integrated stack + SIEM for catch-all + SOAR for response. Wrong-answer pattern: claiming organizations should pick one — they layer all three.

## Engine demo opportunities

- `? | core function → Orchestrate automated incident response` → SOAR
- `SIEM | typical inputs → ?` → `Log data from heterogeneous sources`
- `? | typical outputs → Alerts for analyst triage` → SIEM
- `XDR | core function → ?` → `Correlate detection across endpoint, network, cloud`
- `SOAR | typical inputs → ?` with `Log data from heterogeneous sources` (SIEM) and `Telemetry from native security stack` (XDR) as distractors
- Composite Row profile: SIEM across all Columns with `automation level` swapped to `Response automated via playbooks` (SOAR's value)

## Sources

- `[s1]`: Gartner platform definitions for SIEM, SOAR, and XDR — sourced via D3 Security, TechTarget, and Mimecast summaries (retrieved 2026-04-25, https://d3security.com/blog/xdr-vs-siem-vs-soar/ and https://www.techtarget.com/searchsecurity/tip/SIEM-vs-SOAR-vs-XDR-Evaluate-the-differences)
- `[s2]`: (ISC)² CISSP Certification Exam Outline, effective 2024-04-15, Domain 7 §7.2 *Conduct logging and monitoring activities* (retrieved 2026-04-25, https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline)
