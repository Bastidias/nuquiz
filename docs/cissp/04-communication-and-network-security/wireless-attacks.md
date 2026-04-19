# Wireless Attacks

**Domain:** 4 — Communication and Network Security &nbsp;|&nbsp; **Pattern:** Dimensions &nbsp;|&nbsp; **Tags:** 4.2
**Status:** draft (SME review pending)

The six wireless-specific attack classes CISSP candidates should discriminate: rogue AP (Evil Twin), deauthentication flooding, WPS PIN brute force, the three flagship cryptographic attacks against each WPA generation (WEP-FMS, KRACK on WPA2, Dragonblood on WPA3). Rows pair cleanly with the four generations in the `wireless-standards` Concept — together the two Concepts cover which standards are vulnerable to which attack. Wired network attacks (SYN flood, Smurf, ARP poisoning, DNS cache poisoning, session hijacking, MITM) belong in `network-attacks`.

| Attack | targets | OSI layer | CIA target | exploits | technique | primary mitigation |
|---|---|---|---|---|---|---|
| Evil Twin | Any | Data Link<br>Physical | Confidentiality | SSID-based client auto-connect | Cloned SSID broadcast | Mutual authentication |
| Deauthentication attack | WEP<br>WPA<br>WPA2 [s1] | Data Link [s1] | Availability [s1] | Unprotected management frames [s1] | Spoofed deauth frame [s1] | 802.11w PMF |
| WPS PIN brute force | WPA<br>WPA2 [s4] | Data Link | Authentication [s4] | 8-digit WPS PIN [s4] | Online PIN brute force [s4] | Disable WPS [s4] |
| KRACK | WPA<br>WPA2 [s2] | Data Link [s2] | Confidentiality<br>Integrity [s2] | Message 3 retransmission [s2] | Key reinstallation [s2] | Vendor patch [s2] |
| Dragonblood | WPA3 [s3] | Data Link [s3] | Confidentiality<br>Authentication [s3] | SAE side channel [s3] | Offline dictionary recovery<br>WPA3-to-WPA2 downgrade [s3] | Vendor patch [s3] |
| WEP cracking | WEP [s5] | Data Link [s5] | Confidentiality<br>Authentication [s5] | Weak RC4 IV<br>24-bit IV space [s5] | Keystream recovery [s5] | Abandon WEP |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. **No parentheticals in cells.** Attack names (KRACK, Dragonblood, WPS) are treated as atomic identifiers.
- **Evil Twin `targets = Any`.** Rogue-AP attacks don't care about the underlying crypto — they exploit the fact that clients auto-connect to the strongest signal matching a known SSID. A WPA3 client is still vulnerable if the attacker can convince it to associate with the rogue AP (for example by first running a deauth attack to force re-association). The cryptographic standards make SAE and authentication harder to downgrade, but the *reachability* of the attack is universal.
- **Deauthentication attack and WPA3.** WPA3 mandates 802.11w Protected Management Frames (PMF), which cryptographically protect deauth frames — so deauth attacks that work against WEP/WPA/WPA2 networks (where management frames are unprotected by default) are blocked against a fully-deployed WPA3 network. The cell lists the three legacy generations; WPA3 is excluded because of PMF.
- **Deauth as an Evil Twin enabler.** Deauth frames are frequently used as the *kick* step in an Evil Twin flow — deauth the client from the legitimate AP, then watch it associate with the rogue AP's stronger signal. The two attacks are independently named in this Concept because they are also tested independently, but the combined flow is the canonical wireless MITM pattern.
- **WPS PIN brute force — why 8 digits reduce to ~11,000 guesses.** The WPS PIN is 8 digits, but the protocol verifies the first 4 digits and the next 3 separately (the 8th digit is a checksum). This splits the search space from 10^8 to 10^4 + 10^3 = ~11,000 guesses. CISA issued a public alert about this in 2012 [s4]. The mitigation is not stronger PIN checking — it's disabling WPS entirely.
- **KRACK affects WPA and WPA2.** The key-reinstallation vulnerability is in the 4-way handshake defined by 802.11i, so it affects any standard that uses that handshake — WPA and WPA2. WPA3 uses SAE instead and is not vulnerable to the specific KRACK nonce-reuse flaw. The attack is against the protocol standard itself, so every correctly-conforming implementation was vulnerable until patched.
- **Dragonblood decomposes into two attack classes.** The Vanhoef-Ronen 2019 research [s3] distinguishes (1) downgrade attacks against WPA3 transition-mode networks (tricking a client into WPA2 association so KRACK-style attacks apply) and (2) weaknesses in the Dragonfly/SAE handshake itself (timing and cache side channels leaking password information). The cell's `technique` carries both because both are in scope for CISSP framing.
- **WEP `primary mitigation = Abandon WEP`.** WEP's weakness is structural — 24-bit IVs with RC4 guarantee key recovery given enough traffic. No patch fixes WEP. The mitigation is replacement, not tuning.
- **Out of scope for this Concept:** BlueBorne / Bluetooth attacks, Zigbee / Z-Wave attacks, IoT protocol attacks, RFID / NFC cloning, cellular (IMSI catchers / Stingrays), wireless jamming at the Physical layer (spectrum-level, not frame-level). Each deserves its own Concept. Also out of scope: the specific CVE numbers for KRACK and Dragonblood — cited inline in Notes but not exploded as Rows.

