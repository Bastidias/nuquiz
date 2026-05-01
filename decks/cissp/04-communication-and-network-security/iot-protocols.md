# IoT Protocols

**Domain:** 4 — Communication and Network Security &nbsp;|&nbsp; **Pattern:** Dimensions &nbsp;|&nbsp; **Tags:** 4.1, 4.3
**Status:** draft (SME review pending)

Common IoT communication protocols span very different stack layers — from sub-GHz RF link standards (Z-Wave, LoRaWAN) and 2.4 GHz PAN radios (Zigbee, BLE) to a pure application-layer broker protocol (MQTT). CISSP testing rewards being able to place each one on the OSI stack, recall its native encryption posture, and recognize which threat models apply (RF sniffing and replay against mesh radios; long-range eavesdropping against LoRaWAN; broker exposure and missing TLS against MQTT). The Dimensions pattern fits because the canonical exam questions are attribute recall ("which protocol uses AES-128", "which is broker-based") rather than a sequence.

| Protocol | layer | RF band | typical range | encryption | authentication | common attacks / use cases |
|---|---|---|---|---|---|---|
| Zigbee | Network<br>Application [s1] | 2.4 GHz [s2] | 10-100 m [s2] | AES-128-CCM* [s1] | Network key<br>Link key [s1] | Key sniffing [s8]<br>Replay [s8] |
| Z-Wave | Network [s3] | 908 MHz<br>868 MHz [s3] | 100 m [s3] | AES-128 [s3] | S2 framework<br>ECDH [s3] | Smart-home mesh |
| BLE | Link<br>Application [s4] | 2.4 GHz [s4] | 10-50 m [s4] | AES-128-CCM [s4] | LE Secure Connections<br>ECDH P-256 [s4] | KNOB [s9]<br>BIAS [s9] |
| LoRaWAN | MAC<br>Network [s5] | 868 MHz<br>915 MHz [s5] | 2-15 km [s5] | AES-128 [s5] | NwkSKey<br>AppSKey [s5] | Long-range telemetry |
| MQTT | Application [s6] | None | None | TLS [s6] | Username/password<br>Client certificate [s6] | Exposed brokers [s10]<br>Topic injection [s10] |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. **No parentheticals in cells.** Context that would otherwise live in parens is moved to these Notes.
- **Why Rows mix link-layer radios with an application protocol.** Zigbee, Z-Wave, BLE, and LoRaWAN each define their own RF and network behavior. MQTT is purely an OSI Layer 7 protocol that runs over TCP (typically TLS-secured). Including MQTT in the same Concept reflects how the CISSP exam groups these — "IoT protocols" — not a claim that they are peers on the stack. The `RF band`, `typical range`, and `encryption` Columns read `None` for MQTT because they are link-layer attributes that don't apply to a broker protocol.
- **Zigbee `layer = Network, Application`.** Zigbee builds its own Network (NWK) and Application (APS) layers on top of IEEE 802.15.4's PHY/MAC [s1]. Zigbee security operates at the NWK layer with optional APS-layer encryption.
- **Zigbee encryption `AES-128-CCM*`.** The `*` denotes the modified CCM mode used by Zigbee/802.15.4 (CCM* allows encryption-only and integrity-only operating points in addition to authenticated encryption) [s1]. Sometimes written `AES-CCM` in CISSP material.
- **Zigbee `Network key` vs `Link key`.** Network key is shared by all devices in the Zigbee network and protects NWK-layer frames. Link key is a pairwise key between two devices and protects APS-layer payloads [s1]. Both are AES-128 keys.
- **Zigbee default link key `ZigbeeAlliance09`.** Well-known fallback key used to encrypt the network-key delivery during joining. Capturing the join exchange and decrypting with this default key is the classical Zigbee key-extraction attack [s8].
- **Z-Wave `RF band = 908 MHz, 868 MHz`.** 908.4/916 MHz in North America, 868.4 MHz in Europe; other regional bands exist [s3]. Always sub-GHz, never 2.4 GHz — this is the most common Z-Wave-vs-Zigbee discriminator on the exam.
- **Z-Wave `range = 100 m`.** Direct point-to-point figure quoted by Silicon Labs for the 700-series chip [s3]; mesh-extended range across multiple hops is larger. Mesh-extension is captured by `range` being a per-hop figure, not a network diameter.
- **Z-Wave `S2 framework` and `ECDH`.** S2 is the Z-Wave Plus security framework; it uses Elliptic-Curve Diffie-Hellman with an out-of-band PIN/QR for the inclusion (pairing) step and AES-128-CCM for data [s3]. Older S0 security used a hard-coded all-zero temporary key during inclusion and is considered weak.
- **BLE `layer = Link, Application`.** BLE Link Layer encryption uses AES-128-CCM under a Long-Term Key (LTK) [s4]; application-layer signing uses the Connection Signature Resolving Key (CSRK). The LE Secure Connections pairing model (mandatory in Bluetooth 5+ certification) generates the LTK via ECDH P-256 [s4].
- **BLE vs Bluetooth Classic.** BLE is a separate radio stack from Bluetooth BR/EDR (Classic), introduced in Bluetooth 4.0. BLE has its own pairing methods and security modes; CISSP questions frequently test the BLE-specific term "LE Secure Connections" against the Classic-Bluetooth term "Secure Simple Pairing." The Row in this table is BLE only.
- **BLE attacks `KNOB`, `BIAS`.** KNOB (CVE-2019-9506) downgrades the negotiated key entropy to 7 bytes for BLE long-term keys [s9]. BIAS is a Bluetooth impersonation attack that exploits weaknesses in Legacy Secure Connections authentication [s9]. BlueBorne (2017) is more often associated with Bluetooth Classic stacks but also implicates BLE in some products; left out of the cell to keep the BLE-specific posture sharp.
- **LoRaWAN `layer = MAC, Network`.** LoRaWAN is the MAC + Network layer specification of the LoRa Alliance; the underlying RF modulation (LoRa chirp spread spectrum) is the physical layer below it [s5].
- **LoRaWAN `range = 2-15 km`.** 2-5 km is the typical urban figure; 10-15 km is typical rural with line of sight; ideal LOS deployments report 50 km [s5]. The cell captures the typical operational band.
- **LoRaWAN `NwkSKey`, `AppSKey`.** Both are AES-128 session keys derived from the device's AppKey root during the OTAA join procedure [s5]. NwkSKey protects MAC-layer integrity and MAC-command payloads; AppSKey provides end-to-end application-payload confidentiality between the end device and the application server. Two-key separation is a heavily-tested LoRaWAN exam point.
- **MQTT `layer = Application`.** MQTT is a publish/subscribe messaging protocol defined by OASIS; it runs over TCP on port 1883 (cleartext) or 8883 (TLS) [s6]. It is not a transport — TLS is the transport-security mechanism, not part of MQTT itself.
- **MQTT `encryption = TLS`.** MQTT itself does not encrypt payloads. Confidentiality relies entirely on the underlying TLS connection [s6]. The default port (1883) is unencrypted; the secured port (8883) is MQTT-over-TLS.
- **MQTT `authentication = Username/password, Client certificate`.** CONNECT packet supports a username/password field; mutual-TLS with client certificates is the stronger production option [s6]. Anonymous-allowed brokers (no auth) are the dominant misconfiguration found by Shodan-based surveys [s10].
- **MQTT `Exposed brokers`, `Topic injection`.** "Exposed brokers" refers to internet-reachable brokers with no authentication or with default credentials — Shodan indexes hundreds of thousands of these [s10]. "Topic injection" refers to publishing to topics outside one's intended scope when ACLs are absent. Both are configuration failures, not protocol weaknesses, but they are the dominant real-world MQTT incidents.
- **NIST IoT baseline gaps.** NIST IR 8259A defines a Core Baseline of device cybersecurity capabilities (device identification, configuration, data protection, logical access, software update, cybersecurity state awareness) [s7]. Many fielded devices on the protocols above (especially Zigbee and Z-Wave consumer hubs) do not meet the baseline — e.g., no per-device unique identifier in S0-only Z-Wave installs, no remote update path on cheap Zigbee endpoints. Treat the baseline as an authoritative checklist for the exam, not as a property of any specific Row.
- **Out of scope for this Concept:** Thread / Matter (newer 802.15.4-based standards layered with IPv6/UDP), 6LoWPAN, CoAP (the constrained-device REST analogue), Sigfox, NB-IoT and LTE-M cellular IoT, Wi-Fi HaLow (802.11ah). Each warrants its own Concept once the exam-scope priority is confirmed.

