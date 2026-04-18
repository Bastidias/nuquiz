# TLS 1.2 Handshake

**Domain:** 4 — Communication and Network Security &nbsp;|&nbsp; **Pattern:** Ordered &nbsp;|&nbsp; **Tags:** 4.3
**Status:** draft (SME review pending)

The TLS 1.2 handshake establishes an authenticated, encrypted channel over TCP. Tested for sequence understanding, the role of certificates, key exchange mechanics, and the distinction between authentication and encryption.

Simplified to five logical steps. The full TLS 1.2 handshake includes optional sub-messages (ClientCertificate, CertificateRequest, ServerKeyExchange for DHE/ECDHE) — captured in notes, not separated into their own Steps to keep the model tractable.

**Layout convention:** rows are steps in sequence. Columns are attributes of each step, left → right from terse identifier (Name) through mechanism (Direction, Content) to semantic role (Security Property). Each `<br>`-separated item is one atomic fact.

| Step | Name | Direction | Content | Security Property |
|---|---|---|---|---|
| 1 | Client Hello | Client → Server | Supported TLS version<br>Supported cipher suites<br>Client random | Negotiate capabilities |
| 2 | Server Hello + Certificate | Server → Client | Chosen cipher suite<br>Server random<br>X.509 certificate | Authenticate server via certificate |
| 3 | Key Exchange | Client → Server | Pre-master secret transmitted (RSA cipher)<br>Key share exchanged (DHE/ECDHE cipher)<br>Session keys derived | Establish shared secret |
| 4 | Change Cipher Spec | Bidirectional | Signal to switch to negotiated cipher suite | Transition to encrypted channel |
| 5 | Finished | Bidirectional (encrypted) | Hash of all prior handshake messages<br>First message sent encrypted | Verify handshake integrity |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic fact. No compound "and"-joined facts.
- **TLS 1.3 is structurally different** — fewer round trips (1-RTT, with 0-RTT optional), key exchange happens earlier, fewer optional messages. Worth a separate Concept (`tls-1-3-handshake.md`).
- **Mutual TLS (mTLS)** adds a client certificate exchange. Worth a separate Concept (`mtls-handshake.md`).
- **Certificate validation** (chain of trust, revocation checks) is a separate Concept. The handshake assumes the certificate is valid.
- Engine demo opportunities:
  - "Which step authenticates the server?" → Step 2
  - "What is one item in the Content of Step 1?" → Supported TLS version / Supported cipher suites / Client random
  - "Which step transitions to encrypted communication?" → Step 4
  - "What is the Security Property of Step 5?" → Verify handshake integrity
  - Sequence: "Which step comes immediately before Finished?" → Step 4 (Change Cipher Spec)
- Common exam confusion: Step 3 (Key Exchange) is *not* the same as Step 4 (Change Cipher Spec). Key Exchange establishes the shared secret. Change Cipher Spec announces the switch.
