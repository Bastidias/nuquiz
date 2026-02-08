import { Hono } from "hono";
import { eq, and } from "drizzle-orm";
import {
  importDeckSchema,
  type ImportDeck,
  type ImportResult,
  type ImportDryRunResult,
  type ImportValidationError,
} from "@nuquiz/shared";
import * as schema from "../db/schema.js";
import type { AppEnv, DbInstance } from "../env.js";

const importRoutes = new Hono<AppEnv>();

function validateImportData(data: ImportDeck): ImportValidationError[] {
  const errors: ImportValidationError[] = [];

  for (let ti = 0; ti < data.topics.length; ti++) {
    const topic = data.topics[ti];
    for (let ci = 0; ci < topic.concepts.length; ci++) {
      const concept = topic.concepts[ci];
      for (let tri = 0; tri < concept.triples.length; tri++) {
        const triple = concept.triples[tri];
        if (triple.subject.trim().length === 0) {
          errors.push({
            path: `topics[${ti}].concepts[${ci}].triples[${tri}].subject`,
            message: "Subject cannot be empty or whitespace only",
          });
        }
        if (triple.predicate.trim().length === 0) {
          errors.push({
            path: `topics[${ti}].concepts[${ci}].triples[${tri}].predicate`,
            message: "Predicate cannot be empty or whitespace only",
          });
        }
        if (triple.object.trim().length === 0) {
          errors.push({
            path: `topics[${ti}].concepts[${ci}].triples[${tri}].object`,
            message: "Object cannot be empty or whitespace only",
          });
        }
      }
    }
  }

  return errors;
}

function countImportItems(data: ImportDeck) {
  let topicsCreated = 0;
  let conceptsCreated = 0;
  let triplesCreated = 0;
  const tagNames = new Set<string>();

  for (const topic of data.topics) {
    topicsCreated++;
    for (const concept of topic.concepts) {
      conceptsCreated++;
      for (const triple of concept.triples) {
        triplesCreated++;
        if (triple.tags) {
          for (const tag of triple.tags) {
            tagNames.add(tag);
          }
        }
      }
    }
  }

  return { topicsCreated, conceptsCreated, triplesCreated, tagsCreated: tagNames.size };
}

function getOrCreateTag(
  db: DbInstance,
  catalogId: string,
  tagName: string,
  tagCache: Map<string, string>,
  now: string
): string {
  const cached = tagCache.get(tagName);
  if (cached) return cached;

  const [existing] = db
    .select({ id: schema.tags.id })
    .from(schema.tags)
    .where(
      and(eq(schema.tags.catalogId, catalogId), eq(schema.tags.name, tagName))
    )
    .limit(1)
    .all();

  if (existing) {
    tagCache.set(tagName, existing.id);
    return existing.id;
  }

  const tagId = crypto.randomUUID();
  db.insert(schema.tags).values({
    id: tagId,
    catalogId,
    name: tagName,
    createdAt: now,
  }).run();
  tagCache.set(tagName, tagId);
  return tagId;
}

importRoutes.post("/catalogs/:catalogId/import", async (c) => {
  const db = c.get("db");
  const userId = c.get("userId");
  const catalogId = c.req.param("catalogId");
  const body = await c.req.json();
  const parsed = importDeckSchema.safeParse(body);

  if (!parsed.success) {
    return c.json({ error: parsed.error.flatten().fieldErrors }, 400);
  }

  const data = parsed.data;
  const isDryRun = c.req.query("dryRun") === "true";

  const validationErrors = validateImportData(data);

  if (isDryRun) {
    const summary = countImportItems(data);
    const result: ImportDryRunResult = {
      valid: validationErrors.length === 0,
      errors: validationErrors,
      summary: validationErrors.length === 0
        ? { ...summary, deckId: "dry-run" }
        : undefined,
    };
    return c.json(result);
  }

  if (validationErrors.length > 0) {
    return c.json(
      { valid: false, errors: validationErrors },
      400
    );
  }

  // Verify catalog ownership
  const [catalog] = db
    .select()
    .from(schema.catalogs)
    .where(and(eq(schema.catalogs.id, catalogId), eq(schema.catalogs.createdBy, userId)))
    .limit(1)
    .all();
  if (!catalog) {
    return c.json({ error: "Catalog not found" }, 404);
  }

  const now = new Date().toISOString();
  const deckId = crypto.randomUUID();

  db.insert(schema.decks).values({
    id: deckId,
    catalogId,
    title: data.title,
    description: data.description ?? null,
    sortOrder: 0,
    createdAt: now,
    updatedAt: now,
  }).run();

  let topicsCreated = 0;
  let conceptsCreated = 0;
  let triplesCreated = 0;
  const tagCache = new Map<string, string>();

  for (let ti = 0; ti < data.topics.length; ti++) {
    const topicData = data.topics[ti];
    const topicId = crypto.randomUUID();

    db.insert(schema.topics).values({
      id: topicId,
      deckId,
      title: topicData.title,
      description: topicData.description ?? null,
      sortOrder: ti,
      createdAt: now,
      updatedAt: now,
    }).run();
    topicsCreated++;

    for (let ci = 0; ci < topicData.concepts.length; ci++) {
      const conceptData = topicData.concepts[ci];
      const conceptId = crypto.randomUUID();

      db.insert(schema.concepts).values({
        id: conceptId,
        topicId,
        title: conceptData.title,
        description: conceptData.description ?? null,
        sortOrder: ci,
        createdAt: now,
        updatedAt: now,
      }).run();
      conceptsCreated++;

      for (let tri = 0; tri < conceptData.triples.length; tri++) {
        const tripleData = conceptData.triples[tri];
        const tripleId = crypto.randomUUID();

        db.insert(schema.triples).values({
          id: tripleId,
          conceptId,
          subject: tripleData.subject,
          predicate: tripleData.predicate,
          object: tripleData.object,
          sortOrder: tri,
          createdAt: now,
          updatedAt: now,
        }).run();
        triplesCreated++;

        if (tripleData.tags) {
          for (const tagName of tripleData.tags) {
            const tagId = getOrCreateTag(db, catalogId, tagName, tagCache, now);
            db.insert(schema.tripleTags)
              .values({ tripleId, tagId })
              .onConflictDoNothing()
              .run();
          }
        }
      }
    }
  }

  const result: ImportResult = {
    deckId,
    topicsCreated,
    conceptsCreated,
    triplesCreated,
    tagsCreated: tagCache.size,
  };

  return c.json(result, 201);
});

export default importRoutes;
