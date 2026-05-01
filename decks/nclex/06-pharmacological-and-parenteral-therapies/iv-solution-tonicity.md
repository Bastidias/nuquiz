# IV Solution Tonicity

**Topic:** 6 — Pharmacological and Parenteral Therapies &nbsp;|&nbsp; **Pattern:** Dimensions &nbsp;|&nbsp; **Tags:** 6.7, IP-CJ
**Status:** draft (SME review pending)

The seven IV fluids most often compared on NCLEX. Rows are solutions; columns are shared attributes drawn from the FDA DailyMed prescribing information for each product. The `tonicity` attribute is split into two columns — `tonicity (in bag)` and `tonicity (in body)` — because dextrose-containing fluids change tonicity after the dextrose is metabolized; collapsing the two would either hide that distinction or smuggle two Facts into one cell. The split also exposes shared in-bag isotonicity across 0.9% NS, LR, and D5W that would otherwise be invisible to the engine.

| Solution | tonicity (in bag) | tonicity (in body) | fluid shift direction | indication | contraindication | monitoring |
|---|---|---|---|---|---|---|
| 0.9% NS | Isotonic [s2] | Isotonic [s2] | Stays in vasculature [s2] | Extracellular fluid replacement [s2]<br>Hydration [s2]<br>Sodium depletion [s2] | Hypernatremia [s2]<br>Fluid overload [s2]<br>Heart failure [s2] | Sodium level [s2]<br>Lung sounds [s2]<br>Edema [s2] |
| LR | Isotonic [s3] | Isotonic [s3] | Stays in vasculature [s3] | Fluid replacement [s3]<br>Electrolyte replacement [s3]<br>Metabolic acidosis [s3] | Hyperkalemia [s3]<br>Severe liver disease [s3]<br>Concurrent ceftriaxone in neonate [s3] | Potassium level [s3]<br>Lactate metabolism [s3]<br>Calcium-incompatible co-infusions [s3] |
| D5W | Isotonic [s4] | Hypotonic [s5] | Shifts ECF → ICF [s5] | Free water replacement [s4]<br>Calorie source [s4]<br>Drug diluent [s4] | Hyperglycemia [s4]<br>Corn hypersensitivity [s4]<br>Increased intracranial pressure [needs source] | Blood glucose [s4]<br>Neuro status [needs source]<br>Serum sodium [s4] |
| 0.45% NS | Hypotonic [s6] | Hypotonic [s6] | Shifts ECF → ICF [s6] | Cellular hydration [s6]<br>Hypernatremia [s6]<br>Drug vehicle [s6] | Hypovolemia [s6]<br>Severe burns [needs source] | Blood pressure [s6]<br>Serum sodium [s6]<br>Mental status [needs source] |
| 3% NS | Hypertonic [s7] | Hypertonic [s7] | Shifts ICF → ECF [s7] | Severe symptomatic hyponatremia [s7]<br>Severe salt depletion [s7]<br>Drastic ECF dilution [s7] | Normal plasma electrolytes [s7]<br>Elevated plasma electrolytes [s7]<br>Heart failure [s7] | Frequent serum sodium [s7]<br>Neuro checks [s7]<br>Central line patency [s7] |
| D5NS | Hypertonic [s8] | Hypotonic [s8] | Shifts ICF → ECF in bag<br>Shifts ECF → ICF after metabolism [s8] | Fluid replenishment [s8]<br>Sodium chloride replenishment [s8]<br>Minimal carbohydrate calories [s8] | Hyperglycemia [s8]<br>Hypokalemia risk [s8]<br>Fluid overload [s8] | Blood glucose [s8]<br>Potassium level [s8]<br>Infusion site for irritation [s8] |
| D10W | Hypertonic [s9] | Hypotonic [needs source] | Shifts ICF → ECF in bag<br>Shifts ECF → ICF after metabolism [s9] | Caloric source [s9]<br>Hypoglycemia treatment [needs source]<br>Drug diluent [s9] | Clinically significant hyperglycemia [s9]<br>Dextrose hypersensitivity [s9]<br>Peripheral vein for prolonged infusion [s9] | Blood glucose [s9]<br>Central line patency [s9]<br>Infusion site for irritation [s9] |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. No parentheticals in cells. The two `tonicity` column headers carry an `(in bag)` / `(in body)` qualifier — this is column scoping (analogous to the CISSP TCP `min header size` / `max header size` split), not a cell-level parenthetical.
- **Why the tonicity split.** Dextrose-containing solutions are isotonic or hypertonic in the IV bag (the dextrose contributes osmoles), but become hypotonic after the dextrose is metabolized — DailyMed for D5/sodium-chloride says "In the body, glucose containing fluids can become extremely physiologically hypotonic due to rapid glucose metabolization" [s8]. A single `tonicity` column would either hide that distinction or smuggle two Facts into one cell. With the split, the engine can detect that 0.9% NS, LR, and D5W all share `Isotonic` in the bag, and D5W, 0.45% NS, D5NS, and D10W all share `Hypotonic` after metabolism.
- **Osmolarity as published context (not Facts in this Concept).** 0.9% NS = 308 mOsmol/L [s2]; LR = 273 mOsmol/L [s3]; 0.45% NS = 154 mOsmol/L [s6]; 3% NS = 1,027 mOsmol/L [s7]; D5NS = 560 mOsmol/L [s8]. Each label classifies its product as isotonic, hypotonic, or hypertonic; the numeric osmolarity is captured here so reviewers can audit the classification, not as exam-tested Facts.
- **Mechanism context (reference, not Facts).** Tonicity describes the osmotic gradient between IV fluid and plasma. Hypertonic fluid pulls water from the intracellular compartment into the vasculature. Hypotonic fluid lets water move from the vasculature into cells. Isotonic fluid expands the extracellular volume without driving net water shift across cell membranes. This physiology is testable in its own Concept (osmosis fundamentals, Topic 8) but does not belong in cells here.
- **Why D5W shows a different in-bag vs in-body tonicity than D5NS / D10W.** D5W's in-bag osmolarity (~252 mOsmol/L) is close enough to plasma that the label classifies it as effectively isotonic on infusion [s4]; D5NS and D10W are clearly hypertonic in the bag because of additional sodium chloride or higher dextrose concentration. All three become hypotonic in body water once dextrose is metabolized.

