# Cellular Generations

**Domain:** 4 — Communication and Network Security &nbsp;|&nbsp; **Pattern:** Dimensions &nbsp;|&nbsp; **Tags:** 4.1
**Status:** draft (SME review pending)

The four 3GPP cellular generations as a security progression. Each generation specifically remediates a defect in its predecessor: 2G's one-way authentication and weak A5/1 cipher gave way to 3G's mutual AKA with KASUMI; 3G's 64-bit cipher gave way to 4G's AES/SNOW-3G/ZUC family at 128-bit; 4G's persistent IMSI exposure on the radio link gave way to 5G's SUCI / public-key concealment of the subscriber identity. CISSP testing focuses on what changed between generations and on the named attacks (IMSI catchers, downgrade attacks). The Dimensions pattern is used because the dominant questions are attribute recall ("which generation introduced mutual authentication", "which cipher does LTE use") rather than sequence recall.

| Generation | year introduced | encryption algorithm | authentication mechanism | signaling protocol | known attacks |
|---|---|---|---|---|---|
| 2G (GSM) | 1991 [s5] | A5/1<br>A5/3 [s1] | A3/A8<br>COMP128 [s1] | SS7<br>MAP [s7] | IMSI catcher [s6]<br>A5/1 rainbow-table cracking [s8]<br>One-way authentication [s1] |
| 3G (UMTS) | 2001 [s9] | KASUMI [s2] | UMTS-AKA<br>MILENAGE [s2] | SS7<br>MAP<br>Diameter [s7] | IMSI catcher [s6]<br>Downgrade to 2G [s6] |
| 4G (LTE) | 2009 [s9] | SNOW 3G<br>AES<br>ZUC [s3] | EPS-AKA<br>MILENAGE [s3] | Diameter<br>S1AP<br>NAS [s3] | IMSI catcher [s4]<br>Location leak [s4]<br>Targeted DoS [s4]<br>Downgrade to 2G [s6] |
| 5G (NR) | 2019 [s10] | SNOW 3G<br>AES<br>ZUC [s5] | 5G-AKA<br>EAP-AKA' [s5] | HTTP/2<br>SBA [s5] | SUCI catcher [s6]<br>Linkability [s5]<br>Downgrade to 4G [s6] |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. **No parentheticals in cells.** Generation-name suffixes (`(GSM)`, `(UMTS)`, `(LTE)`, `(NR)`) are part of the canonical Row identifier as it appears in 3GPP literature and stay whole — the Row label is treated as one identifier, not as `2G` plus a parenthetical.
- **2G `encryption algorithm = A5/1` and `A5/3`.** A5/1 is the original GSM stream cipher (LFSR-based, 64-bit key with 10 bits historically zeroed under COMP128-1) [s1]. A5/3 (KASUMI in stream-cipher mode, 64-bit key) was retrofitted into GSM as a stronger replacement after A5/1 was broken; both ship in modern GSM handsets and the network selects one. A5/2 (deliberately weakened export variant) is excluded — it was withdrawn by 3GPP and is not exam-relevant. A5/0 (null cipher) is the downgrade target and is named in the `known attacks` Column rather than as a cipher.
- **2G `authentication mechanism = A3/A8` and `COMP128`.** A3 (authentication response) and A8 (cipher-key derivation) are the named GSM functions; COMP128 is the de-facto algorithm that implements both [s1]. CISSP material uses both names. The cell carries both Facts so questions can be asked at either level. **One-way authentication only** — the network authenticates the handset, never the reverse — is listed as an attack class, not an authentication-mechanism Fact, because that's the property exam questions probe.
- **3G `encryption algorithm = KASUMI`.** KASUMI is the 64-bit-block, 128-bit-key cipher specified in 3GPP TS 35.202 [s2]. Used in two modes: f8 (confidentiality stream cipher) and f9 (integrity MAC). Some study guides write `f8/f9` in the encryption cell — that conflates the cipher with its modes of use. KASUMI is the cipher; f8 and f9 are how it's invoked. If a future Concept needs to test the f8/f9 split, add an `integrity algorithm` Column.
- **3G `authentication mechanism = UMTS-AKA` and `MILENAGE`.** AKA (Authentication and Key Agreement) is the protocol that introduced **mutual authentication** to cellular [s2] — this is the single most-tested 3G security fact. MILENAGE is the example algorithm set 3GPP defined to instantiate the AKA functions f1–f5, built on AES-128. AKA is the protocol; MILENAGE is one implementation of it.
- **4G `encryption algorithm = SNOW 3G`, `AES`, `ZUC`.** LTE defines three pairs: EEA1/EIA1 (SNOW 3G), EEA2/EIA2 (AES — CTR for confidentiality, CMAC for integrity), EEA3/EIA3 (ZUC, a Chinese-designed stream cipher) [s3]. All three are 128-bit. Networks negotiate which to use; AES is the default in most western deployments. ZUC was added to give China-domestic deployments a non-Western primary cipher.
- **4G `authentication mechanism = EPS-AKA`.** EPS-AKA (Evolved Packet System AKA) is the LTE-specific profile of UMTS-AKA, still using MILENAGE under the hood [s3]. Mutual authentication is preserved from 3G. The naming change (EPS-AKA vs UMTS-AKA) reflects the new core-network architecture (EPC), not a cryptographic redesign.
- **5G `encryption algorithm = SNOW 3G`, `AES`, `ZUC`.** Same three primitives as LTE [s5]. The 5G change is *not* in the ciphers themselves but in (a) the introduction of **256-bit key support** in the standard (TR 33.841) — though Release 15 deployment is still at 128-bit — and (b) SUPI concealment via SUCI on the radio link. Both items live in `known attacks` (as the SUCI catcher mitigation) and Notes rather than as a separate Column.
- **5G `authentication mechanism = 5G-AKA` and `EAP-AKA'`.** 5G defines two authentication methods at the same layer [s5]: 5G-AKA (an extension of EPS-AKA that returns the authentication confirmation to the home network) and EAP-AKA' (the EAP wrapper variant, used for non-3GPP access such as Wi-Fi offload). Both are mutual; both use MILENAGE-style key derivation. Listing both keeps the exam-relevant fact ("5G has two AKA variants") visible.
- **Signaling protocol Column.** This Column tracks what carries authentication and mobility messages between core-network elements, not the radio link. SS7 (and its application MAP) is the legacy 2G/3G stack [s7]; Diameter replaces SS7 in LTE and runs alongside SS7 in 3G transitional deployments; HTTP/2 over a Service-Based Architecture (SBA) replaces Diameter in 5G [s5]. The radio-air interface protocols (Um, Uu, NR-Uu) are out of scope for this Concept.
- **`known attacks = IMSI catcher` across 2G/3G/4G.** A single attack name spans three Rows because the same class of attack works against three generations, with progressively harder execution. 2G IMSI catchers are trivial (no mutual auth, can force null cipher A5/0). 3G/4G IMSI catchers exploit pre-authentication identity-request messages (the IMSI is sent in clear before AKA runs). 5G mitigates this with SUCI: the IMSI (now called SUPI) is encrypted with the home-network public key before transmission [s5][s6]. The 5G Row's `SUCI catcher` Fact is a separate, weaker attack (linkability / activity inference) — not equivalent to the pre-5G IMSI catcher.
- **Downgrade attacks.** Listed on the 3G, 4G, and 5G Rows because each generation can be forced down to its predecessor by a fake base station that refuses the higher-generation negotiation, ultimately landing on 2G with A5/0 [s6]. 2G itself has no Row entry for downgrade because there is nothing below it. Mitigations (carrier-side disabling of 2G fallback, handset settings) are out of scope for this Concept.
- **Out of scope for this Concept:** specific attack tools (IMSI-Catcher-Catcher, SnoopSnitch, Crocodile Hunter), handset-side defenses, lawful-intercept architecture, SIM/USIM hardware security, COMP128 versions 1/2/3 split, the f1–f5 AKA function decomposition, 5G's home-control AUSF/AMF split, SS7 attacks (SS7 vulnerabilities are a Concept of their own), Stingray / Hailstorm vendor-specific products. Each warrants its own Concept.

