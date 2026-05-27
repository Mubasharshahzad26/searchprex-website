import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function AgencyDashboard() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const [{ data: profile }, { data: reports }, { data: keywords }, { data: actions }, { data: workLog }] =
    await Promise.all([
      supabase.from("profiles").select("*").eq("id", user.id).single(),
      supabase.from("seo_reports").select("*").eq("client_id", user.id).order("created_at", { ascending: false }).limit(5),
      supabase.from("keyword_rankings").select("*").eq("client_id", user.id).order("position").limit(8),
      supabase.from("action_items").select("*").eq("client_id", user.id).order("created_at", { ascending: false }).limit(5),
      supabase.from("work_log").select("*").eq("client_id", user.id).order("done_at", { ascending: false }).limit(6),
    ]);

  const firstName = profile?.full_name?.split(" ")[0] ?? "there";

  return (
    <div className="p-6 lg:p-8 max-w-7xl">

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Good morning, {firstName} 👋
          </h1>
          <p className="text-white/40 text-sm mt-1">Here's your SEO overview for this week</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 rounded-full px-3 py-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Live data
          </span>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Keywords Tracked",   value: keywords?.length ?? 0,  icon: "🔑", color: "from-[#534AB7]/20 to-transparent" },
          { label: "Reports This Month", value: reports?.length ?? 0,   icon: "📊", color: "from-[#0891b2]/20 to-transparent" },
          { label: "Tasks Completed",    value: workLog?.length ?? 0,   icon: "✅", color: "from-emerald-500/20 to-transparent" },
          { label: "Actions Pending",    value: actions?.filter(a => a.status === "pending").length ?? 0, icon: "⚡", color: "from-amber-500/20 to-transparent" },
        ].map((stat) => (
          <div key={stat.label} className={`bg-gradient-to-br ${stat.color} border border-white/[0.07] rounded-2xl p-5`}>
            <div className="text-2xl mb-3">{stat.icon}</div>
            <div className="text-3xl font-bold text-white tracking-tight">{stat.value}</div>
            <div className="text-xs text-white/40 mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

        {/* Keyword Rankings */}
        <div className="lg:col-span-2 bg-white/[0.03] border border-white/[0.07] rounded-2xl p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-sm font-semibold text-white">Live Keyword Rankings</h2>
            <span className="text-[10px] font-mono text-white/30 uppercase tracking-wider">GSC Data</span>
          </div>
          {keywords && keywords.length > 0 ? (
            <div className="space-y-2">
              {keywords.map((kw) => {
                const improved = kw.prev_pos && kw.position < kw.prev_pos;
                const dropped  = kw.prev_pos && kw.position > kw.prev_pos;
                return (
                  <div key={kw.id} className="flex items-center gap-3 py-2.5 border-b border-white/[0.05] last:border-0">
                    <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                      kw.position <= 3  ? "bg-amber-500/15 text-amber-400" :
                      kw.position <= 10 ? "bg-[#534AB7]/15 text-[#818cf8]" :
                      "bg-white/[0.04] text-white/40"
                    }`}>{kw.position}</span>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm text-white truncate">{kw.keyword}</div>
                      <div className="text-xs text-white/30 mt-0.5">{kw.volume?.toLocaleString() ?? "—"} searches/mo</div>
                    </div>
                    <span className={`text-xs font-semibold ${improved ? "text-emerald-400" : dropped ? "text-red-400" : "text-white/20"}`}>
                      {improved ? `↑${kw.prev_pos - kw.position}` : dropped ? `↓${kw.position - kw.prev_pos}` : "—"}
                    </span>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-10 text-white/25 text-sm">
              No keywords tracked yet.<br/>
              <span className="text-xs text-white/20">Your SEO manager will add these shortly.</span>
            </div>
          )}
        </div>

        {/* Right column */}
        <div className="space-y-5">

          {/* Weekly Reports */}
          <div className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold text-white">Weekly Reports</h2>
              <span className="text-lg">📄</span>
            </div>
            {reports && reports.length > 0 ? (
              <div className="space-y-2">
                {reports.map((r) => (
                  <a key={r.id} href={r.report_url ?? "#"} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] hover:bg-[#534AB7]/10 border border-white/[0.05] hover:border-[#534AB7]/30 transition-all group">
                    <span className="text-lg flex-shrink-0">📊</span>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-medium text-white truncate">{r.title}</div>
                      <div className="text-[10px] text-white/30 mt-0.5">
                        {new Date(r.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                      </div>
                    </div>
                    <span className="text-[#818cf8] text-xs opacity-0 group-hover:opacity-100 transition-opacity">↗</span>
                  </a>
                ))}
              </div>
            ) : (
              <p className="text-xs text-white/25 text-center py-4">First report coming this Monday!</p>
            )}
          </div>

          {/* Next Steps */}
          <div className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold text-white">Next Steps</h2>
              <span className="text-lg">⚡</span>
            </div>
            {actions && actions.length > 0 ? (
              <div className="space-y-2">
                {actions.map((a) => (
                  <div key={a.id} className="flex items-start gap-2.5 p-2.5 rounded-lg">
                    <span className={`mt-0.5 w-2 h-2 rounded-full flex-shrink-0 ${
                      a.status === "done"        ? "bg-emerald-400" :
                      a.status === "in_progress" ? "bg-amber-400"   : "bg-white/20"
                    }`} />
                    <div>
                      <div className="text-xs text-white">{a.title}</div>
                      {a.description && <div className="text-[10px] text-white/30 mt-0.5">{a.description}</div>}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-white/25 text-center py-4">Action items will appear here.</p>
            )}
          </div>
        </div>
      </div>

      {/* This Month's Work */}
      {workLog && workLog.length > 0 && (
        <div className="mt-5 bg-white/[0.03] border border-white/[0.07] rounded-2xl p-6">
          <h2 className="text-sm font-semibold text-white mb-4">This Month's Work Done</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {workLog.map((w) => (
              <div key={w.id} className="flex items-center gap-2 p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/10">
                <span className="text-emerald-400 text-xs">✓</span>
                <span className="text-xs text-white/60">{w.task}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Upsell: Try NicheSEO Pro */}
      <div className="mt-5 bg-gradient-to-r from-[#14b8a6]/10 to-[#0891b2]/10 border border-[#14b8a6]/20 rounded-2xl p-6 flex items-center justify-between gap-4">
        <div>
          <div className="text-xs font-semibold text-[#14b8a6] uppercase tracking-widest mb-1">🔥 New</div>
          <h3 className="text-base font-bold text-white">Try NicheSEO Pro — our AI SEO toolkit</h3>
          <p className="text-sm text-white/40 mt-1">Site audits, content generator, rank tracker — do even more alongside your managed SEO.</p>
        </div>
        <a href="/dashboard/pro" className="flex-shrink-0 bg-[#14b8a6] hover:bg-[#0f766e] text-white font-bold rounded-xl px-5 py-2.5 text-sm transition-colors whitespace-nowrap">
          Try Free →
        </a>
      </div>
    </div>
  );
}
