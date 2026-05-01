# IDS / IPS Types

**Domain:** 7 — Security Operations &nbsp;|&nbsp; **Pattern:** Dimensions &nbsp;|&nbsp; **Tags:** 7.7
**Status:** draft (SME review pending)

The four detection methodologies an Intrusion Detection System (IDS) or Intrusion Prevention System (IPS) can use. NIST SP 800-94 formally recognizes three (signature-based, anomaly-based, stateful protocol analysis); CISSP courseware adds heuristic as a fourth, treating it as an algorithmic-rules variant of anomaly detection. The CISSP exam tests both the categorical distinctions and the strength/weakness profile each method carries — particularly the false-positive trade-off.

| type | detection method | strengths | weaknesses |
|---|---|---|---|
| Signature-based | Compare observed events to known-threat signatures [s1] | Very effective on known threats [s1]<br>Low false-positive rate [s1] | Ineffective on previously unknown threats [s1]<br>Ineffective on evasion-disguised variants [s1] |
| Anomaly-based | Compare observed activity to statistical baseline of normal [s1] | Detects previously unknown threats [s1] | High false-positive rate [s1]<br>Difficult to validate alerts [s1] |
| Heuristic | Apply algorithmic rules to detect suspicious patterns [needs source] | Catches variants of known attack families [needs source] | Higher false-positive rate than signatures [needs source] |
| Stateful protocol analysis | Compare observed protocol activity to vendor-defined protocol profile [s1] | Detects protocol misuse and protocol-state violations [s1] | Resource-intensive per session [needs source] |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. No parentheticals in cells.
- **Tag 7.7 retained from stub.** Matches (ISC)² 2024 outline §7.7 *Operate and maintain detective and preventative measures*. Sibling Concepts: `nids-vs-hids.md` (deployment location), `anti-malware-technologies.md` (the host-side parallel taxonomy).
- **Why four rows when NIST SP 800-94 lists three.** NIST SP 800-94 formally recognizes signature-based, anomaly-based, and stateful protocol analysis [s1]. Heuristic detection — algorithmic rules that match suspicious *patterns* without requiring exact signatures — is sometimes treated as a sub-category of anomaly detection and sometimes as its own approach. The stub author broke it out because CISSP question writers occasionally test it as a distinct category. Treat heuristic as a hybrid between signature (rule-based) and anomaly (no exact match required).
- **IDS vs. IPS is orthogonal to detection method.** All four methods can run in either passive (detection-only) or inline (prevention) mode. The stub's columns are about *how* something is detected; the IDS/IPS distinction is about *what is done* once detection fires. The latter is not represented as a column here.
- **The false-positive trade-off is the test favorite.** Signature-based has the lowest FP rate but misses unknowns; anomaly-based catches unknowns but generates high FPs and analyst fatigue. NIST SP 800-94 explicitly characterizes anomaly-based as "very effective at detecting previously unknown threats" while noting that "it is often difficult for analysts to determine why a particular alert was generated" [s1].
- **Stateful protocol analysis is the only method that catches protocol abuse.** Signatures and anomaly detection look at content and statistics; stateful protocol analysis tracks the *expected sequence* of protocol operations (e.g., FTP must authenticate before it can transfer files) and alerts on out-of-state behavior. This is the discriminating feature on the exam.
- **Gaps marked `[needs source]`:** four Facts — the entire heuristic row, plus the "resource-intensive per session" weakness for stateful protocol analysis. Heuristic gaps reflect that NIST SP 800-94 does not formally define heuristic detection; sourcing would require a vendor IDPS reference or a CISSP courseware citation.

### Tricky distractors

- **Signature catches known; anomaly catches unknown.** Trade-off: low-FP signatures vs FP-prone anomaly detection. Wrong-answer pattern: claiming signatures catch zero-days — they can't, by definition.
- **Anomaly-based has high false positives.** Statistical baselines are noisy. Wrong-answer pattern: claiming anomaly detection has low FPs because it's "smart" — it's the opposite.
- **Stateful protocol analysis catches protocol abuse.** Out-of-sequence operations. Wrong-answer pattern: claiming signatures catch protocol-state violations — they don't unless explicitly written for each.
- **IDS detects; IPS prevents.** Inline vs passive. Wrong-answer pattern: confusing IDS and IPS — the suffix indicates active response capability.
- **Detection method is orthogonal to deployment.** Network vs host (NIDS/HIDS) is a separate axis. Wrong-answer pattern: conflating signature/anomaly with NIDS/HIDS — they're independent dimensions.
- **Tuning matters more than method.** Untuned signatures still fire on benign traffic. Wrong-answer pattern: claiming detection method alone determines effectiveness — environment-specific tuning is critical.

## Engine demo opportunities

- `? | detection method → Compare observed activity to statistical baseline of normal` → Anomaly-based
- `Signature-based | weaknesses → ?` → `Ineffective on previously unknown threats` or `Ineffective on evasion-disguised variants`
- `? | strengths → Detects previously unknown threats` → Anomaly-based
- `Stateful protocol analysis | strengths → ?` → `Detects protocol misuse and protocol-state violations`
- Cross-Row distractor: `Anomaly-based | weaknesses → ?` with `Ineffective on previously unknown threats` (Signature-based) as a tempting wrong answer
- Composite Row profile: Signature-based across all Columns with `weaknesses` swapped to `High false-positive rate` (Anomaly-based's value)

## Sources

- `[s1]`: NIST SP 800-94 *Guide to Intrusion Detection and Prevention Systems (IDPS)*, February 2007 — particularly §4 detection methodology comparisons (retrieved 2026-04-25, https://csrc.nist.gov/pubs/sp/800/94/final)
- `[s2]`: NIST CSRC glossary entries for *intrusion prevention system* and related terms (retrieved 2026-04-25, https://csrc.nist.gov/glossary/term/intrusion_prevention_system)
- `[s3]`: (ISC)² CISSP Certification Exam Outline, effective 2024-04-15, Domain 7 §7.7 *Operate and maintain detective and preventative measures* (retrieved 2026-04-25, https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline)
