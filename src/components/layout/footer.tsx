import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { BUSINESS_INFO } from "@/lib/constants";

function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M22 12a10 10 0 1 0-11.6 9.9V14.9H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.4v6.9A10 10 0 0 0 22 12z" />
    </svg>
  );
}

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="mt-16 border-t border-border bg-accent text-accent-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 md:grid-cols-4 md:px-6">
        <div className="space-y-3">
          <div className="font-display text-2xl">
            {BUSINESS_INFO.name.toUpperCase()}
          </div>
          <p className="max-w-xs text-sm text-white/70">
            {BUSINESS_INFO.description}
          </p>
          <div className="flex items-center gap-3 pt-2">
            <a
              href={BUSINESS_INFO.socials.facebook}
              aria-label="Facebook"
              className="grid h-10 w-10 place-items-center rounded-md border border-white/15 hover:bg-white/10"
              target="_blank"
              rel="noopener"
            >
              <FacebookIcon className="h-4 w-4" />
            </a>
            <a
              href={BUSINESS_INFO.socials.instagram}
              aria-label="Instagram"
              className="grid h-10 w-10 place-items-center rounded-md border border-white/15 hover:bg-white/10"
              target="_blank"
              rel="noopener"
            >
              <InstagramIcon className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-white/90">
            Sản phẩm
          </h3>
          <ul className="space-y-2 text-sm text-white/70">
            <li><Link href="/san-pham" className="hover:text-white">Tất cả sản phẩm</Link></li>
            <li><Link href="/landing/ao-bong-da-thiet-ke" className="hover:text-white">Áo bóng đá</Link></li>
            <li><Link href="/landing/dong-phuc-doanh-nghiep" className="hover:text-white">Đồng phục doanh nghiệp</Link></li>
            <li><Link href="/san-pham" className="hover:text-white">Đồng phục lớp</Link></li>
          </ul>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-white/90">
            Hỗ trợ
          </h3>
          <ul className="space-y-2 text-sm text-white/70">
            <li><Link href="/lien-he" className="hover:text-white">Liên hệ báo giá</Link></li>
            <li><Link href="/landing/dong-phuc-doanh-nghiep" className="hover:text-white">Mẫu 3D miễn phí</Link></li>
            <li><Link href="/" className="hover:text-white">Chính sách giao hàng</Link></li>
            <li><Link href="/" className="hover:text-white">Chính sách đổi trả</Link></li>
          </ul>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-white/90">
            Liên hệ
          </h3>
          <ul className="space-y-2.5 text-sm text-white/70">
            <li className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
              <span>
                {BUSINESS_INFO.address.streetAddress}, {BUSINESS_INFO.address.addressLocality}, {BUSINESS_INFO.address.addressRegion}
              </span>
            </li>
            <li className="flex items-center gap-2.5">
              <Phone className="h-4 w-4 shrink-0" />
              <a href={`tel:${BUSINESS_INFO.phoneE164}`} className="hover:text-white">
                {BUSINESS_INFO.phone}
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail className="h-4 w-4 shrink-0" />
              <a href={`mailto:${BUSINESS_INFO.email}`} className="hover:text-white">
                {BUSINESS_INFO.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-white/50 md:flex-row md:px-6">
          <span>© {new Date().getFullYear()} {BUSINESS_INFO.name}. All rights reserved.</span>
          <span>Made with ❤️ in Huế</span>
        </div>
      </div>
    </footer>
  );
}
