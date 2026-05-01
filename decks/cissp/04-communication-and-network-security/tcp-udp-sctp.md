# TCP vs UDP vs SCTP

**Domain:** 4 — Communication and Network Security &nbsp;|&nbsp; **Pattern:** Dimensions &nbsp;|&nbsp; **Tags:** 4.1, 4.3
**Status:** draft (SME review pending)

The three Layer-4 transport protocols. TCP and UDP are heavily tested; SCTP appears less often but is included so the engine can demonstrate distractor sourcing across three Rows and shared-Value detection (TCP and SCTP share several attribute Values that the parentheticals in earlier drafts had hidden).

| Protocol | connection type | handshake style | reliability | ordering | flow control | congestion control | min header size | max header size | OSI layer | typical use cases |
|---|---|---|---|---|---|---|---|---|---|---|
| TCP | Connection-oriented | 3-way handshake | Reliable | Ordered | Yes | Yes | 20 bytes | 60 bytes | Transport | Web (HTTP, HTTPS)<br>Email (SMTP, IMAP)<br>File transfer (FTP, SFTP)<br>Remote access (SSH) |
| UDP | Connectionless | None | Unreliable | Unordered | No | No | 8 bytes | 8 bytes | Transport | DNS<br>DHCP<br>VoIP<br>Video streaming<br>SNMP<br>NTP |
| SCTP | Connection-oriented | 4-way handshake | Reliable | Partially ordered | Yes | Yes | 12 bytes | 12 bytes | Transport | Telephony signaling<br>WebRTC data channels |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. **No parentheticals in cells.** Mechanism details that earlier drafts smuggled into cells (`(sliding window)`, `(retransmission of lost segments)`, `(per-stream ordering)`, `(slow start, congestion avoidance, fast retransmit)`) are listed below as context, not as Facts. They can later become their own Concept (e.g., `tcp-congestion-control.md`) if we want to test them.
- **Why the table looks like this now.** Splitting `connection type` from `handshake style`, and stripping mechanism parentheticals from `reliability` / `flow control` / `congestion control`, exposes shared Values across Rows: TCP and SCTP both = `Connection-oriented`, both = `Reliable`, both = `Yes` for flow control, both = `Yes` for congestion control. The engine can now generate questions like `? | reliability → Reliable` (select all) and detect the TCP/SCTP pairing — impossible when the cells were `Reliable (retransmission of lost segments)` vs `Reliable`.

### Mechanism context (reference, not Facts)

- **TCP:** reliability mechanism is retransmission of lost segments. Flow control mechanism is sliding window. Congestion control mechanisms include slow start, congestion avoidance, and fast retransmit. Ordering mechanism is sequence numbers.
- **UDP:** none of the above (Unreliable, no flow control, no congestion control, unordered).
- **SCTP:** reliable like TCP. Ordering is per-stream. Flow control and congestion control mechanisms similar to TCP at a high level; specifics differ (multi-homing, multi-streaming) and warrant their own Concept.

### Other notes

- **OSI layer Column** carries just `Transport`. The `(Layer 4)` parenthetical was removed because the layer number is a separate Fact already addressable in the OSI layers Concept, and including it here would smuggle a second Fact into one cell.
- The TCP-vs-UDP comparison is the canonical CISSP transport question. Almost every exam tests "which protocol" reasoning.
- **SCTP is intentionally included** even though less tested — it gives the engine a third Row to source distractors from, and (now that parentheticals are out of the cells) demonstrates shared-Value detection cleanly.
- QUIC is intentionally excluded for now — relatively new, layered on UDP, not heavily tested on CISSP yet. Add as a Row if (ISC)² adds it to the outline.

### Tricky distractors

- **TCP handshake count.** TCP uses *3-way*; SCTP uses *4-way*. Wrong-answer pattern: claiming TCP is 4-way (it's not — SYN, SYN-ACK, ACK is three messages).
- **DNS transport.** DNS uses BOTH UDP and TCP — UDP/53 for queries, TCP/53 for zone transfers and large responses. Wrong-answer pattern: "DNS is UDP-only." Strict UDP is incorrect.
- **UDP "unreliable" framing.** UDP doesn't *intend* to be unreliable; it doesn't provide reliability. Applications that use UDP must implement their own reliability if needed (DNS retries on timeout, VoIP tolerates loss, QUIC builds reliability on top). Wrong-answer pattern: claiming "UDP is broken" — it's deliberately minimal.
- **TCP header size.** TCP header is 20-60 bytes (variable due to options). Wrong-answer pattern: claiming "TCP header is fixed 20 bytes" — that's the *minimum*; with options it grows.
- **Connection-oriented protocols.** TCP and SCTP are connection-oriented; UDP is connectionless. Wrong-answer pattern: thinking SCTP is connectionless because it's newer. SCTP establishes association before data transfer.
- **Reliable + Connection-oriented are different properties.** TCP is both. UDP is neither. SCTP is both. They co-occur but are independent dimensions in principle.

### Engine demo opportunities

- Hide the Row identifier: `? | connection type → Connectionless` → UDP
- Hide a Value: `TCP | reliability → ?` with `Unreliable` (UDP) and `Partially ordered` (cross-Column from `ordering`) as distractors
- Cross-Row select-all: `? | flow control → Yes` → TCP and SCTP (shared-Value detection)
- Cross-Row select-all: `? | reliability → Reliable` → TCP and SCTP
- Composite Row profile: TCP across all Columns, with one cell swapped to a UDP or SCTP Value
