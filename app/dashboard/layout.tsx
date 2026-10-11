import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import DashboardSidebar from "@/components/dashboard/Sidebar";

export const dynamic = "force-dynamic";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  let profile = null;

  if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    try {
      const supabase = await createClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        const { data } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();
        profile = data;
      }
    } catch {
      // Ignore Supabase auth fetch errors so /dashboard/links can still render
    }
  }

  return (
    <div className="min-h-screen bg-[#f8f9fa] flex">
      {profile && <DashboardSidebar profile={profile} />}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}

