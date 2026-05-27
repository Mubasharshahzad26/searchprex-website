import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

const PRO_TOOLS = [
  { icon: "🔍", label: "AI Site Audit",       desc: "Full technical SEO scan",       href: "/tools/audit",       color: "from-[#534AB7]/20" },
  { icon: "✍️", label: "Content Generator",   desc: "AI-powered SEO content",        href: "/tools/content",     color: "from-[#0891b2]/20" },
  { icon: "📈", label: "Rank Tracker",         desc: "Track keyword positions",        href: "/tools/rankings",    color: "from-emerald-500/20" },
  { icon: "🔑", label: "Keyword Research",     desc: "Find winning keywords",          href: "/tools/keywords",    color: "from-amber-500/20" },
  { icon: "🕵️", label: "Competitor Analysis", desc: "Spy on competitor strategy",     href: "/tools/competitors", color: "from-rose-500/20" },
  { icon: "🔗", label: "Backlink Checker",     desc: "Analyze link profile",           href: "/tools/backlinks",   color: "from-purple-500/20" },
];

export default async function ProDashboard() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  const firstName = profile?.full_name?.split(" ")[0] ?? "there";

  return (
    <div className="p-6 lg:p-8 max-w-7xl">

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            NicheSEO Pro 🤖
          </h1>
          <p className="text-white/40 text-sm mt-1">Welcome back, {firstName} — your AI SEO toolkit</p>
        </div>
        <div className="flex items-center gap-2 bg-[#14b8a6]/10 border border-[#14b8a6]/20 rounded-full px-4 py-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#14b8a6] animate-pulse" />
          <span className="text-xs text-[#14b8a6] font-medium">Pro Plan Active</span>
        </div>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Audits Run",         value: "0",  icon: "🔍" },
          { label: "Content Pieces",     value: "0",  icon: "✍️" },
          { label: "Keywords Tracked",   value: "0",  icon: "📈" },
          { label: "Days in Pro",        value: "1",  icon: "🏆" },
        ].map((s) => (
          <div key={s.label} className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-5">
            <div className="text-2xl mb-3">{s.icon}</div>
            <div className="text-3xl font-bold text-white">{s.value}</div>
            <div className="text-xs text-white/40 mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Tools Grid */}
      <h2 className="text-sm font-semibold text-white/60 uppercase tracking-widest mb-4">Your AI Tools</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {PRO_TOOLS.map((tool) => (
          <a
            key={tool.label}
            href={tool.href}
            className={`group bg-gradient-to-br ${tool.color} to-transparent border border-white/[0.07] hover:border-white/20 rounded-2xl p-6 transition-all hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)]`}
          >
            <div className="text-3xl mb-4">{tool.icon}</div>
            <div className="font-semibold text-white text-sm mb-1">{tool.label}</div>
            <div className="text-xs text-white/40">{tool.desc}</div>
            <div className="mt-4 text-xs text-white/30 group-hover:text-white/60 transition-colors flex items-center gap-1">
              Open tool <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
            </div>
          </a>
        ))}
      </div>

      {/* Upsell: Hire Us */}
      <div className="bg-gradient-to-r from-[#534AB7]/10 to-[#7c3aed]/10 border border-[#534AB7]/20 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-semibold text-[#818cf8] uppercase tracking-widest mb-1">📞 Done-For-You</div>
          <h3 className="text-base font-bold text-white">Want us to do this FOR you?</h3>
          <p className="text-sm text-white/40 mt-1">
            Let our founder handle everything — strategy, content, links, rankings. You focus on your business.
          </p>
        </div>
        <a
          href="/free-audit"
          className="flex-shrink-0 bg-[#534AB7] hover:bg-[#3C3489] text-white font-bold rounded-xl px-5 py-2.5 text-sm transition-all hover:shadow-[0_0_28px_rgba(83,74,183,0.4)] whitespace-nowrap"
        >
          Book Free Audit →
        </a>
      </div>
    </div>
  );
}
