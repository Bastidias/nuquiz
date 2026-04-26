# Governance Documents

**Domain:** 1 — Security and Risk Management &nbsp;|&nbsp; **Pattern:** Dimensions &nbsp;|&nbsp; **Tags:** 1.3, 1.7
**Status:** draft (SME review pending)

The five governance document types CISSP courseware uses to classify written security guidance. Each has a distinct *enforcement posture* — policies and standards are mandatory; procedures are mandatory in execution; guidelines are recommendations; baselines are mandatory configuration minimums. The CISSP exam tests both the per-document definition and the most-confused distinctions: standard vs. baseline (both mandatory but at different scopes), policy vs. standard (both mandatory but at different abstraction levels), guideline vs. procedure (recommendation vs. mandatory steps).

| document | definition | required? | example | who writes |
|---|---|---|---|---|
| Policy | High-level mandatory statement of management intent [s1] | Mandatory [s1] | Acceptable Use Policy [s1] | Senior management [s1] |
| Standard | Mandatory specific requirement supporting a policy [s1] | Mandatory [s1] | Password complexity standard [s1] | Security team with management approval [s1] |
| Procedure | Mandatory step-by-step instructions to perform a task [s1] | Mandatory in execution [s1] | Account-provisioning runbook [s1] | Operations team [s1] |
| Guideline | Recommended practice that is not mandatory [s1] | Optional [s1] | Recommended secure-coding practices [s1] | Subject-matter experts [s1] |
| Baseline | Mandatory minimum configuration state for an asset class [s1] | Mandatory [s1] | Hardened OS configuration baseline [s1] | Engineering or operations team [s1] |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. No parentheticals in cells. The repeated `Mandatory` value across Policy/Standard/Baseline is intentional — it lets the engine detect shared-Value matches across rows and surface the *one* row (Guideline) that is non-mandatory.
- **Tags 1.3 and 1.7 retained from stub.** Cross-tagged to (ISC)² 2024 outline §1.3 *Determine compliance and other requirements* and §1.7 (security awareness/training as the practical application of governance documents).
- **Policy vs. Standard.** Most-confused pair. Policies state *what* and *why* in high-level language ("we require strong authentication"). Standards state *how* in specific, measurable terms ("passwords must be 12+ characters with mixed case and symbols"). Policies change rarely and require senior approval; standards change more often and live with the security team.
- **Guideline is the only optional document.** Every other type carries mandatory force. Guidelines exist to capture *good practice* that is not strict enough to mandate (often because the practice is context-dependent, emerging, or subjective). The CISSP exam frequently tests this — "which document is recommended but not required?" → Guideline.
- **Baseline is configuration-specific.** A baseline is the *mandatory minimum configuration state* for a class of assets (Windows servers, network switches, etc.). It is mandatory, but its scope is narrower than a standard — a standard might say "all systems must meet a hardening baseline"; the baseline itself enumerates the specific settings. See `configuration-baselines.md` in Domain 7 for the operational angle.
- **Procedure is mandatory in execution.** Procedures are followed step-by-step when the task is performed. They are not "always read" the way a policy is; they are referenced when the work is done. Their mandatory force kicks in when someone is *executing* the task — deviation requires explicit authorization.
- **Document hierarchy: top-down mandates, bottom-up support.** Policies establish *what* must be true; standards specify *how* to comply; procedures execute *the work*; baselines define *minimum acceptable state*; guidelines suggest *additional good practice*. A complete program has all five layers; missing any layer creates ambiguity.
- **Gaps marked `[needs source]`:** none — all Facts trace to standard CISSP governance-document framing.

## Engine demo opportunities

- `? | required? → Optional` → Guideline (the only non-mandatory row)
- `Policy | who writes → ?` → `Senior management`
- `? | example → Password complexity standard` → Standard
- `Procedure | required? → ?` → `Mandatory in execution`
- `Baseline | example → ?` → `Hardened OS configuration baseline`
- Cross-Row shared-Value detection: `? | required? → Mandatory` → Policy, Standard, Baseline (select-all)
- Composite Row profile: Policy across all Columns with `required?` swapped to `Optional` (Guideline's value)

## Sources

- `[s1]`: NIST SP 800-12 Rev. 1 *An Introduction to Information Security*, June 2017 — governance document hierarchy framing (retrieved 2026-04-26, https://csrc.nist.gov/pubs/sp/800/12/r1/final). Cross-referenced against CISSP CBK enumerations.
- `[s2]`: (ISC)² CISSP Certification Exam Outline, effective 2024-04-15, Domain 1 §1.3 and §1.7 (retrieved 2026-04-26, https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline)
