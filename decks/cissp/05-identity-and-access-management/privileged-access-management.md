# Privileged Access Management

**Domain:** 5 — Identity and Access Management &nbsp;|&nbsp; **Pattern:** Dimensions &nbsp;|&nbsp; **Tags:** 5.5, 5.4
**Status:** draft (SME review pending)

The six capability families that constitute a Privileged Access Management (PAM) program. PAM is the specialization of IAM that addresses *elevated* accounts — root, domain admin, database administrator, cloud-platform owner — where the impact of compromise scales to the whole environment. Each capability addresses a distinct privilege-abuse vector. CISSP testing focuses on the matchup between capability and risk mitigated, and on the broader principle that standing privileged access is the threat model PAM exists to eliminate.

| Capability | function | risk mitigated | typical implementation |
|---|---|---|---|
| Password vault | Centrally store and rotate privileged credentials [s1] | Static credentials sprawled across systems<br>Standing access to admin passwords | Encrypted credential vault with check-out workflow |
| Session management | Broker administrative sessions through controlled gateway [s2] | Direct admin connections bypassing audit<br>Credential exposure on endpoint | Jump host with RDP and SSH proxy [s2] |
| Just-in-time access | Grant elevated privileges only for the duration of a task [s1] | Standing privilege accumulation<br>Always-on admin account exposure | Time-bound role assignment with approval workflow |
| Account discovery | Continuously inventory privileged accounts across the environment [s1] | Unmanaged privileged accounts<br>Orphaned admin accounts post-deprovisioning | Network and directory scanning for admin-equivalent accounts |
| Privilege elevation | Allow standard users to invoke specific elevated commands [s1] | Sharing of admin credentials for one-off tasks<br>Over-broad standing admin rights | sudo with command allowlist<br>Run As with elevation policy |
| Audit and recording | Capture and replay privileged session activity [s2] | Insider abuse of privileged access<br>Lack of forensic record of admin actions | Session video recording with searchable keystroke log [s2] |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. **No parentheticals in cells.** Acronym expansions live in this section.
- **Acronym expansions.** `PAM` = Privileged Access Management. `IAM` = Identity and Access Management. `JIT` = Just-in-Time. `PASM` = Privileged Account and Session Management (Gartner subcategory covering vault + session management). `PEDM` = Privilege Elevation and Delegation Management (Gartner subcategory covering Privilege elevation row).
- **PAM is IAM for elevated accounts.** Where IAM governs the general user population, PAM governs the *small but high-impact* set of privileged accounts. Compromise of a regular user typically affects that user; compromise of a privileged account typically affects the whole environment. CISSP testing treats PAM as a distinct discipline because its threat model and controls differ from general IAM.
- **Standing privilege is the canonical threat model.** Traditional admin accounts have standing access — they are admin 24x7 whether being used or not. JIT access flips the model: the account starts with no privileges and is elevated only for the duration of an approved task. Most modern PAM programs cite reducing standing privilege as the program's primary objective.
- **Vault check-out workflow.** A user requests credentials from the vault, the vault releases them (often as a one-time password or ephemeral token), the user performs the task, and the vault rotates the credential after use. This eliminates the practice of admins memorizing or storing privileged passwords locally.
- **Session brokering serves two purposes.** First, the privileged credential never reaches the admin's endpoint — the gateway holds it and injects it into the session. This protects against keylogger and credential-theft attacks on the admin workstation. Second, the gateway is the natural point to record the session for audit.
- **Account discovery is the first PAM deployment step.** You cannot vault, broker, or audit accounts you don't know about. Initial PAM deployments routinely discover hundreds to thousands of privileged accounts the security team didn't know existed — service accounts with standing admin rights, local admin accounts on every workstation, dormant DBA accounts from departed staff. Sibling Concept `account-types` in D5 covers the account-type taxonomy these scans surface.
- **Privilege elevation vs full admin handoff.** Elevation lets a standard user run a *specific elevated command* (sudo `apt install`, Run As `mmc.exe`) without needing the admin password. Full admin handoff (giving the user the admin password or making them a domain admin) is what PAM replaces. The cell value `command allowlist` captures the principle — elevation should be scoped to the specific commands the role requires.
- **Recording carries privacy considerations.** Session recording captures everything the admin types and sees, including any personal browsing, password entry, or sensitive content. Most jurisdictions require clear notice and consent; recording is a control for auditing the *job*, not surveilling the person. Recording-policy framing is a frequent CISSP exam touchpoint.
- **Cross-Concept link.** Sibling `account-types` covers Privileged as one of six account categories. `account-review-activities` covers privilege review as a quarterly activity. `identity-lifecycle-phases` covers the broader identity lifecycle that PAM operationalizes for elevated accounts. `foundational-ops-controls` covers least privilege and separation of duties as the principles PAM enforces operationally.
- **Out of scope for this Concept:** specific PAM products (CyberArk, BeyondTrust, HashiCorp Vault, Delinea, Microsoft Entra Privileged Identity Management), workload / non-human identity governance (SPIFFE / SPIRE), secrets management for application-to-application credentials (which overlaps with PAM but is a distinct discipline), Cloud Infrastructure Entitlement Management (CIEM) for cloud-platform privilege analysis, break-glass account procedures.

