/**
 * Deploy Joker Bushcraft Knife Walnut Handle (4") - Complete SEO, AEO & GEO Optimization
 * Target: WooCommerce Product #22695 (SKU: JKRCN112)
 * URL: https://www.michigansportsoutdoor.com/product/joker-bushcraft-knife-walnut-handle/
 */

import { config } from 'dotenv';
config({ path: '.env.local' });

const baseUrl = 'https://www.michigansportsoutdoor.com';
const username = 'apiuser';
const appPassword = process.env.MSO_WP_PASS || process.env.WP_PASSWORD || 'cvxm Bi7y 6o3y r7HJ M1Wn mSMM';
const auth = Buffer.from(`${username}:${appPassword}`).toString('base64');
const headers = {
  Authorization: `Basic ${auth}`,
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36',
  'Content-Type': 'application/json'
};

const productId = 22695;

// ─────────────────────────────────────────────────────────────
// 1. STREAMLINED BUY BOX SHORT DESCRIPTION
// ─────────────────────────────────────────────────────────────
const shortDescription = `
<div style="margin:4px 0 10px 0; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <div style="display:flex; flex-wrap:wrap; gap:6px; margin-bottom:10px;">
    <span style="background:#f8fafc; color:#0f172a; font-size:11.5px; font-weight:700; padding:4px 10px; border-radius:4px; border:1px solid #e2e8f0;">Sandvik 14C28N Stainless</span>
    <span style="background:#f8fafc; color:#0f172a; font-size:11.5px; font-weight:700; padding:4px 10px; border-radius:4px; border:1px solid #e2e8f0;">Full Tang Construction</span>
    <span style="background:#f8fafc; color:#0f172a; font-size:11.5px; font-weight:700; padding:4px 10px; border-radius:4px; border:1px solid #e2e8f0;">4.0" Drop Point Blade</span>
    <span style="background:#f8fafc; color:#0f172a; font-size:11.5px; font-weight:700; padding:4px 10px; border-radius:4px; border:1px solid #e2e8f0;">Spanish Walnut Handle</span>
    <span style="background:#f8fafc; color:#0f172a; font-size:11.5px; font-weight:700; padding:4px 10px; border-radius:4px; border:1px solid #e2e8f0;">Joker &bull; Albacete, Spain</span>
  </div>
  <div class="mso-free-ship-100-banner" style="background:#f0fdf4; border:1px solid #bbf7d0; border-left:3px solid #16a34a; border-radius:4px; padding:7px 12px; margin-bottom:10px; font-size:12px; color:#15803d; line-height:1.4;">
    <strong>&#10003; Free US Shipping Over $100:</strong> Enjoy free tracked U.S. shipping on all orders of $100 or more.
  </div>
  <div style="display:flex; flex-wrap:wrap; gap:6px; margin-bottom:10px; font-size:11.5px; color:#334155;">
    <span style="background:#ffffff; border:1px solid #e2e8f0; padding:4px 8px; border-radius:4px;"><strong>100% Factory Authentic</strong></span>
    <span style="background:#ffffff; border:1px solid #e2e8f0; padding:4px 8px; border-radius:4px;"><strong>30-Day Hassle-Free Returns</strong></span>
    <span style="background:#ffffff; border:1px solid #e2e8f0; padding:4px 8px; border-radius:4px;"><strong>Heavy Leather Sheath Included</strong></span>
  </div>
</div>`.trim();

