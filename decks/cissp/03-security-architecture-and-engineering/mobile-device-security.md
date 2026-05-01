# Mobile Device Deployment Models

**Domain:** 3 — Security Architecture and Engineering &nbsp;|&nbsp; **Pattern:** Dimensions &nbsp;|&nbsp; **Tags:** 3.5

**Status:** draft (SME review pending)

The four enterprise mobile-device deployment models CISSP candidates are expected to discriminate. Each pairs *who owns the device* with *who manages it*, the *privacy trade-off* for the user, and the *typical management posture*. The exam tests both the per-model definition and the matchup between scenario and appropriate model — particularly that BYOD shifts privacy concerns to the employee while COBO maximizes employer control. NIST SP 800-124 Rev 2 [s1] is the primary reference.

| Model | who owns device | who manages device | privacy trade-off | typical management |
|---|---|---|---|---|
| BYOD | Employee | Employer manages work container only [s1] | Employer separates work data without inspecting personal data [s1] | MAM with work profile [s1] |
| COPE | Employer [s1] | Employer manages full device [s1] | Personal use permitted but employer can inspect [s1] | MDM with personal-use policy [s1] |
| COBO | Employer [s1] | Employer manages and locks down [s1] | No personal use permitted [s1] | MDM with strict allowlist [s1] |
| CYOD | Employer [s1] | Employer manages from approved catalog [s1] | Like COPE but device choice limited to corporate-approved list [s1] | MDM with catalog-restricted procurement [s1] |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. **No parentheticals in cells.** Acronym expansions live in this section.
- **Acronym expansions.** `BYOD` = Bring Your Own Device. `COPE` = Corporate-Owned, Personally Enabled. `COBO` = Corporate-Owned, Business-Only. `CYOD` = Choose Your Own Device. `MDM` = Mobile Device Management. `MAM` = Mobile Application Management. `MTD` = Mobile Threat Defense. `EMM` = Enterprise Mobility Management (umbrella term covering MDM + MAM + MTD).
- **Ownership and management are independent axes.** Ownership = who paid for the device and holds title. Management = who configures security policy and can wipe it. BYOD has employee ownership with limited employer management; COBO has employer ownership with full employer management. The four models cover the practical permutations enterprises use.
- **MDM vs MAM.** MDM manages the *device* (passcode policy, OS update enforcement, remote wipe, app installation control). MAM manages *applications* on devices the employer doesn't fully control (containerize work apps, enforce data-loss prevention within the container, wipe only the work container). MAM is the canonical BYOD control because it leaves personal data untouched.
- **The privacy trade-off is the BYOD test favorite.** Employees on BYOD want to keep personal photos, messages, and apps private from the employer. Employers want to enforce security on the device that handles corporate email and data. MAM containers (Microsoft Intune App Protection, Android Work Profile, iOS Managed Apps) draw the boundary — employer can wipe work data without touching personal data, and cannot read personal content. CISSP testing frames this as the privacy / control trade-off that drives BYOD design.
- **COPE allows personal use; COBO does not.** A COPE phone is the employee's primary phone — the employer issued it but personal email, social media, and family photos are permitted. A COBO phone is locked to business use only — sometimes called "kiosk mode" for shared-device deployments (warehouse scanners, retail POS). The privacy implications differ accordingly.
- **CYOD is COPE with constrained device choice.** The employer publishes a catalog (e.g., "iPhone 15, iPhone 15 Pro, Samsung Galaxy S24, Pixel 8") and the employee picks. Reduces device-fragmentation cost while preserving some employee preference. The management model is the same as COPE; the difference is procurement.
- **Mobile-specific threats.** Jailbreaking (iOS) and rooting (Android) bypass platform security and let the user install unsigned apps; MDM detects and blocks these states. Sideloading apps from outside the official store risks malware. Mobile phishing (smishing) and malicious app stores are top mobile-specific attacks. NIST SP 800-124 Rev 2 [s1] enumerates mobile threat categories.
- **Cross-Concept link.** Sibling Concept `mfa-methods` in D5 covers mobile-app-based MFA (push notification, TOTP). `cellular-generations` covers the underlying network security. `cloud-service-models` covers the SaaS apps mobile devices typically connect to. `data-classification-handling` covers what data classes are appropriate for which deployment model.
- **Out of scope for this Concept:** specific MDM/MAM products (Microsoft Intune, VMware Workspace ONE, Jamf, Google Workspace device management), iOS Supervised Mode and Android Enterprise modes in detail, app vetting frameworks (NIAP, NIST app vetting), mobile threat-defense agents, mobile forensics, mobile-application security testing (covered indirectly in `source-code-analysis-types` in D8), 5G-specific mobile network security.

