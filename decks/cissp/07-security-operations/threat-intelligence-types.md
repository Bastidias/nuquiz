# Threat Intelligence Types

**Domain:** 7 — Security Operations &nbsp;|&nbsp; **Pattern:** Dimensions &nbsp;|&nbsp; **Tags:** 7.2

**Status:** draft (SME review pending)

The four canonical levels of cyber threat intelligence. Each pairs an *audience* with the *content* that audience needs, the *timeframe* the intel is relevant for, and a *typical use*. Strategic intel informs C-suite risk decisions; tactical intel describes attacker behavior at the TTP level; operational intel covers specific campaigns and adversaries; technical intel is the IoC stream that feeds detection tooling. The CISSP exam tests both the per-level definition and the audience-to-content matchup — particularly that strategic intel does not contain IP addresses and that technical intel does not contain board-level recommendations.

| Type | audience | content | timeframe | typical use |
|---|---|---|---|---|
| Strategic | Executive leadership and board [s1] | Long-term trends<br>Geopolitical drivers<br>Industry threat landscape [s1] | Months to years [s1] | Risk-based investment decisions [s1] |
| Tactical | Security architects and detection engineers [s1] | Adversary tactics, techniques, and procedures [s1] | Months [s1] | Detection engineering<br>Architecture hardening [s1] |
| Operational | Incident responders and threat hunters [s1] | Specific campaigns<br>Named adversary activity<br>Attribution context [s1] | Days to weeks [s1] | Incident response<br>Proactive threat hunting [s1] |
| Technical | SOC analysts and detection systems [s1] | Indicators of compromise<br>Malware hashes<br>Malicious IPs and domains [s1] | Hours to days [s1] | Automated SIEM and EDR feeds [s1] |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. **No parentheticals in cells.** Acronym expansions live in this section.
- **Acronym expansions.** `TTP` = Tactics, Techniques, and Procedures. `IoC` = Indicator of Compromise. `STIX` = Structured Threat Information eXpression. `TAXII` = Trusted Automated eXchange of Indicator Information. `MISP` = Malware Information Sharing Platform. `CTI` = Cyber Threat Intelligence.
- **Pyramid of Pain orders technical indicators.** David Bianco's "Pyramid of Pain" ranks indicators by how hard they are for an attacker to change: hash values (trivial to change) → IP addresses → domain names → network/host artifacts → tools → TTPs (hardest). Detection on lower-pyramid indicators is reactive and easily evaded; detection on TTPs (tactical intel territory) imposes the most cost on attackers. The exam may not test the pyramid by name but tests its underlying principle — IoC-only defense is brittle.
- **TTPs map to MITRE ATT&CK.** Tactical-intel content is best expressed as MITRE ATT&CK technique IDs (T1059 Command and Scripting Interpreter, T1003 OS Credential Dumping, etc.). ATT&CK is the dominant framework for cataloguing adversary TTPs across the kill chain. Detection content (Sigma rules, SIEM correlations) is increasingly mapped to ATT&CK technique IDs for traceability.
- **STIX and TAXII are the standard exchange formats.** STIX is the data model for threat intelligence (indicators, threat actors, campaigns, TTPs); TAXII is the transport protocol for sharing STIX content between parties. OASIS standardized both. ISACs (Information Sharing and Analysis Centers — sectoral threat-sharing bodies) typically use STIX/TAXII for member sharing.
- **Audience-content mismatch is the canonical wasted-investment pattern.** Many CTI programs fail by feeding strategic-level reports to SOC analysts (who need IoCs to update detections) or feeding raw IoC dumps to executives (who need risk framing). Mature programs explicitly tier their intel by audience and route accordingly.
- **Operational intel is campaign-anchored.** Examples: "APT29's recent SVR-attributed phishing campaign uses Excel documents with embedded JavaScript loaders dropping the GraphicalProton backdoor; current targeting is European foreign ministries." The intel names a specific adversary, time window, and TTP set — actionable for IR and threat hunting against the same adversary in your environment.
- **Technical intel has shortest shelf life.** A malicious IP becomes irrelevant when the attacker rotates infrastructure. Hashes change with each malware build. Detection content based on technical IoCs requires constant refresh; detection content based on tactical TTPs is more durable.
- **Cross-Concept link.** Sibling Concept `siem-soar-xdr` covers the platforms that consume technical intel. `incident-response-phases` covers the IR process that operational intel supports. `computer-crime-categories` in D1 covers attacker motivation that strategic intel addresses. Sibling `log-analysis-methods` covers UEBA / ML detection — increasingly tied to tactical-intel TTP enrichment.
- **Out of scope for this Concept:** specific CTI vendors (Mandiant, Recorded Future, CrowdStrike, Mandiant Advantage), Diamond Model of Intrusion Analysis, kill-chain frameworks (Lockheed Martin Cyber Kill Chain, Unified Kill Chain), threat-actor naming conventions (CrowdStrike "BEAR" vs Microsoft "Storm" vs Mandiant "APT" numbering), CTI program maturity models, deception technology (covered in `honeypot-types`), CTI feed quality measurement.