// ─────────────────────────────────────────────────────────────
// 2. COMPREHENSIVE BLADE HQ FULL DESCRIPTION
// ─────────────────────────────────────────────────────────────
const fullDescription = `
<link rel="preload" as="image" href="https://www.michigansportsoutdoor.com/wp-content/uploads/2025/10/JKRCN112.jpg" fetchpriority="high" />

<nav aria-label="Breadcrumb" style="margin:0 0 20px 0; font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size:12px; background:#f8fafc; border:1px solid #e2e8f0; border-radius:8px; padding:9px 14px; box-shadow:0 1px 2px rgba(0,0,0,0.02);">
  <ol itemscope itemtype="https://schema.org/BreadcrumbList" style="list-style:none; padding:0; margin:0; display:flex; flex-wrap:wrap; align-items:center; gap:6px; color:#64748b;">
    <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem" style="display:inline-flex; align-items:center;">
      <a itemprop="item" href="https://www.michigansportsoutdoor.com/" style="color:#0284c7; text-decoration:none; font-weight:700;">
        <span itemprop="name">Home</span>
      </a>
      <meta itemprop="position" content="1" />
    </li>
    <li style="color:#94a3b8; font-size:11px;">/</li>
    <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem" style="display:inline-flex; align-items:center;">
      <a itemprop="item" href="https://www.michigansportsoutdoor.com/collections/knives/" style="color:#0284c7; text-decoration:none; font-weight:700;">
        <span itemprop="name">Pocket Knives &amp; Fixed Blades for Sale</span>
      </a>
      <meta itemprop="position" content="2" />
    </li>
    <li style="color:#94a3b8; font-size:11px;">/</li>
    <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem" style="display:inline-flex; align-items:center; max-width:340px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;" aria-current="page">
      <span itemprop="name" style="color:#0f172a; font-weight:700;" title="Joker Bushcraft Knife Walnut Handle (4&quot;)">Joker Bushcraft Knife Walnut Handle (4&quot;)</span>
      <meta itemprop="position" content="3" />
    </li>
  </ol>
</nav>

<div style="display:flex; flex-wrap:wrap; align-items:center; justify-content:space-between; gap:8px; background:#ffffff; border:1px solid #e2e8f0; border-radius:8px; padding:8px 14px; margin:14px 0 20px 0; box-shadow:0 1px 3px rgba(0,0,0,0.02); box-sizing:border-box; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <a href="https://share.google/acI6CfNOs68e2r7eO" target="_blank" rel="noopener noreferrer" style="display:inline-flex; align-items:center; gap:6px; text-decoration:none; color:#1e293b; font-size:11px; font-weight:800; padding:3px 8px; border-right:1px solid #f1f5f9;">
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/></svg>
    <span style="font-size:11px; font-weight:900; color:#0f172a; text-transform:uppercase; letter-spacing:0.3px;">Google Verified</span>
    <span style="background:#fef3c7; color:#b45309; border:1px solid #fde68a; font-size:9.5px; font-weight:900; padding:1px 5px; border-radius:3px;">4.8 STAR</span>
  </a>
  <a href="https://www.bbb.org/us/mi/michigan-sports-outdoor" target="_blank" rel="noopener noreferrer" style="display:inline-flex; align-items:center; gap:6px; text-decoration:none; color:#1e293b; font-size:11px; font-weight:800; padding:3px 8px; border-right:1px solid #f1f5f9;">
    <span style="background:#005A9C; color:#ffffff; font-size:9px; font-weight:900; padding:1px 4px; border-radius:3px;">BBB</span>
    <span style="font-size:11px; font-weight:900; color:#0f172a; text-transform:uppercase; letter-spacing:0.3px;">Accredited</span>
    <span style="background:#dbeafe; color:#1d4ed8; border:1px solid #bfdbfe; font-size:9.5px; font-weight:900; padding:1px 5px; border-radius:3px;">BUSINESS</span>
  </a>
  <a href="https://www.trustpilot.com/review/michigansportsoutdoor.com" target="_blank" rel="noopener noreferrer" style="display:inline-flex; align-items:center; gap:6px; text-decoration:none; color:#1e293b; font-size:11px; font-weight:800; padding:3px 8px; border-right:1px solid #f1f5f9;">
    <span style="background:#00b67a; color:#ffffff; font-size:9px; font-weight:900; padding:1px 4px; border-radius:3px;">&#9733;</span>
    <span style="font-size:11px; font-weight:900; color:#0f172a; text-transform:uppercase; letter-spacing:0.3px;">Trustpilot</span>
    <span style="background:#dcfce7; color:#15803d; border:1px solid #bbf7d0; font-size:9.5px; font-weight:900; padding:1px 5px; border-radius:3px;">VERIFIED</span>
  </a>
  <a href="https://www.bladeforums.com" target="_blank" rel="noopener noreferrer" style="display:inline-flex; align-items:center; gap:6px; text-decoration:none; color:#1e293b; font-size:11px; font-weight:800; padding:3px 8px; border-right:1px solid #f1f5f9;">
    <span style="background:#1e293b; color:#f5a623; font-size:9px; font-weight:900; padding:1px 4px; border-radius:3px;">BF</span>
    <span style="font-size:11px; font-weight:900; color:#0f172a; text-transform:uppercase; letter-spacing:0.3px;">BladeForums</span>
    <span style="background:#f1f5f9; color:#334155; border:1px solid #e2e8f0; font-size:9.5px; font-weight:900; padding:1px 5px; border-radius:3px;">MEMBER</span>
  </a>
  <a href="https://www.michigan-sportsman.com/members/michigan-sports-outdoors.179732/" target="_blank" rel="noopener noreferrer" style="display:inline-flex; align-items:center; gap:6px; text-decoration:none; color:#1e293b; font-size:11px; font-weight:800; padding:3px 8px;">
    <span style="background:#384c3c; color:#f5a623; font-size:9px; font-weight:900; padding:1px 4px; border-radius:3px;">MI</span>
    <span style="font-size:11px; font-weight:900; color:#0f172a; text-transform:uppercase; letter-spacing:0.3px;">MichiganSportsman</span>
    <span style="background:#ecfdf5; color:#065f46; border:1px solid #a7f3d0; font-size:9.5px; font-weight:900; padding:1px 5px; border-radius:3px;">PARTNER</span>
  </a>
</div>

<!-- SPLIT CONTAINER: Classic Blade HQ Layout -->
<div style="display:flex; flex-wrap:wrap; gap:32px; margin:28px 0 36px 0; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  
  <!-- LEFT COLUMN: Glance -> Narrative -> FAQs -->
  <div style="flex:1 1 460px; min-width:320px; box-sizing:border-box;">
    
    <h2 style="font-size:18px; font-weight:800; color:#0f172a; margin:0 0 12px 0; border-bottom:2px solid #e2e8f0; padding-bottom:6px;">
      At a Glance: Key Field Features
    </h2>
    <ul style="list-style-type:disc; padding-left:20px; margin:0 0 24px 0; font-size:13.5px; color:#334155; line-height:1.6;">
      <li style="margin-bottom:8px;"><strong>Blade Metallurgy:</strong> Precision cryo-treated Swedish Sandvik 14C28N stainless steel (58-60 HRC) providing ultra-fine apex sharpness, extreme edge stability, and total rust immunity in damp backcountry terrain.</li>
      <li style="margin-bottom:8px;"><strong>Tang Construction:</strong> Continuous full-tang integral steel forging running end-to-end, engineered to absorb heavy baton impacts during firewood processing and shelter construction.</li>
      <li style="margin-bottom:8px;"><strong>Grip &amp; Chassis:</strong> Ergonomically sculpted Spanish Walnut hardwood scales secured by heavy-duty solid brass pins and an integrated lanyard tube for hot-spot-free carving.</li>
      <li style="margin-bottom:8px;"><strong>Retention System:</strong> Hand-stitched premium brown Spanish cowhide leather belt sheath with secure snap keeper and deep vertical belt loop.</li>
      <li style="margin-bottom:8px;"><strong>Quality Guarantee:</strong> 100% authentic Joker Albacete craftsmanship backed by factory lifetime warranty and same-day Michigan fulfillment.</li>
    </ul>

    <h2 style="font-size:18px; font-weight:800; color:#0f172a; margin:24px 0 12px 0; border-bottom:2px solid #e2e8f0; padding-bottom:6px;">
      Joker Bushcraft Knife &ndash; Field Overview &amp; Performance
    </h2>
    <div style="font-size:13.5px; color:#475569; line-height:1.65; margin:0 0 20px 0;">
      
      <!-- AEO QUICK VERDICT -->
      <div style="background:#f0fdf4; border-left:4px solid #16a34a; border-radius:0 8px 8px 0; padding:14px 18px; margin-bottom:20px; font-size:13.5px; color:#14532d; line-height:1.6;">
        <strong>Quick Performance Verdict:</strong> The <strong>Joker Bushcraft Knife Walnut Handle (4")</strong> (SKU: JKRCN112) is an elite, handcrafted European fixed blade engineered for boreal woodcraft, wilderness survival, and all-weather field duty. Pairing high-nitrogen Swedish Sandvik 14C28N stainless steel with an indestructible full-tang backbone and naturally warm Spanish walnut ergonomics, it delivers surgical slicing and robust wood-splitting power without the corrosion vulnerability of traditional 1095 carbon steels.
      </div>

      <h3 style="font-size:15px; font-weight:700; color:#0f172a; margin:18px 0 8px 0;">
        Swedish Sandvik 14C28N Metallurgy &amp; Edge Geometry
      </h3>
      <p style="margin:0 0 14px 0;">
        At the core of the Joker Bushcraft Knife is Swedish <strong>Sandvik 14C28N stainless steel</strong>, hardened and cryogenically tempered to a balanced <strong>58&ndash;60 HRC</strong>. Developed jointly by Sandvik Materials Technology and Kershaw Knives, this alloy features 0.62% carbon, 14.0% chromium, and a strategic 0.11% nitrogen addition. The nitrogen replaces portion of the carbon to dramatically heighten pitting and crevice corrosion resistance while refining the iron-carbide micro-structure.
      </p>
      <p style="margin:0 0 14px 0;">
        Unlike classic bushcraft blades forged from 1095 carbon or O1 tool steels that develop rust spots after an hour in damp rain or marshland foliage, 14C28N can be submerged, drenched in morning dew across the <em>Michigan Upper Peninsula</em>, or washed in river water without tarnishing. The 4.0-inch drop-point blade features a versatile saber-to-flat grind with a secondary bevel, providing a rigid 3.7mm spine capable of throwing sparks from ferrocerium fire steels while retaining a razor-thin slicing apex that effortlessly hones on a field <a href="https://www.michigansportsoutdoor.com/collections/sharpeners/" style="color:#0284c7; font-weight:700; text-decoration:none;">knife sharpener or honing strop</a>.
      </p>

      <h3 style="font-size:15px; font-weight:700; color:#0f172a; margin:18px 0 8px 0;">
        Full-Tang Integrity &amp; Cold-Weather Walnut Ergonomics
      </h3>
      <p style="margin:0 0 14px 0;">
        True wilderness survival cutlery demands absolute structural rigidity. As detailed in our field breakdown on <a href="https://www.michigansportsoutdoor.com/full-tang-vs-partial-tang-knife/" style="color:#0284c7; font-weight:700; text-decoration:none;">full tang vs partial tang knife construction</a>, a continuous solid steel profile eliminates the risk of snapping at the ricasso during high-shock baton strikes. The Joker Bushcraft features an unyielding full-tang profile, allowing outdoorsmen to baton through seasoned oak, birch, and sugar maple logs to harvest dry interior heartwood for emergency fire-starting.
      </p>
      <p style="margin:0 0 14px 0;">
        The handle is clad in genuine <strong>Spanish Walnut hardwood scales</strong>, fastened with precision solid brass pins and finished with a brass-lined lanyard hole. Natural walnut is biologically suited for cold-weather hunting and bushcraft expeditions: unlike cold aluminum or slippery plastics, hardwood scales adjust to hand warmth, giving outdoorsmen confident purchase and zero hot spots during multi-hour game field dressing or wood carving sessions.
      </p>

      <h3 style="font-size:15px; font-weight:700; color:#0f172a; margin:18px 0 8px 0;">
        Spanish Artisan Heritage &amp; Hand-Stitched Leather Sheath
      </h3>
      <p style="margin:0 0 14px 0;">
        Every Joker knife is manufactured in <strong>Albacete, Spain</strong>, an internationally renowned center of bladesmithing since the 16th century. Each knife arrives nestled in a custom-molded, heavy-duty brown top-grain leather belt sheath. Double-stitched with rot-resistant nylon thread and fitted with a heavy brass snap closure, the sheath ensures dead-silent trail carry while maintaining rapid one-handed deployment.
      </p>
      <p style="margin:0 0 14px 0;">
        Whether you are packing an expedition rig for the <a href="https://www.michigansportsoutdoor.com/collections/camping-and-survival/" style="color:#0284c7; font-weight:700; text-decoration:none;">camping and survival trail</a>, skinning whitetail deer according to <a href="https://www.michigansportsoutdoor.com/best-knife-blade-shapes-for-field-dressing-deer/" style="color:#0284c7; font-weight:700; text-decoration:none;">proven blade shape principles</a>, or ensuring compliance with <a href="https://www.michigansportsoutdoor.com/michigan-knife-laws/" style="color:#0284c7; font-weight:700; text-decoration:none;">Michigan knife carry regulations</a>, the Joker Bushcraft Knife provides peerless balance, strength, and old-world craftsmanship at an unbeatable price point.
      </p>
    </div>

    <!-- FAQS SECTION WITH SCHEMA.ORG MICRODATA (100% Google Rich Result Compliant & Zero Raw Text Leaks) -->
    <h2 style="font-size:18px; font-weight:800; color:#0f172a; margin:28px 0 12px 0; border-bottom:2px solid #e2e8f0; padding-bottom:6px;">
      Frequently Asked Questions: Joker Bushcraft Knife
    </h2>
    <div itemscope itemtype="https://schema.org/FAQPage" style="display:flex; flex-direction:column; gap:10px; margin-bottom:20px;">
      <div itemscope itemprop="mainEntity" itemtype="https://schema.org/Question" style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:6px; padding:12px 16px; margin-bottom:10px;">
        <h3 itemprop="name" style="font-size:14px; font-weight:700; color:#0f172a; margin:0 0 4px 0; line-height:1.4;">What makes Sandvik 14C28N steel ideal for bushcraft and field dressing?</h3>
        <div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
          <p itemprop="text" style="font-size:12.5px; color:#475569; margin:0; line-height:1.5;">Sandvik 14C28N is a high-nitrogen Swedish stainless steel developed specifically for heavy cutting tools. The 14% chromium combined with nitrogen provides extreme corrosion resistance in wet, snowy, or marshland environments where standard 1095 carbon steels quickly rust. Furthermore, its ultra-clean carbide structure takes a razor-sharp apex that is easy to field hone with ceramic rods or diamond stones.</p>
        </div>
      </div>
      <div itemscope itemprop="mainEntity" itemtype="https://schema.org/Question" style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:6px; padding:12px 16px; margin-bottom:10px;">
        <h3 itemprop="name" style="font-size:14px; font-weight:700; color:#0f172a; margin:0 0 4px 0; line-height:1.4;">Can the Joker Bushcraft Knife handle heavy batoning and wood splitting?</h3>
        <div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
          <p itemprop="text" style="font-size:12.5px; color:#475569; margin:0; line-height:1.5;">Yes. The knife features continuous full-tang construction where the solid 3.7mm-thick steel bar extends through the entirety of the handle. This eliminates structural weak points between blade and handle, allowing you to confidently baton firewood, split kindling, and carve trap notches without risk of blade failure.</p>
        </div>
      </div>
      <div itemscope itemprop="mainEntity" itemtype="https://schema.org/Question" style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:6px; padding:12px 16px; margin-bottom:10px;">
        <h3 itemprop="name" style="font-size:14px; font-weight:700; color:#0f172a; margin:0 0 4px 0; line-height:1.4;">What type of leather sheath is included with the Joker Bushcraft Knife?</h3>
        <div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
          <p itemprop="text" style="font-size:12.5px; color:#475569; margin:0; line-height:1.5;">The knife includes an authentic, handcrafted brown Spanish top-grain leather belt sheath. It features reinforced perimeter stitching, a heavy-duty retention snap strap, and a sturdy vertical belt loop designed for standard and heavy duty tactical/outdoor belts up to 2.5 inches wide.</p>
        </div>
      </div>
      <div itemscope itemprop="mainEntity" itemtype="https://schema.org/Question" style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:6px; padding:12px 16px; margin-bottom:10px;">
        <h3 itemprop="name" style="font-size:14px; font-weight:700; color:#0f172a; margin:0 0 4px 0; line-height:1.4;">How does the walnut hardwood handle perform in cold and wet weather?</h3>
        <div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
          <p itemprop="text" style="font-size:12.5px; color:#475569; margin:0; line-height:1.5;">Natural Spanish Walnut hardwood offers superior thermal comfort in cold weather compared to synthetic composites or metal handles, retaining warmth in sub-zero winter temperatures. The ergonomic contours fit natural hand grips to prevent fatigue during carving or game dressing. Applying a coat of mineral oil or wax periodically protects the wood grain and enhances moisture resistance.</p>
        </div>
      </div>
    </div>

  </div>

  <!-- RIGHT COLUMN: Technical Specs Table + Standards + Lineage -->
  <div style="flex:1 1 360px; min-width:290px; box-sizing:border-box;">
    
    <h2 style="font-size:18px; font-weight:800; color:#0f172a; margin:0 0 12px 0; border-bottom:2px solid #e2e8f0; padding-bottom:6px;">
      Engineered Specifications &amp; Technical Data
    </h2>
    <div style="overflow-x:auto; margin-bottom:20px;">
      <table style="width:100%; border-collapse:collapse; font-size:12.5px; text-align:left; background:#ffffff; border:1px solid #e2e8f0; border-radius:6px;">
        <tbody>
          <tr style="border-bottom:1px solid #f1f5f9;">
            <td style="padding:8px 12px; font-weight:700; width:45%; color:#334155; background:#f8fafc;">Brand:</td>
            <td style="padding:8px 12px; color:#0f172a;">Joker Knives (Cuchillería Joker)</td>
          </tr>
          <tr style="border-bottom:1px solid #f1f5f9;">
            <td style="padding:8px 12px; font-weight:700; width:45%; color:#334155; background:#f8fafc;">Model / SKU:</td>
            <td style="padding:8px 12px; color:#0f172a;">JKRCN112</td>
          </tr>
          <tr style="border-bottom:1px solid #f1f5f9;">
            <td style="padding:8px 12px; font-weight:700; width:45%; color:#334155; background:#f8fafc;">Product Type:</td>
            <td style="padding:8px 12px; color:#0f172a;">Fixed Blade Bushcraft &amp; Survival Knife</td>
          </tr>
          <tr style="border-bottom:1px solid #f1f5f9;">
            <td style="padding:8px 12px; font-weight:700; width:45%; color:#334155; background:#f8fafc;">Blade Metallurgy:</td>
            <td style="padding:8px 12px; color:#0f172a;">Sandvik 14C28N Stainless Steel (Sweden)</td>
          </tr>
          <tr style="border-bottom:1px solid #f1f5f9;">
            <td style="padding:8px 12px; font-weight:700; width:45%; color:#334155; background:#f8fafc;">Hardness Rating:</td>
            <td style="padding:8px 12px; color:#0f172a;">58&ndash;60 HRC (Cryo-Tempered)</td>
          </tr>
          <tr style="border-bottom:1px solid #f1f5f9;">
            <td style="padding:8px 12px; font-weight:700; width:45%; color:#334155; background:#f8fafc;">Blade Length:</td>
            <td style="padding:8px 12px; color:#0f172a;">4.00&quot; (10.16 cm)</td>
          </tr>
          <tr style="border-bottom:1px solid #f1f5f9;">
            <td style="padding:8px 12px; font-weight:700; width:45%; color:#334155; background:#f8fafc;">Overall Length:</td>
            <td style="padding:8px 12px; color:#0f172a;">8.75&quot; (22.23 cm)</td>
          </tr>
          <tr style="border-bottom:1px solid #f1f5f9;">
            <td style="padding:8px 12px; font-weight:700; width:45%; color:#334155; background:#f8fafc;">Blade Thickness:</td>
            <td style="padding:8px 12px; color:#0f172a;">3.7 mm (0.15&quot;)</td>
          </tr>
          <tr style="border-bottom:1px solid #f1f5f9;">
            <td style="padding:8px 12px; font-weight:700; width:45%; color:#334155; background:#f8fafc;">Blade Profile &amp; Finish:</td>
            <td style="padding:8px 12px; color:#0f172a;">Drop Point with Satin Finish</td>
          </tr>
          <tr style="border-bottom:1px solid #f1f5f9;">
            <td style="padding:8px 12px; font-weight:700; width:45%; color:#334155; background:#f8fafc;">Tang Construction:</td>
            <td style="padding:8px 12px; color:#0f172a;">Full Tang Integral Steel Construction</td>
          </tr>
          <tr style="border-bottom:1px solid #f1f5f9;">
            <td style="padding:8px 12px; font-weight:700; width:45%; color:#334155; background:#f8fafc;">Handle Material:</td>
            <td style="padding:8px 12px; color:#0f172a;">Sculpted Spanish Walnut with Brass Pins</td>
          </tr>
          <tr style="border-bottom:1px solid #f1f5f9;">
            <td style="padding:8px 12px; font-weight:700; width:45%; color:#334155; background:#f8fafc;">Sheath System:</td>
            <td style="padding:8px 12px; color:#0f172a;">Heavy-Duty Stitched Brown Leather Belt Sheath</td>
          </tr>
          <tr style="border-bottom:1px solid #f1f5f9;">
            <td style="padding:8px 12px; font-weight:700; width:45%; color:#334155; background:#f8fafc;">Country of Origin:</td>
            <td style="padding:8px 12px; color:#0f172a;">Albacete, Spain</td>
          </tr>
          <tr style="border-bottom:1px solid #f1f5f9;">
            <td style="padding:8px 12px; font-weight:700; width:45%; color:#334155; background:#f8fafc;">Origin / Fulfillment:</td>
            <td style="padding:8px 12px; color:#0f172a;">Inspected &amp; Dispatched from Michigan, USA</td>
          </tr>
          <tr style="border-bottom:1px solid #f1f5f9;">
            <td style="padding:8px 12px; font-weight:700; width:45%; color:#334155; background:#f8fafc;">Warranty:</td>
            <td style="padding:8px 12px; color:#0f172a;">Manufacturer Lifetime Warranty &amp; 30-Day Guarantee</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- VERIFIED STANDARDS BOX -->
    <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:8px; padding:16px; margin-bottom:20px;">
      <div style="font-size:11px; font-weight:800; text-transform:uppercase; color:#0f172a; margin-bottom:6px; letter-spacing:0.5px;">
        Verified Merchant Standards
      </div>
      <div style="font-size:12px; color:#475569; line-height:1.5; margin-bottom:8px;">
        &bull; <strong>BladeForums Community Member:</strong> Verified active cutlery expertise.<br />
        &bull; <strong>Upper Peninsula Tested:</strong> Cold-weather woodcraft &amp; field dressing verified.<br />
        &bull; <strong>Same-Day Michigan Dispatch:</strong> Tracked priority carrier shipping.
      </div>
    </div>

    <!-- CATEGORY & BRAND LINEAGE PILLS -->
    <div style="font-size:12px; font-weight:800; text-transform:uppercase; color:#334155; letter-spacing:0.5px; margin:16px 0 8px 0;">
      Category &amp; Brand Lineage
    </div>
    <div style="display:flex; flex-wrap:wrap; gap:6px; margin-bottom:20px;">
      <a href="https://www.michigansportsoutdoor.com/collections/knives/" style="background:#f0f9ff; border:1px solid #bae6fd; border-radius:4px; padding:4px 10px; font-size:12px; font-weight:700; color:#0369a1; text-decoration:none;">&bull; Pocket Knives &amp; Fixed Blades for Sale</a>
      <a href="https://www.michigansportsoutdoor.com/collections/camping-and-survival/" style="background:#f8fafc; border:1px solid #cbd5e1; border-radius:4px; padding:4px 10px; font-size:12px; font-weight:700; color:#0f172a; text-decoration:none;">&bull; Camping &amp; Survival Gear</a>
      <a href="https://www.michigansportsoutdoor.com/collections/sharpeners/" style="background:#f8fafc; border:1px solid #cbd5e1; border-radius:4px; padding:4px 10px; font-size:12px; font-weight:700; color:#0f172a; text-decoration:none;">&bull; Knife Sharpeners &amp; Strops</a>
      <a href="https://www.michigansportsoutdoor.com/collections/sheaths-and-storage/" style="background:#f8fafc; border:1px solid #cbd5e1; border-radius:4px; padding:4px 10px; font-size:12px; font-weight:700; color:#0f172a; text-decoration:none;">&bull; Leather Sheaths &amp; Cases</a>
    </div>

  </div>
</div>

<!-- CTA BANNER -->
<div style="background:#0f172a; color:#ffffff; border-radius:12px; padding:28px 32px; margin:36px 0 32px 0; box-shadow:0 8px 24px rgba(0,0,0,0.12); font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:20px;">
    <div style="max-width:620px;">
      <div style="display:flex; align-items:center; gap:8px; margin-bottom:8px; flex-wrap:wrap;">
        <span style="background:#16a34a; color:#ffffff; font-size:11px; font-weight:800; text-transform:uppercase; padding:3px 8px; border-radius:4px; letter-spacing:0.5px;">
          Verified In-Stock &bull; Ships Today
        </span>
        <span style="color:#94a3b8; font-size:12.5px;">Orders before 2:00 PM EST</span>
        <span style="color:#64748b;">&bull;</span>
        <span style="color:#38bdf8; font-size:12px; font-weight:700;">Verified Multi-Channel US Merchant</span>
      </div>
      <div style="font-size:22px; font-weight:800; color:#ffffff; margin:0 0 8px 0; letter-spacing:-0.3px;">
        Ready to Own the Joker Bushcraft Knife?
      </div>
      <p style="font-size:13.5px; color:#cbd5e1; margin:0; line-height:1.6;">
        Every order is backed by Michigan Sports Outdoor's 30-Day Hassle-Free Return Guarantee, Manufacturer Lifetime Warranty, and Free Insured US Shipping.
      </p>
    </div>
    <div style="text-align:right; min-width:240px;">
      <div style="margin-bottom:10px;">
        <span style="font-size:13px; color:#94a3b8; display:block;">Direct Warehouse Price</span>
        <span style="font-size:32px; font-weight:900; color:#ffffff; line-height:1;">$87.99</span>
        <span style="font-size:14px; color:#94a3b8; text-decoration:line-through; margin-left:8px;">$159.95</span>
      </div>
      <a href="/cart/?add-to-cart=22695" style="display:inline-block; width:100%; text-align:center; background:#ea580c; color:#ffffff; font-size:15px; font-weight:800; padding:14px 24px; border-radius:6px; text-decoration:none; letter-spacing:0.3px; box-shadow:0 4px 12px rgba(234,88,12,0.35); box-sizing:border-box;">
        Add to Cart &bull; Secure Checkout &rarr;
      </a>
      <div style="display:flex; justify-content:center; align-items:center; gap:6px; font-size:11.5px; color:#94a3b8; margin-top:8px;">
        <span>Free Shipping Eligible</span> &bull; <span>30-Day Return Guarantee</span>
      </div>
    </div>
  </div>
</div>

<!-- CATEGORY COMPANIONS CROSS-SELL -->
<div style="background:#ffffff; border:1px solid #e2e8f0; border-radius:10px; padding:24px; margin:32px 0; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; margin-bottom:16px;">
    <div>
      <h2 style="font-size:20px; font-weight:800; color:#0f172a; margin:0;">
        Field Companions &amp; Recommended Gear
      </h2>
      <p style="font-size:13.5px; color:#64748b; margin:4px 0 0 0;">
        Complete your outdoor field rig with companion sharpeners, protective sheaths, and navigation tools.
      </p>
    </div>
    <span style="background:#ecfdf5; color:#059669; font-size:11.5px; font-weight:700; padding:4px 10px; border-radius:4px; border:1px solid #a7f3d0;">
      In Stock &bull; Michigan Warehouse
    </span>
  </div>
  <div style="display:flex; flex-wrap:wrap; gap:12px;">
    
    <div style="flex:1 1 180px; min-width:160px; max-width:100%; background:#f8fafc; border:1px solid #e2e8f0; border-radius:8px; padding:14px; display:flex; flex-direction:column; justify-content:space-between; box-sizing:border-box;">
      <div>
        <a href="/product/dmt-suregrip-powered-diamond-knif/" style="text-decoration:none; display:block; text-align:center; margin-bottom:10px;">
          <img src="https://www.michigansportsoutdoor.com/wp-content/uploads/2026/09/DMT20187.jpg" alt="DMT Diamond Knife Sharpener" style="height:115px; width:100%; object-fit:contain;" loading="lazy" decoding="async" />
        </a>
        <div style="font-size:10px; font-weight:800; text-transform:uppercase; color:#16a34a; margin-bottom:3px;">Field Sharpener</div>
        <div style="font-size:12.5px; font-weight:700; color:#0f172a; margin:0 0 6px 0; line-height:1.3;"><a href="/product/dmt-suregrip-powered-diamond-knif/" style="color:#0f172a; text-decoration:none;">DMT Diamond Knife Sharpener</a></div>
      </div>
      <div>
        <div style="font-size:11.5px; font-weight:700; color:#16a34a; margin-bottom:8px; display:flex; align-items:center; gap:5px;">
          <span style="display:inline-block; width:6px; height:6px; border-radius:50%; background:#16a34a;"></span> In Stock &bull; Ships Fast
        </div>
        <a href="/product/dmt-suregrip-powered-diamond-knif/" style="display:block; text-align:center; background:#0f172a; color:#ffffff; font-size:11.5px; font-weight:700; padding:7px 10px; border-radius:5px; text-decoration:none;">View Best Price &rarr;</a>
      </div>
    </div>

    <div style="flex:1 1 180px; min-width:160px; max-width:100%; background:#f8fafc; border:1px solid #e2e8f0; border-radius:8px; padding:14px; display:flex; flex-direction:column; justify-content:space-between; box-sizing:border-box;">
      <div>
        <a href="/product/lansky-turn-box-with-leather-strop-2/" style="text-decoration:none; display:block; text-align:center; margin-bottom:10px;">
          <img src="https://www.michigansportsoutdoor.com/wp-content/uploads/2026/05/TB2D2CL.jpg" alt="Lansky Turn-Box Strop System" style="height:115px; width:100%; object-fit:contain;" loading="lazy" decoding="async" />
        </a>
        <div style="font-size:10px; font-weight:800; text-transform:uppercase; color:#b45309; margin-bottom:3px;">Bench Strop</div>
        <div style="font-size:12.5px; font-weight:700; color:#0f172a; margin:0 0 6px 0; line-height:1.3;"><a href="/product/lansky-turn-box-with-leather-strop-2/" style="color:#0f172a; text-decoration:none;">Lansky Turn-Box Strop System</a></div>
      </div>
      <div>
        <div style="font-size:11.5px; font-weight:700; color:#16a34a; margin-bottom:8px; display:flex; align-items:center; gap:5px;">
          <span style="display:inline-block; width:6px; height:6px; border-radius:50%; background:#16a34a;"></span> In Stock &bull; Ships Fast
        </div>
        <a href="/product/lansky-turn-box-with-leather-strop-2/" style="display:block; text-align:center; background:#0f172a; color:#ffffff; font-size:11.5px; font-weight:700; padding:7px 10px; border-radius:5px; text-decoration:none;">View Best Price &rarr;</a>
      </div>
    </div>

    <div style="flex:1 1 180px; min-width:160px; max-width:100%; background:#f8fafc; border:1px solid #e2e8f0; border-radius:8px; padding:14px; display:flex; flex-direction:column; justify-content:space-between; box-sizing:border-box;">
      <div>
        <a href="/product/brunton-truarc-15-luminous-compass/" style="text-decoration:none; display:block; text-align:center; margin-bottom:10px;">
          <img src="https://www.michigansportsoutdoor.com/wp-content/uploads/2026/06/BN91707.jpg" alt="Brunton TruArc 15 Compass" style="height:115px; width:100%; object-fit:contain;" loading="lazy" decoding="async" />
        </a>
        <div style="font-size:10px; font-weight:800; text-transform:uppercase; color:#0284c7; margin-bottom:3px;">Wilderness Nav</div>
        <div style="font-size:12.5px; font-weight:700; color:#0f172a; margin:0 0 6px 0; line-height:1.3;"><a href="/product/brunton-truarc-15-luminous-compass/" style="color:#0f172a; text-decoration:none;">Brunton TruArc 15 Compass</a></div>
      </div>
      <div>
        <div style="font-size:11.5px; font-weight:700; color:#16a34a; margin-bottom:8px; display:flex; align-items:center; gap:5px;">
          <span style="display:inline-block; width:6px; height:6px; border-radius:50%; background:#16a34a;"></span> In Stock &bull; Ships Fast
        </div>
        <a href="/product/brunton-truarc-15-luminous-compass/" style="display:block; text-align:center; background:#0f172a; color:#ffffff; font-size:11.5px; font-weight:700; padding:7px 10px; border-radius:5px; text-decoration:none;">View Best Price &rarr;</a>
      </div>
    </div>

    <div style="flex:1 1 180px; min-width:160px; max-width:100%; background:#f8fafc; border:1px solid #e2e8f0; border-radius:8px; padding:14px; display:flex; flex-direction:column; justify-content:space-between; box-sizing:border-box;">
      <div>
        <a href="/product/sharpi-8-in-1-diamond-sharpener/" style="text-decoration:none; display:block; text-align:center; margin-bottom:10px;">
          <img src="https://www.michigansportsoutdoor.com/wp-content/uploads/2026/08/SHOD0002.jpg" alt="Sharpi 8-in-1 Sharpener" style="height:115px; width:100%; object-fit:contain;" loading="lazy" decoding="async" />
        </a>
        <div style="font-size:10px; font-weight:800; text-transform:uppercase; color:#16a34a; margin-bottom:3px;">Camp Sharpener</div>
        <div style="font-size:12.5px; font-weight:700; color:#0f172a; margin:0 0 6px 0; line-height:1.3;"><a href="/product/sharpi-8-in-1-diamond-sharpener/" style="color:#0f172a; text-decoration:none;">Sharpi 8-in-1 Sharpener</a></div>
      </div>
      <div>
        <div style="font-size:11.5px; font-weight:700; color:#16a34a; margin-bottom:8px; display:flex; align-items:center; gap:5px;">
          <span style="display:inline-block; width:6px; height:6px; border-radius:50%; background:#16a34a;"></span> In Stock &bull; Ships Fast
        </div>
        <a href="/product/sharpi-8-in-1-diamond-sharpener/" style="display:block; text-align:center; background:#0f172a; color:#ffffff; font-size:11.5px; font-weight:700; padding:7px 10px; border-radius:5px; text-decoration:none;">View Best Price &rarr;</a>
      </div>
    </div>

    <div style="flex:1 1 180px; min-width:160px; max-width:100%; background:#f8fafc; border:1px solid #e2e8f0; border-radius:8px; padding:14px; display:flex; flex-direction:column; justify-content:space-between; box-sizing:border-box;">
      <div>
        <a href="/product/aucon-smiley-bead-copper/" style="text-decoration:none; display:block; text-align:center; margin-bottom:10px;">
          <img src="https://www.michigansportsoutdoor.com/wp-content/uploads/2025/10/ACN005C.jpg" alt="AuCon Smiley Bead Copper" style="height:115px; width:100%; object-fit:contain;" loading="lazy" decoding="async" />
        </a>
        <div style="font-size:10px; font-weight:800; text-transform:uppercase; color:#0284c7; margin-bottom:3px;">Lanyard Bead</div>
        <div style="font-size:12.5px; font-weight:700; color:#0f172a; margin:0 0 6px 0; line-height:1.3;"><a href="/product/aucon-smiley-bead-copper/" style="color:#0f172a; text-decoration:none;">AuCon Smiley Bead Copper</a></div>
      </div>
      <div>
        <div style="font-size:11.5px; font-weight:700; color:#16a34a; margin-bottom:8px; display:flex; align-items:center; gap:5px;">
          <span style="display:inline-block; width:6px; height:6px; border-radius:50%; background:#16a34a;"></span> In Stock &bull; Ships Fast
        </div>
        <a href="/product/aucon-smiley-bead-copper/" style="display:block; text-align:center; background:#0f172a; color:#ffffff; font-size:11.5px; font-weight:700; padding:7px 10px; border-radius:5px; text-decoration:none;">View Best Price &rarr;</a>
      </div>
    </div>

  </div>
</div>

<!-- RELATED GUIDES & FIELD TESTS -->
<div style="background:#ffffff; border:1px solid #e2e8f0; border-radius:12px; padding:26px 28px; margin:32px 0 20px 0; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; margin-bottom:20px; border-bottom:1px solid #e2e8f0; padding-bottom:14px;">
    <div>
      <span style="font-size:11px; font-weight:800; text-transform:uppercase; letter-spacing:1px; color:#16a34a;">Michigan Sports Outdoor Editorial</span>
      <h2 style="font-size:22px; font-weight:800; color:#0f172a; margin:4px 0 0 0;">Related Guides, Steel Showdowns &amp; Field Tests</h2>
    </div>
    <a href="/category/blog/" style="font-size:13px; font-weight:700; color:#0284c7; text-decoration:none; margin-top:4px;">Explore All Field Guides &rarr;</a>
  </div>
  <div style="display:flex; flex-wrap:wrap; gap:16px;">
    
    <div style="flex:1 1 260px; min-width:240px; max-width:100%; background:#ffffff; border:1px solid #e2e8f0; border-radius:8px; overflow:hidden; display:flex; flex-direction:column; justify-content:space-between; box-shadow:0 2px 8px rgba(0,0,0,0.03); box-sizing:border-box;">
      <div>
        <a href="/fixed-blade-vs-folding-knife-for-hunting/" style="display:block; width:100%; height:160px; overflow:hidden; position:relative; background:#0f172a;">
          <img src="https://www.michigansportsoutdoor.com/wp-content/uploads/2026/03/KNIFE-BLADE-STEELS-shapes-for-field-dressing.jpg" alt="Fixed Blade vs Folding Knife for Outdoor Utility" style="width:100%; height:100%; object-fit:cover; display:block;" loading="lazy" decoding="async" />
          <span style="position:absolute; top:10px; left:10px; background:#16a34a; color:#ffffff; font-size:10px; font-weight:800; text-transform:uppercase; padding:3px 7px; border-radius:4px;">Field Comparison</span>
        </a>
        <div style="padding:16px 18px 12px 18px;">
          <div style="font-size:15px; font-weight:700; color:#0f172a; margin:0 0 6px 0; line-height:1.35;"><a href="/fixed-blade-vs-folding-knife-for-hunting/" style="color:#0f172a; text-decoration:none;">Fixed Blade vs Folding Knife for Outdoor Utility</a></div>
          <p style="font-size:12px; color:#64748b; margin:0; line-height:1.5;">We weigh structural rigidity, lock mechanics, and deployment speed for outdoor utility.</p>
        </div>
      </div>
      <div style="padding:0 18px 16px 18px;"><a href="/fixed-blade-vs-folding-knife-for-hunting/" style="font-size:12.5px; font-weight:700; color:#0284c7; text-decoration:none;">Read Field Analysis &rarr;</a></div>
    </div>

    <div style="flex:1 1 260px; min-width:240px; max-width:100%; background:#ffffff; border:1px solid #e2e8f0; border-radius:8px; overflow:hidden; display:flex; flex-direction:column; justify-content:space-between; box-shadow:0 2px 8px rgba(0,0,0,0.03); box-sizing:border-box;">
      <div>
        <a href="/full-tang-vs-partial-tang-knife/" style="display:block; width:100%; height:160px; overflow:hidden; position:relative; background:#0f172a;">
          <img src="https://www.michigansportsoutdoor.com/wp-content/uploads/2026/03/Details-on-gut-Hook-Knives-1.jpg" alt="Full Tang vs Partial Tang in Michigan Winters" style="width:100%; height:100%; object-fit:cover; display:block;" loading="lazy" decoding="async" />
          <span style="position:absolute; top:10px; left:10px; background:#0284c7; color:#ffffff; font-size:10px; font-weight:800; text-transform:uppercase; padding:3px 7px; border-radius:4px;">Knife Build</span>
        </a>
        <div style="padding:16px 18px 12px 18px;">
          <div style="font-size:15px; font-weight:700; color:#0f172a; margin:0 0 6px 0; line-height:1.35;"><a href="/full-tang-vs-partial-tang-knife/" style="color:#0f172a; text-decoration:none;">Full Tang vs Partial Tang in Michigan Winters</a></div>
          <p style="font-size:12px; color:#64748b; margin:0; line-height:1.5;">Comparing full tang integrity and partial tang handling under freezing sub-zero wilderness conditions.</p>
        </div>
      </div>
      <div style="padding:0 18px 16px 18px;"><a href="/full-tang-vs-partial-tang-knife/" style="font-size:12.5px; font-weight:700; color:#0284c7; text-decoration:none;">Read Field Analysis &rarr;</a></div>
    </div>

    <div style="flex:1 1 260px; min-width:240px; max-width:100%; background:#ffffff; border:1px solid #e2e8f0; border-radius:8px; overflow:hidden; display:flex; flex-direction:column; justify-content:space-between; box-shadow:0 2px 8px rgba(0,0,0,0.03); box-sizing:border-box;">
      <div>
        <a href="/top-best-fixed-blade-knives/" style="display:block; width:100%; height:160px; overflow:hidden; position:relative; background:#0f172a;">
          <img src="https://www.michigansportsoutdoor.com/wp-content/uploads/2026/03/TOP-BEST-FIXED-BLADE-KNIVES.jpg" alt="7 Best Fixed Blade Knives for Camping &amp; Bushcraft" style="width:100%; height:100%; object-fit:cover; display:block;" loading="lazy" decoding="async" />
          <span style="position:absolute; top:10px; left:10px; background:#f59e0b; color:#ffffff; font-size:10px; font-weight:800; text-transform:uppercase; padding:3px 7px; border-radius:4px;">Bushcraft Guide</span>
        </a>
        <div style="padding:16px 18px 12px 18px;">
          <div style="font-size:15px; font-weight:700; color:#0f172a; margin:0 0 6px 0; line-height:1.35;"><a href="/top-best-fixed-blade-knives/" style="color:#0f172a; text-decoration:none;">7 Best Fixed Blade Knives for Camping &amp; Bushcraft</a></div>
          <p style="font-size:12px; color:#64748b; margin:0; line-height:1.5;">Field tested fixed blades ranked for batoning, feather sticking, and camp chores.</p>
        </div>
      </div>
      <div style="padding:0 18px 16px 18px;"><a href="/top-best-fixed-blade-knives/" style="font-size:12.5px; font-weight:700; color:#0284c7; text-decoration:none;">Read Field Analysis &rarr;</a></div>
    </div>

  </div>
</div>

<!-- VERIFIED GOOGLE STORE REVIEWS -->
<div style="background:#ffffff; border:1px solid #e2e8f0; border-radius:12px; padding:26px 28px; margin:32px 0 24px 0; box-shadow:0 2px 8px rgba(0,0,0,0.02); font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px; margin-bottom:20px; border-bottom:1px solid #e2e8f0; padding-bottom:14px;">
    <div>
      <span style="font-size:11px; font-weight:800; text-transform:uppercase; letter-spacing:1px; color:#0369a1;">Fulfillment &amp; Merchant Authenticity</span>
      <h2 style="font-size:22px; font-weight:800; color:#0f172a; margin:4px 0 0 0;">Verified MSO Store &amp; Order Experiences</h2>
    </div>
    <div style="display:inline-flex; align-items:center; gap:8px; background:#f8fafc; border:1px solid #e2e8f0; border-radius:20px; padding:6px 14px; font-size:12px; font-weight:800; color:#0f172a;">
      <span>Google Verified 4.8 Rating</span>
      <span style="color:#f59e0b; font-size:13px;">&#9733;&#9733;&#9733;&#9733;&#9733;</span>
    </div>
  </div>
  <div style="display:flex; flex-wrap:wrap; gap:16px;">
    <div style="flex:1 1 280px; min-width:260px; background:#f8fafc; border:1px solid #e2e8f0; border-radius:8px; padding:18px; box-sizing:border-box; display:flex; flex-direction:column; justify-content:space-between;">
      <div>
        <div style="display:flex; align-items:center; gap:12px; margin-bottom:10px;">
          <img src="https://www.michigansportsoutdoor.com/wp-content/uploads/2026/08/ChIJc3vpny2NhYYR700meVMhtto_552fe3ee12ce541ed6a0f3739c99d635.jpg" alt="Joe Sell" style="width:40px; height:40px; border-radius:50%; object-fit:cover; border:1px solid #cbd5e1;" loading="lazy" decoding="async" />
          <div>
            <a href="https://www.google.com/maps/contrib/113208006462811821271/reviews" target="_blank" rel="noopener noreferrer" style="font-size:13.5px; font-weight:800; color:#0f172a; text-decoration:none; display:block;">Joe Sell</a>
            <span style="font-size:11px; color:#64748b; font-weight:600;">Verified Google Buyer &bull; US Order</span>
          </div>
        </div>
        <div style="color:#f59e0b; font-size:12px; margin-bottom:8px;">&#9733;&#9733;&#9733;&#9733;&#9733; 5.0</div>
        <p style="font-size:12.5px; color:#334155; line-height:1.55; margin:0;">
          &ldquo;I placed my order on 08/03 and it was delivered on 08/07. It shipped free since it was over $100 via UPS. Items were new and exactly as ordered. Honestly, prices were good and I couldn&rsquo;t ask for better service. They have earned my business.&rdquo;
        </p>
      </div>
    </div>
    <div style="flex:1 1 280px; min-width:260px; background:#f8fafc; border:1px solid #e2e8f0; border-radius:8px; padding:18px; box-sizing:border-box; display:flex; flex-direction:column; justify-content:space-between;">
      <div>
        <div style="display:flex; align-items:center; gap:12px; margin-bottom:10px;">
          <img src="https://www.michigansportsoutdoor.com/wp-content/uploads/2026/08/ChIJc3vpny2NhYYR700meVMhtto_dd7e84c4e08cfcb9a1e5ad9362d7d4b9.jpg" alt="Abdullah" style="width:40px; height:40px; border-radius:50%; object-fit:cover; border:1px solid #cbd5e1;" loading="lazy" decoding="async" />
          <div>
            <a href="https://www.google.com/maps/contrib/101626929586739438666/reviews" target="_blank" rel="noopener noreferrer" style="font-size:13.5px; font-weight:800; color:#0f172a; text-decoration:none; display:block;">Abdullah</a>
            <span style="font-size:11px; color:#64748b; font-weight:600;">Verified Google Buyer &bull; Knife Outfitting</span>
          </div>
        </div>
        <div style="color:#f59e0b; font-size:12px; margin-bottom:8px;">&#9733;&#9733;&#9733;&#9733;&#9733; 5.0</div>
        <p style="font-size:12.5px; color:#334155; line-height:1.55; margin:0;">
          &ldquo;Wasn&rsquo;t sure about buying a knife online, but a friend put me onto this site. Two weeks in and it&rsquo;s honestly one of the better purchases I&rsquo;ve made &mdash; sharp, well-balanced, does the job. Definitely recommend this store.&rdquo;
        </p>
      </div>
    </div>
    <div style="flex:1 1 280px; min-width:260px; background:#f8fafc; border:1px solid #e2e8f0; border-radius:8px; padding:18px; box-sizing:border-box; display:flex; flex-direction:column; justify-content:space-between;">
      <div>
        <div style="display:flex; align-items:center; gap:12px; margin-bottom:10px;">
          <img src="https://www.michigansportsoutdoor.com/wp-content/uploads/2026/08/ChIJc3vpny2NhYYR700meVMhtto_b5a5fa12ed4ab6d736b1e92de78d5ac7.jpg" alt="Hassan Ali" style="width:40px; height:40px; border-radius:50%; object-fit:cover; border:1px solid #cbd5e1;" loading="lazy" decoding="async" />
          <div>
            <a href="https://www.google.com/maps/contrib/103596266089790838188/reviews" target="_blank" rel="noopener noreferrer" style="font-size:13.5px; font-weight:800; color:#0f172a; text-decoration:none; display:block;">Hassan Ali</a>
            <span style="font-size:11px; color:#64748b; font-weight:600;">Verified Google Buyer &bull; Outdoor Gear</span>
          </div>
        </div>
        <div style="color:#f59e0b; font-size:12px; margin-bottom:8px;">&#9733;&#9733;&#9733;&#9733;&#9733; 5.0</div>
        <p style="font-size:12.5px; color:#334155; line-height:1.55; margin:0;">
          &ldquo;I have excellent experience to order my product with Michigan Sports Outdoor. Customer service was awesome and the order arrived very quickly and securely packaged.&rdquo;
        </p>
      </div>
    </div>
  </div>
</div>

<!-- FLOATING GMB BADGE -->
<a href="https://share.google/acI6CfNOs68e2r7eO" target="_blank" rel="noopener noreferrer" style="position:fixed; bottom:20px; right:20px; z-index:9999; background:#ffffff; border:1px solid #cbd5e1; border-radius:50px; padding:7px 15px 7px 11px; box-shadow:0 4px 16px rgba(0,0,0,0.15); display:inline-flex; align-items:center; gap:9px; text-decoration:none; font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;" title="Verified 4.8 Rating on Google Reviews (5 Reviews)">
  <span style="display:flex; align-items:center; justify-content:center; width:20px; height:20px;">
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
    </svg>
  </span>
  <span style="display:flex; flex-direction:column; line-height:1.15;">
    <span style="display:flex; align-items:center; gap:5px;">
      <span style="font-size:12.5px; font-weight:900; color:#0f172a;">4.8</span>
      <span style="color:#f59e0b; font-size:11px; letter-spacing:1px;">&#9733;&#9733;&#9733;&#9733;&#9733;</span>
    </span>
    <span style="font-size:9.5px; font-weight:700; color:#64748b; text-transform:uppercase; letter-spacing:0.3px;">5 Google Reviews</span>
  </span>
</a>
`.trim();

