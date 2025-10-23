# API Patterns & Structure

**Last Updated**: 2025-10-23

This document establishes the patterns and conventions for building API routes in Nuquiz.

---

## 🏗️ Directory Structure

Next.js Pages Router uses file-based routing in `src/pages/api/`:

```
src/pages/api/
├── auth/
│   └── [...nextauth].ts          # NextAuth handler
├── quiz/
│   ├── start.ts                  # POST /api/quiz/start
│   ├── [sessionId]/
│   │   ├── index.ts             # GET /api/quiz/:sessionId
│   │   ├── answer.ts            # POST /api/quiz/:sessionId/answer
│   │   └── complete.ts          # POST /api/quiz/:sessionId/complete
│   └── history.ts               # GET /api/quiz/history
├── content-packs/
│   ├── index.ts                 # GET /api/content-packs (list)
│   ├── create.ts                # POST /api/content-packs (admin only)
│   └── [id]/
│       ├── index.ts             # GET /api/content-packs/:id
│       ├── update.ts            # PUT /api/content-packs/:id (admin only)
│       └── subscribe.ts         # POST /api/content-packs/:id/subscribe
└── users/
    ├── me.ts                    # GET /api/users/me
    ├── register.ts              # POST /api/users/register
    └── [id]/
        ├── index.ts             # GET /api/users/:id (admin only)
        └── role.ts              # PUT /api/users/:id/role (superadmin only)
```

### Naming Conventions

**Files**:
- `index.ts` - GET requests (resource retrieval)
- `create.ts` - POST requests (resource creation)
- `update.ts` - PUT/PATCH requests (resource updates)
- Action-specific names for other operations (`subscribe.ts`, `complete.ts`, etc.)

**Routes**:
- RESTful where possible
- Action-based for complex operations (e.g., `/quiz/:id/complete`)
- Plural for collections (`/content-packs`, `/users`)
- Singular for specific actions (`/quiz/start`)

---

## 🔐 RBAC Pattern

### 1. Basic Authentication

**Any authenticated user**:
```typescript
import { withAuth, type AuthenticatedRequest } from '@/lib/auth-middleware';

const handler = async (req: AuthenticatedRequest, res: NextApiResponse) => {
  // req.session is properly typed and guaranteed to exist
  const userId = req.session.user.id;

  return res.status(200).json({ message: 'Success' });
};

export default withAuth(handler);
```

### 2. Role-Based Protection

**Admin or Superadmin only**:
```typescript
import { withAdmin, type AuthenticatedRequest } from '@/lib/auth-middleware';

const handler = async (req: AuthenticatedRequest, res: NextApiResponse) => {
  const { session } = req;

  // Only admins and superadmins can reach here
  return res.status(200).json({ message: 'Admin content' });
};

export default withAdmin(handler);
```

**Superadmin only**:
```typescript
import { withSuperAdmin, type AuthenticatedRequest } from '@/lib/auth-middleware';

export default withSuperAdmin(async (req, res) => {
  return res.status(200).json({ message: 'Superadmin content' });
});
```

**Custom role requirements**:
```typescript
import { withRole, type AuthenticatedRequest } from '@/lib/auth-middleware';

// Allow specific roles
export default withRole(['admin', 'superadmin'], async (req, res) => {
  return res.status(200).json({ message: 'Management access' });
});
```

### 3. Resource Ownership

**User can access their own resources OR has elevated role**:
```typescript
import { withAuth, canAccessResource, type AuthenticatedRequest } from '@/lib/auth-middleware';
import { AppError } from '@/lib/errors';

const handler = async (req: AuthenticatedRequest, res: NextApiResponse) => {
  const { session } = req;
  const resourceOwnerId = parseInt(req.query.userId as string);

  // Check ownership or admin role
  if (!canAccessResource(
    session.user.id,
    resourceOwnerId,
    session.user.role,
    ['admin', 'superadmin']
  )) {
    throw new AppError('Forbidden', 403);
  }

  // User can access their own resource or is admin
  return res.status(200).json({ data: 'sensitive data' });
};

export default withAuth(handler);
```

---

## ✅ Input Validation Pattern

**Always validate inputs with Zod at API boundaries**:

```typescript
import { z } from 'zod';
import { withAuth, type AuthenticatedRequest } from '@/lib/auth-middleware';
import { AppError } from '@/lib/errors';

// Define schema
const startQuizSchema = z.object({
  contentPackId: z.number().int().positive(),
  questionCount: z.number().int().min(5).max(20).optional(),
});

const handler = async (req: AuthenticatedRequest, res: NextApiResponse) => {
  // Validate input
  const result = startQuizSchema.safeParse(req.body);

  if (!result.success) {
    throw new AppError('Invalid input', 400, {
      errors: result.error.issues,
    });
  }

  const { contentPackId, questionCount = 10 } = result.data;

  // Input is now type-safe
  // ... business logic

  return res.status(200).json({ sessionId: 123 });
};

export default withAuth(handler);
```

