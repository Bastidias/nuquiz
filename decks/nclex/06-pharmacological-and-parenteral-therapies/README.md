# Topic 6: Pharmacological and Parenteral Therapies

**Weight:** 13–19% &nbsp;|&nbsp; **Target facts:** ~800 &nbsp;|&nbsp; **Status:** Concept list drafted, SME review pending

---

## NCSBN Related Content (verify against current 2026 outline)

Numbering below assigns each NCSBN Related Content statement a Tag ID (`6.1`, `6.2`, …). Wording is the NCSBN-published Related Content label.

| # | Related Content |
|---|---|
| 6.1 | Adverse Effects, Contraindications, Side Effects, and Interactions |
| 6.2 | Blood and Blood Products |
| 6.3 | Central Venous Access Devices |
| 6.4 | Dosage Calculation |
| 6.5 | Expected Actions / Outcomes |
| 6.6 | Medication Administration |
| 6.7 | Parenteral / Intravenous Therapies |
| 6.8 | Pharmacological Pain Management |
| 6.9 | Total Parenteral Nutrition |

Integrated Process Tags used in this Topic (carried per Concept):
- `IP-CJ` Clinical Judgment
- `IP-NP` Nursing Process
- `IP-CG` Caring
- `IP-CD` Communication and Documentation
- `IP-CS` Culture and Spirituality
- `IP-TL` Teaching/Learning

This Topic carries an additional drug-class tag scheme so cross-Concept queries (e.g., "all anticoagulant Concepts") work. Drug-class tags are flagged inline in the per-Concept Tags column where relevant (e.g., `dc-anticoag`, `dc-bb`, `dc-loop-diuretic`).

---

## Proposed Concepts

Starter set (~38 Concepts). Each will become a file in this folder. Tags column lists Related Content IDs first, Integrated Process IDs second, drug-class IDs third.

### 6.1 Adverse Effects, Contraindications, Side Effects, and Interactions
| Concept | Pattern | Rows | Columns | Tags | Est. facts |
|---|---|---|---|---|---|
| Adverse vs side vs allergic vs idiosyncratic effect | Dimensions | Adverse effect, Side effect, Allergic reaction, Idiosyncratic reaction, Toxic effect | definition, predictability, dose-related?, nurse's first action, example | 6.1, IP-CJ | ~25 |
| High-alert medication classes | Dimensions | Insulin, Anticoagulants, Opioids, Concentrated electrolytes (KCl), Chemotherapy, Neuromuscular blockers | typical adverse event, double-check requirement, antidote/reversal, monitoring | 6.1, 6.6 | ~30 |
| Major drug-drug interaction pairs | Dimensions | Warfarin + NSAID, Warfarin + antibiotic, MAOI + tyramine/SSRI, ACE inhibitor + K-sparing diuretic, Digoxin + loop diuretic, Lithium + thiazide, Statin + grapefruit | mechanism, clinical effect, nursing action | 6.1 | ~28 |
| Black-box warning recognition | Aspects | Black-box warning | what triggers one, what nurse must do, common examples, documentation, client teaching | 6.1, IP-TL | ~10 |

### 6.2 Blood and Blood Products
| Concept | Pattern | Rows | Columns | Tags | Est. facts |
|---|---|---|---|---|---|
| Blood product types | Dimensions | Whole blood, PRBCs, FFP, Platelets, Cryoprecipitate, Albumin | indication, volume, infusion time, compatibility check, special handling | 6.2 | ~30 |
| Transfusion administration sequence | Ordered | Verify order, Type and crossmatch, Establish IV (18-20 G), Two-RN identifier check, Baseline vitals, Begin slow (first 15 min), Reassess vitals, Complete within 4 hr, Document | Action, Rationale, Common error | 6.2, 6.6 | ~27 |
| Transfusion reaction types | Dimensions | Acute hemolytic, Febrile non-hemolytic, Allergic (mild), Anaphylactic, TRALI, TACO, Bacterial contamination, Delayed hemolytic | onset, key symptoms, first nurse action, treatment | 6.2, 6.1, IP-CJ | ~32 |

### 6.3 Central Venous Access Devices
| Concept | Pattern | Rows | Columns | Tags | Est. facts |
|---|---|---|---|---|---|
| CVAD types | Dimensions | Non-tunneled CVC, Tunneled (Hickman/Broviac), PICC, Implanted port, Midline | tip location, expected dwell time, insertion setting, typical use, removal authority | 6.3 | ~25 |
| CVAD complications | Dimensions | Pneumothorax, Air embolism, CLABSI, Catheter occlusion, Catheter migration, Extravasation | mechanism, key signs, first nurse action, prevention | 6.3, 6.1, IP-CJ | ~24 |
| CVAD care bundle | Aspects | CVAD maintenance | dressing change frequency, cap/needleless connector change, flush protocol, blood draw rule, line removal procedure | 6.3 | ~10 |

