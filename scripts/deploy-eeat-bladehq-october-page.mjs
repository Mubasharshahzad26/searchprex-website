const fs = require('fs');

async function deployRealProductsOctoberPage() {
  const baseUrl = 'https://www.michigansportsoutdoor.com';
  const username = 'apiuser';
  const appPassword = 'cvxm Bi7y 6o3y r7HJ M1Wn mSMM';
  const auth = Buffer.from(`${username}:${appPassword}`).toString('base64');
  const headers = {
    Authorization: `Basic ${auth}`,
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
    'Content-Type': 'application/json'
  };

  const allProducts = JSON.parse(fs.readFileSync('C:/Users/Mubashar Shahzad/.gemini/antigravity/brain/a8924898-ab09-41e9-8d00-8dda8d7dfbf4/scratch/all-extracted-products.json', 'utf8'));

  // Clean HTML entities helper
  const cleanStr = (s) => (s || '').replace(/&#8243;/g, '"').replace(/&#36;/g, '$').replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#039;/g, "'");

  // Pick top authentic knives for "Discover New Knives" (8 items)
  const discoverKnives = allProducts.slice(0, 8).map(p => ({
    title: cleanStr(p.title),
    img: p.img,
    price: cleanStr(p.salePrice || '$49.95'),
    oldPrice: cleanStr(p.regPrice),
    link: p.link,
    sku: p.sku
  }));

  // Pick authentic discounted items for "Hot Sales & Weekly Outdoor Steals" (8 items)
  const hotSales = allProducts.slice(8, 16).map(p => ({
    title: cleanStr(p.title),
    img: p.img,
    price: cleanStr(p.salePrice || '$29.95'),
    oldPrice: cleanStr(p.regPrice),
    link: p.link,
    sku: p.sku
  }));

  // Signature Blade HQ Hero Background
  const imgHero = 'https://www.michigansportsoutdoor.com/wp-content/uploads/2026/09/mso-bladehq-inspired-hero-banner-2026.jpg';

  // 4 Seasonal Cards for "Opportunities Too Good To Miss"
  const imgPromo1 = 'https://www.michigansportsoutdoor.com/wp-content/uploads/2026/09/mso-october-whitetail-fixed-blades-promo.jpg';
  const imgPromo2 = 'https://www.michigansportsoutdoor.com/wp-content/uploads/2026/09/mso-october-special-edition-blades-drop.jpg';
  const imgPromo3 = 'https://www.michigansportsoutdoor.com/wp-content/uploads/2026/09/mso-october-fall-hunting-gift-guide-2026.jpg';
  const imgPromo4 = 'https://www.michigansportsoutdoor.com/wp-content/uploads/2026/09/WE18062XA1_add_01.jpg';

  // Authentic 10 Categories
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

  // Brand Logos
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

  // Review Avatars
  const avatarJoeSell = 'https://www.michigansportsoutdoor.com/wp-content/uploads/2026/08/ChIJc3vpny2NhYYR700meVMhtto_552fe3ee12ce541ed6a0f3739c99d635.jpg';
  const avatarAbdullah = 'https://www.michigansportsoutdoor.com/wp-content/uploads/2026/08/ChIJc3vpny2NhYYR700meVMhtto_dd7e84c4e08cfcb9a1e5ad9362d7d4b9.jpg';
  const avatarHassan = 'https://www.michigansportsoutdoor.com/wp-content/uploads/2026/08/ChIJc3vpny2NhYYR700meVMhtto_b5a5fa12ed4ab6d736b1e92de78d5ac7.jpg';

  // Articles
  const blogHunting = 'https://www.michigansportsoutdoor.com/wp-content/uploads/2026/09/mso-october-whitetail-deer-knife-guide.jpg';
  const blogSharpening = 'https://www.michigansportsoutdoor.com/wp-content/uploads/2026/09/mso-october-knife-sharpening-home-guide.jpg';
  const blogBushcraft = 'https://www.michigansportsoutdoor.com/wp-content/uploads/2026/09/mso-october-morakniv-camp-knife-battle.jpg';
  const blogSteels = 'https://www.michigansportsoutdoor.com/wp-content/uploads/2026/09/WE18062XA1_add_01.jpg';

  const cleanCss = `
html, body, #page, #wrapper, .site, .site-wrapper, .site-content, #content, .content-area, #primary, #main, .site-main, .entry-content, .entry-content-wrap, .page-content, .post-content, .container, .container-wrap, .page-wrapper, .site-main-content { background-color: #ffffff !important; background: #ffffff !important; color: #222222; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; -webkit-font-smoothing: antialiased; }
.entry-content { padding-left: 0 !important; padding-right: 0 !important; max-width: 100% !important; width: 100% !important; overflow-x: hidden; }

/* WP AutoP and Empty Paragraph Filter Removal */
.mso-bhq-container p:empty,
.mso-bhq-container br,
.mso-bhq-prod-row > p,
.mso-activity-grid > p,
.mso-opps-grid > p,
.mso-faq-grid > p,
.mso-reviews-cards-row > p,
.mso-videos-grid > p,
.mso-articles-grid > p { display: none !important; margin: 0 !important; padding: 0 !important; font-size: 0 !important; line-height: 0 !important; height: 0 !important; }

.mso-bhq-container { max-width: 1320px; margin: 0 auto; padding: 0 20px 40px 20px; box-sizing: border-box; width: 100%; }

/* 1. Top Notice Bar */
.mso-top-notice { background: #0f172a; color: #ffffff; padding: 8px 20px; display: flex; justify-content: space-between; align-items: center; font-size: 12px; font-weight: 700; border-radius: 4px; margin-bottom: 12px; }
.mso-top-notice a { color: #f5a623; text-decoration: underline; font-weight: 800; }
.mso-notice-arrows { color: #94a3b8; font-weight: 900; letter-spacing: 6px; }

/* 2. E-E-A-T Master Certification Strip */
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

/* 3. Hero Banner (Blade HQ Format) */
.mso-bhq-hero { position: relative; width: 100%; min-height: 440px; border-radius: 8px; overflow: hidden; background: #0f172a url('${imgHero}') center/cover no-repeat; margin-bottom: 24px; box-shadow: 0 8px 24px rgba(0,0,0,0.25); display: flex; align-items: center; padding: 48px 40px; box-sizing: border-box; }
.mso-bhq-hero-overlay { position: absolute; inset: 0; background: linear-gradient(90deg, rgba(15,23,42,0.94) 0%, rgba(15,23,42,0.72) 46%, rgba(15,23,42,0.12) 82%, rgba(15,23,42,0.25) 100%); }
.mso-bhq-hero-content { position: relative; z-index: 2; max-width: 580px; }
.mso-bhq-hero-title { font-size: 46px; font-weight: 900; line-height: 1.04; color: #ffffff; text-transform: uppercase; margin: 0 0 12px 0; letter-spacing: -1px; text-shadow: 0 2px 10px rgba(0,0,0,0.7); }
.mso-bhq-hero-sub { font-size: 16px; color: #f1f5f9; margin: 0 0 24px 0; font-weight: 600; text-shadow: 0 1px 6px rgba(0,0,0,0.6); line-height: 1.45; }
.mso-bhq-hero-action { position: absolute; bottom: 36px; right: 40px; z-index: 2; }
.mso-bhq-hero-btn { background: #ffffff; color: #0066cc !important; font-size: 15px; font-weight: 900; padding: 13px 30px; border-radius: 30px; text-decoration: none; text-transform: uppercase; letter-spacing: 0.5px; box-shadow: 0 4px 16px rgba(0,0,0,0.35); transition: transform 0.2s, background 0.2s, color 0.2s; display: inline-block; }
.mso-bhq-hero-btn:hover { background: #f5a623; color: #0f172a !important; transform: scale(1.05); }

/* 4. Brand Logo Strip */
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

/* 6. Opportunities Too Good To Miss */
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

/* 7. Shop Popular Categories Slider */
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

/* 8. 4-Column Product Grid (Discover & Hot Sales) */
.mso-bhq-prod-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 18px; margin-bottom: 36px; }
.mso-bhq-prod-card { background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; display: flex; flex-direction: column; justify-content: space-between; position: relative; box-shadow: 0 2px 6px rgba(0,0,0,0.04); transition: border-color 0.2s, box-shadow 0.2s, transform 0.2s; text-decoration: none; min-height: 330px; box-sizing: border-box; }
.mso-bhq-prod-card:hover { border-color: #384c3c; box-shadow: 0 8px 20px rgba(0,0,0,0.08); transform: translateY(-3px); }
.mso-bhq-prod-img-wrap { width: 100%; height: 175px; background: #f8fafc; border-radius: 6px; overflow: hidden; display: flex; align-items: center; justify-content: center; margin-bottom: 12px; }
.mso-bhq-prod-img { width: 100%; height: 100%; object-fit: contain; padding: 8px; box-sizing: border-box; transition: transform 0.25s; }
.mso-bhq-prod-card:hover .mso-bhq-prod-img { transform: scale(1.06); }
.mso-bhq-prod-sku { font-size: 10.5px; font-weight: 700; color: #94a3b8; text-transform: uppercase; margin-bottom: 4px; }
.mso-bhq-prod-title { font-size: 13.5px; font-weight: 800; color: #0f172a; margin: 0 0 10px 0; line-height: 1.35; flex: 1; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
.mso-bhq-prod-bottom { display: flex; justify-content: space-between; align-items: baseline; margin-top: auto; padding-top: 10px; border-top: 1px solid #f1f5f9; }
.mso-bhq-price-wrap { display: flex; align-items: baseline; gap: 6px; }
.mso-bhq-prod-price { font-size: 16px; font-weight: 900; color: #0f172a; }
.mso-bhq-prod-price.sale { color: #dc2626; }
.mso-bhq-old-price { font-size: 12px; text-decoration: line-through; color: #94a3b8; font-weight: 600; }
.mso-bhq-add-cart-btn { background: #384c3c; color: #ffffff; border: none; padding: 6px 14px; border-radius: 4px; font-size: 11.5px; font-weight: 800; text-transform: uppercase; cursor: pointer; transition: background 0.2s; }
.mso-bhq-add-cart-btn:hover { background: #f5a623; color: #0f172a; }

/* 9. Knives For Everything You Do */
.mso-activity-grid { display: grid; grid-template-columns: repeat(6, 1fr); gap: 14px; margin-bottom: 36px; }
.mso-activity-card { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 22px 12px; text-align: center; text-decoration: none; display: flex; flex-direction: column; align-items: center; gap: 8px; transition: all 0.2s; }
.mso-activity-card:hover { border-color: #384c3c; background: #ffffff; transform: translateY(-3px); box-shadow: 0 6px 16px rgba(0,0,0,0.06); }
.mso-activity-icon { width: 44px; height: 44px; border-radius: 50%; background: #e2e8f0; color: #384c3c; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 900; }
.mso-activity-name { font-size: 12.5px; font-weight: 800; color: #0f172a; margin: 0; }

/* 10. Blue Full Width Bar */
.mso-blue-banner { background: #0066cc; color: #ffffff; padding: 14px 24px; text-align: center; font-size: 14px; font-weight: 800; border-radius: 6px; margin-bottom: 36px; text-transform: uppercase; letter-spacing: 0.5px; }

/* 11. Verified Customer Reviews */
.mso-reviews-section { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 32px 28px; margin-bottom: 36px; }
.mso-reviews-header-wrap { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; flex-wrap: wrap; gap: 12px; }
.mso-reviews-h2 { font-size: 24px; font-weight: 900; color: #0f172a; margin: 0; text-transform: uppercase; letter-spacing: -0.3px; }
.mso-reviews-badge-top { display: flex; align-items: center; gap: 8px; background: #ffffff; border: 1px solid #e2e8f0; padding: 6px 14px; border-radius: 20px; font-size: 12px; font-weight: 800; color: #0f172a; }
.mso-reviews-grid-4 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; }
.mso-review-card-white { background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 22px; box-shadow: 0 2px 6px rgba(0,0,0,0.03); display: flex; flex-direction: column; justify-content: space-between; }
.mso-review-user-row { display: flex; align-items: center; gap: 12px; margin-bottom: 12px; }
.mso-review-avatar { width: 44px; height: 44px; border-radius: 50%; object-fit: cover; border: 2px solid #e2e8f0; }
.mso-review-user-info { display: flex; flex-direction: column; }
.mso-review-author-name { font-size: 14px; font-weight: 900; color: #0f172a; text-decoration: none; }
.mso-review-time { font-size: 11px; color: #64748b; font-weight: 600; }
.mso-review-stars-gold { font-size: 14px; color: #f59e0b; margin-bottom: 10px; font-weight: 900; }
.mso-review-text-p { font-size: 13px; line-height: 1.6; color: #334155; margin: 0; font-style: italic; }

/* 12. Big 4 Icons Trust Strip */
.mso-big-trust-strip { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; margin-bottom: 40px; padding: 20px 0; border-top: 1px solid #e2e8f0; border-bottom: 1px solid #e2e8f0; }
.mso-big-trust-item { display: flex; flex-direction: column; align-items: center; text-align: center; gap: 6px; }
.mso-big-trust-badge { width: 42px; height: 42px; border-radius: 8px; background: #384c3c; color: #ffffff; display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 900; margin-bottom: 4px; }
.mso-big-trust-heading { font-size: 14px; font-weight: 900; color: #0f172a; margin: 0; text-transform: uppercase; }
.mso-big-trust-p { font-size: 12px; color: #64748b; margin: 0; line-height: 1.45; }

/* 13. YouTube Videos */
.mso-videos-grid-2 { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; margin-bottom: 36px; }
.mso-video-card-lg { position: relative; border-radius: 8px; overflow: hidden; aspect-ratio: 16/9; text-decoration: none; box-shadow: 0 4px 14px rgba(0,0,0,0.1); display: block; }
.mso-video-card-lg img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.3s; display: block; }
.mso-video-card-lg:hover img { transform: scale(1.04); }
.mso-video-overlay-lg { position: absolute; inset: 0; background: linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.85) 100%); }
.mso-play-btn-lg { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 56px; height: 56px; background: rgba(220,38,38,0.9); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #ffffff; font-size: 20px; font-weight: 900; box-shadow: 0 4px 12px rgba(0,0,0,0.3); transition: transform 0.2s, background 0.2s; }
.mso-video-card-lg:hover .mso-play-btn-lg { transform: translate(-50%, -50%) scale(1.1); background: #dc2626; }
.mso-video-title-lg { position: absolute; bottom: 16px; left: 20px; right: 20px; color: #ffffff; font-size: 16px; font-weight: 900; margin: 0; text-shadow: 0 2px 6px rgba(0,0,0,0.7); }

/* 14. Articles */
.mso-articles-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 36px; }
.mso-article-card { background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden; display: flex; flex-direction: column; text-decoration: none; box-shadow: 0 2px 6px rgba(0,0,0,0.03); transition: transform 0.2s; }
.mso-article-card:hover { transform: translateY(-3px); box-shadow: 0 6px 16px rgba(0,0,0,0.08); }
.mso-article-img { width: 100%; height: 150px; object-fit: cover; }
.mso-article-body { padding: 16px; display: flex; flex-direction: column; flex: 1; justify-content: space-between; gap: 12px; }
.mso-article-title { font-size: 14px; font-weight: 800; color: #0f172a; margin: 0; line-height: 1.35; }
.mso-article-btn { font-size: 11.5px; font-weight: 800; color: #384c3c; text-transform: uppercase; letter-spacing: 0.5px; border-bottom: 1.5px solid #384c3c; width: fit-content; padding-bottom: 1px; }

/* 15. FAQs */
.mso-faq-section { margin-bottom: 36px; }
.mso-faq-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; }
.mso-faq-card { background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 22px; box-shadow: 0 2px 6px rgba(0,0,0,0.02); }
.mso-faq-q { font-size: 15px; font-weight: 900; color: #0f172a; margin: 0 0 8px 0; }
.mso-faq-a { font-size: 13px; line-height: 1.6; color: #475569; margin: 0; }

/* 16. MSO Blade Club Banner */
.mso-blade-club-footer { background: linear-gradient(135deg, #0b223c 0%, #0066cc 100%); color: #ffffff; border-radius: 8px; padding: 32px 40px; display: grid; grid-template-columns: 1fr 1fr; gap: 32px; align-items: center; box-shadow: 0 8px 24px rgba(0,102,204,0.25); }
.mso-club-left-title { font-size: 28px; font-weight: 900; letter-spacing: 0.5px; margin: 0 0 8px 0; }
.mso-club-left-title span { color: #f5a623; }
.mso-club-left-sub { font-size: 14px; color: #e2e8f0; margin: 0 0 18px 0; }
.mso-club-btn { background: #ffffff; color: #0066cc !important; font-size: 13px; font-weight: 900; padding: 10px 24px; border-radius: 20px; text-transform: uppercase; text-decoration: none; display: inline-block; }
.mso-club-right-perks { display: flex; flex-direction: column; gap: 12px; }
.mso-club-perk { display: flex; align-items: center; gap: 12px; font-size: 14px; font-weight: 800; color: #ffffff; }
.mso-club-perk-badge { width: 28px; height: 28px; border-radius: 50%; background: rgba(255,255,255,0.2); display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 900; color: #f5a623; }

/* 17. Floating Google Badge */
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
  .mso-activity-grid { grid-template-columns: repeat(3, 1fr); }
  .mso-reviews-grid-4 { grid-template-columns: 1fr; }
  .mso-big-trust-strip { grid-template-columns: repeat(2, 1fr); gap: 24px; }
  .mso-videos-grid-2 { grid-template-columns: 1fr; }
  .mso-articles-grid { grid-template-columns: repeat(2, 1fr); }
  .mso-faq-grid { grid-template-columns: 1fr; }
  .mso-blade-club-footer { grid-template-columns: 1fr; }
}
@media (max-width: 680px) {
  .mso-bhq-hero { padding: 32px 20px; min-height: 340px; }
  .mso-bhq-hero-title { font-size: 28px; }
  .mso-bhq-hero-action { position: relative; bottom: auto; right: auto; margin-top: 16px; }
  .mso-opps-grid { grid-template-columns: 1fr; }
  .mso-bhq-prod-row { grid-template-columns: 1fr; }
  .mso-activity-grid { grid-template-columns: repeat(2, 1fr); }
  .mso-big-trust-strip { grid-template-columns: 1fr; }
  .mso-videos-grid-2 { grid-template-columns: 1fr; }
  .mso-articles-grid { grid-template-columns: 1fr; }
  .mso-floating-google-badge { bottom: 14px; right: 14px; padding: 6px 12px 6px 10px; }
  .mso-floating-sub { font-size: 9px; }
}
`;

  // Render Discover New Knives Cards (8 authentic products)
  const discoverCardsHtml = discoverKnives.map(p => `
    <a href="${p.link}" class="mso-bhq-prod-card">
      <div class="mso-bhq-prod-img-wrap"><img src="${p.img}" alt="${p.title}" class="mso-bhq-prod-img" loading="lazy" /></div>
      ${p.sku ? `<div class="mso-bhq-prod-sku">SKU: ${p.sku}</div>` : ''}
      <h4 class="mso-bhq-prod-title" title="${p.title}">${p.title}</h4>
      <div class="mso-bhq-prod-bottom">
        <div class="mso-bhq-price-wrap">
          <span class="mso-bhq-prod-price ${p.oldPrice ? 'sale' : ''}">${p.price}</span>
          ${p.oldPrice ? `<span class="mso-bhq-old-price">${p.oldPrice}</span>` : ''}
        </div>
        <button class="mso-bhq-add-cart-btn">Add to Cart</button>
      </div>
    </a>
  `).join('');

  // Render Hot Sales Cards (8 authentic products)
  const hotSalesCardsHtml = hotSales.map(p => `
    <a href="${p.link}" class="mso-bhq-prod-card">
      <div class="mso-bhq-prod-img-wrap"><img src="${p.img}" alt="${p.title}" class="mso-bhq-prod-img" loading="lazy" /></div>
      ${p.sku ? `<div class="mso-bhq-prod-sku">SKU: ${p.sku}</div>` : ''}
      <h4 class="mso-bhq-prod-title" title="${p.title}">${p.title}</h4>
      <div class="mso-bhq-prod-bottom">
        <div class="mso-bhq-price-wrap">
          <span class="mso-bhq-prod-price ${p.oldPrice ? 'sale' : ''}">${p.price}</span>
          ${p.oldPrice ? `<span class="mso-bhq-old-price">${p.oldPrice}</span>` : ''}
        </div>
        <button class="mso-bhq-add-cart-btn">Add to Cart</button>
      </div>
    </a>
  `).join('');

  const pageHtml = `<script type="application/ld+json">
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
</script><style>${cleanCss.replace(/\r?\n|\r/g, ' ').trim()}</style><div class="mso-bhq-container"><!-- 1. TOP NOTICE BAR --><div class="mso-top-notice"><span class="mso-notice-arrows">&lt;</span><span>Get $5 for FREE! - <a href="https://www.michigansportsoutdoor.com/my-account/">Sign up for MSO Blade Club Today!</a> | October Whitetail Season Opener Live</span><span class="mso-notice-arrows">&gt;</span></div><!-- 2. E-E-A-T MASTER CERTIFICATION STRIP --><div class="mso-eeat-cert-strip"><a href="https://maps.google.com/?q=Michigan+Sports+Outdoor" target="_blank" rel="noopener noreferrer" class="mso-eeat-cert-item"><span class="mso-eeat-icon-svg"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/></svg></span><span class="mso-eeat-item-title">Google Verified</span><span class="mso-eeat-badge-pill gold">5.0 Star</span></a><a href="https://www.bbb.org/us/mi/michigan-sports-outdoor" target="_blank" rel="noopener noreferrer" class="mso-eeat-cert-item"><span class="mso-eeat-icon-svg"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="24" rx="4" fill="#005A9C"/><text x="12" y="16" fill="#ffffff" font-family="Arial, sans-serif" font-size="9" font-weight="900" text-anchor="middle">BBB</text></svg></span><span class="mso-eeat-item-title">BBB Accredited</span><span class="mso-eeat-badge-pill blue">A+ Rating</span></a><a href="https://www.trustpilot.com/review/michigansportsoutdoor.com" target="_blank" rel="noopener noreferrer" class="mso-eeat-cert-item"><span class="mso-eeat-icon-svg"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="24" rx="4" fill="#00b67a"/><path d="M12 4.5l2.32 7.13h7.5l-6.07 4.41 2.32 7.13L12 18.76l-6.07 4.41 2.32-7.13-6.07-4.41h7.5z" fill="#ffffff"/></svg></span><span class="mso-eeat-item-title">Trustpilot</span><span class="mso-eeat-badge-pill green">Verified</span></a><a href="https://www.bladeforums.com" target="_blank" rel="noopener noreferrer" class="mso-eeat-cert-item"><span class="mso-eeat-icon-svg"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="24" rx="4" fill="#1e293b"/><path d="M5 19L19 5M5 5l14 14" stroke="#f5a623" stroke-width="2.2" stroke-linecap="round"/><circle cx="12" cy="12" r="2.8" fill="#ffffff"/></svg></span><span class="mso-eeat-item-title">BladeForums</span><span class="mso-eeat-badge-pill dark">Member</span></a><a href="https://www.michigan-sportsman.com" target="_blank" rel="noopener noreferrer" class="mso-eeat-cert-item"><span class="mso-eeat-icon-svg"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="24" rx="4" fill="#384c3c"/><path d="M12 3.5L5.5 13.5h4v7h5v-7h4L12 3.5z" fill="#f5a623"/></svg></span><span class="mso-eeat-item-title">MichiganSportsman</span><span class="mso-eeat-badge-pill forest">Partner</span></a></div><!-- 3. HERO BANNER (BLADE HQ FORMAT) --><section class="mso-bhq-hero"><div class="mso-bhq-hero-overlay"></div><div class="mso-bhq-hero-content"><h1 class="mso-bhq-hero-title">DON'T BUY A BAD KNIFE.<br/>GET IT RIGHT THE FIRST TIME.</h1><p class="mso-bhq-hero-sub">Michigan Sportsman &amp; Outfitter — Over 7,000+ in-stock knives, hunting gear &amp; camp cutlery tested by American sportsmen for the October whitetail opener.</p></div><div class="mso-bhq-hero-action"><a href="https://www.michigansportsoutdoor.com/shop/" class="mso-bhq-hero-btn">See The Winners</a></div></section><!-- 4. BRAND LOGO STRIP --><section class="mso-brand-strip"><div class="mso-brand-strip-top"><div class="mso-brand-strip-left">THE BEST KNIVES &amp; THE BEST SERVICE ONLY AT <span>MICHIGAN SPORTS OUTDOOR</span></div><a href="https://www.michigansportsoutdoor.com/brands/" class="mso-all-brands-link">All Brands</a></div><div class="mso-brand-strip-logos"><a href="https://www.michigansportsoutdoor.com/brand/spyderco/"><img src="${brandSpyderco}" alt="Spyderco" /></a><a href="https://www.michigansportsoutdoor.com/brand/kershaw/"><img src="${brandKershaw}" alt="Kershaw" /></a><a href="https://www.michigansportsoutdoor.com/brand/3v-gear/"><img src="${brand3V}" alt="3V Gear" /></a><a href="https://www.michigansportsoutdoor.com/brand/we-knife-co-ltd/"><img src="${brandWE}" alt="WE Knife" /></a><a href="https://www.michigansportsoutdoor.com/brand/bear-edge/"><img src="${brandBearEdge}" alt="Bear Edge" /></a><a href="https://www.michigansportsoutdoor.com/brand/boker/"><img src="${brandBoker}" alt="Boker" /></a><a href="https://www.michigansportsoutdoor.com/brand/bear-son/"><img src="${brandBearSon}" alt="Bear & Son" /></a><a href="https://www.michigansportsoutdoor.com/brand/civivi/"><img src="${brandCivivi}" alt="Civivi" /></a><a href="https://www.michigansportsoutdoor.com/brand/cold-steel/"><img src="${brandColdSteel}" alt="Cold Steel" /></a><a href="https://www.michigansportsoutdoor.com/brand/condor/"><img src="${brandCondor}" alt="Condor" /></a><a href="https://www.michigansportsoutdoor.com/brand/lionsteel/"><img src="${brandLionSteel}" alt="LionSteel" /></a><a href="https://www.michigansportsoutdoor.com/brand/microtech/"><img src="${brandMicrotech}" alt="Microtech" /></a><a href="https://www.michigansportsoutdoor.com/brand/mora/"><img src="${brandMora}" alt="Morakniv" /></a><a href="https://www.michigansportsoutdoor.com/brand/rough-rider/"><img src="${brandRoughRider}" alt="Rough Rider" /></a><a href="https://www.michigansportsoutdoor.com/brand/sog/"><img src="${brandSOG}" alt="SOG" /></a><a href="https://www.michigansportsoutdoor.com/brand/tops/"><img src="${brandTOPS}" alt="TOPS Knives" /></a></div></section><!-- 5. OPPORTUNITIES TOO GOOD TO MISS --><section><div class="mso-bhq-section-header"><h2 class="mso-bhq-title-bold">Opportunities <span class="mso-bhq-title-italic">Too Good</span> To Miss</h2></div><p class="mso-bhq-subtitle">Limited time steals and deals that cut deep.</p><div class="mso-opps-grid"><a href="https://www.michigansportsoutdoor.com/collections/knives/hunting-knife-sets/" class="mso-opp-card card-1"><span class="mso-opp-badge">OCTOBER WHITETAIL</span><h3 class="mso-opp-title">Fixed Blades for Field Dressing</h3><span class="mso-opp-link">Shop Now -></span></a><a href="https://www.michigansportsoutdoor.com/shop/" class="mso-opp-card card-2"><span class="mso-opp-badge orange">NEW ARRIVAL</span><h3 class="mso-opp-title">Halloween Special Dark Drop</h3><span class="mso-opp-link">Shop Now -></span></a><a href="https://www.michigansportsoutdoor.com/collections/camping-and-survival/" class="mso-opp-card card-3"><span class="mso-opp-badge gold">CAMP CRAFT</span><h3 class="mso-opp-title">Fall Bushcraft &amp; Survival</h3><span class="mso-opp-link">Shop Now -></span></a><a href="https://www.michigansportsoutdoor.com/shop/" class="mso-opp-card card-4"><span class="mso-opp-badge">SUPER STEELS</span><h3 class="mso-opp-title">CPM MagnaCut &amp; M390 Cutlery</h3><span class="mso-opp-link">Shop Now -></span></a></div></section><!-- 6. SHOP POPULAR CATEGORIES SLIDER --><section class="mso-orig-cat-slider-wrap"><div class="mso-orig-cat-left"><h3 class="mso-orig-cat-title">Shop Popular Categories</h3><p class="mso-orig-cat-desc">Michigan Sports Outdoor stocks everything for hunting, camping, and outdoor adventures with 4 main categories: apparel, camping gear, premium knives, and hunting knives.</p><p class="mso-orig-cat-desc">Whether you're outfitting for a hunting trip or weekend adventure, we have fair prices for our USA customers.</p><div class="mso-orig-cat-nav"><button class="mso-orig-cat-btn" onclick="scrollCats(-1)" aria-label="Previous Categories">&larr;</button><button class="mso-orig-cat-btn" onclick="scrollCats(1)" aria-label="Next Categories">&rarr;</button></div></div><div class="mso-orig-cat-track" id="msoCatSliderTrack"><a href="https://www.michigansportsoutdoor.com/collections/knives/locking-knives/" class="mso-orig-cat-item"><div class="mso-orig-cat-img-wrap"><img src="${catLocking}" alt="Locking Pocket Knives" loading="lazy" /></div><div class="mso-orig-cat-body"><div class="mso-orig-cat-name" title="Locking Pocket Knives (EDC &amp; Tactical)">Locking Pocket Knives</div><div class="mso-orig-cat-products">15243 products</div></div></a><a href="https://www.michigansportsoutdoor.com/collections/lights/" class="mso-orig-cat-item"><div class="mso-orig-cat-img-wrap"><img src="${catLights}" alt="Flashlights &amp; Tactical Illumination" loading="lazy" /></div><div class="mso-orig-cat-body"><div class="mso-orig-cat-name" title="Flashlights &amp; Tactical Illumination">Flashlights &amp; Tac...</div><div class="mso-orig-cat-products">1006 products</div></div></a><a href="https://www.michigansportsoutdoor.com/collections/cleaning-and-maintenance/" class="mso-orig-cat-item"><div class="mso-orig-cat-img-wrap"><img src="${catCleaning}" alt="Cleaning and Maintenance" loading="lazy" /></div><div class="mso-orig-cat-body"><div class="mso-orig-cat-name" title="Cleaning and Maintenance">Cleaning and Ma...</div><div class="mso-orig-cat-products">309 products</div></div></a><a href="https://www.michigansportsoutdoor.com/collections/fishing/" class="mso-orig-cat-item"><div class="mso-orig-cat-img-wrap"><img src="${catFishing}" alt="Fishing Tackle, Fillet Knives &amp; Angler Gear" loading="lazy" /></div><div class="mso-orig-cat-body"><div class="mso-orig-cat-name" title="Fishing Tackle, Fillet Knives &amp; Angler Gear">Fishing Tackle, F...</div><div class="mso-orig-cat-products">511 products</div></div></a><a href="https://www.michigansportsoutdoor.com/collections/knives/hunting-knife-sets/" class="mso-orig-cat-item"><div class="mso-orig-cat-img-wrap"><img src="${catHunting}" alt="Hunting Knife Sets" loading="lazy" /></div><div class="mso-orig-cat-body"><div class="mso-orig-cat-name" title="Hunting Knife Sets">Hunting Knife Sets</div><div class="mso-orig-cat-products">98 products</div></div></a><a href="https://www.michigansportsoutdoor.com/collections/camping-and-survival/" class="mso-orig-cat-item"><div class="mso-orig-cat-img-wrap"><img src="${catCamping}" alt="Camping &amp; Wilderness Survival Gear" loading="lazy" /></div><div class="mso-orig-cat-body"><div class="mso-orig-cat-name" title="Camping &amp; Wilderness Survival Gear">Camping &amp; Survival</div><div class="mso-orig-cat-products">1314 products</div></div></a><a href="https://www.michigansportsoutdoor.com/collections/apparel/" class="mso-orig-cat-item"><div class="mso-orig-cat-img-wrap"><img src="${catApparel}" alt="Outdoor Tactical Apparel, Hats &amp; Shirts" loading="lazy" /></div><div class="mso-orig-cat-body"><div class="mso-orig-cat-name" title="Outdoor Tactical Apparel, Hats &amp; Shirts">Tactical Apparel</div><div class="mso-orig-cat-products">511 products</div></div></a><a href="https://www.michigansportsoutdoor.com/collections/knives/premium-knives/" class="mso-orig-cat-item"><div class="mso-orig-cat-img-wrap"><img src="${catPremium}" alt="Premium &amp; Custom-Grade Cutlery" loading="lazy" /></div><div class="mso-orig-cat-body"><div class="mso-orig-cat-name" title="Premium &amp; Custom-Grade Cutlery">Premium Cutlery</div><div class="mso-orig-cat-products">938 products</div></div></a><a href="https://www.michigansportsoutdoor.com/collections/kitchen/" class="mso-orig-cat-item"><div class="mso-orig-cat-img-wrap"><img src="${catKitchen}" alt="Kitchen Cutlery &amp; Chef Knives" loading="lazy" /></div><div class="mso-orig-cat-body"><div class="mso-orig-cat-name" title="Kitchen Cutlery &amp; Chef Knives">Kitchen Cutlery</div><div class="mso-orig-cat-products">1201 products</div></div></a><a href="https://www.michigansportsoutdoor.com/collections/optics/" class="mso-orig-cat-item"><div class="mso-orig-cat-img-wrap"><img src="${catOptics}" alt="Optics &amp; Scopes" loading="lazy" /></div><div class="mso-orig-cat-body"><div class="mso-orig-cat-name" title="Optics &amp; Scopes">Optics &amp; Scopes</div><div class="mso-orig-cat-products">351 products</div></div></a></div></section><!-- 7. DISCOVER NEW KNIVES (AUTHENTIC PRODUCTS) --><section><div class="mso-bhq-section-header"><h2 class="mso-bhq-title-bold">DISCOVER NEW KNIVES</h2><a href="https://www.michigansportsoutdoor.com/shop/" class="mso-bhq-view-all-pill">View All New Arrivals</a></div><div class="mso-bhq-prod-row">${discoverCardsHtml}</div></section><!-- 8. KNIVES FOR EVERYTHING YOU DO --><section><div class="mso-bhq-section-header"><h2 class="mso-bhq-title-bold">Knives For <span class="mso-bhq-title-italic">Everything</span> You Do</h2><a href="https://www.michigansportsoutdoor.com/shop/" class="mso-bhq-view-all-pill">View All Activities</a></div><div class="mso-activity-grid"><a href="https://www.michigansportsoutdoor.com/collections/knives/locking-knives/" class="mso-activity-card"><div class="mso-activity-icon">EDC</div><h4 class="mso-activity-name">Everyday Carry</h4></a><a href="https://www.michigansportsoutdoor.com/collections/knives/hunting-knife-sets/" class="mso-activity-card"><div class="mso-activity-icon">HUNT</div><h4 class="mso-activity-name">Hunting &amp; Dressing</h4></a><a href="https://www.michigansportsoutdoor.com/collections/knives/premium-knives/" class="mso-activity-card"><div class="mso-activity-icon">TACT</div><h4 class="mso-activity-name">Tactical &amp; Duty</h4></a><a href="https://www.michigansportsoutdoor.com/collections/camping-and-survival/" class="mso-activity-card"><div class="mso-activity-icon">CAMP</div><h4 class="mso-activity-name">Camping &amp; Bushcraft</h4></a><a href="https://www.michigansportsoutdoor.com/collections/fishing/" class="mso-activity-card"><div class="mso-activity-icon">SURV</div><h4 class="mso-activity-name">Survival &amp; Fillet</h4></a><a href="https://www.michigansportsoutdoor.com/collections/kitchen/" class="mso-activity-card"><div class="mso-activity-icon">CHEF</div><h4 class="mso-activity-name">Kitchen Cutlery</h4></a></div></section><!-- 9. FULL WIDTH BLUE FREE SHIPPING BANNER --><div class="mso-blue-banner">FREE SHIPPING: All domestic USA orders ship for free when you spend $99 or more.</div><!-- 10. HOT SALES & WEEKLY OUTDOOR STEALS (AUTHENTIC PRODUCTS) --><section><div class="mso-bhq-section-header"><h2 class="mso-bhq-title-bold">HOT SALES &amp; WEEKLY OUTDOOR STEALS</h2><a href="https://www.michigansportsoutdoor.com/shop/" class="mso-bhq-view-all-pill">View All Sales</a></div><div class="mso-bhq-prod-row">${hotSalesCardsHtml}</div></section><!-- 11. EXACT AUTHENTIC GOOGLE CUSTOMER REVIEWS (HEADING H2) --><section class="mso-reviews-section"><div class="mso-reviews-header-wrap"><h2 class="mso-reviews-h2">Verified Customer Reviews</h2><div class="mso-reviews-badge-top"><span>Google Verified 5.0 Star Rating</span><span style="color:#f59e0b;">&#9733;&#9733;&#9733;&#9733;&#9733;</span></div></div><div class="mso-reviews-grid-4"><div class="mso-review-card-white"><div class="mso-review-user-row"><img src="${avatarJoeSell}" alt="Joe Sell" class="mso-review-avatar" loading="lazy" /><div class="mso-review-user-info"><a href="https://www.google.com/maps/contrib/113208006462811821271/reviews" class="mso-review-author-name" target="_blank" rel="noopener">Joe Sell</a><span class="mso-review-time">Verified Google Reviewer</span></div></div><div class="mso-review-stars-gold">&#9733;&#9733;&#9733;&#9733;&#9733; 5.0</div><p class="mso-review-text-p">"I placed my order on 08/03 and it was delivered on 08/07. It shipped free since it was over $100. Shipping was done via UPS, despite being free. Items were new and exactly as I ordered. Honestly, prices were good and I couldn’t ask for better service. They have earned my business from here on out."</p></div><div class="mso-review-card-white"><div class="mso-review-user-row"><img src="${avatarAbdullah}" alt="Abdullah" class="mso-review-avatar" loading="lazy" /><div class="mso-review-user-info"><a href="https://www.google.com/maps/contrib/101626929586739438666/reviews" class="mso-review-author-name" target="_blank" rel="noopener">Abdullah</a><span class="mso-review-time">Verified Google Reviewer</span></div></div><div class="mso-review-stars-gold">&#9733;&#9733;&#9733;&#9733;&#9733; 5.0</div><p class="mso-review-text-p">"Wasn't sure about buying a knife online, but a friend put me onto this site and I got the Skallywag Tactical Malice Fixed Blade in black. Was a bit nervous before it arrived, ngl. Two weeks in and it's honestly one of the better purchases I've made — sharp, well-balanced, does the job. Definitely recommend this store."</p></div><div class="mso-review-card-white"><div class="mso-review-user-row"><img src="${avatarHassan}" alt="Hassan Ali" class="mso-review-avatar" loading="lazy" /><div class="mso-review-user-info"><a href="https://www.google.com/maps/contrib/103596266089790838188/reviews" class="mso-review-author-name" target="_blank" rel="noopener">Hassan Ali</a><span class="mso-review-time">Verified Google Reviewer</span></div></div><div class="mso-review-stars-gold">&#9733;&#9733;&#9733;&#9733;&#9733; 5.0</div><p class="mso-review-text-p">"I have excellent experience to order my product with Michigan Sports Outdoor. Customer services was awesome and the order arrived very quickly and securely packaged."</p></div></div></section><!-- 12. BIG 4 ICONS TRUST STRIP --><section class="mso-big-trust-strip"><div class="mso-big-trust-item"><div class="mso-big-trust-badge">HELP</div><h4 class="mso-big-trust-heading">Your Questions Answered</h4><p class="mso-big-trust-p">Real sportsmen. Real help. We know blades like the back of our hands.</p></div><div class="mso-big-trust-item"><div class="mso-big-trust-badge">FAST</div><h4 class="mso-big-trust-heading">Lightning-Fast Shipping</h4><p class="mso-big-trust-p">We move fast. Packed with care and shipped same-day from Michigan warehouse.</p></div><div class="mso-big-trust-item"><div class="mso-big-trust-badge">EASY</div><h4 class="mso-big-trust-heading">Hassle-Free Returns</h4><p class="mso-big-trust-p">Changed your mind? No sweat. 30-day returns as smooth as knife lube.</p></div><div class="mso-big-trust-item"><div class="mso-big-trust-badge">COMM</div><h4 class="mso-big-trust-heading">Sportsman Community</h4><p class="mso-big-trust-p">First timers, whitetail hunters, collectors. 40,000+ strong outfitter crew.</p></div></section><!-- 13. EXACT 2 FEATURED YOUTUBE VIDEOS (2-COLUMN GRID) --><section><div class="mso-bhq-section-header"><h2 class="mso-bhq-title-bold">Featured Field Videos</h2><a href="https://www.youtube.com/@michigansportsoutdoor" class="mso-bhq-view-all-pill">View All Videos</a></div><div class="mso-videos-grid-2"><a href="https://youtu.be/1g7YUygu25Q?si=FJoFj217M-HJGjx0" target="_blank" rel="noopener" class="mso-video-card-lg"><img src="https://img.youtube.com/vi/1g7YUygu25Q/hqdefault.jpg" alt="Folder or Fixed Blade For Hunting?" /><div class="mso-video-overlay-lg"></div><div class="mso-play-btn-lg">&gt;</div><h4 class="mso-video-title-lg">Folder or Fixed Blade For Hunting?</h4></a><a href="https://youtu.be/anoQ0XG-_O4?si=1-tHKp5G8rJ5ORZk" target="_blank" rel="noopener" class="mso-video-card-lg"><img src="https://img.youtube.com/vi/anoQ0XG-_O4/hqdefault.jpg" alt="You Don't Need MagnaCut! Super Steels Tested" /><div class="mso-video-overlay-lg"></div><div class="mso-play-btn-lg">&gt;</div><h4 class="mso-video-title-lg">You Don't Need MagnaCut! Super Steels Tested</h4></a></div></section><!-- 14. FROM THE MSO JOURNAL / FEATURED ARTICLES --><section><div class="mso-bhq-section-header"><h2 class="mso-bhq-title-bold">From The MSO Journal &amp; Field Tests</h2><a href="https://www.michigansportsoutdoor.com/blog/" class="mso-bhq-view-all-pill">View All Articles</a></div><div class="mso-articles-grid"><a href="https://www.michigansportsoutdoor.com/best-hunting-knives-for-michigan-deer-season-3/" class="mso-article-card"><img src="${blogHunting}" alt="Best Hunting Knives for Michigan Deer Season" class="mso-article-img" loading="lazy" /><div class="mso-article-body"><h4 class="mso-article-title">Best Hunting Knives for Michigan Deer Season (2026 Field Guide)</h4><span class="mso-article-btn">Read Article</span></div></a><a href="https://www.michigansportsoutdoor.com/how-to-sharpen-a-knife-at-home/" class="mso-article-card"><img src="${blogSharpening}" alt="How to Sharpen a Knife at Home" class="mso-article-img" loading="lazy" /><div class="mso-article-body"><h4 class="mso-article-title">How to Sharpen a Knife at Home: Complete Guide</h4><span class="mso-article-btn">Read Article</span></div></a><a href="https://www.michigansportsoutdoor.com/mora-companion-vs-kansbol-vs-garberg/" class="mso-article-card"><img src="${blogBushcraft}" alt="Morakniv Companion vs Kansbol vs Garberg" class="mso-article-img" loading="lazy" /><div class="mso-article-body"><h4 class="mso-article-title">Morakniv Companion vs Kansbol vs Garberg: Camp Knife Battle</h4><span class="mso-article-btn">Read Article</span></div></a><a href="https://www.michigansportsoutdoor.com/blog/" class="mso-article-card"><img src="${blogSteels}" alt="CPM MagnaCut vs M390MK" class="mso-article-img" loading="lazy" /><div class="mso-article-body"><h4 class="mso-article-title">Crucible CPM MagnaCut vs Böhler M390: Steel Showdown</h4><span class="mso-article-btn">Read Article</span></div></a></div></section><!-- 15. FREQUENTLY ASKED MICHIGAN SPORTSMAN QUESTIONS --><section class="mso-faq-section"><div class="mso-bhq-section-header"><h2 class="mso-bhq-title-bold">Frequently Asked Michigan Sportsman Questions</h2></div><p class="mso-bhq-subtitle">Clear, field-tested answers to the most common questions regarding hunting, knives, and outdoor gear in Michigan.</p><div class="mso-faq-grid"><div class="mso-faq-card"><h3 class="mso-faq-q">What is Michigan Sports Outdoor known for?</h3><p class="mso-faq-a">Michigan Sports Outdoor is America's premier outfitter for sportsmen, hunters, anglers, and outdoor enthusiasts. We stock over 7,000+ brand-name products including folding EDC pocket knives, fixed hunting blades, camping cookware, survival axes, and multi-tools from top cutlery makers like Kershaw, Spyderco, Morakniv, and Frost Cutlery.</p></div><div class="mso-faq-card"><h3 class="mso-faq-q">What are Michigan knife laws for carrying pocket and hunting knives?</h3><p class="mso-faq-a">Under Michigan law (MCL 750.227), folding pocket knives and typical hunting knives carried without harmful intent are legal for everyday carry. Following the 2017 repeal of the switchblade ban, automatic knives and OTF knives are also legal to own and carry openly or concealed for lawful sporting purposes.</p></div><div class="mso-faq-card"><h3 class="mso-faq-q">What is the best knife for field dressing deer in Michigan?</h3><p class="mso-faq-a">A high-carbon or stainless drop-point fixed blade with a 3.5 to 4-inch blade (such as Morakniv or Skallywag tactical skinners) offers optimal belly curve for gutting and skinning whitetail deer without puncturing internal organs or dulling on bone.</p></div><div class="mso-faq-card"><h3 class="mso-faq-q">How fast does Michigan Sports Outdoor ship customer orders?</h3><p class="mso-faq-a">All orders are packed securely and dispatched rapidly across the United States. In-stock products typically ship within 24 to 48 business hours with verified tracking numbers.</p></div></div></section><!-- 16. MSO BLADE CLUB VIP FOOTER BANNER --><section class="mso-blade-club-footer"><div><h3 class="mso-club-left-title">BLADE <span>CLUB</span></h3><p class="mso-club-left-sub">Be sharp, get rewarded for loving knives &amp; backcountry gear... for FREE!</p><a href="https://www.michigansportsoutdoor.com/my-account/" class="mso-club-btn">Learn More</a></div><div class="mso-club-right-perks"><div class="mso-club-perk"><div class="mso-club-perk-badge">*</div><span>1,000 Point Sign-up Bonus</span></div><div class="mso-club-perk"><div class="mso-club-perk-badge">$</div><span>Earn &amp; Redeem Points on Every Order</span></div><div class="mso-club-perk"><div class="mso-club-perk-badge">VIP</div><span>Early-Access to Drops &amp; Flash Deals</span></div></div></section></div><!-- 17. FIXED BOTTOM-RIGHT GOOGLE VERIFIED 5.0 TRUST SEAL --><a href="https://maps.google.com/?q=Michigan+Sports+Outdoor" target="_blank" rel="noopener noreferrer" class="mso-floating-google-badge" title="Verified 5.0 Rating on Google Reviews"><div class="mso-floating-g-logo"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/></svg></div><div class="mso-floating-text-wrap"><div class="mso-floating-top"><span class="mso-floating-rating">5.0</span><span class="mso-floating-stars">&#9733;&#9733;&#9733;&#9733;&#9733;</span></div><span class="mso-floating-sub">Google Verified</span></div></a><script>
function scrollCats(direction) {
  const container = document.getElementById('msoCatSliderTrack');
  if (container) {
    const scrollAmount = 230 * 2;
    container.scrollBy({ left: direction * scrollAmount, behavior: 'smooth' });
  }
}
</script>`;

  console.log('Deploying updated page with real products to /october-season/ (Page #167531)...');
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

deployRealProductsOctoberPage().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
