"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { MessageCircle, Phone } from "lucide-react";
import { BUSINESS_INFO, PRIMARY_NAV } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { BrandMark } from "./brand-mark";

export function Header() {
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-3 px-4 md:h-16 md:px-6">
        <Link href="/" className="flex items-center gap-2 tap-shrink">
          <BrandMark className="h-9 w-auto" />
          <span className="hidden flex-col leading-tight sm:flex">
            <span className="font-display text-base text-foreground">
              {BUSINESS_INFO.name.toUpperCase()}
            </span>
            <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
              Premium Sportswear
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {PRIMARY_NAV.map((item) => {
            const active =
              pathname === item.href ||
              (item.href !== "/" && pathname?.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  active
                    ? "text-primary"
                    : "text-foreground/80 hover:text-foreground hover:bg-muted",
                )}
              >
                {item.label}
                {active && (
                  <motion.span
                    layoutId="header-underline"
                    className="absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-primary"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={`https://zalo.me/${BUSINESS_INFO.zalo}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat Zalo"
            className="grid h-10 w-10 place-items-center rounded-md border border-border tap-shrink hover:bg-muted md:hidden"
          >
            <MessageCircle className="h-4 w-4 text-[#0068ff]" />
          </a>
          <a
            href={`tel:${BUSINESS_INFO.phoneE164}`}
            className="hidden h-10 items-center gap-1.5 rounded-md bg-primary px-3 text-sm font-semibold text-primary-foreground tap-shrink md:inline-flex"
            aria-label={`Gọi ${BUSINESS_INFO.phone}`}
          >
            <Phone className="h-4 w-4" />
            {BUSINESS_INFO.phone}
          </a>
        </div>
      </div>
    </header>
  );
}
