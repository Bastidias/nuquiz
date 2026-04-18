# Symmetric Algorithms

**Domain:** 3 — Security Architecture and Engineering &nbsp;|&nbsp; **Pattern:** Dimensions &nbsp;|&nbsp; **Tags:** 3.6
**Status:** draft (SME review pending)

The major symmetric block and stream ciphers tested on CISSP. AES is the only current standard; the rest are tested for historical context, deprecation awareness, and trap questions about block sizes and key strengths.

| Algorithm | key size | block size | status | typical use | mode support | known weakness |
|---|---|---|---|---|---|---|
| DES | 56-bit | 64-bit | Deprecated (NIST, 2005) | Legacy systems<br>Historical interest only | ECB<br>CBC<br>CFB<br>OFB | Brute-forceable in hours<br>Key space too small |
| 3DES | 168-bit (effective 112-bit due to meet-in-the-middle) | 64-bit | Deprecated (NIST, 2023) | Legacy banking<br>Legacy payment processing | ECB<br>CBC | Sweet32 attack (small block)<br>Slow performance<br>Phased out by NIST |
| AES | 128-bit<br>192-bit<br>256-bit | 128-bit | Current standard (FIPS 197) | Web traffic (TLS)<br>Full-disk encryption<br>VPN<br>WPA2/WPA3 | ECB<br>CBC<br>CFB<br>OFB<br>CTR<br>GCM<br>CCM | None practical with correct IV and mode |
| Blowfish | Variable (32-448 bit) | 64-bit | Superseded by AES | Legacy applications | ECB<br>CBC<br>CFB<br>OFB | Small block size (Sweet32)<br>Slow key setup |
| Twofish | 128-bit<br>192-bit<br>256-bit | 128-bit | AES finalist (not selected) | Specialized hardware<br>Legacy applications | ECB<br>CBC<br>CFB<br>CTR | Less peer review than AES<br>Lower hardware adoption |
| RC4 | Variable (40-2048 bit) | Stream cipher (no block) | Deprecated (RFC 7465, 2015) | Legacy WEP<br>Legacy SSLv3 | N/A (stream cipher) | Biased keystream<br>RC4 NOMORE attack<br>Bar-Mitzvah attack |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic fact. Parenthetical clarifications scope a single fact (e.g., "168-bit (effective 112-bit due to meet-in-the-middle)" is one fact about the effective key size).
- **Key sizes for AES, Twofish:** these support multiple key sizes. Each `<br>`-separated key size is one fact, so the engine can ask "What key sizes does AES support?" as select-all from the three values, with discriminating distractors from RC4 (variable) or DES (56-bit fixed).
- **Block size is heavily tested.** AES uses 128-bit blocks; the older DES family uses 64-bit. The "stream cipher (no block)" entry for RC4 should be tested explicitly.
- **Status column drives "which is current/deprecated" questions.** Note that 3DES is recently deprecated (2023) — older study materials may still call it "current."
- **Blowfish vs Twofish:** Blowfish is the older, smaller-block ancestor. Twofish was Bruce Schneier's AES submission. Common confusion target.
- Engine demo opportunities:
  - "What is the block size of AES?" → 128-bit; distractors from DES (64-bit), RC4 (none)
  - "Which symmetric algorithms support a 256-bit key?" → AES, Twofish (select-all)
  - "Which algorithm is a stream cipher?" → RC4 (axis: hide algorithm name)
  - "What is one known weakness of 3DES?" → Sweet32 / Slow performance / Phased out (multi-fact cell)
  - Cross-algorithm: "Which block ciphers have 64-bit blocks?" → DES, 3DES, Blowfish (shared-Object set)
- Excluded for now: ChaCha20 (modern stream cipher gaining adoption — add when (ISC)² adds it), Camellia (international standard, less commonly tested), Serpent (AES finalist, niche).
