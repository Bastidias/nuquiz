# IKE Phases

**Domain:** 4 — Communication and Network Security &nbsp;|&nbsp; **Pattern:** Ordered &nbsp;|&nbsp; **Tags:** 4.2, 4.3
**Status:** draft (SME review pending)

The two-phase Internet Key Exchange that sets up IPsec SAs. Phase 1 establishes an authenticated channel between the two IKE peers (the ISAKMP SA); Phase 2 uses that channel to negotiate the actual IPsec SAs that will carry AH or ESP traffic. CISSP testing focuses on three discriminators: the phase ordering, the name of each mode (Main / Aggressive / Quick in IKEv1), and which phase establishes which SA. The third IPsec sibling Concept in this session — pairs with `ipsec-ah-vs-esp` and `ipsec-transport-vs-tunnel`.

**Layout convention:** rows are phases in sequence. Columns are attributes of each phase ordered left → right from least detail (Phase) to most detail (Purpose).

| Phase | SA established | IKEv1 mode | IKEv2 exchange | Purpose |
|---|---|---|---|---|
| 1 | ISAKMP SA [s1] | Main Mode<br>Aggressive Mode [s1] | IKE_SA_INIT<br>IKE_AUTH [s2] | Establish authenticated channel [s1] |
| 2 | IPsec SA [s1] | Quick Mode [s1] | CREATE_CHILD_SA [s2] | Negotiate data SAs [s1] |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. **No parentheticals in cells.** Mode names (`Main Mode`, `Aggressive Mode`, `Quick Mode`, `CREATE_CHILD_SA`) are treated as atomic identifiers.
- **Phase 1 vs Phase 2 at a glance.** Phase 1 protects the negotiation itself (sets up the tunnel over which Phase 2 runs). Phase 2 is the negotiation of the *actual IPsec tunnels* that will protect user data. An exam question asking "which phase establishes the ISAKMP SA" is asking about Phase 1.
- **IKEv1 modes are phase-scoped.** RFC 2409 [s1] is explicit: "`Main Mode` and `Aggressive Mode` MUST ONLY be used in phase 1. `Quick Mode` MUST ONLY be used in phase 2." This is a favorite exam discriminator — Quick Mode cannot establish an ISAKMP SA, and Main/Aggressive cannot establish an IPsec SA.
- **Main Mode vs Aggressive Mode.** Main Mode uses six messages and protects the identities of the peers (identity is exchanged inside the encrypted channel). Aggressive Mode compresses the Phase 1 exchange into three messages but exposes peer identities in the clear, which is why Aggressive Mode with PSK is known to be susceptible to offline dictionary attacks against the PSK. RFC 2409 says Main Mode MUST be implemented; Aggressive Mode SHOULD be implemented.
- **IKEv2 collapses the IKEv1 mode set.** IKEv2 (RFC 7296 [s2]) replaces Main/Aggressive/Quick with two canonical exchanges: `IKE_SA_INIT` and `IKE_AUTH` form the Phase 1 equivalent (establishing the IKE SA and authenticating peers), and `CREATE_CHILD_SA` forms the Phase 2 equivalent. A full IKEv2 Phase-1 + Phase-2 initial setup is four messages (two exchanges of two messages each) — substantially simpler and faster than IKEv1 Main Mode + Quick Mode.
- **ISAKMP SA vs IKE SA terminology.** IKEv1 calls the Phase 1 SA the "ISAKMP SA" (after the ISAKMP framework defined in RFC 2408); IKEv2 calls the same thing the "IKE SA." CISSP study material uses both terms interchangeably — they refer to the same Phase 1 construct.
- **Phase 2 runs multiple times.** A single ISAKMP/IKE SA typically supports multiple Phase 2 negotiations: one per flow, one for rekeying, one per direction, etc. Phase 1 is "establish once"; Phase 2 is "run as many times as needed while Phase 1 is valid."
- **PFS (Perfect Forward Secrecy) is a Phase 2 option.** PFS in IKE means running a fresh Diffie-Hellman exchange during Phase 2, so compromise of the Phase 1 DH secret does not compromise past Phase 2 session keys. Not represented in the table because it is an *option* within Phase 2, not a defining attribute of the phase.
- **Out of scope for this Concept:** IKE message formats and payload types, IPsec SA lifetimes and rekey triggers, DPD (Dead Peer Detection), MOBIKE (IKEv2 mobility extension), EAP authentication within IKEv2, NAT-T within IKE, individual Phase 1 authentication methods (PSK / certificate / EAP).

