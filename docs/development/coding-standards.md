# Nuquiz Coding Standards & Patterns

**Last Updated**: 2025-10-22 (Post AI-Slop Refactoring)

These standards capture the architectural decisions and patterns used in Nuquiz.
**Pragmatic over dogmatic** - use libraries, keep it simple, stay maintainable.

---

## 🎯 Core Principles

### 1. Libraries Over Custom Code
- **Use battle-tested libraries** (Zod, zxcvbn, Kysely)
- Don't reinvent: validation, password strength, query building
- Prefer 100k+ star libraries over custom implementations

### 2. Simple Over Clever
- **Readable code** > "functional purity"
- Inline simple logic, don't over-abstract
- No verbose JSDoc that just repeats the code

### 3. No Mocks Philosophy
- Test against **real database**
- Integration tests prove real behavior
- Unit tests for **business logic only**

### 4. Type Safety
- Use **Zod** for runtime validation
- TypeScript strict mode
- No `any` types except at necessary boundaries

### 5. Separation of Concerns
- Pure business logic separated from I/O
- Frontend and backend types **never shared**
- Keep functions focused and single-purpose

---

## 📦 Dependencies

### Validation
✅ **Use Zod** for all input validation
```typescript
import { z } from 'zod';

const userSchema = z.object({
  email: z.string().email().toLowerCase(),
  password: z.string().min(8),
});
```

### Password Strength
✅ **Use zxcvbn** (Dropbox's library)
```typescript
import zxcvbn from 'zxcvbn';

const result = zxcvbn(password);
// result.score: 0-4
// result.feedback: { warning, suggestions }
```

### Database Queries
✅ **Use Kysely** for type-safe queries (when migrating from raw SQL)
```typescript
import { db } from './kysely';

const users = await db
  .selectFrom('users')
  .where('email', '=', email)
  .selectAll()
  .execute();
```

### Errors
✅ **Use simple AppError class**
```typescript
throw new AppError('User not found', 404, { userId: 123 });
```

❌ **Don't** create custom error hierarchies or factory methods

---

## 📁 File Naming Conventions

```
*.int.test.ts    - Integration tests (database, API)
*.unit.test.ts   - Pure unit tests (no I/O)
*.api.test.ts    - API endpoint tests
*-pure.ts        - Pure functions (use sparingly!)
```

**When to create *-pure.ts files:**
- ✅ Complex business logic (e.g., knowledge-pure.ts for hierarchy rules)
- ✅ Logic reused in multiple places
- ❌ Simple helpers (just inline them)
- ❌ Wrappers around libraries (use the library directly)

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

### What to Test

**Unit Tests** (fast, no I/O):
- Business logic
- Data transformations
- Validation schemas (basic cases)
- Password strength checks (using zxcvbn)

**Integration Tests** (real database):
- Database operations
- Query results
- Data integrity
- Foreign key constraints

**Don't Test**:
- ❌ Library internals (Zod, zxcvbn already tested)
- ❌ TypeScript types (compiler checks this)
- ❌ Framework behavior (Next.js, NextAuth tested)

---

## 🔒 Security Standards

### Input Validation

**Always validate at boundaries** (API routes, form handlers):
```typescript
import { credentialsSchema } from '@/lib/schemas';

// In API route
const result = credentialsSchema.safeParse(req.body);
if (!result.success) {
  return res.status(400).json({ errors: result.error.issues });
}

const { email, password } = result.data; // Type-safe!
```

### SQL Injection Prevention

**Use parameterized queries or Kysely:**
```typescript
// ✅ GOOD: Parameterized
await query('SELECT * FROM users WHERE email = $1', [email]);

// ✅ GOOD: Kysely (type-safe)
await db.selectFrom('users').where('email', '=', email).execute();

// ❌ NEVER: String interpolation
await query(`SELECT * FROM users WHERE email = '${email}'`);
```

### Password Handling

```typescript
import { checkPasswordStrength } from '@/db/auth-pure';
import { hashPassword, verifyPassword } from '@/db/auth';

// Check strength (using zxcvbn)
const strength = checkPasswordStrength(password);
if (strength.score < 2) {
  // Warn user
}

// Hash before storing
const hash = await hashPassword(password); // bcrypt, 12 rounds

// Verify on login
const valid = await verifyPassword(password, user.password_hash);
```

### Authentication

**Use NextAuth middleware helpers:**
```typescript
import { withAuth, withAdmin, withSuperAdmin } from '@/lib/auth-middleware';

// Protect route
export default withAuth(async (req, res) => {
  // req.session is typed and guaranteed
  const userId = req.session.user.id;
  // ...
});

// Require admin
export default withAdmin(async (req, res) => {
  // Only admins/superadmins can access
});
```

---

## 🎨 Code Style

### Functions

**Keep functions small and focused:**
```typescript
// ✅ GOOD: Simple, clear
export const getUserById = async (id: number): Promise<User | null> => {
  return db.selectFrom('users').where('id', '=', id).executeTakeFirst();
};

// ❌ BAD: Too many responsibilities
export const getUserByIdAndCheckPermissionsAndLogAccess = async (...) => {
  // 50 lines of code
};
```

### Avoid Over-Abstraction

```typescript
// ❌ BAD: Over-abstracted
export const buildFailedLoginEvent = (reason, email, ip, ua) => {
  return buildAuthEvent('failed_login', undefined, ip, ua, {
    reason,
    ...(email && { email }),
  });
};

// ✅ GOOD: Just create the object
const event = {
  event_type: 'failed_login',
  ip_address: getIpAddress(req),
  user_agent: getUserAgent(req),
  metadata: { reason: 'invalid_credentials', email },
};
```

### DRY vs WET

**Don't Repeat Yourself... unless copying is simpler:**
```typescript
// ✅ OK to "repeat" if it's clearer
const ip = req.headers['x-forwarded-for']?.split(',')[0]?.trim() || req.socket.remoteAddress;

// vs creating extractIpAddress() helper used once
```

---

## 🚫 Anti-Patterns to Avoid

### 1. Custom Validation
❌ Don't write regex validators
✅ Use Zod

### 2. Custom Error Hierarchies
❌ Don't create 8 error classes with factory methods
✅ Use one AppError class

### 3. Over-Engineering Immutability
❌ Don't use `Object.assign(Object.create(Object.getPrototypeOf(obj)), ...)`
✅ Use spread operator: `{ ...obj, newField }`

### 4. Verbose JSDoc
❌ Don't write 10-line comments that repeat the code
✅ Write clear function names and use TypeScript types

### 5. Reinventing Libraries
❌ Don't implement password strength, rate limiting, etc.
✅ Use zxcvbn, rate-limiter-flexible, etc.

---

## 📚 Reference Documentation

- **AI Slop Review**: `docs/code-review-ai-slop.md`
- **Initial Review**: `docs/eric-elliott-code-review.md` (historical)
- **Testing Guide**: `docs/test-review-riteway.md`
- **Database Guide**: `docs/database-testing-guide.md`

---

## ✅ Checklist Before Merging

- [ ] Tests passing (`npm test`)
- [ ] Input validated with Zod
- [ ] No SQL injection risks (parameterized queries)
- [ ] No custom validators (use Zod)
- [ ] No password strength calculation (use zxcvbn)
- [ ] Errors use AppError class
- [ ] Code is simple and readable
- [ ] No over-abstraction
- [ ] Line count is reasonable

**Remember**: Simple, maintainable code > clever, "functional" code
