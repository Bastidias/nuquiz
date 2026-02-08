import { Hono } from "hono";
import { serve } from "@hono/node-server";
import {
  corsMiddleware,
  csrfMiddleware,
  secureHeadersMiddleware,
} from "./middleware/security.js";
import { db } from "./db/index.js";
import health from "./routes/health.js";
import auth from "./routes/auth.js";
import deckRoutes from "./routes/decks.js";
import importRoutes from "./routes/import.js";
import type { AppEnv } from "./env.js";

const app = new Hono<AppEnv>();

// Inject db into context for all routes
app.use("/*", async (c, next) => {
  c.set("db", db);
  await next();
});

// Global middleware
app.use("/*", corsMiddleware);
app.use("/*", csrfMiddleware);
app.use("/*", secureHeadersMiddleware);

// Routes
const routes = app
  .route("/", health)
  .route("/", auth)
  .route("/", deckRoutes)
  .route("/", importRoutes);

export type AppType = typeof routes;

const port = parseInt(process.env.PORT || "3001", 10);
serve({ fetch: app.fetch, port }, () => {
  console.log(`NuQuiz API running on http://localhost:${port}`);
});

export default app;
