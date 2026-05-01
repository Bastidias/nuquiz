# Supabase as the DAL, server-side only

**Date:** 2026-05-01

**Why:** Get hosted Postgres, auth, and storage primitives without standing them up ourselves — but keep Supabase behind the engine API so credentials never leave the server.

**Consequence:** No `supabase-js` in the browser, no Supabase auth helpers on the client, no client-side Realtime subscriptions. All Supabase access is wrapped by the engine / BFF. RLS is defense-in-depth, not the primary trust boundary.
