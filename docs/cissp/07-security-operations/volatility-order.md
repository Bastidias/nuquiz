# Order of Volatility

**Domain:** 7 — Security Operations &nbsp;|&nbsp; **Pattern:** Ordered &nbsp;|&nbsp; **Tags:** 7.6, 1.6
**Status:** draft (SME review pending)

The seven evidence sources, ordered from most volatile (vanishes fastest) to least volatile (persists longest). RFC 3227 prescribes capturing evidence in this order so that volatile data is preserved before it disappears. The CISSP exam tests both the ordering itself and the tool / acquisition method appropriate to each tier — getting the order wrong is the canonical wrong-answer scenario for forensic-collection questions.

**Layout convention:** rows are ordered from most volatile (Order 1) to least volatile (Order 7). Columns progress from identifier (Order, Name) to justification (Reason for order) to instrumentation (Typical capture tool).

| Order | Name | Reason for order | Typical capture tool |
|---|---|---|---|
| 1 | CPU registers | Lifetime measured in nanoseconds [s1] | Hardware register dumper [needs source] |
| 2 | Cache | Lifetime measured in microseconds [s1] | Specialized cache analyzer [needs source] |
| 3 | RAM | Lost on power-off [s1] | Memory acquisition tool [s2] |
| 4 | Network state | Network state changes within seconds [s1] | Network state command output [s1] |
| 5 | Running processes | Process state ends on termination [s1] | Process listing tool [s1] |
| 6 | Disk | Persistent across power cycles [s1] | Bit-for-bit forensic imager [s2] |
| 7 | Archived media | Persistent for years [s1] | Backup recovery tool [needs source] |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. No parentheticals in cells.
- **Tags 7.6 and 1.6 retained from stub.** Cross-tagged to (ISC)² 2024 outline §7.6 *Conduct incident management* (incident-response forensic phase) and §1.6 (the exact §1.x mapping for evidence handling depends on outline version — the §1.7 *Investigations* sub-objective is the more direct fit on the 2024 outline; left as 1.6 per stub for consistency until a future authoring pass cross-checks the full domain-1 tag map).
- **Source: RFC 3227.** Order of volatility comes from RFC 3227 *Guidelines for Evidence Collection and Archiving* (February 2002) [s1]. NIST SP 800-86 cites and reuses this ordering [s2]. The seven-tier decomposition here is the most-tested CISSP framing; some sources collapse 1+2 (registers + cache) into a single tier or expand 6+7 (disk + archived media) further.
- **Why ordering matters operationally.** Pulling the power on a compromised system is the single most-destructive forensic mistake — it loses tiers 1-5 instantly. Live response (capturing volatile data while the system is running) must complete before any disk imaging or shutdown. The RFC 3227 ordering tells the responder exactly what to grab first.
- **Network state is the most-volatile non-RAM tier.** ARP caches, routing tables, and active TCP connections age out or change within seconds-to-minutes on a healthy host. Capture them with `netstat`, `arp`, `route`, and equivalent tools before any action that disturbs network connections.
- **Disk is volatile-ish too.** "Persistent across power cycles" does not mean immutable — file-system journal entries, swap/page-file contents, and unallocated space change continuously. Disk imaging captures *the snapshot at acquisition time*; what was overwritten before that point is lost. This is why disk forensics is paired with memory and network capture for completeness.
- **Why CPU registers and cache are practically uncollectable.** Tools to dump CPU register state and L1/L2 cache contents exist (specialized hardware probes, JTAG interfaces) but they are rarely deployed in incident response — the data is gone before the responder arrives. The two top tiers are on the list because RFC 3227 includes them; in practice, the responder starts at tier 3 (RAM).
- **Tie to other Concepts.** This Concept governs the *order* in which the artifacts in `forensics-artifact-types.md` are collected during Step 2 (Collection) of `evidence-handling-chain.md`. The Order column here corresponds to acquisition priority within that step.
- **Gaps marked `[needs source]`:** three Facts — capture tools for tiers 1, 2, and 7. Hardware register/cache acquisition tools are specialized and rarely used; backup-recovery tools exist but are not consistently named in primary publications. Practitioner consensus only.

## Engine demo opportunities

- `? | Name → Network state` → Order 4
- `Order 3 | Name → ?` → `RAM`
- `? | Reason for order → Lifetime measured in nanoseconds` → Order 1 / CPU registers
- `RAM | Typical capture tool → ?` → `Memory acquisition tool`
- Sequence verification: `Order 2 → ? → Order 4` → Order 3 (RAM) — tests Ordered-Pattern progression
- Cross-Row priority question: given a list of unordered evidence sources, recover the volatility order
- Composite Row profile: RAM across all Columns with `Reason for order` swapped to `Persistent across power cycles` (Disk's value)

## Sources

- `[s1]`: RFC 3227 *Guidelines for Evidence Collection and Archiving*, February 2002 — §2.1 Order of Volatility (retrieved 2026-04-25, https://www.rfc-editor.org/rfc/rfc3227)
- `[s2]`: NIST SP 800-86 *Guide to Integrating Forensic Techniques into Incident Response*, August 2006 (retrieved 2026-04-25, https://csrc.nist.gov/pubs/sp/800/86/final) — for cross-confirmation of RFC 3227 order and acquisition tooling
- `[s3]`: (ISC)² CISSP Certification Exam Outline, effective 2024-04-15, Domain 7 §7.6 *Conduct incident management* and Domain 1 §1.7 *Investigations* (retrieved 2026-04-25, https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline)
