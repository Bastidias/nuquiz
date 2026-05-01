# STRIDE Categories

**Domain:** 1 — Security and Risk Management &nbsp;|&nbsp; **Pattern:** Dimensions &nbsp;|&nbsp; **Tags:** 1.11
**Status:** draft (SME review pending)

The six threat categories Microsoft's STRIDE model uses to enumerate what can go wrong in a system design, each paired with the one security property whose negation the threat expresses. Rows are the six letters in canonical S-T-R-I-D-E order. Columns progress from the abstract property violated, through the attacker's intent, to a concrete example attack, and finally the canonical mitigation family.

| Threat | property violated | attacker goal | example attack | typical mitigation |
|---|---|---|---|---|
| Spoofing | Authenticity [s2] | Impersonate a legitimate identity [s1] | Phishing [s1] | Strong authentication [s3] |
| Tampering | Integrity [s2] | Modify data or code [s1] | Data modification in transit [s1] | Digital signatures<br>Hashes<br>MACs [s3] |
| Repudiation | Non-repudiability [s2] | Deny a prior action [s1] | Log deletion [s1] | Audit logs<br>Digital signatures<br>Timestamps [s3] |
| Information disclosure | Confidentiality [s2] | Expose unauthorized data [s1] | Eavesdropping [s1] | Encryption<br>Access control [s3] |
| Denial of service | Availability [s2] | Make system unavailable [s1] | Resource exhaustion [s1] | Throttling<br>Rate limiting<br>Filtering [s3] |
| Elevation of privilege | Authorization [s2] | Gain unauthorized higher access [s1] | Buffer overflow exploit [s1] | Least privilege [s3] |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. No parentheticals in cells.
- **Origin.** STRIDE was developed at Microsoft by Loren Kohnfelder and Praerit Garg and first described in "The threats to our products" (April 1999, *Microsoft Interface*) [s2]. The original internal paper is not hosted on a public site; Wikipedia is the secondary reference for the origin claim and for the property-violated mapping.
- **Property vocabulary.** Wikipedia and Microsoft both treat STRIDE as the inverse of six security properties — Authenticity, Integrity, Non-repudiability, Confidentiality, Availability, Authorization. Some CISSP texts use "Non-repudiation" in place of "Non-repudiability"; this Concept uses the Wikipedia form for consistency with the cited source.
- **`Digital signatures` appears in two Rows** — Tampering and Repudiation. This is a legitimate shared-Value: a digital signature both detects content modification (integrity) and binds a principal to the content (non-repudiation), so it is the correct mitigation for both threats. The engine should surface this as a cross-row select.
- **Example attacks are representative, not exhaustive.** The single example per row is a CISSP-level pedagogical choice. Real-world attacks often cross multiple STRIDE categories — ARP poisoning spoofs identity (S) to enable tampering (T) or information disclosure (I).
- **DoS mitigations.** OWASP also lists authentication and authorization under DoS, distinguishing legitimate users from abusers. This Concept records only the DoS-specific mitigations (throttling, rate limiting, filtering) that are not already covered by the Spoofing row's `Strong authentication` mitigation — otherwise the column becomes a transitive closure of every control.
- **EoP row asymmetry.** OWASP's only listed mitigation for Elevation of privilege is "Run with least privilege." That is genuinely the one canonical mitigation family: least privilege limits the blast radius when EoP succeeds. Prevention would require eliminating all defects in every underlying defense, which is not a mitigation but a wish.
- **Out of scope:** DREAD (risk-scoring variant), STRIDE-LM (lateral-movement extension), PASTA, VAST, OCTAVE, and other non-STRIDE threat-modeling methodologies — those belong in a `threat-modeling-methodologies` Concept.

### Tricky distractors

