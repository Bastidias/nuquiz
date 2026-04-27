# Bell-LaPadula Properties

**Domain:** 3 — Security Architecture and Engineering &nbsp;|&nbsp; **Pattern:** Aspects &nbsp;|&nbsp; **Tags:** 3.2
**Status:** draft (SME review pending)

The four properties that define the Bell-LaPadula confidentiality model. Bell-LaPadula is the canonical *confidentiality* model — its rules prevent information from flowing from higher classifications down to lower ones. The CISSP exam tests both the simple security property ("no read up") and the *-property ("no write down") and the tranquility variants that govern label changes.

| aspect | content |
|---|---|
| simple security property | Subject cannot read object at higher classification [s1] |
| *-property (star property) | Subject cannot write object at lower classification [s1] |
| strong tranquility | Object classifications never change [s1] |
| weak tranquility | Object classifications can change in non-violation ways [s1] |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. No parentheticals in cells.
- **Tag 3.2 retained from stub.** Maps to (ISC)² 2024 outline §3.2 *Understand the fundamental concepts of security models*. Sibling Concepts: `confidentiality-models.md` (the broader confidentiality model set), `biba-properties.md` (the integrity-side parallel), `mac-label-types.md` in Domain 5.
- **"No read up, no write down."** This mnemonic captures the two main properties: Simple Security = no read up (cannot read higher classification); *-Property = no write down (cannot write lower classification). Together they prevent information leakage from higher to lower classifications.
- **Why "no write down"?** Counterintuitive at first — why prevent writing *to* a lower classification? Because if a Top Secret subject can write to an Unclassified location, classified information leaks down. The constraint forces subjects working with classified data to keep their outputs at the same or higher classification.
- **Bell-LaPadula is confidentiality-only.** It does not address integrity (a subject could overwrite higher-classification data with garbage and BLP would not flag it — that violates integrity but not confidentiality). Biba addresses the integrity dimension. Real systems implement both BLP and Biba together when both properties matter.
- **The discretionary security property.** Some BLP formulations include a third "ds-property" — access must conform to a discretionary access matrix in addition to the mandatory rules. This Concept omits it because it is not always counted as a core property and is functionally equivalent to applying DAC alongside MAC.
- **Tranquility governs label changes.** Strong tranquility forbids any classification change while the system is operating; weak tranquility allows changes that do not violate the security policy. Most practical systems use weak tranquility — a Confidential document can be downgraded to Sensitive after redaction, but a Secret document cannot be silently upgraded to Top Secret without controlled procedures.
- **The Bell-LaPadula model is implemented by MLS systems.** Multi-Level Security (MLS) operating systems (SELinux MLS mode, Trusted Solaris) enforce BLP at the OS level. Cross-Domain Solutions (CDS) implement BLP-conformant transfer between security domains.
- **Gaps marked `[needs source]`:** none — all Facts trace to the original Bell-LaPadula paper.

### Tricky distractors

- **Simple Security vs *-property.** Simple Security = "no read up." *-property = "no write down." Wrong-answer pattern: confusing which property has which direction. Mnemonic: "*-property has *star* in the name and *star*ts the no-write rule." (Also: simple security is the *first* property historically — the simpler/older one — about reading.)
- **No write down — counterintuitive.** A Top Secret subject cannot write to a Confidential document. Wrong-answer pattern: assuming higher-cleared subjects can do anything. The rule prevents accidental classification leakage.
- **BLP is confidentiality-only.** Doesn't address integrity. Wrong-answer pattern: claiming BLP also enforces integrity (Biba does that, with inverted rules).
- **Strong vs weak tranquility.** Strong = labels never change at runtime. Weak = labels change only in security-preserving ways (e.g., approved declassification). Wrong-answer pattern: claiming strong tranquility allows controlled label changes — that's weak.
- **BLP discretionary security property.** Sometimes counted as a third property. The "ds-property" requires access to also conform to a discretionary access matrix (DAC layered on MAC). Wrong-answer pattern: claiming BLP is *purely* mandatory — most formulations include the ds-property too.

## Engine demo opportunities

- `? | content → Subject cannot read object at higher classification` → simple security property
- `*-property | content → ?` → `Subject cannot write object at lower classification`
- `? | content → Object classifications never change` → strong tranquility
- `simple security property | content → ?` with `Subject cannot write object at lower classification` (*-property) as a tempting wrong answer

## Sources

- `[s1]`: D. Bell and L. LaPadula *Secure Computer System: Unified Exposition and Multics Interpretation*, MITRE Technical Report ESD-TR-75-306, March 1976 — original Bell-LaPadula formal model (retrieved 2026-04-26, sourced via published security-models literature). NIST SP 800-160 Vol. 1 Rev. 1 references BLP framework.
- `[s2]`: (ISC)² CISSP Certification Exam Outline, effective 2024-04-15, Domain 3 §3.2 (retrieved 2026-04-26, https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline)
