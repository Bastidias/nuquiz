# Data Shapes for NuQuiz Content

> Background doc. Surveys three storage shapes — table-native, SPO triples, graph — plus hybrids, against the one constraint that isn't negotiable: every atomic CellFact has a stable, durable ID that survives text edits and reorders (see `pre-team-discussion.md` §3). Meant to be argued with.

## Status (2026-04-30)

- **Authoring / conceptual model: table-native (locked).** Rows × Columns × cells, matching the author view used in `docs/cissp/knowledge-map.md` and Concept files. UI, engine grammar, and SME workflow assume this.
- **Physical storage shape: open, and expected to evolve.** Whether the runtime DB stores rows-and-columns, SPO triples, a graph, or a hybrid is a data-architect call — and not a once-and-forever pick. **Design for migration, not lock-in.** The "Markdown-as-source-of-truth, DB-as-projection" hybrid (Shape 4 below) and SPO-shaped event logging (see "What logging shape this implies") become more attractive under this lens because they keep the runtime shape replaceable.
- The **CellFact-ID invariant is the bridge** that carries data across shape migrations. Get IDs right and the shape can change later; lose them and migrations corrupt history.
- Postgres (via Supabase) is the chosen substrate (`pre-team-discussion.md` Decisions). Postgres doesn't pick the shape — all four shapes fit Postgres, and shape changes within Postgres are migrations rather than rewrites.

The rest of this doc remains the survey the data architect will work from.

The engine's prompt grammar — `Row | Column → Value` — is shape-agnostic. The same Concept can be stored four different ways and still feed the same operators. But the storage choice cascades into the authoring UI, the DB schema, the API, migration ergonomics, and which questions are cheap vs. expensive. The shapes are not equivalent in practice. They also drag in their own vocabularies, which collide with ours — see the terminology section next.

---

## Terminology (naming is half the tradeoff)

Before the tradeoffs, the vocabulary problem. Each storage shape imports its own terms for the same moving parts. "Row," "dimension," "attribute," "subject," "node," "entity," "property," "predicate," "value," "triple," "fact" — every shape has a noun for every part, and the nouns do not line up one-to-one. Picking a shape is partly a decision about *what we call things*, and that decision survives past the shape we start with because it shapes how authors, UI, and code all talk about the content.

### The project vocabulary

Authoritative definitions live in `docs/glossary.md`. Summary for use in this doc:

- **Deck** / **Topic** / **Concept** — Deck is the whole collection (CISSP); Topic is a Deck subdivision (CISSP "Domain"); Concept is one comparable group, one file, one table.
- **TableName** — H1 heading of a Concept; the categorical label for what's compared.
- **Pattern** — Dimensions / Ordered / Aspects; the shape contract.
- **RowHeader** / **ColumnHeader** — label strings identifying a row / column. Each indexes 1..m Cells.
- **Cell** — the (RowHeader, ColumnHeader) intersection slot. Holds 1..m CellFacts.
- **CellFact** — one atomic, independently addressable assertion. Smallest unit the engine grades, addresses, distracts on.
- **Value** — the text content of a CellFact (used in the engine grammar `RowHeader | ColumnHeader → Value`, often shortened to `Row | Column → Value` as notation).

The Row (collection of Cells sharing one RowHeader) and Column (collection of Cells sharing one ColumnHeader) are implicit, derivable from the data; only the headers are first-class.

### Translation to each shape's native vocabulary

| Our term | Table-native | SPO triples | Property graph | UI-facing |
|---|---|---|---|---|
| Deck | DB / schema | Named graph | Top-level subgraph | Exam |
| Topic | Table group / tag | Predicate prefix or tag | Subgraph cluster / label | Domain |
| Concept | One table (or slice) | Set of triples sharing a Concept tag | Concept node + membership edges | *(inline on screen, rarely named)* |
| TableName | Table title | rdfs:label on the Concept | Concept node label | The table heading shown to the student |
| Pattern | Per-table convention | Per-Concept metadata | Per-Concept metadata | (selects renderer — never shown) |
| RowHeader | Row label cell (leftmost column) | Subject IRI / label | Node label | Pattern-renamed (Step / item / concept name) |
| ColumnHeader | Column header cell (top row) | Predicate IRI / label | Edge label / property key | Attribute / facet name |
| Cell | (row, column) intersection | (subject, predicate) pair | (node, edge-label) pair | — |
| CellFact | One entry in a cell | One triple | One edge (or node property) | *(invisible — shown as option text)* |
| Value | Cell text | Object | Target node / property value | The answer / distractor text |

