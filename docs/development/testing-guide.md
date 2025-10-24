# Nuquiz Testing Guide

**Philosophy**: No mocks. Real integration tests. Prove actual behavior.

This guide explains how to write tests for Nuquiz following our strict "no mocks" philosophy and RITEway principles.

---

## Core Principles

### 🚨 CRITICAL RULE: NO MOCKS

**Mocks are a code smell.** They test your mocks, not your code.

**Instead, we use**:
- Real PostgreSQL test database
- Actual database connections
- Real test data via factories
- Integration tests that prove real behavior

**Why no mocks?**
- ✅ Catch real issues (connection problems, SQL errors, constraint violations)
- ✅ Tests don't break when refactoring internal implementation
- ✅ Confidence that code actually works in production
- ✅ Faster feedback than manual testing

---

## Test Types

### Integration Tests (`*.int.test.ts`)

**Purpose**: Test code that interacts with external systems (database, file system, network)

**Requires**: Test database running (docker-compose)

**Example**:
```typescript
// src/db/__tests__/users.int.test.ts
import { describe, test, expect, beforeEach, afterEach } from '@jest/globals';
import { query } from '@/db/connection';
import { findByEmail } from '@/db/users';

describe('users.findByEmail()', () => {
  let testUserId: number;

  beforeEach(async () => {
    const result = await query(
      'INSERT INTO users (email, password_hash, role) VALUES ($1, $2, $3) RETURNING id',
      ['test@example.com', 'hash123', 'student']
    );
    testUserId = result.rows[0].id;
  });

  afterEach(async () => {
    await query('DELETE FROM users WHERE id = $1', [testUserId]);
  });

  test('should find user by email', async () => {
    const user = await findByEmail('test@example.com');

    expect(user).not.toBeNull();
    expect(user?.email).toBe('test@example.com');
    expect(user?.role).toBe('student');
  });

  test('should return null for non-existent email', async () => {
    const user = await findByEmail('nonexistent@example.com');

    expect(user).toBeNull();
  });
});
```

**Run with**: `npm run test:int`

---

### Unit Tests (`*.unit.test.ts`)

**Purpose**: Test pure functions with no I/O

**Requires**: Nothing - pure functions only

**Example**:
```typescript
// src/db/__tests__/users-pure.unit.test.ts
import { describe, test, expect } from '@jest/globals';
import { validatePassword } from '@/db/users-pure';

describe('validatePassword()', () => {
  test('should return true for valid password', () => {
    const result = validatePassword('ValidPass123');

    expect(result).toBe(true);
  });

  test('should return false for password without uppercase', () => {
    const result = validatePassword('invalid123');

    expect(result).toBe(false);
  });

  test('should return false for password without number', () => {
    const result = validatePassword('InvalidPassword');

    expect(result).toBe(false);
  });
});
```

**Run with**: `npm run test:unit`

---

### API Tests (`*.api.test.ts`)

**Purpose**: Test API endpoints using node-mocks-http

**Requires**: Test database running

**Does NOT require**: Dev server running (uses direct handler calls)

**Example**:
```typescript
// src/pages/api/__tests__/content-packs.api.test.ts
import { describe, test, expect, beforeEach, afterEach } from '@jest/globals';
import { createMocks } from 'node-mocks-http';
import handler from '@/pages/api/content-packs/index';
import { query } from '@/db/connection';
import { createMockSession } from '@/__tests__/helpers/auth-test-helpers';

describe('GET /api/content-packs', () => {
  let testUserId: number;
  let testPackId: number;

  beforeEach(async () => {
    // Create test data
    const userResult = await query(
      'INSERT INTO users (email, password_hash, role) VALUES ($1, $2, $3) RETURNING id',
      ['test@test.com', 'hash', 'student']
    );
    testUserId = userResult.rows[0].id;

    const packResult = await query(
      'INSERT INTO content_packs (name, description, is_active, created_by) VALUES ($1, $2, $3, $4) RETURNING id',
      ['Test Pack', 'Description', true, testUserId]
    );
    testPackId = packResult.rows[0].id;
  });

  afterEach(async () => {
    await query('DELETE FROM content_packs WHERE id = $1', [testPackId]);
    await query('DELETE FROM users WHERE id = $1', [testUserId]);
  });

  test('should return active content packs', async () => {
    const { req, res } = createMocks({
      method: 'GET',
    });

    // Add mock session
    req.session = createMockSession(testUserId, 'student');

    await handler(req, res);

    expect(res._getStatusCode()).toBe(200);
    const data = JSON.parse(res._getData());
    expect(data.data).toHaveLength(1);
    expect(data.data[0].name).toBe('Test Pack');
  });
});
```

