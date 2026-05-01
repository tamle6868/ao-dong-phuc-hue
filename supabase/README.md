# Supabase migrations

This folder is the source of truth for the Postgres schema used by the storefront.

## Files

| File | Purpose |
| --- | --- |
| `migrations/0001_init.sql` | `categories`, `products`, `product_variants`, shared `set_updated_at()` trigger function |
| `migrations/0002_orders.sql` | `orders`, `order_items`, `order_status` / `payment_method` enums |
| `migrations/0003_leads.sql` | `leads` table for landing-page form submissions |
| `migrations/0004_rls_policies.sql` | Row Level Security: public read on catalog, anon insert on leads/orders |
| `seed.sql` | Minimal demo data (4 categories + 1 featured product) |

## How to apply

### Option A — Supabase CLI (recommended)

```bash
# 1. Install the CLI: https://supabase.com/docs/guides/cli
# 2. Link to your project:
supabase login
supabase link --project-ref <YOUR_PROJECT_REF>

# 3. Push all migrations:
supabase db push

# 4. (Optional) seed demo data:
supabase db execute -f supabase/seed.sql
```

### Option B — SQL Editor

Open the [Supabase SQL Editor](https://supabase.com/dashboard) and run each file
in `migrations/` in order, then `seed.sql` if you want demo data.

## Wiring the app

Add these to `.env.local` (see `.env.example` at repo root):

```bash
NEXT_PUBLIC_SUPABASE_URL=https://<project-ref>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon-key>
SUPABASE_SERVICE_ROLE_KEY=<service-role-key>   # server-only, NEVER expose
```

The current phase 1 build uses local mock data in `src/data/`. Swapping to
Supabase is a follow-up: replace the imports in `src/data/products.ts` /
`src/data/categories.ts` with calls to `lib/supabase/server.ts` and the rest
of the UI layer continues to work unchanged.