No column in this table is wrong. Every row is the same underlying thing. But every boundary between columns is a place where a developer, a doc, or an SME can mean different things by the same word.

### The worst collisions

The earlier draft of this section flagged three naming problems. Two are now resolved by the literal vocabulary in `docs/glossary.md`:

1. ~~**"Row" is Pattern-dependent.**~~ **Resolved.** Split into `RowHeader` (the label string, structural and Pattern-agnostic) and Row (the implicit collection of Cells sharing one header). Pedagogical rendering renames per Pattern (`Step` / item / concept name) at the UI boundary; engine vocabulary stays neutral. Same treatment for `ColumnHeader` / Column.

2. **"Dimension" vs "Dimensions."** **Still relevant.** `Dimensions` remains the name of a Pattern. Per-row attributes are `ColumnHeader`s, never "dimensions." Avoid "dimension" as a synonym for ColumnHeader.

3. ~~**"Fact" is overloaded with the RDF world.**~~ **Resolved by renaming `Fact` → `CellFact`.** The `Cell` prefix anchors our atomic unit explicitly; RDF's "fact" (= whole triple) no longer collides. Defensive glossary lines at SPO-module boundaries are no longer needed — the names are different.

### Collisions from the shapes themselves

- **Table-native** overlaps with our vocabulary almost perfectly (row = Row, column = Column, cell = Cell). Low translation cost. The risk is the inverse: the SQL layer's "row" and our "Row" will sometimes genuinely differ (a multi-CellFact cell might be stored as several SQL rows even though the authoring Row is one thing).
- **SPO** brings "subject / predicate / object" which map cleanly to Row / Column / Value — but the SPO world's "fact" means the whole triple, which collides with our "CellFact." See #3 above.
- **Graph** brings "node / edge / property / label," which map cleanly for non-tabular reasoning (confusion graphs, prerequisite graphs) but awkwardly for tabular Concepts (a Row becomes a node, a Column becomes an edge label — fine, but the star-shape-per-Row obscures the tabular author view).

### Discipline guidance

- **Project vocabulary is primary.** Defined in `docs/glossary.md` (Concept / TableName / Pattern / RowHeader / ColumnHeader / Cell / CellFact). Used in code, schemas, and authoring tools.
- **Shape vocabulary is local.** SQL "row" and "column," RDF "triple," graph "node" / "edge" — each stays in its own code module. Translation happens at the module boundary.
- **UI vocabulary is rendered.** Pattern + TableName + ColumnHeader text substitute Pattern-appropriate domain nouns ("protocol," "phase," "attribute") at the UI layer. Engine names never reach students.
- **Glossary in one place.** `docs/glossary.md` is the single source of truth; this doc and others link to it.

---

## The running example

Throughout this doc we use the TCP/UDP/SCTP Concept from `docs/cissp/04-communication-and-network-security/tcp-udp-sctp.md`. Three Rows, eleven Columns, one or more atomic CellFacts per cell. A representative slice:

| Protocol | connection type | reliability | ordering | typical use cases |
|---|---|---|---|---|
| TCP | Connection-oriented | Reliable | Ordered | Web (HTTP, HTTPS)<br>Email (SMTP, IMAP) |
| UDP | Connectionless | Unreliable | Unordered | DNS<br>DHCP<br>VoIP |
| SCTP | Connection-oriented | Reliable | Partially ordered | Telephony signaling<br>WebRTC data channels |