### Tricky distractors

- **GSM `A5/1` vs `A5/3`.** A5/1 is the original LFSR cipher, broken by Nohl's rainbow tables in 2009 [s8]. A5/3 is KASUMI-in-stream-mode, retrofitted into GSM. Both are legitimately "2G ciphers"; questions asking "which cipher does GSM use" must accept both. Questions distinguishing them probe attack history (only A5/1 has practical breaks) and lineage (A5/3 shares its primitive with 3G).
- **Mutual authentication: 3G yes, 2G no.** The signature 2G→3G change. 2G GSM authenticates only the handset to the network, enabling fake base stations. 3G UMTS-AKA introduced mutual authentication and has carried that property forward through 4G EPS-AKA and 5G 5G-AKA. Distractors commonly attribute mutual auth to LTE — wrong; LTE inherits it from 3G.
- **IMSI catchers are mitigated in 5G, not eliminated.** Pre-5G, the IMSI is sent in clear in response to an IDENTITY REQUEST message before AKA runs; this is the IMSI catcher's exploit. 5G replaces the IMSI in that exchange with SUCI (public-key-encrypted SUPI) [s5]. SUCI catchers still exist as a weaker class — they cannot recover SUPI but can fingerprint device presence (linkability) [s5]. Distractor: "5G eliminates IMSI catchers" — false.
- **Downgrade attacks work because of fallback, not because the higher generation is broken.** A 5G phone forced to camp on a 2G fake base station still has all of 5G's defenses on its modem — they just aren't being used. The attack is on the negotiation, not the cryptography. Mitigation is to disable 2G/3G fallback in operator policy and (where supported) on the handset.
- **MILENAGE vs AKA.** AKA is the authentication protocol (challenge-response with mutual auth and a sequence number). MILENAGE is the example *algorithm set* 3GPP published to implement the AKA functions, built on AES-128. Carriers may substitute their own algorithm set; MILENAGE is the default. Distractor: treating MILENAGE as the protocol or AKA as the algorithm — both inversions are common.

