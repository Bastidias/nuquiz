# Social Engineering Tactics

**Domain:** 1 — Security and Risk Management &nbsp;|&nbsp; **Pattern:** Dimensions &nbsp;|&nbsp; **Tags:** 1.13, 7.7

**Status:** draft (SME review pending)

The eight social-engineering tactics CISSP candidates are expected to discriminate. Each pairs a *medium* (how the attacker contacts the target) with a *target characteristic*, a *distinguishing feature*, and a *primary defense*. Social engineering exploits human trust rather than technical vulnerabilities — it is the leading initial-access vector in modern intrusions and the top driver of security awareness training programs. Sibling Concept `password-attacks` in D5 covers phishing as a credential-attack class; this Concept covers the broader social-engineering family.

| Tactic | medium | target | distinguishing feature | primary defense |
|---|---|---|---|---|
| Phishing | Email [s1] | Mass audience [s1] | Generic lure to broad recipient list [s1] | User awareness<br>Email security gateway [s1] |
| Spear phishing | Email [s1] | Specific individual or small group [s1] | Personalized lure with target-specific context [s1] | Targeted user training<br>DMARC enforcement [s1] |
| Whaling | Email [s1] | Senior executives [s1] | Spear phishing aimed at high-value executives [s1] | Executive-specific awareness<br>Out-of-band verification |
| Vishing | Voice phone call [s1] | Individual at any level | Voice-based pretexting often impersonating IT or vendors [s1] | Caller verification<br>Out-of-band callback |
| Smishing | SMS text message | Individual at any level | Text-based lure with malicious link or callback number | Mobile-aware user training<br>Number-block lists |
| Pretexting | Phone<br>In-person<br>Email [s1] | Targeted individuals with specific information [s1] | Fabricated scenario establishing false trust before request [s1] | Verification procedures for sensitive requests |
| Baiting | Physical media<br>Web download [s1] | Targets motivated by curiosity or incentive [s1] | Malicious payload disguised as desirable item [s1] | Disable autorun<br>Endpoint detection<br>USB control |
| Tailgating | Physical entry [s1] | Anyone with badge or door access [s1] | Following authorized person through controlled entry [s1] | Mantraps<br>Guard challenge<br>Anti-tailgating policy [s1] |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. **No parentheticals in cells.** Acronym expansions live in this section.
- **Acronym expansions.** `BEC` = Business Email Compromise. `DMARC` = Domain-based Message Authentication, Reporting, and Conformance. `MFA` = Multi-Factor Authentication. `SET` = Social-Engineer Toolkit. `OSINT` = Open-Source Intelligence.
- **Phishing lineage.** Phishing → Spear phishing → Whaling are progressively-narrower targeting variants of the same email-based tactic. Phishing casts a wide net with a generic lure ("urgent: verify your password"). Spear phishing personalizes ("Hi $NAME, the $REAL_VENDOR contract you sent yesterday needs your signature"). Whaling targets the C-suite specifically ("CFO needs urgent wire transfer"). The escalation reflects the attacker's investment of OSINT effort against a higher-value target.
- **Vishing and Smishing are channel variants.** Vishing (voice phishing) uses a phone call. Smishing (SMS phishing) uses text messages. Both typically establish urgency and direct the target to a malicious link, phone number, or action (e.g., "Your bank account is compromised, call this number"). Both increasingly use AI-generated voices and deepfake personas. CISSP testing is increasingly aware of vishing and smishing as distinct from email phishing.
- **Pretexting is the umbrella technique.** A fabricated scenario establishing false trust is the *engine* under most social engineering. Vishing calls are pretexted ("I'm from IT, we detected a virus on your laptop"); spear phishing emails are pretexted ("Following up on our conversation last week"). The Pretexting row exists to call out the scenario-fabrication element specifically, even though it overlays other tactics.
- **Baiting exploits curiosity or incentive.** USB drops in parking lots (the canonical example), free software downloads with malware, "you've won a prize" lures. Once the target plugs in / downloads / clicks, malware executes. The Stuxnet operators are reported to have used USB drops as one infection vector. Modern baiting includes malicious browser extensions and fake software updates.
- **Quid pro quo (intentionally not a row).** Promises a service in exchange for information ("I can fix your computer if you give me your password"). Frequently overlaps with vishing and pretexting; rarely tested as a standalone CISSP category. Could be added as a future row if testing depth grows.
- **Tailgating is the physical-world tactic.** Following an authorized person through a controlled entry without using one's own credential. The "I'll just hold the door" social pressure makes the target reluctant to challenge. Mantraps (sibling Concept `access-controls` in D3) are the technical control; awareness training and explicit anti-tailgating policy ("never let someone through without their badge") are the behavioral controls.
- **Business Email Compromise is whaling-adjacent.** BEC fraud impersonates an executive or vendor to trick finance staff into wire transfers. The FBI Internet Crime Report consistently ranks BEC as the highest-loss cyber-fraud category — far exceeding ransomware in dollar terms. Modern BEC uses thread hijacking (replying within a real email thread the attacker has compromised) and AI-generated voice impersonation.
- **AI-augmented social engineering.** LLMs can generate fluent, contextually-appropriate phishing emails at scale. Voice cloning enables vishing impersonation of specific individuals (CEO voice clones authorizing wire transfers). Defenders increasingly use the same technologies to detect AI-generated content at the network edge. The arms race is active.
- **Cross-Concept link.** Sibling Concept `password-attacks` in D5 covers phishing as the canonical credential-theft technique. `mfa-methods` covers phishing-resistant MFA (FIDO2) that defeats real-time relay attacks. `email-authentication` in D4 covers SPF / DKIM / DMARC that prevents domain spoofing. `training-program-phases` and `training-audiences` in D1 cover the awareness training that addresses social engineering operationally.
- **Out of scope for this Concept:** specific phishing kits and infrastructure (Evilginx, Modlishka, GoPhish), AI-generated content detection, deepfake detection, browser-based protections (URL reputation, password managers warning on lookalike domains), specific BEC fraud variants (CEO fraud, payroll diversion, vendor invoice manipulation), pig-butchering / romance scams (a major fraud category but framed as personal rather than enterprise), CISA Stop Ransomware playbook social-engineering chapter.