### Tricky distractors

- **PAM vs IAM.** IAM governs general user population. PAM governs elevated accounts specifically. Wrong-answer pattern: collapsing them — PAM is a specialization of IAM with distinct threat model.
- **JIT access ≠ standing access.** Standing access is admin 24x7. JIT grants elevation only for task duration. Wrong-answer pattern: claiming JIT is just faster admin provisioning — the defining feature is *temporary* elevation.
- **Session brokering protects credentials at the gateway.** Admin's endpoint never sees the privileged credential. Wrong-answer pattern: claiming the admin types the privileged password into the gateway — the gateway injects it into the session.
- **Account discovery is the deployment foundation.** Without inventory, no other capability works. Wrong-answer pattern: claiming PAM can be deployed starting with vaulting — discovery comes first.
- **Privilege elevation ≠ full admin grant.** Specific commands, not full admin rights. Wrong-answer pattern: equating sudo with making someone a sysadmin — sudo can be scoped to specific commands.
- **Recording requires notice and consent.** Privacy controls apply. Wrong-answer pattern: deploying session recording without policy notice — often legally required.

### Values without a direct public citation

| Cell | Value | Why unsourced |
|---|---|---|
| All rows × typical implementation | Implementation phrasings | NIST SP 800-53 [s1] specifies control objectives without prescribing specific implementations; cell values reflect industry-standard PAM-product capabilities. Gartner PAM Magic Quadrant categories (PASM, PEDM) underpin the implementations but are not directly cited per cell. |
| Password vault × risk mitigated | `Static credentials sprawled across systems`, `Standing access to admin passwords` | Industry-typical risk framing; not a direct quote from a NIST or other primary publication. |
| Session management × risk mitigated | `Direct admin connections bypassing audit`, `Credential exposure on endpoint` | Same — practitioner consensus framing. |
| Just-in-time access × risk mitigated | `Standing privilege accumulation`, `Always-on admin account exposure` | Practitioner consensus; the JIT-vs-standing framing is a Gartner / vendor-driven concept rather than a NIST formalization. |
| Account discovery × risk mitigated | `Unmanaged privileged accounts`, `Orphaned admin accounts post-deprovisioning` | Practitioner consensus framing. |
| Privilege elevation × risk mitigated | `Sharing of admin credentials for one-off tasks`, `Over-broad standing admin rights` | Practitioner consensus framing. |
| Audit and recording × risk mitigated | `Insider abuse of privileged access`, `Lack of forensic record of admin actions` | Practitioner consensus framing. |

## Engine demo opportunities

- `Password vault | function → ?` → `Centrally store and rotate privileged credentials`
- `Session management | typical implementation → ?` → `Jump host with RDP and SSH proxy`
- `Just-in-time access | function → ?` → `Grant elevated privileges only for the duration of a task`
- `? | function → Continuously inventory privileged accounts across the environment` → `Account discovery`
- `? | risk mitigated → Standing privilege accumulation` → `Just-in-time access` (sub-Fact in multi-Fact cell)
- `? | risk mitigated → Insider abuse of privileged access` → `Audit and recording` (sub-Fact in multi-Fact cell)
- `Privilege elevation | typical implementation → ?` → `sudo with command allowlist`, `Run As with elevation policy`
- `? | typical implementation → Encrypted credential vault with check-out workflow` → `Password vault`
- Composite Password vault Row with `function` swapped to `Capture and replay privileged session activity` — directly tests the vault-vs-recording distinction (vault stores credentials; recording captures session activity)
- Composite Just-in-time access Row with `risk mitigated` swapped to `Insider abuse of privileged access` — tests JIT focus (JIT addresses standing privilege, not insider abuse — recording addresses insider abuse)
- Composite Session management Row with `typical implementation` swapped to `Network and directory scanning for admin-equivalent accounts` — tests session-vs-discovery distinction (session brokering uses jump hosts; discovery uses network scanning)

## Sources

- `[s1]`: NIST SP 800-53 Rev 5, "Security and Privacy Controls for Information Systems and Organizations" — AC-2 Account Management, AC-6 Least Privilege, and AU-2 Event Logging control families that underpin PAM (September 2020 baseline, retrieved 2026-04-26, https://csrc.nist.gov/publications/detail/sp/800-53/rev-5/final)
- `[s2]`: NIST IR 7966, "Security of Interactive and Automated Access Management Using Secure Shell (SSH)" — interactive privileged-access controls including session brokering and audit (October 2015, retrieved 2026-04-26, https://csrc.nist.gov/publications/detail/nistir/7966/final)
- `[s3]`: (ISC)² CISSP Certification Exam Outline, effective 2024-04-15, Domain 5 §5.5 *Manage the identity and access provisioning lifecycle* and §5.4 *Implement and manage authorization mechanisms* (retrieved 2026-04-26, https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline)
- `[s4]`: Gartner *Magic Quadrant for Privileged Access Management* — PASM (Privileged Account and Session Management) and PEDM (Privilege Elevation and Delegation Management) market subcategories used to organize PAM capabilities (retrieved 2026-04-26, sourced via published vendor-aggregator summaries; Gartner reports themselves are paywalled)
