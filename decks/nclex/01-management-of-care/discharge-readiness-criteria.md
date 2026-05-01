# Discharge Readiness Criteria

**Topic:** 1 — Management of Care &nbsp;|&nbsp; **Pattern:** Aspects &nbsp;|&nbsp; **Tags:** 1.9, IP-TL, IP-CD
**Status:** draft (SME review pending)

Discharge readiness is the state in which a hospitalized client is judged safe to transition to the next level of care. It is a single artifact with multiple facets — what clinical findings must be in place, how the nurse confirms the client and caregiver actually understood the teaching, what follow-up care is arranged, what symptoms warrant return-for-care, and what gets documented. The AHRQ Re-Engineered Discharge (RED) toolkit and AHRQ teach-back materials are the canonical primary sources; Joint Commission's Provision of Care chapter and NCSBN sub-objective 1.9 (Continuity of Care) define the regulatory and exam-relevant scope.

| Aspect | Discharge readiness |
|---|---|
| clinical criteria | Stable vital signs [s1]<br>Pain controlled on planned outpatient regimen [s1]<br>Tolerating oral intake [s1]<br>Voiding adequately [s1]<br>Ambulation at baseline or planned level [s1]<br>Wound or surgical site stable [s1]<br>Pending labs and tests followed up [s1]<br>Medication reconciliation completed [s1, s7]<br>Postdischarge equipment and home services arranged [s1] |
| teach-back checks | Open-ended prompt starting with what or how [s3, s4]<br>Avoid yes-or-no questions [s3, s4]<br>Client repeats information in own words [s3, s4]<br>Caregiver repeats information in own words [s3]<br>Chunk and check throughout the encounter [s3, s4]<br>Reteach with a different approach if misunderstanding surfaces [s3, s4]<br>Repeat teach-back until accurate [s3, s4]<br>Frame as checking the explanation, not testing the client [s3, s4]<br>Confirm comprehension before discharge [s1, s3] |
| follow-up arrangement | Follow-up appointment scheduled before discharge [s1]<br>Appointment date, time, and location given to client in writing [s1, s5]<br>Primary care provider contact information provided [s2]<br>After-hours contact pathway provided [s2]<br>Postdischarge follow-up phone call within 2 to 4 days [s1, s2]<br>Discharge summary transmitted to receiving clinician [s1]<br>Home services and durable medical equipment confirmed in place [s1] |
| red flags | Signs and symptoms that warrant return-for-care reviewed with client [s1, s2]<br>Distinction between emergency and non-emergency situations explained [s2]<br>Action steps for an emergency specified [s2]<br>How to reach the primary care provider after hours specified [s2]<br>When to call 911 specified [s2]<br>Diagnosis-specific worsening signs reviewed [s1]<br>Medication adverse-effect warning signs reviewed [s1, s7] |
| documentation | Written discharge instructions provided to client [s1, s5]<br>Instructions written at the client's literacy level [s1, s3]<br>Language-assistance services used when indicated [s1]<br>Medication list reconciled and documented [s1, s7]<br>Teach-back confirmation of comprehension documented [s1, s3]<br>Follow-up appointments documented [s1]<br>Red-flag teaching documented [s1, s2]<br>Discharge summary transmitted to next-level clinician documented [s1, s5] |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. No parentheticals in cells.
- **Aspects single-Row scope qualifiers.** Where a Fact carries a scope qualifier (e.g., "Postdischarge follow-up phone call within 2 to 4 days," "Behavioral emergency restraint…" pattern from sibling Concepts), the qualifier is part of the canonical AHRQ phrasing, not a smuggled sub-Fact. Per `knowledge-map.md` Aspects parens-safety carve-out, splitting these timing or scope qualifiers into a separate Column would create a Column carrying only one cell. Kept inline as documented exception. No actual parentheses appear in cells.
- **AHRQ RED is the canonical source.** The 12 components of RED (review of records, in-hospital meeting with client, follow-up on pending tests, organize equipment and services, medication identification and reconciliation, reconcile plan with national guidelines, teach written discharge plan, assess client understanding, review what to do if a problem arises, written discharge plan, transmit discharge summary, postdischarge follow-up phone call) are mapped across the five Aspects Columns. The RED component "review what to do if a problem arises" is the source of the red flags Column; "assess the degree of patient understanding" is the source of the teach-back checks Column.
- **Teach-back is the AHRQ method, not generic Q&A.** The teach-back checks Column reflects AHRQ's specific convention: open-ended prompts (what / how, not yes/no), client repeats in own words, "chunk and check" throughout the encounter rather than at the end, reteach if comprehension is incomplete, and frame as checking the clinician's explanation rather than testing the client. NCLEX 1.9 items routinely test this distinction — a yes/no comprehension check ("Do you understand?") is a wrong-answer pattern.
- **Cross-Concept links.** Sibling `care-transition-events.md` (1.9) covers the broader transition taxonomy (admission / intra-facility / inter-facility / shift handoff / discharge); this Concept zooms in on the discharge transition's readiness criteria. Sibling `sbar-handoff-structure.md` (1.6) covers the handoff communication structure used to transmit the discharge summary. Sibling `incident-report-rules.md` (1.14) covers documentation of unsafe discharges that result in events. Out of scope here: condition-specific discharge teaching content (e.g., heart-failure daily weights, post-op activity restrictions) which lives in respective Topic 7 / Topic 8 disease Concepts.
- **NCLEX 1.9 vs 1.16 (Referrals).** Follow-up arrangement here covers the discharge-bound scheduling and transmission. The broader question of which interdisciplinary role to refer to lives in `interdisciplinary-team-members.md` (1.6 / 1.16).

