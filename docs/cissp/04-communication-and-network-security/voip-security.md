# VoIP Security

**Domain:** 4 — Communication and Network Security &nbsp;|&nbsp; **Pattern:** Dimensions &nbsp;|&nbsp; **Tags:** 4.1, 4.3
**Status:** draft (SME review pending)

VoIP splits voice traffic into a signaling plane (call setup, modification, teardown) and a media plane (the encoded audio itself), with separate protocols and separate attack surfaces for each. CISSP testing expects candidates to discriminate the two planes, name the encryption profile and key-agreement mechanism that protects each, and recognize the canonical SIP-targeted attacks. Rows mix four protocol entities (SIP, RTP, SRTP, ZRTP) with two attack entities (SIP registration hijacking, toll fraud) so the table can be read either way: protocol-vs-protocol or protocol-vs-the-attack-it-enables.

| Entity | type | OSI layer | function or mechanism | native encryption | key management | common attack or mitigation |
|---|---|---|---|---|---|---|
| SIP | Signaling protocol [s1] | Application [s1] | Session creation<br>Session modification<br>Session termination [s1] | None [s1] | N/A | SIP registration hijacking [s5] |
| RTP | Media transport protocol [s2] | Application [s2] | Payload type identification<br>Sequence numbering<br>Timestamping<br>Delivery monitoring [s2] | None [s2] | N/A | Eavesdropping |
| SRTP | Media security profile [s3] | Application [s3] | Confidentiality<br>Message authentication<br>Replay protection [s3] | AES Counter Mode [s3] | External [s3] | Eavesdropping |
| ZRTP | Key agreement protocol [s4] | Application [s4] | Diffie-Hellman key exchange<br>Short Authentication String verification [s4] | None | Diffie-Hellman on media path [s4] | Man-in-the-middle |
| SIP registration hijacking | Attack [s5] | Application [s5] | Forged REGISTER request [s5] | N/A | N/A | TLS with mutual authentication [s5] |
| Toll fraud | Attack [s6] | Application [s6] | Unauthorized outbound call routing [s6] | N/A | N/A | Strong authentication<br>Call-detail monitoring [s6] |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. **No parentheticals in cells.** Any context stripped from cells lives below.
- **Two planes, two protocols.** SIP carries signaling (who is calling whom, on what codec); RTP carries the encoded media itself. The two run on separate UDP streams negotiated during SIP session setup. Compromise of either plane is independent: an attacker who can tamper with SIP can hijack call setup without ever touching media; an attacker who can sniff RTP can record the call without touching signaling.
- **`OSI layer = Application` for all six rows.** SIP, RTP, and ZRTP are all explicitly Layer 7 in their RFCs [s1][s2][s4]. SRTP, as a profile of RTP, inherits Layer 7 [s3]. The two attack Rows operate at Layer 7 because that is the layer of the protocol they target. The repetition is correct — discrimination in this Concept is not by OSI layer but by function and security posture.
- **SRTP `native encryption = AES Counter Mode`.** RFC 3711 designates "AES running in Segmented Integer Counter Mode" as the mandatory default cipher [s3]. AES-f8 is also defined as an alternative, and a NULL cipher is permitted when only authentication is required. The cell records the mandatory default.
- **SRTP `key management = External`.** RFC 3711 deliberately does not define a key-exchange mechanism — it consumes a master key established by an external protocol [s3]. Common external mechanisms: MIKEY (RFC 3830), SDES (RFC 4568, in-band SDP), DTLS-SRTP (RFC 5764), and ZRTP (RFC 6189). This is the central SRTP-vs-ZRTP discriminator: SRTP protects media but is silent on how keys arrive; ZRTP performs the key exchange that SRTP then consumes.
- **ZRTP `native encryption = None`.** ZRTP itself does not encrypt media — it produces the master key that SRTP then uses for media protection [s4]. The cell value reflects this honestly: ZRTP is a *key-agreement* protocol, not a media-encryption protocol. Conflating the two is a common CISSP distractor.
- **ZRTP key agreement is on the media path.** Unlike MIKEY or SDES, which ride inside SIP signaling, ZRTP sends its Diffie-Hellman exchange in-band on the RTP media stream itself [s4]. This is the architectural property that makes ZRTP independent of signaling-plane trust — even if the SIP path is fully compromised, ZRTP can still establish a confidential media channel.
- **Short Authentication Strings (SAS).** ZRTP defends against MITM by displaying a short string at both endpoints that the users read aloud and compare. A 16-bit SAS gives an MITM attacker a 1-in-65,536 chance of evading detection [s4]. SAS is the human-in-the-loop endpoint-authentication step; without it, ZRTP has confidentiality but not authentication.
- **SIP registration hijacking mechanism.** SIP REGISTER requests are sent in clear text by default, often over UDP, and RFC 3261 only RECOMMENDS that registrars challenge them [s5]. An attacker who can spoof or replace a victim's REGISTER causes the registrar to map the victim's AOR (address-of-record) to the attacker's contact URI — all subsequent inbound calls are routed to the attacker. The canonical mitigation in modern deployments is TLS with mutual certificate authentication [s5], which both encrypts the registration and proves device identity.
- **Toll fraud is the financial-loss VoIP attack.** An attacker who compromises a PBX, gateway, or SIP trunk credentials uses the victim's outbound call capacity to place premium-rate or international calls — the bill goes to the victim, the revenue to the attacker (often via a partnered premium-rate number) [s6]. Mitigation is account-level: strong credentials, restricted dial plans, anomaly detection on call-detail records, and rate-limiting outbound calls per extension.
- **Out of scope for this Concept:** H.323 (alternative signaling protocol, less commonly tested today), MGCP/H.248 (gateway control protocols), SDP (session description format used inside SIP), session border controllers (SBCs — covered in network-architecture Concepts), vishing and SPIT (social-engineering attacks that ride on top of VoIP rather than exploit VoIP protocols), DTMF tones and fax-over-IP (T.38), QoS and codec selection, lawful-intercept requirements.

