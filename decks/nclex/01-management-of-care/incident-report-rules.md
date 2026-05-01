# Incident Report Rules

**Topic:** 1 — Management of Care &nbsp;|&nbsp; **Pattern:** Aspects &nbsp;|&nbsp; **Tags:** 1.14, 1.15, IP-CD
**Status:** draft (SME review pending)

The incident report (also called variance report, occurrence report, or patient safety event report) is the canonical internal-quality document a nurse completes when something deviates from expected care. It is a single artifact with multiple facets — when it must be filed, who files it, what factual content belongs in it, what content is forbidden, and where it routes after filing. NCLEX tests this primarily under sub-objective 1.14 (Legal Rights and Responsibilities) and 1.15 (Performance Improvement / Quality Improvement); the AHRQ Common Formats and Joint Commission sentinel-event policy are the canonical US frameworks.

| Aspect | Incident report |
|---|---|
| when required | Medication error [s1, s2]<br>Patient fall [s1, s5]<br>Patient injury [s1]<br>Equipment malfunction [s1]<br>Near miss [s1, s2]<br>Unsafe condition [s2]<br>Unexpected outcome [s1]<br>Sentinel event [s3] |
| who completes | Person with firsthand knowledge [s1]<br>Frontline staff involved [s1]<br>Witness to the event [s1]<br>Filed before end of shift [needs source] |
| what to include | Factual observations [s1, s4]<br>Objective vital signs [s4]<br>Date and time of event [s4]<br>Location of event [s4]<br>Names of witnesses [s4]<br>Persons notified [s4]<br>Actions taken [s4]<br>Condition of client after event [s4]<br>Equipment involved [s2]<br>Reporter's narrative in own words [s2] |
| what NOT to include | Speculation [s4]<br>Opinion [s4]<br>Blame attribution [s4]<br>Subjective characterizations [s4]<br>Reference to the report in the medical record [s6]<br>Copy of the report in the chart [s6] |
| where it goes | Risk management department [s1]<br>Quality assessment and performance improvement program [s7]<br>Patient Safety Organization (if facility participates) [s6]<br>The Joint Commission within 45 business days (sentinel events) [s3]<br>State regulatory body (if state-mandated event) [s7] |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. No parentheticals in cells. Where a Fact appears with a qualifying clause (e.g., "Patient Safety Organization (if facility participates)"), the parenthetical is a scope condition, not bundled sub-Facts — it disambiguates which Row applies, and the underlying Fact is still atomic. Considered splitting these into a separate `condition` Column but the Aspects Pattern is single-Row, so a separate Column would carry only one cell. Kept inline as a documented exception; flag for SME if condition-tags become a recurring need.
- **Aspects Pattern fit.** The Concept is structurally one document with multiple facets — the Aspects Pattern is correct here. A Dimensions framing (e.g., Rows = "what to include" vs "what NOT to include") was considered and rejected: the columns in that framing would be ad-hoc Fact lists with no shared attribute structure, which is exactly the case Aspects exists for. See "Tricky distractors" for how the engine still gets the include-vs-exclude contrast for free off the single-Row table.
- **Terminology variants.** "Incident report," "variance report," "occurrence report," and "patient safety event report" are used interchangeably in US hospital practice. AHRQ's canonical term is "patient safety event report"; Joint Commission's term for the most severe subset is "sentinel event." Concept name kept as "Incident Report" for buyer familiarity (NCLEX-RN test items use this phrasing).
- **Why the report is NOT in the medical record.** The incident report is an internal quality-improvement document, not part of the legal medical record. Documenting "incident report filed" in the chart is a common nursing-pedagogy distractor — it defeats the legal protection intended for the report. The objective clinical facts (the fall happened, the patient was assessed, the provider was notified) are documented in the chart; the analytical report is separate. This is the most-tested distinction in NCLEX 1.14 incident-report items.
- **Sentinel events are a special case.** Joint Commission defines a sentinel event as a patient safety event reaching the patient that results in death, severe harm, or permanent harm. Reporting to TJC is voluntary but expected; if reported, the organization has 45 business days from awareness to submit a root cause analysis and action plan (15 additional business days if reported after day 45). Sentinel-event examples (wrong-site surgery, patient suicide in care, retained foreign object) live in `sentinel-event-examples.md` (1.15); this Concept covers the report mechanics, not the event taxonomy.
- **Cross-Concept links.** Sibling `sentinel-event-examples.md` covers the TJC sentinel-event list and mandatory-reporting timelines. Sibling `tort-categories-in-nursing.md` covers the legal-tort framing (negligence, malpractice) that incident reports indirectly defend against. Sibling `quality-improvement-cycle.md` covers PDSA — incident reports are the primary input data for the "Study/Check" phase. Out of scope here: the actual content of root cause analysis (RCA), and the AHRQ Common Formats data-element schema.

### Tricky distractors

