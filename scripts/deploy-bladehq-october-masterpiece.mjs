import fs from 'fs';

async function deployBladeHQMasterpieceOctoberPage() {
  const baseUrl = 'https://www.michigansportsoutdoor.com';
  const username = 'apiuser';
  const appPassword = 'cvxm Bi7y 6o3y r7HJ M1Wn mSMM';
  const auth = Buffer.from(`${username}:${appPassword}`).toString('base64');
  const headers = {
    Authorization: `Basic ${auth}`,
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
    'Content-Type': 'application/json'
  };

  // CRO-Optimized October Season & Cutlery Visuals
  const imgHero = 'https://www.michigansportsoutdoor.com/wp-content/uploads/2026/09/mso-october-hero-hunting-cutlery-2026.jpg';
  const imgPromo1 = 'https://www.michigansportsoutdoor.com/wp-content/uploads/2026/09/mso-october-whitetail-fixed-blades-promo.jpg';
  const imgPromo2 = 'https://www.michigansportsoutdoor.com/wp-content/uploads/2026/09/mso-october-special-edition-blades-drop.jpg';
  const imgPromo3 = 'https://www.michigansportsoutdoor.com/wp-content/uploads/2026/09/mso-october-fall-hunting-gift-guide-2026.jpg';
  const imgPromo4 = 'https://www.michigansportsoutdoor.com/wp-content/uploads/2026/09/WE18062XA1_add_01.jpg';

  // Category Photos for "What's Your Type?" (6 Vertical Tiles)
  const typePocket = 'https://www.michigansportsoutdoor.com/wp-content/uploads/2026/09/WE18062XA2_add_02.jpg';
  const typeAuto = 'https://www.michigansportsoutdoor.com/wp-content/uploads/2026/09/DTK4518MBL_add_01.jpg';
  const typeOTF = 'https://www.michigansportsoutdoor.com/wp-content/uploads/2026/09/SOGS40BBX_add_01.jpg';
  const typeFixed = 'https://www.michigansportsoutdoor.com/wp-content/uploads/2026/09/VOSA1619_add_01.jpg';
  const typeButterfly = 'https://www.michigansportsoutdoor.com/wp-content/uploads/2026/09/KKNJ394CP_add_01.jpg';
  const typeAll = 'https://www.michigansportsoutdoor.com/wp-content/uploads/2026/09/J1954LMGN_add_01.jpg';

  // Activity Photos for "Knives For Everything You Do" (6 Wide Tiles)
  const actEDC = 'https://www.michigansportsoutdoor.com/wp-content/uploads/2026/09/WE18062XA2_add_02.jpg';
  const actTactical = 'https://www.michigansportsoutdoor.com/wp-content/uploads/2026/09/SOG18300643_add_01.jpg';
  const actHunting = 'https://www.michigansportsoutdoor.com/wp-content/uploads/2026/09/mso-october-whitetail-fixed-blades-promo.jpg';
  const actCamping = 'https://www.michigansportsoutdoor.com/wp-content/uploads/2026/09/mso-october-fall-hunting-gift-guide-2026.jpg';
  const actSurvival = 'https://www.michigansportsoutdoor.com/wp-content/uploads/2026/09/VOSA2628_add_01.jpg';
  const actKitchen = 'https://www.michigansportsoutdoor.com/wp-content/uploads/2025/10/SHUSWTS0600-450x233.jpg';

  // Discover New Knives Products
  const newProd1 = 'https://www.michigansportsoutdoor.com/wp-content/uploads/2026/09/WE18062XA2_add_02.jpg';
  const newProd2 = 'https://www.michigansportsoutdoor.com/wp-content/uploads/2026/09/SOG18300643_add_01.jpg';
  const newProd3 = 'https://www.michigansportsoutdoor.com/wp-content/uploads/2026/09/K1116A4_add_01.jpg';
  const newProd4 = 'https://www.michigansportsoutdoor.com/wp-content/uploads/2026/09/VOSA2628_add_01.jpg';

  // Hot Sales Products
  const saleProd1 = 'https://www.michigansportsoutdoor.com/wp-content/uploads/2026/09/SOG12271157_add_01.jpg';
  const saleProd2 = 'https://www.michigansportsoutdoor.com/wp-content/uploads/2026/09/VOSA4906_add_01.jpg';
  const saleProd3 = 'https://www.michigansportsoutdoor.com/wp-content/uploads/2026/09/SOGS40BBX_add_01.jpg';
  const saleProd4 = 'https://www.michigansportsoutdoor.com/wp-content/uploads/2026/09/J1954LBN_add_01.jpg';

  // Brand Logos
  const brandSpyderco = 'https://www.michigansportsoutdoor.com/wp-content/uploads/2025/11/spyderco-logo1.jpg';
  const brandKershaw = 'https://www.michigansportsoutdoor.com/wp-content/uploads/2025/11/kershaw-logo1.jpg';
  const brand3V = 'https://www.michigansportsoutdoor.com/wp-content/uploads/2025/11/3V_Gear_W1.jpg';
  const brandWE = 'https://www.michigansportsoutdoor.com/wp-content/uploads/2025/11/We-Knife-Co-Ltd_W-150x1081-1.jpg';
  const brandBearEdge = 'https://www.michigansportsoutdoor.com/wp-content/uploads/2025/11/Bear-Edge_W-150x481-1.jpg';
  const brandBoker = 'https://www.michigansportsoutdoor.com/wp-content/uploads/2025/11/211.jpg';
  const brandCivivi = 'https://www.michigansportsoutdoor.com/wp-content/uploads/2025/11/18421.jpg';
  const brandColdSteel = 'https://www.michigansportsoutdoor.com/wp-content/uploads/2025/11/221.jpg';
  const brandMora = 'https://www.michigansportsoutdoor.com/wp-content/uploads/2025/11/1421.jpg';
  const brandSOG = 'https://www.michigansportsoutdoor.com/wp-content/uploads/2025/11/311.jpg';

  // Featured Articles Covers
  const blogHunting = 'https://www.michigansportsoutdoor.com/wp-content/uploads/2026/09/mso-october-whitetail-deer-knife-guide.jpg';
  const blogSharpening = 'https://www.michigansportsoutdoor.com/wp-content/uploads/2026/09/mso-october-knife-sharpening-home-guide.jpg';
  const blogBushcraft = 'https://www.michigansportsoutdoor.com/wp-content/uploads/2026/09/mso-october-morakniv-camp-knife-battle.jpg';
  const blogSteels = 'https://www.michigansportsoutdoor.com/wp-content/uploads/2026/09/WE18062XA1_add_01.jpg';

  const cleanCss = `
html, body, #page, #wrapper, .site, .site-wrapper, .site-content, #content, .content-area, #primary, #main, .site-main, .entry-content, .entry-content-wrap, .page-content, .post-content, .container, .container-wrap, .page-wrapper, .site-main-content { background-color: #ffffff !important; background: #ffffff !important; color: #222222; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; -webkit-font-smoothing: antialiased; }
.entry-content { padding-left: 0 !important; padding-right: 0 !important; max-width: 100% !important; width: 100% !important; overflow-x: hidden; }

.mso-bhq-container { max-width: 1320px; margin: 0 auto; padding: 0 20px 40px 20px; box-sizing: border-box; width: 100%; }

/* 1. Top Notice Bar */
.mso-top-notice { background: #0f172a; color: #ffffff; padding: 8px 20px; display: flex; justify-content: space-between; align-items: center; font-size: 12px; font-weight: 700; border-radius: 4px; margin-bottom: 14px; }
.mso-top-notice a { color: #f5a623; text-decoration: underline; font-weight: 800; }
.mso-notice-arrows { color: #94a3b8; font-weight: 900; letter-spacing: 6px; }

/* 2. Hero Banner (Blade HQ Format) */
.mso-bhq-hero { position: relative; width: 100%; min-height: 420px; border-radius: 8px; overflow: hidden; background: #0f172a url('${imgHero}') center/cover no-repeat; margin-bottom: 24px; box-shadow: 0 8px 24px rgba(0,0,0,0.25); display: flex; align-items: flex-end; padding: 48px 40px; box-sizing: border-box; }
.mso-bhq-hero-overlay { position: absolute; inset: 0; background: linear-gradient(135deg, rgba(15,23,42,0.85) 0%, rgba(15,23,42,0.4) 60%, rgba(15,23,42,0.7) 100%); }
.mso-bhq-hero-content { position: relative; z-index: 2; max-width: 680px; }
.mso-bhq-hero-title { font-size: 46px; font-weight: 900; line-height: 1.05; color: #ffffff; text-transform: uppercase; margin: 0 0 10px 0; letter-spacing: -1px; text-shadow: 0 2px 8px rgba(0,0,0,0.5); }
.mso-bhq-hero-sub { font-size: 18px; color: #e2e8f0; margin: 0 0 24px 0; font-weight: 600; text-shadow: 0 1px 4px rgba(0,0,0,0.4); }
.mso-bhq-hero-action { position: absolute; bottom: 36px; right: 40px; z-index: 2; }
.mso-bhq-hero-btn { background: #ffffff; color: #0066cc !important; font-size: 15px; font-weight: 900; padding: 12px 28px; border-radius: 25px; text-decoration: none; text-transform: uppercase; letter-spacing: 0.5px; box-shadow: 0 4px 14px rgba(0,0,0,0.3); transition: transform 0.2s, background 0.2s, color 0.2s; }
.mso-bhq-hero-btn:hover { background: #f5a623; color: #0f172a !important; transform: scale(1.04); }

/* 3. Brand Logo Strip */
.mso-brand-strip { background: #ffffff; border: 1px solid #e2e8f0; border-radius: 6px; padding: 14px 24px; margin-bottom: 32px; display: flex; align-items: center; justify-content: space-between; gap: 20px; box-shadow: 0 2px 6px rgba(0,0,0,0.03); flex-wrap: wrap; }
.mso-brand-strip-left { font-size: 13px; font-weight: 900; color: #0f172a; text-transform: uppercase; letter-spacing: 0.5px; }
.mso-brand-strip-left span { color: #0066cc; }
.mso-brand-strip-logos { display: flex; align-items: center; gap: 24px; overflow-x: auto; scrollbar-width: none; }
.mso-brand-strip-logos img { height: 26px; width: auto; object-fit: contain; filter: grayscale(100%); opacity: 0.8; transition: filter 0.2s, opacity 0.2s; }
.mso-brand-strip-logos img:hover { filter: grayscale(0%); opacity: 1; }
.mso-all-brands-link { font-size: 12.5px; font-weight: 800; color: #0066cc; text-decoration: none; white-space: nowrap; border-bottom: 2px solid #0066cc; }

/* 4. Section Titles (Blade HQ Pattern) */
.mso-bhq-section-header { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 6px; }
.mso-bhq-title-bold { font-size: 26px; font-weight: 900; color: #0f172a; margin: 0; }
.mso-bhq-title-italic { font-style: italic; font-weight: 800; color: #475569; }
.mso-bhq-subtitle { font-size: 13px; color: #64748b; font-style: italic; margin: 0 0 18px 0; }
.mso-bhq-view-all-pill { background: #e2e8f0; color: #334155; font-size: 11.5px; font-weight: 800; padding: 4px 14px; border-radius: 14px; text-decoration: none; transition: background 0.2s, color 0.2s; }
.mso-bhq-view-all-pill:hover { background: #0066cc; color: #ffffff; }

/* 5. Opportunities Too Good To Miss (4 Cards) */
.mso-opps-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 36px; }
.mso-opp-card { position: relative; height: 310px; border-radius: 8px; overflow: hidden; display: flex; flex-direction: column; justify-content: flex-end; padding: 20px; box-sizing: border-box; text-decoration: none; box-shadow: 0 4px 12px rgba(0,0,0,0.1); transition: transform 0.2s, box-shadow 0.2s; }
.mso-opp-card:hover { transform: translateY(-4px); box-shadow: 0 8px 24px rgba(0,0,0,0.18); }
.mso-opp-card.card-1 { background: linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.85) 100%), url('${imgPromo1}') center/cover no-repeat; }
.mso-opp-card.card-2 { background: linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.85) 100%), url('${imgPromo2}') center/cover no-repeat; }
.mso-opp-card.card-3 { background: linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.85) 100%), url('${imgPromo3}') center/cover no-repeat; }
.mso-opp-card.card-4 { background: linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.85) 100%), url('${imgPromo4}') center/cover no-repeat; }
.mso-opp-badge { align-self: flex-start; background: #0066cc; color: #ffffff; font-size: 10px; font-weight: 900; text-transform: uppercase; padding: 3px 8px; border-radius: 4px; margin-bottom: auto; }
.mso-opp-badge.orange { background: #ea580c; }
.mso-opp-badge.gold { background: #f5a623; color: #0f172a; }
.mso-opp-title { font-size: 20px; font-weight: 900; color: #ffffff; text-transform: uppercase; margin: 0 0 6px 0; line-height: 1.15; }
.mso-opp-link { font-size: 13px; font-weight: 800; color: #f5a623; text-decoration: underline; text-underline-offset: 3px; }

/* 6. Product Rows (Discover, Hot Sales, Fan Favorites) */
.mso-bhq-prod-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 36px; }
.mso-bhq-prod-card { background: #ffffff; border: 1px solid #e2e8f0; border-radius: 6px; padding: 16px; display: flex; flex-direction: column; position: relative; box-shadow: 0 1px 4px rgba(0,0,0,0.03); transition: border-color 0.2s, box-shadow 0.2s; text-decoration: none; }
.mso-bhq-prod-card:hover { border-color: #cbd5e1; box-shadow: 0 6px 16px rgba(0,0,0,0.08); }
.mso-bhq-prod-img { width: 100%; height: 160px; object-fit: contain; margin-bottom: 12px; transition: transform 0.2s; }
.mso-bhq-prod-card:hover .mso-bhq-prod-img { transform: scale(1.05); }
.mso-bhq-prod-stars { font-size: 11px; font-weight: 700; color: #f5a623; margin-bottom: 6px; }
.mso-bhq-prod-stars span { color: #64748b; font-weight: 500; }
.mso-bhq-prod-title { font-size: 13px; font-weight: 700; color: #0f172a; line-height: 1.35; margin: 0 0 10px 0; min-height: 36px; }
.mso-bhq-prod-bottom { display: flex; justify-content: space-between; align-items: center; margin-top: auto; }
.mso-bhq-prod-price { font-size: 16px; font-weight: 900; color: #0f172a; }
.mso-bhq-add-cart-btn { background: #f97316; color: #ffffff; font-size: 11.5px; font-weight: 800; padding: 6px 12px; border-radius: 4px; border: none; cursor: pointer; text-transform: uppercase; transition: background 0.2s; }
.mso-bhq-add-cart-btn:hover { background: #ea580c; }

/* 7. Category Photo Grids ("What's Your Type?" & "Knives For Everything You Do") */
.mso-type-grid { display: grid; grid-template-columns: repeat(6, 1fr); gap: 12px; margin-bottom: 36px; }
.mso-type-card { position: relative; height: 210px; border-radius: 6px; overflow: hidden; text-decoration: none; box-shadow: 0 2px 6px rgba(0,0,0,0.08); }
.mso-type-card img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.3s; }
.mso-type-card:hover img { transform: scale(1.08); }
.mso-type-label { position: absolute; bottom: 0; left: 0; right: 0; background: rgba(0,0,0,0.85); color: #ffffff; font-size: 12px; font-weight: 900; text-transform: uppercase; text-align: center; padding: 8px 4px; letter-spacing: 0.5px; }

/* 8. Full Width Blue Banner (Free Shipping) */
.mso-blue-banner { background: #0066cc; color: #ffffff; padding: 18px 24px; border-radius: 6px; text-align: center; font-size: 15px; font-weight: 900; margin-bottom: 36px; letter-spacing: 0.5px; box-shadow: 0 4px 12px rgba(0,102,204,0.25); }

/* 9. Knife Dreams Delivered (Customer Reviews Blue Box) */
.mso-review-showcase { background: #083b66; color: #ffffff; border-radius: 8px; padding: 32px 36px; margin-bottom: 36px; display: grid; grid-template-columns: 260px 1fr; gap: 32px; align-items: center; }
.mso-review-showcase-title { font-size: 26px; font-weight: 900; line-height: 1.15; color: #ffffff; margin: 0 0 8px 0; }
.mso-review-showcase-sub { font-size: 13px; color: #bfdbfe; margin: 0; line-height: 1.45; }
.mso-reviews-cards-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
.mso-review-bubble { background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); border-radius: 6px; padding: 18px; display: flex; flex-direction: column; justify-content: space-between; }
.mso-review-stars-gold { color: #f5a623; font-size: 12px; margin-bottom: 6px; }
.mso-review-bubble-title { font-size: 13.5px; font-weight: 800; color: #ffffff; margin: 0 0 6px 0; }
.mso-review-bubble-text { font-size: 12px; color: #e2e8f0; line-height: 1.45; margin: 0 0 12px 0; font-style: italic; }
.mso-review-bubble-author { font-size: 11px; font-weight: 800; color: #93c5fd; text-transform: uppercase; }

/* 10. Big 4 Icons Trust Strip */
.mso-big-trust-strip { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; text-align: center; margin-bottom: 40px; padding: 20px 0; border-bottom: 1px solid #e2e8f0; }
.mso-big-trust-item { display: flex; flex-direction: column; align-items: center; }
.mso-big-trust-badge { width: 48px; height: 48px; border-radius: 50%; background: #e0f2fe; color: #0066cc; display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 900; margin-bottom: 12px; }
.mso-big-trust-heading { font-size: 15px; font-weight: 800; color: #0f172a; margin: 0 0 6px 0; }
.mso-big-trust-p { font-size: 12px; color: #64748b; line-height: 1.45; margin: 0; max-width: 240px; }

/* 11. Featured Videos (YouTube Embeds) */
.mso-videos-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 40px; }
.mso-video-card { position: relative; height: 180px; border-radius: 6px; overflow: hidden; display: flex; flex-direction: column; justify-content: flex-end; padding: 14px; text-decoration: none; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
.mso-video-card img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
.mso-video-overlay { position: absolute; inset: 0; background: linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.85) 100%); }
.mso-play-btn { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 44px; height: 44px; background: #dc2626; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #ffffff; font-size: 16px; font-weight: 900; box-shadow: 0 4px 12px rgba(0,0,0,0.4); z-index: 2; }
.mso-video-title { position: relative; z-index: 2; font-size: 13px; font-weight: 800; color: #ffffff; margin: 0; line-height: 1.25; text-transform: uppercase; }

/* 12. Featured Articles */
.mso-articles-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 40px; }
.mso-article-card { background: #ffffff; border: 1px solid #e2e8f0; border-radius: 6px; overflow: hidden; display: flex; flex-direction: column; text-decoration: none; box-shadow: 0 2px 6px rgba(0,0,0,0.03); transition: transform 0.2s; }
.mso-article-card:hover { transform: translateY(-3px); }
.mso-article-img { width: 100%; height: 135px; object-fit: cover; }
.mso-article-body { padding: 14px; display: flex; flex-direction: column; flex: 1; }
.mso-article-title { font-size: 13.5px; font-weight: 800; color: #0f172a; margin: 0 0 12px 0; line-height: 1.35; }
.mso-article-btn { background: #0066cc; color: #ffffff !important; font-size: 11px; font-weight: 800; padding: 6px 14px; border-radius: 4px; text-transform: uppercase; width: fit-content; margin-top: auto; }

/* 13. Blade Club VIP Banner */
.mso-blade-club-footer { background: linear-gradient(135deg, #0b223c 0%, #0066cc 100%); color: #ffffff; border-radius: 8px; padding: 32px 40px; display: grid; grid-template-columns: 1fr 1fr; gap: 32px; align-items: center; box-shadow: 0 8px 24px rgba(0,102,204,0.25); }
.mso-club-left-title { font-size: 28px; font-weight: 900; letter-spacing: 0.5px; margin: 0 0 8px 0; }
.mso-club-left-title span { color: #f5a623; }
.mso-club-left-sub { font-size: 14px; color: #e2e8f0; margin: 0 0 18px 0; }
.mso-club-btn { background: #ffffff; color: #0066cc !important; font-size: 13px; font-weight: 900; padding: 10px 24px; border-radius: 20px; text-transform: uppercase; text-decoration: none; display: inline-block; }
.mso-club-right-perks { display: flex; flex-direction: column; gap: 12px; }
.mso-club-perk { display: flex; align-items: center; gap: 12px; font-size: 14px; font-weight: 800; color: #ffffff; }
.mso-club-perk-badge { width: 28px; height: 28px; border-radius: 50%; background: rgba(255,255,255,0.2); display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 900; color: #f5a623; }

@media (max-width: 1080px) {
  .mso-opps-grid { grid-template-columns: repeat(2, 1fr); }
  .mso-bhq-prod-row { grid-template-columns: repeat(2, 1fr); }
  .mso-type-grid { grid-template-columns: repeat(3, 1fr); }
  .mso-review-showcase { grid-template-columns: 1fr; }
  .mso-reviews-cards-row { grid-template-columns: 1fr; }
  .mso-big-trust-strip { grid-template-columns: repeat(2, 1fr); gap: 24px; }
  .mso-videos-grid { grid-template-columns: repeat(2, 1fr); }
  .mso-articles-grid { grid-template-columns: repeat(2, 1fr); }
  .mso-blade-club-footer { grid-template-columns: 1fr; }
}
@media (max-width: 680px) {
  .mso-bhq-hero { padding: 32px 20px; min-height: 340px; }
  .mso-bhq-hero-title { font-size: 28px; }
  .mso-bhq-hero-action { position: relative; bottom: auto; right: auto; margin-top: 16px; }
  .mso-opps-grid { grid-template-columns: 1fr; }
  .mso-bhq-prod-row { grid-template-columns: 1fr; }
  .mso-type-grid { grid-template-columns: repeat(2, 1fr); }
  .mso-big-trust-strip { grid-template-columns: 1fr; }
  .mso-videos-grid { grid-template-columns: 1fr; }
  .mso-articles-grid { grid-template-columns: 1fr; }
}
`;

  const pageHtml = `
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://www.michigansportsoutdoor.com/#website",
      "url": "https://www.michigansportsoutdoor.com/october-season/",
      "name": "Michigan Sports Outdoor",
      "description": "Premier Cutlery, Hunting Fixed Blades, EDC Knives & Outdoor Gear Outfitter",
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

<style>${cleanCss.replace(/\r?\n|\r/g, ' ').trim()}</style>

<div class="mso-bhq-container">
  <!-- 1. TOP NOTICE BAR -->
  <div class="mso-top-notice">
    <span class="mso-notice-arrows">&lt;</span>
    <span>Get $5 for FREE! - <a href="https://www.michigansportsoutdoor.com/my-account/">Sign up for MSO Blade Club Today!</a> | October Whitetail Season Opener Live</span>
    <span class="mso-notice-arrows">&gt;</span>
  </div>

  <!-- 2. HERO BANNER (BLADE HQ EXACT PATTERN) -->
  <section class="mso-bhq-hero">
    <div class="mso-bhq-hero-overlay"></div>
    <div class="mso-bhq-hero-content">
      <h1 class="mso-bhq-hero-title">DON'T BUY A BAD KNIFE.<br/>GET IT RIGHT THE FIRST TIME.</h1>
      <p class="mso-bhq-hero-sub">Field-tested Whitetail hunting blades, super steel cutlery, and October camp essentials.</p>
    </div>
    <div class="mso-bhq-hero-action">
      <a href="https://www.michigansportsoutdoor.com/shop/" class="mso-bhq-hero-btn">See The Winners</a>
    </div>
  </section>

  <!-- 3. BRAND LOGO STRIP -->
  <section class="mso-brand-strip">
    <div class="mso-brand-strip-left">
      THE BEST KNIVES &amp; THE BEST SERVICE ONLY AT <span>MICHIGAN SPORTS OUTDOOR</span>
    </div>
    <div class="mso-brand-strip-logos">
      <a href="https://www.michigansportsoutdoor.com/brand/spyderco/"><img src="${brandSpyderco}" alt="Spyderco" /></a>
      <a href="https://www.michigansportsoutdoor.com/brand/kershaw/"><img src="${brandKershaw}" alt="Kershaw" /></a>
      <a href="https://www.michigansportsoutdoor.com/brand/3v-gear/"><img src="${brand3V}" alt="3V Gear" /></a>
      <a href="https://www.michigansportsoutdoor.com/brand/we-knife-co-ltd/"><img src="${brandWE}" alt="WE Knife" /></a>
      <a href="https://www.michigansportsoutdoor.com/brand/bear-edge/"><img src="${brandBearEdge}" alt="Bear Edge" /></a>
      <a href="https://www.michigansportsoutdoor.com/brand/boker/"><img src="${brandBoker}" alt="Boker" /></a>
      <a href="https://www.michigansportsoutdoor.com/brand/civivi/"><img src="${brandCivivi}" alt="Civivi" /></a>
      <a href="https://www.michigansportsoutdoor.com/brand/cold-steel/"><img src="${brandColdSteel}" alt="Cold Steel" /></a>
      <a href="https://www.michigansportsoutdoor.com/brand/mora/"><img src="${brandMora}" alt="Morakniv" /></a>
      <a href="https://www.michigansportsoutdoor.com/brand/sog/"><img src="${brandSOG}" alt="SOG" /></a>
    </div>
    <a href="https://www.michigansportsoutdoor.com/brands/" class="mso-all-brands-link">All Brands</a>
  </section>

  <!-- 4. OPPORTUNITIES TOO GOOD TO MISS (4 VERTICAL PROMO CARDS) -->
  <section>
    <div class="mso-bhq-section-header">
      <h2 class="mso-bhq-title-bold">Opportunities <span class="mso-bhq-title-italic">Too Good</span> To Miss</h2>
    </div>
    <p class="mso-bhq-subtitle">Limited time steals and deals that cut deep.</p>
    <div class="mso-opps-grid">
      <a href="https://www.michigansportsoutdoor.com/collections/knives/hunting-knife-sets/" class="mso-opp-card card-1">
        <span class="mso-opp-badge">OCTOBER WHITETAIL</span>
        <h3 class="mso-opp-title">Fixed Blades for Field Dressing</h3>
        <span class="mso-opp-link">Shop Now -></span>
      </a>

      <a href="https://www.michigansportsoutdoor.com/shop/" class="mso-opp-card card-2">
        <span class="mso-opp-badge orange">NEW ARRIVAL</span>
        <h3 class="mso-opp-title">Halloween Special Dark Drop</h3>
        <span class="mso-opp-link">Shop Now -></span>
      </a>

      <a href="https://www.michigansportsoutdoor.com/collections/camping-and-survival/" class="mso-opp-card card-3">
        <span class="mso-opp-badge gold">CAMP CRAFT</span>
        <h3 class="mso-opp-title">Fall Bushcraft &amp; Survival</h3>
        <span class="mso-opp-link">Shop Now -></span>
      </a>

      <a href="https://www.michigansportsoutdoor.com/shop/" class="mso-opp-card card-4">
        <span class="mso-opp-badge">SUPER STEELS</span>
        <h3 class="mso-opp-title">CPM MagnaCut &amp; M390 Cutlery</h3>
        <span class="mso-opp-link">Shop Now -></span>
      </a>
    </div>
  </section>

  <!-- 5. DISCOVER NEW KNIVES (PRODUCT ROW) -->
  <section>
    <div class="mso-bhq-section-header">
      <h2 class="mso-bhq-title-bold">DISCOVER NEW KNIVES</h2>
      <a href="https://www.michigansportsoutdoor.com/shop/" class="mso-bhq-view-all-pill">View All New Arrivals</a>
    </div>
    <div class="mso-bhq-prod-row">
      <a href="https://www.michigansportsoutdoor.com/shop/" class="mso-bhq-prod-card">
        <img src="${newProd1}" alt="WE Knife Titanium Super Steel" class="mso-bhq-prod-img" loading="lazy" />
        <h4 class="mso-bhq-prod-title">WE Knife Co. High-Fin Titanium CPM-20CV Drop Point</h4>
        <div class="mso-bhq-prod-bottom">
          <span class="mso-bhq-prod-price">$268.00</span>
          <button class="mso-bhq-add-cart-btn">Add to Cart</button>
        </div>
      </a>

      <a href="https://www.michigansportsoutdoor.com/shop/" class="mso-bhq-prod-card">
        <img src="${newProd2}" alt="SOG Cryo D2 Tanto" class="mso-bhq-prod-img" loading="lazy" />
        <h4 class="mso-bhq-prod-title">SOG Aegis AT Cryo D2 Assisted Tactical Folder</h4>
        <div class="mso-bhq-prod-bottom">
          <span class="mso-bhq-prod-price">$89.95</span>
          <button class="mso-bhq-add-cart-btn">Add to Cart</button>
        </div>
      </a>

      <a href="https://www.michigansportsoutdoor.com/shop/" class="mso-bhq-prod-card">
        <img src="${newProd3}" alt="Kizer Drop Bear" class="mso-bhq-prod-img" loading="lazy" />
        <h4 class="mso-bhq-prod-title">Kizer Clutch AXIS Lock Satin 154CM Everyday Folder</h4>
        <div class="mso-bhq-prod-bottom">
          <span class="mso-bhq-prod-price">$129.00</span>
          <button class="mso-bhq-add-cart-btn">Add to Cart</button>
        </div>
      </a>

      <a href="https://www.michigansportsoutdoor.com/shop/" class="mso-bhq-prod-card">
        <img src="${newProd4}" alt="Viper MagnaCut Fixed Blade" class="mso-bhq-prod-img" loading="lazy" />
        <h4 class="mso-bhq-prod-title">Viper Berus CPM MagnaCut High-Toughness Hunting Fixed</h4>
        <div class="mso-bhq-prod-bottom">
          <span class="mso-bhq-prod-price">$174.00</span>
          <button class="mso-bhq-add-cart-btn">Add to Cart</button>
        </div>
      </a>
    </div>
  </section>

  <!-- 6. WHAT'S YOUR TYPE? (6 TALL CATEGORY TILES) -->
  <section>
    <div class="mso-bhq-section-header">
      <h2 class="mso-bhq-title-bold">What's <span class="mso-bhq-title-italic">Your Type?</span></h2>
    </div>
    <p class="mso-bhq-subtitle">From folding knives to fixed blades, find the knife that speaks to your cutting soul.</p>
    <div class="mso-type-grid">
      <a href="https://www.michigansportsoutdoor.com/collections/knives/locking-knives/" class="mso-type-card">
        <img src="${typePocket}" alt="Pocket Knives" loading="lazy" />
        <div class="mso-type-label">POCKET KNIVES</div>
      </a>

      <a href="https://www.michigansportsoutdoor.com/shop/" class="mso-type-card">
        <img src="${typeAuto}" alt="Automatic Knives" loading="lazy" />
        <div class="mso-type-label">AUTOMATIC KNIVES</div>
      </a>

      <a href="https://www.michigansportsoutdoor.com/shop/" class="mso-type-card">
        <img src="${typeOTF}" alt="Tactical Blades" loading="lazy" />
        <div class="mso-type-label">TACTICAL BLADES</div>
      </a>

      <a href="https://www.michigansportsoutdoor.com/collections/knives/hunting-knife-sets/" class="mso-type-card">
        <img src="${typeFixed}" alt="Fixed Blades" loading="lazy" />
        <div class="mso-type-label">FIXED BLADES</div>
      </a>

      <a href="https://www.michigansportsoutdoor.com/collections/knives/premium-knives/" class="mso-type-card">
        <img src="${typeButterfly}" alt="Custom Cutlery" loading="lazy" />
        <div class="mso-type-label">PREMIUM CUTLERY</div>
      </a>

      <a href="https://www.michigansportsoutdoor.com/shop/" class="mso-type-card">
        <img src="${typeAll}" alt="All Knives" loading="lazy" />
        <div class="mso-type-label">ALL KNIVES</div>
      </a>
    </div>
  </section>

  <!-- 7. FULL WIDTH BLUE FREE SHIPPING BANNER -->
  <div class="mso-blue-banner">
    FREE SHIPPING: All domestic USA orders ship for free when you spend $99 or more.
  </div>

  <!-- 8. HOT SALES & FAN FAVORITES (PRODUCT ROWS) -->
  <section>
    <div class="mso-bhq-section-header">
      <h2 class="mso-bhq-title-bold">HOT SALES</h2>
      <a href="https://www.michigansportsoutdoor.com/shop/" class="mso-bhq-view-all-pill">View All Sales</a>
    </div>
    <div class="mso-bhq-prod-row">
      <a href="https://www.michigansportsoutdoor.com/shop/" class="mso-bhq-prod-card">
        <img src="${saleProd1}" alt="SOG Seal FX" class="mso-bhq-prod-img" loading="lazy" />
        <div class="mso-bhq-prod-stars">Rating: 4.9/5 <span>(31)</span></div>
        <h4 class="mso-bhq-prod-title">SOG Seal FX Fixed Blade Tanto CPM-S35VN</h4>
        <div class="mso-bhq-prod-bottom">
          <span class="mso-bhq-prod-price">$189.95</span>
          <button class="mso-bhq-add-cart-btn">Add to Cart</button>
        </div>
      </a>

      <a href="https://www.michigansportsoutdoor.com/shop/" class="mso-bhq-prod-card">
        <img src="${saleProd2}" alt="Viper Dan 2" class="mso-bhq-prod-img" loading="lazy" />
        <div class="mso-bhq-prod-stars">Rating: 4.8/5 <span>(14)</span></div>
        <h4 class="mso-bhq-prod-title">Viper Dan 2 Action Slipjoint N690 Steel Folder</h4>
        <div class="mso-bhq-prod-bottom">
          <span class="mso-bhq-prod-price">$124.00</span>
          <button class="mso-bhq-add-cart-btn">Add to Cart</button>
        </div>
      </a>

      <a href="https://www.michigansportsoutdoor.com/shop/" class="mso-bhq-prod-card">
        <img src="${saleProd3}" alt="SOG Pentagon OTF" class="mso-bhq-prod-img" loading="lazy" />
        <div class="mso-bhq-prod-stars">Rating: 5.0/5 <span>(88)</span></div>
        <h4 class="mso-bhq-prod-title">SOG Pentagon Dual Edge Cryo CTS-XHP Blackout</h4>
        <div class="mso-bhq-prod-bottom">
          <span class="mso-bhq-prod-price">$249.95</span>
          <button class="mso-bhq-add-cart-btn">Add to Cart</button>
        </div>
      </a>

      <a href="https://www.michigansportsoutdoor.com/shop/" class="mso-bhq-prod-card">
        <img src="${saleProd4}" alt="Boker Plus Tech City" class="mso-bhq-prod-img" loading="lazy" />
        <div class="mso-bhq-prod-stars">Rating: 4.7/5 <span>(52)</span></div>
        <h4 class="mso-bhq-prod-title">Boker Plus City Tool 12C27 Multi-Blade Pocket Slicer</h4>
        <div class="mso-bhq-prod-bottom">
          <span class="mso-bhq-prod-price">$44.95</span>
          <button class="mso-bhq-add-cart-btn">Add to Cart</button>
        </div>
      </a>
    </div>
  </section>

  <!-- 9. KNIVES FOR EVERYTHING YOU DO (6 WIDE ACTIVITY TILES) -->
  <section>
    <div class="mso-bhq-section-header">
      <h2 class="mso-bhq-title-bold">Knives For <span class="mso-bhq-title-italic">Everything</span> You Do</h2>
    </div>
    <p class="mso-bhq-subtitle">Whether it's work, play, survival, or Tuesday dinner, there's a knife for that.</p>
    <div class="mso-type-grid">
      <a href="https://www.michigansportsoutdoor.com/collections/knives/locking-knives/" class="mso-type-card">
        <img src="${actEDC}" alt="Everyday Carry" loading="lazy" />
        <div class="mso-type-label">EVERYDAY CARRY</div>
      </a>

      <a href="https://www.michigansportsoutdoor.com/shop/" class="mso-type-card">
        <img src="${actTactical}" alt="Tactical" loading="lazy" />
        <div class="mso-type-label">TACTICAL</div>
      </a>

      <a href="https://www.michigansportsoutdoor.com/collections/knives/hunting-knife-sets/" class="mso-type-card">
        <img src="${actHunting}" alt="Hunting" loading="lazy" />
        <div class="mso-type-label">HUNTING</div>
      </a>

      <a href="https://www.michigansportsoutdoor.com/collections/camping-and-survival/" class="mso-type-card">
        <img src="${actCamping}" alt="Camping" loading="lazy" />
        <div class="mso-type-label">CAMPING</div>
      </a>

      <a href="https://www.michigansportsoutdoor.com/shop/" class="mso-type-card">
        <img src="${actSurvival}" alt="Survival" loading="lazy" />
        <div class="mso-type-label">SURVIVAL</div>
      </a>

      <a href="https://www.michigansportsoutdoor.com/collections/kitchen/" class="mso-type-card">
        <img src="${actKitchen}" alt="Kitchen" loading="lazy" />
        <div class="mso-type-label">KITCHEN</div>
      </a>
    </div>
  </section>

  <!-- 10. KNIFE DREAMS DELIVERED (CUSTOMER REVIEWS BLUE BOX) -->
  <section class="mso-review-showcase">
    <div>
      <h3 class="mso-review-showcase-title">Knife Dreams, Delivered</h3>
      <p class="mso-review-showcase-sub">Here is what our happy sportsmen and blade collectors have to say.</p>
    </div>
    <div class="mso-reviews-cards-row">
      <div class="mso-review-bubble">
        <div>
          <div class="mso-review-stars-gold">Rating: 5.0 / 5.0</div>
          <h4 class="mso-review-bubble-title">Great knife &amp; fast delivery</h4>
          <p class="mso-review-bubble-text">"Ordered Friday morning, on my hip Monday afternoon in Northern Michigan. Genuine Benchmade with official papers."</p>
        </div>
        <span class="mso-review-bubble-author">- Dan Q. (Verified Buyer)</span>
      </div>

      <div class="mso-review-bubble">
        <div>
          <div class="mso-review-stars-gold">Rating: 5.0 / 5.0</div>
          <h4 class="mso-review-bubble-title">Never a disappointment</h4>
          <p class="mso-review-bubble-text">"Used the Buck 110 on my archery whitetail opener. Razor edge through the entire field dressing. Excellent store."</p>
        </div>
        <span class="mso-review-bubble-author">- Andrew S. (Verified Buyer)</span>
      </div>

      <div class="mso-review-bubble">
        <div>
          <div class="mso-review-stars-gold">Rating: 5.0 / 5.0</div>
          <h4 class="mso-review-bubble-title">Unique drop &amp; sharp edge</h4>
          <p class="mso-review-bubble-text">"Special drop blade arrived faster than expected. Collector-grade packaging with zero blade play. Highly recommended."</p>
        </div>
        <span class="mso-review-bubble-author">- Ryan B. (Verified Buyer)</span>
      </div>
    </div>
  </section>

  <!-- 11. BIG 4 ICONS TRUST STRIP -->
  <section class="mso-big-trust-strip">
    <div class="mso-big-trust-item">
      <div class="mso-big-trust-badge">HELP</div>
      <h4 class="mso-big-trust-heading">Your Questions Answered</h4>
      <p class="mso-big-trust-p">Real sportsmen. Real help. We know blades like the back of our hands.</p>
    </div>

    <div class="mso-big-trust-item">
      <div class="mso-big-trust-badge">FAST</div>
      <h4 class="mso-big-trust-heading">Lightning-Fast Shipping</h4>
      <p class="mso-big-trust-p">We move fast. Packed with care and shipped same-day from Michigan warehouse.</p>
    </div>

    <div class="mso-big-trust-item">
      <div class="mso-big-trust-badge">EASY</div>
      <h4 class="mso-big-trust-heading">Hassle-Free Returns</h4>
      <p class="mso-big-trust-p">Changed your mind? No sweat. 30-day returns as smooth as knife lube.</p>
    </div>

    <div class="mso-big-trust-item">
      <div class="mso-big-trust-badge">COMM</div>
      <h4 class="mso-big-trust-heading">Sportsman Community</h4>
      <p class="mso-big-trust-p">First timers, whitetail hunters, collectors. 40,000+ strong outfitter crew.</p>
    </div>
  </section>

  <!-- 12. FEATURED VIDEOS (YOUTUBE EMBEDS FROM USER) -->
  <section>
    <div class="mso-bhq-section-header">
      <h2 class="mso-bhq-title-bold">Featured Videos</h2>
      <a href="https://www.youtube.com/@michigansportsoutdoor" class="mso-bhq-view-all-pill">View All Videos</a>
    </div>
    <div class="mso-videos-grid">
      <a href="https://youtu.be/1g7YUygu25Q?si=FJoFj217M-HJGjx0" target="_blank" rel="noopener" class="mso-video-card">
        <img src="https://img.youtube.com/vi/1g7YUygu25Q/hqdefault.jpg" alt="Folder or Fixed Blade" />
        <div class="mso-video-overlay"></div>
        <div class="mso-play-btn">&gt;</div>
        <h4 class="mso-video-title">Folder or Fixed Blade For Hunting?</h4>
      </a>

      <a href="https://youtu.be/anoQ0XG-_O4?si=1-tHKp5G8rJ5ORZk" target="_blank" rel="noopener" class="mso-video-card">
        <img src="https://img.youtube.com/vi/anoQ0XG-_O4/hqdefault.jpg" alt="You Dont Need MagnaCut" />
        <div class="mso-video-overlay"></div>
        <div class="mso-play-btn">&gt;</div>
        <h4 class="mso-video-title">You Don't Need MagnaCut! Super Steels Tested</h4>
      </a>

      <a href="https://www.michigansportsoutdoor.com/blog/" class="mso-video-card">
        <img src="${imgPromo1}" alt="Low Maintenance Knives" />
        <div class="mso-video-overlay"></div>
        <div class="mso-play-btn">&gt;</div>
        <h4 class="mso-video-title">Low Maintenance Steels for Fall Camp</h4>
      </a>

      <a href="https://www.michigansportsoutdoor.com/blog/" class="mso-video-card">
        <img src="${imgPromo3}" alt="Crazy Knife Stories" />
        <div class="mso-video-overlay"></div>
        <div class="mso-play-btn">&gt;</div>
        <h4 class="mso-video-title">Whitetail Field Sharpening Guide</h4>
      </a>
    </div>
  </section>

  <!-- 13. FEATURED ARTICLES -->
  <section>
    <div class="mso-bhq-section-header">
      <h2 class="mso-bhq-title-bold">Featured Articles</h2>
      <a href="https://www.michigansportsoutdoor.com/blog/" class="mso-bhq-view-all-pill">View All Articles</a>
    </div>
    <div class="mso-articles-grid">
      <a href="https://www.michigansportsoutdoor.com/best-hunting-knives-for-michigan-deer-season-3/" class="mso-article-card">
        <img src="${blogHunting}" alt="Best Hunting Knives for Michigan Deer Season" class="mso-article-img" loading="lazy" />
        <div class="mso-article-body">
          <h4 class="mso-article-title">Best Hunting Knives for Michigan Deer Season (2026 Field Guide)</h4>
          <span class="mso-article-btn">Read Article</span>
        </div>
      </a>

      <a href="https://www.michigansportsoutdoor.com/how-to-sharpen-a-knife-at-home/" class="mso-article-card">
        <img src="${blogSharpening}" alt="How to Sharpen a Knife at Home" class="mso-article-img" loading="lazy" />
        <div class="mso-article-body">
          <h4 class="mso-article-title">How to Sharpen a Knife at Home: Complete Guide</h4>
          <span class="mso-article-btn">Read Article</span>
        </div>
      </a>

      <a href="https://www.michigansportsoutdoor.com/mora-companion-vs-kansbol-vs-garberg/" class="mso-article-card">
        <img src="${blogBushcraft}" alt="Morakniv Companion vs Kansbol vs Garberg" class="mso-article-img" loading="lazy" />
        <div class="mso-article-body">
          <h4 class="mso-article-title">Morakniv Companion vs Kansbol vs Garberg: Camp Knife Battle</h4>
          <span class="mso-article-btn">Read Article</span>
        </div>
      </a>

      <a href="https://www.michigansportsoutdoor.com/blog/" class="mso-article-card">
        <img src="${blogSteels}" alt="CPM MagnaCut vs M390MK" class="mso-article-img" loading="lazy" />
        <div class="mso-article-body">
          <h4 class="mso-article-title">Crucible CPM MagnaCut vs Böhler M390: Steel Showdown</h4>
          <span class="mso-article-btn">Read Article</span>
        </div>
      </a>
    </div>
  </section>

  <!-- 14. MSO BLADE CLUB VIP FOOTER BANNER -->
  <section class="mso-blade-club-footer">
    <div>
      <h3 class="mso-club-left-title">BLADE <span>CLUB</span></h3>
      <p class="mso-club-left-sub">Be sharp, get rewarded for loving knives &amp; backcountry gear... for FREE!</p>
      <a href="https://www.michigansportsoutdoor.com/my-account/" class="mso-club-btn">Learn More</a>
    </div>
    <div class="mso-club-right-perks">
      <div class="mso-club-perk">
        <div class="mso-club-perk-badge">*</div>
        <span>1,000 Point Sign-up Bonus</span>
      </div>
      <div class="mso-club-perk">
        <div class="mso-club-perk-badge">$</div>
        <span>Earn &amp; Redeem Points on Every Order</span>
      </div>
      <div class="mso-club-perk">
        <div class="mso-club-perk-badge">VIP</div>
        <span>Early-Access to Drops &amp; Flash Deals</span>
      </div>
    </div>
  </section>
</div>
`;

  console.log('Deploying Blade HQ Masterpiece layout to /october-season/ (Page #167531)...');
  const res = await fetch(`${baseUrl}/wp-json/wp/v2/pages/167531`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      title: 'October Season | Michigan Sports Outdoor Cutlery & Fall Gear Outfitter',
      slug: 'october-season',
      status: 'publish',
      content: pageHtml,
      meta: {
        _elementor_edit_mode: ''
      }
    })
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Failed to deploy Blade HQ Masterpiece layout: ${res.status} ${err}`);
  }

  const data = await res.json();
  console.log('Blade HQ Masterpiece October Season page updated successfully:', data.link);

  // Sync script to repo
  const repoPath = 'c:/Users/Mubashar Shahzad/Desktop/searchprex-website/scripts/deploy-bladehq-october-masterpiece.mjs';
  fs.writeFileSync(repoPath, fs.readFileSync(new URL(import.meta.url)));
  console.log('Saved script to repo at:', repoPath);
}

deployBladeHQMasterpieceOctoberPage().catch(err => {
  console.error('Error deploying Blade HQ masterpiece:', err);
  process.exit(1);
});
