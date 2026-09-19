async function deployCroToptalBlog() {
  const baseUrl = 'https://www.michigansportsoutdoor.com';
  const username = 'apiuser';
  const appPassword = process.env.MSO_WP_PASS;
  if (!appPassword) throw new Error("Set MSO_WP_PASS to the MSO WordPress application password. Never hardcode it: this repository is public.");
  const auth = Buffer.from(`${username}:${appPassword}`).toString('base64');
  const headers = {
    Authorization: `Basic ${auth}`,
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
    'Content-Type': 'application/json'
  };

  const blogHtml = `
<!-- ========================================== -->
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
      "name": "Field Guides, Steel Benchmarks & Whitetail Cutlery Reviews | MSO Blog",
      "description": "Authoritative cutlery reviews, knife blade steel comparisons, Michigan whitetail deer field dressing guides, and backcountry sharpening tutorials.",
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
            "name": "Blog & Field Journal",
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
<!-- 2. STYLES: CRO-OPTIMIZED, COMPACT COVERS   -->
<!-- ========================================== -->
<style>
  /* 2.1 CSS RESET & PURE WHITE ENFORCEMENT */
  html, body, #page, #content, .site-content, .entry-content, .content-area, .site-main, .post-content, .mso-blog-portal {
    background: #ffffff !important;
    background-color: #ffffff !important;
  }

  .page-header, .header-page-title, .page-title-wrap, .entry-header, .site-content > .page-title {
    display: none !important;
    background: #ffffff !important;
  }

  /* 2.2 MAIN WRAPPER */
  .mso-blog-portal {
    max-width: 1240px;
    margin: 0 auto;
    padding: 10px 18px 70px 18px;
    font-family: -apple-system, BlinkMacSystemFont, "Inter", "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    color: #0f172a;
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
  }

  /* 2.3 HERO MASTHEAD (HIGH CRO DENSITY) */
  .mso-masthead {
    background: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 12px;
    padding: 36px 32px 28px 32px;
    margin-bottom: 28px;
    box-shadow: 0 2px 10px rgba(15, 23, 42, 0.03);
  }
  .mso-masthead-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 10px;
    margin-bottom: 12px;
  }
  .mso-masthead-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: #f0fdf4;
    border: 1px solid #bbf7d0;
    color: #15803d;
    font-size: 11px;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 1px;
    padding: 4px 10px;
    border-radius: 20px;
  }
  .mso-masthead-badge::before {
    content: "";
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #16a34a;
  }
  .mso-season-alert {
    background: #fef3c7;
    border: 1px solid #fde68a;
    color: #92400e;
    font-size: 11.5px;
    font-weight: 700;
    padding: 4px 12px;
    border-radius: 6px;
    display: inline-flex;
    align-items: center;
    gap: 6px;
  }
  .mso-masthead h1 {
    font-size: clamp(28px, 4vw, 38px);
    font-weight: 900;
    color: #0f172a !important;
    line-height: 1.15;
    letter-spacing: -0.03em;
    margin: 0 0 10px 0;
  }
  .mso-masthead-lead {
    font-size: clamp(14px, 1.6vw, 15.5px);
    line-height: 1.55;
    color: #475569;
    max-width: 820px;
    margin: 0 0 20px 0;
  }

  /* 2.4 REAL-TIME & VOICE SEARCH BAR + CRO QUICK TAGS */
  .mso-search-wrap {
    position: relative;
    width: 100%;
    z-index: 50;
  }
  .mso-search-box {
    display: flex;
    align-items: center;
    background: #ffffff;
    border: 2px solid #cbd5e1;
    border-radius: 8px;
    transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
    box-shadow: 0 2px 6px rgba(15, 23, 42, 0.02);
  }
  .mso-search-box:focus-within {
    border-color: #0284c7;
    box-shadow: 0 0 0 4px rgba(2, 132, 199, 0.12);
  }
  .mso-search-ico {
    padding-left: 16px;
    color: #64748b;
    font-size: 17px;
    pointer-events: none;
  }
  .mso-search-field {
    flex: 1 1 auto;
    background: transparent;
    border: none;
    padding: 14px 12px;
    font-size: 15px;
    color: #0f172a !important;
    outline: none;
    box-sizing: border-box;
    width: 100%;
  }
  .mso-search-field::placeholder {
    color: #94a3b8;
  }
  .mso-search-actions {
    display: flex;
    align-items: center;
    gap: 8px;
    padding-right: 10px;
  }
  .mso-voice-mic {
    background: #f1f5f9;
    border: 1px solid #cbd5e1;
    color: #0f172a;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 15px;
    transition: all 0.15s ease;
  }
  .mso-voice-mic:hover {
    background: #e2e8f0;
    border-color: #94a3b8;
  }
  .mso-voice-mic.listening {
    background: #ef4444 !important;
    border-color: #f87171 !important;
    color: #ffffff !important;
    animation: msoMicPulse 1.2s infinite;
  }
  @keyframes msoMicPulse {
    0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.6); }
    70% { transform: scale(1.1); box-shadow: 0 0 0 10px rgba(239, 68, 68, 0); }
    100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(239, 68, 68, 0); }
  }
  .mso-search-submit {
    background: #16a34a;
    border: none;
    color: #ffffff !important;
    font-size: 13px;
    font-weight: 700;
    padding: 8px 16px;
    border-radius: 6px;
    cursor: pointer;
    transition: background 0.15s ease;
    white-space: nowrap;
  }
  .mso-search-submit:hover {
    background: #15803d;
  }

  /* CRO QUICK SEARCH CHIPS */
  .mso-quick-chips {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 10px;
    font-size: 12px;
    color: #64748b;
  }
  .mso-quick-chip {
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    color: #334155;
    padding: 3px 10px;
    border-radius: 12px;
    text-decoration: none;
    cursor: pointer;
    font-weight: 600;
    transition: all 0.15s ease;
  }
  .mso-quick-chip:hover {
    background: #e0f2fe;
    border-color: #bae6fd;
    color: #0369a1;
  }

  /* AUTOCOMPLETE DROPDOWN */
  .mso-autocomplete {
    display: none;
    position: absolute;
    top: calc(100% + 6px);
    left: 0;
    right: 0;
    background: #ffffff;
    border: 1px solid #cbd5e1;
    border-radius: 8px;
    box-shadow: 0 16px 36px rgba(15, 23, 42, 0.12);
    max-height: 360px;
    overflow-y: auto;
    z-index: 1000;
  }
  .mso-drop-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 11px 16px;
    border-bottom: 1px solid #f1f5f9;
    color: #0f172a;
    text-decoration: none !important;
    transition: background 0.15s ease;
  }
  .mso-drop-item:hover {
    background: #f8fafc;
  }
  .mso-drop-title {
    font-size: 13.5px;
    font-weight: 700;
    color: #0f172a;
  }
  .mso-drop-badge {
    font-size: 10.5px;
    font-weight: 800;
    text-transform: uppercase;
    padding: 3px 8px;
    border-radius: 4px;
    letter-spacing: 0.5px;
  }
  .mso-bg-guide { background: #e0f2fe; color: #0369a1; }
  .mso-bg-steel { background: #dcfce7; color: #15803d; }
  .mso-bg-prod { background: #fef3c7; color: #b45309; }

  /* 2.5 CATEGORY PILLS BAR */
  .mso-pills-bar {
    margin-bottom: 28px;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
    -ms-overflow-style: none;
    padding: 2px 0;
  }
  .mso-pills-bar::-webkit-scrollbar {
    display: none;
  }
  .mso-pills-inner {
    display: flex;
    gap: 10px;
    align-items: center;
    min-width: max-content;
  }
  .mso-pill {
    background: #f8fafc;
    color: #334155;
    font-size: 12.5px;
    font-weight: 700;
    padding: 7px 16px;
    border-radius: 20px;
    text-decoration: none;
    white-space: nowrap;
    border: 1px solid #e2e8f0;
    transition: all 0.15s ease;
  }
  .mso-pill:hover {
    background: #e2e8f0;
    color: #0f172a;
  }
  .mso-pill.active {
    background: #0f172a;
    color: #ffffff !important;
    border-color: #0f172a;
  }

  /* 2.6 COMPACT CRO HERO SPOTLIGHT CARD */
  .mso-spotlight-card {
    background: #ffffff !important;
    border: 1px solid #e2e8f0;
    border-radius: 12px;
    overflow: hidden;
    margin-bottom: 40px;
    display: grid;
    grid-template-columns: 1fr 1.25fr;
    box-shadow: 0 2px 12px rgba(15, 23, 42, 0.04);
    transition: box-shadow 0.25s ease, transform 0.25s ease;
  }
  .mso-spotlight-card:hover {
    box-shadow: 0 10px 24px rgba(15, 23, 42, 0.07);
  }
  /* REDUCED COVER SIZE FOR COMPACT CRO DENSITY */
  .mso-spotlight-visual {
    background: #f1f5f9;
    position: relative;
    overflow: hidden;
    height: 220px; /* Reduced from 330px */
    width: 100%;
  }
  .mso-spotlight-visual img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.35s ease;
  }
  .mso-spotlight-card:hover .mso-spotlight-visual img {
    transform: scale(1.03);
  }
  .mso-spotlight-info {
    padding: 24px 28px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-sizing: border-box;
    background: #ffffff;
  }
  .mso-spotlight-tag-row {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 8px;
  }
  .mso-spotlight-kicker {
    background: #e0f2fe;
    color: #0369a1;
    font-size: 10px;
    font-weight: 800;
    text-transform: uppercase;
    padding: 3px 8px;
    border-radius: 4px;
    letter-spacing: 0.5px;
  }
  .mso-spotlight-stock {
    font-size: 10.5px;
    font-weight: 700;
    color: #16a34a;
  }
  .mso-spotlight-info h2 {
    font-size: clamp(20px, 2.2vw, 24px);
    font-weight: 900;
    line-height: 1.25;
    margin: 0 0 8px 0;
  }
  .mso-spotlight-info h2 a {
    color: #0f172a !important;
    text-decoration: none;
  }
  .mso-spotlight-info h2 a:hover {
    color: #0284c7 !important;
  }
  .mso-spotlight-info p {
    font-size: 13.5px;
    color: #475569;
    line-height: 1.5;
    margin: 0 0 16px 0;
  }
  .mso-spotlight-foot {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 12px;
    border-top: 1px solid #f1f5f9;
    padding-top: 14px;
  }
  .mso-btn-read {
    background: #16a34a;
    color: #ffffff !important;
    font-size: 12.5px;
    font-weight: 700;
    padding: 8px 18px;
    border-radius: 6px;
    text-decoration: none;
    transition: background 0.15s ease;
    display: inline-flex;
    align-items: center;
    gap: 5px;
  }
  .mso-btn-read:hover {
    background: #15803d;
  }

  /* 2.7 3-COLUMN EDITORIAL BENTO GRID (CRO CARDS WITH COMPACT COVERS) */
  .mso-section-bar {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 20px;
    border-bottom: 2px solid #e2e8f0;
    padding-bottom: 10px;
  }
  .mso-section-bar h2 {
    font-size: clamp(19px, 2.5vw, 23px);
    font-weight: 900;
    color: #0f172a;
    margin: 0;
    letter-spacing: -0.02em;
  }
  .mso-section-sub {
    font-size: 11.5px;
    font-weight: 700;
    color: #16a34a;
    text-transform: uppercase;
    letter-spacing: 0.8px;
  }

  .mso-articles-grid {
    display: grid !important;
    grid-template-columns: repeat(3, 1fr) !important;
    gap: 24px !important;
    align-items: stretch !important;
    margin-bottom: 48px !important;
  }

  /* CRO ARTICLE CARD (EQUAL HEIGHT, COMPACT 135PX COVER) */
  .mso-post-card {
    background: #ffffff !important;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    overflow: hidden;
    display: flex !important;
    flex-direction: column !important;
    justify-content: space-between !important;
    height: 100% !important;
    box-shadow: 0 1px 4px rgba(15, 23, 42, 0.03);
    transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.2s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.2s ease;
  }
  .mso-post-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 22px rgba(15, 23, 42, 0.08);
    border-color: #cbd5e1;
  }

  /* COMPACT COVER IMAGE: 135PX HEIGHT INSTEAD OF 210PX */
  .mso-card-thumb {
    display: block;
    height: 135px; /* Reduced from 210px for high CRO visibility */
    width: 100%;
    overflow: hidden;
    background: #f1f5f9;
    position: relative;
    flex-shrink: 0;
  }
  .mso-card-thumb img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.3s ease;
  }
  .mso-post-card:hover .mso-card-thumb img {
    transform: scale(1.04);
  }
  .mso-card-content {
    padding: 18px 18px 16px 18px;
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background: #ffffff;
  }
  .mso-card-meta-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 6px;
  }
  .mso-card-kicker {
    font-size: 10.5px;
    font-weight: 800;
    color: #0284c7;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  .mso-card-gear-signal {
    font-size: 10px;
    font-weight: 700;
    color: #15803d;
    background: #f0fdf4;
    padding: 2px 6px;
    border-radius: 3px;
  }
  .mso-card-heading {
    font-size: 16.5px;
    font-weight: 800;
    line-height: 1.35;
    color: #0f172a;
    margin: 0 0 8px 0;
    letter-spacing: -0.01em;
  }
  .mso-card-heading a {
    color: #0f172a !important;
    text-decoration: none;
  }
  .mso-card-heading a:hover {
    color: #0284c7 !important;
  }
  .mso-card-snippet {
    font-size: 13px;
    color: #475569;
    line-height: 1.5;
    margin: 0 0 14px 0;
    flex-grow: 1;
    min-height: 58px;
  }
  .mso-card-cta-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 12px;
  }
  .mso-card-time {
    font-size: 10.5px;
    font-weight: 700;
    color: #64748b;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  /* CRO DIRECT ACTION LINK */
  .mso-card-action-link {
    font-size: 11.5px;
    font-weight: 800;
    color: #0284c7;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    gap: 3px;
  }
  .mso-card-action-link:hover {
    color: #0369a1;
    text-decoration: underline;
  }
  .mso-card-sep {
    border: 0;
    height: 1px;
    background: #f1f5f9;
    margin: 0 0 12px 0;
  }
  .mso-author-row {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .mso-author-pic {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    object-fit: cover;
    flex-shrink: 0;
    border: 1px solid #e2e8f0;
  }
  .mso-author-details {
    font-size: 11.5px;
    line-height: 1.35;
  }
  .mso-author-title {
    font-weight: 700;
    color: #0f172a;
    display: block;
  }
  .mso-author-verified {
    color: #15803d;
    font-weight: 700;
    font-size: 10.5px;
    display: flex;
    align-items: center;
    gap: 3px;
  }
  .mso-check-pill {
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

  /* 2.8 HIGH-CONVERTING LEAD MAGNET NEWSLETTER */
  .mso-newsletter-card {
    background: #f8fafc !important;
    border: 2px solid #e2e8f0;
    border-radius: 12px;
    padding: 34px 32px;
    margin-bottom: 48px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 22px;
    box-shadow: 0 2px 10px rgba(15, 23, 42, 0.02);
  }
  .mso-newsletter-badge {
    background: #dcfce7;
    color: #15803d;
    font-size: 10.5px;
    font-weight: 800;
    text-transform: uppercase;
    padding: 3px 8px;
    border-radius: 4px;
    display: inline-block;
    margin-bottom: 6px;
  }
  .mso-newsletter-text h3 {
    font-size: clamp(20px, 2.6vw, 24px);
    font-weight: 900;
    color: #0f172a !important;
    margin: 0 0 6px 0;
    letter-spacing: -0.02em;
  }
  .mso-newsletter-text p {
    font-size: 13.5px;
    color: #64748b;
    margin: 0;
    max-width: 480px;
    line-height: 1.45;
  }
  .mso-newsletter-form {
    flex: 1 1 420px;
    max-width: 520px;
  }
  .mso-input-group {
    display: flex;
    width: 100%;
  }
  .mso-newsletter-input {
    flex: 1 1 auto;
    padding: 13px 16px;
    font-size: 14.5px;
    border: 1px solid #cbd5e1;
    border-right: none;
    border-radius: 6px 0 0 6px;
    background: #ffffff;
    color: #0f172a;
    outline: none;
  }
  .mso-newsletter-input:focus {
    border-color: #0284c7;
  }
  .mso-newsletter-btn {
    background: #00c774;
    color: #ffffff !important;
    font-weight: 800;
    font-size: 14px;
    padding: 13px 22px;
    border: none;
    border-radius: 0 6px 6px 0;
    cursor: pointer;
    white-space: nowrap;
    transition: background 0.15s ease;
  }
  .mso-newsletter-btn:hover {
    background: #00b368;
  }
  .mso-form-legal {
    font-size: 11px;
    color: #64748b;
    margin: 6px 0 0 0;
  }
  .mso-form-legal a {
    color: #0284c7;
    text-decoration: underline;
  }

  /* 2.9 GEAR FEATURED SECTION (HIGH-CRO E-COMMERCE CONVERSION ROW) */
  .mso-gear-hub {
    background: #ffffff !important;
    border: 1px solid #e2e8f0 !important;
    border-radius: 12px !important;
    padding: 32px 28px !important;
    box-shadow: 0 2px 8px rgba(15, 23, 42, 0.02);
  }
  .mso-gear-grid {
    display: grid !important;
    grid-template-columns: repeat(4, 1fr) !important;
    gap: 18px !important;
    align-items: stretch !important;
  }
  .mso-gear-card {
    background: #ffffff !important;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    padding: 16px;
    display: flex !important;
    flex-direction: column !important;
    justify-content: space-between !important;
    height: 100% !important;
    transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
    position: relative;
  }
  .mso-gear-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 18px rgba(15, 23, 42, 0.06);
    border-color: #cbd5e1;
  }
  .mso-gear-image-box {
    height: 110px; /* Compact image height */
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 12px;
    background: #ffffff;
  }
  .mso-gear-image-box img {
    max-height: 105px;
    max-width: 100%;
    object-fit: contain;
  }
  .mso-gear-kicker-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 4px;
  }
  .mso-gear-kicker {
    font-size: 9.5px;
    font-weight: 800;
    text-transform: uppercase;
    color: #16a34a;
  }
  .mso-gear-price {
    font-size: 12px;
    font-weight: 800;
    color: #0f172a;
  }
  .mso-gear-title {
    font-size: 13.5px;
    font-weight: 800;
    color: #0f172a;
    margin: 0 0 10px 0;
    line-height: 1.35;
  }
  .mso-gear-title a {
    color: #0f172a !important;
    text-decoration: none;
  }
  .mso-gear-stock {
    font-size: 10.5px;
    font-weight: 700;
    color: #16a34a;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    gap: 4px;
  }
  .mso-gear-cta {
    display: block;
    text-align: center;
    background: #0f172a;
    color: #ffffff !important;
    font-size: 11.5px;
    font-weight: 700;
    padding: 8px 12px;
    border-radius: 5px;
    text-decoration: none;
    transition: background 0.15s ease;
  }
  .mso-gear-cta:hover {
    background: #16a34a;
  }

  /* ========================================== */
  /* 2.10 RESPONSIVE BREAKPOINTS                */
  /* ========================================== */
  @media (max-width: 1080px) {
    .mso-gear-grid {
      grid-template-columns: repeat(2, 1fr) !important;
      gap: 16px !important;
    }
  }

  @media (max-width: 960px) {
    .mso-spotlight-card {
      grid-template-columns: 1fr;
    }
    .mso-spotlight-visual {
      height: 180px;
    }
    .mso-articles-grid {
      grid-template-columns: repeat(2, 1fr) !important;
      gap: 18px !important;
    }
  }

  @media (max-width: 640px) {
    .mso-blog-portal {
      padding: 10px 12px 50px 12px;
    }
    .mso-masthead {
      padding: 24px 18px;
    }
    .mso-articles-grid {
      grid-template-columns: 1fr !important;
    }
    .mso-gear-grid {
      grid-template-columns: 1fr !important;
    }
    .mso-newsletter-card {
      padding: 24px 18px;
    }
    .mso-input-group {
      flex-direction: column;
      gap: 8px;
    }
    .mso-newsletter-input {
      border-radius: 6px;
      border-right: 1px solid #cbd5e1;
    }
    .mso-newsletter-btn {
      border-radius: 6px;
      width: 100%;
    }
  }
</style>

<!-- ========================================== -->
<!-- 3. HTML5 SEMANTIC MARKUP                   -->
<!-- ========================================== -->
<main class="mso-blog-portal" role="main">

  <!-- 3.1 CRO-OPTIMIZED HERO MASTHEAD -->
  <header class="mso-masthead">
    <div class="mso-masthead-top">
      <div class="mso-masthead-badge">MSO Field Journal &bull; 2026 Edition</div>
      <div class="mso-season-alert">
        <span>🏹 Whitetail Archery Season: <strong>October 1st Opener</strong></span>
      </div>
    </div>

    <h1>Field Guides, Steel Benchmarks &amp; Cutlery Tests</h1>
    <p class="mso-masthead-lead">
      Empirical Rockwell hardness comparisons, Michigan whitetail deer field dressing essentials, camp sharpening masterclasses, and verified backcountry cutlery reviews.
    </p>

    <!-- Search with Voice + CRO Trending Chips -->
    <div class="mso-search-wrap">
      <div class="mso-search-box">
        <span class="mso-search-ico" aria-hidden="true">🔍</span>
        <input 
          type="search" 
          id="msoSearchInput"
          class="mso-search-field" 
          placeholder="Search guides, steel tests, or gear (e.g. MagnaCut, whitetail knives, sharpening)..."
          aria-label="Search blog guides and outdoor cutlery"
          autocomplete="off"
        />
        <div class="mso-search-actions">
          <button type="button" id="msoVoiceBtn" class="mso-voice-mic" title="Click to speak (Voice Search)" aria-label="Activate Voice Search">
            🎙️
          </button>
          <button type="button" id="msoSubmitSearchBtn" class="mso-search-submit" aria-label="Search MSO">
            Search
          </button>
        </div>
      </div>

      <!-- Instant Dropdown Results -->
      <div id="msoSearchDropdown" class="mso-autocomplete" role="region" aria-live="polite"></div>

      <!-- Quick CRO Trending Chips -->
      <div class="mso-quick-chips">
        <span>Trending:</span>
        <a href="javascript:void(0)" class="mso-quick-chip" onclick="msoQuickSearch('hunting knives')">Deer Hunting Knives</a>
        <a href="javascript:void(0)" class="mso-quick-chip" onclick="msoQuickSearch('magnacut')">CPM MagnaCut</a>
        <a href="javascript:void(0)" class="mso-quick-chip" onclick="msoQuickSearch('sharpening')">Camp Sharpening</a>
        <a href="javascript:void(0)" class="mso-quick-chip" onclick="msoQuickSearch('buck 110')">Buck 110</a>
        <a href="javascript:void(0)" class="mso-quick-chip" onclick="msoQuickSearch('edc under 100')">EDC Folders</a>
      </div>
    </div>
  </header>

  <!-- 3.2 HORIZONTAL CATEGORY FILTER PILLS -->
  <nav class="mso-pills-bar" aria-label="Editorial Categories">
    <div class="mso-pills-inner">
      <a href="/blog/" class="mso-pill active">All Field Guides</a>
      <a href="/cpm-magnacut-vs-bohler-m390mk/" class="mso-pill">Steel Showdowns</a>
      <a href="/best-hunting-knives-for-michigan-deer-season-3/" class="mso-pill">Whitetail &amp; Hunting Cutlery</a>
      <a href="/mora-companion-vs-kansbol-vs-garberg/" class="mso-pill">Bushcraft &amp; Camp Craft</a>
      <a href="/how-to-sharpen-a-knife-at-home/" class="mso-pill">Field Sharpening &amp; Care</a>
      <a href="/top-best-edc-knives-under-100/" class="mso-pill">EDC Pocket Knives</a>
      <a href="/knife-laws/" class="mso-pill">50-State Knife Laws</a>
    </div>
  </nav>

  <!-- 3.3 COMPACT HERO EDITORIAL SPOTLIGHT -->
  <article class="mso-spotlight-card" itemscope itemtype="https://schema.org/BlogPosting">
    <div class="mso-spotlight-visual">
      <a href="/cpm-magnacut-vs-bohler-m390mk/" style="display:block; width:100%; height:100%;">
        <img 
          src="https://www.michigansportsoutdoor.com/wp-content/uploads/2026/03/Best-Tips-for-Choosing-Your-First-EDC-Knife-1.jpg" 
          alt="CPM MagnaCut vs Böhler M390MK Super Steel Showdown" 
          loading="eager"
          itemprop="image"
        />
      </a>
    </div>
    <div class="mso-spotlight-info">
      <div>
        <div class="mso-spotlight-tag-row">
          <span class="mso-spotlight-kicker">STEEL SHOWDOWN &bull; LAB TEST</span>
          <span class="mso-spotlight-stock">&bull; In-Stock Knives Tested</span>
        </div>
        <h2 itemprop="headline">
          <a href="/cpm-magnacut-vs-bohler-m390mk/" itemprop="mainEntityOfPage">
            Crucible CPM MagnaCut vs Böhler M390MK: The Super Steel Showdown
          </a>
        </h2>
        <p itemprop="description">
          We weigh Rockwell hardness, Charpy C-notch impact toughness, and field strop recovery under rigorous sub-zero Upper Peninsula trials.
        </p>
      </div>
      <div class="mso-spotlight-foot">
        <div style="font-size:12px; color:#64748b;">
          <strong>8 Min Read</strong> &bull; Michigan Cutlery Lab
        </div>
        <a href="/cpm-magnacut-vs-bohler-m390mk/" class="mso-btn-read">
          Read Full Analysis &rarr;
        </a>
      </div>
    </div>
  </article>

  <!-- 3.4 3-COLUMN EDITORIAL BENTO GRID (COMPACT 135PX COVERS) -->
  <section aria-labelledby="featured-guides-heading">
    <div class="mso-section-bar">
      <h2 id="featured-guides-heading">Featured Field Reports &amp; Buying Guides</h2>
      <span class="mso-section-sub">Verified In-Field Evidence</span>
    </div>

    <div class="mso-articles-grid">

      <!-- CARD 1 -->
      <article class="mso-post-card" itemscope itemtype="https://schema.org/BlogPosting">
        <a href="/best-hunting-knives-for-michigan-deer-season-3/" class="mso-card-thumb" itemprop="mainEntityOfPage">
          <img 
            src="https://www.michigansportsoutdoor.com/wp-content/uploads/2026/03/Best-hunting-knife-for-Michigan-Deer-season.jpg" 
            alt="Best Hunting Knives for Michigan Deer Season" 
            loading="lazy" 
            itemprop="image"
          />
        </a>
        <div class="mso-card-content">
          <div>
            <div class="mso-card-meta-row">
              <span class="mso-card-kicker">HUNTING &gt; DRESSING</span>
              <span class="mso-card-gear-signal">&bull; Tested Gear In Stock</span>
            </div>
            <h3 class="mso-card-heading" itemprop="headline">
              <a href="/best-hunting-knives-for-michigan-deer-season-3/">Best Hunting Knives for Michigan Deer Season (2026 Guide)</a>
            </h3>
            <p class="mso-card-snippet" itemprop="description">
              Field dressing, skinning, and cold-weather steel performance tested in real Upper & Lower Peninsula deer camps ahead of October archery opener.
            </p>
          </div>
          <div>
            <div class="mso-card-cta-row">
              <span class="mso-card-time">8-MIN READ</span>
              <a href="/best-hunting-knives-for-michigan-deer-season-3/" class="mso-card-action-link">Read Guide &rarr;</a>
            </div>
            <hr class="mso-card-sep" />
            <div class="mso-author-row" itemprop="author" itemscope itemtype="https://schema.org/Person">
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face" alt="Dave Miller" class="mso-author-pic" />
              <div class="mso-author-details">
                <span class="mso-author-title" itemprop="name">Dave Miller</span>
                <span class="mso-author-verified"><span class="mso-check-pill">&#10003;</span> Verified Expert in Whitetail Cutlery</span>
              </div>
            </div>
          </div>
        </div>
      </article>

      <!-- CARD 2 -->
      <article class="mso-post-card" itemscope itemtype="https://schema.org/BlogPosting">
        <a href="/best-fixed-blade-hunting-knives-2026-buying-guide/" class="mso-card-thumb" itemprop="mainEntityOfPage">
          <img 
            src="https://www.michigansportsoutdoor.com/wp-content/uploads/2026/03/TOP-BEST-FIXED-BLADE-KNIVES.jpg" 
            alt="Best Fixed Blade Hunting Knives 2026" 
            loading="lazy" 
            itemprop="image"
          />
        </a>
        <div class="mso-card-content">
          <div>
            <div class="mso-card-meta-row">
              <span class="mso-card-kicker">BUYER GUIDE &gt; FIXED</span>
              <span class="mso-card-gear-signal">&bull; Top Full Tang Picks</span>
            </div>
            <h3 class="mso-card-heading" itemprop="headline">
              <a href="/best-fixed-blade-hunting-knives-2026-buying-guide/">Best Fixed Blade Hunting Knives 2026: In-Depth Review</a>
            </h3>
            <p class="mso-card-snippet" itemprop="description">
              Drop point vs clip point vs skinner blade profiles evaluated for field dressing performance, pelvic bone splitting rigidity, and grip safety.
            </p>
          </div>
          <div>
            <div class="mso-card-cta-row">
              <span class="mso-card-time">12-MIN READ</span>
              <a href="/best-fixed-blade-hunting-knives-2026-buying-guide/" class="mso-card-action-link">View Top Picks &rarr;</a>
            </div>
            <hr class="mso-card-sep" />
            <div class="mso-author-row" itemprop="author" itemscope itemtype="https://schema.org/Person">
              <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face" alt="Joe Cavazos" class="mso-author-pic" />
              <div class="mso-author-details">
                <span class="mso-author-title" itemprop="name">Joe Cavazos</span>
                <span class="mso-author-verified"><span class="mso-check-pill">&#10003;</span> Verified Expert in Metallurgy</span>
              </div>
            </div>
          </div>
        </div>
      </article>

      <!-- CARD 3 -->
      <article class="mso-post-card" itemscope itemtype="https://schema.org/BlogPosting">
        <a href="/mora-companion-vs-kansbol-vs-garberg/" class="mso-card-thumb" itemprop="mainEntityOfPage">
          <img 
            src="https://www.michigansportsoutdoor.com/wp-content/uploads/2026/03/Details-on-gut-Hook-Knives-1.jpg" 
            alt="Morakniv Companion vs Kansbol vs Garberg" 
            loading="lazy" 
            itemprop="image"
          />
        </a>
        <div class="mso-card-content">
          <div>
            <div class="mso-card-meta-row">
              <span class="mso-card-kicker">BUSHCRAFT &gt; SCANDI</span>
              <span class="mso-card-gear-signal">&bull; Field Survival Test</span>
            </div>
            <h3 class="mso-card-heading" itemprop="headline">
              <a href="/mora-companion-vs-kansbol-vs-garberg/">Morakniv Companion vs Kansbol vs Garberg Showdown</a>
            </h3>
            <p class="mso-card-snippet" itemprop="description">
              Comparing 12C27 Sandvik stainless, high carbon tool steel, 90-degree spine ferro rod sparks, and full tang baton durability in wet hardwoods.
            </p>
          </div>
          <div>
            <div class="mso-card-cta-row">
              <span class="mso-card-time">10-MIN READ</span>
              <a href="/mora-companion-vs-kansbol-vs-garberg/" class="mso-card-action-link">Read Showdown &rarr;</a>
            </div>
            <hr class="mso-card-sep" />
            <div class="mso-author-row" itemprop="author" itemscope itemtype="https://schema.org/Person">
              <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" alt="Thomas Varghese" class="mso-author-pic" />
              <div class="mso-author-details">
                <span class="mso-author-title" itemprop="name">Thomas Varghese</span>
                <span class="mso-author-verified"><span class="mso-check-pill">&#10003;</span> Verified Expert in Bushcraft</span>
              </div>
            </div>
          </div>
        </div>
      </article>

      <!-- CARD 4 -->
      <article class="mso-post-card" itemscope itemtype="https://schema.org/BlogPosting">
        <a href="/how-to-sharpen-a-knife-at-home/" class="mso-card-thumb" itemprop="mainEntityOfPage">
          <img 
            src="https://www.michigansportsoutdoor.com/wp-content/uploads/2026/04/how-to-sharpen-a-knife-at-home.png" 
            alt="How to Sharpen a Hunting Knife with a Turn-Box" 
            loading="lazy" 
            itemprop="image"
          />
        </a>
        <div class="mso-card-content">
          <div>
            <div class="mso-card-meta-row">
              <span class="mso-card-kicker">CARE &gt; SHARPENING</span>
              <span class="mso-card-gear-signal">&bull; Razor Apex Guide</span>
            </div>
            <h3 class="mso-card-heading" itemprop="headline">
              <a href="/how-to-sharpen-a-knife-at-home/">How to Sharpen a Hunting Knife with a Turn-Box at Camp</a>
            </h3>
            <p class="mso-card-snippet" itemprop="description">
              Setting consistent 20-degree bevel angles, using dual alumina ceramic rods for hair-popping edges, and field-strop recovery right in hunting camp.
            </p>
          </div>
          <div>
            <div class="mso-card-cta-row">
              <span class="mso-card-time">9-MIN READ</span>
              <a href="/how-to-sharpen-a-knife-at-home/" class="mso-card-action-link">Learn Technique &rarr;</a>
            </div>
            <hr class="mso-card-sep" />
            <div class="mso-author-row" itemprop="author" itemscope itemtype="https://schema.org/Person">
              <img src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&h=100&fit=crop&crop=face" alt="Shivam Kapoor" class="mso-author-pic" />
              <div class="mso-author-details">
                <span class="mso-author-title" itemprop="name">Shivam Kapoor</span>
                <span class="mso-author-verified"><span class="mso-check-pill">&#10003;</span> Verified Expert in Honing</span>
              </div>
            </div>
          </div>
        </div>
      </article>

      <!-- CARD 5 -->
      <article class="mso-post-card" itemscope itemtype="https://schema.org/BlogPosting">
        <a href="/top-best-edc-knives-under-100/" class="mso-card-thumb" itemprop="mainEntityOfPage">
          <img 
            src="https://www.michigansportsoutdoor.com/wp-content/uploads/2026/03/Top-10-Best-EDC-Knives-Under-100-.jpg" 
            alt="Top 5 Best EDC Pocket Knives Under $100" 
            loading="lazy" 
            itemprop="image"
          />
        </a>
        <div class="mso-card-content">
          <div>
            <div class="mso-card-meta-row">
              <span class="mso-card-kicker">EDC &gt; BUDGET FOLDERS</span>
              <span class="mso-card-gear-signal">&bull; Best Value Under $100</span>
            </div>
            <h3 class="mso-card-heading" itemprop="headline">
              <a href="/top-best-edc-knives-under-100/">Top 5 Best EDC Pocket Knives Under $100 for Fall 2026</a>
            </h3>
            <p class="mso-card-snippet" itemprop="description">
              Pocket knives tested for lockup tolerance, bearing smoothness, deep-pocket carry ergonomics, and edge retention under everyday utility tasks.
            </p>
          </div>
          <div>
            <div class="mso-card-cta-row">
              <span class="mso-card-time">7-MIN READ</span>
              <a href="/top-best-edc-knives-under-100/" class="mso-card-action-link">View EDC Winners &rarr;</a>
            </div>
            <hr class="mso-card-sep" />
            <div class="mso-author-row" itemprop="author" itemscope itemtype="https://schema.org/Person">
              <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face" alt="Mubashar Sharif" class="mso-author-pic" />
              <div class="mso-author-details">
                <span class="mso-author-title" itemprop="name">Mubashar Sharif</span>
                <span class="mso-author-verified"><span class="mso-check-pill">&#10003;</span> Verified Expert in Cutlery</span>
              </div>
            </div>
          </div>
        </div>
      </article>

      <!-- CARD 6 -->
      <article class="mso-post-card" itemscope itemtype="https://schema.org/BlogPosting">
        <a href="/understanding-knife-edge-geometry-hollow-grind-vs-flat-grind/" class="mso-card-thumb" itemprop="mainEntityOfPage">
          <img 
            src="https://www.michigansportsoutdoor.com/wp-content/uploads/2026/03/KNIFE-BLADE-STEELS.jpg" 
            alt="Understanding Knife Edge Geometry Hollow vs Flat Grind" 
            loading="lazy" 
            itemprop="image"
          />
        </a>
        <div class="mso-card-content">
          <div>
            <div class="mso-card-meta-row">
              <span class="mso-card-kicker">TECH &gt; BEVEL GEOMETRY</span>
              <span class="mso-card-gear-signal">&bull; Engineering Deep Dive</span>
            </div>
            <h3 class="mso-card-heading" itemprop="headline">
              <a href="/understanding-knife-edge-geometry-hollow-grind-vs-flat-grind/">Understanding Knife Edge Geometry: Hollow vs Flat Grind</a>
            </h3>
            <p class="mso-card-snippet" itemprop="description">
              Deep dive into slicing efficiency, shoulder wedging drag, and lateral toughness under heavy wood processing and whitetail dressing chores.
            </p>
          </div>
          <div>
            <div class="mso-card-cta-row">
              <span class="mso-card-time">11-MIN READ</span>
              <a href="/understanding-knife-edge-geometry-hollow-grind-vs-flat-grind/" class="mso-card-action-link">Explore Tech &rarr;</a>
            </div>
            <hr class="mso-card-sep" />
            <div class="mso-author-row" itemprop="author" itemscope itemtype="https://schema.org/Person">
              <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face" alt="Marcus Thorne" class="mso-author-pic" />
              <div class="mso-author-details">
                <span class="mso-author-title" itemprop="name">Marcus Thorne</span>
                <span class="mso-author-verified"><span class="mso-check-pill">&#10003;</span> Verified Expert in Cutlery Design</span>
              </div>
            </div>
          </div>
        </div>
      </article>

    </div>
  </section>

  <!-- 3.5 HIGH-CONVERTING LEAD MAGNET NEWSLETTER (CRO OPTIMIZED) -->
  <section class="mso-newsletter-card" aria-label="Field Dispatch Newsletter">
    <div class="mso-newsletter-text">
      <span class="mso-newsletter-badge">&bull; FREE FIELD ASSET</span>
      <h3>Free 2026 Whitetail Field Dressing &amp; Steel Guide</h3>
      <p>Join 24,000+ Michigan hunters. Get our printable deer camp dressing checklist, super steel drop alerts, and exclusive cutlery discounts.</p>
    </div>
    <div class="mso-newsletter-form">
      <form action="/#newsletter-signup" method="POST" onsubmit="alert('Thank you for subscribing! Your Michigan Field Dressing Guide is on the way.'); return false;">
        <div class="mso-input-group">
          <input type="email" placeholder="Enter your best email address..." required class="mso-newsletter-input" aria-label="Email address" />
          <button type="submit" class="mso-newsletter-btn">Get Free Guide &rarr;</button>
        </div>
        <p class="mso-form-legal">
          Instant access. Zero spam. By submitting you agree to our <a href="/privacy-policy/">privacy policy</a>.
        </p>
      </form>
    </div>
  </section>

  <!-- 3.6 GEAR FEATURED: HIGH-CONVERTING E-COMMERCE CARDS (PRICING & STOCK) -->
  <section class="mso-gear-hub" aria-labelledby="gear-featured-heading">
    <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; margin-bottom:20px; border-bottom:1px solid #e2e8f0; padding-bottom:12px;">
      <div>
        <span style="font-size:11px; font-weight:800; text-transform:uppercase; letter-spacing:1px; color:#16a34a;">Field Tested &bull; Factory Direct</span>
        <h3 id="gear-featured-heading" style="font-size:21px; font-weight:900; color:#0f172a; margin:4px 0 0 0;">Gear Featured in Our Field Guides</h3>
      </div>
      <a href="/shop/" style="font-size:12.5px; font-weight:700; color:#0284c7; text-decoration:none;">View All In-Stock Cutlery &rarr;</a>
    </div>

    <!-- EXACTLY 4 EQUAL CARDS IN 1 HORIZONTAL ROW -->
    <div class="mso-gear-grid">

      <!-- Product 1 -->
      <div class="mso-gear-card" itemscope itemtype="https://schema.org/Product">
        <div>
          <a href="/product/buck-110-folding-hunter/" class="mso-gear-image-box">
            <img 
              src="https://www.michigansportsoutdoor.com/wp-content/uploads/2026/03/KNIFE-BLADE-STEELS-shapes-for-field-dressing.jpg" 
              alt="Buck 110 Folding Hunter Whitetail Classic" 
              loading="lazy" 
              itemprop="image"
            />
          </a>
          <div class="mso-gear-kicker-row">
            <span class="mso-gear-kicker">Whitetail Classic</span>
            <span class="mso-gear-price">From $64.99</span>
          </div>
          <h4 class="mso-gear-title" itemprop="name">
            <a href="/product/buck-110-folding-hunter/" itemprop="url">Buck 110 Folding Hunter (420HC)</a>
          </h4>
        </div>
        <div>
          <div class="mso-gear-stock">&bull; In Stock &bull; Ships Same Day</div>
          <a href="/product/buck-110-folding-hunter/" class="mso-gear-cta">View Best Price &rarr;</a>
        </div>
      </div>

      <!-- Product 2 -->
      <div class="mso-gear-card" itemscope itemtype="https://schema.org/Product">
        <div>
          <a href="/product/sharpi-8-in-1-diamond-sharpener/" class="mso-gear-image-box">
            <img 
              src="https://www.michigansportsoutdoor.com/wp-content/uploads/2026/08/SHOD0002.jpg" 
              alt="Sharpi 8-in-1 Pocket Diamond Sharpener" 
              loading="lazy" 
              itemprop="image"
            />
          </a>
          <div class="mso-gear-kicker-row">
            <span class="mso-gear-kicker">Pack Essential</span>
            <span class="mso-gear-price">Under $16</span>
          </div>
          <h4 class="mso-gear-title" itemprop="name">
            <a href="/product/sharpi-8-in-1-diamond-sharpener/" itemprop="url">Sharpi 8-in-1 Pocket Sharpener</a>
          </h4>
        </div>
        <div>
          <div class="mso-gear-stock">&bull; In Stock &bull; Ships Fast</div>
          <a href="/product/sharpi-8-in-1-diamond-sharpener/" class="mso-gear-cta">View Best Price &rarr;</a>
        </div>
      </div>

      <!-- Product 3 -->
      <div class="mso-gear-card" itemscope itemtype="https://schema.org/Product">
        <div>
          <a href="/product/lansky-turn-box-with-leather-strop-2/" class="mso-gear-image-box">
            <img 
              src="https://www.michigansportsoutdoor.com/wp-content/uploads/2026/05/TB2D2CL.jpg" 
              alt="Lansky Turn-Box System with Strop" 
              loading="lazy" 
              itemprop="image"
            />
          </a>
          <div class="mso-gear-kicker-row">
            <span class="mso-gear-kicker" style="color:#b45309;">Camp Sharpener</span>
            <span class="mso-gear-price">From $28.95</span>
          </div>
          <h4 class="mso-gear-title" itemprop="name">
            <a href="/product/lansky-turn-box-with-leather-strop-2/" itemprop="url">Lansky Turn-Box Strop System</a>
          </h4>
        </div>
        <div>
          <div class="mso-gear-stock">&bull; In Stock &bull; Ships Fast</div>
          <a href="/product/lansky-turn-box-with-leather-strop-2/" class="mso-gear-cta">View Best Price &rarr;</a>
        </div>
      </div>

      <!-- Product 4 -->
      <div class="mso-gear-card" itemscope itemtype="https://schema.org/Product">
        <div>
          <a href="/product/dmt-suregrip-powered-diamond-knif/" class="mso-gear-image-box">
            <img 
              src="https://www.michigansportsoutdoor.com/wp-content/uploads/2026/09/DMT20187.jpg" 
              alt="DMT Diamond SureGrip Bench Sharpener" 
              loading="lazy" 
              itemprop="image"
            />
          </a>
          <div class="mso-gear-kicker-row">
            <span class="mso-gear-kicker" style="color:#0284c7;">Bench Hone</span>
            <span class="mso-gear-price">Pro Grade</span>
          </div>
          <h4 class="mso-gear-title" itemprop="name">
            <a href="/product/dmt-suregrip-powered-diamond-knif/" itemprop="url">DMT Diamond SureGrip Sharpener</a>
          </h4>
        </div>
        <div>
          <div class="mso-gear-stock">&bull; In Stock &bull; Ships Fast</div>
          <a href="/product/dmt-suregrip-powered-diamond-knif/" class="mso-gear-cta">View Best Price &rarr;</a>
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
    badgeClass: "mso-bg-guide",
    keywords: ["deer", "deer season", "hunting", "hunting knife", "hunting knives", "whitetail", "field dressing", "gutting", "skinning", "michigan deer", "buck"]
  },
  {
    title: "Crucible CPM MagnaCut vs Böhler M390MK: The Super Steel Showdown",
    url: "/cpm-magnacut-vs-bohler-m390mk/",
    type: "Steel Test",
    badgeClass: "mso-bg-steel",
    keywords: ["magnacut", "cpm magnacut", "m390", "m390mk", "steel", "steels", "corrosion", "toughness", "rockwell", "edge retention", "blade steel"]
  },
  {
    title: "Best Fixed Blade Hunting Knives 2026: In-Depth Review",
    url: "/best-fixed-blade-hunting-knives-2026-buying-guide/",
    type: "Buyer Guide",
    badgeClass: "mso-bg-guide",
    keywords: ["fixed blade", "fixed", "full tang", "drop point", "clip point", "skinner", "hunting knives", "gut hook"]
  },
  {
    title: "Morakniv Companion vs Kansbol vs Garberg Showdown",
    url: "/mora-companion-vs-kansbol-vs-garberg/",
    type: "Bushcraft",
    badgeClass: "mso-bg-guide",
    keywords: ["mora", "morakniv", "companion", "kansbol", "garberg", "bushcraft", "camp knife", "scandi", "ferro rod", "batoning"]
  },
  {
    title: "How to Sharpen a Hunting Knife with a Turn-Box at Camp",
    url: "/how-to-sharpen-a-knife-at-home/",
    type: "Maintenance",
    badgeClass: "mso-bg-steel",
    keywords: ["sharpen", "sharpening", "turn box", "lansky", "ceramic", "strop", "hone", "razor edge", "bevel", "angle"]
  },
  {
    title: "Top 5 Best EDC Pocket Knives Under $100 for Fall 2026",
    url: "/top-best-edc-knives-under-100/",
    type: "EDC Round-up",
    badgeClass: "mso-bg-guide",
    keywords: ["edc", "pocket knife", "folder", "folding knife", "budget knife", "under 100", "daily carry", "d2"]
  },
  {
    title: "Understanding Knife Edge Geometry: Hollow vs Flat Grind",
    url: "/understanding-knife-edge-geometry-hollow-grind-vs-flat-grind/",
    type: "Cutlery Tech",
    badgeClass: "mso-bg-steel",
    keywords: ["grind", "hollow grind", "flat grind", "blade geometry", "bevel", "slicing", "geometry", "scandi grind"]
  },
  {
    title: "50-State Knife Laws & Legal Carry Directory (2026 Edition)",
    url: "/knife-laws/",
    type: "Legal Directory",
    badgeClass: "mso-bg-guide",
    keywords: ["law", "laws", "knife laws", "legal", "legal carry", "concealed carry", "blade length", "michigan knife laws", "states"]
  },
  {
    title: "Buck 110 Folding Hunter (420HC Paul Bos Heat Treat)",
    url: "/product/buck-110-folding-hunter/",
    type: "In-Stock Gear",
    badgeClass: "mso-bg-prod",
    keywords: ["buck", "buck 110", "folding hunter", "lockback", "brass bolsters", "420hc"]
  },
  {
    title: "Sharpi 8-in-1 Pocket Diamond Sharpener",
    url: "/product/sharpi-8-in-1-diamond-sharpener/",
    type: "In-Stock Gear",
    badgeClass: "mso-bg-prod",
    keywords: ["sharpi", "pocket sharpener", "diamond sharpener", "ceramic sharpener"]
  },
  {
    title: "Lansky Turn-Box Crock Stick System with Leather Strop",
    url: "/product/lansky-turn-box-with-leather-strop-2/",
    type: "In-Stock Gear",
    badgeClass: "mso-bg-prod",
    keywords: ["lansky", "turn box", "crock stick", "leather strop", "wood block sharpener"]
  },
  {
    title: "DMT Diamond SureGrip Bench Sharpener",
    url: "/product/dmt-suregrip-powered-diamond-knif/",
    type: "In-Stock Gear",
    badgeClass: "mso-bg-prod",
    keywords: ["dmt", "diamond stone", "bench hone", "suregrip"]
  },
  {
    title: "All In-Stock Outdoor Cutlery & Gear Store",
    url: "/shop/",
    type: "Store Hub",
    badgeClass: "mso-bg-prod",
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

(function() {
  const searchInput = document.getElementById('msoSearchInput');
  const dropdown = document.getElementById('msoSearchDropdown');
  const submitBtn = document.getElementById('msoSubmitSearchBtn');
  const micBtn = document.getElementById('msoVoiceBtn');

  if (!searchInput || !dropdown) return;

  function renderDropdown(matches, query) {
    if (!matches || matches.length === 0) {
      dropdown.innerHTML = \`
        <div style="padding:14px 16px; color:#64748b; font-size:13px;">
          No direct guide match for "<strong>\${query}</strong>".
          <div style="margin-top:6px;">
            <a href="/shop/?s=\${encodeURIComponent(query)}" style="color:#0284c7; font-weight:700; text-decoration:underline;">
              Search full MSO Cutlery Store for "\${query}" &rarr;
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
        <a href="\${item.url}" class="mso-drop-item">
          <div>
            <div class="mso-drop-title">\${item.title}</div>
            <div style="font-size:11px; color:#64748b; margin-top:2px;">michigansportsoutdoor.com\${item.url}</div>
          </div>
          <span class="mso-drop-badge \${item.badgeClass}">\${item.type}</span>
        </a>
      \`;
    });

    html += \`
      <div style="background:#f8fafc; padding:9px 16px; border-top:1px solid #e2e8f0; text-align:right;">
        <a href="/shop/?s=\${encodeURIComponent(query)}" style="font-size:11.5px; font-weight:700; color:#0284c7; text-decoration:none;">
          View all store results for "\${query}" &rarr;
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

  // VOICE SEARCH FEATURE (Web Speech API)
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
        searchInput.placeholder = "Search guides, steel tests, or gear...";
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
        searchInput.placeholder = "Search guides, steel tests, or gear...";
      };

      recognition.onend = function() {
        micBtn.classList.remove('listening');
        isRecording = false;
        searchInput.placeholder = "Search guides, steel tests, or gear...";
      };
    } else {
      micBtn.addEventListener('click', function() {
        alert("Voice search is supported in Google Chrome and Microsoft Edge on desktop and mobile.");
      });
    }
  }
})();
</script>
`.trim();

  try {
    console.log('Fetching page for slug "blog"...');
    const checkRes = await fetch(`${baseUrl}/wp-json/wp/v2/pages?slug=blog`, { headers });
    const pages = await checkRes.json();

    if (Array.isArray(pages) && pages.length > 0) {
      const pageId = pages[0].id;
      console.log(`Updating WordPress page #${pageId} with CRO-optimized compact layout...`);
      const updateRes = await fetch(`${baseUrl}/wp-json/wp/v2/pages/${pageId}`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          title: 'Field Guides, Steel Benchmarks & Whitetail Cutlery Reviews | MSO Blog',
          content: blogHtml,
          status: 'publish'
        })
      });
      const updated = await updateRes.json();
      console.log(`✅ CRO-optimized blog page deployed successfully: ${updated.link}`);
    } else {
      console.log('Creating new page for slug "blog"...');
      const createRes = await fetch(`${baseUrl}/wp-json/wp/v2/pages`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          title: 'Field Guides, Steel Benchmarks & Whitetail Cutlery Reviews | MSO Blog',
          slug: 'blog',
          content: blogHtml,
          status: 'publish'
        })
      });
      const created = await createRes.json();
      console.log(`✅ CRO blog page created successfully: ${created.link}`);
    }
  } catch (e) {
    console.error('Error deploying CRO blog:', e.message);
  }
}

deployCroToptalBlog()
  .then(() => process.exit(0))
  .catch(e => {
    console.error(e);
    process.exit(1);
  });
