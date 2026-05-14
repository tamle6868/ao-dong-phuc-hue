import Link from "next/link";
import { Phone } from "lucide-react";
import { BUSINESS_INFO } from "@/lib/constants";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Props = {
  title: string;
  intro: string;
  children: React.ReactNode;
  lastUpdated?: string;
};

export function PolicyLayout({ title, intro, children, lastUpdated }: Props) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 md:px-6 md:py-14">
      <nav
        aria-label="Breadcrumb"
        className="mb-3 text-xs text-muted-foreground"
      >
        <Link href="/" className="hover:text-foreground">
          Trang chủ
        </Link>
        <span className="px-1.5">/</span>
        <span className="font-medium text-foreground">Chính sách</span>
      </nav>

      <h1 className="font-display text-3xl tracking-wide md:text-5xl">
        {title}
      </h1>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">
        {intro}
      </p>
      {lastUpdated && (
        <p className="mt-2 text-[11px] text-muted-foreground">
          Cập nhật lần cuối: {lastUpdated}
        </p>
      )}

      <div className="prose-policy mt-8 space-y-6 text-sm leading-relaxed md:text-[15px]">
        {children}
      </div>

      <section className="mt-12 rounded-xl border border-border bg-muted/40 p-5 md:p-6">
        <h2 className="text-base font-bold tracking-tight md:text-lg">
          Còn thắc mắc? Liên hệ trực tiếp
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Tư vấn viên Áo Đồng Phục Huế phản hồi trong 15 phút (giờ hành chính).
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <a
            href={`tel:${BUSINESS_INFO.phoneE164}`}
            className="inline-flex h-11 items-center gap-2 rounded-md bg-primary px-4 text-sm font-semibold text-primary-foreground"
          >
            <Phone className="h-4 w-4" />
            Gọi {BUSINESS_INFO.phone}
          </a>
          <a
            href={`https://zalo.me/${BUSINESS_INFO.zalo}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-11 items-center gap-2 rounded-md border border-border bg-background px-4 text-sm font-semibold hover:bg-muted"
          >
            Chat Zalo
          </a>
          <Link
            href="/lien-he"
            className="inline-flex h-11 items-center gap-2 rounded-md border border-border bg-background px-4 text-sm font-semibold hover:bg-muted"
          >
            Gửi yêu cầu báo giá
          </Link>
        </div>
      </section>

      <div className="mt-8 flex flex-wrap gap-3 text-xs text-muted-foreground">
        <Link href="/chinh-sach/giao-hang" className="hover:text-foreground">
          Chính sách giao hàng
        </Link>
        <span>·</span>
        <Link href="/chinh-sach/doi-tra" className="hover:text-foreground">
          Chính sách đổi trả
        </Link>
        <span>·</span>
        <Link href="/chinh-sach/bao-mat" className="hover:text-foreground">
          Chính sách bảo mật
        </Link>
      </div>

      <Link
        href="/"
        className={cn(buttonVariants({ variant: "outline", size: "md" }), "mt-6")}
      >
        ← Về trang chủ
      </Link>
    </div>
  );
}
