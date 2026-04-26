# SOC 2 Trust Service Criteria

**Domain:** 6 — Security Assessment and Testing &nbsp;|&nbsp; **Pattern:** Dimensions &nbsp;|&nbsp; **Tags:** 6.5
**Status:** draft (SME review pending)

The five Trust Service Criteria (TSCs) defined by AICPA [s1] for SOC 2 reporting. Security is mandatory in every SOC 2 report; the other four are scoped optionally based on what the service organization wants to attest to. The most-tested CISSP framing is "which of these is required in every SOC 2" — the answer is Security, also known as the Common Criteria. The remaining four are added per customer demand or regulatory requirement (Privacy for HIPAA / GDPR-relevant services, Availability for SLA-relevant services, etc.).

| Criterion | what it covers | mandatory? |
|---|---|---|
| Security | Protection of system resources against unauthorized access | Yes |
| Availability | System availability for operation and use as committed | No |
| Processing Integrity | System processing is complete<br>System processing is valid<br>System processing is accurate<br>System processing is timely | No |
| Confidentiality | Information designated as confidential is protected | No |
| Privacy | Personal information is collected used retained disclosed and disposed of per privacy notice | No |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. **No parentheticals in cells.**
- **Security is "the Common Criteria."** AICPA refers to the Security TSC as the Common Criteria (CC) because every SOC 2 report includes it. The other four TSCs are scoped optionally per the service organization's choice and customer demand. SOC 2 reports often state the scope as "Security plus Confidentiality" or "Security plus Availability and Confidentiality."
- **Trust Service Criteria evolved from Trust Services Principles.** The earlier framework (pre-2017) called these Trust Services Principles. The current framework (2017 TSCs, updated 2022) renamed them and consolidated the criteria. CISSP testing uses the current TSC terminology.
- **Confidentiality vs Privacy.** The most-confused pair. Confidentiality is about protecting information that the service organization or its customer has designated as confidential — typically business-confidential information (contracts, IP, financials). Privacy is specifically about *personal information* — handling per the privacy notice, including collection, use, retention, disclosure, and disposal. Privacy is GDPR-relevant; Confidentiality is broader.
- **Processing Integrity.** Includes four sub-properties: completeness, validity, accuracy, timeliness. The cell value enumerates all four because they are CISSP-tested as a group. Processing Integrity is most relevant to financial-processing service organizations and data-pipeline providers.
- **Availability is SLA-aligned.** Availability TSC criteria typically map to the SLA the service organization commits to. A service organization that publishes a 99.9% SLA must have controls demonstrating they can meet it. Availability is commonly scoped for hosting providers, SaaS platforms, and infrastructure services.
- **Adding criteria affects audit cost and scope.** Each additional TSC scoped means additional controls to test, additional evidence to collect, and additional content in the SOC 2 report. Service organizations balance customer demand against audit cost when choosing scope.
- **Cross-Concept link.** Sibling Concept `soc-report-types` covers SOC 1 / 2 / 3 distinctions; this Concept covers the criteria scoped within SOC 2 reports.
- **Out of scope for this Concept:** specific control objectives within each TSC (the AICPA TSC document specifies dozens), the Common Criteria points-of-focus, the privacy framework's eight criteria, mapping between TSC and other frameworks (NIST CSF, ISO 27001).

### Values without a direct public citation

| Cell | Notes |
|---|---|
| All rows × what it covers | Phrasings | Paraphrases of AICPA TSC framework [s1] descriptions; not direct quotations. |

## Engine demo opportunities

- `Security | mandatory? → ?` → `Yes`
- `Availability | mandatory? → ?` → `No`
- `Privacy | mandatory? → ?` → `No`
- `? | mandatory? → Yes` → `Security`
- `? | mandatory? → No` → `Availability`, `Processing Integrity`, `Confidentiality`, `Privacy` — shared-Value select-all
- `Processing Integrity | what it covers → ?` → `System processing is complete`, `System processing is valid`, `System processing is accurate`, `System processing is timely`
- `? | what it covers → Personal information is collected used retained disclosed and disposed of per privacy notice` → `Privacy`
- Composite Privacy Row with `mandatory? → Yes` — directly tests the mandatory-criteria framing (only Security is mandatory; Privacy is optional)
- Composite Security Row with `mandatory? → No` — same test from the inverse direction (Security is the only mandatory TSC)
- Composite Availability Row with `what it covers` swapped to `Information designated as confidential is protected` — tests the Availability vs Confidentiality distinction (Availability is uptime/SLA; Confidentiality is information protection)

## Sources

- `[s1]`: AICPA, "Trust Services Criteria" (2017, with 2022 points-of-focus update) — five TSCs and the Common Criteria framework (retrieved 2026-04-26, https://us.aicpa.org/interestareas/frc/assuranceadvisoryservices/trustservices)
- `[s2]`: AICPA, "SOC for Service Organizations" — SOC 2 reporting framework that uses the TSCs (retrieved 2026-04-26, https://www.aicpa-cima.com/topic/audit-assurance/audit-and-assurance-greater-than-soc-2)
