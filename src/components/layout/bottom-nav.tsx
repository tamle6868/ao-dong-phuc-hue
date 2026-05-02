"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Home, Shirt, Sparkles, ShoppingBag, User } from "lucide-react";
import { BOTTOM_NAV } from "@/lib/constants";
import { cn } from "@/lib/utils";

const ICONS = {
  home: Home,
  shirt: Shirt,
  sparkles: Sparkles,
  "shopping-bag": ShoppingBag,
  user: User,
} as const;

export function BottomNav() {
  const pathname = usePathname();
  // Hide on product detail pages — AddToCartBar takes over the bottom slot.
  const isProductDetail =
    pathname?.startsWith("/san-pham/") && pathname !== "/san-pham/";
  if (isProductDetail) return null;

  return (
    <nav
      aria-label="Điều hướng dưới"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background/95 backdrop-blur pb-safe md:hidden"
    >
      <ul className="grid grid-cols-5 px-1.5 pt-1.5">
        {BOTTOM_NAV.map((item) => {
          const Icon = ICONS[item.icon as keyof typeof ICONS] ?? Home;
          const active =
            pathname === item.href ||
            (item.href !== "/" && pathname?.startsWith(item.href));

          if ("primary" in item && item.primary) {
            return (
              <li key={item.href} className="relative flex justify-center">
                <Link
                  href={item.href}
                  className="tap-shrink absolute -top-5 grid h-14 w-14 place-items-center rounded-full bg-primary text-primary-foreground shadow-[var(--shadow-pop)]"
                  aria-label={item.label}
                >
                  <Icon className="h-6 w-6" />
                </Link>
                <span className="mt-9 text-[11px] font-medium text-muted-foreground">
                  {item.label}
                </span>
              </li>
            );
          }

          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  "tap-shrink relative flex h-14 flex-col items-center justify-center gap-0.5 rounded-md text-[11px] font-medium transition-colors",
                  active ? "text-primary" : "text-muted-foreground hover:text-foreground",
                )}
                aria-current={active ? "page" : undefined}
              >
                <Icon className={cn("h-5 w-5", active && "scale-110")} />
                <span>{item.label}</span>
                {active && (
                  <motion.span
                    layoutId="bottom-nav-dot"
                    className="absolute -top-0.5 h-1 w-1 rounded-full bg-primary"
                  />
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