### Tricky distractors

- **SIP vs RTP role confusion.** SIP is *signaling only* — it does not carry voice. RTP is *media only* — it does not establish calls. A question that says "SIP carries the voice payload" is wrong; a question that says "RTP negotiates the call" is wrong. The two are complementary, not interchangeable.
- **SRTP vs ZRTP key-agreement difference.** SRTP encrypts media but does *not* perform key exchange — it consumes a key delivered by some external mechanism [s3]. ZRTP performs the key exchange but does *not* encrypt media — it hands the resulting key to SRTP, which then encrypts [s4]. A question that says "ZRTP encrypts RTP traffic" is technically wrong (SRTP does); a question that says "SRTP performs Diffie-Hellman key agreement" is wrong (ZRTP, MIKEY, SDES, or DTLS-SRTP does).
- **Signaling-plane vs media-plane attacks.** SIP registration hijacking targets the signaling plane (REGISTER messages); RTP eavesdropping and SRTP replay attacks target the media plane. Mitigations do not cross planes — TLS on SIP does not encrypt RTP, and SRTP on RTP does not authenticate REGISTER requests. CISSP distractors regularly pair a signaling-plane attack with a media-plane mitigation, or vice versa.
- **ZRTP and PKI.** ZRTP explicitly does *not* require a PKI [s4] — that is part of its design intent. A distractor that says "ZRTP requires X.509 certificates from a trusted CA" is wrong; ZRTP relies on the SAS read-aloud step plus key continuity for endpoint authentication.
- **Toll fraud is not eavesdropping.** Toll fraud is an *availability/financial* attack on outbound call capacity, not a confidentiality attack on call content. A distractor that lists "encryption" as the primary mitigation for toll fraud is wrong — encryption protects call content but does nothing about authenticated-but-malicious outbound dialing.

### Values without a direct public citation

