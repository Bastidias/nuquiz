# TCP vs UDP vs SCTP

**Domain:** 4 — Communication and Network Security &nbsp;|&nbsp; **Pattern:** Dimensions &nbsp;|&nbsp; **Tags:** 4.1, 4.3
**Status:** draft (SME review pending)

The three Layer-4 transport protocols. TCP and UDP are heavily tested; SCTP appears less often but is included so the engine can demonstrate distractor sourcing across three rows.

| Protocol | connection type | reliability | ordering | flow control | congestion control | header size | typical use cases | OSI layer |
|---|---|---|---|---|---|---|---|---|
| TCP | Connection-oriented (3-way handshake) | Reliable (retransmission of lost segments) | Ordered (sequence numbers) | Yes (sliding window) | Yes (slow start, congestion avoidance, fast retransmit) | 20 bytes minimum<br>60 bytes with options | Web (HTTP, HTTPS)<br>Email (SMTP, IMAP)<br>File transfer (FTP, SFTP)<br>Remote access (SSH) | Transport (Layer 4) |
| UDP | Connectionless | Unreliable (no retransmission) | Unordered | No | No | 8 bytes (fixed) | DNS<br>DHCP<br>VoIP<br>Video streaming<br>SNMP<br>NTP | Transport (Layer 4) |
| SCTP | Connection-oriented (4-way handshake) | Reliable | Partially ordered (per-stream ordering) | Yes | Yes | 12 bytes minimum | Telephony signaling (SS7 / SIGTRAN)<br>WebRTC data channels | Transport (Layer 4) |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic fact. Parenthetical clarifications scope a single fact (e.g., "Yes (sliding window)" is one fact about flow control).
- The TCP-vs-UDP comparison is the canonical CISSP transport question. Almost every exam tests "which protocol" reasoning.
- Engine demo opportunities:
  - Hide the row identifier → "Which protocol is connectionless?" → UDP
  - Hide a value → "TCP | reliability → ?" with UDP/SCTP values as discriminating distractors
  - Cross-cell select-all → "Which protocols provide flow control?" (TCP and SCTP yes; UDP no)
- **SCTP is intentionally included** even though less tested — it gives the engine a third row to source distractors from, and demonstrates "shared vs. discriminating" classification (e.g., "Reliable" is shared between TCP and SCTP, discriminating against UDP).
- QUIC is intentionally excluded for now — relatively new, layered on UDP, not heavily tested on CISSP yet. Add as a row if (ISC)² adds it to the outline.
