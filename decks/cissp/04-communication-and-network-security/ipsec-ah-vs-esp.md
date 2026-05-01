# IPsec AH vs ESP

**Domain:** 4 — Communication and Network Security &nbsp;|&nbsp; **Pattern:** Dimensions &nbsp;|&nbsp; **Tags:** 4.2, 4.3
**Status:** draft (SME review pending)

The two IPsec data-protection protocols. AH provides authentication, integrity, and anti-replay only; ESP adds confidentiality (encryption) and is the overwhelmingly dominant choice in modern deployments. CISSP testing nearly always asks one of three discriminators: which protocol provides confidentiality, which protocol protects the IP header, or the IP-protocol-number pairing (50 vs 51). The IPsec modes (Transport vs Tunnel) and IKE phases are covered in separate Concepts.

| Protocol | RFC | IP protocol | confidentiality | integrity | origin authentication | anti-replay | IP header protected |
|---|---|---|---|---|---|---|---|
| AH | RFC 4302 [s1] | 51 [s1] | No [s1] | Yes [s1] | Yes [s1] | Yes [s1] | Yes [s1] |
| ESP | RFC 4303 [s2] | 50 [s2] | Yes [s2] | Yes [s2] | Yes [s2] | Yes [s2] | No [s2] |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. **No parentheticals in cells.** RFC numbers and IP protocol numbers are atomic identifiers.
- **ESP provides confidentiality; AH does not.** This is the single most-tested discriminator. ESP encrypts the payload (and optionally the inner IP header in Tunnel mode). AH has no encryption path — it only authenticates and protects integrity. If a question asks "which IPsec protocol provides confidentiality," the answer is always ESP.
- **AH protects the outer IP header; ESP does not.** AH's Integrity Check Value (ICV) covers the *immutable* fields of the outer IP header (source/destination, protocol, etc.) in addition to the payload. ESP's ICV covers only the ESP header, payload, and ESP trailer — not the outer IP header. This is the reason AH catches IP spoofing against the packet's outer addresses while ESP does not.
- **AH breaks NAT; ESP works across NAT (with NAT-T).** Because AH authenticates the outer IP header, any NAT device that rewrites the source address invalidates the AH ICV. ESP doesn't cover the outer header, so NAT works — though UDP encapsulation (NAT-T, UDP 4500) is typically needed to survive NAT device filtering of bare IP protocol 50. This is the practical reason AH is rarely deployed today despite being the "authentication header."
- **Both provide anti-replay via sequence numbers.** RFC 4302 [s1] and RFC 4303 [s2] define a 32-bit sequence number that increments per packet, starting at 1 on SA establishment. The receiver maintains a sliding window to detect and discard replays. Anti-replay is mandatory for unicast SAs; it is unavailable for multi-sender multicast SAs.
- **Integrity and origin authentication are joint services.** Per RFC 4303 [s2], "data origin authentication and connectionless integrity are joint services…provided indirectly as a result of binding the key used to verify integrity to the identity of the IPsec peer." In other words, if the ICV verifies, the data both came from the identified peer (authentication) and was not modified in transit (integrity). They cannot be separated in practice.
- **ESP can operate with `NULL` encryption.** ESP with `ENCR_NULL` provides integrity + authentication + anti-replay with no confidentiality — functionally equivalent to AH except it does not cover the outer IP header. This is why modern guidance (including RFC 7321) generally recommends ESP even when only integrity is needed, with AH retained as a legacy option.
- **AH + ESP together is permitted.** IPsec allows stacking AH and ESP in a single SA bundle ("belt and suspenders"), but this is rarely deployed because it doubles overhead without providing meaningful additional security over ESP with authentication enabled.
- **Out of scope for this Concept:** IPsec Transport vs Tunnel mode (separate Concept), IKEv1 vs IKEv2 and IKE phases (separate Concept), SA (Security Association) and SAD/SPD internals, cryptographic suite selection, NAT-Traversal protocol details, IPComp.

### Tricky distractors

- **ESP provides confidentiality; AH does not.** Most-tested discriminator. Wrong-answer pattern: claiming AH encrypts — only ESP does.
- **IP protocol numbers: ESP=50, AH=51.** Easy to swap. Wrong-answer pattern: assigning 50 to AH or 51 to ESP — memorize the pairing.
- **AH breaks NAT; ESP survives with NAT-T.** AH covers outer IP header; NAT rewriting invalidates the ICV. Wrong-answer pattern: claiming AH works through NAT — it doesn't, which is why ESP dominates.
- **AH protects outer IP header; ESP doesn't.** AH ICV covers immutable IP fields. Wrong-answer pattern: claiming ESP authenticates the outer IP — only AH does.
- **ESP with NULL encryption ≈ AH.** Both authenticate without confidentiality. Wrong-answer pattern: claiming ESP requires encryption — NULL cipher is permitted.
- **Anti-replay is mandatory for unicast.** Both AH and ESP. Wrong-answer pattern: claiming anti-replay is optional — it's required for unicast SAs.

### Values without a direct public citation

| Cell | Value | Why unsourced |
|---|---|---|
| AH × IP header protected | `Yes` | RFC 4302 [s1] describes AH's ICV covering the IP header's immutable fields, but the specific framing "IP header protected = Yes" is a CISSP-pedagogical summary rather than a direct quote. |
| ESP × IP header protected | `No` | Implied by RFC 4303 [s2] scope definition (ESP ICV covers ESP header + payload + trailer), but not stated as "IP header not protected" in the extracted sections. |

## Engine demo opportunities

- `AH | IP protocol → ?` → `51`
- `ESP | IP protocol → ?` → `50`
- `? | confidentiality → Yes` → `ESP`
- `? | confidentiality → No` → `AH`
- `? | IP header protected → Yes` → `AH`
- `? | integrity → Yes` → `AH`, `ESP` — shared-Value select-all
- `? | anti-replay → Yes` → `AH`, `ESP` — shared-Value select-all
- `? | origin authentication → Yes` → `AH`, `ESP` — shared-Value select-all
- Composite AH Row with `confidentiality` swapped to `Yes` — directly tests the AH/ESP confusion (AH has no encryption path)
- Composite ESP Row with `IP header protected` swapped to `Yes` — tests the inverse confusion (ESP's ICV does not cover the outer IP header)
- Composite AH Row with `IP protocol` swapped to `50` — tests the IP protocol number pairing (50=ESP, 51=AH)

## Sources

- `[s1]`: RFC 4302, "IP Authentication Header" (December 2005, retrieved 2026-04-19, https://datatracker.ietf.org/doc/html/rfc4302)
- `[s2]`: RFC 4303, "IP Encapsulating Security Payload (ESP)" (December 2005, retrieved 2026-04-19, https://datatracker.ietf.org/doc/html/rfc4303)
- `[s3]`: NIST SP 800-77 Revision 1, "Guide to IPsec VPNs" — general IPsec reference (June 2020, retrieved 2026-04-19, https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-77r1.pdf)
