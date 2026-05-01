# Quality Improvement Cycle (PDSA)

**Topic:** 1 — Management of Care &nbsp;|&nbsp; **Pattern:** Ordered &nbsp;|&nbsp; **Tags:** 1.15, IP-CJ
**Status:** draft (SME review pending)

The four-step iterative cycle nurses use to test small changes in care processes and decide whether to adopt, adapt, or abandon them. Plan-Do-Study-Act (PDSA) is the AHRQ- and CMS-published method for quality improvement at the unit and facility level, and is the canonical frame for NCLEX-RN sub-objective 1.15 (Performance Improvement / Quality Improvement). NCSBN's 2026 RN test plan asks the candidate to define performance-improvement activities, participate in QI projects, and evaluate the impact of QI measures — PDSA is the cycle those activities run inside.

**Layout convention:** rows are the four PDSA steps in AHRQ-published order. Columns progress left → right from the activity performed at that step (Activity) through the QI tool typically used to support that step (Tool) to the artifact the step produces (Output). Each `<br>`-separated item is one atomic Fact.

| # | Step | Activity | Tool | Output |
|---|---|---|---|---|
| 1 | Plan | State the objective of the test [s1]<br>Make predictions about what will happen [s1]<br>Assign tasks, roles, and due dates [s2]<br>Specify what data will be collected [s1] | SMART aim statement [s4]<br>Fishbone diagram [s4]<br>Key driver diagram [s4]<br>PDSA worksheet [s2] | Test plan [s1]<br>Predicted outcome [s1]<br>Data-collection plan [s1] |
| 2 | Do | Carry out the test on a small scale [s2]<br>Document problems encountered [s1]<br>Document unexpected observations [s1]<br>Begin data collection [s1] | One-nurse / one-patient / one-shift test [s3]<br>PDSA worksheet [s2] | Completed small-scale test [s2]<br>Collected data [s1]<br>Field notes [s1] |
| 3 | Study | Analyze the data [s2]<br>Compare results to predictions [s2]<br>Summarize what was learned [s1] | Run chart [s4]<br>Control chart [s4]<br>PDSA worksheet [s2] | Comparison of actual to predicted [s2]<br>Lessons learned [s1] |
| 4 | Act | Decide to adopt the change [s2]<br>Decide to adapt the change [s2]<br>Decide to abandon the change [s2]<br>Plan the next cycle [s2] | PDSA worksheet [s2] | Adopt / adapt / abandon decision [s2]<br>Next-cycle plan [s2] |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. No parentheticals in cells.
- **PDSA vs PDCA naming.** This Concept uses "Study" (PDSA), the dominant modern naming in AHRQ, CMS, and IHI publications. Deming reframed Shewhart's earlier "Check" as "Study" to emphasize learning from data rather than mere conformance verification. AHRQ's digital-healthcare workflow toolkit still publishes a "Plan-Do-Check-Act" page; treat PDCA and PDSA as the same cycle. NCLEX exam content uses both names; the cycle steps are equivalent.
- **Topic 1 README short form.** The Topic 1 README lists the third Row as `Study/Check`. This Concept uses `Study` as the Row name to satisfy atomicity (a slashed compound would smuggle two values into one cell). The PDCA alternative is documented here in Notes rather than in the table.
- **Small scale is the point.** The "Do" step is deliberately small (e.g., one nurse, one patient, one shift) so that failures are recoverable and the team can iterate. Scaling up is itself a separate decision that lives inside "Act" (`adopt` may mean expand from one unit to the whole floor in the next cycle).
- **The cycle is iterative.** "Act" feeds back into "Plan" of the next cycle — the QI literature describes this as a series of "ramps" or sequential PDSA cycles, not a single pass. The table represents one cycle.
- **Distinct from the nursing process (ADPIE).** Both are iterative frameworks but operate at different scopes — the nursing process governs care for one client (Assessment, Diagnosis, Planning, Implementation, Evaluation), while PDSA governs change to a care process across a unit or facility. NCLEX 1.15 is PDSA; NCLEX clinical-judgment items use ADPIE / NCJMM.
- **Distinct from root-cause analysis (RCA).** RCA is a retrospective sentinel-event tool that asks "why did this happen?" — PDSA is a prospective improvement tool that asks "will this change make things better?" Sibling Concept `sentinel-event-examples.md` covers RCA-triggering events.
- **Cross-Concept links.** Sibling `sentinel-event-examples.md` (1.15) covers the events that trigger mandatory review (which can in turn seed a PDSA cycle). Sibling `incident-report-rules.md` (1.14, 1.15) covers the incident-reporting workflow that often surfaces issues for QI.
- **Out of scope.** Six Sigma DMAIC, Lean, and the IHI Triple Aim are alternative or complementary QI frameworks; they are not on the NCLEX-RN 1.15 line. PDSA is the cycle the test plan implies.

### Tricky distractors

