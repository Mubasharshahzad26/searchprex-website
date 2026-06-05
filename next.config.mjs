/** @type {import('next').NextConfig} */
const nextConfig = {
  // ── PERF: tree-shake big icon/animation libraries → smaller JS bundles ──
  // You import lucide-react + framer-motion in almost every component. This
  // strips unused code from those barrel imports. Biggest, safest win.
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },

  compress: true,          // gzip/brotli responses
  poweredByHeader: false,  // remove the X-Powered-By: Next.js header (tiny security win)

  typescript: {
    // ⚠️ Hides TypeScript errors from the build. Fine while building, but
    //    turn this OFF before launch so real type bugs get caught.
    ignoreBuildErrors: true,
  },

  images: {
    // ⚠️ PERF: image optimization is currently DISABLED (no lazy-resize, no WebP).
    //    This is the single biggest LCP/Core-Web-Vitals win once enabled.
    //    To ENABLE: delete the line below and uncomment `remotePatterns`.
    //    IMPORTANT: list EVERY external image domain you use, or those images
    //    will throw a 500. Test locally (npm run dev) right after switching.
    unoptimized: true,

    // remotePatterns: [
    //   { protocol: 'https', hostname: 'cdn.sanity.io' },   // Sanity CMS images
    //   { protocol: 'https', hostname: 'img.youtube.com' }, // YouTube thumbnails
    //   { protocol: 'https', hostname: 'i.ytimg.com' },     // YouTube thumbnails (alt)
    //   // add any other external image host you use here...
    // ],
  },

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Robots-Tag',
            // ⚠️ LAUNCH-CRITICAL: this blocks Google site-wide (noindex).
            //    REMOVE this entire headers() block when you go live —
            //    otherwise the site will NEVER appear in search.
            value: 'noindex, nofollow',
          },
        ],
      },
    ]
  },
}

export default nextConfig
