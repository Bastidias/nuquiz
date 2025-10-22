---
description: Generate test file following Nuquiz testing standards
argument-hint: [file_path]
---

Generate a comprehensive test file for: $ARGUMENTS

**CRITICAL RULES - NO EXCEPTIONS:**
1. **NEVER USE MOCKS** - Mocks are a code smell
2. Test against the real test database
3. Use appropriate file naming:
   - `*.int.test.ts` for integration tests (database, external services)
   - `*.unit.test.ts` for pure unit tests (no I/O)
   - `*.api.test.ts` for API endpoint tests

**Test Structure:**
- Use test data factories (no fixtures)
- Clean up after each test in `afterEach`
- Set up/teardown test database connection in `beforeAll`/`afterAll`
- Test real behavior, not mocked behavior

**Example Integration Test:**
```typescript
// knowledge.int.test.ts
describe('Knowledge DAL', () => {
  beforeAll(async () => {
    await setupTestDatabase();
  });

  afterEach(async () => {
    await cleanupTestData();
  });

  afterAll(async () => {
    await closeTestConnection();
  });

  it('should create a topic', async () => {
    const topic = await createKnowledge({
      name: 'cardiology',
      label: 'Cardiology',
      type: 'topic'
    });

    expect(topic.id).toBeDefined();
    expect(topic.type).toBe('topic');
  });
});
```

Follow functional programming style (Eric Elliott approach).