### Tricky distractors

- **BYOD ≠ unmanaged.** BYOD uses MAM to manage work apps without managing the whole device. Wrong-answer pattern: claiming BYOD means no enterprise control — opposite, MAM exists specifically for BYOD.
- **COBO has no personal use.** Locked-down corporate device. Wrong-answer pattern: claiming COBO allows personal email — that's COPE.
- **MDM ≠ MAM.** MDM manages devices; MAM manages apps. Wrong-answer pattern: collapsing them — MAM is the BYOD-friendly subset.
- **CYOD is not BYOD.** Employer owns and manages; employee chooses from catalog. Wrong-answer pattern: confusing CYOD ownership — employer owns CYOD devices.
- **Privacy trade-off varies by model.** BYOD = employer can't see personal data. COPE = employer can inspect. Wrong-answer pattern: claiming all enterprise mobile management has equivalent privacy posture.
- **Jailbreak/root detection is MDM-mandated.** Bypasses platform security. Wrong-answer pattern: claiming jailbroken devices are acceptable in BYOD if user accepts the risk — MDM must block.

### Values without a direct public citation

| Cell | Value | Why unsourced |
|---|---|---|
| All rows × privacy trade-off | Privacy-posture phrasings | NIST SP 800-124 [s1] discusses the trade-offs broadly; specific cell phrasings are pedagogical summaries rather than direct quotations. |
| All rows × typical management | Management framings | Industry-standard MDM/MAM product capability; not enumerated per-deployment-model in NIST or CIS publications with this exact phrasing. |
| CYOD × all cells | — | NIST SP 800-124 [s1] covers BYOD, COPE, COBO directly; CYOD is industry-convention terminology overlapping with COPE-with-catalog-restriction. Cell values reflect practitioner consensus. |

## Engine demo opportunities

- `BYOD | who owns device → ?` → `Employee`
- `COPE | who owns device → ?` → `Employer`
- `COBO | typical management → ?` → `MDM with strict allowlist`
- `? | who owns device → Employee` → `BYOD`
- `? | typical management → MAM with work profile` → `BYOD`
- `? | privacy trade-off → No personal use permitted` → `COBO`
- `? | privacy trade-off → Employer separates work data without inspecting personal data` → `BYOD`
- `CYOD | typical management → ?` → `MDM with catalog-restricted procurement`
- Composite BYOD Row with `who owns device` swapped to `Employer` — directly tests the BYOD ownership axis (employee owns BYOD; employer owns the others)
- Composite COPE Row with `privacy trade-off` swapped to `No personal use permitted` (COBO's value) — tests COPE-vs-COBO distinction (COPE allows personal use; COBO does not)
- Composite COBO Row with `typical management` swapped to `MAM with work profile` (BYOD's value) — tests management-model pairing (MAM is BYOD; COBO uses full MDM)

## Sources

- `[s1]`: NIST SP 800-124 Rev 2, "Guidelines for Managing the Security of Mobile Devices in the Enterprise" — BYOD, COPE, COBO deployment models and threat framework (May 2023, retrieved 2026-04-30, https://csrc.nist.gov/publications/detail/sp/800-124/rev-2/final)
- `[s2]`: NIST SP 1800-22, "Mobile Device Security: Bring Your Own Device (BYOD)" — practical BYOD reference architecture (September 2023, retrieved 2026-04-30, https://www.nccoe.nist.gov/projects/mobile-device-security-bring-your-own-device-byod)
- `[s3]`: (ISC)² CISSP Certification Exam Outline, effective 2024-04-15, Domain 3 §3.5 *Assess and mitigate the vulnerabilities of security architectures, designs, and solution elements* (retrieved 2026-04-30, https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline)
