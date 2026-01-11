"use client";
/* eslint-disable react-hooks/set-state-in-effect */

import { useEffect, useState } from "react";
import {
  isSlowNetwork,
  hasSaveDataEnabled,
  onNetworkChange,
  shouldReduceMotion,
} from "@/lib/network-aware";

interface NetworkAwareWrapperProps {
  children: React.ReactNode;
  slowNetworkFallback?: React.ReactNode;
  onNetworkChange?: (isSlowNetwork: boolean) => void;
  className?: string;
}

/**
 * NetworkAwareWrapper Component
 * Detects network conditions and renders appropriate content
 * Shows lightweight fallback on 2G/3G networks
 */
export function NetworkAwareWrapper({
  children,
  slowNetworkFallback,
  onNetworkChange: onNetworkChangeCallback,
  className = "",
}: NetworkAwareWrapperProps) {
  const [mounted, setMounted] = useState(false);
  const [isSlowConn, setIsSlowConn] = useState(false);
  const [hasDataSaver, setHasDataSaver] = useState(false);
  const [shouldReduceMotions, setShouldReduceMotions] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Check initial network state
    const initialIsSlowNetwork = isSlowNetwork();
    const initialHasDataSaver = hasSaveDataEnabled();
    const initialReduceMotion = shouldReduceMotion();

    setIsSlowConn(initialIsSlowNetwork);
    setHasDataSaver(initialHasDataSaver);
    setShouldReduceMotions(initialReduceMotion);

    // Call callback with initial state
    onNetworkChangeCallback?.(initialIsSlowNetwork);

    // Listen for network changes
    const unsubscribe = onNetworkChange((network) => {
      const isNowSlow = network.effectiveType === "slow-2g" || network.effectiveType === "2g" || network.effectiveType === "3g";
      setIsSlowConn(isNowSlow);
      setHasDataSaver(network.saveData);
      onNetworkChangeCallback?.(isNowSlow);
    });

    return () => unsubscribe();
  }, [onNetworkChangeCallback]);

  // Show loading state until client-side network detection completes
  if (!mounted) {
    return <div className={className}>{children}</div>;
  }

  // Show fallback on slow networks if provided
  if (slowNetworkFallback && (isSlowConn || hasDataSaver)) {
    return (
      <div className={className} data-network="slow">
        {slowNetworkFallback}
      </div>
    );
  }

  // Apply motion reduction classes
  const motionClasses = shouldReduceMotions
    ? "motion-safe:animate-none motion-reduce:animate-none"
    : "";

  return (
    <div className={`${className} ${motionClasses}`} data-network={isSlowConn ? "slow" : "fast"}>
      {children}
    </div>
  );
}

/**
 * LazyWrapper Component
 * Defers rendering of content until user scrolls into view
 * Great for below-the-fold heavy components
 */
export function LazyWrapper({
  children,
  placeholder,
  onVisible,
}: {
  children: React.ReactNode;
  placeholder?: React.ReactNode;
  onVisible?: () => void;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const [observerRef, setObserverRef] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!observerRef) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          onVisible?.();
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.01 }
    );

    observer.observe(observerRef);

    return () => observer.disconnect();
  }, [observerRef, onVisible]);

  return (
    <div ref={setObserverRef}>
      {isVisible ? children : placeholder || <div className="h-96 bg-gray-100" />}
    </div>
  );
}

/**
 * ConditionalRender Component
 * Renders different content based on network conditions
 */
export function ConditionalRender({
  fast,
  slow,
}: {
  fast: React.ReactNode;
  slow: React.ReactNode;
}) {
  const [isSlow, setIsSlow] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsSlow(isSlowNetwork());
  }, []);

  if (!mounted) return <>{fast}</>;

  return <>{isSlow ? slow : fast}</>;
}

/**
 * VideoOptimizer Component
 * Disables autoplay on slow networks or with data saver
 */
export function VideoOptimizer({
  src,
  poster,
  controls = true,
  className = "",
}: {
  src: string;
  poster?: string;
  controls?: boolean;
  className?: string;
}) {
  const [mounted, setMounted] = useState(false);
  const [shouldAutoplay, setShouldAutoplay] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Don't autoplay on slow networks
    if (!isSlowNetwork() && !hasSaveDataEnabled()) {
      setShouldAutoplay(true);
    }
  }, []);

  if (!mounted) {
    return (
      <video
        poster={poster}
        controls={controls}
        className={className}
        style={{ backgroundColor: "#000" }}
      >
        <source src={src} type="video/mp4" />
        Your browser does not support video playback.
      </video>
    );
  }

  return (
    <video
      src={src}
      poster={poster}
      controls={controls}
      autoPlay={shouldAutoplay}
      muted={shouldAutoplay}
      loop={shouldAutoplay}
      playsInline
      className={className}
      style={{ backgroundColor: "#000" }}
    >
      <source src={src} type="video/mp4" />
      Your browser does not support video playback.
    </video>
  );
}

/**
 * AnimationReducer Component
 * Disables framer-motion animations on slow networks or reduced-motion preference
 */
export function AnimationReducer({
  children,
}: {
  children: React.ReactNode;
}) {
  const [shouldReduceMotions, setShouldReduceMotions] = useState(false);

  useEffect(() => {
    setShouldReduceMotions(shouldReduceMotion());
  }, []);

  if (shouldReduceMotions) {
    return (
      <style>{`
        * {
          animation-duration: 0s !important;
          animation-delay: 0s !important;
          transition-duration: 0s !important;
          transition-delay: 0s !important;
        }
      `}</style>
    );
  }

  return <>{children}</>;
}

/**
 * SkeletonLoader Component
 * Shows while content loads (useful with Suspense)
 */
export function SkeletonLoader({ lines = 3 }: { lines?: number }) {
  return (
    <div className="space-y-4 animate-pulse">
      {Array.from({ length: lines }).map((_, i) => (
        <div key={i} className="h-4 bg-gray-200 rounded"></div>
      ))}
    </div>
  );
}
