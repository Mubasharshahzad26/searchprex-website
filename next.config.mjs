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
  outputFileTracingIncludes: {
    '/resources/news/[slug]': ['./scripts/seo-news-content/local-seo-updates.md'],
  },

  typescript: {
    // ⚠️ Hides TypeScript errors from the build. Fine while building, but
    //    turn this OFF before launch so real type bugs get caught.
    ignoreBuildErrors: true,
  },

  images: {
    // Image optimization is ON. It was previously disabled site-wide
    // (`unoptimized: true`), which meant every next/image served the original
    // file at its original size — no WebP/AVIF, no responsive variants. The
    // founder photo alone was a 1.5 MB JPG rendered at 80x80.
    //
    // Every external image host must be listed here or those images 500.
    // Verified against the codebase — these are the only hosts used as an
    // image src (maps.google.com is an iframe, static.semrush.com is PDFs).
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.sanity.io' },        // Sanity CMS images
      { protocol: 'https', hostname: 'img.youtube.com' },      // YouTube thumbnails
      { protocol: 'https', hostname: 'i.ytimg.com' },          // YouTube thumbnails (alt)
      { protocol: 'https', hostname: 'images.unsplash.com' },  // blog hero images
    ],

    formats: ['image/avif', 'image/webp'],
  },

  async redirects() {
    return [
      // Two old blog URLs GSC still lists (404 + noindex since July); each now
      // points at the live post on the same topic.
      { source: '/blog/law-firm-seo-guide', destination: '/blog/law-firm-seo-2026-guide', permanent: true },
      { source: '/blog/technical-seo-core-web-vitals', destination: '/blog/core-web-vitals-ecommerce', permanent: true },
      {
        // The old NicheSEO Pro teaser page (thin, and it used Semrush's "Keyword
        // Magic Tool" name). The product lives at its own domain.
        source: '/tool',
        destination: 'https://nicheseopro.com/',
        permanent: true,
      },
      {
        // The redesigned home page was reviewed here, then shipped at "/".
        source: '/home-page-test',
        destination: '/',
        permanent: true,
      },
      {
        // /nicheseopro is renamed to /tools/keyword-research. Permanent (301)
        // so Search Console transfers the old URL's history rather than
        // treating the new one as an unrelated page — it already had
        // impressions at around position 12.
        source: '/nicheseopro',
        destination: '/tools/keyword-research',
        permanent: true,
      },
      {
        // Consolidate September 2026 spam update post to avoid cannibalization.
        // The original URL has GSC history and ranking positions.
        source: '/resources/news/google-september-2026-spam-update-completed',
        destination: '/resources/news/google-september-2026-spam-update',
        permanent: true,
      },
      {
        // Three October 2026 autopilot articles cited no sources at all yet
        // quoted figures (82%, 58%) and a "crackdown" Google never announced.
        // Sourced pages cover the same ground; send their URLs there.
        source: '/resources/news/google-business-profile-law-firm-virtual-office-enforcement-2026',
        destination: '/resources/news/google-maps-law-firm-virtual-office-crackdown-video-verification',
        permanent: true,
      },
      {
        source: '/resources/news/geo-entity-density-ai-mode-chatgpt-search-citation-factors',
        destination: '/resources/news/llm-seo-news-2026',
        permanent: true,
      },
      {
        source: '/resources/news/us-regional-seo-map-pack-proximity-compression-metro-volatility',
        destination: '/resources/news/local-seo-updates',
        permanent: true,
      },
      // Retired SEO News URLs found returning 404 in the direct URL and
      // internal-link audit. Preserve visitors and consolidate signals on the
      // nearest current, verified article or topic guide.
      {
        source: '/resources/news/ai-search-geo',
        destination: '/resources/news/llm-seo-news-2026',
        permanent: true,
      },
      {
        source: '/resources/news/google-search-updates',
        destination: '/resources/news/google-algorithm-updates',
        permanent: true,
      },
      {
        source: '/resources/news/google-merchant-center-automated-return-policy-schema-mandate',
        destination: '/resources/news/google-merchant-center-sitewide-return-policy-schema-mandate',
        permanent: true,
      },
      {
        source: '/resources/news/merchant-center-policy-pages-appeals',
        destination: '/resources/news/ecommerce-seo-news-2026',
        permanent: true,
      },
      {
        source: '/resources/news/shopify-os-3-canonical-liquid-directives-duplicate-url-fix',
        destination: '/resources/news/ecommerce-seo-news-2026',
        permanent: true,
      },
      {
        source: '/resources/news/wordpress-core-speculative-rules-api-inp-optimization-woocommerce',
        destination: '/resources/news/technical-seo-news-2026',
        permanent: true,
      },
      {
        // The two case-study hubs were merged into /case-studies, the URL the
        // detail pages already sit under. The query string carries over, so
        // ?vertical=ecommerce deep links keep their filter.
        source: '/all-case-studies',
        destination: '/case-studies',
        permanent: true,
      },
      // ── NEWS CATEGORY QUERY REDIRECTS (301) ──────────────────────
      // Consolidates parameterized ?category= URLs to their dedicated ranking pillar pages.
      // Eliminates keyword cannibalization, preserves "llm seo news" Pos 4,
      // and consolidates signals on the main news hub ("seo news today").
      {
        source: '/resources/news',
        has: [{ type: 'query', key: 'category', value: '(?i:llms?)' }],
        destination: '/resources/news/llm-seo-news-2026',
        permanent: true,
      },
      {
        source: '/resources/news',
        has: [{ type: 'query', key: 'category', value: '(?i:ai(?:[ +_%20]*seo)?)' }],
        destination: '/resources/news/ai-sge-seo-news',
        permanent: true,
      },
      {
        source: '/resources/news',
        has: [{ type: 'query', key: 'category', value: '(?i:technical(?:[ +_%20]*seo)?)' }],
        destination: '/resources/news/technical-seo-news-2026',
        permanent: true,
      },
      {
        source: '/resources/news',
        has: [{ type: 'query', key: 'category', value: '(?i:(?:seo[ +_%20]*)?tools?)' }],
        destination: '/resources/news/seo-tools-news-2026',
        permanent: true,
      },
      {
        source: '/resources/news',
        has: [{ type: 'query', key: 'category', value: '(?i:ecommerce.*)' }],
        destination: '/resources/news/ecommerce-seo-news-2026',
        permanent: true,
      },
      {
        source: '/resources/news',
        has: [{ type: 'query', key: 'category', value: '(?i:local(?:[ +_%20]*seo)?)' }],
        destination: '/resources/news/local-seo-updates',
        permanent: true,
      },
    ]
  },

  async headers() {
    return [
      {
        // Applies to every route on the site
        source: '/(.*)',
        headers: [
          // ✅ SITE IS LIVE — X-Robots-Tag noindex REMOVED so Google can index.
          //    Individual pages that should NOT be indexed (dashboard, login,
          //    admin, studio) can set their own `robots: { index: false }` in
          //    their page-level metadata export.

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
            // locks it in.
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
