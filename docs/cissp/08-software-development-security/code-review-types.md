# Code Review Types

**Domain:** 8 — Software Development Security &nbsp;|&nbsp; **Pattern:** Dimensions &nbsp;|&nbsp; **Tags:** 8.3
**Status:** draft (SME review pending)

The four code-review approaches CISSP candidates are expected to discriminate. The discriminating axes are *who reviews* (a peer, a tool, a partner programmer, or a formal team), *how deeply* the code is examined, and *how much time* the review consumes per change. Formal inspection (Fagan inspection [s1]) is the most rigorous — and most expensive — of the four; tool-assisted review is the cheapest but is bounded by what the tool can recognize. CISSP testing usually frames "which has the highest defect-finding rate" (Formal inspection) and "which is automatable" (Tool-assisted).

| Type | depth | time cost | defect-finding rate |
|---|---|---|---|
| Peer review | Surface-level<br>Logic checks | Low | Moderate |
| Tool-assisted review | Pattern-based<br>Static analysis | Very low | High for known patterns<br>Low for novel issues |
| Pair programming | Real-time review during coding | Doubled per task | High |
| Formal inspection | Line-by-line<br>Documented defects [s1] | High [s1] | Highest [s1] |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. **No parentheticals in cells.** Method names (Fagan inspection, IEEE 1028) live in this section, not in cell values.
- **Formal inspection = Fagan inspection.** Michael Fagan defined the formal inspection process at IBM in 1976 [s1]: a structured review with defined roles (moderator, reader, recorder, inspectors), preparation time, an inspection meeting, defect logging, and follow-up rework. IEEE 1028 codified the process. Industry literature treats "formal inspection" and "Fagan inspection" as synonyms; the cell uses the more general name to match (ISC)² phrasing.
- **Time-cost framing.** "Low / Very low / Doubled per task / High" reflects the relative cost per code change, not absolute clock time. Pair programming "doubles" because two developers consume time on a single task; in practice Microsoft / Google studies suggest the doubling is offset by reduced defect-fix effort downstream, so the *net* cost is closer to even.
- **Tool-assisted review is not a replacement for human review.** Tools catch what they are programmed to recognize — pattern-based vulnerabilities, style violations, complexity thresholds. They miss design flaws, business-logic errors, missing-control issues, and novel attacks. The cell records "High for known patterns / Low for novel issues" to capture this duality. CISSP framing: tool-assisted review is *augmentation*, not a control by itself.
- **Pair programming is review-during-creation.** Distinct from the other three because the review happens *while* the code is being written rather than after. The "navigator" reviews each line as the "driver" types it. Defect-finding rate is high because review and rework are continuous; downside is the time cost of two developers on one task.
- **Peer review = pull request review in modern terms.** GitHub / GitLab pull requests are the dominant peer-review mechanism today. Quality varies dramatically by team culture — careful peer review approaches formal-inspection effectiveness; rubber-stamp peer review barely catches surface defects. The cell's "Moderate" rating reflects the average case.
- **Defect-finding rate is comparative, not quantitative.** No public source publishes a single normative defect-finding rate per review type. Industry studies (notably Capers Jones and the SEI) consistently rank Formal inspection highest, Pair programming high, Peer review moderate. The cell values reflect this rank ordering rather than absolute percentages.
- **Out of scope for this Concept:** specific Fagan inspection roles and procedure (worth its own Concept if testing depth grows), modern variations (Modern Code Review per Bacchelli & Bird 2013), AI-assisted code review tools (GitHub Copilot for PRs, Cursor), threat-model-driven code review, security-specific code review checklists.

### Tricky distractors

- **Formal inspection has highest defect-finding rate.** Most rigorous = most expensive. Wrong-answer pattern: claiming pair programming finds more — formal inspection edges it out for documented defects.
- **Formal inspection = Fagan inspection.** Synonyms in CISSP framing. Wrong-answer pattern: treating them as different — Michael Fagan's 1976 process is the canonical formal inspection.
- **Tool-assisted is high for known, low for novel.** Pattern-bound. Wrong-answer pattern: claiming tools replace formal inspection — they can't catch novel issues.
- **Pair programming review is concurrent, not after.** Real-time review while coding. Wrong-answer pattern: collapsing pair programming with peer review — they happen at different times.
- **Peer review effectiveness varies by culture.** Rubber-stamp PRs are nearly useless. Wrong-answer pattern: claiming peer review uniformly catches defects — depends on team rigor.
- **Code review ≠ SAST.** Code review is people; SAST is automated. Wrong-answer pattern: lumping them — different tools, different scope.

### Values without a direct public citation

Most cells in this table reflect industry / CISSP pedagogical consensus rather than primary citation. Fagan's 1976 paper [s1] provides the authoritative description of formal inspection; the comparative rankings against other review types are pedagogical synthesis from sources including Capers Jones's defect-removal effectiveness studies and SEI publications, not directly fetched primary-source in this research pass.

| Cell | Notes |
|---|---|
| Peer review × all cells | "Surface-level / Low / Moderate" reflects industry average; pull-request review effectiveness varies widely by team culture. |
| Tool-assisted review × all cells | "Pattern-based / Very low / High for known patterns" — captures what static-analysis tools can and cannot do; not a direct quote. |
| Pair programming × all cells | "Real-time / Doubled per task / High" — common practitioner framings; cost-benefit studies vary on the net effect. |

## Engine demo opportunities

- `Formal inspection | defect-finding rate → ?` → `Highest`
- `Tool-assisted review | time cost → ?` → `Very low`
- `Pair programming | depth → ?` → `Real-time review during coding`
- `? | defect-finding rate → Highest` → `Formal inspection`
- `? | time cost → Doubled per task` → `Pair programming`
- `? | depth → Line-by-line` → `Formal inspection` (sub-Fact in multi-Fact cell)
- Composite Peer review Row with `defect-finding rate` swapped to `Highest` — directly tests the formal-inspection rigor (peer review is moderate; formal inspection is the highest)
- Composite Tool-assisted review Row with `defect-finding rate` swapped to `Highest` — tests that automation does not replace human formal review (tools are high for known patterns, not highest overall)
- Composite Formal inspection Row with `time cost` swapped to `Low` — tests the formal-inspection cost (high effort by design; the rigor is what produces the high defect-finding rate)

## Sources

- `[s1]`: Michael E. Fagan, "Design and Code Inspections to Reduce Errors in Program Development," IBM Systems Journal Vol. 15 No. 3 (1976) — original Fagan inspection paper (retrieved 2026-04-25, https://www.computer.org/csdl/magazine/co/2002/12/r12047/13rRUNvyaM5)
- `[s2]`: IEEE Std 1028-2008, "IEEE Standard for Software Reviews and Audits" — codified review processes including formal inspection (paywalled; cited as authoritative reference, retrieved 2026-04-25, https://standards.ieee.org/ieee/1028/3848/)
- `[s3]`: NIST SP 800-218, "Secure Software Development Framework (SSDF) Version 1.1" — Practice PW.7 (Review and/or Analyze Human-Readable Code) (February 2022, retrieved 2026-04-25, https://csrc.nist.gov/publications/detail/sp/800-218/final)