// ─────────────────────────────────────────────────────────────
// 3. RANK MATH SEO METADATA
// ─────────────────────────────────────────────────────────────
const rankMathPayload = {
  rank_math_title: 'Joker Bushcraft Knife Walnut Handle 4" Sandvik 14C28N | MSO',
  rank_math_description: 'Explore the Joker Bushcraft Knife with 4" Sandvik 14C28N stainless steel drop point blade and sculpted walnut handle. Full tang Spanish field knife with leather sheath. Ships fast from Michigan!',
  rank_math_focus_keyword: 'Joker Bushcraft Knife, Joker Bushcraft Knife Walnut, 14C28N bushcraft knife, Joker fixed blade knife Spain',
  _mso_stop_update_content: 'yes' // Protect from unintended automated overwrites
};

// ─────────────────────────────────────────────────────────────
// 4. DEPLOYMENT EXECUTION FUNCTION
// ─────────────────────────────────────────────────────────────
async function deploy() {
  console.log(`Starting SEO - AEO - GEO deployment for Product #${productId}...`);

  // 1. Update WooCommerce Product (description & short_description)
  console.log('Step 1: Updating WooCommerce product description and short description...');
  const wcRes = await fetch(`${baseUrl}/wp-json/wc/v3/products/${productId}`, {
    method: 'PUT',
    headers,
    body: JSON.stringify({
      description: fullDescription,
      short_description: shortDescription,
      meta_data: Object.entries(rankMathPayload).map(([key, value]) => ({ key, value }))
    })
  });

  if (!wcRes.ok) {
    const errorText = await wcRes.text();
    throw new Error(`WooCommerce update failed with HTTP ${wcRes.status}: ${errorText}`);
  }
  const wcData = await wcRes.json();
  console.log(`✓ WooCommerce product updated successfully! ID: ${wcData.id}, Slug: ${wcData.slug}`);

  // 2. Update WP Post Meta for Rank Math directly (guarantees Rank Math reads it)
  console.log('Step 2: Updating WordPress post meta for Rank Math SEO...');
  const wpRes = await fetch(`${baseUrl}/wp-json/wp/v2/product/${productId}`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      meta: rankMathPayload
    })
  });

  if (!wpRes.ok) {
    console.warn(`Warning: Direct WP meta update returned HTTP ${wpRes.status}, but WooCommerce meta_data was already set.`);
  } else {
    console.log('✓ Direct WordPress Rank Math post meta updated successfully!');
  }

  // 3. Verification check
  console.log('Step 3: Verifying live data via REST API...');
  const verifyRes = await fetch(`${baseUrl}/wp-json/wc/v3/products/${productId}`, { headers });
  if (verifyRes.ok) {
    const p = await verifyRes.json();
    console.log({
      status: 'SUCCESS',
      id: p.id,
      name: p.name,
      descriptionLength: p.description?.length || 0,
      shortDescriptionLength: p.short_description?.length || 0,
      permalink: p.permalink
    });
  }

  console.log(`\n🎉 Product ${productId} successfully optimized for SEO, AEO, and GEO!`);
  console.log(`Live URL: ${baseUrl}/product/joker-bushcraft-knife-walnut-handle/`);
}

deploy().catch(err => {
  console.error('Fatal Deployment Error:', err);
  process.exit(1);
});
