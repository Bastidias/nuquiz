# Wireless Security Standards

**Domain:** 4 — Communication and Network Security &nbsp;|&nbsp; **Pattern:** Dimensions &nbsp;|&nbsp; **Tags:** 4.2, 4.3
**Status:** draft (SME review pending)

The four generations of IEEE 802.11 link-layer security. CISSP testing walks through them as an evolutionary sequence — each generation replaced a specific weakness in its predecessor: WEP's broken RC4 / CRC-32, WPA's RC4 retention, WPA2's 4-way handshake susceptibility to offline PSK cracking. This is the single most heavily tested wireless topic on the exam. The Dimensions pattern is used rather than Ordered because the primary questions are attribute recall ("which standard uses AES", "which integrity mechanism does WPA use") rather than sequence recall.

| Standard | year | cipher | confidentiality protocol | integrity | authentication | key management | key size | security posture |
|---|---|---|---|---|---|---|---|---|
| WEP | 1997 | RC4 [s1] | WEP [s1] | CRC-32 [s1] | Shared key<br>Open [s1] | Static key [s1] | 40-bit<br>104-bit [s4] | Broken [s4] |
| WPA | 2003 | RC4 [s1] | TKIP [s1] | Michael MIC [s1] | PSK<br>802.1X/EAP [s1] | 4-way handshake [s1] | 128-bit [s1] | Deprecated |
| WPA2 | 2004 | AES [s1] | CCMP [s1] | CBC-MAC [s1] | PSK<br>802.1X/EAP [s1] | 4-way handshake [s1] | 128-bit [s1] | Current [s1] |
| WPA3 | 2018 [s2] | AES [s2] | GCMP [s2] | GMAC [s2] | SAE<br>802.1X/EAP [s2] | Dragonfly [s3] | 128-bit<br>192-bit [s2] | Current [s2] |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. **No parentheticals in cells.** Version-number suffixes (`WPA3-Personal`, `WPA3-Enterprise`) are context for the key-size Values below, not cell content.
- **Why `cipher` and `confidentiality protocol` are separate Columns.** WPA is RC4-under-TKIP; WPA2 is AES-under-CCMP; WPA3 is AES-under-GCMP. Splitting these lets the engine produce shared-Value questions at the cipher level (`? | cipher → AES` → WPA2, WPA3) and at the protocol level (both are unique per row). Collapsing into one cell as `RC4 with TKIP` would hide the shared-cipher relationship between WEP and WPA and between WPA2 and WPA3.
- **WEP `confidentiality protocol = WEP`.** The protocol and the standard share a name. This is not a data-entry error.
- **WEP key sizes.** The cell reads `40-bit` and `104-bit` — these are the *secret key* lengths. Marketing literature calls these "64-bit WEP" and "128-bit WEP" because vendors include the 24-bit IV in the quoted size. The 24-bit IV being too short is the core enabler of the Fluhrer-Mantin-Shamir attack [s4].
- **WEP integrity `CRC-32`.** CRC-32 is a checksum, not a cryptographic MAC; it is trivially forgeable. This is why the `integrity` Column exists — WEP vs WPA vs WPA2 vs WPA3 is a progression of integrity mechanisms: CRC-32 → Michael → CBC-MAC → GMAC.
- **WPA and WPA2 share `4-way handshake`.** This is the PMK-to-PTK derivation handshake defined in 802.11i. In WPA3, a Dragonfly/SAE exchange precedes a (still-present) 4-way handshake, but the defining new mechanic is SAE — so WPA3's `key management` cell reads `Dragonfly`, not `4-way handshake`.
- **WPA3 `authentication = SAE` vs `key management = Dragonfly`.** SAE (Simultaneous Authentication of Equals) is a password-authenticated key agreement method that implements the Dragonfly key exchange defined in RFC 7664 [s3]. Authentication is what SAE *does*; Dragonfly is *how* it does it. Keeping them in separate Columns makes the engine's discrimination cleaner.
- **WPA3 key sizes.** `128-bit` applies to WPA3-Personal; `192-bit` applies to WPA3-Enterprise. If future questions need to distinguish Personal vs Enterprise, split into two Rows.
- **Out of scope for this Concept:** KRACK attack (Vanhoef 2017, exploits the 4-way handshake on WPA2), Dragonblood (Vanhoef-Ronen 2019, exploits SAE in early WPA3 implementations), Evil Twin / Deauth / WPS attacks, 802.1X framework details, EAP method variants (EAP-TLS, PEAP, EAP-TTLS, EAP-FAST). Each warrants its own Concept — see the wireless-attacks proposal in the Domain 4 README.

### Tricky distractors

