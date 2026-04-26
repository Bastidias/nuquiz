# Biometric Modalities

**Domain:** 5 — Identity and Access Management &nbsp;|&nbsp; **Pattern:** Dimensions &nbsp;|&nbsp; **Tags:** 5.2
**Status:** draft (SME review pending)

The seven biometric modalities CISSP candidates are expected to discriminate by accuracy, user intrusiveness, deployment cost, and typical attack vector. Iris and retina are the most accurate; fingerprint and face dominate large-scale deployments because they balance accuracy with cost and user acceptance; voice and behavioral are continuous-authentication options at lower accuracy. NIST FpVTE [s1], IREX [s2], and FRVT [s3] are the canonical public benchmarks. Sibling Concept `biometric-error-types` covers FRR / FAR / CER as the metrics by which these modalities are compared.

| Modality | accuracy | intrusiveness | cost | typical attack |
|---|---|---|---|---|
| Fingerprint | High [s1] | Low | Low | Latent print lift<br>Mold replica |
| Iris | Very high [s2] | Medium | High | High-resolution photo<br>Contact lens replica |
| Retina | Very high | High | High | Rare in practice |
| Voice | Moderate | Low | Low | Voice recording replay<br>Synthesis |
| Face | High [s3] | Very low | Low | Photo<br>Mask<br>Deepfake |
| Hand geometry | Moderate | Medium | Medium | Hand model replica |
| Behavioral | Moderate | Very low | Low | Bot mimicry |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. **No parentheticals in cells.** Modality names use the canonical biometric-research spelling.
- **Accuracy ranking is rough.** "High / Very high / Moderate" is a categorical bin reflecting NIST testing programs. Iris (IREX) and modern algorithmic face recognition (FRVT) achieve sub-1% FAR at low FRR; fingerprint at 1:1 verification (PIV / FpVTE) achieves comparable accuracy. Voice, hand geometry, and behavioral are an order of magnitude lower in 1:N identification scenarios. CISSP testing rarely asks specific FRR / FAR percentages — the categorical rank ordering is what gets tested.
- **Intrusiveness drives user acceptance.** Face and behavioral are very low intrusiveness (no contact, no specific gesture). Fingerprint and voice are low (contact or short sample). Iris and hand geometry are medium (positioned scan). Retina is high (close-eye laser scan, historically associated with discomfort) and is one reason retina deployments have nearly disappeared in favor of iris.
- **Cost is hardware-dominant.** Fingerprint readers and face cameras are commodity ($10-50 per device); voice uses any microphone; behavioral uses existing input devices. Iris and retina need specialized cameras with controlled illumination ($500+ per device). Hand geometry readers are mid-priced.
- **Modality-specific attacks.**
  - **Fingerprint:** latent prints can be lifted from surfaces and turned into 3D molds; modern liveness detection (sweat, capacitance, sub-dermal scan) defeats most replica attacks but not all.
  - **Iris:** high-resolution photos of an iris can be printed onto contact lenses; better readers use IR illumination and pupil-response liveness checks.
  - **Face:** the simplest target — a photo or printed mask sometimes works against weak sensors; modern deployments use 3D depth sensors (Apple Face ID), liveness challenges (blink, head turn), or near-IR sensing. Deepfakes generated from public photos are the rising threat.
  - **Voice:** recordings of the user saying the enrollment phrase, or synthesized voice from public audio. Defeated by liveness phrases (challenge phrases generated at authentication time).
  - **Behavioral:** bots that mimic typing patterns; substantially harder to attack than other modalities because the input itself is the authentication.
  - **Retina:** very rare in practice; attacks are not well-documented because the deployment base is too small.
- **Behavioral biometrics span multiple sub-modalities.** Keystroke dynamics, mouse movement patterns, gait analysis, signature dynamics, and continuous authentication via interaction patterns. The cell collapses these because they share the cost / intrusiveness / accuracy profile; a separate sub-Concept could split them if testing depth grows.
- **NIST testing programs.** FpVTE (Fingerprint Vendor Technology Evaluation) [s1] benchmarks fingerprint matchers. IREX (Iris Exchange) [s2] benchmarks iris recognition. FRVT (Face Recognition Vendor Test) [s3] benchmarks face recognition. There is no equivalent NIST program for voice, hand geometry, retina, or behavioral biometrics at the same scale.
- **Out of scope for this Concept:** specific FRR / FAR / CER numerics per modality (covered conceptually in `biometric-error-types`), liveness detection mechanisms in detail, biometric template protection (NIST SP 800-76), GDPR / BIPA privacy implications of biometric storage, multimodal fusion techniques.

### Values without a direct public citation

| Cell | Value | Why unsourced |
|---|---|---|
| All rows × accuracy | Categorical bins | NIST testing programs ([s1, s2, s3]) provide quantitative results; cell values are the qualitative rank-binning across modalities, not direct NIST quotes. |
| All rows × intrusiveness | Categorical bins | Industry-typical user-acceptance framings; no normative public benchmark. |
| All rows × cost | Categorical bins | Hardware-cost framings reflect modal commercial pricing; not from a single source. |
| Retina × all cells | — | Retina deployments are too rare for current public benchmarking; cell values reflect historical literature plus the small modern footprint. |
| Voice × all cells | — | NIST has historically run Speaker Recognition Evaluations (SRE) but they are less prominent than FRVT / IREX / FpVTE; not directly cited per cell here. |
| Hand geometry × all cells | — | Once-common modality (1990s physical access) now largely displaced by fingerprint and face; cell values reflect historical literature. |
| Behavioral × all cells | — | Behavioral biometrics is an active research area without a single canonical public benchmark equivalent to FRVT. |

## Engine demo opportunities

- `Iris | accuracy → ?` → `Very high`
- `Fingerprint | typical attack → ?` → `Latent print lift`, `Mold replica`
- `Face | typical attack → ?` → `Photo`, `Mask`, `Deepfake`
- `? | accuracy → Very high` → `Iris`, `Retina` — shared-Value select-all
- `? | accuracy → Moderate` → `Voice`, `Hand geometry`, `Behavioral` — shared-Value select-all
- `? | intrusiveness → Very low` → `Face`, `Behavioral` — shared-Value select-all
- `? | typical attack → Deepfake` → `Face`
- Composite Iris Row with `accuracy` swapped to `Moderate` — directly tests the iris-is-very-high-accuracy point (iris is one of the two most-accurate modalities)
- Composite Voice Row with `typical attack` swapped to `Latent print lift` — tests modality-attack pairing (voice attacks are recordings and synthesis; latent prints attack fingerprint)
- Composite Face Row with `intrusiveness` swapped to `High` — tests that face is the lowest-intrusion modality (no contact, no gesture)

## Sources

- `[s1]`: NIST, "Fingerprint Vendor Technology Evaluation (FpVTE)" — fingerprint matching benchmark program (retrieved 2026-04-26, https://www.nist.gov/programs-projects/fingerprint-vendor-technology-evaluation-fpvte)
- `[s2]`: NIST, "Iris Exchange (IREX) Program" — iris recognition benchmark program (retrieved 2026-04-26, https://www.nist.gov/programs-projects/iris-exchange-irex-overview)
- `[s3]`: NIST, "Face Recognition Vendor Test (FRVT)" — face recognition benchmark program (retrieved 2026-04-26, https://www.nist.gov/programs-projects/face-recognition-vendor-test-frvt)
- `[s4]`: NIST SP 800-76-2, "Biometric Specifications for Personal Identity Verification" — biometric data interchange formats used in PIV (July 2013, retrieved 2026-04-26, https://csrc.nist.gov/publications/detail/sp/800-76/2/final)
