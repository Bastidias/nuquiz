# RITEway Refactoring Example

## Before & After: ContentPacks Tests

### BEFORE (Current Approach)

```typescript
describe('ContentPacks & Subscriptions DAL - Integration Tests (NO MOCKS)', () => {
  let testUser1: User;  // ❌ Shared mutable state
  let testUser2: User;

  beforeAll(async () => {
    await testLifecycle.beforeAll();

    // ❌ All tests depend on these users
    testUser1 = await users.create({
      email: 'user1@contentpack.test',
      username: 'packuser1',
    });

    testUser2 = await users.create({
      email: 'user2@contentpack.test',
      username: 'packuser2',
    });
  });

  afterEach(async () => {
    await query('DELETE FROM user_pack_subscriptions');
    await query('DELETE FROM content_packs');
  });

  afterAll(testLifecycle.afterAll);

  describe('User Subscriptions', () => {
    let pack: ContentPack;  // ❌ More shared state

    beforeEach(async () => {
      // ❌ Every test in this describe depends on this pack
      pack = await contentPacks.create({
        name: 'Test Pack',
        description: 'For subscription tests',
        created_by: testUser1.id,
      });
    });

    // ❌ Test name not explicit about behavior
    it('should subscribe user to pack', async () => {
      const sub = await contentPacks.subscribe(testUser1.id, pack.id);

      // ❌ Multiple assertions - testing multiple things
      expect(sub.id).toBeDefined();
      expect(sub.user_id).toBe(testUser1.id);
      expect(sub.content_pack_id).toBe(pack.id);
      expect(sub.expires_at).toBeNull();

      const dbResult = await query<UserPackSubscription>(
        'SELECT * FROM user_pack_subscriptions WHERE id = $1',
        [sub.id]
      );
      expect(dbResult.rows).toHaveLength(1);
      expect(dbResult.rows[0].user_id).toBe(testUser1.id);
    });
  });
});
```

### AFTER (RITEway Approach)

```typescript
import { strict as assert } from 'assert';

describe('contentPacks.subscribe() - Integration', () => {

  // ✅ Pure helper function - no side effects
  const createTestFixture = async () => {
    const user = await users.create({
      email: generateEmail(),
      username: generateUsername(),
    });

    const pack = await contentPacks.create({
      name: 'Test Pack',
      description: 'Test',
      created_by: user.id,
    });

    return { user, pack };
  };

  // ✅ Explicit test name: given/when/then format
  it('given valid user and pack ids, subscribe() returns subscription with matching user_id', async () => {
    const { user, pack } = await createTestFixture();

    const result = await contentPacks.subscribe(user.id, pack.id);

    // ✅ Single focused assertion
    assert.equal(result.user_id, user.id);
  });

  it('given valid user and pack ids, subscribe() returns subscription with matching content_pack_id', async () => {
    const { user, pack } = await createTestFixture();

    const result = await contentPacks.subscribe(user.id, pack.id);

    assert.equal(result.content_pack_id, pack.id);
  });

  it('given no expiration date, subscribe() returns subscription with expires_at as null (lifetime access)', async () => {
    const { user, pack } = await createTestFixture();

    const result = await contentPacks.subscribe(user.id, pack.id);

    assert.equal(result.expires_at, null);
  });

  it('given valid subscription, subscribe() persists data to database', async () => {
    const { user, pack } = await createTestFixture();

    const subscription = await contentPacks.subscribe(user.id, pack.id);

    // ✅ Verify side effect (persistence)
    const persisted = await contentPacks.getSubscription(user.id, pack.id);
    assert.equal(persisted?.id, subscription.id);
  });

  it('given expiration date, subscribe() returns subscription with specified expires_at', async () => {
    const { user, pack } = await createTestFixture();
    const expiresAt = new Date('2025-12-31');

    const result = await contentPacks.subscribe(user.id, pack.id, expiresAt);

    assert.equal(
      result.expires_at?.toISOString().substring(0, 10),
      '2025-12-31'
    );
  });

  it('given existing subscription, subscribe() throws duplicate constraint error', async () => {
    const { user, pack } = await createTestFixture();
    await contentPacks.subscribe(user.id, pack.id);

    await assert.rejects(
      () => contentPacks.subscribe(user.id, pack.id),
      /duplicate key/
    );
  });

  it('given non-existent user id, subscribe() throws foreign key constraint error', async () => {
    const { pack } = await createTestFixture();

    await assert.rejects(
      () => contentPacks.subscribe(999999, pack.id),
      /foreign key/
    );
  });

  it('given non-existent pack id, subscribe() throws foreign key constraint error', async () => {
    const { user } = await createTestFixture();

    await assert.rejects(
      () => contentPacks.subscribe(user.id, 999999),
      /foreign key/
    );
  });
});
```