### Tricky distractors

- **Phishing → Spear phishing → Whaling progression.** Same email tactic, increasingly narrow targeting. Wrong-answer pattern: claiming whaling is a separate technical mechanism — it's spear phishing aimed at executives.
- **Vishing vs Smishing.** Voice vs SMS. Wrong-answer pattern: collapsing them — different channels, different defenses.
- **Pretexting overlays other tactics.** Scenario fabrication is the engine, not a standalone tactic in most attacks. Wrong-answer pattern: treating pretexting as exclusive of vishing or spear phishing — they layer.
- **Baiting exploits curiosity.** USB drops, fake downloads. Wrong-answer pattern: classifying USB drops as physical attacks rather than social engineering — the social element is the lure.
- **Tailgating ≠ piggybacking.** Tailgating = unauthorized following. Piggybacking = authorized person knowingly lets unauthorized through. Wrong-answer pattern: claiming they're identical — piggybacking implies the authorized person's complicity.
- **BEC dollar losses exceed ransomware.** FBI IC3 report. Wrong-answer pattern: claiming ransomware is the top-cost cyber crime — BEC is structurally larger.
- **AI-generated phishing is at scale now.** LLM-fluent emails defeat grammar-based detection. Wrong-answer pattern: claiming poor English is a reliable phishing tell — increasingly false.

### Values without a direct public citation

| Cell | Value | Why unsourced |
|---|---|---|
| Smishing × all cells | — | NIST SP 800-50 [s1] and CISA guidance address phishing broadly; smishing-specific framings are pedagogical-consensus from CTI vendor reports rather than a single primary publication. |
| Whaling × primary defense | `Executive-specific awareness`, `Out-of-band verification` | Industry-standard framing; CISA and NIST cover concept without prescribing per-tactic defense lists with this exact phrasing. |
| Vishing × primary defense | `Caller verification`, `Out-of-band callback` | Same — practitioner consensus. |
| Pretexting × primary defense | `Verification procedures for sensitive requests` | Pedagogical summary. |

## Engine demo opportunities

- `Phishing | medium → ?` → `Email`
- `Vishing | medium → ?` → `Voice phone call`
- `Smishing | medium → ?` → `SMS text message`
- `? | medium → Physical entry` → `Tailgating`
- `? | target → Senior executives` → `Whaling`
- `Spear phishing | distinguishing feature → ?` → `Personalized lure with target-specific context`
- `Whaling | distinguishing feature → ?` → `Spear phishing aimed at high-value executives`
- `Baiting | distinguishing feature → ?` → `Malicious payload disguised as desirable item`
- `? | distinguishing feature → Following authorized person through controlled entry` → `Tailgating`
- `Phishing | primary defense → ?` → `User awareness`, `Email security gateway`
- Composite Phishing Row with `target` swapped to `Senior executives` (Whaling's value) — directly tests the phishing-vs-whaling targeting distinction
- Composite Spear phishing Row with `medium` swapped to `Voice phone call` — tests channel-vs-targeting distinction (spear phishing is email; vishing is voice)
- Composite Baiting Row with `distinguishing feature` swapped to `Following authorized person through controlled entry` — tests baiting-vs-tailgating (baiting uses lures; tailgating uses physical proximity)

## Sources

- `[s1]`: NIST SP 800-50 Rev 1, "Building a Cybersecurity and Privacy Learning Program" — social engineering as awareness-training topic (September 2024, retrieved 2026-04-30, https://csrc.nist.gov/publications/detail/sp/800-50/rev-1/final). Phishing-specific guidance via CISA Phishing Guidance (retrieved 2026-04-30, https://www.cisa.gov/topics/cyber-threats-and-advisories/phishing).
- `[s2]`: MITRE ATT&CK Initial Access tactic, particularly T1566 Phishing and T1566.001-004 sub-techniques (retrieved 2026-04-30, https://attack.mitre.org/techniques/T1566/). FBI Internet Crime Complaint Center annual reports — Business Email Compromise loss statistics (retrieved 2026-04-30, https://www.ic3.gov/AnnualReport/Reports)
- `[s3]`: (ISC)² CISSP Certification Exam Outline, effective 2024-04-15, Domain 1 §1.13 *Establish and maintain a security awareness, education, and training program* and Domain 7 §7.7 *Operate and maintain detective and preventive measures* (retrieved 2026-04-30, https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline)