### Tricky distractors

- **Phase 1 establishes ISAKMP/IKE SA; Phase 2 establishes IPsec SA.** Wrong-answer pattern: swapping which SA each phase creates.
- **Quick Mode is Phase 2 only.** Main/Aggressive are Phase 1 only. Wrong-answer pattern: applying Quick Mode to Phase 1 — RFC 2409 explicitly forbids it.
- **Aggressive Mode exposes identities.** Three messages but identity in cleartext = PSK dictionary risk. Wrong-answer pattern: claiming Aggressive Mode is more secure because it's faster.
- **IKEv2 simplifies IKEv1.** Two canonical exchanges (IKE_SA_INIT, IKE_AUTH, CREATE_CHILD_SA). Wrong-answer pattern: applying IKEv1 mode names to IKEv2 — IKEv2 uses different exchange names.
- **Phase 2 runs multiple times per Phase 1.** One IKE SA supports many child SAs. Wrong-answer pattern: claiming Phase 1 and Phase 2 are 1:1 — Phase 2 negotiates per flow/direction.
- **PFS is a Phase 2 option.** Fresh DH per Phase 2 negotiation. Wrong-answer pattern: claiming PFS is automatic — it requires explicit Phase 2 configuration.

### Values without a direct public citation

No cell in this table relies on inference beyond what RFC 2409 [s1] and RFC 7296 [s2] specify. The purpose-column values ("Establish authenticated channel," "Negotiate data SAs") are one-line summaries of the RFC language rather than direct quotations, but map cleanly to RFC 2409 §5's description of Phase 1 and Phase 2 goals.

## Engine demo opportunities

- `Phase 1 | SA established → ?` → `ISAKMP SA`
- `Phase 2 | SA established → ?` → `IPsec SA`
- `Phase 1 | IKEv1 mode → ?` → `Main Mode`, `Aggressive Mode`
- `Phase 2 | IKEv1 mode → ?` → `Quick Mode`
- `Phase 2 | IKEv2 exchange → ?` → `CREATE_CHILD_SA`
- `? | IKEv1 mode → Main Mode` → `Phase 1`
- `? | IKEv1 mode → Quick Mode` → `Phase 2`
- Sequence (adjacency): `Phase following (Phase n | SA established → ISAKMP SA) | SA established → ?` → `IPsec SA`
- Composite Phase 1 Row with `IKEv1 mode` swapped to `Quick Mode` — directly tests the "Quick Mode is Phase 2 only" rule
- Composite Phase 2 Row with `SA established` swapped to `ISAKMP SA` — tests the inverse (Phase 2 negotiates IPsec SAs, not the ISAKMP SA)

## Sources

- `[s1]`: RFC 2409, "The Internet Key Exchange (IKE)" — IKEv1 (November 1998, retrieved 2026-04-19, https://datatracker.ietf.org/doc/html/rfc2409)
- `[s2]`: RFC 7296, "Internet Key Exchange Protocol Version 2 (IKEv2)" (October 2014, retrieved 2026-04-19, https://datatracker.ietf.org/doc/html/rfc7296)
- `[s3]`: NIST SP 800-77 Revision 1, "Guide to IPsec VPNs" — general IPsec reference (June 2020, retrieved 2026-04-19, https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-77r1.pdf)
