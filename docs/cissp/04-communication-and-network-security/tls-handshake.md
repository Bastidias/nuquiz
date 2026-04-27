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
  - `? | Security Property → Authenticate server via certificate` → Step 2.
  - `Step 1 | Content → ?` → Supported TLS version / Supported cipher suites / Client random (multi-Fact cell).
  - `? | Security Property → Transition to encrypted channel` → Step 4.
  - `Step 5 | Security Property → ?` → Verify handshake integrity.
  - Sequence (adjacency): `Step (n-1 where Step n | Name → Finished) | Name → ?` → Change Cipher Spec.
- Common exam confusion: Step 3 (Key Exchange) is *not* the same as Step 4 (Change Cipher Spec). Key Exchange establishes the shared secret. Change Cipher Spec announces the switch.

### Tricky distractors

- **Key Exchange vs Change Cipher Spec.** Key Exchange establishes the shared secret. Change Cipher Spec signals the switch to encrypted transmission. Wrong-answer pattern: collapsing them into one step.
- **TLS authenticates the server, not the user.** The X.509 certificate proves server identity. Client identity comes from mTLS or application-layer auth. Wrong-answer pattern: claiming TLS authenticates the user.
- **TLS 1.3 is not just faster TLS 1.2.** TLS 1.3 removed RSA key transport, mandates forward secrecy, and changes message ordering. Wrong-answer pattern: applying TLS 1.2 step-counts to TLS 1.3 — it's 1-RTT minimum.
- **Forward secrecy requires DHE/ECDHE.** RSA key transport leaks all past sessions if the server private key is compromised later. Wrong-answer pattern: claiming all TLS provides forward secrecy — only DHE/ECDHE cipher suites do.
- **Finished message is encrypted.** It's the first message under the negotiated cipher and includes a hash of all prior handshake messages — this is what defeats handshake tampering. Wrong-answer pattern: claiming Finished is plaintext.
- **TLS sits above TCP, below application.** Layer 5/6 in OSI terms. Wrong-answer pattern: classing TLS as a transport-layer protocol — TCP is transport; TLS rides on top.
