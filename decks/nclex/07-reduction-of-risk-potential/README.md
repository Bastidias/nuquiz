# Topic 7: Reduction of Risk Potential

**Weight:** 9–15% &nbsp;|&nbsp; **Target facts:** ~600 &nbsp;|&nbsp; **Status:** Concept list drafted, SME review pending

---

## NCSBN Related Content (verify against current 2026 outline)

| # | Related Content |
|---|---|
| 7.1 | Changes / Abnormalities in Vital Signs |
| 7.2 | Diagnostic Tests |
| 7.3 | Laboratory Values |
| 7.4 | Potential for Alterations in Body Systems |
| 7.5 | Potential for Complications of Diagnostic Tests / Treatments / Procedures |
| 7.6 | Potential for Complications from Surgical Procedures and Health Alterations |
| 7.7 | System-Specific Assessments |
| 7.8 | Therapeutic Procedures |

Integrated Process Tags: see `tags.md`. This Topic uses primarily `IP-CJ`, `IP-NP`, `IP-CD`.

---

## Proposed Concepts

Starter set (~26 Concepts).

### 7.1 Changes / Abnormalities in Vital Signs
| Concept | Pattern | Rows | Columns | Tags | Est. facts |
|---|---|---|---|---|---|
| Vital sign normal ranges by life stage | Dimensions | Newborn, Infant, Toddler, Preschool, School-age, Adolescent, Adult, Older adult | HR, RR, BP, Temp | 7.1, 3.7 | ~32 |
| Abnormal vital sign patterns | Dimensions | Tachycardia, Bradycardia, Tachypnea, Bradypnea, Hypertension (urgency), Hypertensive emergency, Hypotension, Hypothermia, Fever | clinical significance, common cause, first nurse action, escalation | 7.1, IP-CJ | ~36 |
| Pulse oximetry interpretation | Aspects | Pulse oximetry | normal range, factors causing false reading, when to escalate, oxygen-titration rule, target saturation by population | 7.1, IP-CJ | ~10 |
| Orthostatic vital sign assessment | Ordered | Supine measurement, Sit measurement, Stand measurement | Wait time, Recording, Positive criteria, Action if positive | 7.1, 5.3 | ~12 |

### 7.2 Diagnostic Tests
| Concept | Pattern | Rows | Columns | Tags | Est. facts |
|---|---|---|---|---|---|
| Diagnostic imaging modalities | Dimensions | X-ray, CT (with contrast), CT (without), MRI, Ultrasound, Nuclear scan, PET, Fluoroscopy | indication, contrast required?, contraindication, prep, post-care | 7.2 | ~40 |
| Contrast media safety | Aspects | Contrast media | screening (allergy/renal), pre-procedure prep, intra-procedure monitoring, post-procedure rule, reaction response | 7.2, 6.1 | ~10 |
| Endoscopic procedures | Dimensions | EGD, Colonoscopy, ERCP, Bronchoscopy, Cystoscopy, Sigmoidoscopy | prep (NPO/bowel), sedation, complication, post-care, return-to-eating criteria | 7.2 | ~30 |
| Cardiac diagnostic tests | Dimensions | 12-lead ECG, Stress test, Echocardiogram, TEE, Cardiac catheterization, Holter monitor | indication, prep, contraindication, complication, key teaching | 7.2 | ~30 |
| Pulmonary diagnostic tests | Dimensions | ABG, PFT, Bronchoscopy, V/Q scan, Sputum culture, Chest x-ray | indication, prep, complication, key value | 7.2 | ~24 |

### 7.3 Laboratory Values
| Concept | Pattern | Rows | Columns | Tags | Est. facts |
|---|---|---|---|---|---|
| Hematology values | Dimensions | Hgb, Hct, RBC, WBC, Platelets, Neutrophils (ANC), Reticulocytes | normal range, critical low, critical high, common cause of derangement | 7.3, IP-CJ | ~28 |
| Coagulation values | Dimensions | PT, INR, aPTT, Anti-Xa, Bleeding time, D-dimer, Fibrinogen | normal range, drug monitored, therapeutic target, action if out of range | 7.3, dc-anticoag | ~28 |
| Basic metabolic panel | Dimensions | Na, K, Cl, CO2, BUN, Creatinine, Glucose, Calcium | normal range, critical low, critical high, common cause | 7.3 | ~32 |
| Liver/pancreatic enzymes | Dimensions | AST, ALT, Alk phos, Bilirubin (total), Bilirubin (direct), Albumin, Lipase, Amylase | normal range, what it indicates, common cause of elevation | 7.3 | ~24 |
| Cardiac biomarkers | Dimensions | Troponin I/T, BNP/NT-proBNP, CK-MB, Myoglobin | normal range, time to rise, time to peak, indication | 7.3 | ~16 |
| ABG interpretation | Ordered | pH, PaCO2, HCO3, PaO2, SaO2 | Normal range, Component (resp/met), Acid-base interpretation rule, Compensation rule | 7.3, IP-CJ | ~20 |
| Therapeutic drug levels (cross-Tag) | — | (see Topic 6 `therapeutic-monitoring-labs.md`) | — | 7.3, 6.5 | — |

