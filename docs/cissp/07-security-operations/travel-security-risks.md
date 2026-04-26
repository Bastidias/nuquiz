# Travel Security Risks

**Domain:** 7 — Security Operations &nbsp;|&nbsp; **Pattern:** Dimensions &nbsp;|&nbsp; **Tags:** 7.15
**Status:** draft (SME review pending)

The four risk categories that travel-security programs address when staff travel internationally on behalf of the organization. Espionage and theft are *information / asset* risks; health emergencies and geopolitical instability are *personnel* risks. Each pairs a *typical control* with a *pre-travel briefing topic* so the traveler is prepared rather than reactive. The CISSP exam tests the matchup between risk category and the specific control that mitigates it — particularly the burner-device control for espionage-prone destinations.

| risk | typical control | pre-travel briefing |
|---|---|---|
| Espionage | Burner devices for sensitive destinations [s2] | Brief on hotel-room electronic surveillance risk [s2] |
| Theft | Hotel-room safe for valuables [needs source]<br>Anti-theft bag [needs source] | Brief on common theft tactics for destination [needs source] |
| Health emergencies | International medical insurance [s1] | Brief on local medical facilities [s1] |
| Geopolitical instability | Embassy registration before travel [s1]<br>Communication plan with home office [s1] | Brief on current State Department advisories [s1] |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. No parentheticals in cells.
- **Tag 7.15 retained from stub.** Matches (ISC)² 2024 outline §7.15 *Address personnel safety and security concerns*. Sibling Concept: `personnel-safety-controls.md` (which covers travel security as a high-level control category; this Concept enumerates specific risks).
- **Why burner devices for espionage.** In destinations where state-level adversaries routinely target traveler devices (border-crossing inspection, hotel-room implant placement, malicious public Wi-Fi, hardware tampering), the safest control is to take a device that *contains nothing sensitive* and discard or wipe it on return. The traveler's regular laptop / phone stays home. This is a documented practice for executives traveling to threat-intelligence-flagged destinations.
- **Hotel-room electronic surveillance is the test-favorite espionage Fact.** Hotel-room devices, room safes, and TVs in some jurisdictions can be assumed to be monitored. Pre-travel briefings cover this so travelers do not discuss sensitive matters in-room and do not store sensitive materials in hotel safes (which can be opened by hotel staff).
- **Embassy registration is the canonical geopolitical-instability control.** The U.S. State Department's STEP (Smart Traveler Enrollment Program) is the U.S. example; most countries have an analog. Registration tells the embassy you are in-country so they can contact you in an evacuation scenario or relay messages from home. Many corporate travel programs require it.
- **Health emergencies often require dedicated insurance.** Domestic health insurance frequently does not cover international care, and international care often requires payment up front. Specialized travel medical insurance with evacuation coverage is the standard control. The pre-travel briefing should cover the local healthcare system's payment expectations.
- **Why "geopolitical instability" rather than specific scenarios.** This row aggregates riots, coups, war, terrorist incidents, and severe civil unrest into one category because the *control set* (registration, communication plan, advisory monitoring) is largely the same across them. Specific scenario types could be broken into sub-rows in a future revision if the question bank requires finer-grained distractors.
- **Gaps marked `[needs source]`:** four Facts — the entire Theft row except the briefing topic. Travel theft controls are widely practiced but live in corporate-security and travel-industry guidance rather than NIST-style primary publications.

## Engine demo opportunities

- `? | typical control → Burner devices for sensitive destinations` → Espionage
- `Theft | typical control → ?` → `Hotel-room safe for valuables` or `Anti-theft bag`
- `? | pre-travel briefing → Brief on current State Department advisories` → Geopolitical instability
- `Health emergencies | typical control → ?` → `International medical insurance`
- `Espionage | pre-travel briefing → ?` with `Brief on local medical facilities` (Health) and `Brief on common theft tactics for destination` (Theft) as distractors
- Composite Row profile: Espionage across all Columns with `typical control` swapped to `Embassy registration before travel` (Geopolitical instability's value)

## Sources

- `[s1]`: U.S. Department of State *Travelers' Checklist* and Smart Traveler Enrollment Program (STEP) (retrieved 2026-04-25, https://travel.state.gov/content/travel/en/international-travel/before-you-go/travelers-checklist.html)
- `[s2]`: Corporate-security practitioner consensus on burner-device practice for high-risk destinations — composite of corporate-security and threat-intelligence vendor guidance (retrieved 2026-04-25)
- `[s3]`: (ISC)² CISSP Certification Exam Outline, effective 2024-04-15, Domain 7 §7.15 *Address personnel safety and security concerns* (retrieved 2026-04-25, https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline)
