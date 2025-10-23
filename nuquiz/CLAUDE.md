# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Nuquiz is a quiz application built on a hierarchical knowledge structure that enables comparison-based question generation. The system uses a four-level hierarchy (topics → categories → attributes → facts) to generate rich, multi-select quiz questions with intelligent distractor selection.

**Core Innovation**: Complex answer composition tracking via `answer_option_components` table, allowing answer options to be composed of multiple facts, categories, or attributes for sophisticated question generation.

## Tech Stack

- **Framework**: Next.js (Pages Router)
- **Language**: TypeScript (strict mode, ES2017 target)
- **Auth**: NextAuth.js/AuthJS with hard-coded .env credentials (no social auth for MVP)
- **State Management**: RTK Query for API calls
- **Database**: PostgreSQL (via docker-compose)
  - Two instances: dev and test
- **Testing**: Jest
- **Project Management**: GitHub CLI (`gh`)
- **Styling**: CSS Modules

## Key Commands

```bash
# Development
npm run dev        # Start dev server on http://localhost:3000

# Build & Production
npm run build      # Build for production
npm start          # Start production server

# Linting
npm run lint       # Run ESLint

# Testing (when configured)
npm test           # Run all tests
npm test -- <file> # Run specific test file
```

## Architecture Principles

### ⚠️ CRITICAL: Avoid AI-Generated Bloat ("AI Slop")

**This project was refactored in Oct 2025 to remove 1,528 lines of over-engineered code.** Learn from our mistakes:

**❌ NEVER Do This:**
- Write custom validation when Zod exists
- Implement password strength checks (use zxcvbn)
- Create complex error hierarchies (one AppError class is enough)
- Build custom query builders (use Kysely for type safety)
- Over-abstract simple operations (inline is often better)
- Write verbose JSDoc that repeats the code

**✅ ALWAYS Do This:**
- **Use battle-tested libraries** (Zod, zxcvbn, Kysely, bcrypt)
- **Keep it simple** - readable code > "functional purity"
- **Inline simple logic** - don't create helpers used once
- **Pragmatic over dogmatic** - apply FP principles without over-engineering

**Required Reading:**
- `docs/code-review-ai-slop.md` - Complete analysis of what went wrong
- `docs/coding-standards.md` - Pragmatic standards (post-refactoring)

**Before Writing ANY New Code:**
1. Search for an existing library first
2. Check if the logic is simple enough to inline
3. Only abstract when you have 3+ uses
4. Prefer composition over complex hierarchies

### Code Style
- **Functional programming** (Eric Elliott style) over OOP - **but pragmatically applied**
- **Composition over inheritance**
- **Libraries over custom code** - don't reinvent wheels
- **Strict separation** between frontend and backend types
- No shared type definitions between FE/BE

### Testing Philosophy

**CRITICAL RULE: NO MOCKS. MOCKS ARE A CODE SMELL.**

This project uses **real integration testing** instead of mocks:
- Test against real PostgreSQL test database
- Use actual database connections and queries
- Create real test data via factories
- Clean up after each test

**Test File Naming Convention:**
- `*.int.test.ts` - Integration tests (database, API, external services)
  - **Requires:** Test database running (docker-compose)
  - Run with: `npm test` or `npm run test:int`
- `*.unit.test.ts` - Pure unit tests (functions with no I/O)
  - **Requires:** Nothing - pure functions only
  - Run with: `npm run test:unit`
- `*.api.test.ts` - API endpoint tests (using `node-mocks-http`)
  - **Requires:** Test database running (docker-compose)
  - **Does NOT require:** Dev server running (uses direct handler calls)
  - Run with: `npm run test:api`

**Why No Mocks?**
- Mocks test your mocks, not your code
- Integration tests catch real issues
- Database tests run fast enough with proper setup
- Refactoring doesn't break mock-heavy test suites

### Project Structure

