# Asset Hardening Techniques

**Domain:** 7 — Security Operations &nbsp;|&nbsp; **Pattern:** Dimensions &nbsp;|&nbsp; **Tags:** 7.3
**Status:** draft (SME review pending)

Five canonical hardening techniques applied during system provisioning and ongoing configuration management. Each maps to a numbered CIS Controls v8 safeguard, which is the cross-platform reference exam writers gravitate toward (CIS Benchmarks contain platform-specific recommendation numbers — Windows, Linux, etc. — that vary by OS, while CIS Controls v8 safeguards are platform-agnostic and stable).

| hardening technique | rationale | CIS Controls v8 safeguard |
|---|---|---|
| Disable unused services | Reduces attack surface [s2]<br>Eliminates unused listening ports [s2] | 4.8 Uninstall or Disable Unnecessary Services on Enterprise Assets and Software [s1] |
| Apply patches | Closes known vulnerabilities before exploitation [s1]<br>Reduces window between disclosure and remediation [needs source] | 7.3 Perform Automated Operating System Patch Management [s1]<br>7.4 Perform Automated Application Patch Management [s1] |
| Configure secure defaults | Vendor defaults prioritize ease of use over security [s1]<br>Hardened baselines apply consistent security across assets [s2] | 4.1 Establish and Maintain a Secure Configuration Process [s1] |
| Remove default accounts | Default accounts have well-known credentials [s1]<br>Default accounts are common attacker entry points [s1] | 4.7 Manage Default Accounts on Enterprise Assets and Software [s1] |
| Enable logging | Provides evidence of unauthorized access attempts [s2]<br>Supports incident investigation [needs source] | 8.2 Collect Audit Logs [s1] |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. No parentheticals in cells. The "and" inside CIS safeguard titles (e.g., "Enterprise Assets and Software") is part of the official noun phrase for a single safeguard, not a compound of two parallel Facts.
- **Tag correction from stub.** The stub declared `Tags: 7.5`. The (ISC)² 2024 outline places hardening / configuration management under 7.3 *Perform configuration management*, not 7.5 *Apply resource protection*. Retagged to 7.3, consistent with the existing `configuration-baselines.md` and `cmdb-components.md` Concepts in this folder.
- **Column header changed from stub.** Stub said `typical CIS benchmark reference`. Changed to `CIS Controls v8 safeguard` because: (a) CIS Benchmarks number recommendations per-platform (`CIS Windows Server 2022 § 2.3.1` ≠ `CIS Ubuntu 22.04 § 2.3.1`), so a single cell can't carry a portable benchmark reference; (b) CIS Controls v8 safeguards are cross-platform and stable, so they map cleanly to a generic "hardening technique" Row.
- **Why these five rows.** Industry consensus on baseline hardening converges on these five plus a sixth (apply least privilege) which lives in its own Concept under access management. Encryption-at-rest and host-based firewall configuration are also defensible additions; deferred to keep the table to the original five.
- **CIS Control 4 vs Control 5 for accounts.** Default-account management lives under Control 4 (secure configuration), not Control 5 (account management). Control 5 covers ongoing account lifecycle; removing defaults is a one-time configuration step, hence its placement.
- **Gaps marked `[needs source]`.** Two cells have one Fact each awaiting citation: patch-window rationale and incident-investigation logging rationale. Both are widely accepted but not traced to a primary source in this research pass. NIST SP 800-92 *Guide to Computer Security Log Management* would source the second; SP 800-40 *Guide to Enterprise Patch Management Planning* would source the first.

## Engine demo opportunities

- `? | CIS Controls v8 safeguard → 4.8 Uninstall or Disable Unnecessary Services on Enterprise Assets and Software` → Disable unused services
- `Disable unused services | rationale → ?` → `Reduces attack surface` or `Eliminates unused listening ports` (engine should accept either)
- `Apply patches | CIS Controls v8 safeguard → ?` → `7.3 Perform Automated Operating System Patch Management` or `7.4 Perform Automated Application Patch Management` (cell carries two valid Values)
- `Configure secure defaults | CIS Controls v8 safeguard → ?` with `4.7 Manage Default Accounts on Enterprise Assets and Software` and `8.2 Collect Audit Logs` as distractors (cross-row distractor sourcing)
- Composite Row profile: Remove default accounts across all Columns, with the safeguard cell swapped to `4.8 Uninstall or Disable Unnecessary Services on Enterprise Assets and Software`

## Sources

- `[s1]`: CIS Critical Security Controls v8.1, Controls 4 / 7 / 8 with safeguards 4.1, 4.7, 4.8, 7.3, 7.4, 8.2 (retrieved 2026-04-25, https://www.cisecurity.org/controls/cis-controls-list)
- `[s2]`: NIST SP 800-123 *Guide to General Server Security*, July 2008 (retrieved 2026-04-25, https://csrc.nist.gov/pubs/sp/800/123/final) — quoted via published summaries
- `[s3]`: (ISC)² CISSP Certification Exam Outline, effective 2024-04-15, Domain 7 §7.3 *Perform configuration management* (retrieved 2026-04-25, https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline)
