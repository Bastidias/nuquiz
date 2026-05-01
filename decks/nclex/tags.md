# NCLEX Tag Registry

> Single source of truth for every Tag used across `decks/nclex/`. Concepts carry a comma-separated Tag list; Tags are flat strings (no engine namespace semantics — the prefix is authoring convention only).

---

## Integrated Process Tags (`IP-*`)

NCSBN's six 2026 Integrated Processes. Apply across all Topics. Carried per Concept.

| Tag | Integrated Process |
|---|---|
| `IP-CJ` | Clinical Judgment |
| `IP-NP` | Nursing Process |
| `IP-CG` | Caring |
| `IP-CD` | Communication and Documentation |
| `IP-CS` | Culture and Spirituality |
| `IP-TL` | Teaching/Learning |

---

## Drug-class Tags (`dc-*`)

Cross-cutting drug-class identifiers used inside Topic 6 (Pharmacological and Parenteral Therapies). A `dc-*` Tag may be carried by a class-overview Concept (e.g., `anticoagulants.md`) AND by Concepts that include drugs of that class as Rows (e.g., `therapeutic-monitoring-labs.md` carries `dc-anticoag` because warfarin and heparin are Rows in it).

| Tag | Class | Class-overview Concept |
|---|---|---|
| `dc-anticoag` | Anticoagulants | `anticoagulants.md` |
| `dc-insulin` | Insulin | `insulin-types.md` |
| `dc-cardiac` | Cardiac glycosides / antiarrhythmics | `cardiac-glycosides-antiarrhythmics.md` |
| `dc-htn` | Antihypertensives | `antihypertensives-by-class.md` |
| `dc-abx` | Antibiotics | `antibiotics-by-class.md` |
| `dc-antidiabetic` | Antidiabetics (oral / non-insulin) | `antidiabetics-non-insulin.md` |
| `dc-psych` | Psychotropics | `psychotropics-overview.md` |
| `dc-resp` | Bronchodilators / inhaled steroids | `bronchodilators-inhaled-steroids.md` |
| `dc-opioid` | Opioids | (no overview Concept; carried by opioid-touching Concepts only) |

---

## Sub-objective ID format

Each NCSBN Related Content statement under a Topic gets an ID of the form `<topic-number>.<n>` (e.g., `1.7`, `6.1`). Numbering is per-Topic and lives in the Topic README. CISSP convention is identical.

---

## Body-system Tags (`sys-*`)

Cross-cutting body-system identifiers introduced in Topic 8 (Physiological Adaptation). A `sys-*` Tag may be carried by a body-system disease Concept AND by Concepts in other Topics that touch that system (e.g., `oxygen-delivery-devices.md` carries `sys-resp`).

| Tag | Body system | Example Concepts |
|---|---|---|
| `sys-cv` | Cardiovascular | `acute-coronary-syndromes`, `shock-states`, `common-cardiac-arrhythmias` |
| `sys-resp` | Respiratory | `common-respiratory-disorders`, `oxygen-delivery-devices` |
| `sys-neuro` | Neurologic | `stroke-types`, `increased-icp`, `seizure-types-and-care`, `spinal-cord-injury-syndromes` |
| `sys-endo` | Endocrine | `diabetes-mellitus-types`, `dka-vs-hhs`, `thyroid-disorders`, `siadh-vs-di` |
| `sys-gi` | Gastrointestinal / hepatic | `common-gi-disorders`, `liver-failure-cirrhosis`, `hepatitis-types` |
| `sys-renal` | Renal / GU | `aki-vs-ckd`, `dialysis-modalities` |
| `sys-heme` | Hematologic / oncologic | `anemia-types`, `oncologic-emergencies`, `neutropenic-precautions` |
| `sys-integ` | Integumentary | `burn-classification`, (future: wound Concepts) |

---

## Geriatric-presentation Tag (`3-cross-aging`)

Single-purpose cross-cutting Tag for geriatric atypical-presentation pattern, introduced in Topic 3. Carried by `atypical-illness-presentations-older-adults` (T3) and any Concept whose Rows materially differ in older-adult presentation (e.g., T7 `early-warning-signs-of-deterioration` may carry it once authored).

| Tag | Use |
|---|---|
| `3-cross-aging` | Mark Concepts where geriatric presentation diverges from younger-adult presentation |

---

## State-variance Tag (`state-variance`)

Cross-cutting Tag for Concepts where the federal floor is thin and the operative legal duty / pedagogical content is state-defined (state Nurse Practice Acts, state mandatory-reporting laws, state minor-consent frameworks, state restraint codes, state BON discipline thresholds, state-specific tort frameworks). Tag the Concept; cells lacking a federal/NCSBN primary citation may also be enumerated in the Concept's `Values without a direct public citation` table with `state-variance` listed as the reason.

| Tag | Use |
|---|---|
| `state-variance` | Mark Concepts where federal/NCSBN content is thin and US state law or state board determines the operative rule. NCLEX still tests these via predominant US convention. |

Currently used by: `mandatory-reporting-categories` (T1), `consent-edge-cases` (T1). Likely future users: `tort-categories-in-nursing` (T1), `scope-of-practice-by-role` (T1, retroactively if SME confirms).

---

## Cross-Topic placeholder convention

When a Concept references a Topic whose README has not yet been authored, use a placeholder Tag of the form `<topic-#>-cross-tag` (e.g., `4-cross-tag`). Tighten to a real sub-objective ID once that Topic's README is populated.

Currently outstanding placeholders:

| Placeholder | Used in (proposed) | Resolves to (when known) |
|---|---|---|
| `3-cross-tag` | T2 `home-safety-by-population` | T3 sub-objective covering developmental anticipatory guidance |
| `5-cross-tag` | T2 `pressure-injury-staging` | T5 sub-objective covering skin integrity / pressure injury prevention |
| `6-cross-tag` | T2 `chemotherapy-handling` | T6 sub-objective covering high-alert medication handling |
| `7-cross-tag` | T2 `never-events-clinical` | T7 sub-objective covering sentinel-event prevention |

These placeholders are valid Tags per the convention above; agents may use them in T2 Concept files. Resolve in a final sweep once all 8 Topic READMEs and Concept stubs are authored.

Resolved placeholders (historical record):

| Former placeholder | Resolved to | Used in |
|---|---|---|
| `4-cross-tag` (T6 `psychotropics-overview`) | `4.2` (Behavioral Interventions) | T6 `psychotropics-overview` cross-Tag |

---

## How to add a new Tag

1. Add a row to the relevant section above with a one-line definition.
2. If introducing a new prefix family (beyond `IP-`, `dc-`, `<topic-#>.`, `<topic-#>-cross-tag`), surface the decision before adopting — new prefix families should be deliberate, not accidental.
3. Tag prefixes are authoring discipline. The engine treats every Tag as a flat string; namespaces are not modeled by the runtime.
