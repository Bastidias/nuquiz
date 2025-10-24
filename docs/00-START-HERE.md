# Nuquiz Documentation Index

**Welcome to Nuquiz!** This is your starting point for understanding the project.

## Quick Start

**New to the project?** Read these in order:
1. [Project Overview](#project-overview) - What Nuquiz is and how it works
2. [Core Concepts](#core-concepts) - Knowledge hierarchy, quiz generation, adaptive learning
3. [Development Setup](development/database-setup.md) - Get your environment running
4. [Coding Standards](development/coding-standards.md) - How we write code

**Building a feature?** Check:
- [User Stories](project/user-stories.md) - What users need
- [API Patterns](development/api-patterns.md) - How to build endpoints
- [Testing Guide](development/testing-guide.md) - How to test your code

---

## Project Overview

### What is Nuquiz?

Nuquiz is a quiz application built on a **hierarchical knowledge structure** that enables **comparison-based question generation**.

**Core Innovation**: Multi-component answer tracking via `answer_option_components` table, allowing sophisticated analysis of what students know vs. what they confuse.

### Key Documents

| Document | Purpose | Audience |
|----------|---------|----------|
| [Data Model](project/data-model.md) | Complete explanation of knowledge hierarchy | Everyone |
| [Architecture](project/architecture.md) | System design & database schema | Developers |
| [Roadmap](project/roadmap.md) | MVP phases & timeline | Product, Developers |
| [User Stories](project/user-stories.md) | Feature requirements | Product, QA |

---

## Core Concepts

### Knowledge Hierarchy

Four levels that enable comparison-based learning:

```
Topics → Categories → Attributes → Facts
```

**Example**:
```
Congestive Heart Failure (topic)
├── Left-sided (category)
│   └── Symptoms (attribute)
│       ├── Pulmonary edema (fact)
│       └── Dyspnea (fact)
└── Right-sided (category)
    └── Symptoms (attribute)
        └── Peripheral edema (fact)
```

**Question Generated**: "Select all symptoms of left-sided CHF"
- **Correct**: Pulmonary edema, Dyspnea
- **Distractors**: Peripheral edema (from right-sided)

📖 [Read full data model explanation](project/data-model.md)

### Quiz Generation

Two question directions:
- **Downward**: `category + attribute → facts` (most common)
- **Upward**: `attribute + fact → categories` (reverse thinking)

Five selection strategies:
- `untested` - New material
- `review` - Mastered content
- `struggling` - Low accuracy
- `targeted` - User-chosen paths
- `adaptive` - Confusion-based difficulty

📖 [Read quiz generation spec](reference/quiz-generation-spec.md)

### Role-Based Access Control (RBAC)

Three roles with clear boundaries:
- **Student**: Browse, subscribe, take quizzes, view own progress
- **Admin**: Create content packs, manage own content, view analytics
- **Superadmin**: Full system access, user management, role assignment

📖 [Read API patterns & RBAC](development/api-patterns.md)

---

## Development

### Essential Reading for Developers

**Before writing ANY code**:
1. [Coding Standards](development/coding-standards.md) - **MUST READ** - Avoid AI slop
2. [API Patterns](development/api-patterns.md) - How to structure routes
3. [Testing Guide](development/testing-guide.md) - No mocks, real integration tests

**Setting up your environment**:
1. [Database Setup](development/database-setup.md) - Docker, migrations, seeding
2. [Sample Data Guide](development/sample-data-guide.md) - Understanding test data

### Tech Stack

| Layer | Technology | Why |
|-------|------------|-----|
| Framework | Next.js (Pages Router) | SSR, API routes, React |
| Language | TypeScript (strict) | Type safety |
| Database | PostgreSQL | JSONB for events, hierarchical data |
| Auth | NextAuth.js v4 | Industry standard |
| Validation | Zod | Runtime type safety |
| Testing | Jest | Real DB integration tests |
| Query Builder | Kysely | Type-safe SQL |

### File Structure

```
src/
├── pages/
│   ├── api/              # API routes
│   ├── admin/            # Admin pages (RBAC protected)
│   └── [public pages]    # Student/public pages
├── lib/
│   ├── auth-middleware.ts   # RBAC helpers
│   ├── schemas.ts           # Zod validation
│   ├── errors.ts            # AppError class
│   └── quiz/                # Quiz engine
├── db/
│   ├── [entity].ts          # Database functions (I/O)
│   ├── [entity]-pure.ts     # Business logic (pure)
│   └── __tests__/           # Integration tests
└── components/
    ├── atoms/               # Basic UI components
    └── [feature]/           # Feature-specific components

docs/
├── 00-START-HERE.md         # This file
├── project/                 # What we're building
├── development/             # How to build it
├── reference/               # Technical specs
├── testing/                 # Test plans
└── archive/                 # Historical docs
```

---

## Reference

### Database Schema

- [Full SQL Schema](reference/database-schema.sql) - All tables, indexes, constraints
- [Data Model](project/data-model.md) - Conceptual explanation
- [Quiz Generation Spec](reference/quiz-generation-spec.md) - Technical specification

### API Documentation

- [API Patterns](development/api-patterns.md) - Route structure, RBAC, error handling
- See inline JSDoc in `src/pages/api/` for endpoint details

---

## Testing

### Testing Philosophy

**CRITICAL RULE: NO MOCKS. MOCKS ARE A CODE SMELL.**

We use **real integration testing** against a PostgreSQL test database.

**Test Types**:
- `*.int.test.ts` - Integration tests (database, API)
- `*.unit.test.ts` - Pure unit tests (no I/O)
- `*.api.test.ts` - API endpoint tests (node-mocks-http)

📖 [Read full testing guide](development/testing-guide.md)

### Manual Test Plans

- [Phase 2: Student Experience](testing/manual/phase2-student-experience.md)

---

## Product & Planning

### User Stories

Complete feature requirements organized by role and epic:

- Epic 1: Public Marketing & Landing Pages
- Epic 2: User Registration & Authentication
- Epic 3: User Dashboard (Student)
- Epic 4: Content Pack Management (Admin)
- Epic 5: User Management (Superadmin)
- Epic 6: UI/UX Foundation

📖 [Read all user stories](project/user-stories.md)

### Roadmap

**MVP Timeline**: 4-6 weeks

- **Phase 1** (Weeks 1-4): Core features & quiz engine
- **Phase 2** (Weeks 5-8): Data collection (30+ days)
- **Phase 3** (Weeks 9-12): Intelligence layer (adaptive, spaced repetition)

**Key Principle**: Don't build intelligence features until you have real data.

📖 [Read full roadmap](project/roadmap.md)

---

## Archive

Historical documents kept for reference:

### Code Reviews
- [AI Slop Refactoring (Oct 2025)](archive/code-reviews/2025-10-ai-slop-refactoring.md) - **REQUIRED READING** - What went wrong
- [Eric Elliott Review (Oct 2025)](archive/code-reviews/2025-10-eric-elliott-review.md) - FP best practices
- [Test Refactoring (Oct 2025)](archive/code-reviews/2025-10-test-refactor.md) - RITEway principles

### Implementation Notes
- [NextAuth Setup](archive/implementation-notes/nextauth-setup.md) - Auth system implementation

---

## Quick Reference

### Common Commands

```bash
# Development
npm run dev          # Start dev server (kills old, clears cache)

# Database
npm run db:seed      # Load sample data + test users

# Testing
npm test             # Run all tests
npm run test:api     # API tests only
npm run test:int     # Integration tests only

# Build
npm run build        # Production build
npm start            # Start production server
```

### Test Users (after `npm run db:seed`)

| Email | Password | Role |
|-------|----------|------|
| admin@test.com | password123 | admin |
| student@test.com | password123 | student |
| teacher@school.edu | password123 | admin |

---

## Getting Help

### Before Writing Code

1. ✅ Read [Coding Standards](development/coding-standards.md)
2. ✅ Check [API Patterns](development/api-patterns.md) for route structure
3. ✅ Review [User Stories](project/user-stories.md) for requirements
4. ✅ Read the [AI Slop Review](archive/code-reviews/2025-10-ai-slop-refactoring.md) to avoid common mistakes

### While Writing Code

- **Need to validate input?** → Use Zod (see [schemas.ts](../src/lib/schemas.ts))
- **Need to protect a route?** → Use auth middleware (see [API Patterns](development/api-patterns.md))
- **Need to query DB?** → See [Database Testing Guide](development/testing-guide.md)
- **Need to handle errors?** → Use AppError class (see [errors.ts](../src/lib/errors.ts))

### After Writing Code

1. ✅ Write integration tests (see [Testing Guide](development/testing-guide.md))
2. ✅ Run `npm test` - all tests must pass
3. ✅ Run `npm run build` - must build successfully
4. ✅ Check linting - `npm run lint`

---

## Document Maintenance

**This documentation is a living resource.** When you:

- Add a feature → Update [User Stories](project/user-stories.md)
- Change database → Update [Database Schema](reference/database-schema.sql)
- Add API route → Document in code, reference [API Patterns](development/api-patterns.md)
- Learn something → Consider documenting in relevant guide

**Keep docs DRY**: Link to source of truth, don't duplicate.

---

## Project Status

**Current Phase**: Phase 4 - Quiz Engine (PR #7 open)

**Completed**:
- ✅ Database layer & testing
- ✅ NextAuth + RBAC
- ✅ MVP foundation (auth, content packs)
- ✅ Student experience (browse, subscribe)
- ✅ Admin features (create, manage packs)

**In Progress**:
- 🚧 Quiz generation engine (code review in progress)

**Next Up**:
- Quiz session persistence
- Answer tracking & progress
- Analytics dashboard
