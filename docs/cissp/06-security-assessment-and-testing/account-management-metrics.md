# Account Management Metrics

**Domain:** 6 — Security Assessment and Testing &nbsp;|&nbsp; **Pattern:** Dimensions &nbsp;|&nbsp; **Tags:** 6.3
**Status:** draft (SME review pending)

The four account-management metrics CISSP candidates are expected to track. Each measures a different aspect of identity hygiene: creation rate signals operational tempo and may reveal anomalous bulk provisioning; dormant accounts signal failed deprovisioning; privilege escalation events signal access-control bypass attempts; failed authentication attempts signal credential-attack pressure. All four are KCI-class indicators (control-effectiveness) per the sibling `kpi-vs-kri-vs-kci` Concept.

| Metric | what it indicates | alerting threshold |
|---|---|---|
| Account creation rate | Operational provisioning tempo<br>Anomalous bulk-account creation | Spike above baseline mean plus 3 standard deviations |
| Dormant account count | Failed deprovisioning<br>Lifecycle hygiene | Any account inactive 90 days |
| Privilege escalation events | Misuse of admin privilege<br>Access-control bypass attempt | Any unauthorized escalation |
| Failed authentication attempts | Brute-force or credential-stuffing pressure | Source above 100 failures per hour<br>Account above 10 failures per minute |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. **No parentheticals in cells.**
- **Account creation rate baseline.** Normal creation rate varies hugely by organization size and hiring tempo — startups may add dozens per week, large enterprises a hundred per day. The metric is anomaly-detection-oriented: alert on *spikes* above the historical baseline rather than on absolute counts. The "3 sigma" threshold captures this; some organizations use simpler heuristics (e.g., 10x normal).
- **Dormant account threshold.** 90 days inactive is the dominant industry default (CISA, NIST SP 800-53 AC-2 considers it). PCI DSS uses 90 days; HIPAA expects "periodic" review without a specific number; SOX environments often use 60 days. Specific organizations align to applicable regulation.
- **Privilege escalation alerts on unauthorized.** Authorized privilege use (a DBA running a privileged query during business hours) is normal; *unauthorized* escalation (a user gaining admin rights without an approved request) is an alert. Detection requires correlating identity-system events with PAM and ticketing systems.
- **Failed auth alerting is dual-threshold.** Source-based threshold (one IP attacking many accounts) catches credential stuffing and password spraying. Account-based threshold (many sources attacking one account) catches targeted credential brute force. Modern WAF and identity-protection products run both checks simultaneously.
- **Cross-Concept link.** Sibling Concept `password-attacks` in D5 covers the attacks these metrics are watching for. Concept `account-types` in D5 covers which accounts each metric should focus on (privileged accounts get tighter thresholds than user accounts).
- **MFA fatigue introduces a third failure category.** A surge of *successful* MFA challenges followed by user approval may indicate MFA fatigue attacks. Some organizations track MFA-approval rate as a fifth metric; not included here for stub fidelity.
- **Out of scope for this Concept:** specific identity-protection products (Microsoft Entra Identity Protection, Okta ThreatInsight), risk-scoring algorithms behind impossible-travel and unfamiliar-location alerts, IAM-platform-specific event names, behavioral biometrics as anomaly signal.

### Values without a direct public citation

| Cell | Notes |
|---|---|
| All rows × alerting threshold | Specific numeric thresholds | Industry-typical defaults; specific values vary by regulatory profile and organizational risk appetite. NIST SP 800-53 [s1] AC-2 references account-management requirements without prescribing numeric thresholds. |
| All rows × what it indicates | Phrasings | Pedagogical summaries of what each metric is sensitive to. |

## Engine demo opportunities

- `Dormant account count | alerting threshold → ?` → `Any account inactive 90 days`
- `Failed authentication attempts | alerting threshold → ?` → `Source above 100 failures per hour`, `Account above 10 failures per minute`
- `? | what it indicates → Failed deprovisioning` → `Dormant account count`
- `? | what it indicates → Brute-force or credential-stuffing pressure` → `Failed authentication attempts`
- `Privilege escalation events | alerting threshold → ?` → `Any unauthorized escalation`
- Composite Account creation rate Row with `what it indicates` swapped to `Failed deprovisioning` — directly tests the metric-to-indication pairing (creation rate signals provisioning tempo; dormant count signals deprovisioning failure)
- Composite Failed authentication attempts Row with `alerting threshold` swapped to `Any account inactive 90 days` — tests metric-to-threshold pairing (the 90-day threshold is for dormant accounts, not failed auth)
- Composite Privilege escalation events Row with `what it indicates` swapped to `Operational provisioning tempo` — tests escalation framing (escalation events are bypass signals, not tempo signals)

## Sources

- `[s1]`: NIST SP 800-53 Rev 5, "Security and Privacy Controls for Information Systems and Organizations" — AC-2 Account Management requirements (September 2020 baseline, retrieved 2026-04-26, https://csrc.nist.gov/publications/detail/sp/800-53/rev-5/final)
- `[s2]`: NIST SP 800-92, "Guide to Computer Security Log Management" — log-based metric monitoring (September 2006, retrieved 2026-04-26, https://csrc.nist.gov/publications/detail/sp/800-92/final)