**Create reusable schemas in `src/lib/schemas.ts`**:
```typescript
// src/lib/schemas.ts
export const contentPackIdSchema = z.object({
  contentPackId: z.number().int().positive(),
});

export const quizAnswerSchema = z.object({
  questionId: z.number().int().positive(),
  selectedOptionId: z.number().int().positive(),
  responseTimeMs: z.number().int().min(0).optional(),
});

// Use in routes
import { quizAnswerSchema } from '@/lib/schemas';
```

---

## 🚨 Error Handling Pattern

### Using AppError

```typescript
import { AppError } from '@/lib/errors';

const handler = async (req: AuthenticatedRequest, res: NextApiResponse) => {
  try {
    // Business logic
    const session = await quizSessions.findById(sessionId);

    if (!session) {
      throw new AppError('Quiz session not found', 404, { sessionId });
    }

    if (session.user_id !== parseInt(req.session.user.id)) {
      throw new AppError('Forbidden: Not your session', 403);
    }

    return res.status(200).json({ session });

  } catch (error) {
    // AppError handling
    if (error instanceof AppError) {
      return res.status(error.statusCode).json(error.toJSON());
    }

    // Unexpected errors
    console.error('Unexpected error:', error);
    return res.status(500).json({
      error: 'Internal Server Error',
      message: 'An unexpected error occurred',
    });
  }
};
```

### Error Response Format

```typescript
// Success (200-299)
{
  "data": { ... },
  "message": "Optional success message"
}

// Client Error (400-499)
{
  "error": "AppError",
  "message": "User-friendly error message",
  "statusCode": 400,
  "timestamp": "2025-10-23T10:30:00.000Z",
  "metadata": {
    "errors": [ ... ]  // Validation errors
  }
}

// Server Error (500-599)
{
  "error": "Internal Server Error",
  "message": "An unexpected error occurred"
}
```

---

## 📝 Complete API Route Template

```typescript
/**
 * POST /api/quiz/start
 *
 * Start a new quiz session for the authenticated user.
 *
 * @requires Authentication
 * @requires User must have subscription to content pack
 */

import type { NextApiResponse } from 'next';
import { z } from 'zod';
import { withAuth, type AuthenticatedRequest } from '@/lib/auth-middleware';
import { AppError } from '@/lib/errors';
import * as quizSessions from '@/db/quizSessions';
import * as contentPacks from '@/db/contentPacks';

// Input validation schema
const startQuizSchema = z.object({
  contentPackId: z.number().int().positive(),
  questionCount: z.number().int().min(5).max(20).default(10),
});

const handler = async (req: AuthenticatedRequest, res: NextApiResponse) => {
  // 1. Method check
  if (req.method !== 'POST') {
    throw new AppError('Method not allowed', 405);
  }

  try {
    // 2. Validate input
    const result = startQuizSchema.safeParse(req.body);
    if (!result.success) {
      throw new AppError('Invalid input', 400, {
        errors: result.error.issues,
      });
    }

    const { contentPackId, questionCount } = result.data;
    const userId = parseInt(req.session.user.id);

    // 3. Check permissions (user has access to content pack)
    const hasAccess = await contentPacks.hasAccess(userId, contentPackId);
    if (!hasAccess) {
      throw new AppError('You do not have access to this content pack', 403, {
        contentPackId,
      });
    }

    // 4. Business logic (use DAL functions)
    const session = await quizSessions.create(userId, contentPackId);
    const questions = await quizGeneration.generateQuestions(
      session.id,
      contentPackId,
      questionCount
    );

    // 5. Log analytics event
    await logAnalyticsEvent({
      event_type: 'quiz_started',
      user_id: userId,
      event_data: {
        session_id: session.id,
        content_pack_id: contentPackId,
        question_count: questions.length,
      },
    });

    // 6. Return success response
    return res.status(201).json({
      data: {
        sessionId: session.id,
        questions: questions.length,
      },
      message: 'Quiz session started',
    });

  } catch (error) {
    // 7. Error handling
    if (error instanceof AppError) {
      return res.status(error.statusCode).json(error.toJSON());
    }

    console.error('Error starting quiz:', error);
    return res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to start quiz session',
    });
  }
};

export default withAuth(handler);
```

---

## 🧪 API Testing Pattern

**File**: `src/pages/api/__tests__/quiz-start.api.test.ts`

