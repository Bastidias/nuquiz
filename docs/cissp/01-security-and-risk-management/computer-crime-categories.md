# Computer Crime Categories

**Domain:** 1 — Security and Risk Management &nbsp;|&nbsp; **Pattern:** Dimensions &nbsp;|&nbsp; **Tags:** 1.5
**Status:** draft (SME review pending)

The six attacker categories the CISSP CBK identifies, distinguished by *motivation* (why the attack happens) and *typical target* (what they go after). The categorization matters for defensive prioritization — a financial institution faces different attacker motivations than a defense contractor, and the controls that deter each category differ. The CISSP exam tests both the categorization and the matchup between motivation and target.

| category | motivation | typical target | example |
|---|---|---|---|
| Military / intelligence | Acquire classified state information [s1] | Government and defense systems [s1] | Nation-state APT campaign [s1] |
| Business | Acquire competitor trade secrets [s1] | Competitor IP and strategic plans [s1] | Industrial espionage breach [s1] |
| Financial | Direct monetary gain [s1] | Banking systems and payment data [s1] | Ransomware extortion [s1] |
| Terrorist | Disrupt or destroy to advance ideology [s1] | Critical infrastructure [s1] | Attack on power-grid SCADA [s1] |
| Grudge | Retaliation against specific target [s1] | Former employer's systems [s1] | Disgruntled-employee data exfiltration [s1] |
| Fun / thrill | Bragging rights or skill demonstration [s1] | Public-facing systems [s1] | Website defacement [s1] |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. No parentheticals in cells.
- **Tag 1.5 retained from stub.** Maps to (ISC)² 2024 outline §1.5 *Understand requirements for investigation types* (computer crime context). Cross-tag candidates: §1.7 *Develop, document, and implement security awareness, education, and training program*.
- **Why these six categories.** The CISSP CBK explicitly enumerates six: Military/intelligence, Business, Financial, Terrorist, Grudge, Fun [s1]. Some references add a seventh ("Hacktivist" / ideological-but-non-terrorist) or split Business into competitor vs. insider. Six matches the most-tested CISSP framing.
- **Motivation drives controls more than category does.** A financial attacker (greed) may use the same techniques as an industrial espionage attacker (competitive intel) — but the *defenders* care about motivation because it predicts persistence and target selection. Financial attackers move on if the take is too small; nation-state attackers don't.
- **The category boundaries blur in practice.** Modern attacks frequently span categories — a nation-state actor may use criminal-marketplace tooling (financial ecosystem) to obscure attribution; a hacktivist (ideological) may collaborate with disgruntled insiders (grudge). The CISSP categorization is a *teaching* taxonomy, not a forensic-attribution one.
- **Why "fun / thrill" is on the list.** Script-kiddie attacks for bragging rights are still illegal and still consume defensive resources. They are also the most common attack class an internet-facing system will see and they are how unsophisticated attackers learn — so the public-facing-system controls that deter them are part of the baseline.
- **What is intentionally not on this table.** Insider-threat is not its own category here because insiders appear across the other categories (a financial insider, a grudge insider, etc.). State-sponsored hacktivism is folded into Military/intelligence. Cybercrime-as-a-service is the *delivery mechanism*, not a category.
- **Gaps marked `[needs source]`:** none — all Facts trace to the CISSP CBK enumeration.

### Tricky distractors

- **Motivation drives persistence.** Financial attackers move on; nation-state attackers don't. Wrong-answer pattern: treating all attacker categories as equally persistent — they aren't.
- **Categories blur in practice.** Modern attacks combine motivations (nation-state using criminal tooling). Wrong-answer pattern: insisting on single-category attribution — the taxonomy is pedagogical.
- **Insider threat spans categories.** Insiders can be financial, grudge, or accidental. Wrong-answer pattern: treating "insider" as its own attacker category — it cuts across the categories.
- **Hacktivism is often Terrorist or Grudge in CISSP framing.** Or split into its own category in some texts. Wrong-answer pattern: assuming all texts use identical six-category lists.
- **Fun/thrill is still real risk.** Script kiddies generate baseline noise and exploit unsophisticated targets. Wrong-answer pattern: dismissing thrill attackers as not requiring defensive investment — they consume resources.
- **Terrorist targets infrastructure to harm; Financial targets data to monetize.** Wrong-answer pattern: confusing motive with target type — both can hit critical infrastructure but for different reasons.

## Engine demo opportunities

- `? | motivation → Direct monetary gain` → Financial
- `Grudge | typical target → ?` → `Former employer's systems`
- `? | example → Website defacement` → Fun / thrill
- `Terrorist | motivation → ?` → `Disrupt or destroy to advance ideology`
- `Business | example → ?` with `Ransomware extortion` (Financial) and `Nation-state APT campaign` (Military) as distractors
- Composite Row profile: Financial across all Columns with `motivation` swapped to `Retaliation against specific target` (Grudge's value)

## Sources

- `[s1]`: CISSP Common Body of Knowledge — six computer crime categories (Military/intelligence, Business, Financial, Terrorist, Grudge, Fun) — sourced via *CISSP For Dummies* and Wiley CISSP study guide summaries (retrieved 2026-04-26, https://www.dummies.com/article/academics-the-arts/study-skills-test-prep/cissp/computer-crimes-225388/)
- `[s2]`: (ISC)² CISSP Certification Exam Outline, effective 2024-04-15, Domain 1 §1.5 *Understand requirements for investigation types* (retrieved 2026-04-26, https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline)
