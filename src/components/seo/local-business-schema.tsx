import { BUSINESS_INFO, SITE } from "@/lib/constants";
import { JsonLd } from "./json-ld";

export function LocalBusinessSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "ClothingStore",
    "@id": `${SITE.url}/#localbusiness`,
    name: BUSINESS_INFO.name,
    legalName: BUSINESS_INFO.legalName,
    description: BUSINESS_INFO.description,
    url: SITE.url,
    telephone: BUSINESS_INFO.phoneE164,
    email: BUSINESS_INFO.email,
    image: `${SITE.url}${SITE.defaultOgImage}`,
    logo: `${SITE.url}/logo.png`,
    priceRange: "₫₫",
    address: {
      "@type": "PostalAddress",
      streetAddress: BUSINESS_INFO.address.streetAddress,
      addressLocality: BUSINESS_INFO.address.addressLocality,
      addressRegion: BUSINESS_INFO.address.addressRegion,
      postalCode: BUSINESS_INFO.address.postalCode,
      addressCountry: BUSINESS_INFO.address.addressCountry,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: BUSINESS_INFO.geo.latitude,
      longitude: BUSINESS_INFO.geo.longitude,
    },
    openingHoursSpecification: BUSINESS_INFO.openingHours.map((s) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: s.days,
      opens: s.opens,
      closes: s.closes,
    })),
    areaServed: BUSINESS_INFO.shippingAreas.map((a) => ({
      "@type": "AdministrativeArea",
      name: a,
    })),
    sameAs: Object.values(BUSINESS_INFO.socials),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: 4.9,
      reviewCount: 1240,
      bestRating: 5,
      worstRating: 1,
    },
  };

  return <JsonLd id="ld-localbusiness" data={data} />;
}
