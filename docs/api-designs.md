# API Designs for NuQuiz

> Background doc. Not a decision. Surveys traditional single-API setups, backend-for-frontend (BFF), and the in-between options (GraphQL, tRPC, engine-as-library + thin sync). Assumes the skew landscape from `docs/landscape.md` — free web demo, paid native app, pro upgrade, deferred B2B — and the storage tradeoffs in `docs/data-shapes.md`. Meant to be argued with.

The question underneath the API question is: **where does the engine run, and how much does each client need to know?**

- If the engine runs server-side and clients render output, the API is the engine's surface.
- If the engine runs client-side and clients sync back results, the API is mostly a sync channel.

Everything else — REST vs GraphQL vs tRPC, one BFF or none — is downstream of that decision.

---

## The skews, restated as client shapes

From `docs/landscape.md`:

- **Free web demo** — partial deck, no account, public. Discovery surface.
- **Paid native app** (iOS-heavy, per exam) — full deck, full engine, offline-capable. The core skew.
- **Pro tier upgrade** — advanced diagnostics, deeper review modes, richer analytics UIs.
- **B2B / institutional** (deferred) — seat management, cohort reports, admin surfaces.

Each skew has a different data appetite and a different budget for network round-trips. A web demo can be chatty (fast network, no persistence); a native app on cellular cannot. A Pro user wants confusion graphs and streak data that a free-tier user never sees. A B2B admin wants aggregate cohort data the student never sees.

---

## Option A — Traditional single API

One server. One contract (REST or GraphQL). Every client — web, iOS, Pro features, B2B — talks to the same endpoints.

```
GET  /concepts/tcp-udp-sctp
GET  /concepts/tcp-udp-sctp/questions?mode=drill
POST /responses          { fact_id, picked_fact_id, outcome, ... }
GET  /me/review-queue
GET  /me/confusion-pairs
```

**Pros**
- One contract, one source of truth, one test surface.
- Backward-compat rules are unambiguous — add a field, deprecate a field, cut a version.
- Cheap ops: one server to deploy, one log to read, one auth system.
- Easiest to reason about for a small team.

**Cons**
- Every endpoint has to satisfy the lowest common denominator. If the web demo needs only a Concept's surface and the native app needs the full engine state, the endpoint grows to serve both — or you bolt on `?fields=...` parameters until it looks like ad-hoc GraphQL.
- Over-fetching is the default. Mobile clients pay for data they render nothing from.
- Under-fetching is the other default. One "load this screen" call becomes three: concept, progress, confusion. Chatty on mobile.
- Client-side transforms proliferate. Each client reshapes the same generic payload into its own view model — same logic three times.
- Versioning all clients together is painful when iOS ships on a 2-week review cycle and web ships in minutes.

**Verdict**: right answer for v0 / one-client-only / solo-maintainer. Gets expensive as the skews diverge.

---

## Option B — Backend for Frontend (BFF)

One thin server per client. Each BFF calls into a shared core (either an internal engine service or the engine-as-library) and shapes responses for its specific frontend.

```
core / engine-service   (the generator, distractor selection, analytics primitives)
  ├── web-bff           (public-facing demo data; minimal)
  ├── ios-bff           (per-screen payloads shaped for SwiftUI views)
  ├── pro-bff           (extra analytics endpoints gated on entitlement)
  └── admin-bff         (B2B seat management, cohort aggregates)
```

Each BFF owns its contract with *its* client. The iOS BFF can return one payload per screen exactly matching the view model. The Pro BFF can hide free-tier endpoints entirely. The admin BFF can enforce org-scoped authorization without leaking those concerns into the engine.

**Pros**
- Each client gets fit-for-purpose endpoints — one round-trip per screen is plausible.
- Client and server evolve together per skew; no global version lockstep.
- Authorization concerns localize (Pro entitlement in the Pro BFF, seat checks in the admin BFF).
- Mobile payload discipline is possible — the iOS BFF decides exactly what iOS needs.
- Engine upgrades propagate via the shared core; BFFs don't duplicate generator logic.

**Cons**
- More services to run, deploy, observe. For a small team, that's real overhead.
- Risk of logic duplication — two BFFs re-implementing the same derivation is easy to slip into.
- Risk of business logic leaking into BFFs. Discipline matters: BFFs compose and shape, they don't decide.
- Authoring and content workflows need to pick which BFF they talk to, or talk to the core directly.
- More moving parts for auth: who signs tokens, who validates, where entitlement lives.

