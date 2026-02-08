import { createMiddleware } from "hono/factory";
import { getCookie } from "hono/cookie";
import { eq } from "drizzle-orm";
import * as schema from "../db/schema.js";
import type { AppEnv } from "../env.js";

export type { AppEnv };
export type AuthEnv = AppEnv;

export const requireAuth = createMiddleware<AppEnv>(async (c, next) => {
  const sessionId = getCookie(c, "session");
  if (!sessionId) {
    return c.json({ error: "Unauthorized" }, 401);
  }

  const db = c.get("db");
  const [session] = db
    .select()
    .from(schema.sessions)
    .where(eq(schema.sessions.id, sessionId))
    .limit(1)
    .all();

  if (!session) {
    return c.json({ error: "Unauthorized" }, 401);
  }

  if (new Date(session.expiresAt) < new Date()) {
    db.delete(schema.sessions)
      .where(eq(schema.sessions.id, sessionId))
      .run();
    return c.json({ error: "Unauthorized" }, 401);
  }

  c.set("userId", session.userId);
  c.set("sessionId", session.id);
  await next();
});
