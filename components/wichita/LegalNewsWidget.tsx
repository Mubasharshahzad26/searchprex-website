const NAVY   = "#0a0f2e";
const PURPLE = "#534AB7";
const GREEN  = "#2f9670";
const MUTED  = "#6b7090";
const LINE   = "#e7e9f1";
const FONT   = "'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif";
 
const NEWS = [
  { tag: "Kansas Courts", title: "Sedgwick County District Court expands online filing for family law cases", date: "Jun 2025", color: PURPLE },
  { tag: "Local SEO", title: "Google AI Overviews now citing local attorneys in legal queries — study", date: "May 2025", color: GREEN },
  { tag: "Family Law", title: "Kansas Supreme Court updates child support calculation guidelines", date: "May 2025", color: "#BA7517" },
  { tag: "Legal Tech", title: "Law firms using structured schema see 2.3x more AI Overview appearances", date: "Apr 2025", color: PURPLE },
  { tag: "Wichita", title: "Wichita Bar Association launches updated attorney directory with GBP links", date: "Apr 2025", color: GREEN },
  { tag: "Kansas Law", title: "New Kansas statute affects spousal maintenance calculations in divorce cases", date: "Mar 2025", color: "#185FA5" },
];
 
export default function LegalNewsWidget() {
  return (
    <aside style={{ fontFamily: FONT, position: "sticky", top: 24 }}>
      <div style={{ background: "#fff", border: `1px solid ${LINE}`, borderRadius: 14, overflow: "hidden" }}>
        {/* Header */}
        <div style={{ background: NAVY, padding: "14px 18px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: GREEN, letterSpacing: ".5px", marginBottom: 2 }}>LIVE UPDATES</div>
            <div style={{ fontSize: 15, fontWeight: 800, color: "#fff" }}>Wichita Legal News</div>
          </div>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: GREEN, boxShadow: `0 0 6px ${GREEN}` }} />
        </div>
 
        {/* News items */}
        <div style={{ padding: "6px 0" }}>
          {NEWS.map((item, i) => (
            <div
              key={i}
              style={{
                padding: "12px 18px",
                borderBottom: i < NEWS.length - 1 ? `1px solid ${LINE}` : "none",
                transition: "background 0.2s",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 5 }}>
                <span style={{ fontSize: 9, fontWeight: 700, color: item.color, background: `${item.color}15`, padding: "2px 7px", borderRadius: 999, letterSpacing: ".3px" }}>
                  {item.tag.toUpperCase()}
                </span>
                <span style={{ fontSize: 10, color: "#b0b4cc" }}>{item.date}</span>
              </div>
              <p style={{ fontSize: 13, color: NAVY, lineHeight: 1.5, margin: 0, fontWeight: 600 }}>
                {item.title}
              </p>
            </div>
          ))}
        </div>
 
        {/* Footer */}
        <div style={{ padding: "12px 18px", background: "#f7f8fb", borderTop: `1px solid ${LINE}` }}>
          <div style={{ fontSize: 11, color: MUTED, lineHeight: 1.5 }}>
            Updated weekly · Sources: Kansas Courts, Wichita Bar Association, local legal publications
          </div>
        </div>
      </div>
 
      {/* CTA below widget */}
      <div style={{ marginTop: 12, background: `${PURPLE}10`, border: `1px solid ${PURPLE}30`, borderRadius: 12, padding: "14px 18px" }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: PURPLE, marginBottom: 5 }}>FREE AUDIT</div>
        <div style={{ fontSize: 13.5, fontWeight: 700, color: NAVY, marginBottom: 6 }}>
          See where your firm ranks right now
        </div>
        <a
          href="https://calendly.com/contact-searchprex/30min"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "block",
            textAlign: "center",
            background: PURPLE,
            color: "#fff",
            fontSize: 13,
            fontWeight: 700,
            padding: "9px 14px",
            borderRadius: 8,
            textDecoration: "none",
          }}
        >
          Book free call →
        </a>
      </div>
    </aside>
  );
}
 




