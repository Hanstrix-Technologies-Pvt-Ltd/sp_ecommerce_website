/**
 * Core Web Vitals Monitoring & Optimization
 * Tracks LCP, FID/INP, CLS, TTFB, FCP for performance analysis
 *
 * @see https://web.dev/articles/vitals
 */

export interface VitalsMetrics {
  lcp?: number; // Largest Contentful Paint (ms) - target: < 2500ms
  fid?: number; // First Input Delay (ms) - target: < 100ms
  inp?: number; // Interaction to Next Paint (ms) - target: < 200ms
  cls?: number; // Cumulative Layout Shift - target: < 0.1
  ttfb?: number; // Time to First Byte (ms) - target: < 600ms
  fcp?: number; // First Contentful Paint (ms) - target: < 1800ms
  domInteractive?: number;
  domContentLoaded?: number;
}

interface ThresholdConfig {
  good: number;
  needsImprovement: number;
}

const THRESHOLDS = {
  lcp: { good: 2500, needsImprovement: 4000 },
  fid: { good: 100, needsImprovement: 300 },
  inp: { good: 200, needsImprovement: 500 },
  cls: { good: 0.1, needsImprovement: 0.25 },
  ttfb: { good: 600, needsImprovement: 1200 },
  fcp: { good: 1800, needsImprovement: 3000 },
};

type VitalStatus = "good" | "needs-improvement" | "poor";

export interface VitalResult {
  metric: string;
  value: number;
  status: VitalStatus;
  threshold: ThresholdConfig;
}

/**
 * Assess vital metric against thresholds
 */
function getVitalStatus(metric: keyof typeof THRESHOLDS, value: number): VitalStatus {
  const threshold = THRESHOLDS[metric];
  if (value <= threshold.good) return "good";
  if (value <= threshold.needsImprovement) return "needs-improvement";
  return "poor";
}

/**
 * Monitor Largest Contentful Paint (LCP)
 * Identifies when the page's main content has likely loaded
 * Target: < 2.5 seconds
 */
export function monitorLCP(callback: (metric: VitalResult) => void): () => void {
  if (typeof window === "undefined" || !("PerformanceObserver" in window)) {
    return () => {};
  }

  const observer = new PerformanceObserver((list) => {
    const entries = list.getEntries();
    const lastEntry = entries[entries.length - 1] as any;
    const lcp = Math.round(lastEntry.renderTime || lastEntry.loadTime);

    callback({
      metric: "LCP",
      value: lcp,
      status: getVitalStatus("lcp", lcp),
      threshold: THRESHOLDS.lcp,
    });
  });

  try {
    observer.observe({ entryTypes: ["largest-contentful-paint"] });

    return () => observer.disconnect();
  } catch {
    return () => {};
  }
}

/**
 * Monitor First Input Delay (FID)
 * Measures time from user interaction to browser response
 * Target: < 100ms (deprecated in favor of INP)
 */
export function monitorFID(callback: (metric: VitalResult) => void): () => void {
  if (typeof window === "undefined" || !("PerformanceObserver" in window)) {
    return () => {};
  }

  const observer = new PerformanceObserver((list) => {
    list.getEntries().forEach((entry: any) => {
      const fid = Math.round(entry.processingDuration);

      callback({
        metric: "FID",
        value: fid,
        status: getVitalStatus("fid", fid),
        threshold: THRESHOLDS.fid,
      });
    });
  });

  try {
    observer.observe({ entryTypes: ["first-input"] });

    return () => observer.disconnect();
  } catch {
    return () => {};
  }
}

/**
 * Monitor Interaction to Next Paint (INP)
 * Measures all interactions on page (successor to FID)
 * Target: < 200ms
 */
export function monitorINP(callback: (metric: VitalResult) => void): () => void {
  if (typeof window === "undefined" || !("PerformanceObserver" in window)) {
    return () => {};
  }

  let worstINP = 0;

  const observer = new PerformanceObserver((list) => {
    list.getEntries().forEach((entry: any) => {
      const inp = Math.round(entry.duration);

      if (inp > worstINP) {
        worstINP = inp;

        callback({
          metric: "INP",
          value: inp,
          status: getVitalStatus("inp", inp),
          threshold: THRESHOLDS.inp,
        });
      }
    });
  });

  try {
    observer.observe({ entryTypes: ["event"] });

    return () => observer.disconnect();
  } catch {
    return () => {};
  }
}

/**
 * Monitor Cumulative Layout Shift (CLS)
 * Measures visual stability - unexpected layout shifts
 * Target: < 0.1
 */
