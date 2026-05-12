export type CaseStudy = {
  slug: string;
  client: string;
  industry: string;
  /** Short pitch that fits in a card. */
  tagline: string;
  /** Quantity ordered. */
  qty: number;
  /** Product type (polo, áo bóng đá, áo lớp...). */
  productType: string;
  /** Lead time in days. */
  leadDays: number;
  /** 1-line outcome / quote. */
  outcome: string;
  /** Hero image URL. Replace with real photos in polish/c. */
  image: string;
  /** Optional avatar / logo URL. */
  avatar?: string;
  /** Customer testimonial. */
  quote: {
    person: string;
    role: string;
    content: string;
    rating: 1 | 2 | 3 | 4 | 5;
  };
  /** Tags for filter / SEO. */
  tags: string[];
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "fc-song-huong",
    client: "FC Sông Hương",
    industry: "Đội bóng phong trào",
    tagline: "Đặt 18 áo Pro Elite cho mùa giải khu vực Huế",
    qty: 18,
    productType: "Áo bóng đá Pro Elite",
    leadDays: 5,
    outcome: "In tên + số 2 mặt, vải mè kim cương 180 GSM, mặc 1 mùa vẫn như mới.",
    image:
      "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1200&q=85&auto=format",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80",
    quote: {
      person: "Anh Minh",
      role: "Đội trưởng FC Sông Hương",
      content:
        "Áo Pro Elite mặc đá phong trào hơn 1 năm vẫn chưa phai màu. In tên số sắc nét, giặt máy thoải mái.",
      rating: 5,
    },
    tags: ["áo bóng đá", "đội bóng phong trào", "in tên số"],
  },
  {
    slug: "indochine-palace",
    client: "Khách sạn Indochine Palace",
    industry: "Khách sạn 5 sao",
    tagline: "320 áo polo cho lễ tân & nhân viên buồng phòng",
    qty: 320,
    productType: "Polo Premium cá sấu cotton",
    leadDays: 12,
    outcome: "Thêu logo brand 5 màu, vải cá sấu 220 GSM, đồng nhất size cho 4 phòng ban.",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=1200&q=85&auto=format",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80",
    quote: {
      person: "Chị Hằng",
      role: "Trưởng phòng nhân sự, Indochine Palace",
      content:
        "Đặt 320 áo polo cho khách sạn, đội ngũ giao mẫu 3D trong 30 phút và sản xuất đúng tiến độ. Rất hài lòng.",
      rating: 5,
    },
    tags: ["polo doanh nghiệp", "khách sạn", "thêu logo"],
  },
  {
    slug: "lop-12a1-quoc-hoc",
    client: "Lớp 12A1 Quốc Học Huế",
    industry: "Áo lớp kỷ niệm",
    tagline: "45 áo lớp Graphic streetwear cho lễ bế giảng",
    qty: 45,
    productType: "Áo lớp Graphic",
    leadDays: 7,
    outcome: "Designer phối 4 mẫu graphic miễn phí, in tên từng bạn, vải cotton co giãn dễ mặc.",
    image:
      "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=1200&q=85&auto=format",
    avatar:
      "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200&q=80",
    quote: {
      person: "Bạn Linh",
      role: "Lớp trưởng 12A1",
      content:
        "Cả lớp 45 bạn đặt áo kỷ niệm, được thiết kế miễn phí 4 phương án, chốt rất nhanh. Áo mặc êm, in tên rõ.",
      rating: 5,
    },
    tags: ["áo lớp", "kỷ niệm", "graphic"],
  },
  {
    slug: "fpt-software-hue",
    client: "FPT Software Huế",
    industry: "Tập đoàn công nghệ",
    tagline: "180 áo polo team building Q4",
    qty: 180,
    productType: "Polo Premium",
    leadDays: 8,
    outcome: "Thêu logo + slogan team, đóng gói riêng theo phòng ban, giao tận trụ sở.",
    image:
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1200&q=85&auto=format",
    quote: {
      person: "Anh Tuấn",
      role: "Trưởng phòng truyền thông nội bộ, FPT Software",
      content:
        "Áo polo team building chất vải đẹp, thêu logo chuẩn brand. Đặt thêm đợt sau giữ giá nguyên.",
      rating: 5,
    },
    tags: ["polo doanh nghiệp", "team building", "tech"],
  },
  {
    slug: "dh-hue-team-building",
    client: "Đại học Huế",
    industry: "Giáo dục",
    tagline: "60 áo team building khoa CNTT",
    qty: 60,
    productType: "Áo polo cotton",
    leadDays: 6,
    outcome: "Thiết kế graphic theo concept khoa, in DTG full màu, có kèm áo dự phòng.",
    image:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=1200&q=85&auto=format",
    quote: {
      person: "Thầy Nam",
      role: "Khoa CNTT, Đại học Huế",
      content:
        "Đội ngũ tư vấn thiết kế 3 mockup miễn phí, các bạn sinh viên ưng ngay. Vải mặc thoáng phù hợp Huế nóng.",
      rating: 5,
    },
    tags: ["áo team building", "giáo dục", "graphic"],
  },
  {
    slug: "fc-vy-da",
    client: "FC Vỹ Dạ",
    industry: "Đội bóng phong trào",
    tagline: "22 áo Classic Stripe cho giải phong trào",
    qty: 22,
    productType: "Áo bóng đá Classic Stripe",
    leadDays: 4,
    outcome: "Form body fit, mè kim cương 180 GSM, in patch tay áo nhà tài trợ.",
    image:
      "https://images.unsplash.com/photo-1577471488278-16eec37ffcc2?w=1200&q=85&auto=format",
    quote: {
      person: "Anh Phong",
      role: "HLV FC Vỹ Dạ",
      content:
        "Đặt gấp 4 ngày để kịp giải, đội ngũ giao đúng hẹn. Áo mặc co giãn, không cản chạy.",
      rating: 5,
    },
    tags: ["áo bóng đá", "đội bóng phong trào", "phong trào"],
  },
];
