import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Use Babel React Compiler for automatic memoization and performance optimizations
  reactCompiler: true,

  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    // Optimize for slow networks
    deviceSizes: [320, 480, 640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  headers: async () => {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "geolocation=(), microphone=(), camera=()",
          },
        ],
      },
      // Cache static assets for 1 year (immutable)
      {
        source: "/assets/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/:path*.webp",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/:path*.avif",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      // Cache fonts for 1 year
      {
        source: "/:path*.woff2",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      // Cache HTML pages for 1 day with revalidation (skip static assets)
      {
        source: "/((?!_next/static|_next/image|assets|favicon\\.ico|sitemap\\.xml|robots\\.txt).*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, s-maxage=86400, stale-while-revalidate=600",
          },
        ],
      },
    ];
  },

  // Redirects for consistency and SEO (canonical URLs)
  redirects: async () => {
    return [
      // Redirect trailing slashes
      {
        source: "/:path+/",
        destination: "/:path+",
        permanent: true, // 301 redirect for SEO
      },
    ];
  },

  // Rewrites for clean URLs without exposing internal structure
  rewrites: async () => {
    return {
      beforeFiles: [],
      afterFiles: [],
      fallback: [],
    };
  },

  /**
   * PERFORMANCE: Compression & Build Optimization
   * - Enable gzip compression
   * - Disable source maps in production (reduces bundle)
   */
  compress: true,
  productionBrowserSourceMaps: false,

  /**
   * PERFORMANCE: Experimental features
   * - optimizePackageImports: tree-shake unused exports
   * - This reduces bundle size significantly
   */
  experimental: {
    optimizePackageImports: [
      "framer-motion",
      "lucide-react",
      "react-icons",
      "embla-carousel-react",
    ],
  },

  /**
   * PERFORMANCE: On-Demand Entries (for development & server)
   * - Reduces memory usage by unloading inactive pages
   * - Good for slow networks and low-end devices
   */
  onDemandEntries: {
    maxInactiveAge: 60 * 1000, // 60 seconds
    pagesBufferLength: 5, // Keep 5 pages in memory
  },

  /**
   * TypeScript strict mode for better code quality
   */
  typescript: {
    tsconfigPath: "./tsconfig.json",
  },

  /**
   * Turbopack configuration for Next.js 16 (default bundler)
   * Turbopack provides faster builds than webpack
   */
  turbopack: {},
};

export default nextConfig;
