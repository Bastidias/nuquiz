# Government Classification Levels

**Domain:** 2 — Asset Security &nbsp;|&nbsp; **Pattern:** Dimensions &nbsp;|&nbsp; **Tags:** 2.1, 5.4
**Status:** draft (SME review pending)

The five U.S. government classification levels CISSP candidates are expected to discriminate. Three are formal classification levels per Executive Order 13526 [s1] (Confidential, Secret, Top Secret); CUI is a separate handling category covering sensitive-but-unclassified information; Unclassified is the absence of classification. Cross-tagged with D5.4 because government classification levels are the canonical example of MAC labels — sibling Concept `mac-label-types` covers the same labels at the access-control angle.

| Level | definition | example data | clearance required | handling | marking |
|---|---|---|---|---|---|
| Unclassified | No protection requirements | Public-release information | None | No restrictions | No marking required |
| CUI | Sensitive-but-unclassified information requiring protection [s2] | Personally Identifiable Information<br>Controlled Technical Information | None for access<br>Authorized purpose required | Encrypted in transit<br>Access logging | "CUI" marking |
| Confidential | Disclosure could damage national security [s1] | Internal diplomatic communications | Confidential clearance | Locked storage<br>Authorized couriers | "CONFIDENTIAL" marking |
| Secret | Disclosure could cause serious damage to national security [s1] | Operational military plans | Secret clearance | GSA-approved containers<br>Two-person integrity | "SECRET" marking |
| Top Secret | Disclosure could cause exceptionally grave damage to national security [s1] | Sensitive intelligence sources and methods | Top Secret clearance | SCIF storage<br>Strict need-to-know | "TOP SECRET" marking |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. **No parentheticals in cells.**
- **Acronym expansions.** `CUI` = Controlled Unclassified Information. `SCIF` = Sensitive Compartmented Information Facility. `GSA` = General Services Administration (which approves storage containers).
- **EO 13526 is the definitional source.** Executive Order 13526 [s1] defines the three classification levels (Confidential, Secret, Top Secret) and their harm thresholds. Unclassified is the absence of classification, not a fourth formal level.
- **CUI is the post-2010 framework.** Executive Order 13556 [s2] established the CUI program to standardize handling of sensitive-but-unclassified information across federal agencies. CUI replaces a patchwork of agency-specific labels (FOUO, SBU, LES, etc.). NIST SP 800-171 specifies CUI protection requirements for non-federal systems handling CUI.
- **Clearance dominance rule.** A subject with Top Secret clearance can read Secret, Confidential, and Unclassified data; the inverse does not apply (Confidential clearance cannot access Secret or Top Secret). This is the classical Bell-LaPadula no-read-up rule from `mac-label-types`.
- **Clearance ≠ access.** Holding a Top Secret clearance does not automatically grant access to every Top Secret document — access also requires *need-to-know* (compartments and categories layered on top of the hierarchical labels). SCI (Sensitive Compartmented Information), SAP (Special Access Programs), and codeword programs are layered on top of the Top Secret level for compartmentalization.
- **CUI handling is more rigorous than Unclassified.** The cell value distinguishes — Unclassified has no restrictions, CUI requires encryption in transit, access logging, and proper marking. Many CISSP students miss that CUI is a meaningfully different handling category, not just a synonym for Unclassified.
- **Sibling Concept `mac-label-types` in D5** covers the four-row Unclassified/Confidential/Secret/Top Secret hierarchy from the access-control angle. This Concept adds CUI as a fifth row and includes the example-data and handling-detail columns for the asset-security framing.
- **Out of scope for this Concept:** Bell-LaPadula and Biba formal models, SCI / SAP compartments, codeword programs, FRD (Formerly Restricted Data) and RD (Restricted Data) under the Atomic Energy Act, NATO classification levels, foreign-government classification mappings, declassification procedures, FOIA process.

### Values without a direct public citation

| Cell | Value | Why unsourced |
|---|---|---|
| Unclassified × all cells | — | Unclassified is the absence of classification; cell values describe practical meaning. EO 13526 [s1] does not define Unclassified as a fourth classification. |
| All rows × example data | Specific examples | Industry-typical examples; EO 13526 [s1] defines the harm thresholds without enumerating specific data types. |
| All rows × handling | Handling details | NIST SP 800-171 [s2] and DOD Manual 5200.01 specify handling per level; cell values summarize. |

## Engine demo opportunities

- `Top Secret | clearance required → ?` → `Top Secret clearance`
- `CUI | marking → ?` → `"CUI" marking`
- `Secret | definition → ?` → `Disclosure could cause serious damage to national security`
- `? | definition → Disclosure could cause exceptionally grave damage to national security` → `Top Secret`
- `? | clearance required → None` → `Unclassified`
- `? | handling → SCIF storage` → `Top Secret` (sub-Fact in multi-Fact cell)
- Sequence (adjacency): `Level more sensitive than (Level | Name → Confidential) | Name → ?` → `Secret`
- Composite Confidential Row with `definition` swapped to `Disclosure could cause exceptionally grave damage to national security` — directly tests the harm-threshold escalation (Confidential is "damage"; Top Secret is "exceptionally grave damage")
- Composite Unclassified Row with `clearance required` swapped to `Top Secret clearance` — tests that Unclassified requires no clearance
- Composite CUI Row with `definition` swapped to `Disclosure could damage national security` — tests CUI vs Confidential distinction (CUI is sensitive-but-unclassified; Confidential is the lowest classification level)

## Sources

- `[s1]`: Executive Order 13526, "Classified National Security Information" (December 2009, retrieved 2026-04-26, https://www.archives.gov/isoo/policy-documents/cnsi-eo.html)
- `[s2]`: NIST SP 800-171 Rev 2, "Protecting Controlled Unclassified Information in Nonfederal Systems and Organizations" — CUI protection requirements (February 2020, retrieved 2026-04-26, https://csrc.nist.gov/publications/detail/sp/800-171/rev-2/final)
- `[s3]`: Executive Order 13556, "Controlled Unclassified Information" — established the CUI program (November 2010, retrieved 2026-04-26, https://www.archives.gov/cui/about/executive-order-13556)
- `[s4]`: DOD Manual 5200.01 Volume 1, "DOD Information Security Program" — DOD implementation of EO 13526 (retrieved 2026-04-26, https://www.esd.whs.mil/Directives/issuances/dodm/)
