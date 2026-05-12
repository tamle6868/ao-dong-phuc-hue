/**
 * Single source of truth for brand info, contact details, and global config.
 * Values can be overridden via environment variables (see .env.example).
 */

export const BUSINESS_INFO = {
  name: "Áo Đồng Phục Huế",
  legalName: "Áo Đồng Phục Huế",
  tagline: "Đồng phục thể thao & doanh nghiệp cao cấp tại Huế",
  description:
    "Xưởng may đồng phục Huế chuyên áo bóng đá thiết kế, đồng phục công ty, áo lớp, áo nhóm — vải xịn, in ép sắc nét, giao hàng toàn quốc.",
  phone: "0905 000 000",
  phoneE164: "+84905000000",
  zalo: "0905000000",
  email: "aobongdahuehot@gmail.com",
  address: {
    streetAddress: "123 Đường Lê Lợi",
    addressLocality: "Phường Phú Hội",
    addressRegion: "TP. Huế",
    postalCode: "530000",
    addressCountry: "VN",
  },
  geo: {
    latitude: 16.4637,
    longitude: 107.5909,
  },
  openingHours: [
    { days: ["Mo", "Tu", "We", "Th", "Fr", "Sa"], opens: "08:00", closes: "21:00" },
    { days: ["Su"], opens: "08:00", closes: "18:00" },
  ],
  socials: {
    facebook: "https://www.facebook.com/aodongphuchue",
    tiktok: "https://www.tiktok.com/@aodongphuchue",
    instagram: "https://www.instagram.com/aodongphuchue",
  },
  shippingAreas: ["Huế", "Đà Nẵng", "Quảng Trị", "Quảng Bình", "Toàn quốc"],
} as const;

export const SITE = {
  url:
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    "https://aodongphuchue.vn",
  defaultOgImage: "/og-default.jpg",
  twitterHandle: "@aodongphuchue",
  locale: "vi_VN",
} as const;

export const PRIMARY_NAV = [
  { href: "/", label: "Trang chủ" },
  { href: "/san-pham", label: "Sản phẩm" },
  { href: "/landing/ao-bong-da-thiet-ke", label: "Áo bóng đá" },
  { href: "/landing/dong-phuc-doanh-nghiep", label: "Doanh nghiệp" },
  { href: "/khach-hang-tieu-bieu", label: "Khách hàng" },
  { href: "/lien-he", label: "Liên hệ" },
] as const;

export const BOTTOM_NAV = [
  { href: "/", label: "Trang chủ", icon: "home" },
  { href: "/san-pham", label: "Sản phẩm", icon: "shirt" },
  { href: "/lien-he#bao-gia", label: "Báo giá", icon: "sparkles", primary: true },
  { href: "https://zalo.me/0905000000", label: "Zalo", icon: "message-circle", external: true },
  { href: "tel:+84905000000", label: "Gọi ngay", icon: "phone", external: true },
] as const;
