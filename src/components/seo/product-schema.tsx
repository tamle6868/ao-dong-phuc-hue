import type { Product } from "@/types/product";
import { SITE } from "@/lib/constants";
import { JsonLd } from "./json-ld";

export function ProductSchema({ product }: { product: Product }) {
  const url = `${SITE.url}/san-pham/${product.slug}`;
  const data = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.shortDescription,
    image: product.images,
    sku: product.id,
    mpn: product.id,
    brand: { "@type": "Brand", name: "Áo Đồng Phục Huế" },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      reviewCount: product.reviewsCount,
      bestRating: 5,
      worstRating: 1,
    },
    offers: {
      "@type": "Offer",
      url,
      priceCurrency: "VND",
      price: product.price,
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
      priceValidUntil: `${new Date().getFullYear() + 1}-12-31`,
      seller: { "@type": "Organization", name: "Áo Đồng Phục Huế" },
    },
  };
  return <JsonLd id={`ld-product-${product.id}`} data={data} />;
}
