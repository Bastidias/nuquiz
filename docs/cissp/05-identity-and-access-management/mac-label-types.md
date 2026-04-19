# MAC Classification Labels

**Domain:** 5 — Identity and Access Management &nbsp;|&nbsp; **Pattern:** Dimensions &nbsp;|&nbsp; **Tags:** 5.4
**Status:** draft (SME review pending)

The four US government classification labels used as the canonical example of Mandatory Access Control. Ordered lowest-to-highest sensitivity. CISSP testing focuses on the ordering itself (which label is higher/lower than which), the clearance-matching rule (subject clearance must dominate object classification), and the "harm if disclosed" framing from Executive Order 13526 [s1]. Non-US classification taxonomies (NATO, UK, commercial) are out of scope for this Concept.

| Label | sensitivity level | harm if disclosed | clearance required |
|---|---|---|---|
| Unclassified | Lowest | None | None |
| Confidential | Low | Damage to national security [s1] | Confidential clearance [s1] |
| Secret | Moderate | Serious damage to national security [s1] | Secret clearance [s1] |
| Top Secret | Highest | Exceptionally grave damage to national security [s1] | Top Secret clearance [s1] |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. **No parentheticals in cells.**
- **EO 13526 is the definitional source.** US Executive Order 13526 [s1] defines the three classification levels (Confidential, Secret, Top Secret) and their harm thresholds — "damage," "serious damage," and "exceptionally grave damage" to national security respectively. Unclassified is the absence of classification, not a fourth formal classification.
- **The dominance rule.** In MAC, a subject may *read* an object only if the subject's clearance is at or above the object's classification — formally, the subject's label *dominates* the object's label. This is the no-read-up property of Bell-LaPadula. Subjects with Secret clearance can read Confidential and Unclassified objects but not Top Secret. Subjects with Top Secret clearance can read everything.
- **Clearance ≠ access.** Holding a Top Secret clearance does not automatically grant access to every Top Secret document — access also requires *need-to-know* (the Clark-Wilson / separation-of-duties equivalent in the MAC world), which is expressed via compartments and categories layered on top of the hierarchical labels. This Concept covers only the hierarchical labels; compartments (SCI, SAP, codeword programs) are out of scope.
- **Formerly Restricted Data (FRD) and Restricted Data (RD).** Nuclear-weapons information has its own classification ladder defined under the Atomic Energy Act, orthogonal to EO 13526 labels. Not represented here.
- **Commercial MAC analogs.** Commercial sectors use different label schemes: Public / Internal / Confidential / Restricted is common. Some highly-regulated sectors (defense contractors, financial services) mirror the government ladder. CISSP testing usually uses the government labels because they are unambiguously ordered and externally defined.
- **Ordering as a canonical test.** Questions like "which is more sensitive, Secret or Confidential?" (answer: Secret) test raw ordering. Questions like "a user with Confidential clearance attempts to open a Secret document — what happens?" (answer: denied, no-read-up violation) test the dominance rule.
- **Out of scope for this Concept:** Bell-LaPadula and Biba formal models (separate Concept), compartments and categories, need-to-know enforcement mechanisms, commercial classification taxonomies, declassification procedures, the Freedom of Information Act process.

### Values without a direct public citation

| Cell | Value | Why unsourced |
|---|---|---|
| Unclassified × all cells | — | "Unclassified" is the absence of classification; EO 13526 [s1] does not define it as a fourth classification label. Cell values describe the practical meaning. |
| All rows × sensitivity level | `Lowest` / `Low` / `Moderate` / `Highest` | Ordinal labels are a CISSP-pedagogical summary; EO 13526 uses the harm-threshold language (damage / serious damage / exceptionally grave damage) as the definitional distinction. |

## Engine demo opportunities

- `Top Secret | harm if disclosed → ?` → `Exceptionally grave damage to national security`
- `Confidential | clearance required → ?` → `Confidential clearance`
- `? | sensitivity level → Highest` → `Top Secret`
- `? | sensitivity level → Lowest` → `Unclassified`
- `Secret | harm if disclosed → ?` → `Serious damage to national security`
- Sequence (adjacency): `Label more sensitive than (Label | Name → Confidential) | Name → ?` → `Secret`
- Composite Secret Row with `harm if disclosed` swapped to `Exceptionally grave damage to national security` — tests the Secret-vs-TopSecret boundary (the defining distinction is "serious" vs "exceptionally grave" harm)
- Composite Confidential Row with `clearance required` swapped to `Top Secret clearance` — tests the clearance-matching rule direction (higher clearance can access lower classification, not the other way)

## Sources

- `[s1]`: Executive Order 13526, "Classified National Security Information" (December 2009, retrieved 2026-04-19, https://www.archives.gov/isoo/policy-documents/cnsi-eo.html)
- `[s2]`: DOD Manual 5200.01 Vol. 1, "DOD Information Security Program: Overview, Classification, and Declassification" — Department of Defense implementation of EO 13526 (retrieved 2026-04-19, https://www.esd.whs.mil/Directives/issuances/dodm/)
