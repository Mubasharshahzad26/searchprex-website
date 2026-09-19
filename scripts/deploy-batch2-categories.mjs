/**
 * Batch 2 Category Hub Modernization (Blade HQ Standards)
 * Target Categories:
 * 1. Category #1160: Assisted Opening Pocket Knives (1,822 Products)
 * 2. Category #1162: Traditional Pocket Knives & Slipjoints (1,377 Products)
 * 3. Category #1203: Kitchen Cutlery & Chef Knives (1,201 Products)
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

/* Spec Table */
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

/* FAQ List */
.mso-faq-list { margin-bottom: 36px; }
.mso-faq-item { background: #ffffff; border: 1px solid #e2e8f0; border-radius: 6px; margin-bottom: 10px; padding: 16px 20px; }
.mso-faq-q { font-size: 15px; font-weight: 800; color: #0f172a; margin: 0 0 8px 0; }
.mso-faq-a { font-size: 13.5px; color: #475569; margin: 0; line-height: 1.6; }
</style>
`;

// ─────────────────────────────────────────────────────────────
// 1. ASSISTED OPENING KNIVES (ID: 1160, 1,822 Products)
// ─────────────────────────────────────────────────────────────
const assistedContentHtml = `
${sharedCss}
<div class="mso-cat-hub">
  <div class="mso-cat-hero">
    <div class="mso-cat-hero-badge">2026 Rapid-Deploy Spring Assist Collection</div>
    <h1>Assisted Opening Pocket Knives &amp; Spring-Action Folders</h1>
    <p>
      Experience lightning-fast one-handed deployment with over 1,800 authentic assisted opening pocket knives. Featuring patented torsion bars and coil assists including Kershaw SpeedSafe®, SOG S.A.T., Benchmade Nitrous, and Gerber F.A.S.T. engineered for effortless everyday utility.
    </p>
    <div class="mso-pill-row" style="margin-bottom: 0;">
      <a href="#featured" class="mso-pill active">Top Assisted Models</a>
      <a href="#mechanisms" class="mso-pill">Assisted vs Automatic</a>
      <a href="#steels" class="mso-pill">Blade Steels</a>
      <a href="#faq" class="mso-pill">Legal &amp; FAQs</a>
    </div>
  </div>

  <div class="mso-pill-row">
    <a href="https://www.michigansportsoutdoor.com/collections/knives/assisted-opening/" class="mso-pill active">All Assisted Folders <span class="mso-pill-count">1,822</span></a>
    <a href="https://www.michigansportsoutdoor.com/collections/knives/locking-knives/" class="mso-pill">Manual Locking Folders <span class="mso-pill-count">15,243</span></a>
    <a href="https://www.michigansportsoutdoor.com/collections/knives/traditional-pocket-knives/" class="mso-pill">Traditional Slipjoints <span class="mso-pill-count">1,377</span></a>
    <a href="https://www.michigansportsoutdoor.com/collections/knives/" class="mso-pill">Full Knife Vault <span class="mso-pill-count">26,700</span></a>
    <a href="https://www.michigansportsoutdoor.com/october-season/" class="mso-pill">October Season Drop <span class="mso-pill-count">Hot</span></a>
  </div>

  <div class="mso-sec-head" id="featured">
    <h2 class="mso-sec-title">Proven Assisted Opening Pocket Folders</h2>
    <span class="mso-sec-sub">Fast action • Rock-solid lockup • Deep-carry everyday utility</span>
  </div>

  <div class="mso-prod-grid">
    <div class="mso-prod-card">
      <img src="https://www.michigansportsoutdoor.com/wp-content/uploads/2026/09/DTK4518MBL_add_01.jpg" alt="Kershaw Blur SpeedSafe Knife" class="mso-prod-img" />
      <div class="mso-prod-tag">Legendary Ken Onion Design</div>
      <div class="mso-prod-name">Kershaw Blur SpeedSafe Assisted Folder 14C28N</div>
      <div class="mso-prod-specs">Steel: Sandvik 14C28N | Handle: 6061-T6 Trac-Tec | Lock: Inset Liner</div>
      <div class="mso-prod-bottom">
        <span class="mso-prod-price">$79.99</span>
        <a href="https://www.michigansportsoutdoor.com/collections/knives/assisted-opening/" class="mso-cart-btn">View Details</a>
      </div>
    </div>

    <div class="mso-prod-card">
      <img src="https://www.michigansportsoutdoor.com/wp-content/uploads/2026/09/WE18062XA2_add_02.jpg" alt="Kershaw Leek SpeedSafe Knife" class="mso-prod-img" />
      <div class="mso-prod-tag">Slim EDC Master</div>
      <div class="mso-prod-name">Kershaw Leek Frame Lock SpeedSafe Flipper</div>
      <div class="mso-prod-specs">Steel: Sandvik 14C28N Razor Wharncliffe | Tip-Safety Lock</div>
      <div class="mso-prod-bottom">
        <span class="mso-prod-price">$59.99</span>
        <a href="https://www.michigansportsoutdoor.com/collections/knives/assisted-opening/" class="mso-cart-btn">View Details</a>
      </div>
    </div>

    <div class="mso-prod-card">
      <img src="https://www.michigansportsoutdoor.com/wp-content/uploads/2026/09/SOG18300643_add_01.jpg" alt="SOG Flash AT-XR Assisted Knife" class="mso-prod-img" />
      <div class="mso-prod-tag">Cryo D2 Tactical</div>
      <div class="mso-prod-name">SOG Flash AT-XR Rapid Assisted Flipper D2</div>
      <div class="mso-prod-specs">Steel: Cryo D2 | Lock: AT-XR Lock (1500 lbs force) | Spine Safety</div>
      <div class="mso-prod-bottom">
        <span class="mso-prod-price">$74.95</span>
        <a href="https://www.michigansportsoutdoor.com/collections/knives/assisted-opening/" class="mso-cart-btn">View Details</a>
      </div>
    </div>

    <div class="mso-prod-card">
      <img src="https://www.michigansportsoutdoor.com/wp-content/uploads/2026/09/KKNJ394CP_add_01.jpg" alt="Kershaw Cryo Assisted Knife" class="mso-prod-img" />
      <div class="mso-prod-tag">Hinderer Tactical Ergonomics</div>
      <div class="mso-prod-name">Kershaw Cryo BlackWash Assisted Frame Lock</div>
      <div class="mso-prod-specs">Design: Rick Hinderer | Steel: 8Cr13MoV | Lockbar Stabilizer</div>
      <div class="mso-prod-bottom">
        <span class="mso-prod-price">$44.99</span>
        <a href="https://www.michigansportsoutdoor.com/collections/knives/assisted-opening/" class="mso-cart-btn">View Details</a>
      </div>
    </div>
  </div>

  <div class="mso-sec-head" id="mechanisms">
    <h2 class="mso-sec-title">Assisted Opening vs. Automatic Switchblades</h2>
    <span class="mso-sec-sub">Mechanical differentiation &amp; legal engineering breakdown</span>
  </div>

  <div class="mso-table-wrap">
    <table class="mso-table">
      <thead>
        <tr>
          <th>Attribute</th>
          <th>Assisted Opening Folders</th>
          <th>Automatic Switchblades</th>
          <th>Manual Folding Knives</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Deployment Trigger</strong></td>
          <td>Manual pressure on thumb stud or flipper tab to overcome internal bias</td>
          <td>Push button, slider switch, or handle lever with zero blade contact</td>
          <td>Continuous manual finger rotation from closed to open</td>
        </tr>
        <tr>
          <td><strong>Spring Mechanism</strong></td>
          <td>Internal torsion bar takes over after user moves blade 20-30 degrees</td>
          <td>Full continuous compression spring held back by a mechanical sear</td>
          <td>No spring assist; relies strictly on pivot ball bearings or bronze washers</td>
        </tr>
        <tr>
          <td><strong>Safety Latches</strong></td>
          <td>Tip-lock sliders and internal detent bias prevent pocket opening</td>
          <td>Secondary slide locks prevent accidental button depression</td>
          <td>Standard ball detent retention in handle liner</td>
        </tr>
        <tr>
          <td><strong>Michigan Legality (2026)</strong></td>
          <td>100% Legal to own and carry openly or concealed (MCL 750.227)</td>
          <td>100% Legal following PA 96 of 2017 switchblade repeal</td>
          <td>100% Legal with zero blade length carry restriction</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="mso-notice-box">
    <h4>Michigan Legal Carry &amp; Torsion Assist Assurance</h4>
    <p>
      Under Michigan law, assisted opening knives are categorized as standard folding cutlery because the user must physically initiate blade travel before the internal torsion bar engages. Furthermore, automatic knives are also fully lawful to own and carry in Michigan following Public Act 96 of 2017. For comprehensive guidelines, visit our <a href="https://www.michigansportsoutdoor.com/michigan-knife-laws/">2026 Michigan Knife Carry Directory</a>.
    </p>
  </div>

  <div class="mso-sec-head" id="faq">
    <h2 class="mso-sec-title">Frequently Asked Questions: Assisted Folders</h2>
    <span class="mso-sec-sub">Maintenance, safety, and operation guide</span>
  </div>

  <div class="mso-faq-list">
    <div class="mso-faq-item">
      <div class="mso-faq-q">What makes an assisted opening knife different from a regular switchblade?</div>
      <div class="mso-faq-a">An assisted knife requires you to manually start opening the blade by pushing the thumb stud or flipper tab past a resistance detent (typically 20-30 degrees) before the spring takes over. An automatic switchblade deploys strictly via a button on the handle without touching the blade.</div>
    </div>
    <div class="mso-faq-item">
      <div class="mso-faq-q">Can an assisted opening pocket knife deploy accidentally in my pocket?</div>
      <div class="mso-faq-a">No, modern assisted knives have a built-in closed-position detent bias that actively pulls the blade shut when closed. Many models, such as the Kershaw Leek, also include a manual slide safety lock that blocks the blade tip from extending.</div>
    </div>
    <div class="mso-faq-item">
      <div class="mso-faq-q">How do I clean and maintain a Kershaw SpeedSafe torsion bar?</div>
      <div class="mso-faq-a">Periodically flush pocket grit out of the pivot with compressed air, clean with isopropyl alcohol, and apply a small drop of synthetic knife lubricant to the pivot bearings. The internal torsion bar cavity is factory-packed with molybdenum grease and rarely requires maintenance.</div>
    </div>
  </div>

  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What makes an assisted opening knife different from a regular switchblade?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "An assisted knife requires you to manually start opening the blade by pushing the thumb stud or flipper tab past a resistance detent before the spring takes over. An automatic switchblade deploys strictly via a button on the handle without touching the blade."
        }
      },
      {
        "@type": "Question",
        "name": "Can an assisted opening pocket knife deploy accidentally in my pocket?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No, modern assisted knives have a built-in closed-position detent bias that actively pulls the blade shut when closed, and many models feature secondary slide safety locks."
        }
      },
      {
        "@type": "Question",
        "name": "How do I clean and maintain a Kershaw SpeedSafe torsion bar?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Periodically flush pocket grit out of the pivot with compressed air, clean with isopropyl alcohol, and apply a small drop of synthetic knife lubricant to the pivot bearings."
        }
      }
    ]
  }
  </script>
