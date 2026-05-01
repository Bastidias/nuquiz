# Physical Detection Systems

**Domain:** 3 — Security Architecture and Engineering &nbsp;|&nbsp; **Pattern:** Dimensions &nbsp;|&nbsp; **Tags:** 3.9, 7.14
**Status:** draft (SME review pending)

The four physical detection systems CISSP courseware tests. Each pairs a *mechanism* with *typical placement* and *alerting* behavior. The CISSP exam tests both the matchup between detection technology and threat scenario and the principle that detection systems are *detective* controls (they identify intrusions in progress or after) — they must be paired with response capabilities to be useful.

| system | mechanism | typical placement | alerting |
|---|---|---|---|
| Motion detector | Detect movement via PIR or microwave [s1] | Interior rooms after hours [s1] | Alarm to monitoring center [s1] |
| Physical IDS | Detect intrusion via perimeter sensors [s1] | Building perimeter and entry points [s1] | Alarm to monitoring center [s1] |
| CCTV | Continuous video recording with optional analytics [s1] | Entries, lobbies, sensitive areas [s1] | Recording for review and optional motion alert [s1] |
| Tamper sensor | Detect physical interference with protected device [s1] | Server racks, safes, network equipment [s1] | Alarm on tamper event [s1] |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. No parentheticals in cells.
- **Tags 3.9 and 7.14 retained from stub.** Cross-tagged. Sibling Concept: `access-controls.md` (the access-side parallel).
- **Detection vs. prevention.** All four systems here are *detective* — they identify that something happened. They do not stop the intrusion. Pairing detection with response (security guards, lockdown procedures, automated alerts) converts detection into incident management.
- **PIR vs. microwave motion detection.** Passive Infrared (PIR) detects body-heat changes; microwave detects movement via radar return. PIR is cheaper and lower-false-positive but limited by line-of-sight. Microwave penetrates obstacles but has higher false positives (curtains moving, HVAC). Dual-technology sensors require both to trigger, reducing false positives.
- **CCTV evolution: passive recording to active analytics.** Traditional CCTV records continuously and is reviewed after incidents. Modern systems add motion-triggered recording (saves storage), object recognition (humans vs. animals vs. vehicles), behavior analytics (loitering detection), and facial recognition (privacy and accuracy concerns). Each step adds value but also complexity and false-positive risk.
- **Tamper sensors are the operational hardening control.** A sealed server rack with tamper switches alarms when opened. A safe with vibration sensors alarms on attempted forced entry. Network equipment with tamper-evident enclosures alarms (or zeroizes keys) when opened. Combine with chain-of-custody discipline for high-assurance environments.
- **Physical IDS.** Building-perimeter intrusion detection — fence sensors, glass-break detectors, door/window contacts, vibration sensors. Distinct from network IDS which monitors digital traffic. The physical version was the original meaning of "IDS" before the term was applied to network security.
- **False positive management.** All four systems generate false positives — wildlife triggering motion sensors, cleaning crews triggering door alarms, HVAC triggering microwave detectors. Mature programs tune sensitivity, deploy dual-technology sensors, and apply human review before triggering response actions. The cost of unmanaged false positives is operator desensitization (alarm fatigue).
- **Gaps marked `[needs source]`:** none — all Facts trace to ASIS physical-security framing.

### Tricky distractors

- **Detective, not preventive.** All four detect; pair with response. Wrong-answer pattern: classifying CCTV or tamper sensors as preventive — they detect.
- **PIR vs Microwave motion sensing.** Passive Infrared (heat) vs Microwave (radar). Wrong-answer pattern: collapsing motion sensor types — different technologies, different false-positive profiles.
- **Physical IDS ≠ Network IDS.** Different domains, same acronym. Wrong-answer pattern: applying network IDS framing to physical perimeter detection.
- **CCTV is detective; not deterrent alone.** Visible CCTV deters but doesn't prevent. Wrong-answer pattern: claiming CCTV alone is preventive — it records.
- **Tamper sensors zeroize keys in some HSMs.** Detection plus response. Wrong-answer pattern: treating all tamper sensors as alarm-only — high-assurance devices destroy keys.
- **Alarm fatigue is real.** False-positive management critical. Wrong-answer pattern: claiming more alarms = more security — unmanaged FPs desensitize operators.

## Engine demo opportunities

- `? | mechanism → Detect physical interference with protected device` → Tamper sensor
- `CCTV | typical placement → ?` → `Entries, lobbies, sensitive areas`
- `? | typical placement → Server racks, safes, network equipment` → Tamper sensor
- `Motion detector | mechanism → ?` → `Detect movement via PIR or microwave`
- Cross-Row shared-Value detection: `? | alerting → Alarm to monitoring center` → Motion detector, Physical IDS
- Composite Row profile: CCTV across all Columns with `alerting` swapped to `Alarm on tamper event` (Tamper sensor's value)

## Sources

- `[s1]`: ASIS International *Protection of Assets: Physical Security* — physical detection system framing (retrieved 2026-04-26, https://www.asisonline.org/publications--resources/standards--guidelines/)
- `[s2]`: (ISC)² CISSP Certification Exam Outline, effective 2024-04-15, Domain 3 §3.9 and Domain 7 §7.14 (retrieved 2026-04-26, https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline)
