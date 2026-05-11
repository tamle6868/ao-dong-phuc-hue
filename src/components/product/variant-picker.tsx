"use client";

import { useMemo, useState } from "react";
import { Check } from "lucide-react";
import { motion } from "framer-motion";
import type { ProductVariant } from "@/types/product";
import { cn } from "@/lib/utils";

type Selected = { size: string; color: string; colorHex: string } | null;

export function VariantPicker({
  variants,
  onChange,
}: {
  variants: ProductVariant[];
  onChange?: (selection: Selected) => void;
}) {
  const colors = useMemo(() => {
    const map = new Map<string, { color: string; colorHex: string }>();
    variants.forEach((v) => map.set(v.color, { color: v.color, colorHex: v.colorHex }));
    return Array.from(map.values());
  }, [variants]);

  const sizes = useMemo(() => {
    const set = new Set(variants.map((v) => v.size));
    return Array.from(set);
  }, [variants]);

  const [color, setColor] = useState(colors[0]?.color);
  const [size, setSize] = useState<string | null>(null);

  function emit(nextColor: string, nextSize: string | null) {
    if (!nextSize) return onChange?.(null);
    const matched = variants.find(
      (v) => v.color === nextColor && v.size === nextSize,
    );
    if (matched) {
      onChange?.({ color: matched.color, colorHex: matched.colorHex, size: matched.size });
    } else {
      onChange?.(null);
    }
  }

  return (
    <div className="space-y-5">
      <div>
        <div className="mb-2 flex items-baseline justify-between">
          <h3 className="text-sm font-semibold">Chọn màu</h3>
          <span className="text-xs text-muted-foreground">{color}</span>
        </div>
        <div className="flex flex-wrap gap-2.5">
          {colors.map((c) => (
            <motion.button
              key={c.color}
              type="button"
              whileTap={{ scale: 0.92 }}
              onClick={() => {
                setColor(c.color);
                emit(c.color, size);
              }}
              aria-label={c.color}
              aria-pressed={color === c.color}
              className={cn(
                "relative grid h-10 w-10 place-items-center rounded-full border-2 transition-colors",
                color === c.color
                  ? "border-primary"
                  : "border-border hover:border-foreground/50",
              )}
            >
              <span
                className="h-7 w-7 rounded-full ring-1 ring-black/5"
                style={{ background: c.colorHex }}
              />
              {color === c.color && (
                <Check
                  className={cn(
                    "absolute h-4 w-4 drop-shadow",
                    c.color.toLowerCase().includes("trắng")
                      ? "text-foreground"
                      : "text-white",
                  )}
                />
              )}
            </motion.button>
          ))}
        </div>
      </div>

      <div>
        <div className="mb-2 flex items-baseline justify-between">
          <h3 className="text-sm font-semibold">Chọn size</h3>
          <a
            href="#size-guide"
            className="text-xs font-medium text-primary underline-offset-2 hover:underline"
          >
            Hướng dẫn chọn size
          </a>
        </div>
        <div className="flex flex-wrap gap-2">
          {sizes.map((s) => (
            <motion.button
              key={s}
              type="button"
              whileTap={{ scale: 0.92 }}
              onClick={() => {
                setSize(s);
                emit(color ?? colors[0].color, s);
              }}
              aria-pressed={size === s}
              className={cn(
                "h-11 min-w-[3rem] rounded-md border px-4 text-sm font-semibold transition-colors",
                size === s
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-background hover:border-foreground/50",
              )}
            >
              {s}
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}
