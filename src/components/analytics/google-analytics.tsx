import Script from "next/script";

/**
 * Google Analytics (GA4) — lazy-loaded.
 *
 * Renders nothing when `NEXT_PUBLIC_GA_MEASUREMENT_ID` is not set.
 */
export function GoogleAnalytics() {
  const id = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim();
  if (!id) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${id}`}
        strategy="lazyOnload"
      />
      <Script id="ga4-init" strategy="lazyOnload">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${id}', { send_page_view: true });`}
      </Script>
    </>
  );
}
