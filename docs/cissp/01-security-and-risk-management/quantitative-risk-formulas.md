# Quantitative Risk Formulas

**Domain:** 1 — Security and Risk Management &nbsp;|&nbsp; **Pattern:** Dimensions &nbsp;|&nbsp; **Tags:** 1.10
**Status:** draft (SME review pending)

The six quantities CISSP candidates compute when putting a dollar figure on a risk. Three are inputs to the model (AV, EF, ARO), two are derived loss figures (SLE, ALE), and one is the cost-benefit verdict on a proposed control (Safeguard value). Rows are presented in the order an analyst encounters them: gather inputs, derive single-loss, derive annual-loss, then evaluate safeguards. Columns progress from the formula (or `Input` if the row is a primary input), through what the quantity measures, to a worked example that chains row to row.

| Term | formula | what it measures | example calculation |
|---|---|---|---|
| AV | Input [s1] | Monetary worth of asset [s2] | $100,000 [s1] |
| EF | Input [s1] | Percentage of asset lost per incident [s2] | 25% [s1] |
| SLE | AV × EF [s1] | Expected loss per single incident [s2] | $100,000 × 25% = $25,000 [s1] |
| ARO | Input [s1] | Expected annual frequency of incidents [s2] | 3 [s1] |
| ALE | SLE × ARO [s1] | Expected annual loss [s2] | $25,000 × 3 = $75,000 [s1] |
| Safeguard value | ALE before − ALE after − ACS | Net annual benefit of a safeguard | $75,000 − $25,000 − $20,000 = $30,000 |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. No parentheticals in cells. Number-format commas (`$100,000`) are number formatting, not list separators.
- **`Input` is the cell value for the three input rows.** AV, EF, and ARO are primary inputs to the model — they are gathered from asset inventory and threat-frequency estimates, not derived. Marking them `Input` keeps the Pattern Dimensions: every row has a Value in every column. The engine will surface the shared `Input` Value as `? | formula → Input` → AV, EF, ARO.
- **Example calculations chain.** The SLE row's result ($25,000) is the SLE input to the ALE row. The ALE row's result ($75,000) is the "ALE before" input to the Safeguard value row. This lets the engine pose multi-step questions ("given AV, EF, ARO, what is ALE?") by composing across rows.
- **Safeguard formula uses left-associative subtraction.** `ALE before − ALE after − ACS` evaluates left-to-right and equals `(ALE before − ALE after) − ACS`. The form without parentheses is preferred for atomicity. Some textbooks write `(ALE_pre − ALE_post) − ACS`; same expression.
- **ACS abbreviation.** Annual Cost of Safeguard. Some sources write it `ACS`, others `Cost of Safeguard`, others spell it out. This Concept uses `ACS` to keep the formula notation compact.
- **EF is unitless and bounded 0–100%.** ARO can be fractional (`0.5` = once every two years). AV, SLE, ALE, and Safeguard value are monetary. The example uses `ARO = 3` (the Wikipedia figure); other public sources use `ARO = 0.5` for the same example asset, producing `ALE = $12,500` rather than `$75,000` — the formula is the same regardless.
- **A negative Safeguard value means the control costs more than it saves.** CISSP exam framing: "It is not a good business practice to implement controls that cost more than the risk they are meant to mitigate." A negative value is the quantitative test for that.
- **NIST SP 800-30.** NIST SP 800-30 Rev 1 (2012) describes risk assessment broadly and includes both qualitative and semi-quantitative approaches. The strict ALE = SLE × ARO arithmetic predates SP 800-30 Rev 1 and is more closely associated with industry/CISSP teaching than with current NIST text. Citing Wikipedia and DestCert for the formulas honestly tracks where the explicit arithmetic appears in publicly accessible material.
- **Out of scope:** qualitative risk analysis (Likelihood × Impact matrices), Monte Carlo and FAIR-style probabilistic models, risk treatment options (accept/transfer/mitigate/avoid). Those belong in `qual-vs-quant-analysis`, `risk-frameworks`, and `risk-treatment`.

### Values without a direct public citation

| Cell | Value | Why unsourced |
|---|---|---|
| Safeguard value × formula | `ALE before − ALE after − ACS` | Universal CISSP pedagogical formula; appears in Sybex CISSP Study Guide and Harris CISSP All-in-One (both copyrighted, off the skill's source allowlist). Not located in public sources during this research pass. |
| Safeguard value × what it measures | `Net annual benefit of a safeguard` | Same — universal CISSP teaching. |
| Safeguard value × example calculation | `$75,000 − $25,000 − $20,000 = $30,000` | Synthesized from the Wikipedia ALE example chain; not a direct source quote. |

## Engine demo opportunities

- `SLE | formula → ?` → `AV × EF`
- `ALE | formula → ?` → `SLE × ARO`
- `? | formula → Input` → `AV`, `EF`, `ARO` — shared-Value select-all
- `EF | what it measures → ?` → `Percentage of asset lost per incident`
- `ARO | example calculation → ?` → `3`
- `ALE | example calculation → ?` → `$25,000 × 3 = $75,000`
- Composite ALE Row with `formula` swapped to `AV × EF` — tests the SLE-vs-ALE distinction (both are derived, but ALE is annualized)
- Composite Safeguard value Row with `formula` swapped to `SLE × ARO` — tests that Safeguard value is a cost-benefit, not a loss expectancy
- Composite SLE Row with `example calculation` swapped to `$25,000 × 3 = $75,000` — tests row-to-row substitution (the ALE example using SLE's slot)

## Sources

- `[s1]`: Wikipedia, "Annualized loss expectancy" (retrieved 2026-04-25, https://en.wikipedia.org/wiki/Annualized_loss_expectancy). Primary source for `ALE = ARO × SLE`, `SLE = EF × AV`, and the worked example with `EF = 25%`, `AV = $100,000`, `ARO = 3`.
- `[s2]`: DestCert, "Security Risk Assessment Methods: Quantitative & Qualitative" (retrieved 2026-04-25, https://destcert.com/resources/risk-assessment-methods/). Source for the prose definitions of AV, EF, SLE, ARO, ALE.
