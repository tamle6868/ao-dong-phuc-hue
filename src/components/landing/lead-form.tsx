"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

type Source =
  | "ao-bong-da-thiet-ke"
  | "dong-phuc-doanh-nghiep"
  | "footer"
  | "home"
  | "exit-intent"
  | "lien-he";

type FormState = {
  fullName: string;
  phone: string;
  company?: string;
  qty: string;
  message: string;
};

type FormProps = {
  source: Source;
  variant: "quote" | "mockup3d";
  className?: string;
};

const VARIANT_COPY = {
  quote: {
    title: "Nhận báo giá theo team / lớp",
    subtitle:
      "Điền thông tin — đội ngũ tư vấn sẽ gọi lại trong 15 phút (giờ hành chính).",
    cta: "Gửi yêu cầu báo giá",
    successTitle: "Đã gửi yêu cầu!",
    successText:
      "Cảm ơn bạn. Chúng tôi sẽ gọi lại trong 15 phút để tư vấn chất vải, in ấn và chốt mẫu.",
  },
  mockup3d: {
    title: "Nhận mẫu thiết kế 3D miễn phí trong 30 phút",
    subtitle:
      "Để lại thông tin — designer sẽ phối màu logo lên áo và gửi file 3D qua Zalo trong 30 phút.",
    cta: "Yêu cầu mẫu 3D miễn phí",
    successTitle: "Đã nhận yêu cầu thiết kế 3D!",
    successText:
      "Designer đang xử lý — bạn sẽ nhận file phối màu qua Zalo trong 30 phút (giờ hành chính).",
  },
} as const;

export function LeadForm({ source, variant, className }: FormProps) {
  const copy = VARIANT_COPY[variant];
  const [data, setData] = useState<FormState>({
    fullName: "",
    phone: "",
    company: "",
    qty: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage(null);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, source, variant }),
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

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className={cn(
          "rounded-xl border border-success/20 bg-success/5 p-6 text-center",
          className,
        )}
      >
        <CheckCircle2 className="mx-auto h-12 w-12 text-success" />
        <h3 className="mt-3 text-lg font-bold">{copy.successTitle}</h3>
        <p className="mx-auto mt-1.5 max-w-md text-sm text-muted-foreground">
          {copy.successText}
        </p>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        "rounded-xl border border-border bg-background p-5 shadow-[var(--shadow-soft)] md:p-6",
        className,
      )}
    >
      <h3 className="text-lg font-bold tracking-tight md:text-xl">{copy.title}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{copy.subtitle}</p>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="lead-name">Họ và tên *</Label>
          <Input
            id="lead-name"
            required
            aria-required="true"
            autoComplete="name"
            value={data.fullName}
            onChange={(e) => setData({ ...data, fullName: e.target.value })}
            placeholder="VD: Nguyễn Văn A"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="lead-phone">Số điện thoại *</Label>
          <Input
            id="lead-phone"
            type="tel"
            required
            aria-required="true"
            aria-describedby={errorMessage ? "lead-form-error" : undefined}
            inputMode="tel"
            autoComplete="tel"
            pattern={"^(0|\\+84)[0-9]{9,10}$"}
            value={data.phone}
            onChange={(e) =>
              setData({
                ...data,
                phone: e.target.value.replace(/[\s.\-()]/g, ""),
              })
            }
            placeholder="VD: 0905 000 000"
          />
        </div>
        {variant === "mockup3d" && (
          <div className="space-y-1.5 sm:col-span-2">
            <Label htmlFor="lead-company">Công ty / Đơn vị</Label>
            <Input
              id="lead-company"
              autoComplete="organization"
              value={data.company}
              onChange={(e) => setData({ ...data, company: e.target.value })}
              placeholder="VD: Công ty TNHH ABC"
            />
          </div>
        )}
        <div className="space-y-1.5">
          <Label htmlFor="lead-qty">Số lượng dự kiến</Label>
          <Input
            id="lead-qty"
            inputMode="numeric"
            value={data.qty}
            onChange={(e) =>
              setData({ ...data, qty: e.target.value.replace(/[^0-9]/g, "") })
            }
            placeholder="VD: 30"
          />
        </div>
        <div className="space-y-1.5 sm:col-span-2">
          <Label htmlFor="lead-message">Yêu cầu thêm</Label>
          <Textarea
            id="lead-message"
            value={data.message}
            onChange={(e) => setData({ ...data, message: e.target.value })}
            placeholder="VD: Cần áo polo cá sấu, thêu logo bên ngực trái, màu navy."
          />
        </div>
      </div>

      {errorMessage && (
        <p
          id="lead-form-error"
          role="alert"
          className="mt-3 text-sm text-destructive"
        >
          {errorMessage}
        </p>
      )}

      <Button
        type="submit"
        size="lg"
        block
        disabled={status === "loading"}
        className="mt-5"
      >
        {status === "loading" ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Send className="h-4 w-4" />
        )}
        {copy.cta}
      </Button>
      <p className="mt-3 text-center text-[11px] text-muted-foreground">
        Bằng cách gửi, bạn đồng ý cho chúng tôi liên hệ tư vấn qua điện thoại / Zalo.
      </p>
    </form>
  );
}
