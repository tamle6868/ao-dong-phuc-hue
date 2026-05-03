"use client";

import * as React from "react";
import { CheckCircle2 } from "lucide-react";

const EVENTS = [
  "Anh Minh — FC Sông Hương vừa đặt 18 áo Pro Elite",
  "Chị Hằng — Indochine Palace vừa đặt 320 áo Polo Premium",
  "Lớp 12A1 Quốc Học vừa đặt 45 áo lớp Graphic",
  "Anh Tuấn — FC Vỹ Dạ vừa đặt 22 áo Classic Stripe",
  "FPT Software Huế vừa đặt 180 áo polo doanh nghiệp",
  "Đại học Huế vừa đặt 60 áo team building",
  "Bệnh viện TW Huế vừa đặt 240 áo polo nhân viên",
  "Anh Phong — FC Phú Vang vừa đặt 14 áo Pro Elite",
];

const ROTATE_MS = 4500;
const INITIAL_DELAY_MS = 1500;

/**
 * Bottom-left toast that rotates "X just bought Y" social-proof events.
 * Renders only after a small delay (so it doesn't compete with hero) and
 * skips on `prefers-reduced-motion`.
 */
export function SocialProofTicker() {
  const [idx, setIdx] = React.useState(0);
  const [visible, setVisible] = React.useState(false);
  const [show, setShow] = React.useState(true);

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const initial = window.setTimeout(() => setVisible(true), INITIAL_DELAY_MS);
    return () => window.clearTimeout(initial);
  }, []);

  React.useEffect(() => {
    if (!visible) return;
    let timeout: number | null = null;
    const interval = window.setInterval(() => {
      setShow(false);
      timeout = window.setTimeout(() => {
        setIdx((i) => (i + 1) % EVENTS.length);
        setShow(true);
      }, 400);
    }, ROTATE_MS);
    return () => {
      window.clearInterval(interval);
      if (timeout !== null) window.clearTimeout(timeout);
    };
  }, [visible]);

  const minutesAgo = React.useMemo(() => ((idx * 7 + 3) % 8) + 2, [idx]);

  if (!visible) return null;

  return (
    <div
      aria-live="polite"
      className="pointer-events-none fixed bottom-[140px] left-3 z-30 hidden md:block md:bottom-5 md:left-5"
    >
      <div
        className={`pointer-events-auto flex max-w-xs items-start gap-2.5 rounded-xl border border-border bg-background/95 px-3.5 py-2.5 text-sm shadow-[0_10px_30px_-12px_rgba(0,0,0,0.35)] backdrop-blur transition-all duration-300 ${
          show ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
        }`}
      >
        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
        <div className="leading-snug">
          <p className="text-foreground">{EVENTS[idx]}</p>
          <p className="mt-0.5 text-[11px] text-muted-foreground">
            {minutesAgo} phút trước
          </p>
        </div>
      </div>
    </div>
  );
}
