/**
 * Category Hub Modernization Engine (Blade HQ Standards)
 * Target Hubs:
 * 1. Hunting Knives Hub (/hunting-knives/ & WooCommerce Cat 1147, 1206)
 * 2. Folding Knives Hub (/folding-knives/ & WooCommerce Cat 1153, 1152)
 */

const baseUrl = 'https://www.michigansportsoutdoor.com';
const username = 'apiuser';
const appPassword = process.env.MSO_WP_PASS;
if (!appPassword) throw new Error("Set MSO_WP_PASS to the MSO WordPress application password. Never hardcode it: this repository is public.");
const auth = Buffer.from(`${username}:${appPassword}`).toString('base64');
const headers = {
  Authorization: `Basic ${auth}`,
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36',
  'Content-Type': 'application/json'
};

// Shared Blade HQ Masterpiece CSS
const sharedCss = `
<style>
.mso-cat-hub { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; color: #1e293b; line-height: 1.6; max-width: 1320px; margin: 0 auto; padding: 10px 16px 40px 16px; }
.mso-cat-hero { background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); color: #ffffff; border-radius: 10px; padding: 40px 36px; margin-bottom: 28px; box-shadow: 0 8px 24px rgba(0,0,0,0.15); position: relative; overflow: hidden; }
.mso-cat-hero-badge { display: inline-block; background: #ea580c; color: #ffffff; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; padding: 4px 12px; border-radius: 20px; margin-bottom: 14px; }
.mso-cat-hero h1 { font-size: 38px; font-weight: 900; line-height: 1.15; color: #ffffff; margin: 0 0 14px 0; letter-spacing: -0.5px; }
.mso-cat-hero p { font-size: 16px; color: #cbd5e1; max-width: 860px; margin: 0 0 20px 0; line-height: 1.6; }

/* Filter Pills */
.mso-pill-row { display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 30px; }
.mso-pill { display: inline-flex; align-items: center; background: #f1f5f9; color: #334155; font-size: 13px; font-weight: 700; padding: 8px 18px; border-radius: 24px; text-decoration: none; border: 1px solid #e2e8f0; transition: all 0.2s ease; }
.mso-pill:hover, .mso-pill.active { background: #0f172a; color: #ffffff; border-color: #0f172a; transform: translateY(-2px); box-shadow: 0 4px 10px rgba(0,0,0,0.1); }
.mso-pill-count { display: inline-block; background: #e2e8f0; color: #475569; font-size: 11px; font-weight: 800; padding: 2px 7px; border-radius: 12px; margin-left: 6px; }
.mso-pill:hover .mso-pill-count, .mso-pill.active .mso-pill-count { background: #334155; color: #f8fafc; }

/* Section Header */
.mso-sec-head { display: flex; justify-content: space-between; align-items: baseline; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px; margin: 36px 0 20px 0; }
.mso-sec-title { font-size: 24px; font-weight: 900; color: #0f172a; margin: 0; text-transform: uppercase; letter-spacing: 0.5px; }
.mso-sec-sub { font-size: 13px; color: #64748b; font-style: italic; }

/* Product Grid */
.mso-prod-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 18px; margin-bottom: 36px; }
.mso-prod-card { background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 18px; display: flex; flex-direction: column; transition: all 0.2s ease; text-decoration: none; color: inherit; }
.mso-prod-card:hover { border-color: #cbd5e1; transform: translateY(-3px); box-shadow: 0 8px 20px rgba(0,0,0,0.08); }
.mso-prod-img { width: 100%; height: 170px; object-fit: contain; margin-bottom: 14px; }
.mso-prod-tag { font-size: 10px; font-weight: 800; text-transform: uppercase; color: #ea580c; margin-bottom: 4px; }
.mso-prod-name { font-size: 14px; font-weight: 800; color: #0f172a; margin: 0 0 8px 0; line-height: 1.35; flex-grow: 1; }
.mso-prod-specs { font-size: 11.5px; color: #64748b; margin-bottom: 12px; }
.mso-prod-bottom { display: flex; justify-content: space-between; align-items: center; margin-top: auto; padding-top: 10px; border-top: 1px solid #f1f5f9; }
.mso-prod-price { font-size: 17px; font-weight: 900; color: #0f172a; }
.mso-cart-btn { background: #ea580c; color: #ffffff !important; font-size: 11.5px; font-weight: 800; text-transform: uppercase; padding: 6px 14px; border-radius: 4px; text-decoration: none; transition: background 0.2s ease; }
.mso-cart-btn:hover { background: #c2410c; }

/* Metallurgy Table */
.mso-table-wrap { overflow-x: auto; margin-bottom: 36px; border-radius: 8px; border: 1px solid #e2e8f0; }
.mso-table { width: 100%; border-collapse: collapse; text-align: left; font-size: 13px; }
.mso-table th { background: #0f172a; color: #ffffff; font-weight: 800; padding: 12px 14px; text-transform: uppercase; font-size: 11.5px; letter-spacing: 0.5px; }
.mso-table td { padding: 12px 14px; border-bottom: 1px solid #e2e8f0; color: #334155; }
.mso-table tr:nth-child(even) { background: #f8fafc; }
.mso-table tr:hover { background: #f1f5f9; }
.mso-steel-badge { display: inline-block; background: #e0f2fe; color: #0369a1; font-weight: 800; padding: 2px 8px; border-radius: 4px; }
.mso-hrc-badge { display: inline-block; background: #fef3c7; color: #92400e; font-weight: 700; padding: 2px 6px; border-radius: 4px; }

/* Guide Cards */
.mso-guide-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(340px, 1fr)); gap: 18px; margin-bottom: 36px; }
.mso-guide-card { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 22px; }
.mso-guide-card h3 { font-size: 17px; font-weight: 800; color: #0f172a; margin: 0 0 10px 0; }
.mso-guide-card p { font-size: 13.5px; color: #475569; margin: 0; line-height: 1.55; }

/* Notice Box */
.mso-notice-box { background: #fffbeb; border-left: 4px solid #f59e0b; padding: 16px 20px; border-radius: 0 8px 8px 0; margin-bottom: 36px; }
.mso-notice-box h4 { font-size: 14px; font-weight: 800; color: #92400e; margin: 0 0 6px 0; text-transform: uppercase; }
.mso-notice-box p { font-size: 13px; color: #78350f; margin: 0; }

/* FAQ Accordion Style */
.mso-faq-list { margin-bottom: 36px; }
.mso-faq-item { background: #ffffff; border: 1px solid #e2e8f0; border-radius: 6px; margin-bottom: 10px; padding: 16px 20px; }
.mso-faq-q { font-size: 15px; font-weight: 800; color: #0f172a; margin: 0 0 8px 0; }
.mso-faq-a { font-size: 13.5px; color: #475569; margin: 0; line-height: 1.6; }
</style>
`;

