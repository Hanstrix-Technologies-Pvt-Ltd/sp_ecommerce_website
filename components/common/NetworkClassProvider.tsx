'use client';

import { useEffect } from 'react';

/**
 * Client-side component that applies network-based classes to the html element
 * after hydration is complete. This prevents hydration mismatches while still
 * enabling network-aware CSS optimizations.
 */
export function NetworkClassProvider(): null {
  useEffect(() => {
    // Apply network class after hydration
    const isSlow = sessionStorage.getItem('is-slow-network') === 'true';
    const hasSaveData = sessionStorage.getItem('save-data') === 'true';

    if (isSlow || hasSaveData) {
      document.documentElement.classList.add('slow-network');
      document.documentElement.classList.remove('fast-network');
    } else {
      document.documentElement.classList.add('fast-network');
      document.documentElement.classList.remove('slow-network');
    }

    // Listen for network changes
    type MinimalConnection = {
      effectiveType?: string;
      downlink?: number;
      rtt?: number;
      saveData?: boolean;
      addEventListener?: (type: string, listener: () => void) => void;
      removeEventListener?: (type: string, listener: () => void) => void;
    };

    const nav = navigator as Navigator & {
      connection?: MinimalConnection;
      mozConnection?: MinimalConnection;
      webkitConnection?: MinimalConnection;
    };
    const connection = nav.connection || nav.mozConnection || nav.webkitConnection;

    if (connection) {
      const handleNetworkChange = () => {
        const type = connection.effectiveType || 'unknown';
        const rtt = connection.rtt ?? 0;
        const downlink = connection.downlink ?? 0;
        const isSlowNetwork =
          type === 'slow-2g' ||
          type === '2g' ||
          type === '3g' ||
          (rtt > 300 && downlink < 1);
        const hasSaveData = connection.saveData || false;

        sessionStorage.setItem('network-type', type);
        sessionStorage.setItem('is-slow-network', isSlowNetwork ? 'true' : 'false');
        sessionStorage.setItem('save-data', hasSaveData ? 'true' : 'false');

        if (isSlowNetwork || hasSaveData) {
          document.documentElement.classList.add('slow-network');
          document.documentElement.classList.remove('fast-network');
        } else {
          document.documentElement.classList.add('fast-network');
          document.documentElement.classList.remove('slow-network');
        }
      };

      connection.addEventListener?.('change', handleNetworkChange);
      return () => connection.removeEventListener?.('change', handleNetworkChange);
    }
  }, []);

  // This component doesn't render anything
  return null;
}
