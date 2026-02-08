import { Hono } from "hono";
import type { AppEnv } from "../../env.js";
import type { TestDb } from "./db.js";
import catalogRoutes from "../../routes/catalogs.js";
import deckRoutes from "../../routes/decks.js";
import importRoutes from "../../routes/import.js";
import health from "../../routes/health.js";
import quizRoutes from "../../routes/quiz.js";

/**
 * Creates a test Hono app wired to the given test database.
 * Auth is bypassed: the provided userId is injected into context directly.
 */
export function createTestApp(db: TestDb, userId: string) {
  const app = new Hono<AppEnv>();

  // Inject test db and auth context
  app.use("/*", async (c, next) => {
    c.set("db", db);
    c.set("userId", userId);
    c.set("sessionId", "test-session");
    await next();
  });

  app.route("/", health);
  app.route("/", catalogRoutes);
  app.route("/", deckRoutes);
  app.route("/", importRoutes);
  app.route("/", quizRoutes);

  return app;
}

/**
 * Convenience to make a JSON request to the test app.
 */
export function jsonRequest(
  app: Hono<AppEnv>,
  method: string,
  path: string,
  body?: unknown
) {
  const init: RequestInit = {
    method,
    headers: { "Content-Type": "application/json" },
  };
  if (body !== undefined) {
    init.body = JSON.stringify(body);
  }
  return app.request(path, init);
}
