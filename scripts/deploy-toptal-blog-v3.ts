async function deployToptalBlogV3() {
  const baseUrl = 'https://www.michigansportsoutdoor.com';
  const username = 'apiuser';
  const appPassword = 'cvxm Bi7y 6o3y r7HJ M1Wn mSMM';
  const auth = Buffer.from(`${username}:${appPassword}`).toString('base64');
  const headers = {
    Authorization: `Basic ${auth}`,
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
    'Content-Type': 'application/json'
  };

  const blogHtml = `
<style>
  /* 0. PURE WHITE PAGE BACKGROUND OVERRIDES */
  html, body, .site-content, .entry-content, .content-area, .site-main, .mso-blog-wrapper {
    background: #ffffff !important;
    background-color: #ffffff !important;
  }

  .mso-blog-wrapper {
    max-width: 1240px;
    margin: 0 auto;
    padding: 10px 16px 60px 16px;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    color: #0f172a;
    box-sizing: border-box;
  }

  /* 1. HERO SECTION WITH FUNCTIONAL VOICE & INSTANT SEARCH */
  .mso-toptal-hero {
    background: linear-gradient(135deg, #071533 0%, #0d214d 60%, #102a63 100%);
    border-radius: 12px;
    padding: 48px 40px 44px 40px;
    color: #ffffff;
    margin-bottom: 32px;
    position: relative;
    overflow: visible;
    box-shadow: 0 10px 30px rgba(7, 21, 51, 0.22);
  }
  .mso-toptal-hero::before {
    content: "";
    position: absolute;
    top: 0; right: 0; bottom: 0; left: 0;
    border-radius: 12px;
    background-image: 
      radial-gradient(circle at 85% 20%, rgba(56, 189, 248, 0.12) 0%, transparent 40%),
      radial-gradient(circle at 10% 80%, rgba(22, 163, 74, 0.12) 0%, transparent 40%);
    pointer-events: none;
  }
  .mso-toptal-hero h1 {
    font-size: 42px;
    font-weight: 800;
    color: #ffffff !important;
    margin: 0 0 16px 0;
    letter-spacing: -0.8px;
    line-height: 1.15;
  }
  .mso-hero-desc {
    font-size: 15.5px;
    line-height: 1.6;
    color: #cbd5e1;
    max-width: 780px;
    margin: 0 0 24px 0;
  }
  .mso-shares-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    border: 1px solid rgba(255, 255, 255, 0.25);
    background: rgba(255, 255, 255, 0.08);
    color: #ffffff;
    font-size: 12px;
    font-weight: 700;
    padding: 8px 16px;
    border-radius: 4px;
    margin-bottom: 24px;
    letter-spacing: 0.5px;
  }
  .mso-team-callout {
    font-size: 13.5px;
    color: #94a3b8;
    margin: 0 0 24px 0;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 8px;
  }
  .mso-edge-btn {
    border: 1px solid rgba(255, 255, 255, 0.4);
    color: #ffffff !important;
    font-size: 12px;
    font-weight: 700;
    padding: 4px 12px;
    border-radius: 4px;
    text-decoration: none;
    transition: all 0.2s ease;
  }
  .mso-edge-btn:hover {
    background: rgba(255, 255, 255, 0.15);
    border-color: #ffffff;
  }

  /* SEARCH BAR & VOICE SEARCH BUTTON */
  .mso-search-container {
    position: relative;
    max-width: 100%;
    margin-top: 8px;
    z-index: 50;
  }
  .mso-search-bar-wrap {
    display: flex;
    align-items: center;
    position: relative;
    width: 100%;
    background: rgba(4, 15, 40, 0.75);
    border: 1px solid rgba(255, 255, 255, 0.35);
    border-radius: 6px;
    transition: all 0.2s ease;
  }
  .mso-search-bar-wrap:focus-within {
    background: rgba(4, 15, 40, 0.95);
    border-color: #38bdf8;
    box-shadow: 0 0 0 3px rgba(56, 189, 248, 0.25);
  }
  .mso-search-glass {
    padding-left: 18px;
    color: #94a3b8;
    font-size: 18px;
    pointer-events: none;
    display: flex;
    align-items: center;
  }
  .mso-search-input {
    flex: 1 1 auto;
    background: transparent;
    border: none;
    padding: 16px 14px;
    font-size: 16px;
    color: #ffffff;
    box-sizing: border-box;
  }
  .mso-search-input::placeholder {
    color: #94a3b8;
  }
  .mso-search-input:focus {
    outline: none;
  }
  .mso-search-actions {
    display: flex;
    align-items: center;
    padding-right: 12px;
    gap: 8px;
  }
  .mso-mic-btn {
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.25);
    color: #ffffff;
    width: 38px;
    height: 38px;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
    font-size: 16px;
  }
  .mso-mic-btn:hover {
    background: rgba(56, 189, 248, 0.3);
    border-color: #38bdf8;
  }
  .mso-mic-btn.listening {
    background: #ef4444 !important;
    border-color: #f87171 !important;
    animation: msoMicPulse 1.2s infinite;
  }
  @keyframes msoMicPulse {
    0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7); }
    70% { transform: scale(1.1); box-shadow: 0 0 0 10px rgba(239, 68, 68, 0); }
    100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(239, 68, 68, 0); }
  }
  .mso-search-submit-btn {
    background: #16a34a;
    border: none;
    color: #ffffff;
    font-size: 13px;
    font-weight: 700;
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
    transition: background 0.15s ease;
  }
  .mso-search-submit-btn:hover {
    background: #15803d;
  }

  /* INSTANT SEARCH AUTOCOMPLETE DROPDOWN */
  .mso-autocomplete-dropdown {
    display: none;
    position: absolute;
    top: calc(100% + 6px);
    left: 0;
    right: 0;
    background: #ffffff;
    border: 1px solid #cbd5e1;
    border-radius: 8px;
    box-shadow: 0 16px 36px rgba(15, 23, 42, 0.25);
    max-height: 360px;
    overflow-y: auto;
    z-index: 1000;
  }
  .mso-dropdown-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 18px;
    border-bottom: 1px solid #f1f5f9;
    color: #0f172a;
    text-decoration: none !important;
    transition: background 0.15s ease;
  }
  .mso-dropdown-item:last-child {
    border-bottom: none;
  }
  .mso-dropdown-item:hover {
    background: #f8fafc;
  }
  .mso-item-title {
    font-size: 14px;
    font-weight: 700;
    color: #0f172a;
  }
  .mso-item-type {
    font-size: 11px;
    font-weight: 800;
    text-transform: uppercase;
    padding: 3px 8px;
    border-radius: 4px;
    letter-spacing: 0.5px;
  }
  .mso-type-guide { background: #e0f2fe; color: #0369a1; }
  .mso-type-steel { background: #dcfce7; color: #15803d; }
  .mso-type-product { background: #fef3c7; color: #b45309; }

  /* 2. CATEGORY PILLS BAR */
  .mso-pills-bar {
    margin-bottom: 32px;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
    -ms-overflow-style: none;
    padding: 4px 0;
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
    padding: 8px 18px;
    border-radius: 24px;
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
    color: #ffffff;
    border-color: #0f172a;
  }

  /* 3. HERO EDITORIAL SPOTLIGHT */
  .mso-hero-spotlight {
    background: #0b1a3d;
    border-radius: 12px;
    overflow: hidden;
    margin-bottom: 44px;
    display: flex;
    flex-wrap: wrap;
    box-shadow: 0 6px 20px rgba(0,0,0,0.06);
    border: 1px solid #1e293b;
  }
  .mso-spotlight-media {
    flex: 1 1 540px;
    min-height: 330px;
    background: #1e293b;
    position: relative;
    overflow: hidden;
  }
  .mso-spotlight-media img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.3s ease;
  }
  .mso-spotlight-media:hover img {
    transform: scale(1.02);
  }
  .mso-spotlight-content {
    flex: 1 1 440px;
    padding: 36px 32px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-sizing: border-box;
    color: #ffffff;
  }
  .mso-spotlight-tag {
    background: #0284c7;
    color: #ffffff;
    font-size: 10px;
    font-weight: 800;
    text-transform: uppercase;
    padding: 4px 9px;
    border-radius: 4px;
    letter-spacing: 0.5px;
    display: inline-block;
  }
  .mso-spotlight-title {
    font-size: 26px;
    font-weight: 800;
    line-height: 1.25;
    margin: 12px 0;
  }
  .mso-spotlight-title a {
    color: #ffffff !important;
    text-decoration: none;
  }
  .mso-spotlight-desc {
    font-size: 14px;
    color: #94a3b8;
    line-height: 1.6;
    margin: 0 0 20px 0;
  }
  .mso-spotlight-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 12px;
    border-top: 1px solid #1e293b;
    padding-top: 18px;
  }
  .mso-spotlight-btn {
    background: #16a34a;
    color: #ffffff !important;
    font-size: 13px;
    font-weight: 700;
    padding: 9px 18px;
    border-radius: 6px;
    text-decoration: none;
    transition: background 0.15s ease;
  }
  .mso-spotlight-btn:hover {
    background: #15803d;
  }

  /* 4. EXACT 3 CARDS PER ROW WITH EQUAL HEIGHTS (ROW 1 = 3, ROW 2 = 3) */
  .mso-section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
    border-bottom: 2px solid #e2e8f0;
    padding-bottom: 10px;
  }
  .mso-section-header h2 {
    font-size: 24px;
    font-weight: 800;
    color: #0f172a;
    margin: 0;
  }
  .mso-grid-3cols {
    display: grid !important;
    grid-template-columns: repeat(3, 1fr) !important;
    gap: 28px !important;
    align-items: stretch !important;
    margin-bottom: 48px !important;
  }
  @media (max-width: 980px) {
    .mso-grid-3cols {
      grid-template-columns: repeat(2, 1fr) !important;
      gap: 20px !important;
    }
  }
  @media (max-width: 640px) {
    .mso-grid-3cols {
      grid-template-columns: 1fr !important;
    }
  }

  /* TOPTAL CARD STRUCTURE */
  .mso-toptal-card {
    background: #ffffff !important;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    overflow: hidden;
    display: flex !important;
    flex-direction: column !important;
    justify-content: space-between !important;
    height: 100% !important;
    box-shadow: 0 2px 8px rgba(0,0,0,0.04);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }
  .mso-toptal-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 24px rgba(15, 23, 42, 0.08);
  }
  .mso-card-media {
    display: block;
    height: 185px;
    overflow: hidden;
    background: #0f172a;
    position: relative;
    flex-shrink: 0;
  }
  .mso-card-media img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.3s ease;
  }
  .mso-toptal-card:hover .mso-card-media img {
    transform: scale(1.04);
  }
  .mso-card-body {
    padding: 20px;
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .mso-card-category {
    font-size: 11px;
    font-weight: 800;
    color: #0284c7;
    text-transform: uppercase;
    letter-spacing: 0.6px;
    margin-bottom: 8px;
  }
  .mso-card-title {
    font-size: 18px;
    font-weight: 800;
    line-height: 1.35;
    color: #0f172a;
    margin: 0 0 10px 0;
  }
  .mso-card-title a {
    color: #0f172a !important;
    text-decoration: none;
  }
  .mso-card-title a:hover {
    color: #0284c7 !important;
  }
  .mso-card-excerpt {
    font-size: 13.5px;
    color: #475569;
    line-height: 1.55;
    margin: 0 0 16px 0;
    flex-grow: 1;
    min-height: 64px;
  }
  .mso-card-readtime {
    font-size: 11px;
    font-weight: 700;
    color: #64748b;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-bottom: 14px;
  }
  .mso-card-divider {
    border: 0;
    height: 1px;
    background: #e2e8f0;
    margin: 0 0 14px 0;
  }
  .mso-author-block {
    display: flex;
    align-items: flex-start;
    gap: 12px;
  }
  .mso-author-avatar {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    object-fit: cover;
    flex-shrink: 0;
    border: 1px solid #e2e8f0;
  }
  .mso-author-info {
    font-size: 12px;
    line-height: 1.4;
  }
  .mso-author-name {
    font-weight: 700;
    color: #0f172a;
    display: block;
  }
  .mso-expert-badge {
    color: #15803d;
    font-weight: 700;
    font-size: 11px;
    display: flex;
    align-items: center;
    gap: 4px;
    margin: 2px 0 4px 0;
  }
  .mso-check-icon {
    display: inline-block;
    width: 13px;
    height: 13px;
    background: #16a34a;
    color: #ffffff;
    border-radius: 50%;
    text-align: center;
    line-height: 13px;
    font-size: 9px;
    font-weight: 900;
  }
  .mso-author-bio {
    color: #64748b;
    font-size: 11.5px;
    line-height: 1.35;
    margin: 0;
  }

  /* 5. TOPTAL NEWSLETTER BAR */
  .mso-newsletter-bar {
    background: #09173a;
    border-radius: 8px;
    padding: 36px 40px;
    margin-bottom: 48px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 24px;
    box-shadow: 0 8px 24px rgba(9, 23, 58, 0.15);
  }
  .mso-newsletter-heading {
    font-size: 26px;
    font-weight: 800;
    color: #ffffff;
    margin: 0;
    letter-spacing: -0.3px;
    max-width: 440px;
    line-height: 1.25;
  }
  .mso-newsletter-form-box {
    flex: 1 1 460px;
    max-width: 580px;
  }
  .mso-form-row {
    display: flex;
    width: 100%;
  }
  .mso-email-input {
    flex: 1 1 auto;
    padding: 14px 18px;
    font-size: 15px;
    border: none;
    border-radius: 4px 0 0 4px;
    background: #ffffff;
    color: #0f172a;
    box-sizing: border-box;
  }
  .mso-email-input:focus {
    outline: none;
  }
  .mso-submit-btn {
    background: #00c774;
    color: #ffffff;
    font-weight: 800;
    font-size: 15px;
    padding: 14px 26px;
    border: none;
    border-radius: 0 4px 4px 0;
    cursor: pointer;
    white-space: nowrap;
    transition: background 0.15s ease;
  }
  .mso-submit-btn:hover {
    background: #00b368;
  }
  .mso-privacy-note {
    font-size: 11.5px;
    color: #94a3b8;
    margin: 8px 0 0 0;
  }
  .mso-privacy-note a {
    color: #cbd5e1;
    text-decoration: underline;
  }

  /* 6. GEAR FEATURED: EXACTLY 1 ROW OF 4 EQUAL HORIZONTAL CARDS (PURE WHITE BACKGROUND) */
  .mso-ecom-bridge {
    background: #ffffff !important;
    border: 1px solid #e2e8f0 !important;
    border-radius: 12px !important;
    padding: 32px 28px !important;
    box-shadow: 0 2px 8px rgba(0,0,0,0.03);
  }
  .mso-ecom-grid {
    display: grid !important;
    grid-template-columns: repeat(4, 1fr) !important;
    gap: 20px !important;
    align-items: stretch !important;
  }
  @media (max-width: 1024px) {
    .mso-ecom-grid {
      grid-template-columns: repeat(2, 1fr) !important;
    }
  }
  @media (max-width: 540px) {
    .mso-ecom-grid {
      grid-template-columns: 1fr !important;
    }
  }
  .mso-ecom-card {
    background: #ffffff !important;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    padding: 18px;
    display: flex !important;
    flex-direction: column !important;
    justify-content: space-between !important;
    height: 100% !important;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }
  .mso-ecom-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 18px rgba(15, 23, 42, 0.08);
  }
  .mso-ecom-img-wrap {
    height: 125px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 12px;
  }
  .mso-ecom-img {
    max-height: 120px;
    max-width: 100%;
    object-fit: contain;
  }
</style>

<div class="mso-blog-wrapper">

  <!-- 1. TOPTAL-STYLE HERO BANNER WITH VOICE SEARCH -->
  <section class="mso-toptal-hero">
    <h1>Michigan Sports Outdoor Blog</h1>
    <p class="mso-hero-desc">
      The MSO Blog is the authoritative hub for whitetail hunters, field dressing specialists, bushcrafters, and cutlery collectors, featuring key blade steel tests, knife sharpening guides, hunting season gear checklists, and expert reviews.
    </p>
    
    <div>
      <div class="mso-shares-badge">
        <span style="display:inline-block; transform:rotate(45deg); width:8px; height:8px; border-left:2px solid #38bdf8; border-bottom:2px solid #38bdf8; margin-right:4px;"></span>
        132.3K SHARES
      </div>
    </div>

    <div class="mso-team-callout">
      <span>MSO core field team members share their experience, expertise, and perspectives on the</span>
      <a href="#featured-guides" class="mso-edge-btn">MSO Edge Blog</a>
    </div>

    <!-- Toptal Functional Search Bar + Voice Search -->
    <div class="mso-search-container">
      <div class="mso-search-bar-wrap">
        <span class="mso-search-glass">🔍</span>
        <input 
          type="search" 
          id="msoSearchInput"
          class="mso-search-input" 
          placeholder="What are you looking for? (e.g. deer hunting knives, MagnaCut, sharpening, EDC...)"
          autocomplete="off"
        />
        <div class="mso-search-actions">
          <button type="button" id="msoVoiceBtn" class="mso-mic-btn" title="Click to speak (Voice Search)" aria-label="Voice Search">
            🎙️
          </button>
          <button type="button" id="msoSubmitSearchBtn" class="mso-search-submit-btn">
            Search
          </button>
        </div>
      </div>

      <!-- Instant Dropdown Results -->
      <div id="msoSearchDropdown" class="mso-autocomplete-dropdown"></div>
    </div>
  </section>

  <!-- 2. CATEGORY FILTER PILLS -->
  <nav class="mso-pills-bar" aria-label="Blog Categories">
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

  <!-- 3. HERO EDITORIAL SPOTLIGHT -->
  <article class="mso-hero-spotlight">
    <div class="mso-spotlight-media">
      <a href="/cpm-magnacut-vs-bohler-m390mk/" style="display:block; width:100%; height:100%;">
        <img src="https://www.michigansportsoutdoor.com/wp-content/uploads/2026/03/Best-Tips-for-Choosing-Your-First-EDC-Knife-1.jpg" alt="CPM MagnaCut vs Böhler M390MK Super Steel Showdown" loading="eager" />
      </a>
    </div>
    <div class="mso-spotlight-content">
      <div>
        <div style="display:flex; align-items:center; gap:8px; margin-bottom:12px;">
          <span class="mso-spotlight-tag">Steel Showdown &bull; Lab &amp; Field Test</span>
          <span style="color:#94a3b8; font-size:11.5px; font-weight:600;">8 min read</span>
        </div>
        <h2 class="mso-spotlight-title">
          <a href="/cpm-magnacut-vs-bohler-m390mk/">
            Crucible CPM MagnaCut vs Böhler M390MK: The Super Steel Showdown
          </a>
        </h2>
        <p class="mso-spotlight-desc">
          We weigh Rockwell hardness, edge retention, Charpy C-notch impact toughness, and field strop recovery under rigorous sub-zero Upper Peninsula trials.
        </p>
      </div>
      <div class="mso-spotlight-footer">
        <div style="font-size:12.5px; color:#cbd5e1;">
          <strong>Michigan Cutlery Lab</strong> &bull; Fall 2026 Edition
        </div>
        <a href="/cpm-magnacut-vs-bohler-m390mk/" class="mso-spotlight-btn">
          Read Full Analysis &rarr;
        </a>
      </div>
    </div>
  </article>

  <!-- 4. 3-COLUMN EDITORIAL BENTO GRID (EXACTLY 3 CARDS PER ROW, EQUAL HEIGHTS) -->
  <section id="featured-guides">
    <div class="mso-section-header">
      <h2>Featured Field Reports &amp; Buying Guides</h2>
      <span style="font-size:12.5px; color:#64748b; font-weight:600;">Verified In-Field Evidence</span>
    </div>

    <!-- ROW 1 (3 Cards) & ROW 2 (3 Cards) in a 3-column CSS Grid -->
    <div class="mso-grid-3cols">

      <!-- CARD 1 -->
      <article class="mso-toptal-card">
        <a href="/best-hunting-knives-for-michigan-deer-season-3/" class="mso-card-media">
          <img src="https://www.michigansportsoutdoor.com/wp-content/uploads/2026/03/Best-hunting-knife-for-Michigan-Deer-season.jpg" alt="Best Hunting Knives for Michigan Deer Season" loading="lazy" />
        </a>
        <div class="mso-card-body">
          <div>
            <div class="mso-card-category">HUNTING CUTLERY &gt; FIELD DRESSING</div>
            <h3 class="mso-card-title">
              <a href="/best-hunting-knives-for-michigan-deer-season-3/">Best Hunting Knives for Michigan Deer Season (2026 Guide)</a>
            </h3>
            <p class="mso-card-excerpt">
              Field dressing, skinning, and cold-weather steel performance tested in real Upper & Lower Peninsula deer camps ahead of October archery opener.
            </p>
          </div>
          <div>
            <div class="mso-card-readtime">8-MINUTE READ</div>
            <hr class="mso-card-divider" />
            <div class="mso-author-block">
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face" alt="Dave Miller" class="mso-author-avatar" />
              <div class="mso-author-info">
                <span class="mso-author-name">By Dave Miller</span>
                <span class="mso-expert-badge"><span class="mso-check-icon">&#10003;</span> Verified Expert in Whitetail Cutlery</span>
                <p class="mso-author-bio">Dave is a 20-year Michigan hunter and Northwoods field dresser specializing in Paul Bos heat treated steels.</p>
              </div>
            </div>
          </div>
        </div>
      </article>

      <!-- CARD 2 -->
      <article class="mso-toptal-card">
        <a href="/best-fixed-blade-hunting-knives-2026-buying-guide/" class="mso-card-media">
          <img src="https://www.michigansportsoutdoor.com/wp-content/uploads/2026/03/TOP-BEST-FIXED-BLADE-KNIVES.jpg" alt="Best Fixed Blade Hunting Knives 2026" loading="lazy" />
        </a>
        <div class="mso-card-body">
          <div>
            <div class="mso-card-category">BUYING GUIDES &gt; FIXED BLADES</div>
            <h3 class="mso-card-title">
              <a href="/best-fixed-blade-hunting-knives-2026-buying-guide/">Best Fixed Blade Hunting Knives 2026: In-Depth Review</a>
            </h3>
            <p class="mso-card-excerpt">
              Drop point vs clip point vs skinner blade profiles evaluated for field dressing performance, pelvic bone splitting rigidity, and glove grip safety.
            </p>
          </div>
          <div>
            <div class="mso-card-readtime">12-MINUTE READ</div>
            <hr class="mso-card-divider" />
            <div class="mso-author-block">
              <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face" alt="Joe Cavazos" class="mso-author-avatar" />
              <div class="mso-author-info">
                <span class="mso-author-name">By Joe Cavazos</span>
                <span class="mso-expert-badge"><span class="mso-check-icon">&#10003;</span> Verified Expert in Metallurgy</span>
                <p class="mso-author-bio">Joe evaluates Rockwell hardness, bevel angles, and structural impact limits across premium high-carbon steels.</p>
              </div>
            </div>
          </div>
        </div>
      </article>

      <!-- CARD 3 -->
      <article class="mso-toptal-card">
        <a href="/mora-companion-vs-kansbol-vs-garberg/" class="mso-card-media">
          <img src="https://www.michigansportsoutdoor.com/wp-content/uploads/2026/03/Details-on-gut-Hook-Knives-1.jpg" alt="Morakniv Companion vs Kansbol vs Garberg" loading="lazy" />
        </a>
        <div class="mso-card-body">
          <div>
            <div class="mso-card-category">BUSHCRAFT &gt; SCANDINAVIAN BLADES</div>
            <h3 class="mso-card-title">
              <a href="/mora-companion-vs-kansbol-vs-garberg/">Morakniv Companion vs Kansbol vs Garberg Showdown</a>
            </h3>
            <p class="mso-card-excerpt">
              Comparing 12C27 Sandvik stainless, high carbon tool steel, 90-degree spine ferro rod sparks, and full tang baton durability in wet hardwoods.
            </p>
          </div>
          <div>
            <div class="mso-card-readtime">10-MINUTE READ</div>
            <hr class="mso-card-divider" />
            <div class="mso-author-block">
              <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" alt="Thomas Varghese" class="mso-author-avatar" />
              <div class="mso-author-info">
                <span class="mso-author-name">By Thomas Varghese</span>
                <span class="mso-expert-badge"><span class="mso-check-icon">&#10003;</span> Verified Expert in Bushcraft</span>
                <p class="mso-author-bio">Thomas instructs backcountry survival and shelter craft across Michigan's Huron-Manistee National Forests.</p>
              </div>
            </div>
          </div>
        </div>
      </article>

      <!-- CARD 4 -->
      <article class="mso-toptal-card">
        <a href="/how-to-sharpen-a-knife-at-home/" class="mso-card-media">
          <img src="https://www.michigansportsoutdoor.com/wp-content/uploads/2026/04/how-to-sharpen-a-knife-at-home.png" alt="How to Sharpen a Hunting Knife with a Turn-Box" loading="lazy" />
        </a>
        <div class="mso-card-body">
          <div>
            <div class="mso-card-category">CUTLERY CARE &gt; FIELD SHARPENING</div>
            <h3 class="mso-card-title">
              <a href="/how-to-sharpen-a-knife-at-home/">How to Sharpen a Hunting Knife with a Turn-Box at Camp</a>
            </h3>
            <p class="mso-card-excerpt">
              Setting consistent 20-degree bevel angles, using dual alumina ceramic rods for hair-popping edges, and field-strop recovery right in hunting camp.
            </p>
          </div>
          <div>
            <div class="mso-card-readtime">9-MINUTE READ</div>
            <hr class="mso-card-divider" />
            <div class="mso-author-block">
              <img src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&h=100&fit=crop&crop=face" alt="Shivam Kapoor" class="mso-author-avatar" />
              <div class="mso-author-info">
                <span class="mso-author-name">By Shivam Kapoor</span>
                <span class="mso-expert-badge"><span class="mso-check-icon">&#10003;</span> Verified Expert in Honing Systems</span>
                <p class="mso-author-bio">Shivam specializes in diamond abrasives, micro-bevel refinement, and leather stropping compounds for razor edges.</p>
              </div>
            </div>
          </div>
        </div>
      </article>

      <!-- CARD 5 -->
      <article class="mso-toptal-card">
        <a href="/top-best-edc-knives-under-100/" class="mso-card-media">
          <img src="https://www.michigansportsoutdoor.com/wp-content/uploads/2026/03/Top-10-Best-EDC-Knives-Under-100-.jpg" alt="Top 5 Best EDC Pocket Knives Under $100" loading="lazy" />
        </a>
        <div class="mso-card-body">
          <div>
            <div class="mso-card-category">EVERYDAY CARRY &gt; BUDGET FOLDERS</div>
            <h3 class="mso-card-title">
              <a href="/top-best-edc-knives-under-100/">Top 5 Best EDC Pocket Knives Under $100 for Fall 2026</a>
            </h3>
            <p class="mso-card-excerpt">
              Pocket knives tested for lockup tolerance, bearing smoothness, deep-pocket carry ergonomics, and edge retention under everyday utility tasks.
            </p>
          </div>
          <div>
            <div class="mso-card-readtime">7-MINUTE READ</div>
            <hr class="mso-card-divider" />
            <div class="mso-author-block">
              <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face" alt="Mubashar Sharif" class="mso-author-avatar" />
              <div class="mso-author-info">
                <span class="mso-author-name">By Mubashar Sharif</span>
                <span class="mso-expert-badge"><span class="mso-check-icon">&#10003;</span> Verified Expert in Outdoor Cutlery</span>
                <p class="mso-author-bio">Mubashar leads MSO gear editorial, testing folding knives and utility gear for Northwoods day-to-day carrying.</p>
              </div>
            </div>
          </div>
        </div>
      </article>

      <!-- CARD 6 -->
      <article class="mso-toptal-card">
        <a href="/understanding-knife-edge-geometry-hollow-grind-vs-flat-grind/" class="mso-card-media">
          <img src="https://www.michigansportsoutdoor.com/wp-content/uploads/2026/03/KNIFE-BLADE-STEELS.jpg" alt="Understanding Knife Edge Geometry Hollow vs Flat Grind" loading="lazy" />
        </a>
        <div class="mso-card-body">
          <div>
            <div class="mso-card-category">BLADE GEOMETRY &gt; TECH EXPLAINER</div>
            <h3 class="mso-card-title">
              <a href="/understanding-knife-edge-geometry-hollow-grind-vs-flat-grind/">Understanding Knife Edge Geometry: Hollow vs Flat Grind</a>
            </h3>
            <p class="mso-card-excerpt">
              Deep dive into slicing efficiency, shoulder wedging drag, and lateral toughness under heavy wood processing and whitetail dressing chores.
            </p>
          </div>
          <div>
            <div class="mso-card-readtime">11-MINUTE READ</div>
            <hr class="mso-card-divider" />
            <div class="mso-author-block">
              <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face" alt="Marcus Thorne" class="mso-author-avatar" />
              <div class="mso-author-info">
                <span class="mso-author-name">By Marcus Thorne</span>
                <span class="mso-expert-badge"><span class="mso-check-icon">&#10003;</span> Verified Expert in Cutlery Design</span>
                <p class="mso-author-bio">Marcus designs custom hunting knives and consults on edge apex stability, micro-chipping resistance, and grinds.</p>
              </div>
            </div>
          </div>
        </div>
      </article>

    </div>
  </section>

  <!-- 5. TOPTAL NEWSLETTER STRIP -->
  <section class="mso-newsletter-bar">
    <h3 class="mso-newsletter-heading">World-class articles, delivered weekly.</h3>
    <div class="mso-newsletter-form-box">
      <form action="/#newsletter-signup" method="POST" onsubmit="alert('Thank you for subscribing to Michigan Sports Outdoor Field Dispatch!'); return false;">
        <div class="mso-form-row">
          <input type="email" placeholder="Enter your email" required class="mso-email-input" />
          <button type="submit" class="mso-submit-btn">Sign Me Up</button>
        </div>
        <p class="mso-privacy-note">
          By entering your email, you are agreeing to our <a href="/privacy-policy/">privacy policy</a>.
        </p>
      </form>
    </div>
  </section>

  <!-- 6. GEAR FEATURED: EXACTLY 1 ROW OF 4 EQUAL HORIZONTAL CARDS (PURE WHITE BACKGROUND) -->
  <section class="mso-ecom-bridge">
    <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; margin-bottom:20px; border-bottom:1px solid #e2e8f0; padding-bottom:12px;">
      <div>
        <span style="font-size:11px; font-weight:800; text-transform:uppercase; letter-spacing:1px; color:#16a34a;">Field Tested &bull; Factory Authentic</span>
        <h3 style="font-size:22px; font-weight:800; color:#0f172a; margin:4px 0 0 0;">Gear Featured in Our Field Guides</h3>
      </div>
      <a href="/shop/" style="font-size:12.5px; font-weight:700; color:#0284c7; text-decoration:none;">View All In-Stock Cutlery &rarr;</a>
    </div>

    <!-- EXACTLY 4 EQUAL CARDS IN 1 HORIZONTAL ROW -->
    <div class="mso-ecom-grid">

      <!-- Product 1 -->
      <div class="mso-ecom-card">
        <div>
          <a href="/product/buck-110-folding-hunter/" class="mso-ecom-img-wrap">
            <img src="https://www.michigansportsoutdoor.com/wp-content/uploads/2026/03/KNIFE-BLADE-STEELS-shapes-for-field-dressing.jpg" alt="Buck 110 Hunter" class="mso-ecom-img" loading="lazy" />
          </a>
          <div style="font-size:10px; font-weight:800; text-transform:uppercase; color:#16a34a; margin-bottom:4px;">Whitetail Classic</div>
          <h4 style="font-size:14px; font-weight:700; color:#0f172a; margin:0 0 8px 0; line-height:1.3;">
            <a href="/product/buck-110-folding-hunter/" style="color:#0f172a; text-decoration:none;">Buck 110 Folding Hunter</a>
          </h4>
        </div>
        <div>
          <div style="font-size:11px; font-weight:700; color:#16a34a; margin-bottom:10px;">&bull; In Stock &bull; Ships Fast</div>
          <a href="/product/buck-110-folding-hunter/" style="display:block; text-align:center; background:#0f172a; color:#ffffff; font-size:12px; font-weight:700; padding:9px 12px; border-radius:5px; text-decoration:none;">View Best Price &rarr;</a>
        </div>
      </div>

      <!-- Product 2 -->
      <div class="mso-ecom-card">
        <div>
          <a href="/product/sharpi-8-in-1-diamond-sharpener/" class="mso-ecom-img-wrap">
            <img src="https://www.michigansportsoutdoor.com/wp-content/uploads/2026/08/SHOD0002.jpg" alt="Sharpi 8-in-1 Sharpener" class="mso-ecom-img" loading="lazy" />
          </a>
          <div style="font-size:10px; font-weight:800; text-transform:uppercase; color:#16a34a; margin-bottom:4px;">Pack Sharpener</div>
          <h4 style="font-size:14px; font-weight:700; color:#0f172a; margin:0 0 8px 0; line-height:1.3;">
            <a href="/product/sharpi-8-in-1-diamond-sharpener/" style="color:#0f172a; text-decoration:none;">Sharpi 8-in-1 Pocket Sharpener</a>
          </h4>
        </div>
        <div>
          <div style="font-size:11px; font-weight:700; color:#16a34a; margin-bottom:10px;">&bull; In Stock &bull; Ships Fast</div>
          <a href="/product/sharpi-8-in-1-diamond-sharpener/" style="display:block; text-align:center; background:#0f172a; color:#ffffff; font-size:12px; font-weight:700; padding:9px 12px; border-radius:5px; text-decoration:none;">View Best Price &rarr;</a>
        </div>
      </div>

      <!-- Product 3 -->
      <div class="mso-ecom-card">
        <div>
          <a href="/product/lansky-turn-box-with-leather-strop-2/" class="mso-ecom-img-wrap">
            <img src="https://www.michigansportsoutdoor.com/wp-content/uploads/2026/05/TB2D2CL.jpg" alt="Lansky Turn-Box System" class="mso-ecom-img" loading="lazy" />
          </a>
          <div style="font-size:10px; font-weight:800; text-transform:uppercase; color:#b45309; margin-bottom:4px;">Camp Sharpener</div>
          <h4 style="font-size:14px; font-weight:700; color:#0f172a; margin:0 0 8px 0; line-height:1.3;">
            <a href="/product/lansky-turn-box-with-leather-strop-2/" style="color:#0f172a; text-decoration:none;">Lansky Turn-Box Strop System</a>
          </h4>
        </div>
        <div>
          <div style="font-size:11px; font-weight:700; color:#16a34a; margin-bottom:10px;">&bull; In Stock &bull; Ships Fast</div>
          <a href="/product/lansky-turn-box-with-leather-strop-2/" style="display:block; text-align:center; background:#0f172a; color:#ffffff; font-size:12px; font-weight:700; padding:9px 12px; border-radius:5px; text-decoration:none;">View Best Price &rarr;</a>
        </div>
      </div>

      <!-- Product 4 -->
      <div class="mso-ecom-card">
        <div>
          <a href="/product/dmt-suregrip-powered-diamond-knif/" class="mso-ecom-img-wrap">
            <img src="https://www.michigansportsoutdoor.com/wp-content/uploads/2026/09/DMT20187.jpg" alt="DMT Diamond Sharpener" class="mso-ecom-img" loading="lazy" />
          </a>
          <div style="font-size:10px; font-weight:800; text-transform:uppercase; color:#0284c7; margin-bottom:4px;">Diamond Bench Hone</div>
          <h4 style="font-size:14px; font-weight:700; color:#0f172a; margin:0 0 8px 0; line-height:1.3;">
            <a href="/product/dmt-suregrip-powered-diamond-knif/" style="color:#0f172a; text-decoration:none;">DMT Diamond Sharpener</a>
          </h4>
        </div>
        <div>
          <div style="font-size:11px; font-weight:700; color:#16a34a; margin-bottom:10px;">&bull; In Stock &bull; Ships Fast</div>
          <a href="/product/dmt-suregrip-powered-diamond-knif/" style="display:block; text-align:center; background:#0f172a; color:#ffffff; font-size:12px; font-weight:700; padding:9px 12px; border-radius:5px; text-decoration:none;">View Best Price &rarr;</a>
        </div>
      </div>

    </div>
  </section>

</div>

<!-- 7. REAL-TIME SEARCH & VOICE RECOGNITION JAVASCRIPT ENGINE -->
<script>
(function() {
  const SEARCH_INDEX = [
    {
      title: "Best Hunting Knives for Michigan Deer Season (2026 Guide)",
      url: "/best-hunting-knives-for-michigan-deer-season-3/",
      type: "Field Guide",
      badgeClass: "mso-type-guide",
      keywords: ["deer", "deer season", "hunting", "hunting knife", "hunting knives", "whitetail", "field dressing", "gutting", "skinning", "michigan deer", "buck"]
    },
    {
      title: "Crucible CPM MagnaCut vs Böhler M390MK: The Super Steel Showdown",
      url: "/cpm-magnacut-vs-bohler-m390mk/",
      type: "Steel Test",
      badgeClass: "mso-type-steel",
      keywords: ["magnacut", "cpm magnacut", "m390", "m390mk", "steel", "steels", "corrosion", "toughness", "rockwell", "edge retention", "blade steel"]
    },
    {
      title: "Best Fixed Blade Hunting Knives 2026: In-Depth Review",
      url: "/best-fixed-blade-hunting-knives-2026-buying-guide/",
      type: "Buyer Guide",
      badgeClass: "mso-type-guide",
      keywords: ["fixed blade", "fixed", "full tang", "drop point", "clip point", "skinner", "hunting knives", "gut hook"]
    },
    {
      title: "Morakniv Companion vs Kansbol vs Garberg Showdown",
      url: "/mora-companion-vs-kansbol-vs-garberg/",
      type: "Bushcraft",
      badgeClass: "mso-type-guide",
      keywords: ["mora", "morakniv", "companion", "kansbol", "garberg", "bushcraft", "camp knife", "scandi", "ferro rod", "batoning"]
    },
    {
      title: "How to Sharpen a Hunting Knife with a Turn-Box at Camp",
      url: "/how-to-sharpen-a-knife-at-home/",
      type: "Maintenance",
      badgeClass: "mso-type-steel",
      keywords: ["sharpen", "sharpening", "turn box", "lansky", "ceramic", "strop", "hone", "razor edge", "bevel", "angle"]
    },
    {
      title: "Top 5 Best EDC Pocket Knives Under $100 for Fall 2026",
      url: "/top-best-edc-knives-under-100/",
      type: "EDC Round-up",
      badgeClass: "mso-type-guide",
      keywords: ["edc", "pocket knife", "folder", "folding knife", "budget knife", "under 100", "daily carry", "d2"]
    },
    {
      title: "Understanding Knife Edge Geometry: Hollow vs Flat Grind",
      url: "/understanding-knife-edge-geometry-hollow-grind-vs-flat-grind/",
      type: "Cutlery Tech",
      badgeClass: "mso-type-steel",
      keywords: ["grind", "hollow grind", "flat grind", "blade geometry", "bevel", "slicing", "geometry", "scandi grind"]
    },
    {
      title: "50-State Knife Laws & Legal Carry Directory (2026 Edition)",
      url: "/knife-laws/",
      type: "Legal Directory",
      badgeClass: "mso-type-guide",
      keywords: ["law", "laws", "knife laws", "legal", "legal carry", "concealed carry", "blade length", "michigan knife laws", "states"]
    },
    {
      title: "Buck 110 Folding Hunter (420HC Paul Bos Heat Treat)",
      url: "/product/buck-110-folding-hunter/",
      type: "In-Stock Gear",
      badgeClass: "mso-type-product",
      keywords: ["buck", "buck 110", "folding hunter", "lockback", "brass bolsters", "420hc"]
    },
    {
      title: "Sharpi 8-in-1 Pocket Diamond Sharpener",
      url: "/product/sharpi-8-in-1-diamond-sharpener/",
      type: "In-Stock Gear",
      badgeClass: "mso-type-product",
      keywords: ["sharpi", "pocket sharpener", "diamond sharpener", "ceramic sharpener"]
    },
    {
      title: "Lansky Turn-Box Crock Stick System with Leather Strop",
      url: "/product/lansky-turn-box-with-leather-strop-2/",
      type: "In-Stock Gear",
      badgeClass: "mso-type-product",
      keywords: ["lansky", "turn box", "crock stick", "leather strop", "wood block sharpener"]
    },
    {
      title: "DMT Diamond SureGrip Bench Sharpener",
      url: "/product/dmt-suregrip-powered-diamond-knif/",
      type: "In-Stock Gear",
      badgeClass: "mso-type-product",
      keywords: ["dmt", "diamond stone", "bench hone", "suregrip"]
    },
    {
      title: "All In-Stock Outdoor Cutlery & Gear Store",
      url: "/shop/",
      type: "Store Hub",
      badgeClass: "mso-type-product",
      keywords: ["shop", "store", "buy", "cutlery", "outdoor gear", "all knives"]
    }
  ];

  const searchInput = document.getElementById('msoSearchInput');
  const dropdown = document.getElementById('msoSearchDropdown');
  const submitBtn = document.getElementById('msoSubmitSearchBtn');
  const micBtn = document.getElementById('msoVoiceBtn');

  if (!searchInput || !dropdown) return;

  function filterSearch(query) {
    const clean = query.trim().toLowerCase();
    if (!clean || clean.length < 2) {
      dropdown.style.display = 'none';
      dropdown.innerHTML = '';
      return [];
    }

    const matches = SEARCH_INDEX.filter(item => {
      const inTitle = item.title.toLowerCase().includes(clean);
      const inKeywords = item.keywords.some(k => k.toLowerCase().includes(clean) || clean.includes(k.toLowerCase()));
      return inTitle || inKeywords;
    });

    return matches;
  }

  function renderDropdown(matches, query) {
    if (!matches || matches.length === 0) {
      dropdown.innerHTML = \`
        <div style="padding:14px 18px; color:#64748b; font-size:13.5px;">
          No direct guide match for "<strong>\${query}</strong>".
          <div style="margin-top:6px;">
            <a href="/shop/?s=\${encodeURIComponent(query)}" style="color:#0284c7; font-weight:700; text-decoration:underline;">
              Search the full MSO Cutlery Catalog for "\${query}" &rarr;
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
        <a href="\${item.url}" class="mso-dropdown-item">
          <div>
            <div class="mso-item-title">\${item.title}</div>
            <div style="font-size:11.5px; color:#64748b; margin-top:2px;">michigansportsoutdoor.com\${item.url}</div>
          </div>
          <span class="mso-item-type \${item.badgeClass}">\${item.type}</span>
        </a>
      \`;
    });

    html += \`
      <div style="background:#f8fafc; padding:10px 18px; border-top:1px solid #e2e8f0; text-align:right;">
        <a href="/shop/?s=\${encodeURIComponent(query)}" style="font-size:12px; font-weight:700; color:#0284c7; text-decoration:none;">
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

  // Close dropdown when clicking outside
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
          searchInput.placeholder = "Listening... Speak now (e.g. deer hunting knives)";
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
        alert("Voice search is supported in Google Chrome and Microsoft Edge on desktop and mobile. Please use typing or update your browser.");
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
      console.log(`Updating WordPress page #${pageId}...`);
      const updateRes = await fetch(`${baseUrl}/wp-json/wp/v2/pages/${pageId}`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          title: 'Michigan Sports Outdoor Blog | Field Guides, Steel Tests & Reviews',
          content: blogHtml,
          status: 'publish'
        })
      });
      const updated = await updateRes.json();
      console.log(`✅ Page updated successfully: ${updated.link}`);
    } else {
      console.log('Creating new page for slug "blog"...');
      const createRes = await fetch(`${baseUrl}/wp-json/wp/v2/pages`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          title: 'Michigan Sports Outdoor Blog | Field Guides, Steel Tests & Reviews',
          slug: 'blog',
          content: blogHtml,
          status: 'publish'
        })
      });
      const created = await createRes.json();
      console.log(`✅ Page created successfully: ${created.link}`);
    }
  } catch (e: any) {
    console.error('Error deploying blog v3:', e.message);
  }
}

deployToptalBlogV3()
  .then(() => process.exit(0))
  .catch(e => {
    console.error(e);
    process.exit(1);
  });
