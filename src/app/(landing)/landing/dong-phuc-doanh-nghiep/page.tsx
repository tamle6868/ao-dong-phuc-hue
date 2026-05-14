import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, Award, Clock, ShieldCheck, Star, Users } from "lucide-react";
import { LeadForm } from "@/components/landing/lead-form";
import { TrustBar } from "@/components/landing/trust-bar";
import { PricingTable } from "@/components/landing/pricing-table";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { partners, testimonials } from "@/data/partners";
import { buildMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";
import { BUSINESS_INFO } from "@/lib/constants";
import { FaqAccordion } from "@/components/marketing/faq-accordion";
import { StickyQuoteCTA } from "@/components/marketing/sticky-quote-cta";
import { AnimatedUspGrid } from "@/components/marketing/animated-usp";

const FAQ_ITEMS = [
  {
    q: "Mẫu 3D miễn phí có thật sự miễn phí không?",
    a: "Miễn phí hoàn toàn. Designer sẽ phối logo brand lên áo thật và gửi file 3D trong 30 phút (giờ hành chính). Bạn duyệt rồi mới quyết định đặt hay không — không ràng buộc.",
  },
  {
    q: "Số lượng tối thiểu cho đồng phục công ty là bao nhiêu?",
    a: "Tầm 20 áo trở lên cho phép đổ logo thêu / in chuyển nhiệt miễn phí. Đơn dưới 20 áo vẫn được, chỉ phụ thu logo.",
  },
  {
    q: "Có xuất hóa đơn VAT và hợp đồng không?",
    a: "Có. Mình xuất hóa đơn VAT đầy đủ cho doanh nghiệp, kết hợp hợp đồng kinh tế có điều khoản bảo mật thiết kế và bảo hành đổi trả.",
  },
  {
    q: "Đặt thêm sau lần đầu có bị đổi giá không?",
    a: "Giữ nguyên giá trong 12 tháng cho các đơn lặp. Designer lưu file gốc, bạn cần thêm 5 áo cho nhân viên mới cũng OK — không bắt đặt lại số lượng lớn.",
  },
  {
    q: "Vải cá sấu 220 GSM khác loại vải polo thường như thế nào?",
    a: "Vải cá sấu cotton 65/35 (220 GSM) có cấu trúc dệt kiểu tổ ong, dày và đứng form, không nhăn khi giặt. Chịu được ủi nhiệt độ cao. Polo thường (180 GSM) mỏng, mềm hơn nhưng nhanh nhão.",
  },
  {
    q: "Thêu hay in: loại nào bền hơn cho logo brand?",
    a: "Thêu bền hơn (không phai theo thời gian, cảm giác cao cấp). In chuyển nhiệt rẻ hơn, phù hợp logo nhiều màu / gradient. Designer sẽ tư vấn theo logo của bạn.",
  },
];

export const metadata: Metadata = buildMetadata({
  title: "Đồng phục doanh nghiệp cao cấp tại Huế — Mẫu 3D miễn phí 30 phút",
  description:
    "Xưởng may đồng phục doanh nghiệp tại Huế: polo, sơ mi, áo gió. Vải cá sấu cotton 65/35 220 GSM, thêu logo theo brand. Nhận mẫu thiết kế 3D miễn phí trong 30 phút.",
  path: "/landing/dong-phuc-doanh-nghiep",
});

const TRUST_FEATURES = [
  {
    icon: <Award />,
    title: "10+ năm kinh nghiệm B2B",
    desc: "Đối tác may đồng phục cho 200+ doanh nghiệp tại miền Trung — từ khách sạn 5 sao đến tập đoàn công nghệ.",
  },
  {
    icon: <Clock />,
    title: "Mẫu 3D trong 30 phút",
    desc: "Designer phối logo brand lên áo thật và gửi file 3D — bạn duyệt trước khi sản xuất.",
  },
  {
    icon: <ShieldCheck />,
    title: "Cam kết chất vải",
    desc: "Cá sấu cotton 65/35 220 GSM xuất khẩu — bảo hành thêu / in 12 tháng. Đổi mẫu lỗi 1-1.",
  },
  {
    icon: <Users />,
    title: "Hỗ trợ đặt hàng linh hoạt",
    desc: "Đặt thêm sau lần đầu giữ giá đến 12 tháng. Có hợp đồng B2B, xuất hóa đơn VAT.",
  },
];

export default function DoanhNghiepLandingPage() {
  return (
    <>
      {/* HERO */}
      <section className="relative isolate overflow-hidden bg-accent text-accent-foreground">
        <div
          aria-hidden
          className="absolute inset-0 -z-10 opacity-40"
          style={{
            backgroundImage:
              "radial-gradient(circle at 75% 30%, rgba(139,14,14,0.5) 0%, transparent 55%)",
          }}
        />
        <div className="mx-auto grid max-w-5xl items-center gap-8 px-4 py-12 md:grid-cols-[1.05fr_1fr] md:py-16">
          <div className="space-y-5">
            <Badge variant="primary">B2B · Đồng phục công ty</Badge>
            <h1 className="font-display text-4xl leading-[0.95] tracking-wide md:text-6xl">
              ĐỒNG PHỤC{" "}
              <span className="bg-gradient-to-r from-primary via-rose-400 to-amber-300 bg-clip-text text-transparent">
                CAO CẤP
              </span>
              <br />
              CHO DOANH NGHIỆP CỦA BẠN
            </h1>
            <p className="max-w-md text-base text-white/75">
              Polo · Sơ mi · Áo gió — vải cá sấu cotton xuất khẩu, thêu logo
              brand chuẩn xác. <strong>Nhận mẫu 3D miễn phí trong 30 phút.</strong>
            </p>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-white/80">
              <div className="flex items-center gap-1.5">
                <Star className="h-4 w-4 fill-warning text-warning" />
                <strong className="text-white">4.9</strong> · 412 đơn B2B
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4" /> Bảo hành 12 tháng
              </div>
            </div>
            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                href="#mau-3d"
                className={cn(buttonVariants({ size: "xl" }))}
              >
                Nhận mẫu 3D miễn phí
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href={`tel:${BUSINESS_INFO.phoneE164}`}
                className={cn(
                  buttonVariants({ size: "xl", variant: "outline" }),
                  "border-white/20 bg-white/5 text-white hover:bg-white/10",
                )}
              >
                Gọi tư vấn
              </a>
            </div>
          </div>

          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-white/10 bg-white/5">
            <Image
              src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=1200&q=85&auto=format"
              alt="Đồng phục doanh nghiệp cao cấp"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 480px"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <TrustBar partners={partners} />

      {/* TRUST FEATURES */}
      <section className="mx-auto max-w-5xl px-4 py-14">
        <header className="text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-primary">
            Vì sao 200+ doanh nghiệp chọn chúng tôi
          </p>
          <h2 className="mt-2 font-display text-2xl tracking-wide md:text-4xl">
            UY TÍN · NHANH · CHẤT LƯỢNG B2B
          </h2>
        </header>

        <AnimatedUspGrid
          items={TRUST_FEATURES}
          columns={2}
          className="mt-8"
        />
      </section>

      <PricingTable />

      {/* B2B PDP CTA — distinct from football flow */}
      <section className="mx-auto max-w-5xl px-4 py-10">
        <div className="rounded-2xl border border-primary/20 bg-primary-50 p-5 md:p-7">
          <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-primary">
                B2B · Polo Premium
              </p>
              <h3 className="mt-1 font-display text-xl tracking-wide md:text-2xl">
                ĐẶT KÈM HÓA ĐƠN VAT · CÔNG NỢ 30 NGÀY · ÁO MẪU TRƯỚC
              </h3>
              <p className="mt-1.5 max-w-xl text-sm text-muted-foreground">
                Trang sản phẩm có form B2B riêng: nhập tên công ty + MST,
                checkbox VAT/công nợ, upload logo. Có thêm CTA &quot;Yêu cầu
                áo mẫu&quot; để bộ phận mua hàng duyệt vải + form trước khi sản
                xuất lô lớn.
              </p>
            </div>
            <Link
              href="/san-pham/polo-doanh-nghiep-premium"
              className={cn(buttonVariants({ size: "lg" }))}
            >
              Mở form B2B
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-muted/40 py-14">
        <div className="mx-auto max-w-5xl px-4">
          <header className="text-center">
            <p className="text-xs font-bold uppercase tracking-widest text-primary">
              Khách hàng B2B
            </p>
            <h2 className="mt-2 font-display text-2xl tracking-wide md:text-4xl">
              ĐƯỢC TIN CHỌN BỞI CÁC THƯƠNG HIỆU LỚN
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

      {/* FAQ */}
      <section className="mx-auto max-w-3xl px-4 py-14">
        <header className="mb-6 text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-primary">
            FAQ B2B
          </p>
          <h2 className="mt-2 font-display text-2xl tracking-wide md:text-4xl">
            DOANH NGHIỆP THƯỜNG HỘI
          </h2>
        </header>
        <FaqAccordion items={FAQ_ITEMS} />
      </section>

      {/* LEAD FORM 3D */}
      <section id="mau-3d" className="mx-auto max-w-2xl px-4 py-14">
        <LeadForm source="dong-phuc-doanh-nghiep" variant="mockup3d" />
      </section>

      {/* FINAL CTA STRIP */}
      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-4 py-7 md:flex-row">
          <div>
            <p className="font-display text-xl tracking-wide md:text-2xl">
              MIỄN PHÍ MẪU 3D · BẢO HÀNH 12 THÁNG · GIAO TOÀN QUỐC
            </p>
            <p className="text-sm text-white/85">
              Hợp đồng B2B, xuất hóa đơn VAT đầy đủ — bảo mật brand identity.
            </p>
          </div>
          <a
            href={`tel:${BUSINESS_INFO.phoneE164}`}
            className={cn(
              buttonVariants({ size: "xl" }),
              "bg-white text-primary hover:bg-white/90",
            )}
          >
            Gọi {BUSINESS_INFO.phone}
          </a>
        </div>
      </section>

      <StickyQuoteCTA ctaHref="#mau-3d" ctaLabel="Nhận mẫu 3D" />
    </>
  );
}
