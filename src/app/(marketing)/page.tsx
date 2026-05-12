import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Sparkles,
  Star,
  Users,
  Clock,
  Award,
} from "lucide-react";
import { getCategories } from "@/lib/data/categories";
import { getFeaturedProducts } from "@/lib/data/products";
import { partners, testimonials } from "@/data/partners";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { ProductGrid } from "@/components/product/product-grid";
import { TrustBar } from "@/components/landing/trust-bar";
import { LeadForm } from "@/components/landing/lead-form";
import { FaqAccordion } from "@/components/marketing/faq-accordion";
import { BUSINESS_INFO } from "@/lib/constants";

const HOME_FAQ = [
  {
    q: "Mình đặt số lượng ít (10-15 áo) có được không?",
    a: "Được. MOQ chỉ từ 11 áo cho đội bóng phong trào, và từ 20 áo cho đồng phục doanh nghiệp. Càng nhiều, đơn giá càng ưu đãi — bậc giá hạ dần theo số lượng.",
  },
  {
    q: "Đặt áo mất bao lâu từ lúc chốt mẫu?",
    a: "Trung bình 5-7 ngày làm việc. Quy trình: 1 ngày phối mẫu 3D → 1 ngày duyệt → 3 ngày may + in → 1 ngày QC + giao. Cần gấp? Bạn nhắn đội ngũ, mình có gói làm nhanh 48h trong khu vực Huế — Đà Nẵng.",
  },
  {
    q: "Vải có bền không? Giặt máy được không?",
    a: "Vải mè kim cương 4 chiều (180 GSM) chúng mình dùng được xuất khẩu sang Hàn — chịu được giặt máy thường xuyên, không phai màu, không xù sau hàng trăm lần. Đặc biệt in chuyển nhiệt bảo hành 12 tháng không bong tróc.",
  },
  {
    q: "Mình không biết thiết kế, cần thuê designer riêng không?",
    a: "Không. Designer in-house hỗ trợ phối 4 mẫu miễn phí theo logo / tên đội / màu sắc bạn yêu cầu. Chỉnh sửa tự do đến khi bạn ưng ý. Không phụ thu thêm.",
  },
  {
    q: "Thanh toán ra sao? Có cọc không?",
    a: "Đặt cọc 30% sau khi duyệt mẫu, thanh toán hết khi nhận hàng. Hỗ trợ chuyển khoản, tiền mặt, COD tại Huế - Đà Nẵng. Doanh nghiệp có thể xuất hóa đơn VAT.",
  },
  {
    q: "Đối với áo lớp / kỷ niệm thì sao? Giá có ưu đãi không?",
    a: "Mình có gói riêng cho áo lớp 12 — đại học, giá từ 95k/áo (in số + tên). Phối graphic vintage / streetwear / club-style theo yêu cầu. Đặt sớm 2 tuần trước lễ bế giảng để kịp may.",
  },
];

