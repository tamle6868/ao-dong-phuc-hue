import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowRight,
  CalendarClock,
  Hash,
  Quote,
  Shirt,
  Star,
  Users,
} from "lucide-react";

import { caseStudies } from "@/data/case-studies";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Khách hàng tiêu biểu — Đội bóng, doanh nghiệp đã đặt áo",
  description:
    "Hơn 1.200 đội bóng phong trào, doanh nghiệp, lớp học đã đặt đồng phục từ chúng tôi. Xem case study FC Sông Hương, Indochine Palace, FPT, Đại học Huế và nhiều khách hàng khác.",
  path: "/khach-hang-tieu-bieu",
});

const HIGHLIGHT_STATS = [
  { icon: Users, value: "1.240+", label: "đơn đã giao" },
  { icon: Shirt, value: "287", label: "đội bóng phong trào" },
  { icon: Hash, value: "200+", label: "doanh nghiệp B2B" },
  { icon: Star, value: "4.9/5", label: "trung bình 156 đánh giá" },
];

export default function CaseStudiesPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-accent text-accent-foreground">
        <div
          aria-hidden
          className="absolute inset-0 -z-10 opacity-40"
          style={{
            backgroundImage:
              "radial-gradient(circle at 25% 25%, rgba(220,38,38,0.5) 0%, transparent 55%), radial-gradient(circle at 75% 75%, rgba(139,14,14,0.4) 0%, transparent 60%)",
          }}
        />
        <div className="mx-auto max-w-5xl px-4 py-14 md:py-20">
          <Badge variant="primary" className="bg-primary/90">
            Khách hàng tiêu biểu
          </Badge>
          <h1 className="mt-3 max-w-3xl font-display text-4xl leading-[0.95] tracking-wide md:text-6xl">
            HƠN{" "}
            <span className="bg-gradient-to-r from-primary via-rose-400 to-amber-300 bg-clip-text text-transparent">
              1.200 ĐỘI & DOANH NGHIỆP
            </span>{" "}
            ĐÃ TIN CHỌN
          </h1>
          <p className="mt-4 max-w-xl text-base text-white/80 md:text-lg">
            Từ FC phong trào đến tập đoàn công nghệ, từ áo lớp 12 đến đồng phục
            khách sạn 5 sao — mỗi đơn hàng là một câu chuyện riêng. Tổng hợp những
            case study tiêu biểu nhất.
          </p>

          <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-3 md:grid-cols-4">
            {HIGHLIGHT_STATS.map(({ icon: Icon, value, label }) => (
              <div key={label} className="flex items-start gap-2">
                <Icon className="mt-0.5 h-4 w-4 shrink-0 text-warning" />
                <div className="leading-tight">
                  <p className="font-display text-2xl tracking-wide text-white">
                    {value}
                  </p>
                  <p className="text-xs text-white/70">{label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <header className="mb-8 max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-widest text-primary">
            Case study
          </p>
          <h2 className="mt-2 font-display text-2xl tracking-wide md:text-4xl">
            6 ĐƠN HÀNG ĐÁNG CHÚ Ý GẦN ĐÂY
          </h2>
        </header>

        <div className="grid gap-5 md:grid-cols-2">
          {caseStudies.map((cs) => (
            <article
              key={cs.slug}
              className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-background shadow-[var(--shadow-soft)] transition hover:shadow-[var(--shadow-medium)]"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                <Image
                  src={cs.image}
                  alt={cs.client}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
                  <Badge variant="primary" className="bg-primary/95">
                    {cs.industry}
                  </Badge>
                </div>
              </div>

              <div className="flex flex-1 flex-col gap-4 p-5 md:p-6">
                <header>
                  <h3 className="font-display text-xl tracking-wide md:text-2xl">
                    {cs.client.toUpperCase()}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {cs.tagline}
                  </p>
                </header>

                <dl className="grid grid-cols-3 gap-2 rounded-lg border border-border/60 bg-muted/40 p-3 text-xs">
                  <div>
                    <dt className="text-muted-foreground">Số lượng</dt>
                    <dd className="mt-0.5 font-display text-base text-foreground">
                      {cs.qty}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-muted-foreground">Sản phẩm</dt>
                    <dd className="mt-0.5 font-medium text-foreground">
                      {cs.productType.split(" ")[0]}
                    </dd>
                  </div>
                  <div>
                    <dt className="flex items-center gap-1 text-muted-foreground">
                      <CalendarClock className="h-3 w-3" /> Lead time
                    </dt>
                    <dd className="mt-0.5 font-display text-base text-foreground">
                      {cs.leadDays} ngày
                    </dd>
                  </div>
                </dl>

                <p className="text-sm text-foreground/85">{cs.outcome}</p>

                <blockquote className="relative mt-auto rounded-lg bg-muted/40 p-4 text-sm">
                  <Quote
                    aria-hidden
                    className="absolute -top-2 left-3 h-5 w-5 fill-primary text-primary opacity-40"
                  />
                  <div className="flex gap-0.5 text-warning">
                    {Array.from({ length: cs.quote.rating }).map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-warning" />
                    ))}
                  </div>
                  <p className="mt-2 italic text-foreground/85">
                    “{cs.quote.content}”
                  </p>
                  <footer className="mt-3 text-xs font-semibold not-italic text-muted-foreground">
                    — {cs.quote.person}, {cs.quote.role}
                  </footer>
                </blockquote>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-4 py-10 md:flex-row md:py-12">
          <div>
            <p className="font-display text-2xl tracking-wide md:text-3xl">
              ĐỘI HOẶC DOANH NGHIỆP CỦA BẠN LÀ CASE STUDY TIẾP THEO?
            </p>
            <p className="mt-1 max-w-xl text-sm text-white/85 md:text-base">
              Để lại số điện thoại — đội ngũ tư vấn gọi lại trong 15 phút (giờ
              hành chính), gửi mẫu 3D miễn phí.
            </p>
          </div>
          <Link
            href="/lien-he#bao-gia"
            className={cn(
              buttonVariants({ size: "xl" }),
              "bg-white text-primary hover:bg-white/90",
            )}
          >
            Nhận tư vấn ngay
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
