# Covert Channel Types

**Domain:** 3 — Security Architecture and Engineering &nbsp;|&nbsp; **Pattern:** Dimensions &nbsp;|&nbsp; **Tags:** 3.5
**Status:** draft (SME review pending)

The two covert channel categories defined in TCSEC and reused in modern multi-level-security analysis. Storage covert channels modulate shared *resources*; timing covert channels modulate shared *temporal patterns*. Both are *unintended communication paths* between subjects that the system's security policy was supposed to prevent. The CISSP exam tests both the matchup between channel and example and the principle that timing channels are typically harder to detect.

| type | mechanism | example | detection difficulty |
|---|---|---|---|
| Storage covert channel | Modulate shared storage resource visible to receiver [s1] | Set or unset filesystem attribute as bit signal [s1] | Easier to detect via storage-state monitoring [s1] |
| Timing covert channel | Modulate timing of operations observable to receiver [s1] | Vary CPU usage to encode bits [s1] | Harder to detect because timing is harder to baseline [s1] |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. No parentheticals in cells.
- **Tag 3.5 retained from stub.** Maps to (ISC)² 2024 outline §3.5. Sibling Concept: `architecture-vulnerabilities.md` (the broader vulnerability-class context).
- **Source: TCSEC Light Pink Book.** *A Guide to Understanding Covert Channel Analysis of Trusted Systems* (NSA, 1993) is the canonical reference. Modern security-architecture literature reuses its taxonomy.
- **Why two and not more.** Some references add subdivisions (e.g., timing channels split into sleep-based, CPU-based, network-RTT-based). The two-row taxonomy here is the CISSP-canonical one — every covert channel modulates either a storage resource or a timing pattern. Subdivisions are implementation details.
- **Covert vs. side channels.** Covert channels are *intentional* — a malicious sender deliberately modulates the channel to communicate with a receiver. Side channels are *unintentional* — the implementation accidentally reveals information through measurement (timing, power, electromagnetic emission). Both exploit the same physical phenomena; the distinction is intent.
- **Bandwidth is typically low.** Covert channels carry information at very low rates — bits per second, sometimes minutes per bit. This matters for threat modeling: a covert channel suitable for exfiltrating a 256-bit AES key (256 bits) may be inadequate for a multi-gigabyte database. Mitigation often focuses on slowing the channel further rather than eliminating it.
- **Why timing channels are harder to detect.** Storage channel modulation typically leaves observable state changes (a flag set or unset, a file present or absent). Timing channel modulation appears as natural performance variability — distinguishing intentional modulation from normal noise requires a baseline of typical behavior, which is hard to establish in dynamic environments.
- **MLS and cloud relevance.** Covert channels were originally a concern in multi-level-security systems (where Top Secret subjects must not signal Confidential subjects). They are now relevant in cloud computing — co-tenant covert channels (CPU contention, cache timing) can leak information across VM boundaries. Confidential computing (TEEs) addresses some of these.
- **Gaps marked `[needs source]`:** none — all Facts trace to TCSEC documentation.

### Tricky distractors

- **Storage vs Timing covert channel.** Storage modulates shared resources; Timing modulates temporal patterns. Wrong-answer pattern: collapsing them — TCSEC distinguishes them as the canonical taxonomy.
- **Timing channels are harder to detect.** Natural variability obscures modulation. Wrong-answer pattern: claiming storage is harder to detect — storage has observable state changes.
- **Covert channels are intentional.** Malicious sender. Side channels are unintentional. Wrong-answer pattern: collapsing covert and side channels — different threat models.
- **Bandwidth is typically low.** Bits per second to bits per minute. Wrong-answer pattern: claiming covert channels are high-bandwidth exfiltration vectors — they're slow but persistent.
- **MLS context originated covert-channel research.** TCSEC. Wrong-answer pattern: claiming covert channels only matter in modern cloud — MLS systems were the original concern.
- **Cloud co-tenancy revives covert channel concerns.** Cache, CPU contention. Wrong-answer pattern: claiming covert channels are obsolete — cloud co-tenancy renewed them.

## Engine demo opportunities

- `? | mechanism → Modulate timing of operations observable to receiver` → Timing covert channel
- `Storage covert channel | example → ?` → `Set or unset filesystem attribute as bit signal`
- `? | detection difficulty → Harder to detect because timing is harder to baseline` → Timing covert channel
- Cross-Concept distractor: presented with a side-channel attack description, recognize it does not belong to this Concept (covert vs. side channel distinction)

## Sources

- `[s1]`: NSA *A Guide to Understanding Covert Channel Analysis of Trusted Systems* (TCSEC Light Pink Book, NCSC-TG-030), November 1993 (retrieved 2026-04-26, sourced via NSA published documentation)
- `[s2]`: (ISC)² CISSP Certification Exam Outline, effective 2024-04-15, Domain 3 §3.5 (retrieved 2026-04-26, https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline)