// ─────────────────────────────────────────────────────────────
// 1. HUNTING KNIVES MASTERPIECE HTML
// ─────────────────────────────────────────────────────────────
const huntingContentHtml = `
${sharedCss}
<div class="mso-cat-hub">
  <!-- HERO BANNER -->
  <div class="mso-cat-hero">
    <div class="mso-cat-hero-badge">2026 Big Game Outfitter Edition</div>
    <h1>American Hunting Knives &amp; Field Dressing Cutlery</h1>
    <p>
      Engineered for rugged Northwoods whitetail camps, backcountry elk hunts, and sub-zero field dressing. Explore factory-direct fixed blades, razor-keen capers, gut hooks, and replaceable surgical scalpel skinners from Benchmade, Buck, Morakniv, Outdoor Edge, and ESEE.
    </p>
    <div class="mso-pill-row" style="margin-bottom: 0;">
      <a href="#featured" class="mso-pill active">Featured Field Knives</a>
      <a href="#metallurgy" class="mso-pill">Blade Steel Comparison</a>
      <a href="#anatomy" class="mso-pill">Blade Anatomy Guide</a>
      <a href="#faq" class="mso-pill">Hunting FAQs</a>
      <a href="https://www.michigansportsoutdoor.com/michigan-knife-laws/" class="mso-pill">Michigan DNR Rules</a>
    </div>
  </div>

  <!-- SUBCATEGORY PILLS -->
  <div class="mso-pill-row">
    <a href="https://www.michigansportsoutdoor.com/collections/hunting-and-shooting/" class="mso-pill active">All Hunting Cutlery <span class="mso-pill-count">593</span></a>
    <a href="https://www.michigansportsoutdoor.com/collections/hunting-knife-sets/" class="mso-pill">Hunting Knife Sets <span class="mso-pill-count">98</span></a>
    <a href="https://www.michigansportsoutdoor.com/collections/survival-knives/" class="mso-pill">Survival &amp; Camp Blades <span class="mso-pill-count">175</span></a>
    <a href="https://www.michigansportsoutdoor.com/collections/bowies/" class="mso-pill">Heavy Bowies <span class="mso-pill-count">433</span></a>
    <a href="https://www.michigansportsoutdoor.com/collections/sharpeners/" class="mso-pill">Field Sharpeners <span class="mso-pill-count">1,046</span></a>
    <a href="https://www.michigansportsoutdoor.com/october-season/" class="mso-pill">October Season Drop <span class="mso-pill-count">Hot</span></a>
  </div>

  <!-- FEATURED HUNTING KNIVES -->
  <div class="mso-sec-head" id="featured">
    <h2 class="mso-sec-title">Proven Field Dressing &amp; Skinning Cutlery</h2>
    <span class="mso-sec-sub">Factory-direct authenticity • In-stock &amp; ready to ship</span>
  </div>

  <div class="mso-prod-grid">
    <!-- Prod 1 -->
    <div class="mso-prod-card">
      <img src="https://www.michigansportsoutdoor.com/wp-content/uploads/2026/09/mso-october-whitetail-fixed-blades-promo.jpg" alt="Buck 119 Special Fixed Blade Hunting Knife" class="mso-prod-img" />
      <div class="mso-prod-tag">Classic American Hunter</div>
      <div class="mso-prod-name">Buck 119 Special 6" Fixed Blade Clip Point</div>
      <div class="mso-prod-specs">Steel: 420HC Bos Heat-Treat | Tang: Full | Handle: Phenolic</div>
      <div class="mso-prod-bottom">
        <span class="mso-prod-price">$89.99</span>
        <a href="https://www.michigansportsoutdoor.com/collections/hunting-and-shooting/" class="mso-cart-btn">View Details</a>
      </div>
    </div>

    <!-- Prod 2 -->
    <div class="mso-prod-card">
      <img src="https://www.michigansportsoutdoor.com/wp-content/uploads/2026/09/VOSA2628_add_01.jpg" alt="Morakniv Companion Heavy Duty Field Knife" class="mso-prod-img" />
      <div class="mso-prod-tag">Backcountry Workhorse</div>
      <div class="mso-prod-name">Morakniv Companion Heavy Duty MG Bushcraft</div>
      <div class="mso-prod-specs">Steel: Carbon Steel (HRC 59) | Grind: True Scandi | Grip: TPE</div>
      <div class="mso-prod-bottom">
        <span class="mso-prod-price">$24.99</span>
        <a href="https://www.michigansportsoutdoor.com/collections/hunting-and-shooting/" class="mso-cart-btn">View Details</a>
      </div>
    </div>

    <!-- Prod 3 -->
    <div class="mso-prod-card">
      <img src="https://www.michigansportsoutdoor.com/wp-content/uploads/2026/09/WE18062XA1_add_01.jpg" alt="Benchmade Meatcrafter Fixed Blade CPM-154" class="mso-prod-img" />
      <div class="mso-prod-tag">Meat Processing Master</div>
      <div class="mso-prod-name">Benchmade Meatcrafter Trailing Point Field Blade</div>
      <div class="mso-prod-specs">Steel: CPM-154 SelectEdge | Edge: 14° Angle | Handle: Santoprene</div>
      <div class="mso-prod-bottom">
        <span class="mso-prod-price">$180.00</span>
        <a href="https://www.michigansportsoutdoor.com/collections/hunting-and-shooting/" class="mso-cart-btn">View Details</a>
      </div>
    </div>

    <!-- Prod 4 -->
    <div class="mso-prod-card">
      <img src="https://www.michigansportsoutdoor.com/wp-content/uploads/2026/09/SOG18300643_add_01.jpg" alt="Outdoor Edge RazorLite Replaceable Blade Skinner" class="mso-prod-img" />
      <div class="mso-prod-tag">Razor Replaceable System</div>
      <div class="mso-prod-name">Outdoor Edge RazorLite 3.5" Scalpel Skinner</div>
      <div class="mso-prod-specs">Steel: Japanese 420J2 Razor Blades | Quick-Change Button Lock</div>
      <div class="mso-prod-bottom">
        <span class="mso-prod-price">$39.95</span>
        <a href="https://www.michigansportsoutdoor.com/collections/hunting-and-shooting/" class="mso-cart-btn">View Details</a>
      </div>
    </div>
  </div>

  <!-- BLADE STEEL METALLURGY MATRIX -->
  <div class="mso-sec-head" id="metallurgy">
    <h2 class="mso-sec-title">Hunting Blade Steel Metallurgy Matrix</h2>
    <span class="mso-sec-sub">Technical field guide: Edge retention vs toughness vs field stropping</span>
  </div>

  <div class="mso-table-wrap">
    <table class="mso-table">
      <thead>
        <tr>
          <th>Blade Steel</th>
          <th>Category</th>
          <th>Typical HRC</th>
          <th>Edge Retention</th>
          <th>Impact Toughness</th>
          <th>Corrosion Immunity</th>
          <th>Primary Hunting Utility</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong class="mso-steel-badge">CPM-MagnaCut</strong></td>
          <td>Powder Metallurgy Stainless</td>
          <td><span class="mso-hrc-badge">62 - 64</span></td>
          <td>★★★★★</td>
          <td>★★★★★</td>
          <td>★★★★★ (100% Salt/Blood Proof)</td>
          <td>All-Weather Big Game &amp; Wet Blood Dressing</td>
        </tr>
        <tr>
          <td><strong class="mso-steel-badge">CPM-S35VN</strong></td>
          <td>Crucible Niobium Stainless</td>
          <td><span class="mso-hrc-badge">59 - 61</span></td>
          <td>★★★★☆</td>
          <td>★★★★☆</td>
          <td>★★★★☆</td>
          <td>General Field Skinning &amp; Trophy Caping</td>
        </tr>
        <tr>
          <td><strong class="mso-steel-badge">D2 Tool Steel</strong></td>
          <td>High-Carbon High-Chromium</td>
          <td><span class="mso-hrc-badge">60 - 62</span></td>
          <td>★★★★☆</td>
          <td>★★★☆☆</td>
          <td>★★★☆☆ (Requires Oil)</td>
          <td>Hard-Wear Hide Cutting &amp; Gritty Silt Work</td>
        </tr>
        <tr>
          <td><strong class="mso-steel-badge">14C28N Sandvik</strong></td>
          <td>Swedish Fine-Grain Stainless</td>
          <td><span class="mso-hrc-badge">58 - 60</span></td>
          <td>★★★☆☆</td>
          <td>★★★★☆</td>
          <td>★★★★★</td>
          <td>Fast Hair-Splitting Field Honing</td>
        </tr>
        <tr>
          <td><strong class="mso-steel-badge">1095 High Carbon</strong></td>
          <td>Classic Carbon Steel</td>
          <td><span class="mso-hrc-badge">56 - 58</span></td>
          <td>★★★☆☆</td>
          <td>★★★★★ (Max Shock Resist)</td>
          <td>★★☆☆☆ (High Patina)</td>
          <td>Bone Splitting, Camp Cleaving &amp; Batoning</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- BLADE ANATOMY & FIELD DRESSING GUIDE -->
  <div class="mso-sec-head" id="anatomy">
    <h2 class="mso-sec-title">Field Dressing Blade Profiles: Which Do You Need?</h2>
    <span class="mso-sec-sub">Optimized blade geometry for clean harvest processing</span>
  </div>

  <div class="mso-guide-grid">
    <div class="mso-guide-card">
      <h3>1. Drop Point Skinners</h3>
      <p>
        The gold standard for Michigan whitetail deer. The convex spine drops gently toward the tip, positioning the point low to prevent accidental paunch puncture while providing a large curved belly for sweeping hide separation.
      </p>
    </div>
    <div class="mso-guide-card">
      <h3>2. Gut Hook Field Blades</h3>
      <p>
        Features a sharpened inverted bevel along the upper spine. Used like a zipper to open the abdominal cavity without cutting through the stomach lining, drastically cutting field dress time while maintaining meat hygiene.
      </p>
    </div>
    <div class="mso-guide-card">
      <h3>3. Caping &amp; Detail Blades</h3>
      <p>
        Compact blades under 3.25 inches with ultra-fine, needle-like tips. Designed specifically for precision work around the skull, eyes, antlers, and muzzle to preserve clean trophy taxidermy hides.
      </p>
    </div>
    <div class="mso-guide-card">
      <h3>4. Full-Tang Bushcraft &amp; Camp</h3>
      <p>
        A continuous single piece of solid steel running from tip through the butt of the handle. Unmatched rigidity capable of pounding through pelvic bones, notching poles, and splitting campfire kindling.
      </p>
    </div>
  </div>

  <!-- DNR NOTICE -->
  <div class="mso-notice-box">
    <h4>Michigan DNR &amp; Northwoods Field Regulations Notice</h4>
    <p>
      In Michigan, hunting knives carried openly or engaged in bona fide hunting, field dressing, and camping activities are fully legal under DNR game management guidelines. Ensure all fixed blades are sheathed securely on hip belts during ATV transit and field trekking. For detailed state carry laws, consult our <a href="https://www.michigansportsoutdoor.com/michigan-knife-laws/">2026 Michigan Knife Law Guide</a>.
    </p>
  </div>

  <!-- FAQ SECTION -->
  <div class="mso-sec-head" id="faq">
    <h2 class="mso-sec-title">Frequently Asked Questions: Hunting Knives</h2>
    <span class="mso-sec-sub">Expert cutlery advice for big game seasons</span>
  </div>

  <div class="mso-faq-list">
    <div class="mso-faq-item">
      <div class="mso-faq-q">What is the single best blade shape for field dressing whitetail deer?</div>
      <div class="mso-faq-a">A 3.5 to 4-inch <strong>drop point blade</strong> is universally recommended by master guides. Its continuous sweeping belly separates hide cleanly from muscle fascia, while the lowered point prevents piercing entrails during field gutting.</div>
    </div>
    <div class="mso-faq-item">
      <div class="mso-faq-q">Is a fixed blade or a folding knife better for big game hunting?</div>
      <div class="mso-faq-a">A <strong>fixed blade knife</strong> is far superior for heavy big game work because it has zero mechanical joints, hinges, or lock cavity slots where animal fat, blood, and hair can collect. Fixed blades clean instantly with boiling water and disinfectant.</div>
    </div>
    <div class="mso-faq-item">
      <div class="mso-faq-q">Which knife steel holds an edge best against gritty hide and cartilage?</div>
      <div class="mso-faq-a"><strong>CPM-MagnaCut</strong> and <strong>CPM-S35VN</strong> powder metallurgy steels hold their working edge 3x longer than traditional carbon steels. A single MagnaCut skinner can process 2 to 3 full whitetail deer before needing a diamond hone touch-up.</div>
    </div>
    <div class="mso-faq-item">
      <div class="mso-faq-q">How should high-carbon hunting knives (like 1095) be cared for in cold weather?</div>
      <div class="mso-faq-a">Wipe the blade dry immediately after field washing, avoid storing in damp leather sheaths, and apply a thin coating of food-grade mineral oil or beeswax rust preventative before stowing in your hunting pack.</div>
    </div>
  </div>

  <!-- SCHEMA JSON-LD -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is the single best blade shape for field dressing whitetail deer?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A 3.5 to 4-inch drop point blade is universally recommended by master guides. Its continuous sweeping belly separates hide cleanly from muscle fascia, while the lowered point prevents piercing entrails during field gutting."
        }
      },
      {
        "@type": "Question",
        "name": "Is a fixed blade or a folding knife better for big game hunting?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A fixed blade knife is far superior for heavy big game work because it has zero mechanical joints, hinges, or lock cavity slots where animal fat, blood, and hair can collect. Fixed blades clean instantly with boiling water and disinfectant."
        }
      },
      {
        "@type": "Question",
        "name": "Which knife steel holds an edge best against gritty hide and cartilage?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "CPM-MagnaCut and CPM-S35VN powder metallurgy steels hold their working edge 3x longer than traditional carbon steels. A single MagnaCut skinner can process 2 to 3 full whitetail deer before needing a diamond hone touch-up."
        }
      },
      {
        "@type": "Question",
        "name": "How should high-carbon hunting knives (like 1095) be cared for in cold weather?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Wipe the blade dry immediately after field washing, avoid storing in damp leather sheaths, and apply a thin coating of food-grade mineral oil or beeswax rust preventative before stowing in your hunting pack."
        }
      }
    ]
  }
  </script>
</div>
`;

