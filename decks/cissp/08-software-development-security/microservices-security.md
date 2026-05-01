# Microservices Security Controls

**Domain:** 8 — Software Development Security &nbsp;|&nbsp; **Pattern:** Dimensions &nbsp;|&nbsp; **Tags:** 8.1, 8.2

**Status:** draft (SME review pending)

The six microservices-architecture security control families CISSP candidates are expected to discriminate. Microservices decompose a monolithic application into many independently-deployable services that communicate over the network. The trade-off: each network hop is an attack surface; what was an in-process function call in a monolith becomes an authenticated API call in a microservices architecture. Each control family addresses a distinct threat introduced by the architectural style. NIST SP 800-204 series is the primary reference.

| Control | what it protects | mechanism | typical implementation |
|---|---|---|---|
| Service-to-service authentication | Service identity for east-west traffic [s1] | Cryptographic peer authentication per call [s1] | mTLS<br>SPIFFE workload identity<br>JWT-based service tokens [s2] |
| API gateway | North-south boundary at the application edge [s1] | Centralized authentication, rate limiting, routing [s1] | Kong<br>Apigee<br>AWS API Gateway<br>Envoy [s1] |
| Service mesh | Encrypted and observable east-west traffic [s2] | Sidecar proxy intercepting every service-to-service call [s2] | Istio<br>Linkerd<br>Consul Connect [s2] |
| Secrets management | Service credentials and API keys [s1] | External secret store with runtime injection [s1] | HashiCorp Vault<br>AWS Secrets Manager<br>External Secrets Operator [s1] |
| Observability | Visibility into distributed request flow [s1] | Distributed tracing<br>Centralized logging<br>Metrics collection [s1] | OpenTelemetry<br>Jaeger<br>Prometheus [s1] |
| East-west segmentation | Lateral movement between services [s2] | Default-deny network policy with explicit allowlist [s2] | Kubernetes NetworkPolicy<br>Cilium<br>Calico [s2] |

## Notes

- **Cell convention:** each `<br>`-separated item is one atomic Fact. **No parentheticals in cells.** Acronym expansions and product names live in this section.
- **Acronym expansions.** `mTLS` = mutual Transport Layer Security. `SPIFFE` = Secure Production Identity Framework For Everyone. `SPIRE` = SPIFFE Runtime Environment. `SVID` = SPIFFE Verifiable Identity Document. `JWT` = JSON Web Token. `RPC` = Remote Procedure Call. `API` = Application Programming Interface. `OPA` = Open Policy Agent. `K8s` = Kubernetes.
- **North-south vs East-west.** *North-south* is traffic crossing the application boundary — external users → API gateway → services. *East-west* is service-to-service traffic *inside* the cluster. North-south is what traditional perimeter security (firewall, WAF, API gateway) addresses; east-west is where microservices security adds the most over monoliths. Mature programs apply auth and segmentation at both directions.
- **Service mesh is the dominant east-west pattern.** Istio, Linkerd, and Consul Connect inject a sidecar proxy (typically Envoy) into every pod; the proxy intercepts inbound and outbound traffic and adds mTLS, observability, and policy enforcement transparently. The application code does not need to handle TLS or service identity — the mesh handles it. This is why service-mesh adoption accelerated for security purposes alongside its original observability driver.
- **SPIFFE is the workload-identity standard.** SPIFFE defines a per-workload identity document (SVID) — typically an X.509 certificate or JWT — issued automatically based on the workload's properties (namespace, service account, container image). SPIRE is the reference implementation. Service mesh implementations (Istio especially) integrate SPIFFE-style identity. SPIFFE replaces the long-lived API-key-and-secret pattern with short-lived, automatically-rotated workload credentials.
- **API gateway is the north-south choke point.** Authentication, authorization, rate limiting, request transformation, response caching, and request routing all live at the gateway. CISSP framing: API gateway is the centralized policy-enforcement point for traffic entering the microservices cluster, equivalent in role to a perimeter firewall but operating at OSI Layer 7. Sibling Concept `api-authentication-methods` covers the auth methods gateways enforce; `api-security-risks` covers OWASP API Top 10.
- **Secrets in microservices.** Each service typically needs database credentials, third-party API keys, and signing keys. Storing them in environment variables or container images is the canonical anti-pattern. Modern practice: external secret store (Vault, Secrets Manager, External Secrets Operator) with secrets injected at runtime via projected volume, init container, or workload-identity-authenticated API call. SPIFFE workload identity reduces the secret count by replacing some long-lived secrets entirely.
- **Observability is a security control too.** Distributed tracing makes it possible to reconstruct an attacker's path across services. Without trace correlation, a malicious request that touches ten services produces ten unrelated log entries — incident response cannot piece them together. OpenTelemetry has become the dominant standard for traces, metrics, and logs.
- **East-west segmentation is the lateral-movement defense.** Without it, a compromised service has unrestricted access to every other service in the cluster. Kubernetes NetworkPolicy (in Calico, Cilium) enforces default-deny with explicit allowlists — service A can reach service B only if a NetworkPolicy explicitly permits it. CIS Kubernetes Benchmark mandates namespace-level default-deny as a baseline.
- **Sidecar trade-off.** Service-mesh sidecars consume CPU, memory, and add small latency per call. For thousands of pods, the overhead is non-trivial. Newer approaches (eBPF-based meshes like Cilium Service Mesh, Istio Ambient Mesh) move the mesh logic into the kernel or per-node proxies to reduce the sidecar tax. CISSP testing rarely goes this deep; the high-level "service mesh provides east-west security via sidecar" framing is enough.
- **Cross-Concept link.** Sibling Concept `container-security` covers the container-platform layer microservices run on. `api-security-risks` covers OWASP API Top 10 risks. `api-authentication-methods` covers north-south auth mechanisms. `cloud-service-models` covers the IaaS/PaaS/FaaS context. `zero-trust-networking` covers the broader Zero Trust principles that microservices security operationalizes.
- **Out of scope for this Concept:** specific service-mesh products in detail, eBPF-based meshes, gRPC-specific security patterns, GraphQL gateway security, Kafka / event-bus security in microservices contexts, Domain-Driven Design boundaries as security-relevant, sagas and distributed transactions security, multi-cluster mesh federation, OpenTelemetry trace context propagation security.

