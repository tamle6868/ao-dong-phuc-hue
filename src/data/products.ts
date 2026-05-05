import type { Product } from "@/types/product";

const SIZES = ["S", "M", "L", "XL", "XXL"] as const;

const COLOR_PRESETS = [
  { color: "Đỏ thẫm", colorHex: "#8b0e0e" },
  { color: "Đen tuyền", colorHex: "#0a0a0a" },
  { color: "Trắng", colorHex: "#ffffff" },
  { color: "Xanh navy", colorHex: "#1e3a8a" },
];

function buildVariants(sku: string, colors = COLOR_PRESETS): Product["variants"] {
  return colors.flatMap((c, ci) =>
    SIZES.map((s, si) => ({
      size: s,
      color: c.color,
      colorHex: c.colorHex,
      stock: 30 + ((ci * 7 + si * 3) % 50),
      sku: `${sku}-${c.color.slice(0, 2).toUpperCase()}-${s}`,
    })),
  );
}

export const products: Product[] = [
  {
    id: "p-001",
    slug: "ao-bong-da-pro-elite",
    name: "Áo bóng đá Pro Elite",
    categorySlug: "ao-bong-da",
    shortDescription: "Vải mè kim cương xuất khẩu, thoáng mát, in chuyển nhiệt sắc nét.",
    description:
      "Áo bóng đá Pro Elite được may từ vải mè kim cương cao cấp, công nghệ dệt 4 chiều giúp người mặc thoải mái vận động. Form áo body fit ôm dáng, đường may chắc chắn, in chuyển nhiệt full màu không bong tróc sau hàng trăm lần giặt. Đặt theo đội từ 11 áo, miễn phí thiết kế logo + in tên số.",
    fabric: "Mè kim cương 4 chiều — 180 GSM",
    price: 165000,
    comparePrice: 220000,
    images: [
      "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=1200&q=80&auto=format",
      "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=1200&q=80&auto=format",
      "https://images.unsplash.com/photo-1577412647305-991150c7d163?w=1200&q=80&auto=format",
    ],
    variants: buildVariants("PRO-ELITE"),
    rating: 4.9,
    reviewsCount: 287,
    badges: ["Bán chạy", "In tên số miễn phí"],
    featured: true,
    customizable: true,
    minOrder: 11,
  },
  {
    id: "p-002",
    slug: "ao-bong-da-classic-stripe",
    name: "Áo bóng đá Classic Stripe",
    categorySlug: "ao-bong-da",
    shortDescription: "Form rộng phong cách cổ điển, sọc tương phản, vải thun lạnh.",
    description:
      "Mẫu áo Classic Stripe lấy cảm hứng từ jersey thập niên 90, chất thun lạnh mịn, không nhăn, độ bền cao. Phù hợp đội phong trào, công ty tổ chức giải nội bộ.",
    fabric: "Thun lạnh — 160 GSM",
    price: 135000,
    comparePrice: 180000,
    images: [
      "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=1200&q=80&auto=format",
      "https://images.unsplash.com/photo-1577412647305-991150c7d163?w=1200&q=80&auto=format",
    ],
    variants: buildVariants("CLASSIC"),
    rating: 4.8,
    reviewsCount: 154,
    badges: ["Mới"],
    customizable: true,
    minOrder: 11,
  },
  {
    id: "p-003",
    slug: "polo-doanh-nghiep-premium",
    name: "Polo doanh nghiệp Premium",
    categorySlug: "dong-phuc-doanh-nghiep",
    shortDescription: "Vải cá sấu cotton 65/35, form chuẩn công sở, thêu logo theo brand.",
    description:
      "Áo polo Premium dành cho doanh nghiệp đề cao sự lịch lãm. Vải cá sấu cotton pha 65/35 giữ form, thấm hút mồ hôi tốt. Hỗ trợ thêu vi tính logo + in pet sườn theo brand guideline.",
    fabric: "Cá sấu cotton 65/35 — 220 GSM",
    price: 195000,
    comparePrice: 260000,
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=1200&q=80&auto=format",
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=1200&q=80&auto=format",
    ],
    variants: buildVariants("POLO-PREM", [
      { color: "Đen tuyền", colorHex: "#0a0a0a" },
      { color: "Trắng", colorHex: "#ffffff" },
      { color: "Xanh navy", colorHex: "#1e3a8a" },
      { color: "Xám tiêu", colorHex: "#52525b" },
    ]),
    rating: 4.9,
    reviewsCount: 412,
    badges: ["B2B", "Thêu logo miễn phí"],
    featured: true,
    customizable: true,
    minOrder: 30,
  },
  {
    id: "p-004",
    slug: "ao-lop-graphic-tee",
    name: "Áo lớp Graphic Tee",
    categorySlug: "dong-phuc-lop",
    shortDescription: "Cotton 100% mềm mịn, in DTF full màu, thiết kế miễn phí.",
    description:
      "Áo lớp Graphic Tee phù hợp các bạn học sinh, sinh viên muốn áo kỷ niệm cá tính. Vải cotton 100% mềm, mặc thoáng. Đội thiết kế hỗ trợ phác thảo miễn phí trong 24h.",
    fabric: "Cotton 100% — 180 GSM",
    price: 115000,
    comparePrice: 150000,
    images: [
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=1200&q=80&auto=format",
      "https://images.unsplash.com/photo-1554568218-0f1715e72254?w=1200&q=80&auto=format",
    ],
    variants: buildVariants("LOP-TEE"),
    rating: 4.8,
    reviewsCount: 326,
    badges: ["Thiết kế miễn phí"],
    featured: true,
    customizable: true,
    minOrder: 20,
  },
  {
    id: "p-005",
    slug: "ao-su-kien-team-building",
    name: "Áo sự kiện Team Building",
    categorySlug: "ao-su-kien",
    shortDescription: "Giao nhanh 3 ngày, in chuyển nhiệt theo brief, MOQ thấp.",
    description:
      "Mẫu áo sự kiện chuyên cho team building, hội thao công ty. Quy trình rút gọn — giao trong 3 ngày kể cả thiết kế.",
    fabric: "Thun lạnh — 150 GSM",
    price: 95000,
    images: [
      "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=1200&q=80&auto=format",
    ],
    variants: buildVariants("EVENT"),
    rating: 4.7,
    reviewsCount: 89,
    badges: ["Giao 3 ngày"],
    customizable: true,
    minOrder: 15,
  },
  {
    id: "p-006",
    slug: "ao-gio-doanh-nghiep",
    name: "Áo gió doanh nghiệp",
    categorySlug: "dong-phuc-doanh-nghiep",
    shortDescription: "2 lớp gió cao cấp, in/thêu logo, phù hợp mùa thu đông.",
    description:
      "Áo gió 2 lớp với lớp ngoài chống gió nhẹ và lớp trong bo cá sấu giữ ấm. Lý tưởng làm quà tặng cuối năm cho nhân viên.",
    fabric: "Gió 2 lớp lót cá sấu",
    price: 285000,
    comparePrice: 380000,
    images: [
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=1200&q=80&auto=format",
    ],
    variants: buildVariants("JACKET", [
      { color: "Đen tuyền", colorHex: "#0a0a0a" },
      { color: "Đỏ thẫm", colorHex: "#8b0e0e" },
      { color: "Xanh navy", colorHex: "#1e3a8a" },
    ]),
    rating: 4.9,
    reviewsCount: 167,
    customizable: true,
    minOrder: 20,
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(categorySlug: string): Product[] {
  return products.filter((p) => p.categorySlug === categorySlug);
}

export function getFeaturedProducts(limit = 6): Product[] {
  return products.filter((p) => p.featured).slice(0, limit);
}
