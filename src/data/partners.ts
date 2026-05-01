import type { Partner, Testimonial } from "@/types/product";

export const partners: Partner[] = [
  { id: "p1", name: "Vietravel Huế", logo: "/partners/vietravel.svg" },
  { id: "p2", name: "Khách sạn Indochine Palace", logo: "/partners/indochine.svg" },
  { id: "p3", name: "FPT Software Huế", logo: "/partners/fpt.svg" },
  { id: "p4", name: "Đại học Huế", logo: "/partners/dhh.svg" },
  { id: "p5", name: "Bệnh viện TW Huế", logo: "/partners/bvtw.svg" },
  { id: "p6", name: "Saigontourist", logo: "/partners/saigontourist.svg" },
];

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Anh Minh — FC Sông Hương",
    role: "Đội trưởng",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80",
    rating: 5,
    content:
      "Áo Pro Elite mặc đá phong trào hơn 1 năm vẫn chưa phai màu. In tên số sắc nét, giặt máy thoải mái.",
  },
  {
    id: "t2",
    name: "Chị Hằng — Indochine Palace",
    role: "Trưởng phòng nhân sự",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80",
    rating: 5,
    content:
      "Đặt 320 áo polo cho khách sạn, đội ngũ giao mẫu 3D trong 30 phút và sản xuất đúng tiến độ. Rất hài lòng.",
  },
  {
    id: "t3",
    name: "Bạn Linh — Lớp 12A1 Quốc Học",
    role: "Lớp trưởng",
    avatar:
      "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200&q=80",
    rating: 5,
    content:
      "Cả lớp 45 bạn đặt áo kỷ niệm, được thiết kế miễn phí 4 phương án, chốt rất nhanh. Áo mặc êm.",
  },
];
