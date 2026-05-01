# SBAR Handoff Structure

**Topic:** 1 — Management of Care &nbsp;|&nbsp; **Pattern:** Ordered &nbsp;|&nbsp; **Tags:** 1.6, IP-CD
**Status:** draft (SME review pending)

The four-step structured communication frame used during nurse-to-nurse, nurse-to-provider, and inter-facility handoffs. AHRQ PSNet defines SBAR as a structured handoff tool that "minimizes misunderstandings" by organizing the transmitting clinician's content into four canonical sections; the AHRQ Patient Safety and Quality nursing handbook attributes reduced missing-information events in handoffs to SBAR adoption. NCLEX-RN tests the structure under sub-objective 1.6 (Collaboration with Interdisciplinary Team) within the Communication and Documentation Integrated Process.

**Layout convention:** rows are the four SBAR steps in canonical S → B → A → R order. Columns progress left → right from terse role-of-the-step identifier (What goes here) through the most-frequently-omitted content at that step (Common omission) to a concrete artifact a nurse would say (Example). Each `<br>`-separated item is one atomic Fact.

| # | Step | What goes here | Common omission | Example |
|---|---|---|---|---|
| 1 | Situation | Current issue or concern [s1]<br>Reason for the call or handoff [s1]<br>Patient identifier [s2]<br>Patient location [s2] | Patient name [s2]<br>Room or unit [s2]<br>Specific complaint that triggered the call [s1] | Mr. Diaz [synthesis, s2]<br>Bed 4B [synthesis, s2]<br>New chest pain since 0200 [synthesis, s1] |
| 2 | Background | Relevant patient history [s1]<br>Pertinent context [s1]<br>Admitting diagnosis [s2]<br>Allergies [s2]<br>Code status [s2]<br>Current medications [s2] | Allergies [s2]<br>Code status [s2]<br>Anticipated problems [s2] | Admitted yesterday for community-acquired pneumonia [synthesis, s1, s2]<br>NKDA [synthesis, s2]<br>Full code [synthesis, s2]<br>On ceftriaxone IV [synthesis, s2] |
| 3 | Assessment | Clinician's analysis of the situation [s1]<br>Clinician's interpretation of the situation [s1]<br>Current vital signs [s2]<br>Working impression [s1] | Vital signs at time of concern [s2]<br>Stated clinical impression [s1] | BP 88/54 [synthesis, s2]<br>HR 122 [synthesis, s2]<br>SpO2 89% on 2L [synthesis, s2]<br>Concerned for sepsis [synthesis, s1] |
| 4 | Recommendation | Suggested next steps [s1]<br>Proposed actions [s1]<br>Specific request [s1]<br>Timeframe for action [s1] | The recommendation itself [s1]<br>Timeframe for the requested action [s1] | Request rapid response evaluation now [synthesis, s1]<br>Request order for IV fluid bolus [synthesis, s1] |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. No parentheticals in cells.
- **Example column content is synthesis-by-direct-derivation.** AHRQ PSNet defines what each step contains in principle (e.g., "current issue or concern" for Situation); the Example cells assemble a single illustrative bedside case (sepsis-presenting pneumonia patient) to show those principles instantiated. Each Example Fact is tagged `synthesis` plus the source(s) it derives from. PSNet does not publish this specific case, but every Example Fact is a direct restatement of the cell-content principle PSNet defines for that step. This is mechanical synthesis per the skill's synthesis-by-direct-derivation rule, not unsourced content; the unsourced-values table below is therefore empty.
- **Why "Common omission" is its own column.** The AHRQ Patient Safety and Quality nursing handbook chapter on handoffs identifies the recurring failure mode as "omissions of essential information such as medications, code status, and anticipated problems," with a study finding errors in 67% of handoff sheets driven by missing allergy, weight, and medication information. Atomizing those omissions per-step (rather than as one Notes paragraph) lets the engine probe the omission-by-step pairing directly.
- **Step 1 Situation atomization.** "Patient identifier" and "Patient location" are split into two Facts because in practice they are independently omittable — a nurse may say "Mr. Diaz has new chest pain" without specifying the bed, or "patient in 4B has new chest pain" without naming the patient. Both omissions are distinct safety concerns.
- **Step 2 Background atomization.** Allergies, code status, and current medications are listed as separate Facts inside the cell rather than collapsed into "patient history" because each is independently omittable and each is independently testable. The handbook's "missing allergy and weight, and incorrect medication information" finding directly motivates the split.
- **Step 4 Recommendation atomization.** "Specific request" and "Timeframe for action" are split because the most-cited Recommendation failure pattern in patient-safety literature is a vague request without a timeframe ("can you come see the patient" without "now" or "within the hour"). The two are independently testable failure modes.
- **SBAR vs I-PASS.** AHRQ PSNet describes I-PASS (Illness severity, Patient summary, Action list, Situation awareness/contingency plans, Synthesis by receiver) as a parallel structured handoff approach; "results are mixed on the effectiveness of SBAR" per PSNet, but SBAR remains the NCSBN-test-plan canonical frame and the dominant nurse-to-provider tool. Out of scope here — I-PASS would be a sibling Concept if SME wants it.
- **SBAR is not a replacement for read-back.** The AHRQ chapter describes read-back verification (receiver repeats the critical information back) as a separate safety step that runs *during or after* a handoff regardless of structure. Out of scope for this Concept; captured in `care-transition-events.md` (1.9) under handoff method.
- **NCSBN exam framing.** The 2026 NCLEX-RN Test Plan does not enumerate the four SBAR letters in its public Related Content list — it references "Collaboration with Interdisciplinary Team" at 1.6 as the testable construct, with SBAR as the canonical pedagogy item-writers use. `[s3]` is cited at the registry level for exam scope, not per-cell, since the test plan does not enumerate SBAR contents.
- **Cross-Concept links.** Sibling `care-transition-events.md` (1.9) covers handoff method by transition type (admission, intra-facility transfer, shift handoff, discharge); this Concept covers the structure used during those transitions. Sibling `interdisciplinary-team-members.md` (1.6) covers who to hand off to / refer to; this Concept covers how. Sibling `five-rights-of-delegation.md` (1.3) covers the delegation frame, which NCSBN explicitly distinguishes from handoff (delegation transfers an activity; handoff transfers patient-care responsibility).

