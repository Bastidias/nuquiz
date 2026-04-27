# MAC Functions

**Domain:** 3 — Security Architecture and Engineering &nbsp;|&nbsp; **Pattern:** Dimensions &nbsp;|&nbsp; **Tags:** 3.6
**Status:** draft (SME review pending)

The four Message Authentication Code (MAC) constructions CISSP candidates are expected to discriminate. HMAC builds a MAC from a hash function; CMAC builds a MAC from a block cipher (typically AES); GMAC is the authentication-only mode of GCM; Poly1305 is a Wegman-Carter universal-hash MAC paired with a stream cipher. Each pairs *construction* (what cryptographic primitive is the foundation) with *typical use* and *key dependency*.

| MAC | construction | typical use | key dependency |
|---|---|---|---|
| HMAC | Hash function with key as input [s1] | TLS<br>API request signing<br>HMAC-SHA-256 password derivation | One symmetric key shared between sender and verifier |
| CMAC | Block cipher in CBC-MAC variant [s2] | Embedded systems<br>IPsec authentication | One symmetric key shared between sender and verifier |
| GMAC | GCM authentication-only mode [s3] | IPsec ESP-NULL with authentication | One symmetric key plus unique IV per message |
| Poly1305 | Universal-hash MAC paired with stream cipher [s4] | ChaCha20-Poly1305 in TLS<br>WireGuard authentication | One symmetric key plus unique nonce per message |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. **No parentheticals in cells.**
- **HMAC is the dominant general-purpose MAC.** FIPS 198-1 standardized HMAC; it works with any underlying hash (HMAC-SHA-256, HMAC-SHA-512). The construction is `H((key XOR opad) || H((key XOR ipad) || message))` — the double hashing prevents length-extension attacks that would affect naive `H(key || message)`. HMAC is the default MAC in TLS, IPsec, JWT signing, and AWS request signing.
- **CMAC for symmetric-cipher MAC.** Useful when a system already has a block cipher (like AES) and wants to MAC without adding a separate hash function. Common in embedded systems and standards that already mandate a block cipher (NIST SP 800-38B specifies CMAC for use with AES).
- **GMAC is GCM minus encryption.** GCM (Galois/Counter Mode) is an AEAD scheme — it encrypts and authenticates. GMAC is the same authentication construction without the encryption step. Used when you want authentication-only (e.g., IPsec ESP with NULL encryption) and want the same key/IV management as GCM.
- **Poly1305 is a Wegman-Carter MAC.** A Wegman-Carter MAC computes a polynomial evaluation over the message using a one-time key. Pairs with stream ciphers (ChaCha20 generates the per-message key). Distinct from HMAC/CMAC/GMAC because the security argument is different — Wegman-Carter MACs require *unique* keys per message, which the paired stream cipher provides via per-message nonces.
- **All four require a shared symmetric key.** This distinguishes MACs from digital signatures (which use asymmetric keys). MAC verification proves the message came from *someone* with the shared key — it doesn't prove *which* party in a multi-party setting. Digital signatures (RSA, ECDSA, Ed25519) provide non-repudiation by tying the signature to a single private-key holder.
- **MAC-then-encrypt vs encrypt-then-MAC vs encrypt-and-MAC.** Order matters for non-AEAD systems. Encrypt-then-MAC (the modern recommendation) MACs the ciphertext, allowing rejection of tampered messages before decryption. MAC-then-encrypt (older TLS) MACs the plaintext, requiring decryption before MAC verification — this is what makes padding-oracle attacks possible. AEAD modes (GCM, CCM, ChaCha20-Poly1305) avoid the question entirely by combining encryption and authentication into a single construction.
- **Out of scope for this Concept:** specific NIST cipher suites for HMAC + cipher pairing, KMAC (the SHA-3 KECCAK-based MAC), Poly1305-AES (older variant before ChaCha20-Poly1305), HMAC-vs-keyed-hash distinctions, side-channel attacks on MAC implementations.

### Tricky distractors

- **MAC = symmetric; Digital signature = asymmetric.** MAC requires shared key. Wrong-answer pattern: claiming MAC provides non-repudiation — both parties have the key, so neither can repudiate uniquely.
- **HMAC vs naive H(key || message).** HMAC defends against length-extension. Wrong-answer pattern: claiming `H(key || message)` is sufficient for keyed hashing — vulnerable to extension attacks.
- **Encrypt-then-MAC is the modern recommendation.** MAC the ciphertext. Wrong-answer pattern: claiming MAC-then-encrypt is fine — leads to padding-oracle attacks.
- **AEAD avoids the order question.** GCM, CCM, ChaCha20-Poly1305. Wrong-answer pattern: claiming AEAD requires separate MAC management — combined construction.
- **GMAC requires unique IV per message.** Same as GCM. Wrong-answer pattern: treating GMAC like HMAC — IV/nonce reuse breaks GMAC.
- **HMAC works with any hash.** HMAC-SHA-256, HMAC-SHA-512. Wrong-answer pattern: claiming HMAC requires a specific hash — generic construction.

### Values without a direct public citation

| Cell | Notes |
|---|---|
| All rows × typical use | Use-case lists | NIST publications [s1, s2, s3] specify constructions but typical-use examples are industry-typical pairings. |

## Engine demo opportunities

- `HMAC | construction → ?` → `Hash function with key as input`
- `CMAC | construction → ?` → `Block cipher in CBC-MAC variant`
- `GMAC | construction → ?` → `GCM authentication-only mode`
- `Poly1305 | construction → ?` → `Universal-hash MAC paired with stream cipher`
- `? | typical use → ChaCha20-Poly1305 in TLS` → `Poly1305` (sub-Fact in multi-Fact cell)
- `? | construction → Hash function with key as input` → `HMAC`
- Composite HMAC Row with `construction` swapped to `Block cipher in CBC-MAC variant` — directly tests the HMAC-vs-CMAC distinction (HMAC builds on hash; CMAC builds on block cipher)
- Composite GMAC Row with `key dependency` swapped to `One symmetric key shared between sender and verifier` (without IV) — tests the GMAC nonce requirement (GMAC requires both a key and a unique IV per message)
- Composite Poly1305 Row with `construction` swapped to `GCM authentication-only mode` — tests Poly1305 vs GMAC (both are authentication-focused but Poly1305 is Wegman-Carter; GMAC is GCM-derived)

## Sources

- `[s1]`: NIST FIPS 198-1, "The Keyed-Hash Message Authentication Code (HMAC)" (July 2008, retrieved 2026-04-26, https://csrc.nist.gov/publications/detail/fips/198/1/final)
- `[s2]`: NIST SP 800-38B, "Recommendation for Block Cipher Modes of Operation: The CMAC Mode for Authentication" (May 2005, retrieved 2026-04-26, https://csrc.nist.gov/publications/detail/sp/800-38b/final)
- `[s3]`: NIST SP 800-38D, "Recommendation for Block Cipher Modes of Operation: Galois/Counter Mode (GCM) and GMAC" (November 2007, retrieved 2026-04-26, https://csrc.nist.gov/publications/detail/sp/800-38d/final)
- `[s4]`: RFC 8439, "ChaCha20 and Poly1305 for IETF Protocols" (June 2018, retrieved 2026-04-26, https://datatracker.ietf.org/doc/html/rfc8439)