### 7.4 Potential for Alterations in Body Systems
| Concept | Pattern | Rows | Columns | Tags | Est. facts |
|---|---|---|---|---|---|
| Risk-stratification frameworks | Dimensions | Falls (Morse), Pressure injury (Braden), Sepsis (qSOFA/SIRS), VTE (Caprini/Padua), Suicide (C-SSRS), Aspiration (swallow screen) | scoring elements, threshold, action, frequency | 7.4, 4.5 | ~30 |
| Early warning signs of clinical deterioration | Dimensions | Sepsis, Shock, Respiratory failure, Cardiac arrest, Stroke, MI, Hypoglycemia, Anaphylaxis | first sign, classic triad, time-to-action, escalation | 7.4, IP-CJ | ~32 |

### 7.5 Potential for Complications of Diagnostic Tests / Treatments / Procedures
| Concept | Pattern | Rows | Columns | Tags | Est. facts |
|---|---|---|---|---|---|
| Procedure complication recognition | Dimensions | Post-cath bleeding, Post-paracentesis hypotension, Post-thoracentesis pneumothorax, Post-LP headache, Post-bronchoscopy laryngospasm, Post-EGD perforation | sign, time window, first nurse action, escalation | 7.5, IP-CJ | ~30 |

### 7.6 Potential for Complications from Surgical Procedures and Health Alterations
| Concept | Pattern | Rows | Columns | Tags | Est. facts |
|---|---|---|---|---|---|
| Pre-op preparation checklist | Aspects | Pre-op preparation | consent verification, NPO status, skin/site prep, allergy/med review, pre-op teaching, baseline labs/VS | 7.6, 1.12 | ~10 |
| Anesthesia types | Dimensions | General, Regional (spinal), Regional (epidural), Conscious sedation, Local, MAC | mechanism, monitoring, recovery focus, complication | 7.6 | ~20 |
| Post-op complications by system and time | Dimensions | Atelectasis, Pneumonia, DVT/PE, Hemorrhage, Hypovolemic shock, Wound dehiscence/evisceration, Paralytic ileus, UTI, Urinary retention, Surgical-site infection | onset window, key signs, prevention, first nurse action | 7.6, IP-CJ | ~40 |
| Wound healing stages and complications | Ordered | Hemostasis, Inflammatory, Proliferative, Maturation/Remodeling | Duration, Cellular events, Visible findings, Complication if disrupted | 7.6, 5.3 | ~16 |
| Wound assessment dimensions | Aspects | Wound assessment | size, depth/tunneling, exudate, tissue type, periwound, odor, pain, drainage device | 7.6, 5.3 | ~10 |

### 7.7 System-Specific Assessments
| Concept | Pattern | Rows | Columns | Tags | Est. facts |
|---|---|---|---|---|---|
| Focused assessment by complaint | Dimensions | Chest pain, Shortness of breath, Abdominal pain, Headache, Altered mental status, Falls, Bleeding, Fever | history elements (OLDCARTS), focused physical, key red flags, immediate action | 7.7, IP-NP | ~32 |
| Neuro assessment components | Aspects | Neurologic assessment | LOC (AVPU/GCS), pupils, motor, sensory, cerebellar, cranial nerves, reflexes | 7.7, 8-cross-tag | ~10 |
| Glasgow Coma Scale interpretation | Dimensions | Eye opening, Verbal response, Motor response | scoring scale, score-to-finding mapping, total interpretation | 7.7 | ~12 |

