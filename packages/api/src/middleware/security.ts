import { cors } from "hono/cors";
import { csrf } from "hono/csrf";
import { secureHeaders } from "hono/secure-headers";
import type { MiddlewareHandler } from "hono";

const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";

export const corsMiddleware = cors({
  origin: FRONTEND_URL,
  credentials: true,
  allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowHeaders: ["Content-Type"],
});

export const csrfMiddleware = csrf({
  origin: FRONTEND_URL,
});

export const secureHeadersMiddleware: MiddlewareHandler = secureHeaders();
