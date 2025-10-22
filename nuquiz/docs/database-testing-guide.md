# Database Testing Guide

## Quick Reference

### Test Database Management

```bash
# Run tests (TRUNCATE between tests - fast)
npm test

# Reset test database (DROP + migrate - use when schema changes)
npm run db:reset

# Load sample data into test database
npm run db:seed:test

# Load sample data into dev database
npm run db:seed
```

---

## Testing Strategy: TRUNCATE vs MIGRATE

### During Test Runs: TRUNCATE (Fast)

Our tests use `TRUNCATE` to clean up between test runs:

```typescript
afterEach(async () => {
  await query('DELETE FROM knowledge'); // Or TRUNCATE
});
```

**Why?**
- ✅ **Fast**: ~1ms vs ~100ms for full migration
- ✅ **Keeps schema**: Tables already exist
- ✅ **Good for TDD**: Run tests hundreds of times per day

**When to use:**
- During normal test-driven development
- When running tests in CI/CD
- When schema hasn't changed

---

### When Schema Changes: FULL RESET (Complete)

Use `npm run db:reset` when you modify the database schema:

```bash
# Scenario: You added a new column to the knowledge table
npm run db:reset   # Drops all tables and re-creates schema
npm test           # Tests now run against new schema
```

**Why?**
- ✅ **Clean slate**: Removes old schema completely
- ✅ **No migration conflicts**: Fresh start every time
- ✅ **Catches breaking changes**: Tests fail if schema incompatible

**When to use:**
- After modifying migration files
- After pulling new migrations from git
- When getting weird constraint errors
- Before running tests after long breaks

---

## Test Lifecycle Flow

### Standard Test Run (No Schema Changes)

```
1. beforeAll()
   └── truncateAllTables()          // Clean slate
   └── Create test user/pack         // Setup

2. Test 1 runs
   └── Creates data
   └── Assertions pass ✅

3. afterEach()
   └── DELETE FROM knowledge         // Clean up

4. Test 2 runs
   └── Creates data
   └── Assertions pass ✅

5. afterAll()
   └── truncateAllTables()           // Final cleanup
   └── closeConnections()            // Close pool
```

**Duration**: ~0.5s for 16 tests

---

### After Schema Change

```bash
# 1. Pull new schema from git
git pull origin main

# 2. Reset test database with new schema
npm run db:reset
# Output: Drops all tables, runs migrations

# 3. Run tests
npm test
# Output: All tests pass with new schema ✅
```

**Duration**: ~2s (one-time setup cost)

---

## Sample Data Management

### What's in the Sample Data?

**Middle School Science: States of Matter**

- **2 topics** (States of Matter, Water Cycle)
- **7 categories** (Solid, Liquid, Gas, Plasma, Evaporation, etc.)
- **24 attributes** (Shape, Volume, Particle Movement, etc.)
- **70 facts** (Definite shape, Flows freely, etc.)

See `docs/sample-data-guide.md` for full details.

---

### When to Use Sample Data

#### ✅ **Use sample data for:**

1. **Manual testing** - Load data, test quiz generation manually
2. **Integration tests** - Test quiz generation with realistic data
3. **Frontend development** - Have data to display without backend work
4. **Demos** - Show stakeholders working quiz questions

```bash
# Load into dev for manual testing
npm run db:seed

# Load into test for integration tests
npm run db:seed:test
```

#### ❌ **DON'T use sample data for:**

1. **Unit tests** - Create minimal test data in each test
2. **Hierarchy validation tests** - Use simple test data
3. **Performance tests** - Need controlled data sizes

---

### Sample Data in Tests

**Option 1: Load at start of test suite**
```typescript
describe('Quiz Generation', () => {
  beforeAll(async () => {
    await loadSampleData(); // Loads States of Matter
  });

  it('should generate solid vs liquid comparison', async () => {
    const solid = await findCategoryByName('solid');
    const liquid = await findCategoryByName('liquid');
    // Test with realistic data...
  });
});
```

**Option 2: Create minimal data per test**
```typescript
describe('Knowledge DAL', () => {
  it('should create topic', async () => {
    const topic = await knowledge.create({
      name: 'test_topic',
      type: 'topic',
      // ...
    });
    expect(topic.id).toBeDefined();
  });
});
```

**We use Option 2** in our current tests for isolation.

---

## Database Scripts Reference

### Migration Scripts

| Command | Description | Use Case |
|---------|-------------|----------|
| `npm run migrate` | Run migrations on **dev** database | After creating new migration |
| `npm run migrate:test` | Run migrations on **test** database | One-time test DB setup |
| `npm run db:reset` | **DROP + migrate** test database | Schema changed |

