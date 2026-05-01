# Advocacy Actions by Trigger

**Topic:** 1 — Management of Care &nbsp;|&nbsp; **Pattern:** Dimensions &nbsp;|&nbsp; **Tags:** 1.2, 1.2.a, IP-CG, IP-CS, IP-CD
**Status:** draft (SME review pending)

Five recurring scenarios on NCLEX where advocacy is the operative duty: an unsafe assignment, a cultural conflict, a family member overriding a decisional client's wishes, a provider order disputed by the client, and a client's refusal of treatment or resources. Rows are triggers; columns capture the nurse's first action at the bedside, the escalation path when bedside action does not resolve the issue, and the documentation requirement. Cell content is anchored to ANA Code of Ethics provisions cited in NCBI Bookshelf nursing texts, AHRQ TeamSTEPPS communication tools (CUS, Two-Challenge Rule, Advocacy/Assertion), and AHRQ PSNet primers on speaking up and on bias affecting LGBTQ+ patients. Tag `1.2.a` (the 2026 NCLEX-RN Test Plan addition for unbiased treatment / equal access regardless of culture, ethnicity, sexual orientation, gender identity, and gender expression) attaches to the cultural-conflict and family-override Rows.

| Trigger | nurse's first action | escalation path | documentation requirement |
|---|---|---|---|
| Unsafe assignment | State the concern using CUS [s4]<br>Voice the safety issue [s4] | Charge nurse [s2]<br>Nurse supervisor [s2]<br>Director of nursing [s2] | Date and time of objection [s2]<br>Person notified [s2]<br>Follow-up actions taken [s2] |
| Cultural conflict | Engage cultural negotiation [s5]<br>Request a qualified medical interpreter [s5] | Charge nurse [s2]<br>Ethics committee [s3]<br>Chaplain or cultural liaison [s5] | Language preference [s5]<br>Interpreter name [s5]<br>Accommodations made [s5] |
| Family override of client wishes | Reaffirm the client's primary commitment [s1]<br>Support the decisional client's own informed choice [s3] | Provider [s7]<br>Charge nurse [s2]<br>Ethics committee [s3] | Capacity assessment [s6]<br>Client's stated wishes [s3]<br>Provider notification [s7] |
| Provider order disputed by client | Withhold the disputed action [s7]<br>Notify the prescribing provider [s7] | Charge nurse [s2]<br>Nurse supervisor [s2]<br>Two-Challenge Rule if provider does not respond [s9] | Client's stated objection [s3]<br>Provider notified with date and time [s2]<br>Education provided [s3] |
| Resource refusal | Assess decisional capacity [s6]<br>Explain risks at a reasonable-person level [s6] | Provider notified [s8]<br>Charge nurse [s2]<br>AMA discharge protocol if leaving [s8] | Capacity finding with basis [s8]<br>Risks explained to client [s6]<br>Client's decision to decline [s3] |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. No parentheticals in cells.
- **ANA Code of Ethics anchoring.** Provision 2 ("the nurse's primary commitment is to the patient") and Provision 3 ("the nurse promotes, advocates for, and protects the rights, health, and safety of the patient") are the substrate for every Row. Both are quoted directly in the NCBI Bookshelf StatPearls "Nursing Ethical Considerations" chapter and in the Nursing Pharmacology legal/ethical chapter [s1] [s7].
- **Tag flexibility note.** The Topic 1 README proposed Tags `1.2, 1.2.a, IP-CG, IP-CS`. `IP-CD` (Communication and Documentation) was added because the documentation column is a Communication-and-Documentation artifact in every Row — per the SKILL's Tag-flexibility convention, `IP-CD` is added when content is fundamentally about a documentation artifact. `IP-CD` is registered in `tags.md`.
- **CUS and Two-Challenge Rule (AHRQ TeamSTEPPS).** CUS is a graduated assertion: state the **C**oncern, state why you are **U**ncomfortable, state that there is a **S**afety issue if not resolved [s4]. The Two-Challenge Rule says any team member may stop the line for serious imminent harm; the first challenge is a question, and if not addressed, escalate [s9]. Used here for Unsafe assignment and Provider order disputed by client — the two Rows where the nurse is asserting against another clinician's decision.
- **Cultural negotiation (NCBI Bookshelf "Nursing Fundamentals" Ch. 3).** A reciprocal, collaborative process to find "a mutually acceptable way to deal with competing interests of nursing care, prescribed medical care, and the patient's cultural needs" [s5]. The first action for cultural conflict is bedside negotiation; family members are explicitly excluded from acting as interpreters in the same source [s5].
- **1.2.a unbiased treatment.** The 2026 NCLEX-RN Test Plan added activity statement 1.2.a for unbiased treatment and equal access regardless of culture, ethnicity, sexual orientation, gender identity, and gender expression. Both Cultural conflict and Family override Rows carry this Tag because (a) cultural conflict is the most common surface for the 1.2.a duty, and (b) family-override scenarios disproportionately involve LGBTQ+ clients whose chosen identity or relationships are challenged by family members [s10]. AHRQ PSNet on LGBTQ+ patient safety: 37% of gay/lesbian/queer/bisexual respondents and 59% of transgender respondents experienced discriminatory treatment from a provider in the prior year, framing the unbiased-care duty as an active anti-bias practice rather than a passive non-discrimination posture [s10].
- **Resource refusal mechanics.** "Resource refusal" here means the client refuses an offered intervention, medication, or discharge plan. The nurse cannot impose care on a decisional adult — Patient Rights and Ethics (StatPearls): "any patient who has capacity also has the right to refuse any treatments, regardless of whether other persons deem them to be acts of beneficence" [s6]. Required first action is capacity assessment, then reasonable-person disclosure of risks, then notify provider; if the client wishes to leave, the AMA discharge protocol governs [s8]. Documentation must include the **basis** for the capacity finding, not just the conclusion [s8].
- **Provider order disputed by client.** Distinct from "resource refusal" because here the client agrees to receive care but objects to a specific order (wrong med, wrong dose, contraindicated by allergy, etc.). The Nursing Pharmacology legal/ethical chapter says the nurse should withhold the medication and notify the prescribing provider rather than administer; CMS encourages staff to notify providers about concerns; a "prudent nurse" standard applies [s7]. If the provider does not respond, escalate via the Two-Challenge Rule and chain of command [s9].
- **Family override applies only to decisional clients.** If the client lacks capacity, family / surrogate / guardian decision-making is legitimate, not an override [s6]. The Row is named for the most NCLEX-relevant version: a decisional client whose family is attempting to substitute their preference.
- **Out of scope.** Restraint refusal (covered in `restraint-use-rules.md`), informed-consent edge cases (`consent-edge-cases.md`), mandatory reporting overrides (`mandatory-reporting-categories.md`), and HIPAA family-disclosure edge cases (`hipaa-disclosure-rules.md`).

