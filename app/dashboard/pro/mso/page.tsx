import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { db } from "@/lib/db";
import MsoDashboardClient from "./MsoDashboardClient";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3 } from "lucide-react";
import type { MsoPageData } from "@/components/dashboard/ActionModal";
import { simulateGscConnection } from "./actions";

export default async function MsoDashboardPage() {
  let client = null;
  
  if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      redirect("/login");
    }

    client = await db.client.findUnique({
      where: { email: user.email! }
    });
  } else {
    // Development fallback without auth
    client = await db.client.findFirst();
  }

  // Check GSC Connection
  const gscConnections = client ? await db.gSCConnection.findMany({
    where: { clientId: client.id }
  }) : [];

  const hasGscConnection = gscConnections.length > 0;

  // Mock GSC Data for demonstration of the Autopilot action system
  const mockGscData: MsoPageData[] = [
    { url: "https://www.searchprex.com/services/law-firm-seo", clicks: 342, impressions: 8500, ctr: 4.0, position: 12.4 },
    { url: "https://www.searchprex.com/services/ecommerce-seo", clicks: 120, impressions: 12000, ctr: 1.0, position: 24.1 },
    { url: "https://www.searchprex.com/blog/crawl-budget-optimization", clicks: 840, impressions: 4000, ctr: 21.0, position: 3.2 },
    { url: "https://www.searchprex.com/tools/keyword-research", clicks: 45, impressions: 3200, ctr: 1.4, position: 31.8 },
  ];

  if (!hasGscConnection) {
    return (
      <div className="p-6 lg:p-8 max-w-7xl mx-auto flex items-center justify-center min-h-[60vh]">
        <Card className="max-w-md w-full text-center p-6">
          <CardHeader>
            <div className="mx-auto bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
              <BarChart3 className="w-8 h-8 text-primary" />
            </div>
            <CardTitle className="text-2xl">Connect GSC</CardTitle>
            <CardDescription>
              Connect your Google Search Console to enable real-time MSO data and AI optimization capabilities.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Standard "Sign in with Google" button simulation */}
            <form action="">
              <Button type="button" className="w-full" size="lg" disabled>
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Sign in with Google (OAuth pending)
              </Button>
            </form>
            
            <div className="mt-8">
              <h3 className="text-sm font-medium mb-4 text-muted-foreground uppercase text-left">Demo the Dashboard</h3>
              <form action={simulateGscConnection}>
                <Button type="submit" variant="outline" className="w-full border-dashed">
                  Simulate GSC Connection (Demo)
                </Button>
              </form>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      <MsoDashboardClient mockData={mockGscData} />
    </div>
  );
}
