# Email Authentication (SPF, DKIM, DMARC)

**Domain:** 4 — Communication and Network Security &nbsp;|&nbsp; **Pattern:** Dimensions &nbsp;|&nbsp; **Tags:** 4.2, 4.3
**Status:** draft (SME review pending)

The three DNS-published email-authentication standards. They are complementary, not redundant: SPF authorizes sending IPs, DKIM signs message content, and DMARC glues them together by enforcing alignment with the `From:` header domain and telling receivers what to do on failure. CISSP testing exploits the surface similarity between the three (all three are DNS TXT records, all three defend against spoofing) while discriminating on what each actually validates and whether it uses cryptography. NIST SP 800-177 Rev 1 recommends deploying all three together for domain-based email trust.

| Standard | RFC | year | validates | mechanism | DNS TXT location | failure handling | crypto |
|---|---|---|---|---|---|---|---|
| SPF | RFC 7208 [s1] | 2014 [s1] | Envelope sender<br>HELO identity [s1] | IP authorization lookup [s1] | Apex domain | Advisory | None [s1] |
| DKIM | RFC 6376 [s2] | 2011 [s2] | Message headers<br>Message body [s2] | Digital signature [s2] | Selector subdomain [s2] | Advisory | RSA [s2] |
| DMARC | RFC 7489 [s3] | 2015 [s3] | From header alignment [s3] | Alignment check [s3] | _dmarc subdomain [s3] | None<br>Quarantine<br>Reject [s3] | None [s3] |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. **No parentheticals in cells.** RFC numbers are treated as single atomic identifiers.
- **SPF validates envelope, not header.** SPF checks the SMTP `MAIL FROM` (envelope-sender) domain and optionally the `HELO` identity. It does not validate the `From:` header domain that end users actually see — which is what makes SPF alone insufficient against display-name spoofing, and is exactly the gap DMARC fills with its From-header alignment requirement.
- **DKIM signs, SPF doesn't.** DKIM is the only cryptographic standard in this set: the signing MTA covers selected headers plus a hash of the body with an RSA (or Ed25519, per RFC 8463) private key, and the verifier fetches the public key from a DNS TXT record at `<selector>._domainkey.<domain>`. SPF and DMARC perform no cryptographic operation themselves; DMARC *consumes* SPF and DKIM results.
- **DKIM crypto.** RFC 6376 [s2] defines RSA signatures (`rsa-sha256` in current deployments); RFC 8463 adds Ed25519. The cell lists `RSA` to match the base RFC; Ed25519 is additive, not a replacement.
- **DNS TXT locations differ.** SPF lives at the apex (`example.com` TXT); DKIM lives at a selector subdomain (`s1._domainkey.example.com` TXT); DMARC lives at a fixed `_dmarc` subdomain (`_dmarc.example.com` TXT). This is one of the most reliable exam discriminators — if a question names a TXT location, it points unambiguously at one of the three.
- **`failure handling = Advisory` for SPF and DKIM.** Both RFCs describe possible result codes (SPF: pass, fail, softfail, neutral, none, temperror, permerror; DKIM: pass, fail, etc.) but leave the disposition decision to the receiving MTA. The DMARC policy (`p=none`, `p=quarantine`, `p=reject`) is what actually tells receivers to reject or quarantine — this is the core value proposition of DMARC over bare SPF/DKIM.
- **DMARC alignment modes.** RFC 7489 defines strict (`s`) and relaxed (`r`) alignment for both SPF (`aspf=`) and DKIM (`adkim=`). Relaxed permits organizational-domain alignment (subdomain to parent); strict requires exact match. Out of scope for this Concept but worth a separate Concept if questions start probing alignment modes.
- **DMARC reporting.** DMARC defines two report URIs: `rua=` for aggregate XML reports and `ruf=` for forensic / failure reports. Out of scope here but potentially a separate Concept if reporting details become a testing focus.
- **Out of scope for this Concept:** BIMI (Brand Indicators for Message Identification), ARC (Authenticated Received Chain), MTA-STS, TLS-RPT, DANE for SMTP, S/MIME, PGP. These are adjacent but distinct standards — each would warrant its own Concept.

### Values without a direct public citation

| Cell | Value | Why unsourced |
|---|---|---|
| SPF × DNS TXT location | `Apex domain` | RFC 7208 [s1] permits SPF records at any DNS node the sender uses; placing them at the organizational apex is the dominant deployment pattern but not mandated. |
| SPF × failure handling | `Advisory` | Paraphrase of RFC 7208 [s1] semantics, not a direct quotation. "Advisory" captures that the RFC defines result codes but leaves disposition to the receiver. |
| DKIM × failure handling | `Advisory` | Same status as SPF — RFC 6376 [s2] defines verification outcomes but does not mandate receiver action. |

## Engine demo opportunities

- `SPF | crypto → ?` → `None`
- `? | crypto → None` → `SPF`, `DMARC` — shared-Value select-all
- `DKIM | crypto → ?` → `RSA`
- `DKIM | mechanism → ?` → `Digital signature`
- `DMARC | mechanism → ?` → `Alignment check`
- `? | failure handling → Advisory` → `SPF`, `DKIM` — shared-Value select-all
- `DMARC | failure handling → ?` → `None`, `Quarantine`, `Reject`
- `? | DNS TXT location → _dmarc subdomain` → `DMARC`
- `? | validates → Envelope sender` → `SPF`
- `? | validates → Message body` → `DKIM`
- Composite SPF Row with `crypto` swapped to `RSA` — directly tests the SPF/DKIM confusion (SPF has no crypto)
- Composite DKIM Row with `DNS TXT location` swapped to `_dmarc subdomain` — tests the TXT-record location discriminator

## Sources

- `[s1]`: RFC 7208, "Sender Policy Framework (SPF) for Authorizing Use of Domains in Email, Version 1" (April 2014, retrieved 2026-04-19, https://datatracker.ietf.org/doc/html/rfc7208)
- `[s2]`: RFC 6376, "DomainKeys Identified Mail (DKIM) Signatures" (September 2011, retrieved 2026-04-19, https://datatracker.ietf.org/doc/html/rfc6376)
- `[s3]`: RFC 7489, "Domain-based Message Authentication, Reporting, and Conformance (DMARC)" (March 2015, retrieved 2026-04-19, https://datatracker.ietf.org/doc/html/rfc7489)
- `[s4]`: NIST SP 800-177 Rev 1, "Trustworthy Email" — general reference for deploying SPF + DKIM + DMARC together (February 2019, retrieved 2026-04-19, https://csrc.nist.gov/publications/detail/sp/800-177/rev-1/final)
