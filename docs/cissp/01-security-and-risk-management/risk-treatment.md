# Risk Treatment Options

**Domain:** 1 — Security and Risk Management &nbsp;|&nbsp; **Predicate style:** Dimensions &nbsp;|&nbsp; **Tags:** 1.10
**Status:** draft (SME review pending)

The four canonical responses to an identified risk. Knowing when to choose each — and what residual risk remains — is heavily tested.

| Subject | definition | when chosen | example | residual risk |
|---|---|---|---|---|
| Accept | Acknowledge the risk and take no action because the cost of treatment exceeds the potential loss | The risk impact is low<br>The cost of treatment exceeds the value at risk<br>The risk falls within the organization's stated risk appetite | Choosing not to encrypt non-sensitive marketing brochures stored on a public web server | Equal to the original risk (no reduction) |
| Avoid | Eliminate the activity or asset that creates the risk | Risk exceeds appetite and no acceptable mitigation exists<br>Cost of any mitigation exceeds the benefit of the activity<br>Regulatory or legal exposure makes the activity untenable | Discontinuing a product line because of unacceptable liability exposure | Eliminated (because the activity itself is discontinued) |
| Transfer | Shift the financial burden of the risk to a third party | Risk is significant but can be insured against<br>A specialized third party can absorb the risk more efficiently | Purchasing cyber liability insurance to cover breach response and notification costs<br>Outsourcing payment processing to a PCI-compliant provider | Operational impact remains; financial exposure is reduced |
| Mitigate | Implement controls to reduce the likelihood or impact of the risk | Risk exceeds appetite and cost-effective controls exist<br>Most common treatment in day-to-day security operations | Deploying intrusion detection and patching systems to reduce breach likelihood<br>Adding MFA to reduce account compromise likelihood | Reduced but not eliminated |

## Notes

- **Cell convention:** each `<br>`-separated item within a cell is one atomic fact at import time.
- "Mitigate" is sometimes called **Reduce** in (ISC)² materials — interchangeable.
- Some CISSP sources list a fifth option: **Reject/Ignore** — explicitly do nothing without analysis. This is *not* the same as Accept (which is a deliberate, documented decision). Excluded here as bad practice; mention in study notes if desired.
- Watch for trap questions distinguishing Accept (deliberate) from Reject (negligent).
- Transfer is often misunderstood — *operational* risk does not transfer, only *financial* exposure. Reinforced in the residual-risk column.
