# Test Review: RITEway Style Analysis

## Eric Elliott's RITEway Principles

**R**eadable - Tests should read like requirements
**I**solated - Tests should not share state or depend on each other
**T**horough - Cover all requirements and edge cases
**E**xplicit - Clear about what's being tested and why

## Current Test Analysis

### ✅ What We're Doing Well

#### 1. NO MOCKS Philosophy ✅
```typescript
// EXCELLENT: Testing against real database
const sub = await contentPacks.subscribe(testUser1.id, pack.id);

// PROOF: Verify in REAL database
const dbResult = await query<UserPackSubscription>(
  'SELECT * FROM user_pack_subscriptions WHERE id = $1',
  [sub.id]
);
expect(dbResult.rows).toHaveLength(1);
```

**Why this is good (Eric Elliott):**
- Tests the real integration point
- Catches actual database issues
- More confidence than mocked tests

#### 2. Explicit Error Testing ✅
```typescript
it('should REJECT duplicate email (database constraint)', async () => {
  await users.create({ email: 'duplicate@example.com', username: 'user1' });

  await expect(
    users.create({ email: 'duplicate@example.com', username: 'user2' })
  ).rejects.toThrow();
});
```

**Why this is good:**
- Tests the actual requirement (uniqueness)
- Clear about what should happen (REJECT)

---

### ⚠️ Areas for Improvement

#### 1. **Shared State Between Tests** (Violates Isolation)

**Current Problem:**
```typescript
describe('ContentPacks DAL', () => {
  let testUser1: User;  // ❌ Shared mutable state
  let testUser2: User;  // ❌ Shared mutable state

  beforeAll(async () => {
    testUser1 = await users.create({...}); // All tests depend on this
    testUser2 = await users.create({...});
  });

  it('should subscribe user to pack', async () => {
    const pack = await contentPacks.create({
      created_by: testUser1.id, // ❌ Depends on shared state
    });
  });
});
```

**RITEway Approach:**
```typescript
// ✅ Each test is completely independent
describe('ContentPacks DAL', () => {

  // Helper function to create test user (pure function)
  const createTestUser = () => users.create({
    email: generateEmail(),
    username: generateUsername(),
  });

  it('given valid user and pack data, subscribe() returns subscription with user_id and content_pack_id', async () => {
    // ✅ Create all data needed for THIS test only
    const user = await createTestUser();
    const pack = await contentPacks.create({
      name: 'Test Pack',
      description: 'Test',
      created_by: user.id,
    });

    const result = await contentPacks.subscribe(user.id, pack.id);

    // ✅ Single focused assertion
    assert.equal(result.user_id, user.id);
    assert.equal(result.content_pack_id, pack.id);
    assert.equal(result.expires_at, null);
  });
});
```

**Benefits:**
- Tests can run in any order
- No hidden dependencies
- Easier to understand what each test needs

#### 2. **Test Names Could Be More Explicit** (Violates Readable/Explicit)

**Current:**
```typescript
it('should create a content pack', async () => {
  // What specifically should it do? What's the requirement?
});
```

**RITEway Style:**
```typescript
it('given valid name, description, and creator, create() returns content pack with id and created_at timestamp', async () => {
  // Name specifies: input (given), function (create), output (returns...)
});

it('given non-existent creator id, create() throws foreign key constraint error', async () => {
  // Explicit about the failure case
});
```

**Format:** `given [input], [function]() [returns/throws] [specific output]`

#### 3. **Multiple Assertions Per Test** (Violates Isolation)

**Current:**
```typescript
it('should create a user with email and username', async () => {
  const newUser = await users.create({...});

  expect(newUser.id).toBeDefined();           // Testing id generation
  expect(newUser.email).toBe('test@...');     // Testing email storage
  expect(newUser.username).toBe('testuser');  // Testing username storage
  expect(newUser.created_at).toBeInstanceOf(Date); // Testing timestamp

  // PROOF: Verify in database
  const dbResult = await query(...);
  expect(dbResult.rows).toHaveLength(1);      // Testing insertion
  expect(dbResult.rows[0].email).toBe('test@...'); // Testing persistence
});
```