### Tricky distractors

- **North-south vs East-west.** Different traffic directions, different controls. Wrong-answer pattern: applying perimeter-firewall thinking to east-west — internal service-to-service requires its own auth and segmentation.
- **Service mesh is for east-west; API gateway is for north-south.** Different boundaries. Wrong-answer pattern: claiming API gateway protects east-west traffic — that's the service mesh's role.
- **mTLS authenticates both peers.** Different from regular TLS. Wrong-answer pattern: claiming TLS alone provides service-to-service authentication — server-side TLS authenticates only the server.
- **SPIFFE is workload identity.** Per-workload, automatic. Wrong-answer pattern: claiming SPIFFE is a secret-management product — it's the identity standard secret-management products integrate with.
- **Secrets in env vars is anti-pattern.** Image and env vars are visible. Wrong-answer pattern: claiming env-var secrets are acceptable in production.
- **Default-deny on east-west.** Lateral movement defense. Wrong-answer pattern: claiming default-allow east-west is acceptable in microservices — opposite, default-deny is the baseline.

### Values without a direct public citation

| Cell | Value | Why unsourced |
|---|---|---|
| All rows × typical implementation | Specific products | Tool names from industry-standard OSS and SaaS projects; NIST SP 800-204 [s1] discusses the patterns conceptually without enumerating specific products per cell. |
| Service mesh × all cells | — | Service-mesh framing is industry-driven (CNCF projects); specific cell phrasings reflect cross-product synthesis rather than a single primary publication. |
| East-west segmentation × all cells | — | Kubernetes-specific implementation; NIST guidance addresses segmentation conceptually. Cell values reflect CNCF / CIS Kubernetes guidance synthesis. |

## Engine demo opportunities

- `Service mesh | mechanism → ?` → `Sidecar proxy intercepting every service-to-service call`
- `API gateway | mechanism → ?` → `Centralized authentication, rate limiting, routing`
- `? | what it protects → Lateral movement between services` → `East-west segmentation`
- `? | what it protects → Service identity for east-west traffic` → `Service-to-service authentication`
- `? | typical implementation → Istio` → `Service mesh` (sub-Fact in multi-Fact cell)
- `? | typical implementation → SPIFFE workload identity` → `Service-to-service authentication` (sub-Fact in multi-Fact cell)
- `? | typical implementation → HashiCorp Vault` → `Secrets management` (sub-Fact in multi-Fact cell)
- `Observability | mechanism → ?` → `Distributed tracing`, `Centralized logging`, `Metrics collection`
- Composite Service mesh Row with `mechanism` swapped to `Centralized authentication, rate limiting, routing` (API gateway's value) — directly tests the mesh-vs-gateway distinction (mesh is east-west sidecar; gateway is north-south centralized)
- Composite Secrets management Row with `mechanism` swapped to `Default-deny network policy with explicit allowlist` (East-west segmentation's value) — tests secrets-vs-segmentation (different control families)
- Composite Service-to-service authentication Row with `typical implementation` swapped to `Istio`, `Linkerd`, `Consul Connect` (Service mesh's value) — tests auth-vs-mesh distinction (service-to-service auth is the *function*; service mesh is the *implementation pattern* that often delivers it)

## Sources

- `[s1]`: NIST SP 800-204, "Security Strategies for Microservices-based Application Systems" — microservices security framework (August 2019, retrieved 2026-04-30, https://csrc.nist.gov/publications/detail/sp/800-204/final). NIST SP 800-204A, "Building Secure Microservices-based Applications Using Service-Mesh Architecture" (May 2020, retrieved 2026-04-30, https://csrc.nist.gov/publications/detail/sp/800-204/a/final). NIST SP 800-204B, "Attribute-based Access Control for Microservices-based Applications" (August 2021, retrieved 2026-04-30, https://csrc.nist.gov/publications/detail/sp/800-204/b/final)
- `[s2]`: SPIFFE / SPIRE specifications — workload identity standard (retrieved 2026-04-30, https://spiffe.io/). CNCF Service Mesh project documentation (Istio, Linkerd) — sidecar architecture and mTLS (retrieved 2026-04-30, https://istio.io/latest/docs/concepts/security/ and https://linkerd.io/2/features/automatic-mtls/)
- `[s3]`: (ISC)² CISSP Certification Exam Outline, effective 2024-04-15, Domain 8 §8.1 *Understand and integrate security in the Software Development Life Cycle (SDLC)* and §8.2 *Identify and apply security controls in software development ecosystems* (retrieved 2026-04-30, https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline)
