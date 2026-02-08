import { Hono } from "hono";
import { getCookie, setCookie, deleteCookie } from "hono/cookie";
import { Google, generateState, type OAuth2Tokens } from "arctic";
import { eq, and } from "drizzle-orm";
import * as schema from "../db/schema.js";
import { createSession, destroySession } from "../lib/session.js";
import type { AppEnv } from "../env.js";

const google = new Google(
  process.env.GOOGLE_CLIENT_ID || "",
  process.env.GOOGLE_CLIENT_SECRET || "",
  process.env.GOOGLE_REDIRECT_URI || "http://localhost:3001/auth/google/callback"
);

const auth = new Hono<AppEnv>();

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
  const db = c.get("db");
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
  const [existingUser] = db
    .select()
    .from(schema.users)
    .where(
      and(
        eq(schema.users.provider, "google"),
        eq(schema.users.providerId, googleUser.sub)
      )
    )
    .limit(1)
    .all();

  let userId: string;

  if (existingUser) {
    userId = existingUser.id;
    db.update(schema.users)
      .set({
        name: googleUser.name,
        email: googleUser.email,
        avatarUrl: googleUser.picture || null,
        updatedAt: now,
      })
      .where(eq(schema.users.id, userId))
      .run();
  } else {
    userId = crypto.randomUUID();
    db.insert(schema.users).values({
      id: userId,
      email: googleUser.email,
      name: googleUser.name,
      avatarUrl: googleUser.picture || null,
      provider: "google",
      providerId: googleUser.sub,
      createdAt: now,
      updatedAt: now,
    }).run();
  }

  const sessionId = createSession(db, userId);

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

auth.post("/auth/logout", (c) => {
  const db = c.get("db");
  const sessionId = getCookie(c, "session");
  if (sessionId) {
    destroySession(db, sessionId);
  }
  deleteCookie(c, "session");
  return c.json({ ok: true });
});

auth.get("/auth/me", (c) => {
  const db = c.get("db");
  const sessionId = getCookie(c, "session");
  if (!sessionId) {
    return c.json({ user: null });
  }

  const [session] = db
    .select()
    .from(schema.sessions)
    .where(eq(schema.sessions.id, sessionId))
    .limit(1)
    .all();

  if (!session || new Date(session.expiresAt) < new Date()) {
    if (session) {
      destroySession(db, sessionId);
    }
    deleteCookie(c, "session");
    return c.json({ user: null });
  }

  const [user] = db
    .select({
      id: schema.users.id,
      name: schema.users.name,
      avatarUrl: schema.users.avatarUrl,
    })
    .from(schema.users)
    .where(eq(schema.users.id, session.userId))
    .limit(1)
    .all();

  return c.json({ user: user || null });
});

export default auth;