**RITEway Approach - Split into focused tests:**
```typescript
it('given valid email and username, create() returns user with auto-generated id', async () => {
  const result = await users.create({
    email: 'test@example.com',
    username: 'testuser'
  });

  assert.ok(Number.isInteger(result.id) && result.id > 0);
});

it('given valid email, create() persists email to database unchanged', async () => {
  const email = 'test@example.com';
  const result = await users.create({ email, username: 'test' });

  const dbUser = await users.findById(result.id);
  assert.equal(dbUser.email, email);
});

it('given valid email and username, create() sets created_at to current timestamp', async () => {
  const before = new Date();
  const result = await users.create({
    email: 'test@example.com',
    username: 'test'
  });
  const after = new Date();

  assert.ok(result.created_at >= before && result.created_at <= after);
});
```

**Benefits:**
- Each test has one job
- Failures pinpoint exact issue
- Tests are more maintainable

#### 4. **Complex Setup/Teardown** (Violates Simplicity)

**Current:**
```typescript
afterEach(async () => {
  await query('DELETE FROM user_pack_subscriptions');
  await query('DELETE FROM content_packs');
});
```

**RITEway Approach:**
```typescript
// Option 1: Transaction rollback (cleanest for integration tests)
it('given...', async () => {
  await transaction(async () => {
    // All database operations in here
    const user = await users.create({...});
    const pack = await contentPacks.create({...});

    const result = await contentPacks.subscribe(user.id, pack.id);

    assert.equal(result.user_id, user.id);
    // Transaction automatically rolls back after test
  });
});

// Option 2: Test-specific cleanup
it('given...', async () => {
  const user = await users.create({...});
  const pack = await contentPacks.create({...});

  try {
    const result = await contentPacks.subscribe(user.id, pack.id);
    assert.equal(result.user_id, user.id);
  } finally {
    // Clean up only what THIS test created
    await contentPacks.remove(pack.id); // CASCADE deletes subscription
    await users.remove(user.id);
  }
});
```

#### 5. **Testing Side Effects vs Pure Functions** (Missing Separation)

**Current - All integration:**
```typescript
// We're only testing the full integration
it('should update username', async () => {
  const user = await users.create({...});
  const updated = await users.update(user.id, { username: 'new' });
  expect(updated.username).toBe('new');
});
```

**RITEway - Separate pure logic from side effects:**

```typescript
// src/db/users-pure.ts - Pure functions (EASY TO TEST)
export const buildUpdateQuery = (
  id: number,
  data: Partial<User>
): { sql: string; params: any[] } => {
  const fields: string[] = [];
  const values: any[] = [];
  let paramIndex = 1;

  if (data.email !== undefined) {
    fields.push(`email = $${paramIndex++}`);
    values.push(data.email);
  }

  if (data.username !== undefined) {
    fields.push(`username = $${paramIndex++}`);
    values.push(data.username);
  }

  fields.push(`updated_at = CURRENT_TIMESTAMP`);
  values.push(id);

  return {
    sql: `UPDATE users SET ${fields.join(', ')} WHERE id = $${paramIndex} RETURNING *`,
    params: values
  };
};

// PURE FUNCTION TESTS (Fast, no database needed)
describe('buildUpdateQuery()', () => {
  it('given email update, returns SQL with email parameter', () => {
    const result = buildUpdateQuery(1, { email: 'new@example.com' });

    assert.equal(result.sql, 'UPDATE users SET email = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *');
    assert.deepEqual(result.params, ['new@example.com', 1]);
  });

  it('given email and username, returns SQL with both parameters in correct order', () => {
    const result = buildUpdateQuery(1, {
      email: 'new@example.com',
      username: 'newname'
    });

    assert.equal(
      result.sql,
      'UPDATE users SET email = $1, username = $2, updated_at = CURRENT_TIMESTAMP WHERE id = $3 RETURNING *'
    );
    assert.deepEqual(result.params, ['new@example.com', 'newname', 1]);
  });
});

// INTEGRATION TESTS (Fewer, focused on side effects)
describe('users.update() - integration', () => {
  it('given valid id and email, update() persists email change to database', async () => {
    const user = await users.create({ email: 'old@example.com' });

    await users.update(user.id, { email: 'new@example.com' });

    const updated = await users.findById(user.id);
    assert.equal(updated.email, 'new@example.com');
  });
});
```

