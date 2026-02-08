import { createTestDb, closeTestDb, clearTestDb } from "./db.js";

describe("test database helper", () => {
  test("creates an in-memory database with all tables", () => {
    // Arrange & Act
    const { db, sqlite } = createTestDb();

    // Assert — verify tables exist by querying sqlite_master
    const tables = sqlite
      .prepare("SELECT name FROM sqlite_master WHERE type='table' ORDER BY name")
      .all() as Array<{ name: string }>;
    const tableNames = tables.map((t) => t.name);

    expect(tableNames).toContain("users");
    expect(tableNames).toContain("sessions");
    expect(tableNames).toContain("decks");
    expect(tableNames).toContain("topics");
    expect(tableNames).toContain("concepts");
    expect(tableNames).toContain("triples");
    expect(tableNames).toContain("tags");
    expect(tableNames).toContain("triple_tags");

    closeTestDb(sqlite);
  });

  test("foreign keys are enforced", () => {
    // Arrange
    const { db, sqlite } = createTestDb();

    // Act & Assert — inserting a session with no user should fail
    expect(() => {
      sqlite
        .prepare(
          "INSERT INTO sessions (id, user_id, expires_at) VALUES ('s1', 'nonexistent', '2099-01-01')"
        )
        .run();
    }).toThrow();

    closeTestDb(sqlite);
  });

  test("clearTestDb removes all data", () => {
    // Arrange
    const { db, sqlite } = createTestDb();
    sqlite
      .prepare(
        "INSERT INTO users (id, email, name, provider, provider_id, created_at, updated_at) VALUES ('u1', 'a@b.com', 'Test', 'github', 'gh1', '2024-01-01', '2024-01-01')"
      )
      .run();

    // Act
    clearTestDb(db);

    // Assert
    const count = sqlite.prepare("SELECT COUNT(*) as cnt FROM users").get() as {
      cnt: number;
    };
    expect(count.cnt).toBe(0);

    closeTestDb(sqlite);
  });
});
