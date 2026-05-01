# Data States

**Domain:** 2 — Asset Security &nbsp;|&nbsp; **Pattern:** Dimensions &nbsp;|&nbsp; **Tags:** 2.4
**Status:** draft (SME review pending)

The three states data exists in at any moment: at rest (stored), in transit (moving across a network), or in use (actively being processed in memory). Each state has distinct *typical controls*, *encryption methods*, and *threats*. The CISSP exam tests both the matchup between state and protection technique and the more recent emphasis on *in-use* protection (homomorphic encryption, confidential computing) which historically was the unprotected state.

| state | typical controls | encryption methods | threats | example |
|---|---|---|---|---|
| At rest | Disk encryption [s1]<br>Database encryption [s1] | AES-256 disk and database encryption [s1] | Unauthorized media access [s1] | Encrypted database file on disk [s1] |
| In transit | Channel encryption [s1]<br>Mutual authentication [s1] | TLS 1.3 [s1]<br>IPsec [s1] | Network eavesdropping [s1] | HTTPS request between client and server [s1] |
| In use | Memory protection [s1]<br>Confidential computing enclaves [s2] | Homomorphic encryption [s2]<br>Trusted execution environment [s2] | Cold boot memory attack [s2]<br>Privileged-process inspection [s2] | Application processing data in RAM [s1] |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. No parentheticals in cells.
- **Tag 2.4 retained from stub.** Maps to (ISC)² 2024 outline §2.4. Sibling Concept: `data-classification-handling.md` (the per-classification controls that depend on state).
- **The three states are exhaustive.** Every byte of data is in exactly one state at any moment. Data flows through the states: created in use → stored at rest → transmitted in transit → loaded back into use → archived at rest → destroyed. Controls must be designed for each state because the threats differ.
- **In-use is the historically-unprotected state.** Until ~2015, "encryption everywhere" meant at rest + in transit, with data necessarily decrypted in memory for processing. Cold-boot attacks (data persists in DRAM after power-off long enough to capture) and privileged-OS-level inspection made in-use a real vulnerability. Confidential computing (Intel SGX, AMD SEV, ARM TrustZone, AWS Nitro Enclaves) and homomorphic encryption emerged as in-use protection methods.
- **Homomorphic encryption: process without decrypting.** HE allows computation on ciphertext such that the result, when decrypted, equals the result of the same computation on the plaintext. Fully homomorphic encryption (FHE) supports arbitrary computation; partial schemes support only some operations. Performance overhead is severe (orders of magnitude) but improving.
- **Confidential computing: protected execution environment.** Trusted Execution Environments (TEEs) provide hardware-isolated compute where code and data are protected from the host OS, hypervisor, and other tenants. Cloud providers offer TEE-backed services (AWS Nitro Enclaves, Azure Confidential Computing, GCP Confidential Computing) for in-use protection.
- **TLS 1.3 vs. TLS 1.2.** TLS 1.3 is the current recommended protocol; it removed several insecure cipher suites and reduced handshake round-trips. TLS 1.2 is acceptable but should be configured with strong cipher suites. Older TLS (1.0, 1.1) is deprecated and should not be used.
- **Mutual authentication.** TLS by default authenticates the server to the client (the client trusts the server's certificate). Mutual TLS (mTLS) authenticates both directions — the server also requires a client certificate. Used for service-to-service authentication and high-security client connections.
- **Gaps marked `[needs source]`:** none — all Facts trace to NIST cryptography or confidential-computing framing.

### Tricky distractors

- **Three states are exhaustive.** Every byte is at rest, in transit, or in use at any moment. Wrong-answer pattern: claiming a fourth state — there isn't one in the canonical model.
- **In-use is historically unprotected.** TLS + disk encryption left memory exposed. Confidential computing and homomorphic encryption fix this. Wrong-answer pattern: claiming TLS protects in-use data — TLS protects in-transit only.
- **TLS protects in transit; AES-on-disk protects at rest.** Wrong-answer pattern: applying TLS to at-rest protection — TLS is a transport-layer protocol.
- **Homomorphic encryption processes ciphertext.** Computation produces correct result when decrypted. Wrong-answer pattern: claiming homomorphic encryption decrypts to process — it does the opposite.
- **TEEs/enclaves protect from privileged OS.** Hardware-isolated execution prevents host inspection. Wrong-answer pattern: claiming standard memory protection prevents privileged process inspection — it doesn't, the OS can read all memory by default.
- **Cold boot attacks target in-use.** DRAM data persists briefly after power-off. Wrong-answer pattern: classifying cold boot as an at-rest threat — the data was in use until power loss.

## Engine demo opportunities

- `? | encryption methods → AES-256 disk and database encryption` → At rest
- `In transit | threats → ?` → `Network eavesdropping`
- `? | typical controls → Confidential computing enclaves` → In use
- `At rest | example → ?` → `Encrypted database file on disk`
- `In use | encryption methods → ?` with `TLS 1.3` (In transit) and `AES-256 disk and database encryption` (At rest) as distractors
- Composite Row profile: At rest across all Columns with `encryption methods` swapped to `Homomorphic encryption` (In use's value)

## Sources

- `[s1]`: NIST SP 800-175B Rev. 1 *Guideline for Using Cryptographic Standards in the Federal Government: Cryptographic Mechanisms*, March 2020 (retrieved 2026-04-26, https://csrc.nist.gov/pubs/sp/800/175/b/r1/final). NIST SP 800-52 Rev. 2 *Guidelines for the Selection, Configuration, and Use of TLS Implementations* for TLS 1.3 framing (retrieved 2026-04-26, https://csrc.nist.gov/pubs/sp/800/52/r2/final)
- `[s2]`: Confidential Computing Consortium / Linux Foundation — confidential computing definitions for TEE and homomorphic encryption (retrieved 2026-04-26, https://confidentialcomputing.io/)
- `[s3]`: (ISC)² CISSP Certification Exam Outline, effective 2024-04-15, Domain 2 §2.4 (retrieved 2026-04-26, https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline)
