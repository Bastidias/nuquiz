# NuQuiz Landscape

> A background doc, not a roadmap. Surveys the terrain — what the engine can teach, which markets it plausibly fits, what the tradeoffs look like. Choices get made elsewhere; this is here to argue with.

## What the engine is built to teach

The engine generates questions programmatically from author-curated tables — atomic facts arranged in rows (comparable items) and columns (dimensions / steps / aspects). Every question is provably correct by construction and traces to specific source facts.

Three table patterns cover most certification content (see `docs/cissp/knowledge-map.md`):

- **Dimensions** — rows are comparable entities, columns are attributes. Fits compare-and-contrast.
- **Ordered** — rows are steps in sequence, columns are step attributes. Fits processes and hierarchies.
- **Aspects** — one row, columns are facets. Fits a single concept viewed from multiple angles.

What resists the engine today: narrative / causal knowledge where the *relationship between facts* is itself the thing being tested ("TLS replaced SSL because POODLE..."). For certification content this is usually a rounding error — most causal content decomposes into fact-pairs where knowing both is enough.

The engine's natural market is therefore **fact-dense certification content** — wide recall breadth, sharp correctness standard, professional buyer.

## Vertical options

Two verticals the founder could plausibly author against: security certifications and nursing licensure. Wider markets (PMP, CPA, legal, medical boards) are acknowledged and set aside until a founder-leverage case is made for them.

### Security certifications

- **Landscape:** CISSP, CCSP, CISM, CISA, Security+, CySA+, OSCP, and adjacent exams.
- **Buyer:** working professional, frequently with employer reimbursement.
- **Content fit:** very high — CBK-style curricula map cleanly to all three table patterns.
- **Content sourcing:** vendor-published exam outlines, open educational resources, public domain, founder-written prose. AI-extraction from copyrighted textbooks is off the table.
- **Founder leverage:** direct domain knowledge.

### Nursing licensure (NCLEX)

- **Landscape:** NCLEX-RN and NCLEX-PN.
- **Buyer:** pre-license nursing student, typically self-paying.
- **Content fit:** high for fact-recall domains (pharmacology, lab values, procedure sequences), partial for clinical-judgment items that test reasoning over cases.
- **Content sourcing:** clinical fact bases, public-domain references, published guidelines. Dominant market materials are proprietary — avoid as sources.
- **Founder leverage:** direct domain knowledge.

## CISSP vs NCLEX — the sharper comparison

| | CISSP | NCLEX |
|---|---|---|
| **Buyer** | Working professional | Pre-license student |
| **Price tolerance** | High — absorbed or reimbursed | Low — price-sensitive market |
| **Reimbursement** | Common (corporate training budgets) | Rare |
| **TAM** | Smaller, premium | Larger, commoditized |
| **Incumbent density** | Moderate — several premium players | Heavy — entrenched, well-funded incumbents |
| **Distribution** | iOS-heavy professional user base | Mixed mobile; whatever device the student owns |
| **Content-source risk** | Low — vendor outlines and open sources are abundant | Higher — dominant materials are proprietary |
| **Engine fit** | Very high — CBK maps to table patterns cleanly | High for recall; partial for clinical-judgment items |
| **Content-volume bar** | Mid thousands of facts across 8 domains | Higher — recall surface is broader |
| **Brand / tone fit** | "Professional's tool" lands naturally | Tone needs rework — students are stressed, not skeptical |

The short version: **CISSP optimizes for buyer quality; NCLEX optimizes for buyer volume.** Each implies a different product, a different pricing model, and a different competitive posture.

## Product skews

Regardless of vertical, the engine reaches users through a small number of distinct skews:

- **Free web demo** — partial deck, no account. Discovery surface; not a product.
- **Paid native app** (per exam) — full deck, full engine, offline-capable. The core skew.
- **Pro tier upgrade** — advanced diagnostics, deeper review modes. Optional depth for power users.
- **B2B / institutional** — deferred. Requires a seat-management surface and a sales motion the team isn't built for yet.

Skew choices interact with vertical. Premium one-time pricing works for a CISSP buyer with reimbursement; the same shape is harder to defend against the ad-supported free tier students expect in the NCLEX market.

## Ways to cut the business

The same engine and the same content reshuffle into different strategic frames:

- **By vertical** — "a CISSP company that might ladder into security certs, then maybe NCLEX."
- **By buyer** — "a tool for professionals who pay for their own mastery," regardless of exam.
- **By engine** — "a platform that teaches any knowledge fitting the table shape; the first verticals are whichever the founder can author first."
- **By distribution** — "a premium App Store native-app studio," shaped around Apple's economics.

Each frame is internally consistent. Each implies different hires, different defensibility, different growth math. The team can pick one deliberately or discover which frame they're in after the fact.

## What this doc is not

- **Not a roadmap.** No dates, no deliverable order. See `docs/pre-team-discussion.md` for the open questions.
- **Not a pricing commitment.** Skew shapes are discussed; numbers belong in a later decision.
- **Not a market scan.** PMP, CPA, legal, medical boards, and adjacent verticals are set aside, not analyzed.
- **Not "the team decided."** Meant to be argued with — update entries as the team's thinking hardens.
