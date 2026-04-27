# DNS Recursive Query Flow

**Domain:** 4 — Communication and Network Security &nbsp;|&nbsp; **Pattern:** Ordered &nbsp;|&nbsp; **Tags:** 4.1, 4.2
**Status:** draft (SME review pending)

The eight-step flow a DNS recursive resolver walks when answering a name that is not already cached. Tested for sequence recall (which step is the root query vs the TLD query), actor recall (who refers whom), and cache location (why the recursive resolver, not the stub, carries the heavy cache). This is the foundation for DNS cache poisoning, DNSSEC validation, and split-horizon DNS — each of which warrants a separate Concept.

**Layout convention:** rows are steps in sequence from the application's initial question to the cached answer reaching the client. Columns are attributes of each step ordered left → right from least detail (Name) to most detail (Content).

| Step | Name | Direction | Message type | Content |
|---|---|---|---|---|
| 1 | Stub query | Client → Recursive | Query [s2] | example.com A [s2] |
| 2 | Root query | Recursive → Root | Query [s1] | example.com A [s2] |
| 3 | Root referral | Root → Recursive | Referral [s1] | .com TLD nameserver list [s1] |
| 4 | TLD query | Recursive → TLD | Query [s1] | example.com A [s2] |
| 5 | TLD referral | TLD → Recursive | Referral [s1] | example.com authoritative nameserver list [s1] |
| 6 | Authoritative query | Recursive → Authoritative | Query [s1] | example.com A [s2] |
| 7 | Authoritative answer | Authoritative → Recursive | Answer [s1] | example.com IP address [s1] |
| 8 | Cached response | Recursive → Client | Answer [s1] | example.com IP address [s1] |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. **No parentheticals in cells.** Direction arrows (`Client → Recursive`) are treated as a single atomic Fact identifying the hop, consistent with the existing TCP handshake Concept.
- **`example.com A` is the canonical example-query shorthand.** It means "the A (IPv4 address) resource record for the name example.com". The FQDN and record-type pair is atomic for query purposes; splitting them across Facts would distort the question being asked.
- **Why the query repeats verbatim across Steps 1, 2, 4, 6.** The recursive resolver asks the *same question* at each tier (root → TLD → authoritative). The referrals in Steps 3 and 5 are what advance the chain — they tell the recursive resolver which nameserver to ask next, but they do not change the question itself. This is one of the most commonly misremembered DNS facts on the exam: recursive resolvers do not reformulate the query as they descend.
- **Caching lives at Step 8, not Step 1.** The recursive resolver is the canonical cache tier — it caches the final answer plus all intermediate referrals. The stub resolver may have a small OS-level cache but is not responsible for resolution caching. If a question asks "which component caches DNS responses," the answer is the recursive resolver. TTL values on the resource records govern cache lifetime.
- **"Recursive" vs "Iterative" queries.** The Step 1 query from stub to recursive resolver is a *recursive* query — the stub is asking the recursive resolver to do all the work and return a final answer. Steps 2, 4, and 6 from recursive resolver to authoritative servers are *iterative* queries — each nameserver either answers or refers, but never recurses itself. This query-type distinction is worth its own Concept.
- **Root nameservers return referrals, not answers.** Step 3 is specifically a referral to the TLD nameserver list; root nameservers do not hold A records for arbitrary names. This is another favorite exam discriminator ("the root server answers the query" is false).
- **Transport.** DNS queries default to UDP port 53; responses larger than 512 bytes (or 1232 with EDNS(0)) fall back to TCP port 53. Zone transfers (AXFR/IXFR) use TCP exclusively. Not represented as a Column here because transport is constant across the 8 steps; it belongs in a DNS-transport Concept or a Notes line.
- **Out of scope for this Concept:** DNSSEC validation (RRSIG / DNSKEY / DS chain), DoT / DoH / DoQ (encrypted DNS transport), DNS cache poisoning (Kaminsky 2008), split-horizon DNS, private DNS, Conditional Forwarders, stub resolver internals, EDNS(0) extensions. Each warrants a separate Concept.

### Tricky distractors

- **Root nameservers return referrals, not answers.** They don't hold A records for arbitrary names. Wrong-answer pattern: claiming the root answers the query — only authoritative servers do.
- **The query repeats verbatim at each tier.** Recursive resolver asks the same question at root, TLD, authoritative. Wrong-answer pattern: claiming the resolver reformulates the question — referrals advance the chain; the question doesn't change.
- **Recursive caches; stub doesn't (much).** The recursive resolver is the canonical cache tier. Wrong-answer pattern: claiming the stub resolver is the primary cache.
- **Recursive vs Iterative.** Stub→Recursive is recursive ("do the work for me"). Recursive→Authoritative is iterative ("answer or refer"). Wrong-answer pattern: confusing the query types.
- **TTL governs cache lifetime.** Resource record-level setting. Wrong-answer pattern: claiming the recursive resolver decides cache TTL — it follows the record's TTL.
- **DNS uses UDP/53, falls back to TCP/53.** Zone transfers always TCP. Wrong-answer pattern: claiming DNS is TCP-first — UDP is default.

### Values without a direct public citation

No cell in this table relies on inference beyond what RFC 1034 [s1] and RFC 1035 [s2] specify. The `example.com A` content tag is a canonical example — not a quoted Fact from the RFCs — but is universally used in DNS pedagogy for this flow.

## Engine demo opportunities

- `Step 3 | Name → ?` → `Root referral`
- `Step 7 | Direction → ?` → `Authoritative → Recursive`
- `? | Message type → Referral` → `Step 3`, `Step 5` — shared-Value select-all (the two referral steps)
- `? | Message type → Answer` → `Step 7`, `Step 8` — shared-Value select-all
- `? | Message type → Query` → `Step 1`, `Step 2`, `Step 4`, `Step 6` — shared-Value select-all (four query steps)
- `? | Content → example.com A` → `Step 1`, `Step 2`, `Step 4`, `Step 6` — shared-Value select-all; tests the "query repeats verbatim" point above
- `? | Content → example.com IP address` → `Step 7`, `Step 8` — shared-Value select-all
- Sequence (adjacency): `Step following (Step n | Name → Root referral) | Name → ?` → `TLD query`
- Sequence (adjacency): `Step following (Step n | Name → TLD referral) | Name → ?` → `Authoritative query`
- Composite Step profile: Step 3 with `Direction` swapped to `Recursive → Root` — tests referral directionality (root returns *to* recursive, not the other way)
- Composite Step profile: Step 8 with `Message type` swapped to `Referral` — tests the answer-vs-referral distinction

## Sources

- `[s1]`: RFC 1034, "Domain Names - Concepts and Facilities" (November 1987, retrieved 2026-04-19, https://datatracker.ietf.org/doc/html/rfc1034)
- `[s2]`: RFC 1035, "Domain Names - Implementation and Specification" (November 1987, retrieved 2026-04-19, https://datatracker.ietf.org/doc/html/rfc1035)
- `[s3]`: NIST SP 800-81 Rev 2, "Secure Domain Name System (DNS) Deployment Guide" — general reference for DNS deployment and security (September 2013, retrieved 2026-04-19, https://csrc.nist.gov/publications/detail/sp/800-81/rev-2/final)