Each CellFact is an atom. `TCP | reliability → Reliable` and `SCTP | reliability → Reliable` share a Value — the engine needs to detect that. `TCP | typical use cases → Web (HTTP, HTTPS)` is one CellFact because `Web (HTTP, HTTPS)` is a canonical name; `TCP | typical use cases → Email (SMTP, IMAP)` is a separate CellFact on a separate line.

Below, the same Concept in each shape.

---

## Shape 1 — Table-native (Rows × Columns × cells)

Storage matches the authoring view. A Concept is a table; a cell is addressed by `(concept_id, row_id, column_id)`; a cell contains an ordered list of CellFact IDs. The one-to-many from cell to CellFacts is native — a cell is a list, not a scalar — and each CellFact is a first-class entity with its own properties (text, order within cell, citation, authored-at, etc.), carried as columns on a CellFacts table. Multi-CellFact cells are storage-level; the `<br>` in markdown is just the authoring surface for the list, not the model. Anything SPO carries as a triple qualifier (ordering, provenance, timestamp) table-native carries as a column on the CellFact row.

```
concept:        tcp-udp-sctp                       (id: cpt-0042)
rows:           TCP (row-1), UDP (row-2), SCTP (row-3)
columns:        connection-type (col-A), reliability (col-B), ...
cells:          (cpt-0042, row-1, col-B) → [fact-7791]
fact-7791:      text="Reliable", in_cell=(cpt-0042, row-1, col-B)
fact-7792:      text="Reliable", in_cell=(cpt-0042, row-3, col-B)
```

**Pros**
- The author's mental model *is* the storage model. Authoring UI is a table editor. Markdown round-trip is clean.
- Cell-targeted operations (cell-completion targeting, per-Column distractor draws) are single lookups.
- Schema evolution is natural: add a Column = add a column.
- Diffs are readable. A row move is a row move.
- Shared-Value detection across Rows in the same Column is a group-by on cell text → cheap.

**Cons**
- Cross-Concept queries ("every CellFact whose Value is `Reliable`") require scanning every table or maintaining a secondary index. SPO and graph get this for free.
- CellFacts that span multiple Rows or multiple Columns (rare but real — e.g., a caveat that applies to two cells) don't have an obvious home.
- The shape is strong inside a Concept, weak between Concepts. If a CellFact in one Concept *is* a Row in another (e.g., `Kerberos` appears both as a Row in auth-protocols and as a CellFact in SSO-examples), you either duplicate or build a side-channel linking table — which is SPO by the back door.

**Verdict**: fastest path from author to engine. Worst long-term answer for cross-Concept and graph-ish questions.

---

## Shape 2 — SPO triples (subject, predicate, object)

One row per atomic CellFact, globally. Each triple is `(subject, predicate, object)` — borrowed from RDF. A Concept is not a storage unit; it's a *view* assembled by querying triples whose subject is one of the Concept's Rows.

```
fact-7791:  (TCP,  reliability,  "Reliable")
fact-7792:  (SCTP, reliability,  "Reliable")
fact-7793:  (UDP,  reliability,  "Unreliable")
fact-7801:  (TCP,  connection_type, "Connection-oriented")
fact-7802:  (TCP,  typical_use_case, "Web (HTTP, HTTPS)")
fact-7803:  (TCP,  typical_use_case, "Email (SMTP, IMAP)")
...
```

Concept membership is metadata: `concept(tcp-udp-sctp) contains rows {TCP, UDP, SCTP}, columns {reliability, connection_type, ...}`. Rendering the table is a join.

**Pros**
- One CellFact = one row globally. CellFact ID is unambiguous.
- Cross-Concept queries are free. "Every CellFact whose object is `Reliable`" is a single predicate-object index lookup.
- Natural fit for CellFact-level addressability. You don't have to bolt it on — it's the schema.
- Query language is mature (SPARQL, Datalog, or just SQL on a triples table).
- Adding an attribute to one Row doesn't require schema migration. Sparse data is natural.

