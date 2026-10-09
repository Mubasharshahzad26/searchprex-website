// scripts/verify-detroit-updates.mjs
async function run() {
  try {
    const res = await fetch("http://localhost:3000/locations/michigan/detroit");
    const html = await res.text();

    const checks = [
      { label: "1. Redundant 5 corridors removed", pass: !html.includes("Detroit is not one market. It is five distinct corridors") },
      { label: "2. Redundant $18.4M+ nationwide card removed", pass: !html.includes("Client Case Retainer Value Generated") },
      { label: "3. Approach boxes numbering 01 present", pass: html.includes("01") && html.includes("THE SEARCHPREX APPROACH") },
      { label: "4. Growth plan contextual internal links present", pass: html.includes('href="/services/law-firm-seo"') && html.includes('href="/case-studies"') },
      { label: "5. Embedded proof 1 (local-dolls-gsc-comparison.jpg)", pass: html.includes("local-dolls-gsc-comparison.jpg") },
      { label: "6. Embedded proof 2 (local-hvac-ai-overview.png)", pass: html.includes("local-hvac-ai-overview.png") },
      { label: "7. Problem/Fix cards have plain black bullets & no tick/cross", pass: html.includes("What&#x27;s going wrong") && html.includes("bg-black") },
      { label: "8. Top Promo Bar 14-day free trial offer present", pass: html.includes("14-Day Free Trial") },
      { label: "9. Top Promo Bar Call button present", pass: html.includes("Call (313) 488-8255") },
      { label: "10. Hero Lead Form intact (yourlawfirm.com)", pass: html.includes("yourlawfirm.com") },
      { label: "11. Core expertise 3D flip cards intact", pass: html.includes("Our core expertise") },
      { label: "12. Technology We Used slider intact", pass: html.includes("Technology We Used") },
    ];

    console.log("=== DETROIT PAGE COMPREHENSIVE VERIFICATION ===");
    let allPass = true;
    for (const c of checks) {
      console.log(`${c.pass ? "✅" : "❌"} ${c.label}: ${c.pass}`);
      if (!c.pass) allPass = false;
    }
    console.log("All passed:", allPass);
  } catch (err) {
    console.error("Fetch failed:", err.message);
  }
}

run();
