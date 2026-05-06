-- =====================================================================
-- seed.sql — initial categories + products + variants
-- Idempotent: re-runnable. Uses ON CONFLICT (slug) DO NOTHING.
-- Run AFTER 0001 → 0004 migrations.
-- =====================================================================

-- ---------- categories ----------------------------------------------
insert into public.categories (slug, name, description, image_url, is_featured, sort_order)
values
  (
    'ao-bong-da',
    'Áo bóng đá',
    'Áo đá banh thiết kế riêng, in tên số theo yêu cầu, vải mè xuất khẩu.',
    'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=1200&q=80&auto=format',
    true, 10
  ),
  (
    'dong-phuc-doanh-nghiep',
    'Đồng phục doanh nghiệp',
    'Polo, sơ mi, áo gió đồng phục công ty — chuẩn brand identity.',
    'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=1200&q=80&auto=format',
    true, 20
  ),
  (
    'dong-phuc-lop',
    'Đồng phục lớp',
    'Áo lớp, áo nhóm, áo kỷ niệm — thiết kế miễn phí.',
    'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=1200&q=80&auto=format',
    true, 30
  ),
  (
    'ao-su-kien',
    'Áo sự kiện',
    'Áo team building, hội thao, sự kiện ngắn hạn — giao nhanh 3 ngày.',
    'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=1200&q=80&auto=format',
    false, 40
  )
on conflict (slug) do nothing;

-- ---------- products ------------------------------------------------
with cat as (select id, slug from public.categories)
insert into public.products (
  slug, name, category_id, short_desc, description, fabric,
  price, compare_price, images,
  rating, reviews_count, badges,
  is_active, is_featured, is_customizable, min_order
)
select v.slug, v.name, cat.id, v.short_desc, v.description, v.fabric,
       v.price, v.compare_price, v.images,
       v.rating, v.reviews_count, v.badges,
       true, v.is_featured, true, v.min_order
from (values
  (
    'ao-bong-da-pro-elite',
    'Áo bóng đá Pro Elite',
    'ao-bong-da',
    'Vải mè kim cương xuất khẩu, thoáng mát, in chuyển nhiệt sắc nét.',
    'Áo bóng đá Pro Elite được may từ vải mè kim cương cao cấp, công nghệ dệt 4 chiều giúp người mặc thoải mái vận động. Form áo body fit ôm dáng, đường may chắc chắn, in chuyển nhiệt full màu không bong tróc sau hàng trăm lần giặt. Đặt theo đội từ 11 áo, miễn phí thiết kế logo + in tên số.',
    'Mè kim cương 4 chiều — 180 GSM',
    165000, 220000,
    '["https://images.unsplash.com/photo-1517649763962-0c623066013b?w=1200&q=80&auto=format","https://images.unsplash.com/photo-1556906781-9a412961c28c?w=1200&q=80&auto=format","https://images.unsplash.com/photo-1577412647305-991150c7d163?w=1200&q=80&auto=format"]'::jsonb,
    4.9, 287, ARRAY['Bán chạy','In tên số miễn phí'],
    true, 11
  ),
  (
    'ao-bong-da-classic-stripe',
    'Áo bóng đá Classic Stripe',
    'ao-bong-da',
    'Form rộng phong cách cổ điển, sọc tương phản, vải thun lạnh.',
    'Mẫu áo Classic Stripe lấy cảm hứng từ jersey thập niên 90, chất thun lạnh mịn, không nhăn, độ bền cao. Phù hợp đội phong trào, công ty tổ chức giải nội bộ.',
    'Thun lạnh — 160 GSM',
    135000, 180000,
    '["https://images.unsplash.com/photo-1556906781-9a412961c28c?w=1200&q=80&auto=format","https://images.unsplash.com/photo-1577412647305-991150c7d163?w=1200&q=80&auto=format"]'::jsonb,
    4.8, 154, ARRAY['Mới'],
    false, 11
  ),
  (
    'polo-doanh-nghiep-premium',
    'Polo doanh nghiệp Premium',
    'dong-phuc-doanh-nghiep',
    'Vải cá sấu cotton 65/35, form chuẩn công sở, thêu logo theo brand.',
    'Áo polo Premium dành cho doanh nghiệp đề cao sự lịch lãm. Vải cá sấu cotton pha 65/35 giữ form, thấm hút mồ hôi tốt. Hỗ trợ thêu vi tính logo + in pet sườn theo brand guideline.',
    'Cá sấu cotton 65/35 — 220 GSM',
    195000, 260000,
    '["https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=1200&q=80&auto=format","https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=1200&q=80&auto=format"]'::jsonb,
    4.9, 412, ARRAY['B2B','Thêu logo miễn phí'],
    true, 30
  ),
  (
    'ao-lop-graphic-tee',
    'Áo lớp Graphic Tee',
    'dong-phuc-lop',
    'Cotton 100% mềm mịn, in DTF full màu, thiết kế miễn phí.',
    'Áo lớp Graphic Tee phù hợp các bạn học sinh, sinh viên muốn áo kỷ niệm cá tính. Vải cotton 100% mềm, mặc thoáng. Đội thiết kế hỗ trợ phác thảo miễn phí trong 24h.',
    'Cotton 100% — 180 GSM',
    115000, 150000,
    '["https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=1200&q=80&auto=format","https://images.unsplash.com/photo-1554568218-0f1715e72254?w=1200&q=80&auto=format"]'::jsonb,
    4.8, 326, ARRAY['Thiết kế miễn phí'],
    true, 20
  ),
  (
    'ao-su-kien-team-building',
    'Áo sự kiện Team Building',
    'ao-su-kien',
    'Giao nhanh 3 ngày, in chuyển nhiệt theo brief, MOQ thấp.',
    'Mẫu áo sự kiện chuyên cho team building, hội thao công ty. Quy trình rút gọn — giao trong 3 ngày kể cả thiết kế.',
    'Thun lạnh — 150 GSM',
    95000, NULL,
    '["https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=1200&q=80&auto=format"]'::jsonb,
    4.7, 89, ARRAY['Giao 3 ngày'],
    false, 15
  ),
  (
    'ao-gio-doanh-nghiep',
    'Áo gió doanh nghiệp',
    'dong-phuc-doanh-nghiep',
    '2 lớp gió cao cấp, in/thêu logo, phù hợp mùa thu đông.',
    'Áo gió 2 lớp với lớp ngoài chống gió nhẹ và lớp trong bo cá sấu giữ ấm. Lý tưởng làm quà tặng cuối năm cho nhân viên.',
    'Gió 2 lớp lót cá sấu',
    285000, 380000,
    '["https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=1200&q=80&auto=format"]'::jsonb,
    4.9, 167, ARRAY[]::text[],
    false, 20
  )
) as v(slug, name, cat_slug, short_desc, description, fabric, price, compare_price, images, rating, reviews_count, badges, is_featured, min_order)
join cat on cat.slug = v.cat_slug
on conflict (slug) do nothing;

