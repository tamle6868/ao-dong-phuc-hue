"use client";

import { useState } from "react";
import { Minus, Plus, ShoppingBag, Phone } from "lucide-react";
import { motion } from "framer-motion";
import type { Product } from "@/types/product";
import { Button } from "@/components/ui/button";
import { VariantPicker } from "./variant-picker";
import { NameNumberInput } from "./name-number-input";
import { formatPriceVND } from "@/lib/utils";
import { BUSINESS_INFO } from "@/lib/constants";

export function AddToCartBar({ product }: { product: Product }) {
  const [qty, setQty] = useState(product.minOrder ?? 1);
  const [selection, setSelection] = useState<{
    size: string;
    color: string;
    colorHex: string;
  } | null>(null);
  const [printing, setPrinting] = useState({ name: "", number: "" });

  const total = product.price * qty;
  const min = product.minOrder ?? 1;

  return (
    <div className="space-y-6">
      <VariantPicker variants={product.variants} onChange={setSelection} />

      {product.customizable && (
        <NameNumberInput
          name={printing.name}
          number={printing.number}
          onChange={setPrinting}
        />
      )}

      <div className="flex items-center justify-between gap-4 rounded-md border border-border bg-muted/40 p-3">
        <span className="text-sm font-medium">Số lượng</span>
        <div className="flex items-center gap-1.5">
          <motion.button
            type="button"
            whileTap={{ scale: 0.9 }}
            onClick={() => setQty((q) => Math.max(min, q - 1))}
            disabled={qty <= min}
            className="grid h-10 w-10 place-items-center rounded-md border border-border bg-background disabled:opacity-40"
            aria-label="Giảm"
          >
            <Minus className="h-4 w-4" />
          </motion.button>
          <input
            type="number"
            value={qty}
            min={min}
            onChange={(e) =>
              setQty(Math.max(min, Number.parseInt(e.target.value || "0", 10)))
            }
            className="h-10 w-14 rounded-md border border-border bg-background text-center text-sm font-semibold"
          />
          <motion.button
            type="button"
            whileTap={{ scale: 0.9 }}
            onClick={() => setQty((q) => q + 1)}
            className="grid h-10 w-10 place-items-center rounded-md border border-border bg-background"
            aria-label="Tăng"
          >
            <Plus className="h-4 w-4" />
          </motion.button>
        </div>
      </div>

      {min > 1 && (
        <p className="text-xs text-muted-foreground">
          Sản phẩm đặt theo đội, số lượng tối thiểu {min} áo.
        </p>
      )}

      {/* Sticky CTA on mobile */}
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-background/95 px-3 py-2.5 pb-safe backdrop-blur md:static md:border-0 md:bg-transparent md:p-0">
        <div className="mx-auto flex max-w-7xl items-center gap-3">
          <div className="flex flex-col leading-tight">
            <span className="text-[11px] uppercase tracking-wide text-muted-foreground">
              Tổng tạm tính
            </span>
            <span className="text-lg font-bold text-primary md:text-xl">
              {formatPriceVND(total)}
            </span>
          </div>
          <a
            href={`tel:${BUSINESS_INFO.phoneE164}`}
            aria-label="Gọi báo giá"
            className="grid h-12 w-12 place-items-center rounded-md border border-border bg-background tap-shrink md:h-14 md:w-14"
          >
            <Phone className="h-5 w-5" />
          </a>
          <Button
            size="lg"
            block
            disabled={!selection}
            className="h-12 flex-1 md:h-14"
          >
            <ShoppingBag className="h-4 w-4" />
            {selection ? "Đặt ngay" : "Chọn size & màu"}
          </Button>
        </div>
      </div>
    </div>
  );
}
