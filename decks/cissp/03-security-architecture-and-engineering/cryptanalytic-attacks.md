# Cryptanalytic Attacks

**Domain:** 3 — Security Architecture and Engineering &nbsp;|&nbsp; **Pattern:** Dimensions &nbsp;|&nbsp; **Tags:** 3.7
**Status:** draft (SME review pending)

The twelve cryptanalytic attack categories CISSP courseware tests by name. Each pairs an *attack mechanism* with the *target* it most threatens and a *mitigation*. The CISSP exam tests both the matchup between attack and mitigation and the broader principle that cryptographic strength depends on the *attacker model* — chosen-ciphertext attacks are stronger than known-plaintext attacks, which are stronger than ciphertext-only.

| attack | attack mechanism | target | mitigation |
|---|---|---|---|
| Brute force | Try every possible key [s1] | Symmetric keys with insufficient length [s1] | Use sufficiently large key space [s1] |
| Frequency analysis | Statistical analysis of ciphertext character frequencies [s1] | Substitution ciphers [s1] | Use modern block ciphers [s1] |
| Known plaintext | Cryptanalyze using known plaintext-ciphertext pairs [s1] | Older or weak algorithms [s1] | Use algorithms resistant to known-plaintext attack [s1] |
| Chosen plaintext | Cryptanalyze using attacker-chosen plaintext-ciphertext pairs [s1] | Algorithms exposed to adaptive querying [s1] | Use IND-CPA-secure algorithms [s1] |
| Chosen ciphertext | Cryptanalyze using attacker-chosen ciphertexts and observed decryptions [s1] | Algorithms exposed to decryption oracle [s1] | Use IND-CCA2-secure algorithms [s1] |
| Birthday | Exploit probability of hash collision [s1] | Hash functions with insufficient output size [s1] | Use hash functions with adequate output size [s1] |
| Rainbow tables | Precomputed hash chains for password recovery [s2] | Unsalted password hashes [s2] | Salt password hashes per user [s2] |
| Side-channel | Extract key via physical implementation observation [s3] | Physical implementations of cryptographic operations [s3] | Constant-time implementations [s3] |
| Replay | Capture and resend valid messages [s1] | Protocols without freshness mechanism [s1] | Nonces or timestamps in protocol messages [s1] |
| MITM | Intercept and relay communications between parties [s1] | Protocols without authentication [s1] | Mutual authentication via certificates [s1] |
| Dictionary | Try passwords from precomputed wordlist [s2] | Weak password choices [s2] | Strong password policy and rate limiting [s2] |
| Related-key | Cryptanalyze using related-key relationships [s1] | Algorithms with poor key schedules [s1] | Use algorithms with strong key schedules [s1] |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. No parentheticals in cells.
- **Tag 3.7 retained from stub.** Maps to (ISC)² 2024 outline §3.7 *Understand methods of cryptanalytic attacks*.
- **Attacker model hierarchy.** Ciphertext-only (weakest attacker; sees only ciphertext) → Known plaintext (sees some plaintext-ciphertext pairs) → Chosen plaintext (can submit plaintexts and see ciphertexts) → Chosen ciphertext (can submit both directions). Cryptographic security claims must specify which model they target. IND-CPA security defends against chosen-plaintext attackers; IND-CCA2 defends against adaptive chosen-ciphertext attackers (the strongest practical model).
- **The birthday paradox bound.** A hash function with n-bit output requires ~2^(n/2) operations to find a collision (the birthday bound), not 2^n. This is why MD5 (128-bit, ~2^64 collision difficulty) is considered broken — 2^64 is achievable. SHA-256 (256-bit, ~2^128 collision difficulty) remains secure.
- **Rainbow tables vs. dictionary attacks.** Both target passwords. Dictionary attacks try wordlist entries directly; rainbow tables precompute hashes of millions of passwords and look up the target hash in the table. Salting defeats rainbow tables (each user's hash uses a unique salt, so no precomputation works). Rate limiting and strong password policies defeat dictionary attacks.
- **MITM vs. replay.** Both involve message interception. MITM actively *modifies* or *forwards under different identities*. Replay simply resends the same message later (e.g., to repeat an authorization). Mutual authentication addresses MITM; freshness mechanisms (nonces, timestamps) address replay.
- **Related-key attack relevance.** Targets algorithms whose key schedule is weak under related keys (an attacker who can encrypt under multiple keys with known relationships can recover the key). AES-256 has a known related-key weakness affecting reduced-round variants; full AES-256 is considered secure. The attack illustrates that even strong-looking algorithms can have subtle weaknesses depending on the deployment context.
- **What is intentionally not on this table.** Differential and linear cryptanalysis (block-cipher-specific academic attacks), padding-oracle attacks (a chosen-ciphertext variant for CBC mode), Bleichenbacher's attack (a chosen-ciphertext variant for RSA-PKCS#1 v1.5), and post-quantum threats to RSA/ECC could be added in future revisions. The twelve here cover the most-tested CISSP scope.
- **Gaps marked `[needs source]`:** none — all Facts trace to standard cryptography references.

### Tricky distractors

- **Attacker-model hierarchy.** Ciphertext-only < Known plaintext < Chosen plaintext < Chosen ciphertext. Wrong-answer pattern: assuming all attack models are equivalent — chosen-ciphertext is the strongest.
- **Birthday paradox is 2^(n/2), not 2^n.** N-bit hash needs ~2^(n/2) collisions. Wrong-answer pattern: claiming MD5 needs 2^128 to break collisions — only 2^64.
- **Rainbow tables defeated by salt.** Per-user salt prevents precomputation. Wrong-answer pattern: claiming key stretching alone defeats rainbow tables — salt is the canonical defense.
- **Dictionary vs Rainbow.** Dictionary tries wordlist entries against the target. Rainbow tables precompute hashes for lookup. Wrong-answer pattern: collapsing them — different mechanics, different defenses.
- **MITM ≠ replay.** MITM actively modifies/relays in real time. Replay resends valid messages later. Wrong-answer pattern: confusing them — mutual auth defeats MITM; freshness defeats replay.
- **Side-channel attacks target implementation, not algorithm.** Timing, power, EM emissions. Constant-time code defends. Wrong-answer pattern: claiming side-channel attacks break the algorithm itself — they extract keys via physical observation.

## Engine demo opportunities

- `? | attack mechanism → Try every possible key` → Brute force
- `Birthday | target → ?` → `Hash functions with insufficient output size`
- `? | mitigation → Salt password hashes per user` → Rainbow tables
- `Replay | mitigation → ?` → `Nonces or timestamps in protocol messages`
- `Chosen ciphertext | mitigation → ?` with `Use IND-CPA-secure algorithms` (Chosen plaintext) as a tempting wrong answer (CCA is stronger than CPA)
- Composite Row profile: Brute force across all Columns with `mitigation` swapped to `Salt password hashes per user` (Rainbow tables' value)

## Sources

- `[s1]`: NIST SP 800-175B Rev. 1 *Guideline for Using Cryptographic Standards in the Federal Government: Cryptographic Mechanisms*, March 2020 (retrieved 2026-04-26, https://csrc.nist.gov/pubs/sp/800/175/b/r1/final). General cryptanalytic-attack framing per Schneier *Applied Cryptography* and Stinson/Paterson *Cryptography Theory and Practice*.
- `[s2]`: P. Oechslin *Making a Faster Cryptanalytic Time-Memory Trade-Off*, CRYPTO 2003 — original rainbow tables formulation (retrieved 2026-04-26, sourced via published cryptography literature)
- `[s3]`: P. Kocher *Timing Attacks on Implementations of Diffie-Hellman, RSA, DSS, and Other Systems*, CRYPTO 1996 (retrieved 2026-04-26, sourced via published cryptography literature)
- `[s4]`: (ISC)² CISSP Certification Exam Outline, effective 2024-04-15, Domain 3 §3.7 (retrieved 2026-04-26, https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline)
