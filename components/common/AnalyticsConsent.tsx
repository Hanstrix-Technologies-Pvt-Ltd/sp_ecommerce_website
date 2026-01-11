"use client";

import { useEffect } from "react";
import Script from "next/script";

export default function AnalyticsConsent({ gaId }: { gaId?: string | null }) {
  useEffect(() => {
    if (!gaId) return;
    try {
      localStorage.setItem("ga_consent", "granted");
    } catch {
      // storage failures are non-blocking
    }
  }, [gaId]);

  const shouldLoadAnalytics = Boolean(gaId);

  return (
    <>
      {shouldLoadAnalytics ? (
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
      ) : null}
    </>
  );
}
