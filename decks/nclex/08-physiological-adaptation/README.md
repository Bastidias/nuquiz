# Topic 8: Physiological Adaptation

**Weight:** 11–17% &nbsp;|&nbsp; **Target facts:** ~700 &nbsp;|&nbsp; **Status:** Concept list drafted, SME review pending

---

## NCSBN Related Content (verify against current 2026 outline)

| # | Related Content |
|---|---|
| 8.1 | Alterations in Body Systems |
| 8.2 | Fluid and Electrolyte Imbalances |
| 8.3 | Hemodynamics |
| 8.4 | Illness Management |
| 8.5 | Medical Emergencies |
| 8.6 | Pathophysiology |
| 8.7 | Unexpected Response to Therapies |

Integrated Process Tags: see `tags.md`. This Topic uses primarily `IP-CJ`, `IP-NP`, `IP-CD`.

This Topic is organized predominantly by **body system** rather than by NCSBN sub-objective, because NCSBN's items 8.1, 8.4, 8.6 all expand to "everything in pathophysiology" — splitting Concepts across them would force arbitrary divisions. Concepts below carry the NCSBN sub-objective Tag but the file structure follows body system. New cross-cutting Tag prefix introduced: **`sys-*`** (body system tag).

---

## Proposed Concepts

Starter set (~32 Concepts). Tags column shows NCSBN sub-objective IDs first, body-system Tags second, drug-class / Integrated Process Tags last.

### 8.2 Fluid and Electrolyte Imbalances
| Concept | Pattern | Rows | Columns | Tags | Est. facts |
|---|---|---|---|---|---|
| Fluid volume imbalances | Dimensions | Hypovolemia (dehydration), Hypervolemia (overload), Third-spacing | causes, key signs, lab findings, treatment | 8.2, IP-CJ | ~16 |
| Sodium imbalances | Dimensions | Hyponatremia (hypovolemic), Hyponatremia (hypervolemic/SIADH), Hypernatremia | causes, neurologic signs, key labs, treatment, correction-rate rule | 8.2 | ~20 |
| Potassium imbalances | Dimensions | Hypokalemia, Hyperkalemia | causes, ECG signs, neuromuscular signs, treatment, K-administration safety rule | 8.2, IP-CJ | ~20 |
| Calcium imbalances | Dimensions | Hypocalcemia, Hypercalcemia | causes, key signs (Trousseau/Chvostek), treatment | 8.2 | ~16 |
| Magnesium imbalances | Dimensions | Hypomagnesemia, Hypermagnesemia | causes, key signs, treatment | 8.2 | ~12 |
| Phosphate imbalances | Dimensions | Hypophosphatemia, Hyperphosphatemia | causes, key signs, treatment | 8.2 | ~10 |
| Acid-base disorders | Dimensions | Resp acidosis, Resp alkalosis, Met acidosis, Met alkalosis | pH/PaCO2/HCO3 pattern, common cause, classic presentation, compensation, treatment | 8.2, 7.3 | ~25 |

### 8.3 Hemodynamics
| Concept | Pattern | Rows | Columns | Tags | Est. facts |
|---|---|---|---|---|---|
| Shock states | Dimensions | Hypovolemic, Cardiogenic, Distributive (septic), Distributive (anaphylactic), Distributive (neurogenic), Obstructive | mechanism, hemodynamic profile (CO/SVR/preload), key signs, treatment | 8.3, 8.5, IP-CJ, sys-cv | ~30 |
| Stages of shock | Ordered | Initial, Compensatory, Progressive, Refractory | Mechanism, Vital sign pattern, Mental status, Reversibility | 8.3, IP-CJ, sys-cv | ~16 |
| Hemodynamic monitoring parameters | Dimensions | CVP, PAP, PCWP, SVR, CO, MAP | normal range, what it measures, abnormal direction implication | 8.3, sys-cv | ~24 |