**Verdict**: right answer as soon as the native app becomes real. Wrong answer while there's only a web demo.

### Variant — BFF per platform, not per skew

Instead of one BFF per skew, one BFF per *client type* (web, iOS, admin). Skews within a client (free vs Pro vs trial) become feature-gates in that platform's BFF. Simpler topology, fewer services, still fit-for-purpose per platform. Probably the more realistic middle ground.

---

## Option C — Engine-as-library + thin sync API

The engine is a library, not a service. Each client embeds it directly (compiled for iOS, bundled for web, etc.). The server exists to hold content, authenticate users, and receive response events. Generation happens client-side; the server is a sync target.

```
server: /content/:deck/snapshot            (content tarball, versioned, cacheable by CDN)
        /me/responses     POST             (batched response events)
        /me/state         GET/PATCH        (server-authoritative review queue, reconciled)
        /me/cohort-stats  GET              (aggregates; computed server-side)
```

The native app downloads the Deck, runs the engine offline, queues responses, syncs when online. The web demo can do the same (service worker) or call a hosted engine endpoint when online-only is fine.

**Pros**
- Native offline mode falls out for free. Cellular / airplane / bad WiFi all work.
- Content is static enough to cache aggressively — CDN distribution for the content tarball is cheap.
- The server stops being the bottleneck for question generation. Scales to "many students per dollar."
- Engine behavior is identical across clients by construction — they all run the same code.
- Reduces the API surface to what is inherently server-authoritative (identity, response history, aggregates).

**Cons**
- Shipping engine updates means shipping app updates. A bug in the engine waits for Apple review.
- Content updates have to be reconciled with local student state (what if a CellFact ID disappeared since last sync?). Non-trivial but bounded.
- Analytics still live server-side — every response event has to travel home to be useful for cohort stats and confusion graphs across users.
- The "Pro" skew is harder: if the engine runs client-side, entitlement enforcement for pro-only features is on the client first, the server only on reconciliation. Serious Pro features (cross-cohort analytics) still need a server.
- Web-demo distribution is awkward — bundling the whole engine to render a partial-deck demo is heavy.

**Verdict**: the shape that best matches the actual product. Native-app-first, offline-capable, content-static. Pairs well with a thin BFF-style server for the authenticated skews.

---

## Option D — GraphQL as a universal BFF

Single GraphQL endpoint. Each client composes exactly the fields / subtrees it wants.

```graphql
query WebDemoScreen {
  concept(slug: "tcp-udp-sctp") {
    name
    rows { id, label }
    columns { id, label }
  }
}

query IOSScreen {
  concept(slug: "tcp-udp-sctp") {
    name
    rows { id, label, facts { id, column { id }, value } }
    currentUserState {
      reviewDueCellFactIds
      confusionPairs { a { id, value }, b { id, value }, swaps }
    }
  }
}
```

One server, per-client queries. Feels BFF-ish without the per-client server.

**Pros**
- Fit-for-purpose payloads without N servers.
- Schema as documentation — every client can see what's available.
- Mobile payload discipline is possible (clients ask for exactly what they render).
- Strong tooling (codegen, persisted queries, federation if the engine grows out).

**Cons**
- Shifts complexity into resolvers and dataloaders. Backend team still has to think per-use-case.
- N+1 queries and cost analysis become production concerns. Rate limiting is harder.
- Authorization gets subtler — field-level auth, not endpoint-level.
- Cache invalidation is harder than REST + CDN.
- A team that hasn't used it will fight it for 2 months before they love it. A team that loves it sometimes over-uses it.

**Verdict**: a credible middle-ground between A and B. Strongest where multiple clients diverge in data shape but share a backend team.

---

## Option E — Typed RPC (tRPC, Connect-RPC, Smithy)

Request/response procedures with a typed contract generated for every client. REST-ish transport, RPC-ish ergonomics. Strong fit for TypeScript monorepos.

```ts
router.concept.getDrill({ slug, mode: 'drill' })  // typed end-to-end
router.responses.submit({ factId, pickedCellFactId, outcome })
router.me.confusionPairs()
```

