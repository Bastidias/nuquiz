import type { BetterSQLite3Database } from "drizzle-orm/better-sqlite3";
import type * as schema from "./db/schema.js";

export type DbInstance = BetterSQLite3Database<typeof schema>;

export type AppEnv = {
  Variables: {
    userId: string;
    sessionId: string;
    db: DbInstance;
  };
};
