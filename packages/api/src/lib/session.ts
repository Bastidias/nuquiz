import { randomBytes } from "node:crypto";
import { eq } from "drizzle-orm";
import * as schema from "../db/schema.js";
import type { DbInstance } from "../env.js";

const SESSION_DURATION_MS = 30 * 24 * 60 * 60 * 1000; // 30 days

export function generateSessionId(): string {
  return randomBytes(32).toString("hex");
}

export function createSession(db: DbInstance, userId: string): string {
  const id = generateSessionId();
  const expiresAt = new Date(Date.now() + SESSION_DURATION_MS).toISOString();

  db.insert(schema.sessions).values({ id, userId, expiresAt }).run();
  return id;
}

export function destroySession(db: DbInstance, sessionId: string): void {
  db.delete(schema.sessions)
    .where(eq(schema.sessions.id, sessionId))
    .run();
}