### Tricky distractors

- **CUS vs SBAR.** SBAR is a handoff/structured-communication tool; CUS is a graduated-assertion tool for stopping unsafe action [s4]. Wrong-answer pattern: choosing SBAR as the nurse's first action against an unsafe assignment.
- **Cultural conflict vs cultural assessment.** Cultural assessment is a routine admission task; cultural conflict triggers negotiation, interpreter use, and possible ethics-committee escalation [s5]. Wrong-answer pattern: collecting more cultural-history data when the immediate trigger is an active care conflict.
- **Family override vs surrogate decision.** Family override = decisional client whose stated wishes are being substituted. Surrogate decision = client lacks capacity, family/guardian acts on documented authority [s6]. Wrong-answer pattern: deferring to family for a decisional client.
- **Resource refusal vs noncompliance.** Refusal is a client right; "noncompliance" is a chart-pejorative term that NCBI sources discourage. The nurse's duty is informed refusal: capacity, disclosure, document [s6] [s3].
- **Disputed provider order: withhold vs administer-and-clarify.** Always withhold first. Administering a questionable medication and "clarifying after" exposes the nurse to liability under the prudent-nurse standard [s7].
- **AMA = abandonment is wrong.** AMA discharge with capacity, documented disclosure, and provider notification is not abandonment. Refusing to render care to a client who has not been formally discharged would be abandonment [s8].

### Values without a direct public citation

| Cell | Value | Why unsourced |
|---|---|---|
| Unsafe assignment × first action × "State the concern using CUS" | CUS | AHRQ TeamSTEPPS [s4] documents CUS as the assertion tool; the specific application "use CUS as the nurse's first verbal action when given an unsafe assignment" is direct derivation from the CUS framing. The mechanical synthesis is documented here per the SKILL's synthesis-by-direct-derivation convention. |
| Unsafe assignment × first action × "Voice the safety issue" | Voice the safety issue | Same — direct derivation from CUS step S ("Safety issue") [s4]. |
| Cultural conflict × first action × "Engage cultural negotiation" | Engage cultural negotiation | Direct restatement of the "cultural negotiation" framing in NCBI Bookshelf Nursing Fundamentals Ch. 3 [s5] applied to the conflict trigger. |
| Provider order disputed by client × first action × "Withhold the disputed action" | Withhold the disputed action | Direct derivation from Nursing Pharmacology Ch. 2: "the nurse should withhold the medication and notify the provider rather than administer" [s7], generalized from medication to any disputed order. |
| Provider order disputed by client × escalation × "Two-Challenge Rule if provider does not respond" | Two-Challenge Rule | AHRQ TeamSTEPPS Two-Challenge Rule [s9] applied to the disputed-order escalation step. |
| Resource refusal × first action × "Explain risks at a reasonable-person level" | Reasonable-person standard | Direct restatement of the StatPearls "Patient Rights and Ethics" reasonable-person disclosure standard [s6]. |
| Family override × first action × "Reaffirm the client's primary commitment" | Reaffirm the client's primary commitment | Direct application of ANA Code Provision 2 ("the nurse's primary commitment is to the patient") [s1] to the family-override trigger. |
| Cultural conflict × escalation × "Chaplain or cultural liaison" | Chaplain or cultural liaison | NCBI Bookshelf Ch. 3 [s5] names cultural-care resources; the specific escalation role naming reflects standard hospital staffing referenced across the source set rather than a single quoted protocol. |

