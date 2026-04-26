# Pen Test Perspectives

**Domain:** 6 — Security Assessment and Testing &nbsp;|&nbsp; **Pattern:** Dimensions &nbsp;|&nbsp; **Tags:** 6.2
**Status:** draft (SME review pending)

The three pen test knowledge perspectives CISSP candidates are expected to discriminate. The discriminator is *how much information about the target the tester is given upfront*. Black box mimics an external attacker with zero insider knowledge; white box gives the tester full architectural and source-code access; gray box sits in between with limited disclosure. The trade-off is realism vs efficiency — black box is most realistic but most expensive; white box is fastest and most thorough but least realistic.

| Perspective | knowledge given | simulates | cost | time |
|---|---|---|---|---|
| Black box | None | External attacker with no prior access | High | Long |
| Gray box | Partial | Insider with limited access<br>External attacker with some prior reconnaissance | Medium | Medium |
| White box | Full | Internal architect or developer | Low | Short |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. **No parentheticals in cells.**
- **Realism vs efficiency trade-off.** Black box is the most realistic simulation of an unknown external attacker but is also the most expensive — testers spend significant time on reconnaissance and trial-and-error that a knowledgeable insider would skip. White box gives testers source code, architecture diagrams, and credentials, letting them efficiently target the most likely vulnerable surface — but doesn't simulate what an unprivileged outsider would actually find.
- **Gray box is the most common in practice.** Real engagements typically share *some* information — credentials for normal user accounts, network diagrams, target lists — without revealing source code or architectural details. This balances efficiency with realism and matches how many real attacks actually proceed (insider with stolen credentials, external attacker after limited reconnaissance).
- **The names alternate "boxes" and "hats".** "Black/gray/white box" is the dominant CISSP terminology. "Black/gray/white hat" refers to attacker *intent* (malicious vs ambiguous vs ethical), not knowledge perspective. The two are independent — a black-hat attacker may have white-box knowledge (insider threat), and an ethical white-hat tester may run a black-box test.
- **Cost and time are inverse.** White box: low cost, short time (testers go straight to vulnerable code). Black box: high cost, long time (testers must enumerate everything from scratch). Cost-efficient programs use a mix — white-box source review for the source code, black-box external testing for the perimeter.
- **OSSTMM and PTES use different terms.** OSSTMM (Open Source Security Testing Methodology Manual) uses "Blind / Double Blind / Tandem / Reversal" for similar perspectives at higher granularity. PTES uses "Zero Knowledge / Partial Knowledge / Full Knowledge". CISSP uses the box terminology; SME pass should confirm against current exam outline.
- **Out of scope for this Concept:** authorization (covered in `penetration-test-phases` Phase 1), red-team vs blue-team vs purple-team distinctions (operational rather than knowledge-based), assumed-breach scenarios (a variant where the tester begins post-foothold), specific OSSTMM / PTES per-method nuance.

### Values without a direct public citation

| Cell | Notes |
|---|---|
| All rows × cost | Categorical bins | Industry-typical pricing relativities; engagement costs vary by scope. |
| All rows × time | Categorical bins | Industry-typical engagement durations; scope-dependent. |
| All rows × simulates | Phrasings | Pedagogical summaries of who each perspective models; not direct quotes from a primary source. |

## Engine demo opportunities

- `Black box | knowledge given → ?` → `None`
- `White box | knowledge given → ?` → `Full`
- `? | knowledge given → Partial` → `Gray box`
- `? | cost → High` → `Black box`
- `? | cost → Low` → `White box`
- `? | time → Long` → `Black box`
- `? | simulates → Internal architect or developer` → `White box`
- Composite Black box Row with `knowledge given` swapped to `Full` — directly tests the perspective polarity (Black box has zero knowledge; White box has full knowledge)
- Composite White box Row with `cost` swapped to `High` — tests the cost-efficiency point (White box is the cheapest because testers can target efficiently)
- Composite Gray box Row with `simulates` swapped to `External attacker with no prior access` — tests the gray-box framing (Gray box simulates insiders or partially-informed attackers, not unknown externals)

## Sources

- `[s1]`: NIST SP 800-115, "Technical Guide to Information Security Testing and Assessment" — addresses overt vs covert and external vs internal pen test variants (September 2008, retrieved 2026-04-26, https://csrc.nist.gov/publications/detail/sp/800-115/final)
- `[s2]`: PTES (Penetration Testing Execution Standard) — Zero/Partial/Full Knowledge framing (retrieved 2026-04-26, http://www.pentest-standard.org/)
- `[s3]`: OSSTMM (Open Source Security Testing Methodology Manual) — Blind/Double Blind/Tandem/Reversal framing (retrieved 2026-04-26, https://www.isecom.org/OSSTMM.3.pdf)
