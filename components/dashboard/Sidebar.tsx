"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

interface Profile {
  full_name?: string;
  email?: string;
  role?: string;
}

export default function DashboardSidebar({ profile }: { profile: Profile | null }) {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();
  const isAgency = profile?.role === "agency_client";
  const isPro = profile?.role === "pro_user";

  const agencyLinks = [
    { href: "/dashboard/agency", icon: "📊", label: "Overview" },
    { href: "/dashboard/agency/reports", icon: "📄", label: "SEO Reports" },
    { href: "/dashboard/agency/keywords", icon: "🔑", label: "Rankings" },
    { href: "/dashboard/agency/actions", icon: "⚡", label: "Action Items" },
    { href: "/dashboard/agency/work-log", icon: "✅", label: "Work Done" },
  ];

  const proLinks = [
    { href: "/dashboard/pro", icon: "🏠", label: "Dashboard" },
    { href: "/tools/audit", icon: "🔍", label: "Site Audit" },
    { href: "/tools/content", icon: "✍️", label: "Content Gen" },
    { href: "/tools/rankings", icon: "📈", label: "Rank Tracker" },
    { href: "/tools/keywords", icon: "🔑", label: "Keywords" },
  ];

  const links = isAgency ? agencyLinks : isPro ? proLinks : [];

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  return (
    <aside className="w-60 flex-shrink-0 bg-white/[0.02] border-r border-white/[0.06] flex flex-col min-h-screen">
      <div className="p-5 border-b border-white/[0.06]">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#534AB7]/20 border border-[#534AB7]/35 flex items-center justify-center">
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
              <circle cx="6.5" cy="6.5" r="4.5" stroke="#818cf8" strokeWidth="1.8"/>
              <path d="M10 10L14 14" stroke="#818cf8" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
          </div>
          <span className="text-white text-sm font-semibold">Search<strong className="text-[#818cf8]">prex</strong></span>
        </Link>
      </div>
      <div className="px-4 py-3 border-b border-white/[0.06]">
        <span className={`inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-widest rounded-full px-2.5 py-1 ${
          isAgency ? "bg-[#534AB7]/15 text-[#818cf8] border border-[#534AB7]/25" :
          isPro ? "bg-[#14b8a6]/15 text-[#14b8a6] border border-[#14b8a6]/25" :
          "bg-white/5 text-white/30 border border-white/10"
        }`}>
          {isAgency ? "🏢 Agency Client" : isPro ? "🤖 NicheSEO Pro" : "👋 New User"}
        </span>
      </div>
      <nav className="flex-1 p-3 space-y-0.5">
        {links.map((link) => {
          const active = pathname === link.href;
          return (
            <Link key={link.href} href={link.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all ${
                active ? "bg-[#534AB7]/20 text-white border border-[#534AB7]/30"
                : "text-white/40 hover:text-white/80 hover:bg-white/[0.05]"
              }`}>
              <span className="text-base">{link.icon}</span>
              <span className="font-medium">{link.label}</span>
            </Link>
          );
        })}
      </nav>
      <div className="p-3 border-t border-white/[0.06]">
        <div className="flex items-center gap-3 px-3 py-2 mb-2">
          <div className="w-8 h-8 rounded-full bg-[#534AB7]/25 border border-[#534AB7]/35 flex items-center justify-center text-xs font-bold text-[#818cf8] flex-shrink-0">
            {profile?.full_name?.[0]?.toUpperCase() ?? "U"}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-xs font-medium text-white truncate">{profile?.full_name ?? "User"}</div>
            <div className="text-[10px] text-white/30 truncate">{profile?.email}</div>
          </div>
        </div>
        <button onClick={handleLogout}
          className="w-full text-left px-3 py-2 text-xs text-white/30 hover:text-white/60 hover:bg-white/[0.04] rounded-lg transition-all">
          Sign out →
        </button>
      </div>
    </aside>
  );
}