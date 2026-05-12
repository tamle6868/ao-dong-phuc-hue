"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  CheckCircle2,
  Loader2,
  MessageCircle,
  Phone,
  Send,
  X,
} from "lucide-react";
import type { Product } from "@/types/product";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { BUSINESS_INFO } from "@/lib/constants";
import { formatPriceVND } from "@/lib/utils";

type Selection = { size: string; color: string; colorHex: string };
type Printing = { name: string; number: string };

type Props = {
  open: boolean;
  onClose: () => void;
  product: Product;
  selection: Selection | null;
  qty: number;
  printing: Printing;
};

export function QuoteSheet({
  open,
  onClose,
  product,
  selection,
  qty,
  printing,
}: Props) {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Derive "was open last render" via state — React 19's recommended pattern
  // for resetting on prop change without using effects.
  const [prevOpen, setPrevOpen] = useState(open);
  if (open !== prevOpen) {
    setPrevOpen(open);
    if (open && status === "error") {
      setStatus("idle");
      setErrorMessage(null);
    }
  }

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  const total = product.price * qty;

  const orderSummary = [
    `[Mã: ${product.slug}] ${product.name}`,
    selection ? `Màu: ${selection.color}` : null,
    selection ? `Size: ${selection.size}` : null,
    `SL: ${qty} áo`,
    printing.name ? `Tên in: ${printing.name}` : null,
    printing.number ? `Số áo: ${printing.number}` : null,
    note ? `Ghi chú: ${note}` : null,
  ]
    .filter(Boolean)
    .join(" | ");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage(null);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          phone,
          qty: String(qty),
          message: orderSummary,
          source: "pdp",
          variant: "quote",
        }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? "Gửi không thành công");
      }
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Đã có lỗi xảy ra");
    }
  }

  const zaloText = encodeURIComponent(`Chào shop, mình muốn đặt: ${orderSummary}. Vui lòng tư vấn giúp mình.`);
  const zaloHref = `https://zalo.me/${BUSINESS_INFO.zalo}?text=${zaloText}`;

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="quote-sheet-title"
            initial={{ y: "100%", opacity: 0.8 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0.8 }}
            transition={{ type: "spring", damping: 28, stiffness: 280 }}
            className="fixed inset-x-0 bottom-0 z-[70] max-h-[92vh] overflow-y-auto rounded-t-2xl border-t border-border bg-background shadow-2xl md:inset-x-auto md:bottom-auto md:left-1/2 md:top-1/2 md:w-full md:max-w-lg md:-translate-x-1/2 md:-translate-y-1/2 md:rounded-2xl md:border"
          >
            <div className="sticky top-0 z-10 flex items-center justify-between gap-3 border-b border-border bg-background/95 px-4 py-3 backdrop-blur md:px-5">
              <div>
                <h2
                  id="quote-sheet-title"
                  className="font-display text-lg tracking-wide md:text-xl"
                >
                  YÊU CẦU ĐẶT ÁO
                </h2>
                <p className="text-[11px] text-muted-foreground">
                  Tư vấn viên gọi lại trong 15 phút (giờ hành chính)
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Đóng"
                className="grid h-9 w-9 place-items-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {status === "success" ? (
              <div className="px-4 py-8 text-center md:px-5">
                <CheckCircle2 className="mx-auto h-14 w-14 text-success" />
                <h3 className="mt-3 text-lg font-bold">Đã ghi nhận yêu cầu!</h3>
                <p className="mx-auto mt-1.5 max-w-sm text-sm text-muted-foreground">
                  Đội ngũ sẽ gọi lại trong 15 phút (giờ hành chính). Trong lúc
                  chờ, bạn có thể chat Zalo để gửi luôn ảnh thiết kế / logo.
                </p>
                <div className="mt-5 flex flex-wrap justify-center gap-2">
                  <a
                    href={zaloHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-[#0068ff] px-5 text-sm font-semibold text-white hover:bg-[#0050cc]"
                  >
                    <MessageCircle className="h-4 w-4" />
                    Chat Zalo gửi thiết kế
                  </a>
                  <button
                    type="button"
                    onClick={onClose}
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-md border border-border bg-background px-5 text-sm font-semibold hover:bg-muted"
                  >
                    Tiếp tục xem
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="px-4 pb-5 pt-4 md:px-5">
                <div className="rounded-lg border border-border bg-muted/40 p-3 text-sm">
                  <p className="font-semibold leading-tight">{product.name}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {selection ? (
                      <>
                        Màu <span className="text-foreground">{selection.color}</span>{" "}
                        · Size <span className="text-foreground">{selection.size}</span>{" "}
                        · SL <span className="text-foreground">{qty} áo</span>
                      </>
                    ) : (
                      <>SL <span className="text-foreground">{qty} áo</span> · Vui lòng chọn màu &amp; size</>
                    )}
                  </p>
                  <div className="mt-1.5 flex items-baseline gap-2">
                    <span className="text-[11px] uppercase text-muted-foreground">
                      Tạm tính
                    </span>
                    <span className="text-base font-bold text-primary">
                      {formatPriceVND(total)}
                    </span>
                  </div>
                </div>

                <div className="mt-4 space-y-3">
                  <div className="space-y-1.5">
                    <Label htmlFor="qs-name">Họ và tên *</Label>
                    <Input
                      id="qs-name"
                      required
                      autoComplete="name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="VD: Nguyễn Văn A"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="qs-phone">Số điện thoại / Zalo *</Label>
                    <Input
                      id="qs-phone"
                      type="tel"
                      required
                      inputMode="tel"
                      autoComplete="tel"
                      pattern="^(0|\+84)[0-9]{9,10}$"
                      value={phone}
                      onChange={(e) =>
                        setPhone(e.target.value.replace(/[\s.\-()]/g, ""))
                      }
                      placeholder="VD: 0905 000 000"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="qs-note">Ghi chú thêm</Label>
                    <Textarea
                      id="qs-note"
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      placeholder="VD: Đội cần 5 áo size M, 4 áo size L, 2 áo size XL. Cần giao trước 25/12."
                      rows={3}
                    />
                  </div>
                </div>

                {errorMessage && (
                  <p role="alert" className="mt-3 text-sm text-destructive">
                    {errorMessage}
                  </p>
                )}

                <Button
                  type="submit"
                  size="lg"
                  block
                  disabled={status === "loading"}
                  className="mt-4"
                >
                  {status === "loading" ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                  Gửi yêu cầu — gọi lại trong 15 phút
                </Button>

                <div className="mt-3 grid grid-cols-2 gap-2">
                  <a
                    href={zaloHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-md border border-border bg-background text-sm font-semibold hover:bg-muted"
                  >
                    <MessageCircle className="h-4 w-4 text-[#0068ff]" />
                    Chat Zalo
                  </a>
                  <a
                    href={`tel:${BUSINESS_INFO.phoneE164}`}
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-md border border-border bg-background text-sm font-semibold hover:bg-muted"
                  >
                    <Phone className="h-4 w-4 text-primary" />
                    Gọi {BUSINESS_INFO.phone}
                  </a>
                </div>
                <p className="mt-3 text-center text-[11px] leading-tight text-muted-foreground">
                  Gửi yêu cầu = đồng ý cho chúng tôi liên hệ tư vấn qua điện
                  thoại / Zalo.
                </p>
              </form>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