- **STRIDE letter-to-property mapping.** S=Authenticity, T=Integrity, R=Non-repudiability, I=Confidentiality, D=Availability, E=Authorization. Wrong-answer pattern: matching S (Spoofing) to Integrity — Spoofing violates Authenticity, Tampering violates Integrity.
- **Repudiation ≠ Information disclosure.** Repudiation is denying a prior action; Information disclosure is exposing data. Wrong-answer pattern: collapsing the two.
- **Elevation of Privilege mitigation is least privilege.** It limits blast radius after EoP succeeds. Wrong-answer pattern: claiming patching prevents EoP — patching helps but least privilege is the canonical defense.
- **Digital signatures mitigate two threats.** Both Tampering (integrity) and Repudiation (non-repudiability). Wrong-answer pattern: claiming signatures only address tampering — they bind principal to content for non-repudiation too.
- **STRIDE is identification, not scoring.** STRIDE enumerates threats. DREAD scores them (deprecated). Wrong-answer pattern: assuming STRIDE produces risk scores — that's DREAD's role.
- **STRIDE-LM is the extended version.** Adds Lateral Movement. Wrong-answer pattern: confusing STRIDE-LM with the standard six-letter STRIDE on the exam.

### Values without a direct public citation

| Cell | Value | Why unsourced |
|---|---|---|
| Spoofing × example attack | `Phishing` | CISSP pedagogical choice. Microsoft's definition emphasizes "using another user's authentication information" but does not name phishing specifically. |
| Tampering × example attack | `Data modification in transit` | Paraphrase of Microsoft's "alteration of data as it flows between two computers over an open network." Not a direct quote. |
| Repudiation × example attack | `Log deletion` | CISSP pedagogical choice. Microsoft's example is a user denying an action without a traceable audit trail — log deletion is one enabler. |
| Information disclosure × example attack | `Eavesdropping` | CISSP pedagogical choice. Microsoft lists both unauthorized file read and in-transit read; `Eavesdropping` compresses the latter. |
| Denial of service × example attack | `Resource exhaustion` | CISSP pedagogical choice. Microsoft's example is "making a Web server temporarily unavailable." |
| Elevation of privilege × example attack | `Buffer overflow exploit` | CISSP pedagogical choice. Microsoft's definition does not name a specific vector. |
| All rows × attacker goal | — | Column values paraphrase Microsoft's prose category descriptions; no single-sentence quote from the source. |

## Engine demo opportunities

- `Spoofing | property violated → ?` → `Authenticity`
- `Tampering | property violated → ?` → `Integrity`
- `? | property violated → Confidentiality` → `Information disclosure`
- `? | property violated → Availability` → `Denial of service`
- `? | typical mitigation → Digital signatures` → `Tampering`, `Repudiation` — shared-Value select-all
- `Elevation of privilege | typical mitigation → ?` → `Least privilege`
- `Denial of service | typical mitigation → ?` → `Throttling<br>Rate limiting<br>Filtering`
- Composite Spoofing Row with `property violated` swapped to `Integrity` — tests the canonical STRIDE-letter mapping (S binds to Authenticity, not Integrity)
- Composite Repudiation Row with `typical mitigation` swapped to `Least privilege` — tests the Repudiation ↔ audit-trail pairing against the EoP ↔ least-privilege pairing

## Sources

- `[s1]`: Microsoft Learn, "Threats — Microsoft Threat Modeling Tool" (updated 2026-03-04, retrieved 2026-04-19, https://learn.microsoft.com/en-us/azure/security/develop/threat-modeling-tool-threats)
- `[s2]`: Wikipedia, "STRIDE model" (retrieved 2026-04-19, https://en.wikipedia.org/wiki/STRIDE_model) — secondary reference for the property-violated mapping and for the origin citation (Kohnfelder & Garg, "The threats to our products," April 1999, *Microsoft Interface*, which is not available on public sites).
- `[s3]`: OWASP, "Threat Modeling Process" (retrieved 2026-04-19, https://owasp.org/www-community/Threat_Modeling_Process)
