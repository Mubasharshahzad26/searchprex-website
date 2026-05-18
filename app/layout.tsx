import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { GoogleAnalytics } from '@next/third-parties/google'
import './globals.css'

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://searchprex.com'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'SearchPrex — #1 USA SEO Agency for Law Firms, Ecommerce & Local Business',
    template: '%s | SearchPrex'
  },
  description: 'SearchPrex is a USA-based SEO agency specializing in law firm SEO, Shopify ecommerce SEO, and local SEO for small businesses. Get a free SEO audit in 48 hours. Serving CA, TX, FL, NY, IL.',
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
  alternates: {
    canonical: siteUrl,
    languages: {
      'en-US': siteUrl,
    },
  },
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
  openGraph: {
    title: 'SearchPrex — #1 USA SEO Agency for Law Firms & Ecommerce',
    description: 'Senior-led SEO services for law firms, Shopify stores, and local businesses across the USA. Free SEO audit in 48 hours.',
    url: siteUrl,
    siteName: 'SearchPrex',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: `${siteUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'SearchPrex - USA SEO Agency',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SearchPrex — #1 USA SEO Agency',
    description: 'Senior-led SEO for law firms, ecommerce & local businesses. Free audit in 48 hours.',
    images: [`${siteUrl}/og-image.jpg`],
    creator: '@searchprex',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
  category: 'SEO Services',
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0f2e' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
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
        "description": "USA-based SEO agency specializing in law firm SEO, Shopify ecommerce SEO, and local SEO for small businesses.",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "1250 Executive Place, Suite 450",
          "addressLocality": "Geneva",
          "addressRegion": "IL",
          "postalCode": "60134",
          "addressCountry": "US"
        },
        "telephone": "+1-800-555-1234",
        "email": "hello@searchprex.com",
        "founder": {
          "@type": "Person",
          "name": "Mubashar Shahzad",
          "jobTitle": "CEO & Founder",
          "sameAs": [
            "https://linkedin.com/in/mubi00",
            "https://researchgate.net/profile/Mubashar-Shahzad"
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
        "provider": { "@id": `${siteUrl}/#organization` },
        "serviceType": ["SEO Services", "Digital Marketing", "Local SEO", "Ecommerce SEO"],
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
        <link rel="alternate" hrefLang="en-US" href={siteUrl} />
        <link rel="alternate" hrefLang="x-default" href={siteUrl} />
        <meta name="geo.region" content="US" />
        <meta name="geo.placename" content="United States" />
        <meta name="ICBM" content="37.0902, -95.7129" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
        <GoogleAnalytics gaId="G-B75WS7K8ZV" />
      </body>
    </html>
  )
}
