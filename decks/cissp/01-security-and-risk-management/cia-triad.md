# CIA Triad Components

**Domain:** 1 — Security and Risk Management &nbsp;|&nbsp; **Pattern:** Dimensions &nbsp;|&nbsp; **Tags:** 1.2
**Status:** draft (SME review pending)

The three foundational properties information security protects. Every CISSP-relevant control maps to at least one of these.

| Property | definition | common threats | common controls | example violation |
|---|---|---|---|---|
| Confidentiality | Ensuring information is accessible only to those authorized to access it | Eavesdropping<br>Network sniffing<br>Shoulder surfing<br>Social engineering<br>Unauthorized data exfiltration<br>Inadvertent disclosure | Encryption at rest<br>Encryption in transit<br>Access control lists<br>Steganography<br>Need-to-know enforcement | An unencrypted customer database is leaked publicly |
| Integrity | Ensuring information has not been altered in unauthorized ways | Unauthorized modification<br>Man-in-the-middle attack<br>Malware tampering with files<br>Replay attack | Hashing<br>SHA-256<br>SHA-3<br>Digital signatures<br>Message Authentication Codes<br>Version control<br>Reference monitor | An attacker modifies a bank account balance during transmission |
| Availability | Ensuring authorized users have timely and reliable access to information and resources | Denial of Service<br>Distributed Denial of Service<br>Hardware failure<br>Natural disaster<br>Ransomware | Redundancy<br>Failover<br>Load balancing<br>Backups<br>Restoration testing<br>Disaster recovery planning<br>Capacity planning | Ransomware encrypts critical systems making them inaccessible during business hours |

## Notes

- **Cell convention:** each `<br>`-separated item within a cell is one atomic Fact. **No parentheticals in cells.** The earlier draft had `Hashing (SHA-256, SHA-3)`, `Eavesdropping (network sniffing)`, `Denial of Service (DoS)`, `Distributed Denial of Service (DDoS)`, and `Message Authentication Codes (MACs)` — each smuggled sub-Facts or abbreviations into one cell. They've been split into separate Facts.
- **Abbreviations** like DoS, DDoS, MAC live here in Notes, not in cells: DoS = Denial of Service, DDoS = Distributed Denial of Service, MAC = Message Authentication Code. The full names are the Facts; abbreviations are reference.
- **`Hashing` and the algorithms.** `Hashing` is a control category; `SHA-256` and `SHA-3` are specific algorithms. Atomized as separate Facts so the engine can ask either independently. Could later become a separate Concept (`hashing-algorithms.md`) where rows are algorithms and columns are properties (output size, collision resistance, etc.).
- The opposite framing is **DAD**: Disclosure (vs. Confidentiality), Alteration (vs. Integrity), Destruction (vs. Availability). Often tested as a paired Concept.
- Some sources expand to **Parkerian Hexad** (adds Authenticity, Utility, Possession). Captured separately in `security-concept-frameworks.md`.
- Many controls cross multiple properties (e.g., backups protect Availability but verifying backup integrity protects Integrity). List under the *primary* property; tag for cross-reference during SME review.

### Tricky distractors

- **CIA vs DAD.** CIA names the *properties to protect*; DAD names the *threats* (Disclosure violates C; Alteration violates I; Destruction violates A). Wrong-answer pattern: confusing these on a "which framework" question. CIA is positive (what we protect); DAD is negative (what attackers do).
- **Hashing protects integrity, not confidentiality.** Wrong-answer pattern: claiming hashing makes data confidential. A hash proves data hasn't changed but doesn't hide it. Encryption protects confidentiality; hashing protects integrity.
- **Authenticity vs Integrity.** Integrity = data hasn't been modified. Authenticity = data is genuinely from the claimed source. Digital signatures provide both; HMAC provides authenticity (with a shared key). Wrong-answer pattern: treating these as identical.
- **Availability vs Reliability.** Availability is about access *when needed*; reliability is about consistent functioning over time. A system with high reliability can still fail an availability requirement if its uptime windows don't match user demand.
- **Parkerian Hexad.** Adds Authenticity, Utility, Possession to CIA — six properties total, not three. Wrong-answer pattern: claiming Parkerian Hexad adds Non-repudiation (it doesn't; that's part of Authenticity).