## Engine demo opportunities

- `Unsafe assignment | nurse's first action → ?` → State the concern using CUS, Voice the safety issue
- `Cultural conflict | nurse's first action → ?` → Engage cultural negotiation, Request a qualified medical interpreter
- `Family override of client wishes | nurse's first action → ?` → Reaffirm the client's primary commitment, Support the decisional client's own informed choice
- `Provider order disputed by client | nurse's first action → ?` → Withhold the disputed action, Notify the prescribing provider
- `Resource refusal | nurse's first action → ?` → Assess decisional capacity, Explain risks at a reasonable-person level
- `? | escalation path → Charge nurse` → Unsafe assignment, Cultural conflict, Family override of client wishes, Provider order disputed by client, Resource refusal (cross-Row select-all; charge nurse is the universal first-rung supervisor)
- `? | escalation path → Ethics committee` → Cultural conflict, Family override of client wishes
- `Unsafe assignment | documentation requirement → ?` → Date and time of objection, Person notified, Follow-up actions taken
- Composite Row swap: Family override Row with the first-action cell swapped to "Defer to the family's preference" — tests Provision-2 primary-commitment principle.

## Sources

- `[s1]`: NCBI Bookshelf, StatPearls — "Nursing Ethical Considerations," ANA Code of Ethics for Nurses Provisions 1–4 section (retrieved 2026-04-26, https://www.ncbi.nlm.nih.gov/books/NBK526054/)
- `[s2]`: NCBI Bookshelf, "Nursing Fundamentals" Chapter 1 — Scope of Practice, Chain of Command and Provider Communication sections (retrieved 2026-04-26, https://www.ncbi.nlm.nih.gov/books/NBK591808/)
- `[s3]`: NCBI Bookshelf, "Nursing Management and Professional Concepts" Ch. 6 — Ethical Practice, Refusal of Care and Documentation sections (retrieved 2026-04-26, https://www.ncbi.nlm.nih.gov/books/NBK598377/)
- `[s4]`: AHRQ TeamSTEPPS Curriculum, Mutual Support Module — "Tool: CUS" (Concerned, Uncomfortable, Safety issue) (retrieved 2026-04-26, https://www.ahrq.gov/teamstepps-program/curriculum/mutual/tools/cus.html)
- `[s5]`: NCBI Bookshelf, "Nursing Fundamentals" Chapter 3 — Diverse Patients, Cultural Negotiation and Interpreter Use sections (retrieved 2026-04-26, https://www.ncbi.nlm.nih.gov/books/NBK591830/)
- `[s6]`: NCBI Bookshelf, StatPearls — "Patient Rights and Ethics," Right to Refuse Treatment and Capacity sections (retrieved 2026-04-26, https://www.ncbi.nlm.nih.gov/books/NBK538279/)
- `[s7]`: NCBI Bookshelf, "Nursing Pharmacology" Chapter 2 — Legal/Ethical, Disputed Orders and Prudent Nurse Standard sections (retrieved 2026-04-26, https://www.ncbi.nlm.nih.gov/books/NBK597872/)
- `[s8]`: PMC — "A step-by-step approach to patients leaving against medical advice (AMA) in the emergency department," Documentation and Capacity sections (retrieved 2026-04-26, https://pmc.ncbi.nlm.nih.gov/articles/PMC9628312/)
- `[s9]`: AHRQ TeamSTEPPS Curriculum, Mutual Support Module — "Tool: Two-Challenge Rule" and "Tool: Advocacy and Assertion" (retrieved 2026-04-26, https://www.ahrq.gov/teamstepps-program/curriculum/mutual/tools/rule.html and https://www.ahrq.gov/teamstepps-program/curriculum/mutual/tools/advocacy.html)
- `[s10]`: AHRQ PSNet Perspective — "Patient Safety Concerns and the LGBTQ+ Population," statistics on discriminatory treatment and inclusive-practice recommendations (retrieved 2026-04-26, https://psnet.ahrq.gov/perspective/patient-safety-concerns-and-lgbtq-population)
- `[s11]`: NCSBN NCLEX-RN Test Plan, effective April 1, 2026 through March 31, 2029, §1.2 Advocacy and §1.2.a unbiased treatment / equal access regardless of culture, ethnicity, sexual orientation, gender identity, and gender expression (retrieved 2026-04-26, https://www.ncsbn.org/publications/2026-nclex-rn-test-plan)