### Tricky distractors

- **Z-Wave is sub-GHz; Zigbee is 2.4 GHz.** Most-tested discriminator. Wrong-answer pattern: swapping the bands.
- **MQTT relies on TLS for encryption.** Protocol itself doesn't encrypt. Wrong-answer pattern: claiming MQTT has built-in encryption — only via TLS.
- **MQTT default port 1883 is unencrypted.** 8883 is TLS. Wrong-answer pattern: assuming default MQTT is secure — exposed brokers are a major attack vector.
- **LoRaWAN has two session keys.** NwkSKey + AppSKey. Wrong-answer pattern: claiming one key — separation is a heavily-tested point.
- **BLE LE Secure Connections uses ECDH P-256.** Bluetooth 5+. Wrong-answer pattern: claiming legacy pairing is current — KNOB and BIAS exploit legacy.
- **Z-Wave S0 uses hard-coded all-zero key during inclusion.** S2 fixed this with ECDH. Wrong-answer pattern: claiming all Z-Wave is equally secure — S0 vs S2 differ.

### Values without a direct public citation

These cell values are drawn from standard CISSP study material or inference rather than a traced public source. They reflect widely-accepted taxonomy but should be validated by an SME or replaced with a sourced value before the Concept is treated as reference-grade.

| Cell | Value | Why unsourced |
|---|---|---|
| Z-Wave × layer | `Network` | The Z-Wave specification is proprietary to the Z-Wave Alliance; no NIST or RFC source places Z-Wave on a specific OSI layer. CISSP curriculum treats it as a Network-layer mesh protocol. |
| Z-Wave × common attacks / use cases | `Smart-home mesh` | Use-case label rather than an attack. No single primary citation; reflects standard CISSP teaching that Z-Wave's deployment niche is residential smart-home mesh. |
| LoRaWAN × common attacks / use cases | `Long-range telemetry` | Use-case label. No single primary citation; reflects standard CISSP teaching that LoRaWAN's deployment niche is low-bandwidth long-range telemetry (utility metering, agriculture, asset tracking). |
| MQTT × RF band, typical range | `None` | These attributes do not apply to a Layer-7 broker protocol; `None` is an authoring convention, not a sourced value. |
| MQTT × encryption | `TLS` | OASIS [s6] specifies TLS as the security mechanism; "encryption" being TLS rather than a named cipher is a definitional choice — TLS negotiates ciphers (AES-GCM in modern deployments) but the protocol-level answer is "TLS." |
| BLE × typical range | `10-50 m` | Bluetooth SIG documentation gives a wide range of figures depending on transmit-power class and Bluetooth version; the 10-50 m cell value is the conservative typical-deployment figure widely used in CISSP material [s4]. |