### 6.4 Dosage Calculation
| Concept | Pattern | Rows | Columns | Tags | Est. facts |
|---|---|---|---|---|---|
| Dosage calculation formulas | Dimensions | Desired-over-have, Ratio-proportion, Dimensional analysis, Body-weight (mg/kg), BSA (mg/m²), IV drip-rate (gtt/min), IV mL/hr | formula, when used, example input, typical pitfall | 6.4, IP-CJ | ~28 |
| Pediatric dose safety checks | Aspects | Pediatric dosing | weight verification, max safe dose, formulation appropriateness, double-check requirement, parent teaching | 6.4, 6.6, IP-TL | ~10 |

### 6.5 Expected Actions / Outcomes
| Concept | Pattern | Rows | Columns | Tags | Est. facts |
|---|---|---|---|---|---|
| Therapeutic monitoring labs | Dimensions | Warfarin (INR), Heparin (aPTT), LMWH (anti-Xa), Digoxin level, Lithium level, Vancomycin trough, Phenytoin level, Aminoglycoside trough | therapeutic range, sampling timing, toxic threshold, action if out of range | 6.5, 6.1, dc-anticoag | ~32 |
| Onset / peak / duration patterns | Dimensions | Insulin rapid (lispro), Insulin short (regular), Insulin intermediate (NPH), Insulin long (glargine), Insulin combo | onset, peak, duration, hypoglycemia risk window | 6.5, 6.6, dc-insulin | ~20 |

### 6.6 Medication Administration
| Concept | Pattern | Rows | Columns | Tags | Est. facts |
|---|---|---|---|---|---|
| Rights of medication administration | Ordered | Right client, Right medication, Right dose, Right route, Right time, Right documentation, Right reason, Right response, Right to refuse | Verification step, Common error, Failure mode | 6.6, IP-CD | ~27 |
| Administration routes | Dimensions | PO, SL, Buccal, SC, IM, IV push, IV infusion, IM Z-track, ID, Topical, Transdermal, Inhaled, Rectal, Vaginal, Ophthalmic, Otic, NG/G-tube | onset speed, absorption mechanism, typical volume, contraindication, key technique | 6.6 | ~80 |
| Injection technique by route | Dimensions | SC, IM (deltoid), IM (vastus lateralis), IM (ventrogluteal), ID, Z-track | needle gauge, needle length, angle, site landmarks, max volume | 6.6 | ~30 |
| Medication reconciliation events | Dimensions | Admission, Transfer, Discharge, Provider change, Home med list update | required step, common discrepancy, who reconciles | 6.6, 1.9 | ~15 |
| High-risk administration safeguards | Aspects | High-risk med safeguards | independent double-check, smart-pump library, tall-man lettering, do-not-use abbreviations, look-alike/sound-alike separation | 6.6, 6.1 | ~10 |

### 6.7 Parenteral / Intravenous Therapies
| Concept | Pattern | Rows | Columns | Tags | Est. facts |
|---|---|---|---|---|---|
| IV solution tonicity | Dimensions | 0.9% NS (isotonic), LR (isotonic), D5W (isotonic in bag, hypotonic in body), 0.45% NS (hypotonic), 3% NS (hypertonic), D5NS (hypertonic), D10W (hypertonic) | tonicity, fluid shift direction, indication, contraindication, monitoring | 6.7, IP-CJ | ~35 |
| IV catheter gauges | Dimensions | 14 G, 16 G, 18 G, 20 G, 22 G, 24 G | flow rate, typical use, client population, color code | 6.7 | ~24 |
| IV complications | Dimensions | Infiltration, Extravasation, Phlebitis, Thrombophlebitis, Air embolism, Fluid overload, Speed shock, Catheter-related infection | key signs, first nurse action, prevention, severity | 6.7, 6.1, IP-CJ | ~32 |
| IV push administration steps | Ordered | Verify compatibility, Confirm patency, Pinch above port, Push at recommended rate, Flush after | Action, Rationale, Common error | 6.7, 6.6 | ~15 |

