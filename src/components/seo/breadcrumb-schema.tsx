import { SITE } from "@/lib/constants";
import { JsonLd } from "./json-ld";

export type BreadcrumbItem = { name: string; href: string };

export function BreadcrumbSchema({ items }: { items: BreadcrumbItem[] }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: item.name,
      item: `${SITE.url}${item.href}`,
    })),
  };
  return <JsonLd id="ld-breadcrumb" data={data} />;
}
