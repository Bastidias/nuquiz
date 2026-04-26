# DRM / IRM Components

**Domain:** 2 — Asset Security &nbsp;|&nbsp; **Pattern:** Dimensions &nbsp;|&nbsp; **Tags:** 2.6
**Status:** draft (SME review pending)

The four components that together comprise a Digital Rights Management (DRM) or Information Rights Management (IRM) system. License management decides who can access what; persistent protection enforces those decisions wherever the data travels; auditing records who accessed what; policy enforcement applies the access decisions in real time. The CISSP exam tests both the per-component definition and the matchup between component and capability — particularly that "DRM follows the data" is a persistent-protection property.

| component | definition | typical use case | weakness |
|---|---|---|---|
| License management | Issue and revoke per-recipient access licenses [s1] | Per-document permission grant [s1] | Compromised license server breaks all access decisions [s1] |
| Persistent protection | Encryption that travels with the data [s1] | Document remains protected when shared externally [s1] | Authorized users can still capture content via screen-grab [s1] |
| Auditing | Log all access and rights events [s1] | Forensic trail of who accessed protected content [s1] | Logs grow large in high-volume environments [needs source] |
| Policy enforcement | Apply access rules at the moment of access [s1] | Block printing for users without print right [s1] | Requires capable client software at consumption point [s1] |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. No parentheticals in cells.
- **Tag 2.6 retained from stub.** Maps to (ISC)² 2024 outline §2.6.
- **DRM vs. IRM terminology.** DRM (Digital Rights Management) is the older term, originally associated with consumer media protection (music, video, e-books). IRM (Information Rights Management) is the enterprise-focused term, applied to documents and email. Same technology family; different markets and emphasis. The CISSP exam may use either term.
- **The "follows the data" property is the core IRM value.** Standard access control protects data while it sits in a system you control. IRM protects data *after* it leaves — a Confidential document emailed to a customer, copied to a USB drive, or saved to a personal cloud remains encrypted and access-controlled because the protection is *embedded in the file*. License lookup happens at access time.
- **The screen-capture loophole is unfixable.** No IRM system can prevent an authorized user from photographing the screen, transcribing the content, or otherwise exfiltrating via the analog gap. IRM raises the cost of unauthorized distribution but does not eliminate it. Advanced systems add per-recipient steganographic watermarks to make leak attribution possible.
- **License server is the central point of failure.** Persistent protection requires the client to check with the license server at access time. If the license server is unreachable (network outage, server compromise), access decisions cannot be made. Most IRM systems have offline-grace policies (cached licenses valid for N days) but eventually all licenses must refresh.
- **Common products.** Microsoft Purview Information Protection (formerly Azure Information Protection), Adobe Document Cloud, and Vera (acquired by HelpSystems) are commercial IRM systems. They differ in supported file formats, license-management models, and integration ecosystems but share the four-component architecture in this Concept.
- **Adjacent technologies (intentionally not on this table).** Data Loss Prevention (DLP) is preventive at egress points; Cloud Access Security Brokers (CASB) extend DLP to cloud SaaS; secure file-share platforms (Box, Dropbox enterprise) provide a hosted alternative to file-embedded IRM. Each has different trade-offs.
- **Gaps marked `[needs source]`:** one Fact — auditing's log-volume weakness. Practitioner consensus but not yet sourced to a primary publication.

## Engine demo opportunities

- `? | typical use case → Document remains protected when shared externally` → Persistent protection
- `License management | weakness → ?` → `Compromised license server breaks all access decisions`
- `? | definition → Log all access and rights events` → Auditing
- `Policy enforcement | typical use case → ?` → `Block printing for users without print right`
- `Persistent protection | weakness → ?` with `Compromised license server breaks all access decisions` (License management) as a tempting wrong answer
- Composite Row profile: License management across all Columns with `weakness` swapped to `Authorized users can still capture content via screen-grab` (Persistent protection's value)

## Sources

- `[s1]`: ISO/IEC 21000-5:2004 *Information technology — Multimedia framework — Part 5: Rights Expression Language* and Microsoft documentation for Purview Information Protection / Rights Management Service (retrieved 2026-04-26, https://www.iso.org/standard/36095.html and https://learn.microsoft.com/en-us/azure/information-protection/)
- `[s2]`: (ISC)² CISSP Certification Exam Outline, effective 2024-04-15, Domain 2 §2.6 (retrieved 2026-04-26, https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline)
