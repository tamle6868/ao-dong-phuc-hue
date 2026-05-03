"use client";

import * as React from "react";
import { Calculator, Check, Minus, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { formatPriceVND, cn } from "@/lib/utils";

type Tier = { qty: number; price: number; label?: string };

type Props = {
  tiers: Tier[];
  defaultQty?: number;
  unitLabel?: string;
  ctaHref?: string;
  ctaLabel?: string;
  className?: string;
};

/**
 * Live price calculator: user inputs quantity, sees per-unit price (tiered)
 * and total. Useful on landing pages to remove the "phải chat mới biết giá"
 * friction.
 */
export function PricingCalculator({
  tiers,
  defaultQty,
  unitLabel = "áo",
  ctaHref = "#bao-gia",
  ctaLabel = "Đặt với giá này",
  className,
}: Props) {
  const sortedTiers = React.useMemo(
    () => [...tiers].sort((a, b) => a.qty - b.qty),
    [tiers],
  );
  const [qty, setQty] = React.useState(defaultQty ?? sortedTiers[0]?.qty ?? 11);

  const activeTier = React.useMemo(() => {
    let match = sortedTiers[0];
    for (const t of sortedTiers) if (qty >= t.qty) match = t;
    return match;
  }, [qty, sortedTiers]);

  const total = qty * activeTier.price;
  const minQty = sortedTiers[0]?.qty ?? 1;
  const maxQty = 1000;

  function step(delta: number) {
    setQty((v) => Math.max(minQty, Math.min(maxQty, v + delta)));
  }

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-background via-background to-muted/40 p-5 shadow-[var(--shadow-soft)] md:p-7",
        className,
      )}
    >
      <header className="mb-5 flex items-center gap-2 text-sm">
        <span className="grid h-9 w-9 place-items-center rounded-full bg-primary/10 text-primary">
          <Calculator className="h-4 w-4" />
        </span>
        <div>
          <p className="font-bold uppercase tracking-wider text-primary">
            Tính giá nhanh
          </p>
          <p className="text-xs text-muted-foreground">
            Càng nhiều — giá càng giảm. Không phải đợi báo giá.
          </p>
        </div>
      </header>

      <div className="space-y-4">
        <div>
          <label
            htmlFor="qty"
            className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground"
          >
            Số lượng ({unitLabel})
          </label>
          <div className="flex items-stretch overflow-hidden rounded-lg border border-border bg-background">
            <button
              type="button"
              onClick={() => step(-1)}
              className="px-3.5 text-muted-foreground hover:bg-muted/60"
              aria-label="Giảm số lượng"
            >
              <Minus className="h-4 w-4" />
            </button>
            <input
              id="qty"
              type="number"
              value={qty}
              min={minQty}
              max={maxQty}
              onChange={(e) =>
                setQty(
                  Math.max(
                    minQty,
                    Math.min(maxQty, Number.parseInt(e.target.value, 10) || minQty),
                  ),
                )
              }
              className="w-full bg-transparent px-3 py-3 text-center font-display text-2xl tracking-wide focus:outline-none"
            />
            <button
              type="button"
              onClick={() => step(1)}
              className="px-3.5 text-muted-foreground hover:bg-muted/60"
              aria-label="Tăng số lượng"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-lg border border-border/60 bg-muted/40 p-3">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              Đơn giá / {unitLabel}
            </p>
            <p className="mt-0.5 font-display text-2xl text-primary">
              {formatPriceVND(activeTier.price)}
            </p>
            {activeTier.label && (
              <p className="text-xs text-muted-foreground">{activeTier.label}</p>
            )}
          </div>
          <div className="rounded-lg border border-primary/30 bg-primary/5 p-3">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-primary">
              Tổng (chưa VAT)
            </p>
            <p className="mt-0.5 font-display text-2xl tracking-wide">
              {formatPriceVND(total)}
            </p>
            <p className="text-xs text-muted-foreground">Đã bao gồm in tên + số.</p>
          </div>
        </div>

        <div className="space-y-1 rounded-lg border border-dashed border-border/80 p-3 text-xs text-muted-foreground">
          <p className="font-semibold text-foreground">Bậc giá:</p>
          <ul className="grid gap-1 sm:grid-cols-2">
            {sortedTiers.map((t) => (
              <li
                key={t.qty}
                className={cn(
                  "flex items-center gap-1.5",
                  activeTier.qty === t.qty && "text-primary font-semibold",
                )}
              >
                <Check
                  className={cn(
                    "h-3.5 w-3.5",
                    activeTier.qty === t.qty ? "text-primary" : "text-muted-foreground/50",
                  )}
                />
                Từ {t.qty}+ {unitLabel}: {formatPriceVND(t.price)}
              </li>
            ))}
          </ul>
        </div>

        <a
          href={ctaHref}
          className={cn(
            "inline-flex w-full items-center justify-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-bold text-primary-foreground shadow-sm transition hover:bg-primary/90",
          )}
        >
          {ctaLabel} — {formatPriceVND(total)}
        </a>
      </div>
    </div>
  );
}

// Re-export Button for callers that want to compose with it
export { Button };
