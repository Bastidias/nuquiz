# Open Source License Types

**Domain:** 8 — Software Development Security &nbsp;|&nbsp; **Pattern:** Dimensions &nbsp;|&nbsp; **Tags:** 8.4
**Status:** draft (SME review pending)

The six software license categories CISSP candidates should distinguish. The discriminating axis is *copyleft strength* — the degree to which using the licensed code obligates derivative works to share their source. Strong copyleft (GPL) requires full source disclosure of derivatives; weak copyleft (LGPL) allows linking from proprietary code; permissive licenses (MIT, Apache 2.0, BSD) impose minimal obligations; proprietary licenses prohibit redistribution. Misunderstanding license obligations is a real legal-risk vector for software organizations.

| License | copyleft strength | commercial use | derivative-work rules |
|---|---|---|---|
| GPL | Strong [s1] | Permitted [s1] | Derivatives must use GPL<br>Source must be disclosed [s1] |
| LGPL | Weak [s1] | Permitted [s1] | Linking from proprietary code permitted<br>Modifications to LGPL code must be LGPL [s1] |
| MIT | None [s2] | Permitted [s2] | No copyleft obligation<br>Attribution required [s2] |
| Apache 2.0 | None [s2] | Permitted [s2] | No copyleft obligation<br>Patent grant included<br>Attribution required [s2] |
| BSD | None [s2] | Permitted [s2] | No copyleft obligation<br>Attribution required [s2] |
| Proprietary | Not applicable | Per license terms | Redistribution typically prohibited |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. **No parentheticals in cells.**
- **Acronym expansions.** `GPL` = GNU General Public License (versions 2 and 3 in common use). `LGPL` = GNU Lesser General Public License. `MIT` = Massachusetts Institute of Technology license (also called X11 license). `BSD` = Berkeley Software Distribution license (2-clause and 3-clause variants).
- **Copyleft.** A license property that requires derivative works to be distributed under the same license terms. "Strong copyleft" (GPL) propagates through any derivative; "weak copyleft" (LGPL) propagates only through modifications of the licensed code, not through code that merely links to it. "Permissive" licenses (MIT, Apache 2.0, BSD) do not propagate at all.
- **GPL "viral" framing.** Strong copyleft is sometimes called "viral" because incorporating GPL code into a larger work obligates the entire work to GPL terms. This is a feature for the GPL ecosystem (it ensures continued openness) and a risk for closed-source organizations (it can force unwanted disclosure). CISSP framing should treat this as a *legal-risk* topic, not a security-risk topic.
- **LGPL was created for libraries.** LGPL ("Library" GPL, later renamed "Lesser" GPL) was specifically designed to let proprietary applications link against open-source libraries (glibc, GTK, Qt) without inheriting GPL obligations on the application code. Modifications to the LGPL'd library itself remain LGPL.
- **Apache 2.0 patent grant.** Apache 2.0 includes an explicit patent grant from contributors and a patent termination clause — if a user sues for patent infringement over Apache-licensed code, their patent grant terminates. This is the main practical difference between Apache 2.0 and MIT/BSD licenses, which lack explicit patent grants.
- **MIT vs BSD.** MIT and BSD-2-Clause are functionally near-identical short permissive licenses. BSD-3-Clause adds a non-endorsement clause (cannot use the project name or contributors to promote derivatives). BSD-4-Clause (deprecated) added an advertising clause that proved incompatible with GPL.
- **Proprietary licenses are not open source.** The Proprietary row exists to anchor the "not all licenses are open source" boundary. Commercial-use rights and derivative-work rules are entirely contract-defined; there is no canonical Proprietary license. Examples: standard EULAs, commercial software licenses, custom MSAs.
- **OSI vs FSF approval.** The Open Source Initiative (OSI) maintains the canonical list of OSI-approved open source licenses; the Free Software Foundation (FSF) maintains its own list with overlapping but not identical scope. Both lists [s1, s2] include GPL, LGPL, MIT, Apache 2.0, and BSD; only OSI explicitly approves; FSF adds free-software-philosophy framing.
- **Out of scope for this Concept:** specific GPL versions (v2 vs v3 differences, including Tivoization clause), Affero GPL (AGPL — strong copyleft for SaaS), Mozilla Public License (MPL — file-level weak copyleft), Creative Commons (used for non-software content), dual licensing, license-compatibility matrices, FOSSology / FOSSA / Black Duck commercial license-compliance tooling.

