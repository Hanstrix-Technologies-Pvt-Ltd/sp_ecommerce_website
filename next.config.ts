import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Use Babel React Compiler for automatic memoization and performance optimizations
  reactCompiler: true,

  /**
   * PERFORMANCE: Image Optimization
   * - AVIF & WebP formats for modern browsers
   * - Automatic fallback to JPEG for unsupported browsers
   * - Built-in optimization via Next.js Image component
   */
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    // Optimize for slow networks
    deviceSizes: [320, 480, 640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  /**
   * SECURITY & PERFORMANCE: Headers
   * - Cache-Control: 1 year for immutable assets
   * - Security headers: prevent XSS, clickjacking, MIME sniffing
   * - CSP & Referrer-Policy for privacy
   */
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
          // Enable gzip compression
          {
            key: "Content-Encoding",
            value: "gzip",
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
      // Cache HTML pages for 1 day with revalidation
      {
        source: "/:path*",
        has: [
          {
            type: "header",
            key: "content-type",
            value: "text/html",
          },
        ],
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, must-revalidate",
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
