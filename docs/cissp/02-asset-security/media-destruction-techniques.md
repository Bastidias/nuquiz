# Media Destruction Techniques

**Domain:** 2 — Asset Security &nbsp;|&nbsp; **Pattern:** Dimensions &nbsp;|&nbsp; **Tags:** 2.5
**Status:** draft (SME review pending)

The five physical media-destruction techniques NIST SP 800-88 Rev 1 [s1] addresses. Each pairs with the *applicable media* it works on, the *residual risk* after destruction, the *verification* method to confirm completion, and the *environmental impact* of the technique. The most-tested CISSP discriminator is media compatibility — degaussing destroys magnetic media but does *not* destroy SSD or flash media because those store data with no magnetic component.

| Technique | applicable media | residual risk | verification | environmental impact |
|---|---|---|---|---|
| Degaussing | Magnetic media [s1] | Negligible if field strength sufficient | Magnetic field measurement | Low |
| Shredding | Paper<br>Optical media<br>Hard drives [s1] | Negligible if particle size below standard | Visual inspection of particle size | Moderate |
| Pulverizing | Hard drives<br>Optical media [s1] | Negligible | Visual inspection of fragments | Moderate |
| Incineration | Paper<br>Optical media [s1] | Negligible | Combustion completion verification | High |
| Disintegration | Hard drives<br>Solid-state drives [s1] | Negligible | Visual inspection of disintegrated particles | Moderate |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. **No parentheticals in cells.**
- **Degaussing only works on magnetic media.** This is the single most-tested point. Degaussing applies a strong alternating magnetic field to randomize the magnetic domains on the storage surface, rendering data unrecoverable. It works on hard disk drives (HDDs), magnetic tape, and floppy disks. It does *not* work on solid-state drives (SSDs), flash media (USB sticks, SD cards), optical media (CD/DVD/Blu-ray), or paper — those use non-magnetic storage mechanisms.
- **Shredding particle size matters.** NIST SP 800-88 specifies particle-size thresholds — for paper containing classified information, P-7 (1mm × 5mm) is required for Top Secret; P-4 (typical office shred) is acceptable for less-sensitive content. For hard drives, the disk-shred standard is much smaller particles (typically <2mm). Shredders that produce larger particles are not approved for high-sensitivity destruction.
- **Pulverizing breaks media into fragments.** Distinct from shredding (which produces small particles) — pulverizing crushes media into irregular fragments. Common for hard drives in environments where shredders are unavailable. Effective if fragments are small enough that platters cannot be reassembled.
- **Incineration is the most thorough but environmentally heaviest.** Reduces media to ash through high-temperature combustion. Effective for paper and optical media; less practical for metal-containing media (hard drives) because the metals don't fully combust. Environmental concerns include emissions and disposal of ash residue. NSA-approved incinerators exist for classified-paper destruction.
- **Disintegration uses high-speed impact.** A disintegrator passes the media through rotating cutting blades that reduce it to small particles. Works on both magnetic and solid-state drives because the destruction is mechanical, not electromagnetic. Often used for SSD destruction where degaussing fails.
- **All techniques are NIST 800-88 "Destroy" methods.** Sibling Concept `data-sanitization-methods` covers the broader Clear / Purge / Destroy / Cryptographic Erasure framework. This Concept covers the *physical-destruction* techniques specifically.
- **Verification matters for compliance.** Destruction without verification is just "we put it in a box marked 'destroyed.'" NIST 800-88 requires a *certificate of destruction* documenting what was destroyed, by whom, when, and by what method, with verification evidence (typically photographs or measurement readouts). Many compliance regimes require third-party-witnessed destruction for high-sensitivity media.
- **Out of scope for this Concept:** specific NIST 800-88 particle-size requirements per data sensitivity, vendor-specific destruction equipment, environmental regulations on incineration, recycling pathways for shredded electronics, NIST 800-88 guidance on cloud-storage sanitization.

### Values without a direct public citation

| Cell | Notes |
|---|---|
| All rows × residual risk | `Negligible` qualifiers | NIST SP 800-88 [s1] specifies particle-size and field-strength thresholds; the cell values reflect "negligible if performed to standard" without quoting specific thresholds. |
| All rows × verification | Verification phrasings | NIST 800-88 prescribes verification at the program level; specific verification methods per technique are operational practice. |
| All rows × environmental impact | Categorical bins | Environmental impact rankings are practitioner consensus, not from NIST. |

## Engine demo opportunities

- `Degaussing | applicable media → ?` → `Magnetic media`
- `Disintegration | applicable media → ?` → `Hard drives`, `Solid-state drives`
- `Incineration | environmental impact → ?` → `High`
- `? | applicable media → Magnetic media` → `Degaussing`
- `? | environmental impact → Low` → `Degaussing`
- `? | environmental impact → High` → `Incineration`
- Composite Degaussing Row with `applicable media` swapped to `Solid-state drives` — directly tests the degaussing-doesn't-work-on-SSD point (the single most-tested fact in this Concept)
- Composite Shredding Row with `applicable media` swapped to `Magnetic media` only — tests that shredding works on multiple media types, not just magnetic
- Composite Incineration Row with `environmental impact` swapped to `Low` — tests environmental ranking (incineration is the highest-impact technique)

## Sources

- `[s1]`: NIST SP 800-88 Rev 1, "Guidelines for Media Sanitization" — destruction techniques per media type (December 2014, retrieved 2026-04-26, https://csrc.nist.gov/publications/detail/sp/800-88/rev-1/final)
- `[s2]`: NSA / Central Security Service, "Storage Device Sanitization and Destruction Manual" — high-classification destruction requirements (retrieved 2026-04-26, https://www.nsa.gov/Resources/Media-Destruction-Guidance/)
