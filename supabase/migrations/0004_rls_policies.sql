-- =====================================================================
-- 0004_rls_policies.sql — Row Level Security
-- =====================================================================
-- Strategy:
--   * Public (anon): can SELECT active categories / products / variants.
--   * Public (anon): can INSERT into `leads` and `orders` (customer-facing).
--   * Authenticated admin: full access — managed via service_role on the server.
-- =====================================================================

alter table public.categories       enable row level security;
alter table public.products         enable row level security;
alter table public.product_variants enable row level security;
alter table public.orders           enable row level security;
alter table public.order_items      enable row level security;
alter table public.leads            enable row level security;

-- ---------- public read for catalog ---------------------------------
drop policy if exists categories_public_read on public.categories;
create policy categories_public_read on public.categories
  for select to anon, authenticated
  using (true);

drop policy if exists products_public_read on public.products;
create policy products_public_read on public.products
  for select to anon, authenticated
  using (is_active = true);

drop policy if exists variants_public_read on public.product_variants;
create policy variants_public_read on public.product_variants
  for select to anon, authenticated
  using (
    exists (
      select 1 from public.products p
      where p.id = product_id and p.is_active = true
    )
  );

-- ---------- anon-can-insert leads & orders --------------------------
drop policy if exists leads_anon_insert on public.leads;
create policy leads_anon_insert on public.leads
  for insert to anon, authenticated
  with check (true);

drop policy if exists orders_anon_insert on public.orders;
create policy orders_anon_insert on public.orders
  for insert to anon, authenticated
  with check (true);

drop policy if exists order_items_anon_insert on public.order_items;
create policy order_items_anon_insert on public.order_items
  for insert to anon, authenticated
  with check (true);

-- Note: SELECT/UPDATE/DELETE on leads & orders is restricted to service_role
-- (which bypasses RLS by default). Admin UI must run on the server.
