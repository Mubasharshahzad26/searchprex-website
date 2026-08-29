import Script from 'next/script'
import { GoogleTagManager, GoogleAnalytics } from '@next/third-parties/google'
import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import CookieConsent from "@/components/CookieConsent";

 
const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});
 
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.searchprex.com'
 
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'SearchPrex —FOUNDER-LED SEO. NO JUNIORS. NO FLUFF. USA SEO Agency for Law Firms, Ecommerce & Local Business',
    template: '%s | SearchPrex'
  },
  description: 'SearchPrex is a US-Focused SEO agency specializing in law firm SEO, Shopify ecommerce SEO, and local SEO for small businesses. Get a free SEO audit in 48 hours. Serving CA, TX, FL, NY, IL.',
  keywords: [
    'SEO agency USA',
    'law firm SEO',
    'Shopify SEO',
    'ecommerce SEO',
    'local SEO services',
    'small business SEO',
    'enterprise SEO',
    'family law SEO',
    'personal injury lawyer SEO',
    'Google Business Profile optimization',
    'technical SEO audit',
    'SEO consultant USA'
  ],
  authors: [{ name: 'SearchPrex', url: siteUrl }],
  creator: 'SearchPrex',
  publisher: 'SearchPrex',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  // No `alternates` here on purpose.
  //
  // Root metadata is inherited by every route that does not override it, so a
  // canonical set at this level does not mean "the site lives at siteUrl" — it
  // means "every page that forgets to set its own is a duplicate of the
  // homepage". That is what it was doing: /pricing-plan and
  // /tools/schema-generator both shipped `<link rel="canonical"
  // href="https://www.searchprex.com">`, which asks Google to drop them and
  // fold their signals into `/`. The `languages` entry pointed every page's
  // en-US alternate at the homepage for the same reason.
  //
  // With no canonical here, a page that sets none emits none, and Google
  // self-canonicalises to the requested URL — the safe default. Pages should
  // still declare their own: either `alternates.canonical` directly, or
  // getPageSEO(), which fills in `${siteUrl}${slug}`. scripts/check-canonicals.mjs
  // fails the build if a public route does neither.
  // ✅ SITE IS LIVE — Indexing ENABLED for Google to crawl and rank
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    title: 'SearchPrex —FOUNDER-LED SEO. NO JUNIORS. NO FLUFF. USA SEO Agency for Law Firms & Ecommerce',
    description: 'Senior-led SEO services for law firms, Shopify stores, and local businesses across the USA. Free SEO audit in 48 hours.',
    url: siteUrl,
    siteName: 'SearchPrex',
    locale: 'en_US',
    type: 'website',
    // No `images` here: app/opengraph-image.tsx generates the default card and
    // Next applies it to every route that does not ship its own. The
    // `${siteUrl}/og-image.jpg` this replaced was never a real file — public/
    // has no og-image.jpg — so the site's default social card 404d on every
    // page, and an explicit `images` entry would override the generated one.
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SearchPrex —FOUNDER-LED SEO. NO JUNIORS. NO FLUFF. USA SEO Agency',
    description: 'Senior-led SEO for law firms, ecommerce & local businesses. Free audit in 48 hours.',
    // Likewise supplied by app/twitter-image.tsx.
    creator: '@searchprex',
  },
  // Only emitted when the env var is set — a placeholder value would publish a
  // meta tag that fails verification in Search Console.
  ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { verification: { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION } }
    : {}),
  category: 'SEO Services',
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: [
      { url: '/apple-icon-180x180.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { rel: 'mask-icon', url: '/icon.svg', color: '#000000' },
    ],
  },
}
 
