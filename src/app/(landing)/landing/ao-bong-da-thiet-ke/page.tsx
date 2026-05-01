import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, Star, Truck, Shirt, PenTool, Printer, Box } from "lucide-react";
import { LeadForm } from "@/components/landing/lead-form";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { buildMetadata } from "@/lib/seo";
import { BUSINESS_INFO } from "@/lib/constants";

export const metadata: Metadata = buildMetadata({
  title: "Áo bóng đá thiết kế cao cấp — Vải mè 4 chiều, in tên số sắc nét",
  description:
    "Đặt áo bóng đá thiết kế riêng tại Huế: vải mè kim cương xuất khẩu, form body fit chuẩn cầu thủ, in chuyển nhiệt full màu. MOQ chỉ 11 áo. Xem báo giá ngay!",
  path: "/landing/ao-bong-da-thiet-ke",
});

const FABRIC_FEATURES = [
  {
    icon: Shirt,
    title: "Vải mè kim cương 180 GSM",
    desc: "Dệt 4 chiều co giãn, thoáng mát, thấm hút mồ hôi nhanh — giữ form sau hàng trăm lần giặt.",
  },
  {
    icon: PenTool,
    title: "Form body fit chuẩn cầu thủ",
    desc: "Cắt may rập 3D theo tỷ lệ vận động viên Việt — ôm dáng, tôn vóc, không vướng khi chạy.",
  },
  {
    icon: Printer,
    title: "In chuyển nhiệt sắc nét",
    desc: "Mực gốc nước nhập Hàn Quốc, độ phân giải 1440 dpi — màu chuẩn brand, không bong tróc.",
  },
  {
    icon: Box,
    title: "MOQ chỉ 11 áo / đội",
    desc: "Đặt cho 1 đội bóng phong trào — không bắt số lượng lớn. Càng nhiều giá càng ưu đãi.",
  },
];

const PROCESS = [
  { step: 1, title: "Tư vấn & chốt brief", time: "15 phút", desc: "Bạn gọi hoặc để lại thông tin — đội ngũ tư vấn vải, form, in ấn phù hợp." },
  { step: 2, title: "Phối mẫu thiết kế", time: "1 ngày", desc: "Designer phác mẫu áo theo logo / tên đội. Chỉnh sửa miễn phí đến khi ưng ý." },
  { step: 3, title: "Sản xuất & in tên số", time: "3 ngày", desc: "May và in tại xưởng — quy trình chuẩn QA 3 lớp trước khi xuất kho." },
  { step: 4, title: "Giao hàng tận nơi", time: "1 ngày", desc: "Giao toàn quốc, miễn phí ship Huế / Đà Nẵng / Quảng Trị." },
];

