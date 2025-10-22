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

### Code Style
- **Functional programming** (Eric Elliott style) over OOP
- **Composition over inheritance**
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
- `*.unit.test.ts` - Pure unit tests (functions with no I/O)
- `*.api.test.ts` - API endpoint tests

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
   - RITEWAY (eric elliot)
   
## File Locations

- Database schema: `docs/database.sql`
- Data model explanation: `docs/overview.md`
- Implementation plan: `docs/roadmap.md`
- Architecture diagram: `docs/diagram.md`
