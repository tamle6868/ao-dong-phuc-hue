import type { Metadata, Viewport } from "next";
import { Inter, Bebas_Neue } from "next/font/google";
import "./globals.css";
import { BUSINESS_INFO, SITE } from "@/lib/constants";
import { LocalBusinessSchema } from "@/components/seo/local-business-schema";
import { MetaPixel } from "@/components/analytics/meta-pixel";
import { GoogleAnalytics } from "@/components/analytics/google-analytics";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "vietnamese"],
  display: "swap",
});

const bebas = Bebas_Neue({
  weight: "400",
  variable: "--font-bebas",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${BUSINESS_INFO.name} — ${BUSINESS_INFO.tagline}`,
    template: `%s | ${BUSINESS_INFO.name}`,
  },
  description: BUSINESS_INFO.description,
  keywords: [
    "áo đồng phục Huế",
    "áo bóng đá thiết kế",
    "đồng phục doanh nghiệp Huế",
    "áo lớp Huế",
    "in áo đồng phục",
    "xưởng may đồng phục Huế",
  ],
  applicationName: BUSINESS_INFO.name,
  authors: [{ name: BUSINESS_INFO.name, url: SITE.url }],
  creator: BUSINESS_INFO.name,
  publisher: BUSINESS_INFO.name,
  formatDetection: { telephone: true, address: true, email: true },
  openGraph: {
    type: "website",
    locale: SITE.locale,
    url: SITE.url,
    siteName: BUSINESS_INFO.name,
    title: `${BUSINESS_INFO.name} — ${BUSINESS_INFO.tagline}`,
    description: BUSINESS_INFO.description,
  },
  twitter: { card: "summary_large_image", site: SITE.twitterHandle },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="vi"
      className={`${inter.variable} ${bebas.variable} antialiased`}
    >
      <body className="min-h-screen bg-background text-foreground">
        <LocalBusinessSchema />
        {children}
        <MetaPixel />
        <GoogleAnalytics />
      </body>
    </html>
  );
}
