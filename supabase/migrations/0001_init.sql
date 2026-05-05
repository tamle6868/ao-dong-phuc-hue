-- =====================================================================
-- 0001_init.sql — Categories, Products, Variants
-- =====================================================================

create extension if not exists "pgcrypto";

-- ---------- categories ----------------------------------------------
create table if not exists public.categories (
  id            uuid primary key default gen_random_uuid(),
  slug          text not null unique,
  name          text not null,
  parent_id     uuid references public.categories (id) on delete set null,
  description   text,
  image_url     text,
  seo_title     text,
  seo_desc      text,
  is_featured   boolean not null default false,
  sort_order    int not null default 0,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create index if not exists categories_parent_idx on public.categories (parent_id);
create index if not exists categories_featured_idx on public.categories (is_featured);

-- ---------- products ------------------------------------------------
create table if not exists public.products (
  id              uuid primary key default gen_random_uuid(),
  slug            text not null unique,
  name            text not null,
  category_id     uuid not null references public.categories (id) on delete restrict,
  short_desc      text,
  description     text,
  fabric          text,
  price           int not null check (price >= 0),                 -- VND
  compare_price   int check (compare_price is null or compare_price >= price),
  images          jsonb not null default '[]'::jsonb,              -- [string]
  rating          numeric(2,1) not null default 5.0 check (rating between 0 and 5),
  reviews_count   int not null default 0 check (reviews_count >= 0),
  badges          text[] not null default '{}',
  is_active       boolean not null default true,
  is_featured     boolean not null default false,
  is_customizable boolean not null default true,
  min_order       int not null default 1 check (min_order > 0),
  seo_title       text,
  seo_desc        text,
  seo_image       text,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

create index if not exists products_category_idx on public.products (category_id);
create index if not exists products_featured_idx on public.products (is_featured);
create index if not exists products_active_idx on public.products (is_active);

-- ---------- product variants ----------------------------------------
create table if not exists public.product_variants (
  id          uuid primary key default gen_random_uuid(),
  product_id  uuid not null references public.products (id) on delete cascade,
  size        text not null,
  color       text not null,
  color_hex   text,
  stock       int not null default 0 check (stock >= 0),
  sku         text not null unique,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now(),
  unique (product_id, size, color)
);

create index if not exists variants_product_idx on public.product_variants (product_id);

-- ---------- updated_at triggers -------------------------------------
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists categories_set_updated_at on public.categories;
create trigger categories_set_updated_at
  before update on public.categories
  for each row execute function public.set_updated_at();

drop trigger if exists products_set_updated_at on public.products;
create trigger products_set_updated_at
  before update on public.products
  for each row execute function public.set_updated_at();

drop trigger if exists variants_set_updated_at on public.product_variants;
create trigger variants_set_updated_at
  before update on public.product_variants
  for each row execute function public.set_updated_at();