## Engine demo opportunities

- `Zigbee | RF band → ?` → `2.4 GHz`
- `Z-Wave | RF band → ?` → `908 MHz`, `868 MHz` (multi-Fact cell)
- `? | RF band → 2.4 GHz` → `Zigbee`, `BLE` — shared-Value select-all
- `? | encryption → AES-128` → `Z-Wave`, `LoRaWAN` — shared-Value select-all (sole-Fact cells)
- `? | encryption → AES-128-CCM*` → `Zigbee` (sole-match — CCM* is Zigbee-specific)
- `? | encryption → AES-128-CCM` → `BLE` (sole-match — distinguishes from CCM* without the asterisk)
- `LoRaWAN | authentication → ?` → `NwkSKey`, `AppSKey` (multi-Fact cell)
- `? | authentication → ECDH P-256` → `BLE` (sole-Fact)
- `MQTT | layer → ?` → `Application`
- `? | layer → Application` → `Zigbee`, `BLE`, `MQTT` — shared-Value select-all across multi-Fact cells
- `? | typical range → 10-100 m` → `Zigbee` vs `BLE` (10-50 m) — distractor close-but-different
- `? | common attacks / use cases → Replay` → `Zigbee` (sub-Fact in multi-Fact cell)
- Composite Row profile: Zigbee with `RF band` swapped to `908 MHz` — tests the canonical Zigbee-vs-Z-Wave band confusion
- Composite Row profile: MQTT with `encryption` swapped to `AES-128` — tests recognition that MQTT does not specify a cipher, only TLS

