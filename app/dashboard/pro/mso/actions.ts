"use server";

import { createClient } from "@/lib/supabase/server";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function simulateGscConnection() {
  let userEmail = "demo@example.com";
  
  if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      userEmail = user.email!;
    }
  }

  // Ensure client exists
  let client = await db.client.findUnique({
    where: { email: userEmail }
  });

  if (!client) {
    client = await db.client.create({
      data: {
        email: userEmail,
        companyName: "Demo Company",
        domain: "demo.com",
      }
    });
  }

  // Create a fake GSC Connection
  await db.gSCConnection.create({
    data: {
      clientId: client.id,
      siteUrl: "https://www.searchprex.com",
      syncStatus: "connected",
      isOAuth: true,
      accessToken: "mock-access-token",
      refreshToken: "mock-refresh-token",
    }
  });

  revalidatePath("/dashboard/pro/mso");
}
