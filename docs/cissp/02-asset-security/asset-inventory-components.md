# Asset Inventory Components

**Domain:** 2 — Asset Security &nbsp;|&nbsp; **Pattern:** Dimensions &nbsp;|&nbsp; **Tags:** 2.3
**Status:** draft (SME review pending)

The four data structures that together constitute an organization's asset inventory program. Hardware inventory tracks physical devices; software inventory tracks installed software; configuration items track logical asset units governed by configuration management; the CMDB ties them together with relationships and history. The CISSP exam tests both the per-component definition and the matchup with the audit-control role each plays.

| component | purpose | what it tracks | audit role |
|---|---|---|---|
| Hardware inventory | Account for physical assets [s1] | Servers [s1]<br>Endpoints [s1]<br>Network devices [s1] | Evidence for asset-existence audits [s1] |
| Software inventory | Account for installed software [s1] | Operating systems [s1]<br>Applications [s1]<br>Open-source components [s2] | License compliance and vulnerability scope [s1] |
| Configuration items | Logical asset units governed by configuration management [s3] | Hardware-or-software entities under change control [s3] | Baseline drift detection [s3] |
| CMDB | Database storing CIs, relationships, baselines, change history [s3] | All CIs and their relationships [s3] | Source of truth for asset and config audits [s3] |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. No parentheticals in cells.
- **Tag 2.3 retained from stub.** Maps to (ISC)² 2024 outline §2.3 *Provision information and assets securely*. Sibling Concept: `cmdb-components.md` in Domain 7 covers the CMDB row in finer detail.
- **Hardware vs. software vs. CI vs. CMDB.** The CISSP test confusion: these are not parallel categories — they are *layered*. Hardware inventory and software inventory are *sources*; CIs are the *abstraction* that configuration management treats as units; the CMDB is the *database* that holds CIs and their relationships. A single physical server might appear in hardware inventory, run software in the software inventory, and be modeled as one CI in the CMDB.
- **CIS Control 1 and Control 2 require these.** CIS Control 1 (Inventory and Control of Enterprise Assets) requires hardware inventory; CIS Control 2 (Inventory and Control of Software Assets) requires software inventory. Both are foundational because *you cannot defend what you do not know exists*. Most security incidents trace back to assets that were not in the inventory and therefore did not get patched, scanned, or monitored.
- **Software inventory must include open-source dependencies.** A Java application is not just the JAR — it includes every transitive dependency (Log4j was the famous 2021 example). Modern software inventory programs use SBOM (Software Bill of Materials) to capture dependencies, not just installed-application lists. CIS Control 2 sub-safeguards explicitly address this.
- **CMDB drift is the operational reality.** The CMDB *should* match the actual environment. It rarely does. Drift detection (comparing CMDB against scanner output) and reconciliation are ongoing operations. A perfectly accurate CMDB is the goal; an imperfect-but-actively-reconciled CMDB is the achievable state.
- **What the audit role column captures.** Auditors test these inventories against the actual environment. Hardware inventory failure: a physical asset exists in the data center that is not in the inventory. Software inventory failure: a known-vulnerable library version is running but not in the inventory (and therefore not on the patch list). CI/CMDB failures: configuration changed but the CMDB was not updated.
- **Gaps marked `[needs source]`:** none — all Facts trace to NIST or CIS Controls framing.

## Engine demo opportunities

- `? | what it tracks → Operating systems` → Software inventory
- `Hardware inventory | audit role → ?` → `Evidence for asset-existence audits`
- `? | purpose → Account for installed software` → Software inventory
- `CMDB | what it tracks → ?` → `All CIs and their relationships`
- `Configuration items | audit role → ?` with `License compliance and vulnerability scope` (Software) and `Source of truth for asset and config audits` (CMDB) as distractors
- Composite Row profile: Hardware inventory across all Columns with `audit role` swapped to `Baseline drift detection` (Configuration items' value)

## Sources

- `[s1]`: CIS Critical Security Controls v8.1, Control 1 *Inventory and Control of Enterprise Assets* (retrieved 2026-04-26, https://www.cisecurity.org/controls/inventory-and-control-of-enterprise-assets)
- `[s2]`: CIS Critical Security Controls v8.1, Control 2 *Inventory and Control of Software Assets* (retrieved 2026-04-26, https://www.cisecurity.org/controls/inventory-and-control-of-software-assets)
- `[s3]`: NIST SP 800-128 *Guide for Security-Focused Configuration Management of Information Systems*, August 2011 — CI and CMDB framing (retrieved 2026-04-26, https://csrc.nist.gov/pubs/sp/800/128/upd1/final)
- `[s4]`: (ISC)² CISSP Certification Exam Outline, effective 2024-04-15, Domain 2 §2.3 (retrieved 2026-04-26, https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline)
