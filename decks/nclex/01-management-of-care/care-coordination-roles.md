# Care Coordination Roles

**Topic:** 1 — Management of Care &nbsp;|&nbsp; **Pattern:** Dimensions &nbsp;|&nbsp; **Tags:** 1.4, 1.6, IP-CD
**Status:** draft (SME review pending)

The five role labels NCLEX uses to test "who does what" within hospital-based care coordination. Rows are role titles; columns are scope, when consulted, and typical output. Role boundaries vary materially by institution — case manager and care coordinator overlap heavily in practice — so this Concept captures the canonical pedagogical distinction (case manager = clinical-financial integration anchored to AHRQ/CMSA case-management definition; care coordinator = transitions/communication-focused, anchored to AHRQ care-coordination definition). Sibling Concept `interdisciplinary-team-members.md` covers the broader clinical team (RN, MD, RT, PT, OT, etc.); this one stays inside coordination-specific roles.

| Role | scope | when consulted | typical output |
|---|---|---|---|
| Case manager | Assessment of complex client needs [s2]<br>Planning of services [s2]<br>Facilitation across providers [s2]<br>Advocacy for resources [s2]<br>Cost-effective outcome promotion [s2] | Complex client requiring coordination across multiple service domains [s2]<br>High-risk client with diverse health, functional, and social problems [s2] | Individualized case-management plan [s2]<br>Designated accountability for care oversight [s2]<br>Service authorizations [s5] |
| Discharge planner | Assessment of post-discharge needs [s1]<br>Coordination with medical team [s1]<br>Identification of service gaps [s1]<br>Arrangement of post-discharge services [s1] | Before hospital release [s1]<br>Anticipated transition to home [s1]<br>Anticipated transition to longer-term care facility [s1] | Individualized discharge instructions [s1]<br>Medication instructions [s1]<br>Follow-up appointment details [s1]<br>Rehabilitation referral [s1] |
| Social worker | Psychosocial assessment [s3]<br>Linkage to community resources [s3]<br>Mental health screening [s3]<br>Brief counseling [s3]<br>End-of-life navigation support [s3] | Psychosocial barrier to discharge [s3]<br>Resource gap identified [s3]<br>Family in crisis [s3]<br>Suspected abuse or unsafe home [needs source] | Psychosocial assessment note [s3]<br>Community-resource referral [s3]<br>Documentation of barriers to discharge [s3] |
| Care coordinator | Deliberate organization of care activities across participants [s4]<br>Information exchange among providers [s4]<br>Patient navigation across the system [s4] | Care spans professional boundaries [s4]<br>Care spans organizational boundaries [s4]<br>Transitions between care settings [s4] | Coordinated care plan [s4]<br>Information transfer to receiving providers [s4]<br>Right service at right time in right setting [s4] |
| Utilization reviewer | Medical necessity determination [s6]<br>Level-of-care appropriateness review [s6]<br>Length-of-stay review [s6]<br>Pre-authorization review [s6]<br>Concurrent review [s6]<br>Retrospective review [s6] | Before a planned intervention [s6]<br>While client is admitted [s6]<br>After care delivered and billed [s6] | Medical necessity determination [s6]<br>Approval [s6]<br>Denial letter [s6]<br>Level-of-care recommendation [s6] |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. No parentheticals in cells.
- **Case manager vs care coordinator — the canonical distinction.** AHRQ defines case management as "a collaborative process of assessment, planning, facilitation and advocacy for options and services to meet an individual's health needs" with cost-effective outcomes as an explicit goal [s2]; case management designates one accountable manager for a specific complex client. Care coordination, separately defined by AHRQ, is "the deliberate organization of patient care activities between two or more participants" [s4] — it's the system-level activity, not a complex-client carve-out. Hence: case manager = clinical-financial integration for one high-risk client; care coordinator = transitions and information exchange for any client crossing boundaries. Many institutions blur or merge these titles. SME should confirm whether this Concept should keep both Rows or collapse them.
- **Discharge planner overlap.** Discharge planning is a function, not always a dedicated role. Per the StatPearls discharge-planning chapter, the team performing it "may include nurses, therapists, social workers, patients, family members, physicians, occupational and physical therapists, case managers, caregivers, and, at times, insurance companies" [s1]. In some hospitals the case manager *is* the discharge planner; in others the social worker is. The Row label `Discharge planner` here represents the function, not a guaranteed unique title.
- **Utilization reviewer credentials.** The StatPearls Utilization Management chapter notes UM is typically performed by nurses and clinical pharmacists [s6]. NCLEX may test this as a generic role label rather than a specific credential.
- **CMS billing context (background, not Facts).** CMS recognizes Transitional Care Management (TCM, CPT 99495/99496) requiring contact within 2 business days of discharge and a face-to-face visit within 7 or 14 days depending on complexity [s5]; and Chronic Care Management (CCM) for clients with two or more chronic conditions expected to last at least 12 months [s7]. These billing structures shape what case managers actually do day-to-day in US practice but are not themselves Facts in the role table.
- **Sibling Concept link.** `interdisciplinary-team-members.md` covers the broader clinical team (MD/DO, NP/PA, RN, RT, PT, OT, SLP, RD, SW, Pharmacist, Chaplain). Social worker appears in both Concepts because they participate in both the broad clinical team (as a discipline) and the coordination-roles set (as a coordination function). Tag `1.4` is unique to this Concept; `1.6` is shared.

