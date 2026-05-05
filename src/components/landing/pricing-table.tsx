import { Check } from "lucide-react";
import { formatPriceVND } from "@/lib/utils";

type Tier = {
  range: string;
  unitPrice: number;
  perks: string[];
  highlight?: boolean;
};

const DEFAULT_TIERS: Tier[] = [
  {
    range: "20 – 49 áo",
    unitPrice: 195000,
    perks: ["Thêu logo 1 vị trí", "Giao 7 ngày", "Đổi size 1 lần"],
  },
  {
    range: "50 – 99 áo",
    unitPrice: 175000,
    perks: ["Thêu logo 2 vị trí", "Mẫu 3D miễn phí", "Giao 5 ngày"],
    highlight: true,
  },
  {
    range: "100 – 299 áo",
    unitPrice: 159000,
    perks: ["Thêu logo + nhãn cổ", "Hỗ trợ designer riêng", "Giao 5 ngày"],
  },
  {
    range: "300+ áo",
    unitPrice: 145000,
    perks: ["Báo giá riêng", "Hỗ trợ ship toàn quốc", "Hợp đồng B2B"],
  },
];

export function PricingTable({ tiers = DEFAULT_TIERS }: { tiers?: Tier[] }) {
  return (
    <section className="mx-auto max-w-5xl px-4 py-14">
      <header className="text-center">
        <p className="text-xs font-bold uppercase tracking-widest text-primary">
          Bảng giá ưu đãi số lượng lớn
        </p>
        <h2 className="mt-2 font-display text-2xl tracking-wide md:text-4xl">
          ĐẶT CÀNG NHIỀU — GIÁ CÀNG TỐT
        </h2>
        <p className="mx-auto mt-2 max-w-2xl text-sm text-muted-foreground">
          Giá đã bao gồm vải cá sấu cotton 65/35 220 GSM + thêu logo cơ bản.
          Liên hệ để được báo giá chính xác theo brief của doanh nghiệp.
        </p>
      </header>

      <div className="mt-8 grid gap-3 md:grid-cols-4">
        {tiers.map((t) => (
          <div
            key={t.range}
            className={
              t.highlight
                ? "relative rounded-xl border-2 border-primary bg-primary text-primary-foreground p-5 shadow-[var(--shadow-pop)]"
                : "rounded-xl border border-border bg-background p-5 shadow-[var(--shadow-soft)]"
            }
          >
            {t.highlight && (
              <span className="absolute -top-3 right-4 rounded-full bg-warning px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-foreground">
                Phổ biến
              </span>
            )}
            <p
              className={
                t.highlight
                  ? "text-xs font-bold uppercase tracking-widest text-white/85"
                  : "text-xs font-bold uppercase tracking-widest text-muted-foreground"
              }
            >
              {t.range}
            </p>
            <p className="mt-2 font-display text-3xl">
              {formatPriceVND(t.unitPrice)}
            </p>
            <p
              className={
                t.highlight ? "text-[11px] text-white/75" : "text-[11px] text-muted-foreground"
              }
            >
              / áo (chưa VAT)
            </p>
            <ul
              className={
                t.highlight
                  ? "mt-4 space-y-1.5 text-sm text-white/95"
                  : "mt-4 space-y-1.5 text-sm text-foreground/85"
              }
            >
              {t.perks.map((p) => (
                <li key={p} className="flex items-start gap-1.5">
                  <Check className="mt-0.5 h-4 w-4 shrink-0" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
