# EAP Variants

**Domain:** 5 — Identity and Access Management &nbsp;|&nbsp; **Pattern:** Dimensions &nbsp;|&nbsp; **Tags:** 5.6, 4.2
**Status:** draft (SME review pending)

The six Extensible Authentication Protocol variants CISSP candidates are expected to discriminate in 802.1X / network-access contexts. The discriminating axes are (1) whether each side requires an X.509 certificate, (2) whether the method establishes a TLS tunnel to protect inner authentication, and (3) the variant's deployment status (current vs deprecated). EAP-TLS is the gold standard but is the only variant requiring a client certificate; PEAP, EAP-TTLS, and EAP-FAST tunnel weaker inner authentication inside TLS without burdening clients with certificates; LEAP and EAP-MD5 are deprecated.

| Variant | client cert required | server cert required | tunneling | status | typical deployment |
|---|---|---|---|---|---|
| EAP-TLS | Yes [s1] | Yes [s1] | No tunnel | Current | Enterprise Wi-Fi<br>High-assurance 802.1X |
| EAP-TTLS | No [s2] | Yes [s2] | TLS tunnel [s2] | Current | Enterprise Wi-Fi<br>Legacy-credential reuse |
| PEAP | No [s4] | Yes [s4] | TLS tunnel [s4] | Current | Microsoft enterprise Wi-Fi |
| EAP-FAST | No [s3] | Yes [s3] | TLS tunnel [s3] | Current | Cisco enterprise Wi-Fi |
| LEAP | No [s5] | No [s5] | No tunnel | Deprecated [s5] | Legacy Cisco Wi-Fi |
| EAP-MD5 | No [s6] | No [s6] | No tunnel | Deprecated [s6] | Legacy wired 802.1X |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. **No parentheticals in cells.** Variant names (`EAP-TLS`, `EAP-TTLS`, `PEAP`, `EAP-FAST`) are treated as atomic identifiers.
- **EAP-TLS is the only variant requiring a client certificate.** RFC 5216 [s1] specifies certificate-based mutual authentication: the server MUST present a certificate and the server SHOULD require peer authentication via client certificate. This is the single most-tested cert-requirement discriminator on CISSP. The operational cost of provisioning client certs to every endpoint is exactly why the tunneled variants (PEAP, EAP-TTLS, EAP-FAST) exist — they preserve the server-cert anchor but let the client present a password or other inner credential through the protected tunnel.
- **EAP-TLS does not "tunnel" in the CISSP sense.** RFC 5216 [s1] encapsulates the TLS handshake inside EAP messages to establish mutual authentication and derive keys, but no inner EAP method is carried. The tunneled variants (PEAP, EAP-TTLS, EAP-FAST) explicitly establish a TLS tunnel and then run a *second*, weaker authentication inside it. CISSP framing distinguishes these as "tunneled" vs "non-tunneled" — the cell value `No tunnel` for EAP-TLS reflects that distinction.
- **PEAP vs EAP-TTLS.** Both establish a server-authenticated TLS tunnel that protects an inner authentication exchange; the client does not need a certificate in either. The difference is what the tunnel carries: PEAP [s4] carries another EAP method (most commonly EAP-MSCHAPv2 — "PEAPv0/EAP-MSCHAPv2" is the Microsoft-dominant deployment); EAP-TTLS [s2] can carry EAP methods *or* legacy non-EAP attribute-value pairs (PAP, CHAP, MS-CHAP, MS-CHAP-V2). PEAP was co-developed by Microsoft, Cisco, and RSA; EAP-TTLS originated outside Microsoft and is more common in non-Windows environments.
- **EAP-FAST and the PAC.** EAP-FAST [s3] was Cisco's replacement for LEAP. It establishes a TLS tunnel like PEAP but introduces the Protected Access Credential (PAC) — a server-issued shared-secret credential that allows the tunnel to be re-established without a full TLS handshake on every authentication. The PAC is *not* a client certificate; it is a 32-octet shared secret plus opaque server-state blob. CISSP testing occasionally asks "which EAP variant uses a PAC" — the answer is EAP-FAST.
- **LEAP weakness.** LEAP is Cisco-proprietary and pre-dates the modern tunneled variants. It uses a modified MS-CHAPv1 challenge-response with no TLS tunnel, no server certificate, and no protection against offline dictionary attack. CERT advisory VU#473108 [s5] documents the vulnerability; Joshua Wright's `asleap` tool (2003) made offline cracking trivial. Cisco's own current guidance is to migrate to EAP-FAST, PEAP, or EAP-TLS.
- **EAP-MD5 weakness.** EAP-MD5 is defined in RFC 3748 [s6] as an EAP "MD5-Challenge" method. It provides one-way authentication only (server does not authenticate to client), derives no keying material, and is therefore unsuitable for dynamic-WEP / WPA / WPA2-Enterprise wireless. The MD5 challenge-response is also dictionary-attackable. EAP-MD5 lingered in wired 802.1X deployments where the physical layer was assumed trustworthy, but is treated as deprecated for any modern deployment.
- **"Mutual authentication" axis.** Not surfaced as a Column because it correlates almost perfectly with "server cert required" *plus* "status = Current": the four current variants (EAP-TLS, EAP-TTLS, PEAP, EAP-FAST) all provide mutual authentication; the two deprecated variants (LEAP partially, EAP-MD5 not at all) do not. If SME review wants the column explicit, add it.
- **Out of scope for this Concept:** the EAP-TLS 1.3 update (RFC 9190), EAP-MSCHAPv2 as an inner method (its own Concept candidate), 802.1X port-based access control (separate Concept — `802.1x-flow`), RADIUS as the AAA back-end (separate Concept), TEAP (Tunnel EAP, RFC 7170 — newer than EAP-FAST and not yet on most CISSP outlines), wired vs wireless deployment specifics.

