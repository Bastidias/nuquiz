# Log Types

**Domain:** 6 — Security Assessment and Testing &nbsp;|&nbsp; **Pattern:** Dimensions &nbsp;|&nbsp; **Tags:** 6.3, 7.2
**Status:** draft (SME review pending)

The six categories of log most often relevant to security assessment and operations. Each pairs *typical content* (what events are recorded), the *retention driver* (why and how long the log must be kept), and *sensitivity* (the data-protection class the log carries). Cross-tagged with D7.2 because logs feed both assessment programs (D6) and operational monitoring (D7). The distinguishing axis on the exam is which log type contains which evidence — a question asking "where would you find a record of failed login attempts" points to Authentication.

| Log type | typical content | retention driver | sensitivity |
|---|---|---|---|
| Authentication | Login events<br>MFA challenges<br>Account lockouts | Compliance and forensic | High |
| System | OS service events<br>Reboots<br>Resource exhaustion | Operational and forensic | Medium |
| Application | Application errors<br>Business events<br>API calls | Application-defined | High |
| Network | Connection records<br>Firewall allows and denies<br>DNS queries | Forensic and compliance | High |
| Database | Schema changes<br>Privileged queries<br>Data access events | Compliance and forensic | High |
| Security event | IDS alerts<br>SIEM correlated events<br>Endpoint detections | Incident response and forensic | High |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. **No parentheticals in cells.**
- **Authentication logs are the highest-value forensic source.** Login success/failure events tied to source IP and timestamp are the foundation of incident timelines. PCI DSS, HIPAA, SOX, and most compliance regimes specifically mandate authentication logging with retention durations (typically 1 year minimum, 6 years for SOX environments).
- **System vs Application — operating-system logs vs application-layer logs.** System logs capture OS-level events (Windows Security/System/Application Event Log, Linux syslog, journalctl). Application logs capture application-defined events — they are owned by the application developer rather than the OS. Modern observability blurs the line; for CISSP, treat system logs as OS-level and application logs as application-level.
- **Network logs feed network forensics.** NetFlow / IPFIX records (connection metadata), firewall logs (allowed/denied connections), DNS query logs, and proxy logs together reconstruct who talked to whom. Volume is enormous; many organizations sample or summarize at scale.
- **Database logs are compliance-critical for PII / PHI environments.** Database audit logs capture privileged queries (DBA actions), schema changes, and selectively, data access events. HIPAA and PCI DSS specifically require database access logging for protected data.
- **Security event logs are the SIEM input.** IDS alerts, SIEM-correlated events, and endpoint detections (EDR) feed the security operations function. Sibling Concept `siem-soar-xdr` in D7 covers the platform side; `incident-response-phases` covers how these logs drive IR.
- **Sensitivity is generally High.** The cell value reflects the dominant pattern — logs reference users, systems, sources, and behaviors that collectively reconstruct activity and may include PII, credentials, or other sensitive data. System logs are bin-rated Medium because they carry less direct user-identifiable content; some organizations still classify them High.
- **Retention driver is regulation- and forensic-pulled.** Compliance regimes (PCI DSS 1 year, SOX 7 years, HIPAA 6 years) drive the floor. Forensic needs (incident-investigation timelines, legal-hold requirements) sometimes drive longer retention. Sibling Concept `audit-log-requirements` in D8 covers the application-log-specific retention story in more detail.
- **Cross-Concept link.** `audit-log-requirements` in D8 covers application-log content per event class (authentication events, authorization changes, data access, configuration changes, errors). This Concept covers the broader log-type taxonomy across system + application + infrastructure.
- **Out of scope for this Concept:** specific log formats (syslog, CEF, LEEF, JSON), log shipping protocols (rsyslog, syslog-ng, OpenTelemetry), log retention durations per regulation in detail, log storage technology, log analysis methods (covered in `log-analysis-methods` in D7).

### Values without a direct public citation

| Cell | Notes |
|---|---|
| All rows × sensitivity | Categorical bins | NIST SP 800-92 [s1] addresses log protection conceptually without bin-rating per type. |
| All rows × retention driver | Phrasings | Compliance-driven; specific durations vary by applicable regulation. NIST SP 800-92 covers retention conceptually. |

## Engine demo opportunities

- `Authentication | typical content → ?` → `Login events`, `MFA challenges`, `Account lockouts`
- `Database | typical content → ?` → `Schema changes`, `Privileged queries`, `Data access events`
- `? | typical content → IDS alerts` → `Security event`
- `? | typical content → DNS queries` → `Network` (sub-Fact in multi-Fact cell)
- `? | sensitivity → High` → `Authentication`, `Application`, `Network`, `Database`, `Security event` — shared-Value select-all
- `? | sensitivity → Medium` → `System`
- Composite Authentication Row with `typical content` swapped to `Schema changes`, `Privileged queries` — directly tests log-type-to-content pairing (schema changes are database logs; authentication logs cover login events)
- Composite System Row with `sensitivity` swapped to `High` — tests the system-log sensitivity framing (system logs are typically Medium because they carry less directly identifying content than the others)
- Composite Network Row with `typical content` swapped to `Login events` — tests the network/authentication boundary (login events come from authentication systems, not network captures)

## Sources

- `[s1]`: NIST SP 800-92, "Guide to Computer Security Log Management" — log type taxonomy and retention guidance (September 2006, retrieved 2026-04-26, https://csrc.nist.gov/publications/detail/sp/800-92/final)
- `[s2]`: NIST SP 800-53 Rev 5, "Security and Privacy Controls for Information Systems and Organizations" — AU (Audit and Accountability) control family (September 2020 baseline, retrieved 2026-04-26, https://csrc.nist.gov/publications/detail/sp/800-53/rev-5/final)