// ─────────────────────────────────────────────────────────────
// 2. FOLDING KNIVES MASTERPIECE HTML
// ─────────────────────────────────────────────────────────────
const foldingContentHtml = `
${sharedCss}
<div class="mso-cat-hub">
  <!-- HERO BANNER -->
  <div class="mso-cat-hero">
    <div class="mso-cat-hero-badge">2026 EDC Pocket Cutlery Collection</div>
    <h1>Everyday Carry (EDC) Folding Pocket Knives</h1>
    <p>
      Discover over 15,000 factory-direct folding knives engineered for daily utility, tactical readiness, and compact pocket carry. Featuring world-class frame locks, crossbar locks, liner locks, and assisted deployment mechanisms from Spyderco, Benchmade, CIVIVI, Kershaw, and WE Knife Co.
    </p>
    <div class="mso-pill-row" style="margin-bottom: 0;">
      <a href="#featured" class="mso-pill active">Featured EDC Folders</a>
      <a href="#mechanisms" class="mso-pill">Locking Mechanisms</a>
      <a href="#steels" class="mso-pill">EDC Steel Guide</a>
      <a href="#faq" class="mso-pill">Pocket Knife FAQs</a>
      <a href="https://www.michigansportsoutdoor.com/michigan-knife-laws/" class="mso-pill">Legal Carry Guide</a>
    </div>
  </div>

  <!-- SUBCATEGORY PILLS -->
  <div class="mso-pill-row">
    <a href="https://www.michigansportsoutdoor.com/collections/knives/locking-knives/" class="mso-pill active">Locking Folders <span class="mso-pill-count">15,243</span></a>
    <a href="https://www.michigansportsoutdoor.com/collections/knives/assisted-opening/" class="mso-pill">Assisted Opening <span class="mso-pill-count">1,822</span></a>
    <a href="https://www.michigansportsoutdoor.com/collections/knives/traditional-pocket-knives/" class="mso-pill">Traditional &amp; Slipjoint <span class="mso-pill-count">1,377</span></a>
    <a href="https://www.michigansportsoutdoor.com/collections/knives/" class="mso-pill">All Pocket Knives <span class="mso-pill-count">26,700</span></a>
    <a href="https://www.michigansportsoutdoor.com/collections/knife-customization/" class="mso-pill">Mod Parts &amp; Clips <span class="mso-pill-count">606</span></a>
    <a href="https://www.michigansportsoutdoor.com/october-season/" class="mso-pill">October Season Drop <span class="mso-pill-count">Hot</span></a>
  </div>

  <!-- FEATURED FOLDING KNIVES -->
  <div class="mso-sec-head" id="featured">
    <h2 class="mso-sec-title">Top Rated Everyday Carry (EDC) Folders</h2>
    <span class="mso-sec-sub">Smooth action • Razor sharpness • Deep-carry pocket clips</span>
  </div>

  <div class="mso-prod-grid">
    <!-- Prod 1 -->
    <div class="mso-prod-card">
      <img src="https://www.michigansportsoutdoor.com/wp-content/uploads/2026/09/WE18062XA2_add_02.jpg" alt="CIVIVI Elementum EDC Liner Lock Knife" class="mso-prod-img" />
      <div class="mso-prod-tag">Best Budget EDC</div>
      <div class="mso-prod-name">CIVIVI Elementum Flipper D2 Tool Steel</div>
      <div class="mso-prod-specs">Lock: Stainless Liner Lock | Bearings: Caged Ceramic | Scales: G10</div>
      <div class="mso-prod-bottom">
        <span class="mso-prod-price">$52.50</span>
        <a href="https://www.michigansportsoutdoor.com/collections/knives/locking-knives/" class="mso-cart-btn">View Details</a>
      </div>
    </div>

    <!-- Prod 2 -->
    <div class="mso-prod-card">
      <img src="https://www.michigansportsoutdoor.com/wp-content/uploads/2026/09/DTK4518MBL_add_01.jpg" alt="Benchmade Bugout 535 Axis Lock Folding Knife" class="mso-prod-img" />
      <div class="mso-prod-tag">Ultra-Lightweight Champion</div>
      <div class="mso-prod-name">Benchmade Bugout 535 Drop Point CPM-S30V</div>
      <div class="mso-prod-specs">Lock: Ambidextrous AXIS Lock | Weight: 1.85 oz | Clip: Deep Carry</div>
      <div class="mso-prod-bottom">
        <span class="mso-prod-price">$171.00</span>
        <a href="https://www.michigansportsoutdoor.com/collections/knives/locking-knives/" class="mso-cart-btn">View Details</a>
      </div>
    </div>

    <!-- Prod 3 -->
    <div class="mso-prod-card">
      <img src="https://www.michigansportsoutdoor.com/wp-content/uploads/2026/09/SOGS40BBX_add_01.jpg" alt="Spyderco Para 3 Lightweight Compression Lock" class="mso-prod-img" />
      <div class="mso-prod-tag">Ergonomic Precision</div>
      <div class="mso-prod-name">Spyderco Para 3 Lightweight CTS-BD1N</div>
      <div class="mso-prod-specs">Lock: Patented Compression Lock | Opening: Spydie Hole | Wire Clip</div>
      <div class="mso-prod-bottom">
        <span class="mso-prod-price">$126.00</span>
        <a href="https://www.michigansportsoutdoor.com/collections/knives/locking-knives/" class="mso-cart-btn">View Details</a>
      </div>
    </div>

    <!-- Prod 4 -->
    <div class="mso-prod-card">
      <img src="https://www.michigansportsoutdoor.com/wp-content/uploads/2026/09/KKNJ394CP_add_01.jpg" alt="Kershaw Iridium Duralock Folding Knife" class="mso-prod-img" />
      <div class="mso-prod-tag">Modern Crossbar Action</div>
      <div class="mso-prod-name">Kershaw Iridium DuraLock Spear Point D2</div>
      <div class="mso-prod-specs">Lock: DuraLock Crossbar | Handle: Anodized Aluminum | KVT Bearings</div>
      <div class="mso-prod-bottom">
        <span class="mso-prod-price">$64.99</span>
        <a href="https://www.michigansportsoutdoor.com/collections/knives/locking-knives/" class="mso-cart-btn">View Details</a>
      </div>
    </div>
  </div>

  <!-- LOCKING MECHANISM ENGINEERING GUIDE -->
  <div class="mso-sec-head" id="mechanisms">
    <h2 class="mso-sec-title">Pocket Knife Locking Mechanisms Explained</h2>
    <span class="mso-sec-sub">Blade HQ standard breakdown of strength, safety &amp; one-handed operation</span>
  </div>

  <div class="mso-guide-grid">
    <div class="mso-guide-card">
      <h3>1. Crossbar / AXIS Lock</h3>
      <p>
        Utilizes a hardened steel crossbar tensioned by dual omega springs that wedges into the tang notch of the blade. 100% ambidextrous, capable of handling immense shear force, and keeps your fingers entirely out of the blade's path when closing.
      </p>
    </div>
    <div class="mso-guide-card">
      <h3>2. Titanium / Steel Frame Lock</h3>
      <p>
        The locking bar is cut directly out of the knife's structural handle scale. When gripping the knife firmly in use, your palm naturally squeezes the lockbar tighter into engagement, preventing accidental lock failure under heavy torque.
      </p>
    </div>
    <div class="mso-guide-card">
      <h3>3. Compression Lock</h3>
      <p>
        Located along the spine of the handle, a hardened leaf spring wedges horizontally between the blade tang and a sturdy stop pin. Offers supreme lockup strength, rock-solid lockup, and completely safe finger disengagement.
      </p>
    </div>
    <div class="mso-guide-card">
      <h3>4. Stainless Liner Lock</h3>
      <p>
        The most widespread folding knife mechanism. A spring-tempered internal liner springs beneath the blade tang upon opening. Allows for lightweight construction and slender, low-profile pocket carrying.
      </p>
    </div>
  </div>

  <!-- EDC BLADE STEEL METALLURGY -->
  <div class="mso-sec-head" id="steels">
    <h2 class="mso-sec-title">EDC Pocket Knife Metallurgy Comparison</h2>
    <span class="mso-sec-sub">Choosing the right steel for cardboard, utility cord, food prep &amp; daily chores</span>
  </div>

  <div class="mso-table-wrap">
    <table class="mso-table">
      <thead>
        <tr>
          <th>Blade Steel</th>
          <th>Class</th>
          <th>Typical HRC</th>
          <th>Edge Life (Cardboard)</th>
          <th>Corrosion Resistance</th>
          <th>Sharpening Ease</th>
          <th>Best EDC Application</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong class="mso-steel-badge">CPM-MagnaCut</strong></td>
          <td>Ultra-Premium Powder</td>
          <td><span class="mso-hrc-badge">62 - 64</span></td>
          <td>★★★★★</td>
          <td>★★★★★ (Marine Grade)</td>
          <td>★★★★☆</td>
          <td>Ultimate Hard-Use &amp; Sweat-Proof Pocket Carry</td>
        </tr>
        <tr>
          <td><strong class="mso-steel-badge">CPM-20CV / M390</strong></td>
          <td>Super-Steel Stainless</td>
          <td><span class="mso-hrc-badge">60 - 62</span></td>
          <td>★★★★★</td>
          <td>★★★★★</td>
          <td>★★☆☆☆ (Requires Diamond)</td>
          <td>Maximum Edge Retention For Heavy Slicing</td>
        </tr>
        <tr>
          <td><strong class="mso-steel-badge">CPM-S30V / S35VN</strong></td>
          <td>Premium Standard</td>
          <td><span class="mso-hrc-badge">59 - 61</span></td>
          <td>★★★★☆</td>
          <td>★★★★☆</td>
          <td>★★★☆☆</td>
          <td>Balanced Daily Driver for Years of Utility</td>
        </tr>
        <tr>
          <td><strong class="mso-steel-badge">14C28N Sandvik</strong></td>
          <td>High-Performance Budget</td>
          <td><span class="mso-hrc-badge">58 - 60</span></td>
          <td>★★★☆☆</td>
          <td>★★★★★</td>
          <td>★★★★★ (Easiest to Hone)</td>
          <td>Everyday Food Prep, Box Opening &amp; Utility</td>
        </tr>
        <tr>
          <td><strong class="mso-steel-badge">D2 Tool Steel</strong></td>
          <td>Semi-Stainless Workhorse</td>
          <td><span class="mso-hrc-badge">60 - 62</span></td>
          <td>★★★★☆</td>
          <td>★★★☆☆</td>
          <td>★★★☆☆</td>
          <td>Affordable High-Toughness Working Folders</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- LEGAL CARRY SUMMARY BOX -->
  <div class="mso-notice-box">
    <h4>Michigan Everyday Carry Knife Law Summary (MCL 750.227)</h4>
    <p>
      In Michigan, manual folding pocket knives, assisted opening knives, and switchblades/automatics (since Public Act 96 of 2017) are legal to own and carry openly or concealed without blade length limits, provided there is no unlawful felonious intent. Ensure compliance when visiting municipal buildings, schools, and federal property. Read our complete <a href="https://www.michigansportsoutdoor.com/michigan-knife-laws/">Michigan Legal Carry Guide</a>.
    </p>
  </div>

  <!-- FAQ SECTION -->
  <div class="mso-sec-head" id="faq">
    <h2 class="mso-sec-title">Frequently Asked Questions: Folding Knives</h2>
    <span class="mso-sec-sub">Expert answers on locks, carry laws &amp; maintenance</span>
  </div>

  <div class="mso-faq-list">
    <div class="mso-faq-item">
      <div class="mso-faq-q">What is the safest locking mechanism for everyday carry folding knives?</div>
      <div class="mso-faq-a"><strong>Crossbar locks</strong> (such as the Benchmade AXIS lock and Kershaw DuraLock) and <strong>Compression locks</strong> are widely considered the safest. Both keep your fingers completely clear of the blade rotation path during closing, eliminating accidental finger nicks.</div>
    </div>
    <div class="mso-faq-item">
      <div class="mso-faq-q">Are assisted opening folding pocket knives legal to carry in Michigan?</div>
      <div class="mso-faq-a">Yes. Assisted opening pocket knives (utilizing torsion bars like Kershaw SpeedSafe) and automatic switchblades are 100% legal to purchase, own, and carry in Michigan following the repeal of the switchblade ban under Public Act 96 of 2017.</div>
    </div>
    <div class="mso-faq-item">
      <div class="mso-faq-q">What is the best blade steel for an everyday carry folding knife?</div>
      <div class="mso-faq-a">For top-tier performance without maintenance worries, <strong>CPM-MagnaCut</strong> is the gold standard due to its corrosion immunity and tough edge holding. For budget EDC enthusiasts under $60, <strong>14C28N Sandvik</strong> and <strong>D2</strong> offer the best combination of edge retention and value.</div>
    </div>
    <div class="mso-faq-item">
      <div class="mso-faq-q">How should I clean and lubricate folding knife ball bearings?</div>
      <div class="mso-faq-a">Blow out pocket lint using compressed air, flush the pivot assembly with isopropyl alcohol, and apply a single drop of high-viscosity synthetic knife pivot oil (such as KPL - Knife Pivot Lube) to the detent ball and caged bearings.</div>
    </div>
  </div>

  <!-- SCHEMA JSON-LD -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is the safest locking mechanism for everyday carry folding knives?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Crossbar locks (such as the Benchmade AXIS lock and Kershaw DuraLock) and Compression locks are widely considered the safest. Both keep your fingers completely clear of the blade rotation path during closing, eliminating accidental finger nicks."
        }
      },
      {
        "@type": "Question",
        "name": "Are assisted opening folding pocket knives legal to carry in Michigan?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. Assisted opening pocket knives (utilizing torsion bars like Kershaw SpeedSafe) and automatic switchblades are 100% legal to purchase, own, and carry in Michigan following the repeal of the switchblade ban under Public Act 96 of 2017."
        }
      },
      {
        "@type": "Question",
        "name": "What is the best blade steel for an everyday carry folding knife?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "For top-tier performance without maintenance worries, CPM-MagnaCut is the gold standard due to its corrosion immunity and tough edge holding. For budget EDC enthusiasts under $60, 14C28N Sandvik and D2 offer the best combination of edge retention and value."
        }
      },
      {
        "@type": "Question",
        "name": "How should I clean and lubricate folding knife ball bearings?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Blow out pocket lint using compressed air, flush the pivot assembly with isopropyl alcohol, and apply a single drop of high-viscosity synthetic knife pivot oil (such as KPL - Knife Pivot Lube) to the detent ball and caged bearings."
        }
      }
    ]
  }
  </script>
</div>
`;