- **Plan vs Do.** Wrong-answer pattern: collecting data is "Do," not "Plan." The Plan step *specifies* what data will be collected; the Do step *collects* it.
- **Study vs Act.** Wrong-answer pattern: deciding to adopt the change is "Act," not "Study." Study compares results to predictions and surfaces what was learned; Act is the decision step (adopt / adapt / abandon) and sets up the next cycle.
- **Quality improvement vs quality assurance.** QA is retrospective and compliance-focused (was the standard met?); QI is prospective and change-focused (will this make care better?). NCSBN 1.15 uses both terms, and the cycle described is PDSA — a QI cycle, not a QA audit.
- **PDSA vs nursing process.** Wrong-answer pattern: substituting Assessment / Diagnosis / Planning / Implementation / Evaluation for Plan / Do / Study / Act. Different scope, different exam tag.

### Values without a direct public citation

| Cell | Value | Why unsourced |
|---|---|---|
| Plan × Output: `Predicted outcome`, `Data-collection plan` | Cell values | Direct mechanical restatement of the AHRQ "Plan" prompts ("make predictions about what will happen", "specify what data will be collected") as deliverables — sourced to `[s1]` but listed here for transparency since the "Output" framing is authoring synthesis, not AHRQ phrasing. |
| Do × Output: `Field notes` | Cell value | AHRQ's "Do" step calls for documenting problems and unexpected observations `[s1]`; "field notes" is the standard nursing-pedagogy label for that artifact. No canonical AHRQ term for the artifact itself. |
| Study × Output: `Lessons learned` | Cell value | AHRQ's "Study" step calls for summarizing what was learned `[s1]`; "lessons learned" is the conventional QI-pedagogy term for that summary artifact. |

## Engine demo opportunities

- `2 | Step → ?` → Do.
- `? | Step → Study` → 3.
- `Plan | Tool → ?` → SMART aim statement / Fishbone diagram / Key driver diagram / PDSA worksheet (multi-Fact cell, select-all).
- `Study | Activity → ?` → Analyze the data / Compare results to predictions / Summarize what was learned (multi-Fact cell, select-all).
- `? | Activity → Carry out the test on a small scale` → 2 (Do).
- `? | Activity → Compare results to predictions` → 3 (Study).
- `? | Tool → Run chart` → 3 (Study).
- Sequence (adjacency): `Step (n+1 where Step n | Step → Do) | Step → ?` → Study.
- Composite Row profile: Step #3 (Study) across all Columns, with one cell swapped to a Step #4 (Act) Value as distractor (e.g., "Decide to adopt the change" placed under Study).

## Sources

- `[s1]`: AHRQ, *Plan-Do-Study-Act (PDSA) Cycle*, Health Literacy Universal Precautions Toolkit, 2nd ed., Tool 2B (Worksheet, Directions, and Examples). Retrieved 2026-04-26 from https://www.ahrq.gov/health-literacy/improve/precautions/tool2b.html
- `[s2]`: AHRQ EvidenceNOW, *Worksheet for Plan-Do-Study-Act (PDSA) Cycle Planning* and *Fillable Plan Do Study Act (PDSA) Tool for Health Care Quality Improvement*. Retrieved 2026-04-26 from https://www.ahrq.gov/evidencenow/tools/pdsa-worksheet.html and https://www.ahrq.gov/evidencenow/tools/pdsa-form.html
- `[s3]`: AHRQ Patient Safety Network (PSNet), Leis JA & Shojania KG, *A primer on PDSA: executing plan–do–study–act cycles in practice, not just in name*, BMJ Qual Saf 2017;26(7):572–577 (DOI 10.1136/bmjqs-2016-006245). Retrieved 2026-04-26 from https://psnet.ahrq.gov/issue/primer-pdsa-executing-plan-do-study-act-cycles-practice-not-just-name
- `[s4]`: NIH/NLM StatPearls, *Quality Improvement Methods (LEAN, PDSA, SIX SIGMA)* (NBK599556), supplemented by AHRQ digital-healthcare workflow toolkit *Plan-Do-Check-Act Cycle* page (PDCA equivalent naming). Retrieved 2026-04-26 from https://www.ncbi.nlm.nih.gov/books/NBK599556/ and https://digital.ahrq.gov/health-it-tools-and-resources/evaluation-resources/workflow-assessment-health-it-toolkit/all-workflow-tools/plan-do-check-act-cycle
- `[s5]`: NCSBN, *2026 NCLEX-RN Test Plan*, effective April 1, 2026 – March 31, 2029, §1.15 Performance Improvement (Quality Improvement) (Management of Care, Safe and Effective Care Environment) — activity statements: "Define performance improvement/quality assurance activities", "Participate in performance improvement projects and quality improvement processes", "Report identified client care issues to appropriate personnel", "Utilize research and other references for performance improvement actions", "Evaluate the impact of performance improvement measures on client care and resource use". Retrieved 2026-04-26 from https://www.ncsbn.org/publications/2026-nclex-rn-test-plan and https://www.nclex.com/files/2026_RN_Test%20Plan_English-F.pdf
