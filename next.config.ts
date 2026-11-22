import type { NextConfig } from "next";

// Neon Object Storage (public_read bucket) serves CMS uploads; allow next/image to load them.
// Matched by host pattern rather than read from AWS_ENDPOINT_URL_S3, so a build without storage
// env vars still produces a config that serves uploaded images. Which exact URLs can be stored is
// enforced by the CMS validators (only our own bucket).
const storageBucket = process.env.CMS_BUCKET || "assets";

const nextConfig: NextConfig = {
  // Use Babel React Compiler for automatic memoization and performance optimizations
  reactCompiler: true,

  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      // e.g. https://br-xxxx.storage.c-2.ap-southeast-1.aws.neon.tech/assets/cms/...
      { protocol: "https", hostname: "**.aws.neon.tech", pathname: `/${storageBucket}/**` },
    ],
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
      // CMS uploads use unique filenames; allow shorter CDN/browser refresh window
      {
        source: "/uploads/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, stale-while-revalidate=604800",
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
      // Cache public HTML pages for 1 day with revalidation (skip static assets, admin and API)
      {
        source: "/((?!_next/static|_next/image|assets|admin|api|favicon\\.ico|sitemap\\.xml|robots\\.txt).*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, s-maxage=86400, stale-while-revalidate=600",
          },
        ],
      },
      // Admin pages and all API responses must never be stored by a CDN or shared cache.
      // Listed last so it wins over any earlier rule that sets Cache-Control.
      {
        source: "/admin/:path*",
        headers: [{ key: "Cache-Control", value: "private, no-store, max-age=0" }],
      },
      {
        source: "/admin",
        headers: [{ key: "Cache-Control", value: "private, no-store, max-age=0" }],
      },
      {
        source: "/api/:path*",
        headers: [{ key: "Cache-Control", value: "private, no-store, max-age=0" }],
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
   * SEO: always put <title>, description, canonical, hreflang and Open Graph tags in <head>.
   * By default Next 16 "streams" metadata into the <body> for browsers and Googlebot (only a
   * fixed list of bots got it in <head>). Google copes, but its first raw-HTML pass and most
   * SEO tools (Search Console live test, Ahrefs, Screaming Frog...) read only <head>.
   * Matching every user agent turns streaming off. Our generateMetadata functions don't wait
   * on the database, so this costs practically nothing in response time.
   */
  htmlLimitedBots: /.*/,

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