### 6.8 Pharmacological Pain Management
| Concept | Pattern | Rows | Columns | Tags | Est. facts |
|---|---|---|---|---|---|
| Analgesic ladder (WHO) | Ordered | Step 1 Non-opioid ± adjuvant, Step 2 Weak opioid ± non-opioid ± adjuvant, Step 3 Strong opioid ± non-opioid ± adjuvant | Pain intensity range, Example agents, Typical add-on | 6.8 | ~12 |
| Opioid adverse-effect profile | Dimensions | Respiratory depression, Constipation, Sedation, Pruritus, Nausea, Urinary retention, Tolerance, Dependence | onset, monitoring tool, intervention, reversal | 6.8, 6.1, dc-opioid | ~32 |
| Opioid reversal (naloxone) protocol | Ordered | Recognize respiratory depression, Stop opioid, Stimulate, Support airway/ventilation, Administer naloxone, Reassess RR/sedation, Repeat if needed, Monitor for re-sedation | Action, Threshold cue, Documentation | 6.8, IP-CJ | ~24 |
| Non-opioid analgesic comparison | Dimensions | Acetaminophen, NSAIDs, Aspirin, COX-2 inhibitors, Adjuvants (gabapentin, TCAs) | mechanism, max daily dose, key adverse effect, contraindication, monitoring | 6.8, 6.1 | ~25 |
| PCA (patient-controlled analgesia) safety | Aspects | PCA pump | who may push the button, lockout interval purpose, monitoring frequency, family-pushing rule, programming double-check | 6.8, 6.6 | ~10 |

### 6.9 Total Parenteral Nutrition
| Concept | Pattern | Rows | Columns | Tags | Est. facts |
|---|---|---|---|---|---|
| TPN administration rules | Aspects | TPN administration | line requirement, tubing change frequency, glucose monitoring, rate change rule, what to do if bag unavailable | 6.9, 6.3, 6.7 | ~12 |
| TPN complications | Dimensions | Hyperglycemia, Hypoglycemia (abrupt stop), Refeeding syndrome, Infection (CLABSI), Fluid overload, Electrolyte imbalance | mechanism, key labs/signs, first nurse action, prevention | 6.9, 6.1, IP-CJ | ~24 |

### Drug-class Concepts (cross-cutting within Topic 6)

These Concepts compare medications within a class. Each gets a `dc-*` Tag so engine queries like "all anticoagulants" surface them as a group. Tags column shows the class tag; sub-objective Tags depend on focus (typically 6.1 + 6.5 + 6.6).

| Concept | Pattern | Rows | Columns | Tags | Est. facts |
|---|---|---|---|---|---|
| Anticoagulants | Dimensions | Heparin, LMWH (enoxaparin), Warfarin, Direct thrombin inhibitors (dabigatran), Factor Xa inhibitors (rivaroxaban/apixaban) | mechanism, monitoring lab, antidote, key teaching, contraindication | 6.1, 6.5, dc-anticoag | ~30 |
| Insulin types | Dimensions | Lispro/Aspart, Regular, NPH, Glargine, Detemir, 70/30 | onset, peak, duration, route, mixing rule | 6.5, 6.6, dc-insulin | ~30 |
| Cardiac glycosides and antiarrhythmics | Dimensions | Digoxin, Amiodarone, Adenosine, Lidocaine, Procainamide | mechanism, indication, key adverse effect, monitoring, antidote/intervention | 6.1, 6.5, dc-cardiac | ~25 |
| Antihypertensives by class | Dimensions | ACE inhibitors, ARBs, Beta blockers, Calcium channel blockers, Thiazide diuretics, Loop diuretics, K-sparing diuretics, Alpha blockers | mechanism, key adverse effect, monitoring lab, contraindication, common pairing | 6.1, 6.5, dc-htn | ~40 |
| Antibiotics by class | Dimensions | Penicillins, Cephalosporins, Macrolides, Fluoroquinolones, Aminoglycosides, Tetracyclines, Sulfonamides, Vancomycin | mechanism, common use, key adverse effect, monitoring, key interaction | 6.1, 6.5, dc-abx | ~40 |
| Antidiabetics (oral and non-insulin injectables) | Dimensions | Metformin (biguanide), Sulfonylureas, DPP-4 inhibitors, GLP-1 agonists, SGLT-2 inhibitors, Thiazolidinediones | mechanism, hypoglycemia risk, key adverse effect, hold rule, monitoring | 6.1, 6.5, dc-antidiabetic | ~30 |
| Psychotropics overview | Dimensions | SSRIs, SNRIs, TCAs, MAOIs, Atypical antipsychotics, Typical antipsychotics, Lithium, Benzodiazepines | mechanism, key adverse effect, monitoring, key interaction/food rule, withdrawal risk | 6.1, 6.5, dc-psych, 4-cross-tag | ~40 |
| Bronchodilators and inhaled steroids | Dimensions | SABA, LABA, SAMA, LAMA, Inhaled corticosteroid, Leukotriene modifier | mechanism, onset, indication, key adverse effect, technique pitfall | 6.1, 6.5, dc-resp | ~24 |

---

## Items that don't yield a clean comparable group

