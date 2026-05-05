-- =====================================================================
-- seed.sql — Minimal demo data so the storefront has something to show
-- =====================================================================
-- Run AFTER all migrations.
-- =====================================================================

insert into public.categories (slug, name, description, image_url, is_featured, sort_order) values
  ('ao-bong-da', 'Áo bóng đá', 'Áo đá banh thiết kế riêng, in tên số theo yêu cầu, vải mè xuất khẩu.', 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=1200', true, 1),
  ('dong-phuc-doanh-nghiep', 'Đồng phục doanh nghiệp', 'Polo, sơ mi, áo gió đồng phục công ty — chuẩn brand identity.', 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=1200', true, 2),
  ('dong-phuc-lop', 'Đồng phục lớp', 'Áo lớp, áo nhóm, áo kỷ niệm — thiết kế miễn phí.', 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=1200', true, 3),
  ('ao-su-kien', 'Áo sự kiện', 'Áo team building, hội thao, sự kiện ngắn hạn — giao nhanh 3 ngày.', 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=1200', false, 4)
on conflict (slug) do nothing;

-- Featured product: Pro Elite jersey
insert into public.products (slug, name, category_id, short_desc, description, fabric, price, compare_price, images, rating, reviews_count, badges, is_featured, min_order)
select
  'ao-bong-da-pro-elite',
  'Áo bóng đá Pro Elite',
  c.id,
  'Vải mè kim cương xuất khẩu, thoáng mát, in chuyển nhiệt sắc nét.',
  'Áo bóng đá Pro Elite được may từ vải mè kim cương cao cấp, công nghệ dệt 4 chiều giúp người mặc thoải mái vận động. Form áo body fit ôm dáng, đường may chắc chắn.',
  'Mè kim cương 4 chiều — 180 GSM',
  165000,
  220000,
  '["https://images.unsplash.com/photo-1517649763962-0c623066013b?w=1200","https://images.unsplash.com/photo-1556906781-9a412961c28c?w=1200"]'::jsonb,
  4.9,
  287,
  array['Bán chạy','In tên số miễn phí'],
  true,
  11
from public.categories c
where c.slug = 'ao-bong-da'
on conflict (slug) do nothing;
