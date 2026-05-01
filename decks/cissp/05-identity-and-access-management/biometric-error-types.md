# Biometric Error Types

**Domain:** 5 — Identity and Access Management &nbsp;|&nbsp; **Pattern:** Dimensions &nbsp;|&nbsp; **Tags:** 5.2
**Status:** draft (SME review pending)

The three error metrics CISSP candidates are expected to discriminate for biometric systems. FRR and FAR are the two error-type rates, mapped to the statistical Type 1 / Type 2 error framework; CER is the equal-crossover point used to compare the overall accuracy of different biometric systems. Per CISSP convention, FAR (Type 2) is the more dangerous error — an impostor accepted compromises security, while a legitimate user rejected only degrades usability. Specific biometric modalities (fingerprint, iris, face, etc.) are covered in the separate `biometric-modalities` Concept.

| Metric | expansion | type classification | what it counts | when high |
|---|---|---|---|---|
| FRR | False Rejection Rate [s1] | Type 1 | Legitimate user rejections [s1] | Usability degraded |
| FAR | False Acceptance Rate [s1] | Type 2 | Impostor acceptances [s1] | Security compromised |
| CER | Crossover Error Rate [s1] | None | Point where FRR equals FAR [s1] | Lower overall accuracy |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. **No parentheticals in cells.** Acronym/expansion pairing is split across the `Metric` and `expansion` columns rather than parenthetically.
- **CER and EER are synonyms.** The same metric is called Crossover Error Rate (CER) in most CISSP materials and Equal Error Rate (EER) in most engineering literature. Both refer to the operating point where FRR = FAR. CISSP testing uses "CER."
- **FAR is worse than FRR.** The canonical CISSP framing: "false accept is worse than false reject because most organizations prefer to reject authentic subjects than to accept impostors." When a biometric system is tuned for *security*, FRR rises (more legitimate users rejected) to drive FAR down. When tuned for *usability*, FAR rises. CER is the crossover where both are equal and is the canonical benchmark for comparing systems independent of tuning.
- **Type 1 and Type 2 classification.** The statistics convention is Type 1 = false positive (rejecting a true null hypothesis, "innocent until proven guilty" → convicting the innocent), Type 2 = false negative. Biometric literature inverts this slightly: FRR is classified as Type 1 (the null hypothesis is "this is the legitimate user"; FRR rejects a true null). FAR is Type 2 (FAR accepts when the null is false). CISSP tests the Type 1 / Type 2 → FRR / FAR pairing directly.
- **Security-vs-usability tuning curve.** Biometric systems expose a threshold parameter that moves along a ROC-like curve: higher threshold → lower FAR but higher FRR; lower threshold → higher FAR but lower FRR. The CER is the single point on that curve where both meet. Lowering the *entire curve* (by using a better biometric algorithm, cleaner sensor, more training data) is what reduces CER.
- **Failure to Enroll (FTE) and Failure to Acquire (FTA) are distinct metrics.** Both measure the operational experience of onboarding a user (FTE) or capturing a live sample (FTA) rather than the matching-decision accuracy. Not covered here; they could become a separate Concept if biometric operational metrics grow into a testing focus.
- **ISO/IEC 19795 is the standard.** [s1] is the international standard for biometric performance testing and reporting. NIST SP 800-76 [s2] covers biometric data interchange formats used within PIV (Personal Identity Verification) cards but is less focused on error-rate definitions.
- **Out of scope for this Concept:** specific biometric modalities and their typical CER values (separate Concept — `biometric-modalities`), presentation attack detection (PAD / liveness), template storage and protection, biometric fusion (multimodal biometrics), privacy implications of biometric data retention.

### Tricky distractors

- **FRR = Type 1; FAR = Type 2.** Most commonly confused mapping on the exam. Wrong-answer pattern: swapping them — FRR rejects legitimate users (Type 1), FAR accepts impostors (Type 2).
- **FAR is worse than FRR.** Security loss > usability inconvenience. Wrong-answer pattern: claiming high FRR is more dangerous — high FAR breaks the security guarantee.
- **CER = EER.** Crossover Error Rate and Equal Error Rate are synonyms. Wrong-answer pattern: treating them as different metrics — CISSP uses CER, engineering uses EER.
- **Lower CER = better system.** It's a benchmark for comparing systems. Wrong-answer pattern: claiming higher CER is better — lower means lower errors at the balance point.
- **Threshold tuning trades FAR for FRR.** Single curve; tuning moves along it. Wrong-answer pattern: claiming you can drive both FAR and FRR low with tuning alone — that requires a better algorithm/sensor.
- **FTE and FTA are operational, not accuracy.** Failure to Enroll / Acquire are different from FRR/FAR. Wrong-answer pattern: confusing enrollment failures with rejection rates.

### Values without a direct public citation

| Cell | Value | Why unsourced |
|---|---|---|
| FRR × when high | `Usability degraded` | Widely-taught CISSP framing. ISO/IEC 19795 [s1] defines FRR as a rate; the "usability vs security tradeoff" framing is pedagogical. |
| FAR × when high | `Security compromised` | Same — ISO/IEC 19795 defines FAR as a rate without editorializing on operational impact. |
| CER × when high | `Lower overall accuracy` | Paraphrase of the standard "lower CER = better system" framing; not a direct quote. |
| CER × type classification | `None` | CER is an operating point on the FRR-FAR curve, not an error type itself. Labeling it `None` in the type-classification column is a CISSP-pedagogical convention rather than a formal classification. |

## Engine demo opportunities

- `FRR | type classification → ?` → `Type 1`
- `FAR | type classification → ?` → `Type 2`
- `FRR | expansion → ?` → `False Rejection Rate`
- `FAR | expansion → ?` → `False Acceptance Rate`
- `CER | what it counts → ?` → `Point where FRR equals FAR`
- `? | type classification → Type 1` → `FRR`
- `? | type classification → Type 2` → `FAR`
- `? | when high → Security compromised` → `FAR`
- Composite FRR Row with `type classification` swapped to `Type 2` — directly tests the FRR=Type1 / FAR=Type2 pairing (the single most commonly-confused mapping on the exam)
- Composite FAR Row with `when high` swapped to `Usability degraded` — tests the impact-direction confusion (FAR compromises security, not usability)

## Sources

- `[s1]`: ISO/IEC 19795 (multi-part), "Information technology — Biometric performance testing and reporting" — international standard for biometric error-rate definitions and testing methodology (retrieved 2026-04-19, https://www.iso.org/standard/73516.html for Part 1 index)
- `[s2]`: NIST SP 800-76-2, "Biometric Specifications for Personal Identity Verification" — biometric data interchange formats used within PIV; secondary reference (July 2013, retrieved 2026-04-19, https://csrc.nist.gov/publications/detail/sp/800-76/2/final)
