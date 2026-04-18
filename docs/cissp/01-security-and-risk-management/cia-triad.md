# CIA Triad Components

**Domain:** 1 — Security and Risk Management &nbsp;|&nbsp; **Pattern:** Dimensions &nbsp;|&nbsp; **Tags:** 1.2
**Status:** draft (SME review pending)

The three foundational properties information security protects. Every CISSP-relevant control maps to at least one of these.

| Property | definition | common threats | common controls | example violation |
|---|---|---|---|---|
| Confidentiality | Ensuring information is accessible only to those authorized to access it | Eavesdropping (network sniffing)<br>Shoulder surfing<br>Social engineering<br>Unauthorized data exfiltration<br>Inadvertent disclosure | Encryption at rest<br>Encryption in transit<br>Access control lists<br>Steganography<br>Need-to-know enforcement | An unencrypted customer database is leaked publicly |
| Integrity | Ensuring information has not been altered in unauthorized ways | Unauthorized modification<br>Man-in-the-middle attack<br>Malware tampering with files<br>Replay attack | Hashing (SHA-256, SHA-3)<br>Digital signatures<br>Version control<br>Reference monitor<br>Message Authentication Codes (MACs) | An attacker modifies a bank account balance during transmission |
| Availability | Ensuring authorized users have timely and reliable access to information and resources | Denial of Service (DoS)<br>Distributed Denial of Service (DDoS)<br>Hardware failure<br>Natural disaster<br>Ransomware | Redundancy<br>Failover<br>Load balancing<br>Backups<br>Restoration testing<br>Disaster recovery planning<br>Capacity planning | Ransomware encrypts critical systems making them inaccessible during business hours |

## Notes

- **Cell convention:** each `<br>`-separated item within a cell is one atomic fact at import time. Empty cells = no fact authored yet for that (Property, attribute) pair.
- The opposite framing is **DAD**: Disclosure (vs. Confidentiality), Alteration (vs. Integrity), Destruction (vs. Availability). Often tested as a paired Concept.
- Some sources expand to **Parkerian Hexad** (adds Authenticity, Utility, Possession). Captured separately in `security-concept-frameworks.md`.
- Many controls cross multiple properties (e.g., backups protect Availability but verifying backup integrity protects Integrity). List under the *primary* property; tag for cross-reference during SME review.
