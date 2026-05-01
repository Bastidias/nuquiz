# Honeypot Types

**Domain:** 7 — Security Operations &nbsp;|&nbsp; **Pattern:** Dimensions &nbsp;|&nbsp; **Tags:** 7.7
**Status:** draft (SME review pending)

The four canonical deception-technology variants, ranging from a single decoy file (honeytoken) to a full network of interconnected honey-systems (honeynet). Each trades off *deception depth* against *operational risk*: a more convincing honeypot engages attackers longer and yields better intelligence, but it also gives the attacker more to compromise. The CISSP exam tests both the categorization and the specific risk profile each type carries.

| type | depth of deception | attacker engagement | risk |
|---|---|---|---|
| Low-interaction | Emulates only common services [s2] | Limited interaction surface [s2] | Low risk of attacker pivoting from honeypot [s2] |
| High-interaction | Simulates full production system [s2] | Deep attacker interaction with real services [s2] | High risk of compromise becoming a pivot point [s2] |
| Honeynet | Network of interconnected honeypots [s1] | Multi-host attacker engagement [s1] | Requires honeywall to contain attacker traffic [s1] |
| Honeytoken | Single decoy data artifact [s2] | Trigger-only on access [s2] | Minimal risk by construction [s2] |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. No parentheticals in cells.
- **Tag 7.7 retained from stub.** Matches (ISC)² 2024 outline §7.7 *Operate and maintain detective and preventative measures*. Sibling Concepts under §7.7: `anti-malware-technologies.md`, `ids-ips-types.md`.
- **Why these four rows.** Lance Spitzner's foundational taxonomy (via the Honeynet Project) recognizes low-interaction vs. high-interaction as the *interaction depth* axis and adds honeynet (multi-host) and honeytoken (data-only) as orthogonal categories [s1]. Some references add a *medium-interaction* row between low and high; this Concept keeps to four to match the stub and the most-tested CISSP framing.
- **Honeytoken is fundamentally different.** A honeytoken is not a computer at all — it is a piece of decoy data (a fake credit card number, a fake credential, a marked database row). Any access to it indicates malicious activity. It cannot itself be "compromised" in the way a host honeypot can; the risk profile is therefore minimal, and it scales to monitor uses where deploying a full honeypot would be impractical (e.g., inside a database).
- **Honeywall is the containment, not the honeypot.** The honeynet's "honeywall" is a gateway that records all traffic in and out of the honeynet and prevents the honeypot from being used to attack outside systems. Without it, a high-interaction honeynet is a liability. The honeywall itself is not a row here; it is the operational requirement that comes with a honeynet deployment.
- **Why high-interaction is a pivot risk.** A high-interaction honeypot runs real services on a real OS. If the attacker fully compromises it, they gain a real foothold from which to attack the production network. Network segmentation and the honeywall are the two compensating controls; deploying a high-interaction honeypot without both is the canonical CISSP wrong-answer scenario.
- **Legal considerations (intentionally not a row).** Entrapment and wiretap-law concerns surround honeypot deployment, particularly in jurisdictions where logging interaction may require notice. Out of scope for this Concept's risk column; would belong in a separate Concept on legal aspects of deception technology.
- **Gaps marked `[needs source]`:** none — all Facts trace to Spitzner / Honeynet Project framing or practitioner summaries.

### Tricky distractors

- **Honeytoken is data, not a host.** A fake credential or marked DB row. Wrong-answer pattern: classifying honeytokens alongside honeypot hosts — they're a different category.
- **High-interaction is a pivot risk.** Real OS, real services = real foothold if compromised. Wrong-answer pattern: claiming high-interaction has lower risk because it's better-monitored — opposite.
- **Honeywall contains the honeynet.** Without it, a honeynet endangers production. Wrong-answer pattern: deploying a honeynet without containment infrastructure.
- **Low-interaction emulates services.** Limited engagement; lower deception depth. Wrong-answer pattern: claiming low-interaction provides full attacker behavior intel — high-interaction does that.
- **Legal concerns include entrapment and wiretap law.** Out of scope here, but real. Wrong-answer pattern: deploying honeypots without legal review — jurisdictions vary.
- **Honeypot detection by attackers.** Sophisticated attackers fingerprint honeypots and avoid them. Wrong-answer pattern: claiming honeypots always engage attackers — they engage less-skilled attackers more reliably.

## Engine demo opportunities

- `? | depth of deception → Single decoy data artifact` → Honeytoken
- `High-interaction | risk → ?` → `High risk of compromise becoming a pivot point`
- `? | attacker engagement → Multi-host attacker engagement` → Honeynet
- `Low-interaction | depth of deception → ?` → `Emulates only common services`
- `Honeytoken | risk → ?` with `High risk of compromise becoming a pivot point` (High-interaction) and `Requires honeywall to contain attacker traffic` (Honeynet) as distractors
- Composite Row profile: Low-interaction across all Columns with `risk` swapped to `Requires honeywall to contain attacker traffic` (Honeynet's value)

## Sources

- `[s1]`: Lance Spitzner / Honeynet Project — foundational taxonomy of honeypot interaction levels and the honeynet concept (retrieved 2026-04-25, https://crysp.uwaterloo.ca/courses/cs458/W11-lectures/local/www.spitzner.net/honeypots.html)
- `[s2]`: *Honeypot (computing)* — Wikipedia consolidated reference plus Akamai vendor reference for low/medium/high interaction comparison (retrieved 2026-04-25, https://en.wikipedia.org/wiki/Honeypot_(computing) and https://www.akamai.com/blog/security/high-interaction-honeypot-versus-low-interaction-honeypot-comparison)
- `[s3]`: (ISC)² CISSP Certification Exam Outline, effective 2024-04-15, Domain 7 §7.7 *Operate and maintain detective and preventative measures* (retrieved 2026-04-25, https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline)
