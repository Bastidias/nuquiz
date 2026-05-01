# Audit Log Requirements

**Domain:** 8 — Software Development Security &nbsp;|&nbsp; **Pattern:** Dimensions &nbsp;|&nbsp; **Tags:** 8.3
**Status:** draft (SME review pending)

The five categories of application audit log most directly tied to the AU (Audit and Accountability) control family in NIST SP 800-53 [s1] and to OWASP logging guidance [s2]. Each row identifies a class of event the application must record, the canonical fields to capture, the typical retention duration (driven by regulation), and the data-sensitivity bin that determines downstream protection requirements. CISSP testing focuses on the field-by-event pairing (what must be captured for an authentication event vs a configuration change) and on the retention drivers (HIPAA, SOX, PCI DSS).

| Event class | what to capture | retention | sensitivity |
|---|---|---|---|
| Authentication events | Username<br>Source IP<br>Timestamp<br>Success or failure<br>Authentication method | 1 year minimum | High |
| Authorization changes | Subject<br>Resource<br>Permission delta<br>Approver<br>Timestamp | 7 years for SOX environments<br>3 years general | High |
| Data access | User<br>Resource accessed<br>Action<br>Timestamp | 90 days general<br>7 years for HIPAA<br>7 years for SOX | High |
| Configuration changes | Component<br>Old value<br>New value<br>Author<br>Timestamp | 1 year minimum<br>Indefinite for security-critical | High |
| Errors | Error code<br>Stack trace<br>Affected component<br>Timestamp | 90 days | High |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. **No parentheticals in cells.** Field names use canonical spelling (`Source IP`, `Permission delta`).
- **Five-Ws plus a How.** Every audit event should answer Who (subject), What (resource / action), When (timestamp), Where (source IP / component), Why (operation type or reason), and How (authentication method, change mechanism). The cell values for `what to capture` instantiate this template per event class — for example, Authentication events answer Who (Username), Where (Source IP), When (Timestamp), Why (Success or failure), How (Authentication method).
- **Retention is regulation-driven.** Specific durations come from the regulatory context, not from the event class itself. SOX (Sarbanes-Oxley) drives 7-year retention for financial-reporting-relevant logs; HIPAA drives 6-7 year retention for healthcare access logs; PCI DSS requires 1 year minimum with 3 months immediately accessible. The cell values reflect the dominant pattern; individual organizations may have stricter retention based on their regulatory profile.
- **Sensitivity is uniformly `High`.** All five event classes carry High sensitivity because they collectively reconstruct user behavior — even error logs leak system internals (stack traces) or user identifiers (in error context). Treating audit logs as High-sensitivity by default avoids edge cases where a Medium-classified log inadvertently captures PII or credentials. NIST SP 800-92 [s3] explicitly warns that audit logs need protection equal to the most sensitive data they reference.
- **Errors carry stack traces.** Stack traces can leak file paths, framework versions, third-party library internals, and sometimes secrets if developers log full request contexts. Treat as High-sensitivity even though "errors" sounds like low-sensitivity operational telemetry. CISSP testing sometimes asks "which is highest sensitivity" — all five categories are High in this Concept's framing.
- **Configuration changes need indefinite retention for security-critical settings.** Changes to firewall rules, encryption settings, IAM policies, or privileged-account configurations must be reconstructable for the lifetime of the system or longer (audit, forensics, regulatory inquiry). Routine configuration changes (UI themes, non-security feature flags) follow the 1-year minimum.
- **What NOT to log.** Passwords, full primary account numbers (PCI DSS prohibits beyond the first 6 / last 4 digits), unmasked PII, encryption keys, session tokens. The capture fields in this Concept assume secrets are filtered before write. OWASP Logging Cheat Sheet [s2] is the authoritative guidance.
- **Out of scope for this Concept:** specific log format standards (CEF, LEEF, JSON syslog), SIEM integration patterns (covered in `siem-soar-xdr` in D7), log analysis methods (separate D7 Concept — `log-analysis-methods`), forensic-evidence handling (`evidence-handling-chain` in D7), CIA-controls review activities (`account-review-activities` in D5).