export default function AoBongDaLandingPage() {
  return (
    <>
      {/* HERO */}
      <section className="relative isolate overflow-hidden bg-accent text-accent-foreground">
        <div
          aria-hidden
          className="absolute inset-0 -z-10 opacity-40"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 30%, rgba(139,14,14,0.7) 0%, transparent 55%)",
          }}
        />
        <div className="mx-auto grid max-w-5xl items-center gap-8 px-4 py-12 md:grid-cols-[1.1fr_1fr] md:py-16">
          <div className="space-y-5">
            <Badge variant="primary">
              Áo bóng đá thiết kế · Vải xuất khẩu
            </Badge>
            <h1 className="font-display text-4xl leading-[0.95] tracking-wide md:text-6xl">
              ÁO BÓNG ĐÁ <span className="text-primary">PRO ELITE</span>
              <br />
              ĐẶT THEO ĐỘI · IN TÊN SỐ MIỄN PHÍ
            </h1>
            <p className="max-w-md text-base text-white/75">
              Vải mè kim cương 4 chiều xuất khẩu Hàn — form body fit chuẩn cầu thủ —
              in chuyển nhiệt full màu sắc nét. MOQ chỉ <strong>11 áo / đội</strong>.
            </p>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-white/80">
              <div className="flex items-center gap-1.5">
                <Star className="h-4 w-4 fill-warning text-warning" />
                <strong className="text-white">4.9</strong> · 287 đơn
              </div>
              <div className="flex items-center gap-1.5">
                <Truck className="h-4 w-4" /> Giao 3-5 ngày
              </div>
            </div>
            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                href="#bao-gia"
                className={cn(buttonVariants({ size: "xl" }))}
              >
                Nhận báo giá đội bóng
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href={`tel:${BUSINESS_INFO.phoneE164}`}
                className={cn(
                  buttonVariants({ size: "xl", variant: "outline" }),
                  "border-white/20 bg-white/5 text-white hover:bg-white/10",
                )}
              >
                Gọi {BUSINESS_INFO.phone}
              </a>
            </div>
          </div>

          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-white/10 bg-white/5">
            <Image
              src="https://images.unsplash.com/photo-1517649763962-0c623066013b?w=1200&q=85&auto=format"
              alt="Áo bóng đá Pro Elite"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 480px"
              className="object-cover"
            />
            <div className="absolute right-3 top-3 rounded-md bg-warning/95 px-2.5 py-1 text-xs font-bold uppercase tracking-wider">
              -25% đầu mùa
            </div>
          </div>
        </div>
      </section>

      {/* FABRIC + FORM */}
      <section className="mx-auto max-w-5xl px-4 py-14">
        <header className="text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-primary">
            Vì sao đội bóng chọn Pro Elite
          </p>
          <h2 className="mt-2 font-display text-2xl tracking-wide md:text-4xl">
            FORM ĐẸP · CHẤT XỊN · IN SẮC NÉT
          </h2>
        </header>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {FABRIC_FEATURES.map((f) => (
            <div
              key={f.title}
              className="flex gap-4 rounded-xl border border-border bg-background p-5 shadow-[var(--shadow-soft)]"
            >
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-md bg-primary text-primary-foreground">
                <f.icon className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-base font-bold">{f.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PROCESS */}
      <section className="bg-muted/40 py-14">
        <div className="mx-auto max-w-5xl px-4">
          <header className="text-center">
            <p className="text-xs font-bold uppercase tracking-widest text-primary">
              Quy trình in tên số
            </p>
            <h2 className="mt-2 font-display text-2xl tracking-wide md:text-4xl">
              CHỈ <span className="text-primary">5 NGÀY</span> CÓ ÁO
            </h2>
          </header>

          <ol className="mt-8 grid gap-3 md:grid-cols-4">
            {PROCESS.map((p) => (
              <li
                key={p.step}
                className="relative rounded-xl border border-border bg-background p-5"
              >
                <span className="absolute -top-3 left-5 grid h-7 w-7 place-items-center rounded-full bg-primary font-display text-sm text-primary-foreground">
                  {p.step}
                </span>
                <p className="mt-2 text-xs font-bold uppercase tracking-wider text-primary">
                  {p.time}
                </p>
                <h3 className="mt-1 text-base font-bold">{p.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{p.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* LEAD FORM */}
      <section id="bao-gia" className="mx-auto max-w-2xl px-4 py-14">
        <LeadForm source="ao-bong-da-thiet-ke" variant="quote" />
      </section>

      {/* FINAL CTA STRIP */}
      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-4 py-7 md:flex-row">
          <div>
            <p className="font-display text-xl tracking-wide md:text-2xl">
              ƯU ĐÃI ĐẦU MÙA: -25% CHO ĐỘI ĐẶT TRƯỚC 30/06
            </p>
            <p className="text-sm text-white/85">
              Tặng kèm 1 áo thủ môn + 1 băng đội trưởng cho đơn từ 15 áo.
            </p>
          </div>
          <a
            href={`tel:${BUSINESS_INFO.phoneE164}`}
            className={cn(
              buttonVariants({ size: "xl" }),
              "bg-white text-primary hover:bg-white/90",
            )}
          >
            Gọi đặt ngay
          </a>
        </div>
      </section>
    </>
  );
}