### Values without a direct public citation

These cell values are drawn from standard CISSP study material or inference rather than a traced public source. They reflect widely-accepted taxonomy but should be validated by an SME or replaced with a sourced value before the Concept is treated as reference-grade.

| Cell | Value | Why unsourced |
|---|---|---|
| 2G × year introduced | `1991` | First GSM commercial deployment was Finland, December 1991 (Radiolinja). Industry-historical fact widely repeated [s5]; no single 3GPP normative citation locates a year for the standard itself. |
| 3G × year introduced | `2001` | NTT DoCoMo launched the first commercial WCDMA 3G network in Japan in October 2001 [s9]; the 3GPP standard predates that. The cell takes the first-deployment year as the convention used in [s5]. |
| 4G × year introduced | `2009` | First public LTE service launched by TeliaSonera in Stockholm and Oslo on 14 December 2009 [s9]. |
| 5G × year introduced | `2019` | South Korean operators (KT, SK Telecom, LG U+) launched commercial 5G NR service in April 2019 [s10]; 3GPP Release 15 (the first 5G NR release) was finalized in stages 2018–2019. The cell takes the commercial-launch convention. |
| 2G × signaling protocol | `SS7`, `MAP` | SS7 and MAP are the canonical legacy mobile-core signaling stack [s7]. Treated as common knowledge in 3GPP/ETSI literature; no single citation pin located for "SS7 is the 2G signaling protocol." |
| 3G × signaling protocol | `Diameter` | UMTS introduced Diameter alongside SS7/MAP for IMS and policy control. CISSP-relevant but not pinned to a specific normative citation in the sources read. |
| Known-attacks taxonomy entries | `Location leak`, `Targeted DoS`, `Linkability` | Drawn from Shaik et al. NDSS 2016 [s4] and the 5G linkability literature [s5]; the *category labels* used in the cells are paraphrased for atomicity rather than quoted from any single source. |

## Engine demo opportunities

- `2G (GSM) | encryption algorithm → ?` → `A5/1`, `A5/3` (multi-Fact cell)
- `3G (UMTS) | encryption algorithm → ?` → `KASUMI`
- `? | encryption algorithm → AES` → `4G (LTE)`, `5G (NR)` — shared-Value select-all
- `? | encryption algorithm → SNOW 3G` → `4G (LTE)`, `5G (NR)` — shared-Value select-all
- `? | encryption algorithm → ZUC` → `4G (LTE)`, `5G (NR)` — shared-Value select-all
- `? | authentication mechanism → MILENAGE` → `3G (UMTS)`, `4G (LTE)` — shared-Value across generations that explicitly list MILENAGE
- `2G (GSM) | authentication mechanism → ?` → `A3/A8`, `COMP128`
- `5G (NR) | authentication mechanism → ?` → `5G-AKA`, `EAP-AKA'`
- `? | known attacks → IMSI catcher` → `2G (GSM)`, `3G (UMTS)`, `4G (LTE)` — shared-Value select-all; tests the "5G is *not* in this list" boundary
- `? | known attacks → Downgrade to 2G` → `3G (UMTS)`, `4G (LTE)` — shared-Value select-all
- `5G (NR) | known attacks → ?` → `SUCI catcher`, `Linkability`, `Downgrade to 4G`
- `? | signaling protocol → Diameter` → `3G (UMTS)`, `4G (LTE)` — shared-Value select-all
- `5G (NR) | signaling protocol → ?` → `HTTP/2`, `SBA`
- Composite Row profile: 5G (NR) with `authentication mechanism` swapped to `A3/A8` — tests recognition of generation-incompatible auth mechanisms
- Composite Row profile: 2G (GSM) with `known attacks` swapped to `SUCI catcher` — tests recognition that SUCI is a 5G-only construct