// Helper: deploy or update a WordPress Page
async function deployPage(slug, title, content) {
  console.log(`[deployPage] Checking if page /${slug}/ exists...`);
  const checkRes = await fetch(`${baseUrl}/wp-json/wp/v2/pages?slug=${slug}`, { headers });
  if (!checkRes.ok) {
    throw new Error(`Failed to query page /${slug}/: ${checkRes.status} ${await checkRes.text()}`);
  }
  const pages = await checkRes.json();

  if (pages.length > 0) {
    const pageId = pages[0].id;
    console.log(`[deployPage] Found existing page #${pageId} for /${slug}/. Updating...`);
    const updateRes = await fetch(`${baseUrl}/wp-json/wp/v2/pages/${pageId}`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        title,
        status: 'publish',
        content,
        meta: { _elementor_edit_mode: '' }
      })
    });
    if (!updateRes.ok) {
      throw new Error(`Failed to update page #${pageId}: ${updateRes.status} ${await updateRes.text()}`);
    }
    const updated = await updateRes.json();
    console.log(`✅ Page #${pageId} updated successfully: ${updated.link}`);
    return updated;
  } else {
    console.log(`[deployPage] Page /${slug}/ does not exist. Creating new published page...`);
    const createRes = await fetch(`${baseUrl}/wp-json/wp/v2/pages`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        title,
        slug,
        status: 'publish',
        content,
        meta: { _elementor_edit_mode: '' }
      })
    });
    if (!createRes.ok) {
      throw new Error(`Failed to create page /${slug}/: ${createRes.status} ${await createRes.text()}`);
    }
    const created = await createRes.json();
    console.log(`✅ Page created successfully: ${created.link} (ID: ${created.id})`);
    return created;
  }
}

