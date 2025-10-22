# Nuquiz Coding Standards & Patterns

**Last Updated**: 2025-10-22

These standards capture the architectural decisions and patterns used in Nuquiz.
All code should follow these principles.

---

## 🎯 Core Principles

### 1. Functional Programming First
- **Pure functions** over classes
- **Composition** over inheritance
- **Immutability** by default
- **Declarative** over imperative

### 2. No Mocks Philosophy
- Test against **real database**
- Integration tests prove real behavior
- Unit tests for **pure functions only**

### 3. Type Safety
- No `any` types (except at boundaries)
- No type assertions without validation
- Strict TypeScript configuration

### 4. Separation of Concerns
- Pure functions in `*-pure.ts` files
- I/O functions in main files
- Frontend and backend types **never shared**

---

## 📁 File Naming Conventions

```
*.int.test.ts    - Integration tests (database, API)
*.unit.test.ts   - Pure unit tests (no I/O)
*.api.test.ts    - API endpoint tests
*-pure.ts        - Pure functions only (no side effects)
```

**Examples**:
```
src/db/users.ts                    - User DAL with I/O
src/db/users-pure.ts               - Pure user transformations
src/db/__tests__/users.int.test.ts - Integration tests
src/db/__tests__/users-pure.unit.test.ts - Unit tests
```

---

## 🧪 Testing Standards

### RITEway Principles

**R**eadable - Tests read like requirements
**I**solated - No shared state between tests
**T**horough - Cover all requirements and edge cases
**E**xplicit - One assertion per test (for critical paths)

### Test Naming Format

```typescript
// ✅ GOOD: given/when/then format
it('given valid email, create() returns user with id', async () => {
  const result = await users.create({ email: 'test@example.com' });
  assert.ok(result.id > 0);
});

// ❌ BAD: Vague name
it('should create user', async () => {
  // ...
});
```

### Test Isolation

**Use transaction helpers for automatic cleanup:**

```typescript
import { withTransaction } from './helpers/transactions';

it('given valid email, create() persists user', async () => {
  await withTransaction(async () => {
    const user = await users.create({ email: 'test@example.com' });
    const found = await users.findByEmail('test@example.com');
    assert.equal(found?.id, user.id);
    // ✅ No cleanup needed - transaction rolls back
  });
});
```

### Pure Function Tests

**Extract and test pure logic separately:**

```typescript
// users-pure.ts
export const buildUpdateQuery = (id: number, data: Partial<User>) => {
  const updates = Object.entries(data)
    .filter(([_, value]) => value !== undefined)
    .map(([key, value], index) => ({
      field: `${key} = $${index + 1}`,
      value,
    }));

  return {
    sql: `UPDATE users SET ${updates.map(u => u.field).join(', ')} WHERE id = $${updates.length + 1}`,
    params: [...updates.map(u => u.value), id],
  };
};

// users-pure.unit.test.ts
it('given email update, buildUpdateQuery() returns SQL with email parameter', () => {
  const result = buildUpdateQuery(1, { email: 'new@example.com' });
  assert.ok(result.sql.includes('email = $1'));
  assert.deepEqual(result.params, ['new@example.com', 1]);
});
```

---

## 🗄️ Database Access Layer (DAL) Patterns

### Function Signatures

**Query Functions** (read-only):
```typescript
export const findById = async (id: number): Promise<User | null> => {
  return queryOne<User>('SELECT * FROM users WHERE id = $1', [id]);
};

export const findByEmail = async (email: string): Promise<User | null> => {
  return queryOne<User>(
    'SELECT * FROM users WHERE LOWER(email) = LOWER($1)',
    [email]
  );
};
```

**Mutation Functions** (write):
```typescript
export const create = async (data: NewUser): Promise<User> => {
  const result = await queryOne<User>(
    'INSERT INTO users (email, username) VALUES ($1, $2) RETURNING *',
    [data.email, data.username || null]
  );

  if (!result) {
    throw new Error('Failed to create user');
  }

  return result;
};
```

**Aggregate Functions**:
```typescript
export const count = async (): Promise<number> => {
  const result = await queryOne<{ count: string }>(
    'SELECT COUNT(*) as count FROM users'
  );

  return result ? parseInt(result.count, 10) : 0;
};
```

### Dynamic Query Building

**Extract to pure functions:**

```typescript
// ❌ BAD: Imperative, mutable
export const update = async (id: number, data: Partial<User>) => {
  const fields: string[] = [];
  const values: any[] = [];
  let paramIndex = 1;  // ← Mutable!

  if (data.email !== undefined) {
    fields.push(`email = $${paramIndex++}`);
    values.push(data.email);
  }
  // ...
};

// ✅ GOOD: Functional, extracted
const buildUpdateQuery = (id: number, data: Partial<User>) => {
  const updates = Object.entries(data)
    .filter(([_, value]) => value !== undefined)
    .map(([key, value], index) => ({
      field: `${key} = $${index + 1}`,
      value,
    }));

  return {
    sql: `UPDATE users SET ${updates.map(u => u.field).join(', ')} WHERE id = $${updates.length + 1}`,
    params: [...updates.map(u => u.value), id],
  };
};

export const update = async (id: number, data: Partial<User>) => {
  const { sql, params } = buildUpdateQuery(id, data);
  const result = await queryOne<User>(sql, params);

  if (!result) {
    throw new Error(`User with id ${id} not found`);
  }

  return result;
};
```

