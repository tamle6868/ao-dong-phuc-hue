import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles, Truck, ShieldCheck, Star } from "lucide-react";
import { categories } from "@/data/categories";
import { getFeaturedProducts } from "@/data/products";
import { partners, testimonials } from "@/data/partners";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { ProductGrid } from "@/components/product/product-grid";
import { TrustBar } from "@/components/landing/trust-bar";
import { LeadForm } from "@/components/landing/lead-form";
import { BUSINESS_INFO } from "@/lib/constants";

export default function HomePage() {
  const featured = getFeaturedProducts(8);

  return (
    <>
      {/* HERO */}
      <section className="relative isolate overflow-hidden bg-accent text-accent-foreground">
        <div
          aria-hidden
          className="absolute inset-0 -z-10 opacity-30"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 20%, rgba(139,14,14,0.6) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(139,14,14,0.4) 0%, transparent 60%)",
          }}
        />
        <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 py-12 md:grid-cols-2 md:gap-12 md:px-6 md:py-20">
          <div className="space-y-5">
            <Badge variant="primary" className="bg-primary/90">
              <Sparkles className="mr-1 h-3 w-3" />
              Đồng phục Premium #1 tại Huế
            </Badge>
            <h1 className="font-display text-4xl leading-[0.95] tracking-wide md:text-6xl lg:text-7xl">
              ĐỒNG PHỤC <span className="text-primary">CAO CẤP</span>
              <br />
              CHO ĐỘI CỦA BẠN
            </h1>
            <p className="max-w-md text-base text-white/75 md:text-lg">
              Áo bóng đá thiết kế, đồng phục doanh nghiệp, áo lớp — vải xịn, in
              ép sắc nét, giao hàng toàn quốc 3-7 ngày.
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
            <div className="flex flex-wrap gap-x-6 gap-y-3 pt-4 text-sm text-white/70">
              <div className="flex items-center gap-1.5">
                <Star className="h-4 w-4 fill-warning text-warning" />
                <strong className="text-white">4.9/5</strong> · 1.240 đơn
              </div>
              <div className="flex items-center gap-1.5">
                <Truck className="h-4 w-4" />
                Miễn ship Huế · Đà Nẵng
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4" />
                Bảo hành in 12 tháng
              </div>
            </div>
          </div>

          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-white/10 bg-white/5 md:aspect-square">
            <Image
              src="https://images.unsplash.com/photo-1517649763962-0c623066013b?w=1200&q=85&auto=format"
              alt="Áo bóng đá thiết kế cao cấp"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
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

      {/* CTA + LEAD */}
      <section className="mx-auto max-w-5xl px-4 py-14">
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
