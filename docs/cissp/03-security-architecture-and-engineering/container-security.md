# Container Security Controls

**Domain:** 3 — Security Architecture and Engineering &nbsp;|&nbsp; **Pattern:** Dimensions &nbsp;|&nbsp; **Tags:** 3.5

**Status:** draft (SME review pending)

The six container-security control families CISSP candidates are expected to discriminate. Containers package application code with its dependencies and runtime, sharing the host kernel rather than virtualizing hardware. This shared-kernel model is more efficient than VMs but carries different risks — container escape compromises the host, privileged containers bypass isolation, and image vulnerabilities affect every container running that image. Each control family addresses a distinct risk class. NIST SP 800-190 [s1] is the canonical reference.

| Control | what it protects | mechanism | typical implementation |
|---|---|---|---|
| Image scanning | Vulnerabilities baked into container images [s1] | Compare image layers against vulnerability database [s1] | SCA scanner integrated into build pipeline [s1] |
| Image signing | Image provenance and integrity [s1] | Cryptographic signature on image manifest [s2] | Sigstore<br>Cosign<br>Notary v2 [s2] |
| Runtime restriction | Container escape and privilege escalation [s1] | Drop unnecessary kernel capabilities<br>Apply seccomp filter<br>Apply AppArmor or SELinux profile [s1] | Pod Security Standards Restricted profile [s3] |
| Network segmentation | Lateral movement between containers [s1] | Default-deny network policy with explicit allowlist [s1] | Kubernetes NetworkPolicy [s3] |
| Secrets management | Credentials embedded in images or environment variables [s1] | External secret store with runtime injection [s1] | Kubernetes Secrets<br>HashiCorp Vault<br>External Secrets Operator [s1] |
| Pod security standards | Excessive privilege at workload level [s3] | Enforce baseline security context per workload [s3] | Pod Security Admission with Baseline or Restricted profile [s3] |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. **No parentheticals in cells.** Acronym expansions and product names live in this section.
- **Acronym expansions.** `SCA` = Software Composition Analysis. `RBAC` = Role-Based Access Control. `PSS` = Pod Security Standards. `PSP` = Pod Security Policy (deprecated; replaced by PSS in Kubernetes 1.25+). `CRI` = Container Runtime Interface. `OCI` = Open Container Initiative. `CIS` = Center for Internet Security.
- **Containers are kernel-shared, not hardware-virtualized.** A container is a Linux process tree with namespaced view of filesystem, processes, network, and users — sharing the *host kernel* with all other containers and the host. A VM virtualizes hardware and runs its own kernel. The shared-kernel design means a kernel exploit in one container can compromise the host and every other container. CISSP framing: container isolation is *less* than VM isolation; high-sensitivity multi-tenant workloads use VMs or confidential-computing enclaves.
- **Image scanning happens at three points.** Build time (scan during CI before publishing), registry time (scan after push, periodically rescan as new vulnerabilities are disclosed), and runtime (scan running images for newly-disclosed vulns). NIST SP 800-190 [s1] recommends all three; CI-only scanning misses vulnerabilities disclosed after publication.
- **Image signing addresses supply-chain attacks.** Without signing, an attacker who can write to a registry can replace a legitimate image with a malicious one and consumers cannot detect the substitution. Sigstore (cosign + Fulcio + Rekor) provides keyless signing tied to OIDC identities (e.g., GitHub Actions workflow identity); Notary v2 is the OCI-spec-aligned successor to Notary v1. SLSA (Supply-chain Levels for Software Artifacts) provenance attestations build on signing.
- **Container escape is the canonical risk.** A container escape uses a kernel vulnerability, misconfigured capability, or excessive volume mount to break out of the namespace and gain host-level access. Mitigation: drop CAP_SYS_ADMIN and other dangerous capabilities, use seccomp to restrict syscall surface, apply AppArmor or SELinux profiles, never mount the host's `/var/run/docker.sock` into a non-trusted container, never run privileged containers in production.
- **Pod Security Standards replaced Pod Security Policies.** Kubernetes 1.25 (August 2022) removed PSPs entirely. PSS defines three profiles — Privileged (no restrictions), Baseline (prevents known-bad patterns), Restricted (heavily restricted) — enforced via Pod Security Admission. Older study materials may reference PSPs; modern Kubernetes uses PSS. The exam may not yet reflect this fully.
- **Secrets must not live in images.** Image layers are immutable and visible to anyone with image pull access. Embedding API keys, certificates, or passwords in images is a top container-security mistake. Use external secret stores (Kubernetes Secrets, HashiCorp Vault, AWS Secrets Manager, Azure Key Vault) with runtime injection. CIS Kubernetes Benchmark mandates this pattern.
- **Network policies are default-deny by design.** Without a NetworkPolicy applied to a namespace, all pods can talk to all pods (across namespaces) — the Kubernetes default is *open*. Applying any NetworkPolicy that selects pods switches that namespace to default-deny for those pods, requiring explicit ingress/egress allowlists. CIS recommends namespace-level default-deny policies as a baseline.
- **Cross-Concept link.** Sibling Concept `cloud-service-models` covers IaaS/PaaS/SaaS/FaaS — containers commonly run in PaaS platforms (AWS ECS, Google Cloud Run) or on customer-managed Kubernetes clusters in IaaS. `architecture-vulnerabilities` covers buffer overflows and confused deputies — both can manifest in container contexts. `software-supply-chain-controls` in D8 covers SBOM and signed releases that apply directly to container images.
- **Out of scope for this Concept:** specific container runtimes (Docker, containerd, CRI-O, Podman), Kubernetes-specific concepts beyond PSS (admission controllers, OPA Gatekeeper, Kyverno, service mesh), Windows containers, container orchestration alternatives (Nomad, Mesos), confidential containers (Kata, gVisor), microservice architecture security, container forensics, eBPF-based runtime security tools.

