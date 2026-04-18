# TCP 3-Way Handshake

**Domain:** 4 — Communication and Network Security &nbsp;|&nbsp; **Pattern:** Ordered &nbsp;|&nbsp; **Tags:** 4.3
**Status:** draft (SME review pending)

The three-step handshake that establishes a TCP connection. Tested for sequence recall, flag recognition, and the security implications (e.g., SYN flood attacks).

**Layout convention:** rows are steps in sequence. Columns are attributes of each step, ordered left → right from least detail (Name) to most detail (Purpose). Each cell holds atomic facts; multi-fact cells separate items with `<br>` (no "and"-joined compound facts).

| Step | Name | Direction | Flags & Sequence | Purpose |
|---|---|---|---|---|
| 1 | SYN | Client → Server | SYN flag set<br>Client sends initial sequence number (ISN_c) | Request connection<br>Propose initial sequence number |
| 2 | SYN-ACK | Server → Client | SYN flag set<br>ACK flag set<br>Server sends initial sequence number (ISN_s)<br>Server acknowledges ISN_c + 1 | Accept connection<br>Provide server initial sequence number |
| 3 | ACK | Client → Server | ACK flag set<br>Client acknowledges ISN_s + 1 | Confirm server acknowledgment<br>Connection established<br>Data flow may begin |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic fact. No compound "and"-joined facts.
- **Connection teardown** is a separate four-way exchange (FIN, ACK, FIN, ACK) and deserves its own Concept (`tcp-teardown.md`).
- **Security implications worth their own Concepts:**
  - **SYN flood** — exploits Step 2 by leaving half-open connections, exhausting server resources
  - **Sequence number prediction** — pre-RFC 1948 vulnerability where attackers could predict ISN values
- Engine demo opportunities:
  - `Step 2 | Name → ?` → SYN-ACK. Distractors from other Steps' Names.
  - `? | Direction → Server → Client` → Step 2.
  - `Step 1 | Purpose → ?` → Request connection / Propose initial sequence number (multi-Fact cell).
  - Sequence (adjacency): `Step (n+1 where Step n | Name → SYN-ACK) | Name → ?` → ACK. (Or simply hide Step 3's Name.)
- Some textbooks describe the handshake as SYN / SYN+ACK / ACK rather than SYN-ACK. Both are equivalent.
