# Risk Treatment Options

**Domain:** 1 — Security and Risk Management &nbsp;|&nbsp; **Pattern:** Dimensions &nbsp;|&nbsp; **Tags:** 1.10
**Status:** draft (SME review pending)

The four canonical responses to an identified risk. Knowing when to choose each — and what residual risk remains — is heavily tested.

| Treatment | definition | when chosen | example | residual risk |
|---|---|---|---|---|
| Accept | Acknowledge the risk<br>Take no action<br>Justified when treatment cost exceeds value at risk | Risk impact is low<br>Treatment cost exceeds value at risk<br>Risk falls within stated risk appetite | Choosing not to encrypt non-sensitive marketing brochures stored on a public web server | Equal to the original risk (no reduction) |
| Avoid | Eliminate the activity that creates the risk<br>Eliminate the asset that creates the risk | Risk exceeds appetite<br>No acceptable mitigation exists<br>Mitigation cost exceeds activity benefit<br>Regulatory exposure makes activity untenable | Discontinuing a product line because of unacceptable liability exposure | Eliminated (the activity itself is discontinued) |
| Transfer | Shift the financial burden of the risk to a third party | Risk is significant<br>Risk can be insured against<br>A specialized third party can absorb risk more efficiently | Purchasing cyber liability insurance to cover breach response costs<br>Outsourcing payment processing to a PCI-compliant provider | Operational impact remains<br>Financial exposure is reduced |
| Mitigate | Implement controls to reduce risk likelihood<br>Implement controls to reduce risk impact | Risk exceeds appetite<br>Cost-effective controls exist<br>Most common treatment in day-to-day security operations | Deploying intrusion detection to reduce breach likelihood<br>Patching systems to reduce breach likelihood<br>Adding MFA to reduce account compromise likelihood | Reduced but not eliminated |

## Notes

- **Cell convention:** each `<br>`-separated item within a cell is one atomic fact.
- "Mitigate" is sometimes called **Reduce** in (ISC)² materials — interchangeable.
- Some CISSP sources list a fifth option: **Reject/Ignore** — explicitly do nothing without analysis. This is *not* the same as Accept (which is a deliberate, documented decision). Excluded here as bad practice; mention in study notes if desired.
- Watch for trap questions distinguishing Accept (deliberate) from Reject (negligent).
- Transfer is often misunderstood — *operational* risk does not transfer, only *financial* exposure. Reinforced in the residual-risk column with two split facts.

### Tricky distractors

- **Accept vs Reject/Ignore.** Accept is *deliberate and documented* — risk reviewed, documented as accepted, decision recorded. Reject/Ignore is *negligent* — no analysis, no documentation. Wrong-answer pattern: treating them as synonymous. The exam often presents a scenario testing whether the response is principled (Accept) or careless (Reject).
- **Transfer transfers financial risk only.** Insurance and outsourcing don't transfer *operational* risk — if your data is breached, the impact still happens to you. Wrong-answer pattern: claiming "Transfer eliminates the risk." It only shifts the financial burden.
- **Avoid eliminates the activity.** Avoid means *not doing the thing*. Stop accepting credit cards = avoid PCI risk by not having cardholder data. Wrong-answer pattern: confusing Avoid with Mitigate — Mitigate keeps the activity but adds controls; Avoid stops the activity.
- **Mitigate vs Accept residual risk.** All Mitigate strategies leave *residual* risk (controls reduce, not eliminate). Wrong-answer pattern: claiming Mitigate "eliminates" risk — that's only Avoid.
- **Transfer ≠ Avoid.** Outsourcing payment processing to a PCI-compliant provider *transfers* the PCI compliance burden but you still have data risk. Wrong-answer pattern: equating outsourcing with avoidance.
- **"Reduce" is Mitigate.** Some (ISC)² materials use "Reduce" instead of "Mitigate." Wrong-answer pattern: treating them as different options. They're synonyms.
