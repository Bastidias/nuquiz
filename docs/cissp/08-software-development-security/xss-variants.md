# XSS Variants

**Domain:** 8 — Software Development Security &nbsp;|&nbsp; **Pattern:** Dimensions &nbsp;|&nbsp; **Tags:** 8.5
**Status:** draft (SME review pending)

The three XSS variants CISSP candidates are expected to distinguish [s1]. The discriminating axes are *trigger* (how does the user encounter the injection point) and *persistence* (does the payload live in the server's data store, in the URL, or only in the victim's DOM). All three are mitigated by the same fundamental control — output encoding at the rendering boundary — but additional mitigations differ. Sibling Concept `common-injection-types` places XSS within the broader injection family.

| Variant | trigger | persistence | mitigation |
|---|---|---|---|
| Reflected | Crafted URL clicked by victim [s1] | Per request<br>Not stored [s1] | Output encoding<br>Content Security Policy |
| Stored | Page rendered after attacker payload saved to backend [s1] | Server-side data store [s1] | Output encoding<br>Input validation<br>Content Security Policy |
| DOM-based | Client-side script processes attacker-controlled input [s1] | Browser DOM only<br>No server reflection [s1] | Safe JavaScript APIs<br>Avoid eval and innerHTML<br>Content Security Policy [s2] |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. **No parentheticals in cells.**
- **All three share the canonical mitigation.** Output encoding (escaping HTML/JS/URL special characters at the point of rendering) is the single architectural defense common to all three variants. The cell values list the variant-specific *additional* mitigations beyond output encoding — Content Security Policy reduces blast radius for all three; safe DOM APIs are the variant-specific defense for DOM-based.
- **Reflected XSS persistence — "per request, not stored."** The payload travels in the URL or HTTP request and is reflected back into the response page; it is not saved on the server. The attack requires social engineering — the victim must be tricked into clicking a crafted link.
- **Stored XSS is the most dangerous.** Once the payload is saved server-side (in a comment, profile field, support ticket, etc.), every visitor to the affected page receives the payload automatically — no per-victim social engineering required. A stored XSS in a high-traffic page is essentially a worm.
- **DOM-based XSS never touches the server.** The attack happens entirely in the browser — client-side JavaScript reads attacker-controlled input (typically from `location.hash`, `document.referrer`, or `localStorage`) and writes it into the DOM via an unsafe API like `innerHTML` or `eval`. Server-side input filtering cannot detect or prevent DOM XSS because the server never sees the payload.
- **Mitigation framing per variant.**
  - **Reflected:** Output encoding when reflecting URL parameters back into HTML; URL parameter validation as defense in depth.
  - **Stored:** Output encoding at render time (the moment the stored value is inserted into HTML); input validation when accepting the value (rejecting obvious payloads).
  - **DOM-based:** Use safe DOM APIs (`textContent`, `setAttribute` with safe attributes) instead of `innerHTML` and `eval`; trusted-types CSP directive prevents bypass.
- **CSP is variant-agnostic.** A well-tuned Content Security Policy [s2] reduces the attacker's ability to execute scripts even if an XSS injection point exists — for example, blocking inline scripts and restricting script sources. CSP is recommended for all three variants but is itself bypass-prone if poorly configured (unsafe-inline directives, overly broad `script-src` allowlists).
- **Out of scope for this Concept:** specific encoding rules per HTML context (HTML body, attribute, URL, CSS, JavaScript — covered in OWASP XSS Prevention Cheat Sheet [s1]), CSP directive details, mutation XSS (mXSS), self-XSS, blind XSS, post-message-based XSS in iframes.

### Tricky distractors

- **Reflected vs Stored persistence.** Reflected = per-request URL; Stored = server data store. Wrong-answer pattern: confusing them — Stored is more dangerous because it auto-fires on every visitor.
- **DOM-based never touches server.** Server-side filtering can't catch it. Wrong-answer pattern: claiming server-side input validation prevents DOM XSS — the server doesn't see the payload.
- **Output encoding is the universal fix.** All three variants. Wrong-answer pattern: claiming each variant needs different mitigations — encoding at render is the architectural defense.
- **Stored XSS = wormable.** No social engineering required per victim. Wrong-answer pattern: ranking Stored as less severe than Reflected — Stored is more severe because it self-distributes.
- **CSP is defense-in-depth, not the primary fix.** Encoding is primary. Wrong-answer pattern: claiming CSP alone prevents XSS — bad encoding still creates injection points.
- **DOM XSS sources include `location.hash`, `localStorage`, etc.** Client-side input. Wrong-answer pattern: assuming DOM XSS only comes from URL parameters — DOM sources are broader.

### Values without a direct public citation

No cell in this table relies on inference beyond what OWASP XSS Prevention Cheat Sheet [s1] specifies. Mitigation lists are summarized rather than directly quoted; the canonical defense (output encoding at the rendering boundary) is from [s1].

## Engine demo opportunities

- `Reflected | persistence → ?` → `Per request`, `Not stored`
- `Stored | persistence → ?` → `Server-side data store`
- `DOM-based | persistence → ?` → `Browser DOM only`, `No server reflection`
- `? | persistence → Server-side data store` → `Stored`
- `? | trigger → Crafted URL clicked by victim` → `Reflected`
- `? | trigger → Client-side script processes attacker-controlled input` → `DOM-based`
- `DOM-based | mitigation → ?` → `Safe JavaScript APIs`, `Avoid eval and innerHTML`, `Content Security Policy`
- `? | mitigation → Content Security Policy` → `Reflected`, `Stored`, `DOM-based` — shared-Fact across all three Rows
- Composite Stored Row with `persistence` swapped to `Browser DOM only` — directly tests the persistence axis (Stored XSS is server-side; DOM-based never touches the server)
- Composite DOM-based Row with `trigger` swapped to `Page rendered after attacker payload saved to backend` — tests the DOM-XSS-is-client-side property (DOM XSS triggers in the browser, not via stored backend data)
- Composite Reflected Row with `mitigation` removing `Output encoding` — tests recognition that output encoding is the canonical XSS defense across all variants

## Sources

- `[s1]`: OWASP, "Cross Site Scripting Prevention Cheat Sheet" — variant taxonomy and per-context output-encoding rules (retrieved 2026-04-25, https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html)
- `[s2]`: OWASP, "Content Security Policy Cheat Sheet" — CSP as defense-in-depth against XSS (retrieved 2026-04-25, https://cheatsheetseries.owasp.org/cheatsheets/Content_Security_Policy_Cheat_Sheet.html)
- `[s3]`: OWASP, "DOM Based XSS Prevention Cheat Sheet" — DOM-XSS-specific guidance, including safe sink APIs (retrieved 2026-04-25, https://cheatsheetseries.owasp.org/cheatsheets/DOM_based_XSS_Prevention_Cheat_Sheet.html)