**Cons**
- Authoring UX is the hard problem. A triples editor is a spreadsheet from hell unless you build a table view on top — at which point you're projecting back to Shape 1 for the author.
- Multi-CellFact cells have no native representation. Within-cell ordering needs an extra predicate or qualifier on every triple (`fact-7802` comes before `fact-7803` *within the cell*) — a source of drift. Table-native carries the same ordering as a plain column on the CellFact row; graph carries it as an edge property. SPO is the shape that pays most for this metadata.
- Ordered Concepts (TCP handshake, BCP phases) need explicit order predicates. Easy but verbose.
- Aggregations that feel like SQL GROUP BY get awkward in pure triple stores. Most teams end up with a SQL-backed triples table, not a real RDF store.
- "How big is this Concept?" requires a count query, not a row inspection.

**Verdict**: cleanest conceptual fit for the CellFact-ID invariant. Authoring is where this shape pays its rent.

### Wikipedia / Wikidata as the reference case

Wikipedia's infobox data and cross-lingual facts are stored in **Wikidata** — a Wikimedia-run knowledge base that is *explicitly* SPO. Each item (Q-id) has statements of the form `(item, property, value)`: `(Q2, P2046, "510072000 km²")` is "Earth, area, 510,072,000 km²". Properties (P-ids) and items (Q-ids) are themselves stored as items — the schema is data.

What Wikidata's experience tells us:

- **SPO scales.** Wikidata holds ~100M+ items and ~1.5B+ statements. Query via SPARQL endpoint. Proof of concept that triples don't fall over at volume.
- **Authoring is a solved but heavy problem.** The Wikidata UI is a per-item statement editor — nothing like a spreadsheet. Bulk edits use tools (QuickStatements, OpenRefine). A volunteer can add one statement; a power user runs batched edits. *This is the authoring cost of SPO*: the native surface is per-CellFact, and table-like authoring is a separate tool layer.
- **Multilingual labels are a property, not a schema concern.** Because Wikidata separates the item (Q2 = Earth) from its labels in each language, translation is free. Relevant if NuQuiz ever localizes.
- **Provenance travels with the triple.** Every statement can carry references and qualifiers — `(Earth, population, "8.1B")` with qualifier `(as of, 2026)` and reference `(source, UN DESA)`. This maps cleanly onto our per-CellFact citation requirement.
- **The cost Wikidata pays.** Statement-level editing is granular to the point of being tedious without tooling; infobox display on Wikipedia requires a projection layer (Lua modules pulling from Wikidata). The "what does this item look like as a page?" view is rendered, not stored.

The Wikidata lesson for us: SPO gives you CellFact-level addressability, cross-item queries, and provenance natively. You pay for it in authoring ergonomics. Whether that bill is affordable depends on how table-shaped our content really is — and ours is very table-shaped (see `docs/cissp/knowledge-map.md`).

---

## Shape 3 — Graph (labeled property graph)

Rows and Values become **nodes**; Columns become **typed edges** (or edges carrying a Column label). A CellFact is an edge.

```
(TCP) -[reliability]-> ("Reliable")
(SCTP) -[reliability]-> ("Reliable")
(TCP) -[typical_use_case {order:1}]-> ("Web (HTTP, HTTPS)")
(TCP) -[typical_use_case {order:2}]-> ("Email (SMTP, IMAP)")
```

The graph model (Neo4j, Memgraph, and the property-graph flavor of most modern graph DBs) is SPO's cousin: same `subject → predicate → object` grammar, but edges can carry properties (order, citation, timestamp) and nodes are first-class.

**Pros**
- Multi-hop reasoning is cheap. "Every protocol whose reliability is `Reliable` and whose typical use case includes something at OSI Layer 7" is a graph traversal. SPO can do it; graphs make it pleasant.
- Edges-with-properties carry per-CellFact metadata (within-cell ordering, citation, timestamp) directly on the edge. Table-native carries the same metadata as columns on the CellFacts table; the gain over table-native here is ergonomic, not capability.
- Visual reasoning tools (graph UIs) are mature.
- Natural fit for confusion pairs — a confusion relationship *is* an edge.

