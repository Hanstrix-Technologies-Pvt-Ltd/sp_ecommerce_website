"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

export default function AnalyticsConsent({ gaId }: { gaId?: string | null }) {
  const [consent, setConsent] = useState<"granted" | "denied" | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("ga_consent");
    if (stored === "granted" || stored === "denied") {
      // defer state update to microtask to satisfy lint rule
      queueMicrotask(() => setConsent(stored));
    } else {
      queueMicrotask(() => setConsent(null));
    }
  }, []);

  const accept = () => {
    localStorage.setItem("ga_consent", "granted");
    setConsent("granted");
  };

  const decline = () => {
    localStorage.setItem("ga_consent", "denied");
    setConsent("denied");
  };

  const showBanner = consent === null && !!gaId;
  const loadAnalytics = consent === "granted" && !!gaId;

  return (
    <>
      {loadAnalytics ? (
        <>
          <Script
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
          />
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

      {showBanner ? (
        <div className="fixed bottom-4 right-4 z-[100] max-w-sm rounded-lg border border-black/10 bg-white shadow-lg shadow-black/10">
          <div className="p-4 text-sm text-neutral-800 space-y-2">
            <p className="font-semibold">Analytics cookies</p>
            <p className="text-neutral-600">
              We use Google Analytics to improve our site. Allow analytics?
            </p>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={decline}
                className="rounded-md border border-neutral-300 px-3 py-1 text-sm font-medium text-neutral-700 hover:bg-neutral-100"
              >
                No
              </button>
              <button
                type="button"
                onClick={accept}
                className="rounded-md bg-[#006DDB] px-3 py-1 text-sm font-medium text-white hover:bg-[#0c4ca4]"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