```
src/
├── pages/           # Next.js pages (Pages Router)
│   ├── api/        # API routes (/api/*)
│   ├── _app.tsx    # App wrapper
│   └── index.tsx   # Home page
└── styles/         # CSS modules

docs/
├── overview.md     # Knowledge hierarchy data model
├── database.sql    # Full database schema
├── roadmap.md      # MVP implementation plan
└── diagram.md      # Architecture diagram
```

### Path Aliases
- `@/*` maps to `./src/*`

## Database Schema

### Core Hierarchy (Single Table Design)

The `knowledge` table uses a self-referential hierarchy with 4 node types:

1. **Topic**: Broad subject areas (can nest infinitely)
2. **Category**: Specific variants/types to be compared (must have topic parent)
3. **Attribute**: Dimensions of comparison (must have category parent)
4. **Fact**: Testable information (must have attribute parent)

**Example Hierarchy**:
```
Congestive Heart Failure (topic)
├── Left sided (category)
│   ├── Symptoms (attribute)
│   │   ├── Pulmonary edema (fact)
│   │   └── Dyspnea (fact)
│   └── Causes (attribute)
│       └── Hypertension (fact)
└── Right sided (category)
    └── Symptoms (attribute)
        └── Peripheral edema (fact)
```

### MVP Tables (11 Total)

**Users & Access**:
- `users` - User accounts
- `content_packs` - Quiz content packages
- `user_pack_subscriptions` - Access control

**Knowledge**:
- `knowledge` - Single hierarchical table

**Quiz Engine**:
- `quiz_sessions` - Quiz attempts
- `questions` - Generated questions
- `answer_options` - Multiple choice options
- `answer_option_components` - **KEY**: Maps options to knowledge components

**Progress Tracking**:
- `user_knowledge_progress` - Simple mastery percentages
- `analytics_events` - Flexible JSONB event logging for future intelligence

Full schema available in `docs/database.sql`.

## Quiz Generation Logic

### Question Formula
`"Select all {attribute.label} of {category.label}"`

### Answer Pool Construction
1. **Correct answers**: All facts under `category + attribute` path
2. **Distractors** from:
   - Sibling categories (same attribute, different category)
   - Same category, different attributes
   - Related topics at same level

**Example**:
- Path: `left sided | symptoms`
- Correct: Pulmonary edema, Dyspnea, Orthopnea
- Distractors: Peripheral edema (from right-sided symptoms), Hypertension (from left-sided causes)

## Development Workflow

### MVP Focus (Weeks 1-4)
The roadmap in `docs/roadmap.md` outlines a phased approach:

**Phase 1**: Core functionality
- User auth with NextAuth
- Content pack subscriptions
- Basic quiz engine
- Simple progress tracking

**Phase 2**: Data collection (30+ days)
- Log everything to `analytics_events`
- Gather real user behavior patterns

**Phase 3**: Intelligence layer (Post-MVP)
- Add adaptive difficulty ONLY after data analysis
- Build spaced repetition based on real retention patterns
- Discover prerequisites through actual performance data

**Key Principle**: Don't build intelligence features until you have real data.

## Docker & Database Setup

When docker-compose is configured, there will be:
- PostgreSQL dev instance (for local development)
- PostgreSQL test instance (for running tests)

Keep these instances separate to avoid test pollution.

## Important Constraints

### What NOT to Build Yet
- ❌ Adaptive difficulty (needs performance data)
- ❌ Spaced repetition (needs retention data)
- ❌ Prerequisite recommendations (needs sequence data)
- ❌ Confusion matrices (needs error patterns)

### MVP Success Criteria
- ✅ Users can register/login
- ✅ Quiz questions generate correctly
- ✅ Complex answers tracked via `answer_option_components`
- ✅ Basic progress visible
- ✅ Events logged for future analysis

## GitHub Workflow

Use `gh` CLI for all GitHub operations:
```bash
gh issue list
gh pr create
gh pr view
gh repo view
```

## Notes for Implementation

1. **Knowledge Hierarchy**: Always validate parent-child type relationships:
   - Topics can parent topics or categories
   - Categories can only parent attributes
   - Attributes can only parent facts

2. **Answer Components**: Every answer option MUST have entries in `answer_option_components` linking to the knowledge nodes it represents.

