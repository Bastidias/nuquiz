import { createMiddleware } from "hono/factory";
import { getCookie } from "hono/cookie";
import { validateSession } from "../lib/session.js";

export type AuthEnv = {
  Variables: {
    userId: string;
    sessionId: string;
  };
};

export const requireAuth = createMiddleware<AuthEnv>(async (c, next) => {
  const sessionId = getCookie(c, "session");
  if (!sessionId) {
    return c.json({ error: "Unauthorized" }, 401);
  }

  const session = await validateSession(sessionId);
  if (!session) {
    return c.json({ error: "Unauthorized" }, 401);
  }

  c.set("userId", session.userId);
  c.set("sessionId", session.id);
  await next();
});