---

## Recommended Refactoring Plan

### Phase 1: Extract Pure Functions

Create `*-pure.ts` files with pure business logic:

```typescript
// src/db/validation-pure.ts
export const validateHierarchy = (
  parentType: KnowledgeType | null,
  childType: KnowledgeType
): boolean => {
  const HIERARCHY_RULES: Record<KnowledgeType, KnowledgeType[]> = {
    topic: ['topic', 'category'],
    category: ['attribute'],
    attribute: ['fact'],
    fact: [],
  };

  if (parentType === null) return childType === 'topic';
  return HIERARCHY_RULES[parentType].includes(childType);
};

// FAST UNIT TEST - No database needed!
describe('validateHierarchy()', () => {
  it('given null parent and topic child, returns true', () => {
    assert.equal(validateHierarchy(null, 'topic'), true);
  });

  it('given null parent and category child, returns false', () => {
    assert.equal(validateHierarchy(null, 'category'), false);
  });

  it('given topic parent and category child, returns true', () => {
    assert.equal(validateHierarchy('topic', 'category'), true);
  });

  it('given topic parent and fact child, returns false', () => {
    assert.equal(validateHierarchy('topic', 'fact'), false);
  });
});
```

### Phase 2: Improve Test Names

Use the format: `given [input], [function] [returns/throws] [output]`

```typescript
// ❌ Before
it('should create a topic at root level', ...)

// ✅ After
it('given null parent_id and type=topic, create() returns knowledge node with parent_id=null', ...)

// ❌ Before
it('should REJECT category without topic parent', ...)

// ✅ After
it('given null parent_id and type=category, create() throws hierarchy validation error', ...)
```

### Phase 3: Remove Shared State

```typescript
// ❌ Before
let testUser1: User;
let testUser2: User;

beforeAll(async () => {
  testUser1 = await users.create({...});
  testUser2 = await users.create({...});
});

// ✅ After
const createTestUser = async (overrides = {}) => {
  return users.create({
    email: generateEmail(),
    username: generateUsername(),
    ...overrides
  });
};

it('given...', async () => {
  const user = await createTestUser();
  // Use user...
});
```

### Phase 4: Use Transactions for Cleanup

```typescript
// Add transaction support to test helpers
export const withRollback = async <T>(
  callback: () => Promise<T>
): Promise<T> => {
  const client = await getPool().connect();
  try {
    await client.query('BEGIN');
    const result = await callback();
    await client.query('ROLLBACK');
    return result;
  } finally {
    client.release();
  }
};

// Use in tests
it('given valid user, create() returns user with id', async () => {
  await withRollback(async () => {
    const result = await users.create({
      email: 'test@example.com',
      username: 'test'
    });

    assert.ok(result.id > 0);
  });
  // Automatic cleanup via rollback!
});
```

---

## Summary: Current State vs RITEway

| Principle | Current | RITEway Target |
|-----------|---------|----------------|
| **Readable** | ⚠️ Some test names unclear | ✅ Use "given/when/then" format |
| **Isolated** | ❌ Tests share state (beforeAll) | ✅ Each test creates own data |
| **Thorough** | ✅ Good coverage (75 tests) | ✅ Maintain coverage |
| **Explicit** | ⚠️ Multiple assertions per test | ✅ One assertion per test |
| **NO MOCKS** | ✅ Excellent! | ✅ Keep this! |
| **Pure Functions** | ❌ Not tested separately | ✅ Extract and test |

---

## Action Items

1. **Keep:** NO MOCKS approach - this is excellent
2. **Add:** Pure function tests (fast, no database)
3. **Improve:** Test names to be more explicit
4. **Refactor:** Remove shared state between tests
5. **Consider:** Transaction-based cleanup
6. **Split:** One assertion per test (for critical paths)

The current tests are **good** - they prove the integration works. To make them **RITEway**, we need to:
- Extract and test pure functions separately
- Make tests more independent
- Use more explicit names
- Reduce assertions per test

**Priority:** High value, but not urgent. The current tests provide good confidence. Refactor incrementally as we add features.
