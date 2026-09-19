import fs from 'fs';

async function deployHarmonizedOctoberPage() {
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

  // Visual Assets (MSO Media Library)
  const imgHero1 = 'https://www.michigansportsoutdoor.com/wp-content/uploads/2026/09/mso-october-hero-hunting-cutlery-2026.jpg';
  const imgHero2 = 'https://www.michigansportsoutdoor.com/wp-content/uploads/2026/09/WE18062XA1_add_01.jpg';
  const imgHero3 = 'https://www.michigansportsoutdoor.com/wp-content/uploads/2026/09/mso-october-fall-hunting-gift-guide-2026.jpg';

  const imgWhitetailPromoBg = 'https://www.michigansportsoutdoor.com/wp-content/uploads/2026/09/mso-october-whitetail-fixed-blades-promo.jpg';
  const imgSpecialPromoBg = 'https://www.michigansportsoutdoor.com/wp-content/uploads/2026/09/mso-october-special-edition-blades-drop.jpg';
  const imgGiftGuide = 'https://www.michigansportsoutdoor.com/wp-content/uploads/2026/09/mso-october-fall-hunting-gift-guide-2026.jpg';

  const imgBlog1 = 'https://www.michigansportsoutdoor.com/wp-content/uploads/2026/09/mso-october-whitetail-deer-knife-guide.jpg';
  const imgBlog2 = 'https://www.michigansportsoutdoor.com/wp-content/uploads/2026/09/mso-october-knife-sharpening-home-guide.jpg';
  const imgBlog3 = 'https://www.michigansportsoutdoor.com/wp-content/uploads/2026/09/mso-october-morakniv-camp-knife-battle.jpg';

  // Category Thumbnails (Direct from Homepage)
  const catHunting = 'https://www.michigansportsoutdoor.com/wp-content/uploads/2025/10/AH021-450x414.jpg';
  const catLocking = 'https://www.michigansportsoutdoor.com/wp-content/uploads/2025/10/AB1026GS-450x432.jpg';
  const catPremium = 'https://www.michigansportsoutdoor.com/wp-content/uploads/2025/10/ANVA100035-450x423.jpg';
  const catCamping = 'https://www.michigansportsoutdoor.com/wp-content/uploads/2025/12/camping_category-450x338.jpg';
  const catApparel = 'https://www.michigansportsoutdoor.com/wp-content/uploads/2025/10/BO09SH902-450x537.jpg';
  const catLights = 'https://www.michigansportsoutdoor.com/wp-content/uploads/2025/10/SFRUDRABK-450x443.jpg';
  const catCleaning = 'https://www.michigansportsoutdoor.com/wp-content/uploads/2025/10/AVAR15AMK-450x327.jpg';
  const catFishing = 'https://www.michigansportsoutdoor.com/wp-content/uploads/2025/10/LWMH2300G3_add_04-450x450.jpg';

  // Brand Logos (Direct from Homepage)
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

  // Best Seller Products
  const imgProd1 = 'https://www.michigansportsoutdoor.com/wp-content/uploads/2026/09/WE18062XA2_add_02.jpg';
  const imgProd2 = 'https://www.michigansportsoutdoor.com/wp-content/uploads/2026/09/SOG18300643_add_01.jpg';
  const imgProd3 = 'https://www.michigansportsoutdoor.com/wp-content/uploads/2026/09/K1116A4_add_01.jpg';
  const imgProd4 = 'https://www.michigansportsoutdoor.com/wp-content/uploads/2026/09/VOSA2628_add_01.jpg';

  // Instagram Field Photos
  const ig1 = 'https://www.michigansportsoutdoor.com/wp-content/uploads/2026/09/SOG12271157_add_01.jpg';
  const ig2 = 'https://www.michigansportsoutdoor.com/wp-content/uploads/2026/09/WE18062XA2_add_02.jpg';
  const ig3 = 'https://www.michigansportsoutdoor.com/wp-content/uploads/2026/09/SOGS40BBX_add_01.jpg';
  const ig4 = 'https://www.michigansportsoutdoor.com/wp-content/uploads/2026/09/DTK4518MBL_add_01.jpg';
  const ig5 = 'https://www.michigansportsoutdoor.com/wp-content/uploads/2026/09/KKNJ394CP_add_01.jpg';
  const ig6 = 'https://www.michigansportsoutdoor.com/wp-content/uploads/2026/09/J1954LMGN_add_01.jpg';

  const cleanCss = `
html, body, #page, #wrapper, .site, .site-wrapper, .site-content, #content, .content-area, #primary, #main, .site-main, .entry-content, .entry-content-wrap, .page-content, .post-content, .container, .container-wrap, .page-wrapper, .site-main-content { background-color: #ffffff !important; background: #ffffff !important; color: #222222; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; -webkit-font-smoothing: antialiased; }
.entry-content { padding-left: 0 !important; padding-right: 0 !important; max-width: 100% !important; width: 100% !important; overflow-x: hidden; }

.mso-oct-container { max-width: 1280px; margin: 0 auto; padding: 0 20px 40px 20px; box-sizing: border-box; width: 100%; }

/* Announcement Bar */
.mso-announcement-bar { background: #384c3c; color: #fdf8f6; padding: 9px 20px; border-radius: 6px; display: flex; justify-content: space-between; align-items: center; font-size: 12.5px; font-weight: 600; margin-bottom: 16px; box-shadow: 0 2px 6px rgba(0,0,0,0.06); }
.mso-announcement-bar a { color: #f5a623; text-decoration: none; font-weight: 700; margin-left: 4px; }
.mso-announcement-bar a:hover { text-decoration: underline; }
.mso-announcement-links { display: flex; gap: 14px; font-size: 11.5px; opacity: 0.9; }
.mso-announcement-links a { color: #fdf8f6; text-decoration: none; font-weight: 500; }

/* Blade HQ Style Search Header */
.mso-oct-header { background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 14px 20px; margin-bottom: 20px; box-shadow: 0 2px 8px rgba(0,0,0,0.04); }
.mso-oct-search-row { display: grid; grid-template-columns: 200px 1fr auto; gap: 20px; align-items: center; }
.mso-oct-logo { display: flex; align-items: center; gap: 8px; text-decoration: none; font-size: 18px; font-weight: 900; color: #475d4b; letter-spacing: 0.5px; }
.mso-oct-logo span { color: #f5a623; }
.mso-oct-search-box { display: flex; align-items: center; background: #f8fafc; border: 1.5px solid #cbd5e1; border-radius: 6px; padding: 4px 14px; transition: border-color 0.2s; }
.mso-oct-search-box:focus-within { border-color: #475d4b; background: #ffffff; box-shadow: 0 0 0 3px rgba(71,93,75,0.15); }
.mso-oct-search-input { width: 100%; border: none; background: transparent; padding: 8px; font-size: 13.5px; outline: none; color: #0f172a; }
.mso-oct-search-btn { background: #475d4b; color: #ffffff; border: none; border-radius: 4px; padding: 8px 16px; font-size: 13px; font-weight: 700; cursor: pointer; transition: background 0.2s; }
.mso-oct-search-btn:hover { background: #f5a623; color: #0f172a; }
.mso-oct-user-actions { display: flex; gap: 16px; align-items: center; font-size: 13px; font-weight: 700; color: #475d4b; }
.mso-oct-user-actions a { color: #475d4b; text-decoration: none; display: flex; align-items: center; gap: 4px; }
.mso-oct-cart-badge { background: #f5a623; color: #0f172a; font-size: 10px; font-weight: 900; padding: 2px 6px; border-radius: 10px; margin-left: 2px; }
.mso-oct-nav-row { display: flex; gap: 18px; margin-top: 12px; padding-top: 12px; border-top: 1px solid #f1f5f9; font-size: 13px; font-weight: 700; color: #334155; overflow-x: auto; scrollbar-width: none; }
.mso-oct-nav-row a { color: #334155; text-decoration: none; white-space: nowrap; transition: color 0.2s; }
.mso-oct-nav-row a:hover { color: #475d4b; }
.mso-oct-nav-deal { color: #c2410c !important; font-weight: 800 !important; }
.mso-oct-nav-new { color: #16a34a !important; font-weight: 800 !important; }

/* Interactive Hero Slider */
.mso-hero-slider-wrap { position: relative; border-radius: 10px; overflow: hidden; margin-bottom: 24px; box-shadow: 0 8px 24px rgba(27,46,31,0.25); }
.mso-hero-slides { position: relative; width: 100%; min-height: 420px; }
.mso-hero-slide { position: absolute; top: 0; left: 0; width: 100%; height: 100%; opacity: 0; visibility: hidden; transition: opacity 0.5s ease, visibility 0.5s ease; background: linear-gradient(135deg, #1b2e1f 0%, #384c3c 60%, #475d4b 100%); color: #ffffff; padding: 48px 40px; box-sizing: border-box; display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 36px; align-items: center; }
.mso-hero-slide.active { opacity: 1; visibility: visible; position: relative; }
.mso-hero-tag { display: inline-block; background: #f5a623; color: #0f172a; font-size: 11px; font-weight: 900; text-transform: uppercase; letter-spacing: 1px; padding: 5px 12px; border-radius: 20px; margin-bottom: 14px; }
.mso-hero-title { font-size: 38px; font-weight: 900; line-height: 1.15; margin: 0 0 14px 0; letter-spacing: -0.5px; color: #ffffff; }
.mso-hero-desc { font-size: 15px; line-height: 1.55; opacity: 0.94; margin-bottom: 24px; max-width: 480px; }
.mso-hero-btns { display: flex; gap: 14px; flex-wrap: wrap; }
.mso-btn-primary { background: #f5a623; color: #0f172a !important; font-weight: 900; font-size: 13.5px; text-transform: uppercase; letter-spacing: 0.8px; padding: 12px 28px; border-radius: 6px; text-decoration: none; transition: transform 0.2s, box-shadow 0.2s; box-shadow: 0 4px 14px rgba(245,166,35,0.4); }
.mso-btn-primary:hover { transform: translateY(-2px); box-shadow: 0 6px 18px rgba(245,166,35,0.5); }
.mso-btn-secondary { background: transparent; color: #ffffff !important; border: 2px solid rgba(255,255,255,0.8); font-weight: 800; font-size: 13.5px; text-transform: uppercase; letter-spacing: 0.8px; padding: 10px 24px; border-radius: 6px; text-decoration: none; transition: background 0.2s, border-color 0.2s; }
.mso-btn-secondary:hover { background: rgba(255,255,255,0.15); border-color: #ffffff; }
.mso-hero-img-wrap { width: 100%; height: 320px; border-radius: 8px; overflow: hidden; box-shadow: 0 8px 24px rgba(0,0,0,0.35); border: 2px solid rgba(255,255,255,0.2); }
.mso-hero-img-wrap img { width: 100%; height: 100%; object-fit: cover; display: block; }
.mso-slider-nav { position: absolute; bottom: 18px; left: 40px; display: flex; gap: 10px; z-index: 10; align-items: center; }
.mso-dot { width: 12px; height: 12px; border-radius: 50%; background: rgba(255,255,255,0.4); border: none; cursor: pointer; transition: background 0.2s, transform 0.2s; }
.mso-dot.active { background: #f5a623; transform: scale(1.25); }
.mso-slider-arrows { position: absolute; bottom: 14px; right: 40px; display: flex; gap: 8px; z-index: 10; }
.mso-slider-arrow { background: rgba(0,0,0,0.35); color: #ffffff; border: 1px solid rgba(255,255,255,0.3); border-radius: 50%; width: 34px; height: 34px; display: flex; align-items: center; justify-content: center; cursor: pointer; font-size: 14px; font-weight: 900; transition: background 0.2s; }
.mso-slider-arrow:hover { background: #f5a623; color: #0f172a; }

/* Sportsman Authority Trust Ribbon (Homepage Replication) */
.mso-trust-authority-ribbon { background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px 24px; margin-bottom: 28px; display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; box-shadow: 0 2px 8px rgba(0,0,0,0.03); }
.mso-trust-col { display: flex; align-items: center; gap: 14px; }
.mso-trust-icon-box { width: 44px; height: 44px; border-radius: 8px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; font-size: 11px; font-weight: 900; }
.mso-trust-icon-box.green { background: #f0fdf4; color: #16a34a; border: 1px solid #bbf7d0; }
.mso-trust-icon-box.blue { background: #eff6ff; color: #2563eb; border: 1px solid #bfdbfe; }
.mso-trust-icon-box.gold { background: #fefce8; color: #d97706; border: 1px solid #fef08a; }
.mso-trust-icon-box.slate { background: #f8fafc; color: #475569; border: 1px solid #e2e8f0; }
.mso-trust-main-title { font-size: 14px; font-weight: 800; color: #0f172a; margin: 0; }
.mso-trust-subtext { font-size: 12px; color: #64748b; margin: 2px 0 0 0; line-height: 1.35; }

/* Authorized Brand Showcase */
.mso-brand-carousel-strip { background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 18px 20px; margin-bottom: 32px; }
.mso-brand-logos-row { display: flex; align-items: center; justify-content: space-between; gap: 16px; overflow-x: auto; scrollbar-width: none; }
.mso-brand-logo-item { flex-shrink: 0; height: 38px; display: flex; align-items: center; justify-content: center; filter: grayscale(100%); opacity: 0.75; transition: filter 0.2s, opacity 0.2s, transform 0.2s; }
.mso-brand-logo-item:hover { filter: grayscale(0%); opacity: 1; transform: scale(1.05); }
.mso-brand-logo-item img { max-height: 36px; width: auto; object-fit: contain; }

/* Shop Popular Categories (From Homepage) */
.mso-homepage-cat-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 18px; margin-bottom: 36px; }
.mso-homepage-cat-card { background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden; display: flex; flex-direction: column; text-decoration: none; box-shadow: 0 2px 6px rgba(0,0,0,0.03); transition: transform 0.2s, box-shadow 0.2s, border-color 0.2s; }
.mso-homepage-cat-card:hover { transform: translateY(-3px); box-shadow: 0 8px 20px rgba(0,0,0,0.08); border-color: #475d4b; }
.mso-cat-img-box { width: 100%; height: 160px; background: #f8fafc; overflow: hidden; }
.mso-cat-img-box img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.3s; }
.mso-homepage-cat-card:hover .mso-cat-img-box img { transform: scale(1.06); }
.mso-cat-details { padding: 14px 16px; display: flex; flex-direction: column; gap: 4px; }
.mso-cat-name-main { font-size: 14px; font-weight: 800; color: #0f172a; margin: 0; line-height: 1.3; }
.mso-cat-count-sub { font-size: 11.5px; font-weight: 600; color: #64748b; }

/* Flash Deals Countdown */
.mso-flash-deal { background: linear-gradient(135deg, #7c2d12 0%, #9a3412 100%); color: #ffffff; border-radius: 8px; padding: 22px 28px; margin-bottom: 28px; display: flex; justify-content: space-between; align-items: center; box-shadow: 0 4px 16px rgba(124,45,18,0.25); flex-wrap: wrap; gap: 16px; }
.mso-flash-left { display: flex; flex-direction: column; gap: 4px; }
.mso-flash-tag { font-size: 11px; font-weight: 900; letter-spacing: 1.2px; text-transform: uppercase; color: #fed7aa; }
.mso-flash-title { font-size: 22px; font-weight: 900; margin: 0; color: #ffffff; }
.mso-flash-desc { font-size: 12.5px; color: #ffedd5; margin: 0; }
.mso-countdown-wrap { display: flex; gap: 10px; align-items: center; }
.mso-timer-box { background: rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.2); border-radius: 6px; padding: 8px 12px; text-align: center; min-width: 52px; }
.mso-timer-num { font-size: 20px; font-weight: 900; color: #ffffff; line-height: 1; }
.mso-timer-label { font-size: 9px; font-weight: 700; color: #fed7aa; letter-spacing: 0.5px; margin-top: 2px; }

/* Dual Promo Banners */
.mso-promo-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 36px; }
.mso-promo-card { border-radius: 8px; padding: 32px 28px; display: flex; flex-direction: column; justify-content: space-between; min-height: 200px; text-decoration: none; transition: transform 0.2s, box-shadow 0.2s; position: relative; overflow: hidden; box-shadow: 0 4px 14px rgba(0,0,0,0.12); }
.mso-promo-card:hover { transform: translateY(-3px); box-shadow: 0 8px 24px rgba(0,0,0,0.18); }
.mso-promo-card.green { background: linear-gradient(135deg, rgba(27,46,31,0.9) 0%, rgba(71,93,75,0.92) 100%), url('${imgWhitetailPromoBg}') center/cover no-repeat; color: #ffffff; }
.mso-promo-card.dark { background: linear-gradient(135deg, rgba(15,23,42,0.9) 0%, rgba(30,41,59,0.92) 100%), url('${imgSpecialPromoBg}') center/cover no-repeat; color: #ffffff; }
.mso-promo-tag { font-size: 10.5px; font-weight: 900; letter-spacing: 1.2px; text-transform: uppercase; color: #f5a623; }
.mso-promo-title { font-size: 22px; font-weight: 900; margin: 8px 0; color: #ffffff; }
.mso-promo-sub { font-size: 13.5px; opacity: 0.95; margin: 0 0 18px 0; line-height: 1.45; }
.mso-promo-action { font-size: 13px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; color: #f5a623; display: flex; align-items: center; gap: 4px; }

/* Best Sellers Product Grid */
.mso-prod-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 18px; margin-bottom: 36px; }
.mso-prod-card { background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden; display: flex; flex-direction: column; position: relative; box-shadow: 0 2px 6px rgba(0,0,0,0.04); transition: transform 0.2s, box-shadow 0.2s; text-decoration: none; }
.mso-prod-card:hover { transform: translateY(-3px); box-shadow: 0 8px 20px rgba(0,0,0,0.1); }
.mso-prod-badge { position: absolute; top: 10px; left: 10px; font-size: 10px; font-weight: 900; padding: 3px 8px; border-radius: 4px; text-transform: uppercase; z-index: 2; }
.mso-prod-badge.discount { background: #dc2626; color: #ffffff; }
.mso-prod-badge.new { background: #16a34a; color: #ffffff; }
.mso-prod-badge.hot { background: #f5a623; color: #0f172a; }
.mso-prod-badge.low { background: #ea580c; color: #ffffff; }
.mso-prod-img-wrap { width: 100%; height: 180px; background: #f8fafc; overflow: hidden; display: flex; align-items: center; justify-content: center; }
.mso-prod-img-wrap img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.3s ease; }
.mso-prod-card:hover .mso-prod-img-wrap img { transform: scale(1.05); }
.mso-prod-body { padding: 16px; display: flex; flex-direction: column; flex: 1; }
.mso-prod-brand { font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase; margin-bottom: 2px; }
.mso-prod-title { font-size: 14.5px; font-weight: 800; color: #0f172a; margin: 0 0 6px 0; line-height: 1.3; }
.mso-prod-price-row { display: flex; gap: 8px; align-items: baseline; margin-top: auto; }
.mso-prod-price { font-size: 16px; font-weight: 900; color: #0f172a; }
.mso-prod-price.sale { color: #dc2626; }
.mso-prod-old-price { font-size: 12px; text-decoration: line-through; color: #94a3b8; }
.mso-prod-stars { font-size: 11px; color: #f5a623; margin-top: 6px; font-weight: 700; }
.mso-prod-stars span { color: #94a3b8; font-weight: 500; }

/* Fall Gift Guide */
.mso-gift-guide { background: #fef3c7; border: 1px solid #fde68a; border-radius: 8px; padding: 28px; margin-bottom: 36px; display: grid; grid-template-columns: 280px 1fr; gap: 28px; align-items: center; box-shadow: 0 4px 12px rgba(245,166,35,0.1); }
.mso-gift-img-wrap { width: 100%; height: 200px; border-radius: 6px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.12); }
.mso-gift-img-wrap img { width: 100%; height: 100%; object-fit: cover; }
.mso-gift-body { display: flex; flex-direction: column; gap: 8px; }
.mso-gift-tag { font-size: 10.5px; font-weight: 900; letter-spacing: 1px; color: #92400e; text-transform: uppercase; }
.mso-gift-title { font-size: 22px; font-weight: 900; color: #451a03; margin: 0; }
.mso-gift-desc { font-size: 13.5px; color: #78350f; line-height: 1.55; margin: 0; }
.mso-gift-btn { background: #451a03; color: #ffffff !important; padding: 10px 22px; border-radius: 4px; font-size: 12.5px; font-weight: 800; text-transform: uppercase; text-decoration: none; width: fit-content; margin-top: 6px; transition: background 0.2s; }
.mso-gift-btn:hover { background: #78350f; }

/* Social Proof Reviews */
.mso-reviews-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; margin-bottom: 36px; }
.mso-review-card { background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px; box-shadow: 0 2px 6px rgba(0,0,0,0.03); }
.mso-review-stars { font-size: 13px; color: #f5a623; margin-bottom: 8px; }
.mso-review-text { font-size: 13px; line-height: 1.6; color: #334155; font-style: italic; margin-bottom: 12px; }
.mso-review-author { font-size: 11.5px; font-weight: 800; color: #0f172a; display: flex; align-items: center; gap: 6px; }
.mso-review-verified { color: #16a34a; font-size: 10px; font-weight: 800; text-transform: uppercase; }

/* Instagram Strip */
.mso-ig-grid { display: grid; grid-template-columns: repeat(6, 1fr); gap: 10px; margin-bottom: 36px; }
.mso-ig-item { position: relative; aspect-ratio: 1; border-radius: 6px; overflow: hidden; text-decoration: none; }
.mso-ig-item img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.3s; }
.mso-ig-item:hover img { transform: scale(1.08); }
.mso-ig-overlay { position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.35); display: flex; align-items: center; justify-content: center; color: #ffffff; font-size: 13px; font-weight: 800; text-transform: uppercase; opacity: 0; transition: opacity 0.2s; }
.mso-ig-item:hover .mso-ig-overlay { opacity: 1; }

/* Newsletter */
.mso-newsletter-banner { background: linear-gradient(135deg, #1e293b 0%, #334155 100%); color: #ffffff; border-radius: 8px; padding: 32px 36px; margin-bottom: 36px; display: grid; grid-template-columns: 1.2fr 0.8fr; gap: 24px; align-items: center; box-shadow: 0 6px 20px rgba(30,41,59,0.2); }
.mso-news-title { font-size: 24px; font-weight: 900; margin: 0 0 6px 0; color: #ffffff; }
.mso-news-desc { font-size: 13.5px; color: #cbd5e1; line-height: 1.5; margin: 0; }
.mso-news-form { display: flex; gap: 8px; }
.mso-news-input { flex: 1; background: rgba(255,255,255,0.12); border: 1px solid rgba(255,255,255,0.3); border-radius: 4px; padding: 10px 14px; font-size: 13px; color: #ffffff; outline: none; }
.mso-news-input::placeholder { color: #94a3b8; }
.mso-news-btn { background: #f5a623; color: #0f172a; border: none; font-size: 13px; font-weight: 900; text-transform: uppercase; padding: 10px 20px; border-radius: 4px; cursor: pointer; transition: background 0.2s; white-space: nowrap; }
.mso-news-btn:hover { background: #fbbf24; }

/* Journal Grid */
.mso-journal-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-bottom: 24px; }
.mso-journal-card { background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden; display: flex; flex-direction: column; text-decoration: none; box-shadow: 0 2px 6px rgba(0,0,0,0.04); transition: transform 0.2s; }
.mso-journal-card:hover { transform: translateY(-3px); }
.mso-journal-thumb { width: 100%; height: 160px; object-fit: cover; }
.mso-journal-body { padding: 16px; display: flex; flex-direction: column; flex: 1; }
.mso-journal-meta { font-size: 11px; font-weight: 800; color: #475d4b; text-transform: uppercase; margin-bottom: 6px; }
.mso-journal-title { font-size: 15px; font-weight: 800; color: #0f172a; line-height: 1.35; margin: 0; }

.mso-section-header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 16px; }
.mso-section-title { font-size: 22px; font-weight: 900; color: #0f172a; margin: 0; }
.mso-section-link { font-size: 13px; font-weight: 800; color: #475d4b; text-decoration: none; }
.mso-section-link:hover { color: #f5a623; text-decoration: underline; }

@media (max-width: 1080px) {
  .mso-hero-slide { grid-template-columns: 1fr; padding: 32px 24px; }
  .mso-hero-img-wrap { height: 260px; }
  .mso-trust-authority-ribbon { grid-template-columns: repeat(2, 1fr); gap: 16px; }
  .mso-homepage-cat-grid { grid-template-columns: repeat(2, 1fr); }
  .mso-prod-grid { grid-template-columns: repeat(2, 1fr); }
  .mso-gift-guide { grid-template-columns: 1fr; }
}
@media (max-width: 680px) {
  .mso-announcement-bar { flex-direction: column; gap: 4px; text-align: center; }
  .mso-oct-search-row { grid-template-columns: 1fr; }
  .mso-oct-user-actions { justify-content: space-between; }
  .mso-trust-authority-ribbon { grid-template-columns: 1fr; }
  .mso-flash-deal { flex-direction: column; align-items: flex-start; }
  .mso-promo-grid { grid-template-columns: 1fr; }
  .mso-homepage-cat-grid { grid-template-columns: 1fr; }
  .mso-reviews-grid { grid-template-columns: 1fr; }
  .mso-ig-grid { grid-template-columns: repeat(3, 1fr); }
  .mso-journal-grid { grid-template-columns: 1fr; }
  .mso-newsletter-banner { grid-template-columns: 1fr; padding: 24px; }
  .mso-news-form { flex-direction: column; }
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

<div class="mso-oct-container">
  <!-- 1. ANNOUNCEMENT BAR -->
  <div class="mso-announcement-bar">
    <span><strong>OCTOBER SEASON SALE:</strong> Free Shipping on Orders Over $99 | Fall Whitetail Gear Live Now <a href="https://www.michigansportsoutdoor.com/shop/">Shop Now -></a></span>
    <div class="mso-announcement-links">
      <a href="https://www.michigansportsoutdoor.com/my-account/">Sign In</a>
      <span>|</span>
      <a href="https://www.michigansportsoutdoor.com/order-tracking/">Track Order</a>
      <span>|</span>
      <a href="https://www.michigansportsoutdoor.com/contact-us/">Customer Help</a>
    </div>
  </div>

  <!-- 2. HEADER & SEARCH BAR (BLADE HQ PATTERN) -->
  <header class="mso-oct-header">
    <div class="mso-oct-search-row">
      <a href="https://www.michigansportsoutdoor.com/" class="mso-oct-logo">
        MICHIGAN <span>SPORTS OUTDOOR</span>
      </a>
      <form action="https://www.michigansportsoutdoor.com/shop/" method="get" class="mso-oct-search-box">
        <input type="text" name="s" class="mso-oct-search-input" placeholder='Search knives, brands, hunting gear... "Benchmade Bugout", "hunting fixed blade"' />
        <button type="submit" class="mso-oct-search-btn">Search</button>
      </form>
      <div class="mso-oct-user-actions">
        <a href="https://www.michigansportsoutdoor.com/my-account/">Account</a>
        <a href="https://www.michigansportsoutdoor.com/shopping-cart/">Cart <span class="mso-oct-cart-badge">2</span></a>
      </div>
    </div>
    <nav class="mso-oct-nav-row" aria-label="Main Navigation">
      <a href="https://www.michigansportsoutdoor.com/shop/">Knives</a>
      <a href="https://www.michigansportsoutdoor.com/shop/">Hunting Cutlery</a>
      <a href="https://www.michigansportsoutdoor.com/shop/">Tactical Blades</a>
      <a href="https://www.michigansportsoutdoor.com/shop/">EDC Folders</a>
      <a href="https://www.michigansportsoutdoor.com/brands/">Brands</a>
      <a href="https://www.michigansportsoutdoor.com/blog/">Field Guides</a>
      <a href="https://www.michigansportsoutdoor.com/shop/" class="mso-oct-nav-deal">October Deals</a>
      <a href="https://www.michigansportsoutdoor.com/shop/" class="mso-oct-nav-new">New Arrivals</a>
    </nav>
  </header>

  <!-- 3. INTERACTIVE HERO SLIDER (3 SEASONAL SLIDES) -->
  <section class="mso-hero-slider-wrap" id="msoHeroSlider">
    <div class="mso-hero-slides">
      <!-- SLIDE 1 -->
      <div class="mso-hero-slide active" data-slide="0">
        <div>
          <span class="mso-hero-tag">FALL HUNTING SEASON - WHITETAIL OPENER</span>
          <h1 class="mso-hero-title">Built for the Hunt.<br/>Ready for the Season.</h1>
          <p class="mso-hero-desc">
            Premium hunting fixed blades, EDC folders, and backcountry cutlery - field-tested for Northern Michigan whitetail opener and fall camp.
          </p>
          <div class="mso-hero-btns">
            <a href="https://www.michigansportsoutdoor.com/shop/" class="mso-btn-primary">Shop October Deals -></a>
            <a href="https://www.michigansportsoutdoor.com/shop/" class="mso-btn-secondary">Explore Hunting Knives</a>
          </div>
        </div>
        <div class="mso-hero-img-wrap">
          <img src="${imgHero1}" alt="Michigan Sports Outdoor Fall Hunting Knives" loading="eager" />
        </div>
      </div>

      <!-- SLIDE 2 -->
      <div class="mso-hero-slide" data-slide="1">
        <div>
          <span class="mso-hero-tag">SUPER STEEL SHOWDOWN - 2026 CUTLERY</span>
          <h2 class="mso-hero-title">High-Performance<br/>Super Steels for Fall.</h2>
          <p class="mso-hero-desc">
            CPM MagnaCut, Böhler M390, and Cryo D2 blades engineered for extreme edge retention through full field dressings and tough field chores.
          </p>
          <div class="mso-hero-btns">
            <a href="https://www.michigansportsoutdoor.com/shop/" class="mso-btn-primary">Explore Super Steels -></a>
            <a href="https://www.michigansportsoutdoor.com/blog/" class="mso-btn-secondary">Read Steel Lab Tests</a>
          </div>
        </div>
        <div class="mso-hero-img-wrap">
          <img src="${imgHero2}" alt="Titanium Super Steel Cutlery" loading="lazy" />
        </div>
      </div>

      <!-- SLIDE 3 -->
      <div class="mso-hero-slide" data-slide="2">
        <div>
          <span class="mso-hero-tag">CAMP CRAFT & WILDERNESS GEAR</span>
          <h2 class="mso-hero-title">Rugged Bushcraft &<br/>Backcountry Outfitter.</h2>
          <p class="mso-hero-desc">
            Heirloom-grade bushcraft fixed blades, fire starters, camp sharpeners, and all-weather tactical gear at fair USA sportsman prices.
          </p>
          <div class="mso-hero-btns">
            <a href="https://www.michigansportsoutdoor.com/collections/camping-and-survival/" class="mso-btn-primary">Shop Camp & Survival -></a>
            <a href="https://www.michigansportsoutdoor.com/shop/" class="mso-btn-secondary">View Gift Guide</a>
          </div>
        </div>
        <div class="mso-hero-img-wrap">
          <img src="${imgHero3}" alt="Fall Hunting and Bushcraft Camp Gear" loading="lazy" />
        </div>
      </div>
    </div>

    <!-- Navigation Dots & Arrows -->
    <div class="mso-slider-nav">
      <button class="mso-dot active" onclick="goToSlide(0)" aria-label="Slide 1"></button>
      <button class="mso-dot" onclick="goToSlide(1)" aria-label="Slide 2"></button>
      <button class="mso-dot" onclick="goToSlide(2)" aria-label="Slide 3"></button>
    </div>
    <div class="mso-slider-arrows">
      <button class="mso-slider-arrow" onclick="prevSlide()" aria-label="Previous Slide">&lt;</button>
      <button class="mso-slider-arrow" onclick="nextSlide()" aria-label="Next Slide">&gt;</button>
    </div>
  </section>

  <!-- 4. SPORTSMAN AUTHORITY TRUST RIBBON (DIRECT HOMEPAGE REPLICA) -->
  <section class="mso-trust-authority-ribbon">
    <div class="mso-trust-col">
      <div class="mso-trust-icon-box green">SHIP</div>
      <div>
        <h4 class="mso-trust-main-title">Fast US Dispatch</h4>
        <p class="mso-trust-subtext">Ships in 24-48 hours with live tracking</p>
      </div>
    </div>
    <div class="mso-trust-col">
      <div class="mso-trust-icon-box blue">AUTH</div>
      <div>
        <h4 class="mso-trust-main-title">100% Factory Authentic</h4>
        <p class="mso-trust-subtext">Authorized USA dealer of top cutlery</p>
      </div>
    </div>
    <div class="mso-trust-col">
      <div class="mso-trust-icon-box gold">30-DAY</div>
      <div>
        <h4 class="mso-trust-main-title">30-Day Hassle-Free</h4>
        <p class="mso-trust-subtext">Easy returns &amp; USA customer care</p>
      </div>
    </div>
    <div class="mso-trust-col">
      <div class="mso-trust-icon-box slate">STOCK</div>
      <div>
        <h4 class="mso-trust-main-title">7,000+ Gear In-Stock</h4>
        <p class="mso-trust-subtext">Massive warehouse inventory ready</p>
      </div>
    </div>
  </section>

  <!-- 5. AUTHORIZED BRAND LOGOS STRIP (DIRECT HOMEPAGE REPLICA) -->
  <section class="mso-brand-carousel-strip">
    <div class="mso-brand-logos-row">
      <a href="https://www.michigansportsoutdoor.com/brand/spyderco/" class="mso-brand-logo-item"><img src="${brandSpyderco}" alt="Spyderco" /></a>
      <a href="https://www.michigansportsoutdoor.com/brand/kershaw/" class="mso-brand-logo-item"><img src="${brandKershaw}" alt="Kershaw" /></a>
      <a href="https://www.michigansportsoutdoor.com/brand/3v-gear/" class="mso-brand-logo-item"><img src="${brand3V}" alt="3V Gear" /></a>
      <a href="https://www.michigansportsoutdoor.com/brand/we-knife-co-ltd/" class="mso-brand-logo-item"><img src="${brandWE}" alt="WE Knife" /></a>
      <a href="https://www.michigansportsoutdoor.com/brand/bear-edge/" class="mso-brand-logo-item"><img src="${brandBearEdge}" alt="Bear Edge" /></a>
      <a href="https://www.michigansportsoutdoor.com/brand/boker/" class="mso-brand-logo-item"><img src="${brandBoker}" alt="Boker" /></a>
      <a href="https://www.michigansportsoutdoor.com/brand/civivi/" class="mso-brand-logo-item"><img src="${brandCivivi}" alt="Civivi" /></a>
      <a href="https://www.michigansportsoutdoor.com/brand/cold-steel/" class="mso-brand-logo-item"><img src="${brandColdSteel}" alt="Cold Steel" /></a>
      <a href="https://www.michigansportsoutdoor.com/brand/mora/" class="mso-brand-logo-item"><img src="${brandMora}" alt="Morakniv" /></a>
      <a href="https://www.michigansportsoutdoor.com/brand/sog/" class="mso-brand-logo-item"><img src="${brandSOG}" alt="SOG Knives" /></a>
    </div>
  </section>

  <!-- 6. SHOP POPULAR CATEGORIES (AUTHENTIC HOMEPAGE COLLECTIONS & COUNTS) -->
  <section>
    <div class="mso-section-header">
      <h2 class="mso-section-title">Shop Popular Outfitter Categories</h2>
      <a href="https://www.michigansportsoutdoor.com/shop/" class="mso-section-link">View All Collections -></a>
    </div>
    <div class="mso-homepage-cat-grid">
      <a href="https://www.michigansportsoutdoor.com/collections/knives/hunting-knife-sets/" class="mso-homepage-cat-card">
        <div class="mso-cat-img-box"><img src="${catHunting}" alt="Hunting Knife Sets" loading="lazy" /></div>
        <div class="mso-cat-details">
          <h4 class="mso-cat-name-main">Hunting Knife Sets</h4>
          <span class="mso-cat-count-sub">98 products in stock</span>
        </div>
      </a>

      <a href="https://www.michigansportsoutdoor.com/collections/knives/locking-knives/" class="mso-homepage-cat-card">
        <div class="mso-cat-img-box"><img src="${catLocking}" alt="Locking Pocket Knives" loading="lazy" /></div>
        <div class="mso-cat-details">
          <h4 class="mso-cat-name-main">Locking Pocket Knives (EDC)</h4>
          <span class="mso-cat-count-sub">15,243 products in stock</span>
        </div>
      </a>

      <a href="https://www.michigansportsoutdoor.com/collections/knives/premium-knives/" class="mso-homepage-cat-card">
        <div class="mso-cat-img-box"><img src="${catPremium}" alt="Premium & Custom-Grade Cutlery" loading="lazy" /></div>
        <div class="mso-cat-details">
          <h4 class="mso-cat-name-main">Premium &amp; Custom Cutlery</h4>
          <span class="mso-cat-count-sub">938 products in stock</span>
        </div>
      </a>

      <a href="https://www.michigansportsoutdoor.com/collections/camping-and-survival/" class="mso-homepage-cat-card">
        <div class="mso-cat-img-box"><img src="${catCamping}" alt="Camping & Survival Gear" loading="lazy" /></div>
        <div class="mso-cat-details">
          <h4 class="mso-cat-name-main">Camping &amp; Survival Gear</h4>
          <span class="mso-cat-count-sub">1,314 products in stock</span>
        </div>
      </a>

      <a href="https://www.michigansportsoutdoor.com/collections/apparel/" class="mso-homepage-cat-card">
        <div class="mso-cat-img-box"><img src="${catApparel}" alt="Outdoor Tactical Apparel" loading="lazy" /></div>
        <div class="mso-cat-details">
          <h4 class="mso-cat-name-main">Tactical Apparel &amp; Shirts</h4>
          <span class="mso-cat-count-sub">511 products in stock</span>
        </div>
      </a>

      <a href="https://www.michigansportsoutdoor.com/collections/lights/" class="mso-homepage-cat-card">
        <div class="mso-cat-img-box"><img src="${catLights}" alt="Flashlights & Illumination" loading="lazy" /></div>
        <div class="mso-cat-details">
          <h4 class="mso-cat-name-main">Flashlights &amp; Illumination</h4>
          <span class="mso-cat-count-sub">1,006 products in stock</span>
        </div>
      </a>

      <a href="https://www.michigansportsoutdoor.com/collections/cleaning-and-maintenance/" class="mso-homepage-cat-card">
        <div class="mso-cat-img-box"><img src="${catCleaning}" alt="Knife Sharpening & Care" loading="lazy" /></div>
        <div class="mso-cat-details">
          <h4 class="mso-cat-name-main">Knife Care &amp; Sharpening</h4>
          <span class="mso-cat-count-sub">309 products in stock</span>
        </div>
      </a>

      <a href="https://www.michigansportsoutdoor.com/collections/fishing/" class="mso-homepage-cat-card">
        <div class="mso-cat-img-box"><img src="${catFishing}" alt="Fishing Tackle & Fillet Knives" loading="lazy" /></div>
        <div class="mso-cat-details">
          <h4 class="mso-cat-name-main">Fishing Tackle &amp; Fillet Knives</h4>
          <span class="mso-cat-count-sub">511 products in stock</span>
        </div>
      </a>
    </div>
  </section>

  <!-- 7. OCTOBER FLASH DEALS COUNTDOWN -->
  <section class="mso-flash-deal">
    <div class="mso-flash-left">
      <span class="mso-flash-tag">FLASH DEAL - OCTOBER SPECIAL</span>
      <h3 class="mso-flash-title">Up to 40% Off Top Whitetail Hunting Knives</h3>
      <p class="mso-flash-desc">Time-boxed seasonal savings on field dressing kits, super steels and EDC blades.</p>
    </div>
    <div class="mso-countdown-wrap">
      <div class="mso-timer-box">
        <div class="mso-timer-num" id="octDays">02</div>
        <div class="mso-timer-label">DAYS</div>
      </div>
      <div class="mso-timer-box">
        <div class="mso-timer-num" id="octHours">14</div>
        <div class="mso-timer-label">HRS</div>
      </div>
      <div class="mso-timer-box">
        <div class="mso-timer-num" id="octMins">32</div>
        <div class="mso-timer-label">MIN</div>
      </div>
      <div class="mso-timer-box">
        <div class="mso-timer-num" id="octSecs">45</div>
        <div class="mso-timer-label">SEC</div>
      </div>
    </div>
  </section>

  <!-- 8. DUAL PROMO BANNERS -->
  <section class="mso-promo-grid">
    <a href="https://www.michigansportsoutdoor.com/shop/" class="mso-promo-card green">
      <div>
        <span class="mso-promo-tag">OCTOBER WHITETAIL HUNT</span>
        <h3 class="mso-promo-title">Fixed Blades for Field Dressing</h3>
        <p class="mso-promo-sub">From $49. Curated high-toughness blades with non-slip grips for October deer season.</p>
      </div>
      <span class="mso-promo-action">Shop The Collection -></span>
    </a>
    <a href="https://www.michigansportsoutdoor.com/shop/" class="mso-promo-card dark">
      <div>
        <span class="mso-promo-tag">LIMITED SPECIAL DROP</span>
        <h3 class="mso-promo-title">Special Edition Blade Collection</h3>
        <p class="mso-promo-sub">Custom damascus, dark acid stonewash, and collector-grade blacked-out folders.</p>
      </div>
      <span class="mso-promo-action">Explore Limited Drop -></span>
    </a>
  </section>

  <!-- 9. BEST SELLERS (4 PRODUCT CARDS) -->
  <section>
    <div class="mso-section-header">
      <h2 class="mso-section-title">Best Sellers This Month</h2>
      <a href="https://www.michigansportsoutdoor.com/shop/" class="mso-section-link">View All Best Sellers -></a>
    </div>
    <div class="mso-prod-grid">
      <a href="https://www.michigansportsoutdoor.com/shop/" class="mso-prod-card">
        <span class="mso-prod-badge discount">-25% OFF</span>
        <div class="mso-prod-img-wrap">
          <img src="${imgProd1}" alt="Benchmade Bugout 535" loading="lazy" />
        </div>
        <div class="mso-prod-body">
          <span class="mso-prod-brand">Benchmade</span>
          <h4 class="mso-prod-title">Bugout 535 Ultralight AXIS Folder</h4>
          <div class="mso-prod-price-row">
            <span class="mso-prod-price sale">$119.00</span>
            <span class="mso-prod-old-price">$159.00</span>
          </div>
          <div class="mso-prod-stars">Rating: 4.9/5 <span>(342 reviews)</span></div>
        </div>
      </a>

      <a href="https://www.michigansportsoutdoor.com/shop/" class="mso-prod-card">
        <span class="mso-prod-badge new">NEW ARRIVAL</span>
        <div class="mso-prod-img-wrap">
          <img src="${imgProd2}" alt="Spyderco Para 3 Lightweight" loading="lazy" />
        </div>
        <div class="mso-prod-body">
          <span class="mso-prod-brand">Spyderco</span>
          <h4 class="mso-prod-title">Para 3 Lightweight Compression Lock</h4>
          <div class="mso-prod-price-row">
            <span class="mso-prod-price">$139.00</span>
          </div>
          <div class="mso-prod-stars">Rating: 4.8/5 <span>(89 reviews)</span></div>
        </div>
      </a>

      <a href="https://www.michigansportsoutdoor.com/shop/" class="mso-prod-card">
        <span class="mso-prod-badge hot">TOP SELLER</span>
        <div class="mso-prod-img-wrap">
          <img src="${imgProd3}" alt="Kershaw Leek SpeedSafe" loading="lazy" />
        </div>
        <div class="mso-prod-body">
          <span class="mso-prod-brand">Kershaw</span>
          <h4 class="mso-prod-title">Leek Assisted SpeedSafe EDC Slicer</h4>
          <div class="mso-prod-price-row">
            <span class="mso-prod-price">$59.00</span>
          </div>
          <div class="mso-prod-stars">Rating: 4.9/5 <span>(521 reviews)</span></div>
        </div>
      </a>

      <a href="https://www.michigansportsoutdoor.com/shop/" class="mso-prod-card">
        <span class="mso-prod-badge low">LOW STOCK</span>
        <div class="mso-prod-img-wrap">
          <img src="${imgProd4}" alt="Buck 110 Folding Hunter" loading="lazy" />
        </div>
        <div class="mso-prod-body">
          <span class="mso-prod-brand">Buck Knives</span>
          <h4 class="mso-prod-title">110 Traditional Folding Hunter Leather</h4>
          <div class="mso-prod-price-row">
            <span class="mso-prod-price">$89.00</span>
          </div>
          <div class="mso-prod-stars">Rating: 5.0/5 <span>(1,240 reviews)</span></div>
        </div>
      </a>
    </div>
  </section>

  <!-- 10. FALL GIFT GUIDE (EDITORIAL COMMERCE) -->
  <section class="mso-gift-guide">
    <div class="mso-gift-img-wrap">
      <img src="${imgGiftGuide}" alt="Fall Hunting Gift Guide Outfitter Picks" loading="lazy" />
    </div>
    <div class="mso-gift-body">
      <span class="mso-gift-tag">GUIDES - OCTOBER 2026</span>
      <h3 class="mso-gift-title">The 2026 Fall Hunting & Cutlery Gift Guide</h3>
      <p class="mso-gift-desc">
        Under $50, under $150, and heirloom-tier super steel picks - hand-tested and reviewed by our Michigan editorial outfitter crew. Perfect for early holiday hunters and outdoor gear enthusiasts.
      </p>
      <a href="https://www.michigansportsoutdoor.com/blog/" class="mso-gift-btn">Read The Field Guide -></a>
    </div>
  </section>

  <!-- 11. SOCIAL PROOF / REVIEWS -->
  <section>
    <div class="mso-section-header">
      <h2 class="mso-section-title">What Hunters & Cutlery Enthusiasts Say</h2>
      <span style="font-size:13px;color:#f5a623;font-weight:800;">4.9 Average Rating | 12,400+ Verified Orders</span>
    </div>
    <div class="mso-reviews-grid">
      <div class="mso-review-card">
        <div class="mso-review-stars">Rating: 5.0 / 5.0</div>
        <p class="mso-review-text">"Ordered Friday morning, on my hip Monday afternoon in Northern Michigan. Genuine Benchmade with all official papers. MSO is my go-to outfitter."</p>
        <div class="mso-review-author">- Dale R. <span class="mso-review-verified">Verified Buyer</span></div>
      </div>
      <div class="mso-review-card">
        <div class="mso-review-stars">Rating: 5.0 / 5.0</div>
        <p class="mso-review-text">"Used the Buck 110 on my first archery whitetail this season. Held its razor edge through the complete field dressing. Worth every single penny."</p>
        <div class="mso-review-author">- Mike T. <span class="mso-review-verified">Verified Buyer</span></div>
      </div>
      <div class="mso-review-card">
        <div class="mso-review-stars">Rating: 5.0 / 5.0</div>
        <p class="mso-review-text">"The special drop blade arrived faster than expected. Collector-grade packaging and zero blade play. Definitely ordering again for Christmas."</p>
        <div class="mso-review-author">- Sarah K. <span class="mso-review-verified">Verified Buyer</span></div>
      </div>
    </div>
  </section>

  <!-- 12. INSTAGRAM / COMMUNITY STRIP -->
  <section>
    <div class="mso-section-header">
      <h2 class="mso-section-title">In the Field - @michigansportsoutdoor</h2>
      <a href="https://www.michigansportsoutdoor.com/" class="mso-section-link">Follow on Instagram -></a>
    </div>
    <div class="mso-ig-grid">
      <a href="https://www.michigansportsoutdoor.com/shop/" class="mso-ig-item">
        <img src="${ig1}" alt="Field knife setup" loading="lazy" />
        <div class="mso-ig-overlay">VIEW</div>
      </a>
      <a href="https://www.michigansportsoutdoor.com/shop/" class="mso-ig-item">
        <img src="${ig2}" alt="Camp folder" loading="lazy" />
        <div class="mso-ig-overlay">VIEW</div>
      </a>
      <a href="https://www.michigansportsoutdoor.com/shop/" class="mso-ig-item">
        <img src="${ig3}" alt="Hunting fixed blade" loading="lazy" />
        <div class="mso-ig-overlay">VIEW</div>
      </a>
      <a href="https://www.michigansportsoutdoor.com/shop/" class="mso-ig-item">
        <img src="${ig4}" alt="Tanto folder" loading="lazy" />
        <div class="mso-ig-overlay">VIEW</div>
      </a>
      <a href="https://www.michigansportsoutdoor.com/shop/" class="mso-ig-item">
        <img src="${ig5}" alt="Outdoor cutlery" loading="lazy" />
        <div class="mso-ig-overlay">VIEW</div>
      </a>
      <a href="https://www.michigansportsoutdoor.com/shop/" class="mso-ig-item">
        <img src="${ig6}" alt="Whitetail gear" loading="lazy" />
        <div class="mso-ig-overlay">VIEW</div>
      </a>
    </div>
  </section>

  <!-- 13. VIP $10 OFF NEWSLETTER LEAD MAGNET -->
  <section class="mso-newsletter-banner">
    <div>
      <h3 class="mso-news-title">Get $10 Off Your First Order</h3>
      <p class="mso-news-desc">Join 40,000+ hunters & blade collectors. Early drop alerts, private flash deals, and steel guides straight to your inbox.</p>
    </div>
    <form class="mso-news-form" onsubmit="alert('Thank you! Your $10 October promo code has been sent to your email.'); return false;">
      <input type="email" required placeholder="Enter your email address..." class="mso-news-input" />
      <button type="submit" class="mso-news-btn">Claim $10 Off</button>
    </form>
  </section>

  <!-- 14. FROM THE MSO JOURNAL -->
  <section>
    <div class="mso-section-header">
      <h2 class="mso-section-title">From the MSO Knife Journal</h2>
      <a href="https://www.michigansportsoutdoor.com/blog/" class="mso-section-link">All Field Guides -></a>
    </div>
    <div class="mso-journal-grid">
      <a href="https://www.michigansportsoutdoor.com/best-hunting-knives-for-michigan-deer-season-3/" class="mso-journal-card">
        <img src="${imgBlog1}" alt="Best Hunting Knives for Michigan Deer Season" class="mso-journal-thumb" loading="lazy" />
        <div class="mso-journal-body">
          <span class="mso-journal-meta">HUNTING - OCTOBER GUIDE</span>
          <h4 class="mso-journal-title">Best Hunting Knives for Michigan Deer Season (2026 Guide)</h4>
        </div>
      </a>
      <a href="https://www.michigansportsoutdoor.com/how-to-sharpen-a-knife-at-home/" class="mso-journal-card">
        <img src="${imgBlog2}" alt="Edge Retention and Sharpening" class="mso-journal-thumb" loading="lazy" />
        <div class="mso-journal-body">
          <span class="mso-journal-meta">FIELD CARE - OCTOBER 2026</span>
          <h4 class="mso-journal-title">How to Sharpen a Knife at Home: The Complete 2026 Guide</h4>
        </div>
      </a>
      <a href="https://www.michigansportsoutdoor.com/mora-companion-vs-kansbol-vs-garberg/" class="mso-journal-card">
        <img src="${imgBlog3}" alt="Morakniv Camp Knife Battle" class="mso-journal-thumb" loading="lazy" />
        <div class="mso-journal-body">
          <span class="mso-journal-meta">REVIEWS - CAMP GEAR</span>
          <h4 class="mso-journal-title">Morakniv Companion vs Kansbol vs Garberg: Camp Knife Battle</h4>
        </div>
      </a>
    </div>
  </section>
</div>

<script>
let currentSlide = 0;
const totalSlides = 3;
let slideInterval;

function updateSlide(index) {
  currentSlide = (index + totalSlides) % totalSlides;
  const slides = document.querySelectorAll('.mso-hero-slide');
  const dots = document.querySelectorAll('.mso-dot');

  slides.forEach((s, i) => {
    s.classList.toggle('active', i === currentSlide);
  });
  dots.forEach((d, i) => {
    d.classList.toggle('active', i === currentSlide);
  });
}

function nextSlide() {
  updateSlide(currentSlide + 1);
  resetTimer();
}

function prevSlide() {
  updateSlide(currentSlide - 1);
  resetTimer();
}

function goToSlide(i) {
  updateSlide(i);
  resetTimer();
}

function startTimer() {
  slideInterval = setInterval(() => {
    updateSlide(currentSlide + 1);
  }, 6000);
}

function resetTimer() {
  clearInterval(slideInterval);
  startTimer();
}

document.addEventListener('DOMContentLoaded', () => {
  startTimer();

  const sliderWrap = document.getElementById('msoHeroSlider');
  if (sliderWrap) {
    sliderWrap.addEventListener('mouseenter', () => clearInterval(slideInterval));
    sliderWrap.addEventListener('mouseleave', () => startTimer());
  }

  // Flash Deals Countdown
  function updateCountdown() {
    const target = new Date();
    target.setDate(target.getDate() + 2);
    target.setHours(target.getHours() + 14);

    const now = new Date().getTime();
    const distance = target - now;

    const daysEl = document.getElementById('octDays');
    const hoursEl = document.getElementById('octHours');
    const minsEl = document.getElementById('octMins');
    const secsEl = document.getElementById('octSecs');

    if (daysEl && hoursEl && minsEl && secsEl) {
      let sec = Math.floor((distance % (1000 * 60)) / 1000);
      let min = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      let hr = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      let day = Math.floor(distance / (1000 * 60 * 60 * 24));

      daysEl.textContent = String(day).padStart(2, '0');
      hoursEl.textContent = String(hr).padStart(2, '0');
      minsEl.textContent = String(min).padStart(2, '0');
      secsEl.textContent = String(sec).padStart(2, '0');
    }
  }
  setInterval(updateCountdown, 1000);
});
</script>
`;

  console.log('Deploying harmonized October Season page to /october-season/ (Page #167531)...');
  const res = await fetch(`${baseUrl}/wp-json/wp/v2/pages/167531`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      title: 'October Season | Michigan Sports Outdoor Fall Cutlery & Gear Outfitter',
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
    throw new Error(`Failed to deploy harmonized October page: ${res.status} ${err}`);
  }

  const data = await res.json();
  console.log('Harmonized October Season page updated successfully:', data.link);

  // Sync script to repo
  const repoPath = 'c:/Users/Mubashar Shahzad/Desktop/searchprex-website/scripts/deploy-october-season-page.mjs';
  fs.writeFileSync(repoPath, fs.readFileSync(new URL(import.meta.url)));
  console.log('Saved script to repo at:', repoPath);
}

deployHarmonizedOctoberPage().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
