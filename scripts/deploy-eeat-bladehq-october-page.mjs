import fs from 'fs';

async function deployEEATBladeHQOctoberPage() {
  const baseUrl = 'https://www.michigansportsoutdoor.com';
  const username = 'apiuser';
  const appPassword = 'cvxm Bi7y 6o3y r7HJ M1Wn mSMM';
  const auth = Buffer.from(`${username}:${appPassword}`).toString('base64');
  const headers = {
    Authorization: `Basic ${auth}`,
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
    'Content-Type': 'application/json'
  };

  // Gemini-Generated CRO Hero Visual (with embedded USPs & October Hunt design)
  const imgHero = 'https://www.michigansportsoutdoor.com/wp-content/uploads/2026/09/mso-october-hero-hunting-cutlery-magna-2026.jpg';

  // Promo Cards
  const imgPromo1 = 'https://www.michigansportsoutdoor.com/wp-content/uploads/2026/09/mso-october-whitetail-fixed-blades-promo.jpg';
  const imgPromo2 = 'https://www.michigansportsoutdoor.com/wp-content/uploads/2026/09/mso-october-special-edition-blades-drop.jpg';
  const imgPromo3 = 'https://www.michigansportsoutdoor.com/wp-content/uploads/2026/09/mso-october-fall-hunting-gift-guide-2026.jpg';
  const imgPromo4 = 'https://www.michigansportsoutdoor.com/wp-content/uploads/2026/09/WE18062XA1_add_01.jpg';

  // Author Photo
  const authorAvatar = 'https://www.michigansportsoutdoor.com/wp-content/uploads/2026/09/mubashar-shahzad-lead-cutlery-analyst.jpg';

  // Authentic 10 Categories from Live Homepage (Exact Photos)
  const catLocking = 'https://www.michigansportsoutdoor.com/wp-content/uploads/2025/10/AB1026GS-450x432.jpg';
  const catLights = 'https://www.michigansportsoutdoor.com/wp-content/uploads/2025/10/SFRUDRABK-450x443.jpg';
  const catCleaning = 'https://www.michigansportsoutdoor.com/wp-content/uploads/2025/10/AVAR15AMK-450x327.jpg';
  const catFishing = 'https://www.michigansportsoutdoor.com/wp-content/uploads/2025/10/LWMH2300G3_add_04-450x450.jpg';
  const catHunting = 'https://www.michigansportsoutdoor.com/wp-content/uploads/2025/10/AH021-450x414.jpg';
  const catCamping = 'https://www.michigansportsoutdoor.com/wp-content/uploads/2025/12/camping_category-450x338.jpg';
  const catApparel = 'https://www.michigansportsoutdoor.com/wp-content/uploads/2025/10/BO09SH902-450x537.jpg';
  const catPremium = 'https://www.michigansportsoutdoor.com/wp-content/uploads/2025/10/ANVA100035-450x423.jpg';
  const catKitchen = 'https://www.michigansportsoutdoor.com/wp-content/uploads/2025/10/SHUSWTS0600-450x233.jpg';
  const catOptics = 'https://www.michigansportsoutdoor.com/wp-content/uploads/2025/10/ST2059-450x377.jpg';

  // 17 Authentic Brand Logos from Live Homepage
  const brandSpyderco = 'https://www.michigansportsoutdoor.com/wp-content/uploads/2025/11/spyderco-logo1.jpg';
  const brandKershaw = 'https://www.michigansportsoutdoor.com/wp-content/uploads/2025/11/kershaw-logo1.jpg';
  const brand3V = 'https://www.michigansportsoutdoor.com/wp-content/uploads/2025/11/3V_Gear_W1.jpg';
  const brandWE = 'https://www.michigansportsoutdoor.com/wp-content/uploads/2025/11/We-Knife-Co-Ltd_W-150x1081-1.jpg';
  const brandBearEdge = 'https://www.michigansportsoutdoor.com/wp-content/uploads/2025/11/Bear-Edge_W-150x481-1.jpg';
  const brandBoker = 'https://www.michigansportsoutdoor.com/wp-content/uploads/2025/11/211.jpg';
  const brandBearSon = 'https://www.michigansportsoutdoor.com/wp-content/uploads/2025/11/561.jpg';
  const brandCivivi = 'https://www.michigansportsoutdoor.com/wp-content/uploads/2025/11/18421.jpg';
  const brandColdSteel = 'https://www.michigansportsoutdoor.com/wp-content/uploads/2025/11/221.jpg';
  const brandCondor = 'https://www.michigansportsoutdoor.com/wp-content/uploads/2025/11/1121.jpg';
  const brandLionSteel = 'https://www.michigansportsoutdoor.com/wp-content/uploads/2025/11/5171.jpg';
  const brandMicrotech = 'https://www.michigansportsoutdoor.com/wp-content/uploads/2025/11/31781.jpg';
  const brandMora = 'https://www.michigansportsoutdoor.com/wp-content/uploads/2025/11/1421.jpg';
  const brandRoughRider = 'https://www.michigansportsoutdoor.com/wp-content/uploads/2025/11/2791.jpg';
  const brandSOG = 'https://www.michigansportsoutdoor.com/wp-content/uploads/2025/11/311.jpg';
  const brandTOPS = 'https://www.michigansportsoutdoor.com/wp-content/uploads/2025/11/461.jpg';

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
.mso-top-notice { background: #0f172a; color: #ffffff; padding: 8px 20px; display: flex; justify-content: space-between; align-items: center; font-size: 12px; font-weight: 700; border-radius: 4px; margin-bottom: 12px; }
.mso-top-notice a { color: #f5a623; text-decoration: underline; font-weight: 800; }
.mso-notice-arrows { color: #94a3b8; font-weight: 900; letter-spacing: 6px; }

/* 2. E-E-A-T Master Certification Strip (Ultra-Thin 1-Line Trust Bar) */
.mso-eeat-cert-strip { display: flex !important; flex-direction: row !important; align-items: center !important; justify-content: space-between !important; flex-wrap: nowrap !important; width: 100% !important; background: #ffffff !important; border: 1px solid #e2e8f0 !important; border-radius: 6px !important; padding: 6px 14px !important; margin: 0 0 14px 0 !important; box-sizing: border-box !important; gap: 8px !important; min-height: 38px !important; box-shadow: 0 1px 3px rgba(0,0,0,0.02) !important; }
.mso-eeat-cert-strip > p { display: none !important; }
.mso-eeat-cert-item { display: inline-flex !important; align-items: center !important; gap: 7px !important; text-decoration: none !important; color: #1e293b !important; font-size: 11px !important; font-weight: 800 !important; white-space: nowrap !important; padding: 2px 10px 2px 4px !important; border-right: 1px solid #e2e8f0 !important; transition: opacity 0.2s, transform 0.2s !important; flex: 1 1 auto !important; justify-content: center !important; }
.mso-eeat-cert-item:last-child { border-right: none !important; padding-right: 4px !important; }
.mso-eeat-cert-item:hover { opacity: 0.85 !important; transform: translateY(-1px) !important; }
.mso-eeat-icon-svg { width: 16px !important; height: 16px !important; min-width: 16px !important; display: inline-flex !important; align-items: center !important; justify-content: center !important; }
.mso-eeat-item-title { font-size: 11px !important; font-weight: 900 !important; color: #0f172a !important; text-transform: uppercase !important; letter-spacing: 0.3px !important; }
.mso-eeat-badge-pill { font-size: 9px !important; font-weight: 900 !important; padding: 1px 5px !important; border-radius: 3px !important; text-transform: uppercase !important; }
.mso-eeat-badge-pill.gold { background: #fef3c7 !important; color: #b45309 !important; border: 1px solid #fde68a !important; }
.mso-eeat-badge-pill.blue { background: #dbeafe !important; color: #1d4ed8 !important; border: 1px solid #bfdbfe !important; }
.mso-eeat-badge-pill.green { background: #dcfce7 !important; color: #15803d !important; border: 1px solid #bbf7d0 !important; }
.mso-eeat-badge-pill.dark { background: #f1f5f9 !important; color: #334155 !important; border: 1px solid #e2e8f0 !important; }
.mso-eeat-badge-pill.forest { background: #ecfdf5 !important; color: #065f46 !important; border: 1px solid #a7f3d0 !important; }

/* 3. Hero Visual Banner (Gemini-Created Design with Built-in USPs) */
.mso-gemini-hero-wrap { position: relative; width: 100%; border-radius: 8px; overflow: hidden; margin-bottom: 24px; box-shadow: 0 8px 24px rgba(0,0,0,0.18); line-height: 0; }
.mso-gemini-hero-link { display: block; width: 100%; text-decoration: none; }
.mso-gemini-hero-img { width: 100%; height: auto; display: block; border-radius: 8px; object-fit: cover; }

/* 4. Brand Logo Strip (All 17 Brands from Homepage) */
.mso-brand-strip { background: #ffffff; border: 1px solid #e2e8f0; border-radius: 6px; padding: 14px 20px; margin-bottom: 32px; display: flex; flex-direction: column; gap: 14px; box-shadow: 0 2px 6px rgba(0,0,0,0.03); }
.mso-brand-strip-top { display: flex; align-items: center; justify-content: space-between; gap: 16px; flex-wrap: wrap; }
.mso-brand-strip-left { font-size: 13px; font-weight: 900; color: #0f172a; text-transform: uppercase; letter-spacing: 0.5px; }
.mso-brand-strip-left span { color: #384c3c; font-weight: 900; }
.mso-all-brands-link { font-size: 12.5px; font-weight: 800; color: #384c3c; text-decoration: none; white-space: nowrap; border-bottom: 2px solid #384c3c; transition: all 0.2s; }
.mso-all-brands-link:hover { color: #f5a623; border-color: #f5a623; }
.mso-brand-strip-logos { display: flex; align-items: center; gap: 22px; overflow-x: auto; scrollbar-width: none; width: 100%; }
.mso-brand-strip-logos img { height: 26px; width: auto; object-fit: contain; filter: grayscale(100%); opacity: 0.8; transition: filter 0.2s, opacity 0.2s; }
.mso-brand-strip-logos img:hover { filter: grayscale(0%); opacity: 1; }

/* 5. Section Headers */
.mso-bhq-section-header { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 6px; margin-top: 14px; }
.mso-bhq-title-bold { font-size: 24px; font-weight: 900; color: #0f172a; margin: 0; text-transform: uppercase; letter-spacing: -0.3px; }
.mso-bhq-title-italic { font-style: italic; font-weight: 800; color: #475569; }
.mso-bhq-subtitle { font-size: 13px; color: #64748b; font-style: italic; margin: 0 0 18px 0; }
.mso-bhq-view-all-pill { background: #e2e8f0; color: #334155; font-size: 11.5px; font-weight: 800; padding: 4px 14px; border-radius: 14px; text-decoration: none; transition: background 0.2s, color 0.2s; white-space: nowrap; }
.mso-bhq-view-all-pill:hover { background: #0066cc; color: #ffffff; }

/* 6. Opportunities Too Good To Miss (Strict 1 Row of 4 Cards on Desktop) */
.mso-opps-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 36px; }
.mso-opp-card { position: relative; height: 320px; border-radius: 8px; overflow: hidden; display: flex; flex-direction: column; justify-content: flex-end; padding: 22px; box-sizing: border-box; text-decoration: none; box-shadow: 0 4px 12px rgba(0,0,0,0.12); transition: transform 0.2s, box-shadow 0.2s; }
.mso-opp-card:hover { transform: translateY(-4px); box-shadow: 0 8px 24px rgba(0,0,0,0.2); }
.mso-opp-card.card-1 { background: linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.85) 100%), url('${imgPromo1}') center/cover no-repeat; }
.mso-opp-card.card-2 { background: linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.85) 100%), url('${imgPromo2}') center/cover no-repeat; }
.mso-opp-card.card-3 { background: linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.85) 100%), url('${imgPromo3}') center/cover no-repeat; }
.mso-opp-card.card-4 { background: linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.85) 100%), url('${imgPromo4}') center/cover no-repeat; }
.mso-opp-badge { align-self: flex-start; background: #0066cc; color: #ffffff; font-size: 10px; font-weight: 900; text-transform: uppercase; padding: 3px 8px; border-radius: 4px; margin-bottom: auto; }
.mso-opp-badge.orange { background: #ea580c; }
.mso-opp-badge.gold { background: #f5a623; color: #0f172a; }
.mso-opp-title { font-size: 20px; font-weight: 900; color: #ffffff; text-transform: uppercase; margin: 0 0 8px 0; line-height: 1.15; }
.mso-opp-link { font-size: 13px; font-weight: 800; color: #f5a623; text-decoration: underline; text-underline-offset: 3px; }

/* 7. EXACT ORIGINAL HOMEPAGE "SHOP POPULAR CATEGORIES" SECTION */
.mso-orig-cat-slider-wrap { display: grid; grid-template-columns: 280px 1fr; gap: 24px; align-items: center; margin-bottom: 40px; background: #ffffff; padding: 8px 0; }
.mso-orig-cat-left { display: flex; flex-direction: column; gap: 10px; }
.mso-orig-cat-title { font-size: 24px; font-weight: 900; color: #384c3c; margin: 0; line-height: 1.2; }
.mso-orig-cat-desc { font-size: 13px; color: #475569; line-height: 1.55; margin: 0; }
.mso-orig-cat-nav { display: flex; gap: 10px; margin-top: 6px; }
.mso-orig-cat-btn { width: 36px; height: 36px; border-radius: 50%; border: 1.5px solid #cbd5e1; background: #ffffff; color: #334155; display: flex; align-items: center; justify-content: center; cursor: pointer; font-size: 16px; font-weight: 900; transition: all 0.2s; }
.mso-orig-cat-btn:hover { background: #384c3c; color: #ffffff; border-color: #384c3c; }
.mso-orig-cat-track { display: flex; gap: 16px; overflow-x: auto; scroll-behavior: smooth; scrollbar-width: none; padding: 6px 2px; }
.mso-orig-cat-track::-webkit-scrollbar { display: none; }
.mso-orig-cat-item { flex: 0 0 210px; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden; display: flex; flex-direction: column; text-decoration: none; box-shadow: 0 2px 8px rgba(0,0,0,0.04); transition: transform 0.2s, box-shadow 0.2s, border-color 0.2s; }
.mso-orig-cat-item:hover { transform: translateY(-4px); box-shadow: 0 8px 20px rgba(0,0,0,0.08); border-color: #384c3c; }
.mso-orig-cat-img-wrap { width: 100%; height: 170px; background: #f8fafc; display: flex; align-items: center; justify-content: center; overflow: hidden; }
.mso-orig-cat-img-wrap img { width: 100%; height: 100%; object-fit: contain; padding: 12px; box-sizing: border-box; transition: transform 0.3s; }
.mso-orig-cat-item:hover .mso-orig-cat-img-wrap img { transform: scale(1.08); }
.mso-orig-cat-body { padding: 12px 14px; border-top: 1px solid #f1f5f9; }
.mso-orig-cat-name { font-size: 13.5px; font-weight: 800; color: #0f172a; margin: 0 0 4px 0; line-height: 1.3; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.mso-orig-cat-products { font-size: 11.5px; color: #64748b; font-weight: 600; }

/* 8. Product Rows (Discover & Hot Sales) */
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

/* 9. Feature Banner Split Grid (Sharp Choices & Glow Gear) */
.mso-split-banner-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 40px; }
.mso-split-banner-card { position: relative; min-height: 240px; border-radius: 8px; overflow: hidden; padding: 32px 28px; box-sizing: border-box; display: flex; flex-direction: column; justify-content: space-between; text-decoration: none; box-shadow: 0 4px 14px rgba(0,0,0,0.08); transition: transform 0.2s; }
.mso-split-banner-card:hover { transform: translateY(-3px); }
.mso-split-banner-card.sharp { background: linear-gradient(135deg, #1e293b 0%, #384c3c 100%); color: #ffffff; }
.mso-split-banner-card.glow { background: linear-gradient(135deg, #0f172a 0%, #0066cc 100%); color: #ffffff; }
.mso-split-tag { font-size: 11px; font-weight: 900; text-transform: uppercase; letter-spacing: 0.5px; color: #f5a623; }
.mso-split-title { font-size: 26px; font-weight: 900; line-height: 1.15; margin: 6px 0 10px 0; }
.mso-split-sub { font-size: 13.5px; color: #e2e8f0; line-height: 1.45; margin: 0 0 16px 0; }
.mso-split-btn { display: inline-flex; align-items: center; gap: 6px; background: #ffffff; color: #0f172a !important; font-size: 12px; font-weight: 900; padding: 8px 18px; border-radius: 20px; text-transform: uppercase; width: fit-content; transition: background 0.2s, color 0.2s; }
.mso-split-banner-card:hover .mso-split-btn { background: #f5a623; color: #0f172a !important; }

/* 10. "Knives For Everything You Do" Activity Grid */
.mso-activity-grid { display: grid; grid-template-columns: repeat(6, 1fr); gap: 14px; margin-bottom: 40px; }
.mso-activity-card { background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px 14px; text-align: center; text-decoration: none; display: flex; flex-direction: column; align-items: center; gap: 10px; box-shadow: 0 2px 6px rgba(0,0,0,0.03); transition: transform 0.2s, border-color 0.2s, box-shadow 0.2s; }
.mso-activity-card:hover { transform: translateY(-4px); border-color: #384c3c; box-shadow: 0 8px 20px rgba(0,0,0,0.08); }
.mso-activity-icon { width: 44px; height: 44px; border-radius: 50%; background: #f1f5f9; display: flex; align-items: center; justify-content: center; color: #384c3c; font-weight: 900; font-size: 14px; transition: background 0.2s, color 0.2s; }
.mso-activity-card:hover .mso-activity-icon { background: #384c3c; color: #ffffff; }
.mso-activity-name { font-size: 12.5px; font-weight: 800; color: #0f172a; margin: 0; line-height: 1.3; }

/* 11. E-E-A-T Cutlery Lab & Testing Protocol Box */
.mso-eeat-lab-box { background: #f8fafc; border: 1.5px solid #cbd5e1; border-radius: 8px; padding: 28px 32px; margin-bottom: 36px; display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 32px; align-items: center; }
.mso-eeat-lab-title { font-size: 22px; font-weight: 900; color: #0f172a; margin: 0 0 10px 0; }
.mso-eeat-lab-p { font-size: 13px; color: #475569; line-height: 1.6; margin: 0 0 16px 0; }
.mso-eeat-pillars { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.mso-eeat-pillar-item { background: #ffffff; border: 1px solid #e2e8f0; border-radius: 6px; padding: 12px; }
.mso-eeat-pillar-num { font-size: 11px; font-weight: 900; color: #0066cc; text-transform: uppercase; margin-bottom: 2px; }
.mso-eeat-pillar-head { font-size: 12.5px; font-weight: 800; color: #0f172a; margin: 0; }
.mso-eeat-author-card { background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px; display: flex; gap: 16px; align-items: center; box-shadow: 0 2px 8px rgba(0,0,0,0.04); }
.mso-eeat-author-img { width: 64px; height: 64px; border-radius: 50%; object-fit: cover; border: 2px solid #475d4b; flex-shrink: 0; }
.mso-eeat-author-name { font-size: 15px; font-weight: 900; color: #0f172a; margin: 0 0 2px 0; }
.mso-eeat-author-role { font-size: 11px; font-weight: 800; color: #16a34a; text-transform: uppercase; margin-bottom: 6px; }
.mso-eeat-author-bio { font-size: 11.5px; color: #64748b; line-height: 1.45; margin: 0; }

/* 12. Blue Free Shipping Ribbon */
.mso-blue-banner { background: #0066cc; color: #ffffff; padding: 18px 24px; border-radius: 6px; text-align: center; font-size: 15px; font-weight: 900; margin-bottom: 36px; letter-spacing: 0.5px; box-shadow: 0 4px 12px rgba(0,102,204,0.25); }

/* 13. Knife Dreams Delivered (Customer Reviews Blue Box) */
.mso-review-showcase { background: #083b66; color: #ffffff; border-radius: 8px; padding: 32px 36px; margin-bottom: 36px; display: grid; grid-template-columns: 260px 1fr; gap: 32px; align-items: center; }
.mso-review-showcase-title { font-size: 26px; font-weight: 900; line-height: 1.15; color: #ffffff; margin: 0 0 8px 0; }
.mso-review-showcase-sub { font-size: 13px; color: #bfdbfe; margin: 0; line-height: 1.45; }
.mso-reviews-cards-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
.mso-review-bubble { background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); border-radius: 6px; padding: 18px; display: flex; flex-direction: column; justify-content: space-between; }
.mso-review-stars-gold { color: #f5a623; font-size: 12px; margin-bottom: 6px; font-weight: 800; }
.mso-review-bubble-title { font-size: 13.5px; font-weight: 800; color: #ffffff; margin: 0 0 6px 0; }
.mso-review-bubble-text { font-size: 12px; color: #e2e8f0; line-height: 1.45; margin: 0 0 12px 0; font-style: italic; }
.mso-review-bubble-author { font-size: 11px; font-weight: 800; color: #93c5fd; text-transform: uppercase; }

/* 14. Big 4 Icons Trust Strip */
.mso-big-trust-strip { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; text-align: center; margin-bottom: 40px; padding: 20px 0; border-bottom: 1px solid #e2e8f0; }
.mso-big-trust-item { display: flex; flex-direction: column; align-items: center; }
.mso-big-trust-badge { width: 48px; height: 48px; border-radius: 50%; background: #e0f2fe; color: #0066cc; display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 900; margin-bottom: 12px; }
.mso-big-trust-heading { font-size: 15px; font-weight: 800; color: #0f172a; margin: 0 0 6px 0; }
.mso-big-trust-p { font-size: 12px; color: #64748b; line-height: 1.45; margin: 0; max-width: 240px; }

/* 15. Featured Videos (YouTube Embeds) */
.mso-videos-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 40px; }
.mso-video-card { position: relative; height: 180px; border-radius: 6px; overflow: hidden; display: flex; flex-direction: column; justify-content: flex-end; padding: 14px; text-decoration: none; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
.mso-video-card img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
.mso-video-overlay { position: absolute; inset: 0; background: linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.85) 100%); }
.mso-play-btn { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 44px; height: 44px; background: #dc2626; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #ffffff; font-size: 16px; font-weight: 900; box-shadow: 0 4px 12px rgba(0,0,0,0.4); z-index: 2; }
.mso-video-title { position: relative; z-index: 2; font-size: 13px; font-weight: 800; color: #ffffff; margin: 0; line-height: 1.25; text-transform: uppercase; }

/* 16. Featured Articles */
.mso-articles-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 40px; }
.mso-article-card { background: #ffffff; border: 1px solid #e2e8f0; border-radius: 6px; overflow: hidden; display: flex; flex-direction: column; text-decoration: none; box-shadow: 0 2px 6px rgba(0,0,0,0.03); transition: transform 0.2s; }
.mso-article-card:hover { transform: translateY(-3px); }
.mso-article-img { width: 100%; height: 135px; object-fit: cover; }
.mso-article-body { padding: 14px; display: flex; flex-direction: column; flex: 1; }
.mso-article-title { font-size: 13.5px; font-weight: 800; color: #0f172a; margin: 0 0 12px 0; line-height: 1.35; }
.mso-article-btn { background: #0066cc; color: #ffffff !important; font-size: 11px; font-weight: 800; padding: 6px 14px; border-radius: 4px; text-transform: uppercase; width: fit-content; margin-top: auto; }

/* 17. FAQs Section (Original Homepage FAQs) */
.mso-faq-section { margin-bottom: 40px; }
.mso-faq-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-top: 14px; }
.mso-faq-card { background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 22px; box-shadow: 0 1px 4px rgba(0,0,0,0.03); }
.mso-faq-q { font-size: 15px; font-weight: 900; color: #0f172a; margin: 0 0 8px 0; line-height: 1.35; }
.mso-faq-a { font-size: 13px; color: #475569; line-height: 1.55; margin: 0; }

/* 18. Blade Club VIP Banner */
.mso-blade-club-footer { background: linear-gradient(135deg, #0b223c 0%, #0066cc 100%); color: #ffffff; border-radius: 8px; padding: 32px 40px; display: grid; grid-template-columns: 1fr 1fr; gap: 32px; align-items: center; box-shadow: 0 8px 24px rgba(0,102,204,0.25); }
.mso-club-left-title { font-size: 28px; font-weight: 900; letter-spacing: 0.5px; margin: 0 0 8px 0; }
.mso-club-left-title span { color: #f5a623; }
.mso-club-left-sub { font-size: 14px; color: #e2e8f0; margin: 0 0 18px 0; }
.mso-club-btn { background: #ffffff; color: #0066cc !important; font-size: 13px; font-weight: 900; padding: 10px 24px; border-radius: 20px; text-transform: uppercase; text-decoration: none; display: inline-block; }
.mso-club-right-perks { display: flex; flex-direction: column; gap: 12px; }
.mso-club-perk { display: flex; align-items: center; gap: 12px; font-size: 14px; font-weight: 800; color: #ffffff; }
.mso-club-perk-badge { width: 28px; height: 28px; border-radius: 50%; background: rgba(255,255,255,0.2); display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 900; color: #f5a623; }

/* 19. FIXED BOTTOM-RIGHT GOOGLE VERIFIED TRUST BADGE */
.mso-floating-google-badge { position: fixed; bottom: 22px; right: 22px; z-index: 99999; background: #ffffff; border: 1px solid #cbd5e1; border-radius: 50px; padding: 8px 16px 8px 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.14); display: inline-flex; align-items: center; gap: 10px; text-decoration: none !important; transition: transform 0.2s, box-shadow 0.2s; backdrop-filter: blur(8px); }
.mso-floating-google-badge:hover { transform: translateY(-3px); box-shadow: 0 8px 26px rgba(0,0,0,0.22); }
.mso-floating-g-logo { width: 22px; height: 22px; display: flex; align-items: center; justify-content: center; }
.mso-floating-text-wrap { display: flex; flex-direction: column; line-height: 1.15; }
.mso-floating-top { display: flex; align-items: center; gap: 6px; }
.mso-floating-rating { font-size: 13px; font-weight: 900; color: #0f172a; }
.mso-floating-stars { color: #f59e0b; font-size: 12px; letter-spacing: 1px; }
.mso-floating-sub { font-size: 10px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.3px; }

@media (max-width: 1080px) {
  .mso-eeat-cert-strip { display: flex; overflow-x: auto; scrollbar-width: none; -webkit-overflow-scrolling: touch; padding: 8px 12px; gap: 14px; }
  .mso-eeat-cert-strip::-webkit-scrollbar { display: none; }
  .mso-eeat-cert-item { flex: 0 0 auto; min-width: 175px; border-right: 1px solid #e2e8f0; padding-right: 12px; }
  .mso-opps-grid { grid-template-columns: repeat(2, 1fr); }
  .mso-orig-cat-slider-wrap { grid-template-columns: 1fr; }
  .mso-bhq-prod-row { grid-template-columns: repeat(2, 1fr); }
  .mso-split-banner-grid { grid-template-columns: 1fr; }
  .mso-activity-grid { grid-template-columns: repeat(3, 1fr); }
  .mso-eeat-lab-box { grid-template-columns: 1fr; }
  .mso-review-showcase { grid-template-columns: 1fr; }
  .mso-reviews-cards-row { grid-template-columns: 1fr; }
  .mso-big-trust-strip { grid-template-columns: repeat(2, 1fr); gap: 24px; }
  .mso-videos-grid { grid-template-columns: repeat(2, 1fr); }
  .mso-articles-grid { grid-template-columns: repeat(2, 1fr); }
  .mso-faq-grid { grid-template-columns: 1fr; }
  .mso-blade-club-footer { grid-template-columns: 1fr; }
}
@media (max-width: 680px) {
  .mso-opps-grid { grid-template-columns: 1fr; }
  .mso-bhq-prod-row { grid-template-columns: 1fr; }
  .mso-activity-grid { grid-template-columns: repeat(2, 1fr); }
  .mso-big-trust-strip { grid-template-columns: 1fr; }
  .mso-videos-grid { grid-template-columns: 1fr; }
  .mso-articles-grid { grid-template-columns: 1fr; }
  .mso-floating-google-badge { bottom: 14px; right: 14px; padding: 6px 12px 6px 10px; }
  .mso-floating-sub { font-size: 9px; }
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
        },
        "sameAs": [
          "https://www.trustpilot.com/review/michigansportsoutdoor.com",
          "https://www.bbb.org/us/mi/michigan-sports-outdoor",
          "https://maps.google.com/?q=Michigan+Sports+Outdoor",
          "https://www.bladeforums.com",
          "https://www.michigan-sportsman.com"
        ]
      },
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://www.michigansportsoutdoor.com/shop/?s={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    },
    {
      "@type": "FAQPage",
      "@id": "https://www.michigansportsoutdoor.com/october-season/#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is Michigan Sports Outdoor known for?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Michigan Sports Outdoor is America's premier outfitter for sportsmen, hunters, anglers, and outdoor enthusiasts. We stock over 7,000+ brand-name products including folding EDC pocket knives, fixed hunting blades, camping cookware, survival axes, and multi-tools from top cutlery makers."
          }
        },
        {
          "@type": "Question",
          "name": "What are Michigan knife laws for carrying pocket and hunting knives?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Under Michigan law (MCL 750.227), folding pocket knives and typical hunting knives carried without harmful intent are legal for everyday carry. Following the repeal of the switchblade ban, automatic knives and OTF knives are also legal to own and carry for lawful sporting purposes."
          }
        },
        {
          "@type": "Question",
          "name": "What is the best knife for field dressing deer in Michigan?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "A high-carbon or stainless drop-point fixed blade with a 3.5 to 4-inch blade offers optimal belly curve for gutting and skinning whitetail deer without puncturing internal organs or dulling prematurely on bone."
          }
        },
        {
          "@type": "Question",
          "name": "How fast does Michigan Sports Outdoor ship customer orders?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "All orders are packed securely and dispatched rapidly across the United States. In-stock products typically ship within 24 to 48 business hours with verified live tracking numbers."
          }
        }
      ]
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

  <!-- 2. E-E-A-T MASTER CERTIFICATION STRIP (ULTRA-THIN 1-LINE TRUST BAR) -->
  <div class="mso-eeat-cert-strip"><a href="https://maps.google.com/?q=Michigan+Sports+Outdoor" target="_blank" rel="noopener noreferrer" class="mso-eeat-cert-item"><span class="mso-eeat-icon-svg"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/></svg></span><span class="mso-eeat-item-title">Google Verified</span><span class="mso-eeat-badge-pill gold">5.0 Star</span></a><a href="https://www.bbb.org/us/mi/michigan-sports-outdoor" target="_blank" rel="noopener noreferrer" class="mso-eeat-cert-item"><span class="mso-eeat-icon-svg"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="24" rx="4" fill="#005A9C"/><text x="12" y="16" fill="#ffffff" font-family="Arial, sans-serif" font-size="9" font-weight="900" text-anchor="middle">BBB</text></svg></span><span class="mso-eeat-item-title">BBB Accredited</span><span class="mso-eeat-badge-pill blue">A+ Rating</span></a><a href="https://www.trustpilot.com/review/michigansportsoutdoor.com" target="_blank" rel="noopener noreferrer" class="mso-eeat-cert-item"><span class="mso-eeat-icon-svg"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="24" rx="4" fill="#00b67a"/><path d="M12 4.5l2.32 7.13h7.5l-6.07 4.41 2.32 7.13L12 18.76l-6.07 4.41 2.32-7.13-6.07-4.41h7.5z" fill="#ffffff"/></svg></span><span class="mso-eeat-item-title">Trustpilot</span><span class="mso-eeat-badge-pill green">Verified</span></a><a href="https://www.bladeforums.com" target="_blank" rel="noopener noreferrer" class="mso-eeat-cert-item"><span class="mso-eeat-icon-svg"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="24" rx="4" fill="#1e293b"/><path d="M5 19L19 5M5 5l14 14" stroke="#f5a623" stroke-width="2.2" stroke-linecap="round"/><circle cx="12" cy="12" r="2.8" fill="#ffffff"/></svg></span><span class="mso-eeat-item-title">BladeForums</span><span class="mso-eeat-badge-pill dark">Member</span></a><a href="https://www.michigan-sportsman.com" target="_blank" rel="noopener noreferrer" class="mso-eeat-cert-item"><span class="mso-eeat-icon-svg"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="24" rx="4" fill="#384c3c"/><path d="M12 3.5L5.5 13.5h4v7h5v-7h4L12 3.5z" fill="#f5a623"/></svg></span><span class="mso-eeat-item-title">MichiganSportsman</span><span class="mso-eeat-badge-pill forest">Partner</span></a></div>

  <!-- 3. HERO BANNER (GEMINI-GENERATED WITH INTEGRATED CRO & USPs) -->
  <section class="mso-gemini-hero-wrap">
    <a href="https://www.michigansportsoutdoor.com/shop/" class="mso-gemini-hero-link">
      <img src="${imgHero}" alt="Michigan Sports Outdoor - October Hunting &amp; Cutlery Outfitter" class="mso-gemini-hero-img" />
    </a>
  </section>

  <!-- 4. BRAND LOGO STRIP (ALL 17 HOMEPAGE BRANDS) -->
  <section class="mso-brand-strip">
    <div class="mso-brand-strip-top">
      <div class="mso-brand-strip-left">
        THE BEST KNIVES &amp; THE BEST SERVICE ONLY AT <span>MICHIGAN SPORTS OUTDOOR</span>
      </div>
      <a href="https://www.michigansportsoutdoor.com/brands/" class="mso-all-brands-link">All Brands</a>
    </div>
    <div class="mso-brand-strip-logos">
      <a href="https://www.michigansportsoutdoor.com/brand/spyderco/"><img src="${brandSpyderco}" alt="Spyderco" /></a>
      <a href="https://www.michigansportsoutdoor.com/brand/kershaw/"><img src="${brandKershaw}" alt="Kershaw" /></a>
      <a href="https://www.michigansportsoutdoor.com/brand/3v-gear/"><img src="${brand3V}" alt="3V Gear" /></a>
      <a href="https://www.michigansportsoutdoor.com/brand/we-knife-co-ltd/"><img src="${brandWE}" alt="WE Knife" /></a>
      <a href="https://www.michigansportsoutdoor.com/brand/bear-edge/"><img src="${brandBearEdge}" alt="Bear Edge" /></a>
      <a href="https://www.michigansportsoutdoor.com/brand/boker/"><img src="${brandBoker}" alt="Boker" /></a>
      <a href="https://www.michigansportsoutdoor.com/brand/bear-son/"><img src="${brandBearSon}" alt="Bear & Son" /></a>
      <a href="https://www.michigansportsoutdoor.com/brand/civivi/"><img src="${brandCivivi}" alt="Civivi" /></a>
      <a href="https://www.michigansportsoutdoor.com/brand/cold-steel/"><img src="${brandColdSteel}" alt="Cold Steel" /></a>
      <a href="https://www.michigansportsoutdoor.com/brand/condor/"><img src="${brandCondor}" alt="Condor" /></a>
      <a href="https://www.michigansportsoutdoor.com/brand/lionsteel/"><img src="${brandLionSteel}" alt="LionSteel" /></a>
      <a href="https://www.michigansportsoutdoor.com/brand/microtech/"><img src="${brandMicrotech}" alt="Microtech" /></a>
      <a href="https://www.michigansportsoutdoor.com/brand/mora/"><img src="${brandMora}" alt="Morakniv" /></a>
      <a href="https://www.michigansportsoutdoor.com/brand/rough-rider/"><img src="${brandRoughRider}" alt="Rough Rider" /></a>
      <a href="https://www.michigansportsoutdoor.com/brand/sog/"><img src="${brandSOG}" alt="SOG" /></a>
      <a href="https://www.michigansportsoutdoor.com/brand/tops/"><img src="${brandTOPS}" alt="TOPS Knives" /></a>
    </div>
  </section>

  <!-- 5. OPPORTUNITIES TOO GOOD TO MISS (STRICT 1 ROW OF 4 CARDS) -->
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

  <!-- 6. EXACT ORIGINAL HOMEPAGE "SHOP POPULAR CATEGORIES" SECTION (UNDER OPPORTUNITIES) -->
  <section class="mso-orig-cat-slider-wrap">
    <div class="mso-orig-cat-left">
      <h3 class="mso-orig-cat-title">Shop Popular Categories</h3>
      <p class="mso-orig-cat-desc">
        Michigan Sports Outdoor stocks everything for hunting, camping, and outdoor adventures with 4 main categories: apparel, camping gear, premium knives, and hunting knives.
      </p>
      <p class="mso-orig-cat-desc">
        Whether you're outfitting for a hunting trip or weekend adventure, we have fair prices for our USA customers.
      </p>
      <div class="mso-orig-cat-nav">
        <button class="mso-orig-cat-btn" onclick="scrollCats(-1)" aria-label="Previous Categories">&larr;</button>
        <button class="mso-orig-cat-btn" onclick="scrollCats(1)" aria-label="Next Categories">&rarr;</button>
      </div>
    </div>

    <div class="mso-orig-cat-track" id="msoCatSliderTrack">
      <a href="https://www.michigansportsoutdoor.com/collections/knives/locking-knives/" class="mso-orig-cat-item">
        <div class="mso-orig-cat-img-wrap"><img src="${catLocking}" alt="Locking Pocket Knives" loading="lazy" /></div>
        <div class="mso-orig-cat-body">
          <div class="mso-orig-cat-name" title="Locking Pocket Knives (EDC &amp; Tactical)">Locking Pocket Knives</div>
          <div class="mso-orig-cat-products">15243 products</div>
        </div>
      </a>

      <a href="https://www.michigansportsoutdoor.com/collections/lights/" class="mso-orig-cat-item">
        <div class="mso-orig-cat-img-wrap"><img src="${catLights}" alt="Flashlights &amp; Tactical Illumination" loading="lazy" /></div>
        <div class="mso-orig-cat-body">
          <div class="mso-orig-cat-name" title="Flashlights &amp; Tactical Illumination">Flashlights &amp; Tac...</div>
          <div class="mso-orig-cat-products">1006 products</div>
        </div>
      </a>

      <a href="https://www.michigansportsoutdoor.com/collections/cleaning-and-maintenance/" class="mso-orig-cat-item">
        <div class="mso-orig-cat-img-wrap"><img src="${catCleaning}" alt="Cleaning and Maintenance" loading="lazy" /></div>
        <div class="mso-orig-cat-body">
          <div class="mso-orig-cat-name" title="Cleaning and Maintenance">Cleaning and Ma...</div>
          <div class="mso-orig-cat-products">309 products</div>
        </div>
      </a>

      <a href="https://www.michigansportsoutdoor.com/collections/fishing/" class="mso-orig-cat-item">
        <div class="mso-orig-cat-img-wrap"><img src="${catFishing}" alt="Fishing Tackle, Fillet Knives &amp; Angler Gear" loading="lazy" /></div>
        <div class="mso-orig-cat-body">
          <div class="mso-orig-cat-name" title="Fishing Tackle, Fillet Knives &amp; Angler Gear">Fishing Tackle, F...</div>
          <div class="mso-orig-cat-products">511 products</div>
        </div>
      </a>

      <a href="https://www.michigansportsoutdoor.com/collections/knives/hunting-knife-sets/" class="mso-orig-cat-item">
        <div class="mso-orig-cat-img-wrap"><img src="${catHunting}" alt="Hunting Knife Sets" loading="lazy" /></div>
        <div class="mso-orig-cat-body">
          <div class="mso-orig-cat-name" title="Hunting Knife Sets">Hunting Knife Sets</div>
          <div class="mso-orig-cat-products">98 products</div>
        </div>
      </a>

      <a href="https://www.michigansportsoutdoor.com/collections/camping-and-survival/" class="mso-orig-cat-item">
        <div class="mso-orig-cat-img-wrap"><img src="${catCamping}" alt="Camping &amp; Wilderness Survival Gear" loading="lazy" /></div>
        <div class="mso-orig-cat-body">
          <div class="mso-orig-cat-name" title="Camping &amp; Wilderness Survival Gear">Camping &amp; Survival</div>
          <div class="mso-orig-cat-products">1314 products</div>
        </div>
      </a>

      <a href="https://www.michigansportsoutdoor.com/collections/apparel/" class="mso-orig-cat-item">
        <div class="mso-orig-cat-img-wrap"><img src="${catApparel}" alt="Outdoor Tactical Apparel, Hats &amp; Shirts" loading="lazy" /></div>
        <div class="mso-orig-cat-body">
          <div class="mso-orig-cat-name" title="Outdoor Tactical Apparel, Hats &amp; Shirts">Tactical Apparel</div>
          <div class="mso-orig-cat-products">511 products</div>
        </div>
      </a>

      <a href="https://www.michigansportsoutdoor.com/collections/knives/premium-knives/" class="mso-orig-cat-item">
        <div class="mso-orig-cat-img-wrap"><img src="${catPremium}" alt="Premium &amp; Custom-Grade Cutlery" loading="lazy" /></div>
        <div class="mso-orig-cat-body">
          <div class="mso-orig-cat-name" title="Premium &amp; Custom-Grade Cutlery">Premium Cutlery</div>
          <div class="mso-orig-cat-products">938 products</div>
        </div>
      </a>

      <a href="https://www.michigansportsoutdoor.com/collections/kitchen/" class="mso-orig-cat-item">
        <div class="mso-orig-cat-img-wrap"><img src="${catKitchen}" alt="Kitchen Cutlery &amp; Chef Knives" loading="lazy" /></div>
        <div class="mso-orig-cat-body">
          <div class="mso-orig-cat-name" title="Kitchen Cutlery &amp; Chef Knives">Kitchen Cutlery</div>
          <div class="mso-orig-cat-products">1201 products</div>
        </div>
      </a>

      <a href="https://www.michigansportsoutdoor.com/collections/optics/" class="mso-orig-cat-item">
        <div class="mso-orig-cat-img-wrap"><img src="${catOptics}" alt="Optics &amp; Scopes" loading="lazy" /></div>
        <div class="mso-orig-cat-body">
          <div class="mso-orig-cat-name" title="Optics &amp; Scopes">Optics &amp; Scopes</div>
          <div class="mso-orig-cat-products">351 products</div>
        </div>
      </a>
    </div>
  </section>

  <!-- 7. DISCOVER NEW KNIVES (PRODUCT ROW) -->
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

  <!-- 8. SHARP CHOICES & GLOW GEAR (ORIGINAL HOMEPAGE HIGHLIGHTS) -->
  <section class="mso-split-banner-grid">
    <a href="https://www.michigansportsoutdoor.com/collections/knives/" class="mso-split-banner-card sharp">
      <div>
        <span class="mso-split-tag">FEATURED CUTLERY</span>
        <h3 class="mso-split-title">Sharp Choices.<br/>Cut Sharper. Work Smarter.</h3>
        <p class="mso-split-sub">Curated pocket folders, hard-use tactical fixed blades, and precision slicing knives for American sportsmen.</p>
      </div>
      <span class="mso-split-btn">Shop Cutlery &rarr;</span>
    </a>

    <a href="https://www.michigansportsoutdoor.com/collections/lights/" class="mso-split-banner-card glow">
      <div>
        <span class="mso-split-tag">ILLUMINATION &amp; CAMP</span>
        <h3 class="mso-split-title">Glow Gear.<br/>See More. Do More. Anywhere.</h3>
        <p class="mso-split-sub">Tactical flashlights, rechargeable headlamps, and rugged backcountry lanterns built for midnight tracking.</p>
      </div>
      <span class="mso-split-btn">Find Your Light &rarr;</span>
    </a>
  </section>

  <!-- 9. "KNIVES FOR EVERYTHING YOU DO" ACTIVITY GRID (BLADE HQ STYLE) -->
  <section>
    <div class="mso-bhq-section-header">
      <h2 class="mso-bhq-title-bold">Knives For <span class="mso-bhq-title-italic">Everything</span> You Do</h2>
      <a href="https://www.michigansportsoutdoor.com/shop/" class="mso-bhq-view-all-pill">View All Activities</a>
    </div>
    <div class="mso-activity-grid">
      <a href="https://www.michigansportsoutdoor.com/collections/knives/locking-knives/" class="mso-activity-card">
        <div class="mso-activity-icon">EDC</div>
        <h4 class="mso-activity-name">Everyday Carry</h4>
      </a>

      <a href="https://www.michigansportsoutdoor.com/collections/knives/hunting-knife-sets/" class="mso-activity-card">
        <div class="mso-activity-icon">HUNT</div>
        <h4 class="mso-activity-name">Hunting &amp; Dressing</h4>
      </a>

      <a href="https://www.michigansportsoutdoor.com/collections/knives/premium-knives/" class="mso-activity-card">
        <div class="mso-activity-icon">TACT</div>
        <h4 class="mso-activity-name">Tactical &amp; Duty</h4>
      </a>

      <a href="https://www.michigansportsoutdoor.com/collections/camping-and-survival/" class="mso-activity-card">
        <div class="mso-activity-icon">CAMP</div>
        <h4 class="mso-activity-name">Camping &amp; Bushcraft</h4>
      </a>

      <a href="https://www.michigansportsoutdoor.com/collections/fishing/" class="mso-activity-card">
        <div class="mso-activity-icon">SURV</div>
        <h4 class="mso-activity-name">Survival &amp; Fillet</h4>
      </a>

      <a href="https://www.michigansportsoutdoor.com/collections/kitchen/" class="mso-activity-card">
        <div class="mso-activity-icon">CHEF</div>
        <h4 class="mso-activity-name">Kitchen Cutlery</h4>
      </a>
    </div>
  </section>

  <!-- 10. E-E-A-T CUTLERY TESTING LAB & LEAD ANALYST STANDARDS -->
  <section class="mso-eeat-lab-box">
    <div>
      <h3 class="mso-eeat-lab-title">How We Test, Benchmark &amp; Score Cutlery</h3>
      <p class="mso-eeat-lab-p">Every knife line curated by Michigan Sports Outdoor undergoes strict metallurgic and field testing before being recommended to American sportsmen.</p>
      <div class="mso-eeat-pillars">
        <div class="mso-eeat-pillar-item">
          <div class="mso-eeat-pillar-num">TEST 01</div>
          <h5 class="mso-eeat-pillar-head">Rockwell HRC Hardness</h5>
        </div>
        <div class="mso-eeat-pillar-item">
          <div class="mso-eeat-pillar-num">TEST 02</div>
          <h5 class="mso-eeat-pillar-head">15 vs 20 Edge Geometry</h5>
        </div>
        <div class="mso-eeat-pillar-item">
          <div class="mso-eeat-pillar-num">TEST 03</div>
          <h5 class="mso-eeat-pillar-head">Whitetail Field Dressing</h5>
        </div>
        <div class="mso-eeat-pillar-item">
          <div class="mso-eeat-pillar-num">TEST 04</div>
          <h5 class="mso-eeat-pillar-head">Corrosion &amp; Wet Camp Care</h5>
        </div>
      </div>
    </div>
    <div class="mso-eeat-author-card">
      <img src="${authorAvatar}" alt="Mubashar Shahzad" class="mso-eeat-author-img" />
      <div>
        <h4 class="mso-eeat-author-name">Mubashar Shahzad</h4>
        <div class="mso-eeat-author-role">Lead Cutlery Analyst &amp; Whitetail Field Tester</div>
        <p class="mso-eeat-author-bio">Over 8+ years evaluating super steels, heat treatments, and backcountry cutlery ergonomics for Michigan Sports Outdoor.</p>
      </div>
    </div>
  </section>

  <!-- 11. FULL WIDTH BLUE FREE SHIPPING BANNER -->
  <div class="mso-blue-banner">
    FREE SHIPPING: All domestic USA orders ship for free when you spend $99 or more.
  </div>

  <!-- 12. HOT SALES (PRODUCT ROW WITH STARS) -->
  <section>
    <div class="mso-bhq-section-header">
      <h2 class="mso-bhq-title-bold">HOT SALES &amp; WEEKLY OUTDOOR STEALS</h2>
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

  <!-- 13. KNIFE DREAMS DELIVERED (CUSTOMER REVIEWS BLUE BOX) -->
  <section class="mso-review-showcase">
    <div>
      <h3 class="mso-review-showcase-title">Knife Dreams, Delivered</h3>
      <p class="mso-review-showcase-sub">Here is what our verified American sportsmen &amp; blade collectors have to say.</p>
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

  <!-- 14. BIG 4 ICONS TRUST STRIP -->
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

  <!-- 15. FEATURED VIDEOS (YOUTUBE EMBEDS FROM USER) -->
  <section>
    <div class="mso-bhq-section-header">
      <h2 class="mso-bhq-title-bold">Featured Field Videos</h2>
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
        <img src="${imgPromo3}" alt="Whitetail Field Sharpening Guide" />
        <div class="mso-video-overlay"></div>
        <div class="mso-play-btn">&gt;</div>
        <h4 class="mso-video-title">Whitetail Field Sharpening Guide</h4>
      </a>
    </div>
  </section>

  <!-- 16. FEATURED ARTICLES / FROM THE MSO JOURNAL -->
  <section>
    <div class="mso-bhq-section-header">
      <h2 class="mso-bhq-title-bold">From The MSO Journal &amp; Field Tests</h2>
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

  <!-- 17. FREQUENTLY ASKED MICHIGAN SPORTSMAN QUESTIONS (ORIGINAL HOMEPAGE FAQS) -->
  <section class="mso-faq-section">
    <div class="mso-bhq-section-header">
      <h2 class="mso-bhq-title-bold">Frequently Asked Michigan Sportsman Questions</h2>
    </div>
    <p class="mso-bhq-subtitle">Clear, field-tested answers to the most common questions regarding hunting, knives, and outdoor gear in Michigan.</p>
    <div class="mso-faq-grid">
      <div class="mso-faq-card">
        <h3 class="mso-faq-q">What is Michigan Sports Outdoor known for?</h3>
        <p class="mso-faq-a">Michigan Sports Outdoor is America's premier outfitter for sportsmen, hunters, anglers, and outdoor enthusiasts. We stock over 7,000+ brand-name products including folding EDC pocket knives, fixed hunting blades, camping cookware, survival axes, and multi-tools from top cutlery makers like Kershaw, Spyderco, Morakniv, and Frost Cutlery.</p>
      </div>

      <div class="mso-faq-card">
        <h3 class="mso-faq-q">What are Michigan knife laws for carrying pocket and hunting knives?</h3>
        <p class="mso-faq-a">Under Michigan law (MCL 750.227), folding pocket knives and typical hunting knives carried without harmful intent are legal for everyday carry. Following the 2017 repeal of the switchblade ban, automatic knives and OTF knives are also legal to own and carry openly or concealed for lawful sporting purposes.</p>
      </div>

      <div class="mso-faq-card">
        <h3 class="mso-faq-q">What is the best knife for field dressing deer in Michigan?</h3>
        <p class="mso-faq-a">A high-carbon or stainless drop-point fixed blade with a 3.5 to 4-inch blade (such as Morakniv or Skallywag tactical skinners) offers optimal belly curve for gutting and skinning whitetail deer without puncturing internal organs or dulling on bone.</p>
      </div>

      <div class="mso-faq-card">
        <h3 class="mso-faq-q">How fast does Michigan Sports Outdoor ship customer orders?</h3>
        <p class="mso-faq-a">All orders are packed securely and dispatched rapidly across the United States. In-stock products typically ship within 24 to 48 business hours with verified tracking numbers.</p>
      </div>
    </div>
  </section>

  <!-- 18. MSO BLADE CLUB VIP FOOTER BANNER -->
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

<!-- 19. FIXED BOTTOM-RIGHT GOOGLE VERIFIED 5.0 TRUST SEAL -->
<a href="https://maps.google.com/?q=Michigan+Sports+Outdoor" target="_blank" rel="noopener noreferrer" class="mso-floating-google-badge" title="Verified 5.0 Rating on Google Reviews">
  <div class="mso-floating-g-logo">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
    </svg>
  </div>
  <div class="mso-floating-text-wrap">
    <div class="mso-floating-top">
      <span class="mso-floating-rating">5.0</span>
      <span class="mso-floating-stars">&#9733;&#9733;&#9733;&#9733;&#9733;</span>
    </div>
    <span class="mso-floating-sub">Google Verified</span>
  </div>
</a>

<script>
function scrollCats(direction) {
  const container = document.getElementById('msoCatSliderTrack');
  if (container) {
    const scrollAmount = 230 * 2;
    container.scrollBy({ left: direction * scrollAmount, behavior: 'smooth' });
  }
}
</script>
`;

  console.log('Deploying updated E-E-A-T Blade HQ page to /october-season/ (Page #167531)...');
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
    throw new Error(`Failed to deploy: ${res.status} ${err}`);
  }

  const data = await res.json();
  console.log('Page updated successfully:', data.link);
}

deployEEATBladeHQOctoberPage().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