### Tricky distractors

- **EAP-TLS vs PEAP cert requirements.** A student who remembers "EAP-TLS uses certificates" often over-extends that to "PEAP uses certificates on both sides." PEAP requires a *server* certificate only; the client authenticates with a password (typically MSCHAPv2) inside the tunnel. The clean discriminator: EAP-TLS is the **only** variant on this list that requires a client cert.
- **EAP-FAST vs PEAP.** Both are tunneled, both are Cisco-adjacent (PEAP was co-developed by Cisco; EAP-FAST is Cisco's own). The distinguishing fact is the PAC: EAP-FAST uses Protected Access Credentials for fast re-authentication, PEAP does not. Also: EAP-FAST was specifically designed as the LEAP replacement, while PEAP came from a Microsoft-Cisco-RSA collaboration.
- **LEAP "tunnel" misconception.** Because LEAP is sometimes described as "Cisco's wireless EAP," students assume it must tunnel. It does not. LEAP transmits a modified MS-CHAP exchange in the clear with no TLS protection — that is precisely why `asleap` can crack it offline.
- **EAP-MD5 mutual authentication.** Students sometimes assume "challenge-response = mutual authentication." EAP-MD5 is one-way only: the server challenges the client; the client never verifies the server. This is the canonical reason it cannot derive keys for WPA/WPA2-Enterprise.
- **EAP-TLS as "tunneled."** RFC 5216 [s1] uses TLS, so it is tempting to call it a tunneled method. CISSP framing reserves "tunneled" for variants that run a *second*, inner authentication exchange inside the TLS session (PEAP, EAP-TTLS, EAP-FAST). EAP-TLS performs certificate-based mutual auth as the *only* exchange — there is no inner method.

### Values without a direct public citation

| Cell | Value | Why unsourced |
|---|---|---|
| All rows × typical deployment | — | Deployment patterns (Microsoft enterprise Wi-Fi, Cisco enterprise Wi-Fi, legacy wired) are widely-attested industry consensus but no single canonical public source ties each variant to a deployment context. |
| EAP-TLS × status | `Current` | RFC 5216 [s1] is a Proposed Standard and remains the foundational spec; RFC 9190 supersedes it for TLS 1.3 but EAP-TLS as a category is current. The cell does not cite a "status" assertion directly. |
| EAP-TTLS × status, PEAP × status, EAP-FAST × status | `Current` | Same — no single source asserts "current"; reflects industry-deployment status. |
| PEAP × server cert required | `Yes` | PEAP has no IETF RFC; the cell value is drawn from Microsoft documentation and the widely-attested PEAP design. Cited via [s4] (Microsoft Learn / Wikipedia summary) rather than a primary spec. |
| LEAP × status | `Deprecated` | CERT VU#473108 [s5] documents the vulnerability and Cisco's migration recommendation but does not use the word "deprecated." Cell value reflects industry consensus. |

## Engine demo opportunities

- `EAP-TLS | client cert required → ?` → `Yes`
- `PEAP | client cert required → ?` → `No`
- `? | client cert required → Yes` → `EAP-TLS` — sole-Row select
- `? | client cert required → No` → `EAP-TTLS`, `PEAP`, `EAP-FAST`, `LEAP`, `EAP-MD5` — shared-Value select-all
- `? | server cert required → Yes` → `EAP-TLS`, `EAP-TTLS`, `PEAP`, `EAP-FAST` — shared-Value select-all
- `? | server cert required → No` → `LEAP`, `EAP-MD5` — shared-Value select-all
- `? | tunneling → TLS tunnel` → `EAP-TTLS`, `PEAP`, `EAP-FAST` — shared-Value select-all
- `? | tunneling → No tunnel` → `EAP-TLS`, `LEAP`, `EAP-MD5` — shared-Value select-all (notable: groups the gold-standard variant with the two deprecated ones on the tunneling axis specifically)
- `? | status → Deprecated` → `LEAP`, `EAP-MD5` — shared-Value select-all
- `EAP-FAST | tunneling → ?` → `TLS tunnel`
- Composite EAP-TLS Row with `client cert required` swapped to `No` — directly tests the canonical EAP-TLS-requires-client-certs point
- Composite PEAP Row with `client cert required` swapped to `Yes` — tests the inverse misconception (PEAP does *not* require a client cert)
- Composite LEAP Row with `tunneling` swapped to `TLS tunnel` — tests the LEAP-doesn't-tunnel point
- Composite EAP-MD5 Row with `status` swapped to `Current` — tests the deprecation framing

## Sources

- `[s1]`: RFC 5216, "The EAP-TLS Authentication Protocol" (March 2008, retrieved 2026-04-26, https://datatracker.ietf.org/doc/html/rfc5216)
- `[s2]`: RFC 5281, "Extensible Authentication Protocol Tunneled Transport Layer Security Authenticated Protocol Version 0 (EAP-TTLSv0)" (August 2008, retrieved 2026-04-26, https://datatracker.ietf.org/doc/html/rfc5281)
- `[s3]`: RFC 4851, "The Flexible Authentication via Secure Tunneling Extensible Authentication Protocol Method (EAP-FAST)" (May 2007, retrieved 2026-04-26, https://datatracker.ietf.org/doc/html/rfc4851)
- `[s4]`: Microsoft Learn, "Extensible Authentication Protocol (EAP) for network access in Windows" — PEAP description and Windows inner-method support (retrieved 2026-04-26, https://learn.microsoft.com/en-us/windows-server/networking/technologies/extensible-authentication-protocol/network-access); supplemented by Wikipedia, "Protected Extensible Authentication Protocol" (retrieved 2026-04-26, https://en.wikipedia.org/wiki/Protected_Extensible_Authentication_Protocol)
- `[s5]`: CERT/CC Vulnerability Note VU#473108, "Cisco Lightweight Extensible Authentication Protocol (LEAP) uses passwords that are vulnerable to dictionary attacks" (retrieved 2026-04-26, https://www.kb.cert.org/vuls/id/473108)
- `[s6]`: RFC 3748, "Extensible Authentication Protocol (EAP)" — defines the MD5-Challenge method (Type 4) (June 2004, retrieved 2026-04-26, https://datatracker.ietf.org/doc/html/rfc3748)