- **WEP is broken.** RC4 with 24-bit IV is mathematically broken. Wrong-answer pattern: recommending 128-bit WEP as "stronger" — it's still broken.
- **WPA vs WPA2 cipher.** WPA = TKIP (RC4-based retrofit). WPA2 = CCMP (AES-based). Wrong-answer pattern: claiming WPA uses AES — that's WPA2's defining upgrade.
- **WPA3 handshake.** SAE replaces the WPA2 4-way PSK handshake. Provides forward secrecy and dictionary-attack resistance. Wrong-answer pattern: claiming WPA3 uses the same handshake as WPA2.
- **Authentication framework.** Enterprise mode (WPA/WPA2/WPA3-Enterprise) uses 802.1X with EAP. Personal mode uses PSK or SAE — no 802.1X. Wrong-answer pattern: claiming 802.1X applies to all wireless modes — only Enterprise uses it.
- **Integrity per generation.** WEP = CRC-32 (forgeable). WPA = Michael MIC. WPA2 = CBC-MAC. WPA3 = GMAC. Wrong-answer pattern: assuming all use the same MAC.
- **WPA3-Personal still uses a password.** SAE is password-authenticated but is *not* a Pre-Shared Key in the WPA2 sense — SAE provides forward secrecy and resists offline dictionary attacks. Wrong-answer pattern: claiming WPA3-Personal eliminates password authentication.

### Values without a direct public citation

These cell values are drawn from standard CISSP study material or inference rather than a traced public source. They reflect widely-accepted taxonomy but should be validated by an SME or replaced with a sourced value before the Concept is treated as reference-grade.

| Cell | Value | Why unsourced |
|---|---|---|
| WEP × year | `1997` | WEP is part of the original IEEE 802.11-1997 standard; NIST SP 800-97 [s1] discusses WEP without pinning its standardization year in the sections located. |
| WPA × year | `2003` | Wi-Fi Alliance introduced WPA in 2003 as an interim answer to WEP's weaknesses pending 802.11i ratification. Widely documented in industry sources but no authoritative NIST/IEEE citation located. |
| WPA2 × year | `2004` | WPA2 / IEEE 802.11i was ratified in 2004. NIST SP 800-97 [s1] is the normative standard but the ratification year was not captured in the sections located. |
| WPA × security posture | `Deprecated` | Wi-Fi Alliance retired WPA/TKIP certification (2018) and NIST/industry guidance treats WPA as insecure against offline dictionary and re-injection attacks. No single canonical deprecation citation located. |

## Engine demo opportunities

- `WEP | cipher → ?` → `RC4`
- `? | cipher → RC4` → `WEP`, `WPA` — shared-Value select-all
- `? | cipher → AES` → `WPA2`, `WPA3` — shared-Value select-all
- `WPA3 | key management → ?` → `Dragonfly`
- `? | key management → 4-way handshake` → `WPA`, `WPA2` — shared-Value select-all
- `? | authentication → PSK` → `WPA`, `WPA2` (sub-Fact across multi-Fact cells)
- `? | authentication → 802.1X/EAP` → `WPA`, `WPA2`, `WPA3` — shared-Value across all Enterprise-capable standards
- `WEP | integrity → ?` → `CRC-32`
- `? | security posture → Current` → `WPA2`, `WPA3`
- `WEP | security posture → ?` → `Broken`
- `? | key size → 128-bit` → `WPA`, `WPA2`, `WPA3` — shared-Value select-all
- Composite Row profile: WEP across all Columns with `cipher` swapped to `AES` — tests generation-boundary recognition (WEP with AES is a nonsense combination)
- Composite Row profile: WPA2 with `confidentiality protocol` swapped to `TKIP` — tests the common WPA/WPA2 confusion directly

## Sources

- `[s1]`: NIST SP 800-97, "Establishing Wireless Robust Security Networks: A Guide to IEEE 802.11i" (February 2007, retrieved 2026-04-19, https://nvlpubs.nist.gov/nistpubs/legacy/sp/nistspecialpublication800-97.pdf)
- `[s2]`: Wi-Fi Alliance WPA3 announcement and security considerations, as summarized in "Wi-Fi Gets More Secure: Everything You Need to Know About WPA3," IEEE Spectrum (retrieved 2026-04-19, https://spectrum.ieee.org/everything-you-need-to-know-about-wpa3)
- `[s3]`: RFC 7664, "Dragonfly Key Exchange" (November 2015, retrieved 2026-04-19, https://datatracker.ietf.org/doc/html/rfc7664)
- `[s4]`: Scott Fluhrer, Itsik Mantin, and Adi Shamir, "Weaknesses in the Key Scheduling Algorithm of RC4" (2001), and Stubblefield, Ioannidis, Rubin, "Using the Fluhrer, Mantin, and Shamir Attack to Break WEP," USENIX Security 2001 (retrieved 2026-04-19, https://www.usenix.org/conference/10th-usenix-security-symposium/using-fluhrer-mantin-and-shamir-attack-break-wep)