**Run with**: `npm run test:api`

---

## RITEway Principles

**RITE** = **R**eadable, **I**solated, **T**horough, **E**xplicit

### 1. Readable

**Bad**:
```typescript
test('works', async () => {
  const u = await f('test@test.com');
  expect(u.e).toBe('test@test.com');
});
```

**Good**:
```typescript
test('should find user by email', async () => {
  const user = await findByEmail('test@test.com');

  expect(user?.email).toBe('test@test.com');
});
```

**Rules**:
- Test name describes what should happen
- Variable names are clear and meaningful
- No cryptic abbreviations

---

### 2. Isolated

**Bad**:
```typescript
// Tests depend on each other
let userId: number;

test('creates user', async () => {
  userId = await createUser(...);
});

test('finds user', async () => {
  const user = await findUser(userId); // Fails if first test fails
});
```

**Good**:
```typescript
describe('user operations', () => {
  let testUserId: number;

  beforeEach(async () => {
    // Each test gets fresh data
    const result = await query('INSERT INTO users ...');
    testUserId = result.rows[0].id;
  });

  afterEach(async () => {
    await query('DELETE FROM users WHERE id = $1', [testUserId]);
  });

  test('should find user by ID', async () => {
    const user = await findUser(testUserId);
    expect(user).not.toBeNull();
  });

  test('should update user email', async () => {
    await updateUser(testUserId, { email: 'new@test.com' });
    const user = await findUser(testUserId);
    expect(user?.email).toBe('new@test.com');
  });
});
```

**Rules**:
- Each test can run independently
- Use `beforeEach` to set up fresh data
- Use `afterEach` to clean up
- Tests can run in any order

---

### 3. Thorough

**Bad**:
```typescript
test('creates user', async () => {
  const user = await createUser({ email: 'test@test.com' });
  expect(user).toBeDefined(); // Only checks existence
});
```

**Good**:
```typescript
test('should create user with correct properties', async () => {
  const email = 'test@test.com';
  const role = 'student';

  const user = await createUser({ email, password: 'pass123', role });

  expect(user.id).toBeGreaterThan(0);
  expect(user.email).toBe(email);
  expect(user.role).toBe(role);
  expect(user.created_at).toBeInstanceOf(Date);
  expect(user.password_hash).not.toBe('pass123'); // Hashed
});
```

**Rules**:
- Test all important properties
- Test edge cases
- Test error conditions
- Test boundary values

---

### 4. Explicit

**Bad**:
```typescript
test('validates', () => {
  expect(validate(input)).toBeTruthy(); // What validates? What's expected?
});
```

**Good**:
```typescript
test('should reject password without uppercase letter', () => {
  const passwordWithoutUppercase = 'lowercase123';

  const result = validatePassword(passwordWithoutUppercase);

  expect(result).toBe(false);
});
```

**Rules**:
- Explicit test names describe expected behavior
- Explicit variable names show what's being tested
- Explicit assertions show what's expected

---

## Test Structure

### Arrange-Act-Assert (AAA)

```typescript
test('should update user email', async () => {
  // ARRANGE - Set up test data
  const userId = 123;
  const newEmail = 'updated@test.com';

  // ACT - Execute the function
  await updateUser(userId, { email: newEmail });

  // ASSERT - Verify the result
  const user = await findUser(userId);
  expect(user?.email).toBe(newEmail);
});
```

### One Assertion Per Test (Guideline)

**Prefer this**:
```typescript
test('should hash password when creating user', async () => {
  const plainPassword = 'password123';
  const user = await createUser({ email: 'test@test.com', password: plainPassword });

  expect(user.password_hash).not.toBe(plainPassword);
});

test('should store email in lowercase', async () => {
  const user = await createUser({ email: 'Test@TEST.com', password: 'pass' });

  expect(user.email).toBe('test@test.com');
});
```

**Over this**:
```typescript
test('creates user correctly', async () => {
  const user = await createUser({ email: 'Test@TEST.com', password: 'password123' });

  expect(user.password_hash).not.toBe('password123');
  expect(user.email).toBe('test@test.com');
  expect(user.role).toBe('student');
  // Too many unrelated assertions
});
```

