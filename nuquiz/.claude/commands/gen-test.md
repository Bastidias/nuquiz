---
description: Generate test file following Nuquiz RITEway testing standards
argument-hint: [file_path]
---

Generate a comprehensive test file for: $ARGUMENTS

## RITEway Testing Principles (Eric Elliott)

**R**eadable - Tests read like requirements
**I**solated - Tests don't share state or depend on each other
**T**horough - Cover all requirements and edge cases
**E**xplicit - Clear about what's being tested (one assertion per test)

## CRITICAL RULES - NO EXCEPTIONS

### 1. NO MOCKS - Mocks Are a Code Smell
- Test against the real test database
- Use actual database connections and queries
- Create real test data (no fixtures, use factories)
- Mocks test your mocks, not your code

### 2. Separate Pure Functions from Side Effects
- Extract pure business logic into `*-pure.ts` files
- Test pure functions with fast unit tests (no database)
- Test integration/side effects separately
- Pure function tests should run in ~1ms each

### 3. Use Transaction-Based Cleanup
- Wrap tests in transactions that auto-rollback
- No manual cleanup in `afterEach` (error-prone)
- Use `withTransaction()` helper for complete isolation
- Each test gets clean slate automatically

### 4. RITEway Test Naming
Use format: `given [input], [function] [returns/throws] [output]`

**Examples:**
- ✅ `given valid email, create() returns user with id`
- ✅ `given null parent and category type, validateHierarchyRule() returns false`
- ✅ `given duplicate email, create() throws unique constraint error`
- ❌ `should create user` (too vague)
- ❌ `test user creation` (not descriptive)

### 5. One Assertion Per Test (Critical Paths)
- Each test should verify ONE specific behavior
- Makes failures pinpoint exact issue
- Tests become living documentation
- Easier to maintain and refactor

## File Naming Convention

- `*.unit.test.ts` - Pure unit tests (NO I/O, NO database)
- `*.int.test.ts` - Integration tests (database, external services)
- `*.api.test.ts` - API endpoint tests

## Testing Strategy: Two-Layer Approach

### Layer 1: Pure Function Tests (Fast)
Extract business logic into pure functions and test them without I/O.

**Example Pure Functions File:**
```typescript
// src/db/knowledge-pure.ts

/**
 * Validate hierarchy rules
 * PURE FUNCTION - No side effects
 */
export const validateHierarchyRule = (
  parentType: KnowledgeType | null,
  childType: KnowledgeType
): boolean => {
  if (parentType === null) {
    return childType === 'topic';
  }
  return HIERARCHY_RULES[parentType].includes(childType);
};

/**
 * Build SQL query for finding children
 * PURE FUNCTION - Returns query object, doesn't execute it
 */
export const buildFindChildrenQuery = (parentId: number) => ({
  sql: 'SELECT * FROM knowledge WHERE parent_id = $1 ORDER BY order_index, id',
  params: [parentId],
});
```

**Example Unit Tests (NO DATABASE):**
```typescript
// src/db/__tests__/knowledge-pure.unit.test.ts
import { strict as assert } from 'assert';
import { validateHierarchyRule, buildFindChildrenQuery } from '../knowledge-pure.js';

describe('validateHierarchyRule()', () => {
  it('given null parent and topic child, returns true', () => {
    const result = validateHierarchyRule(null, 'topic');
    assert.equal(result, true);
  });

  it('given null parent and category child, returns false', () => {
    const result = validateHierarchyRule(null, 'category');
    assert.equal(result, false);
  });

  it('given topic parent and category child, returns true', () => {
    const result = validateHierarchyRule('topic', 'category');
    assert.equal(result, true);
  });
});

describe('buildFindChildrenQuery()', () => {
  it('given parent id, returns query with correct SQL', () => {
    const result = buildFindChildrenQuery(5);
    assert.ok(result.sql.includes('WHERE parent_id = $1'));
  });

  it('given parent id, returns params array with id', () => {
    const result = buildFindChildrenQuery(42);
    assert.deepEqual(result.params, [42]);
  });
});
```

**Benefits:**
- ✅ Tests run in ~1ms each (no I/O)
- ✅ No database setup needed
- ✅ Easy to test edge cases
- ✅ Can run thousands of tests quickly

### Layer 2: Integration Tests (Database)
Test actual database operations with transaction-based isolation.