## Sources

- `[s1]`: ETSI / 3GPP GSM security algorithms documentation, "A5/1" and "COMP128" overview pages, including ETSI portal "Confidentiality and Integrity algorithms" (retrieved 2026-04-26, https://portal.etsi.org/new3g/TB/Other/algorithms.htm and https://en.wikipedia.org/wiki/A5/1 — Wikipedia is used as a navigational summary; the underlying 3GPP TS 55.205 / TS 35.202 specifications are the normative source)
- `[s2]`: 3GPP TS 35.202, "Specification of the 3GPP Confidentiality and Integrity Algorithms; Document 2: KASUMI Specification" and TS 33.102 "3G Security Architecture" (UMTS AKA), accessed via 3GPP specification portal (retrieved 2026-04-26, https://www.3gpp.org/specifications-technologies/specifications-by-series/gsm-specifications)
- `[s3]`: NIST SP 800-187, "Guide to LTE Security" (Cichonski, Franklin, Bartock, December 2017, retrieved 2026-04-26, https://nvlpubs.nist.gov/nistpubs/specialpublications/nist.sp.800-187.pdf)
- `[s4]`: Shaik, Borgaonkar, Asokan, Niemi, Seifert, "Practical Attacks Against Privacy and Availability in 4G/LTE Mobile Communication Systems," NDSS 2016 (retrieved 2026-04-26, https://arxiv.org/abs/1510.07563)
- `[s5]`: 3GPP TS 33.501, "Security architecture and procedures for 5G System," summarized via ENISA "Security in 5G Specifications" report and Basin et al. "A Formal Analysis of 5G Authentication" (arXiv 1806.10360) (retrieved 2026-04-26, https://www.enisa.europa.eu/sites/default/files/publications/ENISA%20Report%20-%20Security%20in%205G%20Specifications.pdf and https://arxiv.org/pdf/1806.10360)
- `[s6]`: CableLabs, "False Base Station or IMSI Catcher: What You Need to Know" and Khan, Mitev, Vanhoef et al. analyses of 5G downgrade/SUCI catcher resistance (retrieved 2026-04-26, https://www.cablelabs.com/blog/false-base-station-or-imsi-catcher-what-you-need-to-know and https://files01.core.ac.uk/download/pdf/275655532.pdf "Defeating the Downgrade Attack on Identity Privacy in 5G")
- `[s7]`: 3GPP TS 29.002 (MAP) and ITU-T Q.7xx series (SS7), as summarized in 3GPP architecture overviews (retrieved 2026-04-26, https://www.3gpp.org/specifications-technologies/specifications-by-series/gsm-specifications)
- `[s8]`: Karsten Nohl and Sascha Krißler, "GSM A5/1 Cracking Project," 26th Chaos Communication Congress (December 2009), and Meyer, "Breaking GSM with Rainbow Tables" (2010) (retrieved 2026-04-26, https://arxiv.org/pdf/1107.1086 and https://en.wikipedia.org/wiki/A5/1)
- `[s9]`: Wikipedia "UMTS" / "LTE (telecommunication)" / "3G" pages, used as navigational summaries of widely-documented commercial-launch milestones; primary sources are operator press releases (NTT DoCoMo October 2001 WCDMA launch; TeliaSonera 14 December 2009 LTE launch) (retrieved 2026-04-26, https://en.wikipedia.org/wiki/UMTS and https://en.wikipedia.org/wiki/LTE_(telecommunication))
- `[s10]`: 3GPP Release 15 page and "5G NR" Wikipedia summary covering the South Korean / US commercial launches in April 2019 (retrieved 2026-04-26, https://www.3gpp.org/specifications-technologies/releases/release-15 and https://en.wikipedia.org/wiki/5G_NR)
