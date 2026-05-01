import type { MetadataRoute } from "next";
import { SITE } from "@/lib/constants";
import { products } from "@/data/products";
import { categories } from "@/data/categories";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = [
    { url: `${SITE.url}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE.url}/san-pham`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE.url}/lien-he`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE.url}/landing/ao-bong-da-thiet-ke`, lastModified: now, changeFrequency: "weekly", priority: 0.95 },
    { url: `${SITE.url}/landing/dong-phuc-doanh-nghiep`, lastModified: now, changeFrequency: "weekly", priority: 0.95 },
  ];

  const categoryEntries: MetadataRoute.Sitemap = categories.map((c) => ({
    url: `${SITE.url}/san-pham?danh-muc=${c.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const productEntries: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${SITE.url}/san-pham/${p.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.85,
  }));

  return [...staticEntries, ...categoryEntries, ...productEntries];
}