### 7.8 Therapeutic Procedures
| Concept | Pattern | Rows | Columns | Tags | Est. facts |
|---|---|---|---|---|---|
| Specimen collection requirements | Dimensions | Blood culture, Urine (clean catch), Urine (catheterized), Stool (culture), Stool (occult), Sputum, Throat swab, Wound culture | technique, timing, container, transport, common error | 7.8, 2.9 | ~32 |
| Suctioning techniques | Dimensions | Oral, Nasopharyngeal, Endotracheal (open), Endotracheal (closed), Tracheostomy | indication, sterility, max duration, oxygen pre/post, complication | 7.8, 2.9 | ~25 |
| Chest tube management | Aspects | Chest tube | drainage system chambers, normal vs concerning findings, water-seal management, positioning, accidental disconnection | 7.8, IP-CJ | ~10 |
| NG tube placement and verification | Ordered | Position client, Measure tube length, Lubricate and insert, Advance with swallow, Verify placement (X-ray gold std), Secure, Initiate use | Action, Verification check, Complication if skipped | 7.8 | ~21 |

### Cross-Tagged from Topic 1 / Topic 2
| Concept | Pattern | Rows | Columns | Tags | Est. facts |
|---|---|---|---|---|---|
| Medication error prevention | Aspects | Medication error prevention | barcode scanning, independent double-check, look-alike/sound-alike separation, smart-pump library use, root-cause analysis | 7.5, 6.6, 2.1 | ~10 |

(Filed here as primary; T2 sentinel-event Concept and T6 high-risk-administration-safeguards Concept reference this.)

---

## Items that don't yield a clean comparable group

- **7.4 "Potential for alterations in body systems" as a generic frame.** This is the engine's ambient framing for the entire Topic, not a Concept. Captured via risk-stratification + early-warning-signs Concepts. Specific body-system pathology lives in Topic 8.
- **7.7 System-Specific Assessment generally.** A standalone "system assessment" Concept would force a Cartesian product. Captured per-complaint (focused-assessment) + key tools (neuro, GCS).
- **7.3 Therapeutic drug levels.** Already in Topic 6 (`therapeutic-monitoring-labs.md`); referenced here via cross-Tag, not duplicated.

---

## Cross-Topic Concepts flagged for later Topics

- **Wound care details** — staging in Topic 2, prevention in Topic 5, healing/assessment here. Three Concepts of related-but-not-overlapping content.
- **Neuro assessment / GCS (7.7)** — referenced from Topic 8 disease-state Concepts (stroke, increased ICP). Placeholder `8-cross-tag` until Topic 8 specific IDs validated; it should resolve once SME confirms Topic 8 numbering.
- **Risk-stratification frameworks (7.4)** — reuses fall-risk (T2), pressure-injury (T2/T5), suicide (T4) tools. File lives here for the "screening framework" framing; per-tool Concepts elsewhere stay distinct (different Columns).

---

## Topic 7 Totals

- **Concepts:** ~26
- **Estimated facts:** ~660-700 (matches 600 midpoint, within 15% ceiling of ~750)

Lab values and post-op complications drive the high end — both are intrinsically dense and tabular.

---

## SME Review Checklist

- [ ] Sub-objective numbering matches current NCSBN 2026 Related Content
- [ ] Concept list complete — what's missing? (Particularly: pediatric-specific lab norms; OB-specific labs)
- [ ] Concept list trimmable — what's noise?
- [ ] Pattern choices appropriate per Concept
- [ ] Rows and Columns lists correct
- [ ] Lab-value granularity (separate Concepts per panel) — too fine, or right?
- [ ] Cross-Topic dual-Tag scoping correct (especially wound care across T2/T5/T7)
- [ ] Integrated Process Tags applied correctly

---

## Concept Files (to be created)

```
vital-sign-normal-ranges-by-life-stage.md  abnormal-vital-sign-patterns.md
pulse-oximetry-interpretation.md           orthostatic-vital-sign-assessment.md
diagnostic-imaging-modalities.md           contrast-media-safety.md
endoscopic-procedures.md                   cardiac-diagnostic-tests.md
pulmonary-diagnostic-tests.md              hematology-values.md
coagulation-values.md                      basic-metabolic-panel.md
liver-pancreatic-enzymes.md                cardiac-biomarkers.md
abg-interpretation.md                      risk-stratification-frameworks.md
early-warning-signs-of-deterioration.md    procedure-complication-recognition.md
pre-op-preparation-checklist.md            anesthesia-types.md
post-op-complications.md                   wound-healing-stages.md
wound-assessment-dimensions.md             focused-assessment-by-complaint.md
neuro-assessment-components.md             glasgow-coma-scale.md
specimen-collection-requirements.md        suctioning-techniques.md
chest-tube-management.md                   ng-tube-placement.md
medication-error-prevention.md
```