3. **Event Logging**: Log liberally to `analytics_events` (JSONB column). Future features depend on this data.

4. **Path Notation**: Use `category | attribute` format for question generation paths (e.g., `left sided | symptoms`).

5. **TypeScript**: Respect strict separation between FE and BE types. No shared type files.

6. **Testing**: When Jest is configured, write tests for:
   - Knowledge hierarchy traversal (use `*.int.test.ts`)
   - Question generation logic (use `*.int.test.ts`)
   - Answer component composition (use `*.int.test.ts`)
   - Distractor selection algorithms (use `*.unit.test.ts` if pure functions, `*.int.test.ts` if database-dependent)
   - **NEVER use mocks** - always test against real test database
   - Name files appropriately: `*.int.test.ts`, `*.unit.test.ts`, or `*.api.test.ts`
   - Follow RITEway principles (Eric Elliott)

7. **Authentication & Authorization**:
   - Use NextAuth.js for authentication (v5 beta, credentials provider)
   - Three-tier role system: `student`, `admin`, `superadmin`
   - Protect API routes with middleware: `withAuth()`, `withAdmin()`, `withSuperAdmin()`
   - All auth events logged to `auth_events` table
   - Passwords hashed with bcrypt (12 salt rounds)
   - JWT sessions (30-day expiration)
   - See `docs/nextauth-implementation-summary.md` for complete details

8. **Role-Based Access Control**:
   - **Student**: Takes quizzes, views own progress, accesses subscribed content
   - **Admin**: Creates/manages content packs, manages subscriptions, views analytics for their content
   - **Superadmin**: Full system access, user management, role assignment, system configuration
   - Use `requireRole()` in server components, `withRole()` in API routes
   - Check resource ownership with `canAccessResource()` helper

9. **Security Practices**:
   - Never store plain-text passwords
   - Always log auth events (login, logout, failed attempts, role changes)
   - Include IP address and user agent in audit logs
   - Validate all inputs at boundaries
   - Use typed errors instead of generic Error()
   - Implement rate limiting for failed logins (helper function ready)

## Approved Dependencies

**Always use these libraries instead of custom implementations:**

### Validation & Schemas
- **Zod** - Runtime validation, schema inference (`src/lib/schemas.ts`)
- Never write custom regex validators

### Security
- **bcryptjs** - Password hashing (12 salt rounds)
- **zxcvbn** - Password strength checking (Dropbox's library)
- Never roll your own crypto or password validation

### Database
- **pg** - PostgreSQL client (parameterized queries)
- **Kysely** - Type-safe query builder (`src/db/kysely.ts`)
- Never use string interpolation for SQL

### Authentication
- **NextAuth v5** - Authentication framework (`src/auth.ts`)
- JWT sessions, role-based access control

### Error Handling
- **AppError class** - Simple, pragmatic error handling (`src/lib/errors.ts`)
- No complex error hierarchies or factory methods

## File Locations

### Core Documentation
- Database schema: `docs/database.sql`
- Data model explanation: `docs/overview.md`
- Implementation plan: `docs/roadmap.md`
- Architecture diagram: `docs/diagram.md`
- **Coding standards: `docs/coding-standards.md`** ⭐ **READ THIS FIRST**

### Code Quality & Anti-Patterns
- **AI slop analysis: `docs/code-review-ai-slop.md`** ⭐ **REQUIRED READING**
- Eric Elliott code review (historical): `docs/eric-elliott-code-review.md`

### API Development
- **API patterns & structure: `docs/api-patterns.md`** ⭐ **REFERENCE FOR ALL API ROUTES**
- NextAuth implementation: `docs/nextauth-implementation-summary.md`
- RBAC middleware: `src/lib/auth-middleware.ts`
- Validation schemas: `src/lib/schemas.ts`
- Error handling: `src/lib/errors.ts`

### Testing
- RITEway principles: `docs/test-review-riteway.md`
- Test refactoring examples: `docs/test-refactor-example.md`
- Database testing guide: `docs/database-testing-guide.md`