### Tricky distractors

- **Case manager vs care coordinator.** Both coordinate care. Case manager is targeted to complex/high-risk clients with one designated accountable manager [s2]; care coordinator is the systems-level role focused on transitions and information exchange [s4]. Wrong-answer pattern: choosing case manager when the question describes a routine handoff with no complexity flag.
- **Discharge planner vs case manager.** In some hospitals the same person; in others distinct. The discharge-planning *function* belongs to the team, not a single title [s1]. Wrong-answer pattern: assuming "discharge planner" is always a separate FTE.
- **Utilization reviewer vs case manager.** Both review services. Utilization review focuses on medical necessity, level of care, length of stay, and approval/denial of payment [s6]; case management focuses on the client's care plan and outcomes [s2]. Wrong-answer pattern: confusing UR denial letters with case-management plans.
- **Social worker vs case manager for psychosocial issues.** Social worker handles psychosocial assessment, community-resource linkage, and counseling [s3]; case manager handles overall care planning and may delegate the psychosocial piece to the social worker. Wrong-answer pattern: routing a "needs Meals on Wheels" question to a case manager when the social worker is the more direct answer.

### Values without a direct public citation

| Cell | Value | Why unsourced |
|---|---|---|
| Social worker × when consulted | Suspected abuse or unsafe home | Widely-taught nursing pedagogy and a common NCLEX cue, but the AHRQ/PMC sources used here do not enumerate this trigger explicitly. Mandatory reporting laws are state-defined; SME should confirm the framing. |

## Engine demo opportunities

- `Case manager | scope → ?` → Assessment of complex client needs, Planning of services, Facilitation across providers, Advocacy for resources, Cost-effective outcome promotion (multi-Fact cell)
- `Utilization reviewer | typical output → ?` → Medical necessity determination, Approval, Denial letter, Level-of-care recommendation
- `? | when consulted → Transitions between care settings` → Care coordinator
- `? | typical output → Denial letter` → Utilization reviewer
- `Discharge planner | scope → ?` → Assessment of post-discharge needs, Coordination with medical team, Identification of service gaps, Arrangement of post-discharge services
- Composite Row profile: Case manager across all Columns, with `typical output` swapped to `Denial letter` (a Utilization reviewer Value) — tests case-manager / utilization-reviewer disambiguation.
- Composite Row profile: Care coordinator across all Columns, with `scope` swapped to `Psychosocial assessment` (a Social worker Value) — tests role-distinction.

## Sources

- `[s1]`: Sorita A et al., "Discharge Planning," StatPearls (NIH/NLM Bookshelf NBK557819), updated 2023 (retrieved 2026-04-26, https://www.ncbi.nlm.nih.gov/books/NBK557819/)
- `[s2]`: McDonald KM et al., "Definitions of Care Coordination and Related Terms," in Closing the Quality Gap: A Critical Analysis of Quality Improvement Strategies, Vol. 7: Care Coordination, AHRQ Technical Review 9.7, NIH/NLM Bookshelf NBK44012 (retrieved 2026-04-26, https://www.ncbi.nlm.nih.gov/books/NBK44012/)
- `[s3]`: Frey JJ et al., "Healthcare Social Workers' Scope of Practice during COVID-19," PMC10815567 / Hospital Social Work scope literature surveyed via PMC (retrieved 2026-04-26, https://pmc.ncbi.nlm.nih.gov/articles/PMC10815567/)
- `[s4]`: AHRQ National Center for Excellence in Primary Care Research, "Care Coordination Measures Atlas Update — Chapter 2 What is Care Coordination?" (retrieved 2026-04-26, https://www.ahrq.gov/ncepcr/care/coordination/atlas/chapter2.html)
- `[s5]`: CMS, "Transitional Care Management Services," MLN908628 booklet (retrieved 2026-04-26, https://www.cms.gov/files/document/mln908628-transitional-care-management-services.pdf)
- `[s6]`: Cesta T, "Utilization Management," StatPearls (NIH/NLM Bookshelf NBK560806), updated 2023 (retrieved 2026-04-26, https://www.ncbi.nlm.nih.gov/books/NBK560806/)
- `[s7]`: CMS, "Chronic Care Management Services," MLN909188, June 2025 (retrieved 2026-04-26, https://www.cms.gov/files/document/chroniccaremanagement.pdf)
- `[s8]`: NCSBN NCLEX-RN Test Plan, effective April 1, 2026 through March 31, 2029, §1.4 Case Management and §1.6 Collaboration with Interdisciplinary Team (retrieved 2026-04-26, https://www.ncsbn.org/publications/2026-nclex-rn-test-plan)