### Tricky distractors

- **D5W tonicity.** D5W is widely taught as "isotonic in the bag, hypotonic in the body." Wrong-answer pattern: claiming D5W is hypertonic. Wrong-answer pattern: claiming D5W is purely isotonic and ignoring the post-metabolism shift.
- **LR vs 0.9% NS.** Both are isotonic crystalloids. LR contains potassium (4 mEq/L) and calcium and is contraindicated with hyperkalemia, severe liver disease, and concurrent ceftriaxone in neonates [s3]. Wrong-answer pattern: choosing LR for a hyperkalemic patient because it's "isotonic like NS."
- **3% NS administration route.** Hypertonic saline causes venous damage if peripheral; should run via large vein and is given via central line for ongoing infusion [s7]. Wrong-answer pattern: hanging 3% NS on a peripheral 22 G.
- **0.45% NS and intracranial pressure.** Hypotonic fluids drive water into cells, including brain cells; clinically avoided in head injury. The DailyMed label for 0.45% NS does not name elevated ICP as a contraindication explicitly — it warns about fluid/solute imbalance generally [s6]. Marked `[needs source]` for the head-injury caution; widely-taught pedagogy but not on the FDA label.
- **D5W and head injury.** Same caution — once dextrose is metabolized, D5W behaves as free water and crosses into cells, raising ICP risk. The DailyMed D5W label does not list ICP as a contraindication [s4]; the caution is taught in nursing pedagogy. Marked `[needs source]`.
- **Ceftriaxone + LR.** Contraindicated in neonates ≤28 days due to fatal calcium-ceftriaxone precipitates in lung and kidney; in older patients, sequential infusion with line flush is permitted [s3].

### Values without a direct public citation

| Cell | Value | Why unsourced |
|---|---|---|
| D5W × contraindication | Increased intracranial pressure | Widely-taught nursing pedagogy (D5W behaves as free water after dextrose metabolism, crosses blood-brain barrier, worsens cerebral edema). The DailyMed D5W label does not list elevated ICP as a contraindication; mechanism is inferred from osmolarity physics rather than stated on the FDA label. |
| D5W × monitoring | Neuro status | Same rationale as above — neuro monitoring for D5W in head-injury patients is standard nursing teaching but not specified in the DailyMed label. |
| 0.45% NS × contraindication | Severe burns | Hypotonic fluids are taught as inappropriate for burn resuscitation (where LR is preferred per Parkland formula). Not stated as a contraindication on the 0.45% NS DailyMed label. |
| 0.45% NS × monitoring | Mental status | Hypotonic fluid + cellular swelling = cerebral edema risk; monitoring is standard nursing teaching. The DailyMed label warns about fluid/solute imbalance generally [s6] but does not specify mental-status monitoring. |
| D10W × tonicity (in body) | Hypotonic | The 10% Dextrose DailyMed label classifies the product as hypertonic in the bag and warns about hyperglycemia and venous irritation [s9]; it does not explicitly state the post-metabolism tonicity. The hypotonic-in-body classification is inferred from the same metabolic mechanism documented for D5NS [s8]. SME should confirm. |
| D10W × indication | Hypoglycemia treatment | Standard emergency-department and ICU use, but the 10% Dextrose DailyMed label scope is "source of water and calories" and "diluent" [s9]. Acute hypoglycemia rescue is covered under D50W (50% Dextrose) labels, not D10W. |

