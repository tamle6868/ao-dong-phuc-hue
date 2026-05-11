"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, Phone } from "lucide-react";

import { BUSINESS_INFO } from "@/lib/constants";
import { cn } from "@/lib/utils";

type Props = {
  /** When user scrolls past this many pixels, the CTA appears. */
  showAfterPx?: number;
  /** Path to the lead form anchor. Defaults to home `/lien-he`. */
  ctaHref?: string;
  /** CTA text. */
  ctaLabel?: string;
};

/**
 * Sticky CTA bar visible after the user scrolls past hero. Shows a phone
 * shortcut + a primary CTA. Hidden on `/admin/*` and `/san-pham/*` PDP routes
 * (PDP has its own AddToCartBar).
 */
export function StickyQuoteCTA({
  showAfterPx = 600,
  ctaHref = "/lien-he#bao-gia",
  ctaLabel = "Nhận báo giá",
}: Props) {
  const pathname = usePathname();
  const [show, setShow] = React.useState(false);
  // PDPs render their own AddToCartBar; cart/checkout pages don't need a CTA.
  const hideOnRoute =
    pathname?.startsWith("/san-pham/") ||
    pathname?.startsWith("/gio-hang") ||
    pathname?.startsWith("/tai-khoan");

  React.useEffect(() => {
    if (hideOnRoute) return;
    const onScroll = () => {
      setShow(window.scrollY > showAfterPx);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [showAfterPx, hideOnRoute]);

  if (hideOnRoute) return null;

  return (
    <div
      inert={!show}
      className={cn(
        "pointer-events-none fixed inset-x-0 bottom-[72px] z-40 flex justify-center px-3 transition-all duration-300 md:bottom-5",
        show
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0",
      )}
    >
      <div className="pointer-events-auto flex w-full max-w-md items-stretch overflow-hidden rounded-full border border-border bg-background/95 shadow-[0_10px_30px_-12px_rgba(0,0,0,0.35)] backdrop-blur md:max-w-lg">
        <a
          href={`tel:${BUSINESS_INFO.phoneE164}`}
          className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-foreground hover:bg-muted/60"
        >
          <Phone className="h-4 w-4 text-primary" />
          <span className="hidden md:inline">{BUSINESS_INFO.phone}</span>
          <span className="md:hidden">Gọi</span>
        </a>
        <Link
          href={ctaHref}
          className="ml-auto flex items-center gap-1.5 bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground hover:bg-primary/90"
        >
          {ctaLabel}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