---

## 🔐 Authentication & Authorization Patterns

### Route Protection

**API Routes** (Pages Router):

```typescript
import { withAuth, withAdmin, withSuperAdmin } from '@/lib/auth-middleware';

// Any authenticated user
export default withAuth(async (req, res) => {
  const session = (req as any).session;
  res.json({ userId: session.user.id });
});

// Admin or superadmin only
export default withAdmin(async (req, res) => {
  res.json({ message: 'Admin access' });
});

// Superadmin only
export default withSuperAdmin(async (req, res) => {
  res.json({ message: 'Superadmin access' });
});

// Custom role requirements
export default withRole(['admin', 'superadmin'], async (req, res) => {
  res.json({ message: 'Admin access' });
});
```

**Server Components** (App Router - future):

```typescript
import { requireAuth, requireRole } from '@/auth';

export default async function ProtectedPage() {
  await requireAuth(); // Throws if not authenticated
  return <div>Protected content</div>;
}

export default async function AdminPage() {
  await requireRole(['admin', 'superadmin']); // Throws if insufficient permissions
  return <div>Admin content</div>;
}
```

### Resource Ownership

```typescript
import { canAccessResource } from '@/lib/auth-middleware';

const contentPack = await contentPacks.findById(packId);

// Check if user owns resource OR has admin role
if (!canAccessResource(
  session.user.id,
  contentPack.created_by,
  session.user.role,
  ['admin', 'superadmin']
)) {
  return res.status(403).json({ error: 'Forbidden' });
}
```

### Password Management

```typescript
import { hashPassword, verifyPassword } from '@/db/auth';

// Creating user with password
const user = await users.create({
  email: 'user@example.com',
  password_hash: await hashPassword('plainPassword'),
  role: 'student',
});

// Verifying password
const isValid = await verifyPassword('plainPassword', user.password_hash);
```

### Audit Logging

```typescript
import { logAuthEvent } from '@/db/auth';

// Log successful login
await logAuthEvent({
  user_id: user.id,
  event_type: 'login',
  ip_address: req.headers['x-forwarded-for'] as string,
  user_agent: req.headers['user-agent'],
  metadata: { method: 'credentials' },
});

// Log failed login
await logAuthEvent({
  event_type: 'failed_login',
  ip_address: req.headers['x-forwarded-for'] as string,
  user_agent: req.headers['user-agent'],
  metadata: { email, reason: 'invalid_password' },
});

// Log role change
await logAuthEvent({
  user_id: userId,
  event_type: 'role_change',
  metadata: { old_role: 'student', new_role: 'admin' },
});
```

---

## 🚫 Anti-Patterns to Avoid

### 1. Mutable State

```typescript
// ❌ BAD
let count = 0;
users.forEach(user => {
  count += user.posts;
});

// ✅ GOOD
const count = users.reduce((sum, user) => sum + user.posts, 0);
```

### 2. Object Mutation

```typescript
// ❌ BAD
const updateUser = (user: User, data: Partial<User>) => {
  Object.assign(user, data); // Mutation!
  return user;
};

// ✅ GOOD
const updateUser = (user: User, data: Partial<User>): User => {
  return { ...user, ...data }; // Immutable update
};
```

### 3. Type Assertions Without Validation

```typescript
// ❌ BAD
const email = credentials.email as string; // No validation!

// ✅ GOOD
const validateEmail = (email: unknown): string | null => {
  if (typeof email !== 'string') return null;
  const trimmed = email.trim().toLowerCase();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(trimmed) ? trimmed : null;
};

const email = validateEmail(credentials.email);
if (!email) {
  throw new Error('Invalid email');
}
```

### 4. Mixing Pure and Impure

```typescript
// ❌ BAD - I/O mixed with business logic
export const processUser = async (data: UserData) => {
  const validated = validateUserData(data);
  const user = await createUser(validated); // ← Database I/O
  const formatted = formatUserForResponse(user);
  return formatted;
};

// ✅ GOOD - Separated
// users-pure.ts
export const validateUserData = (data: UserData) => { /* ... */ };
export const formatUserForResponse = (user: User) => { /* ... */ };

// users.ts
export const processUser = async (data: UserData) => {
  const validated = validateUserData(data);
  const user = await createUser(validated);
  return formatUserForResponse(user);
};
```

### 5. Shared Test State

```typescript
// ❌ BAD - Tests share mutable state
describe('Users', () => {
  let testUser: User;

  beforeAll(async () => {
    testUser = await users.create({ ... }); // All tests depend on this
  });

  it('should update user', async () => {
    await users.update(testUser.id, { ... }); // Modifies shared state!
  });
});

// ✅ GOOD - Each test creates own data
describe('Users', () => {
  it('given valid data, update() persists changes', async () => {
    await withTransaction(async () => {
      const user = await users.create({ email: generateEmail() });
      const updated = await users.update(user.id, { username: 'new' });
      assert.equal(updated.username, 'new');
      // ✅ Transaction rolls back - no cleanup needed
    });
  });
});
```

