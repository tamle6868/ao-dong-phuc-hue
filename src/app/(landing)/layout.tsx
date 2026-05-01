import Link from "next/link";
import { Phone } from "lucide-react";
import { BUSINESS_INFO } from "@/lib/constants";
import { FloatingContact } from "@/components/layout/floating-contact";
import { PageTransition } from "@/components/layout/page-transition";

/**
 * Landing layout — optimized for ad traffic. Removes primary nav & bottom nav
 * to minimize distractions. Single CTA bar at the top, single floating CTA.
 */
export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2 tap-shrink">
            <span className="grid h-8 w-8 place-items-center rounded-md bg-primary text-primary-foreground font-display text-lg">
              Á
            </span>
            <span className="font-display text-sm tracking-wide md:text-base">
              {BUSINESS_INFO.name.toUpperCase()}
            </span>
          </Link>
          <a
            href={`tel:${BUSINESS_INFO.phoneE164}`}
            className="tap-shrink inline-flex h-10 items-center gap-1.5 rounded-md bg-primary px-3 text-sm font-semibold text-primary-foreground"
          >
            <Phone className="h-4 w-4" />
            <span className="hidden sm:inline">{BUSINESS_INFO.phone}</span>
            <span className="sm:hidden">Gọi ngay</span>
          </a>
        </div>
      </header>
      <main className="flex-1">
        <PageTransition>{children}</PageTransition>
      </main>
      <footer className="border-t border-border py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} {BUSINESS_INFO.name} — {BUSINESS_INFO.address.addressLocality}, {BUSINESS_INFO.address.addressRegion}
      </footer>
      <FloatingContact />
    </div>
  );
}
