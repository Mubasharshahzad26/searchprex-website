import fs from 'fs';

async function deployBladeHQMasterPortal() {
  const baseUrl = 'https://www.michigansportsoutdoor.com';
  const username = 'apiuser';
  const appPassword = 'cvxm Bi7y 6o3y r7HJ M1Wn mSMM';
  const auth = Buffer.from(`${username}:${appPassword}`).toString('base64');
  const headers = {
    Authorization: `Basic ${auth}`,
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
    'Content-Type': 'application/json'
  };

  const authorPhotoUrl = 'https://www.michigansportsoutdoor.com/wp-content/uploads/2026/09/mubashar-shahzad-lead-cutlery-analyst.jpg';

  // High-res, 100% verified working images
  const imgHero = 'https://images.unsplash.com/photo-1590736969955-71cc94801759?w=900&auto=format&fit=crop&q=80';
  const imgCard1 = 'https://images.unsplash.com/photo-1590736969955-71cc94801759?w=600&auto=format&fit=crop&q=80';
  const imgCard2 = 'https://images.unsplash.com/photo-1589256469067-ea99122bbdc4?w=600&auto=format&fit=crop&q=80';
  const imgCard3 = 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=600&auto=format&fit=crop&q=80';
  const imgCard4 = 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&auto=format&fit=crop&q=80';
  const imgCard5 = 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=600&auto=format&fit=crop&q=80';
  const imgCard6 = 'https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?w=600&auto=format&fit=crop&q=80';

  // Real WordPress Media Library knife images
  const imgGear1 = 'https://www.michigansportsoutdoor.com/wp-content/uploads/2026/09/SOG18300643_add_01.jpg';
  const imgGear2 = 'https://www.michigansportsoutdoor.com/wp-content/uploads/2026/09/WE18062XA1_add_01.jpg';
  const imgGear3 = 'https://www.michigansportsoutdoor.com/wp-content/uploads/2026/09/VOSA4906_add_01.jpg';
  const imgFavKnife = 'https://www.michigansportsoutdoor.com/wp-content/uploads/2026/09/K1116A4_add_01.jpg';

  // Clean, minified CSS with no blank lines to prevent WordPress wpautop injection
  const cleanCss = `
html,body,#page,#wrapper,.site,.site-wrapper,.site-content,#content,.content-area,#primary,#main,.site-main,.entry-content,.entry-content-wrap,.page-content,.post-content,.container,.container-wrap,.page-wrapper,.site-main-content{background-color:#ffffff !important;background:#ffffff !important;color:#1e293b;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;-webkit-font-smoothing:antialiased;}
.entry-content{padding-left:0 !important;padding-right:0 !important;max-width:100% !important;width:100% !important;overflow-x:hidden;}
.bhq-portal-wrapper{max-width:1440px;margin:0 auto;padding:0 24px 60px 24px;background:#ffffff;box-sizing:border-box;width:100%;}
.bhq-header-banner{display:flex;align-items:center;justify-content:space-between;padding:24px 0 18px 0;border-bottom:2px solid #0f172a;margin-bottom:20px;}
.bhq-brand-block{display:flex;align-items:baseline;gap:12px;}
.bhq-logo-title{font-size:38px;font-weight:900;letter-spacing:-0.5px;color:#0f172a;margin:0;line-height:1;text-transform:uppercase;}
.bhq-logo-title span{color:#0066cc;}
.bhq-tagline{font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#64748b;border-left:2px solid #e2e8f0;padding-left:12px;}
.bhq-trust-strip{display:flex;align-items:center;gap:12px;}
.bhq-trust-item{display:flex;align-items:center;gap:6px;background:#f8fafc;border:1px solid #e2e8f0;padding:6px 12px;border-radius:4px;font-size:11.5px;font-weight:700;color:#1e293b;text-transform:uppercase;letter-spacing:0.5px;}
.bhq-trust-item strong{color:#0066cc;}
.bhq-nav-bar{display:flex;align-items:center;justify-content:space-between;background:#0f172a;border-radius:6px;padding:4px 8px;margin-bottom:24px;}
.bhq-category-tabs{display:flex;align-items:center;gap:4px;overflow-x:auto;scrollbar-width:none;}
.bhq-category-tabs::-webkit-scrollbar{display:none;}
.bhq-tab-btn{background:transparent;border:none;color:#cbd5e1;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:0.8px;padding:10px 18px;border-radius:4px;cursor:pointer;transition:all 0.2s ease;white-space:nowrap;}
.bhq-tab-btn:hover{color:#ffffff;background:rgba(255,255,255,0.08);}
.bhq-tab-btn.active{background:#0066cc;color:#ffffff;box-shadow:0 2px 8px rgba(0,102,204,0.4);}
.bhq-nav-action{display:flex;align-items:center;gap:8px;padding-right:8px;}
.bhq-shop-link{background:#ff6b00;color:#ffffff !important;text-decoration:none;font-size:12px;font-weight:800;text-transform:uppercase;letter-spacing:0.8px;padding:8px 14px;border-radius:4px;transition:background 0.2s ease;white-space:nowrap;}
.bhq-shop-link:hover{background:#e05e00;}
.bhq-search-section{background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:16px 20px;margin-bottom:28px;}
.bhq-search-box-wrap{position:relative;display:flex;align-items:center;background:#ffffff;border:2px solid #cbd5e1;border-radius:6px;transition:border-color 0.2s ease,box-shadow 0.2s ease;}
.bhq-search-box-wrap:focus-within{border-color:#0066cc;box-shadow:0 0 0 3px rgba(0,102,204,0.15);}
.bhq-search-icon{padding-left:16px;font-size:16px;color:#64748b;}
.bhq-search-input{flex:1;border:none;outline:none;padding:12px 14px;font-size:14.5px;font-weight:500;color:#0f172a;background:transparent;}
.bhq-voice-btn{background:#f1f5f9;border:1px solid #cbd5e1;color:#334155;padding:7px 12px;margin-right:6px;border-radius:4px;cursor:pointer;font-size:14px;display:flex;align-items:center;gap:6px;font-weight:600;transition:all 0.2s ease;}
.bhq-voice-btn:hover{background:#e2e8f0;color:#0f172a;}
.bhq-voice-btn.listening{background:#ef4444;color:#ffffff;animation:bhqPulse 1.2s infinite;border-color:#ef4444;}
@keyframes bhqPulse{0%{transform:scale(1);}50%{transform:scale(1.05);}100%{transform:scale(1);}}
.bhq-search-submit{background:#0066cc;color:#ffffff;border:none;padding:10px 20px;margin-right:4px;border-radius:4px;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;cursor:pointer;transition:background 0.2s ease;}
.bhq-search-submit:hover{background:#0052a3;}
.bhq-trending-tags{display:flex;align-items:center;gap:8px;margin-top:12px;flex-wrap:wrap;}
.bhq-tag-label{font-size:11px;font-weight:800;text-transform:uppercase;letter-spacing:0.8px;color:#64748b;}
.bhq-tag-pill{background:#ffffff;border:1px solid #e2e8f0;padding:3px 10px;border-radius:12px;font-size:11.5px;font-weight:600;color:#334155;cursor:pointer;transition:all 0.2s ease;text-decoration:none;}
.bhq-tag-pill:hover{border-color:#0066cc;color:#0066cc;background:#eff6ff;}

/* 2-COLUMN MAIN PORTAL LAYOUT: CONTENT (70%) + SIDEBAR (30%) */
.bhq-main-layout{display:grid;grid-template-columns:2.4fr 1fr;gap:32px;margin-bottom:48px;align-items:start;}
.bhq-content-col{display:flex;flex-direction:column;gap:36px;}
.bhq-sidebar-col{display:flex;flex-direction:column;gap:24px;position:sticky;top:20px;}

/* FEATURED HERO CARD */
.bhq-featured-card{background:#ffffff;border:1px solid #e2e8f0;border-radius:8px;overflow:hidden;display:flex;flex-direction:column;box-shadow:0 1px 3px rgba(0,0,0,0.06),0 1px 2px rgba(0,0,0,0.04);transition:transform 0.25s ease,box-shadow 0.25s ease;}
.bhq-featured-card:hover{transform:translateY(-2px);box-shadow:0 10px 25px -5px rgba(0,0,0,0.1),0 8px 10px -6px rgba(0,0,0,0.06);}
.bhq-featured-image-box{position:relative;width:100%;height:260px;background:#0f172a;overflow:hidden;}
.bhq-featured-image-box img{width:100%;height:100%;object-fit:cover;transition:transform 0.4s ease;display:block;}
.bhq-featured-card:hover .bhq-featured-image-box img{transform:scale(1.03);}
.bhq-badge-strip{position:absolute;top:14px;left:14px;display:flex;gap:8px;}
.bhq-badge-featured{background:#ff6b00;color:#ffffff;font-size:11px;font-weight:800;text-transform:uppercase;letter-spacing:0.8px;padding:4px 10px;border-radius:3px;}
.bhq-badge-category{background:#0f172a;color:#ffffff;font-size:11px;font-weight:800;text-transform:uppercase;letter-spacing:0.8px;padding:4px 10px;border-radius:3px;}
.bhq-featured-content{padding:22px;display:flex;flex-direction:column;}
.bhq-score-bar{display:flex;align-items:center;justify-content:space-between;margin-bottom:10px;}
.bhq-knife-score{display:inline-flex;align-items:center;gap:4px;background:#eff6ff;color:#0066cc;font-size:12px;font-weight:800;padding:3px 8px;border-radius:4px;border:1px solid #bfdbfe;}
.bhq-read-time{font-size:12px;font-weight:600;color:#64748b;}
.bhq-featured-title{font-size:24px;font-weight:800;line-height:1.3;margin:0 0 10px 0;color:#0f172a;}
.bhq-featured-title a{color:#0f172a;text-decoration:none;transition:color 0.2s ease;}
.bhq-featured-title a:hover{color:#0066cc;}
.bhq-featured-excerpt{font-size:14px;line-height:1.6;color:#334155;margin:0 0 16px 0;}
.bhq-author-row{display:flex;align-items:center;justify-content:space-between;padding-top:14px;border-top:1px solid #e2e8f0;}
.bhq-author-meta{display:flex;align-items:center;gap:10px;}
.bhq-author-avatar{width:42px;height:42px;border-radius:4px;object-fit:cover;border:1px solid #cbd5e1;display:block;}
.bhq-author-info{display:flex;flex-direction:column;}
.bhq-author-name{font-size:13px;font-weight:700;color:#0f172a;display:flex;align-items:center;gap:5px;}
.bhq-author-name .verified{color:#16a34a;font-size:12px;}
.bhq-author-role{font-size:11px;color:#64748b;font-weight:500;}
.bhq-read-btn{background:#0066cc;color:#ffffff !important;text-decoration:none;font-size:12.5px;font-weight:700;padding:8px 16px;border-radius:4px;transition:background 0.2s ease;}
.bhq-read-btn:hover{background:#0052a3;}

/* SECTION HEADERS */
.bhq-section-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:18px;padding-bottom:10px;border-bottom:2px solid #0f172a;}
.bhq-section-title{font-size:19px;font-weight:900;text-transform:uppercase;letter-spacing:0.5px;color:#0f172a;margin:0;}
.bhq-section-sub{font-size:12px;font-weight:600;color:#64748b;}

/* 3-CARD ARTICLES GRID (EXACTLY 3 EQUAL COLUMNS) */
.bhq-articles-grid{display:grid;grid-template-columns:repeat(3, 1fr);gap:20px;}
.bhq-article-card{background:#ffffff;border:1px solid #e2e8f0;border-radius:8px;overflow:hidden;display:flex;flex-direction:column;box-shadow:0 1px 3px rgba(0,0,0,0.06),0 1px 2px rgba(0,0,0,0.04);transition:transform 0.25s ease,box-shadow 0.25s ease;align-items:stretch;}
.bhq-article-card:hover{transform:translateY(-3px);box-shadow:0 10px 25px -5px rgba(0,0,0,0.1),0 8px 10px -6px rgba(0,0,0,0.06);}
.bhq-card-image-wrap{position:relative;width:100%;height:145px;background:#0f172a;overflow:hidden;}
.bhq-card-image-wrap img{width:100%;height:100%;object-fit:cover;transition:transform 0.35s ease;display:block;}
.bhq-article-card:hover .bhq-card-image-wrap img{transform:scale(1.05);}
.bhq-card-pill{position:absolute;top:10px;left:10px;background:rgba(15,23,42,0.9);color:#ffffff;font-size:10px;font-weight:800;text-transform:uppercase;letter-spacing:0.8px;padding:3px 8px;border-radius:3px;}
.bhq-card-body{padding:16px;display:flex;flex-direction:column;flex:1;}
.bhq-card-score-row{display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;}
.bhq-mini-score{font-size:11px;font-weight:800;color:#0066cc;background:#eff6ff;padding:2px 6px;border-radius:3px;border:1px solid #dbeafe;}
.bhq-mini-date{font-size:11px;color:#64748b;font-weight:500;}
.bhq-card-title{font-size:15px;font-weight:800;line-height:1.35;margin:0 0 8px 0;color:#0f172a;min-height:42px;}
.bhq-card-title a{color:#0f172a;text-decoration:none;transition:color 0.2s ease;}
.bhq-card-title a:hover{color:#0066cc;}
.bhq-card-excerpt{font-size:12px;line-height:1.55;color:#334155;margin:0 0 14px 0;flex:1;}
.bhq-card-author{display:flex;align-items:center;gap:8px;padding-top:12px;border-top:1px solid #f1f5f9;}
.bhq-card-avatar{width:34px;height:34px;border-radius:4px;object-fit:cover;border:1px solid #e2e8f0;display:block;}
.bhq-card-author-meta{display:flex;flex-direction:column;}
.bhq-card-author-name{font-size:11.5px;font-weight:700;color:#0f172a;display:flex;align-items:center;gap:4px;}
.bhq-card-author-role{font-size:10px;color:#64748b;}

/* 3-CARD GEAR SECTION (EXACTLY 3 EQUAL COLUMNS) */
.bhq-gear-section{background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:22px;}
.bhq-gear-grid{display:grid;grid-template-columns:repeat(3, 1fr);gap:18px;}
.bhq-gear-card{background:#ffffff;border:1px solid #e2e8f0;border-radius:6px;padding:16px;display:flex;flex-direction:column;box-shadow:0 1px 2px rgba(0,0,0,0.04);transition:transform 0.2s ease,border-color 0.2s ease;}
.bhq-gear-card:hover{transform:translateY(-2px);border-color:#0066cc;}
.bhq-gear-img-box{width:100%;height:130px;background:#ffffff;display:flex;align-items:center;justify-content:center;margin-bottom:12px;border-radius:4px;overflow:hidden;}
.bhq-gear-img-box img{max-width:100%;max-height:100%;object-fit:contain;display:block;}
.bhq-gear-stock{font-size:10.5px;font-weight:800;text-transform:uppercase;color:#16a34a;display:flex;align-items:center;gap:4px;margin-bottom:4px;}
.bhq-gear-title{font-size:14px;font-weight:700;line-height:1.35;color:#0f172a;margin:0 0 4px 0;min-height:36px;}
.bhq-gear-specs{font-size:11.5px;color:#64748b;margin-bottom:8px;}
.bhq-gear-price{font-size:15px;font-weight:800;color:#0f172a;margin-bottom:12px;}
.bhq-gear-cta{margin-top:auto;background:#0f172a;color:#ffffff !important;text-decoration:none;text-align:center;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;padding:9px 12px;border-radius:4px;transition:background 0.2s ease;}
.bhq-gear-card:hover .bhq-gear-cta{background:#0066cc;}

/* SIDEBAR MODULES (UTILIZING THE PREVIOUSLY EMPTY SPACE) */
.bhq-side-card{background:#ffffff;border:1px solid #e2e8f0;border-radius:8px;padding:20px;box-shadow:0 1px 3px rgba(0,0,0,0.06),0 1px 2px rgba(0,0,0,0.04);}
.bhq-side-header{display:flex;align-items:center;justify-content:space-between;padding-bottom:10px;border-bottom:2px solid #0f172a;margin-bottom:14px;}
.bhq-side-title{font-size:14px;font-weight:900;text-transform:uppercase;letter-spacing:0.6px;color:#0f172a;margin:0;}

/* SIDEBAR: NEWSLETTER & VIP OFFERS */
.bhq-side-offer-card{background:linear-gradient(135deg, #0f172a 0%, #1e293b 100%);color:#ffffff;border:none;}
.bhq-side-offer-card .bhq-side-header{border-bottom-color:#334155;}
.bhq-side-offer-card .bhq-side-title{color:#ffffff;}
.bhq-side-offer-badge{background:#ff6b00;color:#ffffff;font-size:10px;font-weight:800;text-transform:uppercase;padding:2px 7px;border-radius:3px;}
.bhq-side-offer-desc{font-size:12.5px;line-height:1.5;color:#cbd5e1;margin:0 0 14px 0;}
.bhq-side-input{width:100%;box-sizing:border-box;background:#0f172a;border:1px solid #475569;padding:10px 12px;border-radius:4px;color:#ffffff;font-size:12.5px;margin-bottom:8px;outline:none;}
.bhq-side-input:focus{border-color:#0066cc;}
.bhq-side-btn{width:100%;background:#ff6b00;color:#ffffff;border:none;padding:10px;border-radius:4px;font-size:12.5px;font-weight:800;text-transform:uppercase;letter-spacing:0.5px;cursor:pointer;transition:background 0.2s ease;}
.bhq-side-btn:hover{background:#e05e00;}

/* SIDEBAR: TRENDING BLOGS */
.bhq-side-trend-item{display:flex;gap:12px;padding:10px 0;border-bottom:1px solid #f1f5f9;text-decoration:none;color:inherit;}
.bhq-side-trend-item:last-child{border-bottom:none;padding-bottom:0;}
.bhq-side-trend-rank{font-size:20px;font-weight:900;color:#cbd5e1;line-height:1;min-width:24px;}
.bhq-side-trend-item:hover .bhq-side-trend-rank{color:#0066cc;}
.bhq-side-trend-body{display:flex;flex-direction:column;gap:3px;}
.bhq-side-trend-cat{font-size:10px;font-weight:800;text-transform:uppercase;color:#0066cc;}
.bhq-side-trend-title{font-size:12.5px;font-weight:700;line-height:1.35;color:#0f172a;transition:color 0.2s ease;}
.bhq-side-trend-item:hover .bhq-side-trend-title{color:#0066cc;}
.bhq-side-trend-meta{font-size:10.5px;color:#64748b;}

/* SIDEBAR: FAVORITE KNIFE OF THE WEEK */
.bhq-fav-product{display:flex;flex-direction:column;gap:10px;}
.bhq-fav-img-wrap{width:100%;height:140px;background:#f8fafc;border-radius:4px;display:flex;align-items:center;justify-content:center;overflow:hidden;}
.bhq-fav-img-wrap img{max-width:90%;max-height:90%;object-fit:contain;}
.bhq-fav-title{font-size:13.5px;font-weight:800;color:#0f172a;margin:0;}
.bhq-fav-steel{font-size:11.5px;color:#64748b;}
.bhq-fav-price-row{display:flex;align-items:center;justify-content:space-between;}
.bhq-fav-price{font-size:16px;font-weight:900;color:#0066cc;}
.bhq-fav-cta{background:#0f172a;color:#ffffff !important;text-decoration:none;padding:7px 12px;border-radius:4px;font-size:11.5px;font-weight:700;text-transform:uppercase;transition:background 0.2s ease;}
.bhq-fav-cta:hover{background:#0066cc;}

/* SIDEBAR: POPULAR CATEGORIES LIST */
.bhq-side-cats{display:flex;flex-direction:column;gap:6px;}
.bhq-side-cat-link{display:flex;align-items:center;justify-content:space-between;padding:8px 10px;background:#f8fafc;border-radius:4px;text-decoration:none;color:#1e293b;font-size:12px;font-weight:600;transition:all 0.2s ease;}
.bhq-side-cat-link:hover{background:#eff6ff;color:#0066cc;}
.bhq-side-cat-count{background:#e2e8f0;color:#475569;font-size:10.5px;font-weight:700;padding:2px 6px;border-radius:10px;}

/* RESPONSIVE */
@media (max-width:1100px){.bhq-main-layout{grid-template-columns:1fr;}.bhq-sidebar-col{position:static;}}
@media (max-width:850px){.bhq-articles-grid{grid-template-columns:repeat(2, 1fr);}.bhq-gear-grid{grid-template-columns:repeat(2, 1fr);}}
@media (max-width:600px){.bhq-header-banner{flex-direction:column;align-items:flex-start;gap:12px;}.bhq-trust-strip{flex-wrap:wrap;}.bhq-articles-grid{grid-template-columns:1fr;}.bhq-gear-grid{grid-template-columns:1fr;}.bhq-nav-bar{flex-direction:column;gap:10px;align-items:stretch;}.bhq-category-tabs{overflow-x:auto;padding-bottom:4px;}.bhq-shop-link{text-align:center;}}
`;

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
      "description": "The premier cutlery authority and outdoor knife journal, inspired by Knife Life. Led by Mubashar Shahzad and the Michigan Editorial Team.",
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
            "name": "Crucible CPM MagnaCut vs Böhler M390MK: Lab Edge Test"
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

<style>${cleanCss.replace(/\r?\n|\r/g, ' ').trim()}</style>

<!-- ======================================================== -->
<!-- 2. BLADE HQ "KNIFE LIFE" DOM STRUCTURE                   -->
<!-- ======================================================== -->
<div class="bhq-portal-wrapper">

  <!-- 2.1 TOP HEADER & BRAND BAR -->
  <header class="bhq-header-banner">
    <div class="bhq-brand-block">
      <h1 class="bhq-logo-title">KNIFE <span>LIFE</span></h1>
      <div class="bhq-tagline">Michigan Sports Outdoor Cutlery Journal</div>
    </div>
    
    <!-- E-E-A-T TRUST STRIP -->
    <div class="bhq-trust-strip">
      <div class="bhq-trust-item" title="Active member of the Northwoods cutlery community">
        <span>🛡️ Member of <strong>BladeForums</strong></span>
      </div>
      <div class="bhq-trust-item" title="Verified Outfitter Merchant">
        <span>📦 Available on <strong>Amazon</strong></span>
      </div>
      <div class="bhq-trust-item" title="A+ Accredited Business">
        <span>⭐ <strong>BBB Registered</strong> A+</span>
      </div>
    </div>
  </header>

  <!-- 2.2 BLADE HQ 5-PILLAR NAVIGATION TABS -->
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

  <!-- 2.3 UTILITY SEARCH & VOICE ENGINE -->
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

  <!-- 2.4 MAIN PORTAL LAYOUT: CONTENT + SIDEBAR -->
  <div class="bhq-main-layout">

    <!-- LEFT COLUMN: MAIN CONTENT FEED -->
    <div class="bhq-content-col">

      <!-- FEATURED HERO SPOTLIGHT -->
      <article class="bhq-featured-card" data-category="best-of">
        <div class="bhq-featured-image-box">
          <img 
            src="${imgHero}" 
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
                src="${authorPhotoUrl}" 
                alt="Mubashar Shahzad" 
                class="bhq-author-avatar" 
              />
              <div class="bhq-author-info">
                <div class="bhq-author-name">
                  Mubashar Shahzad <span class="verified" title="Verified Cutlery Specialist">✔</span>
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

      <!-- SECTION 1: LATEST KNIFE GUIDES & FIELD TESTS (EXACTLY 3 CARDS PER ROW) -->
      <section>
        <div class="bhq-section-header">
          <h3 class="bhq-section-title" id="bhqFeedTitle">Latest Knife Guides & Field Tests</h3>
          <span class="bhq-section-sub">Reviewed by Mubashar Shahzad & Michigan Editorial Team</span>
        </div>

        <div class="bhq-articles-grid" id="bhqArticlesGrid">
          
          <!-- CARD 1: BEST OF / HUNTING -->
          <article class="bhq-article-card" data-category="best-of">
            <div class="bhq-card-image-wrap">
              <img 
                src="${imgCard1}" 
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
                  src="${authorPhotoUrl}" 
                  alt="Mubashar Shahzad" 
                  class="bhq-card-avatar"
                />
                <div class="bhq-card-author-meta">
                  <div class="bhq-card-author-name">
                    Mubashar Shahzad <span style="color:#16a34a;">✔</span>
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
                src="${imgCard2}" 
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
                  src="${authorPhotoUrl}" 
                  alt="Mubashar Shahzad" 
                  class="bhq-card-avatar"
                />
                <div class="bhq-card-author-meta">
                  <div class="bhq-card-author-name">
                    Mubashar Shahzad <span style="color:#16a34a;">✔</span>
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
                src="${imgCard3}" 
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
                src="${imgCard4}" 
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
                  src="${authorPhotoUrl}" 
                  alt="Mubashar Shahzad" 
                  class="bhq-card-avatar" 
                />
                <div class="bhq-card-author-meta">
                  <div class="bhq-card-author-name">
                    Mubashar Shahzad <span style="color:#16a34a;">✔</span>
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
                src="${imgCard5}" 
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
                src="${imgCard6}" 
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
                  src="${authorPhotoUrl}" 
                  alt="Mubashar Shahzad" 
                  class="bhq-card-avatar" 
                />
                <div class="bhq-card-author-meta">
                  <div class="bhq-card-author-name">
                    Mubashar Shahzad <span style="color:#16a34a;">✔</span>
                  </div>
                  <div class="bhq-card-author-role">Edge Geometry Specialist</div>
                </div>
              </div>
            </div>
          </article>

        </div>
      </section>

      <!-- SECTION 2: SHOP TESTED GEAR (EXACTLY 3 EQUAL CARDS) -->
      <section class="bhq-gear-section">
        <div class="bhq-section-header">
          <h3 class="bhq-section-title">Shop The Gear • Tested in Our Field Guides</h3>
          <span class="bhq-section-sub">In-Stock at Michigan Sports Outdoor Cutlery Store</span>
        </div>

        <div class="bhq-gear-grid">
          
          <!-- ITEM 1: SOG TACTICAL -->
          <div class="bhq-gear-card">
            <div class="bhq-gear-img-box">
              <img 
                src="${imgGear1}" 
                alt="SOG Field Cutlery" 
                loading="lazy"
              />
            </div>
            <div class="bhq-gear-stock">● In Stock • Ships Today</div>
            <h4 class="bhq-gear-title">SOG Aegis AT Tanto Folder</h4>
            <div class="bhq-gear-specs">Cryo D2 Steel • GRN Grip • Assisted</div>
            <div class="bhq-gear-price">$74.99</div>
            <a href="https://www.michigansportsoutdoor.com/shop/" class="bhq-gear-cta">Buy from MSO →</a>
          </div>

          <!-- ITEM 2: WE KNIFE -->
          <div class="bhq-gear-card">
            <div class="bhq-gear-img-box">
              <img 
                src="${imgGear2}" 
                alt="WE Knife Super Steel Folder" 
                loading="lazy"
              />
            </div>
            <div class="bhq-gear-stock">● In Stock • Ships Today</div>
            <h4 class="bhq-gear-title">WE Knife Banter Titanium</h4>
            <div class="bhq-gear-specs">CPM-S35VN Super Steel • Deep Carry</div>
            <div class="bhq-gear-price">$129.95</div>
            <a href="https://www.michigansportsoutdoor.com/shop/" class="bhq-gear-cta">Buy from MSO →</a>
          </div>

          <!-- ITEM 3: VIPER OUTDOOR -->
          <div class="bhq-gear-card">
            <div class="bhq-gear-img-box">
              <img 
                src="${imgGear3}" 
                alt="Viper Northwoods Fixed Blade" 
                loading="lazy"
              />
            </div>
            <div class="bhq-gear-stock">● In Stock • Ships Today</div>
            <h4 class="bhq-gear-title">Viper Berus 2 Drop Point</h4>
            <div class="bhq-gear-specs">Böhler M390 Steel • Kydex Sheath</div>
            <div class="bhq-gear-price">$149.95</div>
            <a href="https://www.michigansportsoutdoor.com/shop/" class="bhq-gear-cta">Buy from MSO →</a>
          </div>

        </div>
      </section>

    </div>

    <!-- RIGHT COLUMN: RICH FEATURE SIDEBAR (FILLS THE PREVIOUSLY BLANK SPACE) -->
    <aside class="bhq-sidebar-col">

      <!-- SIDEBAR MODULE 1: VIP NEWSLETTER & 15% OFF OFFERS -->
      <div class="bhq-side-card bhq-side-offer-card">
        <div class="bhq-side-header">
          <h4 class="bhq-side-title">🎁 VIP Knife Club</h4>
          <span class="bhq-side-offer-badge">15% Off</span>
        </div>
        <p class="bhq-side-offer-desc">
          Subscribe for secret restock alerts, limited steel drops, and get our <strong>Free 2026 Whitetail Field Dressing & Steel Guide</strong> instantly.
        </p>
        <form onsubmit="event.preventDefault(); alert('Success! Your 15% discount code and 2026 Guide have been emailed.');">
          <input type="email" class="bhq-side-input" placeholder="Enter your email address..." required />
          <button type="submit" class="bhq-side-btn">Get 15% Off & Free Guide →</button>
        </form>
      </div>

      <!-- SIDEBAR MODULE 2: TRENDING BLOGS (01 TO 04) -->
      <div class="bhq-side-card">
        <div class="bhq-side-header">
          <h4 class="bhq-side-title">🔥 Trending on Knife Life</h4>
          <span style="font-size:10.5px; font-weight:700; color:#0066cc;">HOT POSTS</span>
        </div>

        <a href="https://www.michigansportsoutdoor.com/best-fixed-blade-hunting-knives-2026-buying-guide/" class="bhq-side-trend-item">
          <div class="bhq-side-trend-rank">01</div>
          <div class="bhq-side-trend-body">
            <span class="bhq-side-trend-cat">Reviews • Super Steels</span>
            <div class="bhq-side-trend-title">Crucible CPM MagnaCut vs Böhler M390MK Lab Test</div>
            <div class="bhq-side-trend-meta">By Mubashar Shahzad • 6 min read</div>
          </div>
        </a>

        <a href="https://www.michigansportsoutdoor.com/mora-companion-vs-kansbol-vs-garberg/" class="bhq-side-trend-item">
          <div class="bhq-side-trend-rank">02</div>
          <div class="bhq-side-trend-body">
            <span class="bhq-side-trend-cat">Reviews • Bushcraft</span>
            <div class="bhq-side-trend-title">Morakniv Companion vs Kansbol vs Garberg Battle</div>
            <div class="bhq-side-trend-meta">By Michigan Editorial Team • 7 min read</div>
          </div>
        </a>

        <a href="https://www.michigansportsoutdoor.com/how-to-sharpen-a-knife-at-home/" class="bhq-side-trend-item">
          <div class="bhq-side-trend-rank">03</div>
          <div class="bhq-side-trend-body">
            <span class="bhq-side-trend-cat">Learn • Sharpening</span>
            <div class="bhq-side-trend-title">How to Sharpen a Hunting Knife with a Turn-Box</div>
            <div class="bhq-side-trend-meta">By Mubashar Shahzad • 5 min read</div>
          </div>
        </a>

        <a href="https://www.michigansportsoutdoor.com/top-best-edc-knives-under-100/" class="bhq-side-trend-item">
          <div class="bhq-side-trend-rank">04</div>
          <div class="bhq-side-trend-body">
            <span class="bhq-side-trend-cat">Best Of • EDC Folders</span>
            <div class="bhq-side-trend-title">Top 5 Best EDC Pocket Knives Under $100 for Fall</div>
            <div class="bhq-side-trend-meta">By Michigan Editorial Team • 7 min read</div>
          </div>
        </a>
      </div>

      <!-- SIDEBAR MODULE 3: EDITOR'S FAVORITE KNIFE OF THE WEEK -->
      <div class="bhq-side-card">
        <div class="bhq-side-header">
          <h4 class="bhq-side-title">🏆 Staff Favorite Knife</h4>
          <span style="font-size:10.5px; font-weight:800; color:#16a34a;">● IN STOCK</span>
        </div>
        <div class="bhq-fav-product">
          <div class="bhq-fav-img-wrap">
            <img src="${imgFavKnife}" alt="Kizer Drop Point Folder" />
          </div>
          <h5 class="bhq-fav-title">Kizer Drop Bear 154CM Folder</h5>
          <div class="bhq-fav-steel">Clutch Lock • Micarta Handles • Razor Edge</div>
          <div class="bhq-fav-price-row">
            <span class="bhq-fav-price">$119.00</span>
            <a href="https://www.michigansportsoutdoor.com/shop/" class="bhq-fav-cta">Shop Now →</a>
          </div>
        </div>
      </div>

      <!-- SIDEBAR MODULE 4: POPULAR CATEGORIES QUICK NAV -->
      <div class="bhq-side-card">
        <div class="bhq-side-header">
          <h4 class="bhq-side-title">📂 Explore Cutlery Topics</h4>
        </div>
        <div class="bhq-side-cats">
          <a href="#" class="bhq-side-cat-link" onclick="document.querySelector('[data-cat=best-of]').click(); return false;">
            <span>🦌 Whitetail & Hunting Cutlery</span>
            <span class="bhq-side-cat-count">12 Guides</span>
          </a>
          <a href="#" class="bhq-side-cat-link" onclick="document.querySelector('[data-cat=reviews]').click(); return false;">
            <span>🔬 Super Steel Lab Showdowns</span>
            <span class="bhq-side-cat-count">8 Tests</span>
          </a>
          <a href="#" class="bhq-side-cat-link" onclick="document.querySelector('[data-cat=learn]').click(); return false;">
            <span>🔪 Field Sharpening & Maintenance</span>
            <span class="bhq-side-cat-count">10 Lessons</span>
          </a>
          <a href="#" class="bhq-side-cat-link" onclick="document.querySelector('[data-cat=best-of]').click(); return false;">
            <span>🎒 EDC Pocket Knives</span>
            <span class="bhq-side-cat-count">15 Reviews</span>
          </a>
          <a href="#" class="bhq-side-cat-link" onclick="document.querySelector('[data-cat=culture]').click(); return false;">
            <span>🏕️ Backcountry & Bushcraft</span>
            <span class="bhq-side-cat-count">9 Stories</span>
          </a>
        </div>
      </div>

    </aside>

  </div>

</div>

<!-- ======================================================== -->
<!-- 3. INTERACTIVE SCRIPTS: VOICE SEARCH & CATEGORY FILTER   -->
<!-- ======================================================== -->
<script>
document.addEventListener('DOMContentLoaded', function() {
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

  const searchInput = document.getElementById('bhqSearchInput');
  const searchSubmit = document.getElementById('bhqSearchSubmit');
  const voiceBtn = document.getElementById('bhqVoiceBtn');
  const voiceStatus = document.getElementById('bhqVoiceStatus');
  const tagPills = document.querySelectorAll('.bhq-tag-pill');

  function executeSearch(query) {
    if (!query) return;
    const cleanQuery = query.toLowerCase().trim();

    cards.forEach(card => {
      const text = card.textContent.toLowerCase();
      if (text.includes(cleanQuery)) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });

    if (feedTitle) {
      feedTitle.textContent = 'Search Results for "' + query + '"';
    }

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

  console.log('Deploying Master Blade HQ Portal to WordPress Page #166494...');
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

  // Sync to repository
  const repoScriptPath = 'c:/Users/Mubashar Shahzad/Desktop/searchprex-website/scripts/deploy-bladehq-blog.mjs';
  fs.writeFileSync(repoScriptPath, fs.readFileSync(new URL(import.meta.url)));
  console.log('✅ Updated repo script at: ' + repoScriptPath);
}

deployBladeHQMasterPortal().catch(err => {
  console.error('❌ Deployment error:', err);
  process.exit(1);
});
