import type { Metadata } from "next";
import { BUSINESS_INFO, SITE } from "./constants";

type BuildMetadataInput = {
  title: string;
  description?: string;
  path?: string;
  image?: string;
  noIndex?: boolean;
};

const TITLE_TEMPLATE = (title: string) => `${title} | ${BUSINESS_INFO.name}`;

export function buildMetadata(input: BuildMetadataInput): Metadata {
  const description = input.description ?? BUSINESS_INFO.description;
  const url = `${SITE.url}${input.path ?? ""}`;
  const image = input.image ?? SITE.defaultOgImage;
  const title = TITLE_TEMPLATE(input.title);

  return {
    title,
    description,
    metadataBase: new URL(SITE.url),
    alternates: { canonical: url },
    openGraph: {
      title,
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
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
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