**Pros**
- End-to-end types — if the server changes a field, the client won't compile.
- Zero-boilerplate vs REST; per-client query flexibility less than GraphQL but typing is stricter.
- Works beautifully for a small TS-heavy team building web + Node BFF.
- Escape hatch to BFF: any RPC can be a shaped payload per client if named accordingly.

**Cons**
- Locks into a typed-client world. Native clients (Swift, Kotlin) can still consume typed contracts, but the story is weaker than in TS-land.
- Federation / partial migrations harder than GraphQL.
- Smaller ecosystem for each specific flavor (tRPC especially is TS-native).

**Verdict**: excellent if the stack is TS top-to-bottom and there's a web client as the primary. Weaker fit for iOS-first.

---

## How API shape interacts with data shape

The two decisions lean on each other. A few specific interactions from `docs/data-shapes.md`:

- **Table-native storage + single REST API** maps cleanly — endpoints per Concept, endpoints per RowHeader, the URL hierarchy mirrors the storage hierarchy. Most conventional combination.
- **SPO/graph storage + GraphQL** is a very natural pair — GraphQL's selection sets are an excellent match for "return these specific predicates of these specific subjects." If we go SPO eventually, GraphQL on top is an easy lift.
- **Markdown-source-of-truth + any API** is the content pipeline — markdown compiles to whatever runtime shape the server needs. The API then speaks the runtime shape, not markdown.
- **Offline engine + whatever storage** flips the question: the *content distribution format* becomes as important as the API shape. The engine ships a content bundle (JSON, SQLite, whatever); the API is the sync surface. Storage shape is largely an internal-to-the-engine decision at that point.
- **Cross-Concept analytics (v2-ish)** pressure both. The analytics surface wants SPO-shaped events regardless of content storage (see `data-shapes.md` § Data shape × analytics). A BFF or GraphQL endpoint then exposes those analytics to the Pro / admin skews.

The useful framing: **content distribution and mutation sync are different channels, and conflating them costs us later.** Content can be static-ish and cache-heavy; mutations are per-user and authoritative. Designing the two separately from day one makes the offline story tractable.

---

## Functional principle — push data forward

This is a discipline about **how backend functions are written**, not about API request shape. A REST endpoint, a BFF resolver, an RPC procedure, or an engine-as-library entry point all sit *outside* this boundary — they're the loader/shell, and they're free to do whatever fetching the request requires. *Inside*, the engine functions (question generation, distractor selection, scoring) receive their full inputs as arguments at function entry and never reach back to a database while iterating. Inputs are `(Concept data, student stats, policy)`; output is the rendered question.

```ts
// Push data forward — preferred
generateQuestion(
  concept: ConceptData,        // RowHeaders, ColumnHeaders, Cells, CellFacts
  stats: StudentStats,         // per-CellFact history, confusion graph, mastery
  policy: GenerationPolicy,    // mode, difficulty, distractor strategy
): Question

// Pull mid-loop — avoid
generateQuestion(conceptId, studentId): Question {
  const concept = db.fetchConcept(conceptId);                  // round trip 1
  for (const cellFact of concept.cellFacts) {
    const history = db.fetchHistory(studentId, cellFact);      // round trip per CellFact
    ...
  }
}
```

**Why it matters here:**

- **Testability.** A pure generator runs against fixture data with zero infrastructure. Every capability in `docs/demo/capabilities.md` becomes a property test of the generator function — given inputs, output is deterministic and inspectable.
- **N+1 elimination.** A Concept might have 50+ CellFacts. Pulling per-CellFact history mid-loop is N round trips; one upfront fetch is one. Same for cohort stats, confusion graph, distractor pool.
- **Engine portability.** Option C (engine-as-library) *requires* this — there is no DB at the point of execution; the engine receives a loaded snapshot. Adopting the discipline up front means the same generator runs server-side (Options A/B/D/E) or client-side (Option C) without rewrites.
- **Cacheability.** A pure `generateQuestion(concept, stats, policy)` is memoizable on its inputs. An impure version that touches the DB is not.
- **Locality of reasoning.** The signature tells you what the function depends on. No hidden fetches, no temporal coupling between "did you call this first."

**The boundary discipline.**

The application splits into two layers:

- **Loader / repository layer (impure).** Fetches Concept data and student stats from storage. Lives at the API request, BFF endpoint, or session boundary. Knows about the database.
- **Engine layer (pure).** Takes loaded data, generates questions, scores responses, computes next state. Knows nothing about the database.

