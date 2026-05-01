# Identity Lifecycle Phases

**Domain:** 5 — Identity and Access Management &nbsp;|&nbsp; **Pattern:** Ordered &nbsp;|&nbsp; **Tags:** 5.5
**Status:** draft (SME review pending)

The five phases of the identity lifecycle from account creation through termination. Ordered because the phases proceed in sequence for any given identity — though Authentication and Access Management are *ongoing* during the middle of the lifecycle rather than point-in-time events, and Review is a recurring cadence rather than a one-shot activity. CISSP testing focuses on (1) the sequence itself, (2) which phase owns which activity (provisioning owns SoD checks; review owns recertification; deprovisioning owns removal-on-separation), and (3) the canonical tooling for each phase.

**Layout convention:** rows are phases in sequence. Columns are attributes of each phase ordered left → right from least detail (Phase) to most detail (Outputs).

| Phase | Name | Key activity | Typical tools | Outputs |
|---|---|---|---|---|
| 1 | Provisioning | Create account<br>Assign initial permissions | HR feeds<br>IdP admin<br>SCIM | Account<br>Initial role assignment |
| 2 | Authentication | Verify identity on access | IdP<br>MFA<br>SSO | Authenticated session |
| 3 | Access Management | Grant and modify permissions | Role catalog<br>Access request workflow | Updated permissions |
| 4 | Review | Recertify access<br>Audit privileges | Governance platform<br>Access certification campaigns | Recertification decisions<br>Remediation tickets |
| 5 | Deprovisioning | Remove access<br>Archive account | HR termination feed<br>IdP admin<br>SCIM | Disabled account<br>Revoked tokens |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. **No parentheticals in cells.** Tool categories (`IdP admin`, `SCIM`, `HR feed`) are treated as atomic identifiers.
- **Authoritative source of truth.** Most mature IAM programs treat HR as the upstream source for employees / contractors (`joiner-mover-leaver` events). The HR system feeds the IdP via a connector; the IdP provisions downstream applications via SCIM (RFC 7643 / 7644) or bespoke connectors. A question asking "what triggers provisioning" usually expects "HR event" as the answer.
- **SCIM is the standard provisioning protocol.** System for Cross-domain Identity Management defines JSON/REST endpoints for creating, updating, and deleting identities and groups across systems [s1]. Alternative approaches (LDAP sync, JIT provisioning, bespoke connectors) exist but SCIM is the interoperability standard.
- **Joiner-Mover-Leaver lines up with Provisioning, Access Management, Deprovisioning.** Industry shorthand for lifecycle events: Joiner = new hire (Provisioning), Mover = internal transfer or role change (Access Management), Leaver = termination (Deprovisioning). Exam questions sometimes use the JML vocabulary.
- **Authentication is not a discrete phase.** It runs continuously across phases 2-5. Represented as Phase 2 here to match the README scaffold and CISSP pedagogical framing, but in practice authentication happens on every access attempt from Phase 2 onward.
- **Review is recurring.** Access certification campaigns (quarterly / semi-annually / annually, per regulation) drive Phase 4. NIST and most compliance regimes (SOX, PCI DSS, HIPAA, FedRAMP) require periodic recertification. CISSP testing often pairs the concept of "separation of duties review" or "dormant account audit" with this phase.
- **Deprovisioning = removal + archival.** Removing active access is urgent (same-day termination); archiving account artifacts for audit retention is separate and can occur on a longer timeline. Both fall under Phase 5 in CISSP framing. Token revocation (session invalidation, refresh-token blacklisting) is a specific Phase-5 mechanical output for federated systems.
- **Orphan and dormant accounts.** Accounts that survive past their legitimate deprovisioning point (a user leaves but their account is never disabled) are a top audit finding. The review phase is the compensating control when deprovisioning fails.
- **Out of scope for this Concept:** SoD (Separation of Duties) control specifics, least-privilege enforcement (belongs more naturally in a D1/D3 governance Concept), account review cadence specifics (separate Concept — `account-review-activities`), account types (separate Concept — `account-types`), provisioning protocols beyond SCIM (LDAP, SPML).

### Tricky distractors

- **JML aligns with Provision/Modify/Deprovision.** Joiner = Provision; Mover = Access Management; Leaver = Deprovision. Wrong-answer pattern: applying JML to non-aligned phases.
- **HR is usually authoritative source.** Provisioning triggered by HR feed, not by IdP. Wrong-answer pattern: claiming the IdP initiates provisioning without upstream trigger.
- **Review is recurring.** Quarterly/annually per regulation. Wrong-answer pattern: treating Review as one-time — it's a continuous cadence.
- **Deprovisioning has urgency tiers.** Active access removal = same-day; archive = longer. Wrong-answer pattern: claiming deprovisioning is one atomic action.
- **Orphan accounts are review's compensating control.** Review catches what deprovisioning missed. Wrong-answer pattern: claiming deprovisioning alone prevents orphan accounts — review is the safety net.
- **SCIM is the standard provisioning protocol.** RFC 7643/7644. Wrong-answer pattern: assuming LDAP sync or vendor connectors are the canonical CISSP answer — SCIM is.

### Values without a direct public citation

| Cell | Value | Why unsourced |
|---|---|---|
| All rows × Typical tools | — | Tool categories (HR feeds, IdP admin, SCIM, governance platform) are industry-convention rather than directly cited from a single source. SCIM is RFC-specified [s1]; the rest reflect vendor-category practice. |
| All rows × Outputs | — | Outputs of each phase vary by implementation; cell values reflect the canonical CISSP framing rather than a traced quote. |

## Engine demo opportunities

- `Phase 1 | Name → ?` → `Provisioning`
- `Phase 5 | Name → ?` → `Deprovisioning`
- `Provisioning | Key activity → ?` → `Create account`, `Assign initial permissions`
- `Deprovisioning | Key activity → ?` → `Remove access`, `Archive account`
- `Review | Typical tools → ?` → `Governance platform`, `Access certification campaigns`
- `? | Typical tools → SCIM` → `Provisioning`, `Deprovisioning` — shared-Fact across multi-Fact cells
- Sequence (adjacency): `Phase following (Phase n | Name → Provisioning) | Name → ?` → `Authentication`
- Sequence (adjacency): `Phase following (Phase n | Name → Review) | Name → ?` → `Deprovisioning`
- Composite Provisioning Row with `Key activity` swapped to `Remove access` — tests the provisioning/deprovisioning polarity
- Composite Review Row with `Outputs` swapped to `Account` — tests that creation outputs come from Phase 1, not from recertification

## Sources

- `[s1]`: RFC 7644, "System for Cross-domain Identity Management: Protocol" — SCIM 2.0 protocol (September 2015, retrieved 2026-04-19, https://datatracker.ietf.org/doc/html/rfc7644)
- `[s2]`: RFC 7643, "System for Cross-domain Identity Management: Core Schema" — SCIM 2.0 schema (September 2015, retrieved 2026-04-19, https://datatracker.ietf.org/doc/html/rfc7643)
- `[s3]`: NIST SP 800-63A, "Digital Identity Guidelines: Enrollment and Identity Proofing" — Phase 1 Provisioning reference (June 2017, retrieved 2026-04-19, https://pages.nist.gov/800-63-3/sp800-63a.html)