</div>
`;

// ─────────────────────────────────────────────────────────────
// 2. TRADITIONAL KNIVES & SLIPJOINTS (ID: 1162, 1,377 Products)
// ─────────────────────────────────────────────────────────────
const traditionalContentHtml = `
${sharedCss}
<div class="mso-cat-hub">
  <div class="mso-cat-hero">
    <div class="mso-cat-hero-badge">American Cutlery Heritage &amp; Slipjoint Collection</div>
    <h1>Traditional Pocket Knives, Slipjoints &amp; Classic Multi-Blades</h1>
    <p>
      Celebrate over a century of American craftsmanship with 1,370+ classic slipjoint pocket knives, multi-blade stockmans, trappers, sodbusters, and barlows. Masterfully built with jigged bone, genuine stag antler, polished brass bolsters, and razor carbon steel from Case, Boker Solingen, and Buck.
    </p>
    <div class="mso-pill-row" style="margin-bottom: 0;">
      <a href="#featured" class="mso-pill active">Classic Heirlooms</a>
      <a href="#patterns" class="mso-pill">Traditional Patterns</a>
      <a href="#materials" class="mso-pill">Bone &amp; Stag Scales</a>
      <a href="#faq" class="mso-pill">Slipjoint FAQs</a>
    </div>
  </div>

  <div class="mso-pill-row">
    <a href="https://www.michigansportsoutdoor.com/collections/knives/traditional-pocket-knives/" class="mso-pill active">All Traditional Slipjoints <span class="mso-pill-count">1,377</span></a>
    <a href="https://www.michigansportsoutdoor.com/collections/knives/locking-knives/" class="mso-pill">Modern Locking Knives <span class="mso-pill-count">15,243</span></a>
    <a href="https://www.michigansportsoutdoor.com/collections/knives/assisted-opening/" class="mso-pill">Assisted Opening <span class="mso-pill-count">1,822</span></a>
    <a href="https://www.michigansportsoutdoor.com/collections/sharpeners/" class="mso-pill">Honing Stones &amp; Strops <span class="mso-pill-count">1,046</span></a>
    <a href="https://www.michigansportsoutdoor.com/collections/knives/" class="mso-pill">Full Knife Vault <span class="mso-pill-count">26,700</span></a>
  </div>

  <div class="mso-sec-head" id="featured">
    <h2 class="mso-sec-title">Iconic American Traditional Pocket Folders</h2>
    <span class="mso-sec-sub">Hand-assembled • Polished nickel silver bolsters • Crisp walk-and-talk</span>
  </div>

  <div class="mso-prod-grid">
    <div class="mso-prod-card">
      <img src="https://www.michigansportsoutdoor.com/wp-content/uploads/2026/09/J1954LBN_add_01.jpg" alt="Case Amber Bone Medium Stockman" class="mso-prod-img" />
      <div class="mso-prod-tag">American 3-Blade Classic</div>
      <div class="mso-prod-name">Case Amber Bone Medium Stockman Pocket Knife</div>
      <div class="mso-prod-specs">Blades: Clip, Sheepfoot &amp; Spey | Steel: Tru-Sharp™ | Handle: Peach Seed Jigged Bone</div>
      <div class="mso-prod-bottom">
        <span class="mso-prod-price">$64.99</span>
        <a href="https://www.michigansportsoutdoor.com/collections/knives/traditional-pocket-knives/" class="mso-cart-btn">View Details</a>
      </div>
    </div>

    <div class="mso-prod-card">
      <img src="https://www.michigansportsoutdoor.com/wp-content/uploads/2026/09/VOSA1619_add_01.jpg" alt="Buck 110 Slim Select Traditional Lockback" class="mso-prod-img" />
      <div class="mso-prod-tag">Heritage Reimagined</div>
      <div class="mso-prod-name">Buck 110 Slim Select Traditional Lockback Clip Point</div>
      <div class="mso-prod-specs">Steel: 420HC Bos Heat Treat | Lock: Heavy Backlock | Reversible Clip</div>
      <div class="mso-prod-bottom">
        <span class="mso-prod-price">$34.99</span>
        <a href="https://www.michigansportsoutdoor.com/collections/knives/traditional-pocket-knives/" class="mso-cart-btn">View Details</a>
      </div>
    </div>

    <div class="mso-prod-card">
      <img src="https://www.michigansportsoutdoor.com/wp-content/uploads/2026/09/J1954LMGN_add_01.jpg" alt="Case Trapper Jigged Bone Knife" class="mso-prod-img" />
      <div class="mso-prod-tag">Frontier Whitetail Trapper</div>
      <div class="mso-prod-name">Case Classic Trapper 2-Blade Clip &amp; Spey</div>
      <div class="mso-prod-specs">Blades: Long Clip &amp; Blunt Spey | Steel: Chrome Vanadium / Tru-Sharp</div>
      <div class="mso-prod-bottom">
        <span class="mso-prod-price">$69.99</span>
        <a href="https://www.michigansportsoutdoor.com/collections/knives/traditional-pocket-knives/" class="mso-cart-btn">View Details</a>
      </div>
    </div>

    <div class="mso-prod-card">
      <img src="https://www.michigansportsoutdoor.com/wp-content/uploads/2026/09/WE18062XA1_add_01.jpg" alt="Boker Traditional Barlow Oak Wood" class="mso-prod-img" />
      <div class="mso-prod-tag">Solingen Germany Barlow</div>
      <div class="mso-prod-name">Boker Barlow Traditional Solingen Pocket Folder</div>
      <div class="mso-prod-specs">Handle: Historic Castle Oak Wood | Steel: O1 High Carbon | Bolster: Brass</div>
      <div class="mso-prod-bottom">
        <span class="mso-prod-price">$89.95</span>
        <a href="https://www.michigansportsoutdoor.com/collections/knives/traditional-pocket-knives/" class="mso-cart-btn">View Details</a>
      </div>
    </div>
  </div>

  <div class="mso-sec-head" id="patterns">
    <h2 class="mso-sec-title">Traditional Pocket Knife Patterns: A Field Collector's Guide</h2>
    <span class="mso-sec-sub">Distinct blade configurations honed over 150 years of frontier life</span>
  </div>

  <div class="mso-guide-grid">
    <div class="mso-guide-card">
      <h3>1. The Trapper Pattern</h3>
      <p>
        Features two equal-length blades pivoted at the same end: a slender clip point blade for general utility and detailed carving, alongside a dull-point spey blade designed by frontier fur trappers to skin game without accidentally piercing organs.
      </p>
    </div>
    <div class="mso-guide-card">
      <h3>2. The Stockman Pattern</h3>
      <p>
        The definitive ranch and farm knife. Equipped with three distinct blades: a master clip blade for general cutting, a straight-edge sheepsfoot blade for clean utility scoring and whittling, and a spey blade for livestock chores.
      </p>
    </div>
    <div class="mso-guide-card">
      <h3>3. The Barlow Pattern</h3>
      <p>
        Recognized by its elongated, heavy metal bolster and teardrop handle profile. Originally developed in Sheffield in the 17th century and immortalized by Mark Twain, the Barlow offers immense structural reinforcement at the main blade pivot.
      </p>
    </div>
    <div class="mso-guide-card">
      <h3>4. The Sodbuster Pattern</h3>
      <p>
        A rugged, single-blade working knife with a curved, ergonomic handle and a broad skinner-style blade. Simplicity at its finest, built to withstand decades of heavy rope cutting, field work, and chores on the homestead.
      </p>
    </div>
  </div>

  <div class="mso-sec-head" id="faq">
    <h2 class="mso-sec-title">Frequently Asked Questions: Traditional Slipjoints</h2>
    <span class="mso-sec-sub">Classic knife anatomy and global legal carry</span>
  </div>

  <div class="mso-faq-list">
    <div class="mso-faq-item">
      <div class="mso-faq-q">What is a slipjoint knife and how does it keep the blade open without a lock?</div>
      <div class="mso-faq-a">A slipjoint knife does not mechanically lock open. Instead, a tempered backspring exerts continuous downward pressure on the flat tang of the blade. When cutting forward, the resistance holds the blade firmly open, but deliberate pressure on the spine allows it to fold closed safely.</div>
    </div>
    <div class="mso-faq-item">
      <div class="mso-faq-q">What does 'walk and talk' mean in traditional pocket knives?</div>
      <div class="mso-faq-a">'Walk' describes the smooth, clean gliding feel of the blade tang moving against the backspring as it opens. 'Talk' is the crisp, audible, reassuring mechanical snap sound the knife makes when it locks into the half-stop and fully opened positions.</div>
    </div>
    <div class="mso-faq-item">
      <div class="mso-faq-q">Are slipjoint pocket knives legal to carry in jurisdictions with strict locking knife laws?</div>
      <div class="mso-faq-a">Yes. Because slipjoint pocket knives do not have mechanical locks and typically require two hands to open, they are globally recognized as the most travel-compliant knives, legal in the UK, Europe, and heavily restricted municipalities where locking blades are prohibited.</div>
    </div>
  </div>

  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is a slipjoint knife and how does it keep the blade open without a lock?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A slipjoint knife does not mechanically lock. A tempered backspring exerts continuous pressure against the blade tang to keep it open during forward cutting, while allowing safe manual closure."
        }
      },
      {
        "@type": "Question",
        "name": "What does 'walk and talk' mean in traditional pocket knives?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Walk refers to the smooth tactile motion of the blade along the backspring, while talk is the crisp, audible snap sound as the blade reaches half-stop and fully open."
        }
      },
      {
        "@type": "Question",
        "name": "Are slipjoint pocket knives legal to carry in jurisdictions with strict locking knife laws?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, because slipjoints are non-locking and require two hands to open, they are compliant in the UK, Europe, and most restricted municipalities."
        }
      }
    ]
  }
  </script>
