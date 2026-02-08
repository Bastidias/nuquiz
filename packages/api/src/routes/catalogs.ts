import { Hono } from "hono";
import { eq, and } from "drizzle-orm";
import { createCatalogSchema, updateCatalogSchema } from "@nuquiz/shared";
import * as schema from "../db/schema.js";
import type { AppEnv } from "../env.js";

const catalogs = new Hono<AppEnv>();

catalogs.get("/catalogs", (c) => {
  const db = c.get("db");
  const userId = c.get("userId");
  const userCatalogs = db
    .select()
    .from(schema.catalogs)
    .where(eq(schema.catalogs.createdBy, userId))
    .all();
  return c.json({ catalogs: userCatalogs });
});

catalogs.post("/catalogs", async (c) => {
  const db = c.get("db");
  const userId = c.get("userId");
  const body = await c.req.json();
  const parsed = createCatalogSchema.safeParse(body);
  if (!parsed.success) {
    return c.json({ error: parsed.error.flatten().fieldErrors }, 400);
  }

  const now = new Date().toISOString();
  const id = crypto.randomUUID();
  db.insert(schema.catalogs).values({
    id,
    createdBy: userId,
    title: parsed.data.title,
    description: parsed.data.description,
    createdAt: now,
    updatedAt: now,
  }).run();

  const [catalog] = db
    .select()
    .from(schema.catalogs)
    .where(eq(schema.catalogs.id, id))
    .all();
  return c.json({ catalog }, 201);
});

catalogs.get("/catalogs/:id", (c) => {
  const db = c.get("db");
  const userId = c.get("userId");
  const [catalog] = db
    .select()
    .from(schema.catalogs)
    .where(
      and(eq(schema.catalogs.id, c.req.param("id")), eq(schema.catalogs.createdBy, userId))
    )
    .limit(1)
    .all();
  if (!catalog) {
    return c.json({ error: "Catalog not found" }, 404);
  }
  return c.json({ catalog });
});

catalogs.put("/catalogs/:id", async (c) => {
  const db = c.get("db");
  const userId = c.get("userId");
  const [catalog] = db
    .select()
    .from(schema.catalogs)
    .where(
      and(eq(schema.catalogs.id, c.req.param("id")), eq(schema.catalogs.createdBy, userId))
    )
    .limit(1)
    .all();
  if (!catalog) {
    return c.json({ error: "Catalog not found" }, 404);
  }

  const body = await c.req.json();
  const parsed = updateCatalogSchema.safeParse(body);
  if (!parsed.success) {
    return c.json({ error: parsed.error.flatten().fieldErrors }, 400);
  }

  const now = new Date().toISOString();
  db.update(schema.catalogs)
    .set({ ...parsed.data, updatedAt: now })
    .where(eq(schema.catalogs.id, catalog.id))
    .run();

  const [updated] = db
    .select()
    .from(schema.catalogs)
    .where(eq(schema.catalogs.id, catalog.id))
    .all();
  return c.json({ catalog: updated });
});

catalogs.delete("/catalogs/:id", (c) => {
  const db = c.get("db");
  const userId = c.get("userId");
  const [catalog] = db
    .select()
    .from(schema.catalogs)
    .where(
      and(eq(schema.catalogs.id, c.req.param("id")), eq(schema.catalogs.createdBy, userId))
    )
    .limit(1)
    .all();
  if (!catalog) {
    return c.json({ error: "Catalog not found" }, 404);
  }

  db.delete(schema.catalogs).where(eq(schema.catalogs.id, catalog.id)).run();
  return c.json({ ok: true });
});

export default catalogs;
