# Import / Export Controls

**Domain:** 1 — Security and Risk Management &nbsp;|&nbsp; **Pattern:** Dimensions &nbsp;|&nbsp; **Tags:** 1.5
**Status:** draft (SME review pending)

The four export-control regimes CISSP candidates are expected to recognize. ITAR governs defense articles; EAR governs dual-use commercial items including most cryptography; Wassenaar Arrangement is the international agreement that sets the baseline for many national export-control lists; OFAC sanctions are the embargo regime that overlays everything. Cryptography exports specifically are heavily tested because they cross multiple regimes simultaneously.

| Regime | jurisdiction | scope | enforcer | typical conduct controlled |
|---|---|---|---|---|
| ITAR | United States | Defense articles and services on the USML [s1] | Department of State DDTC | Export of military hardware<br>Defense-services technical data<br>Cryptography embedded in military systems |
| EAR | United States | Dual-use commercial items on the CCL [s2] | Department of Commerce BIS | Export of commercial encryption<br>Dual-use software<br>Reexport from foreign countries |
| Wassenaar Arrangement | International (42 participating states) | Multilateral export-control framework [s3] | Each member state via its own laws | Conventional arms<br>Dual-use goods and technologies<br>Cryptographic items |
| OFAC sanctions | United States | Embargo and sanctions program [s4] | Department of Treasury OFAC | Transactions with sanctioned countries, entities, or individuals |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. **No parentheticals in cells.**
- **Acronym expansions.** `ITAR` = International Traffic in Arms Regulations. `EAR` = Export Administration Regulations. `OFAC` = Office of Foreign Assets Control. `USML` = United States Munitions List. `CCL` = Commerce Control List. `BIS` = Bureau of Industry and Security. `DDTC` = Directorate of Defense Trade Controls.
- **ITAR vs EAR jurisdictional split.** USML items (defense articles) are ITAR-controlled by State/DDTC; CCL items (dual-use commercial including cryptography) are EAR-controlled by Commerce/BIS. The boundary moves over time — many cryptographic items moved from USML to CCL in the late 1990s, broadening commercial cryptography access.
- **Cryptography under EAR.** Most commercial cryptography falls under ECCN 5A002 (encryption hardware) or 5D002 (encryption software). Mass-market exception (license exception ENC) covers most commercial encryption to most destinations. License Exception TSU covers source code released to the public. The 1996 Bernstein case established that source code is protected speech under the First Amendment, accelerating relaxation.
- **Wassenaar sets the baseline.** The Wassenaar Arrangement (1996) is a voluntary multilateral framework — 42 participating states agree to control similar items. Each member implements its own national export-control laws referencing the Wassenaar lists. The US, EU, Japan, UK, Australia, etc. all have parallel structures.
- **Dual-use means civil and military applicability.** A "dual-use" item has legitimate commercial uses but could also be used militarily. Encryption is the canonical example — used everywhere commercially but originally classified as a munition because military communications relied on it. Modern dual-use lists are pragmatic about distinguishing actual commercial use from military repurposing.
- **OFAC is sanctions, not technology controls.** OFAC operates Specially Designated Nationals (SDN) lists and country-based embargoes (Cuba, Iran, North Korea, Syria, Russia post-2022). Even items not subject to ITAR or EAR cannot be exported to OFAC-sanctioned destinations. SaaS providers must screen against OFAC SDN lists.
- **Deemed export.** A US export-control trap. "Deemed export" is the release of controlled technology to a foreign national *within* the United States — typically by hiring a foreign worker who then has access to controlled tech. Treated as if you exported the technology to that person's home country. License may be required even for in-US disclosure.
- **Software-as-a-service implications.** Modern SaaS providers face export-control questions: can foreign customers access the service? Can foreign-national employees access certain customer data? These questions are rarely tested at the technical level on CISSP but the *concept* is testable.
- **Cross-Concept link.** Sibling Concepts: `computer-crime-laws` (the criminal-prosecution side), `privacy-laws` (data-protection regulations that can also restrict cross-border transfer), `data-sovereignty` in D2 (which reinforces export-control logic with privacy-law logic).
- **Out of scope for this Concept:** specific ECCN classification details, license exception eligibility tables, OFAC SDN list mechanics, EU dual-use regulation specifics (Regulation 2021/821), Five Eyes-specific arrangements, post-Brexit UK divergence from EU export controls.

### Tricky distractors

- **ITAR vs EAR for cryptography.** Most commercial cryptography is *EAR*, not ITAR. Wrong-answer pattern: "ITAR controls all encryption exports." This was historically true (pre-1996) but is no longer correct.
- **Wassenaar vs ITAR.** Wassenaar is *international and voluntary*; ITAR is *US national and binding*. Wassenaar member states implement their own national controls — Wassenaar itself is not directly enforceable.
- **Deemed export vs actual export.** Deemed export covers in-country disclosure to foreign nationals. The wrong-answer pattern: thinking only physical / digital cross-border transfers count as exports.
- **OFAC vs EAR.** Both can require export licenses but for different reasons. OFAC is *destination-based* (sanctioned country/entity); EAR is *item-based* (controlled technology). A non-controlled item to a non-sanctioned country needs no license; a controlled item to anyone needs EAR review; *anything* to a sanctioned destination requires OFAC review.

### Values without a direct public citation

| Cell | Value | Why unsourced |
|---|---|---|
| Wassenaar Arrangement × jurisdiction | `International (42 participating states)` | Member state count varies as states join; cell value reflects retrieval-date count. |
| All rows × typical conduct controlled | Conduct lists | Industry-typical examples; not direct quotations from the regulating agency's enumeration. |

## Engine demo opportunities

- `ITAR | jurisdiction → ?` → `United States`
- `EAR | enforcer → ?` → `Department of Commerce BIS`
- `? | scope → Defense articles and services on the USML` → `ITAR`
- `? | scope → Dual-use commercial items on the CCL` → `EAR`
- `Wassenaar Arrangement | jurisdiction → ?` → `International (42 participating states)`
- `OFAC sanctions | enforcer → ?` → `Department of Treasury OFAC`
- `? | typical conduct controlled → Export of commercial encryption` → `EAR` (sub-Fact in multi-Fact cell)
- Composite ITAR Row with `scope` swapped to `Dual-use commercial items on the CCL` — directly tests the ITAR-vs-EAR jurisdictional split (USML defense vs CCL dual-use)
- Composite EAR Row with `enforcer` swapped to `Department of State DDTC` — tests enforcer-to-regime pairing (EAR is Commerce; ITAR is State)
- Composite OFAC sanctions Row with `scope` swapped to `Dual-use commercial items on the CCL` — tests OFAC-vs-EAR distinction (OFAC is sanctions; EAR is technology)

## Sources

- `[s1]`: International Traffic in Arms Regulations, 22 CFR §§120–130, and the United States Munitions List (retrieved 2026-04-26, https://www.pmddtc.state.gov/ddtc_public/ddtc_public?id=ddtc_public_portal_itar_landing)
- `[s2]`: Export Administration Regulations, 15 CFR §§730–774, and the Commerce Control List (retrieved 2026-04-26, https://www.bis.doc.gov/index.php/regulations/export-administration-regulations-ear)
- `[s3]`: Wassenaar Arrangement on Export Controls for Conventional Arms and Dual-Use Goods and Technologies (retrieved 2026-04-26, https://www.wassenaar.org/)
- `[s4]`: Office of Foreign Assets Control sanctions programs and Specially Designated Nationals list (retrieved 2026-04-26, https://ofac.treasury.gov/)