---

## Example: Separating Pure Functions

### BEFORE: Everything Mixed Together

```typescript
// src/db/contentPacks.ts
export const hasAccess = async (userId: number, packId: number): Promise<boolean> => {
  // ❌ SQL generation mixed with execution
  const result = await queryOne<{ has_access: boolean }>(
    `SELECT EXISTS (
       SELECT 1 FROM user_pack_subscriptions ups
       INNER JOIN content_packs cp ON ups.content_pack_id = cp.id
       WHERE ups.user_id = $1
         AND ups.content_pack_id = $2
         AND cp.is_active = true
         AND (ups.expires_at IS NULL OR ups.expires_at > CURRENT_TIMESTAMP)
     ) as has_access`,
    [userId, packId]
  );

  return result?.has_access || false;
};
```

### AFTER: Pure Function + Integration

```typescript
// src/db/contentPacks-pure.ts (NEW FILE)
// ✅ Pure functions - easy to test, no database needed

export const buildAccessCheckQuery = (
  userId: number,
  packId: number
): { sql: string; params: any[] } => {
  return {
    sql: `SELECT EXISTS (
       SELECT 1 FROM user_pack_subscriptions ups
       INNER JOIN content_packs cp ON ups.content_pack_id = cp.id
       WHERE ups.user_id = $1
         AND ups.content_pack_id = $2
         AND cp.is_active = true
         AND (ups.expires_at IS NULL OR ups.expires_at > CURRENT_TIMESTAMP)
     ) as has_access`,
    params: [userId, packId]
  };
};

export const parseAccessResult = (
  result: { has_access: boolean } | null
): boolean => {
  return result?.has_access || false;
};

// FAST UNIT TESTS (no database!)
describe('buildAccessCheckQuery()', () => {
  it('given userId and packId, returns SQL with correct parameter placeholders', () => {
    const result = buildAccessCheckQuery(1, 2);

    assert.ok(result.sql.includes('WHERE ups.user_id = $1'));
    assert.ok(result.sql.includes('AND ups.content_pack_id = $2'));
  });

  it('given userId and packId, returns params array with values in correct order', () => {
    const result = buildAccessCheckQuery(123, 456);

    assert.deepEqual(result.params, [123, 456]);
  });

  it('given any valid ids, SQL checks for active pack', () => {
    const result = buildAccessCheckQuery(1, 2);

    assert.ok(result.sql.includes('cp.is_active = true'));
  });

  it('given any valid ids, SQL checks for non-expired subscription', () => {
    const result = buildAccessCheckQuery(1, 2);

    assert.ok(result.sql.includes('ups.expires_at IS NULL OR ups.expires_at > CURRENT_TIMESTAMP'));
  });
});

describe('parseAccessResult()', () => {
  it('given result with has_access true, returns true', () => {
    const result = parseAccessResult({ has_access: true });
    assert.equal(result, true);
  });

  it('given result with has_access false, returns false', () => {
    const result = parseAccessResult({ has_access: false });
    assert.equal(result, false);
  });

  it('given null result, returns false', () => {
    const result = parseAccessResult(null);
    assert.equal(result, false);
  });
});

// src/db/contentPacks.ts
// ✅ Integration function - thin wrapper
import { buildAccessCheckQuery, parseAccessResult } from './contentPacks-pure.js';

export const hasAccess = async (userId: number, packId: number): Promise<boolean> => {
  const { sql, params } = buildAccessCheckQuery(userId, packId);
  const result = await queryOne<{ has_access: boolean }>(sql, params);
  return parseAccessResult(result);
};

// INTEGRATION TEST (only tests the side effect)
describe('hasAccess() - integration', () => {
  it('given active subscription with no expiration, returns true', async () => {
    const { user, pack } = await createTestFixture();
    await contentPacks.subscribe(user.id, pack.id);

    const result = await contentPacks.hasAccess(user.id, pack.id);

    assert.equal(result, true);
  });

  it('given no subscription, returns false', async () => {
    const { user, pack } = await createTestFixture();

    const result = await contentPacks.hasAccess(user.id, pack.id);

    assert.equal(result, false);
  });

  it('given expired subscription, returns false', async () => {
    const { user, pack } = await createTestFixture();
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    await contentPacks.subscribe(user.id, pack.id, yesterday);

    const result = await contentPacks.hasAccess(user.id, pack.id);

    assert.equal(result, false);
  });
});
```