export default async function HomePage() {
  const [categories, featured] = await Promise.all([
    getCategories(),
    getFeaturedProducts(8),
  ]);

  return (
    <>
      {/* HERO */}
      <section className="relative isolate overflow-hidden bg-accent text-accent-foreground">
        <div
          aria-hidden
          className="absolute inset-0 -z-10 opacity-40"
          style={{
            backgroundImage:
              "radial-gradient(circle at 15% 15%, rgba(220,38,38,0.55) 0%, transparent 55%), radial-gradient(circle at 85% 85%, rgba(139,14,14,0.45) 0%, transparent 65%), radial-gradient(circle at 50% 100%, rgba(255,200,150,0.12) 0%, transparent 60%)",
          }}
        />
        <div
          aria-hidden
          className="absolute inset-0 -z-10 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.6) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 py-12 md:grid-cols-2 md:gap-12 md:px-6 md:py-20">
          <div className="space-y-5">
            <Badge variant="primary" className="bg-primary/90">
              <Sparkles className="mr-1 h-3 w-3" />
              Đồng phục Premium #1 tại Huế
            </Badge>
            <h1 className="font-display text-4xl leading-[0.95] tracking-wide md:text-6xl lg:text-7xl">
              ĐỒNG PHỤC{" "}
              <span className="bg-gradient-to-r from-primary via-rose-400 to-amber-300 bg-clip-text text-transparent">
                CAO CẤP
              </span>
              <br />
              CHO ĐỘI CỦA BẠN
            </h1>
            <p className="max-w-md text-base text-white/80 md:text-lg">
              Áo bóng đá, đồng phục doanh nghiệp, áo lớp — vải xịn, in sắc nét,
              giao 3-7 ngày. <strong className="text-white">287 đội đã đặt trong 30 ngày qua.</strong>
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                href="/landing/dong-phuc-doanh-nghiep"
                className={cn(buttonVariants({ size: "xl" }))}
              >
                Nhận mẫu 3D miễn phí
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/san-pham"
                className={cn(
                  buttonVariants({ size: "xl", variant: "outline" }),
                  "border-white/20 bg-white/5 text-white hover:bg-white/10",
                )}
              >
                Xem sản phẩm
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-3 pt-4 sm:grid-cols-4 sm:gap-x-6">
              {[
                { icon: Star, value: "4.9/5", label: "156 reviews" },
                { icon: Users, value: "1.240+", label: "đơn giao" },
                { icon: Clock, value: "5-7 ngày", label: "giao toàn quốc" },
                { icon: Award, value: "12 tháng", label: "BH in ép" },
              ].map(({ icon: Icon, value, label }) => (
                <div key={value} className="flex items-start gap-2">
                  <Icon className="mt-0.5 h-4 w-4 shrink-0 text-warning" />
                  <div className="leading-tight">
                    <p className="text-sm font-bold text-white">{value}</p>
                    <p className="text-[11px] text-white/60">{label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-white/10 bg-white/5 md:aspect-square">
            <Image
              src="https://images.unsplash.com/photo-1770155590942-49d858bc5401?w=1200&q=85&auto=format"
              alt="Áo bóng đá thiết kế cao cấp"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute left-3 top-3 rounded-md bg-warning/95 px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-black">
              Hot · 287 đơn / 30 ngày
            </div>
          </div>
        </div>
      </section>

      <TrustBar partners={partners} />

      {/* CATEGORIES */}
      <section className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16">
        <header className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-primary">
              Danh mục sản phẩm
            </p>
            <h2 className="font-display text-2xl tracking-wide md:text-4xl">
              CHỌN DÒNG ÁO PHÙ HỢP
            </h2>
          </div>
          <Link
            href="/san-pham"
            className="hidden items-center gap-1 text-sm font-semibold text-primary hover:underline md:inline-flex"
          >
            Tất cả <ArrowRight className="h-4 w-4" />
          </Link>
        </header>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {categories.map((c) => (
            <Link
              key={c.id}
              href={`/san-pham?danh-muc=${c.slug}`}
              className="group relative overflow-hidden rounded-xl border border-border tap-shrink"
            >
              <div className="relative aspect-[4/5] bg-muted">
                <Image
                  src={c.image}
                  alt={c.name}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-4 text-white">
                  <h3 className="font-display text-lg tracking-wide">
                    {c.name.toUpperCase()}
                  </h3>
                  <p className="mt-0.5 line-clamp-2 text-xs text-white/75">
                    {c.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="mx-auto max-w-7xl px-4 pb-12 md:px-6 md:pb-16">
        <header className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-primary">
              Sản phẩm bán chạy
            </p>
            <h2 className="font-display text-2xl tracking-wide md:text-4xl">
              ĐƯỢC ĐẶT NHIỀU NHẤT
            </h2>
          </div>
          <Link
            href="/san-pham"
            className="hidden items-center gap-1 text-sm font-semibold text-primary hover:underline md:inline-flex"
          >
            Xem tất cả <ArrowRight className="h-4 w-4" />
          </Link>
        </header>
        <ProductGrid products={featured} priorityCount={2} />
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-muted/40 py-14">
        <div className="mx-auto max-w-5xl px-4">
          <header className="text-center">
            <p className="text-xs font-bold uppercase tracking-widest text-primary">
              Khách hàng nói gì
            </p>
            <h2 className="mt-2 font-display text-2xl tracking-wide md:text-4xl">
              ĐƯỢC TIN CHỌN BỞI 1.200+ ĐỘI & DOANH NGHIỆP
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              4.9/5 trung bình · 156 đánh giá · 99% khách hàng quay lại
            </p>
          </header>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {testimonials.map((t) => (
              <div
                key={t.id}
                className="rounded-xl border border-border bg-background p-5 shadow-[var(--shadow-soft)]"
              >
                <div className="flex gap-0.5 text-warning">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-warning" />
                  ))}
                </div>
                <p className="mt-3 text-sm leading-relaxed text-foreground/85">
                  “{t.content}”
                </p>
                <div className="mt-4 flex items-center gap-3">
                  <Image
                    src={t.avatar}
                    alt={t.name}
                    width={40}
                    height={40}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                  <div className="leading-tight">
                    <p className="text-sm font-semibold">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-3xl px-4 py-14">
        <header className="mb-8 text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-primary">
            Câu hỏi thường gặp
          </p>
          <h2 className="mt-2 font-display text-2xl tracking-wide md:text-4xl">
            BẠN THƯỜNG HỎI CHÚNG MÌNH
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Không tìm thấy câu trả lời? Gọi {BUSINESS_INFO.phone} — tư vấn viên trả lời trong 1 phút.
          </p>
        </header>
        <FaqAccordion items={HOME_FAQ} />
      </section>

      {/* CTA + LEAD */}
      <section id="bao-gia" className="mx-auto max-w-5xl px-4 py-14">
        <div className="grid items-center gap-8 md:grid-cols-2 md:gap-12">
          <div className="space-y-4">
            <p className="text-xs font-bold uppercase tracking-widest text-primary">
              Liên hệ ngay
            </p>
            <h2 className="font-display text-3xl tracking-wide md:text-5xl">
              CHƯA BIẾT BẮT ĐẦU TỪ ĐÂU?
            </h2>
            <p className="text-base text-muted-foreground">
              Để lại số điện thoại — đội ngũ {BUSINESS_INFO.name} sẽ tư vấn miễn phí
              chất vải, form dáng, in ấn phù hợp ngân sách của bạn.
            </p>
            <ul className="space-y-2 text-sm">
              {[
                "Tư vấn 1-1 với chuyên viên có 5+ năm kinh nghiệm",
                "Mẫu 3D miễn phí trong 30 phút (giờ hành chính)",
                "Báo giá rõ ràng, không phát sinh chi phí",
              ].map((s) => (
                <li key={s} className="flex items-center gap-2">
                  <span className="grid h-5 w-5 place-items-center rounded-full bg-primary text-[10px] text-primary-foreground">
                    ✓
                  </span>
                  {s}
                </li>
              ))}
            </ul>
          </div>
          <LeadForm source="home" variant="quote" />
        </div>
      </section>
    </>
  );
}
