# Password Attacks

**Domain:** 5 — Identity and Access Management &nbsp;|&nbsp; **Pattern:** Dimensions &nbsp;|&nbsp; **Tags:** 5.2
**Status:** draft (SME review pending)

The six password-attack classes CISSP candidates are expected to discriminate. The discriminating axes are (1) whether the attack targets an offline password hash or a live authentication service, (2) how the attacker selects candidate passwords (exhaustive vs dictionary vs precomputed vs breach-derived), and (3) the canonical defense. Online-only attacks (spraying, credential stuffing) are defeated by rate limiting and MFA; offline-hash attacks (brute force on hashes, rainbow tables) are defeated by slow salted hashes.

| Attack | target | mechanism | distinguishing feature | primary defense |
|---|---|---|---|---|
| Brute force | Offline hash<br>Live service | Try all possible inputs | Exhaustive search | Long passwords<br>Slow hashing |
| Dictionary | Offline hash<br>Live service | Try words from a dictionary | Common passwords tried first | Password complexity |
| Rainbow table | Offline hash | Precomputed hash-to-password lookup | Time-memory tradeoff | Salt [s2] |
| Credential stuffing | Live service | Replay breached username-password pairs | Breach-derived credentials | Breach-password blocklist<br>MFA |
| Password spraying | Live service | Try one common password against many accounts | Avoids per-account lockout | Distributed rate limiting |
| Phishing | User | Trick user into entering credentials on fake site | Social engineering | Phishing-resistant MFA |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. **No parentheticals in cells.** Tool names (Hashcat, John the Ripper, Reaver) and protocol-specific variants are covered in Notes, not smuggled into cells.
- **Offline vs online — the single most useful discriminator.** Offline attacks operate on a stolen hash database; they are not rate-limited by the authentication service, and the defender's only remaining controls are password length/entropy and the cost of the hash function. Online attacks hit a live service; they are rate-limited, can trigger lockout, and can be detected by failed-login monitoring. The `target` column captures this directly.
- **Brute force and dictionary attacks can be offline or online.** Both attack patterns work against either a live login form or a captured hash. The `target` column lists both possibilities because CISSP testing can frame either one. When testing-context matters, a dictionary attack against a live login form is nearly always online; against a leaked password database it is nearly always offline.
- **Rainbow tables are defeated by salt, not by hash slowness alone.** A rainbow table is a precomputed mapping from password to hash for a specific hash function. Adding a per-user salt [s2] makes every user's password hash unique, so a single rainbow table cannot cover multiple users — the attacker would need a separate rainbow table per salt. This is why CISSP teaches *salt* (not stretching, not peppering) as the canonical defense against rainbow tables.
- **Credential stuffing vs password spraying.** Credential stuffing replays full username-password pairs taken from a breach; the attacker assumes password reuse. Password spraying picks one or a few common passwords and tries them against *many* usernames; the attacker assumes someone on the target system is using a weak password. Both are online, both are hard to catch with per-account lockout alone (spraying specifically avoids lockout), and both are defeated fundamentally by MFA.
- **Phishing bypasses password strength entirely.** A perfectly strong, unique password is still compromised if the user types it into a fake site. The defense is not password policy — it is *phishing-resistant MFA* (FIDO2/WebAuthn security keys, platform authenticators bound to the origin), which mechanically refuse to authenticate to a look-alike domain because the cryptographic binding is to the origin, not to the appearance of the site.
- **Slow hashing defends against all offline attacks.** bcrypt, scrypt, Argon2 (and to a lesser extent PBKDF2) deliberately take significant CPU/memory per hash operation, multiplying the cost of brute-force and dictionary searches by thousands to millions. NIST SP 800-132 [s2] specifies PBKDF2 for password-based key derivation; NIST SP 800-63B endorses memorized-secret verifiers using "an approved key derivation function" (typically PBKDF2, or more modern choices like Argon2).
- **Out of scope for this Concept:** specific hashing algorithms (bcrypt vs Argon2 vs scrypt comparison — could be a `password-hashing-algorithms` Concept), password-policy specifics (length, rotation, composition), passwordless flows (FIDO2, WebAuthn, passkeys), credential-stuffing detection-and-response workflows, specific tool syntax (Hashcat, John the Ripper, Burp intruder).