export function monitorCLS(callback: (metric: VitalResult) => void): () => void {
  if (typeof window === "undefined" || !("PerformanceObserver" in window)) {
    return () => {};
  }

  let clsValue = 0;

  const observer = new PerformanceObserver((list) => {
    list.getEntries().forEach((entry: any) => {
      // Only count shifts without recent user input
      if (!entry.hadRecentInput) {
        clsValue += entry.value;

        callback({
          metric: "CLS",
          value: parseFloat(clsValue.toFixed(3)),
          status: getVitalStatus("cls", clsValue),
          threshold: THRESHOLDS.cls,
        });
      }
    });
  });

  try {
    observer.observe({ entryTypes: ["layout-shift"] });

    return () => observer.disconnect();
  } catch {
    return () => {};
  }
}

/**
 * Get Time To First Byte from Navigation Timing API
 * Measures server response time
 * Target: < 600ms
 */
export function getTTFB(): VitalResult | null {
  if (typeof window === "undefined" || !("performance" in window)) {
    return null;
  }

  const navigation = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming;

  if (!navigation) return null;

  const ttfb = Math.round(navigation.responseStart - navigation.fetchStart);

  return {
    metric: "TTFB",
    value: ttfb,
    status: getVitalStatus("ttfb", ttfb),
    threshold: THRESHOLDS.ttfb,
  };
}

/**
 * Get First Contentful Paint
 * Measures when first content is painted
 * Target: < 1.8 seconds
 */
export function getFCP(): VitalResult | null {
  if (typeof window === "undefined" || !("PerformanceObserver" in window)) {
    return null;
  }

  const fcp = performance.getEntriesByName("first-contentful-paint")[0] as PerformanceEntry;

  if (!fcp) return null;

  const value = Math.round(fcp.startTime);

  return {
    metric: "FCP",
    value,
    status: getVitalStatus("fcp", value),
    threshold: THRESHOLDS.fcp,
  };
}

/**
 * Get all Performance Navigation Timing metrics
 */
export function getPerformanceMetrics(): VitalsMetrics {
  if (typeof window === "undefined" || !("performance" in window)) {
    return {};
  }

  const navigation = performance.getEntriesByType("navigation")[0] as any;

  if (!navigation) return {};

  return {
    ttfb: Math.round(navigation.responseStart - navigation.fetchStart),
    fcp: getFCP()?.value,
    domInteractive: Math.round(navigation.domInteractive - navigation.fetchStart),
    domContentLoaded: Math.round(navigation.domContentLoaded - navigation.fetchStart),
  };
}

/**
 * Send metrics to analytics service
 * Integrates with Google Analytics, custom endpoint, etc.
 */
export function sendMetricsToAnalytics(
  metrics: VitalsMetrics,
  analyticsEndpoint?: string
): void {
  if (!metrics || Object.keys(metrics).length === 0) {
    return;
  }

  // Send to Google Analytics if available
  if (typeof window !== "undefined" && typeof (window as any).gtag !== "undefined") {
    const params: Record<string, any> = {};

    if (metrics.lcp) params.LCP = Math.round(metrics.lcp);
    if (metrics.fid) params.FID = Math.round(metrics.fid);
    if (metrics.inp) params.INP = Math.round(metrics.inp);
    if (metrics.cls) params.CLS = parseFloat(metrics.cls!.toFixed(3));
    if (metrics.ttfb) params.TTFB = Math.round(metrics.ttfb);
    if (metrics.fcp) params.FCP = Math.round(metrics.fcp);

    (window as any).gtag("event", "page_view", params);
  }

  // Send to custom endpoint if provided
  if (analyticsEndpoint) {
    try {
      navigator.sendBeacon(analyticsEndpoint, JSON.stringify(metrics));
    } catch {
      // Silently fail if sendBeacon not available
    }
  }
}

/**
 * Detect if device has reduced motion preference
 * Users with this preference should have animations disabled
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;

  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Helper: Format metrics for console logging
 */
export function formatMetricsForLogging(metrics: Record<string, VitalResult>): string {
  return Object.entries(metrics)
    .map(
      ([key, vital]) =>
        `${vital.metric}: ${vital.value}ms (${vital.status.toUpperCase()})`
    )
    .join("\n");
}

/**
 * Check if all vitals are within good thresholds
 */
export function allVitalsGood(metrics: Record<string, VitalResult>): boolean {
  return Object.values(metrics).every((vital) => vital.status === "good");
}
