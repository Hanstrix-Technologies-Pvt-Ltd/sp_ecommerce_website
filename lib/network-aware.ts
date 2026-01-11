/**
 * Network-Aware Image & Performance Optimization Utilities
 * Adapts loading strategy based on device network conditions (2G/3G/4G/5G)
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

type MinimalConnection = {
  effectiveType?: string;
  downlink?: number;
  rtt?: number;
  saveData?: boolean;
  addEventListener?: (type: string, listener: () => void) => void;
  removeEventListener?: (type: string, listener: () => void) => void;
};

export interface NetworkInfo {
  effectiveType: "slow-2g" | "2g" | "3g" | "4g" | "5g" | "unknown";
  downlink: number;
  rtt: number;
  saveData: boolean;
};

/**
 * Get network information from NavigatorConnection API
 * Used to determine adaptive loading strategies for images and assets
 */
export function getNetworkInfo(): NetworkInfo {
  if (typeof window === "undefined") {
    return {
      effectiveType: "unknown",
      downlink: 10,
      rtt: 50,
      saveData: false,
    };
  }

  const nav = navigator as Navigator & {
    connection?: MinimalConnection;
    mozConnection?: MinimalConnection;
    webkitConnection?: MinimalConnection;
  };
  const connection = nav.connection || nav.mozConnection || nav.webkitConnection;

  if (!connection) {
    return {
      effectiveType: "unknown",
      downlink: 10,
      rtt: 50,
      saveData: (navigator as any).connection?.saveData || false,
    };
  }

  return {
    effectiveType: (connection.effectiveType || "unknown") as NetworkInfo["effectiveType"],
    downlink: connection.downlink || 10,
    rtt: connection.rtt || 50,
    saveData: connection.saveData || false,
  };
}

/**
 * Determine if device is on slow network (2G or 3G)
 */
export function isSlowNetwork(): boolean {
  const network = getNetworkInfo();
  return (
    network.effectiveType === "slow-2g" ||
    network.effectiveType === "2g" ||
    network.effectiveType === "3g" ||
    (network.rtt > 300 && network.downlink < 1)
  );
}

/**
 * Determine if user has enabled data saver mode
 */
export function hasSaveDataEnabled(): boolean {
  if (typeof navigator === "undefined") return false;
  return (navigator as any).connection?.saveData || false;
}

/**
 * Get adaptive image dimensions based on network speed
 * Returns appropriate image size for slow networks to reduce bandwidth
 */
export function getAdaptiveImageDimensions(
  fullWidth: number,
  fullHeight: number
): { width: number; height: number; quality: number } {
  const network = getNetworkInfo();
  const isSlowConnection = isSlowNetwork();

  // For slow networks or data saver mode, reduce image size and quality
  if (isSlowConnection || hasSaveDataEnabled()) {
    return {
      width: Math.round(fullWidth * 0.5),
      height: Math.round(fullHeight * 0.5),
      quality: 60,
    };
  }

  // For 3G networks, use moderate reduction
  if (network.effectiveType === "3g") {
    return {
      width: Math.round(fullWidth * 0.75),
      height: Math.round(fullHeight * 0.75),
      quality: 75,
    };
  }

  // For 4G and above, use full quality
  return {
    width: fullWidth,
    height: fullHeight,
    quality: 85,
  };
}

/**
 * Get recommended image loading strategy based on network
 */
export function getImageLoadingStrategy(): {
  priority: boolean;
  eager: boolean;
  fetchPriority?: "high" | "low" | "auto";
} {
  const network = getNetworkInfo();

  if (network.effectiveType === "slow-2g" || network.effectiveType === "2g") {
    return {
      priority: false,
      eager: false,
      fetchPriority: "low",
    };
  }

  if (network.effectiveType === "3g") {
    return {
      priority: false,
      eager: false,
      fetchPriority: "auto",
    };
  }

  return {
    priority: true,
    eager: true,
    fetchPriority: "high",
  };
}

/**
 * Recommend delay for loading below-the-fold content
 * Longer delays for slow networks to improve perceived performance
 */
export function getImageLoadDelay(): number {
  const network = getNetworkInfo();

  if (isSlowNetwork()) {
    return 3000; // 3 seconds for 2G/3G
  }

  if (network.effectiveType === "3g") {
    return 1500; // 1.5 seconds for 3G
  }

  return 500; // 500ms for 4G+
}

/**
 * Should preload critical assets based on network?
 */
export function shouldPreloadAssets(): boolean {
  return !isSlowNetwork();
}

/**
 * Get recommended srcset for responsive images considering network
 * Format: "image-small.webp 480w, image-medium.webp 800w, image-large.webp 1200w"
 */
export function buildAdaptiveSrcSet(
  baseUrl: string,
  sizes: Array<{ width: number; suffix: string }>
): string {
  const network = getNetworkInfo();

  // For slow networks, only use smallest images
  if (isSlowNetwork()) {
    return sizes.slice(0, 1).map((s) => `${baseUrl}${s.suffix} ${s.width}w`).join(", ");
  }

  // For 3G, use only small-medium images
  if (network.effectiveType === "3g") {
    return sizes
      .slice(0, Math.ceil(sizes.length / 2))
      .map((s) => `${baseUrl}${s.suffix} ${s.width}w`)
      .join(", ");
  }

  // For 4G+, use all sizes
  return sizes.map((s) => `${baseUrl}${s.suffix} ${s.width}w`).join(", ");
}

/**
 * Monitor network changes and call callback when network type changes
 */
export function onNetworkChange(callback: (network: NetworkInfo) => void): () => void {
  if (typeof window === "undefined") {
    return () => {};
  }

  const connection =
    (navigator as any).connection ||
    (navigator as any).mozConnection ||
    (navigator as any).webkitConnection;

  if (!connection) {
    return () => {};
  }

  const handleChange = () => callback(getNetworkInfo());

  connection.addEventListener("change", handleChange);

  return () => {
    connection.removeEventListener("change", handleChange);
  };
}

/**
 * Create a minimal inline script to detect network before hydration
 * Only stores data in sessionStorage, does NOT modify DOM during hydration
 * This prevents hydration mismatches
 */
export function getNetworkDetectionScript(): string {
  return `
    (function() {
      var conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
      if (conn) {
        var type = conn.effectiveType || 'unknown';
        var isSlowNetwork = type === 'slow-2g' || type === '2g' || type === '3g' || (conn.rtt > 300 && conn.downlink < 1);
        var hasSaveData = conn.saveData || false;

        // Store in sessionStorage for quick access
        sessionStorage.setItem('network-type', type);
        sessionStorage.setItem('is-slow-network', isSlowNetwork ? 'true' : 'false');
        sessionStorage.setItem('save-data', hasSaveData ? 'true' : 'false');
      }
    })();
  `;
}

/**
 * Graceful fallback for environments without Network Information API
 */
export function hasNetworkAPI(): boolean {
  if (typeof window === "undefined") return false;
  return !!(
    (navigator as any).connection ||
    (navigator as any).mozConnection ||
    (navigator as any).webkitConnection
  );
}

/**
 * Helper: Should we disable animations for users on slow networks?
 */
export function shouldReduceMotion(): boolean {
  if (typeof window === "undefined") return false;

  // Check prefers-reduced-motion
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return true;
  }

  // Also reduce motion on slow networks
  return isSlowNetwork();
}