export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0f2e' },
  ],
  width: 'device-width',
  initialScale: 1,
  // No maximumScale: capping zoom fails WCAG 1.4.4 (Resize Text).
  userScalable: true,
}
 
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        "name": "SearchPrex",
        "url": siteUrl,
        "logo": {
          "@type": "ImageObject",
          "url": `${siteUrl}/logo.png`,
          "width": 200,
          "height": 200
        },
        "description": "US-Focused SEO agency specializing in law firm SEO, Shopify ecommerce SEO, and local SEO for small businesses.",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "1250 Executive Place, Suite 450",
          "addressLocality": "Geneva",
          "addressRegion": "IL",
          "postalCode": "60134",
          "addressCountry": "US"
        },
        "telephone": "+92-310-652-6316",
        "email": "hello@searchprex.com",
        "founder": {
          "@type": "Person",
          "name": "Mubashar Shahzad",
          "jobTitle": "CEO & Founder",
          "sameAs": [
            "https://linkedin.com/in/mubashar-shahzad-seo"
          ]
        },
        "areaServed": [
          { "@type": "State", "name": "California" },
          { "@type": "State", "name": "Texas" },
          { "@type": "State", "name": "Florida" },
          { "@type": "State", "name": "New York" },
          { "@type": "State", "name": "Illinois" }
        ],
        "sameAs": [
          "https://twitter.com/searchprex",
          "https://linkedin.com/company/searchprex"
        ]
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        "url": siteUrl,
        "name": "SearchPrex",
        "publisher": { "@id": `${siteUrl}/#organization` },
        "inLanguage": "en-US"
      },
      {
        "@type": "ProfessionalService",
        "@id": `${siteUrl}/#service`,
        "name": "SearchPrex SEO Services",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "1250 Executive Place, Suite 450",
          "addressLocality": "Geneva",
          "addressRegion": "IL",
          "postalCode": "60134",
          "addressCountry": "US"
        },
        "areaServed": {
          "@type": "Country",
          "name": "United States"
        },
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "SEO Services",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Law Firm SEO",
                "description": "Specialized SEO for family law, personal injury, and criminal defense attorneys."
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Shopify SEO",
                "description": "Technical and content SEO for Shopify ecommerce stores."
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Local SEO",
                "description": "Google Business Profile optimization and local search visibility."
              }
            }
          ]
        }
      }
    ]
  }
 
  return (
    <html lang="en" dir="ltr" className={`${inter.variable} bg-background`}>
      <head>
        {/* YouTube thumbnails are cross-origin and appear above the fold on
            several pages. Preconnecting saves the DNS + TLS round trip before
            the first thumbnail request rather than after it. */}
        <link rel="preconnect" href="https://img.youtube.com" />
        <link rel="preconnect" href="https://i.ytimg.com" />
        <meta name="geo.region" content="US" />
        <meta name="geo.placename" content="United States" />
        <meta name="ICBM" content="37.0902, -95.7129" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
 
      <body className="font-sans antialiased bg-background">
        <Nav />
        {children}
        <Footer />
        <CookieConsent />
 
        {/* ✅ Vercel Analytics - Production Only */}
        {process.env.NODE_ENV === 'production' && <Analytics />}
 
        {/* ✅ Google Tag Manager */}
        <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID!} />
 
        {/* ✅ Meta / Facebook Pixel */}
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${process.env.NEXT_PUBLIC_META_PIXEL_ID}');
            fbq('track', 'PageView');
          `}
        </Script>
 
        {/* ✅ LinkedIn Insight Tag */}
        <Script id="linkedin-insight" strategy="afterInteractive">
          {`
            _linkedin_partner_id = "${process.env.NEXT_PUBLIC_LINKEDIN_PARTNER_ID}";
            window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
            window._linkedin_data_partner_ids.push(_linkedin_partner_id);
            (function(l) {
              if (!l){window.lintrk = function(a,b){window.lintrk.q.push([a,b])};
              window.lintrk.q=[]}
              var s = document.getElementsByTagName("script")[0];
              var b = document.createElement("script");
              b.type = "text/javascript";b.async = true;
              b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
              s.parentNode.insertBefore(b, s);
            })(window.lintrk);
          `}
        </Script>
 
        {/* ⏸️ Reddit Pixel - Activate when running Reddit Ads */}
        {/*
        <Script id="reddit-pixel" strategy="afterInteractive">
          {`
            !function(w,d){if(!w.rdt){var p=w.rdt=function(){p.sendEvent?
            p.sendEvent.apply(p,arguments):p.callQueue.push(arguments)};
            p.callQueue=[];var t=d.createElement("script");
            t.src="https://www.redditstatic.com/ads/v2.js",t.async=!0;
            var s=d.getElementsByTagName("script")[0];
            s.parentNode.insertBefore(t,s)}}(window,document);
            rdt('init','${process.env.NEXT_PUBLIC_REDDIT_PIXEL_ID}');
            rdt('track', 'PageView');
          `}
        </Script>
        */}
 
      </body>
    </html>
  )
}
 