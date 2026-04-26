# Repository Security Controls

**Domain:** 8 — Software Development Security &nbsp;|&nbsp; **Pattern:** Dimensions &nbsp;|&nbsp; **Tags:** 8.2
**Status:** draft (SME review pending)

The five repository-side security controls applied at the source-control layer (typically GitHub, GitLab, Bitbucket, or Azure Repos). Together they implement the "secure the build" requirements of NIST SSDF [s1] and the SLSA source integrity requirements [s2]. CISSP testing focuses on the threat-to-control pairing: which control stops which class of attack on the repository.

| Control | mechanism | threat mitigated |
|---|---|---|
| Branch protection | Restrict direct push to protected branches | Unauthorized changes<br>Force-push history rewrites |
| Required reviewers | Mandate N approvals before merge | Insider threat<br>Insufficient peer review |
| Signed commits | Cryptographic signature on each commit | Identity spoofing<br>Commit tampering |
| Secrets scanning | Pattern-match commits for credentials | Credential leakage |
| Dependency review | Compare changed dependencies against vulnerability database | Vulnerable dependency introduction<br>Supply-chain attack |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. **No parentheticals in cells.**
- **Branch protection vs required reviewers.** Branch protection is the *technical* gate (the protected branch refuses direct pushes); required reviewers is the *governance* gate (a pull request needs N approvals before the branch protection lets it land). Both controls are typically configured together. CISSP testing sometimes separates them; this Concept keeps them as separate Rows because they target different threats — branch protection prevents *bypass*, required reviewers prevents *unilateral merge*.
- **Signed commits authenticate the committer, not the code.** GPG-signed or SSH-signed commits prove a particular identity authored a commit. They do not prove the *code itself* is trustworthy — a malicious actor with access to a developer's signing key can sign malicious commits. Signed commits + required reviewers together raise the bar; signed commits alone do not.
- **Secrets scanning is dual-mode.** Push-protection mode runs at git-push time and rejects commits containing detected secrets before they reach the repository. Repository-history scanning mode runs against existing commits and flags secrets already committed (which then need rotation, since the secret is in git history forever). The cell value covers both modes generically.
- **Dependency review at PR time.** GitHub Dependency Review (and equivalents) compares the dependencies changed by a pull request against vulnerability databases (NVD, GitHub Advisory Database) and license rules. It runs *during code review*, not post-merge — failing dependency review blocks the PR. Distinct from SCA (covered in `source-code-analysis-types`) which scans the full dependency tree continuously, not just diffs.
- **These controls live above the pipeline.** CI/CD pipeline stages (covered in `ci-cd-pipeline-stages`) run *after* a commit lands. Repository security controls run *at or before* the commit lands. This temporal split is what makes them complementary — repository controls block bad commits from entering; pipeline controls catch issues that slipped through.
- **Out of scope for this Concept:** organization-level access controls (SSO integration, IP allow-lists, repository visibility), CODEOWNERS files (a specific GitHub mechanism for required reviewers), Git LFS for large files, repository archiving and deletion, audit log retention, GPG key management for commit signing, sigstore / cosign for artifact signing.

### Values without a direct public citation

| Cell | Notes |
|---|---|
| All rows | Mechanism and threat-mitigated descriptions reflect industry practitioner consensus and platform documentation (GitHub, GitLab security docs); no single primary citation traced per cell. The NIST SSDF [s1] and SLSA Framework [s2] cover these controls at the policy level but do not enumerate them as a discrete list with this taxonomy. |

## Engine demo opportunities

- `Branch protection | threat mitigated → ?` → `Unauthorized changes`, `Force-push history rewrites`
- `Signed commits | threat mitigated → ?` → `Identity spoofing`, `Commit tampering`
- `Dependency review | threat mitigated → ?` → `Vulnerable dependency introduction`, `Supply-chain attack`
- `? | threat mitigated → Credential leakage` → `Secrets scanning`
- `? | mechanism → Cryptographic signature on each commit` → `Signed commits`
- Composite Branch protection Row with `threat mitigated` swapped to `Credential leakage` — directly tests the control / threat pairing (branch protection prevents bypass, secrets scanning catches leaked credentials)
- Composite Required reviewers Row with `mechanism` swapped to `Cryptographic signature on each commit` — tests the reviewer / signing distinction (reviewers approve content; signing authenticates committer identity)
- Composite Secrets scanning Row with `threat mitigated` swapped to `Force-push history rewrites` — tests that secrets scanning addresses leak risk, not history-rewrite risk

## Sources

- `[s1]`: NIST SP 800-218, "Secure Software Development Framework (SSDF) Version 1.1" — Practice PS.1 (Protect All Forms of Code from Unauthorized Access) and PS.2 (Provide a Mechanism for Verifying Software Release Integrity) (February 2022, retrieved 2026-04-25, https://csrc.nist.gov/publications/detail/sp/800-218/final)
- `[s2]`: SLSA (Supply-chain Levels for Software Artifacts) Framework — Source requirements (version-controlled, verified history, retained indefinitely) (retrieved 2026-04-25, https://slsa.dev/)
- `[s3]`: GitHub Docs, "About protected branches" and "About secret scanning" — platform-level repository control documentation (retrieved 2026-04-25, https://docs.github.com/en/repositories)