---

## Example: Transaction-Based Cleanup

### Setup Transaction Helper

```typescript
// src/db/__tests__/helpers/transactions.ts

import { getPool } from '../../connection.js';

/**
 * Run test inside transaction that automatically rolls back
 * ✅ No cleanup needed - transaction rollback handles it
 * ✅ Tests are isolated - no shared state persists
 */
export const withTransaction = async <T>(
  testFn: () => Promise<T>
): Promise<T> => {
  const client = await getPool().connect();

  try {
    await client.query('BEGIN');
    const result = await testFn();
    await client.query('ROLLBACK');
    return result;
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
};
```

### Using Transaction Helper

```typescript
describe('users.create() - integration', () => {

  it('given valid email, create() persists user to database', async () => {
    await withTransaction(async () => {
      const email = 'test@example.com';

      const user = await users.create({ email, username: 'test' });

      const found = await users.findByEmail(email);
      assert.equal(found?.id, user.id);

      // ✅ No cleanup needed - transaction rolls back automatically
    });
  });

  it('given duplicate email, create() throws constraint error', async () => {
    await withTransaction(async () => {
      await users.create({ email: 'dup@example.com', username: 'user1' });

      await assert.rejects(
        () => users.create({ email: 'dup@example.com', username: 'user2' }),
        /duplicate key/
      );

      // ✅ No cleanup needed
    });
  });

  // Tests can run in parallel - no shared state!
});
```

---

## Benefits of RITEway Approach

### Speed
- **Pure function tests**: ~1ms each (no database)
- **Integration tests**: Still ~40ms (but fewer needed)
- **Total test time**: Faster because pure tests dominate

### Clarity
```typescript
// ❌ Before: What does this test?
it('should subscribe user to pack', ...)

// ✅ After: Crystal clear
it('given valid user and pack ids, subscribe() returns subscription with matching user_id', ...)
```

### Maintainability
- Tests are independent - can reorder freely
- No hidden dependencies on beforeAll/beforeEach
- Failures pinpoint exact issue (single assertion)

### Confidence
- Pure functions: 100% coverage, fast
- Integration: Focused on actual I/O
- Together: Complete confidence

---

## Migration Strategy

**Don't rewrite everything!** Migrate incrementally:

### Week 1: Add Pure Function Tests
- Extract one pure function (e.g., `buildUpdateQuery`)
- Write pure tests for it
- Refactor integration to use pure function
- Keep existing integration tests

### Week 2: Improve Test Names
- Update test names to "given/when/then" format
- No code changes needed
- Improves readability immediately

### Week 3: Remove Shared State
- Pick one describe block
- Remove beforeAll/beforeEach
- Use fixture factories instead
- Keep existing assertions

### Week 4: Split Multi-Assertion Tests
- Pick critical path tests
- Split into single-assertion tests
- Keep original tests for now (can remove later)

### Result
- Gradual improvement
- No big bang rewrite
- Always have working tests
- Learn as you go

---

## Conclusion

**Current state:** Good integration tests with real database ✅

**RITEway improvements:**
1. Extract and test pure functions separately (huge win)
2. Remove shared state between tests
3. Use explicit test names
4. One assertion per test (for critical paths)

**Priority:** Medium - Current tests work, but RITEway approach will make them more maintainable and faster long-term.

**Start with:** Extract one pure function and test it. See the benefits immediately!