| Cell | Value | Why unsourced |
|---|---|---|
| RTP × common attack | `Eavesdropping` | Universal CISSP framing — unencrypted RTP is trivially recordable with any packet capture tool. No single canonical public citation located. |
| SRTP × common attack | `Eavesdropping` | Listed because pre-shared-key SRTP without forward secrecy is vulnerable to retroactive decryption if the master key is later disclosed; the attack is on the key-management surface, not on AES-CTR itself. CISSP framing rather than a traced primary source. |
| ZRTP × common attack | `Man-in-the-middle` | The attack ZRTP is *designed* to defend against; included as the relevant adversary. RFC 6189 [s4] discusses MITM extensively but does not phrase it as ZRTP's "common attack." |
| ZRTP × native encryption | `None` | Inferred from RFC 6189 [s4] description of ZRTP as a key-agreement protocol; ZRTP itself does not encrypt media payload — SRTP does. The RFC does not phrase this as `native encryption = None`. |
| SIP registration hijacking × all cells | — | Row values draw on academic surveys [s5] and SIP RFC 3261 §26 security considerations rather than a single canonical primary citation. |
| Toll fraud × all cells | — | Row values reflect NIST SP 800-58 [s6] coverage and standard CISSP teaching; the specific Fact decomposition is editorial. |

## Engine demo opportunities

- `SIP | type → ?` → `Signaling protocol`
- `RTP | type → ?` → `Media transport protocol`
- `SRTP | native encryption → ?` → `AES Counter Mode`
- `ZRTP | key management → ?` → `Diffie-Hellman on media path`
- `? | native encryption → None` → `SIP`, `RTP`, `ZRTP` — shared-Value select-all (the three protocols that do not encrypt; SRTP is the only encrypting Row)
- `? | OSI layer → Application` → `SIP`, `RTP`, `SRTP`, `ZRTP`, `SIP registration hijacking`, `Toll fraud` — shared-Value select-all across every Row (demonstrates that OSI layer is not a discriminator in this Concept)
- `? | function or mechanism → Diffie-Hellman key exchange` → `ZRTP` — sole-Fact in a multi-Fact cell
- `SIP registration hijacking | common attack or mitigation → ?` → `TLS with mutual authentication`
- `Toll fraud | common attack or mitigation → ?` → `Strong authentication`, `Call-detail monitoring` (multi-Fact cell)
- Composite SRTP Row with `key management` swapped to `Diffie-Hellman on media path` — tests the SRTP-vs-ZRTP discriminator (SRTP relies on external key management; ZRTP performs the DH itself)
- Composite ZRTP Row with `native encryption` swapped to `AES Counter Mode` — tests the conflation distractor (ZRTP does not encrypt media; SRTP does)
- Composite SIP Row with `function or mechanism` swapped to `Payload type identification` — tests the SIP-vs-RTP role distinction (signaling does not carry payload)

## Sources

- `[s1]`: RFC 3261, "SIP: Session Initiation Protocol" §1 Introduction (June 2002, retrieved 2026-04-26, https://datatracker.ietf.org/doc/html/rfc3261)
- `[s2]`: RFC 3550, "RTP: A Transport Protocol for Real-Time Applications" §1 Introduction (July 2003, retrieved 2026-04-26, https://datatracker.ietf.org/doc/html/rfc3550)
- `[s3]`: RFC 3711, "The Secure Real-time Transport Protocol (SRTP)" §1 Introduction and §4 Pre-Defined Cryptographic Transforms (March 2004, retrieved 2026-04-26, https://datatracker.ietf.org/doc/html/rfc3711)
- `[s4]`: RFC 6189, "ZRTP: Media Path Key Agreement for Unicast Secure RTP" §1 Introduction and §4 Protocol Description (April 2011, retrieved 2026-04-26, https://datatracker.ietf.org/doc/html/rfc6189)
- `[s5]`: Hosseinpour et al., "A survey on registration hijacking attack consequences and protection for Session Initiation Protocol (SIP)" — Computer Networks (2020), summarizing RFC 3261 §26 weaknesses (retrieved 2026-04-26, https://www.sciencedirect.com/science/article/abs/pii/S1389128619312332)
- `[s6]`: NIST SP 800-58, "Security Considerations for Voice Over IP Systems" §§ on toll fraud and PBX abuse (January 2005, retrieved 2026-04-26, https://csrc.nist.gov/pubs/sp/800/58/final)
