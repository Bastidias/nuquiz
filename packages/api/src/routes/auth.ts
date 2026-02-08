import { Hono } from "hono";
import { getCookie, setCookie, deleteCookie } from "hono/cookie";
import { Google, generateState, type OAuth2Tokens } from "arctic";
import { eq, and } from "drizzle-orm";
import { db, schema } from "../db/index.js";
import { createSession, destroySession } from "../lib/session.js";

const google = new Google(
  process.env.GOOGLE_CLIENT_ID || "",
  process.env.GOOGLE_CLIENT_SECRET || "",
  process.env.GOOGLE_REDIRECT_URI || "http://localhost:3001/auth/google/callback"
);

const auth = new Hono();

auth.get("/auth/google/login", async (c) => {
  const state = generateState();
  const scopes = ["openid", "profile", "email"];
  const url = google.createAuthorizationURL(state, scopes);

  setCookie(c, "oauth_state", state, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Lax",
    maxAge: 60 * 10, // 10 minutes
    path: "/",
  });

  return c.redirect(url.toString());
});

auth.get("/auth/google/callback", async (c) => {
  const code = c.req.query("code");
  const state = c.req.query("state");
  const storedState = getCookie(c, "oauth_state");

  if (!code || !state || state !== storedState) {
    return c.json({ error: "Invalid OAuth state" }, 400);
  }

  deleteCookie(c, "oauth_state");

  let tokens: OAuth2Tokens;
  try {
    tokens = await google.validateAuthorizationCode(code);
  } catch {
    return c.json({ error: "OAuth validation failed" }, 400);
  }

  // Fetch user info from Google
  const response = await fetch("https://openidconnect.googleapis.com/v1/userinfo", {
    headers: { Authorization: `Bearer ${tokens.accessToken()}` },
  });

  if (!response.ok) {
    return c.json({ error: "Failed to fetch user info" }, 500);
  }

  const googleUser = (await response.json()) as {
    sub: string;
    email: string;
    name: string;
    picture?: string;
  };

  // Upsert user
  const now = new Date().toISOString();
  const [existingUser] = await db
    .select()
    .from(schema.users)
    .where(
      and(
        eq(schema.users.provider, "google"),
        eq(schema.users.providerId, googleUser.sub)
      )
    )
    .limit(1);

  let userId: string;

  if (existingUser) {
    userId = existingUser.id;
    await db
      .update(schema.users)
      .set({
        name: googleUser.name,
        email: googleUser.email,
        avatarUrl: googleUser.picture || null,
        updatedAt: now,
      })
      .where(eq(schema.users.id, userId));
  } else {
    userId = crypto.randomUUID();
    await db.insert(schema.users).values({
      id: userId,
      email: googleUser.email,
      name: googleUser.name,
      avatarUrl: googleUser.picture || null,
      provider: "google",
      providerId: googleUser.sub,
      createdAt: now,
      updatedAt: now,
    });
  }

  const sessionId = await createSession(userId);

  setCookie(c, "session", sessionId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Lax",
    maxAge: 60 * 60 * 24 * 30, // 30 days
    path: "/",
  });

  const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";
  return c.redirect(frontendUrl);
});

auth.post("/auth/logout", async (c) => {
  const sessionId = getCookie(c, "session");
  if (sessionId) {
    await destroySession(sessionId);
  }
  deleteCookie(c, "session");
  return c.json({ ok: true });
});

auth.get("/auth/me", async (c) => {
  const sessionId = getCookie(c, "session");
  if (!sessionId) {
    return c.json({ user: null });
  }

  const { validateSession } = await import("../lib/session.js");
  const session = await validateSession(sessionId);
  if (!session) {
    deleteCookie(c, "session");
    return c.json({ user: null });
  }

  const [user] = await db
    .select({
      id: schema.users.id,
      name: schema.users.name,
      avatarUrl: schema.users.avatarUrl,
    })
    .from(schema.users)
    .where(eq(schema.users.id, session.userId))
    .limit(1);

  return c.json({ user: user || null });
});

export default auth;
