// lib/autopilot/bladehq-layout.ts
// Blade HQ 2-Column Split Layout Generator (Layout B)
// 100% Pure Inline CSS (Zero raw code leaks)

export interface BladeHqLayoutInput {
  product: {
    id: number;
    title?: string;
    name?: string;
    price?: string | number;
    sku?: string;
    brand?: string;
    description?: string;
    short_description?: string;
    categories?: any[];
    attributes?: Array<{ name?: string; options?: any[] }>;
  };
  generated: {
    contentHtml: string;
    metaTitle?: string;
    metaDescription?: string;
    faqs?: Array<{ question: string; answer: string }>;
  };
}

export function extractKnifeSpecs(product: BladeHqLayoutInput['product']) {
  const fullText = (
    (product.name || product.title || '') + ' ' +
    (product.description || '') + ' ' +
    (product.short_description || '') + ' ' +
    (product.brand || '')
  ).toLowerCase();

  const specs: Record<string, string> = {
    'Brand': product.brand || (product.name || product.title || '').split(' ')[0] || 'Michigan Sports Outdoor',
    'Product Type': 'Folding Knife / Outdoor Tool',
    'Blade Metallurgy': 'High-Carbon Stainless Steel',
    'Lock / Tang Type': 'Liner Lock / Positive Detent',
    'Handle Material': 'Ergonomic Composite / Textured G-10',
    'Blade Length': '3.25" (8.26 cm)',
    'Pocket Clip': 'Deep Carry Reversible Stainless Clip',
    'Origin / Quality': 'Inspected & Dispatched from Michigan, USA',
    'Warranty': 'Manufacturer Lifetime Warranty & 30-Day Guarantee'
  };

  if (product.attributes && Array.isArray(product.attributes)) {
    for (const attr of product.attributes) {
      const val = attr.options && attr.options[0] ? String(attr.options[0]).trim() : '';
      if (!val) continue;
      const attrName = (attr.name || '').toLowerCase();
      if (attrName.includes('blade material')) {
        specs['Blade Metallurgy'] = val;
      } else if (attrName.includes('blade length')) {
        specs['Blade Length'] = val.includes('"') ? val : `${val}"`;
      } else if (attrName.includes('handle material')) {
        specs['Handle Material'] = val;
      } else if (attrName.includes('manufacturer')) {
        specs['Brand'] = val;
      } else if (attrName.includes('country of origin')) {
        specs['Origin / Quality'] = `Crafted in ${val} & Dispatched from Michigan, USA`;
      } else if (attrName.includes('fixed') || attrName.includes('folding')) {
        specs['Product Type'] = val;
      }
    }
  }

  if (product.sku) {
    specs['Model / SKU'] = product.sku;
  }

  // Steel detection
  if (fullText.includes('m390mk')) specs['Blade Metallurgy'] = 'Böhler M390MK Microclean';
  else if (fullText.includes('m390')) specs['Blade Metallurgy'] = 'Böhler M390 Stainless';
  else if (fullText.includes('magnacut')) specs['Blade Metallurgy'] = 'Crucible CPM MagnaCut';
  else if (fullText.includes('s35vn')) specs['Blade Metallurgy'] = 'Crucible CPM-S35VN';
  else if (fullText.includes('s45vn')) specs['Blade Metallurgy'] = 'Crucible CPM-S45VN';
  else if (fullText.includes('20cv')) specs['Blade Metallurgy'] = 'Crucible CPM-20CV';
  else if (fullText.includes('1095')) specs['Blade Metallurgy'] = '1095 High Carbon Cro-Van';
  else if (fullText.includes('d2')) specs['Blade Metallurgy'] = 'D2 Tool Steel';
  else if (fullText.includes('14c28n')) specs['Blade Metallurgy'] = 'Sandvik 14C28N Stainless';
  else if (fullText.includes('vg-10') || fullText.includes('vg10')) specs['Blade Metallurgy'] = 'VG-10 Super Steel';
  else if (fullText.includes('aus-10') || fullText.includes('aus10')) specs['Blade Metallurgy'] = 'Japanese AUS-10A';
  else if (fullText.includes('n690')) specs['Blade Metallurgy'] = 'Böhler N690 Cobalt Stainless';

  // Lock detection
  if (fullText.includes('ram-lok')) specs['Lock / Tang Type'] = 'Ram-Lok Crossbar Lock';
  else if (fullText.includes('crossbar') || fullText.includes('axis')) specs['Lock / Tang Type'] = 'Crossbar Axis Lock';
  else if (fullText.includes('tri-ad')) specs['Lock / Tang Type'] = 'Cold Steel Andrew Demko Tri-Ad Lock';
  else if (fullText.includes('framelock') || fullText.includes('frame lock')) specs['Lock / Tang Type'] = 'Solid Integral Frame Lock';
  else if (fullText.includes('linerlock') || fullText.includes('liner lock')) specs['Lock / Tang Type'] = 'Liner Lock with Positive Detent';
  else if (fullText.includes('button lock')) specs['Lock / Tang Type'] = 'Plunge Button Lock';
  else if (fullText.includes('slip joint') || fullText.includes('slipjoint')) specs['Lock / Tang Type'] = 'Traditional Slip Joint';
  else if (fullText.includes('fixed') || fullText.includes('full tang')) specs['Lock / Tang Type'] = 'Full Tang Fixed Blade Construction';

  // Handle detection
  if (fullText.includes('titanium')) specs['Handle Material'] = '6Al4V Grade 5 Titanium';
  else if (fullText.includes('carbon fiber')) specs['Handle Material'] = 'Woven Carbon Fiber';
  else if (fullText.includes('micarta')) specs['Handle Material'] = 'Canvas / Linen Micarta';
  else if (fullText.includes('g-10') || fullText.includes('g10')) specs['Handle Material'] = 'Textured G-10 Phenolic';
  else if (fullText.includes('aluminum')) specs['Handle Material'] = '6061-T6 Aircraft Aluminum';
  else if (fullText.includes('wood') || fullText.includes('ziricote') || fullText.includes('walnut')) specs['Handle Material'] = 'Stabilized Hardwood';

  // Length detection
  const lenMatch = fullText.match(/(\d+\.?\d*)\s*("|'|inch)/);
  if (lenMatch) {
    const inches = parseFloat(lenMatch[1]);
    if (inches > 0 && inches < 20) {
      specs['Blade Length'] = `${inches}" (${(inches * 2.54).toFixed(1)} cm)`;
    }
  }

  return specs;
}

export function buildBladeHqLayout(input: BladeHqLayoutInput): {
  shortDescription: string;
  fullDescription: string;
} {
  const { product, generated } = input;
  const name = product.name || product.title || 'Precision Outdoor Gear';
  const price = product.price ? parseFloat(String(product.price)).toFixed(2) : '189.00';
  const specs = extractKnifeSpecs(product);

  // 1. STREAMLINED BUY BOX (SHORT DESCRIPTION)
  const shortDescription = `
<div style="margin:4px 0 10px 0;">
  <span style="background:#e0f2fe; color:#0369a1; font-size:11px; font-weight:800; text-transform:uppercase; padding:3px 8px; border-radius:4px; letter-spacing:0.5px; display:inline-block; margin-bottom:8px;">FREE SHIPPING &bull; SAME-DAY DISPATCH</span>
  <div style="display:flex; flex-wrap:wrap; gap:6px; margin-bottom:10px;">
    <span style="background:#f8fafc; color:#0f172a; font-size:11.5px; font-weight:700; padding:4px 10px; border-radius:4px; border:1px solid #e2e8f0;">${specs['Blade Metallurgy']}</span>
    <span style="background:#f8fafc; color:#0f172a; font-size:11.5px; font-weight:700; padding:4px 10px; border-radius:4px; border:1px solid #e2e8f0;">${specs['Blade Length']} Blade</span>
    <span style="background:#f8fafc; color:#0f172a; font-size:11.5px; font-weight:700; padding:4px 10px; border-radius:4px; border:1px solid #e2e8f0;">${specs['Lock / Tang Type']}</span>
    <span style="background:#f8fafc; color:#0f172a; font-size:11.5px; font-weight:700; padding:4px 10px; border-radius:4px; border:1px solid #e2e8f0;">${specs['Brand']}</span>
  </div>
  <div style="background:#f0fdf4; border:1px solid #bbf7d0; border-left:3px solid #16a34a; border-radius:4px; padding:7px 12px; margin-bottom:10px; font-size:12px; color:#15803d; line-height:1.4;">
    <strong>In Stock &bull; Ships Today:</strong> Orders before 2:00 PM EST ship same-day from Michigan warehouse via USPS Priority / UPS.
  </div>
  <div style="display:flex; flex-wrap:wrap; gap:6px; margin-bottom:10px; font-size:11.5px; color:#334155;">
    <span style="background:#ffffff; border:1px solid #e2e8f0; padding:4px 8px; border-radius:4px;"><strong>100% Factory Authentic</strong></span>
    <span style="background:#ffffff; border:1px solid #e2e8f0; padding:4px 8px; border-radius:4px;"><strong>30-Day Hassle-Free Returns</strong></span>
    <span style="background:#ffffff; border:1px solid #e2e8f0; padding:4px 8px; border-radius:4px;"><strong>Michigan Warehouse Dispatch</strong></span>
  </div>
</div>`.trim();

  // 2. FAQS HTML
  let faqsHtml = '';
  if (generated.faqs && generated.faqs.length > 0) {
    const faqItems = generated.faqs.map(f => `
      <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:6px; padding:12px 16px; margin-bottom:10px;">
        <h4 style="font-size:13.5px; font-weight:700; color:#0f172a; margin:0 0 4px 0;">${f.question}</h4>
        <p style="font-size:12.5px; color:#475569; margin:0; line-height:1.5;">${f.answer}</p>
      </div>
    `).join('');

    faqsHtml = `
      <h3 style="font-size:18px; font-weight:800; color:#0f172a; margin:24px 0 12px 0; border-bottom:2px solid #e2e8f0; padding-bottom:6px;">
        Frequently Asked Questions
      </h3>
      <div style="display:flex; flex-direction:column; gap:10px; margin-bottom:20px;">
        ${faqItems}
      </div>
    `;
  }

  // 3. LEFT COLUMN (55%): Bullets + Clean Narrative + FAQs
  const leftCol = `
<div style="flex:1 1 460px; min-width:320px; box-sizing:border-box;">
  <h3 style="font-size:18px; font-weight:800; color:#0f172a; margin:0 0 12px 0; border-bottom:2px solid #e2e8f0; padding-bottom:6px;">
    This Gear at a Glance
  </h3>
  <ul style="list-style-type:disc; padding-left:20px; margin:0 0 24px 0; font-size:13.5px; color:#334155; line-height:1.6;">
    <li style="margin-bottom:8px;"><strong>Blade Metallurgy:</strong> Precision ground ${specs['Blade Metallurgy']} engineered for high edge retention, toughness, and wear resistance.</li>
    <li style="margin-bottom:8px;"><strong>Chassis &amp; Ergonomics:</strong> ${specs['Handle Material']} designed for balanced hand indexing and positive traction in wet or cold environments.</li>
    <li style="margin-bottom:8px;"><strong>Mechanism / Lock:</strong> ${specs['Lock / Tang Type']} providing rock-solid structural integrity under demanding outdoor conditions.</li>
    <li style="margin-bottom:8px;"><strong>Intended Mission:</strong> Tactical EDC, hunting camp utility, backcountry field dressing, and everyday utility cutting.</li>
    <li style="margin-bottom:8px;"><strong>Quality Guarantee:</strong> 100% authentic ${specs['Brand']} gear backed by factory warranty and Michigan Sports Outdoor satisfaction guarantee.</li>
  </ul>

  <div style="font-size:13.5px; color:#475569; line-height:1.65; margin:0 0 20px 0;">
    ${generated.contentHtml}
  </div>

  ${faqsHtml}
</div>`.trim();

  // 4. RIGHT COLUMN (45%): Specifications Table + Badges
  const specRows = Object.entries(specs).map(([k, v]) => `
    <tr style="border-bottom:1px solid #f1f5f9;">
      <td style="padding:8px 12px; font-weight:700; width:45%; color:#334155; background:#f8fafc;">${k}:</td>
      <td style="padding:8px 12px; color:#0f172a;">${v}</td>
    </tr>
  `).join('');

  const rightCol = `
<div style="flex:1 1 360px; min-width:290px; box-sizing:border-box;">
  <h3 style="font-size:18px; font-weight:800; color:#0f172a; margin:0 0 12px 0; border-bottom:2px solid #e2e8f0; padding-bottom:6px;">
    Engineered Specifications
  </h3>
  <div style="overflow-x:auto; margin-bottom:20px;">
    <table style="width:100%; border-collapse:collapse; font-size:12.5px; text-align:left; background:#ffffff; border:1px solid #e2e8f0; border-radius:6px;">
      <tbody>
        ${specRows}
      </tbody>
    </table>
  </div>

  <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:8px; padding:16px; margin-bottom:20px;">
    <div style="font-size:11px; font-weight:800; text-transform:uppercase; color:#0f172a; margin-bottom:6px; letter-spacing:0.5px;">
      Verified Merchant Standards
    </div>
    <div style="font-size:12px; color:#475569; line-height:1.5; margin-bottom:8px;">
      &bull; <strong>BladeForums Community Member:</strong> Verified active community presence.<br />
      &bull; <strong>Upper Peninsula Tested:</strong> Field performance verified in harsh conditions.<br />
      &bull; <strong>24-48h US Dispatch:</strong> Fully tracked courier shipping from Michigan.
    </div>
  </div>

  <h4 style="font-size:14px; font-weight:800; color:#0f172a; margin:16px 0 8px 0;">
    Related Categories &amp; Brands
  </h4>
  <div style="display:flex; flex-wrap:wrap; gap:6px; margin-bottom:20px;">
    <a href="/category/blog/" style="background:#f1f5f9; border:1px solid #cbd5e1; border-radius:4px; padding:4px 10px; font-size:12px; font-weight:700; color:#0f172a; text-decoration:none;">Field Tests &amp; Guides</a>
    <a href="/brands/" style="background:#f1f5f9; border:1px solid #cbd5e1; border-radius:4px; padding:4px 10px; font-size:12px; font-weight:700; color:#0f172a; text-decoration:none;">Authorized Brands</a>
    <a href="/product-category/pocket-knives/" style="background:#f1f5f9; border:1px solid #cbd5e1; border-radius:4px; padding:4px 10px; font-size:12px; font-weight:700; color:#0f172a; text-decoration:none;">Pocket Knives</a>
  </div>
</div>`.trim();

  // 5. 2-COLUMN SPLIT CONTAINER
  const splitContainer = `
<div style="display:flex; flex-wrap:wrap; gap:32px; margin:28px 0 36px 0;">
  ${leftCol}
  ${rightCol}
</div>`.trim();

  // 6. BOTTOM SECTIONS: CTA Banner + 5 Cross Sells + 3 Blog Guides
  const ctaBanner = `
<div style="background:#0f172a; color:#ffffff; border-radius:12px; padding:28px 32px; margin:36px 0 32px 0; box-shadow:0 8px 24px rgba(0,0,0,0.12);">
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
      <h3 style="font-size:22px; font-weight:800; color:#ffffff; margin:0 0 8px 0; letter-spacing:-0.3px;">
        Ready to Own the ${name}?
      </h3>
      <p style="font-size:13.5px; color:#cbd5e1; margin:0; line-height:1.6;">
        Every order is backed by Michigan Sports Outdoor's 30-Day Hassle-Free Return Guarantee, Manufacturer Lifetime Warranty, and Free Insured US Shipping.
      </p>
    </div>
    <div style="text-align:right; min-width:240px;">
      <div style="margin-bottom:10px;">
        <span style="font-size:13px; color:#94a3b8; display:block;">Direct Warehouse Price</span>
        <span style="font-size:32px; font-weight:900; color:#ffffff; line-height:1;">$${price}</span>
      </div>
      <a href="/cart/?add-to-cart=${product.id}" style="display:inline-block; width:100%; text-align:center; background:#ea580c; color:#ffffff; font-size:15px; font-weight:800; padding:14px 24px; border-radius:6px; text-decoration:none; letter-spacing:0.3px; box-shadow:0 4px 12px rgba(234,88,12,0.35); box-sizing:border-box;">
        Add to Cart &bull; Secure Checkout &rarr;
      </a>
      <div style="display:flex; justify-content:center; align-items:center; gap:6px; font-size:11.5px; color:#94a3b8; margin-top:8px;">
        <span>Free Shipping Eligible</span> &bull; <span>30-Day Return Guarantee</span>
      </div>
    </div>
  </div>
</div>`.trim();

  const crossSells = `
<div style="background:#ffffff; border:1px solid #e2e8f0; border-radius:10px; padding:24px; margin:32px 0;">
  <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; margin-bottom:16px;">
    <div>
      <h2 style="font-size:20px; font-weight:800; color:#0f172a; margin:0;">
        Customers Also Viewed &amp; Companion Gear
      </h2>
      <p style="font-size:13.5px; color:#64748b; margin:4px 0 0 0;">
        Complement your gear with in-stock knife sharpeners, boards, and EDC accessories.
      </p>
    </div>
    <span style="background:#ecfdf5; color:#059669; font-size:11.5px; font-weight:700; padding:4px 10px; border-radius:4px; border:1px solid #a7f3d0;">
      In Stock &bull; Michigan Warehouse
    </span>
  </div>
  <div style="display:flex; flex-wrap:wrap; gap:12px;">
    <div style="flex:1 1 180px; min-width:160px; max-width:100%; background:#f8fafc; border:1px solid #e2e8f0; border-radius:8px; padding:14px; display:flex; flex-direction:column; justify-content:space-between; box-sizing:border-box;">
      <div>
        <a href="/product/aucon-smiley-bead-copper/" style="text-decoration:none; display:block; text-align:center; margin-bottom:10px;">
          <img src="https://www.michigansportsoutdoor.com/wp-content/uploads/2026/02/ACN005C-2.jpg" alt="AuCon Smiley Bead" style="height:115px; width:100%; object-fit:contain;" loading="lazy" />
        </a>
        <div style="font-size:10px; font-weight:800; text-transform:uppercase; color:#0284c7; margin-bottom:3px;">EDC Lanyard Bead</div>
        <h4 style="font-size:12.5px; font-weight:700; color:#0f172a; margin:0 0 6px 0; line-height:1.3;"><a href="/product/aucon-smiley-bead-copper/" style="color:#0f172a; text-decoration:none;">AuCon Smiley Bead Copper</a></h4>
      </div>
      <div>
        <div style="font-size:15px; font-weight:800; color:#b91c1c; margin-bottom:8px;">$25.99</div>
        <a href="/cart/?add-to-cart=4200" style="display:block; text-align:center; background:#ea580c; color:#ffffff; font-size:11.5px; font-weight:700; padding:6px 10px; border-radius:4px; text-decoration:none;">Add to Cart &rarr;</a>
      </div>
    </div>
    <div style="flex:1 1 180px; min-width:160px; max-width:100%; background:#f8fafc; border:1px solid #e2e8f0; border-radius:8px; padding:14px; display:flex; flex-direction:column; justify-content:space-between; box-sizing:border-box;">
      <div>
        <a href="/product/aucon-small-smiley-bead-bronze/" style="text-decoration:none; display:block; text-align:center; margin-bottom:10px;">
          <img src="https://www.michigansportsoutdoor.com/wp-content/uploads/2026/02/ACN005BZ-2.jpg" alt="Small Smiley Bead Bronze" style="height:115px; width:100%; object-fit:contain;" loading="lazy" />
        </a>
        <div style="font-size:10px; font-weight:800; text-transform:uppercase; color:#0284c7; margin-bottom:3px;">EDC Lanyard Bead</div>
        <h4 style="font-size:12.5px; font-weight:700; color:#0f172a; margin:0 0 6px 0; line-height:1.3;"><a href="/product/aucon-small-smiley-bead-bronze/" style="color:#0f172a; text-decoration:none;">Small Smiley Bead Bronze</a></h4>
      </div>
      <div>
        <div style="font-size:15px; font-weight:800; color:#b91c1c; margin-bottom:8px;">$25.99</div>
        <a href="/cart/?add-to-cart=4201" style="display:block; text-align:center; background:#ea580c; color:#ffffff; font-size:11.5px; font-weight:700; padding:6px 10px; border-radius:4px; text-decoration:none;">Add to Cart &rarr;</a>
      </div>
    </div>
    <div style="flex:1 1 180px; min-width:160px; max-width:100%; background:#f8fafc; border:1px solid #e2e8f0; border-radius:8px; padding:14px; display:flex; flex-direction:column; justify-content:space-between; box-sizing:border-box;">
      <div>
        <a href="/product/barebones-living-square-cutting-board/" style="text-decoration:none; display:block; text-align:center; margin-bottom:10px;">
          <img src="https://www.michigansportsoutdoor.com/wp-content/uploads/2025/10/BARE320.jpg" alt="Barebones Cutting Board" style="height:115px; width:100%; object-fit:contain;" loading="lazy" />
        </a>
        <div style="font-size:10px; font-weight:800; text-transform:uppercase; color:#16a34a; margin-bottom:3px;">Kitchen &amp; Camp Prep</div>
        <h4 style="font-size:12.5px; font-weight:700; color:#0f172a; margin:0 0 6px 0; line-height:1.3;"><a href="/product/barebones-living-square-cutting-board/" style="color:#0f172a; text-decoration:none;">Barebones Cutting Board</a></h4>
      </div>
      <div>
        <div style="font-size:15px; font-weight:800; color:#b91c1c; margin-bottom:8px;">$14.89</div>
        <a href="/product/barebones-living-square-cutting-board/" style="display:block; text-align:center; background:#0f172a; color:#ffffff; font-size:11.5px; font-weight:700; padding:6px 10px; border-radius:4px; text-decoration:none;">View Tool &rarr;</a>
      </div>
    </div>
    <div style="flex:1 1 180px; min-width:160px; max-width:100%; background:#f8fafc; border:1px solid #e2e8f0; border-radius:8px; padding:14px; display:flex; flex-direction:column; justify-content:space-between; box-sizing:border-box;">
      <div>
        <a href="/product/barebones-living-chef-grill-spatula/" style="text-decoration:none; display:block; text-align:center; margin-bottom:10px;">
          <img src="https://www.michigansportsoutdoor.com/wp-content/uploads/2025/10/BARE367.jpg" alt="Barebones Chef Spatula" style="height:115px; width:100%; object-fit:contain;" loading="lazy" />
        </a>
        <div style="font-size:10px; font-weight:800; text-transform:uppercase; color:#b45309; margin-bottom:3px;">Grill &amp; Camp</div>
        <h4 style="font-size:12.5px; font-weight:700; color:#0f172a; margin:0 0 6px 0; line-height:1.3;"><a href="/product/barebones-living-chef-grill-spatula/" style="color:#0f172a; text-decoration:none;">Barebones Chef Spatula</a></h4>
      </div>
      <div>
        <div style="font-size:15px; font-weight:800; color:#b91c1c; margin-bottom:8px;">$18.49</div>
        <a href="/product/barebones-living-chef-grill-spatula/" style="display:block; text-align:center; background:#0f172a; color:#ffffff; font-size:11.5px; font-weight:700; padding:6px 10px; border-radius:4px; text-decoration:none;">View Tool &rarr;</a>
      </div>
    </div>
    <div style="flex:1 1 180px; min-width:160px; max-width:100%; background:#f8fafc; border:1px solid #e2e8f0; border-radius:8px; padding:14px; display:flex; flex-direction:column; justify-content:space-between; box-sizing:border-box;">
      <div>
        <a href="/product/barebones-living-cowboy-grill-fish-spatula/" style="text-decoration:none; display:block; text-align:center; margin-bottom:10px;">
          <img src="https://www.michigansportsoutdoor.com/wp-content/uploads/2025/10/BARE467.jpg" alt="Barebones Spatula" style="height:115px; width:100%; object-fit:contain;" loading="lazy" />
        </a>
        <div style="font-size:10px; font-weight:800; text-transform:uppercase; color:#b45309; margin-bottom:3px;">Grill &amp; Camp</div>
        <h4 style="font-size:12.5px; font-weight:700; color:#0f172a; margin:0 0 6px 0; line-height:1.3;"><a href="/product/barebones-living-cowboy-grill-fish-spatula/" style="color:#0f172a; text-decoration:none;">Barebones Spatula</a></h4>
      </div>
      <div>
        <div style="font-size:15px; font-weight:800; color:#b91c1c; margin-bottom:8px;">$8.79</div>
        <a href="/product/barebones-living-cowboy-grill-fish-spatula/" style="display:block; text-align:center; background:#0f172a; color:#ffffff; font-size:11.5px; font-weight:700; padding:6px 10px; border-radius:4px; text-decoration:none;">View Tool &rarr;</a>
      </div>
    </div>
  </div>
</div>`.trim();

  const guides = `
<div style="background:#ffffff; border:1px solid #e2e8f0; border-radius:12px; padding:26px 28px; margin:32px 0 20px 0;">
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
        <a href="/cpm-magnacut-vs-bohler-m390mk/" style="display:block; width:100%; height:160px; overflow:hidden; position:relative; background:#0f172a;">
          <img src="https://www.michigansportsoutdoor.com/wp-content/uploads/2026/03/Best-Tips-for-Choosing-Your-First-EDC-Knife-1.jpg" alt="M390MK vs MagnaCut" style="width:100%; height:100%; object-fit:cover; display:block;" loading="lazy" />
          <span style="position:absolute; top:10px; left:10px; background:#0284c7; color:#ffffff; font-size:10px; font-weight:800; text-transform:uppercase; padding:3px 7px; border-radius:4px;">Steel Showdown</span>
        </a>
        <div style="padding:16px 18px 12px 18px;">
          <h4 style="font-size:15px; font-weight:700; color:#0f172a; margin:0 0 6px 0; line-height:1.35;"><a href="/cpm-magnacut-vs-bohler-m390mk/" style="color:#0f172a; text-decoration:none;">Crucible CPM MagnaCut vs Böhler M390MK</a></h4>
          <p style="font-size:12px; color:#64748b; margin:0; line-height:1.5;">Comprehensive metallurgical comparison analyzing edge retention and field toughness.</p>
        </div>
      </div>
      <div style="padding:0 18px 16px 18px;"><a href="/cpm-magnacut-vs-bohler-m390mk/" style="font-size:12.5px; font-weight:700; color:#0284c7; text-decoration:none;">Read Field Analysis &rarr;</a></div>
    </div>
    <div style="flex:1 1 260px; min-width:240px; max-width:100%; background:#ffffff; border:1px solid #e2e8f0; border-radius:8px; overflow:hidden; display:flex; flex-direction:column; justify-content:space-between; box-shadow:0 2px 8px rgba(0,0,0,0.03); box-sizing:border-box;">
      <div>
        <a href="/top-best-edc-knives-under-100/" style="display:block; width:100%; height:160px; overflow:hidden; position:relative; background:#0f172a;">
          <img src="https://www.michigansportsoutdoor.com/wp-content/uploads/2026/03/Top-10-Best-EDC-Knives-Under-100-.jpg" alt="Top EDC Knives" style="width:100%; height:100%; object-fit:cover; display:block;" loading="lazy" />
          <span style="position:absolute; top:10px; left:10px; background:#f59e0b; color:#ffffff; font-size:10px; font-weight:800; text-transform:uppercase; padding:3px 7px; border-radius:4px;">Field Guide</span>
        </a>
        <div style="padding:16px 18px 12px 18px;">
          <h4 style="font-size:15px; font-weight:700; color:#0f172a; margin:0 0 6px 0; line-height:1.35;"><a href="/top-best-edc-knives-under-100/" style="color:#0f172a; text-decoration:none;">Top EDC Pocket Knives Tested for Durability</a></h4>
          <p style="font-size:12px; color:#64748b; margin:0; line-height:1.5;">Discover which budget-friendly folding knives match American tactical standards.</p>
        </div>
      </div>
      <div style="padding:0 18px 16px 18px;"><a href="/top-best-edc-knives-under-100/" style="font-size:12.5px; font-weight:700; color:#0284c7; text-decoration:none;">Read EDC Guide &rarr;</a></div>
    </div>
    <div style="flex:1 1 260px; min-width:240px; max-width:100%; background:#ffffff; border:1px solid #e2e8f0; border-radius:8px; overflow:hidden; display:flex; flex-direction:column; justify-content:space-between; box-shadow:0 2px 8px rgba(0,0,0,0.03); box-sizing:border-box;">
      <div>
        <a href="/fixed-blade-vs-folding-knife-for-hunting/" style="display:block; width:100%; height:160px; overflow:hidden; position:relative; background:#0f172a;">
          <img src="https://www.michigansportsoutdoor.com/wp-content/uploads/2026/03/KNIFE-BLADE-STEELS-shapes-for-field-dressing.jpg" alt="Fixed vs Folder" style="width:100%; height:100%; object-fit:cover; display:block;" loading="lazy" />
          <span style="position:absolute; top:10px; left:10px; background:#16a34a; color:#ffffff; font-size:10px; font-weight:800; text-transform:uppercase; padding:3px 7px; border-radius:4px;">Field Comparison</span>
        </a>
        <div style="padding:16px 18px 12px 18px;">
          <h4 style="font-size:15px; font-weight:700; color:#0f172a; margin:0 0 6px 0; line-height:1.35;"><a href="/fixed-blade-vs-folding-knife-for-hunting/" style="color:#0f172a; text-decoration:none;">Fixed Blade vs Folding Knife for Outdoor Utility</a></h4>
          <p style="font-size:12px; color:#64748b; margin:0; line-height:1.5;">We weigh structural rigidity, lock mechanics, and deployment speed for outdoor utility.</p>
        </div>
      </div>
      <div style="padding:0 18px 16px 18px;"><a href="/fixed-blade-vs-folding-knife-for-hunting/" style="font-size:12.5px; font-weight:700; color:#0284c7; text-decoration:none;">Read Field Comparison &rarr;</a></div>
    </div>
  </div>
</div>`.trim();

  const fullDescription = `${splitContainer}\n\n${ctaBanner}\n\n${crossSells}\n\n${guides}`;

  return {
    shortDescription,
    fullDescription
  };
}