- **Incident report vs medical record.** The two are separate documents with separate legal status. Wrong-answer pattern: "Place a copy of the incident report in the patient's chart" or "Document 'incident report filed' in the nurses' notes." Both are wrong — the report is internal QI, the chart is legal record.
- **Who completes the report.** The person with firsthand knowledge of the event files it, not the charge nurse or supervisor (who are usually notified, not the filer). Wrong-answer pattern: "The charge nurse completes the incident report." Wrong unless the charge nurse witnessed the event directly.
- **Near miss vs incident.** AHRQ distinguishes incidents (reached the patient, with or without harm), near misses / close calls (did not reach the patient), and unsafe conditions (increased probability of an event). All three are reportable. Wrong-answer pattern: "No report needed — the patient was not harmed." Wrong; near misses are reportable and are the highest-yield data for prevention.
- **Objective vs subjective content.** "The patient appeared to be in pain" is subjective; "Patient rated pain 8/10 on numeric scale" is objective. Wrong-answer pattern: cells written as nursing impressions instead of measurable observations.
- **Sentinel-event timeline.** 45 business days, not 45 calendar days. Wrong-answer pattern: "Within 45 days" without the "business" qualifier — TJC explicitly specifies business days.

### Values without a direct public citation

| Cell | Value | Why unsourced |
|---|---|---|
| who completes × Filed before end of shift | Filed before end of shift | Widely-taught nursing pedagogy and standard institutional policy, but no canonical AHRQ/CMS/TJC source mandates a specific shift-bound deadline. Marked `[needs source]`; SME may confirm whether to keep, replace with a sourced timeframe (e.g., "as soon as possible after the event"), or drop. |

## Engine demo opportunities

- `Incident report | when required → ?` → Medication error / Patient fall / Patient injury / Equipment malfunction / Near miss / Unsafe condition / Unexpected outcome / Sentinel event (select-all)
- `Incident report | what to include → ?` → Factual observations / Objective vital signs / Date and time of event / Location of event / Names of witnesses / Persons notified / Actions taken / Condition of client after event / Equipment involved / Reporter's narrative in own words (select-all)
- `Incident report | what NOT to include → ?` → Speculation / Opinion / Blame attribution / Subjective characterizations / Reference to the report in the medical record / Copy of the report in the chart (select-all)
- `Incident report | ? → Risk management department` → where it goes (single hidden Column)
- `Incident report | where it goes → ?` with `Patient's medical record` as primary distractor (cross-Column trap from the "what NOT to include" cell — the engine can construct the trap directly from the table since "Reference to the report in the medical record" is a Fact in the negative-space Column)
- True/false: `Incident report | what to include → Speculation` → False (cross-Column distractor sourced from "what NOT to include")
- True/false: `Incident report | where it goes → Patient's medical record` → False (sourced from "what NOT to include")

## Sources

- `[s1]`: AHRQ PSNet, "Reporting Patient Safety Events" primer (retrieved 2026-04-26, https://psnet.ahrq.gov/primer/reporting-patient-safety-events)
- `[s2]`: AHRQ Patient Safety Organization Program, "Common Formats Overview" and "About Common Formats" (retrieved 2026-04-26, https://pso.ahrq.gov/common-formats/overview and https://pso.ahrq.gov/common-formats/about)
- `[s3]`: The Joint Commission, "Sentinel Event Policy and Procedures," Standards Interpretation (retrieved 2026-04-26, https://www.jointcommission.org/en-us/knowledge-library/support-center/standards-interpretation/sentinel-event-policy-and-procedures)
- `[s4]`: AHRQ PSNet, "Responding to Patient Safety Events" primer, and AHRQ "System-Focused Event Investigation and Analysis Guide" (CANDOR Module 4) (retrieved 2026-04-26, https://psnet.ahrq.gov/primer/responding-patient-safety-events and https://www.ahrq.gov/patient-safety/settings/hospital/candor/modules/guide4.html)
- `[s5]`: NCSBN, "2026 NCLEX-RN Test Plan," effective April 1, 2026 – March 31, 2029, §1.14 Legal Rights and Responsibilities and §1.15 Performance Improvement (retrieved 2026-04-26, https://www.ncsbn.org/publications/2026-nclex-rn-test-plan and https://www.nclex.com/files/2026_RN_Test%20Plan_English-F.pdf)
- `[s6]`: AHRQ Patient Safety Organization Program, "Frequently Asked Questions" — Patient Safety Work Product confidentiality and privilege under the Patient Safety and Quality Improvement Act of 2005 (retrieved 2026-04-26, https://pso.ahrq.gov/faq)
- `[s7]`: 42 CFR 482.21, "Condition of Participation: Quality Assessment and Performance Improvement Program," CMS Conditions of Participation for Hospitals (retrieved 2026-04-26, https://www.ecfr.gov/current/title-42/chapter-IV/subchapter-G/part-482/subpart-C/section-482.21)
