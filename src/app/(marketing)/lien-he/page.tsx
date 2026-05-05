import type { Metadata } from "next";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { LeadForm } from "@/components/landing/lead-form";
import { BUSINESS_INFO } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Liên hệ — Áo Đồng Phục Huế",
  description:
    "Liên hệ Áo Đồng Phục Huế: hotline, Zalo, email, địa chỉ xưởng. Tư vấn báo giá đồng phục miễn phí trong 15 phút.",
  path: "/lien-he",
});

export default function LienHePage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 md:px-6">
      <header className="space-y-2 text-center">
        <p className="text-xs font-bold uppercase tracking-widest text-primary">
          Liên hệ
        </p>
        <h1 className="font-display text-3xl tracking-wide md:text-5xl">
          KẾT NỐI VỚI CHÚNG TÔI
        </h1>
        <p className="mx-auto max-w-xl text-sm text-muted-foreground md:text-base">
          Đội ngũ tư vấn sẵn sàng hỗ trợ bạn từ 8h đến 21h hàng ngày.
        </p>
      </header>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          {[
            { icon: Phone, title: "Hotline", value: BUSINESS_INFO.phone, href: `tel:${BUSINESS_INFO.phoneE164}` },
            { icon: Mail, title: "Email", value: BUSINESS_INFO.email, href: `mailto:${BUSINESS_INFO.email}` },
            { icon: MapPin, title: "Địa chỉ", value: `${BUSINESS_INFO.address.streetAddress}, ${BUSINESS_INFO.address.addressLocality}, ${BUSINESS_INFO.address.addressRegion}` },
            { icon: Clock, title: "Giờ mở cửa", value: "T2-T7: 8:00 - 21:00 · CN: 8:00 - 18:00" },
          ].map((item) => {
            const Wrapper = item.href ? "a" : "div";
            return (
              <Wrapper
                key={item.title}
                {...(item.href ? { href: item.href } : {})}
                className="flex gap-4 rounded-xl border border-border bg-background p-5 shadow-[var(--shadow-soft)] transition-colors hover:bg-muted/50"
              >
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-md bg-primary text-primary-foreground">
                  <item.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    {item.title}
                  </p>
                  <p className="mt-0.5 text-sm font-medium">{item.value}</p>
                </div>
              </Wrapper>
            );
          })}
        </div>

        <LeadForm source="footer" variant="quote" />
      </div>
    </div>
  );
}