**Exception**: Related assertions are OK:
```typescript
test('should return paginated results with correct metadata', async () => {
  const result = await getUsers({ page: 1, limit: 10 });

  // These assertions are all about the same concept (pagination)
  expect(result.data).toHaveLength(10);
  expect(result.pagination.page).toBe(1);
  expect(result.pagination.total).toBeGreaterThan(10);
});
```

---

## Database Test Patterns

### Pattern 1: Simple CRUD

```typescript
describe('contentPacks.create()', () => {
  let testUserId: number;

  beforeEach(async () => {
    const result = await query(
      'INSERT INTO users (email, password_hash, role) VALUES ($1, $2, $3) RETURNING id',
      ['admin@test.com', 'hash', 'admin']
    );
    testUserId = result.rows[0].id;
  });

  afterEach(async () => {
    await query('DELETE FROM users WHERE id = $1', [testUserId]);
  });

  test('should create content pack with valid data', async () => {
    const packData = {
      name: 'Test Pack',
      description: 'Test Description',
      created_by: testUserId,
    };

    const pack = await create(packData);

    expect(pack.id).toBeGreaterThan(0);
    expect(pack.name).toBe('Test Pack');
    expect(pack.description).toBe('Test Description');
    expect(pack.created_by).toBe(testUserId);
    expect(pack.is_active).toBe(true); // Default value
  });
});
```

### Pattern 2: Hierarchical Data

```typescript
describe('knowledge hierarchy', () => {
  let topicId: number;
  let categoryId: number;
  let attributeId: number;

  beforeEach(async () => {
    // Build hierarchy bottom-up
    const topic = await query('INSERT INTO knowledge (type, name, label) VALUES ($1, $2, $3) RETURNING id',
      ['topic', 'chf', 'CHF']);
    topicId = topic.rows[0].id;

    const category = await query('INSERT INTO knowledge (type, name, label, parent_id) VALUES ($1, $2, $3, $4) RETURNING id',
      ['category', 'left_sided', 'Left-sided', topicId]);
    categoryId = category.rows[0].id;

    const attribute = await query('INSERT INTO knowledge (type, name, label, parent_id) VALUES ($1, $2, $3, $4) RETURNING id',
      ['attribute', 'symptoms', 'Symptoms', categoryId]);
    attributeId = attribute.rows[0].id;
  });

  afterEach(async () => {
    // CASCADE will delete children
    await query('DELETE FROM knowledge WHERE id = $1', [topicId]);
  });

  test('should retrieve facts for category + attribute path', async () => {
    const facts = await getFactsForPath(categoryId, attributeId);

    expect(facts).toHaveLength(2);
    expect(facts.map(f => f.label)).toContain('Pulmonary edema');
  });
});
```

### Pattern 3: Test Factories

Create reusable test data generators:

```typescript
// src/__tests__/helpers/factories.ts
export async function createTestUser(overrides = {}) {
  const defaults = {
    email: `test${Date.now()}@test.com`,
    password_hash: '$2a$12$test',
    role: 'student',
  };

  const userData = { ...defaults, ...overrides };

  const result = await query(
    'INSERT INTO users (email, password_hash, role) VALUES ($1, $2, $3) RETURNING *',
    [userData.email, userData.password_hash, userData.role]
  );

  return result.rows[0];
}

export async function createTestContentPack(createdBy: number, overrides = {}) {
  const defaults = {
    name: `Test Pack ${Date.now()}`,
    description: 'Test Description',
    is_active: true,
  };

  const packData = { ...defaults, ...overrides };

  const result = await query(
    'INSERT INTO content_packs (name, description, is_active, created_by) VALUES ($1, $2, $3, $4) RETURNING *',
    [packData.name, packData.description, packData.is_active, createdBy]
  );

  return result.rows[0];
}
```

**Usage**:
```typescript
import { createTestUser, createTestContentPack } from '@/__tests__/helpers/factories';

test('should subscribe to content pack', async () => {
  const user = await createTestUser({ role: 'student' });
  const pack = await createTestContentPack(user.id);

  const subscription = await subscribe(user.id, pack.id);

  expect(subscription.user_id).toBe(user.id);
  expect(subscription.content_pack_id).toBe(pack.id);
});
```