**Cons**
- The engine's actual query load is overwhelmingly 1-hop. Graph power over SPO only pays off if we need traversals regularly, and it's not obvious that we do.
- Graph DB ops overhead is real — licensing (Neo4j), operational complexity, smaller ecosystem than SQL.
- Authoring is worse than SPO, not better. A graph editor for a domain expert is a bridge too far.
- For tabular Concepts, you end up with a star-shape per Row (the Row node at the center, one edge per Column). Rendering that back to a table is a projection — same cost as SPO.

**Verdict**: overkill unless the product grows teeth we haven't grown yet (cross-domain reasoning, semantic search, prerequisite chains). Strong option to keep in view; weak option to start with.

---

## Shape 4 — Hybrid

The practical shapes teams end up with:

- **Table-native storage, SPO projection.** Author and store as tables; derive a triples index for cross-Concept queries. Most common pattern — SQL tables as primary, a `facts` table `(fact_id, concept_id, row_id, column_id, value, order_in_cell)` built alongside or on commit.
- **SPO storage, table projection.** Store one triple per CellFact; render tables from saved "Concept definitions" (which Rows × which Columns belong to this Concept). Closer to Wikidata's model.
- **Graph storage, table projection.** Same idea, heavier substrate.
- **Markdown-as-source-of-truth, DB-as-projection.** The repo stays as the author's edit surface; a build step emits the runtime DB in whichever shape we pick. Keeps git as the history layer and makes shape changes cheaper.

The last one is worth staring at. If the author-facing artifact is markdown tables (what we have now) and the runtime shape is built, the runtime shape becomes a less-expensive decision — we can change it without asking SMEs to learn a new tool.

---

## What the engine actually needs

The non-negotiable: **every atomic CellFact has a stable, durable ID that survives text edits, reorders, and surrounding changes.** See `project_fact_addressability_invariant` memory and `pre-team-discussion.md` §3.

Every shape above can satisfy that rule if built carefully, and every shape can violate it if built sloppily. The invariant does not pick a shape — it filters out bad implementations of any shape.

What the engine does most often:

1. **Enumerate CellFacts in a cell.** `(concept, row, column) → [fact_ids]`. Cheap in every shape.
2. **Find Rows sharing a Value in a Column.** `(concept, column, value) → [rows]`. Cheap in table-native (group-by), cheap in SPO (predicate-object index), cheap in graph.
3. **Draw distractors from a Column.** All Values in `(concept, column)` minus the correct one. Cheap everywhere.
4. **Look up a CellFact by ID.** Cheap everywhere if IDs are indexed.
5. **Per-CellFact response history.** `student × fact_id → attempts`. Orthogonal to shape; lives in a response table keyed on CellFact ID.
6. **Cross-Concept CellFact lookup.** "Everywhere `Kerberos` appears." Cheap in SPO and graph, requires a secondary index in table-native.

(6) is the only operation where the shapes genuinely differ in cost. Whether it matters depends on whether cross-Concept features (confusion pairs across Concepts, semantic review modes, prerequisite graphs) are v1 or later.

---

## Data shape × analytics capabilities

The differentiators in `docs/demo/capabilities.md` — per-CellFact response history, adaptive distractors, confusion pairs, distractor coverage, sharing analysis, phantom-fact detection, cell-completion targeting, author-side reports — are the *product*. They are also the most shape-sensitive part of the system, not because the shapes can or can't support them, but because they radically change how cheap each one is to compute, maintain, and extend.

### What all three shapes give you for free (if the invariant holds)

Every capability that keys on a *single CellFact ID* is shape-orthogonal. The CellFact-ID invariant does the work; the shape is irrelevant. Specifically:

