import fs from 'fs';
import path from 'path';

async function deployBladeHQBlog() {
  const baseUrl = 'https://www.michigansportsoutdoor.com';
  const username = 'apiuser';
  const appPassword = 'cvxm Bi7y 6o3y r7HJ M1Wn mSMM';
  const auth = Buffer.from(`${username}:${appPassword}`).toString('base64');
  const headers = {
    Authorization: `Basic ${auth}`,
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
    'Content-Type': 'application/json'
  };

  const blogHtml = `<!-- ======================================================== -->
<!-- 1. TECHNICAL SEO: JSON-LD STRUCTURED DATA SCHEMA GRAPH   -->
<!-- ======================================================== -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": "https://www.michigansportsoutdoor.com/blog/#webpage",
      "url": "https://www.michigansportsoutdoor.com/blog/",
      "name": "Knife Life | Michigan Sports Outdoor Cutlery & Gear Journal",
      "description": "The premier cutlery authority and outdoor knife journal, inspired by Knife Life. Led by Mubashar Sharif and the Michigan Editorial Team.",
      "breadcrumb": {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.michigansportsoutdoor.com/" },
          { "@type": "ListItem", "position": 2, "name": "Knife Life Blog", "item": "https://www.michigansportsoutdoor.com/blog/" }
        ]
      },
      "publisher": {
        "@type": "Organization",
        "name": "Michigan Sports Outdoor",
        "url": "https://www.michigansportsoutdoor.com",
        "logo": {
          "@type": "ImageObject",
          "url": "https://www.michigansportsoutdoor.com/wp-content/uploads/2025/10/MSO-LOGO-1.png"
        }
      },
      "mainEntity": {
        "@type": "ItemList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "url": "https://www.michigansportsoutdoor.com/best-hunting-knives-for-michigan-deer-season-3/",
            "name": "Best Hunting Knives for Michigan Deer Season (2026 Field-Tested Guide)"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "url": "https://www.michigansportsoutdoor.com/best-fixed-blade-hunting-knives-2026-buying-guide/",
            "name": "Crucible CPM MagnaCut vs Böhler M390MK: Which Steel Holds Edge Longer?"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "url": "https://www.michigansportsoutdoor.com/mora-companion-vs-kansbol-vs-garberg/",
            "name": "Morakniv Companion vs Kansbol vs Garberg: Ultimate Camp Knife Battle"
          },
          {
            "@type": "ListItem",
            "position": 4,
            "url": "https://www.michigansportsoutdoor.com/how-to-sharpen-a-knife-at-home/",
            "name": "How to Sharpen a Hunting Knife with a Turn-Box at Camp"
          },
          {
            "@type": "ListItem",
            "position": 5,
            "url": "https://www.michigansportsoutdoor.com/top-best-edc-knives-under-100/",
            "name": "Top 5 Best EDC Pocket Knives Under $100 for Fall 2026"
          },
          {
            "@type": "ListItem",
            "position": 6,
            "url": "https://www.michigansportsoutdoor.com/understanding-knife-edge-geometry-hollow-grind-vs-flat-grind/",
            "name": "Understanding Knife Edge Geometry: Hollow Grind vs Flat Grind"
          }
        ]
      },
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://www.michigansportsoutdoor.com/shop/?s={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    }
  ]
}
</script>

<!-- ======================================================== -->
<!-- 2. MASTER STYLES: BLADE HQ "KNIFE LIFE" DESIGN SYSTEM    -->
<!-- ======================================================== -->
<style>
  /* 2.1 PURE WHITE ROOT RESET & THEME OVERRIDES */
  html, body, #page, #wrapper, .site, .site-wrapper, .site-content, 
  #content, .content-area, #primary, #main, .site-main, .entry-content, 
  .entry-content-wrap, .page-content, .post-content, 
  .container, .container-wrap, .page-wrapper, .site-main-content {
    background-color: #ffffff !important;
    background: #ffffff !important;
    color: #1e293b;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
  }

  .entry-content {
    padding-left: 0 !important;
    padding-right: 0 !important;
    max-width: 100% !important;
    width: 100% !important;
    overflow-x: hidden;
  }

  /* 2.2 BLADE HQ VARIABLES & CONTAINER */
  :root {
    --bhq-blue: #0066cc;
    --bhq-blue-hover: #0052a3;
    --bhq-dark: #0f172a;
    --bhq-slate: #334155;
    --bhq-muted: #64748b;
    --bhq-orange: #ff6b00;
    --bhq-orange-hover: #e05e00;
    --bhq-border: #e2e8f0;
    --bhq-bg-subtle: #f8fafc;
    --bhq-radius: 6px;
    --bhq-shadow: 0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04);
    --bhq-shadow-hover: 0 10px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.06);
  }

  .bhq-portal-wrapper {
    max-width: 1240px;
    margin: 0 auto;
    padding: 0 20px 60px 20px;
    background: #ffffff;
    box-sizing: border-box;
  }

  /* 2.3 TOP HEADER & BRAND BAR */
  .bhq-header-banner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 24px 0 18px 0;
    border-bottom: 2px solid #0f172a;
    margin-bottom: 20px;
  }

  .bhq-brand-block {
    display: flex;
    align-items: baseline;
    gap: 12px;
  }

  .bhq-logo-title {
    font-size: 38px;
    font-weight: 900;
    letter-spacing: -0.5px;
    color: #0f172a;
    margin: 0;
    line-height: 1;
    text-transform: uppercase;
  }

  .bhq-logo-title span {
    color: var(--bhq-blue);
  }

  .bhq-tagline {
    font-size: 13px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: var(--bhq-muted);
    border-left: 2px solid var(--bhq-border);
    padding-left: 12px;
  }

  /* E-E-A-T TRUST STRIP IN HEADER */
  .bhq-trust-strip {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  .bhq-trust-item {
    display: flex;
    align-items: center;
    gap: 6px;
    background: #f8fafc;
    border: 1px solid var(--bhq-border);
    padding: 6px 12px;
    border-radius: 4px;
    font-size: 11.5px;
    font-weight: 700;
    color: #1e293b;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .bhq-trust-item span.icon {
    font-size: 14px;
  }

  .bhq-trust-item strong {
    color: var(--bhq-blue);
  }

  /* 2.4 BLADE HQ 5-PILLAR NAVIGATION BAR */
  .bhq-nav-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #0f172a;
    border-radius: 6px;
    padding: 4px 8px;
    margin-bottom: 24px;
  }

  .bhq-category-tabs {
    display: flex;
    align-items: center;
    gap: 4px;
    overflow-x: auto;
    scrollbar-width: none;
  }

  .bhq-category-tabs::-webkit-scrollbar {
    display: none;
  }

  .bhq-tab-btn {
    background: transparent;
    border: none;
    color: #cbd5e1;
    font-size: 13px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.8px;
    padding: 10px 18px;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.2s ease;
    white-space: nowrap;
  }

  .bhq-tab-btn:hover {
    color: #ffffff;
    background: rgba(255,255,255,0.08);
  }

  .bhq-tab-btn.active {
    background: var(--bhq-blue);
    color: #ffffff;
    box-shadow: 0 2px 8px rgba(0, 102, 204, 0.4);
  }

  .bhq-nav-action {
    display: flex;
    align-items: center;
    gap: 8px;
    padding-right: 8px;
  }

  .bhq-shop-link {
    background: var(--bhq-orange);
    color: #ffffff !important;
    text-decoration: none;
    font-size: 12px;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.8px;
    padding: 8px 14px;
    border-radius: 4px;
    transition: background 0.2s ease;
    white-space: nowrap;
  }

  .bhq-shop-link:hover {
    background: var(--bhq-orange-hover);
  }

  /* 2.5 UTILITY SEARCH & VOICE BAR */
  .bhq-search-section {
    background: #f8fafc;
    border: 1px solid var(--bhq-border);
    border-radius: 8px;
    padding: 16px 20px;
    margin-bottom: 28px;
  }

  .bhq-search-box-wrap {
    position: relative;
    display: flex;
    align-items: center;
    background: #ffffff;
    border: 2px solid #cbd5e1;
    border-radius: 6px;
    transition: border-color 0.2s ease, box-shadow 0.2s ease;
  }

  .bhq-search-box-wrap:focus-within {
    border-color: var(--bhq-blue);
    box-shadow: 0 0 0 3px rgba(0, 102, 204, 0.15);
  }

  .bhq-search-icon {
    padding-left: 16px;
    font-size: 16px;
    color: var(--bhq-muted);
  }

  .bhq-search-input {
    flex: 1;
    border: none;
    outline: none;
    padding: 12px 14px;
    font-size: 14.5px;
    font-weight: 500;
    color: #0f172a;
    background: transparent;
  }

  .bhq-voice-btn {
    background: #f1f5f9;
    border: 1px solid #cbd5e1;
    color: #334155;
    padding: 7px 12px;
    margin-right: 6px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
    display: flex;
    align-items: center;
    gap: 6px;
    font-weight: 600;
    transition: all 0.2s ease;
  }

  .bhq-voice-btn:hover {
    background: #e2e8f0;
    color: #0f172a;
  }

  .bhq-voice-btn.listening {
    background: #ef4444;
    color: #ffffff;
    animation: bhqPulse 1.2s infinite;
    border-color: #ef4444;
  }

  @keyframes bhqPulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
  }

  .bhq-search-submit {
    background: var(--bhq-blue);
    color: #ffffff;
    border: none;
    padding: 10px 20px;
    margin-right: 4px;
    border-radius: 4px;
    font-size: 13px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    cursor: pointer;
    transition: background 0.2s ease;
  }

  .bhq-search-submit:hover {
    background: var(--bhq-blue-hover);
  }

  .bhq-trending-tags {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-top: 12px;
    flex-wrap: wrap;
  }

  .bhq-tag-label {
    font-size: 11px;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.8px;
    color: var(--bhq-muted);
  }

  .bhq-tag-pill {
    background: #ffffff;
    border: 1px solid var(--bhq-border);
    padding: 3px 10px;
    border-radius: 12px;
    font-size: 11.5px;
    font-weight: 600;
    color: var(--bhq-slate);
    cursor: pointer;
    transition: all 0.2s ease;
    text-decoration: none;
  }

  .bhq-tag-pill:hover {
    border-color: var(--bhq-blue);
    color: var(--bhq-blue);
    background: #eff6ff;
  }

  /* 2.6 HERO SECTION: BLADE HQ SPLIT SPOTLIGHT + TRENDING LIST */
  .bhq-hero-grid {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 24px;
    margin-bottom: 40px;
  }

  .bhq-featured-card {
    background: #ffffff;
    border: 1px solid var(--bhq-border);
    border-radius: 8px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    box-shadow: var(--bhq-shadow);
    transition: transform 0.25s ease, box-shadow 0.25s ease;
  }

  .bhq-featured-card:hover {
    transform: translateY(-2px);
    box-shadow: var(--bhq-shadow-hover);
  }

  .bhq-featured-image-box {
    position: relative;
    width: 100%;
    height: 240px;
    background: #0f172a;
    overflow: hidden;
  }

  .bhq-featured-image-box img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.4s ease;
  }

  .bhq-featured-card:hover .bhq-featured-image-box img {
    transform: scale(1.03);
  }

  .bhq-badge-strip {
    position: absolute;
    top: 14px;
    left: 14px;
    display: flex;
    gap: 8px;
  }

  .bhq-badge-featured {
    background: var(--bhq-orange);
    color: #ffffff;
    font-size: 11px;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.8px;
    padding: 4px 10px;
    border-radius: 3px;
  }

  .bhq-badge-category {
    background: #0f172a;
    color: #ffffff;
    font-size: 11px;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.8px;
    padding: 4px 10px;
    border-radius: 3px;
  }

  .bhq-featured-content {
    padding: 22px;
    display: flex;
    flex-direction: column;
    flex: 1;
  }

  .bhq-score-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
  }

  .bhq-knife-score {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    background: #eff6ff;
    color: var(--bhq-blue);
    font-size: 12px;
    font-weight: 800;
    padding: 3px 8px;
    border-radius: 4px;
    border: 1px solid #bfdbfe;
  }

  .bhq-read-time {
    font-size: 12px;
    font-weight: 600;
    color: var(--bhq-muted);
  }

  .bhq-featured-title {
    font-size: 24px;
    font-weight: 800;
    line-height: 1.3;
    margin: 0 0 10px 0;
    color: #0f172a;
  }

  .bhq-featured-title a {
    color: #0f172a;
    text-decoration: none;
    transition: color 0.2s ease;
  }

  .bhq-featured-title a:hover {
    color: var(--bhq-blue);
  }

  .bhq-featured-excerpt {
    font-size: 14px;
    line-height: 1.6;
    color: var(--bhq-slate);
    margin: 0 0 16px 0;
    flex: 1;
  }

  /* AUTHOR BYLINE WITH MUBASHAR SHARIF */
  .bhq-author-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 14px;
    border-top: 1px solid var(--bhq-border);
  }

  .bhq-author-meta {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .bhq-author-avatar {
    width: 40px;
    height: 40px;
    border-radius: 4px;
    object-fit: cover;
    border: 1px solid #cbd5e1;
  }

  .bhq-author-info {
    display: flex;
    flex-direction: column;
  }

  .bhq-author-name {
    font-size: 13px;
    font-weight: 700;
    color: #0f172a;
    display: flex;
    align-items: center;
    gap: 5px;
  }

  .bhq-author-name .verified {
    color: #16a34a;
    font-size: 12px;
  }

  .bhq-author-role {
    font-size: 11px;
    color: var(--bhq-muted);
    font-weight: 500;
  }

  .bhq-read-btn {
    background: var(--bhq-blue);
    color: #ffffff !important;
    text-decoration: none;
    font-size: 12.5px;
    font-weight: 700;
    padding: 8px 16px;
    border-radius: 4px;
    transition: background 0.2s ease;
  }

  .bhq-read-btn:hover {
    background: var(--bhq-blue-hover);
  }

  /* TRENDING LIST SIDEBAR */
  .bhq-trending-box {
    background: #ffffff;
    border: 1px solid var(--bhq-border);
    border-radius: 8px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    box-shadow: var(--bhq-shadow);
  }

  .bhq-trending-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 12px;
    border-bottom: 2px solid #0f172a;
    margin-bottom: 16px;
  }

  .bhq-trending-heading {
    font-size: 15px;
    font-weight: 900;
    text-transform: uppercase;
    letter-spacing: 0.8px;
    color: #0f172a;
    margin: 0;
  }

  .bhq-trending-item {
    display: flex;
    gap: 14px;
    padding: 12px 0;
    border-bottom: 1px solid #f1f5f9;
    text-decoration: none;
    color: inherit;
    transition: background 0.2s ease;
  }

  .bhq-trending-item:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }

  .bhq-trending-rank {
    font-size: 24px;
    font-weight: 900;
    color: #cbd5e1;
    line-height: 1;
    min-width: 28px;
  }

  .bhq-trending-item:hover .bhq-trending-rank {
    color: var(--bhq-blue);
  }

  .bhq-trending-content {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .bhq-trending-cat {
    font-size: 10.5px;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    color: var(--bhq-blue);
  }

  .bhq-trending-item-title {
    font-size: 13.5px;
    font-weight: 700;
    line-height: 1.35;
    color: #0f172a;
    transition: color 0.2s ease;
  }

  .bhq-trending-item:hover .bhq-trending-item-title {
    color: var(--bhq-blue);
  }

  .bhq-trending-meta {
    font-size: 11px;
    color: var(--bhq-muted);
    font-weight: 500;
  }

  /* 2.7 SECTION HEADERS */
  .bhq-section-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
    padding-bottom: 10px;
    border-bottom: 2px solid #0f172a;
  }

  .bhq-section-title {
    font-size: 20px;
    font-weight: 900;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    color: #0f172a;
    margin: 0;
  }

  .bhq-section-sub {
    font-size: 12.5px;
    font-weight: 600;
    color: var(--bhq-muted);
  }

  /* 2.8 3-CARD ARTICLES GRID */
  .bhq-articles-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
    margin-bottom: 48px;
  }

  .bhq-article-card {
    background: #ffffff;
    border: 1px solid var(--bhq-border);
    border-radius: 8px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    box-shadow: var(--bhq-shadow);
    transition: transform 0.25s ease, box-shadow 0.25s ease;
    align-items: stretch;
  }

  .bhq-article-card:hover {
    transform: translateY(-3px);
    box-shadow: var(--bhq-shadow-hover);
  }

  .bhq-card-image-wrap {
    position: relative;
    width: 100%;
    height: 140px;
    background: #f1f5f9;
    overflow: hidden;
  }

  .bhq-card-image-wrap img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.35s ease;
  }

  .bhq-article-card:hover .bhq-card-image-wrap img {
    transform: scale(1.04);
  }

  .bhq-card-pill {
    position: absolute;
    top: 10px;
    left: 10px;
    background: rgba(15, 23, 42, 0.9);
    color: #ffffff;
    font-size: 10px;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.8px;
    padding: 3px 8px;
    border-radius: 3px;
  }

  .bhq-card-body {
    padding: 18px;
    display: flex;
    flex-direction: column;
    flex: 1;
  }

  .bhq-card-score-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 8px;
  }

  .bhq-mini-score {
    font-size: 11px;
    font-weight: 800;
    color: var(--bhq-blue);
    background: #eff6ff;
    padding: 2px 6px;
    border-radius: 3px;
    border: 1px solid #dbeafe;
  }

  .bhq-mini-date {
    font-size: 11px;
    color: var(--bhq-muted);
    font-weight: 500;
  }

  .bhq-card-title {
    font-size: 16px;
    font-weight: 800;
    line-height: 1.35;
    margin: 0 0 8px 0;
    color: #0f172a;
    min-height: 44px;
  }

  .bhq-card-title a {
    color: #0f172a;
    text-decoration: none;
    transition: color 0.2s ease;
  }

  .bhq-card-title a:hover {
    color: var(--bhq-blue);
  }

  .bhq-card-excerpt {
    font-size: 12.5px;
    line-height: 1.55;
    color: var(--bhq-slate);
    margin: 0 0 14px 0;
    flex: 1;
  }

  .bhq-card-author {
    display: flex;
    align-items: center;
    gap: 8px;
    padding-top: 12px;
    border-top: 1px solid #f1f5f9;
  }

  .bhq-card-avatar {
    width: 32px;
    height: 32px;
    border-radius: 4px;
    object-fit: cover;
    border: 1px solid #e2e8f0;
  }

  .bhq-card-author-meta {
    display: flex;
    flex-direction: column;
  }

  .bhq-card-author-name {
    font-size: 11.5px;
    font-weight: 700;
    color: #0f172a;
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .bhq-card-author-role {
    font-size: 10px;
    color: var(--bhq-muted);
  }

  /* 2.9 SHOP THE GEAR / IN-STOCK CUTLERY BRIDGE (EXACTLY 1 ROW OF 4 CARDS) */
  .bhq-gear-section {
    background: #f8fafc;
    border: 1px solid var(--bhq-border);
    border-radius: 8px;
    padding: 24px;
    margin-bottom: 48px;
  }

  .bhq-gear-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
  }

  .bhq-gear-card {
    background: #ffffff;
    border: 1px solid var(--bhq-border);
    border-radius: 6px;
    padding: 14px;
    display: flex;
    flex-direction: column;
    box-shadow: 0 1px 2px rgba(0,0,0,0.04);
    transition: transform 0.2s ease, border-color 0.2s ease;
  }

  .bhq-gear-card:hover {
    transform: translateY(-2px);
    border-color: var(--bhq-blue);
  }

  .bhq-gear-img-box {
    width: 100%;
    height: 110px;
    background: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 12px;
    border-radius: 4px;
  }

  .bhq-gear-img-box img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }

  .bhq-gear-stock {
    font-size: 10px;
    font-weight: 800;
    text-transform: uppercase;
    color: #16a34a;
    display: flex;
    align-items: center;
    gap: 4px;
    margin-bottom: 4px;
  }

  .bhq-gear-title {
    font-size: 13px;
    font-weight: 700;
    line-height: 1.35;
    color: #0f172a;
    margin: 0 0 4px 0;
    min-height: 36px;
  }

  .bhq-gear-specs {
    font-size: 11px;
    color: var(--bhq-muted);
    margin-bottom: 8px;
  }

  .bhq-gear-price {
    font-size: 14px;
    font-weight: 800;
    color: #0f172a;
    margin-bottom: 10px;
  }

  .bhq-gear-cta {
    margin-top: auto;
    background: #0f172a;
    color: #ffffff !important;
    text-decoration: none;
    text-align: center;
    font-size: 11.5px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    padding: 7px 10px;
    border-radius: 4px;
    transition: background 0.2s ease;
  }

  .bhq-gear-card:hover .bhq-gear-cta {
    background: var(--bhq-blue);
  }

  /* 2.10 BLADE HQ NEWSLETTER / KNIFE LIFE CLUB */
  .bhq-newsletter-banner {
    background: #0f172a;
    border-radius: 8px;
    padding: 32px;
    color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 24px;
    margin-bottom: 24px;
  }

  .bhq-newsletter-text h3 {
    font-size: 22px;
    font-weight: 900;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    color: #ffffff;
    margin: 0 0 6px 0;
  }

  .bhq-newsletter-text p {
    font-size: 13.5px;
    color: #94a3b8;
    margin: 0;
    max-width: 540px;
    line-height: 1.5;
  }

  .bhq-newsletter-form {
    display: flex;
    align-items: center;
    gap: 8px;
    min-width: 360px;
  }

  .bhq-newsletter-input {
    flex: 1;
    background: #1e293b;
    border: 1px solid #334155;
    padding: 11px 14px;
    border-radius: 4px;
    color: #ffffff;
    font-size: 13.5px;
    outline: none;
  }

  .bhq-newsletter-input:focus {
    border-color: var(--bhq-blue);
  }

  .bhq-newsletter-btn {
    background: var(--bhq-orange);
    color: #ffffff;
    border: none;
    padding: 11px 20px;
    border-radius: 4px;
    font-size: 13px;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    cursor: pointer;
    white-space: nowrap;
    transition: background 0.2s ease;
  }

  .bhq-newsletter-btn:hover {
    background: var(--bhq-orange-hover);
  }

  /* 2.11 RESPONSIVE MEDIA QUERIES */
  @media (max-width: 1024px) {
    .bhq-hero-grid {
      grid-template-columns: 1fr;
    }
    .bhq-articles-grid {
      grid-template-columns: repeat(2, 1fr);
    }
    .bhq-gear-grid {
      grid-template-columns: repeat(2, 1fr);
    }
    .bhq-newsletter-banner {
      flex-direction: column;
      align-items: flex-start;
    }
    .bhq-newsletter-form {
      width: 100%;
    }
  }

  @media (max-width: 768px) {
    .bhq-header-banner {
      flex-direction: column;
      align-items: flex-start;
      gap: 12px;
    }
    .bhq-trust-strip {
      flex-wrap: wrap;
      width: 100%;
    }
    .bhq-articles-grid {
      grid-template-columns: 1fr;
    }
    .bhq-gear-grid {
      grid-template-columns: 1fr;
    }
    .bhq-nav-bar {
      flex-direction: column;
      gap: 10px;
      align-items: stretch;
    }
    .bhq-category-tabs {
      overflow-x: auto;
      padding-bottom: 4px;
    }
    .bhq-shop-link {
      text-align: center;
    }
    .bhq-newsletter-form {
      flex-direction: column;
      align-items: stretch;
    }
  }
</style>

<!-- ======================================================== -->
<!-- 3. BLADE HQ "KNIFE LIFE" DOM STRUCTURE                   -->
<!-- ======================================================== -->
<div class="bhq-portal-wrapper">

  <!-- 3.1 TOP HEADER & BRAND BAR -->
  <header class="bhq-header-banner">
    <div class="bhq-brand-block">
      <h1 class="bhq-logo-title">KNIFE <span>LIFE</span></h1>
      <div class="bhq-tagline">Michigan Sports Outdoor Cutlery Journal</div>
    </div>
    
    <!-- E-E-A-T TRUST STRIP -->
    <div class="bhq-trust-strip">
      <div class="bhq-trust-item" title="Active member of the Northwoods cutlery community">
        <span class="icon">🛡️</span>
        <span>Member of <strong>BladeForums</strong></span>
      </div>
      <div class="bhq-trust-item" title="Verified Outfitter Merchant">
        <span class="icon">📦</span>
        <span>Available on <strong>Amazon</strong></span>
      </div>
      <div class="bhq-trust-item" title="A+ Accredited Business">
        <span class="icon">⭐</span>
        <span><strong>BBB Registered</strong> A+</span>
      </div>
    </div>
  </header>

  <!-- 3.2 BLADE HQ 5-PILLAR NAVIGATION TABS -->
  <nav class="bhq-nav-bar" aria-label="Knife Life Categories">
    <div class="bhq-category-tabs" id="bhqCatTabs">
      <button class="bhq-tab-btn active" data-cat="all">All Stories</button>
      <button class="bhq-tab-btn" data-cat="learn">Learn</button>
      <button class="bhq-tab-btn" data-cat="best-of">Best Of</button>
      <button class="bhq-tab-btn" data-cat="reviews">Reviews</button>
      <button class="bhq-tab-btn" data-cat="culture">Culture</button>
      <button class="bhq-tab-btn" data-cat="news">News</button>
    </div>
    <div class="bhq-nav-action">
      <a href="https://www.michigansportsoutdoor.com/shop/" class="bhq-shop-link">Shop Knife Store →</a>
    </div>
  </nav>

  <!-- 3.3 UTILITY SEARCH & VOICE ENGINE -->
  <section class="bhq-search-section">
    <div class="bhq-search-box-wrap">
      <span class="bhq-search-icon">🔍</span>
      <input 
        type="text" 
        id="bhqSearchInput" 
        class="bhq-search-input" 
        placeholder="Search knife guides, steels, reviews, or models..." 
        autocomplete="off" 
      />
      <button type="button" id="bhqVoiceBtn" class="bhq-voice-btn" title="Click to speak your search term">
        <span>🎙️</span>
        <span id="bhqVoiceStatus">Voice</span>
      </button>
      <button type="button" id="bhqSearchSubmit" class="bhq-search-submit">Search</button>
    </div>

    <!-- QUICK TRENDING PILLS -->
    <div class="bhq-trending-tags">
      <span class="bhq-tag-label">Popular Searches:</span>
      <a class="bhq-tag-pill" data-query="Deer Hunting Knives">Deer Hunting Knives</a>
      <a class="bhq-tag-pill" data-query="CPM MagnaCut">CPM MagnaCut</a>
      <a class="bhq-tag-pill" data-query="Turn-Box Sharpening">Turn-Box Sharpening</a>
      <a class="bhq-tag-pill" data-query="Mora Companion">Mora Companion</a>
      <a class="bhq-tag-pill" data-query="EDC Folders Under $100">EDC Folders Under $100</a>
      <a class="bhq-tag-pill" data-query="Blade Geometry">Blade Geometry</a>
    </div>
  </section>

  <!-- 3.4 HERO SPOTLIGHT: BLADE HQ SPLIT FEATURED + TRENDING LIST -->
  <section class="bhq-hero-grid">
    <!-- LEFT: FEATURED STORY CARD -->
    <article class="bhq-featured-card" data-category="best-of">
      <div class="bhq-featured-image-box">
        <img 
          src="https://www.michigansportsoutdoor.com/wp-content/uploads/2026/03/field-tested-whitetail-cutlery-mso.png" 
          alt="Best Hunting Knives for Michigan Deer Season" 
          loading="eager"
        />
        <div class="bhq-badge-strip">
          <span class="bhq-badge-featured">Featured Guide</span>
          <span class="bhq-badge-category">Best Of 2026</span>
        </div>
      </div>
      <div class="bhq-featured-content">
        <div class="bhq-score-bar">
          <span class="bhq-knife-score">⭐ 9.8 / 10 Knife Life Score</span>
          <span class="bhq-read-time">⏱️ 8 Min Read • Whitetail Opener</span>
        </div>
        <h2 class="bhq-featured-title">
          <a href="https://www.michigansportsoutdoor.com/best-hunting-knives-for-michigan-deer-season-3/">
            Best Hunting Knives for Michigan Deer Season (2026 Field-Tested Guide)
          </a>
        </h2>
        <p class="bhq-featured-excerpt">
          We torture-tested 12 premier fixed blades and field folders across Northern Michigan big woods. Discover edge retention metrics, gut hook mechanics, and why Crucible CPM MagnaCut steel reigns supreme for 2026 tag holders.
        </p>
        <div class="bhq-author-row">
          <div class="bhq-author-meta">
            <img 
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" 
              alt="Mubashar Sharif" 
              class="bhq-author-avatar" 
            />
            <div class="bhq-author-info">
              <div class="bhq-author-name">
                Mubashar Sharif <span class="verified" title="Verified Cutlery Specialist">✔</span>
              </div>
              <div class="bhq-author-role">Lead Cutlery Analyst & Whitetail Field Tester</div>
            </div>
          </div>
          <a href="https://www.michigansportsoutdoor.com/best-hunting-knives-for-michigan-deer-season-3/" class="bhq-read-btn">
            Read Full Guide →
          </a>
        </div>
      </div>
    </article>

    <!-- RIGHT: TRENDING ON KNIFE LIFE (01, 02, 03) -->
    <aside class="bhq-trending-box">
      <div class="bhq-trending-header">
        <h3 class="bhq-trending-heading">🔥 Trending on Knife Life</h3>
        <span style="font-size:11px; font-weight:700; color:var(--bhq-blue);">UPDATED DAILY</span>
      </div>

      <a href="https://www.michigansportsoutdoor.com/best-fixed-blade-hunting-knives-2026-buying-guide/" class="bhq-trending-item">
        <div class="bhq-trending-rank">01</div>
        <div class="bhq-trending-content">
          <span class="bhq-trending-cat">Reviews • Super Steels</span>
          <div class="bhq-trending-item-title">Crucible CPM MagnaCut vs Böhler M390MK: Which Steel Holds Edge Longer?</div>
          <div class="bhq-trending-meta">By Mubashar Sharif • 6 min read</div>
        </div>
      </a>

      <a href="https://www.michigansportsoutdoor.com/mora-companion-vs-kansbol-vs-garberg/" class="bhq-trending-item">
        <div class="bhq-trending-rank">02</div>
        <div class="bhq-trending-content">
          <span class="bhq-trending-cat">Reviews • Bushcraft</span>
          <div class="bhq-trending-item-title">Morakniv Companion vs Kansbol vs Garberg: Ultimate Camp Knife Battle</div>
          <div class="bhq-trending-meta">By Michigan Editorial Team • 7 min read</div>
        </div>
      </a>

      <a href="https://www.michigansportsoutdoor.com/how-to-sharpen-a-knife-at-home/" class="bhq-trending-item">
        <div class="bhq-trending-rank">03</div>
        <div class="bhq-trending-content">
          <span class="bhq-trending-cat">Learn • Field Sharpening</span>
          <div class="bhq-trending-item-title">How to Sharpen a Hunting Knife with a Turn-Box at Camp</div>
          <div class="bhq-trending-meta">By Mubashar Sharif • 5 min read</div>
        </div>
      </a>
    </aside>
  </section>

  <!-- 3.5 ARTICLES FEED: EXACTLY 3 HORIZONTAL CARDS PER ROW -->
  <section>
    <div class="bhq-section-header">
      <h3 class="bhq-section-title" id="bhqFeedTitle">Latest Knife Guides & Field Tests</h3>
      <span class="bhq-section-sub">Reviewed by Mubashar Sharif & Michigan Editorial Team</span>
    </div>

    <div class="bhq-articles-grid" id="bhqArticlesGrid">
      
      <!-- CARD 1: BEST OF / HUNTING -->
      <article class="bhq-article-card" data-category="best-of">
        <div class="bhq-card-image-wrap">
          <img 
            src="https://www.michigansportsoutdoor.com/wp-content/uploads/2026/03/hunting-knife-field-test-bench.png" 
            alt="Best Hunting Knives for Michigan Deer Season" 
            loading="lazy"
          />
          <span class="bhq-card-pill">Best Of</span>
        </div>
        <div class="bhq-card-body">
          <div class="bhq-card-score-row">
            <span class="bhq-mini-score">⭐ 9.8 Score</span>
            <span class="bhq-mini-date">Sep 14, 2026 • 8 min</span>
          </div>
          <h4 class="bhq-card-title">
            <a href="https://www.michigansportsoutdoor.com/best-hunting-knives-for-michigan-deer-season-3/">
              Best Hunting Knives for Michigan Deer Season (2026 Guide)
            </a>
          </h4>
          <p class="bhq-card-excerpt">
            Field testing fixed blades vs drop point folders for whitetail processing in damp Michigan conditions.
          </p>
          <div class="bhq-card-author">
            <img 
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" 
              alt="Mubashar Sharif" 
              class="bhq-card-avatar"
            />
            <div class="bhq-card-author-meta">
              <div class="bhq-card-author-name">
                Mubashar Sharif <span style="color:#16a34a;">✔</span>
              </div>
              <div class="bhq-card-author-role">Lead Cutlery Analyst</div>
            </div>
          </div>
        </div>
      </article>

      <!-- CARD 2: REVIEWS / STEEL SHOWDOWN -->
      <article class="bhq-article-card" data-category="reviews">
        <div class="bhq-card-image-wrap">
          <img 
            src="https://www.michigansportsoutdoor.com/wp-content/uploads/2026/03/cpm-magnacut-vs-m390-cutlery-test.png" 
            alt="CPM MagnaCut vs M390MK" 
            loading="lazy"
          />
          <span class="bhq-card-pill">Reviews</span>
        </div>
        <div class="bhq-card-body">
          <div class="bhq-card-score-row">
            <span class="bhq-mini-score">⭐ 9.6 Score</span>
            <span class="bhq-mini-date">Sep 12, 2026 • 6 min</span>
          </div>
          <h4 class="bhq-card-title">
            <a href="https://www.michigansportsoutdoor.com/best-fixed-blade-hunting-knives-2026-buying-guide/">
              Crucible CPM MagnaCut vs Böhler M390MK: Lab Edge Test
            </a>
          </h4>
          <p class="bhq-card-excerpt">
            CATRA edge retention data and toughness stress tests to see which super steel reigns supreme.
          </p>
          <div class="bhq-card-author">
            <img 
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" 
              alt="Mubashar Sharif" 
              class="bhq-card-avatar"
            />
            <div class="bhq-card-author-meta">
              <div class="bhq-card-author-name">
                Mubashar Sharif <span style="color:#16a34a;">✔</span>
              </div>
              <div class="bhq-card-author-role">Metallurgy & Field Specialist</div>
            </div>
          </div>
        </div>
      </article>

      <!-- CARD 3: REVIEWS / MORA SHOWDOWN -->
      <article class="bhq-article-card" data-category="reviews">
        <div class="bhq-card-image-wrap">
          <img 
            src="https://www.michigansportsoutdoor.com/wp-content/uploads/2026/03/mora-knives-bushcraft-field-test.png" 
            alt="Morakniv Companion vs Kansbol vs Garberg" 
            loading="lazy"
          />
          <span class="bhq-card-pill">Reviews</span>
        </div>
        <div class="bhq-card-body">
          <div class="bhq-card-score-row">
            <span class="bhq-mini-score">⭐ 9.4 Score</span>
            <span class="bhq-mini-date">Sep 10, 2026 • 7 min</span>
          </div>
          <h4 class="bhq-card-title">
            <a href="https://www.michigansportsoutdoor.com/mora-companion-vs-kansbol-vs-garberg/">
              Morakniv Companion vs Kansbol vs Garberg Showdown
            </a>
          </h4>
          <p class="bhq-card-excerpt">
            Batoning oak and feather sticking pine to evaluate Sweden's most iconic outdoor knives.
          </p>
          <div class="bhq-card-author">
            <img 
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80" 
              alt="Michigan Editorial Team" 
              class="bhq-card-avatar"
            />
            <div class="bhq-card-author-meta">
              <div class="bhq-card-author-name">
                Michigan Editorial Team <span style="color:#16a34a;">✔</span>
              </div>
              <div class="bhq-card-author-role">MSO Cutlery Review Board</div>
            </div>
          </div>
        </div>
      </article>

      <!-- CARD 4: LEARN / SHARPENING -->
      <article class="bhq-article-card" data-category="learn">
        <div class="bhq-card-image-wrap">
          <img 
            src="https://www.michigansportsoutdoor.com/wp-content/uploads/2026/03/camp-knife-sharpening-turn-box.png" 
            alt="How to Sharpen a Hunting Knife with a Turn-Box" 
            loading="lazy"
          />
          <span class="bhq-card-pill">Learn</span>
        </div>
        <div class="bhq-card-body">
          <div class="bhq-card-score-row">
            <span class="bhq-mini-score">⭐ 9.5 Score</span>
            <span class="bhq-mini-date">Sep 08, 2026 • 5 min</span>
          </div>
          <h4 class="bhq-card-title">
            <a href="https://www.michigansportsoutdoor.com/how-to-sharpen-a-knife-at-home/">
              How to Sharpen a Hunting Knife with a Turn-Box at Camp
            </a>
          </h4>
          <p class="bhq-card-excerpt">
            Step-by-step angle guide for maintaining a razor edge in the backcountry with ceramic and diamond rods.
          </p>
          <div class="bhq-card-author">
            <img 
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" 
              alt="Mubashar Sharif" 
              class="bhq-card-avatar"
            />
            <div class="bhq-card-author-meta">
              <div class="bhq-card-author-name">
                Mubashar Sharif <span style="color:#16a34a;">✔</span>
              </div>
              <div class="bhq-card-author-role">Master Field Sharpener</div>
            </div>
          </div>
        </div>
      </article>

      <!-- CARD 5: BEST OF / EDC FOLDERS -->
      <article class="bhq-article-card" data-category="best-of">
        <div class="bhq-card-image-wrap">
          <img 
            src="https://www.michigansportsoutdoor.com/wp-content/uploads/2026/03/best-edc-pocket-knives-under-100.png" 
            alt="Top 5 Best EDC Pocket Knives Under $100" 
            loading="lazy"
          />
          <span class="bhq-card-pill">Best Of</span>
        </div>
        <div class="bhq-card-body">
          <div class="bhq-card-score-row">
            <span class="bhq-mini-score">⭐ 9.7 Score</span>
            <span class="bhq-mini-date">Sep 06, 2026 • 7 min</span>
          </div>
          <h4 class="bhq-card-title">
            <a href="https://www.michigansportsoutdoor.com/top-best-edc-knives-under-100/">
              Top 5 Best EDC Pocket Knives Under $100 for Fall 2026
            </a>
          </h4>
          <p class="bhq-card-excerpt">
            Budget-friendly everyday carry blades that offer premium action, D2/14C28N steels, and dependable pocket clips.
          </p>
          <div class="bhq-card-author">
            <img 
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80" 
              alt="Michigan Editorial Team" 
              class="bhq-card-avatar"
            />
            <div class="bhq-card-author-meta">
              <div class="bhq-card-author-name">
                Michigan Editorial Team <span style="color:#16a34a;">✔</span>
              </div>
              <div class="bhq-card-author-role">EDC Gear Evaluation Unit</div>
            </div>
          </div>
        </div>
      </article>

      <!-- CARD 6: LEARN / KNIFE ANATOMY -->
      <article class="bhq-article-card" data-category="learn">
        <div class="bhq-card-image-wrap">
          <img 
            src="https://www.michigansportsoutdoor.com/wp-content/uploads/2026/03/knife-blade-edge-geometry-guide.png" 
            alt="Knife Edge Geometry Hollow vs Flat Grind" 
            loading="lazy"
          />
          <span class="bhq-card-pill">Learn</span>
        </div>
        <div class="bhq-card-body">
          <div class="bhq-card-score-row">
            <span class="bhq-mini-score">⭐ 9.3 Score</span>
            <span class="bhq-mini-date">Sep 04, 2026 • 6 min</span>
          </div>
          <h4 class="bhq-card-title">
            <a href="https://www.michigansportsoutdoor.com/understanding-knife-edge-geometry-hollow-grind-vs-flat-grind/">
              Understanding Knife Edge Geometry: Hollow vs Flat Grind
            </a>
          </h4>
          <p class="bhq-card-excerpt">
            An engineering analysis of bevel profiles, edge thickness behind the apex, and slicing vs chopping performance.
          </p>
          <div class="bhq-card-author">
            <img 
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" 
              alt="Mubashar Sharif" 
              class="bhq-card-avatar"
            />
            <div class="bhq-card-author-meta">
              <div class="bhq-card-author-name">
                Mubashar Sharif <span style="color:#16a34a;">✔</span>
              </div>
              <div class="bhq-card-author-role">Edge Geometry Specialist</div>
            </div>
          </div>
        </div>
      </article>

    </div>
  </section>

  <!-- 3.6 SHOP THE GEAR (EXACTLY 1 ROW OF 4 EQUAL CARDS - BLADE HQ SPECIALTY) -->
  <section class="bhq-gear-section">
    <div class="bhq-section-header">
      <h3 class="bhq-section-title">Shop The Gear • Tested in Our Field Guides</h3>
      <span class="bhq-section-sub">In-Stock at Michigan Sports Outdoor Cutlery Store</span>
    </div>

    <div class="bhq-gear-grid">
      
      <!-- ITEM 1: DMT DIAMOND SHARPENER -->
      <div class="bhq-gear-card">
        <div class="bhq-gear-img-box">
          <img 
            src="https://www.michigansportsoutdoor.com/wp-content/uploads/2026/03/dmt-diamond-sharpener-mso.png" 
            alt="DMT Extra Fine Diamond Sharpener" 
            loading="lazy"
          />
        </div>
        <div class="bhq-gear-stock">● In Stock • Ships Today</div>
        <h4 class="bhq-gear-title">DMT Extra Fine Diamond Stone</h4>
        <div class="bhq-gear-specs">1200 Mesh • MagnaCut / S30V Grade</div>
        <div class="bhq-gear-price">$64.99</div>
        <a href="https://www.michigansportsoutdoor.com/shop/" class="bhq-gear-cta">Buy from MSO →</a>
      </div>

      <!-- ITEM 2: SHARPI 8-IN-1 -->
      <div class="bhq-gear-card">
        <div class="bhq-gear-img-box">
          <img 
            src="https://www.michigansportsoutdoor.com/wp-content/uploads/2026/03/sharpi-8in1-field-tool.png" 
            alt="Sharpi 8-in-1 Field Sharpener" 
            loading="lazy"
          />
        </div>
        <div class="bhq-gear-stock">● In Stock • Ships Today</div>
        <h4 class="bhq-gear-title">Sharpi 8-in-1 Field Sharpener</h4>
        <div class="bhq-gear-specs">Carbide + Ceramic + Compass</div>
        <div class="bhq-gear-price">$15.95</div>
        <a href="https://www.michigansportsoutdoor.com/shop/" class="bhq-gear-cta">Buy from MSO →</a>
      </div>

      <!-- ITEM 3: LANSKY TURN-BOX -->
      <div class="bhq-gear-card">
        <div class="bhq-gear-img-box">
          <img 
            src="https://www.michigansportsoutdoor.com/wp-content/uploads/2026/03/lansky-turn-box-sharpener.png" 
            alt="Lansky 4-Rod Turn-Box" 
            loading="lazy"
          />
        </div>
        <div class="bhq-gear-stock">● In Stock • Ships Today</div>
        <h4 class="bhq-gear-title">Lansky 4-Rod Turn-Box</h4>
        <div class="bhq-gear-specs">Hardwood Case • 20° & 25° Rods</div>
        <div class="bhq-gear-price">$28.95</div>
        <a href="https://www.michigansportsoutdoor.com/shop/" class="bhq-gear-cta">Buy from MSO →</a>
      </div>

      <!-- ITEM 4: KERSHAW CHEF KNIFE -->
      <div class="bhq-gear-card">
        <div class="bhq-gear-img-box">
          <img 
            src="https://www.michigansportsoutdoor.com/wp-content/uploads/2026/03/kershaw-camp-chef-knife.png" 
            alt="Kershaw 8-Inch Camp Knife" 
            loading="lazy"
          />
        </div>
        <div class="bhq-gear-stock">● In Stock • Ships Today</div>
        <h4 class="bhq-gear-title">Kershaw 8" Camp & Kitchen Knife</h4>
        <div class="bhq-gear-specs">High-Carbon DIN 1.4116 Stainless</div>
        <div class="bhq-gear-price">$44.95</div>
        <a href="https://www.michigansportsoutdoor.com/shop/" class="bhq-gear-cta">Buy from MSO →</a>
      </div>

    </div>
  </section>

  <!-- 3.7 NEWSLETTER: JOIN THE KNIFE LIFE CLUB -->
  <section class="bhq-newsletter-banner">
    <div class="bhq-newsletter-text">
      <h3>Join the Knife Life Club</h3>
      <p>
        Subscribe for field-test results, super steel heat-treatment guides, and private alerts when limited hunting cutlery and diamond sharpeners restock.
      </p>
    </div>
    <form class="bhq-newsletter-form" onsubmit="event.preventDefault(); alert('Welcome to Knife Life! Your Free 2026 Steel Guide is on its way.');">
      <input 
        type="email" 
        class="bhq-newsletter-input" 
        placeholder="Enter your email address..." 
        required 
      />
      <button type="submit" class="bhq-newsletter-btn">Get Free Guide →</button>
    </form>
  </section>

</div>

<!-- ======================================================== -->
<!-- 4. INTERACTIVE SCRIPTS: VOICE SEARCH & CATEGORY FILTER   -->
<!-- ======================================================== -->
<script>
document.addEventListener('DOMContentLoaded', function() {
  // 4.1 CATEGORY TABS INTERACTIVITY
  const tabs = document.querySelectorAll('.bhq-tab-btn');
  const cards = document.querySelectorAll('#bhqArticlesGrid .bhq-article-card');
  const feedTitle = document.getElementById('bhqFeedTitle');

  tabs.forEach(tab => {
    tab.addEventListener('click', function() {
      tabs.forEach(t => t.classList.remove('active'));
      this.classList.add('active');

      const selectedCat = this.getAttribute('data-cat');
      let visibleCount = 0;

      cards.forEach(card => {
        const cardCat = card.getAttribute('data-category');
        if (selectedCat === 'all' || cardCat === selectedCat) {
          card.style.display = 'flex';
          visibleCount++;
        } else {
          card.style.display = 'none';
        }
      });

      if (feedTitle) {
        if (selectedCat === 'all') {
          feedTitle.textContent = 'Latest Knife Guides & Field Tests';
        } else {
          feedTitle.textContent = this.textContent + ' Articles (' + visibleCount + ')';
        }
      }
    });
  });

  // 4.2 SEARCH INPUT & VOICE ENGINE
  const searchInput = document.getElementById('bhqSearchInput');
  const searchSubmit = document.getElementById('bhqSearchSubmit');
  const voiceBtn = document.getElementById('bhqVoiceBtn');
  const voiceStatus = document.getElementById('bhqVoiceStatus');
  const tagPills = document.querySelectorAll('.bhq-tag-pill');

  function executeSearch(query) {
    if (!query) return;
    const cleanQuery = query.toLowerCase().trim();
    let matchFound = false;

    // Filter cards on page
    cards.forEach(card => {
      const text = card.textContent.toLowerCase();
      if (text.includes(cleanQuery)) {
        card.style.display = 'flex';
        matchFound = true;
      } else {
        card.style.display = 'none';
      }
    });

    if (feedTitle) {
      feedTitle.textContent = 'Search Results for "' + query + '"';
    }

    // Also scroll down to articles if query entered
    const grid = document.getElementById('bhqArticlesGrid');
    if (grid) {
      grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  if (searchSubmit && searchInput) {
    searchSubmit.addEventListener('click', () => executeSearch(searchInput.value));
    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        executeSearch(searchInput.value);
      }
    });
  }

  tagPills.forEach(pill => {
    pill.addEventListener('click', function() {
      const q = this.getAttribute('data-query');
      if (searchInput) searchInput.value = q;
      executeSearch(q);
    });
  });

  // 4.3 WEB SPEECH API FOR VOICE SEARCH
  if (voiceBtn && ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onstart = function() {
      voiceBtn.classList.add('listening');
      if (voiceStatus) voiceStatus.textContent = 'Listening...';
    };

    recognition.onresult = function(event) {
      const transcript = event.results[0][0].transcript;
      if (searchInput) {
        searchInput.value = transcript;
        executeSearch(transcript);
      }
    };

    recognition.onerror = function() {
      voiceBtn.classList.remove('listening');
      if (voiceStatus) voiceStatus.textContent = 'Voice';
    };

    recognition.onend = function() {
      voiceBtn.classList.remove('listening');
      if (voiceStatus) voiceStatus.textContent = 'Voice';
    };

    voiceBtn.addEventListener('click', function() {
      try {
        recognition.start();
      } catch (err) {
        console.warn('Speech recognition already active or error:', err);
      }
    });
  } else if (voiceBtn) {
    voiceBtn.addEventListener('click', function() {
      alert('Voice search is not supported in this browser. Please type your query.');
    });
  }
});
</script>
`;

  console.log('Deploying Blade HQ "Knife Life" Blog to Michigan Sports Outdoor...');
  const res = await fetch(`${baseUrl}/wp-json/wp/v2/pages/166494`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      title: 'Knife Life | Michigan Sports Outdoor Cutlery & Gear Journal',
      content: blogHtml
    })
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Failed to update page #166494: ${res.status} ${errText}`);
  }

  const data = await res.json();
  console.log('✅ Page updated successfully: ' + data.link);

  // Also sync with scripts/deploy-elite-toptal-blog.mjs or save as deploy-bladehq-blog.mjs in the repo
  const repoScriptPath = 'c:/Users/Mubashar Shahzad/Desktop/searchprex-website/scripts/deploy-bladehq-blog.mjs';
  fs.writeFileSync(repoScriptPath, fs.readFileSync(new URL(import.meta.url)));
  console.log('✅ Updated repo script at: ' + repoScriptPath);
}

deployBladeHQBlog().catch(err => {
  console.error('❌ Deployment error:', err);
  process.exit(1);
});