// Helper: update WooCommerce category description
async function updateCategory(catId, description) {
  console.log(`[updateCategory] Updating WooCommerce Category #${catId}...`);
  const res = await fetch(`${baseUrl}/wp-json/wp/v2/product_cat/${catId}`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ description })
  });
  if (!res.ok) {
    throw new Error(`Failed to update product_cat #${catId}: ${res.status} ${await res.text()}`);
  }
  const data = await res.json();
  console.log(`✅ Category #${catId} (${data.slug}) updated successfully! Desc length: ${data.description.length}`);
  return data;
}

async function main() {
  console.log('🚀 Starting Blade HQ Category Hub Modernization Deployment...\n');

  // 1. Deploy Standalone Landing Pages
  console.log('--- Step 1: Deploying Standalone Hub Pages ---');
  await deployPage(
    'hunting-knives',
    'Hunting Knives | American Big Game & Field Dressing Cutlery (2026)',
    huntingContentHtml
  );

  await deployPage(
    'folding-knives',
    'Everyday Carry (EDC) Folding Pocket Knives | 2026 Collection',
    foldingContentHtml
  );

  // 2. Modernize WooCommerce Product Categories
  console.log('\n--- Step 2: Modernizing WooCommerce Category Archives ---');
  // Category 1147: Hunting, Shooting & Archery Gear
  await updateCategory(1147, huntingContentHtml);

  // Category 1206: Hunting Knife Sets
  await updateCategory(1206, huntingContentHtml);

  // Category 1153: Locking Pocket Knives (EDC & Tactical)
  await updateCategory(1153, foldingContentHtml);

  // Category 1152: Pocket Knives & Fixed Blades for Sale
  await updateCategory(1152, foldingContentHtml);

  console.log('\n🎉 ALL CATEGORY HUBS & STANDALONE PAGES SUCCESSFULLY MODERNIZED TO BLADE HQ STANDARDS!');
}

main().catch(err => {
  console.error('Fatal deployment error:', err);
  process.exit(1);
});