### Data Scripts

| Command | Description | Use Case |
|---------|-------------|----------|
| `npm run db:seed` | Load sample data into **dev** | Manual testing |
| `npm run db:seed:test` | Load sample data into **test** | Integration tests |

### Test Scripts

| Command | Description | Use Case |
|---------|-------------|----------|
| `npm test` | Run all tests | Standard workflow |
| `npm test:watch` | Run tests in watch mode | TDD workflow |
| `npm test:int` | Run integration tests only | Quick check |
| `npm test:coverage` | Run with coverage report | Pre-commit check |

---

## Common Workflows

### Daily Development (TDD)

```bash
# Terminal 1: Watch mode
npm test:watch

# Write test → See it fail → Write code → See it pass
# Tests clean up automatically (TRUNCATE)
```

---

### After Pulling Schema Changes

```bash
# Someone changed the migration
git pull origin main

# Reset your test database
npm run db:reset

# Verify tests still pass
npm test
```

---

### Manual Testing with Sample Data

```bash
# Load sample data into dev
npm run db:seed

# Start dev server
npm run dev

# Visit http://localhost:3000 and test quiz generation
```

---

### Before Creating PR

```bash
# 1. Reset test database (clean slate)
npm run db:reset

# 2. Run full test suite with coverage
npm test:coverage

# 3. Check coverage meets threshold (80%)
# Coverage report in terminal

# 4. Create PR
gh pr create
```

---

## Debugging Test Database

### View current data

```bash
# Connect to test database
docker exec -it nuquiz-postgres-test psql -U nuquiz_user -d nuquiz_test

# Common queries
\dt                          # List all tables
SELECT COUNT(*) FROM users;   # Check users
SELECT COUNT(*) FROM knowledge; # Check knowledge nodes
SELECT * FROM knowledge WHERE type = 'category';
```

### Check database state during tests

Add this to your test:
```typescript
it('should create topic', async () => {
  const topic = await knowledge.create({ ... });

  // PROOF: Check database directly
  const result = await query('SELECT * FROM knowledge WHERE id = $1', [topic.id]);
  console.log('Database row:', result.rows[0]);

  expect(topic.id).toBeDefined();
});
```

### Reset if tests acting weird

```bash
# Nuclear option: Drop everything and start fresh
npm run db:reset
npm test
```

---

## Performance Tips

### Fast Tests = TRUNCATE

```typescript
// ✅ FAST: Use TRUNCATE (keeps schema)
afterEach(async () => {
  await query('TRUNCATE TABLE knowledge RESTART IDENTITY CASCADE');
});
```

### Slow Tests = Drop/Create

```typescript
// ❌ SLOW: Don't do this in afterEach
afterEach(async () => {
  await query('DROP TABLE knowledge CASCADE');
  await query('CREATE TABLE knowledge...');
});
```

### Connection Pooling

```typescript
// ✅ GOOD: Reuse connection pool
const pool = getPool(); // Singleton

// ❌ BAD: New connection every time
const newPool = new Pool({ ... });
```

---

## Troubleshooting

### "Relation does not exist"

**Problem**: Schema not in test database

**Solution**:
```bash
npm run db:reset  # Recreates schema
npm test
```

---

### "Too many connections"

**Problem**: Tests not closing connections

**Solution**:
```typescript
afterAll(async () => {
  await closeConnections(); // Add this!
});
```

---

### Tests pass locally but fail in CI

**Problem**: Different database state

**Solution**:
```bash
# In CI, always start with reset
npm run db:reset  # Part of CI script
npm test
```

---

### "Cannot drop table due to dependent objects"

**Problem**: Foreign key constraints

**Solution**: Use `CASCADE`
```sql
DROP TABLE knowledge CASCADE;
```

Or use our reset script:
```bash
npm run db:reset
```

---

## Summary

| Scenario | Command | Speed | When to Use |
|----------|---------|-------|-------------|
| **Normal testing** | `npm test` | ⚡ Fast | Daily TDD |
| **Schema changed** | `npm run db:reset` + `npm test` | 🐢 Slow | After migrations |
| **Need sample data** | `npm run db:seed:test` | ⚡ Fast | Integration tests |
| **Full reset** | `npm run db:reset` | 🐢 Slow | When confused |

**Default approach**: Use TRUNCATE (fast) and only reset when schema changes.

**Philosophy**: Test against REAL database, but keep it fast enough for TDD.
