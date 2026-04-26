# Account Review Activities

**Domain:** 5 — Identity and Access Management &nbsp;|&nbsp; **Pattern:** Dimensions &nbsp;|&nbsp; **Tags:** 5.5
**Status:** draft (SME review pending)

The four account-review activities CISSP candidates are expected to discriminate. Together they constitute Phase 4 of the identity lifecycle (Review). Each activity has a different *focus* — access certification reviews permissions broadly, privilege review focuses on elevated rights, dormant account audit catches unused accounts that should be deprovisioned, SoD review flags conflicting permissions held by single users. Most regulated environments require all four on a recurring cadence (PCI DSS, SOX, HIPAA mandates).

| Activity | frequency | who performs | output |
|---|---|---|---|
| Access certification | Annually<br>Semi-annually for regulated environments | Resource owner<br>Manager | Recertification decisions<br>Access removal tickets |
| Privilege review | Quarterly | Security operations<br>PAM administrator | Privilege adjustments<br>Removed admin rights |
| Dormant account audit | Quarterly | Identity governance team | Account disabling tickets<br>Account deletion list |
| SoD review | Annually | Compliance team<br>Internal audit | Conflict report<br>Remediation plan |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. **No parentheticals in cells.**
- **Access certification = the broadest review.** Also called "user access review" or "entitlement review" in industry. Each resource owner (or manager) is presented with the list of users who have access to their resource and asked to certify that each access is still appropriate. Annual is the regulatory minimum (SOX); quarterly is increasingly common for sensitive systems.
- **Privilege review focuses on elevated access.** Regular user accounts are reviewed via access certification at slower cadence; privileged accounts (admin, root, domain admin) get their own quarterly review because the impact of unjustified privilege is much higher. PAM platforms generate privilege-review reports automatically.
- **Dormant account audit catches lifecycle-failure cases.** An account that has not been used in 60-90 days is dormant; if the user has truly left the organization, the account should have been deprovisioned in Phase 5 of the lifecycle. Dormant-account audit is the *compensating control* for failed deprovisioning. CISA and other sources recommend disabling dormant accounts and deleting after a defined retention period.
- **SoD review = separation-of-duties enforcement.** Verifies that no single user holds combinations of privileges that would enable fraud or material control bypass — for example, a single user holding both "create vendor" and "approve payment" permissions could create a fictitious vendor and pay them. ERP systems (SAP, Oracle) and IGA platforms have built-in SoD rule engines that flag conflicts during access certification.
- **Cadence is regulation-driven.** Specific frequencies in the cells reflect the dominant regulatory pattern. PCI DSS requires user access review at least every 6 months; SOX mandates annual access reviews for financial-system access; HIPAA expects "periodic" review without prescribing exact intervals. Real organizations align cadence to the strictest applicable regulation.
- **Outputs feed back into provisioning.** Each review activity produces *change tickets* that go through the standard access-modification workflow (approval, provisioning system update, audit log entry). Reviews that produce no change tickets are typically rubber-stamped — the value of access review depends on actually removing identified-as-unnecessary access.
- **Cross-Concept link.** Identity lifecycle phases (`identity-lifecycle-phases` in D5) places this Concept's activities in Phase 4 (Review). Account types (`account-types` in D5) covers which accounts each activity targets — privileged review targets the Privileged row; dormant audit targets all rows but is most consequential for User and External.
- **Out of scope for this Concept:** specific IGA tooling (SailPoint, Saviynt, Microsoft Entra Identity Governance), recertification campaign UX, manager attestation workflows, AI-assisted access reviews, role-mining and role-engineering practices, just-in-time access alternatives to standing privilege.

### Values without a direct public citation

| Cell | Notes |
|---|---|
| All rows × frequency | Cadences | Industry-typical and regulation-driven; specific durations vary by applicable regulation. |
| All rows × who performs | Owner descriptions | Modal industry assignments; vary by organization size and IGA-program maturity. |
| All rows × output | Output artifacts | Common-practice outputs; no normative source enumerates per-activity output. |

## Engine demo opportunities

- `Access certification | frequency → ?` → `Annually`, `Semi-annually for regulated environments`
- `Privilege review | frequency → ?` → `Quarterly`
- `SoD review | who performs → ?` → `Compliance team`, `Internal audit`
- `? | who performs → Resource owner` → `Access certification` (sub-Fact in multi-Fact cell)
- `? | output → Conflict report` → `SoD review` (sub-Fact in multi-Fact cell)
- `Dormant account audit | output → ?` → `Account disabling tickets`, `Account deletion list`
- Composite Privilege review Row with `frequency` swapped to `Annually` — directly tests the privileged-account high-cadence requirement (privileged review is quarterly, not annual)
- Composite SoD review Row with `output` swapped to `Account disabling tickets`, `Account deletion list` — tests the SoD vs dormant focus (SoD produces conflict reports; dormant audit produces account-disabling tickets)
- Composite Access certification Row with `who performs` swapped to `Compliance team`, `Internal audit` — tests the resource-owner anchor (access certification is owner-driven, not audit-driven)

## Sources

- `[s1]`: NIST SP 800-53 Rev 5, "Security and Privacy Controls for Information Systems and Organizations" — AC-2 Account Management requirements include account review (September 2020 baseline, retrieved 2026-04-26, https://csrc.nist.gov/publications/detail/sp/800-53/rev-5/final)
- `[s2]`: PCI DSS v4.0, "Payment Card Industry Data Security Standard" — Requirement 7 (Restrict Access) and Requirement 8 (Identify Users) including periodic access reviews (retrieved 2026-04-26, https://www.pcisecuritystandards.org/document_library/)