### Cardiovascular alterations (8.1, 8.4, 8.6)
| Concept | Pattern | Rows | Columns | Tags | Est. facts |
|---|---|---|---|---|---|
| Acute coronary syndromes | Dimensions | Stable angina, Unstable angina, NSTEMI, STEMI | pathophysiology, ECG, biomarkers, time-to-treatment, key intervention | 8.1, 8.5, sys-cv, IP-CJ | ~20 |
| Heart failure types | Dimensions | Left-sided systolic (HFrEF), Left-sided diastolic (HFpEF), Right-sided, Acute decompensated | pathophysiology, key signs, BNP, treatment focus | 8.1, sys-cv | ~20 |
| Common cardiac arrhythmias | Dimensions | Sinus tach, Sinus brad, AFib, Aflutter, SVT, VT (stable), VT (pulseless), VF, Asystole, PEA, Heart blocks (1st, 2nd type I, 2nd type II, 3rd) | recognition, hemodynamic stability, treatment, drug | 8.1, 8.5, dc-cardiac, sys-cv | ~50 |
| Hypertensive crises | Dimensions | Hypertensive urgency, Hypertensive emergency | BP threshold, end-organ involvement, treatment goal/rate, key drug | 8.1, dc-htn, sys-cv | ~10 |

### Respiratory alterations (8.1, 8.4)
| Concept | Pattern | Rows | Columns | Tags | Est. facts |
|---|---|---|---|---|---|
| Common respiratory disorders | Dimensions | COPD, Asthma, Pneumonia, PE, Pneumothorax, Tension pneumothorax, ARDS, TB | pathophysiology, key signs, classic test/finding, treatment | 8.1, dc-resp, sys-resp, IP-CJ | ~32 |
| Oxygen delivery devices | Dimensions | Nasal cannula, Simple mask, Non-rebreather, Venturi, High-flow nasal cannula, BiPAP, CPAP, ETT/Mechanical ventilation | FiO2 range, flow rate, indication, risk | 8.4, sys-resp | ~32 |

