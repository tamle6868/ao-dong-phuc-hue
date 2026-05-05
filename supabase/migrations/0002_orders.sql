-- =====================================================================
-- 0002_orders.sql — Orders & order items
-- =====================================================================

create type order_status as enum (
  'pending',
  'confirmed',
  'in_production',
  'shipping',
  'delivered',
  'cancelled'
);

create type payment_method as enum ('cod', 'bank_transfer', 'momo', 'vnpay');

create table if not exists public.orders (
  id              uuid primary key default gen_random_uuid(),
  code            text not null unique,                            -- e.g. ADP-2025-00001
  customer_name   text not null,
  phone           text not null,
  email           text,
  address_line    text not null,
  ward            text,
  district        text,
  city            text,
  total           int not null check (total >= 0),
  status          order_status not null default 'pending',
  payment_method  payment_method not null default 'cod',
  note            text,
  utm_source      text,
  utm_medium      text,
  utm_campaign    text,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

create index if not exists orders_phone_idx on public.orders (phone);
create index if not exists orders_status_idx on public.orders (status);
create index if not exists orders_created_idx on public.orders (created_at desc);

create table if not exists public.order_items (
  id              uuid primary key default gen_random_uuid(),
  order_id        uuid not null references public.orders (id) on delete cascade,
  product_id      uuid not null references public.products (id) on delete restrict,
  variant_id      uuid references public.product_variants (id) on delete set null,
  qty             int not null check (qty > 0),
  unit_price      int not null check (unit_price >= 0),
  custom_name     text,
  custom_number   text,
  created_at      timestamptz not null default now()
);

create index if not exists order_items_order_idx on public.order_items (order_id);
create index if not exists order_items_product_idx on public.order_items (product_id);

drop trigger if exists orders_set_updated_at on public.orders;
create trigger orders_set_updated_at
  before update on public.orders
  for each row execute function public.set_updated_at();