</div>
`;

// ─────────────────────────────────────────────────────────────
// 3. KITCHEN CUTLERY & CHEF KNIVES (ID: 1203, 1,201 Products)
// ─────────────────────────────────────────────────────────────
const kitchenContentHtml = `
${sharedCss}
<div class="mso-cat-hub">
  <div class="mso-cat-hero">
    <div class="mso-cat-hero-badge">2026 Master Chef &amp; Culinary Cutlery Vault</div>
    <h1>Professional Kitchen Knives, Japanese Santokus &amp; Chef Cutlery</h1>
    <p>
      Command the prep station with over 1,200 professional culinary knives, Japanese Damascus Santokus, German forged chef blades, and precision boning cutlery. Featuring world-renowned culinary craftsmanship from Shun, Victorinox, Wüsthof, and Tojiro engineered for effortless laser-thin slicing and lifelong edge durability.
    </p>
    <div class="mso-pill-row" style="margin-bottom: 0;">
      <a href="#featured" class="mso-pill active">Featured Kitchen Cutlery</a>
      <a href="#steels" class="mso-pill">German vs Japanese Steels</a>
      <a href="#profiles" class="mso-pill">Chef Knife Profiles</a>
      <a href="#faq" class="mso-pill">Care &amp; Honing FAQs</a>
    </div>
  </div>

  <div class="mso-pill-row">
    <a href="https://www.michigansportsoutdoor.com/collections/kitchen/" class="mso-pill active">All Kitchen Cutlery <span class="mso-pill-count">1,201</span></a>
    <a href="https://www.michigansportsoutdoor.com/collections/kitchen-knives/" class="mso-pill">Individual Chef Blades <span class="mso-pill-count">260</span></a>
    <a href="https://www.michigansportsoutdoor.com/collections/kitchen-sets/" class="mso-pill">Cutlery Block Sets <span class="mso-pill-count">129</span></a>
    <a href="https://www.michigansportsoutdoor.com/collections/camp-cooking/" class="mso-pill">Backcountry Camp Cooking <span class="mso-pill-count">337</span></a>
    <a href="https://www.michigansportsoutdoor.com/collections/sharpeners/" class="mso-pill">Whetstones &amp; Honing Steels <span class="mso-pill-count">1,046</span></a>
  </div>

  <div class="mso-sec-head" id="featured">
    <h2 class="mso-sec-title">Top Rated Chef Cutlery &amp; Culinary Essentials</h2>
    <span class="mso-sec-sub">Razor hair-splitting bevels • Ergonomic pinch grips • Professional culinary performance</span>
  </div>

  <div class="mso-prod-grid">
    <div class="mso-prod-card">
      <img src="https://www.michigansportsoutdoor.com/wp-content/uploads/2026/09/WE18062XA1_add_01.jpg" alt="Victorinox Fibrox Pro 8 Inch Chef Knife" class="mso-prod-img" />
      <div class="mso-prod-tag">Commercial Kitchen Legend</div>
      <div class="mso-prod-name">Victorinox Fibrox Pro 8" High-Carbon Chef Knife</div>
      <div class="mso-prod-specs">Steel: Swiss High-Carbon Stainless | Edge: 15° Laser Angle | Handle: Non-Slip Fibrox</div>
      <div class="mso-prod-bottom">
        <span class="mso-prod-price">$47.50</span>
        <a href="https://www.michigansportsoutdoor.com/collections/kitchen/" class="mso-cart-btn">View Details</a>
      </div>
    </div>

    <div class="mso-prod-card">
      <img src="https://www.michigansportsoutdoor.com/wp-content/uploads/2026/09/WE18062XA2_add_02.jpg" alt="Shun Classic 7 Inch Japanese Santoku" class="mso-prod-img" />
      <div class="mso-prod-tag">Japanese Damascus Masterpiece</div>
      <div class="mso-prod-name">Shun Classic 7" Japanese Santoku Hollow-Ground</div>
      <div class="mso-prod-specs">Steel: VG-MAX Super Steel 68-Layer Damascus | Handle: PakkaWood D-Shape</div>
      <div class="mso-prod-bottom">
        <span class="mso-prod-price">$169.95</span>
        <a href="https://www.michigansportsoutdoor.com/collections/kitchen/" class="mso-cart-btn">View Details</a>
      </div>
    </div>

    <div class="mso-prod-card">
      <img src="https://www.michigansportsoutdoor.com/wp-content/uploads/2026/09/VOSA2628_add_01.jpg" alt="Wusthof Classic 6 Inch Boning Trimming Knife" class="mso-prod-img" />
      <div class="mso-prod-tag">Solingen German Forged</div>
      <div class="mso-prod-name">Wüsthof Classic 6" Flexible Boning Knife</div>
      <div class="mso-prod-specs">Steel: X50CrMoV15 Forged German Steel | Full Tang Triple Riveted</div>
      <div class="mso-prod-bottom">
        <span class="mso-prod-price">$135.00</span>
        <a href="https://www.michigansportsoutdoor.com/collections/kitchen/" class="mso-cart-btn">View Details</a>
      </div>
    </div>

    <div class="mso-prod-card">
      <img src="https://www.michigansportsoutdoor.com/wp-content/uploads/2026/09/SOG18300643_add_01.jpg" alt="Tojiro DP Gyuto Japanese Chef Knife" class="mso-prod-img" />
      <div class="mso-prod-tag">Cobalt Alloy High Value</div>
      <div class="mso-prod-name">Tojiro DP 3-Layer Cobalt Alloy Gyuto 8.2"</div>
      <div class="mso-prod-specs">Core: VG-10 Core with Stainless Cladding | 50/50 Double Bevel Grind</div>
      <div class="mso-prod-bottom">
        <span class="mso-prod-price">$89.00</span>
        <a href="https://www.michigansportsoutdoor.com/collections/kitchen/" class="mso-cart-btn">View Details</a>
      </div>
    </div>
  </div>

  <div class="mso-sec-head" id="steels">
    <h2 class="mso-sec-title">German vs. Japanese Kitchen Knives: Metallurgy Showdown</h2>
    <span class="mso-sec-sub">Hardness, geometry, and edge retention differences explained</span>
  </div>

  <div class="mso-table-wrap">
    <table class="mso-table">
      <thead>
        <tr>
          <th>Metric</th>
          <th>German Solingen Cutlery (Wüsthof, Zwilling)</th>
          <th>Japanese Culinary Cutlery (Shun, Tojiro, Global)</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Primary Steel</strong></td>
          <td>X50CrMoV15 German Stainless Steel</td>
          <td>VG-10, VG-MAX, SG2 / R2 Powder Steel, White Paper</td>
        </tr>
        <tr>
          <td><strong>Rockwell Hardness (HRC)</strong></td>
          <td><span class="mso-hrc-badge">56 - 58 HRC</span> (Ductile, tough, resists chipping)</td>
          <td><span class="mso-hrc-badge">60 - 64 HRC</span> (Ultra-hard, holds hair-splitting edge)</td>
        </tr>
        <tr>
          <td><strong>Blade Edge Angle</strong></td>
          <td>18° - 20° Per side (Heavy rocking chopping angle)</td>
          <td>12° - 15° Per side (Acute scalpel angle for paper-thin slices)</td>
        </tr>
        <tr>
          <td><strong>Cutting Technique</strong></td>
          <td>Continuous rocking motion using broad belly curve</td>
          <td>Precise vertical push-cutting and push-pull slicing</td>
        </tr>
        <tr>
          <td><strong>Best Kitchen Tasks</strong></td>
          <td>Splitting squash, chopping through chicken bones, heavy utility</td>
          <td>Thinly shaving proteins, sashimi, dicing onions, precision herbs</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="mso-sec-head" id="faq">
    <h2 class="mso-sec-title">Frequently Asked Questions: Kitchen Cutlery</h2>
    <span class="mso-sec-sub">Maintenance, whetstones, and dishwasher safety</span>
  </div>

  <div class="mso-faq-list">
    <div class="mso-faq-item">
      <div class="mso-faq-q">Why should premium kitchen knives never be put in the dishwasher?</div>
      <div class="mso-faq-a">Dishwasher detergent is highly caustic and strips the polished edge. The harsh high-heat water spray bangs the fine cutting edge against other cutlery and racks, causing micro-chipping, while swelling and warping wooden or composite PakkaWood handles. Always hand-wash with mild soap and dry immediately.</div>
    </div>
    <div class="mso-faq-item">
      <div class="mso-faq-q">What is the difference between a Western Chef Knife and a Japanese Santoku?</div>
      <div class="mso-faq-a">A Western chef knife has a pointed tip and a deeply curved belly engineered for a continuous rocking chop. A Japanese Santoku (meaning 'Three Virtues': slicing, dicing, mincing) features a flatter cutting edge with a blunt sheepfoot sheep-nose tip, designed for precise downward push-cutting.</div>
    </div>
    <div class="mso-faq-item">
      <div class="mso-faq-q">What is the difference between honing a kitchen knife and sharpening it?</div>
      <div class="mso-faq-a">Honing (using a ceramic or steel rod) does not remove metal; it simply straightens and realigns the microscopic curled teeth of an existing edge between uses. Sharpening (using whetstones) actually grinds away steel to create a brand new, razor-sharp bevel edge.</div>
    </div>
  </div>

  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Why should premium kitchen knives never be put in the dishwasher?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Caustic detergent, high heat, and violent water spray cause blade micro-chipping, corrode steel, and ruin handle materials. Hand-wash and dry immediately."
        }
      },
      {
        "@type": "Question",
        "name": "What is the difference between a Western Chef Knife and a Japanese Santoku?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A Western chef knife has a curved belly for rocking cuts, while a Santoku has a flatter edge profile designed for straight downward push-cutting."
        }
      },
      {
        "@type": "Question",
        "name": "What is the difference between honing a kitchen knife and sharpening it?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Honing straightens and realigns the microscopic edge without removing steel, whereas sharpening grinds metal away to form a new apex."
        }
      }
    ]
  }
  </script>
