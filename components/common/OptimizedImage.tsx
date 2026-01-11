"use client";
/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @next/next/no-img-element */

import Image from "next/image";
import { useState, useEffect } from "react";
import { isSlowNetwork, hasSaveDataEnabled } from "@/lib/network-aware";

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  lazy?: boolean;
  sizes?: string;
  responsive?: boolean;
  // Network-aware overrides
  slowNetworkSrc?: string; // Fallback for slow networks
  quality?: number;
  // Layout shift prevention
  aspectRatio?: string;
  containerClassName?: string;
}

/**
 * OptimizedImage Component
 * Adapts image loading, quality, and size based on network conditions
 * Prevents Cumulative Layout Shift with explicit dimensions
 * Supports modern formats (WebP, AVIF) with fallbacks
 */
export default function OptimizedImage({
  src,
  alt,
  width = 800,
  height = 600,
  className = "",
  priority = false,
  lazy = true,
  sizes,
  responsive = true,
  slowNetworkSrc,
  quality = 85,
  aspectRatio = `${width}/${height}`,
  containerClassName = "",
}: OptimizedImageProps) {
  const [isSlowConnection, setIsSlowConnection] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [hasDataSaver, setHasDataSaver] = useState(false);

  // Only run on client to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
    setIsSlowConnection(isSlowNetwork());
    setHasDataSaver(hasSaveDataEnabled());
  }, []);

  // Don't render until mounted to prevent hydration issues
  if (!mounted) {
    return (
      <div
        className={containerClassName}
        style={{
          aspectRatio,
          backgroundColor: "#f3f4f6",
        }}
        aria-label={alt}
      />
    );
  }

  // Use fallback image for slow networks if available
  const imageSrc =
    (isSlowConnection || hasDataSaver) && slowNetworkSrc ? slowNetworkSrc : src;

  // Determine loading strategy based on network
  const loading =
    isSlowConnection || hasDataSaver
      ? ("lazy" as const) // Always lazy load on slow networks
      : priority
        ? ("eager" as const)
        : lazy
          ? ("lazy" as const)
          : ("eager" as const);

  // Adjust quality for slow networks
  const effectiveQuality =
    isSlowConnection || hasDataSaver ? Math.min(quality, 60) : quality;

  // Build responsive sizes if specified
  const effectiveSizes =
    sizes ||
    (responsive
      ? "(max-width: 480px) 100vw, (max-width: 768px) 90vw, (max-width: 1024px) 80vw, 70vw"
      : undefined);

  return (
    <div
      className={containerClassName}
      style={{
        aspectRatio,
        overflow: "hidden",
        position: "relative",
      }}
    >
      <Image
        src={imageSrc}
        alt={alt}
        width={width}
        height={height}
        loading={loading}
        quality={effectiveQuality}
        sizes={effectiveSizes}
        priority={priority && !isSlowConnection && !hasDataSaver}
        className={className}
        // Prevent CLS by filling container
        style={{
          objectFit: "cover",
          objectPosition: "center",
        }}
        // Use onLoad to fade in for better perceived performance
        onLoad={(result) => {
          // Can add fade-in animation here if desired
          if (result.currentTarget.src) {
            // Image loaded successfully
          }
        }}
      />
    </div>
  );
}

/**
 * Picture-based responsive image component
 * Provides maximum control over format selection and srcset
 * Best for critical images with multiple source formats
 */
export function ResponsiveImage({
  alt,
  className = "",
  defaultSrc,
  sources,
  width,
  height,
  priority = false,
  containerClassName = "",
  aspectRatio,
}: {
  alt: string;
  className?: string;
  defaultSrc: string;
  sources: Array<{
    srcSet: string;
    sizes?: string;
    type?: string; // e.g., "image/webp"
  }>;
  width?: number;
  height?: number;
  priority?: boolean;
  containerClassName?: string;
  aspectRatio?: string;
}) {
  const [mounted, setMounted] = useState(false);
  const [isSlowConnection, setIsSlowConnection] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsSlowConnection(isSlowNetwork());
  }, []);

  if (!mounted) {
    return (
      <div
        className={containerClassName}
        style={{ aspectRatio: aspectRatio || `${width || 800}/${height || 600}` }}
        aria-label={alt}
      />
    );
  }

  return (
    <div
      className={containerClassName}
      style={{
        aspectRatio: aspectRatio,
        overflow: "hidden",
        position: "relative",
      }}
    >
      <picture>
        {/* Only load modern formats on faster networks */}
        {!isSlowConnection &&
          sources.map((source, idx) => (
            <source key={idx} srcSet={source.srcSet} sizes={source.sizes} type={source.type} />
          ))}

        <img
          src={defaultSrc}
          alt={alt}
          className={className}
          width={width}
          height={height}
          loading={priority ? "eager" : "lazy"}
          style={{
            objectFit: "cover",
            objectPosition: "center",
            width: "100%",
            height: "100%",
            display: "block",
          }}
        />
      </picture>
    </div>
  );
}

/**
 * Blur-up effect for images
 * Shows low-quality placeholder while loading high-quality version
 * Improves perceived performance on slow networks
 */
export function BlurUpImage({
  src,
  placeholder,
  alt,
  className = "",
  onLoadComplete,
}: {
  src: string;
  placeholder: string;
  alt: string;
  className?: string;
  onLoadComplete?: () => void;
}) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div style={{ position: "relative", overflow: "hidden" }}>
      {/* Blurred placeholder */}
      <img
        src={placeholder}
        alt={alt}
        className={`${className} blur-md`}
        style={{
          position: "absolute",
          inset: 0,
          opacity: isLoading ? 1 : 0,
          transition: "opacity 0.3s",
        }}
      />

      {/* Full quality image */}
      <img
        src={src}
        alt={alt}
        className={className}
        onLoad={() => {
          setIsLoading(false);
          onLoadComplete?.();
        }}
        style={{
          opacity: isLoading ? 0 : 1,
          transition: "opacity 0.3s",
        }}
      />
    </div>
  );
}