### Tricky distractors

- **Don't log secrets.** Passwords, full PAN, encryption keys, session tokens forbidden. Wrong-answer pattern: claiming all auth event fields including password should be logged — never log the password.
- **Stack traces are sensitive.** Leak paths, versions, sometimes secrets. Wrong-answer pattern: classifying error logs as low-sensitivity — they're High.
- **Retention is regulation-driven.** SOX 7y, HIPAA 6-7y, PCI 1y minimum. Wrong-answer pattern: applying one universal retention period across all event classes and regulations.
- **5W + How template.** Who/What/When/Where/Why/How per event. Wrong-answer pattern: skipping fields like Source IP — minimal logs lose forensic value.
- **PCI permits PAN truncation.** First 6 / last 4 digits. Wrong-answer pattern: claiming PCI forbids any storage of PAN — truncated form is permitted.
- **Configuration change logs need indefinite retention for security-critical.** Firewall, IAM, encryption settings. Wrong-answer pattern: applying 1-year retention to all config changes — security-critical needs longer.

### Values without a direct public citation

| Cell | Value | Why unsourced |
|---|---|---|
| All rows × what to capture | Field lists | Industry / OWASP best-practice phrasing; no single primary citation enumerates these exact field sets per event class. |
| All rows × retention | Specific durations | Retention values reflect dominant regulatory patterns (SOX 7 years, HIPAA 6+, PCI DSS 1 year) but specific durations vary by jurisdiction and contract. NIST SP 800-92 [s3] addresses retention conceptually without prescribing per-event-class durations. |
| All rows × sensitivity | `High` | Pedagogical default — log sensitivity tracks the data referenced. NIST SP 800-92 supports the High-sensitivity framing but does not enumerate per-class sensitivity. |

## Engine demo opportunities

- `Authentication events | what to capture → ?` → `Username`, `Source IP`, `Timestamp`, `Success or failure`, `Authentication method`
- `Configuration changes | what to capture → ?` → `Component`, `Old value`, `New value`, `Author`, `Timestamp`
- `? | what to capture → Stack trace` → `Errors`
- `? | what to capture → Source IP` → `Authentication events`
- `? | retention → 90 days` → `Errors` (sole-Fact cell), `Data access` (sub-Fact in multi-Fact cell)
- `? | sensitivity → High` → `Authentication events`, `Authorization changes`, `Data access`, `Configuration changes`, `Errors` — shared-Value select-all (all five rows)
- Composite Errors Row with `sensitivity` swapped to `Low` — directly tests the "errors carry stack traces" point (errors are High-sensitivity, not Low)
- Composite Authentication events Row with `what to capture` swapped to `Old value`, `New value` — tests the field-pattern pairing (old/new value belongs to configuration changes, not authentication)
- Composite Data access Row with `retention` swapped to `90 days` (dropping the 7-year HIPAA / SOX Facts) — tests retention-driver awareness (sector regulation extends retention beyond the general default)

## Sources

- `[s1]`: NIST SP 800-53 Rev 5, "Security and Privacy Controls for Information Systems and Organizations" — AU (Audit and Accountability) control family (September 2020 baseline, retrieved 2026-04-25, https://csrc.nist.gov/publications/detail/sp/800-53/rev-5/final)
- `[s2]`: OWASP, "Logging Cheat Sheet" — application logging guidance, including what not to log (retrieved 2026-04-25, https://cheatsheetseries.owasp.org/cheatsheets/Logging_Cheat_Sheet.html)
- `[s3]`: NIST SP 800-92, "Guide to Computer Security Log Management" — log retention, protection, and analysis (September 2006, retrieved 2026-04-25, https://csrc.nist.gov/publications/detail/sp/800-92/final)
