# NuQuiz — Project Conventions

## Stack

| Layer | Choice |
|-------|--------|
| Monorepo | pnpm workspaces |
| Backend | Hono on Node.js |
| Frontend | React + Vite |
| DB | SQLite (better-sqlite3) + Drizzle ORM |
| Validation | Zod (shared schemas) |
| Auth | Arctic (OAuth 2.0) |
| Type-safe client | Hono RPC (`hono/client`) |
| Testing | Jest |

## Structure

```
packages/
  shared/   — Zod schemas + inferred types
  api/      — Hono backend (Node.js)
  web/      — React SPA (Vite)
```

## Commands

```bash
pnpm install          # Install all dependencies
pnpm dev              # Run API (:3001) + web (:5173) concurrently
pnpm build            # Build all packages
pnpm db:generate      # Generate Drizzle migrations
pnpm db:migrate       # Run Drizzle migrations
```

## Patterns

- **Shared validation**: Define Zod schemas in `packages/shared`, import in both API and web
- **Type-safe API calls**: Use Hono RPC client in web — no manual type definitions for endpoints
- **DB access**: Always use Drizzle ORM — never raw SQL strings
- **Auth**: OAuth via Arctic, sessions stored in SQLite, HTTP-only cookies
- **Route organization**: One file per route group in `packages/api/src/routes/`
- **Security defaults**: CORS, CSRF, secure headers enabled on all routes
- **Functional pipelines**: Separate data fetching from transformation from persistence. Business logic lives in pure functions with no side effects. Pattern: fetch all data → transform/build (pure) → output → persist. Never pull data mid-computation.
- **Testing**: Jest with AAA (Arrange/Act/Assert) pattern. RITEway principles (Readable, Isolated, Thorough, Explicit). Test pure transform functions in isolation. Red-green-refactor for core domain logic.

## Conventions

- TypeScript strict mode everywhere
- ESM modules (`"type": "module"`)
- Zod for all input validation on API endpoints
- Parameterized queries only (Drizzle handles this)
- HTTP-only, Secure, SameSite=Lax session cookies
- No `any` types — use `unknown` and narrow with Zod
