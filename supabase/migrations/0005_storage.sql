-- =====================================================================
-- 0005_storage.sql — Supabase Storage bucket for product images
-- =====================================================================
-- Strategy:
--   * `product-images` bucket: public read, server-only writes (service_role).
--   * Filenames generated on the server with random UUID prefix to avoid
--     enumeration / collision.
--   * Mock-data URLs (Unsplash) keep working — only newly uploaded admin
--     images go into this bucket.
-- =====================================================================

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'product-images',
  'product-images',
  true,
  5 * 1024 * 1024, -- 5 MB cap
  array['image/jpeg', 'image/png', 'image/webp', 'image/avif']
)
on conflict (id) do update
  set public = excluded.public,
      file_size_limit = excluded.file_size_limit,
      allowed_mime_types = excluded.allowed_mime_types;

-- Storage RLS lives on `storage.objects`. Reads are public; writes restricted.
drop policy if exists product_images_public_read on storage.objects;
create policy product_images_public_read on storage.objects
  for select to anon, authenticated
  using (bucket_id = 'product-images');

-- Admin writes happen via the service-role client (which bypasses RLS by
-- default), so we do NOT add policies for INSERT/UPDATE/DELETE here.
-- Authenticated end-users cannot upload directly.