**Transaction Helpers:**
```typescript
// src/db/__tests__/helpers/transactions.ts

/**
 * Run test inside transaction that automatically rolls back
 * ✅ No manual cleanup needed
 * ✅ Complete isolation
 */
export const withTransaction = async <T>(
  testFn: () => Promise<T>
): Promise<T> => {
  const client = await getPool().connect();
  try {
    await client.query('BEGIN');
    const result = await testFn();
    await client.query('ROLLBACK'); // Always rollback
    return result;
  } catch (error) {
    try {
      await client.query('ROLLBACK');
    } catch (rollbackError) {
      // Ignore rollback errors
    }
    throw error;
  } finally {
    client.release();
  }
};

/**
 * Create fixture with automatic cleanup
 */
export const withFixture = async <F, T>(
  createFixture: () => Promise<F>,
  testFn: (fixture: F) => Promise<T>
): Promise<T> => {
  return withTransaction(async () => {
    const fixture = await createFixture();
    return testFn(fixture);
  });
};
```

**Example Integration Tests:**
```typescript
// src/db/__tests__/knowledge.int.test.ts
import { strict as assert } from 'assert';
import { withTransaction, withFixture } from './helpers/transactions.js';
import * as knowledge from '../knowledge.js';

describe('knowledge.create() - integration', () => {

  it('given valid topic data, create() persists to database', async () => {
    await withTransaction(async () => {
      const topic = await knowledge.create({
        name: 'cardiology',
        label: 'Cardiology',
        type: 'topic',
        content_pack_id: 1,
      });

      const found = await knowledge.findById(topic.id);
      assert.equal(found?.id, topic.id);
      // ✅ No cleanup - transaction rolls back automatically
    });
  });

  it('given null parent and category type, create() throws hierarchy validation error', async () => {
    await withTransaction(async () => {
      await assert.rejects(
        () => knowledge.create({
          name: 'test',
          label: 'Test',
          type: 'category',
          parent_id: null,
          content_pack_id: 1,
        }),
        /hierarchy/
      );
    });
  });
});

describe('knowledge.findFactsByPath() - integration', () => {

  it('given valid category and attribute path, returns all matching facts', async () => {
    await withFixture(
      async () => {
        // Setup: Create full hierarchy
        const topic = await knowledge.create({
          name: 'chf',
          label: 'CHF',
          type: 'topic',
          content_pack_id: 1,
        });
        const category = await knowledge.create({
          name: 'left-sided',
          label: 'Left Sided',
          type: 'category',
          parent_id: topic.id,
          content_pack_id: 1,
        });
        const attribute = await knowledge.create({
          name: 'symptoms',
          label: 'Symptoms',
          type: 'attribute',
          parent_id: category.id,
          content_pack_id: 1,
        });
        const fact1 = await knowledge.create({
          name: 'pulmonary-edema',
          label: 'Pulmonary Edema',
          type: 'fact',
          parent_id: attribute.id,
          content_pack_id: 1,
        });
        const fact2 = await knowledge.create({
          name: 'dyspnea',
          label: 'Dyspnea',
          type: 'fact',
          parent_id: attribute.id,
          content_pack_id: 1,
        });

        return { category, attribute, fact1, fact2 };
      },
      async ({ category, attribute, fact1, fact2 }) => {
        // Test: Find facts by path
        const facts = await knowledge.findFactsByPath(
          category.name,
          attribute.name
        );

        assert.equal(facts.length, 2);
        assert.ok(facts.some(f => f.id === fact1.id));
        assert.ok(facts.some(f => f.id === fact2.id));
        // ✅ No cleanup - transaction rolls back automatically
      }
    );
  });
});
```

## Test Structure Templates

### Pure Function Unit Test Template
```typescript
// src/db/__tests__/MODULE-pure.unit.test.ts
import { strict as assert } from 'assert';
import { pureFunctionName } from '../MODULE-pure.js';

describe('pureFunctionName()', () => {
  it('given [input], returns [expected output]', () => {
    const result = pureFunctionName(inputValue);
    assert.equal(result, expectedValue);
  });

  it('given [edge case input], returns [edge case output]', () => {
    const result = pureFunctionName(edgeCaseInput);
    assert.equal(result, edgeCaseOutput);
  });

  it('given [invalid input], returns [error indicator or default]', () => {
    const result = pureFunctionName(invalidInput);
    assert.equal(result, null); // or false, or error object
  });
});
```

