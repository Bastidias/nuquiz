# CI/CD Pipeline Stages

**Domain:** 8 — Software Development Security &nbsp;|&nbsp; **Pattern:** Ordered &nbsp;|&nbsp; **Tags:** 8.2
**Status:** draft (SME review pending)

The seven canonical stages of a modern CI/CD pipeline from developer commit through deployment verification. CI/CD is the operational substrate of DevOps and DevSecOps — security activities (SAST, SCA, secrets scanning) are inserted as their own pipeline stage rather than performed as a separate phase. CISSP testing focuses on stage ordering and on which stage owns which activity (security scans before package, not after).

**Layout convention:** rows are stages in sequence from source-control commit through post-deployment verification. Columns are attributes of each stage ordered left → right from least detail (Name) to most detail (Typical Tools).

| Stage | Name | Key Activity | Typical Tools |
|---|---|---|---|
| 1 | Commit | Push code to repository | Git<br>GitHub<br>GitLab |
| 2 | Build | Compile source<br>Resolve dependencies | Maven<br>Gradle<br>npm<br>Make |
| 3 | Test | Run unit tests<br>Run integration tests | JUnit<br>pytest<br>Jest |
| 4 | Security scan | Run SAST<br>Run SCA<br>Run secrets scanning [s1] | SAST scanners<br>SCA scanners<br>Secrets scanners [s1] |
| 5 | Package | Create deployable artifact | Docker<br>Helm<br>npm pack |
| 6 | Deploy | Push to environment | Kubernetes<br>Terraform<br>Ansible<br>Spinnaker |
| 7 | Verify | Smoke test<br>Health check<br>Monitor metrics | Synthetic monitors<br>APM tools |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. **No parentheticals in cells.** Tool names are atomic identifiers; pipeline-orchestrator names (Jenkins, GitLab CI, GitHub Actions, Argo) wrap the stages but are not stage-specific tools.
- **CI vs CD.** CI = Continuous Integration = stages 1-3 (commit, build, test). CD has two senses: Continuous *Delivery* (1-6, package and stage for release; deployment requires manual approval) and Continuous *Deployment* (1-7, every passing pipeline ships to production automatically). The Concept walks all seven stages without forcing a CI/CD boundary.
- **Stage 4 is where shift-left lives.** Security scans run *between* tests and packaging — early enough to catch issues before they ship, late enough that the build has produced something to scan. Failing the security stage breaks the pipeline, blocking deployment of vulnerable code. This pipeline-gating behavior is what gives shift-left its leverage.
- **Stages 2-3 may swap or merge.** Some organizations run security scans (Stage 4) earlier — SAST during Build (Stage 2), SCA on dependency resolution. Others split Test (Stage 3) into multiple sub-stages (unit, integration, E2E). The seven-stage view is canonical CISSP framing; real pipelines vary.
- **Stage 7 is the recovery anchor.** Verify includes failure detection — synthetic monitors hitting key endpoints, health-check probes, error-rate dashboards, p99 latency thresholds. If verification fails, the pipeline triggers rollback (or, in canary deploys, halts further rollout). This stage is what makes "deploy fast" survivable.
- **Pre-commit is Stage 0.** Many DevSecOps programs run lightweight checks (lint, secrets scanning, format) on the developer's machine via Git hooks before the commit lands. Not represented as a separate Row because pre-commit is *off-pipeline*; the seven-stage table assumes the code has already arrived in the shared repository.
- **Out of scope for this Concept:** specific pipeline orchestrators (Jenkins, GitLab CI, GitHub Actions, Argo, Tekton), deployment strategies (blue-green, canary, rolling — covered in `patch-deployment-strategies` in D7), repository security controls (separate Concept — `repository-security-controls`), supply-chain controls within CI/CD (separate Concept — `software-supply-chain-controls`), GitOps patterns.

### Values without a direct public citation

| Cell | Notes |
|---|---|
| All rows × Typical Tools | Tool lists reflect industry practice as of the retrieval date; not a normative source. NIST SP 800-218 [s1] mentions categories of tools (SAST, SCA, secrets scanners) but does not enumerate vendors. |
| Stages 1-3, 5-7 × all cells | Pipeline-stage definitions reflect industry practice and OWASP DevSecOps guidance [s2]; Stage 4 is the only stage where NIST SSDF directly addresses pipeline-integrated security activities. |

## Engine demo opportunities

- `Stage 1 | Name → ?` → `Commit`
- `Stage 4 | Name → ?` → `Security scan`
- `Stage 7 | Name → ?` → `Verify`
- `? | Name → Build` → `Stage 2`
- `? | Name → Package` → `Stage 5`
- `Stage 4 | Key Activity → ?` → `Run SAST`, `Run SCA`, `Run secrets scanning`
- `? | Key Activity → Push to environment` → `Stage 6`
- `? | Key Activity → Compile source` → `Stage 2` (sub-Fact in multi-Fact cell)
- Sequence (adjacency): `Stage following (Stage n | Name → Test) | Name → ?` → `Security scan`
- Sequence (adjacency): `Stage following (Stage n | Name → Security scan) | Name → ?` → `Package`
- Sequence (adjacency): `Stage preceding (Stage n | Name → Deploy) | Name → ?` → `Package`
- Composite Stage 6 Row with `Name` swapped to `Security scan` — directly tests the stage ordering (security scan precedes deploy; reversing them ships unscanned code)
- Composite Stage 1 Row with `Key Activity` swapped to `Push to environment` — tests the commit / deploy distinction (commit lands code in repo; deploy pushes to environment)
- Composite Stage 4 Row deleted entirely — tests recognition that pipelines without a security stage are the legacy CI/CD pattern that DevSecOps explicitly fixes

## Sources

- `[s1]`: NIST SP 800-218, "Secure Software Development Framework (SSDF) Version 1.1" — pipeline-integrated security practices (PW.7 source code analysis, PW.8 executable test, PO.5 secure build) (February 2022, retrieved 2026-04-25, https://csrc.nist.gov/publications/detail/sp/800-218/final)
- `[s2]`: OWASP DevSecOps Guideline — pipeline stage integration patterns (retrieved 2026-04-25, https://owasp.org/www-project-devsecops-guideline/)
- `[s3]`: SLSA (Supply-chain Levels for Software Artifacts) Framework — pipeline-integrity reference (retrieved 2026-04-25, https://slsa.dev/)
