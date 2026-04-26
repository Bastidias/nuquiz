# Hash Functions

**Domain:** 3 — Security Architecture and Engineering &nbsp;|&nbsp; **Pattern:** Dimensions &nbsp;|&nbsp; **Tags:** 3.6
**Status:** draft (SME review pending)

The five cryptographic hash functions CISSP candidates are expected to discriminate. MD5 and SHA-1 are deprecated due to collision attacks. SHA-2 (the SHA-256 / SHA-512 family) and SHA-3 are current. RIPEMD-160 is a less-common alternative still used in some niche applications. CISSP testing focuses on output-size pairings and the deprecation status of MD5 / SHA-1.

| Algorithm | output size | status | known weakness |
|---|---|---|---|
| MD5 | 128 bits | Deprecated [s1] | Practical collision attacks since 2004 |
| SHA-1 | 160 bits | Deprecated [s2] | Practical collision attacks since 2017 (SHAttered) |
| SHA-256 | 256 bits | Current [s1] | None known |
| SHA-3 | 224 to 512 bits | Current [s3] | None known |
| RIPEMD-160 | 160 bits | Current with caveat | No practical attacks but limited adoption |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. **No parentheticals in cells.**
- **MD5 deprecation.** Collision attacks against MD5 became practical in 2004 (Wang et al.) and chosen-prefix attacks followed. MD5 is unsafe for any security purpose where collision resistance matters — digital signatures, certificate fingerprints, code-signing. MD5 remains acceptable for non-security uses (file deduplication, non-cryptographic checksums).
- **SHA-1 deprecation.** Theoretical collision attacks emerged in 2005; practical chosen-prefix collisions were demonstrated in 2017 (Google's SHAttered) and improved in 2020 (Leurent-Peyrin). NIST officially deprecated SHA-1 in 2011 and prohibited it for federal use after 2030. Browser CAs stopped issuing SHA-1 certificates in 2017.
- **SHA-2 family.** SHA-256, SHA-384, SHA-512, SHA-512/224, SHA-512/256. All share the same Merkle-Damgård construction and are considered secure. SHA-256 is the dominant choice for general-purpose hashing; SHA-512 may be faster on 64-bit systems.
- **SHA-3 is structurally different.** Standardized in 2015 as FIPS 202. Uses a sponge construction (Keccak) rather than Merkle-Damgård. Was selected as a hedge against any future weakness in SHA-2 — not because SHA-2 had been broken, but because diversifying construction reduces systemic risk. SHA-3 supports the same output sizes as SHA-2 plus extendable-output functions (SHAKE128, SHAKE256).
- **Length-extension attack matters for some constructions.** SHA-2 (Merkle-Damgård based) is vulnerable to length-extension attacks — given `H(secret || message)`, an attacker can compute `H(secret || message || padding || extension)` without knowing the secret. SHA-3 (sponge construction) is not vulnerable. For MAC-via-hash constructions, use HMAC (which is length-extension-resistant) rather than naive `H(key || message)`.
- **RIPEMD-160 is the dark horse.** Designed by European cryptographers as an alternative to SHA-1. Same 160-bit output size; different internal structure. Used in Bitcoin (Bitcoin addresses combine SHA-256 and RIPEMD-160). No practical attacks known but adoption is limited; CISSP recognizes it without recommending it.
- **NIST SP 800-131A on transition.** Specifies the federal transition timeline for hash functions: SHA-1 disallowed for digital signatures and HMAC after 2014; allowed for legacy verification. SHA-256+ required for new federal applications.
- **Out of scope for this Concept:** HMAC construction (sibling Concept `mac-functions`), hash-based message authentication, password hashing functions (bcrypt, scrypt, Argon2), Merkle trees and hash-based signatures, post-quantum hash functions.

### Values without a direct public citation

| Cell | Notes |
|---|---|
| RIPEMD-160 × known weakness | `No practical attacks but limited adoption` | Practitioner consensus; not a primary-source quote. |
| All rows × output size | Specific bit values | FIPS 180-4 [s1] and FIPS 202 [s3] specify output sizes; cell values reflect the specifications. |

## Engine demo opportunities

- `MD5 | output size → ?` → `128 bits`
- `SHA-1 | output size → ?` → `160 bits`
- `SHA-256 | output size → ?` → `256 bits`
- `RIPEMD-160 | output size → ?` → `160 bits`
- `MD5 | status → ?` → `Deprecated`
- `SHA-1 | status → ?` → `Deprecated`
- `? | status → Deprecated` → `MD5`, `SHA-1` — shared-Value select-all
- `? | status → Current` → `SHA-256`, `SHA-3` — shared-Value select-all
- `? | known weakness → Practical collision attacks since 2017 (SHAttered)` → `SHA-1`
- `? | output size → 160 bits` → `SHA-1`, `RIPEMD-160` — shared-Value select-all
- Composite SHA-256 Row with `status` swapped to `Deprecated` — directly tests the SHA-2-vs-SHA-1 distinction (SHA-2 family is current; SHA-1 is deprecated)
- Composite MD5 Row with `output size` swapped to `256 bits` — tests the output-size pairing (MD5 is 128 bits)
- Composite SHA-1 Row with `output size` swapped to `128 bits` — tests SHA-1's 160-bit output (MD5 is 128; SHA-1 is 160)

## Sources

- `[s1]`: NIST FIPS 180-4, "Secure Hash Standard (SHS)" — SHA-1, SHA-2 family specifications (August 2015, retrieved 2026-04-26, https://csrc.nist.gov/publications/detail/fips/180/4/final)
- `[s2]`: NIST SP 800-131A Rev 2, "Transitioning the Use of Cryptographic Algorithms and Key Lengths" — SHA-1 deprecation timeline (March 2019, retrieved 2026-04-26, https://csrc.nist.gov/publications/detail/sp/800-131a/rev-2/final)
- `[s3]`: NIST FIPS 202, "SHA-3 Standard: Permutation-Based Hash and Extendable-Output Functions" (August 2015, retrieved 2026-04-26, https://csrc.nist.gov/publications/detail/fips/202/final)
- `[s4]`: Marc Stevens et al., "The first collision for full SHA-1," CRYPTO 2017 — SHAttered collision attack (retrieved 2026-04-26, https://shattered.io/)