### Values without a direct public citation

| Cell | Value | Why unsourced |
|---|---|---|
| Evil Twin × all cells | — | Evil Twin is a widely-documented pattern across industry resources but not defined by a single canonical RFC or NIST document. Cells reflect consensus pedagogical framing. |
| Deauthentication × primary mitigation | `802.11w PMF` | 802.11w-2009 Protected Management Frames is the canonical mitigation. No single citation captured in this research pass; IEEE 802.11w standard is the authoritative source. |
| WPS × OSI layer | `Data Link` | WPS operates at the 802.11 association layer. CISA alert [s4] focuses on the vulnerability rather than the OSI pinning. |
| WEP cracking × primary mitigation | `Abandon WEP` | Universal CISSP teaching; no "abandonment" recommendation captured as a direct quote in the FMS paper or wireless-standards guidance located. |

## Engine demo opportunities

- `KRACK | targets → ?` → `WPA`, `WPA2`
- `Dragonblood | targets → ?` → `WPA3`
- `WEP cracking | targets → ?` → `WEP`
- `? | targets → WPA2` → `Deauthentication attack`, `WPS PIN brute force`, `KRACK` — shared-Value select-all across multi-Fact cells
- `? | CIA target → Availability` → `Deauthentication attack`
- `? | CIA target → Confidentiality` → `Evil Twin`, `KRACK`, `Dragonblood`, `WEP cracking` — shared-Value select-all
- `? | primary mitigation → Vendor patch` → `KRACK`, `Dragonblood` — shared-Value select-all
- `KRACK | technique → ?` → `Key reinstallation`
- `Dragonblood | exploits → ?` → `SAE side channel`
- `? | exploits → Message 3 retransmission` → `KRACK`
- Composite KRACK Row with `targets` swapped to `WPA3` — tests the common confusion (KRACK does *not* affect WPA3)
- Composite Dragonblood Row with `targets` swapped to `WPA2` — tests the inverse confusion (Dragonblood is *WPA3-specific*)
- Composite WEP cracking Row with `primary mitigation` swapped to `Vendor patch` — tests the "no patch fixes WEP" point

## Sources

- `[s1]`: John Bellardo and Stefan Savage, "802.11 Denial-of-Service Attacks: Real Vulnerabilities and Practical Solutions," USENIX Security Symposium 2003 — primary academic source for the deauthentication-frame attack and unprotected-management-frame exploitation (retrieved 2026-04-19, https://www.usenix.org/legacy/event/sec03/tech/full_papers/bellardo/bellardo.pdf)
- `[s2]`: Mathy Vanhoef and Frank Piessens, "Key Reinstallation Attacks: Forcing Nonce Reuse in WPA2," ACM CCS 2017; summary at krackattacks.com (retrieved 2026-04-19, https://www.krackattacks.com/ and https://papers.mathyvanhoef.com/ccs2017.pdf)
- `[s3]`: Mathy Vanhoef and Eyal Ronen, "Dragonblood: Analyzing the Dragonfly Handshake of WPA3 and EAP-pwd," IEEE S&P 2020 (retrieved 2026-04-19, https://wpa3.mathyvanhoef.com/ and https://papers.mathyvanhoef.com/dragonblood.pdf)
- `[s4]`: CISA Alert, "Wi-Fi Protected Setup (WPS) Vulnerable to Brute-Force Attack" (January 2012, retrieved 2026-04-19, https://www.cisa.gov/news-events/alerts/2012/01/06/wi-fi-protected-setup-wps-vulnerable-brute-force-attack)
- `[s5]`: Scott Fluhrer, Itsik Mantin, and Adi Shamir, "Weaknesses in the Key Scheduling Algorithm of RC4" (2001), and Stubblefield, Ioannidis, Rubin, "Using the Fluhrer, Mantin, and Shamir Attack to Break WEP," USENIX Security 2001 (retrieved 2026-04-19, https://www.usenix.org/conference/10th-usenix-security-symposium/using-fluhrer-mantin-and-shamir-attack-break-wep)
