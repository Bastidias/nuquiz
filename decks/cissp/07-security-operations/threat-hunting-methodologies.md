# Threat Hunting Methodologies

**Domain:** 7 — Security Operations &nbsp;|&nbsp; **Pattern:** Dimensions &nbsp;|&nbsp; **Tags:** 7.2

**Status:** draft (SME review pending)

The four threat-hunting methodologies CISSP candidates are expected to discriminate. Threat hunting is *proactive* search for adversaries assumed to be present — distinct from detection (signature-based alerting on known patterns) and incident response (reactive after detection fires). Each methodology pairs a *starting point* with *typical inputs*, *strengths*, and *weaknesses*. Sibling Concept `threat-intelligence-types` feeds tactical and operational intel into hunting; `mitre-attack-tactics` provides the TTP catalogue most TTP-driven hunting consumes.

| Methodology | starting point | typical inputs | strengths | weaknesses |
|---|---|---|---|---|
| Hypothesis-driven | Analyst-formed hypothesis about adversary behavior [s1] | Threat intelligence<br>Environment knowledge<br>MITRE ATT&CK [s1] | Catches novel TTPs not yet in detection content<br>Builds analyst tradecraft [s1] | Quality depends on analyst expertise<br>Hypothesis selection is unstructured [s1] |
| Indicator-driven | Specific indicator of compromise from external source [s1] | Threat intel feed IoCs<br>Industry sharing reports [s1] | Fast to execute against logs<br>Clear pass-or-fail outcome [s1] | Bounded to known indicators<br>Misses post-IoC variants | Limited dwell-time discovery for novel campaigns |
| TTP-driven | Specific MITRE ATT&CK technique [s2] | ATT&CK technique IDs<br>Detection content libraries [s2] | Reusable<br>Maps directly to defender frameworks<br>Stronger than indicator-driven [s2] | Requires detection-engineering skill<br>Coverage depends on logging completeness [s2] |
| Anomaly-driven | Statistical deviation from baseline behavior [s3] | UEBA baselines<br>Network flow records<br>Endpoint telemetry [s3] | Detects unknown unknowns<br>Surfaces insider risk and account takeover [s3] | High false-positive rate<br>Requires mature baselining [s3] |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. **No parentheticals in cells.** Acronym expansions live in this section.
- **Acronym expansions.** `IoC` = Indicator of Compromise. `TTP` = Tactics, Techniques, and Procedures. `UEBA` = User and Entity Behavior Analytics. `ATT&CK` = Adversarial Tactics, Techniques, and Common Knowledge (MITRE). `EDR` = Endpoint Detection and Response. `XDR` = Extended Detection and Response. `SIEM` = Security Information and Event Management. `Sqrrl` = early threat-hunting platform (AWS-acquired, now Amazon Detective lineage).
- **Hunting vs Detection vs Incident Response.** Detection runs continuously and alerts on known-bad patterns (signatures, rules). Incident response activates *after* detection (or external notification) — investigates, contains, eradicates. Hunting is *proactive* — assumes adversaries are present, searches for them in the absence of alerts. The hunting program produces detection content as a side effect: a successful hunt becomes a new detection rule.
- **Pyramid of Pain favors TTP-driven.** David Bianco's Pyramid of Pain (covered in `threat-intelligence-types`) ranks indicator types by attacker-evasion difficulty: hash → IP → domain → tool → TTP. Hunting at the TTP layer imposes the most cost on adversaries because changing TTPs requires retooling, not just rotating infrastructure. Indicator-driven hunting catches what's already public; TTP-driven catches behavior that persists across campaigns.
- **Hypothesis-driven is the analyst-tradecraft methodology.** Sqrrl's Threat Hunting Reference Model (now part of Amazon's hunting guidance) frames hunting as: form hypothesis → identify data sources → test hypothesis → respond if confirmed → improve detection content. Hypotheses come from threat intelligence ("APT29 is targeting our sector with X technique"), environment knowledge ("our developers commonly run PowerShell, but legitimate use looks like Y"), or pure analyst inference ("if I were attacking us, I'd do Z").
- **Anomaly-driven hunting is UEBA territory.** Statistical baselines of normal user and entity behavior; deviations flag for review. Effective for insider threats, account takeover, and lateral movement that doesn't trip signature-based detection. The trade-off is high false-positive rate — natural variability in human behavior produces frequent benign deviations. Tuning takes months; mature programs treat anomaly-driven as one input among several rather than primary.
- **Crown jewel hunting is a planning approach.** Some programs structure hunting around the highest-value assets: which adversary actions would target the customer database? what would lateral movement to the production environment look like? Hunt for those specifically. Not represented as a separate Row because it's an *organizing principle* rather than a methodology — applies on top of any of the four rows.
- **SANS Hunting Maturity Model.** SANS / Sqrrl publish a five-level maturity model: HMM0 (initial, ad hoc), HMM1 (minimal, IoC-driven), HMM2 (procedural, applies others' procedures), HMM3 (innovative, develops new procedures), HMM4 (leading, automates hunts to detection content). The methodology mix evolves up the ladder: low-maturity programs are mostly indicator-driven; mature programs run hypothesis-driven and TTP-driven hunts and feed results back into automated detection.
- **Cross-Concept link.** Sibling Concept `threat-intelligence-types` covers tactical and operational intel that drives hypotheses. `mitre-attack-tactics` provides the technique catalogue for TTP-driven hunting. `cyber-kill-chain` covers the broader intrusion lifecycle. `siem-soar-xdr` covers the platforms hunters use to query data. `log-analysis-methods` covers the analytical methods (rule-based, ML, UEBA) hunting deploys.
- **Out of scope for this Concept:** specific hunting platforms (Splunk Enterprise Security, Elastic Hunting, Microsoft Sentinel hunting queries, AWS GuardDuty, CrowdStrike Falcon Data Replicator), ATT&CK Navigator usage for coverage mapping, MITRE D3FEND for defense mapping, threat-hunting team org-chart and skills (analyst vs hunter vs detection engineer), purple-team exercises that combine red-team operation with blue-team hunting.

### Tricky distractors

- **Hunting is proactive; detection is reactive.** Different posture. Wrong-answer pattern: claiming hunting and detection are the same — hunting assumes adversary is present absent alerts.
- **TTP-driven beats indicator-driven on pyramid of pain.** Adversary cost asymmetry. Wrong-answer pattern: claiming IoC hunting is more durable — IoCs change every campaign.
- **Hypothesis-driven requires analyst expertise.** Quality depends on hunter. Wrong-answer pattern: claiming hypothesis-driven works without skilled analysts — quality scales with skill.
- **Anomaly-driven has high false positives.** Statistical deviations are noisy. Wrong-answer pattern: claiming anomaly hunting produces clean results — the FP rate is its main weakness.
- **Successful hunt produces detection content.** Hunt → rule. Wrong-answer pattern: claiming hunting and detection-engineering are separate disciplines that never feed each other — they're tightly coupled in mature programs.
- **Crown jewel hunting is organizing, not a methodology.** Where to focus, not how to hunt. Wrong-answer pattern: classifying crown-jewel as a fifth methodology — it overlays the other four.

### Values without a direct public citation

| Cell | Value | Why unsourced |
|---|---|---|
| Indicator-driven × weaknesses | `Bounded to known indicators`, `Misses post-IoC variants`, `Limited dwell-time discovery for novel campaigns` | Practitioner consensus framing of indicator-hunting limits; no single primary publication enumerates with this exact phrasing. |
| Hypothesis-driven × weaknesses | `Quality depends on analyst expertise`, `Hypothesis selection is unstructured` | Practitioner consensus from SANS / Sqrrl hunting literature. |
| TTP-driven × strengths | `Reusable`, `Maps directly to defender frameworks`, `Stronger than indicator-driven` | David Bianco's Pyramid of Pain framing; specific cell phrasing is pedagogical synthesis. |
| Anomaly-driven × all cells | — | UEBA / anomaly hunting framing comes from product literature and academic sources rather than a single primary publication aligned with CISSP scope. |

## Engine demo opportunities

- `Hypothesis-driven | starting point → ?` → `Analyst-formed hypothesis about adversary behavior`
- `TTP-driven | starting point → ?` → `Specific MITRE ATT&CK technique`
- `? | starting point → Specific indicator of compromise from external source` → `Indicator-driven`
- `? | starting point → Statistical deviation from baseline behavior` → `Anomaly-driven`
- `? | typical inputs → MITRE ATT&CK` → `Hypothesis-driven` (sub-Fact in multi-Fact cell), `TTP-driven` (related)
- `? | typical inputs → UEBA baselines` → `Anomaly-driven` (sub-Fact in multi-Fact cell)
- `? | strengths → Catches novel TTPs not yet in detection content` → `Hypothesis-driven` (sub-Fact in multi-Fact cell)
- `? | weaknesses → High false-positive rate` → `Anomaly-driven` (sub-Fact in multi-Fact cell)
- `Hypothesis-driven | weaknesses → ?` → `Quality depends on analyst expertise`, `Hypothesis selection is unstructured`
- Composite Indicator-driven Row with `starting point` swapped to `Specific MITRE ATT&CK technique` (TTP-driven's value) — directly tests the IoC-vs-TTP distinction
- Composite TTP-driven Row with `strengths` swapped to `Detects unknown unknowns`, `Surfaces insider risk and account takeover` (Anomaly-driven's value) — tests TTP-vs-anomaly strengths (TTP catches behavior, not statistical anomalies)
- Composite Anomaly-driven Row with `typical inputs` swapped to `Threat intel feed IoCs`, `Industry sharing reports` (Indicator-driven's value) — tests anomaly-vs-IoC inputs

## Sources

- `[s1]`: SANS Institute, "Generating Hypotheses for Successful Threat Hunting" — analyst-driven hypothesis formation (retrieved 2026-04-30, https://www.sans.org/white-papers/37172/). Sqrrl / AWS, "Threat Hunting Reference Model" historical reference (retrieved 2026-04-30, https://www.threathunting.net/files/The-ThreatHunting-Project-Hunting-Reference-Model.pdf)
- `[s2]`: MITRE ATT&CK Framework — TTP-driven hunting catalogue (retrieved 2026-04-30, https://attack.mitre.org/). David Bianco, "The Pyramid of Pain" — indicator-vs-TTP cost asymmetry (retrieved 2026-04-30, https://detect-respond.blogspot.com/2013/03/the-pyramid-of-pain.html)
- `[s3]`: NIST SP 800-92, "Guide to Computer Security Log Management" — anomaly-based log analysis as hunting input (September 2006, retrieved 2026-04-30, https://csrc.nist.gov/publications/detail/sp/800-92/final). Vendor UEBA documentation (Splunk UBA, Microsoft Defender for Identity, Exabeam) for behavior-based anomaly hunting.
- `[s4]`: SANS / Sqrrl, "Hunting Maturity Model" — five-level program maturity framework (retrieved 2026-04-30, https://www.threathunting.net/sqrrl-archive). Note: Sqrrl was acquired by AWS; this URL preserves the historical document.
- `[s5]`: (ISC)² CISSP Certification Exam Outline, effective 2024-04-15, Domain 7 §7.2 *Conduct logging and monitoring activities* (retrieved 2026-04-30, https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline)
