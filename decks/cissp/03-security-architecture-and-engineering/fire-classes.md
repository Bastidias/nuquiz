# Fire Classes

**Domain:** 3 — Security Architecture and Engineering &nbsp;|&nbsp; **Pattern:** Dimensions &nbsp;|&nbsp; **Tags:** 3.9, 7.14
**Status:** draft (SME review pending)

The five U.S. fire classification categories per NFPA 10. Each pairs a *fuel type* with a typical *example* and the *appropriate suppression* method. The CISSP exam tests both the per-class characterization and the matchup between fire class and suppression method — particularly that water is harmful for Class C (electrical) and Class D (combustible metals).

| class | fuel type | example | appropriate suppression |
|---|---|---|---|
| Class A | Ordinary combustibles [s1] | Wood [s1]<br>Paper [s1]<br>Cloth [s1] | Water or dry chemical [s1] |
| Class B | Flammable liquids and gases [s1] | Gasoline [s1]<br>Oil [s1]<br>Propane [s1] | Foam or dry chemical or CO2 [s1] |
| Class C | Energized electrical equipment [s1] | Live wiring [s1]<br>Powered electronics [s1] | Non-conductive agents like CO2 or dry chemical [s1] |
| Class D | Combustible metals [s1] | Magnesium [s1]<br>Sodium [s1] | Specialized dry-powder agents [s1] |
| Class K | Cooking oils and fats [s1] | Restaurant fryer oils [s1] | Wet chemical [s1] |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. No parentheticals in cells.
- **Tags 3.9 and 7.14 retained from stub.** Cross-tagged. Sibling Concept: `fire-suppression-agents.md`.
- **Source: NFPA 10.** *Standard for Portable Fire Extinguishers* defines the U.S. fire classifications. International classifications differ (e.g., European Class F is roughly U.S. Class K). The CISSP exam uses U.S. classifications.
- **The water-on-electrical hazard.** Water conducts electricity. Spraying water on an energized electrical fire (Class C) can electrocute the person spraying it and spread the electrical hazard. Always de-energize before water suppression, or use a non-conductive agent (CO2, dry chemical, clean agent).
- **The water-on-grease hazard.** Water on burning oil/grease (Class K) flashes to steam and ejects burning oil into the air, dramatically expanding the fire. Wet chemical agents (potassium acetate, potassium citrate) saponify the oil, smothering the fire and absorbing heat.
- **The metal-fire problem.** Burning magnesium and sodium react with water exothermically — adding water *accelerates* the fire. Sodium burns in nitrogen, so even inert-gas suppression can fail. Class D requires specialized dry-powder agents (graphite-based, sodium-chloride-based) that smother without reacting.
- **Class E exists in some classifications.** International (European) classifications use different letters: A (solid combustibles), B (liquids), C (gases — different from U.S.), D (metals), E (electrical, U.S. C equivalent), F (cooking oils, U.S. K equivalent). CISSP uses U.S. NFPA classifications.
- **Once de-energized, electrical fires often become Class A.** A computer fire is Class C while powered. Once power is removed, the fire becomes a fire of the components' material — often plastic, metal, and other Class A or D material. The classification is about *current state* of the fire, not its ignition source.
- **Dry chemical works on multiple classes.** ABC-rated dry chemical extinguishers (the most common multi-purpose extinguisher) work on Class A, B, and C fires. They leave residue that may damage electronic equipment (corrosion). For data centers, clean-agent systems (FM-200, Novec 1230, inert gases) are preferred to avoid residue.
- **Gaps marked `[needs source]`:** none — all Facts trace to NFPA 10.

### Tricky distractors

- **Don't use water on Class C electrical fires.** Conducts electricity, electrocution risk. Wrong-answer pattern: claiming water suffices for any fire — Class C is dangerous.
- **Don't use water on Class K grease fires.** Steam ejects burning oil. Wrong-answer pattern: applying water to grease — wet chemical (saponification) is required.
- **Don't use water on Class D metal fires.** Reacts exothermically. Wrong-answer pattern: applying water to magnesium/sodium — accelerates the fire.
- **U.S. vs European classifications differ.** Class C in US (electrical) = Class E in EU. Wrong-answer pattern: applying European letters to US-context exam questions.
- **Class C de-energized becomes Class A or D.** Material-driven. Wrong-answer pattern: claiming once-Class-C-always-Class-C — current state matters.
- **Clean-agent systems for data centers.** FM-200, Novec, inert gas. Wrong-answer pattern: using ABC dry chemical in data centers — residue damages electronics.

## Engine demo opportunities

- `? | fuel type → Combustible metals` → Class D
- `Class K | example → ?` → `Restaurant fryer oils`
- `? | appropriate suppression → Specialized dry-powder agents` → Class D
- `Class A | example → ?` → any of `Wood`, `Paper`, `Cloth`
- `Class C | appropriate suppression → ?` with `Water or dry chemical` (Class A) as a tempting wrong answer (water is dangerous on energized electrical)
- Composite Row profile: Class A across all Columns with `appropriate suppression` swapped to `Specialized dry-powder agents` (Class D's value)

## Sources

- `[s1]`: NFPA 10 *Standard for Portable Fire Extinguishers*, current edition (retrieved 2026-04-26, https://www.nfpa.org/codes-and-standards/all-codes-and-standards/list-of-codes-and-standards/detail?code=10)
- `[s2]`: (ISC)² CISSP Certification Exam Outline, effective 2024-04-15, Domain 3 §3.9 and Domain 7 §7.14 (retrieved 2026-04-26, https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline)