-- ---------- variants ------------------------------------------------
-- Mirrors src/data/products.ts buildVariants():
--   stock = 30 + ((color_idx * 7 + size_idx * 3) % 50)
--   sku   = "{prefix}-{upper(color[:2])}-{size}"
with
  conf(slug, prefix, color_idx, color, color_hex) as (
    values
      ('ao-bong-da-pro-elite',      'PRO-ELITE', 0, 'Đỏ thẫm',    '#8b0e0e'),
      ('ao-bong-da-pro-elite',      'PRO-ELITE', 1, 'Đen tuyền',  '#0a0a0a'),
      ('ao-bong-da-pro-elite',      'PRO-ELITE', 2, 'Trắng',      '#ffffff'),
      ('ao-bong-da-pro-elite',      'PRO-ELITE', 3, 'Xanh navy',  '#1e3a8a'),
      ('ao-bong-da-classic-stripe', 'CLASSIC',   0, 'Đỏ thẫm',    '#8b0e0e'),
      ('ao-bong-da-classic-stripe', 'CLASSIC',   1, 'Đen tuyền',  '#0a0a0a'),
      ('ao-bong-da-classic-stripe', 'CLASSIC',   2, 'Trắng',      '#ffffff'),
      ('ao-bong-da-classic-stripe', 'CLASSIC',   3, 'Xanh navy',  '#1e3a8a'),
      ('polo-doanh-nghiep-premium', 'POLO-PREM', 0, 'Đen tuyền',  '#0a0a0a'),
      ('polo-doanh-nghiep-premium', 'POLO-PREM', 1, 'Trắng',      '#ffffff'),
      ('polo-doanh-nghiep-premium', 'POLO-PREM', 2, 'Xanh navy',  '#1e3a8a'),
      ('polo-doanh-nghiep-premium', 'POLO-PREM', 3, 'Xám tiêu',   '#52525b'),
      ('ao-lop-graphic-tee',        'LOP-TEE',   0, 'Đỏ thẫm',    '#8b0e0e'),
      ('ao-lop-graphic-tee',        'LOP-TEE',   1, 'Đen tuyền',  '#0a0a0a'),
      ('ao-lop-graphic-tee',        'LOP-TEE',   2, 'Trắng',      '#ffffff'),
      ('ao-lop-graphic-tee',        'LOP-TEE',   3, 'Xanh navy',  '#1e3a8a'),
      ('ao-su-kien-team-building',  'EVENT',     0, 'Đỏ thẫm',    '#8b0e0e'),
      ('ao-su-kien-team-building',  'EVENT',     1, 'Đen tuyền',  '#0a0a0a'),
      ('ao-su-kien-team-building',  'EVENT',     2, 'Trắng',      '#ffffff'),
      ('ao-su-kien-team-building',  'EVENT',     3, 'Xanh navy',  '#1e3a8a'),
      ('ao-gio-doanh-nghiep',       'JACKET',    0, 'Đen tuyền',  '#0a0a0a'),
      ('ao-gio-doanh-nghiep',       'JACKET',    1, 'Đỏ thẫm',    '#8b0e0e'),
      ('ao-gio-doanh-nghiep',       'JACKET',    2, 'Xanh navy',  '#1e3a8a')
  ),
  sizes(size, size_idx) as (
    values ('S', 0), ('M', 1), ('L', 2), ('XL', 3), ('XXL', 4)
  )
insert into public.product_variants (product_id, size, color, color_hex, stock, sku)
select
  p.id,
  s.size,
  c.color,
  c.color_hex,
  30 + ((c.color_idx * 7 + s.size_idx * 3) % 50),
  c.prefix || '-' || upper(substr(c.color, 1, 2)) || '-' || s.size
from conf c
join public.products p on p.slug = c.slug
cross join sizes s
on conflict (sku) do nothing;
