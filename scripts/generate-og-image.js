const sharp = require('sharp');
const fs = require('fs');

const svg = `
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0a0e1a"/>
      <stop offset="50%" stop-color="#111827"/>
      <stop offset="100%" stop-color="#0f172a"/>
    </linearGradient>
    <radialGradient id="glow" cx="80%" cy="20%" r="60%">
      <stop offset="0%" stop-color="#534AB7" stop-opacity="0.25"/>
      <stop offset="100%" stop-color="#534AB7" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="greenGlow" cx="15%" cy="85%" r="50%">
      <stop offset="0%" stop-color="#10b981" stop-opacity="0.15"/>
      <stop offset="100%" stop-color="#10b981" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect width="1200" height="630" fill="url(#glow)"/>
  <rect width="1200" height="630" fill="url(#greenGlow)"/>
  
  <!-- Subtle border -->
  <rect x="1" y="1" width="1198" height="628" fill="none" stroke="#334155" stroke-width="2" stroke-opacity="0.4"/>

  <!-- Header / Logo Area -->
  <g transform="translate(80, 80)">
    <g transform="scale(1.2)">
      <g transform="translate(0, 0)">
        <path d="M31 4 L55 16 H7 Z" fill="#ffffff"/>
        <polygon points="31,7 32.5,10.4 36.2,10.7 33.4,13 34.3,16.6 31,14.7 27.7,16.6 28.6,13 25.8,10.7 29.5,10.4" fill="#3eb489"/>
        <rect x="5" y="16" width="52" height="5" fill="#ffffff"/>
        <rect x="9" y="21" width="7" height="26" fill="#ffffff"/>
        <rect x="20" y="21" width="7" height="26" fill="#ffffff"/>
        <rect x="31" y="21" width="7" height="26" fill="#ffffff"/>
        <rect x="42" y="21" width="7" height="26" fill="#ffffff"/>
        <rect x="5" y="47" width="52" height="3" fill="#ffffff"/>
        <rect x="5" y="52" width="52" height="2" fill="#3eb489"/>
        <rect x="5" y="56" width="52" height="2" fill="#ffffff"/>
      </g>
      <text x="78" y="46" font-family="sans-serif" font-weight="800" font-size="42" letter-spacing="-1.2" fill="#ffffff">SearchPrex</text>
    </g>
  </g>

  <!-- Tagline badge -->
  <g transform="translate(80, 210)">
    <rect width="210" height="36" rx="18" fill="#534AB7" fill-opacity="0.25" stroke="#534AB7" stroke-width="1.5"/>
    <text x="105" y="23" font-family="sans-serif" font-weight="700" font-size="14" letter-spacing="1.5" fill="#a5b4fc" text-anchor="middle">USA SEO AGENCY</text>
  </g>

  <!-- Main Headline -->
  <text x="80" y="315" font-family="sans-serif" font-weight="800" font-size="52" letter-spacing="-1.5" fill="#ffffff">
    Founder-Led SEO for Law Firms,
  </text>
  <text x="80" y="375" font-family="sans-serif" font-weight="800" font-size="52" letter-spacing="-1.5" fill="#3eb489">
    Ecommerce &amp; US Local Businesses
  </text>

  <!-- Subtitle -->
  <text x="80" y="440" font-family="sans-serif" font-weight="400" font-size="24" fill="#94a3b8">
    Senior-executed search strategy, verified case studies, and AI visibility.
  </text>

  <!-- Bottom Pills & Domain -->
  <g transform="translate(80, 520)">
    <text x="0" y="20" font-family="sans-serif" font-weight="600" font-size="18" fill="#cbd5e1">Law Firm SEO</text>
    <circle cx="140" cy="14" r="3" fill="#64748b"/>
    <text x="160" y="20" font-family="sans-serif" font-weight="600" font-size="18" fill="#cbd5e1">Ecommerce SEO</text>
    <circle cx="325" cy="14" r="3" fill="#64748b"/>
    <text x="345" y="20" font-family="sans-serif" font-weight="600" font-size="18" fill="#cbd5e1">Local Map Pack</text>
    <circle cx="505" cy="14" r="3" fill="#64748b"/>
    <text x="525" y="20" font-family="sans-serif" font-weight="600" font-size="18" fill="#cbd5e1">Technical SEO</text>
  </g>

  <g transform="translate(1040, 530)">
    <text x="80" y="10" font-family="sans-serif" font-weight="700" font-size="20" fill="#64748b" text-anchor="end">searchprex.com</text>
  </g>
</svg>
`;

sharp(Buffer.from(svg))
  .jpeg({ quality: 90 })
  .toFile('public/og-image.jpg')
  .then(() => console.log('Successfully generated public/og-image.jpg'))
  .catch(err => console.error(err));
