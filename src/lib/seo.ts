import type { Metadata } from "next";
import { BUSINESS_INFO, SITE } from "./constants";

type BuildMetadataInput = {
  title: string;
  description?: string;
  path?: string;
  image?: string;
  noIndex?: boolean;
};

/**
 * Apply the brand suffix manually for social-card titles (`og:title`,
 * `twitter:title`). The Metadata API's `title.template` (defined in the root
 * layout) handles the `<title>` tag automatically — so the page-level `title`
 * is passed through as a plain string to avoid double-wrapping the brand.
 */
const SOCIAL_TITLE = (title: string) => `${title} | ${BUSINESS_INFO.name}`;

export function buildMetadata(input: BuildMetadataInput): Metadata {
  const description = input.description ?? BUSINESS_INFO.description;
  const url = `${SITE.url}${input.path ?? ""}`;
  const image = input.image ?? SITE.defaultOgImage;
  const socialTitle = SOCIAL_TITLE(input.title);

  return {
    title: input.title,
    description,
    metadataBase: new URL(SITE.url),
    alternates: { canonical: url },
    openGraph: {
      title: socialTitle,
      description,
      url,
      siteName: BUSINESS_INFO.name,
      locale: SITE.locale,
      type: "website",
      images: [
        {
          url: image.startsWith("http") ? image : `${SITE.url}${image}`,
          width: 1200,
          height: 630,
          alt: socialTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [image.startsWith("http") ? image : `${SITE.url}${image}`],
    },
    robots: input.noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true, googleBot: { index: true, follow: true } },
    icons: {
      icon: "/favicon.ico",
      apple: "/apple-touch-icon.png",
    },
  };
}

/** JSON-LD safe stringify (escapes `<` to prevent XSS in inline scripts). */
export function jsonLdString(payload: unknown): string {
  return JSON.stringify(payload).replace(/</g, "\\u003c");
}