- **6.5 Expected Actions / Outcomes (broadly).** "Know the expected action of every drug" is the entire pharmacology curriculum — it can't be one Concept. Instead, expected-action information lives inside each drug-class Concept (Mechanism, Indication columns) and is surfaced by Tag. Two cross-cutting Concepts (`therapeutic-monitoring-labs.md`, `onset-peak-duration-patterns.md`) capture the engine-tractable comparable groups within 6.5.
- **6.6 Medication Administration generic principles.** "Follow the rights" is one Concept; "use aseptic technique" overlaps with Topic 2 Safety/Infection. Captured here as `rights-of-medication-administration.md` and `high-risk-administration-safeguards.md` Aspects; aseptic-technique principles dual-Tag Topic 2.
- **6.4 Dosage Calculation worked examples.** Individual calculation examples are practice items, not Concepts. The formula-comparison Concept covers the comparable group; example-bank items are engine inputs, not Concept content.

---

## Cross-Topic Concepts flagged for later Topics

- **Aseptic technique for med admin (6.6/6.7)** — primary home Topic 2 (Safety / Infection Prevention and Control). Dual-Tag from here.
- **Medication safety / error prevention** — overlaps Topic 2 (`02-safety-and-infection-prevention-and-control`) and Topic 7 (`07-reduction-of-risk-potential`). High-risk safeguards Concept files here, dual-Tag both.
- **Pain assessment (non-pharm)** — primary home Topic 5 (Basic Care and Comfort). Pharmacological pain Concepts here reference it.
- **Endocrine pathophysiology behind insulin/antidiabetic choice** — primary home Topic 8 (Physiological Adaptation). Drug-class Concepts here cover the agent; the disease state lives in Topic 8.
- **Pediatric / geriatric considerations** — surface as Tags, not separate Concepts. Pediatric-dose safety Concept files here; broader life-span issues live in Topic 3 (Health Promotion and Maintenance).
- **Restraint via chemical sedation** — primary home Topic 1 (Management of Care, restraint use rules). Psychotropics Concept here references it via `4-cross-tag` placeholder; tighten when Topic 4 README is written.

---

## Topic 6 Totals

- **Concepts:** ~38
- **Estimated facts:** ~960-1,000 (above the 800 midpoint target)

The fact estimate exceeds the target because pharmacology is intrinsically dense — a drug-class Dimensions table with 6-8 Rows × 5 Columns is ~30-40 facts before any pruning, and there are eight drug-class Concepts. Two routes to reconcile: (a) accept the overshoot as pharmacology being heavier per-percentage-point than other Topics; (b) prune by trimming drug-class Rows to the highest-yield 4-5 agents per class instead of 6-8. Lean: (a) pending SME review, since the NCSBN weight range tops at 19% (~950 facts), within the estimate.

---

## SME Review Checklist

- [ ] Sub-objective numbering matches current NCSBN 2026 Related Content list
- [ ] Concept list complete — what's missing? (Especially: any drug class that needs its own Concept rather than rolling into a class-overview row)
- [ ] Concept list trimmable — what's noise?
- [ ] Pattern choices appropriate per Concept (Dimensions / Ordered / Aspects)
- [ ] Rows and Columns lists correct (within each Concept)
- [ ] Drug-class Tag scheme (`dc-*`) acceptable, or should each class be a separate Tag namespace?
- [ ] Fact-count estimates realistic
- [ ] Cross-Topic dual-Tags reasonable, not creating duplicate content downstream
- [ ] Integrated Process Tags applied correctly per Concept

---

## Concept Files (to be created)

One `.md` per Concept once the list is confirmed. Proposed filenames:

```
adverse-vs-side-vs-allergic-effect.md   high-alert-medication-classes.md
major-drug-drug-interactions.md         black-box-warning-recognition.md
blood-product-types.md                  transfusion-administration.md
transfusion-reaction-types.md           cvad-types.md
cvad-complications.md                   cvad-care-bundle.md
dosage-calculation-formulas.md          pediatric-dose-safety.md
therapeutic-monitoring-labs.md          onset-peak-duration-patterns.md
rights-of-medication-administration.md  administration-routes.md
injection-technique-by-route.md         medication-reconciliation-events.md
high-risk-administration-safeguards.md  iv-solution-tonicity.md
iv-catheter-gauges.md                   iv-complications.md
iv-push-administration.md               who-analgesic-ladder.md
opioid-adverse-effects.md               naloxone-reversal-protocol.md
non-opioid-analgesics.md                pca-pump-safety.md
tpn-administration-rules.md             tpn-complications.md
anticoagulants.md                       insulin-types.md
cardiac-glycosides-antiarrhythmics.md   antihypertensives-by-class.md
antibiotics-by-class.md                 antidiabetics-non-insulin.md
psychotropics-overview.md               bronchodilators-inhaled-steroids.md
```
