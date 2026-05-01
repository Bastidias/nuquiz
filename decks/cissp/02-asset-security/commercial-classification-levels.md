# Commercial Classification Levels

**Domain:** 2 — Asset Security &nbsp;|&nbsp; **Pattern:** Dimensions &nbsp;|&nbsp; **Tags:** 2.1
**Status:** draft (SME review pending)

The four commercial-sector classification levels CISSP courseware uses, from least restrictive (Public) to most restrictive (Confidential). Each pairs a *definition* with *example data*, *handling requirements*, and required *marking*. The CISSP exam tests both the matchup between data type and classification level and the principle that classification levels are organization-defined — the four labels here are CISSP-canonical but a given organization may use Internal/Restricted/Top-Secret-equivalent labels instead.

| level | definition | example data | handling requirements | marking |
|---|---|---|---|---|
| Public | Authorized for public release [s1] | Marketing materials [s1]<br>Press releases [s1] | No restrictions [s1] | No marking required [s1] |
| Sensitive | Internal use only [s1] | Internal procedures [s1]<br>Org charts [s1] | Restricted to organization members [s1] | "Internal" or organization marking [s1] |
| Private | Personal information protected by law [s1] | Employee records [s1]<br>HR data [s1] | Encryption in transit and at rest [s1] | "Private" marking and access logging [s1] |
| Confidential | Information whose disclosure causes significant harm [s1] | Trade secrets [s1]<br>Financial pre-release [s1] | Strict need-to-know access [s1] | "Confidential" marking and audit trail [s1] |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. No parentheticals in cells.
- **Tag 2.1 retained from stub.** Maps to (ISC)² 2024 outline §2.1. Sibling Concepts: `government-classification-levels.md` (the parallel U.S. government taxonomy), `data-classification-handling.md` (the per-level handling matrix).
- **The four-level model is one common choice; not universal.** Many organizations use three levels (Public / Internal / Confidential), some use five (adding Restricted between Sensitive and Confidential or adding Top Secret-equivalent at the top). The CISSP exam typically presents four levels with the labels above; an authoritative answer would acknowledge that the labels are organization-defined.
- **Public is not "no security required."** Public data still requires *integrity* protection — a defaced corporate website is a Public-data integrity failure. The "no restrictions" Fact applies to confidentiality, not to all CIA properties.
- **Sensitive vs. Private distinction.** Sensitive is broadly *internal* (everyone at the company can see it but it should not leave). Private is *personal* (employee or customer information legally protected — PII, PHI). Many organizations conflate these; CISSP courseware splits them.
- **Confidential is the "if disclosed, real damage" tier.** Trade secrets, M&A pre-announcement, executive compensation, customer lists, source code. Disclosure causes financial loss, regulatory penalty, or competitive disadvantage. The strictness of handling reflects the magnitude of harm from disclosure.
- **Marking is the operational artifact.** Without marking on the document/file/asset, the handler cannot know what classification applies. Most data-classification programs fail at the marking step — high-classification data exists but is not marked, so handlers treat it as Public or Sensitive. Automated marking via DLP tools and document-management metadata addresses this.
- **Aggregation effect raises classification.** Many Sensitive items combined can become Private or Confidential — the principle from `asset-classification-criteria.md`. A list of all employees + their salaries + their performance ratings is collectively Confidential even if each component item is only Sensitive or Private.
- **Gaps marked `[needs source]`:** none — all Facts trace to standard CISSP commercial-classification framing.

### Tricky distractors

- **Public still requires integrity protection.** "No restrictions" applies to confidentiality only. Wrong-answer pattern: claiming Public data needs no controls — defacement attacks target Public data integrity.
- **Sensitive vs Private.** Sensitive = internal-use; Private = personal/legally-protected (PII, PHI). Wrong-answer pattern: collapsing them — Private has stronger legal/regulatory backing.
- **Labels are organization-defined.** Four-level model is CISSP-canonical but not universal. Wrong-answer pattern: claiming all organizations must use exactly Public/Sensitive/Private/Confidential — labels vary.
- **Marking is operational.** Without marking, handlers treat unmarked data as Public. Wrong-answer pattern: assuming classification without marking is enforceable — handlers can't enforce labels they can't see.
- **Aggregation can elevate classification.** Many Sensitive items combined become Private or Confidential. Wrong-answer pattern: classifying aggregated assets at the lowest component level.
- **Confidential ≠ Top Secret.** Commercial Confidential is the highest commercial label; government Confidential is the lowest classification. Wrong-answer pattern: equating commercial Confidential with government Top Secret.

## Engine demo opportunities

- `? | example data → Trade secrets` → Confidential
- `Sensitive | handling requirements → ?` → `Restricted to organization members`
- `? | marking → No marking required` → Public
- `Private | example data → ?` → `Employee records` or `HR data`
- `Sensitive | marking → ?` with `"Confidential" marking and audit trail` (Confidential) and `No marking required` (Public) as distractors
- Composite Row profile: Public across all Columns with `handling requirements` swapped to `Strict need-to-know access` (Confidential's value)

## Sources

- `[s1]`: ISO/IEC 27001:2022 Annex A.5.12 *Classification of information* and CISSP courseware commercial classification framing (retrieved 2026-04-26, https://www.iso.org/standard/27001)
- `[s2]`: (ISC)² CISSP Certification Exam Outline, effective 2024-04-15, Domain 2 §2.1 (retrieved 2026-04-26, https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline)