### Tricky distractors

- **GPL is strong copyleft (viral).** Derivatives must be GPL. Wrong-answer pattern: claiming GPL is permissive — most commonly confused with MIT/BSD.
- **LGPL allows linking from proprietary.** Designed for libraries. Wrong-answer pattern: claiming LGPL is the same as GPL — LGPL was specifically created to weaken copyleft.
- **Apache 2.0 has explicit patent grant.** MIT/BSD don't. Wrong-answer pattern: equating Apache 2.0 with MIT — patent grant is the key practical difference.
- **MIT and BSD are functionally near-identical.** Both permissive, attribution required. Wrong-answer pattern: claiming they have meaningfully different obligations — minor differences only.
- **AGPL extends GPL to SaaS.** Closes the "internet loophole." Wrong-answer pattern: confusing AGPL with regular GPL — AGPL applies copyleft to network use.
- **Permissive ≠ public domain.** Attribution still required for MIT/BSD/Apache. Wrong-answer pattern: claiming MIT is no-strings-attached — attribution is mandatory.

### Values without a direct public citation

| Cell | Value | Why unsourced |
|---|---|---|
| Proprietary × all cells | — | "Proprietary" is a category, not a single license; cell values describe the dominant pattern across commercial EULAs without a single citation. |
| All rows × commercial use | `Permitted` / `Per license terms` | OSI license texts [s2] permit commercial use across all listed open source licenses; the "Permitted" cell value summarizes without quoting per license. |

## Engine demo opportunities

- `GPL | copyleft strength → ?` → `Strong`
- `MIT | copyleft strength → ?` → `None`
- `LGPL | copyleft strength → ?` → `Weak`
- `? | copyleft strength → None` → `MIT`, `Apache 2.0`, `BSD` — shared-Value select-all (the three permissive licenses)
- `? | copyleft strength → Strong` → `GPL`
- `Apache 2.0 | derivative-work rules → ?` → `No copyleft obligation`, `Patent grant included`, `Attribution required`
- `? | derivative-work rules → Patent grant included` → `Apache 2.0`
- Composite GPL Row with `copyleft strength` swapped to `None` — directly tests the GPL-is-copyleft point (the defining property of GPL is its strong copyleft)
- Composite LGPL Row with `copyleft strength` swapped to `Strong` — tests the LGPL/GPL distinction (LGPL was created precisely to weaken GPL's copyleft for library use)
- Composite MIT Row with `derivative-work rules` swapped to `Derivatives must use GPL`, `Source must be disclosed` — tests the permissive vs strong-copyleft polarity
- Composite Apache 2.0 Row with `derivative-work rules` removing the `Patent grant included` Fact — tests recognition that the patent grant is the defining feature of Apache 2.0 vs MIT/BSD

## Sources

- `[s1]`: Free Software Foundation, "Various Licenses and Comments about Them" — GPL, LGPL, AGPL canonical texts and FSF analysis (retrieved 2026-04-25, https://www.gnu.org/licenses/license-list.html)
- `[s2]`: Open Source Initiative, "Licenses & Standards" — OSI-approved license list with canonical full texts (retrieved 2026-04-25, https://opensource.org/licenses/)
- `[s3]`: SPDX License List — machine-readable license identifier registry used by SBOMs (retrieved 2026-04-25, https://spdx.org/licenses/)
