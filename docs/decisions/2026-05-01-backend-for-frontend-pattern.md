# Backend-for-frontend pattern between clients and engine

**Date:** 2026-05-01

**Why:** Abstract the engine API behind a per-client BFF so clients (web, iOS) can be served a tailored shape without depending on the engine's internal contract.

**Consequence:** No direct client→engine calls — every client routes through its own BFF. Adding a new client means standing up a new BFF; the engine API is not a public client contract.