## Sources

- `[s1]`: Connectivity Standards Alliance / Silicon Labs Zigbee security documentation, "Zigbee Security" (Silicon Labs application note AN1233, retrieved 2026-04-26, https://www.silabs.com/documents/public/application-notes/an1233-zigbee-security.pdf)
- `[s2]`: Zigbee technical overview (Wikipedia, citing IEEE 802.15.4 and CSA documentation, retrieved 2026-04-26, https://en.wikipedia.org/wiki/Zigbee)
- `[s3]`: Silicon Labs, "Z-Wave Security" white paper, and Z-Wave Alliance security framework page (retrieved 2026-04-26, https://www.silabs.com/whitepapers/z-wave-security and https://www.silabs.com/wireless/z-wave/specification/security)
- `[s4]`: NIST SP 800-121 Rev 2, "Guide to Bluetooth Security" (May 2017, retrieved 2026-04-26, https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-121r2.pdf), supplemented by Bluetooth SIG public documentation on BLE pairing and LE Secure Connections.
- `[s5]`: LoRa Alliance, "LoRaWAN 1.0.3 Specification" and Semtech / The Things Network developer documentation on OTAA, NwkSKey, and AppSKey (retrieved 2026-04-26, https://lora-alliance.org/wp-content/uploads/2020/11/lorawan1.0.3.pdf and https://www.thethingsnetwork.org/docs/lorawan/security/)
- `[s6]`: OASIS, "MQTT Version 5.0" specification (March 2019, retrieved 2026-04-26, https://docs.oasis-open.org/mqtt/mqtt/v5.0/mqtt-v5.0.html)
- `[s7]`: NIST IR 8259A, "IoT Device Cybersecurity Capability Core Baseline" (May 2020, retrieved 2026-04-26, https://csrc.nist.gov/pubs/ir/8259/a/final), and NIST SP 800-213, "IoT Device Cybersecurity Guidance for the Federal Government" (November 2021, retrieved 2026-04-26, https://csrc.nist.gov/pubs/sp/800/213/final)
- `[s8]`: Kaspersky Securelist, "Zigbee protocol security assessment" (retrieved 2026-04-26, https://securelist.com/zigbee-protocol-security-assessment/118373/), and Vaccari et al., research on Zigbee replay and key-extraction attacks (retrieved 2026-04-26, https://par.nsf.gov/servlets/purl/10215772)
- `[s9]`: Antonioli, Tippenhauer, Rasmussen, "Key Negotiation Downgrade Attacks on Bluetooth and Bluetooth Low Energy" (KNOB), ACM TOPS 2020, and "BIAS: Bluetooth Impersonation AttackS" (retrieved 2026-04-26, https://knobattack.com/ and https://francozappa.github.io/publication/knob-ble/paper.pdf)
- `[s10]`: Avast, "At least 32,000 smart homes and businesses at risk of leaking data" (MQTT exposure analysis, retrieved 2026-04-26, https://blog.avast.com/mqtt-vulnerabilities-hacking-smart-homes), and TXOne Networks, "Potential risks of exposed MQTT brokers" (retrieved 2026-04-26, https://www.txone.com/blog/mqtt-series-2-potential-risks-of-exposed-mqtt-brokers/)