### Tricky distractors

- **Teach-back vs yes/no comprehension check.** "Do you understand the discharge instructions?" is a closed-ended yes/no question and does not satisfy AHRQ teach-back. The teach-back convention is an open-ended prompt that asks the client to explain the plan in their own words. Wrong-answer pattern: nurse asks the client "Do you understand?" and documents "client verbalized understanding."
- **Client repeats in own words vs reads back.** Reading the discharge instructions back to the nurse confirms literacy, not comprehension. Teach-back requires the client to paraphrase. Wrong-answer pattern: nurse hands written instructions and asks client to read them aloud.
- **Discharge summary vs discharge instructions.** Two artifacts. Discharge instructions go to the client (written, literacy-appropriate, with red flags and follow-up). Discharge summary goes to the next-level clinician (clinical course, medication list, pending labs, follow-up plan). NCLEX items conflate them; the nurse's teach-back is on the instructions, not the summary.
- **Follow-up phone call timing.** AHRQ RED specifies the postdischarge follow-up phone call within 2 to 4 days after discharge. Wrong-answer pattern: "within 24 hours" or "within 2 weeks."
- **Reteaching is part of teach-back, not a separate step.** When teach-back uncovers a misunderstanding, the nurse reteaches using a different approach and asks for teach-back again. Documenting "client unable to teach back" without reteaching is incomplete care. Wrong-answer pattern: nurse documents incomplete teach-back and proceeds to discharge.

### Values without a direct public citation

| Cell | Value | Why unsourced |
|---|---|---|
| (none) | — | All cells traced to AHRQ RED toolkit, AHRQ teach-back materials, Joint Commission Provision of Care, or NCSBN 2026 §1.9. |

## Engine demo opportunities

- `Discharge readiness | clinical criteria → ?` → Stable vital signs / Pain controlled on planned outpatient regimen / Tolerating oral intake / Voiding adequately / Ambulation at baseline or planned level / Wound or surgical site stable / Pending labs and tests followed up / Medication reconciliation completed / Postdischarge equipment and home services arranged (select-all)
- `Discharge readiness | teach-back checks → ?` → Open-ended prompt starting with what or how / Client repeats information in own words / Chunk and check throughout the encounter / Reteach with a different approach if misunderstanding surfaces / Frame as checking the explanation, not testing the client (select-all)
- `Discharge readiness | follow-up arrangement → ?` → Follow-up appointment scheduled before discharge / Postdischarge follow-up phone call within 2 to 4 days / Discharge summary transmitted to receiving clinician (select-all)
- `Discharge readiness | red flags → ?` → Signs and symptoms that warrant return-for-care reviewed with client / When to call 911 specified / Diagnosis-specific worsening signs reviewed (select-all)
- `Discharge readiness | documentation → ?` → Written discharge instructions provided to client / Teach-back confirmation of comprehension documented / Red-flag teaching documented (select-all)
- True/false: `Discharge readiness | teach-back checks → Avoid yes-or-no questions` → True
- True/false: `Discharge readiness | teach-back checks → Yes-or-no question to confirm understanding` → False (cross-Column distractor; the teach-back convention explicitly avoids yes/no)
- `Discharge readiness | ? → Postdischarge follow-up phone call within 2 to 4 days` → follow-up arrangement (single hidden Column)
- `Discharge readiness | ? → Client repeats information in own words` → teach-back checks (single hidden Column)

## Sources

- `[s1]`: AHRQ, "Re-Engineered Discharge (RED) Toolkit," landing page and component overview (retrieved 2026-04-26, https://www.ahrq.gov/patient-safety/settings/hospital/red/toolkit/index.html and https://www.ahrq.gov/patient-safety/settings/hospital/red/toolkit/redtool1.html)
- `[s2]`: AHRQ, "Tool 5: How To Conduct a Postdischarge Followup Phone Call," RED Toolkit (retrieved 2026-04-26, https://www.ahrq.gov/patient-safety/settings/hospital/red/toolkit/redtool5.html)
- `[s3]`: AHRQ, "Use the Teach-Back Method: Tool 5," Health Literacy Universal Precautions Toolkit, 3rd Edition (retrieved 2026-04-26, https://www.ahrq.gov/health-literacy/improve/precautions/tool5.html and https://www.ahrq.gov/sites/default/files/publications2/files/health-literacy-universal-precautions-toolkit-3rd-edition.pdf)
- `[s4]`: AHRQ, "The SHARE Approach—Using the Teach-Back Technique: A Reference Guide for Health Care Providers" (retrieved 2026-04-26, https://www.ahrq.gov/health-literacy/professional-training/shared-decision/tool/resource-6.html)
- `[s5]`: The Joint Commission, "Provision of Care – Providing Written Information at Time of Discharge," Standards FAQ (retrieved 2026-04-26, https://www.jointcommission.org/standards/standard-faqs/hospital-and-hospital-clinics/provision-of-care-treatment-and-services-pc/000002505/)
- `[s6]`: NCSBN, "2026 NCLEX-RN Test Plan," effective April 1, 2026 – March 31, 2029, §1.9 Continuity of Care (retrieved 2026-04-26, https://www.ncsbn.org/publications/2026-nclex-rn-test-plan and https://www.nclex.com/files/2026_RN_Test%20Plan_English-F.pdf)
- `[s7]`: The Joint Commission, "Quick Safety 26: Transitions of Care: Managing medications," updated April 2022 (retrieved 2026-04-26, https://www.jointcommission.org/resources/news-and-multimedia/newsletters/newsletters/quick-safety/quick-safety-issue-26-transitions-of-care-managing-medications/transitions-of-care-managing-medications/)
