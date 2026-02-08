import { randomBytes } from "node:crypto";
import { eq } from "drizzle-orm";
import { db, schema } from "../db/index.js";

const SESSION_DURATION_MS = 30 * 24 * 60 * 60 * 1000; // 30 days

export function generateSessionId(): string {
  return randomBytes(32).toString("hex");
}

export async function createSession(userId: string): Promise<string> {
  const id = generateSessionId();
  const expiresAt = new Date(Date.now() + SESSION_DURATION_MS).toISOString();

  await db.insert(schema.sessions).values({ id, userId, expiresAt });
  return id;
}

export async function validateSession(
  sessionId: string
): Promise<{ id: string; userId: string } | null> {
  const [session] = await db
    .select()
    .from(schema.sessions)
    .where(eq(schema.sessions.id, sessionId))
    .limit(1);

  if (!session) return null;

  if (new Date(session.expiresAt) < new Date()) {
    await destroySession(sessionId);
    return null;
  }

  return { id: session.id, userId: session.userId };
}

export async function destroySession(sessionId: string): Promise<void> {
  await db
    .delete(schema.sessions)
    .where(eq(schema.sessions.id, sessionId));
}
