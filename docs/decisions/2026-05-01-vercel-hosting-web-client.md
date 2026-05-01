# Vercel as hosting target for the web client

**Date:** 2026-05-01

**Why:** Easiest to get up and running — first-party Next.js deploy story removes hosting setup as a yak-shave.

**Consequence:** Web client deploys to Vercel; serverless / edge runtime limits apply (no custom long-running server). Engine hosting is a separate, still-open decision.
