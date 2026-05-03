"use client";

import * as React from "react";
import { X } from "lucide-react";

import { LeadForm } from "@/components/landing/lead-form";

const STORAGE_KEY = "exit-intent-dismissed-v1";

/**
 * Desktop-only exit-intent popup. Triggers when mouse leaves viewport at top.
 * Dismissed state persists for 24h via localStorage. Skips on mobile (no
 * meaningful exit signal) and on SSR.
 */
type ExitIntentSource = React.ComponentProps<typeof LeadForm>["source"];

export function ExitIntent({
  source = "exit-intent",
}: {
  source?: ExitIntentSource;
}) {
  const [open, setOpen] = React.useState(false);
  const triggered = React.useRef(false);

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(max-width: 768px)").matches) return;

    try {
      const dismissed = localStorage.getItem(STORAGE_KEY);
      if (dismissed && Date.now() - Number(dismissed) < 24 * 60 * 60 * 1000) {
        return;
      }
    } catch {
      /* ignore */
    }

    function onMouseLeave(e: MouseEvent) {
      if (triggered.current) return;
      if (e.clientY <= 0) {
        triggered.current = true;
        setOpen(true);
      }
    }

    document.addEventListener("mouseleave", onMouseLeave);
    return () => document.removeEventListener("mouseleave", onMouseLeave);
  }, []);

  function dismiss() {
    setOpen(false);
    try {
      localStorage.setItem(STORAGE_KEY, String(Date.now()));
    } catch {
      /* ignore */
    }
  }

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="exit-intent-title"
      className="fixed inset-0 z-[60] grid place-items-center bg-black/70 px-4 py-8 animate-in fade-in"
      onClick={dismiss}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-border bg-background p-6 shadow-2xl md:p-8"
      >
        <button
          type="button"
          onClick={dismiss}
          aria-label="Đóng"
          className="absolute right-3 top-3 rounded-full p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground"
        >
          <X className="h-4 w-4" />
        </button>

        <p className="text-xs font-bold uppercase tracking-widest text-primary">
          Trước khi bạn đi…
        </p>
        <h2
          id="exit-intent-title"
          className="mt-1 font-display text-2xl tracking-wide md:text-3xl"
        >
          NHẬN BÁO GIÁ + MẪU 3D{" "}
          <span className="text-primary">MIỄN PHÍ</span>
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Để lại số điện thoại — đội ngũ tư vấn gọi lại trong 15 phút (giờ hành
          chính). Không spam, không gọi lung tung.
        </p>

        <div className="mt-5">
          <LeadForm source={source} variant="quote" />
        </div>

        <button
          type="button"
          onClick={dismiss}
          className="mt-3 w-full text-center text-xs text-muted-foreground hover:underline"
        >
          Để sau, cảm ơn
        </button>
      </div>
    </div>
  );
}