### Neurologic alterations (8.1, 8.5)
| Concept | Pattern | Rows | Columns | Tags | Est. facts |
|---|---|---|---|---|---|
| Stroke types | Dimensions | Ischemic (thrombotic), Ischemic (embolic), TIA, Hemorrhagic (intracerebral), Hemorrhagic (subarachnoid) | pathophysiology, key signs by territory, time-to-treatment, treatment, contraindication | 8.1, 8.5, sys-neuro, IP-CJ | ~25 |
| Increased intracranial pressure | Aspects | Increased ICP | early signs, late signs (Cushing's triad), management bundle, contraindicated maneuvers, monitoring | 8.5, sys-neuro, IP-CJ | ~10 |
| Seizure types and care | Dimensions | Generalized tonic-clonic, Absence, Focal aware, Focal impaired-awareness, Status epilepticus | presentation, duration criteria, during-seizure care, post-seizure care, treatment | 8.1, 8.5, sys-neuro | ~25 |
| Spinal cord injury syndromes | Dimensions | Complete, Anterior cord, Central cord, Brown-Séquard, Cauda equina, Autonomic dysreflexia | pathophysiology, motor/sensory pattern, signature finding, intervention | 8.1, sys-neuro | ~24 |

### Endocrine alterations (8.1, 8.6) — drives Topic 6 references
| Concept | Pattern | Rows | Columns | Tags | Est. facts |
|---|---|---|---|---|---|
| Diabetes mellitus types | Dimensions | Type 1, Type 2, Gestational, MODY | pathophysiology, onset, treatment foundation, complication profile | 8.1, dc-insulin, dc-antidiabetic, sys-endo | ~16 |
| DKA vs HHS | Dimensions | DKA, HHS | pathophysiology, glucose range, ketones, pH, osmolality, presentation, treatment sequence | 8.1, 8.5, dc-insulin, sys-endo, IP-CJ | ~14 |
| Hypoglycemia management | Ordered | Recognize signs, Check glucose, Administer fast-acting carb (15g rule), Recheck in 15 min, Repeat or escalate, Provide complex carb after | Action, Threshold, Failure mode | 8.5, dc-insulin, sys-endo | ~15 |
| Thyroid disorders | Dimensions | Hypothyroidism (myxedema), Hyperthyroidism (Graves), Thyroid storm, Myxedema coma | pathophysiology, key signs, labs, treatment | 8.1, 8.5, sys-endo | ~20 |
| Adrenal disorders | Dimensions | Cushing's syndrome, Addison's disease, Adrenal/Addisonian crisis, Pheochromocytoma | pathophysiology, key signs, labs, treatment | 8.1, sys-endo | ~16 |
| SIADH vs DI | Dimensions | SIADH, Central DI, Nephrogenic DI | pathophysiology, urine output, urine specific gravity, serum Na, treatment | 8.1, 8.2, sys-endo | ~15 |

### GI / Hepatic alterations (8.1, 8.4)
| Concept | Pattern | Rows | Columns | Tags | Est. facts |
|---|---|---|---|---|---|
| Common GI disorders | Dimensions | GERD, PUD, IBD (Crohn's), IBD (UC), IBS, Diverticulitis, Pancreatitis, Cholecystitis, Bowel obstruction (mechanical), Paralytic ileus, Appendicitis | pathophysiology, key signs, classic finding, treatment | 8.1, sys-gi | ~44 |
| Liver failure / cirrhosis | Aspects | Liver failure | causes, lab pattern, complication cluster (varices/ascites/encephalopathy), treatment focus, dietary | 8.1, sys-gi | ~10 |
| Hepatitis types | Dimensions | A, B, C, D, E | transmission, incubation, chronicity risk, vaccine availability, key teaching | 8.1, 3.4, sys-gi | ~25 |

### Renal / GU alterations (8.1, 8.2)
| Concept | Pattern | Rows | Columns | Tags | Est. facts |
|---|---|---|---|---|---|
| Acute kidney injury vs chronic kidney disease | Dimensions | AKI (prerenal), AKI (intrarenal), AKI (postrenal), CKD | pathophysiology, key labs, urine pattern, treatment | 8.1, sys-renal | ~20 |
| Dialysis modalities | Dimensions | Hemodialysis, Peritoneal dialysis (CAPD), Peritoneal dialysis (CCPD), CRRT | mechanism, frequency, vascular/peritoneal access, complication | 8.4, sys-renal | ~20 |

### Hematologic / Oncologic alterations (8.1)
| Concept | Pattern | Rows | Columns | Tags | Est. facts |
|---|---|---|---|---|---|
| Anemia types | Dimensions | Iron-deficiency, B12 deficiency, Folate deficiency, Aplastic, Hemolytic, Sickle cell | pathophysiology, key labs, classic finding, treatment | 8.1, sys-heme | ~24 |
| Oncologic emergencies | Dimensions | Tumor lysis syndrome, Spinal cord compression, SVC syndrome, Hypercalcemia of malignancy, Febrile neutropenia, DIC | pathophysiology, key signs, labs, intervention | 8.5, sys-heme, IP-CJ | ~24 |
| Neutropenic precautions | Aspects | Neutropenic precautions | ANC threshold, environmental rules, dietary rules, visitor rules, monitoring | 8.4, 2.9, sys-heme | ~10 |

### 8.5 Medical Emergencies (cross-system)
| Concept | Pattern | Rows | Columns | Tags | Est. facts |
|---|---|---|---|---|---|
| Anaphylaxis management | Ordered | Recognize, Stop trigger, Position, Epinephrine IM, Airway/oxygen, IV access/fluids, Adjuncts (antihistamine, steroid, bronchodilator), Reassess, Biphasic monitoring | Action, Drug/dose marker, Failure mode | 8.5, 6.1, IP-CJ | ~24 |
| Burn classification and resuscitation | Ordered (depth) + Aspects (Parkland) | Superficial, Superficial partial-thickness, Deep partial-thickness, Full-thickness, Fourth-degree | tissue layers, appearance, healing potential, pain, fluid resuscitation rule (Parkland) | 8.1, 8.5, sys-integ | ~20 |
| ACLS rhythm-driven treatment | Dimensions | VF / pulseless VT, Asystole, PEA, Bradycardia (symptomatic), Tachycardia (stable), Tachycardia (unstable) | first action, drug, electrical therapy, post-action | 8.5, dc-cardiac, sys-cv | ~24 |

### 8.7 Unexpected Response to Therapies
| Concept | Pattern | Rows | Columns | Tags | Est. facts |
|---|---|---|---|---|---|
| Recognition of unexpected therapy response | Dimensions | Anaphylaxis, Hypersensitivity reaction (Type II/III/IV), Infusion reaction, Paradoxical drug response, Serotonin syndrome, Neuroleptic malignant syndrome, Malignant hyperthermia | trigger therapy, key signs, time window, treatment | 8.7, 6.1, IP-CJ | ~28 |

---

## Items that don't yield a clean comparable group

- **8.1 + 8.4 + 8.6 overlap.** NCSBN's three "everything-in-pathophysiology" buckets are modeled as one body-system organization here. SME should confirm this isn't losing exam-relevant differentiation.
- **8.6 Pathophysiology generally.** Pathophysiology is a perspective, not a comparable group. Captured inside each disease-state Concept's Columns.
- **8.4 Illness Management generally.** Same — the management-of-X piece lives in each disease Concept. Standalone Concept would force false comparison.

---

## Cross-Topic Concepts flagged / referenced

- **Drug-class Concepts (T6) reference Topic 8 disease states.** E.g., T6 `antihypertensives-by-class` references this Topic's `hypertensive-crises`. Reciprocal Tags carried.
- **Endocrine pathophys (8) → T6 insulin / antidiabetics.** Confirmed: `diabetes-mellitus-types`, `dka-vs-hhs`, `hypoglycemia-management` here; agent comparison in T6.
- **Therapeutic diets (T5) → disease-specific physiology (T8).** T5 covers the diet, T8 covers the disease justification. Mutual references.
- **Lab values (T7) ↔ disease alterations (T8).** Lab norms in T7; disease-driven derangement patterns surfaced inside T8 Concept Columns.
- **DIC** — appears in T8 oncologic emergencies; if an OB DIC framing is needed, dual-Tag T3 postpartum complications.

---

## Topic 8 Totals

- **Concepts:** ~32
- **Estimated facts:** ~750-820 (matches 700 midpoint, within 17% ceiling of ~850)

Heavy on Dimensions tables for body-system content; this is intrinsic to pathophysiology coverage.

---

## SME Review Checklist

- [ ] Sub-objective numbering matches current NCSBN 2026 Related Content
- [ ] Body-system organization vs NCSBN sub-objective organization — acceptable, or should each Concept be filed under exactly one of 8.1/8.4/8.6?
- [ ] Concept list complete — what's missing? (Particularly: integumentary beyond burns; reproductive beyond OB)
- [ ] Concept list trimmable — what's noise?
- [ ] `sys-*` Tag scheme acceptable (see new Tags added to `tags.md`)
- [ ] Pattern choices appropriate per Concept
- [ ] Rows and Columns lists correct
- [ ] Cross-Topic dual-Tag scoping correct (drug-class Tags in particular)
- [ ] Integrated Process Tags applied correctly

---

## Concept Files (to be created)

```
fluid-volume-imbalances.md              sodium-imbalances.md
potassium-imbalances.md                 calcium-imbalances.md
magnesium-imbalances.md                 phosphate-imbalances.md
acid-base-disorders.md                  shock-states.md
stages-of-shock.md                      hemodynamic-monitoring-parameters.md
acute-coronary-syndromes.md             heart-failure-types.md
common-cardiac-arrhythmias.md           hypertensive-crises.md
common-respiratory-disorders.md         oxygen-delivery-devices.md
stroke-types.md                         increased-icp.md
seizure-types-and-care.md               spinal-cord-injury-syndromes.md
diabetes-mellitus-types.md              dka-vs-hhs.md
hypoglycemia-management.md              thyroid-disorders.md
adrenal-disorders.md                    siadh-vs-di.md
common-gi-disorders.md                  liver-failure-cirrhosis.md
hepatitis-types.md                      aki-vs-ckd.md
dialysis-modalities.md                  anemia-types.md
oncologic-emergencies.md                neutropenic-precautions.md
anaphylaxis-management.md               burn-classification.md
acls-rhythm-driven-treatment.md         unexpected-therapy-response.md
```