- **Per-CellFact response history.** `(student_id, fact_id, outcome, timestamp)` lives in a response log. Joining back to "what cell was this" is a CellFact-ID lookup — one hop in every shape.
- **Cohort stats.** "CellFact X miss rate across all students" is `GROUP BY fact_id` on the response log. Shape-orthogonal.
- **Cell-completion targeting.** "Student got 2 of 3 CellFacts in this cell, target the 3rd" needs `(concept, row, column) → [fact_ids]`. All three shapes can answer this in one lookup, provided multi-CellFact cells carry ordering/grouping metadata (not derived from text).
- **Phantom-fact detection.** Full-text search on the corpus of CellFact strings. Identical in all shapes; a search index problem, not a storage problem.
- **Author-facing lifecycle reports.** "CellFacts nobody has missed in 90 days" / "CellFacts never offered as a distractor" / "CellFacts with highest confusion count" — all keyed on CellFact ID over the response log and distractor log.
- **Confidence-elicitation and hot-streak analytics.** Derived from the per-CellFact response history.

The common thread: **log every offered option with its CellFact ID at question-generation time, not just the right-wrong bit.** This is the single most consequential logging decision. Get it right and most analytics are joins; get it wrong and most analytics are impossible regardless of storage shape.

### Where the shapes genuinely diverge

The capabilities that cross Concept boundaries, reason about the table's structure, or treat confusion as a graph are where shape starts to matter.

**Cross-Concept confusion pairs.** "Student confuses `Kerberos` (an SSO example CellFact in `sso-protocols.md`) with `Kerberos` (a Row in `auth-protocols.md`)" — or more commonly, confuses CellFacts whose strings are identical but whose coordinates are different. In **table-native**, detecting this requires either a secondary "CellFact value index" (built alongside the table) or a scan; it works but it's bolt-on. In **SPO/graph**, the same object appearing as a value in multiple triples / as the tail of multiple edges is native — a single predicate-object lookup.

**Confusion graph per student.** The capabilities doc describes this as `Frame ↔ Packet (3 swaps)`. In table-native this is a materialized view: `SELECT picked_fact_id, correct_fact_id, count(*) FROM responses WHERE outcome='wrong' GROUP BY ...`. Fine, works. In **graph**, it's first-class — the student node has confusion-edges to CellFact nodes, counts on the edges. Pulling "all confusion pairs for student X involving CellFacts from Domain 4" is one traversal vs. a multi-join.

**Distractor coverage report.** "Every CellFact has been used as a distractor ≥ N times across the dataset." Requires logging every offered distractor with a CellFact ID. The report itself is `GROUP BY fact_id` on the distractor log — shape-orthogonal. But the harder question — "is each CellFact *well*-distracted, i.e., offered against semantically near neighbors rather than random CellFacts?" — becomes a neighborhood query. In **table-native** you ask "same Column, other Rows"; that's local and cheap. In **SPO/graph** you can also ask "same object across Concepts" / "semantic neighbors by shared properties" — richer neighborhoods, possible only when cross-Concept lookups are free.

**Sharing analysis (within a Concept).** "Which Rows share the `reliability = Reliable` Value?" All three shapes answer this cheaply — it's a group-by on the Concept projection. Identical cost, identical utility.

**Sharing analysis (across Concepts).** "Which CellFacts appear as Values in more than one Concept?" The hub-CellFact question. **Table-native** needs the side index (again). **SPO/graph** answer this natively — group triples by object where the object has multiple distinct (subject, predicate) pairs.

**Structural-reasoning question generation.** Outlier mode, missing-Row inference, and the "same CellFact, different prompt shape" variant are all *within-Concept* — they read a Concept's Rows × Columns and generate. All three shapes serve this well, provided there's a Concept-projection layer. **Table-native** is the most direct. **SPO/graph** require the projection to be cheap (it is — one indexed lookup per subject).

**Prerequisite graphs.** "Mastering CellFact A is a prerequisite for Concept B" — not in v1, but plausible later. In **table-native**, this is a whole new side table. In **SPO/graph**, it's a new predicate / edge type. The cost of *adding* this capability is where the shapes differ most: additive in SPO/graph, schema-change in table-native.

**Semantic neighborhoods.** "CellFacts about `authentication`" across the whole deck — CellFacts whose Row, Column, or Value touches the concept. In SPO/graph, this is a labeled traversal. In table-native, it's a full-corpus text search. Same answer; very different substrate.