---

## 📊 Code Organization

### Directory Structure

```
src/
├── db/                          # Database layer
│   ├── connection.ts            # Connection pool
│   ├── types.ts                 # Backend-only types
│   ├── users.ts                 # Users DAL (I/O)
│   ├── users-pure.ts            # Pure user functions
│   ├── auth.ts                  # Auth DAL (I/O)
│   ├── auth-pure.ts             # Pure auth functions
│   └── __tests__/
│       ├── helpers/
│       │   ├── transactions.ts  # Transaction helpers
│       │   ├── factories.ts     # Test data factories
│       │   └── cleanup.ts       # Cleanup utilities
│       ├── users.int.test.ts    # Integration tests
│       └── users-pure.unit.test.ts # Unit tests
├── lib/                         # Shared utilities
│   ├── auth-middleware.ts       # Route protection
│   └── validators-pure.ts       # Input validation
├── pages/
│   └── api/                     # API routes
│       └── auth/
│           └── [...nextauth].ts # NextAuth handler
└── auth.ts                      # NextAuth config
```

---

## 🎨 TypeScript Patterns

### Type Definitions

```typescript
// Backend types (never share with frontend)
export type UserRole = 'student' | 'admin' | 'superadmin';

export interface User {
  id: number;
  email: string;
  username: string | null;
  role: UserRole;
  created_at: Date;
  updated_at: Date;
}

export interface NewUser {
  email: string;
  username?: string;
  role?: UserRole;
}

// Omit auto-generated fields
export type UpdateUser = Partial<Omit<User, 'id' | 'created_at' | 'updated_at'>>;
```

### Discriminated Unions for Errors

```typescript
export type AuthError =
  | { type: 'INVALID_CREDENTIALS'; email: string }
  | { type: 'USER_NOT_FOUND'; email: string }
  | { type: 'ACCOUNT_LOCKED'; userId: number; until: Date }
  | { type: 'EMAIL_NOT_VERIFIED'; userId: number };

const handleAuthError = (error: AuthError) => {
  switch (error.type) {
    case 'INVALID_CREDENTIALS':
      return `Invalid credentials for ${error.email}`;
    case 'USER_NOT_FOUND':
      return `User ${error.email} not found`;
    case 'ACCOUNT_LOCKED':
      return `Account locked until ${error.until}`;
    case 'EMAIL_NOT_VERIFIED':
      return 'Please verify your email';
  }
};
```

---

## 🔄 Composition Patterns

### Higher-Order Functions

```typescript
// Compose multiple middleware
const withAuthAndRole = (role: UserRole) => (handler: ApiHandler) => {
  return withAuth(withRole(role, handler));
};

// Use it
export default withAuthAndRole('admin')(async (req, res) => {
  res.json({ message: 'Admin access' });
});
```

### Function Composition

```typescript
// Compose pure functions
const compose = <T>(...fns: Array<(arg: T) => T>) =>
  (value: T) => fns.reduceRight((acc, fn) => fn(acc), value);

const processUserData = compose(
  validateUserData,
  normalizeUserData,
  enrichUserData
);

const result = processUserData(rawData);
```

---

## 📝 Documentation Standards

### Function Documentation

```typescript
/**
 * Find a user by ID
 *
 * @param id - User ID
 * @returns User object or null if not found
 *
 * @example
 * const user = await users.findById(1);
 * if (user) {
 *   console.log(user.email);
 * }
 */
export const findById = async (id: number): Promise<User | null> => {
  return queryOne<User>('SELECT * FROM users WHERE id = $1', [id]);
};
```

### File Headers

```typescript
/**
 * Users Data Access Layer (DAL)
 *
 * Functional-style data access for user management.
 * All functions are pure (input → output) with no side effects beyond database operations.
 *
 * NO MOCKS - Designed for integration testing against real PostgreSQL database.
 */
```

---

## ✅ Checklist for New Features

Before committing new code, ensure:

- [ ] Pure functions extracted to `*-pure.ts` files
- [ ] Unit tests written for pure functions
- [ ] Integration tests written for I/O functions
- [ ] Test names use "given/when/then" format
- [ ] No `let` or `var` declarations
- [ ] No object mutations
- [ ] No `any` types (except at boundaries)
- [ ] No type assertions without validation
- [ ] Functions documented with JSDoc
- [ ] Error cases handled with typed errors
- [ ] Audit logging added (if auth-related)

---

## 📚 Reference

- **RITEway Testing**: `docs/test-review-riteway.md`
- **Code Review**: `docs/eric-elliott-code-review.md`
- **Test Refactoring**: `docs/test-refactor-example.md`
- **NextAuth Patterns**: `docs/nextauth-implementation-summary.md`

---

*These standards evolve with the project. Update this document when establishing new patterns.*