---

## Running Tests

### All Tests
```bash
npm test
```

### Specific Test File
```bash
npm test -- users.int.test.ts
```

### Watch Mode
```bash
npm run test:watch
```

### Coverage Report
```bash
npm run test:coverage
```

### Only Integration Tests
```bash
npm run test:int
```

### Only Unit Tests
```bash
npm run test:unit
```

### Only API Tests
```bash
npm run test:api
```

---

## Test Database Setup

### Prerequisites

Docker must be running with test database:

```bash
docker-compose up -d
```

### Running Migrations

```bash
NODE_ENV=test npm run migrate
```

### Seeding Test Data

```bash
npm run db:seed:test
```

### Resetting Test Database

```bash
npm run db:reset
```

---

## Common Testing Patterns

### Testing Error Cases

```typescript
test('should throw AppError for invalid email', async () => {
  const invalidEmail = 'not-an-email';

  await expect(createUser({ email: invalidEmail, password: 'pass123' }))
    .rejects
    .toThrow(AppError);
});

test('should return 400 for invalid email in API', async () => {
  const { req, res } = createMocks({
    method: 'POST',
    body: { email: 'not-an-email', password: 'pass123' },
  });

  await handler(req, res);

  expect(res._getStatusCode()).toBe(400);
  const data = JSON.parse(res._getData());
  expect(data.error).toContain('email');
});
```

### Testing RBAC

```typescript
test('should reject non-admin users', async () => {
  const student = await createTestUser({ role: 'student' });

  const { req, res } = createMocks({
    method: 'POST',
    body: { name: 'New Pack' },
  });

  req.session = createMockSession(student.id, 'student');

  await adminOnlyHandler(req, res);

  expect(res._getStatusCode()).toBe(403);
});

test('should allow admin users', async () => {
  const admin = await createTestUser({ role: 'admin' });

  const { req, res } = createMocks({
    method: 'POST',
    body: { name: 'New Pack' },
  });

  req.session = createMockSession(admin.id, 'admin');

  await adminOnlyHandler(req, res);

  expect(res._getStatusCode()).toBe(201);
});
```

### Testing Database Constraints

```typescript
test('should enforce unique email constraint', async () => {
  const email = 'duplicate@test.com';

  await createUser({ email, password: 'pass1' });

  await expect(createUser({ email, password: 'pass2' }))
    .rejects
    .toThrow(); // PostgreSQL unique constraint error
});

test('should cascade delete subscriptions when pack deleted', async () => {
  const user = await createTestUser();
  const pack = await createTestContentPack(user.id);
  await subscribe(user.id, pack.id);

  await deleteContentPack(pack.id);

  const subscriptions = await query(
    'SELECT * FROM user_pack_subscriptions WHERE content_pack_id = $1',
    [pack.id]
  );
  expect(subscriptions.rows).toHaveLength(0);
});
```

---

## Debugging Tests

### Enable SQL Logging

In `jest.setup.js`:
```javascript
process.env.DEBUG_SQL = 'true';
```

### Focus on One Test

```typescript
test.only('should run only this test', async () => {
  // Debugging this one
});
```

### Skip Tests Temporarily

```typescript
test.skip('should run later', async () => {
  // Skip for now
});
```

---

## Best Practices

### ✅ DO

- Write tests for all database functions
- Write tests for all API endpoints
- Test happy path AND error cases
- Clean up test data in `afterEach`
- Use descriptive test names
- Use factories for complex test data
- Test against real database

### ❌ DON'T

- Use mocks (especially for database)
- Share test data between tests
- Hardcode IDs (use dynamic IDs)
- Skip cleanup (causes test pollution)
- Write tests that depend on order
- Test implementation details
- Commit failing tests

---

## Further Reading

- [RITEway Testing Framework](https://github.com/ericelliott/riteway) - Original framework
- [Eric Elliott on Testing](https://medium.com/javascript-scene/tdd-changed-my-life-5af0ce099f80)
- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [node-mocks-http](https://github.com/howardabrams/node-mocks-http) - For API testing

---

## Summary

**Remember**: Tests are not about coverage percentage. They're about **confidence**.

Writing tests that use real databases and real integrations gives you confidence that your code actually works. Mocks give you false confidence.

**Our goal**: Ship code that works in production, not code that passes mocked tests.