### Tricky distractors

- **Salt defeats rainbow tables.** Per-user salt requires per-user rainbow table — infeasible. Wrong-answer pattern: claiming MFA defeats rainbow tables — MFA is for live-service attacks; salt is for offline.
- **Credential stuffing vs Password spraying.** Stuffing: full breached credential pairs (assumes reuse). Spraying: one password tried against many accounts (avoids lockout). Wrong-answer pattern: collapsing them.
- **Spraying defeats per-account lockout.** Slow distribution across accounts. Wrong-answer pattern: claiming standard account lockout stops spraying — distributed rate limiting is needed.
- **Phishing bypasses password strength.** Strong unique passwords still get phished. Wrong-answer pattern: claiming complexity requirements defeat phishing — only phishing-resistant MFA does.
- **Slow hashing fights offline attacks.** bcrypt, Argon2, scrypt. Wrong-answer pattern: claiming SHA-256 alone is enough for password storage — it's too fast.
- **Online vs offline target matters.** Online attacks face rate limits; offline attacks face only hash-cost. Wrong-answer pattern: applying online defenses (MFA, lockout) to offline-hash threats.

### Values without a direct public citation

| Cell | Value | Why unsourced |
|---|---|---|
| Brute force × all cells | — | Universal definition; no single canonical public citation traced. |
| Dictionary × all cells | — | Same. OWASP Authentication Cheat Sheet and NIST SP 800-63B describe dictionary resistance but do not name "dictionary attack" as a discrete class with these cells' framings. |
| Credential stuffing × all cells | — | OWASP has a credential-stuffing Cheat Sheet that would source this row; not directly fetched. |
| Password spraying × all cells | — | CISA advisories and MITRE ATT&CK T1110.003 would source this row; not directly fetched. |
| Phishing × all cells | — | MITRE ATT&CK T1566 would source this row; not directly fetched. Belongs more naturally in a D1/D7 social-engineering Concept but CISSP tests it as a credential-attack class too. |

## Engine demo opportunities

- `Rainbow table | primary defense → ?` → `Salt`
- `Credential stuffing | primary defense → ?` → `Breach-password blocklist`, `MFA`
- `? | target → Offline hash` → `Brute force`, `Dictionary`, `Rainbow table` — shared-Fact across multi-Fact cells
- `? | target → Live service` → `Brute force`, `Dictionary`, `Credential stuffing`, `Password spraying` — shared-Fact across multi-Fact and single-Fact cells
- `? | distinguishing feature → Time-memory tradeoff` → `Rainbow table`
- `Phishing | primary defense → ?` → `Phishing-resistant MFA`
- `Password spraying | mechanism → ?` → `Try one common password against many accounts`
- Composite Rainbow table Row with `primary defense` swapped to `MFA` — tests the "salt defeats rainbow tables, MFA defeats live-service attacks" discriminator (MFA does nothing against an offline rainbow table; salt does)
- Composite Credential stuffing Row with `target` swapped to `Offline hash` — tests that credential stuffing is a *live-service* attack (it replays already-cracked credentials)
- Composite Phishing Row with `primary defense` swapped to `Password complexity` — tests that phishing bypasses password strength entirely

## Sources

- `[s1]`: NIST SP 800-63B, "Digital Identity Guidelines: Authentication and Lifecycle Management" — password/memorized-secret guidance (June 2017, retrieved 2026-04-19, https://pages.nist.gov/800-63-3/sp800-63b.html)
- `[s2]`: NIST SP 800-132, "Recommendation for Password-Based Key Derivation" — salted password hashing reference (December 2010, retrieved 2026-04-19, https://csrc.nist.gov/publications/detail/sp/800-132/final)
- `[s3]`: OWASP Authentication Cheat Sheet — general reference for password-attack classes and defenses (retrieved 2026-04-19, https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html)