### Integration Test Template
```typescript
// src/db/__tests__/MODULE.int.test.ts
import { strict as assert } from 'assert';
import { withTransaction, withFixture } from './helpers/transactions.js';
import * as module from '../MODULE.js';

describe('module.functionName() - integration', () => {

  it('given [valid input], functionName() persists to database', async () => {
    await withTransaction(async () => {
      const result = await module.functionName(validInput);

      const persisted = await module.findById(result.id);
      assert.equal(persisted?.id, result.id);
    });
  });

  it('given [invalid input], functionName() throws [specific error]', async () => {
    await withTransaction(async () => {
      await assert.rejects(
        () => module.functionName(invalidInput),
        /error pattern/
      );
    });
  });
});

describe('module.complexFunction() - integration', () => {

  it('given [complex setup], complexFunction() returns [expected result]', async () => {
    await withFixture(
      async () => {
        // Create all test data needed
        const entity1 = await module.create({ ... });
        const entity2 = await module.create({ ... });
        return { entity1, entity2 };
      },
      async ({ entity1, entity2 }) => {
        // Execute test
        const result = await module.complexFunction(entity1.id, entity2.id);

        // Single focused assertion
        assert.equal(result.someProperty, expectedValue);
      }
    );
  });
});
```

## Common Patterns

### Test Data Factories (Not Fixtures)
```typescript
// Use functions to generate unique test data
const generateEmail = () => `test-${Date.now()}-${Math.random()}@example.com`;
const generateUsername = () => `user-${Date.now()}-${Math.random()}`;

const createTestUser = async (overrides = {}) => {
  return users.create({
    email: generateEmail(),
    username: generateUsername(),
    ...overrides
  });
};

// Usage in tests
it('given valid email, create() persists user', async () => {
  await withTransaction(async () => {
    const user = await createTestUser(); // Fresh data every time
    // test...
  });
});
```

### Testing Error Cases
```typescript
it('given duplicate email, create() throws unique constraint error', async () => {
  await withTransaction(async () => {
    const email = generateEmail();
    await users.create({ email, username: 'user1' });

    await assert.rejects(
      () => users.create({ email, username: 'user2' }),
      /duplicate key|unique constraint/i
    );
  });
});

it('given non-existent parent id, create() throws foreign key error', async () => {
  await withTransaction(async () => {
    await assert.rejects(
      () => knowledge.create({
        name: 'test',
        label: 'Test',
        type: 'category',
        parent_id: 999999,
        content_pack_id: 1,
      }),
      /foreign key/i
    );
  });
});
```

### Testing Hierarchy Rules
```typescript
// Pure function test (fast)
it('given topic parent and fact child, validateHierarchyRule() returns false', () => {
  const result = validateHierarchyRule('topic', 'fact');
  assert.equal(result, false);
});

// Integration test (database)
it('given topic parent and fact child, create() throws hierarchy validation error', async () => {
  await withTransaction(async () => {
    const topic = await knowledge.create({
      name: 'test',
      label: 'Test',
      type: 'topic',
      content_pack_id: 1,
    });

    await assert.rejects(
      () => knowledge.create({
        name: 'fact',
        label: 'Fact',
        type: 'fact',
        parent_id: topic.id,
        content_pack_id: 1,
      }),
      /hierarchy/i
    );
  });
});
```

## Assertions: Use Node.js `assert` Module
```typescript
import { strict as assert } from 'assert';

// Equality
assert.equal(actual, expected);
assert.deepEqual(actualObject, expectedObject);

// Truthiness
assert.ok(condition);
assert.equal(value, true);
assert.equal(value, false);

// Async errors
await assert.rejects(
  () => asyncFunction(),
  /error pattern/
);

// Arrays
assert.equal(array.length, expectedLength);
assert.ok(array.includes(item));
assert.ok(array.some(item => item.id === expectedId));
```

## References

See these files for complete examples:
- `src/db/knowledge-pure.ts` - Pure function extraction
- `src/db/__tests__/knowledge-pure.unit.test.ts` - 60 unit tests, 0.437s
- `src/db/__tests__/helpers/transactions.ts` - Transaction helpers
- `docs/test-review-riteway.md` - Comprehensive RITEway analysis
- `docs/test-refactor-example.md` - Before/after refactoring examples

## Summary Checklist

When generating tests, ensure:

- [ ] Pure business logic extracted to `*-pure.ts` file
- [ ] Unit tests for pure functions in `*.unit.test.ts` (no database)
- [ ] Integration tests in `*.int.test.ts` use `withTransaction()`
- [ ] Test names use "given/when/then" format
- [ ] One assertion per test (for critical paths)
- [ ] NO MOCKS - test against real database
- [ ] Use `import { strict as assert } from 'assert'`
- [ ] Test data created via factories (not fixtures)
- [ ] Error cases tested with `assert.rejects()`
- [ ] Each test is completely independent (no shared state)
