# Forensics Artifact Types

**Domain:** 7 — Security Operations &nbsp;|&nbsp; **Pattern:** Dimensions &nbsp;|&nbsp; **Tags:** 7.6
**Status:** draft (SME review pending)

The five artifact categories a forensic investigator commonly collects, with the *typical use* each artifact supports, its *volatility* (which drives collection priority per RFC 3227's order-of-volatility guidance), and the *collection method* used to acquire it. The CISSP exam tests two things here: matching the artifact to its investigative use, and ordering acquisition correctly so that volatile evidence is captured before it disappears.

| artifact | typical use | volatility | collection method |
|---|---|---|---|
| Disk image | Recover deleted files [s1]<br>Recover file system metadata [s1] | Non-volatile [s1] | Bit-for-bit forensic imager [s1] |
| Memory dump | Analyze running processes [s1]<br>Recover encryption keys from RAM [s1] | Highly volatile [s2] | Memory acquisition tool [s1] |
| Network capture | Analyze attacker traffic [s1]<br>Recover unencrypted protocol data [s1] | Volatile in transit [s2] | Packet capture appliance [s1] |
| Log files | Reconstruct event timeline [s1] | Persistent on disk [s1] | Log collection agent [s1] |
| Browser history | Establish user activity [s1] | Persistent on disk [s1] | Browser forensics tool [s1] |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. No parentheticals in cells. Repeated `Persistent on disk` value across Log files and Browser history is intentional — both are file-backed artifacts with similar volatility profile, enabling shared-Value detection.
- **Tag 7.6 retained from stub.** Matches (ISC)² 2024 outline §7.6 *Conduct incident management*. Cross-Concept ties: `evidence-handling-chain.md` (process), `volatility-order.md` (acquisition ordering).
- **Why these five and not others.** NIST SP 800-86 organizes forensic data sources into four categories: files, operating systems, network traffic, and applications [s1]. The stub author decomposed this for CISSP teaching: disk image (file-system layer), memory dump (OS volatile), network capture (network), log files (OS/application), browser history (application). The decomposition is more granular than NIST's but maps cleanly back to it.
- **Volatility column drives collection order, not just classification.** RFC 3227 ranks evidence by volatility (registers/cache → RAM → network state → disk → archival media) and prescribes capturing the most-volatile first [s2]. Memory dump and network capture must come before disk imaging or the volatile evidence is lost. The full ranking lives in `volatility-order.md`.
- **Why "Recover encryption keys from RAM" is a typical use of memory dumps.** Disk encryption keys (BitLocker, FileVault, LUKS) live unencrypted in RAM while the system is running. If the system is shut down before memory is captured, the keys vanish and the disk image becomes ciphertext. This is the most-tested CISSP nuance in this Concept.
- **Browser history vs. application logs more broadly.** Browser history is called out as its own row because it is a uniquely high-signal artifact for user-attribution questions (URL visits, search terms, downloads). Other application artifacts (mail-client databases, registry keys, prefetch files) collapse into the broader "log files" or "disk image" buckets unless future authoring breaks them out.
- **Gaps marked `[needs source]`:** none — all Facts trace to NIST SP 800-86 framing or RFC 3227 volatility ordering.

## Engine demo opportunities

- `? | volatility → Highly volatile` → Memory dump
- `Network capture | typical use → ?` → `Analyze attacker traffic` or `Recover unencrypted protocol data`
- `? | collection method → Bit-for-bit forensic imager` → Disk image
- `Memory dump | typical use → ?` with `Recover deleted files` (Disk image) and `Reconstruct event timeline` (Log files) as distractors
- Cross-Row shared-Value detection: `? | volatility → Persistent on disk` → Log files, Browser history
- Composite Row profile: Disk image across all Columns with `volatility` swapped to `Highly volatile` (Memory dump's value)

## Sources

- `[s1]`: NIST SP 800-86 *Guide to Integrating Forensic Techniques into Incident Response*, August 2006 — particularly §3 Forensic Process and §§5–7 Data Source Categories (retrieved 2026-04-25, https://csrc.nist.gov/pubs/sp/800/86/final)
- `[s2]`: RFC 3227 *Guidelines for Evidence Collection and Archiving*, February 2002 — §2.1 Order of Volatility (retrieved 2026-04-25, https://www.rfc-editor.org/rfc/rfc3227)
- `[s3]`: (ISC)² CISSP Certification Exam Outline, effective 2024-04-15, Domain 7 §7.6 *Conduct incident management* (retrieved 2026-04-25, https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline)