### What logging shape this implies

Independent of storage shape, the analytics capabilities demand that **every question event logs**:

- Prompt CellFact (the coordinate being asked).
- Correct CellFact (the target answer, by ID).
- Every offered option with its CellFact ID and its role (correct, distractor-same-column, distractor-cross-column, distractor-near-string, distractor-adaptive-picked-before, etc.).
- Student's picked CellFact ID(s).
- Confidence rating if collected.
- Timing, session, prompt-shape variant.

The response log is a **triple store in disguise**: `(student_id, fact_id, interaction_type)` with properties. Even if the content store is table-native, the response store wants to be SPO-shaped because that's what the analytics queries look like. This is a real argument for hybrid: **table-native for content, SPO-shaped for events.** The two don't have to agree.

### Analytics capabilities that pressure the shape choice

If v1 includes:

- Confusion pairs within a Concept — any shape.
- Adaptive distractors using student history — any shape.
- Distractor coverage report — any shape.
- Sharing analysis within Concept — any shape.
- Cell-completion targeting — any shape.

If v2 or later includes:

- Cross-Concept confusion, hub-CellFact detection, prerequisite graphs, semantic neighborhoods, cross-deck analytics, "students who mastered CellFacts A/B/C also passed" — **SPO or graph is dramatically easier, or the table-native side index grows into an SPO store anyway.**

This is the pragmatic case for planning SPO-shape from the start, even if the primary content store is table-native: the analytics *want* SPO eventually. Building the event log SPO-shaped is cheap insurance; retrofitting the content store later is expensive.

---

## The tradeoff, compressed

| | Table-native | SPO | Graph | Markdown → projected |
|---|---|---|---|---|
| **Authoring ergonomics** | Best | Worst without tooling | Worst | Best (markdown) |
| **CellFact-ID invariant** | Requires discipline | Native | Native | Depends on projection |
| **Cross-Concept queries** | Side index required | Native | Native | Depends on projection |
| **Schema evolution** | Column add = migration | Free | Free | Cheap (rebuild projection) |
| **Within-Concept analytics** | Cheap | Cheap | Cheap | Depends on projection |
| **Cross-Concept analytics (hub CellFacts, prerequisite, semantic)** | Hard (side index grows into SPO) | Native | Native | Depends on projection |
| **Confusion graph** | Materialized view | Materialized view | First-class | Depends on projection |
| **Ops overhead** | Lowest | Low-medium | Highest | Lowest |
| **Ecosystem fit for SMEs** | Tables ≈ Excel | None | None | Markdown + PRs |
| **Maps to demo capabilities** | Yes | Yes | Yes | Yes |

No row ranks the same across columns. Each shape wins something and loses something. The decision is which losses we can live with.

---

## Open questions for the team

- **How much cross-Concept querying do we actually need in v1?** If the answer is "basically none, a Concept is self-contained," table-native is cheap and fine. If the answer is "confusion pairs span Concepts and we want semantic search in v2," start with SPO-compatible storage or plan the migration.
- **Who authors, in what tool?** A markdown-forever answer (tables in `.md`, SME review via PR) decouples author surface from runtime shape and makes this whole decision reversible. A Builder UI bakes in the shape.
- **Do we want provenance at CellFact granularity?** If yes (and our citation practice says yes), SPO/graph handle it natively; table-native needs a parallel citations table keyed on CellFact ID.
- **Is the runtime one DB or two?** Authoring store + engine store can have different shapes. The cost is a build step; the benefit is that shape-per-purpose is legal.

---

## What this doc is not

- **Not a recommendation.** Every shape has a real case. The team picks.
- **Not a schema.** No tables, no DDL, no API shapes — those belong in a design doc after the call is made.
- **Not a performance analysis.** No benchmarks. All four shapes perform fine at our plausible data volumes (~5,000 CellFacts for CISSP); the decision is about ergonomics and future optionality, not query latency.
- **Not final.** Update as the team's thinking hardens or as we learn things from the demo content that reshape the argument.