Mutations flow back out through the loader. The engine never writes; it *returns the events that should be written* — a response record, a confusion-graph delta, a review-queue update — and the loader commits them.

Standard hexagonal-architecture / pure-core/impure-shell shape. The naming matters because every API option above is more pleasant when it's followed.

**How this interacts with the API options:**

- **A / B / D / E (server-side engine):** the loader lives in the server. Each request fetches Concept + stats once, calls the pure engine, returns the rendered question. No mid-request DB chatter, no N+1.
- **C (engine-as-library):** the loader is the content tarball + local response store. Same pure engine, different shell.
- **Mutations everywhere:** the engine returns response events and state deltas as values; the shell commits.

The API option picks the **shell**. The principle here governs the **core**, which is identical across all five.

---

## The tradeoff, compressed

| | Single REST | BFF per client | Engine-as-lib + sync | GraphQL | tRPC / RPC |
|---|---|---|---|---|---|
| **Servers to run** | 1 | N + core | 1 (thin) | 1 | 1 |
| **Client fit (mobile)** | Poor | Best | Best | Good | Good |
| **Offline story** | Bad | Bad (unless combined with E-lib) | Native | Bad | Bad |
| **Client divergence cost** | High | Low | Low | Low | Medium |
| **Auth / entitlement locality** | Mixed | Per-BFF (clean) | Server-side (clean, but thinner) | Field-level (careful) | Per-procedure |
| **Ops overhead** | Lowest | Highest | Low | Low | Low |
| **Typing across boundary** | OpenAPI-ish | Per-BFF | Per-boundary | Schema-first | Strongest (TS) |
| **Cache-friendliness** | Best (HTTP/CDN) | Good | Best (static content + POST responses) | Hard | Good |
| **Pairs well with table-native** | Yes | Yes | Yes | OK | Yes |
| **Pairs well with SPO/graph** | Awkward | Yes | Yes | Excellent | OK |
| **Good v0 pick** | Yes | No | Maybe | Maybe | If all-TS |
| **Good v1+ pick as skews diverge** | No | Yes | Yes | Yes | Yes (TS-only) |

---

## Candidate shapes worth naming

Not decisions — just combinations that go together naturally enough to name:

1. **"The Rails default."** Single REST API, table-native storage, markdown-to-DB build step, web-first. Cheapest to build, fine for v0, gets creaky at native + offline.
2. **"The native-first offline."** Engine-as-library, content tarball distributed via CDN, thin sync API for responses and state. Pro and B2B mount as small separate services. Matches `docs/landscape.md` skews best.
3. **"The analytics-forward."** SPO-shaped event log from day one, table-native content, GraphQL on top for client-shape flexibility. Heavier up front, pays off when cross-Concept analytics become v2.
4. **"The TS monorepo."** tRPC between web and a Node BFF, single core engine, iOS app consumes an OpenAPI-generated subset. Fast inner loop for a small, TS-heavy team.

Each shape implies a team shape and a tooling bill. Each is internally consistent.

---

## Open questions for the team

- **Does the engine run server-side, client-side, or both?** Everything else follows.
- **Is offline a v1 requirement for the native app?** If yes, push toward engine-as-library. If no, server-side generation is fine.
- **Do we need a content-mutation API, or is content PR-only?** A markdown-forever author workflow means no content write API — only a build pipeline and a content-distribution URL. This simplifies the API considerably.
- **How much divergence do we expect between web demo and native app?** Low divergence → single API. High divergence → BFF or engine-as-library.
- **What's the Pro tier's shape?** If Pro is extra analytics over the same content, a Pro BFF or Pro GraphQL fields is enough. If Pro is a different UX model, it's closer to a separate client skew.
- **Auth: identity provider, session model, token strategy.** Orthogonal to the API shape but locked in by it.

---

## What this doc is not

- **Not a picked API.** No OpenAPI file, no GraphQL schema, no router code.
- **Not a deployment plan.** Doesn't name a cloud, a runtime, a framework.
- **Not a pricing / entitlement design.** Pro tier shape is mentioned; the mechanism isn't specified.
- **Not independent of `data-shapes.md`.** Some combinations are natural, some are awkward. Read them together.
