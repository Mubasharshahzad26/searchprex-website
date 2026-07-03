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
        // Applies to every route on the site
        source: '/(.*)',
        headers: [
          {
            key: 'X-Robots-Tag',
            // ⚠️ LAUNCH-CRITICAL: this blocks Google site-wide (noindex).
            //    REMOVE this entire headers() block when you go live —
            //    otherwise the site will NEVER appear in search.
            value: 'noindex, nofollow',
          },

          // ── SECURITY HEADERS ──────────────────────────────────────────
          {
            // Stops your site being loaded inside an <iframe> on another
            // domain (blocks clickjacking attacks — fake overlay tricking
            // users into clicking real buttons on your site).
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            // Stops the browser "guessing" a file's type (MIME-sniffing).
            // Prevents a disguised malicious file being executed as script.
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            // Controls how much of your URL is sent to other sites when
            // someone clicks an outbound link. Keeps full URL on your own
            // domain, but strips it down for cross-origin links (privacy).
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            // Explicitly disables browser features you don't use, so an
            // embedded/compromised script can't quietly access camera,
            // mic, or location.
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
          {
            // Forces browsers to only ever talk to your site over HTTPS
            // for the next year, even if someone types http:// or an old
            // link points there. Vercel already serves HTTPS, this just
            // locks it in. (Safe to keep even pre-launch.)
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains',
          },
          {
            // Blocks the page from being embedded/loaded via legacy Adobe
            // Flash/PDF cross-domain policy files. Rarely used today, but
            // free protection with zero downside.
            key: 'X-Permitted-Cross-Domain-Policies',
            value: 'none',
          },
        ],
      },
    ]
  },
}

export default nextConfig
