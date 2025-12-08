"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

export default function AnalyticsConsent({ gaId }: { gaId?: string | null }) {
  const [loadAnalytics, setLoadAnalytics] = useState(false);

  useEffect(() => {
    if (!gaId) return;
    try {
      localStorage.setItem("ga_consent", "granted");
    } catch {
      // ignore storage errors and still load analytics
    }
    setLoadAnalytics(true);
  }, [gaId]);

  if (!gaId || !loadAnalytics) return null;

  return (
    <>
      <Script strategy="afterInteractive" src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gaId}', {
              page_path: window.location.pathname,
              anonymize_ip: true,
              send_page_view: true,
            });
          `,
        }}
      />
    </>
  );
}
