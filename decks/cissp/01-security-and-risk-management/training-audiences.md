# Training Audiences

**Domain:** 1 — Security and Risk Management &nbsp;|&nbsp; **Pattern:** Dimensions &nbsp;|&nbsp; **Tags:** 1.13
**Status:** draft (SME review pending)

The five distinct audiences a security awareness, education, and training program must address. Each audience needs different *content focus* (what they need to know), *frequency* (how often they need refresh), and *delivery method* (how the training reaches them). The CISSP exam tests both the per-audience matching and the principle that one-size-fits-all training fails because the audiences need different things.

| audience | content focus | frequency | delivery method |
|---|---|---|---|
| General user | Awareness of common threats and policies [s1] | Annually with periodic phishing simulation [s1] | Computer-based training [s1] |
| Privileged user | Secure administration and elevated-access risks [s1] | Annually plus role-change refreshers [s1] | Hands-on technical training [s1] |
| Executive | Strategic risk and governance responsibilities [s1] | Annually [s1] | Briefing or tabletop exercise [s1] |
| Developer | Secure coding practices and OWASP-style risks [s1] | Annually plus on-tool integration [s1] | Code labs and tool-integrated training [s1] |
| Incident responder | Forensic procedures and IR playbooks [s1] | Quarterly with exercise rotation [s1] | Tabletop and live-fire exercises [s1] |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. No parentheticals in cells.
- **Tag 1.13 retained from stub.** Maps to (ISC)² 2024 outline §1.13 *Establish and maintain a security awareness, education, and training program*. Sibling Concept: `training-program-phases.md` (the program lifecycle).
- **Awareness vs. training vs. education.** NIST SP 800-50 distinguishes three: *awareness* (changes attitude — "be vigilant"), *training* (changes skill — "do this thing"), *education* (changes capability — "understand this domain"). General users get awareness; privileged users and developers get training; executives often get awareness in briefing format. The Concept conflates these in its single column header but the distinction is testable.
- **Frequency is risk-tiered.** General users get annual awareness; high-risk roles (privileged users, IR) get more. Phishing simulations for general users typically run monthly or quarterly (separate from formal training) to maintain vigilance between annual sessions.
- **Privileged users carry more risk per person.** A compromised general user typically affects that user's data; a compromised privileged user can affect the whole organization. The training depth must match — privileged users need to know not just *what* the policies say but *how* to administer systems securely.
- **Executive training is briefing-style.** Executives are time-poor, hold accountability without operational responsibility, and need to make resource-allocation decisions. Their training is shorter, higher-level, and frequently delivered as part of board updates, retreats, or tabletop exercises. The risk angle (not the technical angle) is what they need.
- **Developer training has the highest tool-integration value.** Pure-classroom secure-coding training fades quickly. The most effective developer training is integrated into the daily tooling — IDE plugins flagging risky patterns, CI/CD scanners surfacing OWASP issues, code reviews coaching on security idioms. The Concept calls this out as "on-tool integration."
- **IR training requires exercise rotation.** Tabletop exercises (discussion-based) build muscle memory at low cost; live-fire exercises (real systems, real tools, fake adversary) test the muscle memory under pressure. IR teams need both, rotated through the year so different scenarios get exercised. Quarterly cadence is the test-favored frequency.
- **Gaps marked `[needs source]`:** none — all Facts trace to NIST SP 800-50 / SP 800-181 (NICE Framework) framing.

### Tricky distractors

- **Awareness vs Training vs Education.** Awareness changes attitude; Training changes skill; Education changes capability. Wrong-answer pattern: collapsing them — different program goals.
- **Privileged users need more frequent training.** Higher per-person risk. Wrong-answer pattern: applying same annual cadence — privileged needs role-change refreshers.
- **Executive training is briefing-style.** Time-constrained, risk-focused. Wrong-answer pattern: claiming executives need full technical training — they need decision-grade summary.
- **Developer training works best tool-integrated.** IDE plugins, CI/CD scanners. Wrong-answer pattern: claiming classroom secure-coding training is sufficient — fades fast without tool reinforcement.
- **IR teams rotate exercise types.** Tabletop + live-fire. Wrong-answer pattern: claiming one exercise type is enough — both build different capabilities.
- **One-size-fits-all training fails.** Different audiences, different needs. Wrong-answer pattern: deploying single training body for all roles — the explicit failure mode this Concept addresses.

## Engine demo opportunities

- `? | content focus → Strategic risk and governance responsibilities` → Executive
- `Privileged user | frequency → ?` → `Annually plus role-change refreshers`
- `? | delivery method → Computer-based training` → General user
- `Incident responder | frequency → ?` → `Quarterly with exercise rotation`
- Cross-Row distractor: `Executive | content focus → ?` with `Secure coding practices and OWASP-style risks` (Developer) and `Forensic procedures and IR playbooks` (IR) as distractors
- Composite Row profile: Executive across all Columns with `delivery method` swapped to `Code labs and tool-integrated training` (Developer's value)

## Sources

- `[s1]`: NIST SP 800-50 *Building an Information Technology Security Awareness and Training Program*, October 2003 (retrieved 2026-04-26, https://csrc.nist.gov/pubs/sp/800/50/final). NIST SP 800-181 Rev. 1 *Workforce Framework for Cybersecurity (NICE Framework)* for role-based training scope (retrieved 2026-04-26, https://csrc.nist.gov/pubs/sp/800/181/r1/final)
- `[s2]`: (ISC)² CISSP Certification Exam Outline, effective 2024-04-15, Domain 1 §1.13 (retrieved 2026-04-26, https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline)