### Tricky distractors

- **Strategic ≠ Technical.** Strategic is for executives; Technical is for SOC tooling. Wrong-answer pattern: feeding IoC dumps to executives — they need risk framing.
- **Tactical = TTPs.** Tactics, Techniques, Procedures from MITRE ATT&CK. Wrong-answer pattern: claiming tactical intel is malicious IPs — that's technical.
- **Operational is campaign-anchored.** Specific adversary activity, named campaigns. Wrong-answer pattern: collapsing operational and tactical — operational is *who* is doing it; tactical is *how* attackers in general operate.
- **Technical intel has the shortest shelf life.** Hashes and IPs change quickly. Wrong-answer pattern: claiming technical intel is the most durable — it's the most ephemeral.
- **Pyramid of Pain rewards TTP detection.** Detecting at TTP level is hardest for attackers to evade. Wrong-answer pattern: claiming hash-based detection imposes the most cost on attackers — it's trivially evaded.
- **STIX and TAXII are different.** STIX = data model. TAXII = transport. Wrong-answer pattern: collapsing them — different layers.

### Values without a direct public citation

| Cell | Value | Why unsourced |
|---|---|---|
| All rows × audience | Audience labels | NIST SP 800-150 [s1] discusses CTI audience tiers; specific "Executive leadership and board" / "SOC analysts" labels are pedagogical summaries from CTI vendor framing rather than direct quotations. |
| All rows × timeframe | Categorical durations | Practitioner consensus framing; specific timeframe ranges vary by source and program maturity. |
| All rows × typical use | Use phrasings | Pedagogical summaries from CTI program literature; not direct NIST quotes per cell. |

## Engine demo opportunities

- `Strategic | audience → ?` → `Executive leadership and board`
- `Technical | content → ?` → `Indicators of compromise`, `Malware hashes`, `Malicious IPs and domains`
- `Tactical | content → ?` → `Adversary tactics, techniques, and procedures`
- `? | audience → SOC analysts and detection systems` → `Technical`
- `? | timeframe → Months to years` → `Strategic`
- `? | timeframe → Hours to days` → `Technical`
- `? | content → Specific campaigns` → `Operational` (sub-Fact in multi-Fact cell)
- `? | typical use → Risk-based investment decisions` → `Strategic`
- `Operational | typical use → ?` → `Incident response`, `Proactive threat hunting`
- Composite Strategic Row with `content` swapped to `Indicators of compromise`, `Malware hashes`, `Malicious IPs and domains` — directly tests the strategic/technical confusion (executives don't read IoC dumps)
- Composite Technical Row with `audience` swapped to `Executive leadership and board` — tests the inverse (technical IoCs don't go to executives)
- Composite Tactical Row with `content` swapped to `Long-term trends`, `Geopolitical drivers` — tests tactical-vs-strategic distinction (tactical is TTP-level; strategic is trend-level)

## Sources

- `[s1]`: NIST SP 800-150, "Guide to Cyber Threat Information Sharing" — strategic, tactical, operational, technical CTI tier framing (October 2016, retrieved 2026-04-30, https://csrc.nist.gov/publications/detail/sp/800-150/final)
- `[s2]`: MITRE ATT&CK Framework — tactical-intel TTP catalogue (retrieved 2026-04-30, https://attack.mitre.org/)
- `[s3]`: David Bianco, "The Pyramid of Pain" — indicator hierarchy by detection-evasion difficulty (retrieved 2026-04-30, https://detect-respond.blogspot.com/2013/03/the-pyramid-of-pain.html)
- `[s4]`: OASIS, "STIX 2.1" and "TAXII 2.1" specifications — threat intelligence data model and exchange protocol (retrieved 2026-04-30, https://oasis-open.github.io/cti-documentation/)
- `[s5]`: (ISC)² CISSP Certification Exam Outline, effective 2024-04-15, Domain 7 §7.2 *Conduct logging and monitoring activities* (retrieved 2026-04-30, https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline)