## Engine demo opportunities

- `0.9% NS | tonicity (in bag) → ?` → Isotonic
- `D5W | tonicity (in body) → ?` → Hypotonic
- `? | tonicity (in bag) → Isotonic` → 0.9% NS, LR, D5W (cross-Row select-all, shared-Value detection)
- `? | tonicity (in body) → Hypotonic` → D5W, 0.45% NS, D5NS, D10W (cross-Row select-all)
- `? | fluid shift direction → Stays in vasculature` → 0.9% NS, LR
- `LR | contraindication → ?` → Hyperkalemia, Severe liver disease, Concurrent ceftriaxone in neonate (multi-Fact cell)
- `3% NS | monitoring → ?` → Frequent serum sodium, Neuro checks, Central line patency
- Composite Row profile: D5W across all Columns, with the `tonicity (in body)` cell swapped to `Isotonic` (a 0.9% NS Value) — tests the in-bag vs in-body distinction.

## Sources

- `[s1]`: NCSBN NCLEX-RN Test Plan, effective April 1, 2026 through March 31, 2029, §6.7 Parenteral / Intravenous Therapies (retrieved 2026-04-26, https://www.ncsbn.org/publications/2026-nclex-rn-test-plan)
- `[s2]`: FDA DailyMed, 0.9% Sodium Chloride Injection USP, current label revision (retrieved 2026-04-26, https://dailymed.nlm.nih.gov/dailymed/fda/fdaDrugXsl.cfm?setid=cc14fafd-3dcd-4fc8-bdbd-6f355c375768)
- `[s3]`: FDA DailyMed, Lactated Ringer's Injection USP, current label revision, Indications/Contraindications/Warnings sections (retrieved 2026-04-26, https://dailymed.nlm.nih.gov/dailymed/fda/fdaDrugXsl.cfm?setid=d3d29c8f-c326-4097-814a-7f4e08c67068)
- `[s4]`: FDA DailyMed, 5% Dextrose Injection USP, current label revision, Indications/Contraindications/Warnings sections (retrieved 2026-04-26, https://dailymed.nlm.nih.gov/dailymed/fda/fdaDrugXsl.cfm?setid=60b6d7c3-0164-46c9-aa38-b5aa1c31a5d5)
- `[s5]`: FDA DailyMed, Dextrose Injection (5% and 10%) prescribing information, Warnings — physiologic hypotonicity after glucose metabolism (retrieved 2026-04-26, https://dailymed.nlm.nih.gov/dailymed/fda/fdaDrugXsl.cfm?setid=8b25b7e0-703e-4b43-a4eb-52863511602d)
- `[s6]`: FDA DailyMed, 0.45% Sodium Chloride Injection USP, current label revision, Description/Warnings/Precautions (retrieved 2026-04-26, https://dailymed.nlm.nih.gov/dailymed/fda/fdaDrugXsl.cfm?setid=8df7dcf6-8714-6caf-e053-2995a90ab8cc)
- `[s7]`: FDA DailyMed, 3% and 5% Sodium Chloride Injections USP (Hypertonic), Indications/Contraindications/Warnings (retrieved 2026-04-26, https://dailymed.nlm.nih.gov/dailymed/fda/fdaDrugXsl.cfm?setid=f2475fa3-ab1d-4b81-8127-b58cd0790a54)
- `[s8]`: FDA DailyMed, Dextrose and Sodium Chloride Injections USP (5% Dextrose and 0.9% Sodium Chloride), Description/Warnings — hypertonic in bag, physiologic hypotonicity after metabolism (retrieved 2026-04-26, https://dailymed.nlm.nih.gov/dailymed/fda/fdaDrugXsl.cfm?setid=8e6569ce-9714-497f-a94b-c6975c1d76f6)
- `[s9]`: FDA DailyMed, 10% Dextrose Injection USP prescribing information, Indications/Contraindications/Warnings (retrieved 2026-04-26, https://dailymed.nlm.nih.gov/dailymed/fda/fdaDrugXsl.cfm?setid=3b8f2692-4371-4f1a-95af-b41842131fdd)
- `[s10]`: CDC Guidelines for the Prevention of Intravascular Catheter-Related Infections, 2011, Infusion Therapy / Catheter-Site Care recommendations (retrieved 2026-04-26, https://www.cdc.gov/infection-control/hcp/intravascular-catheter-related-infection/index.html). Used for general infusion-monitoring framing in Notes; not cited per cell because the CDC document does not assign monitoring practices per IV-solution type.
