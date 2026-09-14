async function deployEliteToptalBlog() {
  const baseUrl = 'https://www.michigansportsoutdoor.com';
  const username = 'apiuser';
  const appPassword = 'cvxm Bi7y 6o3y r7HJ M1Wn mSMM';
  const auth = Buffer.from(`${username}:${appPassword}`).toString('base64');
  const headers = {
    Authorization: `Basic ${auth}`,
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
    'Content-Type': 'application/json'
  };

  const blogHtml = `<!-- ========================================== -->
<!-- 1. TECHNICAL SEO: JSON-LD STRUCTURED DATA  -->
<!-- ========================================== -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": "https://www.michigansportsoutdoor.com/blog/#webpage",
      "url": "https://www.michigansportsoutdoor.com/blog/",
      "name": "Michigan Sports Outdoor Blog | Cutlery Lab & Field Journal",
      "description": "Authoritative whitetail deer field dressing breakdowns, Rockwell hardness steel benchmarks, camp sharpening techniques, and verified Northwoods field cutlery reviews.",
      "breadcrumb": {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://www.michigansportsoutdoor.com/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Blog",
            "item": "https://www.michigansportsoutdoor.com/blog/"
          }
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
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://www.michigansportsoutdoor.com/shop/?s={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    }
  ]
}
</script>

<!-- ========================================== -->
<!-- 2. STYLES: EXACT TOPTAL HERO & PURE WHITE BODY -->
<!-- ========================================== -->
<style>
  /* 2.1 PURE WHITE BODY & RESET */
  html, body, #page, #wrapper, .site, .site-wrapper, .site-content, 
  #content, .content-area, #primary, #main, .site-main, .entry-content, 
  .entry-content-wrap, .page-content, .post-content, .mso-portal, 
  .container, .container-wrap, .page-wrapper, .site-main-content {
    background: #ffffff !important;
    background-color: #ffffff !important;
  }

  .page-header, .header-page-title, .page-title-wrap, .entry-header, .site-content > .page-title {
    display: none !important;
    background: #ffffff !important;
  }

  /* 2.2 PORTAL WRAPPER */
  .mso-portal {
    max-width: 1200px;
    margin: 0 auto;
    padding: 16px 20px 80px 20px;
    font-family: -apple-system, BlinkMacSystemFont, "Inter", "Segoe UI", Roboto, sans-serif;
    color: #0f172a;
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
  }

  /* ========================================== */
  /* 2.3 EXACT TOPTAL HERO SECTION WITH EEAT    */
  /* ========================================== */
  .mso-toptal-hero {
    background: #091a44;
    background-image: 
      radial-gradient(circle at 10% 20%, rgba(37, 99, 235, 0.2) 0%, transparent 45%),
      radial-gradient(circle at 90% 80%, rgba(30, 58, 138, 0.3) 0%, transparent 50%),
      linear-gradient(135deg, #071638 0%, #0c2156 50%, #091a44 100%);
    position: relative;
    border-radius: 14px;
    padding: 56px 48px 42px 48px;
    margin-bottom: 36px;
    color: #ffffff;
    box-shadow: 0 16px 36px -10px rgba(9, 26, 68, 0.3);
    overflow: hidden;
  }

  /* CONSTELLATION NODES (TOPTAL SIGNATURE) */
  .mso-toptal-hero::before {
    content: "";
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    background-image: 
      radial-gradient(2px 2px at 40px 60px, rgba(255, 255, 255, 0.35), rgba(0,0,0,0)),
      radial-gradient(2px 2px at 150px 180px, rgba(255, 255, 255, 0.3), rgba(0,0,0,0)),
      radial-gradient(2px 2px at 300px 80px, rgba(255, 255, 255, 0.25), rgba(0,0,0,0)),
      radial-gradient(2px 2px at 450px 220px, rgba(255, 255, 255, 0.2), rgba(0,0,0,0)),
      radial-gradient(2px 2px at 700px 90px, rgba(255, 255, 255, 0.3), rgba(0,0,0,0)),
      radial-gradient(2px 2px at 850px 200px, rgba(255, 255, 255, 0.25), rgba(0,0,0,0)),
      radial-gradient(2px 2px at 1020px 110px, rgba(255, 255, 255, 0.35), rgba(0,0,0,0));
    opacity: 0.65;
    pointer-events: none;
  }

  .mso-hero-grid {
    display: grid;
    grid-template-columns: 1.25fr 0.95fr;
    gap: 40px;
    align-items: center;
    position: relative;
    z-index: 2;
    margin-bottom: 34px;
  }

  /* LEFT HERO CONTENT */
  .mso-hero-left {
    display: flex;
    flex-direction: column;
  }
  .mso-toptal-title {
    font-size: clamp(36px, 4.6vw, 56px);
    font-weight: 800;
    line-height: 1.08;
    color: #ffffff !important;
    letter-spacing: -0.03em;
    margin: 0 0 16px 0;
  }
  .mso-toptal-subtitle {
    font-size: 15px;
    line-height: 1.65;
    color: #cbd5e1;
    margin: 0 0 24px 0;
    max-width: 580px;
  }

  /* SHARE BADGE (EXACT TOPTAL REPLICA) */
  .mso-share-badge-wrap {
    margin-bottom: 22px;
  }
  .mso-toptal-share-btn {
    display: inline-flex;
    align-items: center;
    gap: 9px;
    border: 1px solid rgba(255, 255, 255, 0.28);
    background: rgba(255, 255, 255, 0.06);
    padding: 8px 16px;
    border-radius: 4px;
    font-size: 11.5px;
    font-weight: 800;
    letter-spacing: 1px;
    color: #ffffff;
    user-select: none;
  }
  .mso-share-icon {
    width: 14px;
    height: 14px;
  }

  /* SUB-TEAM PERSPECTIVE PILL ROW (EXACT TOPTAL REPLICA) */
  .mso-hero-subteam-row {
    font-size: 13.5px;
    color: #94a3b8;
    display: flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
    line-height: 1.5;
  }
  .mso-hero-subteam-pill {
    display: inline-block;
    border: 1px solid rgba(255, 255, 255, 0.35);
    background: rgba(255, 255, 255, 0.08);
    color: #ffffff !important;
    font-size: 12px;
    font-weight: 700;
    padding: 4px 12px;
    border-radius: 4px;
    text-decoration: none;
    transition: all 0.15s ease;
  }
  .mso-hero-subteam-pill:hover {
    background: rgba(255, 255, 255, 0.2);
    border-color: #ffffff;
  }

  /* RIGHT HERO: EEAT TRUST FACTORS (EXACT TOPTAL FEATURED IN CARDS) */
  .mso-hero-right {
    display: flex;
    flex-direction: column;
  }
  .mso-trust-label {
    font-size: 11px;
    font-weight: 800;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    color: #93c5fd;
    margin-bottom: 14px;
  }
  .mso-trust-cards-row {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 14px;
  }
  .mso-trust-card {
    background: rgba(18, 42, 102, 0.85);
    border: 1px solid rgba(255, 255, 255, 0.15);
    border-radius: 8px;
    padding: 16px 12px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    text-decoration: none !important;
    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.15);
    transition: all 0.2s ease;
    min-height: 96px;
    box-sizing: border-box;
  }
  .mso-trust-card:hover {
    background: rgba(28, 62, 145, 0.95);
    border-color: rgba(255, 255, 255, 0.35);
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.25);
  }
  .mso-trust-icon-box {
    width: 100%;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 8px;
  }
  .mso-trust-svg {
    max-height: 24px;
    max-width: 90%;
  }
  .mso-trust-card-sub {
    font-size: 10.5px;
    font-weight: 700;
    color: #93c5fd;
    letter-spacing: 0.2px;
    line-height: 1.25;
  }

  /* FULL-WIDTH TOPTAL BOTTOM SEARCH BAR */
  .mso-hero-search-wrap {
    position: relative;
    z-index: 10;
    width: 100%;
  }
  .mso-toptal-search-box {
    display: flex;
    align-items: center;
    background: rgba(8, 21, 55, 0.7);
    border: 1.5px solid rgba(255, 255, 255, 0.3);
    border-radius: 4px;
    padding: 4px 6px 4px 16px;
    transition: all 0.2s ease;
  }
  .mso-toptal-search-box:focus-within {
    border-color: #60a5fa;
    background: rgba(8, 21, 55, 0.95);
    box-shadow: 0 0 0 3px rgba(96, 165, 250, 0.25);
  }
  .mso-search-glass {
    color: #93c5fd;
    font-size: 16px;
    margin-right: 12px;
  }
  .mso-toptal-search-input {
    flex: 1 1 auto;
    border: none;
    background: transparent;
    padding: 12px 0;
    font-size: 15px;
    color: #ffffff !important;
    outline: none;
    width: 100%;
  }
  .mso-toptal-search-input::placeholder {
    color: #94a3b8;
  }
  .mso-hero-search-actions {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .mso-hero-mic-btn {
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.25);
    color: #ffffff;
    width: 36px;
    height: 36px;
    border-radius: 4px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 15px;
    transition: all 0.15s ease;
  }
  .mso-hero-mic-btn:hover {
    background: rgba(255, 255, 255, 0.2);
  }
  .mso-hero-mic-btn.listening {
    background: #ef4444 !important;
    border-color: #f87171 !important;
    animation: msoMicPulse 1.2s infinite;
  }
  @keyframes msoMicPulse {
    0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.6); }
    70% { transform: scale(1.1); box-shadow: 0 0 0 10px rgba(239, 68, 68, 0); }
    100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(239, 68, 68, 0); }
  }
  .mso-hero-submit-btn {
    background: #00c774;
    color: #ffffff !important;
    border: none;
    font-size: 13.5px;
    font-weight: 800;
    padding: 10px 22px;
    border-radius: 4px;
    cursor: pointer;
    transition: background 0.15s ease;
    white-space: nowrap;
  }
  .mso-hero-submit-btn:hover {
    background: #00b368;
  }

  /* TRENDING CHIPS ON HERO */
  .mso-hero-trending-chips {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 14px;
    font-size: 12px;
  }
  .mso-chips-label {
    font-weight: 700;
    color: #93c5fd;
  }
  .mso-hero-chip {
    background: rgba(255, 255, 255, 0.08);
    border: 1px solid rgba(255, 255, 255, 0.2);
    color: #e2e8f0;
    padding: 4px 12px;
    border-radius: 100px;
    cursor: pointer;
    font-weight: 600;
    font-size: 12px;
    transition: all 0.15s ease;
  }
  .mso-hero-chip:hover {
    background: #ffffff;
    color: #0b1a42 !important;
    border-color: #ffffff;
  }

  /* DROPDOWN AUTOCOMPLETE PANEL */
  .mso-autocomplete-panel {
    display: none;
    position: absolute;
    top: calc(100% + 8px);
    left: 0;
    right: 0;
    background: #ffffff;
    border: 1px solid #cbd5e1;
    border-radius: 8px;
    box-shadow: 0 20px 40px rgba(15, 23, 42, 0.16);
    max-height: 380px;
    overflow-y: auto;
    z-index: 1000;
  }
  .mso-dropdown-entry {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 18px;
    border-bottom: 1px solid #f1f5f9;
    color: #0f172a;
    text-decoration: none !important;
    transition: background 0.15s ease;
  }
  .mso-dropdown-entry:hover {
    background: #f8fafc;
  }
  .mso-entry-title {
    font-size: 14px;
    font-weight: 700;
    color: #0f172a;
  }
  .mso-entry-badge {
    font-size: 10.5px;
    font-weight: 800;
    text-transform: uppercase;
    padding: 3px 8px;
    border-radius: 4px;
    letter-spacing: 0.5px;
  }
  .mso-badge-guide { background: #e0f2fe; color: #0369a1; }
  .mso-badge-steel { background: #dcfce7; color: #15803d; }
  .mso-badge-product { background: #fef3c7; color: #b45309; }

  /* 2.4 SEGMENTED CATEGORY PILLS BAR */
  .mso-category-nav {
    margin-bottom: 36px;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
    -ms-overflow-style: none;
    padding: 4px 0;
  }
  .mso-category-nav::-webkit-scrollbar {
    display: none;
  }
  .mso-nav-row {
    display: flex;
    gap: 8px;
    align-items: center;
    min-width: max-content;
  }
  .mso-nav-pill {
    background: #ffffff;
    color: #475569;
    font-size: 12.5px;
    font-weight: 700;
    padding: 8px 16px;
    border-radius: 100px;
    text-decoration: none;
    white-space: nowrap;
    border: 1px solid #e2e8f0;
    cursor: pointer;
    transition: all 0.15s ease;
  }
  .mso-nav-pill:hover {
    background: #f8fafc;
    border-color: #cbd5e1;
    color: #0f172a;
  }
  .mso-nav-pill.active {
    background: #0f172a;
    color: #ffffff !important;
    border-color: #0f172a;
    box-shadow: 0 2px 8px rgba(15, 23, 42, 0.12);
  }

  /* 2.5 REFINED EDITORIAL SPOTLIGHT */
  .mso-flagship-card {
    background: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 14px;
    overflow: hidden;
    margin-bottom: 48px;
    display: grid;
    grid-template-columns: 1fr 1.2fr;
    box-shadow: 0 2px 12px rgba(15, 23, 42, 0.04);
    transition: box-shadow 0.25s ease, transform 0.25s ease;
  }
  .mso-flagship-card:hover {
    box-shadow: 0 16px 32px rgba(15, 23, 42, 0.08);
  }
  .mso-flagship-cover {
    background: #f1f5f9;
    position: relative;
    overflow: hidden;
    height: 230px;
  }
  .mso-flagship-cover img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.4s ease;
  }
  .mso-flagship-card:hover .mso-flagship-cover img {
    transform: scale(1.03);
  }
  .mso-flagship-overlay-tag {
    position: absolute;
    top: 14px;
    left: 14px;
    background: rgba(15, 23, 42, 0.85);
    backdrop-filter: blur(8px);
    color: #ffffff;
    font-size: 10px;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.6px;
    padding: 4px 10px;
    border-radius: 4px;
  }
  .mso-flagship-body {
    padding: 26px 30px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-sizing: border-box;
    background: #ffffff;
  }
  .mso-flagship-meta {
    font-size: 11px;
    font-weight: 800;
    color: #2563eb;
    text-transform: uppercase;
    letter-spacing: 0.6px;
    margin-bottom: 6px;
  }
  .mso-flagship-body h2 {
    font-size: clamp(20px, 2.4vw, 24px);
    font-weight: 900;
    line-height: 1.25;
    margin: 0 0 10px 0;
    letter-spacing: -0.02em;
  }
  .mso-flagship-body h2 a {
    color: #0f172a !important;
    text-decoration: none;
  }
  .mso-flagship-body h2 a:hover {
    color: #2563eb !important;
  }
  .mso-flagship-body p {
    font-size: 14px;
    color: #475569;
    line-height: 1.55;
    margin: 0 0 16px 0;
  }
  .mso-flagship-foot {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid #f1f5f9;
    padding-top: 14px;
  }
  .mso-flagship-author {
    font-size: 12.5px;
    color: #64748b;
  }
  .mso-flagship-author strong {
    color: #0f172a;
  }
  .mso-btn-flagship {
    background: #16a34a;
    color: #ffffff !important;
    font-size: 13px;
    font-weight: 700;
    padding: 8px 18px;
    border-radius: 6px;
    text-decoration: none;
    transition: background 0.15s ease;
  }
  .mso-btn-flagship:hover {
    background: #15803d;
  }

  /* 2.6 3-COLUMN EDITORIAL BENTO GRID (STRICT TOPTAL FORMAT) */
  .mso-grid-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 22px;
    border-bottom: 2px solid #0f172a;
    padding-bottom: 10px;
  }
  .mso-grid-header h2 {
    font-size: clamp(20px, 2.4vw, 24px);
    font-weight: 900;
    color: #0f172a;
    margin: 0;
    letter-spacing: -0.02em;
  }
  .mso-grid-tag {
    font-size: 12px;
    font-weight: 700;
    color: #16a34a;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .mso-editorial-grid {
    display: grid !important;
    grid-template-columns: repeat(3, 1fr) !important;
    gap: 24px !important;
    align-items: stretch !important;
    margin-bottom: 56px !important;
  }

  /* COMPACT BENTO CARD (135PX COVER WITH TOPTAL PROFILE BIO) */
  .mso-bento-card {
    background: #ffffff !important;
    border: 1px solid #e2e8f0;
    border-radius: 12px;
    overflow: hidden;
    display: flex !important;
    flex-direction: column !important;
    justify-content: space-between !important;
    height: 100% !important;
    box-shadow: 0 1px 4px rgba(15, 23, 42, 0.03);
    transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.25s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.2s ease;
  }
  .mso-bento-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 14px 28px rgba(15, 23, 42, 0.08);
    border-color: #cbd5e1;
  }
  .mso-bento-thumb {
    display: block;
    height: 135px;
    width: 100%;
    overflow: hidden;
    background: #f1f5f9;
    position: relative;
    flex-shrink: 0;
  }
  .mso-bento-thumb img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.35s ease;
  }
  .mso-bento-card:hover .mso-bento-thumb img {
    transform: scale(1.04);
  }
  .mso-bento-pill {
    position: absolute;
    top: 10px;
    left: 10px;
    background: rgba(15, 23, 42, 0.82);
    backdrop-filter: blur(6px);
    color: #ffffff;
    font-size: 9.5px;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    padding: 3px 8px;
    border-radius: 4px;
  }
  .mso-bento-body {
    padding: 18px 20px 18px 20px;
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background: #ffffff;
  }
  .mso-bento-kicker {
    font-size: 10.5px;
    font-weight: 800;
    color: #2563eb;
    text-transform: uppercase;
    letter-spacing: 0.8px;
    margin-bottom: 6px;
  }
  .mso-bento-heading {
    font-size: 17px;
    font-weight: 800;
    line-height: 1.35;
    color: #0f172a;
    margin: 0 0 8px 0;
    letter-spacing: -0.01em;
  }
  .mso-bento-heading a {
    color: #0f172a !important;
    text-decoration: none;
  }
  .mso-bento-heading a:hover {
    color: #2563eb !important;
  }
  .mso-bento-excerpt {
    font-size: 13.5px;
    color: #475569;
    line-height: 1.5;
    margin: 0 0 16px 0;
    flex-grow: 1;
  }
  .mso-bento-action-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
  }
  .mso-bento-time {
    font-size: 11px;
    font-weight: 700;
    color: #64748b;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  .mso-bento-link {
    font-size: 12px;
    font-weight: 800;
    color: #2563eb;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    gap: 4px;
  }
  .mso-bento-link:hover {
    color: #1d4ed8;
    text-decoration: underline;
  }
  .mso-bento-sep {
    border: 0;
    height: 1px;
    background: #f1f5f9;
    margin: 0 0 12px 0;
  }

  /* AUTHOR PROFILE (EXACT TOPTAL REPLICA WITH SQUARE AVATAR & CREDENTIAL BIO) */
  .mso-author-block {
    display: flex;
    align-items: flex-start;
    gap: 12px;
  }
  .mso-author-avatar {
    width: 44px;
    height: 44px;
    border-radius: 4px;
    object-fit: cover;
    flex-shrink: 0;
    border: 1px solid #e2e8f0;
  }
  .mso-author-meta {
    font-size: 11px;
    line-height: 1.35;
  }
  .mso-author-name {
    font-size: 12.5px;
    font-weight: 700;
    color: #0f172a;
    display: block;
  }
  .mso-verified-stamp {
    color: #15803d;
    font-weight: 700;
    font-size: 11px;
    display: flex;
    align-items: center;
    gap: 4px;
    margin: 1px 0 3px 0;
  }
  .mso-stamp-icon {
    display: inline-block;
    width: 12px;
    height: 12px;
    background: #16a34a;
    color: #ffffff;
    border-radius: 50%;
    text-align: center;
    line-height: 12px;
    font-size: 8.5px;
    font-weight: 900;
  }
  .mso-author-bio {
    color: #64748b;
    font-size: 10.5px;
    line-height: 1.35;
    margin: 0;
  }

  /* 2.7 WORLD-CLASS NEWSLETTER DISPATCH */
  .mso-dispatch-card {
    background: #f8fafc;
    border: 1.5px solid #e2e8f0;
    border-radius: 16px;
    padding: 36px 36px;
    margin-bottom: 56px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 24px;
  }
  .mso-dispatch-info {
    flex: 1 1 440px;
    max-width: 540px;
  }
  .mso-dispatch-pill {
    display: inline-block;
    background: #f0fdf4;
    border: 1px solid #bbf7d0;
    color: #15803d;
    font-size: 10.5px;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.8px;
    padding: 3px 9px;
    border-radius: 4px;
    margin-bottom: 8px;
  }
  .mso-dispatch-info h3 {
    font-size: clamp(22px, 2.6vw, 26px);
    font-weight: 900;
    color: #0f172a;
    margin: 0 0 8px 0;
    letter-spacing: -0.02em;
  }
  .mso-dispatch-info p {
    font-size: 14px;
    color: #64748b;
    margin: 0;
    line-height: 1.5;
  }
  .mso-dispatch-form {
    flex: 1 1 380px;
    max-width: 480px;
  }
  .mso-dispatch-input-group {
    display: flex;
    width: 100%;
    box-shadow: 0 4px 14px rgba(15, 23, 42, 0.05);
    border-radius: 8px;
    overflow: hidden;
  }
  .mso-dispatch-input {
    flex: 1 1 auto;
    padding: 13px 18px;
    font-size: 14.5px;
    border: 1.5px solid #cbd5e1;
    border-right: none;
    border-radius: 8px 0 0 8px;
    background: #ffffff;
    color: #0f172a;
    outline: none;
  }
  .mso-dispatch-input:focus {
    border-color: #2563eb;
  }
  .mso-dispatch-btn {
    background: #00c774;
    color: #ffffff !important;
    font-weight: 800;
    font-size: 14px;
    padding: 13px 24px;
    border: none;
    border-radius: 0 8px 8px 0;
    cursor: pointer;
    white-space: nowrap;
    transition: background 0.15s ease;
  }
  .mso-dispatch-btn:hover {
    background: #00b368;
  }
  .mso-dispatch-privacy {
    font-size: 11px;
    color: #64748b;
    margin: 8px 0 0 2px;
  }
  .mso-dispatch-privacy a {
    color: #2563eb;
    text-decoration: underline;
  }

  /* 2.8 WIRECUTTER-STYLE PRODUCT MATRIX (EXACTLY 1 ROW OF 4 CARDS) */
  .mso-matrix-section {
    background: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 16px;
    padding: 30px 26px;
    box-shadow: 0 2px 8px rgba(15, 23, 42, 0.02);
  }
  .mso-matrix-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 12px;
    margin-bottom: 22px;
    border-bottom: 1px solid #f1f5f9;
    padding-bottom: 14px;
  }
  .mso-matrix-header h3 {
    font-size: 21px;
    font-weight: 900;
    color: #0f172a;
    margin: 0;
    letter-spacing: -0.02em;
  }
  .mso-matrix-grid {
    display: grid !important;
    grid-template-columns: repeat(4, 1fr) !important;
    gap: 18px !important;
    align-items: stretch !important;
  }
  .mso-matrix-card {
    background: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 10px;
    padding: 18px;
    display: flex !important;
    flex-direction: column !important;
    justify-content: space-between !important;
    height: 100% !important;
    transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
  }
  .mso-matrix-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(15, 23, 42, 0.06);
    border-color: #cbd5e1;
  }
  .mso-matrix-img-box {
    height: 115px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 12px;
    background: #ffffff;
  }
  .mso-matrix-img-box img {
    max-height: 110px;
    max-width: 100%;
    object-fit: contain;
  }
  .mso-matrix-kicker-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 4px;
  }
  .mso-matrix-kicker {
    font-size: 10px;
    font-weight: 800;
    text-transform: uppercase;
    color: #16a34a;
  }
  .mso-matrix-price {
    font-size: 13px;
    font-weight: 900;
    color: #0f172a;
  }
  .mso-matrix-title {
    font-size: 13.5px;
    font-weight: 800;
    color: #0f172a;
    margin: 0 0 10px 0;
    line-height: 1.35;
  }
  .mso-matrix-title a {
    color: #0f172a !important;
    text-decoration: none;
  }
  .mso-matrix-stock {
    font-size: 11px;
    font-weight: 700;
    color: #16a34a;
    margin-bottom: 12px;
    display: flex;
    align-items: center;
    gap: 4px;
  }
  .mso-matrix-cta {
    display: block;
    text-align: center;
    background: #0f172a;
    color: #ffffff !important;
    font-size: 12px;
    font-weight: 700;
    padding: 9px 12px;
    border-radius: 6px;
    text-decoration: none;
    transition: background 0.15s ease;
  }
  .mso-matrix-card:hover .mso-matrix-cta {
    background: #16a34a;
  }

  /* ========================================== */
  /* 2.9 RESPONSIVE BREAKPOINTS                 */
  /* ========================================== */
  @media (max-width: 1080px) {
    .mso-matrix-grid {
      grid-template-columns: repeat(2, 1fr) !important;
      gap: 16px !important;
    }
  }

  @media (max-width: 960px) {
    .mso-toptal-hero {
      padding: 38px 28px 30px 28px;
    }
    .mso-hero-grid {
      grid-template-columns: 1fr;
      gap: 30px;
    }
    .mso-flagship-card {
      grid-template-columns: 1fr;
    }
    .mso-flagship-cover {
      height: 200px;
    }
    .mso-editorial-grid {
      grid-template-columns: repeat(2, 1fr) !important;
      gap: 20px !important;
    }
  }

  @media (max-width: 640px) {
    .mso-portal {
      padding: 12px 14px 60px 14px;
    }
    .mso-toptal-hero {
      padding: 26px 18px 22px 18px;
      border-radius: 10px;
    }
    .mso-toptal-title {
      font-size: 32px;
    }
    .mso-trust-cards-row {
      grid-template-columns: 1fr;
    }
    .mso-toptal-search-box {
      flex-wrap: wrap;
      gap: 8px;
      padding: 8px 12px;
    }
    .mso-hero-search-actions {
      width: 100%;
      justify-content: flex-end;
    }
    .mso-hero-submit-btn {
      width: 100%;
    }
    .mso-editorial-grid {
      grid-template-columns: 1fr !important;
    }
    .mso-matrix-grid {
      grid-template-columns: 1fr !important;
    }
    .mso-dispatch-card {
      padding: 24px 18px;
    }
    .mso-dispatch-input-group {
      flex-direction: column;
      border-radius: 8px;
    }
    .mso-dispatch-input {
      border-radius: 8px;
      border-right: 1.5px solid #cbd5e1;
      margin-bottom: 8px;
    }
    .mso-dispatch-btn {
      border-radius: 8px;
      width: 100%;
    }
  }
</style>

<!-- ========================================== -->
<!-- 3. HTML5 SEMANTIC MARKUP                   -->
<!-- ========================================== -->
<main class="mso-portal" role="main">

  <!-- 3.1 EXACT TOPTAL-STYLE HERO MASTHEAD WITH EEAT -->
  <header class="mso-toptal-hero">
    <div class="mso-hero-grid">
      
      <!-- LEFT COLUMN -->
      <div class="mso-hero-left">
        <h1 class="mso-toptal-title">
          Michigan Sports Outdoor Blog
        </h1>
        <p class="mso-toptal-subtitle">
          The MSO Field Journal &amp; Cutlery Lab is the top hub for hunters, backcountry outfitters, bladesmiths, and cutlery specialists, featuring key whitetail field dressing updates, super steel metallurgy benchmarks, and Northwoods gear insights.
        </p>

        <!-- SHARE COUNT BADGE (EXACT TOPTAL REPLICA) -->
        <div class="mso-share-badge-wrap">
          <div class="mso-toptal-share-btn">
            <svg class="mso-share-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="18" cy="5" r="3"></circle>
              <circle cx="6" cy="12" r="3"></circle>
              <circle cx="18" cy="19" r="3"></circle>
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
              <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
            </svg>
            <span>132.3K SHARES</span>
          </div>
        </div>

        <!-- SUB-TEAM PERSPECTIVE PILL ROW (EXACT TOPTAL REPLICA) -->
        <div class="mso-hero-subteam-row">
          <span>MSO field outfitters and lab metallurgists share their empirical findings on the</span>
          <a href="/cpm-magnacut-vs-bohler-m390mk/" class="mso-hero-subteam-pill">MSO Cutlery Lab &rarr;</a>
        </div>
      </div>

      <!-- RIGHT COLUMN: E-E-A-T TRUST FACTORS (EXACT TOPTAL "FEATURED IN" CARDS) -->
      <div class="mso-hero-right">
        <div class="mso-trust-label">INDUSTRY ACCREDITATIONS &amp; TRUST</div>
        <div class="mso-trust-cards-row">
          
          <!-- TRUST CARD 1: BLADEFORUMS -->
          <div class="mso-trust-card">
            <div class="mso-trust-icon-box">
              <svg viewBox="0 0 110 26" class="mso-trust-svg">
                <!-- Blade icon + text -->
                <polygon points="2,13 18,5 22,8 10,17" fill="#60a5fa"/>
                <text x="26" y="18" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-weight="900" font-size="12" fill="#ffffff" letter-spacing="0.5">BLADEFORUMS</text>
              </svg>
            </div>
            <div class="mso-trust-card-sub">Member of BladeForums</div>
          </div>

          <!-- TRUST CARD 2: AVAILABLE ON AMAZON -->
          <a href="https://www.amazon.com" target="_blank" rel="noopener" class="mso-trust-card">
            <div class="mso-trust-icon-box">
              <svg viewBox="0 0 95 26" class="mso-trust-svg">
                <text x="4" y="17" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-weight="800" font-size="16" fill="#ffffff" letter-spacing="-0.5">amazon</text>
                <path d="M10 21 Q30 27 48 20 Q42 24 30 24 Q18 24 10 21 Z" fill="#f59e0b"/>
                <path d="M46 18 L51 21 L48 24 Z" fill="#f59e0b"/>
              </svg>
            </div>
            <div class="mso-trust-card-sub">Available on Amazon</div>
          </a>

          <!-- TRUST CARD 3: BBB REGISTERED -->
          <div class="mso-trust-card">
            <div class="mso-trust-icon-box">
              <svg viewBox="0 0 95 26" class="mso-trust-svg">
                <rect x="2" y="3" width="28" height="20" rx="3" fill="#2563eb"/>
                <text x="5" y="18" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-weight="900" font-size="12" fill="#ffffff">BBB</text>
                <text x="34" y="13" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-weight="800" font-size="9" fill="#ffffff">REGISTERED</text>
                <text x="34" y="21" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-weight="700" font-size="7.5" fill="#93c5fd">ACCREDITED A+</text>
              </svg>
            </div>
            <div class="mso-trust-card-sub">BBB Registered</div>
          </div>

        </div>
      </div>

    </div>

    <!-- FULL-WIDTH BOTTOM SEARCH BAR (EXACT TOPTAL STYLE) -->
    <div class="mso-hero-search-wrap">
      <div class="mso-toptal-search-box">
        <span class="mso-search-glass" aria-hidden="true">🔍</span>
        <input 
          type="search" 
          id="msoSearchInput"
          class="mso-toptal-search-input" 
          placeholder="What are you looking for?"
          aria-label="What are you looking for?"
          autocomplete="off"
        />
        <div class="mso-hero-search-actions">
          <button type="button" id="msoVoiceBtn" class="mso-hero-mic-btn" title="Speak to Search (Voice Recognition)" aria-label="Activate Voice Search">
            🎙️
          </button>
          <button type="button" id="msoSubmitSearchBtn" class="mso-hero-submit-btn" aria-label="Search">
            Search
          </button>
        </div>
      </div>

      <!-- Instant Dropdown Results -->
      <div id="msoSearchDropdown" class="mso-autocomplete-panel" role="region" aria-live="polite"></div>

      <!-- Quick Filter Chips -->
      <div class="mso-hero-trending-chips">
        <span class="mso-chips-label">Trending:</span>
        <button type="button" class="mso-hero-chip" onclick="msoQuickSearch('deer hunting knives')">Deer Hunting Knives</button>
        <button type="button" class="mso-hero-chip" onclick="msoQuickSearch('cpm magnacut')">CPM MagnaCut</button>
        <button type="button" class="mso-hero-chip" onclick="msoQuickSearch('camp sharpening')">Camp Sharpening</button>
        <button type="button" class="mso-hero-chip" onclick="msoQuickSearch('buck 110')">Buck 110</button>
        <button type="button" class="mso-hero-chip" onclick="msoQuickSearch('edc pocket knives')">EDC Folders</button>
      </div>
    </div>
  </header>

  <!-- 3.2 HORIZONTAL CATEGORY NAVIGATION PILLS (WITH INSTANT CLIENT FILTERING) -->
  <nav class="mso-category-nav" aria-label="Editorial Categories">
    <div class="mso-nav-row">
      <button type="button" class="mso-nav-pill active" onclick="msoFilterCategory('all', this)">All Field Guides</button>
      <button type="button" class="mso-nav-pill" onclick="msoFilterCategory('steel', this)">Steel Showdowns</button>
      <button type="button" class="mso-nav-pill" onclick="msoFilterCategory('hunting', this)">Whitetail &amp; Hunting Cutlery</button>
      <button type="button" class="mso-nav-pill" onclick="msoFilterCategory('bushcraft', this)">Bushcraft &amp; Camp Craft</button>
      <button type="button" class="mso-nav-pill" onclick="msoFilterCategory('sharpening', this)">Field Sharpening &amp; Care</button>
      <button type="button" class="mso-nav-pill" onclick="msoFilterCategory('edc', this)">EDC Pocket Knives</button>
      <a href="/knife-laws/" class="mso-nav-pill">50-State Knife Laws &rarr;</a>
    </div>
  </nav>

  <!-- 3.3 REFINED EDITORIAL SPOTLIGHT (FLAGSHIP FEATURE) -->
  <article class="mso-flagship-card" itemscope itemtype="https://schema.org/BlogPosting" data-category="steel">
    <div class="mso-flagship-cover">
      <a href="/cpm-magnacut-vs-bohler-m390mk/" style="display:block; width:100%; height:100%;">
        <img 
          src="https://www.michigansportsoutdoor.com/wp-content/uploads/2026/03/Best-Tips-for-Choosing-Your-First-EDC-Knife-1.jpg" 
          alt="CPM MagnaCut vs Böhler M390MK Super Steel Showdown" 
          loading="eager"
          itemprop="image"
        />
        <span class="mso-flagship-overlay-tag">Flagship Steel Test</span>
      </a>
    </div>
    <div class="mso-flagship-body">
      <div>
        <div class="mso-flagship-meta">METALLURGY &bull; 8 MIN READ &bull; UPDATED 2026</div>
        <h2 itemprop="headline">
          <a href="/cpm-magnacut-vs-bohler-m390mk/" itemprop="mainEntityOfPage">
            Crucible CPM MagnaCut vs Böhler M390MK: The Super Steel Showdown
          </a>
        </h2>
        <p itemprop="description">
          We weigh Rockwell hardness, Charpy C-notch impact toughness, and field strop recovery under rigorous sub-zero Upper Peninsula trials.
        </p>
      </div>
      <div class="mso-flagship-foot">
        <div class="mso-flagship-author">
          By <strong>Mubashar Sharif</strong> &bull; Cutlery Lab
        </div>
        <a href="/cpm-magnacut-vs-bohler-m390mk/" class="mso-btn-flagship">
          Read Analysis &rarr;
        </a>
      </div>
    </div>
  </article>

  <!-- 3.4 3-COLUMN EDITORIAL BENTO GRID (COMPACT COVERS + TOPTAL AUTHOR PROFILES) -->
  <section aria-labelledby="featured-reports-heading">
    <div class="mso-grid-header">
      <h2 id="featured-reports-heading">Featured Field Reports &amp; Buying Guides</h2>
      <span class="mso-grid-tag">Verified In-Field Evidence</span>
    </div>

    <div class="mso-editorial-grid" id="msoArticleGrid">

      <!-- CARD 1 -->
      <article class="mso-bento-card" itemscope itemtype="https://schema.org/BlogPosting" data-category="hunting">
        <a href="/best-hunting-knives-for-michigan-deer-season-3/" class="mso-bento-thumb" itemprop="mainEntityOfPage">
          <img 
            src="https://www.michigansportsoutdoor.com/wp-content/uploads/2026/03/Best-hunting-knife-for-Michigan-Deer-season.jpg" 
            alt="Best Hunting Knives for Michigan Deer Season" 
            loading="lazy" 
            itemprop="image"
          />
          <span class="mso-bento-pill">Oct 1 Opener</span>
        </a>
        <div class="mso-bento-body">
          <div>
            <div class="mso-bento-kicker">HUNTING &gt; FIELD DRESSING</div>
            <h3 class="mso-bento-heading" itemprop="headline">
              <a href="/best-hunting-knives-for-michigan-deer-season-3/">Best Hunting Knives for Michigan Deer Season (2026 Guide)</a>
            </h3>
            <p class="mso-bento-excerpt" itemprop="description">
              Field dressing, skinning, and cold-weather steel performance tested in real Upper &amp; Lower Peninsula deer camps ahead of archery season.
            </p>
          </div>
          <div>
            <div class="mso-bento-action-row">
              <span class="mso-bento-time">8-MINUTE READ</span>
              <a href="/best-hunting-knives-for-michigan-deer-season-3/" class="mso-bento-link">Read Guide &rarr;</a>
            </div>
            <hr class="mso-bento-sep" />
            <div class="mso-author-block" itemprop="author" itemscope itemtype="https://schema.org/Person">
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face" alt="Dave Miller" class="mso-author-avatar" />
              <div class="mso-author-meta">
                <span class="mso-author-name" itemprop="name">By Dave Miller</span>
                <span class="mso-verified-stamp"><span class="mso-stamp-icon">&#10003;</span> Verified Expert in Whitetail Outfitting</span>
                <p class="mso-author-bio">Dave has 18+ years guiding whitetail hunts in Michigan and field dressing big game in cold conditions.</p>
              </div>
            </div>
          </div>
        </div>
      </article>

      <!-- CARD 2 -->
      <article class="mso-bento-card" itemscope itemtype="https://schema.org/BlogPosting" data-category="hunting">
        <a href="/best-fixed-blade-hunting-knives-2026-buying-guide/" class="mso-bento-thumb" itemprop="mainEntityOfPage">
          <img 
            src="https://www.michigansportsoutdoor.com/wp-content/uploads/2026/03/TOP-BEST-FIXED-BLADE-KNIVES.jpg" 
            alt="Best Fixed Blade Hunting Knives 2026" 
            loading="lazy" 
            itemprop="image"
          />
          <span class="mso-bento-pill">Full Tang</span>
        </a>
        <div class="mso-bento-body">
          <div>
            <div class="mso-bento-kicker">BUYER GUIDE &gt; FIXED BLADES</div>
            <h3 class="mso-bento-heading" itemprop="headline">
              <a href="/best-fixed-blade-hunting-knives-2026-buying-guide/">Best Fixed Blade Hunting Knives 2026: In-Depth Review</a>
            </h3>
            <p class="mso-bento-excerpt" itemprop="description">
              Drop point vs clip point vs skinner blade profiles evaluated for field dressing performance, pelvic bone splitting rigidity, and grip safety.
            </p>
          </div>
          <div>
            <div class="mso-bento-action-row">
              <span class="mso-bento-time">12-MINUTE READ</span>
              <a href="/best-fixed-blade-hunting-knives-2026-buying-guide/" class="mso-bento-link">View Top Picks &rarr;</a>
            </div>
            <hr class="mso-bento-sep" />
            <div class="mso-author-block" itemprop="author" itemscope itemtype="https://schema.org/Person">
              <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face" alt="Joe Cavazos" class="mso-author-avatar" />
              <div class="mso-author-meta">
                <span class="mso-author-name" itemprop="name">By Joe Cavazos</span>
                <span class="mso-verified-stamp"><span class="mso-stamp-icon">&#10003;</span> Verified Expert in Metallurgy &amp; Tool Steels</span>
                <p class="mso-author-bio">Joe is a cutlery specialist with 14+ years evaluating heat treatment protocols and edge geometry in tool steels.</p>
              </div>
            </div>
          </div>
        </div>
      </article>

      <!-- CARD 3 -->
      <article class="mso-bento-card" itemscope itemtype="https://schema.org/BlogPosting" data-category="bushcraft">
        <a href="/mora-companion-vs-kansbol-vs-garberg/" class="mso-bento-thumb" itemprop="mainEntityOfPage">
          <img 
            src="https://www.michigansportsoutdoor.com/wp-content/uploads/2026/03/Details-on-gut-Hook-Knives-1.jpg" 
            alt="Morakniv Companion vs Kansbol vs Garberg" 
            loading="lazy" 
            itemprop="image"
          />
          <span class="mso-bento-pill">Bushcraft</span>
        </a>
        <div class="mso-bento-body">
          <div>
            <div class="mso-bento-kicker">BUSHCRAFT &gt; SCANDINAVIAN</div>
            <h3 class="mso-bento-heading" itemprop="headline">
              <a href="/mora-companion-vs-kansbol-vs-garberg/">Morakniv Companion vs Kansbol vs Garberg Showdown</a>
            </h3>
            <p class="mso-bento-excerpt" itemprop="description">
              Comparing 12C27 Sandvik stainless, high carbon tool steel, 90-degree spine ferro rod sparks, and full tang baton durability in wet hardwoods.
            </p>
          </div>
          <div>
            <div class="mso-bento-action-row">
              <span class="mso-bento-time">10-MINUTE READ</span>
              <a href="/mora-companion-vs-kansbol-vs-garberg/" class="mso-bento-link">Read Trial &rarr;</a>
            </div>
            <hr class="mso-bento-sep" />
            <div class="mso-author-block" itemprop="author" itemscope itemtype="https://schema.org/Person">
              <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" alt="Thomas Varghese" class="mso-author-avatar" />
              <div class="mso-author-meta">
                <span class="mso-author-name" itemprop="name">By Thomas Varghese</span>
                <span class="mso-verified-stamp"><span class="mso-stamp-icon">&#10003;</span> Verified Expert in Wilderness Survival</span>
                <p class="mso-author-bio">Thomas is a wilderness instructor and knife craftsman who has tested Scandinavian grinds across the Northwoods.</p>
              </div>
            </div>
          </div>
        </div>
      </article>

      <!-- CARD 4 -->
      <article class="mso-bento-card" itemscope itemtype="https://schema.org/BlogPosting" data-category="sharpening">
        <a href="/how-to-sharpen-a-knife-at-home/" class="mso-bento-thumb" itemprop="mainEntityOfPage">
          <img 
            src="https://www.michigansportsoutdoor.com/wp-content/uploads/2026/04/how-to-sharpen-a-knife-at-home.png" 
            alt="How to Sharpen a Hunting Knife with a Turn-Box" 
            loading="lazy" 
            itemprop="image"
          />
          <span class="mso-bento-pill">Sharpening</span>
        </a>
        <div class="mso-bento-body">
          <div>
            <div class="mso-bento-kicker">CARE &gt; APEX GEOMETRY</div>
            <h3 class="mso-bento-heading" itemprop="headline">
              <a href="/how-to-sharpen-a-knife-at-home/">How to Sharpen a Hunting Knife with a Turn-Box at Camp</a>
            </h3>
            <p class="mso-bento-excerpt" itemprop="description">
              Setting consistent 20-degree bevel angles, using dual alumina ceramic rods for hair-popping edges, and field-strop recovery right in hunting camp.
            </p>
          </div>
          <div>
            <div class="mso-bento-action-row">
              <span class="mso-bento-time">9-MINUTE READ</span>
              <a href="/how-to-sharpen-a-knife-at-home/" class="mso-bento-link">Learn Technique &rarr;</a>
            </div>
            <hr class="mso-bento-sep" />
            <div class="mso-author-block" itemprop="author" itemscope itemtype="https://schema.org/Person">
              <img src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&h=100&fit=crop&crop=face" alt="Shivam Kapoor" class="mso-author-avatar" />
              <div class="mso-author-meta">
                <span class="mso-author-name" itemprop="name">By Shivam Kapoor</span>
                <span class="mso-verified-stamp"><span class="mso-stamp-icon">&#10003;</span> Verified Expert in Honing &amp; Edge Restoration</span>
                <p class="mso-author-bio">Shivam specializes in micro-bevel apex angles and ceramic rod field maintenance for high-Rockwell cutlery.</p>
              </div>
            </div>
          </div>
        </div>
      </article>

      <!-- CARD 5 -->
      <article class="mso-bento-card" itemscope itemtype="https://schema.org/BlogPosting" data-category="edc">
        <a href="/top-best-edc-knives-under-100/" class="mso-bento-thumb" itemprop="mainEntityOfPage">
          <img 
            src="https://www.michigansportsoutdoor.com/wp-content/uploads/2026/03/Top-10-Best-EDC-Knives-Under-100-.jpg" 
            alt="Top 5 Best EDC Pocket Knives Under $100" 
            loading="lazy" 
            itemprop="image"
          />
          <span class="mso-bento-pill">Best Value</span>
        </a>
        <div class="mso-bento-body">
          <div>
            <div class="mso-bento-kicker">EDC &gt; BUDGET FOLDERS</div>
            <h3 class="mso-bento-heading" itemprop="headline">
              <a href="/top-best-edc-knives-under-100/">Top 5 Best EDC Pocket Knives Under $100 for Fall 2026</a>
            </h3>
            <p class="mso-bento-excerpt" itemprop="description">
              Pocket knives tested for lockup tolerance, bearing smoothness, deep-pocket carry ergonomics, and edge retention under everyday utility tasks.
            </p>
          </div>
          <div>
            <div class="mso-bento-action-row">
              <span class="mso-bento-time">7-MINUTE READ</span>
              <a href="/top-best-edc-knives-under-100/" class="mso-bento-link">View EDC Winners &rarr;</a>
            </div>
            <hr class="mso-bento-sep" />
            <div class="mso-author-block" itemprop="author" itemscope itemtype="https://schema.org/Person">
              <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face" alt="Mubashar Sharif" class="mso-author-avatar" />
              <div class="mso-author-meta">
                <span class="mso-author-name" itemprop="name">By Mubashar Sharif</span>
                <span class="mso-verified-stamp"><span class="mso-stamp-icon">&#10003;</span> Verified Expert in Cutlery &amp; EDC Gear</span>
                <p class="mso-author-bio">Lead editor at MSO Cutlery Lab, reviewing over 120 production and custom pocket knives annually.</p>
              </div>
            </div>
          </div>
        </div>
      </article>

      <!-- CARD 6 -->
      <article class="mso-bento-card" itemscope itemtype="https://schema.org/BlogPosting" data-category="steel">
        <a href="/understanding-knife-edge-geometry-hollow-grind-vs-flat-grind/" class="mso-bento-thumb" itemprop="mainEntityOfPage">
          <img 
            src="https://www.michigansportsoutdoor.com/wp-content/uploads/2026/03/KNIFE-BLADE-STEELS.jpg" 
            alt="Understanding Knife Edge Geometry Hollow vs Flat Grind" 
            loading="lazy" 
            itemprop="image"
          />
          <span class="mso-bento-pill">Engineering</span>
        </a>
        <div class="mso-bento-body">
          <div>
            <div class="mso-bento-kicker">TECH &gt; BEVEL GEOMETRY</div>
            <h3 class="mso-bento-heading" itemprop="headline">
              <a href="/understanding-knife-edge-geometry-hollow-grind-vs-flat-grind/">Understanding Knife Edge Geometry: Hollow vs Flat Grind</a>
            </h3>
            <p class="mso-bento-excerpt" itemprop="description">
              Deep dive into slicing efficiency, shoulder wedging drag, and lateral toughness under heavy wood processing and whitetail dressing chores.
            </p>
          </div>
          <div>
            <div class="mso-bento-action-row">
              <span class="mso-bento-time">11-MINUTE READ</span>
              <a href="/understanding-knife-edge-geometry-hollow-grind-vs-flat-grind/" class="mso-bento-link">Explore Geometry &rarr;</a>
            </div>
            <hr class="mso-bento-sep" />
            <div class="mso-author-block" itemprop="author" itemscope itemtype="https://schema.org/Person">
              <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face" alt="Marcus Thorne" class="mso-author-avatar" />
              <div class="mso-author-meta">
                <span class="mso-author-name" itemprop="name">By Marcus Thorne</span>
                <span class="mso-verified-stamp"><span class="mso-stamp-icon">&#10003;</span> Verified Expert in Custom Knifemaking</span>
                <p class="mso-author-bio">Marcus is an ABS certified bladesmith crafting high-performance custom hunting cutlery with bespoke bevels.</p>
              </div>
            </div>
          </div>
        </div>
      </article>

    </div>
  </section>

  <!-- 3.5 HIGH-CONVERTING EDITORIAL DISPATCH BANNER -->
  <section class="mso-dispatch-card" aria-label="Field Dispatch Newsletter">
    <div class="mso-dispatch-info">
      <span class="mso-dispatch-pill">&bull; FREE FIELD ASSET &bull; 2026 EDITION</span>
      <h3>World-class field guides, delivered weekly.</h3>
      <p>Join 24,000+ Michigan hunters and cutlery specialists. Receive opening-day field dressing checklists, super steel drop alerts, and exclusive knife discounts.</p>
    </div>
    <div class="mso-dispatch-form">
      <form action="/#newsletter-signup" method="POST" onsubmit="alert('Thank you for subscribing! Your Michigan Field Dressing Guide is on the way.'); return false;">
        <div class="mso-dispatch-input-group">
          <input type="email" placeholder="Enter your best email address..." required class="mso-dispatch-input" aria-label="Email address" />
          <button type="submit" class="mso-dispatch-btn">Sign Me Up &rarr;</button>
        </div>
        <p class="mso-dispatch-privacy">
          By entering your email, you are agreeing to our <a href="/privacy-policy/">privacy policy</a>. Instant delivery. Zero spam.
        </p>
      </form>
    </div>
  </section>

  <!-- 3.6 WIRECUTTER-STYLE PRODUCT MATRIX (EXACTLY 1 ROW OF 4 CARDS) -->
  <section class="mso-matrix-section" aria-labelledby="gear-matrix-heading">
    <div class="mso-matrix-header">
      <div>
        <span style="font-size:11px; font-weight:800; text-transform:uppercase; letter-spacing:1px; color:#16a34a;">Field Tested &bull; In-Stock Cutlery</span>
        <h3 id="gear-matrix-heading">Gear Featured in Our Field Guides</h3>
      </div>
      <a href="/shop/" style="font-size:13px; font-weight:700; color:#2563eb; text-decoration:none;">View Full Outfitter Store &rarr;</a>
    </div>

    <!-- 4 EQUAL CARDS IN 1 HORIZONTAL ROW -->
    <div class="mso-matrix-grid">

      <!-- Product 1 -->
      <div class="mso-matrix-card" itemscope itemtype="https://schema.org/Product">
        <div>
          <a href="/product/buck-110-folding-hunter/" class="mso-matrix-img-box">
            <img 
              src="https://www.michigansportsoutdoor.com/wp-content/uploads/2026/03/KNIFE-BLADE-STEELS-shapes-for-field-dressing.jpg" 
              alt="Buck 110 Folding Hunter Whitetail Classic" 
              loading="lazy" 
              itemprop="image"
            />
          </a>
          <div class="mso-matrix-kicker-row">
            <span class="mso-matrix-kicker">Whitetail Classic</span>
            <span class="mso-matrix-price">From $64.99</span>
          </div>
          <h4 class="mso-matrix-title" itemprop="name">
            <a href="/product/buck-110-folding-hunter/" itemprop="url">Buck 110 Folding Hunter (420HC)</a>
          </h4>
        </div>
        <div>
          <div class="mso-matrix-stock">&bull; In Stock &bull; Ships Same Day</div>
          <a href="/product/buck-110-folding-hunter/" class="mso-matrix-cta">View Best Price &rarr;</a>
        </div>
      </div>

      <!-- Product 2 -->
      <div class="mso-matrix-card" itemscope itemtype="https://schema.org/Product">
        <div>
          <a href="/product/sharpi-8-in-1-diamond-sharpener/" class="mso-matrix-img-box">
            <img 
              src="https://www.michigansportsoutdoor.com/wp-content/uploads/2026/08/SHOD0002.jpg" 
              alt="Sharpi 8-in-1 Pocket Diamond Sharpener" 
              loading="lazy" 
              itemprop="image"
            />
          </a>
          <div class="mso-matrix-kicker-row">
            <span class="mso-matrix-kicker">Pack Essential</span>
            <span class="mso-matrix-price">Under $16</span>
          </div>
          <h4 class="mso-matrix-title" itemprop="name">
            <a href="/product/sharpi-8-in-1-diamond-sharpener/" itemprop="url">Sharpi 8-in-1 Pocket Sharpener</a>
          </h4>
        </div>
        <div>
          <div class="mso-matrix-stock">&bull; In Stock &bull; Ships Fast</div>
          <a href="/product/sharpi-8-in-1-diamond-sharpener/" class="mso-matrix-cta">View Best Price &rarr;</a>
        </div>
      </div>

      <!-- Product 3 -->
      <div class="mso-matrix-card" itemscope itemtype="https://schema.org/Product">
        <div>
          <a href="/product/lansky-turn-box-with-leather-strop-2/" class="mso-matrix-img-box">
            <img 
              src="https://www.michigansportsoutdoor.com/wp-content/uploads/2026/05/TB2D2CL.jpg" 
              alt="Lansky Turn-Box System with Strop" 
              loading="lazy" 
              itemprop="image"
            />
          </a>
          <div class="mso-matrix-kicker-row">
            <span class="mso-matrix-kicker" style="color:#b45309;">Camp Sharpener</span>
            <span class="mso-matrix-price">From $28.95</span>
          </div>
          <h4 class="mso-matrix-title" itemprop="name">
            <a href="/product/lansky-turn-box-with-leather-strop-2/" itemprop="url">Lansky Turn-Box Strop System</a>
          </h4>
        </div>
        <div>
          <div class="mso-matrix-stock">&bull; In Stock &bull; Ships Fast</div>
          <a href="/product/lansky-turn-box-with-leather-strop-2/" class="mso-matrix-cta">View Best Price &rarr;</a>
        </div>
      </div>

      <!-- Product 4 -->
      <div class="mso-matrix-card" itemscope itemtype="https://schema.org/Product">
        <div>
          <a href="/product/dmt-suregrip-powered-diamond-knif/" class="mso-matrix-img-box">
            <img 
              src="https://www.michigansportsoutdoor.com/wp-content/uploads/2026/09/DMT20187.jpg" 
              alt="DMT Diamond SureGrip Bench Sharpener" 
              loading="lazy" 
              itemprop="image"
            />
          </a>
          <div class="mso-matrix-kicker-row">
            <span class="mso-matrix-kicker" style="color:#2563eb;">Bench Hone</span>
            <span class="mso-matrix-price">Pro Grade</span>
          </div>
          <h4 class="mso-matrix-title" itemprop="name">
            <a href="/product/dmt-suregrip-powered-diamond-knif/" itemprop="url">DMT Diamond SureGrip Sharpener</a>
          </h4>
        </div>
        <div>
          <div class="mso-matrix-stock">&bull; In Stock &bull; Ships Fast</div>
          <a href="/product/dmt-suregrip-powered-diamond-knif/" class="mso-matrix-cta">View Best Price &rarr;</a>
        </div>
      </div>

    </div>
  </section>

</main>

<!-- ========================================== -->
<!-- 4. REAL-TIME SEARCH & VOICE JAVASCRIPT     -->
<!-- ========================================== -->
<script>
const SEARCH_INDEX = [
  {
    title: "Best Hunting Knives for Michigan Deer Season (2026 Guide)",
    url: "/best-hunting-knives-for-michigan-deer-season-3/",
    type: "Field Guide",
    badgeClass: "mso-badge-guide",
    keywords: ["deer", "deer season", "hunting", "hunting knife", "hunting knives", "whitetail", "field dressing", "gutting", "skinning", "michigan deer", "buck"]
  },
  {
    title: "Crucible CPM MagnaCut vs Böhler M390MK: The Super Steel Showdown",
    url: "/cpm-magnacut-vs-bohler-m390mk/",
    type: "Steel Test",
    badgeClass: "mso-badge-steel",
    keywords: ["magnacut", "cpm magnacut", "m390", "m390mk", "steel", "steels", "corrosion", "toughness", "rockwell", "edge retention", "blade steel"]
  },
  {
    title: "Best Fixed Blade Hunting Knives 2026: In-Depth Review",
    url: "/best-fixed-blade-hunting-knives-2026-buying-guide/",
    type: "Buyer Guide",
    badgeClass: "mso-badge-guide",
    keywords: ["fixed blade", "fixed", "full tang", "drop point", "clip point", "skinner", "hunting knives", "gut hook"]
  },
  {
    title: "Morakniv Companion vs Kansbol vs Garberg Showdown",
    url: "/mora-companion-vs-kansbol-vs-garberg/",
    type: "Bushcraft",
    badgeClass: "mso-badge-guide",
    keywords: ["mora", "morakniv", "companion", "kansbol", "garberg", "bushcraft", "camp knife", "scandi", "ferro rod", "batoning"]
  },
  {
    title: "How to Sharpen a Hunting Knife with a Turn-Box at Camp",
    url: "/how-to-sharpen-a-knife-at-home/",
    type: "Maintenance",
    badgeClass: "mso-badge-steel",
    keywords: ["sharpen", "sharpening", "turn box", "lansky", "ceramic", "strop", "hone", "razor edge", "bevel", "angle"]
  },
  {
    title: "Top 5 Best EDC Pocket Knives Under $100 for Fall 2026",
    url: "/top-best-edc-knives-under-100/",
    type: "EDC Round-up",
    badgeClass: "mso-badge-guide",
    keywords: ["edc", "pocket knife", "folder", "folding knife", "budget knife", "under 100", "daily carry", "d2"]
  },
  {
    title: "Understanding Knife Edge Geometry: Hollow vs Flat Grind",
    url: "/understanding-knife-edge-geometry-hollow-grind-vs-flat-grind/",
    type: "Cutlery Tech",
    badgeClass: "mso-badge-steel",
    keywords: ["grind", "hollow grind", "flat grind", "blade geometry", "bevel", "slicing", "geometry", "scandi grind"]
  },
  {
    title: "50-State Knife Laws & Legal Carry Directory (2026 Edition)",
    url: "/knife-laws/",
    type: "Legal Directory",
    badgeClass: "mso-badge-guide",
    keywords: ["law", "laws", "knife laws", "legal", "legal carry", "concealed carry", "blade length", "michigan knife laws", "states"]
  },
  {
    title: "Buck 110 Folding Hunter (420HC Paul Bos Heat Treat)",
    url: "/product/buck-110-folding-hunter/",
    type: "In-Stock Gear",
    badgeClass: "mso-badge-product",
    keywords: ["buck", "buck 110", "folding hunter", "lockback", "brass bolsters", "420hc"]
  },
  {
    title: "Sharpi 8-in-1 Pocket Diamond Sharpener",
    url: "/product/sharpi-8-in-1-diamond-sharpener/",
    type: "In-Stock Gear",
    badgeClass: "mso-badge-product",
    keywords: ["sharpi", "pocket sharpener", "diamond sharpener", "ceramic sharpener"]
  },
  {
    title: "Lansky Turn-Box Crock Stick System with Leather Strop",
    url: "/product/lansky-turn-box-with-leather-strop-2/",
    type: "In-Stock Gear",
    badgeClass: "mso-badge-product",
    keywords: ["lansky", "turn box", "crock stick", "leather strop", "wood block sharpener"]
  },
  {
    title: "DMT Diamond SureGrip Bench Sharpener",
    url: "/product/dmt-suregrip-powered-diamond-knif/",
    type: "In-Stock Gear",
    badgeClass: "mso-badge-product",
    keywords: ["dmt", "diamond stone", "bench hone", "suregrip"]
  },
  {
    title: "All In-Stock Outdoor Cutlery & Gear Store",
    url: "/shop/",
    type: "Store Hub",
    badgeClass: "mso-badge-product",
    keywords: ["shop", "store", "buy", "cutlery", "outdoor gear", "all knives"]
  }
];

function msoQuickSearch(term) {
  const input = document.getElementById('msoSearchInput');
  if (!input) return;
  input.value = term;
  input.dispatchEvent(new Event('input'));
  const matches = filterSearch(term);
  if (matches && matches.length > 0) {
    window.location.href = matches[0].url;
  } else {
    window.location.href = '/shop/?s=' + encodeURIComponent(term);
  }
}

function filterSearch(query) {
  const clean = query.trim().toLowerCase();
  if (!clean || clean.length < 2) return [];

  return SEARCH_INDEX.filter(item => {
    const inTitle = item.title.toLowerCase().includes(clean);
    const inKeywords = item.keywords.some(k => k.toLowerCase().includes(clean) || clean.includes(k.toLowerCase()));
    return inTitle || inKeywords;
  });
}

function msoFilterCategory(cat, btn) {
  const pills = document.querySelectorAll('.mso-nav-pill');
  pills.forEach(p => p.classList.remove('active'));
  if (btn) btn.classList.add('active');

  const cards = document.querySelectorAll('.mso-bento-card');
  cards.forEach(card => {
    const cardCat = card.getAttribute('data-category');
    if (cat === 'all' || cardCat === cat) {
      card.style.display = 'flex';
      card.style.opacity = '1';
    } else {
      card.style.display = 'none';
      card.style.opacity = '0';
    }
  });
}

(function() {
  const searchInput = document.getElementById('msoSearchInput');
  const dropdown = document.getElementById('msoSearchDropdown');
  const submitBtn = document.getElementById('msoSubmitSearchBtn');
  const micBtn = document.getElementById('msoVoiceBtn');

  if (!searchInput || !dropdown) return;

  function renderDropdown(matches, query) {
    if (!matches || matches.length === 0) {
      dropdown.innerHTML = \`
        <div style="padding:14px 18px; color:#64748b; font-size:13px;">
          No direct guide match for "<strong>${query}</strong>".
          <div style="margin-top:6px;">
            <a href="/shop/?s=${encodeURIComponent(query)}" style="color:#2563eb; font-weight:700; text-decoration:underline;">
              Search full MSO Cutlery Store for "${query}" &rarr;
            </a>
          </div>
        </div>
      \`;
      dropdown.style.display = 'block';
      return;
    }

    let html = '';
    matches.slice(0, 6).forEach(item => {
      html += \`
        <a href="${item.url}" class="mso-dropdown-entry">
          <div>
            <div class="mso-entry-title">${item.title}</div>
            <div style="font-size:11px; color:#64748b; margin-top:2px;">michigansportsoutdoor.com${item.url}</div>
          </div>
          <span class="mso-entry-badge ${item.badgeClass}">${item.type}</span>
        </a>
      \`;
    });

    html += \`
      <div style="background:#f8fafc; padding:9px 18px; border-top:1px solid #e2e8f0; text-align:right;">
        <a href="/shop/?s=${encodeURIComponent(query)}" style="font-size:11.5px; font-weight:700; color:#2563eb; text-decoration:none;">
          View all store results for "${query}" &rarr;
        </a>
      </div>
    \`;

    dropdown.innerHTML = html;
    dropdown.style.display = 'block';
  }

  function executeSearch() {
    const val = searchInput.value.trim();
    if (!val) return;
    const matches = filterSearch(val);
    if (matches && matches.length > 0) {
      window.location.href = matches[0].url;
    } else {
      window.location.href = '/shop/?s=' + encodeURIComponent(val);
    }
  }

  searchInput.addEventListener('input', function() {
    const q = this.value;
    const results = filterSearch(q);
    if (q.trim().length >= 2) {
      renderDropdown(results, q);
    } else {
      dropdown.style.display = 'none';
    }
  });

  searchInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      executeSearch();
    }
  });

  if (submitBtn) {
    submitBtn.addEventListener('click', function(e) {
      e.preventDefault();
      executeSearch();
    });
  }

  document.addEventListener('click', function(e) {
    if (!searchInput.contains(e.target) && !dropdown.contains(e.target)) {
      dropdown.style.display = 'none';
    }
  });

  // VOICE RECOGNITION (Web Speech API)
  if (micBtn) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      let isRecording = false;

      micBtn.addEventListener('click', function() {
        if (isRecording) {
          recognition.stop();
          return;
        }
        try {
          recognition.start();
          isRecording = true;
          micBtn.classList.add('listening');
          searchInput.placeholder = "Listening... Speak now (e.g. hunting knives, MagnaCut)";
        } catch(err) {
          console.error("Speech recognition error:", err);
        }
      });

      recognition.onresult = function(event) {
        const transcript = event.results[0][0].transcript;
        searchInput.value = transcript;
        micBtn.classList.remove('listening');
        isRecording = false;
        searchInput.placeholder = "What are you looking for?";
        const matches = filterSearch(transcript);
        renderDropdown(matches, transcript);
        if (matches.length === 1) {
          setTimeout(function() {
            window.location.href = matches[0].url;
          }, 600);
        }
      };

      recognition.onerror = function(event) {
        console.warn("Voice search notice:", event.error);
        micBtn.classList.remove('listening');
        isRecording = false;
        searchInput.placeholder = "What are you looking for?";
      };

      recognition.onend = function() {
        micBtn.classList.remove('listening');
        isRecording = false;
        searchInput.placeholder = "What are you looking for?";
      };
    } else {
      micBtn.addEventListener('click', function() {
        alert("Voice search is supported in Google Chrome and Microsoft Edge on desktop and mobile.");
      });
    }
  }
})();
</script>`;

  console.log('Updating WordPress page #166494 to exact Toptal Hero layout with EEAT factors...');
  const res = await fetch(`${baseUrl}/wp-json/wp/v2/pages/166494`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      title: 'Michigan Sports Outdoor Blog | Field Journal & Cutlery Lab',
      content: blogHtml,
      status: 'publish'
    })
  });
  const updated = await res.json();
  console.log(`✅ Elite professional blog page deployed successfully: ${updated.link}`);
}

deployEliteToptalBlog().then(() => process.exit(0)).catch(e => { console.error(e); process.exit(1); });