```typescript
import { strict as assert } from 'assert';
import { describe, it, beforeAll, afterEach } from '@jest/globals';
import { testLifecycle } from '@/db/__tests__/helpers';
import * as users from '@/db/users';
import * as contentPacks from '@/db/contentPacks';

describe('POST /api/quiz/start', () => {
  const { cleanup } = testLifecycle();

  afterEach(cleanup);

  it('given valid content pack, creates quiz session', async () => {
    // Setup
    const user = await users.create({ email: 'test@example.com' });
    const pack = await contentPacks.create({
      name: 'Test Pack',
      created_by: user.id,
    });
    await contentPacks.subscribe(user.id, pack.id);

    // Make API request (using supertest or similar)
    const response = await request(app)
      .post('/api/quiz/start')
      .set('Authorization', `Bearer ${token}`)
      .send({ contentPackId: pack.id });

    // Assertions
    assert.equal(response.status, 201);
    assert.ok(response.body.data.sessionId);
  });

  it('given no subscription, returns 403', async () => {
    const user = await users.create({ email: 'test@example.com' });
    const pack = await contentPacks.create({
      name: 'Test Pack',
      created_by: user.id,
    });
    // No subscription created

    const response = await request(app)
      .post('/api/quiz/start')
      .set('Authorization', `Bearer ${token}`)
      .send({ contentPackId: pack.id });

    assert.equal(response.status, 403);
    assert.ok(response.body.message.includes('access'));
  });
});
```

---

## 📊 Response Patterns

### Successful Responses

**Single Resource (200)**:
```typescript
return res.status(200).json({
  data: {
    id: 123,
    name: 'Resource Name',
    // ... other fields
  }
});
```

**Collection (200)**:
```typescript
return res.status(200).json({
  data: [...items],
  pagination: {
    total: 100,
    page: 1,
    limit: 20,
    hasMore: true,
  }
});
```

**Created (201)**:
```typescript
return res.status(201).json({
  data: { id: 123, ... },
  message: 'Resource created successfully'
});
```

**No Content (204)**:
```typescript
return res.status(204).end();
```

---

## 🔄 HTTP Method Patterns

| Method | Purpose | Example Route | RBAC |
|--------|---------|---------------|------|
| GET | Retrieve resource(s) | `/api/quiz/history` | User's own data or Admin |
| POST | Create resource | `/api/quiz/start` | User authenticated |
| PUT | Replace resource | `/api/content-packs/:id/update` | Admin/Owner |
| PATCH | Partial update | `/api/users/me` | User updates self |
| DELETE | Remove resource | `/api/quiz/:id` | Admin/Owner |

**Method checking in handler**:
```typescript
const handler = async (req: AuthenticatedRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  // ... rest of handler
};
```

---

## 🎯 Best Practices

### ✅ DO

1. **Always protect routes** with `withAuth`, `withAdmin`, or `withSuperAdmin`
2. **Always validate input** with Zod schemas
3. **Use AppError** for expected errors with proper status codes
4. **Check resource ownership** before allowing modifications
5. **Log analytics events** for important actions
6. **Use DAL functions** - never write SQL in API routes
7. **Keep handlers thin** - business logic belongs in DAL or pure functions
8. **Test API routes** with integration tests (NO MOCKS)

### ❌ DON'T

1. **Don't expose internal errors** to clients (use generic messages)
2. **Don't trust client input** (always validate)
3. **Don't write SQL in routes** (use DAL layer)
4. **Don't use string interpolation** for SQL (always parameterized)
5. **Don't leak sensitive data** (passwords, internal IDs, etc.)
6. **Don't skip RBAC checks** (even for "internal" endpoints)
7. **Don't use mocks in API tests** (test against real database)

---

## 📚 Reference

- RBAC middleware: `src/lib/auth-middleware.ts`
- Validation schemas: `src/lib/schemas.ts`
- Error handling: `src/lib/errors.ts`
- Example routes: `src/pages/api/examples/`
- NextAuth config: `src/auth.ts`

---

## 🚀 Quick Start Checklist

Starting a new API endpoint? Follow this checklist:

- [ ] Create file in appropriate directory (`src/pages/api/...`)
- [ ] Choose appropriate RBAC middleware (`withAuth`, `withAdmin`, etc.)
- [ ] Define Zod validation schema (or reuse from `src/lib/schemas.ts`)
- [ ] Implement handler with proper error handling
- [ ] Check resource ownership if needed
- [ ] Use DAL functions for all database operations
- [ ] Log analytics events for important actions
- [ ] Write API integration tests
- [ ] Test with real database (NO MOCKS)
- [ ] Document route in API reference (if needed)

**Remember**: Simple, maintainable, secure. Libraries over custom code!
