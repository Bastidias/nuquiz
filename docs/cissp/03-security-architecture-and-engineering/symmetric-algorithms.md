# Symmetric Algorithms

**Domain:** 3 — Security Architecture and Engineering &nbsp;|&nbsp; **Pattern:** Dimensions &nbsp;|&nbsp; **Tags:** 3.6
**Status:** draft (SME review pending)

The major symmetric block and stream ciphers tested on CISSP. AES is the only current standard; the rest are tested for historical context, deprecation awareness, and trap questions about block sizes and key strengths.

| Algorithm | key size | block size | cipher type | status | typical use | mode support | known weakness |
|---|---|---|---|---|---|---|---|
| DES | 56-bit | 64-bit | Block | Deprecated | Legacy systems<br>Historical interest only | ECB<br>CBC<br>CFB<br>OFB | Brute-forceable in hours<br>Key space too small |
| 3DES | 168-bit | 64-bit | Block | Deprecated | Legacy banking<br>Legacy payment processing | ECB<br>CBC | Sweet32 attack<br>Small block size<br>Slow performance<br>Phased out by NIST |
| AES | 128-bit<br>192-bit<br>256-bit | 128-bit | Block | Current standard | TLS<br>Full-disk encryption<br>VPN<br>WPA2<br>WPA3 | ECB<br>CBC<br>CFB<br>OFB<br>CTR<br>GCM<br>CCM | None practical with correct IV and mode |
| Blowfish | Variable | 64-bit | Block | Superseded by AES | Legacy applications | ECB<br>CBC<br>CFB<br>OFB | Sweet32 attack<br>Small block size<br>Slow key setup |
| Twofish | 128-bit<br>192-bit<br>256-bit | 128-bit | Block | AES finalist | Specialized hardware<br>Legacy applications | ECB<br>CBC<br>CFB<br>CTR | Less peer review than AES<br>Lower hardware adoption |
| RC4 | Variable | None | Stream | Deprecated | Legacy WEP<br>Legacy SSLv3 | None | Biased keystream<br>RC4 NOMORE attack<br>Bar-Mitzvah attack |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. **No parentheticals in cells.** The earlier draft had `Deprecated (NIST, 2005)`, `Deprecated (NIST, 2023)`, `Deprecated (RFC 7465, 2015)`, `Current standard (FIPS 197)`, `AES finalist (not selected)`, `168-bit (effective 112-bit due to meet-in-the-middle)`, `Variable (32-448 bit)`, `Variable (40-2048 bit)`, `Stream cipher (no block)`, and `Sweet32 attack (small block)`. Each masked sharing or smuggled sub-Facts. They've been split into separate Columns (`status`, `cipher type`) or moved here to Notes.
- **Why this matters for the engine.** Pre-fix, the `status` cells were three different strings (`Deprecated (NIST, 2005)`, `Deprecated (NIST, 2023)`, `Deprecated (RFC 7465, 2015)`). The engine couldn't see that DES, 3DES, and RC4 share the Value `Deprecated`. Post-fix, `? | status → Deprecated` cleanly returns three Rows. Same for `block size = 64-bit` (DES, 3DES, Blowfish — three-way share) and `block size = 128-bit` (AES, Twofish — two-way share).
- **A new shared Value emerges:** `key size = Variable` for both Blowfish and RC4. Previously hidden behind the parenthetical ranges.

### Deprecation context (reference, not Facts)

- DES: deprecated by NIST in 2005.
- 3DES: deprecated by NIST in 2023. The 168-bit key has an effective strength of 112-bit due to the meet-in-the-middle attack on Triple-DES.
- RC4: deprecated by RFC 7465 in 2015.
- AES: standardized as FIPS 197.
- Twofish: AES finalist, not selected.

### Key-size ranges (for `Variable` ciphers)

- Blowfish: 32-448 bit.
- RC4: 40-2048 bit.

### Other notes

- **Block size is heavily tested.** AES uses 128-bit blocks; the older DES family uses 64-bit. RC4 is a stream cipher (no block).
- **Status Column drives "which is current/deprecated" questions.** 3DES was deprecated relatively recently (2023); older study materials may still call it "current."
- **Blowfish vs Twofish:** Blowfish is the older, smaller-block ancestor. Twofish was Bruce Schneier's AES submission. Common confusion target.

## Engine demo opportunities

- `AES | block size → ?` → 128-bit. Distractors from DES/3DES/Blowfish (`64-bit`) and RC4 (`None`).
- `? | key size → 256-bit` → AES, Twofish (cross-Row select-all, shared-Value detection).
- `? | cipher type → Stream` → RC4 (only Stream Row; works as Hide-Row MC).
- `3DES | known weakness → ?` → Sweet32 attack / Small block size / Slow performance / Phased out by NIST (multi-Fact cell, accept any one in fill-in or all in select-all).
- `? | block size → 64-bit` → DES, 3DES, Blowfish (three-way shared-Value cluster — the trap is that students often think 64-bit = DES only).
- `? | status → Deprecated` → DES, 3DES, RC4 (now visible after the parenthetical fix).
- Excluded for now: ChaCha20 (modern stream cipher gaining adoption — add when (ISC)² adds it), Camellia (international standard, less commonly tested), Serpent (AES finalist, niche).
