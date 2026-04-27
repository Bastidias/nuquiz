# Account Types

**Domain:** 5 — Identity and Access Management &nbsp;|&nbsp; **Pattern:** Dimensions &nbsp;|&nbsp; **Tags:** 5.5
**Status:** draft (SME review pending)

The six account categories CISSP candidates are expected to discriminate by typical permission scope, audit frequency, and risk profile. The discriminator that drives audit and review cadence is *whether the account is human or non-human, named or shared, internal or external*. Privileged accounts get the most scrutiny because they have the broadest impact when compromised; shared and service accounts get aggressive scrutiny because attribution to a specific human actor is weakened or absent.

| Type | typical permissions | audit frequency | risk profile |
|---|---|---|---|
| User | Standard end-user access | Annually | Low |
| Privileged | Administrative or elevated access | Quarterly | High |
| Service | Application-to-system access | Quarterly | High |
| Shared | Multiple human users on one credential | Continuously when used | High |
| Guest | Time-limited contractor or visitor access | Per session | Medium |
| External | Third-party or partner access | Per contract review | Medium |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. **No parentheticals in cells.**
- **Privileged accounts are the highest-leverage target.** A privileged account compromise typically yields broad system access — domain admin, root, cloud-platform owner. Privileged Access Management (PAM) tools (CyberArk, BeyondTrust, HashiCorp Vault) exist specifically to gate privileged credentials behind just-in-time access, session recording, and frequent rotation. Quarterly audit is a baseline; many regulated environments require monthly or per-use review.
- **Service accounts are non-human.** A service account is used by an application to authenticate to another system (database, message queue, API). Risks: long-lived credentials, weak password rotation (because changing breaks the application), broad permissions inherited from the application's needs. Modern practice replaces password-based service accounts with workload identities (managed service identities in Azure / GCP, IRSA in AWS EKS) that issue short-lived credentials automatically.
- **Shared accounts violate accountability.** Two or more humans logging in with the same credential breaks the attribution chain — audit logs cannot tell which human took an action. Shared accounts should be eliminated where possible; where required (legacy systems, emergency-access "break-glass" accounts), every use should be logged with out-of-band attribution (ticket reference, supervisor approval, session recording).
- **Guest accounts have temporal bounds.** Contractor accounts, visitor Wi-Fi credentials, and demo logins all share the property that they are *expected* to be deprovisioned within a defined window. Review per-session means verifying that the account terminated at session end; failure to deprovision guest accounts is a top audit finding.
- **External accounts cross trust boundaries.** Vendor portal logins, partner-organization SSO federation, customer accounts on a B2B platform — all are external. Risk profile is Medium because the third party owns identity governance for their users; the relying organization can only enforce contractual controls. Review per-contract because account validity tracks contract validity.
- **Non-human accounts dominate at scale.** Modern enterprises have far more service / workload identities than human users. CISA and NIST guidance increasingly emphasizes workload identity hygiene (rotation, least privilege at the service level, lateral-movement isolation).
- **Cross-Concept link.** Account review activities (`account-review-activities` in D5) covers what is *done* during account review; this Concept covers *which accounts get reviewed* and at what cadence. Identity lifecycle phases (`identity-lifecycle-phases` in D5) covers when accounts are created, modified, and deprovisioned.
- **Out of scope for this Concept:** specific PAM tooling, workload identity standards (SPIFFE/SPIRE), break-glass account procedures, machine-to-machine authentication protocols (mTLS, OAuth client credentials), customer-account specifics for B2C platforms.

### Tricky distractors

- **Shared accounts break accountability.** Audit logs can't attribute actions to a specific human. Wrong-answer pattern: claiming shared accounts are acceptable for convenience — they're a top audit finding.
- **Service accounts are non-human.** Application-to-system. Wrong-answer pattern: classifying service accounts as a privileged human account — they're non-human, with their own risk profile.
- **Privileged accounts get continuous PAM controls.** Just-in-time, session recording, frequent rotation. Wrong-answer pattern: claiming annual review is sufficient for privileged accounts — quarterly is baseline.
- **Guest accounts are time-bounded.** Per-session review. Wrong-answer pattern: leaving guest accounts indefinitely active — fails review.
- **Non-human accounts outnumber human.** Modern enterprises have far more service identities than humans. Wrong-answer pattern: assuming user accounts dominate — workload identities scale orders of magnitude faster.
- **Workload identities replace long-lived service credentials.** Short-lived per-workload tokens (IRSA, MSI). Wrong-answer pattern: claiming password-based service accounts are still best practice — workload identity is the modern pattern.

### Values without a direct public citation

| Cell | Notes |
|---|---|
| All rows × audit frequency | Cadences | Industry-typical review cadences; specific durations vary by regulatory profile (PCI DSS, SOX, HIPAA prescribe their own minimums). NIST SP 800-53 [s1] AC family addresses account review without prescribing per-type cadence. |
| All rows × risk profile | Qualitative bins | CISSP-pedagogical categorization; no normative source bins per account type. |

## Engine demo opportunities

- `Privileged | risk profile → ?` → `High`
- `User | risk profile → ?` → `Low`
- `Shared | audit frequency → ?` → `Continuously when used`
- `? | risk profile → High` → `Privileged`, `Service`, `Shared` — shared-Value select-all
- `? | risk profile → Medium` → `Guest`, `External` — shared-Value select-all
- `Guest | typical permissions → ?` → `Time-limited contractor or visitor access`
- `Service | typical permissions → ?` → `Application-to-system access`
- Composite User Row with `risk profile` swapped to `High` — directly tests the privilege-vs-user distinction (User is Low risk; Privileged is High)
- Composite Service Row with `typical permissions` swapped to `Multiple human users on one credential` — tests the service-vs-shared distinction (Service is non-human; Shared is multiple humans)
- Composite Shared Row with `audit frequency` swapped to `Annually` — tests the high-cadence requirement for shared credentials (continuous monitoring, not annual)

## Sources

- `[s1]`: NIST SP 800-53 Rev 5, "Security and Privacy Controls for Information Systems and Organizations" — AC (Access Control) and IA (Identification and Authentication) control families, including account management requirements (September 2020 baseline, retrieved 2026-04-26, https://csrc.nist.gov/publications/detail/sp/800-53/rev-5/final)
- `[s2]`: NIST SP 800-63B, "Digital Identity Guidelines: Authentication and Lifecycle Management" — account lifecycle and authenticator management (June 2017, retrieved 2026-04-26, https://pages.nist.gov/800-63-3/sp800-63b.html)