### Tricky distractors

- **Containers share the host kernel; VMs don't.** Less isolation than VMs. Wrong-answer pattern: claiming containers provide VM-equivalent isolation — kernel exploits cross container boundaries.
- **Image scanning at build alone misses runtime vulns.** Scan at build, registry, and runtime. Wrong-answer pattern: claiming CI scan is sufficient — vulnerabilities are disclosed after build.
- **Privileged containers bypass isolation.** Almost full host access. Wrong-answer pattern: running privileged containers in production — only acceptable for specific tooling with explicit risk acceptance.
- **PSS replaced PSPs.** Kubernetes 1.25+. Wrong-answer pattern: configuring PSPs in modern Kubernetes — they no longer exist.
- **Network policy default is open.** Without policy, all pods can talk. Wrong-answer pattern: assuming Kubernetes is default-deny — opposite, it's default-allow.
- **Don't embed secrets in images.** Image layers are visible. Wrong-answer pattern: storing API keys in Dockerfile environment variables — anyone with image pull access can read them.

### Values without a direct public citation

| Cell | Value | Why unsourced |
|---|---|---|
| Image signing × typical implementation | `Sigstore`, `Cosign`, `Notary v2` | Tool names from industry-standard OSS projects; no NIST SP enumerates these specifically per cell. |
| Runtime restriction × typical implementation | `Pod Security Standards Restricted profile` | Kubernetes-specific; NIST SP 800-190 [s1] discusses runtime restrictions generically without naming PSS. |
| Network segmentation × typical implementation | `Kubernetes NetworkPolicy` | Kubernetes-specific implementation; NIST SP 800-190 [s1] describes the principle without naming NetworkPolicy. |
| Secrets management × typical implementation | `Kubernetes Secrets`, `HashiCorp Vault`, `External Secrets Operator` | Tool names from industry; NIST [s1] describes the principle without enumerating specific products. |
| Pod security standards × all cells | — | Kubernetes-specific; not in NIST SP 800-190's pre-Kubernetes-1.25 scope. Sourced via CNCF / Kubernetes documentation [s3]. |

## Engine demo opportunities

- `Image scanning | mechanism → ?` → `Compare image layers against vulnerability database`
- `Image signing | typical implementation → ?` → `Sigstore`, `Cosign`, `Notary v2`
- `? | what it protects → Container escape and privilege escalation` → `Runtime restriction`
- `? | what it protects → Lateral movement between containers` → `Network segmentation`
- `? | mechanism → External secret store with runtime injection` → `Secrets management`
- `Runtime restriction | mechanism → ?` → `Drop unnecessary kernel capabilities`, `Apply seccomp filter`, `Apply AppArmor or SELinux profile`
- `? | typical implementation → Kubernetes NetworkPolicy` → `Network segmentation`
- Composite Image scanning Row with `mechanism` swapped to `Cryptographic signature on image manifest` — directly tests the scanning-vs-signing distinction (scanning checks for known vulns; signing proves provenance)
- Composite Secrets management Row with `mechanism` swapped to `Default-deny network policy with explicit allowlist` — tests secrets-vs-network distinction (secrets are credentials; network is traffic control)
- Composite Runtime restriction Row with `what it protects` swapped to `Vulnerabilities baked into container images` — tests runtime-vs-scanning (runtime restricts what container can do; scanning checks what's in the image)

## Sources

- `[s1]`: NIST SP 800-190, "Application Container Security Guide" — image scanning, runtime restrictions, secrets, network segmentation, registry security (September 2017, retrieved 2026-04-30, https://csrc.nist.gov/publications/detail/sp/800-190/final)
- `[s2]`: Sigstore Project documentation — keyless signing, Cosign, Fulcio, Rekor, transparency log (retrieved 2026-04-30, https://www.sigstore.dev/). Notary v2 / OCI Distribution Specification artifacts (retrieved 2026-04-30, https://github.com/notaryproject/notaryproject)
- `[s3]`: Kubernetes documentation, "Pod Security Standards" — Privileged / Baseline / Restricted profiles enforced via Pod Security Admission (retrieved 2026-04-30, https://kubernetes.io/docs/concepts/security/pod-security-standards/). CIS Kubernetes Benchmark v1.9 — production-grade Kubernetes hardening (retrieved 2026-04-30, https://www.cisecurity.org/benchmark/kubernetes)
- `[s4]`: (ISC)² CISSP Certification Exam Outline, effective 2024-04-15, Domain 3 §3.5 *Assess and mitigate the vulnerabilities of security architectures, designs, and solution elements* (retrieved 2026-04-30, https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline)