### Tricky distractors

- **Situation vs Background.** Wrong-answer pattern: putting admitting diagnosis ("admitted for pneumonia") in Situation. Admitting diagnosis is Background context — Situation is the *current* concern that triggered the call.
- **Background vs Assessment.** Wrong-answer pattern: putting current vital signs ("BP 88/54") in Background. Background is the prior-context lane; current vitals at time of concern belong in Assessment because they are the data feeding the clinician's interpretation.
- **Assessment vs Recommendation.** Wrong-answer pattern: stating a working impression ("I think this is sepsis") and stopping. The Assessment names the problem; without a Recommendation, the receiver does not know what action the caller wants. Skipping Recommendation is the most-cited SBAR failure pattern.
- **Recommendation must be specific.** Wrong-answer pattern: "Could you come see the patient?" (vague, no timeframe). A complete Recommendation names the requested action and the timeframe — e.g., "Request rapid response now" or "Request fluid-bolus order before next vitals check."
- **SBAR vs read-back.** Wrong-answer pattern: treating SBAR as the verification mechanism. SBAR structures the *transmission*; verification (read-back, teach-back-style confirmation by the receiver) is a separate safety step. NCSBN-style items may pair SBAR completion with absent read-back and ask for the next nursing action.

### Values without a direct public citation

| Cell | Value | Why unsourced |
|---|---|---|
| (none) | — | Every cell's principle traces to AHRQ PSNet `[s1]` and/or the AHRQ Patient Safety and Quality nursing handbook `[s2]`. The Example cells are synthesis-by-direct-derivation: each Example Fact is a bedside instantiation of the step-content principle defined in `[s1]`/`[s2]`, tagged `synthesis` per the skill's transformation-disclosure rule. Per skill workflow, mechanical synthesis is sourced content with a transformation note, not unsourced content; this table therefore lists no rows but is included to confirm the all-cited status. |

## Engine demo opportunities

- `2 | Step → ?` → Background.
- `? | Step → Recommendation` → 4.
- `1 | What goes here → ?` → Current issue or concern / Reason for the call or handoff / Patient identifier / Patient location (multi-Fact cell, select-all).
- `3 | Common omission → ?` → Vital signs at time of concern / Stated clinical impression (multi-Fact cell, select-all).
- `? | Common omission → The recommendation itself` → 4 (Recommendation).
- `? | Common omission → Code status` → 2 (Background).
- Sequence (adjacency): `Step (n+1 where Step n | Step → Situation) | Step → ?` → Background.
- Composite Row profile: Step #2 across all Columns, with one cell swapped to a Step #3 Value as distractor (e.g., "BP 88/54" surfacing in Background's Example column instead of Assessment's).

## Sources

- `[s1]`: AHRQ Patient Safety Network (PSNet), *Handoffs and Signouts* primer, SBAR section. Defines the four SBAR steps and notes mixed effectiveness results plus I-PASS as a parallel approach. Retrieved 2026-04-26 from https://psnet.ahrq.gov/primer/handoffs-and-signouts
- `[s2]`: Friesen MA, White SV, Byers JF. *Handoffs: Implications for Nurses.* In: Hughes RG, ed. *Patient Safety and Quality: An Evidence-Based Handbook for Nurses* (AHRQ Publication No. 08-0043). Rockville, MD: Agency for Healthcare Research and Quality; 2008. Chapter 34. Source for omission patterns ("omissions of essential information such as medications, code status, and anticipated problems"; 67% handoff-sheet error rate; missing allergy/weight/medication information). Retrieved 2026-04-26 from https://www.ncbi.nlm.nih.gov/books/NBK2649/
- `[s3]`: NCSBN, *2026 NCLEX-RN Test Plan*, effective April 1, 2026 – March 31, 2029, §1.6 Collaboration with Interdisciplinary Team (Management of Care, Safe and Effective Care Environment). Cited at registry level for exam scope; the public Related Content statement does not enumerate SBAR letters per-cell. Retrieved 2026-04-26 from https://www.ncsbn.org/publications/2026-nclex-rn-test-plan and https://www.nclex.com/files/2026_RN_Test%20Plan_English-F.pdf
