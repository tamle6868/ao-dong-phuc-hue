-- =====================================================================
-- 0003_leads.sql — Marketing leads from landing pages
-- =====================================================================

create type lead_variant as enum ('quote', 'mockup3d');

create table if not exists public.leads (
  id              uuid primary key default gen_random_uuid(),
  full_name       text not null,
  phone           text not null,
  email           text,
  company         text,
  qty             text,
  message         text,
  source          text not null,                                   -- e.g. 'ao-bong-da-thiet-ke', 'home', 'footer'
  variant         lead_variant not null default 'quote',
  status          text not null default 'new'
                  check (status in ('new', 'contacted', 'won', 'lost')),
  utm_source      text,
  utm_medium      text,
  utm_campaign    text,
  utm_content     text,
  utm_term        text,
  user_agent      text,
  ip_hash         text,                                            -- hashed for privacy
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

create index if not exists leads_source_idx on public.leads (source);
create index if not exists leads_status_idx on public.leads (status);
create index if not exists leads_created_idx on public.leads (created_at desc);
create index if not exists leads_phone_idx on public.leads (phone);

drop trigger if exists leads_set_updated_at on public.leads;
create trigger leads_set_updated_at
  before update on public.leads
  for each row execute function public.set_updated_at();
