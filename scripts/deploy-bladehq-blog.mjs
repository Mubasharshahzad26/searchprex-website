import fs from 'fs';

async function deployExactBladeHQBlog() {
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

  // High-res verified images matching the screenshot topics
  const imgFeatured = 'https://images.unsplash.com/photo-1590736969955-71cc94801759?w=900&auto=format&fit=crop&q=80'; // Knives lineup
  const imgCard1 = 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=700&auto=format&fit=crop&q=80';    // Sharpening on bench
  const imgCard2 = 'https://images.unsplash.com/photo-1589256469067-ea99122bbdc4?w=700&auto=format&fit=crop&q=80';    // National knife day / outdoor
  const imgCard3 = 'https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?w=700&auto=format&fit=crop&q=80';    // Super steel blade
  const imgCard4 = 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=700&auto=format&fit=crop&q=80';    // Tanto / tactical folder in hand
  const imgCard5 = 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=700&auto=format&fit=crop&q=80';    // Bushcraft camp knife
  const imgCard6 = 'https://images.unsplash.com/photo-1517420704952-d9f39e95b43e?w=700&auto=format&fit=crop&q=80';    // Edge geometry & sharpening

  // Circular Popular Tags
  const tagImg1 = 'https://images.unsplash.com/photo-1590736969955-71cc94801759?w=350&auto=format&fit=crop&q=80';
  const tagImg2 = 'https://images.unsplash.com/photo-1589256469067-ea99122bbdc4?w=350&auto=format&fit=crop&q=80';
  const tagImg3 = 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=350&auto=format&fit=crop&q=80';
  const tagImg4 = 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=350&auto=format&fit=crop&q=80';
  const tagImg5 = 'https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?w=350&auto=format&fit=crop&q=80';
  const tagImg6 = 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=350&auto=format&fit=crop&q=80';

  // CSS adapted to MSO Brand Colors: Forest Green #475d4b, Amber Gold #f5a623, Pure White #ffffff
  const cleanCss = `
html,body,#page,#wrapper,.site,.site-wrapper,.site-content,#content,.content-area,#primary,#main,.site-main,.entry-content,.entry-content-wrap,.page-content,.post-content,.container,.container-wrap,.page-wrapper,.site-main-content{background-color:#ffffff !important;background:#ffffff !important;color:#222222;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;-webkit-font-smoothing:antialiased;}
.entry-content{padding-left:0 !important;padding-right:0 !important;max-width:100% !important;width:100% !important;overflow-x:hidden;}
.bhq-exact-container{max-width:1080px;margin:0 auto;padding:10px 20px 60px 20px;box-sizing:border-box;}

/* TOP HEADER NAV (EXACT BLADE HQ REPLICA IN MSO BRAND GREEN) */
.bhq-exact-header{display:flex;align-items:center;justify-content:space-between;background:#475d4b;padding:0 20px;border-radius:4px;margin-bottom:24px;min-height:56px;}
.bhq-exact-brand-wrap{display:flex;align-items:center;gap:14px;}
.bhq-exact-logo{display:flex;align-items:center;color:#ffffff;text-decoration:none;font-weight:900;font-size:22px;letter-spacing:0.5px;line-height:1;text-transform:uppercase;padding:12px 14px 12px 0;border-right:2px solid rgba(255,255,255,0.4);}
.bhq-exact-logo-text{display:flex;flex-direction:column;font-size:18px;font-weight:900;line-height:0.95;letter-spacing:1px;}
.bhq-exact-logo-text span{font-size:18px;}
.bhq-exact-nav{display:flex;align-items:center;gap:4px;overflow-x:auto;scrollbar-width:none;}
.bhq-exact-nav::-webkit-scrollbar{display:none;}
.bhq-exact-nav-btn{background:transparent;border:none;color:#ffffff;font-size:14px;font-weight:800;text-transform:uppercase;letter-spacing:0.8px;padding:8px 14px;border-radius:3px;cursor:pointer;transition:background 0.2s ease,color 0.2s ease;white-space:nowrap;}
.bhq-exact-nav-btn:hover{background:rgba(255,255,255,0.15);color:#f5a623;}
.bhq-exact-nav-btn.active{color:#f5a623;border-bottom:2px solid #f5a623;border-radius:0;}
.bhq-exact-search-wrap{position:relative;display:flex;align-items:center;}
.bhq-exact-search-input{background:#ffffff;border:1px solid #cbd5e1;border-radius:3px;padding:6px 32px 6px 12px;font-size:13px;width:170px;outline:none;transition:width 0.2s ease,border-color 0.2s ease;}
.bhq-exact-search-input:focus{width:210px;border-color:#f5a623;}
.bhq-exact-search-icon{position:absolute;right:8px;font-size:13px;color:#64748b;cursor:pointer;border:none;background:transparent;padding:0;}

/* FEATURED POST (SPLIT CARD) */
.bhq-exact-featured-card{display:grid;grid-template-columns:1fr 1fr;background:#ffffff;border:1px solid #e5e7eb;border-radius:8px;overflow:hidden;margin-bottom:28px;box-shadow:0 1px 3px rgba(0,0,0,0.05);transition:box-shadow 0.2s ease,transform 0.2s ease;}
.bhq-exact-featured-card:hover{box-shadow:0 6px 16px rgba(0,0,0,0.08);transform:translateY(-2px);}
.bhq-exact-featured-img-wrap{width:100%;height:270px;background:#f3f4f6;overflow:hidden;}
.bhq-exact-featured-img-wrap img{width:100%;height:100%;object-fit:cover;transition:transform 0.35s ease;display:block;}
.bhq-exact-featured-card:hover .bhq-exact-featured-img-wrap img{transform:scale(1.03);}
.bhq-exact-featured-body{padding:24px;display:flex;flex-direction:column;justify-content:center;}
.bhq-exact-featured-title{font-size:22px;font-weight:800;color:#111827;line-height:1.25;margin:0 0 10px 0;}
.bhq-exact-featured-title a{color:#111827;text-decoration:none;transition:color 0.2s ease;}
.bhq-exact-featured-title a:hover{color:#475d4b;}
.bhq-exact-byline{font-size:11.5px;color:#6b7280;margin-bottom:12px;line-height:1.4;}
.bhq-exact-byline strong{color:#475d4b;font-weight:700;}
.bhq-exact-byline a{color:#475d4b;text-decoration:none;font-weight:700;}
.bhq-exact-byline a:hover{text-decoration:underline;}
.bhq-exact-author-avatar-mini{width:18px;height:18px;border-radius:50%;object-fit:cover;vertical-align:middle;margin-right:4px;border:1px solid #d1d5db;}
.bhq-exact-excerpt{font-size:13px;line-height:1.55;color:#4b5563;margin:0;}

/* ARTICLE GRID (2 EQUAL COLUMNS WITH ROUNDED CORNERS AS PER SCREENSHOT) */
.bhq-exact-grid{display:grid;grid-template-columns:repeat(2, 1fr);gap:24px;margin-bottom:36px;}
.bhq-exact-card{background:#ffffff;border:1px solid #e5e7eb;border-radius:8px;overflow:hidden;display:flex;flex-direction:column;box-shadow:0 1px 3px rgba(0,0,0,0.05);transition:box-shadow 0.2s ease,transform 0.2s ease;}
.bhq-exact-card:hover{box-shadow:0 6px 16px rgba(0,0,0,0.08);transform:translateY(-2px);}
.bhq-exact-card-img-wrap{width:100%;height:200px;background:#f3f4f6;overflow:hidden;}
.bhq-exact-card-img-wrap img{width:100%;height:100%;object-fit:cover;transition:transform 0.35s ease;display:block;}
.bhq-exact-card:hover .bhq-exact-card-img-wrap img{transform:scale(1.03);}
.bhq-exact-card-body{padding:20px;display:flex;flex-direction:column;flex:1;}
.bhq-exact-card-title{font-size:18px;font-weight:800;line-height:1.3;color:#111827;margin:0 0 10px 0;min-height:46px;}
.bhq-exact-card-title a{color:#111827;text-decoration:none;transition:color 0.2s ease;}
.bhq-exact-card-title a:hover{color:#475d4b;}
.bhq-exact-tags{font-size:11px;color:#9ca3af;margin-top:2px;margin-bottom:10px;}
.bhq-exact-tags span{color:#475d4b;font-weight:600;}

/* LOAD MORE BUTTON */
.bhq-exact-load-more-wrap{text-align:center;margin-bottom:48px;}
.bhq-exact-load-more-btn{background:#ffffff;border:2px solid #222222;color:#222222;padding:10px 48px;font-size:13px;font-weight:800;border-radius:4px;cursor:pointer;text-transform:uppercase;letter-spacing:0.5px;transition:all 0.2s ease;}
.bhq-exact-load-more-btn:hover{background:#475d4b;border-color:#475d4b;color:#ffffff;}

/* POPULAR TAGS SECTION (CIRCULAR IMAGES AS PER MEDIA_1789374222403.PNG) */
.bhq-exact-tags-section{margin-top:20px;padding-top:24px;border-top:1px solid #e5e7eb;text-align:center;}
.bhq-exact-tags-heading{font-size:17px;font-weight:800;color:#111827;margin:0 0 20px 0;}
.bhq-exact-circle-grid{display:grid;grid-template-columns:repeat(3, 1fr);gap:24px;max-width:720px;margin:0 auto 30px auto;}
.bhq-exact-circle-item{position:relative;display:flex;align-items:center;justify-content:center;aspect-ratio:1 / 1;border-radius:50%;overflow:hidden;text-decoration:none;box-shadow:0 2px 8px rgba(0,0,0,0.12);transition:transform 0.25s ease,box-shadow 0.25s ease;}
.bhq-exact-circle-item:hover{transform:scale(1.05);box-shadow:0 6px 18px rgba(0,0,0,0.2);}
.bhq-exact-circle-item img{width:100%;height:100%;object-fit:cover;display:block;}
.bhq-exact-circle-overlay{position:absolute;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.45);display:flex;align-items:center;justify-content:center;padding:12px;text-align:center;transition:background 0.2s ease;}
.bhq-exact-circle-item:hover .bhq-exact-circle-overlay{background:rgba(71,93,75,0.65);}
.bhq-exact-circle-label{color:#ffffff;font-size:15px;font-weight:800;text-transform:uppercase;letter-spacing:0.6px;line-height:1.2;text-shadow:0 2px 4px rgba(0,0,0,0.8);}

/* RESPONSIVE */
@media (max-width:850px){
  .bhq-exact-featured-card{grid-template-columns:1fr;}
  .bhq-exact-featured-img-wrap{height:220px;}
  .bhq-exact-grid{grid-template-columns:1fr;}
  .bhq-exact-circle-grid{grid-template-columns:repeat(2, 1fr);max-width:440px;}
}
@media (max-width:650px){
  .bhq-exact-header{flex-direction:column;align-items:stretch;gap:12px;padding:14px;}
  .bhq-exact-brand-wrap{justify-content:space-between;}
  .bhq-exact-nav{justify-content:center;padding-bottom:4px;}
  .bhq-exact-search-input{width:100%;}
  .bhq-exact-circle-grid{grid-template-columns:repeat(2, 1fr);gap:16px;}
  .bhq-exact-circle-label{font-size:13px;}
}
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
      "name": "Knife Blog | Michigan Sports Outdoor Cutlery Journal",
      "description": "The premier authority for knife enthusiasts, hunting blades, and steel guides. Led by Mubashar Shahzad and the Michigan Editorial Team.",
      "breadcrumb": {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.michigansportsoutdoor.com/" },
          { "@type": "ListItem", "position": 2, "name": "Knife Blog", "item": "https://www.michigansportsoutdoor.com/blog/" }
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
            "name": "Best Steels for Your Budget: 2026 Knife Steel Guide"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "url": "https://www.michigansportsoutdoor.com/how-to-sharpen-a-knife-at-home/",
            "name": "Edge Retention & Ease of Sharpening: What's the Difference?"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "url": "https://www.michigansportsoutdoor.com/mora-companion-vs-kansbol-vs-garberg/",
            "name": "The Real History of National Knife Day [With Evidence]"
          },
          {
            "@type": "ListItem",
            "position": 4,
            "url": "https://www.michigansportsoutdoor.com/best-fixed-blade-hunting-knives-2026-buying-guide/",
            "name": "Carpenter's A-421 Steel: Is It Better Than MagnaCut?"
          },
          {
            "@type": "ListItem",
            "position": 5,
            "url": "https://www.michigansportsoutdoor.com/top-best-edc-knives-under-100/",
            "name": "PM2 Tanto Sold Out: Official Statement + Upcoming Drop"
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
<!-- 2. EXACT BLADE HQ BLOG REPLICA DOM                       -->
<!-- ======================================================== -->
<div class="bhq-exact-container">

  <!-- 2.1 HEADER BAR (KNIFE | BLOG + NAV + SEARCH) -->
  <header class="bhq-exact-header">
    <div class="bhq-exact-brand-wrap">
      <a href="https://www.michigansportsoutdoor.com/blog/" class="bhq-exact-logo">
        <div class="bhq-exact-logo-text">
          <span>KNIFE</span>
          <span>BLOG</span>
        </div>
      </a>
      <nav class="bhq-exact-nav" aria-label="Knife Blog Categories">
        <button class="bhq-exact-nav-btn active" data-cat="all">All</button>
        <button class="bhq-exact-nav-btn" data-cat="learn">LEARN</button>
        <button class="bhq-exact-nav-btn" data-cat="best-of">BEST OF</button>
        <button class="bhq-exact-nav-btn" data-cat="reviews">REVIEWS</button>
        <button class="bhq-exact-nav-btn" data-cat="culture">CULTURE</button>
        <button class="bhq-exact-nav-btn" data-cat="news">NEWS</button>
      </nav>
    </div>

    <div class="bhq-exact-search-wrap">
      <input 
        type="text" 
        id="bhqExactSearch" 
        class="bhq-exact-search-input" 
        placeholder="Search Blog..." 
        autocomplete="off" 
      />
      <button type="button" id="bhqExactSearchBtn" class="bhq-exact-search-icon" title="Search">🔍</button>
    </div>
  </header>

  <!-- 2.2 TOP FEATURED STORY (SPLIT CARD: IMAGE + CONTENT) -->
  <article class="bhq-exact-featured-card" data-category="best-of">
    <div class="bhq-exact-featured-img-wrap">
      <a href="https://www.michigansportsoutdoor.com/best-hunting-knives-for-michigan-deer-season-3/">
        <img 
          src="${imgFeatured}" 
          alt="Best Steels for Your Budget: Knife Lineup" 
          loading="eager"
        />
      </a>
    </div>
    <div class="bhq-exact-featured-body">
      <h2 class="bhq-exact-featured-title">
        <a href="https://www.michigansportsoutdoor.com/best-hunting-knives-for-michigan-deer-season-3/">
          Best Steels for Your Budget (2026 Cutlery & Hunting Guide)
        </a>
      </h2>
      <div class="bhq-exact-byline">
        <img src="${authorPhotoUrl}" alt="Mubashar Shahzad" class="bhq-exact-author-avatar-mini" />
        <a href="#">Mubashar Shahzad</a> on September 14, 2026, in <a href="#">Best of</a>, <a href="#">Type</a>
      </div>
      <p class="bhq-exact-excerpt">
        What's the best steel for your budget? What's the highest-value knife with that steel? If you're asking these questions, you've come to the right place! In this article, we'll breakdown all the best steel types for high, medium, and low budgets, and present some of the highest-value knives on the market right now. In This...
      </p>
    </div>
  </article>

  <!-- 2.3 ARTICLE GRID (2 EQUAL COLUMNS WITH ROUNDED CORNERS) -->
  <div class="bhq-exact-grid" id="bhqExactGrid">

    <!-- CARD 1: EDGE RETENTION & SHARPENING -->
    <article class="bhq-exact-card" data-category="learn">
      <div class="bhq-exact-card-img-wrap">
        <a href="https://www.michigansportsoutdoor.com/how-to-sharpen-a-knife-at-home/">
          <img 
            src="${imgCard1}" 
            alt="Edge Retention and Ease of Sharpening" 
            loading="lazy"
          />
        </a>
      </div>
      <div class="bhq-exact-card-body">
        <h3 class="bhq-exact-card-title">
          <a href="https://www.michigansportsoutdoor.com/how-to-sharpen-a-knife-at-home/">
            Edge Retention & Ease of Sharpening: What's the Difference?
          </a>
        </h3>
        <div class="bhq-exact-byline">
          <img src="${authorPhotoUrl}" alt="Mubashar Shahzad" class="bhq-exact-author-avatar-mini" />
          <a href="#">Mubashar Shahzad</a> on August 27, 2026, in <a href="#">Knife Knowledge</a>, <a href="#">Learn</a>
        </div>
        <div class="bhq-exact-tags">
          Tags: <span>Edge Retention</span>, <span>Sharpening</span>
        </div>
        <p class="bhq-exact-excerpt">
          Are Edge Retention & Ease of Sharpening the Same? What's the difference between edge retention and ease of sharpening, you ask? First off, it's a good question! If you're familiar with our Knife Steel Guide, you'll know the four aspects we use to rate each steel. After perusing the various rankings, you may have noticed...
        </p>
      </div>
    </article>

    <!-- CARD 2: NATIONAL KNIFE DAY -->
    <article class="bhq-exact-card" data-category="culture">
      <div class="bhq-exact-card-img-wrap">
        <a href="https://www.michigansportsoutdoor.com/mora-companion-vs-kansbol-vs-garberg/">
          <img 
            src="${imgCard2}" 
            alt="The Real History of National Knife Day" 
            loading="lazy"
          />
        </a>
      </div>
      <div class="bhq-exact-card-body">
        <h3 class="bhq-exact-card-title">
          <a href="https://www.michigansportsoutdoor.com/mora-companion-vs-kansbol-vs-garberg/">
            The Real History of National Knife Day [With Evidence]
          </a>
        </h3>
        <div class="bhq-exact-byline">
          <a href="#">Michigan Editorial Team</a> on August 24, 2026, in <a href="#">Culture</a>, <a href="#">News</a>
        </div>
        <div class="bhq-exact-tags">
          Tags: <span>National Knife Day</span>, <span>Tradition</span>
        </div>
        <p class="bhq-exact-excerpt">
          A Michigan Sports Outdoor investigation into the origins of August 24th's holiday. Since 2011, the knife community has celebrated National Knife Day every year. But who actually started it? If you do a quick online search, you'll likely find the same explanations repeated across the Internet. So we dug deeper...
        </p>
      </div>
    </article>

    <!-- CARD 3: CARPENTER'S A-421 STEEL VS MAGNACUT -->
    <article class="bhq-exact-card" data-category="reviews">
      <div class="bhq-exact-card-img-wrap">
        <a href="https://www.michigansportsoutdoor.com/best-fixed-blade-hunting-knives-2026-buying-guide/">
          <img 
            src="${imgCard3}" 
            alt="Carpenter Steel vs MagnaCut" 
            loading="lazy"
          />
        </a>
      </div>
      <div class="bhq-exact-card-body">
        <h3 class="bhq-exact-card-title">
          <a href="https://www.michigansportsoutdoor.com/best-fixed-blade-hunting-knives-2026-buying-guide/">
            Carpenter's A-421 Steel: Is It Better Than MagnaCut?
          </a>
        </h3>
        <div class="bhq-exact-byline">
          <img src="${authorPhotoUrl}" alt="Mubashar Shahzad" class="bhq-exact-author-avatar-mini" />
          <a href="#">Mubashar Shahzad</a> on August 17, 2026, in <a href="#">Reviews</a>, <a href="#">Super Steels</a>
        </div>
        <div class="bhq-exact-tags">
          Tags: <span>CPM MagnaCut</span>, <span>A-421 Steel</span>, <span>Testing</span>
        </div>
        <p class="bhq-exact-excerpt">
          In This Article: For the last few months, we've heard whisperings of a groundbreaking steel making its way to us from the medical cutlery industry. It offers performance very similar to other high-end blade steels (think MagnaCut, CPM S35VN, etc.), but carved a unique path there. In this article, we'll go over all the exciting details...
        </p>
      </div>
    </article>

    <!-- CARD 4: PM2 TANTO / EDC DROPS -->
    <article class="bhq-exact-card" data-category="news">
      <div class="bhq-exact-card-img-wrap">
        <a href="https://www.michigansportsoutdoor.com/top-best-edc-knives-under-100/">
          <img 
            src="${imgCard4}" 
            alt="PM2 Tanto Drop and EDC Knives" 
            loading="lazy"
          />
        </a>
      </div>
      <div class="bhq-exact-card-body">
        <h3 class="bhq-exact-card-title">
          <a href="https://www.michigansportsoutdoor.com/top-best-edc-knives-under-100/">
            PM2 Tanto Sold Out: Official Statement + Upcoming Drop
          </a>
        </h3>
        <div class="bhq-exact-byline">
          <a href="#">Michigan Editorial Team</a> on August 4, 2026, in <a href="#">News</a>, <a href="#">Drops</a>
        </div>
        <div class="bhq-exact-tags">
          Tags: <span>Spyderco</span>, <span>Tanto</span>, <span>EDC Knives</span>
        </div>
        <p class="bhq-exact-excerpt">
          In This Article: Official Statement. Thank you to everyone who participated in today's PM2 Tanto release. The response was extraordinary, and we are genuinely grateful for your enthusiasm, patience, and support. While many customers were able to successfully place their orders, we know others encountered delays. Here is what's next...
        </p>
      </div>
    </article>

    <!-- CARD 5: BUSHCRAFT KNIVES -->
    <article class="bhq-exact-card" data-category="reviews">
      <div class="bhq-exact-card-img-wrap">
        <a href="https://www.michigansportsoutdoor.com/mora-companion-vs-kansbol-vs-garberg/">
          <img 
            src="${imgCard5}" 
            alt="Morakniv Companion vs Kansbol vs Garberg" 
            loading="lazy"
          />
        </a>
      </div>
      <div class="bhq-exact-card-body">
        <h3 class="bhq-exact-card-title">
          <a href="https://www.michigansportsoutdoor.com/mora-companion-vs-kansbol-vs-garberg/">
            Morakniv Companion vs Kansbol vs Garberg: Camp Knife Battle
          </a>
        </h3>
        <div class="bhq-exact-byline">
          <img src="${authorPhotoUrl}" alt="Mubashar Shahzad" class="bhq-exact-author-avatar-mini" />
          <a href="#">Mubashar Shahzad</a> on July 29, 2026, in <a href="#">Reviews</a>, <a href="#">Bushcraft</a>
        </div>
        <div class="bhq-exact-tags">
          Tags: <span>Morakniv</span>, <span>Camp Cutlery</span>, <span>Field Test</span>
        </div>
        <p class="bhq-exact-excerpt">
          We put Sweden's top 3 backcountry fixed blades through rigorous wood splitting, feather sticking, and camp food prep in Northern Michigan. Discover which Swedish steel geometry offers the best toughness-to-weight ratio for your next backpacking trip...
        </p>
      </div>
    </article>

    <!-- CARD 6: EDGE GEOMETRY -->
    <article class="bhq-exact-card" data-category="learn">
      <div class="bhq-exact-card-img-wrap">
        <a href="https://www.michigansportsoutdoor.com/understanding-knife-edge-geometry-hollow-grind-vs-flat-grind/">
          <img 
            src="${imgCard6}" 
            alt="Knife Blade Edge Geometry Hollow vs Flat Grind" 
            loading="lazy"
          />
        </a>
      </div>
      <div class="bhq-exact-card-body">
        <h3 class="bhq-exact-card-title">
          <a href="https://www.michigansportsoutdoor.com/understanding-knife-edge-geometry-hollow-grind-vs-flat-grind/">
            Understanding Knife Edge Geometry: Hollow Grind vs Flat Grind
          </a>
        </h3>
        <div class="bhq-exact-byline">
          <img src="${authorPhotoUrl}" alt="Mubashar Shahzad" class="bhq-exact-author-avatar-mini" />
          <a href="#">Mubashar Shahzad</a> on July 20, 2026, in <a href="#">Knife Knowledge</a>, <a href="#">Learn</a>
        </div>
        <div class="bhq-exact-tags">
          Tags: <span>Edge Geometry</span>, <span>Hollow Grind</span>, <span>Flat Grind</span>
        </div>
        <p class="bhq-exact-excerpt">
          An engineering analysis of bevel profiles, edge thickness behind the apex, and slicing vs chopping performance. Learn why convex grinds rule camp choppers while high hollow grinds dominate hunting skinners...
        </p>
      </div>
    </article>

  </div>

  <!-- 2.4 LOAD MORE BUTTON -->
  <div class="bhq-exact-load-more-wrap">
    <button type="button" class="bhq-exact-load-more-btn" onclick="alert('All 6 high-priority 2026 field guides are currently displayed.');">
      Load More Articles
    </button>
  </div>

  <!-- 2.5 POPULAR TAGS SECTION (CIRCULAR 6-IMAGE GRID AS PER MEDIA_1789374222403.PNG) -->
  <section class="bhq-exact-tags-section">
    <h3 class="bhq-exact-tags-heading">Popular Tags:</h3>
    <div class="bhq-exact-circle-grid">
      
      <!-- CIRCLE 1: BUTTERFLY KNIFE / HUNTING -->
      <a href="#" class="bhq-exact-circle-item" onclick="document.querySelector('[data-cat=best-of]').click(); return false;">
        <img src="${tagImg1}" alt="Butterfly Knife Tag" />
        <div class="bhq-exact-circle-overlay">
          <span class="bhq-exact-circle-label">Butterfly Knife</span>
        </div>
      </a>

      <!-- CIRCLE 2: BENCHMADE -->
      <a href="#" class="bhq-exact-circle-item" onclick="document.querySelector('[data-cat=reviews]').click(); return false;">
        <img src="${tagImg2}" alt="Benchmade Tag" />
        <div class="bhq-exact-circle-overlay">
          <span class="bhq-exact-circle-label">Benchmade</span>
        </div>
      </a>

      <!-- CIRCLE 3: GEAR -->
      <a href="#" class="bhq-exact-circle-item" onclick="document.querySelector('[data-cat=learn]').click(); return false;">
        <img src="${tagImg3}" alt="Gear Tag" />
        <div class="bhq-exact-circle-overlay">
          <span class="bhq-exact-circle-label">Gear</span>
        </div>
      </a>

      <!-- CIRCLE 4: SPYDERCO -->
      <a href="#" class="bhq-exact-circle-item" onclick="document.querySelector('[data-cat=news]').click(); return false;">
        <img src="${tagImg4}" alt="Spyderco Tag" />
        <div class="bhq-exact-circle-overlay">
          <span class="bhq-exact-circle-label">Spyderco</span>
        </div>
      </a>

      <!-- CIRCLE 5: KERSHAW -->
      <a href="#" class="bhq-exact-circle-item" onclick="document.querySelector('[data-cat=reviews]').click(); return false;">
        <img src="${tagImg5}" alt="Kershaw Tag" />
        <div class="bhq-exact-circle-overlay">
          <span class="bhq-exact-circle-label">Kershaw</span>
        </div>
      </a>

      <!-- CIRCLE 6: POCKET KNIVES -->
      <a href="#" class="bhq-exact-circle-item" onclick="document.querySelector('[data-cat=best-of]').click(); return false;">
        <img src="${tagImg6}" alt="Pocket Knives Tag" />
        <div class="bhq-exact-circle-overlay">
          <span class="bhq-exact-circle-label">Pocket Knives</span>
        </div>
      </a>

    </div>
  </section>

</div>

<!-- ======================================================== -->
<!-- 3. INTERACTIVE SCRIPTS: FILTERING & SEARCH                -->
<!-- ======================================================== -->
<script>
document.addEventListener('DOMContentLoaded', function() {
  const navBtns = document.querySelectorAll('.bhq-exact-nav-btn');
  const cards = document.querySelectorAll('#bhqExactGrid .bhq-exact-card');
  const featuredCard = document.querySelector('.bhq-exact-featured-card');
  const searchInput = document.getElementById('bhqExactSearch');
  const searchBtn = document.getElementById('bhqExactSearchBtn');

  // Category switcher
  navBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      navBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');

      const cat = this.getAttribute('data-cat');
      
      if (featuredCard) {
        const featCat = featuredCard.getAttribute('data-category');
        if (cat === 'all' || featCat === cat) {
          featuredCard.style.display = 'grid';
        } else {
          featuredCard.style.display = 'none';
        }
      }

      cards.forEach(card => {
        const cardCat = card.getAttribute('data-category');
        if (cat === 'all' || cardCat === cat) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Search filter
  function runSearch(query) {
    if (!query) return;
    const q = query.toLowerCase().trim();

    if (featuredCard) {
      if (featuredCard.textContent.toLowerCase().includes(q)) {
        featuredCard.style.display = 'grid';
      } else {
        featuredCard.style.display = 'none';
      }
    }

    cards.forEach(card => {
      if (card.textContent.toLowerCase().includes(q)) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });

    const grid = document.getElementById('bhqExactGrid');
    if (grid) {
      grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  if (searchBtn && searchInput) {
    searchBtn.addEventListener('click', () => runSearch(searchInput.value));
    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') runSearch(searchInput.value);
    });
  }
});
</script>
`;

  console.log('Deploying Exact Blade HQ Design to Michigan Sports Outdoor...');
  const res = await fetch(`${baseUrl}/wp-json/wp/v2/pages/166494`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      title: 'Knife Blog | Michigan Sports Outdoor Cutlery & Gear Journal',
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

deployExactBladeHQBlog().catch(err => {
  console.error('❌ Deployment error:', err);
  process.exit(1);
});