</div>
`;

async function updateCategory(catId, description) {
  console.log(`[updateCategory] Updating Category #${catId}...`);
  const res = await fetch(`${baseUrl}/wp-json/wp/v2/product_cat/${catId}`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ description })
  });
  if (!res.ok) {
    throw new Error(`Failed to update product_cat #${catId}: ${res.status} ${await res.text()}`);
  }
  const data = await res.json();
  console.log(`✅ Category #${catId} (${data.slug}) updated successfully! Description length: ${data.description.length}`);
  return data;
}

async function main() {
  console.log('🚀 Deploying Batch 2 Blade HQ Category Hub Modernization...\n');

  // 1. Assisted Opening Pocket Knives (1,822 products)
  await updateCategory(1160, assistedContentHtml);

  // 2. Traditional Pocket Knives & Slipjoints (1,377 products)
  await updateCategory(1162, traditionalContentHtml);

  // 3. Kitchen Cutlery & Chef Knives (1,201 products)
  await updateCategory(1203, kitchenContentHtml);

  console.log('\n🎉 BATCH 2 CATEGORIES (4,400+ PRODUCTS) FULLY MODERNIZED TO BLADE HQ STANDARDS!');
}

main().catch(err => {
  console.error('Fatal error deploying batch 2:', err);
  process.exit(1);
});
