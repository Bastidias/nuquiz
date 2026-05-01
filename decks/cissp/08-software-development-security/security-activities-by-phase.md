# Security Activities by SDLC Phase

**Domain:** 8 — Software Development Security &nbsp;|&nbsp; **Pattern:** Dimensions &nbsp;|&nbsp; **Tags:** 8.1
**Status:** draft (SME review pending)

Maps security activities to the six canonical SDLC phases (Requirements → Design → Implementation → Testing → Deployment → Operations). The rows intentionally follow a phase-ordered sequence — this Concept uses Dimensions Pattern (not Ordered) because the primary testing axis is *which phase owns which activity*, not sequence recall. A question asking "at which SDLC phase is threat modeling performed" points to Design; "which phase runs DAST" points to Testing. Sibling Concepts handle the phase-level detail (`waterfall-phases`), the security scan types themselves (`source-code-analysis-types`), and threat-modeling methodology (`threat-modeling-in-sdlc`).

| Phase | typical security activity | owner | output |
|---|---|---|---|
| Requirements | Security requirements elicitation<br>Privacy impact assessment [s1] | Security architect<br>Product owner | Security requirements document<br>PIA report |
| Design | Threat modeling<br>Security architecture review [s1] | Security architect | Threat model<br>Mitigation list |
| Implementation | Secure coding<br>SAST<br>Code review [s1] | Developers | Source code<br>SAST findings |
| Testing | DAST<br>IAST<br>SCA<br>Penetration testing [s1] | Security testing team | Vulnerability report<br>Pen test report |
| Deployment | Configuration hardening<br>Security acceptance testing [s1] | DevOps<br>Security engineer | Hardening baseline<br>Acceptance sign-off |
| Operations | Continuous monitoring<br>Incident response<br>Patch management<br>Vulnerability scanning [s1] | Security operations | SOC alerts<br>Incident reports<br>Patch records |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. **No parentheticals in cells.** Tool categories (SAST, DAST, IAST, SCA) are treated as atomic tokens; their full expansions live in `source-code-analysis-types`.
- **NIST SSDF framing.** NIST SP 800-218 [s1] groups secure-development practices into four categories (Prepare the Organization, Protect the Software, Produce Well-Secured Software, Respond to Vulnerabilities) rather than per-SDLC-phase. The phase-to-activity mapping in this Concept is the CISSP-pedagogical arrangement of SSDF practices against the classical Waterfall / V-Model phase boundaries. OWASP SAMM [s3] is the closer per-phase framework and aligns more directly with the rows here.
- **Shift-left moves activities leftward in this table.** The DevSecOps principle of shift-left takes activities traditionally owned by the Testing row (DAST, pen testing, SCA) and runs them earlier — SAST during Implementation, SCA during Requirements (dependency review), threat modeling during Design. The table reflects the classical placement; a mature DevSecOps program compresses these phases into continuous CI/CD activity.
- **Owner column is a typical-case assignment.** Real organizations vary: Developers often run SAST themselves; Security architects sometimes own Requirements-phase activities jointly with the Product Owner; Security operations overlaps with IR teams during Operations. The cell values reflect the modal ownership model.
- **Activities are not exclusive to their phase.** Code review can also happen during Operations (post-incident); patch management starts in Implementation (dependency updates) but dominates Operations. The cell values reflect *primary* placement, not exclusive placement.
- **PIA = Privacy Impact Assessment.** Required by many privacy regulations (GDPR, CCPA implementations, HIPAA) when new systems process personal data. Treated as a Requirements-phase activity because it informs which data fields the system is allowed to collect / retain.
- **Security acceptance testing at Deployment.** Distinct from functional acceptance testing (Verification in Waterfall). Security acceptance tests verify that security controls are correctly configured in the target environment — things like TLS cipher enforcement, logging integration with SIEM, IAM role assignment. Often bundled into a Go/No-Go deployment gate.
- **Out of scope for this Concept:** specific secure coding standards (CERT, MISRA, OWASP Secure Coding Practices), DevSecOps pipeline integration detail (separate Concept — `ci-cd-pipeline-stages`), SOC operational workflows (separate D7 Concepts — `siem-soar-xdr`, `incident-response-phases`), specific patch-management workflow (separate D7 Concept — `patch-management-lifecycle`).

### Tricky distractors

- **Threat modeling is Design phase.** Not Testing or Requirements. Wrong-answer pattern: pushing threat modeling to Testing — by then design decisions are baked in.
- **SAST is Implementation; DAST is Testing.** Different phases. Wrong-answer pattern: equating them — SAST runs on source pre-build; DAST runs on a deployed app.
- **PIA is Requirements phase.** Privacy Impact Assessment informs what data the system collects. Wrong-answer pattern: scheduling PIA at Deployment — too late.
- **Shift-left moves activities earlier.** DevSecOps compresses Testing-phase tools into Implementation. Wrong-answer pattern: claiming shift-left changes which activities exist — it changes when they run.
- **Patch management dominates Operations.** Not Implementation. Wrong-answer pattern: classifying patching as a one-time deployment activity — it's continuous.
- **Security acceptance testing at Deployment.** Distinct from functional UAT. Wrong-answer pattern: collapsing security acceptance into general acceptance testing — different criteria.

### Values without a direct public citation

The per-phase activity lists are drawn from OWASP SAMM [s3] practice areas and NIST SSDF [s1] practice groupings but are not direct quotations from either source — both organize activities somewhat differently from the phase-anchored view used in CISSP pedagogy. Owner and output columns reflect modal industry practice; no single primary citation traced per cell.

| Column | Phases affected | Notes |
|---|---|---|
| owner | All phases | Role assignments reflect typical industry practice; no normative source mandates these owners. |
| output | All phases | Output artifact names are common-practice terms; no canonical list located. |

## Engine demo opportunities

- `Design | typical security activity → ?` → `Threat modeling`, `Security architecture review`
- `Testing | typical security activity → ?` → `DAST`, `IAST`, `SCA`, `Penetration testing`
- `? | typical security activity → Threat modeling` → `Design` (sole-Fact in Design multi-Fact cell)
- `? | typical security activity → SAST` → `Implementation`
- `? | typical security activity → DAST` → `Testing`
- `? | owner → Developers` → `Implementation`
- `Requirements | output → ?` → `Security requirements document`, `PIA report`
- `Operations | output → ?` → `SOC alerts`, `Incident reports`, `Patch records`
- Composite Design Row with `typical security activity` swapped to `DAST` — directly tests the SAST-vs-DAST phase placement (SAST is Implementation, DAST is Testing; neither is Design)
- Composite Testing Row with `typical security activity` swapped to `Threat modeling` — tests the threat-modeling phase placement (Design, not Testing)
- Composite Requirements Row with `owner` swapped to `Security operations` — tests the ownership gradient (SecOps owns Operations-phase activities, not Requirements-phase)

## Sources

- `[s1]`: NIST SP 800-218, "Secure Software Development Framework (SSDF) Version 1.1" — practice groupings across the software lifecycle (February 2022, retrieved 2026-04-19, https://csrc.nist.gov/publications/detail/sp/800-218/final)
- `[s2]`: NIST SP 800-160 Volume 1 Rev 1, "Engineering Trustworthy Secure Systems" — system-level secure engineering lifecycle (November 2022, retrieved 2026-04-19, https://csrc.nist.gov/publications/detail/sp/800-160/vol-1-rev-1/final)
- `[s3]`: OWASP Software Assurance Maturity Model (SAMM) v2 — per-lifecycle-phase security practice catalogue (retrieved 2026-04-19, https://owaspsamm.org/model/)
